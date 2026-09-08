/**
 * Pure per-task state types and map helpers (no API / Firebase).
 * @module common/meTaskState
 */

import { flatTaskPath } from "./paths";

/** Per-task personal state returned by me/tasks and board payloads. */
export interface MeTaskState {
  ref: string;
  path: string;
  completed: boolean;
  completed_at: string | null;
  note: string | null;
  note_updated_at: string | null;
  workspace_id: string | null;
}

/** Merge board task row fields into a MeTaskState map entry. */
export function meTaskStateFromBoardTask(
  task: Record<string, unknown>,
  classId: string,
  taskId: string
): MeTaskState {
  const path =
    (typeof task.path === "string" && task.path) || flatTaskPath(classId, taskId);
  const ref = (typeof task.ref === "string" && task.ref) || path;
  const note =
    typeof task.note === "string"
      ? task.note
      : task.note === null
        ? null
        : null;
  return {
    ref,
    path,
    completed: task.completed === true,
    completed_at:
      typeof task.completed_at === "string"
        ? task.completed_at
        : task.completed_at === null
          ? null
          : null,
    note,
    note_updated_at:
      typeof task.note_updated_at === "string"
        ? task.note_updated_at
        : note
          ? null
          : null,
    workspace_id:
      typeof task.workspace_id === "string"
        ? task.workspace_id
        : task.workspace_id === null
          ? null
          : null,
  };
}

/** Apply a task-state patch onto an in-memory map keyed by ref and path. */
export function applyMeTaskState(
  map: Record<string, MeTaskState>,
  state: MeTaskState
): Record<string, MeTaskState> {
  const next = { ...map };
  next[state.ref] = state;
  next[state.path] = state;
  if (state.ref.includes("~")) {
    next[state.ref.split("~").join("/")] = state;
  }
  if (state.path.includes("/")) {
    const tilde = state.path.split("/").join("~");
    next[tilde] = state;
  }
  return next;
}
