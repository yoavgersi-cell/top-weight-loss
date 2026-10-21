// ───── ED Treatment Cost Index ─────
// An original, citeable dataset of what ED treatment actually costs online in
// the US. Built to be a linkable reference asset: journalists and bloggers can
// cite a specific, sourced figure.
//
// HONESTY RULES (non-negotiable - this is YMYL and a citeable source):
//   - `basis: "verified"` = a figure a specific provider publishes, recorded
//     here as published. It can still change, so every row carries the
//     "confirm at checkout" caveat in the UI.
//   - `basis: "range"` = a representative US online-market range for a category
//     (e.g. generic sildenafil per dose). NOT a single provider's price and NOT
//     a precise claim - a compiled editorial estimate of the typical spread.
//   - No invented precision. Ranges are wide on purpose.
// Keep this file the single source of truth for the numbers on /ed/ed-cost-index.
// Ported from edtreatmenthub.com on Oct 21, 2026.

export type CostBasis = "verified" | "range";
export type CostCategory =
  | "Generic pill"
  | "Brand pill"
  | "Compounded (multi-ingredient)"
  | "Nasal spray"
  | "Injectable";

export interface CostEntry {
  /** Display name of the treatment or provider product. */
  name: string;
  category: CostCategory;
  /** Short format descriptor, e.g. "Oral tablet", "Dissolvable". */
  format: string;
  /** Headline price string exactly as shown, e.g. "$114/mo" or "$1-3/dose". */
  headline: string;
  /** Normalized approximate cost per MONTH in USD, for sorting/comparison.
   *  For per-dose items this assumes ~8 doses/month as a comparison basis. */
  perMonthLow: number;
  perMonthHigh: number;
  basis: CostBasis;
  /** Where the figure comes from, shown in the UI for transparency. */
  source: string;
  /** Internal link to the review/article, when we have one. */
  href?: string;
}

// Comparison assumption for normalizing per-dose prices to a monthly figure so
// everything sits on one axis. Stated openly in the methodology.
export const DOSES_PER_MONTH_BASIS = 8;

export const COST_INDEX_UPDATED = "2026-10-14";

export const COST_INDEX: CostEntry[] = [
  // ---- Generic pills (the cheap, proven baseline) ----
  {
    name: "Generic sildenafil (Viagra's active)",
    category: "Generic pill",
    format: "Oral tablet, as-needed",
    headline: "~$1-3 / dose",
    perMonthLow: 8,
    perMonthHigh: 24,
    basis: "range",
    source: "Representative US online-pharmacy range, Oct 2026",
    href: "/ed/articles/sildenafil-vs-cialis",
  },
  {
    name: "Generic tadalafil (Cialis's active), as-needed",
    category: "Generic pill",
    format: "Oral tablet, as-needed",
    headline: "~$1.50-3.50 / dose",
    perMonthLow: 12,
    perMonthHigh: 28,
    basis: "range",
    source: "Representative US online-pharmacy range, Oct 2026",
    href: "/ed/articles/sildenafil-vs-cialis",
  },
  {
    name: "Generic tadalafil, low daily dose",
    category: "Generic pill",
    format: "Oral tablet, daily",
    headline: "~$15-40 / mo",
    perMonthLow: 15,
    perMonthHigh: 40,
    basis: "range",
    source: "Representative US online subscription range, Oct 2026",
    href: "/ed/articles/best-ed-medicine",
  },
  {
    name: "DudeMeds (generic sildenafil / tadalafil)",
    category: "Generic pill",
    format: "Oral tablet",
    headline: "from $1.63 / tablet",
    perMonthLow: 13,
    perMonthHigh: 40,
    basis: "verified",
    source: "DudeMeds published starting price",
    href: "/ed/reviews/dudemeds",
  },
  // ---- Brand pills (the expensive reference point) ----
  {
    name: "Brand Viagra",
    category: "Brand pill",
    format: "Oral tablet",
    headline: "~$70-90+ / pill",
    perMonthLow: 560,
    perMonthHigh: 720,
    basis: "range",
    source: "Representative US brand list-price range, Oct 2026",
    href: "/ed/articles/alternatives-to-viagra-and-cialis",
  },
  {
    name: "Brand Cialis",
    category: "Brand pill",
    format: "Oral tablet",
    headline: "~$70-90+ / pill",
    perMonthLow: 560,
    perMonthHigh: 720,
    basis: "range",
    source: "Representative US brand list-price range, Oct 2026",
    href: "/ed/articles/alternatives-to-viagra-and-cialis",
  },
  // ---- Compounded multi-ingredient programs ----
  {
    name: "Quad by MEDVi (4-in-1 compounded)",
    category: "Compounded (multi-ingredient)",
    format: "Dissolvable",
    headline: "$114 / mo (from $179)",
    perMonthLow: 114,
    perMonthHigh: 179,
    basis: "verified",
    source: "MEDVi published starting price",
    href: "/ed/reviews/quad",
  },
  {
    name: "BraveRX (3-in-1 compounded)",
    category: "Compounded (multi-ingredient)",
    format: "Dissolving tablet",
    headline: "from ~$28 / week",
    perMonthLow: 112,
    perMonthHigh: 140,
    basis: "verified",
    source: "BraveRX published starting price (~$28/week)",
    href: "/ed/reviews/braverx",
  },
  {
    name: "Compounded 4-in-1 programs (category range)",
    category: "Compounded (multi-ingredient)",
    format: "Dissolvable",
    headline: "~$90-180 / mo",
    perMonthLow: 90,
    perMonthHigh: 180,
    basis: "range",
    source: "Representative US telehealth range, Oct 2026",
    href: "/ed/articles/best-4-in-1-ed-medication",
  },
  // ---- Nasal spray ----
  {
    name: "SHED - Roxus (intranasal vardenafil)",
    category: "Nasal spray",
    format: "Nasal spray",
    headline: "$99.50-199 / mo",
    perMonthLow: 99.5,
    perMonthHigh: 199,
    basis: "verified",
    source: "SHED published subscription pricing",
    href: "/ed/reviews/shed",
  },
  // ---- Injectable ----
  {
    name: "Trimix (compounded injection)",
    category: "Injectable",
    format: "Injection",
    headline: "~$1-6 / dose (varies widely)",
    perMonthLow: 20,
    perMonthHigh: 120,
    basis: "range",
    source: "Representative US compounding-clinic range, Oct 2026",
    href: "/ed/articles/trimix-for-ed",
  },
];

/** Cheapest and most expensive normalized monthly figures across the index. */
export function costIndexSpread(): { lowest: number; highest: number } {
  const lows = COST_INDEX.map((e) => e.perMonthLow);
  const highs = COST_INDEX.map((e) => e.perMonthHigh);
  return { lowest: Math.min(...lows), highest: Math.max(...highs) };
}
