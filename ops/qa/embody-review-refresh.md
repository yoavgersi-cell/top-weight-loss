# QA: embody-review-refresh  ·  2026-11-16 · Reviewer: Felix · PR: https://github.com/yoavgersi-cell/top-weight-loss/pull/629

- Date: 2026-11-16 · Author: Felix · Status: ready · Answers: Cleo's brief `ops/briefs/2026-11-16-embody-review-refresh.md` (Felix QA of PR #629, branch `claude/sloane-embody-review-refresh`, head `109e04d`)
- Page: `/weight-loss/reviews/embody` · Evidence: `ops/research/embody-review-refresh.md` (Atlas, 2026-11-16)

Verdict: **approve with changes**

The diff itself is clean: every figure, price, quote and date in the three changed source files traces to the evidence file, the house rules hold, schema parses, audit passes. The one change I want before merge is outside the diff but on the same rendered page: the shared embody strings that still say "shipped in 1-2 days" and "month-to-month" sit directly under the H1, so the page as rendered contradicts its own body. Four lines; same evidence, same date.

## Blockers (file:line, what, why, the fix)

None inside the diff. The change below is a condition on the merge, not a defect in Sloane's files:

1. **`src/data/products.json:147`** `"tagline": "Compounded GLP-1 from $49/month, shipped in 1-2 days"` renders as the subtitle under the H1 (`review-page.tsx:942`), two lines above "Last updated: Nov 16, 2026" and the Bottom Line that says the Terms "do not guarantee a delivery timeline". No page on joinem.co states a day count (evidence fact 15). Fix: `"Compounded GLP-1 from $49/month; not FDA-approved, free expedited delivery"` (or any wording without a day count).
2. **`src/data/products.json:154`** highlight `"Free 1-2 day shipping, no insurance required"` (same record, used on hub cards). Fix: `"Free expedited delivery, no insurance required"`.
3. **`src/lib/product-catalog.ts:74`** `shipping: "Free 1-2 day shipping"` renders on the "embody products & prices" card on this page. Fix: `"Free expedited delivery; no timeline guaranteed"`.
4. **`src/lib/product-catalog.ts:73`** `priceNote: "month-to-month; pre-Black Friday sale seen Oct 28, 2026"` renders on the same card, while the body (correctly) says which plan the $49 applies to is unconfirmed and the Terms list $49 only on the 12-month bundle. Fix: `"homepage price, Nov 16, 2026; Terms list $79 monthly, $49 on the 12-month bundle"`.

Recommendation: add these four lines to #629 before the operator merges (they are embody-only entries in shared files, so no other provider moves). If the operator prefers to keep the launch scope, merge #629 and ship the four lines the same day; until then the live page says both "shipped in 1-2 days" and "embody does not publish a delivery window". The remaining "1-2 days" / "full refund" / "LegitScript-certified" strings Sloane listed in the PR body (`price-index.ts`, `three-way.ts`, `chatbot.ts`, battle copy, articles) are not visible on this page and belong to the companion fix; `chatbot.ts:165-167` and `price-index.ts:47-50` are in this page's payload and will be spoken by the chatbot, so they should be first in that queue.

## Notes (non-blocking)

- **Duplicate heading.** The new section "Sources and methodology" (config-store.ts, last `sections` entry) renders two H2s above the template's own "Sources & methodology" block. Rename the new one, e.g. "Where these figures come from", to keep one sources heading per page. Sloane's call; not a rule.
- **"wellmedr" in source.** `finalVerdict` and the alternatives list write "embody vs wellmedr"; the sitewide rebrand transform (config-store.ts:4190) renders it as "welludr", so the page is consistent, but write "welludr" in new copy.
- **Alternatives pointers** ("altRx adds a brand-name shelf and Buy Now, Pay Later", "welludr's lowest rate needs a 12-month plan and includes a coach", "Ro fills from its own pharmacy") are not in the evidence file. They match the repo records (`config-store.ts` altRx record, `three-way.ts:37-41`, `embody-vs-ro-weight-loss.ts:115-134`) and were not re-read today. Acceptable as pointers; each target page carries its own dated figures.
- **Praise-table detail** ("called back when a video link failed", "a portal reset") is drawn from the stored reviews (`embody.ts:316, 492, 516, 631`), not from the evidence file's counts. Supported; no names on the page.
- **Medical review date.** Byline stays "Medically reviewed by Francheska Capistrano, RMT, MPH · Oct 30, 2026" (reviewers.ts untouched, correct per house rule 3). The page body is substantially new; the operator may want the reviewer to look at the complaints, refund and dose sections and log a new date when that happens. Do not backfill.
- **Audit block label** "Checked September 2026" is the sitewide `PROVIDER_DATA_CHECKED` constant while the rows now carry Nov 16, 2026 dates. Template issue, not this PR.
- **Article schema (template, pre-existing, mine to fix):** `headline` is the template string "embody Review 2026: Cost, Results & Is It Worth It?" (review-page.tsx:776), not the page title; `image` is `og-default.png`; no `datePublished` (one of the 60 the audit warns about). None introduced by #629. Felix follow-up on the review template.
- **Provider fairness (house rule 4):** complaints are counted with n and window, positives are counted alongside, no names, no quotes attributed. "Three of the six themes are the policy working as written" reads as analysis, not editorialising, because each clause is a quoted policy line. The one quoted fragment "only 2 days" with the cold packs frozen is a delivery data point, not a testimonial.
- Diff hygiene: three source files plus the brief status line; no scratch files; no images added.

