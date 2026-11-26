# QA: welludr (wellmedr) price alignment  ·  2026-11-26 · Reviewer: Felix · Branch: claude/felix-wellmedr-prices-1126
Status: ready. Answers: operator request to rebase and finish Sloane's d44b783 so no page contradicts itself.
Verdict: SHIP PARTIAL (see lists).

## What was done
- d44b783 cherry-picked onto origin/main 8f382dd (clean).
- Index source for every figure: src/lib/price-index.ts, welludr read Nov 20, 2026: $39 semaglutide, $69 tirzepatide, "Monthly Plan", cancel or change anytime; 12-month plan no longer shown. Refund policy (read Nov 22, 2026) still describes 12-month plans as prepaid.
- Pages checked by rendered-text scan (474 sitemap URLs, main vs branch): welludr sentences carrying an undated $41/$71/$492/$123/$96/$852/$696. Before finishing: 64 pages had $39/$69 beside undated old figures. After: 0 except the pages listed under "left on previous wording".

## Finished mechanically (same-page consistent)
- Data fields: wellmedr pricingPlans $39/$69 (+ "Promotional price, read Nov 20, 2026" highlight), product-catalog price/priceNote and meta snippet, products.json highlight, provider-audit rows, site default description.
- Annual totals recomputed only where the basis is stated (promotional price x 12): $468 semaglutide, $828 tirzepatide ($897 at 13 shipments), 3-month $117, 6-month $234. Gaps recomputed: $96->$120, $696->$720, $58/$78->$60/$80, $50-$58->$50-$60, $1,488-$2,496->$1,488-$2,520, $50-$128->$50-$130, $26-$84->$26-$86, $40->$30 tirzepatide premium.
- Headings/titles, digit swap only, same length: wellmedr-cost H1 "$39/Month Math"; 6 welludr battle titles; seoTitle of semaglutide, tirzepatide, cheapest-weight-loss-medication. Descriptions: same digit swap on 23 pages. (Landing seoTitles are store-served live until the code-authoritative change.)
- wellmedr-cost: tirzepatide table cell $89 -> $69; "12-month lock" section prefaced with a dated update note.
- Dated historical statements kept (own date in the sentence): Nov 3 paragraphs in embody-vs-ro and the medications guide, Oct 28 holiday offer, price-changelog.
- Typos fixed (source: index): "embody at $41 flat" -> $49; "welludr ... for $49" -> $39.
- Pre-existing arithmetic errors found and corrected while there: "$240-$360/year" saving vs altRx (is $480 embody / $600 welludr); cheapest-glp1 "Saved vs brand Ozempic" for welludr $13,200 -> $13,320 and embody $12,960 -> $13,200 ($13,788 less year total).

## Left on previous wording (reverted to main), for Sloane
1. src/lib/three-way.ts reverted whole file: embody-vs-altrx-vs-wellmedr, embody-vs-medvi-vs-wellmedr, healthrx-vs-embody-vs-wellmedr, wellmedr-vs-embody-vs-trimrx. Their verdicts rest on "commit for a year vs stay flexible", which the Monthly Plan label undercuts; that is an editorial rewrite. They keep $41 consistently (the price strip already showed $39 on main).
2. review-page.tsx REVIEW_PROMOS banner on /reviews/wellmedr: "Lock in $200 off every month, or $41/mo on 12-month plans - for life." Operator-supplied promo; left at $41, needs operator confirmation of the current wording.
3. provider-gallery.ts welludr plans screenshot still shows $41/$71; caption now says it predates the Nov 20 read. Needs a new screenshot.
4. embody-vs-ro-weight-loss keeps its Nov 3 comparison, labelled as such.

## Flags for Sloane (not changed)
- brand-cluster sprout-alternatives mentions "a 4.7 published record" for welludr: if that is Trustpilot, it breaks the Nov 16 removal rule.
- Collective's "lowest tirzepatide price we track" is now a tie with welludr at $69 (index edge text unchanged).
- Battle "embody wins the exit terms" kept; check against the Monthly Plan label.

## Checks
- tsc clean; build 0 errors; seo-audit RESULT: PASS (0 fails, 2 pre-existing warns, 474 pages).
- Crawl main vs branch (474 URLs): status changes 0, canonical changes 0, affiliate (sponsored) link drops 0, internal link drops 0, H1 changes 0, words dropped >5 on one page (glp1-provider-comparison, -20, 12-month framing removed). Titles changed: 9 (digit swaps). Descriptions changed: 23 (digit swaps, lengths unchanged).
- Screenshots at 1440 and 390, no horizontal overflow: /weight-loss, /weight-loss/cheapest-glp1, /embody-vs-wellmedr, /reviews/wellmedr, /articles/wellmedr-cost, /glp1-provider-comparison.
- Note: live serves 41 stored articles and landing pages from the CMS copy, so many of these edits show live only after the code-authoritative change.
