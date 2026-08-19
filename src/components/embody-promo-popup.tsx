"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { trackProviderClick } from "@/lib/analytics";

const APPEAR_AFTER_MS = 10000;
// Evergreen countdown — starts from the same duration each session (matches the
// value printed on the creative), then ticks down live.
const START_SECONDS = 5 * 86400 + 21 * 3600 + 52 * 60 + 30;
const pad = (n: number) => String(n).padStart(2, "0");

// Live countdown boxes, positioned as percentages measured from the creative
// image so they sit exactly over its static timer boxes (same dark fill).
const BOXES = [
  { left: "7.6%" },
  { left: "21.2%" },
  { left: "34.5%" },
  { left: "47.9%" },
];
const BOX_TOP = "61.6%";
const BOX_W = "10.2%";
const BOX_H = "7.8%";

// Mobile-only promo popup for Embody, shown on comparison pages where Embody is
// one of the two providers. Renders Embody's supplied creative, centered, with a
// live countdown overlaid on its timer. Appears once per session, a few seconds
// after load. The whole image is a tracked affiliate link; only the X closes it.
export function EmbodyPromoPopup({ href, position }: { href: string; position?: number }) {
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);
  const [secs, setSecs] = useState(START_SECONDS);

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

  useEffect(() => {
    if (!visible) return;
    const i = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : s)), 1000);
    return () => clearInterval(i);
  }, [visible]);

  if (closed) return null;

  const values = [
    pad(Math.floor(secs / 86400)),
    pad(Math.floor((secs % 86400) / 3600)),
    pad(Math.floor((secs % 3600) / 60)),
    pad(secs % 60),
  ];

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
          className="relative block"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/embodypopup.png"
            alt="Embody — GLP-1 from $69/mo. Start now and save."
            className="block h-auto w-full rounded-[24px] shadow-2xl"
          />
          {/* Live countdown overlay — sits over the creative's static timer boxes */}
          {values.map((v, i) => (
            <span
              key={i}
              className="absolute flex items-center justify-center font-extrabold tabular-nums text-white"
              style={{
                left: BOXES[i].left,
                top: BOX_TOP,
                width: BOX_W,
                height: BOX_H,
                background: "rgb(2,39,43)",
                borderRadius: "8px",
                fontSize: "clamp(17px, 5.4vw, 26px)",
              }}
            >
              {v}
            </span>
          ))}
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
