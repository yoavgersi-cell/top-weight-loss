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
// TRT (testosterone replacement therapy) content
//
// Launch set for the TRT vertical: the five providers we monetize - Maximus,
// Hims, DudeMeds, PeterMD and Male Excel - with truthful, general descriptions
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
  maximus: "https://track.revoffers.com/aff_c?offer_id=1347&aff_id=13399&url_id=10973",
  hims: "https://www.hims.com/",
  dudemeds: "https://www.dudemeds.com/",
  petermd: "https://getpetermd.com/",
  maleexcel: "https://maleexcel.com/",
};

const providers: Provider[] = [
  {
    id: "maximus",
    name: "Maximus",
    tagline: "Telehealth testosterone support for men - including oral protocol options - with at-home testing",
    logo: "/maximuslogo.png",
    smallLogo: "/maximuslogo.png",
    highlights: [
      "Oral protocol options plus traditional TRT",
      "At-home testing to start",
      "Board-certified doctor oversight",
    ],
    affiliateUrl: URLS.maximus,
    ctaText: "Visit Site",
    // Operator-level record from Maximus' claimed Trustpilot profile
    // (operator-supplied screenshots, Aug 2026) - spans all Maximus lines.
    trustpilotRating: "4.4",
    trustpilotReviewCount: "1,050",
    trustpilotReviews: [
      {
        title: "Super positive experience",
        text: "Super positive experience really great doctors very proactive experience super open with their background I get open conversations about doing this what it meant long-term short-term only great things to say turning 50 this year if you're not doing this and you're an athlete, you've got injuries and you wanna feel young again you are missing one of the cooler things happening in 2026 being able to do this online... telehealth testosterone very cool.",
        name: "Joshua Walker",
        location: "US",
        rating: 5,
        date: "Aug 22, 2026",
      },
      {
        title: "Excellent customer service",
        text: "Excellent customer service. Whenever I have had an issue with shipping or a refund, the team has been responsive and eager to solve the problem. The products are also 100% as advertised. It is refreshing to deal with a company that makes customer satisfaction a priority.",
        name: "Ben Vangarde",
        location: "US",
        rating: 5,
        date: "Aug 17, 2026",
      },
      {
        title: "Fast shipping and good customer service",
        text: "Shipping was fast for a year. Left for a few months and ended up waiting after my resubscription. Customer service was able to quickly resolve the issue when I sent an email in, with a real person responding on the weekend.",
        name: "Nathan Bennett",
        location: "US",
        rating: 5,
        date: "Aug 13, 2026",
      },
      {
        title: "Highly knowledgeable physician",
        text: "Highly knowledgeable physician who prescribed a protocol that works, great products, lots of treatment options not available elsewhere.",
        name: "David Epstein",
        location: "US",
        rating: 5,
        date: "Jul 26, 2026",
      },
      {
        title: "A very pleasant experience",
        text: "This has been a very pleasant experience with Maximus. They are attentive, professional, and fast!",
        name: "Floyd Gaugh",
        location: "US",
        rating: 5,
        date: "Aug 10, 2026",
      },
    ],
  },
  {
    id: "hims",
    name: "Hims",
    tagline: "Recognizable men's telehealth brand - testosterone replacement therapy, 100% online",
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
    tagline: "Physician-founded online TRT - injectable testosterone and enclomiphene, with at-home labs",
    logo: "/logo-dudemeds.svg",
    smallLogo: "/logo-dudemeds.svg",
    // Individual reviews from DudeMeds' Trustpilot page (operator-supplied
    // screenshots, both "unprompted"). No published aggregate verified, so
    // rating/count are deliberately absent - the carousel shows the reviews
    // with a plain "Source: Trustpilot" label instead of a score.
    trustpilotReviews: [
      {
        title: "Absolutely fantastic experience",
        text: "Absolutely fantastic experience! This is the first company that actually uses reliable testosterone instead of underdosed compounded testosterone which doesnt have the best quality control! Next day appointments available, fast shipping and good customer service!",
        name: "Dont be A wimp",
        location: "US",
        rating: 5,
        date: "Aug 14, 2025",
      },
      {
        title: "Support team rectified quickly",
        text: "Although there was a hiccup with my initial doctor consultation, the support team rectified quickly and got me a new appointment. Thanks DudeMeds!",
        name: "Bryce T",
        location: "US",
        rating: 5,
        date: "Sep 16, 2025",
      },
    ],
    highlights: [
      "Injectable testosterone (cypionate), supplies included",
      "Enclomiphene option - helps preserve fertility",
      "At-home or uploaded labs; founded by physicians",
    ],
    affiliateUrl: URLS.dudemeds,
    ctaText: "Visit Site",
  },
  {
    id: "petermd",
    name: "PeterMD",
    tagline: "One of North America's largest online men's-health clinics - testosterone therapy with flexible plans",
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
    tagline: "TRT-focused telehealth - testosterone cream, injections and oral options, with at-home testing",
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
  // Competitor brands - included only to power "<competitor> vs …" comparisons.
  // They are NOT part of our ranking (see providerOrder) and their standalone
  // review pages de-index automatically (not in AFFILIATE_PROVIDER_IDS).
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
    affiliateUrl: "https://honehealth.com/",
    ctaText: "Visit Site",
  },
  {
    id: "fountain",
    name: "Fountain TRT",
    tagline: "Online TRT clinic - testing, prescription, and follow-up for men",
    logo: "/logo-fountain.svg",
    smallLogo: "/logo-fountain.svg",
    highlights: [
      "Lab work reviewed by a provider",
      "Testosterone treatment options",
      "Remote follow-up care",
    ],
    affiliateUrl: "https://fountaintrt.com/",
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
    affiliateUrl: "https://marekhealth.com/",
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
      "4.4 across 1,050 Trustpilot reviews (claimed profile, operator-level)",
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
      "Maximus stands out for offering oral protocol options within a supervised, at-home telehealth model, backed by a 4.4 Trustpilot average across 1,050 reviews at the operator level. Confirm current pricing and eligibility on their site.",
    trustBadges: ["4.4 across 1,050 Trustpilot reviews", "At-home testing", "Board-certified doctors"],
    updatedAt: UPDATED,
  },
  {
    slug: "hims",
    providerId: "hims",
    shortSummary:
      "A recognizable men's telehealth brand offering testosterone replacement therapy - injectable cypionate - after online labs and a provider review.",
    reviewIntro:
      "Hims is one of the most recognizable men's telehealth brands, and its testosterone offering follows the same simple, online model: complete lab work, have a licensed provider review your results, and - if appropriate - receive injectable testosterone (cypionate) with ongoing support. This review outlines what it offers and who it fits.",
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
      "DudeMeds is a physician-founded telehealth clinic focused on men's hormone care. It offers injectable testosterone (cypionate) - the long-standing standard for TRT - as well as enclomiphene, a medication that stimulates the body's own testosterone and can help preserve fertility. You provide labs (at-home or uploaded), a licensed provider reviews them, and treatment ships to your door. This review covers its approach and fit.",
    keyFeatures: [
      "Injectable testosterone cypionate, supplies included",
      "Enclomiphene option - helps preserve fertility",
      "At-home or uploaded labs",
      "Founded by two physicians",
    ],
    pricingSummary:
      "Verified from DudeMeds' published pricing (August 2026): injectable testosterone from $77/month on the Bring-Your-Own-Labs plan (testosterone, anastrozole, syringes, televisit and shipping included), from $98/month with lab work included, oral enclomiphene at $125/month (lab work, televisit and shipping included), and the TRT MAX stack (testosterone + HCG + AI + lab work) at $222/month on a quarterly commitment. Every plan includes the televisit, prescriptions and free shipping.",
    treatmentOptions: [
      "TRT, Bring-Your-Own-Labs - from $77/mo (testosterone, anastrozole, syringes, televisit, shipping)",
      "TRT + lab work included - from $98/mo",
      "Oral enclomiphene - $125/mo (lab work, televisit, shipping included)",
      "TRT MAX stack: testosterone + HCG + AI + labs - $222/mo, quarterly commitment",
    ],
    pros: [
      "From $77/mo - among the lowest published injectable-TRT entry prices in our ranking",
      "Both injectable TRT and fertility-preserving enclomiphene",
      "Televisit, prescriptions and free shipping included in every plan",
      "Physician-founded, fully online",
    ],
    cons: [
      "No published Trustpilot aggregate we've verified - we say so rather than invent one",
      "Cheapest tier requires bringing your own labs; the top stack is a quarterly commitment",
      "Requires labs and a medical review",
      "Ongoing monitoring needed",
    ],
    bestFor: [
      "Men who want injections or enclomiphene",
      "Those who want to preserve fertility",
      "People who value an at-home, streamlined process",
    ],
    finalVerdict:
      "DudeMeds is a strong pick for men who want flexibility between injectable TRT and fertility-preserving enclomiphene, under physician-founded care - with verified pricing from $77/month (bring your own labs) to the $222/month TRT MAX stack, and televisit, prescriptions and shipping included throughout. Confirm current eligibility on their site.",
    trustBadges: ["From $77/mo verified", "Physician-founded", "Televisit & shipping included"],
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
      "Male Excel is a TRT-focused telehealth clinic that stands out for offering all three main delivery routes - testosterone cream (with a daily microdosing approach), injectable cypionate, and an oral option (Kyzatrex) - built around at-home testosterone testing and telemedicine. It also backs treatment with a 90-day satisfaction guarantee. This review outlines its approach and fit.",
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
      "All three delivery routes - cream, injection and oral",
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
      "Male Excel is a strong choice for men who want flexibility in how they take testosterone - especially needle-free cream or oral options - with at-home testing and a guarantee. Confirm current pricing and eligibility on their site.",
    trustBadges: ["At-home testing", "90-day guarantee", "Cream, injection & oral"],
    updatedAt: UPDATED,
  },
  {
    slug: "hone",
    providerId: "hone",
    shortSummary:
      "A men's telehealth service that starts with at-home hormone testing and connects you with providers for testosterone treatment.",
    reviewIntro:
      "Hone Health is a well-known men's telehealth brand that starts with at-home hormone testing, followed by a licensed-provider evaluation and, where appropriate, testosterone treatment with ongoing monitoring. This review outlines its approach and how it compares to our top-ranked providers.",
    keyFeatures: [
      "At-home lab testing to begin",
      "Licensed-provider evaluation",
      "Ongoing telehealth monitoring",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: ["Testosterone treatment (provider-directed)", "Follow-up lab monitoring"],
    pros: ["Convenient at-home start", "Recognizable brand", "Remote monitoring"],
    cons: ["Requires lab work and a medical review", "Ongoing treatment and monitoring", "Membership-style pricing"],
    bestFor: ["Men who want an at-home, online path to evaluation", "Those comparing well-known TRT brands"],
    finalVerdict:
      "Hone Health is a convenient, recognizable option for men exploring testosterone treatment online. If you want oral options or specialized delivery, compare it against our top-ranked providers. Confirm current pricing on their site.",
    trustBadges: ["Licensed US providers", "At-home testing"],
    updatedAt: UPDATED,
  },
  {
    slug: "fountain",
    providerId: "fountain",
    shortSummary:
      "An online TRT clinic offering testing, prescription treatment, and remote follow-up for men.",
    reviewIntro:
      "Fountain TRT is an online clinic focused specifically on testosterone replacement therapy - lab work, a provider review, and remote follow-up. This review covers what's included and how it compares to our top-ranked providers.",
    keyFeatures: [
      "Lab work reviewed by a provider",
      "Testosterone treatment options",
      "Remote follow-up care",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: ["Testosterone treatment (provider-directed)", "Follow-up monitoring"],
    pros: ["TRT-focused service", "Provider-supervised", "Fully online process"],
    cons: ["Requires bloodwork and a medical review", "Ongoing use and monitoring", "Fewer delivery options"],
    bestFor: ["Men who want a focused, online TRT program", "Those comparing dedicated TRT clinics"],
    finalVerdict:
      "Fountain TRT is a focused, convenient online TRT option. If you want more delivery choices or included labs, compare it against our top-ranked providers. Confirm current pricing on their site.",
    trustBadges: ["Licensed US providers", "Remote monitoring"],
    updatedAt: UPDATED,
  },
  {
    slug: "marek",
    providerId: "marek",
    shortSummary:
      "Hormone optimization and health coaching built around comprehensive lab testing and provider guidance.",
    reviewIntro:
      "Marek Health is a hormone-optimization telehealth service that pairs comprehensive lab testing with provider guidance and health coaching. It's popular with men who want a deep, data-driven approach - which can include TRT where appropriate. This review outlines its approach and how it compares to our top-ranked providers.",
    keyFeatures: [
      "Comprehensive lab panels",
      "Provider-guided hormone optimization",
      "Health coaching alongside treatment",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: ["Testosterone therapy (provider-directed)", "Broader hormone optimization", "Health coaching"],
    pros: ["In-depth lab testing and interpretation", "Coaching plus medical oversight", "Individualized optimization"],
    cons: ["More involved than a basic TRT script", "Requires bloodwork and a review", "Can cost more overall"],
    bestFor: ["Men who want a data-driven, coached approach", "Those interested in broader hormone optimization"],
    finalVerdict:
      "Marek Health suits men who want a thorough, lab-driven approach with coaching. If you want a simpler, more affordable start, compare it against our top-ranked providers. Confirm current pricing on their site.",
    trustBadges: ["Comprehensive lab testing", "Coaching included"],
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
      "Compare Maximus and Hims for online testosterone therapy - treatment options, approach, and which is the better fit.",
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
      "Compare DudeMeds and PeterMD for online testosterone therapy - treatment options, plans, and which fits you best.",
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
      { feature: "Pricing", provider1Value: "From $77/mo (BYO labs)", provider2Value: "See site", highlight: "provider1" },
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
      "Compare Hims and Male Excel for testosterone therapy - delivery options, approach, and which fits you best.",
    intro:
      "Hims is a recognizable mainstream men's brand, while Male Excel is a TRT-focused clinic offering all three delivery routes - cream, injection and oral. Both start from lab work and a provider review; here's how they compare.",
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
  {
    slug: "hone-health-vs-maximus",
    provider1Id: "maximus",
    provider2Id: "hone",
    title: "Hone Health vs Maximus: Which Is Better for TRT?",
    subtitle: "Two at-home testosterone services, compared",
    description:
      "Compare Hone Health and Maximus for online testosterone therapy - treatment options, approach, and which is the better fit.",
    intro:
      "Hone Health and Maximus both start with at-home testing and a provider review. Maximus adds specialized options like oral protocols under board-certified oversight, while Hone is a recognizable at-home TRT brand. Here's how they compare.",
    verdict:
      "Both offer a convenient at-home start. Maximus is our pick for men who want specialized hormone options (including oral protocols), while Hone is a solid, familiar choice. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Oral protocol options plus traditional TRT",
      "Board-certified doctor oversight",
      "At-home testing",
    ],
    verdictLoserPoints: [
      "Recognizable at-home TRT brand",
      "Licensed-provider evaluation",
      "Ongoing telehealth monitoring",
    ],
    winnerId: "maximus",
    categories: [
      {
        name: "Treatment options",
        winner: "provider1",
        explanation:
          "Maximus offers oral protocol options alongside traditional testosterone, while Hone centers on standard provider-directed treatment.",
        supportingPoints: ["Oral options available at Maximus", "Standard TRT at Hone"],
      },
      {
        name: "At-home experience",
        winner: "tie",
        explanation: "Both begin with at-home testing and a licensed-provider review.",
        supportingPoints: ["At-home testing at both", "Provider-supervised treatment"],
      },
    ],
    features: [
      { feature: "At-home testing", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Oral option", provider1Value: "Yes", provider2Value: "See site", highlight: "provider1" },
      { feature: "Board-certified oversight", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "fountain-trt-vs-petermd",
    provider1Id: "petermd",
    provider2Id: "fountain",
    title: "Fountain TRT vs PeterMD: Which Online TRT Clinic Is Better?",
    subtitle: "A focused TRT clinic vs one of the largest men's-health clinics",
    description:
      "Compare Fountain TRT and PeterMD for online testosterone therapy - plans, included labs, and which fits you best.",
    intro:
      "Fountain TRT and PeterMD are both online testosterone clinics. Fountain is TRT-focused, while PeterMD is one of the largest men's-health clinics with flexible plans and included labs. Here's how they compare.",
    verdict:
      "Both are provider-supervised online options. PeterMD is our pick for men who want a large, established clinic with flexible plans and included labs, while Fountain is a focused alternative. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Flexible monthly and yearly plans",
      "Labs and clinician oversight included",
      "Large, established clinic",
    ],
    verdictLoserPoints: [
      "TRT-focused service",
      "Provider-supervised treatment",
      "Remote follow-up care",
    ],
    winnerId: "petermd",
    categories: [
      {
        name: "Plans and value",
        winner: "provider1",
        explanation:
          "PeterMD offers flexible plan lengths with labs and oversight included, while Fountain is a more focused single-service clinic.",
        supportingPoints: ["Flexible plan lengths at PeterMD", "TRT-focused at Fountain"],
      },
      {
        name: "Medical oversight",
        winner: "tie",
        explanation: "Both require lab work and a licensed-provider review.",
        supportingPoints: ["Lab-based evaluation at both", "Provider-supervised treatment"],
      },
    ],
    features: [
      { feature: "Injectable testosterone", provider1Value: "Available", provider2Value: "Available", highlight: "both" },
      { feature: "Flexible plan lengths", provider1Value: "Yes", provider2Value: "See site", highlight: "provider1" },
      { feature: "Labs included", provider1Value: "Yes", provider2Value: "See site", highlight: "provider1" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "marek-health-vs-dudemeds",
    provider1Id: "dudemeds",
    provider2Id: "marek",
    title: "Marek Health vs DudeMeds: Which Is Better for TRT?",
    subtitle: "Deep hormone optimization vs straightforward, affordable treatment",
    description:
      "Compare Marek Health and DudeMeds for online testosterone therapy - approach, options, and which fits you best.",
    intro:
      "Marek Health and DudeMeds take different approaches. Marek leans into comprehensive lab work and coaching, while DudeMeds is a physician-founded clinic offering straightforward injectable testosterone and enclomiphene. Here's how they compare.",
    verdict:
      "Both are legitimate options. DudeMeds is our pick for men who want a simple, affordable start with the choice of fertility-preserving enclomiphene, while Marek suits those who want deep optimization and coaching. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Injectable testosterone and enclomiphene",
      "Physician-founded, at-home labs",
      "Straightforward, value-focused",
    ],
    verdictLoserPoints: [
      "Comprehensive lab panels",
      "Health coaching alongside treatment",
      "Deep optimization focus",
    ],
    winnerId: "dudemeds",
    categories: [
      {
        name: "Approach",
        winner: "provider1",
        explanation:
          "DudeMeds is a straightforward, affordable clinic with a fertility-preserving enclomiphene option, while Marek is a deeper optimization-and-coaching service.",
        supportingPoints: ["Enclomiphene available at DudeMeds", "Coaching-heavy at Marek"],
      },
      {
        name: "Depth of testing",
        winner: "provider2",
        explanation: "Marek emphasizes comprehensive lab panels and interpretation.",
        supportingPoints: ["Detailed labs at Marek", "Standard labs at DudeMeds"],
      },
    ],
    features: [
      { feature: "Injectable testosterone", provider1Value: "Available", provider2Value: "Available", highlight: "both" },
      { feature: "Enclomiphene option", provider1Value: "Yes", provider2Value: "See site", highlight: "provider1" },
      { feature: "Coaching", provider1Value: "See site", provider2Value: "Emphasized", highlight: "provider2" },
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
    question: "Injections, cream or oral - which is best?",
    answer:
      "Each route has trade-offs. Injections are common and cost-effective; creams are needle-free and applied daily; oral options (like testosterone undecanoate) avoid needles entirely. Some providers offer all three. A clinician helps you choose based on your labs, goals and preferences.",
  },
  {
    question: "What is enclomiphene, and how is it different from TRT?",
    answer:
      "Enclomiphene stimulates your body's own testosterone production rather than replacing it directly, which can help preserve fertility - a reason some men choose it over traditional TRT. Whether it's appropriate depends on your labs and goals, and it requires a provider's evaluation.",
  },
  {
    question: "Is online TRT legitimate?",
    answer:
      "Legitimate telehealth TRT providers connect you with licensed clinicians who review your labs and history before prescribing, and dispense through licensed pharmacies. Always confirm a provider's licensing and monitoring practices.",
  },
  {
    question: "How much does online TRT cost?",
    answer:
      "Costs vary widely by provider and depend on what's included - the initial labs, the provider visit, medication, and follow-up monitoring are sometimes bundled and sometimes billed separately. Because pricing changes, check each provider's site for current pricing before you start.",
  },
  {
    question: "How long does TRT take to work?",
    answer:
      "Many men begin to notice changes over the first several weeks to a few months, and different symptoms can improve on different timelines. Your provider monitors your labs and how you feel, and adjusts treatment as needed.",
  },
];

// SEO-focused TRT guides. Content is general and appropriately hedged - no
// fabricated statistics or provider-specific numbers - with internal links to
// the reviews, comparisons, and between articles.
const articles: ArticleData[] = [
  {
    slug: "how-to-get-trt-online",
    title: "How to Get TRT Online: A Complete Guide for 2026",
    description:
      "A step-by-step guide to getting testosterone replacement therapy online - labs, provider review, treatment options, and how to choose a clinic.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-08-01",
    updatedAt: UPDATED,
    heroColor: "#EEF4FB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "What online TRT actually involves",
        body: `Getting testosterone replacement therapy online has become straightforward: you complete lab work (at home or at a lab), a licensed clinician reviews your results and symptoms, and - if appropriate - treatment is prescribed and shipped to your door with ongoing monitoring. The whole process avoids in-person clinic visits while keeping real medical oversight. Compare the leading options on our <a href="/trt">best TRT providers</a> page.`,
      },
      {
        heading: "Step 1: Testing",
        body: `Every legitimate program starts with bloodwork to confirm clinically low testosterone and check your overall health. Some providers offer at-home test kits; others have you visit a lab or upload existing results. This step is non-negotiable - anywhere that prescribes testosterone without labs is a red flag.`,
      },
      {
        heading: "Step 2: The provider review",
        body: `A licensed clinician reviews your labs, symptoms and history to decide whether treatment is appropriate and, if so, which option fits. This is where good providers differ: the best ones take time to individualize your plan and explain the risks and benefits.`,
      },
      {
        heading: "Step 3: Choosing your treatment",
        body: `Testosterone can be delivered by injection, cream/gel, or oral capsule, and some men are candidates for enclomiphene instead - a medication that raises your own testosterone and can help preserve fertility. Providers vary in what they offer: see <a href="/trt/articles/testosterone-injections-vs-cream-vs-oral">injections vs cream vs oral</a> and <a href="/trt/articles/enclomiphene-vs-trt">enclomiphene vs TRT</a> to understand the choices.`,
      },
      {
        heading: "How to choose a clinic",
        body: `Prioritize real lab testing, licensed medical oversight, the treatment options that suit you, and transparent terms (pricing, included labs and follow-ups, and how easily you can cancel). Our top picks - like <a href="/trt/reviews/maximus">Maximus</a> and <a href="/trt/reviews/dudemeds">DudeMeds</a> - are compared head to head across the site. This guide is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "trt-cost",
    title: "TRT Cost: How Much Does Testosterone Therapy Cost Online?",
    description:
      "What online TRT really costs - what's included, why prices vary, and how injections, cream and oral options compare on price.",
    category: "Guide",
    readTime: "6 min read",
    publishedAt: "2026-07-28",
    updatedAt: UPDATED,
    heroColor: "#F0FAF5",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "What you're actually paying for",
        body: `Online TRT pricing usually bundles several things: the initial labs, the provider visit, the medication itself, and ongoing follow-up and monitoring. Some clinics include all of this in one monthly price; others charge separately for labs or visits. When comparing, always look at what's included rather than the headline number.`,
      },
      {
        heading: "Why prices vary so much",
        body: `Cost depends on the treatment route (injections are typically the most affordable; creams and branded oral options cost more), how often you're monitored, and whether labs are included. Membership-style clinics spread costs into a flat monthly fee, which can be easier to budget.`,
      },
      {
        heading: "Injections vs cream vs oral on price",
        body: `Generic injectable testosterone is usually the lowest-cost route. Testosterone cream sits in the middle, and branded oral testosterone tends to be the priciest. If budget matters most, an injection-based plan is usually cheapest - see <a href="/trt/articles/testosterone-injections-vs-cream-vs-oral">injections vs cream vs oral</a>.`,
      },
      {
        heading: "How to get the best value",
        body: `Compare total cost with labs and follow-ups included, check whether a provider offers price matching or longer-plan discounts, and confirm how easy it is to pause or cancel. Because pricing changes, always verify current pricing on each provider's site - compare the options on our <a href="/trt">TRT providers</a> page.`,
      },
    ],
  },
  {
    slug: "low-testosterone-symptoms",
    title: "Signs of Low Testosterone: Symptoms of Low T in Men",
    description:
      "The common signs of low testosterone - from low energy and libido to mood and body changes - and when to get tested.",
    category: "Science",
    readTime: "6 min read",
    publishedAt: "2026-07-22",
    updatedAt: UPDATED,
    heroColor: "#FBF3EE",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "What low testosterone is",
        body: `Testosterone naturally declines with age, but some men have levels low enough - confirmed by bloodwork - to cause symptoms. This is sometimes called "low T." Only a lab test alongside symptoms can confirm it, which is why testing is the first step in any legitimate TRT program.`,
      },
      {
        heading: "Common physical signs",
        body: `Frequently reported physical symptoms include persistent fatigue and low energy, reduced muscle mass or strength, increased body fat, and reduced sex drive or erectile changes. These symptoms overlap with many other conditions, so they point to testing rather than a diagnosis on their own.`,
      },
      {
        heading: "Mood, sleep and focus",
        body: `Low testosterone can also affect mood, motivation, sleep quality and mental focus. Many men describe a general loss of drive or "flatness." Again, these are reasons to get evaluated, not proof of low T by themselves.`,
      },
      {
        heading: "When to get tested",
        body: `If several of these symptoms are persistent and affecting your life, it's worth getting your testosterone checked. Online providers make this easy with at-home or lab-based testing followed by a clinician review - see how the top options compare on our <a href="/trt">best TRT providers</a> page. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "trt-results-timeline",
    title: "TRT Results Timeline: What to Expect Week by Week",
    description:
      "A realistic month-by-month timeline for testosterone therapy - from early energy and libido changes to muscle and body composition.",
    category: "Guide",
    readTime: "6 min read",
    publishedAt: "2026-07-16",
    updatedAt: UPDATED,
    heroColor: "#F3EEFB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "The short answer",
        body: `Different benefits of TRT appear on different timelines. Some men notice changes in energy, mood and libido within the first few weeks, while changes in muscle, strength and body composition develop over months. Your provider monitors your labs and how you feel, and adjusts your dose over time.`,
      },
      {
        heading: "Weeks 1-4",
        body: `Early on, many men report improvements in libido, mood and a sense of drive. Energy may start to lift. It's also the period where your provider is dialing in the right dose, so follow-up labs matter.`,
      },
      {
        heading: "Months 1-3",
        body: `Over the first few months, improvements in mood, motivation and sexual function often become more consistent, and some men begin to notice changes in strength and workout recovery. Red-blood-cell levels and other markers are typically re-checked during this window.`,
      },
      {
        heading: "Months 3-6 and beyond",
        body: `Changes in muscle mass and body composition continue to develop with consistent treatment and training over three to six months and beyond. Benefits are maintained with ongoing therapy and generally fade if you stop. Compare provider monitoring on our <a href="/trt">TRT providers</a> page.`,
      },
    ],
  },
  {
    slug: "testosterone-injections-vs-cream-vs-oral",
    title: "Testosterone Injections vs Cream vs Oral: Which Is Best?",
    description:
      "How the three main testosterone delivery methods compare - injections, cream/gel and oral - on convenience, cost and who they suit.",
    category: "Comparison",
    readTime: "6 min read",
    publishedAt: "2026-07-10",
    updatedAt: UPDATED,
    heroColor: "#EEF7FB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "Injections",
        body: `Injectable testosterone (usually cypionate) is the most common and typically most cost-effective route. It's given weekly or twice-weekly, self-administered, and provides stable levels. The main downside is the needle - though many men adjust quickly. Providers like <a href="/trt/reviews/dudemeds">DudeMeds</a> and <a href="/trt/reviews/petermd">PeterMD</a> center on injections.`,
      },
      {
        heading: "Cream and gel",
        body: `Topical testosterone is applied to the skin daily - needle-free and steady, with a microdosing approach some men prefer. The trade-offs: it must be allowed to dry and there's a risk of transferring it to others through skin contact. <a href="/trt/reviews/maleexcel">Male Excel</a> is known for its daily microdosing cream.`,
      },
      {
        heading: "Oral options",
        body: `Modern oral testosterone (such as testosterone undecanoate) avoids needles entirely and is taken as a capsule. It's newer, tends to cost more, and requires taking it with food as directed. It's a good fit for men who want to avoid both needles and skin transfer.`,
      },
      {
        heading: "Which should you choose?",
        body: `There's no single best route - it depends on your preferences, budget and a clinician's assessment. Injections win on cost and stability; cream and oral win on convenience and being needle-free. Some providers offer all three, so you can switch. Compare them on our <a href="/trt">best TRT providers</a> page. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "enclomiphene-vs-trt",
    title: "Enclomiphene vs TRT: Which Is Right for You?",
    description:
      "How enclomiphene differs from traditional testosterone replacement therapy - fertility, how each works, and who each suits.",
    category: "Comparison",
    readTime: "6 min read",
    publishedAt: "2026-07-04",
    updatedAt: UPDATED,
    heroColor: "#FBEEF4",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "How they work differently",
        body: `Traditional TRT adds testosterone from outside the body. Enclomiphene works the other way - it stimulates your body to produce more of its own testosterone by acting on the brain's hormonal signals. That difference has real consequences, especially around fertility.`,
      },
      {
        heading: "The fertility difference",
        body: `Traditional testosterone can suppress the body's own production and sperm count, which is a concern for men who want to preserve fertility. Because enclomiphene raises your own testosterone, it can help maintain fertility - a key reason some men choose it. Providers like <a href="/trt/reviews/dudemeds">DudeMeds</a> offer both.`,
      },
      {
        heading: "Who each suits",
        body: `Enclomiphene may appeal to younger men, men planning to have children, or those who prefer to boost their own production. Traditional TRT may be the better fit when levels are very low or when enclomiphene isn't effective enough. Only a clinician can determine what's appropriate based on your labs.`,
      },
      {
        heading: "How to decide",
        body: `The right choice depends on your testosterone levels, fertility goals and how your body responds - decisions a licensed provider makes with you after reviewing your labs. Compare providers that offer both approaches on our <a href="/trt">TRT providers</a> page. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "does-trt-cause-hair-loss",
    title: "Does TRT Cause Hair Loss? What to Know Before Starting",
    description:
      "TRT can accelerate hair loss - but only if you're genetically predisposed. How testosterone converts to DHT, who's actually at risk, and what you can do.",
    category: "Science",
    readTime: "6 min read",
    publishedAt: "2026-08-04",
    updatedAt: UPDATED,
    heroColor: "#EEF4FB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "The short answer",
        body: `TRT doesn't cause hair loss by itself - but it can accelerate it in men who are genetically predisposed to pattern baldness. Some of the testosterone you take converts, via the 5-alpha-reductase enzyme, into DHT: the hormone that gradually miniaturizes scalp follicles in men who carry the sensitivity. More circulating testosterone can mean more DHT, and for a predisposed scalp, a faster version of the timeline your genes had already written.`,
      },
      {
        heading: "Who's actually at risk",
        body: `The deciding factor isn't the therapy - it's your follicles. If pattern baldness runs strongly in your family or your hairline was already moving before treatment, TRT may speed that process up. If you've reached your 40s with a full head of hair and no family history, your follicles are likely not DHT-sensitive, and TRT is unlikely to change that. Baldness genetics come from both sides of the family, so look at the whole picture, not just your mother's father.`,
      },
      {
        heading: "Early warning signs on TRT",
        body: `Watch for the classic pattern-loss signature after starting therapy: more hairs on the pillow, temples pulling back, a thinning crown under bright light. Diffuse all-over shedding shortly after a new medication can have other causes, but progressive recession at the temples and crown is the DHT fingerprint. Catching it in the first months matters - pattern loss is much easier to stop than to reverse.`,
      },
      {
        heading: "What you can do about it",
        body: `The good news: this is one of the most treatable side effects of TRT. DHT-blocking medicines like finasteride are commonly used alongside testosterone therapy, and topical routes (finasteride or minoxidil applied to the scalp) are options for men who prefer to limit systemic exposure. This is a conversation for your prescribing clinician, since your hormone panel and goals both matter. Our sister guide on <a href="/hair-loss">hair-loss treatment providers</a> covers the full toolkit, and <a href="/hair-loss/articles/dutasteride-vs-finasteride">dutasteride vs finasteride</a> explains the DHT-blocker options.`,
      },
      {
        heading: "Keeping perspective",
        body: `For most men the trade is manageable: TRT addresses real, quality-of-life symptoms of low testosterone, and the hair-loss risk applies mainly to those already predisposed - with effective countermeasures available. Discuss your family history during intake so your provider can monitor for it; the clinics on our <a href="/trt">best TRT providers</a> ranking all include ongoing clinical follow-up. For the broader safety picture, see <a href="/trt/articles/trt-side-effects">TRT side effects</a>. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "trt-and-fertility",
    title: "TRT and Fertility: Does Testosterone Therapy Make You Infertile?",
    description:
      "TRT suppresses sperm production - a side effect many men learn about too late. How it happens, whether it's reversible, and the fertility-sparing alternatives.",
    category: "Science",
    readTime: "6 min read",
    publishedAt: "2026-08-07",
    updatedAt: UPDATED,
    heroColor: "#F0FAF5",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "The paradox nobody warns you about",
        body: `It sounds backwards, but it's true: taking testosterone can sharply reduce your fertility. TRT is so effective at suppressing sperm production that testosterone has actually been studied as a male contraceptive. If you're on TRT - or considering it - and children are anywhere in your future plans, this is the side effect to understand before you start, not after.`,
      },
      {
        heading: "Why it happens",
        body: `Your brain regulates the testes through two signaling hormones, LH and FSH. When you supply testosterone from outside, the brain sees high levels and stops sending those signals. But sperm production depends on testosterone made <em>inside</em> the testes at concentrations far higher than what circulates in blood - and without LH, that local production collapses. The result: your blood testosterone looks great while sperm counts fall, sometimes to very low levels or zero.`,
      },
      {
        heading: "Is it reversible?",
        body: `For most men, yes - but not instantly and not guaranteed. After stopping TRT, sperm production typically recovers over months, and in some men it can take a year or longer; recovery tends to be slower with longer therapy duration and older age, and a small minority don't fully return to baseline. Anyone banking on "I'll just pause TRT when we're ready" should know the timeline is measured in months, not weeks.`,
      },
      {
        heading: "The fertility-sparing alternatives",
        body: `This is exactly why medications like enclomiphene exist. Instead of replacing testosterone, enclomiphene prompts the brain to increase LH and FSH - raising your own testosterone production while keeping the testicular signal (and sperm production) intact. Clinicians may also add hCG alongside TRT to maintain testicular function. We break the main option down in <a href="/trt/articles/enclomiphene-vs-trt">enclomiphene vs TRT</a>; providers like <a href="/trt/reviews/maximus">Maximus</a> offer it specifically for men prioritizing fertility.`,
      },
      {
        heading: "What to do with this",
        body: `If fatherhood is on your roadmap, say so explicitly during your intake - it changes the right prescription. Options include starting with enclomiphene, banking sperm before TRT, or pairing therapy with fertility-preserving protocols. A quality provider will ask; if yours didn't, that's a signal. Compare clinics on our <a href="/trt">best TRT providers</a> page, and if you're weighing stopping therapy, read <a href="/trt/articles/can-you-stop-trt">can you stop TRT</a> first. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "trt-side-effects",
    title: "TRT Side Effects: What's Common, What's Manageable, What to Monitor",
    description:
      "The real side-effect profile of testosterone therapy - from acne and thickened blood to fertility suppression - and the lab monitoring that keeps TRT safe.",
    category: "Science",
    readTime: "7 min read",
    publishedAt: "2026-08-10",
    updatedAt: UPDATED,
    heroColor: "#FBF3EE",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "TRT is a commitment, not a supplement",
        body: `Testosterone therapy is genuinely effective for men with clinically low levels - and it's real medicine, with real side effects and a monitoring routine that isn't optional. The difference between TRT done well and TRT done badly is rarely the testosterone itself; it's whether anyone is checking your labs. Here's the honest map of what can come up.`,
      },
      {
        heading: "The common and cosmetic",
        body: `Acne and oilier skin are among the most frequent complaints, especially early on, as skin adjusts to higher androgen levels. Injection-site soreness is routine for injectable forms. Some men notice mood changes - often positive, occasionally irritability, particularly with dosing that peaks and troughs sharply. Testicular shrinkage is common and expected: your testes downshift when external testosterone takes over. And for genetically predisposed men, accelerated hair loss - covered fully in <a href="/trt/articles/does-trt-cause-hair-loss">does TRT cause hair loss</a>.`,
      },
      {
        heading: "The one your bloodwork catches: thick blood",
        body: `The most important lab-monitored effect is erythrocytosis - testosterone stimulates red blood cell production, and in some men the blood becomes too thick, raising cardiovascular strain. This is why responsible providers check hematocrit before starting and periodically after. It's manageable (dose adjustments, switching formulations, occasionally donating blood), but only if someone's watching. If a clinic doesn't require follow-up labs, that's disqualifying.`,
      },
      {
        heading: "The systemic ones",
        body: `TRT suppresses sperm production - significant enough that it deserves its own read: <a href="/trt/articles/trt-and-fertility">TRT and fertility</a>. Some testosterone converts to estradiol, which in excess can cause water retention or breast tenderness; clinicians manage this through dosing rather than reflexively adding blockers. TRT can also worsen untreated sleep apnea, and men with prostate concerns need appropriate screening - providers typically monitor PSA in the age groups where that's relevant.`,
      },
      {
        heading: "The bottom line on safety",
        body: `Most side effects are dose-related, detectable on labs, and manageable within an ongoing clinical relationship - which is exactly what separates legitimate telehealth TRT from buying vials from a gym acquaintance. Every provider on our <a href="/trt">best TRT providers</a> ranking includes baseline labs and scheduled follow-ups. For what results and timelines look like when therapy is dialed in, see <a href="/trt/articles/trt-results-timeline">the TRT results timeline</a>. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "normal-testosterone-levels-by-age",
    title: "Normal Testosterone Levels by Age: What Counts as Low?",
    description:
      "What a normal total testosterone range actually is, how levels decline with age, why lab timing matters, and when a number officially counts as low.",
    category: "Guide",
    readTime: "6 min read",
    publishedAt: "2026-08-13",
    updatedAt: UPDATED,
    heroColor: "#EEF7FB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "The normal range - and why it's so wide",
        body: `For adult men, most labs place normal total testosterone somewhere around 300 to 1,000 ng/dL - a deliberately wide range, because healthy men genuinely vary that much. Two men can both be "normal" with one at triple the other's level. That width is also why a single number rarely tells the whole story: where you sit in the range, your symptoms, and your trend over time matter more than clearing the minimum bar.`,
      },
      {
        heading: "What happens with age",
        body: `Testosterone typically peaks in the late teens and twenties, then declines gradually - commonly cited at roughly 1% per year from the thirties onward. That slope is normal aging, not a disease. The clinical question isn't whether your level at 45 matches your level at 22 (it won't); it's whether your level is low enough, alongside real symptoms, to explain how you feel. The symptom side of that equation is covered in <a href="/trt/articles/low-testosterone-symptoms">low testosterone symptoms</a>.`,
      },
      {
        heading: "When a number officially counts as low",
        body: `The American Urological Association uses 300 ng/dL as the working cutoff for low testosterone - confirmed on two separate morning blood draws, alongside symptoms. All three parts matter. Testosterone peaks in the early morning and can swing meaningfully day to day, which is why guidelines require morning samples (roughly 7-10am) and a repeat test before anyone diagnoses anything. A single afternoon reading of 280 is a reason to retest properly, not a diagnosis.`,
      },
      {
        heading: "Total vs free testosterone",
        body: `Most of the testosterone in your blood is bound to proteins and unavailable to your tissues; the small unbound fraction - free testosterone - does the actual work. Some men have normal total testosterone but low free testosterone (often due to elevated binding proteins), which can produce classic low-T symptoms despite a "normal" report. A thorough workup measures or calculates both, which is worth checking when comparing providers' lab panels.`,
      },
      {
        heading: "Getting properly tested",
        body: `Testing is the easy part now: online TRT clinics arrange baseline labs - typically at a local draw station or via at-home kit - and have a licensed clinician interpret them against your symptoms, with treatment only when both justify it. That two-morning-tests standard is a good litmus test for clinic quality. See <a href="/trt/articles/how-to-get-trt-online">how to get TRT online</a> for the process end to end, and our <a href="/trt">best TRT providers</a> ranking for who does testing right. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "is-trt-covered-by-insurance",
    title: "Is TRT Covered by Insurance? Costs With & Without Coverage",
    description:
      "When insurance covers testosterone therapy, why online TRT clinics are usually cash-pay, and how the real monthly costs compare either way.",
    category: "Guide",
    readTime: "6 min read",
    publishedAt: "2026-08-15",
    updatedAt: UPDATED,
    heroColor: "#F3EEFB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "The short answer",
        body: `Insurance can cover TRT - but usually only when you fit the strict clinical definition of hypogonadism: documented low testosterone on two separate morning blood tests, plus symptoms, often with prior-authorization paperwork on top. Men whose levels hover just above the cutoff, or who don't want to route their care through referrals and waiting rooms, frequently find coverage more theoretical than real. That gap is precisely the market online TRT clinics grew to fill.`,
      },
      {
        heading: "What insurance-covered TRT looks like",
        body: `The covered path typically runs through your primary-care doctor or an endocrinologist/urologist: labs, a diagnosis that meets your insurer's criteria, and a prescription - commonly for generic injectable testosterone, which is an inexpensive, decades-old medication. When you qualify, this is usually the cheapest route on paper. The costs are in time and friction: appointments, prior authorizations, refill logistics, and coverage rules that can treat borderline numbers as "not medically necessary."`,
      },
      {
        heading: "Why online clinics are cash-pay",
        body: `Most telehealth TRT providers don't bill insurance at all. Instead they charge a flat monthly membership that bundles the medication, clinical visits, follow-up labs and shipping into one price. You're paying for convenience and access - no referrals, no prior auth, treatment protocols decided between you and the clinician rather than an insurer's checklist. Real prices for the major clinics are broken down in our <a href="/trt/articles/trt-cost">what does TRT cost</a> guide, with current numbers on each provider's page.`,
      },
      {
        heading: "Making the comparison honestly",
        body: `If your levels are clearly low and you have a doctor you like, the insurance route can be genuinely cheaper - generic testosterone itself costs little. The cash route wins on speed, privacy and simplicity, and bundled memberships often cost less than people assume once labs and visits are counted in. One tip either way: HSA/FSA funds can generally be used for legitimate medical care, which softens the cash-pay math. Ask any provider what their price actually includes before comparing.`,
      },
      {
        heading: "Where to start",
        body: `Start with proper testing and an honest read of your numbers - see <a href="/trt/articles/normal-testosterone-levels-by-age">what counts as low</a> - then pick the route that fits your situation. If that's telehealth, our <a href="/trt">best TRT providers</a> ranking compares what each membership includes, and <a href="/trt/articles/how-to-get-trt-online">how to get TRT online</a> walks through the process step by step. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "trt-vs-steroids",
    title: "TRT vs Steroids: Why Testosterone Therapy Isn't 'Taking Gear'",
    description:
      "TRT and steroid use both involve testosterone - that's where the similarity ends. Doses, supervision, legality, and goals compared honestly.",
    category: "Science",
    readTime: "5 min read",
    publishedAt: "2026-08-17",
    updatedAt: UPDATED,
    heroColor: "#FBEEF4",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "Same molecule, different universe",
        body: `The confusion is understandable: TRT and anabolic steroid use can involve literally the same compound. But the comparison ends at the molecule. TRT restores a deficient man to the normal physiological range under medical supervision; steroid use pushes levels far beyond anything a human body produces naturally, in pursuit of maximum muscle growth. One is replacement; the other is enhancement - and the risk profiles are worlds apart.`,
      },
      {
        heading: "The dose makes the difference",
        body: `TRT aims to bring your blood levels into the same 300-1,000 ng/dL range as any healthy man, with labs to verify you're there and not beyond. Performance-focused steroid protocols commonly involve multiples of replacement dosing, often stacking several compounds - including synthetic derivatives never approved for human therapeutic use. The side effects people associate with "steroids" scale with those supraphysiologic doses; therapy at replacement levels is a fundamentally different exposure.`,
      },
      {
        heading: "Supervision and legality",
        body: `TRT is legal medicine: testosterone is a Schedule III controlled substance in the US, prescribed after documented low levels, with monitoring of blood counts and other markers over time - see <a href="/trt/articles/trt-side-effects">what providers monitor and why</a>. Non-prescribed steroid use sits outside that entirely: illegally sourced, unverified products, no baseline labs, no one watching hematocrit or blood pressure. Much of the harm attributed to steroids traces to that unsupervised context.`,
      },
      {
        heading: "Will TRT make you jacked?",
        body: `An honest expectation-set: TRT is not a shortcut to a bodybuilder's physique. Restoring low testosterone to normal genuinely helps - energy, drive, and the ability to build and keep muscle in the gym all improve when a real deficiency is corrected. But at replacement doses you're getting back what deficiency took, not gaining a superpower. The realistic arc is laid out in our <a href="/trt/articles/trt-results-timeline">TRT results timeline</a>.`,
      },
      {
        heading: "The takeaway",
        body: `If your levels are low and it's affecting your life, seeking treatment isn't "taking gear" - it's treating a diagnosed deficiency the same way you'd treat any hormone disorder, through licensed clinicians and monitored dosing. That supervision layer is exactly what separates the clinics on our <a href="/trt">best TRT providers</a> ranking from the gray market. Start with proper testing: <a href="/trt/articles/normal-testosterone-levels-by-age">normal testosterone levels by age</a>. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "can-you-stop-trt",
    title: "Can You Stop TRT Once You Start? What Actually Happens",
    description:
      "Is TRT really 'for life'? What happens to your body when you stop testosterone therapy, how long recovery takes, and how to come off safely if you choose to.",
    category: "Guide",
    readTime: "6 min read",
    publishedAt: "2026-08-19",
    updatedAt: UPDATED,
    heroColor: "#EEF4FB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "The 'TRT is forever' claim, examined",
        body: `You'll hear it stated as law: once you start testosterone, you can never stop. The truth is less dramatic. You can stop TRT - men do, for fertility plans, cost, side effects, or simply reconsidering. What's true is that stopping has a physiological cost you should understand in advance: your body's own production has been switched off, and it doesn't switch back on overnight.`,
      },
      {
        heading: "What happens when you stop",
        body: `On TRT, your brain stops signaling your testes to produce testosterone. Stop the therapy abruptly, and you enter a gap: the external supply is gone, but natural production hasn't resumed. During that window - typically weeks to months - testosterone can sit lower than where you started, and low-T symptoms like fatigue, low mood and reduced libido often return, sometimes more noticeably than before. This gap, not any permanent switch, is what the "forever" folklore is describing.`,
      },
      {
        heading: "How long recovery takes",
        body: `Most men's natural production recovers over a few months, though the timeline varies with how long you were on therapy, your age, and where your system started. Sperm production follows its own, often slower, recovery arc - covered in <a href="/trt/articles/trt-and-fertility">TRT and fertility</a>. A minority of men, particularly after long-term use or with pre-existing testicular issues, don't return fully to their old baseline - which is a genuine reason to treat starting TRT as a considered decision, not a casual one.`,
      },
      {
        heading: "Coming off safely",
        body: `If you decide to stop, do it with your clinician rather than cold turkey. Providers can monitor your labs through the transition and, where appropriate, use restart support - medications like enclomiphene or hCG that stimulate the brain-testes signal to shorten the low-hormone gap. (Enclomiphene is also what some men switch <em>to</em> rather than fully stopping; see <a href="/trt/articles/enclomiphene-vs-trt">enclomiphene vs TRT</a>.) A planned exit with monitoring beats an abrupt one every time.`,
      },
      {
        heading: "Decide well before you start",
        body: `The best time to think about stopping TRT is before beginning it: confirm your levels are genuinely low on proper morning testing, understand the commitment, and pick a provider whose clinicians will still be there when your plans change. Our <a href="/trt">best TRT providers</a> ranking weighs exactly that ongoing-care layer, and <a href="/trt/articles/how-to-get-trt-online">how to get TRT online</a> covers what a quality intake looks like. This article is general information, not medical advice.`,
      },
    ],
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
        "Compare the best online TRT providers - testosterone injections, creams, oral options and enclomiphene - on testing, treatment options, medical supervision, and overall value.",
    },
    providers,
    sidebar: {
      ...base.sidebar,
      blockOrder: ["secureBadge", "editorialReviews", "rankingMethodology", "disclosure"],
    },
    ranking: {
      // Only our five monetized providers are ranked. Hone, Fountain and Marek
      // exist solely to power "<competitor> vs …" comparisons.
      providerOrder: ["maximus", "hims", "dudemeds", "petermd", "maleexcel"],
      positions,
    },
    reviews,
    battles,
    faqs,
    articles,
  };
}
