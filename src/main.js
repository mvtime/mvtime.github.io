import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { placeholderToast, Popup } from "@svonk/util";
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
  if (!store.user && $(this).hasClass("can-login")) {
    store.login();
  } else if ($(this).hasClass("can-logout")) {
    if ($(this).hasClass("doprompt")) {
      new Popup(
        ["Log Out", "Are you sure you want to log out?"],
        "default",
        10000,
        require("@svonk/util/assets/popup-out.svg"),
        [
          ["removePopup()", "Cancel", "secondary-action fullborder"],
          ["removePopup()", "Confirm", "primary-action auth-action can-logout"],
        ]
      );
    } else {
      store.logout();
    }
  }
});
$(document.body).on("click", ".gohome", function () {
  router.push("/");
});

// page change
import { removePopup } from "@svonk/util";
router.afterEach((to) => {
  if (to.meta && to.meta.page_title) {
    document.title = "MV Test Tracker | " + to.meta.page_title;
  } else {
    document.title = "MV Test Tracker";
  }
  let theme_light = to.meta?.theme_color?.light || "#f5c14b";
  let theme_dark = to.meta?.theme_color?.dark || "#f5c14b";

  $("meta.theme-color").attr("content", theme_light);
  $("meta.theme-color-dark").attr("content", theme_dark);

  // remove popup
  removePopup();

  // setup color variables for css
  const style = document.documentElement.style;
  style.setProperty("--theme-color", theme_light);
  style.setProperty("--theme-color-dark", theme_dark);
  // colors on theme color
  let text_light = to.meta?.theme_color?.text_light || "#000000";
  let text_dark = to.meta?.theme_color?.text_dark || "#ffffff";
  style.setProperty("--theme-color-text", text_light);
  style.setProperty("--theme-color-text-dark", text_dark);
  style.setProperty("--theme-color-hover", text_light + "33");
  style.setProperty("--theme-color-hover-dark", text_dark + "33");
});

window.toast = placeholderToast;
window.$ = $;

// router guard
import { Toast } from "@svonk/util";

import "./registerServiceWorker";
router.beforeEach((to) => {
  const store = useMainStore();

  if (to.meta && to.meta.requiresAuth && store && !store.user) {
    // launch auth popup through store action
    new Toast(
      "Please log in to access this page",
      "default",
      1500,
      require("@svonk/util/assets/info-locked-icon.svg")
    );
    // set redirect
    return {
      path: "/",
      query: { redirect: to.fullPath },
    };
  } else if (to.meta && to.meta.requiresTeacher && store.user && !store.is_teacher) {
    // launch auth popup through store action
    new Toast(
      "You must be a teacher to access this page",
      "default",
      1500,
      require("@svonk/util/assets/info-locked-icon.svg")
    );
    return { path: "/portal" };
  }
});

// Allow teacher mode to be set with window.MVTT_TEACHER_MODE = true
// (for testing purposes)
