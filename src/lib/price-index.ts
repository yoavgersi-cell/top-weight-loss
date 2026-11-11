// ───── The verified GLP-1 price index ─────
// One registry, real published prices only - the single source of truth for
// the price-first switcher pages (/cheapest-glp1, /switch-from-ozempic).
// Every figure here is a provider-published price or a Trustpilot record we
// have verified; never add a row or edit a number from memory or estimation.
// Sorted by semaglutide price ascending - the order IS the editorial answer.

export type PriceCell = {
  /** Headline monthly figure, e.g. "$49" or "from $179". */
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
  /**
   * A single published "plans from" price, used when the provider's page
   * does not tie its starting price to one medication. Set it with both
   * medication cells null; the row then reads "Plans from $X" and stays out
   * of the per-medication price ranges (the figure can't be attributed).
   */
  plan?: { price: string; note: string };
  shipping: string;
  commitment: string;
  /** Verified Trustpilot record, or null when none is published. */
  trustpilot: { rating: string; count: string } | null;
};

// Rows below: operator check of each provider's own site, November 3, 2026.
export const PRICE_INDEX: PriceIndexRow[] = [
  {
    providerId: "wellmedr",
    edge: "Lowest ongoing price on the market - same price at every dose",
    semaglutide: { price: "$41", note: "pre-Black Friday sale (shown on welludr's site, Nov 3, 2026); 12-month plan; previously $49" },
    tirzepatide: { price: "$71", note: "pre-Black Friday sale (shown on welludr's site, Nov 3, 2026); shipped every 4 weeks; previously $89" },
    shipping: "Ships in 3-5 business days",
    commitment: "12-month plan for the lowest rate; cancel or change anytime",
    trustpilot: { rating: "4.6", count: "2,679" },
  },
  {
    providerId: "embody",
    edge: "Cheapest with no commitment - month to month, ships in 1-2 days",
    semaglutide: { price: "$49", note: "sale price, flat month to month; site shows a countdown to a price increase (Nov 3, 2026)" },
    tirzepatide: { price: "$99", note: "sale price, flat month to month" },
    shipping: "Ships in 1-2 days, cold-chain",
    commitment: "None - month to month, cancel anytime",
    trustpilot: { rating: "3.8", count: "10,689" },
  },
  {
    providerId: "altrx",
    edge: "Low starting prices, plus a real brand-name shelf",
    semaglutide: { price: "from $89", note: "starting price" },
    tirzepatide: { price: "from $149", note: "starting price" },
    shipping: "Free shipping in 5-7 days",
    commitment: "None - pause or cancel anytime; Buy Now, Pay Later",
    trustpilot: null,
  },
  {
    providerId: "healthrx",
    edge: "Lowest rates on a 12-month plan, with overnight cold-chain delivery",
    semaglutide: { price: "from $97", note: "12-month plan; $99 first month on the monthly plan; 3-month $125, 6-month $115" },
    tirzepatide: { price: "from $177", note: "12-month plan; $99 first month on the monthly plan; 3-month $201, 6-month $195" },
    shipping: "Overnight cold-chain shipping",
    commitment: "12-month plan for the lowest rate; monthly, 3- and 6-month plans also offered",
    trustpilot: null,
  },
  {
    providerId: "collective",
    edge: "Lowest tirzepatide price we track, flat at every dose, with a $199/year membership instead of a markup",
    semaglutide: { price: "$59", note: "same price at every dose; plus $199/year membership (21-day free trial)" },
    tirzepatide: { price: "$69", note: "same price at every dose; plus $199/year membership (21-day free trial)" },
    shipping: "2-day express cold shipping included; most orders within 7 days of the medical review",
    commitment: "Month to month, no multi-month orders, cancel anytime; membership billed annually after the trial",
    trustpilot: null,
  },
  {
    providerId: "eden",
    edge: "One flat price every month and at every dose, with 24/7 human support",
    semaglutide: { price: "$99", note: "flat every month, same price at every dose" },
    tirzepatide: { price: "$129", note: "flat every month, same price at every dose" },
    shipping: "Shipping time not published - confirm at checkout",
    commitment: "None - no membership, no annual or long-term plan",
    trustpilot: { rating: "4.5", count: "5,019" },
  },
  {
    providerId: "sprout",
    edge: "Same price at any dose, with 12-, 6- and 3-month plans below the monthly rate",
    semaglutide: { price: "from $99", note: "12-month plan, $1,188 billed upfront; monthly $149, no commitment" },
    tirzepatide: { price: "from $149", note: "12-month plan, $1,788 billed upfront; monthly $199, no commitment" },
    shipping: "Prescription shipped within 2 days",
    commitment: "No membership fee; monthly option with no commitment; plans renew until cancelled",
    trustpilot: { rating: "4.1", count: "188" },
  },
  {
    providerId: "medvi",
    edge: "All-inclusive care: visits, dietician and coaching in the price",
    semaglutide: null,
    tirzepatide: null,
    plan: { price: "from $99", note: "\"start for just $99\"; no membership or hidden fees; dietician visits and care coaching included" },
    shipping: "Free shipping",
    commitment: "None - no membership or hidden fees; HSA/FSA",
    trustpilot: { rating: "4.3", count: "15,097" },
  },
  {
    providerId: "directmeds",
    edge: "Same price at every dose, delivered in 1-2 days",
    semaglutide: null,
    tirzepatide: null,
    plan: { price: "from $147", note: "starting price; same price at every dose" },
    shipping: "Free shipping, arrives in 1-2 days",
    commitment: "None - no membership, cancel anytime",
    trustpilot: { rating: "4.6", count: "16,390" },
  },
  {
    providerId: "trimrx",
    edge: "Custom dosing with unlimited provider check-ins",
    semaglutide: null,
    tirzepatide: null,
    plan: { price: "from $149", note: "weight loss plans starting at $149" },
    shipping: "Free tracked delivery, often next-day",
    commitment: "Month to month - cancel before your next billing cycle",
    trustpilot: { rating: "3.4", count: "4,894" },
  },
  {
    providerId: "bmimd",
    edge: "Same price at every dose; fully refundable if you're not eligible",
    semaglutide: { price: "$149", note: "3-month plan ($447); limited-time price" },
    tirzepatide: { price: "$159", note: "3-month plan ($477); limited-time price" },
    shipping: "Free shipping on subscription orders",
    commitment: "3-month plan shown; 12-, 6- and 1-month plans also offered",
    trustpilot: { rating: "4.4", count: "870" },
  },
  {
    providerId: "shed",
    edge: "Coaching included and a 5%-in-120-days money-back guarantee",
    semaglutide: { price: "from $199", note: "starting price" },
    tirzepatide: { price: "from $299", note: "starting price" },
    shipping: "Home delivery included",
    commitment: "None - HSA/FSA approved",
    trustpilot: { rating: "4.6", count: "1,134" },
  },
];

