// Taboola (Realize) pixel ID. Set NEXT_PUBLIC_TABOOLA_PIXEL_ID in Vercel
// (Project → Settings → Environment Variables) and redeploy; the pixel and
// its events stay off until then. Pixel IDs are public (they ship in page
// source), so an env var is a convenience, not a secret.
export const TABOOLA_PIXEL_ID: string = process.env.NEXT_PUBLIC_TABOOLA_PIXEL_ID ?? "";

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
