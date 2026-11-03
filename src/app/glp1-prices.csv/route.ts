import { PRICE_INDEX_VERIFIED, type PriceCell } from "@/lib/price-index";
import { CSV_HEADERS, HUB, csv, currentRows } from "@/lib/price-feed";

// CSV of the current verified GLP-1 price index: one row per provider, the
// headline monthly price per medication with its condition, plus the date of
// the provider's latest logged change. Same records as the tracker page.

export const revalidate = 3600;

// "from $179" keeps its "starting price" meaning once reduced to a number.
const condition = (c: PriceCell) =>
  !c ? "not offered" : `${/^from\b/i.test(c.price) && !/starting/i.test(c.note) ? "starting price; " : ""}${c.note}`;

export async function GET() {
  const rows: (string | number | null)[][] = [
    [
      "provider", "provider_id",
      "semaglutide_usd_per_month", "semaglutide_condition",
      "tirzepatide_usd_per_month", "tirzepatide_condition",
      "plans_from_usd_per_month", "plans_from_condition",
      "commitment", "shipping", "index_verified_on", "last_logged_change", "review_url",
    ],
  ];
  for (const r of await currentRows()) {
    rows.push([
      r.name, r.providerId,
      r.semaValue, r.planValue !== null ? "see plans_from" : condition(r.semaglutide),
      r.tirzValue, r.planValue !== null ? "see plans_from" : condition(r.tirzepatide),
      r.planValue, r.planValue !== null ? r.plan!.note : "",
      r.commitment, r.shipping, PRICE_INDEX_VERIFIED, r.lastChange, `${HUB}/weight-loss/reviews/${r.providerId}`,
    ]);
  }
  return new Response(csv(rows), { headers: CSV_HEADERS("treatmentshub-glp1-prices.csv") });
}
