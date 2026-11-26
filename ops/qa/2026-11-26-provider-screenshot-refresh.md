# QA: provider screenshot refresh, Nov 26, 2026  ·  Reviewer: Felix · Branch: claude/felix-embody-refresh-1126
Status: ready. Answers: operator batch "we go by what the provider's own site shows" (operator screenshots of Nov 26, 2026).
Verdict: SHIP PARTIAL (see "Left alone / flagged").

## Per provider (eight)
| Provider | Commit | Price move | Notes |
|---|---|---|---|
| embody | d6a0910 | none ($49/$99) | label "Black Friday Sale Discount Applied", countdown; "was $299" is embody's own comparison |
| Eden | 48dee19 | none ($99/$129) | re-dated Nov 26 |
| Collective | a3eb8ae | none ($59 sema; tirz $69 and membership keep Nov 11) | |
| altRx | a0e1701 | none ($89 start; FRIDAY15 note keeps Nov 20) | |
| SHED | dc7eac0, 0696797 | none (offer 30% first month) | other pages brought from 20% to 30%; year-one $2,328; "150,000+ members" worded as SHED's statement |
| welludr | 51ab126 | $39 -> $35, $69 -> $65 | Black Friday sale banner, no end date shown; log entry with moves |
| TrimRx | fbcada3 | "starting at $179" -> "$149" | no per-drug price, no banner shown; log entry (no moves: plan-level row) |
| Medvi | 180ec72 | $99 unchanged; $166 GLP-1 + GIP shown again | plan-level row kept, see below; no gallery (image not saved) |
Black Friday page: 08a5696.

## Method
- Prices and dates only from `src/lib/price-index.ts` and what each image shows. Plan label, cadence and cancellation terms for welludr keep their Nov 20 read; TrimRx refund-term statements keep Nov 22.
- Site-wide edits by script with a per-occurrence context check (welludr $39/$69 only where welludr context; Ro, HealthRx, Collective, Medvi, HRT figures untouched), then manual passes for totals, gaps, history paragraphs and apostrophe escaping.
- Self-consistency scan: rendered text of the 170 weight-loss and site sitemap URLs (main vs branch), searching welludr/TrimRx/Medvi/SHED sentences for stale figures. Remaining hits are dated history only.

## welludr
- Recomputed: $420 and $780 (year), $845 at 13 shipments, $105 / $210 (3 / 6 months), cheapest-glp1 saving vs brand $13,368; gaps: embody $168/yr (was $120), Sprout $768/yr, altRx saving $480-$648, DirectMeds $1,488-$2,568, HealthRx overnight premium $90, embody tirzepatide $408/yr, Sprout $64/$84 a month, support premium $50-$64, embody "$14 more", "more than five times" (microdosing).
- Pre-existing stale figures corrected while there: $492 (a $41 year) in the microdosing pillar; "$84" HealthRx gap; "$140" SHED gap now $164 ($199 - $35).
- Promo banner (review-page.tsx REVIEW_PROMOS) rewritten: Black Friday sale, $35/mo semaglutide and $65/mo tirzepatide, per welludr's site, read Nov 26, 2026. "$200 off", "12-month plans", "for life" removed.
- Gallery: stale $41/$71 plans slide replaced by a banner crop, `price {35, 65}`; file kept on disk.
- Patient claim: every "1,000,000+ / 1M+ / one million / million-patient" became "100,000 patients across the U.S." as welludr's own statement, read Nov 26, 2026. Places: config-store (review summary, intro, trust badge, five meta descriptions, Sprout battle subtitle/intro/bullets/badge), battle-page.tsx (four descriptions), three-way.ts (standout), articles.ts (two paragraphs in the cost article), brand-cluster-articles.ts (two paragraphs and a table cell), glp1-weight-loss-medications-guide.ts, price-index change log. Four battle descriptions were shortened elsewhere to stay within 160 characters.
- Collective: "tied at $69" / "tied for lowest" removed in the review (edge, intro, feature, pro, comparison sentence); Collective is now second-lowest at $69 against welludr $65. Index edge text updated. A search for Collective $65 shows no stray conversions.

