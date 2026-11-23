# Reddit user questions v2: what people ask, by vertical (live thread access)
Date: 2026-11-22 · Author: Atlas · Status: draft · Request: redo of 2026-11-22-reddit-questions.md with real thread access

## 1. Method, calls, limits
- Route: gpt-5-mini (reasoning low) with web_search restricted to reddit.com, via the operator-approved proxy. **Calls used: 80 of 80** (72 planned prompts, 6 verticals x 12; the 8 spare calls re-ran weight-loss prompts 2, 3, 5, 6, 8, 10, 11, 12 because the first run returned no citations). No call failed; 7 returned nothing usable (ED_support, RexMD, TRT cancel, Alloy/Evernow, HRT cancel, Happy Head/Keeps, stop-meds): those are real "no threads found" results, not retried (cap). Raw responses: reddit/raw/call-NN.json (req-NN.json = request); prompts in reddit/prompts and reddit/prompts2; scripts call.sh, extract.py, build.py, spec.py, final.py. Prompts contained only the generic topic.
- **Evidence rule applied:** a thread counts only if its reddit.com permalink is in a `url_citation` annotation of the response (titles also come from the annotation, not the prose). Result: **488 unique annotated threads in 90 subreddits** (WL 99, hair 85, TRT 82, HRT 82, ED 78, therapy 66, retrieved per vertical, some overlap). The first 12 calls (weight loss) ran before I added a "cite every thread inline" instruction: only calls 1 and 9 were annotated; the 8 reruns fixed the main gaps. **Leads, not evidence:** 57 thread URLs typed in prose but never annotated (calls 2-8, 10-12 originals) and 9 pages logged as opened but not annotated.
- Permalink shorthand `r/<sub>/<id>` = `https://www.reddit.com/r/<sub>/comments/<id>/` (well-formed; resolves on reddit.com).
- **Limits.** (a) Counts = annotated threads returned by theme-targeted searches, NOT Reddit-wide frequency. Do not quote them as "N users asked". (b) "In window" = my heuristic: 7-character thread ID >= 1s00000, roughly May 2026 onward. Calibrated only against a few model-stated ages that disagreed with each other, so approximate. Of 488 threads, 326 pass it; many hits are older. (c) Months and comment counts: not in annotations; the model's prose values are secondary and often "not shown", so none are reported. (d) The model is a retrieval layer: it can miss threads and its themes are mine, grouped from titles. I did not read thread bodies. (e) No usernames, no quotes, no outcomes are used; Reddit shows what people ask, never proof a provider or drug works. (f) Coverage was judged from slugs and H2 headings plus keyword counts in src/data and src/lib/seeds, and the six live sitemaps (curl 2026-11-22: WL 183, ED 53, TRT 87, HRT 43, hair 71, therapy 34 URLs). "Answered" means a page and heading exist, not that the answer is good.
- Correction to my earlier file: it listed `glp1-shipping-times` and `glp1-provider-support` as existing; neither is in the sitemap or repo.
- Our URLs below are paths on https://www.treatmentshub.com.

## 2. Recurring questions per vertical
Columns: question (my paraphrase of titles) | theme | evidence: annotated threads (in window) + up to 3 permalinks | our coverage | proposed format.

