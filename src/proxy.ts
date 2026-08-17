import { NextResponse, type NextRequest } from "next/server";

// Serve the hub landing at treatmentshub.com/ without changing topweightloss.io.
// Scoped to the homepage only (matcher below), so it adds no overhead elsewhere
// and the existing site is completely untouched: on any other host the request
// falls straight through.
export function proxy(req: NextRequest) {
  const host = req.headers.get("host") || "";
  if (host.includes("treatmentshub") && req.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/hub", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
