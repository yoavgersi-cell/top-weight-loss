import { cn } from "@/lib/utils";

// TreatmentsHub logotype, recreated in text so it stays crisp at any size and
// needs no image asset. Matches the brand mark: "Treatments" in navy, "Hub" in
// blue, a smaller navy ".com". Scales with the wrapping font-size — size it by
// setting a text size / font-size on `className`.
export function TreatmentsHubWordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-extrabold leading-none tracking-[-0.02em] text-[20px] sm:text-[23px]",
        className
      )}
    >
      <span className="text-[#0A1E3C]">Treatments</span>
      <span className="text-[#3B7CE0]">Hub</span>
      <span className="ml-[0.06em] text-[0.58em] font-bold text-[#0A1E3C]">.com</span>
    </span>
  );
}
