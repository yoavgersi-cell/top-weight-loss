import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MetaPixel } from "@/components/meta-pixel";
import { GoogleAnalytics } from "@/components/google-analytics";
import { hreflangLanguages } from "@/lib/regions";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.treatmentshub.com"),
  // Site name: Google derives the SERP site name from the homepage's WebSite
  // schema `name`, og:site_name and the <title> suffix - all three must agree.
  // The chosen display name is "Treatments Hub" (two words); the one-word
  // spelling and the bare domain are declared as alternateName in the schema.
  title: {
    default: "Treatments Hub - Compare Online Treatment Providers & Prices",
    template: "%s | Treatments Hub",
  },
  // Icons come from the App Router file convention (app/icon.png, app/apple-icon.png),
  // which serves them at content-hashed URLs so they cache-bust on every update.
  description:
    "Compare top online treatment providers across weight loss, hair loss, TRT and HRT - independent rankings on pricing, medical support and real customer reviews.",
  keywords: [
    "treatment comparison",
    "telehealth comparison",
    "compare treatment providers",
    "online weight loss",
    "online hair loss treatment",
    "online TRT",
    "online HRT",
    "menopause treatment online",
  ],
  openGraph: {
    title: "Treatments Hub - Compare Online Treatment Providers & Prices",
    description:
      "Independent, side-by-side comparisons of top online providers across weight loss, hair loss, TRT and HRT.",
    type: "website",
    siteName: "Treatments Hub",
    locale: "en_US",
    url: "https://www.treatmentshub.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Treatments Hub - Compare Online Treatment Providers & Prices",
    description:
      "Independent, side-by-side comparisons of top online providers across weight loss, hair loss, TRT and HRT.",
  },
  other: {
    "geo.region": "US",
    "geo.position": "37.0902;-95.7129",
    "ICBM": "37.0902, -95.7129",
    "content-language": "en-US",
  },
  alternates: {
    canonical: "https://www.treatmentshub.com",
    // hreflang for the home. Region-aware: emits en-US + x-default now, and
    // auto-includes en-GB once GB is added to PUBLISHED_REGIONS. Per-page
    // hreflang is wired the same way when UK content is built.
    languages: hreflangLanguages("https://www.treatmentshub.com", "/"),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* og:site_name on every page. Page-level `openGraph` metadata replaces
            the layout's openGraph object wholesale (no deep merge), which
            silently dropped siteName from most pages - so it is emitted here
            directly, where no page can override it. */}
        <meta property="og:site_name" content="Treatments Hub" />
        {/* The Treatments Hub brand is the default in the server HTML (primary
            domain post-migration - crawlers see it without JS). Only when served
            from the legacy topweightloss host do we mark the document, before
            first paint, so the shared header/footer swap to the TopWeightLoss
            brand with no flash. The same cached HTML works on both domains. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(location.hostname.indexOf('topweightloss')>-1)document.documentElement.setAttribute('data-legacy','')}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Treatments Hub",
              alternateName: ["TreatmentsHub", "treatmentshub.com"],
              url: "https://www.treatmentshub.com",
              areaServed: { "@type": "Country", name: "United States" },
              logo: "https://www.treatmentshub.com/treatmentshub.png",
              description: "Independent guides and provider comparisons across weight loss, hair loss, TRT and HRT - expert reviews, pricing research, and side-by-side comparisons.",
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Treatments Hub",
              alternateName: ["TreatmentsHub", "treatmentshub.com"],
              url: "https://www.treatmentshub.com",
              description: "Compare trusted treatment providers side by side across weight loss, hair loss, TRT and HRT",
            }),
          }}
        />
        <MetaPixel />
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
        {/* Chrome (header/footer) is provided per-region by the route-group
            layouts: (main)/ renders the US chrome, uk/ renders compliant UK
            chrome. The root stays chrome-free so the two never share it. */}
        {children}
      </body>
    </html>
  );
}
