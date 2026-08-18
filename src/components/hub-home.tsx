import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VERTICALS, DEFAULT_VERTICAL, isPublishedVertical } from "@/lib/config";
import { getConfig } from "@/lib/config-store";

// Editorial, umbrella-brand descriptions for each treatment category.
const CATEGORY_COPY: Record<string, string> = {
  "weight-loss": "Compare online weight-loss programs, treatment options, pricing and medical support.",
  "hair-loss": "Compare online hair-loss treatments, pricing and providers.",
  trt: "Compare online testosterone treatment providers, pricing and ongoing care.",
  hrt: "Compare menopause and hormone therapy providers, treatment options and support.",
};

function updatedLabel(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `Updated ${d.toLocaleDateString("en-US", { month: "short", year: "numeric" })}`;
}

// Hub landing (treatmentshub.com). An editorial front door for the umbrella
// brand: it establishes TreatmentsHub as a real comparison publisher and routes
// visitors into a category. Most traffic lands on deeper pages, so this stays
// deliberately restrained — typography and real content over decoration.
export async function HubHome() {
  const wl = await getConfig(DEFAULT_VERTICAL);
  const providerCount = (wl.providers ?? []).length;
  const latest = (wl.articles ?? []).slice(0, 3);

  return (
    <div className="bg-white">
      {/* ───── HERO ───── */}
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-[1080px] px-5 py-16 sm:px-8 sm:py-24">
          <h1 className="max-w-[760px] text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#191919] sm:text-[52px]">
            Find the right treatment.
            <br className="hidden sm:block" /> Compare your options.
          </h1>
          <p className="mt-6 max-w-[600px] text-[17px] leading-relaxed text-gray-600 sm:text-[19px]">
            Independent guides and provider comparisons across weight loss, hair loss, TRT and HRT.
          </p>

          {/* Category quick-nav (links only where a category is live) */}
          <nav className="mt-8 flex flex-wrap items-center gap-x-1 gap-y-2 text-[15px] font-semibold">
            {VERTICALS.map((v, i) => {
              const live = isPublishedVertical(v.id);
              return (
                <span key={v.id} className="flex items-center">
                  {i > 0 && <span className="mx-3 text-gray-300">·</span>}
                  {live ? (
                    <Link href={`/${v.id}`} className="text-[#0C4B75] hover:underline underline-offset-4">
                      {v.name}
                    </Link>
                  ) : (
                    <span className="text-gray-400">{v.name}</span>
                  )}
                </span>
              );
            })}
          </nav>
        </div>
      </section>

      {/* ───── CATEGORIES ───── */}
      <section className="bg-[#FAFAFA] border-b border-gray-200">
        <div className="mx-auto max-w-[1080px] px-5 py-14 sm:px-8 sm:py-16">
          <div className="grid gap-px overflow-hidden rounded-xl border border-gray-200 bg-gray-200 sm:grid-cols-2">
            {VERTICALS.map((v) => {
              const live = isPublishedVertical(v.id);
              const desc = CATEGORY_COPY[v.id] ?? v.tagline;

              const body = (
                <>
                  <h2 className="text-[20px] font-bold tracking-[-0.01em] text-[#191919]">{v.name}</h2>
                  <p className="mt-2 max-w-[380px] text-[14.5px] leading-relaxed text-gray-500">{desc}</p>
                  {live && (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0C4B75]">
                      Compare {providerCount} providers
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
                    </span>
                  )}
                </>
              );

              return live ? (
                <Link key={v.id} href={`/${v.id}`} className="group bg-white p-7 transition-colors hover:bg-[#0C4B75]/[0.02] sm:p-8">
                  {body}
                </Link>
              ) : (
                <div key={v.id} className="bg-white p-7 sm:p-8">
                  {body}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── FEATURED COMPARISON (proof) ───── */}
      {providerCount > 0 && (
        <section className="border-b border-gray-200">
          <div className="mx-auto max-w-[1080px] px-5 py-14 sm:px-8 sm:py-16">
            <div className="border-l-2 border-[#0C4B75] pl-6 sm:pl-8">
              <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-gray-400">Featured comparison</p>
              <h2 className="mt-2 max-w-[640px] text-[26px] font-bold leading-[1.15] tracking-[-0.01em] text-[#191919] sm:text-[32px]">
                We compared {providerCount} weight-loss providers
              </h2>
              <p className="mt-3 max-w-[600px] text-[16px] leading-relaxed text-gray-600">
                See how leading online providers stack up on pricing, treatment options, medical support
                and customer experience.
              </p>
              <Link
                href={`/${DEFAULT_VERTICAL}`}
                className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-bold text-[#0C4B75] hover:underline underline-offset-4"
              >
                See the rankings
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ───── LATEST FROM TREATMENTSHUB ───── */}
      {latest.length > 0 && (
        <section className="bg-[#FAFAFA] border-b border-gray-200">
          <div className="mx-auto max-w-[1080px] px-5 py-14 sm:px-8 sm:py-16">
            <h2 className="text-[22px] font-bold tracking-[-0.01em] text-[#191919]">Latest from TreatmentsHub</h2>
            <div className="mt-6 divide-y divide-gray-200 border-t border-gray-200">
              {latest.map((a) => (
                <Link
                  key={a.slug}
                  href={`/${DEFAULT_VERTICAL}/articles/${a.slug}`}
                  className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <div className="min-w-0">
                    <h3 className="text-[17px] font-semibold leading-snug text-[#191919] group-hover:text-[#0C4B75] transition-colors">
                      {a.title}
                    </h3>
                    {a.description && (
                      <p className="mt-1 max-w-[640px] text-[14px] leading-relaxed text-gray-500 line-clamp-1">
                        {a.description}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 text-[12.5px] font-medium text-gray-400">
                    {a.category}
                    {updatedLabel(a.updatedAt) && <span className="text-gray-300"> · {updatedLabel(a.updatedAt)}</span>}
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href={`/${DEFAULT_VERTICAL}/articles`}
              className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0C4B75] hover:underline underline-offset-4"
            >
              All guides
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </Link>
          </div>
        </section>
      )}

      {/* ───── METHODOLOGY ───── */}
      <section>
        <div className="mx-auto max-w-[1080px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-[720px]">
            <h2 className="text-[24px] font-bold tracking-[-0.01em] text-[#191919] sm:text-[28px]">
              How TreatmentsHub compares providers
            </h2>
            <p className="mt-4 text-[16.5px] leading-[1.7] text-gray-600">
              We look at what actually matters when choosing treatment online — price, what&rsquo;s
              included, access to medical support, treatment options, cancellation terms, and
              customer experience. Rankings are editorial and independent; partnerships never buy a
              higher placement.
            </p>
            <Link
              href="/how-we-rank"
              className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-bold text-[#0C4B75] hover:underline underline-offset-4"
            >
              See how we rank providers
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