### Weight loss / GLP-1 (plan calls 1-12; reruns 73-80)
| Question | Theme | Evidence | Our coverage | Format |
|---|---|---|---|---|
| Am I overpaying for compounded tirzepatide? Is $X a month normal? | cost | 6 (6 in window) r/tirzepatidecompound/1wd0oa2, r/tirzepatidecompound/1vkaixh, r/tirzepatidecompound/1xtyt5o | Answered: /weight-loss/articles/best-tirzepatide-online, /weight-loss/cheapest-glp1 | Skip; add dated FAQ (quick win) |
| Is [welludr/Embody/AltRx/TrimRx/Medvi] legit? Anyone actually used it? | legit/which provider | 12 (11 in window) r/compoundtirzepatide/1xoc5wy, r/tirzepatidecompound/1tiufje, r/tirzepatidecompound/1wzuy19 | Answered: /weight-loss/articles/is-wellmedr-legit, is-embody-legit, is-altrx-legit, is-trimrx-legit, is-medvi-legit; Eden has a review only | Skip; FAQ gaps in quick wins |
| I cancelled and am still charged / how do I cancel or get a refund (welludr, Medvi, Ro, Noom)? | cancel/refund | 9 (5 in window) r/compoundtirzepatide/1x8thdl, r/tirzepatidecompound/1th7zsm, r/tirzepatidecompound/1vpdhq7 | Not covered: no cancel page; 'cancel' only as passing text in provider reviews | New article (cross-vertical hub, see #1) |
| Why a membership fee on top of the medication? Can I get a prescription without a subscription? | cost | 4 (4 in window) r/antidietglp1/1s66y8y, r/WegovyWeightLoss/1xkl2xj, r/HersWeightloss/1tohayx | Partly: /weight-loss/articles/ro-cost, before-you-prepay-glp1 | New H2 on before-you-prepay-glp1 |
| Units vs mg: how many units do I draw for my dose? Are my instructions right? | dosing logistics | 6 (4 in window) r/tirzepatidecompound/1ues6ei, r/tirzepatidecompound/1geceqr, r/tirzepatidecompound/1sdxdcf | Partly: /weight-loss/articles/compounded-semaglutide-units-to-mg is semaglutide only; no tirzepatide equivalent | New article (tirzepatide mg/mL/units); SAFETY |
| Normal titration: is it too soon to go up a dose? Break from tirz? | dosing logistics | 6 (5 in window) r/tirzepatidecompound/1vc8udt, r/tirzepatidecompound/1v40gwi, r/tirzepatidecompound/1sdddbv | Partly: /weight-loss/glp1-dose-schedule | New H2 + FAQ there; SAFETY |
| First dose and aching, lethargy, bloating: is this normal? Or no side effects at all? | side effects | 8 (7 in window) r/Mounjaro/1u5pcgc, r/Mounjaro/1v6m2vy, r/Mounjaro/1v1kf0n | Partly: /weight-loss/articles/semaglutide-side-effects-guide; no tirzepatide/Zepbound page | New article from labels; SAFETY |
| Switching providers: how do I keep my dose? Do you jump provider to provider? | switching | 6 (5 in window) r/compoundedtirzepatide/1wch9hz, r/compoundedtirzepatide/1wshjv7, r/compoundedtirzepatide/1rl6slf | Partly: /weight-loss/switch-from-ozempic is brand to brand | New H2 on /weight-loss/how-to-choose-a-glp1-provider |
| Zepbound cost: savings card, insurance, pens vs vials, cheapest way? | cost/insurance | 7 (5 in window) r/Zepbound/1q4jaib, r/Zepbound/1xoxi9k, r/Zepbound/1v0ghur | Answered: /weight-loss/articles/zepbound-price-online, lost-insurance-coverage-zepbound-wegovy, glp1-with-insurance | Skip; refresh dated prices |
| My vial is cloudy / has floaters; I received my first order, what now? | supply/safety | 2 (2 in window) r/tirzepatidecompound/1w93kn8, r/tirzepatidecompound/1uyrz7b | Not covered (1 file mentions 'cloudy') | FAQ on best-tirzepatide-online; SAFETY (thin evidence: 2 threads) |
| Order stuck 'preparing for shipment' / provider cancelled me | supply | 3 (2 in window) r/HimsWeightloss/1wzymdb, r/HimsWeightloss/1qk9ggj, r/Noom/1x6tvki | Not covered (earlier 'glp1-shipping-times' claim was wrong: no such page or slug found) | Fold into cancel hub |

### ED
| Question | Theme | Evidence | Our coverage | Format |
|---|---|---|---|---|
| Hims vs Ro vs BlueChew vs Rivo: which online ED service is best? | which provider | 5 (3 in window) r/erectiledysfunction/1wf3ftn, r/erectiledysfunction/10bah0j, r/erectiledysfunction/1vl72fm | Partly: /ed/reviews/hims, rexmd, quad; no Ro ED or BlueChew review; Rivo 0 | Comparison table + Ro ED review |
| Cheapest tadalafil/sildenafil: Cost Plus, Amazon Pharmacy, GoodRx? Is $X reasonable? | cost | 8 (6 in window) r/erectiledysfunction/1tw515w, r/erectiledysfunction/1xbjdqp, r/erectiledysfunction/1wdutbl | Partly: /ed/articles/ed-treatment-cost, /ed/ed-cost-index (Cost Plus 2 files, Amazon Pharmacy 0) | New H2 on ed-treatment-cost; only dated prices |
| Tadalafil or sildenafil stopped working: why? | 'is this normal' | 7 (3 in window) r/erectiledysfunction/1u4l9bk, r/erectiledysfunction/1spnnq8, r/erectiledysfunction/1xi40am | Answered: /ed/articles/sildenafil-not-working (sildenafil-led; tadalafil angle thin) | FAQ on that page |
| Can I take sildenafil and tadalafil together / which worked better? | dosing/safety | 4 (2 in window) r/erectiledysfunction/1t2koht, r/erectiledysfunction/1vydexk, r/erectiledysfunction/1r6ubk0 | Not covered (sildenafil-vs-cialis compares, no combination) | New H2; SAFETY |
| ED pills with blood pressure meds, low BP, fainting? | safety | 6 (1 in window) r/bloodpressure/13von2d, r/erectiledysfunction/zwg6e0, r/erectiledysfunction/1q05kti | Answered: /ed/articles/ed-pills-and-blood-pressure-medication | Skip |
| Does BlueChew work / is it the real thing? | legit | 6 (1 in window) r/BluechewReviews/1ak9ioz, r/BluechewReviews/1faypo7, r/BluechewReviews/1fr9t11 | Partly: /ed/articles/quad-vs-bluechew (3 files mention BlueChew) | New BlueChew explainer; SAFETY (compounded wording). Most IDs predate window |
| ED in my 20s: performance anxiety or real ED? | decision | 5 (5 in window) r/erectiledysfunction/1uvvkp1, r/erectiledysfunction/1ty0ark, r/erectiledysfunction/1uhz0lm | Answered: /ed/articles/ed-in-your-20s-and-30s | Skip |
| Hims/Ro: can't cancel, charged for subscription and meds, how do I get my money back? | cancel/refund | 8 (6 in window) r/HIMS/1um5g7h, r/HIMS/1v5iao0, r/HIMS/1u511b7 | Not covered | Cancel hub (#1) |
| Trimix: dose, tolerance, injection technique, which clinic? | dosing/safety | 6 (5 in window) r/TrimixForED/1u0t3a5, r/TrimixForED/1t76cc6, r/TrimixForED/1tphm1u | Partly: /ed/articles/trimix-for-ed | New H2s; SAFETY (Rx-only, compounded) |

### TRT
| Question | Theme | Evidence | Our coverage | Format |
|---|---|---|---|---|
| Hone vs Marek vs Male Excel: which online TRT clinic? Is Hone a scam? | which provider/legit | 7 (3 in window) r/Testosterone/1tinzcq, r/Testosterone/1qrkaen, r/Testosterone/1wj3g1n | Partly: /trt/reviews/hone, /trt/reviews/marek, /trt/hone-health-alternatives | FAQ on hone review; no new page |
| Defy Medical: legit? slow? pharmacy problems? | legit | 5 (1 in window) r/femaleHRT/1xxxgzd, r/trt/1ismkkd, r/trt/1fu39d0 | Not covered (0 files mention Defy) | New review + comparison; verify on provider page |
| TRT Nation: review, price, starting dose, local pharmacy for the vials? | cost/which provider | 7 (2 in window) r/Testosterone/1sgql09, r/Testosterone/1rsw44x, r/Testosterone/1f26m8d | Not covered (0 files) | New review |
| What do you pay monthly for TRT? Is it covered by insurance? | cost/insurance | 6 (0 in window) r/Testosterone/1eoqqjt, r/trt/1jei8gw, r/trt/1hk8ik8 | Answered: /trt/articles/trt-cost, is-trt-covered-by-insurance, /trt/cheapest-online-trt | Skip |
| hCG with TRT: dose, fertility, can I get my wife pregnant? | dosing/safety | 7 (7 in window) r/Testosterone/1t4rm07, r/Testosterone/1uu1958, r/Testosterone/1ucp30v | Answered: /trt/articles/trt-and-fertility, enclomiphene-vs-trt (hCG dosing thin) | FAQ; SAFETY |
| Starting TRT: what to expect, starting dose, how often to inject? | dosing logistics | 6 (6 in window) r/Testosterone/1uhb0aq, r/Testosterone/1tsw9rh, r/Testosterone/1ugon9e | Partly: /trt/articles/testosterone-cypionate-vs-enanthate, trt-results-timeline | H2 on cypionate-vs-enanthate; SAFETY |
| High estrogen / hematocrit on TRT: normal? | side effects | 4 (0 in window) r/trt/1i1d3jg, r/trt/qjc4vn, r/trt/1csxrun | Answered: /trt/articles/trt-and-estrogen, trt-blood-work | Skip |
| Telehealth testosterone after the DEA rule expires Dec 31? | supply/regulatory | 2 (1 in window) r/Testosterone/1wyijsu, r/trt/1id9572 | Answered: /trt/articles/online-trt-dea-deadline-2026 (re-verify date) | Refresh against primary |
| Compounded testosterone cream: price, dose | cost/dosing | 6 (6 in window) r/Testosterone/1wrk8y9, r/Testosterone/1wcstk1, r/HRT/1vzu74b | Partly: /trt/articles/testosterone-injections-vs-cream-vs-oral; women's side /hrt/articles/testosterone-for-menopausal-women | H2; SAFETY |
| Women: online prescriber for non-compounded testosterone? bloodwork costs | which provider/cost | 6 (4 in window) r/TRT_females/1q2h1ns, r/TRT_females/1ql0hhx, r/TRT_females/1wti44h | Partly: only the HRT page | New article; SAFETY (off-label) |

### HRT / menopause
| Question | Theme | Evidence | Our coverage | Format |
|---|---|---|---|---|
| Best, affordable online HRT: Midi vs Winona vs Alloy vs Evernow vs TIA/Fountain? | which provider | 7 (4 in window) r/femaleHRT/1xcs14i, r/midihealth/1xcrsv0, r/Menopause/1nk27ea | Partly: /hrt/best-online-hrt-providers-compared, midi/winona/gala; Alloy, Evernow, Musely 0 files | New reviews + table |
| Does Midi take my insurance? Billing nightmare, out of network, cost without insurance | insurance/cost | 6 (2 in window) r/Insurance/1tb76xt, r/midihealth/1vtrm0h, r/midihealth/1nno6ju | Answered: /hrt/articles/midi-cost, is-midi-legit (billing angle thin) | H2 + FAQ |
| Winona: legit? ghosted by providers? how does the consult work? | legit/logistics | 5 (3 in window) r/Perimenopause/1tpgu0s, r/Menopause/1hqr83v, r/perimenopause_under45/1wjp4h7 | Answered: /hrt/articles/is-winona-legit, winona-cost | FAQ on response times |
| Estradiol patch shortage: why and what do I switch to? | supply | 8 (8 in window) r/Menopause/1ukcujs, r/Menopause/1wcghye, r/Perimenopause/1wqdplq | Answered: /hrt/articles/estrogen-patch-shortage | Refresh vs FDA shortage page |
| Does vaginal estrogen need progesterone? Topical vs systemic? | safety | 6 (5 in window) r/Menopause/1we0z8e, r/Menopause/1xxlg4o, r/Menopause/1xoi0br | Partly: 14 files mention vaginal estrogen; no dedicated page | New article; SAFETY |
| Spotting or bleeding after starting HRT: normal? | side effects | 4 (4 in window) r/Menopause/1xy7tdt, r/Menopause/1sv0xo9, r/Perimenopause/1v7oq9y | Partly: /hrt/articles/hrt-side-effects | H2 + FAQ; SAFETY |
| Is my starting dose too high? Patch or progesterone adjustments | dosing | 7 (5 in window) r/Perimenopause/1wc4vnl, r/Perimenopause/1o0457s, r/Perimenopause/1r0aguc | Partly: /hrt/articles/estrogen-patch-vs-pill, progesterone-side-effects | New article from labels; SAFETY |
| Libido gone even on HRT; do I need testosterone? | side effects | 6 (6 in window) r/Menopause/1u5uigs, r/Perimenopause/1ttowrj, r/Menopause/1wixsfw | Answered: /hrt/articles/hrt-and-libido, testosterone-for-menopausal-women | Skip |
| Is HRT safe now that the boxed warning is going? | safety | 3 (1 in window) r/FamilyMedicine/1otic1c, r/texasthings/1w2uwwx, r/Menopause/1otsy61 | Answered: /hrt/articles/hrt-black-box-warning-removed | Skip |
| My gyno won't prescribe HRT; where do I get good advice? | which provider | 4 (4 in window) r/Perimenopause/1vcsmro, r/perimenopause_under45/1xiefqu, r/Menopause/1wmcufn | Partly: /hrt/articles/how-to-get-hrt-online | FAQ |

### Hair loss
| Question | Theme | Evidence | Our coverage | Format |
|---|---|---|---|---|
| Oral minoxidil: side effects, bloating, safety consensus, dose | side effects/dosing | 7 (5 in window) r/tressless/1x48n70, r/tressless/1wni1ax, r/tressless/1vy5f66 | Partly: /hair-loss/articles/oral-minoxidil-online, oral-minoxidil-vs-topical-minoxidil | H2 + FAQ; SAFETY |
| Women: spironolactone and oral minoxidil, does it cause a shed? | dosing/side effects | 6 (5 in window) r/FemaleHairLoss/1uqavn6, r/FemaleHairLoss/1wabb4o, r/FemaleHairLoss/1u6jykn | Partly: /hair-loss/articles/hair-loss-treatment-for-women (3 files mention spironolactone) | New article; SAFETY |
| Shedding after starting minoxidil: normal? Should I quit? | 'is this normal' | 7 (7 in window) r/FemaleHairLoss/1xnyrn7, r/FemaleHairLoss/1y29obx, r/FemaleHairLoss/1xya2r2 | Answered: /hair-loss/articles/minoxidil-shedding-phase | Skip; internal links |
| Finasteride 'worse than baseline': shedding, side effects, post-finasteride syndrome | side effects | 5 (5 in window) r/tressless/1ury51j, r/tressless/1t16gxu, r/tressless/1wbu4n4 | Partly: /hair-loss/articles/finasteride-side-effects (2 files mention PFS) | FAQ; SAFETY |
| Topical vs oral finasteride; low-concentration topical | dosing | 6 (5 in window) r/tressless/1wzil4k, r/tressless/1svib2f, r/tressless/1u92rby | Answered: /hair-loss/articles/topical-finasteride | Skip |
| How do I get a dutasteride or finasteride prescription? Dutasteride dose? | logistics | 7 (2 in window) r/tressless/1at95uc, r/tressless/1l352t4, r/tressless/1fendf8 | Answered: /hair-loss/articles/dutasteride-online, how-to-get-finasteride-online | FAQ on dutasteride dose; SAFETY (off-label) |
| Hims: can't cancel, subscription re-enabled, shipping delays | cancel/refund | 5 (5 in window) r/HIMS/1v5iao0, r/HIMS/1tw7bok, r/HIMS/1ua4hss | Not covered | Cancel hub (#1) |
| Transplant or meds? Stop meds before transplant? Shedding after | decision | 6 (6 in window) r/Hairtransplant/1wwy7sg, r/Hairtransplant/1t35q5s, r/Hairtransplant/1tlit0h | Partly: /hair-loss/articles/hair-transplant-vs-medication | H2 + FAQ |
| Does Nutrafol or a shampoo actually work? | legit | 6 (2 in window) r/40PlusSkinCare/1ri7j94, r/FemaleHairLoss/1qj13py, r/FemaleHairLoss/1xly5jc | Answered: /hair-loss/reviews/nutrafol, do-hair-loss-shampoos-work | Skip |

### Online therapy
| Question | Theme | Evidence | Our coverage | Format |
|---|---|---|---|---|
| Is BetterHelp legit / does it work? No-show therapists | legit | 6 (6 in window) r/askatherapist/1usimr3, r/therapy/1t45kjq, r/therapy/1sujfv9 | Answered: /online-therapy/articles/is-betterhelp-legit, reviews/betterhelp | Skip |
| BetterHelp keeps charging me / how do I cancel / refund (FTC refunds) | cancel/refund | 7 (6 in window) r/betterhelp/1uctcw7, r/betterhelp/1vb7dcs, r/betterhelp/1xjkz3y | Not covered (no cancel page; 'cancel' passing mentions only) | New article (#7); not medical |
| Online therapy that takes insurance; out-of-network, superbills | insurance | 7 (7 in window) r/therapy/1v485a5, r/therapists/1thbr78, r/psychotherapists/1urqhm8 | Answered: /online-therapy/articles/online-therapy-that-takes-insurance, does-talkspace-take-insurance (superbill 2 files) | H2 on superbills |
| BetterHelp vs Talkspace: which lower-cost platform? | which provider | 6 (4 in window) r/therapy/1vs6upm, r/therapy/1up3o8o, r/therapy/1rctlfv | Answered: /online-therapy/betterhelp-vs-talkspace | Skip |
| Cerebral: is it still OK to use? refunds | legit/cancel | 3 (1 in window) r/therapy/1xgk2yf, r/ADHD/v8aecw, r/ADHD/t599gn | Not covered (1 file mentions Cerebral) | Review only after provider page read; only 1 thread in window |
| Brightside: good or poor experience, insurance changes | legit/insurance | 3 (2 in window) r/mentalhealth/1td9j5q, r/mentalhealth/1luoz5w, r/mentalhealth/1sthwj8 | Not covered (0 files) | New review; thin evidence |
| Telehealth ADHD stimulants: new rules, monthly visits, prescription after moving | regulatory | 6 (3 in window) r/ADHD/1tfrzwf, r/ADHD/1qkkdkp, r/ADHD/1ihmuxd | Answered: /online-therapy/articles/telehealth-controlled-substances-dea-rules-2026, online-psychiatry | Refresh; SAFETY |
| My therapist ghosted me / how do I switch or break up with a therapist? | switching | 4 (4 in window) r/GirlDinnerDiaries/1xtp54o, r/therapists/1xkseyc, r/therapy/1wawmf9 | Partly: switching only mentioned in is-betterhelp-legit | FAQ |
| Is my therapy data private? FTC order, Meta sharing, AI training | privacy | 5 (3 in window) r/autism/1s8fazd, r/therapyabuse/1d773hg, r/technology/11p2eau | Not covered (FTC 3 files, none privacy-focused by name) | New article; edge FTC orders; not medical |
| How to find an online therapist; online vs in person; no insurance | decision/cost | 4 (3 in window) r/askatherapist/1tgrqia, r/therapy/1wa5kyz, r/askatherapist/1r8kkmj | Answered: online-therapy-vs-in-person, free-and-low-cost-therapy-options | Skip |

## 3. Cross-vertical patterns
1. **Cancel / still charged / refund** appears in every vertical except TRT and HRT (no annotated threads in the window for those; calls 36 and 48 found none): 29 distinct annotated threads (20 in window) across GLP-1 telehealth, Hims (ED, hair, weight), Ro, Noom and BetterHelp. We have no cancel page anywhere.
2. **"Is X legit / has anyone used X"** for small telehealth brands (welludr, AltRx, Embody, TrimRx, Medvi, Defy, TRT Nation, Alloy, Evernow, Brightside, Cerebral). Where we have an "is-X-legit" page the question is answered; brands with 0 repo mentions are open.
3. **"Is this normal?"** on starting a drug (tirzepatide first dose, HRT spotting, minoxidil shedding, finasteride, oral minoxidil bloating, ED pills stopping). Each can be answered from a label table with its time point, which Reddit cannot.
4. **Units/mg, titration and starting-dose logistics** (tirzepatide vials, TRT injection frequency, HRT patch/progesterone doses) are asked as practical, safety-adjacent questions.
5. **Regulatory/supply**: estradiol patch shortage (8 threads, all in window), telehealth DEA rules (TRT, ADHD), compounded status. These pages exist; refresh against primary sources.
6. Retrieval noise: trans HRT, ADHD and other subreddits appear; excluded unless on topic.

## 4. Ranked top 10 opportunities (max 3 from weight loss: two used by #2, #3; #1 is a cross-vertical hub)
Rank = Reddit evidence strength x primary-source edge x gap. Evidence counts reference the section 2 rows.
| # | Working title | Target question | Reddit evidence | Verifiable edge | Safety |
|---|---|---|---|---|---|
| 1 | How to cancel a telehealth subscription: GLP-1, Hims, Ro, Noom | still charged / how to cancel / refund | 29 threads, 20 in window, 4 verticals | each provider's own terms/cancel page read and dated; state auto-renewal law. Not yet fetched | no |
| 2 | Compounded tirzepatide: units vs mg, concentration and volume | how many units for my dose? | 6 threads, 4 in window | Zepbound label strengths (mg per 0.5 mL pen, vial mg/0.5 mL) to compute worked examples; house rule: state mg, concentration, volume. Not yet fetched | yes (dose, compounded not FDA-approved) |
| 3 | Zepbound/Mounjaro first-dose side effects: what the label table shows | is this normal after dose 1? | 8 threads, 7 in window | label adverse-reaction percentages with SURMOUNT-1 72-week time point (DailyMed) | yes |
| 4 | Defy Medical and TRT Nation reviews (and vs Hone/Marek) | are they legit, what do they cost? | 5 threads, 1 in window; TRT Nation 7 threads, 2 in window | provider pages dated; 0 repo mentions so pure gap | partly |
| 5 | Vaginal estrogen: do you need progesterone? | topical vs systemic, progesterone? | 6 threads, 5 in window | FDA labels for vaginal estrogen products; Menopause Society position. Not yet fetched | yes |
| 6 | Spironolactone (with oral minoxidil) for female hair loss | does it cause a shed, safe? | 6 threads, 5 in window | DailyMed spironolactone label (hair loss is off-label); needs read | yes |
| 7 | BetterHelp charges, cancel and the FTC refunds | still charged, refund? | 7 threads, 6 in window (one thread cites 534,000 more refunds, unverified) | FTC press release/refund page (primary; not yet read) | no |
| 8 | Oral minoxidil: dose, bloating, heart and BP (H2 + FAQ on existing page) | side effects consensus? | 7 threads, 5 in window | DailyMed minoxidil tablet label boxed warning; hair loss off-label | yes |
| 9 | Alloy, Evernow, Fountain, TIA vs Midi/Winona | which online HRT? | 7 threads, 4 in window (Alloy named only inside a multi-brand title, Evernow thread predates the window; the Alloy/Evernow-specific call found none) | dated provider pages; 0 repo mentions of Alloy/Evernow | partly |
| 10 | Sildenafil with tadalafil: can you combine, and why pills stop working | combine? stopped working? | 4 threads, 2 in window; stopped-working 7 threads, 3 in window | Viagra and Cialis labels (dose limits, nitrate contraindication) | yes |

## 5. Quick wins (add FAQ/H2 to pages that already rank)
- /weight-loss/articles/is-wellmedr-legit, /weight-loss/reviews/wellmedr, /weight-loss/articles/wellmedr-cost (brand now "welludr"): 12 legit/"anyone used it" threads plus "will not cancel" and "full dose each month?" threads (r/compoundedtirzepatide/1slor4b, r/tirzepatidecompound/1vpdhq7). By headings, is-wellmedr-legit covers legit/scam/complaints; wellmedr-cost covers the 12-month lock. Missing: how to cancel and billing cadence. Add H2s only from the provider's own terms page, read and dated. Note: the repo's captured review material mentions 21-day billing; I did not verify it on the provider page.
- /weight-loss/articles/is-embody-legit: only 2 annotated threads titled just "Embody" (r/compoundedtirzepatide/1uebydq, 1wj444y); weak. Candidate FAQ: refills and support (repo thread already captured).
- /weight-loss/articles/is-altrx-legit: 7 threads (r/compoundedtirzepatide/1si30wn "found on IG advertised", 1t15xb5, 1wbq5qd; r/glp1/1sxjo56). Add FAQ "seen on Instagram, is it real?", based on facts already on the page.
- /weight-loss/articles/best-tirzepatide-online: add FAQ "Am I overpaying?" (r/tirzepatidecompound/1wd0oa2, 1vkaixh, r/compoundedtirzepatide/1xckzgf) answered with our dated price index only; and "cloudy vial" (r/tirzepatidecompound/1w93kn8), safety-reviewed; "stockpile vs subscription" (1vlno0c).
- Others cheap: FAQ "spotting on HRT" on /hrt/articles/hrt-side-effects; FAQ "PFS" on /hair-loss/articles/finasteride-side-effects.

## 6. Unverified leads and what could not be checked
- 57 un-annotated typed permalinks + 9 opened-not-annotated pages (calls 2-8, 10-12 original runs) are leads only; they sit in the raw JSON.
- No comment counts or posting months (not in annotations); window is an ID heuristic.
- No thread bodies read: "is this normal" and "legit" labels come from titles. Titles that look like claims (Hims sending data to Facebook, Cerebral imploded, BetterHelp 534,000 refunds, DEA rule expiring Dec 31) are Reddit assertions, unverified; none is used as fact.
- No annotated threads in window found for: r/ED_support, RexMD, Alloy/Evernow (directly), Happy Head/Keeps, TRT cancel, HRT cancel, "when to quit" hair meds. Absence reflects this tool, not proof of no demand. r/Mounjaro, r/Semaglutide and r/WegovyWeightLoss yielded few threads (calls 4, 7 originals were un-annotated and not rerun).
- Every "verifiable edge" in section 4 is a plan: I have not fetched any label, FTC page or provider page in this run.
- Subreddit mix includes off-topic noise (trans HRT, ADHD); the model may also have missed on-topic threads.
