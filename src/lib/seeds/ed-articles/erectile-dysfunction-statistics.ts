import type { ArticleData } from "../../config";

// ───── Erectile dysfunction statistics (Nov 2, 2026) ─────
// Data-led reference page for treatmentshub.com/ed: how common erectile
// dysfunction is by age, how often new cases appear, which conditions raise
// the odds, how ED relates to heart disease, how many men are treated, and how
// well the pills work. Sourcing rules: every figure carries its source, year
// and population in the text or table, and links the paper, its PubMed record
// or a dated report of it. Where a figure comes from an abstract summary,
// press release, company survey or a third-party copy of a label, the text
// says so. Where studies disagree, the page shows the range and explains why.
// The heart-risk figures (Dong 2011 via the 2021 umbrella review, Vlachopoulos
// 2013, Montorsi, Princeton IV) are cited exactly as in ed-articles-2026-10.ts.
// Costs are copied from src/lib/ed-cost-index.ts and ed.ts with their basis
// and conditions; no new prices. No dose instructions; the prescriber decides.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  // Prevalence and incidence
  mmas: "https://pubmed.ncbi.nlm.nih.gov/8254833/",
  johannes: "https://pubmed.ncbi.nlm.nih.gov/10647654/",
  selvin: "https://pubmed.ncbi.nlm.nih.gov/17275456/",
  selvinJhu: "https://publichealth.jhu.edu/2007/selvin-erectile-dysfunction",
  ayta: "https://pubmed.ncbi.nlm.nih.gov/10444124/",
  kessler: "https://doi.org/10.1111/bju.14813",
  kesslerKcl: "https://www.kcl.ac.uk/news/the-global-prevalence-of-erectile-dysfunction",
  emas: "https://doi.org/10.1111/j.1743-6109.2009.01601.x",
  gssab: "https://pubmed.ncbi.nlm.nih.gov/15533492/",
  gssabProblems: "https://pubmed.ncbi.nlm.nih.gov/15215881/",
  hyde: "https://pubmed.ncbi.nlm.nih.gov/22145992/",
  laumann: "https://pubmed.ncbi.nlm.nih.gov/10022110/",
  laumannChicago: "https://chronicle.uchicago.edu/990218/dysfunction.shtml",
  bacon2003: "https://pubmed.ncbi.nlm.nih.gov/12899583/",
  bacon2006: "https://pubmed.ncbi.nlm.nih.gov/16753404/",
  niddkArchived: "https://webarchive.library.unt.edu/web/20130217071201/http:/kidney.niddk.nih.gov/KUDiseases/pubs/ED/index.aspx",
  niddkCauses: "https://www.niddk.nih.gov/health-information/urologic-diseases/erectile-dysfunction/symptoms-causes",
  niddkDiabetes: "https://www.niddk.nih.gov/health-information/diabetes/overview/preventing-problems/sexual-bladder-problems",
  // Young men
  capogrosso: "https://www.urotoday.com/recent-abstracts/men-s-health/erectile-dysfunction/63258-one-patient-out-of-four-with-newly-diagnosed-erectile-dysfunction-is-a-young-man-worrisome-picture-from-the-everyday-clinical-practice-abstract.html",
  capogrossoRelease: "https://www.eurekalert.org/news-releases/757639",
  mialon: "https://pubmed.ncbi.nlm.nih.gov/22727073/",
  nguyen: "https://pubmed.ncbi.nlm.nih.gov/28642047/",
  // Risk factors
  kouidrat: "https://pubmed.ncbi.nlm.nih.gov/28722225/",
  kitaw: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11472474/",
  wangHtn: "https://link.springer.com/article/10.1038/s41443-018-0020-z",
  cao2013: "https://doi.org/10.1371/journal.pone.0060443",
  cao2014: "https://pubmed.ncbi.nlm.nih.gov/25052869/",
  liuDepression: "https://pubmed.ncbi.nlm.nih.gov/29960891/",
  liuDepressionAbstract: "https://urotoday.com/recent-abstracts/men-s-health/erectile-dysfunction/105576-erectile-dysfunction-and-depression-a-systematic-review-and-meta-analysis.html",
  msam7: "https://pubmed.ncbi.nlm.nih.gov/14644114/",
  esposito: "https://pubmed.ncbi.nlm.nih.gov/15213209/",
  // Heart (same sources as ed-articles-2026-10.ts, plus Thompson 2005)
  thompson: "https://pubmed.ncbi.nlm.nih.gov/16414947/",
  umbrella: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8359379/",
  vlachopoulos: "https://www.ahajournals.org/doi/10.1161/circoutcomes.112.966903",
  montorsiEd: "https://www.cardiologicomonzino.it/doc/1646/9e5285445d53429bb846d7e49cbd6718/",
  princeton: "https://www.sciencedirect.com/science/article/abs/pii/S0025619624002763",
  // Treatment rates and outcomes
  frederick: "https://pubmed.ncbi.nlm.nih.gov/25059314/",
  frederickReport: "https://www.news-medical.net/news/20130319/Study-Despite-high-erectile-dysfunction-prevalence-most-patients-remain-untreated.aspx",
  shabsigh: "https://pubmed.ncbi.nlm.nih.gov/15541128/",
  moreira: "https://www.arca.fiocruz.br/handle/icict/3241",
  goodrx: "https://www.goodrx.com/healthcare-access/research/erectile-dysfunction-treatment-gap",
  goldstein: "https://pubmed.ncbi.nlm.nih.gov/9580646/",
  viagraLabelCopy: "https://medlibrary.org/lib/rx/meds/viagra-1/page/6/",
  viagraLabel: "https://labeling.pfizer.com/ShowLabeling.aspx?id=652",
  porst: "https://pubmed.ncbi.nlm.nih.gov/12837435/",
  coronaDropout: "https://www.urotoday.com/recent-abstracts/men-s-health/erectile-dysfunction/91173-first-generation-phosphodiesterase-type-5-inhibitors-dropout-a-comprehensive-review-and-meta-analysis.html",
  coronaDropoutDoi: "https://doi.org/10.1111/andr.12255",
  aua: "https://www.auanet.org/documents/Guidelines/PDF/ED-JU.pdf",
  auaPubmed: "https://pubmed.ncbi.nlm.nih.gov/29746858/",
};

const CHECKED = "checked November 2, 2026";

