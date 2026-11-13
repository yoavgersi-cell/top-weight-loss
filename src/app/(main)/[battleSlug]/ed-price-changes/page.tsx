import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDownRight, ArrowUpRight, Download, History, LineChart, Rss, ShieldCheck, Table2 } from "lucide-react";
import { DEFAULT_OG_IMAGE } from "@/lib/og";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { GuideCluster, ED_GUIDES } from "@/components/guide-cluster";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { TrustDisclosure } from "@/components/medical-sources";
import { pageReviewSchema } from "@/data/reviewers";
import {
  ED_CHANGE_KIND_LABEL,
  ED_PRICE_CHANGES_NEWEST,
  ED_PRICE_DATA_UPDATED,
  ED_PRICE_INDEX_VERIFIED,
  edChangeId,
  edChangeKind,
  type EdChangeKind,
  type EdPriceMove,
} from "@/lib/ed-price-index";
import {
  ED_CHANGES_CSV_PATH,
  ED_CURRENT_CSV_PATH,
  ED_FEED_PATH,
  ED_TRACKER_PATH,
  ED_TRACKER_URL,
  HUB,
  UNIT_LONG,
  UNIT_SHORT,
  edCurrentRows,
  edMoveLabel,
  edRange,
  usdEd,
} from "@/lib/ed-price-feed";
import { longDate } from "@/lib/price-feed";

export const revalidate = 60;

// ───── ED treatment price tracker ─────
// The public, dated record of what online ED providers publish as their
// prices: the current verified index (generic pills per dose or per month,
// compounded and non-pill programs), every product each provider lists, and
// a log of every verified change - plus the same records as an RSS feed and
// two CSV downloads. Everything here is derived from src/lib/ed-price-index.ts;
// no figure is typed into this file. Served at /ed/ed-price-changes only.

const PUBLISHED = "2026-11-11";
const earliest = ED_PRICE_CHANGES_NEWEST[ED_PRICE_CHANGES_NEWEST.length - 1]?.date ?? ED_PRICE_INDEX_VERIFIED;
const shortDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

const TITLE = "ED Treatment Price Tracker (2026): Sildenafil, Tadalafil & Compounded";
const DESCRIPTION =
  "What online ED treatment costs right now: generic sildenafil and tadalafil, compounded formulas and nasal spray at US telehealth providers, verified on each site, with a dated change log.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: ED_TRACKER_URL },
  openGraph: { images: [DEFAULT_OG_IMAGE], title: TITLE, description: DESCRIPTION, url: ED_TRACKER_URL, type: "article" },
};

const KIND_STYLE: Record<EdChangeKind, string> = {
  cut: "bg-emerald-50 text-emerald-700",
  increase: "bg-amber-50 text-amber-700",
  mixed: "bg-sky-50 text-sky-700",
  new: "bg-sky-50 text-sky-700",
  terms: "bg-gray-100 text-gray-600",
};

function MoveChip({ m }: { m: EdPriceMove }) {
  const down = m.from !== null && m.to < m.from;
  const up = m.from !== null && m.to > m.from;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-[13px] text-gray-700 [font-variant-numeric:tabular-nums]">
      {(down || up) && <Icon className={`h-3.5 w-3.5 ${down ? "text-emerald-600" : "text-amber-600"}`} strokeWidth={2.5} />}
      {edMoveLabel(m)}
    </span>
  );
}

