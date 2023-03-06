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
$(document.body).on("click", ".auth-action", (e) => {
  placeholderToast();
});
