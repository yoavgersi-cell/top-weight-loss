import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowDownRight } from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { CONTENT_LAST_UPDATED, AFFILIATE_PROVIDER_IDS } from "@/lib/config";
import { BRAND_SHELF } from "@/lib/price-index";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { PriceIndex } from "@/components/price-index";
import { MedicalSources, TrustDisclosure } from "@/components/medical-sources";

export const revalidate = 60;

const CANONICAL = "https://www.treatmentshub.com/weight-loss/switch-from-ozempic";
const TITLE = "Switching From Ozempic to Compounded Semaglutide (2026): Cost & How It Works";
const DESCRIPTION =
  "Paying $1,000+/month for Ozempic, Wegovy or Zepbound? Compounded versions of the same active ingredients run $59-$299/month through licensed telehealth providers. How the switch actually works, what the clinician decides, and what to verify before you move.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | TreatmentsHub` },
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: CANONICAL, type: "article" },
};

const steps: { title: string; detail: string }[] = [
  {
    title: "Pick the provider before you run out",
    detail:
      "Approval and first shipment take from a day to about a week depending on the provider (embody reviews chart-review in ~24 hours and ships in 1-2 days; altRx ships in 5-7 days). Start the switch while you still have one or two doses left so there's no gap in treatment.",
  },
  {
    title: "Complete the intake - and disclose your current medication and dose",
    detail:
      "Every legitimate provider starts with a medical questionnaire. Report that you're currently on Ozempic, Wegovy or Zepbound and your exact current dose. This is the single most important step: it's what lets the reviewing clinician plan a continuation rather than treating you as a new starter.",
  },
  {
    title: "A licensed clinician decides your starting dose",
    detail:
      "The new provider's clinician - not you, and not a sales page - decides whether to continue near your current dose or adjust. Don't assume a 1:1 continuation is automatic; it's a clinical decision based on your history, and reputable providers (HealthRx states it explicitly) never make approval automatic.",
  },
  {
    title: "Your medication ships from a licensed pharmacy",
    detail:
      "Compounded semaglutide and tirzepatide ship as vials with syringes (some providers also offer needle-free formats - DirectMeds' sublingual drops, Medvi's dissolving tablets). Cold-chain shipping matters for injectables: embody and HealthRx ship temperature-controlled.",
  },
  {
    title: "Keep the same weekly rhythm, watch how you respond",
    detail:
      "Dosing stays weekly for injectables, and side-effect expectations are the same molecule-for-molecule. If anything feels different as you transition, use the provider's check-ins - that follow-up layer is included in every program we rank.",
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "Can I switch from Ozempic to compounded semaglutide?",
    answer:
      "Yes - this is one of the most common paths onto telehealth GLP-1 programs. Ozempic's active ingredient is semaglutide, and compounded semaglutide is the same molecule prepared by a state-licensed compounding pharmacy. You complete the new provider's medical intake, disclose your current medication and dose, and a licensed clinician decides your starting dose on the new program. Compounded products are not FDA-approved brand drugs, so provider and pharmacy quality matter - see what to verify below.",
  },
  {
    question: "How much cheaper is compounded semaglutide than Ozempic?",
    answer:
      "Substantially. On our providers' own brand shelves, Ozempic lists at $1,149-$1,399/month and Wegovy at $1,579/month, while compounded semaglutide runs $59-$199/month depending on the provider and plan. Even at the most expensive compounded tier, the difference is roughly $950/month - over $11,000 a year.",
  },
  {
    question: "Will I keep my current dose when I switch?",
    answer:
      "That's the reviewing clinician's call, and it's made from your intake - which is why disclosing your exact current medication and dose matters. Many providers charge the same price at every dose (wellmedr, altRx, DirectMeds, embody), so a higher continuation dose doesn't cost more at those programs. Never adjust your own dose during a switch without clinical guidance.",
  },
  {
    question: "What about switching from Zepbound or Mounjaro?",
    answer:
      "Same logic, different molecule: Zepbound and Mounjaro are tirzepatide, and compounded tirzepatide is available from $99/month (wellmedr) to $299/month (SHED), versus $1,249-$1,599/month for brand Zepbound. Disclose your current dose in the intake exactly as you would with semaglutide.",
  },
  {
    question: "Is switching to compounded safe?",
    answer:
      "The molecule is the same, but compounded products are not FDA-approved brand drugs and quality depends on the pharmacy. Reduce that risk the same way we rank providers: require a real clinician review (never automatic approval), state-licensed 503A pharmacies, LegitScript certification where available (embody, HealthRx), and cold-chain shipping for injectables. And talk to your current prescriber - continuity of care beats a silent switch.",
  },
  {
    question: "Do I need to tell my current doctor?",
    answer:
      "You should. The telehealth provider's clinician takes over prescribing, but your own doctor knowing your full medication picture is basic safety - especially if you have other conditions or prescriptions. There's no penalty for switching; brand prescriptions simply lapse when you stop filling them.",
  },
];

