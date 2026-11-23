import type { Article } from "./articles";

// ───── Is compounded semaglutide going away? (Nov 18, 2026) ─────
// The continuity-and-money question behind the brand "reviews and complaints"
// searches: can a reader keep a $49 to $249 compounded plan, and what changes
// if the pharmacy stops. Built from the FDA record read at fda.gov on
// Nov 18, 2026 (Warning Letter 738238 to Empower Pharmacy, the April 30, 2026
// 503B bulks-list proposal, the compounding-policy page, the drug shortage
// database) next to the three compounded providers whose pages were read the
// same day (joinem.co, healthrx.com, directmeds.com) and the verified price
// index for the rest. Research: ops/research/compounded-semaglutide-going-away.md.
// Every quote is the FDA's wording about Empower's products; it is an
// allegation in a warning letter, not a court finding, and not a finding about
// any provider listed here. Compounded semaglutide and tirzepatide are not
// FDA-approved. Nothing on this page is medical advice.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  wl: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/empower-clinic-services-llc-dba-empower-pharmacy-738238-09182026",
  wlSearch: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/compliance-actions-and-activities/warning-letters?search_api_fulltext=Empower",
  proposal: "https://www.fda.gov/news-events/press-announcements/fda-proposes-exclude-semaglutide-tirzepatide-and-liraglutide-503b-bulks-list",
  policy: "https://www.fda.gov/drugs/drug-alerts-and-statements/fda-clarifies-policies-compounders-national-glp-1-supply-begins-stabilize",
  bulks: "https://www.fda.gov/drugs/human-drug-compounding/503b-bulk-drug-substances-list",
  qa: "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
  concerns: "https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss",
  telehealth30: "https://www.fda.gov/news-events/press-announcements/fda-warns-30-telehealth-companies-against-illegal-marketing-compounded-glp-1s",
  telehealthPage: "https://www.fda.gov/drugs/human-drug-compounding/fda-telehealth-companies-what-know-when-promoting-compounded-drugs",
  shortages: "https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm",
  liraglutide: "https://www.accessdata.fda.gov/scripts/drugshortages/dsp_ActiveIngredientDetails.cfm?AI=Liraglutide%20Injection&st=c&tab=tabs-1",
  semaTablet: "https://www.accessdata.fda.gov/scripts/drugshortages/dsp_ActiveIngredientDetails.cfm?AI=Semaglutide%20Tablet&st=d&tab=tabs-2",
  wegovy: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ee06186f-2aa3-4990-a760-757579d8f77b",
  ozempic: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=adec4fd2-6858-4c99-91d4-531f5f2a2d79",
  edenWl: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/eden-health-international-inc-dba-eden-728279-06082026",
  altrxWl: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/trinity-healthcare-supply-llc-dba-altrx-728236-06082026",
  joinem: "https://joinem.co/",
  healthrx: "https://healthrx.com/pricing",
  directmeds: "https://directmeds.com/solutions/weight-loss",
  directmedsHome: "https://directmeds.com/",
};

