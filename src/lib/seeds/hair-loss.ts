import type {
  SiteConfig,
  Provider,
  ReviewData,
  BattleData,
  FaqItem,
  RankingPosition,
} from "../config";

// ─────────────────────────────────────────────────────────────────────────────
// Hair-loss content
//
// Launch set for the hair-loss vertical: the two providers we monetize —
// Maximus and Happy Head — with truthful, general descriptions grounded in
// their public offering. It carries NO invented data:
//   • no Trustpilot rating/count (never fabricate ratings on a health site)
//   • no specific prices         (pricing text points to the provider's site)
//   • affiliateUrl / logo are filled with the real links & brand logos before
//     the vertical is added to PUBLISHED_VERTICALS.
// Everything here is overridden the moment it's edited in the CMS.
// ─────────────────────────────────────────────────────────────────────────────

// Real brand wordmarks + affiliate links for the launch providers.
const MAXIMUS_LOGO = "/logo-maximus.svg";
const HAPPYHEAD_LOGO = "/logo-happyhead.svg";
const MAXIMUS_URL = "https://track.revoffers.com/aff_c?offer_id=1347&aff_id=13399&url_id=10972";
const HAPPYHEAD_URL = "https://track.revoffers.com/aff_c?offer_id=1389&aff_id=13399&url_id=12477";
const UPDATED = "2026-08-18";

const providers: Provider[] = [
  {
    id: "maximus",
    name: "Maximus",
    tagline: "Doctor-prescribed oral & topical hair-loss treatment for men — finasteride, minoxidil & dutasteride",
    logo: MAXIMUS_LOGO,
    smallLogo: MAXIMUS_LOGO,
    highlights: [
      "Oral finasteride, minoxidil & dutasteride options",
      "Compounded topical formula (dutasteride, minoxidil, tretinoin, fexofenadine)",
      "Board-certified doctor review; free, discreet delivery",
    ],
    affiliateUrl: MAXIMUS_URL,
    ctaText: "Visit Site",
  },
  {
    id: "happyhead",
    name: "Happy Head",
    tagline: "Dermatologist-founded, personalized prescription hair-loss formulas — topical & oral, for men & women",
    logo: HAPPYHEAD_LOGO,
    smallLogo: HAPPYHEAD_LOGO,
    highlights: [
      "Custom topical & oral prescription formulas",
      "FDA-approved actives: finasteride, minoxidil, dutasteride, spironolactone",
      "Dermatologist-founded; free online consultation",
    ],
    affiliateUrl: HAPPYHEAD_URL,
    ctaText: "Visit Site",
  },
];

// Honest placeholder for pricing — no invented numbers.
const PRICING_TBD =
  "Pricing varies by treatment and plan. Check the provider's site for current pricing.";

// Editorial ranking scores for this vertical (independent, disclosed via the
// ranking methodology). Maximus leads the launch set per our review.
const positions: RankingPosition[] = [
  { score: 9.4, starRating: 5, label: "Excellent", badge: "Editor's Choice" },
  { score: 9.2, starRating: 5, label: "Excellent" },
];

