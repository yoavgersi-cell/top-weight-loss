import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { NOINDEX_ARTICLE_SLUGS } from "@/lib/config";
import { type SiteContext, canonicalUrl, hubLink } from "@/lib/site-context";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ExpertByline } from "@/components/expert-byline";
import { MedicalSources } from "@/components/medical-sources";
import { notFound, permanentRedirect } from "next/navigation";

// Code-side CTR overrides for high-impression articles whose stored meta lives
// in the CMS blob (so it can't be tuned from the content files). Applied only
// on the weight-loss vertical. Prices cited are the providers' real listed
// prices - keep in sync when pricing changes.
const ARTICLE_SEO_OVERRIDES: Record<string, { title: string; description: string }> = {
  "best-mounjaro-alternatives": {
    title: "7 Best Mounjaro Alternatives in 2026 (From $99/Month)",
    description:
      "Compounded tirzepatide - the same active ingredient as Mounjaro - from $99-$147/month at licensed telehealth providers, vs $1,000+ brand-name. Compared honestly.",
  },
  "best-wegovy-alternatives": {
    title: "7 Best Wegovy Alternatives in 2026 (From $59/Month)",
    description:
      "Compounded semaglutide - Wegovy's active ingredient - from $59-$89/month through licensed online providers. Real prices, what's included, and how to choose.",
  },
  "best-ro-alternatives": {
    title: "Best ro Weight Loss Alternatives in 2026 (From $59/mo)",
    description:
      "Flat-priced GLP-1 providers that compete with ro: wellmedr ($59/mo), embody ($69/mo), altRx ($89/mo) and more - compared on price, speed and support.",
  },
  "can-you-get-ozempic-without-doctor": {
    title: "Can You Get Ozempic Without Seeing a Doctor? (2026)",
    description:
      "No - GLP-1s legally require a prescription. But you don't need an office visit: licensed telehealth providers evaluate you online, with treatment from $59/month.",
  },
  "weight-loss-medication-that-works-fast": {
    title: "Weight Loss Medication That Actually Works Fast (2026)",
    description:
      "GLP-1s are the fastest evidence-backed option: appetite changes in weeks, meaningful loss over months. What to realistically expect - and where to start online.",
  },
  "how-to-get-ozempic-online": {
    title: "How to Get Ozempic Online in 2026: 3 Steps (Legally)",
    description:
      "The legitimate route: online intake, licensed-provider review, medication shipped. Brand-name and compounded semaglutide options from $59/month, explained.",
  },
  "semaglutide-cost-per-month": {
    title: "Semaglutide Cost Per Month (2026): $59 vs $1,150+",
    description:
      "Compounded semaglutide runs $59-$199/month all-in via telehealth; brand-name Ozempic/Wegovy runs $1,150-$1,600 without insurance. Full real-price breakdown.",
  },
  "weight-loss-medication-without-insurance": {
    title: "Weight Loss Medication Without Insurance (From $59/mo)",
    description:
      "No coverage? Self-pay compounded GLP-1s start at $59-$89/month with the provider visit included. Real prices from licensed telehealth providers, compared.",
  },
  "compounded-semaglutide-vs-brand-name": {
    title: "Compounded Semaglutide vs Brand Name: Real Differences",
    description:
      "Same active ingredient, 503A-pharmacy preparation, and a 10x price gap ($59-$199 vs $1,150+/mo). What the FDA says, the real trade-offs, and how to stay safe.",
  },
};

