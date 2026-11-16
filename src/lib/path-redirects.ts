// Full-path redirects for content pages that were renamed or consolidated.
// The proxy resolves these as a single 301; the sitemap and llms.txt consult
// the same maps so a redirecting URL is never advertised (Nov 15, 2026 audit,
// F2/F3: 26 sitemap URLs and 13 llms.txt links were 301s). Moved here from
// src/proxy.ts so both sides read one source of truth.

// Full-path redirects for content pages that were renamed or consolidated (an
// article slug that moved, or one that became a standalone landing page). The
// slug-alias map only rewrites a single trailing segment and re-prefixes
// bare under /weight-loss, so it can't express an article -> article move (which
// must keep the /articles segment) or article -> standalone. These entries fill
// that gap. Keyed by the content-relative path (no vertical prefix); the value
// is content-relative too, so it re-prefixes onto the requested vertical in a
// single 301. All targets are verified-live pages. (Sourced from the old-domain
// Pages export - each key was 301'ing into a 404.)
export const PATH_REDIRECTS: Record<string, string> = {
  // Retired Nov 16, 2026: both guides were built entirely on third-party review
  // data the site no longer presents. The provider comparison is the live page.
  "/glp1-provider-support": "/glp1-provider-comparison",
  "/glp1-shipping-times": "/glp1-provider-comparison",
  // Retired embody battles that still rank on the legacy domain for the brand
  // query "embody weight loss" (embody-vs-noom: 1,131 impressions in the
  // Sep 2026 old-domain export). The relevant live page for that query is the
  // embody review, not the generic programs comparison - so the residual
  // ranking consolidates onto the page that actually answers it.
  "/embody-vs-noom": "/reviews/embody",
  "/noom-vs-embody": "/reviews/embody",
  "/embody-vs-found": "/reviews/embody",
  // Nov 15, 2026 audit (F5): the stored reverse ordering chained 308 ->
  // embody-vs-found -> 301 -> the review. Listed here so it is one hop.
  "/found-vs-embody": "/reviews/embody",
  // Still listed by Bing (Oct 2026 Search Performance export) and 404ing;
  // the embody review is the live page for it.
  "/articles/embody-weight-loss-review": "/reviews/embody",
  // Became a standalone landing page (dropped the /articles segment).
  "/articles/glp1-pills-vs-injections": "/glp1-pills-vs-injections",
  // Renamed article - direct live successor.
  "/articles/online-vs-clinic-weight-loss": "/articles/in-person-vs-online-weight-loss",
  // Nov 8, 2026: Bing AI Performance export shows Copilot citing this slug
  // (6 citations) while it answered 404; the live guide is embody-alternatives.
  "/articles/best-embody-alternatives": "/articles/embody-alternatives",
  // Retired articles with no 1:1 successor -> closest live guide by intent.
  "/articles/noom-vs-glp1-providers": "/best-online-weight-loss-programs",
  "/articles/glp1-benefits-beyond-weight-loss": "/articles/how-glp1-medications-work",
  "/articles/ozempic-face-what-it-is": "/articles/how-glp1-medications-work",
  "/articles/ozempic-before-and-after-weight-loss": "/articles/how-long-for-semaglutide-to-work",
  "/articles/telemedicine-weight-loss-guide": "/articles/choosing-telehealth-weight-loss-provider",
  // Still in Google's Nov 2026 Pages report and 404ing (no PCOS guide on the hub).
  "/articles/glp1-weight-loss-pcos": "/articles/glp1-weight-loss-for-women",
  // In Google's Nov 2026 report (linked from an older page version); no such
  // matchup exists, and the TrimRx alternatives guide compares both.
  "/trimrx-vs-directmeds": "/articles/trimrx-alternatives",
  // Consolidated into the ranking homepage (see article-page.tsx). The page-level
  // redirect still exists as a fallback, but resolving it here turns the
  // legacy 301 -> 308 chain into a single hop. Empty target = the vertical root.
  "/articles/best-weight-loss-telehealth-providers": "",
  // Stale /articles/ copy of a battle slug - same single-hop reason.
  "/articles/altrx-vs-ro": "/altrx-vs-ro",
  // Nov 16, 2026 weekly review: the provider trades as welludr but the review
  // and legit pages live at the wellmedr slugs; both brand-name URLs answered
  // 404 while "welludr" is the converting Bing query. Full-path entries (not
  // SLUG_ALIASES) because the /reviews and /articles segments must be kept.
  "/reviews/welludr": "/reviews/wellmedr",
  "/articles/is-welludr-legit": "/articles/is-wellmedr-legit",
};

// Same idea, scoped to one vertical: content-relative key and target, applied
// only when the request is under that vertical's prefix. Needed where a
// retired slug still exists in another vertical (DirectMeds is a live
// weight-loss review, Hone a live TRT review).
export const VERTICAL_PATH_REDIRECTS: Record<string, Record<string, string>> = {
  "weight-loss": {
    // Oct 9, 2026: SYNNERGY RX removed from the ranking (operator decision).
    "/reviews/synergyrx": "/reviews",
  },
  hrt: {
    // Oct 8, 2026: HRT ranking cut to its three partner providers. The five
    // dropped review pages consolidate onto the reviews index; the two
    // retired comparisons both featured Winona, so they land on its review.
    "/reviews/nurx": "/reviews",
    "/reviews/innerbalance": "/reviews",
    "/reviews/hone": "/reviews",
    "/reviews/wisp": "/reviews",
    "/reviews/directmeds": "/reviews",
    "/hone-vs-winona": "/reviews/winona",
    "/winona-vs-nurx": "/reviews/winona",
  },
};

/** True when `/<vertical><contentPath>` is a URL the proxy 301s away from. */
export const isRedirectedContentPath = (vertical: string, contentPath: string): boolean =>
  PATH_REDIRECTS[contentPath] !== undefined || VERTICAL_PATH_REDIRECTS[vertical]?.[contentPath] !== undefined;
