import { ED_PRICE_INDEX_VERIFIED } from "@/lib/ed-price-index";
import { HUB, UNIT_LONG, edCurrentRows } from "@/lib/ed-price-feed";
import { CSV_HEADERS, csv } from "@/lib/price-feed";

// CSV of the current verified ED price index: one row per provider, the
// lowest listed generic and compounded price with its unit and condition,
// plus the row's own verification date. Same records as the tracker page.

export const revalidate = 3600;

export async function GET() {
  const rows: (string | number | null)[][] = [
    [
      "provider", "provider_id",
      "generic_usd", "generic_unit", "generic_condition",
      "compounded_usd", "compounded_unit", "compounded_condition",
      "commitment", "shipping", "row_verified_on", "index_verified_on", "last_logged_change", "source", "review_url",
    ],
  ];
  for (const r of await edCurrentRows()) {
    rows.push([
      r.name, r.providerId,
      r.genericValue, r.generic ? UNIT_LONG[r.generic.unit] : "", r.generic ? r.generic.note : "not published",
      r.compoundedValue, r.compounded ? UNIT_LONG[r.compounded.unit] : "", r.compounded ? r.compounded.note : "not published",
      r.commitment, r.shipping, r.verifiedAt, ED_PRICE_INDEX_VERIFIED, r.lastChange, r.source, `${HUB}/ed/reviews/${r.providerId}`,
    ]);
  }
  return new Response(csv(rows), { headers: CSV_HEADERS("treatmentshub-ed-prices.csv") });
}
