# Technical SEO audit: treatmentshub.com

- Date: 2026-11-15
- Author: Felix (QA and technical SEO)
- Status: ready
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
| `scripts/deep-seo-audit.mjs` on the **live** deployment | Crashed at `scripts/deep-seo-audit.mjs:263` (`pages[p].inbound` on a redirecting sitemap URL). Re-run with a patched copy: see section 1a. |
| Live status crawl of all 507 sitemap URLs | 481 x 200, 24 x 301, 2 x 308. TTFB on the 200s: p50 1.77 s, p90 1.91 s, max 2.86 s, measured from this environment through its egress proxy (direct single samples: 0.90 to 1.29 s). Every HTML response was `x-vercel-cache: MISS`. |
| Sitemaps (live) | Index plus 7 sub-sitemaps, all 200, all well-formed XML (`xmllint`), 507 URLs, 0 duplicates, 0 trailing slashes, 0 non-www, every URL has `lastmod`, 0 future dates. |
| robots.txt (live) | 200; `Allow: /`, `Disallow: /admin`, `Disallow: /api/`, `Sitemap:` line present, Content-Signal line present. |
| feed.xml (live) | 200, `application/rss+xml`, well-formed, 100 items, all 100 links are sitemap URLs, 0 redirecting. |
| llms.txt (live) | 200, `text/plain`, 458 links, 13 of them redirect (section 2, F3). `/llms-full.txt` 404. |
| Redirects | `https://treatmentshub.com/*` -> 308 -> `https://www.treatmentshub.com/*`; `/weight-loss/` -> 308 -> `/weight-loss`; `/about`, `/reviews`, `/articles` -> 301 -> `/weight-loss/...`; `/uk/*` -> 301 -> `/weight-loss`; `/weight-loss/reviewers/<slug>` -> 301 -> `/reviewers/<slug>`; `/hair-loss/about` -> 301 -> `/weight-loss/about`. All single hop except the two in F1 and F5. |
| Headers (live HTML) | CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy, HSTS `max-age=63072000; includeSubDomains; preload` all present. `cache-control: private, no-cache, no-store`. `/_next/static/*` is `public,max-age=31536000,immutable`, gzip. |
| Deploy and IndexNow | Vercel Production deployment of 47f2490 at 13:43:00Z (matches `main`). `IndexNow on production deploy` run succeeded at 13:43:02Z; `IndexNow daily push` succeeded daily, last 13:57:44Z today. |

Checks that came back clean on every page (local 480 and, where the script covers it, live 507): exactly one `<h1>`; no heading-level skips; no duplicate `<title>`; no duplicate meta description or H1 (local); 100 % image alt coverage; no mixed content (`http://` in `src`/`href`: 0 of 480); no `noindex` on a sitemap URL; every canonical absolute and equal to the sitemap URL; `og:title`, `og:description`, `og:image` (absolute, resolves 200), `og:url` (= canonical), `og:type`, `og:site_name` and `twitter:card` on every page; `<html lang="en-US">` and viewport on every page; every JSON-LD block parses; author is always `Organization` "Treatments Hub Research Team" (0 Person-typed team authors); reviewers render as "Francheska Capistrano, RMT, MPH" and "Dr. B. Dolapihilla, MBBS" (0 occurrences of "MD" after Dolapihilla, 0 psychology mentions within 300 characters of her name); no legacy-brand text; no `>undefined<` / `>NaN<` leaks; 15 AI crawler user agents and bingbot receive the full page; Google and Bing verification files and the IndexNow key file answer 200; unknown deep paths answer a true 404; hreflang exists only on the homepage (`en-US` + `x-default`, both self-referencing), none on inner pages, which is consistent for a single-locale site.

### 1a. Live deep audit (patched copy)

