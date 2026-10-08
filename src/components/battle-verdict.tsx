import Link from "next/link";
import { ArrowDown, Check, Star } from "lucide-react";
import type { BattleData, Provider } from "@/lib/config";
import { PRICE_INDEX } from "@/lib/price-index";
import { supportTheme, pct, SMALL_SAMPLE } from "@/lib/review-themes";
import { ProviderCta } from "@/components/provider-cta";

// ───── Comparison-page verdict ─────
// The answer a searcher came for, above the fold. Rebuilt Oct 8, 2026 from
// the buyer research: the four things buyers ask about first (the price they
// keep paying, delivery, whether a person answers, the public record) shown
// for BOTH providers side by side, so the verdict is checkable rather than
// asserted - including the tiles where the runner-up wins. Every figure is
// verified data already on the site: the price index, each provider's
// Trustpilot record, and the support share computed from captured reviews
// with the same rule the provider-support page uses. The "why" bullets and
// "pick X instead if" line are the battle's own editorial verdict points.

type Tile = { label: string; winner: string; winnerSub?: string; runnerUp: string; runnerUpSub?: string; note?: string };

function priceTile(winner: Provider, runnerUp: Provider, priceRow?: { provider1Value: string; provider2Value: string }, winnerIsP1?: boolean): Tile | null {
  const row = (id: string) => PRICE_INDEX.find((r) => r.providerId === id);
  const w = row(winner.id);
  const r = row(runnerUp.id);
  if (w?.semaglutide && r?.semaglutide) {
    const short = (c: string) => c.replace(/^None - /i, "").replace(/ for the lowest rate.*$/i, "").replace(/;.*$/, "").toLowerCase();
    return {
      label: "What you keep paying",
      winner: `${w.semaglutide.price}/mo`,
      winnerSub: short(w.commitment),
      runnerUp: `${r.semaglutide.price}/mo`,
      runnerUpSub: short(r.commitment),
      note: "semaglutide, every month",
    };
  }
  if (priceRow) {
    return {
      label: "Price",
      winner: winnerIsP1 ? priceRow.provider1Value : priceRow.provider2Value,
      runnerUp: winnerIsP1 ? priceRow.provider2Value : priceRow.provider1Value,
    };
  }
  return null;
}

function deliveryTile(winner: Provider, runnerUp: Provider, shippingRow?: { provider1Value: string; provider2Value: string }, winnerIsP1?: boolean): Tile | null {
  const row = (id: string) => PRICE_INDEX.find((r) => r.providerId === id);
  const w = row(winner.id);
  const r = row(runnerUp.id);
  const trim = (s: string) => s.replace(/^(Free |Ships in |Free shipping in |Prescription shipped within )/i, "").replace(/,.*$/, "").replace(/ shipping$/i, "");
  if (w && r) return { label: "Delivery", winner: trim(w.shipping), runnerUp: trim(r.shipping), note: "published promise" };
  if (shippingRow) {
    return {
      label: "Delivery",
      winner: winnerIsP1 ? shippingRow.provider1Value : shippingRow.provider2Value,
      runnerUp: winnerIsP1 ? shippingRow.provider2Value : shippingRow.provider1Value,
    };
  }
  return null;
}

function supportTile(winner: Provider, runnerUp: Provider): Tile | null {
  const w = supportTheme(winner.trustpilotReviews);
  const r = supportTheme(runnerUp.trustpilotReviews);
  if (!w || !r) return null;
  const line = (t: NonNullable<typeof w>) => `${pct(t.pos, t.n)}% positive`;
  const sub = (t: NonNullable<typeof w>) => `${t.n} support mentions${t.n < SMALL_SAMPLE ? ", small sample" : ""}`;
  return { label: "Someone who answers", winner: line(w), winnerSub: sub(w), runnerUp: line(r), runnerUpSub: sub(r), note: "from the reviews we captured" };
}

function trustpilotTile(winner: Provider, runnerUp: Provider): Tile | null {
  if (!winner.trustpilotRating && !runnerUp.trustpilotRating) return null;
  const v = (p: Provider) => (p.trustpilotRating ? `${p.trustpilotRating} / 5` : "not published");
  const s = (p: Provider) => (p.trustpilotReviewCount ? `${p.trustpilotReviewCount} reviews` : undefined);
  return { label: "Trustpilot", winner: v(winner), winnerSub: s(winner), runnerUp: v(runnerUp), runnerUpSub: s(runnerUp), note: "claimed profiles" };
}

