/**
 * Live onSnapshot listeners for enrolled class docs (flat-first dual-read).
 * Cap = enrollment size. This module only reads (attach to flat when present).
 *
 * @module firebase/classListeners
 */
import { onSnapshot, type Unsubscribe } from "firebase/firestore";
import { getClassDoc, rememberClassEmail } from "@/common/dualRead";
import { looksLikeEmail } from "@/common/paths";
import {
  clearClassListenerState,
  dropClassListenerStamp,
  enrollmentSetsEqual,
  finishedSetsEqual,
  hydrateBeatsLive,
  beginHydrateEpoch,
  markRemoteClassSnapshot,
  noteClassHydrateTime,
} from "@/common/classListenerState";
import { _status } from "@/common";

export {
  enrollmentSetsEqual,
  finishedSetsEqual,
  hydrateBeatsLive,
  beginHydrateEpoch,
  noteClassHydrateTime,
};

type ClassUnsub = Unsubscribe;

function getDb() {
  // Lazy require avoids firebase/index ↔ classListeners cycle at module init.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require("./index").db;
}

/** enrollmentPath → unsubscribe */
const classUnsubs = new Map<string, ClassUnsub>();

function getMainStore() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { useMainStore } = require("@/store");
  return useMainStore();
}

function enrollmentKeyParts(classPath: string): { teacher?: string; classId: string } | null {
  const parts = (classPath || "").split("/").filter(Boolean);
  if (parts.length >= 2) {
    return { teacher: parts[0], classId: parts[1] };
  }
  if (parts.length === 1 && parts[0]) {
    return { classId: parts[0] };
  }
  return null;
}

/**
 * Subscribe to one enrolled class doc via dual-read resolution
 * (flat classes/{classId} first, else nested classes/{email}/classes/{classId}).
 */
async function subscribeOneClass(enrollmentPath: string): Promise<void> {
  if (classUnsubs.has(enrollmentPath)) return;

  const parts = enrollmentKeyParts(enrollmentPath);
  if (!parts?.classId) {
    _status.warn(`⚠ Invalid enrollment path for class listener: ${enrollmentPath}`);
    return;
  }

  const { teacher, classId } = parts;
  if (teacher && looksLikeEmail(teacher)) {
    rememberClassEmail(classId, teacher);
  }

  const resolved = await getClassDoc(getDb(), classId, teacher);
  if (!resolved) {
    _status.warn(`⚠ No class doc to listen for ${enrollmentPath}`);
    return;
  }

  // Dropped/re-joined while awaiting dual-read
  if (classUnsubs.has(enrollmentPath)) return;

  const listenRef = resolved.snap.ref;
  _status.log(`⬥ Class listener attach (${resolved.source}): ${enrollmentPath}`);

  const unsub = onSnapshot(
    listenRef,
    { includeMetadataChanges: true },
    (snap) => {
      if (snap.metadata.hasPendingWrites) {
        _status.log(`⬥ Class snapshot local pendingWrites | ${enrollmentPath}`);
        return;
      }
      _status.log(`⏷ Class snapshot remote | ${enrollmentPath}`);
      const store = getMainStore();
      if (!snap.exists()) {
        store.remove_invalid?.(enrollmentPath);
        return;
      }
      // Remote snapshot always applies; marks epoch so in-flight hydrate cannot clobber it
      markRemoteClassSnapshot(enrollmentPath);
      store.apply_live_class(enrollmentPath, snap.data() || {}, {
        teacherEmail: resolved.teacherEmail,
        legacyPath: resolved.legacyPath,
        source: resolved.source,
        classId: resolved.classId,
      });
    },
    (err: { code?: string }) => {
      if (err?.code === "permission-denied") {
        _status.warn(`⚠ Permission denied for class listener ${enrollmentPath}`);
      } else {
        _status.error(`⚠ Class listener error for ${enrollmentPath}`, err);
      }
    }
  );

  classUnsubs.set(enrollmentPath, unsub);
}

/** Unsubscribe one class listener and drop its race stamp. */
function unsubscribeOneClass(enrollmentPath: string): void {
  const unsub = classUnsubs.get(enrollmentPath);
  if (unsub) {
    unsub();
    classUnsubs.delete(enrollmentPath);
    _status.log(`⬥ Class listener detach: ${enrollmentPath}`);
  }
  dropClassListenerStamp(enrollmentPath);
}

/**
 * Diff enrollment: unsub dropped, sub newly joined. Listener count ≤ enrollment size.
 */
export function syncClassListeners(enrollment: string[] | null | undefined): void {
  const unique = [...new Set((enrollment || []).filter(Boolean))];
  // Cap = enrollment size (unique)
  const desired = new Set(unique);

  for (const key of [...classUnsubs.keys()]) {
    if (!desired.has(key)) {
      unsubscribeOneClass(key);
    }
  }

  for (const key of unique) {
    if (!classUnsubs.has(key)) {
      // Fire-and-forget attach; errors logged inside
      subscribeOneClass(key).catch((err) => {
        _status.error(`⚠ Failed to attach class listener for ${key}`, err);
      });
    }
  }
}

/** Tear down every class listener (idle timeout / logout). */
export function unsubscribeAllClassListeners(): void {
  for (const key of [...classUnsubs.keys()]) {
    const unsub = classUnsubs.get(key);
    if (unsub) {
      unsub();
      classUnsubs.delete(key);
    }
  }
  clearClassListenerState();
  _status.log("⬥ Unsubscribed from all class listeners");
}

export function classListenerCount(): number {
  return classUnsubs.size;
}

/**
 * Hydrate via fetch_classes (dual-read getDocs) then attach listeners.
 * Used on login, Portal mount path, idle resubscribe, and visibility wake.
 */
export async function hydrateAndListen(): Promise<void> {
  const store = getMainStore();
  await store.fetch_classes();
  const enrollment = store.active_doc?.classes || [];
  syncClassListeners(enrollment);
}
