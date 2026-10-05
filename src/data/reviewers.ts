// ───── Medical reviewers ─────
// Code-authoritative reviewer profiles and the page review log. Lives in code,
// not the CMS blob, so a CMS save can never blank a byline, and so the same
// Person entity (same @id) is emitted on every page that names the reviewer.
//
// House rules:
//   - Every credential, degree and employer is as supplied by the reviewer.
//     Nothing is added, upgraded or inferred. No credential letters that the
//     person does not hold.
//   - A page says "reviewed" and emits `reviewedBy` / `lastReviewed` ONLY when
//     REVIEW_LOG has an entry for it. Pages without an entry name the site's
//     medical reviewer as staff - never as having reviewed that page.
//   - The byline wording is "Reviewed for medical accuracy by", not "Medically
//     reviewed by a doctor": our reviewer is a medical laboratory scientist
//     with an MPH, and the wording must not imply a prescribing clinician.

export const HUB_ORIGIN = "https://www.treatmentshub.com";

export interface ReviewerCredential {
  title: string;
  issuer: string;
  detail?: string;
}

export interface ReviewerEducation {
  degree: string;
  school: string;
  location?: string;
  detail: string;
}

export interface ReviewerExperienceGroup {
  area: string;
  items: string[];
}

export interface ReviewerWork {
  title: string;
  outlet: string;
  url: string;
}

export interface Reviewer {
  slug: string;
  /** Plain name, no suffixes. */
  name: string;
  /** Full legal/profile name when it differs from `name` (schema alternateName). */
  fullName?: string;
  /** Post-nominal letters, in display order. */
  credentials: string[];
  /** Role as shown in bylines and schema jobTitle. */
  jobTitle: string;
  /** One line under the name: what the person is, in plain words. */
  headline: string;
  /** 40-60 words, third person. */
  shortBio: string;
  /** Long bio, one paragraph per entry. */
  longBio: string[];
  image: { src: string; webp: string; thumb: string; width: number; height: number };
  licensure: ReviewerCredential[];
  education: ReviewerEducation[];
  experience: ReviewerExperienceGroup[];
  specialties: string[];
  selectedWork: ReviewerWork[];
  /** Public profile URLs (LinkedIn etc.). Only real, supplied URLs. */
  sameAs: string[];
  linkedin?: string;
  /** What this reviewer checks on a page, in the reviewer's scope statement. */
  scope: string;
  /** Verticals this reviewer covers. */
  verticals: string[];
  /** Month the reviewer joined, YYYY-MM. */
  since: string;
}

