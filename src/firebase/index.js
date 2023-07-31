// Path: firebase/index.js

// import firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, onSnapshot, doc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDGqqhApln4pxm4EynPCSkfwyK8aopjfCk",
  authDomain: "mvtrack.firebaseapp.com",
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
    // setup onSnapshot listener for user data
    setupSnapshot(user, store);
    timeout = startTimeout();
    // rewrite the above with firebase 9 functions
  } else {
    store.clear();
  }
}

function setupSnapshot(user) {
  const store = useMainStore();
  unsub = onSnapshot(
    doc(db, "users", user.uid),
    { includeMetadataChanges: true },
    (doc) => {
      if (doc.metadata.hasPendingWrites) {
        _statuslog("⬥ Got snapshot from local changes");
        return;
      }
      _statuslog("⏷ Got snapshot from remote");
      // check if doc exists
      if (!doc.exists()) {
        store.create_doc();
        return;
      }
      store.doc = doc.data();
      // run get_classes() to update classes
      store.get_classes();
    },
    (err) => {
      _statuslog("⚠ Error getting snapshot from remote", err);
    }
  );
  subscribed = true;
}

// allow for unsubscribing from onSnapshot
function unsubscribe() {
  // clear timeout
  clearTimeout(timeout);
  if (unsub) {
    unsub();
    _statuslog("⬥ Unsubscribed from remote changes");
  }
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
    unsubscribe();
  }, delay);
}

function refreshTimeout(delay) {
  const store = useMainStore();
  if (!subscribed) {
    // setup snapshot and pull data
    setupSnapshot(store.user);
    _statuslog("⬥ Resubscribed to remote changes");
  }
  clearTimeout(timeout);
  timeout = startTimeout(delay);
}
