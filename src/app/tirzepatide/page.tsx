import type { Metadata } from "next";
import { getConfig } from "@/lib/config-store";
import { ComparisonLayout } from "@/components/comparison-layout";
import { EditorialContent } from "@/components/editorial-content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Best Tirzepatide Providers 2026 — Compare GLP-1 Weight Loss Programs",
  description:
    "Compare the top tirzepatide weight loss providers of 2026. Side-by-side pricing, medical support, and treatment options for Mounjaro and Zepbound alternatives.",
  alternates: {
    canonical: "https://topweightloss.io/tirzepatide",
  },
  openGraph: {
    title: "Best Tirzepatide Providers 2026 — Compare GLP-1 Programs",
    description:
      "Compare top tirzepatide providers side by side. Pricing, medical support, and treatment options.",
    url: "https://topweightloss.io/tirzepatide",
  },
};

export default async function TirzepatidePage() {
  const config = await getConfig();

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Best Tirzepatide Providers 2026",
    description: "Compare top tirzepatide weight loss providers side by side.",
    url: "https://topweightloss.io/tirzepatide",
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
          h1: "Best Tirzepatide Providers 2026",
          h2: "Compare dual-action GLP-1 weight loss programs",
          description:
            "Tirzepatide (the active ingredient in Mounjaro and Zepbound) targets both GLP-1 and GIP receptors for enhanced weight loss results. Compare providers offering tirzepatide treatment below.",
        }}
      >
        <EditorialContent />
      </ComparisonLayout>
    </>
  );
}
