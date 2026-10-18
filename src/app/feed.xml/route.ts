import { NextResponse } from "next/server";
import { getConfig } from "@/lib/config-store";
import { VERTICALS, VERTICAL_IDS, NOINDEX_ARTICLE_SLUGS, isPublishedVertical, type ArticleData } from "@/lib/config";

// RSS 2.0 feed of every published guide across the live verticals, newest
// update first. Feeds are one of the signals answer engines and Bing use to
// tell that a site publishes dated editorial; the hub had none. Every entry's
// title, description and dates come straight from the article record. Parked
// (noindex) articles are left out, as they are from the sitemap.

export const revalidate = 3600;

const HUB = "https://www.treatmentshub.com";
const NAME_BY_VERTICAL = new Map(VERTICALS.map((v) => [v.id, v.name] as const));
const PARKED = new Set<string>(NOINDEX_ARTICLE_SLUGS);

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function rfc822(iso?: string): string | undefined {
  const d = new Date(iso ?? "");
  return Number.isNaN(d.getTime()) ? undefined : d.toUTCString();
}

const stamp = (a: ArticleData) => Date.parse(a.updatedAt || a.publishedAt || "") || 0;

export async function GET() {
  const entries: { vertical: string; article: ArticleData }[] = [];
  for (const vertical of VERTICAL_IDS) {
    if (!isPublishedVertical(vertical)) continue;
    const config = await getConfig(vertical);
    for (const article of config.articles ?? []) {
      if (PARKED.has(article.slug)) continue;
      entries.push({ vertical, article });
    }
  }
  entries.sort((a, b) => stamp(b.article) - stamp(a.article));
  const items = entries.slice(0, 100);
  const lastBuild = rfc822(items[0]?.article.updatedAt) ?? new Date().toUTCString();

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">`,
    `<channel>`,
    `<title>Treatments Hub - Guides</title>`,
    `<link>${HUB}</link>`,
    `<atom:link href="${HUB}/feed.xml" rel="self" type="application/rss+xml" />`,
    `<description>Independent, medically reviewed guides and provider comparisons across weight loss, hair loss, TRT, HRT and online therapy.</description>`,
    `<language>en-us</language>`,
    `<lastBuildDate>${lastBuild}</lastBuildDate>`,
    ...items.map(({ vertical, article: a }) => {
      const url = `${HUB}/${vertical}/articles/${a.slug}`;
      const pub = rfc822(a.publishedAt) ?? rfc822(a.updatedAt);
      return [
        `<item>`,
        `<title>${esc(a.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        pub ? `<pubDate>${pub}</pubDate>` : "",
        `<category>${esc(NAME_BY_VERTICAL.get(vertical) ?? vertical)}</category>`,
        a.category ? `<category>${esc(a.category)}</category>` : "",
        `<description>${esc(a.description)}</description>`,
        `</item>`,
      ]
        .filter(Boolean)
        .join("");
    }),
    `</channel>`,
    `</rss>`,
  ].join("\n");

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