export const compoundedSemaglutideGoingAwayArticle: Article = {
  slug: "compounded-semaglutide-going-away",
  image: "/article-images/compounded-semaglutide-going-away.webp",
  imageAlt: "Man in his 50s at a kitchen table reading the leaflet from an opened medication delivery box, coffee and phone beside him",
  title: "Is Compounded Semaglutide Going Away? FDA Rules, Nov 2026",
  description:
    "Compounded semaglutide is not FDA-approved and not banned outright. What the FDA's Empower warning letter and 503B proposal mean for your plan (Nov 2026).",
  category: "Guide",
  readTime: "14 min read",
  publishedAt: "2026-11-18",
  updatedAt: "2026-11-22",
  heroColor: "#EEF3F8",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "Not banned, not on a date. The FDA's own status line reads \"Tirzepatide and semaglutide do not currently appear on the 503B bulks list or on FDA's drug shortage list\" (compounding-policy page, current as of April 1, 2026, read Nov 18, 2026). Patient-specific 503A compounding continues where a prescriber documents a \"significant difference\" for that patient. Compounded semaglutide is not FDA-approved.",
    "Warning Letter 738238 to Empower Pharmacy (September 18, 2026, posted September 22) says its SEMAGLUTIDE/CYANOCOBALAMIN (1 mL, 5/0.5 mg/mL) and two TIRZEPATIDE/NIACINAMIDE vials \"appear to be essentially copies\" of approved products, compounded \"regularly and in inordinate amounts.\" No response or close-out letter was posted as of Nov 18, 2026.",
    "On April 30, 2026 the FDA proposed leaving semaglutide, tirzepatide and liraglutide off the 503B bulks list, having \"not identified a clinical need.\" Comments ran to June 29, 2026. No final determination was found on fda.gov as of Nov 18, 2026; that is an absence, not a confirmation.",
    "Prices read on the providers' own pages Nov 18, 2026: Embody $49/month (compounded semaglutide, not FDA-approved, sale banner with no end date); HealthRx $39 first month then $125/month; DirectMeds $249/month sublingual. None of the three pages says what happens to a prepaid plan if compounding stops.",
  ],
  sections: [
    {
      heading: "Is compounded semaglutide going away?",
      body: `<div class="qa"><strong>The short answer</strong>Not outright, and not on any announced date. The shortage basis for mass compounding ended in 2025. On September 18, 2026 the FDA told Empower Pharmacy its semaglutide/B12 and tirzepatide/niacinamide vials "appear to be essentially copies" of approved drugs, and on April 30, 2026 it proposed closing the 503B bulk route. Patient-specific 503A compounding continues under a prescriber's documented finding. Compounded semaglutide is not FDA-approved. Status read at fda.gov Nov 18, 2026.</div>
<p>The real question is not legal. It is whether you can keep the $49 to $249 a month plan you are on or about to buy, and, if the pharmacy stops, what happens to your money and your treatment. Every FDA quote below was read at fda.gov on Nov 18, 2026, and every provider price was read on the provider's own page the same day or taken from our <a href="/weight-loss/glp1-price-changes">verified price index</a> with its date.</p>
<p>The FDA has not banned compounded semaglutide and has set no date on which anything ends. It has also, in writing, named the vitamin B12 co-formulation that most telehealth brands sell as a product it "may consider" essentially a copy of an approved drug, and it has told one large 503A pharmacy that its output volume makes the differences "pretextual."</p>
<p>What this page is not: medical advice. Nothing here tells you to stop, switch or stock up. The FDA says compounded drugs are not FDA-approved, which means the agency "does not verify the safety, effectiveness or quality of compounded drugs before they are marketed" (${ext(S.qa, "Compounding and the FDA: Questions and Answers")}, content current as of September 16, 2025, read Nov 18, 2026). Your prescriber is the person to ask about your own treatment.</p>`,
    },
    {
      heading: "What did the FDA's warning letter to Empower actually say?",
      body: `<p>${ext(S.wl, "Warning Letter 738238")} is dated September 18, 2026 and addressed to Empower Clinic Services, LLC dba Empower Pharmacy, Houston, Texas. The FDA's warning-letter database lists it as posted September 22, 2026 under the subject "CGMP/Finished Pharmaceuticals/Adulterated/Unapproved New Drug" (${ext(S.wlSearch, "database search")}, read Nov 18, 2026). It follows an inspection "From November 3, 2025, through November 14, 2025," a Form FDA 483 issued November 14, 2025, and firm responses dated December 8, 2025, March 18, 2026 and April 30, 2026.</p>
<p>The products it names, in the letter's own strings:</p>
<table><thead><tr><th>Product as written in the letter</th><th>Vial</th><th>Concentration</th><th>Active drug per vial (arithmetic)</th></tr></thead><tbody>
<tr><td>SEMAGLUTIDE/CYANOCOBALAMIN</td><td>1 mL</td><td>5/0.5 mg/mL</td><td>5 mg semaglutide, 0.5 mg cyanocobalamin</td></tr>
<tr><td>TIRZEPATIDE/NIACINAMIDE</td><td>2.5 mL</td><td>8/2 mg/mL</td><td>20 mg tirzepatide, 5 mg niacinamide</td></tr>
<tr><td>TIRZEPATIDE/NIACINAMIDE</td><td>4 mL</td><td>17/2 mg/mL</td><td>68 mg tirzepatide, 8 mg niacinamide</td></tr>
</tbody></table>
<p>Source: Warning Letter 738238, September 18, 2026, read Nov 18, 2026. Per-vial figures are mg/mL multiplied by mL. They are not doses and not weeks of supply; see our page on <a href="/weight-loss/articles/compounded-semaglutide-units-to-mg">reading a compounded vial in mg, not units</a>.</p>
<p>The core charge is under section 503A, the patient-specific compounding route. The FDA writes that these products "appear to be essentially copies of FDA-approved semaglutide and tirzepatide products" and that "production records collected during the inspection indicate that your firm compounded these drug products regularly or in inordinate amounts." For each of July, August, September and October 2025 the letter says the firm "compounded and filled more than (b)(4) orders" of each product; the quantities are redacted.</p>
<p>The sentence that matters most for anyone on a B12 or niacinamide formulation: "FDA is aware of high demand for compounded versions of FDA-approved semaglutide and tirzepatide products. The volume of products you are producing suggests that differences between products you are compounding and the FDA-approved products are pretextual."</p>
<p>The evidence the FDA lists is three-fold: "(1) orders/prescriptions that lack any prescriber determination of significant difference from the commercially available product; (2) orders/prescriptions with purported prescriber determinations of 'significant difference' that appear to be repeated verbatim across many records, suggesting that they may be pre-generated for selection by the prescriber, rather than written by the prescriber for an identified individual patient; and (3) the volume of particular products compounded and orders filled." It adds that such statements can arrive "through third-party technology platforms that provide prescribers with pre-selected menu options for choosing a statement of significant difference." That is a description of a telehealth workflow, and it is the reason this letter reaches further than one pharmacy.</p>
<p>The consequence the FDA draws: products outside 503A lose the exemptions from "the FDA approval requirement of section 505," the labeling requirement of section 502(f)(1), and CGMP under 501(a)(2)(B). The letter also alleges the products were "prepared, packed, or held under insanitary conditions," citing smoke studies and media fills, and lists five CGMP violations. It states, "You do not have any FDA-approved applications on file for the ineligible drug products that you compounded." The firm had "fifteen (15) working days" to respond; the letter warns that failure to address the violations "may result in legal action without further notice, including, without limitation, seizure and injunction." As of Nov 18, 2026 the database shows no response letter and no close-out letter.</p>
<p>Two cautions. First, a warning letter sets out what the FDA says "appears" to violate the law; it is not a court finding. Second, none of the three provider pages we read on Nov 18, 2026 names Empower as its pharmacy, and this page does not say that any provider listed here is supplied by it.</p>`,
    },
    {
      heading: "Does adding B12 make compounded semaglutide legal?",
      body: `<p>Not by itself, in the FDA's own words. The agency's compounding-policy page (${ext(S.policy, "FDA clarifies policies for compounders")}, content current as of April 1, 2026, read Nov 18, 2026) sets out when a compounded product is "essentially a copy": it "has the same active pharmaceutical ingredient(s) (API) as the commercially available drug product in the same, similar or an easily substitutable strength, and the commercially available drug product can be used by the same route of administration (regardless of how it is labeled) prescribed for the compounded drug product. This is unless a prescriber determines and documents the compounded drug product contains a change that produces a significant difference from the commercially available drug product for an identified individual patient."</p>
<p>The page then gives the B12 example directly: "FDA may consider a compounded drug product that combines semaglutide API and another API, such as vitamin B12 (cyanocobalamin), to be essentially a copy of a commercially available drug product when the: drug products are used by the same route of administration – the compounded drug product is given the same way as the commercially available drug products, such as an injectable; drug products are the same, similar or easily substitutable strength – the amounts of semaglutide and vitamin B12 in the compounded drug product are within 10% of the strengths of the respective commercially available drug products."</p>
<p>So the test is not whether B12 is present. It is whether a named prescriber "determines and documents" a significant difference for a named patient. The statute, as the Empower letter quotes it, exempts a product only where "there is a change, made for an identified individual patient, which produces for that patient a significant difference, as determined by the prescribing practitioner." The Empower letter's complaint is that the statements it saw were missing or "repeated verbatim across many records." The same page also preserves a small-volume line: the FDA "does not intend to take action against a compounder" that "fills four or fewer prescriptions of that compounded drug product during a calendar month."</p>
<p>A B12 formulation prescribed with an individual, documented reason remains inside 503A; the same formulation produced in volume on template statements is what the FDA says appears to be a copy in the Empower letter. Which side a given plan sits on is a question for the prescriber and the pharmacy, not something a product page settles. Our page on <a href="/weight-loss/articles/compounded-semaglutide-vs-brand-name">compounded semaglutide vs brand-name</a> covers what is and is not the same about the molecule itself; compounded products are not FDA-approved either way.</p>`,
    },
    {
      heading: "What is the 503B bulks-list decision, and when is it final?",
      body: `<p>503B outsourcing facilities are the larger, FDA-registered compounders that make batches without patient-specific prescriptions. The FDA's ${ext(S.proposal, "April 30, 2026 press release")} (read Nov 18, 2026) states the rule they work under: "In most cases, outsourcing facilities cannot compound drugs using bulk drug substances unless the substance appears on the 503B bulks list, or the compounded drug is on the FDA's drug shortage list at the time of compounding, distribution, and dispensing." With the shortages over, the bulks list was the remaining door.</p>
<p>On April 30, 2026 the FDA "announced it is proposing to exclude semaglutide, tirzepatide, and liraglutide on the 503B bulks list, finding no clinical need for outsourcing facilities to compound these drugs from bulk substances." Its reasoning: "After evaluating the nominations for these three substances, the FDA did not identify a clinical need for outsourcing facilities to compound semaglutide, tirzepatide, and liraglutide from bulk drug substances." Commissioner Makary is quoted: "When FDA-approved drugs are available, outsourcing facilities cannot lawfully compound using bulk drug substances unless there is a clear clinical need."</p>
<p>When is it final? The press release says comments were invited "through the docket by June 29, 2026" and that "The agency will consider submitted comments before making a final determination." The page links to Federal Register document 2026-08552 (published May 1, 2026 per its title). Search-result titles also show a Federal Register notice dated June 26, 2026 described as a comment-period extension; we could not read it, so the extended deadline is unverified. As of Nov 18, 2026 the ${ext(S.bulks, "503B Bulk Drug Substances List page")} (content current as of May 16, 2024) has no row for semaglutide, tirzepatide or liraglutide, and no final determination appears on fda.gov. That is an absence in our search, not a confirmation that nothing has happened, and this page does not predict a date.</p>
<p>The 503B route is a proposal under review. The FDA's April 1, 2026 status line: "Tirzepatide and semaglutide do not currently appear on the 503B bulks list or on FDA's drug shortage list." For what the two pharmacy types mean for your vial, see <a href="/weight-loss/articles/503a-vs-503b-pharmacy-28-day-rule">503A vs 503B pharmacies and the 28-day rule</a>.</p>`,
    },
    {
      heading: "Is semaglutide still on the FDA shortage list?",
      body: `<p>No. The ${ext(S.shortages, "FDA Drug Shortages database")} was read on Nov 18, 2026 across all four tabs:</p>
<table><thead><tr><th>Entry</th><th>Status as read Nov 18, 2026</th><th>Detail</th></tr></thead><tbody>
<tr><td>Semaglutide injection</td><td>Not listed</td><td>0 rows in Current/Resolved, Discontinuations, Therapeutic Categories and New and Updated</td></tr>
<tr><td>Tirzepatide</td><td>Not listed</td><td>0 rows across the same four tabs</td></tr>
<tr><td>Liraglutide injection</td><td>"Currently in Shortage"</td><td>First posted 07/18/2023; Saxenda "available until discontinuation in January 2027"; Victoza "Limited Availability"; generics from Hikma and Meitheal "Available" (${ext(S.liraglutide, "detail page")}, reverified 09/22/2026 and 10/14/2026)</td></tr>
<tr><td>Semaglutide tablet</td><td>"Discontinuation"</td><td>Rybelsus 3 mg, 7 mg, 14 mg, posted 06/04/2026: "These products will be replaced by Ozempic (semaglutide) tablets" (${ext(S.semaTablet, "detail page")}). A discontinuation entry, not a shortage</td></tr>
</tbody></table>
<p>Source: FDA Drug Shortages database, read Nov 18, 2026.</p>
<p>The dates the shortages ended, from the compounding-policy page: tirzepatide "[12/19/2024] FDA re-evaluated its determination from October 2, 2024 ... determining the tirzepatide injection shortage is resolved"; semaglutide "[2/21/2025] FDA has determined the shortage of semaglutide injection products ... is resolved." The grace periods that followed are over too. For semaglutide, the FDA gave 503A pharmacies "until April 22, 2025, or until the date of the district court's decision" in OFA v. FDA, "whichever is later"; the court denied the injunction on April 24, 2025, and the FDA then wrote that the 503A period "has ended." The 503B period ran "until May 22, 2025." The Empower letter's footnote gives the same end dates: tirzepatide March 5, 2025 and semaglutide April 24, 2025 for 503A. Those dates are history, not a deadline still coming.</p>`,
    },
    {
      heading: "Can you still get compounded semaglutide in 2026, and from whom?",
      body: `<p>Yes, as of Nov 18, 2026. The three compounded providers whose pages we could open that day all list it, and all three state on the page that the product is not FDA-approved.</p>
<table><thead><tr><th>Provider</th><th>Compounded semaglutide price (not FDA-approved)</th><th>Condition on the page</th><th>Pharmacy type and name</th><th>Refund and cancel terms</th></tr></thead><tbody>
<tr><td><a href="/weight-loss/reviews/embody">Embody</a> (${ext(S.joinem, "joinem.co")})</td><td>$49/month; GLP-1/GIP injections $99/month</td><td>"flat rate at $49/month"; banner "Pre-Black Friday Sale Promo Applied. Save $200 instantly", no end date; FAQ: pricing "varies only by the treatment plan you select (4-, 12-, 24-, or 52-week plans)"</td><td>"state-licensed 503A compounding pharmacies"; names Red Rock Compounding Pharmacy, Health Warehouse, Precision Medicine, Triad Rx</td><td>Cancel at least 72 hours before the billing date; "Payments already made ... are non-refundable"</td></tr>
<tr><td><a href="/weight-loss/reviews/healthrx">HealthRx</a> (${ext(S.healthrx, "healthrx.com")})</td><td>$39 first month, "Then $125/mo until canceled"; tirzepatide then $199/month</td><td>"Longer plans have a lower monthly price" (tier prices not shown on the pages read); "Prices current as of October 15, 2026"</td><td>"in compliance with Section 503A"; pharmacy not named ("Packaging and prescription labels vary by dispensing pharmacy")</td><td>"Full refund if a provider does not approve you"; "Plans renew automatically at the price shown at checkout until you cancel"</td></tr>
<tr><td><a href="/weight-loss/reviews/directmeds">DirectMeds</a> (${ext(S.directmeds, "directmeds.com")}; refund wording on the ${ext(S.directmedsHome, "homepage")})</td><td>$249/month sublingual; $297/month injections</td><td>"Plans start at $249/month"; "bulk pricing for 6- or 12-month plans" (not priced); "no subscriptions"</td><td>"a certified U.S. pharmacy"; 503A or 503B not stated; pharmacy not named</td><td>"full refund" if the doctor "feels this is not a good treatment option"</td></tr>
</tbody></table>
<p>Source: each provider's own pages, read Nov 18, 2026. Compounded semaglutide and tirzepatide are not FDA-approved. None of the three pages states a formulation in mg/mL, and none says what happens to a plan if compounding of the product stops. One inconsistency for the record: HealthRx's pricing page also prints "$105/mo" for semaglutide and "$159/mo" for tirzepatide in a comparison paragraph, figures that do not match the $125 and $199 ongoing prices stated on the same page, and no plan on the pages we read is labelled at those amounts.</p>
<p>The rest of the compounded field, from our price index with the date each row was verified:</p>
<table><thead><tr><th>Provider</th><th>Compounded semaglutide</th><th>Compounded tirzepatide</th><th>Condition in the index</th><th>Verified</th></tr></thead><tbody>
<tr><td>welludr (wellmedr)</td><td>$41</td><td>$71</td><td>Pre-Black Friday sale, 12-month plan, same price at every dose</td><td>Nov 3, 2026</td></tr>
<tr><td>Collective</td><td>$59</td><td>$69</td><td>Same price at every dose, plus a $199/year membership after a 21-day trial</td><td>Nov 11, 2026</td></tr>
<tr><td>altRx</td><td>from $89</td><td>from $149</td><td>Starting price</td><td>Nov 3, 2026</td></tr>
<tr><td>Eden</td><td>$99</td><td>$129</td><td>Flat every month, same price at every dose</td><td>Nov 3, 2026</td></tr>
<tr><td>Sprout</td><td>from $99</td><td>from $149</td><td>12-month plan billed upfront ($1,188 and $1,788); monthly $149 and $199</td><td>Nov 3, 2026</td></tr>
<tr><td>Medvi</td><td colspan="2">Plans from $99</td><td>Not tied to one medication on its page</td><td>Nov 3, 2026</td></tr>
<tr><td>TrimRx</td><td colspan="2">Plans from $179</td><td>Not tied to one medication on its page; a "$120 Off" banner also showed</td><td>Nov 22, 2026</td></tr>
<tr><td>bmiMD</td><td>$149</td><td>$159</td><td>3-month plan ($447 and $477), limited-time price</td><td>Nov 3, 2026</td></tr>
<tr><td>Shed</td><td>from $199</td><td>from $299</td><td>Starting price</td><td>Nov 3, 2026</td></tr>
</tbody></table>
<p>Source: <a href="/weight-loss/glp1-price-changes">Treatments Hub GLP-1 price index</a>; the Medvi, bmiMD and Shed sites could not be opened on Nov 18, 2026, so their rows carry the index date. All products in this table are compounded and not FDA-approved. For the record, the FDA's warning-letter database shows letters dated June 8, 2026 to ${ext(S.edenWl, "Eden")} and ${ext(S.altrxWl, "altRx")}; both concern website claims (the FDA calls the representations "false or misleading" and objects to the brand's name on labels "suggesting" it is the compounder). Neither uses the "essentially copies" wording or cites production volumes, so they are a different kind of letter from Empower's. Our <a href="/weight-loss/glp1-provider-comparison">provider comparison</a> carries both.</p>
<p>Ask any provider:</p>
<ul>
<li><strong>Which pharmacy, by name, and is it 503A or 503B?</strong> Embody names four 503A pharmacies on its page; HealthRx says 503A without a name; DirectMeds says "certified U.S. pharmacy." The FDA's ${ext(S.telehealthPage, "page for telehealth companies")} (content current as of June 15, 2026) warns against "claiming a compounded drug is sourced from an FDA-approved or FDA-licensed pharmacy or outsourcing facility. FDA does not approve or license any facility."</li>
<li><strong>What is the dose in mg and the concentration in mg/mL on the label?</strong> The Empower letter writes every product as mg/mL and mL. Instructions given only in "units" are the pattern behind the FDA's ${ext(S.concerns, "dosing-error reports")} (content current as of October 1, 2026): "multiple reports of adverse events, some requiring hospitalization, that may be related to dosing errors associated with compounded injectable semaglutide products."</li>
<li><strong>Is the prescriber's "significant difference" statement individual?</strong> That is the exact point the Empower letter turns on. A reader cannot audit the pharmacy's records, but can ask whether the prescriber wrote a reason specific to them.</li>
<li><strong>What happens to my plan if the pharmacy stops this product?</strong> None of the three pages read on Nov 18, 2026 answers it. The next section is what the refund terms do say.</li>
</ul>`,
    },
    {
      heading: "What happens to your plan if your pharmacy stops?",
      body: `<p>No provider page we read commits to anything if its pharmacy stops compounding semaglutide. What the pages do state is their ordinary refund and renewal terms, and those decide how exposed you are. Embody: payments already made are non-refundable, and a cancellation must land 72 hours before the next billing date, so on a 4-week plan the most you have at risk is one cycle, while on a 52-week plan paid upfront the page gives no refund path. HealthRx: a full refund only "if a provider does not approve you," then automatic renewal "at the price shown at checkout until you cancel." DirectMeds: "no subscriptions," a full refund if the doctor does not approve the treatment, and bulk 6- or 12-month pricing that is not published.</p>
<p>What a year costs at the prices displayed on Nov 18, 2026, before any unpublished bulk discount (all compounded, not FDA-approved):</p>
<table><thead><tr><th>Plan</th><th>Arithmetic</th><th>12-month total</th><th>Average per month</th></tr></thead><tbody>
<tr><td>Embody, GLP-1 injections</td><td>$49 × 12</td><td>$588</td><td>$49</td></tr>
<tr><td>Embody, GLP-1/GIP injections</td><td>$99 × 12</td><td>$1,188</td><td>$99</td></tr>
<tr><td>HealthRx, semaglutide</td><td>$39 + (11 × $125)</td><td>$1,414</td><td>$117.83</td></tr>
<tr><td>HealthRx, tirzepatide</td><td>$39 + (11 × $199)</td><td>$2,228</td><td>$185.67</td></tr>
<tr><td>DirectMeds, sublingual semaglutide</td><td>$249 × 12</td><td>$2,988</td><td>$249</td></tr>
<tr><td>DirectMeds, injection</td><td>$297 × 12</td><td>$3,564</td><td>$297</td></tr>
</tbody></table>
<p>Source: provider pages read Nov 18, 2026; arithmetic shown. Billing cadence (monthly vs upfront) is as each page states and is not the same across the three.</p>
<p>The brand-name comparators our providers publish on their own brand shelves, from the price index verified Nov 3, 2026: Ozempic $1,149 to $1,399 a month, Wegovy $1,579 to $1,799, Zepbound $1,249 to $1,599. The <a href="/weight-loss/articles/wegovy-pill-price-online">Wegovy pill</a> was listed at $149 for the first month then $299 when we last checked it (Oct 9, 2026; not re-verified on Nov 18 because the manufacturer's sites were unreachable from our network). Wegovy is the FDA-approved semaglutide product for weight management (${ext(S.wegovy, "Wegovy label")}, revised 6/2026); Ozempic is approved for type 2 diabetes, not weight management (${ext(S.ozempic, "Ozempic label")}, revised 5/2026). Our <a href="/weight-loss/articles/zepbound-price-online">Zepbound price page</a> covers the approved tirzepatide injection.</p>
<p>A month-to-month plan carries one cycle of risk if a pharmacy stops; a prepaid year carries the whole year unless the terms say otherwise, and on the pages we read they do not. That is the question our guide <a href="/weight-loss/articles/before-you-prepay-glp1">before you prepay for a GLP-1 plan</a> is built around, and the sale prices on our <a href="/weight-loss/black-friday-glp1-deals">Black Friday GLP-1 deals page</a> are mostly tied to longer terms. If you are weighing a move to a brand product because of this, the page on <a href="/weight-loss/articles/lost-insurance-coverage-zepbound-wegovy">what to do when coverage for Zepbound or Wegovy ends</a> lists the cash routes; a change of medication is a prescriber's decision.</p>`,
    },
    {
      heading: "Is compounded tirzepatide going away too?",
      body: `<p>The same documents cover it. Two of the three products named in the Empower letter are TIRZEPATIDE/NIACINAMIDE (2.5 mL at 8/2 mg/mL and 4 mL at 17/2 mg/mL), and the FDA's "essentially copies" and "inordinate amounts" language applies to them as it does to the semaglutide product. The 503B proposal of April 30, 2026 names tirzepatide alongside semaglutide and liraglutide. The tirzepatide shortage was declared resolved on December 19, 2024, the 503A grace period ended when the court denied the injunction on March 5, 2025, and the 503B period ran "until March 19, 2025." Tirzepatide does not appear in the shortage database as read on Nov 18, 2026.</p>
<p>Compounded tirzepatide is not FDA-approved. Today's prices on the pages read Nov 18, 2026: Embody's GLP-1/GIP injections at $99/month, HealthRx at $39 for the first month then $199/month; the rest of the field is in the index table above. Zepbound (tirzepatide) injection is the FDA-approved product for chronic weight management; see our <a href="/weight-loss/articles/zepbound-price-online">Zepbound price page</a>.</p>`,
    },
    {
      heading: "The FDA record, dated: what each document changed",
      body: `<p>Each row is a document read at fda.gov on Nov 18, 2026.</p>
<table><thead><tr><th>Document</th><th>Date</th><th>What it changed</th><th>Status as read Nov 18, 2026</th></tr></thead><tbody>
<tr><td>Tirzepatide shortage resolved (${ext(S.policy, "policy page")} entry)</td><td>12/19/2024</td><td>Shortage basis for compounding tirzepatide ends; 503A grace to Feb 18, 2025 or the court decision; 503B to Mar 19, 2025</td><td>Court denied injunction Mar 5, 2025; 503A grace "has ended"; 503B ended Mar 19, 2025</td></tr>
<tr><td>Semaglutide shortage resolved (policy page entry)</td><td>02/21/2025</td><td>Same for semaglutide; 503A to Apr 22, 2025 or the court decision; 503B to May 22, 2025</td><td>Court denied injunction Apr 24, 2025; 503A grace "has ended"; 503B ended May 22, 2025</td></tr>
<tr><td>${ext(S.telehealth30, "30 warning letters to telehealth companies")}</td><td>03/03/2026</td><td>Marketing claims: "implying sameness with FDA-approved products" and branding products with the telehealth firm's name "implying they are the compounder"</td><td>Press release read; individual letters not counted here</td></tr>
<tr><td>Policy page update</td><td>04/01/2026</td><td>Defines "essentially a copy," gives the B12 example and the "within 10%" strength test, states the "four or fewer prescriptions" line</td><td>Current</td></tr>
<tr><td>${ext(S.proposal, "503B bulks-list proposal")}</td><td>04/30/2026 (Federal Register 05/01/2026)</td><td>Would keep semaglutide, tirzepatide and liraglutide off the 503B bulks list</td><td>Comments to June 29, 2026 per the FDA page; a June 26, 2026 extension notice exists (deadline unread); no final determination found</td></tr>
<tr><td>Eden and altRx letters</td><td>06/08/2026</td><td>Website claims only; no "essentially copies" finding</td><td>Posted 06/16/2026</td></tr>
<tr><td>${ext(S.wl, "Empower Warning Letter 738238")}</td><td>09/18/2026 (posted 09/22/2026)</td><td>First letter in this record naming semaglutide/B12 and tirzepatide/niacinamide vials as "essentially copies," compounded "regularly and in inordinate amounts," under 503A</td><td>No response or close-out letter posted</td></tr>
<tr><td>${ext(S.shortages, "Drug shortage database")}</td><td>Live</td><td>Semaglutide injection and tirzepatide: not listed; liraglutide injection: "Currently in Shortage"; semaglutide tablet: Rybelsus "Discontinuation"</td><td>As read Nov 18, 2026</td></tr>
</tbody></table>
<p>Source: fda.gov and accessdata.fda.gov pages linked in each row, all read Nov 18, 2026. Dates are the FDA's own; where the FDA writes February 18, 2025 for the tirzepatide 503A date we keep its date rather than our arithmetic.</p>`,
    },
    {
      heading: "Is compounded semaglutide being discontinued?",
      body: `<p>No document we read announces a discontinuation of compounded semaglutide. The only "Discontinuation" entry in the FDA shortage database under semaglutide is Novo Nordisk's Rybelsus tablets (3 mg, 7 mg, 14 mg), posted June 4, 2026, "replaced by Ozempic (semaglutide) tablets." That is a brand-name tablet, not a compounded product. What has changed is the legal basis for compounding in volume, covered above. Whether a particular provider continues is that provider's decision and its pharmacy's; none of the three pages we read on Nov 18, 2026 says it is stopping.</p>`,
    },
    {
      heading: "Is compounded semaglutide still legal?",
      body: `<p>Compounding under section 503A remains lawful when its conditions are met, and the FDA's own April 1, 2026 text preserves the exception: a product is not "essentially a copy" where "a prescriber determines and documents the compounded drug product contains a change that produces a significant difference from the commercially available drug product for an identified individual patient." The Empower letter is about products the FDA says did not meet those conditions, compounded "regularly and in inordinate amounts." Legal and FDA-approved are different things: the FDA's policy page says plainly, "Compounded drugs are not approved by FDA. FDA-approved drugs go through FDA's rigorous review for safety, effectiveness, and quality as part of the premarket approval process." The ${ext(S.concerns, "FDA's concerns page")} (content current as of October 1, 2026) adds that salt forms "including semaglutide sodium and semaglutide acetate, are different active ingredients than are used in the approved drugs." Nothing on this page is legal or medical advice.</p>`,
    },
    {
      heading: "How do you switch from compounded semaglutide to Wegovy or Zepbound?",
      body: `<p>Through your prescriber. A change of product is a prescribing decision, and this page gives no dose or timing instructions. The approved semaglutide product for weight management is Wegovy (${ext(S.wegovy, "label")} revised 6/2026, read Nov 18, 2026), indicated "in combination with a reduced calorie diet and increased physical activity" to reduce excess body weight and, in adults with established cardiovascular disease and obesity or overweight, to reduce the risk of major adverse cardiovascular events. Ozempic (${ext(S.ozempic, "label")} revised 5/2026) is indicated for glycemic control in type 2 diabetes, not weight management. The approved tirzepatide injection for weight management is Zepbound. Cash prices for the brands on our providers' shelves ran $1,149 to $1,799 a month at the Nov 3, 2026 index check; the Wegovy pill's $149 first month then $299 figure dates from Oct 9, 2026 and was not re-verified. The money side of a switch is covered on <a href="/weight-loss/articles/semaglutide-cost-per-month">semaglutide cost per month</a> and the <a href="/weight-loss/articles/glp1-weight-loss-online-complete-guide">complete guide to GLP-1 weight loss online</a>.</p>`,
    },
    {
      heading: "What this page could not verify",
      body: `<ul>
<li>The Federal Register text of the 503B proposal (document 2026-08552, May 1, 2026) and the June 26, 2026 extension notice (2026-12937): federalregister.gov, govinfo.gov and regulations.gov were unreachable from our network. The docket number and any extended comment deadline are unverified; we use the FDA press release's June 29, 2026.</li>
<li>Any final 503B determination on semaglutide, tirzepatide or liraglutide: none found on fda.gov through Nov 18, 2026. Absence, not confirmation.</li>
<li>The appeal in OFA v. FDA: secondary sources describe an outcome; the court's site was unreachable, so it is left out.</li>
<li>How many telehealth warning letters were issued in 2026 beyond the 30 announced on March 3, 2026: the database view we could read showed a further batch dated June 8, 2026 with no total.</li>
<li>Whether Empower responded within 15 working days, or whether the FDA has closed the letter out: nothing posted as of Nov 18, 2026. The order volumes in the letter are redacted.</li>
<li>Prices at Medvi, bmiMD, Shed and Hims on Nov 18, 2026 (sites unreachable or blocked); Wegovy pill and Zepbound vial prices from the manufacturers (sites unreachable). Index figures carry their own dates above.</li>
<li>A stated formulation in mg/mL on any of the three provider pages read: none. Black Friday end dates on those pages: none stated.</li>
</ul>`,
    },
    {
      heading: "Where the compounded providers fit in this picture",
      body: `<p>Every provider in the tables above sells a compounded product that is not FDA-approved, and every one of the three we read on Nov 18, 2026 says so on its own page. The differences that matter after the Empower letter are the ones the pages make checkable: whether the pharmacy is named with its type stated (Embody does both; HealthRx states 503A without a name; DirectMeds states neither) and what the refund terms say when a shipment does not come. Prices change; the <a href="/weight-loss/glp1-price-changes">GLP-1 price tracker</a> logs every verified move with its date, and the <a href="/weight-loss/cheapest-glp1">cheapest GLP-1 page</a> ranks the current index. The <a href="/weight-loss">weight-loss hub</a> links every review. This page will be updated when the FDA posts a final 503B determination or a response to the Empower letter, with the date it was read. Nothing here is medical advice; your prescriber decides your treatment.</p>`,
    },
  ],
};
