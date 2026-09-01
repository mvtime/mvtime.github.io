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

/** Slim row in GET /api/v1/me/stats list */
export interface StatRow {
  date: string;
  mood: "positive" | "neutral" | "negative" | null;
  stress: number;
  upcoming_count: number;
  notes: string;
  time: number;
  error?: string;
}

/** GET /api/v1/me/stats response envelope (mvtt-server#27) */
export interface StatsResponse {
  timestamp: number;
  num: number;
  list: StatRow[];
  rebuilt: boolean;
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
    throw new Error(await errorMessage(response));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

/** Parse GET /api/v1/me/stats envelope; returns empty list if shape is unexpected. */
export function parseStatsResponse(payload: unknown): StatsResponse {
  if (payload && typeof payload === "object" && Array.isArray((payload as StatsResponse).list)) {
    return payload as StatsResponse;
  }
  return { timestamp: Date.now(), num: 0, list: [], rebuilt: false };
}
