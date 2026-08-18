import type {
  SiteConfig,
  Provider,
  ReviewData,
  BattleData,
  FaqItem,
} from "../config";

// ─────────────────────────────────────────────────────────────────────────────
// HRT (menopause / hormone replacement therapy) content skeleton
//
// Same rules as the other skeletons: real telehealth brands with truthful,
// general descriptions and NO invented data — affiliateUrl is "#", no Trustpilot
// ratings, no specific prices. Overridden the moment it's edited in the CMS, and
// the vertical stays unpublished until it's ready.
// ─────────────────────────────────────────────────────────────────────────────

const LOGO = "/provider-placeholder.svg";
const UPDATED = "2026-08-18";
const PRICING_TBD =
  "Pricing varies by plan and treatment. Check the provider's site for current pricing.";

const providers: Provider[] = [
  {
    id: "midi",
    name: "Midi Health",
    tagline: "Virtual care for perimenopause and menopause, including hormone therapy",
    logo: LOGO,
    smallLogo: LOGO,
    highlights: [
      "Menopause-trained clinicians",
      "Hormonal and non-hormonal options",
      "Insurance accepted in many cases",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
  {
    id: "evernow",
    name: "Evernow",
    tagline: "Telehealth menopause care with prescription treatment options for women",
    logo: LOGO,
    smallLogo: LOGO,
    highlights: [
      "Menopause-focused providers",
      "Prescription treatment options",
      "Ongoing online support",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
  {
    id: "alloy",
    name: "Alloy",
    tagline: "Online menopause treatment, including hormone therapy prescribed by doctors",
    logo: LOGO,
    smallLogo: LOGO,
    highlights: [
      "Menopause-specialist doctors",
      "Prescription hormone options",
      "Direct-to-door delivery",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
  {
    id: "winona",
    name: "Winona",
    tagline: "Telehealth menopause and hormone therapy for women",
    logo: LOGO,
    smallLogo: LOGO,
    highlights: [
      "Online provider evaluation",
      "Hormone therapy options",
      "Discreet delivery",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
  {
    id: "gennev",
    name: "Gennev",
    tagline: "Menopause telehealth with clinicians and coaching",
    logo: LOGO,
    smallLogo: LOGO,
    highlights: [
      "Menopause-trained clinicians",
      "Treatment plus coaching",
      "Online visits",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
  {
    id: "hers",
    name: "Hers",
    tagline: "Women's telehealth including menopause and hormone support",
    logo: LOGO,
    smallLogo: LOGO,
    highlights: [
      "Treatments formulated for women",
      "Online medical support",
      "Discreet delivery",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
];

const reviews: ReviewData[] = [
  {
    slug: "midi",
    providerId: "midi",
    shortSummary:
      "Virtual, insurance-friendly care for perimenopause and menopause with menopause-trained clinicians.",
    reviewIntro:
      "Midi Health provides virtual care for perimenopause and menopause with clinicians trained in midlife women's health, offering both hormonal and non-hormonal options after a medical review. This review outlines its approach and fit.",
    keyFeatures: [
      "Menopause-trained clinicians",
      "Hormonal and non-hormonal options",
      "Insurance accepted in many cases",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Hormone therapy (provider-directed)",
      "Non-hormonal options",
      "Ongoing follow-up",
    ],
    pros: [
      "Menopause-specialist care",
      "May work with insurance",
      "Both hormonal and non-hormonal paths",
    ],
    cons: [
      "Treatment requires a medical evaluation",
      "Availability can vary by state",
    ],
    bestFor: [
      "Women seeking specialist menopause care online",
      "Those who want to use insurance where possible",
    ],
    finalVerdict:
      "Midi Health is a strong option for menopause-specific virtual care. Confirm current pricing, insurance, and availability on their site.",
    trustBadges: ["Menopause-trained clinicians", "Licensed US providers"],
    updatedAt: UPDATED,
  },
  {
    slug: "alloy",
    providerId: "alloy",
    shortSummary:
      "Online menopause treatment with menopause-specialist doctors and prescription hormone options.",
    reviewIntro:
      "Alloy focuses on menopause care, connecting women with menopause-specialist doctors for prescription hormone and related treatments delivered to the door. This review covers what's included and who it fits.",
    keyFeatures: [
      "Menopause-specialist doctors",
      "Prescription hormone options",
      "Direct-to-door delivery",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Hormone therapy (provider-directed)",
      "Related menopause treatments",
      "Ongoing support",
    ],
    pros: [
      "Menopause-focused expertise",
      "Prescription options online",
      "Convenient delivery",
    ],
    cons: [
      "Treatment requires a medical evaluation",
      "Ongoing use for continued benefit",
    ],
    bestFor: [
      "Women who want menopause-specialist prescriptions online",
      "Those comparing dedicated menopause services",
    ],
    finalVerdict:
      "Alloy is a focused, convenient choice for online menopause treatment. Verify current pricing and eligibility on their site.",
    trustBadges: ["Menopause-specialist doctors", "Licensed US providers"],
    updatedAt: UPDATED,
  },
];

const battles: BattleData[] = [
  {
    slug: "midi-vs-alloy",
    provider1Id: "midi",
    provider2Id: "alloy",
    title: "Midi Health vs Alloy: Which Is Right for You?",
    subtitle: "Two menopause telehealth services, compared",
    description:
      "Compare Midi Health and Alloy for online menopause care and hormone therapy — approach, options, and who each one fits best.",
    intro:
      "Midi Health and Alloy both provide online menopause care with clinicians and prescription options. Here's how they compare so you can choose the one that fits you.",
    verdict:
      "Both offer menopause-specialist care online. Midi may work with insurance and offers hormonal and non-hormonal paths, while Alloy is a focused direct service. Confirm details on each provider's site.",
    verdictWinnerPoints: [
      "May work with insurance",
      "Hormonal and non-hormonal options",
    ],
    verdictLoserPoints: [
      "Menopause-specialist doctors",
      "Direct-to-door delivery",
    ],
    winnerId: "midi",
    categories: [
      {
        name: "Care model",
        winner: "tie",
        explanation:
          "Both connect women with menopause-focused clinicians before any treatment.",
        supportingPoints: [
          "Menopause-trained providers at both",
          "Medical review before prescribing",
        ],
      },
    ],
    features: [
      { feature: "Menopause specialists", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Insurance", provider1Value: "Often accepted", provider2Value: "See site", highlight: "none" },
      { feature: "Non-hormonal options", provider1Value: "Yes", provider2Value: "See site", highlight: "none" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
];

const faqs: FaqItem[] = [
  {
    question: "What is HRT for menopause?",
    answer:
      "Hormone replacement therapy (HRT) uses estrogen — often with progesterone — to relieve menopause symptoms such as hot flashes and night sweats. It's a prescription treatment that a licensed provider tailors to your history and needs.",
  },
  {
    question: "Is hormone replacement therapy safe?",
    answer:
      "HRT has benefits and risks that depend on your age, health history, and the type and timing of treatment. A licensed provider will review your situation to determine whether it's appropriate for you — it isn't right for everyone.",
  },
  {
    question: "Do I need lab tests or an evaluation for HRT?",
    answer:
      "Providers evaluate your symptoms and medical history, and may use lab tests, before prescribing. Ongoing follow-up helps tailor treatment and monitor your response.",
  },
  {
    question: "Can HRT be prescribed online?",
    answer:
      "Yes — reputable telehealth services connect you with licensed clinicians who review your information before prescribing, and dispense through licensed pharmacies. Always confirm a provider's licensing and practices.",
  },
  {
    question: "What symptoms can HRT help with?",
    answer:
      "HRT is commonly used for hot flashes, night sweats, and other menopause symptoms, and may help with additional concerns depending on your situation. A provider can explain what it may and may not address for you.",
  },
];

export function hrtSeed(base: SiteConfig): SiteConfig {
  return {
    ...base,
    siteName: "treatmentshub.com",
    hero: {
      ...base.hero,
      backgroundImageUrl: "",
      imageAlt: "",
      updatedLabel: "Last Updated: August 2026",
      h1: "Best HRT & Menopause Providers of 2026",
      h2: "Compare the top online menopause and hormone-therapy providers, side by side",
      description:
        "Compare the best online HRT and menopause providers — treatment options, specialist care, and overall value — to find the program that fits you.",
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
