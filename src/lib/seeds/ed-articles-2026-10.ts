import type { ArticleData } from "../config";

// ───── ED guides written for treatmentshub.com/ed, Oct 28, 2026 ─────
// ED as a cardiovascular warning sign. Every figure links the meta-analysis
// or consensus that produced it, with the date checked; study figures are
// reported as those studies reported them.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  umbrella: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8359379/",
  vlachopoulos: "https://www.ahajournals.org/doi/10.1161/circoutcomes.112.966903",
  montorsiEd: "https://www.cardiologicomonzino.it/doc/1646/9e5285445d53429bb846d7e49cbd6718/",
  princeton: "https://www.sciencedirect.com/science/article/abs/pii/S0025619624002763",
  princetonJsm: "https://academic.oup.com/jsm/article/21/2/90/7499332",
  acc: "https://www.acc.org/latest-in-cardiology/articles/2024/09/23/10/45/erectile-disfunction-as-an-ascvd-risk-enhancing-factor",
  mayoVital: "https://www.mayoclinic.org/medical-professionals/urology/news/erectile-dysfunction-a-vital-sign-for-cardiovascular-health/mac-20585074",
  natureRev: "https://www.nature.com/articles/s41585-026-01183-2",
  niddkCauses: "https://www.niddk.nih.gov/health-information/urologic-diseases/erectile-dysfunction/symptoms-causes",
  viagraLabel: "https://labeling.pfizer.com/ShowLabeling.aspx?id=652",
};

