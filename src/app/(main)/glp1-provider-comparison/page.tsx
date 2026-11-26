import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/og";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Check, X, ExternalLink } from "lucide-react";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { pageReviewSchema } from "@/data/reviewers";
import { GuideCluster } from "@/components/guide-cluster";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { ProviderCta } from "@/components/provider-cta";
import { MedicalSources } from "@/components/medical-sources";
import { RedditMark, RedditThreadCarousel } from "@/components/reddit-community";
import { getConfig } from "@/lib/config-store";
import { PRICE_INDEX_VERIFIED } from "@/lib/price-index";
import { FdaSafetyUpdate } from "@/components/fda-safety-update";

// ───── GLP-1 Telehealth Providers Compared ─────
// Evidence-led comparison of the eight weight-loss partners: verified pricing
// (price index, PRICE_INDEX_VERIFIED; Ro from its published pricing, Aug
// 2026), captured Reddit excerpts (the site's Reddit registry) and the
// providers' cancellation terms (operator review, Oct 12, 2026). Third-party
// review-site data was removed on Nov 16, 2026 (ops/trustpilot-removal-rules.md).
// No scores, no ranking: the page triangulates sources and says where evidence
// is thin. Every figure below is dated; change a figure only with a new
// verification.

export const revalidate = 60;

const CANONICAL = "https://www.treatmentshub.com/weight-loss/glp1-provider-comparison";
const TITLE = "GLP-1 Provider Comparison 2026: Prices, Reviews, Real Costs";
const DESCRIPTION =
  "Eight GLP-1 telehealth providers compared on verified pricing, what you keep paying, Reddit experiences and cancellation terms.";
const PUBLISHED = "2026-10-12";
const UPDATED = "2026-10-17";
const TERMS_REVIEWED = "October 12, 2026";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: CANONICAL, type: "article", images: [DEFAULT_OG_IMAGE] },
};

type Pid = "wellmedr" | "embody" | "eden" | "directmeds" | "medvi" | "trimrx" | "altrx" | "ro";

type Row = {
  id: Pid;
  name: string;
  medications: string;
  entry: string;
  entryNote: string;
  after: string;
  membership: string;
  shipping: string;
  support: string;
  advantage: string;
  limitation: string;
  cta: string;
};

const ROWS: Row[] = [
  {
    id: "wellmedr",
    name: "welludr",
    medications: "Compounded semaglutide and tirzepatide; brand-name Ozempic and Zepbound",
    entry: "$35 sema / $65 tirz (promotional prices, read Nov 26, 2026)",
    entryNote: "Monthly Plan as labeled on its page, same price at every dose",
    after: "Same price at every dose",
    membership: "None",
    shipping: "3-5 business days",
    support: "Board-certified specialists plus a weight-care coach",
    advantage: "Lowest ongoing price; weight-loss warranty",
    limitation: "Lowest rate is a promotional price; slower shipping",
    cta: "Check welludr's current price",
  },
  {
    id: "embody",
    name: "embody",
    medications: "Compounded semaglutide and tirzepatide",
    entry: "$49 sema / $99 tirz",
    entryNote: "month to month",
    after: "Same, month to month",
    membership: "None",
    shipping: "Free expedited delivery, cold-chain; no timeline guaranteed",
    support: "Nursing team, 1:1 messaging, video appointments",
    advantage: "Cheapest with no commitment; fastest shipping",
    limitation: "Self-serve model; little human contact by design",
    cta: "See embody's month-to-month pricing",
  },
  {
    id: "eden",
    name: "Eden",
    medications: "Compounded semaglutide and tirzepatide",
    entry: "$99 sema / $129 tirz",
    entryNote: "flat every month and at every dose; no promotion",
    after: "Same, every month",
    membership: "None",
    shipping: "Home delivery; timing not stated on the pricing page",
    support: "Doctor-guided care, 24/7 human support",
    advantage: "Flat price with no promo to expire; 24/7 human support included",
    limitation: "No Reddit record; shipping time not published; FDA marketing warning letter (June 2026)",
    cta: "Check Eden's flat pricing",
  },
  {
    id: "directmeds",
    name: "DirectMeds",
    medications: "Compounded semaglutide and tirzepatide; injections or sublingual drops",
    entry: "$249",
    entryNote: "sublingual semaglutide; injections $297; no tirzepatide price published",
    after: "6- and 12-month bulk plans offered, not priced",
    membership: "None",
    shipping: "Free 1-2 day",
    support: "Telemedicine visit included; no coaching layer",
    advantage: "Needle-free sublingual option; no subscriptions",
    limitation: "No coaching; pharmacy not named",
    cta: "Check DirectMeds' pricing",
  },
  {
    id: "medvi",
    name: "Medvi",
    medications: "Compounded semaglutide and tirzepatide; oral dissolving tablets",
    entry: "Plans from $99",
    entryNote: "price index, verified Nov 18, 2026; no per-drug price listed; tablets $249",
    after: "Not listed in our verified index",
    membership: "None",
    shipping: "Free",
    support: "Video visits with a provider or NP, dietician, care coaching",
    advantage: "All-inclusive care; HSA/FSA accepted",
    limitation: "Promo pricing with no published end date; 72-hour notice rule",
    cta: "See Medvi's current pricing",
  },
  {
    id: "trimrx",
    name: "TrimRx",
    medications: "Compounded semaglutide and tirzepatide",
    entry: "From $149 (site, read Nov 26, 2026)",
    entryNote: "plans from; not tied to one drug or dose; no banner shown Nov 26 (a \"$120 Off\" banner and $179 showed Nov 22)",
    after: "Not published per drug",
    membership: "None",
    shipping: "Free tracked; often next-day (provider claim)",
    support: "Custom dosing, unlimited provider check-ins",
    advantage: "No long-term contract; custom dosing",
    limitation: "Refund terms could not be read (Nov 22, 2026)",
    cta: "Check TrimRx's current plans",
  },
  {
    id: "altrx",
    name: "altRx",
    medications: "Compounded semaglutide and tirzepatide; brand-name Ozempic, Zepbound, Wegovy",
    entry: "$89 sema / $149 tirz",
    entryNote: "promotional; reg. $199 / $299; same at every dose",
    after: "Promotion end date has been extended repeatedly",
    membership: "None",
    shipping: "Free 5-7 day",
    support: "Clinician-guided; pause or cancel anytime; Buy Now, Pay Later",
    advantage: "Flat at every dose; brand-name shelf; BNPL",
    limitation: "FDA marketing warning letter (June 2026); promo-tier billing reports",
    cta: "Check altRx's pricing and brand-name options",
  },
  {
    id: "ro",
    name: "Ro",
    medications: "Brand-name Wegovy (pill and pen) and Zepbound; medication billed separately",
    entry: "$39 membership",
    entryNote: "first month; the only provider with a membership; medication billed separately",
    after: "Membership $74-$149/mo; medication $149-$449 by product and dose",
    membership: "Yes",
    shipping: "In-house pharmacy",
    support: "Licensed providers, messaging-based follow-up",
    advantage: "Only FDA-approved-product route here; insurance can apply to the medication",
    limitation: "Two bills a month; medication price rises with dose",
    cta: "View Ro's membership and medication prices",
  },
];

type Section = {
  id: Pid;
  overview: ReactNode;
  pricing: ReactNode;
  support: string;
  reddit: ReactNode;
  cancellation: string;
  pros: string[];
  cons: string[];
  suits: string;
  assessment: ReactNode;
};

const L = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link href={href} className="font-semibold text-[#0C4B75] hover:underline">{children}</Link>
);
const Ext = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener" className="font-semibold text-[#0C4B75] hover:underline">{children}</a>
);

