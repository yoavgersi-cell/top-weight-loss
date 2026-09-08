import type { Metadata } from "next";
import { ReviewsIndexView, reviewsIndexMetadata } from "@/components/pages/reviews-index-page";
import { ROOT_CONTEXT } from "@/lib/site-context";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return reviewsIndexMetadata(ROOT_CONTEXT);
}

export default async function ReviewsPage() {
  return ReviewsIndexView({ ctx: ROOT_CONTEXT });
}
