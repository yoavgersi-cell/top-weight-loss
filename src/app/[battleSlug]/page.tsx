import type { Metadata } from "next";
import { getConfig } from "@/lib/config-store";
import { CONTENT_LAST_UPDATED, DEFAULT_VERTICAL, isVertical, isPublishedVertical } from "@/lib/config";
import { ROOT_CONTEXT, hubContext, canonicalUrl } from "@/lib/site-context";
import { ComparisonLayout } from "@/components/comparison-layout";
import { EditorialContent } from "@/components/editorial-content";
import { ExpertByline } from "@/components/expert-byline";
import { BattlePageView, battleMetadata } from "@/components/pages/battle-page";
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

  // Vertical home (treatmentshub.com/<vertical>). weight-loss points its
  // canonical at the existing site until the migration, so the two never
  // compete for the same query; new verticals are self-canonical and indexable.
  if (isVertical(battleSlug)) {
    const vConfig = await getConfig(battleSlug);
    const isWL = battleSlug === DEFAULT_VERTICAL;
    const canonical = isWL
      ? "https://www.topweightloss.io"
      : `https://www.treatmentshub.com/${battleSlug}`;
    return {
      title: { absolute: vConfig.hero.h1 },
      description: vConfig.hero.description,
      robots: isPublishedVertical(battleSlug) ? undefined : { index: false, follow: false },
      alternates: { canonical },
      openGraph: { title: vConfig.hero.h1, description: vConfig.hero.description, url: canonical, type: "website" },
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

    // WebPage + ItemList schema (authorship, freshness, ranked entities) and the
    // FAQ schema — the same E-E-A-T / rich-result signals the standalone home
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
        author: { "@type": "Organization", name: author.name, url: canonicalUrl(ctx, "/about") },
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
        <>
          {author && <ExpertByline expert={author} label="Written by" />}
          {reviewer && <ExpertByline expert={reviewer} label="Reviewed by" />}
        </>
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
          {isWL ? <EditorialContent /> : null}
        </ComparisonLayout>
      </div>
    );
  }

  return BattlePageView({ slug: battleSlug, ctx: ROOT_CONTEXT });
}
