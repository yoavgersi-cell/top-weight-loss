import type { Metadata } from "next";
import { ReviewPageView, reviewMetadata } from "@/components/pages/review-page";
import { ROOT_CONTEXT } from "@/lib/site-context";

export const revalidate = 60;

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
