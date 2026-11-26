# QA: sloane-threeway-prices-1126  ·  2026-11-26 · Reviewer: Felix · Branch: claude/sloane-threeway-prices-1126

Verdict: SHIP (with Felix's follow-up commit 9ba0d07 included)

## Checked
- Figures against `src/lib/price-index.ts` (welludr $39 / $69, Monthly Plan, Nov 20; refund policy Nov 22): all match.
- Arithmetic: $39 x 12 = $468 vs $49 x 12 = $588 ($120 gap); Medvi $99 - $49 = $50; embody - welludr = $10; $99 - $69 = $30/mo = $360/yr. All correct.
- Winners unchanged (welludr still the pick in welludr-vs-embody-vs-trimrx; verdict order otherwise unchanged). No new terms invented; "no end date stated", "Monthly Plan", "cancel or change anytime" and the prepaid refund-policy wording all appear in the index/provider-audit.
- Crawl main vs branch, 473 sitemap URLs: no status, canonical or link-count changes. Only changes: three trio titles (52, 54, 52 chars, all within 60) and one trio H1 (embody-vs-medvi-vs-wellmedr, $41 to $39).
- Trustpilot remnant in sprout-alternatives removed ("4.7 published record" gone).
- `seo-audit.mjs` on the fixed branch build: PASS, 0 fails, 2 existing warns.

## Fixed by Felix (commit 9ba0d07)
- embody-vs-altrx-vs-medvi intro: "Thirty dollars separates these three" now "$50 separates the cheapest and the dearest of these three" ($49 to $99).
- embody-vs-ro-weight-loss: duplicated sentence ("which matters most in the first weeks...") removed.
- brand-cluster-articles: tirzepatide table note "welludr saves $360 a year but asks for a 12-month plan" updated to the Nov 20 / Nov 22 wording.
- brand-cluster-articles (SHED alternatives): "at 30% of SHED's price, with a 12-month lock" replaced with "about a fifth of SHED's $199 starting price ($39 against $199)"; 30% matched no index figure.
- glp1-weight-loss-medications-guide: "From $41 to $199" now "From $39 to $199".

## Left for the operator
- Review-page promo banner on /weight-loss/reviews/wellmedr ("$41/mo on 12-month plans") is the only stale line remaining in a rendered-text scan; it waits on the operator.
- Dated history (price tracker, black-friday-glp1-deals Oct 28 entry, "previously $41" notes) still shows $41/$71 correctly as past figures.
