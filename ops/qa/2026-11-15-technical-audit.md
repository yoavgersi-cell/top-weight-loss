# Technical SEO audit: treatmentshub.com

- Date: 2026-11-15
- Author: Felix (QA and technical SEO)
- Status: ready
- Update 16:30 UTC the same day: the operator approved F1, F2, F3, F5, F6 (code part), F8, F9, F16, F17, F18, F21, F24 and, later, F28; they shipped and were verified live in PRs #614 to #618 (section 5). Sections 1 to 4 are the morning baseline and are left as written.
- Answers: operator request "Let's make an audit of the technical fixes we need to do. Let me know every finding before we do it." Report only: nothing was edited, committed, pushed or merged. Every row below is a proposal.

Scope: local production build of `claude/weight-loss-rifgr-0mgcit` (equals `main` 47f2490 plus one ops commit) served on port 4201, plus the live deployment at https://www.treatmentshub.com (Vercel production deploy of 47f2490 at 13:43 UTC). No previous report exists in `ops/qa/` (only `.gitkeep`), so there is no week-over-week diff; this report is the baseline.

## 1. Summary

| Check | Result |
|---|---|
| `npx tsc --noEmit -p .` | 0 errors |
| `npm run build` | 0 errors |
| `scripts/seo-audit.mjs` on the local build | **PASS** (0 fails, 2 warns, 480 pages, 7 sitemaps). Warns: 35 sitemap URLs with no `reviewedBy`; 60 Article schemas with no `datePublished`. |
| `scripts/deep-seo-audit.mjs` on the local build | 480 URLs. Counts: img.no_dims 157, link.affiliate_no_sponsored 63, schema.article.no_datePublished 60, aeo.no_answer_block 27, aeo.no_visible_date 26, img.png 3, eeat.affiliate_without_disclosure 3, schema.id_conflict 3, link.affiliate_followed 3, title.short 3, schema.article.future_date 2, canonical.not_absolute 1, desc.long160 1, link.generic_anchor 1. lowInbound 0. llms.txt coverage 398/480. |
| `scripts/seo-audit.mjs` on the **live** deployment (via an HTTPS forwarder in the scratchpad) | **FAIL** (52 fails, 5 warns, 507 pages). 26 sitemap URLs redirect, 13 llms.txt links redirect, 7 internal links point at redirecting URLs, 1 apex-redirect status mismatch (308 vs the script's 301), 5 legacy-host checks that this environment cannot reach (not real failures). Warns: 1 description 205 chars, 2 titles 72 and 74 chars, 38 URLs without `reviewedBy`, 60 Articles without `datePublished`. |
| `scripts/deep-seo-audit.mjs` on the **live** deployment | Crashed at `scripts/deep-seo-audit.mjs:263` (`pages[p].inbound` on a redirecting sitemap URL). Re-run with a one-line-guarded copy from the scratchpad: 507 URLs; img.no_dims 182, link.affiliate_no_sponsored 70, schema.article.no_datePublished 60, aeo.no_answer_block 48, img.png 41, page.status 27, aeo.no_visible_date 26, desc.long160 20, title.long60 13, link.affiliate_followed 11, eeat.affiliate_without_disclosure 3, schema.id_conflict 3, title.short 3, schema.article.future_date 2, canonical.not_absolute 1, link.generic_anchor 1. lowInbound 0. llms.txt coverage 409/507. Details in section 1a. |
| Live status crawl of all 507 sitemap URLs | 481 x 200, 24 x 301, 2 x 308. TTFB on the 200s: p50 1.77 s, p90 1.91 s, max 2.86 s, measured from this environment through its egress proxy (direct single samples: 0.90 to 1.29 s). Every HTML response was `x-vercel-cache: MISS`. |
| Sitemaps (live) | Index plus 7 sub-sitemaps, all 200, all well-formed XML (`xmllint`), 507 URLs, 0 duplicates, 0 trailing slashes, 0 non-www, every URL has `lastmod`, 0 future dates. |
| robots.txt (live) | 200; `Allow: /`, `Disallow: /admin`, `Disallow: /api/`, `Sitemap:` line present, Content-Signal line present. |
| feed.xml (live) | 200, `application/rss+xml`, well-formed, 100 items, all 100 links are sitemap URLs, 0 redirecting. |
| llms.txt (live) | 200, `text/plain`, 458 links, 13 of them redirect (section 2, F3). `/llms-full.txt` 404. |
| Redirects | `https://treatmentshub.com/*` -> 308 -> `https://www.treatmentshub.com/*`; `/weight-loss/` -> 308 -> `/weight-loss`; `/about`, `/reviews`, `/articles` -> 301 -> `/weight-loss/...`; `/uk/*` -> 301 -> `/weight-loss`; `/weight-loss/reviewers/<slug>` -> 301 -> `/reviewers/<slug>`; `/hair-loss/about` -> 301 -> `/weight-loss/about`. All single hop except the two in F1 and F5. |
| Headers (live HTML) | CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy, HSTS `max-age=63072000; includeSubDomains; preload` all present. `cache-control: private, no-cache, no-store`. `/_next/static/*` is `public,max-age=31536000,immutable`, gzip. |
| Deploy and IndexNow | Vercel Production deployment of 47f2490 at 13:43:00Z (matches `main`). `IndexNow on production deploy` run succeeded at 13:43:02Z; `IndexNow daily push` succeeded daily, last 13:57:44Z today. |

Checks that came back clean on every page (local 480 and, where the script covers it, live 507): exactly one `<h1>`; no heading-level skips; no duplicate `<title>`; no duplicate meta description or H1 (local); 100 % image alt coverage; no mixed content (`http://` in `src`/`href`: 0 of 480); no `noindex` on a sitemap URL; every canonical absolute and equal to the sitemap URL; `og:title`, `og:description`, `og:image` (absolute, resolves 200), `og:url` (= canonical), `og:type`, `og:site_name` and `twitter:card` on every page; `<html lang="en-US">` and viewport on every page; every JSON-LD block parses; author is always `Organization` "Treatments Hub Research Team" (0 Person-typed team authors); reviewers render as "Francheska Capistrano, RMT, MPH" and "Dr. B. Dolapihilla, MBBS" (0 occurrences of "MD" after Dolapihilla, 0 psychology mentions within 300 characters of her name); no legacy-brand text; no `>undefined<` / `>NaN<` leaks; 15 AI crawler user agents and bingbot receive the full page; Google and Bing verification files and the IndexNow key file answer 200; unknown deep paths answer a true 404; hreflang exists only on the homepage (`en-US` + `x-default`, both self-referencing), none on inner pages, which is consistent for a single-locale site.

### 1a. Live deep audit (patched copy) versus local

| Signal | Local (480) | Live (507) | Why they differ |
|---|---|---|---|
| page.status (non-200 sitemap URL) | 0 | 27 | 26 redirects (F2) + 1 transient `599` from the forwarder on `/weight-loss/shed-vs-sprout` (answered 200 in the direct curl crawl; not a site issue) |
| img.png | 3 pages / 7 images | 41 pages / 138 images | Blob-uploaded PNG assets: Ro logo hotlinked from `miro.medium.com`, Medvi PNG logo, three "ChatGPT Image ..."/"Screenshot ..." PNG uploads (F29) |
| img.no_dims | 157 | 182 | The same `fill` hero pattern (F20) plus the hotlinked Ro logo, which has no width/height (F29) |
| link.affiliate_followed | 3 | 11 | 8 live pages render the featured-provider sidebar image link without `rel` (F28); the other 3 are Reddit links (F19) |
| link.affiliate_no_sponsored | 63 | 70 | Script heuristic counting `nofollow` Trustpilot/Reddit links (F16); the 8 sidebar links are also in here |
| title.long60 | 0 | 13 | Blob-stored titles 62 to 74 chars (F15, Appendix F) |
| desc.long160 | 1 | 20 | Blob-stored descriptions 161 to 205 chars (F15, Appendix F) |
| aeo.no_answer_block | 27 | 48 | More weight-loss and HRT articles on live (22 weight-loss, 15 HRT, 7 ED, 3 hair-loss, 1 TRT) |
| llms.txt coverage | 398/480 | 409/507 | 98 live sitemap URLs are not in llms.txt (F26) |
| schema.article.no_datePublished, schema.id_conflict, title.short, aeo.no_visible_date, eeat.affiliate_without_disclosure, future_date, canonical.not_absolute, generic_anchor | 60 / 3 / 3 / 26 / 3 / 2 / 1 / 1 | same | Template-level, identical on both |
| heading.skip, img.no_alt, desc.duplicate, h1.duplicate, og.* missing, twitter.card_missing, html.lang, schema.invalid_json, schema.faq.not_visible, schema.no_breadcrumb, content.thin, link.blank_no_noopener, ai.blocked | 0 | 0 | Clean on both |

Re-run after PR #615 (sitemap filter) with the corrected script from PR #616, natively over HTTPS (`AUDIT_BASE=https://www.treatmentshub.com`), 482 sitemap URLs, no crash: page.status 1 (one transient `ECONNRESET` on `/weight-loss/articles/glp1-true-cost-month-1-vs-year-one`, answered 200 on recheck; the script now retries once), img.no_dims 182, img.png 42, schema.article.no_datePublished 60, aeo.no_answer_block 48, aeo.no_visible_date 26, desc.long160 20, title.long60 13, link.affiliate_no_sponsored 8 and link.affiliate_followed 8 (now exactly the F28 sidebar links, nothing else), schema.id_conflict 3, link.ugc_followed 3 (the F19 Reddit links, reported under their own key), title.short 3, eeat.affiliate_without_disclosure 1 (F30), link.generic_anchor 1; schema.article.future_date 0 and canonical.not_absolute 0 (both were script defects); llms.txt links 401, coverage 396/482; lowInbound 0. Local, same script, 479 URLs: the same list minus the live-only Blob items, with link.affiliate_no_sponsored 0 and link.affiliate_followed 0.

## 2. Findings

Severity: critical / high / medium / low. Type: **M** = mechanical (I could ship it alone under the agent rules), **O** = content, price, ranking, design or data decision for the operator, **M+O** = code part is mechanical but the operator must choose the outcome.

| # | Sev | Where | What is wrong | Evidence | Proposed fix | Type |
|---|---|---|---|---|---|---|
| F1 | critical | live `/weight-loss/trimrx-vs-ro` and `/weight-loss/ro-vs-trimrx` (both in `sitemap-weight-loss.xml`) | Redirect loop. The battle page 308s `trimrx-vs-ro` to `ro-vs-trimrx` (the slug stored in the CMS config), and the proxy 301s `ro-vs-trimrx` back to `trimrx-vs-ro` (`SLUG_ALIASES`). Neither URL can ever load; both are in the sitemap and both are linked from `/weight-loss/reviews`. | `curl -L --max-redirs 6 .../weight-loss/trimrx-vs-ro` -> 6 hops, ends 308 on itself; same for `ro-vs-trimrx` ending 301. Sources: `src/components/pages/battle-page.tsx:593-598` (reversed-slug `permanentRedirect`) and `src/lib/slug-aliases.ts:46` (`"ro-vs-trimrx": "trimrx-vs-ro"`). | Decide which slug is canonical (the alias file says `trimrx-vs-ro`). Then either rename the battle slug in the CMS config to `trimrx-vs-ro`, or make `battle-page.tsx` consult `SLUG_ALIASES` before the reversed-slug redirect so it never redirects to an aliased slug. Add a unit-style guard: no alias target may equal a stored battle slug's reverse. | M+O |
| F2 | high | live `sitemap-weight-loss.xml`: 26 of 216 URLs | Sitemap lists URLs that redirect (24 x 301, 2 x 308). All are retired battles/articles still present in the Blob-stored CMS config; the proxy's `PATH_REDIRECTS` / `SLUG_ALIASES` redirect them, but `src/lib/sitemaps.ts` never filters by those maps. Google reports these as "Page with redirect" and wastes crawl budget the Nov sitemap trim was meant to protect. Full list in Appendix A. | Live status crawl: 26 non-200 sitemap URLs; local build lists 480 URLs, live lists 507 (27 extra, 26 redirecting). `seo-audit.mjs` against live: 26 `status 301/308` FAIL lines. | Mechanical part: in `verticalEntries()` drop any battle whose slug is a `SLUG_ALIASES` key or whose content path is a `PATH_REDIRECTS` / `VERTICAL_PATH_REDIRECTS` key, drop articles the same way, and drop non-canonical reverse-pair slugs (the `canonicalPairSlug` rule in `battle-page.tsx:607-618`). Operator part: delete the retired items in the admin CMS so they stop appearing anywhere. | M+O |
| F3 | high | live `/llms.txt`: 13 of 458 links | llms.txt links to redirecting URLs (11 retired article slugs, `embody-vs-altrx`, `shed-vs-embody`). The gate script fails on this. List in Appendix B. | `seo-audit.mjs` against live: 13 `llms.txt link ... answers 301` FAIL lines. | Same filter as F2 applied in `src/app/llms.txt/route.ts`; or derive llms.txt from the already-filtered sitemap list so the two can never disagree. | M |
| F4 | high | live: 4 pages, 7 links | Internal links to URLs that redirect. Three article bodies link to **un-prefixed** battle paths (`/altrx-vs-ro`, `/altrx-vs-noom`, `/noom-vs-ro`, `/noom-vs-found`, `/noom-vs-shed`, `/altrx-vs-embody`), which 301 into `/weight-loss/...`; `/weight-loss/articles` lists `best-weight-loss-telehealth-providers`, which 301s to `/weight-loss`. | `seo-audit.mjs` against live, 7 `link to ... answers 301` FAIL lines (Appendix C). Not present locally (the article bodies live in Blob). | Un-prefixed hrefs: fix the six links in the three article bodies (`best-noom-alternatives`, `best-ro-alternatives`, `embody-alternatives`) to the canonical `/weight-loss/<slug>` targets (or to the page they now redirect to); this edits content, so Sloane/operator. Optionally add a renderer rewrite that prefixes bare internal hrefs with the current vertical (mechanical safety net). Articles index: filter out articles whose path is a `PATH_REDIRECTS` key (mechanical). | M+O |
| F5 | high | live `/weight-loss/found-vs-embody` (in sitemap) | Two-hop redirect chain: 308 -> `/weight-loss/embody-vs-found` -> 301 -> `/weight-loss/reviews/embody`. | `curl -L`: 2 hops to the 200. | Add `"/found-vs-embody": "/reviews/embody"` to `PATH_REDIRECTS` in `src/proxy.ts` so it resolves in one 301; remove from sitemap via F2. | M |
| F6 | high | QA process: `scripts/seo-audit.mjs`, `scripts/deep-seo-audit.mjs` | The pass/fail gate runs against the local build, which reads fallback data, not the Blob-stored CMS config the live site renders. Local = PASS with 480 URLs; live = FAIL with 507 URLs. Every live failure above was invisible to the gate, and three live battle pages (`noom-vs-found`, `noom-vs-shed`, `shed-vs-sprout`) do not exist locally at all. | Local sitemap 480 URLs vs live 507; local audit PASS vs live FAIL 52. | Run both scripts against production after each deploy (the forwarder approach used here, or add native HTTPS support to the scripts) and/or give the local audit a read-only Blob token so it audits the real config. Also make the deploy-triggered IndexNow workflow (or a sibling job) run the gate and post the result. Operator decides on credentials/CI. | M+O |
| F7 | high | every HTML page on live | All pages are server-rendered per request: `cache-control: private, no-cache, no-store`, `x-vercel-cache: MISS` on 481/481 pages, TTFB p50 1.77 s / p90 1.91 s (via proxy; 0.9 to 1.3 s direct samples). TTFB this high caps LCP and is the main Core Web Vitals risk; crawl rate also suffers. Cause: CMS config read at request time (`getConfig` from Blob) with `force-dynamic` routes and `headers()` in root routes. | Headers on `/weight-loss`, `/ed`, `/hair-loss`, article and review samples; 3 consecutive requests to `/weight-loss` all MISS at 0.99 to 1.29 s. | Architecture decision: add ISR (`revalidate`) or `unstable_cache` around the Blob config read with on-demand revalidation from the admin save path; move host-dependent logic out of cached routes. Measure with PageSpeed afterwards. | O |
| F28 | high | `src/components/sidebar.tsx:64`; live `/weight-loss`, `/weight-loss/semaglutide`, `/weight-loss/tirzepatide`, `/weight-loss/best-online-weight-loss-programs`, `/weight-loss/best-weight-loss-injections`, `/weight-loss/ozempic-for-weight-loss`, `/weight-loss/wegovy-providers`, `/weight-loss/cheapest-weight-loss-medication` | The sticky-sidebar "Editor's Featured Provider" image is wrapped in `<a href={featured.affiliateUrl}>` with **no `rel` and no `target`**, so a paid affiliate link (`https://track.revoffers.com/aff_c?offer_id=1548&aff_id=12904`) is followed on 8 money pages. Every other affiliate anchor on the same page (35 of 36 on `/weight-loss`) correctly carries `rel="sponsored nofollow noopener noreferrer"`. House rule 4 and Google's paid-link policy both require `sponsored`/`nofollow`. | Live `/weight-loss` HTML: `<a href="https://track.revoffers.com/aff_c?offer_id=1548&amp;aff_id=12904" class="block overflow-hidden rounded-xl border border-[#EAEAEA]">` wrapping `<picture>` `/sidebar/embody.webp`. Deep audit `link.affiliate_followed` on the 8 pages. | Add `target="_blank" rel="sponsored nofollow noopener noreferrer"` to the anchor in `sidebar.tsx` (or render it through `ProviderCta`). One line; ship first. | M |
| F8 | medium | every 404 response (e.g. live `/weight-loss/articles/no-such-xyz`, `/weight-loss/reviews/ALTRX`, `/weight-loss/go/wellmedr`, `/reviewers`) | 404 pages carry two conflicting robots tags, `<meta name="robots" content="noindex"/>` and `<meta name="robots" content="index, follow"/>`, plus `<link rel="canonical" href="https://www.treatmentshub.com"/>`, the homepage title and the root OG tags. Cause: `src/app/layout.tsx:70-87` sets `alternates.canonical` and `robots` on the root layout; `src/app/not-found.tsx` exports no metadata so it inherits them, and Next adds its own `noindex`. | `curl` of the 404 pages above; both tags and the canonical present. | Export `metadata` from `not-found.tsx` with `robots: { index: false, follow: false }` and no canonical; move the homepage canonical/hreflang from the root layout to the hub page (`(main)/hub/page.tsx`) so nothing inherits it. | M |
| F9 | medium | live `/hub` | `/hub` answers 200 with the full homepage (canonical -> `/`). The proxy rewrites `/` to `/hub` but also serves `/hub` directly (`src/proxy.ts:224-226`), so a duplicate URL is crawlable. | `curl -I https://www.treatmentshub.com/hub` -> 200, canonical `https://www.treatmentshub.com`. | In the proxy, 301 a direct request for `/hub` (not the internal rewrite) to `/`. | M |
| F10 | medium | 60 review pages (all `/<vertical>/reviews/<slug>` in the sitemap), local and live | `Article` schema has no `datePublished`. `ReviewData` (`src/lib/config.ts:99`) only stores `updatedAt`; there is no publish date on record. | `seo-audit.mjs` WARN "60 Article schemas have no datePublished"; deep audit `schema.article.no_datePublished` 60, all reviews. | Operator: decide whether a publish date exists in any record (CMS history, git log of the first import). If yes, add a `publishedAt` field and emit it. If not, leave it out; do not backfill (house rules 3 and 5). | O |
| F11 | medium | 12 landing pages (list in Appendix D), local and live | `FAQPage` schema contains entries that are not questions: section headings such as "How Online Weight Loss Programs Work" or "How we ranked the cheapest TRT clinics" are emitted as `Question.name`. On the weight-loss LPs 3 or 4 of 4 entries are headings. This is invalid FAQ markup and a rich-result eligibility risk. | Rendered JSON-LD on `/weight-loss/best-weight-loss-injections` (4/4), `/weight-loss/semaglutide` (3/4), `/trt/best-at-home-trt` (1/6), etc. 432 pages have FAQ schema; 12 have at least one non-question. | Template: emit `FAQPage` only from the page's real Q&A list and skip any entry not ending in "?". Whether these LPs should get real FAQs instead is a content decision. | M+O |
| F12 | medium | `/weight-loss/reviews/altrx`, `/weight-loss/reviews/embody`, `/weight-loss/reviews/wellmedr` | The page URL is used as `@id` for two different node types: `MedicalWebPage` (`mainEntityOfPage`) and `WebPage` (`isPartOf` inside the `ItemList` items). Same `@id`, different `@type`, conflicting graph. | Deep audit `schema.id_conflict` 3; node paths `root.mainEntityOfPage` vs `root.itemListElement[n].item.isPartOf`. | Make the `isPartOf` reference `{ "@id": "<url>" }` only (no second `@type`), or type both as `MedicalWebPage`. | M |
| F13 | medium | live sitemaps: 57 URLs (56 weight-loss: 18 battles, 8 three-way comparisons, 7 review-analysis pages, 23 static pages; plus `/`) | `lastmod` is the shared constant `CONTENT_LAST_UPDATED = "2026-09-01"` because the record has no `updatedAt` (`latestUpdate()` falls back to it, `src/lib/config.ts:320`; `FALLBACK_DATE` in `sitemaps.ts`). House rule 5 says dates come from the record that changed, not a sitewide value. A wrong `lastmod` also makes Google trust the sitemap's dates less. | 57 `<lastmod>2026-09-01` entries; 23 of the static pages have no date source at all. | Omit `lastmod` when no record date exists (valid per sitemaps.org), and add real `updatedAt` values to the records that have one. | M+O |
| F14 | medium | heavy HTML on hub and comparison pages | HTML payload median 244 KB, p90 428 KB, max 794 KB (`/weight-loss/glp1-provider-comparison`), `/weight-loss` 721 KB, two HRT articles 715 KB (local; live `/weight-loss` 745 KB). Inline RSC payload, JSON-LD and data tables. Hurts FCP/LCP on phones together with F7. | `ls -l` of the 480 crawled pages; `html bytes` in the live sample. | Design/engineering decision: trim inline data (lazy-load carousels and review datasets, dedupe JSON-LD nested reviewer graphs), target under 300 KB on money pages. | O |
| F29 | medium | live: 41 pages carry 138 PNG `<img>`s; the Ro logo on `/`, `/weight-loss`, `/weight-loss/reviews`, `/weight-loss/articles`, `/medical-review-policy` and review/article pages that show Ro | Provider and article assets stored in the Blob CMS are PNG, and the **Ro logo is hotlinked from `https://miro.medium.com/1*4gA6EVXzmJcXUby3SBRlZg.png`** (a third-party CDN, no width/height, alt "ro logo"; 17 occurrences in the 14 live pages inspected). Medium can block or change hotlinked files at any time; the image also cannot be verified from this environment (the proxy refuses `miro.medium.com`). Other PNGs: Medvi logo (`.../uploads/medvi-logo-branded-*.png`, 20 occurrences), three article/hero uploads named "ChatGPT Image Jul 8, 2026 ..." and "Screenshot 2026-07-19 ..." (5 each on the articles index). Local build serves WebP/SVG for the same slots, so the local audit shows 3 pages. | Live deep audit `img.png` 41 / 138; homepage `<img src="https://miro.medium.com/...png" alt="ro logo">` with no dimensions. | Operator/asset task: upload the Ro logo (SVG or WebP) to `public/logos/` or Blob and point the provider record at it; re-upload the Medvi logo and the three article images as WebP next to the PNG (house rule 5); give them dimensions in `image-dims`. | O |
| F15 | medium | live: 13 titles over 60 chars (62 to 74) and 20 descriptions over 160 chars (161 to 205); local: 1 description 163 and 3 titles under 30 chars | Title/description lengths outside the SERP-safe range. The live overage comes from Blob-stored titles/descriptions (full lists in Appendix F); worst cases `/weight-loss/cheapest-weight-loss-medication` title 74, `/weight-loss/wegovy-providers` title 72, `/weight-loss/articles/zepbound-vs-wegovy-vs-ozempic` description 205, `/weight-loss/articles/emotional-eating-and-weight-loss` description 192. Short titles: `/trt/articles` (28), `/hrt/articles` (28), `/trt/articles/what-causes-low-testosterone` (29). | Live deep audit `title.long60` 13, `desc.long160` 20; live `seo-audit.mjs` WARN 3; local `desc.long160` 1, `title.short` 3. | Trim the 13 titles to 60 and the 20 descriptions to 160 in the CMS; lengthen the three short titles with the vertical/year. Length is a mechanical check but the wording is visible copy, so Sloane/operator approve the text. | M+O |
| F16 | medium | `scripts/deep-seo-audit.mjs` | Script defects that hide or invent findings: (a) crashes at line 263 when a sitemap URL is not 200, so it cannot audit live; (b) `future_date` compares against a hardcoded `"2026-11-13"` (2 false positives today); (c) `canonical.not_absolute` regex requires a trailing slash, flagging the homepage canonical `https://www.treatmentshub.com`; (d) the affiliate heuristic counts every external `target=_blank` + `nofollow` link, so the 63 `link.affiliate_no_sponsored` are Trustpilot and Reddit links (correctly `nofollow`), and 3 `eeat.affiliate_without_disclosure` hits are reviewer profiles with no affiliate links. | Crash trace in the live run; local JSON details; manual link listing on `/weight-loss/reviews/bmimd`, `/weight-loss/articles/is-embody-legit`. | Guard `pages[p]`, use today's date, accept the bare-origin canonical, and restrict the affiliate test to real tracking hosts (keep the UGC check separate). | M |
| F17 | low | root OG image route `src/app/(main)/opengraph-image.tsx` | The generated URL is hashed (`/opengraph-image-12jlf3?...`); the proxy exempts only the exact segment `opengraph-image` (`src/proxy.ts:243`), so it 301s to `/weight-loss/opengraph-image-12jlf3` which 404s. Currently referenced only by 404 pages and `/reviewers` (every 200 page uses `/og-default.png` or a per-page image), so the impact is small. | `curl -L .../opengraph-image-12jlf3?4d00104f3f12a17b` -> 1 hop -> 404 text/html. | Change the exemption to `/^(opengraph|twitter)-image(-\w+)?$/`, or delete the unused root route so Next falls back to `og-default.png` everywhere. | M |
| F18 | low | live `/weight-loss/Reviews` (any upper-case variant of a vertical sub-path) | Answers 200 with the lowercase canonical instead of redirecting. Canonical protects indexing, but it is still a crawlable duplicate. (`/Weight-Loss` and `/weight-loss/reviews/ALTRX` behave correctly: 301 / 404.) | `curl` -> 200, canonical `/weight-loss/reviews`. | In the proxy, 301 any path containing upper-case letters to its lowercase form. | M |
| F19 | low | `/weight-loss/glp1-provider-comparison` (2 links), `/trt/articles/online-trt-dea-deadline-2026` (1), `/trt/articles/online-trt-guide` (1) | External user-generated-content links (Reddit threads) with `rel="noopener"` only, no `nofollow`/`ugc`, while the same Reddit link elsewhere on the site carries `nofollow`. | Deep audit `link.affiliate_followed` 3 locally (11 on live: these 3 plus the 8 sidebar pages in F28); href listing shows `rel=[noopener]` on the two Reddit links. | Add `rel="nofollow ugc noopener"` in the component that renders Reddit/Trustpilot citations. | M |
| F20 | low | images: 157 pages (local) / 182 (live) without width/height on at least one `<img>`; 3 pages with PNG locally (live PNGs are F29) | 144 pages have exactly one such image: the next/image `fill` hero (`/_next/image?url=%2Fhero.webp`), whose box is CSS-sized (no CLS). Review pages: 4 `fill` gallery images each. Real cases: `/medical-review-policy` has 2 raw `<img>` Blob-hosted PNG logos (Medvi QUAD) with no dimensions; `/trt/reviews` and `/trt/reviews/medvi-quad` serve the same PNG logo. | Deep audit `img.no_dims` 157 (distribution 1:144, 2:9, 4:2, 8:1, 11:1), `img.png` 3; image listing per page. | Give the raw logo `<img>` explicit width/height and upload a WebP of the Medvi logo next to the PNG (house rule: add, do not delete). The `fill` cases need no change. | M |
| F21 | low | apex redirect and the gate script | `https://treatmentshub.com/*` -> **308** (Vercel domain redirect, before the proxy's 301 can run). Permanent and fine for search engines, but `seo-audit.mjs` demands 301 and FAILs on live. `http://` -> `https://` could not be tested from this environment (see section 4); HSTS with `preload` is set. | Live `curl`: 308; audit line `FAIL apex: 308`. | Accept 301 or 308 in the script (or set the Vercel domain redirect to 301 if the operator prefers one status everywhere). | M |
| F22 | low | unknown bare paths, e.g. live `/no-such-page-xyz` | Redirect-then-404: 301 -> `/weight-loss/no-such-page-xyz` -> 404. Intentional for legacy weight-loss URLs, but every typo URL costs a redirect hop before the 404, and Search Console shows them as redirects. | Deep audit `404 /no-such-page-xyz: 301 -> /weight-loss/no-such-page-xyz`. | Optional: only prefix bare paths that exist in the weight-loss config (or in the legacy sitemap); 404 the rest directly. | M |
| F23 | low | 38 live (35 local) sitemap URLs without `reviewedBy` | Index, legal, tool and reviewer pages with no medical review in schema. Not an error; listed so nobody "fixes" it by backfilling (house rule 3). | `seo-audit.mjs` WARN counts. | No action unless a real review happens; then log it in `src/data/reviewers.ts`. | O |
| F24 | low | `/weight-loss/go/top-5` (landing page, noindex) | `robots: noindex, nofollow, nocache` together with `canonical` -> homepage. A noindex page should not declare another URL canonical; the signals contradict. | `curl`: robots and canonical as stated. | Drop the canonical (or self-canonical) on `(lp)` routes. Also inherits the root-layout canonical; fixing F8 fixes this. | M |
| F25 | low | `/hrt/reviews` (440 words), `/online-therapy/reviews` (486 words) | Thin index pages, under 500 words of main text. | Deep audit page stats. | Content decision: add an intro/methodology block or accept as-is. | O |
| F26 | low | AEO/GEO coverage | 27 articles have no quick-answer block; 26 pages show no visible "Updated/Reviewed <year>" date (incl. `/`, `/weight-loss/reviews`, `/weight-loss/articles`, reviewer pages); 82 of 480 local (98 of 507 live) sitemap URLs are not listed in llms.txt; `/llms-full.txt` and `/.well-known/security.txt` 404. | Deep audit `aeo.no_answer_block` 27 local / 48 live, `aeo.no_visible_date` 26, `llmsCoverage` 398/480 local, 409/507 live; file probes. | Content: add answer blocks and visible dates where a real date exists. Mechanical: generate llms.txt from the full sitemap list; add `security.txt` if the operator wants one (not an SEO signal). | M+O |
| F27 | low | `public/` | Six PNGs of 0.87 to 1.9 MB are not referenced anywhere in `src/` (`embodypopupdesktop.png`, `hero-hair-loss-women.png`, `trimrxpopup.png`, `embodypopup.png`, `Glossy Blue TH Monogram App Icon.png`, `hero-hair-loss.png`); 16 of 43 PNGs have no WebP sibling (mostly logos/icons). Nothing is served to users, so no ranking impact; repo and deploy weight only. | `grep -rl` over `src/` returns nothing for the six; `find` counts. | House rule says add alongside, never delete: leave as-is, or the operator approves archiving them. | O |

Added after the fixes shipped (section 5):

| # | Sev | Where | What is wrong | Evidence | Proposed fix | Type |
|---|---|---|---|---|---|---|
| F30 | low | `/hair-loss/women` | The page carries an affiliate tracking link but no affiliate/commission disclosure line in its text. Surfaced once the deep audit's affiliate test was restricted to real tracking hosts (F16); the three earlier hits were false positives. | Deep audit `eeat.affiliate_without_disclosure` 1 (local and live) after PR #616. | Render the standard disclosure line on that page (the component exists on the other money pages). Visible copy, so operator/Sloane confirm the wording placement. | M+O |
| F31 | low | GitHub Actions, `IndexNow on production deploy` | Every `deployment_status` event for a **preview** deployment of the working branch produces a `startup_failure` run with an empty workflow name (seven today, 13:02 to 15:54 UTC, all before and during this work; the production runs for each merge succeeded at 14:54, 15:22, 15:48 and 15:54). Noise in the Actions log, no indexing impact. | `gh run list`: `startup_failure` rows on `claude/weight-loss-rifgr-0mgcit`, event `deployment_status`. | Operator/CI: restrict the workflow trigger to production deployments (an `if:` on `github.event.deployment.environment == 'Production'` at the workflow level, or the `environment` filter) so preview events never start a run. | M+O |

## 3. Recommended order of work

1. F28 and F1 first, same day: F28 is a one-line `rel` fix that closes a followed paid link on 8 money pages (house rule 4); F1 is a live redirect loop on two sitemap URLs, pick the canonical slug and ship the alias/config fix.
2. F2 + F3 + F5 together (one PR in `sitemaps.ts`, `llms.txt/route.ts`, `proxy.ts`): removes all 26 redirecting sitemap URLs and the 13 llms links, turns the live gate green except F4/F21.
3. F4: six links in three Blob articles plus the articles-index filter; needs Sloane/operator for the body text.
4. F6: wire the gate to production (forwarder or Blob token) so items 1 to 3 cannot recur unseen; fix the script defects in F16 and F21 in the same PR.
5. F8 + F9 + F17 + F18 + F24: one proxy/metadata PR (404 robots and canonical, `/hub`, hashed OG route, case redirect, LP canonical).
6. F7 then F14: the Core Web Vitals work (caching the CMS read, trimming HTML); operator sign-off on the architecture first, PageSpeed before/after.
7. Schema, sitemap and asset hygiene: F11, F12, F13, F29 (local Ro logo, WebP uploads), F10 (only if a real publish date exists).
8. Everything else (F15, F19, F20, F22, F25, F26, F27) as low-priority tidy-ups.

## 4. What I could not check and why

- `http://` -> `https://` redirect: this environment's egress proxy only tunnels HTTPS (`curl http://treatmentshub.com/` fails to resolve). HSTS with `preload` is present on live, so browsers upgrade; the first-hit 301 itself is unverified.
- Legacy host redirects (`topweightloss.io` -> hub): the proxy refuses connections to that host (`connect_rejected`), so the 5 legacy checks in `seo-audit.mjs` ran as errors against live; they PASS against the local build, which serves both hosts.
- Search Console coverage and enhancement reports (Datasets, FAQ, Article, breadcrumbs): not connected in this session.
- PageSpeed Insights / CrUX: not connected; the audit scripts do not measure Core Web Vitals. TTFB above was measured with `curl` through the environment proxy, so absolute values include proxy overhead; the all-MISS cache status is exact.
- `X-Robots-Tag: noindex` on `*.vercel.app` preview hosts: the deployment URL is unknown here and was not probed.
- The Blob-stored CMS config itself: no read token locally, so I could only infer its contents from the live sitemap and pages (that inference is F2/F4/F6).
- Rendering screenshots at 1440/390: not taken; this run changed nothing, so there was no render to compare. Screenshots will accompany each fix PR.

## Appendix A. Live sitemap URLs that redirect (26)

Requested URL -> status -> target.

```
/weight-loss/altrx-vs-noom                                  301  /weight-loss/best-online-weight-loss-programs
/weight-loss/articles/altrx-vs-ro                           301  /weight-loss/altrx-vs-ro
/weight-loss/articles/best-embody-alternatives              301  /weight-loss/articles/embody-alternatives
/weight-loss/articles/embody-weight-loss-review             301  /weight-loss/reviews/embody
/weight-loss/articles/glp1-benefits-beyond-weight-loss      301  /weight-loss/articles/how-glp1-medications-work
/weight-loss/articles/glp1-pills-vs-injections              301  /weight-loss/glp1-pills-vs-injections
/weight-loss/articles/glp1-weight-loss-pcos                 301  /weight-loss/articles/glp1-weight-loss-for-women
/weight-loss/articles/noom-vs-glp1-providers                301  /weight-loss/best-online-weight-loss-programs
/weight-loss/articles/online-vs-clinic-weight-loss          301  /weight-loss/articles/in-person-vs-online-weight-loss
/weight-loss/articles/ozempic-before-and-after-weight-loss  301  /weight-loss/articles/how-long-for-semaglutide-to-work
/weight-loss/articles/ozempic-face-what-it-is               301  /weight-loss/articles/how-glp1-medications-work
/weight-loss/articles/telemedicine-weight-loss-guide        301  /weight-loss/articles/choosing-telehealth-weight-loss-provider
/weight-loss/directmeds-vs-wellorithm                       301  /weight-loss/best-online-weight-loss-programs
/weight-loss/embody-vs-altrx                                301  /weight-loss/altrx-vs-embody
/weight-loss/embody-vs-found                                301  /weight-loss/reviews/embody
/weight-loss/embody-vs-noom                                 301  /weight-loss/reviews/embody
/weight-loss/found-vs-embody                                308  /weight-loss/embody-vs-found  (then 301 -> /weight-loss/reviews/embody)
/weight-loss/noom-vs-altrx                                  301  /weight-loss/best-online-weight-loss-programs
/weight-loss/noom-vs-ro                                     301  /weight-loss/best-online-weight-loss-programs
/weight-loss/ro-vs-found                                    301  /weight-loss/best-online-weight-loss-programs
/weight-loss/ro-vs-trimrx                                   301  /weight-loss/trimrx-vs-ro   (LOOP, see F1)
/weight-loss/shed-vs-embody                                 301  /weight-loss/best-online-weight-loss-programs
/weight-loss/shed-vs-found                                  301  /weight-loss/best-online-weight-loss-programs
/weight-loss/trimrx-vs-directmeds                           301  /weight-loss/articles/trimrx-alternatives
/weight-loss/trimrx-vs-ro                                   308  /weight-loss/ro-vs-trimrx   (LOOP, see F1)
/weight-loss/trimrx-vs-shed                                 301  /weight-loss/best-online-weight-loss-programs
```

The 27th live-only URL set (present on live, absent from the local build) also includes `noom-vs-found`, `noom-vs-shed`, `shed-vs-sprout`, which answer 200 and are fine.

## Appendix B. llms.txt links that redirect (13)

```
/weight-loss/articles/altrx-vs-ro
/weight-loss/articles/best-embody-alternatives
/weight-loss/articles/embody-weight-loss-review
/weight-loss/articles/glp1-benefits-beyond-weight-loss
/weight-loss/articles/glp1-pills-vs-injections
/weight-loss/articles/glp1-weight-loss-pcos
/weight-loss/articles/noom-vs-glp1-providers
/weight-loss/articles/online-vs-clinic-weight-loss
/weight-loss/articles/ozempic-before-and-after-weight-loss
/weight-loss/articles/ozempic-face-what-it-is
/weight-loss/articles/telemedicine-weight-loss-guide
/weight-loss/embody-vs-altrx
/weight-loss/shed-vs-embody
```

## Appendix C. Internal links to redirecting URLs on live (7)

```
/weight-loss/articles                        -> /weight-loss/articles/best-weight-loss-telehealth-providers  (301 -> /weight-loss)
/weight-loss/articles/best-ro-alternatives   -> /altrx-vs-ro        (301 -> /weight-loss/altrx-vs-ro)
/weight-loss/articles/best-noom-alternatives -> /altrx-vs-noom      (301 -> /weight-loss/best-online-weight-loss-programs)
/weight-loss/articles/best-noom-alternatives -> /noom-vs-ro         (301 -> /weight-loss/best-online-weight-loss-programs)
/weight-loss/articles/best-noom-alternatives -> /noom-vs-found      (301 -> /weight-loss/noom-vs-found)
/weight-loss/articles/best-noom-alternatives -> /noom-vs-shed       (301 -> /weight-loss/noom-vs-shed)
/weight-loss/articles/embody-alternatives    -> /altrx-vs-embody    (301 -> /weight-loss/altrx-vs-embody)
```

In addition, `/weight-loss/reviews` links to ten of the Appendix A battle URLs (`embody-vs-altrx`, `trimrx-vs-shed`, `trimrx-vs-ro`, `trimrx-vs-directmeds`, `shed-vs-found`, `shed-vs-embody`, `ro-vs-trimrx`, `ro-vs-found`, `noom-vs-ro`, `noom-vs-altrx`); the gate does not flag those because they are sitemap URLs, but they resolve with F2.

## Appendix D. Pages whose FAQPage schema contains non-questions (12)

```
/trt/best-at-home-trt                         1/6  "How we ranked the best at-home TRT clinics"
/trt/best-trt-for-beginners                   1/7  "How we chose the best TRT for beginners"
/trt/best-trt-for-fertility                   1/6  "How we chose the best TRT for fertility-conscious men"
/trt/cheapest-online-trt                      1/7  "How we ranked the cheapest TRT clinics"
/trt/hone-health-alternatives                 1/6  "How we chose the best Hone Health alternatives"
/weight-loss/best-online-weight-loss-programs 3/4  "How Online Weight Loss Programs Work", "What Sets the Best Programs Apart", "GLP-1 Medications Used in These Programs"
/weight-loss/best-weight-loss-injections      4/4  "How Weight Loss Injections Work", "Types of Weight Loss Injections Available", "What to Expect with Injectable Treatment", "Cost of Weight Loss Injections"
/weight-loss/cheapest-weight-loss-medication  4/4  "Why GLP-1 Medication Is Getting More Affordable", "What's Included in the Price", "Cheap vs. Good Value", "Find the Right Provider for Your Budget"
/weight-loss/ozempic-for-weight-loss          3/4  "Ozempic for Weight Loss: What You Need to Know", "Ozempic vs Compounded Semaglutide", "Side Effects and What to Expect"
/weight-loss/semaglutide                      3/4  "Semaglutide Weight Loss Results", "How to Choose a Semaglutide Provider", "Semaglutide vs Tirzepatide"
/weight-loss/tirzepatide                      2/4  "Tirzepatide Weight Loss Results", "Cost and Availability"
/weight-loss/wegovy-providers                 3/3  "Wegovy vs Compounded Semaglutide", "Wegovy Weight Loss Results", "How to Choose the Right Provider"
```

## Appendix F. Live titles over 60 and descriptions over 160 characters

Titles (chars):

```
/weight-loss/cheapest-weight-loss-medication              74
/weight-loss/wegovy-providers                             72
/weight-loss/best-weight-loss-injections                  69
/weight-loss/articles/weight-loss-medication-cost-guide   68
/weight-loss/articles/zepbound-vs-wegovy                  68
/weight-loss/semaglutide                                  68
/weight-loss/tirzepatide                                  68
/weight-loss/best-online-weight-loss-programs             65
/weight-loss/articles/ozempic-vs-wegovy-differences       64
/weight-loss/articles/testosterone-and-weight-loss        64
/weight-loss/articles/emotional-eating-and-weight-loss    64
/weight-loss/ozempic-for-weight-loss                      63
/weight-loss/articles/ozempic-hair-loss                   62
```

Descriptions (chars):

```
/weight-loss/articles/zepbound-vs-wegovy-vs-ozempic             205
/weight-loss/articles/emotional-eating-and-weight-loss          192
/weight-loss/reviews/noom                                       188
/weight-loss/articles/ozempic-hair-loss                         179
/weight-loss/articles/menopause-weight-gain                     176
/weight-loss/articles/glp1-with-insurance                       176
/weight-loss/articles/choosing-telehealth-weight-loss-provider  172
/weight-loss/articles/embody-cost                               172
/weight-loss/articles/testosterone-and-weight-loss              171
/weight-loss/articles/glp1-weight-loss-for-women                169
/weight-loss/articles/ozempic-face                              169
/weight-loss/reviews/wellorithm                                 168
/weight-loss/articles/mounjaro-vs-ozempic                       167
/weight-loss/articles/weight-loss-medication-cost-guide         165
/weight-loss/articles/glp1-weight-loss-over-40                  164
/weight-loss/articles/ozempic-vs-wegovy-differences             163
/weight-loss/articles/stopping-glp1-medication-what-happens     163
/weight-loss/articles/compounded-semaglutide-units-to-mg        163
/weight-loss/best-online-weight-loss-programs                   163
/weight-loss/articles/zepbound-vs-wegovy                        161
```

## Appendix E. How this was run

- `npx tsc --noEmit -p .` and `npm run build` on the branch; `PORT=4201 npm start`.
- `AUDIT_BASE=http://localhost:4201 node scripts/seo-audit.mjs` and `scripts/deep-seo-audit.mjs` (local).
- Live (morning baseline): a plain-HTTP forwarder in the session scratchpad mapped `Host` onto `https://<host>` so the same two scripts could audit production unchanged (`AUDIT_BASE=http://localhost:4310`); the deep script needed the one-line guard described in F16 to finish. Since PR #616 both scripts take `AUDIT_BASE=https://www.treatmentshub.com` directly (with `NODE_USE_ENV_PROXY=1` and `NODE_EXTRA_CA_CERTS` in a proxied environment); the afternoon re-runs in sections 1a and 5 used that.
- Live status crawl of all 507 sitemap URLs with `curl` (8 parallel), sitemap/feed validation with `xmllint`, per-template page analysis with `node-html-parser` on 12 live pages (hub, vertical index, article, review, battle, ED article, hair-loss review, reviews index, reviewer route, medical review policy, calculator, about), a full 480-page local crawl saved to disk for the mixed-content, reviewer-spelling, hreflang and FAQ-punctuation greps.
- GitHub: `gh run list` for both IndexNow workflows; `gh api .../deployments` for the production deploy.
- Deep-audit JSON reports (local and live) are in the session scratchpad; they are not committed.

## 5. Fix log (2026-11-15 afternoon)

Operator decisions: F1 canonical slug is `trimrx-vs-ro`; approved to ship as mechanical fixes F1, F2, F3, F5, F6 (code part only), F8, F9, F16, F17, F18, F21, F24. Not touched: F4, F7, F14, F10, F11, F13, F15, every O-type row, the retired CMS items (operator part of F2), credentials and CI (operator part of F6). Four PRs, each built, type-checked, gate-audited (PASS) and screenshotted at 1440/390 before a squash merge; each Vercel production deploy succeeded and `IndexNow on production deploy` ran with success after it (14:54:48, 15:22:27, 15:48:15, 15:54 UTC). Before/after is live `curl` from this environment.

| # | PR | Merged commit on main | Change | Live verification |
|---|---|---|---|---|
| F1 | #614 | `5a93b6e` | New `src/lib/battle-slugs.ts`: a stored battle's served slug is its slug mapped through `SLUG_ALIASES`; the canonical slug of a provider pair is the alphabetically-first *served* slug; a URL resolves to a direct match or to a battle whose stored slug is an alias of it. `battle-page.tsx` (metadata and page) and the battle OG image use it, so no redirect can target an alias key. The blob holds `ro-vs-trimrx` and the seed adds `trimrx-vs-ro`, which is why the old rule picked the aliased slug. | 14:55:05 UTC: `/weight-loss/trimrx-vs-ro` 200 (was 308 -> `ro-vs-trimrx`); `/weight-loss/ro-vs-trimrx` 301 -> `/weight-loss/trimrx-vs-ro`, one hop (was the other half of the loop). Rechecked 15:54 UTC, same. |
| F2 | #615 | `ff5d24d` | `PATH_REDIRECTS` / `VERTICAL_PATH_REDIRECTS` moved to `src/lib/path-redirects.ts`; `sitemaps.ts` drops reviews, articles, landing pages and battles whose URL the proxy redirects (`servesBattle()`), dedupes URLs. The same predicate now filters every list that links comparisons (reviews index, articles index comparisons, sibling links, three-way page, related battles on battle and review pages, 404 page); without it the gate flags those links the moment the URL leaves the sitemap. | 15:22:43 UTC: `sitemap-weight-loss.xml` 216 -> 191 URLs, all seven sitemaps 507 -> 482; none of the 26 Appendix A URLs listed; `/weight-loss/reviews` links 0 of the ten retired battles it linked before. |
| F3 | #615, #616 | `ff5d24d`, `44b9213` | `/llms.txt` keeps a page link only if the filtered sitemap lists it (`.xml`/`.csv` data links stay). #615 applied the filter to whole section strings and so only caught the per-line "Optional" section (11 article links); #616 filters per line and skips non-served battles before the head-to-head top-12 slice. | 15:22 UTC after #615: 11 of 13 redirecting links gone, `embody-vs-altrx` and `shed-vs-embody` still listed. 15:48:23 UTC after #616: 0 aliased links; all 398 page links in llms.txt answer 200. |
| F5 | #615 | `ff5d24d` | `"/found-vs-embody": "/reviews/embody"` added to `PATH_REDIRECTS`; the URL leaves the sitemap through F2. | 15:22:43 UTC: `/weight-loss/found-vs-embody` 301 -> `/weight-loss/reviews/embody` in one hop (was 308 -> `embody-vs-found` -> 301). |
| F6 (code) | #616, #618 | `44b9213`, `90f810e` | Both scripts accept `AUDIT_BASE=https://www.treatmentshub.com` and reach the real hostname of each check (hub, legacy host, bare apex); network errors are retried once and then reported as status 0 rather than crashing; concurrency 4 over https (`AUDIT_CONCURRENCY`); headers document local and live invocations. #618: the https path uses `fetch`, because Node's `node:https` under the experimental env proxy emitted an unhandled socket `ECONNRESET` outside any request and killed two live runs; `node:http` stays for the local build (Host override). No tokens, no CI change. | Live gate with the final script, 16:05 UTC, all of #614 to #617 deployed: 482 pages, **22 FAILs, 5 warns**: 11 links from `/weight-loss/articles` to retired article slugs and 6 un-prefixed battle links in three article bodies (all F4, held for Sloane), plus the 5 legacy-host checks this environment cannot reach; 0 sitemap, llms.txt, canonical, apex or shared-page failures (the morning run had 52). Live deep audit ran to completion natively (section 1a). Operator part still open: a read-only Blob token for the local gate and/or a CI job that runs the gate after each production deploy. |
| F8 | #617 | `2c05a84` | `not-found.tsx` exports `metadata` (title "Page not found", `robots: noindex, nofollow`); the root layout no longer sets `alternates` (canonical + hreflang), which the hub page already declares itself. | 15:54 UTC: `/weight-loss/articles/no-such-xyz` is 404 with `noindex` (Next) + `noindex, nofollow` (ours), no canonical, title "Page not found - Treatments Hub" (was `noindex` + `index, follow` + homepage canonical + homepage title). `/` keeps canonical, `en-US` + `x-default` hreflang and `og-default.png`. |
| F9 | #617 | `2c05a84` | Proxy: a direct request for `/hub` 301s to `/` (query kept); the internal rewrite from `/` and `/hub/opengraph-image-<hash>` are unchanged. | 15:54:21 UTC: `/hub` 301 -> `https://www.treatmentshub.com/` (was 200). |
| F16 | #616 | `44b9213` | Deep audit: skips non-200 sitemap URLs in the inbound loop (the live crash); `future_date` compares with today; the bare-origin homepage canonical passes; affiliate test limited to tracking hosts and tracking query parameters, UGC links (Reddit, Trustpilot, ...) lacking `nofollow`/`ugc` reported as `link.ugc_followed`; disclosure check only on pages with an affiliate link. | Live run over HTTPS completed 482 URLs with no crash (section 1a). Local before -> after: affiliate_no_sponsored 62 -> 0, affiliate_followed 3 -> 0 (ugc_followed 3), future_date 2 -> 0, canonical.not_absolute 1 -> 0, affiliate_without_disclosure 3 -> 1 (F30, a real one). |
| F17 | #617 | `2c05a84` | Proxy exemption for metadata images is `/^(opengraph|twitter)-image(-\w+)?$/`, matching Next's hashed production segment. | 15:54 UTC: `/opengraph-image-12jlf3?4d00104f3f12a17b` (the 404 page's og:image) 200 `image/png` (was 301 -> `/weight-loss/opengraph-image-12jlf3` -> 404). |
| F18 | #617 | `2c05a84` | Proxy: any path containing upper-case letters 301s to its lower-case form (dotted paths, `/_next`, `/api`, `/admin` never reach the proxy). | 15:54 UTC: `/weight-loss/Reviews` 301 -> `/weight-loss/reviews` (was 200 duplicate); `/weight-loss/reviews/ALTRX` 301 -> `/weight-loss/reviews/altrx` (was 404). |
| F21 | #616 | `44b9213` | Gate accepts 301 or 308 on the apex check. | The live gate no longer reports `FAIL apex: 308`. |
| F24 | #617 | `2c05a84` | Follows from F8: the `(lp)` routes inherit no canonical any more. | 15:54 UTC: `/weight-loss/go/top-5` carries `robots: noindex, nofollow, nocache` and no canonical (was canonical -> homepage). |
| F28 | #618 | `90f810e` | `src/components/sidebar.tsx`: the "Editor's Featured Provider" image link (the provider's affiliate URL) carries `rel="sponsored nofollow noopener"` when the href is external; an internal fallback link carries none. No `target` change. Approved by the operator in the afternoon. | 16:22:56 UTC: the featured anchor on all eight pages (`/weight-loss`, `/semaglutide`, `/tirzepatide`, `/best-online-weight-loss-programs`, `/best-weight-loss-injections`, `/ozempic-for-weight-loss`, `/wegovy-providers`, `/cheapest-weight-loss-medication`) carries the rel (was none); 0 `track.revoffers.com` anchors without `sponsored` across the eight. The deep audit's `link.affiliate_no_sponsored` / `link.affiliate_followed` (8 / 8 live) should read 0 on the next live run. |

Not shipped, and why:

- F4: the articles index on live links 11 retired article slugs that 301 (`best-weight-loss-telehealth-providers`, `telemedicine-weight-loss-guide`, `altrx-vs-ro`, `ozempic-before-and-after-weight-loss`, `ozempic-face-what-it-is`, `glp1-weight-loss-pcos`, `glp1-benefits-beyond-weight-loss`, `online-vs-clinic-weight-loss`, `glp1-pills-vs-injections`, `embody-weight-loss-review`, `best-embody-alternatives`; the morning gate saw only the first because the others were then sitemap URLs), and three article bodies link six un-prefixed battle paths. Held for Sloane per the operator; these 17 are the only remaining live gate FAILs the code could prevent (the index filter is a one-line sibling of the F2 filter, ready whenever F4 is scoped; the six body links are Blob content).
- F7, F14 (performance architecture), F10, F11, F13, F15 and all O-type rows: not approved, untouched.
- Operator parts: delete the retired CMS items (they are now invisible to the sitemap, llms.txt and the comparison lists, but still in the blob); decide on a read-only Blob token or a CI job for the gate (F6); F30 and F31 above are new.
