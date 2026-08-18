import type { Metadata } from "next";
import { getConfig } from "@/lib/config-store";
import { DEFAULT_VERTICAL, isVertical, isPublishedVertical } from "@/lib/config";
import { ROOT_CONTEXT } from "@/lib/site-context";
import { ComparisonLayout } from "@/components/comparison-layout";
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
    return (
      <div className="bg-[#FAFAFA]">
        <ComparisonLayout config={vConfig} linkPrefix={`/${battleSlug}`} />
      </div>
    );
  }

  return BattlePageView({ slug: battleSlug, ctx: ROOT_CONTEXT });
}
