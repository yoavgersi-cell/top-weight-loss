// ───── ED price index ─────
// The verified record of what the ED telehealth providers we rank publish as
// their prices, read on each provider's own website. Same rules as the GLP-1
// index (src/lib/price-index.ts):
//   - Every figure is one the provider publishes, recorded as published, with
//     the condition attached to it. No estimates, no "typical" ranges here
//     (those live in ed-cost-index.ts, labelled as ranges).
//   - A provider that publishes no price gets null cells, not a guess. The
//     ticker and the price ranges simply skip it.
//   - ED prices come in two shapes, per dose and per month, so every cell
//     carries its unit; nothing is converted silently. Where we do arithmetic
//     (a 2-month supply divided by two) the note says so.
//   - `verifiedAt` is per row because two rows could not be re-checked on the
//     index date and keep their earlier verification date.
// This file feeds the ED price ticker, the tracker page (/ed/ed-price-changes),
// its RSS feed and its CSV downloads.

export type EdUnit = "dose" | "month";

export type EdPriceCell = {
  /** Headline figure as published, e.g. "$22" or "$8.78". */
  price: string;
  unit: EdUnit;
  /** The honest condition attached to that figure. */
  note: string;
} | null;

export type EdListedProduct = {
  name: string;
  price: string;
  /** "dose", "month" or a literal cadence the provider uses, e.g. "2-month supply". */
  unit: string;
  note?: string;
};

export type EdPriceIndexRow = {
  providerId: string;
  /** The one-line edge - why this row exists in the index. */
  edge: string;
  /** Lowest listed generic sildenafil or tadalafil price. */
  generic: EdPriceCell;
  /** Lowest listed compounded or non-pill program price. */
  compounded: EdPriceCell;
  /** Every figure the provider lists, as listed. */
  products: EdListedProduct[];
  shipping: string;
  commitment: string;
  /** When this row was last read on the provider's site. */
  verifiedAt: string;
  source: string;
};

