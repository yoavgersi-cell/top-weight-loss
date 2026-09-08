// ───── Geo-region scaffold ─────
//
// The hub serves the US market at the root (treatmentshub.com/<vertical>/...).
// A second market - the UK - lives under a "/uk" path prefix (a SUBDIRECTORY,
// deliberately, so it inherits the domain's authority instead of starting a
// separate .co.uk from zero).
//
// UK is UNPUBLISHED until (a) real, UK-verified provider/price data exists and
// (b) a UK-compliant content model is in place - UK law bans advertising
// prescription-only weight-loss medicines (and even naming them / "GLP-1") to
// the public, so UK content cannot mirror the US price-comparison pages. Until
// then, /uk/* renders a noindex placeholder and never serves US content.
//
// To go live for a region: add its id to PUBLISHED_REGIONS and build the
// region-aware routing/config for it. Everything else keys off this file.

export interface Region {
  id: string; // "us" | "gb"
  /** Path prefix under the hub origin: "" for US (root), "/uk" for GB. */
  pathPrefix: string;
  /** hreflang value for <link rel="alternate"> / metadata languages. */
  hreflang: string;
  /** ISO country for schema (addressCountry, geo.region, applicableCountry). */
  country: string;
  label: string;
}

export const REGIONS: Region[] = [
  { id: "us", pathPrefix: "", hreflang: "en-US", country: "US", label: "United States" },
  { id: "gb", pathPrefix: "/uk", hreflang: "en-GB", country: "GB", label: "United Kingdom" },
];

export const DEFAULT_REGION = "us";

// Live, indexable regions. GB is published: its content is service-framed and
// compliance-safe (no medicine names / "GLP-1" / injection / efficacy), and it
// has its own UK chrome. Individual /uk paths still gate their own robots (only
// built pages are indexable; placeholders stay noindex).
export const PUBLISHED_REGIONS = ["us", "gb"];
export const isPublishedRegion = (id: string): boolean => PUBLISHED_REGIONS.includes(id);

export const regionById = (id: string): Region | undefined => REGIONS.find((r) => r.id === id);
const US_REGION = regionById("us")!;
const GB_REGION = regionById("gb")!;

// The region a hub pathname belongs to, by its leading segment, plus the path
// with the region prefix stripped so downstream vertical routing is unchanged.
// "/uk/weight-loss" -> { region: gb, rest: "/weight-loss" }; anything else -> us.
export function regionFromPathname(pathname: string): { region: Region; rest: string } {
  if (pathname === GB_REGION.pathPrefix || pathname.startsWith(`${GB_REGION.pathPrefix}/`)) {
    return { region: GB_REGION, rest: pathname.slice(GB_REGION.pathPrefix.length) || "/" };
  }
  return { region: US_REGION, rest: pathname };
}

// hreflang language map for a region-relative content path (e.g. "/weight-loss"
// or "/" for the home). Only PUBLISHED regions are advertised, plus an
// x-default pointing at the US version. When GB is published this map grows to
// include en-GB automatically - no per-page changes needed.
export function hreflangLanguages(origin: string, contentPath: string): Record<string, string> {
  const suffix = contentPath === "/" ? "" : contentPath;
  const out: Record<string, string> = {};
  for (const r of REGIONS) {
    if (isPublishedRegion(r.id)) out[r.hreflang] = `${origin}${r.pathPrefix}${suffix}`;
  }
  out["x-default"] = `${origin}${US_REGION.pathPrefix}${suffix}`;
  return out;
}
