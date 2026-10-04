/**
 * Analytics helper - fires events to GA4 (Meta Pixel removed Oct 2026).
 *
 * Usage:
 *   import { trackEvent, trackOnce } from "@/lib/analytics";
 *   trackEvent("ProviderClick", { provider: "altrx" });
 *   trackOnce("StartMatch");  // fires only once per session
 */

type AnalyticsEvent =
  | "PageView"
  | "Lead"
  | "StartMatch"
  | "CompleteMatch"
  | "ProviderClick"
  | "ViewContent"
  | "QuizStep";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function fireGA(event: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, params);
}

export function trackEvent(
  event: AnalyticsEvent,
  params?: Record<string, string | number | boolean>
) {
  fireGA(event, params);
}

/**
 * Track a provider CTA click. Fire-and-forget - never blocks the redirect.
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

/**
 * Fire an event only once per browser session.
 * Prevents duplicates on refresh or re-render.
 */
export function trackOnce(
  event: AnalyticsEvent,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;
  const key = `_evt_sent_${event}`;
  if (sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key, "1");
  trackEvent(event, params);
}
