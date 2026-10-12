import { hubVerticalSitemap, urlsetXml, XML_HEADERS } from "@/lib/sitemaps";

export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(urlsetXml(await hubVerticalSitemap("trt")), { headers: XML_HEADERS });
}
