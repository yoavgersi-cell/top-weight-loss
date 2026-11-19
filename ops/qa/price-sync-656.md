# QA: price-sync  ·  2026-11-19 · Reviewer: Felix · PR: #656 (claude/sloane-price-sync)
Verdict: block

Prices and the ranking flip check out. Two blockers: surviving Trustpilot-derived review figures (brand-misuse notice) and DirectMeds "flat at every dose" wording that now contradicts the $249 / $297 evidence. 18 files, no fix applied by me; send back.

## Blockers
1. **Trustpilot-derived figures still render (CRITICAL, notice of Nov 16).** Swept all 470 sitemap URLs on the branch build (and on #656 + #649 combined). Three live strings; each matches the stored Trustpilot aggregate exactly:
   - `src/data/pillar-glp1-online.ts` L240: "Eden at $99/$129 flat with 24/7 human support and a 4.5 across 5,019 reviews" (Eden Trustpilot 4.5 / 5,019). Cut to "Eden at $99/$129 flat with 24/7 human support". Page: /weight-loss/articles/glp1-weight-loss-online-complete-guide. Sloane edited neighbouring text in this paragraph and left it.
   - `src/data/pillar-glp1-online.ts` L246: "Medvi at $99 on promotion, all-inclusive, HSA/FSA accepted, 4.3 across 15,097 reviews" (Medvi Trustpilot 4.3 / 15,097). Cut ", 4.3 across 15,097 reviews".
   - `src/data/brand-cluster-articles.ts` L133 (renders on /weight-loss/articles/ro-cost): link text "Is Ro legit? What 7,380 reviews and Reddit say" (Ro Trustpilot 7,380). Change to "Is Ro legit? What Reddit says" or the page's own H1 wording.
   Verified gone in this PR: the "14,000-review" Medvi phrase (brand-cluster L947 on main). Data files under `src/data/reviews/` still hold the aggregates but are stripped at render by TRUSTPILOT_DATA_REMOVED; no rendered text from them. Out of scope for this PR, for the operator: HRT pages repeat Winona's self-reported "4.6/5 from 100,000+ women" (/hrt, /hrt/reviews/winona, midi-vs-winona, winona-vs-gala), and /hrt/articles/midi-cost carries a quoted "(5 stars, Sep 29, 2026)" customer line. Check their provenance against the notice.
2. **DirectMeds "flat at every dose" contradicts the new evidence ($249 sublingual vs $297 injections) and is unverified.** Remove or reword (do not reword the fact; delete the flat claim) at: `src/components/pages/review-page.tsx` L172 (meta description, "{prices} flat at every dose"); `src/data/brand-cluster-articles.ts` L447 ("Flat, drops option"); `src/app/(main)/glp1-provider-comparison/page.tsx` L699 and L783 ("flat, dose-independent pricing ... DirectMeds"); `src/app/(main)/how-to-choose-a-glp1-provider/page.tsx` L78 and L233 (HealthRx and DirectMeds both listed as "state one price at every dose"; neither provider's Nov 18 page says this); `src/app/(main)/switch-from-ozempic/page.tsx` L73, L285, L374 (DirectMeds in the same-price-at-every-dose list). Same list names HealthRx; its Nov 18 evidence is $39 then $125 until canceled, no dose claim.
3. Stale label: `src/data/brand-cluster-articles.ts` L447 HealthRx row "$125/mo* | $199 | 12-mo plan". $125/$199 is the monthly plan; "12-mo plan" is the old basis. Change to "Monthly plan, $39 first month" (as used at L293).

## Notes (non-blocking)
- DirectMeds "Free 1-2 day shipping" remains in ~12 places (review, catalog, three-way, audit row). PRICE_INDEX itself (#649) carries "arrives in 1-2 days" and "shipped within 1 business day" from Nov 3/18 reads, so this is not a new claim; recommend Atlas re-verify the shipping line on directmeds.com and date it. Not a blocker.
- `src/data/brand-cluster-articles.ts` L495 row "Cheaper tirzepatide | HealthRx | $199/mo* | Support depth": HealthRx $199 is dearer than Medvi $166, altRx $149, embody $99. Clarify the comparator or cut.
- /weight-loss/healthrx-vs-medvi still shows "Last updated: Sep 2, 2026" after a Nov 18 content change; dates come from the record that changed (operator call).
- tirzepatide ranking sentence now "Medvi sits fifth" (DirectMeds $147 removed, HealthRx $199 added): count checked, correct for the listed prices.
- DirectMeds quiz entry keeps `priceLevel: "low"` (config-store L4648) at $249 semaglutide, against embody $49, altRx $89. Hand-set attribute, now arguably wrong; operator call, I did not touch it.

## Ranking flip (operator decision; not changed by me)
HealthRx vs Medvi battle, category "Price (If You Commit)" -> "Price":
- Before: winner provider2 (HealthRx), $97 12-month rate vs Medvi $99 promo.
- After: winner provider1 (Medvi), $99 promo vs HealthRx $125 after $39 first month; tirzepatide Medvi $166 promo vs HealthRx $199. Starting Price row highlight "both" -> provider1.
- Pure arithmetic from PRICE_INDEX (HealthRx $125/$199, read Nov 18). No score, rank, rating or overall pick changed: "Medvi is our pick" was already the verdict; products.json ratings untouched. The category rename drops "(If You Commit)" because the 12-month basis is gone. Correct, not editorial.
- Also: DirectMeds loses 3 catalog products (semaglutide injection, tirzepatide injection, tirzepatide drops). The $297 injection price is not tied to a named medication in the evidence, so these listings had no verifiable price; removal is consistent. DirectMeds drops from the under-$150 tirzepatide lists.

## Prices (verified)
HealthRx $125 / $199 ($39 first month), DirectMeds $249 sublingual / $297 injections match PRICE_INDEX in #649 and its Nov 18 evidence. $1,414 12-month HealthRx total = $39 + 11 x $125 correct; $664 six-month = $39 + 5 x $125 correct. On the combined #649 + #656 build, no stale $97, $177 or $115 outside the change-log history rows; the remaining $147 are embody's and Wellorithm's (legitimate) and the DirectMeds "from $147 -> $249" tracker rows. DEPENDENCY: #656 does not touch price-index.ts. On its own the branch renders old "$97 / $147" from the index next to new prices (seen on /weight-loss, /cheapest-glp1, /black-friday). It must merge after #649.

## Standard checks
tsc clean, build 0 errors, `seo-audit.mjs` PASS (0 fails, 2 pre-existing warns; 470 pages on branch, 471 combined with #649). No horizontal overflow and exactly one H1 at 1440 and 390 on healthrx-vs-medvi, reviews/healthrx, reviews/directmeds, cheapest-glp1, glp1-provider-comparison, how-to-choose, the pillar and /weight-loss. Looked at the healthrx-vs-medvi phone screenshot. Rewritten HealthRx / DirectMeds prose has no AI-tells I could find (no em dashes, no triples). Merge simulation: #656 merges cleanly with #649 and #653 (no conflicts).
