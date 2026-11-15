import type { Article } from "./articles";

// ───── Compounded semaglutide and tirzepatide: units to mg (Nov 15, 2026) ─────
// The practical page behind the FDA's dosing-error alert and our medical
// reviewer's Nov 12 note on the hub: a dose is a weight (mg), a syringe reads
// volume (units on a U-100 insulin syringe), and the only thing linking them
// is the vial's concentration (mg/mL). Competitor pages give one worked
// example; this one gives the formula, full conversion tables at example
// concentrations, the 28-day vial math, the syringe choice and the red flags,
// with the FDA-approved labels as the reference numbers.
//
// Sourcing (all read Nov 15, 2026): FDA's alert on dosing errors with
// compounded injectable semaglutide (content current as of 07/26/2024), FDA's
// page on unapproved GLP-1 drugs (current as of 10/01/2026), the Wegovy label
// (DailyMed, revised 6/2026) and the Zepbound label (DailyMed, revised
// 8/2026). Every table figure is arithmetic from the stated concentration:
// mL = mg ÷ (mg/mL); units = mL × 100. Concentrations in the tables are
// examples, not statements about any provider's product. Nothing here is a
// dosing instruction; the prescriber's written dose is the only valid one.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  fdaErrors: "https://www.fda.gov/drugs/human-drug-compounding/fda-alerts-health-care-providers-compounders-and-patients-dosing-errors-associated-compounded",
  fdaGlp1: "https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss",
  wegovy: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ee06186f-2aa3-4990-a760-757579d8f77b",
  zepbound: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=487cd7e7-434c-4925-99fa-aa80b1cc776b",
  poison: "https://www.poisonhelp.org/",
};

