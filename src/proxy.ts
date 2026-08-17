import { NextResponse, type NextRequest } from "next/server";
import { isVertical } from "@/lib/config";

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

// The hub (treatmentshub.com) reuses the existing single-vertical site:
//   • "/"                         → the hub landing page
//   • "/<vertical>/<shared-page>" → the shared root page (prefix stripped)
// On any other host (topweightloss.io) every request falls straight through,
// so the live site is completely untouched.
export function proxy(req: NextRequest) {
  const host = req.headers.get("host") || "";
  if (!host.includes("treatmentshub")) return NextResponse.next();

  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    return NextResponse.rewrite(new URL("/hub", req.url));
  }

  // "/<vertical>/<shared-page>" → "/<shared-page>". Only known shared pages are
  // stripped; anything else (real battle/landing slugs) is left for the
  // [battleSlug]/[comparison] route to resolve with its vertical param intact.
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 2 && isVertical(segments[0]) && SHARED_ONE_OFF_PAGES.has(segments[1])) {
    return NextResponse.rewrite(new URL(`/${segments[1]}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    // Two-segment paths only; keeps proxy off deep money routes and assets.
    "/:vertical/:page",
  ],
};