export default async function SwitchFromOzempicPage() {
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
      { "@type": "ListItem", position: 2, name: "Switch From Ozempic", item: CANONICAL },
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
          <Breadcrumbs items={[{ label: "Home", href: "/weight-loss" }, { label: "Switch From Ozempic" }]} />
          <h1 className="max-w-[780px] text-[27px] font-extrabold leading-[1.15] text-[#191919] sm:text-[36px]">
            Switching From Ozempic to Compounded Semaglutide
          </h1>
          <p className="mt-3 max-w-[680px] text-[15.5px] leading-relaxed text-gray-500">
            If you&rsquo;re already injecting a GLP-1 and paying brand prices, this is the guide to
            moving to the same active ingredient at $59-$299/month - what actually happens, what the
            clinician decides, and what to verify before you move.
          </p>
          <LastUpdated date={CONTENT_LAST_UPDATED} className="mt-4" />
          <TrustDisclosure disclaimerHref="/weight-loss/disclaimer" />
        </div>
      </div>

      <div className="mx-auto max-w-[1000px] px-4 py-10 sm:px-6">
        {/* Direct answer */}
        <div className="mb-10 rounded-2xl border border-[#0C4B75]/20 bg-white p-6 shadow-sm sm:p-7">
          <p className="mb-2.5 text-[12px] font-bold uppercase tracking-[0.07em] text-[#0C4B75]">
            The short answer
          </p>
          <p className="text-[15.5px] leading-[1.85] text-gray-700">
            Ozempic and Wegovy are <strong className="text-[#191919]">semaglutide</strong>; Zepbound
            and Mounjaro are <strong className="text-[#191919]">tirzepatide</strong>. Licensed
            telehealth providers prescribe compounded versions of the same molecules for{" "}
            <strong className="text-[#191919]">$59-$299/month</strong> - versus $1,149-$1,599/month
            at brand list prices. Switching means completing the new provider&rsquo;s medical intake,
            disclosing your current medication and dose, and letting its licensed clinician set your
            continuation dose. Start before your current supply runs out: approval-to-delivery takes
            between a day and a week depending on the provider.
          </p>
        </div>

        {/* Brand vs compounded price math */}
        <section className="mb-12">
          <div className="mb-3 flex items-center gap-2">
            <ArrowDownRight className="h-5 w-5 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[22px] font-bold text-[#191919]">The price gap, in real numbers</h2>
          </div>
          <p className="mb-5 max-w-[680px] text-[14px] text-gray-500">
            Brand list prices below are taken from our providers&rsquo; own brand-name shelves - not
            estimates. The compounded equivalents are in the index further down.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50/80">
                  <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">Brand drug</th>
                  <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">Active ingredient</th>
                  <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">Brand list price</th>
                  <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">Compounded from</th>
                </tr>
              </thead>
              <tbody>
                {BRAND_SHELF.map((row) => (
                  <tr key={row.drug} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-4 text-[14.5px] font-bold text-[#191919]">{row.drug}</td>
                    <td className="px-4 py-4 text-[13.5px] text-gray-600">{row.ingredient}</td>
                    <td className="px-4 py-4">
                      <span className="text-[14.5px] font-semibold text-gray-500 [font-variant-numeric:tabular-nums]">{row.price}</span>
                      <p className="mt-0.5 text-[11.5px] text-gray-400">{row.soldAt}</p>
                    </td>
                    <td className="px-4 py-4 text-[14.5px] font-extrabold text-emerald-700 [font-variant-numeric:tabular-nums]">
                      {row.ingredient === "Tirzepatide" ? "$99/mo" : "$59/mo"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[13px] text-gray-400">
            At the widest gap - Wegovy $1,579 vs wellmedr&rsquo;s $59 semaglutide plan - the
            difference is over $18,000 a year. Compounded products are not FDA-approved brand drugs;
            the quality bar lives with the pharmacy, which is what the checklist below is for.
          </p>
        </section>

        {/* How the switch works */}
        <section className="mb-12">
          <h2 className="mb-5 text-[22px] font-bold text-[#191919]">How the switch actually works</h2>
          <div className="space-y-3">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-4 rounded-xl border border-gray-200 bg-white p-5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0C4B75] text-[13px] font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="mb-1 text-[15.5px] font-bold text-[#191919]">{s.title}</p>
                  <p className="text-[14px] leading-[1.75] text-gray-600">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What to verify */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[22px] font-bold text-[#191919]">What to verify before you switch</h2>
          </div>
          <div className="grid gap-4 text-[14px] leading-[1.75] text-gray-600 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="mb-1.5 font-bold text-[#191919]">A real clinician review</p>
              <p>
                Approval should never be automatic. Every provider we rank routes your intake to a
                licensed clinician who can decline or adjust - if a site promises guaranteed approval,
                walk away.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="mb-1.5 font-bold text-[#191919]">Licensed 503A pharmacies</p>
              <p>
                Compounded medication is only as good as the pharmacy that prepares it. Look for
                named, state-licensed 503A compounding pharmacies and LegitScript certification where
                available (embody; HealthRx, cert. 50087439).
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="mb-1.5 font-bold text-[#191919]">Cold-chain shipping for injectables</p>
              <p>
                Semaglutide and tirzepatide are temperature-sensitive. embody and HealthRx ship
                temperature-controlled and tracked; whichever provider you pick, medication should
                arrive cold, with ice packs, fast.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="mb-1.5 font-bold text-[#191919]">Price at YOUR dose, not the headline</p>
              <p>
                If you're switching on an escalated dose, flat-at-every-dose pricing (wellmedr, altRx,
                DirectMeds, embody) means the advertised price is your price. Providers that price by
                dose can cost more than their headline suggests.
              </p>
            </div>
          </div>
        </section>

        {/* The index */}
        <section className="mb-12">
          <h2 className="mb-1.5 text-[22px] font-bold text-[#191919]">Where switchers land: the price index</h2>
          <p className="mb-5 max-w-[680px] text-[14px] text-gray-500">
            The same verified index from our{" "}
            <Link href="/weight-loss/cheapest-glp1" className="font-semibold text-[#0C4B75] hover:underline">
              cheapest GLP-1
            </Link>{" "}
            ranking - real published prices, cheapest first, conditions disclosed.
          </p>
          <PriceIndex providers={providers} />
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="mb-5 text-[22px] font-bold text-[#191919]">Switching From Ozempic: FAQs</h2>
          <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {faqs.map((f, i) => (
              <div key={i} className="p-6">
                <h3 className="mb-2 text-[15.5px] font-bold text-[#191919]">{f.question}</h3>
                <p className="text-[14px] leading-[1.75] text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <MedicalSources vertical="weight-loss" />

        <p className="mt-6 text-[13px] leading-relaxed text-gray-400">
          Ozempic, Wegovy, Mounjaro, Zepbound and Rybelsus are trademarks of their respective
          manufacturers and are not affiliated with treatmentshub.com. Compounded medications are not
          FDA-approved brand drugs. This page is for information only and is not medical advice -
          always consult a licensed clinician about switching or starting any medication.
        </p>
      </div>
    </div>
  );
}
