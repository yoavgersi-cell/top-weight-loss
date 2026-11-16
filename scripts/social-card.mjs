#!/usr/bin/env node
// Renders Treatments Hub social cards (1080x1350 JPEG, 4:5) from a JSON file.
//
//   node scripts/social-card.mjs ops/social/<week>.cards.json [outDir]
//
// JSON: an array of cards, or { "outDir": "...", "cards": [...] }.
//   { "out": "2026-11-17-d1.jpg",
//     "pill": "Good to know",
//     "headline": "A price only means something with its condition attached.",
//     "body": "Headline rate, regular rate, plan condition, shipping terms. ..." }
//
// Text-only system from the approved first post (ops/social/2026-11-15-first-post.md):
// pale-blue gradient, soft curve top-right, two wave bands at the bottom, site
// wordmark top-left, light-blue pill label, navy Inter Bold headline (max 3
// lines), blue swoosh under the headline, grey Inter body (max 3 lines).
// Lines are measured with the real font (rendered via sharp and trimmed), so
// wrapping is exact; a headline that will not fit in 3 lines is shrunk in steps
// and the script fails loudly rather than overflowing. A "\n" in headline or
// body forces a line break; otherwise words wrap automatically.
//
// No prices, no product names, no third-party logos, no bodies, no Trustpilot
// on cards: the house rules apply to the image as much as to the caption.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const W = 1080;
const H = 1350;
const MARGIN = 72;
const MAX_TEXT_W = W - MARGIN * 2; // 936
const LOGO = path.join(ROOT, "public", "treatmentshub.webp");
const LOGO_W = 470;
const FONT = "Inter";

