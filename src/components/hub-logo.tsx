"use client";

import { useEffect, useRef, useState } from "react";
import { TreatmentsHubWordmark } from "@/components/treatments-hub-wordmark";

// Renders the real TreatmentsHub logo image, co-branded to the current vertical
// when one exists. Expects files in /public:
//   • treatmentshub.png                 (parent brand - hub landing)
//   • treatmentshub-<vertical>.png      (e.g. treatmentshub-weight-loss.png)
// It tries the vertical-specific lockup first, falls back to the parent logo,
// and finally to the text wordmark - so nothing breaks before the files exist.
export function HubLogo({ vertical }: { vertical: string }) {
  const candidates = vertical
    ? [`/treatmentshub-${vertical}.png`, `/treatmentshub.png`]
    : [`/treatmentshub.png`];

  // Track which candidate failed, scoped to the active vertical so the cascade
  // resets on client navigation without a set-state-in-effect.
  const [failed, setFailed] = useState<{ v: string; idx: number }>({ v: vertical, idx: 0 });
  const idx = failed.v === vertical ? failed.idx : 0;

  // A 404 on the server-rendered <img> fires its error event during HTML
  // parsing, BEFORE React hydrates - so onError alone never sees it and the
  // cascade stalls on a broken image. After mount, a failed image reports
  // complete with naturalWidth 0; advance the cascade when we see that.
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) {
      setFailed({ v: vertical, idx: idx + 1 });
    }
  }, [vertical, idx]);

  if (idx >= candidates.length) {
    return <TreatmentsHubWordmark />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={candidates[idx]}
      alt="TreatmentsHub"
      className="h-[22px] w-auto max-w-[290px] object-contain object-left sm:h-[30px] sm:max-w-none"
      onError={() => setFailed({ v: vertical, idx: idx + 1 })}
    />
  );
}
