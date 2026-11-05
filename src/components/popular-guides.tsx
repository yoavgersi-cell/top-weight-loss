import Link from "next/link";

// ───── Popular guides (crawl paths) ─────
// Google's Nov 2026 Page indexing report showed ~240 hub URLs "Discovered -
// currently not indexed" (never crawled), including the ED and online-therapy
// homes and the weight-loss price and statistics pages, while the weight-loss
// comparison and review pages are the ones Google does crawl. This block
// links from those crawled pages to the priority uncrawled ones so Google has
// a path in. Labels mirror each destination's own heading; no figures, so
// nothing here can drift from the page it points at.

type GuideLink = { href: string; label: string };

const WEIGHT_LOSS_GUIDES: GuideLink[] = [
  { href: "/weight-loss/cheapest-glp1", label: "Cheapest GLP-1 online" },
  { href: "/weight-loss/glp1-weight-loss-statistics", label: "GLP-1 price index & weight loss statistics" },
  { href: "/weight-loss/tirzepatide", label: "Best tirzepatide providers" },
  { href: "/weight-loss/articles/glp1-weight-loss-results", label: "GLP-1 weight loss results" },
  { href: "/weight-loss/articles/how-to-start-glp1-treatment-online", label: "How to start GLP-1 treatment online" },
  { href: "/weight-loss/retatrutide-weight-loss", label: "Retatrutide for weight loss" },
  { href: "/weight-loss/weight-loss-pills", label: "Weight loss pills" },
  { href: "/weight-loss/articles/glp1-coverage-2027-employers-dropping", label: "GLP-1 coverage in 2027" },
  { href: "/weight-loss/articles/lost-insurance-coverage-zepbound-wegovy", label: "Lost coverage for Zepbound or Wegovy?" },
  { href: "/weight-loss/articles/glp1-weight-loss-for-women", label: "GLP-1 weight loss for women" },
];

const OTHER_CATEGORIES: GuideLink[] = [
  { href: "/ed", label: "Erectile dysfunction (ED) treatment" },
  { href: "/ed/articles/erectile-dysfunction-statistics", label: "Erectile dysfunction statistics" },
  { href: "/trt", label: "Testosterone replacement (TRT)" },
  { href: "/hrt", label: "Menopause hormone therapy (HRT)" },
  { href: "/hair-loss", label: "Hair loss treatment" },
  { href: "/online-therapy", label: "Online therapy" },
];

export function PopularGuides({ currentPath }: { currentPath?: string }) {
  const wl = WEIGHT_LOSS_GUIDES.filter((g) => g.href !== currentPath);
  return (
    <nav aria-label="Popular guides" className="mb-10 rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="mb-3 text-[17px] font-bold text-[#191919]">Popular guides</h2>
      <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
        {wl.map((g) => (
          <li key={g.href}>
            <Link href={g.href} className="text-[14.5px] font-medium text-[#0C4B75] hover:underline">
              {g.label}
            </Link>
          </li>
        ))}
      </ul>
      <h3 className="mt-5 mb-2 text-[14px] font-bold uppercase tracking-wide text-gray-500">Other treatments we compare</h3>
      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        {OTHER_CATEGORIES.map((g) => (
          <li key={g.href}>
            <Link href={g.href} className="text-[14.5px] font-medium text-[#0C4B75] hover:underline">
              {g.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
