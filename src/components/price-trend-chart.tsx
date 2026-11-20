// Inline-SVG price charts for the GLP-1 Price Tracker. Server-rendered, no
// chart library. Everything is derived from the price log passed in; no figure
// is typed here. Both charts are step lines: a listed price holds until the
// next logged change, so the line never implies prices in between.

import type { PriceChange } from "@/lib/price-index";

const NAVY = "#0C4B75";
const GRID = "#E5E7EB";
const AXIS = "#6B7280";
const DAY = 86_400_000;

export type TrendPoint = { t: number; v: number };

const ms = (iso: string) => Date.parse(`${iso}T00:00:00Z`);
const fmtDay = (t: number) =>
  new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const fmtDayYear = (t: number) =>
  new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const money = (n: number) => `$${Number.isInteger(n) ? n.toLocaleString("en-US") : n.toFixed(2)}`;


/**
 * Lowest listed monthly compounded semaglutide price over time.
 * Only providers that list a semaglutide price today are counted (`current`).
 * A provider's price at a date is its last logged move on or before it; before
 * its first logged move it is the move's "from" price (absent if newly listed),
 * and a provider with no logged semaglutide move is held at its current price.
 */
export function buildCheapestSeries(changelog: PriceChange[], current: Map<string, number>, endIso: string) {
  const moves = new Map<string, { t: number; from: number | null; to: number }[]>();
  for (const e of [...changelog].sort((a, b) => a.date.localeCompare(b.date))) {
    if (!current.has(e.providerId)) continue;
    for (const m of e.moves ?? []) {
      if (m.drug !== "semaglutide") continue;
      const list = moves.get(e.providerId) ?? [];
      list.push({ t: ms(e.date), from: m.from, to: m.to });
      moves.set(e.providerId, list);
    }
  }
  const dates = [...new Set([...moves.values()].flatMap((l) => l.map((x) => x.t)))].sort((a, b) => a - b);
  if (dates.length === 0) return null;
  const at = (t: number | "before") => {
    const vals: number[] = [];
    for (const [id, cur] of current) {
      const l = moves.get(id);
      if (!l) { vals.push(cur); continue; }
      if (t === "before") { if (l[0].from !== null) vals.push(l[0].from); continue; }
      const past = l.filter((x) => x.t <= t);
      if (past.length) vals.push(past[past.length - 1].to);
      else if (l[0].from !== null) vals.push(l[0].from);
    }
    return vals.length ? { v: Math.min(...vals), n: vals.length } : null;
  };
  const start = at("before");
  const pts: (TrendPoint & { n: number })[] = [];
  if (start) pts.push({ t: dates[0] - 7 * DAY, ...start });
  for (const t of dates) { const a = at(t); if (a) pts.push({ t, ...a }); }
  return { points: pts, startT: dates[0] - 7 * DAY, endT: ms(endIso), firstChange: dates[0] };
}

function niceStep(range: number) {
  for (const s of [5, 10, 20, 25, 50, 100]) if (range / s <= 4) return s;
  return 100;
}

