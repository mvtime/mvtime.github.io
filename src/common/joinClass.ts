/**
 * P4 flat enroll helpers for Add Class / Onboarding join-ref resolution.
 * Prefer bare classId enrollment pointers; dual-read still resolves legacy
 * email/classId and local~classId forms during soak.
 *
 * @module common/joinClass
 */

import { parseClassId } from "./paths";

export interface JoinRefParts {
  /** Bare classId for enrollClass({ classId }) / store.add_class. */
  classId: string;
  /** Present when the join ref included a teacher email or local prefix. */
  teacherEmail?: string;
  /**
   * True for short bare classId refs — caller must dual-read (class_from_ref)
   * to obtain teacher email before listing classes.
   */
  needsTeacherLookup: boolean;
}

/**
 * Parse a join ref (from route or code→ref lookup) into teacher + bare classId.
 * Does not touch Firestore; async teacher lookup stays in the Vue form.
 *
 * Accepts: classId | email/classId | local~classId (slash or ~).
 */
export function parseJoinRef(
  ref: string | undefined | null,
  orgDomain: string
): JoinRefParts | null {
  if (!ref || typeof ref !== "string") return null;
  const trimmed = ref.trim();
  if (!trimmed) return null;

  const parsed = parseClassId(trimmed, orgDomain);
  if (!parsed?.classId) return null;

  if (!parsed.hasTeacherPrefix) {
    return { classId: parsed.classId, needsTeacherLookup: true };
  }

  return {
    classId: parsed.classId,
    teacherEmail: parsed.teacherEmail,
    needsTeacherLookup: false,
  };
}
