import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getConfig } from "@/lib/config-store";
import { THREE_WAY_COMPARISONS } from "@/lib/three-way";
import {
  CONTENT_LAST_UPDATED,
  BATTLES_LAST_UPDATED,
  AFFILIATE_PROVIDER_IDS,
  NOINDEX_ARTICLE_SLUGS,
  VERTICAL_IDS,
  DEFAULT_VERTICAL,
  isPublishedVertical,
  type SiteConfig,
} from "@/lib/config";
import { WEIGHT_LOSS_MIGRATED } from "@/lib/site-context";
import { articles } from "@/data/articles";

const BASE_URL = "https://www.topweightloss.io";
const HUB_URL = "https://www.treatmentshub.com";
const FALLBACK_DATE = new Date(CONTENT_LAST_UPDATED);

// Battles share a template-wide floor date (see BATTLES_LAST_UPDATED) - keep
// the sitemap's lastmod in sync with the on-page "Last updated" line.
const battleLastModified = (updatedAt?: string) =>
  updatedAt && updatedAt > BATTLES_LAST_UPDATED ? new Date(updatedAt) : new Date(BATTLES_LAST_UPDATED);

// Weight-loss-specific standalone pages (custom-coded, not CMS-driven). Shared
// across hosts: on the hub they live under /weight-loss/... via the proxy.
const WL_STATIC_PATHS: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "/find-your-match", priority: 0.8, changeFrequency: "monthly" },
  { path: "/find-your-match-weight-loss", priority: 0.8, changeFrequency: "monthly" },
  { path: "/weight-loss-pills", priority: 0.8, changeFrequency: "weekly" },
  { path: "/glp1-pills-vs-injections", priority: 0.8, changeFrequency: "weekly" },
  { path: "/retatrutide-weight-loss", priority: 0.8, changeFrequency: "weekly" },
  { path: "/ozempic-alternatives", priority: 0.8, changeFrequency: "weekly" },
  { path: "/cheapest-glp1", priority: 0.8, changeFrequency: "weekly" },
  { path: "/switch-from-ozempic", priority: 0.8, changeFrequency: "weekly" },
  { path: "/glp1-weight-loss-statistics", priority: 0.7, changeFrequency: "monthly" },
  { path: "/how-we-rank", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about", priority: 0.3, changeFrequency: "monthly" },
  { path: "/disclaimer", priority: 0.2, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // One deployment serves both hosts, so the correct sitemap depends on which
  // domain the crawler asked. Reading the host header makes this route dynamic.
  const host = (await headers()).get("host") || "";
  if (host.includes("treatmentshub")) return hubSitemap();
  return legacySitemap();
}

// ───── treatmentshub.com - the hub sitemap ─────
// Lists the hub landing plus every vertical that has content, under its
// /<vertical>/ prefix. Weight-loss is withheld until the migration flips it
// self-canonical (until then those pages canonicalize to the live legacy site,
// so advertising them here would just point crawlers at duplicate URLs).
async function hubSitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: HUB_URL, lastModified: FALLBACK_DATE, changeFrequency: "weekly", priority: 1 },
  ];

  for (const vertical of VERTICAL_IDS) {
    if (!isPublishedVertical(vertical)) continue; // unpublished skeletons stay out
    if (vertical === DEFAULT_VERTICAL && !WEIGHT_LOSS_MIGRATED) continue;
    const config = await getConfig(vertical);
    if ((config.providers ?? []).length === 0) continue; // nothing to index yet
    entries.push(...verticalEntries(`${HUB_URL}/${vertical}`, config, vertical === DEFAULT_VERTICAL));
  }

  return entries;
}

// Sitemap entries for one vertical, rooted at `base` (origin + /<vertical>).
function verticalEntries(base: string, config: SiteConfig, isWeightLoss: boolean): MetadataRoute.Sitemap {
  const P = (path: string) => `${base}${path}`;

  const entries: MetadataRoute.Sitemap = [
    { url: base, lastModified: FALLBACK_DATE, changeFrequency: "weekly", priority: 0.9 },
    { url: P("/reviews"), lastModified: FALLBACK_DATE, changeFrequency: "weekly", priority: 0.9 },
  ];

  // The articles index only earns a sitemap slot once the vertical actually
  // has articles - an empty "No articles" page is thin content.
  if ((config.articles ?? []).length > 0) {
    entries.push({ url: P("/articles"), lastModified: FALLBACK_DATE, changeFrequency: "weekly", priority: 0.8 });
  }

  // Reviews - only affiliate-provider reviews are indexable (competitor
  // reviews render noindex,follow to keep them out of the index), so only
  // those belong in the sitemap. This matches review-page robots exactly and
  // keeps noindex URLs (e.g. TRT competitors hone/fountain/marek) out of it.
  entries.push(
    ...(config.reviews ?? [])
      .filter((r) => AFFILIATE_PROVIDER_IDS.includes(r.providerId))
      .map((r) => ({
        url: P(`/reviews/${r.slug}`),
        lastModified: r.updatedAt ? new Date(r.updatedAt) : FALLBACK_DATE,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
  );

  entries.push(
    ...(config.articles ?? [])
      .filter((a) => !NOINDEX_ARTICLE_SLUGS.includes(a.slug))
      .map((a) => ({
        url: P(`/articles/${a.slug}`),
        lastModified: new Date(a.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
  );

  entries.push(
    ...(config.battles ?? []).map((b) => ({
      url: P(`/${b.slug}`),
      lastModified: battleLastModified(b.updatedAt),
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

  // Curated 3-way comparisons (weight-loss only) - registry pages, all indexable.
  if (isWeightLoss) {
    entries.push(
      ...THREE_WAY_COMPARISONS.map((t) => ({
        url: P(`/${t.slug}`),
        lastModified: battleLastModified(),
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
  }

  return entries;
}

// ───── topweightloss.io - the legacy sitemap (unchanged) ─────
async function legacySitemap(): Promise<MetadataRoute.Sitemap> {
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
      url: `${BASE_URL}/find-your-match-weight-loss`,
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
  ];

  const reviewPages: MetadataRoute.Sitemap = (config.reviews ?? [])
    // Only affiliate-provider reviews are indexed, so only they belong in the sitemap.
    .filter((review) => AFFILIATE_PROVIDER_IDS.includes(review.providerId))
    .map((review) => ({
      url: `${BASE_URL}/reviews/${review.slug}`,
      lastModified: review.updatedAt ? new Date(review.updatedAt) : FALLBACK_DATE,
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
        lastModified: new Date(article.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
  ];

  const battlePages: MetadataRoute.Sitemap = (config.battles ?? []).map(
    (battle) => ({
      url: `${BASE_URL}/${battle.slug}`,
      lastModified: battleLastModified(battle.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

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
