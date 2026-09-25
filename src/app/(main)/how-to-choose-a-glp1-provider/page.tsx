import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Stethoscope, Search, AlertTriangle, ClipboardList } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { GuideCluster } from "@/components/guide-cluster";
import { RedditThreadCarousel, REDDIT_COMMUNITY_FEEDBACK } from "@/components/reddit-community";
import { TrustpilotRating } from "@/components/trustpilot-rating";
import { MixedTrustpilotCarousel, type MixedReviewItem } from "@/components/trustpilot-carousel";
import { ProviderCta } from "@/components/provider-cta";
import { rankedCardItems } from "@/components/top-providers-block";
import { MedicalSources, TrustDisclosure } from "@/components/medical-sources";
import { getConfig } from "@/lib/config-store";
import { PRICE_INDEX, PRICE_INDEX_VERIFIED } from "@/lib/price-index";
import type { TrustpilotReview } from "@/lib/config";

export const revalidate = 60;

const CANONICAL = "https://www.treatmentshub.com/weight-loss/how-to-choose-a-glp1-provider";
const TITLE = "How to Choose a GLP-1 Provider (2026): 12 Things to Check Before You Sign Up";
const DESCRIPTION =
  "How to choose an online GLP-1 provider: a 12-point checklist, how involved a licensed clinician really is, and a 10-provider research table of clinician access, pharmacies, verified prices and Trustpilot records, plus what patients report on Reddit.";
const PUBLISHED = "2026-09-24";
const UPDATED = "2026-09-24";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: CANONICAL, type: "article" },
};

// ───── The 12-point checklist ─────
// Every "how to verify" is something a reader can do themselves in minutes.
// "Red flag" items are due-diligence prompts, not accusations: they name what
// to investigate or ask before paying.
const CHECKLIST: { title: string; check: string; verify: string; redFlag: string }[] = [
  {
    title: "A licensed clinician who can say no",
    check: "Who reviews your intake - a physician, physician associate or nurse practitioner - and whether they are allowed to decline you.",
    verify: "Read the how-it-works page for the words \"licensed provider reviews\" and \"if appropriate\". A refund-if-not-approved policy (embody publishes one) is a sign that declines actually happen.",
    redFlag: "Worth investigating: approval that appears instant, or a checkout page you reach before any health question is asked.",
  },
  {
    title: "A real medical intake",
    check: "Whether the questionnaire asks the questions a prescriber needs: personal or family history of medullary thyroid carcinoma or MEN 2, pancreatitis, pregnancy or plans to conceive, current medications.",
    verify: "Start the free assessment and stop before payment. If none of those questions appear, nobody is screening for the contraindications on the FDA label.",
    redFlag: "Ask before paying if the form only asks your weight, height and card details.",
  },
  {
    title: "Async or live: know which you are buying",
    check: "Most telehealth GLP-1 care is asynchronous: you submit an intake, a clinician reviews it, you message afterward. That is legal and normal. Some providers add live video visits.",
    verify: "Medvi describes video visits with providers and scheduled monitoring, and embody reviewers describe scheduled appointments and video calls; the others in our table describe intake-and-message models, some with a follow-up call if the clinician needs more information.",
    redFlag: "A site that describes a doctor \"consultation\" but states no way to reach a clinician after the prescription. Ask how follow-up works.",
  },
  {
    title: "Which pharmacy fills it",
    check: "Compounded semaglutide and tirzepatide come from a compounding pharmacy, not the brand manufacturer. Ask whether it is a US state-licensed 503A pharmacy or a 503B outsourcing facility, and whether the provider names it.",
    verify: "Look for the pharmacy type on the site, or ask support before paying. LegitScript certification is an independent check that the pharmacy relationships are real; embody and HealthRx publish theirs.",
    redFlag: "Worth investigating: a provider that will not say where the medication comes from, or ships from outside the US.",
  },
  {
    title: "Base form, not a salt",
    check: "The FDA has warned about compounded products made with semaglutide sodium or semaglutide acetate. Approved semaglutide is the base form, and legitimate compounders use the same.",
    verify: "Ask which form the pharmacy compounds. A legitimate provider answers in one line.",
    redFlag: "Worth investigating: an evasive answer about the form, or marketing that avoids the word \"compounded\" entirely.",
  },
  {
    title: "The real monthly cost",
    check: "Medication plus membership plus consultation plus shipping plus supplies. Then the difference between the intro price and the ongoing price.",
    verify: "Our price index prints every provider's published rate and the condition attached to it. Ro, for example, bills medication and membership separately; embody's $69 is the whole bill.",
    redFlag: "A headline price with a condition you cannot resolve before checkout. Ask for the full monthly total.",
  },
  {
    title: "What happens to the price when your dose goes up",
    check: "GLP-1 treatment titrates upward over several months. Providers that price per dose quote the starter dose and re-bill you exactly when you are most committed.",
    verify: "Ask one question: \"At my maintenance dose, what do I pay?\" altRx, wellmedr, trimrx, DirectMeds, embody, HealthRx and Medvi all state a flat price at every dose.",
    redFlag: "\"From $X\" with no maintenance-dose figure anywhere on the site. Ask what you pay at your maintenance dose.",
  },
  {
    title: "Dose changes and refills",
    check: "How you request a dose change, how fast refills ship, and what happens if you transfer from another provider mid-treatment.",
    verify: "Read the refill and shipping terms. trimrx advertises unlimited check-ins; HealthRx and embody state their shipping windows; Medvi builds dose adjustments into monitoring.",
    redFlag: "No stated refill cadence, or support reachable only through a contact form. Ask before paying.",
  },
  {
    title: "Cancellation and refunds",
    check: "Whether you can stop at any renewal, whether there is a minimum term, and what you get back if the clinician does not approve you.",
    verify: "embody refunds in full if not approved and has no commitment; trimrx has no long-term contract; wellmedr's $49 rate wants a 12-month plan; HealthRx charges $1,188 upfront. None of these is wrong, but you should know which one you are signing.",
    redFlag: "Auto-renew terms you can only find in the checkout fine print. Read them before you pay.",
  },
  {
    title: "The Trustpilot record, with the count",
    check: "The aggregate score means little without the volume behind it. Read the recurring themes in the low-star reviews, not the headline number.",
    verify: "We print rating and review count for every provider where we have verified the profile. Medvi's 4.3 across 14,836 reviews and embody's 3.8 across 8,398 are both real records; they tell different stories.",
    redFlag: "A perfect 5.0 on a handful of reviews, or no public review profile at all. Neither proves anything is wrong; both mean less evidence.",
  },
  {
    title: "What Reddit actually says",
    check: "Not \"Reddit says they're good or bad\", but the themes that repeat across independent posts: shipping delays, dose access, billing surprises, results.",
    verify: "We only quote threads we have verified. Where a provider has them, they are on its review page and summarized below.",
    redFlag: "A provider whose only mentions are its own promotional posts. Treat that as an absence of evidence, not a verdict.",
  },
  {
    title: "Whether they are honest about compounded medication",
    check: "Compounded drugs are not FDA-approved products. A legitimate provider says so on the page, near the price, and does not call its vials \"generic Ozempic\".",
    verify: "Search the site for the disclosure. Every provider in our table carried one on the pages we reviewed.",
    redFlag: "\"FDA-approved\" used to describe a compounded vial. That wording is inaccurate; ask the provider to clarify what it is selling.",
  },
];

