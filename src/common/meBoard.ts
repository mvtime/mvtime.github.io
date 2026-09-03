/**
 * GET /api/v1/me/board DTO types, parse, and Vue ClassInfo mapping.
 * Pure leaf module (no Firebase / path imports) so node tests can load it directly.
 *
 * @module common/meBoard
 */

function looksLikeEmail(segment: string): boolean {
  return typeof segment === "string" && segment.includes("@");
}

function isCanvasImportEmail(email: string): boolean {
  return typeof email === "string" && email.toLowerCase().startsWith("canvas.import@");
}

function bareClassIdFromEnrollment(enrollmentPath: string | undefined | null): string {
  const parts = (enrollmentPath || "").split("/").filter(Boolean);
  if (parts.length >= 2) return parts[1];
  return parts[0] || "";
}

function flatTaskPath(classId: string, taskId: string): string {
  return [classId, taskId].join("/");
}

function humanTeacherEmails(teachers: unknown): string[] {
  if (!Array.isArray(teachers)) return [];
  return teachers
    .map((entry) => {
      if (!entry || typeof entry !== "object") return "";
      const email = (entry as { email?: string }).email;
      if (!email || typeof email !== "string") return "";
      if (isCanvasImportEmail(email)) return "";
      return email;
    })
    .filter(Boolean);
}

/** Bare classId from slash or tilde board id/ref (classId | email/classId | local~classId). */
function bareClassIdFromPointer(raw: string): string {
  const trimmed = (raw || "").trim();
  if (!trimmed) return "";
  if (trimmed.includes("/")) {
    const parts = trimmed.split("/").filter(Boolean);
    if (parts.length >= 2 && looksLikeEmail(parts[0])) return parts[1] || "";
    if (parts.length === 1 && !looksLikeEmail(parts[0])) return parts[0];
    if (parts.length >= 2 && !looksLikeEmail(parts[0])) return parts[0];
  }
  if (trimmed.includes("~")) {
    const parts = trimmed.split("~").filter(Boolean);
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return parts[1];
    if (parts.length >= 3) return parts[1];
  }
  if (!looksLikeEmail(trimmed)) return trimmed;
  return "";
}

function taskIdFromPointer(raw: string): string | null {
  const trimmed = (raw || "").trim();
  if (!trimmed) return null;
  if (!trimmed.includes("/") && !trimmed.includes("~") && !looksLikeEmail(trimmed)) {
    return trimmed;
  }
  const slash = trimmed.split("/").filter(Boolean);
  if (slash.length === 2 && !looksLikeEmail(slash[0])) return slash[1] || null;
  if (slash.length >= 3) return slash[slash.length - 1] || null;
  const tilde = trimmed.split("~").filter(Boolean);
  if (tilde.length === 2 && !looksLikeEmail(tilde[0])) return tilde[1] || null;
  if (tilde.length >= 3) return tilde[tilde.length - 1] || null;
  return slash[slash.length - 1] || tilde[tilde.length - 1] || null;
}

/** Embedded task on a board class (slash `ref` = classId/taskId; id usually stripped). */
export interface BoardEmbeddedTask {
  ref?: string;
  path?: string;
  id?: string;
  name?: string;
  type?: string;
  date?: string | null;
  description?: string;
  link?: string;
  links?: unknown;
  repetition_group_id?: string | null;
  [key: string]: unknown;
}

/** Class row in GET /api/v1/me/board. `id` is bare classId; `ref` may be classId or legacy. */
export interface BoardClass {
  id: string;
  ref: string;
  name: string;
  period: number | null;
  color?: string;
  tasks: BoardEmbeddedTask[];
  owner_email?: string;
  teachers?: unknown;
  archived?: boolean;
  [key: string]: unknown;
}

/** Flat task row in GET /api/v1/me/board. */
export interface BoardTask {
  id: string;
  path: string;
  ref: string;
  class_id: string;
  class_name?: string;
  color?: string;
  date: string | null;
  completed: boolean;
  repetition_group_id: string | null;
  name?: string;
  type?: string;
  [key: string]: unknown;
}

/** Envelope for GET /api/v1/me/board. 204 / missing body → empty arrays. */
export interface MeBoardResponse {
  classes: BoardClass[];
  tasks: BoardTask[];
  finished: string[];
}

