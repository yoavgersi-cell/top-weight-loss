#!/usr/bin/env node
// Deep SEO / GEO / AEO audit (Nov 13, 2026). Run against a local production
// build: npm run build && (PORT=4201 npm start &) && AUDIT_BASE=http://localhost:4201 node scripts/deep-seo-audit.mjs
// Complements scripts/seo-audit.mjs (which is the pass/fail gate); this one
// reports counts per signal and writes a JSON report (AUDIT_OUT).
// Deep SEO / GEO / AEO audit of the local production build.
// Crawls every sitemap URL with the production Host header and checks the
// signals the repo's seo-audit.mjs does not: schema completeness per type,
// social cards, heading structure, images, affiliate rel attributes, inbound
// links, thin content, answer blocks, visible dates, AI-crawler access,
// verification files, 404 handling. Writes report.json + prints a summary.
import http from "node:http";
import fs from "node:fs";
import { parse } from "node-html-parser";

const HOST = "www.treatmentshub.com";
const ORIGIN = `https://${HOST}`;
const BASE = process.env.AUDIT_BASE || "http://localhost:4201";
const OUT = process.env.AUDIT_OUT || "/tmp/deep-seo-audit-report.json";

function get(path, ua = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)", extra = {}) {
  const base = new URL(BASE);
  return new Promise((resolve, reject) => {
    const req = http.request(
      { hostname: base.hostname, port: base.port || 80, path, method: "GET", headers: { Host: HOST, "User-Agent": ua, ...extra } },
      (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString("utf8") }));
      },
    );
    req.on("error", reject);
    req.end();
  });
}

const issues = {}; // key -> [{url, detail}]
const add = (key, url, detail = "") => ((issues[key] ??= []).push({ url, detail }));
const stats = {};

// ── Sitemap URLs ──
const idx = await get("/sitemap.xml");
const subs = [...idx.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const urls = [];
const lastmods = {};
for (const s of subs) {
  const r = await get(s);
  for (const m of r.body.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?/g)) {
    const p = new URL(m[1]).pathname;
    urls.push(p);
    lastmods[p] = m[2] || null;
    if (!m[2]) add("sitemap.no_lastmod", p);
  }
}
stats.sitemapUrls = urls.length;

