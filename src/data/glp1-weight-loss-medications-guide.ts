import type { Article } from "./articles";

// ───── GLP-1 weight loss medications: the complete 2026 guide (Nov 9, 2026) ─────
// Hub pillar for the medication decision itself: which drug, which form (pill
// or injection), how much weight per month, brand vs compounded, cost and
// coverage, side effects, and how to pick an online provider. It sits above
// the narrower pages (pills vs injections, Foundayo vs Wegovy pill, results,
// best tirzepatide online, the online-treatment pillar) and links out to them.
//
// Sourcing rules for this file:
//   • Trial results are taken from the FDA prescribing information (the
//     drug's own label), read in this session on Nov 9, 2026: the Wegovy
//     label covering injection and tablets (revised 12/2025), the Zepbound
//     label (revised 11/2023) and the Foundayo label on DailyMed (revised
//     7/2026). Label figures are intention-to-treat (everyone randomised), so
//     they can differ slightly from the published papers (Foundayo's top-dose
//     result is 11.1% in the label; the NEJM ATTAIN-1 paper is often quoted at
//     11.2%). SURMOUNT-5, the STEP 1 extension and Wegovy HD are reused from
//     existing repo articles with their original links (checked Nov 5 and
//     Oct 31, 2026); PubMed and NEJM were not readable from this environment.
//   • Regulatory facts: FDA press announcements and FDA compounding pages,
//     CMS and Medicare.gov for the GLP-1 Bridge, NIDDK for eligibility and
//     general guidance. Each is dated in the sentence or in the map below.
//   • Provider facts come only from the repo's stored data (config-store
//     reviews, provider-audit, products.json). Prices come only from the
//     verified price index (PRICE_INDEX_VERIFIED 2026-11-03) or the provider
//     audit (PROVIDER_DATA_CHECKED September 2026) and carry that date.
//     No Trustpilot or Reddit content, no operator survey percentages.
//   • No dosing instructions. Labelled maintenance doses are named only to
//     explain what search terms like "Wegovy 25 mg" mean.
//   • The per-month figures are plain arithmetic on the label averages
//     (weeks x 12 / 52 = months) and say so on the page.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  // FDA labels (read Nov 9, 2026)
  wegovyLabel: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/218316Orig1s000lbl.pdf", // Wegovy injection + tablets, revised 12/2025
  wegovyLabel2021: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/215256s000lbl.pdf", // first weight-management label, revised 06/2021
  zepboundLabel: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/217806s000lbl.pdf", // revised 11/2023
  foundayoLabel: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8ac446c5-feba-474f-a103-23facb9b5c62", // revised 7/2026
  // FDA announcements and policy pages (read Nov 9, 2026)
  fdaFoundayo: "https://www.fda.gov/news-events/press-announcements/fda-approves-first-new-molecular-entity-under-national-priority-voucher-program", // Apr 1, 2026
  fdaZepbound: "https://www.fda.gov/news-events/press-announcements/fda-approves-new-medication-chronic-weight-management", // Nov 8, 2023
  fdaConcerns: "https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss", // content current Oct 1, 2026
  fdaClarifies: "https://www.fda.gov/drugs/drug-alerts-and-statements/fda-clarifies-policies-compounders-national-glp-1-supply-begins-stabilize", // entries Oct 2024 - Apr 1, 2026
  fdaCompoundingQA: "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
  // NIH (last reviewed June 2024)
  niddk: "https://www.niddk.nih.gov/health-information/weight-management/prescription-medications-treat-overweight-obesity",
  // Medicare GLP-1 Bridge (CMS page last modified Jul 13, 2026)
  cmsBridge: "https://www.cms.gov/medicare/coverage/prescription-drug-coverage/medicare-glp-1-bridge",
  medicareWeightLoss: "https://www.medicare.gov/coverage/weight-loss-drugs",
  // Reused from existing repo articles, original links kept
  surmount5: "https://www.nejm.org/doi/full/10.1056/NEJMoa2416394", // NEJM 2025; via glp1-weight-loss-results (checked Nov 5, 2026)
  step1ext: "https://doi.org/10.1111/dom.14725", // Diabetes Obes Metab 2022; via glp1-weight-loss-results
  novoWegovyHD: "https://www.novonordisk-us.com/media/press-releases/fda-approves-wegovy-hd-7-2mg-injection.html", // Mar 19, 2026; via next-generation-weight-loss-drugs
  healioWegovyHD: "https://www.healio.com/news/endocrinology/20260319/fda-approves-highdose-wegovy-72-mg-for-adults-with-obesity",
};

