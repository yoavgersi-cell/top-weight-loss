import { NextResponse, type NextRequest } from "next/server";
import { isVertical } from "@/lib/config";
import { WEIGHT_LOSS_MIGRATED } from "@/lib/site-context";
import { SLUG_ALIASES } from "@/lib/slug-aliases";
import { PATH_REDIRECTS, VERTICAL_PATH_REDIRECTS } from "@/lib/path-redirects";

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
  "privacy",
  "terms",
  "weight-loss-pills",
  "glp1-pills-vs-injections",
  "ozempic-alternatives",
  "retatrutide-weight-loss",
  "glp1-weight-loss-statistics",
  "cheapest-glp1",
  "switch-from-ozempic",
  "how-to-choose-a-glp1-provider",
  "glp1-provider-support",
  "glp1-shipping-times",
  "glp1-price-changes",
  "glp1-provider-comparison",
  "glp1-bmi-calculator",
  "glp1-cost-calculator",
  "glp1-dose-schedule",
  "black-friday-glp1-deals",
]);

// Duplicate comparison URLs that consolidate onto a stronger canonical page.
// Resolved HERE, in the proxy, rather than via next.config redirects(), so an
// aliased URL collapses to its final destination in a SINGLE 301 on every host.
// Handling it in next.config instead chains an alias hop (308) into the
// migration/prefix hop (301) - a multi-hop redirect Google reports as a
// "Redirect error". The key is the alias slug; the value is the canonical slug.
// Hub-root pages (no vertical prefix, one canonical URL): reviewer profiles
// and the medical review policy.
const ROOT_PAGES = new Set(["reviewers", "medical-review-policy"]);

