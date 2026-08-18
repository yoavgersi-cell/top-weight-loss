import type {
  SiteConfig,
  Provider,
  ReviewData,
  BattleData,
  FaqItem,
} from "../config";

// ─────────────────────────────────────────────────────────────────────────────
// Hair-loss content skeleton
//
// A real, editable starting point for the hair-loss vertical: well-known
// telehealth brands with truthful, general descriptions, plus review and
// comparison shells. It deliberately carries NO invented data —
//   • affiliateUrl is "#"        (fill with your real affiliate link)
//   • no Trustpilot rating/count (never fabricate ratings on a health site)
//   • no specific prices         (pricing text points to the provider's site)
//   • logos are a shared placeholder (upload per-provider logos in the CMS)
// Everything here is overridden the moment it's edited in the CMS. The vertical
// stays unpublished (see PUBLISHED_VERTICALS) until its affiliate data is in.
// ─────────────────────────────────────────────────────────────────────────────

const LOGO = "/provider-placeholder.svg";
const UPDATED = "2026-08-18";

const providers: Provider[] = [
  {
    id: "hims",
    name: "Hims",
    tagline: "Prescription finasteride, minoxidil & more for men's hair loss — 100% online",
    logo: LOGO,
    smallLogo: LOGO,
    highlights: [
      "Prescription finasteride & minoxidil options",
      "Online medical consultation",
      "Discreet home delivery",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
  {
    id: "keeps",
    name: "Keeps",
    tagline: "Subscription hair-loss treatment for men — generic finasteride & minoxidil",
    logo: LOGO,
    smallLogo: LOGO,
    highlights: [
      "Generic finasteride & minoxidil",
      "Automatic subscription refills",
      "Online provider access",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
  {
    id: "roman",
    name: "Ro",
    tagline: "Men's telehealth with licensed-provider hair-loss treatment",
    logo: LOGO,
    smallLogo: LOGO,
    highlights: [
      "Licensed provider evaluation",
      "Finasteride & minoxidil options",
      "Discreet shipping",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
  {
    id: "happyhead",
    name: "Happy Head",
    tagline: "Personalized prescription topical & oral hair-loss formulas",
    logo: LOGO,
    smallLogo: LOGO,
    highlights: [
      "Custom prescription formulas",
      "Dermatologist-directed treatment",
      "Topical & oral options",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
  {
    id: "hers",
    name: "Hers",
    tagline: "Women's hair-loss treatment — minoxidil & prescription options, online",
    logo: LOGO,
    smallLogo: LOGO,
    highlights: [
      "Treatments formulated for women",
      "Minoxidil & prescription options",
      "Online medical support",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
  {
    id: "nutrafol",
    name: "Nutrafol",
    tagline: "Doctor-recommended hair-growth supplements for men & women",
    logo: LOGO,
    smallLogo: LOGO,
    highlights: [
      "Drug-free supplement approach",
      "Separate formulas for men & women",
      "Sold through many dermatology practices",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
];

// Honest placeholder for pricing — no invented numbers.
const PRICING_TBD =
  "Pricing varies by treatment and plan. Check the provider's site for current pricing.";

const reviews: ReviewData[] = [
  {
    slug: "hims",
    providerId: "hims",
    shortSummary:
      "A popular men's telehealth brand offering prescription finasteride, minoxidil, and other hair-loss treatments online.",
    reviewIntro:
      "Hims is a well-known telehealth platform that connects men with licensed providers for hair-loss treatment, including finasteride and minoxidil, delivered discreetly to your door. This review outlines what it offers, how it works, and who it may suit.",
    keyFeatures: [
      "Prescription finasteride and minoxidil options",
      "Online consultation with a licensed provider",
      "Discreet, recurring home delivery",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Oral finasteride",
      "Topical minoxidil",
      "Combination and other hair products",
    ],
    pros: [
      "Recognizable, widely-used brand",
      "Fully online process",
      "Range of hair-loss treatment options",
    ],
    cons: [
      "Prescription treatments require a medical evaluation",
      "Ongoing subscription for continued results",
    ],
    bestFor: [
      "Men who want a simple, online hair-loss routine",
      "Those comparing mainstream telehealth brands",
    ],
    finalVerdict:
      "Hims is a solid mainstream option for men starting hair-loss treatment online. Confirm current pricing and eligibility on their site.",
    trustBadges: ["Licensed US providers", "Discreet shipping"],
    updatedAt: UPDATED,
  },
  {
    slug: "keeps",
    providerId: "keeps",
    shortSummary:
      "A subscription service focused specifically on men's hair loss, offering generic finasteride and minoxidil.",
    reviewIntro:
      "Keeps is a hair-loss-focused telehealth subscription for men, offering generic finasteride and minoxidil after an online provider review. This review covers what's included and who it fits.",
    keyFeatures: [
      "Generic finasteride and minoxidil",
      "Subscription with automatic refills",
      "Hair-loss-specific focus",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: ["Oral finasteride", "Topical minoxidil", "Combination plans"],
    pros: [
      "Dedicated to hair loss",
      "Generic options",
      "Straightforward subscription model",
    ],
    cons: [
      "Men's treatments only",
      "Requires ongoing use to maintain results",
    ],
    bestFor: [
      "Men who want a focused, no-frills hair-loss plan",
      "Shoppers comparing generic treatment options",
    ],
    finalVerdict:
      "Keeps is a focused, convenient choice for men treating hair loss. Verify current pricing and plan details on their site.",
    trustBadges: ["Licensed US providers", "Automatic refills"],
    updatedAt: UPDATED,
  },
  {
    slug: "happyhead",
    providerId: "happyhead",
    shortSummary:
      "A telehealth service offering personalized, dermatologist-directed prescription hair-loss formulas.",
    reviewIntro:
      "Happy Head focuses on personalized prescription formulas for hair loss — including custom topical and oral options — directed by dermatology input. This review outlines its approach and fit.",
    keyFeatures: [
      "Custom-compounded prescription formulas",
      "Topical and oral options",
      "Dermatologist-directed treatment",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Custom topical formulas",
      "Oral prescription options",
      "Personalized combinations",
    ],
    pros: [
      "Personalized formulations",
      "Dermatology-led approach",
      "Topical alternatives to oral-only plans",
    ],
    cons: [
      "Custom formulas can cost more than generics",
      "Prescription requires medical review",
    ],
    bestFor: [
      "People wanting a tailored prescription approach",
      "Those interested in topical finasteride options",
    ],
    finalVerdict:
      "Happy Head suits people who want a personalized, dermatologist-directed plan. Confirm current pricing and eligibility on their site.",
    trustBadges: ["Dermatologist-directed", "Personalized formulas"],
    updatedAt: UPDATED,
  },
];

// Neutral, general feature rows — specifics point to the provider's site rather
// than inventing values.
const battles: BattleData[] = [
  {
    slug: "hims-vs-keeps",
    provider1Id: "hims",
    provider2Id: "keeps",
    title: "Hims vs Keeps: Which Is Right for You?",
    subtitle: "Two popular men's hair-loss telehealth brands, compared",
    description:
      "Compare Hims and Keeps for men's hair loss — treatment options, approach, and who each one fits best.",
    intro:
      "Hims and Keeps are two of the best-known telehealth brands for men's hair loss. Both offer finasteride and minoxidil online after a provider review; here's how they compare so you can pick the one that fits you.",
    verdict:
      "Both are reputable, convenient options. Keeps is hair-loss-focused, while Hims offers a broader men's-health range. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Broad range of men's health and hair products",
      "Recognizable mainstream brand",
    ],
    verdictLoserPoints: [
      "Dedicated hair-loss focus",
      "Generic treatment options",
    ],
    winnerId: "hims",
    categories: [
      {
        name: "Focus",
        winner: "provider2",
        explanation:
          "Keeps is dedicated specifically to hair loss, while Hims spans a wider set of men's health categories.",
        supportingPoints: [
          "Keeps concentrates on hair-loss treatment",
          "Hims covers hair loss plus other men's health needs",
        ],
      },
      {
        name: "Treatment options",
        winner: "tie",
        explanation:
          "Both offer finasteride and minoxidil after an online medical review.",
        supportingPoints: [
          "Oral finasteride available at both",
          "Topical minoxidil available at both",
        ],
      },
    ],
    features: [
      { feature: "Finasteride", provider1Value: "Available", provider2Value: "Available", highlight: "both" },
      { feature: "Minoxidil", provider1Value: "Available", provider2Value: "Available", highlight: "both" },
      { feature: "Focus", provider1Value: "Broad men's health", provider2Value: "Hair loss only", highlight: "none" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "hims-vs-roman",
    provider1Id: "hims",
    provider2Id: "roman",
    title: "Hims vs Ro: Which Is Right for You?",
    subtitle: "Two major men's telehealth platforms, compared for hair loss",
    description:
      "Compare Hims and Ro for men's hair-loss treatment — options, approach, and who each one fits best.",
    intro:
      "Hims and Ro (formerly Roman) are two large men's telehealth platforms that both treat hair loss online. Here's a side-by-side look to help you choose.",
    verdict:
      "Both are established platforms offering finasteride and minoxidil online. Your best fit depends on pricing and the wider services you want. Confirm details on each provider's site.",
    verdictWinnerPoints: [
      "Broad, well-known product range",
      "Established hair-loss options",
    ],
    verdictLoserPoints: [
      "Licensed-provider evaluations",
      "Wider men's-health platform",
    ],
    winnerId: "hims",
    categories: [
      {
        name: "Treatment options",
        winner: "tie",
        explanation:
          "Both provide finasteride and minoxidil after a licensed-provider review.",
        supportingPoints: [
          "Oral finasteride at both",
          "Topical minoxidil at both",
        ],
      },
    ],
    features: [
      { feature: "Finasteride", provider1Value: "Available", provider2Value: "Available", highlight: "both" },
      { feature: "Minoxidil", provider1Value: "Available", provider2Value: "Available", highlight: "both" },
      { feature: "Platform", provider1Value: "Broad men's health", provider2Value: "Broad men's health", highlight: "none" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
];

const faqs: FaqItem[] = [
  {
    question: "Does finasteride regrow hair?",
    answer:
      "Finasteride is a prescription treatment shown in studies to slow hair loss and, for many men, help regrow some hair over time. Results vary by person and continued use is generally needed to maintain them. Talk to a licensed provider about whether it's right for you.",
  },
  {
    question: "How long until hair-loss treatment works?",
    answer:
      "Most hair-loss treatments take several months of consistent use before visible changes appear — often around 3 to 6 months, with fuller results later. Individual timelines vary.",
  },
  {
    question: "Are online hair-loss treatments legitimate?",
    answer:
      "Reputable telehealth providers connect you with licensed clinicians who review your information before prescribing, and dispense medication through licensed pharmacies. Always confirm a provider's licensing and details before starting.",
  },
  {
    question: "Finasteride vs minoxidil — what's the difference?",
    answer:
      "Finasteride is an oral prescription that targets a hormone linked to hair loss, while minoxidil is a topical (and sometimes oral) treatment that supports hair growth. They work differently and are often used together under medical guidance.",
  },
  {
    question: "Can women use these treatments?",
    answer:
      "Some treatments, like certain minoxidil formulations, are used for women, while others (such as finasteride) are generally not recommended for women — especially during pregnancy. Women should use options formulated and approved for them under medical guidance.",
  },
];

export function hairLossSeed(base: SiteConfig): SiteConfig {
  return {
    ...base,
    siteName: "treatmentshub.com",
    hero: {
      ...base.hero,
      // No weight-loss hero image on hair-loss — upload one per vertical in the CMS.
      backgroundImageUrl: "",
      imageAlt: "",
      updatedLabel: "Last Updated: August 2026",
      h1: "Best Hair Loss Treatments & Providers of 2026",
      h2: "Compare the top hair-loss telehealth providers, side by side",
      description:
        "Compare the best hair-loss treatment providers — finasteride, minoxidil, and doctor-led regrowth programs — on treatment options, medical support, and overall value.",
    },
    providers,
    // Drop the weight-loss "social proof" stat and the weight-loss featured-
    // provider ad from the sidebar; keep the vertical-agnostic blocks. (The
    // remaining blocks read from this vertical's own providers.)
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
