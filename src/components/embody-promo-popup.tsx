"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, ShieldCheck, BadgeCheck, Truck } from "lucide-react";
import { trackProviderClick } from "@/lib/analytics";

// Fixed, evergreen countdown — starts from the same duration on every page load
// (a marketing urgency device, not a real deadline).
const START_SECONDS = 5 * 86400 + 21 * 3600 + 52 * 60 + 30;
const APPEAR_AFTER_MS = 4000;

const pad = (n: number) => String(n).padStart(2, "0");

// Mobile-only promo popup for Embody, shown on comparison pages where Embody is
// one of the two providers. Prices come from config (real, CMS-editable) — no
// fabricated numbers. The whole card is a tracked affiliate link; an X dismisses it.
export function EmbodyPromoPopup({
  href,
  price,
  regularPrice,
  unit = "/mo",
  position,
}: {
  href: string;
  price: string;
  regularPrice?: string;
  unit?: string;
  position?: number;
}) {
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);
  const [secs, setSecs] = useState(START_SECONDS);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), APPEAR_AFTER_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const i = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : s)), 1000);
    return () => clearInterval(i);
  }, [visible]);

  if (closed) return null;

  const days = Math.floor(secs / 86400);
  const hrs = Math.floor((secs % 86400) / 3600);
  const mins = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const units: [string, string][] = [
    [pad(days), "Days"],
    [pad(hrs), "Hrs"],
    [pad(mins), "Mins"],
    [pad(s), "Sec"],
  ];

  const onCtaClick = () => {
    trackProviderClick({
      provider_name: "Embody",
      provider_slug: "embody",
      provider_position: position,
      page_type: "battle",
      source_flow: "battle_page",
    });
  };

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-end justify-center p-4 transition-opacity duration-300 sm:hidden ${
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-label="Embody offer"
    >
      {/* Backdrop */}
      <button
        aria-label="Close"
        className="absolute inset-0 h-full w-full cursor-default bg-black/50"
        onClick={() => setClosed(true)}
      />

      {/* Card — the whole thing links out (tracked) */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow sponsored"
        onClick={onCtaClick}
        className={`relative w-full max-w-[400px] overflow-hidden rounded-[26px] shadow-2xl ring-1 ring-white/10 transition-transform duration-300 ${
          visible ? "translate-y-0" : "translate-y-6"
        }`}
        style={{ background: "linear-gradient(150deg, #4d8a86 0%, #1e5e5b 42%, #0d3b39 100%)" }}
      >
        {/* Close */}
        <button
          aria-label="Close"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setClosed(true);
          }}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/25 text-white/90 transition-colors hover:bg-black/40"
        >
          <X className="h-4 w-4" strokeWidth={2.5} />
        </button>

        <div className="px-6 pb-6 pt-7">
          {/* Wordmark */}
          <div className="flex items-end gap-0.5">
            <span className="text-[34px] font-extrabold leading-none tracking-tight text-[#0c2b4e]">embody</span>
            <span className="mb-4 text-[10px] font-bold text-[#0c2b4e]/80">TM</span>
          </div>

          {/* Price */}
          <p className="mt-5 text-[19px] font-medium text-white/90">
            Was <span className="line-through decoration-white/60">{regularPrice ?? price}</span>
          </p>
          <p className="mt-1 font-semibold leading-none text-white">
            <span className="text-[26px]">GLP1 for</span>
            <br />
            <span className="text-[68px] font-extrabold tracking-tight">{price}</span>
            <span className="text-[24px] font-semibold italic text-white/90">{unit}</span>
          </p>

          <div className="my-5 h-px w-full bg-white/20" />

          {/* Countdown */}
          <p className="text-[17px] font-medium text-white/90">Price increases in</p>
          <div className="mt-2.5 flex items-start gap-2">
            {units.map(([val, label], i) => (
              <div key={label} className="flex items-start gap-2">
                <div className="flex flex-col items-center">
                  <div className="flex h-[52px] w-[52px] items-center justify-center rounded-lg bg-black/30 text-[24px] font-extrabold tabular-nums text-white">
                    {val}
                  </div>
                  <span className="mt-1 text-[11px] text-white/70">{label}</span>
                </div>
                {i < units.length - 1 && <span className="mt-3 text-[20px] font-bold text-white/50">:</span>}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-6 flex h-[56px] w-full items-center justify-center gap-2 rounded-full bg-[#3fb6ab] text-[18px] font-bold uppercase tracking-wide text-white shadow-lg transition-colors">
            Start Now &amp; Save
            <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
          </div>

          {/* Trust badges */}
          <div className="mt-5 flex items-stretch justify-between gap-2 text-white/90">
            <div className="flex flex-1 items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[#5fd3c8]" strokeWidth={2} />
              <span className="text-[11px] leading-tight">FDA-Registered Pharmacy</span>
            </div>
            <div className="w-px bg-white/15" />
            <div className="flex flex-1 items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 shrink-0 text-[#5fd3c8]" strokeWidth={2} />
              <span className="text-[11px] leading-tight">Licensed Providers</span>
            </div>
            <div className="w-px bg-white/15" />
            <div className="flex flex-1 items-center gap-1.5">
              <Truck className="h-4 w-4 shrink-0 text-[#5fd3c8]" strokeWidth={2} />
              <span className="text-[11px] leading-tight">Fast &amp; Discrete Shipping</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
