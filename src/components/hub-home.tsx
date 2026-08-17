import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Scale,
  Sparkles,
  Dumbbell,
  HeartPulse,
  ShieldCheck,
  Star,
  RefreshCw,
} from "lucide-react";
import { VERTICALS } from "@/lib/config";
import { getConfig } from "@/lib/config-store";

// Per-vertical icon for the category cards (kept here, not in the config, so the
// data model stays presentation-agnostic). Falls back to a generic mark.
const VERTICAL_ICONS: Record<string, LucideIcon> = {
  "weight-loss": Scale,
  "hair-loss": Sparkles,
  trt: Dumbbell,
  hrt: HeartPulse,
};

// Hub landing (treatmentshub.com). A brand-neutral "choose your treatment"
// front door that routes visitors into a specific vertical. Each vertical owns
// its own separate content; a vertical with no providers yet is shown as
// "Coming soon" rather than linking to an empty page.
export async function HubHome() {
  const counts = await Promise.all(
    VERTICALS.map(async (v) => {
      const config = await getConfig(v.id);
      return [v.id, (config.providers ?? []).length] as const;
    })
  );
  const providerCount: Record<string, number> = Object.fromEntries(counts);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* ───── HERO ───── */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-white">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0C4B75] via-[#1a8cd8] to-[#0C4B75]" />
        <div className="mx-auto max-w-[1000px] px-4 py-16 text-center sm:py-24">
          <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.14em] text-[#0C4B75]">
            Independent treatment comparisons
          </p>
          <h1 className="mx-auto max-w-[760px] text-[32px] font-extrabold leading-[1.1] text-[#191919] sm:text-[48px]">
            Compare the best treatments, side by side
          </h1>
          <p className="mx-auto mt-5 max-w-[580px] text-[16px] leading-relaxed text-gray-500 sm:text-[17px]">
            Honest, side-by-side comparisons of top telehealth providers &mdash; ranked on
            pricing, medical support, and real customer reviews. Pick your category to get started.
          </p>

          {/* Trust row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[13px] font-medium text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#0C4B75]" strokeWidth={2} />
              Independent &amp; unbiased
            </span>
            <span className="hidden h-3 w-px bg-gray-200 sm:block" />
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 text-[#FDB515]" strokeWidth={2} />
              Real customer reviews
            </span>
            <span className="hidden h-3 w-px bg-gray-200 sm:block" />
            <span className="inline-flex items-center gap-1.5">
              <RefreshCw className="h-4 w-4 text-[#0C4B75]" strokeWidth={2} />
              Updated regularly
            </span>
          </div>
        </div>
      </section>

      {/* ───── VERTICAL CARDS ───── */}
      <section className="mx-auto max-w-[1000px] px-4 py-14 sm:py-20">
        <div className="mb-8 text-center">
          <h2 className="text-[22px] font-bold text-[#191919] sm:text-[26px]">
            Choose your treatment category
          </h2>
          <p className="mx-auto mt-2 max-w-[520px] text-[14.5px] leading-relaxed text-gray-500">
            Each category has its own independent rankings, reviews, and pricing &mdash; curated
            by our editorial team.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {VERTICALS.map((v) => {
            const Icon = VERTICAL_ICONS[v.id] ?? Sparkles;
            const count = providerCount[v.id] ?? 0;
            const isLive = count > 0;

            const inner = (
              <>
                <span
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ backgroundColor: v.accent }}
                />
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${v.accent}14`, color: v.accent }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </span>
                  {isLive ? (
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-700">
                      {count} providers
                    </span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-gray-500">
                      Coming soon
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-[22px] font-bold text-[#191919]">{v.name}</h3>
                <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-gray-500">
                  {v.tagline}
                </p>

                {isLive ? (
                  <span
                    className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-bold"
                    style={{ color: v.accent }}
                  >
                    Compare {v.name} providers
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      strokeWidth={2.5}
                    />
                  </span>
                ) : (
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-gray-400">
                    Rankings in progress
                  </span>
                )}
              </>
            );

            const cardClass =
              "group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 shadow-sm";

            return isLive ? (
              <Link
                key={v.id}
                href={`/${v.id}`}
                className={`${cardClass} transition-all hover:-translate-y-0.5 hover:shadow-md`}
              >
                {inner}
              </Link>
            ) : (
              <div key={v.id} className={`${cardClass} opacity-75`}>
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      {/* ───── WHY TREATMENTSHUB ───── */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-[1000px] px-4 py-14 sm:py-16">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Independent by design",
                body: "We compare providers on the same objective criteria. Partnerships never buy a higher ranking.",
              },
              {
                icon: Star,
                title: "Grounded in real data",
                body: "Every ranking is backed by verified pricing, treatment details, and real customer reviews.",
              },
              {
                icon: RefreshCw,
                title: "Kept current",
                body: "Prices and providers change fast. We review and refresh our comparisons regularly.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title}>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0C4B75]/[0.07] text-[#0C4B75]">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-[16px] font-bold text-[#191919]">{title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-gray-500">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
