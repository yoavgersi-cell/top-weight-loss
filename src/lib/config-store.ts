import { put, list } from "@vercel/blob";
import { type SiteConfig, type ReviewData, type ArticleData, defaultConfig } from "./config";
import productsJson from "@/data/products.json";
import faqsJson from "@/data/faqs.json";
import { articles as defaultArticlesData } from "@/data/articles";

const BLOB_KEY = "site-config.json";

const defaultReviews: ReviewData[] = [
  {
    slug: "altrx",
    providerId: "altrx",
    shortSummary: "Leading GLP-1 medication access platform with physician-guided treatment plans and transparent pricing.",
    reviewIntro: "ALT RX has emerged as one of the top providers for GLP-1 weight loss medication access. Their platform connects patients with licensed physicians who evaluate eligibility and prescribe FDA-approved treatments like semaglutide and tirzepatide. With a focus on transparency and patient care, ALT RX makes medical weight loss accessible without the traditional barriers of in-person visits.",
    keyFeatures: [
      "Access to semaglutide and tirzepatide medications",
      "Licensed physician consultations included",
      "Transparent pricing with no hidden fees",
      "Convenient home delivery of medications",
      "Ongoing provider support and monitoring"
    ],
    pricingSummary: "Plans start at competitive monthly rates with medication included. No long-term contracts required. Free initial consultation and medical evaluation.",
    treatmentOptions: [
      "Semaglutide (compounded)",
      "Tirzepatide (compounded)",
      "Oral GLP-1 medications",
      "Combination therapy programs"
    ],
    pros: [
      "Comprehensive GLP-1 medication options",
      "Physician-guided treatment from start to finish",
      "No long-term commitment required",
      "Transparent pricing with medication included",
      "Fast home delivery nationwide"
    ],
    cons: [
      "Only available in select states",
      "No in-person clinic visits",
      "May not be covered by insurance"
    ],
    bestFor: [
      "Adults seeking GLP-1 medication access",
      "Those who prefer telehealth convenience",
      "People looking for transparent, all-inclusive pricing"
    ],
    finalVerdict: "ALT RX stands out as a top-tier GLP-1 weight loss provider thanks to its physician-guided approach, transparent pricing, and comprehensive medication options. If you are looking for a reliable telehealth platform to access GLP-1 treatments without long-term commitments, ALT RX is an excellent choice."
  },
  {
    slug: "noom",
    providerId: "noom",
    shortSummary: "Behavior-based weight loss platform combining psychology-driven coaching with optional medical support.",
    reviewIntro: "Noom takes a unique approach to weight loss by combining cognitive behavioral therapy principles with personalized coaching and, more recently, medical weight loss options. Their app-based platform has helped millions build sustainable habits while offering GLP-1 medication access for eligible patients through their Noom Med program.",
    keyFeatures: [
      "Psychology-based behavior change curriculum",
      "Personal coaching and group support",
      "Noom Med for GLP-1 medication access",
      "Food logging with color-coded system",
      "Progress tracking and daily lessons"
    ],
    pricingSummary: "Noom offers monthly and annual subscription plans. Noom Med, which includes medication access, is priced separately with medication costs included in the subscription.",
    treatmentOptions: [
      "Behavior change coaching program",
      "Noom Med (GLP-1 medications)",
      "Personalized meal planning",
      "Exercise and activity guidance"
    ],
    pros: [
      "Evidence-based behavioral approach",
      "Comprehensive app with daily engagement",
      "Option to add medical weight loss",
      "Large community and support network",
      "Builds long-term healthy habits"
    ],
    cons: [
      "Can feel time-intensive with daily lessons",
      "Medication program costs extra",
      "Results depend heavily on user engagement"
    ],
    bestFor: [
      "People who want to change their relationship with food",
      "Those who benefit from coaching and accountability",
      "Anyone looking for a holistic approach combining behavior and medication"
    ],
    finalVerdict: "Noom is ideal for people who want more than just medication — it is a comprehensive behavior-change platform that addresses the psychological side of weight loss. With the addition of Noom Med, it now offers a complete solution that combines habit building with medical treatment options."
  },
  {
    slug: "ro",
    providerId: "ro",
    shortSummary: "Established telehealth platform offering straightforward online weight loss care with licensed providers.",
    reviewIntro: "Ro has built a strong reputation as a trusted telehealth provider, and their weight loss program continues that tradition. The platform offers a streamlined process for consulting with licensed providers, getting prescribed weight loss medications, and receiving ongoing support — all from the comfort of home.",
    keyFeatures: [
      "Board-certified provider consultations",
      "Multiple GLP-1 medication options",
      "Integrated pharmacy with home delivery",
      "Ongoing care and dosage adjustments",
      "Simple online enrollment process"
    ],
    pricingSummary: "Ro offers competitive monthly pricing that includes provider consultations and medication. No insurance required, though some plans may be FSA/HSA eligible.",
    treatmentOptions: [
      "Compounded semaglutide",
      "Brand-name GLP-1 medications",
      "Metabolic support supplements",
      "Provider-guided treatment adjustments"
    ],
    pros: [
      "Established and trusted telehealth brand",
      "Simple, user-friendly platform",
      "In-house pharmacy for reliable delivery",
      "Licensed providers review every case",
      "No long-term contracts"
    ],
    cons: [
      "Limited to telehealth — no in-person options",
      "Wait times can vary during peak periods",
      "Not available in all states"
    ],
    bestFor: [
      "Those who value a trusted, established telehealth brand",
      "People who want a simple and efficient process",
      "Adults seeking provider-supervised GLP-1 treatment"
    ],
    finalVerdict: "Ro delivers a polished and reliable telehealth weight loss experience. Their established reputation, integrated pharmacy, and licensed providers make it a solid choice for anyone looking for straightforward medical weight loss care online."
  },
  {
    slug: "trimrx",
    providerId: "trimrx",
    shortSummary: "Budget-friendly GLP-1 access with flexible treatment plans and clinical guidance included.",
    reviewIntro: "TrimRX has positioned itself as one of the most affordable options for GLP-1 weight loss treatment. Their platform focuses on making prescription weight loss medications accessible to more people by offering competitive pricing, flexible plans, and ongoing clinical support without the premium price tag.",
    keyFeatures: [
      "Competitive monthly pricing",
      "Flexible treatment plan options",
      "Clinical guidance throughout treatment",
      "Home delivery of medications",
      "No long-term commitment required"
    ],
    pricingSummary: "TrimRX offers some of the most competitive pricing in the GLP-1 space. Monthly plans include medication, provider consultations, and ongoing support. Discounts available for multi-month commitments.",
    treatmentOptions: [
      "Compounded semaglutide",
      "Compounded tirzepatide",
      "Customized dosing schedules",
      "Combination approaches"
    ],
    pros: [
      "Among the most affordable GLP-1 options",
      "Flexible plans without long-term contracts",
      "Ongoing clinical guidance included",
      "Fast and reliable home delivery",
      "Straightforward enrollment process"
    ],
    cons: [
      "Newer platform with less brand recognition",
      "Fewer medication options than some competitors",
      "Limited support hours"
    ],
    bestFor: [
      "Budget-conscious individuals seeking GLP-1 treatment",
      "Those who want flexibility without long-term commitments",
      "People looking for affordable medical weight loss"
    ],
    finalVerdict: "TrimRX is a strong choice for anyone who wants access to GLP-1 medications without paying premium prices. While they may not have the brand recognition of larger competitors, their affordable pricing and flexible plans make medical weight loss accessible to a broader audience."
  },
  {
    slug: "shed",
    providerId: "shed",
    shortSummary: "Personalized weight loss programs with coaching, medication options, and convenient home delivery.",
    reviewIntro: "Shed takes a personalized approach to weight loss, creating customized treatment plans based on each individual's health profile, goals, and preferences. Their platform combines provider-guided medication options with coaching support and convenient home delivery to create a well-rounded weight loss experience.",
    keyFeatures: [
      "Personalized treatment recommendations",
      "Coaching and behavioral support",
      "Multiple medication options available",
      "Convenient home delivery",
      "Progress tracking tools"
    ],
    pricingSummary: "Shed offers tiered pricing based on the level of support and medication selected. All plans include provider consultations and home delivery of medications.",
    treatmentOptions: [
      "GLP-1 receptor agonists",
      "Personalized medication combinations",
      "Lifestyle coaching programs",
      "Nutritional guidance"
    ],
    pros: [
      "Highly personalized treatment plans",
      "Combines medication with coaching support",
      "Convenient home delivery included",
      "Responsive customer support team",
      "Flexible plan options"
    ],
    cons: [
      "Pricing can be higher for premium tiers",
      "Personalization process takes longer initially",
      "Limited availability in some regions"
    ],
    bestFor: [
      "People who want a tailored weight loss approach",
      "Those who benefit from coaching alongside medication",
      "Anyone seeking a comprehensive, personalized program"
    ],
    finalVerdict: "Shed excels at creating personalized weight loss experiences that go beyond just prescribing medication. If you value a tailored approach with coaching support and are willing to invest in a comprehensive program, Shed is a strong contender."
  },
  {
    slug: "embody",
    providerId: "embody",
    shortSummary: "Doctor-led weight loss solutions with thorough medical evaluations and ongoing provider monitoring.",
    reviewIntro: "Embody takes a medically rigorous approach to weight loss, with board-certified doctors leading every aspect of treatment. Their platform emphasizes thorough medical evaluations, evidence-based treatment protocols, and ongoing monitoring to ensure safe and effective results.",
    keyFeatures: [
      "Board-certified doctor-led treatment",
      "Comprehensive medical evaluations",
      "Evidence-based treatment protocols",
      "Ongoing provider monitoring",
      "Access to prescription medications"
    ],
    pricingSummary: "Embody pricing includes medical evaluation, provider consultations, and medication. Plans are structured monthly with no hidden fees or long-term commitments required.",
    treatmentOptions: [
      "GLP-1 medications (semaglutide, tirzepatide)",
      "Medical evaluation and health screening",
      "Ongoing dosage optimization",
      "Provider-monitored treatment adjustments"
    ],
    pros: [
      "Doctor-led with thorough medical oversight",
      "Comprehensive health evaluations",
      "Evidence-based treatment approach",
      "Ongoing monitoring for safety",
      "Transparent pricing structure"
    ],
    cons: [
      "Higher price point than budget options",
      "Evaluation process can take longer",
      "Fewer lifestyle support resources"
    ],
    bestFor: [
      "People who prioritize medical oversight and safety",
      "Those with complex health histories",
      "Anyone who wants doctor-led treatment from start to finish"
    ],
    finalVerdict: "Embody is the right choice for individuals who want their weight loss journey led by qualified doctors with thorough medical oversight. While it may cost more than budget alternatives, the level of medical care and monitoring provides added peace of mind."
  },
  {
    slug: "wellmedr",
    providerId: "wellmedr",
    shortSummary: "Long-term weight management platform focused on sustainable results with clinical guidance throughout.",
    reviewIntro: "WellMedR differentiates itself by focusing on long-term weight management rather than quick fixes. Their platform provides continuous clinical guidance, progress tracking, and medication management designed to help patients achieve and maintain their weight loss goals over time.",
    keyFeatures: [
      "Long-term weight management focus",
      "Continuous clinical guidance",
      "Progress tracking and analytics",
      "Medication management and adjustments",
      "Maintenance phase support"
    ],
    pricingSummary: "WellMedR offers monthly plans with medication and clinical support included. Longer-term commitments may come with discounted rates to encourage sustained engagement.",
    treatmentOptions: [
      "GLP-1 medications",
      "Long-term maintenance protocols",
      "Progressive dosing strategies",
      "Lifestyle modification guidance"
    ],
    pros: [
      "Strong focus on long-term results",
      "Continuous clinical guidance",
      "Good progress tracking tools",
      "Maintenance phase included",
      "Sustainable approach to weight loss"
    ],
    cons: [
      "Less suited for those wanting quick results",
      "Smaller provider network",
      "Fewer medication options than top competitors"
    ],
    bestFor: [
      "People committed to long-term weight management",
      "Those who have struggled with weight regain",
      "Anyone seeking sustainable, medically-guided weight loss"
    ],
    finalVerdict: "WellMedR is an excellent option for individuals who are serious about long-term weight management. Their focus on sustainability, maintenance support, and ongoing clinical guidance sets them apart from providers that only address the initial weight loss phase."
  },
  {
    slug: "sunlight",
    providerId: "sunlight",
    shortSummary: "Flexible telehealth weight loss care with virtual consultations and individualized treatment plans.",
    reviewIntro: "Sunlight offers a flexible telehealth approach to weight loss, providing virtual consultations with licensed providers and individualized treatment plans. Their platform is designed for convenience, allowing patients to access care on their own schedule while receiving personalized attention.",
    keyFeatures: [
      "Virtual consultations with licensed providers",
      "Individualized treatment plans",
      "Flexible scheduling options",
      "Home delivery of medications",
      "Follow-up care and adjustments"
    ],
    pricingSummary: "Sunlight offers straightforward monthly pricing that includes virtual consultations, medication, and follow-up care. No hidden fees or long-term contracts.",
    treatmentOptions: [
      "GLP-1 receptor agonist medications",
      "Individualized dosing protocols",
      "Virtual follow-up consultations",
      "Treatment plan adjustments as needed"
    ],
    pros: [
      "Convenient and flexible scheduling",
      "Personalized treatment approach",
      "No long-term contracts required",
      "Responsive provider team",
      "Straightforward pricing"
    ],
    cons: [
      "Smaller provider network",
      "Less brand recognition than larger competitors",
      "Limited additional resources beyond medication"
    ],
    bestFor: [
      "Busy professionals who need flexible scheduling",
      "Those who prefer personalized telehealth care",
      "People looking for convenient, no-contract weight loss treatment"
    ],
    finalVerdict: "Sunlight is a solid telehealth option for people who value flexibility and personalized care. While they may not have the brand recognition of industry giants, their individualized approach and convenient scheduling make them a worthwhile consideration."
  },
  {
    slug: "medvi",
    providerId: "medvi",
    shortSummary: "Streamlined medical weight loss platform with prescription-based treatment and provider support.",
    reviewIntro: "Medvi focuses on making medical weight loss simple and accessible through a streamlined online platform. They offer prescription-based treatments with provider support throughout the process, making it easy for patients to get started and stay on track with their weight loss goals.",
    keyFeatures: [
      "Streamlined online enrollment",
      "Prescription-based treatment options",
      "Provider support throughout treatment",
      "Home delivery of medications",
      "Regular check-ins and monitoring"
    ],
    pricingSummary: "Medvi offers competitive monthly plans that include medication, provider consultations, and ongoing support. Pricing is transparent with no surprise charges.",
    treatmentOptions: [
      "Prescription GLP-1 medications",
      "Provider-guided treatment plans",
      "Dosage adjustments as needed",
      "Follow-up consultations"
    ],
    pros: [
      "Simple and easy enrollment process",
      "Transparent pricing",
      "Provider support included",
      "Reliable home delivery",
      "Regular monitoring and check-ins"
    ],
    cons: [
      "Fewer medication options",
      "Limited lifestyle support resources",
      "Newer platform with fewer reviews"
    ],
    bestFor: [
      "People who want a simple, straightforward process",
      "Those new to medical weight loss",
      "Anyone looking for an easy-to-use online platform"
    ],
    finalVerdict: "Medvi is a good choice for people who want a no-fuss medical weight loss experience. Their streamlined process and transparent pricing remove many of the barriers that can make starting a weight loss program feel overwhelming."
  },
  {
    slug: "sprout",
    providerId: "sprout",
    shortSummary: "Metabolic health-focused weight loss platform with customized treatment recommendations and lifestyle support.",
    reviewIntro: "Sprout takes a metabolic health-first approach to weight loss, focusing on understanding each patient's unique metabolic profile before recommending treatment. Their platform combines provider-guided medication options with lifestyle improvement strategies for a holistic approach to weight management.",
    keyFeatures: [
      "Metabolic health assessment",
      "Customized treatment recommendations",
      "Provider-guided medication options",
      "Lifestyle improvement strategies",
      "Long-term wellness focus"
    ],
    pricingSummary: "Sprout offers monthly plans that include metabolic assessment, provider consultations, and medication. Pricing varies based on the treatment plan selected.",
    treatmentOptions: [
      "GLP-1 medications",
      "Metabolic health optimization",
      "Lifestyle modification programs",
      "Nutritional guidance and support"
    ],
    pros: [
      "Unique metabolic health focus",
      "Customized treatment approach",
      "Combines medication with lifestyle changes",
      "Provider-guided throughout",
      "Focus on overall wellness"
    ],
    cons: [
      "Smaller platform with limited reviews",
      "May not be available in all states",
      "Higher starting price for comprehensive plans"
    ],
    bestFor: [
      "People interested in understanding their metabolic health",
      "Those who want a holistic approach to weight loss",
      "Anyone seeking long-term wellness improvement beyond just weight"
    ],
    finalVerdict: "Sprout stands out with its metabolic health-first approach, making it a compelling option for people who want to understand the science behind their weight loss journey. If you value a holistic approach that goes beyond just medication, Sprout is worth considering."
  }
];

