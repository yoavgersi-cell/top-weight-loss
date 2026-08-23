import type { Metadata } from "next";
import Link from "next/link";
import { BadgeDollarSign, ScanSearch, Repeat } from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { CONTENT_LAST_UPDATED, AFFILIATE_PROVIDER_IDS } from "@/lib/config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { PriceIndex } from "@/components/price-index";
import { MedicalSources, TrustDisclosure } from "@/components/medical-sources";

export const revalidate = 60;

const CANONICAL = "https://www.treatmentshub.com/weight-loss/cheapest-glp1";
const TITLE = "Cheapest GLP-1 in 2026: Real Prices From 8 Providers ($59-$299)";
const DESCRIPTION =
  "The cheapest GLP-1 programs in 2026, ranked by real published prices: compounded semaglutide from $59/month and tirzepatide from $99/month. Every price verified, every condition disclosed - promo rates, prepaid plans and what's actually included.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | TreatmentsHub` },
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    type: "article",
  },
};

const faqs: { question: string; answer: string }[] = [
  {
    question: "What is the cheapest GLP-1 medication in 2026?",
    answer:
      "The cheapest GLP-1 program among the providers we track is wellmedr, at $59/month for compounded semaglutide on a 12-month plan - the same price at every dose. The cheapest with no commitment is embody at $69/month, month to month. All prices on this page are the providers' real published rates, with their conditions disclosed.",
  },
  {
    question: "What is the cheapest tirzepatide?",
    answer:
      "wellmedr lists compounded tirzepatide from $99/month, the lowest published tirzepatide price we track. embody is the cheapest month-to-month option at $119/month ($129 regular), and DirectMeds charges a flat $147/month for either medication - including a needle-free sublingual drops format at the same price.",
  },
  {
    question: "Why are these so much cheaper than Ozempic?",
    answer:
      "Brand-name Ozempic, Wegovy and Zepbound list for roughly $1,149-$1,599/month on our providers' own brand shelves. The programs on this page prescribe compounded semaglutide or tirzepatide instead - the same active ingredients, prepared by state-licensed compounding pharmacies and sold cash-pay at a flat monthly rate. Compounded medications are not FDA-approved brand drugs, which is why the provider's pharmacy standards (LegitScript certification, licensed 503A pharmacies) matter more than the price alone.",
  },
  {
    question: "Do I need insurance for any of these?",
    answer:
      "No - every program on this page is cash-pay, with the consultation and prescription included in the monthly price. No insurance and no prior authorization is required. Several (Medvi, SHED) are HSA/FSA approved, so you can pay with pre-tax health funds.",
  },
  {
    question: "What's the catch with the lowest prices?",
    answer:
      "Commitment and speed. The $59/month headline at wellmedr is tied to a 12-month plan, and HealthRx's $99/month is a 12-month prepaid plan with $1,188 due at checkout. Month-to-month flexibility costs slightly more (embody at $69/$119). Slower shipping is the other trade: altRx at $89 ships in about 5-7 days versus 1-2 days at embody and DirectMeds. Every condition is listed under each price above - there are no unlisted catches we're aware of.",
  },
  {
    question: "Are cheap compounded GLP-1s safe?",
    answer:
      "Price doesn't determine safety - the pharmacy and the clinical process do. Every provider in this index requires a medical intake reviewed by a licensed clinician, and the ones we rank highest work with state-licensed 503A compounding pharmacies (embody and HealthRx are LegitScript-certified). Compounded medications are not FDA-approved brand drugs, so avoid any site that skips the medical review or won't name its pharmacy standards. Always consult a licensed clinician about whether GLP-1 treatment is appropriate for you.",
  },
];

