import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, BarChart3, CalendarDays, Layers, MessageSquareQuote, ShieldCheck, ThumbsDown, ThumbsUp } from "lucide-react";
import { DEFAULT_OG_IMAGE } from "@/lib/og";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LastUpdated } from "@/components/last-updated";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { TrustDisclosure } from "@/components/medical-sources";
import { TrustpilotWordmark, tpStarColor } from "@/components/trustpilot-rating";
import { getConfig } from "@/lib/config-store";
import { medicalWebPageFields } from "@/lib/medical-schema";
import { getReviewRecord, formatReviewDate } from "@/data/reviews";
import { THEME_CATEGORY_LABELS, categoryBreakdown } from "@/data/reviews/themes";
import { analysisFor, analysisPath, freshExcerpts, reviewAnalysisRecords } from "@/lib/review-analysis";

export const revalidate = 3600;

// ───── Review analysis: /weight-loss/review-analysis/<providerId> ─────
// A reverse-Trustpilot page: the provider's stored reviews read as a data
// set. Star split, praise and complaint themes ranked by how many reviews
// mention them, the same by experience area, the month each review was
// written, and an excerpt per theme chosen so it does not repeat the review
// page. Every number is computed from the registry at render time; the
// prose that is not computed is the theme summary written from the same
// reviews. Nothing here is a rating of the provider by us.

const SITE = "https://www.treatmentshub.com";
const PUBLISHED = "2026-10-27";
const UPDATED = "2026-10-27";

const longDate = (t: number) => new Date(t).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
const shortDate = (t: number) => new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const pct = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0);

export async function generateStaticParams() {
  return reviewAnalysisRecords().map((r) => ({ battleSlug: "weight-loss", providerId: r.providerId }));
}

async function load(battleSlug: string, providerId: string) {
  if (battleSlug !== "weight-loss") return null;
  const record = getReviewRecord("weight-loss", providerId);
  if (!record || !reviewAnalysisRecords().some((r) => r.providerId === providerId)) return null;
  const config = await getConfig("weight-loss");
  const provider = config.providers.find((p) => p.id === providerId);
  if (!provider) return null;
  const reviewSlug = (config.reviews ?? []).find((r) => r.providerId === providerId)?.slug;
  return { record, provider, reviewHref: reviewSlug ? `/weight-loss/reviews/${reviewSlug}` : "/weight-loss/reviews", config };
}

export async function generateMetadata({ params }: { params: Promise<{ battleSlug: string; providerId: string }> }): Promise<Metadata> {
  const { battleSlug, providerId } = await params;
  const data = await load(battleSlug, providerId);
  if (!data) return {};
  const { record, provider } = data;
  const a = analysisFor(record);
  const canonical = `${SITE}${analysisPath(providerId)}`;
  const title = `What ${a.total} ${provider.name} Reviews Say: Trustpilot Analysis (2026)`;
  const top = a.praise[0]?.label.toLowerCase();
  const low = a.criticism[0]?.label.toLowerCase();
  let description = `${a.total} ${provider.name} Trustpilot reviews, transcribed and themed: ${a.stars.positive} rate it 4-5 stars; most praised, ${top}; most criticised, ${low}.`;
  if (description.length > 158) description = `${a.total} ${provider.name} Trustpilot reviews transcribed and themed: the star split, what reviewers praise most, what they criticise most, with excerpts.`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { images: [DEFAULT_OG_IMAGE], title, description, url: canonical, type: "article" },
  };
}

