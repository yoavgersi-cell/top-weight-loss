import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const config = await getConfig();
  const article = (config.articles ?? []).find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `https://www.topweightloss.io/articles/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://www.topweightloss.io/articles/${slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: ["topweightloss.io"],
    },
  };
}

const categoryColors: Record<string, string> = {
  Science: "bg-blue-50 text-blue-700",
  Guide: "bg-emerald-50 text-emerald-700",
  Advice: "bg-amber-50 text-amber-700",
  Wellness: "bg-purple-50 text-purple-700",
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = await getConfig();
  const articles = config.articles ?? [];
  const article = articles.find((a) => a.slug === slug);
  if (!article) return notFound();

  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const nextArticle = articles[currentIndex + 1] || null;
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;

  const formattedDate = new Date(article.updatedAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  // JSON-LD Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: "topweightloss.io",
      url: "https://www.topweightloss.io",
    },
    publisher: {
      "@type": "Organization",
      name: "topweightloss.io",
      url: "https://www.topweightloss.io",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.topweightloss.io/articles/${slug}`,
    },
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
        item: "https://www.topweightloss.io",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: "https://www.topweightloss.io/articles",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://www.topweightloss.io/articles/${slug}`,
      },
    ],
  };

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

      <div className="min-h-screen bg-gray-50">
        {/* Hero band */}
        <div
          className="w-full"
          style={{ backgroundColor: article.heroColor }}
        >
          <div className="mx-auto max-w-[720px] px-4 py-10 sm:px-6 sm:py-14">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Articles", href: "/articles" },
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
            <p className="mt-4 text-[12px] text-gray-400">
              Updated {formattedDate}
            </p>
          </div>
        </div>

        {/* Article body */}
        <div className="mx-auto max-w-[720px] px-4 py-10 sm:px-6">
          <article className="space-y-8">
            {article.sections.map((section, i) => (
              <section key={i}>
                <h2 className="mb-3 text-[20px] font-bold text-[#191919]">
                  {section.heading}
                </h2>
                <p className="text-[16px] leading-[1.75] text-gray-600">
                  {section.body}
                </p>
              </section>
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
                href="/"
                className="inline-flex h-[44px] items-center justify-center rounded-lg bg-[#0C4B75] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
              >
                Compare Providers
              </Link>
              <Link
                href="/find-your-match"
                className="inline-flex h-[44px] items-center justify-center rounded-lg border border-gray-200 bg-white px-6 text-[14px] font-semibold text-[#191919] transition-colors hover:bg-gray-50"
              >
                Take the Quiz
              </Link>
            </div>
          </div>

          {/* Prev / Next navigation */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {prevArticle ? (
              <Link
                href={`/articles/${prevArticle.slug}`}
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
                href={`/articles/${nextArticle.slug}`}
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
        </div>
      </div>
    </>
  );
}
