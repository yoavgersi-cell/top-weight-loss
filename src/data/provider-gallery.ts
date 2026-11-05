// ───── Provider site galleries ─────
// Real screenshots of a provider's own website, shown on its review page as
// first-hand evidence of what a reader will see before signing up. Rules:
//   - operator-captured screenshots only, each set dated;
//   - captions describe what the page shows and attribute every claim on it
//     to the provider ("embody's site says ...") - no claim becomes ours;
//   - a slide that shows a price carries `price`; if the price index no
//     longer matches it, the slide is hidden automatically (getGallery), so
//     a stale screenshot can never contradict the verified price;
//   - neutral framing: these are the provider's own pages.
// Files live in /public/provider-gallery/<providerId>/.

import { PRICE_INDEX, priceValue } from "@/lib/price-index";

export type GallerySlide = {
  src: string;
  width: number;
  height: number;
  title: string;
  caption: string;
  alt: string;
  /** Prices visible in the screenshot, checked against the price index. */
  price?: { semaglutide?: number; tirzepatide?: number };
};

export type ProviderGallery = {
  /** ISO date the screenshots were captured. */
  capturedOn: string;
  /** Where they were captured, as shown to readers. */
  source: string;
  slides: GallerySlide[];
};

const GALLERIES: Record<string, ProviderGallery> = {
  embody: {
    capturedOn: "2026-11-05",
    source: "embody's website",
    slides: [
      {
        src: "/provider-gallery/embody/embody-homepage.webp",
        width: 1400,
        height: 777,
        title: "The homepage",
        caption:
          "embody's homepage leads with \"Fat Loss made simple, powered by GLP-1 Science + Care\". The \"Am I qualified?\" button starts the online intake, which the site says most people finish in under 2 minutes.",
        alt: "embody homepage with the headline Fat Loss made simple, powered by GLP-1 Science + Care and an Am I qualified? button",
      },
      {
        src: "/provider-gallery/embody/embody-pricing.webp",
        width: 1400,
        height: 777,
        title: "Plans and prices",
        caption:
          "Two weekly injection plans at a flat monthly rate: compounded semaglutide (GLP-1) at $49/month and compounded tirzepatide (GLP-1/GIP) at $99/month, with no hidden fees and shipping to your door, per embody's site.",
        alt: "embody pricing section showing weekly GLP-1 injections at a flat $49 per month and GLP-1/GIP injections at $99 per month",
        price: { semaglutide: 49, tirzepatide: 99 },
      },
      {
        src: "/provider-gallery/embody/embody-support.webp",
        width: 1400,
        height: 688,
        title: "The support pitch",
        caption:
          "embody puts support at the center of its pitch: \"Why are so many patients signing up for Embody? The Support.\" Recent Trustpilot reviewers most often mention the customer-service communication.",
        alt: "embody website section titled Why are so many patients signing up for Embody? The Support, beside a science of weight loss banner",
      },
      {
        src: "/provider-gallery/embody/embody-how-glp1-works.webp",
        width: 1400,
        height: 574,
        title: "How GLP-1s work, in embody's words",
        caption:
          "embody's explainer describes three effects of GLP-1 medicines: regulating appetite, supporting lasting behavior change and sustaining loss. A licensed clinician decides whether the medication is right for you.",
        alt: "embody explainer titled Why GLP-1s work for sustainable weight loss, listing regulation, lasting change and sustains loss",
      },
      {
        src: "/provider-gallery/embody/embody-first-months.webp",
        width: 1400,
        height: 1175,
        title: "What month one looks like",
        caption:
          "embody's month-by-month timeline starts with \"Month 0-1: Getting Started & Adjusting\". Individual results vary; your clinician sets and adjusts the dose.",
        alt: "embody timeline card Month 0-1 Getting Started and Adjusting, from the section What your first 6 months on Embody really look like",
      },
    ],
  },
};

/** The provider's gallery with any price-stale slide removed, or null. */
export function getGallery(providerId: string): ProviderGallery | null {
  const g = GALLERIES[providerId];
  if (!g) return null;
  const row = PRICE_INDEX.find((r) => r.providerId === providerId);
  const slides = g.slides.filter((s) => {
    if (!s.price) return true;
    if (!row) return false;
    const sema = priceValue(row.semaglutide);
    const tirz = priceValue(row.tirzepatide);
    const ok =
      (s.price.semaglutide === undefined || s.price.semaglutide === sema) &&
      (s.price.tirzepatide === undefined || s.price.tirzepatide === tirz);
    if (!ok && process.env.NODE_ENV !== "production") {
      console.warn(`[provider-gallery] ${providerId}: "${s.title}" hidden - its prices no longer match the price index`);
    }
    return ok;
  });
  return slides.length ? { ...g, slides } : null;
}
