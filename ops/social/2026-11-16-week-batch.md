2026-11-16 · Author: Rio · Status: draft · Request: one week of daily Instagram single-image posts for @treatmentshub, Mon 2026-11-17 to Sun 2026-11-23, 14:00 UTC each, same format as the approved first post (ops/social/2026-11-15-first-post.md); seven different live pages, one checkable brand/method statement each; informative, calm, not clickbait.

Format for all seven: Instagram feed, single image, 1080x1350 JPEG (4:5), account @treatmentshub, connector Windsor.ai `instagram` / `create_image_post`. Nothing published or scheduled; no connector write action called. Images rendered with `scripts/social-card.mjs` from `ops/social/2026-11-16-week-batch.cards.json` (one command re-renders the week). Public URL pattern once deployed: https://www.treatmentshub.com/social/<file> (must return 200 before publishing; files are in the working tree only, not committed). Pages read live on 2026-11-16 (curl, 200 at the canonical URL).

Shared compliance for the week: no Trustpilot anywhere in captions or images (several source pages discuss it; none carried over) · no testimonials · no before/after, no weight numbers · no provider named in any caption · no price figures quoted, so no "as of" dates needed · emoji only on the link line · 5 hashtags, #TreatmentsHub first · every caption under 700 characters.

---

## D1 · Mon 2026-11-17 · 14:00 UTC
Source page: https://www.treatmentshub.com/medical-review-policy (Last updated October 22, 2026)
Image: /home/user/top-weight-loss/public/social/2026-11-17-d1.jpg · pill "Our policy"
Alt text: Text graphic from Treatments Hub: A review date is the day it happened. Never earlier. Pages that have not been reviewed show the reviewer as staff with no date. We do not backfill dates.
```
A review date is the day the review happened. Never earlier.

Every content page on Treatments Hub carries a review bar under its title. "Reviewed for medical accuracy by" with a date means the named reviewer went through that page on that date. "Medical reviewer" with no date means the page has not been reviewed yet, or its medical content was rewritten since.

We do not backfill dates. The reviewer checks medical statements only and has no say over which providers appear, how they rank or what they cost.

Our full policy is on the Medical Review Policy page.

🔗 treatmentshub.com

#TreatmentsHub #MedicalReview #HealthContent #CompareSmart #HealthAndWellness
```
Hashtags: #TreatmentsHub #MedicalReview #HealthContent #CompareSmart #HealthAndWellness
Fact trace: "The date is the day the review happened, never earlier." / "Pages that have not been reviewed show the reviewer as staff with no date." / "We do not backfill dates." / review-bar two states / "The reviewer has no say over which providers appear, how they rank or what they cost." — all verbatim on the page (steps 4, "How to read the review bar", "Corrections are made before sign-off").
Compliance: facts traced ✓ · compounded wording n/a ✓ · no testimonials/Trustpilot ✓ · disclosure n/a (no provider named) ✓ · no medical advice ✓

