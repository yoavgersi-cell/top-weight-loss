import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://www.treatmentshub.com/weight-loss/terms";
const UPDATED = "2026-10-04";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms on which Treatments Hub is provided: information only, no medical advice, no warranty, third-party links, and use of the content.",
  alternates: { canonical: CANONICAL },
};

const ext = "font-semibold text-[#0C4B75] hover:underline";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-[#191919]">Terms of use</h1>
      <p className="mb-8 text-[13px] text-gray-400">Last updated {UPDATED}</p>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>By using treatmentshub.com (&ldquo;the site&rdquo;) you agree to these terms. If you do not agree, do not use the site.</p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">1. Information only, not medical advice</h2>
        <p>
          The site compares online treatment providers and publishes general information about treatments. It is not
          medical, legal or financial advice, and it does not create a clinician-patient relationship. Decisions about
          your health, and about whether any medication or provider is appropriate for you, are yours to make with a
          licensed clinician. Never disregard professional medical advice because of something you read here.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">2. No warranty</h2>
        <p>
          The site is provided &ldquo;as is&rdquo;. We work to keep prices, terms and provider details accurate and we
          date our verifications, but providers change their offers without notice and we do not warrant that any
          information is complete, current or error-free. Confirm every price, term and eligibility requirement with the
          provider before paying.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">3. Third-party providers and links</h2>
        <p>
          Providers listed on the site are independent companies. We do not provide, prescribe, dispense or ship any
          treatment, and we are not a party to any transaction between you and a provider. Links to providers are
          affiliate links, as described in our <Link href="/weight-loss/disclaimer" className={ext}>disclaimer</Link>.
          Once you leave the site, the provider&rsquo;s own terms and privacy policy apply. We are not responsible for
          providers&rsquo; services, pricing, availability, medical care or conduct.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">4. Reviews and quoted content</h2>
        <p>
          Customer reviews and forum posts quoted on the site are the opinions of their authors, reproduced from
          public sources with attribution, and are not statements by us. Individual results described in them are not
          typical. Editorial scores and verdicts are our opinions, formed under the method on{" "}
          <Link href="/weight-loss/how-we-rank" className={ext}>how we rank</Link>.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">5. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, Treatments Hub and the people who work on it are not liable for any
          loss or damage arising from your use of the site or your reliance on its content, including any decision to
          use or not use a provider or treatment. Where liability cannot be excluded, it is limited to the amount
          permitted by law.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">6. Our content</h2>
        <p>
          The text, tables, verified price registry and design of the site are ours unless otherwise stated. You may
          read and share links to pages freely. You may not copy substantial parts of the site, or reproduce the price
          registry or review compilations, for commercial use without permission. Provider and medication trademarks
          belong to their owners.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">7. Acceptable use</h2>
        <p>Do not scrape the site at volume, interfere with its operation, or use it for anything unlawful.</p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">8. Changes</h2>
        <p>We may update these terms; the date at the top shows the current version. Continued use after a change means you accept it.</p>

        <p className="pt-4 text-[14px]">
          See also our <Link href="/weight-loss/privacy" className={ext}>privacy policy</Link> and{" "}
          <Link href="/weight-loss/disclaimer" className={ext}>disclaimer</Link>.
        </p>
      </div>
    </div>
  );
}
