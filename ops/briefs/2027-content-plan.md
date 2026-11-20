# 2027 content plan: year-roll refreshes, few new pages, timing

Date: 2026-11-20 · Author: Cleo · Status: ready · Next: Atlas (verify A1 data, price history, DEA status), then Sloane
Answers: operator request for a 2027 plan and the date to act by. Read-only; nothing built or edited.
Sources: Keyword Tool guest (US, pulled 2026-11-20; quota 20 of 120 daily used); Ahrefs Free plan, 0 workspace units, no keyword data; GSC via the 2026-11-16 weekly review (no fresh pull today, GSC not re-pulled); indexation read `ops/qa/2026-11-18-indexation.md` (GSC Page indexing to 2026-11-13); repo grep today.

## Decisions first
1. **Roll existing URLs, do not build "best X 2027" pages.** A new URL starts with no age and no links, and our indexation is slow (180 indexed, 287 Discovered-not-indexed, 2026-11-13). The same URL with a 2027 title keeps whatever it has.
2. **Recommended window: A1 hubs (7 pages) re-verified and rolled Dec 1 to Dec 12, hard stop Dec 15.** That leaves about two to three weeks for Google to recrawl before Jan 1. The lead time is my assumption, not a measurement: we have no recrawl-latency data for this host.
3. **Roll a page's year only when its data is re-verified that week.** The 2027 title with 2026 prices breaks house-rules section 1. So the roll runs inside the cadence (1 to 2 a week), not as a sitewide find-and-replace. About 165 pages carry a year; roughly 7 need it by Dec 15, about 45 over Dec to Feb, and the rest are evergreen and can wait or drop the year (operator call, see Tier A3).
4. **Only 3 new-page candidates clear the bar, none of them a "best X 2027" list.** See Tier B.

## Timing evidence (what is measured and what is not)
- **Not measured: when "best X 2027" queries ramp.** Trends rising for "best weight loss 2027" returned nothing; "best ed pills 2026" and "best online therapy 2026" returned unrelated rising strings (Keyword Tool, Google Trends, US, 2026-11-20). The tool gives related-query lists, not a time curve, and Ahrefs is on Free, so no volume. A WebSearch (2026-11-20) found no published curve for year-stamped queries. The late-Nov to Dec ramp and January peak are the general year-stamp pattern and the New Year weight-loss/health spike, so treat them as an assumption. First check once GSC shows 2027 queries: look for "2027" in the Dec 1 weekly review.
- **Measured: 2027 intent already exists in the autosuggest for GLP-1.** Google suggestions for "glp-1 2027" (Keyword Tool, strings only, no volume, 2026-11-20): "medicare glp 1 coverage 2027", "fehb glp 1 coverage 2027", "glp 1 prices 2027", "glp 1 cost 2027", "will glp 1 be cheaper in 2027", "will insurance cover glp 1 in 2027", "medicare glp 1 bridge 2027", "medi-cal glp 1 coverage 2027". The "2027" phrasing is about coverage, price and Medicare, not "best" lists. We already have `glp1-coverage-2027` (Nov 2, 2026) and the Medicare $50 pages.
- **Measured: ED has live demand.** "ed pills that work" 1,300 volume, trend +81 (Keyword Tool cached row, Google US, date not stated). One row; it supports the ED roll, not a trend claim.
- **Why dates matter more than usual here.** Google ignores IndexNow (it covers Bing); our Google pickup runs on crawl and the sitemap. Mitigations: after each roll, the operator requests indexing for the A1 URLs in GSC URL Inspection (about 10 minutes, 7 pages). Felix's #642 caching fix (live Nov 17) should help; the Nov 25 indexation read is the first test. If indexed stays near 180 on Nov 25, pull the A1 deadline forward to Dec 8.
- **Baseline to protect is small.** Google gave the hub 0 clicks on about 70 impressions (Nov 2 to 15, GSC via weekly review of 2026-11-16). Pages with 10+ impressions were `/`, `/ed` (pos ~2), `/hair-loss`, `/weight-loss`, `/weight-loss/tirzepatide`. Bing (Oct 19 to Nov 15): "welludr" ~600 impressions, ~20 clicks (protect `is-wellmedr-legit`, keep "Legit or a Scam?"); embody variants ~1,030 impressions, 2 clicks. So the rolls protect little today and mostly buy 2027 position.

