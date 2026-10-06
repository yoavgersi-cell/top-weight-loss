import { REVIEWERS, REVIEW_LOG, reviewerDisplayName, reviewerPath, reviewerPersonSchema } from "@/data/reviewers";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Search,
  BadgeDollarSign,
  Stethoscope,
  RefreshCw,
  MessageSquareQuote,
  ListOrdered,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { PRICE_INDEX, PRICE_INDEX_VERIFIED, PRICE_CHANGELOG } from "@/lib/price-index";
import { NOINDEX_WL_REVIEW_SLUGS, NOINDEX_ARTICLE_SLUGS } from "@/lib/config";
import { REDDIT_COMMUNITY_FEEDBACK } from "@/components/reddit-community";

export const revalidate = 60;

const CANONICAL = "https://www.treatmentshub.com/weight-loss/about";

export const metadata: Metadata = {
  title: "About Treatments Hub - Who We Are & How We Verify What We Publish",
  description:
    "Who runs Treatments Hub, how we verify every GLP-1 price against the provider's own site, who checks the medical statements, how affiliate revenue is handled, and how rankings are produced.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "About Treatments Hub - Who We Are & How We Verify What We Publish",
    description:
      "How we verify every GLP-1 price, who reviews the medical statements, how affiliate revenue is handled, and how our rankings and reviews are produced.",
    url: CANONICAL,
    type: "website",
  },
};

function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

// Operator-supplied crops of provider pricing pages, captured on the date
// below and used as evidence on the tirzepatide guide. Shown here as "what
// verification looks like"; captions state only what each crop shows.
const CAPTURES_DATE = "2026-10-05";
const CAPTURES = [
  { provider: "embody", image: "/verification/tirzepatide-embody.webp", width: 900, height: 368, shows: "$69/mo semaglutide and $119/mo tirzepatide, flat pricing" },
  { provider: "altRx", image: "/verification/tirzepatide-altrx.webp", width: 900, height: 638, shows: "tirzepatide from $149 and semaglutide from $89" },
  { provider: "wellmedr", image: "/verification/tirzepatide-wellmedr.webp", width: 900, height: 325, shows: "tirzepatide from $89 and semaglutide from $49 a month" },
];

const VERTICAL_LINKS = [
  { name: "Weight loss", href: "/weight-loss", note: "GLP-1 providers, prices and reviews" },
  { name: "Hair loss", href: "/hair-loss", note: "Finasteride, minoxidil and custom formulas" },
  { name: "TRT", href: "/trt", note: "Testosterone therapy clinics online" },
  { name: "HRT", href: "/hrt", note: "Hormone therapy for women" },
  { name: "Online therapy", href: "/online-therapy", note: "Licensed therapists, compared" },
];