export const REVIEWERS: Reviewer[] = [
  {
    slug: "francheska-capistrano",
    name: "Francheska Capistrano",
    fullName: "Francheska Lynn Capistrano",
    credentials: ["RMT", "MPH"],
    jobTitle: "Medical Content Reviewer",
    headline: "Licensed Medical Laboratory Scientist (Registered Medical Technologist) and Master of Public Health graduate",
    shortBio:
      "Francheska Capistrano is a licensed Medical Laboratory Scientist with a Master of Public Health degree. She has coordinated international clinical trials, with a focus on protocol compliance, clinical documentation and data review, and writes and reviews evidence-based health content for patient and physician audiences.",
    longBio: [
      "Francheska Capistrano is a licensed Medical Laboratory Scientist (Registered Medical Technologist) with a Master of Public Health degree. She has experience coordinating international clinical trials, with a focus on protocol compliance, study documentation, protocol-related workflows and clinical research systems, and she is building experience in eSource implementation: translating trial protocols, schedules of events, assessments and documentation requirements into accurate, compliant electronic workflows.",
      "As a content curator for health, medical and wellness businesses, she translates evidence-based knowledge into accessible formats for wider audiences, with a particular interest in sleep science, sleep health and sleep hygiene. Her writing includes evidence-based health articles, patient education materials, research summaries and clinical research content. As a medical content reviewer, she combines scientific accuracy, critical appraisal and clear communication to ensure content is credible and easy to understand.",
      "At Treatments Hub she reviews the medical and scientific statements in our guides, reviews and comparisons: how GLP-1 and other treatments work, what the cited trials and regulators actually say, and whether the terminology and claims match the evidence. She does not choose providers, set prices or rankings, or take part in commercial partnerships.",
    ],
    image: {
      src: "/reviewers/francheska-capistrano.jpg",
      webp: "/reviewers/francheska-capistrano.webp",
      thumb: "/reviewers/francheska-capistrano-160.webp",
      width: 800,
      height: 800,
    },
    licensure: [
      {
        title: "Licensed Medical Laboratory Scientist (Registered Medical Technologist)",
        issuer: "Professional licensure, Philippines",
        detail: "Formal training in clinical laboratory medicine, diagnostic testing, microbiology, hematology, immunology, clinical chemistry, pathology and disease processes.",
      },
    ],
    education: [
      {
        degree: "Master of Public Health (MPH)",
        school: "University of Essex",
        location: "United Kingdom",
        detail: "Advanced training in epidemiology, public health research, health promotion, biostatistics, disease prevention and evidence-based healthcare practice.",
      },
      {
        degree: "Bachelor of Science in Medical Laboratory Science",
        school: "Saint Louis University",
        location: "Baguio City, Philippines",
        detail: "Clinical laboratory medicine, diagnostic testing, microbiology, hematology, immunology, clinical chemistry and pathology.",
      },
    ],
    experience: [
      {
        area: "Clinical research",
        items: [
          "Supporting international clinical trials: protocol compliance monitoring, clinical documentation review, source data verification and data quality checks",
          "Clinical trial coordination, study documentation and protocol-related workflows in clinical research systems",
          "eSource implementation: translating protocols, schedules of events and assessments into compliant electronic workflows",
          "Regulatory and ethics documentation support; clinical data review and reconciliation",
          "Good Clinical Practice (GCP)-aligned research processes",
        ],
      },
      {
        area: "Medical writing and content review",
        items: [
          "Evidence-based health articles, patient education materials and clinical research summaries",
          "Content curation for health, medical and wellness businesses: translating evidence into accessible formats",
          "Medical blogs, healthcare content and SEO/AEO medical content",
          "Physician- and patient-facing educational materials",
        ],
      },
      {
        area: "Medical fact-checking and evidence appraisal",
        items: [
          "Evaluating health information for scientific accuracy, evidence alignment, clinical relevance and correct terminology",
          "Reviewing scientific literature, clinical studies and medical references to assess evidence quality and identify unsupported or outdated claims",
          "Consistency with published research and clinical guidelines; clear communication of complex concepts for general audiences",
        ],
      },
      {
        area: "Healthcare and digital health",
        items: [
          "Work with clinical research teams, telehealth platforms, digital health companies and healthcare content teams",
          "Collaboration with physicians, clinical researchers, healthcare providers, research coordinators and medical content teams",
        ],
      },
    ],
    specialties: [
      "Clinical trial coordination and GCP",
      "Clinical laboratory medicine",
      "Epidemiology and biostatistics",
      "Evidence appraisal and medical fact-checking",
      "Patient education and health communication",
      "Sleep science and sleep health",
    ],
    selectedWork: [
      { title: "The gap your recruitment forecast can't see", outlet: "83bar", url: "https://www.83bar.com/the-gap-your-recruitment-forecast-cant-see/" },
      { title: "Can AI accelerate patient recruitment?", outlet: "83bar", url: "https://www.83bar.com/can-ai-accelerate-patient-recruitment/" },
      { title: "Why are so many referrals lost before screening really begins?", outlet: "Antidote", url: "https://www.antidote.me/blog/why-are-so-many-referrals-lost-before-screening-really-begins" },
      { title: "Neurology enrollment: why sites miss dates even when willing patients are willing to enroll", outlet: "Antidote", url: "https://www.antidote.me/blog/neurology-enrollment-why-sites-miss-dates-even-if-willing-patients-are-willing-to-enroll" },
    ],
    sameAs: ["https://www.linkedin.com/in/francheskacapistrano/"],
    linkedin: "https://www.linkedin.com/in/francheskacapistrano/",
    scope:
      "Reviews the medical and scientific statements on a page: mechanism of action, clinical-trial figures, regulatory status, contraindications, side effects and terminology. Does not review prices, rankings, partner selection or provider descriptions, which are editorial.",
    verticals: ["weight-loss", "hair-loss", "trt", "hrt", "online-therapy"],
    since: "2026-10",
  },
];

