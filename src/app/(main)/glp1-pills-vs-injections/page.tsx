import type { Metadata } from "next";
import Link from "next/link";
import { Pill, Syringe, Trophy, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { CONTENT_LAST_UPDATED } from "@/lib/config";

export const revalidate = 60;

const CANONICAL = "https://www.treatmentshub.com/weight-loss/glp1-pills-vs-injections";

export const metadata: Metadata = {
  title: "GLP-1 Pills vs Injections (2026): Which Is Better?",
  description:
    "GLP-1 pills vs injections compared for 2026 - now that oral Wegovy and orforglipron (Foundayo) are FDA-approved. Average weight loss, cost, convenience, and how to choose.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "GLP-1 Pills vs Injections (2026): Which Is Better?",
    description:
      "Oral GLP-1 pills vs injections - results, cost, convenience, and how to choose.",
    url: CANONICAL,
    type: "article",
  },
};

const compareRows: [string, string, string][] = [
  ["Average weight loss", "~16.6% (oral Wegovy, OASIS-4) to ~12.4% (orforglipron, ATTAIN-1); Rybelsus doses lower", "~15% (semaglutide) to ~22.5% (tirzepatide) in trials"],
  ["How you take it", "Daily tablet - no needles", "Once-weekly self-injection"],
  ["Main options", "Oral Wegovy (approved Dec 2025), orforglipron / Foundayo (approved Apr 2026), Rybelsus (diabetes)", "Semaglutide (Wegovy), tirzepatide (Zepbound)"],
  ["Convenience", "Daily pill; oral semaglutide needs empty-stomach timing, orforglipron has no food/water restrictions", "One injection a week; no daily routine"],
  ["FDA status", "Two oral GLP-1s now approved for weight management", "Established, long-approved"],
  ["Cost (telehealth)", "Brand pills new to market - pricing varies; confirm current cash/insurance", "Compounded options often from ~$69-$149/mo"],
  ["Best for", "People who want to avoid needles or a no-timing daily pill", "People prioritizing the greatest average weight loss"],
];

const faqs: { question: string; answer: string }[] = [
  { question: "Are GLP-1 pills as effective as injections?", answer: "It now depends on which pill. Oral Wegovy (oral semaglutide 25mg) produced about 16.6% mean weight loss in the OASIS-4 trial when taken as directed - roughly matching injectable Wegovy. Orforglipron (Foundayo) reached up to about 12.4% in ATTAIN-1. Injectable tirzepatide (Zepbound) still leads on peak average results, up to ~22.5% in trials. So the newest pills rival semaglutide injections, while tirzepatide injection remains the strongest average performer." },
  { question: "Which is cheaper, GLP-1 pills or injections?", answer: "It depends on the specific medication and provider. Through telehealth, compounded injectable GLP-1s are often the most affordable route (frequently around $69-$149/month, including consultations). The new brand-name oral pills are just reaching the market, so pricing varies - confirm current cash, insurance, and telehealth pricing before deciding. The best value comes down to which medication you're prescribed and the plan you choose." },
  { question: "Do GLP-1 pills have fewer side effects than injections?", answer: "The side-effect profile is broadly similar because they're the same drug class - most commonly nausea and other GI effects, especially early on. The route (pill vs injection) doesn't dramatically change this; dose and how gradually you titrate matter more." },
  { question: "Can you switch from injections to pills, or vice versa?", answer: "Often yes, under medical supervision. Many people move between formulations based on tolerance, convenience, or availability. A licensed clinician determines the right medication, dose, and titration when switching - there's no DIY dose conversion between them." },
  { question: "Is there a GLP-1 pill approved specifically for weight loss?", answer: "Yes - two, as of 2026. The FDA approved oral Wegovy (oral semaglutide 25mg) in December 2025, the first oral GLP-1 for chronic weight management, and orforglipron (Foundayo) from Eli Lilly in April 2026, the first that can be taken any time of day with no food or water restrictions. Rybelsus (lower-dose oral semaglutide) remains approved for type 2 diabetes rather than weight loss." },
];

