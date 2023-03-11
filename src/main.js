import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { placeholderToast } from "@/util/util";

createApp(App).use(router).mount("#app");

// styles
import "./assets/main.css";

// import jquery
import $ from "jquery";
//! placeholder
$(document.body).on("click", ".auth-action", function () {
  placeholderToast();
});

// page change

import { removePopup } from "@/util/util";
router.afterEach((to) => {
  if (to.meta && to.meta.page_title) {
    document.title = "MV Test Tracker | " + to.meta.page_title;
  } else {
    document.title = "MV Test Tracker";
  }
  if (to.meta && to.meta.theme_color && to.meta.theme_color.light && to.meta.theme_color.dark) {
    $("meta.theme-color").attr("content", to.meta.theme_color.light);
    $("meta.theme-color-dark").attr("content", to.meta.theme_color.dark);
  } else {
    $("meta.theme-color").attr("content", "#f5c14b");
    $("meta.theme-color-dark").attr("content", "#f5c14b");
  }
  removePopup();
});

window.toast = placeholderToast;
window.$ = $;
