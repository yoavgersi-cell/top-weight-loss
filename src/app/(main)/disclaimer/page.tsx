import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://www.treatmentshub.com/weight-loss/disclaimer";
const UPDATED = "2026-10-04";

export const metadata: Metadata = {
  title: "Disclaimer: Advertising Disclosure, Medical Disclaimer & How We Use Reviews",
  description:
    "How Treatments Hub earns money, what that does and does not affect, the medical disclaimer, and how customer reviews, Reddit posts and provider information are used on this site.",
  alternates: { canonical: CANONICAL },
};

const ext = "font-semibold text-[#0C4B75] hover:underline";

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-[#191919]">Disclaimer</h1>
      <p className="mb-8 text-[13px] text-gray-400">Last updated {UPDATED}</p>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <h2 className="text-xl font-semibold text-[#191919]">Advertising disclosure (FTC)</h2>
        <p>
          Treatments Hub contains affiliate links. When you click a link to a provider and sign up, schedule a
          consultation or make a purchase, we may receive a commission at no additional cost to you. This is how
          the site is funded.
        </p>
        <p>
          <strong className="text-[#191919]">What compensation can affect:</strong> which providers are featured on
          the site, and the order and placement of listings, cards and links.{" "}
          <strong className="text-[#191919]">What it does not affect:</strong> the prices we publish, which are each
          provider&rsquo;s own published rate verified on a stated date; the Trustpilot figures and reviews we quote;
          the Reddit posts we quote; medical statements and their review; and the content of our written reviews and
          comparisons. Our editorial scores follow the method on{" "}
          <Link href="/weight-loss/how-we-rank" className={ext}>how we rank</Link>. Not every provider in this
          market is included on this site.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">Medical disclaimer</h2>
        <p>
          Treatments Hub is not a medical provider, pharmacy or clinic, and nothing on this site is medical advice.
          Content is general information to help you compare services. Prescription medications, including GLP-1
          medications, carry risks and side effects and are not appropriate for everyone. Whether any treatment is
          suitable for you is a decision for you and a licensed clinician. Compounded medications discussed on this
          site are not FDA-approved products. Our{" "}
          <Link href="/medical-review-policy" className={ext}>medical review policy</Link> explains what our reviewer
          checks and what she does not.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">Customer reviews, testimonials and results</h2>
        <p>
          We quote customer reviews from Trustpilot and posts from Reddit, verbatim and with their dates, as
          evidence of what customers report. They are individual experiences, selected to show the range of
          feedback including negative reviews, and they are not evidence that every customer will have the same
          experience.{" "}
          <strong className="text-[#191919]">Where a review or post mentions weight lost, that result is one
          person&rsquo;s and is not typical; results from any weight-loss medication vary widely by individual.</strong>{" "}
          Reviewer names are shortened to a first name and initial. Trustpilot aggregate ratings and review counts are
          as shown on the provider&rsquo;s public profile on the date we captured them, and a Trustpilot rating reflects
          customer experience, not medical quality. Trustpilot is a trademark of Trustpilot A/S; Reddit is a trademark
          of Reddit, Inc.; neither is affiliated with this site.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">Prices and provider information</h2>
        <p>
          Prices, plans, shipping terms and program details are taken from each provider&rsquo;s own published
          materials at the time of our last verification, which is dated on the page. Providers change prices and
          terms without notice. Always confirm the current price, terms and your eligibility on the provider&rsquo;s
          own site before paying. Where we have not verified something, the page says so rather than guessing.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">Trademarks</h2>
        <p>
          Provider names, logos and brand assets, and medication brand names such as Ozempic®, Wegovy®, Mounjaro® and
          Zepbound®, are the property of their respective owners. They appear here to identify the products and
          services being compared and do not imply endorsement, partnership or sponsorship unless stated.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-[#191919]">Accuracy and corrections</h2>
        <p>
          We try to keep every page accurate and current, and we log price changes when we find them. We cannot
          guarantee that every provider, price or offer is complete or current at the moment you read it. If you find
          an error, email <a href="mailto:contact@treatmentshub.com" className={ext}>contact@treatmentshub.com</a>; confirmed
          errors are corrected and, where medical, re-reviewed.
        </p>

        <p className="pt-4 text-[14px]">
          See also our <Link href="/weight-loss/privacy" className={ext}>privacy policy</Link> and{" "}
          <Link href="/weight-loss/terms" className={ext}>terms of use</Link>.
        </p>
      </div>
    </div>
  );
}
