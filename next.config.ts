import type { NextConfig } from "next";

// Security headers (Nov 9, 2026, after an external header scan found none).
// The CSP is deliberately permissive - any HTTPS origin may serve scripts,
// styles, images, fonts and XHR - so GTM, the chat helper, provider logos and
// blob-storage images keep working. What it does lock down: framing by other
// sites (frame-ancestors 'self'), base-URI and form-action, and plugins
// (object-src 'none'). Tighten per directive only after checking the pages.
const SECURITY_HEADERS = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self' https: data: blob:",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: blob:",
      "style-src 'self' 'unsafe-inline' https:",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https:",
      "connect-src 'self' https: wss:",
      "media-src 'self' https: blob:",
      "frame-src 'self' https:",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self' https:",
      "object-src 'none'",
    ].join("; "),
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "**.blob.vercel-storage.com",
      },
    ],
  },
  // Duplicate-comparison consolidation (e.g. /embody-vs-altrx → /altrx-vs-embody)
  // is handled in the proxy (see SLUG_ALIASES in src/proxy.ts) so the alias
  // collapses in a single 301 instead of chaining with the migration redirect.
};

export default nextConfig;
