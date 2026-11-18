# Indexation read: Search Console Page indexing, www.treatmentshub.com

- Date: 2026-11-18 · Author: Felix · Status: ready
- Answers: operator request to read the Page indexing export (summary level, 2026-08-20 to 2026-11-13, no per-URL list) against the repo and the Nov 15/16 audits. Aggregates only; the CSVs stay out of the repo. Read-only run: nothing built, edited or merged.
- Caveat first: without the per-URL export, every cause below is inference from the sitemap composition, the deep-audit JSON of Nov 15 and live curls today. The ranking changes the moment we see real URLs.

## 1. What the numbers say

| Date | Indexed | Not indexed | What matches it |
|---|---|---|---|
| Aug 21 | 116 | 122 | First day of data. Aug 2026 "index everything" policy on reviews (config.ts comment). |
| Aug 29 | 148 | 198 | +44 not indexed in one day: batch of new URLs discovered. |
| Sep 5 to Oct 13 | 149 to 160 | 214 to 229 | Flat. Sep 2026 crawl-budget pruning (WL reviews/battles and three-ways noindex). |
| Oct 20, Oct 24 | 162, 174 | **313, 361** | +132 not indexed in five days, +14 indexed. Matches Oct 12 decisions (index everything, one sitemap per vertical) and the Oct 21 ED port (52 ED URLs). |
| Nov 7, Nov 10 | 176, 180 | 363, 366 | Small steps. Nov 9 is the first commit on main (#563) and already carries `WEIGHT_LOSS_MIGRATED = true` and the quiz/legal sitemap trim. |

Git history on main starts 2026-11-09, so pre-Nov-9 steps are matched to dated code comments, not commits. Everything shipped Nov 15 to 17 (#614 to #618 redirects and sitemap trim 507 -> 482, #626, #637 Trustpilot removal, #642 ISR caching) lands after this export ends (Nov 13); the next export is the first that can show their effect. Impressions stayed under 20 a day the whole period (one day at 31): this is a young, low-authority property.

Expected buckets (69 of 366):
- **Excluded by noindex, 25.** Noindex routes in the code: hearing-aids vertical, hidden (seed: index, /reviews, /articles, 2 reviews, 1 battle = 6; Blob may hold more); the two Noom articles in `NOINDEX_ARTICLE_SLUGS` (2); `/weight-loss/find-your-match-weight-loss` and the legacy `/find-your-match` (2); `/weight-loss/go/top-5`, `/go/embody`, `/go/eden` (3); `/admin` (1). That is 14, not 25. The gap of about 11 is most likely stale verdicts on weight-loss reviews/battles noindexed in Sep and re-opened Oct 12 (`NOINDEX_WL_*` are empty sets) that Google has not recrawled; validation is already "Started". Count does **not** match the code; the per-URL list settles it.
- **Page with redirect, 40.** The 26 retired sitemap URLs removed in #615 (Appendix A of the Nov 15 audit), the trimrx/ro loop pair (#614), `found-vs-embody`, `/hub` (#617), the two welludr URLs (#626), plus bare legacy paths that 301 into `/weight-loss/...`. None is in the sitemap, llms.txt or the comparison lists any more; expected to clear on recrawl. Not yet in this export: the 7 `/weight-loss/review-analysis/*` pages 301 to their review page since #637 (verified live today), so this bucket will tick up by 7 before it falls.
- Redirect error 1, Not found 1, Alternate canonical 1: noise; identify with the per-URL list.

The real problem (298 of 366): **Discovered - currently not indexed 287** (Google knows the URL, has not fetched it) and **Crawled - currently not indexed 11** (fetched, judged not worth indexing). With 180 indexed against 482 sitemap URLs, roughly 300 sitemap pages have never been indexed; 287 of them were never even crawled.

## 2. Likely causes, ranked (evidence from the repo and the Nov 15 audit)

Sitemap composition, live Nov 15 after #615 (482; 475 now that review-analysis is out): articles 266 (WL 92, hair-loss 46, TRT 39, HRT 34, ED 31, online-therapy 24), battles 87 (WL 32, TRT 27, hair-loss 14, ED 8, HRT 3, OT 3), reviews 60, WL static/landing 24 + 8 other-vertical static, index pages 18, three-way 8, review-analysis 7, hub and site 4.

1. **Slow, uncached TTFB until Nov 17.** Every HTML response was `x-vercel-cache: MISS`, `private, no-store`, TTFB p50 1.77 s (F7). Google's own definition of "Discovered" names host load as the reason it defers the fetch; on a 500-URL site with no authority, a 1 to 2 s render per URL caps the daily crawl. #642 is live: today `/weight-loss`, a hair-loss article, a TRT article and a three-way page answer HIT/PRERENDER at 0.18 to 0.44 s (first uncached hit about 1 s). Strongest mechanical cause, now fixed; effect not yet measurable.
2. **New host, batch submission, low authority.** Per-vertical sitemaps on Oct 12 plus the Oct 21 ED port pushed about 130 URLs at once into a property with under 20 impressions a day; Google indexed 14 of them. The migration from topweightloss.io (legacy sitemap still lists 183 old URLs, all 301) was only completed in GSC around Nov 9. Predicted-low-value deferral is the other half of "Discovered".
3. **Template-only internal linking on the non-weight-loss content.** Deep audit Nov 15 (live, 482 URLs): `lowInbound` 0, min 5, median 18.5, but the counts are dominated by nav/footer/index modules (index pages score 481). Non-WL articles median 15 to 16 inbound, battles 11 to 20, three-ways 5 to 8, review-analysis 9 to 13, against WL landing pages 286 and WL reviews 63. Few contextual in-body links point at the 174 non-WL articles or the 87 battles.
4. **Near-duplicate programmatic pages.** 87 two-provider battles rendered from the same template, 8 three-way pages (code comment says "near-zero demand, noindex", but `NOINDEX_WL_BATTLE_SLUGS` is empty so all 8 are indexable and in the sitemap). Best candidates for the 11 crawled-not-indexed.
5. **Crawl budget on redirects before #615.** 26 sitemap URLs, 13 llms.txt links and 10 links from `/weight-loss/reviews` sent Googlebot to 301s; the 40-URL redirect bucket shows it did spend fetches there. Fixed Nov 15; modest effect on a budget this small.
6. **`lastmod` = 2026-09-01 on 57 URLs (F13).** A constant date is a weak, probably ignored signal; it only removes a recrawl cue. Low.

Most likely in the 287 given the composition: the 174 non-WL articles (hair-loss, TRT, HRT, ED, online-therapy: newest, lowest linked, no authority yet), then the 87 battles, then the 8 three-ways. The 180 indexed are most likely WL landing pages, reviews, index pages and the older WL articles. Inference, not observation.

## 3. Plan, ranked (owner, size)

| # | Action | Owner | Size |
|---|---|---|---|
| 1 | Export the per-URL lists for "Discovered" (287) and "Crawled" (11) from GSC and drop them in the scratchpad; the report gets rewritten against real URLs. | Operator | 10 min |
| 2 | URL Inspection on 5 samples: `/hair-loss/articles/veradermics-vdphl01`, `/ed/hims-vs-braverx`, `/weight-loss/medvi-vs-trimrx-vs-shed`, `/weight-loss/articles/weight-loss-medication-that-works-fast`, `/weight-loss/review-analysis/found` (now a 301). Note last crawl date and Google-selected canonical. | Operator | 15 min |
| 3 | GSC: "Validate fix" on Page with redirect (40) and Excluded by noindex (already started); resubmit `/sitemap.xml` in Sitemaps. IndexNow already runs daily and on deploy (verified Nov 15). | Operator | 5 min |
| 4 | Confirm #642 holds: live deep audit with cache header and TTFB per URL after one week of Googlebot traffic; report HIT ratio. | Felix | small, read-only |
| 5 | `lastmod`: omit when no record date exists, real `updatedAt` elsewhere (F13, mechanical). | Felix | small PR |
| 6 | Contextual link modules: 3 to 5 in-body "related" links on each vertical hub and review page to that vertical's articles and battles (not nav, not footer). Design and anchor copy are the operator's and Sloane's. | Sloane + Felix | medium |
| 7 | Three-ways (8): decide noindex,follow (add slugs to `NOINDEX_WL_BATTLE_SLUGS`, one-line mechanical) or merge into the two-provider battles. Decide after item 1 shows whether they are in the 287 or the 11. | Operator decides, Felix ships | small |
| 8 | Battles (87): after item 1, merge or noindex the pairs that were crawled and rejected; keep the pairs with impressions. Content/ranking decision. | Operator + Sloane | medium |

## 4. Metric

Weekly, from the Page indexing summary: **indexed URLs, baseline 180 on 2026-11-13**; secondary, Discovered-not-indexed, baseline 287. Next read 2026-11-25.
