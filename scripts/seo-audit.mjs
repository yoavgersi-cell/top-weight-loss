#!/usr/bin/env node
// SEO / GEO health check for treatmentshub.com, run against a production
// build served locally (no network access to the live site is needed).
//
//   npm run build && node scripts/seo-audit.mjs
//
// Starts `next start` on AUDIT_PORT (default 4310) unless AUDIT_BASE points at
// a server that is already up, crawls every URL in the hub sitemaps with the
// production Host header, and checks the signals that have actually broken on
// this site before. Prints FAIL / WARN lines and a final RESULT line; exits 1
// on any FAIL so a scheduler can tell pass from fail.
//
// FAIL (must be fixed):
//   - a sitemap URL that is not a 200, or redirects
//   - canonical not equal to the sitemap URL
//   - a sitemap URL that carries noindex
//   - missing <title>, duplicate <title>, missing/multiple <h1>
//   - invalid JSON-LD, or an Article whose author is typed as a Person
//     named "...Team" (the research team is an Organization)
//   - the legacy brand ("TopWeightLoss") anywhere in a hub page
//   - ">undefined<" / ">NaN<" leaks in rendered HTML
//   - robots.txt without the hub sitemap line; sitemap index missing a
//     vertical; an llms.txt link that is not a 200
//   - legacy-host sample URLs not 301ing in one hop to the hub equivalent
//   - a vertical-prefixed copy of a shared page (/hair-loss/disclaimer)
//     answering 200 instead of 301
//   - a page that links to a non-canonical internal URL that redirects
//     or 404s (excluding intentionally noindexed slugs and images)
// WARN (report only):
//   - title > 70 chars, description missing or > 200 chars
//   - sitemap URLs without a medical review (reviewedBy) - count only
//   - Article schema without datePublished - count only
//   - HTML over 1 MB
import { spawn } from "node:child_process";
import http from "node:http";
import { setTimeout as sleep } from "node:timers/promises";

const HOST = "www.treatmentshub.com";
const ORIGIN = `https://${HOST}`;
const LEGACY_HOST = "www.topweightloss.io";
const PORT = Number(process.env.AUDIT_PORT || 4310);
const BASE = process.env.AUDIT_BASE || `http://localhost:${PORT}`;
const VERTICALS = ["weight-loss", "hair-loss", "trt", "hrt", "online-therapy"];
const SHARED_PAGES = ["disclaimer", "how-we-rank", "find-your-match", "about", "privacy", "terms"];
// Internal links that are allowed to point outside the sitemap.
const LINK_ALLOW = [/^\/weight-loss\/articles\/noom-/, /^\/verification\//, /\.(webp|png|jpg|svg|pdf)$/i, /^\/_next\//, /^\/api\//];

const fails = [];
const warns = [];
const fail = (m) => fails.push(m);
const warn = (m) => warns.push(m);

// node:http rather than fetch: undici silently drops a caller-set Host header,
// and the proxy routes on Host (hub vs legacy vs other), so fetch would audit
// the wrong site.
function get(path, { host = HOST, ua = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" } = {}) {
  const base = new URL(BASE);
  return new Promise((resolve, reject) => {
    const req = http.request(
      { hostname: base.hostname, port: base.port || 80, path, method: "GET", headers: { Host: host, "User-Agent": ua } },
      (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () =>
          resolve({
            status: res.statusCode ?? 0,
            location: res.headers.location || "",
            body: Buffer.concat(chunks).toString("utf8"),
            headers: res.headers,
          }),
        );
      },
    );
    req.on("error", reject);
    req.end();
  });
}

let server = null;
function stopServer() {
  if (!server?.pid) return;
  try {
    process.kill(-server.pid, "SIGTERM");
  } catch {
    try {
      server.kill();
    } catch {}
  }
}
async function ensureServer() {
  try {
    if ((await get("/robots.txt")).status === 200) return;
  } catch {}
  // Detached so the whole process group (npx -> next -> server) can be
  // stopped at the end; killing only the npx wrapper left the server running.
  server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    stdio: "ignore",
    detached: true,
    env: { ...process.env, PORT: String(PORT) },
  });
  for (let i = 0; i < 60; i++) {
    await sleep(1000);
    try {
      if ((await get("/robots.txt")).status === 200) return;
    } catch {}
  }
  throw new Error(`server did not come up on ${BASE}`);
}

