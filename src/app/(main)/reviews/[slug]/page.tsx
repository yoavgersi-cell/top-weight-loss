import type { Metadata } from "next";
import { ReviewPageView, reviewMetadata } from "@/components/pages/review-page";
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
  return reviewMetadata(slug, ROOT_CONTEXT);
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return ReviewPageView({ slug, ctx: ROOT_CONTEXT });
}
