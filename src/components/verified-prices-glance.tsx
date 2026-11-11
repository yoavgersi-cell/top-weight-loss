import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import type { SiteConfig } from "@/lib/config";
import { PRICE_DATA_UPDATED, PRICE_INDEX, PRICE_INDEX_VERIFIED, priceValue, type PriceCell } from "@/lib/price-index";

// ───── Verified prices at a glance ─────
// A compact, machine-readable price table for the weight-loss ranking landing
// pages (semaglutide, tirzepatide, wegovy-providers, ...). Every figure comes
// from src/lib/price-index.ts - the same records behind the ticker and the
// tracker - so nothing here can drift from the verified data. Plain semantic
// HTML (caption, thead, th scope) on purpose: answer engines lift tables like
// this verbatim. Nov 11, 2026.

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
const cellText = (c: PriceCell) => (c ? `${c.price}/mo` : "Not offered");

export function VerifiedPricesGlance({
  config,
  focus = "both",
  limit = 8,
  className = "",
}: {
  config: SiteConfig;
  /** Which medication the page is about: narrows the table and the key facts. */
  focus?: "semaglutide" | "tirzepatide" | "both";
  limit?: number;
  className?: string;
}) {
  const byId = new Map(config.providers.map((p) => [p.id, p]));
  const order = config.ranking?.providerOrder ?? [];
  const rank = (id: string) => {
    const i = order.indexOf(id);
    return i < 0 ? order.length : i;
  };
  const rows = PRICE_INDEX.filter((r) => byId.has(r.providerId))
    .filter((r) => (focus === "semaglutide" ? r.semaglutide : focus === "tirzepatide" ? r.tirzepatide : r.semaglutide || r.tirzepatide || r.plan))
    .sort((a, b) => rank(a.providerId) - rank(b.providerId))
    .slice(0, limit)
    .map((r) => ({ ...r, name: byId.get(r.providerId)!.name }));
  if (rows.length === 0) return null;

  const cheapest = (pick: (r: (typeof rows)[number]) => PriceCell) => {
    const priced = rows.map((r) => ({ r, v: priceValue(pick(r)) })).filter((x): x is { r: (typeof rows)[number]; v: number } => x.v !== null);
    return priced.sort((a, b) => a.v - b.v)[0];
  };
  const sema = cheapest((r) => r.semaglutide);
  const tirz = cheapest((r) => r.tirzepatide);
  const noCommit = rows.filter((r) => /none|no membership|month to month|cancel anytime/i.test(r.commitment)).length;

  const facts = [
    sema && focus !== "tirzepatide" && `Lowest listed compounded semaglutide: ${sema.r.name} at ${sema.r.semaglutide!.price}/month (${sema.r.semaglutide!.note}).`,
    tirz && focus !== "semaglutide" && `Lowest listed compounded tirzepatide: ${tirz.r.name} at ${tirz.r.tirzepatide!.price}/month (${tirz.r.tirzepatide!.note}).`,
    `${noCommit} of the ${rows.length} providers below sell month to month with no long-term plan; the rest tie their lowest price to a plan length.`,
    `Every price was read on the provider's own site; the index was last verified ${fmt(PRICE_INDEX_VERIFIED)} and changes are logged on our price tracker.`,
  ].filter(Boolean) as string[];

  const showSema = focus !== "tirzepatide";
  const showTirz = focus !== "semaglutide";

  return (
    <section className={`rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 ${className}`} aria-labelledby="verified-prices-glance">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="verified-prices-glance" className="flex items-center gap-2 text-[20px] font-bold text-[#191919]">
          <ShieldCheck className="h-5 w-5 text-emerald-600" strokeWidth={2.25} /> Verified prices at a glance
        </h2>
        <p className="text-[12.5px] text-gray-500">
          Updated <time dateTime={PRICE_DATA_UPDATED}>{fmt(PRICE_DATA_UPDATED)}</time>
        </p>
      </div>
      <ul className="mt-3 space-y-1.5 text-[14px] leading-relaxed text-gray-800">
        {facts.map((f) => (
          <li key={f} className="flex gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0C4B75]" aria-hidden />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full min-w-[520px] text-[13.5px]">
          <caption className="sr-only">
            Listed monthly prices for compounded GLP-1 medication at the providers in our ranking, verified on each provider&rsquo;s site
          </caption>
          <thead className="bg-gray-50 text-left text-[11.5px] uppercase tracking-wider text-gray-500">
            <tr>
              <th scope="col" className="px-3 py-2.5">Provider</th>
              {showSema && <th scope="col" className="px-3 py-2.5">Semaglutide</th>}
              {showTirz && <th scope="col" className="px-3 py-2.5">Tirzepatide</th>}
              <th scope="col" className="px-3 py-2.5">Commitment</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.providerId} className="border-t border-gray-100 align-top">
                <th scope="row" className="px-3 py-2.5 font-semibold">
                  <Link href={`/weight-loss/reviews/${r.providerId}`} className="text-[#0C4B75] hover:underline">{r.name}</Link>
                </th>
                {showSema && (
                  <td className="px-3 py-2.5">
                    <span className="font-bold text-[#191919] [font-variant-numeric:tabular-nums]">{r.semaglutide ? cellText(r.semaglutide) : r.plan && !r.tirzepatide ? `plans ${r.plan.price}/mo` : "Not offered"}</span>
                    {r.semaglutide && <span className="block text-[12px] leading-snug text-gray-500">{r.semaglutide.note}</span>}
                  </td>
                )}
                {showTirz && (
                  <td className="px-3 py-2.5">
                    <span className="font-bold text-[#191919] [font-variant-numeric:tabular-nums]">{r.tirzepatide ? cellText(r.tirzepatide) : r.plan && !r.semaglutide ? `plans ${r.plan.price}/mo` : "Not offered"}</span>
                    {r.tirzepatide && <span className="block text-[12px] leading-snug text-gray-500">{r.tirzepatide.note}</span>}
                  </td>
                )}
                <td className="px-3 py-2.5 text-gray-700">{r.commitment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] font-semibold text-[#0C4B75]">
        <Link href="/weight-loss/glp1-price-changes" className="inline-flex items-center gap-1 hover:underline">
          Full price tracker and change log <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </Link>
        <Link href="/weight-loss/cheapest-glp1" className="inline-flex items-center gap-1 hover:underline">
          Cheapest GLP-1 right now <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </Link>
        <Link href="/weight-loss/articles/glp1-weight-loss-online-complete-guide" className="inline-flex items-center gap-1 hover:underline">
          The complete guide to GLP-1 online <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </Link>
      </div>
    </section>
  );
}
