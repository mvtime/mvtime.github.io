/**
 * Group of stores that handle page-inspecific data and methods
 * @namespace store
 */

/**
 * The main store for the app, with most primary data and methods needed to function
 * @file store/index.js
 * @namespace .main
 * @memberOf store
 */

// setup Pinia store
import { defineStore } from "pinia";
import { _status, compatDateObj } from "@/common";
import { Toast, ErrorToast, cleanError, WarningToast, SuccessToast } from "@svonk/util";

// get firebase requirements
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  writeBatch,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import CryptoJS from "crypto-js";
import { auth, db, authChangeAction, refreshTimeout } from "../firebase";
import { signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
const provider = new GoogleAuthProvider();
const isElectron = navigator?.userAgent?.toLowerCase()?.indexOf(" electron/") > -1;
let ORG_DOMAIN = `@${process.env.VUE_APP_ORG_DOMAIN}`;
// add email and name to provider
provider.addScope("email");
provider.addScope("profile");
auth.useDeviceLanguage();
// constrict to only ORG_DOMAIN emails
provider.setCustomParameters({
  login_hint: "username" + ORG_DOMAIN,
  // hd: ORG_DOMAIN,
});

// import router
import router from "@/router";
import { useMagic } from "./magic";
function validOrgAcc(userEmail) {
  return userEmail?.split("@")[1] == ORG_DOMAIN.substring(1);
}
function isIFrame() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
// get date in local time but with ISO format
let today = new Date();
today = new Date(today.getTime() - today.getTimezoneOffset() * 60 * 1000);
today = today.toISOString().split("T")[0];
// define store
export const useMainStore = defineStore({
  id: "main",
  /** Function to create a clean store state, used for initialization. Will attempt to load from window.localStorage variable to save on firebase calls -> isn't always stable after app update that changes state keyings */
  state: () => {
    let state = {};
    // setting up store
    let local = window.localStorage.getItem(`${process.env.VUE_APP_BRAND_SHORT_NAME}_app_state`);
    if (local && local != "undefined" && local != "null") {
      try {
        _status.log("↻ State from local storage");
        state = JSON.parse(local);
        state.paused = false;
        state.logout_prompt = false;
        return state;
      } catch (err) {
        _status.warn("⟳ Error parsing local storage state", err);
      }
    }
    // if no local storage, set up store
    _status.log("🔨 Setting up store from scratch");
    /**
     * @namespace .main.state
     * @description The state of the main store
     * @memberOf .main
     */
    /* Set default store state */
    return (state = {
      /**
       * @memberOf .main.state
       * @property {Object} user The user object from firebase auth
       * @default null
       */
      user: null,
      /**
       * @memberOf .main.state
       * @property {Object} account_doc The authenticated user's document from the users collection in firestore
       * @default null
       * @see {@link active_doc}
       */
      account_doc: null,
      /**
       * @memberOf .main.state
       * @property {Object} linked_account_doc The linked account document from the users collection in firestore
       * @default null
       * @see {@link active_doc}
       */
      linked_account_doc: null,
      /**
       * @memberOf .main.state
       * @property {Array} classes Collection of the firebase document ids of classes that the user is in
       * @default []
       * @see {@link fetch_classes}
       * @see {@link get_tasks}
       * @see {@link tasks}
       */
      classes: [],
      /**
       * @memberOf .main.state
       * @property {Array} tasks Collection of the processed task objects
       * @default []
       * @see {@link get_tasks}
       */
      tasks: [],
      /**
       * @memberOf .main.state
       * @property {String} loaded_email The email of the user that the classes have been loaded for (for previews in AddClass.vue)
       * @default null
       * @see {@link loaded_classes}
       * @see {@link fetch_classes_by_email}
       */
      loaded_email: null,
      /**
       * @memberOf .main.state
       * @property {Array} loaded_classes The classes that have been loaded for the loaded_email (for previews in AddClass.vue)
       * @default null
       * @see {@link loaded_email}
       * @see {@link fetch_classes_by_email}
       */
      loaded_classes: null,
      /**
       * @memberOf .main.state
       * @property {Object} teacher The teacher object, with doc_ref and collection_ref
       * @default {doc_ref: null, collection_ref: null}
       * @see {@link is_teacher}
       * @see {@link create_teacher_doc}
       */
      teacher: {
        doc_ref: null,
        collection_ref: null,
      },
      /**
       * @memberOf .main.state
       * @property {Object} theme The theme of the app, either "light" or "dark"
       * @default null
       * @see {@link get_theme}
       * @see {@link toggle_theme}
       * @see {@link clear}
       * @note This is a local variable, and is while it may reflect what's in the user's document, it's not always accurate, though it is preferred locally, and persists across sessions / store {@link clear}s
       */
      theme: null,
      /**
       * @memberOf .main.state
       * @property {Boolean} personal_account If the user is using their personal account (true) or a valid org account (false)
       * @default false
       * @see {@link linked_account_doc}
       * @see {@link linked_account_ref}
       * @see {@link active_doc}
       * @see {@link active_ref}
       */
      personal_account: false,
      /**
       * @memberOf .main.state
       * @property {Boolean} paused If the app is paused (true) or not (false)
       * @default false
       * @see {@link show_timeout}
       * @see {@link hide_timeout}
       */
      paused: false,
      /**
       * @memberOf .main.state
       * @property {Boolean} logout_prompt If the app is showing a logout prompt (true) or not (false)
       * @default false
       */
      logout_prompt: false,
    });
  },
  /** The getters to get data that's based off of the store state, but requires manipulation
   * @namespace .main.getters
   * @memberof .main
   */
  getters: {
    /**
     * @memberOf .main.getters
     * @function ORG_DOMAIN
     * @description Get the domain of the organization (@domain.tld)
     * @returns {String} The domain of the organization
     */
    ORG_DOMAIN() {
      return ORG_DOMAIN;
    },
    /**
     * @memberOf .main.getters
     * @function simplified
     * @description Get if the user is using a simplified view (true) or not (false)
     * @returns {Boolean} If the user is using a simplified view
     */
    simplified() {
      return this.account_doc?.prefs?.simplified || false;
    },
    /**
     * @memberOf .main.getters
     * @function linked_accounts
     * @description Get all linked accounts from active_doc.linked
     * @returns {Array} Array of linked account emails
     * @default []
     */
    linked_accounts() {
      if (!this.user || !this.active_doc) return [];
      // get all linked accounts from doc.linked
      return this.active_doc.linked || [];
    },
    /**
     * @memberOf .main.getters
     * @function upcoming
     * @description et the upcoming tasks (after 8AM today)
     * @returns {Array} Array of upcoming tasks
     * @default []
     * @see {@link tasks}
     * @see {@link upcoming_todo}
     * @note Doesn't include notes
     */
    upcoming() {
      if (!this.tasks) return [];
      const now = Date.now(); // new Date().setHours(0, 0, 0, 0);
      // 8 hours in ms (show today's tasks as upcoming until 8AM)
      const morning = 8 * 60 * 60 * 1000;
      let upcoming = this.tasks.filter((task) => {
        return (
          task.type != "note" && (task?.date?.getTime ? task.date.getTime() : 0) >= now - morning
        );
      });
      upcoming.sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
      });
      return upcoming;
    },
    /**
     * @memberOf .main.getters
     * @function upcoming_todo
     * @description Get the upcoming tasks (after 8AM today) that havent been marked as done
     * @returns {Array} Array of upcoming tasks
     * @default []
     * @see {@link tasks}
     * @see {@link upcoming}
     * @note Doesn't include notes
     */
    upcoming_todo() {
      if (!this.upcoming) return [];
      return this.upcoming.filter((task) => !this.finished_tasks?.includes(task.ref));
    },
    /**
     * @memberOf .main.getters
     * @function non_recent_signin
     * @description Check if user signed in within the last 24 hours
     * @returns {Boolean} if the user's session started within the last 24 hours
     * @default false
     */
    non_recent_signin() {
      // return true if user signed in within the last 24 hours
      if (!this.user) return false;
      let last_signin = this.user?.metadata?.lastSignInTime;
      if (!last_signin) return false;
      last_signin = new Date(last_signin);
      let diff = new Date().getTime() - last_signin.getTime();
      return diff > 24 * 60 * 60 * 1000;
    },
    /**
     * @memberOf .main.getters
     * @function recently_joined
     * @description Check if user joined within the last 12 hours
     * @returns {Boolean} if the user's account was created within the last 12 hours
     * @default false
     */
    recently_joined() {
      // return true if user joined within the last 12 hours
      if (!this.user) return false;
      let creation_time = this.user?.metadata?.creationTime;
      if (!creation_time) return false;
      creation_time = new Date(creation_time);
      let diff = new Date().getTime() - creation_time.getTime();
      return diff < 12 * 60 * 60 * 1000;
    },
    /**
     * @memberOf .main.getters
     * @function is_admin
     * @description Check if user is a admin - currently true for all users for testing purposes TODO
     * @returns {Boolean} if the user is an admin
     * @default false
     */
    //TODO: update this to use actual permissions
    is_admin() {
      return this.is_teacher;
    },
    /**
     * @memberOf .main.getters
     * @function is_teacher
     * @description Check if user is a teacher, or is in teacher mode locally (for testing)
     * @returns {Boolean} if the user is a teacher
     * @default false
     */
    is_teacher() {
      // check if email is a teacher email (ends in this.ORG_DOMAIN) && has letters in the first part
      if (!this.user) return false;
      if (
        this.active_doc?.teacher_mode == true ||
        window?.localStorage?.[`${process.env.VUE_APP_BRAND_SHORT_NAME}_teacher_mode`] == "true"
      ) {
        if (this.active_doc?.teacher_mode == true || this.active_doc?.teacher_mode == null) {
          window.localStorage.setItem(`${process.env.VUE_APP_BRAND_SHORT_NAME}_teacher_mode`, true);
          if (this.personal_account) {
            _status.log("🏫 No teacher mode for personal account");
            return false;
          } else {
            _status.log("🏫 Local teacher mode");
            return true;
          }
        } else {
          window.localStorage.setItem(
            `${process.env.VUE_APP_BRAND_SHORT_NAME}_teacher_mode`,
            false
          );
          _status.log("🏫 Teacher mode disabled locally to reflect remote changes");
        }
      }

      let email = this.user.email;
      let [first, last] = email.split("@");
      //TODO: add .env option for teacher/student pattern
      if ("@" + last == this.ORG_DOMAIN && !/\d/.test(first) && this.ORG_DOMAIN == "@mvla.net") {
        _status.log("🏫 Teacher mode enabled for non-student district account");
        return true;
      } else {
        return false;
      }
    },
    /**
     * @memberOf .main.getters
     * @function done_daily_survey
     * @description Check if user has completed the daily survey, or is a teacher
     * @returns {Boolean} if the user / proxy for the user has completed the join form
     * @default false
     * @see {@link save_daily_survey}
     * @note Returns true if user is a teacher, since we're not tracking data for them
     */
    done_daily_survey() {
      if (!this.done_tutorial) return true;
      if (!this.active_doc) return false;
      if (this.active_doc?.prefs?.skip_survey || process.env.VUE_APP_NOSURVEY) {
        _status.log(
          `📃 Skipping survey from {${
            this.active_doc?.prefs?.skip_survey ? "user prefs" : ".env"
          }} override`
        );
        return "skipped";
      }
      // if (this.is_teacher) return true;
      return this.active_doc?.done_surveys && this.active_doc.done_surveys?.includes(today);
    },
    /**
     * @memberOf .main.getters
     * @function done_tutorial
     * @description Check if user has completed the tutorial
     * @returns {Boolean} if the user / proxy for the user has completed the tutorial
     * @default false
     */
    done_tutorial() {
      if (!this.account_doc) return false;
      return this.account_doc?.done_tutorial;
    },
    /**
     * @memberOf .main.getters
     * @function done_join_form
     * @description Check if user has completed the join form
     * @returns {Boolean} if the user / proxy for the user has completed the join form
     * @default false
     */
    done_join_form() {
      if (!this.user) return false;
      return !!this.active_doc?.join_form;
    },
    /**
     * @memberOf .main.getters
     * @function account_ref
     * @description Get the user's absolute document reference (the signed-in account, even if it's a linked account)
     * @returns {Object} The firebase document reference for the user's account
     * @default null
     */
    account_ref() {
      if (!this.user) return null;
      return doc(db, "users", this.user.uid);
    },
    /**
     * @memberOf .main.getters
     * @function linked_account_ref
     * @description Get the user's linked account document reference (the account that the user is linked to, if it exists)
     * @returns {Object} The firebase document reference for the user's linked account
     * @default null
     */
    linked_account_ref() {
      if (!this.user || !this.account_doc) return null;
      if (!this.account_doc.linked_to) return null;
      return doc(db, "users", this.account_doc.linked_to);
    },
    /**
     * @memberOf .main.getters
     * @function active_ref
     * @description Get the user's active document reference (the signed-in account's doc ref, or the linked account's if it exists)
     * @returns {Object} The firebase document reference for the user's active account
     * @default null
     */
    active_ref() {
      return this.personal_account ? this.linked_account_ref : this.account_ref;
    },
    /**
     * @memberOf .main.getters
     * @function active_doc
     * @description Get the user's active document (the signed-in account's doc, or the linked account's if it exists)
     * @returns {Object} The local copy of the document being used for dashboard data
     * @default null
     * @see {@link active_ref}
     */
    active_doc() {
      return this.personal_account ? this.linked_account_doc : this.account_doc;
    },
    /**
     * @memberOf .main.getters
     * @function get_theme
     * @description Get theme from local storage or user doc
     * @returns {String} "light" or "dark"
     * @default "light"
     */
    get_theme() {
      // get local
      let local_theme = this.theme || window.localStorage.getItem("theme");
      // get userdoc theme
      let account_doc_theme = this.account_doc?.prefs?.theme;
      // set new to system by default
      let new_theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      // if not userdoc theme, use local theme, and set userdoc theme to local theme
      if (!account_doc_theme) {
        if (local_theme) {
          // set to local if local exists
          new_theme = local_theme;
        } else {
          // set to system if local doesn't exist, and set update local
          window.localStorage.setItem("theme", new_theme);
        }
        if (this.account_doc) {
          this.account_doc.prefs = { ...this.account_doc.prefs, theme: new_theme };
          this.update_wrapper_acc_doc();
        }
        return local_theme || "light";
      }
      // if userdoc theme, use userdoc theme, and set local theme to userdoc theme
      else {
        if (local_theme != account_doc_theme) {
          window.localStorage.setItem("theme", account_doc_theme);
        }
        return account_doc_theme ? account_doc_theme : "light";
      }
    },
    /**
     * @memberOf .main.getters
     * @function get_loaded_classes
     * @description Get the classes that have been loaded for the loaded_email, and set the .is_joined property on each
     * @returns {Array} Array of classes that have been loaded for the loaded_email
     * @default []
     * @see {@link loaded_classes}
     * @see {@link loaded_email}
     * @see {@link fetch_classes_by_email}
     */
    get_loaded_classes() {
      if (!this.loaded_classes || !this.loaded_classes.length) return [];
      let classes = this.loaded_classes;
      return classes.map((class_obj) => {
        class_obj.is_joined = this.active_doc?.classes?.includes(
          [this.loaded_email, class_obj?.id].join("/")
        );
        return class_obj;
      });
    },
    /**
     * @memberOf .main.getters
     * @function finished_tasks
     * @description return all the finished tasks
     * @returns {Boolean} If the task is finished or not
     * @default false
     * @see {@link set_finished}
     */
    finished_tasks() {
      try {
        if (!this.active_doc) throw "No active doc";
        return this.active_doc.finished || [];
      } catch (err) {
        _status.warn("🔗 Couldn't get finished tasks", err);
      }
    },
    /**
     * @memberOf .main.getters
     * @function notes
     * @description return all the notes in a dictionary with the ref as the key
     * @returns {Object} Dictionary of notes with refs as keys
     * @default {}
     */
    notes() {
      try {
        if (!this.active_doc) throw "No active doc";
        return this.active_doc.notes || {};
      } catch (err) {
        _status.warn("🔗 Couldn't get notes", err);
        return {};
      }
    },
  },
  /** The actions to manipulate the store state
   * @namespace .main.actions
   */
  actions: {
    /**
     * @memberOf .main.actions
     * @function report_logs
     * @description save logs to server for debugging later, with some session data attached
     * @returns {Promise}
     */
    report_logs() {
      try {
        // get stream types
        const streamObj = _status.getStream();
        const streamText = _status.textStream();

        // write to new firebase doc in db/logs/ and save the ID
        const docRef = doc(collection(db, "logs"));

        setDoc(docRef, {
          date: new Date(),
          date_inversed: new Date().getTime() * -1,
          user: this.user ? this.user.uid : "no user",
          email: this.user ? this.user.email : "no user",
          stream: {
            json: streamObj,
            text: streamText,
          },
        });

        new SuccessToast("Logs reported and saved locally, check console for details", 3500);
        _status.log(`📊 Reported logs to serve as '${docRef.id}'`);

        // save to disk
        void _status.saveStream(docRef.id);

        return Promise.resolve(docRef.id);
      } catch (err) {
        return Promise.reject("Failed to report logs:" + err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function class_text
     * @description get the smart text associated with a given class
     * @param {String} class_obj
     * @returns {String} text - the formatted name text associated with the class data
     */
    class_text(class_obj) {
      if (!class_obj) return;
      if (class_obj.period) return `P${class_obj.period} - ${class_obj.name}`;
      return class_obj.name;
    },
    /**
     * @memberOf .main.actions
     * @function set_account_pref
     * @description Set a preference in the account doc
     * @param {String} pref The preference to set
     * @param {String} value The value to set the preference to
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     */
    async set_account_pref(pref, value) {
      try {
        if (!this.account_ref) throw "No account doc";
        if (!pref) throw "No pref provided";
        await this.update_wrapper_with_merge({
          prefs: { ...this.active_doc.prefs, [pref]: value },
        });
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function get_surveys
     * @description Get the survey data for the given dates for this user
     * @param {Array} dates Array of dates to get the survey data for
     * @returns {Array} The survey data for the given dates, with date objects added to each object
     * @see {@link save_daily_survey}
     * @see {@link done_daily_survey}
     */
    get_surveys(dates) {
      // get all the firebase surveys in "/survey/{date}/{uid}" format, in parallel
      try {
        let survey_refs = dates.map((date) =>
          doc(
            db,
            "survey",
            "daily",
            date,
            this.personal_account ? this.account_doc.linked_to : this.user.uid
          )
        );
        let survey_promises = survey_refs.map((ref) => getDoc(ref));
        return Promise.all(survey_promises).then((survey_docs) => {
          // convert each survey doc to an object with date and data
          let surveys = survey_docs.map((doc, i) => {
            if (!doc.exists()) return { date: dates[i], error: "No survey data for this date" };
            return { date: dates[i], data: doc.data() };
          });
          return Promise.resolve(surveys);
        });
      } catch (err) {
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function get_cached_surveys
     * @description Get the survey data for the given dates for this user, using the cached data in the active doc. If the data does not include the given dates, get the data from the server and save it to use as the cashe
     * @param {Array} dates Array of dates to get the survey data for
     * @returns {Promise} Promise resolving to survey data for the given dates, with date objects added to each object
     * @see {@link save_daily_survey}
     * @see {@link done_daily_survey}
     */
    async get_cached_surveys(dates, force_refresh = false) {
      try {
        const processed_ref = doc(
          db,
          "processed_surveys",
          this.personal_account ? this.account_doc.linked_to : this.user.uid
        );
        // check if active doc has survey data for the given dates, and if so, return it
        const current_get = await getDoc(processed_ref);

        const current = current_get.exists() ? current_get.data()?.list || [] : [];
        // get array of all the dates by mapping
        const current_dates = current?.map((e) => e.date);
        const errored_dates = current?.filter((e) => e.error)?.map((e) => e.date) || [];
        // check if current_dates includes all the dates
        const all_dates = dates.every((e) => current_dates.includes(e));

        // if has all, return the cashed data
        if (all_dates && !force_refresh) {
          _status.log("📊 Using cached surveys");
          return Promise.resolve(current);
        }

        // if not, get the survey data for the given dates, and save it to the active doc
        else {
          if (force_refresh) _status.log("📊 Forcing refresh of surveys");
          // identify which dates are missing if !force_refresh
          const added_dates = force_refresh
            ? dates
            : dates.filter((e) => !current_dates.includes(e) || errored_dates.includes(e));
          // use get_surveys to get the ungotten data
          const added_surveys = await this.get_surveys(added_dates);
          // add the new surveys to the current surveys without doubling up, keep them in order
          let new_surveys = [];
          for (let date of dates) {
            if (added_dates.includes(date)) {
              // add the new survey
              new_surveys.push(added_surveys[added_dates.indexOf(date)]);
            } else {
              // add the old survey
              new_surveys.push(current[current_dates.indexOf(date)]);
            }
          }

          // add the surveys to the active doc
          await setDoc(processed_ref, { list: new_surveys, updated: Date.now() }, { merge: true });
          _status.log("📊 Got surveys from server");
          return Promise.resolve(new_surveys);
        }
      } catch (err) {
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function note_for
     * @description Get the note for the given ref
     * @param {String} note The note to set
     * @param {String} ref The ref of the task to get the note for
     * @returns {String} The note for the given ref
     * @see {@link set_note}
     * @see {@link notes}
     */
    note_for(ref) {
      return (this.notes && this.notes[this.ref_to_path(ref)]) || null;
    },
    /**
     * @memberOf .main.actions
     * @function set_note
     * @description set a task with the given path to have a note in the keyed "notes" property of the active doc (remove if value is falsey, add note if truthy)
     * @param {String} note The note to set
     * @param {String} ref The ref of the task to set the note for
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     * @see {@link note_for}
     * @see {@link notes}
     */
    async set_note(note, ref) {
      try {
        if (!this.active_doc) throw "No active doc";
        if (!ref) throw "No ref provided";
        let path = this.ref_to_path(ref);
        let doc = this.active_doc;
        if (!doc.notes) {
          doc.notes = {};
        }

        doc.notes[path] = note || null;

        this.set_active(doc);
        await this.update_remote();
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function set_finished
     * @description set a task with the given ref to finished in the finished array of the active doc (remove if finished is false, add path if finished is true)
     * @param {Boolean} finished The finished status to set
     * @param {String} ref The ref of the task to check
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     * @see {@link is_finished}
     */
    async set_finished(finished, ref) {
      try {
        if (!this.active_doc) throw "No active doc";
        if (!ref) throw "No reference(s) provided";
        let paths = Array.isArray(ref) ? ref : [ref];
        let doc = this.active_doc;
        if (!doc.finished) {
          doc.finished = [];
        }
        // if finished, add to finished array, else remove from finished array
        if (finished) {
          for (let p of paths) {
            if (!doc.finished.includes(p)) {
              doc.finished.push(p);
            }
          }
        } else {
          doc.finished = doc.finished.filter((p) => !paths.includes(p));
        }

        this.set_active(doc);
        await this.update_remote();

        new SuccessToast(
          (paths.length > 1
            ? "Tasks"
            : useMagic().done_prefix(this.tasks.find((e) => e.ref == paths[0]))) +
            (finished ? " marked as finished" : " marked as unfinished"),
          2000
        );

        return Promise.resolve();
      } catch (err) {
        new ErrorToast(
          `Task(s) could not be ${finished ? "marked as finished" : "marked as unfinished"}`,
          err,
          2000
        );
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function path_to_ref
     * @description Convert a path to a ref (email~class_id?~task_id)
     * @param {String} path The path to convert
     * @returns {String} The ref (email~class_id?~task_id)
     * @default null
     */
    path_to_ref() {
      //join all args with "/" and let path equal that
      let path = [...arguments].join("/");
      if (!path.length) return null;
      let [_email, _id, task_id] = path.split("/");
      if (!_email || !_id) return null;
      _email = _email.split("@")[0];
      return task_id ? `${_email}~${_id}~${task_id}` : `${_email}~${_id}`;
    },
    /**
     * @memberOf .main.actions
     * @function ref_to_path
     * @description Convert a ref to a path (email/class_id?/task_id)
     * @param {String} path The path to convert
     * @returns {String} The ref (email/class_id?/task_id)
     * @default null
     */
    ref_to_path() {
      //join all args with "/" and let path equal that
      let ref = [...arguments].join("~");
      if (!ref.length) return null;
      let [_email, _id, task_id] = ref.split("~");
      if (!_email || !_id) return null;
      _email += this.ORG_DOMAIN;
      return task_id ? `${_email}/${_id}/${task_id}` : `${_email}/${_id}`;
    },
    /**
     * @memberOf .main.actions
     * @function code_from_ref_helper
     * @param {String} ref ref in email/uid format
     * @returns {String} 6-character code from ref
     * @see {@link code_from_ref}
     */
    hash(ref) {
      let hash = CryptoJS.SHA256(ref).toString();
      return hash.substring(0, 5);
    },
    /**
     * @memberOf .main.actions
     * @function code_from_ref
     * @description Create a proxy code from a ref (email/uid)
     * @param {String} ref ref in email/uid format
     * @see {@link hash}
     */
    async code_from_ref(ref) {
      try {
        if (!ref) return Promise.reject("No ref provided");
        // fix ref to be in email@ORG_DOMAIN/uid
        // - fix for different formats
        ref = ref.split("~").join("/");
        // - remove domain from email and re-add
        let [_email, _id] = ref.split("/");
        if (!_email || !_id) return Promise.reject("Invalid ref");
        _email = _email.split("@")[0] + this.ORG_DOMAIN;
        ref = _email + "/" + _id;

        // get code
        const code = this.hash(ref);

        // check if class object already has code in this.classes
        let class_obj = this.classes.find((e) => e.id == ref);
        if (class_obj?.code !== code) {
          // add ref to code doc
          const code_ref = doc(db, "codes", code);
          await setDoc(code_ref, { ref: ref });

          // add code to class doc
          const class_ref = doc(db, "classes", _email, "classes", _id);
          await updateDoc(class_ref, { code: code }, { merge: true });
        }
        return Promise.resolve(code);
      } catch (err) {
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function ref_from_code
     * @description Get the ref (email/uid) from a code
     * @param {String} code The code to get the ref for
     * @returns {Promise} A promise that resolves to the ref (email/uid) or rejects with an {String} error
     */
    async ref_from_code(code) {
      try {
        if (!code) throw "No code provided";
        // get ref from code doc
        const code_ref = doc(db, "codes", code);
        const code_doc = await getDoc(code_ref);
        _status.log("🔗 Got code doc", code_doc.data());
        if (!code_doc.exists()) throw "Code doesn't exist";
        let ref = this.path_to_ref(code_doc.data()?.ref);
        if (!ref) throw "Code doesn't have ref";
        return Promise.resolve(ref);
      } catch (err) {
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function toggle_teacher
     * @description Toggle teacher mode (for testing)
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     * @see {@link is_teacher}
     */
    async toggle_teacher() {
      // use localStorage. _teacher_mode as basis for toggle, then set the localStorage and remote doc
      if (!this.user) return;
      let prev =
        this.active_doc?.teacher_mode ||
        window.localStorage.getItem(`${process.env.VUE_APP_BRAND_SHORT_NAME}_teacher_mode`) ==
          "true";
      window.localStorage.setItem(`${process.env.VUE_APP_BRAND_SHORT_NAME}_teacher_mode`, !prev);
      let new_text = !prev ? "on" : "off";
      if (this.active_doc) {
        this.active_doc.teacher_mode = !prev;
        await this.update_remote();
        _status.log(`🏫 Remote teacher mode toggled ${new_text}`);
      }
      _status.log(`🏫 Local teacher mode toggled ${new_text}`);
      new SuccessToast(`Teacher mode toggled ${new_text}`, 2000);
    },

    /**
     * @memberOf .main.actions
     * @function get_tasks
     * @description Get all tasks from all classes
     * @returns {Promise} Promise that resolves to Array of all tasks from all classes, with class name and color added
     * @default []
     * @see {@link fetch_classes}
     */
    async get_tasks() {
      try {
        if (!this.classes?.length) return Promise.resolve([]);
        // get all the classes with this.classes(), then get all their tasks and combine them into an array
        let tasks = [];
        let classes = this.classes;
        for (let i = 0; i < classes.length; i++) {
          let class_tasks = classes[i].tasks;
          class_tasks = class_tasks ? class_tasks : [];
          // add class name and color to each task
          for (let j = 0; j < (class_tasks?.length || 0); j++) {
            classes[i].name = classes[i].name ? classes[i].name : "Unnamed Class";
            // check task date type and convert to date object if necessary
            if (typeof class_tasks[j].date == "string") {
              // convert to mm-dd-yyyy from yyyy-mm-dd
              class_tasks[j].date = class_tasks[j].date.split("T")[0];
              let [year, month, day] = class_tasks[j].date.split("-");
              class_tasks[j].date = `${month}-${day}-${year}`;
              class_tasks[j].date = compatDateObj(class_tasks[j].date);
              class_tasks[j].date = isNaN(class_tasks[j].date) ? null : class_tasks[j].date;
            }
            // set color from parent class color
            class_tasks[j].color = classes[i].color;
            tasks.push({
              ...class_tasks[j],
              class_name: this.class_text(classes[i]),
            });
          }
        }
        // sort tasks by day, if day the same, sort by period, then by name
        tasks.sort((a, b) => {
          a.name = a.name ? a.name : "";
          b.name = b.name ? b.name : "";
          if (a.date && b.date) {
            if (a.date.getTime() == b.date.getTime()) {
              if (a.period == b.period) {
                return a.name.localeCompare(b.name);
              }
              return a.period - b.period;
            }
            return a.date.getTime() - b.date.getTime();
          }
          return a.name.localeCompare(b.name);
        });

        this.tasks = tasks;
        return Promise.resolve(tasks);
      } catch (err) {
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function clear
     * @description Reset the store state and local storage, and redirect to home if page requires auth
     * @note Imperfect, and isn't enough to prevent errors when the app updates to a version with a different store state structure
     */
    clear() {
      this.user = null;
      this.account_doc = null;
      this.linked_account_doc = null;
      this.classes = [];
      this.tasks = [];
      this.loaded_email = null;
      this.loaded_classes = null;
      this.personal_account = false;
      this.teacher = {
        doc_ref: null,
        collection_ref: null,
      };
      window.localStorage.removeItem(`${process.env.VUE_APP_BRAND_SHORT_NAME}_app_state`);
      // if page requires auth, redirect to home
      if (router.currentRoute?.value?.meta?.requiresAuth) {
        router.push("/");
      }
    },
    /**
     * @memberOf .main.actions
     * @function set_active
     * @description Set the active document (the signed-in account's doc, or the linked account's if it exists) to the provided document
     * @param {Object} data The document data to replace the active document (account_doc or linked_doc) with
     */
    set_active(data) {
      try {
        if (!data) throw "No data provided";
        if (this.personal_account) {
          this.linked_account_doc = data;
        } else {
          this.account_doc = data;
        }
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function doc_from_uid
     * @description Get a user document from a uid
     * @param {String} uid The uid of the user to get the document for
     * @returns {Promise} A promise that resolves to the {Object} user document or rejects with an {String} error
     * @see {@link getDoc}
     * @see {@link link_account_uid}
     */
    async doc_from_uid(uid) {
      try {
        if (!uid) throw "No account uid provided";
        // get user document from uid
        let linked_doc = await getDoc(doc(db, "users", uid));
        _status.log("🔗 Got linking account's document");
        if (!linked_doc.exists()) throw "Account doesn't exist or you haven't been added yet";
        let linked_doc_data = linked_doc.data();
        return Promise.resolve(linked_doc_data);
      } catch (err) {
        _status.warn("🔗 Couldn't get linking account's document", err);
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function link_account_uid
     * @description Link a user account to another user's account by uid (for personal accounts only)
     * @param {String} uid The uid of the user to link to
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     * @see {@link invite_linked}
     */
    async link_account_uid(uid) {
      if (!uid) return;
      if (!this.personal_account) {
        new WarningToast("This account is a primary account and cannot be linked", 3000);
        return;
      }
      if (!this.account_doc) {
        await this.create_doc();
        _status.log("📄 Dreated doc", this.account_doc);
      }
      try {
        let linked_doc = await this.doc_from_uid(uid);
        if (!linked_doc) throw "Account doesn't exist or you haven't been invited";
        // update remote
        this.account_doc.linked_to = uid;
        await this.update_wrapper_acc_doc();
        new SuccessToast(`Successfully linked to ${linked_doc.name}'s account!`, 4000);
      } catch (err) {
        new ErrorToast("Couldn't link account", err, 2000);
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function invite_linked
     * @description Invite a user account to link to another user's account (for personal accounts only,) including sending them an email with the code to join
     * @param {String} email The email of the user to invite (and send an invite email to)
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     */
    async invite_linked(email) {
      if (!this.user || !this.active_doc) return;
      if (this.personal_account) {
        new WarningToast("This account is already linked!", 2000);
      }
      // exclude empty or mvla emails
      if (!email || validOrgAcc(email) || !email.includes("@")) {
        new WarningToast(`Please enter a valid non-${process.env.VUE_APP_ORG_NAME} email`, 2000);
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
          from: `${this.active_doc.name} via ${process.env.VUE_APP_BRAND_LONG_NAME} <${process.env.VUE_APP_BRAND_MAIL_ADDRESS}>`,
          fromname: this.active_doc.name + ` via ${process.env.VUE_APP_BRAND_LONG_NAME}`,
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
          _status.log("📧 Checked email doc");
          checks++;
        }
        if (
          !email_doc.data()?.delivery?.info?.accepted?.includes(email) ||
          email_doc.data()?.delivery?.attempts == 0
        ) {
          _status.log("📧 Email failed to send", email_doc.data());
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
    /**
     * @memberOf .main.actions
     * @function uninvite_linked
     * @description Unlink a user account from another user's account (for personal accounts only)
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     * @see {@link invite_linked}
     */
    async uninvite_linked(email) {
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
    /**
     * @memberOf .main.actions
     * @function refresh_timeout
     * @description A proxy for the refreshTimeout function in firebase.js (to reduce unnecessary onSnapshot calls)
     * @param {Number} delay The delay in milliseconds to refresh the timeout for (default 1000 set in firebase.js)
     * @see {@link refreshTimeout}
     */
    refresh_timeout(delay) {
      this.paused = false;
      // refresh listener timeout if user is logged in
      if (!this.user) return;
      refreshTimeout(delay);
    },
    /**
     * @memberOf .main.actions
     * @function login_promise
     * @description A wrapper for the store.user state, to wait for the user to be set
     * @returns {Promise} A promise that resolves to the user object
     * @see {@link user}
     * @see {@link login}
     * @note Currently not very widely used, but should be implemented more in order to prevent excessive store watcher calls
     */
    async login_promise() {
      // wait for this.user to be set
      return new Promise((resolve) => {
        let interval = setInterval(() => {
          if (this.user) {
            clearInterval(interval);
            resolve(this.user);
          }
        }, 100);
      });
    },
    /**
     * @memberOf .main.actions
     * @function save_join_form
     * @description Save the responses from the join form to the active user's document
     * @param {Object} responses The responses from the join form to save
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     */
    async save_join_form(responses) {
      try {
        if (!this.user || !this.active_doc) throw "No doc to save join form to";
        // wait for user doc to be created / exist then save responses to doc.join_form
        if (this.personal_account) {
          this.linked_account_doc = this.linked_account_doc || {};
          this.linked_account_doc.join_form = responses;
        } else {
          this.account_doc = this.account_doc || {};
          this.account_doc.join_form = responses;
        }
        await this.update_remote();
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function finish_tutorial
     * @description Set the user's tutorial status to finished
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     * @see {@link done_tutorial}
     */
    async finish_tutorial(new_val) {
      try {
        if (!this.user || !this.account_doc) throw "No doc to save tutorial status to";
        this.account_doc.done_tutorial = new_val;
        await this.update_wrapper_with_merge({ done_tutorial: new_val });
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function save_daily_survey
     * @description Save the responses from the daily survey to the active user's document
     * @param {Object} responses The responses from the daily survey to save
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     * @see {@link done_daily_survey}
     */
    async save_daily_survey(responses) {
      // save responses in /survey/daily/{date}/{uid}
      try {
        // wait for user login
        if (!this.user) await this.login_promise();
        let survey_ref = doc(
          db,
          "survey",
          "daily",
          today,
          this.personal_account ? this.account_doc?.linked_to : this.user.uid
        );
        let response_obj = {
          time: new Date().getTime(),
          responses: responses,
        };
        await setDoc(survey_ref, response_obj);
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
        return Promise.resolve();
      } catch (err) {
        new ErrorToast("Couldn't save daily survey", err, 2000);
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function toggle_theme
     * @description Toggle the theme between light and dark, and save to local storage and user account doc
     * @see {@link get_theme}
     * @see {@link theme}
     */
    async toggle_theme() {
      this.theme = this.get_theme == "light" ? "dark" : "light";
      window.localStorage.setItem("theme", this.theme);
      if (this.account_doc) {
        this.account_doc.prefs = { ...this.account_doc.prefs, theme: this.theme };
        // fixes for legacy
        delete this.account_doc.theme;
        // commit changes
        await this.update_wrapper_acc_doc();
      }
      new SuccessToast(`Switched to ${this.theme} theme`, 2000);
      // trigger theme update
      this.theme = this.get_theme;
    },
    /**
     * @memberOf .main.actions
     * @function toggle_simplified
     * @description Toggle the simplified display view
     * @see {@link account_doc}
     */
    async toggle_simplified() {
      if (!this.account_doc) return;
      let simplified = !this.account_doc.prefs?.simplified;
      this.account_doc.prefs = { ...this.account_doc.prefs, simplified: simplified };

      await this.update_wrapper_acc_doc();

      new SuccessToast(
        `Switched to ${simplified ? "simplified" : "detailed (classic)"} view`,
        2000
      );
    },
    /**
     * @memberOf .main.actions
     * @function remove_class_id_helper
     * @description Helper function to remove a class from the active user's document and save changes to remote
     * @see {@link remove_class}
     * @see {@link remove_invalid}
     * @see {@link fetch_classes}
     */
    async remove_class_id_helper(class_id) {
      let filtered_classes = this.active_doc.classes.filter((c) => c != class_id);
      if (this.personal_account) {
        this.linked_account_doc.classes = filtered_classes;
      } else {
        this.account_doc.classes = filtered_classes;
      }
      // remove from local
      this.classes = this.classes.filter((c) => c.id != class_id);
      this.get_tasks();
      // update remote
      await this.update_remote();
    },
    /**
     * @memberOf .main.actions
     * @function remove_invalid
     * @description Remove a class from the active user's document, and show a toast saying that the class was removed because it was invalid
     * @see {@link remove_class_id_helper}
     */
    async remove_invalid(class_id) {
      await this.remove_class_id_helper(class_id);
      new WarningToast(`Removed non-existent class "${class_id}"`, 2000);
      return Promise.resolve();
    },
    /**
     * @memberOf .main.actions
     * @function remove_class
     * @description Remove a class from the active user's document, and show a toast saying that the class was removed manually
     * @see {@link remove_class_id_helper}
     */
    async remove_class(class_id) {
      try {
        await this.remove_class_id_helper(class_id);
        _status.log("🗑️ Removed class from user's doc: " + class_id);
        new SuccessToast("Left class", 2000);
        return Promise.resolve();
      } catch (err) {
        _status.log("🔥 Error removing class from user's doc: " + err);
        new ErrorToast("Couldn't leave class", err, 2000);
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function set_user
     * @description Set the user object and load the user's document, with some additional checks and error handling. Also set the user's document if it exists, or create it if it doesn't, and logs them out if the account is deemed invalid
     * @see {@link user}
     * @see {@link authChangeAction}
     * @see {@link account_doc}
     * @see {@link linked_account_doc}
     * @see {@link personal_account}
     */
    set_user(user) {
      _status.log("🔑 Setting user");
      // load user doc to check .personal_account
      getDoc(doc(db, "users", user.uid))
        .then((userDoc) => {
          if (userDoc.exists()) {
            this.account_doc = userDoc.data();
            this.personal_account = this.account_doc?.personal_account;
          } else {
            this.account_doc = null;
            this.linked_account_doc = null;
          }
          if (
            !user.email ||
            (!validOrgAcc(user.email) &&
              !(
                this.personal_account &&
                (router?.currentRoute?.value?.name == "link" ||
                  (this.account_doc?.personal_account && this.account_doc?.linked_to))
              ))
          ) {
            auth.signOut();
            new WarningToast(
              `Please use your ${process.env.VUE_APP_ORG_NAME} (@${process.env.VUE_APP_ORG_DOMAIN}) email to log in, or use an account that has been linked`,
              4000
            );
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
            _status.log("🏫 In teacher mode");
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
        .catch((err) => {
          auth.signOut();
          if (err.code == "unavailable") {
            new ErrorToast("No connection available, you were signed out");
            _status.log("🛜 Connection unavailable");
          } else {
            new WarningToast("Something went wrong loading your data; signed out", 2000);
            _status.log("🔥 Error loading user data;", err);
          }
        });
    },
    /**
     * @memberOf .main.actions
     * @function login
     * @description Log the user in with Google OAuth (using the appropriate prompt type based on window support), and set the user object.
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     * @see {@link user}
     * @see {@link logout}
     */
    async login() {
      new Toast(
        "Opening login popup...",
        "default",
        1000,
        require("@svonk/util/assets/info-locked-icon.svg")
      );
      // sign in with google, then set user data
      // if electron, use redirect, otherwise, use popup
      await (isElectron || isIFrame()
        ? signInWithRedirect(auth, provider)
        : signInWithPopup(auth, provider)
      )
        .then(() => {
          if (!this.user || !this.user.email || !validOrgAcc(this.user.email)) return;
          new Toast(
            "Logged in as " + this.user.displayName + "!",
            "default",
            2000,
            require("@svonk/util/assets/info-unlocked-icon.svg")
          );
          _status.log("🔑 Logged in as " + this.user.displayName);
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
            error.code == "auth/popup-closed-by-user" ||
            error.code == "auth/user-cancelled"
          ) {
            new WarningToast(err, 2000);
          } else {
            new ErrorToast("Couldn't log in", err, 2000);
          }
          return Promise.reject(err);
        });
    },
    /**
     * @memberOf .main.actions
     * @function login_personal
     * @description Most things that login() does, but for personal accounts (does not preform org account check, enforce sign-in domain, or redirect)
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     * @see {@link personal_account}
     * @see {@link user}
     * @see {@link login}
     */
    async login_personal() {
      new Toast(
        "Opening login popup...",
        "default",
        1000,
        require("@svonk/util/assets/info-locked-icon.svg")
      );
      // create new provider with no hd
      const personal_provider = new GoogleAuthProvider();
      personal_provider.addScope("email");
      personal_provider.addScope("profile");
      // sign in with google, then set user data
      // if electron, use redirect, otherwise, use popup
      await (isElectron || isIFrame()
        ? signInWithRedirect(auth, personal_provider)
        : signInWithPopup(auth, personal_provider)
      )
        .then((r) => {
          if (!r.user || !r.user.email || validOrgAcc(r.user.email)) this.logout();
          new Toast(
            "Logged in as " + r.user.displayName + "!",
            "default",
            2000,
            require("@svonk/util/assets/info-unlocked-icon.svg")
          );
          _status.log("🔑 Logged in as " + r.user.displayName);
          authChangeAction(r.user);
          return Promise.resolve();
        })
        .catch((err) => {
          new ErrorToast("Couldn't log in", err, 2000);
          return Promise.reject(err);
        });
    },
    /**
     * @memberOf .main.actions
     * @function logout
     * @description Log the user out and clear the store state
     * @see {@link clear}
     */
    async logout() {
      if (router.currentRoute?.value?.meta?.requiresAuth) {
        await router.push({ path: "/" });
      }
      auth.signOut();
      this.clear();
      // redirect if current route requires auth
      new Toast("Logged Out", "default", 1500, require("@svonk/util/assets/info-locked-icon.svg"));
    },
    /**
     * @memberOf .main.actions
     * @function get_remote
     * @description Get the user's document from the remote database, and create it if it doesn't exist. Preforms additional checks for personal accounts, and removes the linked account if it doesn't exist
     * @see {@link create_doc}
     * @see {@link update_remote}
     * @see {@link active_doc}
     */
    async get_remote() {
      // set document data
      // get doc from firebase
      let active_doc = await getDoc(this.active_ref);
      _status.log("📄 Got user doc remote");
      if (active_doc.exists()) {
        this.set_active(active_doc.data());
      } else if (this.personal_account) {
        // linked account doesn't exist
        _status.log("🔗 Linked account doesn't exist, removing it and going home");
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
    /**
     * @memberOf .main.actions
     * @function update_remote
     * @description Update the active user's document in the remote database
     * @see {@link get_remote}
     * @see {@link active_doc}
     * @see {@link active_ref}
     */
    async update_remote() {
      // update remote doc
      await setDoc(this.active_ref, this.active_doc, { merge: true });
      _status.log("⏶ Pushed changes to remote");
    },
    /**
     * @memberOf .main.actions
     * @function update_wrapper_acc_doc
     * @description Update the authenticated user's document in the remote database (for personal accounts only)
     * @see {@link update_remote}
     * @see {@link personal_account}
     */
    async update_wrapper_acc_doc() {
      await setDoc(this.account_ref, this.account_doc, { merge: true });
    },
    /**
     * @memberOf .main.actions
     * @function update_wrapper_acc_doc
     * @description Update the authenticated user's document in the remote database with the data given (for personal accounts only)
     * @see {@link update_remote}
     * @see {@link personal_account}
     * @see {@link update_wrapper_acc_doc}
     */
    async update_wrapper_with_merge(data) {
      try {
        await setDoc(this.account_ref, data, { merge: true });
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function create_doc
     * @description Create the user's document in the remote database, create a teacher document if the user is a teacher, and create a personal account if the user is using a personal account. Also preforms onboarding for non-teacher
     * @see {@link create_teacher_doc}
     * @see {@link update_remote}
     * @see {@link get_remote}
     */
    async create_doc() {
      if (!window?.navigator?.onLine) {
        _status.warn("🔥 No internet connection, won't create doc to prevent overwrite");
        new ErrorToast("Prevented destructuive offline userdoc create", 2000);
      }
      if (!this.user) return _status.warn("🔥 No user to create doc for");
      _status.log("📄 User document doesn't exist, creating new one...");
      new WarningToast("User document doesn't exist, creating new one...", 2000);
      this.account_doc = {
        name: this.user.displayName,
        email: this.user.email,
        classes: [],
        prefs: { theme: this.get_theme },
      };
      if (this.personal_account) {
        this.account_doc = {
          ...this.account_doc,
          linked_to: null,
          personal_account: true,
        };
      }
      await this.update_wrapper_acc_doc();
      // do onboarding
      new SuccessToast("Created user document; Let's get started", 2000);
      if (!this.personal_account) {
        // push to tutorial
        router.push({
          name: "portal",
        });
      }
      if (this.is_teacher) {
        await this.create_teacher_doc();
        new SuccessToast("Created user & teacher documents; Let's get started", 2000);
      }
    },
    /**
     * @memberOf .main.actions
     * @function create_teacher_doc
     * @description Create the teacher document for the user, and redirect to the create class page
     * @see {@link create_doc}
     * @see {@link is_teacher}
     */
    async create_teacher_doc() {
      // create teacher doc under (classes/teacher_email+this.ORG_DOMAIN) with sub-collection (classes)
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
    /**
     * @memberOf .main.actions
     * @function fetch_classes
     * @description Fetch all classes from the user's document and combine them into an array, while checking for duplicates and invalid classes
     * @returns {Array} Array of all (unique) classes from the user's document
     * @see {@link classes}
     * @see {@link fetch_classes_by_email}
     * @see {@link remove_invalid}
     * @see {@link remove_class}
     * @see {@link remove_class_id_helper}
     */
    async fetch_classes() {
      let run_hash = Math.random().toString(36).substring(7);
      _status.log(`📚 Started fetch   | <${run_hash}>`);
      // check for duplicates
      if (!this.active_doc?.classes) {
        let i = 0;
        const max = 10000,
          warn = 1500,
          len = 100;
        while (!this.active_doc?.classes && i < max / len) {
          await new Promise((resolve) => setTimeout(resolve, len));
          i++;
        }
        if (!this.active_doc?.classes) {
          return Promise.reject("Classes not found in user doc within load cycle");
        } else if (i * len >= warn) {
          _status.warn(`📚 Initial class fetch took ${i * len}ms, warning set at ${warn}ms`);
          new WarningToast(
            `Initial class fetch took ${
              i * len
            }ms. Your network connection may negativly affect site preformance.`,
            3500
          );
        }
      }

      let unique = [...new Set(this.active_doc.classes)];
      if (unique.length != this.active_doc.classes.length) {
        if (this.personal_account) {
          this.linked_account_doc.classes = unique;
        } else {
          this.account_doc.classes = unique;
        }
        await this.update_remote();
        new WarningToast("Removed duplicate classes", 2000);
        _status.log("📚 Removed duplicate classes");
      }

      // get all classes' data and combine into an array
      let classes = [];
      for (let class_path of this.active_doc.classes) {
        // split class path into teacher/uid
        let [teacher, class_id] = class_path.split("/");
        if (!teacher || !class_id) {
          await this.remove_invalid(class_path);
          continue;
        }
        // get classes sub-collection from teacher's doc
        let teacher_classes = collection(db, "classes", teacher, "classes");
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
        doc_data.ref = [teacher, class_id].join("/");

        classes.push(doc_data);
      }
      _status.log(`📚 Got class docs  | <${run_hash}>`);
      // get tasks for all classes in parallel

      classes = classes.map((class_data) => {
        let [_email, _id] = class_data.ref.split("/");
        class_data.tasks = class_data.tasks || [];
        class_data.tasks = class_data.tasks.map((task) => {
          task.ref = [_email, _id, task.id].join("/");
          delete task.id;
          return task;
        });
        return class_data;
      });
      _status.log(`📚 Processed tasks | <${run_hash}>`);

      // sort classes by period number, then by name
      classes.sort((a, b) => {
        if (a.period == b.period) {
          return a.name.localeCompare(b.name);
        }
        // prefer classes that have periods over those that don't
        if (!a.period && a.period !== 0) return 1;
        if (!b.period && b.period !== 0) return -1;
        return a.period - b.period;
      });
      this.classes = classes;
      this.get_tasks();
      Promise.resolve();
    },
    /**
     * @memberOf .main.actions
     * @function fetch_classes_by_email
     * @description Fetch all classes for a given email, and set the loaded classes to the result
     * @param {String} email The email to fetch classes for
     * @see {@link loaded_classes}
     * @see {@link loaded_email}
     * @see {@link fetch_classes}
     * @note Messy implementation, should be refactored to use a separate store state for loaded classes, or at least not use so many store state keys. Prehaps promises would work?
     */
    async fetch_classes_by_email(email) {
      this.loaded_email = null;
      if (!email || !validOrgAcc(email)) {
        this.loaded_classes = null;
        this.loaded_email = email;
        return;
      }
      _status.log("📄 Getting classes from email");
      let classes = [];
      let classes_subcollection = collection(doc(db, "classes", email), "classes");
      let classes_subcollection_snapshot = await getDocs(classes_subcollection);
      _status.log("📄 Got classes subcollection from email");
      classes_subcollection_snapshot.forEach((class_doc) => {
        let class_data = class_doc.data();
        class_data.id = class_doc.id;
        // if user already in class, change name to "[JOINED] name"
        class_data.is_joined = this.active_doc?.classes.includes([email, class_doc.id].join("/"));

        classes.push(class_data);
      });
      classes.sort((a, b) => {
        if (a.period == b.period) {
          return a.name.localeCompare(b.name);
        }
        return a.period - b.period;
      });
      this.loaded_classes = classes;

      this.loaded_email = email;
    },
    /**
     * @memberOf .main.actions
     * @function add_class
     * @description Add a class to the active user's document, and show a toast saying that the class was added
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     * @param {String} teacher_email The email of the teacher whose class it is
     * @param {String} class_id The id of the class to add
     * @param {String} class_name The name of the class being added
     * @param {Number} class_period The period of the class being added
     * @see {@link classes}
     */
    async add_class(teacher_email, class_id, class_name, class_period) {
      if (!this.active_doc?.classes) return;
      if (!class_id) return;

      let class_key = [teacher_email, class_id].join("/");
      if (this.active_doc.classes.includes(class_key)) return;
      if (this.personal_account) {
        this.linked_account_doc.classes.push(class_key);
      } else {
        this.account_doc.classes.push(class_key);
      }
      await this.update_remote();
      await this.fetch_classes();
      new SuccessToast(
        `Added "${this.class_text({
          name: class_name,
          period: class_period,
        })}" to your classes`,
        2000
      );
      // return new success promise
      return Promise.resolve();
    },
    /**
     * @memberOf .main.actions
     * @function create_class
     * @description Create a class with the given object, and add it to the active user's document. (for teachers)
     * @param {Object} class_obj The class object to with the class data, document will be created in /classes under the teacher's email with these contents
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     * @see {@link is_teacher}
     * @see {@link teacher}
     */
    async create_class(class_obj) {
      _status.log("🔨 Creating class", class_obj);
      if (!this.is_teacher) {
        new WarningToast("You need to be a teacher to create a class", 2000);
        return;
      }
      if (!class_obj.name) return; // handled in disabled attr of button, failsafe for db
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
        new SuccessToast(`Created class "${this.class_text(class_obj)}"`, 2000);
        _status.log("🏫 class_doc_ref", class_doc_ref);
        await this.add_class(
          this.active_doc.email || this.user.email,
          class_doc_ref.id,
          class_obj.name,
          class_obj.period
        );
        return Promise.resolve();
      } catch (e) {
        new ErrorToast("Couldn't create class", cleanError(e), 2000);
        return Promise.reject(e);
      }
    },
    /**
     * @memberOf .main.actions
     * @function create_task
     * @description Create a task with the given object, and add it to the classes specified in the object. (for teachers)
     * @param {Object} task_obj The task object to with the task data, data will be added to /classes docs
     * @param {Array} task_classes The classes to add the task to
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     */
    async create_task(task_obj, task_classes) {
      try {
        if (!task_obj.name && task_obj?.type != "note") {
          return Promise.reject("No task name specified");
        } else if (!task_classes || task_classes.length == 0) {
          return Promise.reject("No classes selected");
        }
        // use firebase array add to add task to each class
        let batch = writeBatch(db);
        let updated_classes = Array.from(this.classes);
        task_classes.forEach((class_id) => {
          // fix any class_id that has the teacher email in it
          let displayed_class_id = class_id;
          let [_email, _id] = class_id.split("/");
          // use this.teacher.collection_ref to get class collection ref, then update the class documents within
          let class_tasks_collection = collection(db, "classes", _email, "classes", _id, "tasks");
          task_obj.class_id = displayed_class_id;

          // batch add a new task doc with the data to the class_tasks_collection collection, using auto-generated id
          let task_ref = doc(class_tasks_collection);
          batch.set(task_ref, task_obj);
          updated_classes.forEach((class_obj) => {
            if (class_obj.id == displayed_class_id) {
              class_obj.tasks.push({
                ...task_obj,
                ref: [_email, _id, task_ref.id].join("/"),
                class_id: displayed_class_id,
                _proxy: true,
              });
            }
          });
        });
        await batch.commit();
        // update this.classes.tasks for each, then rerun get_tasks to update this.tasks from updated classes
        this.classes = updated_classes;
        this.get_tasks();

        let name = task_obj.type == "note" ? "" : `"${task_obj.name}"`;
        new SuccessToast(
          `Added ${task_obj.type || "task"} ${name} to ${task_classes.length} class${
            task_classes.length == 1 ? "" : "es"
          }`,
          2000
        );
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * @memberOf .main.actions
     * @function update_class
     * @description Update an instance of a class (for teachers). Intended to be preformed from the EditClass Modal
     * @param {String} class_ref the "email/class_id" String representation of the class ref in firebase
     * @param {Object} class_obj The updated class object
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     */
    async update_class(class_ref, class_obj) {
      try {
        let [_email, _id] = class_ref.split("/");
        _email += this.ORG_DOMAIN;
        // update the document with the same id as the class from the classes collection
        await updateDoc(doc(db, "classes", _email, "classes", _id), class_obj);
        _status.log("📝 Updated remote class");
        let classes = this.classes;
        // update local version of class in classes
        const classIndex = classes.findIndex(
          (class_obj) => class_obj.id === [_email, _id].join("/")
        );
        if (classIndex !== -1) {
          // Update the class object within the classes array
          classes[classIndex] = { ...classes[classIndex], ...class_obj, _proxy: true };
          _status.log("📝 Updated local class");
        }

        // show changes
        this.classes = [...classes];
        this.get_tasks();

        // finish
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function update_task
     * @description Update an instance of a task from a class (for teachers). Intended to be preformed from the EditTask Modal
     * @param {String} task_ref the "email/class_id/task_id" String representation of the task ref in firebase
     * @param {Object} task_obj The updated task object
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     */
    async update_task(task_ref, task_obj) {
      try {
        delete task_obj.class_id;
        delete task_obj.ref;
        delete task_obj._class;
        let [_email, _id, task_id] = task_ref.split("/");
        if (!_email.includes(this.ORG_DOMAIN)) {
          _email += this.ORG_DOMAIN;
        }
        // update the document with the same id as the task from the tasks collection
        await updateDoc(doc(db, "classes", _email, "classes", _id, "tasks", task_id), task_obj);
        _status.log("📝 Updated remote task");
        let classes = this.classes;
        // update local version of task in classes
        let class_id = [_email, _id].join("/");
        const classIndex = classes.findIndex((class_obj) => class_obj.id === class_id);
        const ref = [_email, _id, task_id].join("/");
        if (classIndex !== -1) {
          const taskIndex = classes[classIndex].tasks.findIndex((task) => task.ref === ref);

          if (taskIndex !== -1) {
            // Update the task object within the tasks array of the class_obj
            classes[classIndex].tasks[taskIndex] = {
              ...task_obj,
              ref: ref,
              class_id: class_id,
              _proxy: true,
            };
            _status.log("📝 Updated local task");
          }
        }

        // show changes
        this.classes = [...classes];
        this.get_tasks();

        // finish
        return Promise.resolve();
      } catch (err) {
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function archive_task
     * @description Archive an instance of a task from a class (for teachers). Intended to be preformed from the ViewTask Modal
     * @param {String} task_ref the "email/class_id" String representation of the task ref in firebase
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     * @see {@link create_task}
     * @note This currently only removes the instance of the task being viewed. Could add a secondary modal to allow deletion of multiple instances instead?
     */
    async archive_task(task_ref) {
      let [_email, _id, task_id] = task_ref.split("/");
      _email += this.ORG_DOMAIN;
      try {
        // remove the document with the same id as the task from the tasks collection
        await deleteDoc(doc(db, "classes", _email, "classes", _id, "tasks", task_id));
        _status.log("📄 Archived task");

        try {
          let classes = this.classes;
          classes.forEach((class_obj) => {
            if (class_obj.id == [_email, _id].join("/")) {
              class_obj.tasks = class_obj.tasks.filter((task) => {
                return task.ref != [_email, _id, task_id].join("/");
              });
            }
          });
          this.classes = classes;
          this.get_tasks();
        } catch (err) {
          _status.error("🔥 Error removing task from local", err);
          throw err;
        }
      } catch (err) {
        return Promise.reject(err);
      }

      return Promise.resolve();
    },
    /**
     * @memberOf .main.actions
     * @function task_from_ref
     * @description Get the task object from a task reference
     * @param {String} ref The task reference to get the task object from
     * @returns {Promise} A promise that resolves to the task object or rejects with an {String} error
     */
    async task_from_ref(ref) {
      try {
        let [_email, _id, task_id] = ref.split("/");
        _email += this.ORG_DOMAIN;
        _status.log("📄 Getting task from ref:", [_email, _id, task_id].join(" - "));
        let class_doc = await getDoc(doc(db, "classes", _email, "classes", _id));
        if (!class_doc.exists()) return Promise.resolve(null);
        let class_data = class_doc.data();
        delete class_data.tasks;
        _status.log("📚 Got class from ref");

        let task_doc = await getDoc(doc(db, "classes", _email, "classes", _id, "tasks", task_id));
        if (!task_doc.exists()) return Promise.resolve(null);
        _status.log("📄 Got task from ref");
        let task_data = task_doc.data();
        task_data = {
          ...task_data,
          ref: ref,
          class_id: [_email, _id].join("/"),
          class_name: this.class_text(class_data),
          _class: { ...class_data, ref: [_email.split(this.ORG_DOMAIN)[0], _id].join("~") },
        };
        return Promise.resolve(task_data);
      } catch (err) {
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function class_from_ref
     * @description Get the class object from a class reference
     * @param {String} ref The class reference to get the class object from
     * @returns {Promise} A promise that resolves to the class object or rejects with an {String} error
     */
    async class_from_ref(ref, include_tasks = false) {
      try {
        let [_email, _id] = ref.split("/");
        _email += this.ORG_DOMAIN;
        let class_doc = await getDoc(doc(db, "classes", _email, "classes", _id));
        _status.log("📄 Got class doc");
        if (!class_doc.exists()) return Promise.reject("Class doesn't exist");

        let class_data = class_doc.data();
        if (!include_tasks) delete class_data.tasks;

        _status.log("📚 Got class data");
        return Promise.resolve(class_data);
      } catch (err) {
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function upcoming_from_ref
     * @description Get the next 4 upcoming task objects for a given class reference
     * @param {String} ref
     * @param {Object} class_obj
     */
    async upcoming_from_ref(class_ref, class_doc) {
      try {
        if (!class_ref) {
          throw "No class ref provided";
        }
        if (!class_doc) {
          class_doc = await this.class_from_ref(class_ref);
        }
        let [_email, _id] = class_ref.split("/");
        _email += this.ORG_DOMAIN;
        let class_snapshot = await getDoc(doc(db, "classes", _email, "classes", _id));
        if (!class_snapshot.exists()) {
          throw "Class doesn't exist";
        }
        let class_tasks = class_snapshot.data()?.tasks || [];
        class_tasks = class_tasks.filter((task) => {
          return task.type != "note" && compatDateObj(task.date).getTime() >= new Date().getTime();
        });
        class_tasks.sort((a, b) => {
          return compatDateObj(a.date).getTime() - compatDateObj(b.date).getTime();
        });
        // limit to 6
        class_tasks = class_tasks.slice(0, 6);
        let upcoming_tasks = [];
        class_tasks.forEach((task) => {
          let task_id = task.id;
          delete task.id;
          upcoming_tasks.push({
            ...task,
            ref: [...class_ref.split("/"), task_id].join("~"),
            date: compatDateObj(task.date),
            color: class_doc.color,
            class_id: [_email, _id].join("/"),
            class_name: this.class_text(class_doc),
          });
        });
        _status.log("📚 Got upcoming tasks");
        return Promise.resolve(upcoming_tasks);
      } catch (err) {
        return Promise.reject(err);
      }
    },

    /**
     * @memberOf .main.actions
     * @function show_timeout
     * @description Show a popup saying that the session has timed out
     * @see {@link hide_timeout}
     * @see {@link refresh_timeout}
     */
    show_timeout() {
      _status.log(
        "🕒 Showing timeout" +
          (this.account_doc?.prefs?.hide_timeout ? " | Hidden locally due to prefs" : "")
      );
      this.paused = true;
    },

    /**
     * @memberOf .main.actions
     * @function hide_timeout
     * @description Hide the popup saying that the session has timed out
     * @see {@link show_timeout}
     * @see {@link refresh_timeout}
     */
    hide_timeout() {
      if (this.paused) {
        if (!this.account_doc?.prefs?.hide_timeout) {
          _status.log("🕒 Hiding timeout");
        }
        this.paused = false;
      }
    },
  },
});
