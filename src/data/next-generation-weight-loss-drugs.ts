import type { Article } from "./articles";

// ───── Next-generation weight-loss drugs (Oct 31, 2026) ─────
// Pipeline guide to the obesity drugs after semaglutide and tirzepatide:
// retatrutide, CagriSema, amycretin, MariTide, survodutide, the amylin
// analogues (petrelintide, eloralintide), the new oral GLP-1s, higher-dose
// semaglutide, bimagrumab and ecnoglutide. Sourcing rules: every trial figure
// links the journal paper, the company release or a dated news report, and
// says which. Company-reported toplines, conference data and filing dates are
// labelled as company statements. Where an estimand matters (everyone
// randomised vs people who stayed on drug) the guide says which number it is.
// Foundayo and Wegovy pill facts follow our existing foundayo-vs-wegovy-pill
// guide. Provider prices are copied from the verified price index with their
// conditions; no price is given for any unapproved drug because no company has
// published one. No dose, protocol or sourcing route for an unapproved drug is
// described anywhere.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  // Overviews and news
  time: "https://time.com/article/2026/10/01/next-generation-of-weight-loss-drugs-is-almost-here/",
  qz: "https://qz.com/next-weight-loss-drugs-2026",
  sciam: "https://www.scientificamerican.com/article/new-glp-1-weight-loss-drugs-are-coming-and-theyre-stronger-than-wegovy-zepbound/",
  // Retatrutide
  lillyTriumph1: "https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-delivered-powerful-weight-loss",
  smcTriumph1: "https://www.sciencemediacentre.org/expert-reaction-to-announcement-not-published-study-of-topline-results-from-the-triumph-1-phase-3-clinical-trial-of-retatrutide/",
  nejmTriumph1: "https://www.nejm.org/doi/abs/10.1056/NEJMoa2604169",
  bariatricpalNejm: "https://www.bariatricpal.com/news/medications/retatrutide-triumph1-nejm-abstract-weight-knee-pain/",
  lillyJune: "https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-drove-substantial-improvements",
  lillyTriumph23: "https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-successful-two-additional",
  rttReta: "https://www.rttnews.com/3670035/lilly-s-retatrutide-achieves-phase-3-success-fda-bla-filing-planned-q1-2027.aspx",
  ddwReta: "https://www.ddw-online.com/phase-iii-trials-confirm-benefits-of-lillys-triple-agonist-retatrutide-43117-202607/",
  biopharmaDiveT4: "https://www.biopharmadive.com/news/lilly-retatrutide-obesity-osteoarthritis-pain-study-results/807641/",
  biospaceT4: "https://www.biospace.com/drug-development/lillys-retatrutide-scores-triple-trial-triumph-with-26-weight-loss-but-new-safety-signal-emerges",
  // Unapproved and research-peptide products
  fdaConcerns: "https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss",
  drugsRetaPeptide: "https://www.drugs.com/medical-answers/what-retatrutide-peptide-sold-online-3580909/",
  lillyLawsuits: "https://www.hmpgloballearningnetwork.com/site/pln/news/eli-lilly-files-lawsuits-targeting-alleged-sales-unapproved-retatrutide",
  // CagriSema
  novoCagriFiling: "https://www.biospace.com/press-releases/novo-nordisk-files-for-fda-approval-of-cagrisema-the-first-once-weekly-combination-of-glp-1-and-amylin-analogues-for-weight-management",
  ctaCagri: "https://www.clinicaltrialsarena.com/news/novo-nordisks-cagrisema-bested-by-lillys-zepbound-in-head-to-head-trial/",
  accRedefine: "https://www.acc.org/latest-in-cardiology/journal-scans/2025/07/02/14/43/redefine-1-and-redefine-2",
  redefine1: "https://doi.org/10.1056/NEJMoa2502081",
  redefine2: "https://doi.org/10.1056/NEJMoa2502082",
  novoRedefine4: "https://www.novonordisk.com/news-and-media/news-and-ir-materials/news-details.html?id=916501",
  drugTopicsR4: "https://www.drugtopics.com/view/cagrisema-did-not-meet-primary-end-point-of-noninferiority-to-tirzepatide",
  novo6kFeb26: "https://www.sec.gov/Archives/edgar/data/353278/000117184326000996/f6k_022326.htm",
  // Amycretin
  accAmycretin: "https://www.acc.org/latest-in-cardiology/journal-scans/2025/07/02/14/43/oral-subcutaneous-amycretin",
  novoAmyPhase3: "https://www.biospace.com/press-releases/novo-nordisk-to-advance-subcutaneous-and-oral-amycretin-for-weight-management-into-phase-3-clinical-development",
  cnbcAmyT2d: "https://www.cnbc.com/2025/11/25/novos-next-gen-obesity-drug-shows-positive-results-heads-to-late-stage-testing.html",
  pharmaphorumAmy: "https://pharmaphorum.com/news/data-sets-phase-3-trials-novos-amycretin-diabetes",
  novo6kQ2: "https://www.sec.gov/Archives/edgar/data/0000353278/000035327826000023/caq22026.htm",
  // MariTide
  maritideNejm: "https://doi.org/10.1056/NEJMoa2504214",
  drugsMaritide: "https://www.drugs.com/medical-answers/what-maritide-how-work-3580273/",
  amgenStory: "https://www.amgen.com/stories/2026/05/the-story-of-maridebart-cafraglutide",
  maritimeSwitch: "https://clinicaltrials.gov/study/NCT07575399",
  maritime1Ext: "https://clinicaltrials.gov/study/NCT07684235",
  // Survodutide
  biSynchronize: "https://www.boehringer-ingelheim.com/us/human-health/metabolic-diseases/positive-data-two-phase-iii-synchronize-obesity-trials",
  accSynchronize: "https://www.acc.org/latest-in-cardiology/journal-scans/2026/06/15/17/15/synchronize-1",
  fierceSurvo: "https://www.fiercebiotech.com/biotech/ada-boehringer-points-survodutides-targeted-weight-loss-tolerability-questions-linger",
  biMasld: "https://www.drugs.com/clinical_trials/boehringer-ingelheim-s-survodutide-phase-iii-trial-showed-targeted-34-visceral-63-liver-fat-22487.html",
  // Amylin analogues
  rochePetre: "https://www.roche.com/media/releases/med-cor-2026-03-05",
  zealandLancet: "https://finance.yahoo.com/healthcare/articles/zealand-pharma-present-additional-data-220300860.html",
  petrePhase3: "https://www.biopharminternational.com/view/zealand-pharma-and-roche-advance-petrelintide-to-phase-3-for-chronic-weight-management",
  ctaPetre: "https://www.clinicaltrialsarena.com/news/roche-zealand-pharma-petrelintide-phase-ii-obesity-results/",
  lillyElora: "https://lilly.gcs-web.com/news-releases/news-release-details/lillys-selective-amylin-agonist-eloralintide-demonstrated",
  eloraPhase3: "https://clinicaltrials.gov/study/NCT07321886",
  lillyEloraTzp: "https://investor.lilly.com/news-releases/news-release-details/lillys-eloratzp-combination-eloralintide-and-tirzepatide",
  // Semaglutide: higher dose and pill
  novoWegovyHD: "https://www.novonordisk-us.com/media/press-releases/fda-approves-wegovy-hd-7-2mg-injection.html",
  healioWegovyHD: "https://www.healio.com/news/endocrinology/20260319/fda-approves-highdose-wegovy-72-mg-for-adults-with-obesity",
  beckersPill: "https://www.beckershospitalreview.com/pharmacy/fda-approves-wegovy-pill-as-1st-oral-glp-1-for-weight-loss",
  oasis4: "https://pubmed.ncbi.nlm.nih.gov/40934115/",
  accOasis4: "https://www.acc.org/latest-in-cardiology/journal-scans/2025/09/24/16/40/oasis-4",
  // Oral small molecules
  structureAccess: "https://www.globenewswire.com/news-release/2025/12/08/3201469/0/en/Structure-Therapeutics-Reports-Positive-Topline-Data-from-ACCESS-Program-for-its-Once-Daily-Oral-Small-Molecule-GLP-1-Receptor-Agonist-Aleniglipron.html",
  structureQ2: "https://www.sec.gov/Archives/edgar/data/0001888886/000110465926092017/tm2622407d1_ex99-1.htm",
  // Muscle
  believeNatMed: "https://www.nature.com/articles/s41591-026-04204-0",
  ctaBima: "https://www.clinicaltrialsarena.com/news/eli-lilly-terminates-zepbound-bimagrumab-phase-iib-trial/",
  // Outside the US
  ecnoNmpa: "https://www.pharmaceutical-technology.com/news/sciwind-chinas-nmpa-approval-ecnoglutide/",
};

