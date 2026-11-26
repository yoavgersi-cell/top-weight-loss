import type { Provider, ReviewData } from "../config";

// ─────────────────────────────────────────────────────────────────────────────
// Defy Medical (TRT) - provider record and review, Nov 26, 2026.
//
// Source of every fact: ops/research/2026-11-26-defy-trtnation-evidence.md
// (Defy section and addendum). Provider's own public pages only, all read
// Nov 26, 2026: defymedical.com, patients.defymedical.com/PharmacyContact,
// defymedicalstore.com, testdefy.com. No Trustpilot, no testimonials, no
// review counts. Defy is NOT in the ranking (not in providerOrder), so the
// review page shows no editorial score. There is no affiliate link: the CTA
// is the brand's own site, as for Fountain and Marek. Not in the REVIEW_LOG,
// so the page names no medical reviewer for this review.
// ─────────────────────────────────────────────────────────────────────────────

const ext = (href: string, text: string) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  terms: "https://www.defymedical.com/about-us/terms-of-service/",
  faqCost: "https://www.defymedical.com/faq/how-much-does-trt-cost-with-defy-medical/",
  faqLegit: "https://www.defymedical.com/faq/is-defy-medical-a-legitimate-medical-practice/",
  faqShip: "https://www.defymedical.com/faq/does-defy-medical-ship-my-medications/",
  trtPage: "https://www.defymedical.com/services/trt/",
  about: "https://www.defymedical.com/about-us/",
  procedures: "https://www.defymedical.com/about-us/clinical-procedures/",
  labsPage: "https://www.defymedical.com/services/lab-tests-online/",
  clinic: "https://www.defymedical.com/tampa-clinic/",
  getStarted: "https://www.defymedical.com/get-started/",
  testDefy: "https://www.testdefy.com/",
  testDefyMen: "https://www.testdefy.com/men-s-health",
  pharmacies: "https://patients.defymedical.com/PharmacyContact",
  storeTerms: "https://www.defymedicalstore.com/terms-conditions/",
  panel: "https://www.defymedicalstore.com/921",
  fdaLetters:
    "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/compliance-actions-and-activities/warning-letters",
};

export const TRT_DEFY_PROVIDER: Provider = {
  id: "defy-medical",
  name: "Defy Medical",
  tagline: "Tampa-based TRT clinic with telemedicine in most states. No subscription; itemized lab prices; medication prices not published",
  logo: "/logo-defy.svg",
  smallLogo: "/logo-defy.svg",
  highlights: [
    "No subscription or monthly fee, per Defy's own pages",
    "Itemized lab prices on its public lab site",
    "Labs and a provider consult at least every 6 months",
  ],
  // No affiliate link exists for Defy. The brand's own site, as for Fountain
  // and Marek; swap only if the operator supplies a tracked link.
  affiliateUrl: "https://www.defymedical.com/",
  ctaText: "Visit Site",
};

