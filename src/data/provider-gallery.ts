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
  /** ISO capture date when it differs from the gallery's capturedOn (an older screenshot kept alongside newer ones). */
  capturedOn?: string;
  /** Prices visible in the screenshot, checked against the price index. */
  price?: { semaglutide?: number; tirzepatide?: number };
};

export type ProviderGallery = {
  /** ISO date the newest screenshots were captured; a slide's own capturedOn overrides it. */
  capturedOn: string;
  /** Where they were captured, as shown to readers. */
  source: string;
  slides: GallerySlide[];
};

const GALLERIES: Record<string, ProviderGallery> = {
  embody: {
    capturedOn: "2026-11-26",
    source: "embody's website",
    slides: [
      {
        src: "/provider-gallery/embody/embody-black-friday-banner.webp",
        width: 1200,
        height: 185,
        title: "The Black Friday banner",
        caption:
          "The banner at the top of embody's homepage on November 26, 2026 reads \"Black Friday Sale Discount Applied!\" with \"$49 Semaglutide / $99 Tirzepatide\". Our November 16 read of the same page showed a pre-Black Friday banner with no countdown. Cropped to the banner; the rest of the page is not shown.",
        alt: "embody homepage banner reading Black Friday Sale Discount Applied with $49 Semaglutide and $99 Tirzepatide",
        price: { semaglutide: 49, tirzepatide: 99 },
      },
      {
        src: "/provider-gallery/embody/embody-price-countdown.webp",
        width: 740,
        height: 360,
        title: "The price box and countdown",
        caption:
          "embody's homepage price box on November 26, 2026: \"Was $299, GLP1 for $49/mo\" and a countdown reading \"Price increases in 04 days, 14 hrs, 58 mins, 32 secs\". A countdown on the page read that day showed under five days until a price increase. The $299 is embody's own comparison price, not a regular price we have verified.",
        alt: "embody homepage price box with Was $299 struck through, GLP1 for $49 per month, and a Price increases in countdown timer",
        price: { semaglutide: 49 },
      },
      {
        src: "/provider-gallery/embody/embody-offer-popup.webp",
        width: 1400,
        height: 1033,
        title: "The offer pop-up",
        caption:
          "The pop-up embody showed on November 26, 2026: \"Black Friday Savings! You just unlocked $250 off. Get your GLP-1 for only $49 ($299 struck through). Sign up now and never pay a dollar more!\", with a footer reading \"Lifetime discount applied at checkout\". Those are embody's words, not ours; we have not verified what the lifetime wording covers.",
        alt: "embody offer pop-up headed Black Friday Savings, saying You just unlocked $250 off and Get your GLP-1 for only $49, with a Claim My $250 Savings button",
        price: { semaglutide: 49 },
      },
      {
        src: "/provider-gallery/embody/embody-pricing.webp",
        capturedOn: "2026-11-05",
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
        capturedOn: "2026-11-05",
        width: 1400,
        height: 688,
        title: "The support pitch",
        caption:
          "embody puts support at the center of its pitch: \"Why are so many patients signing up for Embody? The Support.\"",
        alt: "embody website section titled Why are so many patients signing up for Embody? The Support, beside a science of weight loss banner",
      },
      {
        src: "/provider-gallery/embody/embody-how-glp1-works.webp",
        capturedOn: "2026-11-05",
        width: 1400,
        height: 574,
        title: "How GLP-1s work, in embody's words",
        caption:
          "embody's explainer describes three effects of GLP-1 medicines: regulating appetite, supporting lasting behavior change and sustaining loss. A licensed clinician decides whether the medication is right for you.",
        alt: "embody explainer titled Why GLP-1s work for sustainable weight loss, listing regulation, lasting change and sustains loss",
      },
      {
        src: "/provider-gallery/embody/embody-first-months.webp",
        capturedOn: "2026-11-05",
        width: 1400,
        height: 1175,
        title: "Month 0-1, per embody",
        caption:
          "embody's month-by-month timeline starts with \"Month 0-1: Getting Started & Adjusting\". Individual results vary; your clinician sets and adjusts the dose.",
        alt: "embody timeline card Month 0-1 Getting Started and Adjusting, from the section What your first 6 months on Embody really look like",
      },
      {
        src: "/provider-gallery/embody/embody-month-1-2.webp",
        capturedOn: "2026-11-05",
        width: 1400,
        height: 1206,
        title: "Month 1-2, per embody",
        caption:
          "embody's timeline calls months one to two \"Appetite Changes & Early Signals\". These are embody's descriptions; individual results vary and your clinician adjusts the dose.",
        alt: "embody timeline card Month 1-2 Appetite Changes and Early Signals",
      },
      {
        src: "/provider-gallery/embody/embody-month-2-3.webp",
        capturedOn: "2026-11-05",
        width: 1400,
        height: 1203,
        title: "Month 2-3, per embody",
        caption:
          "Months two to three on embody's timeline: \"Real Weight Loss Starts Showing\". embody's own wording; results vary from person to person.",
        alt: "embody timeline card Month 2-3 Real Weight Loss Starts Showing",
      },
      {
        src: "/provider-gallery/embody/embody-month-3-4.webp",
        capturedOn: "2026-11-05",
        width: 1400,
        height: 1200,
        title: "Month 3-4, per embody",
        caption:
          "embody describes months three to four as \"Real Life, Real Adjustments\", fitting treatment around busy weeks and social events.",
        alt: "embody timeline card Month 3-4 Real Life, Real Adjustments",
      },
      {
        src: "/provider-gallery/embody/embody-month-4-6.webp",
        capturedOn: "2026-11-05",
        width: 1400,
        height: 1196,
        title: "Month 4-6, per embody",
        caption:
          "The last stage on embody's timeline, months four to six: \"Sustainable, Ongoing Results\". embody's description, not a guaranteed outcome.",
        alt: "embody timeline card Month 4-6 Sustainable, Ongoing Results",
      },
      {
        src: "/provider-gallery/embody/embody-whats-included.webp",
        capturedOn: "2026-11-05",
        width: 1400,
        height: 637,
        title: "What's included",
        caption:
          "embody lists six features: clinician-guided care, 24/7 messaging with its care team, no insurance needed, free expedited delivery, transparent monthly pricing with no hidden fees, and the option to pause or adjust anytime.",
        alt: "embody feature grid: medical expertise with personalized support, 24/7 access to care team, no insurance barriers, free expedited delivery, transparent monthly pricing, pause or adjust any time",
      },
    ],
  },
  shed: {
    capturedOn: "2026-11-26",
    source: "SHED's website",
    slides: [
      {
        src: "/provider-gallery/shed/shed-first-month-offer.webp",
        width: 1000,
        height: 347,
        title: "The first-month offer",
        caption:
          "The banner at the top of SHED's homepage on November 26, 2026 reads \"Get 30% off your first month's GLP-1 program\", with a \"Find your plan\" button. The screenshot shows no price, so it does not tell us what the discount applies to or when it ends. Cropped to the banner; the weight-loss claims below it on the page are not shown.",
        alt: "SHED homepage banner reading Get 30% off your first month's GLP-1 program with a Find your plan button",
      },
    ],
  },
  trimrx: {
    capturedOn: "2026-11-26",
    source: "TrimRx's website",
    slides: [
      {
        src: "/provider-gallery/trimrx/trimrx-hero-1126.webp",
        width: 1000,
        height: 495,
        title: "The homepage price line",
        caption:
          "TrimRx's homepage on November 26, 2026 reads \"Weight Loss Plans Starting at $149\", with \"Online provider visits included. No insurance required.\", \"Straightforward pricing with no surprise fees.\" and \"Cancel Before Your Next Billing Cycle\" beneath it. The screenshot shows no per-drug price and no promotion banner. Cropped to the price block; the customer-count and review lines elsewhere on the page are not shown.",
        alt: "TrimRx homepage reading Weight Loss Plans Starting at $149 with online provider visits included, no insurance required, no surprise fees and cancel before your next billing cycle",
      },
    ],
  },
  collective: {
    capturedOn: "2026-11-26",
    source: "Collective's website",
    slides: [
      {
        src: "/provider-gallery/collective/collective-hero.webp",
        width: 1056,
        height: 920,
        title: "The homepage headline",
        caption:
          "Collective's homepage on November 26, 2026: \"Get GLP-1s at $59/month\", with \"Always the Same Price, Any Dose\", \"No Multi-Month Orders Required\" and \"Cancel Easily Anytime\", and a \"Stop Overpaying\" button that the page says takes less than 2 minutes. The headline does not name a medication; $59 is the semaglutide price we list. The screenshot was cropped on the right and does not show the tirzepatide price or the $199 annual membership.",
        alt: "Collective homepage headline Get GLP-1s at $59 per month with three checkmarks: always the same price any dose, no multi-month orders required, cancel easily anytime",
        price: { semaglutide: 59 },
      },
    ],
  },
  eden: {
    capturedOn: "2026-11-26",
    source: "Eden's website",
    slides: [
      {
        src: "/provider-gallery/eden/eden-pricing.webp",
        width: 845,
        height: 495,
        title: "The price box",
        caption:
          "Eden's price box on November 26, 2026, headed \"Monthly pricing at every dose\": Semaglutide $99/mo and Tirzepatide $129/mo, with a \"Start my free assessment\" button that the page says takes 3 minutes, and \"No insurance needed\". The page beside it says \"one clear, all-inclusive price, no annual or long term plans required\". Cropped to the box; the other claims on that page are not shown.",
        alt: "Eden price box headed Monthly pricing at every dose showing Semaglutide $99 per month and Tirzepatide $129 per month with a Start my free assessment button",
        price: { semaglutide: 99, tirzepatide: 129 },
      },
    ],
  },
  altrx: {
    capturedOn: "2026-11-26",
    source: "altRx's website",
    slides: [
      {
        src: "/provider-gallery/altrx/altrx-hero-1126.webp",
        width: 720,
        height: 565,
        title: "The homepage price",
        caption:
          "altRx's homepage on November 26, 2026: \"Start for $89/mo\" under a list that reads \"HSA/FSA Approved!\", \"No price hike! Everything you need is included\" and \"No insurance required + free shipping\", with a \"Get Started Today\" button. Those are altRx's words, not ours. Cropped to the price block; the rest of the page is not shown. The screenshot is of the hero only, so it says nothing about the sitewide banner we read on November 20.",
        alt: "altRx homepage price block: HSA/FSA Approved, No price hike, No insurance required plus free shipping, Start for $89 per month and a Get Started Today button",
        price: { semaglutide: 89 },
      },
      {
        src: "/provider-gallery/altrx/altrx-how-it-works.webp",
        capturedOn: "2026-11-05",
        width: 1400,
        height: 853,
        title: "How it works, in 3 steps",
        caption:
          "altRx's three steps: a free 2-minute assessment with no cost or obligation; if a provider decides treatment is appropriate, a personalized care plan with compounded semaglutide or tirzepatide; then medication shipped from a licensed pharmacy, with ongoing support.",
        alt: "altRx How it works section with three cards: Start your free 2-minute assessment, Get your treatment plan, Receive your medication",
      },
      {
        src: "/provider-gallery/altrx/altrx-what-arrives.webp",
        capturedOn: "2026-11-05",
        width: 1400,
        height: 808,
        title: "What the delivery looks like",
        caption:
          "How altRx presents its delivery box: compounded GLP-1 and GLP-1/GIP vials alongside a printed treatment plan with injection steps.",
        alt: "altRx branded delivery box holding compounded GLP-1 and GLP-1/GIP vials and a printed treatment plan card",
      },
      {
        src: "/provider-gallery/altrx/altrx-why-altrx.webp",
        capturedOn: "2026-11-05",
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
        src: "/provider-gallery/wellmedr/welludr-banner-1126.webp",
        width: 1000,
        height: 116,
        title: "The Black Friday sale banner",
        caption:
          "The banner at the top of welludr's homepage on November 26, 2026 reads \"BLACK FRIDAY SALE DISCOUNT APPLIED! $35/mo Semaglutide | $65/mo Tirzepatide\", with no end date shown. Cropped to the banner; the screenshot does not show the plan label, shipping cadence or cancellation terms. Our earlier plans screenshot (November 5) showed $41 and $71 and has been retired.",
        alt: "welludr homepage banner reading Black Friday sale discount applied, $35 a month semaglutide and $65 a month tirzepatide",
        price: { semaglutide: 35, tirzepatide: 65 },
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
        title: "A 90-day banner on welludr's site",
        caption:
          "This banner says welludr refunds 100% of your money if you don't lose weight in 90 days. We could not find that guarantee in welludr's terms, refund policy, FAQ or plan page on Nov 22, 2026, and its refund policy says \"Lack of a desired result by itself does not qualify an accepted pharmacy order for a refund.\" Read the current terms before relying on it.",
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

/**
 * One gallery slide as an article figure (plain HTML for article bodies),
 * with its provider attribution and capture date. Slides that show a price
 * are refused, so an article can never embed a screenshot that the price
 * index might later contradict.
 */
export function galleryFigureHtml(providerId: string, file: string): string {
  const g = GALLERIES[providerId];
  const s = g?.slides.find((x) => x.src.endsWith(`/${file}`));
  if (!g || !s) throw new Error(`[provider-gallery] no slide ${providerId}/${file}`);
  if (s.price) throw new Error(`[provider-gallery] ${providerId}/${file} shows a price; not for articles`);
  const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  const date = new Date(s.capturedOn ?? g.capturedOn).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
  return `<figure class="shot"><img src="${s.src}" width="${s.width}" height="${s.height}" alt="${esc(s.alt)}" loading="lazy" decoding="async"><figcaption>${esc(s.caption)} <span class="shot-src">Screenshot of ${esc(g.source)}, captured ${date}.</span></figcaption></figure>`;
}
