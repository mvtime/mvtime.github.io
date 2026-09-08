/**
 * Personal task state API — PATCH /api/v1/me/tasks/:taskPath (completed, note).
 * Falls back to done/undo shims; stubs locally when routes 404 mid-dev.
 *
 * @module common/meTasks
 */

import { ApiFetchError, apiFetch } from "@/common/apiFetch";
import { applyMeTaskState, type MeTaskState } from "@/common/meTaskState";
import { flatTaskPath } from "@/common/paths";

export type { MeTaskState };
export { applyMeTaskState, meTaskStateFromBoardTask } from "@/common/meTaskState";

export interface PatchMeTaskBody {
  completed?: boolean;
  note?: string | null;
}

const stubStates = new Map<string, MeTaskState>();

function encodeTaskPath(taskPath: string): string {
  return encodeURIComponent(taskPath.replace(/~/g, "/"));
}

function normalizeTaskState(raw: unknown, fallbackPath: string): MeTaskState | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  const path =
    (typeof row.path === "string" && row.path) ||
    (typeof row.ref === "string" && row.ref.includes("/") ? row.ref : fallbackPath);
  const ref = typeof row.ref === "string" && row.ref ? row.ref : path;
  return {
    ref,
    path,
    completed: row.completed === true,
    completed_at:
      typeof row.completed_at === "string"
        ? row.completed_at
        : row.completed_at === null
          ? null
          : null,
    note:
      typeof row.note === "string"
        ? row.note
        : row.note === null
          ? null
          : null,
    note_updated_at:
      typeof row.note_updated_at === "string"
        ? row.note_updated_at
        : row.note_updated_at === null
          ? null
          : null,
    workspace_id:
      typeof row.workspace_id === "string"
        ? row.workspace_id
        : row.workspace_id === null
          ? null
          : null,
  };
}

function stubTaskState(taskPath: string, patch: PatchMeTaskBody): MeTaskState {
  const path = taskPath.replace(/~/g, "/");
  const prev = stubStates.get(path) || {
    ref: path,
    path,
    completed: false,
    completed_at: null,
    note: null,
    note_updated_at: null,
    workspace_id: null,
  };
  const next: MeTaskState = { ...prev };
  if (patch.completed !== undefined) {
    next.completed = patch.completed;
    next.completed_at = patch.completed ? new Date().toISOString() : null;
  }
  if (patch.note !== undefined) {
    next.note = patch.note;
    next.note_updated_at = patch.note ? new Date().toISOString() : null;
  }
  stubStates.set(path, next);
  return next;
}

/** Build canonical flat task path from classId + taskId or an existing ref/path. */
export function taskPathFromParts(classId: string, taskId: string): string {
  return flatTaskPath(classId, taskId);
}

/**
 * PATCH personal task state. Tries PATCH, then done/undo shims; stubs on 404.
 */
export async function patchMeTask(taskPath: string, body: PatchMeTaskBody): Promise<MeTaskState> {
  const normalized = taskPath.replace(/~/g, "/");
  const encoded = encodeTaskPath(normalized);
  const base = `/api/v1/me/tasks/${encoded}`;

  try {
    const payload = await apiFetch<unknown>(base, { method: "PATCH", body });
    const parsed = normalizeTaskState(payload, normalized);
    if (parsed) return parsed;
  } catch (err) {
    if (err instanceof ApiFetchError) {
      if (err.status === 404 && body.completed === true) {
        try {
          const payload = await apiFetch<unknown>(`${base}/done`, { method: "POST" });
          const parsed = normalizeTaskState(payload, normalized);
          if (parsed) return parsed;
        } catch {
          /* fall through to stub */
        }
      }
      if (err.status === 404 && body.completed === false) {
        try {
          const payload = await apiFetch<unknown>(`${base}/undo`, { method: "POST" });
          const parsed = normalizeTaskState(payload, normalized);
          if (parsed) return parsed;
        } catch {
          /* fall through to stub */
        }
      }
      if (err.status === 404 || err.status === 405 || err.status === 501) {
        return stubTaskState(normalized, body);
      }
    }
    throw err;
  }

  return stubTaskState(normalized, body);
}
