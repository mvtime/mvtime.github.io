/**
 * Shared Stats series helpers for personal and teacher chart views.
 * Filter value/scale/label match live StatsModal.vue (mood/stress/work/notes).
 * @file components/Portal/Stats/statSeries.ts
 */

export interface StatFilterData {
  value(row: Record<string, unknown>): Record<string, unknown>;
  scale(data: Record<string, unknown>): number;
  label(data: Record<string, unknown>): string;
}

export interface StatFilter {
  name: string;
  filter: string;
  data: StatFilterData;
}

export const HIDDEN_POINT = -1000;

export function rowTimestamp(row: { time?: number | null; date?: string } | null | undefined): number {
  if (!row) return 0;
  if (typeof row.time === "number" && !Number.isNaN(row.time)) return row.time;
  if (row.date) {
    const parsed = Date.parse(String(row.date));
    if (!Number.isNaN(parsed)) return parsed;
  }
  return 0;
}

function moodSentiment(row: Record<string, unknown>): string | number {
  const mood = row.mood;
  if (typeof mood === "number" && Number.isFinite(mood)) return mood;
  return typeof mood === "string" ? mood : "";
}

function workCount(row: Record<string, unknown>): number {
  const direct = row.upcoming_count;
  if (typeof direct === "number" && Number.isFinite(direct)) return direct;
  const avgUpcoming = row.avgUpcoming ?? row.avg_upcoming;
  if (typeof avgUpcoming === "number" && Number.isFinite(avgUpcoming)) return avgUpcoming;
  const avg = row.avg ?? row.upcoming_avg;
  if (typeof avg === "number" && Number.isFinite(avg)) return avg;
  const sum = row.sum ?? row.upcoming_sum;
  if (typeof sum === "number" && Number.isFinite(sum)) return sum;
  return 0;
}

export const MOOD_FILTER: StatFilter = {
  name: "Mood",
  filter: "mood",
  data: {
    value(survey) {
      return { sentiment: moodSentiment(survey) };
    },
    scale(data) {
      if (typeof data.sentiment === "number" && Number.isFinite(data.sentiment)) {
        if (data.sentiment >= 0 && data.sentiment <= 5) return data.sentiment;
        return HIDDEN_POINT;
      }
      const mapped = { positive: 3, neutral: 2, negative: 1 }[data.sentiment as string];
      if (!mapped) return HIDDEN_POINT;
      return (mapped - 1) * (5 / 2);
    },
    label(data) {
      if (typeof data.sentiment === "number" && Number.isFinite(data.sentiment)) {
        return String(data.sentiment);
      }
      if (!data.sentiment) return "Unknown";
      const text = String(data.sentiment);
      return text.charAt(0).toUpperCase() + text.slice(1);
    },
  },
};

export const STRESS_FILTER: StatFilter = {
  name: "Stress",
  filter: "stress",
  data: {
    value(survey) {
      return { sentiment: survey.stress ?? null };
    },
    scale(data) {
      if (data.sentiment == null || data.sentiment === "") return HIDDEN_POINT;
      const value = Number(data.sentiment);
      if (!Number.isFinite(value)) return HIDDEN_POINT;
      return ((value * 5) / 100 - 1) * (5 / 4);
    },
    label(data) {
      if (data.sentiment == null || data.sentiment === "") return "Unknown";
      const value = Number(data.sentiment);
      if (!Number.isFinite(value)) return "Unknown";
      return (value * 5) / 100 + "/5";
    },
  },
};

export const WORK_FILTER: StatFilter = {
  name: "Work",
  filter: "upcoming",
  data: {
    value(survey) {
      return { num: workCount(survey) };
    },
    scale(data) {
      return Math.min((data.num as number) || 0, 10) / 2;
    },
    label(data) {
      const num = (data.num as number) || 0;
      // Teacher class aggregates use avgUpcoming (may be fractional)
      if (typeof num === "number" && !Number.isInteger(num)) {
        return num.toFixed(1) + " avg";
      }
      return num + " tasks";
    },
  },
};

export const NOTES_FILTER: StatFilter = {
  name: "Notes",
  filter: "additional",
  data: {
    value(survey) {
      // Synthetic task-count-only days never have survey notes (#29)
      if (survey.task_count_only) return { input: "" };
      return { input: survey.notes || "" };
    },
    scale(data) {
      void data;
      return data.input ? -0.8 : HIDDEN_POINT;
    },
    label(data) {
      const input = typeof data.input === "string" ? data.input : "";
      return input ? (input.length > 20 ? `"${input.slice(0, 18)}...` : `"${input}"`) : "None";
    },
  },
};

/** Personal Stats filters — same four series as live StatsModal.vue */
export const PERSONAL_STAT_FILTERS: StatFilter[] = [MOOD_FILTER, STRESS_FILTER, WORK_FILTER, NOTES_FILTER];

/** Teacher Stats filters — class upcoming aggregates only (no mood/stress/notes from #29) */
export const TEACHER_STAT_FILTERS: StatFilter[] = [WORK_FILTER];

export interface StatGraphSeries {
  name: string;
  data: number[];
  labels: string[];
}

export function buildGraphs(
  rows: Record<string, unknown>[],
  filters: StatFilter[],
  active: string[]
): StatGraphSeries[] {
  return filters
    .filter((f) => active.includes(f.filter))
    .map((f) => ({
      name: f.name,
      data: rows.map((survey) => f.data.scale(f.data.value(survey))),
      labels: rows.map((survey) => f.data.label(f.data.value(survey))),
    }));
}

function hasMood(rows: Record<string, unknown>[]): boolean {
  return rows.some((row) => {
    const mood = row.mood;
    if (typeof mood === "string") return mood.length > 0;
    return typeof mood === "number" && Number.isFinite(mood);
  });
}

function hasStress(rows: Record<string, unknown>[]): boolean {
  return rows.some((row) => row.stress != null && row.stress !== "");
}

function hasWork(rows: Record<string, unknown>[]): boolean {
  return rows.some((row) => {
    if (typeof row.upcoming_count === "number" && Number.isFinite(row.upcoming_count)) return true;
    if (typeof row.avgUpcoming === "number" && Number.isFinite(row.avgUpcoming)) return true;
    if (typeof row.avg === "number" && Number.isFinite(row.avg)) return true;
    if (typeof row.sum === "number" && Number.isFinite(row.sum)) return true;
    return false;
  });
}

/**
 * Default active series: mood/stress when present, Work when that's the useful (or only) series.
 * Notes stay off by default (same as live personal Stats).
 */
export function defaultActiveFilters(rows: Record<string, unknown>[]): string[] {
  const active: string[] = [];
  if (hasMood(rows)) active.push("mood");
  if (hasStress(rows)) active.push("stress");
  if (hasWork(rows) || !active.length) active.push("upcoming");
  return active;
}

export function sortStatRows<T extends { time?: number | null; date?: string }>(rows: T[]): T[] {
  return rows.slice().sort((a, b) => rowTimestamp(a) - rowTimestamp(b));
}
