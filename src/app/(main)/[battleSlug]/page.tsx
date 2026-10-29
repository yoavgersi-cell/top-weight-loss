import { MedicalReviewBar } from "@/components/medical-review-bar";
import { medicalWebPageFields } from "@/lib/medical-schema";
import type { Metadata } from "next";
import { getConfig } from "@/lib/config-store";
import { CONTENT_LAST_UPDATED, DEFAULT_VERTICAL, VERTICALS, isVertical, isPublishedVertical } from "@/lib/config";
import { ROOT_CONTEXT, hubContext, canonicalUrl, hubLink, WEIGHT_LOSS_MIGRATED } from "@/lib/site-context";
import Link from "next/link";
import { ComparisonLayout } from "@/components/comparison-layout";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { EditorialContent } from "@/components/editorial-content";
import { HairLossEditorialContent } from "@/components/editorial-content-hair-loss";
import { TrtEditorialContent } from "@/components/editorial-content-trt";
import { HrtEditorialContent } from "@/components/editorial-content-hrt";
import { HearingAidsEditorialContent } from "@/components/editorial-content-hearing-aids";
import { OnlineTherapyEditorialContent } from "@/components/editorial-content-online-therapy";
import { EdEditorialContent } from "@/components/editorial-content-ed";
import { BattlePageView, battleMetadata } from "@/components/pages/battle-page";
import { ProductCarousel } from "@/components/product-carousel";
import { LatestGuides, newestGuides } from "@/components/latest-guides";
import { GuideCluster, ED_GUIDES } from "@/components/guide-cluster";
import { notFound } from "next/navigation";

export const revalidate = 3600;

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
        "Compare 2026's best telehealth weight loss providers. Verified GLP-1 prices from $41/month semaglutide and $71/month tirzepatide - checked at the source.",
      hrt: "Compare the best online HRT providers for women in 2026 - Winona, Gala and Midi Health - on treatment options, price, insurance and clinician support.",
      trt: "Compare the best online TRT clinics of 2026 - Hone, TMates, Male Excel and more - on lab testing, treatment options, price and ongoing monitoring.",
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
    // "The Treatments Hub Research Team" on the hub (not the legacy brand).
    const researchTeam = `The ${ctx.brandTeam.replace(/\s+Team$/i, "")} Research Team`;
    const verticalName = VERTICALS.find((v) => v.id === battleSlug)?.name ?? battleSlug;

    // WebPage + ItemList schema (authorship, freshness, ranked entities) and the
    // FAQ schema - the same E-E-A-T / rich-result signals the standalone home
    // carried, so the vertical home isn't a thinner page than before.
    // Top-level page node: a MedicalWebPage with audience, condition and
    // (where logged) reviewer - see src/lib/medical-schema.ts.
    const webPageSchema = {
      "@context": "https://schema.org",
      ...medicalWebPageFields(battleSlug, canonicalUrl(ctx, "/"), `/${battleSlug}`),
      name: vConfig.hero.h1,
      description: vConfig.hero.description,
      inLanguage: "en-US",
      datePublished: "2026-06-01",
      dateModified: CONTENT_LAST_UPDATED,
      isPartOf: { "@type": "WebSite", name: ctx.brandName, url: ctx.origin },
      ...(author && {
        author: { "@type": "Organization", name: researchTeam, url: canonicalUrl(ctx, "/about") },
      }),
      publisher: {
        "@type": "Organization",
        name: ctx.brandName,
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

    const byline = <MedicalReviewBar path={`/${battleSlug}`} className="max-w-[760px]" />;

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
            <HrtEditorialContent
              midSlot={
                <ProductCarousel
                  providers={vConfig.providers}
                  vertical="hrt"
                  title="Shop HRT treatments from top online providers"
                  subtitle="Real HRT products and published prices from the online menopause providers we rank - what each price includes, under every card."
                  withSchema
                  pageUrl={canonicalUrl(ctx, "/")}
                />
              }
            />
          ) : battleSlug === "hearing-aids" ? (
            <HearingAidsEditorialContent />
          ) : battleSlug === "online-therapy" ? (
            <OnlineTherapyEditorialContent />
          ) : battleSlug === "ed" ? (
            <EdEditorialContent />
          ) : null}
          {/* The vertical's newest guides, dated and attributed. The TRT and
              HRT editorials link to no articles at all, so without this the
              only path from a vertical home to its guides was the nav. */}
          <section className="mx-auto max-w-[1200px] px-4 pb-12">
            <LatestGuides
              items={newestGuides({ [battleSlug]: vConfig.articles ?? [] }, 6)}
              title={`Latest ${verticalName} guides`}
              subtitle="Independent, dated guides from our editorial team - newest updates first."
              allHref={`/${battleSlug}/articles`}
              allLabel={`All ${verticalName} guides`}
            />
            {battleSlug === "ed" && (
              <GuideCluster
                currentSlug=""
                prefix="/ed"
                guides={ED_GUIDES}
                heading="Erectile dysfunction (ED) treatment guides"
                intro="The cost index and the core treatment guides behind this ranking."
              />
            )}
          </section>
          <div className="mx-auto max-w-[1200px] px-4 pb-12">
            <MedicalDisclaimer vertical={battleSlug} />
          </div>
        </ComparisonLayout>
      </div>
    );
  }

  return BattlePageView({ slug: battleSlug, ctx: ROOT_CONTEXT });
}
