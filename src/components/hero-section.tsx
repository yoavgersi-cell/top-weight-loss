import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  backgroundImageUrl: string;
  imageAlt: string;
  updatedLabel?: string;
  h1: string;
  h2?: string;
  description?: string;
  overlayOpacity?: number;
  textAlign?: "left" | "center";
  maxTextWidth?: string;
}

export function HeroSection({
  backgroundImageUrl,
  imageAlt,
  updatedLabel,
  h1,
  h2,
  description,
  textAlign = "left",
  maxTextWidth = "640px",
}: HeroSectionProps) {
  return (
    <section className="relative w-full h-[160px] sm:h-[270px] lg:h-[300px] overflow-hidden bg-[#f5f5f7]">
      {/* Hero image positioned on the right */}
      <div className="absolute right-[380px] top-0 h-full w-[50%] hidden sm:block">
        <Image
          src={backgroundImageUrl}
          alt={imageAlt}
          fill
          priority
          className="object-contain object-right-top"
        />
      </div>

      {/* Content */}
      <div
        className={cn(
          "relative z-10 mx-auto flex h-full max-w-[1280px] flex-col justify-center px-4 py-4 sm:px-10 sm:py-8 lg:px-16 lg:py-12",
          textAlign === "center" && "items-center text-center"
        )}
      >
        <div style={{ maxWidth: maxTextWidth }}>
          {updatedLabel && (
            <span className="mb-3 inline-flex items-center gap-1.5 text-[13px] text-gray-600">
              <svg className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
              {updatedLabel}
            </span>
          )}

          <h1 className="text-[22px] sm:text-[36px] leading-[1.1] font-extrabold text-[#191919]">
            {h1}
          </h1>

          {h2 && (
            <h2 className="mt-1 text-[16px] sm:text-[32px] leading-[1.2] font-semibold text-[#3a6ea5]">
              {h2}
            </h2>
          )}

          {description && (
            <p className="mt-2 sm:mt-3 text-[13px] sm:text-[16px] leading-[1.5] sm:leading-[1.6] text-gray-600 max-w-[520px]">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
