import type { Metadata } from "next";
import { getConfig } from "@/lib/config-store";
import { RatingBadge } from "@/components/rating-badge";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Weight Loss Provider Reviews — In-Depth Expert Analysis",
  description:
    "Read expert reviews of the top weight loss providers offering GLP-1 medications like semaglutide and tirzepatide. Compare pricing, treatment options, pros and cons.",
  alternates: {
    canonical: "https://topweightloss.io/reviews",
  },
  openGraph: {
    title: "Weight Loss Provider Reviews — In-Depth Expert Analysis",
    description:
      "Read expert reviews of leading weight loss providers. Compare pricing, treatment options, and customer experience.",
    url: "https://topweightloss.io/reviews",
  },
};

export default async function ReviewsPage() {
  const config = await getConfig();
  const { providerOrder, positions } = config.ranking;

  // Build sorted providers list using ranking order
  const sortedProviders = providerOrder
    .map((id, index) => {
      const provider = config.providers.find((p) => p.id === id);
      if (!provider) return null;
      const position = positions[index] || positions[positions.length - 1];
      return { ...provider, rating: position.score, ratingLabel: position.label };
    })
    .filter(Boolean) as Array<{ id: string; name: string; logo: string; rating: number; ratingLabel: string }>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-[#191919] sm:text-4xl">
            Weight Loss Provider Reviews
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600">
            In-depth reviews of the top weight loss providers. Read our expert
            analysis of each program to find the best fit for your goals,
            budget, and lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProviders.map((provider) => {
            const review = (config.reviews ?? []).find(
              (r) => r.providerId === provider.id
            );
            if (!review) return null;

            return (
              <Link
                key={provider.id}
                href={`/reviews/${review.slug}`}
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-[50px] w-[130px] items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={provider.logo}
                    alt={`${provider.name} logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <h2 className="text-lg font-bold text-[#191919]">
                  {provider.name}
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {review.shortSummary}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <RatingBadge
                    rating={provider.rating}
                    label={provider.ratingLabel}
                  />
                  <span className="text-sm font-semibold text-[#0C4B75] group-hover:underline">
                    Read Review
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
