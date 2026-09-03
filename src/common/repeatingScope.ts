/**
 * Repeating-task edit/archive scopes and optimistic local matching.
 * Pure leaf module (no Firebase / Vue) so node tests can load it directly.
 * Mirrors mvtt-server updateRepeatingTask / deleteRepeatingTask scopes.
 *
 * @module common/repeatingScope
 */

export type RepeatingEditScope = "this" | "future" | "all";

export interface RepeatingInstanceMatchOpts {
  preferredRef?: string | null;
  classId?: string | null;
  taskId?: string | null;
  /** YYYY-MM-DD (or date-prefix) of the instance being edited/archived. */
  task_date?: string | null;
  /** Reserved for callers that already resolve ids via writeTaskIds; unused in matching. */
  orgDomain?: string;
}

function datePrefix(value: unknown): string {
  if (typeof value !== "string" || !value) return "";
  return value.split("T")[0];
}

/** Normalize ~ and / so classId~taskId matches classId/taskId. */
function normalizeRef(ref: string | undefined | null): string {
  if (!ref || typeof ref !== "string") return "";
  return ref.trim().split("/").join("~");
}

function refsEqual(a: string | undefined | null, b: string | undefined | null): boolean {
  const na = normalizeRef(a);
  const nb = normalizeRef(b);
  return !!na && !!nb && na === nb;
}

/** Last segment of a normalized classId~taskId (or longer) ref. */
function taskIdFromRef(ref: string | undefined | null): string | null {
  const parts = normalizeRef(ref).split("~").filter(Boolean);
  if (parts.length < 2) return null;
  return parts[parts.length - 1] || null;
}

function classIdFromRef(ref: string | undefined | null): string | null {
  const parts = normalizeRef(ref).split("~").filter(Boolean);
  if (parts.length < 2) return null;
  // classId~taskId → classId; email-local~classId~taskId → classId
  return parts.length >= 3 ? parts[parts.length - 2] : parts[0];
}

/**
 * True when `task` is the same series instance as preferredRef / taskId / task_date.
 * Used for scope `"this"` optimistic map/filter (do not touch the whole series).
 */
export function matchesRepeatingInstance(
  task: { ref?: string; date?: unknown } | null | undefined,
  opts: RepeatingInstanceMatchOpts
): boolean {
  if (!task) return false;
  const { preferredRef, classId, taskId, task_date } = opts;

  if (preferredRef && refsEqual(task.ref, preferredRef)) return true;

  if (classId && taskId) {
    const flat = `${classId}/${taskId}`;
    const short = `${classId}~${taskId}`;
    if (refsEqual(task.ref, flat) || refsEqual(task.ref, short)) return true;
    if (classIdFromRef(task.ref) === classId && taskIdFromRef(task.ref) === taskId) return true;
  }

  if (task_date) {
    const want = datePrefix(task_date);
    const have = datePrefix(task.date);
    if (want && have && want === have) return true;
  }

  return false;
}

/**
 * Whether optimistic local update/archive should touch this series task for the given scope.
 */
export function shouldTouchRepeatingTask(
  task: { repetition_group_id?: string; ref?: string; date?: unknown } | null | undefined,
  repetition_group_id: string,
  scope: RepeatingEditScope,
  opts: RepeatingInstanceMatchOpts & { referenceDate?: Date | null }
): boolean {
  if (!task || task.repetition_group_id !== repetition_group_id) return false;

  if (scope === "this") {
    return matchesRepeatingInstance(task, opts);
  }

  if (scope === "future" && opts.referenceDate) {
    const taskDateStr = datePrefix(task.date);
    const taskDate = taskDateStr ? new Date(taskDateStr + "T00:00:00") : null;
    if (taskDate && taskDate < opts.referenceDate) return false;
  }

  // "all" (and "future" past the cutoff) → touch
  return true;
}

export function repeatingUpdateToast(scope: RepeatingEditScope, count: number): string {
  if (scope === "this" && count === 1) return "Updated this task";
  return `Updated ${count} tasks in series`;
}

export function repeatingArchiveToast(scope: RepeatingEditScope, count: number): string {
  if (scope === "this" && count === 1) return "Archived this task";
  return `Archived ${count} tasks in series`;
}
