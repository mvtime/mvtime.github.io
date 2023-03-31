// Path: store/index.js

// setup Pinia store
import { defineStore } from "pinia";
import { Toast, ErrorToast, cleanError, WarningToast, SuccessToast } from "@svonk/util";

// get firebase requirements
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  addDoc,
  writeBatch,
  arrayUnion,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
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
function validAccount(userEmail) {
  return userEmail.split("@")[1] == "mvla.net";
}
// define store
export const useMainStore = defineStore({
  id: "main",
  // store state
  state: () => ({
    user: null,
    doc: null,
    classes: [],
    loaded_email: null,
    loaded_classes: null,
    teacher: {
      doc_ref: null,
      collection_ref: null,
    },
  }),
  // store getters
  getters: {
    userdoc_ref() {
      if (!this.user) return null;
      return doc(db, "users", this.user.uid);
    },
    get_tests() {
      // get all the classes with this.classes(), then get all their tests and combine them into an array
      let tests = [];
      let classes = this.classes;
      if (!classes?.length) return [];
      for (let i = 0; i < classes.length; i++) {
        let class_tests = classes[i].tests;
        class_tests = class_tests ? class_tests : [];
        // add class name and color to each test
        for (let j = 0; j < class_tests.length; j++) {
          classes[i].name = classes[i].name ? classes[i].name : "Unnamed Class";
          // check test date type and convert to date object if necessary
          if (typeof class_tests[j].date == "string") {
            // convert to mm-dd-yyyy from yyyy-mm-dd
            let [year, month, day] = class_tests[j].date.split("-");
            class_tests[j].date = `${month}-${day}-${year}`;
            class_tests[j].date = new Date(class_tests[j].date);
            class_tests[j].date = isNaN(class_tests[j].date) ? null : class_tests[j].date;
          }
          // set color from parent class color
          class_tests[j].color = classes[i].color;
          tests.push({
            ...class_tests[j],
            class_name: classes[i].name,
          });
        }
      }
      return tests;
    },
    is_teacher() {
      // check if email is a teacher email (ends in @mvla.net) && has letters in the first part
      if (!this.user) return false;
      if (window?.MVTT_teacher_mode || (localStorage && localStorage.MVTT_teacher_mode)) {
        console.warn(
          "Teacher mode enabled (localStorage or window MVTT_teacher_mode value is true)\nFOR TESTING ONLY, does not enable nessesary server permission"
        );
        return true;
      }
      if (this.doc && this.doc.teacher_mode) return true;
      let email = this.user.email;
      let [first, last] = email.split("@");
      // return last == "mvla.net" && !/\d/.test(first);
      return last == "mvla.net" && !/\d/.test(first);
    },
  },
  actions: {
    async get_classes() {
      // check for duplicates
      if (this.doc.classes) {
        let unique = [...new Set(this.doc.classes)];
        if (unique.length != this.doc.classes.length) {
          this.doc.classes = unique;
          await this.update_remote();
          new WarningToast("Removed duplicate classes", 2000);
        }
      }
      // get all classes' data and combine into an array
      if (!this.doc) return [];
      let classes = [];
      for (let class_path of this.doc.classes) {
        // split class path into teacher/uid
        let [teacher, class_id] = class_path.split("/");
        if (!teacher || !class_id) {
          await this.remove_invalid(class_path);
          continue;
        }
        // get document for teacher email (first part of path)
        let teacher_ref = doc(db, "classes", teacher);
        let teacher_doc = await getDoc(teacher_ref);
        if (!teacher_doc.exists()) {
          await this.remove_invalid(class_path);
          continue;
        }
        // get classes sub-collection from teacher's doc
        let teacher_classes = collection(teacher_ref, "classes");
        if (!teacher_classes) {
          await this.remove_invalid(class_path);
          continue;
        }
        // get class doc from classes sub-collection
        let subclass_ref = doc(teacher_classes, class_id);
        let subclass_doc = await getDoc(subclass_ref);
        if (!subclass_doc.exists()) {
          await this.remove_invalid(class_path);
          continue;
        }
        // push class to array
        let doc_data = subclass_doc.data();
        doc_data.id = class_path;
        classes.push(doc_data);
      }
      this.classes = classes;
    },
    async remove_invalid(class_id) {
      this.doc.classes = this.doc.classes.filter((c) => c != class_id);
      await this.update_remote();
      new WarningToast("Removed non-existent class with id " + class_id, 2000);
    },
    async remove_class(class_id) {
      this.doc.classes = this.doc.classes.filter((c) => c != class_id);
      await this.update_remote();
      console.warn("Removed class from user's doc: " + class_id);
      new SuccessToast("Removed class", 2000);
    },
    set_user(user) {
      if (!user.email || !validAccount(user.email)) {
        auth.signOut();
        new WarningToast("Please use your MVLA email to log in", 2000);
        this.clear();
        return;
      }
      this.user = user;
      // if teacher, setup this.teacher refs
      if (this.is_teacher) {
        console.warn("teacher mode");
        this.teacher.doc_ref = doc(db, "classes", this.user.email);
        this.teacher.collection_ref = collection(this.teacher.doc_ref, "classes");
      }
      // if router has a redirect, go to it
      if (router.currentRoute?.value?.query?.redirect) {
        router.push(router.currentRoute?.value?.query?.redirect);
      }
    },
    clear() {
      this.user = null;
      this.doc = null;
      this.classes = [];
      this.loaded_email = null;
      this.loaded_classes = null;
      this.teacher = {
        doc_ref: null,
        collection_ref: null,
      };
      // if page requires auth, redirect to home
      if (router.currentRoute?.value?.meta?.requiresAuth) {
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
      let isElectron = navigator?.userAgent?.toLowerCase()?.indexOf(" electron/") > -1;
      // if electron, use redirect, otherwise, use popup
      await (isElectron ? signInWithRedirect(auth, provider) : signInWithPopup(auth, provider))
        .then(() => {
          if (!this.user || !this.user.email || !validAccount(this.user.email)) return;
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
          if (
            error.code == "auth/cancelled-popup-request" ||
            error.code == "auth/popup-closed-by-user"
          ) {
            new WarningToast(cleanError(error), 2000);
          } else {
            new ErrorToast("Couldn't log in", cleanError(error), 2000);
          }
        });
    },
    logout() {
      auth.signOut();
      new Toast("Logged Out", "default", 1500, require("@svonk/util/assets/info-locked-icon.svg"));
    },
    // set document data
    async get_remote() {
      // get doc from firebase
      let doc = await getDoc(this.userdoc_ref);
      if (doc.exists()) {
        this.doc = doc.data();
      } else {
        // if doc doesn't exist, create it
        await this.create_doc();
        await this.get_remote();
      }
    },
    async create_doc() {
      new WarningToast("User document doesn't exist, creating new one...", 2000);
      this.doc = {
        name: this.user.displayName,
        email: this.user.email,
        classes: [],
      };
      if (this.is_teacher) {
        await this.create_teacher_doc();
        new SuccessToast("Created user & teacher documents; Let's get started", 2000);
      } else {
        await this.update_remote();
        new SuccessToast("Created user document; Let's get started", 2000);
        router.push("/portal/onboarding");
      }
      // do onboarding
    },
    async create_teacher_doc() {
      // create teacher doc under (classes/teacher_email@mvla.net) with sub-collection (classes)
      let teacher_ref = doc(db, "classes", this.user.email);
      await setDoc(teacher_ref, {
        name: this.user.displayName,
        email: this.user.email,
      });
      this.teacher = {
        doc_ref: teacher_ref,
        collection_ref: collection(teacher_ref, "classes"),
      };
      router.push("/portal/create");
    },
    async update_remote() {
      // update remote doc
      await setDoc(this.userdoc_ref, this.doc, { merge: true });
    },
    async get_classes_by_email(email) {
      this.loaded_email = null;
      if (!email || !validAccount(email)) {
        this.loaded_classes = null;
        this.loaded_email = email;
        return;
      }
      let classes_maindoc = await getDoc(doc(db, "classes", email));
      if (classes_maindoc.exists()) {
        let classes = [];
        let classes_subcollection = collection(doc(db, "classes", email), "classes");
        let classes_subcollection_query_snapshot = await getDocs(query(classes_subcollection));
        classes_subcollection_query_snapshot.forEach((doc) => {
          let class_data = doc.data();
          class_data.id = doc.id;
          // if user already in class, change name to "[JOINED] name"
          if (this.doc.classes.includes([email, doc.id].join("/"))) {
            class_data.name = "[JOINED] " + class_data.name;
            class_data.is_joined = true;
          }
          classes.push(class_data);
        });
        this.loaded_classes = classes;
      } else {
        this.loaded_classes = null;
      }

      this.loaded_email = email;
    },
    async add_class(teacher_email, class_id, class_name) {
      if (!this.doc) return;
      if (!class_id) return;
      if (this.doc.classes.includes(class_id)) return;
      this.doc.classes.push([teacher_email, class_id].join("/"));
      await this.update_remote();
      new SuccessToast(`Added "${class_name}" to your classes`, 2000);
      // redirect to /portal
      router.push("/portal");
    },
    async create_class(class_obj) {
      console.warn("create_class", class_obj);
      if (!this.is_teacher) {
        new ErrorToast("You need to be a teacher to create a class", 2000);
        return;
      }
      if (!class_obj.name) {
        new ErrorToast("Please enter a class name", 2000);
        return;
      }
      try {
        // check if there is a teacher doc and collection
        if (!this.teacher.doc_ref || !this.teacher.collection_ref) {
          // create teacher doc
          await this.create_teacher_doc();
          // call this again
          await this.create_class(class_obj);
          return;
        }
        // create class doc under teacher.collection_ref
        let class_doc_ref = await addDoc(this.teacher.collection_ref, class_obj);
        // add class to user doc;
        new SuccessToast(`Created class "${class_obj.name}"`, 2000);
        console.log("class_doc_ref", class_doc_ref);
        await this.add_class(this.user.email, class_doc_ref.id, class_obj.name);
      } catch (e) {
        console.error(e);
        new ErrorToast("Couldn't create class", cleanError(e), 2000);
      }
    },
    async add_task(test_obj, test_classes) {
      if (!test_obj.name) {
        new ErrorToast("Please enter a test name", 2000);
        return;
      } else if (!test_classes || test_classes.length == 0) {
        new ErrorToast("Please select at least one class", 2000);
        return;
      }
      // use firebase arrayadd to add test to each class
      let batch = writeBatch(db);
      let collection_ref = collection(db, "classes");
      // get doc ref for user email
      let teacher_doc_ref = doc(collection_ref, this.user.email);
      let teacher_classes_ref = collection(teacher_doc_ref, "classes");
      test_classes.forEach((class_id) => {
        // use this.teacher.collection_ref to get class collection ref, then update the class documents within
        let class_ref = doc(teacher_classes_ref, class_id);
        batch.update(class_ref, {
          tests: arrayUnion(test_obj),
        });
      });
      await batch.commit();
      // rerun get_tests to update local data, discard result
      await this.get_classes();

      new SuccessToast(
        `Added test "${test_obj.name}" to ${test_classes.length} class${
          test_classes.length == 1 ? "" : "es"
        }`,
        2000
      );
      router.push("/portal");
    },
  },
});
