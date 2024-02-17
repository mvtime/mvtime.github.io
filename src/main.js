import { createApp, watch } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";
import VueApexCharts from "vue3-apexcharts";
import { placeholderToast /*Popup*/ } from "@svonk/util";
import { _status } from "@/common";
// create instances of app requisites
const pinia = createPinia();
const app = createApp(App);
// setup env vars

// setup app requisites
app.use(router);
app.use(pinia);
app.mixin({
  computed: {
    $env() {
      return process.env;
    },
    $status() {
      return _status;
    },
    // store access
    store() {
      return pinia.state;
    },
  },
});
app.use(VueApexCharts);
//* setup image loading (will use the classes it assigns to style loading images)
app.use(VueLazyload, {
  preLoad: 2,
  attempt: 1,
});

// mount app
app.mount("#app");
// setup store persistence using watcher
watch(
  pinia.state,
  (state) => {
    window.localStorage.setItem(
      `${process.env.VUE_APP_BRAND_SHORT_NAME}_app_state`,
      JSON.stringify(state.main)
    );
  },
  { deep: true }
);
// when window.localStorage. _teacher_mode changes, reload
window.addEventListener("storage", (e) => {
  if (e.key === `${process.env.VUE_APP_BRAND_SHORT_NAME}_teacher_mode`) {
    _status.log("🏫 Detected teacher mode change, reloading");
    window.location.reload();
  }
});

// styles
import "@/assets/style/main.css";

// import jquery and store
import $ from "jquery";

import { useMainStore } from "@/store";
// auth

$(document.body).on("click", ".auth-action", function () {
  const store = useMainStore();
  if (!store.user && $(this).hasClass("can-login")) {
    store.login();
  } else if ($(this).hasClass("can-logout")) {
    if ($(this).hasClass("doprompt")) {
      store.logout_prompt = true;
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
    document.title = `${process.env.VUE_APP_BRAND_LONG_NAME} | ` + to.meta.page_title;
  } else {
    document.title = process.env.VUE_APP_BRAND_LONG_NAME;
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
import VueLazyload from "vue-lazyload";
router.beforeEach((to) => {
  const store = useMainStore();

  if (to.meta && to.meta.requiresAuth && store && !store.user) {
    // launch auth popup through store action
    new Toast(
      "Please log in or join to access this page",
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
    return { name: "portal" };
  }
});
