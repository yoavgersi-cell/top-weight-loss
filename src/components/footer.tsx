import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#E5E5E5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <p className="mb-4 text-xs text-gray-500">
          <strong>Affiliate Disclosure:</strong> TopWeightLoss may earn a commission
          when you click on links and make a purchase. This does not affect our
          rankings or reviews. We are committed to providing honest, independent
          comparisons to help you make informed decisions.
        </p>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} TopWeightLoss. All rights reserved.
          </p>
          <nav className="flex gap-6 text-sm text-gray-500">
            <Link href="/about" className="hover:text-[#09553D] transition-colors">
              About
            </Link>
            <Link href="/disclaimer" className="hover:text-[#09553D] transition-colors">
              Disclaimer
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
