import { MedicalReviewBar } from "@/components/medical-review-bar";
import { pageReviewSchema } from "@/data/reviewers";
import type { Metadata } from "next";
import Link from "next/link";
import { GuideCluster } from "@/components/guide-cluster";
import { TopTwoPicks } from "@/components/top-providers-block";
import { Pill, Syringe, ShieldCheck, TriangleAlert, ArrowRight, Check, FlaskConical } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProviderCta } from "@/components/provider-cta";
import { LastUpdated } from "@/components/last-updated";
import { getConfig } from "@/lib/config-store";

// Providers confirmed to offer compounded oral options (site owner confirmed).
// Featured accurately using verified provider data - no invented pill claims.
const PILL_PROVIDER_IDS = ["embody", "trimrx", "medvi", "shed"];

// Page-specific date: the Oct 9, 2026 rebuild around the FDA-approved pills.
// Deliberately not the sitewide CONTENT_LAST_UPDATED floor.
const PAGE_UPDATED = "2026-10-09";

export const revalidate = 60;

const CANONICAL = "https://www.treatmentshub.com/weight-loss/weight-loss-pills";

export const metadata: Metadata = {
  title: "Weight Loss Pills 2026: Wegovy Pill, Foundayo, Rybelsus & Other Rx Options",
  description:
    "Prescription weight loss pills in 2026: the FDA-approved GLP-1 pills (Wegovy pill, Foundayo, Rybelsus) with trial results and published prices, the other FDA-approved pills (Qsymia, Contrave, phentermine, orlistat), and compounded oral options - clearly labelled.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Weight Loss Pills 2026: Wegovy Pill, Foundayo, Rybelsus & Other Rx Options",
    description:
      "The FDA-approved GLP-1 pills, the other prescription pills, and compounded oral options - results, prices and how they compare to injections.",
    url: CANONICAL,
    type: "article",
  },
};

// ── Real, publicly documented medical data (not provider claims) ──
// FDA-approved GLP-1 pills. Trial figures are the NEJM treatment-policy
// results (ACC journal scans, Sept 24, 2025); prices are Ro's verified
// published figures and manufacturer prices as reported by the dated
// sources cited at the foot of the page.
const glp1Pills: string[][] = [
  [
    "Wegovy pill (oral semaglutide 25 mg) - Novo Nordisk",
    "FDA-approved December 2025 for chronic weight management. Once daily on an empty stomach with a sip of water, then a 30-minute wait before food",
    "OASIS 4 (64 weeks): 13.6% mean weight loss vs 2.2% on placebo; 30% lost 20% or more",
    "Ro: $149 first month, then $299, plus membership (verified). NovoCare self-pay reported at $149-$299 by dose; $25 with commercial coverage (reported)",
  ],
  [
    "Foundayo (orforglipron) - Eli Lilly",
    "FDA-approved April 1, 2026. Small-molecule GLP-1: once daily, any time, no food or water restrictions; 6 / 12 / 36 mg tablets",
    "ATTAIN-1 (72 weeks): 11.2% mean weight loss at 36 mg vs 2.1% on placebo; 19% lost 20% or more (Lilly cites 12.4% on treatment)",
    "LillyDirect self-pay $149-$349 a month by dose; $25 a month with commercial coverage (Lilly, as reported)",
  ],
  [
    "Rybelsus (oral semaglutide 7-14 mg) - Novo Nordisk",
    "FDA-approved for type 2 diabetes, not for weight management. Same empty-stomach rule as the Wegovy pill",
    "Modest weight loss at diabetes doses - well below the 25 mg Wegovy pill",
    "Prescribed under its diabetes label; weight-loss use is off-label and not covered as such",
  ],
];

const fdaPills: string[][] = [
  ["Qsymia (phentermine/topiramate)", "Appetite suppression + reduced cravings; daily capsule. Not for use in pregnancy (topiramate is teratogenic); contraindicated in glaucoma and hyperthyroidism", "Among the most effective non-GLP-1 oral options - roughly 8-10% average weight loss"],
  ["Contrave (bupropion/naltrexone)", "Targets appetite and reward-related eating; daily tablet. Carries a boxed warning for suicidal thoughts/behavior; avoid with seizure disorders or uncontrolled high blood pressure", "Roughly 5-9% average weight loss"],
  ["Phentermine (Adipex-P)", "Short-term appetite suppressant; controlled substance", "Roughly 3-5% over short-term use"],
  ["Metformin", "Used off-label; improves insulin sensitivity; daily tablet", "Modest (~2-3%); often used as a lower-cost option"],
  ["Orlistat (Xenical / Alli)", "Blocks absorption of some dietary fat; Rx and OTC", "Roughly 3-5%; GI side effects are common"],
];

