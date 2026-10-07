import { headers } from "next/headers";

// robots.txt as a route handler rather than Next's `robots.ts` metadata
// convention: the convention only knows User-Agent / Allow / Disallow /
// Crawl-delay / Sitemap, and we also publish a Content-Signal line
// (contentsignals.org). The output below is otherwise identical to what the
// convention produced.
//
// Content-Signal declares preferences for how crawled content may be used.
// It is a preference, not an access rule: the Allow line still admits every
// bot. Operator decision, Oct 7, 2026: search yes, use as AI-answer input
// yes (Copilot citations are a primary channel), AI training no.
const CONTENT_SIGNAL = "search=yes, ai-input=yes, ai-train=no";

export const dynamic = "force-dynamic";

export async function GET() {
  // Same deployment, two hosts - point each crawler at its own sitemap.
  const host = (await headers()).get("host") || "";
  const sitemap = host.includes("treatmentshub")
    ? "https://www.treatmentshub.com/sitemap.xml"
    : "https://www.topweightloss.io/sitemap.xml";

  const body = [
    "# Content-Signal expresses how this site's content may be used after it is",
    "# crawled: search = indexing and linking; ai-input = quoting or summarising",
    "# in AI answers; ai-train = training or fine-tuning models. See",
    "# https://contentsignals.org",
    "User-Agent: *",
    `Content-Signal: ${CONTENT_SIGNAL}`,
    "Allow: /",
    "Disallow: /admin",
    "Disallow: /api/",
    "",
    `Sitemap: ${sitemap}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
