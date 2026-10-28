import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ShieldCheck } from "lucide-react";
import { DEFAULT_OG_IMAGE } from "@/lib/og";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { GuideCluster } from "@/components/guide-cluster";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { TrustDisclosure } from "@/components/medical-sources";
import { CostCalculator, type CostRow } from "@/components/tools/cost-calculator";
import { medicalWebPageFields } from "@/lib/medical-schema";
import { getConfig } from "@/lib/config-store";
import { BRAND_SHELF, PRICE_INDEX, PRICE_INDEX_VERIFIED } from "@/lib/price-index";

export const revalidate = 60;

// ───── GLP-1 cost calculator ─────
// Multiplies the verified price index out over a chosen number of months.
// The rows are built here, on the server, straight from PRICE_INDEX, so the
// calculator can never show a figure that is not on the statistics and
// cheapest-GLP-1 pages with the same verification date. Provider names and
// review links come from the vertical config.

const SLUG = "glp1-cost-calculator";
const PATH = `/weight-loss/${SLUG}`;
const CANONICAL = `https://www.treatmentshub.com${PATH}`;
const PUBLISHED = "2026-10-27";
const UPDATED = "2026-10-27";
const TITLE = "GLP-1 Cost Calculator: Semaglutide & Tirzepatide Over 1 to 24 Months";

const longDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

