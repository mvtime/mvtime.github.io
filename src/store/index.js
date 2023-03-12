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
    set_user(user) {
      this.user = user;
      // if router has a redirect, go to it
      if (
        router.currentRoute.value &&
        router.currentRoute.value.query &&
        router.currentRoute.value.query.redirect
      ) {
        router.push(router.currentRoute.value.query.redirect);
      }
    },
    clear() {
      this.user = null;
      this.doc = null;
      // if page requires auth, redirect to home
      if (
        router.currentRoute.value &&
        router.currentRoute.value.meta &&
        router.currentRoute.value.meta.requiresAuth
      ) {
        router.push("/");
      }
    },
    async login() {
      new Toast(
        "Opening login popup...",
        "default",
        1000,
        require("@svonk/util/assets/info-locked-icon.svg")
      );
      // sign in with google, then set user data
      await signInWithPopup(auth, provider)
        .then(() => {
          new Toast(
            "Logged in as " + this.user.displayName + "!",
            "default",
            2000,
            require("@svonk/util/assets/info-unlocked-icon.svg")
          );
          if (
            !(
              router.currentRoute.value &&
              router.currentRoute.value.query &&
              router.currentRoute.value.query.redirect
            )
          ) {
            router.push("/portal");
          }
        })
        .catch((error) => {
          new ErrorToast("Couldn't log in", cleanError(error), 2000);
        });
    },
    logout() {
      auth.signOut();
      new Toast("Logged Out", "default", 1500, require("@svonk/util/assets/info-locked-icon.svg"));
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
