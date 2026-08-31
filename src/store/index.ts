/**
 * Group of stores that handle page-inspecific data and methods
 * @namespace store
 */

/**
 * The main store for the app, with most primary data and methods needed to function
 * @file store/index.ts
 * @namespace .main
 * @memberOf store
 */

// Typescript Types
export enum Theme {
  Light = "light",
  Dark = "dark",
}
// TODO: TS implement these types
export interface ClassInfo extends DocumentData {
  id?: string;
  ref: string;
  name: string;
  period: number;
  [key: string]: any | never;
  tasks?: TaskInfo[];
  archived?: boolean;
}

export interface TaskInfo extends DocumentData {
  id?: string;
  name: string;
  type: string;
  date: string | Date | null;
  description?: string;
  class_obj?: ClassInfo;

  link?: string;
  path?: string;
  [key: string]: any;
}
export interface ProcessedTaskInfo extends TaskInfo {
  ref: string;
  class_obj: ClassInfo;
  date: Date | null;
}

interface Survey extends DocumentData {
  data?: any;
  date: string;
  error?: string;
  fetched?: number;
}

type ClassID = string;

function enrollmentKeyClassId(enrollmentPath: string): string {
  return bareClassIdFromEnrollment(enrollmentPath);
}

/** True when a local class cache entry matches a bare classId (enrollment may be email/classId or classId). */
function classEntryMatchesId(entry: { id?: string; ref?: string; _class_id?: string } | null | undefined, classId: string): boolean {
  if (!entry || !classId) return false;
  if (entry._class_id === classId) return true;
  if (entry.id === classId || entry.ref === classId) return true;
  if (typeof entry.id === "string" && (entry.id.endsWith("/" + classId) || entry.id.endsWith("~" + classId))) return true;
  if (typeof entry.ref === "string" && (entry.ref.endsWith("/" + classId) || entry.ref === classId)) return true;
  return false;
}

// setup Pinia store
import { defineStore, type StoreDefinition } from "pinia";
import { _status, compatDateObj, type LogEntry } from "@/common";
import { classTextName } from "@/common/grapheme";
import {
  bareClassIdFromEnrollment,
  classPath,
  flatTaskPath,
  humanTeachers,
  isCanvasImportEmail,
  parseClassId,
  parseTaskId,
  shortShareRef,
  splitRefSegments,
  taskPath as buildTaskPath,
  writeClassId,
  writeTaskIds,
} from "@/common/paths";
import {
  getClassDoc,
  getTaskDoc,
  rememberClassEmail,
} from "@/common/dualRead";
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
  deleteDoc,
  deleteField,
  type DocumentReference,
  type CollectionReference,
  type WriteBatch,
  type DocumentData,
  type DocumentSnapshot,
  type QuerySnapshot,
} from "firebase/firestore";
import CryptoJS from "crypto-js";
import { auth, db, authChangeAction, refreshTimeout, setupSnapshot, functions, httpsCallable } from "../firebase";
import { syncClassListeners } from "../firebase/classListeners";
import { beginHydrateEpoch, hydrateBeatsLive } from "@/common/classListenerState";
import { signInWithPopup, GoogleAuthProvider, signInWithRedirect, type User } from "firebase/auth";
const provider = new GoogleAuthProvider();
const isElectron = navigator?.userAgent?.toLowerCase()?.indexOf(" electron/") > -1;
let ORG_DOMAIN = `@${process.env.VUE_APP_ORG_DOMAIN}`;
// add email and name to provider (safe at import time — does not touch `auth`)
provider.addScope("email");
provider.addScope("profile");
// constrict to only ORG_DOMAIN emails
provider.setCustomParameters({
  login_hint: "username" + ORG_DOMAIN,
  // hd: ORG_DOMAIN,
});
// Do NOT call auth.useDeviceLanguage() at module top level — store↔firebase ESM cycle
// leaves `auth` in TDZ during import. Configure lazily on first login.
let authLanguageConfigured = false;
function ensureAuthLanguage(): void {
  if (authLanguageConfigured) return;
  auth.useDeviceLanguage();
  authLanguageConfigured = true;
}

// setup class name handlebars template
import Handlebars from "handlebars";
const CLASS_TEXT = Handlebars.compile(process.env.VUE_APP_MUSTACHE_CLASS_TEXT || "{{#period}}P{{period}} - {{/period}}{{name}}");

