import type { Provider, ReviewData, BattleData, FaqItem, LandingPageData, QuizConfig } from "../config";

// ─────────────────────────────────────────────────────────────────────────────
// TRT content ported from toptrt.io on Oct 22, 2026 (the top-trt repo's
// claude branch at f0a40f6, the operator-designated source of truth).
//
// What came over: the four providers the hub did not have (TMates, Taurus
// Meds, Fridays, BrightMeds) and the fuller Hone Health and Male Excel records
// - every one with the operator's RevOffers tracking link - plus their six
// reviews, all 21 head-to-heads, the five landing pages, the eight FAQs and
// the TRT quiz copy. DudeMeds keeps the hub's own record (verified pricing,
// Aug 2026) and takes only the tracking link from here. Facts, hedges and
// "confirm at checkout" wording are as the source site published them; no
// Trustpilot figure was added beyond the two the operator set there (Male
// Excel 4.5 / 6,495, BrightMeds 4.7 / 1,031). Internal links re-prefixed
// under /trt; the source's "DudeMeds" spelling normalised to the hub's
// "DudeMeds". The source's 51 state pages were not ported (thin duplicates).
// ─────────────────────────────────────────────────────────────────────────────

const UPDATED = "2026-09-14";

export const TRT_PROVIDERS_PORTED: Provider[] = [
  {
    id: "hone",
    name: "Hone Health",
    tagline:
      "At-home hormone testing plus physician-guided testosterone therapy, managed end to end through telehealth",
    logo: "/logos/hone.svg",
    smallLogo: "/logos/hone.svg",
    highlights: [
      "Starts with real lab testing, not guesswork",
      "Physician-reviewed, prescription treatment",
      "Ongoing monitoring and dose adjustments",
      "All-in-one testing & treatment",
    ],
    affiliateUrl: "https://track.revoffers.com/aff_c?offer_id=1291&aff_id=12904&url_id=12019",
    ctaText: "Visit Site",
  },
  {
    id: "tmates",
    name: "TMates",
    tagline:
      "A TRT-focused telehealth membership built around lab testing, clinician visits and ongoing monitoring",
    logo: "/logos/tmateslogo.svg",
    smallLogo: "/logos/tmateslogo.svg",
    highlights: [
      "Dedicated TRT-first program",
      "Includes lab work and clinician review",
      "Ongoing check-ins and dose management",
      "Support & monitoring included",
    ],
    affiliateUrl: "https://track.revoffers.com/aff_c?offer_id=1471&aff_id=12904&url_id=11713",
    ctaText: "Visit Site",
  },
  {
    id: "maleexcel",
    name: "Male Excel",
    tagline:
      "An established men's-health telehealth brand offering TRT with comprehensive at-home lab testing, prescribed treatment (injections or cream) and unlimited provider follow-ups",
    logo: "/logo-maleexcel.svg",
    smallLogo: "/logo-maleexcel.svg",
    highlights: [
      "Comprehensive at-home lab testing",
      "Access to TRT medication if prescribed",
      "Unlimited provider follow-ups",
      "Rated 4.5 on Trustpilot",
    ],
    affiliateUrl: "https://track.revoffers.com/aff_c?offer_id=1420&aff_id=13453",
    ctaText: "Visit Site",
    trustpilotRating: "4.5",
    trustpilotReviewCount: "6,495",
  },
  {
    id: "taurus",
    name: "Taurus Meds",
    tagline:
      "A men's-health telehealth service offering TRT and related treatments online after a clinician review",
    logo: "/logos/tauruslogo.svg",
    smallLogo: "/logos/tauruslogo.svg",
    highlights: [
      "Men's-health focus beyond TRT",
      "Online consultation and lab-based diagnosis",
      "Licensed clinicians review your results",
      "Discreet home delivery",
    ],
    affiliateUrl: "https://track.revoffers.com/aff_c?offer_id=1453&aff_id=12904&url_id=11487",
    ctaText: "Visit Site",
  },
  {
    id: "fridays",
    name: "Fridays",
    tagline:
      "A men's-health telehealth brand offering testosterone therapy online after lab testing and a licensed-clinician review",
    logo: "/logos/fridayslogo.png",
    smallLogo: "/logos/fridayslogo.png",
    highlights: [
      "Fully online men's-health platform",
      "Lab-based diagnosis before treatment",
      "Licensed clinicians review your results",
      "Discreet home delivery",
    ],
    affiliateUrl: "https://track.revoffers.com/aff_c?offer_id=1284&aff_id=12904&url_id=11752",
    ctaText: "Visit Site",
  },
  {
    id: "brightmeds",
    name: "Brightmeds",
    tagline:
      "A highly-rated online telehealth service offering TRT with its own testosterone formula, prescribed after a licensed-clinician review",
    logo: "/logos/brightmedslogo.png",
    smallLogo: "/logos/brightmedslogo.png",
    highlights: [
      "Online TRT after a licensed-clinician review",
      "Its own testosterone formula",
      "Discreet home delivery",
      "Rated 4.7 on Trustpilot",
    ],
    affiliateUrl: "https://track.revoffers.com/aff_c?offer_id=1371&aff_id=12904",
    ctaText: "Visit Site",
    trustpilotRating: "4.7",
    trustpilotReviewCount: "1,031",
  },
];

