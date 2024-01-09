// Path: store/magic.js

// setup Pinia store
import { _status } from "@/common";
import { defineStore } from "pinia";

const API_URL = "https://api.mvtt.app/";

export const useMagic = defineStore({
  id: "magic",
  state: () => ({
    last: {},
    types: {
      note: "Note",
      task: "Assignment",
      // socratic: "Socratic Seminar",
      test: "Test",
      // summative: "Summative Assignment",
      // midterm: "Midterm",
      project: "Project",
      quiz: "Quiz",
      exam: "Exam",
    },
  }),
  getters: {},
  actions: {
    /**
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
     * @function type
     * @description get the smart type associated with a given description
     * @param {String} text
     */
    async type(task) {
      if (!task) return;
      return await this.rated_api_get("get/magic/task-type", { task });
    },
    /**
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
