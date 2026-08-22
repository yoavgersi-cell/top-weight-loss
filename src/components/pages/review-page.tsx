import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight, Users, Clock, Shield, Star } from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { CONTENT_LAST_UPDATED, AFFILIATE_PROVIDER_IDS } from "@/lib/config";
import {
  type SiteContext,
  canonicalUrl,
  hubLink,
} from "@/lib/site-context";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProviderCta } from "@/components/provider-cta";
import { TrustpilotCarousel } from "@/components/trustpilot-carousel";
import { ExpertByline } from "@/components/expert-byline";
import { LastUpdated } from "@/components/last-updated";
import { PromoPopup } from "@/components/promo-popup";
import { resolvePromoPopup } from "@/lib/promo-popups";
import { MedicalSources, TrustDisclosure } from "@/components/medical-sources";
import { notFound } from "next/navigation";

// Per-provider SEO overrides for reviews with distinctive search demand.
// Code-controlled (not CMS-merged) so they reliably target trending queries -
// e.g. surging "embody reviews" and "embody glp1".
const REVIEW_SEO_OVERRIDES: Record<string, { title: string; description: string }> = {
  embody: {
    title: "embody Reviews 2026: GLP-1 Cost, Real Results & Is It Worth It?",
    description:
      "embody GLP-1 reviews: compounded semaglutide & tirzepatide, shipped in 1-2 days with no insurance and LegitScript certification. Real customer reviews, pricing, pros & cons - and is embody worth it?",
  },
  medvi: {
    title: "Medvi Reviews 2026: Is It Legit? Cost, Real Results & Verdict",
    description:
      "Medvi weight loss reviews: transparent, all-inclusive GLP-1 pricing and the personal provider support customers rave about on Trustpilot. Is Medvi legit and worth it? Real customer reviews, cost, pros & cons.",
  },
  altrx: {
    title: "altRx Reviews 2026: Is It Legit? GLP-1 Cost, Results & Verdict",
    description:
      "altRx reviews: compounded semaglutide & tirzepatide plus brand-name Zepbound & Wegovy, no insurance and Buy Now, Pay Later. Is altRx legit and worth it? Real customer reviews, pricing, pros & cons.",
  },
  trimrx: {
    title: "trimrx Reviews 2026: Is It Legit? Cost, Real Results & Verdict",
    description:
      "trimrx reviews: budget-friendly compounded semaglutide and tirzepatide, flexible plans with no long-term contract, and clinical support included. Is trimrx legit and worth it? Real customer reviews, cost, pros & cons.",
  },
  shed: {
    title: "Shed Reviews 2026: Is It Legit? Cost, Real Results & Verdict",
    description:
      "Shed reviews: compounded GLP-1 (semaglutide & tirzepatide) with health coaching and a money-back guarantee. Is Shed legit and worth it? Real customer reviews, cost, pros & cons.",
  },
  directmeds: {
    title: "DirectMeds Reviews 2026: Is It Legit? Cost, Results & Verdict",
    description:
      "DirectMeds reviews: doctor-prescribed GLP-1 as injections or needle-free oral drops, free 1-2 day shipping and no membership. Is DirectMeds legit and worth it? Real customer reviews, cost, pros & cons.",
  },
  wellmedr: {
    title: "wellmedr Reviews 2026: Is It Legit? Cost, Results & Verdict",
    description:
      "wellmedr reviews: compounded GLP-1 used by 1M+ patients, board-certified specialists and a weight-loss warranty. Is wellmedr legit and worth it? Real customer reviews, cost, pros & cons.",
  },
  healthrx: {
    title: "HealthRx Reviews 2026: Is It Legit? $99/mo GLP-1 Examined",
    description:
      "HealthRx reviews: semaglutide from $99/mo (12-month prepaid), overnight cold-chain shipping, LegitScript-certified. Is HealthRx legit and worth the prepay? Cost, pros & cons.",
  },
};