export const ED_STATISTICS_ARTICLE: ArticleData = {
  slug: "erectile-dysfunction-statistics",
  title: "Erectile Dysfunction Statistics 2026: Prevalence by Age",
  description:
    "ED prevalence by age from MMAS, NHANES and EMAS, risk-factor odds, heart-risk data, treatment rates and pill response rates, each with source and year.",
  category: "Science",
  readTime: "32 min read",
  publishedAt: "2026-11-02",
  updatedAt: "2026-11-02",
  heroColor: "#1c3247",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "How common ED is depends on how it is measured. The Massachusetts Male Aging Study found some degree of ED in 52% of men aged 40 to 70 (surveyed 1987 to 1989), while a national US survey (NHANES 2001-2002) found 18.4% of men aged 20 and over, about 18 million men, using a stricter single question. A 2019 review found published estimates ranging from 3% to 76.5%.",
    "Age is the strongest single predictor. In the NHANES analysis, prevalence rose from 5.1% at ages 20 to 39 to 70.2% at 70 and over; in the Massachusetts study, new cases appeared at 12.4 per 1,000 men a year in their 40s and 46.4 per 1,000 in their 60s.",
    "Diabetes, high blood pressure, obesity, smoking, inactivity and depression all raise the odds. A 2017 meta-analysis of 145 studies put ED prevalence in men with diabetes at 52.5%, and pooled cohort studies link ED to roughly a 45% to 50% higher risk of cardiovascular disease.",
    "Most men with ED are not treated. In a US insurance-claims study of 6.2 million men with an ED diagnosis (2010-2011), only 25.4% filled a prescription for treatment, and a 2016 meta-analysis found about half of men who start a PDE5 inhibitor stop within a year.",
  ],
  sections: [
    {
      heading: "How common is erectile dysfunction?",
      body: `<div class="qa"><strong>The short answer</strong><p>Very common, and more so with age. The Massachusetts Male Aging Study (1987-1989) found some degree of erectile dysfunction (ED) in 52% of men aged 40 to 70. A nationally representative US survey (NHANES 2001-2002) found ED in 18.4% of men aged 20 and over, about 18 million men, rising from 5.1% at ages 20 to 39 to 70.2% at 70 and over. Figures differ mainly because studies define ED differently. Sources: ${ext(S.mmas, "Feldman et al., 1994")}; ${ext(S.selvin, "Selvin et al., 2007")}, ${CHECKED}.</p></div>
<p>This page collects the numbers that matter about erectile dysfunction in one place, with the source, the year and the population behind each one. It is written for three kinds of reader: men who want to know whether what they are experiencing is common for their age, partners and family members trying to understand it, and writers, students and clinicians who need a figure they can cite with its context attached.</p>
<p>ED statistics are easy to misquote. A survey that asks about "any difficulty" will find several times more men affected than one that asks about "never or only sometimes able". A clinic sample of men who came in for help is not the same as a random sample of the population. A projection made in 1999 is not a count made in 2025. So each figure below comes with the details that let you judge it, and where studies disagree we show the range and say why.</p>
<h3>How this page is organised</h3>
<p>The first table gives the headline figures. The sections after it cover worldwide numbers, the US, age bands, new cases each year, men under 40, how to read ED statistics, risk factors, diabetes, the heart, treatment rates, how well the pills work, and cost. The final sections cover what the data cannot tell you, who this page is for, the questions worth taking to a clinician, and a verdict with links to our guides on treatment. References are listed in full at the end.</p>
<p>One rule runs through all of it. We report each study's figures as the study reported them. Where we relied on an abstract, a press release, a company survey or a third-party copy of a drug label rather than the full paper, we say so beside the number.</p>`,
    },
    {
      heading: "Key ED statistics at a glance",
      body: `<p>The table below is the short version of this page. Each row names the population the figure applies to, because a percentage without its population is the most common way ED statistics get misused.</p>
<table>
<thead><tr><th>Statistic</th><th>Figure</th><th>Population</th><th>Source</th><th>Year (data)</th></tr></thead>
<tbody>
<tr><td>Any degree of ED (minimal, moderate or complete)</td><td>52%</td><td>Men aged 40 to 70, Boston area, community random sample</td><td>${ext(S.mmas, "Massachusetts Male Aging Study, Feldman et al., Journal of Urology")}</td><td>1994 (1987-1989)</td></tr>
<tr><td>ED, nationally representative US estimate</td><td>18.4% (95% CI 16.2-20.7), about 18 million men</td><td>US men aged 20 and over, 2,126 NHANES participants</td><td>${ext(S.selvin, "Selvin, Burnett and Platz, American Journal of Medicine")}</td><td>2007 (2001-2002)</td></tr>
<tr><td>ED at age 70 and over</td><td>70.2%</td><td>US men in NHANES</td><td>${ext(S.selvin, "Selvin et al.")}</td><td>2007 (2001-2002)</td></tr>
<tr><td>ED, as reported in the study abstract</td><td>About 30%</td><td>3,369 men aged 40 to 79 in eight European centres</td><td>${ext(S.emas, "European Male Ageing Study, Corona et al., Journal of Sexual Medicine")}</td><td>2010</td></tr>
<tr><td>New cases of ED</td><td>25.9 per 1,000 men per year</td><td>847 Massachusetts men aged 40 to 69 without ED at baseline</td><td>${ext(S.johannes, "Johannes et al., Journal of Urology")}</td><td>2000 (1987-1997)</td></tr>
<tr><td>Men with ED worldwide</td><td>Over 152 million (1995); projected about 322 million (2025)</td><td>World male population, modelled from Massachusetts rates</td><td>${ext(S.ayta, "Ayta, McKinlay and Krane, BJU International")}</td><td>1999 (projection)</td></tr>
<tr><td>Range of published prevalence estimates</td><td>3% to 76.5%</td><td>Studies worldwide</td><td>${ext(S.kessler, "Kessler et al., BJU International")}</td><td>2019</td></tr>
<tr><td>New ED patients aged 40 or under</td><td>26% (114 of 439)</td><td>Men seeking first care for ED at one clinic in Milan</td><td>${ext(S.capogrosso, "Capogrosso et al., Journal of Sexual Medicine")}</td><td>2013 (2010-2012)</td></tr>
<tr><td>ED in men with diabetes</td><td>52.5% (95% CI 48.8-56.2)</td><td>88,577 men in 145 studies</td><td>${ext(S.kouidrat, "Kouidrat et al., Diabetic Medicine")}</td><td>2017</td></tr>
<tr><td>Higher cardiovascular disease risk with ED</td><td>Relative risk about 1.48</td><td>36,744 men in 12 prospective cohorts</td><td>${ext(S.umbrella, "Dong et al., JACC, 2011, as reported in a 2021 umbrella review")}</td><td>2011</td></tr>
<tr><td>Men with an ED diagnosis who were treated</td><td>25.4%</td><td>6,228,509 US men aged 30 and over in a commercial claims database</td><td>${ext(S.frederick, "Frederick et al., Journal of Sexual Medicine")}</td><td>2014 (2010-2011)</td></tr>
<tr><td>Men who stop PDE5 inhibitors</td><td>About 4% a month, almost 50% after one year</td><td>162,936 patients in 22 studies</td><td>${ext(S.coronaDropout, "Corona et al., Andrology (abstract)")}</td><td>2016</td></tr>
</tbody>
</table>
<p>Two cautions before using any of these. First, the most quoted figures are old: the Massachusetts survey was fielded in the late 1980s and the NHANES question in 2001-2002. We found no newer nationally representative US prevalence figure from a population survey. Second, the 322 million figure for 2025 is a 1999 projection, not a count. The sections below explain each row. Sources as linked in the table, ${CHECKED}.</p>`,
    },
    {
      heading: "How many men have erectile dysfunction worldwide?",
      body: `<p>Nobody has counted. The worldwide figures in circulation are estimates built by applying the rates from one or more surveys to world population data, and the best known of them is now more than 25 years old.</p>
<h3>The 152 million and 322 million figures</h3>
<p>In 1999, Ayta, McKinlay and Krane, writing in BJU International, took the age-specific ED rates from the Massachusetts Male Aging Study and applied them to United Nations population figures. They estimated that over 152 million men worldwide experienced ED in 1995, and projected about 322 million by 2025, an increase of nearly 170 million. The authors argued that ageing populations and newly available treatments would make ED a policy issue in nearly every country. Source: ${ext(S.ayta, "Ayta et al., BJU International, 1999 (PubMed)")}, ${CHECKED}.</p>
<p>That projection is the origin of most "over 300 million men" claims. Three things limit it. It assumes that rates measured in Boston-area men in the late 1980s apply to men everywhere. It assumes those rates stayed constant for 30 years. And it was never checked against a count in 2025. It is a reasonable illustration of how population ageing alone drives the number up, and should be quoted as a projection, with its year.</p>
<h3>Why global prevalence estimates span 3% to 76.5%</h3>
<p>A 2019 review by Kessler and colleagues at King's College London, also in BJU International, collected population studies from around the world and found ED prevalence estimates ranging from 3% to 76.5%. The authors attributed the spread to differences in the ages of the populations studied and in the definitions and assessment methods used, and identified the choice of screening tool as a major source of disagreement. Sources: ${ext(S.kessler, "Kessler et al., BJU International, 2019")}; ${ext(S.kesslerKcl, "King's College London summary, 2019")}, ${CHECKED}.</p>
<p>The same review reported associations beyond prevalence: men with ED had higher all-cause mortality (odds ratio 1.26, 95% CI 1.01-1.57), were 1.33 to 6.24 times more likely to have benign prostatic hyperplasia (BPH) than men without ED, and 1.68 times more likely to develop dementia. These are associations from observational studies, not evidence that ED causes any of them.</p>
<h3>A multinational survey with a lower number</h3>
<p>The Global Study of Sexual Attitudes and Behaviors (GSSAB) surveyed about 13,600 men aged 40 to 80 in 29 countries. It found erectile difficulties in about 10% of men, behind early ejaculation at 14%. Age was a strong correlate of erectile difficulties. Sources: ${ext(S.gssab, "Nicolosi et al., Urology, 2004 (PubMed)")}; ${ext(S.gssabProblems, "Laumann et al., International Journal of Impotence Research, 2005 (PubMed)")}, ${CHECKED}.</p>
<p>The gap between 10% in GSSAB and 52% in the Massachusetts study is a clear example of method at work. Massachusetts explicitly counted minimal difficulty in one US community; GSSAB reported erectile difficulties as one item in a broad sexual-health survey across 29 countries with very different habits of reporting. Neither is wrong. They answer different questions.</p>`,
    },
    {
      heading: "How common is ED in the United States?",
      body: `<p>Four US data sources are cited more than any others. They use different populations and definitions, and together they bracket the answer.</p>
<h3>Massachusetts Male Aging Study (1987-1989)</h3>
<p>A community-based random sample of non-institutionalised men aged 40 to 70 in the Boston area. Combining minimal, moderate and complete impotence, 52% of men had some degree of ED. Complete ED rose from about 5% at age 40 to about 15% at age 70. Age was the variable most strongly associated with ED. After adjusting for age, heart disease, high blood pressure, diabetes, associated medications, and measures of anger and depression were each linked to higher odds, as were lower serum DHEA and lower HDL cholesterol. Source: ${ext(S.mmas, "Feldman et al., Journal of Urology, 1994 (PubMed)")}, ${CHECKED}.</p>
<h3>NHANES 2001-2002</h3>
<p>The National Health and Nutrition Examination Survey is designed to represent the non-institutionalised US population. Selvin, Burnett and Platz analysed 2,126 men aged 20 and over who answered a single question about their ability to get and keep an erection. Men who said they were "sometimes able" or "never able" were classed as having ED; men who said "always or almost always" or "usually" were not. On that definition, 18.4% (95% CI 16.2-20.7) had ED, which the authors translated into about 18 million US men. In multivariable analyses, ED was independently associated with diabetes, lower educational attainment and lack of physical activity. Sources: ${ext(S.selvin, "Selvin et al., American Journal of Medicine, 2007 (PubMed)")}; ${ext(S.selvinJhu, "Johns Hopkins Bloomberg School of Public Health release, 2007")}, ${CHECKED}.</p>
<h3>Health Professionals Follow-up Study (2000)</h3>
<p>A cohort of US male health professionals. Bacon and colleagues analysed questionnaires from 31,742 men aged 53 to 90. Excluding men with prostate cancer, the age-standardised prevalence of ED in the previous three months was 33%. The most physically active men had a lower risk than the least active (relative risk 0.7, 95% CI 0.6-0.7), and leanness was among the lifestyle factors most strongly linked to good function. Health professionals are healthier and better educated than average, so this is a conservative estimate for men of that age. Source: ${ext(S.bacon2003, "Bacon et al., Annals of Internal Medicine, 2003 (PubMed)")}, ${CHECKED}.</p>
<h3>NIH estimates and the 30 million figure</h3>
<p>An older NIDDK patient publication, drawing on a National Institutes of Health estimate, said ED affected as many as 30 million American men. That figure is decades old and depends on the definition used, and the current NIDDK page does not repeat it. Treat it as historical. Source: ${ext(S.niddkArchived, "NIDDK patient publication, archived copy")}, ${CHECKED}.</p>
<h3>An earlier national survey</h3>
<p>The National Health and Social Life Survey, analysed by Laumann, Paik and Rosen in JAMA in 1999, covered adults aged 18 to 59. As summarised by the University of Chicago, men aged 50 to 59 were about three and a half times more likely to report erection problems than men aged 18 to 29. A later JAMA correction disclosed that one author had served on a Pfizer advisory committee during the development of Viagra. Sources: ${ext(S.laumann, "Laumann et al., JAMA, 1999 (PubMed)")}; ${ext(S.laumannChicago, "University of Chicago Chronicle, 1999")}, ${CHECKED}.</p>
<h3>What this means for you</h3>
<p>If you want one figure for the US, the NHANES 18.4% is the most defensible because it comes from a nationally representative sample. If you want the share of middle-aged men with any difficulty at all, the Massachusetts 52% is the classic answer. Quote either with its population and year.</p>`,
    },
    {
      heading: "How does ED prevalence change with age?",
      body: `<p>Every study agrees that ED becomes more common with age. They disagree on how common at each age, because they draw the line between "ED" and "not ED" in different places. The table below puts age-band figures from four sources side by side. Read across a row to compare studies, but remember that the definitions in the last row differ.</p>
<table>
<thead><tr><th>Age band</th><th>NHANES, US (Selvin 2007; data 2001-2002)</th><th>Massachusetts Male Aging Study (Feldman 1994; Johannes 2000)</th><th>NIH/NIDDK historical estimate</th><th>Other population studies</th></tr></thead>
<tbody>
<tr><td>Under 40</td><td>5.1% (ages 20-39)</td><td>Not sampled</td><td>Not given</td><td>30% of sexually active Swiss men aged 18-25 on IIEF-5 below 22 (Mialon 2012)</td></tr>
<tr><td>40s</td><td rowspan="2">14.8% (ages 40-59)</td><td>Complete ED about 5% at 40; new cases 12.4 per 1,000 a year (40-49)</td><td>Not given</td><td rowspan="3">About 30% with ED across ages 40-79 in Europe (EMAS 2010); 33% in the previous three months, age-standardised, ages 53-90 (HPFS 2003)</td></tr>
<tr><td>50s</td><td>New cases 29.8 per 1,000 a year (50-59)</td><td>About 4% with total inability</td></tr>
<tr><td>60s</td><td>43.8% (ages 60-69)</td><td>New cases 46.4 per 1,000 a year (60-69); complete ED about 15% at 70</td><td>Nearly 17% with total inability</td></tr>
<tr><td>70 and over</td><td>70.2% (70+)</td><td>Not sampled beyond 70</td><td>47% with total inability (over 75)</td><td>49.4% with erectile problems, ages 75-95, Perth (Hyde 2012)</td></tr>
<tr><td>Definition</td><td>"Sometimes" or "never" able, single question</td><td>Minimal, moderate or complete on a 13-question instrument plus a global rating</td><td>Total inability to get an erection</td><td>Varies by study</td></tr>
</tbody>
</table>
<p>Sources: ${ext(S.selvin, "Selvin et al., 2007")}; ${ext(S.mmas, "Feldman et al., 1994")}; ${ext(S.johannes, "Johannes et al., 2000")}; ${ext(S.niddkArchived, "NIDDK archived publication")}; ${ext(S.mialon, "Mialon et al., Journal of Adolescent Health, 2012")}; ${ext(S.emas, "Corona et al., 2010")}; ${ext(S.bacon2003, "Bacon et al., 2003")}; ${ext(S.hyde, "Hyde et al., Journal of Sexual Medicine, 2012")}, ${CHECKED}.</p>
<h3>What the age data show</h3>
<p>Three patterns hold across studies. First, the curve steepens after 60: in NHANES, prevalence roughly tripled from the 40-59 band to the 60-69 band. Second, severe or complete ED rises faster than mild ED, so older men are not only more likely to have ED but more likely to have the severe form. Third, even in the oldest groups, not every man is affected. In the Perth study of men aged 75 to 95, about half reported erectile problems, which means about half did not; the authors identified cardiovascular disease, diabetes, depression, prostate disorders and insomnia among the factors most often linked to sexual problems, and concluded that low testosterone was unlikely to be a major cause in that age group. Source: ${ext(S.hyde, "Hyde et al., 2012 (PubMed)")}, ${CHECKED}.</p>
<p>The NIDDK is explicit that ED is not an inevitable part of ageing. The age association runs largely through the conditions that accumulate with age, above all vascular disease, diabetes and the medicines used to treat them. Source: ${ext(S.niddkCauses, "NIDDK, symptoms and causes of ED")}, ${CHECKED}.</p>
<h3>Worked example: one man, three answers</h3>
<p>Take a 64-year-old American man who says his erections are "usually" firm enough but sometimes not. In NHANES he would not count as having ED, because "usually able" falls on the no-ED side of the line. In the Massachusetts study he would probably count as having minimal ED. On the NIDDK's historical measure of total inability, he would clearly not be counted. The same man can sit inside or outside a statistic depending on which one you read. That is why the next sections give the definition beside every number.</p>`,
    },
    {
      heading: "How often do new cases of ED develop?",
      body: `<p>Prevalence tells you how many men have ED at one time. Incidence tells you how many new cases appear each year among men who did not have it before, which is the better guide to a man's own future risk.</p>
<h3>The Massachusetts follow-up</h3>
<p>Johannes and colleagues followed up the Massachusetts Male Aging Study. Of 1,709 men interviewed at baseline in 1987 to 1989, 1,156 survivors completed follow-up in 1995 to 1997, and 847 of them had no ED at baseline. In that group, the crude incidence was 25.9 new cases per 1,000 man-years (95% CI 22.5-29.9). By decade of age at baseline, incidence was 12.4 per 1,000 man-years at 40 to 49, 29.8 at 50 to 59 and 46.4 at 60 to 69. After adjusting for age, the risk was higher in men with lower education, diabetes, heart disease and high blood pressure. Source: ${ext(S.johannes, "Johannes et al., Journal of Urology, 2000 (PubMed)")}, ${CHECKED}.</p>
<p>In plain terms: among 1,000 men in their 60s without ED, about 46 would be expected to develop it in a given year, against about 12 among 1,000 men in their 40s. The risk roughly doubles with each decade.</p>
<h3>The Health Professionals Follow-up Study</h3>
<p>Bacon and colleagues followed 22,086 US health professionals aged 40 to 75 for 14 years. Among men who started with good or very good erectile function, 17.7% reported new ED during follow-up. Obesity (relative risk 1.9, 95% CI 1.6-2.2, compared with ideal weight in 1986) and smoking (RR 1.5, 95% CI 1.3-1.7) raised the risk, physical activity lowered it (RR 0.7, 95% CI 0.7-0.8, highest versus lowest fifth), and alcohol did not increase it. The study was funded by Pfizer and the National Institutes of Health. Source: ${ext(S.bacon2006, "Bacon et al., Journal of Urology, 2006 (PubMed)")}, ${CHECKED}.</p>
<h3>What this means for you</h3>
<p>The incidence data are the strongest population evidence that ED risk is partly modifiable. In both cohorts the factors that predicted new ED were mostly ones a man can change or treat: weight, smoking, activity, blood pressure and blood glucose. The risk from age cannot be changed; the rest can be lowered.</p>`,
    },
    {
      heading: "How common is ED in men under 40?",
      body: `<p>Less common than in older men, and harder to measure, because the large classic surveys did not sample young men. The figures that circulate come from four kinds of source, and they should not be mixed.</p>
<table>
<thead><tr><th>Source</th><th>Population</th><th>Definition</th><th>Finding</th></tr></thead>
<tbody>
<tr><td>${ext(S.selvin, "NHANES, Selvin et al., 2007")}</td><td>Nationally representative US men aged 20 to 39 (data 2001-2002)</td><td>"Sometimes" or "never" able</td><td>5.1%</td></tr>
<tr><td>${ext(S.mialon, "Mialon et al., Journal of Adolescent Health, 2012")}</td><td>Sexually active Swiss men aged 18 to 25 attending military conscription in two districts (9,761 men surveyed)</td><td>IIEF-5 score below 22, which includes mild ED</td><td>30%</td></tr>
<tr><td>${ext(S.capogrosso, "Capogrosso et al., Journal of Sexual Medicine, 2013")}</td><td>439 men seeking first care for new ED at one academic clinic in Milan, 2010-2012</td><td>Clinical diagnosis</td><td>26% were aged 40 or under</td></tr>
<tr><td>${ext(S.nguyen, "Nguyen, Gabrielson and Hellstrom, Sexual Medicine Reviews, 2017")}</td><td>Review of studies in young men</td><td>Varies</td><td>Large multinational studies estimate prevalence as high as 30%</td></tr>
</tbody>
</table>
<p>Sources as linked, ${CHECKED}.</p>
<h3>Reading the "1 in 4" figure correctly</h3>
<p>The Capogrosso study is often quoted as "one in four men under 40 has ED". That is not what it found. It found that one in four men who came to one specialist clinic for new ED were aged 40 or under. It says nothing about what share of all young men have ED. The authors themselves noted that a referral clinic sample may carry selection bias and called for larger population studies. Its other findings are useful: the younger men had fewer other medical conditions (9.6% against 41.7% in older men), lower body mass index and higher testosterone, but smoked and used illicit drugs more often. Severe ED was found in 48.8% of the younger men and 40% of the older men, a difference that was not statistically significant. Sources: ${ext(S.capogrosso, "Capogrosso et al., 2013 (abstract, UroToday)")}; ${ext(S.capogrossoRelease, "press release, EurekAlert, 2013")}, ${CHECKED}.</p>
<h3>Why the Swiss and US figures differ six-fold</h3>
<p>The Swiss 30% and the US 5.1% are both population figures for young men, and the gap comes almost entirely from the definition. The Swiss study used the five-question IIEF-5, where a score below 22 counts as ED; that threshold includes mild ED, so a young man who reports his erections as slightly less than perfect can fall below it. NHANES required a man to say he was only "sometimes" or "never" able. In the Swiss study, poor mental health was the only factor directly associated with both ED and premature ejaculation after adjustment, which fits the clinical observation that ED in young men is more often psychological or situational. Source: ${ext(S.mialon, "Mialon et al., 2012 (PubMed)")}, ${CHECKED}.</p>
<h3>What this means for you</h3>
<p>If you are under 40 and have ED, you are not unusual, and you are also not the norm. Persistent ED at that age is worth a medical review, because vascular, hormonal and medication causes do occur and are easier to catch early. Our guide to <a href="/ed/articles/ed-in-your-20s-and-30s">ED in your 20s and 30s</a> covers what a clinician looks for.</p>`,
    },
    {
      heading: "How to read ED statistics: why the figures differ",
      body: `<p>Most disagreement between ED statistics is not error. It is the result of studies asking different questions of different men. Six choices explain nearly all of it, and knowing them lets you judge any new figure you come across.</p>
<h3>1. The definition</h3>
<p>Some studies count any difficulty, some count only moderate or severe ED, and some count only complete inability. The Massachusetts study's 52% includes minimal ED; the NIDDK's historical figures counted total inability. Expect a several-fold difference from this alone.</p>
<h3>2. The questionnaire</h3>
<p>The International Index of Erectile Function (IIEF) and its five-item short form, the IIEF-5 (also called the Sexual Health Inventory for Men, SHIM), score erectile function on a scale. Where the cut-off is drawn matters: on the IIEF-5, a score below 22 is commonly used to define ED and includes mild cases. A single global question, as in NHANES, sorts men into fewer categories. The 2019 Kessler review identified screening-tool choice as a major source of disagreement, and in the 2017 diabetes meta-analysis, prevalence was highest, at 82.2%, in studies that used the SHIM. Sources: ${ext(S.kessler, "Kessler et al., 2019")}; ${ext(S.kouidrat, "Kouidrat et al., 2017")}, ${CHECKED}.</p>
<h3>3. The age range</h3>
<p>Because ED rises steeply with age, a study of men aged 40 to 80 will find more ED than one of men aged 20 and over. Always check the ages before comparing two headline numbers.</p>
<h3>4. Who was sampled</h3>
<p>A random community sample, a national survey, a cohort of health professionals, men visiting a doctor, and men attending a specialist clinic will all give different answers. Clinic samples overstate severity and the share of any group that seeks care; health-professional cohorts are healthier than average.</p>
<h3>5. The time frame and sexual activity</h3>
<p>Some studies ask about the last three months, some about the last four weeks, some about "generally". Some include only sexually active men. Excluding men who are not sexually active can raise or lower the figure depending on why they are inactive.</p>
<h3>6. Country, year and adjustment</h3>
<p>Rates of diabetes, obesity and smoking differ between countries and decades, and so does willingness to report sexual problems. Some figures are crude, some are age-standardised to a reference population. NHANES reported both for men with diabetes, and they differed by 13 percentage points (51.3% crude, 38.6% age-adjusted). Source: ${ext(S.selvin, "Selvin et al., 2007")}, ${CHECKED}.</p>
<h3>A quick checklist for any ED statistic</h3>
<ul>
<li>Who was counted, and how were they chosen?</li>
<li>What ages?</li>
<li>Which definition or questionnaire, and which cut-off?</li>
<li>When were the data collected, not just published?</li>
<li>Is it a measured figure or a projection?</li>
<li>Is it prevalence (how many have it), incidence (how many new cases a year) or a relative risk?</li>
</ul>
<p>A figure that cannot answer those questions is not worth repeating.</p>`,
    },
    {
      heading: "Which health conditions raise the risk of ED?",
      body: `<p>ED shares its causes with the major chronic diseases of middle age. The NIDDK lists diabetes, heart and blood vessel disease, high blood pressure, chronic kidney disease, prostate cancer treatment, certain medicines, psychological factors, smoking, excess alcohol, excess weight and inactivity among them. Source: ${ext(S.niddkCauses, "NIDDK, symptoms and causes of ED")}, ${CHECKED}. The table below gives the numbers behind the main ones.</p>
<table>
<thead><tr><th>Risk factor</th><th>Figure</th><th>Measure</th><th>Population and design</th><th>Source</th></tr></thead>
<tbody>
<tr><td>Diabetes</td><td>52.5% have ED; odds 3.62 times higher than healthy controls</td><td>Pooled prevalence; odds ratio (95% CI 2.53-5.16)</td><td>145 studies, 88,577 men</td><td>${ext(S.kouidrat, "Kouidrat et al., Diabetic Medicine, 2017")}</td></tr>
<tr><td>Diabetes</td><td>65.8% (95% CI 58.3-73.3)</td><td>Pooled prevalence</td><td>Umbrella review of 7 meta-analyses, 108,030 men</td><td>${ext(S.kitaw, "Kitaw et al., BMC Public Health, 2024")}</td></tr>
<tr><td>Diabetes</td><td>38.6% (age-adjusted); 51.3% (crude)</td><td>Prevalence</td><td>US men in NHANES 2001-2002</td><td>${ext(S.selvin, "Selvin et al., 2007")}</td></tr>
<tr><td>High blood pressure</td><td>Odds 1.84 times higher (95% CI 1.58-2.14)</td><td>Pooled odds ratio</td><td>18 cross-sectional studies, about 41,900 men</td><td>${ext(S.wangHtn, "Wang et al., International Journal of Impotence Research, 2018")}</td></tr>
<tr><td>Treated high blood pressure</td><td>27.7% (age-adjusted)</td><td>Prevalence</td><td>US men in NHANES 2001-2002</td><td>${ext(S.selvin, "Selvin et al., 2007")}</td></tr>
<tr><td>Obesity</td><td>Relative risk 1.9 (95% CI 1.6-2.2)</td><td>Risk of new ED over 14 years versus ideal weight</td><td>22,086 US health professionals aged 40-75</td><td>${ext(S.bacon2006, "Bacon et al., Journal of Urology, 2006")}</td></tr>
<tr><td>Current smoking</td><td>Odds 1.51 times higher (95% CI 1.34-1.71); former smokers 1.29</td><td>Pooled odds ratio, prospective cohorts</td><td>8 studies, 28,586 participants</td><td>${ext(S.cao2013, "Cao et al., PLoS ONE, 2013")}</td></tr>
<tr><td>Smoking amount</td><td>Odds 1.14 higher per 10 cigarettes a day; 1.15 per 10 years of smoking</td><td>Dose-response odds ratio</td><td>10 studies, 50,360 participants</td><td>${ext(S.cao2014, "dose-response meta-analysis, Journal of Sexual Medicine, 2014")}</td></tr>
<tr><td>Physical inactivity</td><td>Relative risk 0.7 for the most active versus least active</td><td>Risk of new ED</td><td>22,086 US health professionals</td><td>${ext(S.bacon2006, "Bacon et al., 2006")}</td></tr>
<tr><td>Depression</td><td>Depression raises odds of ED 1.39 times; ED raises odds of depression 2.92 times</td><td>Pooled odds ratios, as reported</td><td>Meta-analysis of observational studies</td><td>${ext(S.liuDepression, "Liu et al., Journal of Sexual Medicine, 2018")}</td></tr>
<tr><td>BPH and urinary symptoms</td><td>Men with ED 1.33 to 6.24 times more likely to have BPH</td><td>Range across studies</td><td>Global review</td><td>${ext(S.kessler, "Kessler et al., 2019")}</td></tr>
<tr><td>Cardiovascular disease, hypertension, diabetes, medications</td><td>Each independently linked to higher odds after age adjustment</td><td>Adjusted association</td><td>Massachusetts men aged 40-70</td><td>${ext(S.mmas, "Feldman et al., 1994")}</td></tr>
</tbody>
</table>
<p>Sources as linked in the table, ${CHECKED}.</p>
<h3>How to read the risk numbers</h3>
<p>An odds ratio or relative risk of 1.5 means the risk is about 50% higher than in the comparison group, not that 50% of men are affected. A man's absolute risk depends on his starting point: a 50% increase on a low base is a small number of extra cases. All of these figures come from observational studies, so they show association, not proof that the factor causes ED, although for diabetes, smoking and vascular disease the biological mechanism is well understood.</p>
<h3>High blood pressure</h3>
<p>The 2018 meta-analysis pooled 18 cross-sectional studies with about 41,900 participants and about 10,150 men with ED, and found high blood pressure associated with 1.84 times the odds of ED. The authors called for better prospective studies. Part of the link may run through the medicines: the NIDDK lists blood-pressure drugs among the medicines that can cause or worsen ED, which is a reason to raise it with the prescriber, never a reason to stop treatment. Sources: ${ext(S.wangHtn, "Wang et al., 2018")}; ${ext(S.niddkCauses, "NIDDK")}, ${CHECKED}. Our guide to <a href="/ed/articles/ed-pills-and-blood-pressure-medication">ED pills and blood pressure medication</a> covers the overlap.</p>
<h3>Obesity and inactivity</h3>
<p>Beyond the cohort figures above, there is trial evidence that weight loss helps. In a 2004 randomised trial in JAMA of 110 obese men aged 35 to 55 with ED, about a third of the men in the intensive lifestyle group (17 men) regained normal erectile function, against three men in the control group. Source: ${ext(S.esposito, "Esposito et al., JAMA, 2004 (PubMed)")}, ${CHECKED}. Our guide to <a href="/ed/articles/glp1-and-erectile-dysfunction">GLP-1 drugs and ED</a> covers what newer weight-loss drugs may mean for erections.</p>
<h3>Smoking</h3>
<p>The 2013 meta-analysis found current smokers had 1.51 times the odds of ED in prospective cohort studies, and former smokers 1.29 times, with no evidence of publication bias. The 2014 dose-response analysis found the odds rose with both the number of cigarettes a day and the number of years smoked, with no sign of a threshold. Sources: ${ext(S.cao2013, "Cao et al., 2013")}; ${ext(S.cao2014, "dose-response meta-analysis, 2014 (PubMed)")}, ${CHECKED}.</p>
<h3>Depression</h3>
<p>The link runs both ways. A 2018 meta-analysis in the Journal of Sexual Medicine reported that depression was associated with 1.39 times the odds of ED (95% CI 1.35-1.42) and ED with 2.92 times the odds of depression (95% CI 2.37-3.60). Heterogeneity between studies was very high, which the authors attributed to differences in design and in how both conditions were assessed. They recommended that men with ED be screened for depression and men with depression be asked about ED. Antidepressants are also on the NIDDK's list of medicines that can contribute. Sources: ${ext(S.liuDepression, "Liu et al., 2018 (PubMed)")}; ${ext(S.liuDepressionAbstract, "abstract summary, UroToday")}, ${CHECKED}.</p>
<h3>Urinary symptoms and BPH</h3>
<p>The Multinational Survey of the Aging Male (MSAM-7) analysed 12,815 men aged 50 to 80 in the US and six European countries and concluded that the presence and severity of lower urinary tract symptoms were independent risk factors for sexual dysfunction in older men. The Kessler review put the association between ED and BPH at 1.33 to 6.24 times. Sources: ${ext(S.msam7, "Rosen et al., European Urology, 2003 (PubMed)")}; ${ext(S.kessler, "Kessler et al., 2019")}, ${CHECKED}.</p>
<h3>Low testosterone</h3>
<p>Low testosterone can reduce desire and contribute to ED, but it is one cause among several rather than the usual one, and in the Perth study of men aged 75 to 95 the authors judged it unlikely to be a major cause of sexual problems. Our guide to <a href="/ed/articles/can-low-testosterone-cause-ed">whether low testosterone can cause ED</a> sets out when testing makes sense. Source: ${ext(S.hyde, "Hyde et al., 2012")}, ${CHECKED}.</p>`,
    },
    {
      heading: "How common is ED in men with diabetes?",
      body: `<p>Diabetes is the risk factor with the most data and the largest effect. High blood glucose over time damages both the small blood vessels and the nerves that erections depend on, which is why the figures for men with diabetes are so much higher than for men without it.</p>
<table>
<thead><tr><th>Source</th><th>Population</th><th>Finding</th></tr></thead>
<tbody>
<tr><td>${ext(S.kouidrat, "Kouidrat et al., Diabetic Medicine, 2017")}</td><td>145 studies, 88,577 men, mean age 55.8</td><td>52.5% overall after adjustment for publication bias; 37.5% in type 1, 66.3% in type 2; 62.2% in men over 60; odds 3.62 times those of healthy controls</td></tr>
<tr><td>${ext(S.kitaw, "Kitaw et al., BMC Public Health, 2024")}</td><td>Umbrella review of 7 systematic reviews, 108,030 men with diabetes</td><td>65.8% (95% CI 58.3-73.3); higher odds with age over 40 (AOR 1.95), diabetes for more than 10 years (AOR 1.90), peripheral vascular disease (AOR 2.74) and BMI over 30 (AOR 1.07)</td></tr>
<tr><td>${ext(S.selvin, "Selvin et al., 2007")}</td><td>US men with diabetes in NHANES 2001-2002</td><td>51.3% crude, 38.6% age-adjusted</td></tr>
<tr><td>${ext(S.niddkDiabetes, "NIDDK")}</td><td>Men with diabetes (agency summary)</td><td>More than half develop ED; more than three times as likely as men without diabetes; ED tends to start 10 to 15 years earlier</td></tr>
</tbody>
</table>
<p>Sources as linked, ${CHECKED}.</p>
<h3>Why the diabetes figures range from 38.6% to 66.3%</h3>
<p>The low end is NHANES after age adjustment, which removes the effect of men with diabetes being older on average. The high end is the meta-analytic figure for type 2 diabetes, which mixes clinic samples, older men and studies using the SHIM, where prevalence reached 82.2%. Type 1 diabetes, usually diagnosed young, had a lower pooled figure (37.5%), although the authors noted that many studies did not separate the two types. The practical message is the same at every point in the range: ED is the expected complication of diabetes, not a rare one.</p>
<h3>What this means for you</h3>
<p>A man with diabetes and ED should raise both with the clinician who manages his diabetes, because erectile function is a marker of how the small vessels and nerves are faring, and glucose control is part of the treatment. A man with ED and no diabetes diagnosis should have his glucose or HbA1c checked. Our guide to <a href="/ed/articles/ed-and-diabetes">ED and diabetes</a> covers treatment in detail.</p>`,
    },
    {
      heading: "Is ED a warning sign for heart disease? The numbers",
      body: `<p>Yes, on the evidence of large prospective studies. The arteries that supply the penis are small, so the same disease that later narrows the coronary arteries can impair erections first. Our guide to <a href="/ed/articles/erectile-dysfunction-heart-disease-warning-sign">ED as a heart warning sign</a> explains the mechanism and the tests to ask for; this section gives the figures.</p>
<table>
<thead><tr><th>Study</th><th>Population</th><th>Finding (as reported)</th></tr></thead>
<tbody>
<tr><td>${ext(S.thompson, "Thompson et al., JAMA, 2005")}</td><td>9,457 men aged 55 and over in the placebo arm of the Prostate Cancer Prevention Trial, followed 1994-2003</td><td>New ED: hazard ratio 1.25 (95% CI 1.02-1.53) for later cardiovascular events; new or existing ED: HR 1.45 (95% CI 1.25-1.69); comparable to current smoking or a family history of heart attack</td></tr>
<tr><td>${ext(S.umbrella, "Dong et al., JACC, 2011 (as reported in Mostafaei 2021)")}</td><td>12 prospective cohorts, 36,744 men</td><td>Relative risks of about 1.48 for cardiovascular disease, 1.46 for coronary heart disease, 1.35 for stroke and 1.19 for death from any cause</td></tr>
<tr><td>${ext(S.vlachopoulos, "Vlachopoulos et al., 2013")}</td><td>14 cohorts, 92,757 men, mean follow-up 6.1 years</td><td>ED predicts cardiovascular events and all-cause mortality</td></tr>
<tr><td>${ext(S.montorsiEd, "Montorsi series")}</td><td>300 men with chest pain and confirmed coronary disease</td><td>Where both were present, ED preceded coronary symptoms in most men, by two to three years on average</td></tr>
<tr><td>${ext(S.kessler, "Kessler et al., 2019")}</td><td>Global review</td><td>All-cause mortality odds ratio 1.26 (95% CI 1.01-1.57)</td></tr>
</tbody>
</table>
<p>Sources as linked, ${CHECKED}.</p>
<h3>What the Thompson study added</h3>
<p>The 2005 JAMA study is the one most often cited for ED as an early marker, because it followed men who did not have cardiovascular disease at the start. Of 8,063 men free of cardiovascular disease at entry, 3,816 (47%) already had ED. Over follow-up, men with ED had more cardiovascular events after adjustment for other risk factors, and the authors concluded that ED should prompt investigation of cardiovascular risk. Source: ${ext(S.thompson, "Thompson et al., JAMA, 2005 (PubMed)")}, ${CHECKED}.</p>
<h3>Size of the risk, and what it means</h3>
<p>The increase is moderate: about 1.25 to 1.5 times the risk, not ten times. ED is a flag, not a diagnosis. Its value is timing, because reviews put the warning at two to five years before a cardiovascular event, which is time to treat blood pressure, lipids, glucose and smoking. The fourth Princeton Consensus (2024) recommended that ED be treated as a risk-enhancing factor in cardiovascular risk estimation and that a sexual-function history be part of every man's cardiovascular evaluation. Source: ${ext(S.princeton, "Princeton IV consensus, Mayo Clinic Proceedings, 2024")}, ${CHECKED}.</p>`,
    },
    {
      heading: "How many men with ED get treatment?",
      body: `<p>A minority, on every measure we found. The figures come from very different sources, so we give each with its design.</p>
<table>
<thead><tr><th>Source</th><th>Design and population</th><th>Finding</th><th>Strength</th></tr></thead>
<tbody>
<tr><td>${ext(S.frederick, "Frederick et al., Journal of Sexual Medicine, 2014")}</td><td>US commercial insurance claims, 6,228,509 men aged 30 and over with an ED diagnosis, 12 months to June 2011</td><td>25.4% filled a prescription for a PDE5 inhibitor, injection or urethral therapy, or testosterone</td><td>Peer-reviewed; insured men with a recorded diagnosis only</td></tr>
<tr><td>${ext(S.shabsigh, "Shabsigh et al., BJU International, 2004")}</td><td>32,644 men aged 20 to 75 recruited at doctor visits in six countries</td><td>Most men with ED had not sought treatment; the youngest men were least likely to</td><td>Peer-reviewed; exact share not in the abstract</td></tr>
<tr><td>${ext(S.moreira, "Moreira et al., International Journal of Clinical Practice, 2005 (GSSAB)")}</td><td>About 27,500 men and women aged 40 to 80 in 29 countries</td><td>Few men or women with frequent sexual problems sought medical help</td><td>Peer-reviewed; qualitative in the abstract</td></tr>
<tr><td>${ext(S.emas, "Corona et al., 2010 (EMAS)")}</td><td>3,369 European men aged 40 to 79</td><td>Only 38% of men reporting ED were concerned about it</td><td>Peer-reviewed</td></tr>
<tr><td>${ext(S.goodrx, "GoodRx survey with YouGov, 2025")}</td><td>US men surveyed online, February 14 to April 16, 2025</td><td>Nearly 30% reported ED; 14% of all respondents used any ED treatment; top reasons for not treating were side-effect concerns (35%), cost (33%) and stigma (32%), as reported</td><td>Company survey, not peer-reviewed; GoodRx sells ED treatment</td></tr>
</tbody>
</table>
<p>Sources as linked, ${CHECKED}.</p>
<h3>The claims study in detail</h3>
<p>The 2014 claims analysis is the largest data set on treatment rates and the most concrete figure: only about one in four men with a diagnosis filled a prescription for any ED treatment in a year. Among treated men, PDE5 inhibitors were the most used therapy (75.2%), and testosterone was used alone or in combination by 30.6%. Men over 60 were less likely to be treated than men aged 40 to 59. As reported in coverage of the study, treatment was more common in men with low testosterone (51%) and less common in men with prostate cancer (15%). Two limits pull in opposite directions. Men whose ED was never diagnosed are not in the data, which would push the untreated share up. Cash purchases outside insurance were not captured, which would push it down, and cash-pay online clinics are far more common now than in 2011. Which effect is larger today is not known. Sources: ${ext(S.frederick, "Frederick et al., 2014 (PubMed)")}; ${ext(S.frederickReport, "News-Medical report, 2013")}, ${CHECKED}.</p>
<h3>Why men do not seek treatment</h3>
<p>The six-country study found that men who did seek care were often self-motivated or encouraged by a partner, while younger men tended to expect ED to resolve on its own and older men saw it as a normal part of ageing. The 2025 company survey reported side effects, cost and stigma as the main barriers. Source: ${ext(S.shabsigh, "Shabsigh et al., 2004 (PubMed)")}, ${CHECKED}.</p>
<h3>What this means for you</h3>
<p>If you have not sought help, you are in the majority, but the reasons most men give are ones that can be dealt with. Generic pills are inexpensive, side effects are usually mild and manageable, and licensed online clinics remove the waiting room. Our guide to <a href="/ed/articles/how-to-get-ed-treatment-online">getting ED treatment online</a> explains how a legitimate service works.</p>`,
    },
    {
      heading: "How well do ED pills work? Response and drop-out rates",
      body: `<p>PDE5 inhibitors (sildenafil, tadalafil, vardenafil and avanafil) are the first-line treatment, and the American Urological Association's 2018 guideline makes a strong recommendation that men with ED be told about them. Sources: ${ext(S.aua, "AUA guideline, 2018")}; ${ext(S.auaPubmed, "PubMed record")}, ${CHECKED}. The table gives the response figures from the trials and labels we could verify, and what happens over time.</p>
<table>
<thead><tr><th>Measure</th><th>Treatment</th><th>Placebo</th><th>Population and design</th><th>Source</th></tr></thead>
<tbody>
<tr><td>Successful intercourse attempts, last 4 weeks</td><td>69% (sildenafil, dose-escalation)</td><td>22%</td><td>Randomised dose-escalation study, 12 weeks</td><td>${ext(S.goldstein, "Goldstein et al., NEJM, 1998")}</td></tr>
<tr><td>Men reporting improved erections, fixed-dose studies</td><td>63%, 74% and 82% across the three labelled doses</td><td>24%</td><td>Fixed-dose studies described in the Viagra label</td><td>${ext(S.viagraLabelCopy, "Viagra label, as reproduced by MedLibrary")}</td></tr>
<tr><td>Successful attempts about 36 hours after a dose</td><td>59.2% (tadalafil 20 mg)</td><td>28.3%</td><td>Randomised trial, 348 men, mean age 57, Europe and US</td><td>${ext(S.porst, "Porst et al., Urology, 2003")}</td></tr>
<tr><td>Successful attempts about 24 hours after a dose</td><td>52.9% (tadalafil 20 mg)</td><td>29.1%</td><td>Same trial</td><td>${ext(S.porst, "Porst et al., 2003")}</td></tr>
<tr><td>Men stopping PDE5 inhibitors</td><td colspan="2">About 4% a month; almost 50% after one year</td><td>Meta-analysis, 22 studies, 162,936 patients, mean age 58.8</td><td>${ext(S.coronaDropout, "Corona et al., Andrology, 2016 (abstract)")}</td></tr>
<tr><td>Regained normal function with lifestyle change</td><td>About one third (17 men)</td><td>3 men (control)</td><td>Randomised trial, 110 obese men aged 35-55</td><td>${ext(S.esposito, "Esposito et al., JAMA, 2004")}</td></tr>
</tbody>
</table>
<p>Sources as linked, ${CHECKED}. Doses are given only as the trials and label state them; the right dose for any man is the prescriber's decision.</p>
<h3>Reading the response figures</h3>
<p>Two points stand out. First, placebo response is substantial, at 22% to 29% in these trials, which reflects the psychological component of ED and the effect of being in a trial. The useful comparison is the gap between drug and placebo, roughly 30 to 60 percentage points depending on the measure. Second, the trial populations were selected, and men with severe disease, diabetes or prostate surgery tend to respond less well, which is why a clinician may adjust the dose or the drug before concluding that pills do not work. Our guide to the <a href="/ed/articles/best-ed-medicine">best ED medicine</a> compares the four drugs, and <a href="/ed/articles/sildenafil-vs-cialis">sildenafil vs Cialis</a> covers timing.</p>
<h3>Why half of men stop</h3>
<p>The 2016 meta-analysis found discontinuation was higher in younger men and in men with more health problems, and that partner-related problems and lack of efficacy were the most common reasons, although no single reason dominated. The point for a man starting treatment is that a poor first experience is common and often fixable: the timing, the dose, the drug and the expectations can all be adjusted with a prescriber. Source: ${ext(S.coronaDropoutDoi, "Corona et al., Andrology, 2016")}, ${CHECKED}. The <a href="/ed/articles/erectile-dysfunction-treatment-complete-guide">complete ED treatment guide</a> covers the options when pills do not work.</p>`,
    },
    {
      heading: "What does ED treatment cost? Figures from our cost index",
      body: `<p>Cost is one of the barriers men cite. The figures below are copied from our <a href="/ed/ed-cost-index">ED treatment cost index</a>, last updated October 14, 2026. The index labels each figure by basis: a "range" is a representative US online-market spread compiled by our team, not one provider's price; "verified" is a price a provider publishes. Per-dose items are converted to a monthly figure assuming eight doses a month, a comparison basis rather than a recommendation. Prices change, so confirm at checkout.</p>
<table>
<thead><tr><th>Treatment</th><th>Headline cost</th><th>Approximate monthly (8 doses)</th><th>Basis</th></tr></thead>
<tbody>
<tr><td>Generic sildenafil, as needed</td><td>About $1-3 per dose</td><td>$8-24</td><td>Range, October 2026</td></tr>
<tr><td>Generic tadalafil, as needed</td><td>About $1.50-3.50 per dose</td><td>$12-28</td><td>Range, October 2026</td></tr>
<tr><td>Generic tadalafil, low daily dose</td><td>About $15-40 per month</td><td>$15-40</td><td>Range, October 2026</td></tr>
<tr><td>DudeMeds generic sildenafil or tadalafil</td><td>From $1.63 per tablet</td><td>$13-40</td><td>Verified published starting price</td></tr>
<tr><td>Brand Viagra or brand Cialis</td><td>About $70-90+ per pill</td><td>$560-720</td><td>Range, brand list prices, October 2026</td></tr>
</tbody>
</table>
<p>The gap between generic and brand is the statistic most relevant to the cost barrier in the surveys above: on our index, a month of generic sildenafil at eight doses costs less than a single brand-name pill at list price. Insurance coverage varies and is not reflected here. The index also covers compounded, nasal-spray and injectable options, and the <a href="/ed">ED provider ranking</a> compares the licensed online services.</p>`,
    },
    {
      heading: "Who this page is for, and who it isn't for",
      body: `<h3>This page is for</h3>
<ul>
<li><strong>Men wondering whether their experience is common.</strong> The age tables let you compare yourself with men your age, with the caveat that a statistic describes a population, not you.</li>
<li><strong>Partners and family members</strong> who want to understand how ordinary ED is and how closely it is tied to general health.</li>
<li><strong>Writers, students, journalists and researchers</strong> who need a figure with its source, year and population attached. Each row is written so it can be quoted with its context.</li>
<li><strong>Clinicians and health educators</strong> looking for a single page that sets the classic figures beside each other and explains why they differ.</li>
</ul>
<h3>This page is not for</h3>
<ul>
<li><strong>Diagnosing yourself.</strong> Prevalence figures cannot tell you the cause of your ED or whether you need treatment. A clinician can.</li>
<li><strong>Choosing a dose or a drug.</strong> The trial figures describe groups of men in controlled studies. The prescribing decision belongs to a licensed clinician.</li>
<li><strong>Anyone with an emergency.</strong> Chest pain, breathlessness or dizziness during exertion or sex, an erection lasting more than four hours, or sudden loss of vision or hearing after taking an ED medicine need urgent medical care, not a statistics page.</li>
<li><strong>Precise national counts for 2026.</strong> As explained below, the data to produce one do not exist in the sources we found.</li>
</ul>`,
    },
    {
      heading: "What we don't know",
      body: `<p>ED is one of the most studied conditions in men's health, and the data still have large gaps. These are the ones that matter most for interpreting the numbers above.</p>
<ul>
<li><strong>Current US prevalence.</strong> The most cited nationally representative figure uses NHANES data from 2001-2002, and the Massachusetts survey dates from 1987-1989. Obesity and diabetes rates have changed since. We found no newer nationally representative US population figure, so any claim about "ED in 2026" is an extrapolation.</li>
<li><strong>Whether the worldwide projection came true.</strong> The 322 million figure for 2025 was a 1999 projection. We found no measured global count to check it against, and no Global Burden of Disease estimate for ED.</li>
<li><strong>Young men.</strong> Estimates for men under 40 range from about 5% to 30% depending on definition, and the most quoted figure comes from a single clinic. Whether ED in young men is truly increasing has not been shown by repeated population surveys using the same method.</li>
<li><strong>Treatment rates now.</strong> The best treatment-rate figure comes from insurance claims ending in 2011, before cash-pay online clinics became common. How many men now get treatment outside insurance is not captured by any peer-reviewed source we found. The 2025 figure of 14% comes from a company survey, not a peer-reviewed study.</li>
<li><strong>Causation for most risk factors.</strong> The risk-factor figures are associations from observational studies. Randomised evidence exists for lifestyle change in obese men, but not for most of the other factors.</li>
<li><strong>Whether treating ED-flagged heart risk prevents heart attacks.</strong> The cohorts show ED predicts cardiovascular events. No randomised trial has shown that acting on that signal reduces events, though the tests involved are cheap and standard.</li>
<li><strong>Differences by race, ethnicity and income.</strong> Several studies report differences by education and other factors, but we did not find consistent, current figures by group strong enough to include.</li>
</ul>`,
    },
    {
      heading: "What should you ask your clinician?",
      body: `<p>Statistics are a starting point for a conversation, not a substitute for one. These are the questions we would take to a primary-care visit or an ED consultation.</p>
<h3>About the cause</h3>
<ul>
<li>Does my ED look more physical (gradual, all situations, poor morning erections) or more psychological (sudden, situational, normal morning erections)?</li>
<li>Could any of my current medicines be contributing, and is there an alternative?</li>
<li>Should I be screened for depression, anxiety or a sleep problem?</li>
</ul>
<h3>About my wider health</h3>
<ul>
<li>Given that ED is linked to heart disease, is a cardiovascular risk check due: blood pressure, lipids, HbA1c or fasting glucose, and a ten-year risk estimate?</li>
<li>Would a coronary artery calcium scan help refine my risk, as the Princeton IV consensus suggests for some men?</li>
<li>Do my symptoms justify morning testosterone tests?</li>
<li>If I have diabetes, is my glucose control where it should be, and should my diabetes reviews include erectile function?</li>
<li>Do I have urinary symptoms that should be assessed at the same time?</li>
</ul>
<h3>About treatment</h3>
<ul>
<li>Which PDE5 inhibitor and format fits my timing and my other medicines?</li>
<li>Is it safe for me given my heart, blood pressure and any nitrate use?</li>
<li>If the first attempt does not work, how many tries should I give it, and what would we change first?</li>
<li>Which changes, such as weight, smoking or activity, would make the biggest difference for me?</li>
<li>How much will treatment cost, and is a generic suitable?</li>
</ul>
<p>Write the answers down, and bring a full list of your medicines and supplements to every appointment.</p>`,
    },
    {
      heading: "Final verdict and next steps",
      body: `<p>ED is common, and it becomes more common with age. On the best US data, about one man in five aged 20 and over is affected, about seven in ten aged 70 and over. On broader definitions, half of men aged 40 to 70 have some degree of difficulty. The headline numbers disagree mainly because studies define and measure ED differently, and any figure is only as useful as the population, year and definition quoted with it.</p>
<p>The most useful statistics for an individual man are not the prevalence figures but the risk figures. ED is strongly linked to diabetes, high blood pressure, obesity, smoking, inactivity and depression, and it predicts cardiovascular events years ahead. Most of those risks can be treated. And most men with ED are not treated at all, even though first-line pills work for most of them and generics are inexpensive.</p>
<ol>
<li><strong>If you have ED and have not had a check-up in a year or two,</strong> book one and ask for blood pressure, lipids and glucose or HbA1c. Our guide to <a href="/ed/articles/erectile-dysfunction-heart-disease-warning-sign">ED as a heart warning sign</a> lists the tests.</li>
<li><strong>Understand the likely cause.</strong> Our guide to <a href="/ed/articles/what-causes-erectile-dysfunction">what causes erectile dysfunction</a> walks through the possibilities; men under 40 should read <a href="/ed/articles/ed-in-your-20s-and-30s">ED in your 20s and 30s</a>, men with diabetes <a href="/ed/articles/ed-and-diabetes">ED and diabetes</a>, and men with low desire or fatigue <a href="/ed/articles/can-low-testosterone-cause-ed">can low testosterone cause ED</a>.</li>
<li><strong>Learn the options.</strong> The <a href="/ed/articles/erectile-dysfunction-treatment-complete-guide">complete ED treatment guide</a> covers every treatment class, and <a href="/ed/articles/best-ed-medicine">best ED medicine</a> compares the pills.</li>
<li><strong>If you are on or considering a weight-loss drug,</strong> see <a href="/ed/articles/glp1-and-erectile-dysfunction">GLP-1 drugs and ED</a>.</li>
<li><strong>Get treated.</strong> A licensed online provider can prescribe after a health review; our guide to <a href="/ed/articles/how-to-get-ed-treatment-online">getting ED treatment online</a> explains the process, the <a href="/ed/ed-cost-index">ED cost index</a> prices the options, and the <a href="/ed">ED provider ranking</a> compares the services.</li>
</ol>
<p><em>This page is general information, not medical advice. Statistics describe groups, not individuals. ED medicines are prescription drugs with risks; never combine a PDE5 inhibitor with nitrates, and seek emergency care for chest pain, an erection lasting over four hours, or sudden loss of vision or hearing. Treatment decisions belong to a licensed clinician who knows your history.</em></p>`,
    },
    {
      heading: "References",
      body: `<p>All sources ${CHECKED}. Where we relied on an abstract, PubMed record, press release, company survey or third-party copy of a label rather than the full paper, the entry says so.</p>
<ol>
<li>${ext(S.mmas, "Feldman HA et al. Impotence and its medical and psychosocial correlates: results of the Massachusetts Male Aging Study. Journal of Urology, 1994;151(1):54-61")} (PubMed record).</li>
<li>${ext(S.johannes, "Johannes CB et al. Incidence of erectile dysfunction in men 40 to 69 years old: longitudinal results from the Massachusetts Male Aging Study. Journal of Urology, 2000;163(2):460-463")} (PubMed record).</li>
<li>${ext(S.selvin, "Selvin E, Burnett AL, Platz EA. Prevalence and risk factors for erectile dysfunction in the US. American Journal of Medicine, 2007;120(2):151-157")} (PubMed record); ${ext(S.selvinJhu, "Johns Hopkins Bloomberg School of Public Health news release, 2007")}.</li>
<li>${ext(S.ayta, "Ayta IA, McKinlay JB, Krane RJ. The likely worldwide increase in erectile dysfunction between 1995 and 2025 and some possible policy consequences. BJU International, 1999;84:50-56")} (PubMed record).</li>
<li>${ext(S.kessler, "Kessler A, Sollie S, Challacombe B, Briggs K, Van Hemelrijck M. The global prevalence of erectile dysfunction: a review. BJU International, 2019;124(4):587-599")}; ${ext(S.kesslerKcl, "King's College London news summary, 2019")}.</li>
<li>${ext(S.emas, "Corona G et al. Age-related changes in general and sexual health in middle-aged and older men: results from the European Male Ageing Study (EMAS). Journal of Sexual Medicine, 2010;7(4):1362-1380")}.</li>
<li>${ext(S.gssab, "Nicolosi A et al. Sexual behavior and sexual dysfunctions after age 40: the Global Study of Sexual Attitudes and Behaviors. Urology, 2004")} (PubMed record).</li>
<li>${ext(S.gssabProblems, "Laumann EO et al. Sexual problems among women and men aged 40-80 y: prevalence and correlates identified in the Global Study of Sexual Attitudes and Behaviors. International Journal of Impotence Research, 2005;17(1):39-57")} (PubMed record).</li>
<li>${ext(S.hyde, "Hyde Z et al. Prevalence and predictors of sexual problems in men aged 75-95 years: a population-based study. Journal of Sexual Medicine, 2012")} (PubMed record).</li>
<li>${ext(S.laumann, "Laumann EO, Paik A, Rosen RC. Sexual dysfunction in the United States: prevalence and predictors. JAMA, 1999;281:537-544")} (PubMed record); ${ext(S.laumannChicago, "University of Chicago Chronicle, February 18, 1999")}.</li>
<li>${ext(S.bacon2003, "Bacon CG et al. Sexual function in men older than 50 years of age: results from the Health Professionals Follow-up Study. Annals of Internal Medicine, 2003;139(3):161-168")} (PubMed record).</li>
<li>${ext(S.bacon2006, "Bacon CG et al. A prospective study of risk factors for erectile dysfunction. Journal of Urology, 2006;176:217-221")} (PubMed record).</li>
<li>${ext(S.niddkArchived, "NIDDK. Erectile dysfunction, patient publication (archived copy)")}; ${ext(S.niddkCauses, "NIDDK. Symptoms and causes of erectile dysfunction")}; ${ext(S.niddkDiabetes, "NIDDK. Diabetes, sexual, and bladder problems")}.</li>
<li>${ext(S.capogrosso, "Capogrosso P et al. One patient out of four with newly diagnosed erectile dysfunction is a young man: worrisome picture from the everyday clinical practice. Journal of Sexual Medicine, 2013;10(7):1833-1841")} (abstract, UroToday); ${ext(S.capogrossoRelease, "press release, EurekAlert, June 2013")}.</li>
<li>${ext(S.mialon, "Mialon A et al. Sexual dysfunctions among young men: prevalence and associated factors. Journal of Adolescent Health, 2012;51(1):25-31")} (PubMed record).</li>
<li>${ext(S.nguyen, "Nguyen HMT, Gabrielson AT, Hellstrom WJG. Erectile dysfunction in young men: a review of the prevalence and risk factors. Sexual Medicine Reviews, 2017;5:508-520")} (PubMed record).</li>
<li>${ext(S.kouidrat, "Kouidrat Y et al. High prevalence of erectile dysfunction in diabetes: a systematic review and meta-analysis of 145 studies. Diabetic Medicine, 2017;34(9):1185-1192")} (PubMed record).</li>
<li>${ext(S.kitaw, "Kitaw et al. The global burden of erectile dysfunction and its associated risk factors in diabetic patients: an umbrella review. BMC Public Health, October 2024")}.</li>
<li>${ext(S.wangHtn, "Wang, Huang and Zhang. Relation between hypertension and erectile dysfunction: a meta-analysis of cross-section studies. International Journal of Impotence Research, 2018;30:141-146")}.</li>
<li>${ext(S.cao2013, "Cao S et al. Smoking and risk of erectile dysfunction: systematic review of observational studies with meta-analysis. PLoS ONE, 2013;8(4):e60443")}.</li>
<li>${ext(S.cao2014, "Dose-response meta-analysis of smoking quantity and duration and erectile dysfunction. Journal of Sexual Medicine, 2014")} (PubMed record).</li>
<li>${ext(S.liuDepression, "Liu Q et al. Erectile dysfunction and depression: a systematic review and meta-analysis. Journal of Sexual Medicine, 2018;15(8):1073-1082")} (PubMed record); ${ext(S.liuDepressionAbstract, "abstract summary, UroToday")}.</li>
<li>${ext(S.msam7, "Rosen R et al. Lower urinary tract symptoms and male sexual dysfunction: the Multinational Survey of the Aging Male (MSAM-7). European Urology, 2003")} (PubMed record).</li>
<li>${ext(S.esposito, "Esposito K et al. Effect of lifestyle changes on erectile dysfunction in obese men: a randomized controlled trial. JAMA, 2004;291(24):2978-2984")} (PubMed record).</li>
<li>${ext(S.thompson, "Thompson IM et al. Erectile dysfunction and subsequent cardiovascular disease. JAMA, 2005;294:2996-3002")} (PubMed record).</li>
<li>${ext(S.umbrella, "Mostafaei H et al. Association of erectile dysfunction and cardiovascular disease: an umbrella review. BJU International, 2021")} (reports the Dong et al., JACC 2011 pooled estimates).</li>
<li>${ext(S.vlachopoulos, "Vlachopoulos CV et al. Prediction of cardiovascular events and all-cause mortality with erectile dysfunction: a meta-analysis. Circulation: Cardiovascular Quality and Outcomes, 2013")}.</li>
<li>${ext(S.montorsiEd, "Editorial: erectile dysfunction, a marker of silent coronary artery disease (Montorsi series)")}.</li>
<li>${ext(S.princeton, "Kloner RA et al. The Princeton IV consensus recommendations for the management of erectile dysfunction and cardiovascular disease. Mayo Clinic Proceedings, 2024")}.</li>
<li>${ext(S.frederick, "Frederick et al. Undertreatment of erectile dysfunction: claims analysis of 6.2 million patients. Journal of Sexual Medicine, 2014")} (PubMed record); ${ext(S.frederickReport, "News-Medical report, March 2013")}.</li>
<li>${ext(S.shabsigh, "Shabsigh R, Perelman MA, Laumann EO, Lockhart DC. Drivers and barriers to seeking treatment for erectile dysfunction: a comparison of six countries. BJU International, 2004;94:1055-1065")} (PubMed record).</li>
<li>${ext(S.moreira, "Moreira ED Jr et al. Help-seeking behaviour for sexual problems: the Global Study of Sexual Attitudes and Behaviors. International Journal of Clinical Practice, 2005;59(1):6-16")} (repository record).</li>
<li>${ext(S.goodrx, "GoodRx. Men aren't getting the help they need for ED, survey with YouGov, 2025")} (company survey, not peer-reviewed).</li>
<li>${ext(S.goldstein, "Goldstein I et al. Oral sildenafil in the treatment of erectile dysfunction. New England Journal of Medicine, 1998;338:1397-1404")} (PubMed record).</li>
<li>${ext(S.viagraLabel, "Viagra (sildenafil) prescribing information. Pfizer")}; ${ext(S.viagraLabelCopy, "clinical studies section, as reproduced by MedLibrary")}.</li>
<li>${ext(S.porst, "Porst H et al. Efficacy of tadalafil for the treatment of erectile dysfunction at 24 and 36 hours after dosing: a randomized controlled trial. Urology, 2003;62(1):121-125")} (PubMed record).</li>
<li>${ext(S.coronaDropoutDoi, "Corona G et al. First-generation phosphodiesterase type 5 inhibitors dropout: a comprehensive review and meta-analysis. Andrology, 2016;4(6):1002-1009")}; ${ext(S.coronaDropout, "abstract, UroToday")}.</li>
<li>${ext(S.aua, "Burnett AL et al. Erectile dysfunction: AUA guideline. American Urological Association, 2018")}; ${ext(S.auaPubmed, "Journal of Urology, 2018;200(3):633-641 (PubMed record)")}.</li>
<li>Treatments Hub. <a href="/ed/ed-cost-index">ED Treatment Cost Index</a>, updated October 14, 2026.</li>
</ol>`,
    },
  ],
};
