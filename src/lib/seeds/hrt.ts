import type {
  SiteConfig,
  Provider,
  ReviewData,
  BattleData,
  FaqItem,
} from "../config";

// ─────────────────────────────────────────────────────────────────────────────
// HRT (menopause / hormone replacement therapy) vertical
//
// House rules, same as every vertical: real telehealth brands with truthful,
// general descriptions and NO invented data - no fabricated prices, Trustpilot
// scores, or program claims. Where we haven't verified a provider's published
// pricing yet, the copy says so and points to the provider's site. Reviews for
// non-affiliate providers are noindexed automatically; affiliate links and
// verified pricing get filled in as partnerships come online (the same flow
// used for HealthRx and Sprout in weight-loss).
// ─────────────────────────────────────────────────────────────────────────────

const UPDATED = "2026-08-23";
const PRICING_TBD =
  "We haven't verified this provider's current published pricing yet - plans and treatment costs vary, so check the provider's site for current rates. This page will carry exact verified prices once we've confirmed them.";

const providers: Provider[] = [
  {
    id: "midi",
    name: "Midi Health",
    tagline: "Virtual perimenopause and menopause care, often covered by insurance",
    logo: "/logos/midi.svg",
    smallLogo: "/logos/midi-icon.svg",
    highlights: [
      "Clinicians trained in midlife women's health",
      "Hormonal and non-hormonal treatment paths",
      "Works with many major insurance plans",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
  {
    id: "gala",
    name: "Gala",
    tagline: "Telehealth hormone care prescribed and managed online",
    logo: "/logos/gala.svg",
    smallLogo: "/logos/gala-icon.svg",
    highlights: [
      "Online provider evaluation",
      "Prescription treatment shipped to your door",
      "Ongoing care through the platform",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
  {
    id: "winona",
    name: "Winona",
    tagline: "Menopause-focused telehealth prescribing body-identical hormone therapy",
    logo: "/logos/winona.svg",
    smallLogo: "/logos/winona-icon.svg",
    highlights: [
      "Dedicated to menopause and perimenopause",
      "Physician-prescribed hormone therapy",
      "Discreet monthly home delivery",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
  {
    id: "innerbalance",
    name: "Inner Balance",
    tagline: "Personalized hormone replacement therapy, managed online",
    logo: "/logos/innerbalance.svg",
    smallLogo: "/logos/innerbalance-icon.svg",
    highlights: [
      "Provider-guided hormone treatment",
      "Personalized plans after medical review",
      "Home delivery of prescriptions",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
  {
    id: "hone",
    name: "Hone",
    tagline: "At-home lab testing with physician-led hormone care",
    logo: "/logos/hone.svg",
    smallLogo: "/logos/hone-icon.svg",
    highlights: [
      "At-home lab test before treatment",
      "Physician consultation on your results",
      "Ongoing monitoring and dose management",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
  {
    id: "wisp",
    name: "Wisp",
    tagline: "Women's telehealth with menopause care alongside broader sexual health",
    logo: "/logos/wisp.svg",
    smallLogo: "/logos/wisp-icon.svg",
    highlights: [
      "Menopause and hormone support",
      "Broader women's health treatment in one place",
      "Fast online visits, discreet delivery",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
  },
  {
    id: "directmeds",
    name: "DirectMeds",
    tagline: "Pharmacy-direct telehealth with straightforward flat pricing",
    logo: "/logos/directmeds.svg",
    smallLogo: "/logos/directmeds-icon.svg",
    highlights: [
      "Pharmacy-direct fulfillment model",
      "Telemedicine visit included",
      "No membership fees",
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
      "Virtual, insurance-friendly care for perimenopause and menopause with clinicians trained in midlife women's health.",
    reviewIntro:
      "Midi Health is a virtual clinic built specifically around perimenopause and menopause. Its clinicians are trained in midlife women's health, visits happen online, and treatment plans can include both hormonal and non-hormonal options after a medical review. Its most distinctive trait in this ranking: Midi works with many major insurance plans, which most cash-pay telehealth HRT services don't. This review covers the model and who it fits.",
    keyFeatures: [
      "Clinicians trained in midlife women's health",
      "Hormonal and non-hormonal treatment paths",
      "Works with many major insurance plans",
      "Ongoing virtual follow-up",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Hormone therapy (provider-directed)",
      "Non-hormonal prescription options",
      "Lifestyle and symptom-management guidance",
    ],
    pros: [
      "Menopause-specialist care, not general telehealth",
      "Insurance accepted in many cases - rare in this space",
      "Both hormonal and non-hormonal paths after review",
    ],
    cons: [
      "We haven't verified current out-of-pocket pricing",
      "Availability and insurance participation vary by state and plan",
    ],
    bestFor: [
      "Women who want specialist menopause care online",
      "Anyone who wants to use insurance rather than pay cash",
    ],
    finalVerdict:
      "Midi Health is the insurance-friendly specialist of this ranking: dedicated menopause clinicians and both hormonal and non-hormonal paths, with coverage through many major plans. Confirm your plan's participation and current costs on Midi's site - and if you'd rather have simple cash pricing, compare the direct-pay providers below.",
    trustBadges: ["Menopause-trained clinicians", "Licensed US providers", "Insurance-friendly"],
    updatedAt: UPDATED,
  },
  {
    slug: "gala",
    providerId: "gala",
    shortSummary:
      "Telehealth hormone care with online evaluation, prescription treatment and ongoing management.",
    reviewIntro:
      "Gala runs a straightforward telehealth model for hormone care: an online evaluation reviewed by a licensed provider, prescription treatment shipped to your door if appropriate, and ongoing management through the platform. We haven't yet verified Gala's current published pricing or full treatment menu for hormone therapy, so this review sticks to the model and will carry exact figures once confirmed.",
    keyFeatures: [
      "Online provider evaluation",
      "Prescription treatment shipped to your door",
      "Ongoing care through the platform",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Provider-directed hormone treatment",
      "Online follow-up and plan adjustments",
    ],
    pros: [
      "Fully online process",
      "Licensed provider review before any prescription",
      "Home delivery",
    ],
    cons: [
      "We haven't verified current pricing or the full treatment menu",
      "Less published detail than the menopause-specialist services",
    ],
    bestFor: [
      "People who want a simple, fully online hormone-care flow",
      "Those comparing direct-pay alternatives to insurance-based care",
    ],
    finalVerdict:
      "Gala offers the standard modern telehealth flow - evaluate online, prescribe if appropriate, ship, follow up. Until we verify its published pricing and treatment menu, confirm both on Gala's site before comparing it against the specialist services in this ranking.",
    trustBadges: ["Licensed US providers", "Online evaluation"],
    updatedAt: UPDATED,
  },
  {
    slug: "winona",
    providerId: "winona",
    shortSummary:
      "Menopause-focused telehealth prescribing physician-directed, body-identical hormone therapy with discreet monthly delivery.",
    reviewIntro:
      "Winona does one thing: menopause and perimenopause care. Its physicians prescribe body-identical hormone therapy after an online medical review, and treatment ships discreetly to your door on a monthly cycle. That focus is the draw - this is a dedicated menopause service rather than a general telehealth platform with a menopause page. We haven't yet verified Winona's current published plan pricing, so this review covers the model; exact figures land here once confirmed.",
    keyFeatures: [
      "Dedicated entirely to menopause and perimenopause",
      "Physician-prescribed, body-identical hormone therapy",
      "Discreet monthly home delivery",
      "Online medical review and ongoing follow-up",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Body-identical hormone therapy (provider-directed formats)",
      "Ongoing physician follow-up and adjustments",
    ],
    pros: [
      "Menopause-only focus - the service is built for this",
      "Physician review before any prescription",
      "Discreet, recurring home delivery",
    ],
    cons: [
      "We haven't verified current published pricing",
      "Cash-pay model - no insurance path like Midi's",
    ],
    bestFor: [
      "Women who want a dedicated menopause HRT service",
      "Those who prefer a direct-pay subscription over insurance paperwork",
    ],
    finalVerdict:
      "Winona is the focused, direct-pay counterpart to Midi's insurance-based model: a service built entirely around menopause hormone therapy, prescribed by physicians and delivered monthly. Confirm current plan pricing on Winona's site; if insurance coverage matters more than focus, compare Midi Health first.",
    trustBadges: ["Menopause-focused physicians", "Licensed US providers", "Discreet delivery"],
    updatedAt: UPDATED,
  },
  {
    slug: "innerbalance",
    providerId: "innerbalance",
    shortSummary:
      "Personalized, provider-guided hormone replacement therapy managed online with home delivery.",
    reviewIntro:
      "Inner Balance offers hormone replacement therapy managed online: a medical review, a personalized treatment plan, and prescriptions delivered to your door with ongoing provider guidance. We haven't yet verified Inner Balance's current published pricing or full program details, so this review describes the model conservatively and will be expanded with exact, verified figures once we've confirmed them.",
    keyFeatures: [
      "Provider-guided hormone treatment",
      "Personalized plans after medical review",
      "Home delivery of prescriptions",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Provider-directed hormone replacement therapy",
      "Ongoing plan adjustments",
    ],
    pros: [
      "Personalized, provider-guided approach",
      "Fully online with home delivery",
    ],
    cons: [
      "We haven't verified current pricing or program details",
      "Less published information than the bigger names in this ranking",
    ],
    bestFor: [
      "People comparing personalized HRT programs online",
      "Those willing to confirm details directly before enrolling",
    ],
    finalVerdict:
      "Inner Balance follows the personalized-HRT playbook - review, tailored plan, delivery, follow-up. Until we've verified its published pricing and program specifics, treat this as a candidate to compare directly on the provider's site against the better-documented services here.",
    trustBadges: ["Licensed US providers", "Personalized plans"],
    updatedAt: UPDATED,
  },
  {
    slug: "hone",
    providerId: "hone",
    shortSummary:
      "At-home lab testing with physician-led hormone care - treatment decisions built on your bloodwork.",
    reviewIntro:
      "Hone's model starts where most telehealth ends: with your blood. An at-home lab test kicks off the process, a physician reviews your results in a consultation, and treatment - if appropriate - is prescribed and monitored against follow-up labs. That lab-first structure is Hone's defining trait in this ranking, and it appeals to people who want their hormone care anchored to measured levels rather than symptoms alone. We haven't yet verified Hone's current published membership and treatment pricing, so this review covers the model; verified figures will follow.",
    keyFeatures: [
      "At-home lab test before any treatment",
      "Physician consultation on your results",
      "Ongoing monitoring with follow-up labs",
      "Treatment prescribed and adjusted against bloodwork",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Physician-directed hormone therapy based on labs",
      "Recurring lab work and dose management",
    ],
    pros: [
      "Lab-first process - treatment anchored to measured levels",
      "Physician consultation included in the flow",
      "Structured ongoing monitoring",
    ],
    cons: [
      "We haven't verified current membership/treatment pricing",
      "Lab-first flow takes longer to start than questionnaire-only services",
    ],
    bestFor: [
      "People who want bloodwork behind every treatment decision",
      "Those who value structured, monitored hormone care",
    ],
    finalVerdict:
      "Hone is the data-driven pick of this ranking: labs before treatment, physician review of actual results, and monitoring against follow-up bloodwork. The trade-off is a slower start and a membership-style structure - confirm current pricing on Hone's site, and weigh it against the faster questionnaire-based services if speed matters most.",
    trustBadges: ["At-home lab testing", "Physician-led care", "Licensed US providers"],
    updatedAt: UPDATED,
  },
  {
    slug: "wisp",
    providerId: "wisp",
    shortSummary:
      "Women's telehealth covering menopause and hormone support alongside broader sexual and reproductive health.",
    reviewIntro:
      "Wisp is a women's telehealth platform whose menopause and hormone care sits alongside a much broader treatment range - sexual health, reproductive care and everyday prescriptions in one place. That breadth is its angle in this ranking: one account, one pharmacy relationship, multiple needs. We haven't yet verified Wisp's current published pricing for its menopause line, so this review covers the model and will carry verified figures once confirmed.",
    keyFeatures: [
      "Menopause and hormone support",
      "Broader women's health treatment in one platform",
      "Fast online visits, discreet delivery",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Provider-directed menopause and hormone treatment",
      "Related women's health prescriptions",
    ],
    pros: [
      "One platform for multiple women's health needs",
      "Quick online process with discreet delivery",
      "Established women's telehealth brand",
    ],
    cons: [
      "We haven't verified current menopause-line pricing",
      "Not a menopause-specialist service like Winona or Midi",
    ],
    bestFor: [
      "Women who want hormone support inside a broader care platform",
      "Those who value one account for multiple treatments",
    ],
    finalVerdict:
      "Wisp makes sense when menopause care is one of several things you want handled in one place. If dedicated menopause specialization is the priority, Midi Health and Winona are built for exactly that - Wisp's advantage is breadth. Confirm current pricing on Wisp's site.",
    trustBadges: ["Women's telehealth platform", "Licensed US providers", "Discreet delivery"],
    updatedAt: UPDATED,
  },
  {
    slug: "directmeds",
    providerId: "directmeds",
    shortSummary:
      "Pharmacy-direct telehealth known from our weight-loss ranking for flat pricing and fast fulfillment - hormone care details to be verified.",
    reviewIntro:
      "DirectMeds runs a pharmacy-direct telehealth model we know well from our weight-loss ranking, where it earns its place with flat pricing, an included telemedicine visit, no membership fees and fast free shipping - backed by a 4.6 Trustpilot average across 13,901 reviews. For hormone therapy specifically, we haven't yet verified DirectMeds' published treatment menu or pricing, so this review describes the operator honestly and will be completed with exact, verified hormone-care figures once confirmed.",
    keyFeatures: [
      "Pharmacy-direct fulfillment model",
      "Telemedicine visit included",
      "No membership fees",
      "4.6 across 13,901 Trustpilot reviews (operator-level record)",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Provider-directed treatment (hormone-care menu to be verified)",
    ],
    pros: [
      "Operator with a large verified customer record (4.6 across 13,901 reviews)",
      "Known for flat pricing and 1-2 day shipping in our weight-loss ranking",
      "No membership fees",
    ],
    cons: [
      "Hormone-care treatment menu and pricing not yet verified by us",
      "Not a menopause-specialist service",
    ],
    bestFor: [
      "People who already trust the DirectMeds model from other treatment areas",
      "Those who prioritize simple pricing and fast fulfillment",
    ],
    finalVerdict:
      "DirectMeds brings a proven operator record - flat pricing, fast shipping and a five-figure Trustpilot base - into the hormone space. What we can't yet tell you is exactly what its hormone-care menu and prices are; until we verify them, confirm details on DirectMeds' site and compare against the menopause specialists above.",
    trustBadges: ["4.6 across 13,901 Trustpilot reviews", "No membership fees", "Telemedicine visit included"],
    updatedAt: UPDATED,
  },
];

const battles: BattleData[] = [
  {
    slug: "midi-vs-winona",
    provider1Id: "midi",
    provider2Id: "winona",
    title: "Midi Health vs Winona: Which Menopause Care Model Fits You in 2026?",
    matchupLabel: "Midi Health vs Winona",
    subtitle: "Insurance-friendly specialist visits vs a focused, direct-pay hormone-therapy subscription.",
    description:
      "Midi Health (menopause-trained clinicians, works with many insurance plans, hormonal + non-hormonal paths) vs Winona (dedicated body-identical HRT, direct pay, monthly delivery). An honest model comparison.",
    intro:
      "Midi Health and Winona are both built specifically around menopause - which makes this the most instructive matchup in our HRT ranking. The difference is the model. Midi runs like a virtual specialist clinic: menopause-trained clinicians, visits that many major insurance plans cover, and treatment plans that can be hormonal or non-hormonal. Winona runs like a focused product: physician-prescribed, body-identical hormone therapy on a direct-pay subscription, shipped discreetly every month. We haven't yet verified either provider's current published pricing, so this comparison is about the care model - the thing that actually separates them.",
    verdict:
      "Choose by how you want to pay and how broad you want the care to be. If you have insurance that participates and want a clinician who can also weigh non-hormonal options, Midi Health is the stronger model - specialist care with coverage is rare in this space. If you've decided on hormone therapy and want a dedicated service with predictable direct-pay delivery, Winona's focus is the draw. Confirm current pricing and availability on both sites before deciding.",
    verdictWinnerPoints: [
      "Works with many major insurance plans",
      "Hormonal AND non-hormonal treatment paths",
      "Clinicians trained in midlife women's health",
    ],
    verdictLoserPoints: [
      "Dedicated entirely to menopause hormone therapy",
      "Direct-pay subscription with monthly delivery",
      "No insurance paperwork to navigate",
    ],
    winnerId: "midi",
    categories: [
      {
        name: "Care Model",
        winner: "provider1",
        explanation:
          "Both are menopause-focused, but Midi's clinic model covers more ground: its clinicians can steer between hormonal and non-hormonal options after review, where Winona is built around hormone therapy specifically. For someone still deciding what treatment fits, the broader menu matters.",
        supportingPoints: [
          "Hormonal + non-hormonal paths (Midi)",
          "Dedicated HRT focus (Winona)",
          "Medical review before prescribing (both)",
        ],
      },
      {
        name: "Paying for It",
        winner: "provider1",
        explanation:
          "Midi works with many major insurance plans - genuinely unusual for telehealth menopause care, where direct pay is the norm. Winona is direct-pay by design, which is simpler but entirely out of pocket. We haven't verified current cash prices at either, so the coverage difference is the decidable fact.",
        supportingPoints: [
          "Many major insurance plans accepted (Midi)",
          "Direct-pay simplicity, no claims (Winona)",
        ],
      },
      {
        name: "Convenience & Delivery",
        winner: "provider2",
        explanation:
          "Winona's subscription model ships treatment discreetly to your door on a monthly cycle - a set-and-forget structure. Midi's clinic model centers on visits and prescriptions, with fulfillment depending on your plan and pharmacy.",
        supportingPoints: [
          "Discreet monthly home delivery (Winona)",
          "Visit-centered clinic flow (Midi)",
        ],
      },
      {
        name: "Specialization",
        winner: "tie",
        explanation:
          "This is the rare matchup where both sides are true specialists - Midi in midlife women's health broadly, Winona in menopause hormone therapy specifically. Neither is a general telehealth platform with a menopause page bolted on.",
        supportingPoints: [
          "Menopause-trained clinicians (Midi)",
          "Menopause-only service (Winona)",
        ],
      },
    ],
    features: [
      { feature: "Focus", provider1Value: "Perimenopause & menopause clinic", provider2Value: "Menopause hormone therapy", highlight: "both" },
      { feature: "Insurance", provider1Value: "Many major plans accepted", provider2Value: "Direct pay", highlight: "provider1" },
      { feature: "Treatment paths", provider1Value: "Hormonal + non-hormonal", provider2Value: "Body-identical hormone therapy", highlight: "provider1" },
      { feature: "Delivery", provider1Value: "Via plan/pharmacy", provider2Value: "Discreet monthly home delivery", highlight: "provider2" },
      { feature: "Pricing", provider1Value: "Verify on site", provider2Value: "Verify on site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "hone-vs-winona",
    provider1Id: "hone",
    provider2Id: "winona",
    title: "Hone vs Winona: Labs-First or Menopause-First Hormone Care in 2026?",
    matchupLabel: "Hone vs Winona",
    subtitle: "At-home bloodwork driving treatment decisions vs a dedicated menopause HRT service.",
    description:
      "Hone (at-home lab testing, physician review of your results, monitored treatment) vs Winona (menopause-focused, body-identical HRT, monthly delivery). Two philosophies of online hormone care, compared honestly.",
    intro:
      "Hone and Winona answer the same question - how should hormone care work online? - with opposite philosophies. Hone starts with data: an at-home lab test, a physician consultation on your actual results, and treatment monitored against follow-up bloodwork. Winona starts with the condition: a service built entirely around menopause, prescribing body-identical hormone therapy after an online medical review, delivered monthly. We haven't verified either provider's current published pricing, so this comparison weighs the models themselves.",
    verdict:
      "Pick the philosophy that matches your situation. If you want treatment decisions anchored to measured hormone levels - and don't mind a slower, lab-gated start - Hone's structure is the more rigorous of the two. If you're navigating menopause specifically and want a service purpose-built for it with simple recurring delivery, Winona is the more direct route. Confirm current pricing and program details on both sites.",
    verdictWinnerPoints: [
      "At-home labs before any treatment decision",
      "Physician consultation on your actual results",
      "Ongoing monitoring against follow-up bloodwork",
    ],
    verdictLoserPoints: [
      "Purpose-built for menopause specifically",
      "Body-identical HRT with monthly discreet delivery",
      "Faster start - no lab kit round-trip",
    ],
    winnerId: "hone",
    categories: [
      {
        name: "Clinical Rigor",
        winner: "provider1",
        explanation:
          "Hone's lab-first structure means treatment starts from measured levels and is adjusted against follow-up labs - the most data-anchored flow in our HRT ranking. Winona runs a real physician review, but the process is symptom- and history-led rather than lab-gated.",
        supportingPoints: [
          "Baseline labs before treatment (Hone)",
          "Follow-up labs for dose management (Hone)",
          "Physician review at both",
        ],
      },
      {
        name: "Menopause Specialization",
        winner: "provider2",
        explanation:
          "Winona is a menopause service, full stop - its treatment formats, physicians and content are built for that population. Hone is a hormone-optimization platform whose scope is broader, which cuts both ways: more flexibility, less singular focus.",
        supportingPoints: [
          "Menopause-only service (Winona)",
          "Broader hormone-care scope (Hone)",
        ],
      },
      {
        name: "Speed to Start",
        winner: "provider2",
        explanation:
          "Winona's online review can move to treatment quickly. Hone's model requires the lab kit round-trip and a results consultation before anything ships - more rigorous, unavoidably slower.",
        supportingPoints: [
          "Questionnaire + review to start (Winona)",
          "Lab kit round-trip first (Hone)",
        ],
      },
    ],
    features: [
      { feature: "Starting point", provider1Value: "At-home lab test", provider2Value: "Online medical review", highlight: "both" },
      { feature: "Focus", provider1Value: "Hormone care, lab-driven", provider2Value: "Menopause HRT", highlight: "both" },
      { feature: "Monitoring", provider1Value: "Follow-up labs", provider2Value: "Physician follow-up", highlight: "provider1" },
      { feature: "Delivery", provider1Value: "Ships after labs + consult", provider2Value: "Discreet monthly delivery", highlight: "provider2" },
      { feature: "Pricing", provider1Value: "Verify on site", provider2Value: "Verify on site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
];

const faqs: FaqItem[] = [
  {
    question: "What is HRT for menopause?",
    answer:
      "Hormone replacement therapy (HRT) uses estrogen - often with progesterone - to relieve menopause symptoms such as hot flashes and night sweats. It's a prescription treatment that a licensed provider tailors to your history and needs.",
  },
  {
    question: "Is hormone replacement therapy safe?",
    answer:
      "HRT has benefits and risks that depend on your age, health history, and the type and timing of treatment. A licensed provider will review your situation to determine whether it's appropriate for you - it isn't right for everyone.",
  },
  {
    question: "Do I need lab tests or an evaluation for HRT?",
    answer:
      "Providers evaluate your symptoms and medical history before prescribing, and some - like lab-first services - require bloodwork up front. Ongoing follow-up helps tailor treatment and monitor your response.",
  },
  {
    question: "Can HRT be prescribed online?",
    answer:
      "Yes - reputable telehealth services connect you with licensed clinicians who review your information before prescribing, and dispense through licensed pharmacies. Always confirm a provider's licensing and practices.",
  },
  {
    question: "Does insurance cover online menopause care?",
    answer:
      "It depends on the provider and your plan. Most telehealth HRT services are direct-pay, but some - Midi Health among them - work with many major insurance plans. Check both the provider's site and your plan before assuming either way.",
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
        "Compare the best online HRT and menopause providers - care models, specialist focus, insurance friendliness and treatment options - to find the program that fits you. Where we haven't verified a provider's pricing yet, we say so instead of guessing.",
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
