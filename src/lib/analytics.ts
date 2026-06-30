/**
 * Meta Pixel analytics helper.
 *
 * Usage:
 *   import { trackEvent, trackOnce } from "@/lib/analytics";
 *   trackEvent("ProviderClick", { provider: "altrx" });
 *   trackOnce("StartMatch");  // fires only once per session
 */

type MetaPixelEvent =
  | "PageView"
  | "Lead"
  | "StartMatch"
  | "CompleteMatch"
  | "ProviderClick"
  | "ViewContent";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const STANDARD_EVENTS = new Set(["PageView", "Lead", "ViewContent"]);

export function trackEvent(
  event: MetaPixelEvent,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined" || !window.fbq) return;
  const method = STANDARD_EVENTS.has(event) ? "track" : "trackCustom";
  if (params) {
    window.fbq(method, event, params);
  } else {
    window.fbq(method, event);
  }
}

/**
 * Fire an event only once per browser session.
 * Prevents duplicates on refresh or re-render.
 */
/**
 * Track a provider CTA click. Fire-and-forget — never blocks the redirect.
 */
export function trackProviderClick(params: {
  provider_name: string;
  provider_slug: string;
  provider_position?: number;
  page_type: "listing" | "review" | "battle" | "quiz_results";
  source_flow: "main_comparison" | "provider_review" | "battle_page" | "matching_flow";
}) {
  trackEvent("ProviderClick", {
    ...params,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

export function trackOnce(
  event: MetaPixelEvent,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;
  const key = `_fbq_sent_${event}`;
  if (sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key, "1");
  trackEvent(event, params);
}
