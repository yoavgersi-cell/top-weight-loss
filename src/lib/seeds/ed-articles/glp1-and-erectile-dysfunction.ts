import type { ArticleData } from "../../config";

// ───── GLP-1 drugs and erectile dysfunction (Oct 31, 2026) ─────
// Long-form guide for treatmentshub.com/ed on whether semaglutide and
// tirzepatide help or harm erections, and what a man on a GLP-1 should do
// about ED. Sourcing rules: every study figure links the paper, its PubMed
// record or a dated report of it, and is labelled by design (randomised,
// exploratory analysis of a randomised trial, database cohort, Mendelian
// randomisation, adverse-event reports, conference abstract). No study here
// is described as showing causation unless it was designed to. Label
// language (Wegovy, Zepbound, Viagra, Cialis) links the label. The ENDO 2025
// testosterone reports are cited exactly as in trt-articles-2026-10.ts, and
// the heart-risk figures exactly as in ed-articles-2026-10.ts. Provider facts
// and prices are copied from ed.ts with their conditions; no new prices. No
// dose instructions beyond what the labels state; the prescriber decides.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  // Studies pointing to harm or a signal
  liaoNature: "https://www.nature.com/articles/s41443-024-00895-6",
  liaoPubmed: "https://pubmed.ncbi.nlm.nih.gov/38778151/",
  liaoAbstract: "https://doi.org/10.1093/jsxmed/qdae001.148",
  urologyTimes: "https://www.urologytimes.com/view/semaglutide-for-weight-loss-may-increase-risk-for-ed-in-non-diabetic-men",
  tangPubmed: "https://pubmed.ncbi.nlm.nih.gov/42005929/",
  tangLancet: "https://www.thelancet.com/journals/eclinm/article/PIIS2589-5370(26)00104-5/fulltext",
  tangEmj: "https://www.emjreviews.com/diabetes/news/glp-1-use-may-be-tied-to-erectile-dysfunction/",
  faers: "https://www.urotoday.com/recent-abstracts/men-s-health/erectile-dysfunction/160286-male-sexual-dysfunction-associated-with-glp-1-receptor-agonists-a-cross-sectional-analysis-of-faers-data.html",
  faersAntidiabetic: "https://pubmed.ncbi.nlm.nih.gov/41883294/",
  // Studies pointing to benefit or no harm
  rewind: "https://pubmed.ncbi.nlm.nih.gov/34153269/",
  mr: "https://www.frontiersin.org/journals/endocrinology/articles/10.3389/fendo.2024.1448394/full",
  cowart: "https://pubmed.ncbi.nlm.nih.gov/40614622/",
  cowartReport: "https://medicaldialogues.in/diabetes-endocrinology/news/tirzepatide-tied-to-lower-risk-of-erectile-dysfunction-in-men-with-type-2-diabetes-study-reveals-151268",
  tirzPilot: "https://pubmed.ncbi.nlm.nih.gov/40604795/",
  tirzPilotFull: "https://link.springer.com/article/10.1186/s12958-025-01425-9",
  friendFoe: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12467596/",
  // Weight loss and erections
  esposito: "https://pubmed.ncbi.nlm.nih.gov/15213209/",
  bariatric2023: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10234872/",
  bariatric2020: "https://link.springer.com/content/pdf/10.1186/s12894-020-00707-1.pdf",
  // Testosterone (same reports as the TRT guide)
  endoHealio: "https://www.healio.com/news/endocrinology/20250715/obesity-drugs-may-raise-testosterone-in-men",
  endoTirz: "https://www.healio.com/news/endocrinology/20250724/tirzepatide-important-choice-for-increasing-testosterone-in-metabolic-hypogonadism",
  medx: "https://medicalxpress.com/news/2025-07-anti-obesity-medications-testosterone-men.html",
  endoGuideline: "https://academic.oup.com/jcem/article/103/5/1715/4939465",
  // GLP-1 trials and labels
  step1: "https://doi.org/10.1056/NEJMoa2032183",
  step1Summary: "https://wikijournalclub.org/wiki/STEP_1",
  step1Ext: "https://doi.org/10.1111/dom.14725",
  surmount1: "https://doi.org/10.1056/NEJMoa2206038",
  select: "https://doi.org/10.1056/NEJMoa2307563",
  wegovyLabel: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/215256s000lbl.pdf",
  wegovyLabelCurrent: "https://medlibrary.org/lib/rx/meds/wegovy/page/5/",
  zepboundLabel: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/217806s042lbl.pdf",
  lillyContraception: "https://medical.lilly.com/us/products/answers/can-adults-with-obesity-or-overweight-taking-zepbound-also-take-oral-contraceptives-211019",
  drugsCom: "https://www.drugs.com/drug-interactions/ozempic-with-sildenafil-3878-18733-2061-0.html",
  // ED drug labels and monographs
  viagraLabel: "https://labeling.pfizer.com/ShowLabeling.aspx?id=652",
  viagraFdaArchive: "https://webarchive.library.unt.edu/eot2008/20080917195227/http://www.fda.gov/cder/consumerinfo/viagra/viagralabel2.pdf",
  cialisFdaArchive: "https://webarchive.library.unt.edu/eot2008/20081028113754/http:/www.fda.gov/MEDWATCH/safety/2007/Oct_PI/Cialis_PI.pdf",
  sildenafilMp: "https://medlineplus.gov/druginfo/meds/a699015.html",
  tadalafilMp: "https://medlineplus.gov/druginfo/meds/a604008.html",
  aua: "https://www.auanet.org/documents/Guidelines/PDF/ED-JU.pdf",
  fdaCompounding: "https://www.fda.gov/drugs/human-drug-compounding/consumer-and-health-care-professional-information",
  // ED, diabetes and the heart (same sources as our ED guides)
  niddkCauses: "https://www.niddk.nih.gov/health-information/urologic-diseases/erectile-dysfunction/symptoms-causes",
  niddkDiabetes: "https://www.niddk.nih.gov/health-information/diabetes/overview/preventing-problems/sexual-bladder-problems",
  umbrella: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8359379/",
  princeton: "https://www.sciencedirect.com/science/article/abs/pii/S0025619624002763",
};

const CHECKED = "checked October 31, 2026";

