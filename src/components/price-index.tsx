import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRICE_INDEX, type PriceCell } from "@/lib/price-index";
import { ProviderCta } from "@/components/provider-cta";
import type { Provider } from "@/lib/config";

// ───── The price index ─────
// A price-led editorial table, not a card grid: the provider is a row, the
// price is the headline, and every figure carries its honest condition
// (promo rate, prepaid plan, first-month price) right under the number.
// Sorted cheapest-first by design - the order is the answer.

function Price({ cell }: { cell: PriceCell }) {
  if (!cell) {
    return (
      <div>
        <span className="text-[15px] font-semibold text-gray-300">-</span>
        <p className="mt-0.5 text-[11.5px] leading-snug text-gray-400">not offered</p>
      </div>
    );
  }
  return (
    <div>
      <span className="text-[21px] font-extrabold tracking-tight text-[#191919] [font-variant-numeric:tabular-nums]">
        {cell.price}
      </span>
      <span className="ml-0.5 text-[12px] font-semibold text-gray-400">/mo</span>
      <p className="mt-0.5 text-[11.5px] leading-snug text-gray-400">{cell.note}</p>
    </div>
  );
}

export function PriceIndex({
  providers,
  reviewBase = "/weight-loss/reviews",
}: {
  providers: Provider[];
  reviewBase?: string;
}) {
  const byId = new Map(providers.map((p) => [p.id, p]));
  const rows = PRICE_INDEX.filter((r) => byId.has(r.providerId));

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Column headers - desktop only; mobile rows are self-labeling */}
      <div className="hidden border-b-2 border-gray-200 bg-gray-50/80 px-5 py-3 sm:grid sm:grid-cols-[minmax(0,1fr)_150px_150px_150px] sm:gap-4">
        <span className="text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">Provider</span>
        <span className="text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">Semaglutide</span>
        <span className="text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">Tirzepatide</span>
        <span />
      </div>

      {rows.map((row, i) => {
        const p = byId.get(row.providerId)!;
        const review = `${reviewBase}/${p.id}`;
        return (
          <div
            key={row.providerId}
            className={`relative px-5 py-5 transition-colors hover:bg-gray-50/50 sm:grid sm:grid-cols-[minmax(0,1fr)_150px_150px_150px] sm:items-center sm:gap-4 ${
              i > 0 ? "border-t border-gray-100" : ""
            }`}
          >
            {i === 0 && <div className="absolute inset-y-0 left-0 w-[3px] bg-emerald-500" />}

            {/* Provider */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[12px] font-bold text-gray-300 [font-variant-numeric:tabular-nums]">
                  {i + 1}
                </span>
                <Link href={review} className="text-[16px] font-bold text-[#191919] hover:text-[#0C4B75]">
                  {p.name}
                </Link>
                {i === 0 && (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-emerald-700">
                    Lowest price
                  </span>
                )}
              </div>
              <p className="mt-1 text-[13px] leading-snug text-gray-500">{row.edge}</p>
              <p className="mt-1.5 text-[12px] text-gray-400">
                Ships {row.shipping}
                {" · "}
                {row.trustpilot
                  ? `Trustpilot ${row.trustpilot.rating} across ${row.trustpilot.count} reviews`
                  : "No published Trustpilot rating"}
              </p>
            </div>

            {/* Prices - side-by-side mini-grid on mobile, columns on desktop */}
            <div className="mt-4 grid grid-cols-2 gap-4 sm:contents">
              <div>
                <p className="mb-1 text-[10.5px] font-bold uppercase tracking-[0.06em] text-gray-400 sm:hidden">
                  Semaglutide
                </p>
                <Price cell={row.semaglutide} />
              </div>
              <div>
                <p className="mb-1 text-[10.5px] font-bold uppercase tracking-[0.06em] text-gray-400 sm:hidden">
                  Tirzepatide
                </p>
                <Price cell={row.tirzepatide} />
              </div>
            </div>

            {/* Actions - plain text links, no button chrome */}
            <div className="mt-4 flex items-center gap-4 sm:mt-0 sm:flex-col sm:items-end sm:gap-1.5">
              <ProviderCta
                href={p.affiliateUrl}
                providerName={p.name}
                providerSlug={p.id}
                position={i + 1}
                pageType="listing"
                sourceFlow="main_comparison"
                className="inline-flex items-center gap-1 text-[13.5px] font-bold text-[#0C4B75] hover:underline"
              >
                Visit {p.name}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </ProviderCta>
              <Link href={review} className="text-[12.5px] font-medium text-gray-400 hover:text-gray-600 hover:underline">
                Read our review
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