export default function Glp1PillsVsInjectionsPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "GLP-1 Pills vs Injections (2026): Which Is Better?",
    description: metadata.description,
    datePublished: "2026-08-09",
    dateModified: "2026-09-12",
    author: { "@type": "Organization", name: "Treatments Hub Team", url: "https://www.treatmentshub.com" },
    publisher: { "@type": "Organization", name: "Treatments Hub", url: "https://www.treatmentshub.com" },
    mainEntityOfPage: CANONICAL,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.treatmentshub.com/weight-loss" },
      { "@type": "ListItem", position: 2, name: "GLP-1 Pills vs Injections", item: CANONICAL },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "GLP-1 Pills vs Injections" }]} />
          <h1 className="text-[28px] font-extrabold text-[#191919] sm:text-[36px]">
            GLP-1 Pills vs Injections: Which Is Better for Weight Loss?
          </h1>
          <p className="mt-3 max-w-[640px] text-[16px] leading-relaxed text-gray-500">
            The pills have arrived: two oral GLP-1s are now FDA-approved for weight loss. Here&rsquo;s
            an honest, side-by-side comparison of results, cost, convenience, and how to choose between
            a daily tablet and a weekly injection.
          </p>
          <LastUpdated date={CONTENT_LAST_UPDATED} className="mt-4" />
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-4 py-10 text-[16px] leading-[1.75] text-gray-800 sm:px-6">
        {/* Quick verdict */}
        <div className="mb-10 flex items-start gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
          <Trophy className="mt-0.5 h-6 w-6 shrink-0 text-amber-500" strokeWidth={2} />
          <div>
            <h2 className="mb-2 text-[18px] font-bold text-[#191919]">The short answer</h2>
            <p className="text-[15px] leading-[1.75] text-gray-600">
              <strong className="text-[#191919]">Tirzepatide injection still wins on peak average
              weight loss</strong> (up to ~22.5% in trials), but{" "}
              <strong className="text-[#191919]">the newest pills now rival semaglutide injections</strong>
              {" "}- oral Wegovy hit ~16.6% in its trial. Pills win on convenience: a daily tablet, no
              needles. Pick tirzepatide for maximum average results; pick an oral GLP-1 if avoiding
              needles matters more to you.
            </p>
          </div>
        </div>

        {/* Comparison table */}
        <section className="mb-12">
          <h2 className="mb-4 text-[24px] font-bold text-[#191919]">GLP-1 pills vs injections at a glance</h2>
          <div className="mb-4 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[640px] text-left text-[14px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 font-bold text-[#191919]">Factor</th>
                  <th className="px-4 py-3 font-bold text-[#191919]">GLP-1 Pills (oral)</th>
                  <th className="px-4 py-3 font-bold text-[#191919]">GLP-1 Injections</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {compareRows.map(([k, a, b], i) => (
                  <tr key={i} className={i % 2 === 1 ? "bg-gray-50/50" : ""}>
                    <td className="px-4 py-3 align-top font-medium text-[#191919]">{k}</td>
                    <td className="px-4 py-3 align-top text-gray-600">{a}</td>
                    <td className="px-4 py-3 align-top text-gray-600">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* The pills */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <Pill className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[24px] font-bold text-[#191919]">The pills: oral GLP-1s</h2>
          </div>
          <p className="mb-4">
            Oral GLP-1s deliver the same class of medication as the injections, in tablet form - and
            the landscape changed fast. <strong className="text-[#191919]">Oral Wegovy</strong> (oral
            semaglutide 25mg) was FDA-approved in December 2025 as the first oral GLP-1 for chronic
            weight management, with about 16.6% mean weight loss in the OASIS-4 trial when taken as
            directed - roughly matching injectable Wegovy. It&rsquo;s a once-daily tablet, but as a
            peptide it must be taken on an empty stomach with a small sip of water, waiting about 30
            minutes before eating, drinking, or other medications.
          </p>
          <p className="mb-4">
            <strong className="text-[#191919]">Orforglipron</strong> (brand name Foundayo, from Eli
            Lilly) followed with FDA approval in April 2026. As a small-molecule (non-peptide) GLP-1,
            it&rsquo;s the first weight-loss pill that can be taken any time of day with{" "}
            <strong className="text-[#191919]">no food or water restrictions</strong> - a real
            convenience edge. It reached up to about 12.4% weight loss at 72 weeks in the ATTAIN-1
            trial. Separately, <strong className="text-[#191919]">Rybelsus</strong> (lower-dose oral
            semaglutide) remains FDA-approved for type 2 diabetes rather than weight loss, at doses that
            produce less weight loss than the newer 25mg pill. See our full{" "}
            <Link href="/weight-loss/weight-loss-pills" className="font-semibold text-[#0C4B75] hover:underline">
              weight loss pills guide
            </Link>{" "}
            for the complete oral landscape.
          </p>
        </section>

        {/* The injections */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <Syringe className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[24px] font-bold text-[#191919]">The injections: semaglutide &amp; tirzepatide</h2>
          </div>
          <p className="mb-4">
            The injectables set the benchmark.{" "}
            <Link href="/weight-loss/semaglutide" className="font-semibold text-[#0C4B75] hover:underline">Semaglutide</Link>{" "}
            (Wegovy) produces ~15% average weight loss in trials, and{" "}
            <Link href="/weight-loss/tirzepatide" className="font-semibold text-[#0C4B75] hover:underline">tirzepatide</Link>{" "}
            (Zepbound) reaches up to ~22.5% - still the strongest average performer of any GLP-1,
            pill or shot. Both are once-weekly injections, and through telehealth, compounded versions
            are often the most affordable path to GLP-1 treatment.
          </p>
        </section>

        {/* How to choose */}
        <section className="mb-12">
          <h2 className="mb-4 text-[24px] font-bold text-[#191919]">Which should you choose?</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="mb-2 flex items-center gap-2"><Pill className="h-5 w-5 text-[#0C4B75]" strokeWidth={2} /><h3 className="text-[15px] font-bold text-[#191919]">Lean toward pills if…</h3></div>
              <ul className="space-y-1.5 text-[14px] text-gray-600">
                <li>You want to avoid needles entirely</li>
                <li>A simple daily tablet fits your routine better</li>
                <li>You&rsquo;re starting out and want a lower-commitment option</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="mb-2 flex items-center gap-2"><Syringe className="h-5 w-5 text-[#0C4B75]" strokeWidth={2} /><h3 className="text-[15px] font-bold text-[#191919]">Lean toward injections if…</h3></div>
              <ul className="space-y-1.5 text-[14px] text-gray-600">
                <li>Maximum average weight loss is your priority</li>
                <li>You prefer a once-weekly routine over a daily one</li>
                <li>You want the most established, well-studied results</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-[14px] text-gray-500">
            Either way, a licensed clinician determines the right medication, dose, and titration for
            your health profile.
          </p>
        </section>

        {/* CTA */}
        <section className="mb-12">
          <h2 className="mb-4 text-[24px] font-bold text-[#191919]">Get started online</h2>
          <p className="mb-6">
            Compare licensed telehealth providers on pricing, medical support, and value - whether you
            lean toward a pill or an injection.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/weight-loss" className="inline-flex h-[46px] items-center justify-center gap-2 rounded-lg bg-[#0C4B75] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]">
              Compare Top Providers
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
            <Link href="/weight-loss/weight-loss-pills" className="inline-flex h-[46px] items-center justify-center rounded-lg border border-gray-200 bg-white px-6 text-[14px] font-semibold text-[#191919] transition-colors hover:bg-gray-50">
              Weight Loss Pills Guide
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="mb-6 text-[24px] font-bold text-[#191919]">GLP-1 Pills vs Injections: FAQ</h2>
          <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {faqs.map((f, i) => (
              <div key={i} className="p-6">
                <h3 className="mb-2 text-[16px] font-bold text-[#191919]">{f.question}</h3>
                <p className="text-[14px] leading-[1.7] text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sources + disclaimer */}
        <section>
          <p className="mb-3 text-[13px] leading-relaxed text-gray-400">
            Sources: FDA approvals and prescribing information - oral Wegovy (oral semaglutide 25mg)
            approved December 2025 and orforglipron (Foundayo) approved April 2026; published clinical
            trial data (STEP and OASIS for semaglutide, SURMOUNT for injectable tirzepatide, ATTAIN for
            orforglipron). Weight loss figures are trial averages; individual results vary. Brand names
            are trademarks of their respective manufacturers.
          </p>
          <p className="text-[13px] leading-relaxed text-gray-400">
            treatmentshub.com is not a medical provider and does not prescribe medications. This page is
            for educational and comparison purposes only and is not medical advice. GLP-1 medications
            require evaluation and supervision by a licensed healthcare provider.
          </p>
        </section>
      </div>
    </div>
  );
}
