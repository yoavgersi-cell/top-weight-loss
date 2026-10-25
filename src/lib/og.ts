// Default Open Graph image for pages that build their own `openGraph`
// metadata object. Next.js replaces the layout's openGraph wholesale when a
// page sets its own, so pages that did not list an image shipped without
// og:image (Ahrefs: "Open Graph tags incomplete", Oct 25, 2026). The file is
// a static 1200x630 PNG in /public.
export const DEFAULT_OG_IMAGE = {
  url: "https://www.treatmentshub.com/og-default.png",
  width: 1200,
  height: 630,
  alt: "Treatments Hub - compare online treatment providers and prices",
};
