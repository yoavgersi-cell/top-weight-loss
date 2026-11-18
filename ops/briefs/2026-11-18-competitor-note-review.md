# Competitor SEO note: claim check and actions

- Date: 2026-11-18 · Author: Cleo · Status: ready · Next: Felix (price-table component, llms-full), Sloane (titles), Atlas (monthly post research), operator (3 questions, 1 design decision)
- Answers: operator request to check a friend's competitor SEO note (treated as third-party claims) against our data and turn the valid parts into actions.
- Our data: GSC/Bing aggregates from `ops/briefs/2026-11-16-weekly-review.md` (GSC Nov 2 to 13 vs Oct 19 to Nov 1; Bing Oct 19 to Nov 15); Felix's audit and fix log `ops/qa/2026-11-15-technical-audit.md`; live site read by curl today; repo inventory by grep. GSC, Bing, GA4 not connected this session; no figure below is estimated.
- Ahrefs: Free plan (0 workspace units, API key 0/200,000, reset Dec 18). Only `public-domain-rating-free` answers; DR values below are from it, read 2026-11-18. No keyword, SERP or backlink data.
- The study URL (glp-1seo.com) returned 403 at the proxy tunnel; its figures are snippet-only. glp-1seo.com itself is DR 4.

## 1. Claim by claim

