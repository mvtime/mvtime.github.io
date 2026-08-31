/**
 * Class/task path parsers and short-share helpers for class-id-first dual-read.
 * Mirrors mvtt-server parseClassId / parseTaskId forms.
 *
 * Accepts forever:
 * - classId
 * - classId/taskId | classId~taskId
 * - teacherEmail/classId[/taskId]
 * - local~classId[~taskId]
 *
 * Writers / nested path builders still emit email/classId until a later writer-switch.
 *
 * @module common/paths
 */

export interface ParsedClassPath {
  /** Present for email/classId and local~classId forms. */
  teacherEmail?: string;
  classId: string;
  /** True when the input included an email or teacher-local prefix. */
  hasTeacherPrefix: boolean;
}

export interface ParsedTaskPath {
  teacherEmail?: string;
  classId: string;
  taskId: string;
  hasTeacherPrefix: boolean;
}

export function looksLikeEmail(segment: string): boolean {
  return typeof segment === "string" && segment.includes("@");
}

/** True for canvas.import@* ghosts — never a teachers[] member. */
export function isCanvasImportEmail(email: string): boolean {
  return typeof email === "string" && email.toLowerCase().startsWith("canvas.import@");
}

function orgEmailFromLocal(local: string, orgDomain: string): string {
  if (looksLikeEmail(local)) return local;
  const domain = orgDomain.startsWith("@") ? orgDomain.slice(1) : orgDomain;
  return `${local}@${domain}`;
}

/**
 * Normalize a raw route/path/ref string into slash-separated segments.
 * Accepts `~` or `/` separators; strips empty parts.
 */
export function splitRefSegments(raw: string | undefined | null): string[] {
  if (!raw || typeof raw !== "string") return [];
  return raw
    .trim()
    .split(/[~/]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Parse class identity from slash id or ~ ref.
 * Accepts: classId | email/classId | local~classId
 */
export function parseClassId(
  idOrRef: string | undefined,
  orgDomain: string
): ParsedClassPath | null {
  const parts = splitRefSegments(idOrRef);
  if (parts.length === 1) {
    return { classId: parts[0], hasTeacherPrefix: false };
  }
  if (parts.length === 2) {
    const [teacherPart, classId] = parts;
    if (!teacherPart || !classId) return null;
    // Two segments with an email-shaped first part → email/classId.
    // Two segments without @ may be local~classId (class) OR classId~taskId (task).
    // Callers that know they want a class should use parseClassId; task routes use parseTaskId.
    // Prefer teacher-prefix interpretation when first segment looks like email OR when
    // explicitly using this as a class parser (legacy class links are local~classId).
    return {
      teacherEmail: orgEmailFromLocal(teacherPart, orgDomain),
      classId,
      hasTeacherPrefix: true,
    };
  }
  return null;
}

/**
 * Parse task identity from slash id or ~ ref.
 * Accepts: classId/taskId | email/classId/taskId | local~classId~taskId | classId~taskId
 */
export function parseTaskId(
  idOrRef: string | undefined,
  orgDomain: string
): ParsedTaskPath | null {
  const parts = splitRefSegments(idOrRef);
  if (parts.length === 2) {
    const [classId, taskId] = parts;
    if (!classId || !taskId) return null;
    if (looksLikeEmail(classId)) return null;
    return { classId, taskId, hasTeacherPrefix: false };
  }
  if (parts.length === 3) {
    const [teacherPart, classId, taskId] = parts;
    if (!teacherPart || !classId || !taskId) return null;
    return {
      teacherEmail: orgEmailFromLocal(teacherPart, orgDomain),
      classId,
      taskId,
      hasTeacherPrefix: true,
    };
  }
  return null;
}

/**
 * Ambiguous 2-segment refs: local~classId (class) vs classId~taskId (task).
 * Returns both interpretations; callers dual-read class-with-email first, then task.
 */
export function parseAmbiguousTwoSegment(
  idOrRef: string | undefined,
  orgDomain: string
): { asClass: ParsedClassPath; asTask: ParsedTaskPath } | null {
  const parts = splitRefSegments(idOrRef);
  if (parts.length !== 2) return null;
  const [a, b] = parts;
  if (!a || !b) return null;
  if (looksLikeEmail(a)) {
    return {
      asClass: {
        teacherEmail: a,
        classId: b,
        hasTeacherPrefix: true,
      },
      asTask: null as unknown as ParsedTaskPath,
    };
  }
  return {
    asClass: {
      teacherEmail: orgEmailFromLocal(a, orgDomain),
      classId: b,
      hasTeacherPrefix: true,
    },
    asTask: {
      classId: a,
      taskId: b,
      hasTeacherPrefix: false,
    },
  };
}

/** Emit legacy nested path until writer-switch. Requires teacher email. */
export function classPath(teacherEmail: string, classId: string): string {
  return [teacherEmail, classId].join("/");
}

/** Emit legacy nested path until writer-switch. Requires teacher email. */
export function taskPath(teacherEmail: string, classId: string, taskId: string): string {
  return [teacherEmail, classId, taskId].join("/");
}

/**
 * Short share/view ref when classId is known (drops email/local prefix).
 * Class → `classId`; task → `classId~taskId`.
 */
export function shortShareRef(classId: string, taskId?: string | null): string {
  if (!classId) return "";
  return taskId ? `${classId}~${taskId}` : classId;
}

/**
 * If the ref still contains an email/local prefix, return the short form to replace to.
 * Otherwise return null (already short / nothing to do).
 */
export function shortRefIfPrefixed(
  idOrRef: string | undefined,
  orgDomain: string
): string | null {
  if (!idOrRef) return null;
  const parts = splitRefSegments(idOrRef);
  if (parts.length === 3) {
    // local~classId~taskId or email/classId/taskId
    const parsed = parseTaskId(idOrRef, orgDomain);
    if (parsed?.hasTeacherPrefix) return shortShareRef(parsed.classId, parsed.taskId);
    return null;
  }
  if (parts.length === 2) {
    // Prefixed class form (email/local~classId) → short classId.
    // classId~taskId (no prefix) stays as-is.
    if (looksLikeEmail(parts[0])) {
      return shortShareRef(parts[1]);
    }
    // local~classId still has a teacher prefix — callers that confirmed class
    // via dual-read should pass forceClass. Here we only auto-shorten email-shaped.
    // For local~classId, router guard confirms via dual-read then shortens.
    return null;
  }
  return null;
}

/** People-only filter: drop canvas.import@* and non-object entries. */
export function humanTeachers(
  teachers: unknown
): { email: string; name?: string; role?: string }[] {
  if (!Array.isArray(teachers)) return [];
  return teachers.filter((t) => {
    if (!t || typeof t !== "object") return false;
    const email = (t as { email?: string }).email;
    if (!email || typeof email !== "string") return false;
    if (isCanvasImportEmail(email)) return false;
    return true;
  }) as { email: string; name?: string; role?: string }[];
}