export default async function ReviewAnalysisPage({ params }: { params: Promise<{ battleSlug: string; providerId: string }> }) {
  const { battleSlug, providerId } = await params;
  const data = await load(battleSlug, providerId);
  if (!data) return notFound();
  const { record, provider, reviewHref, config } = data;
  const name = provider.name;
  const a = analysisFor(record);
  const path = analysisPath(providerId);
  const canonical = `${SITE}${path}`;
  const breakdown = categoryBreakdown(record, a.themes);
  const praiseExcerpts = freshExcerpts(record, a.themes, a.praise);
  const criticismExcerpts = freshExcerpts(record, a.themes, a.criticism);
  const topPraise = a.praise.slice(0, 3);
  const topCriticism = a.criticism.slice(0, 3);
  const agg = record.aggregate;
  const aggLine = agg ? `${agg.rating} out of 5 across ${agg.reviewCount} reviews${agg.verifiedOn ? `, as read on ${formatReviewDate(agg.verifiedOn)}` : ""}` : null;
  const captured = a.capturedThrough ? formatReviewDate(a.capturedThrough) : undefined;
  const others = reviewAnalysisRecords()
    .filter((r) => r.providerId !== providerId)
    .map((r) => ({ id: r.providerId, name: config.providers.find((p) => p.id === r.providerId)?.name ?? r.providerId, total: analysisFor(r).total }));
  const nameOfCategory = (c: keyof typeof THEME_CATEGORY_LABELS) => THEME_CATEGORY_LABELS[c];
  const busiest = [...a.months.rows].sort((x, y) => y.count - x.count)[0];

  // Providers that changed their trading name keep the old one in brackets so
  // readers who know the former name recognise the page (id and slug unchanged).
  const FORMER_NAMES: Record<string, string> = { wellmedr: "wellmedr" };
  const former = FORMER_NAMES[providerId];
  const title = `What ${a.total} ${name}${former ? ` (formerly ${former})` : ""} Customers Say: An Analysis of Their Trustpilot Reviews`;

  const FAQS = [
    {
      question: `What do ${name} customers praise most in their reviews?`,
      answer: `${topPraise.map((t) => `${t.label.toLowerCase()} (${t.count} of ${a.total} stored reviews)`).join("; ")}. ${topPraise[0]?.detail ?? ""}`.trim(),
    },
    {
      question: `What are the most common complaints about ${name}?`,
      answer: `${topCriticism.map((t) => `${t.label.toLowerCase()} (${t.count} of ${a.total})`).join("; ")}. ${topCriticism[0]?.detail ?? ""}`.trim(),
    },
    {
      question: `What share of ${name} reviews are positive?`,
      answer: `Of the ${a.total} reviews we transcribed from ${name}'s Trustpilot profile, ${a.stars.positive} (${pct(a.stars.positive, a.total)}%) rate it 4 or 5 stars and ${a.stars.low} (${pct(a.stars.low, a.total)}%) rate it 3 stars or lower.${aggLine ? ` The profile itself showed ${aggLine}.` : ""} Our stored set is the reviews visible in the operator's captures, not a random sample of the profile.`,
    },
    {
      question: `How were these ${name} reviews analysed?`,
      answer: `Each review was transcribed verbatim from the provider's public Trustpilot profile${captured ? `, most recently captured ${captured}` : ""}, with reviewer names shortened to first name and last initial. We read every review and tagged the themes it mentions; a count is the number of stored reviews tagged with that theme, and one review can count toward several. Nothing is sampled, weighted or estimated.`,
    },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    datePublished: PUBLISHED,
    dateModified: UPDATED,
    author: { "@type": "Organization", name: "Treatments Hub Team", url: SITE },
    publisher: { "@type": "Organization", name: "Treatments Hub", url: SITE },
    about: { "@type": "Organization", name, ...(record.profileUrl && { sameAs: [record.profileUrl] }) },
    mainEntityOfPage: medicalWebPageFields("weight-loss", canonical, path),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/weight-loss` },
      { "@type": "ListItem", position: 2, name: "Reviews", item: `${SITE}/weight-loss/reviews` },
      { "@type": "ListItem", position: 3, name: `${name} review`, item: `${SITE}${reviewHref}` },
      { "@type": "ListItem", position: 4, name: "Review analysis", item: canonical },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  const ext = "font-semibold text-[#0C4B75] hover:underline";
  const cell = "px-3 py-2.5 align-top text-[13.5px] [font-variant-numeric:tabular-nums]";
  const th = "px-3 py-2.5 text-left text-[11.5px] font-bold uppercase tracking-wide text-gray-500";

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[960px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/weight-loss" }, { label: "Reviews", href: "/weight-loss/reviews" }, { label: `${name} review`, href: reviewHref }, { label: "Review analysis" }]} />
          <h1 className="max-w-[860px] text-[27px] font-extrabold leading-[1.15] text-[#191919] sm:text-[36px]">{title}</h1>
          <p className="mt-3 max-w-[760px] text-[16px] leading-relaxed text-gray-500">
            We transcribed {a.total} reviews from {name}&rsquo;s{former ? ` (formerly ${former}&rsquo;s)` : ""} public Trustpilot profile
            {a.range && <> (dated {longDate(a.range.from)} to {longDate(a.range.to)})</>}
            {captured && <>, most recently captured {captured}</>}, read every one, and tagged what it praises and what it
            complains about. This page is the result as a data set: the star split, the themes ranked by how many reviews
            mention them, the experience areas they fall into, and excerpts chosen to show the reasoning behind the stars.
          </p>
          <LastUpdated date={UPDATED} className="mt-4" />
          <MedicalReviewBar path={path} className="mt-4 max-w-[760px]" />
          <TrustDisclosure disclaimerHref="/weight-loss/disclaimer" />
        </div>
      </div>

      <div className="mx-auto max-w-[960px] px-4 py-10 text-[16px] leading-[1.75] text-gray-800 sm:px-6">
        <div className="qa mb-10 flex items-start gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
          <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" strokeWidth={2} />
          <div className="text-[15px] leading-[1.75] text-gray-600">
            <h2 className="mb-2 text-[18px] font-bold text-[#191919]">The short answer</h2>
            <p className="mb-2">
              Of the {a.total} {name} reviews we hold, <strong className="text-[#191919]">{a.stars.positive} ({pct(a.stars.positive, a.total)}%) rate it 4 or 5 stars</strong> and {a.stars.low} ({pct(a.stars.low, a.total)}%) rate it 3 or lower.
              {topPraise.length > 0 && (
                <> The most praised thing is <strong className="text-[#191919]">{topPraise[0].label.toLowerCase()}</strong>, mentioned by {topPraise[0].count} reviews.</>
              )}
              {topCriticism.length > 0 && (
                <> The most common complaint is <strong className="text-[#191919]">{topCriticism[0].label.toLowerCase()}</strong>, in {topCriticism[0].count}.</>
              )}
              {aggLine && <> The profile itself showed {aggLine}.</>}
            </p>
            <p>{a.themes.summary}</p>
          </div>
        </div>

        {/* Star split */}
        <section className="mb-12" aria-labelledby="stars-heading">
          <div className="mb-2 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 id="stars-heading" className="text-[22px] font-bold text-[#191919]">How the {a.total} stored reviews split by star rating</h2>
          </div>
          <p className="mb-4 text-[15px] text-gray-500">
            The stars each reviewer gave, as displayed on the profile. The stored set is what was visible in the captures on the dates listed in the methodology, not a random sample, so read the shares as a description of this set.
          </p>
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <ul className="space-y-2.5">
              {a.stars.rows.map((row) => (
                <li key={row.stars} className="flex items-center gap-3 text-[14px]">
                  <span className="inline-flex w-14 shrink-0 items-center justify-center rounded px-1.5 py-0.5 text-[12px] font-bold text-white" style={{ backgroundColor: tpStarColor(row.stars) }}>
                    {row.stars}★
                  </span>
                  <span className="relative h-5 flex-1 overflow-hidden rounded bg-gray-100">
                    <span className="absolute inset-y-0 left-0 rounded" style={{ width: `${row.pct}%`, backgroundColor: tpStarColor(row.stars) }} />
                  </span>
                  <span className="w-28 shrink-0 text-right text-gray-700 [font-variant-numeric:tabular-nums]">
                    <strong className="text-[#191919]">{row.count}</strong> ({row.pct}%)
                  </span>
                </li>
              ))}
            </ul>
            {aggLine && (
              <p className="mt-4 flex flex-wrap items-center gap-x-2 text-[13px] text-gray-500">
                <TrustpilotWordmark /> profile: {aggLine}
                {record.profileUrl && (
                  <a href={record.profileUrl} target="_blank" rel="nofollow noopener noreferrer" className={`${ext} inline-flex items-center gap-0.5`}>
                    view profile <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </p>
            )}
          </div>
        </section>

        {/* Praise themes */}
        <section className="mb-12" aria-labelledby="praise-heading">
          <div className="mb-2 flex items-center gap-2">
            <ThumbsUp className="h-6 w-6 text-emerald-600" strokeWidth={2} />
            <h2 id="praise-heading" className="text-[22px] font-bold text-[#191919]">What {name} reviewers praise, ranked</h2>
          </div>
          <p className="mb-4 text-[15px] text-gray-500">
            Each theme with the number of stored reviews that mention it. One review can count toward more than one theme, so the counts do not add up to {a.total}.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-[#F7F8FA]">
                  <th className={th}>#</th>
                  <th className={th}>Theme</th>
                  <th className={th}>Area</th>
                  <th className={th}>Reviews</th>
                  <th className={th}>Share of set</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {a.praise.map((t, i) => (
                  <tr key={t.label}>
                    <td className={`${cell} text-gray-400`}>{i + 1}</td>
                    <td className={cell}>
                      <span className="font-semibold text-[#191919]">{t.label}</span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-gray-500">{t.detail}</span>
                    </td>
                    <td className={`${cell} text-gray-600`}>{nameOfCategory(t.category)}</td>
                    <td className={`${cell} font-bold text-emerald-700`}>{t.count}</td>
                    <td className={`${cell} text-gray-700`}>{pct(t.count, a.total)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {praiseExcerpts.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 flex items-center gap-2 text-[16px] font-bold text-[#191919]">
                <MessageSquareQuote className="h-5 w-5 text-emerald-600" /> In reviewers&rsquo; words
              </h3>
              <ul className="space-y-3">
                {praiseExcerpts.map(({ theme, review, excerpt }) => (
                  <li key={theme.label} className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4 text-[14.5px] leading-relaxed text-gray-700">
                    <span className="mb-1 block text-[11.5px] font-bold uppercase tracking-wide text-emerald-700">{theme.label}</span>
                    <span className="mr-2 inline-flex h-5 items-center rounded px-1.5 text-[11px] font-bold text-white" style={{ backgroundColor: tpStarColor(review.rating) }}>{review.rating}★</span>
                    &ldquo;{excerpt}&rdquo;
                    <span className="text-gray-400"> - {review.name}{review.date ? `, ${review.date}` : ""}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Criticism themes */}
        <section className="mb-12" aria-labelledby="criticism-heading">
          <div className="mb-2 flex items-center gap-2">
            <ThumbsDown className="h-6 w-6 text-amber-600" strokeWidth={2} />
            <h2 id="criticism-heading" className="text-[22px] font-bold text-[#191919]">What {name} reviewers criticise, ranked</h2>
          </div>
          <p className="mb-4 text-[15px] text-gray-500">
            The same count for the complaint themes. People with a problem review more often than people without one, on every provider&rsquo;s profile, so a complaint&rsquo;s count says what goes wrong when it does, not how often it does.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-[#F7F8FA]">
                  <th className={th}>#</th>
                  <th className={th}>Theme</th>
                  <th className={th}>Area</th>
                  <th className={th}>Reviews</th>
                  <th className={th}>Share of set</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {a.criticism.map((t, i) => (
                  <tr key={t.label}>
                    <td className={`${cell} text-gray-400`}>{i + 1}</td>
                    <td className={cell}>
                      <span className="font-semibold text-[#191919]">{t.label}</span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-gray-500">{t.detail}</span>
                    </td>
                    <td className={`${cell} text-gray-600`}>{nameOfCategory(t.category)}</td>
                    <td className={`${cell} font-bold text-amber-700`}>{t.count}</td>
                    <td className={`${cell} text-gray-700`}>{pct(t.count, a.total)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {criticismExcerpts.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 flex items-center gap-2 text-[16px] font-bold text-[#191919]">
                <MessageSquareQuote className="h-5 w-5 text-amber-600" /> In reviewers&rsquo; words
              </h3>
              <ul className="space-y-3">
                {criticismExcerpts.map(({ theme, review, excerpt }) => (
                  <li key={theme.label} className="rounded-xl border border-amber-100 bg-amber-50/30 p-4 text-[14.5px] leading-relaxed text-gray-700">
                    <span className="mb-1 block text-[11.5px] font-bold uppercase tracking-wide text-amber-700">{theme.label}</span>
                    <span className="mr-2 inline-flex h-5 items-center rounded px-1.5 text-[11px] font-bold text-white" style={{ backgroundColor: tpStarColor(review.rating) }}>{review.rating}★</span>
                    &ldquo;{excerpt}&rdquo;
                    <span className="text-gray-400"> - {review.name}{review.date ? `, ${review.date}` : ""}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* By experience area */}
        <section className="mb-12" aria-labelledby="areas-heading">
          <div className="mb-2 flex items-center gap-2">
            <Layers className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
            <h2 id="areas-heading" className="text-[22px] font-bold text-[#191919]">Praise and criticism by experience area</h2>
          </div>
          <p className="mb-4 text-[15px] text-gray-500">
            The themes grouped into six areas shared across every provider we analyse, counting distinct reviews. Net is praise minus criticism per 100 stored reviews; the same areas appear on our head-to-head comparison pages.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-[#F7F8FA]">
                  <th className={th}>Area</th>
                  <th className={th}>Reviews praising</th>
                  <th className={th}>Reviews criticising</th>
                  <th className={th}>Net per 100</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {breakdown.rows
                  .filter((r) => r.praise + r.criticism > 0)
                  .map((r) => {
                    const netv = Math.round(((r.praise - r.criticism) / breakdown.total) * 100);
                    return (
                      <tr key={r.category}>
                        <td className={`${cell} font-semibold text-[#191919]`}>{nameOfCategory(r.category)}</td>
                        <td className={`${cell} text-emerald-700`}>{r.praise}</td>
                        <td className={`${cell} text-amber-700`}>{r.criticism}</td>
                        <td className={`${cell} font-bold ${netv > 0 ? "text-emerald-700" : netv < 0 ? "text-amber-700" : "text-gray-500"}`}>{netv > 0 ? `+${netv}` : netv}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Timeline */}
        {a.months.rows.length > 1 && (
          <section className="mb-12" aria-labelledby="months-heading">
            <div className="mb-2 flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-[#0C4B75]" strokeWidth={2} />
              <h2 id="months-heading" className="text-[22px] font-bold text-[#191919]">When the stored reviews were written</h2>
            </div>
            <p className="mb-4 text-[15px] text-gray-500">
              Dated reviews by the month Trustpilot displayed. Captures favour the newest reviews on the profile, so a busy recent month{busiest ? ` (${busiest.label}: ${busiest.count} reviews)` : ""} reflects when we captured as much as when customers wrote.
              {a.months.undated > 0 && <> {a.months.undated} stored review{a.months.undated === 1 ? " carries" : "s carry"} no visible date and {a.months.undated === 1 ? "is" : "are"} left out here.</>}
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
              <table className="w-full min-w-[480px] border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-[#F7F8FA]">
                    <th className={th}>Month</th>
                    <th className={th}>Reviews</th>
                    <th className={th}>4-5★</th>
                    <th className={th}>1-3★</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {a.months.rows.map((m) => (
                    <tr key={m.key}>
                      <td className={`${cell} font-semibold text-[#191919]`}>{m.label}</td>
                      <td className={cell}>{m.count}</td>
                      <td className={`${cell} text-emerald-700`}>{m.positive}</td>
                      <td className={`${cell} text-amber-700`}>{m.low}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Methodology */}
        <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6" aria-labelledby="method-heading">
          <h2 id="method-heading" className="mb-3 text-[20px] font-bold text-[#191919]">Methodology and limits</h2>
          <ul className="list-disc space-y-2 pl-5 text-[15px] leading-[1.7] text-gray-600">
            <li><strong className="text-[#191919]">Source.</strong> {name}&rsquo;s public Trustpilot profile, transcribed verbatim from the operator&rsquo;s captures{record.batches.length > 1 ? ` in ${record.batches.length} batches` : ""}{captured ? `, the latest on ${captured}` : ""}. Low-star reviews are kept. Reviewer names are stored as first name and last initial, and each review carries the date the profile displayed{a.months.undated > 0 ? " where it was visible" : ""}.</li>
            <li><strong className="text-[#191919]">Themes.</strong> We read every review and tagged the themes it mentions, by reference to the stored review. A count is the number of stored reviews that resolve to a theme, so it can never exceed what we hold. The summary at the top was written from those themes and nothing else.</li>
            <li><strong className="text-[#191919]">Excerpts.</strong> The quotes above are stored reviews chosen for each theme that are not already quoted on the {name} review page, trimmed to their first sentences.</li>
            <li><strong className="text-[#191919]">Limits.</strong> This is the set we captured, not the whole profile{agg ? ` (the profile showed ${agg.reviewCount} reviews when last read)` : ""}, and it is weighted toward the newest reviews. Shares describe the set; they are not an estimate of the provider&rsquo;s customers. The profile&rsquo;s own aggregate is reported as displayed on the date read and is Trustpilot&rsquo;s figure, not ours.</li>
          </ul>
          <p className="mt-4 text-[15px] text-gray-600">
            The full set, with every review in full, is on the{" "}
            <Link href={reviewHref} className={ext}>{name} review</Link>. How we collect customer reviews is on{" "}
            <Link href="/weight-loss/how-we-rank#customer-reviews" className={ext}>how we rank</Link>; what reviewers across providers say about shipping is on{" "}
            <Link href="/weight-loss/glp1-shipping-times" className={ext}>shipping times by provider</Link> and about support on{" "}
            <Link href="/weight-loss/glp1-provider-support" className={ext}>provider support compared</Link>.
          </p>
        </section>

        {/* FAQ */}
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

        {others.length > 0 && (
          <section className="mt-10" aria-labelledby="more-analyses-heading">
            <h2 id="more-analyses-heading" className="mb-1 text-[20px] font-bold text-[#191919]">More review analyses</h2>
            <p className="mb-4 text-[14px] text-gray-500">The same analysis for every weight-loss provider with a large enough stored review set.</p>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {others.map((o) => (
                <li key={o.id}>
                  <Link href={analysisPath(o.id)} className="group flex h-full items-start justify-between gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 transition-colors hover:border-[#0C4B75]/40 hover:bg-[#F5F9FC]">
                    <span>
                      <span className="block text-[14px] font-bold text-[#191919] group-hover:text-[#0C4B75]">What {o.total} {o.name} reviews say</span>
                      <span className="mt-0.5 block text-[12.5px] leading-snug text-gray-500">Star split, ranked themes and excerpts from the stored set.</span>
                    </span>
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-gray-400 transition-colors group-hover:text-[#0C4B75]" strokeWidth={2.5} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
