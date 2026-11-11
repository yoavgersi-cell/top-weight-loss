import { NextResponse } from "next/server";
import { ED_CHANGE_KIND_LABEL, ED_PRICE_CHANGES_NEWEST, ED_PRICE_DATA_UPDATED, ED_PRICE_INDEX, edChangeId, edChangeKind } from "@/lib/ed-price-index";
import { ED_FEED_PATH, ED_TRACKER_URL, HUB, UNIT_LONG, edChangeHeadline, edEntryUrl, edProviderNames } from "@/lib/ed-price-feed";
import { longDate, rfc822 } from "@/lib/price-feed";

// RSS 2.0 feed of the ED price change log: one item per verified change,
// newest first. Every field comes from ED_PRICE_CHANGELOG / ED_PRICE_INDEX -
// the same records the tracker page renders. Items link to the entry's anchor
// on the tracker page.

export const revalidate = 3600;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const names = await edProviderNames();

  const items = ED_PRICE_CHANGES_NEWEST.map((c) => {
    const name = names.get(c.providerId) ?? c.providerId;
    const row = ED_PRICE_INDEX.find((r) => r.providerId === c.providerId);
    const now = [
      row?.generic && `generic ${row.generic.price} ${UNIT_LONG[row.generic.unit]}: ${row.generic.note}`,
      row?.compounded && `compounded ${row.compounded.price} ${UNIT_LONG[row.compounded.unit]}: ${row.compounded.note}`,
    ].filter(Boolean);
    const description = [c.change, c.source ? `Source: ${c.source}.` : "", now.length ? `Current listing: ${now.join("; ")}.` : ""].filter(Boolean).join(" ");
    return [
      `<item>`,
      `<title>${esc(edChangeHeadline(c, name))}</title>`,
      `<link>${esc(edEntryUrl(c))}</link>`,
      `<guid isPermaLink="false">treatmentshub-ed-price-${edChangeId(c)}</guid>`,
      `<pubDate>${rfc822(c.date)}</pubDate>`,
      `<category>${esc(name)}</category>`,
      `<category>${esc(ED_CHANGE_KIND_LABEL[edChangeKind(c)])}</category>`,
      `<description>${esc(description)}</description>`,
      `</item>`,
    ].join("");
  });

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">`,
    `<channel>`,
    `<title>Treatments Hub ED Treatment Price Tracker</title>`,
    `<link>${ED_TRACKER_URL}</link>`,
    `<atom:link href="${HUB}${ED_FEED_PATH}" rel="self" type="application/rss+xml" />`,
    `<description>Every verified change to the published prices of online ED treatment (generic sildenafil and tadalafil, compounded formulas, nasal spray) at US telehealth providers, dated, with the before and after price. Price data last updated ${esc(longDate(ED_PRICE_DATA_UPDATED))}.</description>`,
    `<language>en-us</language>`,
    `<ttl>720</ttl>`,
    `<lastBuildDate>${rfc822(ED_PRICE_DATA_UPDATED)}</lastBuildDate>`,
    `<image><url>${HUB}/icon.png</url><title>Treatments Hub ED Treatment Price Tracker</title><link>${ED_TRACKER_URL}</link></image>`,
    ...items,
    `</channel>`,
    `</rss>`,
  ].join("\n");

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "X-Robots-Tag": "noindex",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
