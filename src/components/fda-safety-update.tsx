import { ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

// ───── FDA safety update box (Nov 9, 2026 NAION labeling change) ─────
// One short, factual notice placed once on the pages that convert (the GLP-1
// provider comparison, the semaglutide and tirzepatide landing pages, and the
// embody, HealthRx and DirectMeds reviews), above the provider table or after
// the intro, never in the masthead. Every figure is quoted from the FDA Drug
// Safety Communication dated 11/09/2026 (read Nov 16, 2026; source file
// ops/research/2026-11-16-weight-loss-trends.md, trend 1). The advice lines
// are the FDA's own wording: patients "contact their health care professional
// right away"; prescribers "consider discontinuing". Nothing here is medical
// advice, and the box must not be turned into one.

export const FDA_NAION_DSC_URL =
  "https://www.fda.gov/drugs/drug-safety-communications/fda-requires-safety-labeling-changes-glucagon-peptide-1-receptor-agonists-glp-1-ras-due-potential";

export function FdaSafetyUpdate({ className }: { className?: string }) {
  return (
    <aside
      aria-label="FDA safety update, November 9, 2026"
      className={cn("rounded-xl border border-[#0C4B75]/15 bg-[#F4F8FB] p-5 text-[14.5px] leading-[1.75] text-gray-700 sm:p-6", className)}
    >
      <p className="mb-1.5 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.07em] text-[#0C4B75]">
        <ShieldAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
        FDA safety update, Nov 9, 2026
      </p>
      <p>
        On November 9, 2026 the FDA required all GLP-1 receptor agonist labels to add a Warnings and Precautions entry for non-arteritic
        anterior ischemic optic neuropathy (NAION), a rare but serious form of vision loss. It cites a meta-analysis of 126
        randomized controlled trials with 134,253 patients: 6.4 NAION events per 100,000 patient-years on a GLP-1 RA
        versus 3.8 on placebo (
        <a href={FDA_NAION_DSC_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0C4B75] underline underline-offset-2 hover:text-[#093d61]">
          FDA Drug Safety Communication, Nov 9, 2026
        </a>
        , read Nov 16, 2026). For sudden, painless vision loss in one eye, the FDA says to contact your health care professional right away;
        it tells prescribers to consider discontinuing the medication in anyone who develops NAION. Compounded semaglutide and tirzepatide carry the same active ingredients and are not
        FDA-approved. On Nov 16, 2026 the Wegovy (revised 6/2026) and Zepbound (revised 8/2026) labels on DailyMed did not yet
        show the new warning. This is not medical advice.
      </p>
    </aside>
  );
}
