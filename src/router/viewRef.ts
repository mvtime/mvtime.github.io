/**
 * Router helpers: normalize old email/local-prefixed view refs to short classId form.
 * @module router/viewRef
 */
import type { RouteLocationNormalized, RouteLocationRaw } from "vue-router";
import { db } from "@/firebase";
import {
  looksLikeEmail,
  parseTaskId,
  shortShareRef,
  splitRefSegments,
} from "@/common/paths";
import { getClassDoc, rememberClassEmail } from "@/common/dualRead";

function orgDomain(): string {
  return process.env.VUE_APP_ORG_DOMAIN || "mvla.net";
}

/**
 * If `ref` still has a teacher email/local prefix, return the short share ref.
 * For ambiguous local~classId vs classId~taskId, dual-reads class-with-email first.
 */
export async function resolveShortViewRef(ref: string | undefined): Promise<{
  shortRef: string;
  kind: "class" | "task";
  redirected: boolean;
} | null> {
  if (!ref) return null;
  const parts = splitRefSegments(ref);
  const org = orgDomain();

  // Bare classId
  if (parts.length === 1) {
    return { shortRef: parts[0], kind: "class", redirected: false };
  }

  // Three segments → always teacher-prefixed task
  if (parts.length === 3) {
    const parsed = parseTaskId(ref, org);
    if (!parsed) return null;
    if (parsed.teacherEmail) rememberClassEmail(parsed.classId, parsed.teacherEmail);
    return {
      shortRef: shortShareRef(parsed.classId, parsed.taskId),
      kind: "task",
      redirected: parsed.hasTeacherPrefix || parts.join("~") !== shortShareRef(parsed.classId, parsed.taskId),
    };
  }

  // Two segments: local~classId (class) OR classId~taskId (task)
  if (parts.length === 2) {
    const [a, b] = parts;

    // email/classId → short class
    if (looksLikeEmail(a)) {
      rememberClassEmail(b, a);
      return { shortRef: shortShareRef(b), kind: "class", redirected: true };
    }

    // Try as old class form local~classId via dual-read
    const teacherEmail = `${a}@${org}`;
    const asClass = await getClassDoc(db, b, teacherEmail);
    if (asClass) {
      rememberClassEmail(b, asClass.teacherEmail || teacherEmail);
      return { shortRef: shortShareRef(b), kind: "class", redirected: true };
    }

    // Else classId~taskId (short task form)
    return {
      shortRef: shortShareRef(a, b),
      kind: "task",
      redirected: false,
    };
  }

  return null;
}

/** Build a replace navigation when the address bar should drop the email/local prefix. */
export async function redirectToShortViewIfNeeded(
  to: RouteLocationNormalized,
  classRouteName: string,
  taskRouteName: string
): Promise<RouteLocationRaw | true> {
  const ref = typeof to.params.ref === "string" ? to.params.ref : undefined;
  const resolved = await resolveShortViewRef(ref);
  if (!resolved) return true;

  const targetName = resolved.kind === "task" ? taskRouteName : classRouteName;
  const needsReplace =
    resolved.redirected ||
    to.name !== targetName ||
    ref !== resolved.shortRef;

  if (!needsReplace) return true;

  return {
    name: targetName,
    params: { ...to.params, ref: resolved.shortRef },
    query: to.query,
    hash: to.hash,
    replace: true,
  };
}

/**
 * If `/to/:path` looks like email/classId[/taskId] (not an http URL), return short /view ref.
 */
export function shortViewFromSlashPath(path: string | undefined): string | null {
  if (!path || typeof path !== "string") return null;
  const trimmed = path.trim();
  if (!trimmed || /^https?:/i.test(trimmed)) return null;
  let decoded = trimmed;
  try {
    decoded = decodeURIComponent(trimmed);
  } catch {
    decoded = trimmed;
  }
  if (/^https?:/i.test(decoded)) return null;

  const parts = splitRefSegments(decoded);
  // Only rewrite when the first segment is an email (teacherEmail/classId[/taskId])
  if (parts.length >= 2 && looksLikeEmail(parts[0])) {
    if (parts.length >= 3) return shortShareRef(parts[1], parts[2]);
    return shortShareRef(parts[1]);
  }
  // Also accept localPart/classId when path uses ~ already handled elsewhere;
  // slash local/classId without @ is ambiguous — skip
  return null;
}
