import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Your Weight Loss Provider Match - Free Quiz",
  description:
    "Chat with us to find the best weight loss provider for your goals. Personalized GLP-1 provider recommendations based on your needs.",
  // Chat-quiz variant: no longer linked from any page (quiz links were retired
  // Oct 2026), so it is kept out of the index and the sitemap rather than
  // left as an orphan Google reports as "discovered, not linked".
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://www.treatmentshub.com/weight-loss/find-your-match-weight-loss",
  },
  openGraph: {
    title: "Find Your Weight Loss Provider Match",
    description:
      "Chat with us and get matched with the best weight loss provider for your goals and budget.",
    url: "https://www.treatmentshub.com/weight-loss/find-your-match-weight-loss",
  },
};

export default function ChatQuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="sr-only">Find Your Best Weight Loss Provider Match</h1>
      {children}
    </>
  );
}
