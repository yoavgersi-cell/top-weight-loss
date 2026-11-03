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
  shipping: string;
  commitment: string;
  /** Verified Trustpilot record, or null when none is published. */
  trustpilot: { rating: string; count: string } | null;
};

export const PRICE_INDEX: PriceIndexRow[] = [
  {
    providerId: "wellmedr",
    edge: "Lowest ongoing price on the market - same price at every dose",
    semaglutide: { price: "$41", note: "pre-Black Friday sale (partner notice, Oct 28, 2026); 12-month plan; previously $49" },
    tirzepatide: { price: "$71", note: "pre-Black Friday sale (partner notice, Oct 28, 2026); shipped every 4 weeks; previously $89" },
    shipping: "Ships in 3-5 business days",
    commitment: "12-month plan for the lowest rate; cancel or change anytime",
    trustpilot: { rating: "4.6", count: "2,679" },
  },
  {
    providerId: "embody",
    edge: "Cheapest with no commitment - month to month, ships in 1-2 days",
    semaglutide: { price: "$49", note: "pre-Black Friday sale (seen Oct 28, 2026); reg. $79; month-to-month" },
    tirzepatide: { price: "$99", note: "pre-Black Friday sale (seen Oct 28, 2026); reg. $129; month-to-month" },
    shipping: "Ships in 1-2 days, cold-chain",
    commitment: "None - month to month, cancel anytime",
    trustpilot: { rating: "3.8", count: "10,689" },
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
    trustpilot: { rating: "4.3", count: "15,097" },
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
    trustpilot: { rating: "4.6", count: "16,390" },
  },
  {
    providerId: "sprout",
    edge: "Compounded plans plus a brand-name Wegovy option",
    semaglutide: { price: "$149", note: "starting price" },
    tirzepatide: { price: "$199", note: "starting price" },
    shipping: "Prescription shipped within 2 days",
    commitment: "See provider site for plan terms",
    trustpilot: { rating: "4.1", count: "188" },
  },
  {
    providerId: "trimrx",
    edge: "Custom dosing with unlimited provider check-ins",
    semaglutide: { price: "$149", note: "same price at every dose; $140 discount applied" },
    tirzepatide: { price: "$259", note: "per month" },
    shipping: "Free tracked delivery, often next-day",
    commitment: "None - month to month",
    trustpilot: { rating: "3.4", count: "4,931" },
  },
  {
    providerId: "shed",
    edge: "Coaching included and a 5%-in-120-days money-back guarantee",
    semaglutide: { price: "$199", note: "20% off month one" },
    tirzepatide: { price: "$299", note: "20% off month one" },
    shipping: "Home delivery included",
    commitment: "None - HSA/FSA approved",
    trustpilot: { rating: "4.6", count: "1,134" },
  },
];

// Date of the last operator verification pass over the index above. Bump it
// whenever a row is re-checked or changed - the statistics page prints it as
// the dataset's "verified as of" date and emits it as schema dateModified.
export const PRICE_INDEX_VERIFIED = "2026-10-16";

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
export function priceValue(cell: PriceCell): number | null {
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
