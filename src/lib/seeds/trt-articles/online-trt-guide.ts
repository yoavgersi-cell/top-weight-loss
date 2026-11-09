import type { ArticleData } from "../../config";

// ───── Online TRT in 2026: the complete guide to telehealth TRT (Nov 9, 2026) ─────
// Pillar for the "online TRT" / telehealth-TRT query cluster (Bing, Nov 2026:
// AI-search grounding queries on in-person vs telehealth TRT, local clinics vs
// national platforms, finding a TRT doctor online, the first online consult,
// onboarding and baseline labs, video follow-ups, long-term safety, "trt
// meaning"; search keywords on results timeline, monitoring markers,
// enclomiphene bloodwork, TRAVERSE, HRT vs TRT, libido and weight loss).
// Distinct from the general clinical pillar (trt-guide) and the step-by-step
// how-to-get-trt-online: this page is about the telehealth route end to end,
// and it hubs out to the narrower TRT pages.
//
// Sourcing rules. Read directly on November 9, 2026: FDA's February 2025
// class-wide labeling page and its testosterone information page (current as
// of June 23, 2026); the Endocrine Society's July 16, 2026 statement; the AUA
// guideline page; MedlinePlus pages on testosterone injection, topical
// testosterone, hypogonadism and clomiphene; the NHS page on the "male
// menopause"; NIA's 2017 T Trials release; Saad et al. 2011 (PMC); Dubin et
// al. 2021, "TRT in the era of telemedicine" (PMC). Carried over, links kept,
// from ./how-low-testosterone-is-diagnosed.ts (checked Oct 31, 2026): AUA
// table 7, Endocrine Society 2018 guideline, BSSM, TRAVERSE (NEJM), the
// TRAVERSE fracture paper, WHO 1990, the 2022 secret-shopper study, Epic
// Research, ENDO 2026, the 2026 network meta-analysis, the Endocrine Society
// DHA statement, Brambilla 2009, Caronia 2013, the HHS June 2026 release and
// the Healio panel report; and from ./online-trt-dea-deadline.ts (checked
// Nov 6, 2026): every DEA and telehealth-rule fact. No head-to-head trial of
// telehealth vs in-person TRT was found, and the page says so. Provider facts
// come only from ./trt-ported.ts and ./trt.ts; no provider prices and no
// Trustpilot or Reddit content. Enclomiphene and clomiphene are described as
// off-label for men. No dosing. Do not add figures without a source.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  // Guidelines and statements
  aua: "https://www.auanet.org/guidelines-and-quality/guidelines/testosterone-deficiency-guideline",
  auaTable7: "https://www.auanet.org/documents/Guidelines/PDF/Table%20Seven%20-%20Follow-up%20Laboratory%20Testing(0).pdf",
  esGuideline: "https://academic.oup.com/jcem/article/103/5/1715/4939465",
  esStatement: "https://www.endocrine.org/news-and-advocacy/news-room/2026/statement-on-testosterone-replacement-therapy",
  esDha: "https://www.endocrine.org/news-and-advocacy/news-room/2026/statement-on-dhas-clinical-practice-guideline-for-testosterone-deficiency-in-the-male-service-member",
  bssm: "https://academic.oup.com/jsm/article/14/12/1504/6973374",
  // Regulators and public-health bodies
  fdaLabel: "https://www.fda.gov/drugs/drug-alerts-and-statements/fda-issues-class-wide-labeling-changes-testosterone-products",
  fdaInfo: "https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/testosterone-information",
  hhs2026: "https://www.hhs.gov/press-room/fda-requests-updates-testosterone-therapy-labeling.html",
  fdaPanel: "https://www.healio.com/news/endocrinology/20251210/fda-panel-supports-expanding-population-indicated-for-testosterone-therapy",
  mpInj: "https://medlineplus.gov/druginfo/meds/a614041.html",
  mpTop: "https://medlineplus.gov/druginfo/meds/a605020.html",
  mpHypo: "https://medlineplus.gov/ency/article/001195.htm",
  mpClomid: "https://medlineplus.gov/druginfo/meds/a682704.html",
  nhsMM: "https://www.nhs.uk/conditions/male-menopause/",
  niaTT: "https://www.nia.nih.gov/news/nih-supported-trials-testosterone-therapy-older-men-report-mixed-results",
  // Trials and studies
  traverse: "https://www.nejm.org/doi/full/10.1056/NEJMoa2215025",
  traverseFx: "https://doi.org/10.1056/NEJMoa2308836",
  saad: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3188848/",
  dubinTele: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8604198/",
  dubin: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2799297",
  dubinNU: "https://news.feinberg.northwestern.edu/2023/01/05/direct-to-consumer-online-platforms-expand-access-but-often-fail-to-convey-risks-of-testosterone-therapy/",
  epic: "https://www.epicresearch.org/articles/most-men-starting-testosterone-had-prior-testing-but-only-1-in-5-met-the-two-test-standard/",
  endo26PR: "https://www.endocrine.org/news-and-advocacy/news-room/2026/papaleontiou-press-release-endo-2026",
  endo26RUN: "https://www.renalandurologynews.com/news/endo-few-men-receiving-testosterone-undergo-guideline-concordant-diagnostic-testing/",
  nma: "https://academic.oup.com/jsm/article/23/9/qdag272/8787137",
  who1990: "https://pubmed.ncbi.nlm.nih.gov/1977002/",
  brambilla09: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2681273/",
  caronia: "https://pubmed.ncbi.nlm.nih.gov/22804876/",
  // Telehealth prescribing rules (DEA)
  deaExtension: "https://www.dea.gov/press-releases/2025/12/31/dea-extends-telemedicine-flexibilities-ensure-continued-access-care",
  hklaw: "https://www.hklaw.com/en/insights/publications/2026/01/dea-and-hhs-extend-telemedicine-prescribing-flexibilities-through-2026",
  mondaq: "https://www.mondaq.com/unitedstates/healthcare/1736074/2026-extension-of-telemedicine-prescribing-flexibilities-impacts-on-patients-and-providers",
  frierOira: "https://www.frierlevitt.com/articles/dea-telemedicine-special-registration-final-rule-oira/",
  mcdermott: "https://www.mcdermottlaw.com/insights/dea-appears-close-to-finalizing-telemedicine-special-registration/",
  deaProposed: "https://www.dea.gov/press-releases/2025/01/16/dea-announces-three-new-telemedicine-rules-continue-open-access",
  aha: "https://www.aha.org/news/headline/2025-01-15-hhs-dea-release-rules-related-telemedicine-prescribing-controlled-substances",
};

