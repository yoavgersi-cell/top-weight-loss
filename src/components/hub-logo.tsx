"use client";

import { useState } from "react";
import { TreatmentsHubWordmark } from "@/components/treatments-hub-wordmark";

// Renders the real TreatmentsHub logo image, co-branded to the current vertical
// when one exists. Expects files in /public:
//   • treatmentshub.png                 (parent brand — hub landing)
//   • treatmentshub-<vertical>.png      (e.g. treatmentshub-weight-loss.png)
// It tries the vertical-specific lockup first, falls back to the parent logo,
// and finally to the text wordmark — so nothing breaks before the files exist.
export function HubLogo({ vertical }: { vertical: string }) {
  const candidates = vertical
    ? [`/treatmentshub-${vertical}.png`, `/treatmentshub.png`]
    : [`/treatmentshub.png`];

  // Track which candidate failed, scoped to the active vertical so the cascade
  // resets on client navigation without a set-state-in-effect.
  const [failed, setFailed] = useState<{ v: string; idx: number }>({ v: vertical, idx: 0 });
  const idx = failed.v === vertical ? failed.idx : 0;

  if (idx >= candidates.length) {
    return <TreatmentsHubWordmark />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={candidates[idx]}
      alt="TreatmentsHub"
      className="h-[28px] w-auto max-w-[230px] object-contain object-left sm:h-[38px] sm:max-w-[340px]"
      onError={() => setFailed({ v: vertical, idx: idx + 1 })}
    />
  );
}
