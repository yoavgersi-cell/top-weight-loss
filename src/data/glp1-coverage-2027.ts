import type { Article } from "./articles";

// ───── GLP-1 coverage in 2027: employers dropping Wegovy and Zepbound (Nov 2, 2026) ─────
// Data-led open-enrollment guide to the 2027 coverage retreat. Sourcing rules:
// every survey figure links the survey owner's release or the dated news report
// of it, names the survey and its population, and says when a figure is a
// secondary summary rather than the report itself. Surveys use different
// samples (employers with 100+, 200+ or 500+ workers; large-employer members),
// so they are shown side by side and never averaged. Medicare GLP-1 Bridge facts
// follow our existing glp1-after-65-medicare and lost-insurance-coverage guides
// and reuse their sources. Every provider price is copied from the verified
// price index (src/lib/price-index.ts) or from the brand figures already on the
// site with their conditions; manufacturer and direct-to-employer programmes
// whose prices we have not published are described without numbers. No dose,
// protocol or eligibility workaround is given; the prescriber decides.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  // Employer surveys and news, 2026
  bloomberg: "https://www.bloomberg.com/news/articles/2026-10-30/glp-1-weight-loss-drugs-will-be-covered-for-fewer-us-employees",
  wtw: "https://finance.yahoo.com/healthcare/articles/wtw-2026-best-practices-healthcare-140300184.html",
  wallst: "https://247wallst.com/investing/2026/10/28/16-of-employers-are-thinking-about-cutting-weight-loss-drug-coverage/",
  cnbc: "https://www.cnbc.com/2026/10/27/glp1-drug-coverage-weight-loss-options.html",
  gallup: "https://news.gallup.com/poll/712157/glp-usage-reaches-new-high.aspx",
  kff: "https://www.kff.org/health-costs/2026-employer-health-benefits-survey/",
  kffX: "https://x.com/KFF/status/2113366286486908957",
  mercerGlp: "https://www.mercer.com/en-us/about/newsroom/employers-are-shifting-healthcare-costs-to-employees/",
  mercerCost: "https://www.mercer.com/en-us/about/newsroom/employers-expect-health-benefit-costs-to-jump-in-2027/",
  fierceMarsh: "https://www.fiercehealthcare.com/payers/employers-health-benefits-costs-could-rise-82-2027-marsh-survey",
  mercerNovo: "https://www.mercer.com/en-us/insights/us-health-news/novo-nordisks-glp-1-list-price-cut-what-to-watch-next/",
  bghStrategy: "https://www.businessgrouphealth.org/newsroom/news-and-press-releases/press-releases/2027-employer-healthcare-strategy-survey",
  reutersBgh: "https://www.usnews.com/news/us/articles/2026-08-25/more-us-employers-to-drop-weight-loss-drugs-in-2027-as-healthcare-costs-increase",
  bghGlp: "https://www.businessgrouphealth.org/newsroom/news-and-press-releases/press-releases/2026-glp-1-survey",
  bghBlog: "https://www.businessgrouphealth.org/topics/blog/how-are-employers-managing-glp-1-coverage-amid-rising-demand-and-costs",
  ifebp: "https://blog.ifebp.org/glp-1-drugs-survey-report-what-employers-are-and-arent-covering-in-2026/",
  // Public plans
  wgbhMass: "https://wgbh.org/news/politics/2026-02-26/weight-loss-drugs-will-no-longer-be-covered-by-mass-state-workers-health-insurance",
  beckersMass: "https://www.beckerspayer.com/payer/massachusetts-state-employee-health-plan-to-drop-glp-1-coverage/",
  massGov: "https://www.mass.gov/news/june-update-on-vida-health-program-and-glp-1-coverage",
  ncWfae: "https://www.wfae.org/2024-01-23/wegovy-north-carolina-state-insurance-ozempic-nordisk-dale-folwell",
  ncWral: "https://www.wral.com/news/nccapitol/north-carolina-expected-budget-wont-restore-weight-loss-coverage/",
  ohio: "https://cwcolumbus.com/news/local/ohio-glp1-drug-coverage-ozempic-mounjaro-medicaid-costs-state-employees-diabetes-obesity-budget-lawmakers-termination",
  medicaidKhn: "https://medicalxpress.com/news/2025-12-states-retreat-drugs-weight-loss.html",
  stateline: "https://stateline.org/2026/04/30/more-states-consider-dropping-glp-1-weight-loss-drugs-from-medicaid/",
  walmart: "https://www.cnbc.com/2026/10/13/walmart-glp-1s-inhalers-insulin-employee-benefits.html",
  // Direct-to-employer programmes
  lillyEmployer: "https://www.cnbc.com/2026/03/05/eli-lilly-launches-program-to-boost-employer-coverage-of-obesity-drugs.html",
  andel: "https://www.prnewswire.com/news-releases/andel-collaborates-with-novo-to-bring-wegovy-injection-and-wegovy-pill-direct-to-employers-302921477.html",
  ajmc: "https://www.ajmc.com/view/as-employers-pull-back-on-glp-1s-andel-and-novo-offer-a-workaround",
  // Medicare and enrollment
  cmsBridge: "https://www.cms.gov/medicare/coverage/prescription-drug-coverage/medicare-glp-1-bridge",
  cmsBridgePr: "https://www.cms.gov/newsroom/press-releases/coming-soon-cms-provide-50-monthly-access-glp-1-medications-medicare-beneficiaries",
  stlpr: "https://www.stlpr.org/npr/2026-05-06/a-new-medicare-option-for-weight-loss-drugs-is-coming-heres-what-to-know",
  wlrn: "https://www.wlrn.org/npr-breaking-news/2026-05-06/some-medicare-beneficiaries-can-now-get-popular-obesity-drugs-for-50-a-month",
  ahaBalance: "https://www.aha.org/news/headline/2026-04-22-cms-delays-part-d-portion-balance-model-expansion-glp-1-access",
  kffBalance: "https://www.kff.org/medicare/what-to-know-about-the-balance-model-for-glp-1s-in-medicare-and-medicaid/",
  medicareOe: "https://medicare.gov/health-drug-plans/open-enrollment",
  nprAca: "https://www.npr.org/2026/11/01/nx-s1-6023423/aca-open-enrollment-health-insurance",
  // Appeals and tax
  hcAppeal: "https://www.healthcare.gov/appeal-insurance-company-decision/",
  hcExternal: "https://www.healthcare.gov/appeal-insurance-company-decision/external-review/",
  cmsAppeals: "https://www.cms.gov/CCIIO/Resources/Fact-Sheets-and-FAQs/appeals06152012a",
  irs: "https://irs.gov/newsroom/irs-addresses-questions-about-medical-expenses-related-to-nutrition-wellness-and-general-health",
  // FDA and labels
  wegovyLabel: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/215256s000lbl.pdf",
  fdaZepbound: "https://www.fda.gov/news-events/press-announcements/fda-approves-new-medication-chronic-weight-management",
  fdaSelect: "https://www.fda.gov/news-events/press-announcements/fda-approves-first-treatment-reduce-risk-serious-heart-problems-specifically-adults-obesity-or",
  fdaOsa: "https://www.fda.gov/news-events/press-announcements/fda-approves-first-medication-obstructive-sleep-apnea",
  mash: "https://www.managedhealthcareexecutive.com/view/fda-grants-accelerated-approval-of-wegovy-to-treat-liver-disease",
  fdaCompounded: "https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss",
  fdaWarnings: "https://www.mondaq.com/unitedstates/healthcare/1814666/fda-takes-aim-at-misleading-online-claims-for-compounded-glp-1-drugs",
  sciamFoundayo: "https://www.scientificamerican.com/article/how-eli-lillys-new-glp-1-pill-stacks-up-against-wegovy-and-other-weight-loss/",
};