export default async function AboutPage() {
  const config = await getConfig("weight-loss");
  const reviewer = REVIEWERS[0];

  // Every figure on this page is computed from the live config, never typed in,
  // so the "what we cover" numbers can't drift from what the site actually has.
  const rankedProviders = config.ranking.providerOrder.length;
  const publishedReviews = (config.reviews ?? []).filter((r) => !NOINDEX_WL_REVIEW_SLUGS.has(r.slug)).length;
  const publishedGuides = (config.articles ?? []).filter((a) => !NOINDEX_ARTICLE_SLUGS.includes(a.slug)).length;
  const comparisons = (config.battles ?? []).length;
  const indexedProviders = PRICE_INDEX.length;
  const trustpilotCaptured = config.providers.reduce((n, p) => n + (p.trustpilotReviews?.length ?? 0), 0);
  const redditCaptured = Object.values(REDDIT_COMMUNITY_FEEDBACK).reduce((n, p) => n + p.threads.length, 0);
  const pagesReviewed = Object.keys(REVIEW_LOG).length;

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
        "Independent comparisons of online treatment providers. Every GLP-1 price is verified against the provider's own published rate and logged on change; medical statements are checked by a named reviewer.",
      areaServed: { "@type": "Country", name: "United States" },
      email: "contact@treatmentshub.com",
      contactPoint: { "@type": "ContactPoint", email: "contact@treatmentshub.com", contactType: "customer support", availableLanguage: "English" },
      sameAs: ["https://www.linkedin.com/company/treatments-hub"],
      knowsAbout: ["GLP-1 weight-loss treatment", "Telehealth providers", "Compounded semaglutide", "Compounded tirzepatide", "Hair loss treatment", "Testosterone replacement therapy", "Hormone replacement therapy", "Online therapy"],
      employee: REVIEWERS.map(reviewerPersonSchema),
    },
  };

  const stats = [
    { n: rankedProviders, label: "providers ranked" },
    { n: publishedReviews, label: "in-depth reviews" },
    { n: comparisons, label: "head-to-head comparisons" },
    { n: publishedGuides, label: "guides and articles" },
    { n: trustpilotCaptured, label: "Trustpilot reviews captured verbatim" },
    { n: redditCaptured, label: "Reddit posts captured verbatim" },
  ];

  const steps = [
    {
      icon: Search,
      title: "Read the price on the provider's own page",
      desc: `We walk each provider's enrollment flow and record the number it publishes, the regular rate behind any promotion, and the condition attached - plan length, prepaid term, first-month rate. ${indexedProviders} providers sit in one verified index; every review, comparison and cost table renders from it.`,
    },
    {
      icon: MessageSquareQuote,
      title: "Capture what customers say, word for word",
      desc: "Trustpilot reviews and Reddit posts are quoted verbatim with their dates, names shortened, negative reviews included. Where a provider has no public rating, the page says so. We never write, paraphrase or invent a review.",
    },
    {
      icon: ListOrdered,
      title: "Score every provider with the same rubric",
      desc: "Rankings follow a published scoring method, applied the same way to every provider. Compensation can affect which providers we feature and where listings sit; it does not change a score, a price or a quoted review.",
    },
    {
      icon: Stethoscope,
      title: "Have a named reviewer check the medicine",
      desc: `Clinical statements - how a medication works, trial figures, side effects, regulatory status - are checked by our medical reviewer, who is named on every page she has read, with the review date. ${pagesReviewed} pages are in the review log today.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      {/* ───── Hero ───── */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-[#E8F3FB] via-[#F3F9FD] to-white">
        <div className="mx-auto max-w-[1000px] px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16">
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#0C4B75]">About Treatments Hub</p>
          <h1 className="mt-3 max-w-[820px] text-[30px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#111] sm:text-[44px]">
            Provider comparisons built on numbers you can check yourself
          </h1>
          <p className="mt-4 max-w-[700px] text-[16px] leading-relaxed text-gray-700 sm:text-[18px]">
            We compare online treatment providers on the price they actually publish, the condition attached to it,
            who prescribes, and what real customers report - and we show our evidence. Weight loss is where we started;
            hair loss, TRT, HRT and online therapy follow the same rules.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2.5 text-[13px] font-semibold text-[#191919]">
            {[
              `Prices verified on each provider's own site - last check ${longDate(PRICE_INDEX_VERIFIED)}`,
              `${trustpilotCaptured} customer reviews quoted verbatim, dated`,
              `Medical statements reviewed by ${reviewerDisplayName(reviewer)}`,
            ].map((t) => (
              <li key={t} className="inline-flex items-center gap-2 rounded-full border border-[#0C4B75]/15 bg-white px-3.5 py-1.5 shadow-[0_1px_2px_rgba(16,42,67,0.05)]">
                <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" strokeWidth={3} />
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/weight-loss"
              className="inline-flex h-[46px] items-center justify-center gap-1.5 rounded-xl bg-[#0C4B75] px-6 text-[14.5px] font-bold text-white transition-colors hover:bg-[#093d61]"
            >
              Compare weight-loss providers
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
            <Link
              href="/weight-loss/how-we-rank"
              className="inline-flex h-[46px] items-center justify-center rounded-xl border border-gray-200 bg-white px-6 text-[14.5px] font-semibold text-[#191919] transition-colors hover:bg-gray-50"
            >
              Read the scoring method
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1000px] px-4 py-10 sm:px-6 sm:py-12">
        {/* ───── Live numbers ───── */}
        <section className="mb-14">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map(({ n, label }) => (
              <div key={label} className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-[26px] font-extrabold leading-none text-[#191919] [font-variant-numeric:tabular-nums]">{n}</p>
                <p className="mt-1.5 text-[12.5px] leading-snug text-gray-500">{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[12.5px] text-gray-400">
            Counts are computed from the live site at render time, so they cannot drift from what is actually published.
          </p>
        </section>

        {/* ───── Why ───── */}
        <section className="mb-14 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <h2 className="text-[26px] font-extrabold leading-tight tracking-[-0.01em] text-[#191919] sm:text-[30px]">
            Why this site exists
          </h2>
          <div className="space-y-4 text-[16px] leading-[1.75] text-gray-600">
            <p>
              Dozens of telehealth companies now sell GLP-1 weight-loss treatment online, and most comparison sites
              describe their prices with vague ranges, teaser rates, or numbers copied from one another. Choosing a
              provider on that basis is a coin flip, with your health and several hundred dollars a month on the table.
            </p>
            <p>
              Treatments Hub publishes the number the provider itself publishes, with the condition that goes with it,
              quotes customers in their own words, and says plainly when something cannot be verified. If we cannot
              check it, it does not appear on the site.
            </p>
          </div>
        </section>

        {/* ───── Method ───── */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="text-[26px] font-extrabold leading-tight tracking-[-0.01em] text-[#191919] sm:text-[30px]">
              What happens before anything is published
            </h2>
            <p className="mt-2 max-w-[640px] text-[15px] text-gray-500">Four checks, in this order, on every provider page.</p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <li key={title} className="relative rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0C4B75]/[0.07]">
                    <Icon className="h-5 w-5 text-[#0C4B75]" strokeWidth={1.75} />
                  </span>
                  <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-gray-400">Step {i + 1}</span>
                </div>
                <h3 className="mt-3.5 text-[17px] font-bold leading-snug text-[#191919]">{title}</h3>
                <p className="mt-2 text-[14px] leading-[1.7] text-gray-600">{desc}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[14px] text-gray-600">
            The full rubric is on{" "}
            <Link href="/weight-loss/how-we-rank" className="font-semibold text-[#0C4B75] hover:underline">how we rank</Link>;
            the review policy is at{" "}
            <Link href="/medical-review-policy" className="font-semibold text-[#0C4B75] hover:underline">medical review policy</Link>.
          </p>
        </section>

        {/* ───── Evidence ───── */}
        <section className="mb-14 rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
          <div className="flex items-start gap-3">
            <BadgeDollarSign className="mt-0.5 h-6 w-6 shrink-0 text-[#0C4B75]" strokeWidth={2} />
            <div>
              <h2 className="text-[22px] font-bold leading-tight text-[#191919] sm:text-[24px]">What verification looks like</h2>
              <p className="mt-1.5 max-w-[680px] text-[14.5px] leading-relaxed text-gray-600">
                When we say a price is verified, this is what we mean: a dated capture of the provider&rsquo;s own pricing
                page. These three were taken on {longDate(CAPTURES_DATE)} and sit under the price table on our{" "}
                <Link href="/weight-loss/articles/best-tirzepatide-online" className="font-semibold text-[#0C4B75] hover:underline">
                  tirzepatide guide
                </Link>. Every change to a listed price is recorded in a public{" "}
                <Link href="/weight-loss/glp1-weight-loss-statistics" className="font-semibold text-[#0C4B75] hover:underline">
                  change log
                </Link>{" "}
                with the date, the old figure and the new one - {PRICE_CHANGELOG.length} entries so far.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {CAPTURES.map((c) => (
              <figure key={c.provider} className="overflow-hidden rounded-xl border border-gray-200 bg-[#F7F8FA]">
                <a href={c.image} target="_blank" rel="noopener noreferrer" className="flex h-[150px] items-center justify-center bg-white p-2" title="Open the full-size capture">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.image}
                    alt={`${c.provider} pricing page, captured ${longDate(CAPTURES_DATE)}: ${c.shows}`}
                    width={c.width}
                    height={c.height}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain"
                  />
                </a>
                <figcaption className="border-t border-gray-200 px-3.5 py-3">
                  <p className="text-[13px] font-bold text-[#191919]">{c.provider}</p>
                  <p className="mt-0.5 text-[12px] leading-snug text-gray-500">Showed {c.shows}.</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ───── Medical reviewer ───── */}
        <section className="mb-14">
          <h2 className="text-[26px] font-extrabold leading-tight tracking-[-0.01em] text-[#191919] sm:text-[30px]">
            Who checks the medicine
          </h2>
          <p className="mt-2 max-w-[640px] text-[15px] text-gray-500">
            A reviewer credit appears on a page only when the named reviewer has actually read it. We do not put
            clinician names on content they have not reviewed.
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:gap-7 sm:p-7">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={reviewer.image.webp}
                alt={`${reviewer.name}, ${reviewer.jobTitle}`}
                width={128}
                height={128}
                className="h-[96px] w-[96px] shrink-0 rounded-2xl object-cover sm:h-[128px] sm:w-[128px]"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#0C4B75]">{reviewer.jobTitle}</p>
                <p className="mt-1 text-[22px] font-extrabold leading-tight text-[#191919]">{reviewerDisplayName(reviewer)}</p>
                <p className="mt-1 text-[14px] text-gray-500">{reviewer.headline}</p>
                <p className="mt-3 text-[15px] leading-[1.7] text-gray-600">{reviewer.shortBio}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-gray-600">
                  <strong className="text-[#191919]">What she reviews:</strong> {reviewer.scope}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px] font-semibold">
                  <Link href={reviewerPath(reviewer)} className="inline-flex items-center gap-1 text-[#0C4B75] hover:underline">
                    Full profile <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </Link>
                  <Link href="/medical-review-policy" className="text-[#0C4B75] hover:underline">How we review</Link>
                  {reviewer.linkedin && (
                    <a href={reviewer.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#0C4B75] hover:underline">
                      <LinkedInMark className="h-4 w-4" /> LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-100 bg-[#F7F8FA] px-5 py-3 text-[13px] text-gray-600 sm:px-7">
              {pagesReviewed} pages carry her name and a review date. Clinical statements she flags are corrected before the page is republished.
            </div>
          </div>
        </section>

        {/* ───── Who writes ───── */}
        <section className="mb-14 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <h2 className="text-[26px] font-extrabold leading-tight tracking-[-0.01em] text-[#191919] sm:text-[30px]">
            Who researches and writes
          </h2>
          <div className="space-y-4 text-[16px] leading-[1.75] text-gray-600">
            <p>
              Treatments Hub is researched and written by a small independent editorial team. Nobody on the research
              team is a clinician, which is why clinical statements go to the medical reviewer above rather than being
              published on the team&rsquo;s authority. Pages are credited to the research team unless a named person
              wrote them.
            </p>
            <p>
              We do not publish provider-written copy. If a provider disputes a figure, we re-check it against its own
              site and log the outcome.
            </p>
          </div>
        </section>

        {/* ───── Money ───── */}
        <section className="mb-14">
          <h2 className="text-[26px] font-extrabold leading-tight tracking-[-0.01em] text-[#191919] sm:text-[30px]">
            How we make money
          </h2>
          <p className="mt-3 max-w-[760px] text-[16px] leading-[1.75] text-gray-600">
            Some providers pay us a commission when you click through from our site and sign up. That is how the site is
            funded, and every page that contains those links says so above the first one. Not every provider in a
            market is included on this site.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
              <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-gray-400">Compensation can affect</p>
              <ul className="mt-3 space-y-2 text-[15px] text-gray-700">
                {["Which providers we cover in depth", "The order and placement of listings, cards and links"].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-amber-500" strokeWidth={2.5} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 sm:p-6">
              <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-emerald-700">It never affects</p>
              <ul className="mt-3 space-y-2 text-[15px] text-gray-800">
                {[
                  "The prices we publish - each one is the provider's own rate, verified on a stated date",
                  "The Trustpilot figures and reviews we quote, or the Reddit posts",
                  "Medical statements and their review",
                  "What our written reviews and comparisons say",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <X className="mt-1 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.75} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 text-[14px] text-gray-600">
            Full policy in our{" "}
            <Link href="/weight-loss/disclaimer" className="font-semibold text-[#0C4B75] hover:underline">disclaimer</Link>.
          </p>
        </section>

        {/* ───── Verticals ───── */}
        <section className="mb-14">
          <h2 className="text-[26px] font-extrabold leading-tight tracking-[-0.01em] text-[#191919] sm:text-[30px]">
            The same rules, across the site
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {VERTICAL_LINKS.map((v) => (
              <Link
                key={v.href}
                href={v.href}
                className="group rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-[0_5px_18px_rgba(16,42,67,0.10)]"
              >
                <p className="flex items-center justify-between text-[15px] font-bold text-[#191919] group-hover:text-[#0C4B75]">
                  {v.name}
                  <ArrowRight className="h-4 w-4 text-gray-300 transition-colors group-hover:text-[#0C4B75]" strokeWidth={2.5} />
                </p>
                <p className="mt-1 text-[12.5px] leading-snug text-gray-500">{v.note}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ───── Current, corrections, disclaimer ───── */}
        <section className="mb-14 grid gap-4 sm:grid-cols-3">
          {([
            {
              icon: RefreshCw,
              title: "Keeping it current",
              body: "When a provider changes its published rates, the index is updated once, every affected page re-renders, the change is logged, and the page's last-updated date moves with it.",
            },
            {
              icon: Shield,
              title: "Corrections",
              body: "If a price or claim here does not match what a provider currently publishes, email contact@treatmentshub.com. We verify against the provider's own site, correct the page, and log the change like any other.",
              link: { label: "contact@treatmentshub.com", href: "mailto:contact@treatmentshub.com" },
            },
            {
              icon: Stethoscope,
              title: "Not medical advice",
              body: "Treatments Hub is not a medical provider and does not prescribe. GLP-1 medications are prescription drugs that need evaluation by a licensed clinician. Individual results vary.",
            },
          ] as { icon: typeof RefreshCw; title: string; body: string; link?: { label: string; href: string } }[]).map(({ icon: Icon, title, body, link }) => (
            <div key={title} className="rounded-2xl border border-gray-200 bg-white p-5">
              <Icon className="h-5 w-5 text-[#0C4B75]" strokeWidth={2} />
              <h2 className="mt-3 text-[16px] font-bold text-[#191919]">{title}</h2>
              <p className="mt-1.5 text-[14px] leading-[1.7] text-gray-600">{body}</p>
              {link && (
                <a href={link.href} className="mt-2 inline-block text-[14px] font-semibold text-[#0C4B75] hover:underline">
                  {link.label}
                </a>
              )}
            </div>
          ))}
        </section>

        {/* ───── CTA ───── */}
        <section className="rounded-2xl bg-[#0C4B75] px-6 py-8 text-center text-white sm:px-10 sm:py-10">
          <p className="text-[22px] font-extrabold leading-tight sm:text-[26px]">See the comparisons the method produces</p>
          <p className="mx-auto mt-2 max-w-[520px] text-[14.5px] text-white/80">
            {rankedProviders} weight-loss providers ranked on verified prices and {trustpilotCaptured} captured reviews.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/weight-loss"
              className="inline-flex h-[46px] items-center justify-center rounded-xl bg-white px-6 text-[14.5px] font-bold text-[#0C4B75] transition-colors hover:bg-gray-100"
            >
              Compare providers
            </Link>
            <Link
              href="/weight-loss/reviews"
              className="inline-flex h-[46px] items-center justify-center rounded-xl border border-white/30 px-6 text-[14.5px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Read the reviews
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
