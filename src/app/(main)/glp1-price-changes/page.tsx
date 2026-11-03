import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/og";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Download, History, LineChart, Rss, ShieldCheck, Table2 } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { GuideCluster } from "@/components/guide-cluster";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { TrustDisclosure } from "@/components/medical-sources";
import { ProviderCta } from "@/components/provider-cta";
import { pageReviewSchema } from "@/data/reviewers";
import { getConfig } from "@/lib/config-store";
import {
  CHANGE_KIND_LABEL,
  PRICE_CHANGES_NEWEST,
  PRICE_DATA_UPDATED,
  PRICE_INDEX_VERIFIED,
  changeId,
  changeKind,
  type ChangeKind,
  type PriceMove,
} from "@/lib/price-index";
import {
  CHANGES_CSV_PATH,
  CURRENT_CSV_PATH,
  DRUG_LABEL,
  FEED_PATH,
  HUB,
  TRACKER_PATH,
  TRACKER_URL,
  currentRows,
  longDate,
  moveLabel,
  priceRange,
  usd,
} from "@/lib/price-feed";

export const revalidate = 60;

// ───── GLP-1 price tracker ─────
// The public, dated record of online GLP-1 prices: the current verified index,
// each provider's price history, and every logged change, newest first - plus
// the same records as an RSS feed and two CSV downloads. Everything on the page
// is derived from src/lib/price-index.ts; no figure is typed into this file, so
// the copy cannot drift from the data. A change exists only when a verified row
// actually changed - this is a record, not a render timestamp or a prediction.
//
// The URL stays /glp1-price-changes (linked sitewide, in the sitemap and the
// review log since Oct 2026); the page grew from the change log into the tracker.

const PUBLISHED = "2026-10-06";
const earliest = PRICE_CHANGES_NEWEST[PRICE_CHANGES_NEWEST.length - 1]?.date ?? PRICE_INDEX_VERIFIED;
const monthLabel = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
const shortDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

const TITLE = "GLP-1 Price Tracker (2026): Semaglutide & Tirzepatide Prices";
const DESCRIPTION =
  "Current compounded semaglutide and tirzepatide prices at US telehealth providers, verified on each provider's site, with a dated log of every change.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: TRACKER_URL,
  },
  openGraph: { images: [DEFAULT_OG_IMAGE], title: TITLE, description: DESCRIPTION, url: TRACKER_URL, type: "article" },
};

const KIND_STYLE: Record<ChangeKind, string> = {
  cut: "bg-emerald-50 text-emerald-700",
  increase: "bg-amber-50 text-amber-700",
  mixed: "bg-sky-50 text-sky-700",
  new: "bg-sky-50 text-sky-700",
  terms: "bg-gray-100 text-gray-600",
};

function MoveChip({ m }: { m: PriceMove }) {
  const down = m.from !== null && m.to < m.from;
  const up = m.from !== null && m.to > m.from;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-[13px] text-gray-700 [font-variant-numeric:tabular-nums]">
      {(down || up) && <Icon className={`h-3.5 w-3.5 ${down ? "text-emerald-600" : "text-amber-600"}`} strokeWidth={2.5} />}
      {moveLabel(m)}
    </span>
  );
}