// Date of the last operator verification pass over the index above. Bump it
// whenever a row is re-checked or changed - the statistics page prints it as
// the dataset's "verified as of" date and emits it as schema dateModified.
export const PRICE_INDEX_VERIFIED = "2026-11-03";

// ───── Public change log ─────
// One entry per operator-verified change, newest first, describing what our
// listing said before and after. Only add an entry when the underlying row
// actually changed after verification - this log is the citable record behind
// the GLP-1 price tracker page, its RSS feed (/glp1-price-changes.xml) and its
// CSV download (/glp1-price-changes.csv).
//
// `moves` is the machine-readable half of the entry: the before and after
// headline monthly price per medication, copied from the same verified figures
// the `change` sentence states. Leave `moves` out when only a condition moved
// (a promotion extended, plan terms reworded) - the entry then reads as a
// terms change, never as an invented price move. `from: null` = a medication
// newly listed. `source` names where the new figure was read.
//
// Adding a change (the whole workflow): update the row in PRICE_INDEX above,
// add one entry here with its date, `change`, `moves` and `source`, and bump
// PRICE_INDEX_VERIFIED. Every page, the feed and the CSV update from that.
export type PriceMove = {
  drug: "semaglutide" | "tirzepatide";
  /** Previous listed headline monthly price in USD; null when newly listed. */
  from: number | null;
  /** New listed headline monthly price in USD. */
  to: number;
  /** Condition attached to the new figure, as the provider states it. */
  condition?: string;
};

export type PriceChange = {
  date: string;
  providerId: string;
  change: string;
  moves?: PriceMove[];
  source?: string;
};

