import Link from "next/link";
import { getConfig } from "@/lib/config-store";
import { threeWayBySlug } from "@/lib/three-way";

// Umbrella-brand footer. Links point at real routes only; category links are
// absolute (brand-level) rather than scoped to the current vertical. The brand
// name still swaps between the legacy and hub domains via the data-hub CSS.
const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Treatments",
    links: [
      { label: "Weight Loss", href: "/weight-loss" },
      { label: "Hair Loss", href: "/hair-loss" },
      { label: "TRT", href: "/trt" },
      { label: "HRT", href: "/hrt" },
      { label: "Hearing Aids", href: "/hearing-aids" },
      { label: "Online Therapy", href: "/online-therapy" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Reviews", href: "/weight-loss/reviews" },
      { label: "Guides", href: "/weight-loss/articles" },
      { label: "Cheapest GLP-1", href: "/weight-loss/cheapest-glp1" },
      { label: "Ozempic Alternatives", href: "/weight-loss/ozempic-alternatives" },
      { label: "Switch from Ozempic", href: "/weight-loss/switch-from-ozempic" },
      { label: "How We Rank", href: "/weight-loss/how-we-rank" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/weight-loss/about" },
      { label: "Medical Disclaimer", href: "/weight-loss/disclaimer" },
    ],
  },
];

// Curated high-value weight-loss comparisons surfaced site-wide so the
// comparison cluster sits one click from every crawled page (a real crawl-depth
// lever for pages Google has discovered but not yet indexed). Slugs are
// resolved against live config below, so an entry that isn't a real battle is
// silently dropped - the footer never renders a dead link. Mix of two-way
// battles and three-way matrices; ordering is editorial, not by traffic.
const FEATURED_COMPARISON_SLUGS = [
  "embody-vs-wellmedr",
  "altrx-vs-embody",
  "embody-vs-ro",
  "altrx-vs-wellmedr",
  "embody-vs-altrx-vs-wellmedr",
];

async function featuredComparisons(): Promise<{ label: string; href: string }[]> {
  try {
    const wl = await getConfig("weight-loss");
    const nameOf = (id: string) => wl.providers.find((p) => p.id === id)?.name;
    const out: { label: string; href: string }[] = [];

    for (const slug of FEATURED_COMPARISON_SLUGS) {
      const battle = (wl.battles ?? []).find((b) => b.slug === slug);
      if (battle) {
        const label =
          battle.matchupLabel ||
          [nameOf(battle.provider1Id), nameOf(battle.provider2Id)].filter(Boolean).join(" vs ");
        if (label) out.push({ label, href: `/weight-loss/${slug}` });
        continue;
      }
      const three = threeWayBySlug.get(slug);
      if (three) {
        const label = three.providerIds.map(nameOf).filter(Boolean).join(" vs ");
        if (label) out.push({ label, href: `/weight-loss/${slug}` });
      }
    }
    return out;
  } catch {
    return [];
  }
}

export async function Footer() {
  const comparisons = await featuredComparisons();
  const columns = [
    ...COLUMNS,
    ...(comparisons.length > 0
      ? [{ title: "Popular Comparisons", links: comparisons }]
      : []),
  ];

  return (
    <footer className="mt-auto border-t border-[#E5E5E5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {/* Brand blurb */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <p className="text-[13px] leading-relaxed text-gray-500">
              <span className="font-bold text-[#191919]">
                <span className="legacy-name">TopWeightLoss</span>
                <span className="hub-name">TreatmentsHub</span>
              </span>{" "}
              is an independent comparison publisher for modern healthcare treatments.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-2.5 text-[12px] font-bold uppercase tracking-wider text-[#191919]">{col.title}</h4>
              <nav className="space-y-1.5">
                {col.links.map((l) => (
                  <Link key={l.label} href={l.href} className="block text-[13px] text-gray-500 hover:text-[#0C4B75]">
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-gray-100 pt-5">
          <p className="mb-4 text-xs text-gray-400">
            <strong className="text-gray-500">Affiliate Disclosure:</strong>{" "}
            <span className="legacy-name">TopWeightLoss</span>
            <span className="hub-name">TreatmentsHub</span> may earn a commission
            when you click on links and make a purchase. This does not affect our
            rankings or reviews. We are committed to providing honest, independent
            comparisons to help you make informed decisions.
          </p>
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-[12px] text-gray-400">
              &copy; {new Date().getFullYear()}{" "}
              <span className="legacy-name">TopWeightLoss</span>
              <span className="hub-name">TreatmentsHub</span>. All rights reserved.
            </p>
            <p className="text-[11px] text-gray-300">
              <span className="legacy-name">topweightloss.io</span>
              <span className="hub-name">treatmentshub.com</span> is not a medical provider. Always consult a licensed physician.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