export const nextGenWeightLossDrugsArticle: Article = {
  slug: "next-generation-weight-loss-drugs",
  title: "Next-Generation Weight Loss Drugs (2026): What's Coming",
  description:
    "Retatrutide, CagriSema, amycretin, MariTide, survodutide and the amylin drugs: trial results, phases, company timelines and what they mean for you.",
  category: "Science",
  readTime: "51 min read",
  publishedAt: "2026-10-31",
  updatedAt: "2026-10-31",
  heroColor: "#F1EEF8",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "Two candidates are closest to US pharmacies. Novo Nordisk filed CagriSema with the FDA on December 18, 2025 and expects a decision in the fourth quarter of 2026; Lilly says it will file retatrutide in the first quarter of 2027. Both dates are company statements, not approvals.",
    "Retatrutide has the largest published phase 3 result: 25.0% average weight loss at 80 weeks on the top dose in TRIUMPH-1, counting everyone randomised, against 3.9% on placebo (NEJM, September 2026). Lilly's own on-treatment figure is 28.3%.",
    "Amylin is the next mechanism. CagriSema, amycretin, petrelintide and eloralintide all add or use amylin signalling, but in the one head-to-head trial so far (REDEFINE 4) CagriSema produced less weight loss than tirzepatide 15 mg, 20.2% versus 23.6%.",
    "None of the pipeline drugs can be legally compounded, and the FDA has warned sellers of \"research use\" retatrutide. If you need treatment now, the approved drugs work now; a prescriber can move you to a new one later if it is approved and suits you.",
  ],
  sections: [
    {
      heading: "What are the next-generation weight-loss drugs, and when will they arrive?",
      body: `<div class="qa"><strong>The short answer</strong>The next wave is led by retatrutide (Lilly, a triple GLP-1, GIP and glucagon agonist, 25.0% weight loss at 80 weeks in its main phase 3 trial) and CagriSema (Novo Nordisk, semaglutide plus the amylin analogue cagrilintide, 20.4% at 68 weeks). CagriSema is under FDA review with a decision the company expects in late 2026; Lilly says it will file retatrutide in early 2027. Amycretin, MariTide, survodutide and the amylin drugs are a step or more behind. None is approved in the US, and none can be legally compounded.</div>
<p>The weight-loss drugs most people know, semaglutide (Wegovy, Ozempic) and tirzepatide (Zepbound, Mounjaro), are no longer the newest thing on the shelf. Since December 2025 the FDA has approved a semaglutide pill, a small-molecule GLP-1 pill and a higher-dose semaglutide injection. Behind them sits a pipeline that is larger and further along than at any point before, and the October 2026 coverage reflects that: ${ext(S.time, "Time's October 1, 2026 report")} was titled "The Next Generation of Weight-Loss Drugs Is Almost Here", and ${ext(S.qz, "Quartz, updating its tracker on October 28, 2026")}, named CagriSema, retatrutide and the oral drug aleniglipron as the three to watch, with only one of them filed with regulators.</p>
<p>This guide sets out each candidate we could source: what it does in the body, its best published or reported trial result and which kind of result that is, its trial phase, what the company has said about filing or launch, what it has shown on side effects, and what it might mean for someone already on semaglutide or tirzepatide. Where a company has announced a result that has not been peer-reviewed, we say so and give the date. Where two figures circulate for the same trial, we say why and which one is the like-for-like comparison.</p>
<h3>Pipeline at a glance</h3>
<table>
<thead><tr><th>Drug</th><th>Company</th><th>Mechanism</th><th>Phase (Oct 2026)</th><th>Headline weight-loss result (trial)</th><th>Expected timing (company statement unless noted)</th></tr></thead>
<tbody>
<tr><td>Retatrutide</td><td>Eli Lilly</td><td>GLP-1 + GIP + glucagon agonist, weekly injection</td><td>Phase 3 complete for the core trials</td><td>25.0% vs 3.9% placebo at 80 weeks, top dose, everyone randomised (TRIUMPH-1, NEJM 2026); 28.3% on treatment (Lilly)</td><td>US filing planned Q1 2027</td></tr>
<tr><td>CagriSema</td><td>Novo Nordisk</td><td>Semaglutide + cagrilintide (amylin analogue), weekly injection</td><td>Filed with FDA December 18, 2025</td><td>20.4% vs 3.0% at 68 weeks (REDEFINE 1, NEJM 2025)</td><td>FDA decision expected Q4 2026</td></tr>
<tr><td>Amycretin</td><td>Novo Nordisk</td><td>Single molecule acting on GLP-1 and amylin receptors; weekly injection and daily pill</td><td>Phase 3 in obesity (began 2026, as reported)</td><td>24.3% at 36 weeks, top injected dose, small early trial (phase 1b/2a, Lancet 2025)</td><td>No filing date stated</td></tr>
<tr><td>MariTide (maridebart cafraglutide)</td><td>Amgen</td><td>GLP-1 agonist + GIP receptor blocker, monthly or less often injection</td><td>Phase 3 (MARITIME), ongoing</td><td>Up to 16.2% vs 2.5% at 52 weeks, everyone randomised (phase 2, NEJM 2025)</td><td>No filing date stated</td></tr>
<tr><td>Survodutide</td><td>Boehringer Ingelheim</td><td>Glucagon + GLP-1 agonist, weekly injection</td><td>Phase 3 reported (SYNCHRONIZE)</td><td>12.2% to 13.0% vs 5.4% at 76 weeks, everyone randomised; up to 16.6% on treatment (SYNCHRONIZE-1, NEJM 2026)</td><td>No filing date found</td></tr>
<tr><td>Eloralintide</td><td>Eli Lilly</td><td>Amylin receptor agonist, weekly injection</td><td>Phase 3 (registered 2026)</td><td>Up to 20.1% vs 0.4% at 48 weeks, on treatment (phase 2, Lancet 2025)</td><td>Combination with tirzepatide to enter phase 3 by end 2026</td></tr>
<tr><td>Petrelintide</td><td>Zealand Pharma / Roche</td><td>Amylin analogue, weekly injection</td><td>Moving to phase 3</td><td>Up to 10.7% vs 1.7% at 42 weeks (ZUPREME-1 topline, Roche, March 2026)</td><td>Phase 3 start announced for 2026</td></tr>
<tr><td>Aleniglipron</td><td>Structure Therapeutics</td><td>Small-molecule GLP-1 agonist, daily pill</td><td>Phase 3 (ACCOMPLISH), first patients dosed</td><td>11.3% placebo-adjusted at 36 weeks (ACCESS, company topline, December 2025)</td><td>No filing date stated</td></tr>
<tr><td>Bimagrumab (+ semaglutide)</td><td>Eli Lilly</td><td>Activin type II receptor antibody, aims to spare muscle</td><td>Phase 2</td><td>22.1% vs 15.7% semaglutide alone at 72 weeks (BELIEVE, Nature Medicine 2026)</td><td>None stated</td></tr>
<tr><td>Ecnoglutide</td><td>Sciwind Biosciences</td><td>GLP-1 agonist, weekly injection</td><td>Approved in China, March 2026; not in US trials we could find</td><td>15.4% at 48 weeks, top dose (SLIMMER, as reported)</td><td>China only</td></tr>
</tbody>
</table>
<p>The results in that table are not a league table. They come from different trials of different lengths, in different populations, analysed in different ways. A 36-week result in 125 people is not comparable with an 80-week result in 2,339. The sections below give each figure its context, and the section on what the numbers mean explains the two kinds of average that every company now reports.</p>`,
    },
    {
      heading: "What is already approved, and what is still in trials?",
      body: `<p>Three things changed for US patients between December 2025 and April 2026, and they matter because they are available now, not in two years. They also show what "next generation" looks like in practice: the first new options were not new mechanisms but new forms and doses of the existing ones.</p>
<h3>Approved in the US</h3>
<ul>
<li><strong>The Wegovy pill (oral semaglutide 25 mg, Novo Nordisk).</strong> Approved for chronic weight management in a release dated December 22, 2025, as the first oral GLP-1 cleared for that use, per ${ext(S.beckersPill, "Becker's Hospital Review")}. In its phase 3 trial, OASIS 4, weight fell by 13.6% at 64 weeks against 2.2% on placebo among 307 adults without diabetes (${ext(S.oasis4, "NEJM, 2025, via PubMed")}).</li>
<li><strong>Foundayo (orforglipron, Eli Lilly).</strong> A small-molecule GLP-1 pill that can be taken without food or water rules. ${ext(S.qz, "Quartz")} records its FDA approval earlier in 2026; our <a href="/weight-loss/articles/foundayo-vs-wegovy-pill">Foundayo vs Wegovy pill guide</a> covers the April 1, 2026 approval, its 11.2% result at the top dose over 72 weeks in ATTAIN-1, and the prices Lilly publishes.</li>
<li><strong>Wegovy HD (semaglutide 7.2 mg weekly).</strong> Approved on March 19, 2026 for adults with obesity who have been on the 2.4 mg dose for at least four weeks, per ${ext(S.novoWegovyHD, "Novo Nordisk's release")} and ${ext(S.healioWegovyHD, "Healio")}. It is a higher rung on the existing ladder, not a new drug.</li>
</ul>
<h3>Filed and under review</h3>
<p>Only one new mechanism is at that stage in the US: CagriSema. ${ext(S.novoCagriFiling, "Novo Nordisk announced its FDA submission on December 18, 2025")}, and coverage since, including ${ext(S.ctaCagri, "Clinical Trials Arena")}, puts the expected decision in late 2026. As of October 31, 2026, we found no report of a decision.</p>
<h3>In phase 3 or about to be</h3>
<p>Retatrutide has finished its four core phase 3 trials and Lilly plans to file in early 2027. Amycretin, MariTide, eloralintide and aleniglipron are in phase 3. Survodutide has reported its first phase 3 obesity trials. Petrelintide is moving from phase 2 into phase 3. Bimagrumab is in phase 2. Each is covered below.</p>
<h3>What the phases mean for you</h3>
<table>
<thead><tr><th>Stage</th><th>What it means</th><th>Can a doctor prescribe it?</th><th>Can a pharmacy legally compound it?</th></tr></thead>
<tbody>
<tr><td>Phase 1 / phase 2</td><td>Small and mid-sized trials testing safety and dose; results can change a lot later</td><td>No, only within a trial</td><td>No</td></tr>
<tr><td>Phase 3</td><td>Large trials, usually thousands of people, designed to support approval</td><td>No, only within a trial</td><td>No</td></tr>
<tr><td>Filed (under FDA review)</td><td>The company has asked for approval; the FDA can approve, ask for more data, or refuse</td><td>No</td><td>No</td></tr>
<tr><td>Approved</td><td>The FDA has approved a label: who it is for, at which doses, with which warnings</td><td>Yes, on prescription</td><td>Only in narrow circumstances that apply to approved drugs</td></tr>
<tr><td>Approved abroad only</td><td>Approved by another regulator, such as China's</td><td>Not as a US prescription</td><td>No</td></tr>
</tbody>
</table>
<p>The practical rule: until a drug reaches the bottom of that table in the US, the only legitimate way to take it is inside a registered clinical trial. A positive phase 3 result is good news about the future and changes nothing about what is available this month. A filing date is a company's plan, not a promise, and the retatrutide filing has already moved once, as the next sections show.</p>`,
    },
    {
      heading: "How should you read the weight-loss numbers in new drug headlines?",
      body: `<p>With three questions in mind: which kind of average is it, how long was the trial, and who was in it. Almost every confusing claim about the new drugs comes from mixing figures that answer different questions. This section explains the vocabulary once, so the rest of the guide can be read quickly.</p>
<h3>Two averages from the same trial</h3>
<p>Modern obesity trials report two main results, which regulators call estimands.</p>
<ul>
<li><strong>Everyone randomised</strong> (called treatment-policy or treatment-regimen). Every person who was assigned to the drug is counted, including people who stopped taking it, missed doses or started another treatment. This is the closer guide to what happens when a group of real people is prescribed the drug. Journals usually lead with it.</li>
<li><strong>On treatment</strong> (called the efficacy or trial-product estimand). This estimates the result if everyone had kept taking the drug as directed. It describes what the drug can do in people who stay on it. Companies usually lead with it, because it is larger.</li>
</ul>
<p>Neither number is dishonest. They answer different questions. The problem is only when one drug's on-treatment number is set against another drug's everyone-randomised number, which flatters the first. Retatrutide shows the gap clearly: ${ext(S.lillyTriumph1, "Lilly's May 2026 release")} led with 28.3% on 12 mg, and the ${ext(S.nejmTriumph1, "NEJM paper")} led with 25.0%. Same trial, same dose, same 80 weeks. In REDEFINE 4, ${ext(S.drugTopicsR4, "as reported")}, tirzepatide's figures were 23.6% and 25.5%, and CagriSema's 20.2% and 23.0%.</p>
<h3>Placebo-adjusted figures</h3>
<p>Some companies report weight loss with the placebo group's result already subtracted. ${ext(S.structureAccess, "Structure Therapeutics' aleniglipron topline")} is an example: 11.3% placebo-adjusted. If the placebo group lost 2% to 3%, as is typical in these trials, the raw figure would be a few points higher. A placebo-adjusted number cannot be compared directly with a raw one.</p>
<h3>Length and population</h3>
<p>Weight loss on these drugs keeps falling for a year or more before it levels off, so a 36-week result is not comparable with an 80-week one. The MariTide researchers wrote that weight had not plateaued at 52 weeks (${ext(S.maritideNejm, "NEJM, 2025")}). Population matters as much: people with type 2 diabetes lose less on every drug in the class, which is why retatrutide produced 25.0% in TRIUMPH-1 and up to 20.8% in TRIUMPH-2, and CagriSema 20.4% in REDEFINE 1 but 13.7% in REDEFINE 2. Small early trials, like amycretin's 125-person study, also tend to recruit healthier volunteers at lower BMIs than phase 3.</p>
<h3>Like-for-like: everyone-randomised results we could source</h3>
<p>The table below lines up the everyone-randomised figures, so the comparisons are as fair as separate trials allow. It is still a cross-trial comparison, and the only true head-to-head in it is REDEFINE 4.</p>
<table>
<thead><tr><th>Drug and dose</th><th>Trial</th><th>Length</th><th>Weight change, everyone randomised</th><th>Placebo</th><th>Status</th></tr></thead>
<tbody>
<tr><td>Retatrutide 12 mg</td><td>TRIUMPH-1</td><td>80 weeks</td><td>25.0%</td><td>3.9%</td><td>Phase 3; filing planned Q1 2027</td></tr>
<tr><td>Tirzepatide 15 mg</td><td>REDEFINE 4 (comparator arm)</td><td>84 weeks</td><td>23.6%</td><td>No placebo arm</td><td>Approved</td></tr>
<tr><td>CagriSema 2.4/2.4 mg</td><td>REDEFINE 1</td><td>68 weeks</td><td>20.4%</td><td>3.0%</td><td>Under FDA review</td></tr>
<tr><td>CagriSema 2.4/2.4 mg</td><td>REDEFINE 4</td><td>84 weeks</td><td>20.2%</td><td>No placebo arm</td><td>Under FDA review</td></tr>
<tr><td>Semaglutide 7.2 mg (Wegovy HD)</td><td>STEP UP</td><td>72 weeks</td><td>18.7%</td><td>3.9%</td><td>Approved</td></tr>
<tr><td>MariTide, best regimen</td><td>Phase 2, obesity cohort</td><td>52 weeks</td><td>16.2%</td><td>2.5%</td><td>Phase 3</td></tr>
<tr><td>Semaglutide 2.4 mg (Wegovy)</td><td>STEP UP (comparator arm)</td><td>72 weeks</td><td>15.6%</td><td>3.9%</td><td>Approved</td></tr>
<tr><td>Oral semaglutide 25 mg (Wegovy pill)</td><td>OASIS 4</td><td>64 weeks</td><td>13.6%</td><td>2.2%</td><td>Approved</td></tr>
<tr><td>Survodutide 6.0 mg</td><td>SYNCHRONIZE-1</td><td>76 weeks</td><td>13.0%</td><td>5.4%</td><td>Phase 3 reported</td></tr>
<tr><td>Orforglipron 36 mg (Foundayo)</td><td>ATTAIN-1</td><td>72 weeks</td><td>11.2%</td><td>2.1%</td><td>Approved</td></tr>
<tr><td>Petrelintide, top dose</td><td>ZUPREME-1, phase 2</td><td>42 weeks</td><td>10.2%</td><td>1.4%</td><td>Moving to phase 3</td></tr>
</tbody>
</table>
<p>Sources are in each drug's section; the Wegovy HD, Wegovy 2.4 mg and Foundayo rows follow our <a href="/weight-loss/articles/glp1-microdosing-complete-guide">dosing evidence guide</a> and <a href="/weight-loss/articles/foundayo-vs-wegovy-pill">Foundayo guide</a>. Eloralintide and amycretin are left out because we have only on-treatment or early-phase figures for them.</p>
<h3>A worked example in pounds</h3>
<p>Averages in percent are easy to over-read, so here is the arithmetic for one person starting at 250 pounds, using the everyone-randomised figures. Retatrutide's 25.0% would be about 62 pounds; tirzepatide's 23.6% in REDEFINE 4 about 59; CagriSema's 20.4% in REDEFINE 1 about 51; Wegovy HD's 18.7% about 47; the Wegovy pill's 13.6% about 34. The gap between the strongest approved drug and the strongest pipeline drug, on these numbers, is a few pounds on average, not dozens. The gap between any of them and the placebo arms, which lost 2% to 4%, is far larger. Individual results spread widely around every one of these averages, and some people on each drug lose little.</p>
<h3>A checklist for any new-drug headline</h3>
<ol>
<li>Is the figure everyone randomised or on treatment?</li>
<li>Is it raw or placebo-adjusted?</li>
<li>How many weeks, and was weight still falling?</li>
<li>Did the trial include people with diabetes?</li>
<li>Is it a press release, a conference presentation or a peer-reviewed paper?</li>
<li>How many people stopped because of side effects?</li>
<li>Was there a head-to-head against tirzepatide or semaglutide, or only placebo?</li>
</ol>
<p>A headline that cannot answer most of those is a headline, not evidence.</p>`,
    },
    {
      heading: "How much weight loss did retatrutide show in the TRIUMPH trials?",
      body: `<p>More than any obesity drug has shown in a phase 3 trial so far. Retatrutide is a once-weekly injection that Lilly describes as a triple hormone receptor agonist: it acts on the GLP-1 receptor (like semaglutide), the GIP receptor (like tirzepatide) and the glucagon receptor. Our <a href="/weight-loss/retatrutide-weight-loss">retatrutide explainer</a> covers the 2023 phase 2 trial, in which the top dose produced about 24% weight loss over 48 weeks. The TRIUMPH phase 3 programme has now reported four trials.</p>
<h3>TRIUMPH-1: obesity without diabetes</h3>
<p>The main trial randomised 2,339 adults with obesity or overweight to retatrutide 4 mg, 9 mg or 12 mg, or placebo, for 80 weeks. ${ext(S.lillyTriumph1, "Lilly's topline release of May 21, 2026")} reported average weight loss of 19.0%, 25.9% and 28.3% on the three doses, and said 45.3% of people on 12 mg lost 30% or more of their body weight. Those are the company's figures from its efficacy estimand, which describes people who stayed on the drug. Experts quoted by the ${ext(S.smcTriumph1, "Science Media Centre")} at the time stressed that this was an announcement, not a published study.</p>
<p>The full paper followed in the New England Journal of Medicine on September 29, 2026. Its ${ext(S.nejmTriumph1, "abstract")} reports the treatment-regimen result, which counts everyone randomised whether or not they kept taking the drug: 25.0% average weight loss at 80 weeks on the 12 mg dose against 3.9% on placebo. That is the number to compare with other drugs' intention-to-treat results. The paper also reported less knee pain in the participants with knee osteoarthritis and fewer breathing interruptions in those with obstructive sleep apnoea; ${ext(S.bariatricpalNejm, "coverage of the abstract")} put those subgroups at 574 and 243 people. Lilly's ${ext(S.lillyJune, "June 6, 2026 release")} gave further detail on the knee, sleep apnoea and blood-sugar results.</p>
<h3>TRIUMPH-4: obesity with knee osteoarthritis</h3>
<p>This was the first phase 3 readout, in December 2025. ${ext(S.biopharmaDiveT4, "BioPharma Dive reported")} average weight loss of 28.7% at 68 weeks on the highest dose, about 71 pounds, against 2.1% on placebo, alongside large reductions in knee pain. It was also where a new side effect drew attention: ${ext(S.biospaceT4, "BioSpace reported")} dysesthesia, an altered or unpleasant skin sensation, in 8.8% of people on 9 mg and 20.9% on 12 mg against 0.7% on placebo.</p>
<h3>TRIUMPH-2 and TRIUMPH-3: diabetes and heart disease</h3>
<p>${ext(S.lillyTriumph23, "Lilly announced both on July 23, 2026")}. In TRIUMPH-2, adults with obesity or overweight and type 2 diabetes lost up to 20.8% of body weight at 80 weeks on 12 mg, as reported by ${ext(S.ddwReta, "Drug Discovery World")}. In TRIUMPH-3, adults with severe obesity and established cardiovascular disease averaged 22.6% weight loss at 80 weeks on 12 mg. As with every obesity drug, weight loss was smaller in people with diabetes than without.</p>
<table>
<thead><tr><th>Trial</th><th>Population</th><th>Length</th><th>Top-dose result</th><th>Type of figure</th><th>Status</th></tr></thead>
<tbody>
<tr><td>TRIUMPH-1</td><td>Obesity or overweight, no diabetes (2,339)</td><td>80 weeks</td><td>25.0% vs 3.9% placebo</td><td>Everyone randomised</td><td>Published, NEJM, Sept 2026</td></tr>
<tr><td>TRIUMPH-1</td><td>Same</td><td>80 weeks</td><td>28.3% vs 2.2% placebo</td><td>On treatment</td><td>Company release, May 2026</td></tr>
<tr><td>TRIUMPH-4</td><td>Obesity with knee osteoarthritis</td><td>68 weeks</td><td>28.7% vs 2.1% placebo</td><td>As reported</td><td>Company topline, Dec 2025</td></tr>
<tr><td>TRIUMPH-2</td><td>Obesity with type 2 diabetes</td><td>80 weeks</td><td>Up to 20.8%</td><td>As reported</td><td>Company topline, July 2026</td></tr>
<tr><td>TRIUMPH-3</td><td>Severe obesity with cardiovascular disease</td><td>80 weeks</td><td>22.6%</td><td>As reported</td><td>Company topline, July 2026</td></tr>
</tbody>
</table>
<h3>How it compares with tirzepatide</h3>
<p>Not directly, yet. No published trial has put retatrutide against tirzepatide. The nearest benchmark is a recent head-to-head in which tirzepatide 15 mg was the comparator: in ${ext(S.novoRedefine4, "REDEFINE 4")}, tirzepatide produced 23.6% weight loss at 84 weeks counting everyone randomised. Retatrutide's 25.0% at 80 weeks in a different trial, with a different population, is close enough to that figure that the honest summary is "probably more, by an amount nobody has measured". Our <a href="/weight-loss/articles/tirzepatide-vs-semaglutide">tirzepatide vs semaglutide guide</a> sets out the approved drugs' own trial numbers.</p>
<h3>Side effects</h3>
<p>Lilly's ${ext(S.lillyTriumph1, "TRIUMPH-1 release")} gave the rate of people who stopped because of adverse events: 4.1% on 4 mg, 6.9% on 9 mg and 11.3% on 12 mg, against 4.9% on placebo. The NEJM paper reported gastrointestinal events as more frequent on retatrutide, the familiar pattern for the class. The dysesthesia signal from TRIUMPH-4 is the one genuinely new item, and it is dose-related. We did not find a published figure for how many people stopped treatment because of it.</p>
<h3>What it might mean for people on semaglutide or tirzepatide</h3>
<p>If retatrutide is approved on these results, the people most likely to be offered it first are those for whom the approved drugs have run out of road: people on tirzepatide 15 mg who have plateaued well short of their goal, and people with severe obesity where the gap between a 20% and a 25% average loss is clinically meaningful. Lilly's planned filing also covers knee osteoarthritis pain and obstructive sleep apnoea, which could matter for coverage if insurers treat those conditions differently from weight alone. For someone doing well on semaglutide or tirzepatide, the trial results are not a reason to switch. A larger average comes with a higher rate of stopping at the top dose and a new side effect, and the right comparison is not retatrutide against nothing but retatrutide against the drug you already tolerate. That comparison will be clearer once the label, and ideally a head-to-head result, exist.</p>
<h3>When could retatrutide be approved?</h3>
<p>Not before 2027, on Lilly's own timeline. On July 23, 2026, alongside the TRIUMPH-2 and TRIUMPH-3 results, Lilly said it plans to submit a Biologics License Application to the FDA in the first quarter of 2027, for obesity, knee osteoarthritis pain and obstructive sleep apnoea, as reported by ${ext(S.rttReta, "RTTNews")} and ${ext(S.ddwReta, "Drug Discovery World")}. Lilly had previously aimed for 2026; it said the extra time was to complete the chemistry, manufacturing and controls package that a biologic application requires, not because of the clinical results.</p>
<h3>What happens after filing</h3>
<p>After a filing, the FDA reviews the application, inspects manufacturing and decides. Standard reviews usually take most of a year. In 2026 the agency approved two obesity products much faster under its national priority voucher programme: our <a href="/weight-loss/articles/foundayo-vs-wegovy-pill">Foundayo guide</a> records Foundayo's approval 50 days after filing, and ${ext(S.novoWegovyHD, "Novo Nordisk")} said Wegovy HD went through the same programme. Whether retatrutide receives a voucher is not something Lilly has announced in the sources we found. Our own reading, not a company statement: a first-quarter 2027 filing points to a decision somewhere between mid-2027, if a voucher applies, and 2028, on a standard review.</p>
<h3>What could change the timing</h3>
<ul>
<li><strong>Manufacturing.</strong> The delay already announced was about the manufacturing data package. That is the part of the application outside the trials.</li>
<li><strong>Safety review.</strong> The FDA will look closely at dysesthesia, heart rate and anything else that differs from the GLP-1 class, and can ask for more data.</li>
<li><strong>The cardiovascular question.</strong> TRIUMPH-3 enrolled people with heart disease and reported weight loss; Lilly said it will present the cardiovascular data at future meetings. The label at launch will reflect whatever the FDA accepts from it.</li>
</ul>
<p>Until approval, retatrutide is investigational. Lilly is not selling it, no US doctor can prescribe it outside a trial, and no pharmacy can legally compound it. The next section covers what is being sold online under its name.</p>`,
    },
    {
      heading: "Is \"research peptide\" retatrutide sold online safe or legal?",
      body: `<p>No to both, on the FDA's stated position. Retatrutide is widely sold online as a "research peptide", often as a powder in a vial with a label saying "for research use only" or "not for human consumption". These products are not Lilly's drug, have not been approved, and have not been tested for what is actually in the vial.</p>
<h3>What the FDA says</h3>
<p>The FDA's page on ${ext(S.fdaConcerns, "unapproved GLP-1 drugs used for weight loss")} states that retatrutide and cagrilintide (the amylin half of CagriSema) cannot be used in compounding under federal law, because they are not components of an FDA-approved drug and have not been found safe and effective for any condition. The same page says the agency has warned companies selling semaglutide, tirzepatide or retatrutide falsely labelled "for research purposes" or "not for human consumption", has warned telehealth firms marketing retatrutide, and has issued warning letters to distributors of the active ingredient. The "research use" label does not make a product legal to sell for people to inject.</p>
<p>${ext(S.drugsRetaPeptide, "Drugs.com's explainer")} summarises the consumer position plainly: products sold as "retatrutide", "retatrutide peptide" or "reta" are not FDA-approved, are not legal to sell for human use, and are not tested for safety, purity or correct dose. Lilly has also gone to court: ${ext(S.lillyLawsuits, "HMP Global Learning Network reported")} that the company has filed lawsuits over alleged sales of unapproved retatrutide.</p>
<h3>Why this matters more than the legal point</h3>
<ul>
<li><strong>You do not know what is in the vial.</strong> The trial results describe Lilly's manufactured product at known doses. A grey-market powder may contain a different amount, a different peptide, impurities, or nothing.</li>
<li><strong>The dose in the trials was escalated under supervision.</strong> The phase 3 participants were stepped up over weeks with monitoring. A reconstituted powder has no label, no titration and no clinician watching for the side effects that made some trial participants stop.</li>
<li><strong>The new side effect is not well understood yet.</strong> Dysesthesia was dose-related in the trials. Nobody is tracking it in people injecting unlabelled product.</li>
<li><strong>There is no recourse.</strong> If something goes wrong, there is no pharmacist, no prescriber and no manufacturer accountable for the product.</li>
</ul>
<p>The same applies to anything sold online as cagrilintide, CagriSema, amycretin, survodutide or any other pipeline name. If a website offers a drug that is in phase 3, it is not offering the drug from the phase 3 trial. We do not describe sources, doses or reconstitution for any of these products and never will. Our <a href="/weight-loss/articles/compounded-semaglutide-vs-brand-name">compounded vs brand-name guide</a> explains how legitimate compounding of approved drugs differs.</p>`,
    },
    {
      heading: "What did CagriSema show, and when will the FDA decide?",
      body: `<p>CagriSema is a once-weekly injection that combines two drugs: semaglutide 2.4 mg, the active ingredient of Wegovy, and cagrilintide 2.4 mg, a long-acting analogue of the hormone amylin. ${ext(S.novoCagriFiling, "Novo Nordisk's filing release")} describes it as the first once-weekly combination of GLP-1 and amylin analogues for weight management. It is the closest new mechanism to US approval.</p>
<h3>REDEFINE 1: obesity without diabetes</h3>
<p>The main trial, published in the New England Journal of Medicine in June 2025 (${ext(S.redefine1, "Garvey et al., NEJM, 2025")}), randomised 3,417 adults with obesity or overweight to CagriSema, semaglutide alone, cagrilintide alone or placebo for 68 weeks. Counting everyone randomised, weight fell by 20.4% on CagriSema against 3.0% on placebo, as summarised by the ${ext(S.accRedefine, "American College of Cardiology's journal scan")}. The figure often quoted in the press, about 23%, as in ${ext(S.sciam, "Scientific American's coverage")}, is the on-treatment figure for people who kept taking it. The trial also showed that each component alone did less than the two together, which is the point of a combination.</p>
<h3>REDEFINE 2: obesity with type 2 diabetes</h3>
<p>In 1,206 adults with type 2 diabetes (${ext(S.redefine2, "Davies et al., NEJM, 2025")}), weight fell by 13.7% at 68 weeks against 3.4% on placebo, per the ${ext(S.accRedefine, "ACC summary")}. Gastrointestinal side effects were reported in about 80% of people on CagriSema against about 40% on placebo.</p>
<h3>REDEFINE 4: the head-to-head with tirzepatide</h3>
<p>This is the result that changed how CagriSema is discussed. ${ext(S.novoRedefine4, "Novo Nordisk announced on February 23, 2026")} that the open-label trial in 809 adults had not met its primary endpoint: CagriSema did not show non-inferiority to tirzepatide 15 mg on weight loss at 84 weeks. Counting everyone randomised, weight fell by 20.2% on CagriSema and 23.6% on tirzepatide; on treatment, 23.0% and 25.5%, as reported by ${ext(S.drugTopicsR4, "Drug Topics")}. In other words, the newest combination from Novo produced less weight loss than the best drug already on the market.</p>
<h3>Filing and what comes next</h3>
<p>The ${ext(S.novoCagriFiling, "December 18, 2025 filing")} covers CagriSema 2.4 mg/2.4 mg for chronic weight management in adults with obesity, or overweight with at least one weight-related condition. Novo's guidance, as reported by ${ext(S.ctaCagri, "Clinical Trials Arena")}, points to a decision in late 2026. Novo's ${ext(S.novo6kFeb26, "February 2026 company announcement filed with the SEC")} also describes a phase 3 trial, REDEFINE 11, exploring the full weight-loss potential of the 2.4/2.4 mg dose, with data expected in the first half of 2027, and a higher-dose phase 3 trial planned to start in the second half of 2026. Those are company plans.</p>
<h3>What Time added</h3>
<p>${ext(S.time, "Time's October 2026 report")} used CagriSema as the lead example of the amylin approach, and reported that in people with type 2 diabetes the drug reduced harmful fat in the liver and pancreas, an early sign of benefits beyond the scale. It also reported a figure every reader of this guide should hold onto: roughly 40% of people who start these drugs stop within a year, mostly because of gastrointestinal side effects. A drug that is easier to stay on can beat a stronger drug that people stop.</p>
<h3>What it might mean for people on semaglutide</h3>
<p>CagriSema contains the same semaglutide dose as Wegovy, with cagrilintide added. If it is approved, the obvious candidates are people on Wegovy who have plateaued at 2.4 mg and want more effect from a product built on the drug they already tolerate. They will also have Wegovy HD, which is already approved, and tirzepatide, which beat CagriSema in REDEFINE 4. Which of those three a prescriber picks will depend on the label, coverage and how the person handled semaglutide.</p>
<p>For people on tirzepatide, CagriSema is harder to argue for on the evidence so far. REDEFINE 4 tested exactly that comparison, against tirzepatide's top dose, and CagriSema came out behind on both estimands. Someone doing well on tirzepatide has no trial-based reason to move to it. The more relevant amylin development for that group is Lilly's EloraTZP, which adds amylin to tirzepatide rather than replacing it, covered below. If the FDA approves CagriSema in late 2026, our <a href="/weight-loss/articles/zepbound-vs-wegovy">Zepbound vs Wegovy guide</a> and this page will be updated with its label, its doses and what the companies say about price.</p>`,
    },
    {
      heading: "Why is amylin the next mechanism?",
      body: `<p>Because it works on appetite through a different hormone system, which opens two possibilities: more weight loss when combined with a GLP-1, and possibly a gentler experience when used alone. Amylin is a hormone released by the pancreas alongside insulin after meals. It signals fullness and slows how fast the stomach empties. Drug versions of it last much longer than the natural hormone, and the pipeline now contains four distinct ways of using it.</p>
<ul>
<li><strong>Combination of two drugs:</strong> CagriSema, cagrilintide plus semaglutide in one weekly injection.</li>
<li><strong>One molecule that does both:</strong> amycretin, a single molecule designed to act on the GLP-1 and amylin receptors.</li>
<li><strong>Amylin alone:</strong> petrelintide (Zealand and Roche) and eloralintide (Lilly), tested as stand-alone weight-loss drugs.</li>
<li><strong>Amylin added to tirzepatide:</strong> Lilly's EloraTZP, eloralintide combined with tirzepatide.</li>
</ul>
<h3>The case for amylin</h3>
<p>The argument made by the companies, and reflected in ${ext(S.time, "Time's coverage")}, is that the next big gain may not come from more weight loss but from weight loss that is easier to tolerate and keep. If the stand-alone amylin drugs can produce meaningful weight loss with less nausea than GLP-1s, they could suit the many people who stop GLP-1 treatment because of side effects. Roche described petrelintide's tolerability as comparable to placebo in its ${ext(S.rochePetre, "March 2026 phase 2 release")}. The other argument is additive: in REDEFINE 1 the combination beat both of its components on their own.</p>
<h3>The case for caution</h3>
<p>Amylin drugs have not yet proved they beat the best existing drug. CagriSema lost to tirzepatide in its head-to-head trial. Petrelintide's phase 2 result, up to about 10.7%, divided analysts, as ${ext(S.ctaPetre, "Clinical Trials Arena reported")}: one argued the modest size could limit real-world use, while another said the data supported a well-tolerated base for combinations. And amylin combinations still cause gastrointestinal effects; in REDEFINE 2, about 80% of people on CagriSema reported them.</p>
<h3>Mechanism comparison</h3>
<table>
<thead><tr><th>Mechanism</th><th>Approved examples</th><th>Pipeline examples</th><th>What it adds, as the developers describe it</th><th>Main open question</th></tr></thead>
<tbody>
<tr><td>GLP-1 receptor agonist</td><td>Semaglutide (Wegovy, Wegovy HD, Wegovy pill); orforglipron (Foundayo)</td><td>Aleniglipron (pill); ecnoglutide (approved in China)</td><td>Appetite reduction, slower stomach emptying, blood-sugar control</td><td>Better pills and doses, not a new effect</td></tr>
<tr><td>GLP-1 + GIP agonist</td><td>Tirzepatide (Zepbound, Mounjaro)</td><td>Combinations with amylin (EloraTZP) and bimagrumab</td><td>Larger average loss than GLP-1 alone in trials</td><td>Whether add-ons beat tirzepatide 15 mg alone</td></tr>
<tr><td>GLP-1 + GIP + glucagon agonist</td><td>None</td><td>Retatrutide</td><td>Glucagon arm thought to raise energy use and reduce liver fat</td><td>Long-term safety, dysesthesia, heart rate</td></tr>
<tr><td>GLP-1 + glucagon agonist</td><td>None</td><td>Survodutide</td><td>Targeted reductions in liver and visceral fat</td><td>High discontinuation in phase 3</td></tr>
<tr><td>GLP-1 agonist + GIP receptor blocker</td><td>None</td><td>MariTide</td><td>Monthly or less frequent dosing</td><td>Tolerability at the start of treatment; phase 3 results</td></tr>
<tr><td>GLP-1 + amylin (two drugs or one molecule)</td><td>None in the US</td><td>CagriSema; amycretin</td><td>Two satiety systems at once</td><td>CagriSema did not match tirzepatide head to head</td></tr>
<tr><td>Amylin alone</td><td>None for obesity</td><td>Petrelintide; eloralintide</td><td>Possibly gentler on the gut</td><td>Whether the weight loss is large enough alone</td></tr>
<tr><td>Muscle-sparing (activin receptor blockade) added to GLP-1</td><td>None</td><td>Bimagrumab + semaglutide or tirzepatide</td><td>More of the weight lost as fat</td><td>Phase 2 only; given by infusion in trials</td></tr>
</tbody>
</table>`,
    },
    {
      heading: "Amycretin: Novo's single-molecule amylin and GLP-1 drug",
      body: `<p>Amycretin is Novo Nordisk's attempt to put both signals into one molecule rather than two drugs in one pen. It is being developed as a weekly injection and as a daily pill, which makes it one of the few pipeline drugs aiming for both forms.</p>
<h3>The early result that drew attention</h3>
<p>In a phase 1b/2a trial published in The Lancet in June 2025, 125 adults with a BMI of 25 to 34.9 were randomised to injected amycretin or placebo at a single site in San Antonio. The estimated mean weight loss was 24.3% at 36 weeks on the 60 mg dose and 22.0% on 20 mg, against about 1% on placebo, as summarised by the ${ext(S.accAmycretin, "American College of Cardiology")}. The most common side effects were mild to moderate gastrointestinal events that rose with dose.</p>
<p>That number is often set next to retatrutide's, and it should not be. The trial was small, short, run at one site, in people with lower BMIs than the phase 3 obesity trials, and designed mainly to test safety and dose. Early-phase results in obesity have tended to shrink when tested in larger, longer, more varied populations. It is a reason to run phase 3, not a forecast of the phase 3 result.</p>
<h3>Diabetes results</h3>
<p>In people with type 2 diabetes, Novo reported in November 2025 that injected amycretin produced up to 14.5% weight loss over 36 weeks against 2.6% on placebo, per ${ext(S.cnbcAmyT2d, "CNBC")}, and ${ext(S.pharmaphorumAmy, "Pharmaphorum")} reported up to 10.1% with the oral form. Novo said it would take both forms into phase 3 in diabetes.</p>
<h3>Phase 3 status and timing</h3>
<p>${ext(S.novoAmyPhase3, "Novo announced on June 12, 2025")} that it would advance both injected and oral amycretin into phase 3 for weight management, starting in the first quarter of 2026, after end-of-phase 2 discussions with regulators. Novo's ${ext(S.novo6kQ2, "2026 quarterly filings")} describe 84-week phase 3 obesity trials named AMAZE 1 and AMAZE 2 of a once-weekly injection under the name zenagamtide; trade coverage identifies that as amycretin's new name, which we could not confirm from a Novo statement, so treat the naming as reported. No filing date has been stated. An 84-week trial that began in 2026 cannot read out before 2027 at the earliest, so a US approval before 2028 would require a timeline no company has announced.</p>
<h3>What it might mean for you</h3>
<p>Nothing for treatment decisions in 2026 or 2027. If you are on semaglutide now, the more relevant Novo products in the next year are Wegovy HD and, if approved, CagriSema.</p>`,
    },
    {
      heading: "Petrelintide and eloralintide: can amylin work on its own?",
      body: `<p>Two companies are testing whether amylin alone can be a weight-loss drug, without a GLP-1 attached. If it can, it would give people who cannot tolerate GLP-1s an option, and give prescribers a building block for combinations.</p>
<h3>Petrelintide (Zealand Pharma and Roche)</h3>
<p>${ext(S.rochePetre, "Roche announced the phase 2 ZUPREME-1 results on March 5, 2026")}: in 493 adults with overweight or obesity, petrelintide produced up to 10.7% mean weight loss at 42 weeks against 1.7% on placebo. Roche described tolerability as comparable to placebo, and withdrawal from the trial for any reason was 8.4% across the petrelintide arms against 13.6% on placebo. ${ext(S.zealandLancet, "Zealand later announced publication in The Lancet Diabetes &amp; Endocrinology")}, where the treatment-policy figure was up to 10.2% against 1.4%. The two companies have said they will move it into phase 3, per ${ext(S.petrePhase3, "BioPharm International")}; reports differ on the exact start date.</p>
<p>The honest summary is that petrelintide's weight loss is about what older GLP-1 doses produced, with the gut side effects looking milder in phase 2. Whether that trade appeals depends on the person. ${ext(S.ctaPetre, "Analysts were split")} on whether the market wants it.</p>
<h3>Eloralintide (Eli Lilly)</h3>
<p>Lilly's amylin agonist had the stronger stand-alone phase 2. ${ext(S.lillyElora, "Lilly's November 6, 2025 release")}, issued as the trial was presented at ObesityWeek and published in The Lancet, reported up to 20.1% mean weight loss at 48 weeks on the 9 mg dose against 0.4% on placebo in 263 adults, using the efficacy estimand. The main side effects were mild to moderate gastrointestinal symptoms and fatigue, greater at higher doses. Lilly has registered phase 3 trials, including ${ext(S.eloraPhase3, "a study in obesity without type 2 diabetes")}.</p>
<h3>EloraTZP: amylin added to tirzepatide</h3>
<p>The combination result is newer. ${ext(S.lillyEloraTzp, "Lilly's September 30, 2026 release")} reported a 48-week phase 2b trial in 367 adults with obesity or overweight and type 2 diabetes. The top combination, eloralintide 9 mg plus tirzepatide 15 mg, produced up to 23.3% weight loss against 14.8% on tirzepatide 15 mg alone and 3.0% on placebo, with a larger fall in A1C. The cost was tolerability: discontinuation ranged from 10.8% to 27.0% across the combination arms, against 2.9% on tirzepatide alone. Lilly says it plans to start phase 3 of the combination by the end of 2026. These are company-reported results from a conference presentation, not a peer-reviewed paper.</p>
<p>That 23.3% in people with diabetes is notable, because weight loss in diabetes trials normally runs well below non-diabetes trials. It is the first evidence that adding amylin to tirzepatide does what CagriSema did for semaglutide. It is also a phase 2 trial with high dropout in some arms.</p>
<table>
<thead><tr><th>Amylin-based drug</th><th>Trial and phase</th><th>Length</th><th>Top result vs placebo</th><th>Tolerability signal</th></tr></thead>
<tbody>
<tr><td>Petrelintide</td><td>ZUPREME-1, phase 2</td><td>42 weeks</td><td>10.7% vs 1.7% (topline); 10.2% vs 1.4% (published, treatment policy)</td><td>Withdrawal 8.4% vs 13.6% placebo</td></tr>
<tr><td>Eloralintide</td><td>Phase 2</td><td>48 weeks</td><td>20.1% vs 0.4% (efficacy estimand)</td><td>GI symptoms and fatigue, dose-related</td></tr>
<tr><td>EloraTZP</td><td>Phase 2b, type 2 diabetes</td><td>48 weeks</td><td>23.3% vs 3.0%; tirzepatide alone 14.8%</td><td>Discontinuation 10.8% to 27.0% vs 2.9% on tirzepatide</td></tr>
<tr><td>CagriSema</td><td>REDEFINE 1, phase 3</td><td>68 weeks</td><td>20.4% vs 3.0%</td><td>GI events about 80% vs 40% (REDEFINE 2)</td></tr>
<tr><td>Amycretin (injected)</td><td>Phase 1b/2a</td><td>36 weeks</td><td>24.3% vs about 1%</td><td>Mild to moderate GI, dose-related</td></tr>
</tbody>
</table>`,
    },
    {
      heading: "Could MariTide replace weekly injections with a monthly shot?",
      body: `<p>That is Amgen's aim. Maridebart cafraglutide, branded in development as MariTide, combines an antibody with GLP-1-activating peptides. As ${ext(S.drugsMaritide, "Drugs.com's explainer")} sets out, it activates the GLP-1 receptor and blocks the GIP receptor, the opposite of what tirzepatide does at GIP. That both approaches produce weight loss is one of the open scientific puzzles of the field. The practical point is the dosing interval: MariTide was tested once a month or less often, rather than weekly.</p>
<h3>The phase 2 result</h3>
<p>The phase 2 trial, published in the New England Journal of Medicine in 2025 (${ext(S.maritideNejm, "Jastreboff et al., NEJM, 2025")}), randomised 592 adults across an obesity cohort and an obesity-with-diabetes cohort. In the obesity cohort, counting everyone randomised, mean weight loss at 52 weeks ranged from 12.3% to 16.2% across dose regimens against 2.5% on placebo; the on-treatment figure reached about 19.9%. In the diabetes cohort, weight loss ranged from 8.4% to 12.3% against 1.7%. The researchers wrote that weight had not plateaued at 52 weeks, so longer trials are needed to see the full effect.</p>
<h3>Phase 3</h3>
<p>Amgen's MARITIME phase 3 programme is under way. ${ext(S.amgenStory, "Amgen's own account of the drug")} was published in May 2026. The registry lists, among others, ${ext(S.maritimeSwitch, "MARITIME-SWITCH")}, which enrols adults moving from a weekly GLP-1 to MariTide, and long-term extensions such as the ${ext(S.maritime1Ext, "MARITIME-1 extension")}, with estimated primary completion in late 2027. We found no Amgen statement of a filing date.</p>
<h3>What it might mean for people on semaglutide or tirzepatide</h3>
<p>MariTide is the pipeline drug most explicitly designed for people already on treatment: the existence of a switch trial says so. If it reaches the market, its pitch will be fewer injections rather than more weight loss, and the phase 2 numbers put it in the range of the approved weekly drugs rather than above them. For anyone who dislikes weekly injections, the realistic options before MariTide could be approved are the two approved pills, compared in our <a href="/weight-loss/glp1-pills-vs-injections">pills vs injections guide</a>.</p>`,
    },
    {
      heading: "Survodutide and the glucagon drugs: what does the liver data add?",
      body: `<p>Survodutide, from Boehringer Ingelheim, is a weekly injection that acts on the glucagon and GLP-1 receptors. Glucagon is the hormone that normally raises blood sugar between meals; activating its receptor in this way is intended to increase energy use and pull fat out of the liver. Retatrutide also has a glucagon arm. Survodutide is the first glucagon-GLP-1 drug to report phase 3 obesity results.</p>
<h3>SYNCHRONIZE-1</h3>
<p>${ext(S.biSynchronize, "Boehringer announced positive data from two phase 3 SYNCHRONIZE obesity trials")} in 2026, and the full SYNCHRONIZE-1 results were presented at the American Diabetes Association meeting in June 2026 and published in the New England Journal of Medicine. Per the ${ext(S.accSynchronize, "American College of Cardiology's journal scan")}, counting everyone randomised, mean weight change at 76 weeks was 12.2% on 3.6 mg and 13.0% on 6.0 mg against 5.4% on placebo. The company's on-treatment figure was up to 16.6% against 3.2%.</p>
<h3>Liver and visceral fat</h3>
<p>Boehringer's emphasis is where the fat comes from. In ${ext(S.biMasld, "a pre-specified substudy reported by the company")}, survodutide reduced visceral fat by up to 34% and liver fat by up to 63.1%; the SYNCHRONIZE-MASLD results were published in Nature Medicine. That fits the liver indication Boehringer is also pursuing, in people with metabolic dysfunction-associated fatty liver disease.</p>
<h3>The tolerability problem</h3>
<p>The weakness is how many people stopped. ${ext(S.fierceSurvo, "Fierce Biotech's reading of the NEJM paper")} put discontinuation due to adverse events at nearly 24% on 3.6 mg and nearly 25% on 6 mg, against about 5.4% on placebo, with discontinuations concentrated during dose escalation. Boehringer described the safety profile as broadly consistent with the GLP-1 class. For comparison, retatrutide's top dose had 11.3% stopping for adverse events in TRIUMPH-1, and the Wegovy pill about 7% in OASIS 4.</p>
<h3>What it might mean for you</h3>
<p>On weight alone, survodutide's phase 3 result sits below tirzepatide and around semaglutide. Its case rests on the liver. For someone with fatty liver disease, it may become relevant if Boehringer files and the FDA approves; we found no stated filing date. For most people choosing a weight-loss drug, it does not change the decision.</p>`,
    },
    {
      heading: "What changed with Wegovy HD and the new pills?",
      body: `<p>The most immediate "next generation" for patients is not a new mechanism. It is more choice within the two mechanisms already approved, and three of those choices arrived in five months.</p>
<h3>Wegovy HD: semaglutide 7.2 mg</h3>
<p>${ext(S.novoWegovyHD, "Novo Nordisk announced FDA approval on March 19, 2026")}. Wegovy HD is a weekly 7.2 mg semaglutide injection for adults with obesity who have taken the 2.4 mg dose for at least four weeks and need more weight reduction, per ${ext(S.healioWegovyHD, "Healio")}. It was approved on the STEP UP trial, in which the company reports 20.7% average weight loss at 72 weeks among people who stayed on 7.2 mg. Counting everyone randomised, the published figures were 18.7% on 7.2 mg, 15.6% on 2.4 mg and 3.9% on placebo, as set out in our <a href="/weight-loss/articles/glp1-microdosing-complete-guide">GLP-1 dosing evidence guide</a>. Side effects were mostly gastrointestinal and rose at the higher dose, and the FDA noted more skin sensation problems, the same dysesthesia signal seen with retatrutide, which generally resolved on their own or with a lower dose (${ext(S.healioWegovyHD, "Healio")}).</p>
<p>What it means: for someone on Wegovy 2.4 mg who tolerates it and has stalled, there is now an approved step up within the same drug. It is a prescriber's decision, under the label, and it is available now.</p>
<h3>The Wegovy pill: oral semaglutide 25 mg</h3>
<p>Approved in December 2025 (${ext(S.beckersPill, "Becker's")}), the Wegovy pill produced 13.6% weight loss at 64 weeks against 2.2% on placebo in OASIS 4, with 30% of people losing at least 20% of body weight (${ext(S.accOasis4, "ACC journal scan")}). Gastrointestinal adverse events occurred in 74.0% against 42.2% on placebo (${ext(S.oasis4, "NEJM via PubMed")}). It must be taken on an empty stomach with a sip of water and a 30-minute wait before eating.</p>
<h3>Foundayo: orforglipron</h3>
<p>Foundayo is Lilly's small-molecule GLP-1 pill, approved on April 1, 2026, which can be taken at any time with or without food. Our <a href="/weight-loss/articles/foundayo-vs-wegovy-pill">Foundayo vs Wegovy pill guide</a> covers its 11.2% top-dose result in ATTAIN-1, the ATTAIN-MAINTAIN switch data, and the self-pay and insurance prices. It matters for this guide for one reason: it is the template the pipeline pills are chasing.</p>
<h3>Aleniglipron and the next oral drugs</h3>
<p>Structure Therapeutics' aleniglipron is a once-daily small-molecule GLP-1 pill, the same kind of drug as Foundayo. ${ext(S.structureAccess, "The company's December 8, 2025 topline")} reported a placebo-adjusted mean weight loss of 11.3% at 36 weeks on 120 mg in the ACCESS phase 2b trial, and up to 15.3% placebo-adjusted on 240 mg in the exploratory ACCESS II study. Discontinuation due to adverse events ranged from 7.7% to 13.3% across doses. In its ${ext(S.structureQ2, "second-quarter 2026 results")}, Structure said it had dosed the first patients in the ACCOMPLISH phase 3 programme. No filing date has been stated. "Placebo-adjusted" means the placebo group's loss has already been subtracted, so these figures are not directly comparable with Foundayo's or the Wegovy pill's unadjusted ones.</p>
<table>
<thead><tr><th>Option</th><th>Status</th><th>Form</th><th>Trial result</th><th>Who it is for</th></tr></thead>
<tbody>
<tr><td>Wegovy HD (7.2 mg)</td><td>FDA-approved, March 2026</td><td>Weekly injection</td><td>18.7% (everyone randomised), 20.7% (on treatment), 72 weeks</td><td>People on 2.4 mg for at least 4 weeks who need more</td></tr>
<tr><td>Wegovy pill (25 mg)</td><td>FDA-approved, December 2025</td><td>Daily pill, empty stomach</td><td>13.6% at 64 weeks</td><td>People who prefer a pill and can keep the routine</td></tr>
<tr><td>Foundayo (orforglipron)</td><td>FDA-approved, April 2026</td><td>Daily pill, no food rules</td><td>11.2% at 72 weeks (top dose)</td><td>People who want a pill without timing rules</td></tr>
<tr><td>Aleniglipron</td><td>Phase 3</td><td>Daily pill</td><td>11.3% placebo-adjusted at 36 weeks</td><td>Not available</td></tr>
<tr><td>Oral amycretin</td><td>Phase 3 planned</td><td>Daily pill</td><td>Up to 10.1% in type 2 diabetes (as reported)</td><td>Not available</td></tr>
</tbody>
</table>
<h3>Ecnoglutide: approved outside the US</h3>
<p>Not every new weight-loss drug is following a US path first. Ecnoglutide, from Sciwind Biosciences, is a weekly GLP-1 injection that ${ext(S.ecnoNmpa, "China's drug regulator approved for chronic weight management in March 2026")}. Sciwind describes it as the first approved cAMP-biased GLP-1 receptor agonist for weight management, meaning it is designed to favour one of the receptor's internal signalling routes. The approval rests on the SLIMMER phase 3 trial in Chinese adults, published in The Lancet Diabetes &amp; Endocrinology in 2025, in which participants on the highest dose lost a mean 15.4% at 48 weeks, as reported. Pfizer holds commercial rights in mainland China under a February 2026 deal.</p>
<p>For US readers, the practical point is short. Ecnoglutide is not approved by the FDA, we found no US trial programme for it, and it cannot be legally prescribed or compounded here. Its result in Chinese adults sits in the range of semaglutide. It is in this guide because it appears in search results as a "new weight-loss drug", and because it shows how many GLP-1 drugs are now being developed worldwide: the mechanism is no longer one or two companies' property.</p>`,
    },
    {
      heading: "Will bimagrumab and other muscle-sparing drugs protect lean mass?",
      body: `<p>They are the most interesting answer to the most common objection to GLP-1 treatment, and they are the furthest from pharmacies. Our <a href="/weight-loss/articles/glp1-muscle-loss-how-to-protect-lean-mass">GLP-1 muscle loss guide</a> covers what the semaglutide and tirzepatide body-composition substudies showed and what protects muscle today. The short version: lean mass made up roughly a quarter to two-fifths of the weight lost in those substudies, and protein plus resistance training are the tools that work now.</p>
<h3>What BELIEVE showed</h3>
<p>Bimagrumab is an antibody that blocks the activin type II receptors, signals that tell muscle to shrink. In the BELIEVE phase 2 trial, now published in ${ext(S.believeNatMed, "Nature Medicine")}, adults with obesity received semaglutide, bimagrumab or both for 72 weeks. The high-dose combination produced 22.1% weight loss (24.2 kg) against 15.7% on semaglutide 2.4 mg alone and 10.8% on bimagrumab alone. As our muscle guide reports from the conference presentation, about 93% of the weight lost on the combination was fat.</p>
<h3>Why it is still years away</h3>
<ul>
<li><strong>It is phase 2.</strong> No phase 3 trial of bimagrumab for obesity was reported in the sources we found.</li>
<li><strong>It was given by intravenous infusion</strong> in BELIEVE, which is not how anyone expects to take a weight-loss drug.</li>
<li><strong>The tirzepatide programme has narrowed.</strong> ${ext(S.ctaBima, "Clinical Trials Arena reported")} that Lilly terminated a phase 2b study of tirzepatide plus bimagrumab in people with obesity and type 2 diabetes in September 2025, while a study in obesity alone continued.</li>
</ul>
<p>What it means for you: nothing for the next few years except that the industry now judges weight-loss drugs on body composition, not just the scale. Anything sold online as bimagrumab is not the trial drug. The muscle you keep in 2026 depends on what you eat and lift.</p>`,
    },
    {
      heading: "How do the side effects of the new drugs compare?",
      body: `<p>None of the pipeline drugs escapes the GLP-1 pattern. Where a drug acts on the GLP-1 receptor, the gut effects come with it: nausea, vomiting, diarrhoea and constipation, worst during dose increases, usually easing with time. The differences are in how often, how many people stop, and whether anything new appears. The table brings together the figures we could source, with their trial, so you can see which comparisons are fair.</p>
<table>
<thead><tr><th>Drug (trial)</th><th>Gastrointestinal events</th><th>Stopped due to adverse events</th><th>Other signal reported</th></tr></thead>
<tbody>
<tr><td>Retatrutide (TRIUMPH-1)</td><td>More frequent than placebo (NEJM)</td><td>4.1% / 6.9% / 11.3% on 4 / 9 / 12 mg vs 4.9% placebo (Lilly)</td><td>Dysesthesia 8.8% / 20.9% on 9 / 12 mg vs 0.7% (TRIUMPH-4, BioSpace)</td></tr>
<tr><td>CagriSema (REDEFINE 2)</td><td>About 80% vs 40% placebo (ACC summary)</td><td>Not sourced here</td><td>Did not match tirzepatide's weight loss (REDEFINE 4)</td></tr>
<tr><td>Survodutide (SYNCHRONIZE-1)</td><td>Main reason for stopping</td><td>Nearly 24% / 25% on 3.6 / 6 mg vs about 5.4% (Fierce Biotech, NEJM)</td><td>Discontinuations clustered in dose escalation</td></tr>
<tr><td>EloraTZP (phase 2b)</td><td>Most common, mostly mild or moderate</td><td>10.8% to 27.0% across arms vs 2.9% tirzepatide alone (Lilly)</td><td>Company-reported, not peer-reviewed</td></tr>
<tr><td>Petrelintide (ZUPREME-1)</td><td>Described as comparable to placebo (Roche)</td><td>Withdrawal for any reason 8.4% vs 13.6% placebo</td><td>Phase 2 only</td></tr>
<tr><td>Aleniglipron (ACCESS)</td><td>Not sourced here</td><td>7.7% to 13.3% across doses (company)</td><td>Phase 2b</td></tr>
<tr><td>Wegovy pill (OASIS 4), approved</td><td>74.0% vs 42.2% placebo</td><td>About 7%</td><td>Empty-stomach dosing rule</td></tr>
<tr><td>Wegovy HD (STEP UP), approved</td><td>Higher than at 2.4 mg</td><td>See our dosing guide</td><td>More skin sensation problems at 7.2 mg (FDA, via Healio)</td></tr>
</tbody>
</table>
<h3>How to read that table</h3>
<ul>
<li><strong>Discontinuation is the number that matters most.</strong> A side effect you tolerate is an inconvenience; one that makes you stop ends the treatment, and weight returns when treatment stops. Survodutide's phase 3 rate is the outlier.</li>
<li><strong>Dose drives side effects as much as the drug does.</strong> Retatrutide's 4 mg dose had a lower adverse-event discontinuation rate than placebo; its 12 mg dose more than double. The same is true across the class.</li>
<li><strong>Dysesthesia is new and seems tied to large effects.</strong> It appeared with retatrutide and with semaglutide 7.2 mg, in both cases more at higher doses. Nobody yet knows why.</li>
<li><strong>Time's 40% figure is the context.</strong> ${ext(S.time, "Time reported")} that roughly 40% of people who start these drugs stop within a year. Real-world stopping is higher than trial stopping, because trials provide support and select motivated volunteers.</li>
</ul>
<p>The standard warnings on the approved GLP-1 labels, covered in our <a href="/weight-loss/articles/semaglutide-side-effects-guide">semaglutide side-effects guide</a>, will almost certainly appear on any approved pipeline GLP-1 drug as well. The final labels will say what else applies.</p>`,
    },
    {
      heading: "Timeline: what happened in 2025-2026 and what is expected through 2028",
      body: `<p>Dates in the past column are what happened, with the source in the relevant section above. Dates in the future are company statements or registry estimates, labelled as such, plus our own inference where marked. Any of them can move.</p>
<table>
<thead><tr><th>Date</th><th>Event</th><th>Type</th></tr></thead>
<tbody>
<tr><td>June 2025</td><td>REDEFINE 1 and 2 (CagriSema) published in NEJM; amycretin phase 1b/2a published in The Lancet</td><td>Published</td></tr>
<tr><td>June 12, 2025</td><td>Novo says amycretin (injected and oral) will enter phase 3 for weight management</td><td>Company statement</td></tr>
<tr><td>2025</td><td>MariTide phase 2 published in NEJM; ecnoglutide SLIMMER published in The Lancet Diabetes &amp; Endocrinology</td><td>Published</td></tr>
<tr><td>September 2025</td><td>OASIS 4 (Wegovy pill) published in NEJM; Lilly ends one tirzepatide-bimagrumab trial in type 2 diabetes</td><td>Published / reported</td></tr>
<tr><td>November 6, 2025</td><td>Eloralintide phase 2 presented and published (up to 20.1%)</td><td>Published</td></tr>
<tr><td>December 8, 2025</td><td>Aleniglipron ACCESS phase 2b topline</td><td>Company topline</td></tr>
<tr><td>December 2025</td><td>TRIUMPH-4 (retatrutide) topline, 28.7% at 68 weeks</td><td>Company topline</td></tr>
<tr><td>December 18, 2025</td><td>CagriSema filed with the FDA</td><td>Company statement</td></tr>
<tr><td>December 22, 2025</td><td>Wegovy pill approved by the FDA</td><td>Approval</td></tr>
<tr><td>February 23, 2026</td><td>REDEFINE 4: CagriSema does not match tirzepatide 15 mg</td><td>Company topline</td></tr>
<tr><td>March 5, 2026</td><td>Petrelintide ZUPREME-1 phase 2 topline</td><td>Company topline</td></tr>
<tr><td>March 2026</td><td>Ecnoglutide approved in China</td><td>Approval (China)</td></tr>
<tr><td>March 19, 2026</td><td>Wegovy HD (semaglutide 7.2 mg) approved by the FDA</td><td>Approval</td></tr>
<tr><td>April 1, 2026</td><td>Foundayo (orforglipron) approved by the FDA</td><td>Approval</td></tr>
<tr><td>May 21, 2026</td><td>TRIUMPH-1 topline: 28.3% on treatment at 80 weeks</td><td>Company topline</td></tr>
<tr><td>June 2026</td><td>SYNCHRONIZE-1 (survodutide) presented at ADA and published in NEJM</td><td>Published</td></tr>
<tr><td>July 23, 2026</td><td>TRIUMPH-2 and TRIUMPH-3 toplines; Lilly moves retatrutide filing to Q1 2027</td><td>Company statement</td></tr>
<tr><td>Mid-2026</td><td>Aleniglipron ACCOMPLISH phase 3 first patients dosed</td><td>Company statement</td></tr>
<tr><td>September 29, 2026</td><td>TRIUMPH-1 published in NEJM: 25.0% vs 3.9%, everyone randomised</td><td>Published</td></tr>
<tr><td>September 30, 2026</td><td>EloraTZP phase 2b: up to 23.3% in type 2 diabetes</td><td>Company release</td></tr>
<tr><td>Q4 2026</td><td>FDA decision on CagriSema expected</td><td>Company guidance, as reported</td></tr>
<tr><td>By end of 2026</td><td>EloraTZP phase 3 to start; higher-dose CagriSema phase 3 to start (H2 2026)</td><td>Company plans</td></tr>
<tr><td>Q1 2027</td><td>Retatrutide BLA submission to the FDA</td><td>Company plan</td></tr>
<tr><td>H1 2027</td><td>REDEFINE 11 (CagriSema) data</td><td>Company plan</td></tr>
<tr><td>Late 2027</td><td>MARITIME-1 extension primary completion (MariTide)</td><td>Registry estimate</td></tr>
<tr><td>Mid-2027 to 2028</td><td>Possible retatrutide decision, depending on review pathway</td><td>Our inference, not a company statement</td></tr>
<tr><td>2028 or later</td><td>Earliest realistic window for amycretin, MariTide, eloralintide and aleniglipron filings to be decided, given trials started in 2026</td><td>Our inference</td></tr>
</tbody>
</table>
<p>One pattern stands out. Every approval in the last year was a new form or dose of semaglutide or a new GLP-1 pill. The genuinely new mechanisms, triple agonism and amylin, begin reaching the market only if CagriSema is approved in late 2026 and retatrutide in 2027 or 2028.</p>
<h3>Which names refer to which drug?</h3>
<p>The pipeline comes with a crowd of code names, nicknames and new brand names, and online sellers exploit the confusion. This glossary matches the names you will see to the drug and its status as of October 31, 2026.</p>
<table>
<thead><tr><th>Name you may see</th><th>What it is</th><th>Company</th><th>US status</th></tr></thead>
<tbody>
<tr><td>Retatrutide, "reta", triple agonist</td><td>GLP-1, GIP and glucagon receptor agonist, weekly injection</td><td>Eli Lilly</td><td>Investigational; filing planned Q1 2027</td></tr>
<tr><td>CagriSema</td><td>Cagrilintide 2.4 mg plus semaglutide 2.4 mg, weekly injection</td><td>Novo Nordisk</td><td>Under FDA review</td></tr>
<tr><td>Cagrilintide</td><td>Long-acting amylin analogue; the "cagri" in CagriSema</td><td>Novo Nordisk</td><td>Investigational; cannot be compounded (FDA)</td></tr>
<tr><td>Amycretin; zenagamtide (as reported)</td><td>One molecule acting on GLP-1 and amylin receptors; injection and pill</td><td>Novo Nordisk</td><td>Investigational, phase 3</td></tr>
<tr><td>MariTide, maridebart cafraglutide</td><td>Antibody-peptide drug: GLP-1 agonist, GIP receptor blocker; monthly or less often</td><td>Amgen</td><td>Investigational, phase 3</td></tr>
<tr><td>Survodutide</td><td>Glucagon and GLP-1 receptor agonist, weekly injection</td><td>Boehringer Ingelheim</td><td>Investigational, phase 3 reported</td></tr>
<tr><td>Petrelintide</td><td>Amylin analogue, weekly injection</td><td>Zealand Pharma and Roche</td><td>Investigational, moving to phase 3</td></tr>
<tr><td>Eloralintide</td><td>Amylin receptor agonist, weekly injection</td><td>Eli Lilly</td><td>Investigational, phase 3</td></tr>
<tr><td>EloraTZP</td><td>Eloralintide combined with tirzepatide</td><td>Eli Lilly</td><td>Investigational, phase 2b complete; phase 3 planned</td></tr>
<tr><td>Aleniglipron</td><td>Small-molecule GLP-1 agonist, daily pill</td><td>Structure Therapeutics</td><td>Investigational, phase 3</td></tr>
<tr><td>Bimagrumab</td><td>Activin type II receptor antibody, infusion in trials</td><td>Eli Lilly</td><td>Investigational, phase 2</td></tr>
<tr><td>Ecnoglutide</td><td>GLP-1 agonist, weekly injection</td><td>Sciwind Biosciences</td><td>Not approved in the US; approved in China</td></tr>
<tr><td>Foundayo, orforglipron</td><td>Small-molecule GLP-1 agonist, daily pill</td><td>Eli Lilly</td><td>FDA-approved, April 2026</td></tr>
<tr><td>Wegovy pill, oral semaglutide 25 mg</td><td>Semaglutide tablet</td><td>Novo Nordisk</td><td>FDA-approved, December 2025</td></tr>
<tr><td>Wegovy HD</td><td>Semaglutide 7.2 mg weekly injection</td><td>Novo Nordisk</td><td>FDA-approved, March 2026</td></tr>
</tbody>
</table>
<p>Two rules follow. A drug name followed by "peptide", "research" or "RUO" on a shopping site is not the company's product. And a name in the first twelve rows of this table cannot be lawfully prescribed, sold or compounded for weight loss in the US today, whatever the website says.</p>`,
    },
    {
      heading: "Can you get a pipeline drug now through a trial or a compounding pharmacy?",
      body: `<p>Only through a trial. There is no legal compounded version of any drug in this guide that is not approved, and no telehealth provider can legitimately prescribe one.</p>
<h3>Compounding</h3>
<p>Compounding pharmacies prepare medicines from active ingredients under specific legal conditions, and the compounded semaglutide and tirzepatide sold by telehealth providers are made from the ingredients of approved drugs. The FDA has stated that ${ext(S.fdaConcerns, "retatrutide and cagrilintide cannot be used in compounding under federal law")}, because they are not components of an approved drug. The same logic applies to every unapproved molecule here: amycretin, MariTide, survodutide, petrelintide, eloralintide, aleniglipron, bimagrumab. If you see "compounded retatrutide" or "compounded CagriSema" offered, it is not a lawful compounded product. Our <a href="/weight-loss/articles/compounded-semaglutide-vs-brand-name">compounded vs brand-name guide</a> explains what questions to ask about compounded semaglutide, which is a different matter.</p>
<h3>Clinical trials</h3>
<p>The legitimate route to an unapproved drug is a registered trial. Several of the drugs above have trials registered on ClinicalTrials.gov, including the ${ext(S.maritimeSwitch, "MARITIME-SWITCH trial")}, which specifically enrols people moving from a weekly GLP-1, and Lilly's ${ext(S.eloraPhase3, "eloralintide phase 3 trials")}. Trials have strict eligibility rules, many include a placebo arm so you may not receive the drug, and some exclude people currently on a GLP-1. If you are interested, the registry lists sites and contacts; your clinician can help judge whether a trial suits you.</p>
<h3>Approved drugs abroad</h3>
<p>Ecnoglutide is approved in China. That does not make it legal to import for personal use as a weight-loss treatment, and the same goes for any foreign-approved product sold online to US buyers.</p>
<h3>The "research peptide" market</h3>
<p>As covered above, the FDA has warned sellers of retatrutide and other GLP-1 products labelled "for research purposes". The label is a legal fiction, the content is unverified, and nobody is accountable for what is in the vial.</p>`,
    },
    {
      heading: "What will the new weight-loss drugs cost?",
      body: `<p>Nobody knows, and no company has published a US price for any pipeline drug in the sources we found. ${ext(S.sciam, "Scientific American's coverage of the coming drugs")} notes that prices for the current drugs remain high and insurance coverage can be limited or denied, which is the realistic starting assumption for the next ones too. Anything you read giving a "retatrutide price" or "CagriSema cost" for a legitimate US product is a guess, or a grey-market vial price, which is not the same thing.</p>
<h3>What the approved options cost now</h3>
<p>The figures below are copied from our verified price index and existing guides, with their conditions. They are the comparison any new drug will face.</p>
<table>
<thead><tr><th>Option</th><th>Price</th><th>Condition</th></tr></thead>
<tbody>
<tr><td>Zepbound (tirzepatide), brand shelf at our partner providers</td><td>$1,249-$1,599/mo</td><td>altRx $1,249 · welludr $1,599</td></tr>
<tr><td>Wegovy (semaglutide), brand shelf at our partner providers</td><td>$1,579-$1,799/mo</td><td>altRx $1,579 · Sprout $1,799</td></tr>
<tr><td>Foundayo, LillyDirect self-pay</td><td>$149 to $349 a month by dose</td><td>As reported; $25 with commercial coverage and the Lilly savings card</td></tr>
<tr><td>Wegovy pill via Ro</td><td>$149 first month, then $299, plus membership</td><td>Membership $39 first month, then $74-$149</td></tr>
<tr><td>Compounded semaglutide, lowest listed</td><td>From $41/month</td><td>welludr, 12-month plan, pre-Black Friday sale (partner notice, Oct 28, 2026); previously $49</td></tr>
<tr><td>Compounded tirzepatide, lowest listed</td><td>From $71/month</td><td>welludr, shipped every 4 weeks, pre-Black Friday sale (partner notice, Oct 28, 2026); previously $89</td></tr>
</tbody>
</table>
<p>Two practical points. First, Medicare's GLP-1 Bridge pilot covers the approved Wegovy, Zepbound and Foundayo products at a flat copay through 2027, as covered in our <a href="/weight-loss/articles/glp1-after-65-medicare">GLP-1s after 65 guide</a>; a newly approved drug would not automatically join it. Second, new drugs usually take time to win insurance coverage after approval. For most people paying cash, the first year of a new drug is likely to cost more than the approved options do now. Our <a href="/weight-loss/cheapest-glp1">cheapest GLP-1 page</a> keeps the verified prices current, and the <a href="/weight-loss/articles/glp1-with-insurance">insurance guide</a> explains how to check coverage.</p>`,
    },
    {
      heading: "What do the new drugs mean if you are on semaglutide or tirzepatide today?",
      body: `<p>For most people, very little in the next twelve months, and a set of options worth knowing about after that. The answer depends on where you are now.</p>
<h3>You are on semaglutide (Wegovy or compounded) and doing well</h3>
<p>Nothing in the pipeline is a reason to change. A drug that works and that you tolerate is the best drug for you. Stopping to wait for something stronger risks regaining weight; our <a href="/weight-loss/articles/stopping-glp1-weight-regain-complete-guide">guide to stopping GLP-1s</a> sets out the regain evidence.</p>
<h3>You are on semaglutide and have plateaued</h3>
<p>The approved options are already here: Wegovy HD for people on 2.4 mg for at least four weeks, or a switch to tirzepatide, which beat a semaglutide-based combination head to head in REDEFINE 4. If CagriSema is approved, it becomes a third option built on the drug you already take. Talk to your prescriber about which fits; our <a href="/weight-loss/articles/zepbound-vs-wegovy">Zepbound vs Wegovy guide</a> covers the switch.</p>
<h3>You are on tirzepatide and doing well</h3>
<p>You are on the drug that set the current benchmark: 23.6% at 84 weeks in REDEFINE 4, counting everyone randomised. Retatrutide may eventually offer more, and EloraTZP is being developed specifically as a tirzepatide add-on, but neither is available, and both had more people stopping at their top doses in the trials reported so far.</p>
<h3>You are on tirzepatide and have plateaued at 15 mg</h3>
<p>This is the group with the most to gain from the pipeline and the least available today. Retatrutide is the obvious future candidate, from 2027 at the earliest on Lilly's filing timeline. Until then, a prescriber can review diet, activity, sleep and other medicines, and that review is the useful step while the pipeline matures.</p>
<h3>You stopped a GLP-1 because of side effects</h3>
<p>Watch the amylin drugs. Petrelintide's phase 2 tolerability and the companies' framing of amylin as gentler are aimed at you. They are phase 2 and early phase 3. In the meantime, the approved pills, and a slower titration on an injection under a prescriber, are worth discussing; our <a href="/weight-loss/articles/semaglutide-side-effects-guide">side-effects guide</a> covers what helps.</p>
<h3>You dislike injections</h3>
<p>Two approved pills exist now, compared in our <a href="/weight-loss/articles/foundayo-vs-wegovy-pill">Foundayo vs Wegovy pill guide</a>. Oral amycretin and aleniglipron are years from approval, and MariTide's monthly injection is still in phase 3.</p>
<h3>You are worried about muscle</h3>
<p>Bimagrumab is phase 2. Protein and resistance training work now, as our <a href="/weight-loss/articles/glp1-muscle-loss-how-to-protect-lean-mass">muscle-loss guide</a> explains.</p>
<h3>You have fatty liver disease, knee osteoarthritis or sleep apnoea</h3>
<p>The pipeline is increasingly built around these conditions. Retatrutide's planned filing includes knee osteoarthritis pain and obstructive sleep apnoea; survodutide's case is the liver. Ask your clinician whether any approved option already has evidence for your condition, and whether a trial is relevant.</p>
<h3>Do the new drugs help with keeping weight off?</h3>
<p>That is the question the pipeline answers least well, and the one that matters most for anyone already on treatment. Every GLP-1 trial that has stopped the drug has seen weight return; our <a href="/weight-loss/articles/stopping-glp1-weight-regain-complete-guide">guide to stopping GLP-1s</a> sets out that evidence. A new drug that produces more weight loss does not change the underlying pattern unless it is easier to stay on, cheaper to stay on, or works as a lower-burden maintenance option.</p>
<p><strong>Switching and maintenance trials.</strong></p>
<ul>
<li><strong>Orforglipron (Foundayo).</strong> Lilly's ATTAIN-MAINTAIN trial switched people from Wegovy or Zepbound injections to the daily pill, as covered in our <a href="/weight-loss/articles/foundayo-vs-wegovy-pill">Foundayo guide</a>. It is the only switch-to-maintenance result for an approved drug in this guide, and it was company-reported.</li>
<li><strong>MariTide.</strong> Amgen is running ${ext(S.maritimeSwitch, "MARITIME-SWITCH")}, enrolling adults moving from weekly tirzepatide or semaglutide to MariTide. A monthly or less frequent injection is, in principle, the kind of option that suits long-term maintenance.</li>
<li><strong>Long-term extensions.</strong> MariTide's ${ext(S.maritime1Ext, "MARITIME-1 extension")}, with an estimated primary completion in late 2027, shows the companies collecting longer follow-up, but an extension is not a maintenance trial in the sense of stepping down or switching after weight loss.</li>
</ul>

<p>${ext(S.time, "Time's reporting")} that about 40% of people stop within a year is the real-world limit on every drug in this guide. The amylin drugs' case is that a gentler drug is easier to stay on for years. That case has not yet been tested in a long-term trial. Until it is, the best maintenance plan is the one you and a prescriber can sustain with the approved drugs, at a dose you tolerate, alongside the protein and training that protect muscle.</p>`,
    },
    {
      heading: "Should you wait for a new drug or start an approved one now?",
      body: `<p>Talk to a prescriber, and do not wait without a reason. The approved drugs work now. The new ones may work better, but the earliest of them is a company's plan away from approval, and approval is not the same as coverage, supply or a prescription.</p>
<h3>A decision framework</h3>
<ol>
<li><strong>Do you have a weight-related health problem now?</strong> High blood pressure, type 2 diabetes or prediabetes, sleep apnoea, fatty liver, joint pain. If yes, the cost of waiting a year or two is measured in your health, and the approved drugs have evidence for several of those conditions. Start the conversation now.</li>
<li><strong>Is the only drug you would accept one that is not approved?</strong> If so, ask why. If the reason is side effects, the amylin drugs may suit you later; if it is effect size, tirzepatide and Wegovy HD already produce averages in the high teens to low twenties in their trials; if it is injections, the pills exist.</li>
<li><strong>Is cost the barrier?</strong> A new drug will not be cheaper than today's options at launch on any evidence we found. Our <a href="/weight-loss/cheapest-glp1">cheapest GLP-1 page</a> shows what is available now.</li>
<li><strong>Would you switch later if something better is approved?</strong> Usually that is possible. MariTide is being tested in people switching from weekly GLP-1s, and orforglipron's ATTAIN-MAINTAIN trial tested switching from injections. Starting an approved drug now does not lock you out of a future one.</li>
<li><strong>Are you tempted by an online "research" product to get there early?</strong> Do not. It is not the trial drug, and the FDA has said so.</li>
</ol>
<h3>Worked example: two people, same pipeline</h3>
<p>A 52-year-old with a BMI of 36, prediabetes and knee pain reads that retatrutide reduced knee pain in TRIUMPH-1 and decides to wait. On Lilly's timeline, the earliest US decision falls in 2027 or later, and coverage after that is unknown. Over that time, an approved drug with a trial average in the 15% to 21% range could have been treating both the weight and the blood sugar. Waiting is the expensive choice here, and the person can still ask about retatrutide when it is approved.</p>
<p>A 40-year-old who has been on tirzepatide 15 mg for a year, lost 18%, tolerates it and has stalled reads the same news. There is no approved next step above tirzepatide 15 mg, so for this person the pipeline genuinely matters. The sensible plan is to stay on treatment, work with a prescriber on the plateau, and revisit when retatrutide's label is known. Stopping now would not bring retatrutide any closer.</p>
<p>Our <a href="/weight-loss/articles/best-glp1-for-weight-loss">best GLP-1 for weight loss guide</a> compares the approved options, and the <a href="/weight-loss/how-to-choose-a-glp1-provider">provider guide</a> covers how to find a prescriber.</p>`,
    },
    {
      heading: "Who is this guide for, and who isn't it for?",
      body: `<p>This guide is for adults on, or considering, a prescribed weight-loss medication who want to understand what is coming and whether it should change their plans. It is written for US readers, and its approval statements are about the FDA.</p>
<p>It is not for:</p>
<ul>
<li><strong>Anyone looking for a way to get an unapproved drug.</strong> We do not describe sources, doses or preparation for retatrutide, cagrilintide or any other pipeline drug, and the only legitimate route is a clinical trial.</li>
<li><strong>Anyone planning to stop a current treatment to wait.</strong> That is a decision for you and a prescriber, and the regain evidence argues against doing it without a plan.</li>
<li><strong>Investors.</strong> We report trial results for patients. Company timelines here are quoted to explain access, not to forecast markets.</li>
<li><strong>Children and adolescents, pregnant people and anyone with a history of medullary thyroid cancer or MEN2.</strong> The pipeline trials largely excluded these groups, and the approved labels carry specific restrictions; a specialist needs to be involved.</li>
<li><strong>People outside the US.</strong> Approval status differs elsewhere; ecnoglutide, for example, is approved in China and not here.</li>
</ul>`,
    },
    {
      heading: "What don't we know yet about the next-generation drugs?",
      body: `<p>A great deal, and it is worth being specific, because the headlines suggest more certainty than the evidence supports.</p>
<ul>
<li><strong>Long-term safety.</strong> The longest phase 3 trials in this guide ran 80 to 84 weeks. The approved drugs have years of use behind them; the new mechanisms do not. Glucagon activation, GIP blockade and amylin combinations each need long-term data.</li>
<li><strong>What dysesthesia is.</strong> It appeared with retatrutide and with high-dose semaglutide, more at higher doses. Its cause and whether it matters long term are not established.</li>
<li><strong>Cardiovascular outcomes.</strong> Semaglutide has outcome data; most pipeline drugs do not yet. Lilly has said TRIUMPH-3's cardiovascular data will be presented later.</li>
<li><strong>Head-to-head results.</strong> Only one pipeline drug, CagriSema, has reported a head-to-head against tirzepatide, and it lost. Retatrutide, amycretin, MariTide and the amylin drugs have no published head-to-head against the best approved drug.</li>
<li><strong>Real-world persistence.</strong> Trials keep people on drug with support. ${ext(S.time, "Time's reported figure")} that about 40% stop within a year applies to the current drugs; whether the new ones are easier to stay on is unknown.</li>
<li><strong>What happens when they stop.</strong> With every GLP-1, weight returns after stopping. There is no reason yet to expect the new drugs to be different, and little data either way.</li>
<li><strong>Price and coverage.</strong> No company has published a US price for any pipeline drug in the sources we found.</li>
<li><strong>Whether timelines hold.</strong> Retatrutide's filing has already moved once. FDA decisions can bring requests for more data. Company dates in this guide are plans.</li>
<li><strong>Which estimand to believe.</strong> Companies lead with on-treatment figures; journals lead with everyone-randomised figures. Both are honest answers to different questions. We give both where we have them, and the comparison tables use like-for-like figures where possible.</li>
</ul>
<p>We will update this guide as results are published and decisions are made.</p>`,
    },
    {
      heading: "Questions to ask your clinician about the new weight-loss drugs",
      body: `<p>Take this list to your next appointment. A good prescriber will be glad you asked.</p>
<ol>
<li>Given my health and my results so far, is there an approved option I should consider now, such as a dose change, Wegovy HD, a switch to tirzepatide or a pill?</li>
<li>If CagriSema or retatrutide is approved, would I be a likely candidate, and what would we need to see on the label first?</li>
<li>What would switching involve: a new titration, a gap in treatment, a change in side effects?</li>
<li>Is there a clinical trial I might be eligible for, and would joining mean stopping my current drug or risking a placebo arm?</li>
<li>Are my side effects a reason to look at a different mechanism later, such as an amylin drug, or can they be managed now?</li>
<li>Do I have a condition, such as fatty liver, sleep apnoea or knee osteoarthritis, where a pipeline drug has specific data, and is there an approved option with evidence for it?</li>
<li>How should we protect muscle on my current treatment?</li>
<li>If I see a "new drug" offered online, how do I tell whether it is legitimate? (The answer for any unapproved drug is that it is not.)</li>
<li>What will my insurance cover now, and how do I find out whether it will cover a new drug after approval?</li>
<li>When should we review my plan again, and what result would make us change it?</li>
</ol>`,
    },
    {
      heading: "Final verdict and next steps",
      body: `<p>The next generation of weight-loss drugs is real and close, and it is not here yet for new mechanisms. Retatrutide is the strongest result in phase 3, 25.0% at 80 weeks counting everyone randomised, with a filing Lilly plans for early 2027 and a new skin-sensation side effect to understand. CagriSema is the only new mechanism under FDA review, with a decision the company expects in late 2026, but it lost to tirzepatide head to head. Amylin is the mechanism to watch for tolerability, and the drugs built on it range from early phase 3 to phase 2. MariTide aims at fewer injections, survodutide at the liver, bimagrumab at muscle.</p>
<p>Meanwhile, the approved options improved: two GLP-1 pills and a 7.2 mg semaglutide dose arrived between December 2025 and April 2026, joining tirzepatide, which remains the benchmark every pipeline drug is measured against. None of the pipeline drugs can be legally compounded, and online "research" versions are not the trial drugs.</p>
<ol>
<li><strong>If you are not on treatment and have a weight-related condition:</strong> talk to a prescriber now about the approved drugs. Start with our <a href="/weight-loss/articles/best-glp1-for-weight-loss">best GLP-1 guide</a> and the <a href="/weight-loss/how-to-choose-a-glp1-provider">provider guide</a>.</li>
<li><strong>If you are on treatment and doing well:</strong> stay on it. Revisit when a new drug's label is known.</li>
<li><strong>If you have plateaued:</strong> ask about Wegovy HD or tirzepatide, compared in our <a href="/weight-loss/articles/tirzepatide-vs-semaglutide">tirzepatide vs semaglutide guide</a>.</li>
<li><strong>If you want a pill:</strong> read <a href="/weight-loss/articles/foundayo-vs-wegovy-pill">Foundayo vs Wegovy pill</a> and <a href="/weight-loss/glp1-pills-vs-injections">pills vs injections</a>.</li>
<li><strong>If cost is the barrier:</strong> the <a href="/weight-loss/cheapest-glp1">cheapest GLP-1 page</a> lists verified prices; the <a href="/weight-loss/articles/compounded-semaglutide-vs-brand-name">compounded vs brand-name guide</a> explains the trade-offs.</li>
<li><strong>If you are following retatrutide:</strong> our <a href="/weight-loss/retatrutide-weight-loss">retatrutide page</a> tracks its status.</li>
</ol>
<p><em>This article is general information, not medical advice. Investigational drugs are not approved for any use outside clinical trials. Do not start, stop or change a prescribed medicine without a licensed clinician who knows your history.</em></p>`,
    },
    {
      heading: "References",
      body: `<ol>
<li>${ext(S.time, "The Next Generation of Weight-Loss Drugs Is Almost Here")}. Time, October 1, 2026.</li>
<li>${ext(S.qz, "Next weight-loss drugs 2026: 3 candidates in development")}. Quartz, updated October 28, 2026.</li>
<li>${ext(S.sciam, "New GLP-1 weight-loss drugs are coming, and they're stronger than Wegovy and Zepbound")}. Scientific American.</li>
<li>${ext(S.lillyTriumph1, "Lilly's triple agonist, retatrutide, delivered powerful weight loss in pivotal Phase 3 obesity trial")}. Eli Lilly press release, May 21, 2026.</li>
<li>${ext(S.smcTriumph1, "Expert reaction to announcement (not published study) of topline results from the TRIUMPH-1 trial of retatrutide")}. Science Media Centre, May 2026.</li>
<li>${ext(S.nejmTriumph1, "Retatrutide, a Triple Hormone Receptor Agonist, for Treatment of Obesity (TRIUMPH-1)")}. New England Journal of Medicine, September 29, 2026 (DOI 10.1056/NEJMoa2604169).</li>
<li>${ext(S.bariatricpalNejm, "NEJM abstract reports 25% weight loss with retatrutide, plus knee pain findings")}. BariatricPal, 2026.</li>
<li>${ext(S.lillyJune, "Lilly's triple agonist, retatrutide, drove substantial improvements in weight, A1C, knee osteoarthritis pain, and obstructive sleep apnea")}. Eli Lilly press release, June 6, 2026.</li>
<li>${ext(S.lillyTriumph23, "Lilly's triple agonist, retatrutide, successful in two additional Phase 3 obesity trials")}. Eli Lilly press release, July 23, 2026.</li>
<li>${ext(S.rttReta, "Lilly's Retatrutide Achieves Phase 3 Success; FDA BLA Filing Planned Q1 2027")}. RTTNews, July 2026.</li>
<li>${ext(S.ddwReta, "Phase III trials confirm benefits of Lilly's triple agonist retatrutide")}. Drug Discovery World, July 2026.</li>
<li>${ext(S.biopharmaDiveT4, "Lilly's three-pronged drug puts obesity field 'on notice'")}. BioPharma Dive, December 2025.</li>
<li>${ext(S.biospaceT4, "Lilly's Retatrutide Scores Triple Trial Triumph With 26% Weight Loss, But New Safety Signal Emerges")}. BioSpace, December 2025.</li>
<li>${ext(S.fdaConcerns, "FDA's Concerns with Unapproved GLP-1 Drugs Used for Weight Loss")}. US Food and Drug Administration, accessed October 31, 2026.</li>
<li>${ext(S.drugsRetaPeptide, "What is \"retatrutide peptide\" being sold online?")}. Drugs.com, 2026.</li>
<li>${ext(S.lillyLawsuits, "Eli Lilly files lawsuits targeting alleged sales of unapproved retatrutide")}. HMP Global Learning Network, 2026.</li>
<li>${ext(S.novoCagriFiling, "Novo Nordisk files for FDA approval of CagriSema")}. Novo Nordisk press release via BioSpace, December 18, 2025.</li>
<li>${ext(S.ctaCagri, "Novo Nordisk's CagriSema bested by Lilly's Zepbound in head-to-head trial")}. Clinical Trials Arena, 2026.</li>
<li>${ext(S.redefine1, "Garvey WT et al. Coadministered Cagrilintide and Semaglutide in Adults with Overweight or Obesity (REDEFINE 1)")}. New England Journal of Medicine, June 22, 2025.</li>
<li>${ext(S.redefine2, "Davies MJ et al. Cagrilintide-Semaglutide in Adults with Overweight or Obesity and Type 2 Diabetes (REDEFINE 2)")}. New England Journal of Medicine, June 22, 2025.</li>
<li>${ext(S.accRedefine, "REDEFINE 1 and REDEFINE 2: Greater Weight Loss With Combined Cagrilintide-Semaglutide")}. American College of Cardiology journal scan, July 2, 2025.</li>
<li>${ext(S.novoRedefine4, "REDEFINE 4 headline results")}. Novo Nordisk company announcement, February 23, 2026.</li>
<li>${ext(S.drugTopicsR4, "CagriSema Did Not Meet Primary End Point of Noninferiority to Tirzepatide")}. Drug Topics, February 2026.</li>
<li>${ext(S.novo6kFeb26, "Novo Nordisk Form 6-K")}. US Securities and Exchange Commission filing, February 2026.</li>
<li>${ext(S.accAmycretin, "Oral, Subcutaneous Amycretin Similarly Safe, Tolerated as GLP-1 Monoagonists")}. American College of Cardiology journal scan of the Lancet trials, July 2, 2025.</li>
<li>${ext(S.novoAmyPhase3, "Novo Nordisk to advance subcutaneous and oral amycretin for weight management into phase 3")}. Novo Nordisk press release via BioSpace, June 12, 2025.</li>
<li>${ext(S.cnbcAmyT2d, "Novo moves next-gen drug amycretin to late-stage diabetes trial after promising data")}. CNBC, November 25, 2025.</li>
<li>${ext(S.pharmaphorumAmy, "Data sets up phase 3 trials for Novo's amycretin in diabetes")}. Pharmaphorum, November 2025.</li>
<li>${ext(S.novo6kQ2, "Novo Nordisk Form 6-K, second quarter 2026")}. US Securities and Exchange Commission filing, 2026.</li>
<li>${ext(S.maritideNejm, "Jastreboff AM et al. Once-Monthly Maridebart Cafraglutide for the Treatment of Obesity: A Phase 2 Trial")}. New England Journal of Medicine, 2025;393(9):843-57.</li>
<li>${ext(S.drugsMaritide, "What is MariTide and how does it work?")}. Drugs.com.</li>
<li>${ext(S.amgenStory, "The Story of Maridebart Cafraglutide (MariTide)")}. Amgen, May 2026.</li>
<li>${ext(S.maritimeSwitch, "MARITIME-SWITCH (NCT07575399)")}. ClinicalTrials.gov.</li>
<li>${ext(S.maritime1Ext, "MARITIME-1-EXTENSION (NCT07684235)")}. ClinicalTrials.gov.</li>
<li>${ext(S.biSynchronize, "Positive data from two Phase III SYNCHRONIZE obesity trials")}. Boehringer Ingelheim, 2026.</li>
<li>${ext(S.accSynchronize, "SYNCHRONIZE-1: Survodutide Led to Significant Weight Loss in Adults With Obesity")}. American College of Cardiology journal scan, June 15, 2026.</li>
<li>${ext(S.fierceSurvo, "ADA: Boehringer execs claim survodutide tolerability 'consistent' with class despite phase 3 update")}. Fierce Biotech, June 2026.</li>
<li>${ext(S.biMasld, "Boehringer Ingelheim's survodutide Phase III trial showed targeted 34% visceral and 63% liver fat reduction")}. Boehringer Ingelheim release via Drugs.com, June 2026.</li>
<li>${ext(S.rochePetre, "Roche announces positive Phase II results for petrelintide")}. Roche press release, March 5, 2026.</li>
<li>${ext(S.zealandLancet, "Zealand Pharma to present additional ZUPREME-1 data at EASD 2026 and announces publication in The Lancet Diabetes & Endocrinology")}. Zealand Pharma release, 2026.</li>
<li>${ext(S.petrePhase3, "Zealand Pharma and Roche Advance Petrelintide to Phase 3")}. BioPharm International, 2026.</li>
<li>${ext(S.ctaPetre, "Roche and Zealand's Phase II obesity trial divides analyst opinion")}. Clinical Trials Arena, March 2026.</li>
<li>${ext(S.lillyElora, "Lilly's selective amylin agonist, eloralintide, demonstrated meaningful weight loss in a Phase 2 study")}. Eli Lilly press release, November 6, 2025.</li>
<li>${ext(S.eloraPhase3, "A Study of Eloralintide (LY3841136) in Participants With Obesity, or Overweight Without Type 2 Diabetes (NCT07321886)")}. ClinicalTrials.gov.</li>
<li>${ext(S.lillyEloraTzp, "Lilly's EloraTZP delivered greater weight loss and A1C reduction vs. tirzepatide 15 mg in adults with obesity and type 2 diabetes")}. Eli Lilly press release, September 30, 2026.</li>
<li>${ext(S.novoWegovyHD, "FDA Approves Wegovy HD Injection")}. Novo Nordisk press release, March 19, 2026.</li>
<li>${ext(S.healioWegovyHD, "FDA approves high-dose Wegovy 7.2 mg for adults with obesity")}. Healio, March 19, 2026.</li>
<li>${ext(S.beckersPill, "FDA approves Wegovy pill as 1st oral GLP-1 for weight loss")}. Becker's Hospital Review, December 2025.</li>
<li>${ext(S.oasis4, "Oral Semaglutide at a Dose of 25 mg in Adults with Overweight or Obesity (OASIS 4)")}. New England Journal of Medicine, September 2025, via PubMed.</li>
<li>${ext(S.accOasis4, "OASIS 4: Significant Weight Loss With Oral Semaglutide")}. American College of Cardiology journal scan, September 24, 2025.</li>
<li>${ext(S.structureAccess, "Structure Therapeutics Reports Positive Topline Data from ACCESS Program for Aleniglipron")}. Structure Therapeutics release, December 8, 2025.</li>
<li>${ext(S.structureQ2, "Structure Therapeutics second quarter 2026 results (Form 8-K exhibit)")}. US Securities and Exchange Commission filing, 2026.</li>
<li>${ext(S.believeNatMed, "Bimagrumab plus semaglutide alone or in combination for the treatment of obesity: a randomized phase 2 trial (BELIEVE)")}. Nature Medicine, 2026.</li>
<li>${ext(S.ctaBima, "Eli Lilly terminates trial of Zepbound and muscle-sparing combo")}. Clinical Trials Arena, September 2025.</li>
<li>${ext(S.ecnoNmpa, "Sciwind secures China's NMPA approval for Ecnoglutide injection")}. Pharmaceutical Technology, March 2026.</li>
</ol>
<p>Approved-drug details for Foundayo, the Wegovy pill, STEP UP and Medicare's GLP-1 Bridge follow our existing guides, which carry their own sources: <a href="/weight-loss/articles/foundayo-vs-wegovy-pill">Foundayo vs Wegovy pill</a>, <a href="/weight-loss/articles/glp1-microdosing-complete-guide">GLP-1 dosing evidence</a>, <a href="/weight-loss/articles/glp1-muscle-loss-how-to-protect-lean-mass">GLP-1 muscle loss</a> and <a href="/weight-loss/articles/glp1-after-65-medicare">GLP-1s after 65</a>. Provider prices are from our verified price index. Sources checked October 31, 2026.</p>`,
    },
  ],
};
