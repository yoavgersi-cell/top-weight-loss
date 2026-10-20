// Chrome-free route group for paid-traffic landing pages (/<vertical>/go/*).
// No header, footer or site navigation: the only ways out of the page are the
// provider buttons. The root layout still wraps this (analytics, pixels,
// Organization schema), and the page renders its own disclosure line.
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-white">{children}</main>;
}
