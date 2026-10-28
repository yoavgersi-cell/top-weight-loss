import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, Star } from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { DEFAULT_VERTICAL } from "@/lib/config";
import { PRICE_INDEX, PRICE_INDEX_VERIFIED } from "@/lib/price-index";
import { PRODUCT_CATALOG } from "@/lib/product-catalog";
import { HubLogo } from "@/components/hub-logo";
import { NativeFunnel, type FunnelProvider } from "@/components/native-funnel";

// ───── Paid-traffic landing page: /weight-loss/go/glp1 ─────
// Built for native (Taboola) visitors, who arrive cold, on a phone, from a
// headline - not from a search. The page has no site navigation, continues
// the ad's promise in its headline, qualifies the visitor with four taps and
// shows one provider. Two providers are offered (operator decision, Oct 20,
// 2026): embody and Eden. It is noindex and absent from the sitemap, so it
// never competes with the search pages. Every figure is a verified record.

export const revalidate = 3600;

const PAGES: Record<string, { h1: string; sub: string }> = {
  glp1: {
    h1: "Doctor-prescribed GLP-1 weight loss online, from $49 a month, without insurance",
    sub: "Compounded semaglutide and tirzepatide from licensed US telehealth providers, at flat cash prices verified on their own sites. Four quick taps and we show you the provider that fits.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ battleSlug: string; slug: string }> }): Promise<Metadata> {
  const { battleSlug, slug } = await params;
  const page = PAGES[slug];
  if (battleSlug !== DEFAULT_VERTICAL || !page) return {};
  return {
    title: { absolute: `${page.h1} - Treatments Hub` },
    description: page.sub,
    robots: { index: false, follow: true },
  };
}

const verifiedOn = new Date(PRICE_INDEX_VERIFIED).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

export default async function GoPage({ params }: { params: Promise<{ battleSlug: string; slug: string }> }) {
  const { battleSlug, slug } = await params;
  const page = PAGES[slug];
  if (battleSlug !== DEFAULT_VERTICAL || !page) return notFound();

  const config = await getConfig(DEFAULT_VERTICAL);
  const provider = (id: string) => config.providers.find((x) => x.id === id);
  // The partner link comes from the config merge (code seed, then the CMS
  // blob). Never ship a dead button: a placeholder falls back to the
  // provider's review page, which carries its own live link.
  const link = (id: string) => {
    const u = provider(id)?.affiliateUrl;
    return u && u !== "#" ? u : `/${DEFAULT_VERTICAL}/reviews/${id}`;
  };
  const tp = (id: string) => {
    const p = provider(id);
    return p?.trustpilotRating && p?.trustpilotReviewCount ? { rating: p.trustpilotRating, count: p.trustpilotReviewCount } : null;
  };
  const catalog = (id: string, medication: "semaglutide" | "tirzepatide") => {
    const c = PRODUCT_CATALOG.find((x) => x.providerId === id && x.medication === medication && !/^brand-name/i.test(x.name));
    return c ? { price: c.price, note: c.priceNote } : null;
  };

  // embody: the verified price-index row. Eden: its catalog prices (flat
  // every month, every dose) and the facts its review verified; Eden
  // publishes no shipping window, so none is claimed.
  const embodyRow = PRICE_INDEX.find((r) => r.providerId === "embody");
  const embodyP = provider("embody");
  const edenP = provider("eden");
  const providers: FunnelProvider[] = [];
  if (embodyP && embodyRow) {
    providers.push({
      id: "embody",
      name: embodyP.name,
      logo: embodyP.logo,
      affiliateUrl: link("embody"),
      edge: embodyRow.edge,
      semaglutide: embodyRow.semaglutide,
      tirzepatide: embodyRow.tirzepatide,
      facts: [
        embodyRow.shipping,
        "No commitment: month to month, cancel anytime; full refund if you are not approved",
        "Licensed US clinician reviews your intake, usually within 24 hours; no insurance required",
      ],
      trustpilot: embodyRow.trustpilot ?? tp("embody"),
    });
  }
  if (edenP) {
    providers.push({
      id: "eden",
      name: edenP.name,
      logo: edenP.logo,
      affiliateUrl: link("eden"),
      edge: "One flat price every month and at every dose, with 24/7 human support",
      semaglutide: catalog("eden", "semaglutide"),
      tirzepatide: catalog("eden", "tirzepatide"),
      facts: [
        "Doctor-guided clinical care with 24/7 human support included",
        "No membership, no annual or long-term plan",
        "Free 3-minute online assessment; no insurance needed",
      ],
      trustpilot: tp("eden"),
    });
  }

  const embody = providers.find((p) => p.id === "embody");
  const eden = providers.find((p) => p.id === "eden");

  // Real, dated Trustpilot reviews from the verified records: the two most
  // recent four-star-or-better reviews for each provider that has them.
  const quotes = ["embody", "eden"].flatMap((id) => {
    const p = provider(id);
    return (p?.trustpilotReviews ?? [])
      .filter((r) => r.rating >= 4 && r.date && r.text.length > 60)
      .slice(0, 2)
      .map((r) => ({ provider: p!.name, ...r }));
  });

  return (
    <div className="bg-white text-[#191919]">
      {/* Top bar: logo + the disclosure line the site carries everywhere */}
      <div className="border-b border-gray-200">
        <div className="mx-auto flex max-w-[640px] items-center justify-between px-4 py-2.5">
          <Link href={`/${DEFAULT_VERTICAL}`} aria-label="Treatments Hub">
            <HubLogo vertical={DEFAULT_VERTICAL} />
          </Link>
          <span className="hidden text-[11px] text-gray-400 sm:inline">Independent comparison · verified prices</span>
        </div>
        <p className="bg-[#f0f4f8] px-4 py-1.5 text-center text-[10.5px] leading-tight text-gray-600 sm:text-[12px]">
          Some providers featured here may compensate us. This never changes the prices shown or which provider we match you with.{" "}
          <Link href={`/${DEFAULT_VERTICAL}/disclaimer`} className="font-bold underline underline-offset-2">Advertising disclosure</Link>
        </p>
      </div>

      {/* Headline: continues the ad */}
      <header className="mx-auto max-w-[640px] px-4 pt-6 pb-5 sm:pt-9">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11.5px] font-bold text-emerald-700">
          <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
          Prices verified {verifiedOn}
        </p>
        <h1 className="mt-3 text-[26px] font-extrabold leading-[1.15] tracking-[-0.01em] sm:text-[34px]">{page.h1}</h1>
        <p className="mt-3 text-[15px] leading-[1.5] text-gray-600 sm:text-[16px]">{page.sub}</p>
      </header>

      <NativeFunnel providers={providers} verifiedOn={verifiedOn} />

      {/* The two providers at a glance - verified records, nothing else */}
      <section className="mx-auto max-w-[640px] px-4 pt-10">
        <h2 className="text-[20px] font-bold sm:text-[22px]">The verified prices behind the match</h2>
        <p className="mt-1 text-[13.5px] text-gray-500">Monthly cash price for compounded semaglutide and tirzepatide. Both providers publish one price at every dose, month to month, with no long-term plan.</p>
        <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-[13.5px]">
            <thead className="bg-gray-50 text-left text-[11.5px] font-bold uppercase tracking-wider text-gray-500">
              <tr><th className="px-3 py-2">Provider</th><th className="px-3 py-2">Semaglutide</th><th className="px-3 py-2">Tirzepatide</th><th className="px-3 py-2">Trustpilot</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {providers.map((p) => (
                <tr key={p.id}>
                  <td className="px-3 py-2.5 font-bold">{p.name}</td>
                  <td className="px-3 py-2.5"><strong>{p.semaglutide?.price}</strong><span className="block text-[11.5px] text-gray-500">{p.semaglutide?.note}</span></td>
                  <td className="px-3 py-2.5"><strong>{p.tirzepatide?.price}</strong><span className="block text-[11.5px] text-gray-500">{p.tirzepatide?.note}</span></td>
                  <td className="px-3 py-2.5 text-gray-600">{p.trustpilot ? `${p.trustpilot.rating} (${p.trustpilot.count})` : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Advertorial points - each one a fact already published on the site */}
      <section className="mx-auto max-w-[640px] px-4 pt-10">
        <h2 className="text-[20px] font-bold sm:text-[22px]">Four things to check before you order</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-xl border border-gray-200 p-4">
            <p className="text-[15px] font-bold">1. Compounded is not FDA-approved - know what you are buying</p>
            <p className="mt-1 text-[14px] leading-relaxed text-gray-600">
              The prices above are for compounded semaglutide and tirzepatide: the same active ingredients as Ozempic, Wegovy, Mounjaro and Zepbound, prepared by a US state-licensed pharmacy on a clinician&rsquo;s prescription. Compounded products are not individually FDA-approved. Brand-name pens are the FDA-approved versions and are priced separately.
            </p>
          </li>
          <li className="rounded-xl border border-gray-200 p-4">
            <p className="text-[15px] font-bold">2. Check the price you will still pay in month four</p>
            <p className="mt-1 text-[14px] leading-relaxed text-gray-600">
              {embody && <>embody&rsquo;s {embody.semaglutide?.price} semaglutide and {embody.tirzepatide?.price} tirzepatide are its current rates against a regular $79 and $129.</>}{" "}
              {eden && <>Eden&rsquo;s {eden.semaglutide?.price} and {eden.tirzepatide?.price} are flat: its pricing table shows the same figure in month one, month two and every month after.</>}{" "}
              Both publish one price per medication at every dose, so the number you see does not climb as your dose does.
            </p>
          </li>
          <li className="rounded-xl border border-gray-200 p-4">
            <p className="text-[15px] font-bold">3. Read the commitment and refund terms before you pay</p>
            <p className="mt-1 text-[14px] leading-relaxed text-gray-600">
              Both are month to month with no membership and no annual or long-term plan. embody refunds in full if a clinician does not approve you. Read each provider&rsquo;s cancellation terms at checkout; they are short.
            </p>
          </li>
          <li className="rounded-xl border border-gray-200 p-4">
            <p className="text-[15px] font-bold">4. Know what each one is best at</p>
            <p className="mt-1 text-[14px] leading-relaxed text-gray-600">
              {embody && <>embody is the cheaper of the two and ships in 1-2 days, cold-chain, with a LegitScript certification and a 3.8 across {embody.trustpilot?.count ?? "its"} Trustpilot reviews.</>}{" "}
              {eden && <>Eden costs $30 more a month for semaglutide and $10 more for tirzepatide, and includes doctor-guided care with 24/7 human support, with a {eden.trustpilot?.rating ?? "4.5"} across {eden.trustpilot?.count ?? "5,019"} Trustpilot reviews in which recent reviewers name the staff who helped them. Confirm Eden&rsquo;s shipping time at checkout; it does not publish one.</>}
            </p>
          </li>
        </ol>
      </section>

      {/* Verified customer quotes */}
      {quotes.length > 0 && (
        <section className="mx-auto max-w-[640px] px-4 pt-10">
          <h2 className="text-[20px] font-bold sm:text-[22px]">What customers wrote on Trustpilot</h2>
          <p className="mt-1 text-[13.5px] text-gray-500">Real reviews from the provider&rsquo;s public Trustpilot profile; names shortened.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {quotes.map((q, i) => (
              <figure key={i} className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="flex items-center gap-1 text-[12px] text-gray-500">
                  <span className="inline-flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className={`h-3.5 w-3.5 ${s < q.rating ? "fill-[#00B67A] text-[#00B67A]" : "fill-gray-200 text-gray-200"}`} strokeWidth={0} />
                    ))}
                  </span>
                  <span className="ml-1 font-semibold text-[#191919]">{q.provider}</span>
                </p>
                <blockquote className="mt-2 text-[14px] leading-relaxed text-gray-700 line-clamp-5">&ldquo;{q.text}&rdquo;</blockquote>
                <figcaption className="mt-2 text-[12px] text-gray-400">{q.name} · {q.date}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="mx-auto max-w-[640px] px-4 pt-10">
        <h2 className="text-[20px] font-bold sm:text-[22px]">Quick answers</h2>
        <dl className="mt-4 space-y-4">
          <div>
            <dt className="text-[15px] font-bold">Do I need insurance?</dt>
            <dd className="mt-1 text-[14px] leading-relaxed text-gray-600">No. Both providers sell compounded GLP-1 treatment at the cash prices shown and state that no insurance is required.</dd>
          </div>
          <div>
            <dt className="text-[15px] font-bold">Does the price go up as my dose increases?</dt>
            <dd className="mt-1 text-[14px] leading-relaxed text-gray-600">No. embody and Eden each publish one price per medication that stays the same at every dose. embody&rsquo;s current rates sit below its regular $79 and $129; Eden&rsquo;s are flat with no promotional period.</dd>
          </div>
          <div>
            <dt className="text-[15px] font-bold">How does it work?</dt>
            <dd className="mt-1 text-[14px] leading-relaxed text-gray-600">You complete an online health intake, a licensed US clinician reviews it and decides whether a GLP-1 is appropriate for you, and if so the medication ships from a state-licensed pharmacy to your door. No clinic visit.</dd>
          </div>
          <div>
            <dt className="text-[15px] font-bold">How fast will it arrive?</dt>
            <dd className="mt-1 text-[14px] leading-relaxed text-gray-600">embody ships in 1-2 days, cold-chain, after the clinician review, which is usually within 24 hours. Eden does not publish a shipping window; confirm it at checkout.</dd>
          </div>
        </dl>
      </section>

      <footer className="mx-auto max-w-[640px] px-4 pb-12 pt-10">
        <p className="text-[12px] leading-relaxed text-gray-400">
          Compounded medications are not FDA-approved. This page is for information only and is not medical advice - whether a GLP-1 is right for you is a decision for you and a licensed clinician. We may earn a commission from links on this page; it never affects the prices shown. Prices verified on each provider&rsquo;s site as of {verifiedOn}.
        </p>
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-gray-500">
          <Link href={`/${DEFAULT_VERTICAL}`} className="underline underline-offset-2">Compare all providers</Link>
          <Link href={`/${DEFAULT_VERTICAL}/disclaimer`} className="underline underline-offset-2">Disclaimer</Link>
          <Link href={`/${DEFAULT_VERTICAL}/privacy`} className="underline underline-offset-2">Privacy</Link>
          <Link href={`/${DEFAULT_VERTICAL}/terms`} className="underline underline-offset-2">Terms</Link>
        </p>
      </footer>
    </div>
  );
}
