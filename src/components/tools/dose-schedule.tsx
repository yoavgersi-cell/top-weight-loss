"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

// ───── Labelled dose-escalation timeline ─────
// Maps the escalation schedules in the Wegovy and Zepbound prescribing
// information onto calendar dates from a start date the reader chooses.
// The steps, durations and maintenance doses are the label's; the only
// arithmetic is adding weeks to a date. The "slower ramp" option applies the
// label's own allowance to hold a step before increasing. No dose below the
// labelled starting dose and no interval shorter than the label's minimum
// appears here, and the prescriber sets the actual dose. Oct 27, 2026.

type Drug = "wegovy" | "zepbound";

const WEGOVY_STEPS = [
  { dose: "0.25 mg", weeks: 4, role: "Starting dose (weeks 1-4)" },
  { dose: "0.5 mg", weeks: 4, role: "Step 2 (weeks 5-8)" },
  { dose: "1 mg", weeks: 4, role: "Step 3 (weeks 9-12)" },
  { dose: "1.7 mg", weeks: 4, role: "Step 4 (weeks 13-16)" },
];

const ZEPBOUND_LADDER = [2.5, 5, 7.5, 10, 12.5, 15];

const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const addWeeks = (d: Date, w: number) => new Date(d.getTime() + w * 7 * 86400000);

export function DoseSchedule() {
  const today = new Date();
  const iso = `${today.getUTCFullYear()}-${String(today.getUTCMonth() + 1).padStart(2, "0")}-${String(today.getUTCDate()).padStart(2, "0")}`;
  const [drug, setDrug] = useState<Drug>("wegovy");
  const [start, setStart] = useState(iso);
  const [wegovyTarget, setWegovyTarget] = useState<"1.7" | "2.4">("2.4");
  const [zepTarget, setZepTarget] = useState<5 | 10 | 15>(10);
  const [slow, setSlow] = useState(false);

  const rows = useMemo(() => {
    const d0 = new Date(`${start}T00:00:00Z`);
    if (isNaN(d0.getTime())) return null;
    const hold = slow ? 4 : 0;
    const out: { dose: string; role: string; from: Date; to: Date | null; weeks: number | null }[] = [];
    let cursor = d0;
    if (drug === "wegovy") {
      for (const s of WEGOVY_STEPS) {
        const weeks = s.weeks + hold;
        out.push({ dose: s.dose, role: s.role, from: cursor, to: addWeeks(cursor, weeks), weeks });
        cursor = addWeeks(cursor, weeks);
      }
      out.push({ dose: `${wegovyTarget} mg`, role: "Maintenance dose (from week 17 at the label's pace)", from: cursor, to: null, weeks: null });
    } else {
      const steps = ZEPBOUND_LADDER.filter((d) => d <= zepTarget);
      steps.forEach((d, i) => {
        const isLast = i === steps.length - 1;
        const weeks = 4 + hold;
        out.push({
          dose: `${d} mg`,
          role: i === 0 ? "Starting dose, 4 weeks (not a maintenance dose)" : isLast ? "Maintenance dose" : `Step ${i + 1}, at least 4 weeks before the next increase`,
          from: cursor,
          to: isLast ? null : addWeeks(cursor, weeks),
          weeks: isLast ? null : weeks,
        });
        if (!isLast) cursor = addWeeks(cursor, weeks);
      });
    }
    return out;
  }, [drug, start, wegovyTarget, zepTarget, slow]);

  const label = "mb-1 block text-[12px] font-bold uppercase tracking-wide text-gray-500";
  const pill = (active: boolean) => `rounded-full px-4 py-1.5 text-[13px] font-bold ${active ? "bg-[#0C4B75] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`;
  const cell = "px-3 py-3 align-top text-[13.5px] [font-variant-numeric:tabular-nums]";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <span className={label}>Medication</span>
          <div className="flex gap-2">
            <button type="button" className={pill(drug === "wegovy")} aria-pressed={drug === "wegovy"} onClick={() => setDrug("wegovy")}>Wegovy (semaglutide)</button>
            <button type="button" className={pill(drug === "zepbound")} aria-pressed={drug === "zepbound"} onClick={() => setDrug("zepbound")}>Zepbound (tirzepatide)</button>
          </div>
        </div>
        <div>
          <label className={label} htmlFor="dose-start">First injection date</label>
          <input id="dose-start" type="date" value={start} onChange={(e) => setStart(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-[15px] text-[#191919] focus:border-[#0C4B75] focus:outline-none" />
        </div>
        <div>
          <span className={label}>Maintenance dose (label options)</span>
          <div className="flex flex-wrap gap-2">
            {drug === "wegovy"
              ? (["1.7", "2.4"] as const).map((t) => (
                  <button key={t} type="button" className={pill(wegovyTarget === t)} aria-pressed={wegovyTarget === t} onClick={() => setWegovyTarget(t)}>{t} mg</button>
                ))
              : ([5, 10, 15] as const).map((t) => (
                  <button key={t} type="button" className={pill(zepTarget === t)} aria-pressed={zepTarget === t} onClick={() => setZepTarget(t)}>{t} mg</button>
                ))}
          </div>
        </div>
      </div>
      <label className="mt-4 flex items-center gap-2 text-[14px] text-gray-700">
        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" checked={slow} onChange={(e) => setSlow(e.target.checked)} />
        Slower ramp: hold each step an extra 4 weeks (the label allows delaying an increase when a step is not tolerated)
      </label>

      {rows && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200" aria-live="polite">
          <table className="w-full min-w-[600px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-[#F7F8FA] text-[11.5px] font-bold uppercase tracking-wide text-gray-500">
                <th className={cell}>Dose</th>
                <th className={cell}>What the label calls it</th>
                <th className={cell}>From</th>
                <th className={cell}>Until</th>
                <th className={cell}>Weeks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((r, i) => (
                <tr key={i}>
                  <td className={`${cell} font-bold text-[#191919]`}>{r.dose}</td>
                  <td className={`${cell} text-gray-600`}>{r.role}</td>
                  <td className={cell}>{fmt(r.from)}</td>
                  <td className={cell}>{r.to ? fmt(new Date(r.to.getTime() - 86400000)) : "Ongoing, reviewed with your prescriber"}</td>
                  <td className={cell}>{r.weeks ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-3 text-[12.5px] leading-relaxed text-gray-500">
        {drug === "wegovy"
          ? "Wegovy's label escalates every 4 weeks from 0.25 mg to a maintenance dose of 1.7 mg or 2.4 mg from week 17, and allows holding a step for 4 more weeks if it is not tolerated. Wegovy HD (7.2 mg) is a separate product for adults who have tolerated 2.4 mg for at least 4 weeks and is not mapped here."
          : "Zepbound's label starts at 2.5 mg for 4 weeks, which it states is for initiation and not a maintenance dose, then 5 mg, then increases of 2.5 mg after at least 4 weeks on each dose; the recommended maintenance doses are 5, 10 or 15 mg. This table shows the fastest path the label allows to the maintenance dose you chose; many people stay longer on intermediate doses."}{" "}
        The dates are the label&rsquo;s minimum intervals counted from your start date. Your prescriber sets the actual dose and timing, and may stop, hold or lower it; see our{" "}
        <Link href="/weight-loss/articles/glp1-microdosing-complete-guide" className="font-semibold text-[#0C4B75] hover:underline">guide to lower doses and microdosing</Link> for what the label allows below a full dose. Nothing you enter is stored or sent.
      </p>
    </div>
  );
}
