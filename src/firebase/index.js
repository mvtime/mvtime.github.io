// Path: firebase/index.js

// import firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, onSnapshot, doc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDGqqhApln4pxm4EynPCSkfwyK8aopjfCk",
  authDomain: "auth.mvtt.app",
  projectId: "mvtrack",
  storageBucket: "mvtrack.appspot.com",
  messagingSenderId: "1070634963357",
  appId: "1:1070634963357:web:2a4abc725fff24a5199f74",
  measurementId: "G-6LNX1KCR8E",
};

// initialize firebases
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// export firebase
export { app, auth, db, analytics, authChangeAction, refreshTimeout };

// handle auth updates (user login/logout) and set user data in store
import { useMainStore } from "../store";
import { _statuslog } from "@/common";
import router from "@/router";
auth.onAuthStateChanged((user) => {
  authChangeAction(user);
});
let unsub;
let subscribed = false;
let timeout;
function authChangeAction(user) {
  const store = useMainStore();
  if (user) {
    store.set_user(user);
    // unsubscribe from any prev
    unsubscribe();
    // if not signed in, exit
    if (!store.user) return;
    // setup onSnapshot listener for user data
    setupSnapshot(user.uid);
    timeout = startTimeout();
    // rewrite the above with firebase 9 functions
  } else {
    store.clear();
  }
}

function setupSnapshot(uid) {
  const store = useMainStore();
  store.hide_timeout();
  unsub = onSnapshot(
    doc(db, "users", uid),
    { includeMetadataChanges: true },
    (listening_doc) => {
      if (listening_doc.metadata.hasPendingWrites) {
        _statuslog("⬥ Snapshot from local changes");
        return;
      }
      _statuslog("⏷ Snapshot from remote");
      // check if doc exists
      if (!listening_doc.exists()) {
        store.create_doc();
        return;
      }
      let listening_doc_data = listening_doc.data();
      // set based on id
      if (store.user && store.user?.uid == listening_doc_data.id) {
        // set the account_doc
        store.account_doc = listening_doc_data;
      } else {
        store.linked_account_doc = listening_doc_data;
      }
      // run fetch_classes() to update classes
      // store.fetch_classes();
    },
    (err) => {
      _statuslog("⚠ Couldn't get snapshot from remote", err);
    }
  );
  subscribed = true;
}

// allow for unsubscribing from onSnapshot
function unsubscribe(show_prompt) {
  // clear timeout
  clearTimeout(timeout);
  if (show_prompt) {
    store.show_timeout();
  }
  if (unsub) {
    unsub();
    _statuslog("⬥ Unsubscribed from remote changes");
  }
  let store = useMainStore();
  subscribed = false;
}

function msToText(ms) {
  // use modolo to get minutes and seconds
  const minutes = Math.floor(ms / 1000 / 60);
  const seconds = Math.floor((ms / 1000) % 60);
  return (
    (minutes || !seconds ? `${minutes} minute${minutes != 1 ? "s" : ""}` : "") +
    (seconds ? `${seconds} second${seconds != 1 ? "s" : ""}` : "")
  );
}

function startTimeout(delay = 1000 * 60 * 5) {
  return setTimeout(() => {
    _statuslog(`⬥ Page unused for ${msToText(delay)}, removing onSnapshot listener`);
    unsubscribe(true);
  }, delay);
}

function refreshTimeout(delay) {
  const store = useMainStore();
  store.hide_timeout();
  if (!subscribed) {
    // setup snapshot and pull data
    setupSnapshot(store.personal_account ? store.account_doc.linked_to : store.user.uid);
    // get class data / tasks again if "/portal" in path (check w/ router)
    if (router.currentRoute.value && router.currentRoute.value.path.startsWith("/portal")) {
      _statuslog("⬥ Refreshing class data");
      store.fetch_classes();
    }
    _statuslog("⬥ Resubscribed to remote changes");
  }
  clearTimeout(timeout);
  timeout = startTimeout(delay);
}
