import type { ArticleData } from "../../config";

// ───── Menopause hormone therapy in 2026: what changed (Oct 31, 2026) ─────
// A dated briefing on the fall 2026 changes for menopausal hormone therapy
// (MHT) and what they mean for a woman deciding now: ACOG's Clinical Practice
// Guideline No. 13 (Oct 15, 2026), the American College of Physicians
// guideline in Annals of Internal Medicine (online Oct 6, 2026), HHS/FDA's
// Oct 30, 2026 label approvals for three more estradiol patches (after the
// six products of February 12, 2026, covered in hrt-black-box-warning.ts),
// the estradiol patch supply strain with no formal FDA shortage designation,
// the FDA's first generic of Climara Pro (FDA release dated Oct 20, 2026; the
// brief's "Oct 22, Medscape" could not be confirmed, so the FDA date is used),
// and items presented at The Menopause Society's 2026 Annual Meeting (Oct
// 20-24, San Diego), which are labelled as conference data, not peer-reviewed.
// The Menopause Society's 2022 position statement is the baseline.
// Sourcing rules: guideline and FDA/HHS statements link the body itself;
// news, press releases and conference results are labelled as reported, with
// dates. Provider facts and prices come only from src/lib/seeds/hrt.ts and the
// hrt-articles/* files. No doses or conversions are given beyond a labelled
// product strength; the prescriber decides. Facts checked 2026-10-31.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  // Guidelines and position statements
  acogNews: "https://www.acog.org/news/2026/10/acog-expands-recommendations-for-management-of-menopause-symptoms/",
  acogCpg: "https://journals.lww.com/greenjournal/fulltext/10.1097/aog.0000000000006428~acog-clinical-practice-guideline-management-of",
  acogCog: "https://www.contemporaryobgyn.net/view/acog-guideline-expands-menopause-vms-sleep-and-mood-recommendations",
  acoog: "https://www.acoog.org/news/acoog-endorses-acog-menopause-guideline",
  nprAcog: "https://www.npr.org/2026/10/16/nx-s1-6005201/health-treatment-menopause-hot-flash-night-sweats-insomnia",
  acpNews: "https://www.acponline.org/acp-newsroom/acp-recommends-hormonal-therapy-as-a-first-line-treatment-for-menopausal-vasomotor-symptoms",
  acpPubmed: "https://pubmed.ncbi.nlm.nih.gov/42832802/",
  acpEditorial: "https://www.acpjournals.org/doi/10.7326/ANNALS-26-03184",
  acpHealio: "https://www.healio.com/news/womens-health-ob-gyn/20261005/acp-use-hormone-therapy-as-firstline-treatment-for-menopausal-vasomotor-symptoms",
  acpMedscape: "https://www.medscape.com/viewarticle/acp-backs-hormones-vasomotor-symptoms-menopause-2026a10011ic",
  tms2022: "https://pubmed.ncbi.nlm.nih.gov/35797481/",
  tms2022Release: "https://menopause.org/wp-content/uploads/press-release/ht-position-statement-release.pdf",
  tmsMisinfo: "https://menopause.org/wp-content/uploads/2024/09/TMS-statement-on-HT-Misinformation.pdf",
  tmsPatient: "https://menopause.org/patient-education/menopause-topics/hormone-therapy",
  acogCompounded: "https://www.acog.org/clinical/guidance/clinical-consensus/2023/11/compounded-bioidentical-menopausal-hormone-therapy/",
  acogBreastGsm: "https://www.acog.org/clinical/clinical-guidance/clinical-consensus/articles/2021/12/treatment-of-urogenital-symptoms-in-individuals-with-a-history-of-estrogen-dependent-breast-cancer",
  // FDA / HHS and labels
  fdaNov2025: "https://www.fda.gov/news-events/press-announcements/hhs-advances-womens-health-removes-misleading-fda-warnings-hormone-replacement-therapy",
  acogNov2025: "https://www.acog.org/news/news-releases/2025/11/acog-president-says-label-change-on-estrogen-will-increase-access-to-hormone-therapy",
  tmsFdaComment: "https://menopause.org/press-releases/the-menopause-society-comments-on-the-fda-announcement-on-hormone-therapy",
  hhsOct30: "https://www.hhs.gov/press-room/fda-advances-menopause-care-hormone-therapy-labeling-access.html",
  reutersOct30: "https://www.yahoo.com/news/us/articles/us-health-department-remove-broad-152222468.html",
  cogOct30: "https://www.contemporaryobgyn.net/view/fda-removes-boxed-warnings-from-3-more-menopausal-hormone-therapy-products",
  pinkSheet: "https://insights.citeline.com/pink-sheet/drug-safety/us-fda-strips-boxed-label-warnings-from-three-menopause-hormone-patches-eyes-otc-move-RKGXTBTFDND6FIIKV5XYAJBMUI/",
  dailymedPatch: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e7e6da3b-8485-1382-61c9-e9b369018b98",
  // Supply
  fdaPatch: "https://www.fda.gov/drugs/drug-alerts-and-statements/fda-update-estradiol-transdermal-patch-availability",
  cogSept: "https://www.contemporaryobgyn.net/view/fda-working-manufacturers-increase-estradiol-transdermal-patches",
  reutersOct28: "https://www.investing.com/news/stock-market-news/us-estrogen-supply-crunch-widens-as-women-seek-alternatives-to-scarce-patches-4978221",
  nbc: "https://www.nbcnews.com/health/womens-health/fda-estrogen-patch-shortage-hormone-therapy-alternatives-rcna344233",
  senators: "https://www.gillibrand.senate.gov/news/press/release/gillibrand-duckworth-schiff-press-fda-on-plan-to-mitigate-estrogen-patch-shortage/",
  cbsNy: "https://www.cbsnews.com/newyork/news/estrogen-patch-possible-shortage-new-york/",
  healthline: "https://www.healthline.com/health-news/menopause-estrogen-patch-shortage-after-fda-endorsement",
  // Generic Climara Pro
  fdaGeneric: "https://www.fda.gov/news-events/press-announcements/fda-approves-once-weekly-generic-hormone-therapy-patch-women",
  healioGeneric: "https://www.healio.com/news/endocrinology/20261020/fda-approves-first-generic-of-climara-pro-a-onceweekly-hormone-therapy-patch",
  usnewsGeneric: "https://www.usnews.com/news/health-news/articles/2026-10-21/first-generic-combo-hormone-patch-could-make-menopause-relief-more-affordable",
  cgt: "https://www.indianpharmapost.com/regulatory/zydus-receives-usfda-nod-and-180-day-exclusivity-for-generic-hormone-patch-22208",
  // The Menopause Society 2026 Annual Meeting
  tmsMeeting: "https://menopause.org/annual-meetings/2026-annual-meeting",
  tmsTestPr: "https://menopause.org/press-releases/testosterone-therapy-may-increase-risk-of-cardiovascular-disease-in-postmenopausal-women",
  testRun: "https://www.renalandurologynews.com/news/tms-testosterone-therapy-linked-to-increased-risk-for-cvd-postmenopause-2/",
  testSmc: "https://www.sciencemediacentre.org/expert-reaction-to-press-release-from-the-menopause-society-about-testosterone-therapy-and-cardiovascular-disease-in-postmenopausal-women-about-a-presentation-to-be-given-at-the-2026-annual-meeting-o/",
  testMd: "https://www.medicaldaily.com/testosterone-postmenopausal-women-cardiovascular-risk-study-479988",
  autoPr: "https://menopause.org/press-releases/autoimmune-disease-risk-may-differ-by-menopausal-hormone-therapy-formulation",
  autoHealio: "https://www.healio.com/news/rheumatology/20261022/data-linking-menopause-hormone-therapy-to-autoimmune-risk-a-chance-for-greater-dialogue",
  glpHealio: "https://www.healio.com/news/womens-health-ob-gyn/20261023/hormone-therapy-plus-glp1-may-equal-greater-sustainable-weight-loss-for-menopausal-women",
  glpMx: "https://medicalxpress.com/news/2026-10-hormone-therapy-weight-loss-effectiveness.html",
  workPr: "https://menopause.org/press-releases/psychological-symptoms-may-drive-menopause-related-workforce-attrition",
  // WHI context
  whiHealio: "https://cm.healio.com/news/womens-health-ob-gyn/20240603/qa-at-20-years-whi-emphasizes-personalized-postmenopausal-care-shared-decisionmaking",
  whiHms: "https://hms.harvard.edu/news/comprehensive-results-hormone-therapy-trials",
};

