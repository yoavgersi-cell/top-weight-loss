export interface TrustpilotReview {
  title: string;
  text: string;
  name: string;
  location: string;
  rating: number;
  date?: string; // e.g. "Aug 3, 2026" - shown on the review card when present
}

// Reusable expert-team member for the site's credibility (E-E-A-T) layer.
// Populate with REAL team members; only attach medical credentials to people
// who actually hold them.
export interface Expert {
  id: string;
  name: string;
  role: string;          // e.g. "Lead Health Researcher"
  credentials?: string;  // e.g. "PharmD", "MPH" - real credentials only
  bio: string;
  avatar?: string;       // image URL; falls back to initials when empty
  specialties?: string[];
}

// CMS-editable promo-popup control for a provider. When `enabled`, the
// provider's creative shows (mobile) on its comparison and review pages. This
// overrides the code-side default in @/lib/promo-popups; leaving it undefined
// falls back to that default (so Embody/TrimRx keep working with no CMS entry).
// The live countdown timer, when a creative has one, stays code-defined.
export interface ProviderPromoPopup {
  enabled: boolean;
  image?: string;
  alt?: string;
  priority?: number;
}

export interface Provider {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  smallLogo: string;
  sidebarImage?: string;
  highlights: string[];
  affiliateUrl: string;
  ctaText: string;
  excludedStates?: string[];
  trustpilotRating?: string;
  trustpilotReviewCount?: string;
  trustpilotReviews?: TrustpilotReview[];
  promoPopup?: ProviderPromoPopup;
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

// A single priced plan on a review page. `regularPrice` (optional) renders
// struck-through next to `price` to show an active discount.
export interface ReviewPricingPlan {
  name: string;
  medication: string;
  price: string;
  regularPrice?: string;
  unit?: string;
  cadence?: string;
  highlights?: string[];
}

// A step in the "How <provider> works" timeline on a review page.
export interface ReviewHowItWorksStep {
  timing?: string;
  title: string;
  detail?: string;
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
  updatedAt?: string;
  // Optional richer content, rendered only when present (back-compatible).
  pricingPlans?: ReviewPricingPlan[];
  howItWorks?: ReviewHowItWorksStep[];
  trustBadges?: string[];
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
  blockOrder?: string[];
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
  panelType?: "classic" | "chat";
  chatIntroMessage?: string;
  providerOrder?: string[];
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
  resultOverrides?: Record<string, string[]>;
  testimonials?: { text: string; name: string; state: string }[];
  loadingScreen?: {
    headline: string;
    supportingTexts: string[];
    providerLogos: string[];
    durationMs: number;
  };
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
  author?: string;
  sections: ArticleSection[];
  sidebarId?: string;
}

export interface BattleCategory {
  name: string;
  winner: "provider1" | "provider2" | "tie";
  explanation: string;
  supportingPoints: string[];
  // Legacy fields kept for backwards compat
  provider1Score?: number;
  provider2Score?: number;
  description?: string;
}

export interface BattleFeatureRow {
  feature: string;
  provider1Value: string;
  provider2Value: string;
  highlight?: "provider1" | "provider2" | "both" | "none";
}

export interface BattleData {
  slug: string;
  provider1Id: string;
  provider2Id: string;
  title: string;
  // Optional display order for the "X vs Y" label (breadcrumb, FAQ heading,
  // schema). Lets the visible matchup lead with a high-demand brand without
  // reordering provider1/provider2 (which drives the winner logic). Falls back
  // to `${p1.name} vs ${p2.name}` when unset.
  matchupLabel?: string;
  subtitle: string;
  description: string;
  intro: string;
  verdict: string;
  verdictWinnerPoints: string[];
  verdictLoserPoints: string[];
  winnerId: string;
  categories: BattleCategory[];
  features: BattleFeatureRow[];
  updatedAt?: string;
}

export interface SidebarBlock {
  type: "providers" | "quizCta" | "relatedArticles";
  enabled: boolean;
}

export interface SidebarQuizCta {
  headline: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
}

export interface SidebarConfigData {
  id: string;
  name: string;
  area: "homepage" | "articles" | "reviews" | "comparisons" | "custom";
  active: boolean;
  blocks: SidebarBlock[];
  providerIds: string[];
  quizCta: SidebarQuizCta;
  articleSlugs: string[];
}

export interface LandingEditorialSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface LandingPageData {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  h2: string;
  heroDescription: string;
  providerOrder: string[];
  editorialSections?: LandingEditorialSection[];
  updatedAt?: string;
}

// Stable fallback "last updated" date for schema when an item has no CMS
// updatedAt. Avoids emitting today's date on every request (fake freshness).
export const CONTENT_LAST_UPDATED = "2026-08-28";

// Floor date for battle, review and article pages: the shared page templates
// were last reworked on this date (quick answer, fit finder, accordions,
// Trustpilot/Reddit carousels, schema enrichment), so no page built from them
// can honestly claim an older "last updated". A per-item updatedAt still wins
// when it is newer. Bumped 2026-08-28: sources & methodology blocks, prose
// readability pass, licensed-badge rollout and the index-everything policy all
// landed site-wide since the previous floor.
export const TEMPLATES_LAST_UPDATED = "2026-08-28";

// ISO dates compare lexicographically - returns the newer of an item's own
// updatedAt and the template-wide floor above.
export const latestUpdate = (updatedAt?: string) =>
  updatedAt && updatedAt > TEMPLATES_LAST_UPDATED ? updatedAt : TEMPLATES_LAST_UPDATED;

// Human-readable month when the operator last verified provider-published
// pricing, plans and policies against each provider's own site. Shown in the
// "Sources & methodology" block ("Checked August 2026"). Bump this only when
// the data behind the comparisons is actually re-verified - it is a claim, not
// a render timestamp.
export const PROVIDER_DATA_CHECKED = "August 2026";

// ── Verticals ────────────────────────────────────────────────────────────────
// The hub (treatmentshub.com) is split into fully-separated verticals. Each one
// is an independent bundle: its own providers, reviews, comparisons, articles,
// ranking, and affiliate links, edited on its own tab in the CMS and stored in
// its own blob. Adding a vertical later is a single entry here - nothing else
// in the routing or CMS is hard-coded to a specific vertical.
//
// `id` doubles as the URL segment (treatmentshub.com/<id>/…) and the storage
// suffix. "weight-loss" is the default and stays on the original blob key for
// full back-compatibility with the existing (live) site.
export interface Vertical {
  id: string;
  name: string;
  tagline: string;
  accent: string;
}

export const VERTICALS: Vertical[] = [
  { id: "weight-loss", name: "Weight Loss", tagline: "GLP-1 injections, pills & telehealth weight-loss programs", accent: "#0C4B75" },
  { id: "hair-loss", name: "Hair Loss", tagline: "Finasteride, minoxidil & doctor-led hair regrowth", accent: "#6D4C2F" },
  { id: "trt", name: "TRT", tagline: "Testosterone replacement therapy, online", accent: "#1F5F5B" },
  { id: "hrt", name: "HRT", tagline: "Hormone replacement therapy for menopause & more", accent: "#7A3B6B" },
  { id: "hearing-aids", name: "Hearing Aids", tagline: "OTC hearing devices you can order online, compared", accent: "#1673B9" },
];

export const DEFAULT_VERTICAL = "weight-loss";
export const VERTICAL_IDS = VERTICALS.map((v) => v.id);
export const isVertical = (id: string): boolean => VERTICAL_IDS.includes(id);

// Verticals that are publicly launched: advertised as "live" on the hub, listed
// in the sitemap, and indexable. A vertical can have a full content skeleton
// (providers, comparisons, etc.) while still being unpublished - it renders for
// preview but stays out of the hub card, the sitemap, and the index until its
// affiliate data is filled in and it's added here. Add a vertical id to launch it.
export const PUBLISHED_VERTICALS = ["weight-loss", "hair-loss", "trt", "hrt", "hearing-aids"];
export const isPublishedVertical = (id: string): boolean => PUBLISHED_VERTICALS.includes(id);

// Providers we have an affiliate relationship with. Used to gate the product
// carousel/catalog and affiliate-only landing pages. NOTE: since Aug 2026 this
// list no longer gates indexing - all provider reviews are indexable
// (operator policy: impressions everywhere first, optimize what earns clicks).
export const AFFILIATE_PROVIDER_IDS = [
  "altrx",
  "embody",
  "trimrx",
  "medvi",
  "wellmedr",
  "shed",
  "directmeds",
  "healthrx",
  "sprout",
  // hair-loss
  "maximus",
  "happyhead",
  // trt (maximus already listed above)
  "hims",
  "dudemeds",
  "petermd",
  "maleexcel",
];

// Operator policy (Aug 2026): index everything that can honestly be indexed -
// impressions across all verticals first, optimize the pages that earn clicks.
// Only two kinds of pages stay in this list:
//   1. Pages whose numbers we never verified (the honesty rule beats the
//      index-everything rule) - flip them the day the data is verified.
//   2. Slugs that 301 away, kept here only so a blob-saved copy never
//      re-enters the sitemap.
export const NOINDEX_ARTICLE_SLUGS = [
  // Both carry detailed Noom plan prices ($17.42-$279/mo tiers) that were
  // never operator-verified - the only reason they're still parked. The other
  // Noom articles (best-noom-alternatives, noom-vs-glp1-providers) contain no
  // price claims and were indexed under the Aug 2026 index-everything policy.
  "noom-weight-loss-review",
  "noom-subscription-cost",
  // Consolidated: the generic "best telehealth providers" article 301s to the
  // ranking homepage, which owns that intent; the slug stays here so a
  // blob-saved copy never re-enters the sitemap.
  "best-weight-loss-telehealth-providers",
  // best-ozempic-alternatives was re-indexed (Aug 2026) under the same policy;
  // if /ozempic-alternatives (the landing page) slips for its query, suspect
  // cannibalization between the two and consider re-parking this article.
];

export interface SiteConfig {
  providers: Provider[];
  faqs: FaqItem[];
  reviews: ReviewData[];
  articles: ArticleData[];
  battles: BattleData[];
  landingPages: LandingPageData[];
  sidebars: SidebarConfigData[];
  quiz: QuizConfig;
  hero: HeroConfig;
  sidebar: SidebarConfig;
  ranking: RankingPageConfig;
  siteName: string;
  disclosureText: string;
  cardSocialProof?: {
    number: string;
    text: string;
  };
  reviewTestimonials?: { text: string; name: string; state: string }[];
  battleWinnerBannerImageDesktop?: string;
  battleWinnerBannerImageMobile?: string;
  experts?: Expert[];
}

// Code-authoritative hero text for the weight-loss homepage. Lives here (not
// only in the blob) because the h1 doubles as the page's meta title - it is
// the main lever for the "best telehealth weight loss / online GLP-1
// providers" query cluster, which GSC shows getting zero impressions on this
// page. The blob merge in config-store applies this over any CMS-saved hero.
export const WEIGHT_LOSS_HERO_TEXT = {
  updatedLabel: "Last Updated: August 2026",
  h1: "Best Weight Loss Injections & Telehealth Providers of 2026",
  h2: "The top online GLP-1 weight loss programs, ranked and verified",
  description:
    "Compare 2026's best telehealth weight loss providers and GLP-1 injection programs. Licensed online clinics with verified prices from $59/month semaglutide and $99/month tirzepatide - every price checked against the provider's own site.",
};

export const defaultConfig: SiteConfig = {
  siteName: "topweightloss.io",
  disclosureText:
    "Some providers featured on this site may compensate us. This may affect the order and placement of listings but does not influence our editorial ratings or reviews.",
  hero: {
    backgroundImageUrl: "/hero.png",
    imageAlt: "Weight loss medications",
    ...WEIGHT_LOSS_HERO_TEXT,
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
      "ALT RX - Physician-guided GLP-1 weight loss treatment",
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
  battles: [],
  landingPages: [],
  sidebars: [],
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