const reviews: ReviewData[] = [
  {
    slug: "maximus",
    providerId: "maximus",
    shortSummary:
      "Doctor-prescribed hair-loss treatment for men — oral finasteride, minoxidil and dutasteride plus a compounded topical formula — reviewed by board-certified doctors and delivered to your door.",
    reviewIntro:
      "Maximus offers personalized, doctor-prescribed hair-loss treatment for men, spanning oral finasteride, oral minoxidil and oral dutasteride, as well as a compounded topical formula (dutasteride, minoxidil, tretinoin and fexofenadine). You complete a short medical questionnaire, a board-certified doctor reviews whether the protocol is appropriate, and approved medication ships free and discreetly. This review covers what Maximus offers, how it works, and who it fits.",
    keyFeatures: [
      "Oral finasteride, oral minoxidil and oral dutasteride options",
      "Compounded topical formula: dutasteride, minoxidil, tretinoin, fexofenadine",
      "Board-certified doctor reviews your medical questionnaire",
      "Free, discreet delivery to your door",
      "Focused on men's hair regrowth",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Oral finasteride",
      "Oral minoxidil",
      "Oral dutasteride",
      "Compounded topical formula (dutasteride, minoxidil, tretinoin, fexofenadine)",
    ],
    pros: [
      "Broad range of prescription options, including dutasteride",
      "Both oral and topical routes available",
      "Board-certified doctor oversight",
      "Free, discreet shipping",
    ],
    cons: [
      "Men-focused — not formulated for women",
      "Prescription treatments require a medical review",
      "Ongoing use is needed to maintain results",
    ],
    bestFor: [
      "Men who want prescription-strength options beyond finasteride and minoxidil",
      "Those open to oral dutasteride or a compounded topical",
      "People who prefer a fully online, doctor-reviewed process",
    ],
    finalVerdict:
      "Maximus is a strong pick for men who want a broader set of prescription hair-loss options — including dutasteride and a compounded topical — under board-certified doctor oversight. Confirm current pricing and eligibility on their site.",
    trustBadges: ["Board-certified doctors", "Free discreet delivery", "Prescription options"],
    updatedAt: UPDATED,
  },
  {
    slug: "happyhead",
    providerId: "happyhead",
    shortSummary:
      "Dermatologist-founded telehealth offering personalized prescription hair-loss formulas — custom topical and oral options with FDA-approved actives — for both men and women.",
    reviewIntro:
      "Happy Head is a dermatologist-founded telehealth service (based in Santa Monica, California) built around personalized prescription hair-loss formulas for men and women. Its customizable topical solutions and oral options combine FDA-approved actives — finasteride, minoxidil, dutasteride and spironolactone — and its topical serums go up to 8% minoxidil, above the 5% typical of over-the-counter products. A free online consultation is included, and prescription products are reviewed by Happy Head's dermatologists.",
    keyFeatures: [
      "Personalized topical and oral prescription formulas",
      "FDA-approved actives: finasteride, minoxidil, dutasteride, spironolactone",
      "Topical minoxidil available up to 8% (vs 5% typical OTC)",
      "Formulas for both men and women",
      "Dermatologist-founded; free online consultation",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Custom topical solutions (finasteride / minoxidil / dutasteride)",
      "Oral prescription tablets",
      "Formulas tailored for men and women",
      "Add or remove actives to personalize",
    ],
    pros: [
      "Highly personalized formulas",
      "Options for both men and women",
      "Higher-strength topical minoxidil available",
      "Dermatologist-founded, with a free online consultation",
    ],
    cons: [
      "Custom prescription formulas can cost more than generics",
      "Prescription requires a medical review",
      "Continued use is needed to maintain results",
    ],
    bestFor: [
      "People who want a tailored topical or oral formula",
      "Women seeking dermatologist-directed options",
      "Anyone wanting higher-strength topical minoxidil under medical guidance",
    ],
    finalVerdict:
      "Happy Head suits people who want a personalized, dermatologist-directed plan — with strong topical options and formulas for both men and women. Confirm current pricing and eligibility on their site.",
    trustBadges: ["Dermatologist-founded", "Personalized formulas", "Free online consultation"],
    updatedAt: UPDATED,
  },
];

