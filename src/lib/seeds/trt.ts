import type {
  SiteConfig,
  Provider,
  ReviewData,
  BattleData,
  FaqItem,
  RankingPosition,
} from "../config";

// ─────────────────────────────────────────────────────────────────────────────
// TRT (testosterone replacement therapy) content
//
// Launch set for the TRT vertical: the five providers we monetize — Maximus,
// Hims, DudeMeds, PeterMD and Male Excel — with truthful, general descriptions
// grounded in their public offering. It carries NO invented data: no Trustpilot
// ratings, no specific prices (pricing points to the provider's site). Real
// affiliate links and brand logos are filled in before the vertical is added to
// PUBLISHED_VERTICALS. Everything here is overridden when edited in the CMS.
// ─────────────────────────────────────────────────────────────────────────────

const UPDATED = "2026-08-19";
const PRICING_TBD =
  "Pricing varies by program, labs, and treatment. Check the provider's site for current pricing.";

// Provider destinations. These are the brands' own sites so the page is live and
// functional for affiliate-program applications; swap each for its tracked
// affiliate link once approved.
const URLS: Record<string, string> = {
  maximus: "https://www.maximustribe.com/",
  hims: "https://www.hims.com/",
  dudemeds: "https://www.dudemeds.com/",
  petermd: "https://getpetermd.com/",
  maleexcel: "https://maleexcel.com/",
};

const providers: Provider[] = [
  {
    id: "maximus",
    name: "Maximus",
    tagline: "Telehealth testosterone support for men — including oral protocol options — with at-home testing",
    logo: "/maximuslogo.png",
    smallLogo: "/maximuslogo.png",
    highlights: [
      "Oral protocol options plus traditional TRT",
      "At-home testing to start",
      "Board-certified doctor oversight",
    ],
    affiliateUrl: URLS.maximus,
    ctaText: "Visit Site",
  },
  {
    id: "hims",
    name: "Hims",
    tagline: "Recognizable men's telehealth brand — testosterone replacement therapy, 100% online",
    logo: "/logos/hims.svg",
    smallLogo: "/logos/hims.svg",
    highlights: [
      "Injectable testosterone (cypionate)",
      "Online labs and provider evaluation",
      "Broad men's-health platform",
    ],
    affiliateUrl: URLS.hims,
    ctaText: "Visit Site",
  },
  {
    id: "dudemeds",
    name: "DudeMeds",
    tagline: "Physician-founded online TRT — injectable testosterone and enclomiphene, with at-home labs",
    logo: "/logo-dudemeds.svg",
    smallLogo: "/logo-dudemeds.svg",
    highlights: [
      "Injectable testosterone (cypionate), supplies included",
      "Enclomiphene option — helps preserve fertility",
      "At-home or uploaded labs; founded by physicians",
    ],
    affiliateUrl: URLS.dudemeds,
    ctaText: "Visit Site",
  },
  {
    id: "petermd",
    name: "PeterMD",
    tagline: "One of North America's largest online men's-health clinics — testosterone therapy with flexible plans",
    logo: "/logo-petermd.svg",
    smallLogo: "/logo-petermd.svg",
    highlights: [
      "Injectable testosterone cypionate (weekly)",
      "Flexible monthly and yearly plans",
      "Labs and clinician oversight included",
    ],
    affiliateUrl: URLS.petermd,
    ctaText: "Visit Site",
  },
  {
    id: "maleexcel",
    name: "Male Excel",
    tagline: "TRT-focused telehealth — testosterone cream, injections and oral options, with at-home testing",
    logo: "/logo-maleexcel.svg",
    smallLogo: "/logo-maleexcel.svg",
    highlights: [
      "Cream, injection and oral (Kyzatrex) options",
      "At-home testosterone testing",
      "90-day satisfaction guarantee",
    ],
    affiliateUrl: URLS.maleexcel,
    ctaText: "Visit Site",
  },
];