// ───── The provider table ─────
// Every cell is a verified statement from our review research or the price
// index. Where we have not verified something, the cell says so rather than
// guessing. Ordered by the ranking. The review lines under each row separate
// their sources: the Trustpilot aggregate, individual Trustpilot reviews we
// captured, Reddit threads we verified, and the provider's own published claims.
type Row = {
  id: string;
  clinician: string;
  visit: string;
  pharmacy: string;
  dosePricing: string;
  /** Recurring positives in the reviews we captured, with the source named. */
  likes?: string;
  /** Recurring complaints in the reviews we captured, with the source named. */
  complaints?: string;
  /** Structural observations from our research where review evidence is thin. */
  note?: string;
};
const ROWS: Row[] = [
  {
    id: "ro",
    clinician: "Qualified doctor reviews your assessment",
    visit: "Online assessment; doctor follow-up (reviewers describe a video call with an MD and messaging support)",
    pharmacy: "Ro's own integrated pharmacy; brand-name medication (Wegovy pill, Zepbound)",
    dosePricing: "Medication billed separately from the membership; insurance can apply",
    likes: "The 5-star Trustpilot reviews from the same week are about sign-up (\"quick and easy\", \"exceptional in every respect\") and, in one, an NP appointment that ran on time. In the Reddit threads we verified, results of 22 to 60 pounds and a process one user called seamless.",
    complaints: "Low-star Trustpilot reviews from the past week name three things: the $39 initial fee being for the consultation, not the medication, and a separate subscription charge on top of the monthly one; support by messaging only, with replies in 2-3 business days and no phone number; and delivery, including a 4-day delay that arrived with melted ice packs. One 2-star reviewer chose a medication and was charged before speaking to a physician. On Reddit, cost is the recurring friction: the most upvoted commenter left over price after an otherwise good experience.",
  },
  {
    id: "altrx",
    clinician: "Licensed provider (physician, physician associate or NP) with authority to decline",
    visit: "Online assessment, clinician review, messaging; pause or cancel anytime",
    pharmacy: "Licensed pharmacies in both lanes: compounded plans and a brand-name shelf (Ozempic, Zepbound, Wegovy)",
    dosePricing: "Flat at every dose; Buy Now, Pay Later available",
    likes: "No public Trustpilot aggregate; the individual reviews we captured (4- and 5-star) credit fast sign-up and reachable support. In the verified Reddit thread, approval in about four hours and cold-shipped vials in two days, rated 10/10 by the poster.",
    complaints: "In the same Reddit thread, one user's compounded additive blend caused dehydration that faded as levels dropped, and another waited more than a day for a script. Structurally: a self-serve model with no coaching layer and no money-back promise.",
  },
  {
    id: "embody",
    clinician: "Licensed medical practitioner reviews the intake, typically within a day",
    visit: "Online intake; reviewers describe scheduled provider appointments, including video calls, and dose-increase appointments",
    pharmacy: "US 503A compounding pharmacies; LegitScript-certified",
    dosePricing: "Flat monthly, no commitment; full refund if not approved",
    likes: "Recent 5-star Trustpilot reviews describe providers who listen, dose adjustments made, and an account manager who fixed a broken portal. On Reddit: same-day approval, a vial within a week, and a switcher whose order was matched to their previous dose.",
    complaints: "Low-star Trustpilot reviews from the past week are specific: a doctor who missed three video appointments before a call four days late; a first dose that took 8 days against a 3-5 day promise, then a refill 3 days overdue; a billing dispute bounced between support agents. On Reddit the recurring line is \"great if you don't need to actually talk to anyone\": a refill flow one user couldn't find, and support replies another called AI-generated.",
  },
  {
    id: "trimrx",
    clinician: "Licensed clinician review with genuine authority to decline",
    visit: "Online assessment; follow-up call if needed; unlimited check-ins",
    pharmacy: "Compounded only; pharmacy not named in our research",
    dosePricing: "Same price at every dose; no long-term contract, optional multi-month discounts",
    likes: "The 5-star Trustpilot reviews from the same week praise a thorough screening, a clear intake, clear pricing, fast support replies and plainly labelled 2-3 day shipping.",
    complaints: "The 2-star reviews from the same week are about fulfillment and billing, not the clinic: a box three days late with warm cold packs, a prepaid 6-month plan whose second shipment was 30 days overdue with chat and phone unanswered, a cancelled prescription that Affirm kept trying to bill, and one first order with someone else's prescription in the portal. At 3.7 across 5,670 the aggregate is the lowest in our table. $149 sits above the budget tier for the same molecule, with no guarantee behind it.",
  },
  {
    id: "shed",
    clinician: "Licensed clinician reviews the intake and can decline",
    visit: "100% online visit and checkout; health coaching on every plan",
    pharmacy: "Compounded semaglutide or tirzepatide; pharmacy not named in our research",
    dosePricing: "Monthly, 20% off month one; HSA/FSA",
    likes: "The recent Trustpilot reviews we captured are mostly about named support staff resolving issues and a personal touch in communications; 4.6 across 1,134 is one of the two highest aggregates in our table.",
    complaints: "One 1-star review from September describes charges that continued for months after stopping, AI-only chat support, and a refused refund of $1,200, now in a card dispute. At $199 it is the premium of the compounded market: the price buys coaching and a results guarantee, not a different medication.",
  },
  {
    id: "wellmedr",
    clinician: "Licensed provider reviews the intake; approval is not automatic; a Medical Weight-Care Coach on every plan",
    visit: "Online intake, clinician review, coach support",
    pharmacy: "Regulated US pharmacy; Reddit commenters name its Florida pharmacy",
    dosePricing: "Same price at every dose; best rate on a 12-month plan, billed monthly",
    likes: "5-star Trustpilot reviews credit reaching a person within minutes, quick answers from named agents, and a smooth switch from another provider; several low-star reviewers raised their rating after an operations manager called. On Reddit, short verdicts: \"legit\", a named Florida pharmacy, and annual-plan prices that match the published rates.",
    complaints: "Low-star Trustpilot reviews from September are almost all about reaching someone: an order stuck at \"delay in shipping\" for 8 days with support unable to find the account, a request unanswered after 24 hours, chat and phone unanswered until a manager stepped in, one shipment that sat at the pharmacy for over a week. One August reviewer states they were charged every 21 days rather than monthly; we have not verified wellmedr's billing cadence. On Reddit, one detailed account was down only 1 pound after 8 weeks despite good service. The $49 rate requires the 12-month plan.",
  },
  {
    id: "medvi",
    clinician: "Licensed providers; can and do decline patients for whom treatment is not appropriate",
    visit: "Video visits with providers, scheduled monitoring, a dietician and care coaching",
    pharmacy: "Compounded; pharmacy not named in our research",
    dosePricing: "All-inclusive; no dose-based increases; HSA/FSA",
    likes: "The 5-star Trustpilot reviews from the same week are about the video visits and nurse practitioners: thorough calls, questions answered fully, a provider who \"took her time\". Two year-long Reddit write-ups report 40 pounds and just under 15% of body weight lost, with dose adjustments when progress stalled. 4.3 across 14,836 is one of the two largest verified bases in our table.",
    complaints: "The 1-star Trustpilot reviews from September are serious and specific: a prepaid annual plan renewed after 11 shipments without notice, refunded only after BBB, FTC and state attorney-general complaints; a charge taken before any clinician contact, followed by a wrong-dose shipment and a refused refund; a transferring patient sent a starter dose repeatedly; communication stopping after five months. One reviewer says tirzepatide tops out at 11.125 mg; we have not verified that. The 4-star reviews are milder: a cancellation that took effort and a wish for an every-other-month option, since plans are monthly-only. The $99 rate is promotional against $199, and Reddit users name the ongoing monthly cost as the caveat.",
  },
  {
    id: "sprout",
    clinician: "Licensed-provider review before any prescription",
    visit: "Online intake; ships within 2 days of approval",
    pharmacy: "Compounded plans plus brand-name Wegovy; pharmacy not named in our research",
    dosePricing: "Monthly; $200 off the first month",
    likes: "Recent 5-star Trustpilot reviews praise live, named support (\"a LIVE CS rep. No bots\"), easy pauses and plan changes, and one 20-pound result. 4.1 across 188 reviews is the smallest base among providers here.",
    complaints: "The 3- and 4-star reviews cite missing tracking notifications on most shipments, a charge with no shipment after a skipped monthly check-in, and thin injection instructions; one 1-star reports heavy hair loss on compounded tirzepatide. No Reddit threads verified yet.",
  },
  {
    id: "directmeds",
    clinician: "Licensed physician reviews the intake and can decline",
    visit: "Online intake, physician review; no membership, cancel anytime",
    pharmacy: "Compounded; pharmacy not named in our research",
    dosePricing: "Flat $147 for either medication at any dose, injections or sublingual drops",
    likes: "Trustpilot 4.6 across 15,690 reviews, the largest base in our table. The 4- and 5-star reviews from the past week are almost all about named support agents: a straightforward sign-up, prompt answers, a rep who fixed a problem on the spot. One 3-star reviewer says the company \"came through\" after a few issues and calls the prices reasonable.",
    complaints: "A 2-star review from September: an order stuck at \"Label Created\" until three phone calls, then damaged in transit, with the AI chat insisting it had been delivered. A 4-star reviewer could not access the doctor's message and would rather talk to reps than use the online account; a 3-star NAD customer received a two-week supply with no syringes. Structurally: no coaching layer and no brand-name shelf, and the needle-free drops are a clinician-discretion format - the major trials studied injections.",
  },
  {
    id: "healthrx",
    clinician: "Independent US-licensed clinician in your state reviews your full history before any charge",
    visit: "Free two-minute assessment, clinician review, care-team check-ins",
    pharmacy: "Licensed 503A pharmacies; LegitScript certificate 50087439",
    dosePricing: "Plan price does not change with dose; $99/month is $1,188 prepaid for the year",
    note: "No Trustpilot aggregate verified and no reviews captured; a newer brand with a thin public record. The structural trade-off is the prepayment: twelve months before knowing how you tolerate the medication.",
  },
];