/** Pinia `this.classes` shape produced from a board hydrate (matches fetch_classes). */
export interface BoardHydratedClass {
  id: string;
  ref: string;
  _class_id: string;
  name: string;
  period: number | null;
  color?: string;
  tasks: BoardEmbeddedTask[];
  [key: string]: unknown;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function finitePeriod(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

/** Enrollment pointer matching a bare classId (`classId` or legacy `email/classId`). */
export function enrollmentKeyForClassId(
  enrollment: string[] | null | undefined,
  classId: string
): string {
  if (!classId) return "";
  const list = enrollment || [];
  const exact = list.find((entry) => entry === classId);
  if (exact) return exact;
  const byBare = list.find((entry) => bareClassIdFromEnrollment(entry) === classId);
  if (byBare) return byBare;
  return classId;
}

export function classIdFromBoardClass(raw: Record<string, unknown>, _orgDomain?: string): string {
  void _orgDomain;
  const nested = typeof raw._class_id === "string" ? raw._class_id.trim() : "";
  if (nested) return bareClassIdFromEnrollment(nested) || bareClassIdFromPointer(nested);

  const id = typeof raw.id === "string" ? raw.id.trim() : "";
  if (id) {
    const fromId = bareClassIdFromPointer(id);
    if (fromId) return fromId;
  }

  const ref = typeof raw.ref === "string" ? raw.ref.trim() : "";
  if (ref) {
    const fromRef = bareClassIdFromPointer(ref) || bareClassIdFromEnrollment(ref);
    if (fromRef) return fromRef;
  }
  return "";
}

export function teacherEmailFromBoardClass(raw: Record<string, unknown>): string | undefined {
  const owner = raw.owner_email;
  if (typeof owner === "string" && looksLikeEmail(owner) && !isCanvasImportEmail(owner)) {
    return owner;
  }
  const fromTeachers = humanTeacherEmails(raw.teachers)[0];
  if (fromTeachers) return fromTeachers;

  const legacy = raw.legacy_ref;
  if (typeof legacy === "string" && looksLikeEmail(legacy.split("/")[0])) {
    const email = legacy.split("/")[0];
    if (email && !isCanvasImportEmail(email)) return email;
  }

  const ref = typeof raw.ref === "string" ? raw.ref : "";
  if (ref.includes("/") && looksLikeEmail(ref.split("/")[0])) {
    const email = ref.split("/")[0];
    if (email && !isCanvasImportEmail(email)) return email;
  }
  return undefined;
}

function taskIdFromBoardTask(task: Record<string, unknown>, classId: string): string | null {
  const rawId = typeof task.id === "string" ? task.id.trim() : "";
  if (rawId && !rawId.includes("/") && !rawId.includes("~") && !looksLikeEmail(rawId)) {
    return rawId;
  }
  const path = typeof task.path === "string" ? task.path : "";
  const ref = typeof task.ref === "string" ? task.ref : "";
  return (
    taskIdFromPointer(path) ||
    taskIdFromPointer(ref) ||
    taskIdFromPointer(rawId)
  );
}

function stampEmbeddedTask(task: Record<string, unknown>, classId: string): BoardEmbeddedTask {
  const {
    id: _id,
    path: _path,
    class_id: _classId,
    class_name: _className,
    completed: _completed,
    class_obj: _classObj,
    ...rest
  } = task;
  void _id;
  void _path;
  void _classId;
  void _className;
  void _completed;
  void _classObj;

  const taskId = taskIdFromBoardTask(task, classId);
  const stamped: BoardEmbeddedTask = { ...rest };
  if (classId && taskId) {
    stamped.ref = flatTaskPath(classId, taskId);
  } else if (typeof rest.ref === "string" && rest.ref.includes("/") && !looksLikeEmail(rest.ref.split("/")[0])) {
    stamped.ref = rest.ref;
  }
  return stamped;
}

function normalizeEmbeddedTask(raw: unknown): BoardEmbeddedTask | null {
  const rec = asRecord(raw);
  if (!rec) return null;
  return rec as BoardEmbeddedTask;
}

function normalizeBoardClass(raw: unknown, orgDomain: string): BoardClass | null {
  const rec = asRecord(raw);
  if (!rec) return null;
  if (rec.archived === true) return null;
  const classId = classIdFromBoardClass(rec, orgDomain);
  if (!classId) return null;

  const tasks = Array.isArray(rec.tasks)
    ? rec.tasks.map(normalizeEmbeddedTask).filter((t): t is BoardEmbeddedTask => !!t)
    : [];

  const name = typeof rec.name === "string" && rec.name ? rec.name : "Unnamed Class";
  const ref = typeof rec.ref === "string" && rec.ref ? rec.ref : classId;
  const color = typeof rec.color === "string" ? rec.color : undefined;

  return {
    ...rec,
    id: classId,
    ref,
    name,
    period: finitePeriod(rec.period),
    ...(color ? { color } : {}),
    tasks,
  };
}

function classIdFromTaskPointer(raw: string): string {
  const trimmed = (raw || "").trim();
  if (!trimmed) return "";
  const slash = trimmed.split("/").filter(Boolean);
  if (slash.length === 2 && !looksLikeEmail(slash[0])) return slash[0];
  if (slash.length >= 3) return slash[1];
  const tilde = trimmed.split("~").filter(Boolean);
  if (tilde.length === 2 && !looksLikeEmail(tilde[0])) return tilde[0];
  if (tilde.length >= 3) return tilde[1];
  return "";
}

function normalizeBoardTask(raw: unknown, _orgDomain?: string): BoardTask | null {
  void _orgDomain;
  const rec = asRecord(raw);
  if (!rec) return null;
  const classId =
    (typeof rec.class_id === "string" && bareClassIdFromPointer(rec.class_id)) ||
    classIdFromTaskPointer(typeof rec.path === "string" ? rec.path : "") ||
    classIdFromTaskPointer(typeof rec.ref === "string" ? rec.ref : "") ||
    "";
  if (!classId) return null;
  const taskId = taskIdFromBoardTask(rec, classId);
  if (!taskId) return null;

  const path =
    typeof rec.path === "string" && rec.path && !looksLikeEmail(rec.path.split("/")[0])
      ? rec.path
      : flatTaskPath(classId, taskId);
  const ref = typeof rec.ref === "string" && rec.ref ? rec.ref : `${classId}~${taskId}`;

  return {
    ...rec,
    id: taskId,
    path,
    ref,
    class_id: classId,
    date: typeof rec.date === "string" ? rec.date : rec.date === null ? null : null,
    completed: rec.completed === true,
    repetition_group_id:
      typeof rec.repetition_group_id === "string"
        ? rec.repetition_group_id
        : rec.repetition_group_id === null
          ? null
          : null,
  };
}

/**
 * Parse GET /api/v1/me/board envelope.
 * 204 / undefined / non-object → empty classes (same as no enrollments).
 */
export function parseMeBoardResponse(payload: unknown, orgDomain = ""): MeBoardResponse {
  if (!payload || typeof payload !== "object") {
    return { classes: [], tasks: [], finished: [] };
  }
  const body = payload as Record<string, unknown>;
  const classes = Array.isArray(body.classes)
    ? body.classes
        .map((row) => normalizeBoardClass(row, orgDomain))
        .filter((row): row is BoardClass => !!row)
    : [];
  const tasks = Array.isArray(body.tasks)
    ? body.tasks
        .map((row) => normalizeBoardTask(row, orgDomain))
        .filter((row): row is BoardTask => !!row)
    : [];
  const finished = Array.isArray(body.finished)
    ? body.finished.filter((entry): entry is string => typeof entry === "string" && !!entry)
    : [];
  return { classes, tasks, finished };
}

function compareHydratedClasses(a: BoardHydratedClass, b: BoardHydratedClass): number {
  if (a.period == b.period) {
    return String(a.name || "").localeCompare(String(b.name || ""));
  }
  // prefer classes that have periods over those that don't
  if (!a.period && a.period !== 0) return 1;
  if (!b.period && b.period !== 0) return -1;
  return (a.period as number) - (b.period as number);
}

/**
 * Map a parsed me/board envelope into the ClassInfo[] shape `this.classes` uses.
 * `id` prefers the users.classes[] enrollment key when present; task refs are flat classId/taskId.
 */
export function mapMeBoardToClassInfos(
  board: MeBoardResponse,
  enrollment: string[] | null | undefined,
  orgDomain: string
): BoardHydratedClass[] {
  const tasksByClass = new Map<string, BoardTask[]>();
  for (const task of board.tasks || []) {
    if (!task.class_id) continue;
    const list = tasksByClass.get(task.class_id) || [];
    list.push(task);
    tasksByClass.set(task.class_id, list);
  }

  const classes: BoardHydratedClass[] = [];
  for (const boardClass of board.classes || []) {
    const classId = boardClass.id;
    if (!classId) continue;

    const enrollmentKey = enrollmentKeyForClassId(enrollment, classId);
    const teacherEmail = teacherEmailFromBoardClass(boardClass);

    let embedded = Array.isArray(boardClass.tasks) ? boardClass.tasks : [];
    if (!embedded.length) {
      embedded = tasksByClass.get(classId) || [];
    }

    const {
      id: _boardId,
      ref: _boardRef,
      tasks: _boardTasks,
      archived: _archived,
      canvas_course_id: _canvasCourseId,
      canvas_source: _canvasSource,
      canvas_id: _canvasId,
      ...classFields
    } = boardClass as BoardClass & Record<string, unknown>;
    void _boardId;
    void _boardRef;
    void _boardTasks;
    void _archived;
    void _canvasCourseId;
    void _canvasSource;
    void _canvasId;

    const mapped: BoardHydratedClass = {
      ...classFields,
      id: enrollmentKey || classId,
      ref: (typeof boardClass.ref === "string" && boardClass.ref) || enrollmentKey || classId,
      _class_id: classId,
      name: boardClass.name || "Unnamed Class",
      period: boardClass.period ?? null,
      tasks: embedded.map((task) => stampEmbeddedTask(asRecord(task) || {}, classId)),
    };
    if (teacherEmail) {
      mapped.owner_email = teacherEmail;
    }
    classes.push(mapped);
  }

  classes.sort(compareHydratedClasses);
  return classes;
}
