import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { DisclosureBar } from "@/components/disclosure-bar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://topweightloss.io"),
  title: {
    default: "Best Weight Loss Programs 2026 — Compare Top Providers | topweightloss.io",
    template: "%s | topweightloss.io",
  },
  icons: {
    icon: "/favicon.svg",
  },
  description:
    "Compare the top weight loss programs and GLP-1 providers of 2026. Expert rankings, pricing, side-by-side comparisons of semaglutide and tirzepatide telehealth services.",
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
    title: "Best Weight Loss Programs 2026 — Compare Top Providers",
    description:
      "Compare top GLP-1 weight loss providers side by side. Expert rankings, pricing, and honest reviews of semaglutide and tirzepatide programs.",
    type: "website",
    siteName: "topweightloss.io",
    locale: "en_US",
    url: "https://topweightloss.io",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Weight Loss Programs 2026 — Compare Top Providers",
    description:
      "Compare top GLP-1 weight loss providers side by side. Expert rankings, pricing, and honest reviews.",
  },
  alternates: {
    canonical: "https://topweightloss.io",
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
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "topweightloss.io",
              url: "https://topweightloss.io",
              logo: "https://topweightloss.io/favicon.svg",
              sameAs: [],
            }),
          }}
        />
        <DisclosureBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
