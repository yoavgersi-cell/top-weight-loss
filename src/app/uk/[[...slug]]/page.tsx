import type { Metadata } from "next";
import Link from "next/link";
import { isPublishedRegion } from "@/lib/regions";
import { UkWeightLossPage } from "@/components/pages/uk-weight-loss-page";

// UK region routing. Built, compliant UK pages (e.g. /uk/weight-loss) render
// and are indexable; any other /uk/* path falls back to a noindex "coming soon"
// placeholder. No US content is ever served under /uk.

const UK_ORIGIN = "https://www.treatmentshub.com";
const UK_INDEXABLE: Record<string, { title: string; description: string }> = {
  "weight-loss": {
    title: "Compare UK Weight-Loss Services (2026) | TreatmentsHub",
    description:
      "Compare UK weight-loss services side by side - how you're supported, the process and delivery, programme pricing and verified customer reviews. Independent and honest.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const key = slug?.length === 1 ? slug[0] : "";
  const page = UK_INDEXABLE[key];
  if (page) {
    const url = `${UK_ORIGIN}/uk/${key}`;
    return {
      title: { absolute: page.title },
      description: page.description,
      alternates: { canonical: url, languages: { "en-GB": url } },
      openGraph: { title: page.title, description: page.description, url, type: "website" },
      robots: { index: true, follow: true },
    };
  }
  // Placeholder and any unbuilt /uk path: not indexable.
  return { title: "TreatmentsHub UK", robots: { index: false, follow: false } };
}

export default async function UkRouter({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;

  // Built compliant UK pages.
  if (slug?.length === 1 && slug[0] === "weight-loss") {
    return <UkWeightLossPage />;
  }

  return <UkPlaceholderPage />;
}

function UkPlaceholderPage() {
  // Defensive: if GB is ever marked published without this route being replaced,
  // fail loudly in dev rather than silently serving an empty page.
  const live = isPublishedRegion("gb");

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-[#FAFAFA] px-6 py-20">
      <div className="max-w-[520px] text-center">
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#0C4B75]">
          TreatmentsHub UK
        </p>
        <h1 className="mt-3 text-[26px] font-extrabold leading-tight text-[#191919] sm:text-[32px]">
          We&rsquo;re building our UK guides
        </h1>
        <p className="mt-3 text-[15.5px] leading-relaxed text-gray-500">
          Independent comparisons for UK treatment providers are on the way. In the
          meantime, explore our current guides.
        </p>
        {!live && (
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/weight-loss"
              className="inline-flex h-[44px] items-center justify-center rounded-lg bg-[#0C4B75] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
            >
              Browse our guides
            </Link>
            <Link
              href="/"
              className="text-[14px] font-semibold text-[#0C4B75] hover:underline"
            >
              Back to home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
