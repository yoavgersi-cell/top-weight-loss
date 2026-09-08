import type { Metadata } from "next";
import { HubHome } from "@/components/hub-home";
import { hreflangLanguages } from "@/lib/regions";

export const revalidate = 300;

export const metadata: Metadata = {
  title: {
    absolute: "TreatmentsHub - Compare Online Treatment Providers & Prices",
  },
  description:
    "Compare top online treatment providers across weight loss, hair loss, TRT and HRT - independent rankings on pricing, medical support and real customer reviews.",
  // Region-aware hreflang: en-US + x-default today; gains en-GB automatically
  // when GB joins PUBLISHED_REGIONS. Other pages adopt the same helper as UK
  // content is built.
  alternates: {
    canonical: "https://www.treatmentshub.com",
    languages: hreflangLanguages("https://www.treatmentshub.com", "/"),
  },
  openGraph: {
    title: "TreatmentsHub - Compare Online Treatment Providers & Prices",
    description:
      "Independent, side-by-side comparisons of top online providers across weight loss, hair loss, TRT and HRT.",
    url: "https://www.treatmentshub.com",
    type: "website",
  },
};

export default function HubPage() {
  return <HubHome />;
}