// "Is [brand] legit?" trust block - targets the high-intent "is X legit" query
// cluster inside the existing review page (no separate page → no cannibalization).
// Only defined for providers where the legitimacy signals are genuinely verifiable;
// each signal is grounded in that provider's real credentials/practices.
const REVIEW_LEGIT: Record<string, { verdict: string; signals: string[] }> = {
  embody: {
    verdict:
      "Yes - embody is a legitimate, US-based telehealth weight-loss provider. It's LegitScript-certified, works with US-based state-licensed 503A compounding pharmacies, and connects you with state-licensed doctors overseen by its own medical director.",
    signals: [
      "LegitScript-certified telehealth provider",
      "US-based, state-licensed 503A compounding pharmacies",
      "State-licensed doctors, a medical director, and a nursing team",
      "Transparent flat pricing - $69/mo semaglutide, $119 tirzepatide",
      "Full refund if you're not approved",
    ],
  },
  altrx: {
    verdict:
      "Yes - altRx is a legitimate self-pay telehealth service. A licensed provider (physician, PA, or nurse practitioner) reviews your assessment before any prescription is issued, and medication is filled by a licensed pharmacy.",
    signals: [
      "Licensed providers review every assessment (physician, PA, or NP)",
      "Prescriptions filled by licensed pharmacies",
      "Transparent, flat pricing - no hidden fees, no insurance required",
      "No long-term contract; pause or cancel anytime",
      "Buy Now, Pay Later available",
    ],
  },
  trimrx: {
    verdict:
      "Yes - trimrx is a legitimate telehealth GLP-1 provider. Licensed clinicians guide treatment, medications are compounded semaglutide and tirzepatide prescribed after a medical review, and pricing is transparent with no long-term contract.",
    signals: [
      "Licensed clinical guidance throughout treatment",
      "Compounded semaglutide & tirzepatide, prescribed after review",
      "Transparent, competitive pricing with multi-month discounts",
      "No long-term contract required",
      "100% online - no clinic visit needed",
    ],
  },
  medvi: {
    verdict:
      "Yes - Medvi is a legitimate medical weight-loss platform. Prescriptions are overseen by licensed providers with regular monitoring, and its pricing is transparent and all-inclusive with no surprise charges.",
    signals: [
      "Prescription treatment overseen by licensed providers",
      "Regular monitoring and provider check-ins",
      "Transparent, all-inclusive pricing - no surprise charges",
      "Highly rated, personal service on Trustpilot",
      "100% online - no clinic visit required",
    ],
  },
  wellmedr: {
    verdict:
      "Yes - wellmedr is a legitimate telehealth platform. Board-certified specialists tailor your plan, and medications are made in US state-licensed pharmacies following FDA compounding standards after a medical review.",
    signals: [
      "Board-certified specialists tailor your treatment plan",
      "US state-licensed pharmacies following FDA compounding standards",
      "Real medical intake reviewed before prescribing",
      "100% online - message your provider anytime",
      "Discreet, unbranded packaging",
    ],
  },
  healthrx: {
    verdict:
      "Yes - HealthRx is a legitimate GLP-1 telehealth program. It's LegitScript-certified (cert. 50087439), an independent US-licensed clinician reviews every request before treatment proceeds, and medication is prepared by licensed 503A pharmacies and shipped overnight in temperature-controlled, lot-tracked packaging.",
    signals: [
      "LegitScript certified - cert. 50087439",
      "Independent US-licensed clinician reviews every request; approval is never automatic",
      "Licensed 503A pharmacy fulfillment",
      "Overnight cold-chain shipping, lot-tracked through delivery",
      "Transparent prepaid pricing - $99/mo semaglutide ($1,188 at checkout), no hidden fees",
    ],
  },
};

