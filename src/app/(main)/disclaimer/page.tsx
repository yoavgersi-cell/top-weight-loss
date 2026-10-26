import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://www.treatmentshub.com/weight-loss/disclaimer";
const UPDATED = "2026-10-26";

export const metadata: Metadata = {
  title: "Medical Disclaimer, Advertising & Review Policy",
  description:
    "Treatments Hub's full medical disclaimer by treatment area, how the site earns money and what it does not affect, and how reviews, prices and sources are used.",
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

        <h2 id="medical" className="scroll-mt-24 pt-4 text-xl font-semibold text-[#191919]">Medical disclaimer</h2>
        <p>
          Treatments Hub is not a medical provider, pharmacy or clinic. We do not prescribe, sell or dispense
          medication, and we do not employ the clinicians, pharmacies or therapists at the services we compare.
          Nothing on this site is medical advice. Every page is general information, written to help you compare
          services and understand the treatments they offer, and it is not a substitute for a consultation with a
          licensed clinician who knows your medical history.
        </p>
        <p>
          <strong className="text-[#191919]">No doctor-patient relationship.</strong> Reading this site, contacting us
          or using any tool on it (including the matching quiz) does not create a doctor-patient, pharmacist-patient
          or therapist-client relationship with Treatments Hub. Any such relationship is between you and the licensed
          provider you choose.
        </p>
        <p>
          <strong className="text-[#191919]">Do not start, stop or change a treatment because of this site.</strong>{" "}
          Prescription medications carry risks and side effects, interact with other medicines and conditions, and
          are not appropriate for everyone. Whether a treatment, a dose or a provider is suitable for you is a decision
          for you and a licensed clinician. Never delay seeking care, and never disregard a clinician&rsquo;s advice,
          because of something you read here.
        </p>
        <p>
          <strong className="text-[#191919]">Emergencies.</strong> If you think you are having a medical emergency, call
          911 or go to the nearest emergency department. If you are in crisis or thinking about harming yourself, call or
          text 988, the Suicide and Crisis Lifeline, which is free and available 24 hours a day in the United States.
        </p>
        <p>
          <strong className="text-[#191919]">Compounded medications.</strong> Compounded semaglutide, tirzepatide, ED
          formulas, hormone preparations and similar products discussed on this site are prepared by state-licensed
          pharmacies for an individual prescription. They are not FDA-approved products: the FDA has not reviewed them
          for safety, effectiveness or quality, and the agency has published{" "}
          <a href="https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss" target="_blank" rel="noopener" className={ext}>its concerns about unapproved GLP-1 drugs</a>, including dosing errors. Where a page quotes a
          price for a compounded product, that price does not imply the product is equivalent to the approved
          medication.
        </p>
        <p>
          <strong className="text-[#191919]">Results vary.</strong> Clinical-trial figures quoted on this site are
          averages from the cited trials and are not a prediction for any individual. Where a customer review or a
          Reddit post mentions weight lost, hair regrown, symptoms improved or any other result, that is one
          person&rsquo;s experience and is not typical.
        </p>

        <h3 className="pt-2 text-lg font-semibold text-[#191919]">By treatment area</h3>
        <p>
          <strong className="text-[#191919]">Weight loss (GLP-1 medications).</strong> Semaglutide and tirzepatide
          carry an FDA boxed warning about thyroid C-cell tumours observed in rodents and are contraindicated for anyone
          with a personal or family history of medullary thyroid carcinoma or Multiple Endocrine Neoplasia syndrome type
          2. They are not for use in pregnancy, and the labels warn about pancreatitis, gallbladder disease, kidney
          injury from dehydration and low blood sugar when combined with insulin or sulfonylureas. Eligibility criteria
          in the labels (a BMI of 30 or more, or 27 or more with a weight-related condition) are a clinician&rsquo;s to
          apply. We do not publish dosing schedules below the labelled starting doses.
        </p>
        <p>
          <strong className="text-[#191919]">Testosterone replacement therapy.</strong> Testosterone is a Schedule III
          controlled substance in the United States and is prescribed only after laboratory testing confirms low
          levels. TRT suppresses natural testosterone and sperm production while you are on it, requires ongoing
          bloodwork including hematocrit and, as indicated, PSA and estradiol, and carries risks that a clinician must
          weigh against your history. Testosterone used without a diagnosis of low testosterone is anabolic steroid
          use, not TRT.
        </p>
        <p>
          <strong className="text-[#191919]">Erectile dysfunction.</strong> PDE5 inhibitors (sildenafil, tadalafil,
          vardenafil) must never be combined with nitrates of any kind, including nitroglycerin, isosorbide and
          &ldquo;poppers,&rdquo; or with riociguat, because the combination can cause a dangerous fall in blood pressure.
          An erection lasting more than four hours, or sudden loss of vision or hearing, needs emergency care.
          Compounded multi-ingredient ED products are not FDA-approved, and products sold without a prescription may
          contain undisclosed drug ingredients.
        </p>
        <p>
          <strong className="text-[#191919]">Hair loss.</strong> Finasteride and dutasteride should not be taken or
          handled (crushed or broken tablets) by women who are or may become pregnant, because they can harm a
          developing male fetus. Finasteride is FDA-approved for male pattern hair loss; dutasteride and oral minoxidil
          are prescribed off-label for hair loss. Finasteride can lower PSA, which matters when interpreting prostate
          tests. Results take months and generally reverse when treatment stops.
        </p>
        <p>
          <strong className="text-[#191919]">Hormone replacement therapy.</strong> Systemic estrogen and progestogen
          therapy carries boxed warnings in its FDA labelling about cardiovascular disorders, breast cancer,
          endometrial cancer and probable dementia in certain groups, and whether the benefits outweigh the risks
          depends on age, time since menopause and personal and family history. Compounded hormone products are not
          FDA-approved. The form, dose and duration of any HRT are a clinician&rsquo;s decision.
        </p>
        <p>
          <strong className="text-[#191919]">Online therapy and psychiatry.</strong> Online therapy is not a
          substitute for emergency or in-patient care. If you are in crisis, use the 988 line or emergency services,
          not a signup flow. Controlled medications prescribed by telehealth are subject to additional federal and
          state rules, and some conditions need in-person evaluation. Platform availability and clinician licensure
          vary by state.
        </p>

        <h3 className="pt-2 text-lg font-semibold text-[#191919]">What our medical reviewer does and does not check</h3>
        <p>
          Pages that carry a &ldquo;Reviewed for medical accuracy&rdquo; line were read on the stated date by our medical
          content reviewer, a licensed medical laboratory scientist with a Master of Public Health, who checks the
          medical and scientific statements against the sources linked on the page: how a treatment works, what the
          cited trials and regulators say, and whether the terminology and claims match the evidence. She is not a
          prescribing clinician, she does not choose providers, set prices or rankings, and a reviewed page is still
          general information. Our{" "}
          <Link href="/medical-review-policy" className={ext}>medical review policy</Link> sets out the scope in full.
          Pages created after the most recent review carry no reviewer line until they are reviewed.
        </p>

        <h3 className="pt-2 text-lg font-semibold text-[#191919]">A note on AI assistants</h3>
        <p>
          AI search and assistant tools may quote or summarise pages from this site. A summary can drop the date,
          the source or the caveat attached to a figure. Every clinical number on this site is tied to a dated,
          linked source and every price to a verification date on the page it appears on; if you have reached a
          figure through an AI summary, check it on the page and with its source before acting on it, and treat
          the summary, like the page, as general information rather than advice.
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
