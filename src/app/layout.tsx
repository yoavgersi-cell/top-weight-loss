import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DisclosureBar } from "@/components/disclosure-bar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MetaPixel } from "@/components/meta-pixel";
import { GoogleAnalytics } from "@/components/google-analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.treatmentshub.com"),
  title: {
    default: "TreatmentsHub - Compare Online Treatment Providers & Prices",
    template: "%s | TreatmentsHub",
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
    title: "TreatmentsHub - Compare Online Treatment Providers & Prices",
    description:
      "Independent, side-by-side comparisons of top online providers across weight loss, hair loss, TRT and HRT.",
    type: "website",
    siteName: "TreatmentsHub",
    locale: "en_US",
    url: "https://www.treatmentshub.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "TreatmentsHub - Compare Online Treatment Providers & Prices",
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
    languages: {
      "en-US": "https://www.treatmentshub.com",
    },
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
        {/* Mark the document as the hub before first paint when served from the
            treatmentshub host, so the shared header/footer can swap to the
            TreatmentsHub brand with no flash. The same cached HTML works on both
            domains because the decision is made client-side at runtime. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(location.hostname.indexOf('treatmentshub')>-1)document.documentElement.setAttribute('data-hub','')}catch(e){}",
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
              name: "TreatmentsHub",
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
              name: "TreatmentsHub",
              url: "https://www.treatmentshub.com",
              description: "Compare trusted treatment providers side by side across weight loss, hair loss, TRT and HRT",
            }),
          }}
        />
        <MetaPixel />
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
        <DisclosureBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
