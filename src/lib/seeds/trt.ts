import type {
  SiteConfig,
  Provider,
  ReviewData,
  BattleData,
  FaqItem,
} from "../config";

// ─────────────────────────────────────────────────────────────────────────────
// TRT (testosterone replacement therapy) content skeleton
//
// Same rules as the hair-loss skeleton: real telehealth brands with truthful,
// general descriptions and NO invented data — affiliateUrl is "#", no Trustpilot
// ratings, and no specific prices. Everything is overridden the moment it's
// edited in the CMS, and the vertical stays unpublished until it's ready.
// ─────────────────────────────────────────────────────────────────────────────

const LOGO = "/provider-placeholder.svg";
const UPDATED = "2026-08-18";
const PRICING_TBD =
  "Pricing varies by program, labs, and treatment. Check the provider's site for current pricing.";

const providers: Provider[] = [
  {
    id: "hone",
    name: "Hone Health",
    tagline: "At-home hormone testing and online testosterone treatment for men",
    logo: LOGO,
    smallLogo: LOGO,
    highlights: [
      "At-home lab testing to start",
      "Licensed-provider evaluation",
      "Ongoing telehealth monitoring",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
  {
    id: "fountain",
    name: "Fountain TRT",
    tagline: "Online TRT clinic — testing, prescription, and follow-up for men",
    logo: LOGO,
    smallLogo: LOGO,
    highlights: [
      "Lab work reviewed by a provider",
      "Testosterone treatment options",
      "Remote follow-up care",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
  {
    id: "marek",
    name: "Marek Health",
    tagline: "Hormone optimization and health coaching with comprehensive lab testing",
    logo: LOGO,
    smallLogo: LOGO,
    highlights: [
      "Comprehensive lab panels",
      "Provider-guided optimization",
      "Coaching alongside treatment",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
  {
    id: "blokes",
    name: "Blokes",
    tagline: "Men's telehealth for hormone optimization, including TRT",
    logo: LOGO,
    smallLogo: LOGO,
    highlights: [
      "Personalized hormone plans",
      "Lab-based evaluation",
      "Online provider access",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
  {
    id: "maximus",
    name: "Maximus",
    tagline: "Telehealth testosterone support, including oral options",
    logo: LOGO,
    smallLogo: LOGO,
    highlights: [
      "Oral and other protocol options",
      "Provider-supervised treatment",
      "At-home testing",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
  {
    id: "defy",
    name: "Defy Medical",
    tagline: "Telehealth clinic for hormone therapy and TRT",
    logo: LOGO,
    smallLogo: LOGO,
    highlights: [
      "Established hormone-therapy clinic",
      "Individualized treatment plans",
      "Ongoing monitoring",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
];

const reviews: ReviewData[] = [
  {
    slug: "hone",
    providerId: "hone",
    shortSummary:
      "A men's telehealth service that starts with at-home hormone testing and connects you with providers for testosterone treatment.",
    reviewIntro:
      "Hone Health offers at-home hormone testing followed by a licensed-provider evaluation and, where appropriate, testosterone treatment with ongoing monitoring. This review outlines its approach and who it may suit.",
    keyFeatures: [
      "At-home lab testing to begin",
      "Licensed-provider evaluation",
      "Ongoing telehealth monitoring",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Testosterone treatment (provider-directed)",
      "Follow-up lab monitoring",
    ],
    pros: [
      "Convenient at-home start",
      "Lab-based, provider-supervised approach",
      "Remote monitoring",
    ],
    cons: [
      "Requires lab work and medical review",
      "Ongoing treatment and monitoring needed",
    ],
    bestFor: [
      "Men who want an at-home, online path to evaluation",
      "Those comparing modern TRT telehealth options",
    ],
    finalVerdict:
      "Hone Health is a convenient, lab-based option for men exploring testosterone treatment online. Confirm current pricing and eligibility on their site.",
    trustBadges: ["Licensed US providers", "Lab-based evaluation"],
    updatedAt: UPDATED,
  },
  {
    slug: "fountain",
    providerId: "fountain",
    shortSummary:
      "An online TRT clinic offering testing, prescription treatment, and remote follow-up for men.",
    reviewIntro:
      "Fountain TRT is an online clinic focused on testosterone replacement therapy — lab work, provider review, and remote follow-up. This review covers what's included and who it fits.",
    keyFeatures: [
      "Lab work reviewed by a provider",
      "Testosterone treatment options",
      "Remote follow-up care",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: ["Testosterone treatment (provider-directed)", "Follow-up monitoring"],
    pros: [
      "TRT-focused service",
      "Provider-supervised",
      "Fully online process",
    ],
    cons: [
      "Requires bloodwork and medical review",
      "Ongoing use and monitoring",
    ],
    bestFor: [
      "Men who want a focused, online TRT program",
      "Those comparing dedicated TRT clinics",
    ],
    finalVerdict:
      "Fountain TRT is a focused, convenient online TRT option. Verify current pricing and details on their site.",
    trustBadges: ["Licensed US providers", "Remote monitoring"],
    updatedAt: UPDATED,
  },
];

const battles: BattleData[] = [
  {
    slug: "hone-vs-fountain",
    provider1Id: "hone",
    provider2Id: "fountain",
    title: "Hone Health vs Fountain TRT: Which Is Right for You?",
    subtitle: "Two online testosterone-therapy services, compared",
    description:
      "Compare Hone Health and Fountain TRT for online testosterone treatment — testing, approach, and who each one fits best.",
    intro:
      "Hone Health and Fountain TRT both offer online testosterone treatment starting from lab work and provider review. Here's how they compare so you can choose the one that fits you.",
    verdict:
      "Both are lab-based, provider-supervised online options. Your best fit depends on program structure and pricing — confirm details on each provider's site.",
    verdictWinnerPoints: [
      "At-home testing to start",
      "Ongoing telehealth monitoring",
    ],
    verdictLoserPoints: [
      "Dedicated TRT-clinic focus",
      "Remote follow-up care",
    ],
    winnerId: "hone",
    categories: [
      {
        name: "Approach",
        winner: "tie",
        explanation:
          "Both begin with lab testing and a licensed-provider review before any treatment.",
        supportingPoints: [
          "Lab-based evaluation at both",
          "Provider-supervised treatment at both",
        ],
      },
    ],
    features: [
      { feature: "At-home testing", provider1Value: "Yes", provider2Value: "See site", highlight: "none" },
      { feature: "Provider evaluation", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Ongoing monitoring", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
];

const faqs: FaqItem[] = [
  {
    question: "What is TRT and how does it work?",
    answer:
      "Testosterone replacement therapy (TRT) restores testosterone in men with clinically low levels, using formulations such as injections, gels, or other options prescribed by a provider. It's a medical treatment that requires evaluation and monitoring.",
  },
  {
    question: "Do I need bloodwork before starting TRT?",
    answer:
      "Yes. Reputable providers require lab testing to confirm low testosterone and assess your overall health before prescribing, and typically re-test during treatment to monitor your response and safety.",
  },
  {
    question: "Is online TRT legitimate?",
    answer:
      "Legitimate telehealth TRT providers connect you with licensed clinicians who review your labs and history before prescribing, and dispense through licensed pharmacies. Always confirm a provider's licensing and monitoring practices.",
  },
  {
    question: "What are the possible side effects of testosterone therapy?",
    answer:
      "TRT can have side effects and isn't appropriate for everyone. Possible effects and risks should be discussed with a licensed provider, who will weigh them against your individual situation and monitor you during treatment.",
  },
  {
    question: "How is testosterone administered?",
    answer:
      "Depending on the provider and your plan, testosterone may be given as injections, topical gels or creams, or other forms. A provider recommends the option that fits your needs.",
  },
];

export function trtSeed(base: SiteConfig): SiteConfig {
  return {
    ...base,
    siteName: "treatmentshub.com",
    hero: {
      ...base.hero,
      backgroundImageUrl: "",
      imageAlt: "",
      updatedLabel: "Last Updated: August 2026",
      h1: "Best TRT Clinics & Online Providers of 2026",
      h2: "Compare the top online testosterone-therapy providers, side by side",
      description:
        "Compare the best online TRT providers — testing, treatment options, medical supervision, and overall value — to find the program that fits you.",
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
