import type { ArticleData } from "../config";

// ───── TRT guides written for treatmentshub.com/trt, Oct 28, 2026 ─────
// Obesity-related low testosterone and whether weight loss (including on a
// GLP-1) restores it. Conference results (ENDO 2025) are labelled as reported;
// guideline statements link the guideline; the FDA's 2025 label change links
// the FDA page.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  endoHealio: "https://www.healio.com/news/endocrinology/20250715/obesity-drugs-may-raise-testosterone-in-men",
  endoTirz: "https://www.healio.com/news/endocrinology/20250724/tirzepatide-important-choice-for-increasing-testosterone-in-metabolic-hypogonadism",
  medx: "https://medicalxpress.com/news/2025-07-anti-obesity-medications-testosterone-men.html",
  endoGuideline: "https://academic.oup.com/jcem/article/103/5/1715/4939465",
  fdaLabel: "https://www.fda.gov/drugs/drug-alerts-and-statements/fda-issues-class-wide-labeling-changes-testosterone-products",
  traverse: "https://www.nejm.org/doi/full/10.1056/NEJMoa2215025",
  niddkEd: "https://www.niddk.nih.gov/health-information/urologic-diseases/erectile-dysfunction/symptoms-causes",
};

export const TRT_ARTICLES_2026_10: ArticleData[] = [
  {
    slug: "weight-loss-testosterone-glp1-vs-trt",
    title: "Low Testosterone and Obesity: Weight Loss or TRT? (2026)",
    description:
      "Obesity lowers testosterone and weight loss raises it. What the 2025 GLP-1 studies reported, functional versus organic hypogonadism, and when TRT is needed.",
    category: "Science",
    readTime: "15 min read",
    publishedAt: "2026-10-28",
    updatedAt: "2026-10-28",
    heroColor: "#0f2a43",
    author: "Treatments Hub Research Team",
    keyTakeaways: [
      "Obesity is the most common reversible cause of low testosterone in men. Fat tissue converts testosterone to estrogen and suppresses the signal from the brain, so the level falls without anything being wrong with the testicles.",
      "Weight loss raises it. In a study reported at ENDO 2025, men with obesity on semaglutide, tirzepatide or dulaglutide lost about 10% of body weight over 18 months and the share with normal testosterone rose from 53% to 77%, without any hormone treatment. The rise is attributed to the weight loss, not the drug.",
      "The Endocrine Society's guideline recommends against starting testosterone in men whose low level is explained by obesity or other reversible conditions until those are addressed; TRT remains the treatment for men with organic hypogonadism, and the FDA's 2025 label keeps its limitation on age-related low testosterone.",
      "The decision is a blood-test decision: two morning totals, free testosterone, LH and FSH, and a clinician who can tell functional from organic. Online TRT clinics that prescribe without that workup are skipping the step that decides whether you need the drug at all.",
    ],
    sections: [
      {
        heading: "Does losing weight raise testosterone, or do you need TRT?",
        body: `<div class="qa"><strong>Key takeaways and quick verdict</strong><p>For a man whose low testosterone is caused by excess weight, losing the weight usually raises it, and often back into the normal range; a 2025 study of men on GLP-1 drugs reported the share with normal levels rising from about half to about three quarters with roughly 10% weight loss. For a man whose testicles or pituitary have stopped producing it, weight loss will not fix it, and testosterone replacement is the treatment. Telling the two apart takes two morning blood tests, the pituitary hormones LH and FSH, and a clinician, not a questionnaire. Guidelines say to address the reversible cause first. Sources: ${ext(S.endoHealio, "ENDO 2025 study, as reported by Healio")}; ${ext(S.endoGuideline, "Endocrine Society guideline, 2018")}, checked October 28, 2026.</p></div>
<p>Two of the fastest-growing categories in telehealth, GLP-1 weight-loss programmes and online testosterone clinics, are selling to the same man. He is in his forties or fifties, carries weight around the middle, is tired, has lost some drive and some libido, and a blood test shows a testosterone level at or below the bottom of the range. One industry tells him to inject semaglutide; the other tells him to inject testosterone. Both are prescription treatments with evidence. Only one of them addresses the reason his level is low, and this guide is about working out which.</p>`,
      },
      {
        heading: "Why does obesity lower testosterone?",
        body: `<p>Testosterone production runs on a feedback loop. The hypothalamus releases GnRH, the pituitary responds with luteinising hormone (LH) and follicle-stimulating hormone (FSH), and LH tells the testicles to make testosterone. Excess fat tissue interferes at several points. Fat contains the enzyme aromatase, which converts testosterone into estradiol, and estradiol feeds back on the brain to reduce LH. Fat tissue also produces inflammatory signals and the hormone leptin that blunt the brain's output, and the insulin resistance that travels with obesity lowers sex hormone-binding globulin, which changes how much of the total testosterone is free. The result is a man with a low or low-normal total testosterone, a low or inappropriately normal LH, and testicles that are capable of more than they are being asked for.</p>
<p>Endocrinologists call this functional, or secondary, hypogonadism: the machinery works, the signal is suppressed. It is distinguished from organic hypogonadism, in which the testicles are damaged (primary, with a high LH as the pituitary tries harder) or the pituitary or hypothalamus is diseased (secondary, with a low LH and a cause such as a tumour, iron overload or a head injury). The distinction is the whole of the clinical question, and the Endocrine Society's guideline builds its recommendations around it. Source: ${ext(S.endoGuideline, "Bhasin et al., Endocrine Society clinical practice guideline, JCEM, 2018")}, checked October 28, 2026.</p>
<p>Obesity is the most common cause of the functional kind, and it is not a marginal effect. The association between higher body mass index and lower testosterone is one of the most consistent findings in men's endocrinology, strong enough that obesity on its own explains a large share of the "low T" diagnoses made in middle-aged men. Sleep apnoea, which travels with obesity, lowers it further. So do opioid painkillers, heavy drinking and uncontrolled diabetes.</p>`,
      },
      {
        heading: "What weight loss does to testosterone: the 2025 GLP-1 evidence",
        body: `<p>Because the suppression is functional, it reverses when the cause is removed. That has been shown for diet-induced weight loss and for bariatric surgery over many years; the question in 2025 was whether it holds for the GLP-1 drugs, which produce surgical-scale weight loss in a large population. Two studies presented at the Endocrine Society's ENDO 2025 meeting addressed it.</p>
<p>The first was a retrospective review of 110 men with obesity or type 2 diabetes treated with semaglutide, tirzepatide or dulaglutide, none of whom were on testosterone or other hormone therapy. Over about 18 months they lost about 10% of body weight, and the proportion with normal total and free testosterone rose from 53% to 77%. The authors attributed the rise to the weight loss rather than to a direct hormonal effect of the drugs. The second compared tirzepatide with transdermal testosterone in 83 men with what the authors called metabolic hypogonadism; the men on tirzepatide plus lifestyle change showed a larger rise in total and free testosterone at two months than the men on testosterone gel plus lifestyle change or lifestyle change alone, and improved erectile function. Sources: ${ext(S.endoHealio, "Healio, July 15, 2025")}; ${ext(S.endoTirz, "Healio, July 24, 2025")}; ${ext(S.medx, "Medical Xpress, July 2025")}, checked October 28, 2026.</p>
<h3>How much to trust it</h3>
<p>Both are conference presentations, one is retrospective, both are small, and neither has the weight of a randomised trial designed around testosterone as the primary outcome. They are consistent with decades of evidence that weight loss raises testosterone, and that is the reason to take them seriously rather than their own size. The most important detail is the one easy to miss: the men whose levels normalised were not given testosterone. Their own production recovered.</p>
<table>
<thead><tr><th>Route</th><th>What it does to testosterone</th><th>Who it suits</th><th>What it does not do</th></tr></thead>
<tbody>
<tr><td>Weight loss (GLP-1, diet, surgery)</td><td>Raises the body's own production as fat falls; normalised levels in about three quarters of men in the 2025 cohort at ~10% loss (as reported)</td><td>Men whose low level is explained by obesity, with low or normal LH</td><td>Nothing for organic hypogonadism; takes months; needs the weight to stay off</td></tr>
<tr><td>Testosterone replacement</td><td>Replaces the hormone from outside; the body's own production and sperm production shut down while on it</td><td>Men with organic hypogonadism, or functional hypogonadism that persists after the cause is treated, with symptoms</td><td>Does not treat the obesity; the FDA label keeps a limitation of use for age-related low testosterone</td></tr>
<tr><td>Enclomiphene or clomiphene (off-label)</td><td>Raises LH and the body's own production; preserves fertility</td><td>Younger men with functional hypogonadism who want to keep fertility</td><td>Not approved for this use; variable response; covered in our enclomiphene guide</td></tr>
<tr><td>Both: weight loss plus TRT</td><td>Sometimes used when symptoms are severe and weight loss is slow, with a plan to reassess</td><td>Case by case, under an endocrinologist</td><td>Makes it hard to know what the man's own production would have done</td></tr>
</tbody>
</table>`,
      },
      {
        heading: "What the guidelines and the FDA label say",
        body: `<p>The Endocrine Society's guideline is the reference most clinicians use, and it is direct on this point: it recommends diagnosing hypogonadism only in men with symptoms and unequivocally and consistently low morning testosterone on at least two occasions, measuring LH and FSH to classify the cause, and addressing reversible causes, including obesity, before considering testosterone. It recommends against testosterone for men with low levels explained by obesity alone, and against routine testing of men without symptoms. Source: ${ext(S.endoGuideline, "Endocrine Society guideline, 2018")}, checked October 28, 2026.</p>
<p>The regulator's position moved in 2025, but not in the direction the online clinics sometimes imply. On February 28, 2025, the FDA announced class-wide labelling changes for all testosterone products after the TRAVERSE trial: the boxed warning on cardiovascular risk was removed and the trial's findings were added, because TRAVERSE found testosterone gel non-inferior to placebo for major adverse cardiac events in 5,246 men at high cardiovascular risk, with higher rates of atrial fibrillation and pulmonary embolism. The same announcement kept the label's Limitation of Use for age-related hypogonadism and added a warning about increases in blood pressure. In plain terms: TRT is safer for the heart than the old label implied, and it is still not approved for low testosterone that is simply a feature of ageing or weight. Sources: ${ext(S.fdaLabel, "FDA, class-wide labeling changes, February 2025")}; ${ext(S.traverse, "TRAVERSE, NEJM, 2023")}, checked October 28, 2026. Our guide to <a href="/trt/articles/is-trt-safe">whether TRT is safe</a> covers the trial and the label in detail.</p>`,
      },
      {
        heading: "How to tell which one you are: the workup that decides it",
        body: `<p>The question of weight loss versus TRT is answered by a short list of tests and a history, and a man who has not had them has not been diagnosed, whatever a symptom questionnaire said.</p>
<ol>
<li><strong>Two morning total testosterone levels</strong>, drawn before 10 a.m. on separate days, fasting, when well; a single low reading on an afternoon or during an illness is not a diagnosis. Our guide to <a href="/trt/articles/trt-blood-work">TRT blood work</a> covers the panel.</li>
<li><strong>Free testosterone or SHBG</strong>, because obesity lowers SHBG and the total can understate what is available; see <a href="/trt/articles/free-vs-total-testosterone">free versus total testosterone</a>.</li>
<li><strong>LH and FSH.</strong> High with a low testosterone points to the testicles (primary, organic). Low or normal points to the brain, and then the question is why: obesity, sleep apnoea, opioids, alcohol, diabetes, or a pituitary problem that needs prolactin and sometimes imaging.</li>
<li><strong>The history.</strong> Weight trajectory, snoring and daytime sleepiness, medications, alcohol, testicular injury or infection, fertility plans.</li>
<li><strong>The symptoms.</strong> Low libido, erectile difficulty, loss of morning erections, fatigue and low mood are the ones that respond to treatment; the guideline is clear that treatment is for symptomatic men.</li>
</ol>
<p>A man with obesity, a low-normal LH and a total testosterone just below the range has functional hypogonadism until proven otherwise, and the evidence says his level will rise as his weight falls. A man with a clearly low testosterone, a high LH and small testicles has primary hypogonadism, and no amount of weight loss will change it. A man with a very low testosterone and a low LH needs a pituitary workup before anyone prescribes anything.</p>`,
      },
      {
        heading: "When is TRT still the right answer?",
        body: `<p>None of this argues against testosterone replacement for the men it is for. It argues for diagnosing them properly. TRT is the treatment when:</p>
<ul>
<li><strong>The hypogonadism is organic.</strong> Primary testicular failure, pituitary disease, genetic conditions such as Klinefelter syndrome, and damage from chemotherapy, radiation or injury do not reverse with weight loss.</li>
<li><strong>The cause has been addressed and the level stays low.</strong> A man who has lost the weight, treated his sleep apnoea and stopped the opioid, and whose morning testosterone is still unequivocally low with symptoms, is a candidate.</li>
<li><strong>The symptoms are severe and the cause will take time.</strong> Some endocrinologists start testosterone alongside weight loss in a man with marked symptoms, with a plan to reassess and, where appropriate, withdraw it once the weight is off. That is a supervised decision, not a default.</li>
</ul>
<p>What TRT is not is a treatment for obesity. It can modestly improve body composition, and the better trials show small gains in lean mass and losses in fat, but it does not produce weight loss on the scale a GLP-1 drug does, and a man who starts TRT for a weight-related low testosterone without addressing the weight has locked himself into a lifelong prescription for a reversible problem, with his own production and his fertility suppressed while he takes it. Our guide to <a href="/trt/articles/can-you-stop-trt">whether you can stop TRT</a> covers what recovery looks like, and <a href="/trt/articles/trt-and-fertility">TRT and fertility</a> covers the sperm question.</p>`,
      },
      {
        heading: "What the online clinics do with this, and what their customers say",
        body: `<p>The online TRT clinics we review differ most on exactly this point: how much diagnosis happens before the prescription. The better ones require two morning draws, measure LH and FSH, ask about weight and sleep, and will decline a man whose numbers do not support treatment; the weaker ones treat a single low-normal reading and a symptom score as sufficient. Our <a href="/trt">TRT clinic ranking</a> and the individual reviews record what each clinic's intake requires, and <a href="/trt/articles/trt-clinic-vs-online">TRT clinic versus online</a> sets out when an in-person endocrinologist is the better route.</p>
<p>In the customers' reviews we quote on those pages, the pattern is consistent with everything above. Men praise the speed of getting a prescription and the convenience of at-home testing; the complaints cluster around blood pressure and haematocrit rises that the clinic did not warn about, subscriptions that were hard to cancel, and, in a minority, the realisation months in that the symptoms had not changed. The man whose fatigue was caused by sleep apnoea and sixty extra pounds does not feel better on testosterone, because testosterone was never the problem. For the same man, the weight-loss providers we review are compared on the <a href="/weight-loss">GLP-1 provider ranking</a>, and <a href="/weight-loss/articles/testosterone-and-weight-loss">testosterone and weight loss</a> covers the question from the other side.</p>`,
      },
      {
        heading: "Who is this not for, and what are the limits of the evidence?",
        body: `<ul>
<li><strong>Men with organic hypogonadism.</strong> If your LH is high or a pituitary cause has been found, weight loss is good for you but it is not your testosterone treatment.</li>
<li><strong>Men without symptoms.</strong> A low number on a screening test in a man who feels well is not a diagnosis, and the guideline recommends against treating it.</li>
<li><strong>Men planning to use a GLP-1 as a testosterone therapy.</strong> The drugs are prescribed for weight management under their own criteria; the testosterone rise is a consequence of weight loss, not an indication.</li>
<li><strong>Men with low testosterone and a normal weight.</strong> This guide's mechanism does not apply; the workup still does.</li>
</ul>
<p>The evidence limits are plain. The GLP-1 studies are small conference presentations; the long-standing weight-loss evidence is stronger but comes from diet and surgery cohorts; and there is no randomised trial comparing weight loss against TRT on symptoms in men with functional hypogonadism, which is the trial that would settle the practical question. What is not in doubt is the physiology and the guideline position, and both point the same way.</p>`,
      },
      {
        heading: "Final verdict and next steps",
        body: `<p>If your testosterone is low and your weight is high, the weight is the first suspect and the evidence says treating it will often raise the hormone on its own. If your testosterone is low because your testicles or pituitary cannot make it, replacement is the treatment and weight loss will not substitute. The difference is three blood tests and a history, and the right order is diagnosis, then cause, then drug.</p>
<ol>
<li><strong>Get the workup</strong>: two morning totals, free testosterone or SHBG, LH and FSH, and a frank history of weight, sleep, alcohol and medications.</li>
<li><strong>If LH is low or normal and your BMI is high</strong>: treat the weight first, with a clinician, and recheck testosterone after meaningful loss. Our <a href="/weight-loss/glp1-bmi-calculator">BMI and eligibility check</a> applies the GLP-1 label criteria.</li>
<li><strong>If LH is high, or the level stays low after the cause is treated</strong>: discuss TRT with a clinician who will monitor haematocrit, blood pressure and PSA, and who has read the 2025 label. Our <a href="/trt/articles/how-to-get-trt-online">guide to getting TRT online</a> and the <a href="/trt">clinic ranking</a> cover the options.</li>
<li><strong>Whatever you decide, keep the weight off</strong>, because it is the one intervention that helps in both cases.</li>
</ol>
<h3>References and further reading</h3>
<ul>
<li>${ext(S.endoGuideline, "Bhasin S et al. Testosterone therapy in men with hypogonadism: an Endocrine Society clinical practice guideline. JCEM, 2018")}.</li>
<li>${ext(S.endoHealio, "Healio: Obesity drugs may raise testosterone in men (ENDO 2025)")}; ${ext(S.endoTirz, "Healio: tirzepatide and testosterone in metabolic hypogonadism (ENDO 2025)")}; ${ext(S.medx, "Medical Xpress coverage, July 2025")}.</li>
<li>${ext(S.fdaLabel, "FDA: class-wide labeling changes for testosterone products, February 28, 2025")}.</li>
<li>${ext(S.traverse, "Lincoff AM et al. Cardiovascular safety of testosterone-replacement therapy (TRAVERSE). NEJM, 2023")}.</li>
<li>${ext(S.niddkEd, "NIDDK: erectile dysfunction, symptoms and causes")}, for the overlap with erectile symptoms.</li>
</ul>
<p><em>This article is general information, not medical advice. Testosterone and GLP-1 medications are prescription drugs with risks; the diagnosis and the decision belong to a licensed clinician who has your blood results and history.</em></p>`,
      },
    ],
  },
];
