// Path: store/index.js

// setup Pinia store
import { defineStore } from "pinia";
import { Toast, ErrorToast, cleanError } from "@svonk/util";

// get firebase requirements
import { auth, db } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();

// add email and name to provider
provider.addScope("email");
provider.addScope("profile");
auth.useDeviceLanguage();
// constrict to only mvla.net emails
provider.setCustomParameters({
  login_hint: "username@mvla.net",
  hd: "mvla.net",
});

// import router
import router from "../router";

// define store
export const useMainStore = defineStore({
  // store name
  id: "main",
  // store state
  state: () => ({
    user: null,
    // user data
    doc: null,
  }),
  // store getters
  getters: {},
  actions: {
    // set user data
    async login() {
      new Toast(
        "Opening login popup...",
        "default",
        1000,
        require("@svonk/util/assets/info-locked-icon.svg")
      );
      // sign in with google, then set user data
      await signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          this.user = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
          };
          // show success toast
          new Toast(
            "Logged in as " + user.displayName + "!",
            "default",
            2000,
            require("@svonk/util/assets/info-unlocked-icon.svg")
          );
        })
        .catch((error) => {
          // show error toast
          new ErrorToast("Error logging in", cleanError(error), 2000);
        });
    },
    // clear user data
    async logout() {
      await auth.signOut();
      new Toast("Logged Out", "default", 10000, require("@svonk/util/assets/info-locked-icon.svg"));
      // clear doc & user
      this.user = null;
      this.doc = null;
      // push to home
      router.push("/");
    },
    // set document data
    setDoc(doc) {
      this.doc = doc;
    },
    getDoc() {
      // get doc from firebase
      db.collection("users").doc(this.user.id).get();
    },
    updateDoc(doc) {
      this.doc = doc;
    },
  },
});
