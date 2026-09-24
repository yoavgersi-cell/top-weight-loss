import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { ShieldCheck, Stethoscope, Search, AlertTriangle } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { GuideCluster } from "@/components/guide-cluster";
import { ProductCarousel } from "@/components/product-carousel";
import { TrustpilotCarousel } from "@/components/trustpilot-carousel";
import { RedditThreadCarousel, REDDIT_COMMUNITY_FEEDBACK } from "@/components/reddit-community";
import { RichComparisonCard } from "@/components/rich-comparison-card";
import { rankedCardItems } from "@/components/top-providers-block";
import { MedicalSources } from "@/components/medical-sources";
import { getConfig } from "@/lib/config-store";
import { PRICE_INDEX, PRICE_INDEX_VERIFIED } from "@/lib/price-index";

export const revalidate = 60;

const CANONICAL = "https://www.treatmentshub.com/weight-loss/how-to-choose-a-glp1-provider";
const TITLE = "How to Choose a GLP-1 Provider (2026): 12 Things to Check Before You Sign Up";
const DESCRIPTION =
  "How to pick an online GLP-1 provider and tell which ones have real doctors involved: a 12-point checklist, a 10-provider table of clinician access, pharmacies, verified prices and Trustpilot records, plus what critics say about each.";
const PUBLISHED = "2026-09-24";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: CANONICAL, type: "article" },
};

// ───── The 12-point checklist ─────
// Every "how to verify" is something a reader can do themselves in minutes.
const CHECKLIST: { title: string; check: string; verify: string; redFlag: string }[] = [
  {
    title: "A licensed clinician who can say no",
    check: "Who reviews your intake - a physician, physician associate or nurse practitioner - and whether they are allowed to decline you.",
    verify: "Read the how-it-works page for the words \"licensed provider reviews\" and \"if appropriate\". A provider that refunds you when you are not approved (embody does) has, by definition, a real gate.",
    redFlag: "Instant approval, or a checkout page you reach before any health question is asked.",
  },
  {
    title: "A real medical intake",
    check: "Whether the questionnaire asks the questions a prescriber legally needs: personal or family history of medullary thyroid carcinoma or MEN 2, pancreatitis, pregnancy or plans to conceive, current medications.",
    verify: "Start the free assessment and stop before payment. If none of those questions appear, nobody is screening for the contraindications on the FDA label.",
    redFlag: "A three-question form that only asks your weight, height and card number.",
  },
  {
    title: "Async or live: know which you are buying",
    check: "Most telehealth GLP-1 care is asynchronous: you submit an intake, a clinician reviews it, you message afterward. That is legal and normal. Some providers add live video visits.",
    verify: "Medvi runs video visits with providers and scheduled monitoring, and embody reviewers describe scheduled appointments and video calls; the others in our ranking are intake-and-message models, some with a follow-up call if the clinician needs more information.",
    redFlag: "A site that implies a doctor \"consultation\" but never offers a way to reach one after the prescription.",
  },
  {
    title: "Which pharmacy fills it",
    check: "Compounded semaglutide and tirzepatide come from a compounding pharmacy, not the brand manufacturer. Ask whether it is a US state-licensed 503A pharmacy or a 503B outsourcing facility, and whether the provider names it.",
    verify: "Look for the pharmacy type on the site, or ask support before paying. LegitScript certification is an independent check that the pharmacy relationships are real; embody and HealthRx publish theirs.",
    redFlag: "A provider that will not tell you where the medication comes from, or ships from outside the US.",
  },
  {
    title: "Base form, not a salt",
    check: "The FDA has warned about compounded products made with semaglutide sodium or semaglutide acetate. Approved semaglutide is the base form, and legitimate compounders use the same.",
    verify: "Ask which form the pharmacy compounds. A legitimate provider answers in one line.",
    redFlag: "Evasion, or marketing that avoids the word \"compounded\" entirely.",
  },
  {
    title: "The real monthly cost",
    check: "Medication plus membership plus consultation plus shipping plus supplies. Then the difference between the intro price and the ongoing price.",
    verify: "Our price index prints every provider's published rate and the condition attached to it. Ro, for example, bills medication and membership separately; embody's $69 is the whole bill.",
    redFlag: "A headline price with an asterisk you cannot resolve before checkout.",
  },
  {
    title: "What happens to the price when your dose goes up",
    check: "GLP-1 treatment titrates upward over several months. Providers that price per dose quote the starter dose and re-bill you exactly when you are most committed.",
    verify: "Ask one question: \"At my maintenance dose, what do I pay?\" altRx, wellmedr, trimrx, DirectMeds, embody, HealthRx and Medvi all state a flat price at every dose.",
    redFlag: "\"From $X\" with no maintenance-dose figure anywhere on the site.",
  },
  {
    title: "Dose changes and refills",
    check: "How you request a dose change, how fast refills ship, and what happens if you transfer from another provider mid-treatment.",
    verify: "Read the refill and shipping terms. trimrx advertises unlimited check-ins; HealthRx and embody state their shipping windows; Medvi builds dose adjustments into monitoring.",
    redFlag: "No stated refill cadence, or a support address that is only a contact form.",
  },
  {
    title: "Cancellation and refunds",
    check: "Whether you can stop at any renewal, whether there is a minimum term, and what you get back if the clinician does not approve you.",
    verify: "embody refunds in full if not approved and has no commitment; trimrx has no long-term contract; wellmedr's $49 rate wants a 12-month plan; HealthRx charges $1,188 upfront. None of these is wrong, but you should know which one you are signing.",
    redFlag: "Auto-renew terms you can only find in the checkout fine print.",
  },
  {
    title: "The Trustpilot record, with the count",
    check: "The aggregate score means little without the volume behind it. Read the recurring themes in the low-star reviews, not the headline number.",
    verify: "We print rating and review count for every provider where we have verified the profile. Medvi's 4.3 across 14,821 reviews and embody's 3.8 across 8,398 are both real records; they tell different stories.",
    redFlag: "A perfect 5.0 on a handful of reviews, or a provider with no public review profile at all.",
  },
  {
    title: "What Reddit actually says",
    check: "Not \"Reddit says they're good or bad\", but the themes that repeat across independent posts: shipping delays, dose access, billing surprises, results.",
    verify: "We only quote threads we have verified. Where a provider has them, they are on its review page and summarized below.",
    redFlag: "A provider whose only mentions are its own promotional posts.",
  },
  {
    title: "Whether they are honest about compounded medication",
    check: "Compounded drugs are not FDA-approved products. A legitimate provider says so on the page, near the price, and does not call its vials \"generic Ozempic\".",
    verify: "Search the site for the disclosure. Every provider in our table carries one.",
    redFlag: "\"FDA-approved\" used to describe a compounded vial.",
  },
];

