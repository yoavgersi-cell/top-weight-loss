import type {
  SiteConfig,
  Provider,
  ReviewData,
  BattleData,
  FaqItem,
  RankingPosition,
  ArticleData,
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
const MAXIMUS_LOGO = "/maximuslogo.png";
const HAPPYHEAD_LOGO = "/logos/happyheadlogo.png";
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
  // Competitor brands (Hims, Keeps, Ro) — included only to power "X vs …"
  // comparisons. They are NOT part of our ranking (see providerOrder below);
  // Keeps/Ro review pages are de-indexed automatically (not in
  // AFFILIATE_PROVIDER_IDS — Hims is listed there for TRT, so its review
  // indexes, which is fine).
  {
    id: "hims",
    name: "Hims",
    tagline: "Prescription finasteride, minoxidil & more for men's hair loss — 100% online",
    logo: "/logos/hims.svg",
    smallLogo: "/logos/hims.svg",
    highlights: [
      "Prescription finasteride & minoxidil",
      "Recognizable mainstream men's telehealth brand",
      "Online consultation & discreet delivery",
    ],
    affiliateUrl: "https://www.hims.com/hair-loss",
    ctaText: "Visit Site",
  },
  {
    id: "keeps",
    name: "Keeps",
    tagline: "Men's hair-loss treatment online — generic finasteride, minoxidil & hair-care essentials",
    logo: "/logo-keeps.svg",
    smallLogo: "/logo-keeps.svg",
    highlights: [
      "Generic finasteride & minoxidil, prescribed online",
      "Budget-focused men's hair-loss specialist",
      "Hair-care add-ons like ketoconazole shampoo",
    ],
    affiliateUrl: "https://www.keeps.com",
    ctaText: "Visit Site",
  },
  {
    id: "ro",
    name: "Ro",
    tagline: "Finasteride & minoxidil through a broad telehealth platform covering many areas of care",
    logo: "/logos/ro.svg",
    smallLogo: "/logos/ro-icon.svg",
    highlights: [
      "Prescription finasteride & topical minoxidil",
      "One platform spanning many health categories",
      "Online provider review & home delivery",
    ],
    affiliateUrl: "https://ro.co",
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
  {
    slug: "hims",
    providerId: "hims",
    shortSummary:
      "A well-known men's telehealth brand offering prescription finasteride, minoxidil and other hair-loss treatments online.",
    reviewIntro:
      "Hims is one of the most recognizable men's telehealth brands, offering prescription finasteride and minoxidil (alongside a broad range of other men's-health products) after an online provider review, delivered discreetly. This review outlines what it offers and how it compares to more treatment-focused providers.",
    keyFeatures: [
      "Prescription finasteride and minoxidil",
      "Online consultation with a licensed provider",
      "Discreet, recurring home delivery",
      "Broad men's-health product range",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Oral finasteride",
      "Topical minoxidil",
      "Combination and other hair products",
    ],
    pros: [
      "Recognizable, widely used brand",
      "Simple, fully online process",
      "Broad product range beyond hair loss",
    ],
    cons: [
      "A more standard treatment set than compounding-focused providers",
      "Less personalization than custom-formula services",
      "Men's-focused",
    ],
    bestFor: [
      "Men who want a simple, mainstream online option",
      "Those comparing well-known telehealth brands",
    ],
    finalVerdict:
      "Hims is a solid, recognizable mainstream option for men starting finasteride or minoxidil online. If you want broader prescription options or a personalized formula, it's worth comparing against our top-ranked providers. Confirm current pricing on their site.",
    trustBadges: ["Licensed US providers", "Discreet shipping"],
    updatedAt: UPDATED,
  },
  {
    slug: "keeps",
    providerId: "keeps",
    shortSummary:
      "A men's hair-loss specialist known for affordable generic finasteride and minoxidil, prescribed online with recurring delivery.",
    reviewIntro:
      "Keeps built its name on making the two proven hair-loss basics — generic finasteride and minoxidil — simple and affordable for men, with an online provider review and subscription delivery. This review covers what it offers and how it compares to providers with a broader or more personalized treatment set.",
    keyFeatures: [
      "Generic finasteride and minoxidil, prescribed online",
      "Hair-loss-focused men's brand",
      "Hair-care products like ketoconazole shampoo",
      "Recurring subscription delivery",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Oral finasteride",
      "Topical minoxidil",
      "Hair-care shampoos and thickening products",
    ],
    pros: [
      "Affordable, generics-first positioning",
      "Focused specifically on men's hair loss",
      "Simple online process with recurring delivery",
    ],
    cons: [
      "Centers on the standard finasteride/minoxidil toolkit",
      "No personalized compounded formulas",
      "Men's-focused",
    ],
    bestFor: [
      "Men who want the proven basics at a budget price",
      "Those comfortable with generic medication",
    ],
    finalVerdict:
      "Keeps is a sensible budget route to the two proven basics — generic finasteride and minoxidil. If you want a wider prescription toolkit (like dutasteride or oral minoxidil) or a custom-compounded formula, compare it against our top-ranked providers. Confirm current pricing on their site.",
    trustBadges: ["Licensed US providers", "Discreet shipping"],
    updatedAt: UPDATED,
  },
  {
    slug: "ro",
    providerId: "ro",
    shortSummary:
      "A large telehealth platform offering prescription finasteride and minoxidil for hair loss alongside care across many other categories.",
    reviewIntro:
      "Ro is one of the largest telehealth platforms in the US, covering everything from weight loss to fertility — with men's hair loss served through prescription finasteride and topical minoxidil after an online provider review. This review covers its hair-loss offering and how it compares to dedicated hair-loss specialists.",
    keyFeatures: [
      "Prescription finasteride and topical minoxidil",
      "One account across many health categories",
      "Online provider review and home delivery",
      "Established, well-funded telehealth platform",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Oral finasteride",
      "Topical minoxidil",
      "Other men's-health treatments on the same platform",
    ],
    pros: [
      "Broad platform if you want more than hair care",
      "Established brand with a large clinical network",
      "Simple, fully online process",
    ],
    cons: [
      "Hair loss is one category among many, not a specialty",
      "Standard treatment set rather than custom formulas",
      "Less hair-specific guidance than dedicated providers",
    ],
    bestFor: [
      "Men already using Ro for other care",
      "Those who value one platform for multiple needs",
    ],
    finalVerdict:
      "Ro is a credible generalist: the proven basics from a large, established platform — convenient if you want several kinds of care in one place. For hair loss specifically, dedicated providers offer deeper toolkits and personalization worth comparing. Confirm current pricing on their site.",
    trustBadges: ["Licensed US providers", "Discreet shipping"],
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
  {
    slug: "hims-vs-maximus",
    provider1Id: "maximus",
    provider2Id: "hims",
    title: "Hims vs Maximus: Which Is Better for Hair Loss?",
    subtitle: "A mainstream men's brand vs a broader prescription toolkit",
    description:
      "Compare Hims and Maximus for men's hair loss — treatment options, personalization, and which is the better fit.",
    intro:
      "Hims is one of the best-known men's telehealth brands, while Maximus offers a broader prescription toolkit for hair loss — including oral dutasteride and a compounded topical. Both prescribe online after a provider review; here's how they compare so you can pick the one that fits you.",
    verdict:
      "Both are legitimate online options. Maximus is our pick for men who want the widest prescription toolkit and physician-guided options beyond the basics, while Hims is a fine mainstream choice if brand familiarity matters most. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Broader options — oral finasteride, minoxidil and dutasteride",
      "Compounded topical formula",
      "Board-certified doctor oversight",
    ],
    verdictLoserPoints: [
      "Recognizable, mainstream brand",
      "Broad men's-health product range",
      "Simple, familiar online experience",
    ],
    winnerId: "maximus",
    categories: [
      {
        name: "Treatment breadth",
        winner: "provider1",
        explanation:
          "Maximus offers a wider prescription set — including oral dutasteride and a compounded topical — while Hims focuses on the standard finasteride and minoxidil.",
        supportingPoints: [
          "Oral dutasteride available at Maximus",
          "Compounded topical combining several actives",
        ],
      },
      {
        name: "Brand recognition",
        winner: "provider2",
        explanation:
          "Hims is one of the most recognizable men's telehealth brands, with a broad product range beyond hair loss.",
        supportingPoints: [
          "Widely known mainstream brand",
          "Products beyond hair loss",
        ],
      },
      {
        name: "Medical oversight",
        winner: "tie",
        explanation:
          "Both prescribe only after a licensed-provider review, dispensed through licensed pharmacies.",
        supportingPoints: [
          "Provider review at both",
          "Licensed US pharmacies",
        ],
      },
    ],
    features: [
      { feature: "Oral finasteride", provider1Value: "Available", provider2Value: "Available", highlight: "both" },
      { feature: "Dutasteride option", provider1Value: "Yes", provider2Value: "See site", highlight: "provider1" },
      { feature: "Compounded topical", provider1Value: "Yes", provider2Value: "See site", highlight: "provider1" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "hims-vs-happy-head",
    provider1Id: "happyhead",
    provider2Id: "hims",
    title: "Hims vs Happy Head: Which Is Better for Hair Loss?",
    subtitle: "A mainstream brand vs dermatologist-founded, personalized formulas",
    description:
      "Compare Hims and Happy Head for hair loss — personalization, who they serve, and which is the better fit.",
    intro:
      "Hims is a recognizable mainstream men's brand, while Happy Head is dermatologist-founded and builds personalized prescription formulas for both men and women. Both prescribe online after a provider review; here's how they compare.",
    verdict:
      "Both are legitimate online options. Happy Head is our pick for anyone who wants a personalized, dermatologist-directed formula — or who needs options for women — while Hims is a simple, familiar mainstream choice for men. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Dermatologist-founded, personalized formulas",
      "Serves both men and women",
      "Higher-strength topical minoxidil available",
    ],
    verdictLoserPoints: [
      "Recognizable, mainstream brand",
      "Simple, familiar online experience",
      "Broad men's-health product range",
    ],
    winnerId: "happyhead",
    categories: [
      {
        name: "Personalization",
        winner: "provider1",
        explanation:
          "Happy Head builds customizable formulas you can tailor by adding or removing actives, while Hims offers a more standard set.",
        supportingPoints: [
          "Custom topical and oral formulas",
          "Add or remove active ingredients",
        ],
      },
      {
        name: "Who it serves",
        winner: "provider1",
        explanation:
          "Happy Head formulates for both men and women, while Hims focuses on men (its sister brand serves women separately).",
        supportingPoints: [
          "Happy Head offers formulas for women",
          "Hims is men-focused",
        ],
      },
      {
        name: "Brand recognition",
        winner: "provider2",
        explanation:
          "Hims is one of the most recognizable telehealth brands, with a broad product range.",
        supportingPoints: [
          "Widely known brand",
          "Broad men's-health range",
        ],
      },
    ],
    features: [
      { feature: "Personalized formulas", provider1Value: "Yes", provider2Value: "Standard set", highlight: "provider1" },
      { feature: "For women", provider1Value: "Yes", provider2Value: "No", highlight: "provider1" },
      { feature: "Higher-strength topical", provider1Value: "Up to 8% minoxidil", provider2Value: "See site", highlight: "provider1" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "keeps-vs-maximus",
    provider1Id: "maximus",
    provider2Id: "keeps",
    title: "Keeps vs Maximus: Which Hair Loss Treatment Is Better?",
    subtitle: "Budget generics vs a broader physician-guided toolkit",
    description:
      "Compare Keeps and Maximus for men's hair loss — treatment options, pricing approach, and which provider fits your situation better.",
    intro:
      "Keeps and Maximus sit at two ends of the online hair-loss spectrum. Keeps built its reputation on making generic finasteride and minoxidil cheap and simple; Maximus offers a wider prescription toolkit — including oral dutasteride and a compounded topical — with physician oversight. Both are legitimate; here's how to choose between them.",
    verdict:
      "Maximus is our pick for men who want options beyond the basics — dutasteride, oral minoxidil and a compounded topical give you somewhere to go if first-line treatment underdelivers. Keeps is a fair budget choice if you only want generic finasteride or minoxidil and price is the deciding factor. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Wider prescription toolkit — finasteride, dutasteride & minoxidil",
      "Compounded topical combining several actives",
      "Board-certified doctor review and follow-up",
    ],
    verdictLoserPoints: [
      "Generics-first, budget-friendly positioning",
      "Simple, focused men's hair-loss offering",
      "Hair-care add-ons like ketoconazole shampoo",
    ],
    winnerId: "maximus",
    categories: [
      {
        name: "Treatment breadth",
        winner: "provider1",
        explanation:
          "Maximus prescribes a wider set — oral finasteride, dutasteride and minoxidil plus a compounded topical — while Keeps centers on generic finasteride and topical minoxidil.",
        supportingPoints: [
          "Dutasteride and oral minoxidil available at Maximus",
          "Compounded topical with several actives",
        ],
      },
      {
        name: "Price positioning",
        winner: "provider2",
        explanation:
          "Keeps has built its brand on affordable generics, and for men who only want basic finasteride or minoxidil it's typically one of the most budget-friendly routes online.",
        supportingPoints: [
          "Generics-first product line",
          "Simple subscription model",
        ],
      },
      {
        name: "Medical oversight",
        winner: "tie",
        explanation:
          "Both prescribe only after review by a licensed clinician, with medication dispensed through licensed US pharmacies.",
        supportingPoints: [
          "Licensed-provider review at both",
          "Ongoing online support at both",
        ],
      },
    ],
    features: [
      { feature: "Oral finasteride", provider1Value: "Available", provider2Value: "Available", highlight: "both" },
      { feature: "Dutasteride option", provider1Value: "Yes", provider2Value: "See site", highlight: "provider1" },
      { feature: "Oral minoxidil", provider1Value: "Yes", provider2Value: "See site", highlight: "provider1" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "keeps-vs-happy-head",
    provider1Id: "happyhead",
    provider2Id: "keeps",
    title: "Keeps vs Happy Head: Custom Formulas or Budget Basics?",
    subtitle: "Personalized dermatologist-designed treatment vs affordable generics",
    description:
      "Compare Keeps and Happy Head for hair loss — custom compounded formulas vs budget generics, who each serves, and which is right for you.",
    intro:
      "Keeps and Happy Head answer different questions. Keeps asks: how cheaply and simply can men get the proven basics? Happy Head asks: what's the strongest personalized formula a dermatologist can design for your specific hair? One is budget generics, the other custom compounding — for men and women. Here's how they compare.",
    verdict:
      "Happy Head is our pick for anyone who wants treatment tailored to them — custom-compounded topicals combining multiple actives, designed by dermatologists, for both men and women. Keeps remains a reasonable budget route for men happy with standard generic finasteride or minoxidil. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Custom compounded formulas with multiple actives",
      "Dermatologist-founded, serves men and women",
      "Higher-strength topical options (up to 8% minoxidil)",
    ],
    verdictLoserPoints: [
      "Budget-friendly generic basics",
      "Simple, focused subscription",
      "Hair-care add-ons like shampoo",
    ],
    winnerId: "happyhead",
    categories: [
      {
        name: "Personalization",
        winner: "provider1",
        explanation:
          "Happy Head compounds custom topical formulas — combining actives like finasteride, minoxidil and more at prescription strengths — while Keeps offers the standard generic set.",
        supportingPoints: [
          "Formulas tailored by dermatologists",
          "Multiple actives in one topical",
        ],
      },
      {
        name: "Who it serves",
        winner: "provider1",
        explanation:
          "Happy Head formulates for both men and women, including options like spironolactone for women; Keeps is a men's brand.",
        supportingPoints: [
          "Men's and women's formulations",
          "Women-specific actives available",
        ],
      },
      {
        name: "Budget basics",
        winner: "provider2",
        explanation:
          "If all you want is generic finasteride or minoxidil at a low price, Keeps' generics-first model is hard to argue with.",
        supportingPoints: [
          "Generics-first pricing approach",
          "No-frills subscription",
        ],
      },
    ],
    features: [
      { feature: "Personalized formulas", provider1Value: "Yes", provider2Value: "Standard set", highlight: "provider1" },
      { feature: "For women", provider1Value: "Yes", provider2Value: "No", highlight: "provider1" },
      { feature: "Higher-strength topical", provider1Value: "Up to 8% minoxidil", provider2Value: "See site", highlight: "provider1" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "ro-vs-maximus",
    provider1Id: "maximus",
    provider2Id: "ro",
    title: "Ro vs Maximus for Hair Loss: Generalist or Specialist?",
    subtitle: "A broad telehealth platform vs a dedicated hair-loss toolkit",
    description:
      "Compare Ro and Maximus for men's hair loss — a large multi-category telehealth platform vs a specialist with a deeper prescription toolkit.",
    intro:
      "Ro is one of the biggest names in telehealth, treating everything from weight loss to fertility — with hair loss served through prescription finasteride and minoxidil. Maximus comes at it as a specialist, with a deeper hair-specific toolkit including dutasteride, oral minoxidil and a compounded topical. Here's how the generalist and the specialist compare.",
    verdict:
      "For hair loss specifically, Maximus is our pick: the wider prescription toolkit gives you meaningful next steps if the basics underdeliver, with physician oversight throughout. Ro makes sense if you're already on its platform for other care and want everything under one roof. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Hair-specific toolkit — finasteride, dutasteride, oral minoxidil",
      "Compounded topical formula",
      "Board-certified doctor review and follow-up",
    ],
    verdictLoserPoints: [
      "One platform for many kinds of care",
      "Large, established clinical network",
      "Simple, familiar online experience",
    ],
    winnerId: "maximus",
    categories: [
      {
        name: "Treatment breadth for hair",
        winner: "provider1",
        explanation:
          "Maximus offers a deeper hair-loss set — dutasteride, oral minoxidil and a compounded topical beyond standard finasteride — while Ro's hair offering centers on the proven basics.",
        supportingPoints: [
          "Dutasteride and oral minoxidil at Maximus",
          "Compounded multi-active topical",
        ],
      },
      {
        name: "Beyond hair loss",
        winner: "provider2",
        explanation:
          "Ro spans many health categories, so one account can cover multiple needs — convenient if hair is just one thing on your list.",
        supportingPoints: [
          "Weight loss, men's health and more on one platform",
          "Established multi-category brand",
        ],
      },
      {
        name: "Medical oversight",
        winner: "tie",
        explanation:
          "Both prescribe only after a licensed clinician reviews your intake, with medication from licensed US pharmacies.",
        supportingPoints: [
          "Licensed-provider review at both",
          "Ongoing online follow-up at both",
        ],
      },
    ],
    features: [
      { feature: "Oral finasteride", provider1Value: "Available", provider2Value: "Available", highlight: "both" },
      { feature: "Dutasteride option", provider1Value: "Yes", provider2Value: "See site", highlight: "provider1" },
      { feature: "Multi-category platform", provider1Value: "Hair-focused", provider2Value: "Yes", highlight: "provider2" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "ro-vs-happy-head",
    provider1Id: "happyhead",
    provider2Id: "ro",
    title: "Ro vs Happy Head: Which Is Better for Hair Loss?",
    subtitle: "A multi-category telehealth giant vs custom compounded formulas",
    description:
      "Compare Ro and Happy Head for hair loss — standard finasteride and minoxidil from a big platform vs personalized dermatologist-designed formulas.",
    intro:
      "Ro brings hair-loss treatment to its large telehealth platform through standard prescription finasteride and minoxidil. Happy Head was built by dermatologists to do one thing: compound personalized prescription formulas — topical and oral, for men and women. Here's how a generalist platform compares with a compounding specialist.",
    verdict:
      "Happy Head is our pick for treatment depth: custom-compounded, multi-active formulas at prescription strengths, designed for your specific situation — including options for women. Ro is a convenient choice if you're consolidating several kinds of care on one platform and want the proven basics. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Custom compounded formulas with multiple actives",
      "Dermatologist-founded, serves men and women",
      "Higher-strength options (up to 8% minoxidil)",
    ],
    verdictLoserPoints: [
      "One account for many health categories",
      "Large, established telehealth brand",
      "Simple standard treatment set",
    ],
    winnerId: "happyhead",
    categories: [
      {
        name: "Formula depth",
        winner: "provider1",
        explanation:
          "Happy Head's custom compounds combine several prescription actives in one topical or oral plan; Ro's hair-loss line centers on standard finasteride and minoxidil.",
        supportingPoints: [
          "Multi-active compounded prescriptions",
          "Formulas adjusted to your response",
        ],
      },
      {
        name: "Who it serves",
        winner: "provider1",
        explanation:
          "Happy Head treats both men and women with dedicated formulations; Ro's hair-loss offering is centered on men's treatment.",
        supportingPoints: [
          "Men's and women's programs",
          "Women-specific actives like spironolactone",
        ],
      },
      {
        name: "Platform convenience",
        winner: "provider2",
        explanation:
          "Ro can handle much more than hair — if you want weight-loss, men's-health and other care in one account, the generalist model is genuinely convenient.",
        supportingPoints: [
          "Multiple health categories in one place",
          "Established national platform",
        ],
      },
    ],
    features: [
      { feature: "Personalized formulas", provider1Value: "Yes", provider2Value: "Standard set", highlight: "provider1" },
      { feature: "For women", provider1Value: "Yes", provider2Value: "See site", highlight: "provider1" },
      { feature: "Multi-category platform", provider1Value: "Hair-focused", provider2Value: "Yes", highlight: "provider2" },
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

// SEO-focused hair-loss guides. Content is general and appropriately hedged —
// no fabricated statistics or provider-specific numbers — with internal links to
// the provider reviews, the comparison, and between articles.
const articles: ArticleData[] = [
  {
    slug: "how-to-stop-hair-loss",
    title: "How to Stop Hair Loss: Treatments That Actually Work in 2026",
    description:
      "A practical guide to slowing and reversing hair loss — the proven treatments (finasteride, minoxidil, dutasteride), how they work, and how to start online.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-07-20",
    updatedAt: UPDATED,
    heroColor: "#EEF4FB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "Why hair loss happens",
        body: `The most common cause of hair loss in men — and a frequent cause in women — is androgenetic alopecia, better known as male- or female-pattern hair loss. It's driven largely by DHT (dihydrotestosterone), a hormone that gradually shrinks hair follicles over time, leading to thinning, a receding hairline, or a widening part. Genetics play a big role, which is why pattern hair loss often runs in families. The good news: because the process is gradual, starting treatment early gives you the best chance to keep the hair you have.`,
      },
      {
        heading: "The treatments proven to help",
        body: `Most evidence-based hair-loss treatment comes down to a few actives. <strong>Finasteride</strong> and <strong>dutasteride</strong> are prescription medicines that lower DHT to slow loss and help regrow hair. <strong>Minoxidil</strong> is a topical (and sometimes oral) treatment that supports growth through a separate mechanism, and is the active many people know from over-the-counter products. These are often combined under medical guidance. For a side-by-side look, read <a href="/hair-loss/articles/finasteride-vs-minoxidil">finasteride vs minoxidil</a>.`,
      },
      {
        heading: "Starting treatment online",
        body: `You no longer need an in-person visit to get started. Telehealth providers let you complete a short medical intake, have a licensed clinician review it, and — if appropriate — ship prescription treatment to your door. Providers differ in what they offer and who they serve: see our ranked <a href="/hair-loss">best hair-loss providers</a>, or compare two directly in <a href="/hair-loss/maximus-vs-happy-head">Maximus vs Happy Head</a>.`,
      },
      {
        heading: "Setting realistic expectations",
        body: `Hair-loss treatment rewards patience. It typically takes several months of consistent use — often 3 to 6 — before visible changes appear, and it's normal to see some early shedding as new growth cycles begin. Because these treatments work by maintaining an active growth environment, stopping them generally reverses the gains. For the full timeline, read <a href="/hair-loss/articles/how-long-hair-loss-treatment-works">how long hair-loss treatment takes to work</a>.`,
      },
      {
        heading: "When to talk to a professional",
        body: `Sudden, patchy, or unusual hair loss — or loss with other symptoms — can have causes beyond pattern baldness and is worth discussing with a clinician. A licensed provider can confirm what's going on and recommend a treatment plan that fits you. This guide is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "finasteride-vs-minoxidil",
    title: "Finasteride vs Minoxidil: Which Hair Loss Treatment Is Right for You?",
    description:
      "How finasteride and minoxidil differ, whether to use them together, side effects to know, and how to choose the right hair-loss treatment for you.",
    category: "Comparison",
    readTime: "6 min read",
    publishedAt: "2026-07-14",
    updatedAt: UPDATED,
    heroColor: "#F0FAF5",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "How each one works",
        body: `Finasteride is an oral prescription that lowers DHT, the hormone behind pattern hair loss, tackling the root cause. Minoxidil works differently — applied to the scalp (or taken orally by prescription), it supports the growth phase of the hair cycle. Because they act through separate mechanisms, they're frequently used together.`,
      },
      {
        heading: "The key differences",
        body: `Finasteride is prescription-only and generally used by men (it isn't recommended for most women, especially during pregnancy). Minoxidil is available over the counter at 5% and, by prescription, at higher strengths or combined with other actives — and certain minoxidil formulas are used by women. Finasteride is a daily tablet; minoxidil is usually a topical you apply to the scalp.`,
      },
      {
        heading: "Can you use them together?",
        body: `Yes — many effective plans combine finasteride and minoxidil, and some providers offer formulas that blend multiple actives into a single topical. A clinician can advise whether a combination is right for you and at what strengths. See how leading providers approach this in our <a href="/hair-loss">provider rankings</a>.`,
      },
      {
        heading: "Side effects to know",
        body: `Both treatments are generally well tolerated, but each can have side effects. Finasteride can, in a minority of men, cause sexual side effects; minoxidil can cause scalp irritation or unwanted facial hair with topical use. A licensed provider reviews your history and helps weigh the benefits and risks for your situation.`,
      },
      {
        heading: "Which should you choose?",
        body: `There's no single right answer — it depends on your goals, whether you prefer oral or topical, and a clinician's assessment. Many people start with both. If you want a tailored plan, providers like <a href="/hair-loss/reviews/happyhead">Happy Head</a> build personalized topical formulas, while <a href="/hair-loss/reviews/maximus">Maximus</a> offers a broad set of oral and topical prescription options.`,
      },
    ],
  },
  {
    slug: "does-finasteride-work",
    title: "Does Finasteride Really Work for Hair Loss?",
    description:
      "What finasteride does, what to realistically expect, how long it takes, who it's for, and the difference between oral and topical finasteride.",
    category: "Science",
    readTime: "6 min read",
    publishedAt: "2026-07-08",
    updatedAt: UPDATED,
    heroColor: "#FBF3EE",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "What finasteride does",
        body: `Finasteride reduces the body's production of DHT, the hormone that gradually shrinks hair follicles in pattern hair loss. By lowering DHT, it slows the loss and, for many men, helps regrow some hair over time. It targets the underlying hormonal driver rather than just supporting growth.`,
      },
      {
        heading: "What to realistically expect",
        body: `For many men, finasteride helps slow or stop hair loss and can lead to some regrowth, though results vary from person to person. It tends to work best when started early, before significant loss. It's a maintenance treatment: benefits are sustained with continued use and generally fade if you stop.`,
      },
      {
        heading: "How long it takes",
        body: `Finasteride isn't an overnight fix. Most people need several months of daily use — commonly 3 to 6 months — before noticing changes, with fuller results developing over a year. Some early shedding as the hair cycle resets is normal. Read more on the <a href="/hair-loss/articles/how-long-hair-loss-treatment-works">hair-loss treatment timeline</a>.`,
      },
      {
        heading: "Oral vs topical finasteride",
        body: `Finasteride comes as an oral tablet and, increasingly, as a topical applied to the scalp — sometimes blended with minoxidil. Topical formulas aim to limit how much of the medicine reaches the rest of the body. Providers like <a href="/hair-loss/reviews/happyhead">Happy Head</a> offer customizable topical options, while <a href="/hair-loss/reviews/maximus">Maximus</a> offers oral finasteride and dutasteride plus a compounded topical.`,
      },
      {
        heading: "Is it right for you?",
        body: `Finasteride is generally used by men and isn't recommended for most women, especially during pregnancy. A licensed clinician can confirm whether it fits your situation and monitor you over time. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "how-long-hair-loss-treatment-works",
    title: "How Long Until Hair Loss Treatment Works?",
    description:
      "A realistic month-by-month timeline for finasteride and minoxidil — including early shedding, when to expect results, and why consistency matters.",
    category: "Guide",
    readTime: "5 min read",
    publishedAt: "2026-07-02",
    updatedAt: UPDATED,
    heroColor: "#F3EEFB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "The short answer",
        body: `Most hair-loss treatments take several months of consistent use before you see visible changes — commonly around 3 to 6 months, with fuller results developing over 12 months. Hair grows slowly, and treatments work by gradually shifting more follicles into an active growth phase, so patience is essential.`,
      },
      {
        heading: "What early shedding means",
        body: `In the first weeks to months, some people notice increased shedding. This can be unsettling, but it's often a normal part of the process as resting hairs are pushed out and replaced by new growth. It typically settles as treatment continues. If you're concerned, check in with your provider.`,
      },
      {
        heading: "A rough month-by-month guide",
        body: `Months 1–3: little visible change; early shedding possible. Months 3–6: reduced loss and the first signs of regrowth for many people. Months 6–12: thicker, fuller results become more apparent. Individual timelines vary based on the treatment, your hair, and how consistently you use it.`,
      },
      {
        heading: "Why consistency is everything",
        body: `These treatments only work while you use them — the gains generally reverse within months of stopping. Building a simple daily routine (and choosing a provider that makes refills easy) is one of the biggest predictors of success. Compare providers on our <a href="/hair-loss">best hair-loss providers</a> page.`,
      },
    ],
  },
  {
    slug: "best-online-hair-loss-treatment",
    title: "Best Online Hair Loss Treatment: How to Choose a Provider in 2026",
    description:
      "How online hair-loss treatment works, what to look for in a telehealth provider, and how the top options compare on treatments, personalization and who they serve.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-06-26",
    updatedAt: UPDATED,
    heroColor: "#EEF7FB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "Why treat hair loss online",
        body: `Online hair-loss treatment has made getting started far simpler: complete a short intake, have a licensed clinician review it, and receive prescription treatment at your door — usually for less hassle than an in-person visit. The trade-off is choosing wisely, since providers vary widely in what they offer.`,
      },
      {
        heading: "What to look for in a provider",
        body: `Prioritize real medical oversight (a licensed clinician who reviews your intake), the right treatments for you (finasteride, minoxidil, dutasteride; topical or oral), personalization, and transparent terms — pricing, what's included, and how easy it is to pause or cancel. Beware anything that prescribes without a proper review.`,
      },
      {
        heading: "How the top providers compare",
        body: `In our rankings, <a href="/hair-loss/reviews/maximus">Maximus</a> stands out for men wanting a broad prescription toolkit — oral finasteride, minoxidil and dutasteride plus a compounded topical — while <a href="/hair-loss/reviews/happyhead">Happy Head</a> is dermatologist-founded and serves both men and women with highly customizable formulas. See them head to head in <a href="/hair-loss/maximus-vs-happy-head">Maximus vs Happy Head</a>.`,
      },
      {
        heading: "Men vs women",
        body: `Not every provider treats everyone. Some, like Maximus, focus on men; others, like Happy Head, formulate for both men and women. If you're a woman, make sure a provider offers options appropriate for you — see our guide to <a href="/hair-loss/articles/hair-loss-treatment-for-women">hair loss treatment for women</a>.`,
      },
      {
        heading: "What about cost?",
        body: `Pricing depends on the provider, the treatment, and whether it's oral or a custom topical, so check current pricing on each provider's site before you commit. Factor in what's included — the consultation, medication, and shipping — rather than the headline number alone.`,
      },
    ],
  },
  {
    slug: "hair-loss-treatment-for-women",
    title: "Hair Loss Treatment for Women: Options That Actually Work",
    description:
      "How female hair loss differs, which treatments are used for women (minoxidil, spironolactone and more), what to avoid, and how to start online.",
    category: "Guide",
    readTime: "6 min read",
    publishedAt: "2026-06-18",
    updatedAt: UPDATED,
    heroColor: "#FBEEF4",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "How female hair loss is different",
        body: `Women more often experience diffuse thinning across the top of the scalp or a widening part, rather than the receding hairline typical in men. Causes can include female-pattern hair loss, hormonal changes, thyroid issues, stress, and nutritional factors — so an accurate assessment matters before choosing a treatment.`,
      },
      {
        heading: "Treatments used for women",
        body: `Minoxidil is one of the most common options for women and is used topically (and sometimes orally by prescription). Some women are prescribed spironolactone, which addresses hormonal drivers of hair loss. Treatment should always be guided by a clinician who can tailor it to your situation.`,
      },
      {
        heading: "What to avoid",
        body: `Finasteride and dutasteride are generally not recommended for most women — especially during pregnancy or if you may become pregnant — because of the risk to a developing baby. This is why it's important to use options that are formulated and approved for women under medical guidance.`,
      },
      {
        heading: "Starting treatment online",
        body: `Some telehealth providers formulate specifically for women. In our rankings, <a href="/hair-loss/reviews/happyhead">Happy Head</a> is dermatologist-founded and offers personalized formulas for both men and women, including options like spironolactone. Compare your choices on our <a href="/hair-loss">best hair-loss providers</a> page. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "dutasteride-vs-finasteride",
    title: "Dutasteride vs Finasteride for Hair Loss: What's the Difference?",
    description:
      "Dutasteride blocks more DHT than finasteride — but is stronger better? How the two compare on effectiveness, side effects, and who each is right for.",
    category: "Comparison",
    readTime: "6 min read",
    publishedAt: "2026-07-26",
    updatedAt: UPDATED,
    heroColor: "#F3EEFB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "Two medicines, one target",
        body: `Both dutasteride and finasteride treat pattern hair loss the same fundamental way: they block 5-alpha-reductase, the enzyme that converts testosterone into DHT — the hormone that shrinks hair follicles. The difference is coverage. Finasteride blocks mainly the type II form of the enzyme, cutting DHT levels by roughly 70%. Dutasteride blocks both type I and type II, reducing DHT by around 90% or more. If you're new to how these medicines work, start with <a href="/hair-loss/articles/does-finasteride-work">does finasteride really work</a>.`,
      },
      {
        heading: "Effectiveness: is stronger better?",
        body: `Because it suppresses more DHT, dutasteride is generally considered at least as effective as finasteride for hair, and head-to-head studies have tended to favor it on measures like hair count. That doesn't automatically make it the right first choice: finasteride has decades of use at the 1&nbsp;mg hair-loss dose and a deep safety record, which is why many clinicians start there and consider dutasteride when response is limited.`,
      },
      {
        heading: "Approval status and access",
        body: `Here's a practical difference: in the United States, finasteride 1&nbsp;mg is FDA-approved specifically for male pattern hair loss. Dutasteride is FDA-approved for enlarged prostate (BPH) and is prescribed off-label for hair loss — a common, legal practice when a clinician judges it appropriate (it is approved for hair loss in countries like Japan and South Korea). Telehealth providers such as <a href="/hair-loss/reviews/maximus">Maximus</a> prescribe both, when suitable, after a medical intake.`,
      },
      {
        heading: "Side effects and half-life",
        body: `Both medicines are generally well tolerated, with a small minority of men reporting sexual side effects. One meaningful difference is how long they stay in your system: finasteride clears within days, while dutasteride has a very long half-life and lingers for months. That matters if you experience side effects and stop — finasteride leaves your body much faster. Neither should be handled or used by women who are or may become pregnant.`,
      },
      {
        heading: "Which one should you choose?",
        body: `A common, sensible path is starting with finasteride — the approved, well-studied option — and discussing dutasteride with your clinician if results plateau after a year or more of consistent use. Some providers also combine a DHT blocker with minoxidil for a two-mechanism plan; see <a href="/hair-loss/articles/finasteride-vs-minoxidil">finasteride vs minoxidil</a>. Compare who offers what on our <a href="/hair-loss">best hair-loss providers</a> page. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "does-creatine-cause-hair-loss",
    title: "Does Creatine Cause Hair Loss? What the Science Actually Says",
    description:
      "The creatine–hair loss fear traces back to a single small study. What that study found, what's been shown since, and what actually drives thinning.",
    category: "Science",
    readTime: "5 min read",
    publishedAt: "2026-08-01",
    updatedAt: UPDATED,
    heroColor: "#F0FAF5",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "Where the fear comes from",
        body: `The entire creatine–hair loss worry traces back largely to one small 2009 study of college rugby players, which reported that a creatine loading protocol raised levels of DHT — the hormone that drives pattern hair loss. The study didn't measure hair loss at all, only hormone levels, and it involved a small group over a few weeks. From that single data point, a decade and a half of gym-floor folklore was born.`,
      },
      {
        heading: "What the evidence actually shows",
        body: `No study to date has directly shown that creatine causes hair loss, and the DHT finding from 2009 has not been convincingly replicated. Reviews of creatine research — one of the most-studied sports supplements in existence — have not identified hair loss as an established side effect. That's not the same as absolute proof of safety, but it means the claim rests on far weaker ground than most people assume.`,
      },
      {
        heading: "The caveat if baldness runs in your family",
        body: `Pattern hair loss is driven by how sensitive your follicles are to DHT, and that sensitivity is genetic. In theory, anything that nudged DHT upward could matter slightly more for someone strongly predisposed. If you're already noticing thinning and it runs in your family, the meaningful move isn't dropping creatine — it's addressing the actual mechanism. Read <a href="/hair-loss/articles/how-to-stop-hair-loss">how to stop hair loss</a> for the treatments with real evidence.`,
      },
      {
        heading: "What actually drives thinning",
        body: `If your hairline is receding, the cause is almost certainly genetics and DHT — not your post-workout shake. Proven responses target that mechanism directly: finasteride and dutasteride lower DHT, and minoxidil supports the growth phase of the follicle. See how the main options compare in <a href="/hair-loss/articles/finasteride-vs-minoxidil">finasteride vs minoxidil</a>.`,
      },
      {
        heading: "Bottom line",
        body: `Creatine is not an established cause of hair loss; the concern comes from one small, unreplicated hormone study. If you're seeing genuine thinning, get ahead of it early — pattern loss is progressive, and treatment works best before follicles miniaturize. Our ranked <a href="/hair-loss">best hair-loss providers</a> page shows where to start with a licensed clinician online. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "oral-minoxidil-vs-topical-minoxidil",
    title: "Oral Minoxidil vs Topical Minoxidil: Which Works Better?",
    description:
      "Low-dose oral minoxidil is having a moment. How it compares to the classic topical on convenience, effectiveness, side effects, and who should use each.",
    category: "Comparison",
    readTime: "6 min read",
    publishedAt: "2026-08-05",
    updatedAt: UPDATED,
    heroColor: "#EEF7FB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "Same molecule, two very different routes",
        body: `Minoxidil started life decades ago as an oral blood-pressure medication; hair growth was a side effect so consistent it was turned into a product. Topical minoxidil (the classic 5% solution or foam) is FDA-approved for hair loss and available over the counter. Oral minoxidil for hair is different: it's prescribed off-label at low doses — a fraction of the old blood-pressure dosing — and has surged in popularity among dermatologists in recent years.`,
      },
      {
        heading: "The case for topical",
        body: `Topical minoxidil delivers the medicine where you want it with minimal absorption into the rest of the body, which keeps systemic side effects rare. It's accessible, doesn't require a prescription at standard strengths, and has decades of safety data. The trade-offs are practical: daily application takes discipline, it can leave residue in styled hair, and some people develop scalp irritation — often from propylene glycol in solutions rather than the minoxidil itself.`,
      },
      {
        heading: "The case for low-dose oral",
        body: `The appeal of oral minoxidil is consistency and convenience: swallowing a small tablet daily is easier to sustain than coating your scalp, and adherence is most of the battle in hair-loss treatment. Some people who respond poorly to topical do better on oral. The trade-off is that the medicine circulates through your whole body, so effects like unwanted hair growth elsewhere (face, arms), fluid retention, or a faster heartbeat are possible — which is why it's prescription-only and clinician-monitored.`,
      },
      {
        heading: "Which is more effective?",
        body: `Both routes grow hair. Head-to-head evidence is still limited, but studies so far suggest low-dose oral minoxidil performs comparably to 5% topical, and dermatologists often reach for oral when topical hasn't delivered or isn't practical. Remember that minoxidil addresses growth, not the hormonal cause — many plans pair it with a DHT blocker; see <a href="/hair-loss/articles/dutasteride-vs-finasteride">dutasteride vs finasteride</a>.`,
      },
      {
        heading: "How to decide",
        body: `Start with the format you'll actually use every day for years. If that's a topical, the OTC route or a prescription formula works; if you know you'll skip applications, ask a clinician about low-dose oral. Telehealth providers like <a href="/hair-loss/reviews/maximus">Maximus</a> and <a href="/hair-loss/reviews/happyhead">Happy Head</a> offer minoxidil in multiple formats, often combined with other actives. Expect the usual timeline either way — see <a href="/hair-loss/articles/how-long-hair-loss-treatment-works">how long treatment takes</a>. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "finasteride-side-effects",
    title: "Finasteride Side Effects: What's Common, What's Rare & What to Know",
    description:
      "An honest look at finasteride's side effects — how often sexual side effects actually occur in studies, what usually happens if you stop, and who should avoid it.",
    category: "Science",
    readTime: "6 min read",
    publishedAt: "2026-08-09",
    updatedAt: UPDATED,
    heroColor: "#FBF3EE",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "The honest picture",
        body: `Finasteride is one of the most-prescribed hair-loss medicines in the world, and most men take it without noticeable side effects. But "most" isn't "all," and the internet fills that gap with extremes — either dismissing side effects entirely or treating them as inevitable. The reality documented in clinical studies sits in between, and knowing it helps you make a calm, informed decision with your clinician.`,
      },
      {
        heading: "Sexual side effects: the real numbers",
        body: `In the clinical trials behind the 1&nbsp;mg hair-loss dose, sexual side effects — reduced libido, erectile difficulties, or reduced ejaculate volume — were reported by a small minority of men, on the order of a few percent, and notably, men taking placebo reported similar issues at rates not far behind. For most men who do experience them, symptoms resolve after stopping the medicine, and in studies many resolved even with continued use.`,
      },
      {
        heading: "The persistence controversy",
        body: `You may have read about men reporting symptoms that persist after stopping — sometimes called post-finasteride syndrome. It's a real patient community and the reports deserve to be taken seriously; it's also an area where the science is genuinely unsettled, and regulators have responded mainly with label updates rather than restrictions. A fair summary: persistent problems appear to be rare, they're not well understood, and they're worth discussing openly with a clinician rather than discovering in a forum at 2am.`,
      },
      {
        heading: "Other things to know",
        body: `Finasteride can lower PSA (a prostate blood marker) — something your doctor should know when interpreting future tests. Women who are or may become pregnant should not take or handle crushed or broken tablets, because DHT suppression can harm a developing male fetus. And because finasteride clears the body within days, side effects that do appear typically fade quickly after stopping — one practical difference from the longer-acting <a href="/hair-loss/articles/dutasteride-vs-finasteride">dutasteride</a>.`,
      },
      {
        heading: "Making the decision",
        body: `The question isn't "does finasteride have side effects" — every effective medicine does — but whether the realistic risk profile is acceptable to you for the realistic benefit: keeping your hair. A licensed clinician can walk through your history, and topical formulations aim to limit systemic exposure for those who prefer it; providers like <a href="/hair-loss/reviews/happyhead">Happy Head</a> and <a href="/hair-loss/reviews/maximus">Maximus</a> offer both routes. Start with <a href="/hair-loss/articles/does-finasteride-work">what finasteride actually does</a>. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "receding-hairline-treatment",
    title: "Receding Hairline: Early Signs, Norwood Stages & How to Stop It",
    description:
      "Maturing hairline or early Norwood? How to tell, why the temples go first, and the treatments with real evidence for stopping a receding hairline.",
    category: "Guide",
    readTime: "6 min read",
    publishedAt: "2026-08-12",
    updatedAt: UPDATED,
    heroColor: "#EEF4FB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "Maturing hairline or receding?",
        body: `Almost every man's hairline shifts back somewhat from its teenage position — a "maturing" hairline that settles slightly higher and is not balding. A receding hairline is different: the temples pull back progressively, the corners deepen into an M-shape, and the change continues year over year. Useful tells: compare photos a year apart, watch the temple corners rather than the middle, and note whether hairs at the edge are becoming finer and shorter — miniaturization is the signature of pattern loss.`,
      },
      {
        heading: "The Norwood scale, briefly",
        body: `Clinicians grade male pattern loss with the Norwood scale, from stage 1 (no meaningful recession) through stage 7 (a horseshoe of remaining hair). Early recession at the temples is typically stage 2–3 — and that early window matters enormously, because treatment is far better at keeping hair than regrowing it. A follicle that has fully miniaturized rarely comes back with medication alone.`,
      },
      {
        heading: "Why the temples go first",
        body: `The follicles along the temples and crown are genetically the most sensitive to DHT, the hormone that gradually shrinks follicles in pattern loss. That's why recession usually starts there while the sides and back — largely DHT-resistant — hang on for life (and why those areas supply grafts for transplants). The mechanism also explains the treatment logic: lower DHT, and you slow or stop the retreat.`,
      },
      {
        heading: "What actually works",
        body: `The evidence-based playbook for a receding hairline is the same as for pattern loss generally: a DHT blocker (finasteride, or sometimes dutasteride) to address the cause, often paired with minoxidil to support growth. Hairline regrowth tends to be harder to achieve than crown regrowth, which makes early action the single highest-leverage move. See the full breakdown in <a href="/hair-loss/articles/how-to-stop-hair-loss">how to stop hair loss</a> and <a href="/hair-loss/articles/finasteride-vs-minoxidil">finasteride vs minoxidil</a>.`,
      },
      {
        heading: "Getting started without a waiting room",
        body: `If your temples are moving, the cost of waiting a year is real and mostly one-directional. Telehealth makes starting simple: a medical intake, a licensed clinician's review, and treatment shipped to you. Compare the leading options on our <a href="/hair-loss">best hair-loss providers</a> ranking, or see how the top two stack up in <a href="/hair-loss/maximus-vs-happy-head">Maximus vs Happy Head</a>. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "minoxidil-shedding-phase",
    title: "Minoxidil Shedding: Why Hair Falls Out Before It Grows Back",
    description:
      "Started minoxidil and losing more hair? The dread shed explained — why it happens, how long it lasts, and why it usually means the treatment is working.",
    category: "Guide",
    readTime: "5 min read",
    publishedAt: "2026-08-15",
    updatedAt: UPDATED,
    heroColor: "#FBEEF4",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "The dread shed is real — and usually good news",
        body: `A few weeks into minoxidil, many people see more hair in the drain, not less. It's alarming enough to have a nickname — the "dread shed" — and it's the single most common reason people quit right before the treatment starts paying off. Counterintuitively, this shedding is usually a sign the medicine is doing exactly what it's supposed to do.`,
      },
      {
        heading: "Why it happens",
        body: `Hair grows in cycles: a long growth phase (anagen), a short transition, and a resting phase (telogen) that ends with the hair being released. Minoxidil pushes resting follicles to re-enter the growth phase early — and to do that, the old resting hair has to be shed first. The hairs you're losing were already at the end of their cycle; minoxidil is evicting them to make room for new, hopefully thicker growth underneath.`,
      },
      {
        heading: "How long it lasts",
        body: `Shedding typically shows up in the first several weeks of treatment and settles down within a couple of months as follicles synchronize into their new growth phase. It's temporary. The visible payoff comes later — commonly around months 3 to 6, with fuller results over a year. For the full arc, see our <a href="/hair-loss/articles/how-long-hair-loss-treatment-works">month-by-month treatment timeline</a>.`,
      },
      {
        heading: "When shedding isn't the shed",
        body: `Shedding that starts months into treatment, keeps worsening past the early window, or comes with scalp symptoms like itching, burning or patches is a different story and worth a clinician's look. Diffuse shedding can also follow illness, major stress or medication changes — see <a href="/hair-loss/articles/can-stress-cause-hair-loss">can stress cause hair loss</a> — so context matters before blaming the minoxidil.`,
      },
      {
        heading: "The one rule: don't quit mid-shed",
        body: `Stopping minoxidil during the shed gets you the worst of both worlds — you've paid the shedding cost and walked away before the growth arrives (and treatment gains reverse when you stop). If the shed worries you, talk to your provider rather than going cold turkey. Providers on our <a href="/hair-loss">best hair-loss providers</a> ranking include clinician follow-up, which is exactly what this phase is for. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "can-stress-cause-hair-loss",
    title: "Can Stress Cause Hair Loss? Telogen Effluvium Explained",
    description:
      "Yes — stress can trigger real, measurable hair shedding. How telogen effluvium works, why it shows up months late, and how to tell it from pattern loss.",
    category: "Science",
    readTime: "6 min read",
    publishedAt: "2026-08-18",
    updatedAt: UPDATED,
    heroColor: "#F0FAF5",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "Yes — and it has a name",
        body: `Significant stress can absolutely cause hair loss. The most common form is telogen effluvium: a major stressor — serious illness, surgery, high fever, crash dieting, childbirth, or an intensely stressful life period — shocks a large share of follicles out of their growth phase and into the resting phase at once. When those resting hairs release together, you get sudden, diffuse shedding that can be genuinely dramatic.`,
      },
      {
        heading: "The confusing two-to-three-month delay",
        body: `Here's the part that trips people up: the shedding doesn't start during the stressful event. Follicles pushed into the resting phase hold their hair for roughly two to three months before releasing it — so the hair falls out after things have calmed down, and the trigger is easy to miss. If you're shedding heavily now, think back a season, not a week.`,
      },
      {
        heading: "How it differs from pattern hair loss",
        body: `Telogen effluvium is diffuse — thinning all over, often noticed as a smaller ponytail or more hair on the pillow — while pattern loss is regional: temples, hairline, crown. The other big difference is trajectory. Stress shedding is usually temporary, with regrowth over about six months once the trigger resolves; pattern loss is progressive. The two can also overlap, with a stress shed unmasking underlying pattern loss earlier than it would have appeared. See <a href="/hair-loss/articles/receding-hairline-treatment">receding hairline signs</a> for what pattern loss looks like.`,
      },
      {
        heading: "What helps",
        body: `For classic telogen effluvium, the honest answer is: resolve the trigger, support the basics (adequate protein, iron and general nutrition — deficiencies are common contributors), and give it time; follicles recover on their own. Minoxidil is sometimes used to speed regrowth. Persistent shedding beyond six months, patchy loss, or loss with other symptoms deserves a clinician's evaluation — causes like thyroid issues and iron deficiency are checkable and treatable.`,
      },
      {
        heading: "When it's not just stress",
        body: `If the shedding settles but your hairline keeps moving, you're likely looking at pattern loss — which, unlike stress shedding, won't resolve on its own but responds well to treatment, especially early. Read <a href="/hair-loss/articles/how-to-stop-hair-loss">how to stop hair loss</a>, and for women navigating this territory, <a href="/hair-loss/articles/hair-loss-treatment-for-women">hair-loss treatment for women</a> covers the options formulated for you. Our <a href="/hair-loss">provider rankings</a> show where to get a proper evaluation online. This article is general information, not medical advice.`,
      },
    ],
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
      // Only our two monetized providers are ranked. Hims exists as a provider
      // solely to power the "Hims vs …" comparisons and is deliberately excluded.
      providerOrder: ["maximus", "happyhead"],
      positions,
    },
    reviews,
    battles,
    faqs,
    articles,
  };
}
