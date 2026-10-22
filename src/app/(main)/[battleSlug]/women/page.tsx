import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComparisonLayout } from "@/components/comparison-layout";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { MedicalSources } from "@/components/medical-sources";
import { pageReviewSchema } from "@/data/reviewers";
import { getConfig } from "@/lib/config-store";
import type { FaqItem, Provider } from "@/lib/config";

export const revalidate = 3600;

// Women's hair-loss hub, served at treatmentshub.com/hair-loss/women. Ported
// from tophairloss.io/women on Oct 22, 2026: a curated lineup over existing
// provider records whose display copy speaks to women (Hims surfaces as its
// women's brand, Hers), five women-specific FAQs and the editorial body. The
// underlying provider data, links and scores are the hair-loss vertical's own.
const SITE_URL = "https://www.treatmentshub.com";
const CANONICAL = `${SITE_URL}/hair-loss/women`;

export const metadata: Metadata = {
  title: "Best Hair Loss Treatments for Women 2026: Top Providers",
  description:
    "Compare the best hair loss treatments for women in 2026: Hers, Nutrafol and Happy Head on minoxidil, drug-free options, medical support and value.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Best Hair Loss Treatments for Women 2026: Top Providers",
    description:
      "Compare the best women's hair loss treatments of 2026 - top providers ranked by treatments, support and value.",
    url: CANONICAL,
    type: "website",
  },
};

// Each entry references an existing provider by id and overrides the display
// copy; the affiliate link, CTA and Trustpilot record come from the record.
const WOMEN_LINEUP: Pick<Provider, "id" | "name" | "logo" | "smallLogo" | "tagline" | "highlights">[] = [
  {
    id: "hims",
    name: "Hers",
    logo: "/logos/hers.svg",
    smallLogo: "/logos/hers-icon.svg",
    tagline: "Big-brand women's hair care - prescription minoxidil, oral options and more",
    highlights: [
      "Prescription minoxidil (topical and oral) for women",
      "100% online - clinician consult, discreet home delivery",
      "Also hair-strengthening supplements and shampoos",
    ],
  },
  {
    id: "nutrafol",
    name: "Nutrafol",
    logo: "/logos/nutrafol.svg",
    smallLogo: "/logos/nutrafol-icon.svg",
    tagline: "Drug-free, physician-formulated hair growth supplement for women",
    highlights: [
      "Drug-free nutraceutical - no minoxidil or prescription needed",
      "Formulas for women's life stages (postpartum, menopause)",
      "Clinically tested to support hair growth and thickness",
    ],
  },
  {
    id: "happyhead",
    name: "Happy Head",
    logo: "/logos/happyheadlogo.png",
    smallLogo: "/logos/happyheadlogo.png",
    tagline: "Dermatologist-formulated custom hair loss prescriptions for women - topical and oral",
    highlights: [
      "Personalized topical formulas (minoxidil and more)",
      "Dermatologist-founded; prescription strength",
      "Custom treatment tailored to women's hair loss",
    ],
  },
];

const WOMEN_FAQS: FaqItem[] = [
  {
    question: "What is the best hair loss treatment for women?",
    answer:
      "For most women, topical or oral minoxidil is the first-line, FDA-supported option and has the strongest evidence for regrowing hair. Some women are also prescribed spironolactone, and drug-free supplements like Nutrafol can support results. The right choice depends on your pattern of loss, medical history, and whether you prefer a prescription or a supplement - comparing providers side by side is the fastest way to narrow it down.",
  },
  {
    question: "Does minoxidil work for women?",
    answer:
      "Yes. Minoxidil is the most widely used and best-studied hair loss treatment for women, available as a topical solution or foam or as low-dose oral minoxidil prescribed off-label. Most women who respond see reduced shedding within a few months and visible regrowth by 6-12 months. Consistency matters - results fade if you stop.",
  },
  {
    question: "Can women take finasteride for hair loss?",
    answer:
      "Finasteride is mainly a men's treatment and is generally avoided in women who are pregnant or may become pregnant because of birth-defect risk. Some post-menopausal women are prescribed it off-label under close medical supervision, but minoxidil and spironolactone are the more common options for women. Always follow a licensed provider's guidance.",
  },
  {
    question: "How long until women see results from hair loss treatment?",
    answer:
      "Expect to give any treatment at least 3-6 months before judging it, with fuller results around 12 months. Early on you may notice less shedding before you see regrowth. Because hair grows slowly, patience and consistency are the biggest factors in success.",
  },
  {
    question: "Are hair growth supplements like Nutrafol worth it for women?",
    answer:
      "For women who prefer a drug-free option, or want to complement minoxidil, physician-formulated supplements like Nutrafol have clinical studies supporting improved hair growth and thickness, with formulas targeted to life stages such as postpartum and menopause. They work best as a consistent, long-term routine rather than a quick fix.",
  },
];

