import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/og";
import Link from "next/link";
import { ShieldCheck, TrendingDown, TrendingUp, Layers, Quote } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { notFound } from "next/navigation";
import { pageReviewSchema } from "@/data/reviewers";
import {
  COST_INDEX,
  COST_INDEX_UPDATED,
  DOSES_PER_MONTH_BASIS,
  costIndexSpread,
  type CostEntry,
} from "@/lib/ed-cost-index";

export const revalidate = 3600;

// Served at treatmentshub.com/ed/ed-cost-index (ported from edtreatmenthub.com, Oct 21, 2026).
const SITE_URL = "https://www.treatmentshub.com";
const VERTICAL_URL = `${SITE_URL}/ed`;
const CANONICAL = `${VERTICAL_URL}/ed-cost-index`;

export const metadata: Metadata = {
  title: "ED Treatment Cost Index 2026: What ED Meds Cost Online",
  description:
    "A sourced index of what ED treatment costs online in 2026: generic pills, brand-name, compounded 4-in-1, nasal spray and injectables, per dose and per month.",
  alternates: { canonical: CANONICAL },
  openGraph: { images: [DEFAULT_OG_IMAGE],
    title: "ED Treatment Cost Index (2026)",
    description:
      "What ED treatment actually costs online in 2026 - generics, brand, compounded, nasal spray and injectables, compared per dose and per month.",
    url: CANONICAL,
    type: "article",
  },
};

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

