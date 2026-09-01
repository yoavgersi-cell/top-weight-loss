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
// pricing yet, the copy says so and points to the provider's site. All
// reviews index (Aug 2026 operator policy); affiliate links and verified
// pricing get filled in as partnerships come online (the same flow used for
// HealthRx and Sprout in weight-loss).
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
    id: "nurx",
    name: "Nurx",
    tagline: "Telehealth pharmacy whose Solstice HRT system starts at a published $39/month",
    logo: "/logos/nurx.svg",
    smallLogo: "/logos/nurx-icon.svg",
    highlights: [
      "Published plans starting at $39/month",
      "Adjustable estrogen/progesterone system (Solstice)",
      "HSA/FSA eligible; satisfaction guarantee per published terms",
    ],
    affiliateUrl: "#",
    ctaText: "Visit Site",
    // Operator-verified from Nurx's claimed Trustpilot profile (Aug 2026
    // screenshots): 4.1 average across 1,839 reviews. The profile covers the
    // whole Nurx pharmacy platform, not the HRT line alone - the review says
    // so explicitly.
    trustpilotRating: "4.1",
    trustpilotReviewCount: "1,839",
    trustpilotReviews: [
      {
        title: "Love it!",
        text: "Website is easy to use. I love that I can get my prescription in the mail. I've been using this service for years. Highly recommend!",
        name: "Heather",
        location: "US",
        rating: 5,
        date: "Aug 15, 2026",
      },
      {
        title: "Much better than making a dr. appointment",
        text: "Smooth refills every 3 months. I've tried to get medication from my OBGYN or in person provider's during yearly check ups but they can never get the script right. Nurx wrote my prescription without any problems or errors. Simple, cost effective and provider's who actually listen to what you are requesting.",
        name: "Michelle",
        location: "US",
        rating: 5,
        date: "Aug 13, 2026",
      },
      {
        title: "Very simple and comprehensive",
        text: "It was very simple and comprehensive with no hidden fees and I was finally able to receive the care I've been needing at a price I can afford",
        name: "Cate Gray",
        location: "US",
        rating: 5,
        date: "Jul 6, 2026",
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
    slug: "nurx",
    providerId: "nurx",
    shortSummary:
      "Large telehealth pharmacy whose Solstice HRT system pairs bioidentical estradiol with progesterone at a published $39/month starting price.",
    reviewIntro:
      "Nurx is a different animal from the menopause-only clinics in this ranking: a large telehealth pharmacy (born in birth control and sexual health) that added hormone replacement through its Solstice system. The pitch is personalization at a published price - bioidentical estradiol as a daily tablet or gel, micronized progesterone capsules included when clinically needed, and an optional vaginal estrogen cream, with the estrogen/progesterone ratio adjustable under clinical guidance rather than fixed. Plans start at a published $39/month (a 40% off first-month promotion was live at the time of review), care is HSA/FSA eligible with no insurance needed, and its claimed Trustpilot profile averages 4.1 across 1,839 reviews - covering the whole Nurx platform, not the HRT line alone.",
    keyFeatures: [
      "Published starting price: $39/month",
      "Adjustable estrogen/progesterone ratios (Solstice system)",
      "HSA/FSA eligible; no insurance needed",
      "Clinical assistance via messaging; US-based care agents",
    ],
    pricingSummary:
      "Nurx publishes a $39/month starting price for the Solstice All-in-1 HRT system - bioidentical estrogen with daily progesterone capsules included when needed - with a 40% off first-month promotion live at the time of review, free shipping, and published on-time-refill and 100% satisfaction guarantees (per Nurx's terms). Care is HSA/FSA eligible and no insurance is needed. Exact monthly cost depends on the plan a clinician prescribes; prices as published in August 2026 - confirm current rates on Nurx's site.",
    pricingPlans: [
      {
        name: "Solstice All-in-1 HRT System",
        medication: "Bioidentical estradiol (tablet or gel) + progesterone when needed",
        price: "$39",
        unit: "/month",
        cadence: "starting price",
        highlights: ["40% off first month at time of review", "Free shipping", "HSA/FSA eligible"],
      },
    ],
    treatmentOptions: [
      "Bioidentical estradiol - daily tablet or daily gel",
      "Micronized progesterone capsules (included when needed)",
      "Vaginal estrogen cream (optional add-on)",
    ],
    pros: [
      "Lowest published starting price in our HRT ranking ($39/mo)",
      "Adjustable hormone ratios instead of fixed combinations",
      "Published satisfaction and on-time-refill guarantees (per terms)",
      "HSA/FSA eligible with messaging-based clinical support",
    ],
    cons: [
      "Trustpilot record (4.1 across 1,839) covers all of Nurx, not HRT specifically",
      "A broad pharmacy platform rather than a dedicated menopause clinic",
      "Cash-pay - no insurance path like Midi's",
    ],
    bestFor: [
      "Women who want the lowest published entry price into HRT",
      "Those comfortable with messaging-based care from a large platform",
    ],
    finalVerdict:
      "Nurx brings the platform playbook to menopause care: the lowest published starting price in our ranking ($39/month), an adjustable-ratio system rather than fixed combinations, and HSA/FSA-eligible care with published guarantees. The trade-off is focus - it's a general telehealth pharmacy, not a dedicated menopause clinic, and its 4.1 Trustpilot record speaks for the whole platform. If specialist depth matters most, compare Midi Health and Winona first; if published price is the deciding factor, Nurx sets the floor.",
    trustBadges: ["Licensed US providers", "HSA/FSA eligible", "Published pricing"],
    updatedAt: "2026-08-28",
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
    title: "Midi Health vs Winona (2026): Which Fits You?",
    matchupLabel: "Midi Health vs Winona",
    subtitle: "Insurance-friendly specialist visits vs a focused, direct-pay hormone-therapy subscription.",
    description:
      "Midi Health (menopause-trained clinicians, insurance-friendly) vs Winona (body-identical HRT, direct pay, monthly delivery). An honest comparison.",
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
    title: "Hone vs Winona (2026): Which HRT Model Fits?",
    matchupLabel: "Hone vs Winona",
    subtitle: "At-home bloodwork driving treatment decisions vs a dedicated menopause HRT service.",
    description:
      "Hone (at-home labs, physician-reviewed results) vs Winona (menopause-focused body-identical HRT). Two models of online hormone care, compared honestly.",
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
  // The vertical's first fully data-backed battle: verified published pricing
  // and claimed-profile Trustpilot records on BOTH sides.
  {
    slug: "winona-vs-nurx",
    provider1Id: "winona",
    provider2Id: "nurx",
    title: "Winona vs Nurx (2026): Which $39 HRT Wins?",
    matchupLabel: "Winona vs Nurx",
    subtitle: "A menopause-only clinic with an 8,138-review record vs a telehealth pharmacy's $39/month HRT system.",
    description:
      "Winona vs Nurx for HRT: Winona's menopause-only care (4.6 Trustpilot, 8,138 reviews; $39-$89/mo published) against Nurx's Solstice system from $39/mo. Verified prices, honest trade-offs.",
    intro:
      "Winona and Nurx both publish real prices - rare in menopause care - but sell different philosophies. Winona is a dedicated menopause clinic: free physician consultation, bioidentical creams, tablets and capsules at flat prices ($39-$89/month by product), and a 4.6 Trustpilot average across 8,138 reviews. Nurx is a large telehealth pharmacy whose Solstice HRT system starts at a published $39/month with adjustable estrogen/progesterone ratios, HSA/FSA eligibility and published guarantees - carrying a 4.1 Trustpilot average across 1,839 reviews for the platform as a whole. Both are cash-pay; if insurance coverage is your priority, compare Midi Health instead.",
    verdict:
      "Winona is our pick for most women here: the entire service is built around menopause, the consultation is free (you pay only if prescribed), and its 4.6 average across 8,138 Trustpilot reviews is the strongest verified record in our HRT ranking. Nurx wins the entry price - its Solstice system starts at a published $39/month against Winona's $39 progesterone capsules and $54-$89 estrogen products - and suits women who already know and trust the platform. Prices as published in August 2026; confirm current rates on both sites.",
    verdictWinnerPoints: [
      "Menopause-only clinic - the whole service is built for this",
      "4.6 Trustpilot average across 8,138 reviews",
      "Free consultation; flat published prices ($39-$89/mo by product)",
    ],
    verdictLoserPoints: [
      "Published starting price of $39/month (Solstice system)",
      "Adjustable estrogen/progesterone ratios",
      "HSA/FSA eligible with published guarantees (per terms)",
    ],
    winnerId: "winona",
    categories: [
      {
        name: "Focus",
        winner: "provider1",
        explanation:
          "Winona does menopause and nothing else - physicians, products and follow-up all built for one patient. Nurx's HRT line lives inside a much broader telehealth pharmacy that started in birth control and sexual health.",
        supportingPoints: [
          "Dedicated menopause clinic (Winona)",
          "HRT as one line on a large platform (Nurx)",
        ],
      },
      {
        name: "Published Pricing",
        winner: "tie",
        explanation:
          "Both publish real numbers - the deciding factor is shape. Nurx sets the lower entry point: Solstice from $39/month all-in. Winona prices per product: progesterone capsules $39, estrogen tablets $54, creams $89 - with a free consultation so you pay nothing unless prescribed.",
        supportingPoints: [
          "From $39/mo, 40% off first month at review time (Nurx)",
          "$39-$89/mo by product; free consult (Winona)",
        ],
      },
      {
        name: "Track Record",
        winner: "provider1",
        explanation:
          "Winona's claimed Trustpilot profile averages 4.6 across 8,138 reviews - all menopause care. Nurx averages 4.1 across 1,839, and that record speaks for the whole pharmacy platform rather than the HRT line specifically.",
        supportingPoints: [
          "4.6 / 8,138 reviews, menopause-specific (Winona)",
          "4.1 / 1,839 reviews, platform-wide (Nurx)",
        ],
      },
    ],
    features: [
      { feature: "Focus", provider1Value: "Menopause only", provider2Value: "Broad telehealth pharmacy", highlight: "provider1" },
      { feature: "Starting price", provider1Value: "$39/mo (progesterone capsules)", provider2Value: "$39/mo (Solstice system)", highlight: "both" },
      { feature: "Estrogen products", provider1Value: "Tablets $54; creams $89", provider2Value: "Tablet or gel, in-plan", highlight: "both" },
      { feature: "Consultation", provider1Value: "Free - pay only if prescribed", provider2Value: "90-second quiz to start", highlight: "provider1" },
      { feature: "Trustpilot", provider1Value: "4.6 (8,138 reviews)", provider2Value: "4.1 (1,839, platform-wide)", highlight: "provider1" },
      { feature: "HSA/FSA", provider1Value: "Eligible", provider2Value: "Eligible", highlight: "both" },
    ],
    updatedAt: "2026-08-28",
  },
];

// SEO long-tail guides for the menopause/HRT query space. No provider pricing
// exists in this vertical yet, so every article is educational and hedged -
// zero invented numbers, no efficacy statistics, treatment decisions always
// deferred to a licensed clinician. Question headings feed the FAQPage schema.
const articles: ArticleData[] = [
  // ───── Trend-riding coverage (Google Trends, Aug 31 2026) ─────
  // "pros and cons of hrt" (+50%), "what is hrt" (+20% on the top list,
  // with "what does hrt stand for" +40%) and "hrt vs birth control" (+40%)
  // were rising with thin or no coverage. Qualitative established knowledge
  // only - no invented risk figures, clinician-decides framing throughout.
  // (The breast-cancer risk question is deliberately NOT a standalone
  // article per operator decision; pros-and-cons routes it to a clinician.)
  {
    slug: "what-is-hrt",
    title: "What Is HRT? Hormone Replacement Therapy, Explained (2026)",
    description:
      "HRT stands for hormone replacement therapy - restoring the estrogen (and often progesterone) that decline through menopause. What it treats, the forms it comes in, and how women start it online.",
    category: "Guide",
    readTime: "6 min read",
    publishedAt: "2026-08-31",
    updatedAt: "2026-08-31",
    heroColor: "#F7EEF4",
    author: "TreatmentsHub Staff",
    keyTakeaways: [
      "HRT stands for hormone replacement therapy: restoring the hormones - mainly estrogen, often with progesterone - that decline through perimenopause and menopause.",
      "It remains the most effective treatment for the classic menopause symptoms: hot flashes, night sweats, sleep disruption and genitourinary changes.",
      "It comes in multiple forms - pills, patches, gels and creams - and the form choice is a real medical decision, not just a preference.",
      "Whether HRT fits you depends on your symptoms, history and timing - a licensed clinician makes that call, and modern telehealth has made the evaluation genuinely accessible.",
    ],
    sections: [
      {
        heading: "What does HRT stand for?",
        body: `HRT stands for <strong>hormone replacement therapy</strong> (you will also see "menopausal hormone therapy" or MHT in medical writing - same thing). The idea is in the name: through perimenopause and menopause, the ovaries wind down production of estrogen and progesterone, and the symptoms that follow - covered below - trace back to that decline. HRT replaces what declined, at doses meant to relieve symptoms. One important scoping note: this article covers menopause-related HRT for women; testosterone therapy for men is a different treatment with its own rules - the differences are in <a href="/hrt/articles/is-hrt-the-same-as-trt">is HRT the same as TRT</a>.`,
      },
      {
        heading: "What does HRT actually treat?",
        body: `The strongest case is the classic menopause cluster: <strong>hot flashes and night sweats</strong> (where HRT remains the most effective treatment available), the sleep disruption they cause, mood changes tied to the transition, and the genitourinary symptoms - dryness, discomfort, urinary changes - that tend to worsen rather than pass with time. Estrogen also protects bone, which is part of the long-term conversation with your clinician. What it is not: an anti-aging cure-all, and a legitimate prescriber will frame it around your actual symptoms, not a promise of turning back clocks. If you are not sure whether what you are feeling is perimenopause yet, start with <a href="/hrt/articles/perimenopause-vs-menopause">perimenopause vs menopause</a>.`,
      },
      {
        heading: "Why do some women take estrogen and progesterone together?",
        body: `Because the two hormones have different jobs in treatment. Estrogen does the symptom-relief work - and for a woman who still has her uterus, taking estrogen alone lets the uterine lining build up, which is why progesterone (or a progestin) is added to protect it. Women who have had a hysterectomy typically use estrogen alone. This single distinction explains most of the "estrogen vs progesterone" confusion in search results, and it is one of the first things a prescriber sorts out from your history.`,
      },
      {
        heading: "What forms does HRT come in?",
        body: `More than most women expect: pills, skin patches, gels, sprays, creams and vaginal preparations for localized symptoms. The delivery route is a genuine medical decision - how the hormone enters the body affects the risk conversation, and localized symptoms sometimes need only localized treatment - which is why the form gets chosen with a clinician rather than off a shelf. The trade-offs between the two most common routes are covered in <a href="/hrt/articles/estrogen-patch-vs-pill">estrogen patch vs pill</a>.`,
      },
      {
        heading: "How do I find out if HRT is right for me?",
        body: `Through an evaluation, and it has gotten dramatically easier to get one. Telehealth menopause providers - <a href="/hrt/reviews/midi">Midi</a> and <a href="/hrt/reviews/winona">Winona</a> among the ones we review - run the intake, history and clinician consultation online, and prescribe when appropriate. The decision weighs your symptoms, your medical history, and timing relative to menopause; there are real contraindications, which is exactly why this runs through a licensed clinician and not a checkout page. Our <a href="/hrt">HRT provider comparison</a> maps the options, and <a href="/hrt/articles/how-to-get-hrt-online">how to get HRT online</a> walks the process. For the balanced picture before you decide, read <a href="/hrt/articles/hrt-pros-and-cons">the pros and cons of HRT</a>. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "hrt-pros-and-cons",
    title: "The Pros and Cons of HRT: A Balanced Look (2026)",
    description:
      "What HRT genuinely does well, the trade-offs and risks that deserve a clinician conversation, and how timing changes the picture - laid out without selling either direction.",
    category: "Advice",
    readTime: "7 min read",
    publishedAt: "2026-08-31",
    updatedAt: "2026-08-31",
    heroColor: "#F2EFF6",
    author: "TreatmentsHub Staff",
    keyTakeaways: [
      "The pro side is real: HRT is the most effective treatment for hot flashes and night sweats, helps genitourinary symptoms that otherwise worsen, and protects bone.",
      "The con side is real too: side effects exist, some histories rule it out, and the risk conversation - including the breast-cancer question - genuinely depends on your history, the formulation and timing.",
      "Timing matters more than most women hear: starting near the menopause transition is a different proposition from starting many years after it.",
      "The honest bottom line: HRT is neither the danger of its 2000s reputation nor a universal fix - it is a personal risk-benefit call made with a clinician who knows your history.",
    ],
    sections: [
      {
        heading: "What are the real pros of HRT?",
        body: `Start with what is not controversial. For the defining symptoms of menopause - <strong>hot flashes and night sweats</strong> - HRT is the most effective treatment there is, and the sleep and mood improvements that follow often matter as much as the flashes themselves. Genitourinary symptoms (dryness, discomfort, urinary changes) respond well, which matters because they tend to worsen without treatment rather than pass. Estrogen protects bone density, a long-term benefit that becomes more relevant the earlier menopause arrives. For a woman whose symptoms are disrupting work, sleep and relationships, these are not marginal gains - they are the difference the treatment exists for.`,
      },
      {
        heading: "What are the cons and risks of HRT?",
        body: `Three categories, honestly stated. <strong>Side effects</strong>: some women experience breast tenderness, bloating, headaches or bleeding changes, especially early - often manageable by adjusting dose or form, but real. <strong>Contraindications</strong>: certain histories - including some cancers and blood-clot conditions - rule HRT out or reshape it substantially, which is why the medical history is not paperwork theater. <strong>The risk conversation</strong>: you have likely heard about breast-cancer risk, and the honest treatment of it is that the answer is personal - it depends on your history, the formulation, whether progesterone is in the picture, and when you start. That conversation belongs with a clinician who has your chart, not with a website's summary - ours included. What we can say responsibly: the modern understanding is considerably more nuanced than the reputation HRT acquired in the early 2000s, and blanket fear is as poor a guide as blanket enthusiasm.`,
      },
      {
        heading: "The factor that changes everything: timing",
        body: `The piece most women never hear: <em>when</em> you start HRT shapes the risk-benefit picture. Starting around the menopause transition - when symptoms actually begin - is a meaningfully different proposition from starting many years afterward, and much of the confusion in older headlines traces to studies that averaged those very different situations together. This is also why "I will tough it out for a few years and decide later" is itself a decision with consequences worth discussing, not a neutral default. If you are unsure where you are in the transition, <a href="/hrt/articles/perimenopause-vs-menopause">perimenopause vs menopause</a> is the primer.`,
      },
      {
        heading: "So how do you actually decide?",
        body: `Not alone, and not from headlines in either direction. The decision is a structured conversation: your symptoms and how much they cost you, your personal and family history, your timing, and the formulation and route that fit - <a href="/hrt/articles/estrogen-patch-vs-pill">patch vs pill</a> being one of the real choices. Menopause-focused telehealth has made that conversation accessible: providers like <a href="/hrt/reviews/midi">Midi</a> and <a href="/hrt/reviews/winona">Winona</a> are built around exactly this evaluation, and our <a href="/hrt">provider comparison</a> maps the field. Go in with your questions written down - a good clinician welcomes them, and how they handle the risk questions is itself a signal of quality. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "hrt-vs-birth-control",
    title: "HRT vs Birth Control: Not the Same Pills, Not the Same Job (2026)",
    description:
      "Birth control suppresses your cycle with contraceptive-dose hormones; HRT replaces declining hormones at lower doses - and doesn't prevent pregnancy. How the two differ and when women switch.",
    category: "Comparison",
    readTime: "6 min read",
    publishedAt: "2026-08-31",
    updatedAt: "2026-08-31",
    heroColor: "#EFF2F7",
    author: "TreatmentsHub Staff",
    keyTakeaways: [
      "Both contain hormones, but the jobs are opposite: birth control overrides your cycle at contraceptive doses; HRT tops up declining hormones at substantially lower doses.",
      "HRT does not prevent pregnancy - a genuinely important point for perimenopausal women who can still conceive.",
      "Many women in perimenopause are on birth control for cycle control and symptom cover; the transition question is when to move from suppressing the cycle to replacing what has declined.",
      "The switch point is a clinician decision based on your age, symptoms and contraception needs - not a birthday.",
    ],
    sections: [
      {
        heading: "Aren't they basically the same hormones?",
        body: `Related molecules, opposite missions. <strong>Birth control</strong> uses synthetic hormones at doses high enough to override your natural cycle - suppressing ovulation is the entire point - and those doses are set for a body with full hormone production of its own. <strong>HRT</strong> works from the other direction: it replaces hormones that have declined, at substantially lower doses aimed at relieving symptoms, and it makes no attempt to suppress anything. Same hormone families, different molecules in many products, very different doses, opposite jobs - which is why the two are not interchangeable and why "I'm already on hormones" does not answer the menopause question.`,
      },
      {
        heading: "Does HRT prevent pregnancy?",
        body: `No - and for perimenopausal women this is the point that genuinely matters. HRT doses do not reliably suppress ovulation, and pregnancy remains possible through perimenopause until menopause is actually confirmed. A woman who switches from birth control to HRT while still perimenopausal may still need contraception alongside - one of several reasons the transition between the two is a planned, clinician-guided step rather than a swap. If you are unsure which side of the transition you are on, <a href="/hrt/articles/perimenopause-vs-menopause">perimenopause vs menopause</a> covers the signals.`,
      },
      {
        heading: "Why are so many perimenopausal women on birth control?",
        body: `Because it works as a bridge, and often deliberately: contraceptive-dose hormones smooth the erratic cycles of perimenopause, cover contraception while fertility is winding down, and blunt some early symptoms along the way. The catch is that the same suppression can mask where you actually are in the transition - symptoms and cycles are hidden behind the override - so the question "am I in menopause yet?" gets harder to answer from the inside. That is one of the standard things a menopause clinician untangles when planning the move from suppression to replacement.`,
      },
      {
        heading: "When do women switch from birth control to HRT?",
        body: `When the goal changes: from controlling a cycle (and preventing pregnancy) to treating the symptoms of hormone decline. In practice the switch is a judgment call built from your age, your symptoms, your contraception needs and your history - contraceptive doses carry their own considerations as women get older, which is part of why clinicians revisit the question rather than letting the prescription roll on by inertia. Menopause-focused telehealth providers handle exactly this transition: <a href="/hrt/reviews/midi">Midi</a> and <a href="/hrt/reviews/winona">Winona</a> both evaluate where you are and what fits next, and our <a href="/hrt">HRT provider comparison</a> maps the options. Before deciding anything, <a href="/hrt/articles/hrt-pros-and-cons">the pros and cons of HRT</a> is the balanced read. This article is general information, not medical advice.`,
      },
    ],
  },
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
