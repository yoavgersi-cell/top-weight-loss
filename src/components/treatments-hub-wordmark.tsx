import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// Text wordmark for the hub (treatmentshub.com). Deliberately asset-free — a
// small accent badge plus a two-tone "TreatmentsHub" logotype — so it renders
// crisply at any size and needs no image.
export function TreatmentsHubWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[#0C4B75] text-white">
        <Plus className="h-[18px] w-[18px]" strokeWidth={3} />
      </span>
      <span className="text-[20px] font-extrabold leading-none tracking-tight text-[#191919]">
        Treatments<span className="text-[#0C4B75]">Hub</span>
      </span>
    </span>
  );
}
