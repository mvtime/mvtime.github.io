<template>
  <main
    id="themed_body"
    class="parent"
    :class="{ simplified: store.simplified }"
    ref="app"
    :_theme="theme"
    @click="refreshTimeout"
    @keydown="refreshTimeout"
    @focus="refreshTimeout"
  >
    <!-- Overlays -->
    <OverlayWrapper
      v-if="do_timeout && (store.paused || animating)"
      ref="overlay"
      class="pause_modal_overlay"
      style="z-index: 104"
    >
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
          <div class="overlay_contents_text">
            You can hide this message using the toggle in your account preferences.
          </div>
          <br />
          <div class="overlay_contents_text">Please click anywhere to resume using MVTT.</div>
        </div>
      </main>
    </OverlayWrapper>
    <OverlayWrapper
      v-if="store.logout_prompt"
      ref="logout_modal"
      @close="store.logout_prompt = false"
      v-slot="scope"
      style="z-index: 103"
    >
      <LogoutModal class="router_center_view" @close="scope.close" />
    </OverlayWrapper>
    <OverlayWrapper
      v-if="show_shortcuts || animating_shortcuts"
      ref="shortcuts_overlay"
      v-slot="scope"
      @close="show_shortcuts = false"
      style="z-index: 102"
    >
      <ShortcutsModal class="router_center_view" ref="shortcuts_modal" @close="scope.close" />
    </OverlayWrapper>
    <!-- Tutorial -->
    <TutorialBlurb
      v-if="show_tutorial"
      :title="tutorial.title"
      :key="'tutorial'"
      :options="tutorial.options"
      :html="
        tutorial.html ||
        '<i style=text-align:center;width:100%;display:block>Not much to see here!</i>'
      "
      :button_text="tutorial.next_text"
      :skip_text="tutorial.prev_text"
      :trackel="tutorial.el"
      @next="tutorial_nav(1)"
      @skip="tutorial_nav(-1)"
      @vnode-unmounted="tutorial_page = 0"
      style="z-index: 101"
    />
    <!-- Page Contents -->
    <router-view></router-view>
  </main>
</template>

<script>
/**
 * The main App component, which is the parent of all other components, and mostly serves as a wrapper for the router-view, though it does apply the theme
 * @module App
 * @description The main App component, wrapper for Home or Portal Views.
 * @requires module:store/MainStore
 */
// Elements
import OverlayWrapper from "@/components/Modal/OverlayWrapper.vue";
import LogoutModal from "@/components/Modal/LogoutModal.vue";
import ShortcutsModal from "@/components/Modal/ShortcutsModal.vue";
// Stores
import { useMainStore } from "@/store";
import { useShortcuts } from "@/store/shortcuts";
// Global Scripts
import $ from "jquery";
import { _status } from "@/common";
import { SuccessToast, ErrorToast } from "@svonk/util";
// Tutorial
import tutorial_pages from "@/components/Tutorial/tutorial.json";
import TutorialBlurb from "@/components/Tutorial/TutorialBlurb.vue";
// Page
export default {
  name: "App",
  components: {
    OverlayWrapper,
    LogoutModal,
    TutorialBlurb,
    ShortcutsModal,
  },
  data() {
    return {
      platform: "",
      isElectron: false,
      animating: false,
      animating_shortcuts: false,
      tutorial_page: 0,
      show_shortcuts: false,
      shortcuts: [
        {
          key: "Ctrl + Enter",
          description: "Submit the current form",
        },
        {
          key: "Escape",
          description: "Close the current modal",
        },
        {
          key: "Ctrl + \\",
          description: "Toggle dark mode",
        },
        {
          key: "/ or ?",
          description: "Toggle the shortcuts menu",
        },
      ],
    };
  },
  computed: {
    do_timeout() {
      return !this.store?.account_doc?.prefs?.hide_timeout;
    },
    pageTitle() {
      return document.title;
    },
    store() {
      return useMainStore();
    },
    theme() {
      return this.store.get_theme;
    },
    show_tutorial() {
      return !this.store.done_tutorial && tutorial_pages && this.store;
    },
    tutorial() {
      const page = tutorial_pages[this.tutorial_page];
      return {
        ...page,
        prev_text: this.tutorial_page && !page.disable_prev ? "Back" : "",
        next_text:
          page.options?.next_text ||
          (this.tutorial_page == tutorial_pages.length - 1 ? "Finish" : "Next"),
      };
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
    this.store.logout_prompt = false;
    window.addEventListener("focus", this.refreshTimeout);
    window.addEventListener("keydown", this.global_keydown);
    useShortcuts().register_all(this.shortcuts, "General");

    // catch href clicks to open as "/to/{encoded href}"
    this.$refs.app.addEventListener("click", (e) => {
      // catch click if it has an href
      if (e.target.href) {
        // fix link if it doesnt have a protocol or is relative
        if (!e.target.href.includes("://") || e.target.href.startsWith("/")) {
          e.target.href = new URL(e.target.href, window.location.href).href;
        }
        // check that it's an outlink
        let url = new URL(e.target.href);
        if (url?.hostname == "mvtt.app" || url?.hostname == window?.location?.hostname) return;

        // if outlink, open in new tab as "/to/{encoded href}"
        e.preventDefault();
        _status.log(`🔗 Opening outlink in a new tab | "${url.href}"`);
        window.open("/to/" + encodeURIComponent(url.href), "_blank");
      }
    });
  },
  beforeUnmount() {
    window.removeEventListener("focus", this.refreshTimeout);
    window.removeEventListener("keydown", this.global_keydown);
    useShortcuts().remove_tag("General");
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
    global_keydown(e) {
      if (!e.shiftKey) {
        let el,
          ignore = false;
        if (this.show_shortcuts) ignore = true;
        // Global Keys
        if (e.key == "Escape" && !e.ctrlKey) {
          el = $(".click_escape");
        } else if (e.key == "Enter" && e.ctrlKey) {
          el = $(".click_ctrlenter");
        } else if (e.key == "\\" && e.ctrlKey) {
          this.store.toggle_theme();
          ignore = true;
        } else if (e.key == "/") {
          this.show_shortcuts = !this.show_shortcuts;
          ignore = true;
        }
        // Modal Controls
        if (el) {
          el = el.not("[disabled]").not(".disabled").filter(":visible");
          if (!el || !el.length) return;
          $(el).first().click();
        }
        // Key Event Blocker
        if (el || ignore) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    },
    tutorial_nav(change) {
      // Do UI Tutorial Actions
      const click = this.tutorial?.options?.click_on_complete;
      if (change > 0 && click) {
        $(click == true ? this.tutorial.el : click).click();
      }
      // Finish Tutorial
      if (this.tutorial_page == tutorial_pages.length - 1) {
        this.store
          .finish_tutorial(true)
          .then(() => {
            new SuccessToast("Interface tutorial completed; here's some more resources!", 3500);
          })
          .catch((err) => {
            new ErrorToast("Couldn't complete tutorial", err, 3000);
          });
      }
      // Continue Tutorial
      else if (this.tutorial_page + change >= 0 && (!this.tutorial.disable_prev || change > 0)) {
        this.tutorial_page += change;
      }
    },
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
      if (this.do_timeout) {
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
      }
    },
    show_shortcuts: function (new_val, old_val) {
      if (old_val && this.$refs.shortcuts_overlay) {
        this.animating_shortcuts = true;
        this.$refs.shortcuts_overlay.close();
        setTimeout(() => {
          this.animating_shortcuts = false;
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
.pause_modal_overlay {
  z-index: 3000;
}
</style>
