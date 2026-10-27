import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ───── Weight-loss guide cluster ─────
// The standalone GLP-1 guides (static routes + config landing pages) are the
// pages Google discovered on the hub but never crawled: most of them were only
// reachable from the footer or from one or two articles. This block cross-links
// every guide from every other guide, so each one has a full set of inbound
// links from its topically closest siblings - the strongest crawl signal we
// control. Titles mirror the destination pages' own H1s; blurbs describe the
// page's job with no figures, so nothing here can drift from the page it
// points at.
//
// Weight-loss only. Rendered near the foot of each guide page, above the
// sources/disclaimer block, minus the page it's on.

export type GuideLink = {
  slug: string;
  title: string;
  blurb: string;
};

export const WEIGHT_LOSS_GUIDES: GuideLink[] = [
  {
    slug: "glp1-cost-calculator",
    title: "GLP-1 Cost Calculator",
    blurb: "Pick a provider, a medication and a number of months; totals from the verified price index.",
  },
  {
    slug: "glp1-bmi-calculator",
    title: "BMI & GLP-1 Eligibility Check",
    blurb: "Your BMI and whether it meets the Wegovy and Zepbound label criteria.",
  },
  {
    slug: "glp1-dose-schedule",
    title: "Dose Schedule Timeline",
    blurb: "The labelled escalation steps for Wegovy and Zepbound mapped to your calendar.",
  },
  {
    slug: "how-to-choose-a-glp1-provider",
    title: "How to Choose a GLP-1 Provider",
    blurb: "12 checks, ten providers, verified prices and Trustpilot records.",
  },
  {
    slug: "cheapest-glp1",
    title: "Cheapest GLP-1 Online",
    blurb: "Every provider's verified monthly price, lowest first.",
  },
  {
    slug: "glp1-provider-comparison",
    title: "GLP-1 Providers Compared",
    blurb: "Eight providers on verified prices, Trustpilot patterns, Reddit and refund terms.",
  },
  {
    slug: "glp1-provider-support",
    title: "Provider Customer Support Compared",
    blurb: "What captured Trustpilot reviews say about support, shipping and billing, by provider.",
  },
  {
    slug: "glp1-shipping-times",
    title: "Shipping Times by Provider",
    blurb: "Each provider's published delivery promise next to what reviewers report, in days.",
  },
  {
    slug: "glp1-price-changes",
    title: "GLP-1 Price Changes",
    blurb: "Every verified change to online GLP-1 prices, dated, with before and after.",
  },
  {
    slug: "glp1-weight-loss-statistics",
    title: "GLP-1 Price Index & Statistics",
    blurb: "The dated price index, change log, and clinical-trial results.",
  },
  {
    slug: "semaglutide",
    title: "Best Semaglutide Providers",
    blurb: "Who prescribes semaglutide online and what each one charges.",
  },
  {
    slug: "tirzepatide",
    title: "Best Tirzepatide Providers",
    blurb: "Compounded tirzepatide, Zepbound and Mounjaro - ranked.",
  },
  {
    slug: "glp1-pills-vs-injections",
    title: "GLP-1 Pills vs Injections",
    blurb: "Oral GLP-1s against weekly injections: results, cost, convenience.",
  },
  {
    slug: "weight-loss-pills",
    title: "Prescription Weight Loss Pills",
    blurb: "Which oral options are prescription-strength and how they compare.",
  },
  {
    slug: "retatrutide-weight-loss",
    title: "Retatrutide for Weight Loss",
    blurb: "The triple-agonist in trials: what the data shows and whether you can get it.",
  },
  {
    slug: "ozempic-alternatives",
    title: "Ozempic, Wegovy & Mounjaro Alternatives",
    blurb: "Compounded and brand-name options when the brand drug is out of reach.",
  },
  {
    slug: "switch-from-ozempic",
    title: "Switching From Ozempic",
    blurb: "How to move providers or medications without a gap in treatment.",
  },
  {
    slug: "wegovy-providers",
    title: "Best Wegovy Providers & Alternatives",
    blurb: "Where to get Wegovy online and what to consider instead.",
  },
  {
    slug: "ozempic-for-weight-loss",
    title: "Ozempic for Weight Loss",
    blurb: "Providers, pricing and alternatives for off-label Ozempic.",
  },
  {
    slug: "best-weight-loss-injections",
    title: "Best Weight Loss Injections",
    blurb: "Weekly GLP-1 injections compared: which providers prescribe them and what each charges.",
  },
  {
    slug: "best-online-weight-loss-programs",
    title: "Best Online Weight Loss Programs",
    blurb: "Clinician-guided programs with medication, support and delivery, compared.",
  },
  {
    slug: "cheapest-weight-loss-medication",
    title: "Most Affordable Weight Loss Medication",
    blurb: "The lowest verified prices for prescription weight-loss medication online.",
  },
];

