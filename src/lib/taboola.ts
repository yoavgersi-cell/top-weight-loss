// Taboola (Realize) pixel ID, from the Realize campaign wizard ("Manually
// add the Taboola Pixel", Oct 18, 2026). Pixel IDs are public - they ship in
// every page's source - so it lives in code; NEXT_PUBLIC_TABOOLA_PIXEL_ID
// overrides it (set it to "off" to disable without a code change).
const DEFAULT_TABOOLA_PIXEL_ID = "2126966";
const envId = process.env.NEXT_PUBLIC_TABOOLA_PIXEL_ID;
export const TABOOLA_PIXEL_ID: string = envId === "off" ? "" : envId || DEFAULT_TABOOLA_PIXEL_ID;

// Event names used for Realize conversion rules. Create each rule in Realize
// as type "Event", with this exact name.
export const TABOOLA_EVENTS = {
  /** Outbound click on a provider CTA ("Visit Site") - the site's conversion. */
  providerClick: "provider_click",
  /** Quiz finished with a recommendation shown. */
  completeMatch: "complete_match",
  /** Quiz started. */
  startMatch: "start_match",
} as const;

declare global {
  interface Window {
    _tfa?: Array<Record<string, unknown>>;
    __tfaFirstPageViewDone?: boolean;
  }
}

/** Push a named event to the Taboola pixel. No-op when the pixel is off. */
export function taboolaEvent(name: string) {
  if (!TABOOLA_PIXEL_ID || typeof window === "undefined") return;
  window._tfa = window._tfa || [];
  window._tfa.push({ notify: "event", name, id: Number(TABOOLA_PIXEL_ID) });
}
