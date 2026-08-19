import type {
  SiteConfig,
  Provider,
  ReviewData,
  BattleData,
  FaqItem,
  RankingPosition,
} from "../config";

// ─────────────────────────────────────────────────────────────────────────────
// TRT (testosterone replacement therapy) content skeleton
//
// Same rules as the hair-loss skeleton: real telehealth brands with truthful,
// general descriptions and NO invented data — affiliateUrl is "#", no Trustpilot
// ratings, and no specific prices. Everything is overridden the moment it's
// edited in the CMS, and the vertical stays unpublished until it's ready.
// ─────────────────────────────────────────────────────────────────────────────

const UPDATED = "2026-08-18";
const PRICING_TBD =
  "Pricing varies by program, labs, and treatment. Check the provider's site for current pricing.";

const providers: Provider[] = [
  {
    id: "hone",
    name: "Hone Health",
    tagline: "At-home hormone testing and online testosterone treatment for men",
    logo: "/logo-hone.svg",
    smallLogo: "/logo-hone.svg",
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
    logo: "/logo-fountain.svg",
    smallLogo: "/logo-fountain.svg",
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
    logo: "/logo-marek.svg",
    smallLogo: "/logo-marek.svg",
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
    logo: "/logo-blokes.svg",
    smallLogo: "/logo-blokes.svg",
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
    logo: "/maximuslogo.png",
    smallLogo: "/maximuslogo.png",
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
    logo: "/logo-defy.svg",
    smallLogo: "/logo-defy.svg",
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
  {
    slug: "marek",
    providerId: "marek",
    shortSummary:
      "Hormone optimization and health coaching built around comprehensive lab testing and provider guidance.",
    reviewIntro:
      "Marek Health is a hormone-optimization telehealth service that pairs comprehensive lab testing with provider guidance and health coaching. Rather than a one-size protocol, it focuses on interpreting detailed bloodwork and building an individualized plan — which can include testosterone therapy where appropriate — with ongoing coaching support. This review covers its approach and who it fits.",
    keyFeatures: [
      "Comprehensive lab panels",
      "Provider-guided hormone optimization",
      "Health coaching alongside treatment",
      "Ongoing lab-based monitoring",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Testosterone therapy (provider-directed)",
      "Broader hormone optimization",
      "Follow-up lab monitoring",
      "Health coaching",
    ],
    pros: [
      "In-depth lab testing and interpretation",
      "Coaching plus medical oversight",
      "Individualized optimization approach",
    ],
    cons: [
      "More involved than a basic TRT script",
      "Requires bloodwork and medical review",
      "Ongoing monitoring needed",
    ],
    bestFor: [
      "Men who want a data-driven, coached approach",
      "Those interested in broader hormone optimization",
      "People who value detailed lab work",
    ],
    finalVerdict:
      "Marek Health suits men who want a thorough, lab-driven approach to hormone optimization with coaching support. Confirm current pricing and eligibility on their site.",
    trustBadges: ["Comprehensive lab testing", "Provider-guided", "Coaching included"],
    updatedAt: UPDATED,
  },
  {
    slug: "blokes",
    providerId: "blokes",
    shortSummary:
      "Men's telehealth for hormone optimization, including TRT, built on lab-based, personalized plans.",
    reviewIntro:
      "Blokes is a men's telehealth platform focused on hormone optimization, including testosterone replacement therapy. It starts from lab work and a provider evaluation to build a personalized plan, with online access to providers for follow-up. This review outlines what it offers and who it fits.",
    keyFeatures: [
      "Lab-based evaluation",
      "Personalized hormone plans",
      "Online provider access",
      "Men's optimization focus",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Testosterone therapy (provider-directed)",
      "Personalized hormone protocols",
      "Follow-up monitoring",
    ],
    pros: [
      "Personalized, lab-based plans",
      "Men's-health focus",
      "Fully online access",
    ],
    cons: [
      "Requires bloodwork and medical review",
      "Ongoing treatment and monitoring",
      "Program specifics vary",
    ],
    bestFor: [
      "Men who want a personalized optimization plan",
      "Those comparing modern men's telehealth",
      "People who prefer an online process",
    ],
    finalVerdict:
      "Blokes is a solid option for men who want a personalized, lab-based approach to hormone optimization online. Confirm current pricing and details on their site.",
    trustBadges: ["Lab-based evaluation", "Personalized plans"],
    updatedAt: UPDATED,
  },
  {
    slug: "maximus",
    providerId: "maximus",
    shortSummary:
      "Telehealth testosterone support for men, including oral protocol options, with at-home testing and provider supervision.",
    reviewIntro:
      "Maximus offers telehealth testosterone support for men, notable for oral protocol options alongside more traditional approaches, with at-home testing and provider supervision. You start with testing, a provider reviews your results, and an appropriate protocol is prescribed and monitored. This review covers its approach and fit.",
    keyFeatures: [
      "Oral protocol options",
      "At-home testing to start",
      "Provider-supervised treatment",
      "Online follow-up",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Oral testosterone-support protocols",
      "Provider-directed testosterone therapy",
      "At-home lab testing",
      "Follow-up monitoring",
    ],
    pros: [
      "Oral options some competitors don't offer",
      "Convenient at-home testing",
      "Provider-supervised",
    ],
    cons: [
      "Suitability of oral options depends on your labs",
      "Requires medical review",
      "Ongoing monitoring needed",
    ],
    bestFor: [
      "Men interested in oral testosterone-support options",
      "Those who want an at-home, online start",
      "People comparing modern protocols",
    ],
    finalVerdict:
      "Maximus stands out for offering oral protocol options within a supervised, at-home telehealth model. Confirm current pricing and eligibility on their site.",
    trustBadges: ["At-home testing", "Provider-supervised", "Oral options"],
    updatedAt: UPDATED,
  },
  {
    slug: "defy",
    providerId: "defy",
    shortSummary:
      "An established telehealth clinic for hormone therapy and TRT, with individualized plans and ongoing monitoring.",
    reviewIntro:
      "Defy Medical is a long-standing telehealth clinic specializing in hormone therapy, including TRT. It's known for individualized treatment plans and thorough, ongoing monitoring rather than a one-size approach. This review outlines what it offers and who it fits.",
    keyFeatures: [
      "Established hormone-therapy clinic",
      "Individualized treatment plans",
      "Thorough ongoing monitoring",
      "Broad hormone-therapy experience",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Testosterone therapy (provider-directed)",
      "Broader hormone therapy options",
      "Follow-up lab monitoring",
    ],
    pros: [
      "Established, experienced clinic",
      "Highly individualized plans",
      "Comprehensive monitoring",
    ],
    cons: [
      "Requires bloodwork and medical review",
      "More clinical, less 'quick' than some apps",
      "Ongoing monitoring needed",
    ],
    bestFor: [
      "Men who want an experienced, individualized clinic",
      "Those with more complex needs",
      "People who value thorough monitoring",
    ],
    finalVerdict:
      "Defy Medical is a strong choice for men who want an established, individualized hormone-therapy clinic with thorough monitoring. Confirm current pricing and eligibility on their site.",
    trustBadges: ["Established clinic", "Individualized plans", "Ongoing monitoring"],
    updatedAt: UPDATED,
  },
];

// Editorial ranking scores for this vertical (independent, disclosed via the
// ranking methodology). Provisional order until affiliate partners are set — the
// operator can reorder in the CMS.
const positions: RankingPosition[] = [
  { score: 9.3, starRating: 5, label: "Excellent", badge: "Editor's Choice" },
  { score: 9.1, starRating: 5, label: "Excellent" },
  { score: 9.0, starRating: 5, label: "Excellent" },
  { score: 8.8, starRating: 4, label: "Very Good" },
  { score: 8.6, starRating: 4, label: "Very Good" },
  { score: 8.5, starRating: 4, label: "Very Good" },
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
  {
    slug: "marek-vs-blokes",
    provider1Id: "marek",
    provider2Id: "blokes",
    title: "Marek Health vs Blokes: Which Is Right for You?",
    subtitle: "Two men's hormone-optimization telehealth services, compared",
    description:
      "Compare Marek Health and Blokes for online hormone optimization and TRT — approach, lab testing, and who each one fits best.",
    intro:
      "Marek Health and Blokes both offer lab-based, provider-guided hormone optimization for men, including TRT. Marek leans into comprehensive testing and coaching, while Blokes emphasizes personalized, fully online plans. Here's how they compare.",
    verdict:
      "Both are personalized, lab-based options. Marek is the better fit if you want in-depth testing and coaching, while Blokes suits those who want a streamlined online plan. Confirm current pricing and details on each provider's site.",
    verdictWinnerPoints: [
      "Comprehensive lab panels and interpretation",
      "Health coaching alongside treatment",
    ],
    verdictLoserPoints: [
      "Personalized, fully online plans",
      "Men's optimization focus",
    ],
    winnerId: "marek",
    categories: [
      {
        name: "Approach",
        winner: "provider1",
        explanation:
          "Marek pairs comprehensive lab testing with coaching, while Blokes focuses on a streamlined personalized plan.",
        supportingPoints: [
          "Marek emphasizes detailed lab interpretation",
          "Blokes emphasizes a simple online plan",
        ],
      },
      {
        name: "Medical oversight",
        winner: "tie",
        explanation:
          "Both use lab work and licensed-provider evaluation before treatment.",
        supportingPoints: [
          "Lab-based evaluation at both",
          "Provider-supervised treatment at both",
        ],
      },
    ],
    features: [
      { feature: "Comprehensive labs", provider1Value: "Emphasized", provider2Value: "Yes", highlight: "provider1" },
      { feature: "Health coaching", provider1Value: "Yes", provider2Value: "See site", highlight: "provider1" },
      { feature: "Provider evaluation", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "hone-vs-defy",
    provider1Id: "hone",
    provider2Id: "defy",
    title: "Hone Health vs Defy Medical: Which Is Right for You?",
    subtitle: "A modern at-home service vs an established hormone clinic",
    description:
      "Compare Hone Health and Defy Medical for testosterone therapy — at-home convenience vs an established, individualized clinic.",
    intro:
      "Hone Health offers a modern, at-home testing and treatment experience, while Defy Medical is an established clinic known for individualized plans and thorough monitoring. Here's how they compare so you can pick what fits.",
    verdict:
      "Hone is the easier at-home starting point, while Defy suits those who want an experienced clinic and more individualized care. Confirm current pricing and eligibility on each provider's site.",
    verdictWinnerPoints: [
      "At-home testing and a streamlined start",
      "Ongoing telehealth monitoring",
    ],
    verdictLoserPoints: [
      "Established, experienced clinic",
      "Highly individualized plans",
    ],
    winnerId: "hone",
    categories: [
      {
        name: "Convenience",
        winner: "provider1",
        explanation:
          "Hone emphasizes an at-home, streamlined experience, while Defy is a more clinical, individualized service.",
        supportingPoints: [
          "Hone starts with at-home testing",
          "Defy focuses on individualized clinical care",
        ],
      },
      {
        name: "Depth of care",
        winner: "provider2",
        explanation:
          "Defy is an established clinic known for thorough, individualized monitoring.",
        supportingPoints: [
          "Defy offers broad hormone-therapy experience",
          "Individualized plans with ongoing monitoring",
        ],
      },
    ],
    features: [
      { feature: "At-home testing", provider1Value: "Yes", provider2Value: "See site", highlight: "provider1" },
      { feature: "Individualized care", provider1Value: "Yes", provider2Value: "Emphasized", highlight: "provider2" },
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
  {
    question: "How much does online TRT cost?",
    answer:
      "Costs vary widely by provider and depend on what's included — the initial labs, the provider visit, medication, and follow-up monitoring are sometimes bundled and sometimes billed separately. Because pricing changes, check each provider's site for current pricing before you start.",
  },
  {
    question: "How long does TRT take to work?",
    answer:
      "Many men begin to notice changes over the first several weeks to a few months, and different symptoms can improve on different timelines. Your provider monitors your labs and how you feel, and adjusts treatment as needed.",
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
      positions,
    },
    reviews,
    battles,
    faqs,
  };
}
