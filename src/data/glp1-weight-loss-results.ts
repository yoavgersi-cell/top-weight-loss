import type { Article } from "./articles";

// ───── GLP-1 weight loss results (Nov 5, 2026) ─────
// Answers the "glp-1 weight loss results" / "semaglutide how much weight
// loss" cluster. Every figure is a published trial result, linked inline to
// the paper (PubMed, or the journal DOI where noted), checked Nov 5, 2026:
//   STEP 1      Wilding et al., NEJM 2021 (semaglutide 2.4 mg, 68 weeks)
//   STEP 2      Davies et al., Lancet 2021 (semaglutide 2.4 mg, type 2 diabetes)
//   STEP 4      Rubino et al., JAMA 2021 (continue vs switch to placebo)
//   STEP 1 ext. Wilding et al., Diabetes Obes Metab 2022 (one year off drug)
//   SURMOUNT-1  Jastreboff et al., NEJM 2022 (tirzepatide 5/10/15 mg, 72 weeks)
//   SURMOUNT-2  Garvey et al., Lancet 2023 (tirzepatide, type 2 diabetes)
//   SURMOUNT-5  Aronne et al., NEJM 2025 (tirzepatide vs semaglutide, open label)
// No provider outcome statistics, no before/after material, no anecdotes:
// provider-reported results are self-reported and are not repeated here.
// The pounds table is plain arithmetic on the trial averages.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  step1: "https://pubmed.ncbi.nlm.nih.gov/33567185/",
  step2: "https://pubmed.ncbi.nlm.nih.gov/33667417/",
  step4: "https://pubmed.ncbi.nlm.nih.gov/33755728/",
  step1ext: "https://doi.org/10.1111/dom.14725",
  surmount1: "https://pubmed.ncbi.nlm.nih.gov/35658024/",
  surmount2: "https://pubmed.ncbi.nlm.nih.gov/37385275/",
  surmount5: "https://www.nejm.org/doi/full/10.1056/NEJMoa2416394",
  wegovyLabel: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/215256s000lbl.pdf",
  fdaCompounding: "https://www.fda.gov/drugs/human-drug-compounding",
};

const lb = (start: number, pct: number) => Math.round((start * pct) / 100);
const poundsRows = [180, 220, 260]
  .map(
    (w) =>
      `<tr><td>${w} lb</td><td>about ${lb(w, 2.4)} lb</td><td>about ${lb(w, 14.9)} lb</td><td>about ${lb(w, 20.9)} lb</td></tr>`,
  )
  .join("\n");

