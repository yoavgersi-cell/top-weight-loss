import { hubSiteEntries, urlsetXml, XML_HEADERS } from "@/lib/sitemaps";

export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(urlsetXml(hubSiteEntries()), { headers: XML_HEADERS });
}
