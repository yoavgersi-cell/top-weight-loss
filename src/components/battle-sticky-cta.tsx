"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { ProviderCta } from "./provider-cta";

interface StickyProvider {
  id: string;
  name: string;
  affiliateUrl: string;
}

// Mobile-only sticky CTA bar for battle pages. Both providers are shown side by
// side (the page is objective — no single "winner"), so the reader can act on
// either one from anywhere on the page. It slides up once the reader scrolls
// past the hero, so it never competes with the hero's own CTAs on first paint.
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
      className={`fixed inset-x-0 bottom-0 z-40 sm:hidden transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <div className="border-t border-gray-200 bg-white/95 px-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur">
        <div className="grid grid-cols-2 gap-2.5">
          {[p1, p2].map((p) => (
            <ProviderCta
              key={p.id}
              href={p.affiliateUrl}
              providerName={p.name}
              providerSlug={p.id}
              pageType="battle"
              sourceFlow="battle_page"
              className="flex h-[46px] items-center justify-center gap-1.5 rounded-xl bg-[#0C4B75] px-2 text-[14px] font-bold text-white active:bg-[#093d61]"
            >
              <span className="truncate">Visit {p.name}</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
            </ProviderCta>
          ))}
        </div>
      </div>
    </div>
  );
}
