import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, ClipboardCheck, FileSearch, Mail, ShieldCheck, Stethoscope } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { HUB_ORIGIN, REVIEWERS, REVIEW_LOG, reviewerDisplayName, reviewerPath, reviewerPersonSchema } from "@/data/reviewers";
import { VERTICALS, PUBLISHED_VERTICALS, isHiddenVertical, type Provider } from "@/lib/config";
import { getConfig } from "@/lib/config-store";
import { PRICE_INDEX_VERIFIED } from "@/lib/price-index";
import { verticalNameInProse } from "@/lib/site-context";

// ─────────────────────────────────────────────────────────────────────────────
// Medical review policy - rebuilt Oct 22, 2026 (operator request: the page
// draws real traffic, so it has to earn trust on its own and send readers
// back to the comparisons). Every number on it is computed at render time
// from the review log, the provider configs and the price index - nothing is
// typed in. The reviewer facts come from the reviewer record.
// ─────────────────────────────────────────────────────────────────────────────

export const revalidate = 3600;

const CANONICAL = `${HUB_ORIGIN}/medical-review-policy`;
const TITLE = "Medical Review Policy: How Treatments Hub Checks Health Content";
const DESCRIPTION =
  "Who reviews the medical statements on Treatments Hub, what the review covers and does not, the evidence we accept, how review dates work, and how to report an error.";
const UPDATED = "2026-10-22";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: CANONICAL, type: "article" },
};

const fmt = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

const FAQS: { question: string; answer: string }[] = [
  {
    question: "Is the medical reviewer a doctor?",
    answer:
      "No, and we say so. Our reviewer is a licensed Medical Laboratory Scientist (Registered Medical Technologist) with a Master of Public Health and clinical-trial experience. That training is in how diagnostic tests, trial results and population statistics are produced, which is exactly what a review of medical claims needs. It is why our pages say \"reviewed for medical accuracy\" rather than \"medically reviewed by a doctor\", and why nothing on the site is medical advice.",
  },
  {
    question: "Does a review date mean the whole page is current?",
    answer:
      "It means the named reviewer checked the medical and scientific statements on that page on that date. Prices, rankings and provider descriptions are editorial and are maintained on their own schedule by the research team; price checks carry their own date on the page. A page is re-reviewed when its medical content changes materially or when the underlying guidance changes.",
  },
  {
    question: "Why do some pages show a reviewer but no date?",
    answer:
      "Because that page has not been reviewed yet. We name the site's reviewer as staff on every content page, but a date appears only when a review actually happened. We never backfill dates, and when a page's medical content is rewritten its previous date is removed until the new version is reviewed.",
  },
  {
    question: "Does the reviewer decide which providers are listed or ranked?",
    answer:
      "No. Provider selection, rankings, prices and \"best for\" verdicts are editorial decisions made by the research team under the published ranking method. The reviewer has no role in them and no part in any commercial partnership. Her review is limited to whether the medical statements are accurate and supported.",
  },
  {
    question: "What sources count as evidence on this site?",
    answer:
      "In order: FDA approvals, labels and safety communications; the published pivotal trials, cited by journal and date; position statements and guidelines from the relevant medical societies; and government health references such as MedlinePlus and the NIH institutes. Manufacturer and third-party figures are quoted with their date and labelled as reported, not verified. Trustpilot and Reddit excerpts are quoted as captured and are not medical evidence.",
  },
  {
    question: "How do I report an error?",
    answer:
      "Email contact@treatmentshub.com with the page address and the statement in question. Confirmed medical errors are corrected and the page is re-reviewed; the correction is reflected in the page's review date.",
  },
];

