import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function robots(): Promise<MetadataRoute.Robots> {
  // Same deployment, two hosts - point each crawler at its own sitemap.
  const host = (await headers()).get("host") || "";
  const sitemap = host.includes("treatmentshub")
    ? "https://www.treatmentshub.com/sitemap.xml"
    : "https://www.topweightloss.io/sitemap.xml";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap,
  };
}
