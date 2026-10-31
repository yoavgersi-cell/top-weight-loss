import type { ArticleData } from "../../config";

// ───── New hair-loss treatments: the full pipeline (Oct 31, 2026) ─────
// Written for treatmentshub.com/hair-loss after Veradermics announced the
// phase 3 "304" result for VDPHL01 on October 19, 2026. Every external fact
// links the source it came from. Company announcements, conference data and
// news reports are labelled as reported and dated; peer-reviewed trials and
// FDA approvals are stated with their link. Clascoterone (Breezula) figures
// are kept consistent with, and linked to, our dedicated Breezula guide, which
// carries the primary sources. Provider facts and prices are copied from
// src/lib/seeds/hair-loss.ts only; Hims and Keeps have no verified prices, so
// none are given. Candidates we could not source for this edition (ET-02, Wnt
// programmes such as SM04554, exosomes, PRP, stem-cell injections, low-level
// light) are named as unverified and not described. No dosing advice beyond
// what the labels and trials state.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  // VDPHL01 (Veradermics)
  vd304bw: "https://www.businesswire.com/news/home/20261019684103/en/Veradermics-Oral-VDPHL01-Achieved-Early-Consistent-and-Robust-Hair-Growth-in-Positive-Phase-3-304-Clinical-Trial-in-Male-Pattern-Hair-Loss",
  vd304ir: "https://ir.veradermics.com/news-releases/news-release-details/veradermics-oral-vdphl01-achieved-early-consistent-and-robust-0",
  vd304sec: "https://www.sec.gov/Archives/edgar/data/1827635/000182763526000036/exhibit991datarelease101926.htm",
  vd302bw: "https://www.businesswire.com/news/home/20260427832356/en/Veradermics-Oral-VDPHL01-Achieved-Early-Consistent-and-Robust-Hair-Growth-in-Positive-Phase-23-302-Clinical-Trial-in-Male-Pattern-Hair-Loss",
  vd302dt: "https://www.dermatologytimes.com/view/phase-2-3-trial-of-extended-release-oral-minoxidil-shows-robust-hair-growth-outcomes-in-male-pattern-hair-loss",
  vd207bw: "https://www.businesswire.com/news/home/20260715636372/en/",
  vd207endpoints: "https://endpoints.news/veradermics-declares-first-efficacy-win-in-women-for-hair-loss-drug/",
  vd207fierce: "https://fiercepharma.com/pharma/buzzy-veradermics-shows-its-oral-minoxidil-can-tackle-female-pattern-hair-loss-too",
  vdQ2: "https://www.sec.gov/Archives/edgar/data/0001827635/000182763526000028/ex991q226earnings.htm",
  vdSeriesC: "https://secure.businesswire.com/news/home/20251016863981/en/Veradermics-Announces-Oversubscribed-%24150-Million-Series-C-Financing-to-Advance-VDPHL01-Through-Multiple-Phase-3-Trials-as-Potentially-the-First-Non-Hormonal-Oral-Therapeutic-for-Hair-Regrowth-in-Women-and-Men",
  medscape: "https://www.medscape.com/viewarticle/male-pattern-baldness-extended-release-minoxidil-regrows-2026a10013pk",
  gizmodo: "https://gizmodo.com/balding-men-havent-had-a-new-pill-since-the-1990s-thats-about-to-change-2000828855",
  fierce304: "https://www.fiercepharma.com/pharma/veradermics-hot-streak-continue-another-phase-3-win-against-hair-loss",
  marketbeat: "https://www.marketbeat.com/instant-alerts/event-veradermics-phase-iii-hair-loss-trial-meets-all-endpoints-posts-strong-growth-results-2026-10-19/",
  yahoo304: "https://finance.yahoo.com/healthcare/articles/veradermics-phase-iii-hair-loss-170221319.html",
  pharmacally: "https://pharmacally.com/veradermics-vdphl01-phase-3-male-pattern-hair-loss/",
  rtt304: "https://www.rttnews.com/3700216/veradermics-stock-rises-7-after-positive-phase-3-hair-loss-trial-results.aspx",
  fortune: "https://fortune.com/2026/08/29/baldness-drug-stocks-wall-street-goldmine-veradermics-absci-cosmo/",
  // PP405 (Pelage)
  pelageAwaken: "https://pelagepharma.com/press-releases/pp405-awaken-trial-first-patient-dosed/",
  pelageAwakenBio: "https://www.biospace.com/press-releases/pelage-pharmaceuticals-announces-first-patient-dosed-in-phase-2-3-awaken-trial-of-pp405-for-androgenetic-alopecia-the-most-common-form-of-hair-loss",
  pelage2a: "https://www.dermatologytimes.com/view/pelage-s-pp405-demonstrates-efficacy-in-phase-2a-trial-for-androgenetic-alopecia",
  pelageAad: "https://www.biospace.com/pelage-presents-late-breaking-data-at-aad-2024-meeting-demonstrating-pp405-activates-human-hair-follicle-stem-cells-ex-vivo-and-in-phase-1-clinical-study",
  pelageWomenCt: "https://clinicaltrials.gov/study/NCT07907783",
  flores: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5657543",
  // Kintor
  kx826Pharmcube: "https://global.pharmcube.com/news/detail/9866563e746d49bca151598f0768d9a9?type=dailyNews",
  kx826Citeline: "https://insights.citeline.com/scrip/r-and-d/clinical-trials/kintors-male-hair-loss-drug-returns-with-phase-iii-win-3NCLA3ORRBFLTEG4UTVV35GXEI/",
  kx826Ct: "https://clinicaltrials.gov/study/NCT06622824",
  kx826FemaleCt: "https://clinicaltrials.gov/study/NCT06409650",
  gtPaper: "https://www.tandfonline.com/doi/full/10.1080/09546634.2025.2574304",
  gtArena: "https://www.clinicaltrialsarena.com/news/kintor-trial-aga-treatment/",
  gtKintor: "https://en.kintor.com.cn/news_details/1803365125008502784.html",
  gtCt: "https://clinicaltrials.gov/study/NCT06692465",
  // Topical finasteride
  piraccini: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9297965/",
  hikma: "https://www.hikma.com/media/3khnc34d/polichem-almirall-pr-vfinal.pdf",
  adis: "https://adisinsight.springer.com/drugs/800036658",
  fdaFinAlert: "https://drugs.com/fda/fda-alerts-health-care-providers-compounders-consumers-potential-risks-associated-compounded-14740.html",
  upiFin: "https://www.upi.com/Health_News/2025/04/24/finasteride-Propecia-spray-FDA-warning/6171745508938/",
  // JAK inhibitors (alopecia areata)
  braveAa: "https://doi.org/10.1056/NEJMoa2110343",
  olumiant: "https://www.biospace.com/fda-approves-first-systemic-treatment-for-alopecia-areata",
  litfulo: "https://www.biospace.com/fda-approves-pfizer-s-litfulo-ritlecitinib-for-adults-and-adolescents-with-severe-alopecia-areata",
  leqselvi: "https://www.biospace.com/u-s-fda-approves-leqselvi-deuruxolitinib-an-oral-jak-inhibitor-for-the-treatment-of-severe-alopecia-areata",
  thriveAa1: "https://pubmed.ncbi.nlm.nih.gov/39053611/",
  naafLeqselvi: "https://www.naaf.org/leqselvi-deuruxolitinib-faq/",
  ptLeqselvi: "https://pharmacytimes.com/view/leqselvi-from-sun-pharmaceutical-industries",
};

