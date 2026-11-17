import type { Metadata } from "next";
import { ArticlePageView, articleMetadata } from "@/components/pages/article-page";
import { ROOT_CONTEXT } from "@/lib/site-context";

export const revalidate = 60;

// Legacy root URL (the proxy 301s it to the hub); cached on demand, none prerendered.
export const generateStaticParams = () => [];

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