// Direct-answer boxes injected at the top of key articles (featured-snippet
// targets). Code-rendered, so they work for articles whose body lives in the
// blob. Every figure is a real, listed price - no invented numbers.
const ARTICLE_QUICK_ANSWERS: Record<string, string> = {
  "best-mounjaro-alternatives":
    "The closest Mounjaro alternatives are compounded tirzepatide plans - the same active ingredient - from licensed telehealth providers: $99/month at wellmedr, $119 at embody, $147 at DirectMeds, versus roughly $1,000+ for brand-name. Prescription required, shipped to your door.",
  "best-wegovy-alternatives":
    "The closest Wegovy alternatives are compounded semaglutide plans - the same active ingredient - starting at $59/month (wellmedr), $69 (embody) and $89 (altRx) through licensed online providers, versus $1,150+ for brand-name without insurance.",
  "best-ro-alternatives":
    "The strongest ro alternatives are flat-priced compounded GLP-1 providers: wellmedr from $59/month, embody at $69 with 1-2 day shipping, and altRx at $89 with brand-name options too. All require an online licensed-provider review.",
  "can-you-get-ozempic-without-doctor":
    "No - Ozempic and every GLP-1 medication legally require a prescription in the US. What you don't need is an in-person visit: licensed telehealth providers evaluate you online and, if appropriate, prescribe treatment starting around $59-$89/month.",
  "weight-loss-medication-that-works-fast":
    "GLP-1 medications (semaglutide, tirzepatide) are the fastest evidence-backed option: most people notice appetite changes within the first weeks, with meaningful weight loss building over 3-6 months. No pill or program works overnight - anyone promising that is selling something.",
  "how-to-get-ozempic-online":
    "Three steps: complete an online health intake, have a licensed provider review it (required by law), and receive medication by mail if prescribed. Brand-name Ozempic runs $1,150+/month; compounded semaglutide with the same active ingredient starts at $59-$89.",
  "semaglutide-cost-per-month":
    "Compounded semaglutide costs $59-$199 per month all-in through licensed telehealth providers (wellmedr $59, embody $69, altRx $89). Brand-name Ozempic or Wegovy runs roughly $1,150-$1,600 per month without insurance coverage.",
  "weight-loss-medication-without-insurance":
    "You don't need insurance: self-pay compounded GLP-1 plans include the provider visit and medication from $59/month (wellmedr), $69 (embody) or $89 (altRx). Brand-name without coverage runs $1,150+ - which is exactly why the compounded route exists.",
  "compounded-semaglutide-vs-brand-name":
    "Compounded semaglutide contains the same active ingredient as Ozempic and Wegovy, prepared by state-licensed 503A compounding pharmacies, at $59-$199/month versus $1,150+ for brand-name. The trade-off: compounded versions are not FDA-approved products, so provider and pharmacy quality matter most.",
};

export async function articleMetadata(slug: string, ctx: SiteContext): Promise<Metadata> {
  const config = await getConfig(ctx.vertical);
  const article = (config.articles ?? []).find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };

  const url = canonicalUrl(ctx, `/articles/${slug}`);

  // CTR override (code-controlled) wins over stored meta for target articles.
  const override = ctx.vertical === "weight-loss" ? ARTICLE_SEO_OVERRIDES[slug] : undefined;

  return {
    title: override?.title ?? article.title,
    description: override?.description ?? article.description,
    robots: ctx.noindex
      ? { index: false, follow: false }
      : NOINDEX_ARTICLE_SLUGS.includes(slug)
        ? { index: false, follow: true }
        : undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: override?.title ?? article.title,
      description: override?.description ?? article.description,
      url,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author || ctx.brandDomain],
    },
  };
}

const categoryColors: Record<string, string> = {
  Science: "bg-blue-50 text-blue-700",
  Guide: "bg-emerald-50 text-emerald-700",
  Advice: "bg-amber-50 text-amber-700",
  Wellness: "bg-purple-50 text-purple-700",
};

