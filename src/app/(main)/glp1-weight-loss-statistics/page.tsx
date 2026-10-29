import { pageReviewSchema } from "@/data/reviewers";
import { DEFAULT_OG_IMAGE } from "@/lib/og";
import type { Metadata } from "next";
import Link from "next/link";
import { GuideCluster } from "@/components/guide-cluster";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { TopTwoPicks } from "@/components/top-providers-block";
import { getConfig } from "@/lib/config-store";
import { PRICE_INDEX, BRAND_SHELF, PRICE_INDEX_VERIFIED, PRICE_CHANGELOG } from "@/lib/price-index";

export const revalidate = 60;

const CANONICAL = "https://www.treatmentshub.com/weight-loss/glp1-weight-loss-statistics";
// The month in the title and hero follows the index's verification date, so
// the page can never claim a month older than the data it shows.
const MONTH_LABEL = new Date(PRICE_INDEX_VERIFIED).toLocaleDateString("en-US", { year: "numeric", month: "long", timeZone: "UTC" });
const TITLE = `GLP-1 Price Index & Weight Loss Statistics (${MONTH_LABEL})`;
const DESCRIPTION =
  "Verified prices from 9 US telehealth providers for compounded semaglutide and tirzepatide, with a public change log, next to STEP and SURMOUNT trial results.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: { images: [DEFAULT_OG_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    type: "article",
    modifiedTime: PRICE_INDEX_VERIFIED,
  },
};

const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

// The compounded-price figures below are computed at render from our verified
// GLP-1 price index (src/lib/price-index.ts) - every row is a provider-published
// price we checked, never an estimate. Deriving them here keeps the headline
// findings in lockstep with the underlying data instead of a hand-typed number
// that could drift.
const priceNum = (cell: { price: string } | null): number | null =>
  cell ? Number((cell.price.match(/\d[\d,]*/)?.[0] ?? "").replace(/,/g, "")) || null : null;

const semaPrices = PRICE_INDEX.map((r) => priceNum(r.semaglutide)).filter((n): n is number => n != null);
const tirzPrices = PRICE_INDEX.map((r) => priceNum(r.tirzepatide)).filter((n): n is number => n != null);
const PROVIDER_COUNT = PRICE_INDEX.length;
const SEMA_MIN = Math.min(...semaPrices);
const SEMA_MAX = Math.max(...semaPrices);
const TIRZ_MIN = Math.min(...tirzPrices);
const TIRZ_MAX = Math.max(...tirzPrices);
const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