/** The reviewer named sitewide as the site's medical reviewer. */
export const SITE_REVIEWER_SLUG = "francheska-capistrano";

// ───── Review log ─────
// Keyed by the hub's content path (e.g. "/weight-loss/articles/is-medvi-legit").
// An entry means the named reviewer actually reviewed that page on that date.
// Add entries only when a review happened; never backfill dates.
export interface PageReview {
  reviewer: string; // Reviewer.slug
  reviewedAt: string; // YYYY-MM-DD
}

// 2026-10-04: full-site review by Francheska Capistrano - every content page
// that carried the review bar on that date (operator-confirmed). Pages
// created after this date are NOT covered; add them here when reviewed.
const REVIEWED_2026_10_04: string[] = [
  "/",
  "/hair-loss",
  "/hair-loss/articles",
  "/hair-loss/articles/best-online-hair-loss-treatment",
  "/hair-loss/articles/can-stress-cause-hair-loss",
  "/hair-loss/articles/dht-and-hair-loss",
  "/hair-loss/articles/do-hair-loss-shampoos-work",
  "/hair-loss/articles/does-creatine-cause-hair-loss",
  "/hair-loss/articles/does-finasteride-lower-testosterone",
  "/hair-loss/articles/does-finasteride-work",
  "/hair-loss/articles/dutasteride-online",
  "/hair-loss/articles/dutasteride-vs-finasteride",
  "/hair-loss/articles/finasteride-and-minoxidil-together",
  "/hair-loss/articles/finasteride-side-effects",
  "/hair-loss/articles/finasteride-vs-minoxidil",
  "/hair-loss/articles/hair-loss-treatment-cost",
  "/hair-loss/articles/hair-loss-treatment-for-women",
  "/hair-loss/articles/hair-transplant-vs-medication",
  "/hair-loss/articles/happyhead-alternatives",
  "/hair-loss/articles/happyhead-cost",
  "/hair-loss/articles/hims-alternatives",
  "/hair-loss/articles/how-long-hair-loss-treatment-works",
  "/hair-loss/articles/how-to-get-finasteride-online",
  "/hair-loss/articles/how-to-stop-hair-loss",
  "/hair-loss/articles/iron-deficiency-hair-loss",
  "/hair-loss/articles/is-happyhead-legit",
  "/hair-loss/articles/is-maximus-legit",
  "/hair-loss/articles/is-petermd-legit",
  "/hair-loss/articles/keeps-alternatives",
  "/hair-loss/articles/maximus-alternatives",
  "/hair-loss/articles/maximus-cost",
  "/hair-loss/articles/menopause-hair-loss",
  "/hair-loss/articles/microneedling-for-hair-loss",
  "/hair-loss/articles/minoxidil-shedding-phase",
  "/hair-loss/articles/norwood-scale",
  "/hair-loss/articles/oral-minoxidil-online",
  "/hair-loss/articles/oral-minoxidil-vs-topical-minoxidil",
  "/hair-loss/articles/petermd-alternatives",
  "/hair-loss/articles/petermd-cost",
  "/hair-loss/articles/receding-hairline-treatment",
  "/hair-loss/articles/saw-palmetto-hair-loss",
  "/hair-loss/articles/topical-finasteride",
  "/hair-loss/articles/veradermics-vdphl01",
  "/hair-loss/happyhead-vs-petermd",
  "/hair-loss/hims-vs-happy-head",
  "/hair-loss/hims-vs-keeps",
  "/hair-loss/hims-vs-maximus",
  "/hair-loss/keeps-vs-happy-head",
  "/hair-loss/keeps-vs-maximus",
  "/hair-loss/maximus-vs-happy-head",
  "/hair-loss/maximus-vs-petermd",
  "/hair-loss/reviews",
  "/hair-loss/reviews/happyhead",
  "/hair-loss/reviews/hims",
  "/hair-loss/reviews/keeps",
  "/hair-loss/reviews/maximus",
  "/hair-loss/reviews/petermd",
  "/hair-loss/reviews/ro",
  "/hair-loss/ro-vs-happy-head",
  "/hair-loss/ro-vs-maximus",
  "/hrt",
  "/hrt/articles",
  "/hrt/articles/bioidentical-hormones-explained",
  "/hrt/articles/does-hrt-cause-weight-gain",
  "/hrt/articles/estrogen-patch-vs-pill",
  "/hrt/articles/how-long-can-you-stay-on-hrt",
  "/hrt/articles/how-to-get-hrt-online",
  "/hrt/articles/hrt-and-hair-thinning",
  "/hrt/articles/hrt-and-libido",
  "/hrt/articles/hrt-pros-and-cons",
  "/hrt/articles/hrt-side-effects",
  "/hrt/articles/hrt-vs-birth-control",
  "/hrt/articles/is-hrt-the-same-as-trt",
  "/hrt/articles/non-hormonal-menopause-treatment",
  "/hrt/articles/perimenopause-vs-menopause",
  "/hrt/articles/what-is-hrt",
  "/hrt/articles/when-to-start-hrt",
  "/hrt/hone-vs-winona",
  "/hrt/midi-vs-winona",
  "/hrt/reviews",
  "/hrt/reviews/directmeds",
  "/hrt/reviews/gala",
  "/hrt/reviews/hone",
  "/hrt/reviews/innerbalance",
  "/hrt/reviews/midi",
  "/hrt/reviews/nurx",
  "/hrt/reviews/winona",
  "/hrt/reviews/wisp",
  "/hrt/winona-vs-nurx",
  "/online-therapy",
  "/online-therapy/articles",
  "/online-therapy/articles/cbt-online",
  "/online-therapy/articles/does-betterhelp-take-insurance",
  "/online-therapy/articles/does-online-therapy-work",
  "/online-therapy/articles/does-talkspace-take-insurance",
  "/online-therapy/articles/free-and-low-cost-therapy-options",
  "/online-therapy/articles/how-much-does-betterhelp-cost",
  "/online-therapy/articles/how-to-choose-an-online-therapy-platform",
  "/online-therapy/articles/is-betterhelp-legit",
  "/online-therapy/articles/is-talkiatry-legit",
  "/online-therapy/articles/online-couples-therapy",
  "/online-therapy/articles/online-psychiatry",
  "/online-therapy/articles/online-therapy-cost",
  "/online-therapy/articles/online-therapy-for-anxiety",
  "/online-therapy/articles/online-therapy-for-depression",
  "/online-therapy/articles/online-therapy-reddit",
  "/online-therapy/articles/online-therapy-that-takes-insurance",
  "/online-therapy/articles/online-therapy-vs-in-person",
  "/online-therapy/articles/online-therapy-with-medication",
  "/online-therapy/articles/therapy-vs-psychiatry",
  "/online-therapy/articles/types-of-therapy",
  "/online-therapy/betterhelp-vs-talkspace",
  "/online-therapy/headspace-vs-betterhelp",
  "/online-therapy/reviews",
  "/online-therapy/reviews/betterhelp",
  "/online-therapy/reviews/headspace",
  "/online-therapy/reviews/talkiatry",
  "/online-therapy/reviews/talkspace",
  "/online-therapy/talkspace-vs-talkiatry",
  "/trt",
  "/trt/articles",
  "/trt/articles/can-you-stop-trt",
  "/trt/articles/does-trt-cause-hair-loss",
  "/trt/articles/does-trt-increase-libido",
  "/trt/articles/enclomiphene-vs-trt",
  "/trt/articles/free-vs-total-testosterone",
  "/trt/articles/how-to-get-trt-online",
  "/trt/articles/is-trt-bad-for-you",
  "/trt/articles/is-trt-covered-by-insurance",
  "/trt/articles/low-testosterone-symptoms",
  "/trt/articles/normal-testosterone-levels-by-age",
  "/trt/articles/testosterone-cypionate-vs-enanthate",
  "/trt/articles/testosterone-injections-vs-cream-vs-oral",
  "/trt/articles/trt-and-estrogen",
  "/trt/articles/trt-and-fertility",
  "/trt/articles/trt-blood-work",
  "/trt/articles/trt-clinic-vs-online",
  "/trt/articles/trt-cost",
  "/trt/articles/trt-results-timeline",
  "/trt/articles/trt-side-effects",
  "/trt/articles/trt-vs-steroids",
  "/trt/articles/what-is-medvi-quad",
  "/trt/dudemeds-vs-petermd",
  "/trt/fountain-trt-vs-petermd",
  "/trt/hims-vs-male-excel",
  "/trt/hone-health-vs-maximus",
  "/trt/marek-health-vs-dudemeds",
  "/trt/maximus-vs-hims",
  "/trt/reviews",
  "/trt/reviews/dudemeds",
  "/trt/reviews/fountain",
  "/trt/reviews/hims",
  "/trt/reviews/hone",
  "/trt/reviews/maleexcel",
  "/trt/reviews/marek",
  "/trt/reviews/maximus",
  "/trt/reviews/medvi-quad",
  "/trt/reviews/petermd",
  "/weight-loss",
  "/weight-loss/altrx-vs-embody",
  "/weight-loss/altrx-vs-ro",
  "/weight-loss/altrx-vs-sprout",
  "/weight-loss/altrx-vs-trimrx",
  "/weight-loss/altrx-vs-wellmedr",
  "/weight-loss/articles",
  "/weight-loss/articles/altrx-alternatives",
  "/weight-loss/articles/altrx-cost",
  "/weight-loss/articles/best-glp1-for-weight-loss",
  "/weight-loss/articles/best-mounjaro-alternatives",
  "/weight-loss/articles/best-noom-alternatives",
  "/weight-loss/articles/best-ozempic-alternatives",
  "/weight-loss/articles/best-ro-alternatives",
  "/weight-loss/articles/best-tirzepatide-online",
  "/weight-loss/articles/best-wegovy-alternatives",
  "/weight-loss/articles/can-you-get-ozempic-without-doctor",
  "/weight-loss/articles/choosing-telehealth-weight-loss-provider",
  "/weight-loss/articles/compounded-semaglutide-vs-brand-name",
  "/weight-loss/articles/directmeds-alternatives",
  "/weight-loss/articles/directmeds-cost",
  "/weight-loss/articles/embody-alternatives",
  "/weight-loss/articles/embody-cost",
  "/weight-loss/articles/emotional-eating-and-weight-loss",
  "/weight-loss/articles/exercise-while-on-glp1-medication",
  "/weight-loss/articles/first-month-weight-loss-medication",
  "/weight-loss/articles/glp1-and-mental-health",
  "/weight-loss/articles/glp1-weight-loss-for-women",
  "/weight-loss/articles/glp1-weight-loss-over-40",
  "/weight-loss/articles/glp1-with-insurance",
  "/weight-loss/articles/healthrx-alternatives",
  "/weight-loss/articles/healthrx-cost",
  "/weight-loss/articles/how-glp1-medications-work",
  "/weight-loss/articles/how-long-for-semaglutide-to-work",
  "/weight-loss/articles/how-to-get-ozempic-online",
  "/weight-loss/articles/in-person-vs-online-weight-loss",
  "/weight-loss/articles/is-altrx-legit",
  "/weight-loss/articles/is-directmeds-legit",
  "/weight-loss/articles/is-embody-legit",
  "/weight-loss/articles/is-healthrx-legit",
  "/weight-loss/articles/is-medvi-legit",
  "/weight-loss/articles/is-shed-legit",
  "/weight-loss/articles/is-sprout-legit",
  "/weight-loss/articles/is-trimrx-legit",
  "/weight-loss/articles/is-wellmedr-legit",
  "/weight-loss/articles/medvi-alternatives",
  "/weight-loss/articles/medvi-cost",
  "/weight-loss/articles/medvi-tirzepatide-cost",
  "/weight-loss/articles/menopause-weight-gain",
  "/weight-loss/articles/mounjaro-vs-ozempic",
  "/weight-loss/articles/ozempic-face",
  "/weight-loss/articles/ozempic-hair-loss",
  "/weight-loss/articles/ozempic-vs-wegovy-differences",
  "/weight-loss/articles/semaglutide-cost-per-month",
  "/weight-loss/articles/semaglutide-side-effects-guide",
  "/weight-loss/articles/shed-alternatives",
  "/weight-loss/articles/shed-cost",
  "/weight-loss/articles/sprout-alternatives",
  "/weight-loss/articles/sprout-cost",
  "/weight-loss/articles/stopping-glp1-medication-what-happens",
  "/weight-loss/articles/testosterone-and-weight-loss",
  "/weight-loss/articles/tirzepatide-vs-semaglutide",
  "/weight-loss/articles/trimrx-alternatives",
  "/weight-loss/articles/trimrx-cost",
  "/weight-loss/articles/weight-loss-medication-cost-guide",
  "/weight-loss/articles/weight-loss-medication-that-works-fast",
  "/weight-loss/articles/weight-loss-medication-without-insurance",
  "/weight-loss/articles/weight-loss-plateau-what-to-do",
  "/weight-loss/articles/wellmedr-alternatives",
  "/weight-loss/articles/wellmedr-cost",
  "/weight-loss/articles/what-to-eat-on-glp1-medication",
  "/weight-loss/articles/who-qualifies-for-glp1-weight-loss",
  "/weight-loss/articles/zepbound-vs-wegovy",
  "/weight-loss/articles/zepbound-vs-wegovy-vs-ozempic",
  "/weight-loss/best-online-weight-loss-programs",
  "/weight-loss/best-weight-loss-injections",
  "/weight-loss/cheapest-glp1",
  "/weight-loss/cheapest-weight-loss-medication",
  "/weight-loss/embody-vs-medvi",
  "/weight-loss/embody-vs-ro",
  "/weight-loss/embody-vs-sprout",
  "/weight-loss/embody-vs-trimrx",
  "/weight-loss/embody-vs-wellmedr",
  "/weight-loss/glp1-pills-vs-injections",
  "/weight-loss/glp1-weight-loss-statistics",
  "/weight-loss/healthrx-vs-medvi",
  "/weight-loss/how-to-choose-a-glp1-provider",
  "/weight-loss/how-we-rank",
  "/weight-loss/medvi-vs-altrx",
  "/weight-loss/medvi-vs-ro",
  "/weight-loss/medvi-vs-trimrx",
  "/weight-loss/medvi-vs-wellmedr",
  "/weight-loss/ozempic-alternatives",
  "/weight-loss/ozempic-for-weight-loss",
  "/weight-loss/retatrutide-weight-loss",
  "/weight-loss/reviews",
  "/weight-loss/reviews/altrx",
  "/weight-loss/reviews/bmimd",
  "/weight-loss/reviews/directmeds",
  "/weight-loss/reviews/embody",
  "/weight-loss/reviews/healthrx",
  "/weight-loss/reviews/medvi",
  "/weight-loss/reviews/noom",
  "/weight-loss/reviews/ro",
  "/weight-loss/reviews/shed",
  "/weight-loss/reviews/sprout",
  "/weight-loss/reviews/trimrx",
  "/weight-loss/reviews/wellmedr",
  "/weight-loss/ro-vs-wellmedr",
  "/weight-loss/semaglutide",
  "/weight-loss/sprout-vs-trimrx",
  "/weight-loss/sprout-vs-wellmedr",
  "/weight-loss/switch-from-ozempic",
  "/weight-loss/tirzepatide",
  "/weight-loss/trimrx-vs-ro",
  "/weight-loss/trimrx-vs-wellmedr",
  "/weight-loss/wegovy-providers",
  "/weight-loss/weight-loss-pills",
];