## D2 · Tue 2026-11-18 · 14:00 UTC
Source page: https://www.treatmentshub.com/weight-loss/about (no "last updated" line on the page; counts are computed at render time)
Image: /home/user/top-weight-loss/public/social/2026-11-18-d2.jpg · pill "How we work"
Alt text: Text graphic from Treatments Hub: If we cannot check it, it is not on the site. The counts on our About page are computed from the live site each time it renders, so they cannot drift.
```
If we cannot check it, it does not appear on the site.

That includes the numbers we publish about ourselves. The counts on our About page, such as providers ranked, in-depth reviews, head-to-head comparisons and guides, are computed from the live site each time the page renders, so they cannot drift from what is actually published.

Treatments Hub was founded in 2026 to publish the number the provider itself publishes, with the condition that goes with it, and to say plainly when something cannot be verified.

More on the About page.

🔗 treatmentshub.com

#TreatmentsHub #HowWeWork #CompareProviders #CompareSmart #HealthAndWellness
```
Hashtags: #TreatmentsHub #HowWeWork #CompareProviders #CompareSmart #HealthAndWellness
Fact trace: "If we cannot check it, it does not appear on the site." and "founded in 2026 to publish the number the provider itself publishes, with the condition that goes with it ... and say plainly when something cannot be verified" (Why this site exists) / "Counts are computed from the live site at render time, so they cannot drift from what is actually published." with stat labels "providers ranked", "in-depth reviews", "head-to-head comparisons", "guides and articles" (Live numbers) — verbatim; no count values quoted.
Compliance: facts traced ✓ · compounded wording n/a ✓ · no testimonials/Trustpilot ✓ (page's Trustpilot counts not carried over) · disclosure n/a ✓ · no medical advice ✓

## D3 · Wed 2026-11-19 · 14:00 UTC
Source page: https://www.treatmentshub.com/weight-loss/glp1-price-changes (Last updated Nov 11, 2026)
Image: /home/user/top-weight-loss/public/social/2026-11-19-d3.jpg · pill "Price tracking"
Alt text: Text graphic from Treatments Hub: A price change is logged only after it is verified. One entry per change: what the listing said before, what it says now, the date and the source.
```
A price change is logged only after it is verified.

Our GLP-1 Price Tracker keeps one entry per verified change. Each entry records what our listing said before and after, the date, and the source: the provider's own site or a pricing notice the provider sent us. A promotion being extended is logged as a terms change even when the number does not move.

The index, every page built from it, the RSS feed and the CSV files all update in the same step. If you quote a figure from the tracker, give the date. Prices change.

The log is on the GLP-1 Price Tracker page.

🔗 treatmentshub.com

#TreatmentsHub #PriceTransparency #PriceTracker #CompareProviders #HealthAndWellness
```
Hashtags: #TreatmentsHub #PriceTransparency #PriceTracker #CompareProviders #HealthAndWellness
Fact trace: "A change is logged only after it is verified." (intro) / "One entry per verified change. A change is logged only after we have read the new figure on the provider's own site or received it in the provider's pricing notice. The entry records what our listing said before and after; the index, every page built from it, the feed and the CSV files update in the same step." / "A promotion being extended is logged as a terms change even when the number does not move." / "please link to this page and give the date ... Prices change, so the date matters." (How this tracker works, Use this data) — verbatim.
Compliance: facts traced ✓ · compounded wording: no medicine or product named in the caption (page name only), n/a ✓ · no price figures ✓ · no testimonials/Trustpilot ✓ · disclosure n/a ✓ · no medical advice ✓

## D4 · Thu 2026-11-20 · 14:00 UTC
Source page: https://www.treatmentshub.com/weight-loss/how-we-rank (Last updated Sep 1, 2026; reviewed Oct 30, 2026) — section "The 6 factors we score", a different section from the 2026-11-15 post
Image: /home/user/top-weight-loss/public/social/2026-11-20-d4.jpg · pill "How we rank"
Alt text: Text graphic from Treatments Hub: Six weighted factors. The same rubric for every provider. Medical credibility carries the most weight at 25%. Pricing and value is 20%. No invented ratings, ever.
```
Six weighted factors. The same rubric for every provider.

Every weight-loss provider on Treatments Hub is rated on a weighted evaluation across six categories: medical credibility (25%), medication access (20%), pricing and value (20%), patient experience (15%), clinical support (10%) and flexibility (10%). The result is a score on a 10-point scale with a plain-English label.

Partnerships can affect how providers are displayed, but never scores, review content or head-to-head winners. No invented ratings, ever.

Our full method is on the How We Rank page.

🔗 treatmentshub.com

#TreatmentsHub #HowWeRank #CompareProviders #CompareSmart #HealthAndWellness
```
Hashtags: #TreatmentsHub #HowWeRank #CompareProviders #CompareSmart #HealthAndWellness
Fact trace: "We rate every provider on a weighted evaluation across six core categories" with 25/20/20/15/10/10 (The 6 factors we score) / "Each provider earns an overall score on a 10-point scale, translated into a plain-English label" (How scoring works) / "Partnerships can affect how providers are displayed, but never scores, review content, or head-to-head winners." (Methodology FAQs) / "No invented ratings, ever." (Review-integrity rules) — verbatim; percentages are weights, not prices.
Compliance: facts traced ✓ · compounded wording n/a ✓ · no testimonials/Trustpilot ✓ (page's Trustpilot material not carried over) · disclosure: no provider named; page-level affiliate statement is the fact quoted ✓ · no medical advice ✓

## D5 · Fri 2026-11-21 · 14:00 UTC
Source page: https://www.treatmentshub.com/weight-loss/glp1-cost-calculator (Last updated Oct 27, 2026; reviewed Oct 30, 2026)
Image: /home/user/top-weight-loss/public/social/2026-11-21-d5.jpg · pill "Tool"
Alt text: Text graphic from Treatments Hub: Published price, times the months you choose. The cost calculator does not estimate, average or add anything. Regular prices sit in their own column.
```
A published price, multiplied by the months you choose. Nothing else.

Our GLP-1 Cost Calculator takes each provider's own published monthly price from our verified, dated index and multiplies it by the months you pick, from 1 to 24. It does not estimate, average or add anything.

Where a provider publishes a regular price next to a promotion, that price gets its own column, because we do not know how long a promotion lasts. The prices are for compounded medicines, which are not FDA-approved. Not medical advice.

The tool is on the GLP-1 Cost Calculator page.

🔗 treatmentshub.com

#TreatmentsHub #CostCalculator #PriceTransparency #CompareProviders #HealthAndWellness
```
Hashtags: #TreatmentsHub #CostCalculator #PriceTransparency #CompareProviders #HealthAndWellness
Fact trace: "Every row is a provider's own published monthly price ... recorded in our verified price index on the date shown ... The calculator multiplies that figure by the number of months you choose; it does not estimate, average or add anything." (FAQ) / title "Over 1 to 24 Months" / "We do not know how long any promotion lasts, so the calculator shows the same period at the regular price as a second column rather than guessing" (FAQ) / "Compounded products are not FDA-approved" (table note) / "It is not medical advice" (disclaimer) — verbatim; no price values quoted.
Compliance: facts traced ✓ · compounded = "not FDA-approved" ✓ · no price figures ✓ · no testimonials/Trustpilot ✓ · disclosure n/a (no provider named) ✓ · not-medical-advice line ✓

## D6 · Sat 2026-11-22 · 14:00 UTC
Source page: https://www.treatmentshub.com/weight-loss/glp1-provider-comparison (Last updated Oct 17, 2026; reviewed Oct 30, 2026)
Image: /home/user/top-weight-loss/public/social/2026-11-22-d6.jpg · pill "Reading a comparison"
Alt text: Text graphic from Treatments Hub: Read the table as a map, not a verdict. Six variables move the real cost. Our comparison page lists all six, dated and linked. No scores, no ranking.
```
Read the table as a map, not a verdict.

Eight provider homepages show eight headline prices; almost none is what you pay in month two. Our GLP-1 provider comparison tracks the six variables that move the real cost: advertised versus ongoing price, medication versus membership, clinical contact, pharmacy, billing cadence and refund terms.

Everything is dated and linked; where we could not verify something, we say so. No scores, no ranking. The providers there are partners; we may earn a commission from provider links.

The full table is on the GLP-1 Provider Comparison page.

🔗 treatmentshub.com

#TreatmentsHub #CompareProviders #ReadTheFinePrint #CompareSmart #HealthAndWellness
```
Hashtags: #TreatmentsHub #CompareProviders #ReadTheFinePrint #CompareSmart #HealthAndWellness
Fact trace: "Open eight provider homepages and you will see eight headline prices. Almost none of them is the number you will pay in month two." / "Six variables move the real cost and the real experience:" with the six listed / "Everything is dated, everything is linked, and where we could not verify something we say so." / "No scores, no ranking." / "Read the table as a map, not a verdict." / "All eight providers on this page are commercial partners" — verbatim.
Compliance: facts traced ✓ · compounded wording: no compounded product named in the caption, n/a ✓ · no price figures ✓ · no testimonials/Trustpilot ✓ (page's Trustpilot column not carried over) · disclosure line included (partner page) ✓ · no medical advice ✓

## D7 · Sun 2026-11-23 · 14:00 UTC
Source page: https://www.treatmentshub.com/weight-loss/how-to-choose-a-glp1-provider (Last updated Sep 24, 2026; reviewed Oct 30, 2026)
Image: /home/user/top-weight-loss/public/social/2026-11-23-d7.jpg · pill "Checklist"
Alt text: Text graphic from Treatments Hub: Three things to verify before you pay any provider. Who reviews and approves your treatment. Which pharmacy fills it. What you will actually pay after the intro price.
```
Three things to verify before you pay any provider.

Who reviews and approves your treatment: a licensed clinician who is allowed to decline you. Which pharmacy fills the medication: named and US-licensed. What you will actually pay, after the introductory price and as your dose goes up.

Our guide turns those into 12 checks you can run yourself, each with how to verify it. A red flag is a prompt for due diligence, not a verdict. Compounded medicines are not FDA-approved. Not medical advice; ask a licensed clinician.

The checklist is on the How to Choose a GLP-1 Provider page.

🔗 treatmentshub.com

#TreatmentsHub #ChooseAProvider #Telehealth #CompareSmart #HealthAndWellness
```
Hashtags: #TreatmentsHub #ChooseAProvider #Telehealth #CompareSmart #HealthAndWellness
Fact trace: "Before you pay any GLP-1 telehealth provider, verify three things:" followed by the three items (The short answer) / "The 12 things to check ... Each check names what to look at, how to verify it yourself in a few minutes, and what is worth investigating or asking about before you pay. A red flag is a prompt for due diligence, not a verdict." / check 12: "Compounded drugs are not FDA-approved products." — verbatim; no provider, price or Trustpilot figure carried over.
Compliance: facts traced ✓ · compounded = "not FDA-approved" ✓ · no testimonials/Trustpilot ✓ · disclosure n/a (no provider named) ✓ · not-medical-advice line ✓ · no dosing guidance (dose mentioned only as a price condition) ✓

---

## After publishing (fill per day)
D1 media id / time / link: —
D2: — · D3: — · D4: — · D5: — · D6: — · D7: —

## Notes
- Live site: WebFetch could not resolve www.treatmentshub.com in this session; curl through the proxy returned 200 for every page, so the facts above were taken from the live HTML (saved in the session scratchpad), not from source files.
- Rendering: `node scripts/social-card.mjs ops/social/2026-11-16-week-batch.cards.json` re-renders all seven; headlines are measured with the installed Inter font and the script fails rather than overflowing past 3 lines. d1 and d7 (the two tightest layouts) were viewed and are clean.
- Not done, by instruction: no publishing, no scheduling, no commit, no push. The JPEGs are untracked in `public/social/` and will not be publicly reachable until committed and deployed.