## TrimRx
- 117 mentions plus titles (digit swaps), $179 x 12 floor now $1,788. The Nov 22 $179 and "$120 Off" banner are kept as dated history; the "does not say whether $179 is before or after $120" sentences were rewritten (the Nov 26 page shows no banner).
- Review "Last updated" set to Nov 26. Gallery hero crop (price block only; review and "100k+ Happy Customers" lines excluded).
- Ranking check: TrimRx remains above Medvi, altRx, embody, welludr, HealthRx; no page order flips. Sprout's month-to-month $149 now equals TrimRx's start, no sentence ranks them against each other.

## Medvi
- Index row stays plan-level "from $99"; note records the Nov 26 text. Change-log entry says the $166 GLP-1 + GIP figure (our tirzepatide figure until Nov 3) is shown again.
- Decision for the operator: I did not add a per-drug tirzepatide row. It would add a tenth provider to every tirzepatide table, the "nine providers, median $149" copy and the "Medvi cannot be ranked on tirzepatide" pages. Tell me if you want it; the pages below then need a pass.
- Four comparison pages carrying old Medvi prices fixed (no more "regularly $199 / $299"): embody-vs-medvi, healthrx-vs-medvi (both in battle-page.tsx and the CMS copy), calibrate-vs-medvi, sequence-vs-medvi. Also the 2027 coverage table and the weight-regain pillar row.
- "Medvi's site says the offer ends December 1" attributed to Medvi; "Was $199" described as Medvi's own comparison.

## Black Friday page
- Entries added: welludr, Medvi (endsOn Dec 1, shown as "ends Dec 1 per the provider (start not stated)"), TrimRx (not labelled a Black Friday offer).
- "From the index, verified Nov 18" line now continues "; rows re-read November 26, 2026: ..." derived from index notes. `PRICE_INDEX_VERIFIED` not bumped (the ticker still says Nov 18).

## Left alone / flagged
1. Medvi tirzepatide row decision (above). Pages that still say Medvi publishes no tirzepatide price (dated Nov 3 / Nov 22 reads), found by search, not exhaustive: the brand-cluster Medvi tirzepatide cost article and its comparison tables, glp1-provider-comparison, the Medvi review text, three-way.ts, the healthrx-alternatives article.
2. Other pages that still say "Medvi's site last read Nov 3 / could not be re-read Nov 22" (dated, true as history).
3. Pages quoting Medvi "$199 regular" outside the four: pillar-glp1-online ("promotions against $199"), articles.ts "up to $199", three-way.ts embody-vs-altrx-vs-medvi. Left; Medvi's "Was $199" is its own comparison.
4. SHED: index notes carry no "N% off month one" token, so the cost calculator and true-cost helper show SHED as entry-only; code now reads any percentage, so adding the token would restore month-one math if you want it.
5. The "Prices verified Nov 18, 2026" ticker and the review-page "Last updated" of providers not touched here are unchanged by design.
6. welludr: the Monthly Plan label, cadence and cancel-anytime lines were not in the Nov 26 image and keep Nov 20.
7. Live site serves CMS copies for stored articles; code-authoritative edits show live after that change ships.

## Checks
- tsc clean; build 0 errors; seo-audit RESULT: PASS (0 fails, 2 warns, 474 pages) after every commit; deep audit run on the final build (no new classes of finding; 3 pre-existing TRT/hair-loss items).
- Crawl main vs branch (170 URLs on the weight-loss and site hosts): status changes 0, canonical changes 0, affiliate (sponsored) link count changes 0, internal link count changes 0, external link count changes 0, pages losing more than 5 words 0. H1 changed on 3 (digit swaps: best-tirzepatide-online $65, wellmedr-cost $35/Month Math, trimrx-cost $149). Titles changed 14 (all digit swaps of the welludr $39/$69 and TrimRx $179 figures). Descriptions changed 34; every one is at most 160 characters except pages already over 160 on main (/, directmeds-alternatives, units-to-mg).
- Screenshots at 1440 and 390 of /weight-loss, /weight-loss/reviews/wellmedr, /weight-loss/reviews/trimrx, /weight-loss/black-friday-glp1-deals looked at: banner, price cards, offers and tables render; the product card row swipes sideways on phones as before (overflow not measured).
