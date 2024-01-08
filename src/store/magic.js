// Path: store/magic.js

// setup Pinia store
// import { _status } from "@/common";
import { defineStore } from "pinia";

// Smart URL
const smart_maps = [
  // regex pattern, smart text
  // Canvas
  [/https:\/\/[a-zA-Z0-9]+.instructure.com\/courses\/[0-9]+\/modules*./, "Canvas Course Modules"],
  [
    /https:\/\/[a-zA-Z0-9]+.instructure.com\/courses\/[0-9]+\/assignments\/[0-9]+/,
    "Canvas Assignment",
  ],
  [/https:\/\/[a-zA-Z0-9]+.instructure.com\/courses\/[0-9]+/, "Canvas Course"],
  [/https:\/\/[a-zA-Z0-9]+.instructure.com\/courses/, "Canvas Home"],
  [/https:\/\/[a-zA-Z0-9]+.instructure.com/, "Canvas"],
  // G Classroom
  [/https:\/\/classroom.google.com\/c\/[a-zA-Z0-9]+\/a\/.+/, "Google Classroom Assignment"],
  [/https:\/\/classroom.google.com\/c\/[a-zA-Z0-9]+\/p\/.+/, "Google Classroom Post"],
  [/https:\/\/classroom.google.com\/c\/[a-zA-Z0-9]+/, "Google Classroom Class"],
  [/https:\/\/classroom.google.com\/h/, "Google Classroom Home"],
  [/https:\/\/classroom.google.com\/u\/[0-9]+/, "Google Classroom Home"],
  // G Drive
  [/https:\/\/drive.google.com\/file\/d\/.+/, "Google Drive File"],
  [/https:\/\/drive.google.com\/drawings\/d\/.+/, "Google Drawing"],
  [/https:\/\/docs.google.com\/document\/d\/.+/, "Google Docs File"],
  [/https:\/\/docs.google.com\/spreadsheets\/d\/.+/, "Google Sheet"],
  // LON-CAPA
  [/https:\/\/[a-zA-Z0-9]+.lon-capa.net.*/, "LON-CAPA Portal"],
  [/https:\/\/lon-capa.net.*/, "LON-CAPA Portal"],
  [/https:\/\/[a-zA-Z0-9]+.loncapa.net.*/, "LON-CAPA Portal"],
  [/https:\/\/loncapa.net.*/, "LON-CAPA Portal"],
];
function smart_url(path) {
  if (!path) return;
  path = path.toLowerCase();
  for (let i = 0; i < smart_maps.length; i++) {
    if (path.match(smart_maps[i][0])) return smart_maps[i][1];
  }
}

export const useMagic = defineStore({
  id: "magic",
  state: () => ({
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
    text(path) {
      return smart_url(path) || null;
    },
    /**
     * @function type
     * @description get the smart type associated with a given description
     * @param {String} text
     */
    type(task) {
      const note = task.type == "note";
      const name = ((note ? task.description : task.name) || "").toLowerCase();
      if (
        (name.includes("summative") && !name.includes("assignment")) ||
        name.includes("formative") ||
        (name.includes("unit") && name.includes("test"))
      ) {
        return "test";
      }
      if (name.includes("project")) return "project";
      if (name.includes("quiz")) return "quiz";
      if (name.includes("exam") || name.includes("midterm") || name.includes("final"))
        return "exam";
      if (name.length >= 100 || (!name && task.description && task.description.length >= 60))
        return "note";
      if ((name.length >= 10 && name.length < 50 && note) || name.includes("assignment"))
        return "task";
    },
  },
});
