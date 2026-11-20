# 2026-11-20-price-reverify — research
Date: 2026-11-20 · Author: Atlas · Status: ready · Next: Sloane · Brief: operator request (no brief file), feeds PRICE_INDEX refresh. Updated after access was fixed (second pass, rendered with Playwright/Chromium).

## Question and scope
Re-verify the current live price of compounded semaglutide and tirzepatide for every provider in `src/lib/price-index.ts` (12 rows), from each provider's own page, read 2026-11-20, and capture every live Black Friday or holiday promo exactly. Compounded medicines are not FDA-approved. Unreadable pages keep the existing index figure; nothing is estimated. Pass 1 used curl; pass 2 rendered pages in headless Chromium.

## Result table
| Provider | Index now (sema / tirz) | Live now (sema / tirz) | Condition (as the page states it) | Changed? | URL, read 2026-11-20 |
|---|---|---|---|---|---|
| wellmedr (welludr) | $41 / $71 (12-month plan, pre-BF sale, Nov 3) | $39 / $69 | Banner: "BLACK FRIDAY SALE DISCOUNT APPLIED! $39 /mo Semaglutide $69 /mo Tirzepatide Start now and enjoy a more confident body by the holidays!" Cards: "Monthly Plan Starting At $69 a month, Shipped every 4 weeks ... Same price regardless of dosage ... Cancel or change anytime" (tirz); "Monthly Plan Starting At $39 a month ... Semaglutide shipped every 4 weeks ... Cancel or change anytime" (sema). Also "New Customer Offer: $150 off for Life ... lock in $150 off for life - no long term commitments." No end date or countdown in the rendered text | YES: cut $41→$39, $71→$69; basis now labelled "Monthly Plan", not 12-month | https://www.wellmedr.com/pages/get-started-weight-loss (homepage www.wellmedr.com shows no prices) |
| embody (joinem) | $49 / $99 | $49 / $99 | "flat rate at $49/month" and "flat rate at $99/month", "No hidden fees". Banner: "Pre-Black Friday Sale Promo Applied. Save $200 instantly + Fast, Free Shipping!" No countdown or end date in the HTML | No | https://joinem.co/ |
| altrx | from $89 / from $149 (starting price, no promo) | $89 / $149 | Product pages: "$89/mo" (Compounded GLP-1) and "$149/mo" (Compounded GLP-1 / GIP, tirzepatide); homepage "Start for $89/mo". Sitewide banner on every page: "Black Friday Sale - 15% Off Use Code FRIDAY15". Page does not say whether $89/$149 are before or after the 15%, or what the 15% applies to. No visible end date or countdown | Prices no. Terms: live Black Friday code added | https://www.altrx.com/products/compounded-semaglutide, https://www.altrx.com/products/compounded-tirzepatide, https://www.altrx.com/ |
| healthrx | $125 / $199 | $125 / $199 | "$39 for the first month, then $125 a month" (sema); "$39 for the first month, then $199 a month" (tirz). "Prices current as of October 15, 2026." | No | https://healthrx.com/pricing (pass 1) |
| collective | $59 / $69 | $59 / $69 | "$59/month + $199 annual membership"; "$69/month + $199 annual membership"; "same price at any dose"; 21-day free trial, then $199/year billed annually | No | https://www.collective.org/ (pass 1) |
| eden | $99 / $129 | unreadable | n/a | kept | eden.com, edenhealth.com: connection failed (pass 1; not retried, not in the coordinator's fixed list) |
| sprout | from $99 / from $149 | unreadable | n/a | kept | sprouthealth.com: connection failed (pass 1; not retried) |
| medvi | plan from $99, no per-drug cells | no comparable price found; keep null | quad.medvi.org renders Medvi's erectile-dysfunction page ("MEDVI QUAD ... $85 $179 /month Starting at"), not weight loss. No semaglutide or tirzepatide price there | No | https://quad.medvi.org/ |
| directmeds | from $249 / none | from $249 / none | "Plans start at $249/month for sublingual Semaglutide, and $297/month for injections." Injection drug not named; 6-/12-month bulk pricing not priced | No | https://directmeds.com/solutions/weight-loss (pass 1) |
| trimrx | plan from $149, no per-drug cells | unreadable | Rendered page is empty: its app bundle (cloudfront app.js/app.css) and other scripts fail to load through the proxy, so the page never draws. The raw HTML is an empty shell | kept | https://trimrx.com/ |
| bmimd | $149 / $159 | unreadable | Cloudflare challenge returns HTTP 403 to headless Chromium as well as curl | kept | https://bmimd.com/, https://www.bmimd.com/ |
| shed | from $199 / from $299 | unreadable | tryshed.com: proxy 403 (pass 1; not retried) | kept | https://tryshed.com/ |

## Changes to apply
1. **wellmedr, cut** (sale price, read 2026-11-20): semaglutide $41→$39, tirzepatide $71→$69. Condition as the page states it: "BLACK FRIDAY SALE DISCOUNT APPLIED!", "Monthly Plan Starting At", shipped every 4 weeks, same price regardless of dosage, cancel or change anytime; no end date shown. Caveat for Sloane: the index describes $41/$71 as the 12-month plan (Nov 3 notice), while this page labels $39/$69 "Monthly Plan". The two are not shown to be the same basis, so consider `relisted: true` and updating the commitment text ("12-month plan for the lowest rate" is no longer on this page). Also on the page: "New Customer Offer: $150 off for Life", with no price attached, so do not use it as a price. Source: https://www.wellmedr.com/pages/get-started-weight-loss, Nov 20, 2026. Note the coordinator's "50% off" signal was not found in the rendered text or HTML of the homepage or this page (searched "50%" and "% off"; only CSS matches).
2. **altrx, terms** (no `moves`): Black Friday sale live, "Black Friday Sale - 15% Off Use Code FRIDAY15", shown on a sitewide banner. Index prices of $89 and $149 are unchanged on the product pages. What we cannot say: whether those figures are before or after the code, or what the 15% applies to (first order, all months, which products), and no end date appears on the page. Log it as a terms change stating only what the banner says. Source: https://www.altrx.com/, Nov 20, 2026.
3. **embody**: no change. Existing Pre-Black Friday note stands; the live banner now also reads "Save $200 instantly" (no plan attached, no end date). Sloane may add the banner wording to the note; it is not a price move.

No change for healthrx, collective, directmeds, medvi (stays null).

## Live promo capture (all readable providers)
| Provider | Promo, exact | Applies to | End date / countdown |
|---|---|---|---|
| wellmedr | "BLACK FRIDAY SALE DISCOUNT APPLIED! $39 /mo Semaglutide $69 /mo Tirzepatide" | the monthly plans shown | none shown |
| wellmedr | "New Customer Offer: $150 off for Life" | new customers, amount and base not stated | none shown |
| embody | "Pre-Black Friday Sale Promo Applied. Save $200 instantly + Fast, Free Shipping!" | not stated | none in served HTML |
| altrx | "Black Friday Sale - 15% Off Use Code FRIDAY15" | not stated | none visible. The page's JavaScript config contains an undisplayed `offerEndDateTime:"2026-11-19T04:00:00Z"` (a day before the read date, unlabelled); do not cite it as the sale end |
| healthrx, collective, directmeds | no Black Friday or holiday promo found | n/a | n/a |

## Unreadable (kept as-is)
| Provider | Reason |
|---|---|
| trimrx | Renders blank in Chromium: app bundle on cloudfront blocked by the proxy; also a script error. Host to allow: d34xic2nofw0vx.cloudfront.net |
| bmimd | Cloudflare challenge, HTTP 403 even in headless Chromium |
| eden, sprout, shed | Not retried in pass 2 (pass 1: connection failures on eden.com, sprouthealth.com; 403 on tryshed.com). Hosts to allow: eden.com (index source URL unconfirmed), sprouthealth.com, tryshed.com |
| medvi | Reachable but weight-loss pricing page not found; quad.medvi.org is the ED product. Weight-loss URL needed |

## PRICE_INDEX_VERIFIED
No. It cannot advance to 2026-11-20: 7 of 12 providers were read (wellmedr, embody, altrx, healthrx, collective, directmeds, plus medvi's page, which has no weight-loss price). Exceptions: eden, sprout, trimrx, bmimd, shed, and medvi (no weight-loss pricing page read). Per-row read dates can be set to 2026-11-20 for wellmedr, embody, altrx, healthrx, collective and directmeds; the global date stays 2026-11-18.

## Safety and wording notes
- All figures are compounded, not FDA-approved; provider pages say so (embody: "Compounded medications have not been evaluated or approved by the FDA for safety, efficacy, or quality"; wellmedr: "Compounded medications are not FDA approved").
- Collective prices exclude the $199 annual membership. Embody, wellmedr and altrx figures are sale prices; altrx's 15% code mechanics are unverified.
- altRx's product page says "Patients taking compounded GLP-1s lost an average of 12–15% of their body weight over 68 weeks" without a source for compounded products; do not reuse it (compounded products have no trial of their own).
- Provider URLs came from `src/data/compounded-semaglutide-going-away.ts` and `src/data/reviews/weight-loss/*.ts`; collective and altrx URLs from the index notes and coordinator.
