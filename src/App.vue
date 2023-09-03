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
    <OverlayWrapper v-if="store.paused || animating" ref="overlay">
      <main class="pause_modal router_center_view" ref="pause_modal">
        <header class="modal_header">
          <h2 class="header_style modal_header_title">Session paused</h2>
        </header>
        <div ref="pause_contents" class="overlay_contents">
          <div class="overlay_contents_text">
            Your session was inactive for an extended period of time and has been paused to conserve
            resources.
          </div>
          <br />
          <div class="overlay_contents_text">Please click anywhere to resume using MVTT.</div>
        </div>
      </main>
    </OverlayWrapper>
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
import OverlayWrapper from "@/components/Modal/OverlayWrapper.vue";
import { useMainStore } from "@/store";
import $ from "jquery";
export default {
  name: "App",
  components: {
    OverlayWrapper,
  },
  data() {
    return {
      platform: "",
      isElectron: false,
      animating: false,
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
    this.set_theme();
    this.store.paused = false;
    window.addEventListener("focus", this.refreshTimeout);
  },
  created() {
    // do dark mode from local storage, then from store (if logged in)
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const storedTheme = window.localStorage.getItem("theme");
    this.isDarkMode = storedTheme === "dark" || (storedTheme === null && systemTheme === "dark");
  },
  methods: {
    refreshTimeout() {
      if (this.store) {
        this.store.refresh_timeout();
      }
    },
    set_theme() {
      if (this.theme == "light") {
        $("meta.theme-color").attr("media", "");
        $("meta.theme-color-dark").attr("media", "false");
      } else {
        $("meta.theme-color-dark").attr("media", "");
        $("meta.theme-color").attr("media", "false");
      }
    },
  },
  watch: {
    "store.paused": function (new_val, old_val) {
      if (new_val) {
        // focus on next tick
        this.$nextTick(() => {
          this.$refs.pause_modal.focus();
        });
      } else if (old_val && this.$refs.overlay) {
        this.animating = true;
        this.$refs.overlay.close();
        setTimeout(() => {
          this.animating = false;
        }, 250);
      }
    },
    theme() {
      this.set_theme();
    },
  },
};
</script>

<style scoped>
main.parent {
  width: 100%;
  height: 100%;
}
.pause_modal .overlay_contents {
  border-bottom: none;
}
.pause_modal {
  width: 350px !important;
}
</style>
