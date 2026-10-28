"use client";

import { useEffect, useState } from "react";

// ───── Countdown to Black Friday / Cyber Monday ─────
// Pure clock arithmetic against two fixed dates. Renders the server's
// static day count first (so the page is complete without JavaScript) and
// refines to a live hours/minutes count once mounted.

type Target = { label: string; date: string };

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60) };
}

export function HolidayCountdown({ targets }: { targets: Target[] }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="grid gap-3 sm:grid-cols-2" aria-live="polite">
      {targets.map((t) => {
        // The day starts at 00:00 US Eastern, when most US providers switch promotions.
        const target = new Date(`${t.date}T05:00:00Z`).getTime();
        const diff = now == null ? null : target - now;
        const p = diff == null ? null : parts(diff);
        const passed = diff != null && diff <= 0;
        const pretty = new Date(`${t.date}T12:00:00Z`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" });
        return (
          <div key={t.date} className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-[12px] font-bold uppercase tracking-wide text-gray-500">{t.label}</p>
            <p className="mt-0.5 text-[15px] font-semibold text-[#191919]">{pretty}</p>
            <p className="mt-2 text-[26px] font-extrabold leading-none text-[#0C4B75] [font-variant-numeric:tabular-nums]">
              {p == null ? "—" : passed ? "Now" : `${p.d}d ${p.h}h ${p.m}m`}
            </p>
            <p className="mt-1 text-[12px] text-gray-400">{passed ? "The day has arrived" : "until it starts, US Eastern"}</p>
          </div>
        );
      })}
    </div>
  );
}
