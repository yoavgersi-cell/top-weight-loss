import { RichComparisonCard, type RichCardProduct } from "@/components/rich-comparison-card";
import type { SiteConfig } from "@/lib/config";

// Conversion block for editorial/article pages: the site's top-ranked providers
// rendered with the SAME card used on the comparison page (RichComparisonCard) -
// logo, score, trust pill, treatments, transparent pricing and a live CTA - so
// a guide that was otherwise all prose gets the real ranked cards + CTAs.
//
// Everything is pulled from the vertical's ranking config; nothing is invented,
// and the order (and therefore "top three") is exactly the ranking order the
// comparison page uses. Providers that don't resolve are skipped.
export function TopProvidersBlock({
  config,
  linkPrefix = "",
  limit = 3,
  title = "Our top-rated providers",
  subtitle,
  providerIds,
  order = "ranking",
}: {
  config: SiteConfig;
  linkPrefix?: string;
  limit?: number;
  title?: string;
  subtitle?: string;
  // Optional curated set (e.g. affiliate partners). When given, only these
  // providers render - still ordered by their real ranking and shown with their
  // real scores/badge, just renumbered 1..N within this block. Omit to show the
  // ranking's top `limit`.
  providerIds?: string[];
  // With a curated set: "ranking" (default) keeps the ranking's relative order;
  // "given" renders in the order the ids were passed (an editorial pick order).
  // Scores, badges and copy still come from each provider's real ranking slot.
  order?: "ranking" | "given";
}) {
  const { providerOrder, positions } = config.ranking;

  const ranked = providerOrder
    .map((id, index) => ({ id, index }))
    .filter(({ id }) => (providerIds ? providerIds.includes(id) : true));
  const ordered =
    providerIds && order === "given"
      ? providerIds.map((id) => ranked.find((r) => r.id === id)).filter((r): r is { id: string; index: number } => !!r)
      : ranked;

  const items = ordered
    .map(({ id, index }, displayIdx) => {
      const provider = config.providers.find((p) => p.id === id);
      if (!provider) return null;
      const position = positions[index] || positions[positions.length - 1];
      const product: RichCardProduct = {
        id: provider.id,
        name: provider.name,
        logo: provider.logo,
        tagline: provider.tagline,
        highlights: provider.highlights,
        affiliateUrl: provider.affiliateUrl,
        // Renumber within a curated set so the ordinals stay 1..N; the ranking
        // top-N path keeps the true rank (they're identical there anyway).
        rank: providerIds ? displayIdx + 1 : index + 1,
        rating: position.score,
        ratingLabel: position.label,
        starRating: position.starRating,
        badge: position.badge,
        trustpilotRating: provider.trustpilotRating,
        trustpilotReviewCount: provider.trustpilotReviewCount,
      };
      return { product, review: (config.reviews ?? []).find((r) => r.providerId === provider.id) };
    })
    .filter(Boolean)
    .slice(0, limit) as Array<{ product: RichCardProduct; review: SiteConfig["reviews"][number] | undefined }>;

  if (items.length === 0) return null;

  return (
    <section className="not-prose my-10">
      <div className="mb-5">
        <h2 className="text-[20px] font-bold text-[#191919] sm:text-[22px]">{title}</h2>
        {subtitle && (
          <p className="mt-1.5 text-[14px] leading-relaxed text-gray-500">{subtitle}</p>
        )}
      </div>
      <div className="space-y-4">
        {items.map(({ product, review }) => (
          <RichComparisonCard key={product.id} product={product} review={review} linkPrefix={linkPrefix} />
        ))}
      </div>
    </section>
  );
}

// ───── "Our top 2 picks" ─────
// Editorial two-card block for article and guide pages: embody first, altRx
// second (operator's pick order, Sep 2026), rendered with the same ranked
// cards as the comparison page. Weight-loss only - both ids live in that
// vertical's ranking; on any other config the block renders nothing.
export const TOP_TWO_PICK_IDS = ["embody", "altrx"] as const;

export function TopTwoPicks({ config, linkPrefix = "" }: { config: SiteConfig; linkPrefix?: string }) {
  return (
    <TopProvidersBlock
      config={config}
      linkPrefix={linkPrefix}
      limit={2}
      providerIds={[...TOP_TWO_PICK_IDS]}
      order="given"
      title="Our top 2 picks"
      subtitle="Our two recommended GLP-1 providers, shown with the same verified pricing and ratings as our full comparison."
    />
  );
}