export default async function PriceTrackerPage() {
  const config = await getConfig("weight-loss");
  const byId = new Map(config.providers.map((p) => [p.id, p]));
  const name = (id: string) => byId.get(id)?.name ?? id;
  const rows = await currentRows();

  // ── Derived summary figures (all from the index and the log) ──
  const sema = priceRange(rows.map((r) => r.semaValue));
  const tirz = priceRange(rows.map((r) => r.tirzValue));
  const semaCount = rows.filter((r) => r.semaValue !== null).length;
  const tirzCount = rows.filter((r) => r.tirzValue !== null).length;
  const planRows = rows.filter((r) => r.planValue !== null);
  const planNote = planRows.length
    ? `${planRows.map((r) => r.name).join(", ").replace(/, ([^,]*)$/, " and $1")} publish a single starting price (${planRows.map((r) => `${r.name} ${r.plan!.price}`).join(", ")}) rather than a price per medication.`
    : "";
  const cheapestSema = rows.filter((r) => r.semaValue !== null).sort((a, b) => a.semaValue! - b.semaValue!)[0];
  const cheapestTirz = rows.filter((r) => r.tirzValue !== null).sort((a, b) => a.tirzValue! - b.tirzValue!)[0];
  const entries = PRICE_CHANGES_NEWEST;
  const kinds = entries.map(changeKind);
  const count = (k: ChangeKind) => kinds.filter((x) => x === k).length;
  const providersChanged = new Set(entries.map((e) => e.providerId)).size;
  const KIND_NOUN: Record<ChangeKind, [string, string]> = {
    cut: ["price cut", "price cuts"],
    increase: ["price increase", "price increases"],
    mixed: ["mixed price change", "mixed price changes"],
    new: ["new listing", "new listings"],
    terms: ["change to terms", "changes to terms"],
  };
  const kindParts = (Object.keys(KIND_NOUN) as ChangeKind[])
    .filter((k) => count(k) > 0)
    .map((k) => `${count(k)} ${KIND_NOUN[k][count(k) === 1 ? 0 : 1]}`);
  const kindSummary = kindParts.length > 1 ? `${kindParts.slice(0, -1).join(", ")} and ${kindParts.at(-1)}` : kindParts[0] ?? "none yet";

  // ── Price history: per provider and medication, oldest → newest ──
  type Point = { price: number; date: string | null };
  const history = new Map<string, Map<PriceMove["drug"], Point[]>>();
  for (const e of [...entries].reverse()) {
    for (const m of e.moves ?? []) {
      const byDrug = history.get(e.providerId) ?? new Map<PriceMove["drug"], Point[]>();
      const series = byDrug.get(m.drug) ?? [];
      if (series.length === 0 && m.from !== null) series.push({ price: m.from, date: null });
      series.push({ price: m.to, date: e.date });
      byDrug.set(m.drug, series);
      history.set(e.providerId, byDrug);
    }
  }
  const historyProviders = [...history.keys()];

  const shortAnswer =
    sema && tirz && cheapestSema && cheapestTirz
      ? `As of ${longDate(PRICE_DATA_UPDATED)}, listed compounded semaglutide prices run from ${usd(sema.min)} to ${usd(sema.max)} a month across the ${semaCount} providers that publish one, and compounded tirzepatide from ${usd(tirz.min)} to ${usd(tirz.max)} a month across ${tirzCount}. The lowest semaglutide price is ${cheapestSema.name} at ${cheapestSema.semaglutide!.price} a month, and the lowest tirzepatide price is ${cheapestTirz.name} at ${cheapestTirz.tirzepatide!.price} a month. ${planNote} Every price is read on the provider's own site, and the condition attached to it is shown next to it.`
      : "";

  const faqs: { question: string; answer: string }[] = [
    ...(sema && cheapestSema
      ? [{
          question: "How much does compounded semaglutide cost online?",
          answer: `Across the ${semaCount} US telehealth providers in our index that publish a semaglutide price, listed compounded semaglutide runs from ${usd(sema.min)} to ${usd(sema.max)} a month as of ${longDate(PRICE_DATA_UPDATED)}. The lowest listing is ${cheapestSema.name} at ${cheapestSema.semaglutide!.price} a month; its condition: ${cheapestSema.semaglutide!.note}. Low headline prices are often tied to a promotion or a plan length, so check the condition next to each price.`,
        }]
      : []),
    ...(tirz && cheapestTirz
      ? [{
          question: "How much does compounded tirzepatide cost online?",
          answer: `Listed compounded tirzepatide runs from ${usd(tirz.min)} to ${usd(tirz.max)} a month across the ${tirzCount} providers we track that publish a tirzepatide price, as of ${longDate(PRICE_DATA_UPDATED)}. The lowest listing is ${cheapestTirz.name} at ${cheapestTirz.tirzepatide!.price} a month; its condition: ${cheapestTirz.tirzepatide!.note}.`,
        }]
      : []),
    {
      question: "How often do online GLP-1 prices change?",
      answer: `We have logged ${entries.length} verified changes across ${providersChanged} providers since ${longDate(earliest)}: ${kindSummary}. A change is logged when a listed price moves or when its terms change, such as a promotion's end date.`,
    },
    {
      question: "How are these prices verified?",
      answer: `Each figure is read on the provider's own website or taken from a pricing notice the provider sent us, and the condition attached to it (a promotion, a plan length, a prepaid term) is recorded with it. A change is logged only after it is verified. The full index was last verified ${longDate(PRICE_INDEX_VERIFIED)}.`,
    },
    {
      question: "Can I download or subscribe to this price data?",
      answer: `Yes. The change log is available as an RSS feed at ${HUB}${FEED_PATH} and as a CSV at ${HUB}${CHANGES_CSV_PATH}; the current prices are a CSV at ${HUB}${CURRENT_CSV_PATH}. They contain the same records shown on this page.`,
    },
  ];

  // ── Structured data ──
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${TRACKER_URL}#dataset`,
    name: "Treatments Hub GLP-1 Price Tracker",
    description: `Listed monthly prices for compounded semaglutide and compounded tirzepatide at ${rows.length} US telehealth providers, each with its pricing condition, and a dated log of every verified change with the before and after price. Prices are read on each provider's own website; a change is logged only after it is verified.`,
    url: TRACKER_URL,
    datePublished: PUBLISHED,
    dateModified: PRICE_DATA_UPDATED,
    temporalCoverage: `${earliest}/${PRICE_DATA_UPDATED}`,
    spatialCoverage: { "@type": "Country", name: "United States" },
    creator: { "@type": "Organization", name: "Treatments Hub", url: HUB },
    publisher: { "@type": "Organization", name: "Treatments Hub", url: HUB },
    isAccessibleForFree: true,
    measurementTechnique: "Manual verification of each provider's published price on its own website, with the condition attached to the price",
    variableMeasured: [
      "Compounded semaglutide listed monthly price (USD)",
      "Compounded tirzepatide listed monthly price (USD)",
      "Pricing condition (promotion, plan length, prepaid term)",
      "Price change date, previous price and new price",
    ],
    keywords: ["GLP-1 price tracker", "semaglutide price", "tirzepatide price", "compounded GLP-1 cost", "telehealth weight loss prices"],
    distribution: [
      { "@type": "DataDownload", name: "GLP-1 price change log (CSV)", encodingFormat: "text/csv", contentUrl: `${HUB}${CHANGES_CSV_PATH}` },
      { "@type": "DataDownload", name: "Current GLP-1 prices by provider (CSV)", encodingFormat: "text/csv", contentUrl: `${HUB}${CURRENT_CSV_PATH}` },
      { "@type": "DataDownload", name: "GLP-1 price change feed (RSS)", encodingFormat: "application/rss+xml", contentUrl: `${HUB}${FEED_PATH}` },
    ],
  };
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: PUBLISHED,
    dateModified: PRICE_DATA_UPDATED,
    ...pageReviewSchema(TRACKER_PATH),
    author: { "@type": "Organization", name: "Treatments Hub Research Team", url: `${HUB}/weight-loss/about` },
    publisher: { "@type": "Organization", name: "Treatments Hub", url: HUB },
    mainEntityOfPage: { "@type": "WebPage", "@id": TRACKER_URL },
    about: { "@id": `${TRACKER_URL}#dataset` },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${HUB}/weight-loss` },
      { "@type": "ListItem", position: 2, name: "GLP-1 Price Tracker", item: TRACKER_URL },
    ],
  };

  const ext = "font-semibold text-[#0C4B75] hover:underline";
  const dataLink =
    "inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[13px] font-semibold text-[#0C4B75] hover:border-[#0C4B75]/40 hover:bg-[#EEF3F8]";

  return (
    <div className="min-h-screen bg-gray-50">
      {[datasetSchema, articleSchema, faqSchema, breadcrumbSchema].map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* ── Hero ── */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1040px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/weight-loss" }, { label: "GLP-1 Price Tracker" }]} />
          <h1 className="max-w-[860px] text-[27px] font-extrabold leading-[1.15] text-[#191919] sm:text-[36px]">
            GLP-1 Price Tracker: Semaglutide and Tirzepatide Prices by Provider
          </h1>
          <p className="mt-3 max-w-[740px] text-[16px] leading-relaxed text-gray-500">
            What online GLP-1 providers charge right now, how those prices have moved, and the date of every change. Each
            price is read on the provider&rsquo;s own site and shown with the condition attached to it. A change is logged
            only after it is verified.
          </p>
          <LastUpdated date={PRICE_DATA_UPDATED} className="mt-4" />
          <MedicalReviewBar path={TRACKER_PATH} className="mt-4 max-w-[760px]" />
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={FEED_PATH} className={dataLink}><Rss className="h-4 w-4" strokeWidth={2.25} />RSS feed</a>
            <a href={CURRENT_CSV_PATH} className={dataLink}><Download className="h-4 w-4" strokeWidth={2.25} />Current prices (CSV)</a>
            <a href={CHANGES_CSV_PATH} className={dataLink}><Download className="h-4 w-4" strokeWidth={2.25} />Change log (CSV)</a>
          </div>
          <TrustDisclosure disclaimerHref="/weight-loss/disclaimer" />
        </div>
      </div>

      <div className="mx-auto max-w-[1040px] px-4 py-10 text-[16px] leading-[1.75] text-gray-800 sm:px-6">
        {/* ── Short answer ── */}
        {shortAnswer && (
          <div className="mb-10 flex items-start gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
            <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" strokeWidth={2} />
            <div className="text-[15px] leading-[1.75] text-gray-600">
              <h2 className="mb-2 text-[18px] font-bold text-[#191919]">How much do online GLP-1s cost right now?</h2>
              <p>{shortAnswer}</p>
            </div>
          </div>
        )}

        {/* ── Current prices ── */}
        <section className="mb-12" aria-labelledby="current-prices">
          <div className="mb-2 flex items-center gap-2">
            <Table2 className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 id="current-prices" className="text-[22px] font-bold text-[#191919]">Current GLP-1 prices by provider</h2>
          </div>
          <p className="mb-5 text-[14px] text-gray-500">
            Listed monthly price for compounded medication, cheapest semaglutide first. Index verified {longDate(PRICE_INDEX_VERIFIED)}.
          </p>
          <div className="relative hidden overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
            <table className="w-full min-w-[760px] border-collapse text-left text-[14px]">
              <caption className="sr-only">Current compounded semaglutide and tirzepatide prices by provider</caption>
              <thead className="bg-gray-50/80 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">Provider</th>
                  <th scope="col" className="px-4 py-3">Semaglutide</th>
                  <th scope="col" className="px-4 py-3">Tirzepatide</th>
                  <th scope="col" className="px-4 py-3">Commitment</th>
                  <th scope="col" className="px-4 py-3">Last change</th>
                  <th scope="col" className="px-4 py-3"><span className="sr-only">Link</span></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const p = byId.get(r.providerId)!;
                  const last = entries.find((e) => e.providerId === r.providerId);
                  return (
                    <tr key={r.providerId} className="border-t border-gray-100 align-top">
                      <th scope="row" className="px-4 py-4 font-normal">
                        <Link href={`/weight-loss/reviews/${p.id}`} className="text-[15px] font-bold text-[#191919] hover:text-[#0C4B75]">{p.name}</Link>
                        <p className="mt-0.5 max-w-[220px] text-[12.5px] leading-snug text-gray-500">{r.edge}</p>
                      </th>
                      {r.planValue !== null ? (
                        <td colSpan={2} className="px-4 py-4">
                          <span className="text-[12px] font-semibold text-gray-500">Plans </span>
                          <span className="text-[18px] font-extrabold text-[#191919] [font-variant-numeric:tabular-nums]">{r.plan!.price}</span>
                          <span className="ml-0.5 text-[12px] font-semibold text-gray-400">/mo</span>
                          <p className="mt-0.5 max-w-[380px] text-[12px] leading-snug text-gray-500">{r.plan!.note}; no separate price per medication published</p>
                        </td>
                      ) : [r.semaglutide, r.tirzepatide].map((c, i) => (
                        <td key={i} className="px-4 py-4">
                          {c ? (
                            <>
                              <span className="text-[18px] font-extrabold text-[#191919] [font-variant-numeric:tabular-nums]">{c.price}</span>
                              <span className="ml-0.5 text-[12px] font-semibold text-gray-400">/mo</span>
                              <p className="mt-0.5 max-w-[190px] text-[12px] leading-snug text-gray-500">{c.note}</p>
                            </>
                          ) : (
                            <span className="text-[13px] text-gray-400">Not offered</span>
                          )}
                        </td>
                      ))}
                      <td className="max-w-[180px] px-4 py-4 text-[13px] leading-snug text-gray-600">{r.commitment}</td>
                      <td className="px-4 py-4 text-[13px] text-gray-600">
                        {last ? <a href={`#${changeId(last)}`} className="hover:text-[#0C4B75] hover:underline">{shortDate(last.date)}</a> : <span className="text-gray-400">None logged</span>}
                      </td>
                      <td className="px-4 py-4">
                        <ProviderCta href={p.affiliateUrl} providerName={p.name} providerSlug={p.id} pageType="listing" sourceFlow="main_comparison" className="inline-flex items-center gap-1 whitespace-nowrap text-[13px] font-semibold text-[#0C4B75] hover:underline">
                          Check price <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                        </ProviderCta>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Mobile: one self-labelled card per provider */}
          <ul className="space-y-3 md:hidden">
            {rows.map((r) => {
              const p = byId.get(r.providerId)!;
              const last = entries.find((e) => e.providerId === r.providerId);
              return (
                <li key={r.providerId} className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <Link href={`/weight-loss/reviews/${p.id}`} className="text-[16px] font-bold text-[#191919]">{p.name}</Link>
                    <ProviderCta href={p.affiliateUrl} providerName={p.name} providerSlug={p.id} pageType="listing" sourceFlow="main_comparison" className="inline-flex shrink-0 items-center gap-1 text-[13px] font-semibold text-[#0C4B75]">
                      Check price <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </ProviderCta>
                  </div>
                  <p className="mt-0.5 text-[12.5px] leading-snug text-gray-500">{r.edge}</p>
                  <dl className="mt-3 grid grid-cols-2 gap-3">
                    {(r.planValue !== null ? ([["Plans", r.plan!]] as const) : ([["Semaglutide", r.semaglutide], ["Tirzepatide", r.tirzepatide]] as const)).map(([label, c]) => (
                      <div key={label}>
                        <dt className="text-[11px] font-bold uppercase tracking-[0.06em] text-gray-400">{label}</dt>
                        <dd>
                          {c ? (
                            <>
                              <span className="text-[18px] font-extrabold text-[#191919] [font-variant-numeric:tabular-nums]">{c.price}</span>
                              <span className="ml-0.5 text-[12px] font-semibold text-gray-400">/mo</span>
                              <p className="mt-0.5 text-[12px] leading-snug text-gray-500">{c.note}</p>
                            </>
                          ) : (
                            <span className="text-[13px] text-gray-400">Not offered</span>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-3 border-t border-gray-100 pt-2 text-[12.5px] leading-snug text-gray-600">
                    {r.commitment}
                    {last && (
                      <>
                        {" · "}Last change <a href={`#${changeId(last)}`} className="font-semibold text-[#0C4B75]">{shortDate(last.date)}</a>
                      </>
                    )}
                  </p>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-[13px] text-gray-500">
            Choosing on more than price? See the <Link href="/weight-loss/cheapest-glp1" className={ext}>cheapest GLP-1 comparison</Link> and the{" "}
            <Link href="/weight-loss/glp1-cost-calculator" className={ext}>GLP-1 cost calculator</Link>.
          </p>
        </section>

        {/* ── Price history ── */}
        {historyProviders.length > 0 && (
          <section className="mb-12" aria-labelledby="price-history">
            <div className="mb-2 flex items-center gap-2">
              <LineChart className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
              <h2 id="price-history" className="text-[22px] font-bold text-[#191919]">Price history by provider</h2>
            </div>
            <p className="mb-5 text-[14px] text-gray-500">Each listed monthly price we have recorded, oldest to newest, for providers whose price has moved since {monthLabel(earliest)}.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {historyProviders.map((id) => (
                <div key={id} className="rounded-xl border border-gray-200 bg-white p-5">
                  <h3 className="text-[16px] font-bold text-[#191919]">
                    <Link href={`/weight-loss/reviews/${id}`} className="hover:text-[#0C4B75] hover:underline">{name(id)}</Link>
                  </h3>
                  <dl className="mt-3 space-y-3">
                    {[...history.get(id)!.entries()].map(([drug, series]) => (
                      <div key={drug}>
                        <dt className="text-[12px] font-bold uppercase tracking-[0.06em] text-gray-400">{DRUG_LABEL[drug]}</dt>
                        <dd className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[14px] text-gray-700 [font-variant-numeric:tabular-nums]">
                          {series.map((pt, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5">
                              {i > 0 && <span className="text-gray-300">→</span>}
                              <span>
                                <strong className="text-[#191919]">{usd(pt.price)}</strong>
                                <span className="ml-1 text-[12px] text-gray-500">{pt.date ? shortDate(pt.date) : "before"}</span>
                              </span>
                            </span>
                          ))}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Change log ── */}
        <section className="mb-12" aria-labelledby="change-log">
          <div className="mb-5 flex items-center gap-2">
            <History className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 id="change-log" className="text-[22px] font-bold text-[#191919]">Every logged change, newest first</h2>
          </div>
          <ol className="relative space-y-4 border-l-2 border-gray-200 pl-6">
            {entries.map((e) => {
              const p = byId.get(e.providerId);
              const kind = changeKind(e);
              return (
                <li key={changeId(e)} id={changeId(e)} className="relative scroll-mt-24 rounded-xl border border-gray-200 bg-white p-5">
                  <span className="absolute -left-[31px] top-6 h-3 w-3 rounded-full border-2 border-white bg-[#0C4B75]" />
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[15px] font-bold text-[#191919]">
                        {p ? <Link href={`/weight-loss/reviews/${p.id}`} className="hover:text-[#0C4B75] hover:underline">{p.name}</Link> : e.providerId}
                      </h3>
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${KIND_STYLE[kind]}`}>{CHANGE_KIND_LABEL[kind]}</span>
                    </div>
                    <time dateTime={e.date} className="text-[13px] font-semibold text-gray-500">{longDate(e.date)}</time>
                  </div>
                  {e.moves && e.moves.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {e.moves.map((m) => <MoveChip key={m.drug} m={m} />)}
                    </div>
                  )}
                  <p className="mt-3 text-[14.5px] leading-relaxed text-gray-700">{e.change}</p>
                  {e.source && <p className="mt-2 text-[12.5px] text-gray-500">Source: {e.source}</p>}
                </li>
              );
            })}
          </ol>
        </section>

        {/* ── Use the data ── */}
        <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6" aria-labelledby="use-data">
          <h2 id="use-data" className="mb-3 text-[20px] font-bold text-[#191919]">Use this data</h2>
          <ul className="list-disc space-y-2 pl-5 text-[15px] leading-[1.7] text-gray-600">
            <li><strong className="text-[#191919]">RSS feed.</strong> Subscribe at <a href={FEED_PATH} className={`${ext} break-all`}>{HUB}{FEED_PATH}</a> to get each verified change as it is logged.</li>
            <li><strong className="text-[#191919]">CSV downloads.</strong> <a href={CURRENT_CSV_PATH} className={ext}>Current prices</a> (one row per provider) and the <a href={CHANGES_CSV_PATH} className={ext}>change log</a> (one row per price move, with previous price, new price and percent change).</li>
            <li><strong className="text-[#191919]">Citing it.</strong> If you quote these figures, please link to this page and give the date, for example: &ldquo;Treatments Hub GLP-1 Price Tracker, prices as of {longDate(PRICE_DATA_UPDATED)}.&rdquo; Prices change, so the date matters.</li>
          </ul>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-12" aria-labelledby="faq">
          <h2 id="faq" className="mb-4 text-[22px] font-bold text-[#191919]">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <div key={f.question} className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="text-[16px] font-bold text-[#191919]">{f.question}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-gray-600 [overflow-wrap:anywhere]">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Method ── */}
        <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6" aria-labelledby="method">
          <h2 id="method" className="mb-3 text-[20px] font-bold text-[#191919]">How this tracker works</h2>
          <ul className="list-disc space-y-2 pl-5 text-[15px] leading-[1.7] text-gray-600">
            <li><strong className="text-[#191919]">One entry per verified change.</strong> A change is logged only after we have read the new figure on the provider&rsquo;s own site or received it in the provider&rsquo;s pricing notice. The entry records what our listing said before and after; the index, every page built from it, the feed and the CSV files update in the same step.</li>
            <li><strong className="text-[#191919]">What &ldquo;listed price&rdquo; means.</strong> The headline monthly rate for compounded medication with its condition: a 12-month plan, a promotion, a flat month-to-month figure. A promotion being extended is logged as a terms change even when the number does not move.</li>
            <li><strong className="text-[#191919]">What is not here.</strong> Prices we have not verified, rumours, and figures from other comparison sites. Brand-name list prices are on the <Link href="/weight-loss/glp1-weight-loss-statistics" className={ext}>GLP-1 price index and statistics</Link> page. If a price on a provider&rsquo;s site differs from ours, email{" "}<a href="mailto:contact@treatmentshub.com" className={ext}>contact@treatmentshub.com</a>{" "}and we will verify and log it.</li>
            <li><strong className="text-[#191919]">Not medical advice.</strong> Price is one factor. A licensed clinician decides whether a medication and dose are right for you.</li>
          </ul>
        </section>

        <GuideCluster currentSlug="glp1-price-changes" />
      </div>
    </div>
  );
}