// ───── ED guide cluster ─────
// The same block for the erectile-dysfunction vertical: the cost index and
// the core treatment guides, cross-linked from every ED guide, the cost
// index and the vertical home. Slugs are relative to /ed (guides live under
// /ed/articles/...). Titles mirror the destination H1s; blurbs carry no
// figures.
export const ED_GUIDES: GuideLink[] = [
  { slug: "articles/erectile-dysfunction-treatment-complete-guide", title: "Erectile Dysfunction Treatment: The Complete Guide", blurb: "Causes, diagnosis, every treatment class, what to do when pills fail, and getting treated online." },
  { slug: "ed-cost-index", title: "ED Treatment Cost Index", blurb: "Every treatment route priced per dose and per month, with its source labelled." },
  { slug: "articles/best-ed-treatments-compared", title: "Best ED Treatments Compared", blurb: "Pills, compounded formulas, sprays and injectables side by side." },
  { slug: "articles/best-ed-medicine", title: "Best ED Medicine", blurb: "Which prescription ED medicines have the strongest evidence, and for whom." },
  { slug: "articles/how-to-get-ed-treatment-online", title: "How to Get ED Treatment Online", blurb: "The four-step process a legitimate telehealth clinic follows." },
  { slug: "articles/ed-treatment-cost", title: "How Much ED Treatment Costs", blurb: "What drives the price: the drug, the format and the provider." },
  { slug: "articles/sildenafil-vs-cialis", title: "Sildenafil vs Tadalafil (Cialis)", blurb: "Onset, duration, food and which fits your routine." },
  { slug: "articles/alternatives-to-viagra-and-cialis", title: "Alternatives to Viagra & Cialis", blurb: "Generic, compounded and non-pill options beyond the two famous brands." },
  { slug: "articles/best-4-in-1-ed-medication", title: "Best 4-in-1 ED Medications", blurb: "Compounded multi-ingredient formulas compared, with the compounding caveat." },
  { slug: "articles/ed-medication-side-effects", title: "ED Medication Side Effects", blurb: "What is common, what is rare and when to stop and call." },
  { slug: "articles/ed-pills-and-blood-pressure-medication", title: "ED Pills and Blood Pressure Medication", blurb: "Nitrates, alpha-blockers and the combinations that are never safe." },
  { slug: "articles/over-the-counter-ed-treatment", title: "Over-the-Counter ED Pills", blurb: "What actually works without a prescription and what does not." },
  { slug: "articles/trimix-for-ed", title: "Trimix for ED", blurb: "The compounded injectable: how it works and how it compares." },
  { slug: "articles/buying-ed-medication-online-safely", title: "Buying ED Medication Online Safely", blurb: "The checklist for a licensed clinic and a licensed pharmacy." },
  { slug: "articles/what-causes-erectile-dysfunction", title: "What Causes Erectile Dysfunction", blurb: "Vascular, hormonal, neurological and psychological causes explained." },
  { slug: "articles/ed-treatment-near-me", title: "ED Treatment Near You vs Online", blurb: "When a local clinic is the better call and when telehealth is." },
];

export function GuideCluster({
  currentSlug,
  prefix = "/weight-loss",
  className = "",
  guides = WEIGHT_LOSS_GUIDES,
  heading = "More GLP-1 guides",
  intro = "The rest of our weight-loss medication guides, kept to the same verified-price standard.",
}: {
  /** Slug of the page rendering the block - excluded from the list. */
  currentSlug: string;
  /** Link prefix; "/weight-loss" on the hub, "" on the legacy root routes. */
  prefix?: string;
  className?: string;
  /** The cluster to render; defaults to the weight-loss guides. */
  guides?: GuideLink[];
  heading?: string;
  intro?: string;
}) {
  const list = guides.filter((g) => g.slug !== currentSlug);
  if (list.length === 0) return null;
  return (
    <section className={`mt-10 ${className}`} aria-labelledby="guide-cluster-heading">
      <h2 id="guide-cluster-heading" className="mb-1 text-[20px] font-bold text-[#191919]">
        {heading}
      </h2>
      <p className="mb-4 text-[14px] text-gray-500">
        {intro}
      </p>
      <ul className="grid gap-2.5 sm:grid-cols-2">
        {list.map((g) => (
          <li key={g.slug}>
            <Link
              href={`${prefix}/${g.slug}`}
              className="group flex h-full items-start justify-between gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 transition-colors hover:border-[#0C4B75]/40 hover:bg-[#F5F9FC]"
            >
              <span>
                <span className="block text-[14px] font-bold text-[#191919] group-hover:text-[#0C4B75]">{g.title}</span>
                <span className="mt-0.5 block text-[12.5px] leading-snug text-gray-500">{g.blurb}</span>
              </span>
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-gray-400 transition-colors group-hover:text-[#0C4B75]" strokeWidth={2.5} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
