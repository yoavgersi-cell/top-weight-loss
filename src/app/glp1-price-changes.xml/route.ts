import { NextResponse } from "next/server";
import { CHANGE_KIND_LABEL, PRICE_CHANGES_NEWEST, PRICE_DATA_UPDATED, PRICE_INDEX, changeId, changeKind } from "@/lib/price-index";
import { FEED_PATH, HUB, TRACKER_URL, changeHeadline, entryUrl, longDate, providerNames, rfc822 } from "@/lib/price-feed";

// RSS 2.0 feed of the GLP-1 price change log: one item per verified change,
// newest first. Every field comes from PRICE_CHANGELOG / PRICE_INDEX - the
// same records the tracker page renders - so the feed can only say what the
// page says. Items link to the entry's anchor on the tracker page.

export const revalidate = 3600;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const names = await providerNames();

  const items = PRICE_CHANGES_NEWEST.map((c) => {
    const name = names.get(c.providerId) ?? c.providerId;
    const row = PRICE_INDEX.find((r) => r.providerId === c.providerId);
    const now = [
      row?.semaglutide && `semaglutide ${row.semaglutide.price}/month: ${row.semaglutide.note}`,
      row?.tirzepatide && `tirzepatide ${row.tirzepatide.price}/month: ${row.tirzepatide.note}`,
      row?.plan && !row.semaglutide && !row.tirzepatide && `plans ${row.plan.price}/month: ${row.plan.note}`,
    ].filter(Boolean);
    const description = [
      c.change,
      c.source ? `Source: ${c.source}.` : "",
      now.length ? `Current listing: ${now.join("; ")}.` : "",
    ]
      .filter(Boolean)
      .join(" ");
    return [
      `<item>`,
      `<title>${esc(changeHeadline(c, name))}</title>`,
      `<link>${esc(entryUrl(c))}</link>`,
      `<guid isPermaLink="false">treatmentshub-glp1-price-${changeId(c)}</guid>`,
      `<pubDate>${rfc822(c.date)}</pubDate>`,
      `<category>${esc(name)}</category>`,
      `<category>${esc(CHANGE_KIND_LABEL[changeKind(c)])}</category>`,
      `<description>${esc(description)}</description>`,
      `</item>`,
    ].join("");
  });

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">`,
    `<channel>`,
    `<title>Treatments Hub GLP-1 Price Tracker</title>`,
    `<link>${TRACKER_URL}</link>`,
    `<atom:link href="${HUB}${FEED_PATH}" rel="self" type="application/rss+xml" />`,
    `<description>Every verified change to online compounded semaglutide and tirzepatide prices at US telehealth providers, dated, with the before and after price. Price data last updated ${esc(longDate(PRICE_DATA_UPDATED))}.</description>`,
    `<language>en-us</language>`,
    `<ttl>720</ttl>`,
    `<lastBuildDate>${rfc822(PRICE_DATA_UPDATED)}</lastBuildDate>`,
    `<image><url>${HUB}/icon.png</url><title>Treatments Hub GLP-1 Price Tracker</title><link>${TRACKER_URL}</link></image>`,
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
