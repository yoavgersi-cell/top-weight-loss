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
      requestAnimationFrame(() => setFill(advantage));

      const t0 = performance.now();
      const dur = 1400;
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        // easeOutQuart — smooth, gentle deceleration matching the bar
        const e = 1 - Math.pow(1 - p, 4);
        setPct(Math.round(50 + (advantage - 50) * e));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      // Reveal the chip + CTA early — the eased bar is ~90% filled by here
      window.setTimeout(() => setRevealed(true), 650);
    }, 200);

    return () => window.clearTimeout(startDelay);
  }, [advantage]);

  const loserPct = 100 - pct;

  return (
    <section
      ref={ref}
      className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7"
    >
      <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.07em] text-gray-400">
        The Short Answer
      </p>

      <div className="mb-2.5 flex items-baseline justify-between">
        <span className="text-[14px] font-extrabold tracking-[-0.01em] text-[#10714E]">
          {winnerName}
        </span>
        <span className="text-[14px] font-bold text-gray-400">{loserName}</span>
      </div>

      {/* Advantage bar — fill uses a GPU transform (scaleX) for smooth motion */}
      <div className="relative h-14 overflow-hidden rounded-2xl bg-gray-100 shadow-[inset_0_1px_3px_rgba(18,38,66,0.10)] sm:h-[52px]">
        <div
          className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-b from-[#1C8F63] to-[#10714E] shadow-[0_6px_18px_-8px_rgba(16,113,78,0.5)]"
          style={{
            transform: `scaleX(${fill / 100})`,
            transition: "transform 1.4s cubic-bezier(0.22,1,0.36,1)",
            willChange: "transform",
          }}
        />
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

      {/* Winner label — an award caption, not a button */}
      <div
        className={`mt-4 flex items-center justify-center gap-2 transition-opacity duration-700 ${
          revealed ? "opacity-100" : "opacity-0"
        }`}
      >
        <Trophy className="h-[18px] w-[18px] text-amber-500" strokeWidth={2.5} />
        <span className="text-[15px] font-extrabold tracking-[-0.01em] text-[#191919]">
          {winnerName} wins
        </span>
      </div>

      {/* Meta + understated text-link CTA (the primary CTA lives in the cards below) */}
      <div
        className={`mt-4 flex flex-col items-center gap-1.5 transition-all duration-500 ${
          revealed ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
        }`}
      >
        <span className="text-[12.5px] text-gray-500">
          Our pick in this matchup — {advantage}% of the score.
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

      {/* Sources */}
      <div
        className={`mt-4 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 border-t border-gray-100 pt-3.5 text-[11px] text-gray-400 transition-opacity duration-700 ${
          revealed ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="font-bold uppercase tracking-[0.06em]">Sources</span>
        <span className="text-gray-300">·</span>
        <span className="inline-flex items-center gap-1">
          <TrustpilotStar className="h-3 w-3" />
          Trustpilot reviews
        </span>
        <span className="text-gray-300">·</span>
        <span>Our in-house research</span>
      </div>
    </section>
  );
}

function TrustpilotStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#00B67A"
        d="M12 2l2.6 6.6 7.4.4-5.7 4.6 1.9 7.1L12 16.8l-6.2 3.9 1.9-7.1L2 9l7.4-.4L12 2z"
      />
    </svg>
  );
}
