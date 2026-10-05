import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { ProviderCta } from "@/components/provider-cta";
import { tpStarColor } from "@/components/trustpilot-rating";
import { PRICE_INDEX, PRICE_INDEX_VERIFIED } from "@/lib/price-index";
import type { Provider } from "@/lib/config";

// ───── Tirzepatide price table (best-tirzepatide-online) ─────
// The money moment on that guide: the "what's the cheapest" table. Rendered
// from code instead of article HTML so every row carries a live affiliate CTA,
// a link to the review, and the provider's verified Trustpilot record. Prices
// come from the verified price index (single source of truth); the condition
// and standout columns are the article's own editorial notes. Providers that
// have no tirzepatide row in the index are skipped rather than guessed.

type RowNote = { id: string; condition: string; standout: string };

// Article order = cheapest first, matching the index's tirzepatide prices.
const ROWS: RowNote[] = [
  { id: "wellmedr", condition: "Locks on a 12-month plan, billed monthly", standout: "Same price at every dose" },
  { id: "embody", condition: "Flat, no commitment", standout: "1-2 day shipping; refund if not approved" },
  { id: "directmeds", condition: "Flat, no membership", standout: "Only needle-free sublingual option" },
  { id: "altrx", condition: "Pause or cancel anytime; BNPL", standout: "Brand-name shelf alongside" },
  { id: "medvi", condition: "Monthly, all-inclusive", standout: "Dietician + coaching included" },
  { id: "sprout", condition: "Monthly; $200 off first month", standout: "Ships within 2 days" },
  { id: "trimrx", condition: "No long-term contract", standout: "Clinical guidance through dose changes" },
  { id: "shed", condition: "Monthly; 20% off first month", standout: "Lose 5% in 120 days or your money back" },
];

function regularFrom(note: string): string | null {
  const m = note.match(/reg\.\s*(\$[\d,]+)/i);
  return m ? m[1] : null;
}

// Same compact Trustpilot line the ranked cards use: one star in Trustpilot's
// own colour for that rating, the figure, and the review count.
function TpBadge({ rating, count }: { rating: string; count?: string }) {
  const value = parseFloat(rating);
  if (isNaN(value)) return null;
  const color = tpStarColor(value);
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[12.5px] text-gray-500">
      <Star className="h-3.5 w-3.5" style={{ fill: color, color }} strokeWidth={0} />
      <span className="font-bold text-[#191919]">{rating}</span>
      <span>Trustpilot</span>
      {count && <span className="text-gray-400">({count})</span>}
    </span>
  );
}

function verifiedLabel(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export function TirzepatidePriceTable({ providers, linkPrefix = "" }: { providers: Provider[]; linkPrefix?: string }) {
  const byId = new Map(providers.map((p) => [p.id, p]));
  const rows = ROWS.map((note, i) => {
    const provider = byId.get(note.id);
    const index = PRICE_INDEX.find((r) => r.providerId === note.id);
    const cell = index?.tirzepatide;
    if (!provider || !cell) return null;
    // Trustpilot: the provider record (seed wins there) first, the index second.
    const tpRating = provider.trustpilotRating || index.trustpilot?.rating;
    const tpCount = provider.trustpilotReviewCount || index.trustpilot?.count;
    return { ...note, provider, price: cell.price, regular: regularFrom(cell.note), tpRating, tpCount, position: i + 1 };
  }).filter((r): r is NonNullable<typeof r> => r !== null);

  if (rows.length === 0) return null;

  const cta = "inline-flex h-[36px] items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-[#0C4B75] px-3.5 text-[12.5px] font-bold text-white transition-colors hover:bg-[#093d61]";

  return (
    <div className="not-prose my-6">
      {/* Desktop: table */}
      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white sm:block">
        <table className="w-full border-collapse text-left text-[14px]">
          <thead>
            <tr className="border-b border-gray-200 bg-[#F7F8FA] text-[12px] font-bold uppercase tracking-wide text-gray-500">
              <th className="px-4 py-3">Provider</th>
              <th className="px-4 py-3">Monthly price</th>
              <th className="px-4 py-3">The condition</th>
              <th className="px-4 py-3">Trustpilot</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-gray-200 last:border-b-0">
                <td className="px-4 py-3.5 align-top">
                  <Link href={`${linkPrefix}/reviews/${r.id}`} className="font-bold text-[#191919] hover:text-[#0C4B75] hover:underline">
                    {r.provider.name}
                  </Link>
                  <p className="mt-0.5 text-[12px] leading-snug text-gray-500">{r.standout}</p>
                </td>
                <td className="px-4 py-3.5 align-top whitespace-nowrap">
                  <span className="text-[16px] font-extrabold text-[#191919] [font-variant-numeric:tabular-nums]">{r.price}</span>
                  {r.regular && <span className="ml-1.5 text-[12px] text-gray-400 line-through">{r.regular}</span>}
                </td>
                <td className="px-4 py-3.5 align-top text-[13px] leading-snug text-gray-700">{r.condition}</td>
                <td className="px-4 py-3.5 align-top">
                  {r.tpRating ? (
                    <TpBadge rating={r.tpRating} count={r.tpCount} />
                  ) : (
                    <span className="text-[12px] text-gray-400">Not published</span>
                  )}
                </td>
                <td className="px-4 py-3.5 align-top text-right">
                  <ProviderCta
                    href={r.provider.affiliateUrl}
                    providerName={r.provider.name}
                    providerSlug={r.id}
                    position={r.position}
                    pageType="listing"
                    sourceFlow="main_comparison"
                    className={cta}
                  >
                    Check availability
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </ProviderCta>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked rows */}
      <div className="space-y-3 sm:hidden">
        {rows.map((r) => (
          <div key={r.id} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Link href={`${linkPrefix}/reviews/${r.id}`} className="text-[15px] font-bold text-[#191919] hover:underline">
                  {r.provider.name}
                </Link>
                <p className="mt-0.5 text-[12.5px] leading-snug text-gray-600">{r.condition}</p>
                <p className="mt-0.5 text-[12px] leading-snug text-gray-400">{r.standout}</p>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-[18px] font-extrabold text-[#191919] [font-variant-numeric:tabular-nums]">{r.price}</span>
                <span className="text-[11px] font-semibold text-gray-400">/mo</span>
                {r.regular && <p className="text-[11.5px] text-gray-400 line-through">{r.regular}</p>}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-gray-100 pt-3">
              {r.tpRating ? (
                <TpBadge rating={r.tpRating} count={r.tpCount} />
              ) : (
                <span className="text-[12px] text-gray-400">Trustpilot: not published</span>
              )}
              <ProviderCta
                href={r.provider.affiliateUrl}
                providerName={r.provider.name}
                providerSlug={r.id}
                position={r.position}
                pageType="listing"
                sourceFlow="main_comparison"
                className={cta}
              >
                Check availability
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </ProviderCta>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[12.5px] leading-relaxed text-gray-500">
        Prices are each provider&rsquo;s published compounded tirzepatide rate, last verified {verifiedLabel(PRICE_INDEX_VERIFIED)}
        {" - "}promos change, so confirm at checkout. Trustpilot figures are each provider&rsquo;s public profile on the date we captured them; a
        rating reflects customer experience, not medical quality. The same providers&rsquo; semaglutide rates are in the{" "}
        <Link href={`${linkPrefix}/cheapest-glp1`} className="font-medium text-[#0C4B75] underline underline-offset-2">full price index</Link>.
      </p>
    </div>
  );
}
