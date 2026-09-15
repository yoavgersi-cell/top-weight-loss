import type { Metadata } from "next";
import Link from "next/link";
import { Shield, BookOpen, Search, BarChart3, BadgeDollarSign, FileCheck2, Stethoscope, RefreshCw } from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { ExpertTeam } from "@/components/expert-team";
import { PRICE_INDEX, PRICE_INDEX_VERIFIED, PRICE_CHANGELOG } from "@/lib/price-index";
import { NOINDEX_WL_REVIEW_SLUGS, NOINDEX_ARTICLE_SLUGS } from "@/lib/config";

export const revalidate = 60;

const CANONICAL = "https://www.treatmentshub.com/weight-loss/about";

export const metadata: Metadata = {
  title: "About Treatments Hub - Who We Are & How We Verify What We Publish",
  description:
    "Who runs Treatments Hub, how we verify every GLP-1 price against the provider's own site, how affiliate revenue is handled, and how our rankings and reviews are produced.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "About Treatments Hub - Who We Are & How We Verify What We Publish",
    description:
      "How we verify every GLP-1 price, how affiliate revenue is handled, and how our rankings and reviews are produced.",
    url: CANONICAL,
    type: "website",
  },
};

const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export default async function AboutPage() {
  const config = await getConfig("weight-loss");
  // Brand the team entries for the hub (the config seed still carries the
  // legacy team name), the same way the article/review templates do.
  const experts = (config.experts ?? []).map((e) => ({ ...e, name: e.name.replace(/TopWeightLoss/gi, "Treatments Hub") }));

  // Every figure on this page is computed from the live config, never typed in,
  // so the "what we cover" numbers can't drift from what the site actually has.
  const rankedProviders = config.ranking.providerOrder.length;
  const publishedReviews = (config.reviews ?? []).filter((r) => !NOINDEX_WL_REVIEW_SLUGS.has(r.slug)).length;
  const publishedGuides = (config.articles ?? []).filter((a) => !NOINDEX_ARTICLE_SLUGS.includes(a.slug)).length;
  const comparisons = (config.battles ?? []).length;
  const indexedProviders = PRICE_INDEX.length;

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Treatments Hub",
    url: CANONICAL,
    mainEntity: {
      "@type": "Organization",
      name: "Treatments Hub",
      url: "https://www.treatmentshub.com",
      logo: "https://www.treatmentshub.com/treatmentshub.png",
      description:
        "Independent comparisons of online treatment providers. Every GLP-1 price is verified against the provider's own published rate and logged on change.",
      areaServed: { "@type": "Country", name: "United States" },
      ...(experts.length > 0 && {
        employee: experts.map((e) => ({
          "@type": "Person",
          name: e.credentials ? `${e.name}, ${e.credentials}` : e.name,
          jobTitle: e.role,
          description: e.bio,
        })),
      }),
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      {/* Hero */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-12 sm:px-6 sm:py-16">
          <h1 className="text-[28px] font-extrabold text-[#191919] sm:text-[36px]">About Treatments Hub</h1>
          <p className="mt-3 max-w-[640px] text-[16px] leading-relaxed text-gray-500">
            We compare online treatment providers so you can choose one on facts: the price
            they actually publish, the condition attached to it, who prescribes, and what real
            customers report. Weight loss is where we started; hair loss, TRT, HRT and online
            therapy follow the same rules.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-4 py-10 sm:px-6">
        {/* What we cover - live numbers */}
        <section className="mb-12">
          <div className="grid gap-4 sm:grid-cols-4">
            {[
              { n: rankedProviders, label: "Weight-loss providers ranked" },
              { n: publishedReviews, label: "In-depth provider reviews" },
              { n: comparisons, label: "Head-to-head comparisons" },
              { n: publishedGuides, label: "Guides and articles" },
            ].map(({ n, label }) => (
              <div key={label} className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-[22px] font-extrabold text-[#191919] [font-variant-numeric:tabular-nums]">{n}</p>
                <p className="text-[12px] text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold text-[#191919]">Why this site exists</h2>
          <p className="mb-4 text-[16px] leading-[1.75] text-gray-600">
            Dozens of telehealth companies now sell GLP-1 weight-loss treatment online, and most
            comparison sites describe their prices with vague ranges, teaser rates, or numbers
            copied from each other. Choosing a provider on that basis is a coin flip.
          </p>
          <p className="text-[16px] leading-[1.75] text-gray-600">
            Treatments Hub publishes the number the provider itself publishes, with the condition
            that goes with it, and says plainly when a provider has no public review record. If we
            cannot verify something, it does not appear on the site.
          </p>
        </section>

        {/* What we do */}
        <section className="mb-12">
          <h2 className="mb-6 text-[22px] font-bold text-[#191919]">What we do</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Search, title: "Research providers", desc: "We walk each provider's enrollment flow, record its published prices and plan terms, and read its recent customer reviews." },
              { icon: BarChart3, title: "Compare side by side", desc: "Rankings, head-to-head comparisons and cost tables all render from one verified price registry, so every page agrees." },
              { icon: BookOpen, title: "Explain the medicine", desc: "Our guides cover how GLP-1s work, eligibility, side effects and costs, citing FDA information and the published trials." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#0C4B75]/5">
                  <Icon className="h-5 w-5 text-[#0C4B75]" strokeWidth={1.5} />
                </div>
                <h3 className="mb-1 text-[15px] font-bold text-[#191919]">{title}</h3>
                <p className="text-[13px] leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How we verify prices */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <BadgeDollarSign className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[22px] font-bold text-[#191919]">How we verify prices</h2>
          </div>
          <div className="space-y-4 text-[16px] leading-[1.75] text-gray-600">
            <p>
              <strong className="text-[#191919]">One registry.</strong> Every price on this site comes
              from a single verified index covering {indexedProviders} providers. Each entry records
              the headline rate, the regular rate behind any promotion, the condition (plan length,
              prepaid term, first-month rate) and the shipping terms. When the index changes, every
              review, comparison and cost table re-renders from it.
            </p>
            <p>
              <strong className="text-[#191919]">Checked against the source.</strong> A figure enters
              the index only after it has been read on the provider&rsquo;s own site or landing page.
              We do not estimate, average, or carry numbers over from other comparison sites.
            </p>
            <p>
              <strong className="text-[#191919]">Dated and logged.</strong> The index was last
              verified on {longDate(PRICE_INDEX_VERIFIED)}. Every change to a listing is recorded in a
              public change log with the date, what we listed before and what we list now -{" "}
              {PRICE_CHANGELOG.length} entries so far this month. See the{" "}
              <Link href="/weight-loss/glp1-weight-loss-statistics" className="font-semibold text-[#0C4B75] hover:underline">
                GLP-1 price index and change log
              </Link>.
            </p>
            <p>
              <strong className="text-[#191919]">No invented ratings.</strong> Trustpilot scores are
              quoted with their review counts as published. Where a provider has no public aggregate,
              our pages say so instead of guessing.
            </p>
          </div>
        </section>

        {/* How we make money */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <FileCheck2 className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[22px] font-bold text-[#191919]">How we make money</h2>
          </div>
          <div className="space-y-4 text-[16px] leading-[1.75] text-gray-600">
            <p>
              Some providers pay us a commission when you click through from our site and sign up.
              That is how the site is funded. Partnership status can affect which providers we cover
              in depth; it does not set scores, rankings or comparison winners, and our verdicts
              regularly favor the cheaper or better-documented provider in a matchup.
            </p>
            <p>
              Every page that contains affiliate links carries a disclosure above the first link. The
              full policy is in our{" "}
              <Link href="/weight-loss/disclaimer" className="font-semibold text-[#0C4B75] hover:underline">
                disclaimer
              </Link>, and the scoring rubric is on{" "}
              <Link href="/weight-loss/how-we-rank" className="font-semibold text-[#0C4B75] hover:underline">
                how we rank
              </Link>.
            </p>
          </div>
        </section>

        {/* Medical accuracy */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[22px] font-bold text-[#191919]">Medical accuracy</h2>
          </div>
          <div className="space-y-4 text-[16px] leading-[1.75] text-gray-600">
            <p>
              Clinical statements - dosing, side effects, contraindications, trial results - cite
              primary sources: FDA prescribing information and the published STEP, SURMOUNT and SCALE
              trials. Those citations appear at the bottom of every medical page.
            </p>
            <p>
              A reviewer credit appears on a page only when the named reviewer has actually read it.
              We do not put clinician names on content they have not reviewed.
            </p>
          </div>
        </section>

        {/* Editorial team */}
        <ExpertTeam experts={experts} />

        {/* Keeping it current */}
        <section className="mb-12">
          <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-6">
            <RefreshCw className="mt-0.5 h-6 w-6 shrink-0 text-[#0C4B75]" strokeWidth={2} />
            <div>
              <h2 className="mb-2 text-[22px] font-bold text-[#191919]">Keeping it current</h2>
              <p className="text-[15px] leading-[1.75] text-gray-600">
                Provider pricing moves often. When a provider changes its published rates, the
                registry is updated once, the affected pages re-render, the change is logged, and the
                page&rsquo;s &ldquo;last updated&rdquo; date and schema date move with it. Each review
                and comparison shows when it was last updated.
              </p>
            </div>
          </div>
        </section>

        {/* Medical disclaimer */}
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 className="text-[22px] font-bold text-[#191919]">Medical disclaimer</h2>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-[15px] leading-[1.75] text-gray-600">
              Treatments Hub is not a medical provider and does not prescribe medication. The
              information on this site is for education and comparison only and does not replace
              professional medical advice. GLP-1 medications are prescription drugs that require
              evaluation and supervision by a licensed clinician. Always consult a qualified
              physician before starting any treatment. Individual results vary; side effects may occur.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="mb-3 text-[22px] font-bold text-[#191919]">Corrections</h2>
          <p className="text-[16px] leading-[1.75] text-gray-600">
            If a price or claim on this site does not match what a provider currently publishes,
            tell us and we will verify and correct it. Corrections are logged like any other change.
          </p>
        </section>

        {/* CTA */}
        <section className="text-center">
          <p className="mb-4 text-[16px] font-bold text-[#191919]">Ready to compare providers?</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/weight-loss"
              className="inline-flex h-[44px] items-center justify-center rounded-lg bg-[#0C4B75] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
            >
              Compare Providers
            </Link>
            <Link
              href="/weight-loss/find-your-match"
              className="inline-flex h-[44px] items-center justify-center rounded-lg border border-gray-200 bg-white px-6 text-[14px] font-semibold text-[#191919] transition-colors hover:bg-gray-50"
            >
              Take the Quiz
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
