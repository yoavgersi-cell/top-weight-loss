# Brief: refresh `/weight-loss/reviews/embody` for "embody reviews and complaints"

- Date: 2026-11-16 · Author: Cleo · Status: in-review · Next: operator approves the copy, Felix QA
- PR: https://github.com/yoavgersi-cell/top-weight-loss/pull/629 (Sloane, 2026-11-16). Content lives in the repo (`embody` is code-authoritative in `src/lib/config-store.ts`), so no CMS update is needed. Not done in this PR, per the launch instructions: the `is-embody-legit` title trim, the link from `best-online-weight-loss-programs`, and the "1-2 days" strings in shared files (`products.json` tagline and `product-catalog.ts` carousel line are still visible on the review page).
- Answers: weekly review action 3 (`ops/briefs/2026-11-16-weekly-review.md`). Refresh, not a new article: the page exists and answers 200 (checked live 2026-11-16).
- Ahrefs: Free plan, no keyword or SERP data; demand figures are Bing Webmaster (Oct 19 to Nov 15), rounded.

## Target
- Query family: "embody weight loss reviews", "embody reviews", "embody reviews and complaints", "embody weight loss scam" (secondary: "embody weight loss", "embody program"). Intent: commercial investigation. Real question: "Is embody's $49 semaglutide for real, what do people complain about, and what happens if I am not approved or want out?"

## Why now
- Bing, Oct 19 to Nov 15: about 1,030 impressions across the five embody queries, 2 clicks (source: Bing Webmaster export, rounded). Review-intent queries alone are ~430 impressions. The "scam" variant converts at a far higher rate than the rest, which says the searcher wants a verdict plus complaints, not a price headline.
- Google: the legacy `/articles/embody-vs-ro-weight-loss` is the only legacy URL still earning clicks (pos ~7, GSC Nov 2 to 15); embody is the strongest brand cluster the site has on both engines.
- Commercial fit: embody is the sidebar featured provider on eight money pages; the review is where the cluster converts.
- Current title (58 chars) leads with price: "embody Reviews 2026: $49 Semaglutide in 1-2 Days? Verified". The description promises "what its 10,689 Trustpilot reviews actually complain about" but the H2 list has no complaints section; the promise is unmet on the page.

## What ranks today (WebSearch snippets 2026-11-16; the hosts could not be fetched from this sandbox, Atlas must read them)
1. talktomira.com "Embody GLP-1 weight loss reviews: is it legit" (updated Sep 30, 2026, 13 min): long, cites a $149 first-month price; check which plan that is.
2. top10.com embody review: affiliate ranking site, commission-disclosed; thin on complaints.
3. trustpilot.com/review/joinem.co: the raw reviews; snippets show country-page aggregates of 3.3 to 3.6, which may differ from the 3.8/10,689 we publish.
4. yourhealthmagazine.net and muddyrivernews.com "Embody GLP-1 reviews, is it worth it 2026": sponsored-style posts, no primary sources.
5. sikayetvar.com: complaint board, dose-change and formulation-change complaints.
- None of them has a dated complaints taxonomy with counts, the refund rule verified on embody's own terms page, or the compounded dose stated in mg/mL.

## Our edge
- One table nobody has: "What embody customers complain about, counted" (theme, share of 1 to 2-star reviews in the sampled period, embody's typical response), next to the verified positives, with the Trustpilot read date. The site already has `/weight-loss/review-analysis/embody` ("What 96 embody Reviews Say"); fold its method into the review and decide with the operator whether that page then gets a canonical to the review (cannibalisation note in the weekly review).

## Must-have figures (Atlas verifies; nothing published from memory)
- Trustpilot US page: TrustScore, review count, star distribution, read date. Our live figure is 3.8 / 10,689 (price index, verified 2026-10-25). If it moved, update `src/lib/price-index.ts` and the review together.
- Prices: $49 semaglutide / $99 tirzepatide sale (seen Oct 28, 2026, countdown noted Nov 3) vs regular $79/$129. Re-read the banner; state the end date only if embody states one.
- Refund if not approved: quote embody's own terms/FAQ page with URL and date.
- Pharmacy: LegitScript certification page for joinem.co, and the 503A statement on embody's site; note compounded semaglutide and tirzepatide are not FDA-approved.
- Dose: mg per week at each step and the vial concentration (mg/mL) as embody publishes it; "units" alone is a red flag (house rule 2).
- Shipping: "1-2 days" claim with the source page and date.
- Complaint taxonomy: sample the most recent 1 to 2-star Trustpilot reviews (fixed window, e.g. the last 60 days), code into 4 to 6 themes, count them, and note embody's response pattern. No quotes attributed to named customers.

## Structure (H2s)
1. Short answer: is embody legit, and what do the complaints say? (verdict in 3 lines)
2. What does embody cost in 2026, and what is the catch? (sale vs regular, month to month)
3. What do embody customers complain about? (the counted table; the edge)
4. What do customers praise? (verified positives, in proportion; house rule 4)
5. How does embody work, and what if you are not approved? (refund rule, prescriber review)
6. Is the pharmacy legitimate? (LegitScript, 503A, not FDA-approved)
7. embody vs the alternatives (two-line pointers to altrx-vs-embody, embody-vs-wellmedr, embody-vs-ro)
8. Sources and methodology (dated)

## Internal links
- In (already link here, keep): `/weight-loss`, `/weight-loss/cheapest-glp1`, `/weight-loss/ozempic-alternatives`, `/weight-loss/glp1-pills-vs-injections`, `is-embody-legit`, `embody-cost`, `embody-alternatives`, battle pages. Add a link from `/weight-loss/best-online-weight-loss-programs` (the redirect target that inherits most legacy impressions) with anchor "embody reviews and complaints".
- Out (already present, keep): `is-embody-legit`, `embody-cost`, `embody-alternatives`, `altrx-vs-embody`, `embody-vs-wellmedr`, `embody-vs-ro`, `review-analysis/embody`.

## Provider block
- Vertical top-2 rule (weight-loss review page); embody CTA via `ProviderCta` only. No Trustpilot widget (sitewide hidden; this slug is not in `TRUSTPILOT_WIDGET_ARTICLE_SLUGS`).

## Title and description candidates
- T1 (57): "embody Reviews & Complaints 2026: $49 GLP-1, Verified"
- T2 (59): "embody Reviews 2026: Complaints, Refunds and the $49 Catch"
- T3 (54): "embody Weight Loss Reviews 2026: Complaints Counted"
- D1 (156): "embody reviews, checked: $49 semaglutide and $99 tirzepatide month to month, 1-2 day shipping, refund if not approved, and what the 1-star reviews actually say."
- D2 (149): "We read embody's recent Trustpilot complaints and counted them by theme, verified the pharmacy and refund rule, and priced every plan. The catches first."
- Companion fix, same PR: `is-embody-legit` title is 64 chars and description 165 on live; trim to "Is embody Legit or a Scam? Pharmacy and Refunds Checked" (55) and a 160-char description. Keep "Legit or a Scam?".
