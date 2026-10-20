// Paid-traffic click IDs, passed through to affiliate links so a network
// postback can report the sale back to the ad platform (Taboola Realize
// appends `tblci=<id>` to the landing URL when its click-ID setting is on;
// `click_id` is the generic form). Stored for the session so the ID survives
// a client-side navigation before the provider click.

const KEY = "th_click_id";
const SRC_KEY = "th_click_src";

export function captureClickId(): { id: string; source: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const q = new URLSearchParams(window.location.search);
    const id = q.get("tblci") || q.get("click_id") || q.get("clickid");
    const source = q.get("utm_source") || (q.get("tblci") ? "taboola" : "");
    if (id) {
      sessionStorage.setItem(KEY, id);
      if (source) sessionStorage.setItem(SRC_KEY, source);
      return { id, source };
    }
    const stored = sessionStorage.getItem(KEY);
    return stored ? { id: stored, source: sessionStorage.getItem(SRC_KEY) || "" } : null;
  } catch {
    return null;
  }
}

/**
 * Append the click ID to an affiliate URL in the parameter the network reads:
 * RevOffers (HasOffers-style tracking links) take `aff_sub`/`aff_sub2`; the
 * direct-advertiser links (altRx, Medvi, TrimRx) carry an empty `sub1=` slot.
 * Unknown link shapes are returned unchanged.
 */
export function withClickId(url: string, click: { id: string; source: string } | null): string {
  if (!click || !url || url === "#") return url;
  try {
    const u = new URL(url);
    if (u.hostname.endsWith("revoffers.com")) {
      u.searchParams.set("aff_sub", click.id);
      if (click.source) u.searchParams.set("aff_sub2", click.source);
      return u.toString();
    }
    if (u.searchParams.has("sub1")) {
      if (!u.searchParams.get("sub1")) u.searchParams.set("sub1", click.id);
      return u.toString();
    }
    return url;
  } catch {
    return url;
  }
}
