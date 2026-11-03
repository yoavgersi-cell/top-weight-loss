import { getConfig } from "@/lib/config-store";
import {
  CHANGE_KIND_LABEL,
  PRICE_CHANGES_NEWEST,
  PRICE_INDEX,
  changeId,
  movePercent,
  priceValue,
  type PriceChange,
  type PriceMove,
} from "@/lib/price-index";

// ───── GLP-1 price tracker: shared builders ─────
// The tracker page, its RSS feed and its two CSV downloads all read from the
// same verified records in src/lib/price-index.ts through these helpers, so a
// price can never say one thing on the page and another in the feed.

export const HUB = "https://www.treatmentshub.com";
export const TRACKER_PATH = "/weight-loss/glp1-price-changes";
export const TRACKER_URL = `${HUB}${TRACKER_PATH}`;
export const FEED_PATH = "/glp1-price-changes.xml";
export const CHANGES_CSV_PATH = "/glp1-price-changes.csv";
export const CURRENT_CSV_PATH = "/glp1-prices.csv";

export const DRUG_LABEL: Record<PriceMove["drug"], string> = {
  semaglutide: "Semaglutide",
  tirzepatide: "Tirzepatide",
};

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
export const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
export const rfc822 = (iso: string) => new Date(`${iso}T12:00:00Z`).toUTCString();

/** "Semaglutide $49 → $41/month (-16%)" */
export function moveLabel(m: PriceMove): string {
  const pct = movePercent(m);
  if (m.from === null) return `${DRUG_LABEL[m.drug]} newly listed at ${usd(m.to)}/month`;
  return `${DRUG_LABEL[m.drug]} ${usd(m.from)} → ${usd(m.to)}/month${pct ? ` (${pct > 0 ? "+" : ""}${pct}%)` : ""}`;
}

export const entryUrl = (c: PriceChange) => `${TRACKER_URL}#${changeId(c)}`;

/** Provider id → display name, from the live weight-loss config. */
export async function providerNames(): Promise<Map<string, string>> {
  const config = await getConfig("weight-loss");
  return new Map(config.providers.map((p) => [p.id, p.name] as const));
}

/** One-line headline for a log entry, used as the feed item title. */
export function changeHeadline(c: PriceChange, name: string): string {
  const moves = c.moves ?? [];
  if (moves.length === 0) return `${name}: ${CHANGE_KIND_LABEL.terms.toLowerCase()} (${longDate(c.date)})`;
  return `${name}: ${moves.map(moveLabel).join("; ")}`;
}

/** Newest log date per provider. */
export function lastChangeByProvider(): Map<string, string> {
  const out = new Map<string, string>();
  for (const c of PRICE_CHANGES_NEWEST) if (!out.has(c.providerId)) out.set(c.providerId, c.date);
  return out;
}

/** Current index rows whose provider is live in the weight-loss config. */
export async function currentRows() {
  const names = await providerNames();
  const last = lastChangeByProvider();
  return PRICE_INDEX.filter((r) => names.has(r.providerId)).map((r) => ({
    ...r,
    name: names.get(r.providerId)!,
    semaValue: priceValue(r.semaglutide),
    tirzValue: priceValue(r.tirzepatide),
    lastChange: last.get(r.providerId) ?? null,
  }));
}

/** Low/high of the current listed monthly prices, per medication. */
export function priceRange(values: (number | null)[]) {
  const v = values.filter((n): n is number => n !== null);
  return v.length ? { min: Math.min(...v), max: Math.max(...v) } : null;
}

// ───── CSV ─────
const cell = (v: string | number | null | undefined) => {
  const s = v === null || v === undefined ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
export const csv = (rows: (string | number | null | undefined)[][]) => rows.map((r) => r.map(cell).join(",")).join("\r\n") + "\r\n";

export const CSV_HEADERS = (filename: string) => ({
  "Content-Type": "text/csv; charset=utf-8",
  "Content-Disposition": `inline; filename="${filename}"`,
  // Data files, not pages: keep them out of web results (the tracker page is
  // the indexable record) while leaving them fetchable for Dataset search.
  "X-Robots-Tag": "noindex",
  "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
});