// Pages published and reviewed after the full-site pass.
const REVIEWED_LATER: Record<string, PageReview> = {
  "/weight-loss/articles/is-ro-legit": { reviewer: "francheska-capistrano", reviewedAt: "2026-10-04" },
  "/weight-loss/articles/ro-cost": { reviewer: "francheska-capistrano", reviewedAt: "2026-10-04" },
  "/weight-loss/articles/embody-tirzepatide-review": { reviewer: "francheska-capistrano", reviewedAt: "2026-10-04" },
};

export const REVIEW_LOG: Record<string, PageReview> = {
  ...Object.fromEntries(REVIEWED_2026_10_04.map((p) => [p, { reviewer: "francheska-capistrano", reviewedAt: "2026-10-04" }])),
  ...REVIEWED_LATER,
};

export function getReviewer(slug: string = SITE_REVIEWER_SLUG): Reviewer | undefined {
  return REVIEWERS.find((r) => r.slug === slug);
}

export function reviewerDisplayName(r: Reviewer): string {
  return r.credentials.length ? `${r.name}, ${r.credentials.join(", ")}` : r.name;
}

export function reviewerUrl(r: Reviewer): string {
  return `${HUB_ORIGIN}/reviewers/${r.slug}`;
}

export function reviewerPath(r: Reviewer): string {
  return `/reviewers/${r.slug}`;
}