const SECTIONS: Section[] = [
  {
    id: "wellmedr",
    overview: (
      <>
        welludr sells compounded semaglutide and tirzepatide <strong className="text-[#191919]">at the lowest ongoing price we track</strong>, with the same price at every dose, a coach included on every plan and a brand-name shelf for people who want Ozempic or Zepbound. It is the provider for readers who have decided to stay on treatment and want the cheapest sustainable rate.
      </>
    ),
    pricing: (
      <>
        <strong className="text-[#191919]">Semaglutide is $35 a month and tirzepatide $65 a month</strong> (promotional prices, read Nov 26, 2026), shipped every four weeks. Brand-name Ozempic is $1,399 and Zepbound $1,599 a month. Shipping is standard, three to five business days. There is no membership. Reddit users who pay month to month report $129. A year on the plan is $588 for semaglutide, the lowest year-one figure on this page.
      </>
    ),
    support:
      "Board-certified specialists review the intake and a Medical Weight-Care Coach is included. Reddit users name a Florida compounding pharmacy; one names Logos, a 503A pharmacy. welludr has not confirmed its pharmacy to us.",
    reddit: (
      <>
        welludr&rsquo;s Reddit footprint is comment-level: short, recent verdicts from people on annual plans. &ldquo;They are legit with their pharmacy in Florida. I did a ton of research and ended up <strong className="text-[#191919]">paying for a whole year at 88 a month</strong>,&rdquo; one user wrote two months before our capture. Another pays $129 month to month and says it is the only charge. A third was considering switching because &ldquo;I can get a whole year for $99/month, that&rsquo;s the lowest I&rsquo;ve seen.&rdquo; The counterweight is one detailed account from a user who switched from another provider, was kept at the 15 mg tirzepatide dose, received the order right away, and was still only one pound down after eight weeks on a prepaid six-month supply. That is a reminder about the medication, not the service. Excerpts captured from GLP-1 subreddits, July to September 2026.
      </>
    ),
    cancellation:
      "Cancel before the next charge; refunds are provided for qualifying unfulfilled orders and objectively unearned services, the most refund-friendly wording among the eight.",
    pros: ["Lowest ongoing price on this page, same at every dose", "Coach included", "Weight-loss warranty"],
    cons: ["The headline rate is a promotional price", "Slower shipping than the one-to-two-day providers", "Pharmacy not stated on the site"],
    suits: "Readers who already know they will stay on treatment for a year, want the lowest total cost, and value a coach over next-day delivery.",
    assessment: (
      <>
        On the evidence, welludr&rsquo;s value case is <strong className="text-[#191919]">the strongest here for long-term users</strong>: the lowest verified ongoing price, a coach included on every plan, and refund terms that are kinder than most. The trade is commitment and patience with shipping. If you are not sure you will stay on treatment, start somewhere month to month and come back.
      </>
    ),
  },
  {
    id: "embody",
    overview: (
      <>
        embody is <strong className="text-[#191919]">the cheapest way on this page to try a compounded GLP-1 without committing</strong>: month-to-month pricing, same price at every dose, and the fastest shipping in the set. Reddit users describe the model as &ldquo;autopilot&rdquo;, which is both its appeal and its limitation.
      </>
    ),
    pricing: (
      <>
        <strong className="text-[#191919]">Semaglutide $49 a month and tirzepatide $99, month to month</strong>, a sale first seen October 28, 2026 as a pre-Black Friday sale (previously $69 and $119), labelled a Black Friday sale when read November 26, 2026. Free expedited cold-chain delivery; no timeline guaranteed. No membership. <strong className="text-[#191919]">A partial refund if a provider does not approve treatment (unused portion less services rendered).</strong> embody is LegitScript-certified and names US-based 503A compounding pharmacies, the clearest pharmacy statement among the compounded providers here.
      </>
    ),
    support:
      "A licensed provider writes the prescription, typically within a day; a nursing team handles check-ins by message and video appointments. The model is deliberately self-serve. Reddit users report dose increases approved without pushback at the monthly check-in, and one describes a nurse calling after the first dose to ask about symptoms.",
    reddit: (
      <>
        In a{" "}
        <Ext href="https://www.reddit.com/r/compoundedtirzepatide/comments/1utd6g7/has_anyone_tried_em_ie_embody_the_price_is_good/">thread on r/compoundedtirzepatide</Ext>{" "}
        asking whether anyone had tried embody because &ldquo;the price is good&rdquo;, one user who had switched after a previous provider stalled wrote: &ldquo;The med check was quick and I was <strong className="text-[#191919]">approved same day, got my vial in just one week</strong>. Now 3 weeks in they bumped my dose... Everything is on autopilot, that&rsquo;s how they keep costs low.&rdquo; Another in the same thread switched from a different provider, was approved the next day, shipped two days later and matched at their previous dose. Elsewhere, captured comments describe $129 tirzepatide &ldquo;for all levels&rdquo; with no contract, a refill flow one user could not find in the dashboard (others pointed to the text line and the monthly check-in form), support replies one user believed were AI-generated, and a two-week gap between approval and shipment in one case.
      </>
    ),
    cancellation:
      "72 hours' notice before renewal. Payments are generally final, with a limited exception when a provider determines medical disqualification.",
    pros: ["Cheapest no-commitment price here", "Free expedited delivery (no timeline guaranteed)", "Dose changes go through without friction", "Named 503A pharmacies and LegitScript certification"],
    cons: ["Little human contact by design", "A 72-hour notice rule with payments otherwise final", "No coaching or dietician layer"],
    suits: "Readers who want to try treatment without a plan, know their way around a patient portal, and would rather have fast delivery than a coach.",
    assessment: (
      <>
        embody is <strong className="text-[#191919]">the sensible first provider for someone unsure whether a GLP-1 is for them</strong>: low cost, no commitment, fast delivery, and a refund if not approved. Reddit users agree on what you give up, which is a person to talk to when something goes wrong. Order before your supply runs low; the gap between approval and shipment is the complaint that recurs.
      </>
    ),
  },
  {
    id: "eden",
    overview: (
      <>
        Eden sells compounded semaglutide and tirzepatide at <strong className="text-[#191919]">one flat, all-inclusive monthly price that does not change in month two, month three or at any dose</strong>, with no membership and no annual or long-term plan.
      </>
    ),
    pricing: (
      <>
        <strong className="text-[#191919]">Semaglutide $99 a month and tirzepatide $129 a month, every month, at every dose</strong>, captured from Eden&rsquo;s pricing page on October 13, 2026, whose own table shows the same figure in month one, month two, month three and &ldquo;every month&rdquo;. No membership, no annual or long-term plan, no insurance needed; sign-up is a free assessment Eden says takes about three minutes. That puts Eden&rsquo;s semaglutide level with Medvi&rsquo;s $99 promotional rate, but with no promotion to expire, and its $129 tirzepatide among the lowest flat, no-commitment tirzepatide prices we track. Shipping time and cost are not stated on the pricing page we captured.
      </>
    ),
    support:
      "Doctor-guided clinical care with 24/7 human support, which Eden lists as part of the price. Eden describes its medication as made in the US with strict quality oversight; the compounding pharmacy is not named on the pages we captured.",
    reddit: (
      <>
        <strong className="text-[#191919]">We found no substantive, verifiable Reddit discussion of Eden</strong> in the communities we searched at the time of writing. Third-party review sites mention Reddit sentiment without linking threads, so we do not use it.
      </>
    ),
    cancellation:
      "Eden's published terms were not part of our October 12 review, so we do not summarise them here. Eden's pricing page states that no annual or long-term plans are required. We will add the cancellation and refund terms once reviewed.",
    pros: ["Flat $99 / $129 with no month-one trick and no promotion to expire", "No membership, no annual or long-term plan", "24/7 human support and doctor-guided care included"],
    cons: ["No Reddit record to triangulate against", "Shipping time and cost not stated on the pricing page", "Compounded only; no brand-name shelf; pharmacy not named", "FDA marketing warning letter, June 2026 (see below)"],
    suits: "Readers who want one number they can budget on for a year without committing to a plan, who value reachable human support, and tirzepatide buyers who want a flat price without a premium.",
    assessment: (
      <>
        In June 2026 the FDA sent Eden Health International, Inc. a{" "}
        <Ext href="https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/eden-health-international-inc-dba-eden-728279-06082026">warning letter</Ext>{" "}
        about compounded GLP-1 marketing claims on its website, one of 25 sent to telehealth companies that month and the same kind of letter altRx received. The letter concerns marketing language, not a finding about the medication or patient safety; we note it because readers deserve to know, and because no compounded GLP-1, from any provider, is FDA-approved. On the rest of the evidence, <strong className="text-[#191919]">Eden is one of the strongest no-commitment options on this page</strong>: a flat price that does not move, 24/7 human support included, and tirzepatide at $129 with nothing to sign. The gaps are information, not complaints: confirm shipping time at checkout, and ask which pharmacy fills the prescription.
      </>
    ),
  },
  {
    id: "directmeds",
    overview: (
      <>
        DirectMeds is a pharmacy-direct telehealth service with <strong className="text-[#191919]">the simplest pricing on this page</strong>: one flat price for compounded semaglutide or tirzepatide, as a weekly injection or as sublingual drops, with the telemedicine visit included and no membership.
      </>
    ),
    pricing: (
      <>
        <strong className="text-[#191919]">From $249 a month for sublingual semaglutide, $297 a month for injections</strong>, read November 18, 2026; no tirzepatide price is published. No subscriptions; 6- and 12-month bulk plans are offered but not priced on the page. Free one-to-two-day shipping and no membership were stated when we verified October 16, 2026. Medvi&rsquo;s tablets are also $249.
      </>
    ),
    support:
      "The telemedicine visit and prescription are included. There is no coaching or dietician layer; this is a medication-and-visit service. The dispensing pharmacy is not named on the site; \"pharmacy-direct\" is the company's description of its model.",
    reddit: (
      <>
        We found <strong className="text-[#191919]">no substantive, verifiable Reddit discussion of DirectMeds</strong> in the communities we searched. One third-party review site summarises Reddit complaints about shipments sent to wrong addresses and semaglutide sent instead of tirzepatide, but gives no thread links, so we do not treat those reports as established.
      </>
    ),
    cancellation:
      "Subscriptions can be cancelled, and there is a limited window to cancel a prescription order before processing advances. Pre-shipment refund requests are reviewed individually.",
    pros: ["One price, both molecules, both formats, every dose", "Needle-free drops at no premium", "One-to-two-day shipping; no membership"],
    cons: ["No coaching", "No Reddit record to triangulate against", "Pharmacy not named"],
    suits: "Readers who want predictable billing with no arithmetic, or who want a needle-free option without paying extra for it, and who do not need coaching.",
    assessment: (
      <>
        DirectMeds is <strong className="text-[#191919]">the easiest budget on this page to understand</strong>. We found no Reddit record to check it against, so we have the provider&rsquo;s own published terms rather than an independent lens: ask for the shipping timeline in writing before you pay.
      </>
    ),
  },
  {
    id: "medvi",
    overview: (
      <>
        Medvi wraps compounded semaglutide or tirzepatide in <strong className="text-[#191919]">the most clinical structure on this page</strong>: video visits with a provider or nurse practitioner, a dietician, care coaching, medication and shipping in one price, with HSA/FSA approval and a needle-free tablet option.
      </>
    ),
    pricing: (
      <>
        <strong className="text-[#191919]">Plans from $99 a month</strong> (price index, verified November 18, 2026; Medvi&rsquo;s site could not be re-read on November 22, 2026); oral dissolving tablets $249. Our verified index lists no per-drug or regular price for Medvi, so confirm the price you are quoted before you pay. Free shipping, no membership, monthly billing.
      </>
    ),
    support:
      "Clinical evaluations and prescribing run through a network of licensed providers; the patient-facing experience is video visits and secure messaging, with a dietician and coaching included. The pharmacy is not named on the site.",
    reddit: (
      <>
        Medvi&rsquo;s most-upvoted recent threads are full-year accounts rather than first impressions. In r/telehealth, a user&rsquo;s &ldquo;Medvi GLP-1 telehealth experience breakdown&rdquo; (55 upvotes, 8 comments, about six months before our capture) describes hearing from a licensed provider within days, mild nausea at dose increases, a plateau mid-year resolved by a dose adjustment through messaging, and <strong className="text-[#191919]">just under 15 percent of starting body weight lost in twelve months</strong>; &ldquo;the main factor to consider is cost since it is an ongoing monthly expense.&rdquo; In r/productreview, &ldquo;My 2026 MEDVI review after using it for a full year&rdquo; (55 upvotes, 31 comments) reports <strong className="text-[#191919]">just over 40 pounds lost</strong> and a calmer relationship with hunger; replies from other users call it &ldquo;the best triz provider I ever had&rdquo; after three providers. Both are firsthand accounts; neither is verifiable beyond the author&rsquo;s word.
      </>
    ),
    cancellation:
      "72 hours' notice before renewal. An early-refund exception applies when you cancel within the first 72 hours of a subscription term and have received no services.",
    pros: ["The fullest clinical package here, included in the price", "Video visits with a provider or nurse practitioner", "HSA/FSA; needle-free tablets"],
    cons: ["Promotional pricing with no published end date", "A 72-hour notice rule before renewal", "Tablets cost considerably more than injections", "Pharmacy not named"],
    suits: "Readers whose previous attempts failed for lack of structure and who want scheduled clinical contact, or who can use HSA/FSA funds.",
    assessment: (
      <>
        Medvi is <strong className="text-[#191919]">the provider to choose for care rather than price</strong>, and two long Reddit accounts support the care. The caution: understand the renewal date, the 72-hour rule and the price you will be billed before you start.
      </>
    ),
  },
  {
    id: "trimrx",
    overview: (
      <>
        TrimRx sells compounded semaglutide and tirzepatide with <strong className="text-[#191919]">custom dosing and unlimited provider check-ins, no long-term contract</strong>.
      </>
    ),
    pricing: (
      <>
        <strong className="text-[#191919]">Plans from $149 a month</strong> on TrimRx&rsquo;s own site (read November 26, 2026), with no banner shown that day (on November 22, 2026 the site read plans from $179 with a &ldquo;$120 Off&rdquo; banner). TrimRx does not publish a per-drug semaglutide or tirzepatide price we could read. Free tracked delivery; consultation included; no insurance needed. TrimRx&rsquo;s GLP-1 page says it does not practice medicine or prescribe medications and that independent licensed providers do.
      </>
    ),
    support:
      "A free two-minute assessment, review by a licensed clinician, then custom dosing with unlimited check-ins included. The compounding pharmacy is not named on the site.",
    reddit: (
      <>
        We found <strong className="text-[#191919]">no substantive Reddit discussion of TrimRx</strong> in the communities we searched, and we are not going to invent one. If you are researching TrimRx, its published terms are the record to read; we could not read them on November 22, 2026.
      </>
    ),
    cancellation:
      "Its site says to cancel before your next billing cycle (read November 22, 2026). We could not read its refund terms that day.",
    pros: ["No long-term contract", "Custom dosing and unlimited check-ins in the price", "A published starting price (plans from $149)"],
    cons: ["Mid-tier pricing against the sub-$100 providers here", "No Reddit record; pharmacy not named", "Refund terms not read"],
    suits: "Readers who want a clinician adjusting the dose to them rather than a fixed protocol, with frequent check-ins, and who will pay month to month rather than prepay.",
    assessment: (
      <>
        TrimRx&rsquo;s care model is its argument. We could not read its refund terms on November 22, 2026, so <strong className="text-[#191919]">pay monthly where you can and keep the quoted price in writing</strong>. On this evidence it is a reasonable choice for people who value check-ins, not the one we would send a price-first reader to.
      </>
    ),
  },
  {
    id: "altrx",
    overview: (
      <>
        altRx combines <strong className="text-[#191919]">flat compounded pricing at every dose with a brand-name shelf</strong> (Ozempic, Zepbound, Wegovy) and Buy Now, Pay Later, which makes it the one provider here that serves both the cash-pay compounded buyer and the person who wants the FDA-approved product without insurance.
      </>
    ),
    pricing: (
      <>
        <strong className="text-[#191919]">Compounded semaglutide $89 a month and tirzepatide $149 a month, promotional</strong>, against regular prices of $199 and $299, the same at every dose; brand-name Ozempic $1,149, Zepbound $1,249 and Wegovy $1,579. Verified October 16, 2026. Free five-to-seven-day shipping. No membership; pause or cancel anytime; BNPL available. The promotion&rsquo;s published end date has been extended at least twice (September 20, then September 25 in our <L href="/weight-loss/glp1-price-changes">change log</L>), which has so far meant the price held; it does not mean it is permanent. A Reddit user three months before our capture cited a $129 first-month tirzepatide offer, so promotions move.
      </>
    ),
    support:
      "Clinician-guided care with everything in the box (vials, syringes, prep pads). The Reddit account below describes provider assignment within hours of the form and cold-chain delivery the next day. altRx does not name its pharmacy on the site; the Reddit account names Strive Pharmacy.",
    reddit: (
      <>
        A thread titled &ldquo;MY ALTRX EXPERIENCE!!&rdquo;, captured about three months before our research, is the most detailed firsthand account we have: the user signed up for the first-month tirzepatide offer at 8am, had a provider at 12:30pm, a prescription at the pharmacy by 1:30pm, and two vials in a cooler via UPS Next Day Air the following morning, with beyond-use dates printed; &ldquo;I wish their monthly price was cheaper! <strong className="text-[#191919]">I give them a 10/10</strong>.&rdquo; Replies add the counterweight: one user&rsquo;s compounded blend with glycine and B12 caused dehydration and joint pain that eased as the dose cleared, and another new sign-up was still waiting for a prescription 24 hours in.
      </>
    ),
    cancellation:
      "72 hours' notice before renewal. Paid subscriptions are generally not refunded, including unused portions of multi-month plans, which matters if you use the multi-month or BNPL options.",
    pros: ["Flat pricing at every dose", "The widest medication selection here, including brand-name", "Buy Now, Pay Later", "Fast approval and cold-chain delivery in the firsthand account"],
    cons: ["Slower standard shipping than the one-to-two-day providers", "Promo-tier billing reports; multi-month plans not refundable", "The FDA letter noted below"],
    suits: "Readers who want brand-name medication at a cash price or financing, or who want compounded pricing that does not change with the dose.",
    assessment: (
      <>
        In June 2026 the FDA sent altRx&rsquo;s parent company, Trinity HealthCare Supply, LLC, a{" "}
        <Ext href="https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/trinity-healthcare-supply-llc-dba-altrx-728236-06082026">warning letter</Ext>{" "}
        about two aspects of its website marketing: product images that carried the altRx name, which the agency said could suggest altRx compounds the medication itself, and the phrase &ldquo;clinically proven,&rdquo; which the agency said could imply FDA evaluation of a compounded product. <strong className="text-[#191919]">The letter concerns marketing language, not a finding about the medication or patient safety</strong>, and it sits within a broader FDA campaign that has sent well over a hundred similar letters to telehealth companies since 2025. We note it because readers deserve to know, and because it is a useful reminder that no compounded GLP-1, from any provider, is FDA-approved. On the rest of the evidence, altRx&rsquo;s offer is distinctive and its one detailed firsthand account is strongly positive; the promo-tier reports argue for reading the checkout page slowly and keeping the confirmation.
      </>
    ),
  },
  {
    id: "ro",
    overview: (
      <>
        Ro is <strong className="text-[#191919]">the only provider on this page whose primary offer is FDA-approved medication</strong>: the Wegovy pill and pen and the Zepbound KwikPen, dispensed through its own pharmacy, with a membership billed separately from the drug. That structure is the reason insurance can apply, and the reason Reddit users find the cost confusing.
      </>
    ),
    pricing: (
      <>
        The Body membership is <strong className="text-[#191919]">$39 the first month, then $74 to $149 a month</strong> depending on plan ($74 on a twelve-month prepaid plan, $149 month to month). <strong className="text-[#191919]">Medication is billed separately</strong>: the Wegovy pill $149 the first month then $299; the Wegovy pen from $199 at introductory rates then $299 to $399; the Zepbound KwikPen from $299 the first month then $399 to $449, rising with dose. Ro&rsquo;s published pricing, captured August 2026. Where a commercial plan covers the medication, you pay the membership plus your copay. Paying cash for the Wegovy pill month to month, a first year runs roughly $4,300 to $5,100 including membership, depending on the membership tier; our <L href="/weight-loss/articles/wegovy-pill-price-online">Wegovy pill price guide</L> shows the arithmetic.
      </>
    ),
    support:
      "Licensed providers review every case; follow-up is message-based. Ro fills through its in-house pharmacy, the clearest pharmacy answer on this page. Ro was reported as not among the thirty telehealth companies that received FDA marketing warning letters in March 2026.",
    reddit: (
      <>
        Ro&rsquo;s threads are unusually rich in numbers. &ldquo;I used Ro for 3 months and <strong className="text-[#191919]">dropped 25 lbs</strong>... I personally had a great experience with Ro and they were seamless throughout the whole process. <strong className="text-[#191919]">The pricing ended up being the deciding factor</strong> for me after those few months,&rdquo; wrote the most-upvoted commenter we captured, who then moved to a cheaper provider. A member since January 2024 reports 50 to 60 pounds lost getting Wegovy through insurance at a retail pharmacy. Another reports 22 pounds in three months. On the other side, a Zepbound user on two months of 2.5 mg vials had lost one pound and called it &ldquo;expensive and frustrating&rdquo;, and a prospective customer asked, &ldquo;Could someone explain the cost breakdown to me? It&rsquo;s somewhat confusing.&rdquo; Excerpts captured four to five months before our research.
      </>
    ),
    cancellation: "Cancel at least 48 hours before membership renewal; membership fees are generally non-refundable.",
    pros: ["FDA-approved medication as the primary product", "Insurance can apply to the drug", "In-house pharmacy", "Results accounts on Reddit are substantial"],
    cons: ["Two bills a month and a cost structure that confuses customers on Reddit", "Message-based follow-up only", "Membership fees non-refundable with a 48-hour rule", "By far the highest cash cost here"],
    suits: "Readers whose insurance covers Wegovy or Zepbound, or who want the brand-name product and understand the membership-plus-medication arithmetic before they start.",
    assessment: (
      <>
        <strong className="text-[#191919]">With coverage, Ro can be the cheapest FDA-approved route on this page</strong> and the simplest to defend clinically. Paying cash, it is the most expensive by a wide margin, and the people who left were mostly leaving over price, not service. Do the two-line arithmetic (membership plus medication at the dose you expect to stay on) before the $39 month, and keep the answer.
      </>
    ),
  },
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "How do GLP-1 telehealth providers differ?",
    answer:
      "Mostly in four things: what they sell (compounded semaglutide and tirzepatide, brand-name products, or both), how they price it (one flat monthly price, a promotional rate that rises, a twelve-month plan, or a membership plus the medication), how much clinical contact is included (from a portal and a nurse line to video visits with a dietician), and how they handle leaving (notice periods and refund rules). The table on this page sets the eight side by side on each.",
  },
  {
    question: "What is typically included in a GLP-1 subscription?",
    answer:
      "At the compounded providers here, the price covers the clinician review, the medication, supplies, shipping and some form of follow-up. What varies is the depth of that follow-up and whether the price is the same at every dose. Ro's membership covers the clinical service only; the medication is a separate charge, which is also why insurance can apply to it.",
  },
  {
    question: "Are introductory GLP-1 prices misleading?",
    answer:
      "They are incomplete rather than false. Every provider here publishes its ongoing price somewhere; the problem is that the headline number is usually the low one. The reviews that complain of being misled almost always describe a first month taken as the ongoing rate or a promotional tier billed differently. Read the page for the month-two figure, and ask if it is not there.",
  },
  {
    question: "How can I verify a telehealth provider?",
    answer:
      "Confirm that a licensed clinician reviews your intake before any prescription, that the provider names its pharmacy and that the pharmacy is state-licensed, that the price and its conditions are in writing, and that the terms state how to cancel. For compounded medication, remember that no compounded GLP-1 is FDA-approved, whoever sells it.",
  },
  {
    question: "What should I ask before switching providers?",
    answer:
      "Whether the new provider will match your current dose (several Reddit accounts on this page describe this going smoothly), how long from approval to shipment so you can time the switch before your supply runs out, what the price is at your dose rather than the starting dose, and what your current provider's notice period is so you are not charged twice.",
  },
  {
    question: "What is the difference between FDA-approved and compounded GLP-1 medications?",
    answer:
      "FDA-approved products (Wegovy, Zepbound, Ozempic, the Wegovy pill, Foundayo) are manufactured, inspected and labelled as finished drugs with their own clinical trials. Compounded semaglutide or tirzepatide is prepared by a licensed compounding pharmacy for an individual prescription; it is a lawful, regulated channel, but the FDA does not review each pharmacy's product, and the clinical trial evidence belongs to the approved products.",
  },
];

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
const short = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mb-4 scroll-mt-24 text-[23px] font-bold text-[#191919] sm:text-[26px]">
      {children}
    </h2>
  );
}
function H3({ children }: { children: ReactNode }) {
  return <h3 className="mb-2 mt-6 text-[15px] font-bold uppercase tracking-[0.05em] text-[#0C4B75]">{children}</h3>;
}

