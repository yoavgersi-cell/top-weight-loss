import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isVertical } from "@/lib/config";
import { hubContext } from "@/lib/site-context";
import { ArticlePageView, articleMetadata } from "@/components/pages/article-page";
import { articleParams } from "@/lib/static-params";

export const revalidate = 60;

export const generateStaticParams = articleParams;

// Hub article page: treatmentshub.com/<vertical>/articles/<slug>.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ battleSlug: string; slug: string }>;
}): Promise<Metadata> {
  const { battleSlug, slug } = await params;
  if (!isVertical(battleSlug)) return {};
  return articleMetadata(slug, hubContext(battleSlug));
}

export default async function HubArticlePage({
  params,
}: {
  params: Promise<{ battleSlug: string; slug: string }>;
}) {
  const { battleSlug, slug } = await params;
  if (!isVertical(battleSlug)) return notFound();
  return ArticlePageView({ slug, ctx: hubContext(battleSlug) });
}
