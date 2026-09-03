import { NextResponse } from "next/server";
import { getConfig } from "@/lib/config-store";
import {
  VERTICALS,
  VERTICAL_IDS,
  DEFAULT_VERTICAL,
  isPublishedVertical,
  type SiteConfig,
} from "@/lib/config";
import { WEIGHT_LOSS_MIGRATED } from "@/lib/site-context";

// llms.txt (llmstxt.org): a curated, human-readable index of the site's most
// useful pages, written for AI answer engines (ChatGPT Search, Perplexity,
// Copilot, Gemini) that look for it. Unlike sitemap.xml this is deliberately
// SHORT and hand-picked - the highest-intent pages per vertical, with one-line
// descriptions - so a model can grasp what we cover and cite the right page.
// Generated from live config so every link and price framing stays real; all
// URLs point at the canonical hub (treatmentshub.com), which is where the
// content now lives post-migration.
export const dynamic = "force-dynamic";

const HUB = "https://www.treatmentshub.com";
const NAME_BY_VERTICAL = new Map(VERTICALS.map((v) => [v.id, v.name] as const));

// One tidy markdown bullet: [Title](absolute url): short description.
function line(title: string, path: string, desc?: string): string {
  const clean = (desc ?? "").replace(/\s+/g, " ").trim();
  const tail = clean ? `: ${clean.length > 110 ? clean.slice(0, 107).trimEnd() + "…" : clean}` : "";
  return `- [${title}](${HUB}${path})${tail}`;
}

function verticalSection(vertical: string, config: SiteConfig): string {
  const base = `/${vertical}`;
  const name = NAME_BY_VERTICAL.get(vertical) ?? vertical;
  const providerName = (id: string) => config.providers?.find((p) => p.id === id)?.name ?? id;

  const out: string[] = [`## ${name}`, ""];
  out.push(line(`Best ${name} providers (${new Date().getFullYear()})`, base, config.hero?.description));

  // Curated landing pages (highest-intent marketing pages), then a few top
  // comparisons and reviews - capped so the file stays a hand-picked index.
  for (const lp of (config.landingPages ?? []).slice(0, 3)) {
    out.push(line(lp.seoTitle.replace(/\s*\|\s*TreatmentsHub\s*$/i, ""), `${base}/${lp.slug}`, lp.seoDescription));
  }
  for (const b of (config.battles ?? []).slice(0, 5)) {
    out.push(line(b.matchupLabel ?? b.title.split(":")[0], `${base}/${b.slug}`, b.description));
  }
  for (const r of (config.reviews ?? []).slice(0, 5)) {
    out.push(line(`${providerName(r.providerId)} review`, `${base}/reviews/${r.slug}`, r.shortSummary));
  }
  out.push("");
  return out.join("\n");
}

export async function GET() {
  const parts: string[] = [
    "# TreatmentsHub",
    "",
    "> Independent, side-by-side comparisons of licensed US online treatment providers across weight loss, hair loss, TRT and HRT - with operator-verified pricing, real customer-review data, and clear editorial verdicts.",
    "",
    "TreatmentsHub compares telehealth providers on source-checked prices and plans. Every price, rating and comparison is verified against the provider or a named public source; where a figure is unavailable we say so rather than estimate. We do not fabricate statistics, reviews, or medical claims, and we do not give medical advice - each page links to the provider for current terms.",
    "",
  ];

  for (const vertical of VERTICAL_IDS) {
    if (!isPublishedVertical(vertical)) continue;
    if (vertical === DEFAULT_VERTICAL && !WEIGHT_LOSS_MIGRATED) continue;
    const config = await getConfig(vertical);
    if ((config.providers ?? []).length === 0) continue;
    parts.push(verticalSection(vertical, config));
  }

  parts.push("## About");
  parts.push("");
  parts.push(line("How we rank", "/how-we-rank", "Our comparison methodology and how we stay objective"));
  parts.push(line("About TreatmentsHub", "/about", "Who we are and how our editorial process works"));
  parts.push("");

  return new NextResponse(parts.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      // Cache at the edge - the content only changes when config does.
      "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