// Question-and-answer pairs for the FAQ schema. Every answer restates a figure
// that is already on this page (trial averages from the cited papers, prices
// from the verified index) - nothing is introduced here that the page does not
// show and source.
const FAQS: { question: string; answer: string }[] = [
  {
    question: "How much weight do GLP-1 medications cause on average?",
    answer:
      "In the pivotal trials, semaglutide 2.4 mg (Wegovy) produced about 15% mean weight loss at 68 weeks in STEP 1, tirzepatide 15 mg (Zepbound) up to 22.5% at 72 weeks in SURMOUNT-1, and liraglutide 3 mg (Saxenda) about 5-8% at 56 weeks in SCALE. The lifestyle-only placebo arm in STEP 1 lost about 2.4%. These are trial averages; individual results vary.",
  },
  {
    question: "What does compounded GLP-1 medication cost per month?",
    answer: `At verified published prices from ${PROVIDER_COUNT} US telehealth providers, compounded semaglutide ranges from ${usd(SEMA_MIN)} to ${usd(SEMA_MAX)} per month and compounded tirzepatide from ${usd(TIRZ_MIN)} to ${usd(TIRZ_MAX)} per month, each with its pricing condition (promotional rate, plan length or prepaid term) recorded in the index. Last verified ${longDate(PRICE_INDEX_VERIFIED)}.`,
  },
  {
    question: "How fast does weight loss happen on a GLP-1?",
    answer:
      "Appetite usually drops within the first one to two weeks. Trial averages show roughly 3-5 lbs in the first month at the starting dose, about 3-6% of body weight by months two to three as the dose rises, 10-15% (semaglutide) or 15-20% (tirzepatide) by month six, and maximum results of about 15% (semaglutide) to 22.5% (tirzepatide) around months 12 to 16.",
  },
  {
    question: "What is the average monthly weight loss on prescription weight-loss drugs?",
    answer:
      "There is no single monthly figure, because loss is front-loaded and slows toward a plateau. Dividing the trial averages above by time gives the working rate: roughly 3-5 lbs in the first month at the starting dose, then about 1.5-2.5% of body weight a month through month six on semaglutide (10-15% by month six) and about 2.5-3.5% a month on tirzepatide (15-20% by month six), tapering toward the maximum of about 15% and 22.5% around months 12 to 16. Liraglutide averages less, about 5-8% in total over 56 weeks. These are derived from trial means; individual results vary.",
  },
  {
    question: "What are the most common GLP-1 side effects?",
    answer:
      "Gastrointestinal effects lead: nausea in roughly 40-44% of people on semaglutide and 25-33% on tirzepatide, diarrhea in about 30% and 19-23%, vomiting in about 24% and 8-13%, and constipation in about 23% and 12-17%, per FDA prescribing information and the STEP and SURMOUNT safety data. They typically ease as the dose stabilises.",
  },
  {
    question: "Who qualifies for GLP-1 weight-loss treatment?",
    answer:
      "Under the FDA-approved prescribing criteria, adults with a BMI of 30 or more, or a BMI of 27 or more with at least one weight-related condition such as type 2 diabetes, hypertension, high cholesterol or sleep apnea. Semaglutide and tirzepatide are contraindicated with a personal or family history of medullary thyroid carcinoma or MEN 2, and are not used in pregnancy.",
  },
  {
    question: "How much weight comes back after stopping a GLP-1?",
    answer:
      "In the STEP 1 trial extension, participants regained about two-thirds of the weight they had lost within one year of stopping semaglutide, which is why these are treated as ongoing medications rather than short courses.",
  },
];