| Claim | Our evidence | Verdict |
|---|---|---|
| Big media (Forbes, Fortune, US News, Innerbody, NY Post) hold "best X" positions | Ahrefs DR: forbes.com 94, goodrx.com 85, innerbody.com 75 vs treatmentshub.com 8. No SERP data on our plan | Confirmed in direction, not measured |
| Head terms walled by goodrx/walgreens/forbes/reddit/ro; median page-one authority 408/1000; 8/120 positions under 150; AI Overviews 8/12; Reddit 17/120 | Source blocked from here; "authority /1000" is not a scale we hold. Direction matches our own choice to avoid head terms | Unverifiable (snippet-only) |
| Open field = comparison, cost, eligibility, state and brand queries | Our only Google positions 3 to 9 are x-vs-y and brand pages (weekly review s.5); Bing demand is brand + reviews/complaints/scam (s.2) | Confirmed by our data |
| "Winners" (GLP1 Clinics, VerifiedDose, TRTPicks, GLPcompare) all run dated price tables | Their DR: glp1clinics.org 17, verifieddose.com 0, trtpicks.com 2.6, glpcompare.com 0; exploretreatments.com 29, prescribedrx.com 24. Pages not read this session. DR 0 to 17 sites are not "winners" by any measure we hold | Unverifiable |
| 158 URLs discovered-not-indexed (29 weight-loss) | GSC coverage report; only the operator can see it. Plausible for a hub whose redirect went live Nov 9, but we hold no number | Unverifiable (operator export needed) |
| 12 of 55 sitemap URLs redirect | Felix found 26 of 507 redirecting (all weight-loss) on Nov 15 morning; PRs #614 to #618 trimmed the sitemaps to 482 with 0 redirecting, verified live. Today: 473 URLs across 7 sitemaps (my count). No sub-sitemap has 55 URLs | Contradicted / already done (figure predates the fix or comes from a sample crawl) |
| Bing 273 clicks vs Google 27 | Bing hub Oct 19 to Nov 15: ~44 clicks on ~4,700 impressions (queries with 5+ impressions). Google hub: 0 clicks in window A, 1 in B; legacy topweightloss.io 7 + 16 = 23 across both windows. 27 Google clicks fits the legacy property over about four weeks; 273 Bing clicks would need a longer window (Bing's 3-month default) or all queries unfiltered. Direction (Bing is the only engine sending clicks) is ours too | Direction confirmed; figures unverified |
| Embody vs Wellmedr = 24 of 27 Google clicks | Hub `/weight-loss/embody-vs-wellmedr`: pos ~4, single-digit impressions, 0 clicks in our windows. Legacy clicks came from `embody-vs-ro-weight-loss`, the GLP-1 guide, `eden`, `trimrx-vs-directmeds`. No property or window we hold produces 24 | Contradicted for our windows; unverifiable otherwise |
| Low CTR on embody/altRx/wellmedr titles is a quick win | Weekly review s.2: altrx ~1,300 impressions 0 clicks, embody cluster ~1,030 and 2, wellmedr ~450 and 2; "reviews and complaints" queries exist for embody, altRx, ro | Confirmed (embody already shipped, PR #629) |
| Dated price tables on every review/comparison page | Inventory below: landing and tool pages yes, battle pages partial, review pages none | Partially done; gap is the 26 weight-loss review pages |
| Trust signals (reviewer, medically reviewed, last-updated, methodology, contact, ad disclosure) | All exist (inventory below); residuals are Felix's F26 (26 pages no visible date) and F30 (one disclosure line) | Already done |
| Interactive quiz or cost/insurance calculator | `/find-your-match`, `/find-your-match-weight-loss` (client quiz), `/glp1-cost-calculator`, `/glp1-bmi-calculator` exist | Already done |
| Topic hubs per vertical, TRT first | Six vertical sitemaps live: weight-loss 182, trt 87 (40 articles, 14 reviews, ~33 battles/LPs), hair-loss 71, ed 52, hrt 43, online-therapy 34. TRT is already the deepest non-weight-loss hub | Contradicted on "TRT first"; hubs exist |
| Monthly industry/news post | No news category (articles.ts categories: Guide, Advice, Science, Wellness, Comparison). Atlas's trend research exists (`ops/research/2026-11-16-weight-loss-trends.md`) | Confirmed gap |
| llms/about.md-style page for AI crawlers | `/llms.txt` route exists, filtered to served URLs (398 links, 0 redirecting after #616); `/llms-full.txt` 404 (F26) | Partial |
| Sortable comparison table with filters | `/glp1-provider-comparison` is server-rendered, no client sort or filter; `PriceIndex` is fixed cheapest-first | Confirmed gap (design decision) |

Inventory one-liners: dated price tables: exists on weight-loss landing pages (`VerifiedPricesGlance`, battle-page.tsx:549, "Updated <date>"), `/cheapest-glp1`, `/glp1-provider-comparison`, `/switch-from-ozempic`, `/glp1-pills-vs-injections`, article template ("as of" PRICE_INDEX_VERIFIED, article-page.tsx:694), `best-tirzepatide-online` (landing, tirzepatide table); partial on x-vs-y battles (hand-mapped rows for a few pairs, battle-page.tsx:46-167, no index date on the rest); missing on all 26 weight-loss review pages (`ReviewData` holds only `updatedAt`; prices sit in prose, dated only on embody). Quiz: exists. Calculators: exist. `/how-we-rank`, `/medical-review-policy`: exist. Reviewer bylines: exist (`MedicalReviewBar` on article, battle, review, index templates). Disclosure: exists (`DisclosureBar` in (main) layout, `AffiliateNote`, footer); F30 open. Editorial contact: exists (footer, about, ContactPoint schema). Vertical hubs: exist on one template. llms.txt: exists; llms-full missing. Sortable table: missing. Monthly news post: missing. Price index last verified 2026-11-03 (15 days).

## 2. Actions we adopt (ranked)

1. Dated price block on review pages. Felix builds a per-provider `VerifiedPricesGlance` variant reading `PRICE_INDEX` with the `PRICE_INDEX_VERIFIED` date and changelog link; Sloane places it on the 26 weight-loss reviews, starting with embody, altRx, wellmedr, ro, Medvi (the Bing-demand brands). Pair it with a refresh rule: Atlas re-verifies the index every second Monday (coverage map folder 03 gap). Owner Felix + Sloane + Atlas · M.
2. Title CTR fixes (Sloane · S). altRx review (live 53): "altRx Reviews & Complaints 2026: What $89 Buys, Verified" (56). wellmedr review (live 54): "welludr (wellmedr) Reviews 2026: $41 GLP-1, 12-Month Catch" (58) so the ~450-impression "wellmedr" query sees its word. `is-embody-legit` (live 64, over limit): "Is embody Legit or a Scam? Pharmacy and Refunds Checked" (55), already in the embody brief, not shipped. Optional: ro review "ro Weight Loss Reviews & Complaints 2026: Membership Fee" (56). Keep "Legit or a Scam?" on all legit pages (altRx 58 and wellmedr 54 already fine); embody review already done.
3. Monthly industry post (Atlas research, Sloane writes · M). Cadence: first Monday each month, "GLP-1 telehealth: what changed in <month>", built from `PRICE_CHANGELOG` plus Atlas's trend file; first issue Dec 1 covering the Nov 9 FDA NAION label change, the Empower warning letter and Black Friday compounded pricing (all already sourced in the trend research). Add a "News" article category.
4. Sortable, filterable comparison table on `/glp1-provider-comparison` (operator decision, Felix · M). Keep the server-rendered table for crawlers, add a client layer for sort (price, molecule, commitment) and filters (semaglutide/tirzepatide, no-commitment, brand available). Note F14: the page is already 794 KB; the client layer must not add payload.
5. `/llms-full.txt` and full llms.txt coverage (Felix · S): F26 already lists it; generate from the filtered sitemap so it cannot drift.
6. Brand + cost/reviews/legit long tail (Cleo · S, ongoing): keep to brands where Bing shows modifier queries (altrx, embody, welludr/wellmedr, ro, trimrx); no new battle pairs until the legacy transfer completes (weekly review s.1).

## 3. Declined or deferred

- "Fix indexation first": superseded; 0 redirecting sitemap URLs since Nov 15. The 158 discovered-not-indexed figure waits for the operator's export, then Felix checks the 29 weight-loss URLs for internal-link depth.
- "TRT hub first": TRT is already the deepest non-weight-loss vertical; the thin ones are HRT and online-therapy (F25). Defer hub depth until the Google transfer is measurable.
- New quiz or calculator: both exist; defer to adding WebApplication schema and landing copy (coverage map folder 06).
- Trust-signal build-out: exists; only F26 dates and F30 disclosure remain, already on Felix's list.
- Competitor "winners" and their price tables: DR 0 to 29 domains, pages unread; no action until we read them with a target query in hand.

## 4. Questions for the operator

1. Which GSC property (hub, legacy topweightloss.io, or both) and date window gave 27 Google clicks and 24 for embody-vs-wellmedr? A page x query export for that window would let us reconcile.
2. Was the 273 Bing clicks figure Bing Webmaster's default 3-month window, and for which host? We still lack the Bing page dimension (asked of Dashiell on Nov 16).
3. Can you share the GSC Pages (coverage) export behind "158 discovered-not-indexed", and the date and tool of the "12 of 55 sitemap URLs redirect" crawl?
