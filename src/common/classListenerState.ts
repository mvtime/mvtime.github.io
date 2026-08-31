/**
 * Pure helpers for live class-listener enrollment diffs and hydrate/snapshot races.
 * Kept free of Firebase imports so node unit tests can load them directly.
 *
 * Client Firestore snapshots do not expose updateTime, so races use a local epoch:
 * if a remote class snapshot applied after hydrate started, hydrate keeps the live copy.
 *
 * @module common/classListenerState
 */

/** Monotonic clock advanced on each remote class snapshot apply. */
let clock = 0;

/** enrollmentPath → clock value when last remote snapshot was applied. */
const lastSnapshotAt = new Map<string, number>();

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

/** Capture clock at hydrate start; snapshots after this win the race. */
export function beginHydrateEpoch(): number {
  return clock;
}

/** Mark that a remote class snapshot was applied (always wins over in-flight hydrate). */
export function markRemoteClassSnapshot(enrollmentPath: string): void {
  if (!enrollmentPath) return;
  lastSnapshotAt.set(enrollmentPath, ++clock);
}

/**
 * True when hydrate may replace the in-memory class.
 * False when a remote snapshot landed after hydrate started (snapshot wins).
 */
export function hydrateBeatsLive(enrollmentPath: string, hydrateStartedAt: number): boolean {
  const snapAt = lastSnapshotAt.get(enrollmentPath) || 0;
  return snapAt <= hydrateStartedAt;
}

/** @deprecated No-op kept for call-site clarity; epoch marks replace updateTime stamps. */
export function noteClassHydrateTime(_enrollmentPath: string, _updateTimeMs?: number): void {
  // Hydrate does not advance the snapshot clock; beginHydrateEpoch + hydrateBeatsLive suffice.
}

export function clearClassListenerState(): void {
  lastSnapshotAt.clear();
  clock = 0;
}

export function dropClassListenerStamp(enrollmentPath: string): void {
  lastSnapshotAt.delete(enrollmentPath);
}