function stepPath(pts: TrendPoint[], x: (t: number) => number, y: (v: number) => number, endT: number) {
  let d = `M${x(pts[0].t).toFixed(1)},${y(pts[0].v).toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) d += `H${x(pts[i].t).toFixed(1)}V${y(pts[i].v).toFixed(1)}`;
  return d + `H${x(endT).toFixed(1)}`;
}

function TrendSvg({
  series, w, h, font, className, id,
}: {
  series: NonNullable<ReturnType<typeof buildCheapestSeries>>;
  w: number; h: number; font: number; className: string; id: string;
}) {
  const { points, startT } = series;
  const endT = series.endT + 6 * DAY; // room after the last change so the final step is drawn
  const m = { l: font * 3.6, r: font * 1.6, t: font * 2.4, b: font * 2.6 };
  const vals = points.map((p) => p.v);
  // Keep a minimum vertical span so a $1 shift in the line is not drawn as a cliff.
  const MIN_SPAN = 60;
  const mid = (Math.max(...vals) + Math.min(...vals)) / 2;
  const spanVals = [Math.min(Math.min(...vals), mid - MIN_SPAN / 2), Math.max(Math.max(...vals), mid + MIN_SPAN / 2)];
  const step = niceStep(spanVals[1] - spanVals[0]);
  const lo = Math.max(0, Math.floor(spanVals[0] / step) * step);
  const hi = Math.ceil(spanVals[1] / step) * step;
  const x = (t: number) => m.l + ((t - startT) / (endT - startT)) * (w - m.l - m.r);
  const y = (v: number) => m.t + (1 - (v - lo) / (hi - lo)) * (h - m.t - m.b);
  const yTicks: number[] = [];
  for (let v = lo; v <= hi; v += step) yTicks.push(v);
  const xTicks: { t: number; anchor: "start" | "middle" | "end" }[] = [{ t: series.firstChange, anchor: "start" }];
  const d0 = new Date(startT);
  for (let mo = d0.getUTCMonth() + 1; ; mo++) {
    const t = Date.UTC(d0.getUTCFullYear(), mo, 1);
    if (t >= series.endT - 10 * DAY) break;
    if (t > series.firstChange + 10 * DAY) xTicks.push({ t, anchor: "middle" });
  }
  xTicks.push({ t: series.endT, anchor: "end" });
  const last = points[points.length - 1];
  const first = points[0];
  const label = `Lowest listed monthly compounded semaglutide price, ${fmtDayYear(series.firstChange)} to ${fmtDayYear(series.endT)}: ${money(first.v)} before the first logged change, ${money(last.v)} now.`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" role="img" aria-labelledby={`${id}-t ${id}-d`} className={className} style={{ fontFamily: "inherit" }}>
      <title id={`${id}-t`}>Lowest compounded semaglutide price over time</title>
      <desc id={`${id}-d`}>{label}</desc>
      {yTicks.map((v) => (
        <g key={v}>
          <line x1={m.l} x2={w - m.r} y1={y(v)} y2={y(v)} stroke={GRID} strokeWidth={1} />
          <text x={m.l - 8} y={y(v)} textAnchor="end" dominantBaseline="middle" fontSize={font} fill={AXIS}>{money(v)}</text>
        </g>
      ))}
      {xTicks.map((k) => (
        <g key={k.t}>
          <line x1={x(k.t)} x2={x(k.t)} y1={h - m.b} y2={h - m.b + 4} stroke={AXIS} strokeWidth={1} />
          <text x={x(k.t)} y={h - m.b + font + 7} textAnchor={k.anchor} fontSize={font} fill={AXIS}>{fmtDay(k.t)}</text>
        </g>
      ))}
      <path d={stepPath(points, x, y, endT)} fill="none" stroke={NAVY} strokeWidth={font * 0.2} strokeLinejoin="round" />
      {points.slice(1, -1).map((p) => (
        <circle key={p.t} cx={x(p.t)} cy={y(p.v)} r={font * 0.28} fill="#fff" stroke={NAVY} strokeWidth={font * 0.14} />
      ))}
      <circle cx={x(last.t)} cy={y(last.v)} r={font * 0.42} fill={NAVY} />
      <text x={x(last.t) + font * 0.5} y={y(last.v) + font * 1.7} textAnchor="end" fontSize={font * 1.15} fontWeight={700} fill="#191919">
        Now {money(last.v)}
      </text>
    </svg>
  );
}

/** Hero chart: lowest listed monthly compounded semaglutide price over time. */
export function MarketTrendChart({
  series, providerCountNow, saleNote,
}: {
  series: NonNullable<ReturnType<typeof buildCheapestSeries>>;
  providerCountNow: number;
  saleNote?: string;
}) {
  const { points, endT, firstChange } = series;
  const last = points[points.length - 1];
  const changes = points.slice(1);
  return (
    <figure className="mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <figcaption className="mb-3 text-[14px] leading-snug text-gray-600">
        <strong className="text-[#191919]">Lowest listed monthly price, compounded semaglutide.</strong>{" "}
        The lowest listed price across the {providerCountNow} providers that list one today, {fmtDayYear(firstChange)} to {fmtDayYear(endT)}{saleNote ? `; ${saleNote}` : ""}. A price holds until its next logged change, and providers count from the date they were listed.
      </figcaption>
      <TrendSvg series={series} w={360} h={250} font={12.5} id="trend-n" className="block h-auto w-full sm:hidden" />
      <TrendSvg series={series} w={820} h={320} font={13} id="trend-w" className="hidden h-auto w-full sm:block" />
      <p className="mt-3 text-[12.5px] leading-relaxed text-gray-500 [font-variant-numeric:tabular-nums]">
        Lowest by date:{" "}
        {points.map((p, i) => (
          <span key={p.t}>
            {i > 0 && " → "}
            <strong className="text-gray-700">{money(p.v)}</strong> {i === 0 ? "before the first change" : fmtDay(p.t)}
          </span>
        ))}
        . Now {money(last.v)}.
      </p>
    </figure>
  );
}

export type SparkPoint = { price: number; date: string | null };

/** Small step-line of one provider's listed price for one medication. */
export function PriceSparkline({
  points, startIso, endIso, title, id,
}: {
  points: SparkPoint[]; startIso: string; endIso: string; title: string; id: string;
}) {
  const w = 170, h = 52, padL = 8, padR = 52, padY = 10;
  const t0 = ms(startIso) - 7 * DAY, t1 = ms(endIso);
  const pts = points.map((p) => ({ t: p.date ? ms(p.date) : t0, v: p.price }));
  const lo = Math.min(...pts.map((p) => p.v)), hi = Math.max(...pts.map((p) => p.v));
  const x = (t: number) => padL + ((t - t0) / (t1 - t0)) * (w - padL - padR);
  const y = (v: number) => (hi === lo ? h / 2 : padY + (1 - (v - lo) / (hi - lo)) * (h - 2 * padY));
  const last = pts[pts.length - 1];
  const first = pts[0];
  const desc = `${title}: ${points.map((p) => `${money(p.price)}${p.date ? ` on ${fmtDayYear(ms(p.date))}` : " before"}`).join(", then ")}. Latest ${money(last.v)}.`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" role="img" aria-labelledby={`${id}-t ${id}-d`} className="block h-auto w-full max-w-[200px]">
      <title id={`${id}-t`}>{title} price over time</title>
      <desc id={`${id}-d`}>{desc}</desc>
      <line x1={padL} x2={x(t1)} y1={h - 2} y2={h - 2} stroke={GRID} strokeWidth={1} />
      <path d={stepPath(pts, x, y, t1)} fill="none" stroke={NAVY} strokeWidth={2} strokeLinejoin="round" />
      {pts.length > 1 && <circle cx={x(first.t)} cy={y(first.v)} r={2.5} fill="#fff" stroke={NAVY} strokeWidth={1.5} />}
      <circle cx={x(t1)} cy={y(last.v)} r={3.5} fill={NAVY} />
      <text x={x(t1) + 8} y={y(last.v)} dominantBaseline="middle" fontSize={14} fontWeight={700} fill="#191919">{money(last.v)}</text>
    </svg>
  );
}