function slugifyHeading(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function ArticlePageView({ slug, ctx }: { slug: string; ctx: SiteContext }) {
  const config = await getConfig(ctx.vertical);
  const articles = config.articles ?? [];
  const experts = config.experts ?? [];

  // Head-to-head provider comparisons are canonical at the root battle URL.
  // If a battle owns this slug, consolidate /articles/<slug> → /<slug> (301/308)
  // so a duplicate or stale /articles/ URL doesn't compete with the battle page.
  if ((config.battles ?? []).some((b) => b.slug === slug)) {
    permanentRedirect(hubLink(ctx, `/${slug}`));
  }

  const article = articles.find((a) => a.slug === slug);
  if (!article) return notFound();

  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const nextArticle = articles[currentIndex + 1] || null;
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;

  // Byline author: match the article's author to a team member, else the lead
  const author = experts.find((e) => e.name === article.author) ?? experts[0];

  // Top providers for inline CTA
  const { providerOrder, positions } = config.ranking;
  const topProviders = providerOrder
    .map((id, index) => {
      const provider = config.providers.find((p) => p.id === id);
      if (!provider) return null;
      const position = positions[index] || positions[positions.length - 1];
      return { ...provider, rating: position.score, tagline: provider.tagline };
    })
    .filter(Boolean) as Array<{ id: string; name: string; logo: string; tagline: string; affiliateUrl: string; rating: number }>;

  // Related articles: same category first, then others, exclude self, max 3
  const relatedArticles = [
    ...articles.filter(
      (a) => a.slug !== slug && a.category === article.category
    ),
    ...articles.filter(
      (a) => a.slug !== slug && a.category !== article.category
    ),
  ].slice(0, 3);

  const formattedDate = new Date(article.updatedAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  // Word count for schema
  const wordCount = article.sections.reduce(
    (sum, s) =>
      sum + s.body.replace(/<[^>]*>/g, "").split(/\s+/).length,
    0
  );

  // JSON-LD Article schema (enhanced)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: canonicalUrl(ctx, `/articles/${slug}/opengraph-image`),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    wordCount,
    articleSection: article.category,
    author: author
      ? {
          "@type": "Person",
          name: author.credentials ? `${author.name}, ${author.credentials}` : author.name,
          jobTitle: author.role,
          url: canonicalUrl(ctx, "/about"),
        }
      : {
          "@type": "Organization",
          name: article.author || ctx.brandDomain,
          url: ctx.origin,
        },
    publisher: {
      "@type": "Organization",
      name: ctx.brandDomain,
      url: ctx.origin,
      logo: {
        "@type": "ImageObject",
        url: `${ctx.origin}/logo-mark.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl(ctx, `/articles/${slug}`),
    },
    keywords: [
      "weight loss",
      "GLP-1",
      "semaglutide",
      "tirzepatide",
      article.category.toLowerCase(),
      ...article.sections.map((s) => s.heading),
    ],
  };

  // JSON-LD Breadcrumb
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonicalUrl(ctx, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: canonicalUrl(ctx, "/articles"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: canonicalUrl(ctx, `/articles/${slug}`),
      },
    ],
  };

  // FAQ schema - ONLY from sections that are genuinely question-shaped (heading
  // ends with "?"). Marking narrative section headings as FAQ questions is
  // non-compliant structured data (risk of a Google structured-data flag, and no
  // upside since FAQ rich results are gated to authoritative health/gov sites),
  // so we emit FAQPage only when there are at least two real questions.
  const faqEntries = article.sections.filter((s) => s.heading.trim().endsWith("?"));
  const faqSchema =
    faqEntries.length >= 2
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqEntries.map((s) => ({
            "@type": "Question",
            name: s.heading,
            acceptedAnswer: {
              "@type": "Answer",
              text: s.body.replace(/<[^>]*>/g, ""),
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="min-h-screen bg-gray-50">
        {/* Hero band */}
        <div
          className="w-full"
          style={{ backgroundColor: article.heroColor }}
        >
          <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 sm:py-14">
            <Breadcrumbs
              items={[
                { label: "Home", href: hubLink(ctx, "/") },
                { label: "Articles", href: hubLink(ctx, "/articles") },
                { label: article.title },
              ]}
            />

            <div className="flex items-center gap-3 mb-4">
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${categoryColors[article.category] || "bg-gray-100 text-gray-600"}`}
              >
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-[12px] text-gray-400">
                <Clock className="h-3 w-3" strokeWidth={1.5} />
                {article.readTime}
              </span>
            </div>

            <h1 className="text-[24px] font-bold leading-tight text-[#191919] sm:text-[32px]">
              {article.title}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-500">
              {article.description}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              {author ? (
                <ExpertByline
                  // Brand the team name from the current context so the hub
                  // shows "TreatmentsHub", not the legacy brand from config.
                  expert={{ ...author, name: author.name.replace(/TopWeightLoss/gi, ctx.brandTeam.replace(/\s+Team$/i, "")) }}
                  label="Written by"
                />
              ) : (
                article.author && <span className="text-[12px] text-gray-500">By {article.author}</span>
              )}
              <span className="text-[12px] text-gray-400">Updated {formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6">
          <div>
          {/* Direct answer up top (featured-snippet target) - code-injected so
              it also covers articles whose body lives in the CMS blob. */}
          {ctx.vertical === "weight-loss" && ARTICLE_QUICK_ANSWERS[slug] && (
            <div className="article-body mb-8 text-[16px] leading-[1.75] text-gray-600">
              <div className="qa">
                <strong>The quick answer</strong>
                {ARTICLE_QUICK_ANSWERS[slug]}
              </div>
            </div>
          )}
          {/* Table of contents - anchor jump-links. Signals structure to Google
              (eligible for "jump to" sitelinks) and improves navigation on long
              articles. Rendered only when there are enough sections to warrant it. */}
          {article.sections.length >= 4 && (
            <nav aria-label="Table of contents" className="mb-8 rounded-xl border border-gray-200 bg-white p-5">
              <p className="mb-3 text-[12px] font-bold uppercase tracking-wider text-gray-400">
                In this article
              </p>
              <ol className="space-y-1.5">
                {article.sections.map((s, i) => (
                  <li key={i} className="flex gap-2 text-[14px] leading-snug">
                    <span className="shrink-0 font-semibold text-gray-300">{i + 1}.</span>
                    <a href={`#${slugifyHeading(s.heading)}`} className="text-[#0C4B75] hover:underline">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <article className="space-y-8">
            {article.sections.map((section, i) => (
              <div key={i}>
                <section id={slugifyHeading(section.heading)}>
                  <h2 className="mb-3 text-[20px] font-bold text-[#191919] scroll-mt-24">
                    {section.heading}
                  </h2>
                  {/* div (not p) so author HTML can include block elements -
                      lists, tables, callouts - styled via .article-body css */}
                  <div
                    className="article-body text-[16px] leading-[1.75] text-gray-600 [&_a]:text-[#0C4B75] [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#093d61]"
                    dangerouslySetInnerHTML={{ __html: section.body }}
                  />
                </section>

                {/* Editorial callout after 4th section */}
                {i === 3 && article.sections.length > 4 && (
                  <div className="my-10 overflow-hidden rounded-xl bg-transparent">
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex-1 py-6 pr-6 sm:py-8 sm:pr-8">
                        <h3 className="mb-3 text-[18px] font-bold leading-tight text-[#0C4B75] sm:text-[20px]">
                          What To Know Before Starting GLP-1 Treatment
                        </h3>
                        <p className="mb-3 text-[16px] leading-[1.75] text-gray-600">
                          Before starting GLP-1 treatment, it&apos;s important to understand a few key things. These medications require a prescription from a licensed clinician and aren&apos;t suitable for everyone. Some people may experience side effects, especially during the first few weeks as the body adjusts.
                        </p>
                        <p className="mb-3 text-[16px] leading-[1.75] text-gray-600">
                          GLP-1s also tend to work best when combined with basic lifestyle habits like balanced nutrition and regular physical activity.
                        </p>
                        <p className="text-[16px] leading-[1.75] text-gray-600">
                          That&apos;s why choosing a provider that offers proper medical screening and ongoing follow-up support is essential for both safety and long-term success.
                        </p>
                      </div>
                      <div className="flex items-center justify-center sm:w-[260px] sm:shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/editorial-injection.png"
                          alt="Woman preparing GLP-1 weight loss injection"
                          className="h-[200px] w-full object-cover sm:h-full sm:rounded-r-xl"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Inline provider CTA after 2nd section */}
                {i === 1 && topProviders.length > 0 && (
                  <div className="my-8 rounded-lg border border-gray-200 bg-white px-5 py-4">
                    <p className="mb-3 text-[13px] font-bold uppercase tracking-wider text-gray-400">Top-Rated Providers</p>
                    <div className="space-y-2.5">
                      {topProviders.slice(0, 3).map((tp) => (
                        <a
                          key={tp.id}
                          href={tp.affiliateUrl}
                          className="flex items-center justify-between rounded-lg border border-gray-100 bg-[#fafbfc] px-4 py-3 transition-colors hover:border-[#0C4B75]/20 hover:bg-[#0C4B75]/[0.02]"
                        >
                          <div className="flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={tp.logo} alt={tp.name} className="h-[24px] w-[80px] object-contain object-left" />
                            <span className="text-[13px] text-gray-500">{tp.tagline}</span>
                          </div>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-[#0C4B75]" strokeWidth={1.5} />
                        </a>
                      ))}
                    </div>
                    <Link href={hubLink(ctx, "/find-your-match")} className="mt-3 block text-center text-[13px] font-semibold text-[#0C4B75] hover:underline">
                      Not sure? Take our free matching quiz →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </article>

          {/* CTA box */}
          <div className="mt-12 rounded-xl border border-gray-200 bg-white p-6 text-center sm:p-8">
            <p className="text-[18px] font-bold text-[#191919]">
              Ready to compare weight loss providers?
            </p>
            <p className="mt-1 text-[14px] text-gray-500">
              See how top providers stack up on pricing, medical support, and
              treatment options.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href={hubLink(ctx, "/")}
                className="inline-flex h-[44px] items-center justify-center rounded-lg bg-[#0C4B75] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
              >
                Compare Providers
              </Link>
              <Link
                href={hubLink(ctx, "/find-your-match")}
                className="inline-flex h-[44px] items-center justify-center rounded-lg border border-gray-200 bg-white px-6 text-[14px] font-semibold text-[#191919] transition-colors hover:bg-gray-50"
              >
                Take the Quiz
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-5 text-[18px] font-bold text-[#191919]">
                Related Articles
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {relatedArticles.map((ra) => (
                  <Link
                    key={ra.slug}
                    href={hubLink(ctx, `/articles/${ra.slug}`)}
                    className="group rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
                  >
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold mb-2 ${categoryColors[ra.category] || "bg-gray-100 text-gray-600"}`}
                    >
                      {ra.category}
                    </span>
                    <p className="text-[14px] font-semibold leading-snug text-[#191919] group-hover:text-[#0C4B75] transition-colors">
                      {ra.title}
                    </p>
                    <p className="mt-1.5 text-[12px] text-gray-400 line-clamp-2">
                      {ra.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Prev / Next navigation */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {prevArticle ? (
              <Link
                href={hubLink(ctx, `/articles/${prevArticle.slug}`)}
                className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <ArrowLeft className="mt-0.5 h-4 w-4 shrink-0 text-gray-400 group-hover:text-[#0C4B75] transition-colors" strokeWidth={2} />
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Previous
                  </span>
                  <p className="mt-0.5 text-[14px] font-semibold leading-snug text-[#191919] group-hover:text-[#0C4B75] transition-colors">
                    {prevArticle.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextArticle && (
              <Link
                href={hubLink(ctx, `/articles/${nextArticle.slug}`)}
                className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md sm:text-right sm:flex-row-reverse"
              >
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-gray-400 group-hover:text-[#0C4B75] transition-colors" strokeWidth={2} />
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Next
                  </span>
                  <p className="mt-0.5 text-[14px] font-semibold leading-snug text-[#191919] group-hover:text-[#0C4B75] transition-colors">
                    {nextArticle.title}
                  </p>
                </div>
              </Link>
            )}
          </div>

          <MedicalSources vertical={ctx.vertical} />

          </div>
        </div>
      </div>
    </>
  );
}