// Rows below: read on each provider's own site on November 11, 2026 (headless
// browser capture of the public pages), except where `verifiedAt` says
// otherwise. Order here is irrelevant; pages sort by the ED ranking.
export const ED_PRICE_INDEX: EdPriceIndexRow[] = [
  {
    providerId: "hims",
    edge: "Lowest listed monthly entry price for generic sildenafil and tadalafil",
    generic: { price: "$22", unit: "month", note: "Generic for Viagra (sildenafil) starting price; generic for Cialis (tadalafil) from $24. Actual price depends on product and subscription plan" },
    compounded: { price: "$30", unit: "month", note: "Sildenafil chews, tadalafil chews and 3-in-1 Hard Mints starting price; compounded products are not FDA-approved" },
    products: [
      { name: "Generic for Viagra (sildenafil)", price: "$22", unit: "month", note: "starting at" },
      { name: "Generic for Cialis (tadalafil)", price: "$24", unit: "month", note: "starting at" },
      { name: "Sildenafil Chews", price: "$30", unit: "month", note: "starting at; compounded" },
      { name: "Tadalafil Chews", price: "$30", unit: "month", note: "starting at; compounded" },
      { name: "3-in-1 Hard Mints", price: "$30", unit: "month", note: "starting at; compounded" },
      { name: "3-in-1 Pill", price: "$35", unit: "month", note: "starting at; compounded" },
      { name: "Sex Rx 2-in-1 (with hair, testosterone-support, multivitamin or Vitality Pro add-on)", price: "$35", unit: "month", note: "starting at" },
      { name: "Sex Rx + Climax Control", price: "$39", unit: "month", note: "starting at" },
    ],
    shipping: "Free discreet shipping",
    commitment: "Subscription plans; the site states the actual price depends on the product and plan purchased",
    verifiedAt: "2026-11-11",
    source: "hims.com/erectile-dysfunction, November 11, 2026",
  },
  {
    providerId: "rexmd",
    edge: "Per-dose pricing on generics, with brand-name Viagra and Cialis also listed",
    generic: { price: "$2", unit: "dose", note: "Generic Viagra (sildenafil) and daily generic Cialis 'from $2 per use' during the Black Friday sale ('save up to 95%'); generic Cialis (tadalafil) from $6 per use" },
    compounded: null,
    products: [
      { name: "Generic Viagra (sildenafil)", price: "$2", unit: "dose", note: "from; Black Friday sale price" },
      { name: "Daily Generic Cialis (tadalafil)", price: "$2", unit: "dose", note: "from; Black Friday sale price" },
      { name: "Generic Cialis (tadalafil)", price: "$6", unit: "dose", note: "from" },
      { name: "Branded Cialis", price: "$29", unit: "dose", note: "from" },
      { name: "Branded Viagra", price: "$96", unit: "dose", note: "from" },
    ],
    shipping: "Shipped to your door; shipping terms shown at checkout",
    commitment: "Subscription billing; refills recur automatically (see our review)",
    verifiedAt: "2026-11-11",
    source: "rexmd.com medication pages, November 11, 2026",
  },
  {
    providerId: "braverx",
    edge: "Compounded multi-ingredient sublingual formulas from $79 a month",
    generic: null,
    compounded: { price: "$79", unit: "month", note: "Surge Max (tadalafil + sildenafil + apomorphine), sublingual, starting price; compounded, not FDA-approved" },
    products: [
      { name: "Surge Max (tadalafil + sildenafil + apomorphine)", price: "$79", unit: "month", note: "from" },
      { name: "Prime Max Core (tadalafil + sildenafil)", price: "$99", unit: "month", note: "from" },
      { name: "Surge Daily Core (tadalafil + apomorphine)", price: "$106", unit: "month", note: "from; daily use" },
      { name: "Surge Daily Pro (tadalafil + apomorphine + icariin)", price: "$119", unit: "month", note: "from; daily use" },
      { name: "Prime Max Pro (tadalafil + vardenafil + apomorphine + L-citrulline)", price: "$139", unit: "month", note: "from" },
    ],
    shipping: "Free shipping on orders over $50",
    commitment: "Monthly plans; $20 off the first order offered on the site",
    verifiedAt: "2026-11-11",
    source: "braverx.com, November 11, 2026",
  },
  {
    providerId: "shed",
    edge: "Roxus nasal spray plus sublingual and daily tadalafil options through its Mavrox platform",
    generic: { price: "$49.67", unit: "month", note: "Tadalafix (daily tadalafil) 'from $49.67/month'" },
    compounded: { price: "$99.50", unit: "month", note: "Roxus intranasal vardenafil at $199 per 2-month supply (our per-month arithmetic); $100 off the first 2-month supply with a code through November 30, 2026" },
    products: [
      { name: "Roxus (intranasal vardenafil)", price: "$199", unit: "2-month supply", note: "$100 off the first 2-month supply with code, ends Nov 30, 2026" },
      { name: "Performax (sublingual)", price: "$66.33", unit: "month", note: "from" },
      { name: "Tadalafix (daily tadalafil)", price: "$49.67", unit: "month", note: "from" },
      { name: "Xtend", price: "$33", unit: "month", note: "starting at" },
    ],
    shipping: "Not stated on the pages we captured",
    commitment: "Not stated on the pages we captured; confirm at checkout",
    verifiedAt: "2026-11-11",
    source: "mavrox.com product pages (SHED's men's health platform), November 11, 2026",
  },
  {
    providerId: "directmeds",
    edge: "Per-dose pricing on DirectMax, a compounded sublingual",
    generic: null,
    compounded: { price: "$8.78", unit: "dose", note: "DirectMax (sublingual sildenafil + tadalafil + apomorphine), low strength; medium $9.28 and high $10.78 per dose; sold in 6-dose packs, up to 20 doses; promotions from $7.45 per dose" },
    products: [
      { name: "DirectMax, low strength", price: "$8.78", unit: "dose" },
      { name: "DirectMax, medium strength", price: "$9.28", unit: "dose" },
      { name: "DirectMax, high strength", price: "$10.78", unit: "dose" },
    ],
    shipping: "Delivery preference affects the price; shown before checkout",
    commitment: "Pack-based (6 to 20 doses); your exact total is shown after the medical questionnaire, before checkout",
    verifiedAt: "2026-11-11",
    source: "directmeds.com/solutions/sexual-health, November 11, 2026",
  },
  {
    providerId: "quad",
    edge: "4-in-1 compounded program at a flat monthly price",
    generic: null,
    compounded: { price: "$114", unit: "month", note: "Quad 4-in-1 compounded program, from $179 regular; verified October 14, 2026 (medvi.com could not be reached for a re-check on November 11)" },
    products: [{ name: "Quad 4-in-1 (compounded)", price: "$114", unit: "month", note: "from $179 regular" }],
    shipping: "See our Quad review",
    commitment: "Monthly telehealth plan",
    verifiedAt: "2026-10-14",
    source: "MEDVi published starting price, October 14, 2026 (ED cost index)",
  },
  {
    providerId: "dudemeds",
    edge: "Price shown per state before the health intake",
    generic: { price: "$1.63", unit: "dose", note: "Generic sildenafil / tadalafil starting price as verified October 14, 2026; on November 11 the site shows prices only after you choose your state" },
    compounded: null,
    products: [{ name: "Generic sildenafil / tadalafil", price: "$1.63", unit: "dose", note: "from; verified Oct 14, 2026" }],
    shipping: "Shown with the price once you choose your state",
    commitment: "Shown with the price once you choose your state",
    verifiedAt: "2026-10-14",
    source: "DudeMeds published starting price, October 14, 2026 (ED cost index); dudemeds.com/pricing re-checked November 11, 2026",
  },
  {
    providerId: "petermd",
    edge: "No public ED price on the pages we could reach",
    generic: null,
    compounded: null,
    products: [],
    shipping: "Not published",
    commitment: "Not published",
    verifiedAt: "2026-11-11",
    source: "petermd.com could not be reached from our checker on November 11, 2026; no figure listed",
  },
];

