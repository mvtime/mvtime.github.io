/**
 * Personal task state API — PATCH /api/v1/me/tasks/:taskId (completed, note).
 * Completion prefers POST done/undo shims (same contract Brief uses).
 *
 * Path params use tilde refs (`classId~taskId`). Slash/`%2F` forms are fragile on
 * single-segment Express routes behind Firebase Hosting and previously caused
 * silent local stubs that looked done until reload.
 *
 * @module common/meTasks
 */

import { ApiFetchError, apiFetch } from "@/common/apiFetch";
import { applyMeTaskState, type MeTaskState } from "@/common/meTaskState";
import {
  encodeTaskPathParam,
  flatTaskPath,
  normalizeMeTaskPointer,
} from "@/common/paths";

export type { MeTaskState };
export { applyMeTaskState, meTaskStateFromBoardTask } from "@/common/meTaskState";
export { encodeTaskPathParam, normalizeMeTaskPointer } from "@/common/paths";

export interface PatchMeTaskBody {
  completed?: boolean;
  note?: string | null;
}

const stubStates = new Map<string, MeTaskState>();
const ORG_DOMAIN_FALLBACK = process.env.VUE_APP_ORG_DOMAIN || "mvla.net";

function orgDomain(): string {
  return ORG_DOMAIN_FALLBACK;
}

function pointerFor(taskPath: string) {
  return normalizeMeTaskPointer(taskPath, orgDomain());
}

function isoFromCompletedAt(value: unknown): string | null {
  if (typeof value === "string" && value) return value;
  if (typeof value === "number" && Number.isFinite(value)) {
    return new Date(value).toISOString();
  }
  return null;
}

function normalizeTaskState(raw: unknown, fallbackPath: string): MeTaskState | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  const fromId = typeof row.id === "string" && row.id ? row.id : "";
  const path =
    (typeof row.path === "string" && row.path) ||
    (fromId.includes("/") || fromId.includes("~") ? fromId.replace(/~/g, "/") : "") ||
    (typeof row.ref === "string" && row.ref.includes("/") ? row.ref : "") ||
    fallbackPath;
  const pointer = pointerFor(path) || pointerFor(fallbackPath);
  const canonicalPath = pointer?.path || path.replace(/~/g, "/");
  const ref =
    (typeof row.ref === "string" && row.ref) ||
    pointer?.tildeRef ||
    canonicalPath;
  return {
    ref,
    path: canonicalPath,
    completed: row.completed === true,
    completed_at: isoFromCompletedAt(row.completed_at),
    note:
      typeof row.note === "string"
        ? row.note
        : row.note === null
          ? null
          : null,
    note_updated_at: isoFromCompletedAt(row.note_updated_at),
    workspace_id:
      typeof row.workspace_id === "string"
        ? row.workspace_id
        : row.workspace_id === null
          ? null
          : null,
  };
}