// ───── Key patterns ─────
// Editorial synthesis drawn only from the rows above and the price index.
const PATTERNS: { title: string; body: string }[] = [
  {
    title: "Licensed review is the norm; access afterward is the variable",
    body: "Every provider in the table describes a licensed clinician reviewing the intake before a prescription. What differs is what happens next: Medvi describes live video visits and scheduled monitoring, trimrx advertises unlimited check-ins, embody reviewers describe scheduled appointments, and the rest are intake-and-message models. The complaints at ro, embody and wellmedr are about reaching someone, not about the review itself.",
  },
  {
    title: "The headline price rarely stands alone",
    body: "wellmedr's $49 requires a 12-month plan. HealthRx's $99 is $1,188 prepaid. Medvi's $99 and altRx's $89 are promotional rates against $199. Ro bills membership and medication separately. The condition attached to a price is as important as the number, which is why the price index prints both.",
  },
  {
    title: "Flat-dose pricing is common but not universal",
    body: "Seven of the ten - altRx, wellmedr, trimrx, DirectMeds, embody, HealthRx and Medvi - state one price at every dose. Ro prices medication separately from its membership, and SHED and Sprout publish monthly rates without a single every-dose figure in the material we reviewed. Because treatment titrates upward, the maintenance-dose price is the one to ask for.",
  },
  {
    title: "Pharmacy transparency varies more than clinician claims do",
    body: "embody and HealthRx name 503A pharmacies and publish LegitScript certification; Ro fills through its own pharmacy; altRx says licensed pharmacies without naming them; wellmedr says a regulated US pharmacy, and only Reddit commenters name it. For five providers - trimrx, SHED, Medvi, Sprout and DirectMeds - the pharmacy is not named in our research, so it is a question to ask support before paying.",
  },
  {
    title: "Review volume stabilizes a score; it does not make experiences uniform",
    body: "Medvi's 4.3 across 14,836 reviews sits alongside serious 1-star accounts about renewals and refunds. SHED and wellmedr's 4.6 averages come from roughly 1,100 and 1,900 reviews; Sprout's 4.1 from 188; trimrx (3.7) and embody (3.8) have large, mixed records. Across all of them the recurring complaints are operational - shipping, billing, reaching support - rather than about the clinical review.",
  },
];

