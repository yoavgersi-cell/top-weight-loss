import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, ShieldCheck } from "lucide-react";
import { DEFAULT_OG_IMAGE } from "@/lib/og";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { GuideCluster } from "@/components/guide-cluster";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { TrustDisclosure } from "@/components/medical-sources";
import { DoseSchedule } from "@/components/tools/dose-schedule";
import { medicalWebPageFields } from "@/lib/medical-schema";

// ───── GLP-1 dose schedule timeline ─────
// Maps the escalation steps in the Wegovy and Zepbound prescribing
// information onto calendar dates. Nothing on this page is a dosing
// recommendation: the steps, intervals and maintenance doses are the labels',
// the only arithmetic is adding weeks to a date, and the prescriber decides.

const SLUG = "glp1-dose-schedule";
const PATH = `/weight-loss/${SLUG}`;
const CANONICAL = `https://www.treatmentshub.com${PATH}`;
const PUBLISHED = "2026-10-27";
const UPDATED = "2026-10-27";
const TITLE = "Wegovy & Zepbound Dose Schedule Timeline";

const FAQS: { question: string; answer: string }[] = [
  {
    question: "What is the Wegovy dose schedule?",
    answer:
      "The Wegovy prescribing information starts at 0.25 mg once weekly for 4 weeks, then 0.5 mg for 4 weeks, 1 mg for 4 weeks and 1.7 mg for 4 weeks, reaching a maintenance dose of 1.7 mg or 2.4 mg from week 17. If a step is not tolerated, the label allows delaying the next increase by 4 weeks.",
  },
  {
    question: "What is the Zepbound dose schedule?",
    answer:
      "The Zepbound prescribing information starts at 2.5 mg once weekly for 4 weeks, which it describes as a starting dose and not a maintenance dose, then 5 mg. Further increases are in 2.5 mg steps after at least 4 weeks on the current dose, up to a maximum of 15 mg. The recommended maintenance doses are 5 mg, 10 mg or 15 mg.",
  },
  {
    question: "Can I stay on a lower dose?",
    answer:
      "Yes. Both labels name more than one maintenance dose, and the Zepbound label allows holding an intermediate dose for longer than 4 weeks. Staying below the labelled starting dose, or spacing injections wider than weekly, is outside the label; our microdosing guide covers what the labels allow and what they do not.",
  },
  {
    question: "What if I miss a dose?",
    answer:
      "The Wegovy label says to take a missed dose as soon as possible if the next scheduled dose is more than 48 hours away, and to skip it if the next dose is less than 48 hours away. The Zepbound label says to take a missed dose within 4 days (96 hours) and otherwise skip it. Both say not to take two doses within those windows. Follow your prescriber's instructions where they differ.",
  },
  {
    question: "Do compounded semaglutide and tirzepatide follow the same schedule?",
    answer:
      "Compounded products have no FDA label, so there is no official schedule for them. Many online providers model their protocols on the brand labels, but the prescriber decides the dose and interval. This timeline shows the brand labels only.",
  },
];

export const metadata: Metadata = {
  title: `${TITLE} (2026)`,
  description:
    "Enter your first injection date to see the Wegovy and Zepbound escalation steps from the prescribing information mapped onto calendar dates.",
  alternates: { canonical: CANONICAL },
  openGraph: { images: [DEFAULT_OG_IMAGE], title: `${TITLE} (2026)`, url: CANONICAL, type: "article" },
};

export default function DoseSchedulePage() {
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
    name: TITLE,
    url: CANONICAL,
    applicationCategory: "HealthApplication",
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
      { "@type": "ListItem", position: 2, name: TITLE, item: CANONICAL },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  const ext = "font-semibold text-[#0C4B75] hover:underline";

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[960px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/weight-loss" }, { label: "Dose Schedule Timeline" }]} />
          <h1 className="max-w-[820px] text-[27px] font-extrabold leading-[1.15] text-[#191919] sm:text-[36px]">{TITLE}</h1>
          <p className="mt-3 max-w-[720px] text-[16px] leading-relaxed text-gray-500">
            The escalation steps from the Wegovy and Zepbound prescribing information, mapped onto your calendar from the
            date of your first injection. Every step, interval and maintenance dose is the label&rsquo;s; your prescriber
            sets the actual schedule.
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
              <strong className="text-[#191919]">Wegovy</strong> steps up every 4 weeks: 0.25 mg, 0.5 mg, 1 mg, 1.7 mg, then a
              maintenance dose of 1.7 mg or 2.4 mg from week 17, so the full ramp takes 16 weeks at the label&rsquo;s pace.{" "}
              <strong className="text-[#191919]">Zepbound</strong> starts at 2.5 mg for 4 weeks, then 5 mg, then rises in 2.5 mg
              steps after at least 4 weeks each, to a maintenance dose of 5, 10 or 15 mg. Both labels allow holding a step
              longer if it is not tolerated, and the prescriber decides every change.
            </p>
          </div>
        </div>

        <section className="mb-12" aria-labelledby="tool-heading">
          <div className="mb-3 flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 id="tool-heading" className="text-[22px] font-bold text-[#191919]">Map the label&rsquo;s steps to your dates</h2>
          </div>
          <DoseSchedule />
        </section>

        <section className="mb-12">
          <h2 className="mb-3 text-[22px] font-bold text-[#191919]">How to read the timeline</h2>
          <p className="mb-3">
            Each row is one dose step: what the label calls it, the date it starts counted from your first injection, and
            the earliest date the label allows the next increase. The &ldquo;slower ramp&rdquo; option adds 4 weeks to each
            step, which is the delay the Wegovy label describes when a dose is not tolerated; for Zepbound the label simply
            requires at least 4 weeks on each dose before increasing, with no maximum.
          </p>
          <p className="mb-3">
            Nothing here goes below a labelled starting dose or wider than once weekly. Readers asking about lower doses
            should start with our{" "}
            <Link href="/weight-loss/articles/glp1-microdosing-complete-guide" className={ext}>
              guide to GLP-1 microdosing
            </Link>
            , which sets out what the labels allow and what the evidence does and does not show. For what to expect in the
            first weeks, see{" "}
            <Link href="/weight-loss/articles/how-long-for-semaglutide-to-work" className={ext}>
              how long semaglutide takes to work
            </Link>
            .
          </p>
          <p>
            Compounded semaglutide and tirzepatide, which most online providers prescribe, have no FDA label of their own.
            Providers commonly model their schedules on the brand labels shown here, but the dose and interval on a compounded
            prescription are the prescriber&rsquo;s. The{" "}
            <Link href="/weight-loss/glp1-cost-calculator" className={ext}>cost calculator</Link> shows what those providers
            charge over the length of a ramp.
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