function buildInitialConfig(): SiteConfig {
  return {
    ...defaultConfig,
    providers: productsJson.map((p) => ({
      id: p.id,
      name: p.name,
      tagline: p.tagline,
      logo: p.logo,
      smallLogo: `/logos/${p.id}-icon.svg`,
      highlights: p.highlights,
      affiliateUrl: p.affiliateUrl,
      ctaText: p.ctaText,
    })),
    ranking: {
      providerOrder: ["altrx", "noom", "ro", "trimrx", "shed", "embody", "wellmedr", "sunlight", "medvi", "sprout"],
      positions: [
        { score: 9.8, starRating: 5, label: "Exceptional", badge: "Our Most Popular" },
        { score: 9.6, starRating: 5, label: "Excellent" },
        { score: 9.5, starRating: 5, label: "Excellent" },
        { score: 9.4, starRating: 5, label: "Excellent" },
        { score: 9.3, starRating: 5, label: "Excellent" },
        { score: 9.1, starRating: 4, label: "Excellent" },
        { score: 8.9, starRating: 4, label: "Very Good" },
        { score: 8.7, starRating: 4, label: "Very Good" },
        { score: 8.5, starRating: 4, label: "Very Good" },
        { score: 8.4, starRating: 4, label: "Very Good" },
      ],
    },
    faqs: faqsJson,
    reviews: defaultReviews,
    articles: defaultArticlesData,
    quiz: {
      welcomeTitle: "Find Your Best Weight Loss Provider Match",
      welcomeSubtitle: "Answer a few quick questions and we'll compare trusted weight loss providers based on your goals, preferences, and location.",
      welcomeTrustPoints: ["Takes less than 1 minute", "Personalized provider recommendations", "Completely free"],
      welcomeCta: "Find My Match",
      midFlowMessage: "Great, we're narrowing down the best options for you.",
      pageTitle: "Find Your Weight Loss Provider Match",
      pageSubtitle: "Answer a few quick questions to help us compare providers based on your goals, treatment preferences, and availability in your area.",
      resultsTitle: "Your Best Match",
      resultsSubtitle: "Based on your answers, this provider is the strongest fit for your goals and preferences.",
      resultsOthersTitle: "Other Providers You May Want to Consider",
      trustStrip: ["Updated Monthly", "Editorially Reviewed", "Independent Provider Comparison"],
      loadingMessages: ["Comparing trusted providers...", "Reviewing treatment options...", "Finding your best match...", "Preparing your recommendation..."],
      questions: [
        {
          id: "goal",
          title: "What is your main weight loss goal?",
          subtitle: "We'll use your answer to recommend the right level of support.",
          type: "cards" as const,
          options: [
            { label: "Lose up to 20 lbs", value: "light" },
            { label: "Lose 20–50 lbs", value: "moderate" },
            { label: "Lose more than 50 lbs", value: "significant" },
            { label: "I'm still exploring my options", value: "exploring" },
          ],
        },
        {
          id: "experience",
          title: "Have you used prescription weight loss treatment before?",
          subtitle: "This helps us personalize your recommendations.",
          type: "cards" as const,
          options: [
            { label: "Yes, I have used treatment before", value: "yes" },
            { label: "No, this would be my first time", value: "no" },
            { label: "I'm not sure", value: "unsure" },
          ],
        },
        {
          id: "priority",
          title: "What matters most when choosing a provider?",
          subtitle: "We'll match you with providers that align with your priorities.",
          type: "cards" as const,
          options: [
            { label: "Lower monthly cost", value: "cost" },
            { label: "Licensed medical support", value: "medical" },
            { label: "Convenient online care", value: "online" },
            { label: "Personalized treatment plan", value: "personalized" },
          ],
        },
        {
          id: "state",
          title: "Where are you located?",
          subtitle: "Provider availability may vary by location.",
          type: "dropdown" as const,
          options: [
            { label: "Alabama", value: "AL" }, { label: "Alaska", value: "AK" }, { label: "Arizona", value: "AZ" },
            { label: "Arkansas", value: "AR" }, { label: "California", value: "CA" }, { label: "Colorado", value: "CO" },
            { label: "Connecticut", value: "CT" }, { label: "Delaware", value: "DE" }, { label: "Florida", value: "FL" },
            { label: "Georgia", value: "GA" }, { label: "Hawaii", value: "HI" }, { label: "Idaho", value: "ID" },
            { label: "Illinois", value: "IL" }, { label: "Indiana", value: "IN" }, { label: "Iowa", value: "IA" },
            { label: "Kansas", value: "KS" }, { label: "Kentucky", value: "KY" }, { label: "Louisiana", value: "LA" },
            { label: "Maine", value: "ME" }, { label: "Maryland", value: "MD" }, { label: "Massachusetts", value: "MA" },
            { label: "Michigan", value: "MI" }, { label: "Minnesota", value: "MN" }, { label: "Mississippi", value: "MS" },
            { label: "Missouri", value: "MO" }, { label: "Montana", value: "MT" }, { label: "Nebraska", value: "NE" },
            { label: "Nevada", value: "NV" }, { label: "New Hampshire", value: "NH" }, { label: "New Jersey", value: "NJ" },
            { label: "New Mexico", value: "NM" }, { label: "New York", value: "NY" }, { label: "North Carolina", value: "NC" },
            { label: "North Dakota", value: "ND" }, { label: "Ohio", value: "OH" }, { label: "Oklahoma", value: "OK" },
            { label: "Oregon", value: "OR" }, { label: "Pennsylvania", value: "PA" }, { label: "Rhode Island", value: "RI" },
            { label: "South Carolina", value: "SC" }, { label: "South Dakota", value: "SD" }, { label: "Tennessee", value: "TN" },
            { label: "Texas", value: "TX" }, { label: "Utah", value: "UT" }, { label: "Vermont", value: "VT" },
            { label: "Virginia", value: "VA" }, { label: "Washington", value: "WA" }, { label: "West Virginia", value: "WV" },
            { label: "Wisconsin", value: "WI" }, { label: "Wyoming", value: "WY" }, { label: "Washington D.C.", value: "DC" },
          ],
        },
      ],
      providerProfiles: [
        { providerId: "altrx", priceLevel: "mid", strengths: ["medical", "online", "personalized"], matchReasons: { cost: "Transparent all-inclusive pricing", medical: "Physician-guided treatment plans", online: "Full telehealth platform", personalized: "Customized GLP-1 protocols" } },
        { providerId: "noom", priceLevel: "mid", strengths: ["personalized", "medical"], matchReasons: { cost: "Flexible subscription options", medical: "Noom Med clinical program", online: "App-based convenience", personalized: "Psychology-based coaching" } },
        { providerId: "ro", priceLevel: "mid", strengths: ["online", "medical"], matchReasons: { cost: "Competitive monthly pricing", medical: "Board-certified providers", online: "Streamlined telehealth experience", personalized: "Provider-guided adjustments" } },
        { providerId: "trimrx", priceLevel: "low", strengths: ["cost", "online"], matchReasons: { cost: "Among the most affordable options", medical: "Clinical guidance included", online: "Simple online enrollment", personalized: "Flexible treatment plans" } },
        { providerId: "shed", priceLevel: "mid", strengths: ["personalized", "online"], matchReasons: { cost: "Competitive plan pricing", medical: "Provider-supervised treatment", online: "Home delivery included", personalized: "Highly personalized programs" } },
      ],
    },
  };
}

