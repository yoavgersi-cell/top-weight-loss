import type {
  SiteConfig,
  Provider,
  ReviewData,
  BattleData,
  FaqItem,
  ArticleData,
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
    // Operator-verified from Midi Health's claimed Trustpilot profile
    // (Aug 2026 screenshots): 4.1 average across 1,572 reviews.
    trustpilotRating: "4.1",
    trustpilotReviewCount: "1,572",
    trustpilotReviews: [
      {
        title: "Scheduling a telehealth appointment was refreshingly simple",
        text: "The process was straightforward and quick - I was able to book a visit without any hassle or long waits. The clinician I met with was wonderful. She was kind, compassionate, and really took the time to listen and understand what I needed. She clearly knew the issues women face in midlife and approached everything with empathy and practical solutions.",
        name: "Gina",
        location: "US",
        rating: 5,
        date: "Aug 24, 2026",
      },
      {
        title: "I have had an exceptional experience",
        text: "I would highly recommend their care to any woman navigating peri/menopause. My clinician is knowledgeable, compassionate, thoughtful, and truly takes the time to listen and understand. I felt heard and supported and she took the time to answer my questions and develop a personalized treatment. I never felt rushed or dismissed, which can unfortunately be difficult to find when seeking menopause care.",
        name: "SD",
        location: "US",
        rating: 5,
        date: "Aug 24, 2026",
      },
      {
        title: "Highly recommend",
        text: "My PA was professional and very thorough. She took time to listen and clearly explained options. She verified my medical history. She answered all my questions demonstrating knowledge and understanding.",
        name: "Kristyn Shipley",
        location: "US",
        rating: 5,
        date: "Aug 20, 2026",
      },
      {
        title: "I felt heard and understood",
        text: "I felt heard. My doctor understood my concerns. She was kind and patient and demonstrated real care - I had not felt this from any other outside, local clinician. My exams were ordered within minutes enabling me to have these done same day. Unheard of! Honestly. Best experience ever!",
        name: "B. J.",
        location: "US",
        rating: 5,
        date: "Aug 19, 2026",
      },
      {
        title: "My provider is amazing and supportive",
        text: "She listens to me and addresses my concerns. She tells me the truth and discusses the pros and cons. I appreciate her so much!",
        name: "Elizabeth Batson",
        location: "US",
        rating: 5,
        date: "Aug 19, 2026",
      },
    ],
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
      "Free physician consultation - pay only if prescribed",
      "Flat published prices from $39/month; FSA/HSA eligible",
      "Discreet monthly home delivery",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
    // Operator-verified from Winona's claimed Trustpilot profile
    // ("By Winona", Aug 2026 screenshots): 4.6 average across 8,138 reviews.
    trustpilotRating: "4.6",
    trustpilotReviewCount: "8,138",
    trustpilotReviews: [
      {
        title: "Legit",
        text: "Legit. doctors, easy to use would recommend",
        name: "Sheila Baylis",
        location: "US",
        rating: 5,
        date: "Aug 26, 2026",
      },
      {
        title: "Great response time and attention to detail",
        text: "Great response time and attention to detail. Doctors are responsive.",
        name: "Melissa Morehouse",
        location: "US",
        rating: 5,
        date: "Aug 26, 2026",
      },
      {
        title: "The meds really help",
        text: "The meds really help",
        name: "Kathryn Jones",
        location: "US",
        rating: 5,
        date: "Aug 26, 2026",
      },
      {
        title: "Helpful",
        text: "Helpful, efficient, great results. Quick answers to questions.",
        name: "Ann M Ivins",
        location: "US",
        rating: 5,
        date: "Aug 19, 2026",
      },
    ],
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
      "Midi Health is a virtual clinic built specifically around perimenopause and menopause - \"Insurance-Covered Hormone Replacement Therapy\" is literally its headline. Care starts with an in-depth virtual visit where a clinician reviews your symptoms, health history and genetics before deciding whether HRT is appropriate; Midi itself notes HRT \"is not appropriate for all\", which is the right posture. Treatment paths span estradiol gels, creams, patches and pills, micronized progesterone, testosterone where clinically appropriate, and non-hormonal prescriptions when hormones aren't the answer. Midi says more than 230,000 women use its midlife care, and its claimed Trustpilot profile averages 4.1 across 1,572 reviews. This review covers the model and who it fits.",
    keyFeatures: [
      "Clinicians trained in midlife women's health",
      "Hormonal and non-hormonal treatment paths",
      "Works with many major insurance plans",
      "Ongoing virtual follow-up",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Estradiol gels, creams, patches and pills",
      "Micronized progesterone capsules",
      "Vaginal estrogen therapies (creams or rings)",
      "Testosterone therapy where clinically appropriate",
      "Non-hormonal prescriptions (e.g. SSRIs, neurokinin-3 antagonists) and lifestyle support",
    ],
    pros: [
      "Menopause-specialist care, not general telehealth",
      "Insurance accepted in many cases - rare in this space",
      "Both hormonal and non-hormonal paths after review",
      "4.1 Trustpilot average across 1,572 reviews",
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
      "Midi Health is the insurance-friendly specialist of this ranking: dedicated menopause clinicians, a genuinely broad treatment menu (from estradiol formats through testosterone to non-hormonal prescriptions), and coverage through many major plans - backed by a 4.1 Trustpilot average across 1,572 reviews whose recent entries consistently praise clinicians who listen and know midlife medicine. Confirm your plan's participation and current costs on Midi's site - and if you'd rather have simple cash pricing, compare the direct-pay providers below.",
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
      "Winona does one thing: menopause and perimenopause care. Board-certified physicians prescribe bioidentical hormone therapy after an online medical review - the consultation itself is free, and you pay only if a physician prescribes and you approve the treatment. Prices are flat and published: creams run $89/month, estrogen tablets $54, progesterone capsules $39, with FSA/HSA eligibility and discreet monthly delivery. Its claimed Trustpilot profile averages 4.6 across 8,138 reviews - the strongest verified record in this ranking. Winona itself reports a 4.6/5 rating from 100,000+ women.",
    keyFeatures: [
      "Dedicated entirely to menopause and perimenopause",
      "Free physician consultation - pay only if prescribed",
      "Flat published prices; FSA/HSA eligible",
      "Discreet monthly home delivery",
    ],
    pricingSummary:
      "Winona publishes flat monthly prices, rare in menopause care: Estrogen Body Cream, Progesterone Body Cream, combined Estrogen + Progesterone Body Cream and Vaginal Estrogen Cream each run $89/month; Estrogen Tablets are $54/month, Progesterone Capsules $39/month, and the DHEA supplement is $27 per 3 months. The physician consultation is free - you pay only if prescribed and you approve the plan - and purchases are FSA/HSA eligible. Prices as published in August 2026; confirm current rates on Winona's site.",
    pricingPlans: [
      { name: "Progesterone Capsules", medication: "Micronized progesterone", price: "$39", unit: "/month" },
      { name: "Estrogen Tablets", medication: "Bioidentical estrogen", price: "$54", unit: "/month" },
      { name: "Estrogen Body Cream", medication: "Bioidentical estrogen", price: "$89", unit: "/month" },
      { name: "Progesterone Body Cream", medication: "Micronized progesterone", price: "$89", unit: "/month" },
      { name: "Estrogen + Progesterone Body Cream", medication: "Combined bioidentical formula", price: "$89", unit: "/month" },
      { name: "Vaginal Estrogen Cream", medication: "Localized bioidentical estrogen", price: "$89", unit: "/month" },
      { name: "DHEA", medication: "DHEA supplement (90 capsules)", price: "$27", unit: "/3 months" },
    ],
    treatmentOptions: [
      "Body creams - estrogen, progesterone, or combined",
      "Vaginal estrogen cream",
      "Estrogen tablets and progesterone capsules",
      "Patch delivery format",
      "DHEA supplement",
    ],
    pros: [
      "Menopause-only focus - the service is built for this",
      "Free consultation; flat published prices from $39/month",
      "4.6 Trustpilot average across 8,138 reviews",
      "FSA/HSA eligible with discreet recurring delivery",
    ],
    cons: [
      "Cash-pay model - no insurance path like Midi's",
      "Compounded formulations are not individually FDA-approved products",
    ],
    bestFor: [
      "Women who want a dedicated menopause HRT service",
      "Those who prefer flat direct-pay pricing over insurance paperwork",
    ],
    finalVerdict:
      "Winona is the focused, direct-pay counterpart to Midi's insurance-based model: a service built entirely around menopause hormone therapy, with a free physician consultation, flat published prices ($39-$89/month by product), FSA/HSA eligibility and a 4.6 Trustpilot average across 8,138 reviews. If insurance coverage matters more than pricing simplicity, compare Midi Health first - otherwise this is the most transparent offer in our HRT ranking.",
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
      { feature: "Pricing", provider1Value: "Depends on your insurance plan", provider2Value: "$39-$89/mo published; free consult", highlight: "provider2" },
      { feature: "Trustpilot", provider1Value: "4.1 (1,572 reviews)", provider2Value: "4.6 (8,138 reviews)", highlight: "provider2" },
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
      { feature: "Pricing", provider1Value: "Verify on site", provider2Value: "$39-$89/mo published; free consult", highlight: "provider2" },
    ],
    updatedAt: UPDATED,
  },
];

