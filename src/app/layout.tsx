import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { DisclosureBar } from "@/components/disclosure-bar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MetaPixel } from "@/components/meta-pixel";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.topweightloss.io"),
  title: {
    default: "Top Weight Loss Providers 2026 — Compare Trusted Providers Side by Side | topweightloss.io",
    template: "%s | topweightloss.io",
  },
  icons: {
    icon: "/favicon.svg",
  },
  description:
    "Compare pricing, medications, medical support, and overall value across the top weight loss providers of 2026. Find the provider that best fits your goals.",
  keywords: [
    "weight loss programs",
    "GLP-1 weight loss",
    "semaglutide providers",
    "tirzepatide weight loss",
    "best weight loss medication 2026",
    "telehealth weight loss",
    "compare weight loss providers",
    "medical weight loss online",
    "ozempic alternatives",
    "wegovy alternatives",
  ],
  openGraph: {
    title: "Top Weight Loss Providers 2026 — Compare Trusted Providers Side by Side",
    description:
      "Compare pricing, medications, medical support, and overall value across the top weight loss providers of 2026.",
    type: "website",
    siteName: "topweightloss.io",
    locale: "en_US",
    url: "https://www.topweightloss.io",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Weight Loss Providers 2026 — Compare Trusted Providers Side by Side",
    description:
      "Compare pricing, medications, medical support, and overall value across the top weight loss providers of 2026.",
  },
  alternates: {
    canonical: "https://www.topweightloss.io",
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
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "topweightloss.io",
              url: "https://www.topweightloss.io",
              logo: "https://www.topweightloss.io/favicon.svg",
              sameAs: [],
            }),
          }}
        />
        <MetaPixel />
        <DisclosureBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