// Extra code-controlled FAQs appended to specific reviews (and their FAQPage
// schema) - high-intent questions grounded in each provider's real published
// terms. Side-effect answers stay at medication level and link the full guide.
const REVIEW_EXTRA_FAQS: Record<string, { question: string; answer: string }[]> = {
  embody: [
    {
      question: "How fast does embody ship?",
      answer:
        "embody ships free in 1-2 days in temperature-controlled, tracked and insured packaging, with same-day dispatch on orders placed before 2pm CT. The doctor review itself usually happens within 24 hours of completing the ~5-minute intake.",
    },
    {
      question: "Can you cancel embody anytime?",
      answer:
        "Yes - embody has no long-term contract and no membership fee; plans are month-to-month and you can cancel anytime. If a provider doesn't approve your prescription in the first place, embody issues a full refund.",
    },
    {
      question: "What are the side effects of embody's medications?",
      answer:
        "embody prescribes compounded semaglutide and tirzepatide, so the side effects are those of GLP-1 medications generally - most commonly digestive (nausea, constipation, diarrhea), especially during the first weeks as your dose increases, and usually easing as your body adjusts. Your prescribing provider reviews your history for contraindications, and embody's nursing team is available during treatment. See our full semaglutide side-effects guide for what to expect and when to seek care.",
    },
  ],
};

export async function reviewMetadata(slug: string, ctx: SiteContext): Promise<Metadata> {
  const config = await getConfig(ctx.vertical);
  const review = (config.reviews ?? []).find((r) => r.slug === slug);
  if (!review) return { title: "Review Not Found" };

  const provider = config.providers.find((p) => p.id === review.providerId);
  if (!provider) return { title: "Review Not Found" };

  const override = REVIEW_SEO_OVERRIDES[slug];
  const pageTitle = override?.title ?? `${provider.name} Review 2026: Cost, Results & Is It Worth It?`;
  const pageDescription = override?.description ?? review.shortSummary;

  // Reviews of non-affiliate providers don't monetize - de-index (but keep
  // following links) so they stop diluting site-quality signals.
  const isAffiliate = AFFILIATE_PROVIDER_IDS.includes(provider.id);

  const url = canonicalUrl(ctx, `/reviews/${slug}`);

  return {
    title: pageTitle,
    description: pageDescription,
    robots: ctx.noindex
      ? { index: false, follow: false }
      : isAffiliate
        ? undefined
        : { index: false, follow: true },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      type: "article",
    },
  };
}