## Inventory (mechanical grep today; title/H1 lines carrying 2025 or 2026, ±10)
`articles.ts` 37 · `brand-cluster-articles.ts` 23 · seeds ~103 (hair-loss 27, online-therapy 20, TRT 14, ED 13, HRT 11, hearing aids 2, rest in the Oct article batches) · standalone WL pages under `src/app/(main)` about 12 (home, weight-loss-pills, glp1-pills-vs-injections, cost calculator, BMI, dose schedule, shipping, support, ozempic-alternatives, ED cost index, hair-loss women) · other `src/data` files about 5. Excluded: hearing aids (noindex), Noom (noindex), the dynamic review-analysis title (301 since #637). Slugs with "2026" in the URL: 3 (`online-trt-dea-deadline-2026`, `telehealth-controlled-substances-dea-rules-2026`, `menopause-hormone-therapy-2026-what-changed`); keep the slugs, change the title only, so no redirect is needed.

## Tier A: year-roll refreshes (existing URLs)
**A1, roll by Dec 12 (7 pages, the real "best X 2027" targets):** the Best-of hubs for ED (`ed.ts:43`), TRT (`trt.ts:1402`), HRT (`hrt.ts:1360`), online therapy (`online-therapy.ts:1397`), hair loss (`hair-loss.ts:2574`), plus the homepage title (`(main)/page.tsx:25`). Add `/weight-loss-pills` (title "Weight Loss Pills 2026", in the 2027 retatrutide/pill news cycle) as the seventh. Ranked by demand: ED (one cached row, hub at pos ~2), WL home and hub (pos ~6), hair loss (~6), then TRT, HRT, online therapy (no impression data in the export). Each needs a price/label re-verify by Atlas.
**A2, roll as data is re-verified, Dec 15 to Feb (about 45 pages):** price and cost pages where "2026" is the buying signal: WL costs (semaglutide cost, Zepbound price, Wegovy pill price, cheapest tirzepatide, medication cost guide), 7 brand "Cost 2026" pages, 7 "Alternatives 2026", 4 "Is X Legit (2026)" (keep "Legit or a Scam?" wording), ED cost index, TRT cost, HRT cost x3, hair-loss cost x4, therapy cost x3. Order: pages with impressions first (embody, welludr/wellmedr, medvi), then the rest by price-index change date.
**A3, do not roll in bulk (about 110 evergreen explainers, e.g. "Norwood scale (2026)", "Does online therapy work? (2026)"):** the year adds no buying signal. Leave as is until a natural edit. Operator call: drop the year from these titles at the next edit so they stop aging. Not before the A1/A2 rolls land.
**Event pages, update on the event, not the calendar:** `online-trt-dea-deadline-2026` and `telehealth-controlled-substances-dea-rules-2026` (DEA telehealth deadline Dec 31, 2026, per the page titles; Atlas confirms the status). A single Atlas read covers both.

## Tier B: new pages worth building (max one per vertical, all clear the value bar only if Atlas verifies)
1. **WL: "Will GLP-1s get cheaper in 2027?"** Demand: three autosuggest strings (above), no volume. Edge: our dated price-index change log plus the manufacturers' and CMS's own stated 2027 plans, read and dated. Condition: Atlas confirms the change log has enough history to show real moves; if not, fold it into `glp1-coverage-2027` as a section and do not build.
2. **TRT and online therapy (one read, two pages): the Jan 1 DEA aftermath update.** Event-driven; the edge is the primary-source status of the rule read on the day. Counts as the Jan 5 week's article. No new URL if the existing pages can carry it (preferred).
3. **ED: "ED treatment cost index 2027"** is a roll of the existing index page, using our own `ed-price-index.ts` as the data edge. It is the ED turn in the rotation (calendar week of Nov 24 is queued for a non-WL vertical).
HRT and hair loss: nothing clears the bar today (no trend scan for those verticals exists, per the calendar backlog). Do not commission until Atlas scans them.

## Tier C: do not build
- A new "Best <vertical> 2027" URL for any vertical: cannibalises the Best-of hub, no age, slow indexation.
- "<Brand> cost 2027", "<brand> alternatives 2027", "<brand> legit 2027" new pages: that is the 23-page brand cluster; roll it. New ones would be mass production.
- "2027 predictions" or "best GLP-1 2027" lists without a verified table: no edge over the incumbents.
- Retatrutide or "next-gen drugs 2027" pages: the pages exist (`next-generation-weight-loss-drugs`, `retatrutide-weight-loss`); roll or refresh on a Phase 3 or FDA event only.
- Hearing aids and Noom 2027: noindex.
- Junk suggestions from the tool ("2027 election", "2027 conference"): ignore.

## Schedule (cadence 1 to 2 a week, total; a verified roll counts as the week's article)
| Week of | Work | Owner |
|---|---|---|
| Nov 24 | Non-WL pick per calendar. Atlas runs the missing ED/TRT/HRT/therapy/hair trend scans. Nov 25: read the indexation export; if indexed is still ~180, pull A1 forward. Thanksgiving Nov 26: ship nothing extra. | Cleo, Atlas, operator |
| Dec 1 | Roll `/weight-loss` home + `/weight-loss-pills`, then ED Best-of. Operator requests indexing in GSC for each. | Atlas verify, Sloane, Felix review |
| Dec 8 | Roll hair-loss and TRT Best-of. Check weekly review for any "2027" queries. | same |
| Dec 15 | Roll HRT and online-therapy Best-of (A1 hard stop). Atlas starts the price-history check for Tier B1. | same |
| Dec 22 | Build Tier B1 only if the price-history check passes; else one A2 roll (welludr, medvi). | Sloane |
| Dec 29 | Ship nothing unless ready; Atlas reads DEA status on Dec 31. | Atlas |
| Jan 5 | DEA aftermath update (TRT + therapy), plus one A2 roll. | Sloane |
| Jan 12 | ED cost index 2027 roll (needs a fresh `ed-price-index` read); one A2 roll. | Sloane |
| Jan 19 on | A2 rolls, one or two a week, price-index order. Review GSC for 2027 queries and rank vs 2026 baseline (Nov 16). | Cleo |

## Open items for the operator
- Approve the Dec 15 hard stop and the re-verify-before-roll rule (Decision 3).
- Decide A3: keep the year or drop it at the next edit.
- Ahrefs is Free and Keyword Tool guest gives no volume, so Tier B demand is autosuggest presence only; a paid plan would let me replace "no volume" with figures.