// ── Per-page crawl ──
const inbound = {}; // path -> Set(from)
const pages = {};
const descs = new Map();
const h1s = new Map();
const textOf = (el) => el.textContent.replace(/\s+/g, " ").trim();
const wordCount = (s) => (s.match(/[A-Za-z0-9’'$%.-]+/g) || []).length;

function walkSchema(node, fn, depth = 0) {
  if (!node || typeof node !== "object" || depth > 8) return;
  if (Array.isArray(node)) return node.forEach((n) => walkSchema(n, fn, depth));
  fn(node);
  for (const k of Object.keys(node)) if (k !== "@context") walkSchema(node[k], fn, depth + 1);
}
const isAbs = (u) => typeof u === "string" && /^https:\/\/www\.treatmentshub\.com\//.test(u) || (typeof u === "string" && /^https?:\/\//.test(u));

let n = 0;
for (const p of urls) {
  n++;
  if (n % 50 === 0) process.stderr.write(`  ${n}/${urls.length}\n`);
  const r = await get(p);
  if (r.status !== 200) { add("page.status", p, String(r.status)); continue; }
  const html = r.body;
  const root = parse(html, { blockTextElements: { script: true, style: true, noscript: true } });
  const head = root.querySelector("head");
  const meta = (name) => head?.querySelector(`meta[name="${name}"]`)?.getAttribute("content") ?? head?.querySelector(`meta[property="${name}"]`)?.getAttribute("content") ?? null;
  const title = head?.querySelector("title")?.textContent?.trim() ?? "";
  const desc = meta("description") ?? "";
  const ogTitle = meta("og:title"), ogDesc = meta("og:description"), ogImage = meta("og:image"), ogType = meta("og:type"), ogUrl = meta("og:url");
  const twCard = meta("twitter:card");
  const canonical = head?.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "";
  const lang = root.querySelector("html")?.getAttribute("lang");
  const viewport = meta("viewport");
  const robotsMeta = meta("robots") ?? "";

  // Title / description quality
  if (title.length < 30) add("title.short", p, `${title.length}: ${title}`);
  if (title.length > 60) add("title.long60", p, `${title.length}`);
  if (desc.length && desc.length < 70) add("desc.short", p, `${desc.length}`);
  if (desc.length > 160) add("desc.long160", p, `${desc.length}`);
  if (desc) { if (descs.has(desc)) add("desc.duplicate", p, `same as ${descs.get(desc)}`); else descs.set(desc, p); }
  if (!ogTitle) add("og.title_missing", p);
  if (!ogDesc) add("og.desc_missing", p);
  if (!ogImage) add("og.image_missing", p);
  else if (!/^https:\/\//.test(ogImage)) add("og.image_relative", p, ogImage);
  if (!ogUrl) add("og.url_missing", p); else if (ogUrl !== canonical) add("og.url_mismatch", p, `${ogUrl} vs ${canonical}`);
  if (!ogType) add("og.type_missing", p);
  if (!twCard) add("twitter.card_missing", p);
  if (lang !== "en" && lang !== "en-US") add("html.lang", p, String(lang));
  if (!viewport) add("meta.viewport_missing", p);
  if (!/^https:\/\/www\.treatmentshub\.com\//.test(canonical)) add("canonical.not_absolute", p, canonical);
  if (/nosnippet|max-snippet:0/.test(robotsMeta)) add("robots.snippet_blocked", p, robotsMeta);

  // Headings
  const hs = root.querySelectorAll("h1,h2,h3,h4,h5,h6").map((h) => ({ l: Number(h.tagName[1]), t: textOf(h) }));
  const h1 = hs.filter((h) => h.l === 1).map((h) => h.t);
  if (h1[0]) { if (h1s.has(h1[0])) add("h1.duplicate", p, `same as ${h1s.get(h1[0])}`); else h1s.set(h1[0], p); }
  hs.forEach((h) => { if (!h.t) add("heading.empty", p, `h${h.l}`); });
  for (let i = 1; i < hs.length; i++) if (hs[i].l > hs[i - 1].l + 1) { add("heading.skip", p, `h${hs[i - 1].l} -> h${hs[i].l} "${hs[i].t.slice(0, 40)}"`); break; }
  const h2count = hs.filter((h) => h.l === 2).length;

  // Main text
  const main = root.querySelector("main") ?? root.querySelector("body");
  const mainText = main ? textOf(main) : "";
  const words = wordCount(mainText);
  if (words < 300) add("content.thin", p, `${words} words`);

  // Images
  const imgs = root.querySelectorAll("img");
  let noAlt = 0, noDims = 0, pngCount = 0;
  for (const im of imgs) {
    const alt = im.getAttribute("alt");
    if (alt === null || alt === undefined) noAlt++;
    if (!im.getAttribute("width") || !im.getAttribute("height")) noDims++;
    if (/\.png(\?|$)/i.test(im.getAttribute("src") || "")) pngCount++;
  }
  if (noAlt) add("img.no_alt", p, `${noAlt}/${imgs.length}`);
  if (noDims) add("img.no_dims", p, `${noDims}/${imgs.length}`);
  if (pngCount) add("img.png", p, `${pngCount}`);

  // Links
  const as = root.querySelectorAll("a[href]");
  let affiliateNoSponsored = 0, affiliateNoNofollow = 0, externalNoNoopener = 0, emptyAnchor = 0, genericAnchor = 0, internal = 0, external = 0;
  const brokenFrag = [];
  const ids = new Set(root.querySelectorAll("[id]").map((e) => e.getAttribute("id")));
  for (const a of as) {
    const href = a.getAttribute("href") || "";
    const rel = (a.getAttribute("rel") || "").toLowerCase();
    const txt = textOf(a) || (a.querySelector("img")?.getAttribute("alt") ?? "") || a.getAttribute("aria-label") || "";
    if (!txt) emptyAnchor++;
    if (/^(click here|here|read more|learn more|more)$/i.test(txt)) genericAnchor++;
    if (href.startsWith("#")) { if (href.length > 1 && !ids.has(href.slice(1))) brokenFrag.push(href); continue; }
    if (/^https?:\/\//.test(href) && !href.startsWith(ORIGIN)) {
      external++;
      const isAff = /aff_c|aff_id|affiliate|\/go\/|utm_source=treatments|ref=treatments|track\.|clk\.|impact|partner|awin|shareasale|cj\.com|refersion|tapfiliate|\?a=|\/r\/|redirect/i.test(href) || a.getAttribute("target") === "_blank" && /nofollow/.test(rel);
      if (a.getAttribute("target") === "_blank" && !/noopener/.test(rel)) externalNoNoopener++;
      if (isAff) { if (!/sponsored/.test(rel)) affiliateNoSponsored++; if (!/nofollow|sponsored/.test(rel)) affiliateNoNofollow++; }
      continue;
    }
    if (href.startsWith("/") || href.startsWith(ORIGIN)) {
      internal++;
      let path = href.startsWith(ORIGIN) ? href.slice(ORIGIN.length) : href;
      path = path.split("#")[0].split("?")[0];
      if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
      if (path && path !== p) (inbound[path] ??= new Set()).add(p);
    }
  }
  if (emptyAnchor) add("link.empty_anchor", p, `${emptyAnchor}`);
  if (genericAnchor) add("link.generic_anchor", p, `${genericAnchor}`);
  if (affiliateNoSponsored) add("link.affiliate_no_sponsored", p, `${affiliateNoSponsored}`);
  if (affiliateNoNofollow) add("link.affiliate_followed", p, `${affiliateNoNofollow}`);
  if (externalNoNoopener) add("link.blank_no_noopener", p, `${externalNoNoopener}`);
  if (brokenFrag.length) add("link.broken_fragment", p, brokenFrag.slice(0, 5).join(" "));

  // Structured data
  const scripts = root.querySelectorAll('script[type="application/ld+json"]');
  const types = [];
  const ids$ = new Map();
  let hasArticle = false, hasFaq = false, hasBreadcrumb = false, hasWebPage = false, faqQs = [];
  for (const s of scripts) {
    let d;
    try { d = JSON.parse(s.textContent); } catch { add("schema.invalid_json", p); continue; }
    walkSchema(d, (node) => {
      const t = node["@type"];
      if (!t) return;
      const tt = Array.isArray(t) ? t.join("+") : t;
      types.push(tt);
      if (node["@id"]) { if (ids$.has(node["@id"]) && JSON.stringify(ids$.get(node["@id"])) !== JSON.stringify(node)) add("schema.id_conflict", p, node["@id"]); ids$.set(node["@id"], node); }
      if (/^(Article|NewsArticle|BlogPosting|MedicalWebPage)$/.test(tt) && node.headline !== undefined) {
        hasArticle = true;
        if (!node.headline) add("schema.article.no_headline", p);
        else if (node.headline.length > 110) add("schema.article.headline_long", p, `${node.headline.length}`);
        if (!node.datePublished) add("schema.article.no_datePublished", p);
        if (!node.dateModified) add("schema.article.no_dateModified", p);
        if (node.datePublished && node.dateModified && node.dateModified < node.datePublished) add("schema.article.modified_before_published", p);
        if (node.dateModified && node.dateModified.slice(0, 10) > "2026-11-13") add("schema.article.future_date", p, node.dateModified);
        if (!node.author) add("schema.article.no_author", p);
        else { const au = Array.isArray(node.author) ? node.author : [node.author]; au.forEach((a) => { if (!a.url && !a["@id"]) add("schema.article.author_no_url", p, a.name); }); }
        if (!node.publisher) add("schema.article.no_publisher", p);
        else if (!node.publisher.logo) add("schema.article.publisher_no_logo", p);
        if (!node.image) add("schema.article.no_image", p);
        if (!node.mainEntityOfPage) add("schema.article.no_mainEntityOfPage", p);
      }
      if (tt === "FAQPage") {
        hasFaq = true;
        const qs = node.mainEntity || [];
        if (!qs.length) add("schema.faq.empty", p);
        qs.forEach((q) => { const a = q.acceptedAnswer?.text || ""; if (!q.name || !a) add("schema.faq.incomplete", p, q.name); faqQs.push(q.name || ""); });
      }
      if (tt === "BreadcrumbList") {
        hasBreadcrumb = true;
        const items = node.itemListElement || [];
        items.forEach((it, i) => {
          if (it.position !== i + 1) add("schema.breadcrumb.position", p, `${it.position} at ${i}`);
          const item = typeof it.item === "string" ? it.item : it.item?.["@id"] || it.item?.url;
          if (i < items.length - 1 && !isAbs(item)) add("schema.breadcrumb.item_not_absolute", p, String(item));
        });
      }
      if (tt === "WebPage" || tt === "MedicalWebPage" || tt === "CollectionPage" || tt === "AboutPage" || tt === "ItemPage") hasWebPage = true;
      if (tt === "AggregateRating") {
        if (!node.ratingValue || !(node.reviewCount || node.ratingCount)) add("schema.aggregateRating.incomplete", p);
      }
      if (tt === "Review" && !node.author) add("schema.review.no_author", p);
      if (tt === "Person" && node.jobTitle && !node.sameAs && !node.url) add("schema.person.no_url", p, node.name);
      if (tt === "Organization" && node.name === "Treatments Hub" && node.logo && !node.sameAs && !node["@id"]) { /* fine: nested publisher */ }
      if (tt === "Product" && !node.offers && !node.aggregateRating) add("schema.product.bare", p, node.name);
      if (tt === "Offer" && node.price !== undefined && !node.priceCurrency) add("schema.offer.no_currency", p);
      if (tt === "ImageObject" && node.url && !/^https:\/\//.test(node.url)) add("schema.image_relative", p, node.url);
      if (node.url && typeof node.url === "string" && node.url.startsWith("/")) add("schema.relative_url", p, node.url);
    });
  }
  // FAQ visible-text match
  if (hasFaq) {
    const bodyText = textOf(root.querySelector("body"));
    const missing = faqQs.filter((q) => q && !bodyText.includes(q.replace(/\s+/g, " ").trim().slice(0, 40)));
    if (missing.length) add("schema.faq.not_visible", p, `${missing.length}: ${missing[0]?.slice(0, 50)}`);
  }
  const isArticlePath = /\/articles\/[^/]+$/.test(p);
  const isReviewPath = /\/reviews\/[^/]+$/.test(p);
  if (!hasBreadcrumb && p.split("/").length > 2) add("schema.no_breadcrumb", p);
  if (isArticlePath && !hasArticle) add("schema.article_page_without_article", p);
  if (!scripts.length) add("schema.none", p);

  // AEO: answer block / visible dates / byline / sources / tables
  const bodyText = mainText;
  const hasVisibleDate = /\b(Updated|Reviewed|Published|Last updated|verified|as of)\b[^.]{0,40}\b(20\d\d)\b/i.test(bodyText);
  if (!hasVisibleDate) add("aeo.no_visible_date", p);
  const hasByline = /\b(Medically reviewed|Medical reviewer|Written by|Reviewed by|By Treatments Hub|Research Team)\b/i.test(bodyText);
  if (!hasByline && (isArticlePath || isReviewPath)) add("eeat.no_byline", p);
  const hasQuickAnswer = /(quick answer|short answer|the answer|in short|bottom line|TL;DR|at a glance)/i.test(bodyText);
  if (isArticlePath && !hasQuickAnswer) add("aeo.no_answer_block", p);
  const tables = root.querySelectorAll("table").length;
  const lists = root.querySelectorAll("main ul, main ol").length;
  if (isArticlePath && !tables && !lists) add("aeo.no_tables_or_lists", p);
  if (isArticlePath && external < 1) add("eeat.no_external_sources", p);
  const disclosure = /affiliate|commission/i.test(bodyText);
  if (affiliateNoSponsored + affiliateNoNofollow > 0 || /aff_c|aff_id/.test(html)) { if (!disclosure) add("eeat.affiliate_without_disclosure", p); }
  if (!h2count && words > 600) add("structure.no_h2", p);

  pages[p] = { title, titleLen: title.length, descLen: desc.length, words, imgs: imgs.length, internal, external, types: [...new Set(types)], h2count, tables };
}

// ── Inbound links ──
let low = 0;
for (const p of urls) {
  const c = inbound[p]?.size ?? 0;
  pages[p].inbound = c;
  if (c < 3) { low++; add("links.low_inbound", p, `${c}`); }
}
stats.lowInbound = low;

// ── Site-level checks ──
const ua = async (name, agent) => { const r = await get("/weight-loss", agent); if (r.status !== 200 || !/<h1/.test(r.body)) add("ai.blocked", name, String(r.status)); };
for (const [name, agent] of [["GPTBot", "GPTBot/1.0"], ["ChatGPT-User", "ChatGPT-User/1.0"], ["OAI-SearchBot", "OAI-SearchBot/1.0"], ["ClaudeBot", "ClaudeBot/1.0"], ["anthropic-ai", "anthropic-ai"], ["PerplexityBot", "PerplexityBot/1.0"], ["Bingbot", "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)"], ["Applebot", "Applebot/0.1"], ["Google-Extended", "Google-Extended"], ["Amazonbot", "Amazonbot/0.1"], ["DuckAssistBot", "DuckAssistBot"], ["meta-externalagent", "meta-externalagent/1.1"], ["CCBot", "CCBot/2.0"], ["Bytespider", "Bytespider"], ["YandexBot", "YandexBot/3.0"]]) await ua(name, agent);
const robots = await get("/robots.txt");
stats.robots = robots.body;
for (const f of ["/llms.txt", "/llms-full.txt", "/feed.xml", "/sitemap.xml", "/favicon.ico", "/apple-icon.png", "/icon.png", "/manifest.webmanifest", "/site.webmanifest", "/humans.txt", "/security.txt", "/.well-known/security.txt", "/ai.txt", "/BingSiteAuth.xml", "/googlebf28f3815ec07e51.html", "/500308dadc1af5a68815ac610218ade9b0afd4a45b3d2a447970ac69a4eb2cb9.txt", "/opengraph-image", "/weight-loss/opengraph-image"]) {
  const r = await get(f);
  stats[`file ${f}`] = r.status;
}
// llms.txt coverage
const llms = await get("/llms.txt");
const llmsLinks = new Set([...llms.body.matchAll(/\]\((https:\/\/www\.treatmentshub\.com[^)]+)\)/g)].map((m) => new URL(m[1]).pathname));
stats.llmsLinks = llmsLinks.size;
stats.llmsCoverage = urls.filter((u) => llmsLinks.has(u)).length;
// 404 behaviour
for (const f of ["/no-such-page-xyz", "/weight-loss/no-such-page-xyz", "/weight-loss/articles/no-such-xyz", "/ed/reviews/no-such"]) {
  const r = await get(f);
  stats[`404 ${f}`] = `${r.status}${r.headers.location ? " -> " + r.headers.location : ""}`;
}
// Compression / headers
const hdr = await get("/weight-loss", undefined, { "Accept-Encoding": "gzip, deflate, br" });
stats.headers = { "content-encoding": hdr.headers["content-encoding"], "cache-control": hdr.headers["cache-control"], "x-robots-tag": hdr.headers["x-robots-tag"], "content-type": hdr.headers["content-type"] };
// OG image reachable for a sample
for (const p of ["/weight-loss", "/weight-loss/articles/best-tirzepatide-online", "/weight-loss/reviews/embody", "/ed", "/hair-loss"]) {
  const r = await get(p);
  const og = r.body.match(/property="og:image" content="([^"]+)"/)?.[1];
  if (og) { const path = og.replace(ORIGIN, ""); const i = await get(path); stats[`og ${p}`] = `${i.status} ${i.headers["content-type"]} ${i.headers["content-length"] || i.body.length}b`; }
}

// ── Output ──
const summary = Object.entries(issues).map(([k, v]) => [k, v.length]).sort((a, b) => b[1] - a[1]);
fs.writeFileSync(OUT, JSON.stringify({ stats, summary, issues, pages }, null, 1));
console.log("STATS", JSON.stringify(stats, null, 1));
console.log("ISSUES (key: count)");
for (const [k, c] of summary) console.log(`  ${String(c).padStart(4)}  ${k}   e.g. ${issues[k][0].url} ${issues[k][0].detail}`.slice(0, 200));
