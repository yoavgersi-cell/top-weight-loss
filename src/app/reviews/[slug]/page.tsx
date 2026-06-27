import type { Metadata } from "next";
import { getConfig } from "@/lib/config-store";
import { RatingBadge } from "@/components/rating-badge";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const config = await getConfig();
  const review = (config.reviews ?? []).find((r) => r.slug === slug);
  const provider = review
    ? config.providers.find((p) => p.id === review.providerId)
    : null;

  if (!review || !provider) {
    return { title: "Review Not Found" };
  }

  const title = `${provider.name} Review 2026 — Is It Worth It?`;
  const description = review.shortSummary;

  return {
    title,
    description,
    alternates: {
      canonical: `https://topweightloss.io/reviews/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://topweightloss.io/reviews/${slug}`,
      type: "article",
    },
  };
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = await getConfig();

  const review = (config.reviews ?? []).find((r) => r.slug === slug);
  if (!review) return notFound();

  const provider = config.providers.find((p) => p.id === review.providerId);
  if (!provider) return notFound();

  // Get rating from ranking config
  const { providerOrder, positions } = config.ranking;
  const rankIndex = providerOrder.indexOf(provider.id);
  const position = rankIndex >= 0 && positions[rankIndex] ? positions[rankIndex] : { score: 8.0, label: "Good" };

  // JSON-LD: Review schema
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    name: `${provider.name} Review`,
    reviewBody: review.reviewIntro,
    author: {
      "@type": "Organization",
      name: "topweightloss.io",
    },
    itemReviewed: {
      "@type": "Product",
      name: provider.name,
      description: review.shortSummary,
      review: {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: position.score,
          bestRating: 10,
          worstRating: 0,
        },
      },
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: position.score,
      bestRating: 10,
      worstRating: 0,
    },
  };

  // JSON-LD: BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://topweightloss.io",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Reviews",
        item: "https://topweightloss.io/reviews",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${provider.name} Review`,
        item: `https://topweightloss.io/reviews/${slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="mx-auto max-w-[800px] px-4 py-12 sm:px-6">
        {/* Header */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-[50px] w-[130px] shrink-0 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={provider.logo}
                  alt={`${provider.name} logo`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#191919]">
                  {provider.name} Review
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  {provider.tagline}
                </p>
              </div>
            </div>
            <RatingBadge
              rating={position.score}
              label={position.label}
            />
          </div>

          <p className="mt-6 text-base leading-relaxed text-gray-700">
            {review.reviewIntro}
          </p>

          <a
            href={provider.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="mt-6 flex h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#0C4B75] text-[16px] font-bold text-white transition-colors hover:bg-[#093d61] sm:w-auto sm:px-8"
          >
            Visit {provider.name}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Key Features */}
        <Section title="Key Features">
          <ul className="space-y-3">
            {review.keyFeatures.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-base text-gray-700"
              >
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#0B5E9E]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </Section>

        {/* Pricing */}
        <Section title="Pricing">
          <p className="text-base leading-relaxed text-gray-700">
            {review.pricingSummary}
          </p>
        </Section>

        {/* Treatment Options */}
        <Section title="Treatment Options">
          <ul className="space-y-3">
            {review.treatmentOptions.map((option) => (
              <li
                key={option}
                className="flex items-start gap-3 text-base text-gray-700"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0C4B75]" />
                {option}
              </li>
            ))}
          </ul>
        </Section>

        {/* Pros & Cons */}
        <Section title="Pros & Cons">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-green-700">
                Pros
              </h4>
              <ul className="space-y-2.5">
                {review.pros.map((pro) => (
                  <li
                    key={pro}
                    className="flex items-start gap-2.5 text-sm text-gray-700"
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-red-700">
                Cons
              </h4>
              <ul className="space-y-2.5">
                {review.cons.map((con) => (
                  <li
                    key={con}
                    className="flex items-start gap-2.5 text-sm text-gray-700"
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-red-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Best For */}
        <Section title="Who It's Best For">
          <ul className="space-y-3">
            {review.bestFor.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-base text-gray-700"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0C4B75]" />
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {/* Final Verdict */}
        <Section title="Final Verdict">
          <p className="text-base leading-relaxed text-gray-700">
            {review.finalVerdict}
          </p>
          <a
            href={provider.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="mt-6 flex h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#0C4B75] text-[16px] font-bold text-white transition-colors hover:bg-[#093d61] sm:w-auto sm:px-8"
          >
            Visit {provider.name}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <h3 className="mb-4 text-xl font-bold text-[#191919]">{title}</h3>
      {children}
    </div>
  );
}
