import type { Article } from "./articles";
import { galleryFigureHtml } from "./provider-gallery";

// ───── How to start GLP-1 treatment online (Nov 5, 2026) ─────
// Answers the "semaglutide intake process" / "start glp-1 online" /
// "online glp-1 prescription" cluster. What sets it apart: the steps are
// illustrated with operator-captured screenshots of real provider intake
// pages (welludr, altRx, embody; captured Nov 5, 2026), each captioned
// with the provider as the source of every claim it shows. Slides that show
// a price are refused by galleryFigureHtml, so no screenshot here can go
// stale against the price index; prices are linked, not quoted. Eligibility
// and dosing facts come from the FDA labels and the SURMOUNT-1 paper.
// Neutral by design: the screenshots show how the process works, not which
// provider to pick.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  wegovyLabel: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/215256s000lbl.pdf",
  surmount1: "https://pubmed.ncbi.nlm.nih.gov/35658024/",
  fdaCompounding: "https://www.fda.gov/drugs/human-drug-compounding",
};

export const howToStartGlp1OnlineArticle: Article = {
  slug: "how-to-start-glp1-treatment-online",
  title: "How to Start GLP-1 Online: The Intake Process, Step by Step",
  description:
    "What starting semaglutide or tirzepatide online involves: eligibility, intake questions, clinician review, pharmacy and first dose, with real screenshots.",
  category: "Guide",
  readTime: "8 min read",
  publishedAt: "2026-11-05",
  updatedAt: "2026-11-05",
  heroColor: "#EEF3F8",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "Starting online follows the same order at almost every provider: an eligibility check, a medical questionnaire, a licensed clinician's review, then a prescription filled by a licensed pharmacy and shipped to you.",
    "The usual starting point is the FDA label: a BMI of 30 or more, or 27 or more with at least one weight-related condition. The clinician makes the final decision and can say no.",
    "Have your height and weight, your medical history, a list of current medications and any recent lab results ready; the questionnaire itself usually takes a few minutes.",
    "Treatment starts at a low dose that is raised every four weeks, so the first month is about getting used to the medication, not about the scale.",
  ],
  sections: [
    {
      heading: "How do you start GLP-1 treatment online?",
      body: `<div class="qa"><strong>The short answer</strong>Pick a licensed telehealth provider, answer its online health questionnaire (height, weight, medical history, current medications), and a licensed clinician reviews your answers. If they decide semaglutide or tirzepatide is appropriate, they write a prescription, a licensed pharmacy fills it and the medication ships to your door. You start on a low dose that is raised step by step. No office visit is needed, but a prescription always is.</div><p>This guide walks through each step with screenshots of real provider sites, captured on November 5, 2026, so you can see what the screens look like before you start. The screenshots show how each provider presents its own process; every claim in them is the provider's, not ours. Providers change their sites, so details may differ by the time you read this.</p>`,
    },
    {
      heading: "Step 1: Check whether you are likely to qualify",
      body: `<p>Online providers start from the same criteria as the FDA labels: adults with a BMI of 30 or more, or 27 or more with at least one weight-related condition such as high blood pressure, type 2 diabetes or high cholesterol, per the ${ext(S.wegovyLabel, "Wegovy prescribing information")}. Our <a href="/weight-loss/glp1-bmi-calculator">BMI and GLP-1 eligibility check</a> tells you where you stand in under a minute, and our guide to <a href="/weight-loss/articles/who-qualifies-for-glp1-weight-loss">who qualifies for GLP-1 medication</a> covers the details.</p><p>Most provider homepages put this check up front. welludr's, for example, leads with an eligibility quiz:</p>${galleryFigureHtml("wellmedr", "welludr-homepage.webp")}<p>Meeting the BMI threshold does not guarantee a prescription. Some conditions rule these medications out: the labels carry a warning against use with a personal or family history of medullary thyroid carcinoma or multiple endocrine neoplasia type 2, and the questionnaire will ask about pregnancy or plans to become pregnant.</p>`,
    },
    {
      heading: "Step 2: Choose a provider",
      body: `<p>You choose the provider before the intake, because each one runs its own questionnaire and sets its own prices and terms. The things worth comparing are the medication offered (compounded or brand-name, semaglutide or tirzepatide), the verified monthly price and the condition attached to it, whether the lowest price needs a prepaid plan, what happens if you are not approved, and how cancellation works. Our <a href="/weight-loss/how-to-choose-a-glp1-provider">guide to choosing a GLP-1 provider</a> lists the checks, the <a href="/weight-loss/glp1-price-changes">GLP-1 price tracker</a> has every provider's current verified price, and it is worth reading <a href="/weight-loss/articles/before-you-prepay-glp1">what to check before you prepay</a>.</p><p>Providers explain their process differently, but the order is the same. altRx sums it up in three steps:</p>${galleryFigureHtml("altrx", "altrx-how-it-works.webp")}`,
    },
    {
      heading: "Step 3: Complete the online health questionnaire",
      body: `<p>The intake is a set of screens asking about your body, your health and your goals. Expect questions on:</p><ul><li>Height and weight, used to calculate your BMI</li><li>Weight-related conditions, such as blood pressure, blood sugar or cholesterol</li><li>Your medical history, including thyroid, pancreas, gallbladder and kidney conditions</li><li>Current medications and supplements, and any past weight-loss medication</li><li>Pregnancy, breastfeeding or plans to become pregnant</li><li>Contact and shipping details, and sometimes an ID check</li></ul>${galleryFigureHtml("wellmedr", "welludr-bmi-step.webp")}<p>Answer accurately. The clinician's decision, and your safety, depend on it, and an answer that leaves out a condition or a medication can lead to a prescription that is wrong for you. Having a list of your medications and any recent lab results to hand makes the questionnaire quicker.</p>`,
    },
    {
      heading: "Step 4: A licensed clinician reviews your answers",
      body: `<p>A licensed clinician (a physician, nurse practitioner or physician assistant, depending on the provider and state) reviews your intake and decides whether a GLP-1 is appropriate, which medication and what starting dose. They may message you with follow-up questions, ask for recent lab work or arrange a video or phone visit; requirements differ by provider and by state. They can also decline, and a legitimate provider will.</p><p>welludr's site shows what happens after its intake, from plan activation to the clinician building the treatment plan:</p>${galleryFigureHtml("wellmedr", "welludr-next-steps-1-2.webp")}<p>Before you pay, check what happens to your money if you are not approved, because the terms differ: embody, for example, says it refunds you in full if you are not approved.</p>`,
    },
    {
      heading: "Step 5: The pharmacy fills your prescription and ships it",
      body: `<p>Once prescribed, the order goes to a licensed pharmacy. Compounded semaglutide and tirzepatide are prepared by state-licensed compounding pharmacies, a regulated channel the FDA describes on its ${ext(S.fdaCompounding, "human drug compounding")} pages; compounded drugs are not FDA-approved. Brand-name Wegovy or Zepbound come from the manufacturer through a regular pharmacy. The medication usually arrives in an insulated package with supplies and instructions:</p>${galleryFigureHtml("altrx", "altrx-what-arrives.webp")}<p>Delivery speed varies a lot between providers. Our <a href="/weight-loss/glp1-shipping-times">shipping times comparison</a> sets each provider's published promise next to what customers report. Refills follow the same route; welludr, for example, says it ships the next supply before you run out:</p>${galleryFigureHtml("wellmedr", "welludr-next-steps-3-4.webp")}`,
    },
    {
      heading: "Step 6: Your first dose and the dose schedule",
      body: `<p>You start low. Semaglutide is raised every four weeks over 16 weeks to the 2.4 mg maintenance dose, per the ${ext(S.wegovyLabel, "Wegovy prescribing information")}, and tirzepatide was raised over a 20-week escalation period in ${ext(S.surmount1, "SURMOUNT-1")}. Your clinician sets your actual schedule and may hold or slow increases if side effects are hard to manage. Our <a href="/weight-loss/glp1-dose-schedule">dose schedule timeline</a> maps the labelled steps onto a calendar.</p><p>The first weeks are mostly about adjustment: appetite usually changes before the scale does, and nausea is most common around dose increases. Read <a href="/weight-loss/articles/first-month-weight-loss-medication">what to expect in your first month</a> and the <a href="/weight-loss/articles/semaglutide-side-effects-guide">side effects guide</a> before your first injection. For what the trials found over the longer run, see <a href="/weight-loss/articles/glp1-weight-loss-results">how much weight people lose on GLP-1s</a>.</p>`,
    },
    {
      heading: "Step 7: Check-ins, dose changes and refills",
      body: `<p>Treatment is ongoing, so the relationship with the provider matters after the first box arrives. Expect periodic check-ins (a form or a message with your weight and any side effects) before each dose increase or refill, and a way to reach the care team between them. Providers describe their support differently; embody, for example, lists 24/7 messaging and the option to pause or adjust:</p>${galleryFigureHtml("embody", "embody-whats-included.webp")}<p>If you want to stop, pause or switch provider later, our guide to <a href="/weight-loss/switch-from-ozempic">switching GLP-1 providers or medications</a> covers how to do it without a gap, and <a href="/weight-loss/articles/stopping-glp1-medication-what-happens">what happens when you stop</a> explains why that decision belongs with your prescriber.</p>`,
    },
    {
      heading: "How long does it take to get started?",
      body: `<p>The questionnaire itself usually takes a few minutes; the three providers in the screenshots above say 2 to 3 minutes. After that, the time to your first dose is the clinician's review plus shipping, and both vary: a review can be finished the same day or take longer if the clinician needs more information or labs, and shipping ranges from a day or two to about a week depending on the provider. Ask the provider for its current review and shipping times if timing matters to you.</p>`,
    },
    {
      heading: "What are the warning signs of an unsafe online GLP-1 seller?",
      body: `<ul><li><strong>No medical questions, or a prescription "guaranteed".</strong> A legitimate provider asks about your health and lets a clinician decline.</li><li><strong>No prescription needed.</strong> Semaglutide and tirzepatide are prescription-only in the US; a seller that skips the prescription is not operating legally.</li><li><strong>"Research use only" or "not for human consumption" labels.</strong> These products are not made for patients.</li><li><strong>No named, licensed pharmacy.</strong> You should be able to find out which licensed pharmacy fills your order.</li><li><strong>Prices with no conditions shown.</strong> A low price that turns out to need a long prepaid plan should be disclosed up front; compare with the verified conditions on our <a href="/weight-loss/cheapest-glp1">cheapest GLP-1 comparison</a>.</li></ul><p>For a full walkthrough of the legal route, see <a href="/weight-loss/articles/can-you-get-ozempic-without-doctor">whether you can get Ozempic without a doctor</a> (no, but you can without an office visit).</p>`,
    },
    {
      heading: "The bottom line",
      body: `<p>Starting GLP-1 treatment online comes down to seven steps: check you are likely to qualify, choose a provider on verified price and terms, answer the questionnaire accurately, let a licensed clinician decide, receive the medication from a licensed pharmacy, start at a low dose, and keep up with check-ins. The screens differ from one provider to the next, but the order and the safeguards should not. This article is general information, not medical advice; a licensed clinician decides whether a GLP-1 is right for you. For the full background on the online route, our <a href="/weight-loss/articles/glp1-weight-loss-online-complete-guide">complete guide to GLP-1 weight loss online</a> goes deeper.</p>`,
    },
  ],
};
