import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { ComparisonCard } from "@/components/comparison-card";
import { SocialProofBand } from "@/components/social-proof-bubble";
import { Sidebar } from "@/components/sidebar";
import { EditorialContent } from "@/components/editorial-content";
import { FaqAccordion } from "@/components/faq-accordion";
import { ExpertByline } from "@/components/expert-byline";
import { getConfig } from "@/lib/config-store";
import { CONTENT_LAST_UPDATED } from "@/lib/config";

export const revalidate = 60;

// Homepage-specific metadata targeting the high-intent "best weight loss"
// commercial queries (best weight loss injections / programs / providers).
export const metadata: Metadata = {
  title: {
    absolute: "Best Weight Loss Injections & Programs 2026 — Compare Top Providers",
  },
  description:
    "Compare the best weight loss injections and programs of 2026. Top GLP-1 providers ranked by pricing, medications, medical support, and value — find your best fit.",
  alternates: { canonical: "https://www.topweightloss.io" },
  openGraph: {
    title: "Best Weight Loss Injections & Programs 2026 — Compare Top Providers",
    description:
      "Compare the best weight loss injections and programs of 2026 — top GLP-1 providers ranked by price, support, and value.",
    url: "https://www.topweightloss.io",
    type: "website",
  },
};

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
        rank: index + 1,
        rating: position.score,
        ratingLabel: position.label,
        starRating: position.starRating,
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

  // E-E-A-T authorship (health/YMYL ranking signal): a visible byline + author
  // and reviewer in the page schema. Grounded in the site's real editorial team
  // (no fabricated medical credentials).
  const author = config.experts?.[0];
  const reviewer = config.experts?.[1];

  // JSON-LD: WebPage + ItemList for comparison. Enriched with authorship,
  // publisher, freshness dates, and entity/about so the page carries clear
  // E-E-A-T and freshness signals for a YMYL topic.
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Best Weight Loss Injections & Programs 2026 — Compare Top Providers",
    description:
      "Compare pricing, medications, medical support, and overall value across the top weight loss providers of 2026.",
    url: "https://www.topweightloss.io",
    inLanguage: "en-US",
    datePublished: "2026-06-01",
    dateModified: CONTENT_LAST_UPDATED,
    isPartOf: {
      "@type": "WebSite",
      name: "topweightloss.io",
      url: "https://www.topweightloss.io",
    },
    about: {
      "@type": "Thing",
      name: "GLP-1 weight loss providers (semaglutide & tirzepatide)",
    },
    ...(author && {
      author: {
        "@type": "Organization",
        name: author.name,
        url: "https://www.topweightloss.io/about",
      },
    }),
    ...(reviewer && {
      reviewedBy: {
        "@type": "Organization",
        name: reviewer.name,
      },
    }),
    publisher: {
      "@type": "Organization",
      name: "topweightloss.io",
      url: "https://www.topweightloss.io",
      logo: {
        "@type": "ImageObject",
        url: "https://www.topweightloss.io/logo-mark.png",
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: displayList.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: `https://www.topweightloss.io/reviews/${product.id}`,
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

      {/* E-E-A-T byline strip — visible authorship/review + freshness for a YMYL topic */}
      {(author || reviewer) && (
        <section className="mx-auto max-w-[1200px] px-4 pt-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {author && <ExpertByline expert={author} label="Written by" />}
            {reviewer && <ExpertByline expert={reviewer} label="Reviewed by" />}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1200px] px-4 pt-6 pb-6">
        <div className="flex gap-6 items-start">
          <div className="min-w-0 flex-1 space-y-4">
            {displayList.map((product, idx) => (
              <div key={product.id}>
                <ComparisonCard product={product} socialProof={config.cardSocialProof} />
                {idx === 0 && config.cardSocialProof && (
                  <SocialProofBand number={config.cardSocialProof.number} text={config.cardSocialProof.text} />
                )}
              </div>
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
