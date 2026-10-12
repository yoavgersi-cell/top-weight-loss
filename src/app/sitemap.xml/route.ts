import { headers } from "next/headers";
import { hubSitemapVerticals, hubVerticalSitemap, hubSiteEntries, legacySitemap, newestLastModified, sitemapIndexXml, urlsetXml, XML_HEADERS } from "@/lib/sitemaps";

// One deployment serves two hosts: the hub answers with a sitemap index, the
// legacy host with its single urlset. Reading the host header keeps this
// dynamic (robots.txt points each host at its own /sitemap.xml).
export const dynamic = "force-dynamic";

const HUB_URL = "https://www.treatmentshub.com";

export async function GET() {
  const host = (await headers()).get("host") || "";
  if (!host.includes("treatmentshub")) {
    return new Response(urlsetXml(await legacySitemap()), { headers: XML_HEADERS });
  }
  const sitemaps = [{ loc: `${HUB_URL}/sitemap-site.xml`, lastmod: newestLastModified(hubSiteEntries()) }];
  for (const v of await hubSitemapVerticals()) {
    sitemaps.push({ loc: `${HUB_URL}/sitemap-${v}.xml`, lastmod: newestLastModified(await hubVerticalSitemap(v)) });
  }
  return new Response(sitemapIndexXml(sitemaps), { headers: XML_HEADERS });
}
