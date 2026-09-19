import Base from "@/app/(main)/articles/[slug]/opengraph-image";

// Hub article pages are served by this route; see the reviews sibling for why
// the OG image file must live here as well. Config fields must be literal.
export const runtime = "edge";
export const alt = "Article - Treatments Hub";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }: { params: Promise<{ battleSlug: string; slug: string }> }) {
  const { slug } = await params;
  return Base({ params: Promise.resolve({ slug }) });
}
