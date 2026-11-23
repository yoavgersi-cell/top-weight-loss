2026-11-23 · Author: Rio · Status: approved (operator, 2026-11-23, all seven) · Request: next week of daily Instagram content for @treatmentshub, Tue 2026-11-24 to Mon 2026-11-30, one feed post plus one story per day at 14:00 UTC; same format, tone and visual system as the approved batch (ops/social/2026-11-16-week-batch.md); informative, calm, not clickbait; spread across verticals (at most 3 weight-loss, at least one each from ED, TRT, HRT, hair loss and online therapy).

Weekdays verified with `date -d`: 2026-11-24 Tue, 25 Wed, 26 Thu, 27 Fri, 28 Sat, 29 Sun, 30 Mon.

Format: Instagram feed single image 1080x1350 JPEG (4:5) via Windsor.ai `instagram` / `create_image_post`; story 1080x1920 JPEG via `create_story`, published right after the feed post, image only, bottom line "More at treatmentshub.com". Nothing published or scheduled; no connector write action called. Render: `node scripts/social-card.mjs ops/social/2026-11-24-week-batch.cards.json` and again with `--story`. Public URL pattern: https://www.treatmentshub.com/social/<file> (must return 200 before publishing; the files are committed on branch claude/rio-week-batch-1124 and are public only after merge and deploy). Pages read live on 2026-11-23 (curl, 200 at the canonical URL).

Shared compliance: no Trustpilot anywhere · no testimonials · no before/after, no weight numbers · no provider named in any caption · no price figures, so no "as of" dates needed · emoji only on the link line · 5 hashtags, #TreatmentsHub first · captions under 700 characters except D5 (approved text, reused unchanged) · every source page that carries provider cards gets the line "We may earn a commission from provider links."

Topic check: none of last week's seven topics (review dates, About counts, tracker change log, six ranking factors, cost calculator, comparison table, 12-check list) is repeated, except D5, the skipped cost-calculator card reused as instructed. D2 draws on the price tracker's trend section, not the change-log method covered on 2026-11-19. None of the Nov 20-23 topics (free-trial auto-renewal, What is HRT, GLP-1 hormone or medicine, Ozempic vs Wegovy) is used. No page about TrimRx, Medvi, wellmedr/welludr billing or cancellation, or best-tirzepatide-online is used.

Vertical mix: HRT, weight loss (x2), online therapy, ED, hair loss, TRT.

---

## D1 · Tue 2026-11-24 · 14:00 UTC · HRT
Source page: https://www.treatmentshub.com/hrt/articles/hrt-black-box-warning-removed (Updated October 25, 2026; reviewed Oct 30, 2026)
Image: /home/user/top-weight-loss/public/social/2026-11-24-d1.jpg · pill "Label change"
Story: /home/user/top-weight-loss/public/social/2026-11-24-d1-story.jpg (1080x1920, same text, bottom line "More at treatmentshub.com")
Alt text: Text graphic from Treatments Hub: The warning moved. The medicines did not change. Same products, same contraindications. Only the wording on the label changed.
```
The warning moved. The medicines did not change.

HHS and the FDA announced on November 10, 2025 that the boxed warnings about cardiovascular disease, breast cancer and probable dementia would be removed from menopausal hormone therapy products. They moved into the Warnings and Precautions section; the Contraindications section is unchanged.

It approves no new drug and leaves compounded hormones exactly as unapproved as they were: not FDA-approved. Not medical advice; ask a licensed clinician.

See the HRT Black Box Warning Removed page. We may earn a commission from provider links.

🔗 treatmentshub.com

#TreatmentsHub #HormoneTherapy #MenopauseHealth #CompareSmart #HealthAndWellness
```
Hashtags: #TreatmentsHub #HormoneTherapy #MenopauseHealth #CompareSmart #HealthAndWellness
Fact trace (all verbatim on the page): "the US Department of Health and Human Services and the FDA announced that the 'black box' warnings about cardiovascular disease, breast cancer and probable dementia would be removed from menopausal hormone therapy products" (short answer, dated November 10, 2025) / "They moved out of the box and into the Warnings and Precautions section ... The Contraindications section is unchanged." / "It approves no new drug, changes no dose or ingredient, lifts no contraindication, and leaves compounded hormones exactly as unapproved as they were." / card: "Same products. Only the wording on the label changed." and "Same contraindications." / "This article is general information, not medical advice."
Compliance: facts traced ✓ · compounded = "not FDA-approved" ✓ · no testimonials/Trustpilot ✓ · disclosure ✓ (page carries provider cards) · not-medical-advice line ✓ · no dosing or "is HRT safe" claim ✓