// SEO long-tail guides for the menopause/HRT query space. No provider pricing
// exists in this vertical yet, so every article is educational and hedged -
// zero invented numbers, no efficacy statistics, treatment decisions always
// deferred to a licensed clinician. Question headings feed the FAQPage schema.
const articles: ArticleData[] = [
  {
    slug: "how-to-get-hrt-online",
    title: "How to Get HRT Online in 2026: The Legitimate Route",
    description:
      "How hormone replacement therapy is prescribed online: the telehealth process, what a legitimate provider always requires, and how to compare menopause care models.",
    category: "Guide",
    readTime: "5 min read",
    publishedAt: "2026-08-28",
    updatedAt: "2026-08-28",
    heroColor: "#F7EEF4",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "Can you get HRT prescribed online?",
        body: `Yes - menopause care has moved online the same way other specialties have. Licensed clinicians evaluate your symptoms, health history and risk factors through a telehealth visit, and if hormone therapy is appropriate, prescriptions are filled through licensed pharmacies and shipped or sent to your local pharmacy. What never changes: HRT is prescription-only, and a legitimate service always puts a licensed clinician's evaluation before any treatment. Anything that skips that step isn't a shortcut - it's a red flag.`,
      },
      {
        heading: "How does the online HRT process work?",
        body: `The typical flow has three steps. First, an intake: your symptoms, cycle history, medical and family history, and any prior hormone use. Second, a clinician visit - at specialist menopause services this is usually a real video appointment rather than a questionnaire review, because hormone therapy decisions are individual and risk-dependent. Third, if prescribed, treatment ships with ongoing follow-up to adjust dose and delivery method. Compare how the leading services structure this in our <a href="/hrt/midi-vs-winona">Midi Health vs Winona</a> comparison.`,
      },
      {
        heading: "What should you check before choosing an online HRT provider?",
        body: `Four things separate serious menopause care from a checkout page: a licensed clinician who actually evaluates you (and can decline treatment); clarity about what's included in the visit and follow-up; transparency about whether they work with insurance or are cash-pay; and a real conversation about risks and alternatives, not just a yes. Our <a href="/hrt">HRT provider ranking</a> compares the care models side by side - and where we haven't verified a provider's pricing, we say so rather than guessing.`,
      },
      {
        heading: "Is online HRT right for everyone?",
        body: `No - and a good provider will tell you that. Hormone therapy has real contraindications, and the right first step depends on your history; some situations call for in-person care and exams. Telehealth shines for access and follow-up convenience, especially where menopause specialists are scarce locally. Start with <a href="/hrt/articles/perimenopause-vs-menopause">perimenopause vs menopause</a> to map where you are, and bring that picture to a licensed clinician.`,
      },
    ],
  },
  {
    slug: "estrogen-patch-vs-pill",
    title: "Estrogen Patch vs Pill: Which HRT Delivery Fits You?",
    description:
      "Estrogen patch vs pill for HRT: how the delivery methods differ, why clinicians weigh them differently, and the questions to bring to your prescriber.",
    category: "Guide",
    readTime: "5 min read",
    publishedAt: "2026-08-28",
    updatedAt: "2026-08-28",
    heroColor: "#EEF4FB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "What's the difference between the estrogen patch and the pill?",
        body: `Same hormone family, different route into the body. A patch delivers estrogen through the skin directly into the bloodstream and is typically changed once or twice a week; a pill is taken daily and is processed through the digestive system and liver first. That routing difference is why clinicians often weigh the two differently for different women - it's a genuine clinical decision, not a preference checkbox.`,
      },
      {
        heading: "Why do clinicians often prefer transdermal options?",
        body: `Because skin delivery bypasses first-pass liver processing, transdermal estrogen is often discussed for women where that pathway matters to risk assessment. Whether that applies to you depends on your personal and family history - which is exactly what the prescribing visit is for. The honest takeaway: neither format is universally "better"; the right one is the one your clinician matches to your profile and that you'll use consistently.`,
      },
      {
        heading: "Are there other HRT delivery methods?",
        body: `Yes - gels and sprays (also transdermal), vaginal formulations for localized symptoms, and progesterone components in their own forms for women with a uterus. Online menopause services differ in which formats they prescribe and whether they use standard FDA-approved products or compounded formulations - see <a href="/hrt/articles/bioidentical-hormones-explained">what "bioidentical" actually means</a> for that distinction, and compare provider approaches on our <a href="/hrt">HRT ranking</a>.`,
      },
      {
        heading: "How do you decide - patch, pill, or something else?",
        body: `Bring three things to a licensed clinician: your symptom picture, your health history (including clotting, cardiovascular and cancer history in you and your family), and your honest preference about daily pills versus weekly patches - adherence is a real clinical factor. A specialist visit is where this gets settled; our <a href="/hrt/midi-vs-winona">comparison of menopause care models</a> shows how the leading online services run that conversation.`,
      },
    ],
  },
  {
    slug: "bioidentical-hormones-explained",
    title: "Bioidentical Hormones: What the Term Actually Means",
    description:
      "\"Bioidentical\" is one of the most misused words in menopause care. What it really means, the difference between FDA-approved and compounded bioidenticals, and the questions that matter.",
    category: "Science",
    readTime: "5 min read",
    publishedAt: "2026-08-28",
    updatedAt: "2026-08-28",
    heroColor: "#F0FAF5",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "What does \"bioidentical\" actually mean?",
        body: `Chemically, it means the hormone molecule matches the one your body produces - estradiol that is structurally estradiol, progesterone that is structurally progesterone. Here's what marketing often skips: many standard, FDA-approved HRT products are already bioidentical by that definition. The word describes the molecule, not the manufacturer, and it isn't a synonym for "natural" or "safer".`,
      },
      {
        heading: "FDA-approved vs compounded bioidenticals: what's the difference?",
        body: `FDA-approved bioidentical products are manufactured at standardized doses with regulatory oversight of quality and labeling. Compounded bioidentical hormone therapy is mixed per-prescription by a compounding pharmacy - which allows customized doses and combinations, with the trade-off that compounded preparations are not individually FDA-approved products. Online menopause services differ on exactly this line, and it's worth knowing which model a provider uses before you start - our <a href="/hrt">HRT provider comparison</a> notes each service's approach.`,
      },
      {
        heading: "Is compounded HRT right for you?",
        body: `That's a clinician conversation, not a marketing one. Reasonable candidates include women who need doses or combinations standard products don't offer. The important questions to ask any provider: why compounded rather than an FDA-approved product for my case, which pharmacy compounds it, and how will dosing be monitored and adjusted. A provider comfortable with those questions is a good sign in itself.`,
      },
      {
        heading: "What are the red flags to avoid?",
        body: `Claims that bioidentical means risk-free; hormone "pellets" or protocols sold with promises no evidence supports; salivary-test-driven dosing pitched as precision; and anyone prescribing without a real clinical evaluation. Hormone therapy is legitimate medicine with real trade-offs - treat any provider who pretends otherwise accordingly. Start from <a href="/hrt/articles/how-to-get-hrt-online">how legitimate online HRT works</a> and compare real services on our <a href="/hrt">ranking</a>.`,
      },
    ],
  },
  {
    slug: "perimenopause-vs-menopause",
    title: "Perimenopause vs Menopause: When Does Treatment Start?",
    description:
      "Perimenopause vs menopause: how the stages differ, why symptoms often start years before periods stop, and when a treatment conversation makes sense.",
    category: "Guide",
    readTime: "5 min read",
    publishedAt: "2026-08-28",
    updatedAt: "2026-08-28",
    heroColor: "#F7EEF4",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "What is the difference between perimenopause and menopause?",
        body: `Menopause is technically a single milestone - twelve consecutive months without a period. Perimenopause is the transition running up to it, often lasting years, when hormone levels fluctuate and symptoms typically begin: cycle changes, hot flashes, sleep disruption, mood shifts. The distinction matters because many women assume treatment is only "for menopause" - while their hardest symptom years are happening before that milestone.`,
      },
      {
        heading: "Can you start treatment during perimenopause?",
        body: `Treatment conversations don't wait for the twelve-month mark - symptom relief during the transition is a legitimate clinical topic, and options (hormonal and non-hormonal) depend on your symptoms, cycle status and history. That's a licensed clinician's call, made with your full picture. Specialist menopause services are built around exactly this evaluation - see how the leading models compare in <a href="/hrt/midi-vs-winona">Midi Health vs Winona</a>.`,
      },
      {
        heading: "When should you actually talk to a clinician?",
        body: `A practical rule: when symptoms interfere with your life - sleep, work, relationships - that's enough reason, regardless of where you are on the timeline. Track your symptoms and cycle for a few weeks before the visit; concrete patterns make the evaluation better. And if a clinician dismisses menopause-related concerns outright, that's a reason to find one who specializes - which is much of why <a href="/hrt/articles/how-to-get-hrt-online">online menopause care</a> exists. Compare the services on our <a href="/hrt">HRT ranking</a>.`,
      },
    ],
  },
  {
    slug: "is-hrt-the-same-as-trt",
    title: "Is HRT the Same as TRT? The Difference, Explained",
    description:
      "HRT and TRT are both hormone replacement - but they answer different situations. What each treats, who each is for, and where to compare providers for both.",
    category: "Guide",
    readTime: "4 min read",
    publishedAt: "2026-08-28",
    updatedAt: "2026-08-28",
    heroColor: "#EEF4FB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "Is HRT the same as TRT?",
        body: `They're siblings, not twins. Both replace hormones the body is producing less of, but "HRT" conventionally refers to menopause hormone therapy - estrogen, usually with progesterone - while "TRT" is testosterone replacement therapy, most commonly for men with clinically low testosterone. Different hormones, different diagnostics, different specialists, and largely different providers.`,
      },
      {
        heading: "Who is each treatment for?",
        body: `Menopause HRT addresses symptoms of the menopause transition, confirmed mainly by symptoms and history. TRT addresses diagnosed low testosterone, which requires blood work - legitimate TRT providers always test before treating. Women can also be prescribed testosterone in specific clinical situations, but that's a specialist decision within menopause care, not "TRT" as marketed to men.`,
      },
      {
        heading: "Where do you compare providers for each?",
        body: `We rank them separately, because the clinical models are separate: the <a href="/hrt">HRT &amp; menopause provider comparison</a> covers the online menopause clinics, and the <a href="/trt">TRT provider comparison</a> covers testosterone services (including what each charges, where we've verified it). Whichever side you're on, the constant is the same: a licensed clinician's evaluation first, treatment second.`,
      },
    ],
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
    articles,
    faqs,
  };
}