export const TRT_DEFY_REVIEW: ReviewData = {
  slug: "defy-medical",
  providerId: "defy-medical",
  updatedAt: "2026-11-26",
  shortSummary:
    "Defy Medical sells TRT by the service, with no subscription. It publishes lab prices and a monitoring schedule, but not medication, consult or shipping prices.",
  reviewIntro:
    "Defy Medical, LLC runs a clinic in Tampa, Florida and offers telemedicine in most US states. Its testosterone service is built on required labs and a physical exam, a provider consult, and a pharmacy in its network that fills and ships the order. This review reads only Defy's own public pages and dated Terms of Service (effective April 2, 2026), all read on Nov 26, 2026. We did not buy the service, and Defy is not in our ranking.",
  keyFeatures: [
    "No subscriptions or contracts; no monthly fee; charges are due when a service is bought (Defy's own wording)",
    "Labs through LabCorp, with itemized prices on its public lab site (read Nov 26, 2026)",
    "Provider consult and lab testing at least once every 6 months, per its Terms",
    "Injectable, topical, pellet and nasal-gel testosterone listed, plus supplemental medications",
    "Orders filled and shipped by network compounding pharmacies, which Defy names",
  ],
  treatmentOptions: [
    "Injectable testosterone",
    "Topical testosterone",
    "Testosterone pellets",
    "Testosterone nasal gel",
    "Supplemental medication to support a TRT protocol",
  ],
  pricingSummary:
    "Defy publishes one cost figure for TRT: its own estimate that the average male patient pays under $175 a month for the first year and around $125 a month after that. Defy says the estimate includes testosterone, a weekly aromatase inhibitor, lab work and consultations, that it is based on the average patient, and that it is not a price guarantee (Defy FAQ, read Nov 26, 2026).\n\nMedication, consult and shipping prices are not published on any page we could read. Lab prices are: a follow-up TRT panel for men is listed at $275 and the initial panel at $299 on Defy's public lab site (read Nov 26, 2026). Defy's patient store hides prices from signed-out visitors, so a patient's lab price may differ. Defy's Terms say prices can change at any time without notice. Confirm every price in writing before you pay.",
  pros: [
    "No subscription, no monthly fee, and charges are due only when a service is bought",
    "Lab prices are itemized on a public page before you sign up",
    "The monitoring schedule (consults and labs every 6 months) is written into the Terms",
    "The pharmacies that fill orders are named on a public page",
    "Appointments are described as extended 1-hour consults",
  ],
  cons: [
    "Medication, consult and shipping prices are not published",
    "All sales are final; refunds are limited to unused labs, with a $25 fee on credits",
    "Two Defy pages disagree on how long lab orders last and what a refund looks like",
    "Follow-ups may cost extra, and refills depend on completing labs, exams and consults",
    "Does not accept insurance; no list of states served is published",
  ],
  bestFor: [
    "Men who want itemized lab prices before choosing a clinic",
    "Men who prefer paying per service to a monthly membership",
    "Readers who want the refund and monitoring terms spelled out before they start",
  ],
  finalVerdict:
    "Defy Medical is specific about labs, monitoring and refunds, and silent about medication, consult and shipping prices. Its terms say all sales are final, so the questions to settle before paying are the total price in writing and which of its two lab refund terms applies to your order. We give it no score: it is not in our ranking, and this review rests on its published pages, not on a purchase. This is not medical advice.",
  howItWorks: [
    {
      timing: "Step 1",
      title: "Labs and a physical exam",
      detail:
        "Defy says it requires comprehensive lab work and an up-to-date physical exam for any hormone restoration protocol. Defy says it partners with LabCorp for its lab services.",
    },
    {
      timing: "Step 2",
      title: "Provider consult",
      detail:
        "A Defy provider reviews your labs, exam and history. Its Terms state that no prescription is given unless a clinical need exists, and that agreeing to labs does not mean you will get one.",
    },
    {
      timing: "Step 3",
      title: "A network pharmacy fills the order",
      detail:
        "Defy does not make or ship medication itself. It sends the order to a pharmacy in its network, which ships it and sends you tracking.",
    },
    {
      timing: "Ongoing",
      title: "Consults and labs at least every 6 months",
      detail:
        "Refill requests are reviewed by the practitioner, and your practitioner may stop therapy until requested follow-ups are done.",
    },
  ],
  trustBadges: ["No subscription (per Defy)", "LabCorp lab partner", "Pharmacies named"],
  sections: [
    {
      heading: "Defy Medical TRT in short",
      body: `<div class="qa"><strong>The short answer</strong>Defy Medical sells testosterone care by the service, with no subscription and no monthly fee. It publishes one cost figure, its own average of under $175 a month in year one and around $125 after, covering testosterone, a weekly aromatase inhibitor, labs and consultations (${ext(S.faqCost, "Defy FAQ")}, read Nov 26, 2026). Medication, consult and shipping prices are not published. Lab prices are: a follow-up TRT panel lists at $275. All sales are final.</div>
<p>Everything here comes from Defy's own pages, read on Nov 26, 2026, and from its ${ext(S.terms, "Terms of Service")} (effective April 2, 2026). Most other Defy pages show no revision date, and we say so where it matters. Defy is not in our ranking, and the page carries no score from us.</p>
<p>The company is Defy Medical, LLC, governed by Florida law. It has an in-office clinic at 4809 N. Armenia Ave., Suite 220, Tampa, FL 33603 and offers telemedicine "in most states" (${ext(S.clinic, "Tampa clinic page")}, ${ext(S.about, "About page")}). No list of states is published on the pages we read. The Terms let Defy refuse or cancel an order if you are in a jurisdiction where it is not authorized to provide the service.</p>`,
    },
    {
      heading: "What does TRT at Defy Medical cost?",
      body: `<p>Defy's ${ext(S.faqCost, "cost FAQ")} gives an average, not a price list. In its words: "For a male patient, the average cost for TRT at Defy Medical works out to under $175 per month for the first year." That figure "includes Testosterone, a weekly aromatase inhibitor (often prescribed alongside TRT), lab work, and consultations." After the first year it "drops to around $125 per month." Defy adds that your cost "may be more or less" depending on severity, symptoms, goals, doses, delivery systems and extra medications, and that the figure "is not a price guarantee."</p>
<table>
<thead><tr><th>Cost item</th><th>What Defy publishes (read Nov 26, 2026)</th></tr></thead>
<tbody>
<tr><td>Average monthly cost, year one</td><td>Under $175, as Defy's own estimate</td></tr>
<tr><td>Average monthly cost after year one</td><td>Around $125, as Defy's own estimate</td></tr>
<tr><td>Year one, per year (our arithmetic: $175 x 12)</td><td>Under $2,100</td></tr>
<tr><td>After year one, per year (our arithmetic: $125 x 12)</td><td>About $1,500</td></tr>
<tr><td>Difference between the two estimates (our arithmetic)</td><td>$50 a month</td></tr>
<tr><td>Testosterone and other medication prices</td><td>Not published; the patient store shows no price to signed-out visitors</td></tr>
<tr><td>Consult fee</td><td>Not published. Late cancellations (under 24 hours) and no-shows may owe the full fee</td></tr>
<tr><td>Shipping fee and speed</td><td>Not published. The pharmacy ships and sends tracking</td></tr>
</tbody>
</table>
<p>Sources: ${ext(S.faqCost, "Defy cost FAQ")} (no revision date shown) and ${ext(S.terms, "Terms of Service")} (effective April 2, 2026). The Terms also say that prices and fees for medications, services, lab testing and third-party vendors "may change at any time" without prior notice.</p>
<p>Read the estimate as what it is: Defy's average across male TRT patients, with the company's own caveats. It is not what a given patient will be charged, and it tells you nothing about the cost of one vial or one visit. For how to add up an all-in TRT bill at any clinic, see our <a href="/trt/articles/trt-cost">TRT cost guide</a>.</p>`,
    },
    {
      heading: "How much do Defy Medical's lab tests cost?",
      body: `<p>This is the part Defy publishes in detail. Its public lab site, ${ext(S.testDefy, "Test Defy")}, is open to any new customer, with "No Membership" and "Pay per test." It says you can "browse tests from $10." The prices below are the LabCorp versions listed on ${ext(S.testDefyMen, "the men's health pages")} on Nov 26, 2026.</p>
<table>
<thead><tr><th>Lab order</th><th>Listed price (LabCorp)</th></tr></thead>
<tbody>
<tr><td>Comprehensive Hormone and Wellness Lab Panel for Men (initial)</td><td>$299</td></tr>
<tr><td>Follow-up TRT Lab Panel for Men</td><td>$275</td></tr>
<tr><td>Heart Health Lab Panel + Follow-up TRT Lab Panel for Men</td><td>$459</td></tr>
<tr><td>Ultra Comprehensive Wellness Panel for Men</td><td>$599</td></tr>
<tr><td>Testosterone, free and total</td><td>$39</td></tr>
<tr><td>Testosterone, free, direct</td><td>$20</td></tr>
<tr><td>Estradiol, sensitive (LC/MS)</td><td>$39</td></tr>
<tr><td>SHBG</td><td>$44</td></tr>
<tr><td>PSA, serum</td><td>$24</td></tr>
<tr><td>CBC with differential</td><td>$20</td></tr>
<tr><td>CMP-14</td><td>$20</td></tr>
<tr><td>Lipid panel</td><td>$20</td></tr>
<tr><td>LH</td><td>$20</td></tr>
<tr><td>FSH</td><td>$34</td></tr>
<tr><td>DHEA-sulfate</td><td>$33</td></tr>
<tr><td>Prolactin</td><td>$39</td></tr>
<tr><td>Semen analysis</td><td>$200</td></tr>
<tr><td>Mobile phlebotomy add-on (Getlabs)</td><td>$125</td></tr>
</tbody>
</table>
<p>Source: ${ext(S.testDefyMen, "Test Defy men's health pages")} and ${ext(S.testDefy, "home page")}, no revision date shown, read Nov 26, 2026. The follow-up panel covers a metabolic panel (CMP-14), CBC, lipid panel, PSA, free and total testosterone, DHEA-sulfate, TSH, sensitive estradiol, SHBG and IGF-1, per its ${ext(S.panel, "store listing")}. We did not read the contents of the initial panel.</p>
<p>Two limits. These are public list prices; Defy's patient store hides prices from signed-out visitors, and we did not check whether a patient pays the same. And only the LabCorp versions were read; other lab versions exist.</p>
<p>Some arithmetic of ours, not a Defy price: the $299 initial panel plus one $275 follow-up is $574. Defy's Terms require labs at least once every 6 months, so about two follow-up panels a year would be 2 x $275 = $550, or roughly $46 a month. Do not add that to Defy's "under $175" estimate, because the estimate already includes labs. Our <a href="/trt/articles/trt-blood-work">TRT blood work guide</a> explains what the markers on a panel like this are for.</p>`,
    },
    {
      heading: "Is there a subscription at Defy Medical?",
      body: `<p>No, by Defy's own account. Its TRT page says "No Subscriptions or Contracts. You control your schedule and cost decisions, and only pay for what you need." The cost FAQ says Defy "does not charge a monthly fee, and charges are due at the time that the service is purchased" (${ext(S.trtPage, "TRT page")}, ${ext(S.faqCost, "FAQ")}, read Nov 26, 2026). The Terms contain no subscription clause.</p>
<p>That makes cancelling simple on paper, since there is no plan to cancel. What you can still lose money on is an appointment: appointments cancelled less than 24 hours ahead "may result in you being required to pay the full cost of the consultation fee," and a no-show is "subject to pay the full cost of the consultation fee" (Terms, effective April 2, 2026). The fee amount is not published.</p>
<p>Defy "does not accept insurance of any kind," and will provide a superbill on request for out-of-network claims. Whether a claim is paid is up to your plan; see <a href="/trt/articles/is-trt-covered-by-insurance">whether TRT is covered by insurance</a>.</p>`,
    },
    {
      heading: "Does Defy Medical give refunds?",
      body: `<p>Mostly no. The Terms state "ALL SALES ARE FINAL," with exceptions for the credits and lab refund sections. The table lists what each document says.</p>
<table>
<thead><tr><th>What was bought</th><th>What Defy's documents say</th><th>Source</th></tr></thead>
<tbody>
<tr><td>Appointments and consultations</td><td>Not refundable solely because of the outcome or because no treatment was recommended or given</td><td>Terms, Apr 2, 2026</td></tr>
<tr><td>Medication and supplies</td><td>No refund once dispensed from the pharmacy; cannot be returned once they leave it</td><td>Terms, Apr 2, 2026</td></tr>
<tr><td>Lab orders already used</td><td>No refund once the service is provided, even if you do not qualify for treatment</td><td>Terms, Apr 2, 2026</td></tr>
<tr><td>Unused lab orders</td><td>Valid 12 months from purchase; refund only before specimens are submitted, as store credit on request minus a $25 processing fee</td><td>Terms, Apr 2, 2026</td></tr>
<tr><td>Unused lab orders</td><td>Valid 3 months from purchase; refund to the original payment method within 90 days; store credit minus a $25 fee from day 91 to 180</td><td>Clinical Procedures page, no date shown</td></tr>
<tr><td>Billing errors</td><td>May be fixed with an account credit; credits do not expire. Defy Points expire in 120 days and have no monetary value</td><td>Terms, Apr 2, 2026</td></tr>
</tbody>
</table>
<p>Sources: ${ext(S.terms, "Terms of Service")} and ${ext(S.procedures, "Clinical Procedures page")}, read Nov 26, 2026.</p>
<p><strong>The two lab terms conflict.</strong> The Terms give a 12-month validity and a store credit minus $25. The Clinical Procedures page gives 3 months, with a cash refund to the original payment method inside 90 days. We cannot tell from the pages which one governs, and we are not picking. The Terms carry an effective date; the Clinical Procedures page shows none. Before buying a lab order, ask Defy which terms apply and get the answer in writing. A third page, the public lab site, says an order "is valid for up to one year" (${ext(S.testDefy, "Test Defy")}).</p>`,
    },
    {
      heading: "How often does Defy Medical require labs and visits?",
      body: `<p>More often than a one-time prescription would suggest, and the schedule is written down. The requirements below are quoted from the Terms (effective April 2, 2026, read Nov 26, 2026).</p>
<table>
<thead><tr><th>Requirement</th><th>How often</th></tr></thead>
<tbody>
<tr><td>Consult with a Defy provider</td><td>At least once every 6 months</td></tr>
<tr><td>Required lab testing</td><td>At least once every 6 months; follow-up blood work at least twice a year</td></tr>
<tr><td>Signed physical exam form</td><td>At least once every 24 months</td></tr>
<tr><td>Out-of-state patients</td><td>Current, updated physical exam every 2 years</td></tr>
<tr><td>Refill requests</td><td>Each one reviewed and approved by the practitioner</td></tr>
</tbody>
</table>
<p>Two more terms matter. Follow-ups "may require additional cost for the patient." And if you do not complete requested follow-ups, the practitioner "at his/her discretion, will discontinue my therapy until requested follow-up is completed." Before the first prescription, Defy says it requires comprehensive lab work and an up-to-date physical exam, and its Terms state that no prescription will be provided unless a clinical need exists. Labs return in "around 5-10 business days on average" per its ${ext(S.labsPage, "lab page")}, which elsewhere says 5-7.</p>
<p>For what those labs measure, see <a href="/trt/articles/trt-blood-work">our blood work guide</a>. What Defy does not publish is the price of the consult that goes with each visit.</p>`,
    },
    {
      heading: "Who prescribes at Defy Medical, and which pharmacies fill orders?",
      body: `<p>Defy says its providers are licensed and treat patients "under the guidance of lead practicing physician Dr. Justin Saya," its medical director (${ext(S.trtPage, "TRT page")}, ${ext(S.faqLegit, "FAQ")}). The TRT page lists injectable, topical, pellet and nasal-gel testosterone, plus supplemental medication that "can help with testicular health, fertility, estrogen levels, sex drive."</p>
<p>Defy "does not create or ship medications directly." It sends your order to a pharmacy in its network, which makes and ships it and sends tracking (${ext(S.faqShip, "shipping FAQ")}). Its ${ext(S.pharmacies, "pharmacy contact page")} calls them "approved compounding pharmacies" and lists APS Pharmacy (Palm Harbor, FL), Empower Pharmacy (Houston, TX) and Hallandale Pharmacy (Fort Lauderdale, FL). Its ${ext(S.storeTerms, "store terms")} (effective February 19, 2026) mention "affordable access to compounded medications."</p>
<p><strong>Compounded medicines are not FDA-approved.</strong> Defy says its pharmacies "utilize FDA-approved active ingredients," which describes an ingredient, not an approved product. Defy does not say which individual products are compounded, so we make no claim about any specific testosterone product.</p>
<p>Testosterone is a controlled substance. Defy's Terms say it does not send controlled-substance prescriptions across state lines to retail pharmacies in other states. Federal telehealth rules for testosterone are changing at the end of 2026; they are covered, with their own dates and sources, in our guide to <a href="/trt/articles/online-trt-dea-deadline-2026">the DEA deadline for online TRT</a>.</p>`,
    },
    {
      heading: "What we could not verify about Defy Medical",
      body: `<ul>
<li>Which states Defy serves. It says "most states" and publishes no list.</li>
<li>The price of testosterone, hCG, anastrozole or any other medication, the consult fee, and the shipping fee or speed. None is public.</li>
<li>Which products are compounded, and which pharmacy fills which product.</li>
<li>Starting dose and protocol. Defy states none on the pages we read.</li>
<li>How long approval takes. Provider pages do not say.</li>
<li>Whether a patient pays the same lab prices as the public lab site.</li>
<li>Defy's licensing. It publishes no state license number on the pages we read. A full-text search of ${ext(S.fdaLetters, "FDA's warning-letters database")} for "Defy Medical" and "Defy" returned no letter to Defy on Nov 26, 2026. We did not check state medical boards. That is "none found in the sources checked," not a clean record.</li>
</ul>
<p>Defy's statements that it is "a licensed clinic" operating "in compliance with all federal and state telemedicine regulations," and that its lab pricing saves "an average of 92% off the retail price," are the company's own claims. We did not verify them. We left out the testimonial and review-count widgets on Defy's pages.</p>`,
    },
    {
      heading: "How does Defy Medical fit with other online TRT options?",
      body: `<p>It sits at the pay-per-service end: no membership, itemized labs, and medication prices that sit behind a sign-in. Clinics that bundle testing, medication and follow-up into one monthly fee make the all-in cost easier to compare, and that is the trade-off to weigh. Our <a href="/trt/cheapest-online-trt">cheapest online TRT clinics</a> page and the <a href="/trt/articles/best-online-trt-clinics-compared">online TRT clinic comparison</a> cover the bundled options, and <a href="/trt/articles/how-to-get-trt-online">how to get TRT online</a> walks through the standard steps. For a lab-led alternative, see our <a href="/trt/reviews/marek">Marek Health review</a> or our top pick, <a href="/trt/reviews/hone">Hone Health</a>. We did not re-read either provider's terms for this review, so we draw no price comparison here.</p>
<p>Questions to settle with Defy before paying: the total in writing for medication, consults and shipping; which lab refund terms apply to your order; and what a follow-up costs. This page is general information, not medical advice. Whether TRT is right for you is a decision for a licensed clinician after labs.</p>`,
    },
  ],
};
