/**
 * Meta Pixel analytics helper.
 * Wraps fbq() calls for type-safety and reusability.
 *
 * Usage:
 *   import { trackEvent } from "@/lib/analytics";
 *   trackEvent("StartMatch");
 *   trackEvent("ProviderClick", { provider: "altrx" });
 */

type MetaPixelEvent =
  | "PageView"
  | "StartMatch"
  | "CompleteMatch"
  | "ProviderClick"
  | "ViewContent";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  event: MetaPixelEvent,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.fbq) {
    if (params) {
      window.fbq("track", event, params);
    } else {
      window.fbq("track", event);
    }
  }
}
