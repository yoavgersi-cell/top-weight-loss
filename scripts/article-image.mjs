#!/usr/bin/env node
/**
 * Generate an article lead image with OpenAI's image model, in the site's
 * house style, and wire it into the article record.
 *
 *   node scripts/article-image.mjs --slug <article-slug> \
 *     --scene "what the picture shows, in plain words" \
 *     --alt "the alt text that will ship with it" \
 *     [--data src/data/articles.ts] [--model gpt-image-2] [--dry-run]
 *
 * What it does
 *   1. Wraps the scene in the HOUSE_STYLE brief below (bright editorial
 *      photography, blue/white palette, unbranded devices, no readable text,
 *      no logos, no faces) and asks the image model for a 3:2 landscape.
 *   2. Crops/resizes to 1600x900 WebP under 300 KB at
 *      public/article-images/<slug>.webp (the specs in that folder's README).
 *   3. With --data, inserts `image` / `imageAlt` right after `slug: "<slug>",`
 *      in that file (or replaces them if already present).
 *
 * Auth: the OpenAI key is injected by the environment's network secret for
 * api.openai.com; OPENAI_API_KEY in the environment also works.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith("--")) acc.push([a.slice(2), arr[i + 1]?.startsWith("--") || arr[i + 1] === undefined ? true : arr[i + 1]]);
    return acc;
  }, []),
);
const { slug, scene, alt } = args;
if (!slug || !scene || !alt) {
  console.error("Usage: --slug <slug> --scene <description> --alt <alt text> [--data <file>] [--model gpt-image-2] [--dry-run]");
  process.exit(2);
}
const model = typeof args.model === "string" ? args.model : "gpt-image-2";
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const outDir = path.join(ROOT, "public", "article-images");
const outFile = path.join(outDir, `${slug}.webp`);

// Matches the existing lead images (bright kitchen/desk photography, soft
// daylight, periwinkle-blue devices, white/marble surfaces). Rules at the end
// are hard constraints: a fabricated label, brand or chart would be a claim.
const HOUSE_STYLE = `Editorial lifestyle photograph for a health-comparison website, 3:2 landscape.
Style: bright natural daylight, shallow depth of field, clean modern home or desk setting, white and light-grey surfaces (marble, oak, linen), accents in soft periwinkle blue and navy, a touch of green from a plant. Calm, trustworthy, premium but approachable. Photorealistic, 50mm look, no HDR.
Composition: the main subject sits in the centre third of the frame with breathing room on both sides, because the image is also cropped to a wide 2.5:1 strip and to a near-square left panel. Nothing important near the edges.

Scene: ${scene}

Hard rules:
- No readable text, numbers, words, labels, logos or brand names anywhere, including on boxes, pens, screens, packaging or notebooks. Screens may show abstract blurred shapes only.
- Any medication device is a generic, unbranded injection pen or vial with no visible needle. No pills unless the scene asks for them.
- No faces: people, if any, are shown from the shoulders down or from behind.
- No before/after bodies, no scales showing numbers, no measurement readouts, no charts with values.
- No medical staff in uniform unless the scene asks for a clinician on a video call, and then only on a screen and without a face.`;

async function generate() {
  const key = process.env.OPENAI_API_KEY || "proxy-injected";
  if (process.env.HTTPS_PROXY && !process.env.NODE_USE_ENV_PROXY) {
    // Node's built-in fetch ignores HTTPS_PROXY unless told to (Node >= 22.21).
    throw new Error("Run with NODE_USE_ENV_PROXY=1 so fetch goes through the HTTPS proxy.");
  }
  // "medium" renders in ~20 s; "high" takes longer than the 30 s the session
  // proxy allows upstream and comes back as a 502.
  const quality = typeof args.quality === "string" ? args.quality : "medium";
  const body = { model, prompt: HOUSE_STYLE, size: "1536x1024", quality, n: 1, output_format: "png" };
  let res;
  for (let attempt = 1; attempt <= 3; attempt++) {
    res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify(body),
    });
    if (res.ok) break;
    const text = (await res.text()).slice(0, 300);
    if (attempt === 3 || ![502, 503, 429].includes(res.status)) throw new Error(`OpenAI ${res.status}: ${text}`);
    console.log(`OpenAI ${res.status} (${text}), retrying…`);
    await new Promise((r) => setTimeout(r, 5000 * attempt));
  }
  const json = await res.json();
  const item = json.data?.[0];
  if (item?.b64_json) return Buffer.from(item.b64_json, "base64");
  if (item?.url) return Buffer.from(await (await fetch(item.url)).arrayBuffer());
  throw new Error("No image in response");
}

async function toWebp(png) {
  // 16:9, centred crop; step quality down until under 300 KB.
  for (const q of [82, 76, 70, 64, 58, 52]) {
    const buf = await sharp(png).resize(1600, 900, { fit: "cover", position: "centre" }).webp({ quality: q, effort: 6 }).toBuffer();
    if (buf.length < 300 * 1024) return { buf, q };
  }
  throw new Error("Could not get the WebP under 300 KB");
}

function wireData(file) {
  const p = path.resolve(ROOT, file);
  let src = fs.readFileSync(p, "utf8");
  const marker = `slug: "${slug}",`;
  const at = src.indexOf(marker);
  if (at < 0) throw new Error(`slug "${slug}" not found in ${file}`);
  const lineStart = src.lastIndexOf("\n", at) + 1;
  const indent = src.slice(lineStart, at);
  const after = at + marker.length;
  // Replace existing image/imageAlt lines directly after the slug, if any.
  const existing = new RegExp(`^(\\n${indent}image: .*|\\n${indent}imageAlt: .*)+`);
  const rest = src.slice(after).replace(existing, "");
  const inject = `\n${indent}image: "/article-images/${slug}.webp",\n${indent}imageAlt: ${JSON.stringify(alt)},`;
  src = src.slice(0, after) + inject + rest;
  fs.writeFileSync(p, src);
  return p;
}

(async () => {
  console.log(`Generating ${slug} with ${model}…`);
  if (args["dry-run"]) {
    console.log(HOUSE_STYLE);
    return;
  }
  const png = await generate();
  fs.mkdirSync(outDir, { recursive: true });
  const { buf, q } = await toWebp(png);
  fs.writeFileSync(outFile, buf);
  console.log(`Wrote ${path.relative(ROOT, outFile)} (${(buf.length / 1024).toFixed(0)} KB, q${q})`);
  if (typeof args.data === "string") console.log(`Wired image + imageAlt into ${path.relative(ROOT, wireData(args.data))}`);
  console.log(`alt: ${alt}`);
})().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
