/**
 * Firestore dual-read helpers: flat classes/{classId} first, then nested
 * classes/{email}/classes/{classId}. Writers target the flat path; nested
 * leftovers remain readable during soak.
 *
 * @module common/dualRead
 */
import {
  doc,
  getDoc,
  type DocumentData,
  type DocumentSnapshot,
  type Firestore,
} from "firebase/firestore";
import {
  classPath,
  looksLikeEmail,
  taskPath,
  type ParsedClassPath,
} from "@/common/paths";

export type ClassDocSource = "flat" | "nested";

export interface ClassDocResult {
  snap: DocumentSnapshot;
  data: DocumentData;
  classId: string;
  teacherEmail: string | undefined;
  source: ClassDocSource;
  /** Nested email/classId when resolvable (enroll / soak; not for new writes). */
  legacyPath: string | undefined;
}

export interface TaskDocResult {
  snap: DocumentSnapshot;
  data: DocumentData;
  classId: string;
  taskId: string;
  teacherEmail: string | undefined;
  source: ClassDocSource;
  legacyPath: string | undefined;
}

const emailByClassId = new Map<string, string>();

/** Remember classId → teacherEmail when resolved (helps short-URL nested fallback). */
export function rememberClassEmail(classId: string, teacherEmail: string | undefined): void {
  if (!classId || !teacherEmail || !looksLikeEmail(teacherEmail)) return;
  if (teacherEmail.toLowerCase().startsWith("canvas.import@")) return;
  emailByClassId.set(classId, teacherEmail);
}

export function rememberedClassEmail(classId: string): string | undefined {
  return emailByClassId.get(classId);
}

function emailFromLegacyRef(legacyRef: unknown): string | undefined {
  if (typeof legacyRef !== "string") return undefined;
  const [email] = legacyRef.split("/");
  return email && looksLikeEmail(email) ? email : undefined;
}

/**
 * Dual-read class getter: try classes/{classId} FIRST, then nested.
 * Does not require owner_email on the flat doc.
 */
export async function getClassDoc(
  db: Firestore,
  classId: string,
  teacherEmail?: string
): Promise<ClassDocResult | null> {
  if (!classId) return null;

  if (!looksLikeEmail(classId)) {
    const flat = await getDoc(doc(db, "classes", classId));
    if (flat.exists()) {
      const data = flat.data() || {};
      const ownerField = data.owner_email;
      const owner = typeof ownerField === "string" && ownerField ? ownerField : undefined;
      const emailForPath =
        owner || teacherEmail || emailFromLegacyRef(data.legacy_ref) || rememberedClassEmail(classId);
      const legacyFromDoc = typeof data.legacy_ref === "string" ? data.legacy_ref : undefined;
      rememberClassEmail(classId, emailForPath);
      return {
        snap: flat,
        data,
        classId,
        teacherEmail: emailForPath,
        source: "flat",
        legacyPath: emailForPath ? classPath(emailForPath, classId) : legacyFromDoc,
      };
    }
  }

  const email = teacherEmail || rememberedClassEmail(classId);
  if (email) {
    const nested = await getDoc(doc(db, "classes", email, "classes", classId));
    if (nested.exists()) {
      rememberClassEmail(classId, email);
      return {
        snap: nested,
        data: nested.data() || {},
        classId,
        teacherEmail: email,
        source: "nested",
        legacyPath: classPath(email, classId),
      };
    }
  }

  return null;
}

/**
 * Dual-read task getter: try classes/{classId}/tasks/{taskId} first, then nested.
 */
export async function getTaskDoc(
  db: Firestore,
  classId: string,
  taskId: string,
  teacherEmail?: string
): Promise<TaskDocResult | null> {
  if (!classId || !taskId) return null;

  if (!looksLikeEmail(classId)) {
    const flat = await getDoc(doc(db, "classes", classId, "tasks", taskId));
    if (flat.exists()) {
      const classResult = await getClassDoc(db, classId, teacherEmail);
      const email = classResult?.teacherEmail || teacherEmail || rememberedClassEmail(classId);
      rememberClassEmail(classId, email);
      return {
        snap: flat,
        data: flat.data() || {},
        classId,
        taskId,
        teacherEmail: email,
        source: "flat",
        legacyPath: email ? taskPath(email, classId, taskId) : undefined,
      };
    }
  }

  let email = teacherEmail || rememberedClassEmail(classId);
  if (!email && !looksLikeEmail(classId)) {
    const classResult = await getClassDoc(db, classId);
    email = classResult?.teacherEmail;
  }

  if (email) {
    const nested = await getDoc(doc(db, "classes", email, "classes", classId, "tasks", taskId));
    if (nested.exists()) {
      rememberClassEmail(classId, email);
      return {
        snap: nested,
        data: nested.data() || {},
        classId,
        taskId,
        teacherEmail: email,
        source: "nested",
        legacyPath: taskPath(email, classId, taskId),
      };
    }

    // Leftover nested archive doc (dual-read only; writers target flat tasks/{taskId})
    const nestedArchive = await getDoc(
      doc(db, "classes", email, "classes", classId, "archive", taskId)
    );
    if (nestedArchive.exists()) {
      rememberClassEmail(classId, email);
      return {
        snap: nestedArchive,
        data: nestedArchive.data() || {},
        classId,
        taskId,
        teacherEmail: email,
        source: "nested",
        legacyPath: taskPath(email, classId, taskId),
      };
    }
  }

  return null;
}

/** Resolve teacher email for nested writes when given a parsed class path. */
export async function resolveTeacherEmailForPath(
  db: Firestore,
  parsed: ParsedClassPath
): Promise<string | null> {
  if (parsed.teacherEmail) return parsed.teacherEmail;
  const result = await getClassDoc(db, parsed.classId);
  return result?.teacherEmail || null;
}

/** True when a flat classes/{classId} doc currently exists (for optional dual-write of teachers[]). */
export async function flatClassExists(db: Firestore, classId: string): Promise<boolean> {
  if (!classId || looksLikeEmail(classId)) return false;
  const flat = await getDoc(doc(db, "classes", classId));
  return flat.exists();
}
