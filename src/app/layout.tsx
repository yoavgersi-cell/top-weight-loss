import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@/components/google-analytics";
import { TaboolaPixel } from "@/components/taboola-pixel";
import { hreflangLanguages } from "@/lib/regions";
import { WEIGHT_LOSS_MIGRATED } from "@/lib/site-context";
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
  // spelling is declared as alternateName. The bare domain was removed from
  // alternateName on Oct 17, 2026: Google was showing "treatmentshub.com" as
  // the site name in results, and listing the domain as an alternate name
  // invites exactly that choice.
  // Inner pages carry no " | Treatments Hub" suffix: it pushed 255 of 279
  // titles past 60 characters (SERP truncation), and Google shows the site
  // name separately from og:site_name / WebSite schema. The homepage title
  // keeps the name.
  title: {
    default: "Treatments Hub - Compare Online Treatment Providers & Prices",
    template: "%s",
  },
  // Icons come from the App Router file convention (app/icon.png, app/apple-icon.png),
  // which serves them at content-hashed URLs so they cache-bust on every update.
  description:
    "Compare top online treatment providers across weight loss, hair loss, TRT, HRT, online therapy and ED - independent rankings on pricing, medical support and real customer reviews.",
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
      "Independent, side-by-side comparisons of top online providers across weight loss, hair loss, TRT, HRT, online therapy and ED.",
    type: "website",
    siteName: "Treatments Hub",
    locale: "en_US",
    url: "https://www.treatmentshub.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Treatments Hub - Compare Online Treatment Providers & Prices",
    description:
      "Independent, side-by-side comparisons of top online providers across weight loss, hair loss, TRT, HRT, online therapy and ED.",
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
        {/* Feed autodiscovery: the RSS feed of every published guide (see
            app/feed.xml). Emitted here rather than via metadata.alternates,
            which pages replace wholesale when they set their own canonical. */}
        <link rel="alternate" type="application/rss+xml" title="Treatments Hub - Guides" href="https://www.treatmentshub.com/feed.xml" />
        {/* The Treatments Hub brand is the default in the server HTML (primary
            domain post-migration - crawlers see it without JS). Only when served
            from the legacy topweightloss host do we mark the document, before
            first paint, so the shared header/footer swap to the TopWeightLoss
            brand with no flash. The same cached HTML works on both domains. */}
        {!WEIGHT_LOSS_MIGRATED && (
          <script
            dangerouslySetInnerHTML={{
              __html:
                "try{if(location.hostname.indexOf('topweightloss')>-1)document.documentElement.setAttribute('data-legacy','')}catch(e){}",
            }}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Treatments Hub",
              alternateName: ["TreatmentsHub"],
              url: "https://www.treatmentshub.com",
              areaServed: { "@type": "Country", name: "United States" },
              email: "contact@treatmentshub.com",
              contactPoint: { "@type": "ContactPoint", email: "contact@treatmentshub.com", contactType: "customer support", availableLanguage: "English" },
              logo: "https://www.treatmentshub.com/treatmentshub.png",
              description: "Independent guides and provider comparisons across weight loss, hair loss, TRT, HRT, online therapy and ED - expert reviews, pricing research, and side-by-side comparisons.",
              sameAs: ["https://www.linkedin.com/company/treatments-hub"],
              // Operator-supplied, Oct 18, 2026. Year only: no founding day on record.
              foundingDate: "2026",
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
              alternateName: ["TreatmentsHub"],
              url: "https://www.treatmentshub.com",
              description: "Compare trusted treatment providers side by side across weight loss, hair loss, TRT, HRT, online therapy and ED",
            }),
          }}
        />
        <GoogleAnalytics />
        <TaboolaPixel />
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