// Date of the last verification pass over the index above.
export const ED_PRICE_INDEX_VERIFIED = "2026-11-11";

// ───── Public change log ─────
export type EdPriceMove = {
  product: string;
  unit: EdUnit;
  /** Previous listed price in USD; null when newly listed. */
  from: number | null;
  to: number;
  condition?: string;
};

export type EdPriceChange = {
  date: string;
  providerId: string;
  change: string;
  moves?: EdPriceMove[];
  source?: string;
};

export const ED_PRICE_CHANGELOG: EdPriceChange[] = [
  {
    date: "2026-11-11",
    providerId: "hims",
    change: "Newly listed. Generic for Viagra from $22/month and generic for Cialis from $24/month; chews and 3-in-1 Hard Mints from $30/month; 3-in-1 pill and Sex Rx 2-in-1 from $35/month. The site states the actual price depends on the product and subscription plan.",
    moves: [
      { product: "Generic for Viagra (sildenafil)", unit: "month", from: null, to: 22, condition: "starting price; depends on subscription plan" },
      { product: "Generic for Cialis (tadalafil)", unit: "month", from: null, to: 24, condition: "starting price; depends on subscription plan" },
      { product: "3-in-1 Hard Mints (compounded)", unit: "month", from: null, to: 30, condition: "starting price" },
    ],
    source: "hims.com/erectile-dysfunction, November 11, 2026",
  },
  {
    date: "2026-11-11",
    providerId: "rexmd",
    change: "Newly listed. Generic Viagra and daily generic Cialis from $2 per use during the Black Friday sale; generic Cialis from $6 per use; branded Cialis from $29 and branded Viagra from $96 per use.",
    moves: [
      { product: "Generic Viagra (sildenafil)", unit: "dose", from: null, to: 2, condition: "Black Friday sale price" },
      { product: "Generic Cialis (tadalafil)", unit: "dose", from: null, to: 6 },
    ],
    source: "rexmd.com medication pages, November 11, 2026",
  },
  {
    date: "2026-11-11",
    providerId: "braverx",
    change: "Newly listed. Surge Max from $79/month, Prime Max Core from $99, Surge Daily Core from $106, Surge Daily Pro from $119 and Prime Max Pro from $139/month.",
    moves: [{ product: "Surge Max (tadalafil + sildenafil + apomorphine)", unit: "month", from: null, to: 79, condition: "starting price" }],
    source: "braverx.com, November 11, 2026",
  },
  {
    date: "2026-11-11",
    providerId: "shed",
    change: "Newly listed. Roxus nasal spray at $199 per 2-month supply (about $99.50 a month), with $100 off the first supply through November 30; Performax from $66.33/month, Tadalafix from $49.67/month and Xtend from $33/month on SHED's Mavrox platform.",
    moves: [
      { product: "Tadalafix (daily tadalafil)", unit: "month", from: null, to: 49.67, condition: "starting price" },
      { product: "Roxus (intranasal vardenafil)", unit: "month", from: null, to: 99.5, condition: "$199 per 2-month supply, divided by two" },
    ],
    source: "mavrox.com, November 11, 2026",
  },
  {
    date: "2026-11-11",
    providerId: "directmeds",
    change: "Newly listed. DirectMax sublingual at $8.78 (low), $9.28 (medium) and $10.78 (high strength) per dose in 6- to 20-dose packs; promotions from $7.45 per dose.",
    moves: [{ product: "DirectMax, low strength", unit: "dose", from: null, to: 8.78, condition: "6-dose pack minimum" }],
    source: "directmeds.com/solutions/sexual-health, November 11, 2026",
  },
  {
    date: "2026-11-11",
    providerId: "quad",
    change: "Newly listed from the ED cost index: Quad 4-in-1 compounded program at $114/month (from $179 regular), verified October 14, 2026. MEDVi's site could not be reached for a re-check on November 11.",
    moves: [{ product: "Quad 4-in-1 (compounded)", unit: "month", from: null, to: 114, condition: "from $179 regular; verified Oct 14, 2026" }],
    source: "MEDVi published starting price, October 14, 2026",
  },
  {
    date: "2026-11-11",
    providerId: "dudemeds",
    change: "Newly listed from the ED cost index: generic sildenafil / tadalafil from $1.63 per tablet, verified October 14, 2026. On November 11 the pricing page shows prices only after you choose your state.",
    moves: [{ product: "Generic sildenafil / tadalafil", unit: "dose", from: null, to: 1.63, condition: "verified Oct 14, 2026; shown per state" }],
    source: "DudeMeds published starting price, October 14, 2026",
  },
];

