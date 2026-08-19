"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { trackProviderClick } from "@/lib/analytics";

const APPEAR_AFTER_MS = 10000;

// Mobile-only promo popup for Embody, shown on comparison pages where Embody is
// one of the two providers. Renders Embody's supplied creative image, centered
// on screen. Appears once per session, a few seconds after load. The whole image
// is a tracked affiliate link; the X (top-right, over the creative's own X) closes it.
export function EmbodyPromoPopup({ href, position }: { href: string; position?: number }) {
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    // Show at most once per browser session.
    try {
      if (sessionStorage.getItem("embodyPromoSeen")) return;
    } catch {
      // sessionStorage unavailable — show normally.
    }
    const t = setTimeout(() => {
      setVisible(true);
      try {
        sessionStorage.setItem("embodyPromoSeen", "1");
      } catch {
        // ignore
      }
    }, APPEAR_AFTER_MS);
    return () => clearTimeout(t);
  }, []);

  if (closed) return null;

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center px-2 py-4 transition-opacity duration-300 sm:hidden ${
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-label="Embody offer"
    >
      {/* Backdrop — dims the page but does NOT close (exit is via the X only) */}
      <div className="absolute inset-0 h-full w-full bg-black/50" />

      {/* Creative — the whole image links out (tracked) */}
      <div
        className={`relative w-full max-w-[430px] transition-transform duration-300 ${
          visible ? "scale-100" : "scale-95"
        }`}
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          onClick={() =>
            trackProviderClick({
              provider_name: "Embody",
              provider_slug: "embody",
              provider_position: position,
              page_type: "battle",
              source_flow: "battle_page",
            })
          }
          className="block"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/embodypopup.png"
            alt="Embody — GLP-1 from $69/mo. Start now and save."
            className="block h-auto max-h-[88vh] w-full rounded-[24px] object-contain shadow-2xl"
          />
        </a>

        {/* Close — the only way to dismiss the popup */}
        <button
          aria-label="Close"
          onClick={() => setClosed(true)}
          className="absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/80 text-white shadow-lg ring-2 ring-white/70 transition-colors hover:bg-black"
        >
          <X className="h-6 w-6" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