export async function getConfig(): Promise<SiteConfig> {
  try {
    const { blobs } = await list({ prefix: BLOB_KEY });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url, { cache: "no-store" });
      if (res.ok) {
        const saved = (await res.json()) as Partial<SiteConfig>;
        const initial = buildInitialConfig();
        // Merge smallLogo into saved providers that don't have it
        const providers = (saved.providers || initial.providers).map((p) => ({
          ...p,
          smallLogo: p.smallLogo || `/logos/${p.id}-icon.svg`,
        }));
        return {
          ...initial,
          ...saved,
          providers,
          ranking: saved.ranking && saved.ranking.providerOrder && saved.ranking.providerOrder.length > 0 ? saved.ranking : initial.ranking,
          reviews: saved.reviews && saved.reviews.length > 0 ? saved.reviews : initial.reviews,
          articles: saved.articles && saved.articles.length > 0 ? saved.articles : initial.articles,
          quiz: saved.quiz && saved.quiz.questions && saved.quiz.questions.length > 0 ? saved.quiz : initial.quiz,
        };
      }
    }
  } catch {
    // fall through to default
  }
  return buildInitialConfig();
}

export async function saveConfig(config: SiteConfig): Promise<void> {
  await put(BLOB_KEY, JSON.stringify(config, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}
