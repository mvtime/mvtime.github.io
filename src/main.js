import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { placeholderToast } from "@svonk/util";
// create instances of app requisites
const pinia = createPinia();
const app = createApp(App);
// setup app requisites
app.use(router);
app.use(pinia);
// mount app
app.mount("#app");

// styles
import "./assets/main.css";

// import jquery and store
import $ from "jquery";

import { useMainStore } from "./store";
// auth

$(document.body).on("click", ".auth-action", function () {
  const store = useMainStore();
  if (!store.user) {
    store.login();
  } else if ($(this).hasClass("can-logout")) {
    store.logout();
  }
});

// page change
import { removePopup } from "@svonk/util";
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

// router guard
import { Toast } from "@svonk/util";
router.beforeEach((to) => {
  const store = useMainStore();

  if (to.meta && to.meta.requiresAuth && !store.user) {
    // launch auth popup through store action
    new Toast(
      "Please log in to access this page",
      "default",
      1500,
      require("@svonk/util/assets/info-locked-icon.svg")
    );
    return "/";
  }
});
