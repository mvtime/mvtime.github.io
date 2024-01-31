// Path: store/shortcuts.js

// setup Pinia store
import { _status } from "@/common";
import { defineStore } from "pinia";
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
      k = k.replace("Home", "fn + →");
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
  }),
  getters: {
    get(shortcut) {
      return this.shortcuts.find((s) => s === shortcut);
    },
    get_key(key) {
      if (!this.keys.includes(key)) return;
      return this.shortcuts.find((s) => s.key === key);
    },
    list() {
      return this.shortcuts.map((s) => {
        return { ...s, keys: clean_key(s.key) };
      });
    },
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
  actions: {
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
    register_all(list, tag) {
      for (let i = 0; i < list.length; i++) {
        this.register({ ...list[i], tag }, true);
      }
      this.sort();
    },
    remove(shortcut) {
      if (!this.shortcuts.includes(shortcut)) {
        _status.error("⌨️ Shortcut not registered, cannot remove", shortcut);
        return;
      }
      this.shortcuts.splice(this.shortcuts.indexOf(shortcut), 1);
    },
    remove_all(list, tag) {
      for (let i = 0; i < list.length; i++) {
        this.remove({ ...list[i], tag });
      }
    },
    remove_tag(tag) {
      this.shortcuts = this.shortcuts.filter((s) => s.tag !== tag);
      this.keys = this.shortcuts.map((s) => s.key);
    },
    remove_key(key) {
      if (!this.keys.includes(key)) {
        _status.error(`⌨️ Key "${key}" not registered, cannot remove shortcut`);
        return;
      }
      this.keys.splice(this.keys.indexOf(key), 1);
      this.shortcuts.splice(this.shortcuts.indexOf(this.get_key(key)), 1);
    },
    remove_keys(keys) {
      for (let i = 0; i < keys.length; i++) {
        this.remove_key(keys[i]);
      }
    },
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
    clear() {
      this.shortcuts = [];
      this.keys = [];
      _status.log("⌨️ Cleared shortcuts");
    },
  },
});
