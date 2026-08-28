"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { trackProviderClick } from "@/lib/analytics";
import type { PromoPopupSpec } from "@/lib/promo-popups";

const APPEAR_AFTER_MS = 8000;
const pad = (n: number) => String(n).padStart(2, "0");

// Mobile-only promo popup, shown on comparison pages where the popup's provider
// is featured. Renders the provider's supplied creative, centered, and - when
// the spec carries a timer - overlays a live countdown on its printed timer
// boxes. Appears at most once per browser session, a few seconds after load.
// The whole image is a tracked affiliate link; only the X closes it.
export function PromoPopup({
  spec,
  href,
  position,
}: {
  spec: PromoPopupSpec;
  href: string;
  position?: number;
}) {
  // `open` mounts the DOM only when the popup is due - before that nothing
  // renders, so the creatives don't download during page load (an <img> that
  // is merely opacity-0 or display:none still downloads and hurts LCP).
  // `visible` flips one frame later to play the fade/scale-in transition.
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);
  const [secs, setSecs] = useState(spec.timer?.startSeconds ?? spec.desktop?.timer?.startSeconds ?? 0);

  useEffect(() => {
    // One promo popup per session across the whole site.
    try {
      if (sessionStorage.getItem("promoPopupSeen")) return;
    } catch {
      // sessionStorage unavailable - show normally.
    }
    const t = setTimeout(() => {
      setOpen(true);
      try {
        sessionStorage.setItem("promoPopupSeen", "1");
      } catch {
        // ignore
      }
    }, APPEAR_AFTER_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [open]);

  useEffect(() => {
    if (!visible || (!spec.timer && !spec.desktop?.timer)) return;
    const i = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : s)), 1000);
    return () => clearInterval(i);
  }, [visible, spec.timer, spec.desktop?.timer]);

  if (closed || !open) return null;

  const countdown = (startAdjusted: number) => [
    pad(Math.floor(startAdjusted / 86400)),
    pad(Math.floor((startAdjusted % 86400) / 3600)),
    pad(Math.floor((startAdjusted % 3600) / 60)),
    pad(startAdjusted % 60),
  ];

  // One creative card (image + live timer overlay + close button). Rendered
  // once for mobile and, when the spec carries a desktop creative, once more
  // for sm+ - each with its own per-image timer coordinates.
  const card = (image: string, timer: PromoPopupSpec["timer"], maxW: string, show: string) => (
    <div
      className={`${show} relative w-full ${maxW} transition-transform duration-300 ${
        visible ? "scale-100" : "scale-95"
      }`}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow sponsored"
        onClick={() =>
          trackProviderClick({
            provider_name: spec.providerName,
            provider_slug: spec.providerId,
            provider_position: position,
            page_type: "battle",
            source_flow: "battle_page",
          })
        }
        className="relative block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={spec.alt} className="block h-auto w-full rounded-[24px] shadow-2xl" />
        {/* Live countdown overlay - sits over the creative's printed timer boxes */}
        {timer &&
          countdown(secs).map((v, i) => (
            <span
              key={i}
              className="absolute flex items-center justify-center font-extrabold tabular-nums text-white"
              style={{
                left: timer.boxes[i].left,
                top: timer.top,
                width: timer.width,
                height: timer.height,
                background: timer.background,
                borderRadius: "8px",
                fontSize: timer.fontSize ?? "clamp(17px, 5.4vw, 26px)",
              }}
            >
              {v}
            </span>
          ))}
      </a>

      {/* Close - the only way to dismiss the popup */}
      <button
        aria-label="Close"
        onClick={() => setClosed(true)}
        className="absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/80 text-white shadow-lg ring-2 ring-white/70 transition-colors hover:bg-black"
      >
        <X className="h-6 w-6" strokeWidth={2.5} />
      </button>
    </div>
  );

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center px-2 py-4 transition-opacity duration-300 ${
        spec.desktop ? "" : "sm:hidden"
      } ${visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      role="dialog"
      aria-label={`${spec.providerName} offer`}
    >
      {/* Backdrop - dims the page but does NOT close (exit is via the X only) */}
      <div className="absolute inset-0 h-full w-full bg-black/50" />

      {card(spec.image, spec.timer, "max-w-[430px]", spec.desktop ? "sm:hidden" : "")}
      {spec.desktop && card(spec.desktop.image, spec.desktop.timer, "max-w-[780px]", "hidden sm:block")}
    </div>
  );
}