export const ED_GLP1_ARTICLE: ArticleData = {
  slug: "glp1-and-erectile-dysfunction",
  title: "GLP-1 Drugs and Erectile Dysfunction: Help or Harm? (2026)",
  description:
    "What the studies show on semaglutide, tirzepatide and erectile dysfunction, why weight loss usually helps, and how to use ED pills safely on a GLP-1.",
  category: "Science",
  readTime: "53 min read",
  publishedAt: "2026-10-31",
  updatedAt: "2026-10-31",
  heroColor: "#1a2f45",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "The evidence points both ways and none of it proves cause. A 2024 database study of non-diabetic men aged 18 to 50 found an ED diagnosis or ED prescription in 1.47% of men prescribed semaglutide against 0.32% of matched men who were not; a 2026 study in men with type 2 diabetes found a 26% higher ED rate on GLP-1 drugs that lost statistical significance after a test for hidden bias.",
    "The randomised and weight-loss evidence leans toward benefit. In the REWIND trial, men on dulaglutide developed moderate or severe ED slightly less often than men on placebo (21.3 versus 22.0 per 100 person-years), and in a 2004 JAMA trial about a third of obese men with ED who lost weight and exercised regained normal erectile function.",
    "No GLP-1 label lists sildenafil, tadalafil or any ED pill as an interaction. Both the Wegovy and Zepbound labels say the drugs slow stomach emptying and may affect absorption of oral medicines, which is the practical reason an ED pill can seem slower or weaker in the first weeks and after dose increases.",
    "For most men on a GLP-1 with ED, the sensible plan is to keep the GLP-1, tell both prescribers about both drugs, avoid nitrates, stay hydrated, and get the checks that ED should trigger anyway: blood pressure, glucose, lipids and, where symptoms fit, two morning testosterone tests.",
  ],
  sections: [
    {
      heading: "Do GLP-1 drugs cause or help erectile dysfunction?",
      body: `<div class="qa"><strong>The short answer</strong><p>Probably more help than harm, but the evidence is not settled. Weight loss reliably improves erections and testosterone in men with obesity, and a randomised trial of dulaglutide found slightly fewer new cases of erectile dysfunction (ED) than placebo. Two database studies linked semaglutide and other GLP-1 drugs to more ED diagnoses, but the absolute numbers were small and the larger study's signal disappeared after a test for hidden bias. No study shows GLP-1 drugs cause ED. A man who notices ED on a GLP-1 should keep the drug and talk to his prescriber. Sources: ${ext(S.liaoPubmed, "Liao et al., 2024")}; ${ext(S.tangPubmed, "Tang et al., 2026")}; ${ext(S.rewind, "REWIND analysis, 2021")}, ${CHECKED}.</p></div>
<p>Semaglutide (Wegovy, Ozempic) and tirzepatide (Zepbound, Mounjaro) are now among the most prescribed drugs in the United States, and a large share of the men taking them are in the age and weight range where erectile dysfunction is common. Two headlines collide in their inboxes. One says these drugs cause ED. The other says weight loss cures it. Both are oversimplified, and a man trying to decide what to do with a weekly injection and an unreliable erection deserves better than either.</p>
<p>This guide sets out what each study actually measured, how strong each one is, and what the numbers mean in absolute terms. It explains the ways a GLP-1 could plausibly make erections worse in the short term and better in the long term, what the drug labels say about combining GLP-1 drugs with ED pills, and which ED treatments fit most easily alongside a weekly injection. It ends with a symptom table, a list of questions for your clinician and a plan.</p>
<p>Three rules run through it. First, we separate association from causation every time: a database study that finds more ED diagnoses in men on a drug has found a correlation, and we say so. Second, nothing here is a reason to stop, lower or space out a prescribed GLP-1 dose; the dose belongs to your prescriber. Third, every figure carries its source and the date we checked it, and where we could not find a source for a claim that circulates online, we left it out.</p>
<h3>How to read this guide</h3>
<p>If you only have five minutes, read the evidence table in the next section, the symptom table in the section on when to call a doctor, and the final verdict. If you are on a GLP-1 and already have ED, the sections on taking ED pills with a GLP-1 and on which treatments fit best are the practical core. If you are deciding whether to start a GLP-1 and worried about your sex life, the sections on weight loss, testosterone and the heart explain why the long-term balance probably favours treatment.</p>`,
    },
    {
      heading: "The evidence at a glance: every study that matters",
      body: `<p>The table below gathers the studies that address GLP-1 drugs and erectile function directly, plus the two strongest pieces of evidence on weight loss and erections. It is ordered roughly by the strength of the design, from randomised evidence to adverse-event reports. "Strength" is our assessment of how much weight each finding can bear, based on its design and size, not a formal grading.</p>
<table>
<thead><tr><th>Study</th><th>Design</th><th>Population</th><th>Finding (as reported)</th><th>Strength</th></tr></thead>
<tbody>
<tr><td>${ext(S.rewind, "REWIND erectile function analysis, Bajaj et al., Lancet Diabetes &amp; Endocrinology, 2021")}</td><td>Exploratory analysis of a placebo-controlled randomised trial</td><td>3,725 men with type 2 diabetes who completed the erectile function questionnaire</td><td>Moderate or severe ED developed at 21.3 per 100 person-years on dulaglutide versus 22.0 on placebo (HR 0.92, 95% CI 0.85-0.99)</td><td>Moderate: randomised, large, but exploratory, a subset, and dulaglutide is not a weight-loss drug</td></tr>
<tr><td>${ext(S.esposito, "Esposito et al., JAMA, 2004")}</td><td>Randomised trial of lifestyle change</td><td>110 obese men aged 35 to 55 with ED, no diabetes, hypertension or high cholesterol</td><td>17 men in the intervention group versus 3 controls reached a normal erectile function score; weight and activity changes were independently linked to improvement</td><td>Moderate: randomised, but small and single-centre; tests weight loss, not a drug</td></tr>
<tr><td>${ext(S.bariatric2023, "Bariatric surgery meta-analysis, Obesity Surgery, 2023")}</td><td>Meta-analysis of 14 studies</td><td>508 men having weight-loss surgery</td><td>Significant improvement in erectile function scores after surgery; study quality rated moderate</td><td>Moderate: consistent, but mostly uncontrolled before-and-after studies</td></tr>
<tr><td>${ext(S.tangPubmed, "Tang et al., eClinicalMedicine, 2026")}</td><td>Target trial emulation using health records</td><td>About 4,900 men with type 2 diabetes starting a GLP-1 drug and about 5,500 starting a DPP-4 inhibitor</td><td>ED at 35.2 versus 28.0 per 1,000 person-years (HR 1.26, 95% CI 1.08-1.46); attenuated and no longer significant after negative control calibration</td><td>Low to moderate: careful design, but observational, and the signal did not survive the bias test</td></tr>
<tr><td>${ext(S.liaoPubmed, "Liao et al., International Journal of Impotence Research, 2024/2025")}</td><td>Retrospective matched cohort (TriNetX database)</td><td>3,094 non-diabetic men aged 18 to 50 with BMI over 30 prescribed semaglutide, and 3,094 matched men who were not</td><td>New ED diagnosis or ED prescription in 1.47% versus 0.32% (RR 4.5, 95% CI 2.3-9.0); testosterone deficiency 1.53% versus 0.80%</td><td>Low: observational, short follow-up, composite outcome that includes prescriptions</td></tr>
<tr><td>${ext(S.cowart, "Cowart et al., Journal of Diabetes and its Complications, 2025")}</td><td>Retrospective matched cohort (TriNetX database)</td><td>Men aged 18 to 70 with type 2 diabetes and no prior ED</td><td>Lower ED diagnosis or ED prescription with tirzepatide than sitagliptin (RR 0.70), injectable semaglutide (RR 0.67) or dulaglutide (RR 0.55)</td><td>Low: observational, same database type and outcome definition as Liao</td></tr>
<tr><td>${ext(S.tirzPilot, "Tirzepatide pilot, Reproductive Biology and Endocrinology, 2025")}</td><td>Controlled, non-randomised pilot, 2 months</td><td>83 men with obesity and metabolic hypogonadism</td><td>Larger rise in erectile function score (IIEF-5) and testosterone with tirzepatide than with testosterone gel or lifestyle alone</td><td>Low: small, short, groups chosen by patient preference</td></tr>
<tr><td>${ext(S.mr, "An, Xie and Gan, Frontiers in Endocrinology, 2024")}</td><td>Drug-target Mendelian randomisation</td><td>Genetic data from large population cohorts</td><td>Genetic proxies for GLP-1 receptor activity associated with lower ED risk (OR 0.493)</td><td>Low to moderate: avoids some confounding, but models lifelong genetics, not a weekly drug</td></tr>
<tr><td>${ext(S.faers, "FAERS analysis, International Journal of Impotence Research, 2025")}</td><td>Adverse-event reports to the FDA, 2003 to 2024</td><td>182 reports of male sexual dysfunction on GLP-1 drugs</td><td>Semaglutide accounted for 21.4% of reports, exenatide 24.2%; most men were aged 40 to 60</td><td>Very low: reports cannot give rates or establish cause</td></tr>
</tbody>
</table>
<p>Two things stand out. The studies that suggest harm are all observational and record-based, and the one with the most careful design found its signal weakened to non-significance when the authors tested for hidden bias. The studies that suggest benefit include a randomised trial, but in men with diabetes on a drug that produces modest weight loss, not in non-diabetic men on semaglutide or tirzepatide at weight-loss doses. There is no randomised trial of semaglutide or tirzepatide with erectile function as its main outcome, which is the study that would settle the question. Each row is explained in the sections below. Sources as linked in the table, ${CHECKED}.</p>`,
    },
    {
      heading: "Why would losing weight improve erections?",
      body: `<p>An erection is a vascular event controlled by nerves and hormones. Arousal triggers nerve signals; the lining of the penile arteries releases nitric oxide; the smooth muscle in the artery walls relaxes; blood fills the erectile chambers; and the expanding tissue squeezes shut the veins that would drain it. The ED pills work at one step in this chain, by blocking the enzyme (PDE5) that breaks down the chemical messenger nitric oxide produces. Every other step depends on healthy arteries, working nerves, adequate testosterone and a brain that is not in a state of alarm. The NIDDK lists conditions that damage each of those, and obesity sits upstream of several of them. Source: ${ext(S.niddkCauses, "NIDDK, ED symptoms and causes")}, ${CHECKED}.</p>
<h3>The four routes from excess weight to ED</h3>
<ul>
<li><strong>Blood vessels.</strong> Excess visceral fat drives insulin resistance, inflammation and high blood pressure, all of which impair the endothelium, the artery lining that has to release nitric oxide. Endothelial dysfunction is the earliest stage of atherosclerosis, and the penile arteries, being small, show it first. Our guide to <a href="/ed/articles/erectile-dysfunction-heart-disease-warning-sign">ED as a heart warning sign</a> explains that "artery size" mechanism in detail.</li>
<li><strong>Glucose.</strong> Obesity is the main driver of type 2 diabetes, and the NIDDK reports that more than half of men with diabetes develop ED, that they are more than three times as likely to as men without diabetes, and that it tends to start 10 to 15 years earlier. Source: ${ext(S.niddkDiabetes, "NIDDK, diabetes, sexual and bladder problems")}, ${CHECKED}.</li>
<li><strong>Testosterone.</strong> Fat tissue converts testosterone to estradiol and suppresses the brain's signal to the testicles, so men with obesity often have low or low-normal testosterone with nothing wrong with the testicles. The Endocrine Society's guideline treats obesity as a reversible cause to address before considering testosterone therapy. Source: ${ext(S.endoGuideline, "Endocrine Society guideline, 2018")}, ${CHECKED}.</li>
<li><strong>Mood, sleep and self-image.</strong> Sleep apnoea, depression, low energy and discomfort with one's own body are all common with obesity, and the NIDDK lists psychological factors among the causes of ED. These are harder to measure but no less real.</li>
</ul>
<p>Weight loss acts on all four routes at once, which is why it has some of the most consistent evidence of any non-drug intervention for ED. A GLP-1 drug produces weight loss on a scale that diet rarely matches: in STEP 1, semaglutide 2.4 mg produced a mean loss of 14.9% of body weight at 68 weeks, and in SURMOUNT-1 tirzepatide 15 mg produced 20.9% at 72 weeks, against 2% to 3% on placebo, as reported in the trial papers our weight-loss guides cite. Sources: ${ext(S.step1, "STEP 1, NEJM, 2021")}; ${ext(S.surmount1, "SURMOUNT-1, NEJM, 2022")}, ${CHECKED}. If weight loss helps erections, a drug that produces that much of it should help too, in theory. Whether it does in practice, and whether anything about the drug itself pushes the other way, is what the rest of this guide examines.</p>
<h3>What this means for you</h3>
<p>If you have obesity and ED, the weight is a probable contributor, and treating it is a legitimate part of treating the ED. That does not make an ED pill unnecessary in the meantime, and it does not guarantee that weight loss alone will restore function, especially where diabetes has already damaged nerves. It does mean the GLP-1 and the ED treatment are working toward the same goal, and they do not need to be chosen between.</p>`,
    },
    {
      heading: "What did the weight-loss trials show for erectile function?",
      body: `<p>Before GLP-1 drugs, the question "does losing weight improve erections" was tested with diet and exercise programmes and with bariatric surgery. Those studies are the best guide to what large weight loss does to erectile function, because they isolate the weight loss from any effect of a specific drug.</p>
<h3>The Esposito trial, JAMA 2004</h3>
<p>The most cited study is a randomised trial from the Second University of Naples, published in JAMA in 2004. It enrolled 110 obese men (BMI over 30) aged 35 to 55 with ED, and deliberately excluded men with diabetes, high blood pressure or high cholesterol, so that the effect of weight and activity could be seen without those conditions in the way. Half received a detailed programme of advice on reducing calorie intake and increasing physical activity; the control group received general information on healthy food choices and exercise.</p>
<p>As reported, the mean score on the International Index of Erectile Function (IIEF) rose from 13.9 to 17 in the intervention group and was essentially unchanged in the control group (13.5 to 13.6). Seventeen men in the intervention group, about a third of it, reached a score of 22 or more, which the trial treated as regained normal function, against three in the control group. In the multivariate analysis, reductions in BMI and increases in physical activity were each independently associated with the improvement. The authors concluded that lifestyle changes were associated with improvement in sexual function in about one third of obese men with ED. Source: ${ext(S.esposito, "Esposito K et al., JAMA, 2004 (PubMed)")}, ${CHECKED}.</p>
<p>The limits matter. It was a single-centre trial of men who had come to an obesity clinic seeking weight loss, which an accompanying editorial noted limits how far it generalises. It excluded the men most likely to have ED, those with diabetes and hypertension. And two thirds of the intervention group did not reach a normal score. The message is not that weight loss cures ED; it is that in a third of otherwise healthy obese men, it was enough.</p>
<h3>Bariatric surgery: the closest analogue to GLP-1 weight loss</h3>
<p>Weight-loss surgery produces losses in the same range as the newer GLP-1 drugs, which makes it the most useful comparison. Two meta-analyses have pooled the studies.</p>
<table>
<thead><tr><th>Meta-analysis</th><th>Studies and men</th><th>Finding (as reported)</th><th>Main caveat</th></tr></thead>
<tbody>
<tr><td>${ext(S.bariatric2023, "Obesity Surgery, 2023")}</td><td>14 studies, 508 men</td><td>Significant improvement in erectile function scores after surgery, with gains in desire and intercourse satisfaction</td><td>Study quality rated moderate; the authors call for larger studies to test whether surgery is an independent factor</td></tr>
<tr><td>${ext(S.bariatric2020, "BMC Urology, 2020")}</td><td>11 studies, 370 men</td><td>IIEF erectile function domain improved by a mean of 5.33 points</td><td>Mostly small before-and-after studies without a control group</td></tr>
</tbody>
</table>
<p>A five-point average rise on a domain scored out of 30 is a material change. But the studies behind these figures are mostly small and uncontrolled, men who choose surgery may differ from those who do not, and the improvement is an average that includes men who improved a great deal and men who did not improve at all. Sources: as linked in the table, ${CHECKED}.</p>
<h3>How this transfers to a GLP-1</h3>
<p>The reasonable inference is that the weight lost on a GLP-1 should, on average, push erectile function in the same direction as the weight lost on a diet or after surgery, and over a similar timescale of months rather than weeks. What the surgery and lifestyle studies cannot tell us is whether anything specific to GLP-1 drugs, such as their effects on appetite, reward, energy or blood pressure, offsets part of that benefit, particularly in the early months. That is the question the next three sections address.</p>`,
    },
    {
      heading: "What did the semaglutide TriNetX study actually find?",
      body: `<p>The study behind most "Ozempic causes ED" headlines was published online in May 2024 and in print in 2025 in the International Journal of Impotence Research, by Liao and colleagues at the University of Texas Medical Branch. It is worth understanding in detail, because it is both a genuine signal and easy to misread.</p>
<h3>What they did</h3>
<p>The researchers used TriNetX, a database of electronic health records from many US health systems. They identified men aged 18 to 50, with a BMI over 30 and no diagnosis of diabetes, who were prescribed semaglutide after June 1, 2021. They excluded men with an existing ED or testosterone problem, then matched each semaglutide user to a man with similar characteristics who had never received the drug: 3,094 men in each group. The primary outcome was a new diagnosis of ED and/or a new prescription for a PDE5 inhibitor (the class that includes sildenafil and tadalafil). The secondary outcome was a new diagnosis of testosterone deficiency. Sources: ${ext(S.liaoPubmed, "Liao et al., PubMed record")}; ${ext(S.liaoNature, "International Journal of Impotence Research")}, ${CHECKED}.</p>
<h3>What they found</h3>
<p>As reported in the published paper, men prescribed semaglutide were more likely to have a new ED diagnosis or PDE5 prescription: 1.47% against 0.32% in the matched controls, a relative risk of 4.5 (95% CI 2.3 to 9.0). New testosterone deficiency diagnoses were also more common: 1.53% against 0.80%, a relative risk of 1.9 (95% CI 1.2 to 3.1). The authors called for further research into the effect of semaglutide on the hypothalamic-pituitary-gonadal axis, the hormone loop that controls testosterone. Sources: ${ext(S.liaoPubmed, "PubMed")}; ${ext(S.urologyTimes, "Urology Times coverage")}, ${CHECKED}.</p>
<h3>The relative and absolute numbers</h3>
<p>A relative risk of 4.5 sounds alarming, and it is the number most headlines used. The absolute numbers tell a calmer story. Per 1,000 men, the figures translate to about 15 with a new ED diagnosis or prescription in the semaglutide group and about 3 in the control group, a difference of roughly 11 or 12 men per 1,000 over the study's follow-up. Put the other way, about 985 of every 1,000 young, non-diabetic men on semaglutide had no new ED record. That is not nothing, but it is a small absolute difference in a group whose baseline ED rate is low.</p>
<h3>Earlier versions reported different numbers</h3>
<p>The work was presented before publication, and earlier versions reported different figures. A 2024 conference abstract in the Journal of Sexual Medicine, from the same group, described a smaller matched sample and a much higher relative risk. Urology Times reported on a conference presentation with a relative risk for ED of 4.1. Different versions of a database analysis can give different results as inclusion criteria and follow-up windows change. The peer-reviewed paper is the version to cite, and its figures are the ones above. Sources: ${ext(S.liaoAbstract, "Journal of Sexual Medicine abstract, 2024")}; ${ext(S.urologyTimes, "Urology Times")}, ${CHECKED}.</p>
<h3>Why it does not show that semaglutide causes ED</h3>
<p>The authors themselves describe an association. Several features of the design mean the association could have explanations other than a drug effect, and we set them out here as possibilities, not as established flaws:</p>
<ul>
<li><strong>The outcome counts prescriptions, not just diagnoses.</strong> A man on semaglutide is, by definition, in contact with a prescriber, often a telehealth service that also sells ED medication. A man who is seen more often, by clinicians who ask about sexual health, is more likely to have ED recorded or treated, whether or not his erections have changed. This is known as detection or surveillance bias, and a composite outcome that includes a prescription is especially exposed to it.</li>
<li><strong>Men who seek weight-loss drugs may differ from men who do not.</strong> Matching on recorded characteristics cannot capture everything. A man motivated to start a weight-loss drug may also be more engaged with his health in general, more likely to raise a sexual problem, or more distressed about his body.</li>
<li><strong>Records miss things.</strong> TriNetX holds diagnoses and prescriptions entered in health records, not symptom questionnaires. ED that is self-treated, treated through a separate online service, or never raised is invisible to it, in both groups.</li>
<li><strong>The follow-up was short</strong> relative to the timescale over which weight loss would be expected to improve vascular health and testosterone. A study that captures the early months of treatment and stops may catch any short-term effect and miss a long-term one.</li>
</ul>
<p>None of this means the signal is wrong. It means the study cannot tell a real drug effect from these alternatives, which is why it is a reason for a trial, not a reason to stop a drug.</p>`,
    },
    {
      heading: "Does the 2026 study in men with diabetes confirm a risk?",
      body: `<p>The most methodologically careful study to date was published in 2026 in eClinicalMedicine, a Lancet journal, by Tang and colleagues. It is the one most often cited as confirming the semaglutide signal, and it partly does and partly does not.</p>
<h3>What they did</h3>
<p>The researchers used a design called target trial emulation: they specified the randomised trial they would ideally run, then used electronic health records to imitate it as closely as possible. The population was men with type 2 diabetes starting either a GLP-1 receptor agonist or a DPP-4 inhibitor (such as sitagliptin), another class of diabetes tablet that does not produce meaningful weight loss. Comparing two groups of men who were all starting a new diabetes drug, rather than comparing drug users with non-users, reduces some of the bias that affects simpler designs. Around 4,900 men started a GLP-1 drug and around 5,500 a DPP-4 inhibitor. Sources: ${ext(S.tangPubmed, "Tang et al., PubMed record")}; ${ext(S.tangLancet, "eClinicalMedicine full text")}, ${CHECKED}.</p>
<h3>What they found</h3>
<p>As reported, ED was diagnosed at 35.2 cases per 1,000 person-years in the GLP-1 group and 28.0 in the DPP-4 group, a hazard ratio of 1.26 (95% CI 1.08 to 1.46). The association held across subgroup and sensitivity analyses. In absolute terms, that is about 7 extra recorded cases per 1,000 men per year.</p>
<p>The authors then applied a further test. They selected 38 "negative control outcomes", conditions with no plausible causal link to either drug, and checked whether the GLP-1 group also had more of those. If a group shows an excess of unrelated conditions too, the excess is likely to reflect how that group is recorded or who it contains, not what the drug does. After calibrating the ED result against those negative controls, the association was attenuated and was no longer statistically significant. The authors concluded that observational findings may reflect residual or selection bias, do not establish causation, and that randomised trials with standardised assessment of erectile function are needed. Coverage also noted that the GLP-1 users were generally younger and more likely to have obesity than the DPP-4 users. Sources: ${ext(S.tangLancet, "eClinicalMedicine")}; ${ext(S.tangEmj, "EMJ report, 2026")}, ${CHECKED}.</p>
<h3>What this means for you</h3>
<p>This study is the strongest argument that there may be a small signal worth watching in men with diabetes, and also the strongest argument that the signal may not be real. A careful reader takes both halves. If GLP-1 drugs raise ED risk in men with diabetes, the effect on these numbers is modest, roughly a quarter more recorded cases, and it sits against a background in which diabetes itself more than triples ED risk. If the effect is an artefact, the study has shown how easily one can arise. Either way, it is not a reason for a man with diabetes to give up a drug that, in the case of semaglutide, has shown cardiovascular benefits, and it is a reason to have erections asked about at diabetes reviews.</p>`,
    },
    {
      heading: "What do the studies pointing toward benefit show?",
      body: `<p>The other side of the ledger has a randomised trial analysis, two observational comparisons and a genetic study. None is decisive either, but together they make it hard to argue that GLP-1 drugs are bad for erections as a class.</p>
<h3>REWIND: the only randomised evidence</h3>
<p>REWIND was a large cardiovascular-outcomes trial of dulaglutide (Trulicity), a weekly GLP-1 drug for type 2 diabetes, against placebo. Men in the trial were asked to complete the IIEF questionnaire at baseline and during follow-up, and a 2021 exploratory analysis in The Lancet Diabetes &amp; Endocrinology examined the 3,725 men, of 5,312 in the trial, who completed it at least twice. ED was already common: 56.5% had moderate or severe ED at baseline. Sources: ${ext(S.rewind, "Bajaj et al., Lancet Diabetes &amp; Endocrinology, 2021 (PubMed)")}, ${CHECKED}.</p>
<p>As reported, first occurrence of moderate or severe ED after randomisation was 21.3 per 100 person-years on dulaglutide against 22.0 on placebo, a hazard ratio of 0.92 (95% CI 0.85 to 0.99), and the erectile function score fell less over time on dulaglutide (least-squares mean difference 0.61 points). The authors concluded that long-term dulaglutide use might reduce the incidence of moderate or severe ED in men with type 2 diabetes. The trial was funded by Eli Lilly, which makes dulaglutide.</p>
<p>The caveats are specific. The analysis was exploratory, not a pre-specified primary outcome, and it included only men who chose to complete the questionnaire. The effect was small, an 8% relative reduction. And dulaglutide at diabetes doses produces far less weight loss than semaglutide or tirzepatide at weight-loss doses, so REWIND tells us more about the drug class than about the weight-loss products. Still, it is the only placebo-controlled evidence, and it points away from harm.</p>
<h3>Tirzepatide in men with diabetes, 2025</h3>
<p>A 2025 study in the Journal of Diabetes and its Complications, by Cowart and colleagues, used the same TriNetX database as the Liao study and the same composite outcome, an ED diagnosis or a new PDE5 inhibitor prescription. It examined men aged 18 to 70 with type 2 diabetes and no prior ED between May 2022 and May 2025, and compared tirzepatide with sitagliptin, injectable semaglutide and dulaglutide in three matched comparisons. As reported, tirzepatide was associated with a lower risk in all three: relative risk 0.70 against sitagliptin, 0.67 against injectable semaglutide (95% CI 0.62 to 0.72) and 0.55 against dulaglutide. The authors called for randomised trials to confirm the findings. Sources: ${ext(S.cowart, "Cowart et al., PubMed record")}; ${ext(S.cowartReport, "Medical Dialogues report")}, ${CHECKED}.</p>
<p>This study has the same observational limits as Liao, and one of its comparisons, against dulaglutide, shows a much larger difference than REWIND's randomised data would suggest. Its value is as a counterweight: the same database and the same outcome definition that produced a semaglutide signal in non-diabetic men produced a favourable result for tirzepatide in diabetic men. That is consistent with the view that these database results are sensitive to who is being compared with whom.</p>
<h3>The tirzepatide pilot study, 2025</h3>
<p>A small controlled pilot published in Reproductive Biology and Endocrinology in 2025, and presented at ENDO 2025, compared three groups of men with obesity and what the authors called metabolic hypogonadism over two months: tirzepatide plus lifestyle change (28 men), transdermal testosterone plus lifestyle change (30) and lifestyle change alone (25). As reported, the tirzepatide group had larger reductions in weight, waist circumference and fat mass, a larger rise in total, free and bioavailable testosterone, and a notable increase in the IIEF-5 erectile function score. Groups were assigned by patient preference, not randomly, and two months is short. Sources: ${ext(S.tirzPilot, "PubMed record")}; ${ext(S.tirzPilotFull, "full paper")}; ${ext(S.endoTirz, "Healio, July 24, 2025")}, ${CHECKED}.</p>
<h3>Mendelian randomisation, 2024</h3>
<p>Mendelian randomisation uses genetic variants as natural experiments. People who inherit variants that mimic a drug's effect, here, variants in the GLP-1 receptor gene, are compared with people who do not, which avoids many of the lifestyle confounders that affect record studies. A 2024 analysis in Frontiers in Endocrinology reported that genetically proxied GLP-1 receptor activity was associated with a lower risk of ED (odds ratio 0.493, 95% CI 0.430 to 0.565), with small portions of the effect running through lower rates of type 2 diabetes (2.89%), obesity (6.83%), hypertension (3.22%) and cardiovascular disease (3.06%). The authors said the findings need confirming in randomised trials. Source: ${ext(S.mr, "An, Xie and Gan, Frontiers in Endocrinology, November 2024")}, ${CHECKED}.</p>
<p>A genetic variant acts from birth, at low intensity, for a lifetime; a weekly injection acts for months or years at a pharmacological dose. The study supports the biological plausibility of benefit. It does not tell us what happens in the first six months of a weight-loss prescription.</p>
<h3>What the reviews conclude</h3>
<p>A 2025 narrative review in Biomolecules, titled "The Impact of Glucagon-like Peptide-1 Receptor Agonists on Erectile Function: Friend or Foe?", set out the case on both sides: GLP-1 drugs improve weight, glucose and cardiovascular risk, all of which should help erections, while preliminary reports have linked them to ED. Its framing reflects where the field is: the question is open, and the mechanisms that would favour benefit are better understood than those that would cause harm. Source: ${ext(S.friendFoe, "Biomolecules, 2025 (PMC)")}, ${CHECKED}.</p>`,
    },
    {
      heading: "What can adverse-event reports tell you?",
      body: `<p>The FDA Adverse Event Reporting System (FAERS) collects reports of suspected side effects from clinicians, patients and manufacturers. It is useful for spotting rare problems that trials miss, and it is easily misread, because it counts reports, not people, and has no denominator.</p>
<h3>The 2025 FAERS analysis</h3>
<p>A cross-sectional analysis published in the International Journal of Impotence Research in 2025 searched FAERS reports from late 2003 to early 2024 for male orgasmic dysfunction, ED and decreased libido associated with GLP-1 drugs. As reported, it found 182 cases. Most men were aged 40 to 60. Exenatide, the oldest drug in the class, accounted for 24.2% of reports and semaglutide for 21.4%. Source: ${ext(S.faers, "UroToday abstract summary")}, ${CHECKED}.</p>
<p>A separate 2026 FAERS analysis looking at sexual side effects across several diabetes drug classes reported a signal for ED with semaglutide, and also with sitagliptin and dapagliflozin, drugs from two different classes with different mechanisms. Source: ${ext(S.faersAntidiabetic, "FAERS disproportionality analysis, PubMed")}, ${CHECKED}.</p>
<h3>How to read these numbers</h3>
<ul>
<li><strong>182 reports over two decades,</strong> across drugs prescribed to many millions of people, is a small number. It cannot be turned into a rate, because nobody knows how many men took the drugs or how many cases went unreported.</li>
<li><strong>Reports follow attention.</strong> After headlines about semaglutide and ED, more men and clinicians will think to report it. Exenatide and semaglutide leading the table may reflect how long each has been on the market and how much publicity each has had.</li>
<li><strong>A signal across unrelated diabetes drugs</strong> points toward the underlying disease, not a drug class. Men taking any diabetes medicine are men with diabetes, and diabetes causes ED.</li>
</ul>
<p>Adverse-event reports are where pharmacovigilance starts, not where it ends. They justify the database studies and, eventually, the trials. On their own, they tell a man on a GLP-1 very little about his own risk.</p>`,
    },
    {
      heading: "Do GLP-1 drugs lower testosterone or raise it?",
      body: `<p>Testosterone is the second half of the ED question, because low testosterone reduces desire and contributes to erectile difficulty, and because the Liao study reported more testosterone-deficiency diagnoses in men on semaglutide. The weight of the evidence runs the other way.</p>
<h3>The ENDO 2025 reports</h3>
<p>Two studies presented at the Endocrine Society's ENDO 2025 meeting addressed it directly, and our TRT guide covers them in detail. The first was a retrospective review of 110 men with obesity or type 2 diabetes treated with semaglutide, tirzepatide or dulaglutide, none on testosterone or other hormone therapy. Over about 18 months they lost about 10% of body weight, and the proportion with normal total and free testosterone rose from 53% to 77%, as reported. The authors attributed the rise to the weight loss rather than a direct hormonal effect of the drugs. The second was the tirzepatide pilot described above, in which tirzepatide plus lifestyle change raised testosterone more at two months than testosterone gel plus lifestyle change, and improved erectile function. Both are conference presentations, one is retrospective, both are small. Sources: ${ext(S.endoHealio, "Healio, July 15, 2025")}; ${ext(S.endoTirz, "Healio, July 24, 2025")}; ${ext(S.medx, "Medical Xpress, July 2025")}, ${CHECKED}.</p>
<h3>Squaring it with the Liao finding</h3>
<p>Liao's secondary finding, 1.53% against 0.80% new testosterone-deficiency diagnoses, is a record of diagnoses, not a measurement of testosterone before and after. Men on a weight-loss drug who report fatigue or low libido are more likely to have testosterone tested, and a man who is tested is more likely to be diagnosed than a man who is not. The two findings can coexist: a small number of men on semaglutide may have low testosterone found, while the average man's testosterone rises as he loses weight. What the evidence does not support is the idea that GLP-1 drugs suppress testosterone as a class.</p>
<h3>A short-term caveat</h3>
<p>A man eating very little in the first weeks of treatment is in a state of energy deficit, and severe energy deficit can suppress the hormonal axis in its own right. That is a physiological reason, not a measured GLP-1 effect, why a man might feel low libido early on and better later, and why the test that matters is a morning testosterone once eating has settled, not one taken during the hardest weeks of a dose escalation. The Endocrine Society's guideline already requires two morning measurements, when well, before diagnosing low testosterone. Source: ${ext(S.endoGuideline, "Endocrine Society guideline")}, ${CHECKED}.</p>
<h3>What this means for you</h3>
<p>If you are on a GLP-1 and have low desire or ED, a testosterone test is reasonable, done properly: two early-morning samples on different days, with LH and FSH. If it is low and your weight is falling, the likeliest course is that it rises with the weight, and the guideline position is to address the reversible cause before starting testosterone. Our guide to <a href="/trt/articles/weight-loss-testosterone-glp1-vs-trt">weight loss versus TRT</a> sets out how a clinician tells the difference, and <a href="/ed/articles/can-low-testosterone-cause-ed">can low testosterone cause ED</a> covers the link on the erectile side.</p>`,
    },
    {
      heading: "How could a GLP-1 make erections worse, and how could it make them better?",
      body: `<p>No study has identified a mechanism by which GLP-1 drugs damage erectile function. What follows is a list of plausible routes, drawn from what the drugs are known to do and from the physiology of erections, set against the routes by which they would be expected to help. The worsening routes are hypotheses; the improving routes rest on the weight-loss and cardiovascular evidence. We label each one by how well supported it is.</p>
<table>
<thead><tr><th>Route</th><th>How it could worsen erections</th><th>How it could improve erections</th><th>Timescale</th><th>Evidence</th></tr></thead>
<tbody>
<tr><td>Energy and food intake</td><td>Very low intake in early weeks can cause fatigue, low energy and, in severe deficit, lower sex hormones</td><td>Settles as doses stabilise and eating normalises</td><td>Weeks, mainly during dose escalation</td><td>Physiological reasoning; not measured in GLP-1 men</td></tr>
<tr><td>Gastrointestinal side effects</td><td>Nausea, vomiting, diarrhoea and bloating make sex unappealing on bad days</td><td>Usually fade over time at a stable dose</td><td>Days to weeks after each dose step</td><td>Side effects are on the labels; the link to sex is common sense</td></tr>
<tr><td>Fluid and blood pressure</td><td>Dehydration from GI losses, plus lower blood pressure, could reduce penile blood flow or cause light-headedness</td><td>Lower blood pressure in men with hypertension reduces long-term artery damage</td><td>Short-term risk on bad days; long-term benefit</td><td>BP fall shown in trials; erectile effect of dehydration not studied</td></tr>
<tr><td>Absorption of ED pills</td><td>Slower stomach emptying could delay or flatten the peak of a swallowed ED pill</td><td>Effect is largest early and fades, per Lilly</td><td>Early weeks and after dose increases</td><td>Label language; no study with ED pills specifically</td></tr>
<tr><td>Appetite signalling in the brain</td><td>GLP-1 drugs reduce appetite partly through the brain; whether that dampens sexual interest is an open question</td><td>Better body image and energy may raise confidence and desire</td><td>Variable</td><td>Hypothesis only; not studied for sexual desire</td></tr>
<tr><td>Rapid body change</td><td>Rapid weight loss can bring tiredness and loss of muscle; changing body image can be unsettling</td><td>Many men feel more confident as weight falls</td><td>Months</td><td>Muscle loss documented in trials; sexual effect not measured</td></tr>
<tr><td>Testosterone</td><td>Possible early dip during severe energy deficit</td><td>Rises with weight loss; 53% to 77% normal in the ENDO 2025 cohort (reported)</td><td>Months</td><td>Conference reports and long-standing weight-loss evidence</td></tr>
<tr><td>Blood glucose</td><td>Low blood sugar in men also on insulin or sulfonylureas can cause weakness and anxiety</td><td>Better glucose control slows nerve and vessel damage</td><td>Long-term benefit</td><td>NIDDK guidance on diabetes and ED; label warning on hypoglycaemia with insulin</td></tr>
<tr><td>Arteries and endothelium</td><td>None identified</td><td>Less inflammation, lower blood pressure, better lipids; semaglutide reduced heart attacks, strokes and cardiovascular death in SELECT</td><td>Months to years</td><td>Strong for cardiovascular outcomes; indirect for erections</td></tr>
<tr><td>Detection</td><td>More contact with prescribers means more ED recorded and treated</td><td>Same contact means more ED treated</td><td>Immediate</td><td>A likely contributor to database signals</td></tr>
</tbody>
</table>
<h3>The pattern this suggests</h3>
<p>If the worsening routes are real, they are mostly short-term and tied to the early months of treatment and to dose increases: low intake, GI side effects, fluid losses and slower absorption of a swallowed pill. The improving routes are mostly long-term and tied to the weight actually lost: arteries, testosterone, glucose and blood pressure. That pattern, if it holds, would explain why studies with short follow-up in early users could catch a small excess of ED records while genetic, long-term and randomised evidence leans toward benefit. It is a hypothesis, but it is a testable one, and it matches what the studies we have would predict.</p>
<h3>What this means for you</h3>
<p>A man who notices ED in the first weeks after starting a GLP-1 or after a dose increase is most likely experiencing one of the short-term routes: eating little, feeling flat, slightly dehydrated, or finding his usual ED pill less reliable. These are manageable without stopping the drug. A man whose ED worsens steadily over many months, after the dose is stable, should be assessed in the usual way, because it may have nothing to do with the GLP-1 at all.</p>`,
    },
    {
      heading: "Can you take Viagra or Cialis with Ozempic, Wegovy or Zepbound?",
      body: `<p>Usually, yes, with attention to timing, hydration and blood pressure. There is no listed interaction between GLP-1 drugs and PDE5 inhibitors, and the reasons for care are indirect.</p>
<h3>What the GLP-1 labels say</h3>
<p>Neither the Wegovy nor the Zepbound prescribing information names sildenafil, tadalafil or any PDE5 inhibitor in its drug-interactions section. The interactions those labels list concern insulin and insulin secretagogues (the risk of low blood sugar) and oral medications in general. A commonly used interaction checker likewise reports no interactions found between Ozempic and sildenafil, while noting that this does not mean none exist. Sources: ${ext(S.wegovyLabel, "Wegovy prescribing information, FDA")}; ${ext(S.zepboundLabel, "Zepbound prescribing information, FDA, 2026")}; ${ext(S.drugsCom, "Drugs.com interaction checker")}, ${CHECKED}.</p>
<p>The oral-medication language is the relevant part. The Wegovy label states: "WEGOVY causes a delay of gastric emptying and thereby has the potential to impact the absorption of concomitantly administered oral medications." It adds that in clinical pharmacology trials with semaglutide 1 mg once weekly, semaglutide did not affect the absorption of orally administered medications. The Zepbound label carries the same caution about delayed gastric emptying and oral drug absorption, and asks that patients on oral medications that depend on threshold concentrations for efficacy, or that have a narrow therapeutic index such as warfarin, be monitored. Sources: ${ext(S.wegovyLabelCurrent, "Wegovy label section 7.2, as reproduced")}; ${ext(S.zepboundLabel, "Zepbound label section 7.2")}, ${CHECKED}.</p>
<h3>Why that matters for an ED pill</h3>
<p>An on-demand ED pill is close to a textbook example of a drug that depends on reaching a threshold concentration in time: it needs to peak during the window when you want an erection. Neither label tested ED pills, and no published study has measured sildenafil or tadalafil absorption in men on semaglutide or tirzepatide. What the labels establish is the mechanism; what we can infer, and it is an inference, is that a swallowed ED pill could take longer to work, or reach a lower peak, in a man whose stomach is emptying slowly.</p>
<p>The ED drug labels give a sense of the possible size of that effect, because they describe what happens when a meal slows absorption. For sildenafil, the label reports that peak blood levels are reached 30 to 120 minutes after a dose taken fasting (median 60 minutes), and that a high-fat meal delays the peak by a mean of 60 minutes and reduces the peak concentration by a mean of 29%. For tadalafil, the label states that the rate and extent of absorption are not influenced by food, with peak levels reached between 30 minutes and 6 hours (median 2 hours). Sources: ${ext(S.viagraFdaArchive, "Viagra prescribing information, FDA archive")}; ${ext(S.viagraLabel, "current Viagra label, Pfizer")}; ${ext(S.cialisFdaArchive, "Cialis prescribing information, FDA archive")}, ${CHECKED}.</p>
<p>Slower stomach emptying is not the same as a fatty meal, and these figures cannot be transferred directly. They do suggest the shape of the problem: sildenafil, which is sensitive to what is in the stomach, is more likely to be affected than tadalafil, which is not food-sensitive and has a long window. They also suggest the effect is a delay and a softening, not a failure.</p>
<h3>When the effect is largest</h3>
<p>Lilly's medical information service, answering a question about oral contraceptives on Zepbound, states that the delay in gastric emptying is largest after the first dose and diminishes over time. That is why the Zepbound label asks women on oral contraceptives to switch to a non-oral method, or add a barrier method, for four weeks after starting and for four weeks after each dose increase. ED pills are not contraceptives and the label rule does not apply to them, but the timing is informative: if a GLP-1 affects a swallowed ED pill, the first month and the weeks after each dose step are when it is most likely to. Sources: ${ext(S.lillyContraception, "Lilly Medical, Zepbound and oral contraceptives")}; ${ext(S.zepboundLabel, "Zepbound label")}, ${CHECKED}.</p>
<h3>The rules that do not change</h3>
<ul>
<li><strong>Nitrates and riociguat are contraindicated</strong> with every PDE5 inhibitor, GLP-1 or not. That includes nitroglycerin in every form, isosorbide, and recreational "poppers". Men with heart disease, who are common among GLP-1 users, are the ones most likely to have a nitrate prescription. Source: ${ext(S.viagraLabel, "Viagra label, contraindications")}, ${CHECKED}.</li>
<li><strong>If chest pain needs emergency treatment,</strong> a nitrate should not be given within 24 hours of sildenafil or 48 hours of tadalafil, as our blood-pressure guide sets out from the monographs. Tell emergency staff when you last took an ED pill. Sources: ${ext(S.sildenafilMp, "MedlinePlus, sildenafil")}; ${ext(S.tadalafilMp, "MedlinePlus, tadalafil")}, ${CHECKED}.</li>
<li><strong>Do not combine two PDE5 inhibitors</strong> on your own, for example taking extra sildenafil because the first pill seemed slow. Waiting longer is the answer, not doubling up. Doses are the prescriber's decision.</li>
<li><strong>An erection lasting more than four hours, or a sudden loss of vision or hearing,</strong> means stop and seek emergency care, as the labels say.</li>
</ul>
<p>For the full blood-pressure rules, including alpha-blockers, see <a href="/ed/articles/ed-pills-and-blood-pressure-medication">ED pills and blood pressure medication</a>. For the practical differences between the two main pills, see <a href="/ed/articles/sildenafil-vs-cialis">sildenafil vs Cialis</a>.</p>`,
    },
    {
      heading: "Blood pressure, dizziness and dehydration: the combined picture",
      body: `<p>Blood pressure is where a GLP-1 and an ED pill most plausibly add up, and where most of the practical care lies.</p>
<h3>What each drug does to blood pressure</h3>
<p>GLP-1 drugs lower blood pressure, mostly through weight loss. In STEP 1, systolic blood pressure fell by about 6 mmHg on semaglutide against about 1 mmHg on placebo over 68 weeks, from a baseline of about 126 to 127 mmHg, as summarised from the trial paper. In men with high blood pressure, that is a benefit, and part of why these drugs reduce cardiovascular risk. Sources: ${ext(S.step1, "STEP 1, NEJM, 2021")}; ${ext(S.step1Summary, "trial summary")}, ${CHECKED}.</p>
<p>PDE5 inhibitors also lower blood pressure, because they relax blood-vessel walls throughout the body, not only in the penis. The Viagra label reports that single 100 mg doses in healthy volunteers lowered supine blood pressure by a mean maximum of 8.4/5.5 mmHg, and that combining sildenafil with most blood-pressure medicines produces only a small additional drop. Source: ${ext(S.viagraLabel, "Viagra prescribing information")}, ${CHECKED}.</p>
<h3>Where it can tip over</h3>
<p>For most men, a GLP-1-related fall in blood pressure plus a PDE5-related dip is well tolerated, and is no different from the combinations of ED pills with blood-pressure tablets that clinicians manage every day. Three situations make light-headedness more likely:</p>
<ul>
<li><strong>Blood-pressure medicines that no longer fit the new weight.</strong> A man who started a GLP-1 on two or three antihypertensives may find, months later, that his pressure is lower than it needs to be. Adding an ED pill to an over-treated pressure is the commonest route to dizziness on standing. The fix is for the prescriber to review the blood-pressure regimen, not for the man to stop either drug himself.</li>
<li><strong>Dehydration.</strong> Vomiting, diarrhoea or simply drinking less because appetite and thirst are both down can reduce circulating fluid. Both the Wegovy and Zepbound labels carry a warning about acute kidney injury in patients who become dehydrated through gastrointestinal side effects. A dehydrated man is also more likely to feel faint after an ED pill and, for that matter, to find his erection less firm, since the erection is itself a matter of filling with blood. Sources: ${ext(S.wegovyLabel, "Wegovy label")}; ${ext(S.zepboundLabel, "Zepbound label")}, ${CHECKED}.</li>
<li><strong>Alcohol.</strong> The tadalafil label warns that substantial alcohol with tadalafil can cause dizziness and a drop in standing blood pressure, and alcohol also dehydrates. Many men on GLP-1 drugs find they drink less, which helps. Source: ${ext(S.tadalafilMp, "MedlinePlus, tadalafil")}, ${CHECKED}.</li>
</ul>
<h3>Practical steps</h3>
<ol>
<li>Drink enough fluid every day, and more on days of nausea, vomiting or diarrhoea.</li>
<li>On a day when you cannot keep fluids down, skip sex and the ED pill and call the GLP-1 prescriber, because the labels treat dehydration on these drugs as a kidney risk.</li>
<li>If you feel light-headed when standing, sit or lie down, and report it. Ask whether your blood-pressure medicines still match your weight.</li>
<li>If you check your blood pressure at home, bring the readings to your next appointment.</li>
</ol>`,
    },
    {
      heading: "Why diabetes and heart risk change the calculation",
      body: `<p>Many men on a GLP-1 have type 2 diabetes, high blood pressure, heart disease or several of these. Each is a cause of ED in its own right, and each changes how the GLP-1 question should be weighed.</p>
<h3>Diabetes</h3>
<p>The NIDDK figures bear repeating: more than half of men with diabetes develop ED, they are more than three times as likely to as men without diabetes, and it tends to start 10 to 15 years earlier. NIDDK guidance is that keeping glucose in range may help prevent and treat ED caused by nerve and circulation damage. For a man with diabetes, the background ED rate is high and climbing with time; a drug that improves glucose control and weight is acting on the main driver. That background is why a 26% relative difference in ED records, as in the Tang study, is hard to separate from the disease itself. Source: ${ext(S.niddkDiabetes, "NIDDK, diabetes, sexual and bladder problems")}, ${CHECKED}. Our guide to <a href="/ed/articles/ed-and-diabetes">ED and diabetes</a> covers treatment in detail.</p>
<h3>The heart</h3>
<p>ED is an early sign of vascular disease. Pooled prospective studies find roughly a 45% to 50% higher risk of cardiovascular disease and coronary heart disease in men with ED, independent of the usual risk factors, and the ED typically appears two to five years before the heart's own symptoms; the Princeton IV consensus recommends that sexual function be asked about in every man's cardiovascular evaluation. Sources: ${ext(S.umbrella, "umbrella review, BJU International, 2021")}; ${ext(S.princeton, "Princeton IV consensus, 2024")}, ${CHECKED}. Our guide to <a href="/ed/articles/erectile-dysfunction-heart-disease-warning-sign">ED as a heart warning sign</a> sets out the tests to ask for.</p>
<p>Semaglutide has the strongest cardiovascular evidence of any weight-loss drug. The SELECT trial randomised 17,604 adults with overweight or obesity and established cardiovascular disease, but without diabetes, to semaglutide 2.4 mg or placebo for a mean of about 40 months, and semaglutide reduced the composite of cardiovascular death, heart attack and stroke by 20% (hazard ratio 0.80), as reported in the trial paper our weight-loss guides cite. Source: ${ext(S.select, "SELECT, NEJM, 2023")}, ${CHECKED}.</p>
<h3>What this means for you</h3>
<p>For a man with diabetes or heart disease, the question "does semaglutide cause ED" is the wrong frame. His ED is probably a product of his vascular and metabolic disease, the GLP-1 is treating that disease, and stopping it for the sake of erections would trade a possible small short-term effect for the loss of a measured reduction in heart attacks and strokes. The better question is how to treat the ED alongside the GLP-1, which the next sections answer. If new ED has appeared without a recent cardiovascular check, it is the trigger for one, whatever drug he is on.</p>`,
    },
    {
      heading: "When should you call a doctor about ED on a GLP-1?",
      body: `<p>Most erectile changes on a GLP-1 are a matter for the next routine appointment. A few symptoms are not. The table sorts what to watch for by timing and urgency. It is general information, not a triage tool, and where it says emergency, it means it.</p>
<table>
<thead><tr><th>What you notice</th><th>Typical timing</th><th>Likely explanations to consider</th><th>What to do</th></tr></thead>
<tbody>
<tr><td>Chest pain, pressure or breathlessness during or after sex</td><td>Any time</td><td>Cardiac symptom until proven otherwise</td><td><strong>Emergency.</strong> Call 911. Tell staff when you last took an ED pill, because nitrates must be withheld (24 hours after sildenafil, 48 after tadalafil)</td></tr>
<tr><td>Erection lasting more than four hours</td><td>After an ED pill or injection</td><td>Priapism</td><td><strong>Emergency.</strong> Go to an emergency department; it can cause permanent damage</td></tr>
<tr><td>Sudden loss of vision in one or both eyes, or sudden hearing loss</td><td>Hours after an ED pill</td><td>Rare serious side effect listed on PDE5 labels</td><td><strong>Stop the ED pill and seek urgent care</strong></td></tr>
<tr><td>Severe, persistent abdominal pain, with or without vomiting</td><td>Any time on a GLP-1</td><td>Pancreatitis or gallbladder disease, both on the GLP-1 labels</td><td><strong>Urgent care the same day.</strong> Tell the GLP-1 prescriber</td></tr>
<tr><td>Cannot keep fluids down; very little urine; dizziness</td><td>Usually early weeks or after a dose step</td><td>Dehydration, which the labels link to kidney injury</td><td><strong>Call the GLP-1 prescriber the same day.</strong> Skip the ED pill until rehydrated</td></tr>
<tr><td>Light-headedness on standing, especially after an ED pill</td><td>Months into treatment as weight falls</td><td>Blood pressure lower than needed; dehydration; alcohol</td><td>Sit down; report it within days; ask for a blood-pressure medicine review</td></tr>
<tr><td>Shakiness, sweating, confusion (if on insulin or a sulfonylurea)</td><td>Any time</td><td>Low blood sugar</td><td>Treat as hypoglycaemia; tell the diabetes prescriber</td></tr>
<tr><td>Weaker erections or an ED pill that seems slower</td><td>First four weeks, or the weeks after a dose increase</td><td>Low intake, GI side effects, slower absorption of a swallowed pill</td><td>Raise at the next check-in. Do not double the ED pill. Ask about tadalafil or a non-swallowed format</td></tr>
<tr><td>Low desire and fatigue that persist after eating settles</td><td>Two to three months or more</td><td>Low testosterone, low mood, poor sleep, under-eating</td><td>Book an appointment; ask for two morning testosterone tests and a mood check</td></tr>
<tr><td>Gradual loss of firmness and morning erections over months</td><td>Any time, unrelated to dose steps</td><td>Vascular ED, diabetes progression, medication effect</td><td>Book a check-up: blood pressure, lipids, HbA1c; ask whether a heart risk assessment is due</td></tr>
<tr><td>Low mood, loss of interest in things generally, or thoughts of self-harm</td><td>Any time</td><td>Depression, which also causes ED</td><td>Talk to a clinician promptly; for thoughts of self-harm call or text 988</td></tr>
<tr><td>Erections improving as weight falls</td><td>Months</td><td>Expected direction for many men</td><td>Tell the ED prescriber; a lower dose or less frequent use may be enough, and that is their decision</td></tr>
</tbody>
</table>
<p>The emergency rows come from the PDE5 labels and the GLP-1 labels; the rest reflect the mechanisms and evidence earlier in this guide. Sources: ${ext(S.viagraLabel, "Viagra label")}; ${ext(S.sildenafilMp, "MedlinePlus, sildenafil")}; ${ext(S.tadalafilMp, "MedlinePlus, tadalafil")}; ${ext(S.wegovyLabel, "Wegovy label")}; ${ext(S.zepboundLabel, "Zepbound label")}, ${CHECKED}.</p>
<h3>The one thing not to do</h3>
<p>Do not stop, skip or reduce a GLP-1 dose on your own because of ED. Stopping these drugs is usually followed by weight regain, as the STEP 1 extension showed for semaglutide (${ext(S.step1Ext, "Wilding et al., Diabetes, Obesity and Metabolism, 2022")}), which takes away the long-term benefit for erections along with everything else, and missing several doses may mean restarting at a lower dose and going through the side-effect weeks again. If the ED is distressing enough that you are considering it, that is the conversation to have with the prescriber, who can weigh a slower dose escalation, a pause at the current dose or other options. Our <a href="/weight-loss/articles/semaglutide-side-effects-guide">semaglutide side effects guide</a> covers the GI side effects that drive most early problems.</p>`,
    },
    {
      heading: "Which ED treatments fit best alongside a GLP-1?",
      body: `<p>Every standard ED treatment can be used by a man on a GLP-1, with the usual screening. Some fit more easily than others, mainly because of the stomach-emptying question and the timing of on-demand pills. The table combines the AUA guideline's list of treatments, the drug labels and the verified product facts from our provider reviews. Prices are those already published on our review pages, with their conditions; they change often, and the <a href="/ed/ed-cost-index">ED cost index</a> keeps the dated figures.</p>
<table>
<thead><tr><th>Treatment</th><th>How it is taken</th><th>How it fits someone on a GLP-1</th><th>Points to raise with the prescriber</th><th>Where it is offered (from our reviews)</th></tr></thead>
<tbody>
<tr><td>Sildenafil (Viagra, generic)</td><td>Swallowed tablet, about an hour before sex</td><td>Works for most men, but the label shows it is sensitive to stomach contents; slower emptying could delay or soften it, mostly in early weeks</td><td>Ask about timing relative to meals, given the label's food data; allow extra time early in GLP-1 treatment</td><td>Hims, DudeMeds, Peter MD and others; DudeMeds advertises tablets from around $1.63 each (confirm on its site)</td></tr>
<tr><td>Tadalafil on demand (Cialis, generic)</td><td>Swallowed tablet; long window of effect</td><td>Label says food does not affect absorption; long window makes small delays less noticeable</td><td>Back and muscle aches are its typical side effects; alcohol caution</td><td>Hims, DudeMeds, Peter MD and others</td></tr>
<tr><td>Daily tadalafil</td><td>Low-dose tablet every day, as labelled</td><td>Builds a steady level, so the timing of any one dose matters less; a reasonable option to discuss if on-demand pills feel unpredictable</td><td>Daily cost and daily exposure; suits men who have sex often</td><td>See our <a href="/ed/articles/daily-vs-as-needed-tadalafil">daily vs as-needed tadalafil</a> guide</td></tr>
<tr><td>Vardenafil nasal spray (SHED's Roxus)</td><td>Intranasal spray</td><td>Absorbed through the nose, so it does not depend on stomach emptying; no study in GLP-1 users</td><td>Speed figures are the brand's claims; same nitrate rules as all PDE5 drugs</td><td>SHED: listed around $199/month for 14 doses, roughly $99.50/month on a two-month plan, as published by SHED and subject to change</td></tr>
<tr><td>Compounded sublingual blends (Quad by MEDVi; BraveRX)</td><td>Dissolved under the tongue or in the mouth</td><td>Partly absorbed through the mouth lining rather than only after swallowing, which in principle relies less on the stomach; untested in GLP-1 users</td><td>Compounded drugs are not FDA-approved; two PDE5 inhibitors plus apomorphine (and L-citrulline in Quad) means more to screen for</td><td>Quad: $114/month at our last check, marked down from $179; BraveRX: plans from around $28 per week. Confirm on each site</td></tr>
<tr><td>Chewable formats</td><td>Chewed and swallowed</td><td>Still swallowed, so the stomach question applies as with tablets</td><td>Convenience, not a different mechanism</td><td>Hims ("hard mint" chewables)</td></tr>
<tr><td>Alprostadil injection or urethral pellet</td><td>Injected into the penis or inserted into the urethra</td><td>Works locally, independent of the stomach; an option when pills fail or nitrates rule them out</td><td>Needs in-person training; second-line under the AUA guideline</td><td>Urology clinic; not offered by the online services we review</td></tr>
<tr><td>Vacuum erection device</td><td>Mechanical pump and ring</td><td>No drug interactions at all</td><td>Suits men on nitrates or who prefer no medication</td><td>Prescribed or bought through medical suppliers</td></tr>
<tr><td>Penile implant</td><td>Surgery</td><td>For men in whom other treatments fail; weight loss may lower surgical risk</td><td>Specialist decision</td><td>Urologist</td></tr>
<tr><td>Testosterone therapy</td><td>Gel, injection and other forms</td><td>Only for confirmed hypogonadism; in men losing weight, levels often rise on their own</td><td>Guideline says treat reversible causes first</td><td>See our <a href="/trt/articles/weight-loss-testosterone-glp1-vs-trt">weight loss vs TRT</a> guide</td></tr>
<tr><td>Weight loss, exercise, alcohol and smoking changes</td><td>Lifestyle</td><td>The GLP-1 is already doing much of this; exercise adds a separate benefit</td><td>About a third of obese men with ED regained normal function with lifestyle change in the Esposito trial</td><td>Free</td></tr>
</tbody>
</table>
<p>Sources for the treatment list and its order: ${ext(S.aua, "AUA erectile dysfunction guideline")}; drug facts from ${ext(S.viagraLabel, "the Viagra label")}, ${ext(S.cialisFdaArchive, "the Cialis label")} and ${ext(S.sildenafilMp, "MedlinePlus")}; on compounding, ${ext(S.fdaCompounding, "FDA, compounded drugs")}, ${CHECKED}. Provider formats and prices are as published on our reviews of <a href="/ed/reviews/shed">SHED</a>, <a href="/ed/reviews/quad">Quad by MEDVi</a> and the other providers in the <a href="/ed">ED treatment ranking</a>.</p>
<h3>How to think about the choice</h3>
<p>For most men the first treatment is still a generic PDE5 tablet, because it works for most men and costs least. On a GLP-1, the reasonable adjustments are about predictability. If sildenafil worked before the GLP-1 and seems unreliable now, the first questions are about timing, food and hydration, and the second is whether tadalafil, which is not food-sensitive and has a long window, would suit better. If timing remains the problem, a daily low dose of tadalafil, or a format that is not swallowed, removes the stomach from the equation as far as possible. None of these changes needs the GLP-1 to change. Our <a href="/ed/articles/erectile-dysfunction-treatment-complete-guide">complete ED treatment guide</a> covers every option in depth, including what to do when pills fail.</p>
<h3>On the non-swallowed formats</h3>
<p>The argument for a nasal or sublingual format in a man on a GLP-1 is mechanistic and, we think, reasonable: a dose absorbed through the lining of the nose or mouth does not have to wait for the stomach to empty. But no study has tested these formats in men on GLP-1 drugs, the speed figures in their marketing are the brands' own, and part of any dose dissolved in the mouth is swallowed. The compounded blends are not FDA-approved products, which puts weight on the clinician's review. They are an option to discuss, not an automatic upgrade.</p>`,
    },
    {
      heading: "How should you get ED treatment online while on a GLP-1?",
      body: `<p>Online ED treatment works for men on GLP-1 drugs in the same way it works for anyone, with one addition: the intake has to know about the GLP-1, and ideally the GLP-1 prescriber should know about the ED medication.</p>
<h3>What to put on the intake</h3>
<ul>
<li><strong>The GLP-1 by name and dose,</strong> and when you started or last increased it. A clinician who knows you are in the first month of a new dose can set expectations about timing.</li>
<li><strong>Every blood-pressure medicine,</strong> and any home readings that have fallen as you lost weight.</li>
<li><strong>Any nitrate,</strong> including a nitroglycerin spray kept "just in case". This is the one combination that is never allowed.</li>
<li><strong>Diabetes medicines,</strong> particularly insulin or a sulfonylurea, and your most recent HbA1c if you know it.</li>
<li><strong>Heart history and symptoms on exertion.</strong> The intake cannot take your blood pressure, so be complete.</li>
<li><strong>Side effects you are having now,</strong> such as nausea, vomiting or dizziness.</li>
</ul>
<p>Our walkthrough of <a href="/ed/articles/how-to-get-ed-treatment-online">how to get ED treatment online</a> covers the rest of the process.</p>
<h3>The providers we review</h3>
<p>The services in our <a href="/ed">ED treatment ranking</a> all run a licensed clinician's review before prescribing. They differ in format and price, which matters here mostly because of the swallowed versus non-swallowed question:</p>
<ul>
<li><strong>Hims</strong> offers generic sildenafil and tadalafil and chewable "hard mint" options through a polished national platform.</li>
<li><strong>DudeMeds</strong> keeps it simple and inexpensive with generic sildenafil and tadalafil tablets, advertised from around $1.63 each with free shipping.</li>
<li><strong>Peter MD</strong> offers generic sildenafil and tadalafil within a broader men's-health service that also includes TRT, which may suit a man whose testosterone is also in question.</li>
<li><strong>SHED</strong> prescribes Roxus, an intranasal vardenafil spray, and covers weight loss among its other categories.</li>
<li><strong>Quad by MEDVi</strong> is a compounded four-in-one sublingual dose (sildenafil, tadalafil, L-citrulline and apomorphine), listed at $114/month at our last check.</li>
<li><strong>BraveRX</strong> is a compounded three-in-one dissolving tablet (sildenafil, tadalafil and apomorphine), with plans from around $28 per week.</li>
<li><strong>DirectMeds</strong> prescribes common ED medications after a clinician review, with discreet delivery.</li>
</ul>
<p>These descriptions and prices are copied from our reviews, which state their dates and conditions; promotional prices move, so confirm on each provider's site, and see the <a href="/ed/ed-cost-index">ED cost index</a> for the dated comparison. Whichever service you use, the man has to bring the GLP-1 to the intake himself: an intake form only knows what it is told.</p>
<h3>One prescriber or two</h3>
<p>Many men get their GLP-1 from one service and their ED medication from another. That is workable, but each clinician sees only half the picture. The simplest safeguard is to keep one up-to-date medication list and give it to both, every time something changes.</p>`,
    },
    {
      heading: "Is it true that Ozempic causes ED? Six claims checked",
      body: `<p>Most of what men read about GLP-1 drugs and erections comes from headlines and social media posts that compress a study into a sentence. The table puts six common claims against what the sources in this guide actually say.</p>
<table>
<thead><tr><th>Claim</th><th>What the evidence says</th><th>Verdict</th></tr></thead>
<tbody>
<tr><td>"Ozempic causes ED"</td><td>Two record-based studies found more ED diagnoses in men on GLP-1 drugs; neither was designed to show cause, and the more careful one lost significance after a bias test (${ext(S.liaoPubmed, "Liao, 2024")}; ${ext(S.tangPubmed, "Tang, 2026")})</td><td>Not shown. An association, possibly an artefact</td></tr>
<tr><td>"Semaglutide raises ED risk 4.5 times"</td><td>The relative risk was 4.5, but on absolute rates of 1.47% against 0.32%, about 11 or 12 extra men per 1,000, in men aged 18 to 50 without diabetes (${ext(S.liaoPubmed, "Liao, 2024")})</td><td>Misleading without the absolute numbers</td></tr>
<tr><td>"GLP-1 drugs lower testosterone"</td><td>Men on GLP-1 drugs who lost about 10% of weight saw the share with normal testosterone rise from 53% to 77% in an ENDO 2025 report; tirzepatide raised testosterone in a 2025 pilot (${ext(S.endoHealio, "Healio, 2025")}; ${ext(S.tirzPilot, "pilot, 2025")})</td><td>The evidence points the other way, from small studies</td></tr>
<tr><td>"You can't take Viagra with Ozempic"</td><td>No GLP-1 label lists a PDE5 inhibitor interaction; the labels caution that slower stomach emptying may affect oral drugs in general (${ext(S.wegovyLabelCurrent, "Wegovy label")}; ${ext(S.zepboundLabel, "Zepbound label")})</td><td>False, with sensible care about timing, fluids and nitrates</td></tr>
<tr><td>"Losing weight will cure my ED"</td><td>About a third of obese men with ED regained normal function with lifestyle change in a randomised trial; bariatric surgery improves scores on average (${ext(S.esposito, "Esposito, 2004")}; ${ext(S.bariatric2020, "BMC Urology, 2020")})</td><td>For some men, not most; treat the ED meanwhile</td></tr>
<tr><td>"A spray or melt-in-the-mouth ED drug is better on a GLP-1"</td><td>Plausible because it does not rely on stomach emptying, but untested in GLP-1 users; the compounded blends are not FDA-approved (${ext(S.fdaCompounding, "FDA")})</td><td>A reasonable option to discuss, not a proven advantage</td></tr>
</tbody>
</table>
<p>The pattern in the table is the pattern in the evidence as a whole. The alarming claims rest on relative risks from observational records, and the reassuring claims rest on smaller but better-designed studies and on long-standing physiology. Neither side has the trial that would end the argument. Sources as linked, ${CHECKED}.</p>`,
    },
    {
      heading: "Worked examples: three men, three different answers",
      body: `<p>The evidence lands differently depending on who is taking the drug. These three composite examples are illustrations, not real patients, and the numbers in them come from the studies cited above. In each case, the decisions belong to the man's clinicians.</p>
<h3>A 38-year-old without diabetes, three weeks into semaglutide</h3>
<p>He has a BMI of 34, no diabetes and no history of ED. Three weeks after starting semaglutide, during the first dose step, he notices that erections are less reliable. He is eating very little, has been nauseated most afternoons and is drinking less than usual. He reads the Liao headline and considers stopping.</p>
<p>He is exactly the population in the Liao study, so the 1.47% against 0.32% figures apply to men like him; in absolute terms, the large majority of men in his position had no new ED record. His timing points to the short-term routes in the mechanism table: low intake, GI side effects and probably mild dehydration. The sensible course is to keep the drug, raise the problem at his next check-in, drink more, and wait for the side effects of the dose step to settle, as they usually do. If ED persists once he is eating normally, an ED prescription is a legitimate short-term bridge, disclosed to both prescribers. A morning testosterone test, if needed, is more informative once intake has settled than during the hardest weeks. Sources: ${ext(S.liaoPubmed, "Liao, 2024")}; ${ext(S.endoGuideline, "Endocrine Society guideline")}, ${CHECKED}.</p>
<h3>A 57-year-old with type 2 diabetes and high blood pressure, on tirzepatide</h3>
<p>He has had type 2 diabetes for nine years and takes two blood-pressure medicines. His ED began before the GLP-1 and has gradually worsened. Six months into tirzepatide, he has lost a meaningful amount of weight, his HbA1c is better, and he feels light-headed when he stands up after taking sildenafil.</p>
<p>His ED almost certainly predates and is independent of the GLP-1: NIDDK figures put more than half of men with diabetes at risk, and the vascular pattern of his ED is the one the Princeton IV consensus treats as a cardiovascular flag. The light-headedness is the practical problem, and its likeliest cause is a blood pressure that has fallen with his weight while his blood-pressure medicines have stayed the same, with sildenafil's own small blood-pressure effect added on top. The right step is a blood-pressure review with his primary-care clinician, not stopping either drug. He might also ask whether tadalafil, which is not food-sensitive, would be more predictable for him, and whether a cardiovascular risk assessment is due. The Tang study's 26% relative excess of ED records in men like him did not survive negative control calibration, and the Cowart study found tirzepatide associated with fewer ED records than the comparators; neither is strong enough to change his treatment. Sources: ${ext(S.niddkDiabetes, "NIDDK")}; ${ext(S.princeton, "Princeton IV")}; ${ext(S.viagraLabel, "Viagra label")}; ${ext(S.tangPubmed, "Tang, 2026")}; ${ext(S.cowart, "Cowart, 2025")}, ${CHECKED}.</p>
<h3>A 49-year-old with heart disease, considering semaglutide</h3>
<p>He had a stent two years ago, has a BMI of 31, does not have diabetes and keeps a nitroglycerin spray for angina. He has mild ED and is hesitant about semaglutide because of what he has read about erections.</p>
<p>He is the population of the SELECT trial, in which semaglutide reduced cardiovascular death, heart attack and stroke by 20%. Against that, the possible ED signal in observational records is small and uncertain. For him, the bigger erectile issue is the nitroglycerin: PDE5 inhibitors are contraindicated with nitrates in any form, so his ED options are a cardiology conversation about his angina treatment, a vacuum device or alprostadil. Weight loss, better blood pressure and exercise, which the Princeton IV panel puts first, act on both his heart and his erections. Sources: ${ext(S.select, "SELECT, 2023")}; ${ext(S.viagraLabel, "Viagra label")}; ${ext(S.princeton, "Princeton IV")}; ${ext(S.aua, "AUA guideline")}, ${CHECKED}.</p>
<h3>What the examples have in common</h3>
<p>In none of the three does the evidence support stopping the GLP-1 because of ED. In all three, the ED is a reason to talk to a clinician about something specific: the timing of side effects, the blood-pressure regimen, or a nitrate. That is the general lesson. ED on a GLP-1 is usually a clue to a solvable problem rather than a verdict on the drug.</p>`,
    },
    {
      heading: "Who this guide is for, and who it isn't for",
      body: `<p>This guide is for:</p>
<ul>
<li><strong>Men on semaglutide or tirzepatide who have noticed a change in erections</strong> and want to know whether the drug is responsible and what to do.</li>
<li><strong>Men considering a GLP-1</strong> who have read that it causes ED and want the evidence before deciding.</li>
<li><strong>Men with ED and obesity or diabetes</strong> who want to understand how weight loss fits into treatment.</li>
<li><strong>Partners</strong> trying to understand what is happening and what to suggest.</li>
</ul>
<p>It is not for:</p>
<ul>
<li><strong>Anyone thinking of stopping or lowering a GLP-1 dose on their own</strong> because of ED. That is a prescriber's decision, and the evidence here does not support it as a default.</li>
<li><strong>Men looking for a way to use GLP-1 drugs as an ED treatment.</strong> They are prescribed for weight management and diabetes under their own criteria; any improvement in erections is a consequence of weight and metabolic change, not an indication.</li>
<li><strong>Men taking nitrates.</strong> PDE5 inhibitors are contraindicated; the ED options are different and need a cardiology conversation. Our <a href="/ed/articles/ed-pills-and-blood-pressure-medication">blood pressure guide</a> covers the alternatives.</li>
<li><strong>Men with sudden ED after a pelvic injury, surgery or a new medication other than the GLP-1,</strong> where the cause is likely elsewhere.</li>
<li><strong>Anyone with chest pain, an erection lasting over four hours, or sudden vision or hearing loss.</strong> Those need emergency care, not an article.</li>
</ul>`,
    },
    {
      heading: "What we don't know yet",
      body: `<p>The honest summary is that the question this guide asks has not been answered by the kind of study that could answer it. Specifically:</p>
<ul>
<li><strong>No randomised trial of semaglutide or tirzepatide has had erectile function as a main outcome.</strong> The weight-loss trials (STEP, SURMOUNT) did not report erectile function as a primary endpoint, and the only randomised data, from REWIND, concerns dulaglutide in men with diabetes and was exploratory.</li>
<li><strong>We do not know whether the database signals are real.</strong> The best-designed study found its signal disappeared under negative control calibration; the other used a composite outcome open to detection bias. Neither can separate a drug effect from differences in who is recorded and how.</li>
<li><strong>We do not know the time course.</strong> The hypothesis that any harm is short-term and any benefit long-term fits the data but has not been tested. A study measuring IIEF scores at baseline, three months, six months and a year in men starting a GLP-1 would test it directly.</li>
<li><strong>We do not know how much GLP-1 drugs affect ED pill absorption.</strong> The labels describe the mechanism; nobody has measured sildenafil or tadalafil levels in men on semaglutide or tirzepatide.</li>
<li><strong>We do not know whether non-diabetic and diabetic men differ.</strong> The Liao signal was in young non-diabetic men; the Tang and Cowart results were in men with diabetes, in opposite directions for different comparisons.</li>
<li><strong>We do not know whether semaglutide and tirzepatide differ.</strong> The Cowart comparison favoured tirzepatide, but a database comparison between two drugs prescribed to different people is the weakest way to answer that.</li>
<li><strong>We do not know the effect on desire,</strong> as distinct from erections. Reports of reduced interest in pleasure generally have not been studied systematically in men on these drugs.</li>
<li><strong>Some studies have not been fully examined by us.</strong> For several papers we worked from the abstract, PubMed record or a dated news report rather than the full text, and we have said so where it matters.</li>
</ul>
<p>When better evidence appears, we will update this guide and its date. Until then, the decision rests on what is known with confidence: weight loss helps erections in many men, GLP-1 drugs produce weight loss, the signals of harm are small and uncertain, and ED itself is a reason for a health check.</p>`,
    },
    {
      heading: "What should you ask your clinician?",
      body: `<p>A short appointment goes further with specific questions. These are the ones we would take to a GLP-1 prescriber, an ED prescriber or a primary-care check-up.</p>
<h3>For the GLP-1 prescriber</h3>
<ul>
<li>I have noticed a change in erections since starting or increasing the dose. Could the side effects I am having, low intake, nausea or dehydration, explain it?</li>
<li>Is my current rate of dose escalation right for me, given the side effects?</li>
<li>Do my blood-pressure medicines still fit my current weight and readings?</li>
<li>I take, or want to take, an ED medicine. Is there anything about my health that makes that unsafe?</li>
<li>If I have diabetes: is my glucose control where it should be, and should my diabetes review include erectile function?</li>
</ul>
<h3>For the ED prescriber</h3>
<ul>
<li>I am on a GLP-1 that slows stomach emptying. Would tadalafil, daily tadalafil or a non-swallowed format be more predictable for me than sildenafil?</li>
<li>How long should I wait for a pill to work in the first weeks after a GLP-1 dose increase, and what should I not do if it seems slow?</li>
<li>Given my blood-pressure medicines and the GLP-1, what side effects should prompt me to call you?</li>
<li>If my erections improve as I lose weight, when should we review the dose or how often I use it?</li>
</ul>
<h3>For a primary-care check-up</h3>
<ul>
<li>Given my ED, is a cardiovascular risk assessment due? Blood pressure, lipids, HbA1c and a ten-year risk estimate.</li>
<li>Should I have two morning testosterone tests, with LH and FSH, now or once my eating has settled?</li>
<li>Could any of my other medications be contributing to the ED?</li>
<li>Could poor sleep, snoring or low mood be part of the picture?</li>
</ul>
<p>Write the answers down. If two clinicians give different advice, the medication list you share with both is where the discrepancy usually shows up.</p>`,
    },
    {
      heading: "Final verdict and next steps",
      body: `<p>GLP-1 drugs are more likely to help erectile function than to harm it over the long run, because they treat the weight, glucose, blood pressure and testosterone problems that cause most ED in the men who take them. The signals of harm are real enough to take seriously: two record-based studies found more ED diagnoses in men on GLP-1 drugs. But they are small in absolute terms, observational, and in the most careful study, the signal did not survive a test for hidden bias. The randomised evidence that exists points slightly the other way. If there is a short-term cost, it is most plausibly tied to the early weeks of treatment and to dose increases, when men eat little, feel flat, lose fluid and find a swallowed ED pill slower.</p>
<p>None of that is a reason to choose between the GLP-1 and an erection. The two treatments are compatible, there is no labelled interaction between them, and the practical adjustments are simple.</p>
<ol>
<li><strong>Keep the GLP-1</strong> at the dose your prescriber sets. If ED is distressing, discuss it with them rather than skipping doses.</li>
<li><strong>Treat the ED now,</strong> not after the weight is off. A licensed online provider can prescribe once you disclose the GLP-1 and every other medicine; our <a href="/ed/articles/how-to-get-ed-treatment-online">guide to getting ED treatment online</a> walks through it, and the <a href="/ed">ED treatment ranking</a> compares providers.</li>
<li><strong>Make the pill predictable.</strong> Allow extra time early on, avoid heavy meals before sildenafil, stay hydrated, keep alcohol modest, and if timing is still a problem ask about tadalafil, daily tadalafil or a non-swallowed format. Our <a href="/ed/articles/sildenafil-vs-cialis">sildenafil vs Cialis</a> guide sets out the differences, and the <a href="/ed/ed-cost-index">cost index</a> prices them.</li>
<li><strong>Never combine a PDE5 inhibitor with a nitrate,</strong> and review blood-pressure medicines as your weight falls; see <a href="/ed/articles/ed-pills-and-blood-pressure-medication">ED pills and blood pressure medication</a>.</li>
<li><strong>Use the ED as a prompt for a check-up:</strong> blood pressure, lipids, HbA1c and, if symptoms fit, morning testosterone. Our guides to <a href="/ed/articles/erectile-dysfunction-heart-disease-warning-sign">ED and heart disease</a>, <a href="/ed/articles/ed-and-diabetes">ED and diabetes</a> and <a href="/ed/articles/can-low-testosterone-cause-ed">low testosterone and ED</a> cover what to ask for.</li>
<li><strong>Give it time.</strong> The weight-loss evidence suggests improvement over months. Many men find that erections, and the need for medication, change as the weight comes off; tell your ED prescriber when they do.</li>
</ol>
<p>For the full range of ED treatments, see the <a href="/ed/articles/erectile-dysfunction-treatment-complete-guide">complete ED treatment guide</a>. For the GLP-1 side of the question, the <a href="/weight-loss/articles/semaglutide-side-effects-guide">semaglutide side effects guide</a> covers the early-weeks problems, and <a href="/trt/articles/weight-loss-testosterone-glp1-vs-trt">weight loss vs TRT</a> covers testosterone.</p>
<p><em>This article is general information, not medical advice. GLP-1 medications and ED medications are prescription drugs with risks. Do not start, stop or change a dose without a licensed clinician who knows your history, and seek emergency care for chest pain, an erection lasting over four hours, or sudden loss of vision or hearing.</em></p>`,
    },
    {
      heading: "References",
      body: `<p>All sources ${CHECKED}. Where we relied on an abstract, PubMed record or news report rather than the full paper, the entry says so.</p>
<ol>
<li>${ext(S.liaoNature, "Liao B et al. Prescribing semaglutide for weight loss in non-diabetic, obese patients is associated with an increased risk of erectile dysfunction: a TriNetX database study. International Journal of Impotence Research, published online May 2024; 2025;37(4):315-319")}; ${ext(S.liaoPubmed, "PubMed record")}.</li>
<li>${ext(S.liaoAbstract, "Liao B et al. Conference abstract on semaglutide, erectile dysfunction and hypogonadism in non-diabetic males. Journal of Sexual Medicine, 2024")} (earlier, not peer-reviewed version).</li>
<li>${ext(S.urologyTimes, "Urology Times. Semaglutide for weight loss may increase risk for ED in non-diabetic men, 2024")} (news report).</li>
<li>${ext(S.tangLancet, "Tang H et al. GLP-1 receptor agonist and risk of erectile dysfunction in men with type 2 diabetes: a target trial emulation. eClinicalMedicine, 2026")}; ${ext(S.tangPubmed, "PubMed record")}.</li>
<li>${ext(S.tangEmj, "EMJ. GLP-1 use may be tied to erectile dysfunction, 2026")} (news report).</li>
<li>${ext(S.rewind, "Bajaj HS et al. Erectile function in men with type 2 diabetes treated with dulaglutide: an exploratory analysis of the REWIND placebo-controlled randomised trial. Lancet Diabetes &amp; Endocrinology, 2021;9(8):484-490")} (PubMed record).</li>
<li>${ext(S.cowart, "Cowart, Murphy and Carris. Association of tirzepatide with erectile dysfunction in people with type 2 diabetes. Journal of Diabetes and its Complications, 2025;39(10):109116")} (PubMed record); ${ext(S.cowartReport, "Medical Dialogues report, 2025")}.</li>
<li>${ext(S.tirzPilotFull, "Short-term impact of tirzepatide on metabolic hypogonadism and body composition in patients with obesity: a controlled pilot study. Reproductive Biology and Endocrinology, 2025;23:92")}; ${ext(S.tirzPilot, "PubMed record")}.</li>
<li>${ext(S.mr, "An, Xie and Gan. Glucagon-like peptide-1 receptor agonists and the risk of erectile dysfunction: a drug target Mendelian randomization study. Frontiers in Endocrinology, November 13, 2024")}.</li>
<li>${ext(S.faers, "Male sexual dysfunction associated with GLP-1 receptor agonists: a cross-sectional analysis of FAERS data. International Journal of Impotence Research, 2025")} (abstract summary, UroToday).</li>
<li>${ext(S.faersAntidiabetic, "Sexual safety signals of common antidiabetic drugs: insights from FAERS disproportionality analysis, 2026")} (PubMed record).</li>
<li>${ext(S.friendFoe, "Kounatidis D et al. The impact of glucagon-like peptide-1 receptor agonists on erectile function: friend or foe? Biomolecules, September 5, 2025")}.</li>
<li>${ext(S.esposito, "Esposito K et al. Effect of lifestyle changes on erectile dysfunction in obese men: a randomized controlled trial. JAMA, 2004;291(24):2978-2984")} (PubMed record).</li>
<li>${ext(S.bariatric2023, "Influence of bariatric surgery on erectile dysfunction: a systematic review and meta-analysis. Obesity Surgery, 2023")}.</li>
<li>${ext(S.bariatric2020, "Meta-analysis of bariatric surgery and erectile function. BMC Urology, 2020")}.</li>
<li>${ext(S.endoHealio, "Healio. Obesity drugs may raise testosterone in men (ENDO 2025), July 15, 2025")}; ${ext(S.endoTirz, "Healio. Tirzepatide and testosterone in metabolic hypogonadism (ENDO 2025), July 24, 2025")}; ${ext(S.medx, "Medical Xpress, July 2025")} (conference reports, not yet peer-reviewed at the time).</li>
<li>${ext(S.endoGuideline, "Bhasin S et al. Testosterone therapy in men with hypogonadism: an Endocrine Society clinical practice guideline. JCEM, 2018")}.</li>
<li>${ext(S.step1, "Wilding JPH et al. Once-weekly semaglutide in adults with overweight or obesity (STEP 1). NEJM, 2021")}; ${ext(S.step1Summary, "trial summary, Wiki Journal Club")}.</li>
<li>${ext(S.surmount1, "Jastreboff AM et al. Tirzepatide once weekly for the treatment of obesity (SURMOUNT-1). NEJM, 2022")}; ${ext(S.step1Ext, "Wilding JPH et al. Weight regain and cardiometabolic effects after withdrawal of semaglutide (STEP 1 extension). Diabetes, Obesity and Metabolism, 2022")}.</li>
<li>${ext(S.select, "Lincoff AM et al. Semaglutide and cardiovascular outcomes in obesity without diabetes (SELECT). NEJM, 2023")}.</li>
<li>${ext(S.wegovyLabel, "Wegovy (semaglutide) prescribing information. FDA")}; ${ext(S.wegovyLabelCurrent, "Wegovy label drug interactions section, as reproduced by MedLibrary")}.</li>
<li>${ext(S.zepboundLabel, "Zepbound (tirzepatide) prescribing information. FDA, revised 2026")}.</li>
<li>${ext(S.lillyContraception, "Lilly Medical. Can adults taking Zepbound also take oral contraceptives?")}.</li>
<li>${ext(S.drugsCom, "Drugs.com. Drug interactions between Ozempic and sildenafil")}.</li>
<li>${ext(S.viagraLabel, "Viagra (sildenafil) prescribing information. Pfizer")}; ${ext(S.viagraFdaArchive, "Viagra prescribing information, FDA archive copy, 2008")}.</li>
<li>${ext(S.cialisFdaArchive, "Cialis (tadalafil) prescribing information, FDA archive copy, 2007")}.</li>
<li>${ext(S.sildenafilMp, "MedlinePlus. Sildenafil")}; ${ext(S.tadalafilMp, "MedlinePlus. Tadalafil")}.</li>
<li>${ext(S.aua, "Burnett AL et al. Erectile dysfunction: AUA guideline. American Urological Association, 2018")}.</li>
<li>${ext(S.fdaCompounding, "FDA. Human drug compounding: consumer and health care professional information")}.</li>
<li>${ext(S.niddkCauses, "NIDDK. Symptoms and causes of erectile dysfunction")}; ${ext(S.niddkDiabetes, "NIDDK. Diabetes, sexual, and bladder problems")}.</li>
<li>${ext(S.umbrella, "Mostafaei H et al. Association of erectile dysfunction and cardiovascular disease: an umbrella review. BJU International, 2021")}.</li>
<li>${ext(S.princeton, "Kloner RA et al. The Princeton IV consensus recommendations for the management of erectile dysfunction and cardiovascular disease. Mayo Clinic Proceedings, 2024")}.</li>
</ol>`,
    },
  ],
};