/** Normalize a path for the log: strip origin, query, trailing slash. */
function logKey(path: string): string {
  let p = path.replace(/^https?:\/\/[^/]+/, "").split("?")[0];
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

export function getPageReview(path: string): (PageReview & { reviewerProfile: Reviewer }) | null {
  const entry = REVIEW_LOG[logKey(path)];
  if (!entry) return null;
  const reviewerProfile = getReviewer(entry.reviewer);
  if (!reviewerProfile) return null;
  return { ...entry, reviewerProfile };
}

/** Schema.org Person for a reviewer, with a stable @id reused on every page. */
export function reviewerPersonSchema(r: Reviewer) {
  const schema: Record<string, unknown> = {
    "@type": "Person",
    "@id": `${reviewerUrl(r)}#person`,
    name: r.name,
    honorificSuffix: r.credentials.join(", "),
    jobTitle: r.jobTitle,
    description: r.shortBio,
    url: reviewerUrl(r),
    image: `${HUB_ORIGIN}${r.image.src}`,
    worksFor: { "@type": "Organization", name: "Treatments Hub", url: HUB_ORIGIN },
    knowsAbout: r.specialties,
    alumniOf: r.education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
    hasCredential: [
      ...r.licensure.map((c) => ({
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: c.title,
        recognizedBy: { "@type": "Organization", name: c.issuer },
      })),
      ...r.education.map((e) => ({
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: e.degree,
        recognizedBy: { "@type": "CollegeOrUniversity", name: e.school },
      })),
    ],
  };
  if (r.fullName && r.fullName !== r.name) schema.alternateName = r.fullName;
  if (r.sameAs.length) schema.sameAs = r.sameAs;
  return schema;
}

/**
 * Schema fragment for a content page: `reviewedBy` + `lastReviewed` when the
 * page is in the review log, nothing otherwise. Spread into Article/WebPage.
 */
export function pageReviewSchema(path: string): Record<string, unknown> {
  const review = getPageReview(path);
  if (!review) return {};
  return {
    reviewedBy: { "@id": `${reviewerUrl(review.reviewerProfile)}#person` },
    lastReviewed: review.reviewedAt,
  };
}