// ───── Providers worth exploring further ─────
// Use-case labels, each supported by a row in the table above. Not a ranking:
// the full ranking lives on the comparison page this section links to.
const EXPLORE: Record<string, { useCase: string; reason: string }> = {
  embody: {
    useCase: "Transparent flat pricing with a named pharmacy model",
    reason: "One flat monthly price at every dose with no commitment, a full refund if a clinician does not approve you, and LegitScript-certified US 503A pharmacies named on the site.",
  },
  altrx: {
    useCase: "Flat-dose compounded pricing plus a brand-name shelf",
    reason: "Compounded semaglutide and tirzepatide flat at every dose, next to cash prices for Ozempic, Zepbound and Wegovy. No public Trustpilot aggregate, so weigh the individual reviews and the Reddit thread.",
  },
  medvi: {
    useCase: "Live clinician visits and one of the two largest review bases",
    reason: "Video visits with providers, scheduled monitoring and a dietician, with 4.3 across 14,836 Trustpilot reviews. The $99 rate is promotional against $199.",
  },
  wellmedr: {
    useCase: "Lowest verified semaglutide price, on a 12-month term",
    reason: "$49 a month semaglutide, the same at every dose, requires the 12-month plan billed monthly. A weight-care coach on every plan and 4.6 across 1,919 Trustpilot reviews.",
  },
};

const FAQS: { question: string; answer: string }[] = [
  {
    question: "How do I know if a GLP-1 provider has real doctors?",
    answer:
      "Reframe it as clinician involvement, because legitimate care may come from a licensed physician, physician associate or nurse practitioner depending on the service and state law. Three things you can check before paying: the intake asks the contraindication questions on the FDA label (thyroid cancer history, MEN 2, pancreatitis, pregnancy), the provider states that a licensed clinician reviews the intake and can decline you, and there is a stated way to reach a clinician after the prescription. A refund-if-not-approved policy, which embody publishes, is a sign that declines actually happen.",
  },
  {
    question: "Is asynchronous telehealth (no video call) legitimate for GLP-1 prescriptions?",
    answer:
      "Yes. Most legitimate telehealth GLP-1 care is asynchronous: you complete a medical intake, a licensed clinician reviews it, and you communicate by messaging afterward. Video visits, which Medvi describes, add a live conversation but are not what makes a prescription legitimate. What matters is licensed review with authority to decline, and follow-up access.",
  },
  {
    question: "Are compounded semaglutide and tirzepatide safe?",
    answer:
      "Compounded drugs are not FDA-approved products, and the FDA has raised concerns about some compounded GLP-1s, including dosing errors and unapproved salt forms. The risk is managed by the pharmacy: a US state-licensed 503A pharmacy or 503B facility, compounding the base form, with a licensed prescriber. Ask the provider which pharmacy and which form; a legitimate one answers. Talk to a clinician about whether any GLP-1 medication is appropriate for you.",
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
      "Ask support directly before paying, and treat a non-answer as a reason to look elsewhere. Every provider in our table either names its pharmacy type or is marked as not named in our research. The FDA's BeSafeRx program covers the same principle for any online pharmacy: verify the license, do not guess.",
  },
];

// Parse the stored "Sep 21, 2026" review dates so the evidence tiles can say
// how recent the captured reviews are. Undated reviews are simply skipped.
function latestReviewDate(reviews: TrustpilotReview[]): string | null {
  let best: Date | null = null;
  let label: string | null = null;
  for (const r of reviews) {
    if (!r.date) continue;
    const d = new Date(r.date);
    if (isNaN(d.getTime())) continue;
    if (!best || d > best) {
      best = d;
      label = r.date;
    }
  }
  return label;
}

