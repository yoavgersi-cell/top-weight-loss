import Link from "next/link";
import { ShieldAlert } from "lucide-react";

// ───── Medical disclaimer block ─────
// One standard, vertical-specific disclaimer at the bottom of every content
// page (articles, reviews, comparisons, three-way pages, keyword landings and
// vertical homes), above the sources. The wording is deliberately specific:
// a generic "not medical advice" line is already in the global footer; this
// block states what the page is, what it is not, and the one or two safety
// facts a reader of that vertical most needs to hear, each of which is a
// label or regulator statement rather than our own claim. It links to the
// full disclaimer and the medical review policy. Added Oct 26, 2026.

const VERTICAL_NOTES: Record<string, { what: string; safety: string }> = {
  "weight-loss": {
    what: "GLP-1 weight-loss medications such as semaglutide and tirzepatide",
    safety:
      "Semaglutide and tirzepatide carry an FDA boxed warning about thyroid C-cell tumours seen in rodents and are not for anyone with a personal or family history of medullary thyroid carcinoma or MEN 2, nor for use in pregnancy. Compounded versions sold by telehealth providers are prepared by state-licensed pharmacies and are not FDA-approved products. Where a review or post on this page mentions weight lost, that is one person's result and is not typical; results vary widely.",
  },
  trt: {
    what: "testosterone replacement therapy and related treatments",
    safety:
      "Testosterone is a Schedule III controlled substance in the United States and is prescribed only after blood tests confirm low levels. TRT suppresses natural testosterone and sperm production while you are on it, requires ongoing bloodwork, and is not appropriate for men trying to conceive without a clinician's plan. Any clinic that offers testosterone without labs or a licensed prescriber should be avoided.",
  },
  ed: {
    what: "erectile dysfunction medications and treatments",
    safety:
      "Sildenafil, tadalafil and related medicines must never be taken with nitrates (including nitroglycerin, isosorbide and 'poppers') because the combination can cause a dangerous drop in blood pressure. An erection lasting more than four hours, or sudden loss of vision or hearing, needs emergency care. Compounded multi-ingredient ED products are not FDA-approved.",
  },
  "hair-loss": {
    what: "hair-loss medications such as finasteride, dutasteride and minoxidil",
    safety:
      "Finasteride and dutasteride should not be taken or handled (crushed or broken tablets) by women who are or may become pregnant, because they can harm a developing male fetus. Oral minoxidil and dutasteride are prescribed off-label for hair loss. Results take months and generally reverse when treatment stops.",
  },
  hrt: {
    what: "hormone replacement therapy for menopause",
    safety:
      "Systemic estrogen and progestogen therapy carries boxed warnings in its FDA labelling, and whether the benefits outweigh the risks depends on your age, time since menopause and personal and family history. Compounded hormone products are not FDA-approved. A licensed clinician who knows your history should decide whether HRT is appropriate and which form.",
  },
  "online-therapy": {
    what: "online therapy and psychiatry services",
    safety:
      "If you are in crisis or thinking about harming yourself, do not use any signup flow: in the United States call or text 988 (the Suicide and Crisis Lifeline), or call 911 or go to the nearest emergency department. Online therapy is not a substitute for emergency or in-patient care, and controlled medications face additional prescribing rules by telehealth.",
  },
  "hearing-aids": {
    what: "over-the-counter hearing devices",
    safety:
      "OTC hearing aids are intended for adults with perceived mild-to-moderate hearing loss. Sudden hearing loss, hearing loss in one ear, pain, drainage or dizziness need a clinician's evaluation, not a device.",
  },
};

const DEFAULT_NOTE = {
  what: "the treatments and services compared on this page",
  safety: "Prescription treatments carry risks and side effects and are not appropriate for everyone.",
};

export function MedicalDisclaimer({ vertical, className = "" }: { vertical: string; className?: string }) {
  const note = VERTICAL_NOTES[vertical] ?? DEFAULT_NOTE;
  return (
    <section
      className={`rounded-2xl border border-gray-200 bg-gray-50/70 p-5 sm:p-6 ${className}`}
      aria-labelledby="medical-disclaimer-heading"
      data-medical-disclaimer=""
    >
      <div className="mb-2 flex items-center gap-2">
        <ShieldAlert className="h-4.5 w-4.5 shrink-0 text-gray-500" strokeWidth={2} />
        <h2 id="medical-disclaimer-heading" className="text-[15px] font-bold text-[#191919]">
          Medical disclaimer
        </h2>
      </div>
      <div className="space-y-2 text-[13.5px] leading-[1.7] text-gray-600">
        <p>
          This page is general information about {note.what}, published to help you compare services. It is not
          medical advice, it does not create a doctor-patient relationship, and it is not a substitute for a
          consultation with a licensed clinician who knows your history. Treatments Hub is not a medical provider,
          pharmacy or clinic and does not prescribe, sell or dispense medication. Do not start, stop or change any
          treatment because of something you read here, and do not delay seeking care; in an emergency call 911.
        </p>
        <p>{note.safety}</p>
        <p>
          Medical and scientific statements on this site are checked against the sources linked on the page by our{" "}
          <Link href="/medical-review-policy" className="font-semibold text-[#0C4B75] hover:underline">
            medical content reviewer
          </Link>
          , who does not choose providers or set prices. Prices, plans and customer reviews are each provider's
          published figures and customers' own words on the dates stated. We may earn a commission from provider
          links. The full{" "}
          <Link href="/weight-loss/disclaimer" className="font-semibold text-[#0C4B75] hover:underline">
            medical and advertising disclaimer
          </Link>{" "}
          explains all of this in detail.
        </p>
      </div>
    </section>
  );
}