export default async function EdPriceTrackerPage({ params }: { params: Promise<{ battleSlug: string }> }) {
  const { battleSlug } = await params;
  if (battleSlug !== "ed") return notFound();

  const rows = await edCurrentRows();
  const listed = rows.filter((r) => r.headline);
  const monthly = edRange(rows.flatMap((r) => [r.generic?.unit === "month" ? r.genericValue : null, r.compounded?.unit === "month" ? r.compoundedValue : null]));
  const perDose = edRange(rows.flatMap((r) => [r.generic?.unit === "dose" ? r.genericValue : null, r.compounded?.unit === "dose" ? r.compoundedValue : null]));
  const cheapestMonthly = rows
    .flatMap((r) => [r.generic?.unit === "month" ? { r, cell: r.generic } : null, r.compounded?.unit === "month" ? { r, cell: r.compounded } : null])
    .filter((x): x is { r: (typeof rows)[number]; cell: NonNullable<(typeof rows)[number]["generic"]> } => !!x)
    .sort((a, b) => Number(a.cell.price.replace(/[^\d.]/g, "")) - Number(b.cell.price.replace(/[^\d.]/g, "")))[0];
  const cheapestDose = rows
    .flatMap((r) => [r.generic?.unit === "dose" ? { r, cell: r.generic } : null, r.compounded?.unit === "dose" ? { r, cell: r.compounded } : null])
    .filter((x): x is { r: (typeof rows)[number]; cell: NonNullable<(typeof rows)[number]["generic"]> } => !!x)
    .sort((a, b) => Number(a.cell.price.replace(/[^\d.]/g, "")) - Number(b.cell.price.replace(/[^\d.]/g, "")))[0];
  const unlisted = rows.filter((r) => !r.headline);

  const entries = ED_PRICE_CHANGES_NEWEST;
  const providersChanged = new Set(entries.map((e) => e.providerId)).size;

  const shortAnswer = `As of ${longDate(ED_PRICE_DATA_UPDATED)}, ${listed.length} of the ${rows.length} ED telehealth providers we rank publish a price. ${
    monthly ? `Monthly plans run from ${usdEd(monthly.min)} to ${usdEd(monthly.max)} a month` : ""
  }${monthly && perDose ? ", and " : ""}${perDose ? `per-dose pricing from ${usdEd(perDose.min)} to ${usdEd(perDose.max)} a dose` : ""}. ${
    cheapestMonthly ? `The lowest monthly listing is ${cheapestMonthly.r.name} at ${cheapestMonthly.cell.price} a month (${cheapestMonthly.cell.note}).` : ""
  } ${cheapestDose ? `The lowest per-dose listing is ${cheapestDose.r.name} at ${cheapestDose.cell.price} a dose (${cheapestDose.cell.note}).` : ""} ${
    unlisted.length ? `${unlisted.map((r) => r.name).join(" and ")} ${unlisted.length === 1 ? "publishes" : "publish"} no price on the pages we could reach, so ${unlisted.length === 1 ? "it is" : "they are"} listed without one rather than estimated.` : ""
  } Every figure is read on the provider's own site, with the condition attached to it shown next to it; generic and compounded prices are kept apart because they are not the same product.`;

  const faqs: { question: string; answer: string }[] = [
    {
      question: "How much does ED medication cost online?",
      answer: shortAnswer,
    },
    {
      question: "Why are some prices per dose and others per month?",
      answer:
        "Because that is how the providers publish them. Generic sildenafil and tadalafil are often sold per tablet, while compounded formulas and subscription plans are priced per month. We record each figure in the unit the provider uses and never convert one into the other silently; where we divide a multi-month supply to get a monthly figure, the note says so.",
    },
    {
      question: "Are compounded ED medications the same as generic Viagra or Cialis?",
      answer:
        "No. Generic sildenafil and tadalafil are FDA-approved medicines. Compounded formulas (chews, mints, sublinguals, multi-ingredient capsules and the intranasal spray) are prepared by licensed pharmacies for an individual prescription and are not FDA-approved products; the FDA does not verify their safety, effectiveness or quality. That is why the index keeps the two columns apart.",
    },
    {
      question: "How are these prices verified?",
      answer: `Each figure is read on the provider's own website and the condition attached to it (a sale, a starting price, a pack size, a subscription plan) is recorded with it. A change is logged only after it is verified. The index was last verified ${longDate(ED_PRICE_INDEX_VERIFIED)}; two rows carry an earlier date because those sites could not be re-checked that day, and the row says so.`,
    },
    {
      question: "Can I download or subscribe to this price data?",
      answer: `Yes. The change log is an RSS feed at ${HUB}${ED_FEED_PATH} and a CSV at ${HUB}${ED_CHANGES_CSV_PATH}; the current prices are a CSV at ${HUB}${ED_CURRENT_CSV_PATH}. They contain the same records shown on this page.`,
    },
  ];

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${ED_TRACKER_URL}#dataset`,
    name: "Treatments Hub ED Treatment Price Tracker",
    description: `Published prices for online ED treatment (generic sildenafil and tadalafil, compounded formulas, intranasal spray) at ${rows.length} US telehealth providers, each with its unit and pricing condition, and a dated log of every verified change. Prices are read on each provider's own website.`,
    url: ED_TRACKER_URL,
    datePublished: PUBLISHED,
    dateModified: ED_PRICE_DATA_UPDATED,
    temporalCoverage: `${earliest}/${ED_PRICE_DATA_UPDATED}`,
    spatialCoverage: "United States",
    creator: { "@type": "Organization", name: "Treatments Hub", url: HUB },
    publisher: { "@type": "Organization", name: "Treatments Hub", url: HUB },
    isAccessibleForFree: true,
    // Search Console (Nov 13, 2026): Dataset needs a license URL, and
    // spatialCoverage must be Text or Place, not Country.
    license: "https://creativecommons.org/licenses/by/4.0/",
    measurementTechnique: "Manual verification of each provider's published price on its own website, with the unit and condition attached to the price",
    variableMeasured: [
      "Lowest listed generic sildenafil or tadalafil price (USD, per dose or per month)",
      "Lowest listed compounded or non-pill ED program price (USD, per dose or per month)",
      "Pricing condition (sale, starting price, pack size, subscription plan)",
      "Price change date, previous price and new price",
    ],
    keywords: ["ED medication price tracker", "sildenafil price", "tadalafil price", "compounded ED medication cost", "telehealth ED prices"],
    distribution: [
      { "@type": "DataDownload", name: "ED price change log (CSV)", encodingFormat: "text/csv", contentUrl: `${HUB}${ED_CHANGES_CSV_PATH}` },
      { "@type": "DataDownload", name: "Current ED prices by provider (CSV)", encodingFormat: "text/csv", contentUrl: `${HUB}${ED_CURRENT_CSV_PATH}` },
      { "@type": "DataDownload", name: "ED price change feed (RSS)", encodingFormat: "application/rss+xml", contentUrl: `${HUB}${ED_FEED_PATH}` },
    ],
  };
  const review = pageReviewSchema(ED_TRACKER_PATH);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${ED_TRACKER_URL}#article`,
    headline: TITLE,
    description: DESCRIPTION,
    url: ED_TRACKER_URL,
    datePublished: PUBLISHED,
    dateModified: ED_PRICE_DATA_UPDATED,
    author: { "@type": "Organization", name: "Treatments Hub", url: HUB },
    publisher: { "@type": "Organization", name: "Treatments Hub", url: HUB },
    about: { "@id": `${ED_TRACKER_URL}#dataset` },
    ...(review ?? {}),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  const cellText = (c: (typeof rows)[number]["generic"]) => (c ? `${c.price}${UNIT_SHORT[c.unit]}` : "Not published");

  return (
    <div className="bg-[#FAFBFC]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([datasetSchema, articleSchema, faqSchema]) }} />
      <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/ed" }, { label: "ED Treatment Price Tracker" }]} />

        <header className="mt-4 max-w-[800px]">
          <p className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#0C4B75]">
            <LineChart className="h-3.5 w-3.5" strokeWidth={2.25} /> Verified price record
          </p>
          <h1 className="mt-1 text-[26px] font-bold leading-tight text-[#191919] sm:text-[34px]">ED Treatment Price Tracker</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-gray-600 sm:text-[16px]">
            What the online ED providers we rank publish as their prices, read on each provider&rsquo;s own site: generic sildenafil and tadalafil, compounded formulas and the nasal spray, each with its unit and the condition attached to it, plus a dated log of every verified change.
          </p>
          <LastUpdated date={ED_PRICE_DATA_UPDATED} className="mt-2" />
          <MedicalReviewBar path={ED_TRACKER_PATH} className="mt-3 max-w-[760px]" />
        </header>

        <section className="mt-8 rounded-xl border-l-4 border-[#0C4B75] bg-white p-5 shadow-sm sm:p-6" aria-labelledby="short-answer">
          <h2 id="short-answer" className="text-[12px] font-bold uppercase tracking-wider text-[#0C4B75]">The short answer</h2>
          <p className="mt-2 text-[15.5px] leading-relaxed text-gray-800">{shortAnswer}</p>
        </section>

        <div className="mt-4 flex flex-wrap gap-2 text-[13px]">
          <Link href={ED_CURRENT_CSV_PATH} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 font-semibold text-[#0C4B75] hover:bg-gray-50">
            <Download className="h-3.5 w-3.5" strokeWidth={2.25} /> Current prices (CSV)
          </Link>
          <Link href={ED_CHANGES_CSV_PATH} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 font-semibold text-[#0C4B75] hover:bg-gray-50">
            <Table2 className="h-3.5 w-3.5" strokeWidth={2.25} /> Change log (CSV)
          </Link>
          <Link href={ED_FEED_PATH} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 font-semibold text-[#0C4B75] hover:bg-gray-50">
            <Rss className="h-3.5 w-3.5" strokeWidth={2.25} /> RSS feed
          </Link>
        </div>

        {/* Current index */}
        <section className="mt-10" aria-labelledby="current-index">
          <h2 id="current-index" className="text-[22px] font-bold text-[#191919]">Current listed prices</h2>
          <p className="mt-1 text-[14px] text-gray-600">
            In our ranking order. &ldquo;Generic&rdquo; is the lowest listed FDA-approved sildenafil or tadalafil price; &ldquo;Compounded / other&rdquo; is the lowest listed compounded or non-pill program. Index verified {longDate(ED_PRICE_INDEX_VERIFIED)}; a row&rsquo;s own date is shown where it differs.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full min-w-[760px] text-[13.5px]">
              <thead className="bg-gray-50 text-left text-[11.5px] uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-4 py-3">Provider</th>
                  <th className="px-4 py-3">Generic</th>
                  <th className="px-4 py-3">Compounded / other</th>
                  <th className="px-4 py-3">Commitment</th>
                  <th className="px-4 py-3">Shipping</th>
                  <th className="px-4 py-3">Verified</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.providerId} className="border-t border-gray-100 align-top">
                    <td className="px-4 py-3">
                      <Link href={`/ed/reviews/${r.providerId}`} className="font-semibold text-[#0C4B75] hover:underline">{r.name}</Link>
                      <p className="mt-0.5 text-[12px] text-gray-500">{r.edge}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-[#191919] [font-variant-numeric:tabular-nums]">{cellText(r.generic)}</span>
                      {r.generic && <p className="mt-0.5 text-[12px] leading-snug text-gray-500">{r.generic.note}</p>}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-[#191919] [font-variant-numeric:tabular-nums]">{cellText(r.compounded)}</span>
                      {r.compounded && <p className="mt-0.5 text-[12px] leading-snug text-gray-500">{r.compounded.note}</p>}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{r.commitment}</td>
                    <td className="px-4 py-3 text-gray-700">{r.shipping}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                      <time dateTime={r.verifiedAt}>{shortDate(r.verifiedAt)}</time>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Every listed product */}
        <section className="mt-10" aria-labelledby="all-products">
          <h2 id="all-products" className="text-[22px] font-bold text-[#191919]">Every price each provider lists</h2>
          <p className="mt-1 text-[14px] text-gray-600">As published, in the provider&rsquo;s own unit. Sale prices and &ldquo;from&rdquo; prices are marked.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {rows.map((r) => (
              <div key={r.providerId} className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[15px] font-bold text-[#191919]">{r.name}</h3>
                  <span className="text-[11.5px] text-gray-500">source: {r.source}</span>
                </div>
                {r.products.length === 0 ? (
                  <p className="mt-2 text-[13.5px] text-gray-600">No price published on the pages we could reach.</p>
                ) : (
                  <ul className="mt-2 divide-y divide-gray-100">
                    {r.products.map((p) => (
                      <li key={p.name} className="flex items-baseline justify-between gap-3 py-1.5 text-[13.5px]">
                        <span className="text-gray-700">
                          {p.name}
                          {p.note && <span className="text-gray-400"> · {p.note}</span>}
                        </span>
                        <span className="whitespace-nowrap font-bold text-[#191919] [font-variant-numeric:tabular-nums]">
                          {p.price}
                          <span className="font-normal text-gray-500"> / {p.unit}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Change log */}
        <section className="mt-10" aria-labelledby="change-log">
          <h2 id="change-log" className="flex items-center gap-2 text-[22px] font-bold text-[#191919]">
            <History className="h-5 w-5 text-[#0C4B75]" strokeWidth={2.25} /> Change log
          </h2>
          <p className="mt-1 text-[14px] text-gray-600">
            {entries.length} verified {entries.length === 1 ? "entry" : "entries"} across {providersChanged} providers since {longDate(earliest)}, newest first. A change is logged only when a verified listing actually changed.
          </p>
          <ol className="mt-4 space-y-3">
            {entries.map((c) => {
              const kind = edChangeKind(c);
              const name = rows.find((r) => r.providerId === c.providerId)?.name ?? c.providerId;
              return (
                <li key={edChangeId(c)} id={edChangeId(c)} className="rounded-xl border border-gray-200 bg-white p-4 scroll-mt-24">
                  <div className="flex flex-wrap items-center gap-2">
                    <time dateTime={c.date} className="text-[12.5px] font-semibold text-gray-500">{longDate(c.date)}</time>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${KIND_STYLE[kind]}`}>{ED_CHANGE_KIND_LABEL[kind]}</span>
                    <Link href={`/ed/reviews/${c.providerId}`} className="text-[14px] font-bold text-[#0C4B75] hover:underline">{name}</Link>
                  </div>
                  <p className="mt-2 text-[14px] leading-relaxed text-gray-800">{c.change}</p>
                  {c.moves && c.moves.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {c.moves.map((m) => (
                        <MoveChip key={m.product} m={m} />
                      ))}
                    </div>
                  )}
                  {c.source && <p className="mt-2 text-[12px] text-gray-500">Source: {c.source}</p>}
                </li>
              );
            })}
          </ol>
        </section>

        {/* Method */}
        <section className="mt-10 rounded-xl border border-gray-200 bg-white p-5 sm:p-6" aria-labelledby="method">
          <h2 id="method" className="flex items-center gap-2 text-[18px] font-bold text-[#191919]">
            <ShieldCheck className="h-5 w-5 text-emerald-600" strokeWidth={2.25} /> How this record is kept
          </h2>
          <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-gray-700">
            <li>Every figure is read on the provider&rsquo;s own website and recorded as published, with its unit and the condition attached to it. Nothing here is estimated; the <Link href="/ed/ed-cost-index" className="font-medium text-[#0C4B75] underline underline-offset-2">ED Cost Index</Link> holds the labelled market ranges.</li>
            <li>Generic (FDA-approved) and compounded (not FDA-approved) products are kept in separate columns and never averaged together.</li>
            <li>A provider that publishes no price is listed without one. We do not fill the gap with a guess.</li>
            <li>A change is logged only after it is verified, with the before and after figure, so the log is a record rather than a prediction. Prices and promotions change; the provider&rsquo;s checkout is the final word.</li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="mt-10" aria-labelledby="faq">
          <h2 id="faq" className="text-[22px] font-bold text-[#191919]">Questions about ED treatment prices</h2>
          <div className="mt-4 space-y-3">
            {faqs.map((f) => (
              <details key={f.question} className="group rounded-xl border border-gray-200 bg-white p-4">
                <summary className="cursor-pointer list-none text-[15px] font-semibold text-[#191919]">{f.question}</summary>
                <p className="mt-2 text-[14px] leading-relaxed text-gray-700">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-10">
          <TrustDisclosure disclaimerHref="/weight-loss/disclaimer" />
        </div>
        <GuideCluster
          currentSlug="ed-price-changes"
          prefix="/ed"
          guides={ED_GUIDES}
          heading="More erectile dysfunction (ED) guides"
          intro="Our ED treatment guides, from the same research team and the same sourcing standard."
          className="mt-8 pb-12"
        />
      </div>
    </div>
  );
}
