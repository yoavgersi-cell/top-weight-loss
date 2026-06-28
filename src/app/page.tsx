import { HeroSection } from "@/components/hero-section";
import { ComparisonCard } from "@/components/comparison-card";
import { Sidebar } from "@/components/sidebar";
import { EditorialContent } from "@/components/editorial-content";
import { FaqAccordion } from "@/components/faq-accordion";
import { getConfig } from "@/lib/config-store";

export const revalidate = 60;

export default async function HomePage() {
  const config = await getConfig();
  const { providerOrder, positions } = config.ranking;

  // Build display list by merging provider data with ranking position data
  const displayList = providerOrder
    .map((id, index) => {
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
        trustpilotReviews: provider.trustpilotReviews,
        rank: index + 1,
        rating: position.score,
        ratingLabel: position.label,
        badge: position.badge,
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
      trustpilotReviews?: string;
      rank: number;
      rating: number;
      ratingLabel: string;
      badge?: string;
    }>;

  // Build sidebar providers in ranking order
  const sidebarProviders = providerOrder
    .map((id) => config.providers.find((p) => p.id === id))
    .filter(Boolean) as typeof config.providers;

  // JSON-LD: FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // JSON-LD: WebPage + ItemList for comparison
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Top Weight Loss Providers 2026 — Compare Trusted Providers Side by Side",
    description:
      "Compare pricing, medications, medical support, and overall value across the top weight loss providers of 2026.",
    url: "https://www.topweightloss.io",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: displayList.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          description: product.tagline,
          url: `https://www.topweightloss.io/reviews/${product.id}`,
          review: {
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: product.rating,
              bestRating: 10,
              worstRating: 0,
            },
            author: { "@type": "Organization", name: "topweightloss.io" },
          },
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroSection
        backgroundImageUrl={config.hero.backgroundImageUrl}
        imageAlt={config.hero.imageAlt}
        updatedLabel={config.hero.updatedLabel}
        h1={config.hero.h1}
        h2={config.hero.h2}
        description={config.hero.description}
      />

      <section className="mx-auto max-w-[1200px] px-4 pt-6 pb-6">
        <div className="flex gap-6 items-start">
          <div className="min-w-0 flex-1 space-y-4">
            {displayList.map((product) => (
              <ComparisonCard key={product.id} product={product} />
            ))}
          </div>
          <Sidebar config={config.sidebar} providers={sidebarProviders} />
        </div>
      </section>

      <EditorialContent />
      <FaqAccordion items={config.faqs} />
    </>
  );
}