const pillsVsInjections: string[][] = [
  ["Average weight loss", "13.6% (Wegovy pill, OASIS 4) and 11.2% (Foundayo, ATTAIN-1) at their top doses; roughly 3-10% for the non-GLP-1 pills", "~15% (semaglutide) to ~22.5% (tirzepatide) in trials"],
  ["Format", "Daily tablet or capsule - no needles", "Once-weekly injection"],
  ["Published price (brand)", "From $149 a month at the starting dose; $299 (Wegovy pill) to $349 (Foundayo) at the top dose, as reported; $25 with commercial coverage", "Brand injections $1,149-$1,799 a month cash at providers we track; compounded from $49 (semaglutide) and $89 (tirzepatide)"],
  ["Best for", "Needle-averse patients; those who want a daily routine or, with Foundayo, no timing rules", "Those prioritizing the greatest average weight loss"],
  ["Considerations", "Wegovy pill and Rybelsus need empty-stomach timing; Foundayo does not", "Weekly self-injection; strong, well-studied results"],
];

function DataTable({ cols, rows }: { cols: string[]; rows: string[][] }) {
  return (
    <div className="mb-4 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[640px] text-left text-[14px]">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 font-bold text-[#191919]">Option</th>
            {cols.map((c) => (
              <th key={c} className="px-4 py-3 font-bold text-[#191919]">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map(([k, ...cells], i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-gray-50/50" : ""}>
              <td className="px-4 py-3 align-top font-medium text-[#191919]">{k}</td>
              {cells.map((c, ci) => (
                <td key={ci} className="px-4 py-3 align-top text-gray-600">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const faqs: { question: string; answer: string }[] = [
  { question: "Do weight loss pills actually work?", answer: "Prescription weight loss pills can work, and the gap to injections has narrowed. The two FDA-approved GLP-1 pills produced 13.6% (Wegovy pill, OASIS 4) and 11.2% (Foundayo, ATTAIN-1) mean weight loss in their trials; older FDA-approved pills like Qsymia and Contrave produce roughly 5-10%. Over-the-counter 'fat burner' or 'natural' pills are largely unproven and are not a substitute for prescription treatment." },
  { question: "Is there a weight loss pill as effective as Ozempic or Wegovy?", answer: "Yes, for semaglutide. The Wegovy pill (oral semaglutide 25 mg), FDA-approved in December 2025, produced 13.6% mean weight loss at 64 weeks in OASIS 4 - an effect the trial authors describe as similar to the weekly Wegovy injection in its own trial. Foundayo (orforglipron), approved April 1, 2026, reached 11.2% at its top dose. Injectable tirzepatide (Zepbound) still leads on average results, at up to 22.5%." },
  { question: "What is the strongest prescription weight loss pill?", answer: "On published trial results, the Wegovy pill (oral semaglutide 25 mg) at 13.6% mean weight loss, followed by Foundayo at 11.2% - separate trials, not head to head. Among the non-GLP-1 pills, Qsymia (phentermine/topiramate) tends to produce the most weight loss, roughly 8-10% on average." },
  { question: "How much do the FDA-approved GLP-1 pills cost?", answer: "At the one telehealth route we have verified, Ro sells the Wegovy pill at $149 for the first month, then $299 a month, plus a $39-then-$74-149 membership. Novo Nordisk's direct-pay tiers are reported at $149-$299 by dose, and Foundayo lists $149-$349 a month self-pay through LillyDirect. Both manufacturers offer a $25-a-month savings card with commercial coverage, and both pills are in Medicare's $50 GLP-1 Bridge pilot through December 2027." },
  { question: "Can you get weight loss pills online?", answer: "Yes. Licensed telehealth providers can evaluate you online and, when appropriate, prescribe oral weight loss medication. Ro sells the FDA-approved Wegovy pill; several providers we review offer compounded oral semaglutide or tirzepatide, which are not FDA-approved products. A clinician determines whether an oral or injectable option fits your health profile." },
  { question: "Are compounded weight loss pills the same as the Wegovy pill or Foundayo?", answer: "No. The Wegovy pill and Foundayo are FDA-approved finished drugs with their own trials. Compounded oral semaglutide or tirzepatide is prepared by a licensed 503A pharmacy for an individual prescription; it is a legal, regulated channel, but the products are not FDA-approved, have no trials of their own, and absorb differently from the approved tablets. They are cheaper for that reason." },
  { question: "Are weight loss pills or injections better?", answer: "It depends on your priorities. Injections still produce the greatest average weight loss (tirzepatide up to 22.5%), but the Wegovy pill now matches semaglutide injections in its own trial, and Foundayo removes the needle and the timing rules entirely. If maximum results matter most, injections lead today; if avoiding needles matters more, a GLP-1 pill is a strong fit. A clinician makes the call on your history." },
];

export default async function WeightLossPillsPage() {
  const config = await getConfig();
  const pillProviders = PILL_PROVIDER_IDS
    .map((id) => config.providers.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Weight Loss Pills 2026: Wegovy Pill, Foundayo, Rybelsus & Other Prescription Options",
    description: metadata.description,
    datePublished: "2026-08-01",
    dateModified: PAGE_UPDATED,
    ...pageReviewSchema("/weight-loss/weight-loss-pills"),
    author: { "@type": "Organization", name: "Treatments Hub Team", url: "https://www.treatmentshub.com" },
    publisher: { "@type": "Organization", name: "Treatments Hub", url: "https://www.treatmentshub.com" },
    mainEntityOfPage: CANONICAL,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.treatmentshub.com/weight-loss" },
      { "@type": "ListItem", position: 2, name: "Weight Loss Pills", item: CANONICAL },
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
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Weight Loss Pills" }]} />
          <h1 className="text-[28px] font-extrabold text-[#191919] sm:text-[36px]">
            Weight Loss Pills in 2026: The FDA-Approved GLP-1 Pills and Every Other Prescription Option
          </h1>
          <p className="mt-3 max-w-[640px] text-[16px] leading-relaxed text-gray-500">
            Not everyone wants a weekly injection, and for the first time there are two FDA-approved
            GLP-1 pills to choose from. Here&rsquo;s an honest look at every oral option - the approved
            GLP-1 pills first, the older prescription pills, then compounded tablets, clearly labelled -
            and how they compare to injections.
          </p>
          <LastUpdated date={PAGE_UPDATED} className="mt-4" />
          <MedicalReviewBar path="/weight-loss/weight-loss-pills" className="mt-4 max-w-[760px]" />
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-4 py-10 text-[16px] leading-[1.75] text-gray-800 sm:px-6">
        {/* Do they work */}
        <section className="mb-12">
          <h2 className="mb-4 text-[24px] font-bold text-[#191919]">Do weight loss pills work?</h2>
          <p className="mb-4">
            Some do, and the answer changed in the last year. Two GLP-1 pills are now FDA-approved for
            chronic weight management: the <strong className="text-[#191919]">Wegovy pill</strong> (oral
            semaglutide 25 mg, approved December 2025) and <strong className="text-[#191919]">Foundayo</strong>{" "}
            (orforglipron, approved April 1, 2026). In their trials they produced 13.6% and 11.2% mean
            weight loss - the Wegovy pill&rsquo;s result is described by its trial authors as similar to
            the weekly semaglutide injection. Below them sit the older prescription pills at roughly 3-10%,
            and below those the over-the-counter &ldquo;fat burners&rdquo; that fill search results with
            little evidence behind them. This guide covers the medically recognised options, what the
            evidence shows, and what each one costs at published prices.
          </p>
          <p>
            Prefer injections? See our guides to{" "}
            <Link href="/weight-loss/semaglutide" className="font-semibold text-[#0C4B75] hover:underline">semaglutide</Link>{" "}
            and{" "}
            <Link href="/weight-loss/tirzepatide" className="font-semibold text-[#0C4B75] hover:underline">tirzepatide</Link>{" "}
            providers.
          </p>
        </section>

        <TopTwoPicks config={config} linkPrefix="/weight-loss" />

        {/* FDA-approved GLP-1 pills */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <Pill className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[24px] font-bold text-[#191919]">The FDA-approved GLP-1 pills</h2>
          </div>
          <p className="mb-4">
            These are the same class of medication as Ozempic, Wegovy and Zepbound, in tablet form, and
            two of the three are approved specifically for weight management. Trial figures are from the
            published New England Journal of Medicine papers, counting everyone randomised; both
            manufacturers also quote higher on-treatment figures (16.6% for the Wegovy pill, 12.4% for
            Foundayo). Prices are Ro&rsquo;s verified published figures and manufacturer prices as
            reported by the sources cited below - confirm the manufacturer tiers before you budget.
          </p>
          <DataTable cols={["Status and how it is taken", "Trial results", "Published price"]} rows={glp1Pills} />
          <p className="mt-4 text-[15px]">
            Read next:{" "}
            <Link href="/weight-loss/articles/wegovy-pill-price-online" className="font-semibold text-[#0C4B75] hover:underline">
              Wegovy pill price online
            </Link>{" "}
            and{" "}
            <Link href="/weight-loss/articles/foundayo-vs-wegovy-pill" className="font-semibold text-[#0C4B75] hover:underline">
              Foundayo vs the Wegovy pill
            </Link>
            . With commercial insurance that covers either drug, the manufacturers&rsquo; savings cards bring
            the price to $25 a month; on Medicare, both pills are in the{" "}
            <Link href="/weight-loss/articles/glp1-after-65-medicare" className="font-semibold text-[#0C4B75] hover:underline">
              $50 GLP-1 Bridge pilot
            </Link>{" "}
            through December 2027.
          </p>
        </section>

        {/* Other FDA-approved pills */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[24px] font-bold text-[#191919]">Other FDA-approved prescription weight loss pills</h2>
          </div>
          <p className="mb-4">
            Beyond GLP-1s, several oral medications are FDA-approved (or widely used off-label) for
            weight management. They work in different ways - appetite suppression, craving reduction,
            or blocking fat absorption - and produce less weight loss on average than the GLP-1 pills,
            at generally lower prices.
          </p>
          <DataTable cols={["How it works", "Typical results"]} rows={fdaPills} />
        </section>

        {/* Pills vs injections */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <Syringe className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[24px] font-bold text-[#191919]">GLP-1 pills vs injections: which is right for you?</h2>
          </div>
          <p className="mb-4">
            The honest summary: injections still deliver the greatest average weight loss, but the
            Wegovy pill now matches semaglutide injections in its own trial and Foundayo removes the
            needle and the timing rules. Here&rsquo;s how pills and injections compare - or read our full{" "}
            <Link href="/weight-loss/glp1-pills-vs-injections" className="font-semibold text-[#0C4B75] hover:underline">
              GLP-1 pills vs injections comparison
            </Link>.
          </p>
          <DataTable cols={["Pills (oral)", "Injections"]} rows={pillsVsInjections} />
        </section>

        {/* Compounded oral options */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <FlaskConical className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[24px] font-bold text-[#191919]">Compounded oral semaglutide and tirzepatide (not FDA-approved)</h2>
          </div>
          <p className="mb-4">
            Several telehealth providers offer compounded oral forms of semaglutide or tirzepatide -
            tablets, sublingual drops or dissolving films - alongside their injections. These are
            prepared by licensed 503A compounding pharmacies for an individual prescription. That is a
            legal, regulated channel, but it is a different thing from the pills above:{" "}
            <strong className="text-[#191919]">compounded products are not FDA-approved</strong>, they have
            no trials of their own, and an oral compounded peptide is absorbed differently from the
            approved 25 mg tablet. Their advantage is price and a familiar provider relationship; the
            trade-offs are in our{" "}
            <Link href="/weight-loss/articles/compounded-semaglutide-vs-brand-name" className="font-semibold text-[#0C4B75] hover:underline">
              compounded vs brand-name
            </Link>{" "}
            guide. A licensed clinician reviews your health profile and decides whether an oral or
            injectable option is the right fit - no in-person visit required.
          </p>

          {pillProviders.length > 0 && (
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              {pillProviders.map((p) => (
                <div key={p.id} className="flex flex-col rounded-xl border border-gray-200 bg-white p-5">
                  <div className="mb-4 flex h-[34px] w-[120px] items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.logo} alt={`${p.name} logo`} className="max-h-full max-w-full object-contain" loading="lazy" decoding="async" />
                  </div>
                  {p.highlights?.length > 0 && (
                    <ul className="mb-5 space-y-2">
                      {p.highlights.slice(0, 3).map((h, hi) => (
                        <li key={hi} className="flex items-start gap-2 text-[13px] leading-snug text-gray-600">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2.5} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2">
                    <ProviderCta
                      href={p.affiliateUrl}
                      providerName={p.name}
                      providerSlug={p.id}
                      pageType="listing"
                      sourceFlow="main_comparison"
                      className="inline-flex h-[42px] items-center justify-center gap-1.5 rounded-lg bg-[#0C4B75] px-5 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
                    >
                      Visit {p.name}
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </ProviderCta>
                    <Link href={`/weight-loss/reviews/${p.id}`} className="text-[13px] font-bold text-[#0C4B75] hover:underline">
                      Read our review
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/weight-loss"
              className="inline-flex h-[46px] items-center justify-center rounded-lg bg-[#0C4B75] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
            >
              Compare All Providers
            </Link>
            <Link
              href="/weight-loss/find-your-match"
              className="inline-flex h-[46px] items-center justify-center rounded-lg border border-gray-200 bg-white px-6 text-[14px] font-semibold text-[#191919] transition-colors hover:bg-gray-50"
            >
              Take the Quiz
            </Link>
          </div>
        </section>

        {/* OTC warning */}
        <section className="mb-12">
          <div className="flex items-start gap-4 rounded-xl border border-amber-200 bg-amber-50/60 p-6">
            <TriangleAlert className="mt-0.5 h-6 w-6 shrink-0 text-amber-500" strokeWidth={2} />
            <div>
              <h2 className="mb-2 text-[20px] font-bold text-[#191919]">A note on over-the-counter &ldquo;diet pills&rdquo;</h2>
              <p className="text-[15px] leading-[1.75] text-gray-600">
                Most non-prescription weight loss supplements - &ldquo;fat burners,&rdquo; appetite
                &ldquo;blockers,&rdquo; and herbal blends - have little to no rigorous evidence behind
                their weight loss claims, and they aren&rsquo;t regulated the way prescription
                medications are. If you&rsquo;re serious about results, a licensed clinician and an
                FDA-approved medication are the evidence-based path.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="mb-6 text-[24px] font-bold text-[#191919]">Weight Loss Pills: FAQs</h2>
          <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {faqs.map((f, i) => (
              <div key={i} className="p-6">
                <h3 className="mb-2 text-[16px] font-bold text-[#191919]">{f.question}</h3>
                <p className="text-[14px] leading-[1.7] text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <GuideCluster currentSlug="weight-loss-pills" />

        {/* Sources + disclaimer */}
        <section>
          <p className="mb-3 text-[13px] leading-relaxed text-gray-400">
            Sources: FDA approvals and prescribing information - the Wegovy pill (oral semaglutide 25 mg),
            approval announced December 22, 2025 (
            <a href="https://www.healio.com/news/endocrinology/20260213/fda-approves-wegovy-pill-the-first-oral-glp1-to-treat-obesity" target="_blank" rel="noopener" className="underline">Healio</a>
            ); Foundayo (orforglipron), approved April 1, 2026 (
            <a href="https://www.fda.gov/news-events/press-announcements/fda-approves-first-new-molecular-entity-under-national-priority-voucher-program" target="_blank" rel="noopener" className="underline">FDA</a>
            ). Trial data: OASIS 4 and ATTAIN-1 as published in the New England Journal of Medicine, September 2025, summarised by the{" "}
            <a href="https://www.acc.org/latest-in-cardiology/journal-scans/2025/09/24/16/40/oasis-4" target="_blank" rel="noopener" className="underline">American College of Cardiology</a>
            ; STEP and SURMOUNT for the injections; registration trials for Qsymia, Contrave and orlistat.
            Prices: Ro&rsquo;s published pricing, verified August 2026; Foundayo self-pay and savings-card
            prices as reported by{" "}
            <a href="https://www.scientificamerican.com/article/how-eli-lillys-new-glp-1-pill-stacks-up-against-wegovy-and-other-weight-loss/" target="_blank" rel="noopener" className="underline">Scientific American</a>
            {" "}from Lilly material and Lilly&rsquo;s April 9, 2026 availability release; NovoCare Wegovy pill
            tiers as reported by third-party trackers, not verified by us. Weight loss figures are trial
            averages; individual results vary. Trademarks belong to their respective manufacturers.
          </p>
          <p className="text-[13px] leading-relaxed text-gray-400">
            treatmentshub.com is not a medical provider and does not prescribe medications. This page is
            for educational and comparison purposes only and is not medical advice. Prescription weight
            loss medications require evaluation and supervision by a licensed healthcare provider.
            Always consult a qualified physician before starting any treatment.
          </p>
        </section>
      </div>
    </div>
  );
}
