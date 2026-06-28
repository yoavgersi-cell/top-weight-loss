import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { getConfig } from "@/lib/config-store";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Weight Loss Articles — Research, Guides & Expert Insights",
  description:
    "Expert articles on GLP-1 medications, weight loss strategies, and choosing the right telehealth provider. Evidence-based guides updated regularly.",
  alternates: {
    canonical: "https://www.topweightloss.io/articles",
  },
  openGraph: {
    title: "Weight Loss Articles — Research, Guides & Expert Insights",
    description:
      "Expert articles on GLP-1 medications, weight loss strategies, and choosing the right provider.",
    url: "https://www.topweightloss.io/articles",
  },
};

const categoryColors: Record<string, string> = {
  Science: "bg-blue-50 text-blue-700",
  Guide: "bg-emerald-50 text-emerald-700",
  Advice: "bg-amber-50 text-amber-700",
  Wellness: "bg-purple-50 text-purple-700",
};

export default async function ArticlesPage() {
  const config = await getConfig();
  const articles = config.articles ?? [];

  if (articles.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6">
          <h1 className="text-[28px] font-bold text-[#191919]">Articles</h1>
          <p className="mt-4 text-gray-500">No articles yet. Check back soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6">
        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-[28px] font-bold text-[#191919] sm:text-[36px]">
            Articles
          </h1>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-gray-500">
            Evidence-based guides on weight loss medications, treatment
            expectations, and making informed decisions about your health.
          </p>
        </div>

        {/* Featured article (first one) */}
        <Link
          href={`/articles/${articles[0].slug}`}
          className="group mb-8 block overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md"
        >
          <div className="flex flex-col sm:flex-row">
            <div
              className="flex h-[180px] items-center justify-center sm:h-auto sm:w-[340px] sm:shrink-0"
              style={{ backgroundColor: articles[0].heroColor }}
            >
              <span className="text-[40px] font-extrabold text-[#191919]/10 select-none">
                01
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
              <div className="mb-3 flex items-center gap-3">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${categoryColors[articles[0].category] || "bg-gray-100 text-gray-600"}`}
                >
                  {articles[0].category}
                </span>
                <span className="flex items-center gap-1 text-[12px] text-gray-400">
                  <Clock className="h-3 w-3" strokeWidth={1.5} />
                  {articles[0].readTime}
                </span>
              </div>
              <h2 className="text-[20px] font-bold leading-tight text-[#191919] group-hover:text-[#0C4B75] transition-colors sm:text-[22px]">
                {articles[0].title}
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-gray-500 line-clamp-2">
                {articles[0].description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0C4B75]">
                Read article
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
            </div>
          </div>
        </Link>

        {/* Grid of remaining articles */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(1).map((article, i) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md"
            >
              <div
                className="flex h-[140px] items-center justify-center"
                style={{ backgroundColor: article.heroColor }}
              >
                <span className="text-[36px] font-extrabold text-[#191919]/10 select-none">
                  {String(i + 2).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2.5 flex items-center gap-3">
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
                <h2 className="text-[16px] font-bold leading-snug text-[#191919] group-hover:text-[#0C4B75] transition-colors">
                  {article.title}
                </h2>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-gray-500 line-clamp-3">
                  {article.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0C4B75]">
                  Read article
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