function stubTaskState(taskPath: string, patch: PatchMeTaskBody): MeTaskState {
  const pointer = pointerFor(taskPath);
  const path = pointer?.path || taskPath.replace(/~/g, "/");
  const ref = pointer?.tildeRef || path;
  const prev = stubStates.get(path) || {
    ref,
    path,
    completed: false,
    completed_at: null,
    note: null,
    note_updated_at: null,
    workspace_id: null,
  };
  const next: MeTaskState = { ...prev, ref, path };
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

function isMissingRoute(err: unknown): boolean {
  return err instanceof ApiFetchError && (err.status === 404 || err.status === 405 || err.status === 501);
}

/** Build canonical flat task path from classId + taskId or an existing ref/path. */
export function taskPathFromParts(classId: string, taskId: string): string {
  return flatTaskPath(classId, taskId);
}

async function postDoneOrUndo(encoded: string, completed: boolean, fallbackPath: string): Promise<MeTaskState> {
  const suffix = completed ? "done" : "undo";
  const payload = await apiFetch<unknown>(`/api/v1/me/tasks/${encoded}/${suffix}`, { method: "POST" });
  const parsed = normalizeTaskState(payload, fallbackPath);
  if (parsed) {
    return { ...parsed, completed };
  }
  // done/undo envelopes sometimes only include id/completed — synthesize from request.
  return {
    ref: fallbackPath.includes("~") ? fallbackPath : fallbackPath.replace(/\//g, "~"),
    path: fallbackPath.replace(/~/g, "/"),
    completed,
    completed_at: completed ? new Date().toISOString() : null,
    note: null,
    note_updated_at: null,
    workspace_id: null,
  };
}

/**
 * PATCH personal task state.
 * Completion: POST done/undo first (Brief contract), then PATCH; never stub completed.
 * Notes: PATCH, with local stub only when the route is missing mid-dev.
 */
export async function patchMeTask(taskPath: string, body: PatchMeTaskBody): Promise<MeTaskState> {
  const pointer = pointerFor(taskPath);
  if (!pointer) {
    throw new Error(`Invalid task path: ${taskPath}`);
  }
  const { path: normalized, tildeRef } = pointer;
  const encoded = encodeTaskPathParam(tildeRef, orgDomain());
  const base = `/api/v1/me/tasks/${encoded}`;

  // Prefer done/undo for completion — same routes Brief batch/single uses successfully.
  if (body.completed !== undefined && body.note === undefined) {
    try {
      return await postDoneOrUndo(encoded, body.completed, normalized);
    } catch (err) {
      if (!(err instanceof ApiFetchError) || !isMissingRoute(err)) {
        throw err;
      }
      // Fall through to PATCH when done/undo missing (older deploys).
    }

    try {
      const payload = await apiFetch<unknown>(base, {
        method: "PATCH",
        body: { completed: body.completed },
      });
      const parsed = normalizeTaskState(payload, normalized);
      if (parsed) return parsed;
      return {
        ref: tildeRef,
        path: normalized,
        completed: body.completed,
        completed_at: body.completed ? new Date().toISOString() : null,
        note: null,
        note_updated_at: null,
        workspace_id: null,
      };
    } catch (err) {
      // Never stub completed — that was the production "looks done until reload" bug.
      throw err;
    }
  }

  try {
    const payload = await apiFetch<unknown>(base, { method: "PATCH", body });
    const parsed = normalizeTaskState(payload, normalized);
    if (parsed) return parsed;
  } catch (err) {
    if (err instanceof ApiFetchError) {
      // If PATCH missing but we only needed completed, try done/undo.
      if (isMissingRoute(err) && body.completed !== undefined) {
        try {
          const doneState = await postDoneOrUndo(encoded, body.completed, normalized);
          if (body.note === undefined) return doneState;
        } catch (doneErr) {
          if (body.note === undefined) throw doneErr;
        }
      }
      if (isMissingRoute(err) && body.completed === undefined) {
        // Notes-only mid-dev stub when routes absent.
        return stubTaskState(normalized, body);
      }
    }
    throw err;
  }

  if (body.completed !== undefined) {
    return {
      ref: tildeRef,
      path: normalized,
      completed: body.completed,
      completed_at: body.completed ? new Date().toISOString() : null,
      note: typeof body.note === "string" ? body.note : body.note === null ? null : null,
      note_updated_at: body.note ? new Date().toISOString() : null,
      workspace_id: null,
    };
  }

  return stubTaskState(normalized, body);
}

export interface BatchMeTasksResult {
  succeeded: number;
  failed: number;
  states: MeTaskState[];
  errors: { id: string; error: string }[];
}

/**
 * Batch mark done/undo via POST /api/v1/me/tasks/done|undo (Brief contract).
 * Body uses tilde refs. Falls back to per-task patchMeTask when batch route is missing.
 */
export async function patchMeTasksCompleted(
  taskPaths: string[],
  completed: boolean
): Promise<BatchMeTasksResult> {
  const pointers = taskPaths
    .map((p) => pointerFor(p))
    .filter((p): p is NonNullable<typeof p> => !!p);
  if (!pointers.length) {
    throw new Error("No valid task paths for batch complete");
  }

  const tildeIds = [...new Set(pointers.map((p) => p.tildeRef))];
  const pathByTilde = new Map(pointers.map((p) => [p.tildeRef, p.path]));

  try {
    const suffix = completed ? "done" : "undo";
    const payload = await apiFetch<{
      results?: Array<{
        id?: string;
        ok?: boolean;
        path?: string;
        completed?: boolean;
        completed_at?: number | string;
        error?: string;
      }>;
      succeeded?: number;
      failed?: number;
    }>(`/api/v1/me/tasks/${suffix}`, {
      method: "POST",
      body: { task_ids: tildeIds },
    });

    const states: MeTaskState[] = [];
    const errors: { id: string; error: string }[] = [];
    for (const row of payload?.results || []) {
      const id = typeof row.id === "string" ? row.id : "";
      if (!row.ok) {
        errors.push({ id, error: row.error || "failed" });
        continue;
      }
      const fallback = pathByTilde.get(id) || id.replace(/~/g, "/");
      const parsed = normalizeTaskState(
        {
          ...row,
          path: row.path || fallback,
          completed: row.completed ?? completed,
        },
        fallback
      );
      if (parsed) states.push({ ...parsed, completed });
    }

    if (errors.length && !states.length) {
      throw new ApiFetchError(errors[0]?.error || "Batch complete failed", 400);
    }

    return {
      succeeded: typeof payload?.succeeded === "number" ? payload.succeeded : states.length,
      failed: typeof payload?.failed === "number" ? payload.failed : errors.length,
      states,
      errors,
    };
  } catch (err) {
    if (!isMissingRoute(err)) throw err;
  }

  // Fallback: sequential single-task writes (still no stub for completed).
  const states: MeTaskState[] = [];
  const errors: { id: string; error: string }[] = [];
  for (const pointer of pointers) {
    try {
      states.push(await patchMeTask(pointer.path, { completed }));
    } catch (e) {
      errors.push({
        id: pointer.tildeRef,
        error: e instanceof Error ? e.message : String(e),
      });
    }
  }
  if (!states.length && errors.length) {
    throw new Error(errors[0].error);
  }
  return {
    succeeded: states.length,
    failed: errors.length,
    states,
    errors,
  };
}
