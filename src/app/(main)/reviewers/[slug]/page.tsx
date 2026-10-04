import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, GraduationCap, BadgeCheck, BookOpen, ExternalLink } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  HUB_ORIGIN,
  REVIEWERS,
  getReviewer,
  reviewerDisplayName,
  reviewerPersonSchema,
  reviewerUrl,
} from "@/data/reviewers";

export const dynamicParams = false;

export function generateStaticParams() {
  return REVIEWERS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = getReviewer(slug);
  if (!r) return {};
  const title = `${reviewerDisplayName(r)} - ${r.jobTitle} | Treatments Hub`;
  const description = r.shortBio;
  return {
    title,
    description,
    alternates: { canonical: reviewerUrl(r) },
    openGraph: {
      title,
      description,
      url: reviewerUrl(r),
      type: "profile",
      images: [{ url: `${HUB_ORIGIN}${r.image.src}`, width: r.image.width, height: r.image.height, alt: r.name }],
    },
  };
}

function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}


export default async function ReviewerProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getReviewer(slug);
  if (!r) notFound();

  const person = reviewerPersonSchema(r);
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": reviewerUrl(r),
    url: reviewerUrl(r),
    name: `${reviewerDisplayName(r)} - ${r.jobTitle}`,
    dateCreated: `${r.since}-01`,
    mainEntity: person,
    isPartOf: { "@type": "WebSite", name: "Treatments Hub", url: HUB_ORIGIN },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: HUB_ORIGIN },
      { "@type": "ListItem", position: 2, name: "Medical review", item: `${HUB_ORIGIN}/medical-review-policy` },
      { "@type": "ListItem", position: 3, name: r.name, item: reviewerUrl(r) },
    ],
  };

  const ext = "font-semibold text-[#0C4B75] hover:underline";

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-10 sm:px-6 sm:py-14">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Medical review", href: "/medical-review-policy" }, { label: r.name }]} />
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <picture className="shrink-0">
              <source srcSet={r.image.webp} type="image/webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={r.image.src}
                alt={`${r.name}, ${r.jobTitle}`}
                width={160}
                height={160}
                className="h-[120px] w-[120px] rounded-2xl object-cover sm:h-[160px] sm:w-[160px]"
              />
            </picture>
            <div className="min-w-0">
              <p className="mb-1 flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.06em] text-emerald-700">
                <ShieldCheck className="h-4 w-4" strokeWidth={2.25} />
                Medical reviewer
              </p>
              <h1 className="text-[28px] font-extrabold leading-[1.15] text-[#191919] sm:text-[34px]">
                {r.name}
                <span className="font-semibold text-gray-400">, {r.credentials.join(", ")}</span>
              </h1>
              <p className="mt-1 text-[16px] font-semibold text-[#191919]">{r.jobTitle}, Treatments Hub</p>
              <p className="mt-1 text-[15px] leading-relaxed text-gray-500">{r.headline}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {r.licensure.map((c) => (
                  <span key={c.title} className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[12px] font-semibold text-emerald-700">
                    <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} />
                    {c.title}
                  </span>
                ))}
                {r.education.map((e) => (
                  <span key={e.degree} className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-[12px] font-semibold text-gray-700">
                    <GraduationCap className="h-3.5 w-3.5" strokeWidth={2} />
                    {e.degree}, {e.school}
                  </span>
                ))}
              </div>
              {r.linkedin && (
                <a
                  href={r.linkedin}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="mt-4 inline-flex h-[40px] items-center gap-2 rounded-lg bg-[#0A66C2] px-4 text-[13.5px] font-bold text-white hover:opacity-90"
                >
                  <LinkedInMark className="h-4 w-4" />
                  LinkedIn profile
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-4 py-10 text-[16px] leading-[1.75] text-gray-800 sm:px-6">
        {/* Scope */}
        <section className="mb-10 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
          <h2 className="mb-2 text-[18px] font-bold text-[#191919]">What {r.name.split(" ")[0]} reviews on this site</h2>
          <p className="text-[15px] leading-[1.75] text-gray-600">{r.scope}</p>
          <p className="mt-2 text-[14px] text-gray-500">
            Pages she has reviewed carry a dated &ldquo;Reviewed for medical accuracy&rdquo; line; pages she has not yet
            reviewed name her as the site&rsquo;s medical reviewer without a review date. The full policy is in{" "}
            <Link href="/medical-review-policy" className={ext}>how we review</Link>.
          </p>
        </section>

        {/* Bio */}
        <section className="mb-10">
          <h2 className="mb-3 text-[24px] font-bold text-[#191919]">Background</h2>
          {r.longBio.map((p) => (
            <p key={p.slice(0, 40)} className="mb-4">{p}</p>
          ))}
        </section>

        {/* Credentials and education */}
        <section className="mb-10">
          <h2 className="mb-4 text-[24px] font-bold text-[#191919]">Credentials and education</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {r.licensure.map((c) => (
              <div key={c.title} className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.05em] text-emerald-700">
                  <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} /> Licensure
                </p>
                <p className="text-[15px] font-bold text-[#191919]">{c.title}</p>
                <p className="text-[13px] text-gray-500">{c.issuer}</p>
                {c.detail && <p className="mt-2 text-[13.5px] leading-relaxed text-gray-600">{c.detail}</p>}
              </div>
            ))}
            {r.education.map((e) => (
              <div key={e.degree} className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.05em] text-[#0C4B75]">
                  <GraduationCap className="h-3.5 w-3.5" strokeWidth={2} /> Education
                </p>
                <p className="text-[15px] font-bold text-[#191919]">{e.degree}</p>
                <p className="text-[13px] text-gray-500">
                  {e.school}
                  {e.location ? `, ${e.location}` : ""}
                </p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-gray-600">{e.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-10">
          <h2 className="mb-4 text-[24px] font-bold text-[#191919]">Experience</h2>
          <div className="space-y-3">
            {r.experience.map((g) => (
              <div key={g.area} className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="mb-2 text-[15px] font-bold text-[#191919]">{g.area}</p>
                <ul className="list-disc space-y-1 pl-5 text-[14px] leading-relaxed text-gray-600">
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {r.specialties.map((s) => (
              <span key={s} className="rounded-full bg-gray-100 px-3 py-1 text-[12.5px] font-semibold text-gray-700">{s}</span>
            ))}
          </div>
        </section>

        {/* Selected work */}
        {r.selectedWork.length > 0 && (
          <section className="mb-10">
            <div className="mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#0C4B75]" strokeWidth={2} />
              <h2 className="text-[24px] font-bold text-[#191919]">Selected writing</h2>
            </div>
            <p className="mb-3 text-[14px] text-gray-500">Clinical-research articles written for industry publications.</p>
            <ul className="divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-200 bg-white">
              {r.selectedWork.map((w) => (
                <li key={w.url}>
                  <a href={w.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50">
                    <span>
                      <span className="block text-[14.5px] font-semibold text-[#191919]">{w.title}</span>
                      <span className="block text-[12.5px] text-gray-500">{w.outlet}</span>
                    </span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-gray-300" strokeWidth={2} />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="text-[13px] leading-relaxed text-gray-400">
          Reviewers assess medical and scientific statements. They do not choose providers, set prices or rankings, or
          take part in commercial partnerships. Nothing on this site is medical advice; talk to a licensed clinician
          about your own situation.
        </p>
      </div>
    </div>
  );
}