function reviewTime(r: TrustpilotReview): number {
  if (!r.date) return 0;
  const t = new Date(r.date).getTime();
  return isNaN(t) ? 0 : t;
}

// The cross-provider carousel's rule, applied identically to every provider:
// the most recent 4- or 5-star review we captured and the most recent 3-star
// or lower. If a provider has no low-star review on record, its second most
// recent review stands in, so every provider shows two cards.
function pickMix(reviews: TrustpilotReview[]): TrustpilotReview[] {
  const sorted = [...reviews].sort((a, b) => reviewTime(b) - reviewTime(a));
  const high = sorted.find((r) => r.rating >= 4);
  const low = sorted.find((r) => r.rating <= 3);
  const picks = [high, low].filter((r): r is TrustpilotReview => !!r);
  if (picks.length < 2) {
    const next = sorted.find((r) => !picks.includes(r));
    if (next) picks.push(next);
  }
  return picks;
}

function starMix(reviews: TrustpilotReview[]): string {
  const counts = [5, 4, 3, 2, 1].map((s) => [s, reviews.filter((r) => r.rating === s).length] as const).filter(([, n]) => n > 0);
  return counts.map(([s, n]) => `${n} ${s}-star`).join(", ");
}

export default async function HowToChooseGlp1ProviderPage() {
  const config = await getConfig("weight-loss");
  const priceById = new Map(PRICE_INDEX.map((r) => [r.providerId, r]));
  const rows = ROWS.map((r) => ({
    ...r,
    provider: config.providers.find((p) => p.id === r.id),
    price: priceById.get(r.id),
  })).filter((r) => r.provider);
  const rowById = new Map(rows.map((r) => [r.id, r]));
  const redditProviders = rows.map((r) => ({ id: r.provider!.id, name: r.provider!.name })).filter((p) => REDDIT_COMMUNITY_FEEDBACK[p.id]);
  const explore = rankedCardItems(config, { providerIds: Object.keys(EXPLORE), order: "ranking" });
  const mixedReviews: MixedReviewItem[] = rows
    .flatMap((r) => {
      const reviews = r.provider!.trustpilotReviews ?? [];
      return pickMix(reviews).map((review) => ({
        review,
        provider: { name: r.provider!.name, href: `/weight-loss/reviews/${r.provider!.id}`, total: reviews.length },
      }));
    })
    .sort((a, b) => reviewTime(b.review) - reviewTime(a.review));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: PUBLISHED,
    dateModified: UPDATED,
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
  // Table data cell: vertical rule on the right so columns read as columns.
  const cell = "border-r border-gray-200 px-3 py-3 align-top last:border-r-0";

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
            Every telehealth site looks the same from the outside. This guide is how to tell how involved a
            licensed clinician actually is, which pharmacy fills the vial, and what the price really is at the
            dose you will end up on. Ten online GLP-1 providers checked against the same list, with verified
            prices, Trustpilot records, and what reviewers and Reddit patients report about each.
          </p>
          <LastUpdated date={UPDATED} className="mt-4" />
          <TrustDisclosure disclaimerHref="/weight-loss/disclaimer" />
        </div>
      </div>

      <div className="mx-auto max-w-[960px] px-4 py-10 text-[16px] leading-[1.75] text-gray-800 sm:px-6">
        {/* The short answer */}
        <div className="mb-10 flex items-start gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
          <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" strokeWidth={2} />
          <div>
            <h2 className="mb-2 text-[18px] font-bold text-[#191919]">The short answer</h2>
            <p className="mb-2 text-[15px] leading-[1.75] text-gray-600">
              Before you pay any GLP-1 telehealth provider, verify three things:
            </p>
            <ol className="mb-2 list-decimal space-y-1 pl-5 text-[15px] leading-[1.7] text-gray-600">
              <li><strong className="text-[#191919]">Who reviews and approves your treatment</strong> - a licensed clinician who is allowed to decline you.</li>
              <li><strong className="text-[#191919]">Which pharmacy fills the medication</strong> - named, US-licensed, and willing to say which form it compounds.</li>
              <li><strong className="text-[#191919]">What you will actually pay</strong> - after the introductory price, and as your dose goes up.</li>
            </ol>
            <p className="text-[15px] leading-[1.75] text-gray-600">
              For the providers we reviewed, we found licensed-clinician review described in every published care
              model. How much access you have to that clinician after approval varies considerably, and it is
              the fourth thing worth checking.
            </p>
          </div>
        </div>

        {/* Clinician involvement */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[24px] font-bold text-[#191919]">How involved is a licensed clinician in your care?</h2>
          </div>
          <p className="mb-4">
            People usually ask this as &ldquo;which ones have real doctors?&rdquo;. The more useful version is{" "}
            <strong className="text-[#191919]">&ldquo;can the clinician stop the sale, and can I reach them afterward?&rdquo;</strong>{" "}
            Legitimate telehealth care does not require a video appointment with an MD. Depending on the service
            and state law, the prescriber may be a licensed physician, a physician associate, a nurse practitioner or
            another qualified prescriber. A prescription-only medication like{" "}
            <a href="https://medlineplus.gov/druginfo/meds/a618008.html" target="_blank" rel="noopener" className={ext}>semaglutide</a>{" "}
            still has to pass through a licensed clinician who reviews your medical intake and has the authority to
            decline; what varies is how much of that clinician you see.
          </p>
          <p className="mb-4">
            Two clarifications. First, most legitimate GLP-1 telehealth is{" "}
            <strong className="text-[#191919]">asynchronous</strong>: you submit the intake, a clinician reviews it,
            and you message afterward. That is normal and legal. Medvi describes live video visits and scheduled
            monitoring, and embody&rsquo;s own reviewers describe scheduled provider appointments and video calls; the
            others in our table describe intake-and-message models, some with a follow-up call if the clinician needs
            more information. Second, the clinician and the pharmacy are separate questions. The prescriber decides
            whether you should be treated; the pharmacy decides what is in the vial. Check both.
          </p>
          <p className="mb-3 text-[14px] font-bold text-[#191919]">The five questions that matter:</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Who reviews the medical intake?", "A named role - physician, physician associate, nurse practitioner - stated on the how-it-works page, and an intake that asks about thyroid cancer or MEN 2 history, pancreatitis, pregnancy plans and current medications."],
              ["Are they appropriately licensed?", "Licensed in your state. HealthRx states an independent US-licensed clinician in your state; others describe licensed providers without the state detail, which is worth asking about."],
              ["Can they decline treatment?", "Look for \"if appropriate\" and refund-if-not-approved language. embody refunds in full when a provider does not approve treatment; Medvi states it declines patients for whom treatment is not appropriate."],
              ["Can you reach a clinician after approval?", "Messaging, check-ins or video: trimrx advertises unlimited check-ins, Medvi describes monitoring visits, HealthRx describes care-team check-ins. Ro reviewers report messaging-only support with 2-3 day replies."],
              ["How are dose changes and clinical questions handled?", "Ask how a dose increase is requested and who approves it. Medvi builds adjustments into monitoring; embody reviewers describe dose-increase appointments; on Reddit, an embody user's dose was raised at a check-in three weeks in."],
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
          <p className="mb-4 text-[14px] text-gray-500">
            Each check names what to look at, how to verify it yourself in a few minutes, and what is worth
            investigating or asking about before you pay. A red flag is a prompt for due diligence, not a verdict.
          </p>
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
                  <p className="text-gray-700"><span className="mr-1.5 inline-flex items-center gap-1 font-bold text-red-700"><AlertTriangle className="h-3.5 w-3.5" strokeWidth={2.5} />Red flag:</span>{c.redFlag}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[14px] text-gray-500">
            Regulatory background for checks 4, 5 and 12:{" "}
            <a href="https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers" target="_blank" rel="noopener" className={ext}>FDA on compounding (503A and 503B)</a>,{" "}
            <a href="https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/medications-containing-semaglutide-marketed-type-2-diabetes-or-weight-loss" target="_blank" rel="noopener" className={ext}>FDA on semaglutide salt forms</a>,{" "}
            <a href="https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss" target="_blank" rel="noopener" className={ext}>FDA&rsquo;s concerns with unapproved GLP-1 drugs</a>, and{" "}
            <a href="https://www.fda.gov/drugs/buying-using-medicine-safely/besaferx-your-source-online-pharmacy-information" target="_blank" rel="noopener" className={ext}>BeSafeRx</a>{" "}
            on verifying any online pharmacy.
          </p>
        </section>

        {/* Provider table */}
        <section className="mb-12" id="provider-table">
          <h2 className="mb-2 text-[24px] font-bold text-[#191919]">Ten providers, checked against the framework</h2>
          <p className="mb-4 text-[14px] text-gray-500">
            Every cell is a verified statement from our provider research or the{" "}
            <Link href="/weight-loss/glp1-weight-loss-statistics#price-index" className={ext}>price index</Link>{" "}
            (prices verified {PRICE_INDEX_VERIFIED}). Where we have not verified something, the cell says so. This is
            publicly available provider information, checked against the framework above; it is not an independent
            audit of medical quality. Rows follow our ranking, which is not the order of the prices. Mochi Health and
            Henry Meds are not in our coverage and are left out rather than guessed at.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[900px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {["Provider", "Clinician gate", "Visit type", "Pharmacy", "Semaglutide / mo", "Dose pricing", "Trustpilot"].map((h) => (
                    <th key={h} className="border-r border-gray-200 px-3 py-3 align-bottom font-bold text-[#191919] last:border-r-0">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <Fragment key={r.id}>
                  <tr className={`border-t-2 border-gray-300 ${i % 2 === 1 ? "bg-gray-50/50" : ""}`}>
                    <td className={`${cell} font-semibold text-[#191919]`}>
                      <Link href={`/weight-loss/reviews/${r.provider!.id}`} className="hover:underline">{r.provider!.name}</Link>
                    </td>
                    <td className={`${cell} text-gray-700`}>{r.clinician}</td>
                    <td className={`${cell} text-gray-700`}>{r.visit}</td>
                    <td className={`${cell} text-gray-700`}>{r.pharmacy}</td>
                    <td className={`${cell} text-gray-700`}>
                      {r.price?.semaglutide ? (
                        <>
                          <span className="font-semibold text-[#191919]">{r.price.semaglutide.price}</span>
                          <span className="block text-[12px] text-gray-500">{r.price.semaglutide.note}</span>
                        </>
                      ) : (
                        <span className="text-gray-400">Not in price index</span>
                      )}
                    </td>
                    <td className={`${cell} text-gray-700`}>{r.dosePricing}</td>
                    <td className={`${cell} text-gray-700`}>
                      {r.provider!.trustpilotRating && r.provider!.trustpilotReviewCount ? (
                        <>
                          <span className="font-semibold text-[#191919]">{r.provider!.trustpilotRating}</span>
                          <span className="block text-[12px] text-gray-500">{r.provider!.trustpilotReviewCount} reviews</span>
                        </>
                      ) : (
                        <span className="text-gray-400">Not verified</span>
                      )}
                    </td>
                  </tr>
                  {/* Review themes - full width under the row. Sources are
                      named inside each line: aggregate, individual Trustpilot
                      reviews, Reddit threads, provider claims. */}
                  <tr className={i % 2 === 1 ? "bg-gray-50/50" : ""}>
                    <td colSpan={7} className="border-t border-dashed border-gray-200 px-3 py-3 text-[12.5px] leading-relaxed text-gray-600">
                      {r.likes && (
                        <p className={r.complaints ? "mb-1.5" : ""}>
                          <span className="font-semibold text-emerald-700">What reviewers like: </span>
                          {r.likes}
                        </p>
                      )}
                      {r.complaints && (
                        <p>
                          <span className="font-semibold text-red-700">Common complaints: </span>
                          {r.complaints}
                        </p>
                      )}
                      {r.note && (
                        <p>
                          <span className="font-semibold text-[#191919]">Research note: </span>
                          {r.note}
                        </p>
                      )}
                    </td>
                  </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-gray-400">
            Individual reviews are single accounts, not evidence that every patient has the same experience. Where a
            line quotes a reviewer&rsquo;s claim we have not verified, it says so.
          </p>
        </section>

        {/* Trustpilot evidence */}
        <section className="mb-12">
          <h2 className="mb-2 text-[24px] font-bold text-[#191919]">Public review evidence, provider by provider</h2>
          <p className="mb-4 text-[14px] text-gray-500">
            The Trustpilot aggregate and review count for each provider where we verified the profile, and the mix of
            individual reviews we captured from it - positive, middling and negative alike. Trustpilot reflects customer
            experience; it does not verify the medical quality of a provider. The full captured reviews are on each
            provider&rsquo;s review page.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {rows.map((r) => {
              const p = r.provider!;
              const reviews = p.trustpilotReviews ?? [];
              const latest = latestReviewDate(reviews);
              const hasAggregate = !!(p.trustpilotRating && p.trustpilotReviewCount);
              return (
                <div key={r.id} className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <Link href={`/weight-loss/reviews/${p.id}`} className="text-[15px] font-bold text-[#191919] hover:underline">{p.name}</Link>
                    {hasAggregate ? (
                      <TrustpilotRating rating={p.trustpilotRating!} reviewCount={p.trustpilotReviewCount} starSize={15} />
                    ) : (
                      <span className="text-[12px] text-gray-400">No public aggregate verified</span>
                    )}
                  </div>
                  <p className="text-[12.5px] leading-relaxed text-gray-600">
                    {reviews.length > 0 ? (
                      <>
                        <span className="font-semibold text-[#191919]">{reviews.length} reviews captured:</span> {starMix(reviews)}
                        {latest && <span className="text-gray-400">, most recent dated {latest}</span>}.
                      </>
                    ) : (
                      <span className="text-gray-400">No individual reviews captured yet.</span>
                    )}
                  </p>
                  <p className="mt-2 flex flex-wrap gap-x-4 text-[12.5px] font-semibold">
                    <Link href={`/weight-loss/reviews/${p.id}`} className="text-[#0C4B75] hover:underline">
                      {reviews.length > 0 ? "Read the captured reviews" : "Read our review"}
                    </Link>
                    <ProviderCta
                      href={p.affiliateUrl}
                      providerName={p.name}
                      providerSlug={p.id}
                      pageType="listing"
                      sourceFlow="main_comparison"
                      className="inline-flex items-center gap-1 text-[#0C4B75] hover:underline"
                    >
                      Visit site
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </ProviderCta>
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-4">
            <MixedTrustpilotCarousel
              items={mixedReviews}
              title="The reviews themselves, across providers"
              subtitle="Two per provider by a fixed rule: the most recent 4- or 5-star review we captured and the most recent 3-star or lower. Newest first, reviewer names shortened."
            />
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-gray-400">
            Aggregates for ro, embody, trimrx, SHED, wellmedr, Medvi, Sprout and DirectMeds were re-checked against their
            public Trustpilot profiles in September 2026. Where a provider publishes no aggregate, we say so rather than
            estimate one.
          </p>
        </section>

        {/* Key patterns */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[24px] font-bold text-[#191919]">Key patterns we found</h2>
          </div>
          <p className="mb-4 text-[14px] text-gray-500">
            Five findings drawn only from the table above and the price index.
          </p>
          <ol className="space-y-3">
            {PATTERNS.map((p, i) => (
              <li key={p.title} className="flex gap-3 rounded-xl border border-gray-200 bg-white p-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[12px] font-bold text-[#0C4B75]">{i + 1}</span>
                <div>
                  <p className="mb-1 text-[15px] font-bold text-[#191919]">{p.title}</p>
                  <p className="text-[14px] leading-relaxed text-gray-600">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Reddit */}
        {redditProviders.length > 0 && (
          <section className="mb-4">
            <RedditThreadCarousel
              providers={redditProviders}
              reviewHrefFor={(id) => `/weight-loss/reviews/${id}`}
              title="What GLP-1 patients report on Reddit"
              intro={
                <>
                  <p className="mb-2">
                    We reviewed public Reddit discussions about providers in this comparison. Individual Reddit
                    posts are anecdotes, not evidence that every patient will have the same experience, so we
                    looked for recurring themes rather than treating any single post as representative.
                  </p>
                  <p className="text-[13px] text-gray-500">
                    Each card names the provider and the topic the thread covers, links to the original thread
                    where we have its address, and shows the vote count as captured. Providers without verified
                    Reddit material do not appear here.
                  </p>
                </>
              }
            />
          </section>
        )}

        {/* Providers worth exploring further */}
        <section className="mb-12">
          <h2 className="mb-2 text-[24px] font-bold text-[#191919]">Providers worth exploring further</h2>
          <p className="mb-5 text-[14px] text-gray-500">
            Four providers whose published model fits a specific need surfaced by the research above. This is not a
            ranking; the full ranked comparison is linked below. We may earn a commission if you sign up through a
            provider link, which does not change what appears in the table.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {explore.map(({ product, provider }) => {
              const meta = EXPLORE[provider.id];
              const row = rowById.get(provider.id);
              const price = priceById.get(provider.id)?.semaglutide;
              return (
                <article key={provider.id} className="flex flex-col rounded-xl border border-gray-200 bg-white p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-[32px] w-[110px] items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.logo} alt={`${provider.name} logo`} className="max-h-full max-w-full object-contain object-left" />
                    </div>
                  </div>
                  <p className="mb-1 text-[12px] font-bold uppercase tracking-wide text-[#0C4B75]">{meta.useCase}</p>
                  <p className="mb-4 text-[14px] leading-relaxed text-gray-700">{meta.reason}</p>
                  <dl className="mb-4 grid gap-x-4 gap-y-2 text-[13px] sm:grid-cols-2">
                    <div>
                      <dt className="font-semibold text-gray-500">Semaglutide, verified</dt>
                      <dd className="text-[#191919]">
                        {price ? (
                          <>
                            <span className="font-bold">{price.price}/mo</span>
                            <span className="block text-[12px] text-gray-500">{price.note}</span>
                          </>
                        ) : (
                          "Not in price index"
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-500">Trustpilot</dt>
                      <dd className="text-[#191919]">
                        {provider.trustpilotRating && provider.trustpilotReviewCount
                          ? `${provider.trustpilotRating} across ${provider.trustpilotReviewCount} reviews`
                          : "No public aggregate verified"}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="font-semibold text-gray-500">Clinician model</dt>
                      <dd className="text-[#191919]">{row?.clinician}</dd>
                    </div>
                  </dl>
                  <div className="mt-auto flex flex-wrap items-center gap-3">
                    <Link href={`/weight-loss/reviews/${provider.id}`} className="inline-flex h-[40px] items-center rounded-lg border border-gray-200 bg-white px-4 text-[13.5px] font-semibold text-[#191919] transition-colors hover:bg-gray-50">
                      Read full review
                    </Link>
                    <ProviderCta
                      href={provider.affiliateUrl}
                      providerName={provider.name}
                      providerSlug={provider.id}
                      position={product.rank}
                      pageType="listing"
                      sourceFlow="main_comparison"
                      className="inline-flex h-[40px] items-center gap-1.5 rounded-lg bg-[#0C4B75] px-4 text-[13.5px] font-bold text-white transition-colors hover:bg-[#093d61]"
                    >
                      Visit provider
                    </ProviderCta>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-5 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[14px] text-gray-500">
              Every provider in the table above, ranked and scored, with each one&rsquo;s full review linked.
            </p>
            <Link href="/weight-loss" className="inline-flex h-[44px] items-center gap-2 rounded-lg border border-[#0C4B75] bg-white px-5 text-[14px] font-bold text-[#0C4B75] transition-colors hover:bg-[#F5F9FC]">
              Compare all GLP-1 providers
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          </div>
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

        <p className="mb-10 text-[14px] leading-relaxed text-gray-500">
          Related: the{" "}
          <Link href="/weight-loss/glp1-weight-loss-statistics#price-index" className={ext}>GLP-1 price index</Link>,{" "}
          <Link href="/weight-loss/cheapest-glp1" className={ext}>the cheapest GLP-1 online</Link>,{" "}
          <Link href="/weight-loss/semaglutide" className={ext}>semaglutide providers</Link>,{" "}
          <Link href="/weight-loss/tirzepatide" className={ext}>tirzepatide providers</Link>,{" "}
          <Link href="/weight-loss/articles/compounded-semaglutide-vs-brand-name" className={ext}>compounded vs brand-name</Link>,{" "}
          <Link href="/weight-loss/switch-from-ozempic" className={ext}>switching providers</Link>,{" "}
          our broader guide to{" "}
          <Link href="/weight-loss/articles/choosing-telehealth-weight-loss-provider" className={ext}>choosing a telehealth weight loss provider</Link>,{" "}
          and <Link href="/weight-loss/how-we-rank" className={ext}>how we rank</Link>.
        </p>

        <GuideCluster currentSlug="how-to-choose-a-glp1-provider" />

        <MedicalSources vertical="weight-loss" />

        {/* Methodology notes */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 text-[13px] leading-relaxed text-gray-500">
          <h2 className="mb-2 text-[13px] font-bold uppercase tracking-[0.05em] text-[#191919]">How this page was researched</h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <span className="font-semibold text-gray-700">Prices</span> are each provider&rsquo;s published cash-pay rate,
              with its condition, from our verified registry (last verified {PRICE_INDEX_VERIFIED}). They change; confirm on the
              provider&rsquo;s site.
            </li>
            <li>
              <span className="font-semibold text-gray-700">Clinician, visit and pharmacy cells</span> come from each provider&rsquo;s
              published care model and, where stated, from what its own reviewers describe. They are publicly available
              information, not an independent audit of medical quality.
            </li>
            <li>
              <span className="font-semibold text-gray-700">Trustpilot</span> figures are the public aggregate and review count
              at the time we captured the profile; the individual reviews we quote were captured from the same profile,
              positive and negative alike. A Trustpilot score reflects customer experience, not medical safety.
            </li>
            <li>
              <span className="font-semibold text-gray-700">Reddit</span> material is limited to public threads we verified, read for
              recurring themes; single posts are anecdotes.
            </li>
            <li>
              <span className="font-semibold text-gray-700">TreatmentsHub Scores</span> are not shown on this page. On our ranking and
              review pages they are editorial comparison scores across six weighted factors - medical credibility, medication
              access, pricing and value, patient experience, clinical support and flexibility - and are separate from
              Trustpilot ratings, which are customer reviews. See{" "}
              <Link href="/weight-loss/how-we-rank" className={ext}>how we score providers</Link>.
            </li>
            <li>
              Compounded semaglutide and tirzepatide are not FDA-approved products. treatmentshub.com is not a medical
              provider; this page is for information only and is not medical advice or a treatment recommendation for any
              individual.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