// Editorial ranking scores (independent, disclosed via the ranking methodology).
const positions: RankingPosition[] = [
  { score: 9.4, starRating: 5, label: "Excellent", badge: "Editor's Choice" },
  { score: 9.2, starRating: 5, label: "Excellent" },
  { score: 9.0, starRating: 5, label: "Excellent" },
  { score: 8.8, starRating: 4, label: "Very Good" },
  { score: 8.6, starRating: 4, label: "Very Good" },
];

const reviews: ReviewData[] = [
  {
    slug: "maximus",
    providerId: "maximus",
    shortSummary:
      "Telehealth testosterone support for men, notable for oral protocol options alongside traditional approaches, with at-home testing and provider supervision.",
    reviewIntro:
      "Maximus offers telehealth testosterone support for men, notable for oral protocol options alongside more traditional approaches, with at-home testing and provider supervision. You start with testing, a provider reviews your results, and an appropriate protocol is prescribed and monitored. This review covers its approach and who it fits.",
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
      "Board-certified doctor oversight",
    ],
    cons: [
      "Suitability of oral options depends on your labs",
      "Requires a medical review",
      "Ongoing monitoring needed",
    ],
    bestFor: [
      "Men interested in oral testosterone-support options",
      "Those who want an at-home, online start",
      "People comparing modern protocols",
    ],
    finalVerdict:
      "Maximus stands out for offering oral protocol options within a supervised, at-home telehealth model. Confirm current pricing and eligibility on their site.",
    trustBadges: ["At-home testing", "Board-certified doctors", "Oral options"],
    updatedAt: UPDATED,
  },
  {
    slug: "hims",
    providerId: "hims",
    shortSummary:
      "A recognizable men's telehealth brand offering testosterone replacement therapy — injectable cypionate — after online labs and a provider review.",
    reviewIntro:
      "Hims is one of the most recognizable men's telehealth brands, and its testosterone offering follows the same simple, online model: complete lab work, have a licensed provider review your results, and — if appropriate — receive injectable testosterone (cypionate) with ongoing support. This review outlines what it offers and who it fits.",
    keyFeatures: [
      "Injectable testosterone (cypionate)",
      "Online labs and licensed-provider evaluation",
      "Broad men's-health platform",
      "Discreet home delivery",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Testosterone cypionate injection",
      "Provider-directed dosing",
      "Lab-based monitoring",
    ],
    pros: [
      "Recognizable, mainstream brand",
      "Simple, fully online process",
      "Broad men's-health range",
    ],
    cons: [
      "A more standard TRT set",
      "Requires labs and a medical review",
      "Ongoing monitoring needed",
    ],
    bestFor: [
      "Men who want a simple, mainstream online option",
      "Those comparing well-known telehealth brands",
    ],
    finalVerdict:
      "Hims is a solid, recognizable option for men starting testosterone therapy online. If you want oral options or specialized hormone care, compare it against our top-ranked providers. Confirm current pricing on their site.",
    trustBadges: ["Licensed US providers", "Discreet shipping"],
    updatedAt: UPDATED,
  },
  {
    slug: "dudemeds",
    providerId: "dudemeds",
    shortSummary:
      "A physician-founded telehealth clinic offering injectable testosterone (cypionate) and enclomiphene, with at-home lab options.",
    reviewIntro:
      "DudeMeds is a physician-founded telehealth clinic focused on men's hormone care. It offers injectable testosterone (cypionate) — the long-standing standard for TRT — as well as enclomiphene, a medication that stimulates the body's own testosterone and can help preserve fertility. You provide labs (at-home or uploaded), a licensed provider reviews them, and treatment ships to your door. This review covers its approach and fit.",
    keyFeatures: [
      "Injectable testosterone cypionate, supplies included",
      "Enclomiphene option — helps preserve fertility",
      "At-home or uploaded labs",
      "Founded by two physicians",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Testosterone cypionate injection",
      "Enclomiphene (a fertility-preserving option)",
      "At-home lab testing",
      "Provider-directed protocol",
    ],
    pros: [
      "Both injectable TRT and fertility-preserving enclomiphene",
      "Physician-founded, fully online",
      "At-home labs with supplies included",
    ],
    cons: [
      "Requires labs and a medical review",
      "Men-focused",
      "Ongoing monitoring needed",
    ],
    bestFor: [
      "Men who want injections or enclomiphene",
      "Those who want to preserve fertility",
      "People who value an at-home, streamlined process",
    ],
    finalVerdict:
      "DudeMeds is a strong pick for men who want flexibility between injectable TRT and fertility-preserving enclomiphene, under physician-founded care. Confirm current pricing and eligibility on their site.",
    trustBadges: ["Physician-founded", "At-home lab option", "Supplies included"],
    updatedAt: UPDATED,
  },
  {
    slug: "petermd",
    providerId: "petermd",
    shortSummary:
      "One of the largest online men's-health clinics in North America, offering testosterone cypionate injections with flexible plans and clinician oversight.",
    reviewIntro:
      "PeterMD is one of the largest online men's-health clinics in North America, offering testosterone replacement therapy alongside other men's-health services. Its TRT is built around injectable testosterone cypionate (typically weekly, self-administered), with labs and clinician oversight included, and flexible monthly or yearly plans. This review outlines what it offers and who it fits.",
    keyFeatures: [
      "Injectable testosterone cypionate (weekly)",
      "Flexible monthly and yearly plans",
      "Labs and clinician oversight included",
      "Large, established men's-health clinic",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Testosterone cypionate (subcutaneous or intramuscular)",
      "Provider-directed dosing",
      "Lab-based monitoring",
    ],
    pros: [
      "Established, large men's-health clinic",
      "Flexible plan options",
      "Labs and oversight included",
    ],
    cons: [
      "Injectable-focused",
      "Requires labs and a medical review",
      "Ongoing monitoring needed",
    ],
    bestFor: [
      "Men who want an established, high-volume clinic",
      "Those who want flexible plan lengths",
      "People comparing value-focused TRT",
    ],
    finalVerdict:
      "PeterMD suits men who want an established, affordable clinic with flexible plans and included labs. Confirm current pricing and eligibility on their site.",
    trustBadges: ["Established clinic", "Labs included", "Flexible plans"],
    updatedAt: UPDATED,
  },
  {
    slug: "maleexcel",
    providerId: "maleexcel",
    shortSummary:
      "A TRT-focused telehealth clinic offering testosterone cream, injections and oral options, built around at-home testing and a satisfaction guarantee.",
    reviewIntro:
      "Male Excel is a TRT-focused telehealth clinic that stands out for offering all three main delivery routes — testosterone cream (with a daily microdosing approach), injectable cypionate, and an oral option (Kyzatrex) — built around at-home testosterone testing and telemedicine. It also backs treatment with a 90-day satisfaction guarantee. This review outlines its approach and fit.",
    keyFeatures: [
      "Cream, injection and oral (Kyzatrex) options",
      "At-home testosterone testing",
      "Daily microdosing cream approach",
      "90-day satisfaction guarantee",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Testosterone cream (daily microdosing)",
      "Testosterone cypionate injection",
      "Oral testosterone undecanoate (Kyzatrex)",
      "At-home lab testing",
    ],
    pros: [
      "All three delivery routes — cream, injection and oral",
      "At-home testing and needle-free options",
      "90-day satisfaction guarantee",
    ],
    cons: [
      "Cream and oral can cost more than generic injections",
      "Requires labs and a medical review",
      "Ongoing monitoring needed",
    ],
    bestFor: [
      "Men who want needle-free options (cream or oral)",
      "Those who prefer daily microdosing",
      "Anyone who values a satisfaction guarantee",
    ],
    finalVerdict:
      "Male Excel is a strong choice for men who want flexibility in how they take testosterone — especially needle-free cream or oral options — with at-home testing and a guarantee. Confirm current pricing and eligibility on their site.",
    trustBadges: ["At-home testing", "90-day guarantee", "Cream, injection & oral"],
    updatedAt: UPDATED,
  },
];

