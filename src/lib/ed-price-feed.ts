import { getConfig } from "@/lib/config-store";
import { longDate } from "@/lib/price-feed";
import {
  ED_CHANGE_KIND_LABEL,
  ED_PRICE_CHANGES_NEWEST,
  ED_PRICE_INDEX,
  edChangeId,
  edHeadline,
  edPriceValue,
  type EdPriceChange,
  type EdPriceMove,
  type EdUnit,
} from "@/lib/ed-price-index";

// ───── ED price tracker: shared builders ─────
// The ED tracker page, its RSS feed, its CSV downloads and the ED price ticker
// all read the same verified records in src/lib/ed-price-index.ts through
// these helpers, so a price can never say one thing on the page and another
// in the feed. Mirrors src/lib/price-feed.ts for GLP-1.

export const HUB = "https://www.treatmentshub.com";
export const ED_TRACKER_PATH = "/ed/ed-price-changes";
export const ED_TRACKER_URL = `${HUB}${ED_TRACKER_PATH}`;
export const ED_FEED_PATH = "/ed-price-changes.xml";
export const ED_CHANGES_CSV_PATH = "/ed-price-changes.csv";
export const ED_CURRENT_CSV_PATH = "/ed-prices.csv";

export const UNIT_SHORT: Record<EdUnit, string> = { dose: "/dose", month: "/mo" };
export const UNIT_LONG: Record<EdUnit, string> = { dose: "per dose", month: "per month" };

export const usdEd = (n: number) => `$${n % 1 === 0 ? n.toLocaleString("en-US") : n.toFixed(2)}`;

/** "Generic Viagra (sildenafil) newly listed at $2 per dose" */
export function edMoveLabel(m: EdPriceMove): string {
  if (m.from === null) return `${m.product} newly listed at ${usdEd(m.to)} ${UNIT_LONG[m.unit]}`;
  const pct = m.from ? Math.round(((m.to - m.from) / m.from) * 100) : 0;
  return `${m.product} ${usdEd(m.from)} → ${usdEd(m.to)} ${UNIT_LONG[m.unit]}${pct ? ` (${pct > 0 ? "+" : ""}${pct}%)` : ""}`;
}

export const edEntryUrl = (c: EdPriceChange) => `${ED_TRACKER_URL}#${edChangeId(c)}`;

/** Provider id → display name, from the live ED config. */
export async function edProviderNames(): Promise<Map<string, string>> {
  const config = await getConfig("ed");
  return new Map(config.providers.map((p) => [p.id, p.name] as const));
}

export function edChangeHeadline(c: EdPriceChange, name: string): string {
  const moves = c.moves ?? [];
  if (moves.length === 0) return `${name}: ${ED_CHANGE_KIND_LABEL.terms.toLowerCase()} (${longDate(c.date)})`;
  return `${name}: ${moves.map(edMoveLabel).join("; ")}`;
}

export function edLastChangeByProvider(): Map<string, string> {
  const out = new Map<string, string>();
  for (const c of ED_PRICE_CHANGES_NEWEST) if (!out.has(c.providerId)) out.set(c.providerId, c.date);
  return out;
}

/** Current index rows whose provider is live in the ED config, in ranking order. */
export async function edCurrentRows() {
  const config = await getConfig("ed");
  const names = new Map(config.providers.map((p) => [p.id, p.name] as const));
  const order = config.ranking?.providerOrder ?? [];
  const rank = (id: string) => {
    const i = order.indexOf(id);
    return i < 0 ? order.length : i;
  };
  const last = edLastChangeByProvider();
  return ED_PRICE_INDEX.filter((r) => names.has(r.providerId))
    .map((r, i) => ({ r, i }))
    .sort((a, b) => rank(a.r.providerId) - rank(b.r.providerId) || a.i - b.i)
    .map(({ r }) => ({
      ...r,
      name: names.get(r.providerId)!,
      genericValue: edPriceValue(r.generic),
      compoundedValue: edPriceValue(r.compounded),
      headline: edHeadline(r),
      lastChange: last.get(r.providerId) ?? null,
    }));
}

/** Ticker items for the ED strip: "Hims from $22/mo", "Rex MD from $2/dose". */
export async function edTickerItems(): Promise<{ id: string; name: string; price: string; href: string }[]> {
  const rows = await edCurrentRows();
  return rows
    .filter((r) => r.headline)
    .map((r) => ({ id: r.providerId, name: r.name, price: `from ${r.headline!.price}${UNIT_SHORT[r.headline!.unit]}`, href: `/ed/reviews/${r.providerId}` }));
}

/** Low/high of listed prices for one unit. */
export function edRange(values: (number | null)[]) {
  const v = values.filter((n): n is number => n !== null);
  return v.length ? { min: Math.min(...v), max: Math.max(...v) } : null;
}