export const HL_PIPELINE_ARTICLE: ArticleData = {
  slug: "new-hair-loss-treatments-pipeline",
  title: "New Hair Loss Treatments 2026: The Full Pipeline",
  description:
    "VDPHL01, clascoterone, PP405, pyrilutamide, GT20029, topical finasteride and JAK drugs: phase, best result, stated timing, and what to use now.",
  category: "Science",
  readTime: "52 min read",
  publishedAt: "2026-10-31",
  updatedAt: "2026-10-31",
  heroColor: "#F1F4EE",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "The most advanced new pattern hair-loss drug is VDPHL01, an extended-release oral minoxidil. Veradermics reported on October 19, 2026 that its second male trial (Study 304, 536 men) met its endpoints, with hair-count gains of 28.6 and 36.4 hairs/cm² at six months on once- and twice-daily dosing versus 6.6 on placebo. These are company figures, not yet peer-reviewed, and no FDA filing date has been given.",
    "Behind it: clascoterone 5% (Breezula), with a US filing planned for early 2027; PP405, a topical that targets follicle stem-cell metabolism, which dosed its first patient in a 2/3 trial on October 14, 2026; and Kintor's pyrilutamide and GT20029, both tested in China. None of these is approved or for sale in the US.",
    "Three JAK inhibitors (baricitinib in 2022, ritlecitinib in 2023, deuruxolitinib in 2024) are FDA-approved, but for severe alopecia areata, an autoimmune condition. They are not treatments for male or female pattern hair loss.",
    "Pattern hair loss keeps progressing while you wait, and the earliest realistic new approval is still a filing and a review away. Finasteride and minoxidil work today; oral minoxidil and dutasteride are used off-label; our providers' verified plans start at $24.99/month (Maximus oral minoxidil, billed as a 90-day supply).",
  ],
  sections: [
    {
      heading: "What new hair loss treatments are coming in 2026?",
      body: `<div class="qa"><strong>The short answer</strong><p>The closest new pattern hair-loss drug is VDPHL01, a once- or twice-daily extended-release minoxidil tablet that Veradermics says beat placebo in two male trials, most recently on October 19, 2026. Next are clascoterone 5% scalp solution (Breezula), with a US filing planned for early 2027, and earlier-stage topicals: PP405, pyrilutamide and GT20029. JAK inhibitors are approved, but only for alopecia areata. Nothing new is for sale yet, so finasteride and minoxidil remain the treatments to start now. Sources: ${ext(S.vd304bw, "Veradermics, October 19, 2026")}; ${ext(S.medscape, "Medscape, October 22, 2026")}, checked October 31, 2026.</p></div>
<p>On October 21, 2026, Gizmodo ran a headline that summed up why hair loss is suddenly a pharmaceutical story: ${ext(S.gizmodo, "balding men haven't had a new pill since the 1990s, and that is about to change")}. Fortune, two months earlier, framed the same thing for investors, ${ext(S.fortune, "reporting")} that pattern hair loss affects an estimated 50 million men and 30 million women in the US and that no new drug for it has been approved since the late 1990s. A stock market that pays for hair-loss trials produces press releases, and press releases produce search results, clinic blogs and social-media posts that run well ahead of the evidence.</p>
<p>This guide is the version we wanted when we started reading those releases. It lists every candidate we could verify from a primary source or a reputable dated report, says what kind of hair loss each one is meant for, how far it has got, what its best result was and who reported it, and what the company itself says about timing. It then turns to the decision most readers actually face: whether to start a treatment that exists now or wait for one that does not.</p>
<p>Three rules shape everything below. First, a company announcement is not a published trial. We label each result by its source: peer-reviewed paper, FDA approval, company release, or news report. Second, results from different trials cannot be compared directly, even when they use the same unit; we explain why in the section on reading a trial. Third, every candidate on this page is either unapproved or approved for a different condition. Nothing here is a reason to stop a treatment you are on, and nothing here is a dosing instruction. Your prescriber decides.</p>
<p>A note on what is not here. Readers often ask about ET-02, Wnt-pathway programmes such as SM04554, exosome and stem-cell injections, platelet-rich plasma and low-level light devices. We could not verify a current trial status for these from primary sources for this edition, so we have not described them. That is a statement about our sourcing, not about whether any of them work; the right response to a clinic claim about them is to ask for the dated trial result it rests on.</p>`,
    },
    {
      heading: "The pipeline at a glance",
      body: `<p>The table below is the core of this guide: every candidate we could source, in order of how close it appears to be to a US decision. "Stated timing" is what the company or the source said, labelled; it is not our prediction. Androgenetic alopecia (AGA) is the medical name for male and female pattern hair loss. Alopecia areata (AA) is a different, autoimmune disease.</p>
<table>
<thead><tr><th>Candidate (company)</th><th>Type</th><th>For</th><th>Stage, October 2026</th><th>Best reported result (source, date)</th><th>Stated timing (labelled)</th></tr></thead>
<tbody>
<tr><td>VDPHL01 (Veradermics)</td><td>Extended-release oral minoxidil tablet</td><td>Male AGA; female AGA in trials</td><td>Men: two placebo-controlled trials completed (302 and 304). Women: phase 2/3 Study 306 enrolled</td><td>Study 304, 536 men: +28.6 (once daily) and +36.4 (twice daily) hairs/cm² at 6 months vs +6.6 placebo (company release, Oct 19, 2026)</td><td>Women's Part A results expected first half of 2027 (company). No NDA date given (Medscape, Oct 22, 2026)</td></tr>
<tr><td>Clascoterone 5% "Breezula" (Cosmo)</td><td>Topical androgen receptor blocker</td><td>Male AGA</td><td>Two phase 3 trials (SCALP 1 and 2) completed</td><td>Both met six-month hair-count endpoints; gains continued to 12 months (company, Dec 2025 and Apr 2026)</td><td>US filing planned early 2027 (company, per our Breezula guide)</td></tr>
<tr><td>PP405 (Pelage)</td><td>Topical small molecule; follicle stem-cell metabolism</td><td>Male AGA; women's phase 2 registered</td><td>Phase 2/3 AWAKEN, first patient dosed Oct 14, 2026</td><td>Phase 2a, 78 patients: 31% of men with more advanced loss had a &gt;20% density increase at week 8 vs 0% placebo (company, 2025)</td><td>Women's phase 2 to start by end of 2026 (company)</td></tr>
<tr><td>Pyrilutamide, KX-826 (Kintor)</td><td>Topical androgen receptor antagonist</td><td>Male AGA (China); female study registered</td><td>Phase 3 in China reported positive</td><td>1.0% twice daily: +10.65 hairs/cm² more than placebo (reported, March 2026)</td><td>NDA in China for the 1.0% formulation planned (reported)</td></tr>
<tr><td>GT20029 (Kintor)</td><td>Topical androgen receptor degrader (PROTAC)</td><td>Male AGA (China)</td><td>Phase 2 completed and published</td><td>12 weeks, 180 men: 1% twice weekly +7.36 and 0.5% daily +6.69 hairs/cm² over placebo (company 2024; peer-reviewed 2025)</td><td>1% twice weekly chosen for phase 3 (company)</td></tr>
<tr><td>Topical finasteride 0.25% spray (Almirall)</td><td>Existing drug, new route</td><td>Male AGA</td><td>Approved in several EU countries; not FDA-approved. Compounded versions prescribed in the US</td><td>Phase 3, 45 European sites: beat placebo, similar to oral finasteride, with 34.5% vs 55.6% serum DHT reduction (JEADV, 2022)</td><td>No US filing reported</td></tr>
<tr><td>Baricitinib, ritlecitinib, deuruxolitinib</td><td>Oral JAK inhibitors</td><td>Severe alopecia areata only</td><td>FDA-approved 2022, 2023, 2024</td><td>See the JAK section; SALT ≤20 responses of roughly 20-40% at 24-36 weeks in pivotal trials</td><td>Available now, with boxed warnings</td></tr>
</tbody>
</table>
<p>Read the table from left to right and one fact stands out: the only candidates in late-stage US trials for pattern hair loss are a new way of delivering minoxidil and a topical anti-androgen. Both are variations on the two mechanisms that the existing drugs already use. The first genuinely new mechanism, PP405, has only just entered the trial stage that could support approval. That shapes the decision section later in the guide.</p>`,
    },
    {
      heading: "What did Veradermics' October 2026 VDPHL01 trial show?",
      body: `<p>VDPHL01 is a tablet of minoxidil, the drug best known as the active ingredient in Rogaine, built to release the drug slowly. Veradermics' case for it is that low-dose oral minoxidil already works for hair, and that a slow-release tablet tested in full FDA trials can turn an off-label practice into an approved product. Our dedicated <a href="/hair-loss/articles/veradermics-vdphl01">VDPHL01 guide</a> has the background; this section brings it up to date with the October result.</p>
<h3>Study 304: the confirmatory male trial</h3>
<p>On October 19, 2026, the company announced topline results from Part A of Study 304, a phase 3 trial in 536 men with mild-to-moderate male pattern hair loss randomised to VDPHL01 8.5 mg once daily, 8.5 mg twice daily, or placebo. Both doses beat placebo on the two co-primary endpoints, target-area non-vellus hair count and a patient-reported outcome, with p&lt;0.0001. At six months the once-daily arm had gained an average of 28.6 hairs per square centimetre and the twice-daily arm 36.4, against 6.6 for placebo. The company reported no treatment-related serious adverse events and no cardiac adverse events of special interest. Sources: ${ext(S.vd304bw, "Veradermics release, Business Wire, October 19, 2026")}; ${ext(S.vd304sec, "the same data filed with the SEC")}; ${ext(S.medscape, "Medscape, October 22, 2026")}.</p>
<p>Coverage of the release reported that the drug met all of its co-primary endpoints and 17 secondary endpoints, that peripheral oedema (swelling, usually of the ankles) and hypertrichosis (unwanted hair growth elsewhere on the body) were the most common side effects, and that hypertrichosis was notably more frequent on twice-daily dosing. Sources: ${ext(S.marketbeat, "MarketBeat, October 19, 2026")}; ${ext(S.yahoo304, "Yahoo Finance")}; ${ext(S.rtt304, "RTTNews, October 19, 2026")}. Fierce Pharma ${ext(S.fierce304, "called it")} a continuing hot streak for the company. The company's shares rose about 7% on the day, to $116.42, according to RTTNews.</p>
<h3>Study 302: the April trial it confirms</h3>
<p>Study 304 was designed to repeat Study 302, a phase 2/3 trial in more than 500 men whose topline results Veradermics announced on April 27, 2026. In 302, the once-daily arm gained 30.3 hairs/cm² and the twice-daily arm 33.0 at month six, both p&lt;0.0001 against placebo, which gained 7.3. Again, no treatment-related serious adverse events and no cardiac adverse events of special interest were reported. Sources: ${ext(S.vd302bw, "Veradermics release, April 27, 2026")}; ${ext(S.vd302dt, "Dermatology Times")}. With 304, the company says its placebo-controlled male programme is complete, and the two trials together cover more than 1,000 men.</p>
<table>
<thead><tr><th>Male trial</th><th>Men</th><th>Once daily, 6 months</th><th>Twice daily, 6 months</th><th>Placebo, 6 months</th><th>Reported</th></tr></thead>
<tbody>
<tr><td>Study 302 (phase 2/3)</td><td>More than 500</td><td>+30.3 hairs/cm²</td><td>+33.0 hairs/cm²</td><td>+7.3 hairs/cm²</td><td>Company, April 27, 2026</td></tr>
<tr><td>Study 304 (phase 3)</td><td>536</td><td>+28.6 hairs/cm²</td><td>+36.4 hairs/cm²</td><td>+6.6 hairs/cm²</td><td>Company, October 19, 2026</td></tr>
</tbody>
</table>
<h3>A worked example: what the numbers mean</h3>
<p>The useful figure is not the gain on the drug but the gain beyond placebo. In Study 304 that is 28.6 minus 6.6, or 22.0 hairs/cm², for once-daily dosing, and 36.4 minus 6.6, or 29.8 hairs/cm², for twice daily. In Study 302 it was 30.3 minus 7.3, or 23.0, for once daily. The two trials agree closely on the once-daily effect, which is what a confirmatory trial is for. The twice-daily figure moved more between trials (33.0 in one, 36.4 in the other). An analysis by ${ext(S.pharmacally, "Pharmacally")} noted that the topline release does not include the complete statistical analysis, such as confidence intervals, so it cannot show that twice daily is better than once daily. The side-effect signal runs the other way, so the choice of dose is not settled by these numbers; full statistics await publication.</p>
<p>The placebo gain is also worth a sentence. Men on placebo gained six to seven hairs/cm² in both trials. Hair counts in a placebo group are rarely flat, which is why a result means nothing without its placebo arm, and why a clinic's before-and-after photographs, which have no placebo arm, cannot tell you how well a treatment works.</p>
<h3>Why an extended-release tablet</h3>
<p>Low-dose oral minoxidil prescribed for hair today is an immediate-release blood-pressure tablet used off-label. The company says VDPHL01's gel-matrix design is meant to avoid the peaks in blood concentration that are associated with the cardiac side effects of immediate-release oral minoxidil, as reported by ${ext(S.medscape, "Medscape")}. That is the company's rationale; the trials report no cardiac adverse events of special interest, but they were six-month studies in men without the conditions that would normally exclude someone from oral minoxidil, so they do not settle long-term cardiovascular safety in a broad population. Our <a href="/hair-loss/articles/oral-minoxidil-vs-topical-minoxidil">oral versus topical minoxidil</a> guide covers what is known about the off-label tablet.</p>
<h3>Women: Studies 207 and 306</h3>
<p>Veradermics reported on July 15, 2026 that Study 207, a small open-label phase 2 study in men and women with mild-to-moderate pattern hair loss, met its primary endpoint, with growth seen as early as month two. Endpoints News reported a hair-count gain of 22.7 hairs/cm² at six months in women. Open-label means everyone knew they were on the drug and there was no placebo group, so this is a signal, not proof. Sources: ${ext(S.vd207bw, "Veradermics release, July 15, 2026")}; ${ext(S.vd207endpoints, "Endpoints News")}; ${ext(S.vd207fierce, "Fierce Pharma")}. The trial that matters for women is Study 306, a phase 2/3 trial that enrolled 556 women; the company expects Part A results in the first half of 2027 and describes it as the first registration-directed US trial of an oral therapy specifically for female pattern hair loss.</p>
<h3>When could it be approved?</h3>
<p>The company has not given an FDA submission date. Medscape reported on October 22, 2026 that Veradermics did not provide information on its filing plans. In its second-quarter 2026 results on August 11, the company reported $819.9 million in cash and marketable securities as of June 30, 2026, which it expects to fund operations into 2030 through multiple phase 3 readouts and a potential launch of VDPHL01. Source: ${ext(S.vdQ2, "Veradermics Q2 2026 results, SEC filing")}. A standard FDA review takes about ten months from acceptance of an application, so even a filing soon after the women's readout in 2027 would not produce an approval for at least a year after the filing. We do not give a date because the company does not.</p>
<h3>What to do now</h3>
<p>The ingredient in VDPHL01 is already prescribable. Men who want oral minoxidil can discuss the off-label immediate-release tablet with a prescriber today; the trade-off is that it is not the product in these trials and has not been through the same programme. Our guide to <a href="/hair-loss/articles/oral-minoxidil-online">getting oral minoxidil online</a> explains the process, and the cost section below lists the verified prices. Women should note that the women's trial results are not in yet.</p>`,
    },
    {
      heading: "Is VDPHL01 different from the oral minoxidil you can get now?",
      body: `<p>Yes in formulation and regulatory status, no in active ingredient. That distinction decides whether waiting for VDPHL01 makes sense for you, so it is worth setting out side by side.</p>
<table>
<thead><tr><th></th><th>VDPHL01 (investigational)</th><th>Off-label oral minoxidil (available)</th><th>Topical minoxidil (available)</th></tr></thead>
<tbody>
<tr><td>Active ingredient</td><td>Minoxidil</td><td>Minoxidil</td><td>Minoxidil</td></tr>
<tr><td>Formulation</td><td>Extended-release gel-matrix tablet, designed to avoid peak blood levels (company)</td><td>Immediate-release tablet, prescribed at low doses for hair</td><td>Solution or foam applied to the scalp</td></tr>
<tr><td>FDA status for hair</td><td>Not approved; male phase 3 programme complete</td><td>Off-label (approved tablet for another condition)</td><td>Approved</td></tr>
<tr><td>Trial evidence for hair</td><td>Two placebo-controlled male trials, over 1,000 men, company-reported; women's trial reading out in 2027</td><td>Used widely off-label; not tested in an FDA registration programme for hair</td><td>Long-standing approval</td></tr>
<tr><td>Doses in trials or use</td><td>8.5 mg once or twice daily in Study 304</td><td>Set by your prescriber</td><td>As labelled</td></tr>
<tr><td>Side effects reported</td><td>Peripheral oedema and hypertrichosis most common; hypertrichosis higher twice daily; no treatment-related serious or cardiac adverse events of special interest (company)</td><td>Discuss with your prescriber; see our guide</td><td>Mainly scalp irritation and early shedding; see our guide</td></tr>
<tr><td>Who can use it</td><td>Trial participants only</td><td>Men and women after medical review</td><td>Men and women</td></tr>
<tr><td>Verified price from a provider we review</td><td>None announced</td><td>Maximus oral minoxidil $24.99/mo (90-day supply)</td><td>Maximus Minoxidil+ Gel $44.99/mo; Happy Head Custom Topical with 8% minoxidil $49 first order, regularly $89</td></tr>
</tbody>
</table>
<p>Sources: ${ext(S.vd304bw, "Veradermics, October 19, 2026")}; ${ext(S.medscape, "Medscape, October 22, 2026")}; ${ext(S.marketbeat, "MarketBeat")}; prices from our provider reviews. </p>
<h3>What the comparison means</h3>
<p>If VDPHL01 is approved, what it adds is not a new mechanism. It adds an FDA label for hair, a formulation designed for steadier blood levels, a dosing schedule tested in trials with more than 1,000 men, and, eventually, data in women from a registration trial. Those are real advantages, particularly for prescribers who have been cautious about using a blood-pressure tablet off-label, and for women, who would have their first approved oral option. They are not a reason for a man who is a suitable candidate for oral minoxidil today to wait without treatment.</p>
<p>The reverse also holds. The off-label tablet is not VDPHL01, and the reassuring safety figures from Studies 302 and 304 belong to the extended-release product in the populations those trials enrolled. A prescriber deciding on immediate-release oral minoxidil for you will weigh your blood pressure, heart history and other medicines; the VDPHL01 trials do not make that review unnecessary.</p>`,
    },
    {
      heading: "How do you read a hair-loss trial result?",
      body: `<p>Every result in this guide is reported in one of a handful of units. Knowing what they measure is the difference between reading a press release and being read by one.</p>
<h3>Target-area hair count (TAHC)</h3>
<p>Investigators mark a small, defined area of thinning scalp, photograph it at high magnification at each visit and count the hairs. The result is reported as a change in hairs per square centimetre from the start of the trial. It is the primary endpoint in almost every pattern hair-loss trial, including VDPHL01's, clascoterone's, pyrilutamide's, GT20029's and topical finasteride's. Sources: ${ext(S.vd304bw, "Veradermics")}; ${ext(S.kx826Ct, "KX-826 registry entry")}; ${ext(S.piraccini, "Piraccini et al., 2022")}.</p>
<h3>Non-vellus versus all hairs</h3>
<p>Vellus hairs are the fine, short, unpigmented hairs that a miniaturised follicle produces; non-vellus (terminal) hairs are the visible ones. A trial that counts only non-vellus hairs, as Veradermics' did, is measuring something closer to what you see in a mirror. A trial that counts all hairs can show a gain that is partly fine fuzz. The difference is one reason numbers from different trials should not be lined up against each other.</p>
<h3>Patient-reported outcomes and investigator assessments</h3>
<p>Hair counts can rise without anyone noticing. So trials also ask participants whether their coverage improved, and blinded investigators to rate photographs. Veradermics made a patient-reported outcome a co-primary endpoint in Study 304, which means the drug had to win on what men reported as well as on the count. Source: ${ext(S.vd304bw, "Veradermics, October 19, 2026")}.</p>
<h3>SALT scores (alopecia areata only)</h3>
<p>Alopecia areata trials use a different scale, the Severity of Alopecia Tool, which estimates the percentage of the scalp without hair. SALT 100 is complete scalp hair loss; SALT 20 or less means at least 80% of the scalp is covered, which is the usual definition of success. The JAK inhibitor trials below are reported this way. A SALT result and a hair-count result describe different diseases and cannot be compared at all. Source: ${ext(S.litfulo, "Pfizer, ritlecitinib approval, June 2023")}.</p>
<h3>Relative versus absolute</h3>
<p>Some announcements give a percentage improvement over placebo rather than hair counts. When the placebo group's change is small, a ratio can be very large while the absolute gain is modest. Our <a href="/hair-loss/articles/breezula-clascoterone-hair-loss">Breezula guide</a> works through an example from the clascoterone trials. Always look for the absolute number of hairs per square centimetre on drug and on placebo.</p>
<h3>Why you cannot rank these drugs on one table</h3>
<p>VDPHL01's 22.0 hairs/cm² over placebo, pyrilutamide's 10.65 and GT20029's 7.36 are not a league table. The trials ran for different lengths (12 weeks for GT20029, 24 weeks for the others), enrolled different populations (US men in one, Chinese men in others), counted different hairs, and used different photography. A small topical at 12 weeks and a systemic tablet at 24 weeks are not running the same race. The only fair comparison is a head-to-head trial, and none of these drugs has one against finasteride, minoxidil or each other.</p>
<h3>Five questions to ask of any result</h3>
<ol>
<li>Who reported it, and has it been peer-reviewed?</li>
<li>What was the placebo group's change, and what is the difference?</li>
<li>How long was the trial, and does the effect hold beyond six months?</li>
<li>Who was enrolled, and are you like them (sex, age, stage of loss, country)?</li>
<li>What were the side effects, and how many people dropped out?</li>
</ol>`,
    },
    {
      heading: "Is clascoterone (Breezula) close to approval?",
      body: `<p>Clascoterone is the candidate most often searched after VDPHL01, and we cover it in depth in our <a href="/hair-loss/articles/breezula-clascoterone-hair-loss">Breezula guide</a>, which carries the primary sources. The summary below is kept consistent with that page.</p>
<h3>Mechanism and who it is for</h3>
<p>Clascoterone is a topical androgen receptor antagonist: it occupies the receptor in the follicle so that DHT cannot act on it, and it is designed to be broken down quickly once absorbed so that hormone levels in the blood are left alone. Breezula is a 5% scalp solution being developed for male pattern hair loss. The same molecule, as a 1% cream called Winlevi, is FDA-approved for acne. The scalp product is not approved for hair loss anywhere.</p>
<h3>Phase and best result</h3>
<p>Cosmo Pharmaceuticals announced in December 2025 that two identical phase 3 trials, SCALP 1 and SCALP 2, in 1,465 men, both met their six-month hair-count endpoints against vehicle, and reported in April 2026 that men who continued treatment kept gaining hair through month 12. These are company announcements; the peer-reviewed papers had not appeared when we last checked, so absolute counts and full adverse-event tables are not public.</p>
<h3>Company-stated timing</h3>
<p>The company's stated plan is a US filing in early 2027, which, on a standard review, would put any approval decision around the end of 2027 or into 2028, and later if the FDA asks for more.</p>
<h3>How it differs from VDPHL01</h3>
<p>The two late-stage candidates attack the problem from opposite directions. Clascoterone blocks the hormonal cause at the follicle; VDPHL01 is minoxidil, which does not touch DHT. That is why they are not competitors in the way the stock market sometimes treats them. A man who could eventually use both would be doing what dermatologists already do with finasteride and minoxidil: combining a DHT-side drug with a growth-side drug. Our guide to <a href="/hair-loss/articles/finasteride-vs-minoxidil">finasteride versus minoxidil</a> explains why the combination is standard.</p>
<h3>What to do now</h3>
<p>Nothing sold online today as "Breezula" or "clascoterone for hair" is the trial product. Men who want a DHT-side treatment applied to the scalp have a current option in compounded topical finasteride, discussed below, with its own caveats. Men who want the strongest evidence have oral finasteride.</p>`,
    },
    {
      heading: "What is PP405, and is it really a stem-cell treatment?",
      body: `<p>PP405 is the most scientifically novel candidate in this guide, and the one most often misdescribed. It contains no stem cells. It is a small-molecule gel applied to the scalp that aims to change the metabolism of the stem cells that are already in every hair follicle.</p>
<h3>Mechanism</h3>
<p>The idea comes from work at UCLA published in Nature Cell Biology in 2017. The researchers found that hair follicle stem cells in mice rely on glycolysis and produce more lactate than other skin cells, that deleting the enzyme lactate dehydrogenase stopped them from activating, and that deleting the mitochondrial pyruvate carrier, which raises lactate production, sped up their activation and the hair cycle. They also identified small molecules that increased lactate production and could topically induce the hair cycle in mice. Source: ${ext(S.flores, "Flores et al., Nature Cell Biology, 2017")}. Pelage Pharmaceuticals was founded on this line of research, and PP405 is described as an inhibitor of the mitochondrial pyruvate carrier intended to wake dormant follicle stem cells.</p>
<p>Two points follow from the mechanism. First, it is independent of DHT and of minoxidil's growth-phase effect, which is why it is the one genuinely new mechanism in late-stage development. Second, as described, it acts on stem cells that are still present in a follicle. Nothing in the published mechanism suggests it can rebuild follicles that have been lost to scarring, so the same rule applies as for every other drug here: it is a treatment for thinning, not for long-bald skin.</p>
<h3>What the trials have shown</h3>
<p>At the American Academy of Dermatology's 2024 meeting, Pelage presented phase 1 data that it said showed PP405 activating human hair follicle stem cells in tissue samples and in a phase 1 study, with no detectable drug in the blood on daily topical dosing. Source: ${ext(S.pelageAad, "Pelage, AAD 2024 (conference data, not peer-reviewed)")}.</p>
<p>In 2025 the company reported a randomised, double-blind, placebo-controlled phase 2a trial in 78 adults aged 18 to 55 with androgenetic alopecia, using a 0.05% PP405 gel or a vehicle gel for four weeks. The trial's main purpose was safety. Pelage reported that at week 8, four weeks after dosing ended, 31% of men with more advanced hair loss on PP405 had a greater than 20% increase in hair density, against none on placebo, with new growth seen in follicles that had not been producing hair, and no systemic absorption detected. Source: ${ext(S.pelage2a, "Dermatology Times, 2025")}. We could not find a peer-reviewed publication of these results, and the release did not give the per-arm numbers or confidence intervals that would let a reader judge the size of the effect.</p>
<h3>Phase and company-stated timing</h3>
<p>On October 14, 2026, Pelage announced that the first patient had been dosed in AWAKEN, a phase 2/3 trial of PP405 in adult men with androgenetic alopecia, which began on schedule after what the company called a positive end-of-phase 2 meeting with the FDA. The company says a separate phase 2 study in women is set to start by the end of 2026, and a phase 2 trial in adult women is listed on ClinicalTrials.gov. Sources: ${ext(S.pelageAwaken, "Pelage, October 14, 2026")}; ${ext(S.pelageAwakenBio, "the same release on BioSpace")}; ${ext(S.pelageWomenCt, "ClinicalTrials.gov NCT07907783")}. The company has not, in the release we found, given a date for results. A combined phase 2/3 trial that has just dosed its first patient is, on any normal timetable, years from an approval decision.</p>
<h3>Who it is for, and what to do now</h3>
<p>AWAKEN is enrolling men. If you are a man with established pattern loss and an interest in a new mechanism, the only legitimate route to PP405 is a trial site; ClinicalTrials.gov lists them. Nobody can sell you PP405 today, and products marketed as "stem cell activating" serums are not it. For everyone else the advice is the same as for the other candidates: a drug whose pivotal trial has only just begun is not a reason to let follicles that it would need go dormant first.</p>`,
    },
    {
      heading: "What are pyrilutamide (KX-826) and GT20029, Kintor's two hair-loss drugs?",
      body: `<p>Kintor Pharmaceutical, based in China, has two topical anti-androgen candidates for pattern hair loss. Both attack the same target as clascoterone, the androgen receptor in the follicle, but in different ways, and both have been tested mainly in Chinese men. Neither is in a US trial that could support FDA approval that we could find.</p>
<h3>Pyrilutamide (KX-826): mechanism and who it is for</h3>
<p>Pyrilutamide is a topical androgen receptor antagonist: like clascoterone, it blocks the receptor so DHT cannot act on it, rather than lowering DHT itself. Kintor has run trials in men and has registered a study in Chinese women with androgenetic alopecia. Sources: ${ext(S.kx826Ct, "ClinicalTrials.gov NCT06622824 (men)")}; ${ext(S.kx826FemaleCt, "NCT06409650 (women)")}.</p>
<h3>Pyrilutamide: phase and best result</h3>
<p>The programme has had one public setback. Citeline's Scrip described the March 2026 result as a phase 3 win that followed a phase 3 setback in 2023. Source: ${ext(S.kx826Citeline, "Scrip, 2026")}. The newer trial, registered as a phase 2/3 study comparing 0.5% and 1.0% solutions with vehicle, applied twice daily for 24 weeks, with an estimated enrolment of 756 men, is the one that reported in March 2026. Source: ${ext(S.kx826Ct, "ClinicalTrials.gov")}.</p>
<p>According to the reported topline, both the 1.0% and 0.5% twice-daily formulations met the primary endpoint, with statistically significant improvements in target-area hair count over placebo; the 1.0% strength added 10.65 hairs/cm² more than placebo. The company reported no drug-related serious adverse events and an adverse-event rate similar to placebo. Source: ${ext(S.kx826Pharmcube, "PharmCube, March 2026")}. These are company-reported topline results; we found no peer-reviewed paper.</p>
<h3>Pyrilutamide: stated timing</h3>
<p>Kintor said it planned to submit a new drug application in China for the 1.0% formulation. We found no confirmation that it had been filed, and no plan for a US filing. Source: ${ext(S.kx826Pharmcube, "PharmCube")}.</p>
<h3>GT20029: mechanism</h3>
<p>GT20029 is a PROTAC, short for proteolysis-targeting chimera. Instead of sitting in the androgen receptor and blocking it, a PROTAC tags the receptor for destruction by the cell's own protein-disposal machinery. In principle that removes the receptor rather than competing with DHT for it, which is the reason for the interest. It is applied as a topical solution.</p>
<h3>GT20029: phase and best result</h3>
<p>GT20029 has the strongest publication record of the Kintor pair. A randomised, double-blind, placebo-controlled phase 2 trial in China enrolled 180 adult men across six arms of 30 and treated them for 12 weeks. Kintor announced in 2024 that it met its primary endpoint: the 0.5% once-daily group gained 16.80 hairs/cm² from baseline, 6.69 more than placebo, and the 1% twice-weekly group gained 11.94, 7.36 more than placebo, both statistically significant. Sources: ${ext(S.gtKintor, "Kintor announcement, 2024")}; ${ext(S.gtArena, "Clinical Trials Arena")}. The full results were then published in a peer-reviewed journal in 2025, reporting that all four GT20029 doses produced statistically significant improvements in hair count and hair width over placebo, and that the drug was safe and well tolerated during the trial. Source: ${ext(S.gtPaper, "Journal of Dermatological Treatment, 2025")}.</p>
<p>One detail deserves a plain reading. Kintor identified the 1% twice-weekly dose as optimal for phase 3, even though the 0.5% daily arm had the larger gain from baseline. The gain over placebo was slightly larger for 1% twice weekly, and twice-weekly application is easier to stick to, but we found no published explanation of the choice. Twelve weeks is also short for a hair trial, and the trial was conducted only in China.</p>
<h3>GT20029: stated timing</h3>
<p>The company recommended the 1% twice-weekly dose for phase 3, and a further study of GT20029 solution in Chinese adult men is registered. We found no stated approval timeline. Source: ${ext(S.gtCt, "ClinicalTrials.gov NCT06692465")}.</p>
<h3>What to do now</h3>
<p>Neither drug is available in the US, and neither can be bought legitimately. For a reader in the US, Kintor's programmes are a signal that the androgen receptor is a crowded target, which makes it more likely that a topical anti-androgen of some kind reaches the market eventually. It is not a reason to delay a DHT-side treatment that exists. </p>`,
    },
    {
      heading: "Is topical finasteride approved, and is it safe?",
      body: `<p>Topical finasteride is not a new molecule. It is the existing DHT blocker in a scalp spray or solution, and it sits in an unusual position: approved as a product in several European countries, prescribed in the US only as a compounded formulation, and the subject of an FDA safety alert in 2025. All three facts matter.</p>
<h3>The trial evidence</h3>
<p>The pivotal evidence is a phase 3 randomised controlled trial published in the Journal of the European Academy of Dermatology and Venereology in 2022. It enrolled men aged 18 to 40 with mild to moderate vertex hair loss at 45 sites in Europe and compared a 0.25% finasteride spray with placebo and with oral finasteride over 24 weeks. Hair count improved significantly more on the spray than on placebo, and the authors concluded that its effect was similar to oral finasteride with markedly lower systemic exposure and less impact on serum DHT: blood DHT fell by 34.5% on the spray against 55.6% on the tablet. Source: ${ext(S.piraccini, "Piraccini et al., JEADV, 2022")}.</p>
<p>The lower DHT figure is the point and also the caveat. A 34.5% fall in blood DHT is not zero. The spray reduces systemic exposure; it does not eliminate it, and anyone told that topical finasteride "stays in the scalp" has been told more than the trial shows.</p>
<h3>Status in Europe</h3>
<p>Almirall's finasteride spray is approved in Italy, Germany, Luxembourg and Portugal for androgenetic alopecia, according to a licensing announcement with Hikma. Source: ${ext(S.hikma, "Hikma and Almirall announcement")}. A drug-development database lists launches in Portugal, Germany and Italy dated December 2024. Source: ${ext(S.adis, "AdisInsight, Springer")}, a commercial database rather than a regulator. We found no US filing for this product.</p>
<h3>Status in the US: compounded only</h3>
<p>In the US there is no FDA-approved topical finasteride. What telehealth services and compounding pharmacies prescribe is compounded: mixed by a pharmacy for an individual prescription, often with minoxidil or other ingredients in the same bottle. That is legal and common, but it means the specific formulation has not been through FDA review for safety, effectiveness or quality.</p>
<p>On April 22, 2025, the FDA issued an alert to clinicians, compounders and consumers about compounded topical finasteride. It said it had received 32 adverse-event reports between 2019 and 2024, describing effects that match those listed for oral finasteride, including erectile dysfunction, anxiety, depression, suicidal ideation and testicular pain, and that most reports stated the effects persisted after the product was stopped. It also flagged the risk to others, especially women, who handle an uncoated liquid, whereas the approved tablets are coated. Sources: ${ext(S.fdaFinAlert, "FDA alert, April 22, 2025 (reproduced by Drugs.com)")}; ${ext(S.upiFin, "UPI, April 24, 2025")}.</p>
<h3>How to read the alert fairly</h3>
<p>Thirty-two reports over six years, from a product prescribed widely, do not establish a rate or show that the topical is worse than the tablet; adverse-event reports are unverified and have no denominator. What the alert does establish is that the FDA does not regard topical application as removing finasteride's known risks, which is consistent with the 34.5% DHT reduction in the European trial. For a man choosing a topical to avoid side effects, that is the honest framing: it lowers exposure; it is still finasteride.</p>
<p>Among the providers we review, PeterMD's Follicure RX combines minoxidil, finasteride and ketoconazole in one prescription topical spray, prescribed after physician review; it is the only topical in our ranking that adds ketoconazole. Happy Head's Custom Topical uses dutasteride 0.3% with minoxidil 8% instead. Prices are in the cost section. Our <a href="/hair-loss/articles/topical-finasteride">topical finasteride guide</a> covers who sells it and who it suits.</p>
<h3>What to do now</h3>
<p>If you want a DHT blocker and are worried about side effects, ask a prescriber about the trade-off between oral finasteride (the most evidence), topical finasteride (lower exposure, compounded in the US) and waiting for clascoterone (not yet approved). Keep a topical away from partners and children, and stop and report any side effect.</p>`,
    },
    {
      heading: "Are JAK inhibitors a treatment for pattern hair loss?",
      body: `<p>No. This is the most common confusion in hair-loss news. Three oral JAK inhibitors have been approved by the FDA since 2022, and they are real advances, but they are approved for severe alopecia areata, an autoimmune disease in which the immune system attacks hair follicles, typically causing round patches of loss or, in severe cases, loss of all scalp and body hair. Male and female pattern hair loss are a different condition, driven by hormones and genetics, and none of the three drugs is approved for it.</p>
<h3>Mechanism</h3>
<p>Janus kinases (JAKs) are enzymes that relay signals from immune messengers inside cells. In alopecia areata, immune cells attack the follicle; blocking the relevant JAK signals interrupts that attack and lets the follicle resume growth. Because the drugs act on the immune system throughout the body, all three carry boxed warnings, the FDA's strongest, for serious infections, mortality, cancer, major cardiovascular events and blood clots. Sources: ${ext(S.olumiant, "FDA approval of baricitinib, June 2022")}; ${ext(S.leqselvi, "deuruxolitinib approval, July 2024")}.</p>
<h3>The three approvals</h3>
<table>
<thead><tr><th>Drug (brand, company)</th><th>FDA approval</th><th>Who</th><th>Pivotal trials and result</th></tr></thead>
<tbody>
<tr><td>Baricitinib (Olumiant, Eli Lilly)</td><td>June 13, 2022; the first systemic treatment for alopecia areata</td><td>Adults with severe AA</td><td>BRAVE-AA1 (654 patients) and BRAVE-AA2 (546): SALT ≤20 at week 36 in 38.8% and 35.9% on 4 mg, 22.8% and 19.4% on 2 mg, vs 6.2% and 3.3% on placebo (NEJM, 2022)</td></tr>
<tr><td>Ritlecitinib (Litfulo, Pfizer)</td><td>June 23, 2023</td><td>Adults and adolescents 12 and older with severe AA; first approved option for teenagers</td><td>ALLEGRO phase 2b/3 (718 patients): SALT ≤20 at 6 months in 23% on ritlecitinib vs 1.6% on placebo; approved dose 50 mg once daily</td></tr>
<tr><td>Deuruxolitinib (Leqselvi, Sun Pharma)</td><td>July 25, 2024</td><td>Adults with severe AA</td><td>THRIVE-AA1: SALT ≤20 at week 24 in 29.6% on 8 mg twice daily and 41.5% on 12 mg vs 0.8% on placebo (JAAD, 2024); only 8 mg was approved</td></tr>
</tbody>
</table>
<p>Sources: ${ext(S.olumiant, "baricitinib approval")}; ${ext(S.braveAa, "BRAVE-AA trials, NEJM, 2022")}; ${ext(S.litfulo, "ritlecitinib approval, June 2023")}; ${ext(S.leqselvi, "deuruxolitinib approval")}; ${ext(S.thriveAa1, "THRIVE-AA1, J Am Acad Dermatol, 2024")}.</p>
<h3>Availability of deuruxolitinib</h3>
<p>Leqselvi's launch was delayed by a patent dispute after approval, as Pharmacy Times reported in January 2025; the National Alopecia Areata Foundation says it became commercially available in July 2025. Sources: ${ext(S.ptLeqselvi, "Pharmacy Times")}; ${ext(S.naafLeqselvi, "NAAF Leqselvi FAQ")}.</p>
<h3>What the numbers mean for someone with alopecia areata</h3>
<p>In these trials a SALT score of 20 or less means at least 80% scalp coverage, starting from at least 50% loss. Roughly a quarter to four in ten patients on the higher approved doses reached it in six to nine months, against a few percent on placebo. That is a large effect for a disease that previously had no approved systemic treatment, and it also means most patients did not reach the target in the trial period. The BRAVE-AA authors noted that longer trials were needed. Source: ${ext(S.braveAa, "NEJM, 2022")}.</p>
<h3>Who should and should not consider them</h3>
<p>These are specialist drugs for a specific autoimmune disease, prescribed by dermatologists after a diagnosis and with monitoring. They are not prescribed for receding hairlines or a thinning crown, and nobody should seek one for pattern hair loss. If you have patchy, sudden or total hair loss, see a dermatologist for a diagnosis, because alopecia areata, pattern loss, scarring alopecias and shedding from illness or stress are treated differently. The telehealth providers we review treat pattern hair loss, not alopecia areata.</p>`,
    },
    {
      heading: "How do the new drugs work? A mechanism map",
      body: `<p>Almost every hair-loss drug, approved or experimental, works through one of four routes. Placing each candidate on this map is the quickest way to see which are genuinely new and which can be combined.</p>
<table>
<thead><tr><th>Route</th><th>What it does</th><th>Approved today</th><th>In development</th><th>Condition</th></tr></thead>
<tbody>
<tr><td>1. Lower DHT (5-alpha-reductase)</td><td>Reduces how much testosterone is converted to DHT, the hormone that shrinks susceptible follicles</td><td>Oral finasteride (men); dutasteride off-label; topical finasteride approved in some EU countries, compounded in the US</td><td>No new enzyme blocker in late-stage trials that we found</td><td>Pattern hair loss</td></tr>
<tr><td>2. Block the androgen receptor at the follicle</td><td>Stops DHT acting on the follicle without lowering it in the blood (antagonist), or destroys the receptor (degrader)</td><td>None for hair (clascoterone 1% is approved for acne as Winlevi)</td><td>Clascoterone 5% (phase 3 complete); pyrilutamide (phase 3, China); GT20029 (phase 2, published)</td><td>Pattern hair loss</td></tr>
<tr><td>3. Growth phase and blood flow (minoxidil, a potassium-channel opener)</td><td>Prolongs the growing phase and enlarges follicles; originally a blood-pressure drug</td><td>Topical minoxidil; oral minoxidil off-label</td><td>VDPHL01 extended-release tablet (two male trials positive; women's trial enrolled)</td><td>Pattern hair loss, men and women</td></tr>
<tr><td>4. Wake follicle stem cells (metabolism)</td><td>Shifts stem-cell metabolism toward lactate production to push dormant follicles back into growth</td><td>None</td><td>PP405 (phase 2/3 AWAKEN started October 2026)</td><td>Pattern hair loss</td></tr>
<tr><td>5. Calm the immune attack (JAK)</td><td>Blocks immune signalling that attacks the follicle</td><td>Baricitinib, ritlecitinib, deuruxolitinib</td><td>Not covered here</td><td>Alopecia areata only</td></tr>
</tbody>
</table>
<p>Sources for the mechanisms: ${ext(S.piraccini, "finasteride and DHT, JEADV 2022")}; ${ext(S.medscape, "VDPHL01, Medscape 2026")}; ${ext(S.flores, "stem-cell metabolism, Nature Cell Biology 2017")}; ${ext(S.olumiant, "JAK, FDA 2022")}; clascoterone per our <a href="/hair-loss/articles/breezula-clascoterone-hair-loss">Breezula guide</a>.</p>
<h3>Three things the map shows</h3>
<p><strong>Routes 1 and 2 overlap; route 3 combines with both.</strong> Finasteride and an androgen receptor blocker both aim at DHT's effect, so they are alternatives more than partners, although they act at different points. Minoxidil works independently of DHT, which is why the standard combination is a DHT-side drug plus minoxidil. Any of the new candidates would most likely slot into that same structure rather than replace it.</p>
<p><strong>Route 4 is the only new idea in late-stage testing.</strong> If PP405 works in AWAKEN, it is the first candidate that could add to both of the existing approaches rather than substitute for one. It is also the least proven.</p>
<p><strong>Route 5 is a different disease.</strong> Its inclusion in "new hair-loss treatment" lists is the source of most confusion. Our guide to <a href="/hair-loss/articles/dutasteride-vs-finasteride">dutasteride versus finasteride</a> covers route 1 in more depth.</p>`,
    },
    {
      heading: "What side effects have the new treatments shown?",
      body: `<p>Safety is where topline releases say least, so this table sets out what each source actually reported. "Not reported" means the source we found did not give the information, not that there were no side effects.</p>
<table>
<thead><tr><th>Candidate</th><th>What was reported</th><th>Source type</th><th>Main gap</th></tr></thead>
<tbody>
<tr><td>VDPHL01</td><td>Peripheral oedema and hypertrichosis most common; hypertrichosis notably higher on twice daily; no treatment-related serious adverse events; no cardiac adverse events of special interest</td><td>Company release and coverage, 2026</td><td>Full tables, rates per arm, long-term data</td></tr>
<tr><td>Clascoterone 5%</td><td>Company describes the safety profile as supportive</td><td>Company, per our Breezula guide</td><td>Full adverse-event data unpublished</td></tr>
<tr><td>PP405</td><td>No detectable drug in the blood on daily topical dosing (phase 1); no systemic absorption detected (phase 2a)</td><td>Company and conference data</td><td>Small, short trials; not peer-reviewed</td></tr>
<tr><td>Pyrilutamide</td><td>No drug-related serious adverse events; adverse-event rate similar to placebo</td><td>Company, as reported, 2026</td><td>No publication</td></tr>
<tr><td>GT20029</td><td>Adverse events comparable to placebo; safe and well tolerated during the 12-week trial</td><td>Peer-reviewed, 2025</td><td>Twelve weeks only</td></tr>
<tr><td>Topical finasteride</td><td>Lower systemic exposure than oral (34.5% vs 55.6% DHT reduction); FDA alert on 32 adverse-event reports for compounded products, 2019-2024</td><td>Peer-reviewed trial; FDA</td><td>Long-term data; compounded formulations vary</td></tr>
<tr><td>Baricitinib</td><td>Acne, raised creatine kinase and raised LDL and HDL cholesterol more common than placebo; low discontinuation; boxed warning</td><td>Peer-reviewed; FDA label</td><td>Long-term use in AA</td></tr>
<tr><td>Ritlecitinib, deuruxolitinib</td><td>Boxed warnings for the JAK class (serious infections, mortality, malignancy, cardiovascular events, thrombosis)</td><td>FDA approvals</td><td>Long-term use in AA</td></tr>
</tbody>
</table>
<p>Sources: ${ext(S.vd304bw, "Veradermics")}; ${ext(S.marketbeat, "MarketBeat")}; ${ext(S.pelageAad, "Pelage AAD 2024")}; ${ext(S.pelage2a, "Dermatology Times")}; ${ext(S.kx826Pharmcube, "PharmCube")}; ${ext(S.gtPaper, "J Dermatol Treat 2025")}; ${ext(S.gtArena, "Clinical Trials Arena")}; ${ext(S.piraccini, "JEADV 2022")}; ${ext(S.fdaFinAlert, "FDA alert")}; ${ext(S.braveAa, "NEJM 2022")}; ${ext(S.olumiant, "FDA 2022")}; ${ext(S.leqselvi, "deuruxolitinib approval")}.</p>
<h3>Reading the safety column</h3>
<p>The topicals' main selling point is that they act at the scalp, and the PP405 and Kintor results are consistent with that. The test comes in larger, longer trials, where uncommon side effects show up. For the oral candidates, the questions are different. VDPHL01's most common side effects, swelling and unwanted body or facial hair, are already familiar from off-label oral minoxidil, and the company's claim is that slow release avoids the blood-level peaks linked to its cardiac effects. The JAK inhibitors are in a different category altogether: they suppress parts of the immune system, which is why they come with the FDA's strongest warnings and are prescribed only for severe alopecia areata with monitoring. One myocardial infarction was reported in a BRAVE-AA1 patient on the 2 mg dose. Source: ${ext(S.braveAa, "NEJM, 2022")}.</p>`,
    },
    {
      heading: "What is approved today, and what is still in development?",
      body: `<p>The second summary table sorts everything by its regulatory status in the US as of October 31, 2026. "Off-label" means an FDA-approved drug prescribed for a use not on its label, which is legal and common in hair loss but means the hair-loss use has not been through FDA review.</p>
<table>
<thead><tr><th>Treatment</th><th>US status, October 2026</th><th>Route</th><th>For</th><th>Can you get it now?</th></tr></thead>
<tbody>
<tr><td>Oral finasteride</td><td>FDA-approved for male pattern hair loss</td><td>Tablet</td><td>Men</td><td>Yes, by prescription, including online</td></tr>
<tr><td>Topical minoxidil</td><td>FDA-approved, over the counter</td><td>Solution or foam</td><td>Men and women</td><td>Yes</td></tr>
<tr><td>Oral minoxidil (immediate release)</td><td>Approved for blood pressure; off-label for hair</td><td>Tablet</td><td>Men and women</td><td>Yes, by prescription, including online</td></tr>
<tr><td>Dutasteride</td><td>Approved for enlarged prostate; off-label for hair</td><td>Capsule; compounded topicals</td><td>Men</td><td>Yes, by prescription, including online</td></tr>
<tr><td>Topical finasteride</td><td>Not FDA-approved; compounded; FDA alert April 2025</td><td>Spray or solution</td><td>Men</td><td>Yes, compounded, by prescription</td></tr>
<tr><td>Spironolactone</td><td>Off-label for female pattern hair loss</td><td>Tablet or compounded</td><td>Women</td><td>Yes, by prescription</td></tr>
<tr><td>Baricitinib, ritlecitinib, deuruxolitinib</td><td>FDA-approved, severe alopecia areata only</td><td>Tablet</td><td>AA patients (ritlecitinib from age 12)</td><td>Yes, via a dermatologist, not for pattern loss</td></tr>
<tr><td>VDPHL01</td><td>Investigational; male phase 3 complete; women's trial reading out 2027 (company)</td><td>Extended-release tablet</td><td>Men; women in trial</td><td>No, trial only</td></tr>
<tr><td>Clascoterone 5% (Breezula)</td><td>Investigational; US filing planned early 2027 (company)</td><td>Scalp solution</td><td>Men</td><td>No</td></tr>
<tr><td>PP405</td><td>Investigational; phase 2/3 started October 2026</td><td>Scalp gel</td><td>Men; women's phase 2 registered</td><td>No, trial only</td></tr>
<tr><td>Pyrilutamide (KX-826)</td><td>Investigational; China phase 3 positive (reported)</td><td>Scalp solution</td><td>Men (China)</td><td>No</td></tr>
<tr><td>GT20029</td><td>Investigational; phase 2 published</td><td>Scalp solution</td><td>Men (China)</td><td>No</td></tr>
</tbody>
</table>
<p>Sources: the trial and approval sources in each section above; for the approved oral and topical treatments and their off-label use, see our guides to <a href="/hair-loss/articles/finasteride-vs-minoxidil">finasteride versus minoxidil</a>, <a href="/hair-loss/articles/oral-minoxidil-vs-topical-minoxidil">oral versus topical minoxidil</a> and <a href="/hair-loss/articles/dutasteride-vs-finasteride">dutasteride versus finasteride</a>. Happy Head lists spironolactone among the off-label actives it uses; women's options are covered in <a href="/hair-loss/articles/hair-loss-treatment-for-women">hair loss treatment for women</a>.</p>
<p>The column that matters is the last one. Every row with a "Yes" can be started this week after a medical review. Every row with a "No" is, at best, a filing and a review away, and the earliest company-stated filing among them is early 2027.</p>`,
    },
    {
      heading: "Timeline: hair-loss approvals and readouts, 2022 to 2028",
      body: `<p>The timeline puts dates on the pipeline. Past events are sourced; future events are labelled as company statements or our arithmetic, and they will move. The underlying science is older: the stem-cell metabolism work behind PP405 was published in August 2017 (${ext(S.flores, "Nature Cell Biology")}), and finasteride was approved in the late 1990s, the last new pattern hair-loss pill according to ${ext(S.fortune, "Fortune")} and ${ext(S.gizmodo, "Gizmodo")}.</p>
<table>
<thead><tr><th>When</th><th>Event</th><th>Type of source</th></tr></thead>
<tbody>
<tr><td>2022</td><td>Phase 3 trial of topical finasteride spray published in JEADV</td><td>Peer-reviewed</td></tr>
<tr><td>June 13, 2022</td><td>FDA approves baricitinib (Olumiant), first systemic treatment for severe alopecia areata</td><td>FDA</td></tr>
<tr><td>June 23, 2023</td><td>FDA approves ritlecitinib (Litfulo) for severe AA, ages 12 and up</td><td>FDA</td></tr>
<tr><td>2023</td><td>Pyrilutamide phase 3 setback</td><td>Trade press</td></tr>
<tr><td>2024</td><td>Pelage presents PP405 phase 1 data at AAD; Kintor announces GT20029 phase 2 met its primary endpoint</td><td>Conference data; company</td></tr>
<tr><td>July 25, 2024</td><td>FDA approves deuruxolitinib (Leqselvi) for severe AA in adults</td><td>FDA</td></tr>
<tr><td>December 2024</td><td>Topical finasteride spray launches listed in Portugal, Germany, Italy</td><td>Commercial database</td></tr>
<tr><td>April 22, 2025</td><td>FDA alert on compounded topical finasteride</td><td>FDA</td></tr>
<tr><td>2025</td><td>PP405 phase 2a results announced; GT20029 phase 2 published; Leqselvi available (July, per NAAF)</td><td>Company; peer-reviewed; patient organisation</td></tr>
<tr><td>October 2025</td><td>Veradermics announces a $150 million Series C to fund VDPHL01 phase 3 trials</td><td>Company</td></tr>
<tr><td>December 2025</td><td>Cosmo reports SCALP 1 and 2 phase 3 topline for clascoterone 5%</td><td>Company</td></tr>
<tr><td>March 2026</td><td>Kintor reports positive pyrilutamide phase 3 in China</td><td>Company, as reported</td></tr>
<tr><td>April 2026</td><td>Cosmo reports 12-month clascoterone data; Veradermics reports Study 302 (April 27)</td><td>Company</td></tr>
<tr><td>July 15, 2026</td><td>Veradermics reports Study 207 phase 2 including women</td><td>Company</td></tr>
<tr><td>August 11, 2026</td><td>Veradermics Q2 results: $819.9 million cash, runway into 2030</td><td>Company SEC filing</td></tr>
<tr><td>October 14, 2026</td><td>First patient dosed in PP405 phase 2/3 AWAKEN</td><td>Company</td></tr>
<tr><td>October 19, 2026</td><td>Veradermics reports Study 304 phase 3 in 536 men</td><td>Company</td></tr>
<tr><td>By end of 2026</td><td>PP405 women's phase 2 to start</td><td>Company plan</td></tr>
<tr><td>Early 2027</td><td>Clascoterone 5% US filing</td><td>Company plan</td></tr>
<tr><td>First half of 2027</td><td>VDPHL01 women's Study 306 Part A results</td><td>Company expectation</td></tr>
<tr><td>Late 2027 to 2028</td><td>Earliest plausible FDA decision on clascoterone if filed early 2027 and reviewed on a standard clock</td><td>Our arithmetic, not a company statement</td></tr>
<tr><td>Not stated</td><td>VDPHL01 FDA submission and decision</td><td>Company has not given a date</td></tr>
</tbody>
</table>
<p>Sources: ${ext(S.piraccini, "JEADV 2022")}; ${ext(S.olumiant, "baricitinib")}; ${ext(S.litfulo, "ritlecitinib")}; ${ext(S.kx826Citeline, "Scrip")}; ${ext(S.pelageAad, "Pelage AAD 2024")}; ${ext(S.gtKintor, "Kintor 2024")}; ${ext(S.leqselvi, "deuruxolitinib")}; ${ext(S.adis, "AdisInsight")}; ${ext(S.fdaFinAlert, "FDA alert")}; ${ext(S.pelage2a, "PP405 phase 2a")}; ${ext(S.gtPaper, "GT20029 paper")}; ${ext(S.naafLeqselvi, "NAAF")}; ${ext(S.vdSeriesC, "Veradermics Series C")}; ${ext(S.kx826Pharmcube, "pyrilutamide phase 3")}; ${ext(S.vd302bw, "Study 302")}; ${ext(S.vd207bw, "Study 207")}; ${ext(S.vdQ2, "Q2 2026")}; ${ext(S.pelageAwaken, "AWAKEN")}; ${ext(S.vd304bw, "Study 304")}; clascoterone dates per our <a href="/hair-loss/articles/breezula-clascoterone-hair-loss">Breezula guide</a>.</p>
<p>Two patterns are visible. The JAK approvals arrived one a year from 2022 to 2024, which is why "new hair-loss drugs" headlines in those years were mostly about alopecia areata. And the pattern hair-loss pipeline has bunched its key readouts into a 12-month window from late 2025 to late 2026, which is why the news feels sudden now. A cluster of positive readouts is not a cluster of approvals; the filings and reviews come next.</p>`,
    },
    {
      heading: "How long does it take a hair-loss drug to go from trial result to pharmacy?",
      body: `<p>Readers see "phase 3 success" and reasonably ask when they can buy it. The answer depends on steps that take place after the headline, and each candidate in this guide is at a different one.</p>
<h3>The stages</h3>
<ol>
<li><strong>Phase 1:</strong> small studies, mainly safety and how the drug behaves in the body. PP405 passed this stage by 2024.</li>
<li><strong>Phase 2:</strong> the first look at whether the drug works and at what dose. GT20029 completed this stage and published it in 2025; PP405 completed a phase 2a in 2025.</li>
<li><strong>Phase 3:</strong> large, placebo-controlled trials designed to support approval. VDPHL01 (men), clascoterone 5% and, in China, pyrilutamide have reported at this stage. Some programmes use combined "phase 2/3" designs, such as Veradermics' Studies 302 and 306 and Pelage's AWAKEN, and some report in parts: Studies 304 and 306 each have a "Part A" readout.</li>
<li><strong>Topline result:</strong> the first summary, issued by the company, usually as a press release. This is where every 2026 headline in this guide comes from.</li>
<li><strong>Full analysis and publication:</strong> the complete dataset, then a peer-reviewed paper. Of the pattern-loss candidates, only GT20029's phase 2 and topical finasteride's phase 3 are published in peer-reviewed journals among the sources we found.</li>
<li><strong>Filing:</strong> a New Drug Application to the FDA. Clascoterone's is planned for early 2027 according to the company; VDPHL01's has no stated date.</li>
<li><strong>Review:</strong> a standard FDA review takes about ten months from acceptance, longer if the agency asks for more data.</li>
<li><strong>Launch:</strong> manufacturing, pricing and distribution, which can add further months.</li>
</ol>
<h3>What an "end-of-phase 2 meeting" means</h3>
<p>Pelage described a positive end-of-phase 2 meeting with the FDA before AWAKEN began. Source: ${ext(S.pelageAwaken, "Pelage, October 14, 2026")}. That is a routine meeting at which a company and the agency agree what a pivotal trial needs to show. It is a sign the programme is organised, not a sign the drug will be approved.</p>
<h3>Applying it</h3>
<p>Put the stages against the stated dates and the order of likely arrival is: clascoterone and VDPHL01 first, at the earliest late 2027 or 2028 and with no guarantee; PP405 some years later if AWAKEN succeeds; Kintor's drugs in China first, with no US path announced. Any of those dates can slip by a year with one request for more data. That is the honest reason this guide keeps returning to the treatments that exist.</p>`,
    },
    {
      heading: "Why is hair loss suddenly big pharmaceutical news?",
      body: `<p>Part of the answer is science and part is money, and it helps to see both when reading coverage.</p>
<p>The science: two late-stage programmes reported positive results within a year. Cosmo's clascoterone topline came in December 2025, Veradermics' Study 302 in April 2026 and Study 304 in October 2026. Pelage's PP405 moved from a small phase 2a into a phase 2/3. Each event produced a press release, and each press release was picked up by trade and general media.</p>
<p>The money: Fortune reported in August 2026 that baldness drugs had become a focus for investors, naming Veradermics, Absci and Cosmo in its coverage, on the basis of a large untreated market, an estimated 50 million men and 30 million women with pattern hair loss in the US, and no new approved drug since the late 1990s. Source: ${ext(S.fortune, "Fortune, August 29, 2026")}. Veradermics raised a $150 million Series C in October 2025 to fund its phase 3 trials, and reported $819.9 million in cash and marketable securities at the end of June 2026. Sources: ${ext(S.vdSeriesC, "Veradermics, October 2025")}; ${ext(S.vdQ2, "Veradermics Q2 2026")}. Its shares rose about 7% on the Study 304 news. Source: ${ext(S.rtt304, "RTTNews")}.</p>
<h3>Why that matters to a patient</h3>
<p>Listed companies announce material trial results promptly, often alongside a regulatory filing, as Veradermics did with the SEC for Study 304, and they have an incentive to describe them well. That is why topline releases arrive months before peer-reviewed papers and use words chosen for investors. It does not make the results wrong; Veradermics' two male trials agree closely with each other, which is a good sign. It does mean the release is the most favourable reading of the data, and the paper, the FDA review and the label are where the full picture appears. When coverage reaches for superlatives, look for the hair count on drug, the hair count on placebo, and who reported them.</p>`,
    },
    {
      heading: "Should you wait for a new hair loss drug?",
      body: `<p>For almost everyone with pattern hair loss, no. The reasoning is short and does not depend on how good the new drugs turn out to be.</p>
<h3>Pattern hair loss keeps going while you wait</h3>
<p>Androgenetic alopecia is progressive. Follicles exposed to DHT shrink over successive growth cycles, producing finer and shorter hairs until they produce nothing visible, and the change continues year over year without treatment (see our <a href="/hair-loss/articles/norwood-scale">Norwood scale</a> guide for the stages). Every drug in this guide, approved or not, works by stopping or reversing that shrinkage in follicles that are still alive. None of them, as far as the published evidence goes, creates new follicles in long-bald skin. So the cost of waiting is paid in the follicles that will no longer be there for the new drug to act on.</p>
<h3>The earliest new options are still well away</h3>
<p>Use the company-stated dates, not the headlines. Clascoterone's US filing is planned for early 2027, and a standard review runs about ten months after an application is accepted. VDPHL01 has no stated filing date, and its women's results are not due until the first half of 2027. PP405 has just begun its pivotal trial. Pyrilutamide and GT20029 have no US programme we could find. On those facts, a man starting to thin in late 2026 who waits for the first new approval is choosing at least a year, and more likely two or more, of untreated loss.</p>
<h3>Starting now does not block switching later</h3>
<p>Nothing about finasteride, minoxidil or their combination stops you adding or switching to a new drug when one is approved and your prescriber thinks it suits you. VDPHL01 is itself minoxidil, so a man on off-label oral minoxidil today is already on the same active ingredient. Clascoterone would be an alternative or an addition on the DHT side. PP405 works by a third route. The likeliest future is more combinations, not a single replacement.</p>
<h3>The exceptions</h3>
<ul>
<li><strong>You have a medical reason not to take the existing drugs.</strong> Some men cannot or will not take finasteride after discussing its side effects; some people should not take oral minoxidil because of heart or blood-pressure conditions. For them the calculation is different, and a trial or a topical may be the right conversation. Your prescriber decides.</li>
<li><strong>You are a woman who is pregnant or planning pregnancy.</strong> Finasteride and dutasteride are not used, and many options are limited; see our <a href="/hair-loss/articles/hair-loss-treatment-for-women">women's guide</a> and speak to a clinician.</li>
<li><strong>You are eligible for a trial.</strong> Joining a placebo-controlled trial is a legitimate way to try a new drug, with the understanding that you may get placebo and that trials restrict other hair treatments. ClinicalTrials.gov lists sites.</li>
<li><strong>Your loss is not pattern loss.</strong> Patchy loss, sudden loss, scalp pain or scarring need a diagnosis first, and alopecia areata has its own approved drugs.</li>
</ul>
<h3>A simple decision rule</h3>
<table>
<thead><tr><th>Your situation</th><th>What the evidence supports</th><th>Where the new drugs fit</th></tr></thead>
<tbody>
<tr><td>Man, early thinning, no reason to avoid finasteride</td><td>Start a DHT-side treatment and/or minoxidil now</td><td>Possible add-ons or switches later</td></tr>
<tr><td>Man, worried about finasteride side effects</td><td>Discuss minoxidil alone, topical finasteride, or oral finasteride with monitoring</td><td>Clascoterone is the candidate aimed at this group; not yet available</td></tr>
<tr><td>Man, already on finasteride and minoxidil, stable</td><td>Stay on treatment; do not stop to wait</td><td>Ask about PP405 trials if interested</td></tr>
<tr><td>Man, advanced loss</td><td>Medication protects what remains; see our <a href="/hair-loss/articles/hair-transplant-vs-medication">transplant versus medication</a> guide</td><td>New drugs, like old ones, need living follicles</td></tr>
<tr><td>Woman, pattern thinning</td><td>Minoxidil (topical or off-label oral); other options with a clinician</td><td>VDPHL01 women's results due first half of 2027 (company)</td></tr>
<tr><td>Patchy or total loss</td><td>Dermatologist diagnosis; JAK inhibitors if severe alopecia areata</td><td>The pattern-loss pipeline is not for you</td></tr>
</tbody>
</table>`,
    },
    {
      heading: "What can you get today, and what does it cost?",
      body: `<p>Four treatments do most of the work in pattern hair loss today: finasteride, minoxidil (topical or oral), and, off-label, dutasteride, with spironolactone used off-label for some women. Our guides to <a href="/hair-loss/articles/finasteride-vs-minoxidil">finasteride versus minoxidil</a> and <a href="/hair-loss/articles/dutasteride-vs-finasteride">dutasteride versus finasteride</a> explain the choice; this section is about where to get them and what the providers we review charge.</p>
<h3>Verified prices from the providers we review</h3>
<p>Prices below are copied from each provider's published pricing as we recorded it in August 2026. Conditions matter: Maximus bills as a 90-day supply; Happy Head's $49 is a first-order promotion; PeterMD's prices are current promotions with regular rates shown. Hims and Keeps are included for context, but we do not have verified prices for them, so we give none. Confirm current prices on each provider's site.</p>
<table>
<thead><tr><th>Provider</th><th>What it offers</th><th>Verified prices (August 2026)</th><th>Conditions</th></tr></thead>
<tbody>
<tr><td><a href="/hair-loss/reviews/maximus">Maximus</a></td><td>Oral finasteride, oral minoxidil, oral dutasteride; compounded gels; board-certified doctor review; free, discreet delivery; men</td><td>Oral minoxidil $24.99/mo; oral finasteride $34.99/mo; oral dutasteride $34.99/mo; Minoxidil+ Gel $44.99/mo; Dutasteride+ Gel $54.99/mo; oral minoxidil + oral dutasteride $59.99/mo; All-in-One Gel (dutasteride, minoxidil, tretinoin, fexofenadine) $64.99/mo</td><td>Billed as a 90-day supply</td></tr>
<tr><td><a href="/hair-loss/reviews/happyhead">Happy Head</a></td><td>Dermatologist-founded; custom topical and oral formulas for men and women; minoxidil and finasteride plus dutasteride and spironolactone off-label; free online consultation</td><td>Custom Topical (dutasteride 0.3%, minoxidil 8%, retinoic acid, hydrocortisone) $49, regularly $89/month; 3-in-1 Daily SuperCapsule (dutasteride, minoxidil, vitamin D3) $49, regularly $89; Dual Action Bundle $98, regularly $178</td><td>$49 is the first-order promotion; subscribing saves 20%; advertises a 6-month growth guarantee (check terms)</td></tr>
<tr><td><a href="/hair-loss/reviews/petermd">PeterMD</a></td><td>Physician-prescribed finasteride 1 mg; Follicure RX spray (minoxidil, finasteride, ketoconazole); men</td><td>Finasteride 30 tablets $60 (reg $74); 60 tablets $90 (reg $110), about $45/month; ReGenX Bundle $130 (reg $160); Follicure RX $70 per 50 mL (reg $80), two for $140 (reg $160)</td><td>Prices shown are current promotions</td></tr>
<tr><td>Hims</td><td>Prescription finasteride and minoxidil; widely recognised men's telehealth brand; online consultation and discreet delivery</td><td>No verified price</td><td>Check the provider's site</td></tr>
<tr><td>Keeps</td><td>Generic finasteride and minoxidil prescribed online; budget-focused men's hair-loss specialist; hair-care add-ons such as ketoconazole shampoo</td><td>No verified price</td><td>Check the provider's site</td></tr>
</tbody>
</table>
<h3>Worked examples, using only the verified figures</h3>
<ul>
<li><strong>Oral minoxidil at Maximus:</strong> $24.99 a month, billed as a 90-day supply, is $74.97 per bill and $299.88 over a year.</li>
<li><strong>Oral finasteride at Maximus:</strong> $34.99 a month is $104.97 per 90-day bill and $419.88 a year.</li>
<li><strong>Oral minoxidil plus oral dutasteride at Maximus:</strong> $59.99 a month, $719.88 a year.</li>
<li><strong>Finasteride at PeterMD:</strong> the 60-tablet pack at $90 lasts 60 days at one tablet a day, which is the "about $45 a month" PeterMD's rate works out to, or $540 for six packs a year at the current promotional price.</li>
<li><strong>Happy Head Custom Topical:</strong> $49 for the first order, then the regular $89 a month unless a promotion or the 20% subscription saving applies; check how the saving is applied before you compare.</li>
</ul>
<p>Any of these costs less over a year than most readers would pay waiting for a new drug, which will launch at brand prices, and the cheapest verified entry point, Maximus' oral minoxidil, contains the same active ingredient as VDPHL01 in a different, off-label formulation. Doses and the choice of drug are your prescriber's decision after a medical review.</p>
<h3>What each provider does well</h3>
<p><strong>Maximus</strong> has the broadest prescription menu we review for men, including oral dutasteride and a four-ingredient gel, the lowest verified entry price, and a 4.4 Trustpilot average across 1,050 reviews on a claimed profile. <strong>Happy Head</strong> is the strongest fit for women and for people who want a personalised formula, with higher-strength 8% topical minoxidil and a 4.5 Trustpilot average across 1,803 reviews. <strong>PeterMD</strong> has the simplest lineup and transparent pricing, and the only topical in our ranking that includes ketoconazole. <strong>Hims</strong> is a recognisable mainstream route to the basics, and <strong>Keeps</strong> is a budget-focused route to generic finasteride and minoxidil. Full comparisons are on our <a href="/hair-loss/articles/best-online-hair-loss-treatment">best online hair loss treatment</a> page and the <a href="/hair-loss">hair loss provider ranking</a>.</p>`,
    },
    {
      heading: "Who this guide is for, and who it isn't for",
      body: `<p><strong>It is for</strong> men and women with pattern hair loss who have read about VDPHL01, Breezula or PP405 and want to know whether to wait; people already on finasteride or minoxidil who want to know what might replace or join them; and anyone trying to sort real trial results from clinic marketing.</p>
<p><strong>It is not for</strong> people with patchy, sudden or total hair loss, who need a diagnosis and, if it is alopecia areata, a dermatologist rather than a pattern-loss provider; people with scalp pain, redness or scarring; children and adolescents, apart from the alopecia areata approvals noted; and anyone looking for a dose. Nothing here is a protocol. Doses appear only as the trials and labels state them, and your prescriber decides.</p>
<p>It is also not investment advice. Several of these companies are listed, and their share prices move on the same announcements we cite. A positive topline release can be good for a stock and still leave a patient with nothing new to take for years.</p>`,
    },
    {
      heading: "What does the pipeline mean for you?",
      body: `<h3>Men in their twenties or thirties with early thinning</h3>
<p>You are the group that has the most to lose by waiting and the most to gain from treatment, because you have the most living follicles. The approved options work best early. If you are wary of finasteride, a prescriber can talk you through minoxidil alone, topical finasteride, or finasteride with a clear plan for side effects. Clascoterone is the candidate built for your concern, and its company-stated filing is early 2027. Our <a href="/hair-loss/articles/finasteride-vs-minoxidil">finasteride versus minoxidil</a> guide is the place to start.</p>
<h3>Men already on treatment</h3>
<p>Stay on it. Stopping finasteride or minoxidil to "save room" for a new drug gives back the gains, and there is no evidence that a gap improves the response to anything later. When a new drug is approved, the switch, if any, is a conversation with your prescriber with your current regimen in place.</p>
<h3>Men with advanced loss</h3>
<p>No candidate in this guide claims to regrow hair on long-bald scalp, and the PP405 mechanism, the most novel, acts on stem cells still present in a follicle. Medication protects and thickens what remains; a transplant moves follicles to where there are none. Our <a href="/hair-loss/articles/hair-transplant-vs-medication">transplant versus medication</a> guide covers how the two work together.</p>
<h3>Women with pattern thinning</h3>
<p>The most important trial for you has not reported. Veradermics' Study 306 enrolled 556 women and expects Part A results in the first half of 2027; the small open-label Study 207 reported a hair-count gain in women in July 2026. Oral finasteride is approved for men only, so women's options today centre on minoxidil, topical or off-label oral, with off-label options such as spironolactone where a clinician judges them appropriate. Happy Head is the provider in our review set built for women. See <a href="/hair-loss/articles/hair-loss-treatment-for-women">hair loss treatment for women</a>.</p>
<h3>People with alopecia areata</h3>
<p>The new approvals are yours, not the pattern-loss pipeline. Baricitinib, ritlecitinib (from age 12) and deuruxolitinib are FDA-approved for severe alopecia areata and require a dermatologist and monitoring because of their boxed warnings. The pattern-loss candidates in this guide are not being tested in alopecia areata.</p>
<h3>People who want to try a new drug now</h3>
<p>The only legitimate route is a clinical trial. Search ClinicalTrials.gov for the drug name, check the eligibility criteria and contact the site. Do not buy anything sold under these names online.</p>`,
    },
    {
      heading: "How do you spot a fake 'new' hair loss treatment?",
      body: `<p>Every wave of trial news produces products that borrow its vocabulary. The pattern is predictable enough to check against.</p>
<ul>
<li><strong>The name is a trial drug.</strong> VDPHL01, Breezula, clascoterone 5% for hair, PP405, pyrilutamide and GT20029 are not approved in the US. A site selling any of them, or a "research" version of them, is not selling the trial product, and nothing about its quality, strength or purity has been checked.</li>
<li><strong>"Stem cell" in the product name.</strong> PP405 contains no stem cells, and its mechanism is a small molecule acting on the stem cells already in follicles. A serum, shampoo or injection marketed as "stem cell activating" is not PP405 and borrows its language.</li>
<li><strong>"Like VDPHL01" or "extended-release minoxidil."</strong> Off-label oral minoxidil is a legitimate prescription; it is not VDPHL01, and anyone describing an immediate-release tablet as the new drug is misdescribing it.</li>
<li><strong>Results without a placebo.</strong> Before-and-after photographs from a clinic have no comparison group. As the VDPHL01 trials show, placebo groups gain hair too.</li>
<li><strong>"No side effects."</strong> No drug in this guide has been reported side-effect free. VDPHL01's trials reported oedema and unwanted hair growth; topical finasteride is the subject of an FDA alert; JAK inhibitors carry boxed warnings.</li>
<li><strong>Treatments we could not verify.</strong> Claims about exosomes, PRP, injected stem cells, Wnt-pathway topicals, ET-02 or light devices should come with a dated, controlled trial result. Ask for it.</li>
</ul>
<p>The telehealth providers we review prescribe approved and established off-label drugs after a medical review; none of them sells an investigational drug, and none should.</p>`,
    },
    {
      heading: "What we don't know yet",
      body: `<ul>
<li><strong>VDPHL01's full data.</strong> Studies 302 and 304 are topline company releases. The confidence intervals, dropout rates, full adverse-event tables and long-term follow-up are not public, and neither trial had been published in a peer-reviewed journal when we checked. Whether twice daily is better than once daily, once side effects are counted, is not settled.</li>
<li><strong>VDPHL01 in women.</strong> The only data in women so far is from a small open-label study. Study 306 is the test.</li>
<li><strong>Long-term safety of any new oral minoxidil.</strong> Six-month trials with no cardiac adverse events of special interest are reassuring, not conclusive, for a drug that people will take for years.</li>
<li><strong>Clascoterone's absolute effect.</strong> The SCALP trials have been reported as relative improvements and topline statements; the absolute hair counts await publication.</li>
<li><strong>Whether PP405 works in a large trial.</strong> The phase 2a was small, short, designed mainly for safety and not peer-reviewed. AWAKEN has just begun.</li>
<li><strong>Whether Kintor's drugs will be tested in the US.</strong> We found no US programme for pyrilutamide or GT20029.</li>
<li><strong>How any new drug compares with finasteride.</strong> None of the candidates has a head-to-head trial against finasteride, oral minoxidil or each other.</li>
<li><strong>Price and coverage.</strong> No company has announced a price. New branded drugs usually cost more than generics, and insurers often treat pattern hair loss as cosmetic.</li>
<li><strong>The candidates we left out.</strong> We could not verify current evidence for ET-02, Wnt programmes such as SM04554, exosomes, PRP, stem-cell injections or low-level light for this edition. We will add them when we can source them.</li>
</ul>`,
    },
    {
      heading: "Questions to ask your clinician",
      body: `<p>Take this list to a telehealth consultation or a dermatologist. It is built around the decision this guide describes: what to start now, and how a future drug would fit.</p>
<ol>
<li>Is my hair loss pattern hair loss, or could it be something else (shedding, alopecia areata, a scalp condition, iron or thyroid problems)?</li>
<li>Given my age, sex, stage and history, would you start with a DHT-side treatment, minoxidil, or both?</li>
<li>Is oral minoxidil appropriate for me, given my blood pressure, heart history and other medicines? What side effects should I watch for?</li>
<li>If I am worried about finasteride's side effects, what are my options: topical finasteride, minoxidil alone, or finasteride with a follow-up plan? What did the FDA's 2025 alert on compounded topical finasteride mean for me?</li>
<li>If I am a woman, which options are safe for me now, and what would change if I plan a pregnancy?</li>
<li>How long before we judge whether my treatment is working, and how will we measure it (photographs, counts)?</li>
<li>If VDPHL01 or clascoterone is approved, would it change my plan, and how would we switch without a gap?</li>
<li>Am I a candidate for a clinical trial, and would joining one mean stopping my current treatment?</li>
<li>If my loss is patchy or sudden, should I see a dermatologist about alopecia areata?</li>
<li>What will this cost each month and each year, and how is it billed?</li>
</ol>`,
    },
    {
      heading: "Final verdict and next steps",
      body: `<p>The hair-loss pipeline is the most active it has been in a generation. VDPHL01 has two positive male trials and could become the first FDA-approved oral minoxidil; clascoterone 5% has completed phase 3 with a filing planned for early 2027; PP405 brings a genuinely new mechanism into a pivotal trial; and Kintor's two topical anti-androgens show that the androgen receptor is a target others are chasing. Three JAK inhibitors have given people with severe alopecia areata their first approved drugs.</p>
<p>None of that changes what a person losing hair should do this month. The new pattern-loss drugs are not available, the earliest has no filing date, and pattern hair loss does not pause while the FDA reviews an application. Finasteride and minoxidil work now, oral minoxidil and dutasteride are prescribed off-label now, and every one of them leaves the door open to a new drug later.</p>
<h3>Next steps</h3>
<ul>
<li>Read the dedicated guides on the two closest candidates: <a href="/hair-loss/articles/veradermics-vdphl01">VDPHL01</a> and <a href="/hair-loss/articles/breezula-clascoterone-hair-loss">Breezula (clascoterone)</a>.</li>
<li>Choose your starting treatment with <a href="/hair-loss/articles/finasteride-vs-minoxidil">finasteride versus minoxidil</a>, <a href="/hair-loss/articles/oral-minoxidil-vs-topical-minoxidil">oral versus topical minoxidil</a>, <a href="/hair-loss/articles/dutasteride-vs-finasteride">dutasteride versus finasteride</a> and <a href="/hair-loss/articles/topical-finasteride">topical finasteride</a>.</li>
<li>Women: start with <a href="/hair-loss/articles/hair-loss-treatment-for-women">hair loss treatment for women</a>.</li>
<li>Advanced loss: read <a href="/hair-loss/articles/hair-transplant-vs-medication">hair transplant versus medication</a>.</li>
<li>Compare providers on the <a href="/hair-loss">hair loss ranking</a> and <a href="/hair-loss/articles/best-online-hair-loss-treatment">best online hair loss treatment</a>.</li>
</ul>
<p>We will update this guide as results are published and filings are made. This article is general information, not medical advice.</p>`,
    },
    {
      heading: "References",
      body: `<ol>
<li>Veradermics. "Veradermics' Oral VDPHL01 Achieved Early, Consistent ... Hair Growth in Positive Phase 3 '304' Clinical Trial in Male Pattern Hair Loss." Business Wire, October 19, 2026. ${ext(S.vd304bw, "businesswire.com")}; also ${ext(S.vd304ir, "Veradermics investor relations")} and ${ext(S.vd304sec, "SEC exhibit 99.1")}.</li>
<li>Veradermics. "Veradermics' Oral VDPHL01 Achieved Early, Consistent ... Hair Growth in Positive Phase 2/3 '302' Clinical Trial in Male Pattern Hair Loss." Business Wire, April 27, 2026. ${ext(S.vd302bw, "businesswire.com")}</li>
<li>Dermatology Times. "Phase 2/3 Trial of Extended-Release Oral Minoxidil Shows ... Hair Growth Outcomes in Male Pattern Hair Loss." 2026. ${ext(S.vd302dt, "dermatologytimes.com")}</li>
<li>Veradermics. "Veradermics Oral VDPHL01 Delivers Positive Study 207 Phase 2 Clinical Trial Results in Female Pattern Hair Loss Ahead of Upcoming Phase 2/3 Study 306 Readout." Business Wire, July 15, 2026. ${ext(S.vd207bw, "businesswire.com")}</li>
<li>Endpoints News. "Veradermics declares first efficacy win in women for hair loss drug." July 2026. ${ext(S.vd207endpoints, "endpoints.news")}</li>
<li>Fierce Pharma. "Buzzy Veradermics shows its oral minoxidil can tackle female pattern hair loss, too." July 2026. ${ext(S.vd207fierce, "fiercepharma.com")}</li>
<li>Veradermics. Second quarter 2026 financial results, Form 8-K exhibit 99.1. SEC, August 11, 2026. ${ext(S.vdQ2, "sec.gov")}</li>
<li>Veradermics. "Veradermics Announces Oversubscribed $150 Million Series C Financing to Advance VDPHL01 Through Multiple Phase 3 Trials." Business Wire, October 16, 2025. ${ext(S.vdSeriesC, "businesswire.com")}</li>
<li>Medscape. "Male Pattern Baldness: Extended-Release Minoxidil Regrows Hair in Phase 3 Trial." October 22, 2026. ${ext(S.medscape, "medscape.com")}</li>
<li>Cara, E. "Balding Men Haven't Had a New Pill Since the 1990s. That's About to Change." Gizmodo, October 21, 2026. ${ext(S.gizmodo, "gizmodo.com")}</li>
<li>Fierce Pharma. "Veradermics' hot streak continues with another phase 3 win in hair loss." October 2026. ${ext(S.fierce304, "fiercepharma.com")}</li>
<li>MarketBeat. "Veradermics Phase III Hair Loss Trial Meets All Endpoints, Posts Strong Growth Results." October 19, 2026. ${ext(S.marketbeat, "marketbeat.com")}; syndicated on ${ext(S.yahoo304, "Yahoo Finance")}.</li>
<li>Pharmacally. "Veradermics Reports Higher Hair Growth With VDPHL01 in Phase 3." October 2026. ${ext(S.pharmacally, "pharmacally.com")}</li>
<li>RTTNews. "Veradermics Stock Rises 7% After Positive Phase 3 Hair Loss Trial Results." October 19, 2026. ${ext(S.rtt304, "rttnews.com")}</li>
<li>Fortune. "Forget GLP-1 stocks, baldness drugs are Wall Street's next goldmine." August 29, 2026. ${ext(S.fortune, "fortune.com")}</li>
<li>Pelage Pharmaceuticals. "Pelage Pharmaceuticals Announces First Patient Dosed in Phase 2/3 AWAKEN Trial of PP405 for Androgenetic Alopecia." October 14, 2026. ${ext(S.pelageAwaken, "pelagepharma.com")}; ${ext(S.pelageAwakenBio, "BioSpace")}</li>
<li>Dermatology Times. "Pelage's PP405 Demonstrates Efficacy in Phase 2a Trial for Androgenetic Alopecia." 2025. ${ext(S.pelage2a, "dermatologytimes.com")}</li>
<li>Pelage Pharmaceuticals. "Pelage Presents Late Breaking Data at AAD 2024 Meeting Demonstrating PP405 Activates Human Hair Follicle Stem Cells Ex Vivo and in Phase 1 Clinical Study." BioSpace, 2024. ${ext(S.pelageAad, "biospace.com")}</li>
<li>ClinicalTrials.gov. "Phase 2 Efficacy and Safety of PP405 in Adult Females With Androgenetic Alopecia." NCT07907783. ${ext(S.pelageWomenCt, "clinicaltrials.gov")}</li>
<li>Flores A, et al. "Lactate dehydrogenase activity drives hair follicle stem cell activation." Nature Cell Biology, 2017;19(9):1017-1026. ${ext(S.flores, "PMC5657543")}</li>
<li>PharmCube. "Kintor's Hair Loss Drug Succeeds in Phase III Trial, NDA Imminent." March 2026. ${ext(S.kx826Pharmcube, "pharmcube.com")}</li>
<li>Scrip (Citeline). "Kintor's Male Hair Loss Drug Returns With Phase III Win." 2026. ${ext(S.kx826Citeline, "citeline.com")}</li>
<li>ClinicalTrials.gov. "To Evaluate Efficacy and Safety of Topical KX-826 Solution in Chinese Male Patients With Androgenetic Alopecia." NCT06622824. ${ext(S.kx826Ct, "clinicaltrials.gov")}</li>
<li>ClinicalTrials.gov. "To Evaluate Safety and Efficacy of KX-826 in Chinese Female Subjects With Androgenetic Alopecia." NCT06409650. ${ext(S.kx826FemaleCt, "clinicaltrials.gov")}</li>
<li>Kintor Pharmaceutical. "GT20029 China Phase II Trial for AGA Reached Primary Endpoint." 2024. ${ext(S.gtKintor, "kintor.com.cn")}</li>
<li>Clinical Trials Arena. "Kintor Pharma's GT20029 Phase II trial meets primary endpoint." 2024. ${ext(S.gtArena, "clinicaltrialsarena.com")}</li>
<li>"Efficacy and safety of topical GT20029 in male patients with androgenetic alopecia: a multicenter, randomized, double-blind, placebo-controlled phase 2 study." Journal of Dermatological Treatment, 2025. ${ext(S.gtPaper, "doi:10.1080/09546634.2025.2574304")}</li>
<li>ClinicalTrials.gov. "To Evaluate the Efficacy and Safety of GT20029 Solution in the Treatment of Androgenetic Alopecia (AGA) in Chinese Adult Males." NCT06692465. ${ext(S.gtCt, "clinicaltrials.gov")}</li>
<li>Piraccini BM, et al. "Efficacy and safety of topical finasteride spray solution for male androgenetic alopecia: a phase III, randomized, controlled clinical trial." Journal of the European Academy of Dermatology and Venereology, 2022;36:286-294. ${ext(S.piraccini, "PMC9297965")}</li>
<li>Hikma and Almirall. Licensing announcement for topical finasteride (date not shown on the copy we found). ${ext(S.hikma, "hikma.com")}</li>
<li>AdisInsight (Springer). "Finasteride - Polichem." Drug profile, accessed October 2026. ${ext(S.adis, "adisinsight.springer.com")}</li>
<li>US Food and Drug Administration. "FDA alerts health care providers, compounders and consumers of potential risks associated with compounded topical finasteride products." April 22, 2025, as reproduced by Drugs.com. ${ext(S.fdaFinAlert, "drugs.com")}</li>
<li>UPI. "FDA warns unapproved hair-loss product finasteride tied to side effects." April 24, 2025. ${ext(S.upiFin, "upi.com")}</li>
<li>"Two Phase 3 Trials of Baricitinib for Alopecia Areata." New England Journal of Medicine, 2022. ${ext(S.braveAa, "doi:10.1056/NEJMoa2110343")}</li>
<li>US Food and Drug Administration. "FDA Approves First Systemic Treatment for Alopecia Areata." June 13, 2022, via BioSpace. ${ext(S.olumiant, "biospace.com")}</li>
<li>Pfizer. "FDA Approves Pfizer's LITFULO (Ritlecitinib) for Adults and Adolescents With Severe Alopecia Areata." June 23, 2023, via BioSpace. ${ext(S.litfulo, "biospace.com")}</li>
<li>Sun Pharma. "U.S. FDA Approves LEQSELVI (deuruxolitinib), an Oral JAK Inhibitor for the Treatment of Severe Alopecia Areata." July 2024, via BioSpace. ${ext(S.leqselvi, "biospace.com")}</li>
<li>King B, et al. THRIVE-AA1 phase 3 trial of deuruxolitinib in alopecia areata. Journal of the American Academy of Dermatology, 2024;91(5):880-888. ${ext(S.thriveAa1, "PubMed 39053611")}</li>
<li>Pharmacy Times. "Leqselvi from Sun Pharmaceutical Industries." January 2025. ${ext(S.ptLeqselvi, "pharmacytimes.com")}</li>
<li>National Alopecia Areata Foundation. "LEQSELVI (deuruxolitinib) FAQ." Accessed October 2026. ${ext(S.naafLeqselvi, "naaf.org")}</li>
</ol>
<p>Clascoterone (Breezula) facts are summarised from our <a href="/hair-loss/articles/breezula-clascoterone-hair-loss">Breezula guide</a>, which lists its primary sources. Provider prices are from each provider's published pricing as recorded in August 2026; confirm on the provider's site. All sources checked October 31, 2026.</p>`,
    },
  ],
};
