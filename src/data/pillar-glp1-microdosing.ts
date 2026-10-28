import type { Article } from "./articles";
import { microdosingSectionsA } from "./pillar-glp1-microdosing/sections-a";
import { microdosingSectionsB } from "./pillar-glp1-microdosing/sections-b";
import { microdosingSectionsC } from "./pillar-glp1-microdosing/sections-c";

// ───── Pillar guide: GLP-1 microdosing (2026) ─────
// The long-form reference for the most-searched and least-evidenced GLP-1
// trend of 2026. Every clinical figure carries a dated, linked source inline
// (trial reports, labels, the 2026 records study, the OMA statement, FDA
// pages and alerts). Figures that reach us through press coverage, conference
// reporting or company statements are labelled as reported, with outlet and
// date. Every provider price is the verified price index
// (PRICE_INDEX_VERIFIED, October 16, 2026) or a program's published price as
// captured on the dated page linked. No fractional-dose schedules are
// published here: none has been tested, and the FDA's dosing-error reports
// are largely about people measuring small volumes from vials.
//
// Sections live in ./pillar-glp1-microdosing/ (three files, ~4,000 words
// each) and one site-data section is inline below.

const siteReviewSection: Article["sections"][number] = {
  heading: "What the customer reviews on this site say about dosing at telehealth providers",
  body: `<p>One source of evidence about low doses in practice is not a trial at all: the reviews we transcribe from each provider's Trustpilot profile and group into themes on our review pages. Dosing comes up in them, and the pattern is instructive for anyone thinking about a lower dose through a telehealth program.</p>
<h3>Three recurring dose complaints</h3>
<p>On the <a href="/weight-loss/reviews/ro">Ro review</a>, a small group of reviewers describe dosing decided before any conversation: being restarted at the lowest dose after a higher one elsewhere, choosing a medication and being charged before physician input, and a smaller starting dose than friends received. On the <a href="/weight-loss/reviews/medvi">Medvi review</a>, reviewers transferring from another provider describe being sent a starting dose instead of their current one, with a five-star reviewer noting that the doctor spotted and fixed the same mistake. On the <a href="/weight-loss/reviews/embody">embody review</a>, the most serious complaints in the stored set are a prescription that arrived at roughly triple the expected dose, a next order placed at a different dose than discussed, and a formulation mixed with another ingredient unless the patient asked otherwise. Each of these is a handful of reviews among dozens, counted on the review page from the stored set, and each provider's praise themes are larger than its complaint themes.</p>
<h3>Why it matters for a lower dose</h3>
<p>Every one of those complaints is about the dose that arrived not matching the dose that was discussed. That is the ordinary failure mode of mail-order prescribing, and a lower-than-labelled dose adds two more places for it to happen: the prescription itself, where a fraction of a milligram has to be written and filled correctly, and the vial, where it has to be drawn correctly. A program whose reviews already describe dose mismatches at labelled doses is not a program to trust with an unlabelled one. The counts behind each theme, with the reviewers' own words, are on the review pages, and the <a href="/weight-loss/how-we-rank#customer-reviews">methodology page</a> explains how they are collected.</p>
<h3>What the praise themes say</h3>
<p>The other side of the same reviews is relevant too. The most-mentioned praise theme at embody, Medvi and Found is clinicians who take time, explain dosing and adjust the plan when asked; at welludr and Eden it is support staff who fix a problem by name. Those are the providers where a conversation about a lower dose is most likely to be a conversation. The <a href="/weight-loss/how-to-choose-a-glp1-provider">provider-choosing guide</a> sets out how to check clinician involvement before you sign up.</p>`,
};

export const pillarGlp1Microdosing: Article = {
  slug: "glp1-microdosing-complete-guide",
  title: "GLP-1 Microdosing in 2026: What the Evidence Actually Shows",
  description:
    "What GLP-1 microdosing is, who does it and why, what the dose-response trials and the one low-dose study show, SURMOUNT-MAINTAIN, real costs and the FDA view.",
  category: "Guide",
  readTime: "55 min read",
  publishedAt: "2026-10-26",
  updatedAt: "2026-10-26",
  heroColor: "#EEF3F8",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "About one in seven injectable GLP-1 users has 'microdosed', taking semaglutide or tirzepatide below or stuck at the lowest labelled dose, mostly to manage side effects (40.8%), cut cost (31.9%) or hold weight (29.6%), per Evidation's 2026 survey; more than a third decide the dose without a provider and about half use compounded vials.",
    "No randomized trial has tested a dose below the starting dose for any outcome. The one real-world study (Biology Methods and Protocols, August 31, 2026) found people who stayed on the lowest approved doses for a year lost 2.2% (semaglutide) to 5.5% (tirzepatide) of body weight, against roughly 15% to 21% at full doses in the trials, with fewer side effects at the low dose.",
    "The tested way to take less is a labelled maintenance dose, not a microdose: in SURMOUNT-MAINTAIN (The Lancet, May 2026), dropping to 5 mg of tirzepatide after a 60-week course kept about 70% of the loss over a year, with a quarter of participants needing the dose raised again; placebo kept far less.",
    "Microdosing rarely saves money and carries a specific risk. At four of the nine providers in our verified index a lower dose costs the same as a full one, and the best-known microdose program's $199 a month is more than a full dose at welludr ($49), embody ($49), altRx ($89) or Medvi ($99). The FDA's adverse-event reports for compounded GLP-1s are largely dosing errors from drawing small volumes from vials, some five to twenty times the intended dose.",
  ],
  sections: [...microdosingSectionsA, ...microdosingSectionsB, siteReviewSection, ...microdosingSectionsC],
};
