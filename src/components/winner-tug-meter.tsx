"use client";

import { useEffect, useRef, useState } from "react";
import { Trophy, ArrowRight } from "lucide-react";
import { ProviderCta } from "./provider-cta";

// Above-the-fold "verdict reveal" for battle pages. A head-to-head advantage
// bar fills toward the winner and locks in a trophy chip + CTA. Plays once per
// session, and snaps to the final state for reduced-motion / repeat views.
export function WinnerTugMeter({
  winnerName,
  loserName,
  advantage,
  winnerHref,
  winnerSlug,
}: {
  winnerName: string;
  loserName: string;
  advantage: number; // winner's share, 50–100
  winnerHref: string;
  winnerSlug: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [fill, setFill] = useState(50);
  const [pct, setPct] = useState(50);
  const [revealed, setRevealed] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setFill(advantage);
      setPct(advantage);
      setRevealed(true);
      return;
    }

    // Play from the start, right on load.
    const startDelay = window.setTimeout(() => {
      setAnimate(true);
      requestAnimationFrame(() => setFill(advantage));

      const t0 = performance.now();
      const dur = 1500;
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        setPct(Math.round(50 + (advantage - 50) * e));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      window.setTimeout(() => setRevealed(true), 1550);
    }, 250);

    return () => window.clearTimeout(startDelay);
  }, [advantage]);

  const loserPct = 100 - pct;

  return (
    <section
      ref={ref}
      className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7"
    >
      <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.07em] text-gray-400">
        Our Verdict
      </p>

      <div className="mb-2.5 flex items-baseline justify-between">
        <span className="text-[14px] font-extrabold tracking-[-0.01em] text-emerald-600">
          {winnerName}
        </span>
        <span className="text-[14px] font-bold text-gray-400">{loserName}</span>
      </div>

      {/* Advantage bar */}
      <div className="relative h-14 overflow-hidden rounded-2xl bg-gray-100 shadow-[inset_0_1px_3px_rgba(18,38,66,0.10)] sm:h-[52px]">
        <div
          className="absolute inset-y-0 left-0 overflow-hidden rounded-2xl bg-gradient-to-b from-emerald-400 to-emerald-500 shadow-[0_6px_18px_-6px_rgba(16,185,129,0.55)] transition-[width] duration-[1500ms]"
          style={{ width: `${fill}%`, transitionTimingFunction: "cubic-bezier(0.32,0.94,0.28,1)" }}
        >
          {animate && (
            <span
              className="absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-white/45 to-transparent"
              style={{ animation: "tugSweep 1.15s ease-out 0.35s" }}
            />
          )}
        </div>
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px] font-extrabold tabular-nums text-white"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.18)" }}
        >
          {pct}%
        </span>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[15px] font-extrabold tabular-nums text-gray-400">
          {loserPct}%
        </span>
      </div>

      {/* Winner chip */}
      <div
        className={`mx-auto mt-4 flex w-max items-center gap-2 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-600 px-4 py-2 text-[13px] font-extrabold uppercase tracking-[0.07em] text-white shadow-[0_10px_24px_-8px_rgba(16,185,129,0.6)] transition-all duration-500 ${
          revealed ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <Trophy className="h-4 w-4" strokeWidth={2.5} />
        {winnerName} Wins
      </div>

      {/* Meta + understated text-link CTA (the primary CTA lives in the cards below) */}
      <div
        className={`mt-4 flex flex-col items-center gap-1.5 transition-all duration-500 ${
          revealed ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
        }`}
      >
        <span className="text-[12.5px] text-gray-400">
          {advantage}% advantage on our scorecard
        </span>
        <ProviderCta
          href={winnerHref}
          providerName={winnerName}
          providerSlug={winnerSlug}
          pageType="battle"
          sourceFlow="battle_page"
          className="inline-flex items-center gap-1 text-[13.5px] font-bold text-[#0C4B75] hover:underline"
        >
          Visit {winnerName}
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </ProviderCta>
      </div>
    </section>
  );
}
