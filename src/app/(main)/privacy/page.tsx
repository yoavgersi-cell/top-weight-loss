import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://www.treatmentshub.com/weight-loss/privacy";
const UPDATED = "2026-10-04";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Treatments Hub collects when you visit, what it does not collect, which analytics run, what happens when you click a provider link, and your choices.",
  alternates: { canonical: CANONICAL },
};

const ext = "font-semibold text-[#0C4B75] hover:underline";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-[#191919]">Privacy policy</h1>
      <p className="mb-8 text-[13px] text-gray-400">Last updated {UPDATED}</p>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          Treatments Hub is an information and comparison website. It has no accounts, no sign-up, no newsletter and
          no forms that send us your details. This policy describes the small amount of data that is collected when
          you visit, and how to limit it.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">What we do not collect</h2>
        <p>
          We do not ask for or store your name, email address, phone number, health information, payment details or
          account credentials. The provider-matching quiz runs in your browser; your answers are used to show results
          on the page and are not sent to or stored by us. We do not sell personal information.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">What is collected automatically</h2>
        <p>
          <strong className="text-[#191919]">Google Analytics 4.</strong> We use Google Analytics to understand which
          pages are read and how visitors move through the site. It sets cookies and collects a pseudonymous
          identifier, pages viewed, approximate location derived from IP address, device and browser information,
          and events such as clicks on provider links. We do not pass names, emails or health details to it. Google&rsquo;s
          own notice is at{" "}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className={ext}>
            policies.google.com/technologies/partner-sites
          </a>.
        </p>
        <p>
          <strong className="text-[#191919]">Vercel Analytics.</strong> Our hosting provider records aggregate page
          views and performance timing without cookies and without a persistent identifier.
        </p>
        <p>
          <strong className="text-[#191919]">Server logs.</strong> Like every website, our hosting infrastructure
          records requests, including IP address, for security and reliability, and retains them for a limited
          period.
        </p>
        <p>We do not run advertising pixels or social-media trackers.</p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">When you click a provider link</h2>
        <p>
          Links to providers are affiliate links. When you click one, you leave this site and the provider, or its
          affiliate network, records that the visit came from us so that a commission can be attributed. From that
          point the provider&rsquo;s own privacy policy applies to anything you enter on its site. We do not receive
          your name or health information from providers; we receive aggregate reports of clicks and qualifying
          actions.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">Your choices</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Block or clear cookies in your browser, or install Google&rsquo;s{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className={ext}>Analytics opt-out add-on</a>.
            The site works fully without analytics cookies.
          </li>
          <li>Use your browser&rsquo;s Global Privacy Control or Do Not Track setting; we do not sell or share personal information for targeted advertising in any case.</li>
          <li>Residents of US states with privacy laws may request access to or deletion of personal information; because we hold none that identifies you, there is normally nothing to return or delete, but you can ask at <a href="mailto:contact@treatmentshub.com" className={ext}>contact@treatmentshub.com</a>.</li>
        </ul>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">Children</h2>
        <p>This site is intended for adults and is not directed at children under 18. We do not knowingly collect information from children.</p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">Changes</h2>
        <p>If what we collect changes, this page changes first, with a new date at the top.</p>

        <p className="pt-4 text-[14px]">
          See also our <Link href="/weight-loss/disclaimer" className={ext}>disclaimer</Link> and{" "}
          <Link href="/weight-loss/terms" className={ext}>terms of use</Link>.
        </p>
      </div>
    </div>
  );
}
