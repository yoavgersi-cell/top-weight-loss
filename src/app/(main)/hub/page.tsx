import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE } from "@/lib/og";
import { HubHome } from "@/components/hub-home";
import { hreflangLanguages } from "@/lib/regions";

// Content only changes through deploys (which purge the cache), so an hourly
// regeneration is plenty; the previous 5-minute window meant more first-hit
// renders for no freshness gain.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: {
    absolute: "Treatments Hub - Compare Online Treatment Providers",
  },
  description:
    "Compare top online providers for weight loss, hair loss, TRT, HRT, online therapy and ED: independent rankings on pricing, medical support and real reviews.",
  // Region-aware hreflang: en-US + x-default today; gains en-GB automatically
  // when GB joins PUBLISHED_REGIONS. Other pages adopt the same helper as UK
  // content is built.
  alternates: {
    canonical: "https://www.treatmentshub.com",
    languages: hreflangLanguages("https://www.treatmentshub.com", "/"),
  },
  openGraph: { images: [DEFAULT_OG_IMAGE],
    title: "Treatments Hub - Compare Online Treatment Providers",
    description:
      "Independent, side-by-side comparisons of top online providers across weight loss, hair loss, TRT, HRT, online therapy and ED.",
    url: "https://www.treatmentshub.com",
    type: "website",
  },
};

export default function HubPage() {
  return <HubHome />;
}
