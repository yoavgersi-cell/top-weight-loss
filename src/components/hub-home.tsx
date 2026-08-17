import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VERTICALS } from "@/lib/config";

// Hub landing (treatmentshub.com). A brand-neutral "choose your treatment"
// front door that routes visitors into a specific vertical. Each vertical owns
// its own separate content, so this page only introduces and links to them.
export function HubHome() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <section className="relative overflow-hidden border-b border-gray-200 bg-white">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0C4B75] via-[#1a8cd8] to-[#0C4B75]" />
        <div className="mx-auto max-w-[1000px] px-4 py-16 text-center sm:py-20">
          <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.12em] text-[#0C4B75]">
            Independent treatment comparisons
          </p>
          <h1 className="mx-auto max-w-[720px] text-[30px] font-extrabold leading-[1.12] text-[#191919] sm:text-[44px]">
            Compare the best treatments, side by side
          </h1>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-relaxed text-gray-500">
            Honest, side-by-side comparisons of top telehealth providers &mdash; ranked on
            pricing, medical support, and real customer reviews. Pick your category to start.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1000px] px-4 py-12 sm:py-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {VERTICALS.map((v) => (
            <Link
              key={v.id}
              href={`/${v.id}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span
                className="absolute inset-x-0 top-0 h-1"
                style={{ backgroundColor: v.accent }}
              />
              <h2 className="text-[22px] font-bold text-[#191919]">{v.name}</h2>
              <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-gray-500">
                {v.tagline}
              </p>
              <span
                className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-bold"
                style={{ color: v.accent }}
              >
                Compare {v.name} providers
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
