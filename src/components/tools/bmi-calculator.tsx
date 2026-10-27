"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

// ───── BMI and GLP-1 eligibility check ─────
// Pure client-side arithmetic. BMI = kg / m^2. The eligibility statement
// applies the criteria in the Wegovy and Zepbound prescribing information for
// adults: BMI 30 or more, or 27 or more with at least one weight-related
// condition. The four conditions listed are the ones our eligibility guide
// names from the labels. Nothing is stored or sent anywhere. Oct 27, 2026.

type Units = "imperial" | "metric";

const CONDITIONS = [
  { id: "t2d", label: "Type 2 diabetes" },
  { id: "htn", label: "High blood pressure" },
  { id: "chol", label: "High cholesterol" },
  { id: "osa", label: "Obstructive sleep apnea" },
];

function category(bmi: number): { label: string; tone: string } {
  if (bmi < 18.5) return { label: "Underweight (below 18.5)", tone: "text-sky-700" };
  if (bmi < 25) return { label: "Healthy weight range (18.5 to 24.9)", tone: "text-emerald-700" };
  if (bmi < 30) return { label: "Overweight (25 to 29.9)", tone: "text-amber-700" };
  if (bmi < 35) return { label: "Obesity, class 1 (30 to 34.9)", tone: "text-orange-700" };
  if (bmi < 40) return { label: "Obesity, class 2 (35 to 39.9)", tone: "text-orange-800" };
  return { label: "Obesity, class 3 (40 and above)", tone: "text-red-700" };
}

