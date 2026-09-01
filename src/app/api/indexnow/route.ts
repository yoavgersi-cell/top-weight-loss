import { NextRequest, NextResponse } from "next/server";
import sitemap from "@/app/sitemap";
import { INDEXNOW_KEY, INDEXNOW_HOST } from "@/lib/indexnow";

// IndexNow submitter: collects hub URLs whose sitemap lastmod falls inside
// the freshness window and pushes them to api.indexnow.org, which fans out
// to Bing and every other participating engine (this is also the index that
// feeds Copilot / ChatGPT Search browsing). Triggered by the daily Vercel
// cron (vercel.json) and manually after big content pushes:
//   GET /api/indexnow?token=<key>&since=<hours>   (dry=1 to preview only)
//
// Per the IndexNow spec we submit only recently-changed URLs, never the
// whole sitemap wholesale - repeated bulk submission reads as spam.
export const dynamic = "force-dynamic";

const ENDPOINT = "https://api.indexnow.org/indexnow";
const HUB_ORIGIN = `https://${INDEXNOW_HOST}`;

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const isCron = (req.headers.get("user-agent") || "").includes("vercel-cron");
  if (!isCron && params.get("token") !== INDEXNOW_KEY) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const sinceHours = Math.min(720, Math.max(1, Number(params.get("since")) || 72));
  const cutoff = Date.now() - sinceHours * 3600_000;

  // The sitemap module is host-aware via request headers; on the hub host it
  // returns the full treatmentshub sitemap. Filter to hub URLs modified
  // inside the window - the key file only vouches for this host.
  const entries = await sitemap();
  const urlList = entries
    .filter((e) => e.url.startsWith(HUB_ORIGIN))
    .filter((e) => {
      const lm = e.lastModified ? new Date(e.lastModified).getTime() : 0;
      return lm >= cutoff;
    })
    .map((e) => e.url);

  if (urlList.length === 0) {
    return NextResponse.json({ submitted: 0, sinceHours, note: "no URLs modified inside the window" });
  }

  if (params.get("dry") === "1") {
    return NextResponse.json({ submitted: 0, dry: true, sinceHours, wouldSubmit: urlList.length, urls: urlList });
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: INDEXNOW_HOST,
        key: INDEXNOW_KEY,
        keyLocation: `${HUB_ORIGIN}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    });
    // IndexNow returns 200/202 on acceptance; anything else is worth surfacing.
    return NextResponse.json({
      submitted: urlList.length,
      sinceHours,
      indexnowStatus: res.status,
      ok: res.status === 200 || res.status === 202,
    });
  } catch (err) {
    return NextResponse.json(
      { submitted: 0, sinceHours, error: `indexnow fetch failed: ${err instanceof Error ? err.message : "unknown"}` },
      { status: 502 }
    );
  }
}
