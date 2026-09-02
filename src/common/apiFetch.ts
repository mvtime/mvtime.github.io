/**
 * Authenticated fetch against the brand Express API using a Firebase ID token.
 * @file common/apiFetch.ts
 */

import { auth } from "@/firebase";

const API_BASE = `https://${process.env.VUE_APP_BRAND_DOMAIN__API}`;

export interface ApiFetchOptions {
  method?: string;
  body?: unknown;
}

export class ApiFetchError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiFetchError";
    this.status = status;
  }
}

/** Slim row in GET /api/v1/me/stats list (mvtt-server#29). */
export interface StatRow {
  date: string;
  mood?: "positive" | "neutral" | "negative" | string | null;
  stress?: number | null;
  upcoming_count?: number | null;
  notes?: string | null;
  time?: number | null;
  /** True for synthetic nightly count-only days (no real check-in). */
  task_count_only?: boolean;
  error?: string;
}

/** GET /api/v1/me/stats envelope (dates = done_surveys ∪ task_count_dates). */
export interface StatsResponse {
  timestamp: number;
  num: number;
  list: StatRow[];
  rebuilt?: boolean;
}

/**
 * One day of class aggregates from GET /api/v1/me/teacher-stats?classId=
 * (or /api/v1/classes/:classId/stats). Chart-oriented — no notes / survey text.
 */
export interface TeacherStatDay {
  date: string;
  classId: string;
  /** Class-scoped average upcoming count (from avgUpcoming). */
  upcoming_count: number | null;
  studentCount?: number | null;
  time: number | null;
}

/** Multi-day teacher stats API payload; single-day queries may return TeacherStatDay directly. */
export interface TeacherClassStatsResponse {
  classId: string;
  num: number;
  list: TeacherStatDay[];
}

/** Client-assembled teacher Stats UI model (one entry per manageable class). */
export interface TeacherClassStats {
  classId: string;
  name: string;
  num?: number;
  list: TeacherStatDay[];
}

export interface TeacherStatsResponse {
  timestamp?: number;
  classes: TeacherClassStats[];
  unavailable?: boolean;
}

async function errorMessage(response: Response): Promise<string> {
  let message = `API request failed (${response.status})`;
  try {
    const body = await response.json();
    if (body?.error) message = String(body.error);
    else if (body?.message) message = String(body.message);
  } catch {
    try {
      const text = await response.text();
      if (text) message = text;
    } catch {
      /* ignore */
    }
  }
  return message;
}

/**
 * Call the Express API with the signed-in user's Firebase ID token.
 * Never sends or accepts API_KEY.
 * 204 → undefined (callers treat as empty envelope).
 */