// import router
import router from "@/router";
import { useMagic } from "@/store/magic";
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
const today: string = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().split("T")[0];
// define store
export const useMainStore: StoreDefinition = defineStore({
  id: "main",
  /** Function to create a clean store state, used for initialization. Will attempt to load from window.localStorage variable to save on firebase calls -> isn't always stable after app update that changes state keyings */
  state: () => {
    /**
     * @namespace .main.state
     * @description The state of the main store
     * @memberOf .main
     */
    /* Set default store state */
    let state = {
      /**
       * @memberOf .main.state
       * @property {Object} user The user object from firebase auth
       * @default null
       */
      user: null as User | null,
      /**
       * @memberOf .main.state
       * @property {Object} account_doc The authenticated user's document from the users collection in firestore
       * @default null
       * @see {@link active_doc}
       */
      account_doc: null as DocumentData | null,
      /**
       * @memberOf .main.state
       * @property {Object} linked_account_doc The linked account document from the users collection in firestore
       * @default null
       * @see {@link active_doc}
       */
      linked_account_doc: null as DocumentData | null,
      /**
       * @memberOf .main.state
       * @property {Array} classes Collection of the firebase document ids of classes that the user is in
       * @default []
       * @see {@link fetch_classes}
       * @see {@link get_tasks}
       * @see {@link tasks}
       */
      classes: [] as ClassInfo[],
      /**
       * @memberOf .main.state
       * @property {Array} tasks Collection of the processed task objects
       * @default []
       * @see {@link get_tasks}
       */
      tasks: [] as TaskInfo[],
      /**
       * @memberOf .main.state
       * @property {String} loaded_email The email of the user that the classes have been loaded for (for previews in AddClass.vue)
       * @default null
       * @see {@link loaded_classes}
       * @see {@link fetch_classes_by_email}
       */
      loaded_email: null as string | null,
      /**
       * @memberOf .main.state
       * @property {Array} loaded_classes The classes that have been loaded for the loaded_email (for previews in AddClass.vue)
       * @default null
       * @see {@link loaded_email}
       * @see {@link fetch_classes_by_email}
       */
      loaded_classes: null as ClassInfo[] | null,
      /**
       * @memberOf .main.state
       * @property {Object} teacher The teacher object, with doc_ref and collection_ref
       * @default {doc_ref: null, collection_ref: null}
       * @see {@link is_teacher}
       * @see {@link create_teacher_doc}
       */
      teacher: {
        doc_ref: null as DocumentReference | null,
        collection_ref: null as CollectionReference | null,
      },
      /**
       * @memberOf .main.state
       * @property {Theme} theme The theme of the app, either Theme.Light or Theme.Dark
       * @default null
       * @see {@link get_theme}
       * @see {@link toggle_theme}
       * @see {@link clear}
       * @note This is a local variable, and is while it may reflect what's in the user's document, it's not always accurate, though it is preferred locally, and persists across sessions / store {@link clear}s
       */
      theme: null as Theme | null,
      /**
       * @memberOf .main.state
       * @property {Boolean} personal_account If the user is using their personal account (true) or a valid org account (false)
       * @default false
       * @see {@link linked_account_doc}
       * @see {@link linked_account_ref}
       * @see {@link active_doc}
       * @see {@link active_ref}
       */
      personal_account: false as boolean,
      /**
       * @memberOf .main.state
       * @property {Boolean} paused If the app is paused (true) or not (false)
       * @default false
       * @see {@link show_timeout}
       * @see {@link hide_timeout}
       */
      paused: false as boolean,
      /**
       * @memberOf .main.state
       * @property {Boolean} logout_prompt If the app is showing a logout prompt (true) or not (false)
       * @default false
       */
      logout_prompt: false as boolean,
    };
    // setting up store
    let local: string | null = window.localStorage.getItem(`${process.env.VUE_APP_BRAND_NAME_SHORT}_app_state`);
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
    return state;
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
    ORG_DOMAIN(): string {
      return ORG_DOMAIN;
    },
    /**
     * @memberOf .main.getters
     * @function simplified
     * @description Get if the user is using a simplified view (true) or not (false)
     * @returns {Boolean} If the user is using a simplified view
     */
    simplified(): boolean {
      return this.account_doc?.prefs?.simplified || false;
    },
    /**
     * @memberOf .main.getters
     * @function linked_accounts
     * @description Get all linked accounts from active_doc.linked
     * @returns {Array} Array of linked account emails
     * @default []
     */
    linked_accounts(): string[] {
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
    upcoming(): ProcessedTaskInfo[] {
      if (!this.tasks) return [];
      const now = Date.now(); // new Date().setHours(0, 0, 0, 0);
      // 8 hours in ms (show today's tasks as upcoming until 8AM)
      const morning = 8 * 60 * 60 * 1000;
      let upcoming = (this.tasks as ProcessedTaskInfo[]).filter((task: ProcessedTaskInfo) => {
        return task.type != "note" && (task?.date?.getTime ? task.date.getTime() : 0) >= now - morning;
      });
      upcoming.sort((a: TaskInfo, b: TaskInfo) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return -1;
        if (!b.date) return 1;
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
    upcoming_todo(): ProcessedTaskInfo[] {
      if (!this.upcoming) return [];
      return this.upcoming.filter((task: ProcessedTaskInfo) => !this.finished_tasks?.includes(task.ref));
    },
    /**
     * @memberOf .main.getters
     * @function non_recent_signin
     * @description Check if user signed in within the last 24 hours
     * @returns {Boolean} if the user's session started within the last 24 hours
     * @default false
     */
    non_recent_signin(): boolean {
      // return true if user signed in within the last 24 hours
      if (!this.user) return false;
      let last_signin: string | undefined = this.user.metadata?.lastSignInTime;
      if (!last_signin) return false;
      let diff: number = new Date().getTime() - new Date(last_signin).getTime();
      return diff > 24 * 60 * 60 * 1000;
    },
    /**
     * @memberOf .main.getters
     * @function recently_joined
     * @description Check if user joined within the last 12 hours
     * @returns {Boolean} if the user's account was created within the last 12 hours
     * @default false
     */
    recently_joined(): boolean {
      // return true if user joined within the last 12 hours
      if (!this.user) return false;
      let creation_time: string | undefined = this.user.metadata?.creationTime;
      if (!creation_time) return false;
      let diff: number = new Date().getTime() - new Date(creation_time).getTime();
      return diff < 12 * 60 * 60 * 1000;
    },
    /**
     * @memberOf .main.getters
     * @function is_admin
     * @description True only when active_doc.role is "admin" (users.role is the sole admin signal)
     * @returns {Boolean} if the user is an admin
     * @default false
     */
    is_admin(): boolean {
      return this.active_doc?.role === "admin";
    },
    /**
     * @memberOf .main.getters
     * @function is_teacher
     * @description True when active_doc.role is "teacher" or "admin" (users.role is the sole teacher signal)
     * @returns {Boolean} if the user is a teacher or admin
     * @default false
     */
    is_teacher(): boolean {
      if (!this.user) return false;
      const role = this.active_doc?.role;
      return role === "teacher" || role === "admin";
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
    done_daily_survey(): boolean | string {
      if (!this.done_tutorial) return true;
      if (!this.active_doc) return false;
      if (this.active_doc?.prefs?.skip_survey || process.env.VUE_APP_NOSURVEY) {
        _status.log(`📃 Skipping survey from {${this.active_doc?.prefs?.skip_survey ? "user prefs" : ".env"}} override`);
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
    done_tutorial(): boolean {
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
    done_join_form(): boolean {
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
    account_ref(): DocumentReference | null {
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
    linked_account_ref(): DocumentReference | null {
      if (!this.user || !this.account_doc?.linked_to) return null;
      return doc(db, "users", this.account_doc.linked_to);
    },
    /**
     * @memberOf .main.getters
     * @function active_ref
     * @description Get the user's active document reference (the signed-in account's doc ref, or the linked account's if it exists)
     * @returns {Object} The firebase document reference for the user's active account
     * @default null
     */
    active_ref(): DocumentReference | null {
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
    active_doc(): DocumentData | null {
      return this.personal_account ? this.linked_account_doc : this.account_doc;
    },
    /**
     * @memberOf .main.getters
     * @function get_theme
     * @description Get theme from local storage or user doc
     * @returns {Theme} Theme.Light or Theme.Dark
     * @default Theme.Light
     */
    get_theme(): Theme {
      // get local
      let local_theme: Theme | null = this.theme || (window.localStorage.getItem("theme") as Theme | null);
      // get userdoc theme
      let account_doc_theme: Theme | null = this.account_doc?.prefs?.theme as Theme | null;
      // set new to system by default
      let new_theme: Theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.Dark : Theme.Light;
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
          // TODO: TS fix this unintended side effect
          // @ts-ignore: TS2339
          this.update_wrapper_acc_doc();
        }
        return local_theme || Theme.Light;
      }
      // if userdoc theme, use userdoc theme, and set local theme to userdoc theme
      else {
        if (local_theme != account_doc_theme) {
          window.localStorage.setItem("theme", account_doc_theme);
        }
        return account_doc_theme ? account_doc_theme : Theme.Light;
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
    get_loaded_classes(): ClassInfo[] {
      if (!this.loaded_classes || !this.loaded_classes.length) return [];
      let classes: ClassInfo[] = this.loaded_classes;
      return classes.map((class_obj) => {
        class_obj.is_joined = this.active_doc?.classes?.includes([this.loaded_email, class_obj?.id].join("/"));
        return class_obj;
      });
    },
    /**
     * @memberOf .main.getters
     * @function finished_tasks
     * @description return all the finished tasks
     * @returns {Array} Finished Tasks
     * @default false
     * @see {@link set_finished}
     */
    finished_tasks(): string[] {
      try {
        if (!this.active_doc) throw "No active doc";
        return this.active_doc.finished || [];
      } catch (err) {
        _status.warn("🔗 Couldn't get finished tasks", err);
        return [];
      }
    },
    /**
     * @memberOf .main.getters
     * @function notes
     * @description return all the notes in a dictionary with the ref as the key
     * @returns {Object} Dictionary of notes with refs as keys
     * @default {}
     */
    notes(): { [key: string]: string } {
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
    report_logs(): Promise<string> {
      try {
        // get stream types
        const streamObj: LogEntry[] = _status.getStream();
        const streamText: string = _status.textStream();

        // write to new firebase doc in db/logs/ and save the ID
        const docRef: DocumentReference = doc(collection(db, "logs"));

        setDoc(docRef, {
          date: new Date(),
          date_inversed: new Date().getTime() * -1,
          user: this.user ? this.user.uid : "no user",
          email: this.user ? this.user.email : "no user",
          stream: {
            json: streamObj,
            text: streamText,
          },
        } as DocumentData);

        new SuccessToast("Logs reported and saved locally, check console for details", 3500);
        _status.log(`📊 Reported logs to server as '${docRef.id}'`);

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
    class_text(class_obj: ClassInfo | null): string | undefined {
      if (!class_obj) return;
      // Strip leading emoji from a copy so class squares don't repeat it in lists
      return CLASS_TEXT({ ...class_obj, name: classTextName(class_obj.name) });
    },
    /**
     * @memberOf .main.actions
     * @function set_account_pref
     * @description Set a preference in the account doc
     * @param {String} pref The preference to set
     * @param {String} value The value to set the preference to
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     */
    async set_account_pref(pref: string, value: string | boolean): Promise<void | string> {
      try {
        if (!this.account_ref) throw "No account doc";
        if (!pref) throw "No pref provided";
        await this.update_wrapper_with_merge({
          prefs: { ...this.active_doc?.prefs, [pref]: value },
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
    async get_surveys(dates): Promise<Survey[]> {
      if (!this.user) return Promise.reject("Missing user");
      // get all the firebase surveys in "/survey/{date}/{uid}" format, in parallel
      try {
        let survey_refs = dates.map((date) => doc(db, "survey", "daily", date, this.personal_account ? this.account_doc?.linked_to : this.user?.uid));
        let survey_promises = survey_refs.map((ref) => getDoc(ref));
        const surveys = (await Promise.all(survey_promises))
          // convert each survey doc to an object with date and data
          .map((doc, i) => {
            if (!doc.exists()) return { date: dates[i], error: "No survey data for this date" };
            return { date: dates[i], data: doc.data() };
          });
        return Promise.resolve(surveys);
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
    async get_cached_surveys(dates: string[], force_refresh: boolean = false): Promise<Survey[]> {
      if (!this.user) return Promise.reject("Missing user");
      try {
        const processed_ref: DocumentReference = doc(db, "processed_surveys", this.personal_account ? this.account_doc?.linked_to : this?.user.uid);
        // check if active doc has survey data for the given dates, and if so, return it
        const current_get: DocumentSnapshot = await getDoc(processed_ref);

        const current: Survey[] = current_get.exists() ? current_get.data()?.list || [] : [];
        // get array of all the dates by mapping
        const current_dates: string[] = current?.map((e) => e.date);
        const errored_dates: string[] = current?.filter((e) => e.error)?.map((e) => e.date) || [];
        // check if current_dates includes all the dates
        const all_dates: boolean = dates.every((e) => current_dates.includes(e));

        // if has all, return the cashed data
        if (all_dates && !force_refresh) {
          _status.log("📊 Using cached surveys");
          return Promise.resolve(current);
        }

        // if not, get the survey data for the given dates, and save it to the active doc
        else {
          if (force_refresh) _status.log("📊 Forcing refresh of surveys");
          // identify which dates are missing if !force_refresh
          const added_dates: string[] = force_refresh ? dates : dates.filter((e) => !current_dates.includes(e) || errored_dates.includes(e));
          // use get_surveys to get the ungotten data
          const added_surveys: Survey[] = (await this.get_surveys(added_dates)) as Survey[];
          // add the new surveys to the current surveys without doubling up, keep them in order
          let new_surveys: Survey[] = [];
          for (const date of dates) {
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
     * @param {String} ref The ref of the task to get the note for
     * @returns {String} The note for the given ref
     * @see {@link set_note}
     * @see {@link notes}
     */
    note_for(ref: string): string | null {
      const path = this.ref_to_path(ref);
      return (this.notes && path && this.notes[path]) || null;
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
    async set_note(note: string, ref: string): Promise<void> {
      try {
        if (!this.active_doc) throw "No active doc";
        if (!ref) throw "No ref provided";
        const path: string | null = this.ref_to_path(ref);

        if (!path) throw "Invalid ref";

        let doc: DocumentData = this.active_doc;
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
    async set_finished(finished: boolean, ref: string): Promise<void> {
      try {
        if (!this.active_doc) throw "No active doc";
        if (!ref) throw "No reference(s) provided";
        const paths: string[] = Array.isArray(ref) ? ref : [ref];

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

        new SuccessToast((paths.length > 1 ? "Tasks" : useMagic().done_prefix(this.tasks.find((e) => e.ref == paths[0]))) + (finished ? " marked as finished" : " marked as unfinished"), 2000);

        return Promise.resolve();
      } catch (err) {
        new ErrorToast(`Task(s) could not be ${finished ? "marked as finished" : "marked as unfinished"}`, err, 2000);
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
    path_to_ref(...args: string[]): string | null {
      //join all args with "/" and let path equal that
      const path: string = [...args].join("/");
      if (!path.length) return null;
      const parts = splitRefSegments(path);
      if (parts.length === 1) {
        // Already classId-only — emit short share form
        return shortShareRef(parts[0]);
      }
      if (parts.length === 2) {
        const [a, b] = parts;
        if (a.includes("@") || a.includes(this.ORG_DOMAIN.replace("@", ""))) {
          // email/classId → short classId (preferred share form)
          rememberClassEmail(b, a.includes("@") ? a : a + this.ORG_DOMAIN);
          return shortShareRef(b);
        }
        // classId/taskId → short classId~taskId
        return shortShareRef(a, b);
      }
      if (parts.length >= 3) {
        const [emailPart, classId, taskId] = parts;
        const email = emailPart.includes("@") ? emailPart : emailPart + this.ORG_DOMAIN;
        rememberClassEmail(classId, email);
        return shortShareRef(classId, taskId);
      }
      return null;
    },
    /**
     * @memberOf .main.actions
     * @function ref_to_path
     * @description Convert a ref to a nested path (email/class_id?/task_id) when email is known.
     * Short classId-only refs resolve email via dual-read cache when possible.
     * @param {String} path The path to convert
     * @returns {String} The ref (email/class_id?/task_id)
     * @default null
     */
    ref_to_path(...args: string[]): string | null {
      //join all args with "/" and let path equal that
      const ref: string = [...args].join("~");
      if (!ref.length) return null;
      const taskParsed = parseTaskId(ref, this.ORG_DOMAIN);
      if (taskParsed) {
        const email = taskParsed.teacherEmail;
        if (email) return buildTaskPath(email, taskParsed.classId, taskParsed.taskId);
        // Short classId~taskId — cannot build nested path without email
        return `${taskParsed.classId}/${taskParsed.taskId}`;
      }
      const classParsed = parseClassId(ref, this.ORG_DOMAIN);
      if (classParsed) {
        if (classParsed.teacherEmail) {
          return classPath(classParsed.teacherEmail, classParsed.classId);
        }
        return classParsed.classId;
      }
      return null;
    },
    /** Short share/view ref for a class (and optional task), dropping email prefix. */
    short_share_ref(classId: string, taskId?: string | null): string {
      return shortShareRef(classId, taskId);
    },
    /**
     * @memberOf .main.actions
     * @function hash
     * @param {String} ref ref in email/uid format
     * @returns {String} 6-character code from ref
     * @see {@link code_from_ref}
     */
    hash(ref: string): string {
      const hash: string = CryptoJS.SHA256(ref).toString();
      return hash.substring(0, 5);
    },
    /**
     * @memberOf .main.actions
     * @function code_from_ref
     * @description Create a proxy code from a ref (email/uid)
     * @param {String} ref ref in email/uid format
     * @see {@link hash}
     */
    async code_from_ref(ref: string): Promise<string> {
      try {
        if (!ref) return Promise.reject("No ref provided");
        // Resolve classId (+ owner email for enroll code doc soak)
        const parsed = parseClassId(ref, this.ORG_DOMAIN);
        let _email = parsed?.teacherEmail;
        let _id = parsed?.classId || writeClassId(ref, this.ORG_DOMAIN) || undefined;
        if (!_email && _id) {
          const resolved = await getClassDoc(db, _id);
          _email = resolved?.teacherEmail;
        }
        if (!_id) {
          // Legacy slash fallback
          ref = ref.split("~").join("/");
          let parts = ref.split("/");
          if (parts.length < 2) return Promise.reject("Invalid ref");
          _email = parts[0].split("@")[0] + this.ORG_DOMAIN;
          _id = parts[1];
        }
        if (!_id) return Promise.reject("Invalid ref");

        // Hash stays on nested email/classId when email known (enroll codes unchanged);
        // fall back to bare classId hash for flat-only classes.
        const hashSource = _email ? _email + "/" + _id : _id;
        const code: string = this.hash(hashSource);

        // check if class object already has code in this.classes
        const class_obj: ClassInfo | undefined = this.classes.find(
          (e) => classEntryMatchesId(e, _id as string)
        );
        if (!class_obj) return Promise.reject("No matching class found");

        if (class_obj?.code !== code) {
          // Codes doc: keep nested ref when email known so enroll soak stays compatible
          const code_ref: DocumentReference = doc(db, "codes", code);
          await setDoc(code_ref, { ref: _email ? _email + "/" + _id : _id });

          // Write code onto flat class doc
          const class_ref: DocumentReference = doc(db, "classes", _id);
          await setDoc(class_ref, { code: code as string } as DocumentData, { merge: true });
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
     * @returns {Promise} A promise that resolves to the ref (email/uid) or rejects with an error
     */
    async ref_from_code(code: string): Promise<string> {
      try {
        if (!(code as string)) throw "No code provided";
        // get ref from code doc
        const code_ref: DocumentReference = doc(db, "codes", code);
        const code_doc: DocumentSnapshot = await getDoc(code_ref);
        _status.log("🔗 Got code doc", code_doc.data());
        if (!code_doc.exists()) throw "Code doesn't exist";
        let ref: string | null = this.path_to_ref(code_doc.data()?.ref);
        if (!ref) throw "Code doesn't have ref";
        return Promise.resolve(ref);
      } catch (err) {
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function apply_live_class
     * @description Replace one enrolled class in Pinia from a remote class-doc snapshot (incl. tasks[]),
     * then re-run get_tasks stamping (date hotfix, color, ref, class_id). Used by live onSnapshot listeners.
     * @param {String} enrollmentPath User-doc classes[] entry (email/classId or classId)
     * @param {Object} raw Class document data from Firestore
     * @param {Object} meta Dual-read resolution metadata
     */
    apply_live_class(
      enrollmentPath: string,
      raw: DocumentData,
      meta: {
        teacherEmail?: string;
        legacyPath?: string;
        source?: string;
        classId?: string;
      } = {}
    ): void {
      if (!enrollmentPath) return;
      if (raw?.archived) {
        this.remove_invalid(enrollmentPath);
        return;
      }

      const classId = meta.classId || enrollmentKeyClassId(enrollmentPath);
      if (meta.teacherEmail) rememberClassEmail(classId, meta.teacherEmail);

      let doc_data: ClassInfo = { ...raw } as ClassInfo;
      doc_data.id = enrollmentPath;
      doc_data.ref = meta.legacyPath || enrollmentPath;
      if (classId) doc_data._class_id = classId;

      doc_data.tasks = doc_data.tasks || [];
      doc_data.tasks = doc_data.tasks.map((task: TaskInfo) => {
        const stamped: TaskInfo = { ...task };
        const tid = stamped.id || (typeof stamped.ref === "string" ? stamped.ref.split("/").pop() : undefined);
        if (tid && classId) {
          stamped.ref = flatTaskPath(classId, tid);
        }
        delete stamped.id;
        return stamped;
      });

      const idx = this.classes.findIndex(
        (c) =>
          c.id === enrollmentPath ||
          c.ref === enrollmentPath ||
          (classId && (c._class_id === classId || (typeof c.id === "string" && c.id.endsWith("/" + classId))))
      );

      if (idx >= 0) {
        const next = [...this.classes];
        next[idx] = doc_data;
        this.classes = next;
      } else {
        const next = [...this.classes, doc_data];
        next.sort((a: ClassInfo, b: ClassInfo) => {
          if (a.period == b.period) {
            return a.name.localeCompare(b.name);
          }
          if (!a.period && a.period !== 0) return 1;
          if (!b.period && b.period !== 0) return -1;
          return a.period - b.period;
        });
        this.classes = next;
      }
      this.get_tasks();
    },
    /**
     * @memberOf .main.actions
     * @function get_tasks
     * @description Get all tasks from all classes
     * @returns {Promise} Promise that resolves to Array of all tasks from all classes, with class name and color added
     * @default []
     * @see {@link fetch_classes}
     */
    async get_tasks(): Promise<ProcessedTaskInfo[]> {
      try {
        if (!this.classes?.length) return Promise.resolve([]);
        // get all the classes with this.classes(), then get all their tasks and combine them into an array
        let tasks: ProcessedTaskInfo[] = [];
        let classes: ClassInfo[] = this.classes;
        for (let i = 0; i < classes.length; i++) {
          let class_tasks: TaskInfo[] = classes[i].tasks as TaskInfo[];
          class_tasks = class_tasks ? class_tasks : [];
          // add class name and color to each task
          for (let j = 0; j < (class_tasks?.length || 0); j++) {
            if (class_tasks[j].archived) continue;
            classes[i].name = classes[i].name ? classes[i].name : "Unnamed Class";
            // check task date type and convert to date object if necessary
            let date: Date | null;
            if (typeof class_tasks[j].date == "string") {
              // convert to mm-dd-yyyy from yyyy-mm-dd if needed
              class_tasks[j].date = (class_tasks[j]?.date as string)?.split("T")[0];
              let [year, month, day] = (class_tasks[j]?.date as string)?.split("-");

              // TODO: track down root of issue where dates are interpreted twice & thus may switch formats w/o hotfix;
              if (year.length == 4) {
                class_tasks[j].date = `${month}-${day}-${year}`;
              }

              date = compatDateObj(class_tasks[j].date as string);
              date = isNaN(+date) ? null : date;
            } else {
              date = class_tasks[j].date as Date | null;
            }
            // set color from parent class color
            class_tasks[j].color = classes[i].color;
            const classTask = class_tasks[j];
            let ref = classTask.ref;
            if (!ref && classTask.id) {
              const cid = classes[i]._class_id || enrollmentKeyClassId(classes[i].id || "") || enrollmentKeyClassId(classes[i].ref || "");
              ref = cid ? flatTaskPath(cid, classTask.id) : undefined;
            }
            tasks.push({
              ...(classTask as ProcessedTaskInfo),
              date: date,
              class_name: this.class_text(classes[i]),
              class_id: classes[i].id,
              ...(ref ? { ref } : {}),
            });
          }
        }
        // sort tasks by day, if day the same, sort by period, then by name
        tasks.sort((a: ProcessedTaskInfo, b: ProcessedTaskInfo) => {
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
      window.localStorage.removeItem(`${process.env.VUE_APP_BRAND_NAME_SHORT}_app_state`);
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
    set_active(data: DocumentData): Promise<void> {
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
    async doc_from_uid(uid: string): Promise<DocumentData> {
      try {
        if (!uid) throw "No account uid provided";
        // get user document from uid
        const linked_doc: DocumentSnapshot = await getDoc(doc(db, "users", uid));
        _status.log("🔗 Got linking account's document");
        if (!linked_doc.exists()) throw "Account doesn't exist or you haven't been added yet";
        return Promise.resolve(linked_doc.data() as DocumentData);
      } catch (err) {
        _status.warn("🔗 Couldn't get linking account's document", err);
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function link_account_uid
     * @description Accept a school-account link invite via callable acceptLink({ schoolUid }), refresh the ID token, then listen to users/{schoolUid} as principal
     * @param {String} uid The school account uid to link to
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     * @see {@link invite_linked}
     */
    async link_account_uid(uid: string): Promise<void> {
      if (!uid) return;
      if (!this.personal_account) {
        new WarningToast("This account is a primary account and cannot be linked", 3000);
        return;
      }
      if (!this.account_doc) {
        await this.create_doc();
        _status.log("📄 Created doc", this.account_doc);
      }
      if (!this.account_doc) return;
      try {
        let schoolName = "school";
        try {
          const linked_doc: DocumentData = await this.doc_from_uid(uid);
          if (linked_doc?.name) schoolName = linked_doc.name;
        } catch {
          // Callable is authoritative for invite validation; name is toast-only
        }

        const acceptLink = httpsCallable(functions, "acceptLink");
        const result = await acceptLink({ schoolUid: uid });
        const data = result?.data as { error?: string; success?: boolean; message?: string } | undefined;
        if (data?.error || data?.success === false) {
          throw data?.error || data?.message || "acceptLink failed";
        }

        // Refresh custom claims / token so rules + callables see the link
        if (this.user) {
          await this.user.getIdToken(true);
        }

        // Mirror linked_to locally; server owns the write
        this.account_doc.linked_to = uid;

        // Listen to school principal doc, not the personal uid
        setupSnapshot(uid);
        await this.get_remote();

        new SuccessToast(`Successfully linked to ${schoolName}'s account!`, 4000);
      } catch (err) {
        new ErrorToast("Couldn't link account", cleanError(err), 2000);
        return Promise.reject(err);
      }
      return Promise.resolve();
    },
    /**
     * @memberOf .main.actions
     * @function invite_linked
     * @description Invite a personal email to link to this school account via callable inviteLinkedAccount (server queues link_invite mail and updates users.linked)
     * @param {String} email The email of the user to invite (and send an invite email to)
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     */
    async invite_linked(email: string): Promise<void> {
      if (!this.user || !this.active_doc || !this.account_doc) return;
      if (this.personal_account) {
        new WarningToast("This account is already linked!", 2000);
      }
      // exclude empty or org emails
      if (!email || validOrgAcc(email) || !email.includes("@")) {
        new WarningToast(`Please enter a valid non-${process.env.VUE_APP_ORG_NAME} email`, 2000);
        return;
      }
      email = email.trim().toLowerCase();
      // check if email is already linked
      if (this.linked_accounts.includes(email)) {
        new WarningToast("That account is already linked", 2000);
        return;
      }
      // ensure local linked array exists for UI update after success
      if (!this.active_doc.linked) {
        if (this.personal_account && this.linked_account_doc) {
          this.linked_account_doc.linked = [];
        } else {
          this.account_doc.linked = [];
        }
      }

      try {
        const inviteLinkedAccount = httpsCallable(functions, "inviteLinkedAccount");
        const result = await inviteLinkedAccount({ email });
        const data = result.data as { error?: string; success?: boolean };

        if (data.error) throw data.error;

        // Server already arrayUnions onto users.linked; mirror locally for UI
        if (this.personal_account && this.linked_account_doc) {
          this.linked_account_doc.linked.push(email);
        } else {
          this.account_doc.linked.push(email);
        }
        new SuccessToast(`We notified ${email}, you'll receive a copy of the email too!`, 4000);
        return Promise.resolve();
      } catch (err) {
        new ErrorToast(`Couldn't invite "${email}"`, cleanError(err), 2000);
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function uninvite_linked
     * @description Unlink a personal email from this school account via callable unlink({ email })
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     * @see {@link invite_linked}
     */
    async uninvite_linked(email: string): Promise<void> {
      try {
        if (!this.user) return;
        const normalized = (email || "").trim().toLowerCase();
        if (!normalized) return;

        if (!this.active_doc?.linked?.includes(normalized) && !this.active_doc?.linked?.includes(email)) {
          new WarningToast(`${normalized} is not linked to this account`, 2000);
          return;
        }

        const unlinkCallable = httpsCallable(functions, "unlink");
        const result = await unlinkCallable({ email: normalized });
        const data = result?.data as
          | { error?: string; success?: boolean; message?: string; linked?: string[] }
          | undefined;
        if (data?.error || data?.success === false) {
          throw data?.error || data?.message || "unlink failed";
        }

        // Server owns users.linked[]; mirror locally for UI
        const filtered_linked: string[] = Array.isArray(data?.linked)
          ? data.linked
          : this.active_doc.linked?.filter((e) => e != normalized && e != email) || [];
        if (this.personal_account && this.linked_account_doc) {
          this.linked_account_doc.linked = filtered_linked;
        } else if (this.account_doc) {
          this.account_doc.linked = filtered_linked;
        }
        new SuccessToast(`Removed ${normalized} from your linked accounts`, 2000);
        return Promise.resolve();
      } catch (err) {
        new ErrorToast(`Couldn't unlink "${email}"`, cleanError(err), 2000);
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function refresh_timeout
     * @description A proxy for the refreshTimeout function in firebase.ts (to reduce unnecessary onSnapshot calls)
     * @param {Number} delay The delay in milliseconds to refresh the timeout for (default 1000 set in firebase.ts)
     * @see {@link refreshTimeout}
     */
    refresh_timeout(delay: number): void {
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
    async login_promise(): Promise<User> {
      // wait for this.user to be set
      return new Promise((resolve) => {
        const interval = setInterval(() => {
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
    async save_join_form(responses: object): Promise<void> {
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
    async finish_tutorial(new_val: boolean = true): Promise<void> {
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
    async save_daily_survey(responses: object[]): Promise<void> {
      // save responses in /survey/daily/{date}/{uid}
      try {
        // wait for user login
        if (!this.user) await this.login_promise();
        const survey_ref: DocumentReference = doc(db, "survey", "daily", today, this.personal_account ? this.account_doc?.linked_to : this.user?.uid);
        await setDoc(survey_ref, {
          time: new Date().getTime(),
          responses: responses,
        } as DocumentData);

        // update user doc to have date in "done_surveys"
        let updated_surveys: string[] = this.active_doc?.done_surveys ? this.active_doc.done_surveys : [];
        updated_surveys.push(today);

        if (this.personal_account && this.linked_account_doc) {
          this.linked_account_doc.done_surveys = updated_surveys;
        } else if (this.account_doc) {
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
    async toggle_theme(): Promise<void> {
      this.theme = this.get_theme == Theme.Light ? Theme.Dark : Theme.Light;
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
      return Promise.resolve();
    },
    /**
     * @memberOf .main.actions
     * @function toggle_simplified
     * @description Toggle the simplified display view
     * @see {@link account_doc}
     */
    async toggle_simplified(): Promise<void> {
      if (!this.account_doc) return;
      const simplified: boolean = !this.account_doc.prefs?.simplified;
      this.account_doc.prefs = { ...this.account_doc.prefs, simplified: simplified };

      await this.update_wrapper_acc_doc();

      new SuccessToast(`Switched to ${simplified ? "simplified" : "detailed (classic)"} view`, 2000);
      return Promise.resolve();
    },
    /**
     * @memberOf .main.actions
     * @function remove_class_id_helper
     * @description Leave/unenroll via callable unenrollClass({ classId }). Server owns users.classes[]; local cache only.
     * @see {@link remove_class}
     * @see {@link remove_invalid}
     * @see {@link fetch_classes}
     */
    async remove_class_id_helper(class_id: ClassID): Promise<void> {
      const classId =
        bareClassIdFromEnrollment(class_id) || writeClassId(class_id, this.ORG_DOMAIN) || class_id;
      if (!classId) throw "Invalid class id";

      const unenrollClass = httpsCallable(functions, "unenrollClass");
      const result = await unenrollClass({ classId });
      const data = result?.data as
        | { error?: string; success?: boolean; message?: string; classes?: string[] }
        | undefined;
      if (data?.error || data?.success === false) {
        throw data?.error || data?.message || "unenrollClass failed";
      }

      // Mirror enrollment locally — do not write users.classes[] from the client
      const filtered_classes: ClassID[] = Array.isArray(data?.classes)
        ? data.classes
        : (this.active_doc?.classes || []).filter(
            (c) => c != class_id && bareClassIdFromEnrollment(c) !== classId
          );
      if (this.personal_account && this.linked_account_doc) {
        this.linked_account_doc.classes = filtered_classes;
      } else if (this.account_doc) {
        this.account_doc.classes = filtered_classes;
      }
      this.classes = this.classes.filter(
        (c) => c.id != class_id && !classEntryMatchesId(c, classId)
      );
      this.get_tasks();
      syncClassListeners(filtered_classes || []);
      return Promise.resolve();
    },
    /**
     * @memberOf .main.actions
     * @function remove_invalid
     * @description Remove a class from the active user's document, and show a toast saying that the class was removed because it was invalid
     * @see {@link remove_class_id_helper}
     */
    async remove_invalid(class_id: ClassID): Promise<void> {
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
    async remove_class(class_id: ClassID): Promise<void> {
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
    set_user(user: User): void {
      // TODO: TS rewrite this to use async/await and return a promise
      _status.log("🔑 Setting user");
      // Legacy local teacher-mode override; role is authoritative now
      window.localStorage.removeItem(`${process.env.VUE_APP_BRAND_NAME_SHORT}_teacher_mode`);
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
            (!validOrgAcc(user.email) && !(this.personal_account && (router?.currentRoute?.value?.name == "link" || (this.account_doc?.personal_account && this.account_doc?.linked_to))))
          ) {
            auth.signOut();
            new WarningToast(`Please use your ${process.env.VUE_APP_ORG_NAME} (@${process.env.VUE_APP_ORG_DOMAIN}) email to log in, or use an account that has been linked`, 4000);
            this.clear();
            return;
          }
          this.user = user;
          // if this is a personal account, get the associated linked account doc
          if (this.personal_account) {
            this.get_remote()
              .then(() => {
                // Principal listener: school uid, not personal uid
                if (this.account_doc?.linked_to) {
                  setupSnapshot(this.account_doc.linked_to);
                }
              })
              .catch((err) => {
                _status.warn("🔗 get_remote / principal snapshot failed", err);
              });
          }
          // if teacher, point collection_ref at top-level classes (flat writes)
          if (this.is_teacher) {
            _status.log("🏫 In teacher mode");
            this.teacher.doc_ref = null;
            this.teacher.collection_ref = collection(db, "classes");
          }
          // if router has a redirect, go to it
          if (router.currentRoute?.value?.query?.redirect && !router.currentRoute?.value?.meta?.blockStandardRedirect) {
            router.replace(router.currentRoute?.value?.query?.redirect as string);
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
    async login(): Promise<void> {
      // TODO: TS rewrite this to use async/await and return a promise
      ensureAuthLanguage();
      // check that we dont have a useragent that will be blocked by google (Instagram)
      const disallowedAgents: string[] = ["Instagram"];
      if (
        disallowedAgents.some((agent) => {
          return navigator.userAgent.includes(agent);
        })
      ) {
        new ErrorToast("This browser is not supported, please use your device's main browser", 2000);
        return Promise.reject("This browser isn't supported; please use a different browser");
      }

      new Toast("Opening login popup...", "default", 1000, require("@svonk/util/assets/info-locked-icon.svg"));
      // sign in with google, then set user data
      // if electron, use redirect, otherwise, use popup
      await (isElectron || isIFrame() ? signInWithRedirect(auth, provider) : signInWithPopup(auth, provider))
        .then(() => {
          if (!this.user || !this.user.email || !validOrgAcc(this.user.email)) return;
          new Toast("Logged in as " + this.user.displayName + "!", "default", 2000, require("@svonk/util/assets/info-unlocked-icon.svg"));
          _status.log("🔑 Logged in as " + this.user.displayName);
          authChangeAction(this.user);
          if (!router.currentRoute?.value?.query?.redirect && !router.currentRoute?.value?.meta?.blockStandardRedirect) {
            router.push("/portal");
          }
          return Promise.resolve();
        })
        .catch((error) => {
          const err: string = cleanError(error);
          if (error.code == "auth/cancelled-popup-request" || error.code == "auth/popup-closed-by-user" || error.code == "auth/user-cancelled") {
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
    async login_personal(): Promise<void> {
      // TODO: TS rewrite this to use async/await and return a promise
      ensureAuthLanguage();
      new Toast("Opening login popup...", "default", 1000, require("@svonk/util/assets/info-locked-icon.svg"));
      // create new provider with no hd
      const personal_provider = new GoogleAuthProvider();
      personal_provider.addScope("email");
      personal_provider.addScope("profile");
      // sign in with google, then set user data
      // if electron, use redirect, otherwise, use popup
      await (isElectron || isIFrame() ? signInWithRedirect(auth, personal_provider) : signInWithPopup(auth, personal_provider))
        .then((r) => {
          if (!r.user || !r.user.email || validOrgAcc(r.user.email)) this.logout();
          new Toast("Logged in as " + r.user.displayName + "!", "default", 2000, require("@svonk/util/assets/info-unlocked-icon.svg"));
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
    async logout(): Promise<void> {
      if (router.currentRoute?.value?.meta?.requiresAuth) {
        await router.push({ path: "/" });
      }
      auth.signOut();
      this.clear();
      // redirect if current route requires auth
      new Toast("Logged Out", "default", 1500, require("@svonk/util/assets/info-locked-icon.svg"));
      return Promise.resolve();
    },
    /**
     * @memberOf .main.actions
     * @function get_remote
     * @description Get the user's document from the remote database, and create it if it doesn't exist. Preforms additional checks for personal accounts, and removes the linked account if it doesn't exist
     * @see {@link create_doc}
     * @see {@link update_remote}
     * @see {@link active_doc}
     */
    async get_remote(): Promise<void> {
      if (!this.user || !this.active_ref) return;
      // get doc from firebase
      const active_doc: DocumentSnapshot = await getDoc(this.active_ref);
      _status.log("📄 Got user doc remote");
      if (active_doc.exists()) {
        this.set_active(active_doc.data());
      } else if (this.personal_account) {
        // linked account doesn't exist
        _status.log("🔗 Linked account doesn't exist, removing it and going home");
        new WarningToast("Linked account doesn't exist, removing it and going home", 2000);
        if (this.account_doc) {
          this.account_doc.linked_to = null;
        }
        await this.update_wrapper_acc_doc();
        this.linked_account_doc = null;
        router.push("/");
      } else {
        // if doc doesn't exist, create it
        await this.create_doc();
        await this.get_remote();
      }
      return Promise.resolve();
    },
    /**
     * @memberOf .main.actions
     * @function update_remote
     * @description Update the active user's document in the remote database
     * @see {@link get_remote}
     * @see {@link active_doc}
     * @see {@link active_ref}
     */
    async update_remote(): Promise<void> {
      if (!this.active_ref) return;
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
    async update_wrapper_acc_doc(): Promise<void> {
      if (!this.account_ref) return;
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
    async update_wrapper_with_merge(data: DocumentData): Promise<void | string> {
      if (!this.account_ref) return Promise.reject("No account ref");
      try {
        await setDoc(this.account_ref, data as DocumentData, { merge: true });
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
    async create_doc(): Promise<void> {
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
    async create_teacher_doc(): Promise<void> {
      // Flat model: do NOT create classes/{email} teacher-root docs — they collide
      // with classes/{classId}. Writers use collection(db, "classes") directly.
      this.teacher = {
        doc_ref: null,
        collection_ref: collection(db, "classes"),
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
    async fetch_classes(): Promise<void> {
      let run_hash: string = Math.random().toString(36).substring(7);
      _status.log(`📚 Started fetch   | <${run_hash}>`);
      // check for duplicates
      if (!this.active_doc?.classes) {
        let i: number = 0;
        const max: number = 10000,
          warn: number = 1500,
          len: number = 100;
        while (!this.active_doc?.classes && i < max / len) {
          await new Promise((resolve) => setTimeout(resolve, len));
          i++;
        }
        if (!this.active_doc?.classes) {
          return Promise.reject("Classes not found in user doc within load cycle");
        } else if (i * len >= warn) {
          _status.warn(`📚 Initial class fetch took ${i * len}ms, warning set at ${warn}ms`);
          new WarningToast(`Initial class fetch took ${i * len}ms. Your network connection may negativly affect site preformance.`, 3500);
        }
      }

      let unique: string[] = [...(new Set(this.active_doc.classes) as Set<string>)];
      if (unique.length != this.active_doc.classes.length) {
        // Local-only dedupe — do not write users.classes[] from the client
        if (this.personal_account && this.linked_account_doc) {
          this.linked_account_doc.classes = unique;
        } else if (this.account_doc) {
          this.account_doc.classes = unique;
        }
        new WarningToast("Removed duplicate classes", 2000);
        _status.log("📚 Removed duplicate classes (local)");
      }

      // Snapshot wins race if it lands after this hydrate starts
      const hydrateEpoch = beginHydrateEpoch();

      // get all classes' data and combine into an array (dual-read: flat first, nested fallback)
      let classes: ClassInfo[] = [];
      for (let class_path of this.active_doc.classes as string[]) {
        // split class path into teacher/uid (or bare classId)
        const parts = (class_path || "").split("/").filter(Boolean);
        const teacher = parts.length >= 2 ? parts[0] : undefined;
        const class_id = parts.length >= 2 ? parts[1] : parts[0];
        if (!class_id) {
          await this.remove_invalid(class_path);
          continue;
        }
        if (teacher) rememberClassEmail(class_id, teacher);

        const classResult = await getClassDoc(db, class_id, teacher);
        if (!classResult) {
          await this.remove_invalid(class_path);
          continue;
        }
        // Snapshot wins a race if newer than this hydrate — keep live copy
        if (!hydrateBeatsLive(class_path, hydrateEpoch)) {
          const live = this.classes.find((c) => c.id === class_path);
          if (live) {
            classes.push(live);
            continue;
          }
        }
        // push class to array
        let doc_data: ClassInfo = { ...classResult.data } as ClassInfo;
        if (doc_data.archived) {
          await this.remove_invalid(class_path);
          continue;
        }
        // Keep enrollment pointer as id; dual-read may still expose nested legacyPath
        doc_data.id = class_path;
        doc_data.ref = classResult.legacyPath || class_path;
        doc_data._class_id = class_id;
        if (classResult.teacherEmail) {
          rememberClassEmail(class_id, classResult.teacherEmail);
        }

        classes.push(doc_data);
      }
      _status.log(`📚 Got class docs  | <${run_hash}>`);
      // Stamp task refs as flat classId/taskId for writers

      classes = classes.map((class_data: ClassInfo) => {
        const cid = class_data._class_id || enrollmentKeyClassId(class_data.id || "");
        class_data.tasks = class_data.tasks || [];
        class_data.tasks = class_data.tasks.map((task: TaskInfo) => {
          if (task.id && cid) {
            task.ref = flatTaskPath(cid, task.id);
          }
          delete task.id;
          return task;
        });
        return class_data;
      });
      _status.log(`📚 Processed tasks | <${run_hash}>`);

      // sort classes by period number, then by name
      classes.sort((a: ClassInfo, b: ClassInfo) => {
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
      // Attach / resync live class-doc listeners after hydrate (cap = enrollment size)
      syncClassListeners(unique);
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
    async fetch_classes_by_email(email: string) {
      this.loaded_email = null;
      if (!email || !validOrgAcc(email)) {
        this.loaded_classes = null;
        this.loaded_email = email;
        return;
      }
      _status.log("📄 Getting classes from email");
      let classes: ClassInfo[] = [];
      const classes_subcollection: CollectionReference = collection(doc(db, "classes", email), "classes");
      let classes_subcollection_snapshot: QuerySnapshot = await getDocs(classes_subcollection);
      _status.log("📄 Got classes subcollection from email");
      classes_subcollection_snapshot.forEach((class_doc: DocumentSnapshot) => {
        let class_data: ClassInfo = class_doc.data() as ClassInfo;
        class_data.id = class_doc.id;
        // if user already in class, change name to "[JOINED] name"
        class_data.is_joined = this.active_doc?.classes.includes([email, class_doc.id].join("/"));
        if (!class_data.archived)
          classes.push(class_data);
      });
      classes.sort((a: ClassInfo, b: ClassInfo) => {
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
     * @description Enroll in a class via callable enrollClass({ classId }) (classId or join code). Server owns users.classes[].
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     * @param {String} teacher_email The email of the teacher whose class it is (legacy; used to resolve classId)
     * @param {String} class_id The id of the class to add (or join code)
     * @param {String} class_name The name of the class being added
     * @param {Number} class_period The period of the class being added
     * @see {@link classes}
     */
    async add_class(
      teacher_email: string,
      class_id: ClassID,
      class_name: string,
      class_period: number,
      options?: { quiet?: boolean }
    ) {
      if (!this.active_doc?.classes) return;
      if (!class_id) return;

      const classId =
        writeClassId(class_id, this.ORG_DOMAIN) ||
        (teacher_email ? writeClassId([teacher_email, class_id].join("/"), this.ORG_DOMAIN) : null) ||
        class_id;

      const alreadyEnrolled = (this.active_doc.classes || []).some(
        (c) =>
          c === classId ||
          bareClassIdFromEnrollment(c) === classId ||
          (teacher_email && c === [teacher_email, class_id].join("/"))
      );
      if (alreadyEnrolled) return;

      try {
        const enrollClass = httpsCallable(functions, "enrollClass");
        const result = await enrollClass({ classId });
        const data = result?.data as
          | { error?: string; success?: boolean; message?: string; classes?: string[] }
          | undefined;
        if (data?.error || data?.success === false) {
          throw data?.error || data?.message || "enrollClass failed";
        }

        // Mirror enrollment locally — do not write users.classes[] from the client
        if (Array.isArray(data?.classes)) {
          if (this.personal_account && this.linked_account_doc) {
            this.linked_account_doc.classes = data.classes;
          } else if (this.account_doc) {
            this.account_doc.classes = data.classes;
          }
        } else {
          const enrollmentKey = classId;
          if (!(this.active_doc.classes || []).some((c) => bareClassIdFromEnrollment(c) === classId || c === enrollmentKey)) {
            if (this.personal_account && this.linked_account_doc) {
              this.linked_account_doc.classes.push(enrollmentKey);
            } else if (this.account_doc) {
              this.account_doc.classes.push(enrollmentKey);
            }
          }
        }

        await this.fetch_classes();
        if (!options?.quiet) {
          new SuccessToast(
            `Added "${this.class_text({
              name: class_name,
              period: class_period,
              ref: classId,
              tasks: [],
            })}" to your classes`,
            2000
          );
        }
        return Promise.resolve();
      } catch (err) {
        new ErrorToast("Couldn't add class", cleanError(err), 2000);
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function create_class
     * @description Create a class at classes/{classId} (flat), with owner teachers[] + teachers/{email} subdoc. (for teachers)
     * @param {Object} class_obj The class object with class data
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     * @see {@link is_teacher}
     * @see {@link teacher}
     */
    async create_class(class_obj: ClassInfo): Promise<void> {
      _status.log("🔨 Creating class", class_obj);
      if (!this.is_teacher) {
        new WarningToast("You need to be a teacher to create a class", 2000);
        return;
      }
      if (!class_obj.name) return; // handled in disabled attr of button, failsafe for db
      const email = this.active_doc?.email || this.user?.email;
      if (!email) {
        return Promise.reject("No teacher email");
      }
      try {
        // Ensure teacher collection points at top-level classes (never classes/{email})
        if (!this.teacher.collection_ref) {
          this.teacher.collection_ref = collection(db, "classes");
        }

        const ownerName =
          this.active_doc?.name || this.user?.displayName || email.split("@")[0];
        const owner = { email, name: ownerName, role: "owner" as const };
        const {
          id: _dropId,
          ref: _dropRef,
          tasks: _dropTasks,
          _class_id: _c,
          _teacher_email: _t,
          _source: _s,
          _share_ref: _sh,
          _implied_owner: _i,
          ...rest
        } = class_obj as ClassInfo & Record<string, unknown>;
        void _dropId;
        void _dropRef;
        void _dropTasks;
        void _c;
        void _t;
        void _s;
        void _sh;
        void _i;

        const write_obj: DocumentData = {
          ...rest,
          owner_email: email,
          teachers: [owner],
          teacher_emails: [email],
        };

        // Flat create: addDoc on top-level classes collection (never classes/{email}/classes)
        const class_doc_ref: DocumentReference = await addDoc(collection(db, "classes"), write_obj);
        const classId = class_doc_ref.id;

        // Owner person subdoc under classes/{classId}/teachers/{email}
        await setDoc(
          doc(db, "classes", classId, "teachers", email),
          {
            email,
            name: ownerName,
            role: "owner",
          },
          { merge: true }
        );
        rememberClassEmail(classId, email);

        new SuccessToast(`Created class "${this.class_text(class_obj)}"`, 2000);
        _status.log("🏫 Created flat class w/ id", classId);

        // Enroll self via callable (server owns users.classes[])
        if (this.active_doc?.classes) {
          await this.add_class(email, classId, class_obj.name, class_obj.period, { quiet: true });
        }
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
    async create_task(task_obj: TaskInfo, task_classes: ClassID[]): Promise<void> {
      try {
        if (!task_obj.name && task_obj?.type != "note") {
          return Promise.reject("No task name specified");
        } else if (!task_classes || task_classes.length == 0) {
          return Promise.reject("No classes selected");
        }
        // Flat writes: classes/{classId}/tasks/{taskId}
        let batch: WriteBatch = writeBatch(db);
        let updated_classes: ClassInfo[] = Array.from(this.classes);
        task_classes.forEach((enrollmentOrId: ClassID) => {
          const classId = bareClassIdFromEnrollment(enrollmentOrId) || writeClassId(enrollmentOrId, this.ORG_DOMAIN);
          if (!classId) return;
          const displayed_class_id: string = enrollmentOrId;
          const class_tasks_collection: CollectionReference = collection(db, "classes", classId, "tasks");
          task_obj.class_id = classId;

          const task_ref: DocumentReference = doc(class_tasks_collection);
          batch.set(task_ref, { ...task_obj, class_id: classId });
          updated_classes.forEach((class_obj: ClassInfo) => {
            if (classEntryMatchesId(class_obj, classId) || class_obj.id == displayed_class_id) {
              class_obj.tasks?.push({
                ...task_obj,
                ref: flatTaskPath(classId, task_ref.id),
                class_id: class_obj.id || classId,
                _proxy: true,
              });
            }
          });
        });
        await batch.commit();
        // update this.classes.tasks for each, then rerun get_tasks to update this.tasks from updated classes
        this.classes = updated_classes;
        this.get_tasks();

        const name: string = task_obj.type == "note" ? "" : `"${task_obj.name}"`;
        new SuccessToast(`Added ${task_obj.type || "task"} ${name} to ${task_classes.length} class${task_classes.length == 1 ? "" : "es"}`, 2000);
        _status.log(`📝 Created task ${name} for ${task_classes.length} classes`);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * @memberOf .main.actions
     * @function create_repeating_task
     * @description Create a repeating task series (for teachers)
     * @param {Object} task_obj The task object template
     * @param {Array} task_classes The classes to add the task to
     * @param {Object} repetition The repetition configuration
     * @returns {Promise} A promise that resolves to nothing or rejects with an error
     */
    normalize_repetition_end(end: { type: string; value?: number | string; date?: string }) {
      const normalized: { type: string; value?: number | string; date?: string } = {
        type: end.type,
        value: end.type === "date" ? end.date ?? end.value : end.value,
      };
      if (end.type === "date" && (end.date ?? end.value)) {
        normalized.date = (end.date ?? end.value) as string;
      }
      return normalized;
    },
    sanitize_repeating_task_updates(updates: any) {
      const { ref, id, _class, class_obj, class_id, color, ...safeUpdates } = updates || {};
      return safeUpdates;
    },
    async create_repeating_task(task_obj: TaskInfo, task_classes: ClassID[], repetition: any): Promise<void> {
      try {
        if (!task_obj.name && task_obj?.type != "note") {
          return Promise.reject("No task name specified");
        } else if (!task_classes || task_classes.length == 0) {
          return Promise.reject("No classes selected");
        }

        const normalizedRepetition = {
          ...repetition,
          end: this.normalize_repetition_end(repetition.end),
        };

        // Prefer bare classId for callable payload (server accepts both during cutover)
        const classIds = task_classes
          .map((c) => bareClassIdFromEnrollment(c) || writeClassId(c, this.ORG_DOMAIN))
          .filter(Boolean) as string[];
        const taskPayload = {
          ...task_obj,
          class_id: classIds[0] || writeClassId(task_obj.class_id, this.ORG_DOMAIN) || task_obj.class_id,
        };

        const createRepeatingTask = httpsCallable(functions, "createRepeatingTask");
        const result = await createRepeatingTask({
          task: taskPayload,
          classes: classIds.length ? classIds : task_classes,
          repetition: normalizedRepetition,
        });
        const data = result.data as any;

        if (data.error) throw data.error;

        _status.log(`📝 Created repeating task series (${data.count} tasks)`);
        new SuccessToast(`Created ${data.count} repeating ${task_obj.type}s`, 2000);

        // Refresh classes to see new tasks
        await this.fetch_classes();
        return Promise.resolve();
      } catch (e) {
        new ErrorToast("Couldn't create repeating tasks", cleanError(e), 2000);
        return Promise.reject(e);
      }
    },

    /**
     * @memberOf .main.actions
     * @function update_repeating_task
     * @description Update a repeating task series
     */
    async update_repeating_task(repetition_group_id: string, updates: any, scope: "future" | "all", task_ref: string, task_date: string): Promise<void> {
      try {
        const safeUpdates = this.sanitize_repeating_task_updates(updates);
        const ids = writeTaskIds(task_ref, this.ORG_DOMAIN);
        // Prefer classId~taskId (or classId/taskId) for callable; server accepts both
        const preferredRef = ids ? shortShareRef(ids.classId, ids.taskId) : task_ref;
        const updateRepeatingTask = httpsCallable(functions, "updateRepeatingTask");
        const result = await updateRepeatingTask({
          repetition_group_id,
          updates: safeUpdates,
          scope,
          task_ref: preferredRef,
          task_date,
          ...(ids ? { classId: ids.classId, taskId: ids.taskId } : {}),
        });
        const data = result.data as any;

        if (data.error) throw data.error;

        _status.log(`📝 Updated repeating task series (${data.count} tasks)`);
        new SuccessToast(`Updated ${data.count} tasks in series`, 2000);

        // Update local state immediately to prevent UI desync
        const referenceDate = task_date ? new Date(task_date + "T00:00:00") : null;
        const updatedClasses = this.classes.map((classInfo: ClassInfo) => {
          if (!classInfo.tasks) return classInfo;
          classInfo.tasks = classInfo.tasks.map((task: TaskInfo) => {
            if (task.repetition_group_id !== repetition_group_id) return task;
            // For "future" scope, only update tasks on or after the reference date
            if (scope === "future" && referenceDate) {
              const taskDateStr = typeof task.date === "string" ? task.date : "";
              const taskDate = taskDateStr ? new Date(taskDateStr.split("T")[0] + "T00:00:00") : null;
              if (taskDate && taskDate < referenceDate) return task;
            }
            return { ...task, ...safeUpdates };
          });
          return classInfo;
        });
        this.classes = [...updatedClasses];
        this.get_tasks();

        // Also refresh from server in background for consistency
        this.fetch_classes();
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    },

    /**
     * @memberOf .main.actions
     * @function delete_repeating_task
     * @description Delete a repeating task series
     */
    async delete_repeating_task(repetition_group_id: string, scope: "future" | "all", task_ref: string, task_date: string): Promise<void> {
      try {
        const ids = writeTaskIds(task_ref, this.ORG_DOMAIN);
        const preferredRef = ids ? shortShareRef(ids.classId, ids.taskId) : task_ref;
        const deleteRepeatingTask = httpsCallable(functions, "deleteRepeatingTask");
        const result = await deleteRepeatingTask({
          repetition_group_id,
          scope,
          task_ref: preferredRef,
          task_date,
          ...(ids ? { classId: ids.classId, taskId: ids.taskId } : {}),
        });
        const data = result.data as any;

        if (data.error) throw data.error;

        _status.log(`🗑️ Deleted repeating task series (${data.count} tasks)`);
        new SuccessToast(`Archived ${data.count} tasks in series`, 2000);

        // Update local state immediately to prevent UI desync
        const referenceDate = task_date ? new Date(task_date + "T00:00:00") : null;
        const updatedClasses = this.classes.map((classInfo: ClassInfo) => {
          if (!classInfo.tasks) return classInfo;
          classInfo.tasks = classInfo.tasks.filter((task: TaskInfo) => {
            if (task.repetition_group_id !== repetition_group_id) return true;
            // For "future" scope, only remove tasks on or after the reference date
            if (scope === "future" && referenceDate) {
              const taskDateStr = typeof task.date === "string" ? task.date : "";
              const taskDate = taskDateStr ? new Date(taskDateStr.split("T")[0] + "T00:00:00") : null;
              if (taskDate && taskDate < referenceDate) return true;
            }
            return false;
          });
          return classInfo;
        });
        this.classes = [...updatedClasses];
        this.get_tasks();

        // Also refresh from server in background for consistency
        this.fetch_classes();
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * @memberOf .main.actions
     * @function update_class
     * @description Update an instance of a class (for teachers). Writes flat classes/{classId}.
     * @param {String} class_ref classId or legacy email/class_id
     * @param {Object} class_obj The updated class object
     * @returns {Promise} A promise that resolves to nothing or rejects with an error
     */
    async update_class(class_ref: ClassID, class_obj: ClassInfo): Promise<void> {
      try {
        // Strip UI-only fields before write
        const {
          _class_id: _c,
          _teacher_email: _t,
          _source: _s,
          _share_ref: _sh,
          _implied_owner: _i,
          ref: _r,
          id: _idField,
          teachers: _teachersWrite,
          teacher_emails: _teacherEmailsWrite,
          ...write_obj
        } = class_obj as ClassInfo & Record<string, unknown>;
        void _c;
        void _t;
        void _s;
        void _sh;
        void _i;
        void _r;
        void _idField;
        // teachers[] membership is owned by addClassTeacher/removeClassTeacher callables (never canvas.import here)
        void _teachersWrite;
        void _teacherEmailsWrite;

        const classId =
          writeClassId(class_ref, this.ORG_DOMAIN) ||
          (class_obj as ClassInfo)._class_id ||
          bareClassIdFromEnrollment(class_ref);
        if (!classId) throw "Cannot resolve classId for class update";

        // Flat writer path
        await setDoc(doc(db, "classes", classId), write_obj as DocumentData, { merge: true });
        _status.log("📝 Updated remote class (flat)", classId);
        if (class_obj.archived) {
          // Remove any enrollment pointer form (bare or nested)
          const enrollmentKeys = [
            ...(this.active_doc?.classes || []).filter(
              (c) => c === classId || bareClassIdFromEnrollment(c) === classId
            ),
          ];
          for (const key of enrollmentKeys) {
            await this.remove_class_id_helper(key);
          }
          if (this.loaded_classes !== null) {
            this.loaded_classes = this.loaded_classes.filter(
              (c) => c.id !== classId && bareClassIdFromEnrollment(c.id) !== classId
            );
          }
          _status.log("📝 Archived class");
          return Promise.resolve();
        }
        let classes: ClassInfo[] = this.classes;
        // update local version of class in classes
        const classIndex = classes.findIndex((c) => classEntryMatchesId(c, classId));
        if (classIndex !== -1) {
          // Update the class object within the classes array
          classes[classIndex] = { ...classes[classIndex], ...write_obj, _proxy: true };
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
     * @description Update an instance of a task from a class (for teachers). Writes flat classes/{classId}/tasks/{taskId}.
     * @param {String} task_ref classId/taskId or legacy email/class_id/task_id
     * @param {Object} task_obj The updated task object
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     */
    async update_task(task_ref, task_obj) {
      try {
        delete task_obj.class_id;
        delete task_obj.ref;
        delete task_obj._class;
        const ids = writeTaskIds(task_ref, this.ORG_DOMAIN);
        if (!ids) throw "Invalid task ref";
        const { classId, taskId } = ids;
        // Flat writer path
        await setDoc(doc(db, "classes", classId, "tasks", taskId), task_obj, { merge: true });
        _status.log("📝 Updated remote task (flat)", classId, taskId);
        let classes: ClassInfo[] = this.classes;
        const classIndex: number = classes.findIndex((class_obj) => classEntryMatchesId(class_obj, classId));
        const ref: string = flatTaskPath(classId, taskId);
        if (classIndex !== -1) {
          const taskIndex = classes[classIndex].tasks?.findIndex((task) => {
            if (task.ref === ref || task.ref === task_ref) return true;
            const tid = writeTaskIds(task.ref, this.ORG_DOMAIN);
            return tid?.taskId === taskId && tid?.classId === classId;
          });

          if (taskIndex !== undefined && taskIndex !== -1) {
            // Update the task object within the tasks array of the class_obj
            // TODO: TS doesn't like this, but should work always
            // @ts-ignore
            classes[classIndex].tasks[taskIndex] = {
              ...task_obj,
              ref: ref,
              class_id: classes[classIndex].id || classId,
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
     * @description Archive an instance of a task from a class (for teachers). Deletes flat classes/{classId}/tasks/{taskId}.
     * @param {String} task_ref classId/taskId or legacy email/class_id/task_id
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     * @see {@link create_task}
     * @note This currently only removes the instance of the task being viewed. Could add a secondary modal to allow deletion of multiple instances instead?
     */
    async archive_task(task_ref: string): Promise<void> {
      const ids = writeTaskIds(task_ref, this.ORG_DOMAIN);
      if (!ids) return Promise.reject("Invalid task ref");
      const { classId, taskId } = ids;
      try {
        await deleteDoc(doc(db, "classes", classId, "tasks", taskId));
        _status.log("📄 Archived task (flat)", classId, taskId);

        try {
          let classes: ClassInfo[] = this.classes;
          classes.forEach((class_obj) => {
            if (classEntryMatchesId(class_obj, classId)) {
              class_obj.tasks = class_obj.tasks?.filter((task) => {
                if (task.ref === flatTaskPath(classId, taskId) || task.ref === task_ref) return false;
                const tid = writeTaskIds(task.ref, this.ORG_DOMAIN);
                return !(tid?.taskId === taskId && tid?.classId === classId);
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
     * @function unarchive_task
     * @description Restore a flattened archived task in-place (classes/{classId}/tasks/{taskId}).
     * Clears archived / archived_at set by migrateFlattenClasses. Writes flat only.
     * @param {String} task_ref classId/taskId or legacy email/class_id/task_id
     * @returns {Promise} A promise that resolves to nothing or rejects with an {String} error
     */
    async unarchive_task(task_ref: string): Promise<void> {
      const ids = writeTaskIds(task_ref, this.ORG_DOMAIN);
      if (!ids) return Promise.reject("Invalid task ref");
      const { classId, taskId } = ids;
      try {
        const parsed = parseTaskId(task_ref, this.ORG_DOMAIN);
        const taskResult = await getTaskDoc(db, classId, taskId, parsed?.teacherEmail);
        if (!taskResult) return Promise.reject("Task not found");

        const { id: _dropId, ...taskFields } = taskResult.data as TaskInfo & { id?: string };
        void _dropId;
        await setDoc(
          doc(db, "classes", classId, "tasks", taskId),
          {
            ...taskFields,
            archived: false,
            archived_at: deleteField(),
          },
          { merge: true }
        );
        _status.log("📄 Unarchived task (flat)", classId, taskId);

        try {
          const flatRef = flatTaskPath(classId, taskId);
          let classes: ClassInfo[] = this.classes;
          classes.forEach((class_obj) => {
            if (!classEntryMatchesId(class_obj, classId)) return;
            const restored: TaskInfo = {
              ...(taskResult.data as TaskInfo),
              ref: flatRef,
              class_id: class_obj.id || classId,
              archived: false,
              _proxy: true,
            };
            delete restored.archived_at;
            delete restored.id;

            const tasks = class_obj.tasks ? [...class_obj.tasks] : [];
            const taskIndex = tasks.findIndex((task) => {
              if (task.ref === flatRef || task.ref === task_ref) return true;
              const tid = writeTaskIds(task.ref, this.ORG_DOMAIN);
              return tid?.taskId === taskId && tid?.classId === classId;
            });
            if (taskIndex >= 0) {
              tasks[taskIndex] = restored;
            } else {
              tasks.push(restored);
            }
            class_obj.tasks = tasks;
          });
          this.classes = classes;
          this.get_tasks();
        } catch (err) {
          _status.error("🔥 Error restoring task in local state", err);
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
    async task_from_ref(ref: string): Promise<TaskInfo | null> {
      try {
        const org = this.ORG_DOMAIN;
        let parsed = parseTaskId(ref, org);
        // Allow slash form email/classId/taskId without going through ~ join
        if (!parsed) {
          const parts = splitRefSegments(ref);
          if (parts.length === 3) {
            parsed = parseTaskId(parts.join("~"), org);
          } else if (parts.length === 2) {
            parsed = parseTaskId(parts.join("~"), org);
          }
        }
        if (!parsed) return Promise.resolve(null);
        _status.log("📄 Getting task from ref:", [parsed.teacherEmail, parsed.classId, parsed.taskId].join(" - "));

        const classResult = await getClassDoc(db, parsed.classId, parsed.teacherEmail);
        if (!classResult) return Promise.resolve(null);

        let class_data: ClassInfo = { ...classResult.data } as ClassInfo;
        delete class_data.tasks;
        _status.log("📚 Got class from ref");

        const taskResult = await getTaskDoc(db, parsed.classId, parsed.taskId, parsed.teacherEmail || classResult.teacherEmail);
        if (!taskResult) return Promise.resolve(null);
        _status.log("📄 Got task from ref");

        const email = taskResult.teacherEmail || classResult.teacherEmail;
        const classShareRef = shortShareRef(parsed.classId);
        const taskShareRef = shortShareRef(parsed.classId, parsed.taskId);
        const flatRef = flatTaskPath(parsed.classId, parsed.taskId);

        return Promise.resolve({
          ...(taskResult.data as TaskInfo),
          ref: flatRef,
          class_id: parsed.classId,
          class_name: this.class_text(class_data),
          _class: {
            ...class_data,
            ref: classShareRef,
            _share_ref: classShareRef,
            _teacher_email: email,
            _class_id: parsed.classId,
          },
          _share_ref: taskShareRef,
          _local_prefix: email ? email.split("@")[0] : undefined,
        } as TaskInfo);
      } catch (err) {
        return Promise.reject(err);
      }
    },
    /**
     * @memberOf .main.actions
     * @function class_from_ref
     * @description Get the class object from a class reference (dual-read: flat then nested)
     * @param {String} ref The class reference to get the class object from
     * @returns {Promise} A promise that resolves to the class object or rejects with an error
     */
    async class_from_ref(ref: string, include_tasks: boolean = false): Promise<ClassInfo> {
      try {
        const org = this.ORG_DOMAIN;
        let parsed = parseClassId(ref, org);
        // If ref was task-shaped, take the class portion
        if (!parsed) {
          const taskParsed = parseTaskId(ref, org);
          if (taskParsed) {
            parsed = {
              classId: taskParsed.classId,
              teacherEmail: taskParsed.teacherEmail,
              hasTeacherPrefix: !!taskParsed.teacherEmail,
            };
          }
        }
        // Slash email/classId without parseClassId teacher when already full email path
        if (!parsed) {
          const parts = splitRefSegments(ref);
          if (parts.length >= 1) {
            parsed = parseClassId(parts.slice(0, 2).join("/"), org);
          }
        }
        if (!parsed?.classId) return Promise.reject("Invalid class ref");

        const classResult = await getClassDoc(db, parsed.classId, parsed.teacherEmail);
        _status.log("📄 Got class doc", classResult?.source || "miss");
        if (!classResult) return Promise.reject("Class doesn't exist");

        let class_data: ClassInfo = { ...classResult.data } as ClassInfo;
        if (!include_tasks) delete class_data.tasks;

        class_data._class_id = classResult.classId;
        class_data._teacher_email = classResult.teacherEmail;
        class_data._source = classResult.source;
        class_data.ref = classResult.legacyPath || classResult.classId;
        class_data._share_ref = shortShareRef(classResult.classId);

        // Ensure teachers[] humans-only view helper fields for EditClass
        if (!Array.isArray(class_data.teachers) || !class_data.teachers.length) {
          if (classResult.teacherEmail && !isCanvasImportEmail(classResult.teacherEmail)) {
            class_data._implied_owner = {
              email: classResult.teacherEmail,
              name: class_data.teacher_name || classResult.teacherEmail.split("@")[0],
              role: "owner",
            };
          }
        }

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
    async upcoming_from_ref(class_ref: string, class_doc?: ClassInfo): Promise<TaskInfo[]> {
      try {
        if (!class_ref) {
          throw "No class ref provided";
        }
        if (!class_doc) {
          class_doc = (await this.class_from_ref(class_ref)) as ClassInfo;
        }
        const parsed = parseClassId(class_ref, this.ORG_DOMAIN) || {
          classId: (class_doc as ClassInfo)?._class_id || splitRefSegments(class_ref).pop() || "",
          teacherEmail: (class_doc as ClassInfo)?._teacher_email,
          hasTeacherPrefix: false,
        };
        const classResult = await getClassDoc(db, parsed.classId, parsed.teacherEmail || (class_doc as ClassInfo)?._teacher_email);
        if (!classResult) {
          throw "Class doesn't exist";
        }
        let class_tasks: TaskInfo[] = (classResult.data?.tasks as TaskInfo[]) || [];
        class_tasks = class_tasks.filter((task) => {
          return (
            !task.archived &&
            task.type != "note" &&
            compatDateObj(task.date as string).getTime() >= new Date().getTime()
          );
        });
        class_tasks.sort((a: TaskInfo, b: TaskInfo) => {
          return compatDateObj(a.date as string)?.getTime() - compatDateObj(b.date as string)?.getTime();
        });
        // limit to 6
        class_tasks = class_tasks.slice(0, 6);

        let upcoming_tasks: TaskInfo[] = [];

        class_tasks.forEach((task) => {
          const task_id = task.id;
          delete task.id;
          upcoming_tasks.push({
            ...task,
            ref: shortShareRef(parsed.classId, task_id),
            date: compatDateObj(task.date as string),
            color: class_doc?.color,
            class_id: parsed.classId,
            class_name: this.class_text(class_doc as ClassInfo),
          } as TaskInfo);
        });
        _status.log("📚 Got upcoming tasks");
        return Promise.resolve(upcoming_tasks);
      } catch (err) {
        return Promise.reject(err);
      }
    },

    /**
     * Resolve human teachers for EditClass: teachers[] people only, else sole owner from nested email.
     */
    teachers_for_class(class_obj: ClassInfo, fallbackEmail?: string): { email: string; name?: string; role?: string }[] {
      const humans = humanTeachers(class_obj?.teachers);
      if (humans.length) return humans;
      const email =
        fallbackEmail ||
        class_obj?._teacher_email ||
        (typeof class_obj?.owner_email === "string" ? class_obj.owner_email : undefined);
      if (email && !isCanvasImportEmail(email)) {
        return [
          {
            email,
            name: class_obj?.teacher_name || email.split("@")[0],
            role: "owner",
          },
        ];
      }
      return [];
    },

    /**
     * Add a co-teacher via callable addClassTeacher({ classId, email }).
     * Does not enroll the teacher as a student; server owns teachers[] writes.
     */
    async add_class_teacher(
      classId: string,
      email: string
    ): Promise<{ email: string; name?: string; role?: string } | void> {
      if (!classId) throw "Invalid class id";
      const normalized = (email || "").trim().toLowerCase();
      if (!normalized) throw "Email required";

      const addClassTeacher = httpsCallable(functions, "addClassTeacher");
      const result = await addClassTeacher({ classId, email: normalized });
      const data = result?.data as
        | {
            error?: string;
            success?: boolean;
            message?: string;
            teacher?: { email: string; name?: string; role?: string };
            teachers?: { email: string; name?: string; role?: string }[];
          }
        | undefined;

      if (data?.error || data?.success === false) {
        throw data?.error || data?.message || "addClassTeacher failed";
      }

      // Mirror teachers onto local classes cache when the callable returns them
      if (Array.isArray(data?.teachers)) {
        const humans = humanTeachers(data.teachers);
        const teacher_emails = humans.map((t) => t.email);
        const idx = this.classes.findIndex((c) => classEntryMatchesId(c, classId));
        if (idx !== -1) {
          this.classes[idx] = { ...this.classes[idx], teachers: humans, teacher_emails };
          this.classes = [...this.classes];
        }
        return (
          data.teacher ||
          humans.find((t) => t.email?.toLowerCase() === normalized) || {
            email: normalized,
            name: normalized.split("@")[0],
            role: "teacher",
          }
        );
      }

      // Optimistic local cache: append co-teacher if class is already loaded
      const idx = this.classes.findIndex((c) => classEntryMatchesId(c, classId));
      if (idx !== -1) {
        const existing = humanTeachers(this.classes[idx].teachers);
        if (!existing.some((t) => t.email?.toLowerCase() === normalized)) {
          const next = [
            ...existing,
            {
              email: normalized,
              name: data?.teacher?.name || normalized.split("@")[0],
              role: data?.teacher?.role || "teacher",
            },
          ];
          this.classes[idx] = {
            ...this.classes[idx],
            teachers: next,
            teacher_emails: next.map((t) => t.email),
          };
          this.classes = [...this.classes];
        }
      }
      return (
        data?.teacher || {
          email: normalized,
          name: normalized.split("@")[0],
          role: "teacher",
        }
      );
    },

    /**
     * Remove a co-teacher via callable removeClassTeacher({ classId, email }).
     * Cannot remove the last owner — server rejects; caller surfaces that error.
     */
    async remove_class_teacher(classId: string, email: string): Promise<void> {
      if (!classId) throw "Invalid class id";
      const normalized = (email || "").trim().toLowerCase();
      if (!normalized) throw "Email required";

      const removeClassTeacher = httpsCallable(functions, "removeClassTeacher");
      const result = await removeClassTeacher({ classId, email: normalized });
      const data = result?.data as
        | {
            error?: string;
            success?: boolean;
            message?: string;
            teachers?: { email: string; name?: string; role?: string }[];
          }
        | undefined;

      if (data?.error || data?.success === false) {
        throw data?.error || data?.message || "removeClassTeacher failed";
      }

      const idx = this.classes.findIndex((c) => classEntryMatchesId(c, classId));
      if (idx === -1) return;

      const next = Array.isArray(data?.teachers)
        ? humanTeachers(data.teachers)
        : humanTeachers(this.classes[idx].teachers).filter(
            (t) => t.email?.toLowerCase() !== normalized
          );
      this.classes[idx] = {
        ...this.classes[idx],
        teachers: next,
        teacher_emails: next.map((t) => t.email),
      };
      this.classes = [...this.classes];
    },

    /**
     * @memberOf .main.actions
     * @function show_timeout
     * @description Show a popup saying that the session has timed out
     * @see {@link hide_timeout}
     * @see {@link refresh_timeout}
     */
    show_timeout(): void {
      _status.log("🕒 Showing timeout" + (this.account_doc?.prefs?.hide_timeout ? " | Hidden locally due to prefs" : ""));
      this.paused = true;
    },

    /**
     * @memberOf .main.actions
     * @function hide_timeout
     * @description Hide the popup saying that the session has timed out
     * @see {@link show_timeout}
     * @see {@link refresh_timeout}
     */
    hide_timeout(): void {
      if (this.paused) {
        if (!this.account_doc?.prefs?.hide_timeout) {
          _status.log("🕒 Hiding timeout");
        }
        this.paused = false;
      }
    },
  },
});
