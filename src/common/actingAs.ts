/**
 * Linked-account "Acting as …" chip helpers.
 * Pure leaf module (no Firebase / Vue) so node tests can load it directly.
 *
 * Prefer ID-token `school_uid` claim; fall back to personal_account + linked_to.
 * School email always comes from the principal (active/school) doc — never personal Gmail.
 *
 * @module common/actingAs
 */

/** Loose claims bag from Firebase getIdTokenResult().claims */
export type IdTokenClaims = Record<string, unknown> | null | undefined;

export interface ActingAsInput {
  /** Custom claim school_uid when present */
  schoolUidClaim?: string | null;
  /** users/{auth.uid}.personal_account */
  personalAccount?: boolean;
  /** users/{auth.uid}.linked_to (school uid) */
  linkedTo?: string | null;
  /** School principal email from active_doc / linked school doc */
  activeDocEmail?: string | null;
  /** Signed-in Firebase user email (may be personal Gmail) — never used as chip email when personal */
  userEmail?: string | null;
}

/** Read school_uid from ID token claims (string only). */
export function schoolUidFromClaims(claims: IdTokenClaims): string | null {
  if (!claims || typeof claims !== "object") return null;
  const raw = claims.school_uid;
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  return trimmed || null;
}

/**
 * True when this session should show Acting-as chrome:
 * prefer school_uid claim; else personal_account && linked_to.
 */
export function isActingAsLinked(input: ActingAsInput): boolean {
  const claim = (input.schoolUidClaim || "").trim();
  if (claim) return true;
  const linkedTo = (input.linkedTo || "").trim();
  return !!(input.personalAccount && linkedTo);
}

/**
 * School principal email for the chip label.
 * Uses active_doc.email only — never the personal Gmail when acting as linked.
 * Returns null when not acting as, or when school email is unavailable.
 */
export function resolveActingAsEmail(input: ActingAsInput): string | null {
  if (!isActingAsLinked(input)) return null;
  const schoolEmail = (input.activeDocEmail || "").trim();
  if (!schoolEmail) return null;
  // Guard: if somehow active email equals personal Gmail while personal, treat as unresolved
  if (input.personalAccount && input.userEmail) {
    const personal = input.userEmail.trim().toLowerCase();
    if (personal && schoolEmail.toLowerCase() === personal) return null;
  }
  return schoolEmail;
}

/** Full accessible label, e.g. "Acting as student@andrew.cmu.edu". */
export function actingAsLabel(email: string | null | undefined): string | null {
  const trimmed = (email || "").trim();
  if (!trimmed) return null;
  return `Acting as ${trimmed}`;
}

/** Chip should render when acting-as session has a resolvable school email. */
export function shouldShowActingAsChip(input: ActingAsInput): boolean {
  return !!resolveActingAsEmail(input);
}
