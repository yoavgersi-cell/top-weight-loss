import { pageReviewSchema } from "@/data/reviewers";
import { DEFAULT_OG_IMAGE } from "@/lib/og";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import type { Metadata } from "next";
import Link from "next/link";
import { getConfig } from "@/lib/config-store";
import { VERTICALS, DEFAULT_ROBOTS } from "@/lib/config";
import { type SiteContext, canonicalUrl, hubLink, verticalNameInProse } from "@/lib/site-context";
import { RatingBadge } from "@/components/rating-badge";
import { THREE_WAY_COMPARISONS } from "@/lib/three-way";

function verticalName(id: string): string {
  return VERTICALS.find((v) => v.id === id)?.name ?? "Treatment";
}

export async function reviewsIndexMetadata(ctx: SiteContext): Promise<Metadata> {
  const url = canonicalUrl(ctx, "/reviews");
  const vName = verticalName(ctx.vertical);
  // Lead with the vertical's top provider names - generic "Provider Reviews"
  // titles earn no clicks, brand names do.
  const config = await getConfig(ctx.vertical);
  const topNames = config.ranking.providerOrder
    .slice(0, 2)
    .map((id) => config.providers.find((p) => p.id === id)?.name)
    .filter(Boolean) as string[];
  const indexTitleCandidates =
    topNames.length === 2
      ? [`${vName} Reviews 2026: ${topNames[0]}, ${topNames[1]} & More`, `${vName} Reviews 2026: ${topNames[0]} & More`, `${vName} Reviews 2026`]
      : [`${vName} Reviews 2026 - Every Provider Tested`, `${vName} Reviews 2026`];
  // Within 60 characters (Ahrefs "title too long"), Oct 25, 2026.
  const title = indexTitleCandidates.find((t) => t.length <= 60) ?? indexTitleCandidates[indexTitleCandidates.length - 1];
  // Weight-loss names the category searchers actually use (GLP-1); other
  // verticals keep the vertical name.
  const categoryLabel = ctx.vertical === "weight-loss" ? "GLP-1 weight loss" : ctx.vertical === "ed" ? "erectile dysfunction (ED)" : verticalNameInProse(vName);
  const description = `Independent 2026 reviews of ${config.reviews?.length ?? "the top"} online ${categoryLabel} providers${topNames.length ? ` - ${topNames.join(", ")} and more` : ""} - with verified ratings, pricing, pros and cons.`;
  return {
    title,
    description,
    robots: ctx.noindex ? { index: false, follow: false } : DEFAULT_ROBOTS,
    alternates: {
      canonical: url,
    },
    openGraph: { images: [DEFAULT_OG_IMAGE],
      title,
      description,
      url,
    },
  };
}

export async function ReviewsIndexView({ ctx }: { ctx: SiteContext }) {
  const config = await getConfig(ctx.vertical);
  const vName = verticalName(ctx.vertical);
  const { providerOrder, positions } = config.ranking;

  // Every review in the CMS is listed. Providers in the homepage ranking come
  // first (in ranking order, with their score); unranked providers follow.
  const items = (config.reviews ?? [])
    .map((review) => {
      const provider = config.providers.find((p) => p.id === review.providerId);
      if (!provider) return null;
      const rankIndex = providerOrder.indexOf(provider.id);
      const position = rankIndex >= 0 ? positions[rankIndex] || positions[positions.length - 1] : null;
      return {
        review,
        provider,
        rating: position?.score ?? null,
        ratingLabel: position?.label ?? null,
        rank: rankIndex >= 0 ? rankIndex : Number.MAX_SAFE_INTEGER,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => a.rank - b.rank);

  // Comparisons featuring the vertical's providers: every two-way battle in
  // config order, then (weight loss only) the curated three-way pages.
  const providerName = (id: string) => config.providers.find((p) => p.id === id)?.name;
  const comparisons: { slug: string; label: string; kind: string }[] = [
    ...(config.battles ?? [])
      .map((b) => {
        const a = providerName(b.provider1Id);
        const c = providerName(b.provider2Id);
        return a && c ? { slug: b.slug, label: `${a} vs ${c}`, kind: "Head-to-head" } : null;
      })
      .filter((x): x is NonNullable<typeof x> => x !== null),
    ...(ctx.vertical === "weight-loss"
      ? THREE_WAY_COMPARISONS.map((t) => ({ slug: t.slug, label: t.title, kind: "Three-way" }))
      : []),
  ];

  // JSON-LD: ItemList schema for reviews listing
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${vName} Provider Reviews`,
    description: `Expert reviews of top online ${verticalNameInProse(vName)} providers.`,
    numberOfItems: items.length,
    itemListElement: items.map(({ review, provider }, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${provider.name} Review`,
      url: canonicalUrl(ctx, `/reviews/${review.slug}`),
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl(ctx, "/") },
      { "@type": "ListItem", position: 2, name: "Reviews", item: canonicalUrl(ctx, "/reviews") },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": canonicalUrl(ctx, "/reviews"),
    url: canonicalUrl(ctx, "/reviews"),
    name: `${vName} Provider Reviews`,
    ...pageReviewSchema(`/${ctx.vertical}/reviews`),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-[#191919] sm:text-4xl">
            {vName} Provider Reviews
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600">
            In-depth reviews of the top online {verticalNameInProse(vName)} providers.
            Read our expert analysis of each to find the best fit for your goals,
            budget, and lifestyle.
          </p>
          <div className="mx-auto mt-5 max-w-[640px] text-left">
            <MedicalReviewBar path={`/${ctx.vertical}/reviews`} compact />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ review, provider, rating, ratingLabel }) => (
            <Link
              key={review.slug}
              href={hubLink(ctx, `/reviews/${review.slug}`)}
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-[50px] w-[130px] items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={provider.logo}
                  alt={`${provider.name} logo`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <h2 className="text-lg font-bold text-[#191919]">
                {provider.name}
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-gray-700">
                {review.shortSummary}
              </p>

              <div className="mt-4 flex items-center justify-between">
                {rating !== null && ratingLabel !== null ? (
                  <RatingBadge rating={rating} label={ratingLabel} />
                ) : (
                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-500">
                    Expert Review
                  </span>
                )}
                <span className="text-sm font-semibold text-[#0C4B75] group-hover:underline">
                  Read Review
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Every head-to-head (and, for weight loss, three-way) comparison in
            the vertical. The reviews index is the one hub page every reader
            reaches, so each comparison gets a stable inbound link from here
            rather than only from its two providers' review pages (Oct 25,
            2026 link audit: several battles had two inlinks in total). */}
        {comparisons.length > 0 && (
          <section className="mt-14" aria-labelledby="comparisons-heading">
            <h2 id="comparisons-heading" className="text-2xl font-bold text-[#191919]">
              {vName} provider comparisons
            </h2>
            <p className="mt-2 mb-6 max-w-2xl text-[15px] text-gray-600">
              Side-by-side verdicts on the providers above: pricing, what each prescribes, and which one we would pick for whom.
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {comparisons.map((c) => (
                <Link
                  key={c.slug}
                  href={hubLink(ctx, `/${c.slug}`)}
                  className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] font-semibold text-[#0C4B75] transition-colors hover:border-[#0C4B75]/30 hover:bg-[#0C4B75]/[0.02]"
                >
                  <span className="truncate">{c.label}</span>
                  <span className="shrink-0 text-[11px] font-medium text-gray-400">{c.kind}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
