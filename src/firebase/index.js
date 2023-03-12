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
export { app, auth, db, analytics };

// handle auth updates (user login/logout) and set user data in store
import { useMainStore } from "../store";
auth.onAuthStateChanged((user) => {
  const store = useMainStore();
  if (user) {
    store.set_user(user);
    // setup onSnapshot listener for user data
    onSnapshot(doc(db, "users", user.uid), { includeMetadataChanges: true }, (doc) => {
      console.warn("remote data updated");
      store.doc = doc.data();
    });
    // rewrite the above with firebase 9 functions
  } else {
    store.clear();
  }
});
