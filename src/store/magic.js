// Path: store/magic.js

// setup Pinia store
// import { _status } from "@/common";
import { defineStore } from "pinia";

// Smart URL
function smart_url(path) {
  if (!path) return;
  path = path.toLowerCase();
  /**  Google Suite **/
  if (path.match(/https:\/\/[a-zA-Z0-9]+.google.com\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+/)) {
    // Google Classroom
    if (path.match(/https:\/\/classroom.google.com*./)) {
      // Google Classroom assignment (classroom.google.com/c/.../a/...)
      if (path.match(/https:\/\/classroom.google.com\/c\/[a-zA-Z0-9]+\/a\/*./)) {
        return "Google Classroom Assignment";
      }
      // Google Classroom post (classroom.google.com/c/.../p/...)
      else if (path.match(/https:\/\/classroom.google.com\/c\/[a-zA-Z0-9]+\/p\/*./)) {
        return "Google Classroom Post";
      }
      // Google Classroom class (classroom.google.com/c/...)
      else if (path.match(/https:\/\/classroom.google.com\/c\/[a-zA-Z0-9]+/)) {
        return "Google Classroom Class";
      }
      // Google Classroom home
      else if (
        path.match(/https:\/\/classroom.google.com\/h/) ||
        path.match(/https:\/\/classroom.google.com\/u\/[0-9]+/)
      ) {
        return "Google Classroom Home";
      }
      // Everything Else
      else {
        return "Google Classroom Link";
      }
    }
  }
  // Canvas
  else if (path.match(/https:\/\/[a-zA-Z0-9]+.instructure.com*./)) {
    // Canvas Assignment

    if (path.match(/https:\/\/[a-zA-Z0-9]+.instructure.com\/courses\/[0-9]+\/modules*./)) {
      return "Canvas Course Modules";
    } else if (
      path.match(/https:\/\/[a-zA-Z0-9]+.instructure.com\/courses\/[0-9]+\/assignments\/[0-9]+/)
    ) {
      return "Canvas Assignment";
    } else if (path.match(/https:\/\/[a-zA-Z0-9]+.instructure.com\/courses\/[0-9]+/)) {
      return "Canvas Course";
    } else if (path.match(/https:\/\/[a-zA-Z0-9]+.instructure.com\/courses/)) {
      return "Canvas Home";
    } else {
      return "Canvas Link";
    }
  } else if (
    path.match(/https:\/\/[a-zA-Z0-9]+.lon-capa.net*./) ||
    path.match(/https:\/\/lon-capa.net*./)
  ) {
    return "LON-CAPA";
  }
}

export const useMagic = defineStore({
  id: "magic",
  state: () => ({}),
  getters: {},
  actions: {
    /**
     * @function path
     * @description get the smart text associated with a given url
     * @param {String} path
     * @returns {String} text - the smart text associated with the url
     */
    text(path) {
      return smart_url(path) || null;
    },
    /**
     * @function type
     * @description get the smart type associated with a given description
     * @param {String} text
     */
    type(text) {
      return text;
    },
  },
});