export default async function MedicalReviewPolicyPage() {
  const reviewer = REVIEWERS[0];
  const verticals = VERTICALS.filter((v) => PUBLISHED_VERTICALS.includes(v.id) && !isHiddenVertical(v.id));
  const configs = await Promise.all(verticals.map((v) => getConfig(v.id)));

  // Live figures from the review log and the provider configs.
  const logEntries = Object.entries(REVIEW_LOG);
  const reviewedPages = logEntries.length;
  const latestReview = logEntries.map(([, r]) => r.reviewedAt).sort().at(-1);
  const byVertical = new Map<string, Provider[]>();
  verticals.forEach((v, i) => {
    const cfg = configs[i];
    const ranked = new Set(cfg.ranking?.providerOrder ?? []);
    const providers = (cfg.providers ?? []).filter((p) => p.logo);
    // Ranked providers first, then the rest in config order.
    byVertical.set(v.id, [...providers.filter((p) => ranked.has(p.id)), ...providers.filter((p) => !ranked.has(p.id))]);
  });
  const seen = new Set<string>();
  const allProviders: Provider[] = [];
  for (const list of byVertical.values()) {
    for (const p of list) {
      const key = p.name.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      allProviders.push(p);
    }
  }
  const reviewedByVertical = verticals.map((v) => ({
    vertical: v,
    count: logEntries.filter(([path]) => path === `/${v.id}` || path.startsWith(`/${v.id}/`)).length,
  }));

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
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  const link = "font-semibold text-[#0C4B75] hover:underline";

  const stats = [
    { value: reviewedPages.toLocaleString("en-US"), label: "pages carry a logged medical review" },
    { value: latestReview ? fmt(latestReview) : "-", label: "most recent review date" },
    { value: String(allProviders.length), label: `providers compared across ${verticals.length} categories` },
    { value: fmt(PRICE_INDEX_VERIFIED), label: "weight-loss prices last checked at the source" },
  ];

  const steps = [
    {
      icon: FileSearch,
      title: "The research team drafts from primary sources",
      body: "Every guide, review and comparison starts with the provider's own published terms and the primary medical sources: FDA approvals and labels, the pivotal trials, society position statements and government health references. Each clinical or regulatory figure is cited inline with its source and date. Where we could not verify something, the page says so instead of estimating.",
    },
    {
      icon: BookOpenCheck,
      title: "The reviewer checks every medical statement against the evidence",
      body: "The reviewer reads the page and tests each medical and scientific claim: does the cited source actually say that, is the figure the one the paper reports and in the right analysis, is the regulatory status current, are the contraindications and side effects the label's, and is the terminology correct. Loose language, outdated figures and claims that outrun their source are flagged for correction.",
    },
    {
      icon: ClipboardCheck,
      title: "Corrections are made before sign-off",
      body: "Flagged statements are corrected or removed by the research team and the page goes back to the reviewer. Nothing is published as reviewed until the reviewer is satisfied that the medical content is accurate and supported. The reviewer has no say over which providers appear, how they rank or what they cost.",
    },
    {
      icon: Stethoscope,
      title: "The review is dated and published",
      body: "When the reviewer signs off, the date is logged and shown in the review bar under the page title, in the page's structured data and on the reviewer's profile. The date is the day the review happened, never earlier. Pages that have not been reviewed show the reviewer as staff with no date.",
    },
    {
      icon: ShieldCheck,
      title: "Re-review when the medicine moves",
      body: "A page is re-reviewed when its medical content changes materially, when the regulator or a cited guideline changes, or when a reader reports a confirmed error. If a page's medical content is rewritten, its old date is removed until the new version has been reviewed. Price and ranking updates are editorial and do not change the medical review date.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Masthead */}
      <div className="w-full" style={{ backgroundColor: "#EDF2F8" }}>
        <div className="mx-auto max-w-[1100px] px-4 pt-4 pb-6 sm:px-6 sm:py-10">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Medical review policy" }]} />
          <p className="mb-2 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#0C4B75]">
            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.25} />
            Trust and accuracy
          </p>
          <h1 className="text-[26px] font-bold leading-[1.15] text-[#191919] sm:max-w-[720px] sm:text-[36px]">
            How we review health content
          </h1>
          <p className="mt-3 max-w-[720px] text-[15px] leading-[1.6] text-gray-600 sm:text-[17px]">
            Treatments Hub compares online treatment providers. The medical and scientific statements in that content are
            checked by a named reviewer with the training to check them, against the labels, trials and guidelines they
            rest on. This page says exactly what that means, what it does not, and how you can tell on any page.
          </p>
          <p className="mt-3 text-[12.5px] text-gray-400">Last updated {fmt(UPDATED)}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6">
        {/* Live figures */}
        <div className="mb-12 grid gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-[22px] font-bold leading-tight text-[#191919]">{s.value}</p>
              <p className="mt-1 text-[12.5px] leading-snug text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Who reviews */}
        <section className="mb-12">
          <h2 className="mb-4 text-[24px] font-bold text-[#191919]">Who reviews</h2>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={reviewer.image.webp}
                alt={`${reviewer.name}, ${reviewer.jobTitle}`}
                width={112}
                height={112}
                className="h-24 w-24 shrink-0 rounded-full object-cover ring-1 ring-gray-200 sm:h-28 sm:w-28"
              />
              <div className="min-w-0 text-[15px] leading-[1.7] text-gray-700">
                <p className="text-[18px] font-bold text-[#191919]">{reviewerDisplayName(reviewer)}</p>
                <p className="text-[13.5px] font-medium text-[#0C4B75]">{reviewer.jobTitle} at Treatments Hub</p>
                <p className="mt-0.5 text-[13.5px] text-gray-500">{reviewer.headline}</p>
                <div className="mt-4 space-y-3">
                  {reviewer.longBio.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">Licensure and education</p>
                    <ul className="space-y-1 text-[13.5px] leading-snug">
                      {reviewer.licensure.map((l) => (
                        <li key={l.title}>{l.title}</li>
                      ))}
                      {reviewer.education.map((e) => (
                        <li key={e.degree}>
                          {e.degree}, {e.school}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">Areas of focus</p>
                    <ul className="space-y-1 text-[13.5px] leading-snug">
                      {reviewer.specialties.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="mt-4 text-[13.5px] text-gray-500">
                  <Link href={reviewerPath(reviewer)} className={link}>
                    Full profile
                  </Link>
                  {reviewer.linkedin && (
                    <>
                      {" · "}
                      <a href={reviewer.linkedin} target="_blank" rel="noopener noreferrer me" className={link}>
                        LinkedIn
                      </a>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-gray-500">
            Our reviewer is a licensed medical laboratory scientist with a Master of Public Health degree and clinical-trial
            experience, not a prescribing physician. We say &ldquo;reviewed for medical accuracy&rdquo; rather than
            &ldquo;medically reviewed by a doctor&rdquo; for that reason, and nothing on this site is medical advice.
          </p>
        </section>

        {/* The process */}
        <section className="mb-12">
          <h2 className="mb-2 text-[24px] font-bold text-[#191919]">The review, step by step</h2>
          <p className="mb-5 max-w-[760px] text-[15px] leading-[1.7] text-gray-600">
            The same five steps apply to every guide, provider review and comparison on the site, in every category.
          </p>
          <ol className="space-y-3">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-xl border border-gray-200 bg-white p-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F4F8FB] text-[#0C4B75]">
                  <s.icon className="h-[18px] w-[18px]" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[15.5px] font-bold text-[#191919]">
                    <span className="mr-1.5 text-gray-400">{i + 1}.</span>
                    {s.title}
                  </p>
                  <p className="mt-1 text-[14.5px] leading-[1.7] text-gray-700">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Scope */}
        <section className="mb-12 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
            <h2 className="mb-3 text-[20px] font-bold text-[#191919]">What is reviewed</h2>
            <ul className="list-disc space-y-1.5 pl-5 text-[14.5px] leading-[1.7] text-gray-700">
              <li>How a medication or treatment works, and the terminology used to describe it.</li>
              <li>Clinical-trial figures: the number, the analysis it comes from, and what the study actually measured.</li>
              <li>Regulatory status: FDA approval, compounding rules, what &ldquo;compounded&rdquo; means and does not mean.</li>
              <li>Contraindications, interactions, side effects and safety statements, against the label and regulator guidance.</li>
              <li>Whether a claim is supported by the source it cites, and whether that source is current.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="mb-3 text-[20px] font-bold text-[#191919]">What is not reviewed</h2>
            <p className="mb-3 text-[14.5px] leading-[1.7] text-gray-700">
              Prices, provider rankings, partner selection, provider descriptions and &ldquo;best for&rdquo; verdicts are
              editorial. They are produced by the Treatments Hub research team under the method on{" "}
              <Link href="/weight-loss/how-we-rank" className={link}>
                how we rank
              </Link>
              , and the reviewer has no role in them.
            </p>
            <p className="text-[14.5px] leading-[1.7] text-gray-700">
              Trustpilot figures and Reddit excerpts are quoted as captured, with the date, and are not medical evidence.
              Reviewers do not choose providers, set prices or rankings, or take part in commercial partnerships. We may earn
              a commission from provider links; that never changes a medical statement or a review date.
            </p>
          </div>
        </section>

        {/* Evidence standard */}
        <section className="mb-12">
          <h2 className="mb-3 text-[24px] font-bold text-[#191919]">The evidence we accept, in order</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full min-w-[640px] text-left text-[14px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 font-bold text-[#191919]">Source</th>
                  <th className="px-4 py-3 font-bold text-[#191919]">Used for</th>
                  <th className="px-4 py-3 font-bold text-[#191919]">How it appears on the page</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr>
                  <td className="px-4 py-3 font-medium text-[#191919]">FDA approvals, labels and safety communications</td>
                  <td className="px-4 py-3">Approval dates, indications, dosing rules, contraindications, boxed warnings, compounding policy</td>
                  <td className="px-4 py-3">Linked inline at the claim, with the date</td>
                </tr>
                <tr className="bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-[#191919]">Pivotal trials in peer-reviewed journals</td>
                  <td className="px-4 py-3">Efficacy figures, side-effect rates, what happens on stopping</td>
                  <td className="px-4 py-3">Journal, date and DOI; the analysis the figure comes from is named</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-[#191919]">Society position statements and guidelines</td>
                  <td className="px-4 py-3">Who a treatment suits, monitoring, timing, non-hormonal and non-drug options</td>
                  <td className="px-4 py-3">Named and linked, with the year</td>
                </tr>
                <tr className="bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-[#191919]">Government health references (MedlinePlus, NIH institutes)</td>
                  <td className="px-4 py-3">Plain-language mechanism, label summaries, prevalence statements</td>
                  <td className="px-4 py-3">Linked inline, with the date checked</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-[#191919]">Providers&rsquo; own published terms</td>
                  <td className="px-4 py-3">Prices, plans, shipping, what is included</td>
                  <td className="px-4 py-3">Checked on the provider&rsquo;s site and dated; editorial, not medical</td>
                </tr>
                <tr className="bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-[#191919]">Manufacturer and third-party figures</td>
                  <td className="px-4 py-3">Direct-pay prices, savings programmes, availability</td>
                  <td className="px-4 py-3">Quoted with the source and date, labelled &ldquo;reported, not verified by us&rdquo;</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-gray-500">
            One rule sits above the table: we never estimate. If a figure cannot be verified, the page says so instead of
            guessing, and a price that cannot be checked at the source is not shown.
          </p>
        </section>

        {/* Review dates */}
        <section className="mb-12">
          <h2 className="mb-3 text-[24px] font-bold text-[#191919]">How to read the review bar on any page</h2>
          <p className="mb-3 text-[15px] leading-[1.7] text-gray-700">
            Every content page carries a review bar under its title. Click or hover on the reviewer&rsquo;s name and a
            bubble explains who she is and what the review covered. The bar has two honest states:
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-[15px] leading-[1.7] text-gray-700">
            <li>
              <strong className="text-[#191919]">&ldquo;Reviewed for medical accuracy by&rdquo; with a date.</strong>{" "}The named
              reviewer went through that page on that date. The same date is published in the page&rsquo;s structured data
              and listed on the reviewer&rsquo;s profile.
            </li>
            <li>
              <strong className="text-[#191919]">&ldquo;Medical reviewer&rdquo; with no date.</strong>{" "}The page names the site&rsquo;s
              reviewer as staff but has not yet been reviewed, or its medical content was rewritten since its last review.
              We do not backfill dates.
            </li>
          </ul>
          <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {reviewedByVertical.map(({ vertical, count }) => (
              <Link
                key={vertical.id}
                href={`/${vertical.id}`}
                className="group rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-[#0C4B75]/40"
              >
                <p className="text-[20px] font-bold leading-tight text-[#191919]">{count}</p>
                <p className="mt-0.5 text-[12.5px] leading-snug text-gray-500">
                  reviewed pages in <span className="font-semibold text-[#191919] group-hover:text-[#0C4B75]">{vertical.name}</span>
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Providers we compare */}
        <section className="mb-12 rounded-2xl border border-gray-200 bg-white px-5 py-9 sm:px-8">
          <h2 className="text-center text-[22px] font-bold tracking-[-0.015em] text-[#191919] sm:text-[26px]">
            The providers this policy covers
          </h2>
          <p className="mx-auto mt-2 max-w-[640px] text-center text-[15px] leading-relaxed text-gray-500">
            Every licensed telehealth brand we compare, across {verticals.length} categories. Their pages carry the same review
            bar, the same evidence rules and the same separation between medical review and editorial ranking.
          </p>
          <div
            className="logo-marquee relative mt-7 overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
            }}
          >
            <div className="logo-marquee-track flex items-center">
              {[...allProviders, ...allProviders].map((p, i) => (
                <div
                  key={`${p.id}-${i}`}
                  aria-hidden={i >= allProviders.length}
                  className="mr-10 flex h-[26px] w-[84px] shrink-0 items-center justify-center opacity-55 grayscale sm:mr-14 sm:h-[28px] sm:w-[104px]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.logo} alt={`${p.name} logo`} className="max-h-full max-w-full object-contain" loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {verticals.map((v) => {
              const list = byVertical.get(v.id) ?? [];
              return (
                <Link
                  key={v.id}
                  href={`/${v.id}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 transition-colors hover:border-[#0C4B75]/40 hover:bg-white"
                >
                  <span>
                    <span className="block text-[14.5px] font-bold text-[#191919] group-hover:text-[#0C4B75]">Compare {verticalNameInProse(v.name)} providers</span>
                    <span className="block text-[12.5px] text-gray-500">
                      {list.length} provider{list.length === 1 ? "" : "s"} compared
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-[#0C4B75]" strokeWidth={2.2} />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Independence */}
        <section className="mb-12">
          <h2 className="mb-3 text-[24px] font-bold text-[#191919]">Independence and money</h2>
          <p className="mb-3 text-[15px] leading-[1.7] text-gray-700">
            Treatments Hub is funded by commissions when a reader joins a provider through a link on this site. That is
            disclosed at the top of every page. It pays for the research, the price checks and the medical review, and it
            is kept away from all three in a specific way: the reviewer is not told which providers pay, takes no part in
            partnerships and cannot change a ranking; the research team scores providers under the published method and
            records every price with the date it was checked; and a provider cannot buy a better score, a review date or
            the removal of a caveat.
          </p>
          <p className="text-[15px] leading-[1.7] text-gray-700">
            Where a provider&rsquo;s own claim conflicts with the evidence, the evidence wins on the page. Where a provider
            has drawn a regulator&rsquo;s warning, the warning is noted in its review. Where the honest answer is &ldquo;we
            could not verify this&rdquo;, that is what the page says.
          </p>
        </section>

        {/* Report an error */}
        <section className="mb-12 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
          <h2 className="mb-2 flex items-center gap-2 text-[18px] font-bold text-[#191919]">
            <Mail className="h-5 w-5 text-emerald-600" strokeWidth={2} />
            Found an error?
          </h2>
          <p className="text-[15px] leading-[1.75] text-gray-600">
            Email{" "}
            <a href="mailto:contact@treatmentshub.com" className={link}>
              contact@treatmentshub.com
            </a>{" "}
            with the page address and the statement in question. Confirmed medical errors are corrected and the page is
            re-reviewed; confirmed price errors are corrected and re-dated. You can also reach us through the{" "}
            <Link href="/weight-loss/about" className={link}>
              about page
            </Link>
            .
          </p>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="mb-5 text-[24px] font-bold text-[#191919]">Questions readers ask about our reviews</h2>
          <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {FAQS.map((f) => (
              <div key={f.question} className="p-6">
                <h3 className="mb-2 text-[16px] font-bold text-[#191919]">{f.question}</h3>
                <p className="text-[14px] leading-[1.7] text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Back to the comparisons */}
        <section className="mb-10 rounded-2xl bg-[#0C4B75] p-6 text-white sm:p-8">
          <h2 className="text-[22px] font-bold leading-tight sm:text-[26px]">Ready to compare providers?</h2>
          <p className="mt-2 max-w-[640px] text-[15px] leading-relaxed text-white/80">
            Every ranking, review and comparison on the site is built under the rules on this page. Pick a category and
            see the providers side by side, with verified prices and the review bar on every page.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {verticals.map((v) => (
              <Link
                key={v.id}
                href={`/${v.id}`}
                className="inline-flex h-[42px] items-center gap-1.5 rounded-lg bg-white px-4 text-[14px] font-bold text-[#0C4B75] transition-colors hover:bg-[#F4F8FB]"
              >
                {v.name}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </Link>
            ))}
          </div>
        </section>

        <p className="text-[13px] leading-relaxed text-gray-400">
          Nothing on this site is medical advice. Compounded medications are not FDA-approved products. Talk to a licensed
          clinician about your own situation before starting or changing any treatment.
        </p>
      </div>
    </div>
  );
}