export async function apiFetch<T = unknown>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const user = auth.currentUser;
  if (!user) throw new Error("Not signed in");

  const token = await user.getIdToken();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_BASE}${normalizedPath}`;

  const init: RequestInit = {
    method: options.method || "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  if (options.body !== undefined) {
    init.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, init);
  if (!response.ok) {
    throw new ApiFetchError(await errorMessage(response), response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

function firstFiniteNumber(...vals: unknown[]): number | null {
  for (const value of vals) {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim() !== "") {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
  }
  return null;
}

function rowTime(raw: Record<string, unknown>, date: string): number | null {
  if (typeof raw.time === "number" && Number.isFinite(raw.time)) return raw.time;
  if (date) {
    const parsed = Date.parse(date);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return null;
}

function normalizeStatRow(raw: unknown): StatRow | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  const date = typeof row.date === "string" ? row.date : "";
  if (!date) return null;

  const mood =
    typeof row.mood === "string" || row.mood === null ? (row.mood as string | null) : null;
  const stress = firstFiniteNumber(row.stress);
  const upcoming_count = firstFiniteNumber(row.upcoming_count, row.upcomingCount);
  const notes =
    typeof row.notes === "string" && row.notes
      ? row.notes
      : row.notes === null
        ? null
        : null;
  const task_count_only = row.task_count_only === true || row.taskCountOnly === true;

  return {
    date,
    mood,
    stress,
    upcoming_count,
    // Never surface notes on synthetic count-only days
    notes: task_count_only ? null : notes,
    time: rowTime(row, date),
    task_count_only,
  };
}

/** Parse GET /api/v1/me/stats envelope; 204/undefined → empty list (not an error). */
export function parseStatsResponse(payload: unknown): StatsResponse {
  if (!payload || typeof payload !== "object") {
    return { timestamp: Date.now(), num: 0, list: [], rebuilt: false };
  }
  const body = payload as Record<string, unknown>;
  if (!Array.isArray(body.list)) {
    return { timestamp: Date.now(), num: 0, list: [], rebuilt: false };
  }
  const list = body.list.map(normalizeStatRow).filter((row): row is StatRow => !!row);
  return {
    timestamp: typeof body.timestamp === "number" ? body.timestamp : Date.now(),
    num: typeof body.num === "number" ? body.num : list.length,
    list,
    rebuilt: body.rebuilt === true,
  };
}

/**
 * Normalize one teacher day aggregate. Maps avgUpcoming → upcoming_count for shared Work series.
 * Drops students[] / free text — aggregates only.
 */
export function normalizeTeacherDay(raw: unknown, fallbackClassId = ""): TeacherStatDay | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  const date = typeof row.date === "string" ? row.date : typeof row.day === "string" ? row.day : "";
  if (!date) return null;

  const classId = String(row.classId || row.class_id || fallbackClassId || "");
  const upcoming_count = firstFiniteNumber(
    row.avgUpcoming,
    row.avg_upcoming,
    row.upcoming_count,
    row.upcomingCount,
    row.avg,
    row.average,
    row.sum
  );
  const studentCount = firstFiniteNumber(row.studentCount, row.student_count);

  return {
    date,
    classId,
    upcoming_count,
    studentCount,
    time: rowTime(row, date),
  };
}

/**
 * Parse one class's teacher-stats response (multi-day envelope or single-day object).
 * Matches mvtt-server#29 — not a bulk `{ classes: [] }` payload.
 */
export function parseTeacherClassStatsResponse(
  payload: unknown,
  fallbackClassId: string
): TeacherClassStatsResponse {
  if (!payload || typeof payload !== "object") {
    return { classId: fallbackClassId, num: 0, list: [] };
  }
  const body = payload as Record<string, unknown>;

  // Multi-day: { classId, num, list: [...] }
  if (Array.isArray(body.list)) {
    const classId = String(body.classId || body.class_id || fallbackClassId);
    const list = body.list
      .map((day) => normalizeTeacherDay(day, classId))
      .filter((day): day is TeacherStatDay => !!day);
    return {
      classId,
      num: typeof body.num === "number" ? body.num : list.length,
      list,
    };
  }

  // Single-day object: { date, classId, avgUpcoming, ... }
  if (typeof body.date === "string") {
    const day = normalizeTeacherDay(body, fallbackClassId);
    const classId = day?.classId || fallbackClassId;
    return { classId, num: day ? 1 : 0, list: day ? [day] : [] };
  }

  return { classId: fallbackClassId, num: 0, list: [] };
}

/** @deprecated Use parseTeacherClassStatsResponse — bulk `{ classes }` is not the #29 contract. */
export function parseTeacherStatsResponse(payload: unknown): TeacherStatsResponse {
  if (!payload || typeof payload !== "object") {
    return { timestamp: Date.now(), classes: [] };
  }
  const body = payload as Record<string, unknown>;
  // If a future bulk shape appears, accept it; otherwise empty.
  if (Array.isArray(body.classes)) {
    const classes = body.classes
      .map((raw) => {
        if (!raw || typeof raw !== "object") return null;
        const cls = raw as Record<string, unknown>;
        const classId = String(cls.classId || cls.class_id || "");
        if (!classId) return null;
        const parsed = parseTeacherClassStatsResponse(cls, classId);
        return {
          classId: parsed.classId,
          name: typeof cls.name === "string" ? cls.name : "",
          num: parsed.num,
          list: parsed.list,
        } as TeacherClassStats;
      })
      .filter((cls): cls is TeacherClassStats => !!cls);
    return {
      timestamp: typeof body.timestamp === "number" ? body.timestamp : Date.now(),
      classes,
    };
  }
  return { timestamp: Date.now(), classes: [] };
}

export function isMissingStatsEndpoint(err: unknown): boolean {
  return err instanceof ApiFetchError && (err.status === 404 || err.status === 405 || err.status === 501);
}

/** YYYY-MM-DD in local timezone. */
export function localYmd(date: Date = new Date()): string {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

/** Inclusive default teacher stats window (last `dayCount` days through today). */
export function defaultTeacherStatsRange(dayCount = 30): { from: string; to: string } {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - Math.max(dayCount - 1, 0));
  return { from: localYmd(from), to: localYmd(to) };
}

/** Run async work over items with a fixed concurrency limit. */
export async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  if (!items.length) return [];
  const results: R[] = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(Math.max(limit, 1), items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}
