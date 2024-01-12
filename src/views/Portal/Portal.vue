<template>
  <main class="portal" :page="page">
    <LeftBar
      ref="LeftBar"
      :class="{ paged: page == 'left' }"
      :paged="page == 'left'"
      @toggle_filtered_class="toggle_filtered_class"
      @clear_filters="filtered_classes = []"
      @close_right_bar="close_right_bar"
      :filtered_classes="filtered_classes"
      @dragclass="
        close_left_bar();
        drag_class($event);
      "
      @drag="$refs.calendar.check_leave($event)"
      @dragend="$refs.calendar.drop_class($event)"
      @mounted="
        if (loaded) {
          $refs.LeftBar.load();
        }
      "
    />
    <div
      class="portal_content"
      @click="
        close_right_bar();
        close_left_bar();
      "
    >
      <div class="portal_content__spaced">
        <header class="portal_info calendar_width">
          <div class="portal_info_title">
            <span class="portal_info_usertype"
              >{{ store.is_teacher ? "Teacher" : "Student" }} Dashboard</span
            >
            <span class="portal_info_date">{{
              new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}</span>
          </div>
          <div class="portal_info_welcome">
            {{
              store.recently_joined
                ? "Welcome to MVTT"
                : store.non_recent_signin
                ? "Welcome Back"
                : random_welcome
            }}
            {{ name }}!
          </div>
        </header>
        <!-- calendar -->
        <!-- on mounted, if this.loaded, run run_get_tasks -->

        <StudyBlock
          v-if="is_study"
          :filtered_classes="filtered_classes"
          @taskclick="show_task($event)"
          ref="study"
          @mounted="
            if (loaded) {
              $refs.study.run_get_tasks();
            }
          "
        />
        <CalendarBlock
          v-else
          :filtered_classes="filtered_classes"
          @taskclick="show_task($event)"
          ref="calendar"
          :dragging_class="dragging_class"
          @mounted="
            if (loaded) {
              $refs.calendar.run_get_tasks();
            }
          "
        />
      </div>
    </div>
    <RightBar
      ref="RightBar"
      :class="{ paged: page == 'right' }"
      :paged="page == 'right'"
      @close_left_bar="close_left_bar"
      @mounted="
        if (loaded) {
          $refs.RightBar.load();
        }
      "
    />
    <!-- show bottom nav bar if on device 600px wide or lower -->

    <nav class="portal_mobile_nav">
      <button
        class="portal_mobile_nav_page"
        :class="{ active: page == tab }"
        :id="'portal_mobile__' + tab"
        v-for="tab in ['left', 'block', 'right']"
        :key="tab"
        @click="page = tab"
      >
        <span
          class="portal_mobile_nav_page__icon"
          :class="{ alt: page == tab }"
          :src="`portal-${tab}-icon`"
        ></span>
      </button>
    </nav>
    <!-- show overlay only if router-view is active -->
    <OverlayWrapper
      v-if="!['portal', 'study'].includes($route.name)"
      v-slot="scope"
      @close="
        close_path
          ? $router.push(close_path)
          : $router.push({
              name: is_study ? 'study' : 'portal',
              query: { ...$route.query, date: undefined },
            })
      "
    >
      <router-view
        class="router_center_view"
        @close="scope.close"
        @clear_filters="filtered_classes = []"
      />
    </OverlayWrapper>
  </main>
</template>

<script>
/**
 * The Portal component is the main view for the user dashboard; itdisplays the user's calendar, a left sidebar with filters, and a right sidebar with tasks, and also includes an overlay wrapper for displaying modals.
 *
 * @module PortalView
 * @description The main user dashboard view, holds the calendar and sidebars, as well as a lot of the logic for what to do with data
 * @requires module:store/MainStore
 */

import LeftBar from "@/components/Portal/LeftBar.vue";
import RightBar from "@/components/Portal/RightBar.vue";
import StudyBlock from "@/components/Portal/StudyBlock.vue";
import CalendarBlock from "@/components/Portal/CalendarBlock.vue";
import OverlayWrapper from "@/components/Modal/OverlayWrapper.vue";
import { useMainStore } from "@/store";
import { WarningToast } from "@svonk/util";
import "@/assets/style/overlay.css";
import { _status } from "../../common";
export default {
  name: "AppPortal",
  components: {
    LeftBar,
    RightBar,
    StudyBlock,
    CalendarBlock,
    OverlayWrapper,
  },
  data() {
    return {
      /** The classes to include in the Block, or include all if empty */
      filtered_classes: [],
      /** A list of random welcome messages */
      welcomes: ["Welcome", "Hi", "Hello", "Hey", "Howdy"],
      loaded: false,
      dragging_class: null,
      is_study: this.$route.name == "study",
      page: "block",
    };
  },
  computed: {
    /** The width of the page */
    width() {
      return window.innerWidth;
    },
    /** The path to redirect to when closing an overlay, if active */
    close_path() {
      return this.$route?.query?.redirect || this.$route?.meta?.close_path;
    },
    /** The user's first name, or adequate placeholder */
    name() {
      return this.store.user?.displayName?.split(" ")[0] || "User";
    },
    /** Whether the user has completed the daily survey today */
    did_survey() {
      return this.store.done_daily_survey;
    },
    /** A random welcome message */
    random_welcome() {
      return this.welcomes[Math.floor(Math.random() * this.welcomes.length)];
    },
    store() {
      return useMainStore();
    },
  },
  methods: {
    drag_class(e) {
      this.dragging_class = e;
    },
    /** Launch the Daily Survey */
    do_survey() {
      this.$router.replace({
        name: "daily",
        query: {
          ...this.$route.query,
          redirect: this.$route.fullPath,
        },
      });
      new WarningToast("Please complete the daily survey to use MVTT today!", 3000);
    },
    /** Close / minimize the left sidebar on small screens */
    close_left_bar() {
      this.$refs.LeftBar?.close_sidebar();
    },
    /** Close / minimize the right sidebar on small screens */
    close_right_bar() {
      this.$refs.RightBar?.close_sidebar();
    },
    /** Show a task in the ViewTask ModalVue */
    show_task(task) {
      this.$router.push({
        name: "viewtask",
        params: {
          ref: this.store.path_to_ref(task.ref),
        },
        query: this.$route.query,
      });
    },
    /** Toggle on or off a class in the filtered ClassList from showing in the Block */
    toggle_filtered_class(c) {
      if (this.filtered_classes.includes(c)) {
        this.filtered_classes = this.filtered_classes.filter((id) => id !== c);
      } else {
        this.filtered_classes.push(c);
      }
    },
    /** Launch the Daily Survey if it hasn't yet been completed */
    check_and_do_survey() {
      if (this?.store?.user && !this?.did_survey && this.$route?.meta?.noSurvey !== true) {
        this.do_survey();
      }
    },
    /** Launch the Join Form if it hasn't been completed yet */
    check_and_do_join() {
      if (!this.store.done_join_form) {
        this.$router.push({
          name: "join",
          query: {
            ...this.$route.query,
            redirect: this.$route.fullPath,
          },
        });
        new WarningToast("Please fill out the join form to use MVTT!", 3000);
      }
    },
  },
  /** Preform Join Form & Daily Survey completion checks on load */
  mounted() {
    _status.log("🏗 Portal mounted");
    this.check_and_do_join();
    this.check_and_do_survey();
    this.store
      .fetch_classes()
      .then(() => {
        // run calendar run_get_tasks method
        if (this.$refs.study) this.$refs.study.run_get_tasks();
        if (this.$refs.calendar) this.$refs.calendar.run_get_tasks();
        this.$refs.RightBar.load();
        this.$refs.LeftBar.load();
        this.loaded = true;
      })
      .catch((err) => {
        _status.error("🔥 Couldn't fetch classes", err);
      });
  },
  /** Preform same checks as mounted, but if any of the completion statuses could've changed on page switch or data load */
  watch: {
    width(before, after) {
      if (after <= 600 && before > 600) {
        this.page = "block";
      }
    },
    did_survey() {
      this.check_and_do_survey();
    },
    $time() {
      this.check_and_do_survey();
    },
    $route() {
      if (!this.is_study && this.$route.name == "study") {
        this.is_study = true;
      } else if (this.$route.name == "portal") {
        this.is_study = false;
      }
      if (this.$route.name != "portal") {
        this.close_right_bar();
        this.close_left_bar();
      }
      this.check_and_do_survey();
    },
    store: {
      handler() {
        this.check_and_do_join();
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
/* portal */
main.portal {
  background-color: var(--color-secondary);
  /* transition: background-color 0.3s ease-out; */
  /* sizing */
  width: 100%;
  height: 100%;
  /* display */
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
main.portal .portal_sidebar {
  box-shadow: var(--shadow-highlight);
  flex-basis: 300px;
  width: 300px;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: var(--color-bg);
  position: relative;
  box-sizing: border-box;
  padding: 0;
}

main.portal .portal_sidebar {
  /* margin: auto 0; */
  height: 100%;
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out, border-width 0.3s ease-out,
    border-radius 0.3s ease-out;
  /* layout */
  display: flex;
  flex-flow: column nowrap;
}
@media (min-height: 800px) {
  main.portal .portal_sidebar {
    max-height: 800px;
    top: calc(50% - 400px);
  }
}
@media (min-width: /* [desktop size] */ 1270px) and (max-height: 1200px), (max-width: 600px) {
  main.portal .portal_sidebar {
    border-radius: 0px !important;
    box-shadow: none !important;
    height: 100%;
    top: 0;
    max-height: unset;
  }
  main.portal {
    background-color: var(--color-bg);
  }
}

@media (max-width: /* [desktop size] */ 1270px) {
  main.portal .portal_content {
    position: absolute;
    z-index: 1;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
  main.portal .portal_sidebar {
    z-index: 2;
    position: fixed;
  }

  .portal_sidebar.left-bar {
    left: 0;
  }
  .portal_sidebar.right-bar {
    right: 0;
  }
  main.portal .portal_sidebar:not(.active):not(.paged) {
    cursor: pointer;
  }

  main.portal .portal_sidebar.active,
  main.portal .portal_sidebar[active="true"] {
    transform: translate(0);
  }
}
/* top bar */
header.portal_info {
  margin: 0 auto;
  margin-bottom: 20px;
}
.portal_info_usertype {
  font-size: 26px;
  font-weight: bold;
  letter-spacing: 0.065em;
  line-height: 49px;
  text-align: center;
}
.portal_info_date {
  font-size: 15px;
  letter-spacing: 0.04em;
  line-height: 27px;
  text-align: center;
}
.portal_info_welcome {
  font-size: 19px;

  letter-spacing: 0.08em;
  font-style: italic;
  line-height: 27px;
}
.portal_content {
  flex-grow: 1;
  padding: var(--padding-portal);
  overflow-y: auto;
}
.portal_content::-webkit-scrollbar {
  display: none;
}
.portal_content__spaced {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: stretch;
  min-height: 100%;
}
/* on small devices, align task list to top */
@media (max-width: 600px) {
  .portal_content__spaced {
    justify-content: start;
  }
  .portal_content {
    padding: var(--padding-portal-mobile);
  }
}
.portal_info,
.portal_info > div {
  width: 100%;
}
.portal_info_title {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media (max-width: 400px) {
  main.portal .portal_sidebar {
    min-width: 300px;
    position: fixed;
    top: 0;
  }
}
@media (max-width: 340px) {
  main.portal .portal_sidebar {
    min-width: calc(100% - 40px);
  }
}
@media (max-width: 600px) {
  main.portal .portal_sidebar {
    width: 100%;
    height: calc(100% - var(--height-portal-mobile-nav));
    max-height: calc(100% - var(--height-portal-mobile-nav));
    top: 0;
    left: 0;
    right: 0;
    transition: transform 0.3s ease-out, border-radius 0.3s ease-out, top 0.3s ease-out,
      height 0.3s ease-out, max-height 0.3s ease-out, left 0.3s ease-out, right 0.3s ease-out;
    border-radius: 0 !important;
  }
  main.portal .portal_sidebar.left-bar {
    transform: translateX(-100%);
  }
  main.portal .portal_sidebar.right-bar {
    transform: translateX(100%);
  }
  main.portal[page="left"] .portal_sidebar.left-bar,
  main.portal[page="right"] .portal_sidebar.right-bar {
    transform: translateX(0);
  }
  main.portal .portal_content {
    transition: transform 0.3s ease-out, opacity 0.3s ease-out, filter 0.3s ease-out;
  }
  main.portal:not([page="block"]) .portal_content {
    transform: scale(0.9);
    opacity: 0.7;
    filter: blur(3px);
  }
  /* layout */
  main.portal {
    flex-flow: column nowrap;
  }
  main.portal .portal_content {
    position: unset;
  }
}

/* mobile nav */
.portal_mobile_nav {
  height: var(--height-portal-mobile-nav);
  flex: 0 0 var(--height-portal-mobile-nav);
  width: 100%;
  background: var(--color-bg);
  border-top: 3px solid var(--color-on-bg);
  /* layout */
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: stretch;
  /* mobile only */
  display: none;
}
.portal_mobile_nav .portal_mobile_nav_page {
  flex: 1 1 33%;
  /* style */
  border: none;
  background: none;
  /* layout */
  display: flex;
  justify-content: center;
  align-items: center;
}
/* print media */
@media print {
  main.portal .portal_sidebar {
    display: none;
  }
  main.portal .portal_content {
    padding: 0;
  }
}

/* icons */
.portal_mobile_nav_page__icon {
  height: 40px;
  width: 40px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: var(--filter-icon);
  /* transition */
  transition: opacity 0.2s ease-out, scale 0.2s ease-out;
  scale: 1;
  opacity: 0.5;
}
.portal_mobile_nav_page__icon.alt {
  opacity: 1;
  scale: 1.2;
}
.portal_mobile_nav_page__icon[src="portal-left-icon"] {
  background-image: url(@/assets/img/general/portal/nav/left.png);
  background-image: url(@/assets/img/general/portal/nav/left.svg);
}
.portal_mobile_nav_page__icon[src="portal-block-icon"] {
  background-image: url(@/assets/img/general/portal/nav/block.png);
  background-image: url(@/assets/img/general/portal/nav/block.svg);
}

.portal_mobile_nav_page__icon[src="portal-right-icon"] {
  background-image: url(@/assets/img/general/portal/nav/right.png);
  background-image: url(@/assets/img/general/portal/nav/right.svg);
}
</style>
<style>
@media (max-width: 600px) {
  main.portal .sidebar_toggle {
    display: none;
  }
  main.portal .portal_mobile_nav {
    display: flex;
  }
}
</style>
