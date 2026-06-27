export interface Provider {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  smallLogo: string;
  highlights: string[];
  affiliateUrl: string;
  ctaText: string;
}

export interface RankingPosition {
  score: number;
  starRating: number;
  label: string;
  badge?: string;
}

export interface RankingPageConfig {
  providerOrder: string[];
  positions: RankingPosition[];
}

export interface ReviewData {
  slug: string;
  providerId: string;
  shortSummary: string;
  reviewIntro: string;
  keyFeatures: string[];
  pricingSummary: string;
  treatmentOptions: string[];
  pros: string[];
  cons: string[];
  bestFor: string[];
  finalVerdict: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface HeroConfig {
  backgroundImageUrl: string;
  imageAlt: string;
  updatedLabel: string;
  h1: string;
  h2: string;
  description: string;
}

export interface SidebarConfig {
  socialProofNumber: string;
  socialProofText: string;
  secureTitle: string;
  secureText: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
  featuredImageLink: string;
}

export interface QuizOption {
  label: string;
  value: string;
}

export interface QuizQuestion {
  id: string;
  title: string;
  subtitle: string;
  type: "cards" | "dropdown";
  options: QuizOption[];
}

export interface QuizProviderProfile {
  providerId: string;
  priceLevel: "low" | "mid" | "high";
  strengths: string[];
  matchReasons: Record<string, string>;
}

export interface QuizConfig {
  welcomeTitle: string;
  welcomeSubtitle: string;
  welcomeTrustPoints: string[];
  welcomeCta: string;
  midFlowMessage: string;
  pageTitle: string;
  pageSubtitle: string;
  questions: QuizQuestion[];
  providerProfiles: QuizProviderProfile[];
  resultsTitle: string;
  resultsSubtitle: string;
  resultsOthersTitle: string;
  trustStrip: string[];
  loadingMessages: string[];
}

export interface ArticleSection {
  heading: string;
  body: string;
}

export interface ArticleData {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  heroColor: string;
  sections: ArticleSection[];
}

export interface SiteConfig {
  providers: Provider[];
  faqs: FaqItem[];
  reviews: ReviewData[];
  articles: ArticleData[];
  quiz: QuizConfig;
  hero: HeroConfig;
  sidebar: SidebarConfig;
  ranking: RankingPageConfig;
  siteName: string;
  disclosureText: string;
}

export const defaultConfig: SiteConfig = {
  siteName: "topweightloss.io",
  disclosureText:
    "Some providers featured on this site may compensate us. This may affect the order and placement of listings but does not influence our editorial ratings or reviews.",
  hero: {
    backgroundImageUrl: "/hero.png",
    imageAlt: "Weight loss medications",
    updatedLabel: "Last Updated: June 2026",
    h1: "Top Weight Loss Programs 2026",
    h2: "Compare leading weight loss providers",
    description:
      "Review costs, treatment options and provider details to find the right weight loss solution for your goals.",
  },
  sidebar: {
    socialProofNumber: "18,400+",
    socialProofText:
      "people compared weight loss programs on our platform this month.",
    secureTitle: "Secure & Confidential",
    secureText:
      "All providers featured on our platform use secure systems to protect your personal information.",
    featuredImageUrl: "/sidebar-featured.png",
    featuredImageAlt:
      "ALT RX — Physician-guided GLP-1 weight loss treatment",
    featuredImageLink: "#",
  },
  ranking: {
    providerOrder: [],
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
  providers: [],
  faqs: [],
  reviews: [],
  articles: [],
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
    questions: [],
    providerProfiles: [],
  },
};
