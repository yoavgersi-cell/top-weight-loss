import type { ArticleData } from "../../config";

// ───── How low testosterone is diagnosed before TRT (Oct 31, 2026) ─────
// Deep guide on the diagnostic workup that should come before a testosterone
// prescription: two early-morning fasting totals, assay quality, free T and
// SHBG, LH/FSH, prolactin, estradiol, hematocrit, PSA by age, fertility, the
// temporary causes of a low reading, and the monitoring that follows.
//
// Sourcing rules: guideline statements link the AUA (2018, validity confirmed
// 2024) or Endocrine Society (2018 guideline, July 2026 statement); FDA and
// HHS actions link the agency page; peer-reviewed studies link PubMed, PMC or
// the journal. Conference abstracts (ENDO 2026), records analyses (Epic
// Research), editorials (BMJ) and news reports are labelled as such, with
// dates. Provider facts are only those already verified in ./trt.ts and
// ./trt-ported.ts; the only price used is DudeMeds' published figures from
// trt.ts. No dosing is given beyond what a guideline or trial states, and the
// prescriber decides. Do not add figures without a source.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  // Guidelines and statements
  aua: "https://www.auanet.org/guidelines-and-quality/guidelines/testosterone-deficiency-guideline",
  auaPubmed: "https://pubmed.ncbi.nlm.nih.gov/29601923/",
  auaPR: "https://auanet.org/about-us/media-center/press-center/aua-releases-new-clinical-guideline-for-diagnosis-and-treatment-of-testosterone-deficiency",
  auaTable7: "https://www.auanet.org/documents/Guidelines/PDF/Table%20Seven%20-%20Follow-up%20Laboratory%20Testing(0).pdf",
  esGuideline: "https://academic.oup.com/jcem/article/103/5/1715/4939465",
  esPlenary: "https://www.endocrine.org/-/media/endocrine/files/cpg/testosterone-therapy-plenary-6-1-18_online.pdf",
  esStatement: "https://www.endocrine.org/news-and-advocacy/news-room/2026/statement-on-testosterone-replacement-therapy",
  esStatementNW: "https://www.newswise.com/articles/statement-on-testosterone-replacement-therapy-from-the-endocrine-society",
  esDha: "https://www.endocrine.org/news-and-advocacy/news-room/2026/statement-on-dhas-clinical-practice-guideline-for-testosterone-deficiency-in-the-male-service-member",
  bssm: "https://academic.oup.com/jsm/article/14/12/1504/6973374",
  travison: "https://pubmed.ncbi.nlm.nih.gov/28324103/",
  travisonPR: "https://www.endocrine.org/news-and-advocacy/news-room/2017/landmark-study-defines-normal-ranges-for-testosterone-levels",
  // Regulators
  fdaLabel: "https://www.fda.gov/drugs/drug-alerts-and-statements/fda-issues-class-wide-labeling-changes-testosterone-products",
  fdaInfo: "https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/testosterone-information",
  hhs2026: "https://www.hhs.gov/press-room/fda-requests-updates-testosterone-therapy-labeling.html",
  cnn2026: "https://kvia.com/health/cnn-health/2026/06/20/what-men-should-know-about-the-us-governments-latest-move-on-testosterone-therapy/",
  uroTimes2026: "https://www.urologytimes.com/view/hhs-requests-testosterone-therapy-label-updates-citing-new-safety-data",
  fdaPanel: "https://www.healio.com/news/endocrinology/20251210/fda-panel-supports-expanding-population-indicated-for-testosterone-therapy",
  traverse: "https://www.nejm.org/doi/full/10.1056/NEJMoa2215025",
  // 2026 prescribing evidence
  epic: "https://www.epicresearch.org/articles/most-men-starting-testosterone-had-prior-testing-but-only-1-in-5-met-the-two-test-standard/",
  epicYahoo: "https://health.yahoo.com/your-body/mens-health/articles/only-1-5-men-starting-132909459.html",
  endo26PR: "https://www.endocrine.org/news-and-advocacy/news-room/2026/papaleontiou-press-release-endo-2026",
  endo26RUN: "https://www.renalandurologynews.com/news/endo-few-men-receiving-testosterone-undergo-guideline-concordant-diagnostic-testing/",
  dubin: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2799297",
  dubinNU: "https://news.feinberg.northwestern.edu/2023/01/05/direct-to-consumer-online-platforms-expand-access-but-often-fail-to-convey-risks-of-testosterone-therapy/",
  bmj: "https://doi.org/10.1136/bmj-2026-101080",
  bmjGroup: "https://bmjgroup.com/rise-in-private-testosterone-prescribing-risks-overtreatment-and-more-strain-on-the-nhs/",
  medxBmj: "https://medicalxpress.com/news/2026-10-private-testosterone-overtreatment-strain-nhs.html",
  medxUk: "https://medicalxpress.com/news/2026-01-social-media-fuels-surge-uk.html",
  nma: "https://academic.oup.com/jsm/article/23/9/qdag272/8787137",
  nmaPubmed: "https://pubmed.ncbi.nlm.nih.gov/42704281/",
  // Physiology and measurement
  brambilla09: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2681273/",
  brambilla07: "https://pubmed.ncbi.nlm.nih.gov/18052942/",
  caronia: "https://pubmed.ncbi.nlm.nih.gov/22804876/",
  emas: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4582226/",
  sleep: "https://stacks.cdc.gov/view/cdc/212252",
  sleepUC: "https://www.uchicagomedicine.org/forefront/news/2011/may/sleep-loss-lowers-testosterone-in-healthy-young-men",
  opioid: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6244554/",
  spratt: "https://typeset.io/papers/both-hyper-and-hypogonadotropic-hypogonadism-occur-4hgvw0njsy",
  devine: "https://discovery.dundee.ac.uk/en/publications/plasma-steroid-concentrations-reflect-acute-disease-severity-and-/",
  who1990: "https://pubmed.ncbi.nlm.nih.gov/1977002/",
};

