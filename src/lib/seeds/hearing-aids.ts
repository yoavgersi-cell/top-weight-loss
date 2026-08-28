import type {
  SiteConfig,
  Provider,
  ReviewData,
  BattleData,
  FaqItem,
} from "../config";

// ─────────────────────────────────────────────────────────────────────────────
// Hearing Aids vertical
//
// House rules, same as every vertical: real brands with truthful, general
// descriptions and NO invented data - no fabricated prices, ratings, device
// specs or medical claims. Where we haven't verified a brand's published
// pricing or current product lineup, the copy says so and points to the
// brand's site. All reviews index (Aug 2026 operator policy); affiliate links
// and verified pricing get filled in as partnerships come online (the same
// flow used for HealthRx, Sprout and HRT).
// ─────────────────────────────────────────────────────────────────────────────

const UPDATED = "2026-08-24";
const PRICING_TBD =
  "We haven't verified this brand's current published pricing yet - device prices, bundles and offers change, so check the brand's site for current rates. This page will carry exact verified prices once we've confirmed them.";

const providers: Provider[] = [
  {
    id: "audien",
    name: "Audien Hearing",
    tagline: "Budget-priced OTC hearing devices sold directly online",
    logo: "/logos/audien.svg",
    smallLogo: "/logos/audien-icon.svg",
    highlights: [
      "Direct-to-consumer OTC hearing devices",
      "Rechargeable models - no tiny batteries to swap",
      "No prescription or clinic visit required",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
  {
    id: "oricle",
    name: "Oricle",
    tagline: "OTC hearing device ordered online, no appointment needed",
    logo: "/logos/oricle.svg",
    smallLogo: "/logos/oricle-icon.svg",
    highlights: [
      "Over-the-counter hearing device",
      "Ordered online and shipped to your door",
      "Rechargeable design",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
];

const reviews: ReviewData[] = [
  {
    slug: "audien",
    providerId: "audien",
    shortSummary:
      "Direct-to-consumer OTC hearing devices at budget prices - rechargeable, ordered online, no clinic visit required.",
    reviewIntro:
      "Audien Hearing sells over-the-counter hearing devices directly online at budget prices - one of the most widely marketed brands in the value end of the OTC category. Its devices are rechargeable and ship to your door with no prescription, hearing test or clinic visit required, which is the core OTC promise: lower cost and less friction than audiologist-fitted prescription hearing aids, in exchange for a self-fitted, one-size approach. We haven't yet verified Audien's current model lineup, pricing or return terms, so this review covers the model honestly and will carry exact verified figures once confirmed.",
    keyFeatures: [
      "Direct-to-consumer OTC hearing devices",
      "Rechargeable - no disposable batteries",
      "No prescription or hearing test required to order",
      "Ships to your door",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "OTC hearing devices (current model lineup to be verified)",
    ],
    pros: [
      "Budget pricing - the value end of the OTC category",
      "Rechargeable design",
      "Simple online ordering, no appointments",
    ],
    cons: [
      "We haven't verified current models, pricing or return terms",
      "Self-fitted OTC devices - no audiologist fitting or custom programming",
      "OTC devices suit perceived mild-to-moderate hearing loss, not severe loss",
    ],
    bestFor: [
      "Adults with perceived mild-to-moderate hearing difficulty who want a low-cost first step",
      "People who want to skip clinic visits and try an OTC device at home",
    ],
    finalVerdict:
      "Audien is the budget-first take on OTC hearing: order online, charge, wear - no clinic in the loop. That trade has real limits (no professional fitting, and OTC devices aren't for severe hearing loss), so it fits best as an affordable first step. Confirm the current model lineup, price and return window on Audien's site before buying - and see a hearing professional first if you have sudden hearing changes, pain or one-sided loss.",
    trustBadges: ["OTC hearing devices", "Rechargeable design", "Direct online ordering"],
    updatedAt: UPDATED,
  },
  {
    slug: "oricle",
    providerId: "oricle",
    shortSummary:
      "An over-the-counter hearing device sold online - rechargeable and shipped to your door, no appointment needed.",
    reviewIntro:
      "Oricle sells an over-the-counter hearing device online: order it, charge it, wear it - no prescription, hearing test or appointment in the process. Like other value-priced OTC devices it targets adults with perceived mild-to-moderate hearing difficulty who want an affordable, low-friction option before committing to audiologist-fitted care. We haven't yet verified Oricle's current published pricing, device specifications or return terms, so this review keeps to the model and will be completed with exact, verified details once we've confirmed them.",
    keyFeatures: [
      "Over-the-counter hearing device",
      "Ordered online, shipped to your door",
      "Rechargeable design",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "OTC hearing device (current specifications to be verified)",
    ],
    pros: [
      "Simple online purchase - no appointments or prescriptions",
      "Rechargeable design",
      "Positioned at the value end of the OTC market",
    ],
    cons: [
      "We haven't verified current pricing, specs or return terms",
      "Less published brand track record than the biggest OTC names",
      "Self-fitted - no professional fitting, and not suited to severe hearing loss",
    ],
    bestFor: [
      "Adults wanting a low-cost OTC device to try at home",
      "People comparing budget OTC options before spending more",
    ],
    finalVerdict:
      "Oricle competes on the same promise as the rest of the budget OTC field: hearing help without the clinic and without the price tag. Until we've verified its current pricing, specs and return policy, confirm all three on Oricle's site - the return window especially, since self-fitted devices are bought untested. And as with any OTC device: sudden changes, pain or one-sided hearing loss are reasons to see a professional, not to shop online.",
    trustBadges: ["OTC hearing device", "Rechargeable design", "Online ordering"],
    updatedAt: UPDATED,
  },
];

const battles: BattleData[] = [
  {
    slug: "audien-vs-oricle",
    provider1Id: "audien",
    provider2Id: "oricle",
    title: "Audien vs Oricle: Which Budget OTC Hearing Device in 2026?",
    matchupLabel: "Audien vs Oricle",
    subtitle: "Two value-priced over-the-counter hearing devices sold online, compared honestly.",
    description:
      "Audien Hearing vs Oricle: both sell budget OTC hearing devices online - rechargeable, self-fitted, no clinic visit. An honest comparison of the two models and what to verify before buying either.",
    intro:
      "Audien and Oricle sell the same core promise: an over-the-counter hearing device you order online at a budget price - rechargeable, self-fitted, and delivered without a prescription, hearing test or clinic visit. That makes this less a clash of philosophies than a value-end shootout, and the honest starting point is that we haven't yet verified either brand's current pricing, model lineup or return terms. What we can compare is what's publicly observable about each brand and - more usefully - exactly what to check on both sites before you buy.",
    verdict:
      "On what's publicly observable, Audien is the more established of the two value brands - it has marketed multiple device generations and has the larger public footprint, which matters when you're buying a self-fitted device and may need support or a return. Oricle competes on the same simplicity at the same end of the market. Since we haven't verified current prices at either, decide on the things you can check in five minutes on each site: the current price, the return window, the warranty, and how support is reached. For either brand, OTC devices fit perceived mild-to-moderate hearing difficulty - sudden changes, pain or one-sided loss call for a hearing professional first.",
    verdictWinnerPoints: [
      "Larger public brand footprint in budget OTC hearing",
      "Multiple marketed device generations",
      "Same no-clinic, rechargeable OTC model",
    ],
    verdictLoserPoints: [
      "Competes on the same low-friction OTC promise",
      "Rechargeable, ordered online, shipped to your door",
      "Worth comparing on current price and return terms",
    ],
    winnerId: "audien",
    categories: [
      {
        name: "Brand Track Record",
        winner: "provider1",
        explanation:
          "Audien has the larger public footprint of the two - it has marketed multiple device generations in the budget OTC space, while Oricle has a thinner public track record. With self-fitted devices, brand longevity mostly matters for support, warranty service and returns.",
        supportingPoints: [
          "Multiple marketed device generations (Audien)",
          "Thinner published track record (Oricle)",
        ],
      },
      {
        name: "Buying Experience",
        winner: "tie",
        explanation:
          "Both are the same flow: order online, charge the device, wear it - no prescription, no hearing test, no appointment. Neither offers professional fitting, which is the OTC trade-off itself rather than a difference between them.",
        supportingPoints: [
          "No-clinic online ordering (both)",
          "Rechargeable, self-fitted devices (both)",
        ],
      },
      {
        name: "What We Can Verify Today",
        winner: "tie",
        explanation:
          "We haven't verified current pricing, specs or return terms at either brand, so neither earns a data-backed edge here. Before buying either device, confirm the current price, the return window, the warranty length and the support channel on the brand's own site - the return window matters most, because OTC devices are bought before you know they help.",
        supportingPoints: [
          "Pricing unverified at both - check both sites",
          "Compare return windows and warranties directly",
        ],
      },
    ],
    features: [
      { feature: "Category", provider1Value: "OTC hearing device", provider2Value: "OTC hearing device", highlight: "both" },
      { feature: "Power", provider1Value: "Rechargeable", provider2Value: "Rechargeable", highlight: "both" },
      { feature: "Fitting", provider1Value: "Self-fitted at home", provider2Value: "Self-fitted at home", highlight: "both" },
      { feature: "Brand footprint", provider1Value: "Multiple device generations", provider2Value: "Thinner public record", highlight: "provider1" },
      { feature: "Pricing", provider1Value: "Verify on site", provider2Value: "Verify on site", highlight: "none" },
      { feature: "Returns & warranty", provider1Value: "Verify on site", provider2Value: "Verify on site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
];

const faqs: FaqItem[] = [
  {
    question: "What are OTC hearing aids?",
    answer:
      "Over-the-counter (OTC) hearing aids are devices adults can buy directly - online or in stores - without a prescription, hearing exam or professional fitting. The FDA created the OTC category for adults with perceived mild-to-moderate hearing difficulty; they're self-fitted and typically cost much less than prescription hearing aids fitted by an audiologist.",
  },
  {
    question: "Who are OTC hearing devices for?",
    answer:
      "Adults (18+) who feel they have mild-to-moderate hearing difficulty - trouble in conversations, TV volume creeping up, asking people to repeat themselves. They are not intended for severe hearing loss or for children.",
  },
  {
    question: "When should I see a hearing professional instead?",
    answer:
      "See a doctor or audiologist first if you have sudden hearing loss, hearing loss in only one ear, pain, drainage or dizziness - these can signal conditions that need medical care, not a device. A professional hearing test is also the right move whenever you're unsure how significant your hearing loss is.",
  },
  {
    question: "How much do OTC hearing aids cost?",
    answer:
      "OTC devices generally cost far less than professionally fitted prescription hearing aids, and prices vary widely between brands and models. We list a brand's exact price only after we've verified it - where we haven't yet, we say so and link to the brand's site for current rates.",
  },
  {
    question: "What's the difference between OTC and prescription hearing aids?",
    answer:
      "Prescription hearing aids are fitted and programmed to your measured hearing loss by an audiologist, with professional follow-up - and cost accordingly. OTC devices are self-fitted, one-size approaches at a much lower price. For perceived mild-to-moderate difficulty, OTC can be a reasonable first step; for severe or complex loss, professional care is the right path.",
  },
  {
    question: "What should I check before buying an OTC hearing device?",
    answer:
      "Four things on the brand's site: the current price, the return window (the most important - you're buying before you know it helps), the warranty, and how customer support is reached. Rechargeable vs disposable batteries is also worth noting for daily convenience.",
  },
];

export function hearingAidsSeed(base: SiteConfig): SiteConfig {
  return {
    ...base,
    siteName: "treatmentshub.com",
    hero: {
      ...base.hero,
      backgroundImageUrl: "",
      imageAlt: "",
      updatedLabel: "Last Updated: August 2026",
      h1: "Best OTC Hearing Aids of 2026",
      h2: "Compare over-the-counter hearing devices you can order online, side by side",
      description:
        "Compare over-the-counter hearing devices sold directly online - how the brands differ, what the OTC category can and can't do, and exactly what to verify before buying. Where we haven't verified a brand's pricing yet, we say so instead of guessing.",
    },
    providers,
    sidebar: {
      ...base.sidebar,
      blockOrder: ["secureBadge", "editorialReviews", "rankingMethodology", "disclosure"],
    },
    ranking: {
      providerOrder: providers.map((p) => p.id),
      positions: base.ranking.positions,
    },
    reviews,
    battles,
    faqs,
  };
}