export const TRT_ONLINE_GUIDE: ArticleData = {
  slug: "online-trt-guide",
  title: "Online TRT in 2026: The Complete Guide to Telehealth TRT",
  description:
    "Online TRT explained: who qualifies, the first telehealth consult, baseline and monitoring labs, formats, results, safety, DEA rules and choosing a clinic.",
  category: "Guide",
  readTime: "54 min read",
  publishedAt: "2026-11-09",
  updatedAt: "2026-11-09",
  heroColor: "#EAF1F6",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "TRT treats diagnosed low testosterone, not a number alone: the Endocrine Society's July 2026 statement asks for symptoms plus at least two early-morning, fasting tests, with about 300 ng/dL as the common clinical threshold, and the AUA uses 300 ng/dL.",
    "No head-to-head trial has compared online and in-person TRT. A 2021 review in the International Journal of Impotence Research concluded telemedicine alone can deliver AUA guideline-concordant care, while noting it loses the physical exam and doesn't suit pellets.",
    "Once you start, monitoring is part of the treatment: testosterone level, hematocrit and, by age, PSA at roughly 3 to 6 months and then at regular intervals. In the TRAVERSE trial of 5,246 men, major heart events were 7.0% on testosterone gel and 7.3% on placebo, but atrial fibrillation and pulmonary embolism were more common.",
    "Testosterone is a Schedule III controlled substance, and the federal rule that lets clinicians prescribe it by video with no in-person visit runs through December 31, 2026. Exogenous testosterone also suppresses sperm production, so fertility plans belong in the first conversation.",
  ],
  sections: [
    {
      heading: "What is online TRT, and how does it work in 2026?",
      body: `<div class="qa"><strong>The short answer</strong><p>Online TRT is testosterone replacement therapy that is assessed, prescribed and monitored through a telehealth clinic instead of a local office. You complete a health questionnaire, do blood tests (with a home kit or at a lab), speak to a licensed clinician by video or message, and, if low testosterone is confirmed and treatment is safe for you, the prescription is shipped to your door, followed by regular check-up labs. Done properly, it follows the same rules as in-person care: symptoms plus low testosterone on at least two early-morning tests, a baseline blood count and age-appropriate PSA, a frank question about fertility, and ongoing monitoring. A 2021 review found that telemedicine alone can deliver care that meets the American Urological Association guideline. Sources: ${ext(S.esStatement, "Endocrine Society, July 16, 2026")}; ${ext(S.dubinTele, "Dubin et al., 2021")}.</p></div>
<p>Getting testosterone online has gone from a niche to a normal way of being treated in a few years. A man who suspects low testosterone can now order a home blood kit on a Sunday night, have a video appointment the following week and receive treatment by mail, without taking a morning off work or sitting in a waiting room. For many men that convenience is the difference between getting checked and not bothering. It also raises fair questions. Is a video visit as good as an exam room? Can a clinic diagnose you properly from a finger-prick kit? What happens to your care if the rules on prescribing controlled substances by telehealth change at the end of 2026? And how do you tell a careful clinic from one that is mainly selling a subscription?</p>
<p>This guide answers those questions in order, from the meaning of TRT to the last follow-up blood test. It is written for men in the United States weighing online TRT for the first time, men already on treatment who are thinking about switching providers, and partners or family members trying to understand what is involved. It is long because the decision is long-term: for most men who start, TRT is a treatment that continues for years.</p>
<h3>How to use this guide</h3>
<p>The first sections cover what TRT is, who qualifies and whether an online clinic can diagnose you properly. The middle of the guide walks through the telehealth process step by step: onboarding, the baseline labs, the first consultation, the formats you can get by mail, what a membership usually includes, costs in general terms, and how the leading providers compare. The later sections cover what happens after you start: monitoring, the results timeline, libido and weight, long-term safety, fertility, alternatives such as enclomiphene, the DEA deadline, red flags and how to switch. Each section opens with a direct answer and then goes into depth, so you can read only the parts you need.</p>
<h3>How we researched and compared</h3>
<p>Medical and regulatory statements in this guide link to their source, usually a guideline (the AUA's 2018 guideline, validity confirmed in 2024, or the Endocrine Society's), a federal agency (FDA, NIH, MedlinePlus) or a peer-reviewed paper, with the date. Where we carry a fact over from one of our earlier guides, we keep the original link. Facts about named providers come only from our own verified reviews, and we do not quote prices for the clinics we rank highest because they do not publish a single fixed price we could verify; confirm the current price on each clinic's site. Our provider order is the one on our <a href="/trt">online TRT clinic ranking</a>, which weighs testing, clinician oversight, depth of ongoing monitoring, treatment options and transparency. Some providers featured on this site may compensate us, which may affect the order and placement of listings; it does not change the facts in this guide. We are a comparison site, not a medical provider, and nothing here is a treatment plan: a licensed clinician who has your results and history decides whether TRT is right for you and how it is given.</p>`,
    },
    {
      heading: "What does TRT mean?",
      body: `<p><strong>TRT stands for testosterone replacement therapy: prescription testosterone given to men whose bodies do not make enough of their own, to bring levels back into the normal range and relieve the symptoms of deficiency.</strong> It replaces a hormone; it does not cure the underlying cause. MedlinePlus puts it plainly in its patient information on testosterone injection: the medicine "may control your symptoms but will not cure your condition." Source: ${ext(S.mpInj, "MedlinePlus, testosterone injection, last revised May 15, 2025")}, read November 9, 2026.</p>
<h3>Hypogonadism, testosterone deficiency and "low T"</h3>
<p>The medical name for the condition TRT treats is <strong>hypogonadism</strong>. MedlinePlus defines it as a state in which the body's sex glands (in men, the testes) produce little or no hormones. Doctors split it into two kinds, and the split matters for treatment:</p>
<ul>
<li><strong>Primary hypogonadism</strong> means the testes themselves are not working properly. MedlinePlus lists causes including genetic and developmental disorders (Klinefelter syndrome is the most common genetic one in men), infection, iron overload, liver and kidney disease, radiation, surgery and trauma.</li>
<li><strong>Secondary (central) hypogonadism</strong> means the control centers in the brain, the hypothalamus and pituitary, are not sending a strong enough signal. Causes listed include medicines such as glucocorticoids and opiates, stopping anabolic steroids, rapid significant weight loss, pituitary bleeding, tumors and genetic conditions.</li>
</ul>
<p>Source: ${ext(S.mpHypo, "MedlinePlus, hypogonadism (reviewed July 21, 2024)")}. The American Urological Association prefers the phrase <strong>testosterone deficiency</strong>, and its definition is the one to remember: to be testosterone deficient "is to have low testosterone levels combined with symptoms or signs" associated with low testosterone, and a man is a candidate for therapy "only when they meet both criteria." Source: ${ext(S.aua, "AUA testosterone deficiency guideline page")}, read November 9, 2026. "Low T" is the everyday shorthand for the same thing, though marketing often uses it more loosely.</p>
<h3>Total testosterone and free testosterone</h3>
<p>Most testosterone in the blood is bound to proteins, tightly to sex hormone-binding globulin (SHBG) and loosely to albumin. <strong>Total testosterone</strong> measures all of it and is the main diagnostic test. <strong>Free testosterone</strong> is the small unbound fraction. The Endocrine Society's 2018 guideline recommends measuring free testosterone when total testosterone is near the lower limit of normal or when SHBG is likely to be unusual, using equilibrium dialysis or an accurate calculation. Source: ${ext(S.esGuideline, "Endocrine Society guideline, 2018")}. Our explainer on <a href="/trt/articles/free-vs-total-testosterone">free vs total testosterone</a> covers this in detail.</p>
<h3>What TRT is not</h3>
<p>TRT is not a supplement, a "booster" or a performance drug. It is a prescription medicine, and in the US it is a controlled substance. The FDA says testosterone products are approved only for men who lack or have low testosterone "in conjunction with an associated medical condition," with examples such as testicular failure from genetic problems or chemotherapy and problems with the hypothalamus or pituitary. Source: ${ext(S.fdaInfo, "FDA testosterone information page, current as of June 23, 2026")}. Using testosterone to push normal levels higher is a different thing, and our guide to <a href="/trt/articles/trt-vs-steroids">TRT vs steroids</a> explains where the line sits. For the basics in a shorter read, see <a href="/trt/articles/what-is-trt">what is TRT</a>.</p>`,
    },
    {
      heading: "Are HRT and TRT the same thing?",
      body: `<p><strong>Not quite. TRT is one kind of hormone replacement therapy, but in everyday use "HRT" usually means menopausal hormone therapy for women, built on estrogen with or without a progestogen, while "TRT" means testosterone for men with low testosterone.</strong> They treat different conditions with different hormones, and the safety evidence for one does not transfer to the other.</p>
<p>The overlap is real, which is where the confusion comes from. Menopause is itself a form of hypogonadism: MedlinePlus calls it the most common reason for hypogonadism and describes it as a normal change that occurs in women on average around age 50. In its treatment section, MedlinePlus says estrogen and progesterone are used for girls and women, and testosterone for boys and men. Source: ${ext(S.mpHypo, "MedlinePlus, hypogonadism")}, read November 9, 2026.</p>
<table>
<thead><tr><th></th><th>TRT (men)</th><th>HRT / menopausal hormone therapy (women)</th></tr></thead>
<tbody>
<tr><td>Condition treated</td><td>Male hypogonadism (testosterone deficiency) diagnosed by symptoms plus repeat low morning testosterone</td><td>Menopause symptoms and, in some women, early or premature menopause</td></tr>
<tr><td>Main hormone</td><td>Testosterone</td><td>Estrogen, with progesterone or a progestogen for women who have a uterus</td></tr>
<tr><td>Common forms</td><td>Injections, skin gels and solutions, skin patches, a patch applied to the upper gum, oral products and pellets</td><td>Pills or skin patches, per MedlinePlus</td></tr>
<tr><td>Key safety questions</td><td>Hematocrit, PSA by age, blood pressure, fertility</td><td>MedlinePlus notes long-term use may increase the risk of breast cancer, blood clots and heart disease, especially in older women, and advises discussing risks and benefits with a clinician</td></tr>
</tbody>
</table>
<p>Two more wrinkles. First, some men's clinics use "HRT" or "hormone optimization" as umbrella marketing terms for testosterone plus other medicines; if a clinic says HRT, ask exactly which hormones it means. Second, testosterone is sometimes used in women too, at much lower doses and for a narrow set of reasons, which our HRT team covers in <a href="/hrt/articles/testosterone-for-menopausal-women">testosterone for menopausal women</a>. If you are here for menopause rather than male low testosterone, start with <a href="/hrt/articles/what-is-hrt">what is HRT</a> instead.</p>
<p>The "male menopause" is worth a word here because it blurs the two. The NHS calls it an "unhelpful term" and says the label is misleading because it suggests a sudden drop in testosterone in middle age, similar to the female menopause, which is not what happens. Testosterone falls steadily in men, at about 1% a year from around the age of 30 to 40, which the NHS says "is unlikely to cause any problems in itself." A deficiency that develops later in life, late-onset hypogonadism, can sometimes explain symptoms, but in many cases the symptoms have nothing to do with hormones. Source: ${ext(S.nhsMM, "NHS, the 'male menopause' (page last reviewed October 13, 2022)")}, read November 9, 2026.</p>`,
    },
    {
      heading: "Who actually qualifies for TRT?",
      body: `<p><strong>You qualify for TRT when a clinician confirms two things: symptoms consistent with low testosterone, and total testosterone that is consistently low on at least two separate early-morning, fasting blood tests.</strong> The Endocrine Society's July 16, 2026 statement describes about 300 ng/dL as the common clinical threshold; the AUA uses 300 ng/dL as its cut-off. A clinician also has to check that treatment is safe for you, which is where the blood count, PSA and fertility questions come in.</p>
<h3>What the two US guidelines say</h3>
<p>The Endocrine Society's 2026 statement is short and worth quoting. It says the diagnosis "requires ascertainment of men with symptoms of decreased testosterone, plus consistently low, accurately measured blood total and free testosterone," and that "the approach and definition of the diagnosis is the same for a man of any age." It says the diagnosis should rest on "at least two early-morning, fasting testosterone tests (common clinical threshold near 300 ng/dL)," that "symptoms alone are not diagnostic," and that clinicians need to rule out reversible contributors first, "such as obesity and medications such as corticosteroids or opioid use." Source: ${ext(S.esStatement, "Endocrine Society statement, July 16, 2026")}, read November 9, 2026.</p>
<p>The AUA's guideline, published in 2018 and listed on the AUA site as reviewed and validity confirmed in 2024, makes the same point from the urology side: a man is testosterone deficient and a candidate for therapy only when he has both low levels and symptoms or signs. Our earlier diagnosis guide summarizes its numeric rule as total testosterone below 300 ng/dL on two separate early-morning measurements. Sources: ${ext(S.aua, "AUA guideline page")}; <a href="/trt/articles/how-low-testosterone-is-diagnosed">how low testosterone is diagnosed</a>.</p>
<h3>Which symptoms count</h3>
<p>The Endocrine Society's guideline separates symptoms that are more specific to low testosterone, chiefly reduced sexual desire and fewer spontaneous or morning erections, from less specific ones such as low energy, low mood, poor concentration and reduced physical performance, which have many other causes. Source: ${ext(S.esGuideline, "Endocrine Society guideline, 2018")}. The AUA guideline page makes the same caution: the symptoms "are very non-specific and can be manifestations of other conditions (e.g., chronic fatigue, chronic stress, a depressed state)." Our guide to <a href="/trt/articles/low-testosterone-symptoms">low testosterone symptoms</a> goes through them one by one.</p>
<h3>Who usually should not start, at least not yet</h3>
<p>The Endocrine Society's 2018 guideline lists situations in which testosterone should not be started, including breast or prostate cancer, a palpable prostate nodule, an elevated hematocrit, untreated severe obstructive sleep apnea, severe lower urinary tract symptoms, uncontrolled heart failure, a heart attack or stroke within the last six months, thrombophilia, and men planning fertility in the near term. The AUA recommends against prescribing exogenous testosterone to men who are currently trying to conceive. Sources: ${ext(S.esGuideline, "Endocrine Society guideline, 2018")}; ${ext(S.aua, "AUA guideline")}, as summarized in our <a href="/trt/articles/how-low-testosterone-is-diagnosed">diagnosis guide</a>.</p>
<p>And for men whose low testosterone comes with excess weight and no other cause, the Endocrine Society's 2026 statement is direct: "weight loss is typically the first-line therapy" for appropriately diagnosed hypogonadism due to overweight or obesity (BMI above 27). That doesn't rule TRT out, but it changes the order of the conversation. See <a href="/trt/articles/weight-loss-testosterone-glp1-vs-trt">low testosterone and obesity: weight loss or TRT?</a></p>
<h3>Age on its own is not a reason, either way</h3>
<p>The FDA asked manufacturers in June 2026 to remove the label language saying the safety and efficacy of TRT in age-related hypogonadism had not been established. That change, if finalized, removes a discouragement; it does not make a borderline result in an older man a diagnosis. The Endocrine Society's statement says the diagnosis is the same "for a man of any age." Sources: ${ext(S.fdaInfo, "FDA, June 2026")}; ${ext(S.esStatement, "Endocrine Society, July 2026")}. Our guide to <a href="/trt/articles/normal-testosterone-levels-by-age">normal testosterone levels by age</a> explains how ranges shift over a lifetime.</p>`,
    },
    {
      heading: "Can an online clinic diagnose low testosterone properly?",
      body: `<p><strong>Yes, it can. Nothing in the US diagnostic standard requires an in-person visit: the morning blood tests, LH and FSH, blood count and PSA are ordinary laboratory tests, and the AUA guideline does not mandate a physical examination.</strong> Whether a particular clinic does diagnose properly is a separate question, and the evidence says the standard is often missed, online and in person.</p>
<h3>What the telemedicine review found</h3>
<p>The most useful paper on this question is a 2021 review by urologists Justin Dubin, Richard Fantus and Joshua Halpern, "Testosterone replacement therapy in the era of telemedicine," published in the International Journal of Impotence Research. They note that "the AUA guidelines do not specifically mandate a physical examination for the diagnosis and treatment" of testosterone deficiency, and that neither the AUA's testosterone guideline nor its prostate cancer early-detection guideline mandates a digital rectal examination. They conclude: "it is possible to provide guideline-based care for initiation and management of TRT through telemedicine alone, without a physical examination." Source: ${ext(S.dubinTele, "Dubin, Fantus and Halpern, Int J Impot Res, 2021 (PMC full text)")}, read November 9, 2026.</p>
<p>The same review is candid about the trade-off. A physical exam can pick up signs of testosterone deficiency and of other conditions, such as undiagnosed cardiovascular disease, that a video call can miss. That is why the authors recommend that, where possible, the first evaluation be in person with the prescriber, or that the patient be examined by a local primary care doctor alongside the first telehealth consultation. We come back to this in the next section.</p>
<h3>How often the standard is actually met</h3>
<p>Three pieces of evidence, described in full in our <a href="/trt/articles/how-low-testosterone-is-diagnosed">diagnosis guide</a>, show how often men start testosterone without the full workup:</p>
<ul>
<li><strong>Epic Research (2026)</strong> analyzed records for 300,277 men newly prescribed testosterone. Only 21.8% of men starting in the first half of 2026 had two low results on separate days in the six months beforehand. This is a records analysis, not a peer-reviewed paper. Source: ${ext(S.epic, "Epic Research")}.</li>
<li><strong>ENDO 2026</strong>: a University of Michigan chart review of 200 men found only 12% met a fuller standard including two low morning levels and LH or FSH. It was a meeting abstract from an academic health system, which shows the gap is not only an online one. Sources: ${ext(S.endo26PR, "Endocrine Society press release")}; ${ext(S.endo26RUN, "Renal and Urology News")}.</li>
<li><strong>A 2022 secret-shopper study</strong> in JAMA Internal Medicine sent a scripted 34-year-old with normal testosterone to seven direct-to-consumer platforms; six offered him testosterone. The study is small and dates from 2022, and the companies were not named. Sources: ${ext(S.dubin, "Dubin et al., JAMA Internal Medicine, 2022")}; ${ext(S.dubinNU, "Northwestern Medicine summary")}.</li>
</ul>
<p>The lesson is not that online clinics can't be trusted. It is that the standard of care is something you may need to ask for, wherever you are treated. A good online clinic will order two morning tests before prescribing, explain the result, and say no when the numbers don't support treatment. Our guide to <a href="/trt/articles/is-trt-bad-for-you">whether TRT is bad for you</a> covers what happens when that bar is skipped.</p>`,
    },
    {
      heading: "Is online TRT as effective as an in-person clinic, and which is better value?",
      body: `<p><strong>No trial has compared online and in-person TRT head to head, so there is no evidence that one produces better testosterone levels or symptom relief than the other. The medicine is the same either way; what differs is access, convenience, cost structure and whether anyone examines you in person.</strong> For most men with a straightforward diagnosis, a careful telehealth clinic can deliver guideline-level care. For men with complex histories, or who want pellets or in-office injections, an in-person clinic, endocrinologist or urologist may be the better fit.</p>
<p>We looked for a study comparing outcomes such as testosterone levels, symptom scores or side effects between telehealth and in-person TRT and did not find one. The 2021 telemedicine review we cite throughout says "there is limited data on the management of testosterone replacement therapy (TRT) in the era of telemedicine." Source: ${ext(S.dubinTele, "Dubin et al., 2021")}. Anyone who tells you online TRT is proven better, or proven worse, is going beyond the evidence.</p>
<h3>Telehealth vs in-person TRT at a glance</h3>
<table>
<thead><tr><th>Factor</th><th>Online / telehealth TRT</th><th>In-person clinic or specialist</th></tr></thead>
<tbody>
<tr><td>Guideline-concordant care possible?</td><td>Yes; the AUA guideline doesn't mandate a physical exam (Dubin, 2021)</td><td>Yes</td></tr>
<tr><td>Physical examination</td><td>Not available by video; the review calls this "a critical limitation"</td><td>Available, including vital signs and a cardiopulmonary exam where needed</td></tr>
<tr><td>Access</td><td>Strong for rural men and those far from a specialist</td><td>Depends on local specialists and appointment availability</td></tr>
<tr><td>Time and travel</td><td>Little or none; labs at home or a nearby lab</td><td>Travel and time off work for each visit</td></tr>
<tr><td>Privacy and comfort</td><td>The review notes telemedicine can offer "a safe space" for men uncomfortable with in-person evaluation</td><td>Face-to-face; some men prefer this</td></tr>
<tr><td>Formats</td><td>Self-administered injections, topicals and oral options by mail</td><td>All formats, including pellets (in-office procedure) and clinic-given injections</td></tr>
<tr><td>Continuity if rules change</td><td>Depends on federal telehealth rules for controlled substances after December 31, 2026</td><td>Unaffected by telehealth prescribing rules</td></tr>
<tr><td>Payment</td><td>Often a membership or program fee; ask whether insurance is accepted</td><td>Ask whether the practice bills your insurance, and what the copays are</td></tr>
</tbody>
</table>
<p>Sources: ${ext(S.dubinTele, "Dubin et al., 2021")}; ${ext(S.deaExtension, "DEA, December 31, 2025")}.</p>
<h3>Value: what the evidence on cost and satisfaction says</h3>
<p>The review summarizes two studies of what patients save by not traveling. In one, Demaerschalk and colleagues estimated telemedicine visits saved patients $888 per visit on average, counting travel, accommodation, meals and missed work, though the savings were driven mainly by patients who lived very far from the clinic. In another, among veterans with shorter journeys, the saving was a more modest $124 per virtual visit. On satisfaction, the review cites a survey of more than 38,000 urology patients, including 620 video visits, in which satisfaction scores were higher for video visits than for in-person visits (94.9% vs 92.5%). Those studies were not specific to TRT, and the authors say data on TRT-specific cost savings are lacking. Source: ${ext(S.dubinTele, "Dubin et al., 2021")}, read November 9, 2026.</p>
<p>The other side of the value question is the price of the treatment itself, which depends far more on the clinic's pricing model, the format and what monitoring is included than on whether the visit happens by video. We cover that in the cost section below and in <a href="/trt/articles/trt-cost">how much TRT costs</a>. For a shorter side-by-side, see <a href="/trt/articles/trt-clinic-vs-online">TRT clinic vs online</a>.</p>
<h3>Our view</h3>
<p>For a man with clear symptoms, two low morning tests, no complicating conditions and no near-term plans for children, a well-run online clinic offers the same medicine with less friction, and the evidence gives no reason to think the outcome will be worse. The value is lost when the convenience comes at the expense of the workup: a prescription on one reading, no LH, no fertility question, no plan to recheck hematocrit. The format of the visit matters less than the standard of the care.</p>`,
    },
    {
      heading: "Local TRT clinic or national telehealth platform: which gives better continuity of care?",
      body: `<p><strong>Either can give good continuity, and either can fail at it. What protects continuity is a named clinician you can reach, a written monitoring plan, your own copies of every lab result, and a backup route to an in-person exam if something comes up.</strong> National telehealth platforms are usually easier to stay with if you move or travel; local clinics and specialists are easier to see face to face and are not exposed to changes in federal telehealth prescribing rules.</p>
<h3>Why continuity matters more for TRT than for most prescriptions</h3>
<p>TRT is not a course of treatment that ends. MedlinePlus advises men using topical testosterone to "continue to use testosterone topical even if you feel well," not to stop without talking to a doctor, and warns that symptoms may return if they do stop. Source: ${ext(S.mpTop, "MedlinePlus, testosterone topical, last revised May 15, 2025")}. That means years of follow-up labs and decisions about the dose, the format and what to do if hematocrit or PSA rises. Each of those decisions is easier when the same clinician, or at least the same clinic with the same records, makes it. The 2021 telemedicine review notes that frequent follow-up "can be burdensome for patients, especially if it requires taking time off work and traveling long distances," and that this can lead to missed follow-up or stopping therapy; easier video follow-up could reduce the number of men lost to follow-up. Source: ${ext(S.dubinTele, "Dubin et al., 2021")}.</p>
<h3>How the two models compare on continuity</h3>
<table>
<thead><tr><th>Continuity question</th><th>Local clinic or specialist</th><th>National telehealth platform</th></tr></thead>
<tbody>
<tr><td>Will I see the same clinician?</td><td>Often, in a small practice</td><td>Varies; ask whether you get an assigned clinician or a rotating team</td></tr>
<tr><td>What if I move states?</td><td>You will usually need a new local prescriber</td><td>Often seamless if the platform is licensed in your new state; confirm before moving</td></tr>
<tr><td>Who examines me if I need it?</td><td>The clinic itself</td><td>Your own primary care doctor or a local clinic; the 2021 review recommends a local exam where an in-person one isn't possible</td></tr>
<tr><td>Who sees my wider health record?</td><td>Easier to coordinate with your other doctors in the same system</td><td>You may need to share results with your primary care doctor yourself</td></tr>
<tr><td>Exposure to telehealth rule changes</td><td>None</td><td>Depends on what replaces the DEA flexibility after December 31, 2026</td></tr>
</tbody>
</table>
<h3>The hybrid most experts describe</h3>
<p>The workflow proposed in the 2021 review is a useful template whichever route you choose. The authors recommend that the first evaluation be done in person by the prescribing physician if possible, or, if not, that the patient be examined by a local primary care provider "in conjunction with the initial telehealth consultation." After that, follow-up "should be performed via telemedicine, ideally through video visits," with the recommended labs done before each appointment, and telemedicine follow-up "can continue indefinitely" unless the patient asks for an in-person visit or develops a sign or symptom that needs a physical exam. The authors add that an exam by a primary care doctor "can ensure the patient has established primary care in his local community for the management of future issues or complications." Source: ${ext(S.dubinTele, "Dubin et al., 2021")}, read November 9, 2026.</p>
<p>In practice, that means a man on online TRT does well to keep a primary care doctor in the loop: share your baseline and follow-up labs, mention the treatment at every appointment, and know where you would go for an exam. If you would rather not depend on telehealth at all, our comparison of <a href="/trt/articles/trt-clinic-vs-online">TRT clinics vs online providers</a> covers the in-person route, and the guide to <a href="/trt/articles/online-trt-dea-deadline-2026">the December 31, 2026 DEA deadline</a> explains the regulatory risk for telehealth patients.</p>`,
    },
    {
      heading: "How do you find a legitimate TRT doctor online?",
      body: `<p><strong>Look for a clinic that tests before it prescribes, names the licensed clinician who makes the decision, explains the result, plans follow-up labs in writing, and is licensed to treat patients in your state. Then compare two or three such clinics on monitoring, format options and total cost.</strong> A search for "TRT doctor online" turns up dozens of names, and the differences that matter are rarely on the home page.</p>
<h3>A five-minute screening checklist</h3>
<ol>
<li><strong>Testing first.</strong> Does the clinic require blood tests before any prescription, and does it ask for early-morning samples? Both US guidelines require at least two low morning results before diagnosis.</li>
<li><strong>A real clinician.</strong> Is the prescribing decision made by a licensed clinician you can name and message, not an automated checkout?</li>
<li><strong>Your state.</strong> Telehealth prescribing is licensed state by state, and controlled-substance prescribing has its own rules. Confirm the clinic treats patients where you live.</li>
<li><strong>Monitoring included.</strong> Are follow-up labs and check-ins part of the plan, or extras sold later?</li>
<li><strong>Honest marketing.</strong> Does the clinic say who TRT is not for, mention fertility, and avoid promising results by a certain date?</li>
</ol>
<p>The 2021 review is pointed about why the clinic, not just the channel, matters. It describes for-profit "low T" clinics where TRT "is often prescribed without clear indications and without appropriate monitoring," and argues that telemedicine can widen access to fellowship-trained specialists so patients receive "safe, guideline-concordant, subspecialty care." Source: ${ext(S.dubinTele, "Dubin et al., 2021")}. In other words, a video visit can be the route to better care, not worse, if the person on the other end follows the guideline.</p>
<h3>Where to start</h3>
<p>Our <a href="/trt">online TRT clinic ranking</a> lists the providers we have reviewed in order, and each has a full review: <a href="/trt/reviews/hone">Hone Health</a>, <a href="/trt/reviews/tmates">TMates</a>, <a href="/trt/reviews/maleexcel">Male Excel</a>, <a href="/trt/reviews/taurus">Taurus Meds</a>, <a href="/trt/reviews/dudemeds">DudeMeds</a>, <a href="/trt/reviews/fridays">Fridays</a> and <a href="/trt/reviews/brightmeds">Brightmeds</a> among them. If you want a shortlist built around a particular need, we also publish the <a href="/trt/best-trt-for-beginners">best TRT for beginners</a>, the <a href="/trt/best-at-home-trt">best at-home TRT clinics</a> and the <a href="/trt/best-trt-for-fertility">best options for fertility-conscious men</a>. Our guide to <a href="/trt/articles/online-doctors-that-prescribe-testosterone">online doctors that prescribe testosterone</a> covers the legal side of who can prescribe.</p>
<h3>When an in-person specialist is the better first stop</h3>
<p>Some situations call for a urologist or endocrinologist in person before, or instead of, an online clinic: a very low testosterone with a low LH, especially with headaches or vision changes (which raise the question of the pituitary); a history of prostate or breast cancer; a recent heart attack or stroke; untreated sleep apnea; or active plans to have children. Our <a href="/trt/articles/how-low-testosterone-is-diagnosed">diagnosis guide</a> explains why each of these changes the workup. A good online clinic will tell you so itself and refer you on.</p>`,
    },
    {
      heading: "What are the onboarding steps at an online testosterone clinic?",
      body: `<p><strong>Most online TRT clinics follow the same five steps: an online health questionnaire, baseline blood tests, a consultation with a licensed clinician, a prescription and delivery if treatment is appropriate, and a schedule of follow-up labs and check-ins.</strong> The order and the details vary by clinic, but a legitimate one never skips the labs or the clinician.</p>
<p>The three providers we rank highest all describe this sequence in their own terms. Hone Health's process, as we document it in our review, is to test your levels, have a licensed clinician review the results and symptoms, and then arrange treatment with "follow-up bloodwork and dose adjustments over time." TMates runs lab testing, a clinician review, then treatment managed through the membership "with ongoing check-ins and adjustments." Male Excel starts with at-home testing, then a clinician review, then treatment "with ongoing monitoring and follow-up over time." See our reviews of <a href="/trt/reviews/hone">Hone Health</a>, <a href="/trt/reviews/tmates">TMates</a> and <a href="/trt/reviews/maleexcel">Male Excel</a>.</p>
<h3>Step by step</h3>
<ol>
<li><strong>Health questionnaire.</strong> Expect questions on symptoms (sexual desire, morning erections, energy, mood), medical history, medications including opioids and steroids, past testosterone or anabolic steroid use, sleep and snoring, heart and urinary history, and whether you want children. Answer the fertility question honestly; it changes what is safe to prescribe.</li>
<li><strong>Baseline labs.</strong> A home collection kit or a requisition for a local lab. The panel should include total testosterone on at least two early-morning samples, and usually LH and FSH, a blood count (hematocrit), and PSA if you are over 40. The next section covers the panel in full.</li>
<li><strong>Clinician consultation.</strong> A licensed clinician reviews your results and history, by video or, at some clinics, by secure messaging. They should explain what kind of low testosterone you have, if any, and whether something reversible should be addressed first.</li>
<li><strong>Prescription and delivery.</strong> If treatment is appropriate, the clinician prescribes a format, and the medicine and any supplies are shipped. Some injectable products require training; MedlinePlus says your healthcare provider will show you how to inject subcutaneous testosterone, and that the first dose of that product is given in the doctor's office. Source: ${ext(S.mpInj, "MedlinePlus, testosterone injection")}.</li>
<li><strong>Follow-up.</strong> A first recheck of testosterone, hematocrit and symptoms within the first few months, then regular monitoring. The 2021 review describes AUA follow-up appointments as typically recommended at first "2–4 weeks after starting TRT and subsequently every 6–12 months." Source: ${ext(S.dubinTele, "Dubin et al., 2021")}.</li>
</ol>
<h3>How long it takes</h3>
<p>We don't publish timeframes for individual clinics because they change with demand and lab turnaround. What usually slows men down is the guideline itself: a second morning test, a retest after an illness or a bad week of sleep, or a referral when LH or prolactin is unusual. Those delays are features, not bugs. Our guides to <a href="/trt/articles/how-to-get-trt-online">how to get TRT online</a> and <a href="/trt/articles/easiest-way-to-get-trt-online">the easiest way to get TRT online</a> cover the practical side of moving through the steps quickly without cutting corners.</p>
<h3>What to have ready</h3>
<ul>
<li>A list of your current medicines and supplements, including anything for pain, sleep or mood.</li>
<li>Any previous testosterone results, with the time of day they were taken.</li>
<li>Your most recent blood count, PSA and blood pressure, if you have them.</li>
<li>A short written note of your symptoms and how long you have had them, so you can compare at your first follow-up.</li>
<li>Your plans, if any, for children in the next few years.</li>
</ul>`,
    },
    {
      heading: "Which baseline lab tests should come before an online TRT prescription?",
      body: `<p><strong>Before a first prescription, a careful clinic orders total testosterone on at least two early-morning samples, LH and usually FSH, a blood count with hematocrit, and PSA in men over 40, plus free testosterone and SHBG when the total is borderline, prolactin when LH is low, and estradiol if you have breast symptoms.</strong> Each test either confirms the diagnosis, identifies the cause, or tells the clinician whether treatment is safe to start.</p>
<table>
<thead><tr><th>Test</th><th>Why it is done</th><th>Guideline rule</th></tr></thead>
<tbody>
<tr><td>Total testosterone, two early-morning samples</td><td>Confirms the low level; one result can be low by chance</td><td>AUA: two measurements on separate occasions, both early morning, with 300 ng/dL as a reasonable cut-off. Endocrine Society: at least two early-morning, fasting tests</td></tr>
<tr><td>Free testosterone and SHBG</td><td>Shows the unbound hormone when binding protein is unusual</td><td>Endocrine Society: when total is near the lower limit or SHBG is likely altered</td></tr>
<tr><td>LH and FSH</td><td>Separates testicular (primary) from pituitary or hypothalamic (secondary) causes</td><td>AUA: LH in men with low testosterone. Endocrine Society: LH and FSH</td></tr>
<tr><td>Prolactin</td><td>Screens for a prolactin-related pituitary problem</td><td>AUA: when testosterone is low and LH is low or low-normal</td></tr>
<tr><td>Hemoglobin and hematocrit</td><td>Testosterone raises red cell mass; sets a baseline</td><td>AUA: measure before starting; its follow-up table aims for a pre-treatment hematocrit below 50%. Endocrine Society: don't start with an elevated hematocrit</td></tr>
<tr><td>PSA</td><td>Excludes a prostate cancer diagnosis before treatment</td><td>AUA: men over 40. Endocrine Society: men 55 to 69, and 40 to 69 at increased risk, who choose monitoring</td></tr>
<tr><td>Estradiol</td><td>Baseline in men with breast symptoms</td><td>AUA: in men with breast symptoms or gynecomastia</td></tr>
<tr><td>Blood pressure</td><td>Testosterone can raise it</td><td>FDA's 2025 class-wide warning on blood pressure increases</td></tr>
</tbody>
</table>
<p>Sources: ${ext(S.aua, "AUA guideline")}; ${ext(S.auaTable7, "AUA follow-up laboratory testing table")}; ${ext(S.esGuideline, "Endocrine Society guideline, 2018")}; ${ext(S.esStatement, "Endocrine Society statement, July 2026")}; ${ext(S.fdaLabel, "FDA, February 28, 2025")}. The guideline rows are as summarized in our <a href="/trt/articles/how-low-testosterone-is-diagnosed">diagnosis guide</a>, which explains each test at length.</p>
<h3>The two tests most often skipped</h3>
<p>The repeat morning test and LH are the ones that most often go missing, and both are hard to recover later. The repeat matters because a single reading can be low because of the time of day, a meal, a bad night's sleep or an infection. LH matters because once a man starts testosterone, his own LH and FSH fall, so the result taken after treatment has begun tells you very little about the original cause; it can only be measured cleanly once. If an online clinic offers to start treatment without either, ask why.</p>
<h3>Fertility is part of the baseline</h3>
<p>It is not a blood test, but the fertility question belongs on this list. The AUA recommends that men with testosterone deficiency who are interested in fertility have a reproductive health evaluation before treatment, and that exogenous testosterone not be prescribed to men currently trying to conceive. Source: ${ext(S.aua, "AUA guideline")}, as summarized in our diagnosis guide. A semen analysis before treatment may make sense for some men; ask.</p>
<h3>Bringing results you already have</h3>
<p>Some clinics accept labs you have already had done. DudeMeds, for example, accepts at-home or uploaded labs, according to our <a href="/trt/reviews/dudemeds">DudeMeds review</a>. If you bring your own, check that the testosterone results were early-morning samples, that they are recent, and that LH, a blood count and (by age) PSA are included. Our guide to <a href="/trt/articles/trt-blood-work">TRT blood work</a> explains what each marker means on your report, and <a href="/trt/articles/normal-testosterone-levels-by-age">normal testosterone levels by age</a> explains the reference ranges.</p>`,
    },
    {
      heading: "At-home test kit or lab draw: does it change the result?",
      body: `<p><strong>The collection method matters less than the conditions: whichever you use, the sample for diagnosis should be taken early in the morning, ideally fasting, analyzed by a named laboratory, and repeated on a separate day.</strong> A home kit used in the afternoon after lunch is not a diagnostic sample, and neither is a lab draw taken at the same time.</p>
<h3>Why time of day matters</h3>
<p>Testosterone follows a daily rhythm. In a 2009 study of 66 men aged 30 to 80, Brambilla and colleagues found testosterone at 4 p.m. ran roughly 20% to 25% below the 8 a.m. level in men aged 30 to 40, with the gap narrowing to about 10% by age 70; some men with an afternoon reading below 300 ng/dL had normal morning levels. Source: ${ext(S.brambilla09, "Brambilla et al., JCEM, 2009")}, as described in our diagnosis guide. The British Society for Sexual Medicine's guideline recommends measuring between 7 and 11 a.m. on at least two occasions. Source: ${ext(S.bssm, "BSSM guideline")}.</p>
<h3>Why fasting matters</h3>
<p>In a study by Caronia and colleagues, a standard 75-gram glucose drink cut mean testosterone by about 25% in 74 men, and 15% of the men with normal levels dropped into the low range at some point during the two hours. The authors concluded that men with a low non-fasting result should be retested fasting. Source: ${ext(S.caronia, "Caronia et al., Clinical Endocrinology, 2013")}. A glucose drink is not a breakfast, but the direction of the effect is why the Endocrine Society specifies fasting morning samples.</p>
<h3>Why the laboratory and assay matter</h3>
<p>The Endocrine Society's July 2026 statement warns that "non-standardized assays mean the same blood sample can read 'low' or 'normal,' depending on the lab and method," and says many testosterone assays "are inaccurate, yield widely variable results, and have improper normal (reference) ranges." It recommends assays certified by the CDC's Hormone Standardization (HoST) program, which "ensures that the assays have been standardized and 'harmonized.'" Source: ${ext(S.esStatement, "Endocrine Society statement, July 16, 2026")}, read November 9, 2026.</p>
<h3>Practical rules for home kits</h3>
<ul>
<li><strong>Collect early.</strong> Do the kit soon after waking, before about 10 a.m., and before eating.</li>
<li><strong>Write down the time.</strong> If the kit form has a time box, fill it in accurately; the clinician needs it to interpret the result.</li>
<li><strong>Ask which laboratory runs it</strong> and whether its testosterone method is CDC HoST-certified. A clinic should be able to tell you.</li>
<li><strong>Don't test while ill.</strong> Acute illness can lower testosterone temporarily; repeat once you have recovered.</li>
<li><strong>Repeat on a different day</strong> under the same conditions before anyone diagnoses you.</li>
</ul>
<p>Home kits are convenient and, used correctly, they are a perfectly reasonable part of online TRT. Several of the clinics we review are built around them; Male Excel, for example, offers what our review describes as "comprehensive at-home lab testing." Source: our <a href="/trt/reviews/maleexcel">Male Excel review</a>. The rules above are what make the convenience safe. For more on the at-home route, see the <a href="/trt/best-at-home-trt">best at-home TRT clinics</a>.</p>`,
    },
    {
      heading: "What happens in your first online TRT consultation?",
      body: `<p><strong>In the first online consultation, a licensed clinician goes through your symptoms, history and lab results with you, explains whether you meet the criteria for testosterone deficiency and why, discusses the risks and benefits of treatment and of the telehealth route, and, if TRT is appropriate, agrees a format and a monitoring plan with you.</strong> It is usually a video visit, though some clinics use phone or secure messaging for parts of it.</p>
<h3>What the clinician should cover</h3>
<ul>
<li><strong>Your results, in plain English.</strong> Both morning testosterone values, what the reference range on your report means, and whether free testosterone or SHBG changes the picture.</li>
<li><strong>The likely cause.</strong> Whether LH and FSH point to a testicular or a pituitary-hypothalamic cause, and whether anything reversible, such as weight, sleep apnea, opioids or a recent illness, should be addressed first.</li>
<li><strong>Safety checks.</strong> Your hematocrit, PSA (by age), blood pressure, heart history, urinary symptoms and sleep, and whether any of them rule treatment out for now.</li>
<li><strong>Fertility.</strong> Whether you want children, now or later, and what testosterone would do to sperm production.</li>
<li><strong>Options.</strong> The formats available, and alternatives to testosterone where they fit.</li>
<li><strong>The plan.</strong> When your next labs are due, what will be checked, and what happens if a result is out of range.</li>
</ul>
<h3>Shared decision-making, not a sales call</h3>
<p>The 2021 telemedicine review recommends that "shared decision-making should be performed at the time of initial consultation regarding the indications for, risks and benefits of initiation of TRT itself, as well as the risks and benefits of the telemedicine approach to TRT management." It also notes that "many men may choose not to pursue a telehealth approach," and that men opting for testosterone pellets "will not be eligible for exclusive telemedicine follow-up." Source: ${ext(S.dubinTele, "Dubin et al., 2021")}, read November 9, 2026. A good first consultation therefore includes the possibility that the answer is "not yet" or "not online."</p>
<h3>What a questionnaire can and can't do</h3>
<p>Many clinics start with a symptom questionnaire. It is useful as a checklist, but the AUA does not recommend formal validated questionnaires for managing testosterone deficiency, and the 2021 review advises that history-taking follow the clinician's usual practice. Source: ${ext(S.dubinTele, "Dubin et al., 2021")}. A high questionnaire score is a reason to test properly, not a reason to treat.</p>
<h3>Video, phone or messages?</h3>
<p>The review recommends that follow-up be done "ideally through video visits." For the first consultation, video has obvious advantages: the clinician can see you, and you can ask questions in real time. Some platforms handle intake asynchronously, through forms and messages, with a video call only if needed. If you prefer to talk to someone, ask before you sign up whether a live visit is included. The temporary federal rule in force through December 31, 2026 lets DEA-registered clinicians prescribe Schedule II to V drugs, testosterone included, ${ext(S.hklaw, "through audio-video telemedicine with no prior in-person visit")}; see the DEA section below and our <a href="/trt/articles/online-trt-dea-deadline-2026">DEA deadline guide</a>.</p>`,
    },
    {
      heading: "What should you ask in your first online TRT consultation?",
      body: `<p><strong>Ask what your results mean, why the clinician thinks TRT is or isn't right for you, what the alternatives are, what monitoring is planned, what it will cost all-in, and what happens to your care if the telehealth rules change.</strong> A good clinician will be glad you asked. Write the answers down.</p>
<h3>About the diagnosis</h3>
<ol>
<li>Were both of my testosterone samples taken in the early morning, and was I fasting?</li>
<li>Which laboratory ran them, and is its assay CDC HoST-certified?</li>
<li>Do I have primary or secondary low testosterone, based on my LH and FSH?</li>
<li>Is anything reversible, such as weight, sleep, a medicine or a recent illness, likely to be lowering my levels?</li>
<li>Would you expect my symptoms to improve on treatment, and which ones?</li>
</ol>
<h3>About safety</h3>
<ol start="6">
<li>What was my baseline hematocrit, and at what level would you change or pause treatment?</li>
<li>Do I need a PSA, and when will it be rechecked?</li>
<li>Do I need a sleep apnea assessment before starting?</li>
<li>How will my blood pressure be monitored?</li>
<li>What should prompt me to contact you urgently?</li>
</ol>
<h3>About fertility and alternatives</h3>
<ol start="11">
<li>How will testosterone affect my sperm count, and is it reversible for me?</li>
<li>Should I have a semen analysis first?</li>
<li>Am I a candidate for a treatment that raises my own testosterone instead, and is that use off-label?</li>
</ol>
<h3>About the service</h3>
<ol start="14">
<li>Who is my prescribing clinician, and how do I reach them between visits?</li>
<li>When are my follow-up labs, and are they included in the price?</li>
<li>What is the total monthly cost, including medicine, labs, visits and supplies?</li>
<li>Do you bill insurance, or can labs be run through my insurance?</li>
<li>How do I pause or cancel, and will you give me my records?</li>
<li>What is your plan if the DEA telehealth rules change on January 1, 2027?</li>
<li>Can you arrange an in-person exam in my area if I need one?</li>
</ol>
<p>The same list works as a way to compare clinics before you sign up: send the service questions to two or three clinics and see who answers clearly. Our guide to <a href="/trt/articles/best-online-trt-clinics-compared">the best online TRT clinics compared</a> shows how the main options stack up, and <a href="/trt/articles/is-trt-safe">is TRT safe?</a> gives the background for the safety questions.</p>`,
    },
    {
      heading: "Which TRT formats can you get through an online clinic?",
      body: `<p><strong>Online clinics mostly prescribe formats you can use at home: self-injected testosterone, gels or other topicals, and in some cases oral products. Formats that need a clinician to give them, such as pellets and the long-acting injection testosterone undecanoate, need an in-person visit.</strong> The FDA lists the approved testosterone formulations as oral, topical gel, transdermal patch, buccal system (applied to the upper gum or inner cheek) and injection. Source: ${ext(S.fdaLabel, "FDA, February 28, 2025")}, read November 9, 2026.</p>
<h3>TRT formats compared</h3>
<table>
<thead><tr><th>Format</th><th>How it's used</th><th>What the patient information highlights</th><th>Online-friendly?</th></tr></thead>
<tbody>
<tr><td>Intramuscular injection (for example testosterone cypionate)</td><td>Injected into a muscle; MedlinePlus describes injection by a doctor or nurse in an office or clinic, and many men are taught to self-inject</td><td>Injection-site pain, redness or bruising among common side effects</td><td>Usually, once you've been taught; the 2021 review notes some men may need an in-person demonstration first</td></tr>
<tr><td>Subcutaneous injection</td><td>Injected under the skin once a week by the patient or a caregiver, per MedlinePlus</td><td>MedlinePlus says the first dose of this product is given in the doctor's office</td><td>Yes, after the first supervised dose</td></tr>
<tr><td>Testosterone undecanoate injection (Aveed)</td><td>Given by a doctor or nurse in a healthcare setting</td><td>Can cause serious breathing problems and allergic reactions; you must stay at least 30 minutes afterwards; available only through a special REMS program</td><td>No; requires an in-person visit</td></tr>
<tr><td>Gel or solution (topical)</td><td>Applied to the skin once a day in the morning</td><td>Can harm women and children who touch treated skin; cover the area and wash hands; flammable until dry</td><td>Yes</td></tr>
<tr><td>Transdermal patch</td><td>Worn on the skin</td><td>Listed by the FDA and MedlinePlus as an approved form</td><td>Yes</td></tr>
<tr><td>Buccal system</td><td>Applied to the upper gum or inner cheek</td><td>Listed by the FDA as an approved form</td><td>Yes</td></tr>
<tr><td>Oral testosterone</td><td>Taken by mouth</td><td>Listed by the FDA as an approved form; the FDA says premarket blood pressure studies of an oral and a subcutaneous product first raised the blood pressure concern behind its 2025 warning</td><td>Yes</td></tr>
<tr><td>Pellets</td><td>Implanted under the skin by a doctor or nurse in an office or clinic</td><td>Requires a minimally invasive in-office procedure, per the 2021 review</td><td>No; men choosing pellets are not eligible for telemedicine-only follow-up, per the review</td></tr>
</tbody>
</table>
<p>Sources: ${ext(S.mpInj, "MedlinePlus, testosterone injection")}; ${ext(S.mpTop, "MedlinePlus, testosterone topical")}; ${ext(S.mpHypo, "MedlinePlus, hypogonadism")}; ${ext(S.fdaLabel, "FDA, February 2025")}; ${ext(S.dubinTele, "Dubin et al., 2021")}, all read November 9, 2026.</p>
<h3>What about creams?</h3>
<p>Several online clinics offer a testosterone cream; Male Excel, for example, offers injections or cream, according to our <a href="/trt/reviews/maleexcel">Male Excel review</a>. Notice that "cream" is not on the FDA's list of approved formulations, which names gels, patches, buccal systems, oral products and injections. So if a clinic offers a cream, ask whether it is an FDA-approved product or one prepared (compounded) by a pharmacy, which pharmacy makes it, how its strength is checked, and how the monitoring plan accounts for it. The same transfer precautions that apply to gels apply to any testosterone you put on your skin.</p>
<h3>What the format changes</h3>
<p>The format affects how steady your levels are between doses, how you time your monitoring blood draw, the side effects you are most likely to notice, and whether anyone at home needs to take precautions. It does not change the need for monitoring: every format can raise hematocrit, and the FDA's 2025 action concluded that the blood pressure increase is class-wide, across all testosterone products. Source: ${ext(S.fdaLabel, "FDA, February 2025")}. For deeper comparisons, see <a href="/trt/articles/types-of-trt">types of TRT</a>, <a href="/trt/articles/testosterone-injections-vs-cream-vs-oral">injections vs cream vs oral</a> and <a href="/trt/articles/testosterone-cypionate-vs-enanthate">testosterone cypionate vs enanthate</a>.</p>`,
    },
    {
      heading: "How do people choose between injections, gels and creams?",
      body: `<p><strong>The choice comes down to how you feel about needles, how steady you want your levels, whether anyone at home could touch treated skin, what your clinic offers, and cost. Your clinician weighs those preferences against your labs and history and makes the prescribing decision.</strong> There is no single best format, and many men change format at least once.</p>
<h3>The practical trade-offs</h3>
<ul>
<li><strong>Needles.</strong> Injections mean a needle on a regular schedule, which some men find routine within weeks and others never get used to. Topicals avoid needles entirely but are a daily job.</li>
<li><strong>Household contact.</strong> MedlinePlus warns that topical testosterone "may harm women and children who touch your skin where it has been applied," and gives detailed precautions: let it dry, cover the area with clothing, wash your hands, and wash the area before skin-to-skin contact. It lists signs to watch for in a woman (new hair growth, acne) or a child (enlarged genitals, pubic hair growth, increased erections or sexual desire, aggressive behavior). Source: ${ext(S.mpTop, "MedlinePlus, testosterone topical")}, read November 9, 2026. For a man with young children or a pregnant partner, that can tip the decision towards injections.</li>
<li><strong>Daily rhythm.</strong> MedlinePlus describes topical gel or solution as applied once a day in the morning, after a bath or shower. Missing doses makes levels less predictable.</li>
<li><strong>Skin.</strong> Dry or itchy skin, redness and irritation are among the side effects MedlinePlus lists for topicals.</li>
<li><strong>Injection sites.</strong> Pain, redness, bruising, bleeding or hardness at the injection site are among the common side effects MedlinePlus lists for injections. Source: ${ext(S.mpInj, "MedlinePlus, testosterone injection")}.</li>
<li><strong>Monitoring timing.</strong> Injections and topicals produce different patterns across the dosing interval, so your prescriber will tell you when to draw blood on treatment. The morning-and-fasting rule is for diagnosis; on treatment, timing relative to the dose matters more.</li>
</ul>
<h3>How the evidence frames it</h3>
<p>We are not aware of guidance that names one format as best for all men, and the guidelines leave the choice to the clinician and patient. One data point: in the ENDO 2026 chart review of men starting testosterone in an academic health system, the most common first prescription was a topical product (68.5%). That reflects one health system's habits, not a recommendation. Source: ${ext(S.endo26PR, "Endocrine Society, ENDO 2026 press release")}.</p>
<h3>What online clinics tend to offer</h3>
<p>Among the providers we review, DudeMeds focuses on injectable testosterone cypionate and also offers enclomiphene; Male Excel offers injections or cream; Maximus is notable for oral protocol options alongside more traditional approaches; and Brightmeds offers its own testosterone formula. Hone Health and TMates describe a clinician-directed format, chosen after your review. Sources: our reviews of <a href="/trt/reviews/dudemeds">DudeMeds</a>, <a href="/trt/reviews/maleexcel">Male Excel</a>, <a href="/trt/reviews/maximus">Maximus</a>, <a href="/trt/reviews/brightmeds">Brightmeds</a>, <a href="/trt/reviews/hone">Hone Health</a> and <a href="/trt/reviews/tmates">TMates</a>. If a particular format matters to you, confirm a clinic offers it before you pay for labs. Our guide to <a href="/trt/articles/testosterone-injections-vs-gel">testosterone injections vs gel</a> goes deeper on the two most common choices.</p>`,
    },
    {
      heading: "What does an online TRT membership usually include?",
      body: `<p><strong>Most online TRT is sold as a program or membership with a recurring fee that, depending on the plan, bundles clinician visits, follow-up labs, the medication, supplies and shipping. What is included varies widely, so compare the inclusions, not just the headline price.</strong> The cheapest-looking plan can become the most expensive once labs and follow-up visits are added back in.</p>
<h3>How the leading providers describe their model</h3>
<p>Our reviews describe the three highest-ranked providers' pricing models in general terms; none publishes a single fixed price we could verify, so confirm current pricing on each clinic's site.</p>
<ul>
<li><strong>Hone Health</strong>: programs like Hone's "typically bundle an initial testing/diagnostic step with an ongoing monthly or membership fee that covers clinician oversight, follow-up labs and the medication," with exact costs depending on the format and how often you are monitored.</li>
<li><strong>TMates</strong>: a membership-style program with an ongoing monthly fee that "bundles clinician oversight, monitoring and, depending on the plan, testing and medication."</li>
<li><strong>Male Excel</strong>: starts with at-home labs and a provider consultation, then an ongoing treatment plan if TRT is prescribed, with unlimited provider follow-ups.</li>
</ul>
<p>Sources: our reviews of <a href="/trt/reviews/hone">Hone Health</a>, <a href="/trt/reviews/tmates">TMates</a> and <a href="/trt/reviews/maleexcel">Male Excel</a>.</p>
<h3>The inclusion checklist</h3>
<table>
<thead><tr><th>Item</th><th>Why it matters</th><th>Question to ask</th></tr></thead>
<tbody>
<tr><td>Initial labs</td><td>Both morning tests plus LH, blood count and PSA by age</td><td>Does the first panel include a second morning test and LH?</td></tr>
<tr><td>Follow-up labs</td><td>Testosterone, hematocrit and PSA rechecks are part of safe treatment</td><td>How many follow-up panels a year are included?</td></tr>
<tr><td>Clinician visits</td><td>Dose and format decisions need a clinician</td><td>Are follow-up visits included, and are they video or messages?</td></tr>
<tr><td>Medication</td><td>The largest recurring cost</td><td>Is the medicine included, and does the price change with the dose or format?</td></tr>
<tr><td>Supplies and shipping</td><td>Syringes, needles, sharps disposal</td><td>Are supplies and shipping included?</td></tr>
<tr><td>Add-on medicines</td><td>Some clinics sell extras alongside testosterone</td><td>What is each add-on for, and is it in the guideline?</td></tr>
<tr><td>Commitment</td><td>TRT is long-term, but you should be able to stop</td><td>Is there a minimum term, and how do I pause or cancel?</td></tr>
</tbody>
</table>
<h3>A note on add-ons</h3>
<p>Some memberships bundle medicines alongside testosterone. Ask what each one is for and whether the guidelines support it for you. For example, the AUA recommends measuring estradiol in men with breast symptoms or gynecomastia rather than in every man, which is a narrower approach than some clinics' marketing of routine estrogen "management." Source: ${ext(S.auaTable7, "AUA follow-up laboratory testing table")}. Our guide to <a href="/trt/articles/trt-and-estrogen">TRT and estrogen</a> explains where the evidence is thin.</p>
<h3>Watch-outs from the research</h3>
<p>The 2021 telemedicine review noted that many for-profit "low T" clinics "offer fee-based membership plans for TRT and offer only limited treatment options for hypogonadal men, potentially depriving patients of alternative treatment options." Source: ${ext(S.dubinTele, "Dubin et al., 2021")}. A membership is not a problem in itself; a membership that only sells one answer is. The best programs include monitoring as standard, offer more than one format, and will discuss alternatives such as fertility-sparing options when they fit.</p>`,
    },
    {
      heading: "How much does online TRT cost, and does insurance help?",
      body: `<p><strong>Online TRT costs depend on the pricing model, the format, how much lab work and follow-up is included, and whether any part is billed to insurance. Because treatment usually continues for years, the useful number is the all-in cost per year, including labs, not the first-month promotion.</strong> We do not quote prices for the clinics we rank highest because they do not publish a single fixed price we could verify; our <a href="/trt/articles/trt-cost">TRT cost guide</a> and <a href="/trt/cheapest-online-trt">cheapest online TRT</a> page cover published prices where we have verified them.</p>
<h3>The parts of the bill</h3>
<ol>
<li><strong>Initial testing.</strong> At-home kits or lab requisitions for the baseline panel, sometimes bundled with the first consultation.</li>
<li><strong>Clinician time.</strong> The first consultation and follow-up visits, often folded into a monthly fee.</li>
<li><strong>Medication.</strong> Varies by format and dose; ask whether your price changes if your dose does.</li>
<li><strong>Supplies and shipping.</strong> Syringes, needles and sharps containers for injections.</li>
<li><strong>Follow-up labs.</strong> Several panels in the first year, then regular monitoring after that.</li>
<li><strong>Add-ons.</strong> Any extra medicines bundled into higher tiers.</li>
</ol>
<h3>Insurance</h3>
<p>Insurance coverage for TRT depends on your plan, the diagnosis, the format and whether the clinic bills insurance at all. Many online clinics work on a self-pay membership model; some let you run lab work through your own insurance or bring results from your own doctor. Telehealth reimbursement itself has been uneven: the 2021 review notes that "inconsistencies among payers and states in reimbursement schedules for telemedicine remain a major issue." Source: ${ext(S.dubinTele, "Dubin et al., 2021")}. Our guide to <a href="/trt/articles/is-trt-covered-by-insurance">whether TRT is covered by insurance</a> goes through the questions to ask your insurer.</p>
<h3>How to compare costs fairly</h3>
<ul>
<li><strong>Annualize it.</strong> Multiply the monthly fee by twelve and add any labs, visits or supplies billed separately.</li>
<li><strong>Match the inclusions.</strong> A plan that includes follow-up labs is not comparable with one that does not.</li>
<li><strong>Count the alternative.</strong> If you have insurance and a local doctor willing to prescribe, the cash price of a telehealth membership competes with copays, deductibles and the cost of your time and travel. The review cites studies estimating patient savings from avoided travel and time off of $888 per visit on average in one practice, driven by patients who lived very far away, and $124 per visit in another. Source: ${ext(S.dubinTele, "Dubin et al., 2021")}.</li>
<li><strong>Price the exit.</strong> Check for minimum terms and cancellation fees.</li>
</ul>
<h3>Value is not only price</h3>
<p>The cheapest plan is good value only if it includes the monitoring that keeps treatment safe. Hone Health's review lists a fair con: "a comprehensive program usually costs more than a bare-bones prescription service." That is the trade most men are making when they compare online TRT clinics: more monitoring and support for more money, or less of both for less. Our <a href="/trt/hone-health-alternatives">Hone Health alternatives</a> page compares the field on exactly that trade-off.</p>`,
    },
    {
      heading: "How do the top online TRT providers compare?",
      body: `<p><strong>Our three highest-ranked online TRT providers are Hone Health, TMates and Male Excel. All three build treatment around lab testing and a licensed clinician's review, with ongoing monitoring; they differ mainly in focus, how they package care, and the formats on offer.</strong> The comparison below uses only facts from our verified reviews, and the ranking is the one on our <a href="/trt">online TRT clinic ranking</a>.</p>
<table>
<thead><tr><th></th><th>Hone Health</th><th>TMates</th><th>Male Excel</th></tr></thead>
<tbody>
<tr><td>Our rank</td><td>1</td><td>2</td><td>3</td></tr>
<tr><td>Model</td><td>End-to-end program: at-home hormone testing plus physician-guided therapy, managed through telehealth</td><td>TRT-focused telehealth membership built around lab testing, clinician visits and ongoing monitoring</td><td>Established men's-health telehealth brand with TRT as a core service</td></tr>
<tr><td>Testing</td><td>Begins with lab testing to confirm whether testosterone is clinically low</td><td>Includes lab testing and a licensed-clinician review</td><td>Comprehensive at-home lab testing</td></tr>
<tr><td>Who prescribes</td><td>Licensed clinician, after reviewing results and symptoms</td><td>Licensed clinician, after reviewing labs and symptoms</td><td>Licensed clinician, after reviewing results and symptoms</td></tr>
<tr><td>Formats</td><td>Clinician-directed format</td><td>Clinician-directed</td><td>Commonly injections (testosterone cypionate) or a testosterone cream</td></tr>
<tr><td>Ongoing care</td><td>Follow-up bloodwork and dose adjustments; support for long-term therapy</td><td>Ongoing check-ins, monitoring and dose management, support built in</td><td>Unlimited provider follow-ups and ongoing monitoring</td></tr>
<tr><td>Main strength</td><td>Testing-first model; diagnosis, treatment and monitoring in one connected program</td><td>Dedicated TRT focus; testing, prescribing and monitoring in one membership</td><td>Established, recognizable brand; choice of formats</td></tr>
<tr><td>Main caveat</td><td>A comprehensive program usually costs more than a bare-bones prescription service</td><td>Membership pricing is an ongoing commitment; narrower focus than a broad men's-health platform</td><td>Confirm exactly what testing and monitoring each plan includes</td></tr>
<tr><td>Best for</td><td>Men who want testing and treatment in one place, with ongoing monitoring</td><td>Men who specifically want a TRT-focused program and are comfortable with a membership</td><td>Men who want an established provider and a choice of formats</td></tr>
</tbody>
</table>
<p>Sources: our reviews of <a href="/trt/reviews/hone">Hone Health</a>, <a href="/trt/reviews/tmates">TMates</a> and <a href="/trt/reviews/maleexcel">Male Excel</a>, last updated September 14, 2026. Confirm current formats and pricing on each provider's own site.</p>
<h3>Why this order</h3>
<p>Hone Health leads because its model treats TRT the way the guidelines describe: a diagnosis backed by lab testing, a clinician's decision, and ongoing monitoring, all in one program. TMates is close behind for men who want a program built entirely around testosterone therapy. Male Excel is a credible alternative for men who prefer a well-known brand and want to choose between injections and cream. All three share the cautions that apply to any TRT: it is long-term, it needs regular bloodwork, and it can suppress fertility.</p>
<h3>Head-to-head comparisons</h3>
<p>If you are deciding between two of them, our head-to-heads go category by category: <a href="/trt/hone-vs-tmates">Hone vs TMates</a>, <a href="/trt/hone-vs-maleexcel">Hone vs Male Excel</a> and <a href="/trt/tmates-vs-maleexcel">TMates vs Male Excel</a>.</p>
<p>Our three highest-ranked online TRT providers are below.</p>`,
    },
    {
      heading: "Which online TRT provider fits which kind of patient?",
      body: `<p><strong>The right provider depends on what you value most: an all-in-one testing-to-treatment program, a TRT-only membership, an established brand with format choice, a fertility-sparing option, or a particular format.</strong> Here is how the providers we review map to the most common priorities, using only what our reviews verify.</p>
<table>
<thead><tr><th>If you mainly want...</th><th>Start by comparing</th><th>Why, from our reviews</th></tr></thead>
<tbody>
<tr><td>Testing and treatment handled in one place, with long-term monitoring</td><td><a href="/trt/reviews/hone">Hone Health</a></td><td>Testing-first model; diagnosis, treatment and monitoring in one connected program</td></tr>
<tr><td>A program built only around TRT</td><td><a href="/trt/reviews/tmates">TMates</a></td><td>TRT-first membership with testing, prescribing and monitoring bundled</td></tr>
<tr><td>An established brand and a choice of injection or cream</td><td><a href="/trt/reviews/maleexcel">Male Excel</a></td><td>Established men's-health brand; injections or cream; unlimited provider follow-ups</td></tr>
<tr><td>Injectable TRT or enclomiphene, with the option to bring your own labs</td><td><a href="/trt/reviews/dudemeds">DudeMeds</a></td><td>Physician-founded; injectable testosterone cypionate and enclomiphene; at-home or uploaded labs</td></tr>
<tr><td>A broader men's-health platform</td><td><a href="/trt/reviews/taurus">Taurus Meds</a> or <a href="/trt/reviews/fridays">Fridays</a></td><td>Men's-health focus beyond TRT; lab-based diagnosis and licensed-clinician review</td></tr>
<tr><td>A clinic with its own testosterone formula</td><td><a href="/trt/reviews/brightmeds">Brightmeds</a></td><td>Online TRT after a licensed-clinician review, with its own formula</td></tr>
<tr><td>Oral protocol options</td><td><a href="/trt/reviews/maximus">Maximus</a></td><td>Notable for oral protocol options alongside traditional approaches, with at-home testing</td></tr>
</tbody>
</table>
<h3>Matching provider to life stage</h3>
<p><strong>If you are new to TRT</strong>, a program that includes monitoring as standard and a clinician you can reach takes the guesswork out of the first year; see the <a href="/trt/best-trt-for-beginners">best TRT for beginners</a>. <strong>If you might want children</strong>, raise it before anything is prescribed and look at clinics that offer fertility-sparing alternatives; see the <a href="/trt/best-trt-for-fertility">best TRT for fertility-conscious men</a> and our section on fertility below. <strong>If cost is the deciding factor</strong>, compare annual all-in costs with matching inclusions; see <a href="/trt/cheapest-online-trt">cheapest online TRT</a>.</p>
<h3>More head-to-heads</h3>
<p>We also compare <a href="/trt/hone-vs-dudemeds">Hone vs DudeMeds</a>, <a href="/trt/tmates-vs-dudemeds">TMates vs DudeMeds</a>, <a href="/trt/hone-vs-taurus">Hone vs Taurus</a>, <a href="/trt/hone-health-vs-maximus">Hone Health vs Maximus</a> and <a href="/trt/maximus-vs-hims">Maximus vs Hims</a>. Each one sets out where the two differ on testing, monitoring, formats and support.</p>
<h3>A fair word about every clinic on this list</h3>
<p>Each of these providers describes a process that starts with lab work and ends with a licensed clinician's decision, which is the right foundation. What we can't verify from the outside, clinic by clinic, is exactly which tests each orders at intake on a given day or how many morning samples each requires, and panels can change. That is why the question list earlier in this guide is worth sending to whichever clinic you choose. A good clinic will answer every item without hesitation.</p>`,
    },
    {
      heading: "Which blood markers are monitored on TRT, and how often?",
      body: `<p><strong>On TRT, the core monitoring markers are testosterone level, hematocrit (with hemoglobin) and, in men of screening age, PSA, plus blood pressure, symptoms and side effects. Both US guidelines put the first recheck at about 3 to 6 months after starting, with regular monitoring after that: annually under the Endocrine Society's schedule, and every 6 to 12 months for testosterone and hematocrit under the AUA's.</strong> Estradiol is checked when there are breast symptoms, not routinely in every man.</p>
<table>
<thead><tr><th>Marker</th><th>Endocrine Society (2018)</th><th>AUA (2018, validity confirmed 2024)</th><th>Action thresholds in the guidelines</th></tr></thead>
<tbody>
<tr><td>Symptoms, side effects, adherence</td><td>At 3 to 6 months, then annually</td><td>At follow-up visits; reassess benefit</td><td>No symptom benefit is a reason to review whether to continue</td></tr>
<tr><td>Testosterone level</td><td>At 3 to 6 months, then as part of annual review</td><td>Every 6 to 12 months; aim for the middle tertile of the normal range</td><td>Prescriber adjusts if out of target</td></tr>
<tr><td>Hematocrit</td><td>Baseline, 3 to 6 months, then annually</td><td>Baseline (aim below 50%), then every 6 to 12 months or sooner, to keep below 54%</td><td>Above 54%: stop or adjust until it falls, and look for causes</td></tr>
<tr><td>PSA and prostate</td><td>Men 55 to 69 (and 40 to 69 at increased risk) choosing monitoring: before, at 3 to 12 months, then standard screening</td><td>Baseline in men over 40, with follow-up as part of monitoring</td><td>Urology referral for a PSA rise above 1.4 ng/mL within 12 months, a confirmed PSA above 4 ng/mL, an abnormal exam, or worsening urinary symptoms</td></tr>
<tr><td>Estradiol</td><td>Not routine</td><td>If breast symptoms or gynecomastia develop</td><td>Clinical judgment</td></tr>
<tr><td>Blood pressure</td><td>Part of routine review</td><td>Part of routine review</td><td>FDA's 2025 class-wide blood pressure warning</td></tr>
<tr><td>Fertility plans</td><td>Revisit at each review</td><td>Discuss impact on sperm production</td><td>A change of plans means a change-of-treatment conversation</td></tr>
</tbody>
</table>
<p>Sources: ${ext(S.esGuideline, "Endocrine Society guideline, 2018")}; ${ext(S.aua, "AUA guideline")}; ${ext(S.auaTable7, "AUA follow-up laboratory testing table")}; ${ext(S.fdaLabel, "FDA, February 2025")}, as compiled in our <a href="/trt/articles/how-low-testosterone-is-diagnosed">diagnosis guide</a>.</p>
<h3>When the markers move</h3>
<p>The time course matters for reading your results. A 2011 review of published trials by Saad and colleagues in the European Journal of Endocrinology reported that testosterone's effect on red blood cell production is "evident at 3 months, peaking at 9–12 months," and that PSA and prostate volume "rise, marginally, plateauing at 12 months; further increase should be related to aging rather than therapy." Source: ${ext(S.saad, "Saad et al., Eur J Endocrinol, 2011 (PMC)")}, read November 9, 2026. So a hematocrit that is fine at three months can still climb during the first year, which is one reason monitoring continues.</p>
<h3>Hematocrit deserves the most attention</h3>
<p>A rising hematocrit is one of the main things TRT monitoring is designed to catch. The 2026 network meta-analysis in The Journal of Sexual Medicine, pooling 23 randomized trials in men with obesity and functional hypogonadism, found testosterone reduced waist circumference and increased lean mass but also increased hematocrit. Source: ${ext(S.nma, "Journal of Sexual Medicine, 2026")}. The 54% threshold is a stop-and-reassess line, not a target; if your level climbs towards it, expect your prescriber to act, by changing the dose or format, checking for sleep apnea, or pausing treatment.</p>
<h3>How this works online</h3>
<p>Monitoring is where online clinics differ most. Some include follow-up panels in the membership; others bill them separately or leave them to you. Before you start, ask for the schedule in writing. Our guide to <a href="/trt/articles/trt-blood-work">TRT blood work</a> explains each marker from the patient's side, and the section below covers how follow-up visits work by video.</p>`,
    },
    {
      heading: "How do follow-up video visits and ongoing reviews work?",
      body: `<p><strong>On online TRT, you usually do your follow-up labs first, then have a video or message review with a clinician who goes through the results, your symptoms and any side effects, and decides whether to keep, adjust or pause treatment.</strong> The 2021 telemedicine review describes these routine visits, with a lab review and a symptom check, as "perfectly designed and appropriate for telemedicine."</p>
<h3>The rhythm of follow-up</h3>
<p>The review describes AUA follow-up as typically recommended at first "2–4 weeks after starting TRT and subsequently every 6–12 months," and recommends that the routine labs be done "prior to each appointment" so the clinician can review them during the visit. It recommends video visits where possible, and says telemedicine follow-up "can continue indefinitely unless otherwise indicated." Source: ${ext(S.dubinTele, "Dubin et al., 2021")}, read November 9, 2026. The guideline monitoring schedule in the previous section sets which labs are drawn when.</p>
<h3>What a good follow-up covers</h3>
<ul>
<li><strong>Your levels</strong>: whether your testosterone is in the target range, given when the sample was drawn relative to your dose.</li>
<li><strong>Your safety markers</strong>: hematocrit, PSA (by age) and blood pressure, compared with baseline.</li>
<li><strong>Your symptoms</strong>: what has changed since you started, ideally compared with the notes you made at baseline.</li>
<li><strong>Side effects</strong>: skin, sleep, mood, breast tenderness, urinary symptoms, swelling.</li>
<li><strong>Fertility plans</strong>: whether anything has changed.</li>
<li><strong>Next steps</strong>: dose, format, and the date of the next labs.</li>
</ul>
<h3>When follow-up should move to an in-person visit</h3>
<p>The review lists the triggers for returning to an in-person appointment: "a patient request or any patient sign or symptom that requires a physical exam," which can be done by the TRT provider or a local primary care doctor. Examples a clinician might want to examine include a new breast lump or tenderness, testicular changes, leg swelling or pain, or new urinary problems. MedlinePlus lists symptoms that need a call to the doctor right away, including lower leg pain, swelling, warmth or redness; difficulty breathing, especially during sleep; erections that happen too often or last too long; urinary difficulty or blood in the urine; signs of liver problems; mood changes including depression or suicidal thoughts; and enlarged or painful breasts. Source: ${ext(S.mpInj, "MedlinePlus, testosterone injection")}. MedlinePlus also says to call your doctor immediately for chest pain, shortness of breath, slow or difficult speech, or weakness or numbness of an arm or leg, because testosterone can raise blood pressure and with it the risk of heart attack or stroke.</p>
<h3>How the leading providers handle ongoing care</h3>
<p>According to our reviews, Hone Health provides "ongoing monitoring with follow-up bloodwork and dose adjustments" and support for men managing therapy long-term; TMates includes "ongoing check-ins and dose management" in its membership; and Male Excel offers "unlimited provider follow-ups." See <a href="/trt/reviews/hone">Hone Health</a>, <a href="/trt/reviews/tmates">TMates</a> and <a href="/trt/reviews/maleexcel">Male Excel</a>. Whatever the clinic, the test of ongoing care is simple: does someone review every lab result with you, and act when a result is out of range?</p>
<h3>Keep your own records</h3>
<p>Download every lab report and keep a simple log of dates, doses and symptoms. It makes each follow-up more useful, it lets your primary care doctor stay informed, and it means you can switch clinics or move to in-person care without starting from scratch.</p>`,
    },
    // @@MORE@@
  ],
};