export const PRICE_CHANGELOG: PriceChange[] = [
  {
    date: "2026-11-11",
    providerId: "collective",
    change:
      "Newly listed. Compounded semaglutide $59/month and tirzepatide $69/month, the same price at every dose, month to month with no multi-month orders. A $199 annual membership (billed yearly, 21-day free trial) covers unlimited doctor messaging, check-ins and 2-day express cold shipping; averaged over a year it adds about $16.58 a month.",
    moves: [
      { drug: "semaglutide", from: null, to: 59, condition: "plus $199/year membership after a 21-day free trial" },
      { drug: "tirzepatide", from: null, to: 69, condition: "plus $199/year membership after a 21-day free trial" },
    ],
    source: "collective.org homepage and FAQ, November 11, 2026",
  },
  {
    date: "2026-11-03",
    providerId: "sprout",
    change:
      "Lowest listed price now on the 12-month plan: compounded semaglutide from $99/month and tirzepatide from $149/month, billed upfront ($1,188 and $1,788 for 52 weeks). Previously listed from $149 and $199, which remain Sprout's monthly, no-commitment prices. 6- and 3-month plans sit in between (semaglutide $110 and $125, tirzepatide $160 and $180); same price at any dose.",
    moves: [
      { drug: "semaglutide", from: 149, to: 99, condition: "12-month plan, $1,188 billed upfront" },
      { drug: "tirzepatide", from: 199, to: 149, condition: "12-month plan, $1,788 billed upfront" },
    ],
    source: "Sprout website, November 3, 2026",
  },
  {
    date: "2026-11-03",
    providerId: "healthrx",
    change:
      "Lowest listed rates now from $97/month for compounded semaglutide (previously $99, listed as a 12-month prepaid plan) and from $177/month for tirzepatide (previously from $179), both on the 12-month plan. The monthly plan is $99 for the first month; 3- and 6-month plans are also offered (semaglutide $125 and $115, tirzepatide $201 and $195).",
    moves: [
      { drug: "semaglutide", from: 99, to: 97, condition: "12-month plan" },
      { drug: "tirzepatide", from: 179, to: 177, condition: "12-month plan" },
    ],
    source: "HealthRx website, November 3, 2026",
  },
  {
    date: "2026-11-03",
    providerId: "eden",
    change:
      "Added to the tracker: compounded semaglutide $99/month and tirzepatide $129/month, the same price every month and at every dose, with no membership and no annual or long-term plan.",
    moves: [
      { drug: "semaglutide", from: null, to: 99, condition: "flat every month, same price at every dose" },
      { drug: "tirzepatide", from: null, to: 129, condition: "flat every month, same price at every dose" },
    ],
    source: "Eden website, checked November 3, 2026",
  },
  {
    date: "2026-11-03",
    providerId: "bmimd",
    change:
      "Added to the tracker at its 3-month plan price, shown as a limited-time price: compounded semaglutide $149/month ($447 for 3 months) and tirzepatide $159/month ($477), the same price at every dose. Prices for the 12-, 6- and 1-month plans were not captured.",
    moves: [
      { drug: "semaglutide", from: null, to: 149, condition: "3-month plan; limited-time price" },
      { drug: "tirzepatide", from: null, to: 159, condition: "3-month plan; limited-time price" },
    ],
    source: "bmiMD website, November 3, 2026",
  },
  {
    date: "2026-11-03",
    providerId: "trimrx",
    change:
      "Listing now shows TrimRx's published \"plans starting at $149\". Its site does not show a separate tirzepatide price, so the $259/month tirzepatide figure from our earlier check is no longer listed.",
    source: "TrimRx website, November 3, 2026",
  },
  {
    date: "2026-11-03",
    providerId: "medvi",
    change:
      "Listing now shows Medvi's published \"start for just $99\", with no membership or hidden fees and dietician visits and coaching included. Its page does not show a separate tirzepatide price, so the $166/month promotional tirzepatide figure from our earlier check is no longer listed.",
    source: "Medvi website, November 3, 2026",
  },
  {
    date: "2026-11-03",
    providerId: "directmeds",
    change:
      "Listing now shows DirectMeds' published \"starting at $147\", the same price at every dose. Its page does not tie the price to one medication, so we no longer list $147 separately for semaglutide and tirzepatide.",
    source: "DirectMeds website, November 3, 2026",
  },
  {
    date: "2026-10-28",
    providerId: "wellmedr",
    change:
      "Pre-Black Friday sale: compounded semaglutide now listed from $41/month (previously $49) and tirzepatide from $71/month (previously $89) on the 12-month plan, the same price at every dose, per welludr's partner pricing notice of October 28; the provider says the rate holds for the immediate future with no end date stated.",
    moves: [
      { drug: "semaglutide", from: 49, to: 41, condition: "12-month plan, same price at every dose" },
      { drug: "tirzepatide", from: 89, to: 71, condition: "12-month plan, same price at every dose" },
    ],
    source: "welludr partner pricing notice, October 28, 2026",
  },
  {
    date: "2026-10-28",
    providerId: "embody",
    change:
      "Pre-Black Friday sale: compounded semaglutide now listed at $49/month (previously $69) and tirzepatide at $99/month (previously $119), month to month with no commitment, per the banner on embody's site. Published regular prices remain $79 and $129; no end date is stated.",
    moves: [
      { drug: "semaglutide", from: 69, to: 49, condition: "month to month, no commitment" },
      { drug: "tirzepatide", from: 119, to: 99, condition: "month to month, no commitment" },
    ],
    source: "Sale banner on embody's website, October 28, 2026",
  },
  {
    date: "2026-09-21",
    providerId: "altrx",
    change:
      "Promotional $89/month semaglutide and $149/month tirzepatide rates extended: provider now lists the sale as ending September 25 (previously September 20). Prices unchanged.",
    source: "altRx website, September 21, 2026",
  },
  {
    date: "2026-09-15",
    providerId: "trimrx",
    change:
      "Compounded semaglutide now listed at $149/month, the same price at every dose ($140 discount applied). Previously listed as $179 for the first month and $299 regular thereafter. Tirzepatide unchanged at $259/month.",
    moves: [
      { drug: "semaglutide", from: 179, to: 149, condition: "same price at every dose; previously $179 first month, $299 thereafter" },
    ],
    source: "TrimRx website, September 15, 2026",
  },
  {
    date: "2026-09-14",
    providerId: "altrx",
    change:
      "Promotional $89/month semaglutide and $149/month tirzepatide rates confirmed; provider lists the sale as ending September 20. Regular rates remain $199 and $299.",
    source: "altRx website, September 14, 2026",
  },
  {
    date: "2026-09-14",
    providerId: "wellmedr",
    change:
      "Compounded semaglutide now listed at $49/month on the 12-month plan (previously listed $59) and tirzepatide at $89/month (previously $99). Same price at every dose.",
    moves: [
      { drug: "semaglutide", from: 59, to: 49, condition: "12-month plan, same price at every dose" },
      { drug: "tirzepatide", from: 99, to: 89, condition: "12-month plan, same price at every dose" },
    ],
    source: "welludr website, September 14, 2026",
  },
];

