import Link from "next/link";
import { getConfig } from "@/lib/config-store";
import { threeWayBySlug } from "@/lib/three-way";
import { WEIGHT_LOSS_MIGRATED } from "@/lib/site-context";

// Umbrella-brand footer. Links point at real routes only; category links are
// absolute (brand-level) rather than scoped to the current vertical. The brand
// name still swaps between the legacy and hub domains via the data-hub CSS.
// Oct 25, 2026: each treatment entry also carries its Reviews and Guides
// index links. Search Console listed the non-weight-loss review and guide
// indexes (and most pages under them) as "discovered, not indexed" - they had
// internal links only from inside their own vertical. A sitewide footer link
// puts every index one click from every crawled page.
type FooterLink = { label: string; href: string; sub?: { label: string; href: string }[] };
const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Treatments",
    links: [
      { label: "Weight Loss", href: "/weight-loss", sub: [{ label: "Reviews", href: "/weight-loss/reviews" }, { label: "Guides", href: "/weight-loss/articles" }] },
      { label: "Hair Loss", href: "/hair-loss", sub: [{ label: "Reviews", href: "/hair-loss/reviews" }, { label: "Guides", href: "/hair-loss/articles" }, { label: "For women", href: "/hair-loss/women" }] },
      { label: "TRT", href: "/trt", sub: [{ label: "Reviews", href: "/trt/reviews" }, { label: "Guides", href: "/trt/articles" }] },
      { label: "HRT", href: "/hrt", sub: [{ label: "Reviews", href: "/hrt/reviews" }, { label: "Guides", href: "/hrt/articles" }] },
      { label: "Online Therapy", href: "/online-therapy", sub: [{ label: "Reviews", href: "/online-therapy/reviews" }, { label: "Guides", href: "/online-therapy/articles" }] },
      { label: "ED Treatment", href: "/ed", sub: [{ label: "Reviews", href: "/ed/reviews" }, { label: "Guides", href: "/ed/articles" }] },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Reviews", href: "/weight-loss/reviews" },
      { label: "Guides", href: "/weight-loss/articles" },
      { label: "Cheapest GLP-1", href: "/weight-loss/cheapest-glp1" },
      { label: "GLP-1 Providers Compared", href: "/weight-loss/glp1-provider-comparison" },
      { label: "Provider Support Compared", href: "/weight-loss/glp1-provider-support" },
      { label: "Shipping Times", href: "/weight-loss/glp1-shipping-times" },
      { label: "Price Changes", href: "/weight-loss/glp1-price-changes" },
      // The three ranking landing pages were in the sitemap with zero
      // internal links (orphans in the Sept 2026 audit) - surfaced here so
      // every crawled page links to them.
      { label: "Best Weight Loss Injections", href: "/weight-loss/best-weight-loss-injections" },
      { label: "Best Online Programs", href: "/weight-loss/best-online-weight-loss-programs" },
      { label: "Cheapest Weight Loss Medication", href: "/weight-loss/cheapest-weight-loss-medication" },
      { label: "Ozempic Alternatives", href: "/weight-loss/ozempic-alternatives" },
      { label: "Switch from Ozempic", href: "/weight-loss/switch-from-ozempic" },
      { label: "How We Rank", href: "/weight-loss/how-we-rank" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/weight-loss/about" },
      { label: "Medical Review Policy", href: "/medical-review-policy" },
      { label: "Our Medical Reviewer", href: "/reviewers/francheska-capistrano" },
      { label: "Disclaimer", href: "/weight-loss/disclaimer" },
      { label: "Privacy Policy", href: "/weight-loss/privacy" },
      { label: "Terms of Use", href: "/weight-loss/terms" },
      { label: "Contact", href: "mailto:contact@treatmentshub.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/treatments-hub" },
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
  // (the three-way embody-vs-altrx-vs-wellmedr sat here, but three-way pages
  // are noindex - a sitewide footer link to a noindex page is wasted crawl)
  "medvi-vs-wellmedr",
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
  const columns: { title: string; links: FooterLink[] }[] = [
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
                {!WEIGHT_LOSS_MIGRATED && <span className="legacy-name">TopWeightLoss</span>}
                <span className="hub-name">Treatments Hub</span>
              </span>{" "}
              is an independent comparison publisher for modern healthcare treatments.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              {/* Not a heading: footer column labels were h4s that followed the
                  page's last h2/h1 and produced a heading-level skip on every
                  page in the audit. */}
              <p className="mb-2.5 text-[12px] font-bold uppercase tracking-wider text-[#191919]">{col.title}</p>
              <nav className="space-y-1.5">
                {col.links.map((l) =>
                  l.href.startsWith("http") ? (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-[13px] text-gray-500 hover:text-[#0C4B75]"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <span key={l.label} className="block">
                      <Link href={l.href} className="text-[13px] text-gray-500 hover:text-[#0C4B75]">
                        {l.label}
                      </Link>
                      {l.sub && (
                        <span className="ml-1.5 text-[12px] text-gray-400">
                          {l.sub.map((x, i) => (
                            <span key={x.href}>
                              {i > 0 ? " · " : "("}
                              <Link href={x.href} className="hover:text-[#0C4B75]">
                                {x.label}
                              </Link>
                              {i === l.sub!.length - 1 ? ")" : ""}
                            </span>
                          ))}
                        </span>
                      )}
                    </span>
                  ),
                )}
              </nav>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-gray-100 pt-5">
          <p className="mb-4 text-xs text-gray-400">
            <strong className="text-gray-500">Affiliate Disclosure:</strong>{" "}
            {!WEIGHT_LOSS_MIGRATED && <span className="legacy-name">TopWeightLoss</span>}
            <span className="hub-name">Treatments Hub</span> may earn a commission
            when you click on links and make a purchase. This does not affect our
            rankings or reviews. We are committed to providing honest, independent
            comparisons to help you make informed decisions.
          </p>
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-[12px] text-gray-400">
              &copy; {new Date().getFullYear()}{" "}
              {!WEIGHT_LOSS_MIGRATED && <span className="legacy-name">TopWeightLoss</span>}
              <span className="hub-name">Treatments Hub</span>. All rights reserved.
            </p>
            <p className="text-[11px] text-gray-400">
              {!WEIGHT_LOSS_MIGRATED && <span className="legacy-name">topweightloss.io</span>}
              <span className="hub-name">treatmentshub.com</span> is not a medical provider. Always consult a licensed physician.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
