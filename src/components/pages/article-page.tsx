import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { NOINDEX_ARTICLE_SLUGS, latestUpdate, AFFILIATE_PROVIDER_IDS } from "@/lib/config";
import { PRODUCT_CATALOG } from "@/lib/product-catalog";
import { enhanceArticleHtml } from "@/components/prose";
import { type SiteContext, canonicalUrl, hubLink } from "@/lib/site-context";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { pageReviewSchema } from "@/data/reviewers";
import { MedicalSources } from "@/components/medical-sources";
import { ProductCarousel } from "@/components/product-carousel";
import { TrustpilotCarousel, MixedTrustpilotCarousel, type MixedReviewItem } from "@/components/trustpilot-carousel";
import { TopProvidersBlock, TopTwoPicks } from "@/components/top-providers-block";
import { TirzepatidePriceTable } from "@/components/tirzepatide-price-table";
import { TrustpilotSummary } from "@/components/trustpilot-summary";
import { PRICE_INDEX_VERIFIED } from "@/lib/price-index";
import { LEGIT_PAGES, LegitChecklist, LegitVerdictCta, PricingCapture } from "@/components/legit-page-blocks";
import { ProviderCta } from "@/components/provider-cta";
import { PRICE_INDEX } from "@/lib/price-index";
import type { TrustpilotReview } from "@/lib/config";
import { RedditThreadCarousel, REDDIT_COMMUNITY_FEEDBACK } from "@/components/reddit-community";
import { notFound, permanentRedirect } from "next/navigation";

// Code-side CTR overrides for high-impression articles whose stored meta lives
// in the CMS blob (so it can't be tuned from the content files). Applied only
// on the weight-loss vertical. Prices cited are the providers' real listed
// prices - keep in sync when pricing changes.
const ARTICLE_SEO_OVERRIDES: Record<string, { title: string; description: string }> = {
  // Oct 2026, Bing 30-day export: the "legit or scam" phrasings convert at
  // 50-100% ("is embody legit or scam" 2/2, "embody weight loss scam" 2/1,
  // "is wellmedr a scam" 2/2, "wellmedr scam" 1/1), so the titles name the
  // question the searcher is actually typing. The pages answer it directly.
  "is-embody-legit": {
    title: "Is embody Legit or a Scam? Pharmacy, Pricing & Reviews (2026)",
    description:
      "Is embody legit or a scam? LegitScript-certified 503A pharmacies, licensed-provider prescribing, $69 semaglutide and $119 tirzepatide, refund if not approved, and what customers report.",
  },
  "is-wellmedr-legit": {
    title: "Is wellmedr Legit or a Scam? Reviews, Complaints & Real Prices (2026)",
    description:
      "Is wellmedr legit or a scam? A verified 4.6 on Trustpilot across 2,091 reviews, what the complaints actually say, the real $49-$89 pricing structure, and our verdict.",
  },
  "is-altrx-legit": {
    // Keeps the keyword-rich SERP snippet (prices, flat-dose) even though the
    // visible on-page dek was shortened to a clean editorial line.
    title: "Is altRx Legit? Pricing, Prescriptions & What to Know (2026)",
    description:
      "altRx sells $89 compounded plans and $1,149+ brand-name Ozempic side by side. We examined who prescribes, how the flat-dose pricing works, and the catches.",
  },
  "tirzepatide-vs-semaglutide": {
    title: "Tirzepatide vs Semaglutide (2026): Results & Prices",
    description:
      "Tirzepatide vs semaglutide, the two leading GLP-1s: up to 22.5% vs ~15% weight loss in trials, side effects, dosing - verified compounded prices from $49 and $89/month.",
  },
  "best-mounjaro-alternatives": {
    title: "7 Best Mounjaro Alternatives in 2026 (From $89/Month)",
    description:
      "Compounded tirzepatide - Mounjaro's active ingredient - from a verified $89/month at licensed providers, vs $1,000+ brand pens. Prices checked Aug 2026.",
  },
  "best-wegovy-alternatives": {
    title: "7 Best Wegovy Alternatives in 2026 (From $49/Month)",
    description:
      "Compounded semaglutide - Wegovy's active ingredient - from $49-$89/month through licensed online providers. Real prices, what's included, and how to choose.",
  },
  "best-ro-alternatives": {
    title: "Best ro Weight Loss Alternatives in 2026 (From $49/mo)",
    description:
      "Flat-priced GLP-1 providers that compete with ro: wellmedr ($49/mo), embody ($69/mo), altRx ($89/mo) and more - compared on price, speed and support.",
  },
  "can-you-get-ozempic-without-doctor": {
    title: "Can You Get Ozempic Without Seeing a Doctor? (2026)",
    description:
      "No - GLP-1s legally require a prescription. But you don't need an office visit: licensed telehealth providers evaluate you online, with treatment from $49/month.",
  },
  "weight-loss-medication-that-works-fast": {
    title: "Weight Loss Medication That Actually Works Fast (2026)",
    description:
      "GLP-1s are the fastest evidence-backed option: appetite changes in weeks, meaningful loss over months. What to realistically expect - and where to start online.",
  },
  "how-to-get-ozempic-online": {
    title: "How to Get Ozempic Online in 2026: 3 Steps (Legally)",
    description:
      "The legitimate route: online intake, licensed-provider review, medication shipped. Brand-name and compounded semaglutide options from $49/month, explained.",
  },
  "semaglutide-cost-per-month": {
    title: "Semaglutide Cost Per Month (2026): $49 vs $1,150+",
    description:
      "Compounded semaglutide runs $49-$199/month all-in via telehealth; brand-name Ozempic/Wegovy runs $1,150-$1,600 without insurance. Full real-price breakdown.",
  },
  "weight-loss-medication-without-insurance": {
    title: "Weight Loss Medication Without Insurance (From $49/mo)",
    description:
      "No coverage? Self-pay compounded GLP-1s start at $49-$89/month with the provider visit included. Real prices from licensed telehealth providers, compared.",
  },
  "compounded-semaglutide-vs-brand-name": {
    title: "Compounded Semaglutide vs Brand Name: Real Differences",
    description:
      "Same active ingredient, 503A-pharmacy preparation, and a 10x price gap ($49-$199 vs $1,150+/mo). What the FDA says, the real trade-offs, and how to stay safe.",
  },
};

