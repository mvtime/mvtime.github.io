/**
 * This store manages the registration, removal, and formatting of keyboard shortcuts, for use in help UIs
 * @file store/shortcuts.js
 * @namespace .shortcuts
 * @memberOf store
 */

// setup Pinia store
import { _status } from "@/common";
import { defineStore } from "pinia";
/**
 * @memberOf .shortcuts
 * @function clean_key
 * @description Clean up keystrings for display
 * @param {String} key keystring to reformat
 * @returns formatted keystrings array
 */
function clean_key(key) {
  if (!key) return;
  key = key.replace(" or ", ", ");
  return key.split(", ").map((k) => {
    // replace control keys with symbols
    k = k.replace("Control", "Ctrl");
    // do macos specifics
    if (navigator?.userAgent.indexOf("Mac OS X") != -1) {
      k = k.replace("Ctrl", "⌘");
      k = k.replace("Meta", "⌘");
      k = k.replace("Shift", "⇧");
      k = k.replace("Alt", "⌥");
      k = k.replace("Escape", "esc");
      k = k.replace("Home", "fn + ←");
      k = k.replace("End", "fn + →");
    }
    // replace arrow keys with symbols
    k = k.replace("ArrowUp", "↑");
    k = k.replace("ArrowDown", "↓");
    k = k.replace("ArrowLeft", "←");
    k = k.replace("ArrowRight", "→");
    // replace other keys with symbols
    k = k.replace("Enter", "⏎");
    k = k.replace("Escape", "Esc");
    k = k.replace("Backspace", "⌫");
    k = k.replace("Delete", "⌦");
    k = k.replace("Tab", "⇥");
    return k;
  });
}

