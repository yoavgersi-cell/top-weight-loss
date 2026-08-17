import type { Metadata } from "next";
import { ArticlePageView, articleMetadata } from "@/components/pages/article-page";
import { ROOT_CONTEXT } from "@/lib/site-context";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return articleMetadata(slug, ROOT_CONTEXT);
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return ArticlePageView({ slug, ctx: ROOT_CONTEXT });
}