// ───── The provider table ─────
// Every cell is a verified statement from our review research or the price
// index. Where we have not verified something, the cell says so rather than
// guessing. Ordered by the ranking.
type Row = {
  id: string;
  clinician: string;
  visit: string;
  pharmacy: string;
  dosePricing: string;
  critics: string;
};
const ROWS: Row[] = [
  {
    id: "ro",
    clinician: "Qualified doctor reviews your assessment",
    visit: "Online assessment; doctor follow-up (reviewers describe a video call with an MD and messaging support)",
    pharmacy: "Ro's own integrated pharmacy; brand-name medication (Wegovy pill, Zepbound)",
    dosePricing: "Medication billed separately from the membership; insurance can apply",
    critics: "Trustpilot 3.9 across 6,690 reviews. Low-star reviews from the past week name three things: the $39 initial fee being for the consultation, not the medication, and a separate subscription charge on top of the monthly one; support by messaging only, with replies in 2-3 business days and no phone number; and delivery, including a 4-day delay that arrived with melted ice packs and no clear answer on whether to use it. One 2-star reviewer chose a medication and was charged before speaking to a physician. In the Reddit threads we verified, cost is the recurring friction.",
  },
  {
    id: "altrx",
    clinician: "Licensed provider (physician, physician associate or NP) with authority to decline",
    visit: "Online assessment, clinician review, messaging; pause or cancel anytime",
    pharmacy: "Licensed pharmacies in both lanes: compounded plans and a brand-name shelf (Ozempic, Zepbound, Wegovy)",
    dosePricing: "Flat at every dose; Buy Now, Pay Later available",
    critics: "Self-serve model with no coaching layer and no money-back promise. In one verified Reddit account the compounded additive blend caused dehydration that faded as levels dropped; another user waited more than a day for a script.",
  },
  {
    id: "embody",
    clinician: "Licensed medical practitioner reviews the intake, typically within a day",
    visit: "Online intake; reviewers describe scheduled provider appointments, including video calls, and dose-increase appointments",
    pharmacy: "US 503A compounding pharmacies; LegitScript-certified",
    dosePricing: "Flat monthly, no commitment; full refund if not approved",
    critics: "Trustpilot 3.8 across 8,398 reviews. The low-star reviews from the past week are specific: a doctor who missed three video appointments before a call four days late; a first dose that took 8 days against a 3-5 day promise, then a refill 3 days overdue; a billing dispute bounced between support agents with no resolution. The praise is equally specific: providers who listen, dose adjustments made, an account manager who fixed a broken portal. On Reddit the recurring line is 'great if you don't need to actually talk to anyone': same-day approvals and a switcher's order matched to their previous dose, against a refill flow one user couldn't find and support replies another called AI-generated.",
  },
  {
    id: "trimrx",
    clinician: "Licensed clinician review with genuine authority to decline",
    visit: "Online assessment; follow-up call if needed; unlimited check-ins",
    pharmacy: "Compounded only; pharmacy not named in our research",
    dosePricing: "Same price at every dose; no long-term contract, optional multi-month discounts",
    critics: "Trustpilot 3.7 across 5,670 reviews, the lowest aggregate in our ranking. The 2-star reviews from the past week are about fulfillment and billing, not the clinic: a box three days late with warm cold packs, a prepaid 6-month plan whose second shipment was 30 days overdue with chat and phone unanswered, a cancelled prescription that Affirm kept trying to bill, and one first order with someone else's prescription in the portal and a bill double the quoted price. The 5-star reviews from the same week praise intake clarity, communication and cold shipping. $149 sits well above the budget tier for the same molecule, with no guarantee behind it.",
  },
  {
    id: "shed",
    clinician: "Licensed clinician reviews the intake and can decline",
    visit: "100% online visit and checkout; health coaching on every plan",
    pharmacy: "Compounded semaglutide or tirzepatide; pharmacy not named in our research",
    dosePricing: "Monthly, 20% off month one; HSA/FSA",
    critics: "Trustpilot 4.6 across 1,134 reviews, one of the two highest aggregates in our ranking, and the recent reviews we captured are mostly about named support staff resolving issues. The exception is a 1-star from September describing charges that continued for months after stopping, AI-only chat support, and a refused refund of $1,200, now in a card dispute. At $199 it is the premium of the compounded market: you are paying for coaching and a results guarantee, not for the medication.",
  },
  {
    id: "wellmedr",
    clinician: "Licensed provider reviews the intake; approval is not automatic; a Medical Weight-Care Coach on every plan",
    visit: "Online intake, clinician review, coach support",
    pharmacy: "Regulated US pharmacy; Reddit commenters name its Florida pharmacy",
    dosePricing: "Same price at every dose; best rate on a 12-month plan, billed monthly",
    critics: "Trustpilot 4.6 across 1,919 reviews. The low-star reviews from September are almost all about reaching someone: an order stuck at \"delay in shipping\" for 8 days with support unable to find the account, a request unanswered after 24 hours, chat and phone going unanswered until an operations manager stepped in, one shipment that sat at the pharmacy for over a week. Several of those reviewers raised their rating after that call. One August reviewer states they were charged every 21 days rather than monthly; we have not verified wellmedr's billing cadence and are asking. The $49 rate requires the 12-month plan.",
  },
  {
    id: "medvi",
    clinician: "Licensed providers; can and do decline patients for whom treatment is not appropriate",
    visit: "Video visits with providers, scheduled monitoring, a dietician and care coaching",
    pharmacy: "Compounded; pharmacy not named in our research",
    dosePricing: "All-inclusive; no dose-based increases; HSA/FSA",
    critics: "Trustpilot 4.3 across 14,821 reviews, the largest verified base in our ranking. The 1-star reviews from September are serious and specific: a prepaid annual plan renewed after 11 shipments without notice, refunded only after BBB, FTC and state attorney-general complaints; a charge taken before any clinician contact, followed by a wrong-dose shipment and a refused refund; a transferring patient sent a starter dose repeatedly instead of the maintenance dose; communication stopping after five months and no cancellation confirmation across three calls. The 5-star reviews from the same week are about the video visits and nurse practitioners. One reviewer says tirzepatide tops out at 11.125 mg; we have not verified that. Not the cheapest semaglutide, and the $99 rate is promotional against $199.",
  },
  {
    id: "sprout",
    clinician: "Licensed-provider review before any prescription",
    visit: "Online intake; ships within 2 days of approval",
    pharmacy: "Compounded plans plus brand-name Wegovy; pharmacy not named in our research",
    dosePricing: "Monthly; $200 off the first month",
    critics: "Trustpilot 4.1 across 188 reviews, the smallest base among providers here. Recent reviews praise live, named support; the critical ones cite missing tracking notifications, a charge with no shipment after a skipped monthly check-in, thin injection instructions, and one hair-loss report on tirzepatide.",
  },
  {
    id: "directmeds",
    clinician: "Licensed physician reviews the intake and can decline",
    visit: "Online intake, physician review; no membership, cancel anytime",
    pharmacy: "Compounded; pharmacy not named in our research",
    dosePricing: "Flat $147 for either medication at any dose, injections or sublingual drops",
    critics: "No coaching layer and no brand-name shelf. The needle-free drops are a clinician-discretion format: the major trials studied injections.",
  },
  {
    id: "healthrx",
    clinician: "Independent US-licensed clinician in your state reviews your full history before any charge",
    visit: "Free two-minute assessment, clinician review, care-team check-ins",
    pharmacy: "Licensed 503A pharmacies; LegitScript certificate 50087439",
    dosePricing: "Plan price does not change with dose; $99/month is $1,188 prepaid for the year",
    critics: "You prepay twelve months before knowing how you tolerate the medication, and a newer brand means a thin public review record.",
  },
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "How do I know if a GLP-1 provider has real doctors?",
    answer:
      "Three signals you can check before paying: the intake asks the contraindication questions on the FDA label (thyroid cancer history, MEN 2, pancreatitis, pregnancy), the provider states that a licensed clinician reviews the intake and can decline you, and there is a way to reach that clinician after the prescription. A refund-if-not-approved policy, which embody offers, only exists where a real clinical gate exists.",
  },
  {
    question: "Is asynchronous telehealth (no video call) legitimate for GLP-1 prescriptions?",
    answer:
      "Yes. Most legitimate telehealth GLP-1 care is asynchronous: you complete a medical intake, a licensed clinician reviews it, and you communicate by messaging afterward. Video visits, which Medvi runs, add a live conversation but are not what makes a prescription legitimate. What matters is licensed review with authority to decline, and follow-up access.",
  },
  {
    question: "Are compounded semaglutide and tirzepatide safe?",
    answer:
      "Compounded drugs are not FDA-approved products, and the FDA has raised concerns about some compounded GLP-1s, including dosing errors and unapproved salt forms. The risk is managed by the pharmacy: a US state-licensed 503A pharmacy or 503B facility, compounding the base form, with a licensed prescriber. Ask the provider which pharmacy and which form; a legitimate one answers.",
  },
  {
    question: "What does a GLP-1 provider actually cost per month?",
    answer:
      "At verified published prices in our index, compounded semaglutide runs $49 to $199 a month and compounded tirzepatide $89 to $299, usually with the consultation and shipping included. Brand-name Wegovy, Zepbound and Ozempic run four figures a month cash. Always price the maintenance dose, not the starter dose, and add any membership billed separately.",
  },
  {
    question: "Which providers does this table not cover?",
    answer:
      "We do not currently review Mochi Health or Henry Meds for weight loss, and we cover Hims only in our hair-loss and TRT rankings, so they are absent rather than guessed at. The checklist applies to them exactly the same way.",
  },
  {
    question: "What should I do if a provider will not name its pharmacy?",
    answer:
      "Treat it as a no. Every provider in our table either names its pharmacy type or is marked as not named in our research, and you can ask support directly before paying. The FDA's BeSafeRx program covers the same principle for any online pharmacy: verify the license, do not guess.",
  },
];

