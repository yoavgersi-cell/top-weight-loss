import type { Metadata } from "next";
import { getConfig } from "@/lib/config-store";
import { CONTENT_LAST_UPDATED, DEFAULT_VERTICAL, isVertical, isPublishedVertical } from "@/lib/config";
import { ROOT_CONTEXT, hubContext, canonicalUrl, hubLink, WEIGHT_LOSS_MIGRATED } from "@/lib/site-context";
import Link from "next/link";
import { ComparisonLayout } from "@/components/comparison-layout";
import { EditorialContent } from "@/components/editorial-content";
import { HairLossEditorialContent } from "@/components/editorial-content-hair-loss";
import { TrtEditorialContent } from "@/components/editorial-content-trt";
import { HrtEditorialContent } from "@/components/editorial-content-hrt";
import { HearingAidsEditorialContent } from "@/components/editorial-content-hearing-aids";
import { OnlineTherapyEditorialContent } from "@/components/editorial-content-online-therapy";
import { BattlePageView, battleMetadata } from "@/components/pages/battle-page";
import { ProductCarousel } from "@/components/product-carousel";
import { notFound } from "next/navigation";

export const revalidate = 60;

const RESERVED_SLUGS = [
  "about",
  "admin",
  "api",
  "articles",
  "disclaimer",
  "find-your-match",
  "reviews",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ battleSlug: string }>;
}): Promise<Metadata> {
  const { battleSlug } = await params;
  if (RESERVED_SLUGS.includes(battleSlug)) return {};

  // Vertical home (treatmentshub.com/<vertical>). Weight-loss pointed its
  // canonical at the legacy site only until the migration flag flipped; now
  // that the legacy host 301s here, every vertical home is self-canonical
  // (a canonical aimed at a redirecting URL reads as a redirect error in GSC).
  if (isVertical(battleSlug)) {
    const vConfig = await getConfig(battleSlug);
    const isWL = battleSlug === DEFAULT_VERTICAL;
    const canonical =
      isWL && !WEIGHT_LOSS_MIGRATED
        ? "https://www.topweightloss.io"
        : `https://www.treatmentshub.com/${battleSlug}`;
    // Dedicated meta descriptions (<=160 chars) where the visible hero copy
    // runs long - the hero paragraph stays as designed, the snippet gets a
    // version Google won't truncate mid-claim. Fallback: hero.description.
    const VERTICAL_META_DESCRIPTION: Record<string, string> = {
      "weight-loss":
        "Compare 2026's best telehealth weight loss providers. Verified GLP-1 prices from $59/month semaglutide and $99/month tirzepatide - checked at the source.",
      hrt: "Compare the best online HRT and menopause providers of 2026 - care models, insurance friendliness and verified Trustpilot ratings, honestly reviewed.",
      "hearing-aids":
        "Compare over-the-counter hearing devices sold online - how the brands differ, what OTC can and can't do, and what to verify before buying.",
    };
    const metaDescription = VERTICAL_META_DESCRIPTION[battleSlug] ?? vConfig.hero.description;
    return {
      title: { absolute: vConfig.hero.h1 },
      description: metaDescription,
      robots: isPublishedVertical(battleSlug) ? undefined : { index: false, follow: false },
      alternates: { canonical },
      openGraph: { title: vConfig.hero.h1, description: metaDescription, url: canonical, type: "website" },
    };
  }

  return battleMetadata(battleSlug, ROOT_CONTEXT);
}

export default async function BattlePage({
  params,
}: {
  params: Promise<{ battleSlug: string }>;
}) {
  const { battleSlug } = await params;
  if (RESERVED_SLUGS.includes(battleSlug)) return notFound();

  // ───── VERTICAL HOME (treatmentshub.com/<vertical>) ─────
  // Reuses the comparison layout with the vertical's own separate config. A new
  // vertical with no providers simply renders an empty ranking until content is
  // added in the CMS.
  if (isVertical(battleSlug)) {
    const vConfig = await getConfig(battleSlug);
    const isWL = battleSlug === DEFAULT_VERTICAL;
    const ctx = hubContext(battleSlug);
    const author = vConfig.experts?.[0];
    const reviewer = vConfig.experts?.[1];
    // Brand the research-team name from the current context so it reads
    // "The TreatmentsHub Research Team" on the hub (not the legacy brand).
    const researchTeam = `The ${ctx.brandTeam.replace(/\s+Team$/i, "")} Research Team`;

    // WebPage + ItemList schema (authorship, freshness, ranked entities) and the
    // FAQ schema - the same E-E-A-T / rich-result signals the standalone home
    // carried, so the vertical home isn't a thinner page than before.
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: vConfig.hero.h1,
      description: vConfig.hero.description,
      url: canonicalUrl(ctx, "/"),
      inLanguage: "en-US",
      datePublished: "2026-06-01",
      dateModified: CONTENT_LAST_UPDATED,
      isPartOf: { "@type": "WebSite", name: ctx.brandDomain, url: ctx.origin },
      ...(author && {
        author: { "@type": "Organization", name: researchTeam, url: canonicalUrl(ctx, "/about") },
      }),
      ...(reviewer && { reviewedBy: { "@type": "Organization", name: reviewer.name } }),
      publisher: {
        "@type": "Organization",
        name: ctx.brandDomain,
        url: ctx.origin,
        logo: { "@type": "ImageObject", url: `${ctx.origin}/treatmentshub.png` },
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: vConfig.ranking.providerOrder.map((id, i) => {
          const p = vConfig.providers.find((pr) => pr.id === id);
          return { "@type": "ListItem", position: i + 1, name: p?.name ?? id, url: canonicalUrl(ctx, `/reviews/${id}`) };
        }),
      },
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: (vConfig.faqs ?? []).map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    };

    const byline =
      author || reviewer ? (
        <div className="space-y-0.5 text-[13.5px] leading-relaxed text-gray-500">
          {author && (
            <div>
              Written by{" "}
              <Link
                href={hubLink(ctx, "/about")}
                className="font-semibold text-[#191919] hover:text-[#0C4B75] hover:underline"
              >
                {researchTeam}
              </Link>
            </div>
          )}
          {reviewer && (
            <div>
              Reviewed by{" "}
              <Link
                href={hubLink(ctx, "/about")}
                className="font-semibold text-[#191919] hover:text-[#0C4B75] hover:underline"
              >
                {reviewer.name}
              </Link>
            </div>
          )}
        </div>
      ) : null;

    return (
      <div className="bg-[#FAFAFA]">
        {isPublishedVertical(battleSlug) && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
            {faqSchema.mainEntity.length > 0 && (
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            )}
          </>
        )}
        <ComparisonLayout config={vConfig} linkPrefix={`/${battleSlug}`} byline={byline}>
          {isWL ? (
            <EditorialContent
              midSlot={
                <ProductCarousel
                  providers={vConfig.providers}
                  title="Shop GLP-1 plans by product"
                  subtitle="Every provider's published plans in one strip - cheapest first, conditions under each price."
                />
              }
            />
          ) : battleSlug === "hair-loss" ? (
            <HairLossEditorialContent />
          ) : battleSlug === "trt" ? (
            <TrtEditorialContent />
          ) : battleSlug === "hrt" ? (
            <HrtEditorialContent />
          ) : battleSlug === "hearing-aids" ? (
            <HearingAidsEditorialContent />
          ) : battleSlug === "online-therapy" ? (
            <OnlineTherapyEditorialContent />
          ) : null}
        </ComparisonLayout>
      </div>
    );
  }

  return BattlePageView({ slug: battleSlug, ctx: ROOT_CONTEXT });
}
