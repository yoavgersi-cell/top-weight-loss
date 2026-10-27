// ───── Sitemaps ─────
// Hub (treatmentshub.com): /sitemap.xml is a sitemap index pointing at
// /sitemap-site.xml and one /sitemap-<vertical>.xml per published vertical,
// so Search Console can report indexing per vertical. The legacy host keeps
// a single urlset at /sitemap.xml. All routes are handlers under src/app and
// read from this module; nothing here depends on the request host.
import type { MetadataRoute } from "next";
import { REVIEWERS } from "@/data/reviewers";
import { getConfig } from "@/lib/config-store";
import { THREE_WAY_COMPARISONS } from "@/lib/three-way";
import {
  CONTENT_LAST_UPDATED,
  latestUpdate,
  NOINDEX_ARTICLE_SLUGS,
  NOINDEX_WL_REVIEW_SLUGS,
  NOINDEX_WL_BATTLE_SLUGS,
  VERTICAL_IDS,
  DEFAULT_VERTICAL,
  isPublishedVertical,
  type SiteConfig,
} from "@/lib/config";
import { WEIGHT_LOSS_MIGRATED } from "@/lib/site-context";
import { articles } from "@/data/articles";
import { analysisPath, reviewAnalysisRecords } from "@/lib/review-analysis";

const BASE_URL = "https://www.topweightloss.io";
const HUB_URL = "https://www.treatmentshub.com";
const FALLBACK_DATE = new Date(CONTENT_LAST_UPDATED);

// Per-item last-modified (the item's own updatedAt; stable fallback when none)
// - the same value the on-page "Last updated" line and schema dateModified use.
const flooredLastModified = (updatedAt?: string) => new Date(latestUpdate(updatedAt));

// Weight-loss-specific standalone pages (custom-coded, not CMS-driven). Shared
// across hosts: on the hub they live under /weight-loss/... via the proxy.
const WL_STATIC_PATHS: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "/find-your-match", priority: 0.8, changeFrequency: "monthly" },
  { path: "/glp1-provider-support", priority: 0.8, changeFrequency: "weekly" },
  { path: "/glp1-shipping-times", priority: 0.8, changeFrequency: "weekly" },
  { path: "/glp1-price-changes", priority: 0.8, changeFrequency: "weekly" },
  { path: "/glp1-provider-comparison", priority: 0.8, changeFrequency: "weekly" },
  { path: "/weight-loss-pills", priority: 0.8, changeFrequency: "weekly" },
  { path: "/glp1-pills-vs-injections", priority: 0.8, changeFrequency: "weekly" },
  { path: "/retatrutide-weight-loss", priority: 0.8, changeFrequency: "weekly" },
  { path: "/ozempic-alternatives", priority: 0.8, changeFrequency: "weekly" },
  { path: "/cheapest-glp1", priority: 0.8, changeFrequency: "weekly" },
  { path: "/switch-from-ozempic", priority: 0.8, changeFrequency: "weekly" },
  { path: "/glp1-weight-loss-statistics", priority: 0.8, changeFrequency: "weekly" },
  { path: "/how-to-choose-a-glp1-provider", priority: 0.8, changeFrequency: "weekly" },
  { path: "/glp1-bmi-calculator", priority: 0.8, changeFrequency: "monthly" },
  { path: "/glp1-cost-calculator", priority: 0.8, changeFrequency: "weekly" },
  { path: "/glp1-dose-schedule", priority: 0.8, changeFrequency: "monthly" },
  { path: "/how-we-rank", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about", priority: 0.3, changeFrequency: "monthly" },
  { path: "/disclaimer", priority: 0.2, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.2, changeFrequency: "monthly" },
];

// Custom-coded pages owned by a single non-weight-loss vertical (served at
// /<vertical>/<path> by a static folder under [battleSlug]).
const VERTICAL_STATIC_PATHS: Record<string, { path: string; updatedAt: string }[]> = {
  ed: [{ path: "/ed-cost-index", updatedAt: "2026-10-09" }],
  "hair-loss": [{ path: "/women", updatedAt: "2026-10-22" }],
};

