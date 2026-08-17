import type { Metadata } from "next";
import { HubHome } from "@/components/hub-home";

export const revalidate = 300;

export const metadata: Metadata = {
  title: {
    absolute: "TreatmentsHub — Compare the Best Treatments Side by Side",
  },
  description:
    "Compare top telehealth providers across weight loss, hair loss, TRT, and HRT — ranked on pricing, medical support, and real customer reviews.",
  alternates: { canonical: "https://www.treatmentshub.com" },
  openGraph: {
    title: "TreatmentsHub — Compare the Best Treatments Side by Side",
    description:
      "Independent, side-by-side comparisons of top telehealth providers across every treatment category.",
    url: "https://www.treatmentshub.com",
    type: "website",
  },
};

export default function HubPage() {
  return <HubHome />;
}
