import { HeroSection } from "@/components/hero-section";
import { RichComparisonCard } from "@/components/rich-comparison-card";
import { SocialProofBand } from "@/components/social-proof-bubble";
import { Sidebar } from "@/components/sidebar";
import { FaqAccordion } from "@/components/faq-accordion";
import type { SiteConfig } from "@/lib/config";

interface ComparisonLayoutProps {
  config: SiteConfig;
  heroOverrides?: {
    h1?: string;
    h2?: string;
    description?: string;
    updatedLabel?: string;
  };
  // Prefix for internal links (e.g. "/hair-loss" on the hub). Empty on the
  // legacy root site so those links are unchanged.
  linkPrefix?: string;
  // Optional E-E-A-T byline strip rendered directly under the hero.
  byline?: React.ReactNode;
  children?: React.ReactNode;
  /** Card intro text: the full review intro (ranking page) or the one-line summary (keyword landings). */
  cardIntroMode?: "full" | "short";
  /** Page-specific verified price line under each card's starting price (keyword landings). */
  priceNotes?: Record<string, string>;
  /** Render only these providers, renumbered 1..N (a molecule landing lists the providers that publish it). */
  onlyProviderIds?: string[];
}

export function ComparisonLayout({ config, heroOverrides, linkPrefix = "", byline, children, cardIntroMode = "full", priceNotes, onlyProviderIds }: ComparisonLayoutProps) {
  const { providerOrder, positions } = config.ranking;

  const shown = onlyProviderIds ? providerOrder.filter((id) => onlyProviderIds.includes(id)) : providerOrder;
  const displayList = shown
    .map((id, displayIdx) => {
      const index = providerOrder.indexOf(id);
      const provider = config.providers.find((p) => p.id === id);
      if (!provider) return null;
      const position = positions[index] || positions[positions.length - 1];
      return {
        id: provider.id,
        name: provider.name,
        tagline: provider.tagline,
        logo: provider.logo,
        smallLogo: provider.smallLogo,
        highlights: provider.highlights,
        affiliateUrl: provider.affiliateUrl,
        ctaText: provider.ctaText,
        rank: displayIdx + 1,
        rating: position.score,
        ratingLabel: position.label,
        starRating: position.starRating,
        badge: position.badge,
        trustpilotRating: provider.trustpilotRating,
        trustpilotReviewCount: provider.trustpilotReviewCount,
        priceNote: priceNotes?.[provider.id],
      };
    })
    .filter(Boolean) as Array<{
      id: string;
      name: string;
      tagline: string;
      logo: string;
      smallLogo: string;
      highlights: string[];
      affiliateUrl: string;
      ctaText: string;
      rank: number;
      rating: number;
      ratingLabel: string;
      badge?: string;
      trustpilotRating?: string;
      trustpilotReviewCount?: string;
      priceNote?: string;
    }>;

  const sidebarProviders = shown
    .map((id) => config.providers.find((p) => p.id === id))
    .filter(Boolean) as typeof config.providers;

  return (
    <>
      <HeroSection
        backgroundImageUrl={config.hero.backgroundImageUrl}
        imageAlt={config.hero.imageAlt}
        updatedLabel={heroOverrides?.updatedLabel ?? config.hero.updatedLabel}
        h1={heroOverrides?.h1 ?? config.hero.h1}
        h2={heroOverrides?.h2 ?? config.hero.h2}
        description={heroOverrides?.description ?? config.hero.description}
      />

      {byline && (
        <section className="mx-auto max-w-[1200px] px-4 pt-3 sm:pt-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">{byline}</div>
        </section>
      )}

      <section className="mx-auto max-w-[1200px] px-4 pt-4 pb-6 sm:pt-6">
        <div className="flex gap-6 items-start">
          <div className="min-w-0 flex-1 space-y-4">
            {displayList.map((product, idx) => (
              <div key={product.id}>
                <RichComparisonCard
                  product={product}
                  review={(config.reviews ?? []).find((r) => r.providerId === product.id)}
                  linkPrefix={linkPrefix}
                  introMode={cardIntroMode}
                />
                {idx === 0 && config.cardSocialProof && (
                  <SocialProofBand number={config.cardSocialProof.number} text={config.cardSocialProof.text} />
                )}
              </div>
            ))}
          </div>
          <Sidebar config={config.sidebar} providers={sidebarProviders} linkPrefix={linkPrefix} />
        </div>
      </section>

      {children}

      <FaqAccordion items={config.faqs} />
    </>
  );
}