function WomenEditorial() {
  const link = "font-semibold text-[#0C4B75] hover:underline";
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-10">
      <div className="max-w-[820px] space-y-6 text-[15px] leading-[1.7] text-gray-700">
        <div>
          <h2 className="mb-3 text-[24px] font-bold text-[#191919]">Hair Loss Treatments for Women: What Actually Works</h2>
          <p>
            Hair loss affects a huge number of women - from gradual thinning along the part line to shedding
            triggered by postpartum changes, menopause, stress or thyroid issues. The good news: several
            treatments have real clinical evidence behind them, and most are available online through licensed
            providers. The key is matching the treatment to your type of hair loss and staying consistent.
          </p>
        </div>
        <div>
          <h3 className="mb-2 text-[19px] font-semibold text-[#191919]">Minoxidil: the first-line option</h3>
          <p>
            Topical minoxidil is FDA-approved for women and is the best-studied treatment for female pattern hair
            loss. Low-dose oral minoxidil, prescribed off-label, has become a common alternative for women who
            find the daily scalp routine hard to keep. Either way, the pattern is the same: shedding slows first,
            regrowth follows over months, and the gains last only while treatment continues. Our guide to{" "}
            <Link href="/hair-loss/articles/oral-minoxidil-vs-topical-minoxidil" className={link}>oral vs topical minoxidil</Link>{" "}
            compares the two forms.
          </p>
        </div>
        <div>
          <h3 className="mb-2 text-[19px] font-semibold text-[#191919]">Prescription options beyond minoxidil</h3>
          <p>
            Depending on the cause, a clinician may add spironolactone, an anti-androgen used off-label for
            female pattern hair loss, or address an underlying driver such as iron deficiency or thyroid
            function first. Finasteride is a men&rsquo;s treatment and is avoided in women who are or may become
            pregnant; a small number of post-menopausal women are prescribed it under close supervision. See{" "}
            <Link href="/hair-loss/articles/hair-loss-treatment-for-women" className={link}>hair loss treatment for women</Link>,{" "}
            <Link href="/hair-loss/articles/iron-deficiency-hair-loss" className={link}>iron deficiency and hair loss</Link>{" "}
            and <Link href="/hair-loss/articles/menopause-hair-loss" className={link}>menopause hair loss</Link>.
          </p>
        </div>
        <div>
          <h3 className="mb-2 text-[19px] font-semibold text-[#191919]">Drug-free supplements</h3>
          <p>
            If you&rsquo;d rather avoid a prescription, or want to complement minoxidil, physician-formulated
            supplements like Nutrafol have clinical studies showing improved hair growth and thickness, with
            women&rsquo;s formulas tailored to life stages such as postpartum and menopause. Supplements work best
            as a steady, long-term routine, and they do not replace medical treatment for advanced loss.
          </p>
        </div>
        <div>
          <h3 className="mb-2 text-[19px] font-semibold text-[#191919]">How long until you see results?</h3>
          <p>
            Give any treatment at least 3-6 months before judging it, with fuller results around 12 months. Hair
            grows slowly, so patience and consistency matter more than any single product. Compare the providers
            above to find the treatment and price that fit your goals, or read the{" "}
            <Link href="/hair-loss" className={link}>full hair-loss comparison</Link> for every provider we track.
          </p>
        </div>
        <p className="text-[13px] leading-relaxed text-gray-500">
          General information, not medical advice. Hair-loss treatments are prescribed and monitored by a licensed
          clinician, who decides what, if anything, is appropriate for you.
        </p>
      </div>
      <MedicalSources vertical="hair-loss" />
    </section>
  );
}

export default async function WomenHairLossPage({ params }: { params: Promise<{ battleSlug: string }> }) {
  const { battleSlug } = await params;
  if (battleSlug !== "hair-loss") return notFound();
  const config = await getConfig("hair-loss");
  const byId = new Map(config.providers.map((p) => [p.id, p]));

  // The women's lineup as a provider list: each record's link, CTA and
  // Trustpilot figures with the women-facing name, logo and copy over it.
  const providers: Provider[] = WOMEN_LINEUP.flatMap((entry) => {
    const base = byId.get(entry.id);
    return base ? [{ ...base, ...entry }] : [];
  });
  const womenConfig = {
    ...config,
    hero: {
      ...config.hero,
      backgroundImageUrl: "/hero-hair-loss-women.png",
      imageAlt: "Woman with thick, healthy hair",
      h1: "Best Hair Loss Treatments for Women in 2026",
      h2: "Compare the top women's hair loss treatments, side by side",
      description:
        "Compare women's hair loss providers on treatments, medical support, pricing and real results - and find the one that's right for you.",
    },
    providers,
    ranking: { ...config.ranking, providerOrder: providers.map((p) => p.id) },
    // The men-first Hims and Happy Head reviews would put "men's telehealth"
    // copy under the Hers and Happy Head cards, so only the gender-neutral
    // Nutrafol review feeds its card; the others render from the lineup copy.
    reviews: (config.reviews ?? []).filter((r) => r.providerId === "nutrafol"),
    faqs: WOMEN_FAQS,
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Best Hair Loss Treatments for Women 2026: Top Providers",
    description: metadata.description,
    url: CANONICAL,
    inLanguage: "en-US",
    dateModified: "2026-10-22",
    ...pageReviewSchema("/hair-loss/women"),
    isPartOf: { "@type": "WebSite", name: "Treatments Hub", url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: providers.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: `${SITE_URL}/hair-loss/reviews/${p.id}`,
      })),
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: WOMEN_FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Hair Loss", item: `${SITE_URL}/hair-loss` },
      { "@type": "ListItem", position: 3, name: "For Women", item: CANONICAL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ComparisonLayout
        config={womenConfig}
        linkPrefix="/hair-loss"
        cardIntroMode="short"
        byline={<MedicalReviewBar path="/hair-loss/women" className="max-w-[760px]" />}
      >
        <WomenEditorial />
      </ComparisonLayout>
    </>
  );
}
