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
        title: "Month 0-1, per embody",
        caption:
          "embody's month-by-month timeline starts with \"Month 0-1: Getting Started & Adjusting\". Individual results vary; your clinician sets and adjusts the dose.",
        alt: "embody timeline card Month 0-1 Getting Started and Adjusting, from the section What your first 6 months on Embody really look like",
      },
      {
        src: "/provider-gallery/embody/embody-month-1-2.webp",
        width: 1400,
        height: 1206,
        title: "Month 1-2, per embody",
        caption:
          "embody's timeline calls months one to two \"Appetite Changes & Early Signals\". These are embody's descriptions; individual results vary and your clinician adjusts the dose.",
        alt: "embody timeline card Month 1-2 Appetite Changes and Early Signals",
      },
      {
        src: "/provider-gallery/embody/embody-month-2-3.webp",
        width: 1400,
        height: 1203,
        title: "Month 2-3, per embody",
        caption:
          "Months two to three on embody's timeline: \"Real Weight Loss Starts Showing\". embody's own wording; results vary from person to person.",
        alt: "embody timeline card Month 2-3 Real Weight Loss Starts Showing",
      },
      {
        src: "/provider-gallery/embody/embody-month-3-4.webp",
        width: 1400,
        height: 1200,
        title: "Month 3-4, per embody",
        caption:
          "embody describes months three to four as \"Real Life, Real Adjustments\", fitting treatment around busy weeks and social events.",
        alt: "embody timeline card Month 3-4 Real Life, Real Adjustments",
      },
      {
        src: "/provider-gallery/embody/embody-month-4-6.webp",
        width: 1400,
        height: 1196,
        title: "Month 4-6, per embody",
        caption:
          "The last stage on embody's timeline, months four to six: \"Sustainable, Ongoing Results\". embody's description, not a guaranteed outcome.",
        alt: "embody timeline card Month 4-6 Sustainable, Ongoing Results",
      },
      {
        src: "/provider-gallery/embody/embody-whats-included.webp",
        width: 1400,
        height: 637,
        title: "What's included",
        caption:
          "embody lists six features: clinician-guided care, 24/7 messaging with its care team, no insurance needed, free expedited delivery, transparent monthly pricing with no hidden fees, and the option to pause or adjust anytime.",
        alt: "embody feature grid: medical expertise with personalized support, 24/7 access to care team, no insurance barriers, free expedited delivery, transparent monthly pricing, pause or adjust any time",
      },
    ],
  },
  altrx: {
    capturedOn: "2026-11-05",
    source: "altRx's website",
    slides: [
      {
        src: "/provider-gallery/altrx/altrx-homepage.webp",
        width: 1400,
        height: 931,
        title: "The homepage",
        caption:
          "altRx's homepage: \"Start for $89/mo\", HSA/FSA approved, no insurance required and free shipping, per altRx's site. The page carries the FDA notice that compounded medications are not FDA-approved, and GLP-1 safety information.",
        alt: "altRx homepage headline Transforming Care, Redefining Weight Management with a Start for $89 per month offer and a Get Started Today button",
        price: { semaglutide: 89 },
      },
      {
        src: "/provider-gallery/altrx/altrx-how-it-works.webp",
        width: 1400,
        height: 853,
        title: "How it works, in 3 steps",
        caption:
          "altRx's three steps: a free 2-minute assessment with no cost or obligation; if a provider decides treatment is appropriate, a personalized care plan with compounded semaglutide or tirzepatide; then medication shipped from a licensed pharmacy, with ongoing support.",
        alt: "altRx How it works section with three cards: Start your free 2-minute assessment, Get your treatment plan, Receive your medication",
      },
      {
        src: "/provider-gallery/altrx/altrx-what-arrives.webp",
        width: 1400,
        height: 808,
        title: "What the delivery looks like",
        caption:
          "How altRx presents its delivery box: compounded GLP-1 and GLP-1/GIP vials alongside a printed treatment plan with injection steps.",
        alt: "altRx branded delivery box holding compounded GLP-1 and GLP-1/GIP vials and a printed treatment plan card",
      },
      {
        src: "/provider-gallery/altrx/altrx-why-altrx.webp",
        width: 1400,
        height: 844,
        title: "What's included",
        caption:
          "altRx lists four features: care guidance, free and fast delivery from a licensed pharmacy, plans reviewed by licensed healthcare providers, and transparent pricing with no membership fees and the option to cancel anytime.",
        alt: "altRx section Bring quality care home, 100% online, with four feature cards: care guidance, free and fast delivery, recommended by altRx, transparent pricing",
      },
    ],
  },
  wellmedr: {
    capturedOn: "2026-11-05",
    source: "welludr's website",
    slides: [
      {
        src: "/provider-gallery/wellmedr/welludr-homepage.webp",
        width: 1400,
        height: 709,
        title: "The homepage",
        caption:
          "welludr's homepage: \"See if you qualify for GLP-1 weight-loss medication\", with a quiz the site says takes 3 minutes and a clinician review before anything is prescribed.",
        alt: "welludr homepage headline See if you qualify for GLP-1 weight-loss medication with a Check Eligibility button and a weight loss warranty badge",
      },
      {
        src: "/provider-gallery/wellmedr/welludr-bmi-step.webp",
        width: 1400,
        height: 862,
        title: "The intake: BMI step",
        caption:
          "One step of welludr's intake asks for height and weight to calculate BMI, which welludr says helps determine eligibility for weight-loss medication.",
        alt: "welludr intake step titled Let's calculate your BMI with feet, inches and weight fields",
      },
      {
        src: "/provider-gallery/wellmedr/welludr-next-steps-1-2.webp",
        width: 1400,
        height: 988,
        title: "What happens next: steps 1-2",
        caption:
          "welludr's four-step flow starts with activating your plan (the site lists same-day slots) and a licensed clinician reviewing your intake and building a personalized treatment plan.",
        alt: "welludr What happens next timeline: step 1 activate your weight loss plan, step 2 clinician builds your program",
      },
      {
        src: "/provider-gallery/wellmedr/welludr-next-steps-3-4.webp",
        width: 1400,
        height: 931,
        title: "What happens next: steps 3-4",
        caption:
          "Steps three and four: medication delivered discreetly to your door, then refills shipped before you run out, per welludr's site.",
        alt: "welludr What happens next timeline: step 3 medication delivered to your doorstep, step 4 on-time refills",
      },
      {
        src: "/provider-gallery/wellmedr/welludr-plans.webp",
        width: 1400,
        height: 1785,
        title: "Plans and prices",
        caption:
          "welludr's plan page lists compounded tirzepatide from $71 a month and compounded semaglutide from $41 a month, each shipped every 4 weeks, with dosing adjusted as you respond.",
        alt: "welludr Choose your GLP-1 plan section: tirzepatide starting at $71 a month and semaglutide starting at $41 a month",
        price: { semaglutide: 41, tirzepatide: 71 },
      },
      {
        src: "/provider-gallery/wellmedr/welludr-brand-name.webp",
        width: 1400,
        height: 1155,
        title: "Brand-name options",
        caption:
          "welludr also lists brand-name Ozempic from $1,399 and Zepbound from $1,599 a month, with provider review, a Medical Weight-Care Coach and dose adjustments included, and its required safety notice on compounded GLP-1s.",
        alt: "welludr brand-name section: Ozempic starting at $1,399 and Zepbound starting at $1,599 with month-to-month plan inclusions",
      },
      {
        src: "/provider-gallery/wellmedr/welludr-why-choose.webp",
        width: 1400,
        height: 854,
        title: "What's included",
        caption:
          "welludr lists what its program includes: unlimited messaging with licensed clinicians, a care platform with progress tracking, and refills shipped before you run out.",
        alt: "welludr Why people choose welludr section with included features: unlimited messaging with licensed clinicians, real-time access to your care platform, on-time refills",
      },
      {
        src: "/provider-gallery/wellmedr/welludr-guarantee.webp",
        width: 1400,
        height: 795,
        title: "The money-back guarantee",
        caption:
          "welludr's site states a money-back guarantee: if you don't lose weight in 90 days, it refunds 100% of your money. Check the full terms on welludr's site before you sign up.",
        alt: "welludr money-back guarantee banner: if you don't lose weight in 90 days we will refund 100% of your money",
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
