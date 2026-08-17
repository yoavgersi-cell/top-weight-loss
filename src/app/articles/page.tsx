import type { Metadata } from "next";
import { ArticlesIndexView, articlesIndexMetadata } from "@/components/pages/articles-index-page";
import { ROOT_CONTEXT } from "@/lib/site-context";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return articlesIndexMetadata(ROOT_CONTEXT);
}

export default async function ArticlesPage() {
  return ArticlesIndexView({ ctx: ROOT_CONTEXT });
}