export const glp1WeightLossMedicationsGuideArticle: Article = {
  slug: "glp1-weight-loss-medications-guide",
  title: "GLP-1 Weight Loss Medications 2026: Every Option Compared",
  description:
    "Every GLP-1 weight loss medication compared: Wegovy, Zepbound, Foundayo and the Wegovy pill, pills vs injections, loss per month, brand vs compounded, cost.",
  category: "Guide",
  readTime: "54 min read",
  publishedAt: "2026-11-09",
  updatedAt: "2026-11-09",
  heroColor: "#EEF2F7",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "Four FDA-approved GLP-1 options lead weight-loss treatment in 2026: Wegovy injection (semaglutide), Zepbound (tirzepatide), the Wegovy pill (oral semaglutide 25 mg) and Foundayo (orforglipron), a daily pill approved on April 1, 2026.",
    "In their FDA labels, average weight loss among adults without diabetes was 20.9% on Zepbound 15 mg (72 weeks), 14.9% on Wegovy injection (68 weeks), 13.6% on the Wegovy pill (64 weeks) and 11.1% on Foundayo's top dose (72 weeks). These are separate trials, not head to head.",
    "Spread evenly, those results work out to roughly 0.7% to 1.3% of body weight a month, but most of the loss comes in the first six months and individual results vary widely.",
    "Compounded semaglutide and tirzepatide are not FDA-approved: the FDA does not review them for safety, effectiveness or quality. A licensed clinician decides which medication, if any, is right for you.",
  ],
  sections: [
    {
      heading: "What are the GLP-1 weight loss medications in 2026?",
      body: `<div class="qa"><strong>The short answer</strong>In 2026 there are four main GLP-1 options for weight loss approved by the FDA: the weekly Wegovy injection (semaglutide), the weekly Zepbound injection (tirzepatide), the daily Wegovy pill (oral semaglutide) and the daily Foundayo pill (orforglipron). Zepbound produced the largest average weight loss in its trials, the injections generally edge out the pills, and the pills trade a little effectiveness for no needles. Alongside them, licensed pharmacies make compounded semaglutide and tirzepatide, which cost far less but are not FDA-approved. Every option needs a prescription from a licensed clinician.</div>
<p>Two years ago this guide would have been short: two weekly injections, both expensive, and a lot of compounded copies filling the gap while the brands were in shortage. In 2026 the choice is wider and more confusing. There are now two prescription GLP-1 pills, a higher-dose version of Wegovy, a Medicare program that charges a flat $50 a month for some of these drugs, and dozens of telehealth companies selling compounded injections at prices that change monthly.</p>
<p>This guide is the hub for all of it. It explains what each medication is, how well each one works according to its FDA label, how pills compare with injections, how much weight people actually lose per month, what "compounded" really means, what each route costs and how to choose an online provider. Where a topic deserves more depth, we link to the narrower guide that covers it in full.</p>
<p>Two things to keep in mind as you read. First, Treatments Hub is a comparison site, not a medical provider: nothing here is a recommendation for you personally, and a licensed clinician makes the prescribing decision. Second, every trial number below is an average across hundreds or thousands of people. Your own result could be higher or lower, and that is normal.</p>
<h3>The options at a glance</h3>
<table><thead><tr><th>Medication</th><th>Active ingredient</th><th>Form</th><th>FDA status for weight</th></tr></thead><tbody>
<tr><td>Wegovy injection</td><td>Semaglutide</td><td>Once-weekly injection</td><td>Approved (first label June 2021)</td></tr>
<tr><td>Zepbound</td><td>Tirzepatide</td><td>Once-weekly injection</td><td>Approved November 8, 2023</td></tr>
<tr><td>Wegovy pill</td><td>Semaglutide</td><td>Once-daily tablet</td><td>Approved (added to the Wegovy label December 2025)</td></tr>
<tr><td>Foundayo</td><td>Orforglipron</td><td>Once-daily tablet</td><td>Approved April 1, 2026</td></tr>
<tr><td>Compounded semaglutide or tirzepatide</td><td>Semaglutide or tirzepatide</td><td>Usually a weekly injection from a vial</td><td>Not FDA-approved</td></tr>
</tbody></table>`,
    },
    {
      heading: "What do the key GLP-1 terms mean?",
      body: `<p>A handful of terms come up again and again in this guide and on every provider's website. Here is what each one means in plain English.</p>
<ul>
<li><strong>GLP-1 (glucagon-like peptide-1).</strong> A hormone your gut releases after you eat. It tells the brain you are full, slows how fast the stomach empties and helps control blood sugar. A <strong>GLP-1 receptor agonist</strong> is a medicine that switches on the same receptor, more strongly and for longer than the natural hormone.</li>
<li><strong>GIP (glucose-dependent insulinotropic polypeptide).</strong> A second gut hormone. Tirzepatide acts on both the GIP and GLP-1 receptors, which is why it is often called a "dual agonist" or "GLP-1 + GIP" medication.</li>
<li><strong>Semaglutide.</strong> The active ingredient in Wegovy (injection and pill), Ozempic and Rybelsus, made by Novo Nordisk. Ozempic and Rybelsus are approved for type 2 diabetes; Wegovy is approved for weight management.</li>
<li><strong>Tirzepatide.</strong> The active ingredient in Zepbound (weight management) and Mounjaro (type 2 diabetes), made by Eli Lilly.</li>
<li><strong>Orforglipron.</strong> The active ingredient in Foundayo, made by Eli Lilly. It is a small-molecule (non-peptide) GLP-1 receptor agonist taken as a daily tablet.</li>
<li><strong>Brand-name (FDA-approved) medication.</strong> A finished product the FDA has reviewed for safety, effectiveness and manufacturing quality, sold under a brand name with an official label.</li>
<li><strong>Compounded medication.</strong> A version prepared by a licensed pharmacy from the raw active ingredient. Compounded drugs are legal in defined circumstances but are not FDA-approved, which means the FDA does not review them for safety, effectiveness or quality before they are sold.</li>
<li><strong>503A and 503B pharmacies.</strong> The two sections of federal law that cover compounding. A 503A pharmacy compounds for individual patients on a prescription and is overseen mainly by its state board of pharmacy. A 503B "outsourcing facility" is registered with and inspected by the FDA and must follow manufacturing-grade quality standards.</li>
<li><strong>Titration.</strong> Starting at a low dose and stepping it up gradually so the stomach can adjust. Every GLP-1 in this guide is titrated, which is why results build over months.</li>
<li><strong>Maintenance dose.</strong> The dose you stay on once titration is finished. For example, the Wegovy pill's labelled maintenance dose is 25 mg a day.</li>
<li><strong>Intention-to-treat result.</strong> A trial average that counts everyone who was randomised, including people who stopped the drug early. It is usually a little lower than the "on-treatment" figure some companies quote, which counts only people who kept taking it. This guide uses the intention-to-treat figures from each FDA label unless it says otherwise.</li>
</ul>
<p>For a deeper look at the biology, our explainer on <a href="/weight-loss/articles/how-glp1-medications-work">how GLP-1 medications work</a> goes step by step.</p>`,
    },
    {
      heading: "How do GLP-1 medications cause weight loss?",
      body: `<p>GLP-1 medications mainly work by reducing appetite and helping you feel full on less food, so you eat less without relying on willpower alone. They are not fat burners and they do not "melt" fat; the weight comes off because you take in fewer calories over a long period.</p>
<p>The FDA's ${ext(S.fdaZepbound, "November 2023 Zepbound approval announcement")} describes the mechanism in one line: tirzepatide activates receptors for two hormones secreted from the intestine, GLP-1 and GIP, "to reduce appetite and food intake." Semaglutide and orforglipron act on the GLP-1 receptor alone. All three also slow how quickly food leaves the stomach, which is part of why fullness lasts longer and part of why nausea is the most common side effect.</p>
<p>Many people describe a quieter relationship with food: fewer intrusive thoughts about snacks, smaller portions feeling like enough, and less pull toward the second helping. That is the effect the trials measured indirectly through weight.</p>
<h3>Why the medication is paired with diet and activity</h3>
<p>Every FDA approval in this guide is for use "in combination with a reduced-calorie diet and increased physical activity." That is not a formality. The National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK) says ${ext(S.niddk, "medications don't replace physical activity or healthy eating habits")} and that weight management medications work best when combined with a lifestyle program. In the trials, the placebo groups received the same diet and exercise counseling as the medication groups, so the gap between the two is the effect of the drug on top of lifestyle changes.</p>
<h3>Why it is a long-term treatment</h3>
<p>Obesity is treated as a chronic disease, and these medications work while you take them. NIDDK notes that you will ${ext(S.niddk, "probably regain some weight")} after stopping a weight management medication, and the labels are written for long-term use. We cover what happens when people stop later in this guide.</p>`,
    },
    {
      heading: "Which GLP-1 medications are FDA-approved for weight loss?",
      body: `<p>Four GLP-1 products are FDA-approved for chronic weight management in adults in 2026: Wegovy injection, Wegovy tablets (the "Wegovy pill"), Zepbound and Foundayo. Saxenda (liraglutide), an older daily injection, is also approved but is rarely the first choice now that weekly options exist.</p>
<table><thead><tr><th>Product</th><th>Maker</th><th>How often</th><th>Approved for weight management</th><th>What the label also covers</th></tr></thead><tbody>
<tr><td>Wegovy injection (semaglutide)</td><td>Novo Nordisk</td><td>Once weekly</td><td>June 2021, per the ${ext(S.wegovyLabel2021, "first weight-management label")}</td><td>Reducing cardiovascular risk in adults with heart disease and obesity or overweight; adolescents 12 and older; a liver condition called MASH</td></tr>
<tr><td>Wegovy tablets (semaglutide 25 mg)</td><td>Novo Nordisk</td><td>Once daily</td><td>Added to the ${ext(S.wegovyLabel, "Wegovy label")} in December 2025</td><td>Reducing cardiovascular risk in adults with heart disease and obesity or overweight</td></tr>
<tr><td>Zepbound (tirzepatide)</td><td>Eli Lilly</td><td>Once weekly</td><td>November 8, 2023, per the ${ext(S.fdaZepbound, "FDA")}</td><td>Tirzepatide is also sold as Mounjaro for type 2 diabetes</td></tr>
<tr><td>Foundayo (orforglipron)</td><td>Eli Lilly</td><td>Once daily</td><td>April 1, 2026, per the ${ext(S.fdaFoundayo, "FDA")}</td><td>Chronic weight management in adults</td></tr>
</tbody></table>
<h3>What makes each one distinct</h3>
<p><strong>Wegovy injection</strong> is the longest-established of the four for weight loss and the one with the broadest label. Its ${ext(S.wegovyLabel, "prescribing information")} includes a cardiovascular indication based on a trial of 17,604 adults with established heart disease, which we cover in the section on benefits beyond weight loss.</p>
<p><strong>Zepbound</strong> is the only one of the four that acts on two hormone receptors, GLP-1 and GIP. It produced the largest average weight loss of the approved options in its trials.</p>
<p><strong>The Wegovy pill</strong> is the same molecule as the Wegovy injection in tablet form. Because semaglutide is a peptide that the gut absorbs poorly, the tablet carries a much larger dose than the injection and comes with strict instructions in the label about taking it on an empty stomach.</p>
<p><strong>Foundayo</strong> is a different kind of molecule: a small-molecule GLP-1 receptor agonist that the ${ext(S.fdaFoundayo, "FDA's April 1, 2026 announcement")} describes as a pill "which does not need to be taken on an empty stomach." The FDA approved it 50 days after filing under its Commissioner's National Priority Voucher pilot program, which the agency called the fastest approval of a new molecular entity since 2002.</p>
<p>If you want a medication-by-medication deep dive, see <a href="/weight-loss/articles/zepbound-vs-wegovy">Zepbound vs Wegovy</a>, <a href="/weight-loss/articles/tirzepatide-vs-semaglutide">tirzepatide vs semaglutide</a> and our guide to <a href="/weight-loss/weight-loss-pills">prescription weight loss pills</a>, which also covers older non-GLP-1 pills such as Qsymia and Contrave.</p>`,
    },
    {
      heading: "Who qualifies for a GLP-1 weight loss medication?",
      body: `<p>In general, adults qualify for an FDA-approved GLP-1 weight loss medication if they have a body mass index (BMI) of 30 or more, or a BMI of 27 or more plus at least one weight-related health condition such as high blood pressure, type 2 diabetes or high cholesterol. A clinician still has to review your full history before prescribing.</p>
<p>Those thresholds appear in the ${ext(S.fdaZepbound, "FDA's Zepbound approval")} and in NIDDK's guidance on ${ext(S.niddk, "prescription medications for overweight and obesity")}, which says a health care professional may prescribe a weight management medication to an adult with a BMI of 30 or greater, or 27 or greater with weight-related health problems. The Wegovy and Foundayo labels use the same structure: obesity, or overweight with at least one weight-related comorbid condition.</p>
<h3>Who is usually not a candidate</h3>
<p>The labels set out the main reasons a prescriber will say no. All four GLP-1 medications carry a boxed warning about thyroid C-cell tumors seen in rodents and must not be used by anyone with a personal or family history of medullary thyroid carcinoma or Multiple Endocrine Neoplasia syndrome type 2 (MEN 2). NIDDK adds that you should ${ext(S.niddk, "never take weight management medications during pregnancy")} or if you are planning a pregnancy. History of pancreatitis, severe gastrointestinal disease such as severe gastroparesis, and some other conditions also need careful review.</p>
<h3>What the online intake asks</h3>
<p>Telehealth providers ask for your height and weight, your medical history, the medications you take and often a photo ID. That questionnaire is the basis for the clinician's decision, so honest, complete answers matter more than anything else you do at sign-up. Our <a href="/weight-loss/glp1-bmi-calculator">BMI and GLP-1 eligibility check</a> uses the same label criteria, and <a href="/weight-loss/articles/who-qualifies-for-glp1-weight-loss">who qualifies for GLP-1 weight loss</a> goes through the edge cases.</p>
<p>Medicare has its own, stricter criteria for its $50 GLP-1 Bridge program, covered in the cost section below.</p>`,
    },
    {
      heading: "Which GLP-1 medication causes the most weight loss?",
      body: `<p>On the published evidence, Zepbound (tirzepatide) causes the most weight loss of the approved GLP-1 medications: 20.9% average weight loss at the top 15 mg dose over 72 weeks in its main trial, against 3.1% on placebo, according to the ${ext(S.zepboundLabel, "Zepbound label")}. Wegovy injection comes next, then the Wegovy pill, then Foundayo.</p>
<table><thead><tr><th>Medication (top labelled dose)</th><th>Trial length</th><th>Average weight loss</th><th>Placebo</th><th>Source</th></tr></thead><tbody>
<tr><td>Zepbound 15 mg weekly</td><td>72 weeks</td><td><strong>20.9%</strong> (15.0% at 5 mg, 19.5% at 10 mg)</td><td>3.1%</td><td>${ext(S.zepboundLabel, "Zepbound label")}</td></tr>
<tr><td>Wegovy injection 2.4 mg weekly</td><td>68 weeks</td><td><strong>14.9%</strong></td><td>2.4%</td><td>${ext(S.wegovyLabel, "Wegovy label")}, Study 2 (STEP 1)</td></tr>
<tr><td>Wegovy pill 25 mg daily</td><td>64 weeks</td><td><strong>13.6%</strong></td><td>2.4%</td><td>${ext(S.wegovyLabel, "Wegovy label")}, Study 7 (OASIS 4)</td></tr>
<tr><td>Foundayo top dose daily</td><td>72 weeks</td><td><strong>11.1%</strong></td><td>2.1%</td><td>${ext(S.foundayoLabel, "Foundayo label")}, Trial 1 (ATTAIN-1)</td></tr>
</tbody></table>
<p>All four rows are intention-to-treat results in adults with obesity, or overweight with a weight-related condition, who did not have type 2 diabetes. That makes them the fairest numbers to line up, but they still come from four separate trials with different lengths and populations. A difference of a point or two between rows should not be over-read.</p>
<h3>The one head-to-head trial</h3>
<p>Only one large trial has compared two of these drugs directly. In ${ext(S.surmount5, "SURMOUNT-5")} (published in the New England Journal of Medicine in 2025), 751 adults with obesity and without diabetes took the highest dose of tirzepatide or semaglutide injection they could tolerate for 72 weeks. Average weight loss was 20.2% with tirzepatide and 13.7% with semaglutide. The trial was open label and run by tirzepatide's maker, so it is strong but not final evidence.</p>
<h3>Why "most effective" is not the same as "best for you"</h3>
<p>The most effective drug on average is not automatically the right one. Side effects, other health conditions, whether you can face a weekly injection, insurance coverage and cost all matter, and some people respond better to one molecule than another. A clinician weighs those together. For more on the numbers, our <a href="/weight-loss/articles/glp1-weight-loss-results">GLP-1 weight loss results guide</a> breaks down every main trial, and <a href="/weight-loss/glp1-weight-loss-statistics">our statistics page</a> sets them next to current prices.</p>`,
    },
    {
      heading: "Are weight loss pills as effective as injections?",
      body: `<p>Not quite, on average. In their FDA labels, the weekly injections produced more weight loss than the daily pills: 20.9% for Zepbound and 14.9% for Wegovy injection, against 13.6% for the Wegovy pill and 11.1% for Foundayo. The Wegovy pill comes close to the Wegovy injection, while Foundayo trails both injections. In exchange, the pills need no needles and no refrigeration.</p>
<table><thead><tr><th>&nbsp;</th><th>GLP-1 injections (Wegovy, Zepbound)</th><th>GLP-1 pills (Wegovy pill, Foundayo)</th></tr></thead><tbody>
<tr><td>Average weight loss in label trials</td><td>14.9% (Wegovy, 68 weeks) to 20.9% (Zepbound 15 mg, 72 weeks)</td><td>11.1% (Foundayo, 72 weeks) to 13.6% (Wegovy pill, 64 weeks)</td></tr>
<tr><td>How often</td><td>Once a week</td><td>Once a day</td></tr>
<tr><td>Routine</td><td>A short injection under the skin, any time of day on the same day each week (Wegovy label)</td><td>Wegovy pill: empty stomach, a small amount of water, wait 30 minutes. Foundayo: with or without food</td></tr>
<tr><td>Storage</td><td>Pens are kept refrigerated before use</td><td>Tablets kept at room temperature, per both labels</td></tr>
<tr><td>Missed-dose impact</td><td>One weekly dose to remember</td><td>Seven daily doses to remember; Wegovy pill absorption depends on the timing rule</td></tr>
<tr><td>Side effects</td><td>Mostly gastrointestinal, mostly during dose increases</td><td>Same family of side effects</td></tr>
<tr><td>Compounded versions</td><td>Widely sold as compounded injections (not FDA-approved)</td><td>No FDA-approved compounded equivalent</td></tr>
</tbody></table>
<h3>How big is the gap in practice?</h3>
<p>For someone who starts at 250 pounds, the label averages work out to roughly 52 pounds on Zepbound 15 mg, 37 pounds on Wegovy injection, 34 pounds on the Wegovy pill and 28 pounds on Foundayo. That is arithmetic on trial averages, not a forecast, and individual results spread widely around every one of those numbers. Still, it shows the shape of the choice: the Wegovy pill and injection are a few pounds apart on average; Zepbound is in a different bracket.</p>
<h3>Who might reasonably choose a pill anyway</h3>
<p>A pill can be the better fit for someone who will not or cannot inject, who travels often and does not want to carry cold pens, or whose insurance or Medicare plan covers a pill on better terms. A medication you take consistently will do more than a stronger one you stop after two months. Our dedicated comparison of <a href="/weight-loss/glp1-pills-vs-injections">GLP-1 pills vs injections</a> covers routine, cost and switching in more depth.</p>`,
    },
    {
      heading: "Foundayo vs Wegovy pill: which works better for weight loss?",
      body: `<p>On the label figures, the Wegovy pill produced more weight loss than Foundayo: 13.6% on average over 64 weeks versus 11.1% at Foundayo's top dose over 72 weeks, in adults without diabetes. Foundayo's advantage is its routine: it can be taken with or without food, while the Wegovy pill must be taken on an empty stomach with a 30-minute wait. The two were never tested against each other directly.</p>
<table><thead><tr><th>Outcome (adults without diabetes)</th><th>Wegovy pill 25 mg (OASIS 4, 64 weeks)</th><th>Foundayo top dose (ATTAIN-1, 72 weeks)</th></tr></thead><tbody>
<tr><td>People in the trial</td><td>307</td><td>3,127</td></tr>
<tr><td>Average weight change</td><td><strong>-13.6%</strong> (placebo -2.4%)</td><td><strong>-11.1%</strong> (placebo -2.1%)</td></tr>
<tr><td>Lost at least 5%</td><td>76.3% (placebo 31.3%)</td><td>71.5% (placebo 26.8%)</td></tr>
<tr><td>Lost at least 10%</td><td>59.8% (placebo 14.4%)</td><td>54.5% (placebo 13.0%)</td></tr>
<tr><td>Lost at least 15%</td><td>47.0% (placebo 5.5%)</td><td>35.9% (placebo 6.0%)</td></tr>
<tr><td>Lost at least 20%</td><td>27.9% (placebo 3.1%)</td><td>18.4% (placebo 2.9%)</td></tr>
<tr><td>How it is taken (per label)</td><td>Morning, empty stomach, up to 4 ounces of water, then wait at least 30 minutes before eating</td><td>Once daily, with or without food</td></tr>
<tr><td>Maker and approval</td><td>Novo Nordisk, December 2025</td><td>Eli Lilly, April 1, 2026</td></tr>
</tbody></table>
<p>Sources: the ${ext(S.wegovyLabel, "Wegovy prescribing information")} (Table 10, Study 7) and the ${ext(S.foundayoLabel, "Foundayo prescribing information")} (Table 6, Trial 1), both intention-to-treat. The Foundayo label notes that its trials used an investigational formulation, with results shown at the equivalent approved doses.</p>
<h3>How to read the gap</h3>
<p>The Wegovy pill's lead is clearest at the high end: nearly half of the people on it lost 15% or more, against about a third on Foundayo. At the 5% mark, the level usually described as clinically meaningful, the two are much closer. The trials also differ in size (307 people versus 3,127) and length (64 versus 72 weeks), so the comparison is indicative, not exact.</p>
<h3>Why the routine matters so much</h3>
<p>The Wegovy pill only works as well as the trial if it is absorbed, and the label's empty-stomach rule exists because absorption drops otherwise. Someone who takes thyroid medication or other tablets first thing, or who cannot wait half an hour for coffee, may find Foundayo's "any time, with or without food" routine easier to keep up every day for years. The label for the Wegovy pill also notes that it may affect the absorption of other oral medicines. Those are questions to raise with the prescriber.</p>
<p>Our full <a href="/weight-loss/articles/foundayo-vs-wegovy-pill">Foundayo vs Wegovy pill comparison</a> covers cost, coverage and switching, and <a href="/weight-loss/articles/wegovy-pill-price-online">Wegovy pill price online</a> covers the semaglutide side.</p>`,
    },
    {
      heading: "Wegovy 25 mg vs Foundayo: what do the doses mean?",
      body: `<p>"Wegovy 25 mg" means the Wegovy pill at its labelled maintenance dose: one 25 mg semaglutide tablet a day. It is not comparable milligram for milligram with Foundayo, which is a different molecule with its own dose strengths, or with the Wegovy injection, whose usual maintenance dose is 2.4 mg once a week. The fair comparison is each drug at the dose used for its main trial result.</p>
<p>Search engines see a lot of confusion here, so it is worth laying out what each number refers to. These are the labelled doses named in the prescribing information; they are not instructions, and the dose you take, and how quickly it is increased, is set by your prescriber.</p>
<table><thead><tr><th>Number you might see</th><th>What it refers to</th><th>Source</th></tr></thead><tbody>
<tr><td>25 mg</td><td>The Wegovy pill's maintenance dose, once daily. Tablets also come in 1.5 mg, 4 mg and 9 mg for the step-up</td><td>${ext(S.wegovyLabel, "Wegovy label")}</td></tr>
<tr><td>2.4 mg</td><td>The usual maintenance dose of the Wegovy injection, once weekly</td><td>${ext(S.wegovyLabel, "Wegovy label")}</td></tr>
<tr><td>7.2 mg</td><td>Wegovy HD, a higher-dose weekly injection approved on March 19, 2026 for adults already on 2.4 mg for at least four weeks</td><td>${ext(S.novoWegovyHD, "Novo Nordisk")}, ${ext(S.healioWegovyHD, "Healio")}</td></tr>
<tr><td>5 mg, 10 mg, 15 mg</td><td>Zepbound's target weekly doses; 15 mg is the maximum</td><td>${ext(S.fdaZepbound, "FDA, Nov 8, 2023")}</td></tr>
<tr><td>17.2 mg</td><td>The highest Foundayo dose in the label, reached in steps; the 11.1% result is at this dose</td><td>${ext(S.fdaFoundayo, "FDA, Apr 1, 2026")}, ${ext(S.foundayoLabel, "Foundayo label")}</td></tr>
</tbody></table>
<h3>Why the pill dose is so much higher than the injection dose</h3>
<p>Semaglutide is a peptide, a chain of amino acids, and most of a swallowed peptide is broken down before it can be absorbed. To get enough into the bloodstream, the Wegovy tablet carries far more semaglutide than the weekly injection. That is also why the label's empty-stomach rule matters: food, other drinks and other tablets reduce how much is absorbed.</p>
<h3>Why Foundayo's numbers look different again</h3>
<p>Foundayo is a small molecule, not a peptide, so its milligram strengths cannot be lined up against semaglutide's at all. You may also see 6 mg, 12 mg and 36 mg quoted in older coverage of the ATTAIN-1 trial; the ${ext(S.foundayoLabel, "Foundayo label")} explains that the trials used an investigational formulation and presents the results at the equivalent doses of the approved tablets. The label figures are the ones to use.</p>
<p>So when people compare "Wegovy 25 mg vs Foundayo," the meaningful pairing is the Wegovy pill at 25 mg against Foundayo at its top dose: 13.6% against 11.1% average weight loss in their own trials. Our <a href="/weight-loss/glp1-dose-schedule">dose schedule timeline</a> shows how the labelled step-ups for Wegovy and Zepbound map onto a calendar.</p>`,
    },
    {
      heading: "Do Foundayo and the Wegovy pill work for adults without diabetes?",
      body: `<p>Yes. The main trials behind both pills enrolled adults with obesity, or overweight with a weight-related condition, and excluded people with type 2 diabetes. So the headline results, 13.6% for the Wegovy pill and 11.1% for Foundayo, are results in adults without diabetes.</p>
<p>The ${ext(S.wegovyLabel, "Wegovy label")} describes the Wegovy pill's weight trial (Study 7, known as OASIS 4) as a 64-week trial of 307 patients in which "patients with type 2 diabetes mellitus were excluded." The ${ext(S.foundayoLabel, "Foundayo label")} describes Trial 1 (ATTAIN-1) as a 72-week trial of 3,127 adults in which "patients with type 2 diabetes were excluded."</p>
<h3>What changes with type 2 diabetes</h3>
<p>Average weight loss is lower in people with type 2 diabetes for every GLP-1 studied, which is why a diabetes trial result should never be set against a non-diabetes one. The labels show the pattern clearly:</p>
<table><thead><tr><th>Medication</th><th>Without diabetes</th><th>With type 2 diabetes</th></tr></thead><tbody>
<tr><td>Zepbound 15 mg (72 weeks)</td><td>20.9% (placebo 3.1%)</td><td>14.7% (placebo 3.2%)</td></tr>
<tr><td>Wegovy injection 2.4 mg (68 weeks)</td><td>14.9% (placebo 2.4%)</td><td>9.6% (placebo 3.4%)</td></tr>
<tr><td>Foundayo top dose (72 weeks)</td><td>11.1% (placebo 2.1%)</td><td>9.6% (placebo 2.5%)</td></tr>
<tr><td>Wegovy pill 25 mg</td><td>13.6% (placebo 2.4%)</td><td>No diabetes weight trial in the label we read</td></tr>
</tbody></table>
<p>Sources: ${ext(S.zepboundLabel, "Zepbound label")}, ${ext(S.wegovyLabel, "Wegovy label")} and ${ext(S.foundayoLabel, "Foundayo label")}, intention-to-treat figures. Note that Foundayo's gap between the two groups is smaller than the injections', so in people with diabetes its result sits closer to the others.</p>
<h3>A safety point for people with diabetes</h3>
<p>The labels warn that combining a GLP-1 with insulin or a sulfonylurea raises the risk of low blood sugar, and the prescriber may need to lower those other medicines. In Foundayo's diabetes trial, low blood sugar was reported in 7% of people also taking a sulfonylurea, against 0.5% of those who were not, per the label. This is exactly the kind of detail an honest intake form lets the clinician catch.</p>`,
    },
    {
      heading: "How much weight do people lose per month on GLP-1 medications?",
      body: `<p>Spread evenly across their trials, the approved GLP-1 medications produced roughly 0.7% to 1.3% of body weight loss per month on average: about 1.3% a month on Zepbound 15 mg, about 0.95% on Wegovy injection, about 0.9% on the Wegovy pill and about 0.7% on Foundayo's top dose. For someone starting at 200 pounds, that is roughly 1.3 to 2.5 pounds a month. The real pattern is faster early and slower later.</p>
<table><thead><tr><th>Medication</th><th>Label result</th><th>Trial length</th><th>Average per month (%)</th><th>Per month from 200 lb</th><th>Per month from 250 lb</th></tr></thead><tbody>
<tr><td>Zepbound 15 mg</td><td>20.9%</td><td>72 weeks (~16.6 months)</td><td>~1.3%</td><td>~2.5 lb</td><td>~3.1 lb</td></tr>
<tr><td>Zepbound 5 mg</td><td>15.0%</td><td>72 weeks</td><td>~0.9%</td><td>~1.8 lb</td><td>~2.3 lb</td></tr>
<tr><td>Wegovy injection 2.4 mg</td><td>14.9%</td><td>68 weeks (~15.7 months)</td><td>~0.95%</td><td>~1.9 lb</td><td>~2.4 lb</td></tr>
<tr><td>Wegovy pill 25 mg</td><td>13.6%</td><td>64 weeks (~14.8 months)</td><td>~0.9%</td><td>~1.8 lb</td><td>~2.3 lb</td></tr>
<tr><td>Foundayo top dose</td><td>11.1%</td><td>72 weeks</td><td>~0.7%</td><td>~1.3 lb</td><td>~1.7 lb</td></tr>
<tr><td>Placebo with the same diet and exercise counseling</td><td>2.1% to 3.1%</td><td>64 to 72 weeks</td><td>~0.15%</td><td>~0.3 lb</td><td>~0.4 lb</td></tr>
</tbody></table>
<p>How we calculated this: we took each label's average result and divided it by the trial length in months (weeks x 12 / 52). It is our arithmetic on published averages, not a figure any trial reported, and it is not a target or a prediction for any individual.</p>
<h3>Why the monthly average is misleading on its own</h3>
<p>The loss is not spread evenly. Every one of these medications starts at a low dose that is raised over weeks or months, so the first month or two usually show modest change. NIDDK notes that ${ext(S.niddk, "most weight loss takes place within the first 6 months")} of starting a weight management medication, and the curves in the trials flatten toward the end. So the middle months tend to run above the average, and the later months below it.</p>
<h3>What "normal" looks like</h3>
<p>Results vary widely. In the Wegovy injection trial, 83.5% of people lost at least 5% of their weight, which also means roughly one in six did not, per the ${ext(S.wegovyLabel, "label")}. Water weight, constipation, the menstrual cycle and the dose step you are on all move the scale from week to week. A month with little change, especially during titration, is not a sign that the medication has failed.</p>
<p>For a fuller breakdown, including pounds tables, see <a href="/weight-loss/articles/glp1-weight-loss-results">how much weight people lose on GLP-1s</a> and <a href="/weight-loss/articles/first-month-weight-loss-medication">what to expect in your first month</a>.</p>`,
    },
    {
      heading: "How soon do GLP-1 medications start working, and when should you judge them?",
      body: `<p>Many people notice less appetite within the first few weeks, but measurable weight loss builds over months as the dose is increased. A common checkpoint, set out by NIDDK, is 12 weeks on the full dose: if you have not lost at least 5% of your starting weight by then, your clinician will probably suggest stopping or changing the plan.</p>
<p>NIDDK's guidance says that ${ext(S.niddk, "if you do not lose at least 5% of your starting weight after 12 weeks on the full dose")} of your medication, your health care professional will probably advise you to stop taking it, and may change the treatment plan, try a different medication or adjust other medicines that might be causing weight gain. Note the wording: 12 weeks on the full dose, not 12 weeks from your first injection or tablet.</p>
<h3>How long the step-up takes</h3>
<ul>
<li><strong>Wegovy injection:</strong> the label starts at 0.25 mg once weekly for four weeks and steps up every four weeks to the maintenance dose.</li>
<li><strong>Wegovy pill:</strong> the label starts at 1.5 mg once daily for 30 days, then steps up every 30 days to the 25 mg maintenance dose.</li>
<li><strong>Zepbound:</strong> the FDA says the dose is increased over four to 20 weeks to reach the target dose.</li>
<li><strong>Foundayo:</strong> the FDA describes a starting dose increased after at least 30 days at each level, based on response and tolerability.</li>
</ul>
<p>These are summaries of the published labels to explain the timeline, not dosing advice. Your prescriber may move more slowly, especially if side effects are hard going, and a slower step-up is common and sensible.</p>
<h3>What to keep track of</h3>
<p>The scale alone is a noisy measure in the early months. Keeping a simple weekly record makes check-ins with your clinician far more useful:</p>
<ul>
<li>your weight once a week, at the same time of day, rather than daily;</li>
<li>a waist measurement every few weeks, which can move when the scale stalls;</li>
<li>side effects, when they happen relative to your dose day, and what eased them;</li>
<li>how much you are eating and drinking, especially protein and fluids;</li>
<li>the dose you are on and the date it last changed.</li>
</ul>
<p>Bring that record to every follow-up. It helps the prescriber decide whether to hold, raise or slow the dose, and it makes the 12-week judgment an informed one rather than a guess.</p>
<h3>Practical expectations</h3>
<p>Think of the first two to four months as the adjustment phase, when tolerability matters as much as the scale. The trial results were measured at 64 to 72 weeks, more than a year in. Our guide to <a href="/weight-loss/articles/how-long-for-semaglutide-to-work">how long semaglutide takes to work</a> walks through the weeks one by one, and <a href="/weight-loss/glp1-dose-schedule">the dose schedule timeline</a> plots the labelled steps.</p>`,
    },
    {
      heading: "What is the difference between brand-name and compounded GLP-1s?",
      body: `<p>Brand-name GLP-1s such as Wegovy and Zepbound are finished products the FDA has reviewed and approved. Compounded semaglutide and tirzepatide are prepared by licensed pharmacies from the raw ingredient and are not FDA-approved, which means the FDA does not check their safety, effectiveness or quality before they are sold. Compounded versions usually cost a fraction of the brand price.</p>
<table><thead><tr><th>&nbsp;</th><th>Brand-name (Wegovy, Zepbound, Wegovy pill, Foundayo)</th><th>Compounded semaglutide or tirzepatide</th></tr></thead><tbody>
<tr><td>FDA approval</td><td>Yes. Reviewed for safety, effectiveness and manufacturing quality</td><td>No. The FDA says it ${ext(S.fdaCompoundingQA, "does not verify the safety, effectiveness or quality")} of compounded drugs before they are marketed</td></tr>
<tr><td>Clinical trials</td><td>Large randomised trials behind every label result</td><td>No trials of the compounded products themselves</td></tr>
<tr><td>Who makes it</td><td>The manufacturer (Novo Nordisk, Eli Lilly)</td><td>A state-licensed 503A pharmacy or an FDA-registered 503B outsourcing facility</td></tr>
<tr><td>Form</td><td>Prefilled pens or tablets</td><td>Usually multi-dose vials with syringes; you measure each dose</td></tr>
<tr><td>Typical self-pay cost</td><td>Brand list prices run to four figures a month at cash prices (see our cost section)</td><td>From $41 to $199 a month for semaglutide at the providers in our price index (checked Nov 3, 2026)</td></tr>
<tr><td>Insurance and Medicare</td><td>Can be covered; Medicare's GLP-1 Bridge covers some brands at $50</td><td>Generally self-pay</td></tr>
</tbody></table>
<h3>Is compounded the "same drug"?</h3>
<p>Compounded semaglutide and tirzepatide use the same active molecule as the brands, but they are not the same product. The FDA's own consumer guidance lists, as a ${ext(S.fdaConcerns, "telehealth red flag")}, a company that "makes claims such as the compounded drug is the same as an FDA-approved drug." The honest way to put it is: same active ingredient, different product, no FDA approval, and no trial results of its own. The trial figures in this guide come from brand-name medication and cannot be assumed for any compounded product.</p>
<h3>Why so many people still choose compounded</h3>
<p>Cost is the main reason. Without insurance, the gap between a compounded injection and a brand-name pen can be more than a thousand dollars a month at the brand shelf prices we track. For many people, the realistic choice is not compounded versus brand; it is compounded versus no treatment. That is a decision to make with eyes open, using a provider that works with licensed pharmacies and a clinician who stays involved.</p>
<p>Our full guide to <a href="/weight-loss/articles/compounded-semaglutide-vs-brand-name">compounded vs brand-name semaglutide</a> goes deeper, and <a href="/weight-loss/articles/503a-vs-503b-pharmacy-28-day-rule">503A vs 503B pharmacies</a> explains the two kinds of compounder.</p>`,
    },
    {
      heading: "Is compounded semaglutide or tirzepatide legal and safe in 2026?",
      body: `<p>Compounding semaglutide and tirzepatide remains legal in specific circumstances, mainly by a licensed 503A pharmacy filling an individual prescription, but the rules are tighter than during the shortages. Compounded versions are not FDA-approved, and the FDA has documented quality and dosing concerns. Using one safely depends heavily on the pharmacy and the prescriber.</p>
<h3>What changed when the shortages ended</h3>
<p>During the shortages, compounders could make copies of the brand drugs more freely. The FDA then ${ext(S.fdaClarifies, "declared the tirzepatide injection shortage resolved")} on December 19, 2024 (after re-evaluating an October 2, 2024 decision) and the semaglutide injection shortage resolved on February 21, 2025, with grace periods for compounders that ended in early-to-mid 2025.</p>
<p>In an update dated April 1, 2026, the FDA reminded compounders that a 503A pharmacy must compound for an individual patient based on a prescription and must not compound, regularly or in inordinate amounts, products that are "essentially copies" of a commercially available drug, unless a prescriber documents a change that makes a significant difference for that patient. The same update says tirzepatide and semaglutide "do not currently appear on the 503B bulks list or on FDA's drug shortage list," which restricts outsourcing facilities. It also gives an example: adding vitamin B12 to semaglutide may still be treated as essentially a copy if the strengths match the commercial products.</p>
<h3>The safety concerns the FDA lists</h3>
<p>The FDA's page on ${ext(S.fdaConcerns, "concerns with unapproved GLP-1 drugs")} (content current as of October 1, 2026) sets out what it has seen:</p>
<ul>
<li><strong>Dosing errors.</strong> Reports of adverse events, some requiring hospitalization, linked to patients or clinicians measuring the wrong dose from multi-dose vials, and to doses beyond those in the approved labels.</li>
<li><strong>Salt forms.</strong> Some compounded semaglutide has used semaglutide sodium or acetate, which the FDA says are different active ingredients with no known lawful basis for compounding.</li>
<li><strong>Fraudulent products.</strong> Products labeled with pharmacies that do not exist, or with real pharmacies that did not make them.</li>
<li><strong>Shipping temperature.</strong> Complaints about injectable GLP-1s arriving warm; the FDA advises not using any that arrive without adequate refrigeration.</li>
<li><strong>Multi-dose vials.</strong> The FDA recommends discarding a vial 28 days after first use, even if medication remains.</li>
<li><strong>Adverse event reports.</strong> As of May 31, 2026, the FDA had received 990 reports of adverse events associated with compounded semaglutide and more than 730 with compounded tirzepatide, and it notes these are likely underreported because 503A pharmacies are not required to submit them.</li>
</ul>
<h3>What not to buy at all</h3>
<p>The FDA states that retatrutide and cagrilintide cannot be used in compounding under federal law, and it has warned companies selling semaglutide, tirzepatide, retatrutide and other GLP-1 drugs labeled "for research purposes" or "not for human consumption." Those products are not compounded medicine and should be avoided.</p>
<p>The providers we review work with licensed US pharmacies and require a clinician's prescription. Even so, a compounded product is not an FDA-approved one, and that limit applies to every provider in this guide.</p>`,
    },
    {
      heading: "Which is better: a GLP-1 pill, a brand injection or a compounded injection?",
      body: `<p>It depends on what matters most to you. If the largest average weight loss is the priority, a brand-name injection (especially tirzepatide) has the strongest evidence. If needles are the barrier, an FDA-approved pill is the option. If cost is the deciding factor and you are paying cash, compounded injections are far cheaper but carry the limits of a non-approved product. Your clinician weighs your health history on top of that.</p>
<table><thead><tr><th>If your priority is...</th><th>The option that usually fits</th><th>The trade-off</th></tr></thead><tbody>
<tr><td>The most weight loss on average</td><td>Zepbound (tirzepatide) injection</td><td>Brand price without coverage; weekly injection</td></tr>
<tr><td>An FDA-approved drug with heart-risk data</td><td>Wegovy (injection or pill), which carries a cardiovascular indication in its label</td><td>Brand price without coverage</td></tr>
<tr><td>No needles</td><td>The Wegovy pill or Foundayo</td><td>Somewhat lower average results; daily dosing</td></tr>
<tr><td>No needles and no timing rules</td><td>Foundayo</td><td>The lowest average result of the four approved options</td></tr>
<tr><td>Medicare and eligible for the Bridge</td><td>Wegovy (injection or pill), Zepbound KwikPen or Foundayo at $50 a month</td><td>Strict eligibility and prior authorization</td></tr>
<tr><td>Commercial insurance that covers weight-loss drugs</td><td>Whichever brand your plan covers</td><td>Prior authorization, step therapy, formulary changes</td></tr>
<tr><td>Lowest monthly cost, paying cash</td><td>Compounded semaglutide or tirzepatide from a licensed provider</td><td>Not FDA-approved; no product-specific trials</td></tr>
</tbody></table>
<p>None of these is a rule. Someone with diabetes, kidney problems, a history of pancreatitis or gallbladder disease, or who is planning a pregnancy may be steered in a different direction entirely. The point of the table is to help you walk into the consultation knowing which questions to ask.</p>
<p>If you are weighing the molecules themselves, <a href="/weight-loss/articles/tirzepatide-vs-semaglutide">tirzepatide vs semaglutide</a> compares them in depth, and our <a href="/weight-loss/semaglutide">semaglutide providers</a> and <a href="/weight-loss/tirzepatide">tirzepatide providers</a> pages compare who sells each.</p>`,
    },
    {
      heading: "What do GLP-1 medications cost, and does insurance or Medicare cover them?",
      body: `<p>Costs range from about $41 a month for compounded semaglutide on a 12-month plan to more than $1,500 a month for brand-name Wegovy at cash prices, at the providers we track. Commercial insurance coverage for weight-loss GLP-1s varies by plan, and since July 1, 2026, eligible Medicare Part D members can get certain brand-name GLP-1s for a flat $50 a month through the Medicare GLP-1 Bridge.</p>
<h3>Self-pay prices at the providers we track</h3>
<p>Prices change often, so we keep them in a verified price index rather than in articles. As of our last check on November 3, 2026, compounded semaglutide started at $41 a month (welludr, pre-Black Friday sale on a 12-month plan), $49 (embody, sale price, month to month), $89 (altRx, starting price) and $99 (Eden, flat at every dose), and compounded tirzepatide at $71 (welludr, sale), $99 (embody, sale), $129 (Eden) and $149 (altRx, starting price). Each of those figures comes with a condition, which the <a href="/weight-loss/glp1-price-changes">GLP-1 price tracker</a> lists in full.</p>
<p>For brand-name medication bought through a telehealth provider, the shelf prices in our provider audit (checked September 2026) include Ozempic at $1,149, Zepbound at $1,249 and Wegovy at $1,579 a month at altRx, and the Wegovy pill at Ro at $149 for the first month, then $299 a month, plus Ro's membership ($39 the first month, then $74 to $149 a month). Ro bills the medication separately from the membership, so insurance can apply where a plan covers it.</p>
<h3>Commercial insurance</h3>
<p>NIDDK puts it simply: ${ext(S.niddk, "some, but not all, insurance plans cover")} medications that treat overweight and obesity, so contact your insurer to check. Plans often require prior authorization and proof of BMI and conditions, and some employers are narrowing coverage for 2027. Our guides to <a href="/weight-loss/articles/glp1-with-insurance">GLP-1s with insurance</a> and <a href="/weight-loss/articles/glp1-coverage-2027-employers-dropping">employers dropping GLP-1 coverage in 2027</a> walk through the checks.</p>
<h3>Medicare: the GLP-1 Bridge</h3>
<p>The ${ext(S.cmsBridge, "Medicare GLP-1 Bridge")} is a short-term CMS demonstration running from July 1, 2026 through December 31, 2027, with a $50 copay for eligible Part D beneficiaries (CMS page last modified July 13, 2026). The copay sits outside the normal Part D benefit, so it does not count toward the deductible or out-of-pocket limit. According to ${ext(S.medicareWeightLoss, "Medicare.gov")}, the program covers Foundayo, Wegovy (injection or tablet) and Zepbound (KwikPen only).</p>
<p>Eligibility is stricter than the FDA label. You must be 18 or older and, when you start therapy, have a BMI of 35 or higher; or a BMI of 30 or higher with heart failure with preserved ejection fraction, uncontrolled high blood pressure or chronic kidney disease stage 3a or higher; or a BMI of 27 or higher with prediabetes, a previous heart attack or stroke, or symptomatic peripheral artery disease. People who already get GLP-1s through their Part D plan, or who have type 2 diabetes, moderate-to-severe sleep apnea or fatty liver disease, are not eligible for the Bridge, though their Part D plan might cover a GLP-1. Your provider must certify that you are using the drug as part of a lifestyle program and complete prior authorization. Our <a href="/weight-loss/articles/glp1-after-65-medicare">guide to GLP-1s after 65</a> covers what to ask.</p>
<h3>Budgeting honestly</h3>
<p>The first-month price is rarely the price you pay for a year. Promotions end, doses rise and some plans need a commitment. Before you pay, run the numbers in our <a href="/weight-loss/glp1-cost-calculator">GLP-1 cost calculator</a> and read <a href="/weight-loss/articles/before-you-prepay-glp1">five refund questions to ask before you prepay</a>.</p>`,
    },
    {
      heading: "How do you choose an online GLP-1 provider?",
      body: `<p>Choose an online GLP-1 provider on five things, in this order: a real medical review by a licensed clinician, a licensed US pharmacy, clear all-in pricing with the conditions spelled out, reachable support between refills, and shipping that suits you. Price matters, but it is the last tiebreaker, not the first filter.</p>
<h3>The checks that matter most</h3>
<ol>
<li><strong>A clinician who can say no.</strong> The intake should ask about your history, medications and contraindications, and a licensed physician, physician assistant or nurse practitioner should review it. The FDA lists a company that ${ext(S.fdaConcerns, "does not require a screening and prescription by a licensed doctor")} as a red flag.</li>
<li><strong>A named, licensed pharmacy.</strong> You should be able to find out which state-licensed pharmacy fills your prescription. Certification such as LegitScript is a useful extra signal.</li>
<li><strong>Pricing you can predict.</strong> Look for the price at your likely maintenance dose, whether it is the same at every dose, whether the headline needs a 3- or 12-month commitment, and what happens when a sale ends.</li>
<li><strong>Support after the first box.</strong> Side effects and dose questions come up in the first months. Check how you reach a clinician or nurse and how fast they answer.</li>
<li><strong>Shipping and cold chain.</strong> Injectables should arrive cold. Delivery times in our data range from 1-2 days to 5-7 days.</li>
<li><strong>Cancellation and refunds.</strong> Month-to-month plans are easier to leave; a full refund if you are not approved is a good sign.</li>
</ol>
<h3>Questions to ask before you pay</h3>
<ul>
<li>Is the price the same at every dose, or does it rise as the dose goes up?</li>
<li>Is the headline price a promotion, and what is the price after it ends?</li>
<li>Does the lowest price need a 3-, 6- or 12-month plan, and is that billed upfront?</li>
<li>Which pharmacy fills the prescription, and is it state-licensed?</li>
<li>Who reviews my intake, and how do I reach a clinician if I have side effects?</li>
<li>What happens to my money if I am not approved, or if I need to stop?</li>
</ul>
<p>Our 12-point checklist in <a href="/weight-loss/how-to-choose-a-glp1-provider">how to choose a GLP-1 provider</a> expands each check, <a href="/weight-loss/glp1-provider-support">our support comparison</a> and <a href="/weight-loss/glp1-shipping-times">shipping times guide</a> compare the practical side, and <a href="/weight-loss/articles/how-to-start-glp1-treatment-online">how to start GLP-1 treatment online</a> shows the intake step by step. If you would rather answer a few questions and get a shortlist, try <a href="/weight-loss/find-your-match">Find Your Match</a>.</p>
<p>We rank providers using the method described in <a href="/weight-loss/how-we-rank">how we rank</a>. Our three highest-ranked online GLP-1 providers are below.</p>`,
    },
    {
      heading: "How do the top online GLP-1 providers compare?",
      body: `<p>The leading online GLP-1 providers differ less on the medication itself, which for most of them is compounded semaglutide and tirzepatide, and more on plan structure, brand-name options, support and shipping speed. In our current ranking, embody is first, Eden second and altRx third, followed by welludr (formerly wellmedr), Ro and TrimRx.</p>
<table><thead><tr><th>Provider (our rank)</th><th>Medications offered</th><th>Plan structure</th><th>Clinical support</th><th>Shipping</th></tr></thead><tbody>
<tr><td><a href="/weight-loss/reviews/embody">embody</a> (#1)</td><td>Compounded semaglutide and tirzepatide injections</td><td>Flat monthly pricing, month to month, cancel anytime; full refund if not approved</td><td>Licensed doctors; review usually within 24 hours; dedicated nursing team and 1:1 medical support</td><td>Free 1-2 day, temperature-controlled, tracked and insured</td></tr>
<tr><td><a href="/weight-loss/reviews/eden">Eden</a> (#2)</td><td>Compounded semaglutide and tirzepatide injections</td><td>One flat price every month and at every dose; no membership, no annual or long-term plan</td><td>Doctor-guided care with 24/7 human support</td><td>Not published on the pricing page we captured; confirm at checkout</td></tr>
<tr><td><a href="/weight-loss/reviews/altrx">altRx</a> (#3)</td><td>Compounded semaglutide and tirzepatide, plus brand-name Zepbound, Wegovy and Ozempic</td><td>Same price at every dose; pause or cancel anytime; Buy Now, Pay Later</td><td>Clinician-guided: physician, PA or nurse practitioner</td><td>Free, about 5-7 days</td></tr>
<tr><td><a href="/weight-loss/reviews/wellmedr">welludr</a> (#4)</td><td>Compounded semaglutide and tirzepatide, plus brand-name Ozempic and Zepbound</td><td>Same price regardless of dose; lowest rate on a 12-month plan</td><td>Board-certified specialists and a Medical Weight-Care Coach; weight-loss warranty</td><td>3-5 business days</td></tr>
<tr><td><a href="/weight-loss/reviews/ro">Ro</a> (#5)</td><td>Brand-name GLP-1s including the Wegovy pill, plus compounded semaglutide</td><td>Membership plus medication billed separately; no long-term contracts</td><td>Board-certified provider consultations; ongoing dose adjustments</td><td>Integrated in-house pharmacy with home delivery</td></tr>
<tr><td><a href="/weight-loss/reviews/trimrx">TrimRx</a> (#6)</td><td>Compounded semaglutide and tirzepatide</td><td>No long-term contract; month to month</td><td>Custom dosing with unlimited provider check-ins</td><td>Free tracked delivery, often next-day</td></tr>
</tbody></table>
<p>All facts in this table come from our provider reviews and the verified price index (checked November 3, 2026). We deliberately left prices out of it: they move often, and the other columns tell you more about what living with a provider is like. Current prices are in the <a href="/weight-loss/glp1-price-changes">price tracker</a>.</p>
<h3>What the table tells you</h3>
<p><strong>If you want medication fast,</strong> embody's 1-2 day cold shipping and TrimRx's often-next-day delivery stand out. <strong>If you want one number that never changes,</strong> Eden's flat price at every dose with no plan to sign is the simplest structure we track. <strong>If you might want brand-name medication,</strong> altRx, welludr and Ro all offer it alongside or instead of compounded options. <strong>If you want more human contact,</strong> Eden's 24/7 human support, embody's nursing team, welludr's coach and TrimRx's unlimited check-ins are each built for that.</p>
<p>For a wider table with more providers, see our <a href="/weight-loss/glp1-provider-comparison">GLP-1 provider comparison</a> or the full <a href="/weight-loss/reviews">reviews index</a>.</p>`,
    },
    {
      heading: "What are embody, Eden and altRx each best for?",
      body: `<p>embody is best for people who want a simple, low-friction start with fast shipping and no commitment; Eden is best for people who want one flat price at every dose and reachable human support; altRx is best for people who want low starting prices and the option of brand-name medication on the same platform. All three prescribe through licensed clinicians, and none of them is a substitute for your own clinician's judgment.</p>
<h3>embody (ranked #1)</h3>
<p><a href="/weight-loss/reviews/embody">embody</a> offers doctor-prescribed compounded semaglutide and tirzepatide through a fully online process. Getting started takes a roughly five-minute health qualifier, after which a medical practitioner reviews your chart, usually within 24 hours according to embody. Medication ships free in 1-2 days in temperature-controlled, tracked and insured packaging, with same-day dispatch on orders placed before 2pm Central. embody is LegitScript-certified and works with US-based 503A compounding pharmacies, there are no insurance requirements or clinic visits, plans are month to month, and embody offers a full refund if a provider does not approve treatment. A dedicated nursing team provides 1:1 medical support.</p>
<p><strong>Best for:</strong> people who want affordable, doctor-prescribed treatment, a fully online process, fast shipping and simple flat pricing. <strong>Keep in mind:</strong> it is compounded-only and injectable-only, and it is a medication-first service without a formal coaching or dietitian layer. Read <a href="/weight-loss/articles/is-embody-legit">is embody legit?</a>, <a href="/weight-loss/articles/embody-cost">embody cost</a> and our <a href="/weight-loss/articles/embody-tirzepatide-review">embody tirzepatide review</a> for more.</p>
<h3>Eden (ranked #2)</h3>
<p><a href="/weight-loss/reviews/eden">Eden</a> sells compounded semaglutide and tirzepatide at one all-inclusive monthly price that stays the same in month one, month two and every month after, at every dose. There is no membership, no annual plan and no long-term commitment. Clinical care is doctor-guided, with 24/7 human support, the medication is made in the US, and sign-up is a free assessment of about three minutes with no insurance needed.</p>
<p><strong>Best for:</strong> people who want a single number they can budget on without committing to a plan, who value reachable human support, and tirzepatide buyers who want a flat, no-commitment price. <strong>Keep in mind:</strong> Eden is compounded-only, does not describe a formal coaching layer, and its shipping speed was not stated on the pricing page we captured, so confirm it at checkout. Compare it directly in <a href="/weight-loss/eden-vs-embody">Eden vs embody</a> and <a href="/weight-loss/altrx-vs-eden">altRx vs Eden</a>.</p>
<h3>altRx (ranked #3)</h3>
<p><a href="/weight-loss/reviews/altrx">altRx</a> runs a self-pay program with compounded semaglutide and tirzepatide priced the same at every dose, so the price does not climb as the dose rises. It is also one of the few providers in our ranking with a genuine brand-name shelf: Zepbound, Wegovy and Ozempic. A licensed provider (physician, PA or nurse practitioner) reviews a short assessment, prescriptions go to a licensed US pharmacy, and shipping is free. Buy Now, Pay Later is available, you can pause or cancel anytime, and everything is included: vials, syringes, prep pads and guidance.</p>
<p><strong>Best for:</strong> people who want some of the most affordable GLP-1 access, anyone who wants the option of brand-name Zepbound or Wegovy, and people who prefer flexible payment. <strong>Keep in mind:</strong> shipping takes about 5-7 days, slower than the 1-2 day providers, and options are injectable only. If you have been searching for altRx reviews, our <a href="/weight-loss/articles/is-altrx-legit">is altRx legit?</a> and <a href="/weight-loss/articles/altrx-cost">altRx cost</a> guides, plus <a href="/weight-loss/altrx-vs-embody">altRx vs embody</a>, cover the details.</p>`,
    },
    {
      heading: "How do welludr (wellmedr), Ro and TrimRx compare?",
      body: `<p>welludr (formerly wellmedr) is built around the lowest ongoing compounded prices on a 12-month plan plus a coach; Ro is an established telehealth brand with an in-house pharmacy and brand-name options including the Wegovy pill; TrimRx focuses on custom dosing with unlimited provider check-ins. Each is a credible option with a different strength.</p>
<h3>welludr, formerly wellmedr (ranked #4)</h3>
<p><a href="/weight-loss/reviews/wellmedr">welludr</a> offers compounded semaglutide and tirzepatide shipped every four weeks at the same price whatever your dose, plus brand-name Ozempic and Zepbound. Board-certified specialists tailor the plan, treatment is fully online, a Medical Weight-Care Coach is included on every plan, and the program is backed by a weight-loss warranty. welludr says its GLP-1 medications have been used by more than 1,000,000 patients. Its lowest price is tied to a 12-month plan, standard delivery takes about 3-5 business days, and it ships within the US only. See <a href="/weight-loss/articles/is-wellmedr-legit">is welludr legit?</a>, <a href="/weight-loss/articles/wellmedr-cost">welludr cost</a> and <a href="/weight-loss/embody-vs-wellmedr">embody vs welludr</a>.</p>
<h3>Ro (ranked #5)</h3>
<p><a href="/weight-loss/reviews/ro">Ro</a> is an established telehealth company whose weight program offers board-certified provider consultations, multiple GLP-1 options including brand-name medication, an integrated in-house pharmacy with home delivery, ongoing care and dose adjustments, and no long-term contracts. Some plans may be FSA/HSA eligible. Because Ro bills the medication separately from its membership, it is one of the routes where insurance can apply for brand-name drugs, and it sells the Wegovy pill. On the other side, wait times can vary at peak periods and the service is not available in every state. If you are searching "Ro weight loss," our <a href="/weight-loss/articles/is-ro-legit">is Ro legit?</a> and <a href="/weight-loss/articles/ro-cost">Ro cost</a> guides go deeper, and <a href="/weight-loss/embody-vs-ro">embody vs Ro</a> compares the two models.</p>
<h3>TrimRx (ranked #6)</h3>
<p><a href="/weight-loss/reviews/trimrx">TrimRx</a> is built around custom dosing set by your provider rather than a fixed protocol, with unlimited provider check-ins, a free consultation and free tracked delivery that often arrives the next day. There is no long-term contract, and its compounded medication is US-made. Its prices sit above the entry tier at welludr, embody and altRx, and it is compounded-only. If you are looking at <a href="/weight-loss/articles/trimrx-alternatives">TrimRx alternatives</a>, the providers above are the natural comparison: embody and Eden for flat pricing, altRx for brand-name options.</p>
<h3>How to decide between all six</h3>
<p>Start with the column that matters most to you in the comparison table above, then read the full review for your top two. If you are still unsure, the head-to-head pages (<a href="/weight-loss/eden-vs-embody">Eden vs embody</a>, <a href="/weight-loss/altrx-vs-embody">altRx vs embody</a>, <a href="/weight-loss/embody-vs-wellmedr">embody vs welludr</a>) set two providers side by side on every category we score.</p>`,
    },
    {
      heading: "Where can you find the best prices for tirzepatide?",
      body: `<p>The lowest compounded tirzepatide prices in our verified index (checked November 3, 2026) were $71 a month at welludr (pre-Black Friday sale), $99 at embody (sale price, month to month), $129 at Eden (flat at every dose) and from $149 at altRx. Brand-name Zepbound costs far more without insurance. Each low price has a condition attached, so compare the terms, not just the number.</p>
<table><thead><tr><th>Provider</th><th>Compounded tirzepatide (per month)</th><th>The condition</th><th>Commitment</th></tr></thead><tbody>
<tr><td><a href="/weight-loss/reviews/wellmedr">welludr</a></td><td>$71</td><td>Pre-Black Friday sale shown on Nov 3, 2026; shipped every 4 weeks; previously $89</td><td>12-month plan for the lowest rate</td></tr>
<tr><td><a href="/weight-loss/reviews/embody">embody</a></td><td>$99</td><td>Sale price, flat month to month</td><td>None; cancel anytime</td></tr>
<tr><td><a href="/weight-loss/reviews/eden">Eden</a></td><td>$129</td><td>Flat every month and at every dose</td><td>None; no membership or long-term plan</td></tr>
<tr><td><a href="/weight-loss/reviews/altrx">altRx</a></td><td>from $149</td><td>Starting price</td><td>None; pause or cancel anytime</td></tr>
</tbody></table>
<p>Source: our <a href="/weight-loss/glp1-price-changes">verified GLP-1 price index</a>, checked against each provider's own site on November 3, 2026. Sale prices can end at short notice.</p>
<h3>Cheapest is not the only question</h3>
<p>The cheapest tirzepatide is only a bargain if it suits you. Three things change the real cost: whether the price is the same at higher doses (tirzepatide is usually stepped up over months), whether it requires a long plan paid upfront or in installments, and what the price becomes when a promotion ends. A flat, no-commitment price can cost less over a year than a lower teaser rate.</p>
<p>Remember too that these are compounded products, not Zepbound: same active ingredient, no FDA approval and no product-specific trial. For brand-name Zepbound, insurance or the Medicare Bridge (KwikPen only) usually changes the math more than any cash discount.</p>
<p>For the full list of providers and their conditions, see <a href="/weight-loss/articles/best-tirzepatide-online">best tirzepatide online</a>, <a href="/weight-loss/cheapest-glp1">the cheapest GLP-1 programs</a> and our <a href="/weight-loss/articles/zepbound-price-online">Zepbound price guide</a>.</p>`,
    },
    {
      heading: "Are altRx, embody and welludr the same company?",
      body: `<p>No. altRx, embody and welludr (formerly wellmedr) are separate companies with different operating entities, prices and plan terms. They can feel alike because each names the same telehealth clinician network, OpenLoop, in its own published documents, and none of them is a pharmacy: prescriptions are filled by independent, state-licensed pharmacies. The practical differences for you are the ones in the comparison table: shipping speed, plan structure, brand-name options and the kind of support each offers.</p>
<p>A shared clinician network is a common, legitimate telehealth structure. Most online GLP-1 brands do not employ their own doctors or run their own pharmacies; they contract with a licensed clinician network and with licensed pharmacies, and several of the best-known brands contract with the same network.</p>
<p>We looked into this question in detail in <a href="/weight-loss/articles/are-altrx-embody-welludr-same-company">are altRx, embody and welludr the same company?</a>, which covers who runs each provider, who prescribes, whether the medication changes if you switch between them and whether a shared clinician network is a concern.</p>
<p>For choosing between them, the short version from our reviews is:</p>
<ul>
<li><strong>embody</strong> for month-to-month flexibility and the fastest shipping of the three (1-2 days).</li>
<li><strong>altRx</strong> for low starting prices that stay the same at every dose, flexible payment and a brand-name shelf.</li>
<li><strong>welludr</strong> for the lowest ongoing price if you are comfortable with a 12-month plan, plus an included coach and a weight-loss warranty.</li>
</ul>
<p>Whichever you choose, a licensed clinician reviews your intake and decides whether to prescribe. If you are considering moving from one to another, tell the new provider exactly what you were taking and at what dose, so the prescriber can plan the switch safely.</p>`,
    },
    {
      heading: "What are the common side effects of GLP-1 medications, and how do they compare?",
      body: `<p>The most common side effects of every GLP-1 in this guide are gastrointestinal: nausea, diarrhea, vomiting and constipation. They are usually mild to moderate, happen most often while the dose is being increased and tend to ease over time. Rates in the labels are broadly similar across the four approved drugs.</p>
<table><thead><tr><th>Side effect (label trials)</th><th>Wegovy injection 2.4 mg</th><th>Zepbound 15 mg</th><th>Foundayo top dose</th></tr></thead><tbody>
<tr><td>Nausea</td><td>44% (placebo 16%)</td><td>28% (placebo 8%)</td><td>35% (placebo 10%)</td></tr>
<tr><td>Diarrhea</td><td>30% (placebo 16%)</td><td>23% (placebo 8%)</td><td>25% (placebo 11%)</td></tr>
<tr><td>Vomiting</td><td>24% (placebo 6%)</td><td>13% (placebo 2%)</td><td>24% (placebo 4%)</td></tr>
<tr><td>Constipation</td><td>24% (placebo 11%)</td><td>11% (placebo 5%)</td><td>24% (placebo 9%)</td></tr>
<tr><td>Any gastrointestinal reaction</td><td>73% (placebo 47%)</td><td>56% at each dose (placebo 30%)</td><td>69% (placebo 37%)</td></tr>
</tbody></table>
<p>Sources: ${ext(S.wegovyLabel, "Wegovy label")} (Table 3 and section 6.1), ${ext(S.zepboundLabel, "Zepbound label")} (Table 2) and ${ext(S.foundayoLabel, "Foundayo label")} (section 6.1). The Wegovy label says the types and frequency of common reactions with Wegovy tablets were similar to the injection's. Labels warn that rates from different trials cannot be directly compared, so treat the columns as a rough guide, not a ranking.</p>
<h3>How many people stop because of side effects</h3>
<p>In the Wegovy injection weight trials, 6.8% of people on the drug stopped because of adverse reactions, against 3.2% on placebo. With Zepbound, it was 4.8% to 6.7% depending on dose, against 3.4% on placebo, and most of those who stopped did so in the first few months because of gastrointestinal effects. With Foundayo, 6% at the top dose stopped because of gastrointestinal reactions, against 0.7% on placebo. In other words, most people get through the adjustment period.</p>
<h3>Other side effects in the labels</h3>
<p>The labels also list headache, fatigue, indigestion, belching, bloating, gas, reflux and hair loss among the common reactions. The Wegovy label notes that a skin sensitivity reaction called dysesthesia was reported in 4.9% of people taking Wegovy tablets in their trial, against none on placebo.</p>
<h3>What helps</h3>
<p>A slow step-up, smaller meals, stopping eating when you feel full, limiting greasy and very sweet foods, and drinking enough fluids are the usual practical advice, and the prescriber can pause or slow the dose increase. Our <a href="/weight-loss/articles/semaglutide-side-effects-guide">side effects guide</a> covers each one in detail, and if you drink, our guide to <a href="/weight-loss/articles/glp1-and-alcohol">GLP-1s and alcohol</a> explains where the two overlap.</p>`,
    },
    {
      heading: "What are the serious risks, and who should not take a GLP-1?",
      body: `<p>Serious problems are uncommon but real. All four approved GLP-1 medications carry a boxed warning about thyroid C-cell tumors seen in rodents and must not be used by people with a personal or family history of medullary thyroid carcinoma or MEN 2. The labels also warn about pancreatitis, gallbladder disease, kidney injury from dehydration, low blood sugar with certain diabetes drugs, and other risks.</p>
<h3>The warnings shared across the labels</h3>
<ul>
<li><strong>Thyroid C-cell tumors.</strong> Semaglutide causes these tumors in rodents; whether it does in humans is unknown, per the ${ext(S.wegovyLabel, "Wegovy boxed warning")}. Zepbound and Foundayo carry the same boxed warning and the same contraindication.</li>
<li><strong>Acute pancreatitis.</strong> Persistent, severe stomach pain, sometimes spreading to the back, needs urgent medical attention.</li>
<li><strong>Gallbladder disease.</strong> Gallstones and gallbladder inflammation occurred in the trials.</li>
<li><strong>Acute kidney injury.</strong> Mostly in people who became dehydrated from vomiting or diarrhea.</li>
<li><strong>Low blood sugar.</strong> The risk rises when a GLP-1 is combined with insulin or a sulfonylurea.</li>
<li><strong>Severe gastrointestinal reactions.</strong> Wegovy is not recommended in severe gastroparesis.</li>
<li><strong>Hypersensitivity.</strong> Rare serious allergic reactions have been reported.</li>
<li><strong>Diabetic retinopathy complications</strong> in people with type 2 diabetes, especially those with existing retinopathy.</li>
<li><strong>Pulmonary aspiration during anesthesia or deep sedation.</strong> Tell anyone doing a procedure or surgery that you take a GLP-1.</li>
<li><strong>Mood.</strong> The Wegovy label asks clinicians to monitor for depression or suicidal thoughts, and the 2023 Zepbound label carries a similar warning.</li>
</ul>
<h3>Pregnancy and planning a pregnancy</h3>
<p>The Wegovy label says the drug may cause fetal harm, should be stopped when pregnancy is recognized and, for weight reduction, should be stopped at least two months before a planned pregnancy because of semaglutide's long half-life. Breastfeeding is not recommended during treatment with Wegovy tablets. The Foundayo label also says to stop when pregnancy is recognized. If pregnancy is possible, raise it with the prescriber before you start.</p>
<h3>Not with another GLP-1</h3>
<p>The labels say these drugs should not be combined with other GLP-1 receptor agonists. That includes taking a compounded GLP-1 alongside a brand one, or two compounded products at once.</p>
<p>None of this is a reason for alarm; it is the reason a prescription exists. A clinician reads your history against these lists. If you develop severe stomach pain, signs of an allergic reaction, or symptoms of dehydration you cannot manage, seek medical care promptly.</p>`,
    },
    {
      heading: "Do GLP-1 medications have benefits beyond weight loss?",
      body: `<p>Yes, for some drugs and some people. Wegovy is approved to reduce the risk of major cardiovascular events in adults with established heart disease and obesity or overweight, based on a large trial in which it lowered that risk by about 20% against placebo. More generally, losing 5% to 10% of body weight is linked to improvements in blood sugar, blood pressure and triglycerides.</p>
<h3>The heart trial behind Wegovy's label</h3>
<p>The ${ext(S.wegovyLabel, "Wegovy prescribing information")} describes a cardiovascular outcomes trial of 17,604 adults aged 45 or older with established cardiovascular disease (a previous heart attack, stroke or peripheral arterial disease) and a BMI of 27 or more, without diabetes. Over a median follow-up of 41.8 months, Wegovy injection reduced the risk of a first major cardiovascular event (cardiovascular death, non-fatal heart attack or non-fatal stroke), with a hazard ratio of 0.80, roughly a 20% relative reduction. The label extends the cardiovascular indication to Wegovy tablets as well.</p>
<h3>Other approved uses</h3>
<p>The Wegovy injection label also covers adolescents aged 12 and older with obesity and, under accelerated approval, adults with a liver condition called MASH (metabolic dysfunction-associated steatohepatitis) with moderate to advanced fibrosis. Tirzepatide is sold as Mounjaro for type 2 diabetes.</p>
<h3>What modest weight loss does</h3>
<p>NIDDK says ${ext(S.niddk, "weight loss of 5% to 10%")} of starting body weight may improve health by lowering blood sugar, blood pressure and triglyceride levels, and can help with joint pain and sleep apnea. The FDA's ${ext(S.fdaZepbound, "Zepbound announcement")} adds that losing 5% to 10% of body weight through diet and exercise has been associated with a reduced risk of cardiovascular disease in adults with obesity or overweight. You do not need to hit the trial averages for treatment to be worthwhile.</p>
<p>A caution: the cardiovascular result applies to Wegovy in the population studied. It has not been shown for compounded semaglutide, and it is not a reason for anyone without heart disease to choose one drug over another without a clinician's input.</p>`,
    },
    {
      heading: "What happens when you stop taking a GLP-1?",
      body: `<p>Most people regain a substantial part of the weight they lost after stopping a GLP-1 medication. In the STEP 1 extension, people regained about two-thirds of the weight they had lost within a year of stopping semaglutide, and most of the improvements in blood pressure and blood sugar faded with it. That is why these medications are generally prescribed as long-term treatment.</p>
<p>The ${ext(S.step1ext, "STEP 1 extension")} (Diabetes, Obesity and Metabolism, 2022) followed people for a year after they stopped. NIDDK's general guidance agrees: you will ${ext(S.niddk, "probably regain some weight")} after you stop, and maintaining healthy eating and physical activity may help you regain less. NIDDK also says that if you have lost enough weight to improve your health and are not having serious side effects, your clinician may advise you to stay on the medication indefinitely.</p>
<h3>Why the weight comes back</h3>
<p>The medication reduces appetite while you take it; when it stops, appetite and food noise tend to return to where they were, while the body's own systems push to restore lost weight. That is biology, not a failure of willpower.</p>
<h3>Stopping because of cost or supply</h3>
<p>Plenty of people stop not because they want to, but because coverage ends or a price rises. Before you stop for those reasons, it is worth checking the alternatives: a covered brand under a new plan, Medicare's Bridge if you qualify, or a lower-cost compounded option prescribed by a licensed clinician. Our guide to <a href="/weight-loss/articles/lost-insurance-coverage-zepbound-wegovy">losing coverage for Zepbound or Wegovy</a> lists every route.</p>
<h3>If you are thinking about stopping</h3>
<ul>
<li><strong>Talk to the prescriber first.</strong> They may suggest a lower dose, a slower plan or a switch rather than stopping outright.</li>
<li><strong>Plan the habits before the medication ends.</strong> Protein, strength training and a routine that worked during treatment are your best protection.</li>
<li><strong>Know when you would restart.</strong> Agree in advance what amount of regain would prompt a conversation about going back on.</li>
</ul>
<p>Our complete guide to <a href="/weight-loss/articles/stopping-glp1-weight-regain-complete-guide">stopping GLP-1s and keeping the weight off</a> covers the trial data, tapering, maintenance doses and restarting, and <a href="/weight-loss/articles/glp1-microdosing-complete-guide">our microdosing guide</a> looks at the evidence behind low-dose maintenance claims.</p>`,
    },
    {
      heading: "Can you switch between GLP-1 medications, or from an injection to a pill?",
      body: `<p>Yes, but only with a prescriber. Switching between GLP-1 medications, or between an injection and a pill, is common, for reasons such as side effects, cost, coverage or a preference for no needles. The prescriber usually works out a new starting dose rather than converting one-to-one, because the products are dosed very differently.</p>
<h3>Common reasons people switch</h3>
<ul>
<li><strong>Cost or coverage changes.</strong> An employer drops coverage, a Medicare member becomes eligible for the Bridge, or a cash-pay price rises.</li>
<li><strong>Side effects.</strong> Some people tolerate one molecule better than another.</li>
<li><strong>A plateau.</strong> A prescriber may consider a different medication or a higher labelled dose, such as Wegovy HD for some people already on Wegovy 2.4 mg.</li>
<li><strong>Needles.</strong> Moving from a weekly injection to a daily pill.</li>
</ul>
<h3>What to know before switching</h3>
<p>The doses are not interchangeable: 2.4 mg of injectable semaglutide is not equivalent to any particular tablet strength, and a compounded vial's concentration may differ from a brand pen. The labels say GLP-1 drugs should not be combined, so a switch means stopping one and starting the other on the prescriber's schedule. Be precise with the new provider about what you took, at what dose and when your last dose was.</p>
<p>Coverage rules can also affect a switch. Medicare.gov notes that a ${ext(S.medicareWeightLoss, "Bridge prior authorization stays valid")} for refills and dose changes through December 31, 2027 "unless you change GLP-1s," so switching drugs inside the Bridge means a new authorization.</p>
<p>If you are moving from brand Ozempic or Wegovy to a compounded product to save money, our guide on <a href="/weight-loss/switch-from-ozempic">switching from Ozempic</a> covers the practical steps, and <a href="/weight-loss/articles/lost-insurance-coverage-zepbound-wegovy">lost coverage for Zepbound or Wegovy?</a> lists every route if your insurance changes.</p>`,
    },
    {
      heading: "What should you eat, and how should you exercise, on a GLP-1?",
      body: `<p>Eat smaller meals built around protein, vegetables and fiber, drink enough fluids and keep up strength training. GLP-1s make it easy to eat very little, and part of the weight lost can be muscle, so protein and resistance exercise matter more on these medications than people expect.</p>
<h3>Food</h3>
<ul>
<li><strong>Protein first.</strong> With a smaller appetite, prioritising protein at each meal helps protect muscle.</li>
<li><strong>Smaller, slower meals.</strong> Stopping at the first sign of fullness is one of the most effective ways to reduce nausea.</li>
<li><strong>Fiber and fluids.</strong> Constipation is a common side effect; vegetables, whole grains and water help.</li>
<li><strong>Go easy on greasy, fried and very sweet foods,</strong> which many people find hit harder on a GLP-1.</li>
</ul>
<h3>Activity</h3>
<p>NIDDK points to federal guidelines of ${ext(S.niddk, "at least 150 minutes a week")} of moderate-intensity aerobic activity and at least two days a week of muscle-strengthening activity, and notes that some people need more than 300 minutes a week to reach or maintain their goal. In the trials, participants were counseled toward at least 150 minutes a week of activity alongside a reduced-calorie diet.</p>
<h3>Why muscle matters</h3>
<p>Any significant weight loss includes some lean mass, and GLP-1s are no exception. Strength training two or three times a week, adequate protein and avoiding very rapid loss are the main tools for keeping as much muscle as possible.</p>
<p>Our guides go into each in depth: <a href="/weight-loss/articles/what-to-eat-on-glp1-medication">what to eat on a GLP-1</a>, <a href="/weight-loss/articles/exercise-while-on-glp1-medication">how to exercise on a GLP-1</a> and <a href="/weight-loss/articles/glp1-muscle-loss-how-to-protect-lean-mass">GLP-1 muscle loss and how to protect lean mass</a>.</p>`,
    },
    {
      heading: "What are the red flags of an unsafe online GLP-1 seller?",
      body: `<p>The biggest red flags are a seller that does not require a screening and prescription from a licensed clinician, prices that seem too good to be true, claims that a compounded drug is the same as an FDA-approved one, and products labeled "for research purposes" or "not for human consumption." The FDA publishes its own list of telehealth warning signs.</p>
<p>According to the FDA's guidance on ${ext(S.fdaConcerns, "unapproved GLP-1 drugs")} (current as of October 1, 2026), watch out if a company:</p>
<ul>
<li>makes claims such as the compounded drug is the same as an FDA-approved drug;</li>
<li>offers medicine at deep discounts or prices that seem too good to be true;</li>
<li>sends medicine that looks different from what you received before or what was pictured, or arrives in broken or damaged packaging or without instructions;</li>
<li>does not require a screening and prescription by a licensed doctor;</li>
<li>does not have a licensed doctor available to answer questions after you receive your medication;</li>
<li>makes spelling errors on the label or gives an incorrect pharmacy address;</li>
<li>uses a pharmacy name on the label that you think might be fraudulent.</li>
</ul>
<h3>Other warning signs</h3>
<p>The FDA also warns about counterfeit Ozempic in the US market, about illegal online sellers of semaglutide and tirzepatide, and about "research" products sold directly to consumers with dosing instructions. It advises buying only from state-licensed pharmacies and reporting problems to MedWatch.</p>
<h3>What a legitimate provider looks like</h3>
<p>A legitimate service asks real medical questions, has a licensed clinician review them and sometimes say no, names the licensed pharmacy that fills the prescription, ships injectables cold, and gives you a way to reach clinical staff after delivery. The providers in our ranking were selected and reviewed against those basics; our <a href="/weight-loss/articles/glp1-weight-loss-online-complete-guide">complete guide to GLP-1 weight loss online</a> explains the safety checks in more depth.</p>`,
    },
    {
      heading: "What new GLP-1 medications are coming next?",
      body: `<p>The newest approved option is Wegovy HD, a 7.2 mg weekly semaglutide injection approved on March 19, 2026 for adults who have been on the 2.4 mg dose for at least four weeks, according to ${ext(S.novoWegovyHD, "Novo Nordisk")} and ${ext(S.healioWegovyHD, "Healio")}. Several more drugs, including triple-hormone and amylin-based medicines, are in late-stage trials but are not approved.</p>
<p>2026 has already changed the landscape: Foundayo became the first small-molecule GLP-1 pill for weight, approved by the FDA on April 1, 2026, 294 days ahead of its scheduled decision date; the Wegovy pill was added to the Wegovy label in December 2025; and Medicare started covering some GLP-1s through the Bridge on July 1, 2026.</p>
<h3>In the pipeline</h3>
<p>Drugs such as retatrutide (a triple agonist), CagriSema (semaglutide plus the amylin analogue cagrilintide) and other once-weekly and monthly candidates have reported late-stage trial results, which our next-generation drugs guide links and dates. None of them is approved yet, and the FDA states plainly that retatrutide and cagrilintide ${ext(S.fdaConcerns, "cannot be used in compounding")} under federal law. Anything sold online as one of these drugs today is not a legitimate medicine.</p>
<h3>Should you wait?</h3>
<p>For most people, no. The approved medications work well, a new drug will take time to reach pharmacies and insurance formularies, and early prices for new brands are rarely low. If you are already on a GLP-1, a new drug may become an option later; your prescriber can tell you if it makes sense.</p>
<p>Our guide to <a href="/weight-loss/articles/next-generation-weight-loss-drugs">next-generation weight loss drugs</a> covers every candidate, its trial results and the expected timeline, and <a href="/weight-loss/retatrutide-weight-loss">retatrutide for weight loss</a> answers the most common questions about the triple agonist.</p>`,
    },
    {
      heading: "Which GLP-1 option fits your situation?",
      body: `<p>The best GLP-1 option for you depends on your coverage, your health history, how you feel about needles and how much you can comfortably pay every month for a long time. Here are the most common situations we see and where they usually lead, as a starting point for a conversation with a clinician.</p>
<h3>"I have commercial insurance."</h3>
<p>Check your formulary first. If your plan covers Wegovy, Zepbound, the Wegovy pill or Foundayo for weight management, the covered brand is usually the best value by far. Expect prior authorization. A provider that bills medication separately, such as <a href="/weight-loss/reviews/ro">Ro</a>, or your own doctor and pharmacy, is the route that lets coverage apply. Our <a href="/weight-loss/articles/glp1-with-insurance">insurance guide</a> explains the steps.</p>
<h3>"I am on Medicare."</h3>
<p>Ask about the GLP-1 Bridge before anything else. If you meet its BMI and condition criteria, $50 a month for an FDA-approved brand is the best price in this guide. See <a href="/weight-loss/articles/glp1-after-65-medicare">GLP-1s after 65</a>.</p>
<h3>"I am paying cash and want the most for my money."</h3>
<p>Compounded semaglutide or tirzepatide from a licensed provider is the lowest-cost route, with the limits explained above. Compare plan structure as well as price: embody for month-to-month flexibility and fast shipping, Eden for one flat price at every dose, altRx for low starting prices and a brand-name option, welludr if you are comfortable with a 12-month plan. <a href="/weight-loss/articles/what-100-to-200-a-month-gets-you-glp1">What $100 to $200 a month gets you</a> lays out the tiers.</p>
<h3>"I don't want needles."</h3>
<p>The Wegovy pill (more weight loss on average, strict morning routine) or Foundayo (no food or water timing). Read <a href="/weight-loss/articles/foundayo-vs-wegovy-pill">Foundayo vs Wegovy pill</a> and <a href="/weight-loss/glp1-pills-vs-injections">pills vs injections</a>.</p>
<h3>"I want the strongest effect."</h3>
<p>Tirzepatide has the largest average results in its trials and in the head-to-head SURMOUNT-5 trial. A clinician will weigh that against your history and tolerance.</p>
<h3>"I have heart disease."</h3>
<p>Wegovy carries a cardiovascular risk-reduction indication for adults with established heart disease and obesity or overweight. That is a strong reason to discuss it specifically with your doctor.</p>
<h3>"I'm not sure where to start."</h3>
<p>Our <a href="/weight-loss/find-your-match">Find Your Match quiz</a> asks a few questions and suggests providers, and the <a href="/weight-loss">weight loss hub</a> brings all our rankings and guides together.</p>`,
    },
    {
      heading: "How did we compare the medications and providers?",
      body: `<p>We compared the medications using their FDA prescribing information and FDA announcements, and the providers using facts verified on each provider's own website and recorded in our review data and price index. We did not use patient testimonials, forum posts or self-reported provider outcomes.</p>
<h3>Medications</h3>
<ul>
<li><strong>Effectiveness</strong> figures are the intention-to-treat results in each drug's FDA label: the Wegovy label covering injection and tablets (revised December 2025), the Zepbound label (revised November 2023) and the Foundayo label (revised July 2026). Using one type of figure from one type of source keeps the comparison as fair as separate trials allow.</li>
<li><strong>Head-to-head and stopping data</strong> come from SURMOUNT-5 and the STEP 1 extension, as published and linked.</li>
<li><strong>Per-month figures</strong> are our own arithmetic on the label averages, labeled as such.</li>
<li><strong>Regulatory and coverage facts</strong> come from the FDA, CMS, Medicare.gov and NIDDK, with dates.</li>
</ul>
<h3>Providers</h3>
<ul>
<li><strong>Ranking.</strong> The provider order (embody, Eden, altRx, welludr, Ro, TrimRx and others) follows our published methodology in <a href="/weight-loss/how-we-rank">how we rank</a>, which weighs clinical process, pharmacy standards, pricing transparency, support and shipping.</li>
<li><strong>Features</strong> come from our individual provider reviews, which record what each provider publishes about its plans, medications, clinicians and delivery.</li>
<li><strong>Prices</strong> come only from our verified price index, last checked November 3, 2026, or our provider audit (checked September 2026), with conditions attached. We kept prices secondary because they change faster than anything else on this page.</li>
</ul>
<h3>How we keep it current</h3>
<p>Medication facts change when a label is updated or the FDA acts, and provider facts change whenever a company reprices or rewrites its plans. When a price in our index changes, we log the before and after figures on the <a href="/weight-loss/glp1-price-changes">price tracker</a> with the date we verified it. When a label or policy changes, we update the guides that rely on it and change the date at the top of the page. Every external fact on this page names the date of the source it came from, so you can see how fresh it is.</p>
<h3>What we are not</h3>
<p>Treatments Hub is a comparison site written by the Treatments Hub Research Team. We are not a medical provider, we do not prescribe, and this guide has not been written or reviewed as medical advice for any individual. We may earn a commission when readers sign up with some providers; that never changes the facts we report, and the methodology page explains how rankings are set. If you spot something out of date, the provider's own site is the live source.</p>`,
    },
    {
      heading: "The bottom line",
      body: `<p>GLP-1 weight loss medications are the most effective prescription weight-loss drugs available in 2026, and the choice is wider than ever. On the FDA labels, Zepbound produced the largest average weight loss (20.9% at 15 mg over 72 weeks), followed by Wegovy injection (14.9%), the Wegovy pill (13.6%) and Foundayo (11.1%), all against about 2% to 3% on placebo. Injections still edge out pills on average; the pills trade a little effectiveness for no needles, and Foundayo trades a little more for no timing rules. Spread out, the trial averages are roughly 0.7% to 1.3% of body weight a month, with most of the loss in the first six months.</p>
<p>How you pay often decides more than which drug is strongest. Commercial coverage or Medicare's $50 Bridge can make a brand-name drug the best value; paying cash, compounded semaglutide and tirzepatide from licensed providers cost a fraction of brand prices, with the clear limit that they are not FDA-approved and have no trials of their own. Among online providers, our current ranking puts <a href="/weight-loss/reviews/embody">embody</a> first, <a href="/weight-loss/reviews/eden">Eden</a> second and <a href="/weight-loss/reviews/altrx">altRx</a> third, each with a different strength: speed and flexibility, flat pricing and human support, and low prices with a brand-name shelf.</p>
<p>Whatever route you take, the medication works best with protein, strength training and a plan for the long term, and the weight tends to return if you stop. A licensed clinician should decide whether a GLP-1 is right for you and which one. This guide is general information, not medical advice.</p>`,
    },
  ],
};