_Pending at the time of writing; filled in below once the re-run finished._

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
| F8 | medium | every 404 response (e.g. live `/weight-loss/articles/no-such-xyz`, `/weight-loss/reviews/ALTRX`, `/weight-loss/go/wellmedr`, `/reviewers`) | 404 pages carry two conflicting robots tags, `<meta name="robots" content="noindex"/>` and `<meta name="robots" content="index, follow"/>`, plus `<link rel="canonical" href="https://www.treatmentshub.com"/>`, the homepage title and the root OG tags. Cause: `src/app/layout.tsx:70-87` sets `alternates.canonical` and `robots` on the root layout; `src/app/not-found.tsx` exports no metadata so it inherits them, and Next adds its own `noindex`. | `curl` of the 404 pages above; both tags and the canonical present. | Export `metadata` from `not-found.tsx` with `robots: { index: false, follow: false }` and no canonical; move the homepage canonical/hreflang from the root layout to the hub page (`(main)/hub/page.tsx`) so nothing inherits it. | M |
| F9 | medium | live `/hub` | `/hub` answers 200 with the full homepage (canonical -> `/`). The proxy rewrites `/` to `/hub` but also serves `/hub` directly (`src/proxy.ts:224-226`), so a duplicate URL is crawlable. | `curl -I https://www.treatmentshub.com/hub` -> 200, canonical `https://www.treatmentshub.com`. | In the proxy, 301 a direct request for `/hub` (not the internal rewrite) to `/`. | M |
| F10 | medium | 60 review pages (all `/<vertical>/reviews/<slug>` in the sitemap), local and live | `Article` schema has no `datePublished`. `ReviewData` (`src/lib/config.ts:99`) only stores `updatedAt`; there is no publish date on record. | `seo-audit.mjs` WARN "60 Article schemas have no datePublished"; deep audit `schema.article.no_datePublished` 60, all reviews. | Operator: decide whether a publish date exists in any record (CMS history, git log of the first import). If yes, add a `publishedAt` field and emit it. If not, leave it out; do not backfill (house rules 3 and 5). | O |
| F11 | medium | 12 landing pages (list in Appendix D), local and live | `FAQPage` schema contains entries that are not questions: section headings such as "How Online Weight Loss Programs Work" or "How we ranked the cheapest TRT clinics" are emitted as `Question.name`. On the weight-loss LPs 3 or 4 of 4 entries are headings. This is invalid FAQ markup and a rich-result eligibility risk. | Rendered JSON-LD on `/weight-loss/best-weight-loss-injections` (4/4), `/weight-loss/semaglutide` (3/4), `/trt/best-at-home-trt` (1/6), etc. 432 pages have FAQ schema; 12 have at least one non-question. | Template: emit `FAQPage` only from the page's real Q&A list and skip any entry not ending in "?". Whether these LPs should get real FAQs instead is a content decision. | M+O |
| F12 | medium | `/weight-loss/reviews/altrx`, `/weight-loss/reviews/embody`, `/weight-loss/reviews/wellmedr` | The page URL is used as `@id` for two different node types: `MedicalWebPage` (`mainEntityOfPage`) and `WebPage` (`isPartOf` inside the `ItemList` items). Same `@id`, different `@type`, conflicting graph. | Deep audit `schema.id_conflict` 3; node paths `root.mainEntityOfPage` vs `root.itemListElement[n].item.isPartOf`. | Make the `isPartOf` reference `{ "@id": "<url>" }` only (no second `@type`), or type both as `MedicalWebPage`. | M |
| F13 | medium | live sitemaps: 57 URLs (56 weight-loss: 18 battles, 8 three-way comparisons, 7 review-analysis pages, 23 static pages; plus `/`) | `lastmod` is the shared constant `CONTENT_LAST_UPDATED = "2026-09-01"` because the record has no `updatedAt` (`latestUpdate()` falls back to it, `src/lib/config.ts:320`; `FALLBACK_DATE` in `sitemaps.ts`). House rule 5 says dates come from the record that changed, not a sitewide value. A wrong `lastmod` also makes Google trust the sitemap's dates less. | 57 `<lastmod>2026-09-01` entries; 23 of the static pages have no date source at all. | Omit `lastmod` when no record date exists (valid per sitemaps.org), and add real `updatedAt` values to the records that have one. | M+O |
| F14 | medium | heavy HTML on hub and comparison pages | HTML payload median 244 KB, p90 428 KB, max 794 KB (`/weight-loss/glp1-provider-comparison`), `/weight-loss` 721 KB, two HRT articles 715 KB (local; live `/weight-loss` 745 KB). Inline RSC payload, JSON-LD and data tables. Hurts FCP/LCP on phones together with F7. | `ls -l` of the 480 crawled pages; `html bytes` in the live sample. | Design/engineering decision: trim inline data (lazy-load carousels and review datasets, dedupe JSON-LD nested reviewer graphs), target under 300 KB on money pages. | O |
| F15 | medium | 7 pages | Title/description lengths. Live: `/weight-loss/articles/zepbound-vs-wegovy-vs-ozempic` description 205 chars; `/weight-loss/cheapest-weight-loss-medication` title 74; `/weight-loss/wegovy-providers` title 72. Local: `/weight-loss/articles/compounded-semaglutide-units-to-mg` description 163; titles under 30 chars on `/trt/articles` (28), `/hrt/articles` (28), `/trt/articles/what-causes-low-testosterone` (29). | Live `seo-audit.mjs` WARN lines; local deep audit `desc.long160` 1, `title.short` 3. | Shorten the two titles to 60 and the two descriptions to 160; lengthen the three short titles with the vertical/year. Wording to be approved by Sloane/operator since it is visible copy. | M+O |
| F16 | medium | `scripts/deep-seo-audit.mjs` | Script defects that hide or invent findings: (a) crashes at line 263 when a sitemap URL is not 200, so it cannot audit live; (b) `future_date` compares against a hardcoded `"2026-11-13"` (2 false positives today); (c) `canonical.not_absolute` regex requires a trailing slash, flagging the homepage canonical `https://www.treatmentshub.com`; (d) the affiliate heuristic counts every external `target=_blank` + `nofollow` link, so the 63 `link.affiliate_no_sponsored` are Trustpilot and Reddit links (correctly `nofollow`), and 3 `eeat.affiliate_without_disclosure` hits are reviewer profiles with no affiliate links. | Crash trace in the live run; local JSON details; manual link listing on `/weight-loss/reviews/bmimd`, `/weight-loss/articles/is-embody-legit`. | Guard `pages[p]`, use today's date, accept the bare-origin canonical, and restrict the affiliate test to real tracking hosts (keep the UGC check separate). | M |
| F17 | low | root OG image route `src/app/(main)/opengraph-image.tsx` | The generated URL is hashed (`/opengraph-image-12jlf3?...`); the proxy exempts only the exact segment `opengraph-image` (`src/proxy.ts:243`), so it 301s to `/weight-loss/opengraph-image-12jlf3` which 404s. Currently referenced only by 404 pages and `/reviewers` (every 200 page uses `/og-default.png` or a per-page image), so the impact is small. | `curl -L .../opengraph-image-12jlf3?4d00104f3f12a17b` -> 1 hop -> 404 text/html. | Change the exemption to `/^(opengraph|twitter)-image(-\w+)?$/`, or delete the unused root route so Next falls back to `og-default.png` everywhere. | M |
| F18 | low | live `/weight-loss/Reviews` (any upper-case variant of a vertical sub-path) | Answers 200 with the lowercase canonical instead of redirecting. Canonical protects indexing, but it is still a crawlable duplicate. (`/Weight-Loss` and `/weight-loss/reviews/ALTRX` behave correctly: 301 / 404.) | `curl` -> 200, canonical `/weight-loss/reviews`. | In the proxy, 301 any path containing upper-case letters to its lowercase form. | M |
| F19 | low | `/weight-loss/glp1-provider-comparison` (2 links), `/trt/articles/online-trt-dea-deadline-2026` (1), `/trt/articles/online-trt-guide` (1) | External user-generated-content links (Reddit threads) with `rel="noopener"` only, no `nofollow`/`ugc`, while the same Reddit link elsewhere on the site carries `nofollow`. | Deep audit `link.affiliate_followed` 3; href listing shows `rel=[noopener]` on the two Reddit links. | Add `rel="nofollow ugc noopener"` in the component that renders Reddit/Trustpilot citations. | M |
| F20 | low | images: 157 pages without width/height on at least one `<img>`; 3 pages with PNG | 144 pages have exactly one such image: the next/image `fill` hero (`/_next/image?url=%2Fhero.webp`), whose box is CSS-sized (no CLS). Review pages: 4 `fill` gallery images each. Real cases: `/medical-review-policy` has 2 raw `<img>` Blob-hosted PNG logos (Medvi QUAD) with no dimensions; `/trt/reviews` and `/trt/reviews/medvi-quad` serve the same PNG logo. | Deep audit `img.no_dims` 157 (distribution 1:144, 2:9, 4:2, 8:1, 11:1), `img.png` 3; image listing per page. | Give the raw logo `<img>` explicit width/height and upload a WebP of the Medvi logo next to the PNG (house rule: add, do not delete). The `fill` cases need no change. | M |
| F21 | low | apex redirect and the gate script | `https://treatmentshub.com/*` -> **308** (Vercel domain redirect, before the proxy's 301 can run). Permanent and fine for search engines, but `seo-audit.mjs` demands 301 and FAILs on live. `http://` -> `https://` could not be tested from this environment (see section 4); HSTS with `preload` is set. | Live `curl`: 308; audit line `FAIL apex: 308`. | Accept 301 or 308 in the script (or set the Vercel domain redirect to 301 if the operator prefers one status everywhere). | M |
| F22 | low | unknown bare paths, e.g. live `/no-such-page-xyz` | Redirect-then-404: 301 -> `/weight-loss/no-such-page-xyz` -> 404. Intentional for legacy weight-loss URLs, but every typo URL costs a redirect hop before the 404, and Search Console shows them as redirects. | Deep audit `404 /no-such-page-xyz: 301 -> /weight-loss/no-such-page-xyz`. | Optional: only prefix bare paths that exist in the weight-loss config (or in the legacy sitemap); 404 the rest directly. | M |
| F23 | low | 38 live (35 local) sitemap URLs without `reviewedBy` | Index, legal, tool and reviewer pages with no medical review in schema. Not an error; listed so nobody "fixes" it by backfilling (house rule 3). | `seo-audit.mjs` WARN counts. | No action unless a real review happens; then log it in `src/data/reviewers.ts`. | O |
| F24 | low | `/weight-loss/go/top-5` (landing page, noindex) | `robots: noindex, nofollow, nocache` together with `canonical` -> homepage. A noindex page should not declare another URL canonical; the signals contradict. | `curl`: robots and canonical as stated. | Drop the canonical (or self-canonical) on `(lp)` routes. Also inherits the root-layout canonical; fixing F8 fixes this. | M |
| F25 | low | `/hrt/reviews` (440 words), `/online-therapy/reviews` (486 words) | Thin index pages, under 500 words of main text. | Deep audit page stats. | Content decision: add an intro/methodology block or accept as-is. | O |
| F26 | low | AEO/GEO coverage | 27 articles have no quick-answer block; 26 pages show no visible "Updated/Reviewed <year>" date (incl. `/`, `/weight-loss/reviews`, `/weight-loss/articles`, reviewer pages); 82 of 480 sitemap URLs are not listed in llms.txt; `/llms-full.txt` and `/.well-known/security.txt` 404. | Deep audit `aeo.no_answer_block` 27, `aeo.no_visible_date` 26, `llmsCoverage` 398/480; file probes. | Content: add answer blocks and visible dates where a real date exists. Mechanical: generate llms.txt from the full sitemap list; add `security.txt` if the operator wants one (not an SEO signal). | M+O |
| F27 | low | `public/` | Six PNGs of 0.87 to 1.9 MB are not referenced anywhere in `src/` (`embodypopupdesktop.png`, `hero-hair-loss-women.png`, `trimrxpopup.png`, `embodypopup.png`, `Glossy Blue TH Monogram App Icon.png`, `hero-hair-loss.png`); 16 of 43 PNGs have no WebP sibling (mostly logos/icons). Nothing is served to users, so no ranking impact; repo and deploy weight only. | `grep -rl` over `src/` returns nothing for the six; `find` counts. | House rule says add alongside, never delete: leave as-is, or the operator approves archiving them. | O |

## 3. Recommended order of work

1. F1 first: two sitemap URLs loop forever today; pick the canonical slug and ship the one-line alias/config fix the same day.
2. F2 + F3 + F5 together (one PR in `sitemaps.ts`, `llms.txt/route.ts`, `proxy.ts`): removes all 26 redirecting sitemap URLs and the 13 llms links, turns the live gate green except F4/F21.
3. F4: six links in three Blob articles plus the articles-index filter; needs Sloane/operator for the body text.
4. F6: wire the gate to production (forwarder or Blob token) so items 1 to 3 cannot recur unseen; fix the script defects in F16 and F21 in the same PR.
5. F8 + F9 + F17 + F18 + F24: one proxy/metadata PR (404 robots and canonical, `/hub`, hashed OG route, case redirect, LP canonical).
6. F7 then F14: the Core Web Vitals work (caching the CMS read, trimming HTML); operator sign-off on the architecture first, PageSpeed before/after.
7. Schema and sitemap hygiene: F11, F12, F13, F10 (F10 only if a real publish date exists).
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

## Appendix E. How this was run

- `npx tsc --noEmit -p .` and `npm run build` on the branch; `PORT=4201 npm start`.
- `AUDIT_BASE=http://localhost:4201 node scripts/seo-audit.mjs` and `scripts/deep-seo-audit.mjs` (local).
- Live: a plain-HTTP forwarder in the session scratchpad mapped `Host` onto `https://<host>` so the same two scripts could audit production unchanged (`AUDIT_BASE=http://localhost:4310`); the deep script needed the one-line guard described in F16 to finish.
- Live status crawl of all 507 sitemap URLs with `curl` (8 parallel), sitemap/feed validation with `xmllint`, per-template page analysis with `node-html-parser` on 12 live pages (hub, vertical index, article, review, battle, ED article, hair-loss review, reviews index, reviewer route, medical review policy, calculator, about), a full 480-page local crawl saved to disk for the mixed-content, reviewer-spelling, hreflang and FAQ-punctuation greps.
- GitHub: `gh run list` for both IndexNow workflows; `gh api .../deployments` for the production deploy.
- Deep-audit JSON reports (local and live) are in the session scratchpad; they are not committed.