// ───── Derived values (no new data - computed from the records above) ─────

/** Numeric monthly price from a cell ("$49", "from $179" → 49, 179). */
export function priceValue(cell: PriceCell | { price: string; note: string } | undefined): number | null {
  const m = cell?.price.match(/\$([\d,]+)/);
  return m ? Number(m[1].replace(/,/g, "")) : null;
}

/** Stable anchor for a log entry - the feed and CSV link to it. */
export const changeId = (c: PriceChange) => `${c.date}-${c.providerId}`;

export type ChangeKind = "cut" | "increase" | "mixed" | "new" | "terms";

/** What kind of change an entry records, read from its moves. */
export function changeKind(c: PriceChange): ChangeKind {
  const moves = c.moves ?? [];
  if (moves.length === 0) return "terms";
  if (moves.every((m) => m.from === null)) return "new";
  const priced = moves.filter((m): m is PriceMove & { from: number } => m.from !== null);
  const down = priced.some((m) => m.to < m.from);
  const up = priced.some((m) => m.to > m.from);
  if (down && up) return "mixed";
  if (up) return "increase";
  if (down) return "cut";
  return "terms";
}

export const CHANGE_KIND_LABEL: Record<ChangeKind, string> = {
  cut: "Price cut",
  increase: "Price increase",
  mixed: "Price change",
  new: "New listing",
  terms: "Terms change",
};

/** Percent change of a move, rounded; null for a new listing. */
export const movePercent = (m: PriceMove) => (m.from ? Math.round(((m.to - m.from) / m.from) * 100) : null);

/** The change log, newest first (ties keep their written order). */
export const PRICE_CHANGES_NEWEST: PriceChange[] = [...PRICE_CHANGELOG].sort((a, b) => b.date.localeCompare(a.date));

/** When the price data last changed: the later of the verification pass and the newest log entry. */
export const PRICE_DATA_UPDATED: string = [PRICE_INDEX_VERIFIED, PRICE_CHANGES_NEWEST[0]?.date ?? ""].sort().at(-1)!;

// Brand-name list prices actually published on our providers' brand shelves -
// used for the brand-vs-compounded math. Real figures only.
export const BRAND_SHELF: { drug: string; ingredient: string; price: string; soldAt: string }[] = [
  { drug: "Ozempic", ingredient: "Semaglutide", price: "$1,149-$1,399/mo", soldAt: "altRx $1,149 · welludr $1,399" },
  { drug: "Zepbound", ingredient: "Tirzepatide", price: "$1,249-$1,599/mo", soldAt: "altRx $1,249 · welludr $1,599" },
  { drug: "Wegovy", ingredient: "Semaglutide", price: "$1,579-$1,799/mo", soldAt: "altRx $1,579 · Sprout $1,799" },
];
