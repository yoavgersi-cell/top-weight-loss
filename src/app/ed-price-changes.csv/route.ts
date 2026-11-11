import { ED_CHANGE_KIND_LABEL, ED_PRICE_CHANGES_NEWEST, edChangeKind, edMovePercent } from "@/lib/ed-price-index";
import { UNIT_LONG, edEntryUrl, edProviderNames } from "@/lib/ed-price-feed";
import { CSV_HEADERS, csv } from "@/lib/price-feed";

// CSV of the ED price change log, one row per product price move (a
// terms-only entry gets one row with the price columns blank). Long format so
// it opens cleanly in a spreadsheet. Same records as the tracker page and feed.

export const revalidate = 3600;

export async function GET() {
  const names = await edProviderNames();
  const rows: (string | number | null)[][] = [
    ["date", "provider", "provider_id", "product", "unit", "previous_usd", "new_usd", "change_pct", "condition", "change_type", "source", "entry_url"],
  ];
  for (const c of ED_PRICE_CHANGES_NEWEST) {
    const base = [c.date, names.get(c.providerId) ?? c.providerId, c.providerId];
    const kind = ED_CHANGE_KIND_LABEL[edChangeKind(c)];
    const tail = [c.source ?? "", edEntryUrl(c)];
    const moves = c.moves ?? [];
    if (moves.length === 0) {
      rows.push([...base, "", "", null, null, null, c.change, kind, ...tail]);
      continue;
    }
    for (const m of moves) rows.push([...base, m.product, UNIT_LONG[m.unit], m.from, m.to, edMovePercent(m), m.condition ?? "", kind, ...tail]);
  }
  return new Response(csv(rows), { headers: CSV_HEADERS("treatmentshub-ed-price-changes.csv") });
}
