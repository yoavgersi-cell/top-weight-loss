# QA: compounded-semaglutide-going-away  ·  2026-11-19 · Reviewer: Felix · PR: #649 (claude/sloane-compounded-semaglutide-going-away)
Verdict: block

Facts, price index and rendering are clean. The block is one unverified claim and the AI-tells pass. Roughly 15 minutes of edits, all in `src/data/compounded-semaglutide-going-away.ts`.

## Blockers
1. **Unverified claim about competitors** (L65 last sentence, L163 first-table lead-in "The ranking pages stop at 2025."). Research file line 108: every ranking host was unreadable, snippet-level only. Stated on the page as fact. Fix: delete both sentences.
2. **Third-party quote not read** (L100: some seller pages "still say compounding 'remains legal while semaglutide stays on the FDA shortage list'"). Research source is a WebSearch summary, no page opened. Fix: delete the sentence, or cite a seller page that was read and dated.
3. **Overstates the FDA** (L89 last sentence "...is what the FDA has now called a copy"). The letter says the Empower products "appear to be essentially copies"; the policy page says FDA "may consider". Fix: "...is what the FDA says appears to be a copy in the Empower letter."
4. **AI-tells, by eye** (grep returned nothing; em-dash count 0):
   - L96 "The 503B route is a proposal under review, not a closed door and not an open one." Fix: "The 503B route is a proposal under review."
   - L159 para 2 opener "So the answer is the same as for semaglutide: not banned, not dated, narrowing on the production side, still available under 503A where a prescriber documents an individual reason." Empty recap plus triple. Fix: delete; keep "Compounded tirzepatide is not FDA-approved."
   - L178 last two sentences ("What has changed is the legal basis... the shortage pathway closed..., the FDA has described..., one large pharmacy..., and the 503B...") restate sections 1 to 4. Fix: cut to "What has changed is the legal basis for compounding in volume, covered above."
   - L202 triple ("whether the pharmacy is named..., whether the plan is month to month or prepaid, and what the refund terms say") and unsourced "Prices change weekly in this market". Fix: two items (pharmacy named with its type; refund terms) and "Prices change;".

## Notes (non-blocking)
- **Correctness follow-up, must land same day as merge:** see "Sloane note 2" below. After this PR merges the index says HealthRx $125 and DirectMeds $249 while about 30 hardcoded places still say $97 and $147.
- L116 DirectMeds refund quote ("feels this is not a good treatment option") is on directmeds.com homepage, not `/solutions/weight-loss` (the linked page). Add the homepage as the source for that cell.
- Tracker labels HealthRx "Price increase +29% / +12%" and DirectMeds "+69%". $97 was a 12-month-plan rate and $147 an unlabelled plan; $125/$249 are monthly. The change text explains it, the badge does not. Operator call: label as "listing changed".
- L131, L170 name Eden and altRx as recipients of June 8 warning letters. Read at fda.gov and framed as a different kind of letter; operator to confirm comfortable naming partners (house rule 4).
- Phone: first table (Empower products) scrolls horizontally inside its card with the Concentration column off-screen; no page overflow (scrollWidth 390).
- Top-2 block renders after the first section (template default), not after "What happens to your plan..." as briefed.

## Sloane notes
1. **Top 2 = embody + altRx, brief says wellmedr + embody:** not a correctness issue. `TOP_TWO_PICK_IDS` is the sitewide operator pair; brief's "price-index order" was shorthand. Follow-up only if the operator wants a page-specific pair (`providerIds` prop exists).
2. **HealthRx $97 / DirectMeds $147 hardcoded elsewhere: correctness issue, follow-up PR required.** Live contradiction with the index and tracker after merge: cheapest-glp1/page.tsx L46,61,143,198,199,257; glp1-provider-comparison/page.tsx L108,300; how-to-choose-a-glp1-provider/page.tsx L207,215,229; editorial-content.tsx L107-108; article-page.tsx L192; battle-page.tsx L121-125,269-272 (SEO title "$97 vs $99"); review-page.tsx L177,267,556,561,585 (HealthRx title "$97/mo", DirectMeds "$147 flat"); articles.ts L1701 and others; brand-cluster-articles.ts L196,231. Not a blocker for this PR (it predates it), but should be one Sloane PR, ideally reading from `PRICE_INDEX`, merged the same day.

## Verified sources (opened by me / matching)
FDA Empower letter, FDA 503B press release, FDA policy page (B12 example, 10%, four-or-fewer, shortage dates), FDA 30-letter release, healthrx.com/pricing (incl. $105/$159 inconsistency), directmeds.com (price; refund on homepage), joinem.co (price, 72h, non-refundable, pharmacies): 7 opened / 7 match. Remaining links (DailyMed labels, shortage database, Eden/altRx letters) rest on the research file, not re-opened. Arithmetic (vial mg, 12-month totals) recomputed: all correct. Price index diff vs research: matches; both change-log entries dated 2026-11-18; tracker renders HealthRx $125/$199 and DirectMeds $249.

## Screenshots checked
Scratchpad: a649-desk.png, a649-phone.png, a649-phone-table.png (1440 and 390; no page overflow).

## Audit: PASS (2 pre-existing warns, 471 pages). tsc clean, build 0 errors. SEO: one H1, title 57, description 159, canonical absolute, Article with image/dates, author Organization, FAQPage present, no heading skips, internal links all 200.

## Re-check 2026-11-19 (Felix)
Confirmed on branch tip e8e5b1d: all four blocker edits present, grep for the removed sentences returns nothing, em-dash count 0. Ready for operator. Merge after #653, before or with #656 (#656 needs this PR's price-index).