## D2 · Wed 2026-11-25 · 14:00 UTC · Weight loss (1 of 2)
Source page: https://www.treatmentshub.com/weight-loss/glp1-price-changes (Last updated Nov 20, 2026; reviewed Oct 30, 2026), section "Price history by provider" (trend charts)
Image: /home/user/top-weight-loss/public/social/2026-11-25-d2.jpg · pill "Price history"
Story: /home/user/top-weight-loss/public/social/2026-11-25-d2-story.jpg (1080x1920, same text, bottom line "More at treatmentshub.com")
Alt text: Text graphic from Treatments Hub: A low headline price often has a condition attached. The tracker shows each listed price over time. Check the condition next to it, and quote the date.
```
A low headline price often has a condition attached.

Low headline prices are often tied to a promotion or a plan length, so check the condition next to each price. Our GLP-1 Price Tracker records each monthly price, oldest to newest, as a trend: prices hold until the next logged change.

If you quote a figure, give the date. Prices change, so the date matters. Tracked prices are for compounded medicines, which are not FDA-approved. Not medical advice.

See the GLP-1 Price Tracker page. We may earn a commission from provider links.

🔗 treatmentshub.com

#TreatmentsHub #PriceTransparency #PriceTracker #CompareProviders #HealthAndWellness
```
Hashtags: #TreatmentsHub #PriceTransparency #PriceTracker #CompareProviders #HealthAndWellness
Fact trace: "Low headline prices are often tied to a promotion or a plan length, so check the condition next to each price." (FAQ) / "Each listed monthly price we have recorded, oldest to newest" and "Shown as a trend; prices hold until the next logged change" (Price history by provider) / "If you quote these figures, please link to this page and give the date ... Prices change, so the date matters." (Use this data) / "Compounded medicines are not FDA-approved." (change log) / "Not medical advice." (How this tracker works) — verbatim. No price, provider name or change count quoted (the page's counts and sale prices move daily).
Compliance: facts traced ✓ · compounded = "not FDA-approved" ✓ · no price figures ✓ · no testimonials/Trustpilot ✓ · disclosure ✓ (page states "We may earn a commission from links on this page") · not-medical-advice line ✓
Note for the operator: the page's tables and chart currently feature providers on the do-not-use list (welludr, TrimRx, Medvi). Nothing from them is quoted here, but the story and feed text point to a page that shows them. Say if you would rather swap D2 for a spare vertical card.

## D3 · Thu 2026-11-26 · 14:00 UTC · Online therapy
Source page: https://www.treatmentshub.com/online-therapy/articles/therapy-vs-psychiatry (Updated September 8, 2026; reviewed Oct 30, 2026)
Image: /home/user/top-weight-loss/public/social/2026-11-26-d3.jpg · pill "Good to know"
Story: /home/user/top-weight-loss/public/social/2026-11-26-d3-story.jpg (1080x1920, same text, bottom line "More at treatmentshub.com")
Alt text: Text graphic from Treatments Hub: A therapist provides talk therapy. A psychiatrist can prescribe. Many people benefit from talk therapy alone, some from medication, and many from both together.
```
A therapist provides talk therapy; a psychiatrist is a medical doctor who can diagnose and prescribe medication.

Many people benefit from talk therapy alone, some from medication, and many from both together. Online platforms differ, with some offering therapy only, some psychiatry and some both.

Not medical advice. If you are in crisis or thinking about harming yourself, call or text 988 in the US, or contact emergency services, right away.

See the Therapist vs Psychiatrist page. We may earn a commission from provider links.

🔗 treatmentshub.com

#TreatmentsHub #OnlineTherapy #MentalHealth #Telehealth #HealthAndWellness
```
Hashtags: #TreatmentsHub #OnlineTherapy #MentalHealth #Telehealth #HealthAndWellness
Fact trace: "A therapist provides talk therapy; a psychiatrist is a medical doctor who can diagnose and prescribe medication." / "many people benefit from talk therapy alone, some from medication, and many from both together" / "Online platforms differ, with some offering therapy only, some psychiatry and some both." / "if you are in crisis or thinking about harming yourself, contact emergency services or a crisis line (in the US, call or text 988) right away" / "This article is general information, not medical advice." — verbatim (short answer, "How do you know which one you need?", closing line).
Compliance: facts traced ✓ · compounded n/a ✓ · no testimonials/Trustpilot ✓ · disclosure ✓ (page carries provider cards) · not-medical-advice line ✓ · crisis line included ✓ · Thanksgiving: calm, informational, no seasonal hook

## D4 · Fri 2026-11-27 · 14:00 UTC · ED
Source page: https://www.treatmentshub.com/ed/articles/ed-pills-and-blood-pressure-medication (Updated October 21, 2026; reviewed Oct 30, 2026)
Image: /home/user/top-weight-loss/public/social/2026-11-27-d4.jpg · pill "Before you start"
Story: /home/user/top-weight-loss/public/social/2026-11-27-d4-story.jpg (1080x1920, same text, bottom line "More at treatmentshub.com")
Alt text: Text graphic from Treatments Hub: A clinician cannot screen for what is not written down. List everything: prescription drugs, over-the-counter products, supplements and anything recreational.
```
A clinician cannot screen for what is not written down.

Every licensed online clinic asks for a medication list. List everything: prescription drugs, the as-needed nitroglycerin you keep in a drawer, over-the-counter products, supplements and anything recreational.

Our guide sets out the label rules for blood pressure medication, drug by drug. Not medical advice. Do not start, stop or change any medication without a licensed clinician who knows your full health history.

See the ED Pills and Blood Pressure Medication page. We may earn a commission from provider links.

🔗 treatmentshub.com

#TreatmentsHub #EDTreatment #MensHealth #Telehealth #HealthAndWellness
```
Hashtags: #TreatmentsHub #EDTreatment #MensHealth #Telehealth #HealthAndWellness
Fact trace: "Every licensed online clinic asks for a medication list" / "Bring your full medication list to the intake." / "List everything: prescription drugs, the as-needed nitroglycerin you keep in a drawer, over-the-counter products, supplements and anything recreational. The clinician cannot screen for what is not written down." / "The label rules, drug by drug." (subtitle) / "Do not start, stop or change any medication without a licensed clinician who knows your full health history." — verbatim. No drug-interaction rule is restated in the caption.
Compliance: facts traced ✓ · compounded n/a (no compounded product named) ✓ · no testimonials/Trustpilot ✓ · disclosure ✓ (page carries provider cards) · not-medical-advice line ✓ · no dosing guidance ✓
Note for the operator: every ED page shows a "Quad by MEDVi" price strip in the header and this page has a MEDVi top-pick card. Neither is quoted; flagging in case you want an ED page without it (none exists in the sitemap).

## D5 · Sat 2026-11-28 · 14:00 UTC · Weight loss (2 of 2) · reused card, caption unchanged
Source page: https://www.treatmentshub.com/weight-loss/glp1-cost-calculator (Last updated Oct 27, 2026; reviewed Oct 30, 2026)
Image: /home/user/top-weight-loss/public/social/2026-11-21-d5.jpg (already live; re-rendering from the JSON is byte-identical, no new file) · pill "Tool"
Story: /home/user/top-weight-loss/public/social/2026-11-21-d5-story.jpg (already live, unchanged)
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
Fact trace: unchanged from the approved batch (2026-11-16-week-batch.md, D5). Re-checked on the live page 2026-11-23: "it does not estimate, average or add anything", "Over 1 to 24 Months", "Compounded products are not FDA-approved" and "It is not medical advice" are all still present.
Compliance: facts traced ✓ · compounded = "not FDA-approved" ✓ · no price figures ✓ · no testimonials/Trustpilot ✓ · disclosure n/a (no provider named, as approved) ✓ · not-medical-advice line ✓
Note for the operator: the calculator page now also lists providers on the do-not-use list in its table; the caption names none and is the approved text.

## D6 · Sun 2026-11-29 · 14:00 UTC · Hair loss
Source page: https://www.treatmentshub.com/hair-loss/articles/norwood-scale (Updated September 8, 2026; reviewed Oct 30, 2026)
Image: /home/user/top-weight-loss/public/social/2026-11-29-d6.jpg · pill "Hair loss basics"
Story: /home/user/top-weight-loss/public/social/2026-11-29-d6-story.jpg (1080x1920, same text, bottom line "More at treatmentshub.com")
Alt text: Text graphic from Treatments Hub: The Norwood scale is a 7-stage map of male pattern hair loss. It usually moves along two fronts: a receding hairline at the temples and thinning at the crown, which eventually meet.
```
The Norwood scale is the standard 7-stage map clinicians use to describe how far male pattern baldness has progressed.

It usually moves along two fronts: a receding hairline, especially at the temples, and thinning at the crown, which eventually meet. Your stage guides what treatment is realistic.

Not medical advice. Do not start, stop or change any treatment because of something you read here.

See the Norwood Scale page. We may earn a commission from provider links.

🔗 treatmentshub.com

#TreatmentsHub #HairLoss #MalePatternBaldness #HairHealth #HealthAndWellness
```
Hashtags: #TreatmentsHub #HairLoss #MalePatternBaldness #HairHealth #HealthAndWellness
Fact trace: "The Norwood scale is the standard 7-stage map clinicians use to describe how far male pattern baldness has progressed" / "usually along two fronts: a receding hairline at the temples and thinning at the crown, which eventually meet" (key takeaway: "a receding hairline (especially at the temples) and thinning at the crown, which eventually meet") / "Your stage guides what treatment is realistic." / "Do not start, stop or change any treatment because of something you read here" (medical disclaimer) — verbatim.
Compliance: facts traced ✓ · compounded n/a ✓ · no testimonials/Trustpilot ✓ · disclosure ✓ (page carries provider cards) · not-medical-advice line ✓ · no before/after, no outcome promise ✓

## D7 · Mon 2026-11-30 · 14:00 UTC · TRT
Source page: https://www.treatmentshub.com/trt/articles/trt-blood-work (Updated September 8, 2026; reviewed Oct 30, 2026)
Image: /home/user/top-weight-loss/public/social/2026-11-30-d7.jpg · pill "Monitoring"
Story: /home/user/top-weight-loss/public/social/2026-11-30-d7-story.jpg (1080x1920, same text, bottom line "More at treatmentshub.com")
Alt text: Text graphic from Treatments Hub: TRT is a monitored treatment. Baseline labs confirm the diagnosis, and follow-up labs keep it safe and dialed in.
```
TRT is a monitored treatment: baseline labs confirm the diagnosis, and follow-up labs keep it safe and dialed in.

Beyond testosterone itself, providers typically watch red blood cells (hematocrit), estradiol, PSA and other markers depending on your profile. The exact panel and schedule are individual and set by your clinician; this is the map, not a prescription.

Not medical advice.

See the TRT Blood Work page. We may earn a commission from provider links.

🔗 treatmentshub.com

#TreatmentsHub #TRT #MensHealth #Telehealth #HealthAndWellness
```
Hashtags: #TreatmentsHub #TRT #MensHealth #Telehealth #HealthAndWellness
Fact trace: "TRT is a monitored treatment: baseline labs confirm the diagnosis, and follow-up labs keep it safe and dialed in." / "Beyond testosterone itself, providers typically watch red blood cells (hematocrit), estradiol, PSA and other markers depending on your profile." / "The exact panel and schedule are individual and set by your clinician; this is the map, not a prescription." / "This article is general information, not medical advice." — verbatim.
Compliance: facts traced ✓ · compounded n/a ✓ · no testimonials/Trustpilot ✓ · disclosure ✓ (page carries provider cards) · not-medical-advice line ✓ · no dosing, no price ✓

---

## After publishing (fill per day)
D1 (Tue 11-24) media id / time / link: — · story id: —
D2 (Wed 11-25): — · D3 (Thu 11-26): — · D4 (Fri 11-27): — · D5 (Sat 11-28): — · D6 (Sun 11-29): — · D7 (Mon 11-30): —

## Notes
- Live site: pages read with curl (200 at the canonical URL, no redirect); text extracted from the live HTML. Every quoted phrase was string-matched against the extracted page text; all matched.
- Rendering: headlines measured with the installed Inter font; the script fails rather than overflow. Viewed and clean: feed d2, d3, d6; stories d3, d6. D3's headline renders at 80 px (others 82 px), the script's own step-down.
- D5 reuses the live files 2026-11-21-d5.jpg and -story.jpg, so the batch has no 2026-11-28 image files.
- Not done, by instruction: no publishing, no scheduling, no PR.