const battles: BattleData[] = [
  {
    slug: "maximus-vs-happy-head",
    provider1Id: "maximus",
    provider2Id: "happyhead",
    title: "Maximus vs Happy Head: Which Hair-Loss Provider Is Right for You?",
    subtitle: "Two personalized prescription hair-loss services, compared",
    description:
      "Compare Maximus and Happy Head for online hair-loss treatment — treatment options, who each serves, and which fits you best.",
    intro:
      "Maximus and Happy Head both offer personalized, doctor-directed hair-loss treatment online, with oral and topical prescription options. Maximus is men-focused and leans into prescription breadth (including oral dutasteride and a compounded topical), while Happy Head is dermatologist-founded and serves both men and women with highly customizable formulas. Here's how they compare.",
    verdict:
      "Both are strong, doctor-directed options. Maximus is our top pick for men who want the broadest prescription toolkit under board-certified oversight, while Happy Head is the better fit for women or anyone who wants a highly personalized topical formula. Confirm current pricing and eligibility on each provider's site.",
    verdictWinnerPoints: [
      "Broad prescription options, including oral dutasteride",
      "Compounded topical plus multiple oral routes",
      "Board-certified doctor oversight",
    ],
    verdictLoserPoints: [
      "Dermatologist-founded, serves men and women",
      "Highly customizable topical and oral formulas",
      "Higher-strength topical minoxidil available",
    ],
    winnerId: "maximus",
    categories: [
      {
        name: "Who it serves",
        winner: "provider2",
        explanation:
          "Happy Head formulates for both men and women, while Maximus is focused on men.",
        supportingPoints: [
          "Happy Head offers formulas for women, including options like spironolactone",
          "Maximus concentrates on men's hair regrowth",
        ],
      },
      {
        name: "Treatment breadth",
        winner: "provider1",
        explanation:
          "Maximus offers a wide prescription toolkit — oral finasteride, minoxidil and dutasteride plus a compounded topical.",
        supportingPoints: [
          "Oral dutasteride available alongside finasteride and minoxidil",
          "Compounded topical combining several actives",
        ],
      },
      {
        name: "Personalization",
        winner: "provider2",
        explanation:
          "Happy Head is built around customizable formulas you can tailor by adding or removing actives.",
        supportingPoints: [
          "Add or remove active ingredients to personalize",
          "Topical minoxidil available up to 8%",
        ],
      },
    ],
    features: [
      { feature: "Oral finasteride", provider1Value: "Available", provider2Value: "Available", highlight: "both" },
      { feature: "Oral dutasteride", provider1Value: "Available", provider2Value: "Available", highlight: "both" },
      { feature: "Topical formula", provider1Value: "Compounded topical", provider2Value: "Custom topical (up to 8% minoxidil)", highlight: "none" },
      { feature: "For women", provider1Value: "No", provider2Value: "Yes", highlight: "provider2" },
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
    question: "Finasteride vs minoxidil vs dutasteride — what's the difference?",
    answer:
      "Finasteride and dutasteride are prescription medicines that reduce DHT, a hormone linked to hair loss (dutasteride blocks it more broadly). Minoxidil is a topical — and sometimes oral — treatment that supports hair growth through a different mechanism. They're often combined under medical guidance; a provider can advise what's appropriate for you.",
  },
  {
    question: "Topical or oral — which is better for hair loss?",
    answer:
      "Both routes can be effective. Oral medication is simple and consistent, while topical formulas are applied to the scalp and may limit systemic exposure. Some people use a combination. The right choice depends on your goals, tolerance and a provider's assessment.",
  },
  {
    question: "How long until hair-loss treatment works?",
    answer:
      "Most hair-loss treatments take several months of consistent use before visible changes appear — often around 3 to 6 months, with fuller results later. Individual timelines vary, and stopping treatment generally reverses the gains over time.",
  },
  {
    question: "Can women use these treatments?",
    answer:
      "Some options are formulated for women — for example certain minoxidil and spironolactone formulas — while others, such as finasteride and dutasteride, are generally not recommended for women, especially during pregnancy. Women should use options approved for them under medical guidance. Happy Head offers formulas for women; Maximus is focused on men.",
  },
  {
    question: "Are online hair-loss treatments legitimate?",
    answer:
      "Reputable telehealth providers connect you with licensed clinicians who review your information before prescribing, and dispense medication through licensed pharmacies. Always confirm a provider's licensing and details before starting.",
  },
];

export function hairLossSeed(base: SiteConfig): SiteConfig {
  return {
    ...base,
    siteName: "treatmentshub.com",
    hero: {
      ...base.hero,
      backgroundImageUrl: "",
      imageAlt: "",
      updatedLabel: "Last Updated: August 2026",
      h1: "Best Hair Loss Treatments & Providers of 2026",
      h2: "Compare the top hair-loss telehealth providers, side by side",
      description:
        "Compare the best online hair-loss providers — finasteride, minoxidil, dutasteride and doctor-led regrowth programs — on treatment options, medical support, and overall value.",
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
