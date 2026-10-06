// Duplicate comparison URLs that consolidate onto a stronger canonical page.
// The proxy resolves these as a single 301 on every host; page templates use
// the same map to avoid linking to an aliased URL in the first place.
// The key is the alias slug; the value is the canonical slug.
export const SLUG_ALIASES: Record<string, string> = {
  "embody-vs-altrx": "altrx-vs-embody",
  // Sprout battles - reverse orderings collapse to the canonical slug.
  "sprout-vs-embody": "embody-vs-sprout",
  "sprout-vs-altrx": "altrx-vs-sprout",
  "trimrx-vs-sprout": "sprout-vs-trimrx",
  "wellmedr-vs-sprout": "sprout-vs-wellmedr",
  // High-trend reverse orderings for the medvi/ro money battles.
  "trimrx-vs-medvi": "medvi-vs-trimrx",
  "medvi-vs-embody": "embody-vs-medvi",
  "ro-vs-embody": "embody-vs-ro",
  "wellmedr-vs-embody": "embody-vs-wellmedr",
  // Retired/never-built matchups still indexed on the legacy domain with
  // residual impressions (found via the old-domain Pages export). Noom is an
  // app, not a med provider, so the noom matchups route to the programs page;
  // the remaining pairs were never built, so they route to the same neutral
  // multi-provider comparison rather than 301->404. Reverse orderings included.
  // (The embody matchups - embody-vs-noom, embody-vs-found - are in
  // PATH_REDIRECTS below: they rank for the brand query "embody weight loss",
  // so they resolve to the embody review, not the programs page.)
  "altrx-vs-noom": "best-online-weight-loss-programs",
  "noom-vs-altrx": "best-online-weight-loss-programs",
  "noom-vs-ro": "best-online-weight-loss-programs",
  "ro-vs-noom": "best-online-weight-loss-programs",
  "ro-vs-found": "best-online-weight-loss-programs",
  "shed-vs-embody": "best-online-weight-loss-programs",
  "directmeds-vs-wellorithm": "best-online-weight-loss-programs",
  "synergyrx-vs-skinnyrx": "best-online-weight-loss-programs",
  // Never built either (old-domain 28-day Pages export); was 301'ing into a 404.
  "trimrx-vs-shed": "best-online-weight-loss-programs",
  "shed-vs-trimrx": "best-online-weight-loss-programs",
};
