// Path: store/index.js

// setup Pinia store
import { defineStore } from "pinia";
import { _statuslog } from "@/common";
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
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { auth, db, authChangeAction, refreshTimeout } from "../firebase";
import { signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
const provider = new GoogleAuthProvider();

// add email and name to provider
provider.addScope("email");
provider.addScope("profile");
auth.useDeviceLanguage();
// constrict to only mvla.net emails
provider.setCustomParameters({
  login_hint: "username@mvla.net",
  // hd: "mvla.net",
});

// import router
import router from "../router";
function validOrgAccount(userEmail) {
  return userEmail.split("@")[1] == "mvla.net";
}
// get date in local time but with ISO format
let today = new Date();
today = new Date(today.getTime() - today.getTimezoneOffset() * 60 * 1000);
today = today.toISOString().split("T")[0];
// define store
export const useMainStore = defineStore({
  id: "main",
  // store state
  state: () => {
    let state = {};
    // setting up store
    if (
      localStorage.getItem("MVTT_app_state") &&
      localStorage.getItem("MVTT_app_state") != "undefined" &&
      localStorage.getItem("MVTT_app_state") != "null"
    ) {
      try {
        _statuslog("↻ Loading state from local storage");
        state = JSON.parse(localStorage.getItem("MVTT_app_state"));
        return state;
      } catch (err) {
        _statuslog("⟳ Error parsing local storage state", err);
      }
    }
    // if no local storage, set up store
    _statuslog("🔨 Setting up store from scratch");
    return (state = {
      user: null,
      account_doc: null,
      linked_account_doc: null,
      classes: [],
      loaded_email: null,
      loaded_classes: null,
      teacher: {
        doc_ref: null,
        collection_ref: null,
      },
      theme: null,
      personal_account: false,
    });
  },
  // store getters
  getters: {
    linked_accounts() {
      if (!this.user || !this.active_doc) return [];
      // get all linked accounts from doc.linked
      return this.active_doc.linked || [];
    },
    // other
    get_theme() {
      // get local
      let local_theme = this.theme || localStorage.getItem("theme");
      // get userdoc theme
      let account_doc_theme = this.account_doc?.theme;
      // set new to system by default
      let new_theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      // if not userdoc theme, use local theme, and set userdoc theme to local theme
      if (!account_doc_theme) {
        if (local_theme) {
          // set to local if local exists
          new_theme = local_theme;
        } else {
          // set to system if local doesn't exist, and set update local
          localStorage.setItem("theme", new_theme);
        }
        if (this.account_doc) {
          this.account_doc.theme = new_theme;
          this.update_remote();
        }
        return local_theme || "light";
      }
      // if userdoc theme, use userdoc theme, and set local theme to userdoc theme
      else {
        if (local_theme != account_doc_theme) {
          localStorage.setItem("theme", account_doc_theme);
        }
        return account_doc_theme ? account_doc_theme : "light";
      }
    },
    non_recent_signin() {
      // return true if user signed in within the last 24 hours
      if (!this.user) return false;
      let last_signin = this.user?.metadata?.lastSignInTime;
      if (!last_signin) return false;
      last_signin = new Date(last_signin);
      _statuslog("⏲️ Last signed-in: " + last_signin.toLocaleString());
      let diff = new Date().getTime() - last_signin.getTime();
      return diff > 24 * 60 * 60 * 1000;
    },
    recently_joined() {
      // return true if user joined within the last 12 hours
      if (!this.user) return false;
      let creation_time = this.user?.metadata?.creationTime;
      if (!creation_time) return false;
      creation_time = new Date(creation_time);
      let diff = new Date().getTime() - creation_time.getTime();
      return diff < 12 * 60 * 60 * 1000;
    },
    // doc refs
    account_ref() {
      if (!this.user) return null;
      return doc(db, "users", this.user.uid);
    },
    linked_account_ref() {
      if (!this.user || !this.account_doc) return null;
      if (!this.account_doc.linked_to) return null;
      return doc(db, "users", this.account_doc.linked_to);
    },
    get_tasks() {
      // get all the classes with this.classes(), then get all their tasks and combine them into an array
      let tasks = [];
      let classes = this.classes;
      if (!classes?.length) {
        return [];
      }
      for (let i = 0; i < classes.length; i++) {
        let class_tasks = classes[i].tasks;
        class_tasks = class_tasks ? class_tasks : [];
        // add class name and color to each task
        for (let j = 0; j < class_tasks.length; j++) {
          classes[i].name = classes[i].name ? classes[i].name : "Unnamed Class";
          // check task date type and convert to date object if necessary
          if (typeof class_tasks[j].date == "string") {
            // convert to mm-dd-yyyy from yyyy-mm-dd
            let [year, month, day] = class_tasks[j].date.split("-");
            class_tasks[j].date = `${month}-${day}-${year}`;
            class_tasks[j].date = new Date(class_tasks[j].date);
            class_tasks[j].date = isNaN(class_tasks[j].date) ? null : class_tasks[j].date;
          }
          // set color from parent class color
          class_tasks[j].color = classes[i].color;
          tasks.push({
            ...class_tasks[j],
            class_name: classes[i].name,
          });
        }
      }
      return tasks;
    },
    is_teacher() {
      // check if email is a teacher email (ends in @mvla.net) && has letters in the first part
      if (!this.user) return false;
      if (window?.localStorage?.MVTT_teacher_mode == "true") {
        _statuslog("🏫 Teacher mode enabled locally");
        return true;
      }
      let email = this.user.email;
      let [first, last] = email.split("@");
      // return last == "mvla.net" && !/\d/.test(first);
      return last == "mvla.net" && !/\d/.test(first);
    },
    done_daily_survey() {
      if (!this.active_doc) return false;
      if (this.is_teacher) return true;
      let isDone = this.active_doc.done_surveys?.includes(today);
      return isDone;
    },
    active_ref() {
      return this.personal_account ? this.linked_account_ref : this.account_ref;
    },
    active_doc() {
      return this.personal_account ? this.linked_account_doc : this.account_doc;
    },
  },
  actions: {
    set_active(data) {
      if (!data) return;
      if (this.personal_account) {
        this.linked_account_doc = data;
      } else {
        this.account_doc = data;
      }
    },
    async get_linked_account(uid) {
      try {
        if (!uid) throw "No account code provided";
        // get user document from uid
        let linked_doc = await getDoc(doc(db, "users", uid));
        if (!linked_doc.exists()) throw "Account doesn't exist or you haven't been invited";
        let linked_doc_data = linked_doc.data();
        return Promise.resolve(linked_doc_data);
      } catch (err) {
        _statuslog("🔗 Couldn't get linked account", err);
        return Promise.reject(err);
      }
    },
    async link_account_code(code) {
      if (!code) return;
      if (!this.personal_account) {
        new WarningToast("This account is a primary account and cannot be linked", 3000);
        return;
      }
      try {
        let linked_doc = await this.get_linked_account(code);
        if (!linked_doc) throw "Account doesn't exist or you haven't been invited";
        // update remote
        this.account_doc.linked_to = code;
        await this.update_remote();
        new SuccessToast(`Successfully linked to ${linked_doc.name}'s account!`, 4000);
      } catch (err) {
        new ErrorToast("Couldn't link account", err, 2000);
        return Promise.reject(err);
      }
    },
    async link_account(email) {
      if (!this.user || !this.active_doc) return;
      if (this.personal_account) {
        new WarningToast("This account is already linked!", 2000);
      }
      // exclude empty or mvla emails
      if (!email || validOrgAccount(email) || !email.includes("@")) {
        new WarningToast("Please enter a valid non-mvla email", 2000);
        return;
      }
      // check if email is already linked (has entry with matching .email)
      if (this.linked_accounts.includes(email)) {
        new WarningToast("That account is already linked", 2000);
        return;
      }
      // add to doc.linked
      if (!this.active_doc.linked) {
        if (this.personal_account) {
          this.linked_account_doc.linked = [];
        } else {
          this.account_doc.linked = [];
        }
      }

      // add email to queue
      let email_queue = collection(db, "mail");
      try {
        let sent_email = await addDoc(email_queue, {
          to: email,
          cc: this.user.email,
          from: `${this.active_doc.name} via MV Test Tracker <mail@mvtt.app>`,
          fromname: this.active_doc.name + " via MV Test Tracker",
          template: {
            name: "link_invite",
            data: {
              sender_name: this.active_doc.name.split(" ")[0],
              sender_uid: this.user.uid,
            },
          },
        });
        // wait for the email document to have keys .delivery.attempts > 0 and .delivery.error == null
        let email_doc_ref = doc(email_queue, sent_email.id);
        let email_doc = await getDoc(email_doc_ref);
        let checks = 1;
        while (
          !email_doc.exists() ||
          (!!email_doc.data()?.delivery?.attempts == 0 && checks <= 3)
        ) {
          await new Promise((resolve) => setTimeout(resolve, (2 ^ checks) * 2000));
          email_doc = await getDoc(email_doc_ref);
          checks++;
        }
        if (
          !email_doc.data()?.delivery?.info?.accepted?.includes(email) ||
          email_doc.data()?.delivery?.attempts == 0
        ) {
          _statuslog("📧 Email failed to send", email_doc.data());
          throw "Email failed to send";
        }

        // update remote
        if (this.personal_account) {
          this.linked_account_doc.linked.push(email);
        } else {
          this.account_doc.linked.push(email);
        }
        await this.update_remote();
        new SuccessToast(`We notified ${email}, you'll receive a copy of the email too!`, 4000);
        return Promise.resolve();
      } catch (err) {
        new ErrorToast(`Couldn't invite "${email}"`, err, 2000);
        return Promise.reject(err);
      }
    },
    async unlink_account(email) {
      try {
        if (!this.user) return;
        // if exists in userdoc.linked, remove and save
        if (this.active_doc.linked.includes(email)) {
          let filtered_linked = this.active_doc.linked.filter((e) => e != email);
          if (this.personal_account) {
            this.linked_account_doc.linked = filtered_linked;
          } else {
            this.account_doc.linked = filtered_linked;
          }
          await this.update_remote();
          new SuccessToast(`Removed ${email} from your linked accounts`, 2000);
        } else {
          new WarningToast(`${email} is not linked to this account`, 2000);
        }
        Promise.resolve();
      } catch (err) {
        new ErrorToast(`Couldn't unlink "${email}"`, err, 2000);
        return Promise.reject(err);
      }
    },
    refresh_timeout(delay) {
      // refresh listener timeout if user is logged in
      if (!this.user) return;
      refreshTimeout(delay);
    },
    async userLoginPromise() {
      // wait for this.user to be set
      return new Promise((resolve) => {
        let interval = setInterval(() => {
          if (this.user) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
    },
    async save_join_form(responses) {
      // wait for user doc to be created / exist then save responses to doc.join_form
      if (this.personal_account) {
        this.linked_account_doc = this.linked_account_doc || {};
        this.linked_account_doc.join_form = responses;
      } else {
        this.account_doc = this.account_doc || {};
        this.account_doc.join_form = responses;
      }
      await this.update_remote();
    },
    async save_daily_survey(responses) {
      // save responses in /survey/daily/{date}/{uid}
      let survey_ref = doc(db, "survey", "daily", today, this.user.uid);
      let response_obj = {
        time: new Date().getTime(),
        responses: responses,
      };
      await setDoc(survey_ref, response_obj);
      // wait for user login
      if (!this.user) {
        await this.userLoginPromise();
      }
      // update user doc to have date in "done_surveys"
      let updated_surveys = this.active_doc?.done_surveys ? this.active_doc.done_surveys : [];
      updated_surveys.push(today);
      if (this.personal_account) {
        this.linked_account_doc.done_surveys = updated_surveys;
      } else {
        this.account_doc.done_surveys = updated_surveys;
      }

      await this.update_remote();
      new SuccessToast("Saved daily survey", 2000);
    },
    async toggle_theme() {
      this.theme = this.get_theme == "light" ? "dark" : "light";
      localStorage.setItem("theme", this.theme);
      if (this?.account_doc) {
        this.account_doc.theme = this.theme;
        await this.update_remote();
      }
      new SuccessToast(`Switched to ${this.theme} theme`, 2000);
      this.get_theme;
    },
    async get_classes() {
      // check for duplicates
      if (this.active_doc?.classes) {
        let unique = [...new Set(this.active_doc.classes)];
        if (unique.length != this.active_doc.classes.length) {
          if (this.personal_account) {
            this.linked_account_doc.classes = unique;
          } else {
            this.account_doc.classes = unique;
          }
          await this.update_remote();
          new WarningToast("Removed duplicate classes", 2000);
        }
      }
      // get all classes' data and combine into an array
      if (!this.active_doc?.classes) return [];
      let classes = [];
      for (let class_path of this.active_doc.classes) {
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
      // sort classes by period number, then by name
      classes.sort((a, b) => {
        if (a.period == b.period) {
          return a.name.localeCompare(b.name);
        }
        return a.period - b.period;
      });

      this.classes = classes;
    },
    async remove_class_id_helper(class_id) {
      let filtered_classes = this.active_doc.classes.filter((c) => c != class_id);
      if (this.personal_account) {
        this.linked_account_doc.classes = filtered_classes;
      } else {
        this.account_doc.classes = filtered_classes;
      }
      await this.update_remote();
    },
    async remove_invalid(class_id) {
      await this.remove_class_id_helper(class_id);
      new WarningToast(`Removed non-existent class "${class_id}"`, 2000);
    },
    async remove_class(class_id) {
      await this.remove_class_id_helper(class_id);
      _statuslog("🗑️ Removed class from user's doc: " + class_id);
      new SuccessToast("Removed class", 2000);
    },
    set_user(user) {
      // load user doc to check .personal_account
      getDoc(doc(db, "users", user.uid))
        .then((doc) => {
          if (doc.exists()) {
            this.account_doc = doc.data();
            this.personal_account = this.account_doc?.personal_account;
          } else {
            this.account_doc = null;
            this.linked_account_doc = null;
            this.personal_account = false;
          }
          if (
            !user.email ||
            (!validOrgAccount(user.email) &&
              !this.personal_account &&
              !(this.account_doc?.personal_account && this.account_doc?.linked_to))
          ) {
            auth.signOut();
            new WarningToast("Please use your MVLA email to log in", 2000);
            this.clear();
            return;
          }
          this.user = user;
          // if this is a personal account, get the associated linked account doc
          if (this.personal_account) {
            this.get_remote();
          }
          // if teacher, setup this.teacher refs
          if (this.is_teacher) {
            _statuslog("🏫 Running in teacher mode");
            this.teacher.doc_ref = doc(db, "classes", this.user.email);
            this.teacher.collection_ref = collection(this.teacher.doc_ref, "classes");
          }
          // if router has a redirect, go to it
          if (
            router.currentRoute?.value?.query?.redirect &&
            !router.currentRoute?.value?.meta?.blockStandardRedirect
          ) {
            router.replace(router.currentRoute?.value?.query?.redirect);
          }
        })
        .catch(() => {
          auth.signOut();
          new WarningToast("Something went wrong loading your user data", 2000);
        });
    },
    clear() {
      this.user = null;
      this.account_doc = null;
      this.linked_account_doc = null;
      this.classes = [];
      this.loaded_email = null;
      this.loaded_classes = null;
      this.personal_account = false;
      this.teacher = {
        doc_ref: null,
        collection_ref: null,
      };
      localStorage.removeItem("MVTT_app_state");
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
          if (!this.user || !this.user.email || !validOrgAccount(this.user.email)) return;
          new Toast(
            "Logged in as " + this.user.displayName + "!",
            "default",
            2000,
            require("@svonk/util/assets/info-unlocked-icon.svg")
          );
          _statuslog("🔑 Logged in as " + this.user.displayName);
          authChangeAction(this.user);
          if (
            !router.currentRoute?.value?.query?.redirect &&
            !router.currentRoute?.value?.meta?.blockStandardRedirect
          ) {
            router.push("/portal");
          }
          return Promise.resolve();
        })
        .catch((error) => {
          let err = cleanError(error);
          if (
            error.code == "auth/cancelled-popup-request" ||
            error.code == "auth/popup-closed-by-user"
          ) {
            new WarningToast(err, 2000);
          } else {
            new ErrorToast("Couldn't log in", err, 2000);
          }
          return Promise.reject(err);
        });
    },
    async login_personal() {
      new Toast(
        "Opening login popup...",
        "default",
        1000,
        require("@svonk/util/assets/info-locked-icon.svg")
      );
      // create new provider with no hd
      let personal_provider = new GoogleAuthProvider();
      personal_provider.addScope("email");
      personal_provider.addScope("profile");
      // sign in with google, then set user data
      let isElectron = navigator?.userAgent?.toLowerCase()?.indexOf(" electron/") > -1;
      // if electron, use redirect, otherwise, use popup
      await (isElectron
        ? signInWithRedirect(auth, personal_provider)
        : signInWithPopup(auth, personal_provider)
      )
        .then(() => {
          if (!this.user || !this.user.email || validOrgAccount(this.user.email)) return;
          new Toast(
            "Logged in as " + this.user.displayName + "!",
            "default",
            2000,
            require("@svonk/util/assets/info-unlocked-icon.svg")
          );
          _statuslog("🔑 Logged in as " + this.user.displayName);
          authChangeAction(this.user);
          return Promise.resolve();
        })
        .catch((err) => {
          new ErrorToast("Couldn't log in", err, 2000);
          return Promise.reject(err);
        });
    },
    logout() {
      auth.signOut();
      this.clear();
      new Toast("Logged Out", "default", 1500, require("@svonk/util/assets/info-locked-icon.svg"));
    },
    // set document data
    async get_remote() {
      // get doc from firebase
      let active_doc = await getDoc(this.account_ref);
      if (active_doc.exists()) {
        this.set_active(active_doc.data());
      } else if (this.personal_account) {
        // linked account doesn't exist
        _statuslog("🔗 Linked account doesn't exist, removing it and going home");
        new WarningToast("Linked account doesn't exist, removing it and going home", 2000);
        this.account_doc.linked_to = null;
        await this.update_wrapper_acc_doc();
        this.linked_account_doc = null;
        router.push("/");
      } else {
        // if doc doesn't exist, create it
        await this.create_doc();
        await this.get_remote();
      }
    },
    async create_doc() {
      _statuslog("📄 User document doesn't exist, creating new one...");
      new WarningToast("User document doesn't exist, creating new one...", 2000);
      this.account_doc = {
        name: this.user.displayName,
        email: this.user.email,
        classes: [],
        theme: this.get_theme,
      };
      if (this.personal_account) {
        this.account_doc = {
          linked_to: null,
          personal_account: true,
          name: this.user.displayName,
          email: this.user.email,
        };
      }
      if (this.is_teacher) {
        await this.create_teacher_doc();
        new SuccessToast("Created user & teacher documents; Let's get started", 2000);
      } else {
        await this.update_remote();
        new SuccessToast("Created user document; Let's get started", 2000);
        if (!this.personal_account) {
          router.push("/portal/onboarding");
        }
      }
      // do onboarding
    },
    async create_teacher_doc() {
      // create teacher doc under (classes/teacher_email@mvla.net) with sub-collection (classes)
      let teacher_ref = doc(db, "classes", this.active_doc.email || this.user.email);
      await setDoc(teacher_ref, {
        name: this.active_doc.name || this.user.displayName,
        email: this.active_doc.email || this.user.email,
      });
      this.teacher = {
        doc_ref: teacher_ref,
        collection_ref: collection(teacher_ref, "classes"),
      };
      router.push("/portal/create");
    },
    async update_remote() {
      // update remote doc
      await setDoc(this.active_ref, this.active_doc, { merge: true });
      _statuslog("⏶ Pushed changes to remote");
    },
    async update_wrapper_acc_doc() {
      await setDoc(this.account_ref, this.account_doc, { merge: true });
    },
    async get_classes_by_email(email) {
      this.loaded_email = null;
      if (!email || !validOrgAccount(email)) {
        this.loaded_classes = null;
        this.loaded_email = email;
        return;
      }
      let classes_maindoc = await getDoc(doc(db, "classes", email));
      if (classes_maindoc.exists()) {
        let classes = [];
        let classes_subcollection = collection(doc(db, "classes", email), "classes");
        let classes_subcollection_query_snapshot = await getDocs(query(classes_subcollection));
        classes_subcollection_query_snapshot.forEach((class_doc) => {
          let class_data = class_doc.data();
          class_data.id = class_doc.id;
          // support for legacy names
          class_data.name =
            (class_data.period ? "P" + class_data.period + " - " : "") + class_data.name;
          class_data.is_joined = true;
          // if user already in class, change name to "[JOINED] name"
          if (this.active_doc?.classes.includes([email, class_doc.id].join("/"))) {
            class_data.name = "[JOINED] " + class_data.name;
          }
          classes.push(class_data);
        });
        this.loaded_classes = classes;
      } else {
        this.loaded_classes = null;
      }

      this.loaded_email = email;
    },
    async add_class(teacher_email, class_id, class_name, class_period) {
      if (!this.active_doc?.classes) return;
      if (!class_id) return;
      console.log(class_id);
      let class_key = [teacher_email, class_id].join("/");
      if (this.active_doc.classes.includes(class_key)) return;
      if (this.personal_account) {
        this.linked_account_doc.classes.push(class_key);
      } else {
        this.account_doc.classes.push(class_key);
      }
      await this.update_remote();
      new SuccessToast(`Added "P${class_period} - ${class_name}" to your classes`, 2000);
      // return new success promise
      return Promise.resolve();
    },
    async create_class(class_obj) {
      _statuslog("🔨 Creating class", class_obj);
      if (!this.is_teacher) {
        new ErrorToast("You need to be a teacher to create a class", 2000);
        return;
      }
      if (!class_obj.name || !class_obj.period) return; // handled in disabled attr of button, failsafe for db
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
        _statuslog("🏫 class_doc_ref", class_doc_ref);
        await this.add_class(
          this.active_doc.email || this.user.email,
          class_doc_ref.id,
          class_obj.name,
          class_obj.period
        );
      } catch (e) {
        new ErrorToast("Couldn't create class", cleanError(e), 2000);
      }
    },
    async add_task(test_obj, test_classes) {
      try {
        if (!test_obj.name) {
          new ErrorToast("Please enter a test name", 2000);
          return;
        } else if (!test_classes || test_classes.length == 0) {
          new ErrorToast("Please select at least one class", 2000);
          return;
        }
        // use firebase array add to add test to each class
        let batch = writeBatch(db);
        let collection_ref = collection(db, "classes");
        // get doc ref for user email
        let teacher_doc_ref = doc(collection_ref, this.user.email);
        let teacher_classes_ref = collection(teacher_doc_ref, "classes");
        test_classes.forEach((class_id) => {
          // fix any class_id that has the teacher email in it
          let displayed_class_id = class_id;
          class_id = class_id.split("/")[class_id.split("/").length - 1];
          // use this.teacher.collection_ref to get class collection ref, then update the class documents within
          let class_ref = doc(teacher_classes_ref, class_id);
          test_obj.class_id = displayed_class_id;
          batch.update(class_ref, {
            tasks: arrayUnion(test_obj),
          });
        });
        await batch.commit();
        // rerun get_tasks to update local data, discard result
        await this.get_classes();

        new SuccessToast(
          `Added test "${test_obj.name}" to ${test_classes.length} class${
            test_classes.length == 1 ? "" : "es"
          }`,
          2000
        );
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async delete_task(test_obj) {
      // retrieve class reference
      let initial_class_id = test_obj.class_id;
      let class_id = initial_class_id.split("/")[initial_class_id.split("/").length - 1];
      let class_ref = doc(this.teacher.collection_ref, class_id);

      // create removable object and customize date string

      let removed_object = {
        class_id: test_obj.class_id,
        date: new Date(test_obj.date).toISOString().split("T")[0],
        description: test_obj.description,
        name: test_obj.name,
        type: test_obj.type,
      };

      // remove task
      await updateDoc(class_ref, {
        tasks: arrayRemove(removed_object),
      });
      // rerun get_tasks to update local data
      await this.get_classes();
      new SuccessToast(`Removed task "${test_obj.name}"`, 2000);

      // return user to portal screen
      router.push("/portal");
    },
  },
});