export default async function HowToChooseGlp1ProviderPage() {
  const config = await getConfig("weight-loss");
  const cards = rankedCardItems(config);
  const priceById = new Map(PRICE_INDEX.map((r) => [r.providerId, r]));
  const rows = ROWS.map((r) => ({
    ...r,
    provider: config.providers.find((p) => p.id === r.id),
    price: priceById.get(r.id),
  })).filter((r) => r.provider);
  const redditProviders = cards.map((c) => ({ id: c.provider.id, name: c.provider.name })).filter((p) => REDDIT_COMMUNITY_FEEDBACK[p.id]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    author: { "@type": "Organization", name: "Treatments Hub Team", url: "https://www.treatmentshub.com" },
    publisher: { "@type": "Organization", name: "Treatments Hub", url: "https://www.treatmentshub.com" },
    mainEntityOfPage: CANONICAL,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.treatmentshub.com/weight-loss" },
      { "@type": "ListItem", position: 2, name: "How to Choose a GLP-1 Provider", item: CANONICAL },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  const ext = "font-semibold text-[#0C4B75] hover:underline";

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[960px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/weight-loss" }, { label: "How to Choose a GLP-1 Provider" }]} />
          <h1 className="max-w-[820px] text-[27px] font-extrabold leading-[1.15] text-[#191919] sm:text-[36px]">
            How to Choose a GLP-1 Provider: 12 Things to Check Before You Sign Up
          </h1>
          <p className="mt-3 max-w-[700px] text-[16px] leading-relaxed text-gray-500">
            Every telehealth site looks the same from the outside. This is how you tell which ones have a
            real clinician in the loop, which pharmacy fills the vial, and what the price really is at the
            dose you will end up on. Ten providers checked, with their verified prices, Trustpilot records
            and what critics say about each.
          </p>
          <LastUpdated date={PUBLISHED} className="mt-4" />
        </div>
      </div>

      <div className="mx-auto max-w-[960px] px-4 py-10 text-[16px] leading-[1.75] text-gray-800 sm:px-6">
        {/* The short answer */}
        <div className="mb-10 flex items-start gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
          <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" strokeWidth={2} />
          <div>
            <h2 className="mb-2 text-[18px] font-bold text-[#191919]">The short answer</h2>
            <p className="text-[15px] leading-[1.75] text-gray-600">
              Three things separate a real prescriber from a checkout page:{" "}
              <strong className="text-[#191919]">a licensed clinician who is allowed to say no</strong>,{" "}
              <strong className="text-[#191919]">a named, US-licensed pharmacy</strong>, and{" "}
              <strong className="text-[#191919]">a price that is the whole price at your maintenance dose</strong>.
              Every provider in our ranking passes the first test. The table below shows how each one
              handles the other two, and where the honest catches are.
            </p>
          </div>
        </div>

        {/* Which ones have real doctors */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[24px] font-bold text-[#191919]">Which ones actually have real doctors involved?</h2>
          </div>
          <p className="mb-4">
            The fair version of this question is not &ldquo;does a doctor exist somewhere&rdquo; but{" "}
            <strong className="text-[#191919]">&ldquo;can the clinician stop the sale?&rdquo;</strong> A
            legitimate telehealth prescriber runs a medical intake that asks the contraindication questions
            on the FDA label, has a licensed clinician review it with the authority to decline, and gives you
            a way to reach a clinician after the prescription. A prescription-only medication like{" "}
            <a href="https://medlineplus.gov/druginfo/meds/a618008.html" target="_blank" rel="noopener" className={ext}>semaglutide</a>{" "}
            cannot legally skip that step; a site that does is not a provider, whatever its homepage says.
          </p>
          <p className="mb-4">
            Two honest clarifications. First, most legitimate GLP-1 telehealth is{" "}
            <strong className="text-[#191919]">asynchronous</strong>: you submit the intake, a clinician
            reviews it, and you message afterward. That is normal and legal. Medvi is built around live video visits and scheduled monitoring, and embody's own
            reviewers describe scheduled provider appointments and video calls; the others are
            intake-and-message models, some with a follow-up call if the clinician needs more information. Second, the clinician
            and the pharmacy are separate questions. The prescriber decides whether you should be treated;
            the pharmacy decides what is in the vial. Check both.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Ask the contraindication questions?", "Thyroid cancer or MEN 2 history, pancreatitis, pregnancy plans, current medications. If the intake never asks, nobody is screening."],
              ["Can the clinician decline you?", "Look for \"if appropriate\" and refund-if-not-approved language. embody refunds in full when a provider does not approve treatment."],
              ["Can you reach them afterward?", "Messaging, check-ins or video: trimrx advertises unlimited check-ins, Medvi runs monitoring visits, HealthRx has care-team check-ins."],
            ].map(([h, b]) => (
              <div key={h} className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="mb-1 text-[14px] font-bold text-[#191919]">{h}</p>
                <p className="text-[13.5px] leading-relaxed text-gray-600">{b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The 12 checks */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <Search className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[24px] font-bold text-[#191919]">The 12 things to check</h2>
          </div>
          <ol className="space-y-4">
            {CHECKLIST.map((c, i) => (
              <li key={c.title} className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-2 flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0C4B75] text-[13px] font-bold text-white">{i + 1}</span>
                  <h3 className="text-[17px] font-bold leading-snug text-[#191919]">{c.title}</h3>
                </div>
                <div className="grid gap-3 pl-10 text-[14px] leading-relaxed sm:grid-cols-3">
                  <p className="text-gray-700"><span className="font-bold text-[#191919]">What to check: </span>{c.check}</p>
                  <p className="text-gray-700"><span className="font-bold text-[#191919]">How to verify: </span>{c.verify}</p>
                  <p className="text-gray-700"><span className="inline-flex items-center gap-1 font-bold text-red-700"><AlertTriangle className="h-3.5 w-3.5" strokeWidth={2.5} />Red flag: </span>{c.redFlag}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[14px] text-gray-500">
            Regulatory background for checks 4, 5 and 11:{" "}
            <a href="https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers" target="_blank" rel="noopener" className={ext}>FDA on compounding (503A and 503B)</a>,{" "}
            <a href="https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/medications-containing-semaglutide-marketed-type-2-diabetes-or-weight-loss" target="_blank" rel="noopener" className={ext}>FDA on semaglutide salt forms</a>,{" "}
            <a href="https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss" target="_blank" rel="noopener" className={ext}>FDA&rsquo;s concerns with unapproved GLP-1 drugs</a>, and{" "}
            <a href="https://www.fda.gov/drugs/buying-using-medicine-safely/besaferx-your-source-online-pharmacy-information" target="_blank" rel="noopener" className={ext}>BeSafeRx</a>{" "}
            on verifying any online pharmacy.
          </p>
        </section>

        {/* Provider table */}
        <section className="mb-12" id="provider-table">
          <h2 className="mb-2 text-[24px] font-bold text-[#191919]">Ten providers, checked against the list</h2>
          <p className="mb-4 text-[14px] text-gray-500">
            Every cell is a verified statement from our provider research or the{" "}
            <Link href="/weight-loss/glp1-weight-loss-statistics#price-index" className={ext}>price index</Link>{" "}
            (prices verified {PRICE_INDEX_VERIFIED}). Where we have not verified something, the cell says so. Ordered
            by our ranking, which is not the order of the prices. Mochi Health and Henry Meds are not in our
            coverage and are left out rather than guessed at.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[900px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {["Provider", "Clinician gate", "Visit type", "Pharmacy", "Semaglutide / mo", "Dose pricing", "Trustpilot"].map((h) => (
                    <th key={h} className="px-3 py-3 align-bottom font-bold text-[#191919]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <Fragment key={r.id}>
                  <tr className={`border-t border-gray-100 ${i % 2 === 1 ? "bg-gray-50/50" : ""}`}>
                    <td className="px-3 pt-3 pb-1 align-top font-semibold text-[#191919]">
                      <Link href={`/weight-loss/reviews/${r.provider!.id}`} className="hover:underline">{r.provider!.name}</Link>
                    </td>
                    <td className="px-3 py-3 align-top text-gray-700">{r.clinician}</td>
                    <td className="px-3 py-3 align-top text-gray-700">{r.visit}</td>
                    <td className="px-3 py-3 align-top text-gray-700">{r.pharmacy}</td>
                    <td className="px-3 py-3 align-top text-gray-700">
                      {r.price?.semaglutide ? (
                        <>
                          <span className="font-semibold text-[#191919]">{r.price.semaglutide.price}</span>
                          <span className="block text-[12px] text-gray-500">{r.price.semaglutide.note}</span>
                        </>
                      ) : (
                        <span className="text-gray-400">Not in price index</span>
                      )}
                    </td>
                    <td className="px-3 py-3 align-top text-gray-700">{r.dosePricing}</td>
                    <td className="px-3 py-3 align-top text-gray-700">
                      {r.provider!.trustpilotRating && r.provider!.trustpilotReviewCount ? (
                        <>
                          <span className="font-semibold text-[#191919]">{r.provider!.trustpilotRating}</span>
                          <span className="block text-[12px] text-gray-500">{r.provider!.trustpilotReviewCount} reviews</span>
                        </>
                      ) : (
                        <span className="text-gray-400">No aggregate verified</span>
                      )}
                    </td>
                  </tr>
                  {/* Critics line - full width under the row, so it reads as a
                      sentence instead of a narrow eighth column */}
                  <tr className={i % 2 === 1 ? "bg-gray-50/50" : ""}>
                    <td colSpan={7} className="px-3 pb-3 pt-0 text-[12.5px] leading-relaxed text-gray-600">
                      <span className="font-semibold text-[#191919]">What critics say: </span>
                      {r.critics}
                    </td>
                  </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Ranked cards with each provider's Trustpilot record */}
        <section className="mb-12">
          <h2 className="mb-2 text-[24px] font-bold text-[#191919]">Every provider we rank, with its Trustpilot record</h2>
          <p className="mb-6 text-[14px] text-gray-500">
            The same ranked cards as our full comparison. Under each card: the aggregate Trustpilot rating and count
            where we have verified the profile, and reviews we captured from it. We show what we verified, nothing more.
          </p>
          <div className="space-y-8">
            {cards.map(({ product, review, provider }) => (
              <div key={product.id}>
                <RichComparisonCard product={product} review={review} linkPrefix="/weight-loss" />
                {provider.trustpilotReviews && provider.trustpilotReviews.length > 0 && (
                  <div className="mt-3">
                    <TrustpilotCarousel
                      providerName={provider.name}
                      providerLogo={provider.logo}
                      reviews={provider.trustpilotReviews}
                      rating={provider.trustpilotRating}
                      reviewCount={provider.trustpilotReviewCount}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Reddit */}
        {redditProviders.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-2 text-[24px] font-bold text-[#191919]">What Reddit users report</h2>
            <p className="mb-4 text-[14px] text-gray-500">
              Verified threads only, good and bad alike, with the recurring themes summarized from the posts shown.
            </p>
            <RedditThreadCarousel providers={redditProviders} reviewHrefFor={(id) => `/weight-loss/reviews/${id}`} />
          </section>
        )}

        {/* Every plan */}
        <section className="mb-12">
          <ProductCarousel
            providers={config.providers}
            title="Every plan, at its published price"
            subtitle="Product by product, with the condition on each price printed under it. Verified against each provider's own site."
            pageUrl={CANONICAL}
          />
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="mb-6 text-[24px] font-bold text-[#191919]">Choosing a GLP-1 provider: FAQ</h2>
          <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {FAQS.map((f) => (
              <div key={f.question} className="p-6">
                <h3 className="mb-2 text-[16px] font-bold text-[#191919]">{f.question}</h3>
                <p className="text-[14px] leading-[1.7] text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="mb-10 text-[14px] text-gray-500">
          Related: our broader guide to{" "}
          <Link href="/weight-loss/articles/choosing-telehealth-weight-loss-provider" className={ext}>choosing a telehealth weight loss provider</Link>,{" "}
          the <Link href="/weight-loss/articles/compounded-semaglutide-vs-brand-name" className={ext}>compounded vs brand-name trade-offs</Link>, and{" "}
          <Link href="/weight-loss/how-we-rank" className={ext}>how we rank</Link>.
        </p>

        <GuideCluster currentSlug="how-to-choose-a-glp1-provider" />

        <MedicalSources vertical="weight-loss" />

        <p className="mt-6 text-[13px] leading-relaxed text-gray-400">
          Prices are the providers&rsquo; published cash-pay rates at our last verification and can change; confirm
          on the provider&rsquo;s site. Trustpilot figures are the public aggregate at the time we captured the
          profile. Compounded medications are not FDA-approved products. treatmentshub.com is not a medical
          provider; this page is for information only and is not medical advice.
        </p>
      </div>
    </div>
  );
}
