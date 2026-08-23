// ───── The verified GLP-1 price index ─────
// One registry, real published prices only - the single source of truth for
// the price-first switcher pages (/cheapest-glp1, /switch-from-ozempic).
// Every figure here is a provider-published price or a Trustpilot record we
// have verified; never add a row or edit a number from memory or estimation.
// Sorted by semaglutide price ascending - the order IS the editorial answer.

export type PriceCell = {
  /** Headline monthly figure, e.g. "$59" or "from $179". */
  price: string;
  /** The honest condition attached to that figure - promo, plan, cadence. */
  note: string;
} | null; // null = the provider doesn't publish this medication

export type PriceIndexRow = {
  providerId: string;
  /** The one-line edge - why this row exists in the index. */
  edge: string;
  semaglutide: PriceCell;
  tirzepatide: PriceCell;
  shipping: string;
  commitment: string;
  /** Verified Trustpilot record, or null when none is published. */
  trustpilot: { rating: string; count: string } | null;
};

export const PRICE_INDEX: PriceIndexRow[] = [
  {
    providerId: "wellmedr",
    edge: "Lowest ongoing price on the market - same price at every dose",
    semaglutide: { price: "$59", note: "12-month plan; locked for life" },
    tirzepatide: { price: "$99", note: "shipped every 4 weeks" },
    shipping: "Ships in 3-5 business days",
    commitment: "12-month plan for the lowest rate; cancel or change anytime",
    trustpilot: { rating: "4.7", count: "1,205" },
  },
  {
    providerId: "embody",
    edge: "Cheapest with no commitment - month to month, ships in 1-2 days",
    semaglutide: { price: "$69", note: "reg. $79; month-to-month" },
    tirzepatide: { price: "$119", note: "reg. $129; month-to-month" },
    shipping: "Ships in 1-2 days, cold-chain",
    commitment: "None - month to month, cancel anytime",
    trustpilot: { rating: "3.8", count: "4,956" },
  },
  {
    providerId: "altrx",
    edge: "Flat pricing at every dose, plus a real brand-name shelf",
    semaglutide: { price: "$89", note: "reg. $199; flat at every dose" },
    tirzepatide: { price: "$149", note: "reg. $299; flat at every dose" },
    shipping: "Free shipping in 5-7 days",
    commitment: "None - pause or cancel anytime; Buy Now, Pay Later",
    trustpilot: null,
  },
  {
    providerId: "medvi",
    edge: "All-inclusive care: visits, dietician and coaching in the price",
    semaglutide: { price: "$99", note: "promo; reg. $199 - all-inclusive" },
    tirzepatide: { price: "$166", note: "promo; reg. $299" },
    shipping: "Free shipping",
    commitment: "None - no membership or hidden fees; HSA/FSA",
    trustpilot: { rating: "4.4", count: "14,372" },
  },
  {
    providerId: "healthrx",
    edge: "All-in prepaid year with overnight cold-chain delivery",
    semaglutide: { price: "$99", note: "12-mo prepaid - $1,188 at checkout" },
    tirzepatide: { price: "from $179", note: "per month" },
    shipping: "Overnight cold-chain shipping",
    commitment: "12-month prepaid plan",
    trustpilot: null,
  },
  {
    providerId: "directmeds",
    edge: "One flat price for both medications - injections or drops",
    semaglutide: { price: "$147", note: "flat at every dose" },
    tirzepatide: { price: "$147", note: "flat at every dose" },
    shipping: "Free 1-2 day shipping",
    commitment: "None - no membership, cancel anytime",
    trustpilot: { rating: "4.6", count: "13,901" },
  },
  {
    providerId: "sprout",
    edge: "Compounded plans plus a brand-name Wegovy option",
    semaglutide: { price: "$149", note: "starting price" },
    tirzepatide: { price: "$199", note: "starting price" },
    shipping: "Prescription shipped within 2 days",
    commitment: "See provider site for plan terms",
    trustpilot: null,
  },
  {
    providerId: "trimrx",
    edge: "Custom dosing with unlimited provider check-ins",
    semaglutide: { price: "$179", note: "first month; reg. $299" },
    tirzepatide: { price: "$259", note: "per month" },
    shipping: "Free tracked delivery, often next-day",
    commitment: "None - month to month",
    trustpilot: { rating: "3.6", count: "5,497" },
  },
  {
    providerId: "shed",
    edge: "Coaching included and a 5%-in-120-days money-back guarantee",
    semaglutide: { price: "$199", note: "20% off month one" },
    tirzepatide: { price: "$299", note: "20% off month one" },
    shipping: "Home delivery included",
    commitment: "None - HSA/FSA approved",
    trustpilot: { rating: "4.7", count: "1,120" },
  },
];

// Brand-name list prices actually published on our providers' brand shelves -
// used for the brand-vs-compounded math. Real figures only.
export const BRAND_SHELF: { drug: string; ingredient: string; price: string; soldAt: string }[] = [
  { drug: "Ozempic", ingredient: "Semaglutide", price: "$1,149-$1,399/mo", soldAt: "altRx $1,149 · wellmedr $1,399" },
  { drug: "Zepbound", ingredient: "Tirzepatide", price: "$1,249-$1,599/mo", soldAt: "altRx $1,249 · wellmedr $1,599" },
  { drug: "Wegovy", ingredient: "Semaglutide", price: "$1,579-$1,799/mo", soldAt: "altRx $1,579 · Sprout $1,799" },
];