export const glp1WeightLossResultsArticle: Article = {
  slug: "glp1-weight-loss-results",
  title: "GLP-1 Weight Loss Results: How Much Weight Do People Lose?",
  description:
    "How much weight people lose on semaglutide and tirzepatide, from the STEP and SURMOUNT trials: averages, pounds, who loses more, and what happens if you stop.",
  category: "Science",
  readTime: "8 min read",
  publishedAt: "2026-11-05",
  updatedAt: "2026-11-05",
  heroColor: "#EEF4FB",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "In the main trials, people on semaglutide 2.4 mg lost 14.9% of their body weight on average over 68 weeks (STEP 1), against 2.4% on placebo.",
    "Tirzepatide produced 15.0% to 20.9% average loss over 72 weeks depending on dose (SURMOUNT-1), against 3.1% on placebo.",
    "In the only head-to-head trial, SURMOUNT-5, tirzepatide averaged 20.2% and semaglutide 13.7% at 72 weeks.",
    "Results vary widely between people, are lower on average with type 2 diabetes, and most of the weight returned within a year of stopping in the STEP 1 extension.",
  ],
  sections: [
    {
      heading: "How much weight do people lose on GLP-1 medications?",
      body: `<div class="qa"><strong>The short answer</strong>In the pivotal trials, adults without diabetes lost about 15% of their body weight on average with semaglutide 2.4 mg (Wegovy's dose) over 68 weeks, and 15% to 21% with tirzepatide (Zepbound) over 72 weeks, depending on the dose. For someone starting at 220 lb, that is roughly 33 lb on semaglutide and up to about 46 lb on the top tirzepatide dose. These are averages: some people lose much more, some much less, and the loss builds over a year or more, not weeks.</div><p>The numbers on this page come from the large randomized trials that led to FDA approval, each linked to the published paper. They describe what happened to the average participant, who was also given diet and exercise counseling, under trial conditions with brand-name medication. Nothing here is a prediction for any one person; a licensed clinician is the right person to set expectations for you.</p>`,
    },
    {
      heading: "What did the main clinical trials find?",
      body: `<table><thead><tr><th>Trial</th><th>Medication and dose</th><th>Who took part</th><th>Length</th><th>Average weight loss</th></tr></thead><tbody>
<tr><td>${ext(S.step1, "STEP 1")} (NEJM, 2021)</td><td>Semaglutide 2.4 mg weekly</td><td>1,961 adults with obesity or overweight, no diabetes</td><td>68 weeks</td><td>14.9% vs 2.4% on placebo</td></tr>
<tr><td>${ext(S.surmount1, "SURMOUNT-1")} (NEJM, 2022)</td><td>Tirzepatide 5, 10 or 15 mg weekly</td><td>2,539 adults with obesity or overweight, no diabetes</td><td>72 weeks</td><td>15.0%, 19.5% and 20.9% vs 3.1% on placebo</td></tr>
<tr><td>${ext(S.step2, "STEP 2")} (Lancet, 2021)</td><td>Semaglutide 2.4 mg weekly</td><td>1,210 adults with type 2 diabetes</td><td>68 weeks</td><td>9.6% vs 3.4% on placebo</td></tr>
<tr><td>${ext(S.surmount2, "SURMOUNT-2")} (Lancet, 2023)</td><td>Tirzepatide 10 or 15 mg weekly</td><td>938 adults with type 2 diabetes</td><td>72 weeks</td><td>12.8% and 14.7% vs 3.2% on placebo</td></tr>
<tr><td>${ext(S.surmount5, "SURMOUNT-5")} (NEJM, 2025)</td><td>Tirzepatide vs semaglutide, highest tolerated dose</td><td>751 adults with obesity, no diabetes</td><td>72 weeks</td><td>20.2% (tirzepatide) vs 13.7% (semaglutide)</td></tr>
</tbody></table>
<p>The placebo groups matter: they received the same lifestyle counseling, so the gap between the medication and placebo columns is the effect of the drug itself. The tirzepatide figures above are the trials' main "treatment-regimen" results, which count everyone who was randomized, including people who stopped early. Counting only people who stayed on treatment, SURMOUNT-1 reported up to 22.5% at 15 mg, which is the figure you will often see quoted.</p>`,
    },
    {
      heading: "What share of people reach 5%, 10%, 15% or 20% weight loss?",
      body: `<p>Averages hide the spread, so the trials also report how many people crossed set thresholds. In ${ext(S.step1, "STEP 1")}, 86.4% of people on semaglutide lost at least 5% of their weight, 69.1% lost at least 10% and 50.5% lost at least 15%, against 31.5%, 12.0% and 4.9% on placebo. Put the other way, about one in seven people on semaglutide did not reach 5%.</p><p>In ${ext(S.surmount1, "SURMOUNT-1")}, about half of the people on tirzepatide 10 mg and 57% of those on 15 mg lost 20% or more, against 3% on placebo. In the head-to-head ${ext(S.surmount5, "SURMOUNT-5")} trial, 81.6% on tirzepatide and 60.5% on semaglutide lost at least 10%, and 48.4% and 27.3% lost at least 20%.</p><p>Losing 5% to 10% of body weight is the range usually described as clinically meaningful, because it is where improvements in blood pressure, blood sugar and other markers tend to show. You do not need to match the trial average for treatment to be worthwhile.</p>`,
    },
    {
      heading: "How many pounds is that?",
      body: `<p>The trial results are percentages, so the pounds depend on where you start. This table applies the trial averages to three starting weights. It is arithmetic on an average, not a forecast for anyone.</p><table><thead><tr><th>Starting weight</th><th>Placebo plus lifestyle (STEP 1, 2.4%)</th><th>Semaglutide 2.4 mg (STEP 1, 14.9%)</th><th>Tirzepatide 15 mg (SURMOUNT-1, 20.9%)</th></tr></thead><tbody>
${poundsRows}
</tbody></table><p>Check where you start with our <a href="/weight-loss/glp1-bmi-calculator">BMI and GLP-1 eligibility check</a>, which uses the same label criteria a prescriber starts from.</p>`,
    },
    {
      heading: "Does tirzepatide cause more weight loss than semaglutide?",
      body: `<p>On the published evidence, yes, on average. ${ext(S.surmount5, "SURMOUNT-5")}, the only trial so far to compare them directly, gave 751 adults the highest dose each could tolerate for 72 weeks: average weight loss was 20.2% with tirzepatide and 13.7% with semaglutide, a gap of 6.5 percentage points. The trial was open label (participants knew which drug they were on) and was run by tirzepatide's manufacturer, Eli Lilly, so it is strong evidence but not the last word.</p><p>The separate trials point the same way: about 15% for semaglutide in STEP 1 against 15% to 21% by dose for tirzepatide in SURMOUNT-1, though those were different trials in different people. More weight loss is not the only consideration. Side effects, cost and how you respond matter too; our <a href="/weight-loss/articles/tirzepatide-vs-semaglutide">tirzepatide vs semaglutide comparison</a> covers the full picture and the <a href="/weight-loss/glp1-price-changes">GLP-1 price tracker</a> has current verified prices for both.</p>`,
    },
    {
      heading: "How fast does the weight come off?",
      body: `<p>Gradually. Both medications start at a low dose that is raised step by step to limit side effects: semaglutide over 16 weeks to the 2.4 mg maintenance dose, per the ${ext(S.wegovyLabel, "Wegovy prescribing information")}, and tirzepatide over a 20-week escalation period in ${ext(S.surmount1, "SURMOUNT-1")}. The trial averages above were measured after 68 to 72 weeks, so the loss in the first month or two is much smaller.</p><p>For a month-by-month view of what usually happens, see <a href="/weight-loss/articles/how-long-for-semaglutide-to-work">how long semaglutide takes to work</a> and <a href="/weight-loss/articles/first-month-weight-loss-medication">what to expect in your first month</a>. Our <a href="/weight-loss/glp1-dose-schedule">dose schedule timeline</a> maps the labelled dose steps onto a calendar.</p>`,
    },
    {
      heading: "Why do results vary so much between people?",
      body: `<ul><li><strong>Type 2 diabetes.</strong> People with diabetes lose less on average: 9.6% on semaglutide in ${ext(S.step2, "STEP 2")} and 12.8% to 14.7% on tirzepatide in ${ext(S.surmount2, "SURMOUNT-2")}, against about 15% and up to 21% in the trials without diabetes.</li><li><strong>The dose reached.</strong> In SURMOUNT-1 the average rose from 15.0% at 5 mg to 20.9% at 15 mg. Some people stay on a lower dose because of side effects.</li><li><strong>Staying on treatment.</strong> The gap between the 20.9% and 22.5% tirzepatide figures is largely people who stopped early. Consistency over months is part of the result.</li><li><strong>Diet and activity.</strong> Every trial group, placebo included, had lifestyle counseling. The medication works alongside those changes, not instead of them; see <a href="/weight-loss/articles/what-to-eat-on-glp1-medication">what to eat on a GLP-1</a> and how to <a href="/weight-loss/articles/glp1-muscle-loss-how-to-protect-lean-mass">protect muscle while losing weight</a>.</li><li><strong>Individual biology.</strong> Even with everything else equal, response differs, which is why about one in seven people in STEP 1 lost less than 5%.</li></ul><p>If progress stalls, that is a conversation for your prescriber; our guide to <a href="/weight-loss/articles/weight-loss-plateau-what-to-do">weight-loss plateaus</a> covers the usual causes.</p>`,
    },
    {
      heading: "What happens to the weight if you stop?",
      body: `<p>For most people, much of it comes back. In ${ext(S.step4, "STEP 4")}, people who had taken semaglutide for 20 weeks were randomly switched either to placebo or to continued treatment: from week 20 to week 68, the placebo group regained 6.9% of their body weight while the continued group lost a further 7.9%. In the ${ext(S.step1ext, "STEP 1 extension")}, which followed people for a year after they stopped, participants regained about two-thirds of the weight they had lost, and most of the improvements in blood pressure and blood sugar faded with it.</p><p>That is why prescribers treat these as long-term medications. Planning for maintenance, whether that means staying on a dose, tapering under supervision or something else, is covered in our guide to <a href="/weight-loss/articles/stopping-glp1-weight-regain-complete-guide">stopping GLP-1s and keeping the weight off</a>.</p>`,
    },
    {
      heading: "Do compounded semaglutide and tirzepatide give the same results?",
      body: `<p>Nobody knows for certain, because they have not been studied in these trials. Every result on this page comes from FDA-approved, brand-name medication made by the manufacturer. Compounded versions contain the same active ingredient but are prepared by state-licensed compounding pharmacies, and compounded drugs are not FDA-approved or reviewed for safety and effectiveness, as the FDA explains on its ${ext(S.fdaCompounding, "human drug compounding")} pages.</p><p>That does not mean they do not work; it means the trial numbers are the best available reference rather than a guarantee for a compounded product. Our explainer on <a href="/weight-loss/articles/compounded-semaglutide-vs-brand-name">compounded vs brand-name semaglutide</a> covers the real differences and how to check a provider's pharmacy.</p>`,
    },
    {
      heading: "What about the results providers advertise?",
      body: `<p>Many online providers publish their own figures, such as average pounds lost by their customers. Those numbers are the provider's own and are usually self-reported or drawn from people who stayed on the program, so they are not comparable with the randomized trials above. We do not repeat them on this site. When you compare providers, compare what you can check: the medication, the verified price and its conditions, the clinician review and the cancellation terms. Our <a href="/weight-loss/how-to-choose-a-glp1-provider">guide to choosing a GLP-1 provider</a> lists the checks, and the <a href="/weight-loss/articles/how-to-start-glp1-treatment-online">step-by-step guide to starting GLP-1 treatment online</a> shows what the process looks like.</p>`,
    },
    {
      heading: "The bottom line",
      body: `<p>The best evidence says the average person without diabetes loses about 15% of their body weight on semaglutide 2.4 mg and 15% to 21% on tirzepatide over roughly a year and a half, with tirzepatide ahead in the one head-to-head trial. Individual results range widely, are lower with type 2 diabetes, build slowly through the dose steps and largely depend on staying on treatment. Every number here is a published trial average, linked to its source. This article is general information, not medical advice; a licensed clinician decides whether either medication is right for you. For a wider set of figures, including prices and side-effect rates, see our <a href="/weight-loss/glp1-weight-loss-statistics">GLP-1 price index and statistics</a>.</p>`,
    },
  ],
};