export const TRT_REVIEWS_PORTED: ReviewData[] = [
  {
    slug: "hone",
    providerId: "hone",
    shortSummary:
      "An end-to-end TRT program that starts with real hormone testing and moves to physician-guided treatment and monitoring - our top pick.",
    reviewIntro:
      "Hone Health is a telehealth service built around the full arc of testosterone care: it starts with lab testing to see whether your testosterone is actually low, then - if a clinician confirms it's clinically warranted - moves into prescription testosterone therapy with ongoing monitoring and dose adjustments. That testing-first approach is the reason it's our top pick: TRT is only appropriate for men with genuinely low testosterone, and Hone builds the diagnosis into the program rather than skipping to a prescription. This review covers what it offers and who it fits.",
    keyFeatures: [
      "Begins with lab testing to confirm whether testosterone is clinically low",
      "Prescription testosterone therapy after a licensed-clinician review",
      "Ongoing monitoring with follow-up bloodwork and dose adjustments",
      "Testing and treatment connected in one program",
      "Fully online, discreet process",
      "Support for men managing therapy long-term",
    ],
    pricingSummary:
      "Approximate only - confirm at checkout. TRT programs like Hone typically bundle an initial testing/diagnostic step with an ongoing monthly or membership fee that covers clinician oversight, follow-up labs and the medication. Exact costs depend on the treatment format and how often you're monitored, and promotions change, so treat any figure you see as a starting point and confirm the current price on Hone Health's own site before enrolling.",
    treatmentOptions: [
      "Baseline and follow-up hormone lab testing",
      "Prescription testosterone therapy (clinician-directed format)",
      "Ongoing monitoring and dose management",
    ],
    pros: [
      "Testing-first model matches how TRT should actually be prescribed",
      "Diagnosis, treatment and monitoring handled in one connected program",
      "Licensed clinicians make the prescribing decision",
      "Ongoing follow-up rather than a one-and-done prescription",
    ],
    cons: [
      "A comprehensive program usually costs more than a bare-bones prescription service",
      "Still requires the commitment of ongoing bloodwork and check-ins (as any responsible TRT should)",
      "TRT is long-term - worth understanding the fertility and monitoring trade-offs first",
    ],
    bestFor: [
      "Men who want testing and treatment handled in one place",
      "Anyone who wants ongoing monitoring, not just a prescription",
      "Men who value a diagnosis-led, clinician-guided approach",
    ],
    finalVerdict:
      "Hone Health is our top pick because it treats TRT the way it should be treated - a diagnosis backed by lab testing, a clinician's decision, and ongoing monitoring - rather than a shortcut to a prescription. It suits men who want the whole process, from the first blood test to long-term dose management, handled in one connected program. The honest caveats are that a comprehensive program costs more than a minimal one, and that TRT is a long-term commitment with real trade-offs to weigh first. Confirm current pricing before you enroll. This review is general information, not medical advice.",
    howItWorks: [
      {
        timing: "Step 1",
        title: "Test your levels",
        detail:
          "You complete hormone lab testing so there's real data on whether your testosterone is clinically low - the starting point for any legitimate TRT decision.",
      },
      {
        timing: "Step 2",
        title: "Licensed clinician review",
        detail:
          "A licensed clinician reviews your results and symptoms and decides whether testosterone therapy is appropriate - and, if so, which approach fits.",
      },
      {
        timing: "Step 3",
        title: "Treatment and ongoing monitoring",
        detail:
          "If prescribed, treatment is arranged discreetly, with follow-up bloodwork and dose adjustments over time to keep therapy safe and on target.",
      },
    ],
    trustBadges: ["Testing-first", "Licensed clinicians", "Ongoing monitoring"],
    updatedAt: UPDATED,
  },
  {
    slug: "tmates",
    providerId: "tmates",
    shortSummary:
      "A TRT-focused telehealth membership that bundles lab testing, clinician visits and ongoing monitoring into one program built for men with low testosterone.",
    reviewIntro:
      "TMates is a telehealth service built specifically around testosterone therapy. Rather than treating TRT as one item on a broad men's-health menu, it centers the whole membership on it: lab testing to establish your levels, a licensed clinician to review them, and ongoing check-ins to manage treatment over time. That focus is its main selling point. This review covers what it offers and who it fits.",
    keyFeatures: [
      "TRT-first program rather than a general men's-health add-on",
      "Includes lab testing and a licensed-clinician review",
      "Ongoing monitoring and dose management",
      "Membership model with support built in",
      "Fully online and discreet",
    ],
    pricingSummary:
      "Approximate only - confirm at checkout. As a membership-style TRT program, TMates typically charges an ongoing monthly fee that bundles clinician oversight, monitoring and, depending on the plan, testing and medication. Exact figures depend on the plan and are subject to change, so confirm the current price on the TMates site before enrolling.",
    treatmentOptions: [
      "Hormone lab testing and diagnosis",
      "Prescription testosterone therapy (clinician-directed)",
      "Ongoing monitoring and follow-up",
    ],
    pros: [
      "Dedicated TRT focus means the whole program is built around it",
      "Testing, prescribing and monitoring in one membership",
      "Licensed clinicians involved throughout",
      "Ongoing support rather than a one-off prescription",
    ],
    cons: [
      "Membership pricing is an ongoing commitment",
      "Requires regular bloodwork and check-ins (as responsible TRT should)",
      "Narrower focus than a broad men's-health platform if you want more than TRT",
    ],
    bestFor: [
      "Men who specifically want a TRT-focused program",
      "Those who value ongoing monitoring and support",
      "Men comfortable with a membership model",
    ],
    finalVerdict:
      "TMates is a strong option for men who want a program built specifically around testosterone therapy, with testing, clinician review and ongoing monitoring bundled together. If you'd rather have a broader men's-health platform, or want testing and treatment from the most established name, compare it against our top pick. Confirm current pricing on the TMates site. This review is general information, not medical advice.",
    howItWorks: [
      {
        timing: "Step 1",
        title: "Lab testing",
        detail: "You complete hormone testing so a clinician has real data on your testosterone levels.",
      },
      {
        timing: "Step 2",
        title: "Clinician review",
        detail: "A licensed clinician reviews your labs and symptoms and decides whether TRT is appropriate.",
      },
      {
        timing: "Step 3",
        title: "Treatment and monitoring",
        detail: "If prescribed, treatment is managed through the membership with ongoing check-ins and adjustments.",
      },
    ],
    trustBadges: ["TRT-focused", "Licensed clinicians", "Ongoing monitoring"],
    updatedAt: UPDATED,
  },
  {
    slug: "maleexcel",
    providerId: "maleexcel",
    shortSummary:
      "An established men's-health telehealth brand rated 4.5 on Trustpilot across thousands of reviews: at-home labs, injections or cream, follow-ups.",
    reviewIntro:
      "Male Excel is one of the more established names in men's-health telehealth, and testosterone therapy is a core part of what it offers. The model follows the responsible path: comprehensive at-home lab testing to establish your levels, a licensed clinician who reviews your results and symptoms, and - if TRT is appropriate - access to treatment (commonly testosterone injections or a testosterone cream) with unlimited provider follow-ups. Its long track record and strong review standing (4.5 on Trustpilot from thousands of reviews) are a big part of the appeal for men who want an established provider. This review covers the model and how it fits; confirm the current formats and pricing on the Male Excel site.",
    keyFeatures: [
      "Comprehensive at-home lab testing",
      "Licensed clinicians review your results",
      "Access to TRT medication if prescribed - injections or cream",
      "Unlimited provider follow-ups",
      "Established brand rated 4.5 on Trustpilot",
    ],
    pricingSummary:
      "Approximate only - confirm at checkout. Male Excel typically starts with a discounted at-home labs + provider consultation to get you evaluated (around $49 at the time of writing, from a regular $99), then an ongoing treatment plan if TRT is prescribed. Exact costs depend on the plan and treatment format, and promotions change, so confirm the current price on the Male Excel site before signing up.",
    treatmentOptions: [
      "Comprehensive at-home hormone lab testing and diagnosis",
      "Prescription testosterone therapy - commonly injections (testosterone cypionate) or a testosterone cream (clinician-directed)",
      "Unlimited provider follow-ups and ongoing monitoring",
    ],
    pros: [
      "Established, recognizable brand with a long track record",
      "Strong, verified review standing (4.5 on Trustpilot from thousands of reviews)",
      "Comprehensive at-home testing before any prescription",
      "A choice of formats (injection or cream) plus unlimited provider follow-ups",
    ],
    cons: [
      "Confirm exactly what testing and monitoring each plan includes",
      "Treatment formats and pricing should be verified on the provider's own site",
      "As with any TRT, expect an ongoing commitment with regular bloodwork",
    ],
    bestFor: [
      "Men who want an established, well-known TRT provider",
      "Those who value a choice of treatment formats",
      "Anyone comparing the bigger names in men's-health telehealth",
    ],
    finalVerdict:
      "Male Excel is a strong option for men who want testosterone therapy from an established, recognizable men's-health brand, with at-home testing and licensed-clinician oversight built in. It's a credible alternative to our top-ranked picks - compare it against them on the depth of ongoing monitoring and on price, and confirm the current treatment formats on the Male Excel site. This review is general information, not medical advice.",
    howItWorks: [
      {
        timing: "Step 1",
        title: "At-home testing",
        detail: "You complete testing so a clinician has real data on your testosterone levels.",
      },
      {
        timing: "Step 2",
        title: "Clinician review",
        detail: "A licensed clinician reviews your results and symptoms and decides whether TRT is appropriate.",
      },
      {
        timing: "Step 3",
        title: "Treatment and follow-up",
        detail: "If prescribed, treatment is arranged discreetly, with ongoing monitoring and follow-up over time.",
      },
    ],
    trustBadges: ["Established brand", "At-home testing", "Licensed clinicians"],
    updatedAt: UPDATED,
  },
  {
    slug: "taurus",
    providerId: "taurus",
    shortSummary:
      "A men's-health telehealth service offering TRT alongside other treatments online, with a lab-based diagnosis and a licensed-clinician review before prescribing.",
    reviewIntro:
      "Taurus Meds is a men's-health telehealth brand that includes testosterone therapy in a broader lineup of men's treatments. The model is the familiar one: an online consultation, lab testing to establish whether your testosterone is genuinely low, and a licensed clinician who reviews your results before deciding whether TRT is appropriate. This review focuses on the model and how it fits into the field; confirm the current lineup and pricing on the Taurus Meds site.",
    keyFeatures: [
      "TRT offered within a broader men's-health service",
      "Lab-based diagnosis before any prescription",
      "Licensed clinicians review your results",
      "Fully online consultation",
      "Discreet, direct-to-door delivery",
    ],
    pricingSummary:
      "Approximate only - confirm at checkout. Taurus Meds prices TRT through a combination of testing and an ongoing treatment plan; the exact cost depends on the plan, the treatment format and monitoring included. Because promotions and plans change, confirm the current price on the Taurus Meds site before signing up.",
    treatmentOptions: [
      "Hormone lab testing and diagnosis",
      "Prescription testosterone therapy (clinician-directed)",
      "Other men's-health treatments (see the Taurus Meds site)",
    ],
    pros: [
      "Broader men's-health platform if you want more than TRT",
      "Lab-based diagnosis before prescribing",
      "Licensed clinicians involved in the decision",
      "Convenient, fully online process",
    ],
    cons: [
      "Less exclusively TRT-focused than a dedicated program",
      "Monitoring depth depends on the specific plan - confirm what's included",
      "Requires an online medical review and lab work (as it should)",
    ],
    bestFor: [
      "Men who want TRT within a broader men's-health service",
      "Those comparing several telehealth options",
      "Anyone prioritizing a convenient online process",
    ],
    finalVerdict:
      "Taurus Meds is a sensible choice for men who want testosterone therapy as part of a broader men's-health platform, with a lab-based diagnosis and a licensed clinician's sign-off. If you'd prefer a program built exclusively around TRT with deep ongoing monitoring, compare it against our top-ranked providers. Confirm current pricing and what monitoring is included on the Taurus Meds site. This review is general information, not medical advice.",
    howItWorks: [
      {
        timing: "Step 1",
        title: "Online consultation and testing",
        detail: "You complete an intake and lab testing so a clinician can see your testosterone levels.",
      },
      {
        timing: "Step 2",
        title: "Clinician review",
        detail: "A licensed clinician reviews your results and decides whether TRT is appropriate.",
      },
      {
        timing: "Step 3",
        title: "Treatment and delivery",
        detail: "If prescribed, treatment is arranged and shipped discreetly, with follow-up as your plan provides.",
      },
    ],
    trustBadges: ["Men's-health focus", "Lab-based diagnosis", "Discreet shipping"],
    updatedAt: UPDATED,
  },
  {
    slug: "fridays",
    providerId: "fridays",
    shortSummary:
      "A men's-health telehealth brand that offers testosterone therapy online through lab-based diagnosis and a licensed-clinician review, with discreet delivery.",
    reviewIntro:
      "Fridays is a men's-health telehealth brand that includes testosterone therapy among the treatments it offers online. The model is the familiar one for this space: you complete an intake and the required lab testing, a licensed clinician reviews whether your testosterone is genuinely low and whether TRT is appropriate, and - if it is - treatment is arranged with follow-up. This review focuses on the model and how it fits into the field; confirm the current lineup, monitoring and pricing on the Fridays site.",
    keyFeatures: [
      "TRT offered within a men's-health service",
      "Lab-based diagnosis before any prescription",
      "Licensed clinicians review your results",
      "Fully online consultation",
      "Discreet, direct-to-door delivery",
    ],
    pricingSummary:
      "Approximate only - confirm at checkout. Fridays prices TRT through a combination of testing and an ongoing treatment plan; the exact cost depends on the plan, the treatment format and the monitoring included. Because promotions and plans change, confirm the current price on the Fridays site before signing up.",
    treatmentOptions: [
      "Hormone lab testing and diagnosis",
      "Prescription testosterone therapy (clinician-directed)",
      "Online follow-up",
    ],
    pros: [
      "Convenient, fully online men's-health process",
      "Lab-based diagnosis before prescribing",
      "Licensed clinicians involved in the decision",
      "Discreet delivery",
    ],
    cons: [
      "Less exclusively TRT-focused than a dedicated program",
      "Monitoring depth depends on the specific plan - confirm what's included",
      "We recommend confirming its current TRT lineup and pricing on the provider's own site",
    ],
    bestFor: [
      "Men who want TRT within a broader men's-health service",
      "Those comparing several telehealth options",
      "Anyone prioritizing a convenient online process",
    ],
    finalVerdict:
      "Fridays offers the standard, convenient telehealth path to testosterone therapy: lab testing, a licensed-clinician review and discreet delivery. If you want a program built exclusively around TRT with deep ongoing monitoring, compare it against our top-ranked providers. Confirm the current lineup, monitoring and pricing on the Fridays site before deciding. This review is general information, not medical advice.",
    howItWorks: [
      {
        timing: "Step 1",
        title: "Online consultation and testing",
        detail: "You complete an intake and lab testing so a clinician can see your testosterone levels.",
      },
      {
        timing: "Step 2",
        title: "Clinician review",
        detail: "A licensed clinician reviews your results and decides whether TRT is appropriate.",
      },
      {
        timing: "Step 3",
        title: "Treatment and delivery",
        detail: "If prescribed, treatment is arranged and shipped discreetly, with follow-up as your plan provides.",
      },
    ],
    trustBadges: ["Men's-health focus", "Lab-based diagnosis", "Discreet shipping"],
    updatedAt: UPDATED,
  },
  {
    slug: "brightmeds",
    providerId: "brightmeds",
    shortSummary:
      "A highly rated online telehealth service offering TRT, including its own testosterone formula, with a 4.7 Trustpilot record across 1,000+ reviews.",
    reviewIntro:
      "Brightmeds is an online telehealth service that offers testosterone replacement therapy - including its own testosterone formula - alongside other treatments, and reviewers consistently rate it highly (4.7 on Trustpilot from over a thousand reviews), praising fast delivery, responsive doctors and an easy process. As with any TRT service, treatment follows an intake and testing, a licensed clinician's review, and discreet delivery. This review covers the model and how it fits.",
    keyFeatures: [
      "Fully online prescription and delivery process",
      "Licensed clinicians review your intake",
      "Strong review record (4.7 on Trustpilot)",
      "Fast, discreet home delivery",
      "Offers a range of telehealth treatments",
    ],
    pricingSummary:
      "Approximate only - confirm at checkout. Brightmeds prices treatment through its online plans; the exact cost depends on the treatment and plan you choose. Because promotions and plans change, confirm the current price - and that the TRT option you want is available - on the Brightmeds site before signing up.",
    treatmentOptions: [
      "Online intake, testing and licensed-clinician review",
      "Prescription testosterone therapy (TRT), including Brightmeds' own testosterone formula, where appropriate",
      "Discreet home delivery",
    ],
    pros: [
      "Excellent review record - 4.7 on Trustpilot from more than a thousand reviews",
      "Offers TRT with its own testosterone formula",
      "Fast, straightforward online process reviewers praise",
      "Discreet home delivery",
    ],
    cons: [
      "Newer to our rankings, so we're still building a full verified picture of its TRT plans and pricing",
      "Offers a broad telehealth range beyond TRT",
      "As with any TRT, expect required bloodwork and ongoing monitoring",
    ],
    bestFor: [
      "Men who want a highly-rated, easy online telehealth experience",
      "Those comparing several online prescription services",
      "Anyone prioritizing fast, discreet delivery",
    ],
    finalVerdict:
      "Brightmeds stands out for its strong, verified review record (4.7 on Trustpilot) and a fast, easy online process, and it does offer TRT through its own testosterone formula. It's a credible, well-reviewed option - compare it against our top-ranked, TRT-focused picks on the depth of testing and ongoing monitoring, and confirm current pricing on its site. This review is general information, not medical advice.",
    howItWorks: [
      {
        timing: "Step 1",
        title: "Online intake",
        detail: "You complete a health questionnaire and any required testing so a clinician can review your case.",
      },
      {
        timing: "Step 2",
        title: "Clinician review",
        detail: "A licensed clinician reviews your information and decides whether treatment is appropriate.",
      },
      {
        timing: "Step 3",
        title: "Delivery",
        detail: "If prescribed, treatment ships discreetly to your door, with follow-up available.",
      },
    ],
    trustBadges: ["4.7 on Trustpilot", "Licensed clinicians", "Discreet shipping"],
    updatedAt: UPDATED,
  },
];