const battles: BattleData[] = [
  {
    slug: "maximus-vs-hims",
    provider1Id: "maximus",
    provider2Id: "hims",
    title: "Maximus vs Hims: Which Is Better for TRT?",
    subtitle: "A specialized hormone service vs a mainstream men's brand",
    description:
      "Compare Maximus and Hims for online testosterone therapy — treatment options, approach, and which is the better fit.",
    intro:
      "Maximus and Hims both offer online testosterone treatment after lab work and a provider review. Maximus leans into specialized hormone options (including oral protocols), while Hims is a recognizable mainstream brand with a broad men's-health platform. Here's how they compare.",
    verdict:
      "Both are legitimate online options. Maximus is our pick for men who want specialized hormone care and oral options, while Hims is a fine mainstream choice if brand familiarity matters most. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Oral protocol options plus traditional TRT",
      "At-home testing and doctor oversight",
      "Hormone-optimization focus",
    ],
    verdictLoserPoints: [
      "Recognizable, mainstream brand",
      "Broad men's-health product range",
      "Simple, familiar online experience",
    ],
    winnerId: "maximus",
    categories: [
      {
        name: "Treatment options",
        winner: "provider1",
        explanation:
          "Maximus offers oral protocol options alongside traditional testosterone, while Hims centers on injectable cypionate.",
        supportingPoints: ["Oral options available at Maximus", "Injectable-focused at Hims"],
      },
      {
        name: "Brand recognition",
        winner: "provider2",
        explanation: "Hims is one of the most recognizable men's telehealth brands.",
        supportingPoints: ["Widely known brand", "Broad product range"],
      },
      {
        name: "Medical oversight",
        winner: "tie",
        explanation: "Both require lab work and a licensed-provider review before treatment.",
        supportingPoints: ["Lab-based evaluation at both", "Provider-supervised treatment"],
      },
    ],
    features: [
      { feature: "Injectable testosterone", provider1Value: "Available", provider2Value: "Available", highlight: "both" },
      { feature: "Oral option", provider1Value: "Yes", provider2Value: "See site", highlight: "provider1" },
      { feature: "At-home testing", provider1Value: "Yes", provider2Value: "See site", highlight: "provider1" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "dudemeds-vs-petermd",
    provider1Id: "dudemeds",
    provider2Id: "petermd",
    title: "DudeMeds vs PeterMD: Which Online TRT Clinic Is Better?",
    subtitle: "Physician-founded flexibility vs a large, established clinic",
    description:
      "Compare DudeMeds and PeterMD for online testosterone therapy — treatment options, plans, and which fits you best.",
    intro:
      "DudeMeds and PeterMD are both affordable, fully online TRT clinics. DudeMeds is physician-founded and offers both injectable testosterone and fertility-preserving enclomiphene, while PeterMD is one of the largest men's-health clinics with flexible plans. Here's how they compare.",
    verdict:
      "Both are solid, value-focused options. DudeMeds is our pick if you want the choice of enclomiphene to help preserve fertility, while PeterMD suits those who want a large, established clinic with flexible plan lengths. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Injectable testosterone and enclomiphene",
      "Physician-founded, at-home labs",
      "Fertility-preserving option",
    ],
    verdictLoserPoints: [
      "Large, established men's-health clinic",
      "Flexible monthly and yearly plans",
      "Labs and oversight included",
    ],
    winnerId: "dudemeds",
    categories: [
      {
        name: "Treatment options",
        winner: "provider1",
        explanation:
          "DudeMeds offers both injectable testosterone and enclomiphene, giving men a fertility-preserving alternative; PeterMD centers on injectable cypionate.",
        supportingPoints: ["Enclomiphene available at DudeMeds", "Injectable-focused at PeterMD"],
      },
      {
        name: "Scale and plans",
        winner: "provider2",
        explanation:
          "PeterMD is one of the largest online men's-health clinics, with flexible monthly and yearly plans.",
        supportingPoints: ["Large, established clinic", "Flexible plan lengths"],
      },
    ],
    features: [
      { feature: "Injectable testosterone", provider1Value: "Available", provider2Value: "Available", highlight: "both" },
      { feature: "Enclomiphene option", provider1Value: "Yes", provider2Value: "See site", highlight: "provider1" },
      { feature: "Flexible plan lengths", provider1Value: "See site", provider2Value: "Yes", highlight: "provider2" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "hims-vs-male-excel",
    provider1Id: "maleexcel",
    provider2Id: "hims",
    title: "Hims vs Male Excel: Which Is Better for TRT?",
    subtitle: "A mainstream brand vs a TRT-focused clinic with more delivery options",
    description:
      "Compare Hims and Male Excel for testosterone therapy — delivery options, approach, and which fits you best.",
    intro:
      "Hims is a recognizable mainstream men's brand, while Male Excel is a TRT-focused clinic offering all three delivery routes — cream, injection and oral. Both start from lab work and a provider review; here's how they compare.",
    verdict:
      "Both are legitimate online options. Male Excel is our pick for men who want needle-free options (cream or oral) and a satisfaction guarantee, while Hims is a simple, familiar mainstream choice. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Cream, injection and oral (Kyzatrex) options",
      "At-home testing and a 90-day guarantee",
      "TRT-focused specialization",
    ],
    verdictLoserPoints: [
      "Recognizable, mainstream brand",
      "Broad men's-health platform",
      "Simple, familiar online experience",
    ],
    winnerId: "maleexcel",
    categories: [
      {
        name: "Delivery options",
        winner: "provider1",
        explanation:
          "Male Excel offers cream, injection and oral testosterone, while Hims centers on injectable cypionate.",
        supportingPoints: ["Needle-free cream and oral options at Male Excel", "Injectable-focused at Hims"],
      },
      {
        name: "Brand recognition",
        winner: "provider2",
        explanation: "Hims is one of the most recognizable men's telehealth brands.",
        supportingPoints: ["Widely known brand", "Broad product range"],
      },
    ],
    features: [
      { feature: "Injectable testosterone", provider1Value: "Available", provider2Value: "Available", highlight: "both" },
      { feature: "Cream / oral options", provider1Value: "Yes", provider2Value: "See site", highlight: "provider1" },
      { feature: "Satisfaction guarantee", provider1Value: "90-day", provider2Value: "See site", highlight: "provider1" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
];

const faqs: FaqItem[] = [
  {
    question: "What is TRT and how does it work?",
    answer:
      "Testosterone replacement therapy (TRT) restores testosterone in men with clinically low levels, using formulations such as injections, creams/gels, or oral options prescribed by a provider. It's a medical treatment that requires evaluation and monitoring.",
  },
  {
    question: "Do I need bloodwork before starting TRT?",
    answer:
      "Yes. Reputable providers require lab testing to confirm low testosterone and assess your overall health before prescribing, and typically re-test during treatment to monitor your response and safety.",
  },
  {
    question: "Injections, cream or oral — which is best?",
    answer:
      "Each route has trade-offs. Injections are common and cost-effective; creams are needle-free and applied daily; oral options (like testosterone undecanoate) avoid needles entirely. Some providers offer all three. A clinician helps you choose based on your labs, goals and preferences.",
  },
  {
    question: "What is enclomiphene, and how is it different from TRT?",
    answer:
      "Enclomiphene stimulates your body's own testosterone production rather than replacing it directly, which can help preserve fertility — a reason some men choose it over traditional TRT. Whether it's appropriate depends on your labs and goals, and it requires a provider's evaluation.",
  },
  {
    question: "Is online TRT legitimate?",
    answer:
      "Legitimate telehealth TRT providers connect you with licensed clinicians who review your labs and history before prescribing, and dispense through licensed pharmacies. Always confirm a provider's licensing and monitoring practices.",
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
      h1: "Best TRT Clinics & Online Testosterone Replacement Therapy Providers of 2026",
      h2: "Compare the top online testosterone replacement therapy (TRT) providers, side by side",
      description:
        "Compare the best online TRT providers — testosterone injections, creams, oral options and enclomiphene — on testing, treatment options, medical supervision, and overall value.",
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
