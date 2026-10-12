import { hubVerticalSitemap, urlsetXml, XML_HEADERS } from "@/lib/sitemaps";

export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(urlsetXml(await hubVerticalSitemap("hrt")), { headers: XML_HEADERS });
}