export default async function CheapestGlp1Page() {
  const config = await getConfig("weight-loss");
  const providers = config.providers.filter((p) => AFFILIATE_PROVIDER_IDS.includes(p.id));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: "2026-08-23",
    dateModified: CONTENT_LAST_UPDATED,
    author: { "@type": "Organization", name: "TreatmentsHub Team", url: "https://www.treatmentshub.com" },
    publisher: { "@type": "Organization", name: "treatmentshub.com", url: "https://www.treatmentshub.com" },
    mainEntityOfPage: CANONICAL,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.treatmentshub.com/weight-loss" },
      { "@type": "ListItem", position: 2, name: "Cheapest GLP-1", item: CANONICAL },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1000px] px-4 pb-10 pt-10 sm:px-6 sm:pb-12 sm:pt-12">
          <Breadcrumbs items={[{ label: "Home", href: "/weight-loss" }, { label: "Cheapest GLP-1" }]} />
          <h1 className="max-w-[760px] text-[27px] font-extrabold leading-[1.15] text-[#191919] sm:text-[36px]">
            The Cheapest GLP-1 in 2026: Real Prices, Ranked
          </h1>
          <p className="mt-3 max-w-[680px] text-[15.5px] leading-relaxed text-gray-500">
            Every price below is a provider&rsquo;s real published rate, with its honest condition -
            promo pricing, prepaid plans, first-month rates - printed right under the number. Sorted
            cheapest first.
          </p>
          <LastUpdated date={CONTENT_LAST_UPDATED} className="mt-4" />
          <TrustDisclosure disclaimerHref="/weight-loss/disclaimer" />
        </div>
      </div>

      <div className="mx-auto max-w-[1000px] px-4 py-10 sm:px-6">
        {/* Direct answer - the to-the-point block the query deserves */}
        <div className="mb-10 rounded-2xl border border-[#0C4B75]/20 bg-white p-6 shadow-sm sm:p-7">
          <p className="mb-2.5 text-[12px] font-bold uppercase tracking-[0.07em] text-[#0C4B75]">
            The short answer
          </p>
          <p className="text-[15.5px] leading-[1.85] text-gray-700">
            The cheapest GLP-1 we track is{" "}
            <Link href="/weight-loss/reviews/wellmedr" className="font-semibold text-[#0C4B75] hover:underline">wellmedr</Link>{" "}
            - compounded semaglutide at <strong className="text-[#191919]">$59/month</strong> on a
            12-month plan, and the cheapest tirzepatide at{" "}
            <strong className="text-[#191919]">$99/month</strong>. If you don&rsquo;t want a
            commitment,{" "}
            <Link href="/weight-loss/reviews/embody" className="font-semibold text-[#0C4B75] hover:underline">embody</Link>{" "}
            is the cheapest month-to-month at <strong className="text-[#191919]">$69/$119</strong>{" "}
            with 1-2 day shipping. For one flat price covering either medication - as injections or
            needle-free drops -{" "}
            <Link href="/weight-loss/reviews/directmeds" className="font-semibold text-[#0C4B75] hover:underline">DirectMeds</Link>{" "}
            charges <strong className="text-[#191919]">$147/month</strong> at every dose. Brand-name
            Ozempic and Zepbound list at $1,149-$1,599/month by comparison.
          </p>
        </div>

        {/* The index itself */}
        <div className="mb-3 flex items-center gap-2">
          <BadgeDollarSign className="h-5 w-5 text-[#0C4B75]" strokeWidth={2} />
          <h2 className="text-[22px] font-bold text-[#191919]">The 2026 GLP-1 price index</h2>
        </div>
        <p className="mb-5 max-w-[680px] text-[14px] text-gray-500">
          Eight providers, ranked by their published semaglutide price. Trustpilot records shown are
          real; where a provider has no published rating, we say so instead of inventing one.
        </p>
        <PriceIndex providers={providers} />

        {/* How to read the prices - the transparency layer */}
        <section className="mt-12">
          <div className="mb-4 flex items-center gap-2">
            <ScanSearch className="h-5 w-5 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[22px] font-bold text-[#191919]">How to read these prices</h2>
          </div>
          <div className="grid gap-4 text-[14.5px] leading-[1.8] text-gray-600 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="mb-1.5 font-bold text-[#191919]">Commitment buys the discount</p>
              <p>
                The two sub-$100 semaglutide rates are plan prices: wellmedr&rsquo;s $59 takes a
                12-month plan, and HealthRx&rsquo;s $99 is prepaid - $1,188 at checkout. The cheapest
                true month-to-month rate is embody&rsquo;s $69.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="mb-1.5 font-bold text-[#191919]">Promo vs regular rates</p>
              <p>
                Some headline numbers are introductory: trimrx&rsquo;s $179 semaglutide is a
                first-month rate (regularly $299), and SHED&rsquo;s 20% off applies to month one.
                embody&rsquo;s $69/$119 are promotional against $79/$129 regular. We print the
                condition under every number.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="mb-1.5 font-bold text-[#191919]">&ldquo;Included&rdquo; varies a lot</p>
              <p>
                Every price includes the consultation and medication. The higher tiers bundle more:
                Medvi folds in dietician access and care coaching, SHED includes health coaching and
                a money-back guarantee. If you&rsquo;d use those, the gap narrows.
              </p>
            </div>
          </div>
        </section>

        {/* Switcher cross-link - the audience this page exists for */}
        <section className="mt-12">
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 sm:flex-row sm:items-center sm:p-7">
            <Repeat className="h-6 w-6 shrink-0 text-emerald-600" strokeWidth={2} />
            <div className="flex-1">
              <h2 className="mb-1 text-[17px] font-bold text-[#191919]">
                Already on Ozempic, Wegovy or Zepbound?
              </h2>
              <p className="text-[14px] leading-relaxed text-gray-600">
                If you&rsquo;re paying brand prices today, switching to the compounded version of the
                same active ingredient is usually a $1,000+/month difference. We wrote a dedicated
                guide to how the switch actually works - and what to check first.
              </p>
            </div>
            <Link
              href="/weight-loss/switch-from-ozempic"
              className="shrink-0 text-[14px] font-bold text-emerald-700 hover:underline"
            >
              Read the switching guide
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-12">
          <h2 className="mb-5 text-[22px] font-bold text-[#191919]">Cheapest GLP-1: FAQs</h2>
          <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {faqs.map((f, i) => (
              <div key={i} className="p-6">
                <h3 className="mb-2 text-[15.5px] font-bold text-[#191919]">{f.question}</h3>
                <p className="text-[14px] leading-[1.75] text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="mt-10">
          <p className="text-[14px] text-gray-500">
            Keep comparing:{" "}
            <Link href="/weight-loss/ozempic-alternatives" className="font-semibold text-[#0C4B75] hover:underline">
              Ozempic alternatives
            </Link>
            {" · "}
            <Link href="/weight-loss/glp1-pills-vs-injections" className="font-semibold text-[#0C4B75] hover:underline">
              pills vs injections
            </Link>
            {" · "}
            <Link href="/weight-loss/embody-vs-wellmedr" className="font-semibold text-[#0C4B75] hover:underline">
              embody vs wellmedr
            </Link>
            {" · "}
            <Link href="/weight-loss/reviews" className="font-semibold text-[#0C4B75] hover:underline">
              all reviews
            </Link>
          </p>
        </section>

        <MedicalSources vertical="weight-loss" />

        <p className="mt-6 text-[13px] leading-relaxed text-gray-400">
          Prices are the providers&rsquo; published cash-pay rates at the time of the last update and
          can change; confirm current pricing on the provider&rsquo;s site. Compounded medications are
          not FDA-approved brand drugs. treatmentshub.com is not a medical provider - this page is for
          information only and is not medical advice.
        </p>
      </div>
    </div>
  );
}
