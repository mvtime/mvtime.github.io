// Path: firebase/index.ts

// import firebase
import { initializeApp } from "firebase/app";
import { getAuth, type User } from "firebase/auth";
import { getFirestore, onSnapshot, doc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getFunctions, httpsCallable } from "firebase/functions";

// firebase config — client SDK keys only (never embed server API_KEY / board secrets)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_apiKey,
  authDomain: process.env.FIREBASE_authDomain,
  projectId: process.env.FIREBASE_projectId,
  storageBucket: process.env.FIREBASE_storageBucket,
  messagingSenderId: process.env.FIREBASE_messagingSenderId,
  appId: process.env.FIREBASE_appId,
  measurementId: process.env.FIREBASE_measurementId,
};

// initialize firebases
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const functions = getFunctions(app, process.env.FIREBASE_region);

// export firebase
export {
  app,
  auth,
  db,
  analytics,
  functions,
  httpsCallable,
  authChangeAction,
  refreshTimeout,
  setupSnapshot,
};

// Re-export hydrate helper for Portal / callers (board-first + listeners; never API_KEY)
export { hydrateAndListen } from "./classListeners";

//TODO:TS update common and store to ts to fix below
// handle auth updates (user login/logout) and set user data in store
// Lazy-get the Pinia store inside callbacks — a static `import { useMainStore } from "@/store"`
// cycles with store's top-level `import … from "../firebase"` and TDZ-crashes before mount.
import { _status } from "@/common";
import router from "@/router";
import {
  syncClassListeners,
  unsubscribeAllClassListeners,
  enrollmentSetsEqual,
  finishedSetsEqual,
  hydrateAndListen,
} from "./classListeners";

function getMainStore() {
  // require() after both modules have finished initializing (same pattern as pre-cycle-break main).
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { useMainStore } = require("@/store");
  return useMainStore();
}

auth.onAuthStateChanged((user: User | null) => {
  authChangeAction(user);
});
let unsub: () => void,
  subscribed: boolean = false,
  timeout: number;

/** Last enrollment / finished seen on the user doc (for change detection). */
let prevClasses: string[] | null = null;
let prevFinished: string[] | null = null;

function authChangeAction(user: User | null): void {
  const store = getMainStore();
  if (user) {
    store.set_user(user);
    // unsubscribe from any prev
    unsubscribe();
    // if not signed in, exit
    if (!store.user) return;
    // setup onSnapshot listener for user data
    setupSnapshot(user.uid);
    timeout = startTimeout();
    // Hydrate classes then attach live class-doc listeners (login)
    hydrateAndListen().catch((err) => {
      _status.warn("⚠ Initial hydrateAndListen deferred / failed", err);
    });
  } else {
    unsubscribe();
    prevClasses = null;
    prevFinished = null;
    store.clear();
  }
}

function setupSnapshot(uid: string | undefined): void {
  _status.log("⬥ Setting up snapshot", uid);
  if (!uid) {
    _status.warn("⚠ No uid provided to setupSnapshot");
    return;
  }
  // Replace prior user-doc listener when switching principal (personal → schoolUid)
  if (typeof unsub === "function") {
    unsub();
  }
  const store = getMainStore();
  store.hide_timeout();
  unsub = onSnapshot(
    doc(db, "users", uid),
    { includeMetadataChanges: true },
    (listening_doc) => {
      if (listening_doc.metadata.hasPendingWrites) {
        _status.log("⬥ Snapshot from local changes");
        return;
      }
      _status.log("⏷ Snapshot from remote");
      // check if doc exists
      if (!listening_doc.exists()) {
        store.create_doc();
        return;
      }
      let listening_doc_data = listening_doc.data();
      const nextClasses: string[] = listening_doc_data?.classes || [];
      const nextFinished: string[] = listening_doc_data?.finished || [];
      const classesChanged = !enrollmentSetsEqual(prevClasses, nextClasses);
      const finishedChanged = !finishedSetsEqual(prevFinished, nextFinished);

      // set based on id
      if (store?.user?.uid == listening_doc.id) {
        // set the account_doc
        store.account_doc = listening_doc_data;
      } else {
        store.linked_account_doc = listening_doc_data;
      }

      // Enrollment change: board-first hydrate then resync class listeners (never drop listeners)
      if (classesChanged) {
        prevClasses = [...nextClasses];
        _status.log("⬥ User enrollment changed — board hydrate + resync class listeners");
        store.hydrate_from_board_or_fallback().catch((err: unknown) => {
          _status.error("⚠ hydrate after user snapshot failed", err);
          // Still try to attach listeners from enrollment paths
          syncClassListeners(nextClasses);
        });
      } else {
        // Ensure listeners exist even when enrollment unchanged (e.g. after idle resub)
        syncClassListeners(store.active_doc?.classes || nextClasses);
      }

      // finished[] lives on the user doc; updating account_doc is enough for calendar
      // (finished_tasks getter + hide_finished). Re-stamp tasks only if needed for reactivity.
      if (finishedChanged) {
        prevFinished = [...nextFinished];
        _status.log("⬥ User finished[] changed — store already updated via account_doc");
        if (store.classes?.length) {
          store.get_tasks();
        }
      } else if (prevFinished === null) {
        prevFinished = [...nextFinished];
      }
    },
    (err) => {
      if (err.code == "permission-denied") {
        _status.warn("⚠ Permission denied for snapshot, likely from logging out");
      } else {
        _status.error("⚠ Couldn't get snapshot from remote", err);
      }
    }
  );
  subscribed = true;
}

// allow for unsubscribing from onSnapshot (user + all class listeners)
function unsubscribe(show_prompt: boolean = false): void {
  // clear timeout
  clearTimeout(timeout);
  let store = getMainStore();
  if (show_prompt) {
    store.show_timeout();
  }
  if (unsub) {
    unsub();
    _status.log("⬥ Unsubscribed from remote changes");
  }
  unsubscribeAllClassListeners();
  subscribed = false;
}

function msToText(ms: number): string {
  // use modolo to get minutes and seconds
  const minutes = Math.floor(ms / 1000 / 60);
  const seconds = Math.floor((ms / 1000) % 60);
  return (
    (minutes || !seconds ? `${minutes} minute${minutes != 1 ? "s" : ""}` : "") +
    (seconds ? `${seconds} second${seconds != 1 ? "s" : ""}` : "")
  );
}

function startTimeout(delay: number = 1000 * 60 * 5): number {
  return window.setTimeout(() => {
    _status.log(`⬥ Page unused for ${msToText(delay)}, removing onSnapshot listener`);
    unsubscribe(true);
  }, delay);
}

function refreshTimeout(delay: number): void {
  const store = getMainStore();
  store.hide_timeout();
  if (!subscribed) {
    // setup snapshot and pull data
    setupSnapshot(store.personal_account ? store.account_doc?.linked_to : store.user.uid);
    // get class data / tasks again if "/portal" in path (check w/ router), then re-attach listeners
    if (router.currentRoute.value && router.currentRoute.value.path.startsWith("/portal")) {
      _status.log("⬥ Refreshing class data + class listeners");
      hydrateAndListen().catch((err) => {
        _status.error("⚠ hydrateAndListen on timeout resume failed", err);
      });
    } else {
      syncClassListeners(store.active_doc?.classes || []);
    }
    _status.log("⬥ Resubscribed to remote changes");
  }
  clearTimeout(timeout);
  timeout = startTimeout(delay);
}