export const HRT_MHT_2026_CHANGES: ArticleData = {
  slug: "menopause-hormone-therapy-2026-what-changed",
  title: "Menopause Hormone Therapy in 2026: What Changed",
  description:
    "ACOG and ACP named hormone therapy first-line for hot flashes, three more patches lost the boxed warning, and patches stayed scarce. What it means for you.",
  category: "News",
  readTime: "52 min read",
  publishedAt: "2026-10-31",
  updatedAt: "2026-10-31",
  heroColor: "#F3E6EE",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "In October 2026 the two largest US physician groups that treat midlife women both put hormone therapy first for hot flashes and night sweats. The American College of Physicians strongly recommended it as first-line on high-certainty evidence (Annals of Internal Medicine, October 6), and ACOG strongly recommended systemic hormone therapy and starting it before 60 or within 10 years of menopause (Clinical Practice Guideline No. 13, October 15).",
    "On October 30, HHS and the FDA approved updated labels removing the boxed warnings on cardiovascular disease, breast cancer and probable dementia from three estradiol patches, bringing the total to nine products after February's six. The risks are still described in the label, the contraindications did not change, and the endometrial cancer box stays on systemic estrogen-alone products.",
    "Estradiol patches remained hard to find. The FDA says it has worked with all six patch makers since September and has not designated a shortage; Reuters reported shortages spreading to some injectable and vaginal estrogen products. If your patch is out of stock, ask your pharmacist and prescriber about another brand, strength, a generic or a gel, spray or pill, and do not adjust anything yourself.",
    "Conference data from The Menopause Society's October 20-24 meeting, not yet peer-reviewed, included an observational signal of more cardiovascular events in women 45 and older who started testosterone (3.8% versus 0.5%). It is an association in a database study, not proof of harm, and it is a reason to ask about monitoring rather than to stop a treatment on your own.",
  ],
  sections: [
    {
      heading: "What changed for menopause hormone therapy in 2026?",
      body: `<div class="qa"><strong>The short answer</strong>In fall 2026, guidance caught up with the evidence and supply fell behind demand. The American College of Physicians (October 6) and ACOG (October 15) both now strongly recommend hormone therapy as the first treatment for hot flashes and night sweats in women without contraindications, with ACOG advising a start before 60 or within 10 years of menopause. On October 30 the FDA cleared three more estradiol patch labels without the old boxed warnings. Patches stayed scarce, with no official shortage declared. The medicines, their risks and who should avoid them are unchanged.</div>
<p>Four separate things happened in about four weeks, and they are easy to blur together. Two were clinical guidelines, written by physician societies after formal evidence reviews. One was regulatory: the FDA approving revised labels for specific products. The fourth was practical: women who were newly willing to try hormone therapy, or who had used it for years, struggling to get the patch they were prescribed. A fifth strand, the research presented at The Menopause Society's annual meeting, added new questions rather than answers.</p>
<p>This guide separates them. For each change it gives the date, the body that made it, what was actually said or done, how strong the evidence behind it is, and what it means for a woman sitting down with a prescriber this winter. It assumes you may be starting, restarting, continuing or deciding against hormone therapy, and it tries to be useful in all four cases. If you want the full history of the boxed warning first, our guide to the <a href="/hrt/articles/hrt-black-box-warning-removed">HRT black box warning removal</a> covers November 2025 and February 2026 in detail; this guide picks up where that one leaves off.</p>
<h3>What changed in 2026, at a glance</h3>
<table>
<thead><tr><th>Date</th><th>Body</th><th>Change</th><th>What it means for you</th></tr></thead>
<tbody>
<tr><td>February 12, 2026</td><td>FDA</td><td>First six revised hormone therapy labels approved, with cardiovascular disease, breast cancer and probable dementia moved out of the boxed warning (${ext(S.cogOct30, "Contemporary OB/GYN")})</td><td>The box on those products changed; the medicines and contraindications did not. Background in our <a href="/hrt/articles/hrt-black-box-warning-removed">black box guide</a></td></tr>
<tr><td>September 3, 2026</td><td>FDA</td><td>Update says estradiol patches "remain available," supply has nearly doubled in a year, and the agency is working with manufacturers (${ext(S.fdaPatch, "FDA")})</td><td>Your exact brand or strength may still be missing at your pharmacy</td></tr>
<tr><td>October 6, 2026</td><td>American College of Physicians</td><td>Guideline in <em>Annals of Internal Medicine</em>: estrogen (with a progestogen if you have a uterus) is the strongly recommended first-line treatment for vasomotor symptoms (${ext(S.acpNews, "ACP")})</td><td>Internists and primary care doctors now have a guideline that puts hormones first, not last</td></tr>
<tr><td>October 15, 2026</td><td>ACOG</td><td>Clinical Practice Guideline No. 13 strongly recommends systemic hormone therapy for hot flashes and related sleep disturbance, and starting before 60 or within 10 years of menopause (${ext(S.acogNews, "ACOG")})</td><td>Ob-gyns have updated guidance for the first time since 2014; timing of initiation is central</td></tr>
<tr><td>October 20, 2026</td><td>FDA</td><td>First generic of Climara Pro, a once-weekly estradiol and levonorgestrel patch, approved (${ext(S.fdaGeneric, "FDA")})</td><td>A possible lower-cost combined patch once it launches; launch date not yet announced</td></tr>
<tr><td>October 20-24, 2026</td><td>The Menopause Society annual meeting</td><td>Conference studies, including an observational testosterone and cardiovascular signal in women 45 and older (${ext(S.tmsTestPr, "press release")})</td><td>Preliminary data, not peer-reviewed; a reason to discuss monitoring, not to stop treatment on your own</td></tr>
<tr><td>October 28, 2026</td><td>News (Reuters)</td><td>Shortages reported to be spreading beyond patches to some injectable and vaginal estrogen products (${ext(S.reutersOct28, "Reuters")})</td><td>Switching routes may not always solve a supply problem; plan refills early</td></tr>
<tr><td>October 30, 2026</td><td>HHS and FDA</td><td>Updated labels without the three boxed items approved for three estradiol patches; total now nine products (${ext(S.hhsOct30, "HHS")})</td><td>More patch boxes now match the February labels; the risk information remains inside the label</td></tr>
</tbody>
</table>
<p>The common thread is that the official position on hormone therapy for symptomatic women near menopause is now more favourable than at any time since 2002, while the practical ability to get one particular form of it, the estradiol patch, is worse than it was a year ago. Both are true at once, and a sensible plan in 2026 accounts for both.</p>`,
    },
    {
      heading: "How did we get here? WHI, the timing hypothesis and the 2022 baseline",
      body: `<p>Every 2026 change is a response to one trial and the two decades of re-reading that followed it. The Women's Health Initiative (WHI) hormone trials, first reported in 2002, tested whether hormone therapy prevented chronic disease in postmenopausal women. The combined estrogen-plus-progestin arm was stopped early because risks crossed a safety threshold, prescribing collapsed, and in 2003 the FDA put boxed warnings on menopausal estrogen products. The trial's design, regimen and numbers are set out in our <a href="/hrt/articles/hrt-black-box-warning-removed">black box guide</a>.</p>
<h3>The timing hypothesis</h3>
<p>The women in the WHI were, on average, well past menopause. Later analyses that split the results by age and time since menopause found that the absolute risks were much lower in women who started in their 50s. Harvard Medical School's summary of the 2013 extended WHI analysis reported that among women in their 50s, fewer than 1 in 100 had an adverse event attributable to hormone therapy over five years of use, while risks were four to five times higher in older women (${ext(S.whiHms, "Harvard Medical School, on the 2013 WHI analysis")}). In a 2024 review in <em>JAMA</em>, WHI investigators emphasised personalised care and shared decision-making; JoAnn Manson told Healio that absolute risks are low in women under 60 and that starting therapy for symptoms in that group is likely to have a favourable benefit-risk balance (${ext(S.whiHealio, "Healio, June 3, 2024")}).</p>
<p>The idea behind these findings is usually called the timing hypothesis, or the "critical window": estrogen seems to behave differently in blood vessels that are still healthy than in vessels with established plaque, so the same drug can be neutral in a 52-year-old and harmful in a 70-year-old starting for the first time. It is a hypothesis with consistent supporting data rather than a proven mechanism, and it is the reason the 2026 guidelines talk about age and years since menopause rather than hormones in general.</p>
<h3>The 2022 baseline</h3>
<p>Before any of the 2026 changes, the clearest statement of the specialist view was The Menopause Society's 2022 hormone therapy position statement. Its core points, which the new guidelines largely echo (${ext(S.tms2022, "Menopause, 2022; PubMed")}; ${ext(S.tms2022Release, "Menopause Society release")}):</p>
<ul>
<li>Hormone therapy remains the most effective treatment for vasomotor symptoms (hot flashes and night sweats) and for the genitourinary syndrome of menopause, and it has been shown to prevent bone loss and fracture.</li>
<li>For healthy women younger than 60 and within 10 years of menopause onset who have no contraindications, the benefits of treating symptoms generally outweigh the risks.</li>
<li>Risks differ by type, dose, duration, route, timing of initiation and whether a progestogen is used. Transdermal routes and lower doses may lower the risk of venous blood clots and stroke.</li>
<li>For genitourinary symptoms not relieved by over-the-counter products, low-dose vaginal estrogen or other therapies such as vaginal DHEA or oral ospemifene are recommended.</li>
<li>Longer use should be for a documented reason, such as continuing hot flashes, with periodic reassessment; the statement says a routine stop at 65 is not supported by data.</li>
</ul>
<p>The Menopause Society has also warned that compounded hormone preparations "could represent a safety hazard because they are unregulated and often delivered in untested forms such as pellets or troches" (${ext(S.tms2022Release, "Menopause Society, 2022")}). We found no newer Menopause Society hormone therapy position statement as of October 31, 2026; the 2022 statement is still its reference document.</p>
<h3>Then the label moved</h3>
<p>On November 10, 2025, HHS and the FDA announced that the boxed warnings about cardiovascular disease, breast cancer and probable dementia would be removed from menopausal hormone therapy labels, and asked manufacturers to submit revised labels (${ext(S.fdaNov2025, "FDA, November 2025")}). ACOG's president said at the time that the change would allow patients and clinicians to engage in shared decision-making and did not change ACOG's guidance on estrogen therapy (${ext(S.acogNov2025, "ACOG, November 2025")}). The Menopause Society agreed with removing the box from low-dose vaginal estrogen and said systemic estrogen still carries potential risks for some women that should be reviewed in detail (${ext(S.tmsFdaComment, "Menopause Society comment")}). The first six revised labels followed in February 2026. Everything in October builds on that sequence.</p>`,
    },
    {
      heading: "What does ACOG's new menopause guideline say?",
      body: `<p><strong>ACOG's Clinical Practice Guideline No. 13, "Management of Menopause-Related Vasomotor, Sleep, and Mood Symptoms," was published October 15, 2026, in <em>Obstetrics &amp; Gynecology</em>. It strongly recommends systemic hormone therapy for hot flashes and night sweats and the sleep problems they cause in people without contraindications, and strongly recommends starting before 60 or within 10 years of the start of natural menopause.</strong></p>
<p>NPR described it as the first update to ACOG's menopause treatment guidance since 2014 (${ext(S.nprAcog, "NPR, October 16, 2026")}). ACOG called it an expansion of its recommendations, adding evidence-based non-hormonal medicines and non-drug options for people who cannot or prefer not to use hormones, and noted that its journal published a November special edition devoted to menopause (${ext(S.acogNews, "ACOG news release, October 2026")}). The American College of Osteopathic Obstetricians and Gynecologists has endorsed it (${ext(S.acoog, "ACOOG")}).</p>
<h3>The recommendations, in plain language</h3>
<table>
<thead><tr><th>Topic</th><th>ACOG's recommendation</th><th>Strength (as reported)</th></tr></thead>
<tbody>
<tr><td>Hot flashes, night sweats and the sleep disturbance they cause</td><td>Systemic hormone therapy: estrogen plus a progestogen with a uterus, estrogen alone without one, in people without contraindications</td><td>Strong</td></tr>
<tr><td>When to start</td><td>Before age 60 or within 10 years of the start of natural menopause, when hormone therapy is chosen</td><td>Strong</td></tr>
<tr><td>Alternative to estrogen plus progestogen</td><td>Conjugated estrogens with bazedoxifene (sold as Duavee) for vasomotor-related sleep disturbance</td><td>Conditional</td></tr>
<tr><td>Depressive symptoms around menopause</td><td>Evidence insufficient to recommend for or against hormone therapy; major depression is treated under depression guidelines</td><td>No recommendation</td></tr>
<tr><td>People who cannot or do not want hormones</td><td>Neurokinin receptor antagonists (fezolinetant, elinzanetant) for hot flashes and related sleep disturbance; SSRIs or SNRIs where mood and hot flashes coexist; gabapentin when other non-hormonal options fail or are poorly tolerated</td><td>Strong for neurokinin antagonists</td></tr>
<tr><td>Non-drug approaches</td><td>Cognitive behavioural therapy, mindfulness-based interventions, exercise, clinical hypnosis and acupuncture</td><td>Conditional</td></tr>
<tr><td>Supplements</td><td>Evidence does not support the safety or efficacy of phytoestrogens such as soy isoflavones or herbal supplements for menopausal symptoms</td><td>Not recommended</td></tr>
</tbody>
</table>
<p>Sources: ${ext(S.acogCpg, "ACOG Clinical Practice Guideline No. 13, Obstetrics &amp; Gynecology")}; ${ext(S.acogCog, "Contemporary OB/GYN coverage")}; ${ext(S.nprAcog, "NPR")}. We did not have access to every grading table in the full text, so strengths are as reported by those sources; check the guideline itself for the exact wording.</p>
<h3>What the timing recommendation does and does not say</h3>
<p>The timing advice is about <em>starting</em>. It does not tell a woman who began at 52 to stop at 60, and it does not forbid a start at 61. Secondary coverage of the guideline reports that it sets no fixed age or duration at which hormone therapy must stop, and the guideline text says decisions should be individualised, weighing age at initiation, other conditions, formulation, route and duration of use (${ext(S.acogCpg, "ACOG CPG No. 13")}). One of the guideline's co-authors told NPR that hormone therapy is probably the best option for symptomatic, newly menopausal women within 10 years of their final period or before 60 (${ext(S.nprAcog, "NPR")}).</p>
<h3>What the lead author stressed</h3>
<p>The guideline's lead author cautioned NPR against "over-simplifying treatment based on tiers," and said lifestyle measures come first in her own practice: "A healthy diet and regular physical exercise is going to go a long way. So let's start with that" (${ext(S.nprAcog, "NPR, October 16, 2026")}). That is a useful corrective to headlines that read "hormones first." The guideline puts hormone therapy first among medicines for bothersome hot flashes. It does not say every woman with symptoms needs a prescription.</p>
<h3>What this means for you</h3>
<ul>
<li>If you see an ob-gyn, your clinician now has current, formal guidance that supports hormone therapy for hot flashes and the sleep loss they cause, if you have no contraindications.</li>
<li>If you are under 60 or within 10 years of your last period, this is the window the guideline singles out for starting.</li>
<li>If you cannot or do not want hormones, the guideline gives the non-hormonal options a clear place rather than treating them as a last resort.</li>
<li>If your main problem is low mood rather than hot flashes, the guideline does not support hormone therapy as a depression treatment.</li>
</ul>`,
    },
    {
      heading: "What does the American College of Physicians guideline say?",
      body: `<p><strong>The ACP's guideline, "Pharmacologic Treatments for Females with Menopausal Vasomotor Symptoms," was published online October 6, 2026, in <em>Annals of Internal Medicine</em>. It strongly recommends estrogen plus a progestogen for women with a uterus, or estrogen alone for women without one, as first-line treatment for perimenopausal and postmenopausal women seeking treatment for vasomotor symptoms, based on high-certainty evidence of net benefit.</strong></p>
<p>We confirmed the guideline on the ACP's own newsroom and in the PubMed record of the <em>Annals</em> paper (${ext(S.acpNews, "ACP newsroom")}; ${ext(S.acpPubmed, "PubMed")}). Healio's report is dated October 5, ahead of online publication (${ext(S.acpHealio, "Healio, October 5, 2026")}). The ACP concluded that estrogen with a progestogen, and estrogen alone, had the most favourable balance of benefits to harms of the treatments it reviewed.</p>
<h3>The ACP's treatment ladder</h3>
<table>
<thead><tr><th>Line</th><th>Treatment</th><th>Strength and certainty</th></tr></thead>
<tbody>
<tr><td>First-line</td><td>Estrogen plus progestogen (uterus present) or estrogen alone (no uterus)</td><td>Strong recommendation; high-certainty evidence</td></tr>
<tr><td>Second-line, if estrogen is contraindicated or not tolerated</td><td>An SNRI: desvenlafaxine or venlafaxine</td><td>Conditional ("suggests"); moderate-certainty evidence</td></tr>
<tr><td>Third-line</td><td>An SSRI (escitalopram or paroxetine), gabapentin, or a neurokinin receptor antagonist (elinzanetant or fezolinetant)</td><td>Conditional ("suggests")</td></tr>
</tbody>
</table>
<p>Sources: ${ext(S.acpNews, "ACP newsroom")}; ${ext(S.acpEditorial, "Annals editorial, 2026")}; ${ext(S.acpMedscape, "Medscape")}.</p>
<h3>Duration and follow-up</h3>
<p>The ACP is candid about what is not known: it describes the optimal duration of hormone therapy as unknown, while noting that 3 to 5 years is common in practice, and says treatment efficacy should be assessed after 8 to 12 weeks (${ext(S.acpMedscape, "Medscape, October 2026")}). The 8-to-12-week check is the most practical line in the guideline for a patient: it tells you when it is reasonable to judge whether a treatment is working and to change course if it is not.</p>
<h3>How the field reacted</h3>
<p>A clinician quoted by Medscape, who was not involved in the guideline, said the recommendations are consistent with what many experienced menopause clinicians already do, and called for better evidence broken down by age, race, ethnicity, menopausal stage and baseline risk of serious harms (${ext(S.acpMedscape, "Medscape")}). Experts quoted by Healio said the update is in line with current evidence and may reassure clinicians and patients about safety (${ext(S.acpHealio, "Healio")}).</p>
<h3>Why the ACP matters more than its name suggests</h3>
<p>The ACP represents internists, and many women in the US get menopause care from a primary care physician or internist rather than a gynaecologist or menopause specialist. A guideline from that body putting estrogen first, on high-certainty evidence, reaches the clinicians who were most likely to have learned that hormones were something to avoid. It is the clearest sign in 2026 that the change in thinking has spread beyond menopause specialists.</p>
<h3>What it does not cover</h3>
<p>The ACP guideline is about medicines for vasomotor symptoms. As its title says, it is pharmacologic, so it does not grade non-drug approaches, and it is not a guideline on vaginal symptoms, bone or mood. In the summaries we found, the timing of initiation was not a headline recommendation as it is in ACOG's guideline. The two documents are complementary rather than in conflict.</p>`,
    },
    {
      heading: "How do ACOG, ACP and The Menopause Society compare?",
      body: `<p><strong>All three put hormone therapy first for bothersome hot flashes in women without contraindications. They differ in scope, in how explicitly they address timing and duration, and in where they place the non-hormonal medicines, especially the neurokinin receptor antagonists.</strong></p>
<table>
<thead><tr><th></th><th>ACOG (CPG No. 13, Oct 15, 2026)</th><th>ACP (Annals, Oct 6, 2026)</th><th>The Menopause Society (2022 statement)</th></tr></thead>
<tbody>
<tr><td>Scope</td><td>Vasomotor, sleep and mood symptoms; drug and non-drug options</td><td>Medicines for vasomotor symptoms only</td><td>Hormone therapy across indications: symptoms, genitourinary syndrome, bone</td></tr>
<tr><td>Hormone therapy for hot flashes</td><td>Strongly recommended, systemic, without contraindications</td><td>Strongly recommended first-line, high-certainty evidence</td><td>Most effective treatment available</td></tr>
<tr><td>Progestogen with a uterus</td><td>Yes; conjugated estrogens with bazedoxifene as a conditional alternative</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Timing of initiation</td><td>Strongly recommends starting before 60 or within 10 years of menopause</td><td>Not a headline recommendation in the summaries we found</td><td>Benefit-risk most favourable under 60 or within 10 years; less favourable starting later</td></tr>
<tr><td>Duration</td><td>Individualised; no fixed stop age reported</td><td>Optimal duration unknown; 3 to 5 years common; reassess at 8 to 12 weeks</td><td>Longer use for documented reasons with reassessment; routine stop at 65 not supported</td></tr>
<tr><td>Neurokinin receptor antagonists</td><td>Strongly recommended if hormones are unwanted or unsuitable</td><td>Third-line, conditional</td><td>Not addressed in the 2022 hormone statement</td></tr>
<tr><td>SSRIs and SNRIs</td><td>Recommended when mood and hot flashes coexist and hormones are not used</td><td>SNRI second-line; SSRI third-line</td><td>Not addressed in the 2022 hormone statement</td></tr>
<tr><td>Gabapentin</td><td>Suggested when other non-hormonal options fail or are poorly tolerated</td><td>Third-line</td><td>Not addressed in the 2022 hormone statement</td></tr>
<tr><td>Non-drug options</td><td>CBT, mindfulness, exercise, hypnosis, acupuncture (conditional)</td><td>Outside scope</td><td>Outside scope</td></tr>
<tr><td>Mood</td><td>Insufficient evidence for hormone therapy for menopause-related depressive symptoms</td><td>Outside scope</td><td>Not an indication</td></tr>
<tr><td>Genitourinary symptoms</td><td>Outside this guideline's title</td><td>Outside scope</td><td>Low-dose vaginal estrogen, vaginal DHEA or ospemifene</td></tr>
</tbody>
</table>
<p>Sources: ${ext(S.acogCpg, "ACOG CPG No. 13")}; ${ext(S.acogCog, "Contemporary OB/GYN")}; ${ext(S.acpNews, "ACP")}; ${ext(S.acpMedscape, "Medscape")}; ${ext(S.tms2022, "Menopause Society 2022")}.</p>
<h3>Where they differ, and why it matters to you</h3>
<p>The biggest practical difference is the placement of fezolinetant and elinzanetant, the newer non-hormonal drugs that block a brain signal involved in hot flashes. ACOG strongly recommends them for women who will not or cannot take hormones; the ACP places them third, behind an SNRI and alongside SSRIs and gabapentin. The difference reflects how each body weighed newer, more expensive drugs with shorter track records against older, cheaper ones. Neither body says the neurokinin antagonists do not work. If you cannot take estrogen, both pathways are defensible, and cost, other conditions and side-effect profiles will often decide.</p>
<p>The second difference is timing. ACOG makes the "before 60 or within 10 years" window a strong recommendation of its own. The Menopause Society frames the same window as where the benefit-risk balance is most favourable. The ACP's summary materials focus on which drug to use. In practice all three point the same way: starting near menopause is the best-supported scenario, and starting much later needs more careful assessment.</p>
<p>The third is scope. A woman with dryness and painful sex will not find her answer in the ACP guideline or in ACOG's new document; the Menopause Society's statement and ACOG's separate guidance on genitourinary symptoms cover that. Our <a href="/hrt/articles/menopause-complete-guide">complete menopause guide</a> covers the full symptom range.</p>`,
    },
    {
      heading: "What did the FDA change in October 2026?",
      body: `<p><strong>On October 30, 2026, HHS announced that the FDA had approved updated labels for three estradiol transdermal patches from two applicants, removing cardiovascular disease, breast cancer and probable dementia from their boxed warnings. That brings the number of menopausal hormone therapy products with revised labels under the November 2025 request to nine.</strong></p>
<p>The announcement is on the HHS press site (${ext(S.hhsOct30, "HHS, October 30, 2026")}) and was reported by Reuters (${ext(S.reutersOct30, "Reuters, October 30, 2026")}) and Contemporary OB/GYN (${ext(S.cogOct30, "Contemporary OB/GYN")}). The February 2026 approvals covered six products in other categories; the October action is the first to apply the change to patches. Pink Sheet reported the running total of nine (${ext(S.pinkSheet, "Pink Sheet, October 2026")}).</p>
<h3>Which patches?</h3>
<p>Reuters reported that HHS did not immediately name the brands, and we could not find the product names in an FDA or HHS document, so we do not list them here. If your next box of patches carries the new wording, it is one of the updated labels; if it still shows the old warning, its maker's label has not been updated yet. The product inside is the same either way.</p>
<h3>What else the announcement said</h3>
<ul>
<li><strong>More labels to come.</strong> The FDA said it is working expeditiously with applicants on labeling changes for the remaining menopausal hormone therapy products (${ext(S.cogOct30, "Contemporary OB/GYN")}).</li>
<li><strong>Supply.</strong> The FDA said it is in close contact with all six manufacturers of approved estradiol patches and, on current information, is not aware of an imminent risk of a nationwide shortage (${ext(S.hhsOct30, "HHS")}).</li>
<li><strong>Over-the-counter vaginal estrogen.</strong> The agency said it is exploring with sponsors the potential for over-the-counter availability of vaginal estrogen products (${ext(S.hhsOct30, "HHS")}; ${ext(S.pinkSheet, "Pink Sheet")}). This is an exploration, not an approval. Vaginal estrogen remains prescription-only in the US as of October 31, 2026.</li>
</ul>
<h3>The criticism</h3>
<p>As with the earlier steps, the October action was taken without a public FDA advisory committee meeting, and some experts raised concerns about transparency and about removing warnings on breast cancer and cardiovascular disease without a detailed published justification (${ext(S.reutersOct30, "Reuters")}). The process debate is covered in our <a href="/hrt/articles/hrt-black-box-warning-removed">black box guide</a>. For an individual woman, the process question matters less than the fact that the specialist guidelines, written through formal evidence reviews, reached a similar conclusion about women near menopause on their own.</p>
<h3>What this means for you</h3>
<ul>
<li>If you are on one of the relabelled patches, nothing about your treatment needs to change.</li>
<li>If the leaflet in your box still has the old warning, it is not a different product; generics and brands update on their own schedules.</li>
<li>If you were waiting for "the FDA to say it is safe," it has not said that. It has changed how the risks are presented. Your own risk is the conversation to have.</li>
</ul>`,
    },
    {
      heading: "What do the label changes do, and not do, about risk?",
      body: `<p><strong>They change where and how prominently three risks are communicated. They do not change the drugs, the doses, the approved uses, the contraindications, or the size of any risk. The cardiovascular, breast cancer and dementia information moved into the body of the label. The endometrial cancer boxed warning stays on systemic estrogen-alone products.</strong></p>
<p>The FDA's November 2025 announcement framed the change as removing outdated risk statements from the box while keeping risk information in the label (${ext(S.fdaNov2025, "FDA, November 2025")}). ACOG said in November 2025 that the change did not alter its guidance on estrogen therapy (${ext(S.acogNov2025, "ACOG")}).</p>
<table>
<thead><tr><th>Question</th><th>Did the 2025-2026 label changes alter it?</th><th>What still applies</th></tr></thead>
<tbody>
<tr><td>Is the medicine different?</td><td>No</td><td>Same estradiol, same products, same strengths</td></tr>
<tr><td>Are heart disease, stroke and clots still risks?</td><td>No change to the risk</td><td>Described in Warnings and Precautions; oral estrogen carries more clot risk than transdermal</td></tr>
<tr><td>Is breast cancer still a consideration?</td><td>No change to the risk</td><td>Small increase with combined therapy that grows with duration; a history of breast cancer remains a contraindication</td></tr>
<tr><td>Is dementia still mentioned?</td><td>Moved out of the box</td><td>Hormone therapy is not recommended to prevent dementia</td></tr>
<tr><td>Do women with a uterus still need a progestogen?</td><td>No change</td><td>Yes; the endometrial cancer box stays on systemic estrogen-alone products</td></tr>
<tr><td>Who should not take it?</td><td>No change</td><td>The contraindications section is the same</td></tr>
<tr><td>Is it approved to prevent heart disease?</td><td>No</td><td>Approved for symptoms and, for some products, osteoporosis prevention</td></tr>
<tr><td>Are compounded hormones covered?</td><td>No</td><td>Compounded products have no FDA-approved label to change</td></tr>
</tbody>
</table>
<p>Detailed risk numbers, by outcome, are in <a href="/hrt/articles/is-hrt-safe">Is HRT safe?</a>, and the WHI figures behind the original box are in our <a href="/hrt/articles/hrt-black-box-warning-removed">black box guide</a>.</p>
<h3>How to read a risk number in 2026</h3>
<p>Ask for absolute risk: how many extra events, in how many women like you, over how long. A relative increase without a baseline tells you very little. The Harvard summary of the 2013 WHI analysis is the clearest example of why this matters: the same therapy produced fewer than 1 adverse event per 100 women in their 50s over five years and four to five times that in older women (${ext(S.whiHms, "Harvard Medical School")}). Your age, years since your last period, blood pressure, weight, smoking, family history and the route of estrogen all move your personal number more than the label's layout does.</p>
<h3>Compounded and "bioidentical" products</h3>
<p>The relabelling applies to FDA-approved products, including FDA-approved estradiol and micronized progesterone, which are chemically identical to the body's hormones. It does not apply to pharmacy-compounded preparations, which have no approved label. ACOG has separate guidance on compounded bioidentical menopausal hormone therapy (${ext(S.acogCompounded, "ACOG Clinical Consensus, 2023")}), and The Menopause Society has called compounded hormones a potential safety hazard (${ext(S.tms2022Release, "Menopause Society")}). The difference is explained in <a href="/hrt/articles/bioidentical-hormones-explained">bioidentical hormones explained</a>.</p>`,
    },
    {
      heading: "Why are estrogen patches hard to find, and is there an official shortage?",
      body: `<p><strong>Demand for estradiol patches rose faster than production after the label changes. The FDA says patches remain available, that supply has roughly doubled in a year, and that it has worked with manufacturers since September; it has not placed estradiol patches on its official shortage list. Pharmacists, patients and lawmakers say that does not match what they see at the counter.</strong></p>
<h3>What the FDA says</h3>
<p>The FDA's September 3, 2026 update said estradiol transdermal patches remain available, though availability of particular products or brands may vary by pharmacy or location, that supply of approved patches had nearly doubled over the previous year, and that manufacturers were adding shifts and capacity (${ext(S.fdaPatch, "FDA, September 3, 2026")}; ${ext(S.cogSept, "Contemporary OB/GYN, September 4, 2026")}). On October 30, the FDA said it continues to work with all six manufacturers of approved estradiol patches, that availability can differ by brand, strength, formulation (once-weekly versus twice-weekly) and location, and that it is not aware of an imminent risk of a nationwide shortage (${ext(S.hhsOct30, "HHS, October 30, 2026")}).</p>
<p>Reuters reported on October 30 that the FDA has been working with manufacturers since September to boost supplies but has not designated the patches as being in shortage, and quoted Dorothy Fink of the National Institute of Child Health and Human Development: "Estrogen patch market output has doubled over the past year, and manufacturers continue to expand capacity" (${ext(S.reutersOct30, "Reuters, October 30, 2026")}). An HHS statement cited by NBC News said at least one version remains available from at least one manufacturer at any given time, even if certain brands or strengths are hard to find (${ext(S.nbc, "NBC News")}).</p>
<h3>What pharmacists and patients report</h3>
<ul>
<li><strong>A separate shortage list.</strong> The American Society of Health-System Pharmacists, which runs its own shortage database on different criteria from the FDA's, has listed estradiol patches as in shortage for much of 2026, as NBC News and others have reported (${ext(S.nbc, "NBC News")}). Under ASHP's approach, one missing strength from one company can be enough for a listing, which is part of why the two lists disagree.</li>
<li><strong>Spreading to other forms.</strong> Reuters reported on October 28 that shortages have moved beyond patches: CVS Health said manufacturers had struggled for several months to supply certain strengths of estradiol injections, and supply disruptions were reported for some vaginal estradiol creams. A consultant quoted by Reuters suggested part of the new pressure may come from women switching away from patches they cannot find (${ext(S.reutersOct28, "Reuters, October 28, 2026")}).</li>
<li><strong>Brand-specific timelines.</strong> CBS New York reported that Bayer expects periodic supply shortages of its Climara patch until at least early 2027 (${ext(S.cbsNy, "CBS New York")}).</li>
<li><strong>Weekly patches falling off.</strong> Healthline reported that makers were running at full capacity, that a weekly patch still seemed available, and that some women found it came off before seven days (${ext(S.healthline, "Healthline")}).</li>
</ul>
<h3>Political pressure</h3>
<p>Senators Kirsten Gillibrand, Tammy Duckworth and Adam Schiff wrote to the FDA asking for written answers by November 16, 2026, including what criteria must be met for the FDA to declare an official shortage, what remedial steps it has taken and whether it forecast the rise in demand after the boxed warning was removed (${ext(S.senators, "Senator Gillibrand's office")}). The FDA's answer, if published, may clarify how long the current situation is expected to last.</p>
<h3>Why the designation matters</h3>
<p>Whether or not patches are formally "in shortage" is the question the senators put to the FDA, and the agency's answer will shape how the problem is handled. A single official status would also give patients, pharmacists and prescribers a shared reference point. Without it, a woman's experience depends heavily on her pharmacy, her brand and her strength. That is the practical reason to have a backup plan agreed with your prescriber before you run out, rather than after.</p>
<h3>What this means for you</h3>
<p>Expect your usual patch to be available some months and not others, and expect that switching to another form may not always be simple either, given the October reports about injectables and some vaginal creams. The next section is the practical plan.</p>`,
    },
    {
      heading: "What should you do if your estrogen patch is out of stock?",
      body: `<p><strong>Do not stop suddenly and do not improvise. Ask the pharmacist what they can find, then ask your prescriber to choose an alternative: another brand or generic of the same strength, a different available strength or schedule, or another route such as a gel, spray or pill. Only the prescriber should decide the new product and dose. If you have a uterus, keep taking your progestogen.</strong></p>
<p>This is the part of 2026 most readers will actually face. The FDA's own advice is that a pharmacist may be able to check other locations, identify another FDA-approved estradiol patch that can be substituted when appropriate, or tell you when new stock is expected (${ext(S.fdaPatch, "FDA")}). Healthline's reporting lists gels and sprays, tablets and, for local symptoms only, vaginal estrogen as the alternatives clinicians commonly consider (${ext(S.healthline, "Healthline")}). We deliberately give no dose conversions here: equivalent doses differ between products and people, and getting them wrong can mean returning symptoms or more side effects. Your prescriber has the tools to make that call.</p>
<h3>Step by step</h3>
<ol>
<li><strong>Start before you run out.</strong> Ask for your refill as early as your plan allows, and ask the pharmacy to order ahead.</li>
<li><strong>Ask the pharmacist three questions.</strong> Can another branch or pharmacy fill it? Is another FDA-approved patch of the same strength in stock that can be substituted? When is the next delivery expected?</li>
<li><strong>If nothing is available, call your prescriber, not a forum.</strong> Tell them what the pharmacy has in stock. That list is the most useful thing you can bring.</li>
<li><strong>Agree a switch, in writing.</strong> A new prescription with the product, schedule and any follow-up check written down.</li>
<li><strong>Keep the progestogen going.</strong> If you have a uterus and use systemic estrogen, the progestogen protects the lining of the womb whatever the estrogen route.</li>
<li><strong>Note what changes.</strong> Symptoms, bleeding, skin reactions or headaches in the weeks after a switch; report them at your review.</li>
<li><strong>Plan the way back.</strong> Ask whether you should return to your original patch when it is available, or stay on what is working.</li>
</ol>
<h3>Options to discuss with your prescriber</h3>
<table>
<thead><tr><th>Option</th><th>How it relates to your patch</th><th>Questions to ask</th><th>Watch-outs</th></tr></thead>
<tbody>
<tr><td>Same strength, different brand or generic patch</td><td>Same route and hormone; adhesive and size differ</td><td>Is it substitutable for mine? Is it once- or twice-weekly?</td><td>The change day may differ; adhesion and skin reaction vary by brand</td></tr>
<tr><td>Different strength or schedule of patch</td><td>Same route; the FDA says availability differs by strength and once- versus twice-weekly formulation</td><td>Which available strength or schedule would you prescribe for me?</td><td>Only your prescriber should choose it; never cut or combine patches on your own</td></tr>
<tr><td>Estradiol gel</td><td>Also transdermal, so it shares the patch's skin-route profile</td><td>Which product, where and when to apply it, and when we review</td><td>Daily use; let it dry; avoid skin contact with children and pets until dry</td></tr>
<tr><td>Estradiol spray</td><td>Transdermal, applied to the forearm</td><td>As for the gel; is it covered by my plan?</td><td>Daily use and drying time; coverage and stock vary</td></tr>
<tr><td>Estradiol tablet</td><td>Oral route; passes through the liver first</td><td>Is a pill reasonable given my clot, migraine, blood pressure and weight history?</td><td>More clot risk than transdermal routes in observational studies; not the default if you have extra risk factors</td></tr>
<tr><td>Combined estrogen-progestogen patch</td><td>Both hormones in one patch, for women with a uterus</td><td>Would a combined patch suit me, and is one available?</td><td>Replaces your separate progestogen; only on prescription advice</td></tr>
<tr><td>Low-dose vaginal estrogen</td><td>Treats vaginal and urinary symptoms only</td><td>Do I need this as well as, not instead of, systemic therapy?</td><td>Does not treat hot flashes; some vaginal creams have had supply disruptions too</td></tr>
<tr><td>A short gap with a plan</td><td>Only if your prescriber agrees there is no suitable alternative</td><td>What should I expect, and when do I call?</td><td>Symptoms may return; do not stop the progestogen without advice</td></tr>
<tr><td>A non-hormonal medicine</td><td>A different treatment altogether</td><td>Is a non-hormonal option sensible while supply is uncertain?</td><td>Different side effects and monitoring; see the guideline ladders above</td></tr>
</tbody>
</table>
<p>Sources for the options: ${ext(S.fdaPatch, "FDA patch availability update")}; ${ext(S.hhsOct30, "HHS, October 30, 2026")}; ${ext(S.healthline, "Healthline")}; ${ext(S.reutersOct28, "Reuters")}; ${ext(S.tms2022, "Menopause Society 2022")} on routes and clot risk. The route differences are covered in detail in <a href="/hrt/articles/estrogen-patch-vs-pill">estrogen patch vs pill</a>.</p>
<h3>What not to do</h3>
<ul>
<li>Do not cut, stack or stretch patches to make a supply last.</li>
<li>Do not buy hormones from unverified online sellers or switch to compounded products to get around a shortage without a clinician's advice.</li>
<li>Do not stop your progestogen because your estrogen changed.</li>
<li>Do not assume a pill is "the same" as a patch. Symptom relief is similar; the risk profile is not identical.</li>
</ul>
<h3>If you use an online provider</h3>
<p>The pricing guide we keep notes that services which ship medication handle sourcing themselves, while a prescription sent to your own pharmacy may need a brand switch when stock runs short (<a href="/hrt/articles/online-hrt-cost">online HRT cost</a>). Either way, message the clinician early. The provider section below sets out what each of the services we review offers.</p>`,
    },
    {
      heading: "What does the first generic Climara Pro mean for you?",
      body: `<p><strong>The FDA announced on October 20, 2026, that it had approved Zydus Pharmaceuticals' estradiol and levonorgestrel transdermal system, the first generic of Bayer's Climara Pro, a once-weekly patch that combines an estrogen and a progestin for women with a uterus. It is rated therapeutically equivalent to the brand. Zydus has not yet said when it will be on sale.</strong></p>
<p>Sources: ${ext(S.fdaGeneric, "FDA press announcement")}; ${ext(S.healioGeneric, "Healio, October 20, 2026")}; ${ext(S.usnewsGeneric, "HealthDay via US News, October 21, 2026")}. The FDA's release is dated October 20 and describes the approval as having come the previous day. We had seen the approval described elsewhere as October 22; the FDA's own dates are the ones we use.</p>
<h3>The facts as reported</h3>
<ul>
<li><strong>What it is.</strong> A weekly patch delivering estradiol and levonorgestrel, at the same labelled strength as Climara Pro (0.045 mg estradiol and 0.015 mg levonorgestrel per day). The progestin protects the lining of the womb (${ext(S.healioGeneric, "Healio")}). The strength is the one on the label; whether it is right for you is your prescriber's decision.</li>
<li><strong>What it is for.</strong> Moderate to severe hot flashes and night sweats in women with a uterus; Zydus's label also covers prevention of postmenopausal osteoporosis, as reported (${ext(S.healioGeneric, "Healio")}).</li>
<li><strong>Exclusivity.</strong> Zydus's application was designated a Competitive Generic Therapy, which can bring 180 days of market exclusivity once the product launches, according to trade press (${ext(S.cgt, "Indian Pharma Post")}).</li>
<li><strong>When.</strong> No launch date had been announced as of the reports we found (${ext(S.usnewsGeneric, "HealthDay")}).</li>
</ul>
<h3>What it changes and what it does not</h3>
<p>A generic usually means a lower price over time, especially once more than one manufacturer is selling it, and it adds another source of a combined patch at a time when patch supply is tight. It does not change the evidence on combined hormone therapy, and it does not help a woman who needs a different strength or who does not have a uterus. For a woman with a uterus who would rather wear one patch than take a separate progestogen, it may become a cheaper way to do that once it is in pharmacies.</p>
<h3>What to ask</h3>
<ul>
<li>"Would a combined weekly patch suit me better than separate estrogen and progesterone?"</li>
<li>"If I switch to a combined patch, what happens to my bleeding pattern, and when should I report bleeding?"</li>
<li>"Will my plan cover the generic when it launches, and at what tier?"</li>
</ul>`,
    },
    {
      heading: "What came out of The Menopause Society's 2026 meeting?",
      body: `<p><strong>The Menopause Society's 2026 Annual Meeting ran October 20-24 in San Diego (${ext(S.tmsMeeting, "Menopause Society")}). Several studies drew attention, most importantly an observational signal of more cardiovascular events in postmenopausal women who started testosterone. Everything below is conference data released through press releases and news reports. It has not been through full peer review, and meeting abstracts are typically published later.</strong></p>
<h3>Testosterone and cardiovascular events (observational)</h3>
<p>Researchers presented a retrospective, propensity-matched cohort study of more than 6,300 postmenopausal women aged 45 and older drawn from the TriNetX US Collaborative Network, a large database of health records. Women with previous cardiovascular disease were excluded. Composite cardiovascular events, including angina, heart attack, ischaemic heart disease, ischaemic stroke and heart failure, occurred in 3.8% of women who started testosterone compared with 0.5% of matched women who did not, a hazard ratio of 8.08. Excluding women with any hormone therapy exposure gave 3.1% versus 0% (${ext(S.testRun, "Renal and Urology News")}; ${ext(S.tmsTestPr, "Menopause Society press release")}). The lead researcher called it "a potentially important cardiovascular safety signal," and the society's medical director, Stephanie Faubion, noted that long-term safety data on testosterone in women are lacking (${ext(S.tmsTestPr, "Menopause Society")}).</p>
<p>How much weight to give it: an applied statistician reviewing the press release for the UK Science Media Centre called the eight-fold difference concerning and the evidence suggestive, but pointed out that the study is observational, that follow-up averaged about three years, that the outcomes were new diagnoses in records, and that there was no full paper to examine (${ext(S.testSmc, "Science Media Centre")}). Medical Daily noted that the absolute risk stayed low (${ext(S.testMd, "Medical Daily")}). Women who are prescribed testosterone may differ from those who are not in ways a database cannot fully capture.</p>
<p>What it means for you: testosterone for women is prescribed off-label in the US, and The Menopause Society's position is that it is recommended only for hypoactive sexual desire disorder in select, appropriately screened postmenopausal women and is not recommended for cardiovascular prevention (${ext(S.tmsMisinfo, "Menopause Society statement")}). If you use it, the reasonable response to this signal is a conversation about your indication, your levels, your blood pressure and lipids, and whether the benefit you are getting justifies continuing. It is not a reason to stop abruptly without advice. Our guide to <a href="/hrt/articles/testosterone-for-menopausal-women">testosterone for menopausal women</a> covers the evidence and monitoring.</p>
<h3>Autoimmune disease by hormone therapy type (observational)</h3>
<p>A second study compared estrogen-only therapy with estrogen-plus-progestogen therapy. Estrogen alone was associated with a slightly higher composite risk of autoimmune disease: cumulative incidence 4.9% versus 4.5%, hazard ratio 1.08 (95% CI 1.02-1.14). The presenters stressed that absolute differences were small and that most individual diseases showed no significant difference; the release described higher hazards for some, including lupus, rheumatoid arthritis and psoriasis (${ext(S.autoPr, "Menopause Society press release")}; ${ext(S.autoHealio, "Healio, October 22, 2026")}). An expert quoted by Healio said hormone therapy continues to be the first-line therapy for menopause symptoms. The comparison is between two types of hormone therapy, not between hormone therapy and none, and the sources we found do not say whether route made a difference.</p>
<h3>Hormone therapy and GLP-1 weight loss (observational)</h3>
<p>A retrospective cohort of about 3,900 midlife women on semaglutide or tirzepatide reported more weight loss among those also on hormone therapy: about 11% of body weight at one year versus 9.5% (${ext(S.glpHealio, "Healio, October 23, 2026")}). The difference was clearest with semaglutide; for tirzepatide it did not reach statistical significance in the final results (${ext(S.glpMx, "Medical Xpress")}). Experts quoted in coverage advised against adding hormone therapy only to boost weight loss. Hormone therapy is not a weight-loss treatment.</p>
<h3>Menopause and work</h3>
<p>A study released for the meeting reported that psychological symptoms, rather than physical ones, appeared to be the main drivers of intention to leave a job among perimenopausal and postmenopausal employees (${ext(S.workPr, "Menopause Society press release")}). It is a reminder that brain fog, anxiety and low mood around menopause are worth raising with a clinician even if hot flashes are mild.</p>
<h3>How to treat conference news</h3>
<table>
<thead><tr><th>Study</th><th>Design</th><th>Headline result</th><th>Evidence level</th></tr></thead>
<tbody>
<tr><td>Testosterone and cardiovascular events</td><td>Retrospective, propensity-matched records study, women 45+</td><td>3.8% vs 0.5% composite events; HR 8.08</td><td>Observational conference data; association, not cause</td></tr>
<tr><td>Autoimmune disease by regimen</td><td>Observational comparison of estrogen alone vs estrogen plus progestogen</td><td>4.9% vs 4.5%; HR 1.08</td><td>Observational conference data; small absolute difference</td></tr>
<tr><td>Hormone therapy with GLP-1 drugs</td><td>Retrospective cohort, about 3,900 women</td><td>11% vs 9.5% weight loss at one year</td><td>Observational conference data; clearest with semaglutide</td></tr>
<tr><td>Symptoms and work</td><td>Survey-based study</td><td>Psychological symptoms linked to turnover intention</td><td>Conference data</td></tr>
</tbody>
</table>`,
    },
    {
      heading: "Who is a candidate for hormone therapy, and who isn't?",
      body: `<p><strong>The best-supported candidate is a woman with bothersome hot flashes or night sweats, under 60 or within 10 years of her last period, with none of the label's contraindications. The clearest non-candidates are women with a history of breast cancer or another estrogen-dependent cancer, unexplained vaginal bleeding, a past blood clot, stroke or heart attack, active liver disease, a known clotting disorder, or pregnancy.</strong></p>
<h3>Who this guide's "yes" applies to</h3>
<ul>
<li>Women in perimenopause or early postmenopause with vasomotor symptoms that affect sleep, work or quality of life. All three bodies put hormone therapy first for this group (${ext(S.acpNews, "ACP")}; ${ext(S.acogCpg, "ACOG")}; ${ext(S.tms2022, "Menopause Society")}).</li>
<li>Women who had early or surgical menopause, for whom specialist guidance has long supported replacement at least until the average age of natural menopause unless there is a contraindication (see <a href="/hrt/articles/when-to-start-hrt">when to start HRT</a>).</li>
<li>Women at raised risk of bone loss who are also within the timing window, for whom bone protection is a recognised benefit (${ext(S.tms2022, "Menopause Society 2022")}).</li>
<li>Women already on hormone therapy who are doing well and want to know whether 2026 changes anything for them. For most, it does not.</li>
</ul>
<h3>Who should not take systemic estrogen</h3>
<p>The contraindications section of an FDA-approved estradiol patch label lists the following (${ext(S.dailymedPatch, "DailyMed, estradiol transdermal system label")}):</p>
<ul>
<li>Undiagnosed abnormal genital bleeding</li>
<li>Known, suspected or past breast cancer</li>
<li>Known or suspected estrogen-dependent cancer</li>
<li>Active deep vein thrombosis or pulmonary embolism, or a history of them</li>
<li>Active arterial thromboembolic disease, such as stroke or heart attack, or a history of it</li>
<li>Known anaphylaxis, angioedema or hypersensitivity to the product</li>
<li>Liver impairment or disease</li>
<li>Protein C, protein S or antithrombin deficiency, or another known clotting disorder</li>
<li>Known or suspected pregnancy</li>
</ul>
<p>Labels differ slightly by product, so the leaflet for your own prescription is the definitive list. None of these changed with the 2025-2026 label revisions.</p>
<h3>Who needs a more careful conversation</h3>
<ul>
<li><strong>Women starting for the first time after 60 or more than 10 years after menopause.</strong> Not forbidden, but outside the window ACOG strongly recommends and where the Menopause Society says the balance is less favourable (${ext(S.acogCpg, "ACOG")}; ${ext(S.tms2022, "Menopause Society")}).</li>
<li><strong>Women with migraine with aura, high blood pressure, obesity, diabetes, high triglycerides, gallbladder disease or who smoke.</strong> Often still candidates, usually for a transdermal route; see <a href="/hrt/articles/estrogen-patch-vs-pill">estrogen patch vs pill</a>.</li>
<li><strong>Women with a strong family history of breast cancer or a known gene variant.</strong> A specialist conversation, not an automatic no.</li>
<li><strong>Women whose main symptom is low mood.</strong> ACOG found insufficient evidence for hormone therapy as a treatment for menopause-related depressive symptoms (${ext(S.acogCog, "Contemporary OB/GYN")}).</li>
</ul>
<h3>Who this guide is not for</h3>
<ul>
<li>Breast cancer survivors looking for a green light: there is none. Non-hormonal options come first, and vaginal estrogen is a decision with the oncology team; ACOG has separate clinical guidance on urogenital symptoms after estrogen-dependent breast cancer (${ext(S.acogBreastGsm, "ACOG Clinical Consensus, 2021")}).</li>
<li>Anyone seeking hormones to prevent heart disease or dementia. No guideline recommends that.</li>
<li>Anyone looking for a dosing or switching protocol to follow without a prescriber. This guide deliberately contains none.</li>
</ul>`,
    },
    {
      heading: "Do you need a progestogen with estrogen?",
      body: `<p><strong>If you have a uterus and use systemic estrogen, yes. Estrogen alone thickens the lining of the womb and raises the risk of endometrial cancer; a progestogen prevents that. If you have had a hysterectomy, estrogen alone is the usual choice. Both 2026 guidelines say exactly this.</strong></p>
<p>The ACP recommends estrogen plus progestogen for women with a uterus and estrogen alone for women without one (${ext(S.acpNews, "ACP")}); ACOG says the same, with conjugated estrogens plus bazedoxifene as a conditional alternative to a progestogen (${ext(S.acogCpg, "ACOG")}). The endometrial cancer boxed warning is the one the FDA kept on systemic estrogen-alone products, precisely so this instruction cannot be missed (${ext(S.fdaNov2025, "FDA, November 2025")}).</p>
<table>
<thead><tr><th>Option for endometrial protection</th><th>What it is</th><th>Points to discuss</th></tr></thead>
<tbody>
<tr><td>Oral micronized progesterone</td><td>Body-identical progesterone capsule, taken daily or cyclically</td><td>Can cause drowsiness; often taken at night; cyclical use usually brings a monthly bleed</td></tr>
<tr><td>Synthetic progestins</td><td>Tablets such as those in older combined regimens</td><td>The WHI used medroxyprogesterone acetate; many clinicians now prefer micronized progesterone, though head-to-head evidence is limited</td></tr>
<tr><td>Combined estrogen-progestogen patch</td><td>Both hormones in one patch, such as Climara Pro and its new generic</td><td>One product; less flexibility to adjust each hormone separately</td></tr>
<tr><td>Levonorgestrel intrauterine device</td><td>A hormonal IUD that protects the lining locally</td><td>Also contraception, which matters in perimenopause; use for endometrial protection is a prescriber's decision</td></tr>
<tr><td>Conjugated estrogens with bazedoxifene</td><td>A combined pill (Duavee) in which bazedoxifene protects the lining</td><td>Conditional alternative in ACOG's guideline</td></tr>
</tbody>
</table>
<p>Our guide to <a href="/hrt/articles/progesterone-side-effects">progesterone for menopause</a> covers each option, including why progesterone in a body cream is not considered reliable protection.</p>
<h3>Estrogen alone versus combined: the risk differences</h3>
<p>In the WHI, the estrogen-alone and combined arms behaved differently, particularly for breast cancer, which is one reason the progestogen choice gets so much attention; the details are in our <a href="/hrt/articles/hrt-black-box-warning-removed">black box guide</a> and <a href="/hrt/articles/is-hrt-safe">Is HRT safe?</a> The 2026 meeting added a small observational signal in the other direction for autoimmune disease, with estrogen alone associated with a slightly higher composite risk than combined therapy (${ext(S.autoPr, "Menopause Society press release")}). Neither finding is a reason to choose a regimen you do not need. The choice is driven by whether you have a uterus.</p>
<h3>In perimenopause</h3>
<p>Women who still have periods usually use a cyclical progestogen or a hormonal IUD, and hormone therapy is not contraception. If you could still become pregnant, contraception is a separate question to raise; see <a href="/hrt/articles/hrt-for-perimenopause">HRT for perimenopause</a>.</p>`,
    },
    {
      heading: "How do the routes of estrogen compare?",
      body: `<p><strong>Pills, patches, gels and sprays all relieve hot flashes well. The main difference is safety: swallowed estrogen passes through the liver first, which is linked to more clot risk; estrogen through the skin largely avoids that. In 2026 there is a second difference: availability.</strong></p>
<p>The Menopause Society's 2022 statement says transdermal routes and lower doses may reduce the risk of venous blood clots and stroke (${ext(S.tms2022, "Menopause Society 2022")}). The large observational studies behind that view are summarised in <a href="/hrt/articles/estrogen-patch-vs-pill">estrogen patch vs pill</a>.</p>
<table>
<thead><tr><th>Route</th><th>How it is used</th><th>Reaches</th><th>Clot profile</th><th>2026 availability</th><th>Often suits</th></tr></thead>
<tbody>
<tr><td>Patch</td><td>Worn on the skin, changed once or twice a week by brand</td><td>Whole body</td><td>Lower than pills in observational studies</td><td>Intermittently hard to find; no FDA shortage designation (${ext(S.reutersOct30, "Reuters")})</td><td>Women with clot, migraine, blood pressure or weight-related risk factors</td></tr>
<tr><td>Gel</td><td>Applied to the skin daily</td><td>Whole body</td><td>Transdermal; shares the patch's profile</td><td>Commonly suggested alternative to patches (${ext(S.healthline, "Healthline")})</td><td>Women who react to adhesives or want flexible adjustment</td></tr>
<tr><td>Spray</td><td>Sprayed on the forearm daily</td><td>Whole body</td><td>Transdermal</td><td>Alternative; coverage varies</td><td>As for gel</td></tr>
<tr><td>Tablet</td><td>Swallowed daily</td><td>Whole body, via the liver</td><td>Higher than transdermal in observational studies</td><td>Widely available and affordable, as reported (${ext(S.healthline, "Healthline")})</td><td>Healthy women near menopause without extra risk who want simplicity and low cost</td></tr>
<tr><td>Combined patch</td><td>Estrogen plus progestin, weekly or twice weekly</td><td>Whole body</td><td>Transdermal estrogen</td><td>First generic Climara Pro approved, launch date not announced (${ext(S.fdaGeneric, "FDA")})</td><td>Women with a uterus who prefer one product</td></tr>
<tr><td>Injection</td><td>Given by injection at intervals</td><td>Whole body</td><td>Not the usual menopause route</td><td>Some strengths short, per CVS (${ext(S.reutersOct28, "Reuters")})</td><td>Specific clinical situations</td></tr>
<tr><td>Low-dose vaginal estrogen</td><td>Cream, insert or ring</td><td>Mainly local tissue</td><td>Minimal absorption</td><td>Some creams disrupted (${ext(S.reutersOct28, "Reuters")})</td><td>Dryness, painful sex, urinary symptoms</td></tr>
</tbody>
</table>
<h3>How to use this table</h3>
<p>For a healthy woman in her early 50s, the absolute difference in risk between a pill and a patch is small, and preference, cost and what is in stock reasonably carry weight. For a woman with migraine with aura, obesity, high blood pressure or a family history of clots, the case for a transdermal route is stronger, and a gel or spray may be a better fallback than a pill when patches are scarce. That judgment belongs to the prescriber who knows your history.</p>
<h3>What switching routes means in practice</h3>
<ul>
<li><strong>Patch to gel or spray:</strong> same broad category, new daily routine. Ask how and where to apply, and how long to let it dry.</li>
<li><strong>Patch to pill:</strong> a change of risk profile as well as routine. Ask whether it is suitable for you specifically.</li>
<li><strong>Any switch:</strong> expect a few weeks of adjustment and plan a check-in. The ACP's 8-to-12-week assessment point is a reasonable frame (${ext(S.acpMedscape, "Medscape")}).</li>
</ul>`,
    },
    {
      heading: "What about vaginal estrogen?",
      body: `<p><strong>Low-dose vaginal estrogen treats dryness, painful sex and some urinary symptoms directly, with minimal absorption into the bloodstream. It was the least controversial part of the label change, and in October 2026 the FDA said it is exploring over-the-counter availability. It does not treat hot flashes.</strong></p>
<p>The genitourinary syndrome of menopause is the cluster of vaginal dryness, irritation, pain with sex and urinary urgency or recurrent infections that follows the fall in estrogen. Unlike hot flashes, it tends to persist or worsen with time. The Menopause Society recommends low-dose vaginal estrogen, or alternatives such as vaginal DHEA (prasterone) or oral ospemifene, for bothersome symptoms not relieved by over-the-counter moisturisers and lubricants (${ext(S.tms2022, "Menopause Society 2022")}). When the FDA announced the label change in November 2025, The Menopause Society agreed with removing the box from low-dose vaginal estrogen, saying the old warning had likely deterred women from a safe and effective treatment (${ext(S.tmsFdaComment, "Menopause Society comment")}), and ACOG commended that part of the decision (${ext(S.acogNov2025, "ACOG")}).</p>
<h3>What changed in 2026</h3>
<ul>
<li><strong>Labels.</strong> Estring, a vaginal estradiol ring, was among the six products relabelled in February 2026 (see our <a href="/hrt/articles/hrt-black-box-warning-removed">black box guide</a>).</li>
<li><strong>Possible OTC status.</strong> On October 30 the FDA said it is exploring with sponsors the potential for over-the-counter vaginal estrogen (${ext(S.hhsOct30, "HHS")}). No such product has been approved; it remains prescription-only.</li>
<li><strong>Supply.</strong> Reuters reported disruptions involving some vaginal estradiol creams from several manufacturers, while Viatris said it was meeting its supply plans for its cream (${ext(S.reutersOct28, "Reuters, October 28, 2026")}).</li>
</ul>
<h3>Who it suits</h3>
<ul>
<li>Women with genitourinary symptoms at any age, including those well past the systemic-therapy timing window.</li>
<li>Women on systemic therapy whose vaginal symptoms persist despite it.</li>
<li>Many women who cannot take systemic estrogen; breast cancer survivors decide with their oncology team, and ACOG has separate guidance for that situation (${ext(S.acogBreastGsm, "ACOG Clinical Consensus, 2021")}).</li>
</ul>
<h3>What it is not</h3>
<p>Vaginal estrogen is not a substitute for systemic therapy if your problem is hot flashes, and it is not a workaround for a patch shortage in that sense. If your pharmacy suggests it as an alternative to a missing patch, check with your prescriber that it is meant to treat your symptoms. The Menopause Society also notes that more research is needed on long-term low-dose vaginal estrogen after breast or endometrial cancer (${ext(S.tms2022, "Menopause Society 2022")}).</p>`,
    },
    {
      heading: "What if hormone therapy isn't for you?",
      body: `<p><strong>Both 2026 guidelines give non-hormonal treatments a defined place. The ACP suggests an SNRI second, then an SSRI, gabapentin or a neurokinin receptor antagonist. ACOG strongly recommends neurokinin receptor antagonists for women who cannot or do not want hormones, plus SSRIs or SNRIs when mood is also affected, gabapentin as a fallback, and several non-drug approaches.</strong></p>
<table>
<thead><tr><th>Option</th><th>Type</th><th>ACOG 2026</th><th>ACP 2026</th></tr></thead>
<tbody>
<tr><td>Fezolinetant, elinzanetant</td><td>Neurokinin receptor antagonists</td><td>Strongly recommended if hormones are unsuitable or unwanted</td><td>Third-line, conditional</td></tr>
<tr><td>Desvenlafaxine, venlafaxine</td><td>SNRIs</td><td>Recommended where mood and hot flashes coexist</td><td>Second-line, conditional, moderate certainty</td></tr>
<tr><td>Escitalopram, paroxetine</td><td>SSRIs</td><td>Recommended where mood and hot flashes coexist</td><td>Third-line, conditional</td></tr>
<tr><td>Gabapentin</td><td>Anticonvulsant</td><td>Suggested when other non-hormonal options fail or are poorly tolerated</td><td>Third-line, conditional</td></tr>
<tr><td>CBT, mindfulness, exercise, clinical hypnosis, acupuncture</td><td>Non-drug</td><td>Conditional</td><td>Outside scope</td></tr>
<tr><td>Soy isoflavones, herbal supplements</td><td>Supplements</td><td>Evidence does not support safety or efficacy</td><td>Not recommended in the ladder</td></tr>
</tbody>
</table>
<p>Sources: ${ext(S.acogCpg, "ACOG CPG No. 13")}; ${ext(S.acogCog, "Contemporary OB/GYN")}; ${ext(S.nprAcog, "NPR")}; ${ext(S.acpNews, "ACP")}.</p>
<h3>Choosing between them</h3>
<p>The non-hormonal medicines are a real treatment path, not a consolation prize, and they matter more in 2026 because of the patch supply problem. Each has its own side effects and, for the neurokinin antagonists, its own monitoring requirements on the label. Which one fits depends on your other conditions and medicines, especially if you take tamoxifen or another drug that interacts with certain antidepressants, and on cost and coverage. Our guide to <a href="/hrt/articles/non-hormonal-menopause-treatment">non-hormonal menopause treatment</a> compares them.</p>
<h3>When a non-hormonal option may make sense even if you could take hormones</h3>
<ul>
<li>You prefer not to take hormones after an informed discussion. That is a legitimate choice, and ACOG's guideline explicitly covers it.</li>
<li>You have both bothersome low mood and hot flashes, where ACOG points to SSRIs or SNRIs.</li>
<li>You are well outside the timing window and your clinician judges systemic estrogen less favourable for you.</li>
</ul>`,
    },
    {
      heading: "Does hormone therapy help sleep, mood and brain fog?",
      body: `<p><strong>For sleep, yes when the sleep problem is caused by night sweats: ACOG strongly recommends systemic hormone therapy for vasomotor symptoms and the sleep disturbance they cause. For mood, ACOG found the evidence insufficient to recommend hormone therapy for menopause-related depressive symptoms. For brain fog, treating night sweats can help indirectly, but no guideline recommends hormones as a cognitive treatment.</strong></p>
<p>ACOG's new guideline is the first major US guideline to take sleep and mood on directly alongside hot flashes, which is why its title names all three (${ext(S.acogCpg, "ACOG CPG No. 13")}). The way it handles each is instructive.</p>
<h3>Sleep</h3>
<p>The recommendation is tied to sleep disturbance caused by vasomotor symptoms: the woman who wakes drenched at 3 a.m. That is where the evidence is strongest. For the same problem, ACOG lists conjugated estrogens with bazedoxifene as a conditional alternative to estrogen with a progestogen, and strongly recommends neurokinin receptor antagonists for women who cannot or do not want hormones (${ext(S.acogCog, "Contemporary OB/GYN")}). Non-drug options with conditional recommendations, including cognitive behavioural therapy and clinical hypnosis, also have a place. If your sleep problem has another cause, such as sleep apnoea, which becomes more common in midlife, hormone therapy is not the answer to it, and a clinician should look for that cause.</p>
<h3>Mood</h3>
<p>ACOG says the available evidence is insufficient to recommend for or against estrogen-progestogen or estrogen-only therapy for menopause-related depressive symptoms, and that major depression should be treated according to depression guidelines (${ext(S.acogCog, "Contemporary OB/GYN")}). Where mood symptoms and hot flashes occur together in a woman not using hormones, ACOG points to SSRIs or SNRIs, which can address both (${ext(S.acogCpg, "ACOG")}). This is a more cautious position than some social media claims about hormones as an antidepressant, and it is worth knowing before a visit.</p>
<h3>Brain fog and work</h3>
<p>Brain fog is common around menopause and is not dementia. The 2026 meeting research on work found psychological symptoms, rather than physical ones, were the main drivers of women's intention to leave their jobs (${ext(S.workPr, "Menopause Society press release")}), which makes these symptoms worth raising even when hot flashes are mild. Better sleep after night sweats are treated often improves concentration. Hormone therapy is not recommended to prevent dementia at any age, and the dementia statement that left the boxed warning did so because it came from women who started at 65 or older, as our <a href="/hrt/articles/hrt-black-box-warning-removed">black box guide</a> explains.</p>
<h3>What this means for you</h3>
<ul>
<li>If night sweats are wrecking your sleep, that is one of the clearest reasons to discuss hormone therapy in 2026.</li>
<li>If low mood is your main symptom, ask about depression treatment as well as, or instead of, hormones.</li>
<li>If brain fog worries you, describe it specifically: when it happens, how it affects work, and whether it tracks your sleep.</li>
</ul>`,
    },
    {
      heading: "When should you start, and how long can you stay on it?",
      body: `<p><strong>The best-supported time to start is before 60 or within 10 years of your last period, which ACOG now makes a strong recommendation. There is no fixed age at which you must stop: ACOG individualises the decision, the ACP says the optimal duration is unknown, and The Menopause Society says a routine stop at 65 is not supported by data.</strong></p>
<h3>Starting</h3>
<p>The "before 60 or within 10 years" rule appears in all three bodies' thinking in some form (${ext(S.acogCpg, "ACOG")}; ${ext(S.tms2022, "Menopause Society 2022")}). It rests on the WHI re-analyses by age described above: absolute risks are low in women in their 50s and higher in women who start much later (${ext(S.whiHms, "Harvard Medical School")}). If you are 58 and four years past menopause, you are inside the window. If you are 62 and twelve years past, you are outside it, and a first start needs a more careful look at your cardiovascular risk, often with a preference for transdermal estrogen. Our guide to <a href="/hrt/articles/when-to-start-hrt">when to start HRT</a> works through perimenopause, early menopause and late starts.</p>
<h3>Staying on it</h3>
<table>
<thead><tr><th>Body</th><th>What it says about duration</th></tr></thead>
<tbody>
<tr><td>ACOG (2026)</td><td>Decisions individualised, weighing age at initiation, other conditions, formulation, route and duration; no fixed stop age reported (${ext(S.acogCpg, "ACOG")})</td></tr>
<tr><td>ACP (2026)</td><td>Optimal duration unknown; 3 to 5 years common in practice; assess efficacy at 8 to 12 weeks (${ext(S.acpMedscape, "Medscape")})</td></tr>
<tr><td>Menopause Society (2022)</td><td>Longer use for documented reasons such as persistent hot flashes, with periodic reassessment; routine discontinuation at 65 not supported (${ext(S.tms2022, "Menopause Society")})</td></tr>
</tbody>
</table>
<p>In practice, that means a yearly review rather than an expiry date. At each review it is reasonable to ask whether you still need it, whether the dose and route are still right, and whether anything in your health has changed. Our guide to <a href="/hrt/articles/how-long-can-you-stay-on-hrt">how long you can stay on HRT</a> covers stopping, tapering and what happens to symptoms.</p>
<h3>Restarting after a gap</h3>
<p>Women who stopped because of the old warnings, or because they could not get their patch in 2026, often ask whether restarting counts as "starting late." That depends on how long ago you began, how long the gap was and your health now. It is a specific question to put to your prescriber rather than one with a general answer.</p>`,
    },
    {
      heading: "What 2026 means for you: five situations worked through",
      body: `<p><em>Illustrative examples, not real patients and not medical advice. Each shows how the 2026 changes apply, not what any individual should be prescribed.</em></p>
<h3>1. 51, perimenopausal, never tried hormones</h3>
<p>Night sweats wake her three times a night; periods are irregular; no history of clots, breast cancer or migraine with aura. Both 2026 guidelines put hormone therapy first for her. Her clinician is likely to discuss systemic estradiol with a progestogen suited to perimenopause, and given the patch supply picture, may discuss a gel or another option at the outset. A review at 8 to 12 weeks is reasonable under the ACP's framing.</p>
<h3>2. 56, on a patch for four years, pharmacy is out</h3>
<p>She feels well and has a uterus. Nothing in the guidelines or labels changes her treatment. Her task is practical: ask the pharmacist about other stock or another substitutable patch, then ask her prescriber to choose an alternative if needed, keeping her progesterone throughout. The October label change may mean her next box has new wording; the product is the same.</p>
<h3>3. 63, twelve years past menopause, hot flashes persist</h3>
<p>She is outside the window ACOG strongly recommends for starting. That does not rule hormones out, but the conversation is more careful: cardiovascular risk, route, and the non-hormonal options both guidelines rank. If she also has vaginal dryness, low-dose vaginal estrogen is a separate, low-absorption option at any age.</p>
<h3>4. 54, on testosterone cream for low desire</h3>
<p>She read about the San Diego testosterone study. It is observational conference data, not proof of harm, but it is a reason to review: is she being treated for the one indication with evidence, are her levels in the female range, what are her blood pressure and lipids, and is she getting enough benefit to justify continuing? She does not stop abruptly; she books a review. See <a href="/hrt/articles/testosterone-for-menopausal-women">testosterone for menopausal women</a>.</p>
<h3>5. 49, breast cancer survivor on tamoxifen</h3>
<p>The headlines do not apply to her. Systemic hormone therapy remains contraindicated after breast cancer. Her options are non-hormonal: ACOG and the ACP both list them, and the choice has to account for tamoxifen interactions. Vaginal symptoms are a separate discussion with her oncology team.</p>
<h3>The decision framework</h3>
<table>
<thead><tr><th>Your situation</th><th>What 2026 changes</th><th>Your next step</th></tr></thead>
<tbody>
<tr><td>Under 60 or within 10 years, symptoms, no contraindications</td><td>Two new guidelines strongly support hormone therapy</td><td>Book a visit; bring your history and the questions below</td></tr>
<tr><td>Already on hormone therapy and doing well</td><td>Nothing clinically; some labels updated</td><td>Keep your yearly review; plan refills early</td></tr>
<tr><td>Patch unavailable</td><td>Supply strain continues; no official shortage</td><td>Pharmacist first, then prescriber for an alternative</td></tr>
<tr><td>Over 60 or more than 10 years out, never used it</td><td>Timing recommendation makes the window explicit</td><td>A careful, ideally specialist, conversation; consider non-hormonal and vaginal options</td></tr>
<tr><td>A contraindication</td><td>Nothing; contraindications unchanged</td><td>Non-hormonal options per the ACOG and ACP ladders</td></tr>
<tr><td>Using testosterone</td><td>New observational signal</td><td>Review indication, levels and cardiovascular risk with your prescriber</td></tr>
</tbody>
</table>`,
    },
    {
      heading: "How should you bring this to an appointment?",
      body: `<p><strong>Bring your facts, a symptom list and specific questions. The new guidelines give you and your clinician a shared reference point; quoting them is reasonable, as long as the conversation is about your history rather than the headlines.</strong></p>
<h3>Before the visit</h3>
<ul>
<li>The date of your last period, or how your cycle has changed.</li>
<li>Your symptoms, ranked by how much they bother you. Two weeks of a simple diary of hot flashes and night waking helps.</li>
<li>Your history: any cancer, clots, stroke, heart disease, migraine with aura, liver disease or unexplained bleeding.</li>
<li>Family history of breast cancer, clots and early heart disease.</li>
<li>A recent blood pressure reading and your current medicines, including supplements.</li>
<li>Your screening dates: mammogram, cervical screening.</li>
<li>If you already use hormones, the exact product, and what your pharmacy has or does not have in stock.</li>
</ul>
<h3>Questions to ask</h3>
<ol>
<li>"Given my age and how long since my last period, how do the benefits and risks balance for me, in absolute numbers?"</li>
<li>"ACOG and the ACP now put hormone therapy first for hot flashes. Does anything in my history change that for me?"</li>
<li>"Which route would you choose for me: patch, gel, spray or pill, and why?"</li>
<li>"Do I need a progestogen, and which one?"</li>
<li>"If my patch is out of stock, what is my backup, and can we put it in writing now?"</li>
<li>"Are the products you are prescribing FDA-approved or compounded?"</li>
<li>"When will we review whether it is working? Is 8 to 12 weeks reasonable?"</li>
<li>"How long do you expect me to stay on it, and how will we decide?"</li>
<li>"If hormones are not right for me, which non-hormonal option would you try first, and why?"</li>
<li>"Would low-dose vaginal estrogen help my dryness or urinary symptoms?"</li>
<li>"If I use testosterone, how should the new study change my monitoring?"</li>
</ol>
<h3>If you feel dismissed</h3>
<p>Some clinicians still practise as if the 2002 warnings were the last word. If yours declines without giving a reason tied to your history, it is fair to ask for that reason, to mention the 2026 ACOG and ACP guidelines, and, if needed, to seek a clinician with menopause training. The Menopause Society's patient pages are a neutral place to start (${ext(S.tmsPatient, "Menopause Society")}). Equally, a clinician who hesitates because of a clot history or a cancer history is applying the label, not being old-fashioned.</p>`,
    },
    {
      heading: "How do online HRT providers fit in 2026?",
      body: `<p><strong>Online menopause clinics are one of the main ways women reach a prescriber without a long wait. The 2026 changes did not change the rules for them: a licensed clinician still has to assess you, the contraindications still apply, and the same products are prescribed. What differs is the care model and, during a patch shortage, who sources the medication.</strong></p>
<p>The three providers we rank work differently. The facts below are the ones we have verified and publish in our reviews; prices are as last checked in October 2026 and can change.</p>
<table>
<thead><tr><th></th><th><a href="/hrt/reviews/winona">Winona</a></th><th><a href="/hrt/reviews/gala">Gala</a></th><th><a href="/hrt/reviews/midi">Midi Health</a></th></tr></thead>
<tbody>
<tr><td>Model</td><td>Physician-reviewed online intake; free consultation, pay only if prescribed; medication shipped monthly</td><td>Licensed provider reviews an online assessment; one flat plan; medication shipped in 1-2 days</td><td>Video visits with clinicians trained in midlife women's health; prescriptions sent to your pharmacy</td></tr>
<tr><td>Estrogen forms</td><td>Estradiol tablets, an estrogen patch, compounded body creams, vaginal estrogen cream</td><td>Estradiol pill or patch, vaginal estradiol</td><td>Prescribed to your pharmacy; hormonal and non-hormonal paths</td></tr>
<tr><td>Progestogen</td><td>Progesterone capsules</td><td>Progesterone</td><td>Via your pharmacy</td></tr>
<tr><td>Published price</td><td>Per product: progesterone from $39, estradiol tablets $54, creams $89, patch $149 a month</td><td>$69 a month flat (October 8, 2026 capture); third-party reports quoted $69 pill and $99 patch plans</td><td>About $50 a visit on average in-network (Midi's figure); $250 first and $150 follow-up self-pay; plus pharmacy cost</td></tr>
<tr><td>Insurance</td><td>Not billed; FSA/HSA eligible</td><td>Not billed; FSA/HSA accepted</td><td>Most commercial PPO plans; not HMO, Medicare or Medicaid</td></tr>
<tr><td>Testosterone</td><td>Not prescribed</td><td>Not listed</td><td>Prescribed in some states</td></tr>
<tr><td>During a patch shortage</td><td>Ships medication itself</td><td>Ships medication itself; pill or patch within the same plan</td><td>Your pharmacy's stock applies; a brand switch may be needed</td></tr>
</tbody>
</table>
<p>Full detail and year-one totals are in <a href="/hrt/articles/online-hrt-cost">how much HRT costs online</a>; the step-by-step process, eligibility and red flags are in <a href="/hrt/articles/how-to-get-hrt-online">how to get HRT online</a>; and the ranking is on our <a href="/hrt">HRT provider page</a>.</p>
<h3>How each fits the 2026 picture</h3>
<ul>
<li><strong>Winona</strong> offers the widest choice of estrogen forms among the three, including FDA-approved tablets and a patch, with a physician reachable by message and no appointment to book. If you want an FDA-approved product, ask for the tablets or patch by name; its body creams are compounded.</li>
<li><strong>Gala</strong> covers estradiol as a pill or a patch under one flat plan and says its price does not rise when your dose changes, which is useful if a supply problem means switching between forms. It also lists non-hormonal options.</li>
<li><strong>Midi Health</strong> suits women with a commercial PPO plan who want a video visit and generic medication through their own pharmacy and insurance, and it is the only one of the three that prescribes testosterone, in some states. Because prescriptions go to your pharmacy, the local stock problem applies, and Midi's clinicians can help choose an alternative.</li>
</ul>
<h3>What to check with any online provider in 2026</h3>
<ul>
<li>Does the intake ask about clots, cancer, migraine, bleeding and blood pressure? It should.</li>
<li>Are the products FDA-approved, and which ones are compounded?</li>
<li>What happens if the product I am prescribed is out of stock?</li>
<li>When is my first review, and can I message a clinician between reviews?</li>
<li>If I use testosterone, what monitoring is included?</li>
</ul>`,
    },
    {
      heading: "Myths and facts after fall 2026",
      body: `<p>The October headlines compressed several different events into a few phrases. This table separates what was said from what was heard.</p>
<table>
<thead><tr><th>What you may have heard</th><th>What the sources say</th></tr></thead>
<tbody>
<tr><td>"Doctors now say every woman should take hormones."</td><td>ACOG and the ACP put hormone therapy first among medicines for bothersome hot flashes in women without contraindications. Neither says all women need treatment, and ACOG's lead author stressed lifestyle first and warned against over-simplifying by tiers (${ext(S.nprAcog, "NPR")}).</td></tr>
<tr><td>"The FDA removed the warnings from all HRT."</td><td>Nine products have revised labels; the rest are in progress. The risks are still in the label, and the endometrial cancer box stays on systemic estrogen-alone products (${ext(S.cogOct30, "Contemporary OB/GYN")}; ${ext(S.fdaNov2025, "FDA")}).</td></tr>
<tr><td>"There is no patch shortage."</td><td>There is no FDA shortage designation. The FDA says supply has roughly doubled; pharmacists' and patients' reports, and ASHP's own list, describe ongoing gaps (${ext(S.reutersOct30, "Reuters")}; ${ext(S.nbc, "NBC News")}).</td></tr>
<tr><td>"If my patch is gone, a pill is the same thing."</td><td>Symptom relief is similar; the clot profile is not. The Menopause Society notes transdermal routes may lower clot and stroke risk (${ext(S.tms2022, "Menopause Society 2022")}). Your prescriber decides.</td></tr>
<tr><td>"The new generic Climara Pro is at the pharmacy."</td><td>It is approved; Zydus had not announced a launch date in the reports we found (${ext(S.usnewsGeneric, "HealthDay")}).</td></tr>
<tr><td>"Testosterone causes heart attacks in women."</td><td>An observational conference study found more cardiovascular diagnoses in women who started testosterone; it shows an association, not cause, and has no full paper yet (${ext(S.testSmc, "Science Media Centre")}).</td></tr>
<tr><td>"Vaginal estrogen is now over the counter."</td><td>The FDA is exploring it with sponsors. It is still prescription-only (${ext(S.hhsOct30, "HHS")}).</td></tr>
<tr><td>"You have to stop at 60 or 65."</td><td>ACOG's timing advice is about starting; ACOG individualises duration, the ACP says the optimal duration is unknown, and The Menopause Society says a routine stop at 65 is not supported (${ext(S.acogCpg, "ACOG")}; ${ext(S.acpMedscape, "Medscape")}; ${ext(S.tms2022, "Menopause Society")}).</td></tr>
<tr><td>"Hormones treat menopause depression."</td><td>ACOG found the evidence insufficient to recommend for or against them for depressive symptoms (${ext(S.acogCog, "Contemporary OB/GYN")}).</td></tr>
<tr><td>"Soy or herbal supplements are a safe natural alternative."</td><td>ACOG says the evidence does not support their safety or efficacy for menopausal symptoms (${ext(S.acogCpg, "ACOG")}).</td></tr>
<tr><td>"Hormones will boost my GLP-1 weight loss."</td><td>One observational conference study reported 11% versus 9.5% weight loss, clearest with semaglutide; experts advised against adding hormones for weight loss alone (${ext(S.glpHealio, "Healio")}).</td></tr>
<tr><td>"Breast cancer survivors can take HRT now."</td><td>A history of breast cancer remains a contraindication on the label (${ext(S.dailymedPatch, "DailyMed")}).</td></tr>
</tbody>
</table>
<h3>Your 2026 refill and supply checklist</h3>
<ul>
<li>Know your exact product, strength and whether it is a once- or twice-weekly patch; the FDA says availability differs by each (${ext(S.hhsOct30, "HHS")}).</li>
<li>Request refills as early as your plan allows.</li>
<li>Agree a written backup option with your prescriber now.</li>
<li>Keep your progestogen supply separate and topped up if you have a uterus.</li>
<li>If you switch, note symptoms and bleeding for your review.</li>
<li>If you use a mail-order service, ask how it handles stock-outs.</li>
<li>If a pharmacy offers a substitute, check it is FDA-approved and that your prescriber agrees.</li>
</ul>`,
    },
    {
      heading: "What we don't know yet",
      body: `<p>The fall 2026 changes rest on strong evidence for one question, whether hormone therapy treats hot flashes effectively with acceptable risk in women near menopause, and leave several others open.</p>
<ul>
<li><strong>When patch supply normalises.</strong> The FDA says output has doubled and capacity is growing; Bayer expects periodic Climara constraints until at least early 2027, as reported; senators have asked the FDA for answers by November 16 (${ext(S.reutersOct30, "Reuters")}; ${ext(S.cbsNy, "CBS New York")}; ${ext(S.senators, "Senator Gillibrand's office")}). Nobody has published a firm date.</li>
<li><strong>Whether other forms will hold up.</strong> October reports of shortages in some injectable estradiol strengths and some vaginal creams suggest pressure is spreading (${ext(S.reutersOct28, "Reuters")}).</li>
<li><strong>When the remaining labels change.</strong> Nine products have revised labels; the FDA says it is working on the rest (${ext(S.cogOct30, "Contemporary OB/GYN")}).</li>
<li><strong>Whether vaginal estrogen goes over the counter.</strong> The FDA is exploring it with sponsors; there is no approval, timeline or product (${ext(S.hhsOct30, "HHS")}).</li>
<li><strong>When the generic Climara Pro launches, and at what price.</strong> Not announced (${ext(S.usnewsGeneric, "HealthDay")}).</li>
<li><strong>What the testosterone signal means.</strong> An observational, three-year average follow-up with no full paper yet; it needs peer review and ideally trial data (${ext(S.testSmc, "Science Media Centre")}).</li>
<li><strong>Long-term outcomes of today's most-used regimens.</strong> The large randomised outcome data still come largely from the WHI's older oral regimens. The ACP's own expert commentators asked for better evidence by age, race, ethnicity, menopausal stage and baseline risk (${ext(S.acpMedscape, "Medscape")}).</li>
<li><strong>Optimal duration.</strong> The ACP says it is unknown (${ext(S.acpMedscape, "Medscape")}).</li>
<li><strong>Exact grading in ACOG's full text.</strong> We relied on ACOG's announcement, NPR and trade coverage for recommendation strengths; the full guideline is the authority.</li>
<li><strong>Brain health.</strong> No 2026 guideline recommends hormone therapy to prevent dementia, and whether starting early is neutral or protective remains unsettled; see <a href="/hrt/articles/is-hrt-safe">Is HRT safe?</a></li>
</ul>
<p>We will update this guide as these questions are answered.</p>`,
    },
    {
      heading: "Final verdict and next steps",
      body: `<p>Fall 2026 settled one argument and opened a logistics problem. The argument was whether hormone therapy should be the first treatment offered to a healthy woman with bothersome hot flashes near menopause. The ACP, on high-certainty evidence, and ACOG, with a strong recommendation and an explicit timing window, both said yes, aligning with what The Menopause Society said in 2022. The FDA's October patch labels continue a relabelling that changes how risks are presented, not what they are. The logistics problem is that estradiol patches, the form many clinicians prefer for women with extra risk factors, have been hard to get all year, with no official shortage declared.</p>
<p>For a woman deciding now, that leads to a simple plan:</p>
<ol>
<li><strong>Decide on the evidence, not the box.</strong> If you are under 60 or within 10 years of menopause with bothersome symptoms and no contraindications, hormone therapy is the best-supported option. Read <a href="/hrt/articles/is-hrt-safe">Is HRT safe?</a> for the numbers.</li>
<li><strong>Choose the route with your prescriber, and agree a backup.</strong> <a href="/hrt/articles/estrogen-patch-vs-pill">Estrogen patch vs pill</a> covers the trade-offs; ask for the shortage plan before you need it.</li>
<li><strong>Protect your uterus.</strong> A progestogen if you have one, whatever the route.</li>
<li><strong>Start in the window, review at 8 to 12 weeks, then yearly.</strong> See <a href="/hrt/articles/when-to-start-hrt">when to start HRT</a> and <a href="/hrt/articles/how-long-can-you-stay-on-hrt">how long you can stay on HRT</a>.</li>
<li><strong>If hormones are not for you,</strong> the non-hormonal ladders in both guidelines are real options: <a href="/hrt/articles/non-hormonal-menopause-treatment">non-hormonal menopause treatment</a>.</li>
<li><strong>If you use testosterone,</strong> book a review rather than stopping: <a href="/hrt/articles/testosterone-for-menopausal-women">testosterone for menopausal women</a>.</li>
<li><strong>If you want a prescriber quickly,</strong> compare <a href="/hrt">online HRT providers</a>, read <a href="/hrt/articles/how-to-get-hrt-online">how to get HRT online</a> and price it with <a href="/hrt/articles/online-hrt-cost">online HRT cost</a>.</li>
</ol>
<p>For the full background, our <a href="/hrt/articles/menopause-complete-guide">complete menopause guide</a> and the <a href="/hrt/articles/hrt-black-box-warning-removed">black box warning guide</a> cover the rest.</p>
<p><em>This article is general information, not medical advice. Hormone therapy and the alternatives discussed are prescription treatments with risks; the decision, the product and the dose belong to a licensed clinician who knows your history. Sources were checked on October 31, 2026; supply, labels and guidance may change.</em></p>`,
    },
    {
      heading: "References",
      body: `<ol>
<li>${ext(S.acogCpg, "ACOG Clinical Practice Guideline No. 13: Management of Menopause-Related Vasomotor, Sleep, and Mood Symptoms")}. Obstetrics &amp; Gynecology, October 15, 2026.</li>
<li>${ext(S.acogNews, "ACOG Expands Recommendations for Management of Menopause Symptoms")}. ACOG news release, October 2026.</li>
<li>${ext(S.acogCog, "ACOG guideline expands menopause VMS, sleep, and mood recommendations")}. Contemporary OB/GYN, October 2026.</li>
<li>${ext(S.nprAcog, "Hot flashes, night sweats, insomnia: OB-GYNs set new rules for menopause treatment")}. NPR, October 16, 2026.</li>
<li>${ext(S.acoog, "ACOOG endorses national guidance on the management of menopause symptoms")}. American College of Osteopathic Obstetricians and Gynecologists, 2026.</li>
<li>${ext(S.acpNews, "ACP recommends hormonal therapy as a first-line treatment for menopausal vasomotor symptoms")}. American College of Physicians newsroom, October 2026.</li>
<li>${ext(S.acpPubmed, "Pharmacologic Treatments for Females With Menopausal Vasomotor Symptoms: A Clinical Guideline From the American College of Physicians")}. Annals of Internal Medicine, published online October 6, 2026 (PubMed record).</li>
<li>${ext(S.acpEditorial, "The New ACP Clinical Guideline for the Pharmacologic Treatment of Menopausal Vasomotor Symptoms: Where Do We Go From Here?")}. Annals of Internal Medicine editorial, 2026.</li>
<li>${ext(S.acpHealio, "ACP: Use hormone therapy as first-line treatment for menopausal vasomotor symptoms")}. Healio, October 5, 2026.</li>
<li>${ext(S.acpMedscape, "ACP Backs Hormones for Vasomotor Symptoms in Menopause")}. Medscape, October 2026.</li>
<li>${ext(S.tms2022, "The 2022 hormone therapy position statement of The North American Menopause Society")}. Menopause, 2022 (PubMed record).</li>
<li>${ext(S.tms2022Release, "2022 Hormone Therapy Position Statement press release")}. The Menopause Society, 2022.</li>
<li>${ext(S.tmsMisinfo, "The Menopause Society Statement on Misinformation Surrounding Hormone Therapy")}. The Menopause Society, September 2024.</li>
<li>${ext(S.tmsPatient, "Menopause Topics: Hormone Therapy")}. The Menopause Society patient education.</li>
<li>${ext(S.acogCompounded, "Compounded Bioidentical Menopausal Hormone Therapy")}. ACOG Clinical Consensus, November 2023.</li>
<li>${ext(S.acogBreastGsm, "Treatment of Urogenital Symptoms in Individuals With a History of Estrogen-dependent Breast Cancer")}. ACOG Clinical Consensus, December 2021.</li>
<li>${ext(S.fdaNov2025, "HHS Advances Women's Health, Removes Misleading FDA Warnings on Hormone Replacement Therapy")}. FDA press announcement, November 10, 2025.</li>
<li>${ext(S.acogNov2025, "ACOG President Says Label Change on Estrogen Will Increase Access to Hormone Therapy")}. ACOG, November 2025.</li>
<li>${ext(S.tmsFdaComment, "The Menopause Society Comments on the FDA Announcement on Hormone Therapy")}. The Menopause Society, November 2025.</li>
<li>${ext(S.hhsOct30, "Trump Administration Delivers for Women with Major Advances in Menopause Care")}. HHS press release, October 30, 2026.</li>
<li>${ext(S.reutersOct30, "US health department to remove broad black box warning from three estrogen patch products")}. Reuters (via Yahoo News), October 30, 2026.</li>
<li>${ext(S.cogOct30, "FDA removes boxed warnings from 3 more menopausal hormone therapy products")}. Contemporary OB/GYN, October 30, 2026.</li>
<li>${ext(S.pinkSheet, "US FDA Strips Boxed Label Warnings From Three Menopause Hormone Patches, Eyes OTC Move")}. Pink Sheet (Citeline), October 2026.</li><li>${ext(S.dailymedPatch, "Label: Estradiol patch (estradiol transdermal system)")}. DailyMed, US National Library of Medicine.</li>
<li>${ext(S.fdaPatch, "FDA Update on Estradiol Transdermal Patch Availability")}. FDA, September 3, 2026.</li>
<li>${ext(S.cogSept, "FDA working with manufacturers to increase access to estradiol transdermal patches")}. Contemporary OB/GYN, September 4, 2026.</li>
<li>${ext(S.reutersOct28, "US estrogen supply crunch widens as women seek alternatives to scarce patches")}. Reuters (via Investing.com), October 28, 2026.</li>
<li>${ext(S.nbc, "FDA claims there's no estrogen patch shortage as women struggle to get prescriptions filled")}. NBC News, 2026.</li>
<li>${ext(S.senators, "Gillibrand, Duckworth, Schiff Press FDA On Plan To Mitigate Estrogen Patch Shortage")}. Office of Senator Kirsten Gillibrand, October 2026.</li>
<li>${ext(S.cbsNy, "New Yorkers part of growing population struggling to fill estrogen patch prescriptions")}. CBS New York, 2026.</li>
<li>${ext(S.healthline, "Menopause Estrogen Patches Are in Short Supply. What Are the Alternatives?")}. Healthline, 2026.</li>
<li>${ext(S.fdaGeneric, "FDA Approves Once-Weekly Generic Hormone Therapy Patch for Women")}. FDA press announcement, October 20, 2026.</li>
<li>${ext(S.healioGeneric, "FDA approves first generic of Climara Pro, a once-weekly hormone therapy patch")}. Healio, October 20, 2026.</li>
<li>${ext(S.usnewsGeneric, "First Generic Combo Hormone Patch Could Make Menopause Relief More Affordable")}. HealthDay via US News, October 21, 2026.</li>
<li>${ext(S.cgt, "Zydus receives USFDA nod and 180-day exclusivity for generic hormone patch")}. Indian Pharma Post, October 2026.</li>
<li>${ext(S.tmsMeeting, "2026 Annual Meeting")}. The Menopause Society, San Diego, October 20-24, 2026.</li>
<li>${ext(S.tmsTestPr, "Testosterone Therapy May Increase Risk of Cardiovascular Disease in Postmenopausal Women")}. The Menopause Society press release, October 2026.</li>
<li>${ext(S.testRun, "TMS: Testosterone Therapy Linked to Increased Risk for CVD Postmenopause")}. Renal and Urology News, October 2026.</li>
<li>${ext(S.testSmc, "Expert reaction to press release from The Menopause Society about testosterone therapy and cardiovascular disease in postmenopausal women")}. Science Media Centre, October 2026.</li>
<li>${ext(S.testMd, "Postmenopausal Women Who Started Testosterone Had Eightfold Higher Rate of Cardiovascular Events, Though Absolute Risk Stayed Low")}. Medical Daily, October 2026.</li>
<li>${ext(S.autoPr, "Autoimmune Disease Risk May Differ by Menopausal Hormone Therapy Formulation")}. The Menopause Society press release, October 2026.</li>
<li>${ext(S.autoHealio, "Data linking menopause hormone therapy to autoimmune risk a chance for 'greater dialogue'")}. Healio, October 22, 2026.</li>
<li>${ext(S.glpHealio, "Hormone therapy plus GLP-1 may equal greater, sustainable weight loss for menopausal women")}. Healio, October 23, 2026.</li>
<li>${ext(S.glpMx, "Hormone therapy may increase weight-loss effectiveness of GLP-1s")}. Medical Xpress, October 2026.</li>
<li>${ext(S.workPr, "Psychological Symptoms May Drive Menopause-Related Workforce Attrition")}. The Menopause Society press release, October 2026.</li>
<li>${ext(S.whiHealio, "Q&amp;A: At 20 years, WHI emphasizes personalized postmenopausal care, shared decision-making")}. Healio, June 3, 2024.</li>
<li>${ext(S.whiHms, "Comprehensive results of hormone therapy trials")}. Harvard Medical School news, on the 2013 WHI analysis.</li>
</ol>`,
    },
  ],
};