## Verified sources (count opened / count matching)

Evidence file facts cited in the diff: 28 traced / 28 match (facts 1-5, 7-22, 24-26, 28; Trustpilot 3.8 / 10,689 kept with its Oct 25, 2026 date; LegitScript and dose stated as unverified, as the file requires). Arithmetic: 12-month totals $948/$1,548, $912/$1,512, $876/$1,476, $588/$1,188; sale gap $30 = 38% / 23%; taxonomy 8/6/6/2/2/1 of 10; praise 43/19/9/8 of 96; Oct 25 page 42/2/2/2/7 = 9/55 = 16%; all match section "Numbers for tables". External hosts were not re-fetched by me today (joinem.co, FDA); Atlas's verbatim copies are the record for this review and the FDA Q&A link is already verified in the repo.

House rules: "not FDA-approved" at every price and in the plan cards; no testimonials (the two quoted customers in the old intro are gone); no Trustpilot widget (slug not in `TRUSTPILOT_WIDGET_ARTICLE_SLUGS`, no widget markup in the HTML); author Organization "The Treatments Hub Research Team"; reviewer name exact; "as of"/read dates on every figure; "Nothing on this page is medical advice" plus the dose paragraph's own disclaimer; no model identifiers; trial time points not touched; tirzepatide named "dual GIP/GLP-1".

"1-2 days" removed from title, description and every string in the diff: confirmed (title 57 chars, description 157, both without a day count). Remaining occurrences on the rendered page come only from the four shared lines above.

Internal links in the new sections: 10 / 10 return 200 (`is-embody-legit`, `review-analysis/embody`, `embody-cost`, `cheapest-glp1`, `glp1-shipping-times`, `compounded-semaglutide-units-to-mg`, `altrx-vs-embody`, `embody-vs-wellmedr`, `embody-vs-ro`, `embody-alternatives`). CTA rel="sponsored nofollow" present.

SEO: one H1; no heading skips; FAQ H3s end with "?"; canonical absolute; JSON-LD parses (Organization, WebSite, Article with image + dateModified 2026-11-16 + author Organization + reviewedBy Person, BreadcrumbList, FAQPage with 10 questions, ItemList).

## Screenshots checked (paths)

Session scratchpad `/tmp/claude-0/-home-user-top-weight-loss/4a32294e-162f-523e-a384-3c3ef37eaab2/scratchpad/shots/`: `desk-top.png`, `phone-top.png` (masthead; the "shipped in 1-2 days" tagline is visible under the H1 at both widths), `desk-price.png`, `phone-price.png` (Terms table scrolls horizontally on the phone, no page overflow: scrollWidth 390), `desk-complaints.png`, `phone-complaints.png`, `desk-praise.png`, `phone-praise.png`, `desk-refund.png`, `phone-refund.png`, `desk-audit.png`, `phone-audit.png` (What we verified block present), `desk-faq.png`, `phone-faq.png`.

## Audit: PASS (2 warnings, both pre-existing and sitewide)

`AUDIT_BASE=http://localhost:4201 node scripts/seo-audit.mjs` on the branch build: RESULT: PASS (0 fails, 2 warns, 479 pages). Warns: 35 sitemap URLs without reviewedBy; 60 Article schemas without datePublished. `npx tsc --noEmit -p .` clean; `npm run build` 0 errors.
