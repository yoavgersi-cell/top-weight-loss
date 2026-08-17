import { DEFAULT_VERTICAL } from "./config";

// ─────────────────────────────────────────────────────────────────────────────
// Site context
//
// The same page components render in two places:
//   • the legacy root routes  (topweightloss.io/reviews/altrx)   — untouched
//   • the hub routes          (treatmentshub.com/weight-loss/reviews/altrx)
//
// A SiteContext carries the few things that differ between those two: the
// internal-link prefix, the canonical origin/prefix, and the schema branding.
// Threading a context (instead of reading request headers) keeps every page a
// plain, statically-renderable server component — so the live site's ISR
// behavior is completely unchanged.
// ─────────────────────────────────────────────────────────────────────────────

// Flip to `true` the moment topweightloss.io 301-redirects to
// treatmentshub.com/weight-loss. Until then, the hub's weight-loss pages point
// their canonical at the live legacy site so the two domains never compete for
// the same query.
export const WEIGHT_LOSS_MIGRATED = false;

const LEGACY_WL_ORIGIN = "https://www.topweightloss.io";
const HUB_ORIGIN = "https://www.treatmentshub.com";

export interface SiteContext {
  vertical: string;
  /** Prefix for internal (relative) links: "" at the legacy root, "/<vertical>" on the hub. */
  prefix: string;
  /** Absolute origin used for canonical / OpenGraph / schema URLs. */
  origin: string;
  /** Path prefix inside the canonical origin: "" for legacy weight-loss, "/<vertical>" otherwise. */
  canonicalPrefix: string;
  /** Bare domain for schema Organization names, e.g. "topweightloss.io". */
  brandDomain: string;
  /** Display name for schema author/publisher, e.g. "TopWeightLoss Team". */
  brandTeam: string;
}

// Legacy root context — reproduces the exact URLs and branding the standalone
// topweightloss.io site emitted before the hub existed. The root routes pass
// this, so their rendered output is byte-for-byte unchanged.
export const ROOT_CONTEXT: SiteContext = {
  vertical: DEFAULT_VERTICAL,
  prefix: "",
  origin: LEGACY_WL_ORIGIN,
  canonicalPrefix: "",
  brandDomain: "topweightloss.io",
  brandTeam: "TopWeightLoss Team",
};

// Context for a page rendered under the hub at /<vertical>/...
export function hubContext(vertical: string): SiteContext {
  // Interim: weight-loss on the hub still canonicalizes to the live legacy site,
  // so only its internal-link prefix differs from the root context.
  if (vertical === DEFAULT_VERTICAL && !WEIGHT_LOSS_MIGRATED) {
    return { ...ROOT_CONTEXT, prefix: `/${vertical}` };
  }
  return {
    vertical,
    prefix: `/${vertical}`,
    origin: HUB_ORIGIN,
    canonicalPrefix: `/${vertical}`,
    brandDomain: "treatmentshub.com",
    brandTeam: "TreatmentsHub Team",
  };
}

// Absolute canonical URL for an internal path (path starts with "/", or "/" for
// the vertical home). e.g. canonicalUrl(ctx, "/reviews/altrx").
export function canonicalUrl(ctx: SiteContext, path: string): string {
  const tail = path === "/" ? "" : path;
  return `${ctx.origin}${ctx.canonicalPrefix}${tail}`;
}

// Internal <Link> href for an internal path.
export function hubLink(ctx: SiteContext, path: string): string {
  if (path === "/") return ctx.prefix || "/";
  return `${ctx.prefix}${path}`;
}
