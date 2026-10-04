import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { HUB_ORIGIN, REVIEWERS, reviewerDisplayName, reviewerPath, reviewerPersonSchema } from "@/data/reviewers";

const CANONICAL = `${HUB_ORIGIN}/medical-review-policy`;
const TITLE = "Medical Review Policy: How Treatments Hub Checks Health Content";
const DESCRIPTION =
  "Who reviews the medical statements on Treatments Hub, what they check, what they do not, how review dates work, and how to report an error.";
const UPDATED = "2026-10-04";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: CANONICAL, type: "article" },
};

export default function MedicalReviewPolicyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": CANONICAL,
    url: CANONICAL,
    name: TITLE,
    description: DESCRIPTION,
    dateModified: UPDATED,
    isPartOf: { "@type": "WebSite", name: "Treatments Hub", url: HUB_ORIGIN },
    about: { "@type": "Organization", name: "Treatments Hub", url: HUB_ORIGIN, employee: REVIEWERS.map(reviewerPersonSchema) },
  };
  const ext = "font-semibold text-[#0C4B75] hover:underline";

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Medical review policy" }]} />
          <h1 className="text-[28px] font-extrabold leading-[1.15] text-[#191919] sm:text-[36px]">How we review health content</h1>
          <p className="mt-3 max-w-[720px] text-[16px] leading-relaxed text-gray-500">
            Treatments Hub compares online treatment providers. The medical and scientific statements in that content are
            checked by a named reviewer with the training to check them. This page says exactly what that means, and what it
            does not.
          </p>
          <p className="mt-3 text-[13px] text-gray-400">Last updated {UPDATED}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-4 py-10 text-[16px] leading-[1.75] text-gray-800 sm:px-6">
        <section className="mb-10">
          <h2 className="mb-3 text-[24px] font-bold text-[#191919]">Who reviews</h2>
          <div className="space-y-3">
            {REVIEWERS.map((r) => (
              <Link key={r.slug} href={reviewerPath(r)} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-[#0C4B75]/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.image.thumb} alt={r.name} width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
                <span>
                  <span className="block text-[15px] font-bold text-[#191919]">{reviewerDisplayName(r)}</span>
                  <span className="block text-[13px] text-gray-500">{r.jobTitle} · {r.headline}</span>
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-3 text-[14px] text-gray-500">
            Our reviewer is a licensed medical laboratory scientist with a Master of Public Health degree and clinical-trial
            experience, not a prescribing physician. We say &ldquo;reviewed for medical accuracy&rdquo; rather than
            &ldquo;medically reviewed by a doctor&rdquo; for that reason.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-[24px] font-bold text-[#191919]">What is reviewed</h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>How a medication or treatment works, and the terminology used to describe it.</li>
            <li>Clinical-trial figures and what the cited study actually measured.</li>
            <li>Regulatory status: FDA approval, compounding rules, what &ldquo;compounded&rdquo; means and does not mean.</li>
            <li>Contraindications, side effects and safety statements, against the label and regulator guidance.</li>
            <li>Whether a claim is supported by the source it cites, and whether the source is current.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-[24px] font-bold text-[#191919]">What is not reviewed</h2>
          <p className="mb-3">
            Prices, provider rankings, partner selection, provider descriptions and &ldquo;best for&rdquo; verdicts are editorial.
            They are produced by the Treatments Hub research team under the method on{" "}
            <Link href="/weight-loss/how-we-rank" className={ext}>how we rank</Link>, and the reviewer has no role in them.
            Trustpilot figures and Reddit excerpts are quoted as captured and are not medical evidence.
          </p>
          <p>
            Reviewers do not choose providers, set prices or rankings, or take part in commercial partnerships. We may earn
            a commission from provider links; that never changes a medical statement or a review date.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-[24px] font-bold text-[#191919]">How review dates work</h2>
          <p className="mb-3">
            Every content page carries a review bar under its title. It has two states:
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong className="text-[#191919]">&ldquo;Reviewed for medical accuracy by&rdquo; with a date.</strong> The named
              reviewer went through that page on that date. The same date is published in the page&rsquo;s structured data
              and listed on the reviewer&rsquo;s profile.
            </li>
            <li>
              <strong className="text-[#191919]">&ldquo;Medical reviewer&rdquo; with no date.</strong> The page names the site&rsquo;s
              reviewer but has not yet been reviewed. We do not backfill dates.
            </li>
          </ul>
          <p className="mt-3">
            A page is re-reviewed when its medical content changes materially or when the underlying guidance changes.
            Price and ranking updates do not trigger a medical re-review and do not change the review date.
          </p>
        </section>

        <section className="mb-10 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
          <h2 className="mb-2 flex items-center gap-2 text-[18px] font-bold text-[#191919]">
            <ShieldCheck className="h-5 w-5 text-emerald-600" strokeWidth={2} />
            Found an error?
          </h2>
          <p className="text-[15px] leading-[1.75] text-gray-600">
            Tell us through the contact details on our <Link href="/weight-loss/about" className={ext}>about page</Link>, with the
            page address and the statement in question. Confirmed medical errors are corrected and the page is re-reviewed.
          </p>
        </section>

        <p className="text-[13px] leading-relaxed text-gray-400">
          Nothing on this site is medical advice. Compounded medications are not FDA-approved products. Talk to a licensed
          clinician about your own situation before starting or changing any treatment.
        </p>
      </div>
    </div>
  );
}