// Direct-answer boxes injected at the top of key articles (featured-snippet
// targets). Code-rendered, so they work for articles whose body lives in the
// blob. Every figure is a real, listed price - no invented numbers.
const ARTICLE_QUICK_ANSWERS: Record<string, string> = {
  // Oct 8, 2026 research-driven cluster. Figures derive from the verified
  // price index (see src/lib/true-cost.ts) and dated external sources cited
  // inside each article; the dollar stamp below carries the index date.
  "glp1-true-cost-month-1-vs-year-one":
    "The price that matters is the one you keep paying, not month 1. At verified prices, year one of compounded semaglutide runs from $588 on wellmedr's 12-month plan to roughly $1,800-$2,400 at month-to-month providers; tirzepatide about $500-$1,200 more. The month-2 jump comes from promos with no published end date, 20%-off-month-one offers, and memberships billed next to the drug - all visible before you pay.",
  "before-you-prepay-glp1":
    "Pay monthly for the first two or three cycles, then prepay only if the provider has shipped on time and answered when you wrote. Before any prepaid or 12-month plan, get written answers to five questions: when you're charged and for what, what is refunded if shipments stop, how you cancel and whether you get confirmation, whether the plan auto-renews and with how much notice, and whether a financing company bills you separately.",
  "what-100-to-200-a-month-gets-you-glp1":
    "At verified published prices, under $100 a month buys compounded semaglutide from wellmedr ($49, 12-month plan), embody ($69, month to month), altRx ($89) and Medvi ($99 promo); $100-$150 buys compounded tirzepatide from embody ($119), DirectMeds ($147) and altRx ($149); $150-$200 buys the all-inclusive and coaching-led programs. Above $200 the choice becomes brand-name: Foundayo from $149 a month, brand injections from $1,149.",
  "lost-insurance-coverage-zepbound-wegovy":
    "Five routes: appeal if the drug is still on your formulary; use the manufacturer's savings card or direct price (Foundayo lists $149-$349 a month self-pay, $25 with commercial insurance); if you're on Medicare, the GLP-1 Bridge pilot charges a flat $50 a month for Wegovy, the Zepbound KwikPen and Foundayo through December 2027; buy brand-name for cash through telehealth ($1,149-$1,799 a month); or switch to a compounded version at $49-$299 a month. A licensed clinician decides whether your dose transfers.",
  "503a-vs-503b-pharmacy-28-day-rule":
    "A 503A pharmacy compounds for a named patient on a prescription and answers to its state board; a 503B outsourcing facility is FDA-registered and makes larger batches under manufacturing standards. Since semaglutide and tirzepatide left the FDA shortage list, a legitimate compounded GLP-1 comes from a licensed pharmacy filling a patient-specific prescription. The 28-day rule is the standard use period for an opened multi-dose vial - which is why plans ship monthly and a 90-day vial is a warning sign. Ask the pharmacy's name, its state licence, and the beyond-use date.",
  "glp1-after-65-medicare":
    "Since July 1, 2026, the Medicare GLP-1 Bridge pilot lets eligible beneficiaries get the Wegovy pill and injection, the Zepbound KwikPen and Foundayo for a flat $50 copay a month, unchanged as the dose rises, through December 31, 2027. Eligibility runs through clinical criteria and an approval step via your Part D plan. Medicare never covers compounded GLP-1s; if you don't qualify, the cash routes are brand-name ($149-$349 a month for Foundayo, $1,149+ for injections) or compounded ($49-$299).",
  "is-wellmedr-legit":
    "Yes - by every marker we can verify: licensed-provider review before prescribing, a regulated US pharmacy, a weight-loss warranty, and a verified 4.6 on Trustpilot across 2,091 reviews (tied for the highest among providers we track). The honest caveats: the headline $49/$89 rates lock on a 12-month plan, the complaints that exist are about shipping delays and support response time, and results vary by person regardless of service quality.",
  // Oct 9, 2026 oral GLP-1 pair. Ro figures are its verified published
  // prices; manufacturer figures are as reported by sources dated inside the
  // articles, so these two carry their own stamp (QUICK_ANSWER_STAMPS).
  "wegovy-pill-price-online":
    "The Wegovy pill costs $149 for the first month, then $299 a month, plus a $39-then-$74-149 membership at Ro - the one telehealth price we have verified. Novo Nordisk's direct-pay tiers are reported at $149 for the starting dose up to $299 at the maintenance dose. With commercial insurance that covers Wegovy, the manufacturer's savings offer is reported to bring it to as low as $25 a month; on Medicare, the GLP-1 Bridge pilot charges a flat $50 through December 2027. Every route requires a prescription.",
  "foundayo-vs-wegovy-pill":
    "Both are FDA-approved daily GLP-1 pills. The Wegovy pill (oral semaglutide, approved December 2025) produced 13.6% mean weight loss at 64 weeks in OASIS 4; Foundayo (orforglipron, approved April 1, 2026) produced 11.2% at the top dose over 72 weeks in ATTAIN-1 - separate trials, not head to head. The Wegovy pill must be taken on an empty stomach with a 30-minute wait; Foundayo has no food or water rules. Self-pay, Foundayo lists $149-$349 a month by dose and the Wegovy pill $149 then $299 plus membership at Ro; both are $25 with a commercial savings card and $50 on Medicare's pilot.",
  "zepbound-price-online":
    "Brand-name Zepbound online runs $1,249/month cash at altRx and $1,599 at wellmedr, or Zepbound KwikPens from $299 for the first month (then $399-449) plus a $39-then-$74-149 monthly membership at Ro, where insurance can apply. Compounded tirzepatide, the same active ingredient, runs $89-$299/month through licensed telehealth providers. Every route requires a prescription.",
  "best-tirzepatide-online":
    "Verified compounded tirzepatide prices run $89-$299/month: wellmedr $89 (12-month plan) is the floor, embody $119 the cheapest with no commitment, and Medvi $166 all-inclusive with one of the two largest review bases. Brand-name Zepbound: $1,249/month cash at altRx, or ro's KwikPen from $299 first month plus membership - where insurance applies, ro can be far cheaper. Every legitimate source requires a prescription.",
  "ozempic-face":
    "Ozempic face is facial volume loss caused by losing weight quickly - not a chemical side effect of the drug. It can happen with any GLP-1 or any rapid weight loss. The levers that soften it: a moderate pace of loss, adequate protein, resistance training and hydration - and facial volume often partially recovers as weight stabilizes.",
  "zepbound-vs-wegovy-vs-ozempic":
    "Zepbound (tirzepatide) produced up to 22.5% average weight loss in trials versus ~15% for Wegovy (semaglutide); Ozempic is the same semaglutide under its diabetes label. Verified prices: brand Zepbound $1,249/month and Wegovy $1,579 at altRx, versus compounded semaglutide from $49 and tirzepatide from $89 through licensed telehealth.",
  "glp1-with-insurance":
    "Many plans cover GLP-1s for diabetes, far fewer for weight loss alone - your formulary is the only real answer, and prior authorization (BMI thresholds, documented conditions) is the usual gate. If coverage falls through, verified self-pay compounded semaglutide runs $49-$99/month through licensed telehealth providers.",
  "ozempic-vs-wegovy-differences":
    "Ozempic and Wegovy contain the same active ingredient (semaglutide) but are not the same drug: Ozempic is FDA-approved for type 2 diabetes, Wegovy for chronic weight management at a higher maximum dose (2.4 mg vs 2 mg). For self-pay weight loss, compounded semaglutide runs a verified $49-$99/month versus $1,149+ for either brand.",
  "zepbound-vs-wegovy":
    "Both are FDA-approved for weight loss, but they are different drugs: Zepbound (tirzepatide) targets two hormone receptors and produced up to 22.5% average weight loss in trials versus ~15% for Wegovy (semaglutide). At verified prices, brand Zepbound runs $1,249/month at altRx (pens from $299 first month at ro); compounded routes start at $49-$99/month.",
  "mounjaro-vs-ozempic":
    "They are not the same drug: Mounjaro (tirzepatide) targets two hormone receptors and produced up to 22.5% average weight loss in trials, versus ~15% for Ozempic (semaglutide). Ozempic's compounded version is cheaper - verified from $49/month versus $89 for tirzepatide - and both require a prescription from a licensed provider.",
  "best-mounjaro-alternatives":
    "The closest Mounjaro alternatives are compounded tirzepatide plans - the same active ingredient - from licensed telehealth providers: $89/month at wellmedr, $119 at embody, $147 at DirectMeds, versus roughly $1,000+ for brand-name. Prescription required, shipped to your door.",
  "best-wegovy-alternatives":
    "The closest Wegovy alternatives are compounded semaglutide plans - the same active ingredient - starting at $49/month (wellmedr), $69 (embody) and $89 (altRx) through licensed online providers, versus $1,150+ for brand-name without insurance.",
  "best-ro-alternatives":
    "The strongest ro alternatives are flat-priced compounded GLP-1 providers: wellmedr from $49/month, embody at $69 with 1-2 day shipping, and altRx at $89 with brand-name options too. All require an online licensed-provider review.",
  "can-you-get-ozempic-without-doctor":
    "No - Ozempic and every GLP-1 medication legally require a prescription in the US. What you don't need is an in-person visit: licensed telehealth providers evaluate you online and, if appropriate, prescribe treatment starting around $49-$89/month.",
  "weight-loss-medication-that-works-fast":
    "GLP-1 medications (semaglutide, tirzepatide) are the fastest evidence-backed option: most people notice appetite changes within the first weeks, with meaningful weight loss building over 3-6 months. No pill or program works overnight - anyone promising that is selling something.",
  "how-to-get-ozempic-online":
    "Three steps: complete an online health intake, have a licensed provider review it (required by law), and receive medication by mail if prescribed. Brand-name Ozempic runs $1,150+/month; compounded semaglutide with the same active ingredient starts at $49-$89.",
  "semaglutide-cost-per-month":
    "Compounded semaglutide costs $49-$199 per month all-in through licensed telehealth providers (wellmedr $49, embody $69, altRx $89). Brand-name Ozempic or Wegovy runs roughly $1,150-$1,600 per month without insurance coverage.",
  "weight-loss-medication-without-insurance":
    "You don't need insurance: self-pay compounded GLP-1 plans include the provider visit and medication from $49/month (wellmedr), $69 (embody) or $89 (altRx). Brand-name without coverage runs $1,150+ - which is exactly why the compounded route exists.",
  "compounded-semaglutide-vs-brand-name":
    "Compounded semaglutide contains the same active ingredient as Ozempic and Wegovy, prepared by state-licensed 503A compounding pharmacies, at $49-$199/month versus $1,150+ for brand-name. The trade-off: compounded versions are not FDA-approved products, so provider and pharmacy quality matter most.",
};

