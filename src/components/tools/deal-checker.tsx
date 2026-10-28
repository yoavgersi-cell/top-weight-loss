"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

// ───── Is it really a deal? ─────
// The reader types the price a provider is advertising; the tool compares it
// with that provider's verified regular price from the price index over the
// months chosen. The only figures it holds are the index rows passed in from
// the server; the advertised price is the reader's own input and is never
// stored. A promotion that beats the everyday listed price is called a saving;
// one that only matches it is called what it is.

export type CheckerRow = {
  providerId: string;
  name: string;
  reviewHref: string;
  semaglutide: { price: string; note: string } | null;
  tirzepatide: { price: string; note: string } | null;
};

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

export function DealChecker({ rows, verifiedOn }: { rows: CheckerRow[]; verifiedOn: string }) {
  const [providerId, setProviderId] = useState(rows[0]?.providerId ?? "");
  const [molecule, setMolecule] = useState<Molecule>("semaglutide");
  const [advertised, setAdvertised] = useState("");
  const [months, setMonths] = useState(6);

  const row = rows.find((r) => r.providerId === providerId) ?? null;
  const cell = row?.[molecule] ?? null;

  const result = useMemo(() => {
    if (!cell) return null;
    const listed = firstNumber(cell.price);
    const reg = regularPrice(cell.note);
    const adv = parseFloat(advertised.replace(/[^\d.]/g, ""));
    if (listed == null || isNaN(adv) || adv <= 0) return { listed, reg, adv: null as number | null };
    return { listed, reg, adv };
  }, [cell, advertised]);

  const label = "mb-1 block text-[12px] font-bold uppercase tracking-wide text-gray-500";
  const input = "w-full rounded-lg border border-gray-300 px-3 py-2 text-[15px] text-[#191919] focus:border-[#0C4B75] focus:outline-none";
  const pill = (active: boolean) => `rounded-full px-4 py-1.5 text-[13px] font-bold capitalize ${active ? "bg-[#0C4B75] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-4 sm:grid-cols-4">
        <div>
          <label className={label} htmlFor="dc-provider">Provider</label>
          <select id="dc-provider" value={providerId} onChange={(e) => setProviderId(e.target.value)} className={input}>
            {rows.map((r) => (
              <option key={r.providerId} value={r.providerId}>{r.name}</option>
            ))}
          </select>
        </div>
        <div>
          <span className={label}>Medication</span>
          <div className="flex gap-2">
            {(["semaglutide", "tirzepatide"] as Molecule[]).map((m) => (
              <button key={m} type="button" className={pill(molecule === m)} aria-pressed={molecule === m} onClick={() => setMolecule(m)}>{m}</button>
            ))}
          </div>
        </div>
        <div>
          <label className={label} htmlFor="dc-price">Advertised price per month</label>
          <input id="dc-price" inputMode="decimal" placeholder="e.g. 79" value={advertised} onChange={(e) => setAdvertised(e.target.value)} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="dc-months">Months you would stay: {months}</label>
          <input id="dc-months" type="range" min={1} max={12} value={months} onChange={(e) => setMonths(parseInt(e.target.value, 10))} className="w-full accent-[#0C4B75]" />
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-gray-200 bg-[#F7F8FA] p-4 text-[14.5px] leading-relaxed text-gray-700" aria-live="polite">
        {!row || !cell ? (
          <p>{row ? `${row.name} does not publish a ${molecule} price in our index, so there is no verified figure to compare against.` : "Pick a provider."}</p>
        ) : result?.adv == null ? (
          <p>
            <strong className="text-[#191919]">{row.name}</strong> lists {molecule} at <strong className="text-[#191919]">{cell.price}/month</strong> ({cell.note}) in our index, verified {verifiedOn}
            {result?.reg != null && <>; the regular price it publishes is {usd(result.reg)}/month</>}. Type the price the promotion advertises to see the difference.
          </p>
        ) : (
          (() => {
            const { listed, reg, adv } = result;
            const baseline = reg ?? listed!;
            const baselineLabel = reg != null ? "published regular price" : "everyday listed price";
            const gap = baseline - adv;
            const total = gap * months;
            const vsListed = listed! - adv;
            return (
              <>
                <p>
                  Against {row.name}&rsquo;s {baselineLabel} of <strong className="text-[#191919]">{usd(baseline)}/month</strong>, an advertised{" "}
                  <strong className="text-[#191919]">{usd(adv)}/month</strong> is{" "}
                  {gap > 0 ? (
                    <><strong className="text-emerald-700">{usd(gap)} a month less</strong>, or <strong className="text-emerald-700">{usd(total)} over {months} month{months === 1 ? "" : "s"}</strong> if the offer price held for the whole period.</>
                  ) : gap === 0 ? (
                    <strong className="text-amber-700">the same price. That is the everyday rate, not a holiday saving.</strong>
                  ) : (
                    <strong className="text-amber-700">{usd(-gap)} a month more than the price we have on record. Check the page: the figure may apply to a different dose, plan or molecule.</strong>
                  )}
                </p>
                {reg != null && vsListed !== gap && (
                  <p className="mt-2 text-[13px] text-gray-500">
                    Note: {row.name} already lists a promotional {usd(listed!)}/month in our index, so against that everyday promotion the advertised price is {vsListed > 0 ? `${usd(vsListed)} a month lower` : vsListed === 0 ? "identical" : `${usd(-vsListed)} a month higher`}.
                  </p>
                )}
                <p className="mt-2 text-[13px] text-gray-500">
                  Ask before you buy: does the offer price apply after month one, at higher doses, and without a prepaid plan? The{" "}
                  <Link href={row.reviewHref} className="font-semibold text-[#0C4B75] hover:underline">{row.name} review</Link> lists the plan terms we verified.
                </p>
              </>
            );
          })()
        )}
      </div>
      <p className="mt-3 text-[12.5px] leading-relaxed text-gray-500">
        Regular and listed prices are from our{" "}
        <Link href="/weight-loss/glp1-weight-loss-statistics" className="font-semibold text-[#0C4B75] hover:underline">verified price index</Link> ({verifiedOn}). The advertised price is whatever you type and is not stored or sent.
      </p>
    </div>
  );
}