export const TRT_BATTLES_PORTED: BattleData[] = [
  {
    slug: "hone-vs-tmates",
    provider1Id: "hone",
    provider2Id: "tmates",
    title: "Hone Health vs TMates",
    matchupLabel: "Hone Health vs TMates",
    subtitle: "An end-to-end testing-and-treatment program vs a dedicated TRT membership",
    description:
      "Compare Hone Health and TMates for online TRT - testing, clinician oversight, monitoring and which fits you best.",
    intro:
      "Hone Health and TMates both take testosterone therapy seriously: each starts with lab testing, involves a licensed clinician, and monitors treatment over time. Hone is a broad, testing-first program that connects diagnosis and treatment; TMates is a membership built specifically around TRT. Here's how they compare.",
    verdict:
      "Both are legitimate, monitoring-minded options. Hone is our pick for its established testing-first program that ties diagnosis, treatment and follow-up together. TMates is an excellent choice if you want a membership focused exclusively on TRT. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Testing-first program connecting diagnosis and treatment",
      "Ongoing monitoring and dose adjustments",
      "Established, comprehensive approach",
    ],
    verdictLoserPoints: [
      "Dedicated TRT-first membership",
      "Testing, prescribing and monitoring bundled",
      "Focused support for men on therapy",
    ],
    winnerId: "hone",
    categories: [
      {
        name: "Testing & diagnosis",
        winner: "tie",
        explanation: "Both start with lab testing to confirm whether testosterone is clinically low before any prescription.",
        supportingPoints: ["Lab-based diagnosis at both", "Clinician-confirmed"],
      },
      {
        name: "Program breadth",
        winner: "provider1",
        explanation: "Hone connects testing and treatment in one established, comprehensive program.",
        supportingPoints: ["End-to-end program", "Established brand"],
      },
      {
        name: "TRT focus",
        winner: "provider2",
        explanation: "TMates is built exclusively around testosterone therapy.",
        supportingPoints: ["TRT-first membership", "Focused support"],
      },
      {
        name: "Ongoing monitoring",
        winner: "tie",
        explanation: "Both include follow-up bloodwork and dose management rather than a one-off prescription.",
        supportingPoints: ["Follow-up labs", "Dose adjustments"],
      },
    ],
    features: [
      { feature: "Lab testing", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Clinician review", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Ongoing monitoring", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Model", provider1Value: "End-to-end program", provider2Value: "TRT membership", highlight: "provider1" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "hone-vs-taurus",
    provider1Id: "hone",
    provider2Id: "taurus",
    title: "Hone Health vs Taurus Meds",
    matchupLabel: "Hone Health vs Taurus Meds",
    subtitle: "A testing-first TRT program vs a broader men's-health platform",
    description:
      "Compare Hone Health and Taurus Meds for online TRT - testing, monitoring, breadth and which fits your priorities.",
    intro:
      "Hone Health and Taurus Meds both prescribe TRT online after lab testing and a clinician review, but they're built differently. Hone is a testing-first program centered on hormone care; Taurus Meds offers TRT within a broader men's-health lineup. Here's how they compare.",
    verdict:
      "Both are honest online options. Hone wins for its focused, testing-first hormone program and ongoing monitoring, while Taurus Meds wins if you want TRT alongside a broader men's-health service. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Testing-first hormone program",
      "Connected diagnosis, treatment and monitoring",
      "Established, focused approach",
    ],
    verdictLoserPoints: [
      "Broader men's-health platform",
      "TRT plus other treatments",
      "Convenient online consultation",
    ],
    winnerId: "hone",
    categories: [
      {
        name: "TRT program depth",
        winner: "provider1",
        explanation: "Hone is centered on hormone care with connected testing, treatment and monitoring.",
        supportingPoints: ["Testing-first", "Ongoing monitoring"],
      },
      {
        name: "Breadth of services",
        winner: "provider2",
        explanation: "Taurus Meds offers a wider men's-health lineup beyond TRT.",
        supportingPoints: ["Multiple treatments", "One men's-health account"],
      },
      {
        name: "Diagnosis",
        winner: "tie",
        explanation: "Both require lab testing and a licensed-clinician review before prescribing.",
        supportingPoints: ["Lab-based", "Clinician-confirmed"],
      },
      {
        name: "Best-fit clarity",
        winner: "provider1",
        explanation: "Hone's hormone focus makes its value proposition specific for men who mainly want TRT done well.",
        supportingPoints: ["Focused offering", "Monitoring built in"],
      },
    ],
    features: [
      { feature: "TRT focus", provider1Value: "High", provider2Value: "Part of a broader menu", highlight: "provider1" },
      { feature: "Lab testing", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Clinician review", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "hone-vs-dudemeds",
    provider1Id: "hone",
    provider2Id: "dudemeds",
    title: "Hone Health vs DudeMeds",
    matchupLabel: "Hone Health vs DudeMeds",
    subtitle: "A comprehensive, testing-first program vs a value-minded simple option",
    description:
      "Compare Hone Health and DudeMeds for online TRT - program depth, monitoring, price and which fits your priorities.",
    intro:
      "Hone Health and DudeMeds sit at different ends of the same market. Hone is a comprehensive, testing-first program with ongoing monitoring; DudeMeds is a simple, value-minded service that offers TRT after the required testing and review. Here's how they compare.",
    verdict:
      "Both are legitimate online options. Hone wins for men who want depth - testing, treatment and monitoring in one program - while DudeMeds wins on simple, budget-friendly access. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Comprehensive, testing-first program",
      "Ongoing monitoring and dose management",
      "Connected diagnosis and treatment",
    ],
    verdictLoserPoints: [
      "Value-minded, budget-friendly pricing",
      "Simple, fast sign-up",
      "Still includes testing and clinician review",
    ],
    winnerId: "hone",
    categories: [
      {
        name: "Program depth",
        winner: "provider1",
        explanation: "Hone connects testing, treatment and ongoing monitoring; DudeMeds keeps it simple.",
        supportingPoints: ["End-to-end program", "Ongoing monitoring"],
      },
      {
        name: "Value",
        winner: "provider2",
        explanation: "DudeMeds is built around low, simple pricing.",
        supportingPoints: ["Budget-friendly", "No-frills sign-up"],
      },
      {
        name: "Diagnosis",
        winner: "tie",
        explanation: "Both require lab testing and a licensed-clinician review before prescribing.",
        supportingPoints: ["Lab-based", "Clinician-confirmed"],
      },
      {
        name: "Monitoring",
        winner: "provider1",
        explanation: "Hone emphasizes ongoing follow-up bloodwork and dose adjustments.",
        supportingPoints: ["Follow-up labs", "Dose management"],
      },
    ],
    features: [
      { feature: "Program depth", provider1Value: "Comprehensive", provider2Value: "Simple", highlight: "provider1" },
      { feature: "Lab testing", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Clinician review", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site (value)", highlight: "provider2" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "tmates-vs-taurus",
    provider1Id: "tmates",
    provider2Id: "taurus",
    title: "TMates vs Taurus Meds",
    matchupLabel: "TMates vs Taurus Meds",
    subtitle: "A dedicated TRT membership vs a broader men's-health platform",
    description:
      "Compare TMates and Taurus Meds for online TRT - focus, monitoring, breadth and which fits you best.",
    intro:
      "TMates and Taurus Meds both prescribe TRT online after testing and a clinician review, but they compete on different things. TMates is a membership built exclusively around testosterone therapy; Taurus Meds offers TRT within a broader men's-health service. Here's how they compare.",
    verdict:
      "Both are solid, honest options. TMates wins for its dedicated TRT focus and built-in monitoring, while Taurus Meds wins if you want TRT alongside a broader men's-health platform. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "TRT-first membership",
      "Testing and monitoring bundled",
      "Focused support for men on therapy",
    ],
    verdictLoserPoints: [
      "Broader men's-health platform",
      "TRT plus other treatments",
      "Convenient online consultation",
    ],
    winnerId: "tmates",
    categories: [
      {
        name: "TRT focus",
        winner: "provider1",
        explanation: "TMates is built exclusively around testosterone therapy.",
        supportingPoints: ["TRT-first membership", "Focused support"],
      },
      {
        name: "Breadth of services",
        winner: "provider2",
        explanation: "Taurus Meds offers a wider men's-health lineup beyond TRT.",
        supportingPoints: ["Multiple treatments", "One men's-health account"],
      },
      {
        name: "Diagnosis",
        winner: "tie",
        explanation: "Both require lab testing and a licensed-clinician review before prescribing.",
        supportingPoints: ["Lab-based", "Clinician-confirmed"],
      },
      {
        name: "Ongoing monitoring",
        winner: "provider1",
        explanation: "TMates centers its membership on ongoing monitoring and dose management.",
        supportingPoints: ["Regular check-ins", "Dose management"],
      },
    ],
    features: [
      { feature: "TRT focus", provider1Value: "Exclusive", provider2Value: "Part of a broader menu", highlight: "provider1" },
      { feature: "Lab testing", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Clinician review", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "tmates-vs-dudemeds",
    provider1Id: "tmates",
    provider2Id: "dudemeds",
    title: "TMates vs DudeMeds",
    matchupLabel: "TMates vs DudeMeds",
    subtitle: "A monitoring-focused TRT membership vs a value-minded simple option",
    description:
      "Compare TMates and DudeMeds for online TRT - program depth, monitoring, price and which fits you best.",
    intro:
      "TMates and DudeMeds both offer TRT online, but they compete on different priorities. TMates is a membership built around ongoing monitoring; DudeMeds keeps it simple and budget-friendly. Here's how they compare.",
    verdict:
      "Both are honest options. TMates wins for depth of monitoring and a dedicated TRT program, while DudeMeds wins on simple, budget-friendly access. Choose TMates if ongoing support matters most; choose DudeMeds if price does. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Dedicated TRT membership",
      "Built-in ongoing monitoring",
      "Focused support for men on therapy",
    ],
    verdictLoserPoints: [
      "Value-minded, budget-friendly pricing",
      "Simple, fast sign-up",
      "Still includes testing and clinician review",
    ],
    winnerId: "tmates",
    categories: [
      {
        name: "Program depth",
        winner: "provider1",
        explanation: "TMates emphasizes ongoing monitoring and a dedicated TRT membership; DudeMeds is more no-frills.",
        supportingPoints: ["Membership program", "Ongoing check-ins"],
      },
      {
        name: "Value",
        winner: "provider2",
        explanation: "DudeMeds is positioned around low, simple pricing.",
        supportingPoints: ["Budget-friendly", "Simple plans"],
      },
      {
        name: "Diagnosis",
        winner: "tie",
        explanation: "Both require lab testing and a licensed-clinician review before prescribing.",
        supportingPoints: ["Lab-based", "Clinician-confirmed"],
      },
      {
        name: "Monitoring",
        winner: "provider1",
        explanation: "TMates centers its program on ongoing monitoring and dose management.",
        supportingPoints: ["Follow-up labs", "Dose management"],
      },
    ],
    features: [
      { feature: "TRT focus", provider1Value: "Exclusive", provider2Value: "Value-minded", highlight: "provider1" },
      { feature: "Ongoing monitoring", provider1Value: "Yes", provider2Value: "See site", highlight: "provider1" },
      { feature: "Clinician review", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site (value)", highlight: "provider2" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "taurus-vs-dudemeds",
    provider1Id: "taurus",
    provider2Id: "dudemeds",
    title: "Taurus Meds vs DudeMeds",
    matchupLabel: "Taurus Meds vs DudeMeds",
    subtitle: "A broader men's-health platform vs a value-minded simple option",
    description:
      "Compare Taurus Meds and DudeMeds for online TRT - breadth, price and which fits your priorities.",
    intro:
      "Taurus Meds and DudeMeds are both straightforward men's telehealth services offering TRT online after the required testing and a clinician review. Taurus Meds leans on a broader men's-health lineup; DudeMeds leans on simple, value-minded pricing. Here's how they compare.",
    verdict:
      "Both offer a convenient online path to TRT. Taurus Meds edges it for breadth if you want more than testosterone therapy, while DudeMeds wins on simple, budget-friendly access. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Broader men's-health platform",
      "TRT plus other treatments",
      "Lab-based diagnosis and clinician review",
    ],
    verdictLoserPoints: [
      "Value-minded, budget-friendly pricing",
      "Simple, fast sign-up",
      "Straightforward TRT access",
    ],
    winnerId: "taurus",
    categories: [
      {
        name: "Breadth of services",
        winner: "provider1",
        explanation: "Taurus Meds offers a wider men's-health lineup beyond TRT.",
        supportingPoints: ["Multiple treatments", "One men's-health account"],
      },
      {
        name: "Value",
        winner: "provider2",
        explanation: "DudeMeds is explicitly built around low, simple pricing.",
        supportingPoints: ["Budget-friendly", "No-frills sign-up"],
      },
      {
        name: "Diagnosis",
        winner: "tie",
        explanation: "Both require lab testing and a licensed-clinician review before prescribing.",
        supportingPoints: ["Lab-based", "Clinician-confirmed"],
      },
      {
        name: "Discreet delivery",
        winner: "tie",
        explanation: "Both arrange treatment discreetly.",
        supportingPoints: ["Plain packaging", "Direct-to-door"],
      },
    ],
    features: [
      { feature: "Service breadth", provider1Value: "Broader men's health", provider2Value: "TRT, value-focused", highlight: "provider1" },
      { feature: "Lab testing", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Clinician review", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site (value)", highlight: "provider2" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "hone-vs-fridays",
    provider1Id: "hone",
    provider2Id: "fridays",
    title: "Hone Health vs Fridays",
    matchupLabel: "Hone Health vs Fridays",
    subtitle: "A testing-first TRT program vs a broader men's-health platform",
    description:
      "Compare Hone Health and Fridays for online TRT - testing, monitoring, breadth and which fits your priorities.",
    intro:
      "Hone Health and Fridays both prescribe TRT online after lab testing and a clinician review, but they're built differently. Hone is a testing-first program centered on hormone care; Fridays offers TRT within a broader men's-health service. Here's how they compare.",
    verdict:
      "Both are honest online options. Hone wins for its focused, testing-first hormone program and ongoing monitoring, while Fridays wins if you want TRT alongside a broader men's-health service. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Testing-first hormone program",
      "Connected diagnosis, treatment and monitoring",
      "Established, focused approach",
    ],
    verdictLoserPoints: [
      "Broader men's-health platform",
      "TRT plus other treatments",
      "Convenient online consultation",
    ],
    winnerId: "hone",
    categories: [
      {
        name: "TRT program depth",
        winner: "provider1",
        explanation: "Hone is centered on hormone care with connected testing, treatment and monitoring.",
        supportingPoints: ["Testing-first", "Ongoing monitoring"],
      },
      {
        name: "Breadth of services",
        winner: "provider2",
        explanation: "Fridays offers a wider men's-health lineup beyond TRT.",
        supportingPoints: ["Multiple treatments", "One men's-health account"],
      },
      {
        name: "Diagnosis",
        winner: "tie",
        explanation: "Both require lab testing and a licensed-clinician review before prescribing.",
        supportingPoints: ["Lab-based", "Clinician-confirmed"],
      },
      {
        name: "Best-fit clarity",
        winner: "provider1",
        explanation: "Hone's hormone focus makes its value proposition specific for men who mainly want TRT done well.",
        supportingPoints: ["Focused offering", "Monitoring built in"],
      },
    ],
    features: [
      { feature: "TRT focus", provider1Value: "High", provider2Value: "Part of a broader menu", highlight: "provider1" },
      { feature: "Lab testing", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Clinician review", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "tmates-vs-fridays",
    provider1Id: "tmates",
    provider2Id: "fridays",
    title: "TMates vs Fridays",
    matchupLabel: "TMates vs Fridays",
    subtitle: "A dedicated TRT membership vs a broader men's-health platform",
    description:
      "Compare TMates and Fridays for online TRT - focus, monitoring, breadth and which fits you best.",
    intro:
      "TMates and Fridays both prescribe TRT online after testing and a clinician review, but they compete on different things. TMates is a membership built exclusively around testosterone therapy; Fridays offers TRT within a broader men's-health service. Here's how they compare.",
    verdict:
      "Both are solid, honest options. TMates wins for its dedicated TRT focus and built-in monitoring, while Fridays wins if you want TRT alongside a broader men's-health platform. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "TRT-first membership",
      "Testing and monitoring bundled",
      "Focused support for men on therapy",
    ],
    verdictLoserPoints: [
      "Broader men's-health platform",
      "TRT plus other treatments",
      "Convenient online consultation",
    ],
    winnerId: "tmates",
    categories: [
      {
        name: "TRT focus",
        winner: "provider1",
        explanation: "TMates is built exclusively around testosterone therapy.",
        supportingPoints: ["TRT-first membership", "Focused support"],
      },
      {
        name: "Breadth of services",
        winner: "provider2",
        explanation: "Fridays offers a wider men's-health lineup beyond TRT.",
        supportingPoints: ["Multiple treatments", "One men's-health account"],
      },
      {
        name: "Diagnosis",
        winner: "tie",
        explanation: "Both require lab testing and a licensed-clinician review before prescribing.",
        supportingPoints: ["Lab-based", "Clinician-confirmed"],
      },
      {
        name: "Ongoing monitoring",
        winner: "provider1",
        explanation: "TMates centers its membership on ongoing monitoring and dose management.",
        supportingPoints: ["Regular check-ins", "Dose management"],
      },
    ],
    features: [
      { feature: "TRT focus", provider1Value: "Exclusive", provider2Value: "Part of a broader menu", highlight: "provider1" },
      { feature: "Lab testing", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Clinician review", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "taurus-vs-fridays",
    provider1Id: "taurus",
    provider2Id: "fridays",
    title: "Taurus Meds vs Fridays",
    matchupLabel: "Taurus Meds vs Fridays",
    subtitle: "Two men's-health platforms that both offer TRT online",
    description:
      "Compare Taurus Meds and Fridays for online TRT - approach, monitoring and which fits your priorities.",
    intro:
      "Taurus Meds and Fridays are both men's-health telehealth brands that offer testosterone therapy within a broader lineup, each after the required lab testing and a clinician review. They're close comparisons, so the differences come down to the specifics of each plan. Here's how they compare.",
    verdict:
      "Both offer a convenient, lab-based online path to TRT within a broader men's-health service. Taurus Meds edges it here for its clearer TRT framing, but the two are close - confirm the exact testing, monitoring and pricing on each provider's own site before deciding.",
    verdictWinnerPoints: [
      "Men's-health platform with TRT",
      "Lab-based diagnosis and clinician review",
      "Discreet delivery",
    ],
    verdictLoserPoints: [
      "Men's-health platform with TRT",
      "Lab-based diagnosis and clinician review",
      "Discreet delivery",
    ],
    winnerId: "taurus",
    categories: [
      {
        name: "TRT framing",
        winner: "provider1",
        explanation: "Taurus Meds presents its TRT offering clearly within its men's-health lineup.",
        supportingPoints: ["Clear TRT offering", "Men's-health focus"],
      },
      {
        name: "Breadth of services",
        winner: "tie",
        explanation: "Both are broader men's-health platforms rather than TRT-only programs.",
        supportingPoints: ["Multiple treatments", "One men's-health account"],
      },
      {
        name: "Diagnosis",
        winner: "tie",
        explanation: "Both require lab testing and a licensed-clinician review before prescribing.",
        supportingPoints: ["Lab-based", "Clinician-confirmed"],
      },
      {
        name: "Discreet delivery",
        winner: "tie",
        explanation: "Both arrange treatment discreetly.",
        supportingPoints: ["Plain packaging", "Direct-to-door"],
      },
    ],
    features: [
      { feature: "Service type", provider1Value: "Men's health + TRT", provider2Value: "Men's health + TRT", highlight: "both" },
      { feature: "Lab testing", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Clinician review", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "dudemeds-vs-fridays",
    provider1Id: "dudemeds",
    provider2Id: "fridays",
    title: "DudeMeds vs Fridays",
    matchupLabel: "DudeMeds vs Fridays",
    subtitle: "A value-minded TRT option vs a broader men's-health platform",
    description:
      "Compare DudeMeds and Fridays for online TRT - value, breadth and which fits your priorities.",
    intro:
      "DudeMeds and Fridays are both straightforward men's telehealth services offering TRT online after the required testing and a clinician review. DudeMeds leans on simple, value-minded pricing; Fridays leans on a broader men's-health lineup. Here's how they compare.",
    verdict:
      "Both offer a convenient online path to TRT. DudeMeds edges it for men who want simple, budget-friendly access, while Fridays appeals if you want TRT alongside a broader men's-health service. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Value-minded, budget-friendly pricing",
      "Simple, fast sign-up",
      "Straightforward TRT access",
    ],
    verdictLoserPoints: [
      "Broader men's-health platform",
      "TRT plus other treatments",
      "Convenient online consultation",
    ],
    winnerId: "dudemeds",
    categories: [
      {
        name: "Value",
        winner: "provider1",
        explanation: "DudeMeds is explicitly built around low, simple pricing.",
        supportingPoints: ["Budget-friendly", "No-frills sign-up"],
      },
      {
        name: "Breadth of services",
        winner: "provider2",
        explanation: "Fridays offers a wider men's-health lineup beyond TRT.",
        supportingPoints: ["Multiple treatments", "One men's-health account"],
      },
      {
        name: "Diagnosis",
        winner: "tie",
        explanation: "Both require lab testing and a licensed-clinician review before prescribing.",
        supportingPoints: ["Lab-based", "Clinician-confirmed"],
      },
      {
        name: "Discreet delivery",
        winner: "tie",
        explanation: "Both arrange treatment discreetly.",
        supportingPoints: ["Plain packaging", "Direct-to-door"],
      },
    ],
    features: [
      { feature: "Positioning", provider1Value: "Value-focused", provider2Value: "Broader men's health", highlight: "provider1" },
      { feature: "Lab testing", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Clinician review", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Pricing", provider1Value: "See site (value)", provider2Value: "See site", highlight: "provider1" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "hone-vs-maleexcel",
    provider1Id: "hone",
    provider2Id: "maleexcel",
    title: "Hone Health vs Male Excel",
    matchupLabel: "Hone Health vs Male Excel",
    subtitle: "A testing-first hormone program vs an established men's-health brand",
    description:
      "Compare Hone Health and Male Excel for online TRT - testing, monitoring, treatment formats and which fits you best.",
    intro:
      "Hone Health and Male Excel are two of the stronger names in online TRT, and both start with testing and a licensed clinician. Hone is a testing-first program centered on hormone care with deep ongoing monitoring; Male Excel is an established men's-health brand with a choice of treatment formats. Here's how they compare.",
    verdict:
      "Both are credible, established options. Hone is our pick for its testing-first program and depth of ongoing monitoring, while Male Excel is an excellent choice if brand track record and format flexibility matter most. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Testing-first hormone program",
      "Connected diagnosis, treatment and monitoring",
      "Deep ongoing follow-up",
    ],
    verdictLoserPoints: [
      "Established, recognizable brand",
      "A choice of treatment formats",
      "At-home testing and clinician oversight",
    ],
    winnerId: "hone",
    categories: [
      {
        name: "Program depth",
        winner: "provider1",
        explanation: "Hone connects testing, treatment and ongoing monitoring in one focused hormone program.",
        supportingPoints: ["Testing-first", "Ongoing monitoring"],
      },
      {
        name: "Brand & track record",
        winner: "provider2",
        explanation: "Male Excel is an established, recognizable men's-health brand.",
        supportingPoints: ["Well-known brand", "Established track record"],
      },
      {
        name: "Diagnosis",
        winner: "tie",
        explanation: "Both require testing and a licensed-clinician review before prescribing.",
        supportingPoints: ["Lab-based", "Clinician-confirmed"],
      },
      {
        name: "Format options",
        winner: "provider2",
        explanation: "Male Excel offers a choice of testosterone treatment formats to discuss with a clinician.",
        supportingPoints: ["Multiple formats", "Clinician-directed"],
      },
    ],
    features: [
      { feature: "Program depth", provider1Value: "Comprehensive", provider2Value: "Established brand", highlight: "provider1" },
      { feature: "Lab testing", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Clinician review", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "tmates-vs-maleexcel",
    provider1Id: "tmates",
    provider2Id: "maleexcel",
    title: "TMates vs Male Excel",
    matchupLabel: "TMates vs Male Excel",
    subtitle: "A dedicated TRT membership vs an established men's-health brand",
    description:
      "Compare TMates and Male Excel for online TRT - focus, monitoring, brand and which fits you best.",
    intro:
      "TMates and Male Excel both offer TRT online after testing and a clinician review, but they compete on different strengths. TMates is a membership built exclusively around testosterone therapy with ongoing monitoring; Male Excel is an established men's-health brand with a choice of treatment formats. Here's how they compare.",
    verdict:
      "Both are strong, honest options. TMates wins for its dedicated TRT focus and built-in monitoring, while Male Excel wins on brand track record and format flexibility. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "TRT-first membership",
      "Ongoing monitoring built in",
      "Focused support for men on therapy",
    ],
    verdictLoserPoints: [
      "Established, recognizable brand",
      "A choice of treatment formats",
      "At-home testing and clinician oversight",
    ],
    winnerId: "tmates",
    categories: [
      {
        name: "TRT focus",
        winner: "provider1",
        explanation: "TMates is built exclusively around testosterone therapy.",
        supportingPoints: ["TRT-first membership", "Focused support"],
      },
      {
        name: "Brand & track record",
        winner: "provider2",
        explanation: "Male Excel is an established, recognizable men's-health brand.",
        supportingPoints: ["Well-known brand", "Established track record"],
      },
      {
        name: "Diagnosis",
        winner: "tie",
        explanation: "Both require testing and a licensed-clinician review before prescribing.",
        supportingPoints: ["Lab-based", "Clinician-confirmed"],
      },
      {
        name: "Ongoing monitoring",
        winner: "provider1",
        explanation: "TMates centers its membership on ongoing monitoring and dose management.",
        supportingPoints: ["Regular check-ins", "Dose management"],
      },
    ],
    features: [
      { feature: "TRT focus", provider1Value: "Exclusive", provider2Value: "Part of a broad brand", highlight: "provider1" },
      { feature: "Lab testing", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Clinician review", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "maleexcel-vs-taurus",
    provider1Id: "maleexcel",
    provider2Id: "taurus",
    title: "Male Excel vs Taurus Meds",
    matchupLabel: "Male Excel vs Taurus Meds",
    subtitle: "An established men's-health brand vs a broader men's-health platform",
    description:
      "Compare Male Excel and Taurus Meds for online TRT - brand, breadth and which fits your priorities.",
    intro:
      "Male Excel and Taurus Meds both offer TRT within a men's-health service after testing and a clinician review. Male Excel is the more established, recognizable brand with a choice of treatment formats; Taurus Meds offers TRT alongside a broader men's-health lineup. Here's how they compare.",
    verdict:
      "Both are convenient online options. Male Excel edges it for its established track record and format choice, while Taurus Meds appeals if you want TRT within a broader men's-health platform. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Established, recognizable brand",
      "A choice of treatment formats",
      "At-home testing and clinician oversight",
    ],
    verdictLoserPoints: [
      "Broader men's-health platform",
      "TRT plus other treatments",
      "Convenient online consultation",
    ],
    winnerId: "maleexcel",
    categories: [
      {
        name: "Brand & track record",
        winner: "provider1",
        explanation: "Male Excel is a more established, recognizable men's-health brand.",
        supportingPoints: ["Well-known brand", "Established track record"],
      },
      {
        name: "Breadth of services",
        winner: "provider2",
        explanation: "Taurus Meds offers a wider men's-health lineup beyond TRT.",
        supportingPoints: ["Multiple treatments", "One men's-health account"],
      },
      {
        name: "Diagnosis",
        winner: "tie",
        explanation: "Both require testing and a licensed-clinician review before prescribing.",
        supportingPoints: ["Lab-based", "Clinician-confirmed"],
      },
      {
        name: "Format options",
        winner: "provider1",
        explanation: "Male Excel offers a choice of testosterone treatment formats.",
        supportingPoints: ["Multiple formats", "Clinician-directed"],
      },
    ],
    features: [
      { feature: "Brand", provider1Value: "Established", provider2Value: "Newer", highlight: "provider1" },
      { feature: "Lab testing", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Clinician review", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "maleexcel-vs-dudemeds",
    provider1Id: "maleexcel",
    provider2Id: "dudemeds",
    title: "Male Excel vs DudeMeds",
    matchupLabel: "Male Excel vs DudeMeds",
    subtitle: "An established brand with format choice vs a value-minded option",
    description:
      "Compare Male Excel and DudeMeds for online TRT - brand, format choice, price and which fits your priorities.",
    intro:
      "Male Excel and DudeMeds sit at different ends of the market. Male Excel is an established men's-health brand with a choice of treatment formats and a track record; DudeMeds is a simple, value-minded service. Both start with testing and a clinician review. Here's how they compare.",
    verdict:
      "Both are legitimate online options. Male Excel wins for brand track record and format flexibility, while DudeMeds wins on simple, budget-friendly access. Choose Male Excel if an established provider matters; choose DudeMeds if price does. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Established, recognizable brand",
      "A choice of treatment formats",
      "At-home testing and clinician oversight",
    ],
    verdictLoserPoints: [
      "Value-minded, budget-friendly pricing",
      "Simple, fast sign-up",
      "Straightforward TRT access",
    ],
    winnerId: "maleexcel",
    categories: [
      {
        name: "Brand & track record",
        winner: "provider1",
        explanation: "Male Excel is an established, recognizable men's-health brand.",
        supportingPoints: ["Well-known brand", "Established track record"],
      },
      {
        name: "Value",
        winner: "provider2",
        explanation: "DudeMeds is built around low, simple pricing.",
        supportingPoints: ["Budget-friendly", "No-frills sign-up"],
      },
      {
        name: "Diagnosis",
        winner: "tie",
        explanation: "Both require testing and a licensed-clinician review before prescribing.",
        supportingPoints: ["Lab-based", "Clinician-confirmed"],
      },
      {
        name: "Format options",
        winner: "provider1",
        explanation: "Male Excel offers a choice of testosterone treatment formats.",
        supportingPoints: ["Multiple formats", "Clinician-directed"],
      },
    ],
    features: [
      { feature: "Brand", provider1Value: "Established", provider2Value: "Value-focused", highlight: "provider1" },
      { feature: "Lab testing", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Clinician review", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site (value)", highlight: "provider2" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "maleexcel-vs-fridays",
    provider1Id: "maleexcel",
    provider2Id: "fridays",
    title: "Male Excel vs Fridays",
    matchupLabel: "Male Excel vs Fridays",
    subtitle: "An established men's-health brand vs a broader men's-health platform",
    description:
      "Compare Male Excel and Fridays for online TRT - brand, breadth and which fits you best.",
    intro:
      "Male Excel and Fridays both offer TRT within a men's-health service after testing and a clinician review. Male Excel is the more established brand with a choice of treatment formats; Fridays offers TRT within a broader men's-health lineup. Here's how they compare.",
    verdict:
      "Both offer a convenient online path to TRT. Male Excel edges it for its established track record and format choice, while Fridays appeals if you want TRT within a broader men's-health platform. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Established, recognizable brand",
      "A choice of treatment formats",
      "At-home testing and clinician oversight",
    ],
    verdictLoserPoints: [
      "Broader men's-health platform",
      "TRT plus other treatments",
      "Convenient online consultation",
    ],
    winnerId: "maleexcel",
    categories: [
      {
        name: "Brand & track record",
        winner: "provider1",
        explanation: "Male Excel is a more established, recognizable men's-health brand.",
        supportingPoints: ["Well-known brand", "Established track record"],
      },
      {
        name: "Breadth of services",
        winner: "provider2",
        explanation: "Fridays offers a wider men's-health lineup beyond TRT.",
        supportingPoints: ["Multiple treatments", "One men's-health account"],
      },
      {
        name: "Diagnosis",
        winner: "tie",
        explanation: "Both require testing and a licensed-clinician review before prescribing.",
        supportingPoints: ["Lab-based", "Clinician-confirmed"],
      },
      {
        name: "Format options",
        winner: "provider1",
        explanation: "Male Excel offers a choice of testosterone treatment formats.",
        supportingPoints: ["Multiple formats", "Clinician-directed"],
      },
    ],
    features: [
      { feature: "Brand", provider1Value: "Established", provider2Value: "Newer", highlight: "provider1" },
      { feature: "Lab testing", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Clinician review", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "hone-vs-brightmeds",
    provider1Id: "hone",
    provider2Id: "brightmeds",
    title: "Hone Health vs Brightmeds",
    matchupLabel: "Hone Health vs Brightmeds",
    subtitle: "A testing-first TRT program vs a highly-rated general telehealth service",
    description:
      "Compare Hone Health and Brightmeds for online TRT - testing depth, TRT focus, reviews and which fits you best.",
    intro:
      "Hone Health and Brightmeds are both online telehealth services, but they're built for different things. Hone is a testing-first, TRT-focused program with ongoing monitoring; Brightmeds is a highly-rated general prescription service (4.7 on Trustpilot) which also offers TRT alongside other treatments. Here's how they compare.",
    verdict:
      "Hone is our pick for TRT specifically, thanks to its testing-first program and depth of monitoring. Brightmeds earns strong reviews for a fast, easy online experience. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Testing-first, TRT-focused program",
      "Ongoing monitoring and dose adjustments",
      "Established hormone-care model",
    ],
    verdictLoserPoints: [
      "Excellent review record (4.7 on Trustpilot)",
      "Fast, easy online process",
      "Discreet home delivery",
    ],
    winnerId: "hone",
    categories: [
      {
        name: "TRT focus & depth",
        winner: "provider1",
        explanation: "Hone is a dedicated, testing-first hormone program; Brightmeds is a broader telehealth service.",
        supportingPoints: ["Testing-first", "Ongoing monitoring"],
      },
      {
        name: "Review record",
        winner: "provider2",
        explanation: "Brightmeds has a strong, verified Trustpilot record (4.7 from 1,000+ reviews).",
        supportingPoints: ["4.7 on Trustpilot", "Praised for speed and ease"],
      },
      {
        name: "Medical oversight",
        winner: "tie",
        explanation: "Both prescribe only after a licensed-clinician review.",
        supportingPoints: ["Clinician review at both", "Fully online"],
      },
      {
        name: "Best-fit clarity for TRT",
        winner: "provider1",
        explanation: "Hone's offering is clearly TRT.",
        supportingPoints: ["Clear TRT program", "Broader telehealth service"],
      },
    ],
    features: [
      { feature: "TRT focus", provider1Value: "High", provider2Value: "Yes", highlight: "provider1" },
      { feature: "Reviews", provider1Value: "See site", provider2Value: "4.7 on Trustpilot", highlight: "provider2" },
      { feature: "Clinician review", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "tmates-vs-brightmeds",
    provider1Id: "tmates",
    provider2Id: "brightmeds",
    title: "TMates vs Brightmeds",
    matchupLabel: "TMates vs Brightmeds",
    subtitle: "A dedicated TRT membership vs a highly-rated general telehealth service",
    description:
      "Compare TMates and Brightmeds for online TRT - TRT focus, monitoring, reviews and which fits you best.",
    intro:
      "TMates is a membership built exclusively around testosterone therapy with ongoing monitoring; Brightmeds is a highly-rated general online prescription service which also offers TRT alongside other treatments. Here's how they compare.",
    verdict:
      "TMates wins for TRT specifically, thanks to its dedicated, monitoring-heavy program. Brightmeds earns excellent reviews for a fast, easy experience. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Dedicated TRT-first membership",
      "Ongoing monitoring built in",
      "Focused support for men on therapy",
    ],
    verdictLoserPoints: [
      "Excellent review record (4.7 on Trustpilot)",
      "Fast, easy online process",
      "Discreet home delivery",
    ],
    winnerId: "tmates",
    categories: [
      {
        name: "TRT focus",
        winner: "provider1",
        explanation: "TMates is built exclusively around testosterone therapy.",
        supportingPoints: ["TRT-first membership", "Focused support"],
      },
      {
        name: "Review record",
        winner: "provider2",
        explanation: "Brightmeds has a strong, verified Trustpilot record (4.7 from 1,000+ reviews).",
        supportingPoints: ["4.7 on Trustpilot", "Praised for speed and ease"],
      },
      {
        name: "Medical oversight",
        winner: "tie",
        explanation: "Both prescribe only after a licensed-clinician review.",
        supportingPoints: ["Clinician review at both", "Fully online"],
      },
      {
        name: "Ongoing monitoring",
        winner: "provider1",
        explanation: "TMates centers its membership on ongoing monitoring and dose management.",
        supportingPoints: ["Regular check-ins", "Dose management"],
      },
    ],
    features: [
      { feature: "TRT focus", provider1Value: "Exclusive", provider2Value: "Yes", highlight: "provider1" },
      { feature: "Reviews", provider1Value: "See site", provider2Value: "4.7 on Trustpilot", highlight: "provider2" },
      { feature: "Clinician review", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "maleexcel-vs-brightmeds",
    provider1Id: "maleexcel",
    provider2Id: "brightmeds",
    title: "Male Excel vs Brightmeds",
    matchupLabel: "Male Excel vs Brightmeds",
    subtitle: "An established TRT brand vs a highly-rated general telehealth service",
    description:
      "Compare Male Excel and Brightmeds for online TRT - TRT focus, testing, reviews and which fits you best.",
    intro:
      "Male Excel is an established men's-health brand with at-home labs and a clear TRT offering (and its own 4.5 Trustpilot record); Brightmeds is a highly-rated general prescription service which also offers TRT alongside other treatments. Here's how they compare.",
    verdict:
      "Male Excel edges it for TRT thanks to its established, testing-backed testosterone program. Brightmeds earns slightly higher review scores overall. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Established, TRT-focused brand",
      "Comprehensive at-home labs",
      "Clear testosterone lineup (injections or cream)",
    ],
    verdictLoserPoints: [
      "Excellent review record (4.7 on Trustpilot)",
      "Fast, easy online process",
      "Discreet home delivery",
    ],
    winnerId: "maleexcel",
    categories: [
      {
        name: "TRT focus & testing",
        winner: "provider1",
        explanation: "Male Excel has a clear TRT program with comprehensive at-home labs.",
        supportingPoints: ["At-home labs", "Clear TRT lineup"],
      },
      {
        name: "Review record",
        winner: "provider2",
        explanation: "Brightmeds edges the raw Trustpilot score (4.7 vs 4.5), both from large review counts.",
        supportingPoints: ["4.7 on Trustpilot", "1,000+ reviews"],
      },
      {
        name: "Medical oversight",
        winner: "tie",
        explanation: "Both prescribe only after a licensed-clinician review.",
        supportingPoints: ["Clinician review at both", "Fully online"],
      },
      {
        name: "Best-fit clarity for TRT",
        winner: "provider1",
        explanation: "Male Excel's TRT offering is clearly defined.",
        supportingPoints: ["Defined TRT program", "Broader telehealth service"],
      },
    ],
    features: [
      { feature: "TRT focus", provider1Value: "High", provider2Value: "Yes", highlight: "provider1" },
      { feature: "Reviews", provider1Value: "4.5 on Trustpilot", provider2Value: "4.7 on Trustpilot", highlight: "provider2" },
      { feature: "Clinician review", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "taurus-vs-brightmeds",
    provider1Id: "taurus",
    provider2Id: "brightmeds",
    title: "Taurus Meds vs Brightmeds",
    matchupLabel: "Taurus Meds vs Brightmeds",
    subtitle: "A men's-health TRT service vs a highly-rated general telehealth service",
    description:
      "Compare Taurus Meds and Brightmeds for online TRT - TRT focus, reviews and which fits your priorities.",
    intro:
      "Taurus Meds offers TRT within a men's-health telehealth service after lab-based diagnosis; Brightmeds is a highly-rated general prescription service which also offers TRT alongside other treatments. Here's how they compare.",
    verdict:
      "Taurus Meds edges it for TRT specifically, since its testosterone offering is clearer. Brightmeds earns a stronger overall review score. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Clear TRT offering within men's health",
      "Lab-based diagnosis",
      "Licensed-clinician review",
    ],
    verdictLoserPoints: [
      "Excellent review record (4.7 on Trustpilot)",
      "Fast, easy online process",
      "Discreet home delivery",
    ],
    winnerId: "taurus",
    categories: [
      {
        name: "TRT clarity",
        winner: "provider1",
        explanation: "Taurus Meds presents a clearer TRT offering.",
        supportingPoints: ["Clear TRT offering", "Lab-based diagnosis"],
      },
      {
        name: "Review record",
        winner: "provider2",
        explanation: "Brightmeds has a strong, verified Trustpilot record (4.7 from 1,000+ reviews).",
        supportingPoints: ["4.7 on Trustpilot", "Praised for speed and ease"],
      },
      {
        name: "Medical oversight",
        winner: "tie",
        explanation: "Both prescribe only after a licensed-clinician review.",
        supportingPoints: ["Clinician review at both", "Fully online"],
      },
      {
        name: "Discreet delivery",
        winner: "tie",
        explanation: "Both ship treatment discreetly to your door.",
        supportingPoints: ["Plain packaging", "Direct-to-door"],
      },
    ],
    features: [
      { feature: "TRT focus", provider1Value: "Yes", provider2Value: "Yes", highlight: "provider1" },
      { feature: "Reviews", provider1Value: "See site", provider2Value: "4.7 on Trustpilot", highlight: "provider2" },
      { feature: "Clinician review", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "dudemeds-vs-brightmeds",
    provider1Id: "dudemeds",
    provider2Id: "brightmeds",
    title: "DudeMeds vs Brightmeds",
    matchupLabel: "DudeMeds vs Brightmeds",
    subtitle: "A value-minded TRT option vs a highly-rated general telehealth service",
    description:
      "Compare DudeMeds and Brightmeds for online TRT - value, TRT focus, reviews and which fits you best.",
    intro:
      "DudeMeds is a simple, value-minded men's telehealth service that offers TRT after the required testing; Brightmeds is a highly-rated general prescription service which also offers TRT alongside other treatments. Here's how they compare.",
    verdict:
      "DudeMeds edges it for TRT on clarity and value, since its testosterone offering is straightforward. Brightmeds earns a stronger overall review score. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Straightforward TRT access",
      "Value-minded pricing",
      "Required testing and clinician review",
    ],
    verdictLoserPoints: [
      "Excellent review record (4.7 on Trustpilot)",
      "Fast, easy online process",
      "Discreet home delivery",
    ],
    winnerId: "dudemeds",
    categories: [
      {
        name: "TRT clarity & value",
        winner: "provider1",
        explanation: "DudeMeds offers a clear, value-minded TRT path.",
        supportingPoints: ["Clear TRT offering", "Budget-friendly"],
      },
      {
        name: "Review record",
        winner: "provider2",
        explanation: "Brightmeds has a strong, verified Trustpilot record (4.7 from 1,000+ reviews).",
        supportingPoints: ["4.7 on Trustpilot", "Praised for speed and ease"],
      },
      {
        name: "Medical oversight",
        winner: "tie",
        explanation: "Both prescribe only after a licensed-clinician review.",
        supportingPoints: ["Clinician review at both", "Fully online"],
      },
      {
        name: "Discreet delivery",
        winner: "tie",
        explanation: "Both ship treatment discreetly to your door.",
        supportingPoints: ["Plain packaging", "Direct-to-door"],
      },
    ],
    features: [
      { feature: "TRT focus", provider1Value: "Yes", provider2Value: "Yes", highlight: "provider1" },
      { feature: "Reviews", provider1Value: "See site", provider2Value: "4.7 on Trustpilot", highlight: "provider2" },
      { feature: "Clinician review", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Pricing", provider1Value: "See site (value)", provider2Value: "See site", highlight: "provider1" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "fridays-vs-brightmeds",
    provider1Id: "fridays",
    provider2Id: "brightmeds",
    title: "Fridays vs Brightmeds",
    matchupLabel: "Fridays vs Brightmeds",
    subtitle: "A men's-health TRT service vs a highly-rated general telehealth service",
    description:
      "Compare Fridays and Brightmeds for online TRT - TRT focus, reviews and which fits you best.",
    intro:
      "Fridays offers TRT within a men's-health telehealth service after lab-based diagnosis; Brightmeds is a highly-rated general prescription service which also offers TRT alongside other treatments. Here's how they compare.",
    verdict:
      "Fridays edges it for TRT specifically, since its testosterone offering is clearer within a men's-health service. Brightmeds earns a stronger overall review score. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "TRT within a men's-health service",
      "Lab-based diagnosis",
      "Licensed-clinician review",
    ],
    verdictLoserPoints: [
      "Excellent review record (4.7 on Trustpilot)",
      "Fast, easy online process",
      "Discreet home delivery",
    ],
    winnerId: "fridays",
    categories: [
      {
        name: "TRT clarity",
        winner: "provider1",
        explanation: "Fridays presents a clearer TRT offering.",
        supportingPoints: ["Clear TRT offering", "Lab-based diagnosis"],
      },
      {
        name: "Review record",
        winner: "provider2",
        explanation: "Brightmeds has a strong, verified Trustpilot record (4.7 from 1,000+ reviews).",
        supportingPoints: ["4.7 on Trustpilot", "Praised for speed and ease"],
      },
      {
        name: "Medical oversight",
        winner: "tie",
        explanation: "Both prescribe only after a licensed-clinician review.",
        supportingPoints: ["Clinician review at both", "Fully online"],
      },
      {
        name: "Discreet delivery",
        winner: "tie",
        explanation: "Both ship treatment discreetly to your door.",
        supportingPoints: ["Plain packaging", "Direct-to-door"],
      },
    ],
    features: [
      { feature: "TRT focus", provider1Value: "Yes", provider2Value: "Yes", highlight: "provider1" },
      { feature: "Reviews", provider1Value: "See site", provider2Value: "4.7 on Trustpilot", highlight: "provider2" },
      { feature: "Clinician review", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
];

export const TRT_FAQS_PORTED: FaqItem[] = [
  {
    question: "What is TRT?",
    answer:
      "TRT (testosterone replacement therapy) is a prescription treatment that restores testosterone in men whose levels are clinically low. It's diagnosed with blood tests - usually two morning total-testosterone measurements - plus a symptom evaluation, and it's prescribed and monitored by a licensed clinician. It's a treatment for diagnosed low testosterone (hypogonadism), not a performance booster for men with normal levels.",
  },
  {
    question: "How do online TRT clinics work?",
    answer:
      "You complete an intake and lab testing to measure your testosterone, a licensed clinician reviews your results and symptoms to decide whether therapy is appropriate, and - if it is - treatment is arranged with ongoing monitoring. Legitimate services always include lab testing and a clinician's review; a site that prescribes testosterone with no bloodwork or clinician is a red flag.",
  },
  {
    question: "Do I need blood tests before starting TRT?",
    answer:
      "Yes. Confirming clinically low testosterone with blood work is a required, non-negotiable step - testosterone is typically measured in the morning and often more than once. Ongoing bloodwork also continues during treatment to monitor your testosterone, red blood cell count (hematocrit) and prostate (PSA), among other markers, so a clinician can keep therapy safe.",
  },
  {
    question: "Does TRT affect fertility?",
    answer:
      "It can. TRT commonly suppresses the body's own testosterone production and can reduce sperm production, which may impair fertility - sometimes significantly. Men who want to have children should raise this with a clinician before starting; alternatives that support fertility exist and should be discussed. This is one of the most important trade-offs to understand up front.",
  },
  {
    question: "What are the common side effects of TRT?",
    answer:
      "Possible side effects include acne or oily skin, fluid retention, an increase in red blood cell count (which is why hematocrit is monitored), testicular shrinkage, breast tenderness, and effects on mood or sleep. Because TRT is monitored, a clinician tracks these with follow-up bloodwork and can adjust treatment. TRT isn't appropriate for everyone, which is why the medical review matters.",
  },
  {
    question: "How much does TRT cost?",
    answer:
      "It varies by provider and plan. TRT programs typically combine an initial testing/diagnostic cost with an ongoing monthly or membership fee that covers clinician oversight, monitoring and medication. Because promotions and plans change frequently, confirm the current total on each provider's own site before enrolling.",
  },
  {
    question: "Is TRT a lifelong commitment?",
    answer:
      "For many men it's long-term. TRT manages low testosterone rather than curing it, so if you stop, your levels - and symptoms - typically return to where they were (and it can take time for your body's own production to recover). Whether and how long to stay on therapy is a decision to make with your clinician based on your goals, response and monitoring.",
  },
  {
    question: "Can I get TRT if my testosterone is normal?",
    answer:
      "TRT is intended for men with clinically low testosterone confirmed by testing, not for men with normal levels seeking an edge. Taking testosterone when your levels are normal exposes you to the risks without treating a diagnosed deficiency, and a responsible clinician won't prescribe it. If your symptoms are real but your levels are normal, a clinician can help look for other causes.",
  },
];

export const TRT_LANDING_PAGES_PORTED: LandingPageData[] = [
  {
    slug: "best-trt-for-beginners",
    seoTitle: "Best TRT for Beginners: How to Start Safely (2026)",
    seoDescription:
      "The best online TRT clinics for beginners in 2026, ranked. Start with real lab testing, a clinician's review and ongoing monitoring.",
    h1: "Best TRT for Beginners",
    h2: "Where to start with testosterone therapy - safely, and without the guesswork",
    heroDescription:
      "New to TRT? These licensed online clinics start with real bloodwork and a clinician's review before any treatment - compare the best places to begin.",
    providerOrder: ["hone", "tmates", "taurus", "dudemeds"],
    editorialSections: [
      {
        heading: "What is the best TRT clinic for beginners?",
        body: `<p><strong><a href="/trt/reviews/hone">Hone Health</a> is our top pick for beginners</strong> because it does the one thing a first-timer needs most: it starts with real lab testing to confirm whether your testosterone is actually low, then moves to a physician's review and ongoing monitoring - rather than skipping straight to a prescription. For a beginner, that testing-first, guided path is exactly what separates responsible TRT from a shortcut. <a href="/trt/reviews/tmates">TMates</a> is a close second for its dedicated, monitoring-heavy TRT membership, while <a href="/trt/reviews/dudemeds">DudeMeds</a> is the simplest, most budget-friendly way in.</p>`,
      },
      {
        heading: "How does starting TRT actually work?",
        body: `<p>Legitimate online TRT follows the same four-step path everywhere, and understanding it is the best way to avoid a bad provider. It always begins with data and a licensed clinician - never a checkout button.</p>`,
        bullets: [
          "Test: you complete bloodwork (often an at-home kit or a partner lab) to measure your testosterone.",
          "Review: a licensed clinician reviews your results and symptoms and decides whether TRT is appropriate.",
          "Treat: if it is, treatment is prescribed and arranged discreetly.",
          "Monitor: follow-up bloodwork tracks your levels, red blood cell count and prostate markers over time.",
        ],
      },
      {
        heading: "How do I know if I actually need TRT?",
        body: `<p>You don't decide that yourself - a clinician does, based on bloodwork plus symptoms. TRT is a treatment for clinically low testosterone (hypogonadism), not a booster for men with normal levels. Common signs worth getting tested for include low energy, low libido, loss of muscle, brain fog and low mood, but these overlap with many other causes, which is why testing matters. Our guide to the <a href="/trt/articles/signs-of-low-testosterone">signs of low testosterone</a> covers what to look for, and <a href="/trt/articles/what-is-trt">what TRT is</a> explains the basics.</p>`,
      },
      {
        heading: "What should a beginner look for in a TRT clinic?",
        body: `<p>The best beginner clinic removes friction without removing the safeguards. Weigh these five things when you compare the options above:</p>`,
        bullets: [
          "Real lab testing before any prescription - not a form-only 'diagnosis'.",
          "Licensed clinicians who actually review your results.",
          "Ongoing monitoring with follow-up bloodwork, not a one-and-done script.",
          "Transparent, all-in pricing with no surprise fees.",
          "Responsive support for dose questions and side effects.",
        ],
      },
      {
        heading: "How much does TRT cost when you're starting out?",
        body: `<p>Expect an initial testing/diagnostic cost plus an ongoing monthly or membership fee that bundles clinician oversight, monitoring and medication. Beginner-friendly value picks like <a href="/trt/reviews/dudemeds">DudeMeds</a> keep the entry price low, while comprehensive programs like <a href="/trt/reviews/hone">Hone Health</a> cost more but fold testing and monitoring into one place. Prices and promotions change often, so confirm the current total on each provider's own site - our <a href="/trt/articles/trt-cost">TRT cost guide</a> breaks down what drives the price.</p>`,
      },
      {
        heading: "What trade-offs should I understand before starting TRT?",
        body: `<p>TRT is effective for the right man, but it's a long-term commitment with real trade-offs - go in informed. The two biggest: it commonly reduces fertility (see our guide to <a href="/trt/articles/trt-and-fertility">TRT and fertility</a>), and it usually needs to be continued long-term with ongoing bloodwork to stay safe. It can also raise red blood cell count and cause acne or oily skin, which is exactly what monitoring is for. Read the full picture in <a href="/trt/articles/trt-side-effects">TRT side effects</a> before you begin.</p>`,
      },
      {
        heading: "How we chose the best TRT for beginners",
        body: `<p>We ranked clinics on how well they support a first-timer: testing-led diagnosis, licensed-clinician oversight, depth of ongoing monitoring, transparent pricing and quality of support. We prioritize a responsible on-ramp over the cheapest possible entry. See the full field on our <a href="/trt">TRT clinic comparison</a> and read the individual <a href="/trt/reviews">provider reviews</a>.</p><p><em>This page is general information, not medical advice. A licensed clinician should evaluate your symptoms and testosterone levels and decide whether TRT is appropriate for you.</em></p>`,
      },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "cheapest-online-trt",
    seoTitle: "Cheapest Online TRT Clinics: Compare All-In Cost (2026)",
    seoDescription:
      "Looking for the cheapest online TRT clinic? Compare the most affordable online testosterone clinics of 2026 by all-in cost, without cutting safeguards.",
    h1: "Cheapest Online TRT Clinics",
    h2: "The most affordable online TRT clinics, ranked by all-in cost - without skipping the safeguards",
    heroDescription:
      "Looking for the cheapest online TRT clinic? These are the most affordable online testosterone therapy clinics, ranked by all-in cost - each still includes real lab testing and a licensed clinician's review.",
    providerOrder: ["dudemeds", "taurus", "tmates", "hone"],
    editorialSections: [
      {
        heading: "What is the cheapest online TRT clinic?",
        body: `<p><strong>For the cheapest online TRT clinic, <a href="/trt/reviews/dudemeds">DudeMeds</a> is our top value pick.</strong> It strips the process back to the essentials - a simple sign-up, the required lab testing and a licensed-clinician review - and prices TRT toward the affordable end. <a href="/trt/reviews/taurus">Taurus Meds</a> is another budget-friendly men's-health clinic, while <a href="/trt/reviews/tmates">TMates</a> and <a href="/trt/reviews/hone">Hone Health</a> cost more but bundle in deeper monitoring. Among online TRT clinics, the cheapest option is the one that trims the frills - not the bloodwork or the clinician. Here's how the most affordable clinics compare on all-in cost:</p>`,
      },
      {
        heading: "What's the most affordable way to get TRT online?",
        body: `<p>The most affordable way to get TRT online is to pick a value-focused clinic and the plan that matches how much monitoring you actually need - nothing more. A few honest levers keep the cost low:</p>`,
        bullets: [
          "Start with a lean, value-first clinic like DudeMeds or Taurus Meds rather than a premium membership.",
          "Choose the lowest-cost plan that still includes the required labs and clinician review.",
          "Look for clinics that bundle testing and medication into one flat monthly fee.",
          "Skip extras you won't use - the cheapest TRT is the one priced for your actual needs.",
        ],
      },
      {
        heading: "How much does online TRT actually cost?",
        body: `<p>TRT pricing has two parts: an initial testing/diagnostic cost, and an ongoing monthly or membership fee that covers the clinician, monitoring and medication. Because providers bundle these differently, a low headline price isn't always the cheapest once you add labs, follow-ups and shipping. Compare the <strong>all-in monthly cost</strong>, not the teaser number - our <a href="/trt/articles/trt-cost">TRT cost guide</a> shows exactly what to add up.</p>`,
      },
      {
        heading: "How do I compare TRT prices fairly?",
        body: `<p>Line the clinics up on total cost for the same thing. A fair comparison looks at:</p>`,
        bullets: [
          "The ongoing monthly fee and exactly what it includes.",
          "Whether lab testing and follow-up bloodwork are included or billed separately.",
          "Medication and shipping costs.",
          "Any membership or consultation fees.",
          "How easy it is to pause or cancel.",
        ],
      },
      {
        heading: "Is cheaper TRT safe?",
        body: `<p>It can be - as long as 'cheap' means fewer frills, not fewer safeguards. A legitimate low-cost clinic still runs bloodwork to confirm low testosterone, still has a licensed clinician approve treatment, and still monitors you over time. What you should never pay less for is oversight: any site that sells testosterone with no lab work or no clinician is a red flag, not a bargain. Learn what a proper process looks like in <a href="/trt/articles/how-to-get-trt-online">how to get TRT online</a>.</p>`,
      },
      {
        heading: "How can I lower my TRT costs over time?",
        body: `<p>A few honest levers keep the ongoing cost down without cutting corners:</p>`,
        bullets: [
          "Choose a value-focused clinic like DudeMeds if you don't need premium extras.",
          "Pick the plan that matches how often you're actually monitored.",
          "Watch for bundle pricing that folds labs and medication into one fee.",
          "Confirm the current promotion on the provider's own site before you subscribe.",
        ],
      },
      {
        heading: "How we ranked the cheapest TRT clinics",
        body: `<p>We ranked these clinics by best value - the lowest all-in cost that still includes real lab testing and a licensed-clinician review - rather than the lowest headline price alone. Pricing changes often, so treat figures as approximate and confirm them on each provider's site. See the full field on our <a href="/trt">TRT clinic comparison</a> and browse every <a href="/trt/reviews">provider review</a>.</p><p><em>This page is general information, not medical advice, and not financial advice. Confirm current pricing directly with each provider, and let a licensed clinician decide whether TRT is right for you.</em></p>`,
      },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "best-trt-for-fertility",
    seoTitle: "Best TRT Options if You Want to Protect Fertility",
    seoDescription:
      "TRT can lower fertility. Compare online clinics that take it seriously: sperm production, monitoring and fertility-preserving options like enclomiphene and hCG.",
    h1: "Best TRT Options for Men Concerned About Fertility",
    h2: "Testosterone therapy and fertility - the clinics that take the trade-off seriously",
    heroDescription:
      "TRT can reduce fertility. These online clinics start with proper testing and a clinician who can discuss the fertility trade-off and alternatives before you commit.",
    providerOrder: ["hone", "tmates", "taurus", "dudemeds"],
    editorialSections: [
      {
        heading: "Does TRT affect fertility?",
        body: `<p><strong>Yes - this is the single most important thing to understand before starting.</strong> TRT commonly suppresses the body's own testosterone production and can significantly reduce sperm production, which may impair fertility, sometimes for as long as you're on it (and recovery afterward isn't guaranteed or immediate). If having children now or later matters to you, this belongs at the very top of your conversation with a clinician. Our guide to <a href="/trt/articles/trt-and-fertility">TRT and fertility</a> goes deeper.</p>`,
      },
      {
        heading: "Which TRT clinic is best if I care about fertility?",
        body: `<p><a href="/trt/reviews/hone">Hone Health</a> and <a href="/trt/reviews/tmates">TMates</a> lead here because both are testing-led and monitoring-heavy, with licensed clinicians who can actually discuss the fertility trade-off and alternatives rather than just mailing a prescription. The 'best' clinic for a fertility-conscious man isn't the fastest or cheapest - it's the one that surfaces the trade-off early and can point you toward the right path.</p>`,
      },
      {
        heading: "What are the fertility-friendly alternatives to TRT?",
        body: `<p>For some men with low testosterone who want to preserve fertility, clinicians consider medications that raise the body's <em>own</em> testosterone instead of replacing it - which can spare sperm production. These are prescription-only and clinician-directed, and whether they fit depends on your bloodwork and goals. Options a clinician may raise include:</p>`,
        bullets: [
          "Enclomiphene or clomiphene - stimulate the body's own testosterone production.",
          "hCG - sometimes used alongside or instead of TRT to help maintain fertility.",
          "Addressing reversible causes of low testosterone first (sleep, weight, medications).",
        ],
      },
      {
        heading: "Can I protect fertility while on TRT?",
        body: `<p>Sometimes, but only under a clinician's care - this is not a DIY area. Some men use fertility-supporting medication alongside TRT, and others bank sperm before starting as a safeguard. Because approaches and results vary, the practical takeaway is simple: raise fertility explicitly, before your first dose, with a clinician who monitors you. We deliberately don't give protocols or dosing here - that's a medical decision.</p>`,
      },
      {
        heading: "What should I ask a clinic about fertility before starting?",
        body: `<p>Bring these questions to your intake or consultation:</p>`,
        bullets: [
          "How will this treatment affect my sperm production and fertility?",
          "Do you offer or coordinate fertility-preserving alternatives like enclomiphene or hCG?",
          "Should I bank sperm before starting?",
          "How will you monitor me, and can I pause treatment if plans change?",
        ],
      },
      {
        heading: "How we chose the best TRT for fertility-conscious men",
        body: `<p>We prioritized clinics that are testing-led, that provide genuine clinician access (so fertility can actually be discussed), and that monitor treatment over time - because a fertility-aware decision needs a real clinician, not a checkout flow. Compare the full field on our <a href="/trt">TRT clinic comparison</a> and read the <a href="/trt/reviews">provider reviews</a>.</p><p><em>This page is general information, not medical advice. Fertility and TRT decisions are highly individual - a licensed clinician should evaluate your situation and discuss options with you.</em></p>`,
      },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "best-at-home-trt",
    seoTitle: "Best At-Home TRT: Test & Treat From Home (2026)",
    seoDescription:
      "Compare the best at-home online TRT clinics of 2026, from at-home hormone testing to doctor-reviewed treatment delivered to your door.",
    h1: "Best At-Home TRT Clinics",
    h2: "Test, treat and monitor your testosterone from home - with a licensed clinician in the loop",
    heroDescription:
      "Handle testosterone therapy from home - at-home lab testing, a licensed clinician's review and treatment delivered discreetly. Compare the best fully-remote TRT clinics.",
    providerOrder: ["hone", "tmates", "taurus", "dudemeds"],
    editorialSections: [
      {
        heading: "What is the best at-home TRT clinic?",
        body: `<p><strong><a href="/trt/reviews/hone">Hone Health</a> is our top pick for at-home TRT</strong> because the entire arc - hormone testing, a physician's review, treatment and ongoing monitoring - is built to happen remotely, without a traditional office visit. <a href="/trt/reviews/tmates">TMates</a> is a strong dedicated-membership alternative, and <a href="/trt/reviews/taurus">Taurus Meds</a> and <a href="/trt/reviews/dudemeds">DudeMeds</a> round out the field as convenient men's-health options. All of them keep the essential safeguard - a licensed clinician - fully intact online.</p>`,
      },
      {
        heading: "How does at-home TRT work?",
        body: `<p>At-home TRT keeps every step remote while keeping a clinician in charge. In practice that means:</p>`,
        bullets: [
          "At-home or nearby-lab bloodwork to measure your testosterone.",
          "A licensed clinician reviews your results and symptoms.",
          "If appropriate, treatment ships discreetly to your door.",
          "Follow-up bloodwork and check-ins happen online over time.",
        ],
      },
      {
        heading: "Is at-home TRT as safe as visiting a clinic?",
        body: `<p>For most men with straightforward low testosterone, yes - because the medical safeguards are the same. A legitimate at-home service still confirms low testosterone with lab work, still has a licensed clinician approve and direct treatment, and still monitors you with follow-up bloodwork. What changes is the convenience, not the oversight. Some complex cases are still better seen in person, and a good clinician will say so. See <a href="/trt/articles/how-to-get-trt-online">how to get TRT online</a> for the full process.</p>`,
      },
      {
        heading: "Do I still need blood tests for at-home TRT?",
        body: `<p>Always. Confirming clinically low testosterone with bloodwork is required no matter how remote the service is - it's what makes treatment appropriate and safe. Good at-home clinics make this painless with at-home test kits or partner labs, and they keep testing you during treatment to track your testosterone, red blood cell count and prostate markers. A service that offers testosterone with <em>no</em> testing isn't 'convenient' - it's a red flag.</p>`,
      },
      {
        heading: "What are the pros and cons of at-home TRT?",
        body: `<p>The convenience is real, and so are the limits. Weigh both:</p>`,
        bullets: [
          "Pro: no waiting room, no time off work, discreet delivery.",
          "Pro: testing, treatment and monitoring managed in one online flow.",
          "Con: complex cases may still need an in-person exam.",
          "Con: you'll need to keep up with at-home bloodwork and check-ins.",
        ],
      },
      {
        heading: "How we ranked the best at-home TRT clinics",
        body: `<p>We ranked clinics on how completely and responsibly they handle TRT remotely: at-home or lab-based testing, licensed-clinician oversight, depth of ongoing monitoring, discreet delivery and transparent pricing. Compare the full field on our <a href="/trt">TRT clinic comparison</a>, check availability in your state on <a href="/trt">Online TRT by State</a>, and read the <a href="/trt/reviews">provider reviews</a>.</p><p><em>This page is general information, not medical advice. A licensed clinician should evaluate your bloodwork and symptoms and decide whether TRT is appropriate for you.</em></p>`,
      },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "hone-health-alternatives",
    seoTitle: "7 Best Hone Health Alternatives for Online TRT (2026)",
    seoDescription:
      "Looking for an alternative to Hone Health? Compare the best online TRT clinics of 2026, ranked on testing, treatment options, price and support.",
    h1: "Best Hone Health Alternatives",
    h2: "The top online TRT clinics to consider if Hone Health isn't the right fit",
    heroDescription:
      "Hone Health is one of our top-rated TRT clinics - but it isn't the only strong option. If the price, plan or state availability doesn't fit, these are the best alternatives, each with real lab testing and a licensed clinician.",
    providerOrder: ["tmates", "maleexcel", "taurus", "dudemeds", "fridays"],
    editorialSections: [
      {
        heading: "What is the best alternative to Hone Health?",
        body: `<p><strong><a href="/trt/reviews/tmates">TMates</a> is our top Hone Health alternative.</strong> It's a dedicated TRT-focused telehealth membership - testing-led, monitoring-heavy and built specifically around testosterone therapy rather than general men's health. <a href="/trt/reviews/maleexcel">Male Excel</a> is an established name with at-home labs and a choice of injections or cream, <a href="/trt/reviews/taurus">Taurus Meds</a> and <a href="/trt/reviews/dudemeds">DudeMeds</a> are strong value-focused options, and <a href="/trt/reviews/fridays">Fridays</a> rounds out the field. All keep the essentials Hone gets right - real bloodwork and a licensed clinician - intact. You can see how they stack up against each other on our <a href="/trt">full TRT clinic comparison</a>.</p>`,
      },
      {
        heading: "Why look for a Hone Health alternative?",
        body: `<p>Hone Health is a genuinely strong, testing-first clinic - so the reason to look elsewhere is usually fit, not quality. The most common reasons men compare alternatives:</p>`,
        bullets: [
          "Price - another clinic may line up better with your budget for the same essentials.",
          "State availability - online TRT access varies by state, so your top pick may not serve you.",
          "Treatment format - you may want a specific option like cream, or a plan built purely around TRT.",
          "Plan structure - some men prefer a leaner, no-frills membership; others want deeper monitoring.",
          "Simply wanting to compare before committing - which is exactly the right instinct.",
        ],
      },
      {
        heading: "How do Hone Health alternatives compare on price?",
        body: `<p>TRT pricing has two parts - an initial testing/diagnostic cost and an ongoing monthly or membership fee that covers the clinician, monitoring and medication - and clinics bundle them differently. Value-focused options like <a href="/trt/reviews/dudemeds">DudeMeds</a> and <a href="/trt/reviews/taurus">Taurus Meds</a> tend to price toward the affordable end, while membership-style clinics bundle in deeper monitoring for more. Compare the <strong>all-in monthly cost</strong> rather than the headline number, and confirm current pricing on each provider's own site. Our <a href="/trt/articles/trt-cost">TRT cost guide</a> shows exactly what to add up, and the <a href="/trt/cheapest-online-trt">cheapest online TRT</a> page ranks the best-value clinics.</p>`,
      },
      {
        heading: "What should a good Hone Health alternative still include?",
        body: `<p>Whatever clinic you pick, the safeguards should be identical to Hone's. A legitimate alternative always:</p>`,
        bullets: [
          "Confirms clinically low testosterone with real blood tests before treating.",
          "Has a licensed clinician review your results and direct treatment.",
          "Monitors you over time with follow-up bloodwork, not just a one-time script.",
          "Is transparent about pricing, plans and what's included.",
        ],
      },
      {
        heading: "Is Hone Health or an alternative better for me?",
        body: `<p>There's no single 'best' - it depends on your situation. Hone Health remains our top overall pick for its testing-first, physician-guided approach. But if it's unavailable in your state, priced above your budget, or doesn't offer the treatment format or plan you want, one of the alternatives above may fit you better while keeping the same core safeguards. The honest answer: compare two or three on all-in cost, state availability and what's included, then let a licensed clinician confirm whether TRT is right for you. See how each matches up head-to-head in our <a href="/trt/reviews">provider reviews</a>.</p>`,
      },
      {
        heading: "How we chose the best Hone Health alternatives",
        body: `<p>We ranked these clinics the same way we rank every provider: on the strength of their testing, licensed-clinician oversight, depth of ongoing monitoring, treatment options, pricing transparency and overall value - not on commission. Pricing and state availability change often, so treat details as approximate and confirm them on each provider's site. Compare the full field on our <a href="/trt">TRT clinic comparison</a>, check availability on <a href="/trt">Online TRT by State</a>, and read the full <a href="/trt/reviews">provider reviews</a>.</p><p><em>This page is general information, not medical advice. A licensed clinician should evaluate your bloodwork and symptoms and decide whether TRT is appropriate for you.</em></p>`,
      },
    ],
    updatedAt: UPDATED,
  },
];

export const TRT_QUIZ: QuizConfig = {
  welcomeTitle: "Find Your Best TRT Clinic Match",
  welcomeSubtitle:
    "Answer a few quick questions and we'll compare trusted online TRT providers based on your preferences, priorities and location.",
  welcomeTrustPoints: [
    "Takes less than 1 minute",
    "Personalized provider recommendations",
    "Completely free and confidential",
  ],
  welcomeCta: "Find My Match",
  midFlowMessage: "Great - we're narrowing down the best options for you.",
  pageTitle: "Find Your TRT Clinic Match",
  pageSubtitle:
    "Answer a few quick questions to help us compare providers based on your treatment preferences, budget and availability.",
  resultsTitle: "Your Best Match",
  resultsSubtitle:
    "Based on your answers, this provider is the strongest fit for your preferences.",
  resultsOthersTitle: "Other Providers You May Want to Consider",
  trustStrip: [
    "Updated Monthly",
    "Editorially Reviewed",
    "Independent Provider Comparison",
  ],
  loadingMessages: [
    "Comparing trusted providers...",
    "Reviewing treatment options...",
    "Finding your best match...",
    "Preparing your recommendation...",
  ],
  questions: [],
  providerProfiles: [],
};
