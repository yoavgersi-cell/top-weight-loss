import { NextRequest, NextResponse } from "next/server";
import { getConfig } from "@/lib/config-store";
import { DEFAULT_VERTICAL, isVertical } from "@/lib/config";

// Read-only, unauthenticated copy of the site config for client components
// (the matching quiz). Everything in it is already rendered on public pages;
// writes stay behind the admin-only /api/config PUT. Exists so no client code
// ever needs an admin credential just to read content.
export async function GET(req: NextRequest) {
  const v = req.nextUrl.searchParams.get("vertical");
  const vertical = v && isVertical(v) ? v : DEFAULT_VERTICAL;
  try {
    const config = await getConfig(vertical);
    return NextResponse.json(config, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
