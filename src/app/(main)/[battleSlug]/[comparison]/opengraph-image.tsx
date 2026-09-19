import Base from "@/app/(main)/[battleSlug]/opengraph-image";

// Hub comparison pages (treatmentshub.com/<vertical>/<a>-vs-<b>) are served by
// this route; the battle OG generator keys on the battle slug, which is the
// `comparison` segment here. Config fields must be literal exports.
export const runtime = "edge";
export const alt = "Provider Comparison - Treatments Hub";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }: { params: Promise<{ battleSlug: string; comparison: string }> }) {
  const { comparison } = await params;
  return Base({ params: Promise.resolve({ battleSlug: comparison }) });
}