// Per-article override of the dated price stamp under the quick answer, for
// articles whose dollar figures are not (only) from the verified price index.
const QUICK_ANSWER_STAMPS: Record<string, string> = {
  "wegovy-pill-price-online":
    "Ro's prices are its own published figures, verified August 2026. Manufacturer prices are as reported by the dated sources linked in the article and are not verified by us.",
  "foundayo-vs-wegovy-pill":
    "Ro's prices are its own published figures, verified August 2026. Manufacturer prices are as reported by the dated sources linked in the article and are not verified by us.",
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
      modifiedTime: latestUpdate(article.updatedAt),
      authors: [article.author || ctx.brandName],
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

  // Cannibalization consolidation: the generic "best telehealth providers"
  // article competed with the ranking homepage for the exact query cluster the
  // homepage should own ("best telehealth weight loss", "best online weight
  // loss clinic"). Its equity 301s to the homepage instead.
  if (slug === "best-weight-loss-telehealth-providers") {
    permanentRedirect(hubLink(ctx, "/"));
  }

  const article = articles.find((a) => a.slug === slug);
  if (!article) return notFound();

  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const nextArticle = articles[currentIndex + 1] || null;
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;

  // Brand-cluster articles (is-embody-legit, happyhead-cost, ...) carry the
  // provider id as a slug segment. On those, surface the provider's real
  // social proof - Trustpilot and Reddit carousels - high on the page.
  // Exact segment match so "ro" never fires inside "sprout". Trustpilot data
  // lives on the current vertical's own provider record, so it's safe on any
  // vertical; the Reddit registry is weight-loss-researched and stays gated
  // (a shared provider id like directmeds must not inherit those threads).
  const slugParts = slug.split("-");
  const subjectProvider = config.providers.find((p) => slugParts.includes(p.id));

  // On a single-brand legitimacy article ("is-<brand>-legit"), the product
  // carousel should showcase THAT brand only - competitors' products don't
  // belong on a page about whether this one provider is legit. Guarded so we
  // only restrict when the subject actually has affiliate catalog products
  // (otherwise fall back to the full catalog rather than an empty carousel).
  const isLegitArticle = /^is-.+-legit$/.test(slug);
  const restrictCarouselToSubject =
    isLegitArticle &&
    !!subjectProvider &&
    PRODUCT_CATALOG.some(
      (p) => p.providerId === subjectProvider.id && AFFILIATE_PROVIDER_IDS.includes(p.providerId),
    );
  const subjectTrustpilot =
    subjectProvider?.trustpilotReviews?.length ? subjectProvider : undefined;
  const subjectReddit =
    ctx.vertical === "weight-loss" && subjectProvider && REDDIT_COMMUNITY_FEEDBACK[subjectProvider.id]
      ? subjectProvider
      : undefined;

  // Conversion block: on select high-intent buyer guides that are otherwise all
  // prose, surface the site's top-ranked providers with the same ranked cards +
  // CTAs the comparison page uses, high on the page. Gated to specific slugs so
  // it never leaks onto informational articles.
  const TOP_PROVIDERS_CRO_SLUGS = new Set(["best-tirzepatide-online"]);
  const isWeightLoss = ctx.vertical === "weight-loss";
  const showTopProvidersCro = isWeightLoss && TOP_PROVIDERS_CRO_SLUGS.has(slug);

  // The tirzepatide buyer guide is tuned as a topic page (Oct 2026 CRO pass):
  // the top-3 block shows only providers with a verified tirzepatide price and
  // prints that price on the card; the price table is code-rendered with CTAs;
  // the product carousel is tirzepatide-only; the cross-provider Trustpilot
  // carousel shows every stored review that mentions the molecule; and the
  // generic mid-page blocks (duplicate provider list, stock-photo callout) are
  // dropped so the page stays on topic.
  const isTirzGuide = isWeightLoss && slug === "best-tirzepatide-online";
  const tirzNote = (id: string): string | undefined => {
    const cell = PRICE_INDEX.find((r) => r.providerId === id)?.tirzepatide;
    if (!cell) return undefined;
    const reg = cell.note.match(/reg\.\s*(\$[\d,]+)/i);
    return `Tirzepatide ${cell.price}/mo${reg ? ` (reg. ${reg[1]})` : ""}`;
  };
  const TIRZ_TOP_IDS = ["embody", "altrx", "wellmedr"];
  const tirzPriceNotes = Object.fromEntries(
    TIRZ_TOP_IDS.map((id) => [id, tirzNote(id)]).filter((e): e is [string, string] => typeof e[1] === "string"),
  );
  const reviewTime = (r: TrustpilotReview): number => {
    if (!r.date) return 0;
    const t = new Date(r.date).getTime();
    return isNaN(t) ? 0 : t;
  };
  // Every stored Trustpilot review, across providers, that mentions the
  // molecule or its brand names - a fixed rule, no cherry-picking - newest first.
  const tirzReviews: MixedReviewItem[] = isTirzGuide
    ? config.providers
        .flatMap((p) =>
          (p.trustpilotReviews ?? [])
            .filter((r) => /tirzepatide|zepbound|mounjaro/i.test(`${r.title} ${r.text}`))
            .map((review) => ({
              review,
              provider: { name: p.name, href: hubLink(ctx, `/reviews/${p.id}`), total: p.trustpilotReviews!.length },
            })),
        )
        .sort((a, b) => reviewTime(b.review) - reviewTime(a.review))
    : [];
  const tirzEmbody = isTirzGuide ? config.providers.find((p) => p.id === "embody") : undefined;
  const tirzWellmedr = isTirzGuide ? config.providers.find((p) => p.id === "wellmedr") : undefined;

  // "is <brand> legit" pages with operator-verified trust blocks (see
  // LEGIT_PAGES): checklist under the quick answer, dated pricing capture
  // after the cost section, verdict CTA after the last section.
  const legitData = isWeightLoss ? LEGIT_PAGES[slug] : undefined;
  const legitProvider = legitData ? config.providers.find((p) => p.id === legitData.providerId) : undefined;
  const legitCaptureAfter = legitData ? article.sections.findIndex((s) => /^how much does/i.test(s.heading)) : -1;
  // Every provider-"alternatives" guide (altrx-alternatives, best-ozempic-
  // alternatives, etc.) gets a CRO block featuring our three GLP-1 partners
  // (embody, altRx, trimrx) with the same comparison-page cards.
  const showPartnerCro = isWeightLoss && slug.endsWith("-alternatives");
  // "Our top 2 picks" (embody, altRx) after the intro on every other weight-loss
  // article. Skipped where a provider block already renders (the two above) and
  // on "is X legit" trust-check pages, for the same reason as the inline CTA.
  const showTopTwo = isWeightLoss && !showTopProvidersCro && !showPartnerCro && !/^is-.+-legit$/.test(slug);

  // Byline author: match the article's author to a team member, else the lead
  const author = experts.find((e) => e.name === article.author) ?? experts[0];

  // Related articles: same category first, then others, exclude self, max 3
  const relatedArticles = [
    ...articles.filter(
      (a) => a.slug !== slug && a.category === article.category
    ),
    ...articles.filter(
      (a) => a.slug !== slug && a.category !== article.category
    ),
  ].slice(0, 3);

  const formattedDate = new Date(latestUpdate(article.updatedAt)).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }
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
    // Only a real image: the un-hashed /opengraph-image path is not a served
    // route (Next hashes the file-convention URL), so pointing schema at it
    // emitted a 404 image on every article.
    ...(article.image && { image: `${ctx.origin}${article.image}` }),
    datePublished: article.publishedAt,
    dateModified: latestUpdate(article.updatedAt),
    wordCount,
    articleSection: article.category,
    ...pageReviewSchema(`/${ctx.vertical}/articles/${slug}`),
    author: author
      ? {
          "@type": "Person",
          name: author.credentials ? `${author.name}, ${author.credentials}` : author.name,
          jobTitle: author.role,
          url: canonicalUrl(ctx, "/about"),
        }
      : {
          "@type": "Organization",
          name: article.author || ctx.brandName,
          url: ctx.origin,
        },
    publisher: {
      "@type": "Organization",
      name: ctx.brandName,
      url: ctx.origin,
      logo: {
        "@type": "ImageObject",
        url: `${ctx.origin}/logo-mark.png`,
      },
    },
    // Medical content (Science / Guide / Wellness) is typed as a MedicalWebPage
    // so the reviewedBy / lastReviewed signal sits on the page entity Google
    // expects it on; provider-business articles (Advice: legit, cost,
    // alternatives) stay plain WebPage.
    mainEntityOfPage: {
      "@type": ["Science", "Guide", "Wellness"].includes(article.category) ? "MedicalWebPage" : "WebPage",
      "@id": canonicalUrl(ctx, `/articles/${slug}`),
      ...pageReviewSchema(`/${ctx.vertical}/articles/${slug}`),
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
          <div className="mx-auto max-w-[1100px] px-4 py-7 sm:px-6 sm:py-12">
            <Breadcrumbs
              items={[
                { label: "Home", href: hubLink(ctx, "/") },
                { label: "Articles", href: hubLink(ctx, "/articles") },
                { label: article.title },
              ]}
            />

            {/* Tight editorial masthead: eyebrow (category + read time) → H1 →
                short dek → low-weight byline/date. Spacing kept deliberately
                compact so the first mobile viewport reads like a publication,
                not a long SEO intro. */}
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

            <h1 className="text-[24px] font-bold leading-tight text-[#191919] sm:text-[32px]">
              {article.title}
            </h1>
            <p className="mt-2.5 max-w-[640px] text-[15px] leading-[1.55] text-gray-600 sm:text-[16px]">
              {article.description}
            </p>
            <p className="mt-3 text-[12px] text-gray-400">Updated {formattedDate}</p>
            <MedicalReviewBar path={`/${ctx.vertical}/articles/${slug}`} className="mt-4 max-w-[760px]" />
          </div>
        </div>

        {/* Article body */}
        <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6">
          <div>
          {/* On a brand legitimacy article ("is-<brand>-legit"), real user
              experiences answer the reader's core question first - so the
              operator-verified Reddit threads lead the page, above everything
              else. Other articles keep it mid-body (rendered in the loop). */}
          {isLegitArticle && subjectReddit && (
            <div className="mb-8">
              <RedditThreadCarousel
                providers={[subjectReddit]}
                reviewHrefFor={(id) => hubLink(ctx, `/reviews/${id}`)}
              />
            </div>
          )}
          {/* Direct answer up top (featured-snippet target) - code-injected so
              it also covers articles whose body lives in the CMS blob. */}
          {ctx.vertical === "weight-loss" && ARTICLE_QUICK_ANSWERS[slug] && (
            <div className="article-body mb-8 text-[16px] leading-[1.75] text-gray-800">
              <div className="qa">
                <strong>The quick answer</strong>
                {ARTICLE_QUICK_ANSWERS[slug]}
                {/* Dated price stamp: answer engines prefer a figure with an
                    explicit "as of" date; the date is the price index's own
                    verification date, so it moves only when prices are re-checked. */}
                {/\$\d/.test(ARTICLE_QUICK_ANSWERS[slug]) && (
                  <span className="mt-2 block text-[13px] text-gray-500">
                    {QUICK_ANSWER_STAMPS[slug] ?? (
                      <>
                        Prices verified on each provider&rsquo;s site as of{" "}
                        {new Date(PRICE_INDEX_VERIFIED).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}.
                      </>
                    )}
                  </span>
                )}
              </div>
            </div>
          )}
          {legitData && legitProvider && (
            <LegitChecklist data={legitData} provider={legitProvider} linkPrefix={ctx.prefix} />
          )}
          {/* Key takeaways - 3-4 verified bullets, scannable and quotable
              (featured snippets / AI overviews lift lists like this whole). */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="mb-8 rounded-xl border border-[#0C4B75]/15 bg-[#F4F8FB] p-5 sm:p-6">
              <p className="mb-3 text-[12px] font-bold uppercase tracking-wider text-[#0C4B75]">Key takeaways</p>
              <ul className="space-y-2">
                {article.keyTakeaways.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-800">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
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
                    <span className="shrink-0 font-semibold text-gray-400">{i + 1}.</span>
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
                    className="article-body text-[16px] leading-[1.75] text-gray-800 [&_a]:text-[#0C4B75] [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#093d61]"
                    dangerouslySetInnerHTML={{ __html: enhanceArticleHtml(section.body) }}
                  />
                </section>

                {/* Top-providers conversion block, right after the intro: the
                    ranked comparison-page cards + CTAs on an otherwise-prose
                    buyer guide. Gated per slug (see showTopProvidersCro). */}
                {i === 0 && showTopProvidersCro && (
                  <TopProvidersBlock
                    config={config}
                    linkPrefix={ctx.prefix}
                    limit={3}
                    providerIds={TIRZ_TOP_IDS}
                    priceNotes={tirzPriceNotes}
                    title="Our top 3 tirzepatide providers"
                    subtitle="Our highest-ranked providers with a verified compounded tirzepatide price - the same cards as our full comparison, with the tirzepatide rate shown under each starting price."
                  />
                )}

                {/* Tirzepatide guide: code-rendered price table (CTAs, review
                    links, Trustpilot per row) right under the "cheapest" section,
                    then the cross-provider carousel of tirzepatide reviews. */}
                {isTirzGuide && i === 1 && (
                  <>
                    <TirzepatidePriceTable providers={config.providers} linkPrefix={ctx.prefix} />
                    {tirzReviews.length > 0 && (
                      <div className="my-10">
                        <MixedTrustpilotCarousel
                          items={tirzReviews}
                          title="What tirzepatide customers say on Trustpilot"
                          subtitle="Every review we have captured that mentions tirzepatide, Zepbound or Mounjaro, across providers - newest first, reviewer names shortened."
                        />
                      </div>
                    )}
                  </>
                )}

                {legitData && legitProvider && i === legitCaptureAfter && (
                  <PricingCapture data={legitData} provider={legitProvider} />
                )}
                {legitData && legitProvider && i === article.sections.length - 1 && (
                  <LegitVerdictCta data={legitData} provider={legitProvider} linkPrefix={ctx.prefix} />
                )}

                {/* Tirzepatide guide: the verdict gets a CTA - the no-commitment
                    pick and the 12-month floor, both at their verified rates. */}
                {isTirzGuide && i === article.sections.length - 1 && tirzEmbody && (
                  <div className="my-8 rounded-xl border border-[#0C4B75]/15 bg-[#F4F8FB] p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
                    <div>
                      <p className="text-[15px] font-bold text-[#191919]">Cheapest with no commitment: {tirzEmbody.name}</p>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-gray-600">
                        {tirzNote("embody")?.replace("Tirzepatide ", "Compounded tirzepatide ")}, month to month, ships in 1-2 days, full refund if you are not approved.
                        {tirzWellmedr && tirzNote("wellmedr") && (
                          <>
                            {" "}Willing to commit a year?{" "}
                            <ProviderCta
                              href={tirzWellmedr.affiliateUrl}
                              providerName={tirzWellmedr.name}
                              providerSlug={tirzWellmedr.id}
                              position={2}
                              pageType="listing"
                              sourceFlow="main_comparison"
                              className="font-semibold text-[#0C4B75] hover:underline"
                            >
                              {tirzWellmedr.name} at {PRICE_INDEX.find((r) => r.providerId === "wellmedr")?.tirzepatide?.price}/mo →
                            </ProviderCta>
                          </>
                        )}
                      </p>
                    </div>
                    <ProviderCta
                      href={tirzEmbody.affiliateUrl}
                      providerName={tirzEmbody.name}
                      providerSlug={tirzEmbody.id}
                      position={1}
                      pageType="listing"
                      sourceFlow="main_comparison"
                      className="mt-4 inline-flex h-[46px] w-full shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#0C4B75] px-6 text-[14.5px] font-bold text-white transition-colors hover:bg-[#093d61] sm:mt-0 sm:w-auto"
                    >
                      Check availability at {tirzEmbody.name}
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                    </ProviderCta>
                  </div>
                )}

                {i === 0 && showTopTwo && <TopTwoPicks config={config} linkPrefix={ctx.prefix} />}

                {/* Provider-"alternatives" guides: CRO block of our three GLP-1
                    partners with the comparison-page cards (see showPartnerCro). */}
                {i === 0 && showPartnerCro && (
                  <TopProvidersBlock
                    config={config}
                    linkPrefix={ctx.prefix}
                    limit={3}
                    providerIds={["embody", "altrx", "trimrx"]}
                    title="Our top-rated GLP-1 providers"
                    subtitle="Our recommended telehealth providers - the same cards from our full comparison."
                  />
                )}

                {/* Subject-provider social proof, high on the page: Trustpilot
                    carousel after the first section, Reddit carousel after the
                    second (or first, on very short articles). Verified data
                    only - providers without it simply render nothing. */}
                {i === 0 && subjectTrustpilot && (
                  <div className="my-10 space-y-3">
                    <TrustpilotSummary
                      providerName={subjectTrustpilot.name}
                      reviews={subjectTrustpilot.trustpilotReviews!}
                      rating={subjectTrustpilot.trustpilotRating}
                      reviewCount={subjectTrustpilot.trustpilotReviewCount}
                    />
                    <TrustpilotCarousel
                      providerName={subjectTrustpilot.name}
                      providerLogo={subjectTrustpilot.logo}
                      reviews={subjectTrustpilot.trustpilotReviews!}
                      rating={subjectTrustpilot.trustpilotRating}
                      reviewCount={subjectTrustpilot.trustpilotReviewCount}
                    />
                  </div>
                )}
                {!isLegitArticle && i === Math.min(1, article.sections.length - 1) && subjectReddit && (
                  <div className="my-10">
                    <RedditThreadCarousel
                      providers={[subjectReddit]}
                      reviewHrefFor={(id) => hubLink(ctx, `/reviews/${id}`)}
                    />
                  </div>
                )}

                {/* Full-catalog product carousel mid-article (weight-loss only) -
                    after roughly the halfway section, never at the bottom. */}
                {ctx.vertical === "weight-loss" &&
                  i === Math.max(0, Math.ceil(article.sections.length / 2) - 1) && (
                    <div className="my-10">
                      <ProductCarousel
                        providers={config.providers}
                        onlyProviderIds={
                          restrictCarouselToSubject && subjectProvider ? [subjectProvider.id] : undefined
                        }
                        onlyMedication={isTirzGuide ? "tirzepatide" : undefined}
                        title={
                          restrictCarouselToSubject && subjectProvider
                            ? `Shop ${subjectProvider.name}'s GLP-1 plans`
                            : isTirzGuide
                              ? "Shop tirzepatide plans by provider"
                              : "Shop GLP-1 plans by product"
                        }
                        subtitle={
                          restrictCarouselToSubject && subjectProvider
                            ? `${subjectProvider.name}'s published plans - conditions shown under each price.`
                            : isTirzGuide
                              ? "Every provider's published tirzepatide plan - cheapest first, conditions under each price."
                              : "Every provider's published plans - cheapest first, conditions under each price."
                        }
                        withSchema
                        pageUrl={canonicalUrl(ctx, `/articles/${slug}`)}
                      />
                    </div>
                  )}

                {/* Editorial callout after 4th section - GLP-1 copy, so
                    weight-loss articles only (it was leaking onto every
                    vertical's articles before this gate). */}
                {ctx.vertical === "weight-loss" && !isTirzGuide && i === 3 && article.sections.length > 4 && (
                  <div className="my-10 overflow-hidden rounded-xl bg-transparent">
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex-1 py-6 pr-6 sm:py-8 sm:pr-8">
                        <h3 className="mb-3 text-[18px] font-bold leading-tight text-[#0C4B75] sm:text-[20px]">
                          What To Know Before Starting GLP-1 Treatment
                        </h3>
                        <p className="mb-3 text-[16px] leading-[1.75] text-gray-800">
                          Before starting GLP-1 treatment, it&apos;s important to understand a few key things. These medications require a prescription from a licensed clinician and aren&apos;t suitable for everyone. Some people may experience side effects, especially during the first few weeks as the body adjusts.
                        </p>
                        <p className="mb-3 text-[16px] leading-[1.75] text-gray-800">
                          GLP-1s also tend to work best when combined with basic lifestyle habits like balanced nutrition and regular physical activity.
                        </p>
                        <p className="text-[16px] leading-[1.75] text-gray-800">
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

                {/* The inline "Top-Rated Providers" strip that sat here after
                    the 2nd section (three logo rows with taglines) was removed
                    Oct 8, 2026 at the operator's request. The TopProvidersBlock
                    and the end-of-article CTA remain. */}
              </div>
            ))}
          </article>

          {/* CTA box */}
          <div className="mt-12 rounded-xl border border-gray-200 bg-white p-6 text-center sm:p-8">
            <p className="text-[18px] font-bold text-[#191919]">
              {isTirzGuide ? "Compare tirzepatide providers side by side" : "Ready to compare weight loss providers?"}
            </p>
            <p className="mt-1 text-[14px] text-gray-500">
              {isTirzGuide
                ? "Every provider with a verified compounded tirzepatide price, ranked - pricing, plans, shipping and reviews."
                : "See how top providers stack up on pricing, medical support, and treatment options."}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href={hubLink(ctx, isTirzGuide ? "/tirzepatide" : "/")}
                className="inline-flex h-[44px] items-center justify-center rounded-lg bg-[#0C4B75] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
              >
                {isTirzGuide ? "Compare tirzepatide providers" : "Compare Providers"}
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

          {/* Contextual comparison hub (weight-loss): routes informational
              readers into the highest-intent comparison pages. Code-injected,
              so it also renders on articles whose bodies live in the CMS blob. */}
          {ctx.vertical === "weight-loss" && (
            <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">
              <h2 className="mb-1 text-[17px] font-bold text-[#191919]">Compare providers head-to-head</h2>
              <p className="mb-4 text-[13.5px] text-gray-500">
                Real prices, real trade-offs - the comparisons readers use to decide.
              </p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {[
                  { href: "/weight-loss/embody-vs-wellmedr", label: "embody vs wellmedr - $69 vs $49" },
                  { href: "/weight-loss/altrx-vs-embody", label: "altRx vs embody - $89 vs $69" },
                  { href: "/weight-loss/healthrx-vs-medvi", label: "HealthRx vs Medvi - prepaid vs monthly" },
                  { href: "/weight-loss/embody-vs-altrx-vs-wellmedr", label: "The budget trio: embody vs altRx vs wellmedr" },
                ].map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] font-semibold text-[#0C4B75] transition-colors hover:border-[#0C4B75]/30 hover:bg-[#0C4B75]/[0.02]"
                  >
                    <span className="truncate">{c.label}</span>
                    <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <MedicalSources vertical={ctx.vertical} />

          </div>
        </div>
      </div>
    </>
  );
}
