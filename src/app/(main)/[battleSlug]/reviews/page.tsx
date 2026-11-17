import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isVertical } from "@/lib/config";
import { hubContext } from "@/lib/site-context";
import { ReviewsIndexView, reviewsIndexMetadata } from "@/components/pages/reviews-index-page";
import { verticalParams } from "@/lib/static-params";

export const revalidate = 60;

export const generateStaticParams = verticalParams;

// Hub reviews index: treatmentshub.com/<vertical>/reviews.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ battleSlug: string }>;
}): Promise<Metadata> {
  const { battleSlug } = await params;
  if (!isVertical(battleSlug)) return {};
  return reviewsIndexMetadata(hubContext(battleSlug));
}

export default async function HubReviewsIndexPage({
  params,
}: {
  params: Promise<{ battleSlug: string }>;
}) {
  const { battleSlug } = await params;
  if (!isVertical(battleSlug)) return notFound();
  return ReviewsIndexView({ ctx: hubContext(battleSlug) });
}