export default async function StatisticsPage() {
  const config = await getConfig("weight-loss");
  const providerName = (id: string) => config.providers.find((p) => p.id === id)?.name ?? id;

  // Dataset schema - this page is the citable record of the index, so it is
  // described as a dataset (with the verification date as dateModified) in
  // addition to the Article the rest of the site emits.
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Treatments Hub GLP-1 Price Index",
    description:
      `Published monthly prices for compounded semaglutide and tirzepatide at ${PROVIDER_COUNT} US telehealth providers, verified by Treatments Hub and logged on every change.`,
    url: CANONICAL,
    dateModified: PRICE_INDEX_VERIFIED,
    temporalCoverage: PRICE_INDEX_VERIFIED.slice(0, 7),
    spatialCoverage: { "@type": "Country", name: "United States" },
    creator: { "@type": "Organization", name: "Treatments Hub", url: "https://www.treatmentshub.com" },
    variableMeasured: [
      "Compounded semaglutide monthly price (USD)",
      "Compounded tirzepatide monthly price (USD)",
      "Pricing condition (promo, plan length, prepaid term)",
    ],
    keywords: ["GLP-1 prices", "semaglutide cost", "tirzepatide cost", "compounded GLP-1", "telehealth weight loss"],
    isAccessibleForFree: true,
  };
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: "2026-08-01",
    dateModified: PRICE_INDEX_VERIFIED,
    ...pageReviewSchema("/weight-loss/glp1-weight-loss-statistics"),
    author: { "@type": "Organization", name: "Treatments Hub Research Team", url: "https://www.treatmentshub.com/weight-loss/about" },
    publisher: { "@type": "Organization", name: "Treatments Hub", url: "https://www.treatmentshub.com" },
    mainEntityOfPage: { "@type": "WebPage", "@id": CANONICAL },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.treatmentshub.com/weight-loss" },
      { "@type": "ListItem", position: 2, name: "GLP-1 Price Index & Statistics", item: CANONICAL },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-10 sm:px-6 sm:py-14">
          <h1 className="text-[26px] font-extrabold text-[#191919] sm:text-[34px]">
            GLP-1 Price Index &amp; Weight Loss Statistics ({MONTH_LABEL})
          </h1>
          <p className="mt-3 max-w-[640px] text-[15px] leading-relaxed text-gray-500">
            The dated, citable record of what {PROVIDER_COUNT} US telehealth providers publish for
            compounded semaglutide and tirzepatide - every price verified against the provider&rsquo;s
            own site, every change logged - paired with the published clinical-trial results for
            GLP-1 weight-loss medications (STEP, SURMOUNT, SCALE).
          </p>
          <p className="mt-2 text-[12px] text-gray-400">
            Prices verified {longDate(PRICE_INDEX_VERIFIED)} · {PRICE_CHANGELOG.length} logged changes since{" "}
            {longDate(PRICE_CHANGELOG[PRICE_CHANGELOG.length - 1]?.date ?? PRICE_INDEX_VERIFIED)}
          </p>
          <MedicalReviewBar path="/weight-loss/glp1-weight-loss-statistics" className="mt-4 max-w-[760px]" />
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-4 py-10 sm:px-6">

        {/* Short answer - the figures a reader (or an AI answer) most often wants from this page */}
        <section className="mb-10 rounded-xl border border-emerald-100 bg-emerald-50/40 p-5 sm:p-6">
          <h2 className="mb-2 text-[18px] font-bold text-[#191919]">The short answer</h2>
          <p className="text-[15px] leading-[1.75] text-gray-600">
            In the pivotal trials, <strong className="text-[#191919]">semaglutide 2.4 mg (Wegovy) produced about 15% mean weight loss at 68 weeks</strong> and{" "}
            <strong className="text-[#191919]">tirzepatide 15 mg (Zepbound) up to 22.5% at 72 weeks</strong>, against about 2.4% on
            lifestyle-only placebo in STEP 1. At verified published prices, {PROVIDER_COUNT} US telehealth providers list
            compounded semaglutide from {usd(SEMA_MIN)} to {usd(SEMA_MAX)} a month and compounded tirzepatide from{" "}
            {usd(TIRZ_MIN)} to {usd(TIRZ_MAX)}, last checked {longDate(PRICE_INDEX_VERIFIED)}. Results typically peak around
            months 12 to 16, and about two-thirds of the lost weight returned within a year of stopping in the STEP 1 extension.
          </p>
        </section>

        {/* ───── Flagship: original price survey (the citable, proprietary data) ───── */}
        <section className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full bg-[#0C4B75] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
              Treatments Hub original data
            </span>
          </div>
          <h2 className="mb-3 text-[22px] font-bold text-[#191919]">
            What does compounded GLP-1 actually cost? A {PROVIDER_COUNT}-provider price survey
          </h2>
          <p className="mb-5 max-w-[680px] text-[15px] leading-[1.7] text-gray-600">
            We track published prices across {PROVIDER_COUNT} US telehealth providers. As of{" "}
            {MONTH_LABEL}, <strong className="text-[#191919]">compounded semaglutide ranged
            from {usd(SEMA_MIN)} to {usd(SEMA_MAX)} per month</strong> and{" "}
            <strong className="text-[#191919]">compounded tirzepatide from {usd(TIRZ_MIN)} to{" "}
            {usd(TIRZ_MAX)} per month</strong> - a fraction of the brand-name list prices for
            the same active ingredients, which run into four figures (below). Every figure is a
            price the provider publishes, verified by our team - not an estimate.
          </p>

          {/* Brand vs compounded - verified list prices from the price index */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-5 py-3 font-bold text-[#191919]">Brand medication</th>
                  <th className="px-5 py-3 font-bold text-[#191919]">Active ingredient</th>
                  <th className="px-5 py-3 font-bold text-[#191919]">Brand list price</th>
                  <th className="px-5 py-3 font-bold text-[#191919]">Compounded from</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {BRAND_SHELF.map((b, i) => {
                  const isSema = b.ingredient.toLowerCase().includes("semaglutide");
                  const from = isSema ? SEMA_MIN : TIRZ_MIN;
                  return (
                    <tr key={b.drug} className={i % 2 ? "bg-gray-50/50" : ""}>
                      <td className="px-5 py-3 font-medium">{b.drug}</td>
                      <td className="px-5 py-3">{b.ingredient}</td>
                      <td className="px-5 py-3">{b.price}</td>
                      <td className="px-5 py-3 font-semibold text-emerald-600">{usd(from)}/mo</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[12px] text-gray-400">
            Source: Treatments Hub GLP-1 price index, {PROVIDER_COUNT} providers, verified published
            prices as of {MONTH_LABEL}. Brand list prices are manufacturer/pharmacy list prices;
            insurance and manufacturer coupons can lower them. See the full provider-by-provider
            table on our{" "}
            <Link href="/weight-loss/cheapest-glp1" className="font-semibold text-[#0C4B75] hover:underline">
              cheapest GLP-1 comparison
            </Link>.
          </p>
        </section>

        {/* ───── The index itself: every provider, both medications, the condition on each price ───── */}
        <section className="mb-10" id="price-index">
          <h2 className="mb-3 text-[22px] font-bold text-[#191919]">
            What does each of the {PROVIDER_COUNT} providers charge? The index, verified {longDate(PRICE_INDEX_VERIFIED)}
          </h2>
          <p className="mb-5 max-w-[680px] text-[15px] leading-[1.7] text-gray-600">
            Each row records the headline monthly price and the condition attached to it - a
            promotional rate, a plan length, a prepaid term. A price is never listed without its
            condition. Sorted by semaglutide price, cheapest first.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full min-w-[720px] text-left text-[13.5px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 font-bold text-[#191919]">Provider</th>
                  <th className="px-4 py-3 font-bold text-[#191919]">Semaglutide /mo</th>
                  <th className="px-4 py-3 font-bold text-[#191919]">Condition</th>
                  <th className="px-4 py-3 font-bold text-[#191919]">Tirzepatide /mo</th>
                  <th className="px-4 py-3 font-bold text-[#191919]">Condition</th>
                  <th className="px-4 py-3 font-bold text-[#191919]">Commitment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 align-top">
                {PRICE_INDEX.map((row, i) => (
                  <tr key={row.providerId} className={i % 2 ? "bg-gray-50/50" : ""}>
                    <td className="px-4 py-3 font-semibold text-[#191919]">
                      <Link href={`/weight-loss/reviews/${row.providerId}`} className="hover:text-[#0C4B75] hover:underline">
                        {providerName(row.providerId)}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-bold text-[#191919] [font-variant-numeric:tabular-nums]">{row.semaglutide?.price ?? "-"}</td>
                    <td className="px-4 py-3 text-gray-500">{row.semaglutide?.note ?? "not offered"}</td>
                    <td className="px-4 py-3 font-bold text-[#191919] [font-variant-numeric:tabular-nums]">{row.tirzepatide?.price ?? "-"}</td>
                    <td className="px-4 py-3 text-gray-500">{row.tirzepatide?.note ?? "not offered"}</td>
                    <td className="px-4 py-3 text-gray-500">{row.commitment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[12px] text-gray-400">
            Compounded medications are prepared by state-licensed pharmacies and are not FDA-approved
            brand products. Every provider listed requires a licensed-clinician review before
            prescribing. Prices are cash-pay; confirm current terms on each provider&rsquo;s site.
          </p>
        </section>

        {/* ───── Change log: the public record of what moved, and when ───── */}
        <section className="mb-10" id="change-log">
          <h2 className="mb-1 text-[22px] font-bold text-[#191919]">Which prices changed, and when?</h2>
          <p className="mb-3 text-[14px] text-gray-500">The full dated feed, with each provider&rsquo;s current listing, is on <Link href="/weight-loss/glp1-price-changes" className="font-semibold text-[#0C4B75] hover:underline">GLP-1 price changes</Link>.</p>
          <p className="mb-5 max-w-[680px] text-[15px] leading-[1.7] text-gray-600">
            Every time a verification pass changes a listing, the change is recorded here with the
            date, what we listed before, and what we list now. Newest first.
          </p>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <ol className="divide-y divide-gray-100">
              {PRICE_CHANGELOG.map((entry, i) => (
                <li key={i} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:gap-5">
                  <div className="shrink-0 sm:w-[150px]">
                    <p className="text-[12.5px] font-semibold text-gray-400 [font-variant-numeric:tabular-nums]">{longDate(entry.date)}</p>
                    <p className="text-[14px] font-bold text-[#191919]">{providerName(entry.providerId)}</p>
                  </div>
                  <p className="text-[14px] leading-[1.7] text-gray-600">{entry.change}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <TopTwoPicks config={config} linkPrefix="/weight-loss" />

        {/* Weight Loss Results */}
        <section className="mb-10">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">How much weight do GLP-1 medications cause on average?</h2>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-5 py-3 font-bold text-[#191919]">Medication</th>
                  <th className="px-5 py-3 font-bold text-[#191919]">Active Ingredient</th>
                  <th className="px-5 py-3 font-bold text-[#191919]">Avg. Weight Loss</th>
                  <th className="px-5 py-3 font-bold text-[#191919]">Trial</th>
                  <th className="hidden sm:table-cell px-5 py-3 font-bold text-[#191919]">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-5 py-3 font-medium">Wegovy</td>
                  <td className="px-5 py-3">Semaglutide 2.4mg</td>
                  <td className="px-5 py-3 font-semibold text-[#0C4B75]">~15% of body weight</td>
                  <td className="px-5 py-3">STEP 1</td>
                  <td className="hidden sm:table-cell px-5 py-3">68 weeks</td>
                </tr>
                <tr className="bg-gray-50/50">
                  <td className="px-5 py-3 font-medium">Zepbound</td>
                  <td className="px-5 py-3">Tirzepatide 15mg</td>
                  <td className="px-5 py-3 font-semibold text-[#0C4B75]">Up to 22.5% of body weight</td>
                  <td className="px-5 py-3">SURMOUNT-1</td>
                  <td className="hidden sm:table-cell px-5 py-3">72 weeks</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-medium">Ozempic</td>
                  <td className="px-5 py-3">Semaglutide 2mg</td>
                  <td className="px-5 py-3 font-semibold text-[#0C4B75]">~6-8% of body weight</td>
                  <td className="px-5 py-3">SUSTAIN (type 2 diabetes)</td>
                  <td className="hidden sm:table-cell px-5 py-3">40 weeks</td>
                </tr>
                <tr className="bg-gray-50/50">
                  <td className="px-5 py-3 font-medium">Mounjaro</td>
                  <td className="px-5 py-3">Tirzepatide 15mg</td>
                  <td className="px-5 py-3 font-semibold text-[#0C4B75]">~12-15% of body weight</td>
                  <td className="px-5 py-3">SURPASS (type 2 diabetes)</td>
                  <td className="hidden sm:table-cell px-5 py-3">40 weeks</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-medium">Saxenda</td>
                  <td className="px-5 py-3">Liraglutide 3mg</td>
                  <td className="px-5 py-3 font-semibold text-[#0C4B75]">~5-8% of body weight</td>
                  <td className="px-5 py-3">SCALE</td>
                  <td className="hidden sm:table-cell px-5 py-3">56 weeks</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[12px] text-gray-400">
            Source: Pivotal published trials - STEP 1 (Wilding et al., <em>New England Journal of
            Medicine</em>, 2021) for semaglutide 2.4mg; SURMOUNT-1 (Jastreboff et al., <em>NEJM</em>,
            2022) for tirzepatide 15mg; SCALE (Pi-Sunyer et al., <em>NEJM</em>, 2015) for liraglutide
            3mg; SUSTAIN program for semaglutide 2mg. Figures are trial averages; individual results vary.
          </p>
        </section>

        {/* Side Effects */}
        <section className="mb-10">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">What are the most common GLP-1 side effects?</h2>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-5 py-3 font-bold text-[#191919]">Side Effect</th>
                  <th className="px-5 py-3 font-bold text-[#191919]">Semaglutide</th>
                  <th className="px-5 py-3 font-bold text-[#191919]">Tirzepatide</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr><td className="px-5 py-3 font-medium">Nausea</td><td className="px-5 py-3">~40-44%</td><td className="px-5 py-3">~25-33%</td></tr>
                <tr className="bg-gray-50/50"><td className="px-5 py-3 font-medium">Diarrhea</td><td className="px-5 py-3">~30%</td><td className="px-5 py-3">~19-23%</td></tr>
                <tr><td className="px-5 py-3 font-medium">Vomiting</td><td className="px-5 py-3">~24%</td><td className="px-5 py-3">~8-13%</td></tr>
                <tr className="bg-gray-50/50"><td className="px-5 py-3 font-medium">Constipation</td><td className="px-5 py-3">~23%</td><td className="px-5 py-3">~12-17%</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[12px] text-gray-400">Source: FDA prescribing information and pivotal-trial safety data (STEP and SURMOUNT programs). Rates are approximate; side effects typically improve over time and with dose stabilization.</p>
        </section>

        {/* Timeline */}
        <section className="mb-10">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">How fast does weight loss happen on a GLP-1?</h2>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-5 py-3 font-bold text-[#191919]">Timeframe</th>
                  <th className="px-5 py-3 font-bold text-[#191919]">What to Expect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr><td className="px-5 py-3 font-medium">Week 1-2</td><td className="px-5 py-3">Reduced appetite, early satiety, possible mild nausea</td></tr>
                <tr className="bg-gray-50/50"><td className="px-5 py-3 font-medium">Month 1</td><td className="px-5 py-3">3-5 lbs weight loss (starting dose)</td></tr>
                <tr><td className="px-5 py-3 font-medium">Month 2-3</td><td className="px-5 py-3">~3-6% body weight loss as the dose increases</td></tr>
                <tr className="bg-gray-50/50"><td className="px-5 py-3 font-medium">Month 6</td><td className="px-5 py-3">10-15% body weight loss (semaglutide) or 15-20% (tirzepatide)</td></tr>
                <tr><td className="px-5 py-3 font-medium">Month 12-16</td><td className="px-5 py-3">Maximum results: 15% (semaglutide) to 22.5% (tirzepatide)</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[12px] text-gray-400">Source: Clinical trial averages. Individual results vary based on medication, dose, diet, and exercise.</p>
        </section>

        {/* Eligibility */}
        <section className="mb-10">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">Who Qualifies for GLP-1 Treatment?</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="mb-4 text-[15px] leading-[1.7] text-gray-600">
              According to FDA-approved prescribing criteria, GLP-1 weight loss medications
              are indicated for adults with:
            </p>
            <ul className="mb-4 space-y-2 text-[15px] text-gray-800">
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0C4B75]" />BMI ≥ 30 (obesity)</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0C4B75]" />BMI ≥ 27 with at least one weight-related condition (type 2 diabetes, hypertension, high cholesterol, sleep apnea)</li>
            </ul>
            <p className="mb-1 text-[13px] font-semibold text-[#191919]">Who should not take them</p>
            <p className="text-[14px] leading-relaxed text-gray-500">
              Semaglutide and tirzepatide carry an FDA boxed warning for thyroid C-cell tumors and are
              contraindicated for anyone with a personal or family history of medullary thyroid carcinoma
              or MEN 2 syndrome. They are also used with caution in people with a history of pancreatitis
              or gallbladder disease, and are not for use in pregnancy. Always review your full history
              with a licensed clinician.
            </p>
            <p className="text-[14px] text-gray-500">
              Read our complete{" "}
              <Link href="/weight-loss/articles/who-qualifies-for-glp1-weight-loss" className="font-semibold text-[#0C4B75] hover:underline">eligibility guide</Link> or{" "}
              <Link href="/weight-loss/find-your-match" className="font-semibold text-[#0C4B75] hover:underline">take our quiz</Link> to check if you qualify.
            </p>
          </div>
        </section>

        {/* Key Facts */}
        <section className="mb-10">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">What are the key facts about GLP-1 weight loss?</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <ul className="space-y-3 text-[15px] leading-[1.7] text-gray-600">
              <li><strong className="text-[#191919]">Among the most effective prescription weight-loss options:</strong> in STEP 1, semaglutide 2.4 mg produced about 15% mean weight loss versus roughly 2.4% in the lifestyle-only (placebo) arm - a substantially larger effect than older weight-loss drugs.</li>
              <li><strong className="text-[#191919]">Once-weekly injection:</strong> Both Wegovy (semaglutide) and Zepbound (tirzepatide) are administered as once-weekly subcutaneous injections.</li>
              <li><strong className="text-[#191919]">Two daily pills are now approved too:</strong> the Wegovy pill (oral semaglutide 25 mg, December 2025) and Foundayo (orforglipron, April 2026) produced 13.6% and 11.2% mean weight loss in their own trials (OASIS 4 at 64 weeks; ATTAIN-1 at 72 weeks), which are not head to head. See{" "}
                <Link href="/weight-loss/articles/foundayo-vs-wegovy-pill" className="font-semibold text-[#0C4B75] hover:underline">Foundayo vs the Wegovy pill</Link>.</li>
              <li><strong className="text-[#191919]">Gradual dose escalation:</strong> Treatment starts at a low dose and increases monthly over 16-20 weeks to minimize side effects.</li>
              <li><strong className="text-[#191919]">Available online:</strong> Licensed telehealth providers can prescribe GLP-1 medications through fully online medical evaluations, with home delivery in most US states.</li>
              <li><strong className="text-[#191919]">Weight regain risk:</strong> The STEP 1 trial extension showed approximately two-thirds of weight lost was regained within one year of stopping semaglutide, supporting the case for ongoing treatment.</li>
              <li><strong className="text-[#191919]">Dual-agonist advantage:</strong> Tirzepatide targets both GLP-1 and GIP receptors, which may explain its superior weight loss results compared to semaglutide.</li>
            </ul>
          </div>
        </section>

        {/* Methodology & citation - makes the page safe and easy for writers to cite */}
        <section className="mb-10">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">How was this data gathered, and how should you cite it?</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="mb-3 text-[14px] leading-[1.7] text-gray-600">
              <strong className="text-[#191919]">Pricing:</strong> our price survey tracks the
              prices {PROVIDER_COUNT} US telehealth providers publish for compounded semaglutide and
              tirzepatide. Every figure is a published provider price verified by our team against the
              provider&rsquo;s own site - we do not estimate, model or extrapolate prices. The index was
              last verified on {longDate(PRICE_INDEX_VERIFIED)}, and every change to a listing is
              recorded in the change log above with its date.
            </p>
            <p className="mb-3 text-[14px] leading-[1.7] text-gray-600">
              <strong className="text-[#191919]">Clinical data:</strong> weight-loss and safety
              figures are drawn from the medications&rsquo; pivotal published trials (STEP, SURMOUNT,
              SCALE, SUSTAIN) and FDA prescribing information, and are trial averages rather than
              guarantees of individual results.
            </p>
            <p className="text-[13px] leading-[1.7] text-gray-500">
              <strong className="text-gray-700">Citing this page?</strong> Please attribute to
              &ldquo;Treatments Hub GLP-1 Price Index (2026)&rdquo; and link to this page. For the full
              provider-by-provider pricing table, see our{" "}
              <Link href="/weight-loss/cheapest-glp1" className="font-semibold text-[#0C4B75] hover:underline">
                cheapest GLP-1 comparison
              </Link>. This page is general information, not medical advice.
            </p>
          </div>
        </section>

        <GuideCluster currentSlug="glp1-weight-loss-statistics" />

        {/* CTA */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
          <p className="mb-2 text-[16px] font-bold text-[#191919]">Compare GLP-1 Providers</p>
          <p className="mb-4 text-[14px] text-gray-500">See how the top telehealth weight loss providers compare on pricing, medications, and support.</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/weight-loss" className="inline-flex h-[44px] items-center justify-center rounded-lg bg-[#0C4B75] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]">
              Compare Providers
            </Link>
            <Link href="/weight-loss/find-your-match" className="inline-flex h-[44px] items-center justify-center rounded-lg border border-gray-200 bg-white px-6 text-[14px] font-semibold text-[#191919] transition-colors hover:bg-gray-50">
              Take the Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