export const useShortcuts = defineStore({
  id: "shortcuts",
  state: () => ({
    shortcuts: [],
    keys: [],
    active: {},
  }),
  /**
   * @namespace .shortcuts.getters
   * @memberof .shortcuts
   */
  getters: {
    /**
     * @memberOf .shortcuts.getters
     * @function get
     * @description Get a shortcut by object
     * @param {Object} shortcut
     * @returns the shortcut object matching the object
     */
    get(shortcut) {
      return this.shortcuts.find((s) => s === shortcut);
    },
    /**
     * @memberOf .shortcuts.getters
     * @function get_key
     * @description Get a shortcut by key
     * @param {String} key
     */
    get_key(key) {
      if (!this.keys.includes(key)) return;
      return this.shortcuts.find((s) => s.key === key);
    },
    /**
     * @memberOf .shortcuts.getters
     * @function list
     * @description Get a list of shortcuts
     * @returns an array of formatted shortcuts
     */
    list() {
      return this.shortcuts.map((s) => {
        return { ...s, keys: clean_key(s.key) };
      });
    },
    /**
     * @memberOf .shortcuts.getters
     * @function sections
     * @description Get a list of shortcuts by section
     * @returns an array of formatted shortcuts by section
     */
    sections() {
      //   take this.list and return an array of sections by tag
      let sections = [];
      let tags = this.shortcuts.map((s) => s.tag);
      tags = [...new Set(tags)];
      for (let i = 0; i < tags.length; i++) {
        sections.push({
          tag: tags[i],
          list: this.list.filter((s) => s.tag === tags[i]),
        });
      }
      return sections;
    },
  },
  /**
   * @namespace .shortcuts.actions
   * @memberof .shortcuts
   */
  actions: {
    /**
     * @memberOf .shortcuts
     * @function register
     * @description Register a new shortcut
     * @param {Object} shortcut
     * @param {Boolean} skipSort
     */
    register(shortcut, skipSort = false) {
      if (!shortcut?.key || !shortcut?.description) {
        _status.error("⌨️ Shortcut must have key and description text");
        return;
      }
      if (this.keys.includes(shortcut.key))
        _status.warn(`⌨️ Shortcut key "${shortcut.key}" already registered`);

      this.keys.push(shortcut.key);
      this.shortcuts.push(shortcut);
      if (!skipSort) this.sort();
    },
    /**
     * @memberOf .shortcuts.actions
     * @function register_all
     * @description Register a list of shortcuts with a given tag
     * @param {Array} list
     * @param {String} tag
     */
    register_all(list, tag) {
      for (let i = 0; i < list.length; i++) {
        this.register({ ...list[i], tag }, true);
      }
      this.sort();
    },
    /**
     * @memberOf .shortcuts.actions
     * @function remove
     * @description Remove a shortcut
     * @param {Object} shortcut
     */
    remove(shortcut) {
      if (!this.shortcuts.includes(shortcut)) {
        _status.error("⌨️ Shortcut not registered, cannot remove", shortcut);
        return;
      }
      this.shortcuts.splice(this.shortcuts.indexOf(shortcut), 1);
    },
    /**
     * @memberOf .shortcuts.actions
     * @function remove_all
     * @description Remove all shortcuts with a given tag
     * @param {Array} list
     * @param {String} tag
     */
    remove_all(list, tag) {
      for (let i = 0; i < list.length; i++) {
        this.remove({ ...list[i], tag });
      }
    },
    /**
     * @memberOf .shortcuts.actions
     * @function remove_tag
     * @description Remove all shortcuts with a given tag
     * @param {String} tag
     */
    remove_tag(tag) {
      this.shortcuts = this.shortcuts.filter((s) => s.tag !== tag);
      this.keys = this.shortcuts.map((s) => s.key);
    },
    /**
     * @memberOf .shortcuts.actions
     * @function remove_key
     * @description Remove a shortcut by key
     * @param {String} key
     */
    remove_key(key) {
      if (!this.keys.includes(key)) {
        _status.error(`⌨️ Key "${key}" not registered, cannot remove shortcut`);
        return;
      }
      this.keys.splice(this.keys.indexOf(key), 1);
      this.shortcuts.splice(this.shortcuts.indexOf(this.get_key(key)), 1);
    },
    /**
     * @memberOf .shortcuts.actions
     * @function remove_keys
     * @description Remove shortcuts with any of the given keys
     * @param {Array} keys
     */
    remove_keys(keys) {
      for (let i = 0; i < keys.length; i++) {
        this.remove_key(keys[i]);
      }
    },
    /**
     * @memberOf .shortcuts.actions
     * @function sort
     * @description Sort the shortcuts
     */
    sort() {
      this.shortcuts.sort((a, b) => {
        // compare tags, if different, sort by tag, and put General at the top, falsey at the bottom
        if (a.tag !== b.tag) {
          if (a.tag === "General" || !b.tag) return -1;
          if (b.tag === "General" || !a.tag) return 1;

          return a.tag.localeCompare(b.tag);
        }
        // check for priority
        if (a.top && !b.top) return -1;
        if (!a.top && b.top) return 1;

        // compare key
        if (a.key !== b.key) {
          return a.key.localeCompare(b.key);
        }
        // compare description
        return a.description.localeCompare(b.description);
      });
    },
    /**
     * @memberOf .shortcuts.actions
     * @function clear
     * @description Clear all shortcuts
     */
    clear() {
      this.shortcuts = [];
      this.keys = [];
      _status.log("⌨️ Cleared shortcuts");
    },
    /**
     * @memberOf .shortcuts.actions
     * @function set_activity
     * @description Set the activity state of a shortcut
     * @param {Boolean} state
     * @param {String} shortName
     */
    set_activity(state, shortName) {
      this.active[shortName] = state;
    },
    /**
     * @memberOf .shortcuts.actions
     * @function is_active
     * @description Check if a shortcut is active
     * @param {String} shortName
     * @returns {Boolean} state
     */
    is_active(shortName) {
      return this.active[shortName];
    },
  },
});