// SLUG_ALIASES lives in @/lib/slug-aliases so page templates can avoid
// linking to an aliased (redirecting) comparison URL. PATH_REDIRECTS and
// VERTICAL_PATH_REDIRECTS (full-path and per-vertical content redirects) live
// in @/lib/path-redirects for the same reason: the sitemap and llms.txt filter
// against them (Nov 15, 2026 audit F2/F3).

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

    // Apex → www, one hop. Every canonical, sitemap entry and schema URL is on
    // www.treatmentshub.com; the bare host must never serve a 200 copy of the
    // site (Oct 2026: URL Inspection on the bare host read "unknown to Google").
    // Vercel's domain redirect normally handles this; the proxy guarantees it.
    // Oct 11, 2026: widened from the bare apex to every treatmentshub host
    // that is not www - Search Console's crawl stats showed Googlebot probing
    // a random subdomain (aqby3.treatmentshub.com), the wildcard-DNS check it
    // runs; no hostname other than www may ever answer with a 200 copy.
    if (host.split(":")[0] !== "www.treatmentshub.com") {
      const url = req.nextUrl.clone();
      url.protocol = "https:";
      url.host = "www.treatmentshub.com";
      url.port = "";
      return NextResponse.redirect(url, 301);
    }

    // Upper-case paths 301 to lower case: /weight-loss/Reviews answered 200 as
    // a crawlable duplicate of /weight-loss/reviews (Nov 15, 2026 audit, F18).
    // Dotted paths, /_next, /api and /admin never reach here (matcher).
    if (pathname !== pathname.toLowerCase()) {
      const url = req.nextUrl.clone();
      url.pathname = pathname.toLowerCase();
      return NextResponse.redirect(url, 301);
    }

    if (pathname === "/") {
      return NextResponse.rewrite(new URL("/hub", req.url));
    }

    const segments = pathname.split("/").filter(Boolean);
    const first = segments[0];
    const last = segments[segments.length - 1];

    // Full-path content redirect (renamed/consolidated pages) → single 301 to
    // the live successor. Runs before the slug-alias/prefix logic. Keyed by the
    // content-relative path, so strip a vertical prefix first; the target is
    // content-relative and re-prefixes onto the requested vertical.
    const contentPath = isVertical(first) ? `/${segments.slice(1).join("/")}` : pathname;
    if (PATH_REDIRECTS[contentPath] !== undefined) {
      const url = req.nextUrl.clone();
      url.pathname = `/${isVertical(first) ? first : "weight-loss"}${PATH_REDIRECTS[contentPath]}`;
      return NextResponse.redirect(url, 301);
    }
    const verticalRedirect = isVertical(first) ? VERTICAL_PATH_REDIRECTS[first]?.[contentPath] : undefined;
    if (verticalRedirect !== undefined) {
      const url = req.nextUrl.clone();
      url.pathname = `/${first}${verticalRedirect}`;
      return NextResponse.redirect(url, 301);
    }

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

    // Site-level pages that live at the hub root, not under a vertical:
    // reviewer profiles and the medical review policy. Served as-is; a
    // vertical-prefixed form 301s to the bare canonical.
    if (ROOT_PAGES.has(first)) {
      return NextResponse.next();
    }
    if (isVertical(first) && segments[1] && ROOT_PAGES.has(segments[1])) {
      const url = req.nextUrl.clone();
      url.pathname = `/${segments.slice(1).join("/")}`;
      return NextResponse.redirect(url, 301);
    }

    // Nov 16, 2026: the review-analysis pages (built on Trustpilot data) are
    // retired; each 301s to the provider's review page.
    if (isVertical(first) && segments[1] === "review-analysis") {
      const url = req.nextUrl.clone();
      url.pathname = segments[2] ? `/${first}/reviews/${segments[2]}` : `/${first}/reviews`;
      return NextResponse.redirect(url, 301);
    }

    // Already a vertical path - serve it, stripping the prefix only for the
    // shared one-off pages ("/<vertical>/about" → "/about").
    if (isVertical(first)) {
      if (segments.length === 2 && SHARED_ONE_OFF_PAGES.has(segments[1])) {
        // The shared pages canonicalize to their /weight-loss/ URL (the only
        // copy in the sitemap). Oct 14, 2026: another vertical's prefixed form
        // (/hair-loss/disclaimer, /trt/find-your-match) used to answer 200 with
        // a cross-vertical canonical - a duplicate URL for Google to crawl and
        // fold; it now 301s to the canonical in one hop.
        if (first !== "weight-loss") {
          const url = req.nextUrl.clone();
          url.pathname = `/weight-loss/${segments[1]}`;
          return NextResponse.redirect(url, 301);
        }
        return NextResponse.rewrite(new URL(`/${segments[1]}`, req.url));
      }
      return NextResponse.next();
    }

    // The hub landing's own route, reached only by the internal rewrite from
    // "/". A direct request for /hub is a duplicate of the homepage and 301s
    // to it (Nov 15, 2026 audit, F9); the route's own metadata image
    // (/hub/opengraph-image-<hash>) is still served.
    if (first === "hub") {
      if (segments.length === 1) {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url, 301);
      }
      return NextResponse.next();
    }

    // UK region (/uk/*): a subdirectory market that inherits the hub's authority.
    // While GB is unpublished it resolves to the noindex placeholder route at
    // /uk/[[...slug]] - served as-is so it never falls through to the bare-path
    // redirect below (which would 301 it under /weight-loss). When GB goes live,
    // replace this with region-aware routing into the UK content.
    if (first === "uk") {
      // UK section retired (Oct 2026): send any /uk/* URL to the US weight-loss hub.
      const url = req.nextUrl.clone();
      url.pathname = "/weight-loss";
      return NextResponse.redirect(url, 301);
    }

    // Generated metadata image routes have no file extension, so the matcher
    // doesn't exclude them - serve them as-is rather than redirecting the
    // OG/Twitter image URLs into a 404. Next hashes the segment in production
    // (/opengraph-image-12jlf3), which the exact match used to miss (Nov 15,
    // 2026 audit, F17).
    if (last && /^(opengraph|twitter)-image(-\w+)?$/.test(last)) {
      return NextResponse.next();
    }

    // Any other bare path is migrated weight-loss content → normalize it under
    // the /weight-loss prefix so the hub never serves an un-prefixed content URL.
    const url = req.nextUrl.clone();
    url.pathname = `/weight-loss${pathname}`;
    return NextResponse.redirect(url, 301);
  }

  // Legacy hair-loss domain: everything 301s to its /hair-loss/* equivalent on
  // the hub, same single-hop pattern as the weight-loss migration below. The
  // rule only ever fires once the domain is pointed at this deployment, so
  // shipping it ahead of that is a no-op.
  if (host.includes("tophairloss")) {
    const url = req.nextUrl.clone();
    url.protocol = "https:";
    url.host = "www.treatmentshub.com";
    url.port = "";
    url.pathname = url.pathname === "/" ? "/hair-loss" : `/hair-loss${url.pathname}`;
    return NextResponse.redirect(url, 301);
  }

  // Legacy host: 301 to the hub once migrated; a complete no-op until then.
  if (host.includes("topweightloss") && WEIGHT_LOSS_MIGRATED) {
    const url = req.nextUrl.clone();
    url.protocol = "https:";
    url.host = "www.treatmentshub.com";
    url.port = "";
    // Full-path content redirect (renamed/retired pages) resolves in the same
    // single 301 as the migration hop.
    if (PATH_REDIRECTS[url.pathname] !== undefined) {
      url.pathname = `/weight-loss${PATH_REDIRECTS[url.pathname]}`;
      return NextResponse.redirect(url, 301);
    }
    // Resolve a slug alias in the same pass so an aliased legacy URL lands on
    // the canonical hub page in ONE 301 (no alias-hop → migration-hop chain).
    const segments = url.pathname.split("/").filter(Boolean);
    if (segments[0] && ROOT_PAGES.has(segments[0])) {
      return NextResponse.redirect(url, 301);
    }
    const last = segments[segments.length - 1];
    if (last && SLUG_ALIASES[last]) {
      segments[segments.length - 1] = SLUG_ALIASES[last];
      url.pathname = "/" + segments.join("/");
    }
    url.pathname = url.pathname === "/" ? "/weight-loss" : `/weight-loss${url.pathname}`;
    return NextResponse.redirect(url, 301);
  }

  // Any other host - Vercel's *.vercel.app deployment URLs and the production
  // alias among them - serves the same pages as www.treatmentshub.com. Keep
  // them reachable for previews, but never indexable: a 200 copy on another
  // hostname is duplicate content competing with the canonical site.
  // Oct 11, 2026.
  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export const config = {
  // Run on all pages except Next internals, API, admin, and any file with an
  // extension (assets, /sitemap.xml, /robots.txt). Broad enough for both the
  // legacy→hub 301 and the hub's bare-path normalization to be complete, while
  // staying a near-zero-cost pass-through on the legacy host before migration.
  matcher: ["/((?!_next/|api/|admin|.*\\..*).*)"],
};