const C = {
  navy: "#0f1e3d",
  blue: "#2f6fe4",
  pillBg: "#d9e8fb",
  pillFg: "#1f5fd0",
  grey: "#4a5568",
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Exact text width with the installed font: render the run on a transparent
// canvas and trim. Cached per (text, size, weight).
const widthCache = new Map();
async function textWidth(text, size, weight, letterSpacing = 0) {
  const key = `${weight}|${size}|${letterSpacing}|${text}`;
  if (widthCache.has(key)) return widthCache.get(key);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W * 2}" height="${size * 2}">
    <text x="10" y="${Math.round(size * 1.3)}" font-family="${FONT}" font-weight="${weight}" font-size="${size}" letter-spacing="${letterSpacing}" fill="#000">${esc(text)}</text>
  </svg>`;
  let w = 0;
  try {
    const { info } = await sharp(Buffer.from(svg)).png().trim().toBuffer({ resolveWithObject: true });
    w = info.width;
  } catch {
    w = 0; // empty string trims to nothing
  }
  widthCache.set(key, w);
  return w;
}

// Greedy word wrap using measured widths. Explicit "\n" always breaks.
async function wrap(text, size, weight, maxW, letterSpacing = 0) {
  const lines = [];
  for (const para of text.split("\n")) {
    const words = para.trim().split(/\s+/).filter(Boolean);
    let cur = "";
    for (const word of words) {
      const trial = cur ? `${cur} ${word}` : word;
      if ((await textWidth(trial, size, weight, letterSpacing)) <= maxW) {
        cur = trial;
      } else {
        if (cur) lines.push(cur);
        cur = word;
        if ((await textWidth(word, size, weight, letterSpacing)) > maxW) {
          throw new Error(`Word too wide for the canvas at ${size}px: "${word}"`);
        }
      }
    }
    if (cur) lines.push(cur);
  }
  return lines;
}

// Fit text into at most maxLines, shrinking the font in steps if needed.
async function fit(text, { size, minSize, step, weight, maxLines, letterSpacing = 0 }) {
  for (let s = size; s >= minSize; s -= step) {
    const lines = await wrap(text, s, weight, MAX_TEXT_W, letterSpacing);
    if (lines.length <= maxLines) return { size: s, lines };
  }
  throw new Error(`Text does not fit in ${maxLines} lines even at ${minSize}px: "${text}"`);
}

// Wordmark: the site header asset is navy/blue ink on white; lift the ink onto
// an alpha channel so it sits cleanly on the gradient.
async function wordmark() {
  const rgb = await sharp(LOGO).resize({ width: LOGO_W }).removeAlpha().toColourspace("srgb").raw().toBuffer({ resolveWithObject: true });
  const { width, height } = rgb.info;
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0, j = 0; i < rgb.data.length; i += 3, j += 4) {
    const r = rgb.data[i];
    const g = rgb.data[i + 1];
    const b = rgb.data[i + 2];
    const ink = 255 - Math.min(r, g, b);
    rgba[j] = r;
    rgba[j + 1] = g;
    rgba[j + 2] = b;
    rgba[j + 3] = Math.max(0, Math.min(255, ink * 4 - 24));
  }
  return sharp(rgba, { raw: { width, height, channels: 4 } }).png().toBuffer();
}

async function renderCard(card, outPath, logo) {
  if (!card.pill || !card.headline || !card.body) throw new Error(`Card ${outPath}: pill, headline and body are required`);

  const head = await fit(card.headline, { size: 82, minSize: 64, step: 2, weight: 700, maxLines: 3, letterSpacing: -1.5 });
  const body = await fit(card.body, { size: 42, minSize: 34, step: 2, weight: 400, maxLines: 3 });

  // Pill
  const pillSize = 34;
  const pillTextW = await textWidth(card.pill, pillSize, 600);
  const pillW = Math.round(pillTextW + 96);
  const pillX = MARGIN;
  const pillY = 340;
  const pillH = 68;

  // Headline block: first baseline fixed, line height ~1.22em
  const headLH = Math.round(head.size * 1.22);
  const headFirst = 540;
  const headLast = headFirst + headLH * (head.lines.length - 1);
  const lastW = await textWidth(head.lines[head.lines.length - 1], head.size, 700, -1.5);

  // Swoosh under the last headline line, roughly its middle 60 %
  const swY = headLast + 52;
  const swX1 = Math.round(MARGIN + lastW * 0.3);
  const swX2 = Math.round(MARGIN + Math.max(lastW * 0.98, 360));
  const swMid = Math.round((swX1 + swX2) / 2);

  // Body block
  const bodyLH = Math.round(body.size * 1.38);
  const bodyFirst = headLast + 150;
  const bodyLast = bodyFirst + bodyLH * (body.lines.length - 1);
  if (bodyLast > 1090) throw new Error(`Card ${outPath}: body runs into the bottom wave (last baseline ${bodyLast})`);

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f3f8fe"/>
      <stop offset="0.55" stop-color="#e6f0fc"/>
      <stop offset="1" stop-color="#d3e4fa"/>
    </linearGradient>
    <linearGradient id="wave" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#c7dcf8"/>
      <stop offset="1" stop-color="#a9c8f3"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <path d="M ${W} 120 C 900 260, 760 300, 700 520 C 650 700, 820 760, ${W} 700 Z" fill="#dbe9fb" opacity="0.7"/>
  <path d="M 0 1180 C 200 1110, 380 1140, 540 1190 C 720 1245, 900 1215, ${W} 1140 L ${W} ${H} L 0 ${H} Z" fill="url(#wave)" opacity="0.85"/>
  <path d="M 0 1250 C 240 1200, 420 1260, 620 1285 C 820 1310, 960 1280, ${W} 1240 L ${W} ${H} L 0 ${H} Z" fill="#9fc1f1" opacity="0.6"/>

  <rect x="${pillX}" y="${pillY}" rx="34" ry="34" width="${pillW}" height="${pillH}" fill="${C.pillBg}"/>
  <text x="${pillX + pillW / 2}" y="${pillY + 46}" text-anchor="middle" font-family="${FONT}" font-weight="600" font-size="${pillSize}" fill="${C.pillFg}">${esc(card.pill)}</text>

  <g font-family="${FONT}" font-weight="700" font-size="${head.size}" fill="${C.navy}" letter-spacing="-1.5">
    ${head.lines.map((l, i) => `<text x="${MARGIN}" y="${headFirst + headLH * i}">${esc(l)}</text>`).join("\n    ")}
  </g>
  <path d="M ${swX1} ${swY} Q ${swMid} ${swY - 30}, ${swX2} ${swY - 4}" stroke="${C.blue}" stroke-width="9" stroke-linecap="round" fill="none"/>

  <g font-family="${FONT}" font-weight="400" font-size="${body.size}" fill="${C.grey}">
    ${body.lines.map((l, i) => `<text x="${MARGIN}" y="${bodyFirst + bodyLH * i}">${esc(l)}</text>`).join("\n    ")}
  </g>
</svg>`;

  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await sharp({ create: { width: W, height: H, channels: 3, background: "#eef4fc" } })
    .composite([
      { input: Buffer.from(svg), top: 0, left: 0 },
      { input: logo, top: 120, left: MARGIN },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(outPath);

  const meta = await sharp(outPath).metadata();
  const { size: bytes } = await fs.stat(outPath);
  return { out: outPath, width: meta.width, height: meta.height, bytes, headSize: head.size, headLines: head.lines.length, bodySize: body.size, bodyLines: body.lines.length };
}

async function main() {
  const [, , jsonArg, outDirArg] = process.argv;
  if (!jsonArg) {
    console.error("usage: node scripts/social-card.mjs <cards.json> [outDir]");
    process.exit(2);
  }
  const jsonPath = path.resolve(jsonArg);
  const parsed = JSON.parse(await fs.readFile(jsonPath, "utf8"));
  const cards = Array.isArray(parsed) ? parsed : parsed.cards;
  const outDir = path.resolve(outDirArg ?? (Array.isArray(parsed) ? "public/social" : parsed.outDir ?? "public/social"));
  if (!Array.isArray(cards) || cards.length === 0) throw new Error("No cards in the JSON file");

  const logo = await wordmark();
  for (const card of cards) {
    const outPath = path.isAbsolute(card.out) ? card.out : path.join(outDir, card.out);
    const r = await renderCard(card, outPath, logo);
    console.log(`${path.relative(ROOT, r.out)}  ${r.width}x${r.height}  ${Math.round(r.bytes / 1024)} KB  headline ${r.headLines}L@${r.headSize}px  body ${r.bodyLines}L@${r.bodySize}px`);
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