export const ED_ARTICLES_2026_10: ArticleData[] = [
  {
    slug: "erectile-dysfunction-heart-disease-warning-sign",
    title: "ED as a Heart Warning Sign: Why It Comes First, What to Do",
    description:
      "ED predicts heart attacks and strokes independently of the usual risk factors and appears years earlier. The meta-analyses, Princeton IV, and tests to ask for.",
    category: "Science",
    readTime: "14 min read",
    publishedAt: "2026-10-28",
    updatedAt: "2026-10-28",
    heroColor: "#14243a",
    author: "Treatments Hub Research Team",
    keyTakeaways: [
      "Men with erectile dysfunction have about a 45% to 50% higher risk of cardiovascular disease and coronary heart disease than men without it, in pooled prospective studies, and the increase is largely independent of the usual risk factors. The penile arteries are small, so they show atherosclerosis first.",
      "The lead time is years, not weeks. In the classic Montorsi series, ED preceded the symptoms of coronary disease by two to three years in most men who had both; reviews put the window at two to five years before a cardiovascular event.",
      "The Princeton IV consensus (2024) says a sexual-function history belongs in every man's cardiovascular evaluation, that ED should count as a risk-enhancing factor, and that men with ED at low to intermediate ten-year risk should be considered for a coronary artery calcium scan.",
      "This is a reason to get checked, not to panic. A blood-pressure reading, a lipid panel, a glucose or HbA1c test, and a conversation about smoking and exercise are the first step; ED treatment itself is usually safe once that is done, and lifestyle change improves both problems at once.",
    ],
    sections: [
      {
        heading: "Is erectile dysfunction a sign of heart disease?",
        body: `<div class="qa"><strong>Key takeaways and quick verdict</strong><p>Often, yes. Erectile dysfunction (ED) and coronary artery disease share a cause, atherosclerosis of the arteries, and the arteries of the penis are small enough to be affected first. Pooled prospective studies find roughly a 45% to 50% higher risk of cardiovascular disease and coronary heart disease in men with ED, independent of age, blood pressure, cholesterol and diabetes, and the ED typically shows up two to five years before the heart does. The right response is a cardiovascular risk assessment, not alarm: blood pressure, lipids, glucose, smoking and weight, and for some men a coronary calcium scan. Sources: ${ext(S.umbrella, "umbrella review, BJU International, 2021")}; ${ext(S.princeton, "Princeton IV consensus, 2024")}, checked October 28, 2026.</p></div>
<p>Most men who seek ED treatment online get a tablet and a shipping confirmation. Some of them should also get a cardiologist. This guide is about telling which is which: what the evidence says about ED as an early sign of vascular disease, how large the risk is, how far ahead the warning comes, what the cardiology consensus now recommends, and which tests to ask for. It is written to be useful before and after a prescription, because the tablet treats the symptom and the risk assessment treats the cause.</p>`,
      },
      {
        heading: "Why does ED show up before heart disease?",
        body: `<p>An erection is a vascular event: nerve signals relax the smooth muscle of the penile arteries, blood flows in, and the filling chambers compress the veins that would drain it. The lining of those arteries, the endothelium, has to release nitric oxide for the muscle to relax, and endothelial dysfunction, the failure of that lining to respond, is the earliest measurable stage of atherosclerosis anywhere in the body. The penile arteries are one to two millimetres across; the coronary arteries are three to four; the carotids six or more. A plaque or a stiffened wall that narrows a penile artery enough to impair an erection would narrow a coronary artery by a much smaller fraction and produce no symptoms at all. The same disease, in a smaller pipe, shows first. This "artery size hypothesis" is the standard explanation, and it is why urologists and cardiologists now describe ED as a vital sign. Sources: ${ext(S.niddkCauses, "NIDDK, ED symptoms and causes")}; ${ext(S.mayoVital, "Mayo Clinic: ED, a vital sign for cardiovascular health")}, checked October 28, 2026.</p>
<p>The corollary matters for men under 50 as much as over. ED with a vascular pattern, gradual onset, loss of firmness in all situations, in a man with diabetes, hypertension, a smoking habit or a family history, is the body reporting endothelial disease years before a stress test would. ED with a psychological pattern, sudden onset, intact morning erections, situational, is not. Our guide to <a href="/ed/articles/what-causes-erectile-dysfunction">what causes erectile dysfunction</a> covers the distinction, and the <a href="/ed/articles/erectile-dysfunction-treatment-complete-guide">complete treatment guide</a> covers how a clinician works it out.</p>`,
      },
      {
        heading: "How big is the risk? The numbers from the meta-analyses",
        body: `<p>The evidence base is unusually large for a question of this kind: prospective cohort studies following tens of thousands of men for years, pooled in several meta-analyses and then in an umbrella review of the meta-analyses themselves.</p>
<table>
<thead><tr><th>Study</th><th>Design</th><th>Men followed</th><th>Finding (as reported)</th></tr></thead>
<tbody>
<tr><td>Dong et al., JACC, 2011</td><td>Meta-analysis of 12 prospective cohorts</td><td>36,744</td><td>ED associated with relative risks of about 1.48 for cardiovascular disease, 1.46 for coronary heart disease, 1.35 for stroke and 1.19 for all-cause mortality, largely independent of conventional risk factors</td></tr>
<tr><td>Vlachopoulos et al., Circulation: Cardiovascular Quality and Outcomes, 2013</td><td>Meta-analysis of 14 cohorts</td><td>92,757, mean follow-up 6.1 years</td><td>ED predicts cardiovascular events and all-cause mortality; the authors propose it be used in risk assessment</td></tr>
<tr><td>Mostafaei et al., BJU International, 2021</td><td>Umbrella review of systematic reviews and meta-analyses</td><td>Pooled</td><td>ED is an independent predictor of cardiovascular disease; ED and CVD described as two manifestations of the same systemic disorder</td></tr>
<tr><td>Montorsi et al., 2003 (and follow-up series)</td><td>Case series of men with chest pain and confirmed coronary disease</td><td>300</td><td>Where both were present, ED preceded the coronary symptoms in the majority, by two to three years on average</td></tr>
</tbody>
</table>
<p>Two features of these numbers deserve attention. First, the relative risks are moderate rather than enormous: a 1.5-fold increase, not a 10-fold one, which means ED is a useful flag rather than a diagnosis. Second, they survive adjustment for age, blood pressure, cholesterol, diabetes and smoking, which means ED is telling the clinician something those measurements did not. One review in the literature argues that ED adds little to a good conventional risk assessment, and the debate about its incremental value is real; what is not in dispute is that a man with ED and no recent risk assessment should have one. Sources: ${ext(S.umbrella, "Mostafaei et al., BJU International, 2021, which reports the Dong 2011 figures")}; ${ext(S.vlachopoulos, "Vlachopoulos et al., 2013")}; ${ext(S.montorsiEd, "Montorsi series as discussed in an editorial")}; ${ext(S.natureRev, "Nature Reviews Urology, ED and cardiovascular health, 2026")}, checked October 28, 2026.</p>
<h3>How far ahead the warning comes</h3>
<p>The lead time is the practical point. In Montorsi's series of men with chest pain and angiographically confirmed coronary disease, those who also had ED had developed it, on average, two to three years before their cardiac symptoms. Later reviews put the window at two to five years before a cardiovascular event. That is the interval in which blood pressure can be treated, statins started, smoking stopped and diabetes controlled, and it is the reason the cardiology community now wants the question asked.</p>`,
      },
      {
        heading: "What the Princeton IV consensus recommends",
        body: `<p>The fourth Princeton Consensus Conference, convened in 2023 and published in 2024 in Mayo Clinic Proceedings and the Journal of Sexual Medicine, is the current expert position on ED and cardiovascular disease. Its recommendations, as summarised by the American College of Cardiology, are specific. A sexual-function history should be part of the initial cardiovascular evaluation of all men. ED should be treated as a risk-enhancing factor in cardiovascular risk estimation, the category the guidelines use for conditions that justify more aggressive prevention. Men with ED whose ten-year risk is low to intermediate should be considered for coronary artery calcium (CAC) scoring to refine the estimate, because a CAC score of zero reassures and a high score reclassifies a man into a group that benefits from statins and tighter blood-pressure control. And lifestyle change, diet, exercise, weight loss and smoking cessation, comes first because it improves both erections and cardiac risk. Sources: ${ext(S.princeton, "Princeton IV, Mayo Clinic Proceedings, 2024")}; ${ext(S.acc, "American College of Cardiology summary, 2024")}; ${ext(S.princetonJsm, "Journal of Sexual Medicine, 2024")}, checked October 28, 2026.</p>
<p>The consensus also settles the safety question in the other direction. Sexual activity is a modest exertion, roughly the effort of climbing two flights of stairs, and is low risk for men with stable heart disease who can manage that; PDE5 inhibitors are safe in men with stable disease who are not taking nitrates. The men who need cardiology before an ED prescription are those with unstable angina, a recent heart attack or stroke, uncontrolled blood pressure or heart failure, or symptoms on exertion. Our guide to <a href="/ed/articles/ed-pills-and-blood-pressure-medication">ED pills and blood pressure medication</a> covers the nitrate rule and the drug combinations.</p>`,
      },
      {
        heading: "Which heart tests should a man with ED ask for?",
        body: `<p>A man with new or worsening ED and no cardiovascular assessment in the past year or two should ask for one. The components are ordinary, cheap and available from a primary-care clinician; none requires a cardiologist to order.</p>
<ol>
<li><strong>Blood pressure</strong>, properly measured, on more than one occasion. Hypertension is both a cause of ED and the most treatable cardiac risk factor.</li>
<li><strong>A lipid panel</strong>: total, LDL and HDL cholesterol and triglycerides.</li>
<li><strong>Fasting glucose or HbA1c.</strong> Undiagnosed type 2 diabetes is common in men presenting with ED, and diabetes is the risk factor that damages the penile nerves and vessels fastest; see <a href="/ed/articles/ed-and-diabetes">ED and diabetes</a>.</li>
<li><strong>Weight, waist and a smoking history.</strong> The modifiable half of the picture.</li>
<li><strong>A ten-year risk estimate</strong> using the standard calculators, with ED entered as a risk-enhancing factor as Princeton IV recommends.</li>
<li><strong>Coronary artery calcium scan</strong>, a low-dose CT without contrast, for men whose estimate lands in the low-to-intermediate band. It is not for everyone, it involves a small radiation dose, and it is the test the consensus names.</li>
<li><strong>Testosterone</strong>, in the morning, where low desire, fatigue or other symptoms suggest it; low testosterone travels with obesity and metabolic disease. See <a href="/ed/articles/can-low-testosterone-cause-ed">can low testosterone cause ED</a>.</li>
</ol>
<p>A stress test, an echocardiogram or an angiogram are for men with symptoms or a high score, not for screening, and a clinician will decide. The point of the list is that the first six items can be done in one visit and one blood draw, and that a man can ask for them by name.</p>`,
      },
      {
        heading: "What this means for getting ED treated online",
        body: `<p>The online ED clinics we review are good at the prescription and, by their nature, weaker at the risk assessment, because an intake form cannot take a blood pressure. The better ones ask about chest pain, blood pressure, diabetes and medications, decline men on nitrates or with cardiac symptoms, and tell the rest to see a doctor for a check-up; the weaker ones ask the nitrate question and nothing else. Neither replaces the visit above. The sensible sequence for a man with vascular-pattern ED is a primary-care check-up for the risk factors and, in parallel, a legitimate online prescription for the symptom, because the two are not in competition and the tablet works better once blood pressure and glucose are controlled. Our <a href="/ed">ED treatment ranking</a> and the guide to <a href="/ed/articles/how-to-get-ed-treatment-online">getting ED treatment online</a> cover the providers; <a href="/ed/articles/buying-ed-medication-online-safely">buying ED medication online safely</a> covers the checks a legitimate service passes.</p>
<p>In the customers' reviews we hold for ED providers, the heart question does not appear; men write about speed, discretion, price and whether the medication worked. That silence is itself a finding: nobody reviews a clinic for the cardiac work-up it suggested, which means the man has to bring the question himself.</p>`,
      },
      {
        heading: "Who does this not apply to?",
        body: `<ul>
<li><strong>Men whose ED is clearly psychological.</strong> Sudden onset, intact morning erections and difficulty only with a partner point to anxiety or a situational cause, not to the arteries; our guide to <a href="/ed/articles/ed-in-your-20s-and-30s">ED in your 20s and 30s</a> covers that pattern. A risk check still does no harm.</li>
<li><strong>Men with ED from an obvious other cause</strong>, such as prostate surgery, a spinal injury or a new medication, where the vascular inference does not apply.</li>
<li><strong>Men already under a cardiologist with recent testing.</strong> The warning has been heard; the task is treatment of both conditions.</li>
<li><strong>Anyone reading this as a reason to avoid ED treatment.</strong> The opposite is true: ED treatment is safe for most men once the assessment is done, and untreated ED has its own costs.</li>
</ul>
<p>The evidence has limits. The cohorts are observational, so they establish association and timing rather than proving that treating ED-detected risk prevents heart attacks; the incremental value of ED over a good standard assessment is debated; and the Princeton recommendations are expert consensus, not a randomised trial of CAC-guided prevention in men with ED. None of that weakens the practical conclusion, which is that the tests are cheap and the window is years.</p>`,
      },
      {
        heading: "Final verdict and next steps",
        body: `<p>Erectile dysfunction with a vascular pattern is the earliest warning most men will ever get about their arteries, and it arrives two to five years before the heart's own symptoms. The risk it signals is moderate, measurable and modifiable. A man who responds to it with a blood-pressure cuff, a blood test and, where indicated, a calcium scan has turned a symptom into the most useful piece of preventive information he will receive in his forties or fifties.</p>
<ol>
<li><strong>If your ED came on gradually and you have not had a check-up in a year:</strong> book one, and ask for the six first-line items above by name.</li>
<li><strong>If you have diabetes, high blood pressure or smoke:</strong> ED is the signal that the known risk factor is already doing damage; treat it as the priority.</li>
<li><strong>Treat the ED too.</strong> Once the assessment is done, a licensed online provider can prescribe safely; our <a href="/ed/ed-cost-index">ED treatment cost index</a> prices every route and the <a href="/ed">ranking</a> compares who prescribes.</li>
<li><strong>Change the things that change both:</strong> walking, weight, alcohol, cigarettes. The Princeton IV panel put them first for a reason.</li>
</ol>
<h3>References and further reading</h3>
<ul>
<li>${ext(S.umbrella, "Mostafaei H et al. Association of erectile dysfunction and cardiovascular disease: an umbrella review. BJU International, 2021")} (reports the Dong et al., JACC 2011 pooled estimates).</li>
<li>${ext(S.vlachopoulos, "Vlachopoulos CV et al. Prediction of cardiovascular events and all-cause mortality with erectile dysfunction: a meta-analysis. Circulation: Cardiovascular Quality and Outcomes, 2013")}.</li>
<li>${ext(S.montorsiEd, "Editorial: erectile dysfunction, a marker of silent coronary artery disease (Montorsi series)")}.</li>
<li>${ext(S.princeton, "Kloner RA et al. The Princeton IV Consensus Recommendations for the Management of Erectile Dysfunction and Cardiovascular Disease. Mayo Clinic Proceedings, 2024")}; ${ext(S.princetonJsm, "Princeton IV: PDE5 inhibitors and cardiac health, Journal of Sexual Medicine, 2024")}; ${ext(S.acc, "ACC summary, 2024")}.</li>
<li>${ext(S.natureRev, "Erectile dysfunction and cardiovascular health. Nature Reviews Urology, 2026")}.</li>
<li>${ext(S.mayoVital, "Mayo Clinic: Erectile dysfunction, a vital sign for cardiovascular health")}.</li>
<li>${ext(S.niddkCauses, "NIDDK: erectile dysfunction, symptoms and causes")}; ${ext(S.viagraLabel, "Viagra prescribing information, Pfizer")}.</li>
</ul>
<p><em>This article is general information, not medical advice. Chest pain, breathlessness or dizziness during exertion or sex is a cardiac symptom first; seek medical care. Treatment decisions belong to a licensed clinician with your history and results.</em></p>`,
      },
    ],
  },
];
