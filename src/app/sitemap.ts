import type { MetadataRoute } from "next";
import { getConfig } from "@/lib/config-store";
import { articles } from "@/data/articles";

const BASE_URL = "https://www.topweightloss.io";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const config = await getConfig();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/reviews`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/find-your-match`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/find-your-match-weight-loss`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.2,
    },
  ];

  const reviewPages: MetadataRoute.Sitemap = (config.reviews ?? []).map(
    (review) => ({
      url: `${BASE_URL}/reviews/${review.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  const articlePages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/articles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...articles.map((article) => ({
      url: `${BASE_URL}/articles/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const battlePages: MetadataRoute.Sitemap = (config.battles ?? []).map(
    (battle) => ({
      url: `${BASE_URL}/${battle.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  const landingPageEntries: MetadataRoute.Sitemap = (config.landingPages ?? []).map(
    (lp) => ({
      url: `${BASE_URL}/${lp.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })
  );

  return [...staticPages, ...reviewPages, ...articlePages, ...battlePages, ...landingPageEntries];
}