const FAQS: { question: string; answer: string }[] = [
  {
    question: "Where do the prices in the calculator come from?",
    answer:
      "Every row is a provider's own published monthly price for compounded semaglutide or tirzepatide, recorded in our verified price index on the date shown and re-checked against the provider's site. The calculator multiplies that figure by the number of months you choose; it does not estimate, average or add anything.",
  },
  {
    question: "Why is there a regular-price column?",
    answer:
      "Several providers publish an introductory price next to a regular price. We do not know how long any promotion lasts, so the calculator shows the same period at the regular price as a second column rather than guessing when the promotional rate ends.",
  },
  {
    question: "Does the total include the consultation, shipping and supplies?",
    answer:
      "Only where the provider's published price says so; the condition column repeats each provider's own wording. Most of the providers in the index include the clinician consultation and shipping in the monthly price, and the index notes the exceptions. Confirm at checkout.",
  },
  {
    question: "Why is one provider's total shown as a 12-month plan?",
    answer:
      "When a published price is only available on a 12-month plan or a prepaid annual plan, the calculator totals it at 12 months even if you chose fewer, because that is what the provider bills. Monthly and no-commitment prices are totalled for exactly the months you chose.",
  },
  {
    question: "How do brand-name Wegovy and Zepbound compare?",
    answer:
      "The brand table under the calculator uses the cash prices published by the providers named, from the same index, and multiplies the lowest listed price by your months. Insurance, manufacturer savings offers and Medicare coverage can change the brand figures substantially, and compounded products are not FDA-approved.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const description = `Choose semaglutide or tirzepatide and 1 to 24 months to total every verified provider price in our index, with the regular price beside each promotion.`;
  return {
    title: "GLP-1 Cost Calculator: Semaglutide & Tirzepatide (2026)",
    description,
    alternates: { canonical: CANONICAL },
    openGraph: { images: [DEFAULT_OG_IMAGE], title: `${TITLE} (2026)`, description, url: CANONICAL, type: "article" },
  };
}

export default async function CostCalculatorPage() {
  const config = await getConfig("weight-loss");
  const providerById = new Map(config.providers.map((p) => [p.id, p]));
  const reviewSlugByProvider = new Map((config.reviews ?? []).map((r) => [r.providerId, r.slug]));
  const rows: CostRow[] = PRICE_INDEX.map((r) => {
    const p = providerById.get(r.providerId);
    const reviewSlug = reviewSlugByProvider.get(r.providerId);
    return {
      providerId: r.providerId,
      name: p?.name ?? r.providerId,
      reviewHref: reviewSlug ? `/weight-loss/reviews/${reviewSlug}` : "/weight-loss/cheapest-glp1",
      semaglutide: r.semaglutide,
      tirzepatide: r.tirzepatide,
      commitment: r.commitment,
    };
  });
  const semaRows = PRICE_INDEX.filter((r) => r.semaglutide);
  const tirzRows = PRICE_INDEX.filter((r) => r.tirzepatide);
  const verified = longDate(PRICE_INDEX_VERIFIED);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    datePublished: PUBLISHED,
    dateModified: UPDATED,
    author: { "@type": "Organization", name: "Treatments Hub Team", url: "https://www.treatmentshub.com" },
    publisher: { "@type": "Organization", name: "Treatments Hub", url: "https://www.treatmentshub.com" },
    mainEntityOfPage: medicalWebPageFields("weight-loss", CANONICAL, PATH),
  };
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "GLP-1 Cost Calculator",
    url: CANONICAL,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: "Treatments Hub", url: "https://www.treatmentshub.com" },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.treatmentshub.com/weight-loss" },
      { "@type": "ListItem", position: 2, name: "GLP-1 Cost Calculator", item: CANONICAL },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  const ext = "font-semibold text-[#0C4B75] hover:underline";
  const nameOf = (id: string) => providerById.get(id)?.name ?? id;
  const num = (s: string) => parseFloat(s.replace(/[^\d.]/g, ""));
  const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
  const cheapestSema = semaRows[0];
  const dearestSema = semaRows[semaRows.length - 1];
  const cheapestTirz = [...tirzRows].sort((a, b) => num(a.tirzepatide!.price) - num(b.tirzepatide!.price))[0];
  // Listed-rate gap over a year: plain arithmetic on the two index figures.
  const yearGap = (num(dearestSema.semaglutide!.price) - num(cheapestSema.semaglutide!.price)) * 12;

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[960px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/weight-loss" }, { label: "GLP-1 Cost Calculator" }]} />
          <h1 className="max-w-[820px] text-[27px] font-extrabold leading-[1.15] text-[#191919] sm:text-[36px]">{TITLE}</h1>
          <p className="mt-3 max-w-[720px] text-[16px] leading-relaxed text-gray-500">
            What {PRICE_INDEX.length} online providers charge for compounded semaglutide and tirzepatide, multiplied out over
            the months you choose. Every figure is the provider&rsquo;s own published price from our index, verified {verified};
            promotions are shown next to the regular price they revert to.
          </p>
          <LastUpdated date={UPDATED} className="mt-4" />
          <MedicalReviewBar path={PATH} className="mt-4 max-w-[760px]" />
          <TrustDisclosure disclaimerHref="/weight-loss/disclaimer" />
        </div>
      </div>

      <div className="mx-auto max-w-[960px] px-4 py-10 text-[16px] leading-[1.75] text-gray-800 sm:px-6">
        <div className="qa mb-10 flex items-start gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
          <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" strokeWidth={2} />
          <div className="text-[15px] leading-[1.75] text-gray-600">
            <h2 className="mb-2 text-[18px] font-bold text-[#191919]">The short answer</h2>
            <p>
              Across the index, published compounded semaglutide prices run from{" "}
              <strong className="text-[#191919]">{cheapestSema.semaglutide!.price}/month at {nameOf(cheapestSema.providerId)}</strong>{" "}
              ({cheapestSema.semaglutide!.note.toLowerCase()}) to {dearestSema.semaglutide!.price}/month at {nameOf(dearestSema.providerId)}, and
              compounded tirzepatide from{" "}
              <strong className="text-[#191919]">{cheapestTirz.tirzepatide!.price}/month at {nameOf(cheapestTirz.providerId)}</strong>.
              Multiplied over 12 months, the gap between the lowest and highest listed semaglutide rate is {usd(yearGap)}, which is
              why the calculator shows the total, not the monthly rate. Prices verified {verified}; confirm at checkout.
            </p>
          </div>
        </div>

        <section className="mb-12" aria-labelledby="tool-heading">
          <div className="mb-3 flex items-center gap-2">
            <Calculator className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 id="tool-heading" className="text-[22px] font-bold text-[#191919]">Total cost by provider and months</h2>
          </div>
          <CostCalculator rows={rows} brands={BRAND_SHELF} verifiedOn={verified} />
        </section>

        <section className="mb-12">
          <h2 className="mb-3 text-[22px] font-bold text-[#191919]">How the totals are built</h2>
          <ul className="list-disc space-y-2 pl-5 text-[15px] leading-[1.7] text-gray-600">
            <li><strong className="text-[#191919]">Listed price × months.</strong> The headline monthly price each provider publishes, multiplied by the months you chose. Rows that publish a &ldquo;from&rdquo; price are totalled from that starting figure and marked.</li>
            <li><strong className="text-[#191919]">Promotions.</strong> A published first-month discount is applied to month one only. Where a provider publishes a separate regular price, the last column shows the same period at that price, because we do not know how long the promotion lasts.</li>
            <li><strong className="text-[#191919]">Plans.</strong> A price that is only available on a 12-month or prepaid plan is totalled at 12 months even when you choose fewer, since that is what the provider bills.</li>
            <li><strong className="text-[#191919]">What is not here.</strong> Dose-based price increases, state-specific pricing and lab fees, where a provider has them, are in the condition column as the provider words them. The{" "}<Link href="/weight-loss/glp1-price-changes" className={ext}>price change log</Link> records every change we have verified since the index began.</li>
          </ul>
          <p className="mt-4">
            For the reasoning behind the ranking rather than the arithmetic, read{" "}
            <Link href="/weight-loss/cheapest-glp1" className={ext}>cheapest GLP-1 online</Link> and the{" "}
            <Link href="/weight-loss/articles/weight-loss-medication-cost-guide" className={ext}>weight-loss medication cost guide</Link>. If you
            are not yet sure you qualify, the{" "}
            <Link href="/weight-loss/glp1-bmi-calculator" className={ext}>BMI and eligibility check</Link> applies the label criteria,
            and the <Link href="/weight-loss/glp1-dose-schedule" className={ext}>dose schedule timeline</Link> shows how long a
            labelled ramp takes. Seasonal promotions are tracked on our{" "}
            <Link href="/weight-loss/black-friday-glp1-deals" className={ext}>Black Friday GLP-1 deals</Link> page, each verified and judged against these same regular prices.
          </p>
        </section>

        <section className="mb-12" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="mb-4 text-[22px] font-bold text-[#191919]">Frequently asked questions</h2>
          <div className="space-y-6">
            {FAQS.map((f) => (
              <div key={f.question}>
                <h3 className="mb-1 text-[17px] font-bold text-[#191919]">{f.question}</h3>
                <p className="text-[15px] leading-[1.75] text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <MedicalDisclaimer vertical="weight-loss" className="mb-8" />
        <GuideCluster currentSlug={SLUG} />
      </div>
    </div>
  );
}
