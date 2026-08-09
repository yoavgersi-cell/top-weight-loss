import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { ComparisonCard } from "@/components/comparison-card";
import { SocialProofBand } from "@/components/social-proof-bubble";
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

  // Popular head-to-head comparisons — internal links from the homepage to the
  // battle pages (funnels authority + speeds crawl to the top-earning pages).
  const comparisons = (config.battles ?? [])
    .map((b) => {
      const bp1 = config.providers.find((p) => p.id === b.provider1Id);
      const bp2 = config.providers.find((p) => p.id === b.provider2Id);
      if (!bp1 || !bp2) return null;
      const winner = b.winnerId === bp1.id ? bp1 : b.winnerId === bp2.id ? bp2 : null;
      return { slug: b.slug, p1: bp1, p2: bp2, winner };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .slice(0, 9);

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

      {comparisons.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-4 pb-8">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-[22px] font-extrabold text-[#191919] sm:text-[26px]">
                Popular Comparisons
              </h2>
              <p className="mt-1 text-[14px] text-gray-500">
                See how the top weight loss providers stack up head-to-head.
              </p>
            </div>
            <Link
              href="/articles"
              className="hidden shrink-0 text-[13px] font-bold text-[#0C4B75] hover:underline sm:block"
            >
              View all comparisons →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {comparisons.map(({ slug, p1, p2, winner }) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-4 transition-all hover:border-[#0C4B75]/30 hover:shadow-sm"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-bold text-[#191919]">
                    {p1.name} <span className="font-medium text-gray-400">vs</span> {p2.name}
                  </p>
                  {winner && (
                    <p className="mt-0.5 text-[12px] text-gray-500">
                      Winner: <span className="font-semibold text-emerald-600">{winner.name}</span>
                    </p>
                  )}
                </div>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-[#0C4B75] transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      <EditorialContent />
      <FaqAccordion items={config.faqs} />
    </>
  );
}
