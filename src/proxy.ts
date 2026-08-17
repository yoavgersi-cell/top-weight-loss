import { NextResponse, type NextRequest } from "next/server";
import { isVertical } from "@/lib/config";
import { WEIGHT_LOSS_MIGRATED } from "@/lib/site-context";

// Single-segment pages that are shared across the hub rather than owned by a
// vertical's CMS config (the quiz, editorial guides, and static info pages).
// The dynamic money pages (/reviews, /articles, battle comparisons) are served
// by real nested routes under [battleSlug] and are intentionally NOT listed
// here — they must keep their own vertical param.
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
]);

// One deployment serves two hosts:
//   • treatmentshub.com — the hub. "/" → the hub landing; "/<vertical>/<shared>"
//     → the shared root page (prefix stripped). Deep money routes are left alone.
//   • topweightloss.io — the legacy site. Untouched until the migration flag is
//     flipped, at which point every path 301-redirects to its /weight-loss/*
//     equivalent on the hub (the file-with-a-dot exclusion in the matcher keeps
//     /sitemap.xml and /robots.txt serving so crawlers still resolve them).
export function proxy(req: NextRequest) {
  const host = req.headers.get("host") || "";

  if (host.includes("treatmentshub")) {
    const { pathname } = req.nextUrl;

    if (pathname === "/") {
      return NextResponse.rewrite(new URL("/hub", req.url));
    }

    // "/<vertical>/<shared-page>" → "/<shared-page>". Only known shared pages
    // are stripped; real battle/landing slugs fall through to their route.
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 2 && isVertical(segments[0]) && SHARED_ONE_OFF_PAGES.has(segments[1])) {
      return NextResponse.rewrite(new URL(`/${segments[1]}`, req.url));
    }

    return NextResponse.next();
  }

  // Legacy host: 301 to the hub once migrated; a complete no-op until then.
  if (host.includes("topweightloss") && WEIGHT_LOSS_MIGRATED) {
    const url = req.nextUrl.clone();
    url.protocol = "https:";
    url.host = "www.treatmentshub.com";
    url.pathname = url.pathname === "/" ? "/weight-loss" : `/weight-loss${url.pathname}`;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  // Run on all pages except Next internals, API, admin, and any file with an
  // extension (assets, /sitemap.xml, /robots.txt). This is broad enough for the
  // legacy→hub 301 to cover every content path once the flag is flipped, while
  // staying a near-zero-cost pass-through before then.
  matcher: ["/((?!_next/|api/|admin|.*\\..*).*)"],
};