// ───── treatmentshub.com - the hub sitemap ─────
// Lists the hub landing plus every vertical that has content, under its
// /<vertical>/ prefix. Weight-loss is withheld until the migration flips it
// self-canonical (until then those pages canonicalize to the live legacy site,
// so advertising them here would just point crawlers at duplicate URLs).
// Site-level entries: the hub landing, the medical review policy and the
// reviewer profiles. Served as /sitemap-site.xml.
export function hubSiteEntries(): MetadataRoute.Sitemap {
  return [
    { url: HUB_URL, lastModified: FALLBACK_DATE, changeFrequency: "weekly", priority: 1 },
    { url: `${HUB_URL}/medical-review-policy`, lastModified: new Date("2026-10-04"), changeFrequency: "monthly", priority: 0.4 },
    ...REVIEWERS.map((r) => ({
      url: `${HUB_URL}/reviewers/${r.slug}`,
      lastModified: new Date(`${r.since}-01`),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}

// Every URL of one vertical under its /<vertical>/ prefix, or [] when the
// vertical is unpublished, unmigrated or empty. Served as
// /sitemap-<vertical>.xml, one file per vertical so Search Console reports
// coverage per vertical (Oct 12, 2026).
export async function hubVerticalSitemap(vertical: string): Promise<MetadataRoute.Sitemap> {
  if (!VERTICAL_IDS.includes(vertical)) return [];
  if (!isPublishedVertical(vertical)) return []; // unpublished skeletons stay out
  if (vertical === DEFAULT_VERTICAL && !WEIGHT_LOSS_MIGRATED) return [];
  const config = await getConfig(vertical);
  if ((config.providers ?? []).length === 0) return []; // nothing to index yet
  return verticalEntries(`${HUB_URL}/${vertical}`, config, vertical === DEFAULT_VERTICAL);
}

// The verticals that currently have a sitemap file - the sitemap index lists
// exactly these.
export async function hubSitemapVerticals(): Promise<string[]> {
  const out: string[] = [];
  for (const v of VERTICAL_IDS) {
    if ((await hubVerticalSitemap(v)).length > 0) out.push(v);
  }
  return out;
}

// The whole hub in one list (IndexNow submitter).
export async function hubSitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [...hubSiteEntries()];
  for (const v of VERTICAL_IDS) entries.push(...(await hubVerticalSitemap(v)));
  return entries;
}

// ───── XML serializers ─────
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const iso = (d: MetadataRoute.Sitemap[number]["lastModified"]) =>
  d ? new Date(d).toISOString() : undefined;

export function urlsetXml(entries: MetadataRoute.Sitemap): string {
  const body = entries
    .map((e) => {
      const lm = iso(e.lastModified);
      return (
        "<url>" +
        `<loc>${esc(e.url)}</loc>` +
        (lm ? `<lastmod>${lm}</lastmod>` : "") +
        (e.changeFrequency ? `<changefreq>${e.changeFrequency}</changefreq>` : "") +
        (e.priority !== undefined ? `<priority>${e.priority}</priority>` : "") +
        "</url>"
      );
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function sitemapIndexXml(sitemaps: { loc: string; lastmod?: Date }[]): string {
  const body = sitemaps
    .map((s) => `<sitemap><loc>${esc(s.loc)}</loc>${s.lastmod ? `<lastmod>${s.lastmod.toISOString()}</lastmod>` : ""}</sitemap>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
}

export const XML_HEADERS = { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=0, must-revalidate" };

export function newestLastModified(entries: MetadataRoute.Sitemap): Date | undefined {
  const times = entries.map((e) => (e.lastModified ? new Date(e.lastModified).getTime() : 0)).filter((t) => t > 0);
  return times.length ? new Date(Math.max(...times)) : undefined;
}

// Sitemap entries for one vertical, rooted at `base` (origin + /<vertical>).
function verticalEntries(base: string, config: SiteConfig, isWeightLoss: boolean): MetadataRoute.Sitemap {
  const P = (path: string) => `${base}${path}`;

  // Listing pages (vertical home, /reviews, /articles) change whenever one of
  // the items they list changes, so their lastmod is the newest child date -
  // a real value, not a shared constant.
  const newest = (dates: (string | undefined)[]) => {
    const real = dates.filter((d): d is string => !!d).sort();
    return real.length ? new Date(real[real.length - 1]) : FALLBACK_DATE;
  };
  const reviewsNewest = newest((config.reviews ?? []).map((r) => r.updatedAt));
  const articlesNewest = newest((config.articles ?? []).map((a) => a.updatedAt));
  const battlesNewest = newest((config.battles ?? []).map((b) => b.updatedAt));
  const homeNewest = new Date(Math.max(reviewsNewest.getTime(), articlesNewest.getTime(), battlesNewest.getTime()));

  const entries: MetadataRoute.Sitemap = [
    { url: base, lastModified: homeNewest, changeFrequency: "weekly", priority: 0.9 },
    { url: P("/reviews"), lastModified: reviewsNewest, changeFrequency: "weekly", priority: 0.9 },
  ];

  // The articles index only earns a sitemap slot once the vertical actually
  // has articles - an empty "No articles" page is thin content.
  if ((config.articles ?? []).length > 0) {
    entries.push({ url: P("/articles"), lastModified: articlesNewest, changeFrequency: "weekly", priority: 0.8 });
  }
  // Custom-coded pages that belong to one non-weight-loss vertical.
  const verticalId = base.split("/").pop() ?? "";
  for (const s of VERTICAL_STATIC_PATHS[verticalId] ?? []) {
    entries.push({ url: P(s.path), lastModified: new Date(s.updatedAt), changeFrequency: "weekly", priority: 0.8 });
  }

  // Reviews - provider reviews are indexable by default (operator policy, Aug
  // 2026: impressions on every vertical first). Exception: thin filler reviews
  // on weight-loss are noindex and dropped here so they match review-page robots
  // (Sep 2026 crawl-budget pruning).
  entries.push(
    ...(config.reviews ?? [])
      .filter((r) => !(isWeightLoss && NOINDEX_WL_REVIEW_SLUGS.has(r.slug)))
      .map((r) => ({
        url: P(`/reviews/${r.slug}`),
        lastModified: flooredLastModified(r.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
  );

  entries.push(
    ...(config.articles ?? [])
      .filter((a) => !NOINDEX_ARTICLE_SLUGS.includes(a.slug))
      .map((a) => ({
        url: P(`/articles/${a.slug}`),
        lastModified: flooredLastModified(a.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
  );

  entries.push(
    ...(config.battles ?? [])
      .filter((b) => !(isWeightLoss && NOINDEX_WL_BATTLE_SLUGS.has(b.slug)))
      .map((b) => ({
        url: P(`/${b.slug}`),
        lastModified: flooredLastModified(b.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
  );

  entries.push(
    ...(config.landingPages ?? []).map((lp) => ({
      url: P(`/${lp.slug}`),
      lastModified: lp.updatedAt ? new Date(lp.updatedAt) : FALLBACK_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }))
  );

  // Curated 3-way comparisons (weight-loss only). Near-zero search demand, so
  // they're noindex and excluded here (Sep 2026 crawl-budget pruning).
  if (isWeightLoss) {
    entries.push(
      ...THREE_WAY_COMPARISONS.filter((t) => !NOINDEX_WL_BATTLE_SLUGS.has(t.slug)).map((t) => ({
        url: P(`/${t.slug}`),
        lastModified: flooredLastModified(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
    );
  }

  if (isWeightLoss) {
    entries.push(
      ...WL_STATIC_PATHS.map((s) => ({
        url: P(s.path),
        lastModified: FALLBACK_DATE,
        changeFrequency: s.changeFrequency,
        priority: s.priority,
      }))
    );
    // Review-analysis pages: one per provider whose stored review set is
    // large enough (src/lib/review-analysis). Rendered from the registry, so
    // the list here is derived from it too.
    entries.push(
      ...reviewAnalysisRecords().map((r) => ({
        url: P(analysisPath(r.providerId).replace(/^\/weight-loss/, "")),
        lastModified: FALLBACK_DATE,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
    );
  }

  return entries;
}

// ───── topweightloss.io - the legacy sitemap (unchanged, one urlset) ─────
export async function legacySitemap(): Promise<MetadataRoute.Sitemap> {
  const config = await getConfig();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: FALLBACK_DATE,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/reviews`,
      lastModified: FALLBACK_DATE,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/find-your-match`,
      lastModified: FALLBACK_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/weight-loss-pills`,
      lastModified: FALLBACK_DATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/glp1-pills-vs-injections`,
      lastModified: FALLBACK_DATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/retatrutide-weight-loss`,
      lastModified: FALLBACK_DATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ozempic-alternatives`,
      lastModified: FALLBACK_DATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/glp1-weight-loss-statistics`,
      lastModified: FALLBACK_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/how-we-rank`,
      lastModified: FALLBACK_DATE,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: FALLBACK_DATE,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/disclaimer`,
      lastModified: FALLBACK_DATE,
      changeFrequency: "monthly",
      priority: 0.2,
    },
    { url: `${BASE_URL}/privacy`, lastModified: new Date("2026-10-04"), changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms`, lastModified: new Date("2026-10-04"), changeFrequency: "yearly", priority: 0.2 },
  ];

  const reviewPages: MetadataRoute.Sitemap = (config.reviews ?? [])
    // Reviews are indexed by default (operator policy); thin filler reviews are
    // noindex and dropped here too (Sep 2026 crawl-budget pruning).
    .filter((review) => !NOINDEX_WL_REVIEW_SLUGS.has(review.slug))
    .map((review) => ({
      url: `${BASE_URL}/reviews/${review.slug}`,
      lastModified: flooredLastModified(review.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const articlePages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/articles`,
      lastModified: FALLBACK_DATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...articles
      // Drop de-indexed (non-monetizing) articles from the sitemap.
      .filter((article) => !NOINDEX_ARTICLE_SLUGS.includes(article.slug))
      .map((article) => ({
        url: `${BASE_URL}/articles/${article.slug}`,
        lastModified: flooredLastModified(article.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
  ];

  const battlePages: MetadataRoute.Sitemap = (config.battles ?? [])
    .filter((battle) => !NOINDEX_WL_BATTLE_SLUGS.has(battle.slug))
    .map((battle) => ({
      url: `${BASE_URL}/${battle.slug}`,
      lastModified: flooredLastModified(battle.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const landingPageEntries: MetadataRoute.Sitemap = (config.landingPages ?? []).map(
    (lp) => ({
      url: `${BASE_URL}/${lp.slug}`,
      lastModified: lp.updatedAt ? new Date(lp.updatedAt) : FALLBACK_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })
  );

  return [...staticPages, ...reviewPages, ...articlePages, ...battlePages, ...landingPageEntries];
}