export const glp1Coverage2027Article: Article = {
  slug: "glp1-coverage-2027-employers-dropping",
  title: "GLP-1 Coverage in 2027: Employers Dropping Wegovy, Zepbound",
  description:
    "Survey data on employers dropping Wegovy and Zepbound for weight loss in 2027, an open-enrollment checklist, appeals, Medicare's $50 Bridge and cash costs.",
  category: "Guide",
  readTime: "34 min read",
  publishedAt: "2026-11-02",
  updatedAt: "2026-11-02",
  heroColor: "#EEF1F7",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "Employer coverage of GLP-1s for weight loss fell in WTW's 2026 survey for the first time in three years, from 57% to 53% of employers with 100 or more workers, and 30% of those still covering are considering dropping it. Business Group on Health reports large-employer coverage down from 72% in 2025 to 60% in 2026, with about 14% having dropped or planning to drop it in 2027.",
    "Demand is moving the other way: Gallup found 11% of US adults were taking a GLP-1 for weight loss in 2026, up from 3% in 2024. Cost is the stated reason for cuts, cited by 91% of employers that have dropped or are weighing dropping coverage in the WTW survey.",
    "Open enrollment is the moment to check, not January. Search your 2027 formulary for Wegovy and Zepbound, read the prior-authorization and BMI rules, ask whether coverage continues for heart disease, sleep apnea or liver indications, and compare plans if you have a choice. Diabetes coverage is usually untouched.",
    "If coverage goes, routes remain at very different prices: Medicare's GLP-1 Bridge at $50 a month through December 31, 2027 if you qualify, brand-name cash at $1,149-$1,799 a month at the providers we track, the Wegovy pill at Ro from $149 then $299 plus membership, or compounded semaglutide from $41 a month and tirzepatide from $71 at verified sale prices, which are not FDA-approved products.",
  ],
  sections: [
    {
      heading: "Is your employer dropping GLP-1 coverage for weight loss in 2027?",
      body: `<div class="qa"><strong>The short answer</strong><p>Possibly, and fewer employers are covering these drugs each year. WTW's 2026 survey found the share of employers covering GLP-1s for weight loss fell from 57% to 53%, the first decline in three years, and 30% of those still covering are considering dropping it. Business Group on Health reports 14% of large employers have dropped or plan to drop coverage in 2027. The only reliable answer for you is your own 2027 formulary, which you can check now, during open enrollment, before your choices lock. Diabetes coverage usually continues.</p></div>
<p>For three years the direction of travel for employer coverage of Wegovy and Zepbound was up. In 2026 it turned. The surveys published between June and October 2026, from WTW, Mercer, Business Group on Health, KFF and the International Foundation of Employee Benefit Plans, all point the same way: coverage for weight loss is flat at best and falling at many large employers, and a sizeable minority of those still paying are weighing an exit for 2027. ${ext(S.bloomberg, "Bloomberg reported on October 30, 2026")} that fewer US employees will have these drugs covered next year; ${ext(S.cnbc, "CNBC's October 27 report")} described plans dropping coverage as premiums rise.</p>
<p>This guide is the data-led version of that story, written for the weeks when it matters. Most employer open-enrollment windows run in October and November, Medicare's runs to December 7, and the HealthCare.gov window opened on November 1. Decisions made in those windows decide what you pay for a GLP-1 in 2027. We set out what each survey actually measured, which public plans have already cut coverage, what a "dropped" benefit looks like in plan documents, how to check yours, how appeals work, and what every remaining route costs over a year at prices we have verified.</p>
<p>If you have already received a letter saying your coverage has ended, our shorter guide to <a href="/weight-loss/articles/lost-insurance-coverage-zepbound-wegovy">what to do when you lose coverage for Zepbound or Wegovy</a> covers the immediate options. This page is about 2027: reading the numbers, checking the plan you are about to choose, and planning a year rather than a month.</p>
<p>Two rules apply throughout. First, survey figures are for the employers each survey sampled, which differ in size and definition, so we show them side by side and never average them. Second, nothing here is a reason to change or stop a prescribed medicine on your own. Coverage decides how you pay; a licensed clinician decides what you take.</p>`,
    },
    {
      heading: "The 2026-2027 coverage numbers at a glance",
      body: `<p>Seven sources, each with its own population. Read across a row, not down a column: a 53% figure for employers with 100 or more workers and an 18% figure for firms with 200 or more workers are not in conflict, because the surveys ask different questions of different samples. KFF, for example, asks whether a firm's largest plan covers GLP-1s used primarily for weight loss, across firms of all industries; the benefits consultancies survey their own client and member bases, which skew toward larger and more generous employers.</p>
<table>
<thead><tr><th>Statistic</th><th>Figure</th><th>Source and population</th><th>Date</th></tr></thead>
<tbody>
<tr><td>Employers covering GLP-1s for weight loss</td><td>53% in 2026, down from 57% in 2025</td><td>${ext(S.wtw, "WTW Best Practices in Healthcare Survey")}, 471 US employers with 100+ workers, fielded June 22 to August 7, 2026</td><td>Released October 28, 2026</td></tr>
<tr><td>Covering employers considering dropping it</td><td>30% of those still covering (16% of all respondents, up from 9%)</td><td>WTW, as above; ${ext(S.wallst, "24/7 Wall St. on the 16% figure")}</td><td>October 2026</td></tr>
<tr><td>Employers citing cost among those dropping or weighing it</td><td>91%</td><td>WTW, as above</td><td>October 2026</td></tr>
<tr><td>Large employers covering GLP-1s for weight management</td><td>60% in 2026, down from 72% in 2025</td><td>Business Group on Health 2027 Employer Healthcare Strategy Survey, ${ext(S.reutersBgh, "as reported by Reuters")}</td><td>August 25, 2026</td></tr>
<tr><td>Large employers that dropped or plan to drop coverage in 2027</td><td>About 14%</td><td>Business Group on Health, ${ext(S.reutersBgh, "as reported by Reuters")}</td><td>August 25, 2026</td></tr>
<tr><td>Large employers that dropped weight-loss GLP-1 coverage in 2026</td><td>6%; a further 5% plan to or are considering it for 2027</td><td>${ext(S.mercerGlp, "Mercer Survey on Health and Benefit Strategies for 2027")}, employers with 500+ workers, fielded April 15 to May 8, 2026</td><td>June 11, 2026</td></tr>
<tr><td>Large employers that tightened GLP-1 controls or plan to</td><td>27%</td><td>Mercer, as above</td><td>June 11, 2026</td></tr>
<tr><td>Firms with 200+ workers covering GLP-1s for weight loss</td><td>About 1 in 5 (18%, versus 19% in 2025)</td><td>${ext(S.kff, "KFF 2026 Employer Health Benefits Survey")}; ${ext(S.kffX, "KFF summary")}</td><td>2026</td></tr>
<tr><td>Firms with 5,000+ workers covering GLP-1s for weight loss</td><td>33%, versus 43% in 2025 (as reported in summaries of the KFF report)</td><td>${ext(S.kff, "KFF 2026 Employer Health Benefits Survey")}</td><td>2026</td></tr>
<tr><td>Employers covering GLP-1s for both diabetes and weight loss</td><td>36%, unchanged for a second year; 60% cover diabetes only</td><td>${ext(S.ifebp, "International Foundation of Employee Benefit Plans GLP-1 survey")}</td><td>July 7, 2026</td></tr>
<tr><td>US adults currently taking a GLP-1 for weight loss</td><td>11% in 2026, up from 3% in 2024; 15% have ever used one for weight loss</td><td>${ext(S.gallup, "Gallup Panel")}, 5,065 adults, May 28 to June 5, 2026</td><td>2026</td></tr>
<tr><td>Projected rise in employer health cost per employee, 2027</td><td>8.2%, the largest since 2003; GLP-1 use accounts for about 1 percentage point</td><td>${ext(S.mercerCost, "Mercer (Marsh) National Survey of Employer-Sponsored Health Plans")}, preliminary, 1,800+ employers; ${ext(S.fierceMarsh, "Fierce Healthcare")}</td><td>August-September 2026</td></tr>
<tr><td>Medicare GLP-1 Bridge copay</td><td>$50 a month, July 1, 2026 to December 31, 2027</td><td>${ext(S.cmsBridge, "CMS")}</td><td>Program page, 2026</td></tr>
</tbody>
</table>
<h3>How to read the WTW 30% and 16% figures</h3>
<p>They describe the same respondents with different denominators. WTW reports that 16% of all employers in its sample cover GLP-1s for weight loss now but are considering removing them, up from 9% a year earlier. Since 53% cover at all, 16 divided by 53 is about 30%, which is the "30% of those still covering" figure in the WTW release and in Bloomberg's report. Neither figure says 30% of employers will drop coverage in 2027; "considering" is a survey answer, not a decision.</p>
<h3>Why the Business Group on Health figures look high</h3>
<p>Business Group on Health surveys its own members, who are among the largest employers in the country, so its coverage rate starts far above KFF's. The trend is what matters: a drop from 72% to 60% in a year among the employers most likely to cover these drugs. A separate Business Group on Health survey, ${ext(S.bghGlp, "released June 10, 2026")} from 105 member employers surveyed in February and March, put coverage for weight management at 67%, with 72% of those covering saying they were likely to continue in 2027 and 10% saying they likely would not. The two surveys used different samples and dates, so the 60% and 67% figures should not be read as a contradiction.</p>`,
    },
    {
      heading: "Why are employers dropping Wegovy and Zepbound coverage?",
      body: `<p>Cost, by their own account, and the arithmetic is not mysterious. Every additional person who starts a GLP-1 adds a recurring monthly claim that, on current evidence, continues for as long as the weight loss is meant to last. Use has climbed quickly: Gallup's 11% current-use figure for US adults in 2026 compares with 3% in 2024 (${ext(S.gallup, "Gallup")}). An employer that covered the drugs in 2023 for a small group of eligible employees may now be paying for several times as many.</p>
<h3>What the employer surveys say about spending</h3>
<ul>
<li><strong>Cost is the stated reason.</strong> In WTW's 2026 survey, 91% of employers that have dropped coverage or are weighing it cited cost (${ext(S.wtw, "WTW")}).</li>
<li><strong>GLP-1s are a measurable slice of total claims.</strong> Among employers covering weight loss, GLP-1s averaged 11.4% of total annual claims in 2026, up from 6.9% in 2023, according to the ${ext(S.ifebp, "IFEBP survey")}.</li>
<li><strong>The spending impact is felt most at the largest firms.</strong> Among KFF respondents that cover the drugs for weight loss, 29% said the coverage had a significant impact on prescription drug spending and 27% a moderate impact (${ext(S.kffX, "KFF")}).</li>
<li><strong>Most large employers link GLP-1s to rising costs.</strong> Nearly eight in ten employers in Business Group on Health's June 2026 survey said GLP-1s are driving an increase in their health care costs (${ext(S.bghGlp, "Business Group on Health")}).</li>
<li><strong>The whole benefit is getting more expensive.</strong> Mercer's preliminary 2026 survey projects an 8.2% rise in health benefit cost per employee in 2027, the largest increase since 2003, with growing GLP-1 use for weight management accounting for roughly one percentage point of it (${ext(S.mercerCost, "Mercer")}; ${ext(S.fierceMarsh, "Fierce Healthcare")}). Business Group on Health's members expect a median cost trend of 9.2% for 2027 before plan changes (${ext(S.bghStrategy, "Business Group on Health")}).</li>
</ul>
<h3>Why lower list prices have not stopped the cuts</h3>
<p>Novo Nordisk has announced a lower US list price for Wegovy and Ozempic taking effect on January 1, 2027. It is reasonable to ask why that does not rescue coverage. Mercer's analysis is that the manufacturer is likely to offset a lower list price with smaller rebates, so what an employer actually pays may change less than the headline suggests, and that rebates may still be limited in 2027 for plans that cover GLP-1s only for obesity-related use (${ext(S.mercerNovo, "Mercer")}). Mercer also notes that the list-price change does not affect the manufacturers' direct-to-consumer self-pay prices, which are set separately. For an employee, the practical point is that a lower list price is not a promise of renewed coverage.</p>
<h3>Why weight loss is cut and diabetes is not</h3>
<p>Almost every cut in 2026 targets the weight-management indication. Type 2 diabetes is a long-established covered condition with a clear treatment pathway, and dropping its medicines would be a different decision. The IFEBP survey's 60% "diabetes only" figure shows how common that split already is (${ext(S.ifebp, "IFEBP")}). Walmart illustrates the pattern in reverse: for 2027 it will offer Ozempic and Mounjaro at no charge to employees with type 2 diabetes under most of its medical plans, after a new prior authorisation, while GLP-1s for weight loss remain outside the benefit (${ext(S.walmart, "CNBC, October 13, 2026")}).</p>`,
    },
    {
      heading: "Which employers and public plans have already cut GLP-1 weight-loss coverage?",
      body: `<p>Private employers rarely announce benefit cuts, so the public record is dominated by state employee plans and Medicaid programmes, whose decisions are made in public meetings. They are worth knowing because they show how a cut is usually structured: an end date months ahead, a carve-out for diabetes, sometimes an exception for other conditions, and a transition period for people already on treatment.</p>
<h3>State employee plans</h3>
<ul>
<li><strong>Massachusetts.</strong> The Group Insurance Commission, which covers state employees and retirees, voted 10-7 in February 2026 to end coverage of GLP-1 drugs for weight loss for its non-Medicare plans from July 1, 2026 (${ext(S.wgbhMass, "WGBH, February 26, 2026")}). About 22,000 members were taking the drugs for weight loss, according to commission staff as reported by ${ext(S.beckersMass, "Becker's")}. The commission's ${ext(S.massGov, "June 2026 update")} says some members may still qualify through other medical conditions; Becker's reports these as cardiovascular disease, sleep apnea and the liver condition MASH.</li>
<li><strong>North Carolina.</strong> The State Health Plan's board voted 4-3 to stop covering GLP-1s for weight loss from April 1, 2024 (${ext(S.ncWfae, "WFAE, January 2024")}). In 2026 the state treasurer said the expected budget would not restore that coverage (${ext(S.ncWral, "WRAL")}).</li>
<li><strong>Ohio.</strong> The state ended weight-loss GLP-1 coverage for state employees on July 1, 2025, citing escalating costs despite cost-containment measures; coverage for diabetes continued (${ext(S.ohio, "CW Columbus")}).</li>
</ul>
<h3>Medicaid</h3>
<p>KFF Health News reported in December 2025 that California, New Hampshire, Pennsylvania and South Carolina would stop covering GLP-1 prescriptions for obesity in adults on January 1, 2026, citing budget strain (${ext(S.medicaidKhn, "KFF Health News via Medical Xpress")}). By April 2026, ${ext(S.stateline, "Stateline reported")} that more states were considering the same step. Medicaid rules differ by state and change with each budget, so anyone covered by Medicaid should check with their state programme directly.</p>
<h3>Private employers</h3>
<p>The surveys above are the best evidence for private employers, and they say most changes for 2027 are cuts or restrictions rather than additions. Business Group on Health's vice president was quoted by Reuters as saying not a single employer in its survey would add GLP-1 coverage for weight management in 2027 (${ext(S.reutersBgh, "Reuters via U.S. News")}). Among employers that do not cover the drugs, the IFEBP found 9% considering adding coverage, and 19% said they would not cover weight-loss indications even though they had covered them before (${ext(S.ifebp, "IFEBP")}).</p>
<p>The public examples share one feature worth copying into your own planning: each gave members months of notice. If your employer is dropping coverage for 2027, the notice is most likely in this year's open-enrollment materials, which is why the next sections are about reading them now.</p>`,
    },
    {
      heading: "What does a dropped or tightened benefit look like in a 2027 plan?",
      body: `<p>"Dropping coverage" can mean several different things in plan documents, and they have different consequences for you. The first job during open enrollment is to work out which one you are facing.</p>
<table>
<thead><tr><th>What the plan does</th><th>How it appears in plan materials</th><th>What it means for you</th></tr></thead>
<tbody>
<tr><td>Full exclusion for weight management</td><td>"Weight loss drugs" or "anti-obesity medications" listed under exclusions; Wegovy and Zepbound absent from the formulary or marked not covered</td><td>No appeal reverses a plan-design exclusion. Plan for another route, unless another covered indication applies to you</td></tr>
<tr><td>Coverage with tighter prior authorisation</td><td>Drug listed with "PA" and new criteria: a higher BMI threshold, documented conditions, a minimum time on a programme</td><td>Still covered if you meet the criteria; your prescriber files the paperwork. Re-authorisation may be required each year</td></tr>
<tr><td>Required lifestyle or care programme</td><td>Coverage "through" a named digital or clinical weight-management programme</td><td>You must enrol and stay engaged. Massachusetts' plan, for example, required members to join a programme to keep coverage before the cut (${ext(S.massGov, "Mass.gov")})</td></tr>
<tr><td>Step therapy</td><td>"ST" on the formulary; a requirement to try another drug or approach first</td><td>A documented trial of the first-step option may be required before the GLP-1 is approved</td></tr>
<tr><td>Prescriber limits</td><td>Only certain specialists or an in-network programme may prescribe</td><td>A telehealth or primary care prescription may not satisfy the plan</td></tr>
<tr><td>One preferred drug</td><td>Only one of Wegovy or Zepbound listed as preferred</td><td>Switching to the preferred drug may keep you covered; a clinician decides whether that is appropriate</td></tr>
<tr><td>Higher cost share</td><td>Drug moves to a higher tier or coinsurance rather than a flat copay</td><td>Still covered, but your monthly cost can rise sharply until the deductible and out-of-pocket maximum are met</td></tr>
</tbody>
</table>
<p>Tightening is more common than outright removal. Mercer found 27% of large employers tightened utilisation controls in 2026 or plan to in 2027 (${ext(S.mercerGlp, "Mercer")}), and Business Group on Health has described employers tying eligibility to clinical criteria, requiring lifestyle programmes and limiting who can prescribe as alternatives to a full cut (${ext(S.bghBlog, "Business Group on Health")}). KFF reports that the large firms that do cover the drugs for weight loss often attach restrictions (${ext(S.kffX, "KFF")}).</p>
<h3>The labelled criteria plans build on</h3>
<p>Prior-authorisation criteria usually start from the FDA labels. Wegovy is approved for chronic weight management in adults with a BMI of 30 or more, or 27 or more with at least one weight-related condition (${ext(S.wegovyLabel, "Wegovy prescribing information, FDA")}), and Zepbound's approval for chronic weight management uses the same thresholds (${ext(S.fdaZepbound, "FDA, November 2023")}). Many plans add their own requirements on top, such as documented attempts at diet and exercise or a minimum weight loss at the first renewal to continue coverage. Your plan's criteria document, not the label, is what the reviewer applies.</p>
<h3>Other indications can keep a drug covered</h3>
<p>Wegovy and Zepbound are no longer approved for weight management alone. The FDA approved Wegovy in March 2024 to reduce the risk of cardiovascular death, heart attack and stroke in adults with established cardiovascular disease and either obesity or overweight (${ext(S.fdaSelect, "FDA")}), and granted it accelerated approval in August 2025 for adults with noncirrhotic MASH with moderate to advanced liver fibrosis (${ext(S.mash, "Managed Healthcare Executive")}). Zepbound was approved in December 2024 for moderate to severe obstructive sleep apnea in adults with obesity (${ext(S.fdaOsa, "FDA")}). A plan that excludes "weight loss" may still cover these uses, as the Massachusetts example shows. Whether one applies to you is a clinical question with a documented diagnosis behind it, not a box to tick; ask your clinician, and ask the plan how it treats each indication.</p>`,
    },
    {
      heading: "How do you check your 2027 plan during open enrollment?",
      body: `<p>Plan documents for the coming year are usually published at the start of open enrollment, and the formulary is the document that answers the question. It takes about half an hour to work through the steps below, and doing so before your window closes is the difference between choosing a plan and finding out in January.</p>
<table>
<thead><tr><th>Step</th><th>What to look for</th><th>Where to find it</th><th>Done</th></tr></thead>
<tbody>
<tr><td>1. Find the 2027 formulary, not 2026</td><td>The drug list dated for the new plan year; employers often change PBM or tier rules on January 1</td><td>Benefits portal, PBM website, or the open-enrollment packet</td><td>&#9744;</td></tr>
<tr><td>2. Search for each drug by name</td><td>Wegovy (injection and pill), Zepbound (pen, vial and KwikPen), and any GLP-1 you take now</td><td>Formulary PDF or online drug lookup</td><td>&#9744;</td></tr>
<tr><td>3. Read the codes next to it</td><td>PA (prior authorisation), ST (step therapy), QL (quantity limit), tier or coinsurance</td><td>Formulary key, usually on the first pages</td><td>&#9744;</td></tr>
<tr><td>4. Read the exclusions list</td><td>"Weight loss drugs", "anti-obesity medications" or "drugs for cosmetic or weight loss purposes"</td><td>Summary Plan Description or Evidence of Coverage</td><td>&#9744;</td></tr>
<tr><td>5. Get the PA criteria in writing</td><td>BMI threshold, required conditions, programme enrolment, renewal requirements (such as a minimum weight loss)</td><td>Call the PBM number on your card and ask for the criteria document</td><td>&#9744;</td></tr>
<tr><td>6. Ask about other indications</td><td>Whether coverage continues for cardiovascular risk reduction, sleep apnea or MASH, and for diabetes</td><td>PBM or HR benefits team</td><td>&#9744;</td></tr>
<tr><td>7. Ask about current users</td><td>Any transition period or grandfathering for people already on treatment</td><td>HR benefits team; plan change notice</td><td>&#9744;</td></tr>
<tr><td>8. Price the covered route</td><td>Deductible, coinsurance and out-of-pocket maximum applied to a brand GLP-1 for 12 months</td><td>Summary of Benefits and Coverage; PBM cost estimator</td><td>&#9744;</td></tr>
<tr><td>9. Compare every plan you can choose</td><td>Different plans from the same employer can carry different drug rules; a spouse's or partner's plan may differ again</td><td>Each plan's formulary and SPD</td><td>&#9744;</td></tr>
<tr><td>10. Decide your HSA or FSA amount</td><td>If you may pay cash in 2027, the amount you set aside now is the pre-tax money available</td><td>Open-enrollment election form</td><td>&#9744;</td></tr>
<tr><td>11. Ask about direct-to-employer programmes</td><td>Whether your employer contributes to a manufacturer-direct programme outside the plan</td><td>HR benefits team</td><td>&#9744;</td></tr>
<tr><td>12. Save the evidence</td><td>Screenshots or PDFs of the 2027 formulary entry and criteria, dated</td><td>Your own files</td><td>&#9744;</td></tr>
</tbody>
</table>
<h3>Questions to put to the benefits team</h3>
<ol>
<li>Is Wegovy or Zepbound covered for chronic weight management in each 2027 plan option, and on what tier?</li>
<li>What are the 2027 prior-authorisation criteria, and do they differ from 2026?</li>
<li>If I am covered today, will my current authorisation carry over, and until when?</li>
<li>Are Wegovy and Zepbound covered for cardiovascular risk reduction, obstructive sleep apnea or MASH if weight management is excluded?</li>
<li>Does the plan require enrolment in a weight-management programme, and which one?</li>
<li>Does the company offer or contribute to a direct-to-employer GLP-1 programme outside the plan?</li>
</ol>
<h3>Medicare and marketplace windows</h3>
<p>The same method applies outside employer plans. Medicare's Open Enrollment runs from October 15 to December 7, and changes take effect on January 1 (${ext(S.medicareOe, "Medicare.gov")}). The HealthCare.gov open-enrollment period for 2027 coverage opened on November 1, 2026 (${ext(S.nprAca, "NPR, November 1, 2026")}); check your state exchange for its deadline and for each plan's formulary before you choose. Our guide to <a href="/weight-loss/articles/glp1-with-insurance">GLP-1s with insurance</a> explains formularies and prior authorisation in more detail.</p>`,
    },
    {
      heading: "Should you switch plans to keep GLP-1 coverage?",
      body: `<p>Sometimes, and the only way to know is to run the numbers for a full year. Three situations come up repeatedly.</p>
<h3>Your employer offers several plans with different drug rules</h3>
<p>Large employers often offer two or three plan designs, and the drug benefit can differ between them, particularly when one plan is administered by a different carrier or PBM. If one option still covers Wegovy or Zepbound for weight management and another does not, compare the annual premium difference with what you would otherwise pay in cash. A plan that costs more in premiums but covers a brand GLP-1 can come out ahead, because the cash price of a brand pen at the providers we track runs to four figures a month (see the cost table below). The reverse is also possible: a high-deductible plan that covers the drug may still leave you paying the full price until the deductible is met.</p>
<h3>A spouse or partner has access to a different plan</h3>
<p>Family coverage decisions are rarely made on one drug, and they should not be. But if a partner's employer still covers GLP-1s for weight loss and the rest of the comparison is close, it is a legitimate tie-breaker. Check that plan's 2027 formulary and criteria, not its 2026 version, and confirm that dependants are treated the same as employees for the drug benefit.</p>
<h3>You are choosing a Medicare or marketplace plan</h3>
<p>For Medicare, the GLP-1 Bridge operates outside the regular Part D benefit, so plan choice matters less for the Bridge drugs than it would for a normal Part D drug; you still need Part D coverage, and the next section covers what we could verify. For marketplace plans, read each plan's formulary for the drug by name.</p>
<h3>When switching is not worth it</h3>
<ul>
<li>When the plan that covers the drug requires criteria you do not meet. Coverage you cannot use is not coverage.</li>
<li>When the premium difference is larger than the cost of an alternative route you would accept.</li>
<li>When other medical needs, doctors or hospitals point clearly to a different plan.</li>
</ul>
<p>A plan decision lasts a year. Our <a href="/weight-loss/glp1-cost-calculator">GLP-1 cost calculator</a> totals the verified cash prices so you can put a number on the alternative before you compare premiums.</p>`,
    },
    {
      heading: "Can you appeal if your plan stops covering Wegovy or Zepbound?",
      body: `<p>It depends on why the drug is not being paid for. An appeal is a request to reverse a decision made under the plan's rules. It is a strong tool against a prior-authorisation denial and a weak one against a rule the plan has chosen to write.</p>
<h3>Denial versus exclusion</h3>
<ul>
<li><strong>Prior-authorisation denial.</strong> The drug is covered, but the reviewer decided you did not meet the criteria. This is the case where appeals succeed, usually with better documentation: BMI measurements with dates, the weight-related conditions on record, the programme you completed, and a letter from your prescriber explaining medical necessity.</li>
<li><strong>Plan exclusion.</strong> The 2027 plan does not cover drugs for weight management at all. An internal appeal will usually confirm the exclusion. The exception is when you have another indication the plan does cover, in which case the request is for coverage under that indication, not an appeal of the exclusion.</li>
</ul>
<h3>The two stages</h3>
<p>Federal rules give most plan members two levels of review. An <strong>internal appeal</strong> asks the plan to reconsider; you generally have at least 180 days from the written denial to file one (${ext(S.cmsAppeals, "CMS")}). An <strong>external review</strong> sends the decision to an independent reviewer, so the plan no longer has the final say. HealthCare.gov says external review is available for denials that involve medical judgment, and that you generally have four months after the plan's notice or final determination to request it (${ext(S.hcExternal, "HealthCare.gov")}). Because external review is about medical judgment, it rarely helps against a plain benefit exclusion. Your denial letter states your plan's exact deadlines and process; follow those. ${ext(S.hcAppeal, "HealthCare.gov's appeals page")} also points to state consumer assistance programmes that help people file.</p>
<h3>Making an appeal stronger</h3>
<ol>
<li>Ask the plan for the specific criteria the reviewer applied and the reason for denial in writing.</li>
<li>Ask your prescriber to address each criterion directly, with dated records rather than a general statement.</li>
<li>If you have a covered condition such as established cardiovascular disease, sleep apnea or MASH, make sure the request and the diagnosis code reflect it, when your clinician agrees it applies.</li>
<li>Ask for an expedited review if a delay would seriously harm your health; urgent cases can move faster.</li>
<li>Keep copies of everything and note each call: date, name, reference number.</li>
</ol>
<p>An appeal can take weeks. If you are mid-treatment, talk to your prescriber early about how to avoid a gap, and do not ration or stretch doses to make a supply last. That is a clinical decision, and the labels do not support it.</p>`,
    },
    {
      heading: "What does Medicare's $50 GLP-1 Bridge mean for 2027?",
      body: `<p>For people on Medicare, 2027 looks better than it does for many employees. Since July 1, 2026, the Medicare GLP-1 Bridge has let eligible beneficiaries get covered obesity drugs for a flat $50 copay a month, and the programme runs through December 31, 2027 (${ext(S.cmsBridgePr, "CMS")}; ${ext(S.cmsBridge, "CMS Bridge page")}). The drugs named in reporting on the programme are the Wegovy pill and injection, the Zepbound KwikPen and Foundayo, and the $50 does not rise as the dose does (${ext(S.stlpr, "NPR via St. Louis Public Radio")}; ${ext(S.wlrn, "NPR via WLRN")}).</p>
<h3>Why the Bridge runs through 2027</h3>
<p>The Bridge was meant to lead into a longer-term arrangement called the BALANCE model. In April 2026, CMS said the Part D portion of BALANCE would not go ahead in 2027 because not enough Part D plans agreed to take part, and extended the Bridge instead (${ext(S.ahaBalance, "American Hospital Association, April 22, 2026")}). Because the Bridge sits outside the Part D benefit, it does not depend on your plan sponsor opting in. KFF has noted that it is uncertain how beneficiaries will keep coverage of these drugs for obesity after the Bridge ends at the end of 2027 (${ext(S.kffBalance, "KFF")}).</p>
<h3>Who qualifies</h3>
<p>Eligibility runs through clinical criteria and an approval step. We have not seen the full eligibility rules in a form we can verify, so we will not summarise them; CMS's page and your Part D plan are the right sources. Our guide to <a href="/weight-loss/articles/glp1-after-65-medicare">GLP-1s after 65</a> covers the questions to ask. Medicare does not cover compounded GLP-1s under the Bridge or anywhere else.</p>
<h3>What to do in this Open Enrollment</h3>
<ul>
<li>Keep or choose Part D coverage (a stand-alone drug plan or a Medicare Advantage plan with drug coverage), since the Bridge is for Part D enrollees; confirm this with your plan.</li>
<li>Ask your plan whether you are eligible for the GLP-1 Bridge and what documentation the approval needs from your prescriber.</li>
<li>If you take a GLP-1 for diabetes, it is covered under Part D's normal rules, not the Bridge; check its tier in the 2027 formulary.</li>
<li>Make Open Enrollment changes by December 7 for a January 1 start (${ext(S.medicareOe, "Medicare.gov")}).</li>
</ul>
<p>Retirees on employer or state retiree plans should check both sets of rules. Massachusetts, for example, treated Medicare and non-Medicare members differently in its 2026 change (${ext(S.wgbhMass, "WGBH")}).</p>`,
    },
    {
      heading: "What are direct-to-employer GLP-1 programmes, and can they replace coverage?",
      body: `<p>A new middle route appeared in 2026. Instead of covering a GLP-1 through the insurance plan, some employers contribute to its cost through a manufacturer-direct channel outside the plan. Both manufacturers have built one.</p>
<h3>Lilly Employer Connect</h3>
<p>Eli Lilly launched a direct-to-employer programme for Zepbound in March 2026. Employers buy the Zepbound KwikPen at a flat monthly price across doses and decide how to split the cost with employees, through third-party administrators that at launch included GoodRx, Mark Cuban Cost Plus Drug Company and Teladoc Health (${ext(S.lillyEmployer, "CNBC, March 5, 2026")}). What an employee pays depends on the share the employer chooses to cover.</p>
<h3>Novo Nordisk and Andel</h3>
<p>On October 28, 2026, the direct-to-employer marketplace Andel announced a collaboration with Novo Nordisk to bring the Wegovy injection and Wegovy pill to employers. The company says employers contribute an amount of their choosing, members get manufacturer-direct pricing, and Andel handles prescription verification through delivery (${ext(S.andel, "Andel press release")}). ${ext(S.ajmc, "AJMC")} described it as a workaround for employers pulling back on coverage. These are company descriptions; we have not seen independent data on what employees pay.</p>
<h3>What to ask</h3>
<ul>
<li>Does my employer offer or contribute to one of these programmes in 2027, and how much does it contribute per month?</li>
<li>What will I pay at each dose, and does that change during the year?</li>
<li>Who prescribes, and can my current prescriber continue?</li>
<li>Can I pay my share with HSA or FSA money?</li>
</ul>
<p>The IFEBP found 27% of employers already encourage employees to obtain GLP-1s through a direct-to-consumer platform (${ext(S.ifebp, "IFEBP")}). Whether that is a helpful alternative or a cost shift depends on the contribution. An employer that pays a meaningful share through a direct programme may leave you better off than a plan with a high deductible; one that only points you to a website has not replaced coverage.</p>`,
    },
    {
      heading: "Every route if your plan drops coverage",
      body: `<p>When the formulary says no, six routes remain. They differ by an order of magnitude in price and also in what you are buying, so the cost basis and the caveats belong in the same row. Prices below are the providers' and manufacturers' published figures as they appear on this site; provider rows come from our <a href="/weight-loss/cheapest-glp1">verified price index</a>.</p>
<table>
<thead><tr><th>Route</th><th>Product</th><th>Cost basis</th><th>Main caveats</th></tr></thead>
<tbody>
<tr><td>Appeal or re-authorise under your plan</td><td>Brand Wegovy or Zepbound</td><td>Your copay or coinsurance after deductible</td><td>Only works when the drug is still covered and the issue is criteria, or when another covered indication applies</td></tr>
<tr><td>Medicare GLP-1 Bridge</td><td>Wegovy pill and injection, Zepbound KwikPen, Foundayo</td><td>$50 a month flat, through December 31, 2027 (${ext(S.cmsBridge, "CMS")})</td><td>Medicare Part D enrollees only; clinical criteria and approval; temporary</td></tr>
<tr><td>Direct-to-employer programme</td><td>Zepbound KwikPen (Lilly Employer Connect) or Wegovy (Andel with Novo Nordisk)</td><td>Depends on your employer's contribution; we have not verified employee prices</td><td>Only if your employer takes part</td></tr>
<tr><td>Manufacturer savings offer with commercial coverage</td><td>Brand pills and pens</td><td>Reported as low as $25 a month for the Wegovy pill where your plan covers it; Foundayo $25 with commercial insurance (${ext(S.sciamFoundayo, "Scientific American")})</td><td>Eligibility rules apply; government-plan members excluded; we have not verified current Zepbound and Wegovy pen card terms</td></tr>
<tr><td>Brand-name for cash</td><td>Wegovy, Zepbound, Ozempic; Wegovy pill; Foundayo</td><td>Pens $1,149-$1,799 a month at providers we track; Ro's Wegovy pill $149 first month, then $299, plus membership; Foundayo $149-$349 self-pay by dose (reported)</td><td>The FDA-approved product with no change; the most expensive route</td></tr>
<tr><td>Compounded semaglutide or tirzepatide</td><td>Pharmacy-prepared, same active ingredient</td><td>Semaglutide from $41 a month (12-month plan, sale) and tirzepatide from $71 (sale) at verified prices</td><td>Not FDA-approved, no trials of its own, never covered by insurance or Medicare; ask which pharmacy fills it</td></tr>
</tbody>
</table>
<h3>Brand-name cash, in detail</h3>
<p>At our last verification, <a href="/weight-loss/reviews/altrx">altRx</a> lists Zepbound at $1,249 a month, Wegovy at $1,579 and Ozempic at $1,149; <a href="/weight-loss/reviews/wellmedr">welludr</a> lists Zepbound at $1,599 and Ozempic at $1,399; and <a href="/weight-loss/reviews/sprout">Sprout</a> lists Wegovy at $1,799. <a href="/weight-loss/reviews/ro">Ro</a> sells the Zepbound KwikPen from $299 for the first month, then $399-$449 a month, plus its membership of $39 for the first month and then $74-$149 a month, prices verified in August 2026. Because Ro bills the medication separately, a plan that still covers the drug can pay its share. The full ladder is in <a href="/weight-loss/articles/zepbound-price-online">what Zepbound costs online</a>.</p>
<h3>The pills</h3>
<p>The two FDA-approved GLP-1 pills sit between the pens and compounded injections at cash prices. Ro sells the Wegovy pill at $149 for the first month and $299 a month after, plus the same membership; Novo Nordisk's direct-pay tiers are reported by third-party trackers in the same $149-$299 range, which we have not verified. Eli Lilly's Foundayo lists $149 to $349 a month self-pay by dose through LillyDirect, as reported by ${ext(S.sciamFoundayo, "Scientific American")}. Details are in <a href="/weight-loss/articles/wegovy-pill-price-online">the Wegovy pill price guide</a>.</p>
<h3>Manufacturer direct pens and vials</h3>
<p>Both manufacturers also sell their injectable weight-loss drugs direct to self-paying patients: Lilly through LillyDirect, including Zepbound in single-dose vials, and Novo Nordisk through its NovoCare Pharmacy. We have not published verified prices for those injectable self-pay offers, so we do not quote them here; check the manufacturer's page for your dose and get the price for the dose you will stay on, not only the first fill.</p>
<h3>Compounded</h3>
<p>At verified published prices, compounded semaglutide runs from $41 a month at welludr (12-month plan, pre-Black Friday sale) and $49 at <a href="/weight-loss/reviews/embody">embody</a> (month to month, sale) up to $199, and compounded tirzepatide from $71 (welludr, sale) and $99 (embody, sale) up to $299. The trade-offs are covered below and in <a href="/weight-loss/articles/compounded-semaglutide-vs-brand-name">compounded vs brand-name</a>.</p>`,
    },
    {
      heading: "What does a year of GLP-1 treatment cost on each route in 2027?",
      body: `<p>Monthly prices hide the number that matters for a plan decision, which is the annual total. The table below multiplies each verified monthly figure by twelve, or adds a first month and eleven later months where the price steps up, and states the condition attached to each price. It is a price comparison, not a recommendation: the routes are not equivalent products, and the cheapest row is not the right one for everyone.</p>
<table>
<thead><tr><th>Route and provider</th><th>Monthly price and condition</th><th>Arithmetic</th><th>12-month total</th></tr></thead>
<tbody>
<tr><td>Medicare GLP-1 Bridge</td><td>$50 copay, if eligible; runs through December 31, 2027</td><td>12 x $50</td><td>$600</td></tr>
<tr><td>Compounded semaglutide, welludr</td><td>$41, 12-month plan; pre-Black Friday sale (October 28, 2026), no end date stated</td><td>12 x $41</td><td>$492</td></tr>
<tr><td>Compounded semaglutide, embody</td><td>$49 sale (October 28, 2026), month to month; regular $79</td><td>12 x $49; at regular price 12 x $79</td><td>$588 at sale price; $948 at regular price</td></tr>
<tr><td>Compounded semaglutide, altRx</td><td>$89 listed; regular $199; flat at every dose</td><td>12 x $89; at regular price 12 x $199</td><td>$1,068; $2,388 at regular price</td></tr>
<tr><td>Compounded semaglutide, Medvi</td><td>$99 promo, all-inclusive; regular $199</td><td>12 x $99; at regular price 12 x $199</td><td>$1,188; $2,388 at regular price</td></tr>
<tr><td>Compounded semaglutide, HealthRx</td><td>$99 a month on a 12-month prepaid plan</td><td>$1,188 at checkout</td><td>$1,188</td></tr>
<tr><td>Compounded tirzepatide, welludr</td><td>$71 sale (October 28, 2026); shipped every 4 weeks</td><td>12 x $71; if billed per 4-week shipment, 13 x $71</td><td>$852; $923 at 13 shipments</td></tr>
<tr><td>Compounded tirzepatide, embody</td><td>$99 sale, month to month; regular $129</td><td>12 x $99; at regular price 12 x $129</td><td>$1,188; $1,548 at regular price</td></tr>
<tr><td>Compounded tirzepatide, altRx</td><td>$149 listed; regular $299</td><td>12 x $149; at regular price 12 x $299</td><td>$1,788; $3,588 at regular price</td></tr>
<tr><td>Compounded semaglutide or tirzepatide, DirectMeds</td><td>$147 flat at every dose</td><td>12 x $147</td><td>$1,764</td></tr>
<tr><td>Wegovy pill, Ro</td><td>$149 first month, then $299; membership $39 first month, then $74-$149 (verified August 2026)</td><td>$149 + 11 x $299 = $3,438; membership $39 + 11 x $74 = $853 to $39 + 11 x $149 = $1,678</td><td>$4,291 to $5,116</td></tr>
<tr><td>Foundayo, LillyDirect self-pay (reported)</td><td>$149 to $349 by dose</td><td>12 x $149 to 12 x $349</td><td>$1,788 to $4,188, depending on dose</td></tr>
<tr><td>Zepbound KwikPen, Ro</td><td>$299 first month, then $399-$449; plus membership as above</td><td>$299 + 11 x $399 = $4,688 to $299 + 11 x $449 = $5,238; plus $853 to $1,678</td><td>$5,541 to $6,916</td></tr>
<tr><td>Zepbound, altRx</td><td>$1,249 cash</td><td>12 x $1,249</td><td>$14,988</td></tr>
<tr><td>Zepbound, welludr</td><td>$1,599 cash</td><td>12 x $1,599</td><td>$19,188</td></tr>
<tr><td>Wegovy, altRx</td><td>$1,579 cash</td><td>12 x $1,579</td><td>$18,948</td></tr>
<tr><td>Wegovy, Sprout</td><td>$1,799 cash</td><td>12 x $1,799</td><td>$21,588</td></tr>
</tbody>
</table>
<h3>How to use the table</h3>
<ul>
<li><strong>Sale prices may not last the year.</strong> The welludr and embody figures are pre-Black Friday sale prices with no end date stated. Where a regular price is published, we show the annual total at that price as well, so you can budget for the worse case. Our <a href="/weight-loss/black-friday-glp1-deals">Black Friday GLP-1 deals</a> page tracks the windows as providers publish them.</li>
<li><strong>Dose changes matter on some routes and not others.</strong> Several compounded prices are flat at every dose, which keeps the total predictable. The pills and Ro's pens step up after the first month, and Foundayo's reported price rises with the dose.</li>
<li><strong>Insurance totals are personal.</strong> If your plan still covers the drug, your annual cost is your copays or coinsurance until the out-of-pocket maximum, which only your plan's documents can give you. Price that number and set it against the rows above.</li>
<li><strong>Premiums are part of the comparison.</strong> If choosing a plan that covers the drug costs more in premiums, add the difference to that route's total before you compare.</li>
</ul>
<h3>A worked example</h3>
<p>Take an employee whose 2026 plan covered Zepbound and whose 2027 plan excludes it. Staying on brand-name tirzepatide for cash costs $14,988 over 2027 at altRx's published price. Ro's KwikPen route costs $5,541 to $6,916 with membership. Compounded tirzepatide costs $852 at welludr's sale price, or $1,188 to $1,548 at embody depending on whether its sale price holds. The gap between the brand cash route and the cheapest compounded route is $14,136 a year ($14,988 minus $852). That gap is the price of staying on the FDA-approved product, and only the employee, with a clinician, can decide whether it is worth paying. Our <a href="/weight-loss/glp1-cost-calculator">cost calculator</a> runs the same arithmetic for any provider and dose.</p>`,
    },
    {
      heading: "Can you use an HSA or FSA to pay for a GLP-1 in 2027?",
      body: `<p>Usually, for a prescribed medicine used to treat a diagnosed condition. The IRS treats the cost of a weight-loss programme as a medical expense only when it treats a specific disease diagnosed by a physician, such as obesity, diabetes, hypertension or heart disease; a programme for general health or appearance does not qualify (${ext(S.irs, "IRS, March 2023")}). Prescription medicines for a diagnosed condition are generally qualified expenses. ${ext(S.cnbc, "CNBC's October 2026 report")} lists using FSA or HSA money for medically necessary GLP-1s among the options for workers losing coverage.</p>
<h3>Why it matters during open enrollment</h3>
<p>If you expect to pay cash for some or all of 2027, the amount you elect for a health FSA, or plan to contribute to an HSA, is set or planned now. Pre-tax money reduces the effective cost of any route in the year-cost table by your marginal tax rate. Ask your benefits team about your FSA's rules for unused balances before you elect, because over-electing can cost you money.</p>
<h3>What to check</h3>
<ul>
<li><strong>Whether your administrator accepts the expense.</strong> Some administrators ask for a letter of medical necessity for weight-related prescriptions. Ask before you rely on the card.</li>
<li><strong>Whether the provider accepts the card.</strong> In our price index, <a href="/weight-loss/reviews/medvi">Medvi</a> lists HSA/FSA payment and <a href="/weight-loss/reviews/shed">SHED</a> describes its plans as HSA/FSA approved. Other providers may accept cards too; check at checkout.</li>
<li><strong>Bundled fees.</strong> A telehealth price that bundles the clinician visit, medication and shipping is easier to document than a membership fee alone. Keep itemised receipts.</li>
<li><strong>HSA eligibility.</strong> You can contribute to an HSA only with a qualifying high-deductible health plan, so the plan you choose this month decides whether an HSA is available.</li>
</ul>
<p>This is general information about how the rules are framed, not tax advice. Your plan administrator and, for complex situations, a tax professional decide what qualifies for you.</p>`,
    },
    {
      heading: "Is compounded semaglutide or tirzepatide a safe substitute for lost coverage?",
      body: `<p>It is the route most people who lose coverage consider, because the prices are a small fraction of brand cash prices. It is a different kind of product, and that should be understood before the price is.</p>
<h3>What a compounded GLP-1 is</h3>
<p>A compounded GLP-1 contains the same active ingredient as the brand drug but is prepared by a pharmacy for an individual prescription rather than manufactured as an FDA-approved product. The FDA does not review compounded drugs for safety, effectiveness or quality before they are sold, and it has set out its concerns about unapproved GLP-1 products used for weight loss (${ext(S.fdaCompounded, "FDA")}). In 2026 the agency sent warning letters to telehealth companies objecting to marketing that described compounded products as generic versions of the brand drugs or as coming from an "FDA-approved pharmacy" (${ext(S.fdaWarnings, "Mondaq")}). Compounded products have no trials of their own, and no insurer or Medicare programme pays for them.</p>
<h3>What a legitimate route looks like</h3>
<ul>
<li>A licensed clinician reviews your history and decides whether to prescribe, and at what dose. No guaranteed approval.</li>
<li>The provider names the pharmacy that fills the prescription and its state licence, which you can check on the state board's website. Our guide to <a href="/weight-loss/articles/503a-vs-503b-pharmacy-28-day-rule">503A and 503B pharmacies</a> explains the difference.</li>
<li>The vial carries a beyond-use date and arrives cold-packed.</li>
<li>The price is published, with the plan length and any promotion stated.</li>
</ul>
<h3>The providers in our index</h3>
<p>The providers in our <a href="/weight-loss/cheapest-glp1">verified price index</a> each have genuine strengths for someone leaving a covered plan. welludr has the lowest ongoing price, flat at every dose, on a 12-month plan. embody is the cheapest with no commitment and ships in one to two days. altRx and DirectMeds keep one price at every dose, which makes the annual total predictable as the dose rises. Medvi includes clinician visits, a dietitian and coaching in its all-inclusive price, and SHED includes coaching with a money-back guarantee tied to results. A person leaving a covered brand drug should tell the new prescriber their current drug, dose and date of last injection; whether to continue at a similar dose or step down is the clinician's decision.</p>
<h3>What not to do</h3>
<p>Losing coverage is not a reason to leave the licensed system. "Research peptides" and vials sold without a prescription are not compounded medicines, carry no pharmacy accountability, and are outside anything a clinician can supervise.</p>`,
    },
    {
      heading: "Who this guide is for, and who it isn't for",
      body: `<p>This guide is for:</p>
<ul>
<li>Employees choosing a 2027 plan who take, or plan to start, Wegovy or Zepbound for weight management.</li>
<li>People who have been told their employer, state plan or Medicaid programme is ending coverage and want to plan a year ahead.</li>
<li>Medicare beneficiaries deciding what to do in Open Enrollment before December 7.</li>
<li>HR and benefits staff who want the survey figures in one place with their sources.</li>
</ul>
<p>It is not for:</p>
<ul>
<li><strong>Anyone looking for a way to qualify for coverage they do not meet.</strong> A covered indication such as sleep apnea or established heart disease needs a real diagnosis made by a clinician. Misstating a condition to a plan is not a route we describe.</li>
<li><strong>Anyone thinking of stretching, splitting or skipping doses to make a supply last.</strong> Dosing follows the label and the prescriber's plan. Our guide to <a href="/weight-loss/articles/stopping-glp1-weight-regain-complete-guide">stopping a GLP-1 and weight regain</a> covers what the evidence says about stopping.</li>
<li><strong>People taking a GLP-1 for type 2 diabetes,</strong> whose coverage is usually unaffected by the cuts described here. Check your formulary, but do not assume the weight-loss changes apply to you.</li>
<li><strong>Anyone wanting tax or legal advice</strong> on HSA, FSA or appeal rights in a specific case.</li>
</ul>`,
    },
    {
      heading: "What we don't know yet about 2027 coverage",
      body: `<p>Honest limits, because several of the numbers above will move.</p>
<ul>
<li><strong>How many employers will actually drop coverage.</strong> The WTW and Mercer figures for 2027 are about employers "considering" or "planning" a change in surveys fielded months before open enrollment. Final plan decisions may be larger or smaller.</li>
<li><strong>Whether the surveys represent your employer.</strong> The consultancy and Business Group on Health samples skew toward large employers. Small employers, which KFF's survey shows cover these drugs far less often, are under-represented in the headline figures.</li>
<li><strong>What lower list prices do to net costs.</strong> Mercer and others expect lower list prices to be offset partly by lower rebates. Whether that makes coverage cheaper for employers in practice will not be clear until 2027 claims come in (${ext(S.mercerNovo, "Mercer")}).</li>
<li><strong>What direct-to-employer programmes cost employees.</strong> The Lilly and Novo channels are new and the employee share depends on each employer. We have not seen independent data.</li>
<li><strong>What happens to Medicare coverage after 2027.</strong> The Bridge ends on December 31, 2027. CMS has said it will gather more data before any Part D rollout of the BALANCE model, and KFF calls the post-2027 picture uncertain (${ext(S.kffBalance, "KFF")}).</li>
<li><strong>How long sale prices last.</strong> The lowest compounded figures in our tables are sale prices with no end date stated. We re-verify the index and log every change.</li>
<li><strong>Some survey details come from summaries.</strong> Where a figure, such as KFF's firm-size breakdown or the IFEBP claims share, reached us through a summary of the report rather than the report itself, we have said so. If the full report differs, the report wins.</li>
</ul>`,
    },
    {
      heading: "Questions to ask HR, your insurer and your clinician",
      body: `<p>Three conversations, in this order.</p>
<h3>HR or the benefits team</h3>
<ol>
<li>Which 2027 plan options cover Wegovy or Zepbound for weight management, and on what terms?</li>
<li>Is there a transition period for people already on treatment?</li>
<li>Does the company offer a direct-to-employer GLP-1 programme, and how much does it contribute?</li>
<li>What are the FSA rules for unused balances, and which plans are HSA-eligible?</li>
</ol>
<h3>The insurer or PBM (number on your card)</h3>
<ol>
<li>What are the 2027 prior-authorisation criteria for each drug, in writing?</li>
<li>Is the drug covered for cardiovascular risk reduction, sleep apnea or MASH if weight management is excluded?</li>
<li>What would 12 months cost me under this plan after deductible and coinsurance?</li>
<li>If I am denied, what are the internal appeal and external review deadlines?</li>
</ol>
<h3>Your clinician</h3>
<ol>
<li>Do I have a condition, such as established heart disease, sleep apnea or MASH, that a plan would treat as a separate covered use?</li>
<li>If my coverage ends, which route do you recommend for me, and why?</li>
<li>If I switch drug or route, how will you decide my dose, and what should I tell a new prescriber?</li>
<li>If I stop altogether, what should I expect and how should we monitor it?</li>
<li>Will you write a letter of medical necessity for an appeal or for my HSA or FSA administrator?</li>
</ol>
<p>For the provider side, our <a href="/weight-loss/how-to-choose-a-glp1-provider">provider checklist</a> covers what to ask a telehealth company before you pay.</p>`,
    },
    {
      heading: "Final verdict and next steps",
      body: `<p>The data are clear about direction. Employer coverage of GLP-1s for weight loss stopped growing in 2026 and fell in several surveys: from 57% to 53% at WTW's employers, from 72% to 60% among Business Group on Health's large employers, and from 43% to 33% at the largest firms in KFF's survey as reported. Cost is the reason employers give, and demand is still rising. For 2027, expect more exclusions, more prior-authorisation rules and more employers pointing to programmes outside the plan, with diabetes coverage largely untouched.</p>
<p>For an individual, the advice is simple and time-limited: check now. Open enrollment is the one point in the year when you can see next year's rules and still choose. After that, the routes are known and their annual costs differ by more than $20,000, from a $600 year on Medicare's Bridge, if you qualify, to $21,588 for brand Wegovy at the highest cash price we track.</p>
<ol>
<li><strong>This week:</strong> find your 2027 formulary, search for Wegovy and Zepbound, and work through the checklist above. Save the pages.</li>
<li><strong>Before your window closes:</strong> compare plan options and premiums against the year-cost table, set your FSA or HSA amount, and ask HR about direct-to-employer programmes.</li>
<li><strong>If you are on Medicare:</strong> ask your Part D plan about the GLP-1 Bridge and make any changes by December 7. See <a href="/weight-loss/articles/glp1-after-65-medicare">GLP-1s after 65</a>.</li>
<li><strong>If coverage ends:</strong> start with <a href="/weight-loss/articles/lost-insurance-coverage-zepbound-wegovy">our lost-coverage guide</a>, then compare routes in <a href="/weight-loss/articles/weight-loss-medication-without-insurance">weight-loss medication without insurance</a> and the <a href="/weight-loss/cheapest-glp1">verified price ladder</a>.</li>
<li><strong>If you are weighing compounded:</strong> read <a href="/weight-loss/articles/compounded-semaglutide-vs-brand-name">compounded vs brand-name</a> first, then compare providers in the <a href="/weight-loss">full ranking</a>.</li>
<li><strong>If you want to stay on the brand:</strong> compare cash routes in <a href="/weight-loss/articles/zepbound-price-online">Zepbound price online</a> and <a href="/weight-loss/articles/wegovy-pill-price-online">Wegovy pill price online</a>.</li>
</ol>
<p><em>This article is general information about insurance coverage and prices, not medical, tax or legal advice. A licensed clinician decides whether a GLP-1 is appropriate for you and at what dose. Survey figures, programme rules and prices change; each is dated, and we re-verify.</em></p>`,
    },
    {
      heading: "References",
      body: `<ol>
<li>${ext(S.bloomberg, "GLP-1 Weight-Loss Drugs Will Be Covered for Fewer US Employees")}. Bloomberg, October 30, 2026.</li>
<li>${ext(S.wtw, "WTW 2026 Best Practices in Healthcare Survey: U.S. employer healthcare costs set to rise at fastest pace in more than two decades")}. WTW press release, October 28, 2026.</li>
<li>${ext(S.wallst, "16% of Employers Are Thinking About Cutting Weight-Loss Drug Coverage")}. 24/7 Wall St., October 28, 2026.</li>
<li>${ext(S.cnbc, "GLP-1 drug coverage is being dropped by employer plans: What to know about 2027 weight-loss options")}. CNBC, October 27, 2026.</li>
<li>${ext(S.gallup, "In U.S., GLP-1 Usage Reaches New High")}. Gallup, 2026.</li>
<li>${ext(S.kff, "2026 Employer Health Benefits Survey")}. KFF, 2026.</li>
<li>${ext(S.kffX, "KFF summary of GLP-1 coverage findings, 2026 Employer Health Benefits Survey")}. KFF, 2026.</li>
<li>${ext(S.mercerGlp, "Employers are shifting health care costs to employees (Survey on Health and Benefit Strategies for 2027)")}. Mercer, June 11, 2026.</li>
<li>${ext(S.mercerCost, "Employers expect health benefit costs to jump in 2027")}. Mercer (Marsh), 2026.</li>
<li>${ext(S.fierceMarsh, "Employers' health benefits costs could rise 8.2% in 2027: Marsh survey")}. Fierce Healthcare, 2026.</li>
<li>${ext(S.mercerNovo, "Novo Nordisk's GLP-1 list price cut. What to watch next")}. Mercer, 2026.</li>
<li>${ext(S.bghStrategy, "Cost Volatility Forces Employers To Reassess Healthcare Strategy (2027 Employer Healthcare Strategy Survey)")}. Business Group on Health, August 25, 2026.</li>
<li>${ext(S.reutersBgh, "More US Employers to Drop Weight-Loss Drugs in 2027, as Healthcare Costs Increase")}. Reuters via U.S. News, August 25, 2026.</li>
<li>${ext(S.bghBlog, "How Are Employers Managing GLP-1 Coverage Amid Rising Demand and Costs?")}. Business Group on Health blog, 2026.</li>
<li>${ext(S.bghGlp, "GLP-1 Costs Loom Large for Employers, Forcing Challenging Coverage Decisions")}. Business Group on Health, June 10, 2026.</li>
<li>${ext(S.ifebp, "GLP-1 Drugs Survey Report: What Employers Are and Aren't Covering in 2026")}. International Foundation of Employee Benefit Plans, July 2026.</li>
<li>${ext(S.wgbhMass, "Weight loss drugs will no longer be covered by Mass. state workers' health insurance")}. WGBH, February 26, 2026.</li>
<li>${ext(S.beckersMass, "Massachusetts state employee health plan to drop GLP-1 coverage")}. Becker's Payer Issues, 2026.</li>
<li>${ext(S.massGov, "June update on Vida Health program and GLP-1 coverage")}. Massachusetts Group Insurance Commission, June 2026.</li>
<li>${ext(S.ncWfae, "North Carolina State Health Plan ends coverage of Wegovy and other weight-loss drugs")}. WFAE, January 23, 2024.</li>
<li>${ext(S.ncWral, "Expected NC budget won't restore GLP-1 weight-loss drug coverage for state employees, treasurer says")}. WRAL, 2026.</li>
<li>${ext(S.ohio, "Ohio to end GLP-1 drug weight loss coverage for state workers")}. CW Columbus, 2025.</li>
<li>${ext(S.medicaidKhn, "States retreat from covering drugs for weight loss")}. KFF Health News via Medical Xpress, December 2025.</li>
<li>${ext(S.stateline, "More states consider dropping GLP-1 weight loss drugs from Medicaid")}. Stateline, April 30, 2026.</li>
<li>${ext(S.walmart, "Walmart employee benefits add no-cost GLP-1s in 2027")}. CNBC, October 13, 2026.</li>
<li>${ext(S.lillyEmployer, "Eli Lilly launches program to help boost employer coverage of obesity drugs in U.S.")}. CNBC, March 5, 2026.</li>
<li>${ext(S.andel, "Andel Collaborates With Novo To Bring Wegovy Injection and Wegovy Pill Direct-to-Employers")}. Andel press release (PR Newswire), October 28, 2026.</li>
<li>${ext(S.ajmc, "As Employers Pull Back on GLP-1s, Andel and Novo Offer a Workaround")}. AJMC, 2026.</li>
<li>${ext(S.cmsBridge, "Medicare GLP-1 Bridge")}. Centers for Medicare and Medicaid Services.</li>
<li>${ext(S.cmsBridgePr, "Coming Soon: CMS to Provide $50 Monthly Access to GLP-1 Medications for Medicare Beneficiaries")}. CMS press release, 2026.</li>
<li>${ext(S.stlpr, "A new Medicare option for weight-loss drugs is coming. Here's what to know")}. NPR via St. Louis Public Radio, May 6, 2026.</li>
<li>${ext(S.wlrn, "Some Medicare beneficiaries can now get popular obesity drugs for $50 a month")}. NPR via WLRN, May 6, 2026.</li>
<li>${ext(S.ahaBalance, "CMS delays Part D portion of BALANCE Model on expansion of GLP-1 access")}. American Hospital Association, April 22, 2026.</li>
<li>${ext(S.kffBalance, "What to Know About the BALANCE Model for GLP-1s in Medicare and Medicaid and the Medicare GLP-1 Bridge")}. KFF, 2026.</li>
<li>${ext(S.medicareOe, "Open Enrollment")}. Medicare.gov.</li>
<li>${ext(S.nprAca, "It's ACA open enrollment time. Here are the changes for health insurance shoppers")}. NPR, November 1, 2026.</li>
<li>${ext(S.hcAppeal, "How to appeal an insurance company decision")}. HealthCare.gov.</li>
<li>${ext(S.hcExternal, "External review")}. HealthCare.gov.</li>
<li>${ext(S.cmsAppeals, "Has Your Health Insurer Denied Payment for a Medical Service? You Have a Right to Appeal")}. CMS fact sheet.</li>
<li>${ext(S.irs, "IRS addresses questions about medical expenses related to nutrition, wellness and general health")}. Internal Revenue Service, IR-2023-47, March 17, 2023.</li>
<li>${ext(S.wegovyLabel, "Wegovy (semaglutide) injection prescribing information")}. US Food and Drug Administration.</li>
<li>${ext(S.fdaZepbound, "FDA Approves New Medication for Chronic Weight Management")}. FDA, November 2023.</li>
<li>${ext(S.fdaSelect, "FDA Approves First Treatment to Reduce Risk of Serious Heart Problems Specifically in Adults with Obesity or Overweight")}. FDA, March 8, 2024.</li>
<li>${ext(S.fdaOsa, "FDA Approves First Medication for Obstructive Sleep Apnea")}. FDA, December 20, 2024.</li>
<li>${ext(S.mash, "FDA grants accelerated approval of Wegovy to treat liver disease")}. Managed Healthcare Executive, August 18, 2025.</li>
<li>${ext(S.fdaCompounded, "FDA's concerns with unapproved GLP-1 drugs used for weight loss")}. FDA.</li>
<li>${ext(S.fdaWarnings, "FDA takes aim at misleading online claims for compounded GLP-1 drugs")}. Mondaq, 2026.</li>
<li>${ext(S.sciamFoundayo, "How Eli Lilly's new GLP-1 pill stacks up against Wegovy and other weight-loss drugs")}. Scientific American, 2026.</li>
</ol>
<p>Provider prices are from our verified price index (last full verification October 16, 2026, with sale changes logged October 28, 2026) and, for Ro, from its published pricing in August 2026. They are the providers' own published figures; see the <a href="/weight-loss/glp1-price-changes">price change log</a> for every update.</p>`,
    },
  ],
};
