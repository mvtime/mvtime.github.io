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

/** Slim row in GET /api/v1/me/stats list (survey fields may be null on task-count-only days) */
export interface StatRow {
  date: string;
  mood?: "positive" | "neutral" | "negative" | string | null;
  stress?: number | null;
  upcoming_count?: number | null;
  notes?: string | null;
  time?: number | null;
  error?: string;
}

/** GET /api/v1/me/stats response envelope (mvtt-server#27, extended with snapshot-shaped upcoming_count) */
export interface StatsResponse {
  timestamp: number;
  num: number;
  list: StatRow[];
  rebuilt: boolean;
}

/** Aggregate row in GET /api/v1/me/teacher-stats (no notes / free text) */
export interface TeacherStatRow {
  date: string;
  mood?: "positive" | "neutral" | "negative" | string | number | null;
  stress?: number | null;
  upcoming_count?: number | null;
  time?: number | null;
}

export interface TeacherClassStats {
  classId: string;
  name: string;
  list: TeacherStatRow[];
}

/** GET /api/v1/me/teacher-stats envelope (provisional until server P0 lands) */
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

/** Parse GET /api/v1/me/stats envelope; returns empty list if shape is unexpected. */
export function parseStatsResponse(payload: unknown): StatsResponse {
  if (payload && typeof payload === "object" && Array.isArray((payload as StatsResponse).list)) {
    return payload as StatsResponse;
  }
  return { timestamp: Date.now(), num: 0, list: [], rebuilt: false };
}

function normalizeTeacherRow(raw: unknown): TeacherStatRow | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  const date = typeof row.date === "string" ? row.date : typeof row.day === "string" ? row.day : "";
  if (!date) return null;

  const nested =
    row.upcoming && typeof row.upcoming === "object" ? (row.upcoming as Record<string, unknown>) : null;

  const upcoming_count = firstFiniteNumber(
    row.upcoming_count,
    row.upcomingCount,
    row.avg,
    row.average,
    row.upcoming_avg,
    row.sum,
    row.upcoming_sum,
    nested?.count,
    nested?.avg,
    nested?.sum
  );

  const stress = firstFiniteNumber(row.stress, row.stress_avg, row.avg_stress);

  let mood: TeacherStatRow["mood"] = null;
  if (typeof row.mood === "string" || typeof row.mood === "number") mood = row.mood;
  else if (typeof row.mood_avg === "number") mood = row.mood_avg;

  return {
    date,
    mood,
    stress,
    upcoming_count,
    time: rowTime(row, date),
  };
}

function normalizeTeacherClass(raw: unknown): TeacherClassStats | null {
  if (!raw || typeof raw !== "object") return null;
  const cls = raw as Record<string, unknown>;
  const classId = cls.classId || cls.class_id || cls.id;
  if (classId == null || classId === "") return null;

  const listSource = Array.isArray(cls.list) ? cls.list : Array.isArray(cls.rows) ? cls.rows : [];
  const list = listSource.map(normalizeTeacherRow).filter((row): row is TeacherStatRow => !!row);

  const name =
    (typeof cls.name === "string" && cls.name) ||
    (typeof cls.class_name === "string" && cls.class_name) ||
    (typeof cls.className === "string" && cls.className) ||
    "";

  return { classId: String(classId), name, list };
}

/** Parse GET /api/v1/me/teacher-stats; never passes through notes/free text. Empty on unexpected shape. */
export function parseTeacherStatsResponse(payload: unknown): TeacherStatsResponse {
  if (!payload || typeof payload !== "object") {
    return { timestamp: Date.now(), classes: [] };
  }
  const body = payload as Record<string, unknown>;
  let source: unknown[] | null = Array.isArray(body.classes) ? body.classes : null;
  if (!source && Array.isArray(body.list) && body.list.length) {
    const first = body.list[0];
    if (first && typeof first === "object" && ("classId" in first || "class_id" in first)) {
      source = body.list;
    }
  }

  if (!source) {
    return { timestamp: typeof body.timestamp === "number" ? body.timestamp : Date.now(), classes: [] };
  }

  const classes = source.map(normalizeTeacherClass).filter((cls): cls is TeacherClassStats => !!cls);
  return {
    timestamp: typeof body.timestamp === "number" ? body.timestamp : Date.now(),
    classes,
  };
}

export function isMissingStatsEndpoint(err: unknown): boolean {
  return err instanceof ApiFetchError && (err.status === 404 || err.status === 405 || err.status === 501);
}
