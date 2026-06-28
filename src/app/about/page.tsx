import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — How We Compare Weight Loss Providers",
  description:
    "Learn how topweightloss.io independently ranks and reviews weight loss providers. Our methodology, editorial standards, and mission.",
  alternates: {
    canonical: "https://www.topweightloss.io/about",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-6 text-3xl font-bold text-[#191919]">About TopWeightLoss</h1>
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          TopWeightLoss is an independent comparison platform dedicated to helping
          people make informed decisions about weight management solutions. We
          research, analyze, and rank FDA-approved medications based on
          clinical effectiveness, safety profiles, cost, and user experiences.
        </p>
        <p>
          Our team reviews published clinical trial data, consults medical
          resources, and aggregates real-world feedback to create comprehensive,
          unbiased comparisons. We believe that transparent information empowers
          better health decisions.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-[#191919]">
          How We Rank Products
        </h2>
        <p>
          Each product is evaluated on multiple factors including clinical
          efficacy, side effect profile, ease of use, cost accessibility, and
          overall patient satisfaction. Our ratings reflect a weighted composite
          of these factors to give you a clear picture of how options compare.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-[#191919]">
          Important Note
        </h2>
        <p>
          TopWeightLoss is not a medical provider. The information on this site is
          for educational purposes only and should not replace professional
          medical advice. Always consult with a qualified healthcare provider
          before starting any weight loss medication.
        </p>
      </div>
    </div>
  );
}