export function BmiCalculator() {
  const [units, setUnits] = useState<Units>("imperial");
  const [feet, setFeet] = useState("5");
  const [inches, setInches] = useState("8");
  const [pounds, setPounds] = useState("");
  const [cm, setCm] = useState("");
  const [kg, setKg] = useState("");
  const [conds, setConds] = useState<Record<string, boolean>>({});

  const result = useMemo(() => {
    let meters = 0;
    let kilos = 0;
    if (units === "imperial") {
      const totalIn = (parseFloat(feet) || 0) * 12 + (parseFloat(inches) || 0);
      meters = totalIn * 0.0254;
      kilos = (parseFloat(pounds) || 0) * 0.45359237;
    } else {
      meters = (parseFloat(cm) || 0) / 100;
      kilos = parseFloat(kg) || 0;
    }
    if (meters <= 0.5 || meters > 2.72 || kilos <= 20 || kilos > 500) return null;
    const bmi = kilos / (meters * meters);
    const condCount = Object.values(conds).filter(Boolean).length;
    let verdict: { heading: string; body: string; tone: string };
    if (bmi >= 30) {
      verdict = {
        heading: "Meets the BMI criterion on its own",
        body: "The Wegovy and Zepbound labels list a BMI of 30 or more as a criterion for adults, with no weight-related condition required. A licensed clinician still has to confirm there is no contraindication.",
        tone: "border-emerald-200 bg-emerald-50/60",
      };
    } else if (bmi >= 27 && condCount > 0) {
      verdict = {
        heading: "Meets the BMI criterion with a weight-related condition",
        body: `The labels list a BMI of 27 or more with at least one weight-related condition. You ticked ${condCount}; a clinician will need it documented, and will check for contraindications.`,
        tone: "border-emerald-200 bg-emerald-50/60",
      };
    } else if (bmi >= 27) {
      verdict = {
        heading: "Between 27 and 29.9: a weight-related condition is needed",
        body: "At this BMI the labels require at least one weight-related condition such as type 2 diabetes, high blood pressure, high cholesterol or sleep apnea. If you have one that is not in the list above, a clinician can still document it.",
        tone: "border-amber-200 bg-amber-50/60",
      };
    } else {
      verdict = {
        heading: "Below the label criteria for GLP-1 weight-loss medication",
        body: "Wegovy and Zepbound are approved for adults with a BMI of 30 or more, or 27 or more with a weight-related condition. A BMI below 27 does not meet those criteria, and a legitimate telehealth provider would be expected to decline.",
        tone: "border-gray-200 bg-gray-50",
      };
    }
    return { bmi, cat: category(bmi), verdict, kilos, meters };
  }, [units, feet, inches, pounds, cm, kg, conds]);

  const input = "w-full rounded-lg border border-gray-300 px-3 py-2 text-[15px] text-[#191919] focus:border-[#0C4B75] focus:outline-none";
  const label = "mb-1 block text-[12px] font-bold uppercase tracking-wide text-gray-500";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex gap-2">
        {(["imperial", "metric"] as Units[]).map((u) => (
          <button
            key={u}
            type="button"
            onClick={() => setUnits(u)}
            className={`rounded-full px-4 py-1.5 text-[13px] font-bold ${units === u ? "bg-[#0C4B75] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            aria-pressed={units === u}
          >
            {u === "imperial" ? "ft / in and lb" : "cm and kg"}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {units === "imperial" ? (
          <>
            <div>
              <label className={label} htmlFor="bmi-feet">Height (feet)</label>
              <input id="bmi-feet" inputMode="numeric" className={input} value={feet} onChange={(e) => setFeet(e.target.value)} />
            </div>
            <div>
              <label className={label} htmlFor="bmi-inches">Height (inches)</label>
              <input id="bmi-inches" inputMode="numeric" className={input} value={inches} onChange={(e) => setInches(e.target.value)} />
            </div>
            <div>
              <label className={label} htmlFor="bmi-pounds">Weight (lb)</label>
              <input id="bmi-pounds" inputMode="decimal" className={input} value={pounds} onChange={(e) => setPounds(e.target.value)} placeholder="e.g. 210" />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className={label} htmlFor="bmi-cm">Height (cm)</label>
              <input id="bmi-cm" inputMode="numeric" className={input} value={cm} onChange={(e) => setCm(e.target.value)} placeholder="e.g. 172" />
            </div>
            <div>
              <label className={label} htmlFor="bmi-kg">Weight (kg)</label>
              <input id="bmi-kg" inputMode="decimal" className={input} value={kg} onChange={(e) => setKg(e.target.value)} placeholder="e.g. 95" />
            </div>
          </>
        )}
      </div>
      <fieldset className="mt-5">
        <legend className={label}>Weight-related conditions diagnosed by a clinician (optional)</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {CONDITIONS.map((c) => (
            <label key={c.id} className="flex items-center gap-2 text-[14px] text-gray-700">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                checked={!!conds[c.id]}
                onChange={(e) => setConds({ ...conds, [c.id]: e.target.checked })}
              />
              {c.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6" aria-live="polite">
        {result ? (
          <>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="text-[13px] font-bold uppercase tracking-wide text-gray-500">Your BMI</span>
              <span className="text-[40px] font-extrabold leading-none text-[#191919] [font-variant-numeric:tabular-nums]">{result.bmi.toFixed(1)}</span>
              <span className={`text-[15px] font-semibold ${result.cat.tone}`}>{result.cat.label}</span>
            </div>
            <div className={`mt-4 rounded-xl border p-4 ${result.verdict.tone}`}>
              <p className="text-[15px] font-bold text-[#191919]">{result.verdict.heading}</p>
              <p className="mt-1 text-[14px] leading-[1.7] text-gray-700">{result.verdict.body}</p>
            </div>
            <p className="mt-3 text-[12.5px] leading-relaxed text-gray-500">
              For reference, at your height a BMI of 25 is about {Math.round(25 * result.meters * result.meters * (units === "imperial" ? 2.20462 : 1))} {units === "imperial" ? "lb" : "kg"} and a BMI of 30 is about{" "}
              {Math.round(30 * result.meters * result.meters * (units === "imperial" ? 2.20462 : 1))} {units === "imperial" ? "lb" : "kg"}. BMI does not distinguish muscle from fat and is a screening number, not a diagnosis.
            </p>
          </>
        ) : (
          <p className="text-[14px] text-gray-500">Enter your height and weight to see your BMI and how it maps to the label criteria.</p>
        )}
      </div>
      <p className="mt-5 border-t border-gray-100 pt-4 text-[12.5px] leading-relaxed text-gray-500">
        Criteria are from the FDA prescribing information for Wegovy and Zepbound for adults, as set out in our{" "}
        <Link href="/weight-loss/articles/who-qualifies-for-glp1-weight-loss" className="font-semibold text-[#0C4B75] hover:underline">eligibility guide</Link>, which also lists the contraindications (a personal or family history of medullary thyroid carcinoma or MEN 2, pancreatitis history, pregnancy and others) that this tool does not check. Meeting the BMI criterion is not a prescription: a licensed clinician decides. Nothing you enter here is stored or sent.
      </p>
    </div>
  );
}
