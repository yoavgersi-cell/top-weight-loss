import Base from "@/app/(main)/reviews/[slug]/opengraph-image";

// Hub review pages (treatmentshub.com/<vertical>/reviews/<slug>) are served by
// this route, not the legacy root one - so the file-convention OG image must
// exist here too, or the page ships with no og:image (Sept 2026 audit: 273 of
// 279 hub pages had none). Delegates to the shared generator. Next requires the
// config fields below to be literal exports (not re-exports).
export const runtime = "edge";
export const alt = "Provider Review - Treatments Hub";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }: { params: Promise<{ battleSlug: string; slug: string }> }) {
  const { slug } = await params;
  return Base({ params: Promise.resolve({ slug }) });
}
