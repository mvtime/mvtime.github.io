/**
 * Pure helpers for live class-listener enrollment diffs and hydrate/snapshot races.
 * Kept free of Firebase imports so node unit tests can load them directly.
 *
 * @module common/classListenerState
 */

/** Last applied Firestore updateTime (ms) per enrollment key. */
const lastAppliedMs = new Map<string, number>();

function sameStringSet(a: string[] | null | undefined, b: string[] | null | undefined): boolean {
  const aa = a || [];
  const bb = b || [];
  if (aa.length !== bb.length) return false;
  const setA = new Set(aa);
  return bb.every((x) => setA.has(x));
}

export function enrollmentSetsEqual(
  a: string[] | null | undefined,
  b: string[] | null | undefined
): boolean {
  return sameStringSet(a, b);
}

export function finishedSetsEqual(
  a: string[] | null | undefined,
  b: string[] | null | undefined
): boolean {
  return sameStringSet(a, b);
}

/** Record hydrate updateTime so a concurrent older getDocs result cannot clobber a newer snapshot. */
export function noteClassHydrateTime(enrollmentPath: string, updateTimeMs: number | undefined): void {
  if (!enrollmentPath || updateTimeMs == null || !Number.isFinite(updateTimeMs)) return;
  const prev = lastAppliedMs.get(enrollmentPath) || 0;
  if (updateTimeMs >= prev) {
    lastAppliedMs.set(enrollmentPath, updateTimeMs);
  }
}

/** True when hydrate data is new enough to replace the in-memory class (snapshot already won → false). */
export function hydrateBeatsLive(enrollmentPath: string, updateTimeMs: number | undefined): boolean {
  if (updateTimeMs == null || !Number.isFinite(updateTimeMs)) return true;
  const prev = lastAppliedMs.get(enrollmentPath) || 0;
  return updateTimeMs >= prev;
}

/** True when a remote snapshot should replace local state (equal-or-newer wins). */
export function shouldApplyRemoteSnapshot(
  enrollmentPath: string,
  updateTimeMs: number | undefined
): boolean {
  if (updateTimeMs == null || !Number.isFinite(updateTimeMs)) return true;
  const prev = lastAppliedMs.get(enrollmentPath) || 0;
  if (updateTimeMs < prev) return false;
  lastAppliedMs.set(enrollmentPath, updateTimeMs);
  return true;
}

export function clearClassListenerState(): void {
  lastAppliedMs.clear();
}

export function dropClassListenerStamp(enrollmentPath: string): void {
  lastAppliedMs.delete(enrollmentPath);
}