export function BattleVerdict({
  battle,
  winner,
  runnerUp,
  winnerIsP1,
  winnerScore,
  runnerUpScore,
  showScores,
  priceRow,
  shippingRow,
  runnerUpReviewHref,
  fullComparisonHref = "#difference",
}: {
  battle: BattleData;
  winner: Provider;
  runnerUp: Provider;
  winnerIsP1: boolean;
  winnerScore?: number;
  runnerUpScore?: number;
  showScores: boolean;
  priceRow?: { provider1Value: string; provider2Value: string };
  shippingRow?: { provider1Value: string; provider2Value: string };
  runnerUpReviewHref: string;
  fullComparisonHref?: string;
}) {
  const why = (battle.verdictWinnerPoints ?? []).slice(0, 3);
  const instead = (battle.verdictLoserPoints ?? []).slice(0, 2);
  const tiles = [
    priceTile(winner, runnerUp, priceRow, winnerIsP1),
    deliveryTile(winner, runnerUp, shippingRow, winnerIsP1),
    supportTile(winner, runnerUp),
    trustpilotTile(winner, runnerUp),
  ].filter((t): t is Tile => t !== null);

  return (
    <section aria-labelledby="verdict-heading" className="mb-10 overflow-hidden rounded-2xl border border-[#0C4B75]/20 bg-white shadow-[0_2px_12px_rgba(12,75,117,0.08)]">
      {/* Band */}
      <div className="flex items-center justify-between gap-3 bg-[#0C4B75] px-5 py-3 sm:px-7">
        <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-white/80">
          Our verdict · {winner.name} vs {runnerUp.name}
        </p>
        {showScores && winnerScore != null && runnerUpScore != null && (
          <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/10 px-3 py-1 text-[12.5px] font-bold text-white ring-1 ring-white/20">
            <Star className="h-3.5 w-3.5 fill-[#FDB515] text-[#FDB515]" strokeWidth={0} />
            {winnerScore} vs {runnerUpScore}
            <span className="font-medium text-white/60">/ 10</span>
          </span>
        )}
      </div>

      <div className="p-5 sm:p-7">
        {/* Pick */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
          <div className="flex h-[56px] w-[150px] shrink-0 items-center rounded-xl border border-gray-200 bg-white px-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={winner.logo} alt={`${winner.name} logo`} width={118} height={40} className="max-h-[40px] max-w-full object-contain object-left" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 id="verdict-heading" className="text-[26px] font-extrabold leading-[1.15] tracking-[-0.01em] text-[#191919] sm:text-[30px]">
              Our pick: {winner.name}
            </h2>
            <p className="mt-1.5 text-[15px] text-gray-500 sm:text-[16px]">
              Over {runnerUp.name} for most people. Three reasons, then the numbers for both so you can check them.
            </p>
            {why.length > 0 && (
              <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                {why.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-[14px] leading-snug text-[#191919]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2.75} />
                    <span>{pt.replace(/\.$/, "")}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* The numbers, both sides */}
        {tiles.length > 0 && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {tiles.map((t) => (
              <div key={t.label} className="rounded-xl border border-gray-200 bg-[#F8FAFC] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-gray-400">{t.label}</p>
                <p className="mt-1.5 text-[20px] font-extrabold leading-none text-[#0C4B75] [font-variant-numeric:tabular-nums]">{t.winner}</p>
                <p className="mt-1 min-h-[16px] text-[12px] leading-snug text-gray-500">
                  <span className="font-semibold text-[#191919]">{winner.name}</span>
                  {t.winnerSub ? ` · ${t.winnerSub}` : ""}
                </p>
                <div className="my-2.5 h-px bg-gray-200" />
                <p className="text-[15px] font-bold leading-none text-gray-700 [font-variant-numeric:tabular-nums]">{t.runnerUp}</p>
                <p className="mt-1 text-[12px] leading-snug text-gray-500">
                  <span className="font-semibold text-gray-700">{runnerUp.name}</span>
                  {t.runnerUpSub ? ` · ${t.runnerUpSub}` : ""}
                </p>
                {t.note && <p className="mt-2 text-[10.5px] uppercase tracking-wide text-gray-400">{t.note}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Where the runner-up wins + CTAs */}
        <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-5 lg:flex-row lg:items-center lg:justify-between">
          {instead.length > 0 && (
            <p className="text-[14px] leading-relaxed text-gray-600">
              <span className="font-bold text-[#191919]">Pick {runnerUp.name} instead if this matters more:</span>{" "}
              {instead.map((pt, i) => (
                <span key={pt}>
                  {i > 0 ? " · " : ""}
                  {pt.replace(/\.$/, "").replace(/^[A-Z](?=[a-z])/, (c) => c.toLowerCase())}
                </span>
              ))}
              .{" "}
              <Link href={runnerUpReviewHref} className="font-semibold text-[#0C4B75] underline underline-offset-2">
                Read the {runnerUp.name} review
              </Link>
            </p>
          )}
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
            <ProviderCta
              href={winner.affiliateUrl}
              providerName={winner.name}
              providerSlug={winner.id}
              pageType="battle"
              sourceFlow="battle_page"
              className="inline-flex h-[46px] items-center justify-center gap-1.5 rounded-xl bg-[#0C4B75] px-6 text-[14.5px] font-bold text-white transition-colors hover:bg-[#093d61]"
            >
              Visit {winner.name}
            </ProviderCta>
            <a
              href={fullComparisonHref}
              className="inline-flex h-[46px] items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-5 text-[14px] font-bold text-[#0C4B75] transition-colors hover:border-[#0C4B75]/40"
            >
              Full comparison
              <ArrowDown className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