export const TRT_LOW_T_DIAGNOSIS: ArticleData = {
  slug: "how-low-testosterone-is-diagnosed",
  title: "How Low T Is Diagnosed: The Tests Before TRT (2026)",
  description:
    "How low testosterone should be diagnosed before TRT: two morning tests, LH and FSH, SHBG, hematocrit, PSA and fertility checks, per the US guidelines.",
  category: "Guide",
  readTime: "52 min read",
  publishedAt: "2026-10-31",
  updatedAt: "2026-10-31",
  heroColor: "#E6EEF5",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "A low testosterone diagnosis needs symptoms plus a low total testosterone on at least two separate early-morning tests. The AUA uses 300 ng/dL as its cut-off; the Endocrine Society works from a harmonized lower limit of 264 ng/dL and, in its July 2026 statement, describes about 300 ng/dL as the common clinical threshold.",
    "Most men starting testosterone have not had that. An Epic Research analysis of 300,277 men found that only 21.8% of those starting in the first half of 2026 had two low results within six months beforehand, and a University of Michigan study presented at ENDO 2026 found only 12% met a fuller standard that included LH or FSH.",
    "The rest of the workup decides what kind of low it is and whether TRT is safe: LH and FSH to separate testicular from pituitary causes, prolactin when LH is low, free testosterone when SHBG is unusual, hematocrit, PSA from age 40 under the AUA, and a frank question about fertility, because exogenous testosterone suppresses sperm production.",
    "Many online clinics do this properly, and the ones we review all build treatment around lab work and a clinician review. The red flags are a prescription on one reading, no LH, no fertility question and no plan to recheck hematocrit; a 2022 secret-shopper study found six of seven direct-to-consumer platforms offered testosterone to a man with normal levels.",
  ],
  sections: [
    {
      heading: "How is low testosterone diagnosed before starting TRT?",
      body: `<div class="qa"><strong>The short answer</strong><p>Low testosterone is diagnosed, not spotted on one blood test. Both main US guidelines require symptoms plus a low total testosterone on at least two separate early-morning samples: the AUA uses 300 ng/dL as its cut-off, and the Endocrine Society uses the harmonized lower limit of about 264 ng/dL. LH and FSH show where the problem sits, and hematocrit, PSA by age and fertility plans are checked before anyone prescribes. Sources: ${ext(S.aua, "AUA guideline")}; ${ext(S.esGuideline, "Endocrine Society guideline")}, checked October 31, 2026.</p></div>
<p>Testosterone has never been easier to get. A man can order a home kit, answer a questionnaire and be offered a prescription within days, and many of the clinics that make this possible do the medicine carefully. The problem is the gap between the speed of the process and the standard the guidelines set. In 2026 three separate pieces of evidence put a number on that gap. An analysis of electronic health records for 300,277 American men found that only about one in five of those starting testosterone had two low readings beforehand. A study presented at the Endocrine Society's annual meeting found that only 12% of men in one health system had the full workup. And in October, an editorial in The BMJ warned that private prescribing in the UK was drifting towards men with vague symptoms and borderline results. We cover each in detail below.</p>
<p>None of that is an argument against testosterone replacement. For a man whose testicles or pituitary cannot make enough testosterone, treatment is effective and, after the TRAVERSE trial, better understood on safety than it was a decade ago. It is an argument for getting the diagnosis right, because the diagnosis decides three things that matter to the man in the chair: whether he needs the drug at all, whether something else is causing the low number, and whether treatment will cost him something he cares about, most often his fertility.</p>
<h3>How to use this guide</h3>
<p>The first tables set out the workup and the two guidelines side by side. The middle sections take each test in turn: why it is done, what the threshold is, and what it changes. Then come the temporary causes of a low reading and when to retest, the regulatory changes of 2025 and 2026, the 2026 evidence on how often the workup actually happens, and what a good online clinic does at intake. The guide ends with a monitoring schedule for men who do start, three worked examples, a list of questions to take to your clinician, and the references. Where a figure comes from a conference abstract, a news report or an editorial rather than a peer-reviewed paper or guideline, we say so.</p>
<p>Two ground rules apply throughout. First, nothing here is a treatment plan. The guidelines are written for clinicians, and the decision to treat, the choice of product and the dose belong to a licensed prescriber who has your results and history. Second, a number on its own is not a diagnosis. Every guideline we cite says the same thing in different words: testosterone treatment is for men with symptoms and consistently low levels, and the work of diagnosis is establishing both.</p>`,
    },
    {
      heading: "The diagnostic workup at a glance",
      body: `<p>This is the core of the guide in one table. It lists each test a careful clinician orders or considers before prescribing testosterone, why it is done, the threshold the guidelines use where they set one, and when it is drawn. The thresholds come from the ${ext(S.aua, "AUA guideline on testosterone deficiency")} (published 2018, validity confirmed 2024) and the ${ext(S.esGuideline, "Endocrine Society clinical practice guideline")} (2018), with the Endocrine Society's ${ext(S.esStatement, "July 16, 2026 statement")} where it adds to them.</p>
<table>
<thead><tr><th>Test</th><th>Why it is done</th><th>Guideline threshold or rule</th><th>When</th></tr></thead>
<tbody>
<tr><td>Total testosterone, first sample</td><td>Screens for a low level in a man with symptoms</td><td>AUA: below 300 ng/dL is a reasonable cut-off. Endocrine Society: below the harmonized lower limit (264 ng/dL in healthy non-obese men aged 19-39)</td><td>Early morning; the Endocrine Society adds fasting</td></tr>
<tr><td>Total testosterone, repeat</td><td>Confirms the first result, because levels vary day to day</td><td>Both guidelines: diagnosis only after a second low value on a separate occasion</td><td>Early morning, fasting, on a different day, when well</td></tr>
<tr><td>Free testosterone (or SHBG and albumin to calculate it)</td><td>Shows the unbound fraction when binding protein is unusual</td><td>Endocrine Society: measure when total is near the lower limit or SHBG is likely altered; by equilibrium dialysis or an accurate formula</td><td>With a morning sample</td></tr>
<tr><td>LH and FSH</td><td>Tells primary (testicular) from secondary (pituitary or hypothalamic) hypogonadism</td><td>AUA: measure LH in men with low testosterone. Endocrine Society: measure LH and FSH</td><td>After low testosterone is confirmed, before treatment</td></tr>
<tr><td>Prolactin</td><td>Screens for a prolactin-secreting pituitary tumor or other cause of high prolactin</td><td>AUA: measure when testosterone is low and LH is low or low-normal</td><td>With or after the LH result</td></tr>
<tr><td>Estradiol</td><td>Baseline for men with breast symptoms</td><td>AUA: measure in men with breast symptoms or gynecomastia before starting</td><td>Before treatment, if symptoms</td></tr>
<tr><td>Hemoglobin and hematocrit</td><td>Testosterone raises red cell mass; establishes a baseline</td><td>AUA: measure before starting; its follow-up table aims for a pre-treatment hematocrit below 50%. Endocrine Society: elevated hematocrit is a reason not to start</td><td>Before treatment</td></tr>
<tr><td>PSA (and prostate examination where indicated)</td><td>Excludes a prostate cancer diagnosis before treatment</td><td>AUA: men over 40. Endocrine Society: men 55-69, and 40-69 at increased risk, who choose monitoring; do not start with PSA above 4 ng/mL (above 3 at increased risk) without urological evaluation</td><td>Before treatment</td></tr>
<tr><td>Fertility history (and semen analysis if relevant)</td><td>Exogenous testosterone suppresses sperm production</td><td>AUA: do not prescribe to men currently trying to conceive; reproductive health evaluation first for men interested in fertility</td><td>At intake, before any prescription</td></tr>
<tr><td>History for reversible causes</td><td>Illness, short sleep, sleep apnea, opioids and obesity can all lower a reading</td><td>Endocrine Society: address reversible causes; do not start in untreated severe obstructive sleep apnea</td><td>At intake; retest once the cause is dealt with</td></tr>
</tbody>
</table>
<p>Two things in that table do most of the work. The repeat morning test protects against treating a reading that was low by accident of timing, food, a bad week of sleep or an infection. The LH result protects against treating the wrong problem: a man whose low testosterone comes from a pituitary condition needs that condition found, and a man whose low testosterone comes from excess weight may recover his own production if the weight comes off. The rest of the table is about safety and fertility, and it is where the gap between careful and careless prescribing shows most clearly.</p>
<p>Not every man needs every test. A clinician may skip estradiol in a man without breast symptoms, and the prostate assessment depends on age and risk. What should not be skipped is the second morning reading, an LH (and usually FSH), a hematocrit, an age-appropriate PSA and the fertility question. Those five items come up in every guideline we reviewed, and a clinic that does not ask for them has made a choice the guidelines do not support.</p>`,
    },
    {
      heading: "What do the AUA and Endocrine Society guidelines actually require?",
      body: `<p>Two US documents set the standard most clinicians and online clinics refer to. The American Urological Association's ${ext(S.aua, "Evaluation and Management of Testosterone Deficiency")} was published in the Journal of Urology in 2018 (${ext(S.auaPubmed, "PubMed record")}); the AUA's guideline page now lists it as reviewed and validity confirmed in 2024, which means the 2018 statements still stand. The Endocrine Society's ${ext(S.esGuideline, "Testosterone Therapy in Men With Hypogonadism")} was published in the Journal of Clinical Endocrinology and Metabolism in 2018 (Bhasin and colleagues). In July 2026 the Endocrine Society issued a ${ext(S.esStatement, "public statement")} restating and sharpening its diagnostic standard. The two societies agree on almost everything that matters to a patient, and the differences are worth knowing because online clinics sometimes quote whichever suits them.</p>
<table>
<thead><tr><th>Question</th><th>AUA (2018, validity confirmed 2024)</th><th>Endocrine Society (2018 guideline; July 2026 statement)</th></tr></thead>
<tbody>
<tr><td>Who should be diagnosed</td><td>Men with low total testosterone combined with symptoms and/or signs; low numbers alone or symptoms alone are not enough</td><td>Only men with symptoms consistent with testosterone deficiency and unequivocally and consistently low testosterone</td></tr>
<tr><td>Numeric cut-off</td><td>Total testosterone below 300 ng/dL as a reasonable cut-off</td><td>Lower limit of the harmonized range for CDC-certified assays (264 ng/dL in the reference study); the 2026 statement calls about 300 ng/dL the common clinical threshold</td></tr>
<tr><td>Number of tests</td><td>Two total testosterone measurements on separate occasions</td><td>Repeat the measurement to confirm; the 2026 statement says at least two</td></tr>
<tr><td>Timing</td><td>Both in the early morning</td><td>Morning and fasting</td></tr>
<tr><td>Free testosterone</td><td>Not required for every man</td><td>When total is near the lower limit or SHBG is likely altered; equilibrium dialysis or an accurate formula; the 2026 statement asks for consistently low total and free</td></tr>
<tr><td>Assay</td><td>Not specified in the statements we checked</td><td>2026 statement: providers strongly encouraged to use CDC HoST-certified assays</td></tr>
<tr><td>Pituitary hormones</td><td>LH in men with low testosterone; prolactin if LH is low or low-normal</td><td>LH and FSH to distinguish primary from secondary hypogonadism</td></tr>
<tr><td>Screening men without symptoms</td><td>Diagnosis requires symptoms or signs, so a low number alone does not qualify</td><td>Recommends against population screening; the 2026 statement says evidence is insufficient</td></tr>
<tr><td>Before treatment: blood count</td><td>Measure hemoglobin and hematocrit; inform patients of the risk of polycythemia</td><td>Do not start with an elevated hematocrit</td></tr>
<tr><td>Before treatment: prostate</td><td>PSA in men over 40</td><td>PSA and examination in men 55-69 and 40-69 at increased risk who choose monitoring; avoid starting with PSA above 4 ng/mL, or above 3 at increased risk, without urological evaluation</td></tr>
<tr><td>Fertility</td><td>Do not prescribe exogenous testosterone to men currently trying to conceive (strong recommendation, Grade A evidence)</td><td>Do not start in men planning fertility in the near term</td></tr>
<tr><td>Other reasons not to start</td><td>Separate statements on cardiovascular and prostate risk (see the guideline)</td><td>Breast or prostate cancer, palpable prostate nodule, untreated severe sleep apnea, severe lower urinary tract symptoms, uncontrolled heart failure, heart attack or stroke within six months, thrombophilia</td></tr>
</tbody>
</table>
<p>Sources: ${ext(S.aua, "AUA guideline page")}; ${ext(S.auaPR, "AUA press release, 2018")}; ${ext(S.esGuideline, "Endocrine Society guideline, 2018")}; ${ext(S.esPlenary, "Endocrine Society guideline presentation, 2018")}; ${ext(S.esStatement, "Endocrine Society statement, July 16, 2026")}, all checked October 31, 2026.</p>
<h3>Where they really differ</h3>
<p>The visible difference is the number: 300 versus 264 ng/dL. In practice it is smaller than it looks. The AUA picked 300 as a practical cut-off; the Endocrine Society tied its lower limit to a reference study of healthy young men measured against a CDC reference method, and its own 2026 statement describes about 300 as the threshold clinicians commonly use. A man at 280 ng/dL on two mornings with clear symptoms would meet the AUA's cut-off and sit just above the Endocrine Society's harmonized limit, and that is exactly the man for whom free testosterone, LH and a careful history matter most.</p>
<p>The more important differences are in emphasis. The Endocrine Society is stricter about fasting and about assay quality, and it frames diagnosis around organic versus functional causes, asking clinicians to look for and treat reversible conditions first. The AUA is more explicit about fertility, with a strongly graded statement against prescribing to men trying to conceive, and about the blood count and PSA before treatment. A clinic that follows both, as many do, takes the morning-and-fasting rule from one and the fertility and baseline-lab rules from the other.</p>
<h3>Other guidelines</h3>
<p>Outside the US, the British Society for Sexual Medicine's ${ext(S.bssm, "guideline on adult testosterone deficiency")} recommends measuring serum testosterone between 7 and 11 a.m. on at least two occasions. That matters for readers using UK services, and it is consistent with both US documents on the basic rule: two morning samples, not one.</p>`,
    },
    {
      heading: "Why does the test have to be in the morning and fasting?",
      body: `<p>Testosterone follows a daily rhythm, highest in the early morning and lower in the afternoon, and the reference ranges were built from morning samples. A test drawn at 4 p.m. and compared with a morning range will make some men look low who are not.</p>
<h3>The size of the daily swing</h3>
<p>The clearest data come from Brambilla and colleagues, who sampled 66 men aged 30 to 80 in Boston on three mornings and three afternoons and published the results in the Journal of Clinical Endocrinology and Metabolism in 2009. In men aged 30 to 40, testosterone at 4 p.m. ran roughly 20% to 25% below the 8 a.m. level. The gap narrowed with age, to about 10% at 70. Some men with an afternoon reading below 300 ng/dL had normal morning levels at every morning visit. The authors concluded that measurement should be restricted to morning hours in younger and older men alike. Source: ${ext(S.brambilla09, "Brambilla et al., JCEM, 2009 (PMC full text)")}, checked October 31, 2026.</p>
<p>To make that concrete: a 35-year-old whose true morning level is 380 ng/dL could, on those percentages, read somewhere around 285 to 305 ng/dL in the late afternoon. That is the difference between a normal result and one that crosses the AUA cut-off. In a 70-year-old the swing is smaller, but it is not zero, and the guidelines do not carve out an exception for older men.</p>
<h3>What food does to the number</h3>
<p>The fasting rule rests on a different finding. Caronia and colleagues gave 74 men aged 19 to 74 a standard 75-gram glucose drink and drew blood over two hours. Mean testosterone fell by about 25%, and it was still suppressed at 120 minutes. Of the 66 men with normal testosterone at baseline, 10 (15%) dropped into the low range at one or more time points. The fall did not depend on glucose tolerance or body mass index, and LH did not rise to compensate. The authors' conclusion was direct: men found to have a low non-fasting testosterone should be re-evaluated in the fasting state. Source: ${ext(S.caronia, "Caronia et al., Clinical Endocrinology, 2013")}, checked October 31, 2026.</p>
<p>A glucose drink is not a breakfast, and the study did not test ordinary meals. But it shows the direction and the rough scale of the effect, and it is why the Endocrine Society specifies fasting morning samples. A man who has his blood drawn after a sweet coffee and a pastry has given the lab a sample the guideline would not accept for diagnosis.</p>
<h3>What this means for you</h3>
<ul>
<li><strong>Book the draw before about 10 a.m.</strong> The ENDO 2026 study we describe below counted morning samples as those taken between 5 and 10 a.m.; the British guideline gives 7 to 11 a.m. Earlier is safer within that window.</li>
<li><strong>Fast beforehand.</strong> Water is fine; food and sugary drinks are not, on the evidence above.</li>
<li><strong>Ask what time a home kit was meant to be used.</strong> At-home collection is convenient, but the timing rule applies to it in the same way. If a kit was used in the afternoon, the result is not a diagnostic sample.</li>
<li><strong>Check the time on the lab report.</strong> Most reports print the collection time. If it says 3:40 p.m., the result is a reason to retest, not a reason to treat.</li>
</ul>
<p>Shift workers are a special case the guidelines do not fully address. The daily rhythm follows the sleep-wake cycle, so for a man who sleeps during the day, "morning" means soon after waking. That is a question to raise with the clinician rather than one to settle alone, and it is one more reason a single reading is never enough.</p>`,
    },
    {
      heading: "Why is one low reading not enough?",
      body: `<p>Because testosterone varies from day to day even when it is drawn at the same time, in the same way, in the same man. A single result is one sample from a moving target.</p>
<h3>How much it varies</h3>
<p>In 2007 Brambilla and colleagues followed 132 men aged 30 to 79 from the Boston Area Community Health Survey, taking paired samples one to three days apart and again at three and six months. Across the hormones studied, a clinician could expect two measurements from the same man to differ by roughly 18% to 28% half the time, and by 27% to 54% about a quarter of the time. Biological variation contributed more than laboratory error, and day-to-day variation more than longer-term drift. The authors concluded that one sample is generally not enough to characterize a man's hormone levels, although more than three is probably unnecessary. Source: ${ext(S.brambilla07, "Brambilla et al., Clinical Endocrinology, 2007")}, checked October 31, 2026.</p>
<p>Put a 25% swing against a 300 ng/dL cut-off and the problem is obvious. A man whose average morning level is 340 ng/dL will, on some mornings, read below 300. If that is the morning his single test happens to fall on, he is labelled low. The second test exists to catch exactly that man, and it costs one more blood draw.</p>
<h3>What the guidelines say about the repeat</h3>
<p>The AUA's statement is that the diagnosis of low testosterone should be made only after two total testosterone measurements taken on separate occasions, both in the early morning. The Endocrine Society's guideline recommends confirming the diagnosis by repeating the morning fasting total testosterone, and its 2026 statement says the diagnosis should rest on at least two early-morning fasting tests. Neither document sets an exact interval between the two. In practice clinicians repeat within days to weeks, and the point is that the second test should be independent: a different day, the same morning-and-fasting conditions, and ideally the same laboratory method. Sources: ${ext(S.aua, "AUA")}; ${ext(S.esGuideline, "Endocrine Society, 2018")}; ${ext(S.esStatement, "Endocrine Society statement, 2026")}.</p>
<h3>What counts as "two low readings"</h3>
<ul>
<li><strong>Two results, both low, both morning, on different days.</strong> That is the standard.</li>
<li><strong>One low and one normal.</strong> That is not a diagnosis. It is a reason for a third test, a look at free testosterone and SHBG, and a hard look at whatever was different about the low morning.</li>
<li><strong>Two low results, one of them in the afternoon or during an illness.</strong> Strictly, only one qualifying result. Repeat the other under the right conditions.</li>
<li><strong>A low result from years ago and one from last week.</strong> Records analyses sometimes count these, but most clinicians would want both within a period in which nothing has changed. The Epic Research analysis below used a six-month window.</li>
</ul>
<p>The repeat test is also the cheapest safety step in the whole process. It costs a fraction of a month of treatment, it takes a week at most, and the 2026 evidence suggests it is the step most often skipped.</p>`,
    },
    {
      heading: "Does the lab, and the assay it uses, change the result?",
      body: `<p>Yes, and this is the least discussed part of the diagnosis. Testosterone is measured by several methods, and they do not all agree. The Endocrine Society's July 2026 statement put it bluntly: with non-standardized assays, the same blood sample can read "low" or "normal" depending on the lab and the method. Source: ${ext(S.esStatement, "Endocrine Society statement, July 16, 2026")}, checked October 31, 2026.</p>
<h3>The harmonized range</h3>
<p>The fix the Endocrine Society backs is harmonization. In a study published in the Journal of Clinical Endocrinology and Metabolism in 2017, Travison and colleagues took testosterone results from 9,054 community-dwelling men in four large cohorts in the US and Europe (the Framingham Heart Study, the European Male Aging Study, the Osteoporotic Fractures in Men Study and the Male Sibling Study of Osteoporosis), re-measured a sample from each cohort with the CDC's reference method, and used the comparison to put all the results on one scale. In healthy non-obese men aged 19 to 39, the harmonized 2.5th percentile was 264 ng/dL and the 97.5th percentile was 916 ng/dL, with a median of 531 ng/dL. Harmonization reduced the variation between cohorts, and age-specific levels in non-obese men were similar across cohorts and higher than in all men. The authors noted that further work was needed in other racial and ethnic groups and regions. Sources: ${ext(S.travison, "Travison et al., JCEM, 2017")}; ${ext(S.travisonPR, "Endocrine Society press release, 2017")}, checked October 31, 2026.</p>
<p>That is where the "264 ng/dL" figure comes from. It is a percentile in a defined, healthy, young population, measured on a standardized scale. The Endocrine Society's 2018 guideline built its diagnostic approach around this kind of harmonized range for CDC-certified laboratories, and it warns that using the lower limit established by a local laboratory may not accurately identify men with hypogonadism. Source: ${ext(S.esGuideline, "Endocrine Society guideline, 2018")}.</p>
<h3>HoST certification</h3>
<p>The CDC runs a Hormone Standardization program (HoST) that certifies testosterone assays against its reference method. The 2026 statement strongly encourages providers to use HoST-certified assays. For a patient, the practical step is simple: ask whether the laboratory's testosterone method is CDC HoST-certified. A clinic should be able to tell you which laboratory runs its samples; if it cannot, the assay question cannot be answered either.</p>
<h3>What this means for you</h3>
<ul>
<li><strong>Read the reference range printed on your own report.</strong> A lab whose range starts at 250 and one whose range starts at 350 will classify a 300 ng/dL result differently. The number is the same; the label is not.</li>
<li><strong>Use the same laboratory for the repeat if you can.</strong> Two results from two methods are harder to compare than two from one.</li>
<li><strong>Be wary of results without a method or laboratory named.</strong> This applies especially to some direct-to-consumer kits. A result that cannot be traced to a certified method is weaker evidence.</li>
<li><strong>Units matter.</strong> US labs report ng/dL; UK and European labs usually report nmol/L. To convert ng/dL to nmol/L, multiply by 0.0347, so 300 ng/dL is about 10.4 nmol/L and 264 ng/dL is about 9.2 nmol/L.</li>
</ul>
<p>Our guide to <a href="/trt/articles/normal-testosterone-levels-by-age">normal testosterone levels by age</a> covers how ranges shift across the lifespan and why a single "normal range" printed on a report is a simplification.</p>`,
    },
    {
      heading: "When do free testosterone, bioavailable testosterone and SHBG matter?",
      body: `<p>Most testosterone in the blood is bound to proteins: tightly to sex hormone-binding globulin (SHBG), loosely to albumin. The small unbound fraction is free testosterone; free plus albumin-bound is called bioavailable testosterone. Total testosterone counts all of it. Most of the time the total tells the clinician what is needed. The exceptions are men whose SHBG is unusually high or low, because then the total misrepresents how much hormone is available to tissues.</p>
<h3>What the guideline says</h3>
<p>The Endocrine Society recommends measuring free testosterone in men whose total testosterone is near the lower limit of normal, and in men with a condition that alters SHBG. It specifies the method: equilibrium dialysis, or an estimate calculated from total testosterone, SHBG and albumin using a formula that matches equilibrium dialysis. Its 2026 statement goes further and describes the diagnosis as resting on consistently low, accurately measured total and free testosterone. Sources: ${ext(S.esGuideline, "Endocrine Society guideline, 2018")}; ${ext(S.esStatement, "Endocrine Society statement, 2026")}, checked October 31, 2026.</p>
<p>The ENDO 2026 study we describe later counted a man as having low testosterone if his total was below 300 ng/dL, his free testosterone was below 70 pg/mL, or his bioavailable testosterone was low, which shows how specialists use the free value in practice: as a second route to the diagnosis when the total is borderline. Source: ${ext(S.endo26PR, "Endocrine Society press release, ENDO 2026")}.</p>
<h3>When the total misleads</h3>
<ul>
<li><strong>Low SHBG, typical of obesity and insulin resistance.</strong> The total can look low while the free fraction is adequate. A man in this position may be told he has low testosterone when his available hormone is near normal.</li>
<li><strong>High SHBG, which rises with age and with some conditions.</strong> The total can look normal while free testosterone is low. The European Male Ageing Study reported that low free testosterone was associated with hypogonadal signs and symptoms in men whose total testosterone was normal. Source: ${ext(S.emas, "European Male Ageing Study analysis (PMC full text)")}.</li>
<li><strong>Borderline totals, say 250 to 350 ng/dL.</strong> This is the zone where the free value most often changes the answer in either direction.</li>
</ul>
<h3>The caveats</h3>
<p>Free testosterone is harder to measure well than total, which is why the guideline names only two acceptable routes: equilibrium dialysis, or a calculation from total testosterone, SHBG and albumin that matches it. A free testosterone figure from any other method, or with no method named, is weaker evidence. Reference ranges for free testosterone also vary more between laboratories than total ranges do. So the free value is a refinement, not a replacement: it is most useful when the total is borderline and the SHBG is known, and least useful as a stand-alone number from an unknown method.</p>
<p>For a man looking at his results, the practical question is whether SHBG was measured. If the total is borderline and there is no SHBG on the report, the free testosterone figure (if any) cannot be checked, and a calculated free value cannot be made. Our explainer on <a href="/trt/articles/free-vs-total-testosterone">free versus total testosterone</a> covers the biology in more detail.</p>`,
    },
    {
      heading: "What do LH and FSH tell you about the cause?",
      body: `<p>Luteinizing hormone (LH) and follicle-stimulating hormone (FSH) are the pituitary's instructions to the testicles. LH tells the Leydig cells to make testosterone; FSH, with testosterone inside the testicle, drives sperm production. Reading them alongside a confirmed low testosterone tells the clinician where the failure is, and that changes what happens next.</p>
<table>
<thead><tr><th>Pattern</th><th>What it suggests</th><th>Typical next questions</th></tr></thead>
<tbody>
<tr><td>Low testosterone, high LH and FSH</td><td>Primary hypogonadism: the testicles are not responding to a strong signal</td><td>History of testicular injury, infection, surgery, chemotherapy or radiation; testicular size; genetic causes such as Klinefelter syndrome</td></tr>
<tr><td>Low testosterone, low or inappropriately normal LH</td><td>Secondary hypogonadism: the signal from the brain is weak</td><td>Prolactin; obesity, sleep apnea, opioids, recent illness; pituitary disease; whether imaging is needed</td></tr>
<tr><td>Low testosterone, LH suppressed close to zero</td><td>Suppression of the pituitary, sometimes by external hormones</td><td>Any current or past testosterone, anabolic steroid or other hormone use</td></tr>
</tbody>
</table>
<p>The guidelines are consistent here. The AUA recommends measuring LH in men with low testosterone. The Endocrine Society recommends measuring both LH and FSH to distinguish primary from secondary hypogonadism. Sources: ${ext(S.aua, "AUA guideline")}; ${ext(S.esGuideline, "Endocrine Society guideline, 2018")}, checked October 31, 2026.</p>
<h3>Why it matters before treatment, not after</h3>
<p>Once a man starts testosterone, his LH and FSH fall, because the pituitary senses the hormone from outside and stops asking for more. That means the LH result after treatment has started tells you very little about the original cause. If it was not measured beforehand, the information is gone until the man stops treatment for long enough to recover, which can take months. This is the single most practical reason to insist on LH at intake: it can only be measured cleanly once.</p>
<h3>Prolactin and the pituitary</h3>
<p>When testosterone is low and LH is low or low-normal, the AUA recommends measuring prolactin, as a screen for hyperprolactinemia, including prolactin-secreting pituitary tumors. A high prolactin is a reason to investigate the pituitary before treating anything, and treating the prolactin problem can restore testosterone by itself. Source: ${ext(S.aua, "AUA guideline")}.</p>
<p>When the testosterone is very low and LH is low, specialists also consider pituitary imaging, because a tumor that does not secrete prolactin will not show up on the blood test. Summaries of the guidelines give different triggers, and this is a decision for an endocrinologist or urologist, not a protocol for a patient. What a patient can do is recognize the pattern: a very low testosterone with a low LH, especially with headaches, visual changes or other hormone symptoms, is not a straightforward TRT case.</p>
<h3>Secondary does not always mean disease</h3>
<p>Most men with a low LH do not have a pituitary tumor. The commonest causes of the secondary pattern in middle-aged men are functional: excess weight, untreated sleep apnea, opioid use and recent illness. The Endocrine Society builds its guideline around this distinction between organic hypogonadism (a structural or genetic cause) and functional hypogonadism (a suppressed but intact system), and recommends addressing reversible causes before considering testosterone. Our guide to <a href="/trt/articles/weight-loss-testosterone-glp1-vs-trt">obesity, weight loss and TRT</a> covers the commonest of these in detail, and the temporary-causes table later in this guide covers the rest.</p>
<p>The secondary pattern also matters for treatment choice. A man with a suppressed but intact system and fertility plans may be a candidate for medicines that raise his own LH rather than replace testosterone, a route covered in our guide to <a href="/trt/articles/enclomiphene-vs-trt">enclomiphene versus TRT</a>. That option only exists if LH was measured and the pattern was recognized.</p>`,
    },
    {
      heading: "Estradiol, hemoglobin and hematocrit: what gets checked before starting",
      body: `<p>Two more baseline tests protect against the commonest problems once treatment starts. Neither is part of the diagnosis itself; both are part of deciding whether treatment is safe and of having something to compare against later.</p>
<h3>Hematocrit and hemoglobin</h3>
<p>Testosterone stimulates red blood cell production. In most men the rise is modest; in some it pushes the hematocrit (the share of blood volume made up of red cells) above a safe level, a state called erythrocytosis or polycythemia, which thickens the blood. The AUA recommends measuring hemoglobin and hematocrit before offering testosterone and informing patients of the increased risk of polycythemia. Its follow-up laboratory table describes the aim as a pre-treatment hematocrit below 50%, with monitoring during treatment to keep it below 54%. The Endocrine Society lists an elevated hematocrit among the conditions in which testosterone should not be started. Sources: ${ext(S.aua, "AUA guideline")}; ${ext(S.auaTable7, "AUA follow-up laboratory testing table")}; ${ext(S.esGuideline, "Endocrine Society guideline, 2018")}, checked October 31, 2026.</p>
<p>The 2026 evidence underlines why. A network meta-analysis published in The Journal of Sexual Medicine in 2026 pooled 23 randomized trials with 1,899 participants comparing treatment strategies for functional hypogonadism in men with obesity: structured lifestyle therapy, testosterone, treatments that restore the body's own production, GLP-1 drugs, and testosterone plus lifestyle. The authors report that testosterone reduced waist circumference and increased lean mass, but also increased hematocrit. They rated the certainty of many comparisons as low or very low, because the trials differed in who they enrolled, how they treated and how long they followed up, and they concluded that treatment should be guided by symptoms, patient priorities and biochemical assessment and monitoring rather than by a ranking. Sources: ${ext(S.nma, "Journal of Sexual Medicine, 2026")}; ${ext(S.nmaPubmed, "PubMed record")}, checked October 31, 2026.</p>
<p>The secret-shopper study of online platforms found that most did not discuss this risk: per Northwestern's summary, 83.3% of the platforms did not raise the risk of polycythemia. Source: ${ext(S.dubinNU, "Northwestern Medicine, January 2023")}. A baseline hematocrit is how a clinician knows whether a later rise is a problem, and a man who starts with a high-normal value has less room before he reaches the threshold at which guidelines say to stop or adjust.</p>
<h3>Estradiol</h3>
<p>Some testosterone is converted to estradiol by the enzyme aromatase, which is most active in fat tissue. The AUA recommends measuring estradiol in men with breast symptoms or gynecomastia before starting testosterone, and during treatment in men who develop breast symptoms. It does not recommend routine estradiol testing in every man at baseline. Source: ${ext(S.auaTable7, "AUA follow-up laboratory testing table")}.</p>
<p>That is a narrower recommendation than some clinics' marketing suggests. A baseline estradiol is reasonable in a man with breast tenderness or enlargement, but routine estradiol "management" is not what the guidelines describe. Our guide to <a href="/trt/articles/trt-and-estrogen">TRT and estrogen</a> covers what happens to estradiol on treatment and where the evidence for adjusting it is thin.</p>
<h3>Other baseline items clinicians often add</h3>
<p>Many clinicians also take a baseline blood pressure, a lipid profile and a measure of blood sugar, and ask about sleep apnea symptoms, urinary symptoms and cardiovascular history. The FDA's 2025 labeling change added a warning about increases in blood pressure to all testosterone products, which makes a baseline reading more than a formality. Source: ${ext(S.fdaLabel, "FDA, class-wide labeling changes, February 2025")}. Our guide to <a href="/trt/articles/trt-blood-work">TRT blood work</a> covers the full monitoring panel.</p>`,
    },
    {
      heading: "PSA and prostate assessment: what is checked, and at what age?",
      body: `<p>The prostate question is where the rules have moved most in recent years, and where the AUA and the Endocrine Society differ most in detail. Both want prostate cancer excluded before treatment in men old enough to be at risk. They differ on the age at which to start and on what to do with the result.</p>
<h3>The AUA rule</h3>
<p>The AUA recommends measuring PSA in men over 40 before starting testosterone, to exclude a prostate cancer diagnosis. It also asks clinicians to inform patients of the absence of evidence linking testosterone therapy to the development of prostate cancer. Source: ${ext(S.aua, "AUA guideline")}, checked October 31, 2026.</p>
<h3>The Endocrine Society rule</h3>
<p>The Endocrine Society ties prostate monitoring to standard screening practice and to the man's choice. For men aged 55 to 69, and men aged 40 to 69 at increased risk of prostate cancer, who choose prostate monitoring, it recommends a digital rectal examination and PSA before starting, again at 3 to 12 months, and after the first year monitoring that follows standard screening guidance for the man's age and race. It recommends urological referral for a PSA rise of more than 1.4 ng/mL within 12 months of starting, a confirmed PSA above 4 ng/mL at any time, an abnormal examination, or a substantial worsening of urinary symptoms. It recommends against starting testosterone in men with prostate cancer, a palpable prostate nodule or induration, or a PSA above 4 ng/mL (above 3 ng/mL in men at increased risk) without further urological evaluation. Sources: ${ext(S.esGuideline, "Endocrine Society guideline, 2018")}; ${ext(S.esPlenary, "guideline presentation, 2018")}, checked October 31, 2026.</p>
<table>
<thead><tr><th>Age group</th><th>AUA</th><th>Endocrine Society</th></tr></thead>
<tbody>
<tr><td>Under 40</td><td>PSA not specified before treatment</td><td>Not routinely, unless other indications</td></tr>
<tr><td>40 to 54</td><td>PSA before starting</td><td>PSA and examination if at increased risk and choosing monitoring</td></tr>
<tr><td>55 to 69</td><td>PSA before starting</td><td>PSA and examination before starting and at 3-12 months, for men choosing monitoring</td></tr>
<tr><td>70 and over</td><td>PSA before starting</td><td>Individual decision in line with screening guidance</td></tr>
</tbody>
</table>
<h3>What the 2026 label proposal would change</h3>
<p>On June 18, 2026, HHS announced that the FDA was requesting class-wide updates to testosterone prescribing information. Among them: testosterone would be contraindicated only in men with metastatic prostate cancer, rather than in men with known or suspected prostate cancer, because more recent data "have not generally shown an increased risk of prostate cancer" in treated men; and the benign prostatic hyperplasia language would be revised to recommend continued monitoring of men with severe symptomatic BPH. Prostate cancer screening and ongoing monitoring would still be recommended. Coverage at the time, including CNN, described these as requested changes that were not yet final. Sources: ${ext(S.hhs2026, "HHS press release, June 2026")}; ${ext(S.fdaInfo, "FDA testosterone information page")}; ${ext(S.cnn2026, "CNN via KVIA, June 20, 2026")}, checked October 31, 2026.</p>
<p>For a man being assessed now, the practical point is that neither the guidelines nor the proposed label drop the baseline PSA. A narrower contraindication is not the same as no assessment. A clinic that prescribes to a 55-year-old without a PSA is outside both guidelines whatever the label eventually says.</p>`,
    },
    {
      heading: "What if you want children? Why exogenous testosterone suppresses sperm",
      body: `<p>This is the question online intake forms most often skip, and the one with the most lasting consequences. Testosterone from outside the body tells the pituitary there is enough hormone, so it cuts LH and FSH. Without them, the testicles reduce their own testosterone production and, more importantly for fertility, sperm production. The level of testosterone inside the testicle, which sperm production depends on, falls even as the level in the blood rises.</p>
<h3>How strong the effect is</h3>
<p>The clearest evidence comes from male contraception research, where suppressing sperm was the goal. In a World Health Organization trial published in The Lancet in 1990, 271 healthy men received weekly testosterone injections; 157 became azoospermic (no sperm in the ejaculate) on three consecutive samples, a cumulative rate of 65% at six months, with a mean time to azoospermia of about 120 days. After stopping, the estimated median time to recovery of a sperm concentration of at least 20 million per mL was 3.7 months. Source: ${ext(S.who1990, "World Health Organization Task Force, Lancet, 1990")}, checked October 31, 2026.</p>
<p>Two cautions about reading that study. It was designed to suppress sperm in healthy volunteers, not to treat hypogonadism, and it does not tell you what will happen to a particular man on a particular treatment. And recovery in a trial of young, fertile volunteers who used testosterone for a limited period is not a promise of recovery for an older man after years of use. What it shows beyond doubt is the mechanism: exogenous testosterone is an effective suppressor of sperm production.</p>
<h3>What the guidelines say</h3>
<ul>
<li><strong>AUA:</strong> exogenous testosterone should not be prescribed to men who are currently trying to conceive (strong recommendation, Grade A evidence). Men with testosterone deficiency who are interested in fertility should have a reproductive health evaluation before treatment, and clinicians should discuss the long-term impact of exogenous testosterone on sperm production with men interested in future fertility. For men who want to maintain fertility, the guideline notes that clinicians may use aromatase inhibitors, hCG, selective estrogen receptor modulators or a combination. Sources: ${ext(S.aua, "AUA guideline")}; ${ext(S.auaPR, "AUA press release, 2018")}.</li>
<li><strong>Endocrine Society:</strong> recommends against testosterone in men planning fertility in the near term. Source: ${ext(S.esGuideline, "Endocrine Society guideline, 2018")}.</li>
<li><strong>Endocrine Society, September 2026:</strong> in a statement on a Defense Health Agency guideline for service members, the Society disputed pairing testosterone with hCG as a fertility-preservation strategy, arguing that it does not address the suppression of FSH, which normal sperm production needs. Source: ${ext(S.esDha, "Endocrine Society statement, September 24, 2026")}.</li>
</ul>
<h3>How often the question gets asked</h3>
<p>In the 2022 secret-shopper study, the scripted patient was 34 and said he wanted children in the future. Per Northwestern's summary of the study, only one of the seven platforms asked about recent cardiovascular events or his desire for future fertility, and six of the seven offered him testosterone anyway. Source: ${ext(S.dubinNU, "Northwestern Medicine, January 2023")}; ${ext(S.dubin, "Dubin et al., JAMA Internal Medicine, 2022")}.</p>
<h3>What this means for you</h3>
<p>If there is any chance you want children, say so at the start and make sure it is written down. Ask whether a semen analysis makes sense before treatment, and ask which options preserve fertility. Our guides to <a href="/trt/articles/trt-and-fertility">TRT and fertility</a> and <a href="/trt/articles/enclomiphene-vs-trt">enclomiphene versus TRT</a> cover the alternatives and their evidence, and the guide to <a href="/trt/articles/can-you-stop-trt">whether you can stop TRT</a> covers what recovery looks like. The worst outcome here is not a slower route to treatment. It is discovering the problem after a year on testosterone, when the partner has been trying to conceive for six months.</p>`,
    },
    {
      heading: "What can lower testosterone temporarily, and when should you retest?",
      body: `<p>A low reading is a measurement of the day it was taken. Several common conditions push testosterone down for reasons that have nothing to do with the testicles or the pituitary, and the level comes back when the cause goes. The Endocrine Society's approach is to identify and address these reversible causes before considering treatment. The table below gathers the main ones with the evidence for each.</p>
<table>
<thead><tr><th>Cause</th><th>What the evidence shows</th><th>When to retest</th></tr></thead>
<tbody>
<tr><td>Afternoon blood draw</td><td>Testosterone was about 20-25% lower at 4 p.m. than 8 a.m. in men aged 30-40, and about 10% lower at 70 (Brambilla, 2009)</td><td>Repeat as a fasting morning sample; no waiting needed</td></tr>
<tr><td>Eating or a sugary drink before the test</td><td>A 75 g glucose drink cut mean testosterone by about 25%; 15% of men with normal levels dropped into the low range (Caronia, 2013)</td><td>Repeat fasting; no waiting needed</td></tr>
<tr><td>Acute illness or hospital admission</td><td>In men admitted to acute care, low gonadotropins and testosterone were common and transient (Spratt, 1993); in hospitalized COVID-19 patients, testosterone fell with severity and the differences were gone about five months after discharge (Devine, 2024)</td><td>After full recovery; guidance advises against diagnosing during an acute illness</td></tr>
<tr><td>Short sleep</td><td>One week of five hours a night lowered daytime testosterone by 10-15% in ten healthy young men (Leproult and Van Cauter, 2011)</td><td>After a period of normal sleep; no study sets an exact interval</td></tr>
<tr><td>Obstructive sleep apnea</td><td>55% of men starting testosterone in the ENDO 2026 Michigan study had sleep apnea; the Endocrine Society advises against starting testosterone in untreated severe sleep apnea</td><td>Treat and reassess; the apnea itself needs treatment either way</td></tr>
<tr><td>Opioid use</td><td>Opioids suppress the hypothalamic signal (GnRH); reviews report low testosterone in roughly 19-86% of chronic users depending on criteria (Coluzzi, 2018)</td><td>Case by case; retest if the opioid is reduced or stopped</td></tr>
<tr><td>Obesity</td><td>Lowers SHBG and testosterone and suppresses LH; guidelines put addressing it first in functional hypogonadism</td><td>After meaningful weight loss; see our obesity and TRT guide</td></tr>
<tr><td>Recent testosterone or anabolic steroid use</td><td>Suppresses LH and the body's own production for a period after stopping</td><td>Only after recovery, which can take months; tell the clinician</td></tr>
</tbody>
</table>
<p>Sources: ${ext(S.brambilla09, "Brambilla, JCEM, 2009")}; ${ext(S.caronia, "Caronia, Clinical Endocrinology, 2013")}; ${ext(S.spratt, "Spratt et al., JCEM, 1993")}; ${ext(S.devine, "Devine et al., Clinical Endocrinology, 2024")}; ${ext(S.sleep, "Leproult and Van Cauter, JAMA, 2011")}; ${ext(S.endo26RUN, "ENDO 2026 study, as reported by Renal and Urology News")}; ${ext(S.esGuideline, "Endocrine Society guideline, 2018")}; ${ext(S.opioid, "Coluzzi et al., 2018 (PMC)")}, all checked October 31, 2026.</p>
<h3>Illness</h3>
<p>The illness effect is the one most often missed in online care, because a man may order a home kit in the week he is recovering from flu precisely because he feels exhausted. In the 1993 study by Spratt and colleagues, blood was sampled throughout the hospital stay of 55 men admitted to acute care units; most (60%) had low gonadotropins, independent of head injury, surgery, medication or high prolactin, and a subset had a transient rise above the normal range. The authors' title states the finding: both kinds of hypogonadism occur transiently in acute illness. The COVID-19 cohort reported by Devine and colleagues in 2024 adds a recovery timeline: in-hospital testosterone differences linked to severity were no longer seen about five months after discharge. A clinician who sees a low result taken during or soon after a significant illness should repeat it after recovery.</p>
<h3>Sleep</h3>
<p>The sleep study is small (ten lean men averaging 24 years old), but the effect appeared within one week of five-hour nights, levels were lowest in the afternoon and evening, and the men reported lower vigor as their testosterone fell. The University of Chicago's press release compared the drop to 10 to 15 years of ageing; that framing is the press office's, not the paper's. Source: ${ext(S.sleepUC, "University of Chicago Medicine, May 2011")}. The practical lesson: a man sleeping five hours a night who feels tired and has a borderline testosterone should fix the sleep and retest before concluding the testosterone caused the tiredness.</p>
<h3>Opioids</h3>
<p>Opioid-induced androgen deficiency is common and under-recognized. The 2018 review by Coluzzi and colleagues reported prevalence from 19% to 86% depending on how low testosterone was defined, a mechanism mainly through suppression of GnRH, and effects on sexual function, mood, bone and body composition; one study it cites found 45.5% of patients on oxycodone had below-normal testosterone after 12 weeks. The review recommends considering testosterone testing in men on long-term opioids, with any treatment decided case by case. Source: ${ext(S.opioid, "Coluzzi et al., 2018")}. For these men, the low testosterone is real, but the decision is about the opioid as much as the hormone.</p>
<h3>What we could not source</h3>
<p>Psychological stress, heavy drinking and some other medicines are often listed as causes of low testosterone. We did not find sources in our research for this guide that let us quantify them, so we have left them out of the table rather than guess. Mention them to your clinician if they apply.</p>`,
    },
    {
      heading: "Which symptoms point to low testosterone, and which do not?",
      body: `<p>Every guideline requires symptoms as well as a low number, but symptoms of low testosterone overlap heavily with symptoms of ordinary life in middle age. The Endocrine Society's guideline separates symptoms that are more specific to testosterone deficiency, chiefly sexual ones such as reduced sexual desire and fewer spontaneous or morning erections, from symptoms that are less specific, such as low energy, low mood, poor concentration and reduced physical performance. The less specific ones have many other causes. Source: ${ext(S.esGuideline, "Endocrine Society guideline, 2018")}, checked October 31, 2026.</p>
<table>
<thead><tr><th>More specific to low testosterone</th><th>Less specific (many other causes)</th></tr></thead>
<tbody>
<tr><td>Reduced sexual desire</td><td>Fatigue and low energy</td></tr>
<tr><td>Fewer spontaneous or morning erections</td><td>Low mood or irritability</td></tr>
<tr><td>Breast discomfort or enlargement</td><td>Poor concentration or memory</td></tr>
<tr><td>Loss of body hair, reduced shaving</td><td>Poor sleep</td></tr>
<tr><td>Very small or shrinking testicles</td><td>Weight gain, more body fat</td></tr>
<tr><td>Infertility or low sperm count</td><td>Reduced strength or exercise performance</td></tr>
</tbody>
</table>
<p>The table is a guide to what to discuss, not a scoring system. A man with low libido, few morning erections and two low morning tests has a clear case for further workup. A man whose only symptom is tiredness, who sleeps five hours a night and has one borderline afternoon reading, has a case for better sleep and a repeat test.</p>
<h3>Why questionnaires are not enough</h3>
<p>Many online intakes start with a symptom questionnaire. These questionnaires are useful as a checklist but poor as a diagnostic test, because most of the questions concern the less specific symptoms in the table above, which by definition have many causes besides low testosterone. A high score is a reason to test properly. It is not, on any guideline, a reason to treat.</p>
<p>The evidence on symptoms also explains why the free testosterone result can matter. The European Male Ageing Study analysis we cited earlier found that low free testosterone was associated with hypogonadal signs and symptoms in men whose total was normal. That supports looking at the free value when symptoms are typical and the total is borderline, rather than dismissing the symptoms. Source: ${ext(S.emas, "European Male Ageing Study analysis (PMC)")}.</p>
<h3>Symptoms that need a different workup</h3>
<p>Some symptoms that men attribute to low testosterone point elsewhere and should be raised directly: new erectile problems, which have several causes besides hormones and deserve their own assessment; severe headaches or changes in vision with low testosterone, which raise the question of the pituitary; and persistent low mood, which deserves assessment in its own right. Our guide to <a href="/trt/articles/low-testosterone-symptoms">low testosterone symptoms</a> goes through the common symptoms one at a time.</p>
<p>Finally, symptoms are what treatment is meant to change, so they should be recorded at baseline. A man who writes down his libido, energy, mood and erections before he starts has something to compare against at three and six months. Without that, it is easy to attribute every good week to the treatment and every bad one to something else.</p>`,
    },
    {
      heading: "What changed at the FDA in 2025 and 2026?",
      body: `<p>Regulation sets the frame that clinics and their marketing work within, and it has moved twice in two years. The direction is towards fewer warnings. It is not towards less diagnosis.</p>
<h3>February 2025: the class-wide labeling change</h3>
<p>On February 28, 2025, the FDA announced class-wide labeling changes for all testosterone products after reviewing the TRAVERSE trial. The cardiovascular language was removed from the boxed warning and the trial's results were added; a warning about increases in blood pressure was added; and the label's limitation of use for age-related hypogonadism was retained at that time. Source: ${ext(S.fdaLabel, "FDA, class-wide labeling changes for testosterone products, February 2025")}, checked October 31, 2026.</p>
<p>TRAVERSE, published in the New England Journal of Medicine in 2023, randomized 5,246 men aged 45 to 80 with existing cardiovascular disease or high cardiovascular risk, hypogonadal symptoms and two fasting testosterone levels below 300 ng/dL to testosterone gel or placebo. Major adverse cardiac events occurred in 7.0% on testosterone and 7.3% on placebo, meeting the trial's non-inferiority criterion. Atrial fibrillation (3.5% versus 2.4%), acute kidney injury and pulmonary embolism (0.9% versus 0.5%) were more common in the testosterone group. Source: ${ext(S.traverse, "Lincoff et al., TRAVERSE, NEJM, 2023")}, checked October 31, 2026.</p>
<p>One detail of TRAVERSE matters for this guide: its entry criteria required two fasting testosterone levels below 300 ng/dL plus symptoms. The safety evidence that relaxed the label was gathered in men diagnosed the way the guidelines describe. It says nothing directly about men started on one afternoon reading.</p>
<h3>December 2025: the expert panel</h3>
<p>On December 10, 2025, the FDA convened an expert panel on testosterone for men. As reported by Healio, panel members argued there was "no scientific basis for excluding age-related hypogonadism" from treatment and called for testosterone to be removed from the list of controlled substances. This was a panel discussion, not an FDA decision. Source: ${ext(S.fdaPanel, "Healio, December 10, 2025")}.</p>
<h3>June 2026: the requested label updates</h3>
<p>On June 18, 2026, HHS announced that the FDA was requesting updates to testosterone prescribing information: removing the 2015 limitation of use for age-related hypogonadism, which the FDA concluded was no longer warranted; narrowing the prostate cancer contraindication to metastatic disease; and revising the BPH language. Urology Times and CNN reported the request the following days, and CNN noted that no changes had been officially made at that point. We did not find an announcement that the revised labels had been finalized by the time we checked on October 31, 2026. Sources: ${ext(S.hhs2026, "HHS, June 2026")}; ${ext(S.fdaInfo, "FDA testosterone information page")}; ${ext(S.uroTimes2026, "Urology Times, June 19, 2026")}; ${ext(S.cnn2026, "CNN via KVIA, June 20, 2026")}.</p>
<h3>What the Endocrine Society said next</h3>
<p>The Endocrine Society's July 16, 2026 statement came a month later. It restated the diagnostic standard (symptoms plus consistently low, accurately measured testosterone on at least two early-morning fasting tests), recommended HoST-certified assays, said evidence is insufficient to screen men without symptoms, noted that men with low or high testosterone may have a higher risk of irregular heartbeat, and called for a long-term "Men's Health Initiative" study, analogous to the Women's Health Initiative, to close the evidence gaps. A reprint of the statement also cites TRAVERSE data showing roughly a 50% relative increase in pulmonary embolism and an increased incidence of fractures in testosterone-treated men. Sources: ${ext(S.esStatement, "Endocrine Society statement, July 16, 2026")}; ${ext(S.esStatementNW, "Newswise reprint")}.</p>
<h3>What this means for you</h3>
<p>Fewer label warnings make testosterone easier to prescribe and easier to market. They do not change what a diagnosis is. Removing the age-related limitation, if it is finalized, would mean the label no longer discourages treating an older man whose low testosterone has no structural cause. It would not mean an older man with one borderline afternoon reading has low testosterone. Our guide to <a href="/trt/articles/is-trt-safe">whether TRT is safe</a> covers TRAVERSE and the label history in more detail.</p>`,
    },
    {
      heading: "How often do men actually get the right tests before TRT?",
      body: `<p>Until 2026 the answer was mostly anecdote. Three pieces of evidence published or presented this year, and one from 2022, now give a clearer picture, and it is not flattering. Each has limits, and we set them out with the findings.</p>
<h3>The 300,000-man records analysis</h3>
<p>Epic Research, the research arm of the health-records company Epic, analyzed records for 300,277 men newly prescribed testosterone between January 2017 and June 2026. Most had been tested: 82.6% had a testosterone result in the 12 months before their prescription. But only 21.8% of men starting in the first half of 2026 had two low total testosterone results on separate days within the six months beforehand, the closest proxy the data allow for the AUA's two-test standard. The share has barely moved, from 16.9% in 2017 to a peak of 22.8% in 2024. Sources: ${ext(S.epic, "Epic Research")}; ${ext(S.epicYahoo, "Yahoo Health coverage")}, checked October 31, 2026.</p>
<p>The limits are real. This is a records analysis, not a peer-reviewed paper. It measures what appears in Epic-connected records, so tests done elsewhere would be missed, and it cannot see symptoms, timing of the draw or whether a low result was taken during an illness. It probably undercounts proper testing somewhat. Even so, the gap between "tested once" (about 83%) and "two low results" (about 22%) is too large to be explained by missing records alone.</p>
<h3>The ENDO 2026 chart review</h3>
<p>At ENDO 2026 in June, a University of Michigan team led by Sophia Sinha and Maria Papaleontiou presented a review of charts for 200 adult men with hypogonadism who received a first testosterone prescription between January 2020 and January 2025. Only 12% met their definition of guideline-concordant testing: two low morning levels (total below 300 ng/dL, free below 70 pg/mL, or low bioavailable testosterone) drawn between 5 and 10 a.m., LH and/or FSH measured, and no contraindication to treatment. In the year before the prescription, 62% had a PSA and 77% a complete blood count. Of the men, 55% had obstructive sleep apnea, 4% prostate cancer and 1.5% a PSA above 4 ng/mL before being prescribed. The most common prescription was a topical product (68.5%). The authors framed the findings as a sign of possible overprescribing and suggested decision-support tools. Sources: ${ext(S.endo26PR, "Endocrine Society press release, ENDO 2026")}; ${ext(S.endo26RUN, "Renal and Urology News")}, checked October 31, 2026.</p>
<p>This is a single-institution study presented as a meeting abstract and not yet published as a full peer-reviewed paper. It is also notable for where it was done: an academic health system, not a direct-to-consumer clinic. The gap is not only an online problem.</p>
<h3>The secret-shopper study</h3>
<p>In a research letter in JAMA Internal Medicine in December 2022, Dubin and colleagues at Northwestern sent a scripted patient to seven US direct-to-consumer testosterone platforms. He was 34, reported low energy and low libido, said he wanted children in future, and had normal results: total testosterone 675 ng/dL and free testosterone 10 pg/mL, against reported reference ranges of 264-916 ng/dL and 8.7-25 pg/mL. Six of the seven platforms (85.7%) offered him testosterone. The authors found the platforms' criteria for offering treatment were not in line with Endocrine Society or AUA guidance, with six having no total testosterone threshold for starting. Only one asked about recent cardiovascular events or fertility plans, and per Northwestern's summary 83.3% did not discuss the risk of polycythemia. The companies were not named. Sources: ${ext(S.dubin, "Dubin et al., JAMA Internal Medicine, 2022")}; ${ext(S.dubinNU, "Northwestern Medicine, January 2023")}.</p>
<p>The study is small (one script, seven companies) and its data are from 2022; the market has changed since, and we would not assume any named clinic today behaves the way an anonymous platform did then. Its value is that it tested the extreme case, a man with clearly normal levels, and found that most of the system did not stop him.</p>
<h3>The UK: an editorial in The BMJ</h3>
<p>On October 14, 2026, The BMJ published an editorial by Stephen Atkin and Eric Kilpatrick on the rapid growth of private testosterone prescribing in the UK. They argue it risks pushing treatment towards men with vague symptoms and borderline results, where benefit and long-term risk are least clear, and that the NHS is likely to absorb the monitoring burden. They note that private prescriptions are not recorded nationally, so the scale is unknown; that professional guidelines use different thresholds, so NHS doctors may inherit patients started under looser criteria; and that the UK market was estimated at about $205 million in 2024. They also say testosterone remains a valuable treatment for carefully selected patients and call for national data. Earlier, in January 2026, Medical Xpress reported that family-doctor testosterone prescriptions in England rose 13% in 2024, according to the Care Quality Commission. This is an editorial, an argued opinion rather than new data. Sources: ${ext(S.bmj, "Atkin and Kilpatrick, The BMJ, 2026")}; ${ext(S.bmjGroup, "BMJ Group press release")}; ${ext(S.medxBmj, "Medical Xpress, October 2026")}; ${ext(S.medxUk, "Medical Xpress, January 2026")}, checked October 31, 2026.</p>
<h3>What it adds up to</h3>
<p>Different countries, settings and methods, one pattern: most men are tested at least once, and a minority get the full diagnostic workup. For a patient, the lesson is not to distrust testosterone or online care. It is that the standard of care is something you may need to ask for.</p>`,
    },
    {
      heading: "What does a good online TRT clinic do at intake, and what are the red flags?",
      body: `<p>Online care can meet the guideline standard. Nothing in the workup requires an in-person visit: blood can be drawn at a laboratory or collected at home under the right conditions, and LH, FSH, prolactin, hematocrit and PSA are ordinary laboratory tests. What separates clinics is whether they insist on the full set and whether they are willing to say no.</p>
<h3>What the clinics we review say they do</h3>
<p>Every clinic in our <a href="/trt">TRT ranking</a> builds treatment around laboratory testing and a clinician's review, according to the descriptions we have verified. Hone Health describes at-home hormone testing plus physician-guided therapy, with ongoing monitoring and dose adjustments. TMates includes lab work, clinician review and ongoing check-ins. Male Excel offers at-home lab testing with unlimited provider follow-ups. Taurus Meds and Fridays describe lab-based diagnosis before treatment, with licensed clinicians reviewing results. Brightmeds prescribes after a licensed-clinician review. Maximus starts with at-home testing under board-certified doctor oversight; Hims uses online labs and a provider evaluation; PeterMD includes labs and clinician oversight in its plans. DudeMeds accepts at-home or uploaded labs, publishes its prices (injectable testosterone from $77 a month on its bring-your-own-labs plan, from $98 a month with lab work included, as published in August 2026), and also offers enclomiphene, an option some men use to preserve fertility. See our reviews of <a href="/trt/reviews/hone">Hone Health</a> and <a href="/trt/reviews/dudemeds">DudeMeds</a> for detail.</p>
<p>These are the clinics' own descriptions of their process as we have verified them. We have not verified, clinic by clinic, which tests each orders at intake or how many morning samples each requires, and the panels can change. That is why the checklist below is worth taking to whichever clinic you choose. A good clinic will answer every item without hesitation.</p>
<h3>What a guideline-concordant intake looks like</h3>
<ol>
<li><strong>A symptom and medical history</strong> covering sexual symptoms, sleep and snoring, weight, medications including opioids, past testosterone or steroid use, testicular history, cardiovascular history, urinary symptoms and fertility plans.</li>
<li><strong>Two early-morning, fasting total testosterone results</strong> on separate days, from a named laboratory, preferably with a certified assay.</li>
<li><strong>SHBG and free testosterone</strong> when the total is borderline or SHBG is likely to be unusual.</li>
<li><strong>LH and FSH</strong> before any prescription, and prolactin if LH is low or low-normal.</li>
<li><strong>Hemoglobin and hematocrit</strong>, and a <strong>PSA</strong> for men over 40 (AUA) or in the Endocrine Society's age and risk groups.</li>
<li><strong>A clinician who explains the result</strong>, including what kind of low testosterone you have and whether anything reversible should be addressed first.</li>
<li><strong>A written monitoring plan</strong>: when testosterone, hematocrit and PSA will be rechecked, and what happens if they are out of range.</li>
<li><strong>A willingness to decline or defer</strong> treatment when the results do not support it, and to refer to an endocrinologist or urologist when the pattern is unusual.</li>
</ol>
<h3>Red flags</h3>
<table>
<thead><tr><th>Red flag</th><th>Why it matters</th></tr></thead>
<tbody>
<tr><td>Prescription on a single reading</td><td>One result can be low by chance, timing or food; both guidelines require two</td></tr>
<tr><td>No interest in the time of the draw or fasting</td><td>Afternoon and post-meal samples read lower</td></tr>
<tr><td>No LH or FSH before starting</td><td>The cause cannot be classified, and the chance to measure cleanly is lost once treatment starts</td></tr>
<tr><td>No question about fertility</td><td>Exogenous testosterone suppresses sperm; the AUA says not to prescribe to men trying to conceive</td></tr>
<tr><td>No baseline hematocrit, or no plan to recheck it</td><td>Rising hematocrit is the commonest lab problem on treatment</td></tr>
<tr><td>No PSA in a man over 40</td><td>Outside the AUA guideline</td></tr>
<tr><td>Treatment offered with normal levels "for optimization"</td><td>Not a guideline indication; the 2022 secret-shopper study found this was common</td></tr>
<tr><td>Hard to cancel, or monitoring sold as an extra</td><td>Monitoring is part of safe treatment, not an upsell</td></tr>
</tbody>
</table>
<p>Our guides to <a href="/trt/articles/how-to-get-trt-online">getting TRT online</a> and <a href="/trt/articles/trt-clinic-vs-online">TRT clinic versus online</a> cover the rest of the process, including when an in-person endocrinologist or urologist is the better route.</p>
<h3>Bringing your own results</h3>
<p>One practical point. Some clinics, DudeMeds among them, let you upload labs from elsewhere. A man who already has two morning results, an LH and a blood count from his own doctor can use them, and a clinic that accepts outside results makes it easier to meet the standard without repeating everything. Check that the uploaded results meet the timing and fasting conditions, and that they are recent.</p>`,
    },
    {
      heading: "What monitoring should happen after you start TRT?",
      body: `<p>Diagnosis is the gate; monitoring is the guard rail. Both guidelines set out what should be rechecked once treatment starts, and a clinic that does not plan for it is not following either. The table below combines them. Where the two differ, both are shown.</p>
<table>
<thead><tr><th>What</th><th>Endocrine Society (2018)</th><th>AUA (2018, validity confirmed 2024)</th><th>Action thresholds</th></tr></thead>
<tbody>
<tr><td>Symptoms, side effects, adherence</td><td>At 3-6 months after starting, then annually, as part of a standardized plan</td><td>At follow-up visits; reassess benefit</td><td>Lack of symptom benefit is a reason to review whether to continue</td></tr>
<tr><td>Testosterone level</td><td>At 3-6 months, then as part of annual review</td><td>Every 6-12 months on treatment; aim for the middle tertile of the normal range</td><td>Prescriber adjusts if out of target</td></tr>
<tr><td>Hematocrit</td><td>Baseline, at 3-6 months, then annually</td><td>Baseline (aim below 50%), then every 6-12 months, or sooner depending on prior values, to keep below 54%</td><td>Above 54%: guidance is to stop or adjust treatment until it falls and look for causes</td></tr>
<tr><td>PSA and prostate</td><td>Men 55-69 (and 40-69 at increased risk) choosing monitoring: before, at 3-12 months, then standard screening</td><td>Baseline in men over 40, with follow-up as part of monitoring</td><td>Refer: PSA rise above 1.4 ng/mL in 12 months, confirmed PSA above 4, abnormal examination, worsening urinary symptoms</td></tr>
<tr><td>Estradiol</td><td>Not routine</td><td>If breast symptoms or gynecomastia develop, and in men on aromatase inhibitors</td><td>Clinical judgment</td></tr>
<tr><td>Blood pressure</td><td>Part of routine review</td><td>Part of routine review</td><td>2025 FDA label warns of blood pressure increases</td></tr>
<tr><td>Fertility</td><td>Revisit plans at each review</td><td>Discuss impact on sperm production with men interested in future fertility</td><td>Change of plans means a change of treatment discussion</td></tr>
</tbody>
</table>
<p>Sources: ${ext(S.esGuideline, "Endocrine Society guideline, 2018")}; ${ext(S.esPlenary, "guideline presentation, 2018")}; ${ext(S.aua, "AUA guideline")}; ${ext(S.auaTable7, "AUA follow-up laboratory testing table")}; ${ext(S.fdaLabel, "FDA, February 2025")}, checked October 31, 2026.</p>
<h3>Reading the schedule</h3>
<p>The first recheck is the important one. At three to six months a clinician learns whether the level is where it should be, whether hematocrit has risen, whether the PSA has moved and whether the symptoms that justified treatment have improved. If the symptoms have not changed despite a normal testosterone level on treatment, that is useful information: it suggests the symptoms had another cause. A good clinician will say so rather than raise the dose.</p>
<p>The hematocrit row deserves the most attention. The 2026 meta-analysis we described found testosterone raised hematocrit in the obesity trials it pooled, and the secret-shopper study found most platforms did not mention the risk. The guideline threshold of 54% is a stop-and-reassess line, not a target. A man whose hematocrit is climbing towards it should expect his prescriber to act: change the product or dose, look for sleep apnea, or pause treatment. Those are prescriber decisions, and they are the reason monitoring exists.</p>
<h3>Timing of the monitoring draw</h3>
<p>How the testosterone level on treatment is timed depends on the product, because injections, gels and other forms produce different patterns across the dosing interval. The prescriber will say when to draw it. The morning-and-fasting rule for diagnosis is about the body's own rhythm; on treatment, the timing relative to the dose matters more.</p>
<p>Our guide to <a href="/trt/articles/trt-blood-work">TRT blood work</a> covers the panel from the patient side, and the guide to <a href="/trt/articles/is-trt-safe">whether TRT is safe</a> covers the risks the monitoring is designed to catch.</p>`,
    },
    {
      heading: "Three worked examples: how the workup changes the answer",
      body: `<p>These examples are composites built to show how the guideline rules apply. They are not real patients, and they are not treatment recommendations; in each case the decision belongs to a clinician with the full history.</p>
<h3>Example 1: one low result, then a normal one</h3>
<p>A 38-year-old man with low energy orders a home kit and tests at 2 p.m. after lunch. His total testosterone is 285 ng/dL. A clinic offers treatment. Instead he repeats the test at 8 a.m., fasting, a week later: 410 ng/dL. On the evidence above, both results are plausible for the same man: the afternoon draw could account for roughly a fifth to a quarter of the difference at his age (Brambilla, 2009), and eating beforehand could account for more (Caronia, 2013). He does not meet either guideline's definition. His tiredness needs a different explanation, and that is a conversation to have with a clinician rather than a reason to start testosterone.</p>
<h3>Example 2: two low mornings, a low LH and excess weight</h3>
<p>A 49-year-old man with a body mass index in the obese range, loud snoring and low libido has two fasting morning totals of 255 and 270 ng/dL, a low SHBG, a calculated free testosterone near the bottom of the range and an LH in the low-normal range. Prolactin is normal. He meets the AUA's cut-off on both tests and sits at or just below the Endocrine Society's harmonized limit. His pattern is secondary and probably functional: weight and possible sleep apnea are suppressing the signal. The Endocrine Society would have his clinician address those first, starting with a sleep study, because untreated severe sleep apnea is a reason not to start testosterone. The 2026 meta-analysis found testosterone improved waist and lean mass in men like him but raised hematocrit, and lifestyle and GLP-1 strategies were among the alternatives compared. A clinician might reasonably offer weight-loss treatment and retest, or, with marked symptoms, discuss testosterone with close monitoring. Either way, the low LH and the snoring change the conversation. See our guide to <a href="/trt/articles/weight-loss-testosterone-glp1-vs-trt">weight loss versus TRT</a>.</p>
<h3>Example 3: two low mornings, a high LH, and fertility plans</h3>
<p>A 33-year-old man with a history of mumps affecting the testicles has two morning totals of 230 and 245 ng/dL, a high LH and high FSH, and low libido. He and his partner want a child within a year. His pattern is primary hypogonadism, which weight loss would not fix, and he meets both guidelines' thresholds. But he is trying to conceive, and the AUA says exogenous testosterone should not be prescribed to men currently trying to conceive. The right next step is a reproductive health evaluation, including a semen analysis, and a referral to a urologist or andrologist who can discuss fertility-preserving options. A clinic that sends him a testosterone prescription after a questionnaire has done him harm, however accurate the diagnosis.</p>
<h3>What the examples share</h3>
<p>In each case the number that started the process was not the number that decided it. The decision came from the repeat test, the LH, the history and the fertility question, which are the steps the 2026 evidence suggests are most often skipped.</p>`,
    },
    {
      heading: "What if you are already on TRT and never had the full workup?",
      body: `<p>On the Epic Research figures, that describes most men currently on testosterone in the US. It is not a reason to panic, and it is not a reason to stop on your own. It is a reason to have a review with your prescriber, and to know which parts of the missing workup can still be done.</p>
<h3>What can still be checked on treatment</h3>
<ul>
<li><strong>Hematocrit and hemoglobin.</strong> These can be measured at any time and are the most useful safety check. If you have never had one since starting, ask for one now; the guideline thresholds in the monitoring table apply.</li>
<li><strong>PSA.</strong> Also measurable at any time, and the Endocrine Society's referral triggers (a rise of more than 1.4 ng/mL within a year, or a confirmed value above 4 ng/mL) assume there is a baseline to compare against. If there is none, a current value starts the record.</li>
<li><strong>Blood pressure.</strong> The 2025 label warns of increases. A home reading is a reasonable start; tell your prescriber about it.</li>
<li><strong>Symptoms.</strong> Write down whether the symptoms that led you to treatment have changed. If they have not, that is information your prescriber needs.</li>
</ul>
<h3>What cannot be checked cleanly on treatment</h3>
<p>Your original LH, FSH and untreated testosterone level cannot be measured while you are taking testosterone, because the treatment suppresses them. That means the question of whether your low testosterone was primary, secondary or functional usually cannot be answered without a supervised pause in treatment, and whether a pause makes sense is a decision for your prescriber, often with an endocrinologist or urologist. Our guide to <a href="/trt/articles/can-you-stop-trt">whether you can stop TRT</a> covers what that involves and how recovery tends to go.</p>
<h3>Fertility, again</h3>
<p>If your plans have changed and you now want children, raise it straight away. The AUA's position is that exogenous testosterone should not be prescribed to men trying to conceive, and the alternatives take time to work. This is the situation in which a specialist referral is most clearly worth it.</p>
<h3>What not to do</h3>
<p>Do not stop, reduce or change your treatment without your prescriber, and do not add other hormones or medicines on your own to "protect" fertility or estradiol. The point of the review is to get a clinician to look at the gaps, not to fill them yourself.</p>`,
    },
    {
      heading: "Who this guide is for, and who it isn't for",
      body: `<h3>This guide is for</h3>
<ul>
<li><strong>Men who have been told their testosterone is low</strong> on one test and want to know whether that is a diagnosis.</li>
<li><strong>Men considering an online TRT clinic</strong> who want to know what a proper intake looks like before they pay.</li>
<li><strong>Men already on testosterone</strong> who were never given a second test, an LH or a fertility conversation, and want to know what was missed and what to ask now.</li>
<li><strong>Partners and family members</strong> trying to make sense of a result or a sales pitch.</li>
</ul>
<h3>This guide is not for</h3>
<ul>
<li><strong>Adolescents with delayed puberty</strong>, whose assessment is different and belongs with a pediatric endocrinologist.</li>
<li><strong>Transgender men and others using testosterone for gender-affirming care</strong>, for whom the diagnostic framework here does not apply.</li>
<li><strong>Women considering testosterone</strong>, which is a different evidence base; see our HRT section.</li>
<li><strong>Men looking for a dosing plan or a way to self-source testosterone.</strong> We do not give either. Doses are set by a prescriber.</li>
<li><strong>Men with an urgent problem</strong>, such as severe headaches with visual change, a breast lump, or a new testicular lump. These need prompt in-person care, not a lab panel.</li>
</ul>`,
    },
    {
      heading: "What we don't know yet",
      body: `<p>The diagnostic rules are well established. Several of the questions around them are not.</p>
<ul>
<li><strong>The right threshold for older men.</strong> The harmonized range comes from healthy men aged 19 to 39. Whether an older man with symptoms and a level of 280 ng/dL benefits from treatment as much as a younger man is not settled by trial evidence, and the December 2025 panel and the June 2026 label request show regulators and experts disagree on how much that matters.</li>
<li><strong>Long-term outcomes.</strong> TRAVERSE answered the short-to-medium-term cardiovascular question in men at high risk. It did not answer questions about decades of treatment, which is why the Endocrine Society called in 2026 for a long-term Men's Health Initiative study.</li>
<li><strong>How common proper diagnosis really is.</strong> The Epic analysis cannot see symptoms or draw times; the ENDO 2026 study is a single-center abstract; the secret-shopper study is small and dated. The direction is consistent, but the exact share of men correctly diagnosed is uncertain.</li>
<li><strong>The best treatment for functional hypogonadism.</strong> The 2026 meta-analysis rated the certainty of many of its comparisons low or very low. There is still no large trial comparing weight loss against testosterone on symptoms in men with obesity-related low testosterone.</li>
<li><strong>How food and timing affect home kits.</strong> The timing and glucose studies used venous blood. We did not find studies on how well at-home collection methods reproduce venous results under different conditions.</li>
<li><strong>What the final label will say.</strong> The June 2026 changes were described as a request. We found no announcement that they had been finalized by October 31, 2026.</li>
<li><strong>The UK picture.</strong> Private prescriptions are not recorded nationally, as the BMJ editorial points out, so the scale of private prescribing there is unknown.</li>
</ul>`,
    },
    {
      heading: "What should you ask your clinician before starting TRT?",
      body: `<p>Take this list to the consultation, whether it is a video visit or an office. A good clinician will be glad you asked; none of these questions is unusual.</p>
<h3>About the diagnosis</h3>
<ol>
<li>Do I have two low testosterone results, both early-morning and fasting, on separate days?</li>
<li>Which laboratory ran them, and is its method CDC HoST-certified?</li>
<li>Was my SHBG measured, and what is my free testosterone, and how was it measured or calculated?</li>
<li>What were my LH and FSH, and does that make my low testosterone primary or secondary?</li>
<li>If my LH is low or low-normal, has my prolactin been checked, and do I need any further pituitary assessment?</li>
<li>Is there anything reversible here (my weight, sleep, snoring, medicines, a recent illness) that we should address first?</li>
<li>Which of my symptoms do you think are caused by low testosterone, and which might have other causes?</li>
</ol>
<h3>About safety</h3>
<ol start="8">
<li>What is my baseline hematocrit, and what will we do if it rises?</li>
<li>Do I need a PSA or prostate examination before starting, given my age and risk?</li>
<li>Do I need a sleep study before starting?</li>
<li>What is my blood pressure, and how will it be monitored?</li>
</ol>
<h3>About fertility</h3>
<ol start="12">
<li>Will this treatment affect my fertility, and how much?</li>
<li>Should I have a semen analysis first?</li>
<li>If I want children in the next few years, what are the alternatives to testosterone?</li>
</ol>
<h3>About the plan</h3>
<ol start="15">
<li>When will my testosterone, hematocrit and PSA be rechecked, and is that included in the price?</li>
<li>How will we judge whether treatment is working, and what happens if my symptoms don't improve?</li>
<li>If I want to stop, how do I stop, and what should I expect?</li>
</ol>
<p>If a clinic cannot answer questions 1, 4, 8 and 12, that tells you what you need to know about its intake.</p>`,
    },
    {
      heading: "Final verdict and next steps",
      body: `<p>A low testosterone diagnosis is a short list of tests done properly: two early-morning, fasting totals on separate days, free testosterone when SHBG is in question, LH and FSH, prolactin when LH is low, and a history that looks for illness, short sleep, sleep apnea, opioids and excess weight. Before treatment come a hematocrit, a PSA where age and risk call for it, and a frank conversation about fertility. That is what the AUA and the Endocrine Society require, what the TRAVERSE trial used to enroll its men, and what the 2026 evidence shows most men starting testosterone have not had.</p>
<p>The 2025 and 2026 regulatory changes made testosterone look safer and may make it easier to prescribe. They did not change what counts as a diagnosis. Many online clinics, including those we review, describe processes built around lab testing and clinician review, and a man who asks for the full workup can usually get it. The point of this guide is to make sure you know what to ask for.</p>
<h3>Next steps</h3>
<ol>
<li><strong>If you have one low result</strong>: repeat it before 10 a.m., fasting, on a different day, when you are well. Read our guide to <a href="/trt/articles/normal-testosterone-levels-by-age">normal levels by age</a> while you wait.</li>
<li><strong>If you have two low results</strong>: ask for LH, FSH, SHBG and a blood count, and prolactin if LH is low. Our guide to <a href="/trt/articles/trt-blood-work">TRT blood work</a> covers the panel.</li>
<li><strong>If fertility matters to you</strong>: raise it first, and read <a href="/trt/articles/trt-and-fertility">TRT and fertility</a> and <a href="/trt/articles/enclomiphene-vs-trt">enclomiphene versus TRT</a>.</li>
<li><strong>If weight, sleep or opioids are in the picture</strong>: read <a href="/trt/articles/weight-loss-testosterone-glp1-vs-trt">weight loss versus TRT</a> and discuss treating the cause first.</li>
<li><strong>If you are ready to choose a provider</strong>: use the intake checklist above with our <a href="/trt">TRT clinic ranking</a>, our guide to <a href="/trt/articles/how-to-get-trt-online">getting TRT online</a>, and <a href="/trt/articles/trt-clinic-vs-online">clinic versus online</a>.</li>
</ol>
<p><em>This article is general information, not medical advice. Testosterone is a prescription medicine with risks. The diagnosis, the decision to treat, the choice of product and the dose belong to a licensed clinician who has your results and history.</em></p>`,
    },
    {
      heading: "References",
      body: `<ol>
<li>${ext(S.aua, "Mulhall JP et al. Evaluation and Management of Testosterone Deficiency: AUA Guideline. American Urological Association; published 2018, reviewed and validity confirmed 2024")}; ${ext(S.auaPubmed, "Journal of Urology, 2018 (PubMed)")}.</li>
<li>${ext(S.auaPR, "AUA releases new clinical guideline for diagnosis and treatment of testosterone deficiency. American Urological Association press release, 2018")}.</li>
<li>${ext(S.auaTable7, "AUA Testosterone Deficiency Guideline, Table Seven: Follow-up laboratory testing. American Urological Association")}.</li>
<li>${ext(S.esGuideline, "Bhasin S et al. Testosterone Therapy in Men With Hypogonadism: An Endocrine Society Clinical Practice Guideline. Journal of Clinical Endocrinology and Metabolism, 2018")}.</li>
<li>${ext(S.esPlenary, "Testosterone Therapy in Men with Hypogonadism: guideline presentation. Endocrine Society, 2018")}.</li>
<li>${ext(S.esStatement, "Statement on Testosterone Replacement Therapy. Endocrine Society, July 16, 2026")}; ${ext(S.esStatementNW, "reprinted by Newswise")}.</li>
<li>${ext(S.esDha, "Endocrine Society Statement on the Defense Health Agency's Clinical Practice Guideline for Testosterone Deficiency in the Male Service Member. Endocrine Society, September 24, 2026")}.</li>
<li>${ext(S.bssm, "British Society for Sexual Medicine Guidelines on Adult Testosterone Deficiency, with Statements for UK Practice. Journal of Sexual Medicine, 2017")}.</li>
<li>${ext(S.travison, "Travison et al. Harmonized Reference Ranges for Circulating Testosterone Levels in Men of Four Cohort Studies in the United States and Europe. Journal of Clinical Endocrinology and Metabolism, 2017")}; ${ext(S.travisonPR, "Endocrine Society press release, January 2017")}.</li>
<li>${ext(S.fdaLabel, "FDA issues class-wide labeling changes for testosterone products. US Food and Drug Administration, February 28, 2025")}.</li>
<li>${ext(S.fdaInfo, "Testosterone Information. US Food and Drug Administration")}.</li>
<li>${ext(S.hhs2026, "HHS Announces Requested Updates to Testosterone Therapy Product Labels. US Department of Health and Human Services, June 18, 2026")}.</li>
<li>${ext(S.uroTimes2026, "HHS requests testosterone therapy label updates, citing new safety data. Urology Times, June 19, 2026")}.</li>
<li>${ext(S.cnn2026, "What men should know about the US government's latest move on testosterone therapy. CNN, syndicated by KVIA, June 20, 2026")}.</li>
<li>${ext(S.fdaPanel, "FDA panel supports expanding population indicated for testosterone therapy. Healio, December 10, 2025")}.</li>
<li>${ext(S.traverse, "Lincoff AM et al. Cardiovascular Safety of Testosterone-Replacement Therapy (TRAVERSE). New England Journal of Medicine, 2023")}.</li>
<li>${ext(S.epic, "Most Men Starting Testosterone Had Prior Testing, but Only 1 in 5 Met the Two-Test Standard. Epic Research, 2026")}; ${ext(S.epicYahoo, "Yahoo Health coverage, 2026")}.</li>
<li>${ext(S.endo26PR, "Testosterone therapy in men may be overprescribed, inconsistent with clinical guidelines. Endocrine Society press release, ENDO 2026, June 2026")}.</li>
<li>${ext(S.endo26RUN, "ENDO: Few Men Receiving Testosterone Undergo Guideline-Concordant Diagnostic Testing. Renal and Urology News, June 2026")}.</li>
<li>${ext(S.dubin, "Dubin et al. Guideline-Discordant Care Among Direct-to-Consumer Testosterone Therapy Platforms. JAMA Internal Medicine, December 2022")}.</li>
<li>${ext(S.dubinNU, "Direct-to-Consumer Online Platforms Expand Access, but Often Fail to Convey Risks of Testosterone Therapy. Northwestern Medicine News Center, January 5, 2023")}.</li>
<li>${ext(S.bmj, "Atkin S, Kilpatrick E. Editorial on private testosterone prescribing in the UK. The BMJ, October 14, 2026")}; ${ext(S.bmjGroup, "BMJ Group press release")}.</li>
<li>${ext(S.medxBmj, "Rise in private testosterone prescribing risks overtreatment and more strain on the NHS. Medical Xpress, October 2026")}.</li>
<li>${ext(S.medxUk, "Social media fuels surge in UK men seeking testosterone jabs. Medical Xpress, January 2026")}.</li>
<li>${ext(S.nma, "Treatment strategies for functional hypogonadism in obese men: a systematic review and network meta-analysis. Journal of Sexual Medicine, 2026")}; ${ext(S.nmaPubmed, "PubMed record")}.</li>
<li>${ext(S.brambilla09, "Brambilla DJ et al. The Effect of Diurnal Variation on Clinical Measurement of Serum Testosterone and Other Sex Hormone Levels in Men. Journal of Clinical Endocrinology and Metabolism, 2009")}.</li>
<li>${ext(S.brambilla07, "Brambilla DJ et al. Intraindividual variation in levels of serum testosterone and other reproductive and adrenal hormones in men. Clinical Endocrinology, 2007")}.</li>
<li>${ext(S.caronia, "Caronia et al. Abrupt decrease in serum testosterone levels after an oral glucose load in men: implications for screening for hypogonadism. Clinical Endocrinology, 2013")}.</li>
<li>${ext(S.emas, "Low free testosterone is associated with hypogonadal signs and symptoms in men with normal total testosterone levels: results from the European Male Ageing Study (PMC)")}.</li>
<li>${ext(S.sleep, "Leproult R, Van Cauter E. Effect of 1 Week of Sleep Restriction on Testosterone Levels in Young Healthy Men. JAMA, 2011")}; ${ext(S.sleepUC, "University of Chicago Medicine press release, May 2011")}.</li>
<li>${ext(S.opioid, "Coluzzi F et al. Testosterone deficiency in non-cancer opioid-treated patients. Journal of Endocrinological Investigation, 2018 (PMC)")}.</li>
<li>${ext(S.spratt, "Spratt DI et al. Both hyper- and hypogonadotropic hypogonadism occur transiently in acute illness: bio- and immunoactive gonadotropins. Journal of Clinical Endocrinology and Metabolism, 1993")}.</li>
<li>${ext(S.devine, "Devine et al. Plasma steroid concentrations reflect acute disease severity (hospitalized COVID-19 cohorts). Clinical Endocrinology, 2024")}.</li>
<li>${ext(S.who1990, "World Health Organization Task Force on Methods for the Regulation of Male Fertility. Contraceptive efficacy of testosterone-induced azoospermia in normal men. The Lancet, 1990")}.</li>
</ol>`,
    },
  ],
};
