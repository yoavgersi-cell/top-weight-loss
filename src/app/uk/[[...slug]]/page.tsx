import type { Metadata } from "next";
import Link from "next/link";
import { isPublishedRegion } from "@/lib/regions";
import { UkWeightLossPage } from "@/components/pages/uk-weight-loss-page";

// UK region routing. While GB is unpublished (see PUBLISHED_REGIONS) every /uk/*
// path is kept noindex. Built UK pages (e.g. the compliant /uk/weight-loss
// service comparison) render here; everything else falls back to a "coming
// soon" placeholder. No US content is ever served under /uk.

export const metadata: Metadata = {
  title: "TreatmentsHub UK",
  // Never index the UK region until it is published and compliance-reviewed.
  robots: { index: false, follow: false },
};

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
