"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Check } from "lucide-react";
import { ProviderCta } from "./provider-cta";

interface StickyProvider {
  id: string;
  name: string;
  affiliateUrl: string;
}

// Mobile-only sticky CTA bar for battle pages. Both providers are shown side by
// side (the page is objective - no single "winner"), so the reader can act on
// either one from anywhere on the page. It slides up once the reader scrolls
// past the hero, so it never competes with the hero's own CTAs on first paint.
//
// The reassurance strip is deliberately provider-agnostic (no per-provider star
// ratings): some providers carry mediocre Trustpilot scores, and surfacing those
// at the point of action would suppress clicks rather than lift them. Instead it
// leans on friction-reducers that are true for every GLP-1 telehealth provider.
export function BattleStickyCta({ p1, p2 }: { p1: StickyProvider; p2: StickyProvider }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 sm:hidden transition-transform duration-300 ease-out ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <div className="overflow-hidden rounded-t-2xl border-t border-gray-200 bg-white/95 shadow-[0_-6px_24px_rgba(0,0,0,0.10)] backdrop-blur">
        {/* Brand accent line */}
        <div className="h-[3px] bg-gradient-to-r from-[#0C4B75] via-[#1a8cd8] to-[#0C4B75]" />

        <div className="px-3 pt-2.5 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          {/* Reassurance strip - evergreen, always-positive, provider-agnostic */}
          <div className="mb-2.5 flex items-center justify-center gap-1.5 text-[11px] font-medium text-gray-500">
            <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2.5} />
            <span>100% online</span>
            <span className="text-gray-300">·</span>
            <span>Doctor-prescribed</span>
            <span className="text-gray-300">·</span>
            <span>Cancel anytime</span>
          </div>

          {/* Both providers - equal weight */}
          <div className="grid grid-cols-2 gap-2.5">
            {[p1, p2].map((p) => (
              <ProviderCta
                key={p.id}
                href={p.affiliateUrl}
                providerName={p.name}
                providerSlug={p.id}
                pageType="battle"
                sourceFlow="battle_page"
                className="flex h-[48px] items-center justify-center gap-1.5 rounded-xl bg-gradient-to-b from-[#0C4B75] to-[#093d61] px-2 text-[14px] font-bold text-white shadow-sm transition-transform active:scale-[0.98]"
              >
                <span className="truncate">Visit {p.name}</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
              </ProviderCta>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