export default async function Glp1ProviderComparisonPage() {
  const config = await getConfig("weight-loss");
  const byId = (id: Pid) => config.providers.find((p) => p.id === id);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    image: ["https://www.treatmentshub.com/og-default.png"],
    headline: "GLP-1 Telehealth Providers Compared (2026): Pricing, Reviews and Real Customer Experiences",
    description: DESCRIPTION,
    datePublished: PUBLISHED,
    dateModified: UPDATED,
    ...pageReviewSchema("/weight-loss/glp1-provider-comparison"),
    author: { "@type": "Organization", name: "Treatments Hub Team", url: "https://www.treatmentshub.com" },
    publisher: { "@type": "Organization", name: "Treatments Hub", url: "https://www.treatmentshub.com", logo: { "@type": "ImageObject", url: "https://www.treatmentshub.com/treatmentshub.png" } },
    mainEntityOfPage: CANONICAL,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.treatmentshub.com/weight-loss" },
      { "@type": "ListItem", position: 2, name: "GLP-1 Provider Comparison", item: CANONICAL },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  const ctaClass =
    "inline-flex h-[40px] items-center justify-center gap-1.5 rounded-lg bg-[#0C4B75] px-4 text-[13.5px] font-bold text-white transition-colors hover:bg-[#093d61]";

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1000px] px-4 pb-10 pt-10 sm:px-6 sm:pb-12 sm:pt-12">
          <Breadcrumbs items={[{ label: "Home", href: "/weight-loss" }, { label: "GLP-1 Provider Comparison" }]} />
          <h1 className="max-w-[820px] text-[27px] font-extrabold leading-[1.15] text-[#191919] sm:text-[36px]">
            GLP-1 Telehealth Providers Compared (2026): Pricing, Reviews and Real Customer Experiences
          </h1>
          <p className="mt-3 max-w-[720px] text-[15.5px] leading-relaxed text-gray-500">
            Eight online providers, four pricing models, two kinds of medication, and one question every reader is
            really asking: what will this cost me in month three, and will anyone answer when something goes wrong?
            We compared welludr, embody, Eden, DirectMeds, Medvi, TrimRx, altRx and Ro on their published prices, what
            people say about them on Reddit, and the cancellation terms in their policies.
            Everything is dated, everything is linked, and where we could not verify something we say so.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] font-bold text-gray-500">
            <LastUpdated date={UPDATED} />
            <span>Prices verified {short(PRICE_INDEX_VERIFIED)} (Ro: Aug 2026)</span>
          </div>
          <MedicalReviewBar path="/weight-loss/glp1-provider-comparison" className="mt-4 max-w-[760px]" />
        </div>
      </div>

      <div className="mx-auto max-w-[1000px] px-4 py-10 text-[16px] leading-[1.75] text-gray-800 sm:px-6">
        {/* Affiliate disclosure - prominent, before the table */}
        <div className="mb-10 rounded-2xl border border-[#0C4B75]/20 bg-white p-5 shadow-sm sm:p-6">
          <p className="mb-1.5 text-[12px] font-bold uppercase tracking-[0.07em] text-[#0C4B75]">How we are paid</p>
          <p className="text-[14.5px] leading-[1.75] text-gray-700">
            TreatmentsHub may earn a commission when readers visit or purchase through links on this page. This does
            not increase your cost. Our comparisons are based on publicly available provider information, independent
            customer review sources, and documented research. Affiliate relationships are disclosed and do not
            determine our editorial conclusions. All eight providers on this page are commercial partners; the
            pricing, review and policy facts below are the same ones we would print if they were not.
          </p>
        </div>

        {/* Section 1 */}
        <section className="mb-12">
          <H2 id="why-it-is-hard">Why comparing GLP-1 providers is harder than it looks</H2>
          <p className="mb-4">
            Open eight provider homepages and you will see eight headline prices. Almost none of them is the number
            you will pay in month two. Some are first-month promotions. Some are the monthly rate on a twelve-month
            plan. One is a membership fee that does not include the medication at all. Comparing them as printed is
            comparing eight different things.
          </p>
          <p className="mb-3">Six variables move the real cost and the real experience:</p>
          <ul className="mb-4 space-y-2 pl-5">
            <li className="list-disc"><strong className="text-[#191919]">Advertised price versus ongoing price.</strong> Promotions, prepaid plans and first-month offers all produce a low headline number. The useful figure is what you keep paying.</li>
            <li className="list-disc"><strong className="text-[#191919]">Medication versus membership.</strong> Most providers bill one all-in price. Ro bills a membership and the medication separately, which changes the arithmetic and lets insurance apply to the drug.</li>
            <li className="list-disc"><strong className="text-[#191919]">Clinical contact.</strong> The spread runs from video visits with a nurse practitioner and a dietician to a largely self-serve portal with a nurse on the end of a text line.</li>
            <li className="list-disc"><strong className="text-[#191919]">Pharmacy.</strong> Compounded semaglutide and tirzepatide come from a compounding pharmacy, and which one is not always stated.</li>
            <li className="list-disc"><strong className="text-[#191919]">Billing cadence.</strong> &ldquo;Monthly&rdquo; can mean every 28 days or every four weeks; ask which.</li>
            <li className="list-disc"><strong className="text-[#191919]">Refund terms.</strong> Most providers let you stop future charges. Far fewer refund money already taken, and notice periods of 48 to 72 hours are common.</li>
          </ul>
          <p>
            To cut through this we used three sources for each provider: its own published pricing, captured and dated;
            firsthand Reddit discussions; and its published cancellation and refund terms, reviewed on {TERMS_REVIEWED}. The full method is in the{" "}
            <a href="#methodology" className="font-semibold text-[#0C4B75] hover:underline">methodology section</a> below.
          </p>
        </section>

        {/* FDA NAION safety update (Nov 9, 2026), once, directly above the
            provider table (operator request, Nov 18, 2026). */}
        <FdaSafetyUpdate className="mb-12" />

        {/* Section 2: table */}
        <section className="mb-12">
          <H2 id="comparison-table">Quick comparison: eight providers at a glance</H2>
          <p className="mb-5 text-[14px] text-gray-500">
            Prices from our verified index ({fmt(PRICE_INDEX_VERIFIED)}); Ro from its published pricing, August 2026.
            No scores, no ranking.
          </p>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-xl border border-gray-200 bg-white sm:block">
            <table className="w-full min-w-[900px] text-left text-[13px] leading-snug">
              <caption className="sr-only">Eight GLP-1 telehealth providers compared on medications, price, membership, shipping and support</caption>
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {["Provider", "Medications", "Entry price", "After month 1", "Shipping", "Clinical support", "Advantage and limitation"].map((h, i) => (
                    <th key={i} scope="col" className={`px-3 py-3 font-bold text-[#191919] ${i === 0 ? "sticky left-0 z-10 bg-gray-50" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ROWS.map((r) => {
                  const p = byId(r.id);
                  return (
                    <tr key={r.id} className="align-top">
                      <th scope="row" className="sticky left-0 z-10 bg-white px-3 py-3">
                        <Link href={`/weight-loss/reviews/${r.id}`} className="flex h-[30px] w-[96px] items-center" title={`${r.name} review`}>
                          {p ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={p.logo} alt={r.name} width={96} height={30} className="max-h-full max-w-full object-contain object-left" loading="lazy" decoding="async" />
                          ) : (
                            <span className="font-semibold text-[#191919]">{r.name}</span>
                          )}
                        </Link>
                        {p && (
                          <ProviderCta href={p.affiliateUrl} providerName={r.name} providerSlug={r.id} pageType="comparison" sourceFlow="provider_comparison" className={`${ctaClass} mt-3 h-[34px] whitespace-nowrap px-3 text-[12.5px]`}>
                            Check pricing <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                          </ProviderCta>
                        )}
                      </th>
                      <td className="px-3 py-3 text-gray-600">{r.medications}</td>
                      <td className="px-3 py-3 text-gray-800"><strong className="text-[#191919]">{r.entry}</strong><br /><span className="text-[12px] text-gray-500">{r.entryNote}</span></td>
                      <td className="px-3 py-3 text-gray-600">{r.after}</td>
                      <td className="px-3 py-3 text-gray-600">{r.shipping}</td>
                      <td className="px-3 py-3 text-gray-600">{r.support}</td>
                      <td className="px-3 py-3 text-gray-600">
                        <span className="block text-emerald-700"><span aria-hidden="true">+ </span>{r.advantage}</span>
                        <span className="mt-1 block text-gray-500"><span aria-hidden="true">&minus; </span>{r.limitation}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-4 sm:hidden">
            {ROWS.map((r) => {
              const p = byId(r.id);
              const cell = (label: string, value: ReactNode) => (
                <div>
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.06em] text-gray-400">{label}</p>
                  <p className="text-[13.5px] text-gray-700">{value}</p>
                </div>
              );
              return (
                <div key={r.id} className="rounded-xl border border-gray-200 bg-white p-4">
                  <Link href={`/weight-loss/reviews/${r.id}`} className="mb-3 flex h-[30px] w-[110px] items-center" title={`${r.name} review`}>
                    {p ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.logo} alt={r.name} width={110} height={30} className="max-h-full max-w-full object-contain object-left" loading="lazy" decoding="async" />
                    ) : (
                      <span className="text-[15px] font-bold text-[#191919]">{r.name}</span>
                    )}
                  </Link>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {cell("Entry price", <><strong className="text-[#191919]">{r.entry}</strong> <span className="text-[12px] text-gray-500">{r.entryNote}</span></>)}
                    {cell("After month 1", r.after)}
                    {cell("Medications", r.medications)}
                    {cell("Clinical support", r.support)}
                    {cell("Shipping", r.shipping)}
                    {cell("Advantage", r.advantage)}
                    {cell("Limitation", r.limitation)}
                  </div>
                  {p && (
                    <ProviderCta href={p.affiliateUrl} providerName={r.name} providerSlug={r.id} pageType="comparison" sourceFlow="provider_comparison" className={`${ctaClass} mt-4 w-full`}>
                      Check pricing <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </ProviderCta>
                  )}
                </div>
              );
            })}
          </div>

          <p className="mt-5 text-[15px]">
            Read the table as a map, not a verdict. The entry price column is what each provider advertises, with its
            condition; the next column is the question to ask before you pay. &ldquo;Compounded&rdquo; means a version of
            the molecule prepared by a licensed compounding pharmacy for your prescription; it is not an FDA-approved
            product, a distinction that applies equally to seven of these eight providers and to every compounded GLP-1
            sold online. Our <L href="/weight-loss/glp1-weight-loss-statistics">price index</L> holds the verified
            figures and a public log of every change we have recorded.
          </p>
        </section>

        {/* Section 3: in-depth */}
        <section className="mb-12">
          <H2 id="in-depth">In-depth: the eight providers</H2>
          <p className="mb-2 text-[14px] text-gray-500">
            Ordered by model so that neighbours contrast: flat-price compounded providers first (welludr, embody, Eden), then DirectMeds with its two price tiers, then the care-led
            ones, then the brand-name shelf, then membership-plus-medication. Not a ranking.
          </p>
          <div className="space-y-8">
            {SECTIONS.map((s) => {
              const r = ROWS.find((x) => x.id === s.id)!;
              const p = byId(s.id);
              return (
                <article key={s.id} id={s.id} className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                  <div className="mb-4 flex h-[36px] w-[140px] items-center">
                    {p ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.logo} alt={`${r.name} logo`} width={140} height={36} className="max-h-full max-w-full object-contain object-left" loading="lazy" decoding="async" />
                    ) : null}
                    <h3 className="sr-only">{r.name}</h3>
                  </div>

                  <p className="mb-2 text-[15.5px] leading-[1.75]">{s.overview}</p>

                  <H3>Pricing breakdown</H3>
                  <p className="text-[16px] leading-[1.75] sm:text-[15px]">{s.pricing}</p>

                  <H3>Treatment and medical support</H3>
                  <p className="text-[16px] leading-[1.75] sm:text-[15px]">{s.support}</p>

                  <H3><span className="inline-flex items-center gap-1.5"><RedditMark className="h-4 w-4" /> What Reddit users are discussing</span></H3>
                  <p className="text-[16px] leading-[1.75] sm:text-[15px]">{s.reddit}</p>
                  <div className="mt-4">
                    <RedditThreadCarousel
                      providers={[{ id: s.id, name: r.name }]}
                      reviewHrefFor={(id) => `/weight-loss/reviews/${id}`}
                      title={`Reddit threads about ${r.name}`}
                      intro="Real excerpts from the public threads we captured; usernames shown as posted, nothing paraphrased."
                    />
                  </div>

                  <H3>Cancellation and refunds</H3>
                  <p className="text-[16px] leading-[1.75] sm:text-[15px]">
                    {s.cancellation} <span className="text-[13px] text-gray-500">Terms reviewed {TERMS_REVIEWED}.</span>
                  </p>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.05em] text-emerald-700">Pros</p>
                      <ul className="space-y-1.5">
                        {s.pros.map((x) => (
                          <li key={x} className="flex items-start gap-2 text-[14px] text-gray-800"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2} />{x}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.05em] text-red-600">Cons</p>
                      <ul className="space-y-1.5">
                        {s.cons.map((x) => (
                          <li key={x} className="flex items-start gap-2 text-[14px] text-gray-800"><X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" strokeWidth={2} />{x}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <H3>Who this provider may suit</H3>
                  <p className="text-[16px] leading-[1.75] sm:text-[15px]">{s.suits}</p>

                  <H3>Our editorial assessment</H3>
                  <p className="text-[16px] leading-[1.75] sm:text-[15px]">{s.assessment}</p>

                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                    {p && (
                      <ProviderCta href={p.affiliateUrl} providerName={r.name} providerSlug={s.id} pageType="comparison" sourceFlow="provider_comparison" className={`${ctaClass} h-[44px] px-5 text-[14px]`}>
                        {r.cta} <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </ProviderCta>
                    )}
                    <Link href={`/weight-loss/reviews/${s.id}`} className="text-[13.5px] font-bold text-[#0C4B75] hover:underline">Full {r.name} review</Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-12">
          <H2 id="what-reviews-reveal">What Reddit and the providers&rsquo; own terms reveal about GLP-1 telehealth</H2>
          <p className="mb-4">Read across all eight, the Reddit threads and the published terms point the same way more often than not, and the agreements are the useful part.</p>
          <p className="mb-4"><strong className="text-[#191919]">Pricing transparency.</strong> The complaint that recurs most is not a high price but a surprise: a cost breakdown users ask each other to explain (Ro), a promotional tier billed differently from the one advertised (altRx), and the ongoing monthly cost named as the main caveat even after a good year (Medvi, Ro). The providers with flat, dose-independent pricing and one bill (Eden, embody, welludr on its plan) leave less room for this kind of surprise.</p>
          <p className="mb-4"><strong className="text-[#191919]">Shipping reliability.</strong> Every provider makes a delivery promise, and the Reddit accounts show the range around it: one embody user had a vial within a week and another waited two weeks between approval and shipment; one altRx user had vials the morning after signing up while another in the same thread was still waiting for a prescription 24 hours in. The honest reading is that transit is fast and pipeline time before dispatch is where the variance lives. The shipping column above sets each provider&rsquo;s published promise side by side.</p>
          <p className="mb-4"><strong className="text-[#191919]">Customer service.</strong> Reddit&rsquo;s recurring note on embody is that it runs on &ldquo;autopilot&rdquo;, fine &ldquo;if you don&rsquo;t need to actually talk to anyone&rdquo;, with one user believing support replies were AI-generated; Ro&rsquo;s follow-up is message-based. Medvi, welludr and TrimRx build human contact into the price (video visits, a coach, unlimited check-ins), and Eden lists 24/7 human support.</p>
          <p className="mb-4"><strong className="text-[#191919]">Medical support.</strong> Medvi is the clear outlier on clinical contact: video visits, a dietician and coaching are included in the price. TrimRx&rsquo;s check-ins and welludr&rsquo;s coach are the next tier. embody&rsquo;s and DirectMeds&rsquo; models are visit-plus-portal. Ro&rsquo;s is clinician-reviewed but message-only. None of this says anything about results; the Reddit threads with the biggest numbers (Ro, Medvi) and the one with the smallest (welludr, one pound in eight weeks) are about the medication and the person, not the provider.</p>
          <p className="mb-4"><strong className="text-[#191919]">Cancellation.</strong> The terms differ more than the marketing does. embody, altRx and Medvi have 72-hour rules and payments-final language; Ro has a 48-hour rule and non-refundable membership fees; TrimRx does not refund prepaid packages; welludr has the most refund-friendly wording of the eight. Read the notice period before the first charge, not after.</p>
          <p className="mb-4"><strong className="text-[#191919]">Pharmacy information.</strong> Only embody (US 503A, LegitScript-certified) and Ro (in-house) state their pharmacy arrangement clearly. For the others, the pharmacy names in circulation (Logos for welludr, Strive for altRx, Casa for TrimRx) come from customers, not providers, and we have not confirmed them. It is a fair question to ask any provider before paying, and the <L href="/weight-loss/articles/503a-vs-503b-pharmacy-28-day-rule">503A versus 503B guide</L> explains why.</p>
          <p><strong className="text-[#191919]">What these sources cannot tell you.</strong> Reddit accounts are anonymous and unverifiable, and a handful of threads is not a customer base. Three providers (DirectMeds, Eden, TrimRx) have no Reddit record we could find, so for them we rely on published prices and terms alone. We have tried to describe patterns only where more than one source shows them.</p>
        </section>

        {/* Section 5 */}
        <section className="mb-12">
          <H2 id="hidden-costs">Hidden costs to watch for</H2>
          <ul className="mb-6 space-y-2 pl-5">
            <li className="list-disc"><strong className="text-[#191919]">Introductory pricing.</strong> Ro&rsquo;s $39, altRx&rsquo;s and Medvi&rsquo;s promotional rates and TrimRx&rsquo;s discount are first-period or promotional figures. The question is the month-two number, and every provider on this page publishes it somewhere; find it before you pay.</li>
            <li className="list-disc"><strong className="text-[#191919]">Membership fees.</strong> Only Ro has one, but it is the biggest single line on this page: $74 to $149 a month before any medication.</li>
            <li className="list-disc"><strong className="text-[#191919]">Consultation costs.</strong> All eight include the initial consultation in the price. Follow-up visits are included everywhere we could verify; Medvi and TrimRx make the most of them.</li>
            <li className="list-disc"><strong className="text-[#191919]">Medication charges by dose.</strong> Ro&rsquo;s brand-name medication rises with dose ($299 to $449 for Zepbound). The compounded providers here all state one price at every dose, which is a real advantage of the model and worth confirming in writing.</li>
            <li className="list-disc"><strong className="text-[#191919]">Shipping.</strong> Free at the seven that state it; Eden does not publish shipping terms. Speed is the variable, from one to two days (embody, DirectMeds) to five to seven (altRx).</li>
            <li className="list-disc"><strong className="text-[#191919]">Billing cadence.</strong> &ldquo;Every four weeks&rdquo; (welludr&rsquo;s stated cadence) is thirteen charges a year, not twelve. Ask.</li>
            <li className="list-disc"><strong className="text-[#191919]">Prescription changes.</strong> If a clinician moves you to tirzepatide from semaglutide, the price changes at every provider here; the gap ranges from $40 (welludr) to $110 (TrimRx).</li>
            <li className="list-disc"><strong className="text-[#191919]">Cancellation conditions.</strong> 48 hours at Ro, 72 hours at embody, altRx and Medvi, and prepaid plans that are not refundable at altRx and TrimRx.</li>
          </ul>
          <p className="mb-3 text-[15px] font-semibold text-[#191919]">A three-month illustration using verified prices</p>
          <p className="mb-3 text-[14px] text-gray-500">September 2026 index; Ro&rsquo;s August 2026 pricing; cash-pay, semaglutide, no insurance; a hypothetical shopper who stays on treatment.</p>
          <div className="mb-4 overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full min-w-[640px] text-left text-[14px]">
              <caption className="sr-only">Three-month cost illustration for three routes using verified prices</caption>
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {["Provider and route", "Month 1", "Month 2", "Month 3", "Three-month total"].map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 font-bold text-[#191919]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr><th scope="row" className="px-4 py-3 font-medium text-[#191919]">welludr, semaglutide (promotional price, read Nov 26, 2026)</th><td className="px-4 py-3 text-gray-600">$35</td><td className="px-4 py-3 text-gray-600">$35</td><td className="px-4 py-3 text-gray-600">$35</td><td className="px-4 py-3 text-gray-800"><strong>$105</strong></td></tr>
                <tr className="bg-gray-50/50"><th scope="row" className="px-4 py-3 font-medium text-[#191919]">embody, semaglutide month to month</th><td className="px-4 py-3 text-gray-600">$49</td><td className="px-4 py-3 text-gray-600">$49</td><td className="px-4 py-3 text-gray-600">$49</td><td className="px-4 py-3 text-gray-800"><strong>$147</strong> (no further commitment)</td></tr>
                <tr><th scope="row" className="px-4 py-3 font-medium text-[#191919]">Ro, Wegovy pill plus membership, month to month</th><td className="px-4 py-3 text-gray-600">$39 + $149 = $188</td><td className="px-4 py-3 text-gray-600">$149 + $299 = $448</td><td className="px-4 py-3 text-gray-600">$149 + $299 = $448</td><td className="px-4 py-3 text-gray-800"><strong>$1,084</strong> (FDA-approved product; insurance may change this entirely)</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            The illustration is arithmetic, not a recommendation; the products differ, and the right one is a clinical
            decision. The full year-one picture for every provider we track is in{" "}
            <L href="/weight-loss/articles/glp1-true-cost-month-1-vs-year-one">what GLP-1 treatment really costs, month 1 versus year one</L>, and the questions to ask before any prepaid plan are in{" "}
            <L href="/weight-loss/articles/before-you-prepay-glp1">before you prepay</L>.
          </p>
        </section>

        {/* Neutral mid-page block */}
        <div className="mb-12 rounded-xl border border-[#0C4B75]/10 bg-[#0C4B75]/[0.03] p-5 text-center sm:p-6">
          <p className="mb-3 text-[16px] font-bold text-[#191919]">Compare the eight side by side</p>
          <a href="#comparison-table" className="inline-flex h-[44px] items-center justify-center rounded-lg bg-[#0C4B75] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]">Back to the table</a>
        </div>

        {/* Section 6 */}
        <section className="mb-12">
          <H2 id="how-to-choose">How to choose a GLP-1 telehealth provider</H2>
          <p className="mb-3">Six questions, each answerable from the table above or from one email to the provider:</p>
          <ol className="mb-4 space-y-2 pl-5">
            <li className="list-decimal"><strong className="text-[#191919]">What do I pay in month two, and at the dose I will stay on?</strong> If the page does not say, ask, and keep the reply.</li>
            <li className="list-decimal"><strong className="text-[#191919]">Who prescribes, and who do I reach afterwards?</strong> A licensed clinician&rsquo;s review is the legal minimum; what you want to know is whether there is a person after approval.</li>
            <li className="list-decimal"><strong className="text-[#191919]">Which pharmacy fills the prescription?</strong> For compounded medication, the pharmacy&rsquo;s licence and the beyond-use date on the vial are the quality signals you can check.</li>
            <li className="list-decimal"><strong className="text-[#191919]">How are refills triggered, and how long from approval to the door?</strong> Order before you run out; pipeline time is where delays happen.</li>
            <li className="list-decimal"><strong className="text-[#191919]">How do I cancel, with how much notice, and what is refundable?</strong> Section by section above, from the providers&rsquo; own terms.</li>
            <li className="list-decimal"><strong className="text-[#191919]">Is it available in my state?</strong> Several providers exclude states; the checkout will tell you, so ask before the intake if it matters.</li>
          </ol>
          <p>
            The full checklist, including how to read a telehealth provider&rsquo;s legitimacy signals, is in{" "}
            <L href="/weight-loss/how-to-choose-a-glp1-provider">how to choose a GLP-1 provider</L>. Prefer a scored view? Our{" "}
            <L href="/weight-loss">ranked comparison of GLP-1 providers</L> applies the same verified data with a rating.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-12">
          <H2 id="methodology">Our research methodology</H2>
          <p className="mb-4"><strong className="text-[#191919]">Provider selection.</strong> The eight providers are the GLP-1 telehealth companies TreatmentsHub currently works with as commercial partners; Eden was added on October 14, 2026, after joining the partner list. That is the pool, stated plainly. Within it, nothing was ranked, and every provider is held to the same three sources. For the brand-name reference prices every cash-pay reader compares against, see our <L href="/weight-loss/articles/zepbound-price-online">Zepbound price guide</L> and <L href="/weight-loss/articles/wegovy-pill-price-online">Wegovy pill price guide</L>, which cite the manufacturers&rsquo; published and reported self-pay prices with dates.</p>
          <p className="mb-4"><strong className="text-[#191919]">Official website research and pricing verification.</strong> Prices were captured from each provider&rsquo;s own pricing pages and recorded in our <L href="/weight-loss/glp1-weight-loss-statistics">price index</L>, last verified {fmt(PRICE_INDEX_VERIFIED)}, with a <L href="/weight-loss/glp1-price-changes">public change log</L> of every movement we have recorded (altRx September 14 and 21; TrimRx September 15 and November 22; welludr September 14). Ro&rsquo;s membership and medication prices were captured from its published pricing in August 2026. Promotional, prepaid and first-month conditions are stated with every figure.</p>
          <p className="mb-4"><strong className="text-[#191919]">Reddit research.</strong> We searched GLP-1 communities (r/glp1, r/Semaglutide, r/tirzepatidecompound, r/compoundedtirzepatide, r/WegovyWeightLoss, r/telehealth and others) for discussions from the past twelve months, kept firsthand accounts over secondhand ones, and recorded the subreddit and date for each excerpt; thread links are given where we hold the permalink. Where we could find no substantive discussion we say so rather than fill the gap. Reddit excerpts are anonymous accounts and are presented as such.</p>
          <p className="mb-4"><strong className="text-[#191919]">Medical and regulatory sources.</strong> FDA pages on compounding and on compounded GLP-1 drugs; the FDA approval announcements for Zepbound and Foundayo and coverage of the Wegovy pill approval; the published OASIS 4 and ATTAIN-1 trials via the American College of Cardiology&rsquo;s summaries; the FDA&rsquo;s June 8, 2026 warning letter concerning altRx; and coverage of the FDA&rsquo;s March 2026 warning letters. All are linked in the sources list below.</p>
          <p className="mb-4"><strong className="text-[#191919]">Limitations.</strong> Three providers have no Reddit record we could locate. Reddit accounts are self-selected. Pharmacy names for four providers come from customers, not providers. Prices change; the dates on this page are the ones that matter. We did not purchase from or test any of these services.</p>
          <p className="mb-4"><strong className="text-[#191919]">Editorial independence.</strong> TreatmentsHub earns commissions from the providers on this page. The affiliate relationship did not determine which facts appear, how they are phrased, or the assessments. Where a partner has a negative record, it is here.</p>
          <p><strong className="text-[#191919]">Last research update:</strong> {fmt(UPDATED)}.</p>
        </section>

        {/* Section 8: FAQ */}
        <section className="mb-12">
          <H2 id="faq">Frequently asked questions</H2>
          <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {FAQS.map((f) => (
              <div key={f.question} className="p-6">
                <h3 className="mb-2 text-[16px] font-bold text-[#191919]">{f.question}</h3>
                <p className="text-[16px] leading-[1.7] sm:text-[14px] text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[14px] text-gray-600">
            More on the compounded-versus-brand decision in{" "}
            <L href="/weight-loss/articles/compounded-semaglutide-vs-brand-name">compounded vs brand-name GLP-1s</L>, and on coverage in{" "}
            <L href="/weight-loss/articles/lost-insurance-coverage-zepbound-wegovy">what to do if you lose insurance coverage</L>.
          </p>
        </section>

        {/* Sources */}
        <section className="mb-12">
          <H2 id="sources">Sources</H2>
          <ul className="space-y-1.5 text-[13.5px] leading-relaxed text-gray-600">
            <li><strong className="text-[#191919]">Provider pricing:</strong> TreatmentsHub <L href="/weight-loss/glp1-weight-loss-statistics">price index and change log</L>, verified {fmt(PRICE_INDEX_VERIFIED)}; Ro published pricing, August 2026; TrimRx homepage, October 11, 2026.</li>
            <li><strong className="text-[#191919]">Provider terms</strong> (reviewed {TERMS_REVIEWED}): each provider&rsquo;s published terms of service and refund policy.</li>
            <li><strong className="text-[#191919]">Reddit:</strong> <a href="https://www.reddit.com/r/compoundedtirzepatide/comments/1utd6g7/has_anyone_tried_em_ie_embody_the_price_is_good/" target="_blank" rel="noopener" className="text-[#0C4B75] hover:underline">r/compoundedtirzepatide thread on embody</a>; further excerpts captured from r/telehealth, r/productreview and GLP-1 subreddits between May and September 2026.</li>
            <li><strong className="text-[#191919]">Regulatory and clinical:</strong> FDA, <a href="https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers" target="_blank" rel="noopener" className="text-[#0C4B75] hover:underline">Compounding and the FDA: questions and answers</a>; FDA, <a href="https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss" target="_blank" rel="noopener" className="text-[#0C4B75] hover:underline">concerns with unapproved GLP-1 drugs used for weight loss</a>; FDA, <a href="https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/trinity-healthcare-supply-llc-dba-altrx-728236-06082026" target="_blank" rel="noopener" className="text-[#0C4B75] hover:underline">warning letter to Trinity HealthCare Supply, LLC dba altRx, June 8, 2026</a>; <a href="https://www.benefitspro.com/amp/2026/03/05/fda-issues-warning-letters-to-30-telehealth-firms-over-glp-1-marketing/" target="_blank" rel="noopener" className="text-[#0C4B75] hover:underline">BenefitsPRO on the FDA&rsquo;s March 3, 2026 warning letters</a>; FDA, <a href="https://www.fda.gov/news-events/press-announcements/fda-approves-new-medication-chronic-weight-management" target="_blank" rel="noopener" className="text-[#0C4B75] hover:underline">approval of Zepbound</a>; FDA, <a href="https://www.fda.gov/news-events/press-announcements/fda-approves-first-new-molecular-entity-under-national-priority-voucher-program" target="_blank" rel="noopener" className="text-[#0C4B75] hover:underline">approval of Foundayo, April 1, 2026</a>; <a href="https://www.healio.com/news/endocrinology/20260213/fda-approves-wegovy-pill-the-first-oral-glp1-to-treat-obesity" target="_blank" rel="noopener" className="text-[#0C4B75] hover:underline">Healio on the Wegovy pill approval</a>; ACC summaries of <a href="https://www.acc.org/latest-in-cardiology/journal-scans/2025/09/24/16/40/oasis-4" target="_blank" rel="noopener" className="text-[#0C4B75] hover:underline">OASIS 4</a> and <a href="https://www.acc.org/latest-in-cardiology/journal-scans/2025/09/24/16/48/attain-1" target="_blank" rel="noopener" className="text-[#0C4B75] hover:underline">ATTAIN-1</a>.</li>
          </ul>
          <p className="mt-4 text-[13px] leading-relaxed text-gray-400">
            treatmentshub.com is not a medical provider and does not prescribe medication. This page is general
            information for comparing services, not medical advice. GLP-1 medications require evaluation and
            supervision by a licensed healthcare provider. Brand names are trademarks of their respective owners.
          </p>
        </section>

        <GuideCluster currentSlug="glp1-provider-comparison" />
        <MedicalSources vertical="weight-loss" />
      </div>
    </div>
  );
}
