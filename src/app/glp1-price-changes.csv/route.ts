import { CHANGE_KIND_LABEL, PRICE_CHANGES_NEWEST, changeKind, movePercent } from "@/lib/price-index";
import { CSV_HEADERS, csv, entryUrl, providerNames } from "@/lib/price-feed";

// CSV of the GLP-1 price change log, one row per medication price move (a
// terms-only entry gets one row with the price columns blank). Long format so
// it opens cleanly in a spreadsheet and charts without reshaping. Same records
// as the tracker page and the RSS feed.

export const revalidate = 3600;

export async function GET() {
  const names = await providerNames();
  const rows: (string | number | null)[][] = [
    ["date", "provider", "provider_id", "medication", "previous_usd_per_month", "new_usd_per_month", "change_pct", "condition", "change_type", "source", "entry_url"],
  ];
  for (const c of PRICE_CHANGES_NEWEST) {
    const base = [c.date, names.get(c.providerId) ?? c.providerId, c.providerId];
    const kind = CHANGE_KIND_LABEL[changeKind(c)];
    const tail = [c.source ?? "", entryUrl(c)];
    const moves = c.moves ?? [];
    if (moves.length === 0) {
      rows.push([...base, "", null, null, null, c.change, kind, ...tail]);
      continue;
    }
    for (const m of moves) {
      rows.push([...base, m.drug, m.from, m.to, movePercent(m), m.condition ?? "", kind, ...tail]);
    }
  }
  return new Response(csv(rows), { headers: CSV_HEADERS("treatmentshub-glp1-price-changes.csv") });
}
