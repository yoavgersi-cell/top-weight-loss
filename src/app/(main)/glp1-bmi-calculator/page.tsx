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
import { BmiCalculator } from "@/components/tools/bmi-calculator";
import { medicalWebPageFields } from "@/lib/medical-schema";

// ───── BMI & GLP-1 eligibility check ─────
// A calculator page: the tool itself is a client component with no data
// source beyond the reader's own inputs and the adult BMI thresholds in the
// Wegovy and Zepbound prescribing information. Everything stated on the page
// is either arithmetic or a label criterion, with the eligibility guide as
// the longer read.

const SLUG = "glp1-bmi-calculator";
const PATH = `/weight-loss/${SLUG}`;
const CANONICAL = `https://www.treatmentshub.com${PATH}`;
const PUBLISHED = "2026-10-27";
const UPDATED = "2026-10-27";
const TITLE = "BMI Calculator & GLP-1 Eligibility Check";

const FAQS: { question: string; answer: string }[] = [
  {
    question: "How is BMI calculated?",
    answer:
      "BMI is weight in kilograms divided by height in metres squared. In imperial units it is weight in pounds divided by height in inches squared, multiplied by 703. The calculator does that arithmetic and nothing else; it does not store or send what you enter.",
  },
  {
    question: "What BMI do you need for Wegovy or Zepbound?",
    answer:
      "The prescribing information for both medications covers adults with a BMI of 30 or more, or a BMI of 27 or more with at least one weight-related condition such as type 2 diabetes, high blood pressure, high cholesterol or obstructive sleep apnea. Those are the criteria the calculator checks against.",
  },
  {
    question: "Does meeting the BMI criterion mean I will be prescribed a GLP-1?",
    answer:
      "No. BMI is one criterion. A clinician also screens for contraindications in the labels, including a personal or family history of medullary thyroid carcinoma or MEN 2, pregnancy, and a history of pancreatitis, and reviews your other medications. Each telehealth provider also applies its own intake criteria.",
  },
  {
    question: "What are the limits of BMI?",
    answer:
      "BMI does not distinguish muscle from fat, does not account for where fat is carried, and uses the same thresholds for everyone. A muscular adult can have a high BMI with little body fat, and some groups carry health risk at lower BMIs. It is a screening number, which is why the labels pair it with weight-related conditions rather than using it alone.",
  },
  {
    question: "Do online GLP-1 providers use the same criteria?",
    answer:
      "The providers we review publish their own eligibility criteria, and most reference the same BMI thresholds as the labels. Compounded semaglutide and tirzepatide are not FDA-approved products, so for those the provider's clinician, not a label, decides who is prescribed. Our eligibility guide lists what each provider states.",
  },
];

export const metadata: Metadata = {
  title: `${TITLE} (2026)`,
  description:
    "Enter your height and weight for your BMI and whether it meets the Wegovy and Zepbound label criteria: BMI 30+, or 27+ with a weight-related condition.",
  alternates: { canonical: CANONICAL },
  openGraph: { images: [DEFAULT_OG_IMAGE], title: `${TITLE} (2026)`, url: CANONICAL, type: "article" },
};

export default function BmiCalculatorPage() {
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
          <Breadcrumbs items={[{ label: "Home", href: "/weight-loss" }, { label: "BMI & GLP-1 Eligibility Check" }]} />
          <h1 className="max-w-[820px] text-[27px] font-extrabold leading-[1.15] text-[#191919] sm:text-[36px]">{TITLE}</h1>
          <p className="mt-3 max-w-[720px] text-[16px] leading-relaxed text-gray-500">
            Your BMI from your height and weight, and whether it meets the adult criteria in the Wegovy and Zepbound
            prescribing information. The arithmetic runs in your browser; nothing you enter is stored or sent.
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
              Wegovy and Zepbound are approved for adults with a <strong className="text-[#191919]">BMI of 30 or more</strong>, or{" "}
              <strong className="text-[#191919]">27 or more with at least one weight-related condition</strong> such as type 2
              diabetes, high blood pressure, high cholesterol or sleep apnea. BMI is weight in kilograms divided by height in
              metres squared. Meeting the number is the first screen, not a prescription: a clinician still checks the
              contraindications in the labels.
            </p>
          </div>
        </div>

        <section className="mb-12" aria-labelledby="tool-heading">
          <div className="mb-3 flex items-center gap-2">
            <Calculator className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 id="tool-heading" className="text-[22px] font-bold text-[#191919]">Check your BMI against the label criteria</h2>
          </div>
          <BmiCalculator />
        </section>

        <section className="mb-12">
          <h2 className="mb-3 text-[22px] font-bold text-[#191919]">What the result means</h2>
          <p className="mb-3">
            The calculator reports the standard adult BMI categories and then states which, if any, of the label criteria
            your number meets. It is deliberately conservative: a BMI between 27 and 29.9 is reported as meeting the
            criteria only when you tick a weight-related condition, because that is what the prescribing information
            requires, and a BMI below 27 is reported as not meeting them.
          </p>
          <p className="mb-3">
            The four conditions listed are the ones named as examples in the labels. They are not the only ones a
            clinician can document, and the telehealth providers we review each publish their own intake rules. Our{" "}
            <Link href="/weight-loss/articles/who-qualifies-for-glp1-weight-loss" className={ext}>
              guide to who qualifies for GLP-1 weight-loss medication
            </Link>{" "}
            walks through the criteria, the contraindications and what each provider states.
          </p>
          <p>
            If your number meets the criteria and you are comparing providers, the{" "}
            <Link href="/weight-loss/glp1-cost-calculator" className={ext}>cost calculator</Link> multiplies every verified
            price out over the months you choose, and the{" "}
            <Link href="/weight-loss/how-to-choose-a-glp1-provider" className={ext}>provider guide</Link> covers the checks
            that matter beyond price.
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
