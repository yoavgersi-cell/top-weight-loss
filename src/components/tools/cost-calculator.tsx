"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

// ───── GLP-1 cost calculator ─────
// Multiplies the verified price index out over a chosen number of months.
// Every row is passed in from the server page straight from PRICE_INDEX, so
// the figures here are the same ones on the statistics and cheapest-GLP-1
// pages, with the same verification date. The only arithmetic is:
//   - listed monthly price x months;
//   - a published "20% off month one" applied to month one only;
//   - a published regular price (note contains "reg. $X") multiplied out as a
//     second column, so promotional rows show what they cost if the promotion
//     ends - we do not know promo durations and do not guess them;
//   - a 12-month plan or prepaid plan flagged, and totalled at 12 months when
//     fewer months are chosen, because that is what the provider bills.
// No price is invented, averaged or estimated. Oct 27, 2026.

export type CostRow = {
  providerId: string;
  name: string;
  reviewHref: string;
  semaglutide: { price: string; note: string } | null;
  tirzepatide: { price: string; note: string } | null;
  commitment: string;
};

export type BrandRow = { drug: string; ingredient: string; price: string; soldAt: string };

type Molecule = "semaglutide" | "tirzepatide";

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const firstNumber = (s: string): number | null => {
  const m = s.replace(/,/g, "").match(/\$?(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : null;
};
const regularPrice = (note: string): number | null => {
  const m = note.replace(/,/g, "").match(/reg\.?\s*\$(\d+(?:\.\d+)?)/i);
  return m ? parseFloat(m[1]) : null;
};

export function CostCalculator({ rows, brands, verifiedOn }: { rows: CostRow[]; brands: BrandRow[]; verifiedOn: string }) {
  const [molecule, setMolecule] = useState<Molecule>("semaglutide");
  const [months, setMonths] = useState(12);

  const computed = useMemo(() => {
    return rows
      .map((r) => {
        const cell = r[molecule];
        if (!cell) return null;
        const listed = firstNumber(cell.price);
        if (listed == null) return null;
        const note = cell.note.toLowerCase();
        const isFrom = /^from/i.test(cell.price.trim());
        const monthOneOff = /20% off month one/.test(note) ? 0.8 : 1;
        const twelveMonth = /12-mo|12-month/.test(note) || /12-month/i.test(r.commitment);
        const billedMonths = twelveMonth ? Math.max(12, Math.ceil(months / 12) * 12) : months;
        const total = listed * monthOneOff + listed * (billedMonths - 1);
        const reg = regularPrice(cell.note);
        const regTotal = reg != null ? reg * billedMonths : null;
        return { r, cell, listed, isFrom, monthOneOff, twelveMonth, billedMonths, total, reg, regTotal };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null)
      .sort((a, b) => a.total - b.total);
  }, [rows, molecule, months]);

  const brandRows = useMemo(
    () => brands.filter((b) => b.ingredient.toLowerCase().includes(molecule)).map((b) => ({ b, low: firstNumber(b.price) })),
    [brands, molecule],
  );

  const label = "mb-1 block text-[12px] font-bold uppercase tracking-wide text-gray-500";
  const cell = "px-3 py-3 align-top text-[13.5px] [font-variant-numeric:tabular-nums]";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <span className={label}>Medication</span>
          <div className="flex gap-2">
            {(["semaglutide", "tirzepatide"] as Molecule[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMolecule(m)}
                aria-pressed={molecule === m}
                className={`rounded-full px-4 py-1.5 text-[13px] font-bold capitalize ${molecule === m ? "bg-[#0C4B75] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className={label} htmlFor="cost-months">Months of treatment: {months}</label>
          <input
            id="cost-months"
            type="range"
            min={1}
            max={24}
            value={months}
            onChange={(e) => setMonths(parseInt(e.target.value, 10))}
            className="w-full accent-[#0C4B75]"
          />
          <div className="flex justify-between text-[11px] text-gray-400"><span>1</span><span>6</span><span>12</span><span>18</span><span>24</span></div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-[#F7F8FA] text-[11.5px] font-bold uppercase tracking-wide text-gray-500">
              <th className={cell}>Provider</th>
              <th className={cell}>Listed monthly price</th>
              <th className={cell}>Condition on that price</th>
              <th className={cell}>{months} month{months === 1 ? "" : "s"} at the listed price</th>
              <th className={cell}>Same period at the regular price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {computed.map(({ r, cell: c, listed, isFrom, monthOneOff, twelveMonth, billedMonths, total, reg, regTotal }) => (
              <tr key={r.providerId} className="align-top">
                <td className={`${cell} font-semibold text-[#191919]`}>
                  <Link href={r.reviewHref} className="hover:text-[#0C4B75] hover:underline">{r.name}</Link>
                </td>
                <td className={`${cell} font-bold text-[#191919]`}>{c.price}<span className="font-normal text-gray-400">/mo</span></td>
                <td className={`${cell} text-gray-500`}>{c.note}</td>
                <td className={`${cell} font-bold text-[#191919]`}>
                  {isFrom ? "from " : ""}{usd(total)}
                  {twelveMonth && billedMonths !== months && (
                    <span className="block text-[11.5px] font-normal text-amber-700">Billed as a {billedMonths}-month plan at this price</span>
                  )}
                  {monthOneOff < 1 && <span className="block text-[11.5px] font-normal text-gray-500">20% off applied to month one only</span>}
                </td>
                <td className={`${cell} text-gray-700`}>
                  {regTotal != null ? (
                    <>
                      {usd(regTotal)}
                      <span className="block text-[11.5px] text-gray-400">at {usd(reg!)}/mo regular price</span>
                    </>
                  ) : (
                    <span className="text-gray-400">No separate regular price published</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[12.5px] leading-relaxed text-gray-500">
        Prices are each provider&rsquo;s own published monthly rate for compounded {molecule}, verified on {verifiedOn} in our{" "}
        <Link href="/weight-loss/glp1-weight-loss-statistics" className="font-semibold text-[#0C4B75] hover:underline">price index</Link>. The listed-price column multiplies that rate by the months you chose; where a provider publishes a separate regular price, the last column shows the same period at that price, because we do not know how long a promotion lasts. Rows marked &ldquo;from&rdquo; start at that figure. Compounded products are not FDA-approved; consultations and shipping are included where the provider says so. Confirm the current price at checkout.
      </p>

      {brandRows.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-2 text-[15px] font-bold text-[#191919]">Brand-name {molecule}, cash price, for comparison</h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-[#F7F8FA] text-[11.5px] font-bold uppercase tracking-wide text-gray-500">
                  <th className={cell}>Brand</th>
                  <th className={cell}>Verified cash price</th>
                  <th className={cell}>Sold at</th>
                  <th className={cell}>{months} month{months === 1 ? "" : "s"} from the lowest listed price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {brandRows.map(({ b, low }) => (
                  <tr key={b.drug}>
                    <td className={`${cell} font-semibold text-[#191919]`}>{b.drug}</td>
                    <td className={cell}>{b.price}</td>
                    <td className={`${cell} text-gray-500`}>{b.soldAt}</td>
                    <td className={`${cell} font-bold text-[#191919]`}>{low != null ? `from ${usd(low * months)}` : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[12.5px] leading-relaxed text-gray-500">
            Brand prices are cash prices published by the providers named, from the same index. Insurance, manufacturer savings offers and Medicare&rsquo;s GLP-1 Bridge can change them substantially; see our{" "}
            <Link href="/weight-loss/articles/glp1-with-insurance" className="font-semibold text-[#0C4B75] hover:underline">insurance guide</Link>.
          </p>
        </div>
      )}
    </div>
  );
}
