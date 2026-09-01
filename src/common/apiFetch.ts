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

/** Slim row returned by GET /api/v1/me/stats */
export interface StatRow {
  date: string;
  mood?: string;
  stress?: number;
  upcoming_count?: number;
  notes?: string;
  time?: number;
  error?: string;
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

/** Normalize stats API payloads (bare array or { data | rows | stats }). */
export function normalizeStatRows(payload: unknown): StatRow[] {
  if (Array.isArray(payload)) return payload as StatRow[];
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    for (const key of ["data", "rows", "stats"]) {
      if (Array.isArray(obj[key])) return obj[key] as StatRow[];
    }
  }
  return [];
}
