// Mobile promo-popup registry. Each entry ties a provider to a full-bleed
// creative that appears once per session on comparison pages where that
// provider is featured. Kept in code (not the blob CMS) so it ships and
// resolves without a config round-trip; the resolver below is the single place
// that decides which popup wins when a page features more than one.
//
// `priority` breaks ties: when two featured providers both have a popup (e.g.
// TrimRx vs. Embody), the higher priority shows and the other is suppressed —
// so TrimRx's popup appears on every TrimRx comparison EXCEPT against Embody.
export interface PromoPopupTimer {
  // Evergreen countdown seconds at load; ticks down live from here each session.
  startSeconds: number;
  // Left offsets (% of image width) of the dd/hh/mm/ss boxes, plus their shared
  // top/size/fill — measured against the creative so they overlay its printed
  // timer exactly.
  boxes: { left: string }[];
  top: string;
  width: string;
  height: string;
  background: string;
}

export interface PromoPopupSpec {
  providerId: string;
  providerName: string;
  image: string;
  alt: string;
  priority: number;
  timer?: PromoPopupTimer;
}

export const PROMO_POPUPS: PromoPopupSpec[] = [
  {
    providerId: "embody",
    providerName: "Embody",
    image: "/embodypopup.png",
    alt: "Embody — GLP-1 from $69/mo. Start now and save.",
    priority: 2,
    timer: {
      startSeconds: 5 * 86400 + 21 * 3600 + 52 * 60 + 30,
      boxes: [{ left: "7.6%" }, { left: "21.2%" }, { left: "34.5%" }, { left: "47.9%" }],
      top: "61.6%",
      width: "10.2%",
      height: "7.8%",
      background: "rgb(2,39,43)",
    },
  },
  {
    providerId: "trimrx",
    providerName: "TrimRx",
    image: "/trimrxpopup.png",
    alt: "TrimRx — $140 off all weight loss plans, GLP-1 plans starting at $149. Start now and save.",
    priority: 1,
  },
];

// Highest-priority popup among the providers featured on the current page, or
// null when none of them has one. `providerIds` is the set of providers on the
// page (e.g. the two sides of a comparison).
export function resolvePromoPopup(providerIds: string[]): PromoPopupSpec | null {
  const candidates = PROMO_POPUPS.filter((p) => providerIds.includes(p.providerId));
  if (candidates.length === 0) return null;
  return candidates.sort((a, b) => b.priority - a.priority)[0];
}
