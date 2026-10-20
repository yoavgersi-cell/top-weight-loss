import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, Star } from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { DEFAULT_VERTICAL } from "@/lib/config";
import { PRICE_INDEX, PRICE_INDEX_VERIFIED } from "@/lib/price-index";
import { HubLogo } from "@/components/hub-logo";
import { NativeFunnel, type FunnelProvider } from "@/components/native-funnel";

// ───── Paid-traffic landing page: /weight-loss/go/glp1 ─────
// Built for native (Taboola) visitors, who arrive cold, on a phone, from a
// headline - not from a search. The page has no site navigation, continues
// the ad's promise in its headline, qualifies the visitor with three taps and
// shows one match. It is noindex and absent from the sitemap, so it never
// competes with the search pages. Every figure is the verified price index.

export const revalidate = 3600;

const PAGES: Record<string, { h1: string; sub: string }> = {
  glp1: {
    h1: "Doctor-prescribed GLP-1 weight loss online, from $49 a month, without insurance",
    sub: "Compounded semaglutide and tirzepatide from licensed US telehealth providers, at cash prices verified on their own sites. Three taps and we show you the provider that fits.",
  },
};

const FUNNEL_IDS = ["embody", "wellmedr", "altrx", "directmeds"];

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
  const providers: FunnelProvider[] = FUNNEL_IDS.map((id) => {
    const p = config.providers.find((x) => x.id === id);
    const row = PRICE_INDEX.find((r) => r.providerId === id);
    if (!p || !row) return null;
    return {
      id,
      name: p.name,
      logo: p.logo,
      // The partner link comes from the config merge (code seed, then the
      // CMS blob). Never ship a dead button: a placeholder falls back to the
      // provider's review page, which carries its own live link.
      affiliateUrl: p.affiliateUrl && p.affiliateUrl !== "#" ? p.affiliateUrl : `/${DEFAULT_VERTICAL}/reviews/${id}`,
      edge: row.edge,
      semaglutide: row.semaglutide,
      tirzepatide: row.tirzepatide,
      shipping: row.shipping,
      commitment: row.commitment,
      trustpilot: row.trustpilot,
    };
  }).filter((x): x is FunnelProvider => !!x);

  const byId = new Map(providers.map((p) => [p.id, p]));
  const embody = byId.get("embody");
  const welludr = byId.get("wellmedr");
  const altrx = byId.get("altrx");
  const directmeds = byId.get("directmeds");

  // Real, dated Trustpilot reviews from the verified records: the two most
  // recent four-star-or-better reviews for the two lead providers.
  const quotes = ["embody", "wellmedr"].flatMap((id) => {
    const p = config.providers.find((x) => x.id === id);
    return (p?.trustpilotReviews ?? [])
      .filter((r) => r.rating >= 4 && r.date && r.text.length > 60)
      .slice(0, 2)
      .map((r) => ({ provider: p!.name, ...r }));
  });

  const price = (p?: FunnelProvider, m: "semaglutide" | "tirzepatide" = "semaglutide") => p?.[m]?.price ?? "";

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

      {/* The four providers at a glance - the verified index, nothing else */}
      <section className="mx-auto max-w-[640px] px-4 pt-10">
        <h2 className="text-[20px] font-bold sm:text-[22px]">The verified prices behind the match</h2>
        <p className="mt-1 text-[13.5px] text-gray-500">Monthly price for compounded semaglutide and tirzepatide, with the condition attached to each.</p>
        <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-[13.5px]">
            <thead className="bg-gray-50 text-left text-[11.5px] font-bold uppercase tracking-wider text-gray-500">
              <tr><th className="px-3 py-2">Provider</th><th className="px-3 py-2">Semaglutide</th><th className="px-3 py-2">Tirzepatide</th><th className="hidden px-3 py-2 sm:table-cell">Shipping</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {providers.map((p) => (
                <tr key={p.id}>
                  <td className="px-3 py-2.5 font-bold">{p.name}</td>
                  <td className="px-3 py-2.5"><strong>{p.semaglutide?.price}</strong><span className="block text-[11.5px] text-gray-500">{p.semaglutide?.note}</span></td>
                  <td className="px-3 py-2.5"><strong>{p.tirzepatide?.price}</strong><span className="block text-[11.5px] text-gray-500">{p.tirzepatide?.note}</span></td>
                  <td className="hidden px-3 py-2.5 text-gray-600 sm:table-cell">{p.shipping}</td>
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
              The prices above are for compounded semaglutide and tirzepatide: the same active ingredients as Ozempic, Wegovy, Mounjaro and Zepbound, prepared by a US state-licensed pharmacy on a clinician&rsquo;s prescription. Compounded products are not individually FDA-approved. Brand-name pens are the FDA-approved versions and are priced separately on the providers&rsquo; sites.
            </p>
          </li>
          <li className="rounded-xl border border-gray-200 p-4">
            <p className="text-[15px] font-bold">2. Check the price you will still pay in month four</p>
            <p className="mt-1 text-[14px] leading-relaxed text-gray-600">
              Some headline prices are promotions. {altrx && <>altRx&rsquo;s {price(altrx)} is a promo rate against a regular $199.</>}{" "}
              {embody && <>embody&rsquo;s {price(embody)} is $79 at the regular rate.</>}{" "}
              {welludr && <>welludr&rsquo;s {price(welludr)} needs the 12-month plan.</>} Every one of them publishes one price per medication regardless of dose, so the number you see does not climb as your dose does.
            </p>
          </li>
          <li className="rounded-xl border border-gray-200 p-4">
            <p className="text-[15px] font-bold">3. Read the commitment and refund terms before you pay</p>
            <p className="mt-1 text-[14px] leading-relaxed text-gray-600">
              {embody && <>embody and altRx are month to month with no contract; embody refunds in full if a clinician does not approve you.</>}{" "}
              {welludr && <>welludr&rsquo;s lowest rate is tied to a 12-month plan, which its terms let you cancel or change.</>} If a plan asks you to prepay a year, make sure you have tolerated the medication first.
            </p>
          </li>
          <li className="rounded-xl border border-gray-200 p-4">
            <p className="text-[15px] font-bold">4. Delivery time differs more than you would think</p>
            <p className="mt-1 text-[14px] leading-relaxed text-gray-600">
              {embody && <>embody: {embody.shipping.toLowerCase()}.</>} {directmeds && <>DirectMeds: {directmeds.shipping.toLowerCase()}.</>}{" "}
              {welludr && <>welludr: {welludr.shipping.toLowerCase()}.</>} {altrx && <>altRx: {altrx.shipping.toLowerCase()}.</>} GLP-1 injections should arrive cold-chain packed.
            </p>
          </li>
        </ol>
      </section>

      {/* Verified customer quotes */}
      {quotes.length > 0 && (
        <section className="mx-auto max-w-[640px] px-4 pt-10">
          <h2 className="text-[20px] font-bold sm:text-[22px]">What customers wrote on Trustpilot</h2>
          <p className="mt-1 text-[13.5px] text-gray-500">Real reviews from each provider&rsquo;s public Trustpilot profile; names shortened.</p>
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
            <dd className="mt-1 text-[14px] leading-relaxed text-gray-600">The prices shown are cash prices: insurance rarely covers compounded GLP-1 medication, and embody, altRx and DirectMeds state outright that no insurance is required.</dd>
          </div>
          <div>
            <dt className="text-[15px] font-bold">Does the price go up as my dose increases?</dt>
            <dd className="mt-1 text-[14px] leading-relaxed text-gray-600">Not at these four. embody, welludr, altRx and DirectMeds each publish one price per medication that stays the same at every dose. The things that change the price are promotions ending and, at welludr, whether you take the 12-month plan.</dd>
          </div>
          <div>
            <dt className="text-[15px] font-bold">How does it work?</dt>
            <dd className="mt-1 text-[14px] leading-relaxed text-gray-600">You complete an online health intake, a licensed US clinician reviews it and decides whether a GLP-1 is appropriate for you, and if so the medication ships from a state-licensed pharmacy to your door. No clinic visit.</dd>
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
