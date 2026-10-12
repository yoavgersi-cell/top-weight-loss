import { hubVerticalSitemap, urlsetXml, XML_HEADERS } from "@/lib/sitemaps";

export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(urlsetXml(await hubVerticalSitemap("weight-loss")), { headers: XML_HEADERS });
}