export const compoundedUnitsToMgArticle: Article = {
  slug: "compounded-semaglutide-units-to-mg",
  image: "/article-images/compounded-semaglutide-units-to-mg.webp",
  imageAlt: "Woman reading the concentration label on a small compounded medication vial next to an insulin syringe and a notepad",
  title: "Compounded Semaglutide Units to mg: How to Read Your Vial",
  description:
    "Why '20 units' means nothing without the vial's mg/mL. The formula, conversion tables for semaglutide and tirzepatide, the 28-day rule and the FDA's error reports.",
  category: "Guide",
  readTime: "13 min read",
  publishedAt: "2026-11-15",
  updatedAt: "2026-11-15",
  heroColor: "#EEF3F8",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "A 'unit' on an insulin syringe is a volume (100 units = 1 mL), not a dose. The same 0.25 mg of semaglutide is 25 units from a 1 mg/mL vial, 10 units from a 2.5 mg/mL vial and 5 units from a 5 mg/mL vial. Instructions written only in units are the root of the errors the FDA has logged.",
    "The FDA's reports include patients who drew 50 units instead of 5, a prescriber who wrote 25 units meaning 0.25 mg (5 units), and 20 units written instead of 2: doses five to twenty times too high, with vomiting, dehydration, fainting, pancreatitis and gallstones among the results.",
    "Three numbers must appear together before you inject: the dose in mg, the vial's concentration in mg/mL, and the resulting volume in mL (and units). If any one is missing, call the pharmacy before you draw up. The formula is mL = mg ÷ mg/mL.",
    "FDA says to discard a multi-dose vial 28 days after first use even if drug remains, so a vial's total mg rarely equals usable doses; at the labelled starting doses, that often means buying more than you inject. The FDA-approved labels (Wegovy, Zepbound) are the reference your prescriber works from for every dose step.",
  ],
  sections: [
    {
      heading: "What do the 'units' on a compounded semaglutide vial mean?",
      body: `<div class="qa"><strong>The short answer</strong>Units are a measure of volume, not of medicine. The insulin syringes used for compounded GLP-1 injections are "U-100" syringes: 100 units equals 1 mL, so 10 units is 0.1 mL and 5 units is 0.05 mL. How much semaglutide or tirzepatide sits in that volume depends entirely on the vial's concentration, printed as milligrams per millilitre (mg/mL). Your prescribed dose is a weight in mg. The units are only the answer to "how far do I pull the plunger," and that answer changes every time the concentration changes.</div>
<p>This is the single idea that explains the dosing errors the ${ext(S.fdaErrors, "FDA alerted prescribers, compounders and patients about")} (content current as of July 26, 2024). The approved products hide the arithmetic: a Wegovy pen delivers a fixed dose with no measuring, and a Zepbound vial is a single dose drawn up whole. Compounded products often come as multi-dose vials in varying concentrations, and the FDA notes that instructions may tell patients to inject a number of "units," a figure whose meaning shifts with the concentration. Our own medical reviewer flagged the same point on our <a href="/weight-loss">weight-loss hub</a>: compounded instructions should state the dose in mg, the concentration, and the matching syringe volume, because units alone cause confusion.</p>
<p>This page gives you the formula, conversion tables at example concentrations for both molecules, the 28-day vial math, how to choose a syringe, and the red flags that should stop you before you inject. It is not a dosing instruction. The dose on your prescription, written by a licensed prescriber who knows your history, is the only one that applies to you; this page is for checking that the numbers on your vial, your syringe and your prescription agree. Compounded medicines are not FDA-approved, and the FDA does not verify their safety, effectiveness or quality.</p>`,
    },
    {
      heading: "What went wrong in the FDA's dosing-error reports?",
      body: `<p>The FDA's alert describes the pattern in concrete cases. Most reports involved patients drawing more than the prescribed amount from a multi-dose vial during self-injection, taking "five to 20 times more than the intended dose." The individual cases it cites:</p>
<table><thead><tr><th>What happened</th><th>Intended</th><th>Actual</th><th>Multiple</th></tr></thead><tbody>
<tr><td>Patient told to draw 5 units (0.05 mL) on a U-100 syringe drew 50 units</td><td>5 units</td><td>50 units</td><td>10x</td></tr>
<tr><td>Prescriber meant 0.25 mg (5 units at that concentration) but wrote 25 units; the patient had severe vomiting</td><td>5 units</td><td>25 units</td><td>5x</td></tr>
<tr><td>Prescriber wrote 20 units instead of 2 units; three patients received the dose and had nausea and vomiting</td><td>2 units</td><td>20 units</td><td>10x</td></tr>
<tr><td>Patient could not get clear instructions from the telemedicine prescriber, searched online, and took five times the dose</td><td>1x</td><td>5x</td><td>5x</td></tr>
<tr><td>A patient who was also a clinician recalculated the dose in units and self-administered ten times the intended amount</td><td>1x</td><td>10x</td><td>10x</td></tr>
</tbody></table>
<p>The reported effects were nausea, vomiting, abdominal pain, fainting, headache, migraine, dehydration, acute pancreatitis and gallstones; some patients were hospitalised. The FDA's ${ext(S.fdaGlp1, "page on unapproved GLP-1 drugs")} (current as of October 1, 2026) adds that it has received "multiple reports of adverse events, some requiring hospitalization," that may relate to these errors, and that in some cases the error was the clinician miscalculating rather than the patient.</p>
<p>Notice what every case has in common. None involved a defective product. Each was a conversion failure: a dose in mg turned into a number of units without the concentration being carried through, or a decimal lost between a prescription and a syringe. That is why the fix is arithmetic and labelling, and why the FDA's recommendations are about syringes and instructions, not the drug.</p>`,
    },
    {
      heading: "How do you convert mg to mL and units?",
      body: `<p>Two lines, applied in order, every time:</p>
<div class="qa"><strong>The formula</strong><p><strong>Volume (mL) = dose (mg) ÷ concentration (mg/mL)</strong></p><p><strong>Units on a U-100 syringe = volume (mL) × 100</strong></p></div>
<p>Worked example. Your prescription says 0.5 mg of semaglutide once weekly and the vial says 2.5 mg/mL. Volume = 0.5 ÷ 2.5 = 0.2 mL. Units = 0.2 × 100 = 20 units. Now the same prescription with a 5 mg/mL vial: 0.5 ÷ 5 = 0.1 mL = 10 units. Same dose, half the units, because the vial is twice as strong. A patient who moves between pharmacies, or whose pharmacy changes concentration between refills, can be given the identical mg dose and need a completely different syringe reading.</p>
<p>A check you can run against an FDA-approved product shows the arithmetic is not a compounded-only concern. The ${ext(S.zepbound, "Zepbound label")} (revised August 2026) lists a multi-dose vial of 10 mg in 2.4 mL that delivers four 2.5 mg doses of 0.6 mL each. Run it through the formula: 10 ÷ 2.4 = 4.17 mg/mL; 2.5 ÷ 4.17 = 0.6 mL = 60 units. The label's own numbers reconcile, which is exactly the test to apply to a compounded vial: do the total mg, the total mL and the per-dose volume on the instructions all agree with each other?</p>
<p>Three habits prevent most mistakes. Write the three numbers (mg, mg/mL, mL) on the vial box in your own hand after confirming them with the pharmacist. Re-do the arithmetic whenever a new vial arrives, even from the same pharmacy. And never convert a dose into units from memory; the number you remember belongs to the last concentration, not necessarily this one.</p>`,
    },
    {
      heading: "Semaglutide conversion table: dose, concentration, volume, units",
      body: `<p>The doses in the left column are the escalation steps in the ${ext(S.wegovy, "Wegovy prescribing information")} (revised June 2026): 0.25 mg for weeks 1 to 4, 0.5 mg for weeks 5 to 8, 1 mg for weeks 9 to 12, 1.7 mg for weeks 13 to 16, then a maintenance dose of 1.7 mg or 2.4 mg. The concentrations across the top are <strong>examples</strong> chosen to show how the volume moves; your vial may say something else, and that number, not this table, governs your draw. Units assume a U-100 syringe.</p>
<table><thead><tr><th>Weekly dose</th><th>1 mg/mL vial</th><th>2.5 mg/mL vial</th><th>5 mg/mL vial</th></tr></thead><tbody>
<tr><td><strong>0.25 mg</strong> (weeks 1 to 4 on the label)</td><td>0.25 mL = 25 units</td><td>0.1 mL = 10 units</td><td>0.05 mL = 5 units</td></tr>
<tr><td><strong>0.5 mg</strong> (weeks 5 to 8)</td><td>0.5 mL = 50 units</td><td>0.2 mL = 20 units</td><td>0.1 mL = 10 units</td></tr>
<tr><td><strong>1 mg</strong> (weeks 9 to 12)</td><td>1 mL = 100 units</td><td>0.4 mL = 40 units</td><td>0.2 mL = 20 units</td></tr>
<tr><td><strong>1.7 mg</strong> (weeks 13 to 16, or maintenance)</td><td>1.7 mL = 170 units (more than one syringe)</td><td>0.68 mL = 68 units</td><td>0.34 mL = 34 units</td></tr>
<tr><td><strong>2.4 mg</strong> (maintenance)</td><td>2.4 mL = 240 units (more than one syringe)</td><td>0.96 mL = 96 units</td><td>0.48 mL = 48 units</td></tr>
</tbody></table>
<p>Read the table across a row and the problem the FDA describes is visible: the starting 0.25 mg dose is 5 units from one vial and 25 units from another. A "25 units" instruction written for the 1 mg/mL vial, carried over to a 5 mg/mL vial, delivers 1.25 mg, five times the intended dose, which is precisely one of the FDA's cases. Read down a column and the second point appears: the right-hand vials put maintenance doses within a single 1 mL syringe, while the 1 mg/mL vial does not, which is one reason concentrations vary between pharmacies.</p>
<p>The label's schedule is the reference your prescriber works from, including its instruction to consider delaying an increase by four weeks if a dose is not tolerated. Whether and when you move between rows is the prescriber's decision, not the table's; doses are increased step by step under supervision, and a missed-dose rule exists for a reason (on the injection label, two or more consecutive missed doses mean restarting escalation at a lower dose).</p>`,
    },
    {
      heading: "Tirzepatide conversion table: dose, concentration, volume, units",
      body: `<p>Tirzepatide's labelled steps are wider. The ${ext(S.zepbound, "Zepbound label")} starts at 2.5 mg once weekly for four weeks (a starting dose only, "not approved as a maintenance dosage"), then 5 mg, with any further increase in 2.5 mg steps after at least four weeks on the current dose, to a maximum of 15 mg. Again, the concentrations are examples; the volume in your instructions must come from your own vial.</p>
<table><thead><tr><th>Weekly dose</th><th>5 mg/mL vial</th><th>10 mg/mL vial</th><th>20 mg/mL vial</th></tr></thead><tbody>
<tr><td><strong>2.5 mg</strong> (first 4 weeks on the label)</td><td>0.5 mL = 50 units</td><td>0.25 mL = 25 units</td><td>0.125 mL = 12.5 units</td></tr>
<tr><td><strong>5 mg</strong></td><td>1 mL = 100 units</td><td>0.5 mL = 50 units</td><td>0.25 mL = 25 units</td></tr>
<tr><td><strong>7.5 mg</strong></td><td>1.5 mL = 150 units (more than one syringe)</td><td>0.75 mL = 75 units</td><td>0.375 mL = 37.5 units</td></tr>
<tr><td><strong>10 mg</strong></td><td>2 mL = 200 units (more than one syringe)</td><td>1 mL = 100 units</td><td>0.5 mL = 50 units</td></tr>
<tr><td><strong>12.5 mg</strong></td><td>2.5 mL = 250 units</td><td>1.25 mL = 125 units</td><td>0.625 mL = 62.5 units</td></tr>
<tr><td><strong>15 mg</strong> (label maximum)</td><td>3 mL = 300 units</td><td>1.5 mL = 150 units</td><td>0.75 mL = 75 units</td></tr>
</tbody></table>
<p>Two practical notes fall out of this table. Half-unit readings (12.5, 37.5, 62.5) only exist on syringes marked in half units; if your syringe is marked in whole or two-unit steps, a concentration that produces a half-unit volume is a reason to ask the pharmacy for a different syringe or a different concentration rather than to round. And at the top of the range, a 5 mg/mL product needs more than one full 1 mL syringe per injection, which multiplies the chances of a counting error. The Zepbound label's own guidance for its vials is to use "a syringe appropriate for dose administration (e.g., a 1 mL syringe capable of measuring a 0.5 mL or 0.6 mL dose)," and to use a new syringe and needle every time.</p>
<p>For the clinical side of tirzepatide dosing (why the label pauses four weeks between steps, and what the 72-week SURMOUNT results measured at each maintenance dose), see <a href="/weight-loss/articles/tirzepatide-vs-semaglutide">tirzepatide vs semaglutide</a>.</p>`,
    },
    {
      heading: "How do you read a compounded vial label, line by line?",
      body: `<p>A compounded vial label is written by the pharmacy, so layouts vary, but the information you need is always the same five items. If you cannot find one of them, that is a phone call, not a guess.</p>
<table><thead><tr><th>Look for</th><th>What it tells you</th><th>If it is missing</th></tr></thead><tbody>
<tr><td><strong>Drug name and salt form</strong></td><td>It should say semaglutide or tirzepatide. The FDA says "semaglutide sodium" and "semaglutide acetate" are different active ingredients from the approved drug and that it is "not aware of any lawful basis for their use in compounding."</td><td>Ask the pharmacy in writing which active ingredient was used.</td></tr>
<tr><td><strong>Concentration (mg/mL)</strong></td><td>The number that converts your mg dose into a volume. Sometimes printed as total mg and total mL instead (for example 5 mg / 2 mL = 2.5 mg/mL).</td><td>Do not inject. Without it, no number of units can be checked.</td></tr>
<tr><td><strong>Total volume and total mg</strong></td><td>How many doses the vial physically holds, before the 28-day rule (next section).</td><td>Ask; it also tells you whether the vial was overfilled or underfilled relative to the price you paid.</td></tr>
<tr><td><strong>Beyond-use date</strong></td><td>The pharmacy's date after which the product should not be used, separate from the 28-days-after-opening rule.</td><td>Ask for it; a vial without one has no documented stability.</td></tr>
<tr><td><strong>Dose instruction in mg, mL and units</strong></td><td>All three, agreeing with each other and with the concentration. The FDA tells prescribers to be vigilant because concentrations vary, and to contact the compounder if uncertain.</td><td>Call the prescriber before the first injection; ask them to confirm the mL figure, not just the units.</td></tr>
</tbody></table>
<p>Keep the vial box and the pharmacy's information sheet until the vial is finished. If a refill arrives with a different concentration, or a different total volume, treat it as a new product and redo the arithmetic from the top.</p>`,
    },
    {
      heading: "Which syringe should you use for compounded GLP-1 injections?",
      body: `<p>Insulin syringes come in three common barrel sizes, and the FDA's alert asks prescribers and compounders to "provide a syringe size appropriate for the intended dose" and to counsel patients on measuring with it. The reason is precision: the smaller the barrel, the finer the markings.</p>
<table><thead><tr><th>U-100 syringe</th><th>Holds</th><th>Typical markings</th><th>Suits volumes of</th></tr></thead><tbody>
<tr><td>0.3 mL (30-unit)</td><td>30 units</td><td>Finest; half-unit versions exist</td><td>Up to 0.3 mL: most semaglutide doses at 2.5 mg/mL and above</td></tr>
<tr><td>0.5 mL (50-unit)</td><td>50 units</td><td>Fine</td><td>0.3 to 0.5 mL</td></tr>
<tr><td>1 mL (100-unit)</td><td>100 units</td><td>Coarsest</td><td>0.5 to 1 mL: higher tirzepatide doses at 10 mg/mL</td></tr>
</tbody></table>
<p>Two errors in the FDA's reports were a plain tenfold misreading (5 units drawn as 50). On a 1 mL syringe, 5 units is a sliver near the needle hub and the 50-unit line sits mid-barrel; on a 0.3 mL syringe, 5 units is a clearly visible fifth of the barrel and 50 units does not exist. Matching the syringe to the dose is not a convenience; it removes the most common wrong answer from the syringe entirely. If the pharmacy shipped syringes that cannot read your volume accurately, ask for the right size before you start.</p>
<p>Always use a new sterile needle and syringe for each dose, as both FDA pages state. Insulin syringes are single-use.</p>`,
    },
    {
      heading: "How many doses does a multi-dose vial really give you?",
      body: `<p>Fewer than the label's total mg suggests, because of the 28-day rule. The FDA's position, stated on its ${ext(S.fdaGlp1, "unapproved GLP-1 page")}, is that multi-dose sterile vials should generally be used within 28 days after first use, because the risk of contamination rises after that; discard the vial 28 days after the first puncture even if medication remains, and "do not continue using medication from the vial after 28 days" even if the compounder says it can be used longer.</p>
<p>At once-weekly dosing, 28 days is four injections. So the usable doses in a vial are the lesser of what it physically holds and four. The table shows what that means at the labelled semaglutide starting steps for a 1 mL vial at 2.5 mg/mL (2.5 mg total):</p>
<table><thead><tr><th>Weekly dose</th><th>Doses the vial holds</th><th>Doses usable in 28 days</th><th>mg injected</th><th>mg discarded</th></tr></thead><tbody>
<tr><td>0.25 mg</td><td>10</td><td>4</td><td>1 mg</td><td>1.5 mg (60%)</td></tr>
<tr><td>0.5 mg</td><td>5</td><td>4</td><td>2 mg</td><td>0.5 mg (20%)</td></tr>
<tr><td>1 mg</td><td>2 (plus a half)</td><td>2</td><td>2 mg</td><td>0.5 mg, and a third week needs a new vial</td></tr>
</tbody></table>
<p>Three consequences. First, "a vial of 2.5 mg" is not "ten weeks of starting doses." Second, a plan priced per vial can cost very differently per usable dose depending on your step, which is worth knowing before you prepay; our guide to the <a href="/weight-loss/articles/glp1-true-cost-month-1-vs-year-one">true cost of GLP-1 treatment</a> works through the yearly totals. Third, a vial sized so that the 28-day limit falls exactly on your fourth dose is the efficient design, and it is a fair question to ask a provider how its vial sizes line up with the labelled steps.</p>`,
    },
    {
      heading: "What dose schedule do the FDA-approved labels use?",
      body: `<p>Compounded products have no label of their own, so the approved prescribing information is the reference point for every dose step, and the document your prescriber is working from. Both labels increase slowly for a reason: gastrointestinal side effects cluster after each increase, and the labels allow a pause when a step is not tolerated.</p>
<table><thead><tr><th></th><th>Semaglutide injection (Wegovy label, revised 6/2026)</th><th>Tirzepatide injection (Zepbound label, revised 8/2026)</th></tr></thead><tbody>
<tr><td>Starting dose</td><td>0.25 mg once weekly for 4 weeks</td><td>2.5 mg once weekly for 4 weeks (starting dose only)</td></tr>
<tr><td>Escalation</td><td>0.5 mg (weeks 5 to 8), 1 mg (9 to 12), 1.7 mg (13 to 16)</td><td>5 mg after 4 weeks, then 2.5 mg steps after at least 4 weeks on each</td></tr>
<tr><td>Maintenance for weight reduction</td><td>1.7 mg or 2.4 mg once weekly; the June 2026 label adds a 7.2 mg option (Wegovy HD) only after 2.4 mg has been tolerated for at least 4 weeks and more weight loss is clinically indicated</td><td>5, 10 or 15 mg once weekly; 15 mg is the maximum</td></tr>
<tr><td>If a step is not tolerated</td><td>Consider delaying escalation by 4 weeks</td><td>Stay at least 4 weeks on each dose before increasing</td></tr>
<tr><td>Missed dose</td><td>Take it if the next dose is more than 2 days away; otherwise skip. Two or more missed in a row: restart escalation at a lower dose</td><td>Take within 4 days (96 hours); after that, skip and resume on schedule</td></tr>
<tr><td>Approved presentations</td><td>Single-dose pens and syringes from 0.25 mg/0.5 mL to 2.4 mg/0.75 mL; a multi-dose pen of 9.6 mg/3 mL; tablets (1.5, 4, 9 and 25 mg, escalated every 30 days)</td><td>Single-dose pens and vials 2.5 to 15 mg in 0.5 mL; a multi-dose vial of four doses (for example 10 mg/2.4 mL)</td></tr>
</tbody></table>
<p>Two things in that table matter for a compounded patient. The approved products never ask the patient to convert anything: a Wegovy 0.25 mg pen is 0.25 mg, and a Zepbound 2.5 mg vial is drawn up whole. The only approved product that involves a per-dose volume, the Zepbound multi-dose vial, comes with the volume (0.6 mL) printed on the label. That is the standard your compounded instructions should meet. And every schedule above is a prescriber's framework; our <a href="/weight-loss/glp1-dose-schedule">dose schedule tool</a> maps the labelled steps onto a calendar, but when you move between steps is a decision made with the person who prescribed the drug.</p>`,
    },
    {
      heading: "Red flags that should stop you before you inject",
      body: `<ul>
<li><strong>Instructions only in units.</strong> The FDA's alert identifies units-only instructions as a source of the errors. Ask for the mg and the mL.</li>
<li><strong>No concentration anywhere</strong> on the vial, the box or the information sheet.</li>
<li><strong>Numbers that do not reconcile.</strong> If dose ÷ concentration does not equal the stated volume, one of the three is wrong. Do not pick one; call.</li>
<li><strong>A refill at a different concentration with the same "units" instruction.</strong> This is the five-times case in the FDA's reports.</li>
<li><strong>Being told the vial is fine past 28 days.</strong> The FDA's advice is to discard at 28 days regardless of what the compounder says.</li>
<li><strong>"Semaglutide sodium" or "semaglutide acetate"</strong> on the label, which the FDA says are not the approved active ingredient.</li>
<li><strong>Dose changes without the prescriber.</strong> A member of a support group being "kept on" a higher dose is one person's history, not your starting point; increases happen under prescriber supervision, in the labelled steps.</li>
<li><strong>Any product bought without a prescription</strong> from a state-licensed pharmacy. The FDA's guidance is to fill a prescription from your own doctor at a licensed pharmacy; outside that route there is no one accountable for the concentration at all.</li>
</ul>`,
    },
    {
      heading: "What should you do if you think you injected too much?",
      body: `<p>Call your prescriber or the pharmacy immediately, and in the United States you can also call Poison Help at 1-800-222-1222 (${ext(S.poison, "poisonhelp.org")}), which is free and staffed around the clock. Tell them the drug, the concentration on the vial, the volume you drew and the volume you were meant to draw. Keep the vial and syringe.</p>
<p>The effects the FDA has recorded after overdoses are severe nausea and vomiting, abdominal pain, dehydration, fainting, headache, acute pancreatitis and gallstones. Persistent severe abdominal pain, an inability to keep fluids down, or fainting are reasons for urgent in-person assessment, not for waiting to see. If you take insulin or a sulfonylurea as well, low blood sugar is an added risk and your blood sugar should be checked. Do not take the next weekly dose until the prescriber has told you how to restart; both labels have rules for gaps in dosing, and after a large overdose the restart is a clinical decision.</p>`,
    },
    {
      heading: "Where do the providers we rank fit in?",
      body: `<p>Every weight-loss provider we rank prescribes through a licensed clinician and dispenses through a state-licensed pharmacy, and we read each one's public pages and verify its published price before it appears here; our <a href="/weight-loss/how-we-rank">ranking method</a> explains what we check. What we do not do is independently test vial concentrations or review the written instructions each pharmacy ships, so this page is the checklist to apply to any provider, including the two shown below. The questions to ask before your first injection: the dose in mg, the concentration in mg/mL, the volume in mL and units, the syringe size they ship, and how many usable doses the vial gives within 28 days.</p>
<p>If the answers come back quickly and consistently, that is a good sign about the pharmacy behind the provider. If they come back only as "inject 20 units," you now know why that is not an answer, and what to ask for instead. For how the prescription process works end to end, see <a href="/weight-loss/articles/how-to-start-glp1-treatment-online">how to start GLP-1 treatment online</a>; for the safety screening a prescriber should run before any of this arithmetic matters, the safety section of our <a href="/weight-loss#safety">weight-loss hub</a> lists the points from the labels.</p>`,
    },
  ],
};
