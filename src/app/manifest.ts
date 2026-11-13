import type { MetadataRoute } from "next";

// Web app manifest (Nov 13, 2026 audit): names the site for browsers and
// Lighthouse, and points at the sharp 192/512 icons rendered from the
// monogram source. No PWA behaviour is implied beyond installability.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Treatments Hub",
    short_name: "Treatments Hub",
    description: "Independent comparisons of online treatment providers: weight loss, hair loss, TRT, HRT, online therapy and ED.",
    start_url: "/weight-loss",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#0C4B75",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