const attr = (tag, name) => (tag.match(new RegExp(`\\s${name}="([^"]*)"`)) || [])[1] ?? "";
function parse(html) {
  const title = (html.match(/<title[^>]*>([^<]*)<\/title>/) || [])[1]?.trim() ?? "";
  const canonical = attr(html.match(/<link[^>]*rel="canonical"[^>]*>/)?.[0] ?? "", "href");
  const robots = attr(html.match(/<meta[^>]*name="robots"[^>]*>/)?.[0] ?? "", "content");
  const description = attr(html.match(/<meta[^>]*name="description"[^>]*>/)?.[0] ?? "", "content");
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  const links = [...html.matchAll(/<a\s[^>]*href="([^"#?]*)/g)]
    .map((m) => m[1])
    .map((h) => (h.startsWith(ORIGIN) ? h.slice(ORIGIN.length) || "/" : h))
    .filter((h) => h.startsWith("/") && !h.startsWith("//"));
  const ld = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      ld.push(JSON.parse(m[1]));
    } catch {
      ld.push({ __invalid: true });
    }
  }
  return { title, canonical, robots, description, h1, links, ld };
}

async function main() {
  await ensureServer();
  console.log(`Auditing ${BASE} as ${HOST}`);

  // robots.txt and sitemaps
  const robots = await get("/robots.txt");
  if (robots.status !== 200 || !robots.body.includes(`Sitemap: ${ORIGIN}/sitemap.xml`)) fail("robots.txt: missing or no hub Sitemap line");
  const index = await get("/sitemap.xml");
  const subs = [...index.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(ORIGIN, ""));
  for (const v of VERTICALS) if (!subs.includes(`/sitemap-${v}.xml`)) fail(`sitemap index: missing /sitemap-${v}.xml`);
  const urls = new Map(); // path -> sitemap
  for (const s of subs) {
    const r = await get(s);
    if (r.status !== 200) fail(`${s}: status ${r.status}`);
    for (const m of r.body.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.set(m[1].replace(ORIGIN, "") || "/", s);
  }
  console.log(`${urls.size} sitemap URLs across ${subs.length} sitemaps`);

  // crawl
  const pages = new Map();
  const paths = [...urls.keys()];
  const CONCURRENCY = 8;
  let next = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (next < paths.length) {
        const p = paths[next++];
        const r = await get(p);
        pages.set(p, { ...r, ...(r.body ? parse(r.body) : {}) });
      }
    }),
  );

  const titles = new Map();
  let noReview = 0;
  let noPublished = 0;
  const sitemapSet = new Set(paths);
  const linkTargets = new Map(); // non-sitemap internal link -> first source
  for (const [p, pg] of pages) {
    if (pg.status !== 200) {
      fail(`${p}: status ${pg.status}${pg.location ? ` -> ${pg.location}` : ""}`);
      continue;
    }
    const want = ORIGIN + (p === "/" ? "" : p);
    if (pg.canonical !== want && pg.canonical !== want + "/") fail(`${p}: canonical "${pg.canonical}"`);
    if (/noindex/i.test(pg.robots)) fail(`${p}: noindex on a sitemap URL`);
    if (!pg.title) fail(`${p}: no <title>`);
    else {
      if (titles.has(pg.title)) fail(`${p}: duplicate <title> with ${titles.get(pg.title)}`);
      titles.set(pg.title, p);
      if (pg.title.length > 70) warn(`${p}: title ${pg.title.length} chars`);
    }
    if (!pg.description) warn(`${p}: no meta description`);
    else if (pg.description.length > 200) warn(`${p}: description ${pg.description.length} chars`);
    if (pg.h1 !== 1) fail(`${p}: ${pg.h1} <h1> elements`);
    if (/topweightloss/i.test(pg.body)) fail(`${p}: legacy brand text present`);
    if (/>undefined<|>NaN</.test(pg.body)) fail(`${p}: undefined/NaN leak`);
    if (pg.body.length > 1_048_576) warn(`${p}: HTML ${Math.round(pg.body.length / 1024)} KB`);
    let reviewed = false;
    for (const node of pg.ld) {
      if (node.__invalid) fail(`${p}: invalid JSON-LD`);
      if (node.reviewedBy || node.mainEntityOfPage?.reviewedBy) reviewed = true;
      if (node["@type"] === "Article") {
        if (node.author?.["@type"] === "Person" && /team/i.test(node.author?.name ?? "")) fail(`${p}: team author typed as Person`);
        if (!node.datePublished) noPublished++;
      }
    }
    if (!reviewed) noReview++;
    for (const l of new Set(pg.links)) {
      if (sitemapSet.has(l) || LINK_ALLOW.some((re) => re.test(l))) continue;
      if (!linkTargets.has(l)) linkTargets.set(l, p);
    }
  }
  for (const [l, src] of linkTargets) {
    const r = await get(l);
    if (r.status !== 200) fail(`link to ${l} (from ${src}) answers ${r.status}${r.location ? ` -> ${r.location}` : ""}`);
  }
  if (noReview) warn(`${noReview} sitemap URLs carry no medical review (reviewedBy)`);
  if (noPublished) warn(`${noPublished} Article schemas have no datePublished`);

  // legacy host: one-hop 301 to the equivalent hub URL
  for (const [from, to] of [
    ["/", "/weight-loss"],
    ["/reviews/wellmedr", "/weight-loss/reviews/wellmedr"],
    ["/embody-vs-wellmedr", "/weight-loss/embody-vs-wellmedr"],
    ["/articles/is-embody-legit", "/weight-loss/articles/is-embody-legit"],
  ]) {
    const r = await get(from, { host: LEGACY_HOST });
    if (r.status !== 301 || r.location !== ORIGIN + to) fail(`legacy ${from}: ${r.status} ${r.location} (want 301 ${ORIGIN + to})`);
  }
  const legacyMap = await get("/sitemap.xml", { host: LEGACY_HOST });
  if (legacyMap.status !== 200 || !legacyMap.body.includes(`https://${LEGACY_HOST}/`)) fail("legacy sitemap not serving the old URLs");
  // apex -> www
  const apex = await get("/weight-loss", { host: "treatmentshub.com" });
  if (apex.status !== 301 || apex.location !== `${ORIGIN}/weight-loss`) fail(`apex: ${apex.status} ${apex.location}`);
  // cross-vertical copies of shared pages must redirect
  for (const v of VERTICALS.filter((v) => v !== "weight-loss")) {
    for (const s of SHARED_PAGES) {
      const r = await get(`/${v}/${s}`);
      // Same-host redirects come back as a path or as the local origin.
      const loc = r.location.replace(/^https?:\/\/[^/]+/, "");
      if (r.status !== 301 || loc !== `/weight-loss/${s}`) fail(`/${v}/${s}: ${r.status} ${r.location}`);
    }
  }

  // llms.txt
  const llms = await get("/llms.txt");
  if (llms.status !== 200) fail(`llms.txt: status ${llms.status}`);
  const llmsLinks = [...llms.body.matchAll(/\]\((https:\/\/www\.treatmentshub\.com[^)]*)\)/g)].map((m) => m[1].replace(ORIGIN, ""));
  for (const l of llmsLinks) {
    const r = pages.get(l) ?? (await get(l));
    if (r.status !== 200) fail(`llms.txt link ${l} answers ${r.status}`);
  }

  // AI crawlers get the same page
  for (const ua of ["GPTBot/1.2", "OAI-SearchBot/1.0", "PerplexityBot/1.0", "ClaudeBot/1.0", "Claude-SearchBot/1.0", "bingbot/2.0"]) {
    const r = await get("/weight-loss/reviews/wellmedr", { ua: `Mozilla/5.0 (compatible; ${ua})` });
    if (r.status !== 200 || !/<h1[\s>]/.test(r.body)) fail(`${ua}: status ${r.status} or no content`);
  }

  // report
  for (const f of fails) console.log(`FAIL ${f}`);
  for (const w of warns) console.log(`WARN ${w}`);
  console.log(`\nRESULT: ${fails.length ? "FAIL" : "PASS"} (${fails.length} fails, ${warns.length} warns, ${pages.size} pages)`);
  stopServer();
  process.exit(fails.length ? 1 : 0);
}

main().catch((e) => {
  console.error("audit crashed:", e);
  stopServer();
  process.exit(2);
});
