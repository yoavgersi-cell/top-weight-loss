import type { Metadata } from "next";
import { getConfig } from "@/lib/config-store";
import { ComparisonLayout } from "@/components/comparison-layout";
import { EditorialContent } from "@/components/editorial-content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Best Semaglutide Providers 2026 — Compare GLP-1 Weight Loss Programs",
  description:
    "Compare the top semaglutide weight loss providers of 2026. Side-by-side pricing, medical support, and treatment options for Ozempic and Wegovy alternatives.",
  alternates: {
    canonical: "https://topweightloss.io/semaglutide",
  },
  openGraph: {
    title: "Best Semaglutide Providers 2026 — Compare GLP-1 Programs",
    description:
      "Compare top semaglutide providers side by side. Pricing, medical support, and treatment options.",
    url: "https://topweightloss.io/semaglutide",
  },
};

export default async function SemaglutidePage() {
  const config = await getConfig();

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Best Semaglutide Providers 2026",
    description: "Compare top semaglutide weight loss providers side by side.",
    url: "https://topweightloss.io/semaglutide",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <ComparisonLayout
        config={config}
        heroOverrides={{
          h1: "Best Semaglutide Providers 2026",
          h2: "Compare GLP-1 weight loss programs side by side",
          description:
            "Semaglutide (the active ingredient in Ozempic and Wegovy) is one of the most effective GLP-1 medications for weight loss. Compare providers offering semaglutide treatment below.",
        }}
      >
        <EditorialContent />
      </ComparisonLayout>
    </>
  );
}
