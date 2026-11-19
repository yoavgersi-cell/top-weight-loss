# QA: fda-safety-box  ·  2026-11-19 · Reviewer: Felix · PR: #653 (claude/sloane-fda-safety-box)
Verdict: block

One factual mismatch (comparator group), one clipped qualifier. Both in `src/components/fda-safety-update.tsx`. Everything else verified.

## Blockers
1. **L33 "versus 3.8 on placebo"**. FDA DSC (read Nov 19, 2026): "3.8 NAION cases per 100,000 PY for patients treated with a placebo or a non-GLP-1 RA glucose-lowering medication" (comparator-treated, 56,036 patients). Fix: "versus 3.8 in comparator-treated patients (placebo or a non-GLP-1 RA glucose-lowering medication)". Also change "patient-years" to "person-years", the FDA's unit.
2. **L36-37 "it tells prescribers to consider discontinuing the medication in anyone who develops NAION"**. FDA text ends "unless the benefits of treatment clearly outweigh the risk". Clipped, it reads as a stop instruction. Fix: append "unless the benefits of treatment clearly outweigh the risk".

## Confirmed
- 126 trials, 134,253 patients, 6.4 per 100,000 PY, DSC dated November 9, 2026: match source and research file.
- Wording: the patient line is "contact your health care professional right away" for sudden, painless vision loss in one eye. That is the FDA's own sentence and correct per house rules; the box never tells readers to stop. (The FDA also says anyone who has had NAION should "talk with their health care professional about whether to continue... or to stop"; not in the box, fine.)
- "Not FDA-approved" line for compounded semaglutide and tirzepatide: present.
- "Wegovy (revised 6/2026) and Zepbound (revised 8/2026) labels did not yet show the new warning": research only read 100k characters; I read both full DailyMed SPLs today (Wegovy v19, effective 2026-06-18; Zepbound v40, effective 2026-08-28; zero "NAION" or "optic neuropathy"), so it is true as of Nov 19. The box dates it "Nov 16".
- FDA link returns 200 and is the DSC page.
- Placement: exactly one `aside` on each of glp1-provider-comparison, semaglutide, tirzepatide, reviews/embody, healthrx, directmeds; none on other reviews or the tracker. No overflow at 390 or 1440 (scrollWidth equals clientWidth on all six; box 16px to 374px).

## Notes (non-blocking)
- The "labels did not yet show the warning" sentence goes stale when Lilly or Novo update DailyMed. Needs an owner and a re-check date, or drop it once labels carry NAION.
- Dense single paragraph on phone (about 14 lines); consider splitting at "For sudden...". Style only.

## Verified sources (opened / matching)
FDA DSC (full text), DailyMed Wegovy and Zepbound SPL XML: 3 opened / 2 match, 1 mismatch (comparator, blocker 1).

## Screenshots checked
Scratchpad: b653-semaglutide-phone.png, b653-semaglutide-desk.png, b653-reviews-embody-*.png, b653-glp1-provider-comparison-*.png.

## Audit: PASS (0 fails, 2 pre-existing warns, 470 pages). tsc clean, build 0 errors.
