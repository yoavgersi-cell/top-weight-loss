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
];

export function GuideCluster({
  currentSlug,
  prefix = "/weight-loss",
  className = "",
}: {
  /** Slug of the page rendering the block - excluded from the list. */
  currentSlug: string;
  /** Link prefix; "/weight-loss" on the hub, "" on the legacy root routes. */
  prefix?: string;
  className?: string;
}) {
  const guides = WEIGHT_LOSS_GUIDES.filter((g) => g.slug !== currentSlug);
  if (guides.length === 0) return null;
  return (
    <section className={`mt-10 ${className}`} aria-labelledby="guide-cluster-heading">
      <h2 id="guide-cluster-heading" className="mb-1 text-[20px] font-bold text-[#191919]">
        More GLP-1 guides
      </h2>
      <p className="mb-4 text-[14px] text-gray-500">
        The rest of our weight-loss medication guides, kept to the same verified-price standard.
      </p>
      <ul className="grid gap-2.5 sm:grid-cols-2">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link
              href={`${prefix}/${g.slug}`}
              className="group flex h-full items-start justify-between gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 transition-colors hover:border-[#0C4B75]/40 hover:bg-[#F5F9FC]"
            >
              <span>
                <span className="block text-[14px] font-bold text-[#191919] group-hover:text-[#0C4B75]">{g.title}</span>
                <span className="mt-0.5 block text-[12.5px] leading-snug text-gray-500">{g.blurb}</span>
              </span>
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-gray-300 transition-colors group-hover:text-[#0C4B75]" strokeWidth={2.5} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
