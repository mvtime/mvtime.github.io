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

function setupSnapshot(user, store) {
  unsub = onSnapshot(
    doc(db, "users", user.uid),
    { includeMetadataChanges: true },
    (doc) => {
      _statuslog("⬥ Got snapshot from remote");
      if (doc.metadata.hasPendingWrites) {
        _statuslog("⏷ Got changes from remote");
        return;
      }
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
  _statuslog("⬥ Subscribed to remote changes");
}

// allow for unsubscribing from onSnapshot
function unsubscribe() {
  // clear timeout
  clearTimeout(timeout);
  if (unsub) {
    unsub();
    _statuslog("⬥ Unsubscribed from remote changes");
  }
}

function startTimeout(delay = 1000 * 60 * 5) {
  return setTimeout(() => {
    _statuslog("⬥ Page unused for 5 minutes, removing onSnapshot listener");
    unsubscribe();
  }, delay);
}

function refreshTimeout(delay) {
  clearTimeout(timeout);
  timeout = startTimeout(delay);
}
