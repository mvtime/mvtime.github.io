/**
 * This store mnages AI/ML tasks and requests, as well as other "smart" or api-drieven features
 * @file store/magic.js
 * @namespace .magic
 * @memberOf store
 */

// setup Pinia store
import { _status } from "@/common";
import { defineStore } from "pinia";

const API_URL = `https://${process.env.VUE_APP_BRAND_DOMAIN__API}/`;

export const useMagic = defineStore({
  id: "magic",
  /**
   * @namespace .magic.state
   * @memberOf .magic
   */
  state: () => ({
    /**
     * @memberOf .magic.state
     * @property {Object} last Keeps track of when each endpoint was last called and with what hash data in order to rate limit
     */
    last: {},
    /**
     * @memberOf .magic.state
     * @property {Array} types List of task types and their short names, full names, list names, and keyboard shortcuts
     */
    types: [
      { key: "note", name: "Note", list_as: "Add a Note", shortcuts: ["n"] },
      {
        key: "task",
        name: "Assignment",
        list_as: "Schedule an Assignment",
        shortcuts: ["a"],
      },
      // socratic: "Socratic Seminar",
      {
        key: "test",
        name: "Test",
        list_as: "Schedule a Test",
        shortcuts: ["t"],
      },

      // summative: "Summative Assignment",
      // midterm: "Midterm",
      {
        key: "project",
        name: "Project",
        list_as: "Schedule a Project",
        shortcuts: ["p"],
      },
      {
        key: "quiz",
        name: "Quiz",
        list_as: "Schedule a Quiz",
        shortcuts: ["q"],
      },
      {
        key: "exam",
        name: "Exam",
        list_as: "Schedule an Exam",
        shortcuts: ["e"],
      },
    ],
    /**
     * @memberOf .magic.state
     * @property {Object} prefixes List of prefixes for each task type
     */
    prefixes: {
      note: "",
      task: "Complete ",
      // socratic: "",
      test: "Study for ",
      // summative: "",
      // midterm: "",
      project: "Prepare ",
      quiz: "Study for ",
      exam: "Study for ",
    },
  }),
  /**
   * @namespace .magic.getters
   * @memberOf .magic
   */
  getters: {},
  /**
   * @namespace .magic.actions
   * @memberOf .magic
   */
  actions: {
    prefix(task) {
      return this.prefixes[task.type];
    },
    /**
     * @memberOf .magic.actions
     * @function type_full
     * @description get the full type name from the short type
     * @param {String} short_type - the short type of the task
     * @returns {String} text - the full type name
     * @see types
     */
    type_full(short_type) {
      return this.types.find((t) => t.key === short_type)?.name || short_type;
    },
    /**
     * @memberOf .magic.actions
     * @function path
     * @description get the smart text associated with a given url
     * @param {String} path
     * @returns {String} text - the smart text associated with the url
     */
    async text(path) {
      if (!path) return;
      return await this.rated_api_get("get/magic/link-text", { path });
    },
    /**
     * @memberOf .magic.actions
     * @function type
     * @description get the smart type associated with a given description
     * @param {String} text
     */
    async type(task) {
      if (!task) return;
      return await this.rated_api_get("get/magic/task-type", { task });
    },
    /**
     * @memberOf .magic.actions
     * @function api_get
     * @description do get request to url: API_URL + endpoint with request query of data
     * @param {String} endpoint api endpoint
     * @param {Object} data query params
     * @returns {Promise<Object>} json
     */
    async api_get(endpoint, data) {
      data = data || {};
      if (!endpoint) return;
      // get url with query
      const url = new URL(API_URL + endpoint);
      Object.keys(data).forEach((key) => url.searchParams.append(key, data[key]));
      const run_hash = Math.random().toString(36).substring(7);
      _status.log(`🛜 Running API fetch | <${run_hash}>`);
      // do request
      this.last[endpoint] = { time: Date.now(), hash: run_hash };
      try {
        const response = await fetch(url.href, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        // response
        if (!response.ok) throw "Non-valid response";
        const json = await response.json();
        _status.log(`🛜 API fetch success | <${run_hash}>`);
        return json.data;
      } catch (err) {
        _status.error(`🛜 API fetch failed  | <${run_hash}>`, err);
        return null;
      }
    },
    /**
     * @memberOf .magic.actions
     * @function rated_api_get
     * @description do api_get but abide by rate limit (only eval once every 15 seconds)
     */
    async rated_api_get(type) {
      _status.log("🛜 API fetch requested");
      const run_hash = Math.random().toString(36).substring(7);
      const prev_time = this.last[type]?.time;
      const prev_hash = this.last[type]?.hash;
      if (Date.now() - prev_time < 2000) {
        _status.warn("🛜 API fetch rate limited");
        // wait 15 seconds and see if it is still the most recent request
        await new Promise((resolve) => setTimeout(resolve, 15000));
        if (this.last[type]?.time !== prev_time || this.last[type]?.hash !== prev_hash) {
          _status.warn("🛜 Outdated API fetch skipped");
          return;
        } else {
          _status.log("🛜 API fetch rate limit lifted");
        }
      }
      return await this.api_get(...arguments, run_hash);
    },
  },
});