// ───── Derived values ─────

export const ED_PRICE_CHANGES_NEWEST: EdPriceChange[] = [...ED_PRICE_CHANGELOG].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export const ED_PRICE_DATA_UPDATED: string = [ED_PRICE_INDEX_VERIFIED, ED_PRICE_CHANGES_NEWEST[0]?.date ?? ""].sort().at(-1)!;

/** Numeric price from a cell ("$8.78" → 8.78). */
export function edPriceValue(cell: EdPriceCell | undefined): number | null {
  const m = cell?.price.match(/\$([\d,]+(?:\.\d+)?)/);
  return m ? Number(m[1].replace(/,/g, "")) : null;
}

/** The row's headline for the ticker: the lowest listed cell with its unit. */
export function edHeadline(r: EdPriceIndexRow): { price: string; unit: EdUnit } | null {
  const cells = [r.generic, r.compounded].filter((c): c is NonNullable<EdPriceCell> => !!c);
  if (cells.length === 0) return null;
  // Prefer the generic cell; otherwise the cheapest cell on offer.
  return r.generic ?? cells.sort((a, b) => (edPriceValue(a) ?? Infinity) - (edPriceValue(b) ?? Infinity))[0];
}

export const edChangeId = (c: EdPriceChange) => `${c.date}-${c.providerId}`;

export type EdChangeKind = "cut" | "increase" | "mixed" | "new" | "terms";

export function edChangeKind(c: EdPriceChange): EdChangeKind {
  const moves = c.moves ?? [];
  if (moves.length === 0) return "terms";
  if (moves.every((m) => m.from === null)) return "new";
  const priced = moves.filter((m): m is EdPriceMove & { from: number } => m.from !== null);
  const down = priced.some((m) => m.to < m.from);
  const up = priced.some((m) => m.to > m.from);
  if (down && up) return "mixed";
  if (up) return "increase";
  if (down) return "cut";
  return "terms";
}

export const ED_CHANGE_KIND_LABEL: Record<EdChangeKind, string> = {
  cut: "Price cut",
  increase: "Price increase",
  mixed: "Mixed change",
  new: "New listing",
  terms: "Terms change",
};

export function edMovePercent(m: EdPriceMove): number | null {
  if (m.from === null || m.from === 0) return null;
  return Math.round(((m.to - m.from) / m.from) * 100);
}
