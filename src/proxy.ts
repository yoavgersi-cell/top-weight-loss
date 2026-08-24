import { NextResponse, type NextRequest } from "next/server";
import { isVertical } from "@/lib/config";
import { WEIGHT_LOSS_MIGRATED } from "@/lib/site-context";

// Single-segment pages that are shared across the hub rather than owned by a
// vertical's CMS config (the quiz, editorial guides, and static info pages).
// The dynamic money pages (/reviews, /articles, battle comparisons) are served
// by real nested routes under [battleSlug] and are intentionally NOT listed
// here - they must keep their own vertical param.
const SHARED_ONE_OFF_PAGES = new Set([
  "find-your-match",
  "find-your-match-weight-loss",
  "about",
  "how-we-rank",
  "disclaimer",
  "weight-loss-pills",
  "glp1-pills-vs-injections",
  "ozempic-alternatives",
  "retatrutide-weight-loss",
  "glp1-weight-loss-statistics",
  "cheapest-glp1",
  "switch-from-ozempic",
]);

// Duplicate comparison URLs that consolidate onto a stronger canonical page.
// Resolved HERE, in the proxy, rather than via next.config redirects(), so an
// aliased URL collapses to its final destination in a SINGLE 301 on every host.
// Handling it in next.config instead chains an alias hop (308) into the
// migration/prefix hop (301) - a multi-hop redirect Google reports as a
// "Redirect error". The key is the alias slug; the value is the canonical slug.
const SLUG_ALIASES: Record<string, string> = {
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
};

// One deployment serves two hosts:
//
//   • treatmentshub.com - the hub. "/" is the hub landing; everything else must
//     live under a /<vertical>/ prefix. Requests already under a vertical are
//     routed as-is (with shared one-off pages having their prefix stripped to
//     the shared root page); any other bare path is legacy weight-loss content
//     and is 301'd under /weight-loss, so the hub only ever serves prefixed URLs.
//
//   • topweightloss.io - the legacy site. Untouched until the migration flag is
//     flipped, then every path 301-redirects to its /weight-loss/* equivalent
//     on the hub. Dotted paths (/sitemap.xml, /robots.txt) plus /api and /admin
//     are excluded by the matcher so they keep serving.
export function proxy(req: NextRequest) {
  const host = req.headers.get("host") || "";

  if (host.includes("treatmentshub")) {
    const { pathname } = req.nextUrl;

    if (pathname === "/") {
      return NextResponse.rewrite(new URL("/hub", req.url));
    }

    const segments = pathname.split("/").filter(Boolean);
    const first = segments[0];
    const last = segments[segments.length - 1];

    // Canonical-slug alias → single 301 to the canonical page. Runs before the
    // vertical/prefix logic so both the bare legacy form (/embody-vs-altrx) and
    // the prefixed form (/weight-loss/embody-vs-altrx) resolve in one hop. Alias
    // targets are weight-loss battle pages, so a bare path prefixes to
    // /weight-loss; an already-prefixed path keeps its own vertical.
    if (last && SLUG_ALIASES[last]) {
      const url = req.nextUrl.clone();
      url.pathname = isVertical(first)
        ? `/${first}/${SLUG_ALIASES[last]}`
        : `/weight-loss/${SLUG_ALIASES[last]}`;
      return NextResponse.redirect(url, 301);
    }

    // Already a vertical path - serve it, stripping the prefix only for the
    // shared one-off pages ("/<vertical>/about" → "/about").
    if (isVertical(first)) {
      if (segments.length === 2 && SHARED_ONE_OFF_PAGES.has(segments[1])) {
        return NextResponse.rewrite(new URL(`/${segments[1]}`, req.url));
      }
      return NextResponse.next();
    }

    // The hub landing's own route (rewritten from "/").
    if (first === "hub") {
      return NextResponse.next();
    }

    // Generated metadata image routes (e.g. /opengraph-image) have no file
    // extension, so the matcher doesn't exclude them - serve them as-is rather
    // than redirecting the OG/Twitter image URLs into a 404.
    if (last === "opengraph-image" || last === "twitter-image") {
      return NextResponse.next();
    }

    // Any other bare path is migrated weight-loss content → normalize it under
    // the /weight-loss prefix so the hub never serves an un-prefixed content URL.
    const url = req.nextUrl.clone();
    url.pathname = `/weight-loss${pathname}`;
    return NextResponse.redirect(url, 301);
  }

  // Legacy host: 301 to the hub once migrated; a complete no-op until then.
  if (host.includes("topweightloss") && WEIGHT_LOSS_MIGRATED) {
    const url = req.nextUrl.clone();
    url.protocol = "https:";
    url.host = "www.treatmentshub.com";
    // Resolve a slug alias in the same pass so an aliased legacy URL lands on
    // the canonical hub page in ONE 301 (no alias-hop → migration-hop chain).
    const segments = url.pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1];
    if (last && SLUG_ALIASES[last]) {
      segments[segments.length - 1] = SLUG_ALIASES[last];
      url.pathname = "/" + segments.join("/");
    }
    url.pathname = url.pathname === "/" ? "/weight-loss" : `/weight-loss${url.pathname}`;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  // Run on all pages except Next internals, API, admin, and any file with an
  // extension (assets, /sitemap.xml, /robots.txt). Broad enough for both the
  // legacy→hub 301 and the hub's bare-path normalization to be complete, while
  // staying a near-zero-cost pass-through on the legacy host before migration.
  matcher: ["/((?!_next/|api/|admin|.*\\..*).*)"],
};
