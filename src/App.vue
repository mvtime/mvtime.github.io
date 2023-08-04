<template>
  <main
    id="themed_body"
    class="parent"
    :_theme="theme"
    @click="refreshTimeout"
    @keydown="refreshTimeout"
    @focus="refreshTimeout"
  >
    <router-view></router-view>
  </main>
</template>

<script>
/**
 * The main App component, which is the parent of all other components, and mostly serves as a wrapper for the router-view, though it does apply the theme
 *
 * @module App
 * @description The main App component, wrapper for Home or Portal Views.
 * @requires module:store/MainStore
 */

import { useMainStore } from "@/store";
export default {
  name: "App",
  data() {
    return {
      platform: "",
      isElectron: false,
    };
  },
  computed: {
    pageTitle() {
      return document.title;
    },
    store() {
      return useMainStore();
    },
    theme() {
      return this.store.get_theme;
    },
  },
  mounted() {
    this.isElectron = navigator.userAgent.toLowerCase().indexOf(" electron/") > -1;
    if (this.isElectron) {
      this.platform = this.$route.query.platform;
      if (!this.platform && window.location.search) {
        this.platform = window.location.search.split("=")[1];
      }
      console.log("Electron Platform: " + this.platform);
    }
  },
  created() {
    // do dark mode from local storage, then from store (if logged in)
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const storedTheme = localStorage.getItem("theme");
    this.isDarkMode = storedTheme === "dark" || (storedTheme === null && systemTheme === "dark");
  },
  methods: {
    refreshTimeout() {
      if (this.store) {
        this.store.refresh_timeout();
      }
    },
  },
};
</script>

<style>
main.parent {
  width: 100%;
  height: 100%;
}
</style>