export async function ReviewPageView({ slug, ctx }: { slug: string; ctx: SiteContext }) {
  const config = await getConfig(ctx.vertical);
  const review = (config.reviews ?? []).find((r) => r.slug === slug);
  if (!review) return notFound();

  const provider = config.providers.find((p) => p.id === review.providerId);
  if (!provider) return notFound();

  const legit = REVIEW_LEGIT[slug];
  const reviewer = config.experts?.[0];

  // Site's own editorial rating for this provider (same scoring shown on the
  // homepage), keyed off its ranking position. Surfaced visibly below and fed
  // into the Review schema's reviewRating so the page is eligible for star
  // rich snippets - a major CTR lever on review SERPs.
  const rankIndex = config.ranking.providerOrder.indexOf(provider.id);
  const editorial =
    rankIndex >= 0
      ? config.ranking.positions[rankIndex] ??
        config.ranking.positions[config.ranking.positions.length - 1]
      : null;
  const editorialStars = editorial ? editorial.score / 2 : 0;
  const editorialFullStars = Math.floor(editorialStars);
  const editorialHasHalf = editorialStars % 1 >= 0.5;

  // Promo popup for this provider, if it has a registered creative.
  const promoPopup = resolvePromoPopup([provider]);

  // Note: we intentionally do NOT emit an AggregateOffer/price in the schema.
  // A structured price can surface in the SERP rich result and goes stale the
  // moment a provider changes pricing, so on-page pricing tables stay the single
  // source of truth and the search snippet carries no price.

  // Real Trustpilot rating → Product AggregateRating, so the review page is
  // eligible for the star + review-count rich snippet ("★ 4.7 · 1,205 reviews").
  // Grounded in the same Trustpilot score shown on the page (only emitted when
  // both a rating and a count are present, so we never fabricate a rating).
  const tpRating = provider.trustpilotRating ? parseFloat(provider.trustpilotRating) : NaN;
  const tpCount = provider.trustpilotReviewCount
    ? parseInt(provider.trustpilotReviewCount.replace(/[^0-9]/g, ""), 10)
    : NaN;
  const aggregateRating =
    Number.isFinite(tpRating) && tpRating > 0 && Number.isFinite(tpCount) && tpCount > 0
      ? {
          "@type": "AggregateRating",
          ratingValue: tpRating,
          bestRating: 5,
          worstRating: 1,
          reviewCount: tpCount,
        }
      : null;

  // JSON-LD: Product with our editorial review, plus the Trustpilot aggregate
  // rating when a real one exists. Google's Product markup requires at least one
  // of review / aggregateRating / offers - the editorial review guarantees the
  // item is valid for every provider, including those (like altRx) that have no
  // Trustpilot aggregate rating. We intentionally omit `offers` so no (stale)
  // price surfaces in the rich result.
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: provider.name,
    description: review.shortSummary,
    ...(aggregateRating && { aggregateRating }),
    ...(editorial && {
      review: {
        "@type": "Review",
        name: `${provider.name} Review`,
        headline: `${provider.name} Review 2026: Cost, Results & Is It Worth It?`,
        reviewBody: review.reviewIntro,
        datePublished: "2026-06-01",
        dateModified: review.updatedAt || CONTENT_LAST_UPDATED,
        reviewRating: {
          "@type": "Rating",
          ratingValue: editorial.score,
          bestRating: 10,
          worstRating: 1,
        },
        author: { "@type": "Organization", name: ctx.brandTeam, url: ctx.origin },
        ...(reviewer && {
          reviewedBy: {
            "@type": "Person",
            name: reviewer.credentials ? `${reviewer.name}, ${reviewer.credentials}` : reviewer.name,
            jobTitle: reviewer.role,
            worksFor: { "@type": "Organization", name: ctx.brandDomain },
          },
        }),
        publisher: { "@type": "Organization", name: ctx.brandDomain, url: ctx.origin },
      },
    }),
  };

  // A Product with neither a review nor an aggregate rating would be flagged
  // invalid by Google, so only emit the Product markup when at least one exists.
  const hasProductRichData = Boolean(editorial) || Boolean(aggregateRating);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl(ctx, "/") },
      { "@type": "ListItem", position: 2, name: "Reviews", item: canonicalUrl(ctx, "/reviews") },
      { "@type": "ListItem", position: 3, name: `${provider.name} Review`, item: canonicalUrl(ctx, `/reviews/${slug}`) },
    ],
  };

  // FAQ - real, query-shaped questions answered entirely from this review's
  // own researched content (pricing, treatments, best-for, verdict). Powers
  // both the visible FAQ section and the FAQPage schema (rich results / PAA).
  const reviewFaqs = [
    { question: `Is ${provider.name} legit?`, answer: legit?.verdict ?? review.reviewIntro },
    { question: `How much does ${provider.name} cost?`, answer: review.pricingSummary },
    review.treatmentOptions?.length
      ? { question: `What treatments does ${provider.name} offer?`, answer: `${provider.name} offers ${review.treatmentOptions.join(", ")}.` }
      : null,
    review.bestFor?.length
      ? { question: `Who is ${provider.name} best for?`, answer: `${provider.name} is best for ${review.bestFor.join("; ")}.` }
      : null,
    { question: `Is ${provider.name} worth it?`, answer: review.finalVerdict },
    ...(REVIEW_EXTRA_FAQS[slug] ?? []),
  ].filter((f): f is { question: string; answer: string } => !!f && !!f.answer);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: reviewFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const relatedBattles = (config.battles ?? []).filter(
    (b) => b.provider1Id === provider.id || b.provider2Id === provider.id
  );

  // This provider's own question cluster (is-X-legit / X-cost / X-alternatives)
  // - the highest-intent internal links a review can carry. Rendered only for
  // cluster articles that actually exist in the config.
  const clusterSlugs = [
    { slug: `is-${provider.id}-legit`, label: `Is ${provider.name} legit?` },
    { slug: `${provider.id}-cost`, label: `How much does ${provider.name} cost?` },
    { slug: `${provider.id}-alternatives`, label: `Best ${provider.name} alternatives` },
  ].filter((c) => (config.articles ?? []).some((a) => a.slug === c.slug));

  // Related articles: actually related, not just the first three in the array.
  // Prefer articles that mention this provider (excluding its own cluster,
  // which has a dedicated box below), then fill with the newest guides.
  const clusterSet = new Set(clusterSlugs.map((c) => c.slug));
  const mentions = (a: { slug: string; title: string }) =>
    a.slug.includes(provider.id) || a.title.toLowerCase().includes(provider.name.toLowerCase());
  const nonCluster = (config.articles ?? []).filter((a) => !clusterSet.has(a.slug));
  const relatedArticles = [
    ...nonCluster.filter(mentions),
    ...nonCluster
      .filter((a) => !mentions(a))
      .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")),
  ].slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {hasProductRichData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1000px] px-4 pb-8 pt-8 sm:px-6 sm:pt-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: hubLink(ctx, "/") },
              { label: "Reviews", href: hubLink(ctx, "/reviews") },
              { label: `${provider.name} Review` },
            ]}
          />

          <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-[50px] w-[130px] shrink-0 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={provider.logo} alt={`${provider.name} logo`} className="max-h-full max-w-full object-contain" />
              </div>
              <div>
                <h1 className="text-[24px] font-bold text-[#191919] sm:text-[28px]">
                  {provider.name} Reviews
                </h1>
                <p className="mt-0.5 text-[14px] text-gray-500">
                  {provider.tagline}
                </p>
                <LastUpdated date={review.updatedAt || CONTENT_LAST_UPDATED} className="mt-1" />
                {editorial && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < editorialFullStars
                              ? "fill-[#FDB515] text-[#FDB515]"
                              : i === editorialFullStars && editorialHasHalf
                                ? "fill-[#FDB515]/50 text-[#FDB515]"
                                : "fill-gray-300 text-gray-300"
                          )}
                          strokeWidth={0}
                        />
                      ))}
                    </div>
                    <span className="text-[14px] font-bold text-[#191919]">
                      {editorial.score}/10
                    </span>
                    <span className="text-[13px] text-gray-500">
                      {editorial.label} - our rating
                    </span>
                  </div>
                )}
              </div>
            </div>
            <ProviderCta
              href={provider.affiliateUrl}
              providerName={provider.name}
              providerSlug={provider.id}
              pageType="review"
              sourceFlow="provider_review"
              className="flex h-[44px] items-center justify-center gap-2 rounded-lg bg-[#0C4B75] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61] sm:shrink-0"
            >
              Visit {provider.name}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </ProviderCta>
          </div>
          <TrustDisclosure disclaimerHref={hubLink(ctx, "/disclaimer")} />
        </div>
      </div>

      <div className="mx-auto max-w-[1000px] px-4 py-8 sm:px-6">
        {/* Quick summary strip */}
        <div className="mb-8 flex flex-wrap items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 sm:gap-6">
          {review.trustBadges && review.trustBadges.length > 0 ? (
            review.trustBadges.map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-[13px] text-gray-600">
                <Check className="h-4 w-4 text-emerald-500" strokeWidth={2} />
                {badge}
              </div>
            ))
          ) : (
            <>
              <div className="flex items-center gap-2 text-[13px] text-gray-600">
                <Shield className="h-4 w-4 text-[#0C4B75]" strokeWidth={1.5} />
                Licensed Providers
              </div>
              <div className="flex items-center gap-2 text-[13px] text-gray-600">
                <Clock className="h-4 w-4 text-[#0C4B75]" strokeWidth={1.5} />
                Fast Home Delivery
              </div>
              <div className="flex items-center gap-2 text-[13px] text-gray-600">
                <Users className="h-4 w-4 text-[#0C4B75]" strokeWidth={1.5} />
                Ongoing Support
              </div>
            </>
          )}
        </div>

        {/* The Bottom Line - the verdict up top, so the answer to "is it worth
            it" doesn't hide at the bottom of the page. */}
        {review.finalVerdict && (
          <div className="mb-8 rounded-2xl border border-[#0C4B75]/20 bg-white p-5 shadow-sm sm:p-6">
            <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.07em] text-[#0C4B75]">The bottom line</p>
            <p className="text-[15px] leading-[1.8] text-gray-700">{review.finalVerdict}</p>
          </div>
        )}

        {/* Intro */}
        <div className="mb-8">
          <p className="text-[16px] leading-[1.8] text-gray-600">
            {review.reviewIntro}
          </p>
          {config.experts && config.experts.length > 0 && (
            <div className="mt-5">
              <ExpertByline
                // Brand the team name from the current context so the hub
                // shows "TreatmentsHub", not the legacy brand from config.
                expert={{
                  ...config.experts[0],
                  name: config.experts[0].name.replace(/TopWeightLoss/gi, ctx.brandTeam.replace(/\s+Team$/i, "")),
                }}
                label="Reviewed by"
              />
            </div>
          )}
        </div>

        {/* Is [brand] legit? - trust block for the "is X legit" query cluster */}
        {legit && (
          <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-gray-100 bg-emerald-50/50 px-6 py-4">
              <Shield className="h-5 w-5 text-emerald-600" strokeWidth={2} />
              <h2 className="text-[18px] font-bold text-[#191919]">
                Is {provider.name} legit?
              </h2>
            </div>
            <div className="p-6">
              <p className="mb-4 text-[15px] leading-[1.75] text-gray-600">
                {legit.verdict}
              </p>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {legit.signals.map((signal) => (
                  <li key={signal} className="flex items-start gap-2.5 text-[14px] text-gray-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2} />
                    {signal}
                  </li>
                ))}
                {provider.trustpilotRating && provider.trustpilotReviewCount && (
                  <li className="flex items-start gap-2.5 text-[14px] text-gray-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2} />
                    Rated {provider.trustpilotRating}/5 across {provider.trustpilotReviewCount} Trustpilot reviews
                  </li>
                )}
              </ul>
              <p className="mt-4 text-[12px] leading-relaxed text-gray-400">
                &ldquo;Legitimate&rdquo; here means a real, licensed telehealth operation - not a
                guarantee of results. Compounded medications are not FDA-approved brand drugs. Always
                confirm current details and eligibility with the provider.
              </p>
            </div>
          </div>
        )}

        {/* Key Features + Pricing side by side on desktop */}
        <div className="mb-6 grid gap-6 sm:grid-cols-2">
          <Section title="Key Features">
            <ul className="space-y-2.5">
              {review.keyFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-[14px] text-gray-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2} />
                  {feature}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Treatment Options">
            <ul className="space-y-2.5">
              {review.treatmentOptions.map((option) => (
                <li key={option} className="flex items-start gap-2.5 text-[14px] text-gray-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0C4B75]" />
                  {option}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        {/* Pricing */}
        <Section title="Pricing">
          {review.pricingPlans && review.pricingPlans.length > 0 && (
            <div className="mb-5 grid gap-4 sm:grid-cols-2">
              {review.pricingPlans.map((plan) => (
                <div key={plan.name} className="rounded-xl border border-gray-200 bg-gray-50/60 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-[15px] font-bold text-[#191919]">{plan.name}</h4>
                    {plan.cadence && (
                      <span className="rounded-full bg-[#0C4B75]/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#0C4B75]">
                        {plan.cadence}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-[13px] text-gray-500">{plan.medication}</p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-[28px] font-extrabold leading-none text-[#191919]">{plan.price}</span>
                    {plan.unit && <span className="text-[14px] font-semibold text-gray-500">{plan.unit}</span>}
                    {plan.regularPrice && (
                      <span className="text-[15px] font-medium text-gray-400 line-through">{plan.regularPrice}</span>
                    )}
                  </div>
                  {plan.regularPrice && (
                    <span className="mt-2 inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                      Sale price
                    </span>
                  )}
                  {plan.highlights && plan.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {plan.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-[13px] text-gray-600">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
          <p className="text-[15px] leading-[1.75] text-gray-600">
            {review.pricingSummary}
          </p>
        </Section>

        {/* How it works */}
        {review.howItWorks && review.howItWorks.length > 0 && (
          <Section title={`How ${provider.name} Works`}>
            <ol className="space-y-4">
              {review.howItWorks.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0C4B75] text-[13px] font-bold text-white">
                    {i + 1}
                  </div>
                  <div>
                    {step.timing && (
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-[#0C4B75]">
                        {step.timing}
                      </span>
                    )}
                    <p className="text-[15px] font-bold text-[#191919]">{step.title}</p>
                    {step.detail && (
                      <p className="mt-0.5 text-[14px] leading-[1.65] text-gray-600">{step.detail}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {/* Pros & Cons */}
        <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="grid sm:grid-cols-2">
            <div className="p-6 sm:border-r sm:border-gray-100">
              <h3 className="mb-4 flex items-center gap-2 text-[15px] font-bold text-emerald-700">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                  <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2.5} />
                </div>
                Pros
              </h3>
              <ul className="space-y-2.5">
                {review.pros.map((pro) => (
                  <li key={pro} className="flex items-start gap-2.5 text-[14px] text-gray-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2} />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-gray-100 p-6 sm:border-t-0">
              <h3 className="mb-4 flex items-center gap-2 text-[15px] font-bold text-red-600">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                  <X className="h-3.5 w-3.5 text-red-500" strokeWidth={2.5} />
                </div>
                Cons
              </h3>
              <ul className="space-y-2.5">
                {review.cons.map((con) => (
                  <li key={con} className="flex items-start gap-2.5 text-[14px] text-gray-700">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" strokeWidth={2} />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mid-page CTA */}
        <div className="mb-6 rounded-xl border border-[#0C4B75]/10 bg-[#0C4B75]/[0.03] p-5 text-center sm:p-6">
          <p className="mb-3 text-[16px] font-bold text-[#191919]">
            Interested in {provider.name}?
          </p>
          <p className="mb-4 text-[13px] text-gray-500">
            Visit their site to check eligibility and current pricing.
          </p>
          <ProviderCta
            href={provider.affiliateUrl}
            providerName={provider.name}
            providerSlug={provider.id}
            pageType="review"
            sourceFlow="provider_review"
            className="inline-flex h-[44px] items-center justify-center gap-2 rounded-lg bg-[#0C4B75] px-8 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
          >
            Visit {provider.name}
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </ProviderCta>
        </div>

        {/* Best For */}
        <Section title="Who It's Best For">
          <ul className="space-y-2.5">
            {review.bestFor.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[14px] text-gray-700">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#0C4B75]" strokeWidth={2} />
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {/* Trustpilot Reviews */}
        {(provider.trustpilotReviews?.length ?? 0) > 0 && (
          <div className="mb-6">
            <TrustpilotCarousel
              providerName={provider.name}
              providerLogo={provider.logo}
              reviews={provider.trustpilotReviews!}
              rating={provider.trustpilotRating}
              reviewCount={provider.trustpilotReviewCount}
            />
          </div>
        )}

        {/* Final Verdict */}
        <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 bg-gray-50/70 px-6 py-4">
            <h3 className="text-[18px] font-bold text-[#191919]">Final Verdict</h3>
          </div>
          <div className="p-6">
            <p className="text-[15px] leading-[1.75] text-gray-600">
              {review.finalVerdict}
            </p>
            <ProviderCta
              href={provider.affiliateUrl}
              providerName={provider.name}
              providerSlug={provider.id}
              pageType="review"
              sourceFlow="provider_review"
              className="mt-5 flex h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#0C4B75] text-[15px] font-bold text-white transition-colors hover:bg-[#093d61] sm:w-auto sm:px-8"
            >
              Visit {provider.name}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </ProviderCta>
          </div>
        </div>

        {/* FAQ */}
        {reviewFaqs.length > 0 && (
          <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gray-50/70 px-6 py-4">
              <h2 className="text-[18px] font-bold text-[#191919]">
                {provider.name} Review: FAQs
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {reviewFaqs.map((f, i) => (
                <div key={i} className="p-6">
                  <h3 className="mb-2 text-[15px] font-bold text-[#191919]">{f.question}</h3>
                  <p className="text-[14px] leading-[1.7] text-gray-600">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Not sure? Quiz CTA */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
          <p className="mb-1 text-[15px] font-bold text-[#191919]">Not sure if {provider.name} is right for you?</p>
          <p className="mb-4 text-[13px] text-gray-500">Take our free quiz and get a personalized provider recommendation.</p>
          <Link
            href={hubLink(ctx, "/find-your-match")}
            className="inline-flex h-[42px] items-center justify-center gap-2 rounded-lg border border-[#0C4B75] px-6 text-[14px] font-bold text-[#0C4B75] transition-colors hover:bg-[#0C4B75]/5"
          >
            Find Your Match
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </Link>
        </div>

        {/* Related content */}
        {(relatedBattles.length > 0 || relatedArticles.length > 0) && (
          <div className="mb-6">
            <h3 className="mb-4 text-[18px] font-bold text-[#191919]">Related</h3>
            <div className="space-y-2">
              {relatedBattles.map((battle) => {
                const otherProvider = config.providers.find(
                  (p) => p.id === (battle.provider1Id === provider.id ? battle.provider2Id : battle.provider1Id)
                );
                return (
                  <Link
                    key={battle.slug}
                    href={hubLink(ctx, `/${battle.slug}`)}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-[#191919] transition-colors hover:border-[#0C4B75]/30 hover:bg-[#0C4B75]/[0.02]"
                  >
                    <span className="text-[#0C4B75]">{provider.name} vs {otherProvider?.name}</span>
                    <span className="ml-auto text-[12px] text-gray-400">Compare</span>
                  </Link>
                );
              })}
              {relatedArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={hubLink(ctx, `/articles/${article.slug}`)}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-[#191919] transition-colors hover:border-[#0C4B75]/30 hover:bg-[#0C4B75]/[0.02]"
                >
                  <span className="truncate">{article.title}</span>
                  <span className="ml-auto shrink-0 text-[12px] text-gray-400">{article.readTime}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Provider question cluster - the review's highest-intent internal links */}
        {clusterSlugs.length > 0 && (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">
            <h2 className="mb-1 text-[17px] font-bold text-[#191919]">
              More on {provider.name}
            </h2>
            <p className="mb-4 text-[13.5px] text-gray-500">
              The questions people ask before signing up - answered in depth.
            </p>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {clusterSlugs.map((c) => (
                <Link
                  key={c.slug}
                  href={hubLink(ctx, `/articles/${c.slug}`)}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] font-semibold text-[#0C4B75] transition-colors hover:border-[#0C4B75]/30 hover:bg-[#0C4B75]/[0.02]"
                >
                  <span className="truncate">{c.label}</span>
                  <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                </Link>
              ))}
            </div>
          </div>
        )}

        <MedicalSources vertical={ctx.vertical} />
      </div>

      {/* Mobile-only promo popup - shown on the provider's own review page when
          it has a registered creative (same once-per-session behavior as on
          comparisons). */}
      {promoPopup && (
        <PromoPopup
          spec={promoPopup}
          href={provider.affiliateUrl}
          position={rankIndex >= 0 ? rankIndex + 1 : undefined}
        />
      )}
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
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-[17px] font-bold text-[#191919]">{title}</h3>
      {children}
    </div>
  );
}