function BasisBadge({ entry }: { entry: CostEntry }) {
  const verified = entry.basis === "verified";
  return (
    <span
      title={entry.source}
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold ${
        verified ? "bg-[#0C4B75] text-white" : "bg-gray-100 text-gray-600 ring-1 ring-gray-200"
      }`}
    >
      {verified ? "Verified price" : "Est. range"}
    </span>
  );
}

export default async function EdCostIndexPage({ params }: { params: Promise<{ battleSlug: string }> }) {
  const { battleSlug } = await params;
  if (battleSlug !== "ed") return notFound();
  const rows = [...COST_INDEX].sort((a, b) => a.perMonthLow - b.perMonthLow);
  const { lowest, highest } = costIndexSpread();

  const stats = [
    {
      icon: TrendingDown,
      value: "~$1-3",
      label: "Cheapest proven option, per dose",
      sub: "Generic sildenafil online",
    },
    {
      icon: TrendingUp,
      value: "20-50×",
      label: "Brand markup vs. the identical generic",
      sub: "Same active ingredient",
    },
    {
      icon: Layers,
      value: "$90-180",
      label: "Typical compounded 4-in-1, per month",
      sub: "Multi-ingredient programs",
    },
    {
      icon: ShieldCheck,
      value: `${money(lowest)}-${money(highest)}+`,
      label: "Full monthly cost spread",
      sub: "Across legitimate online options",
    },
  ];

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "ED Treatment Cost Index (2026)",
    description:
      "An independent, sourced index of what erectile-dysfunction treatment costs online in 2026.",
    url: CANONICAL,
    inLanguage: "en-US",
    dateModified: COST_INDEX_UPDATED,
    isPartOf: { "@type": "WebSite", name: "Treatments Hub", url: SITE_URL },
    ...pageReviewSchema("/ed/ed-cost-index"),
  };

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "ED Treatment Cost Index (2026)",
    description:
      "Normalized per-dose and per-month cost of online erectile-dysfunction treatments in the US - generic pills, brand-name, compounded multi-ingredient, nasal spray and injectables. Figures are either provider-published ('verified') or representative market ranges ('est. range').",
    url: CANONICAL,
    creator: { "@type": "Organization", name: "Treatments Hub", url: SITE_URL },
    dateModified: COST_INDEX_UPDATED,
    datePublished: COST_INDEX_UPDATED,
    isAccessibleForFree: true,
    variableMeasured: ["Cost per dose (USD)", "Cost per month (USD)", "Treatment category"],
    keywords: [
      "ED treatment cost",
      "erectile dysfunction medication price",
      "generic sildenafil cost",
      "generic tadalafil cost",
      "compounded ED medication price",
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "ED Treatment", item: VERTICAL_URL },
      { "@type": "ListItem", position: 3, name: "ED Treatment Cost Index", item: CANONICAL },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1000px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "ED Treatment", href: "/ed" }, { label: "ED Treatment Cost Index" }]} />
          <h1 className="text-[28px] font-extrabold text-[#191919] sm:text-[36px]">
            ED Treatment Cost Index (2026)
          </h1>
          <p className="mt-3 max-w-[680px] text-[16px] leading-relaxed text-gray-500">
            What does erectile-dysfunction treatment actually cost online? We compiled the prices
            across every category - generic pills, brand-name, compounded multi-ingredient formulas,
            nasal spray and injectables - and normalized them to a single per-dose and per-month view
            so they can be compared fairly. Figures are either provider-published or representative
            market ranges, labeled on every row.
          </p>
          <LastUpdated date={COST_INDEX_UPDATED} className="mt-4" />
          <MedicalReviewBar path="/ed/ed-cost-index" className="mt-4 max-w-[760px]" />
        </div>
      </div>

      <div className="mx-auto max-w-[1000px] px-4 py-10 sm:px-6">
        {/* Key findings */}
        <section className="mb-12">
          <h2 className="mb-5 text-[22px] font-bold text-[#191919]">Key findings</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-5">
                <s.icon className="mb-3 h-5 w-5 text-[#0C4B75]" strokeWidth={2} aria-hidden="true" />
                <div className="text-[26px] font-extrabold leading-none text-[#191919]">{s.value}</div>
                <div className="mt-2 text-[13.5px] font-semibold text-gray-700">{s.label}</div>
                <div className="mt-0.5 text-[12.5px] text-gray-500">{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* The index table */}
        <section className="mb-12">
          <h2 className="mb-2 text-[22px] font-bold text-[#191919]">The full cost index</h2>
          <p className="mb-5 text-[14px] leading-relaxed text-gray-500">
            Sorted from cheapest to most expensive by normalized monthly cost. Per-dose options are
            normalized at ~{DOSES_PER_MONTH_BASIS} doses/month for comparison only.{" "}
            <span className="font-semibold text-gray-700">Verified price</span> = published by the
            provider (and still subject to change - confirm at checkout).{" "}
            <span className="font-semibold text-gray-700">Est. range</span> = a representative US
            online-market range, not a single provider&rsquo;s price.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full border-collapse text-left text-[14px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-[12px] uppercase tracking-wide text-gray-500">
                  <th className="px-4 py-3 font-semibold">Treatment</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Headline price</th>
                  <th className="px-4 py-3 font-semibold">Est. / month</th>
                  <th className="px-4 py-3 font-semibold">Basis</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((e) => (
                  <tr key={e.name} className="border-b border-gray-100 last:border-0 align-top">
                    <td className="px-4 py-3">
                      {e.href ? (
                        <Link href={e.href} className="font-semibold text-[#0C4B75] hover:underline">
                          {e.name}
                        </Link>
                      ) : (
                        <span className="font-semibold text-[#191919]">{e.name}</span>
                      )}
                      <div className="mt-0.5 text-[12px] text-gray-500">{e.format}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{e.category}</td>
                    <td className="px-4 py-3 font-semibold text-[#191919]">{e.headline}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                      {money(e.perMonthLow)}&ndash;{money(e.perMonthHigh)}
                    </td>
                    <td className="px-4 py-3">
                      <BasisBadge entry={e} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[12.5px] text-gray-400">
            Prices and promotions change constantly. Treat every figure as approximate and confirm the
            current total directly with each provider before subscribing.
          </p>
        </section>

        {/* Methodology */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">Methodology</h2>
          <div className="space-y-3 text-[15px] leading-[1.75] text-gray-600">
            <p>
              The index covers the legitimate routes to ED treatment in the US online market: generic
              oral PDE5 inhibitors, brand-name pills, compounded multi-ingredient formulas, intranasal
              treatment and injectables. We exclude unregulated &ldquo;gas station&rdquo; and
              &ldquo;herbal&rdquo; products, which are not proven ED treatments - see our guide to{" "}
              <Link href="/ed/articles/over-the-counter-ed-treatment" className="font-semibold text-[#0C4B75] hover:underline">
                over-the-counter ED pills
              </Link>{" "}
              for why.
            </p>
            <p>
              <strong className="text-gray-800">Verified prices</strong> are recorded as each provider
              publishes them. <strong className="text-gray-800">Estimated ranges</strong> are compiled
              editorial estimates of the typical US online spread for a category - intentionally wide,
              and not a claim about any single provider. To put per-dose and per-month pricing on one
              axis, per-dose options are normalized at roughly {DOSES_PER_MONTH_BASIS} doses per month;
              your real usage may differ.
            </p>
            <p>
              This index is refreshed as provider pricing changes. We don&rsquo;t accept payment to
              alter a figure. For the reasoning behind these costs - generic vs brand vs compounded,
              subscription vs per-dose, and the fees to watch for - see our{" "}
              <Link href="/ed/articles/ed-treatment-cost" className="font-semibold text-[#0C4B75] hover:underline">
                guide to ED treatment cost
              </Link>
              , and how we research providers on our{" "}
              <Link href="/weight-loss/how-we-rank" className="font-semibold text-[#0C4B75] hover:underline">
                methodology page
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Cite this */}
        <section className="mb-12">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-2 flex items-center gap-2">
              <Quote className="h-4 w-4 text-[#0C4B75]" aria-hidden="true" />
              <h2 className="text-[16px] font-bold text-[#191919]">Cite this index</h2>
            </div>
            <p className="mb-3 text-[14px] text-gray-600">
              Writing about ED treatment costs? You&rsquo;re welcome to cite the ED Treatment Cost
              Index with a link. Suggested attribution:
            </p>
            <div className="rounded-lg bg-gray-50 p-4 text-[13.5px] leading-relaxed text-gray-700 ring-1 ring-gray-100">
              &ldquo;ED Treatment Cost Index (2026),&rdquo; Treatments Hub.{" "}
              <span className="break-all text-[#0C4B75]">{CANONICAL}</span>
            </div>
          </div>
        </section>

        {/* Next steps */}
        <section>
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">Compare the providers behind these prices</h2>
          <p className="text-[15px] leading-[1.75] text-gray-600">
            See how the licensed clinics stack up on our{" "}
            <Link href="/ed" className="font-semibold text-[#0C4B75] hover:underline">
              ED treatment comparison
            </Link>
            , read the full{" "}
            <Link href="/ed/reviews/quad" className="font-semibold text-[#0C4B75] hover:underline">
              Quad by MEDVi review
            </Link>{" "}
            (our top pick), or browse all{" "}
            <Link href="/ed/reviews" className="font-semibold text-[#0C4B75] hover:underline">
              provider reviews
            </Link>
            .
          </p>
          <p className="mt-6 text-[13px] text-gray-400">
            This page is general information, not medical or financial advice. ED medications are
            prescription-only; whether one is right for you is a decision for you and a licensed
            clinician. Confirm current pricing directly with each provider.
          </p>
        </section>
      </div>
    </div>
  );
}
