<template>
  <main class="portal">
    <LeftBar
      ref="LeftBar"
      @toggle_filtered_class="toggle_filtered_class"
      @clear_filters="filtered_classes = []"
      @close_right_bar="close_right_bar"
      :filtered_classes="filtered_classes"
    />
    <div
      class="portal_content"
      @click="
        close_right_bar();
        close_left_bar();
      "
    >
      <div class="portal_content__spaced">
        <header class="portal_info">
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
        <CalendarBlock :filtered_classes="filtered_classes" @taskclick="show_task($event)" />
      </div>
    </div>
    <RightBar ref="RightBar" @close_left_bar="close_left_bar" />
    <!-- show overlay only if router-view is active -->
    <OverlayWrapper
      v-if="$route.name !== 'portal'"
      v-slot="scope"
      @close="close_path ? $router.push(close_path) : $router.push('/portal')"
    >
      <router-view class="router_center_view" @close="scope.close" />
    </OverlayWrapper>
  </main>
</template>

<script>
import LeftBar from "@/components/Portal/LeftBar.vue";
import RightBar from "@/components/Portal/RightBar.vue";
import CalendarBlock from "@/components/Portal/CalendarBlock.vue";
import OverlayWrapper from "@/components/Modal/OverlayWrapper.vue";
import { useMainStore } from "@/store";
import { placeholderToast, WarningToast } from "@svonk/util";
import "@/views/Portal/overlay.css";
export default {
  name: "AppPortal",
  components: {
    LeftBar,
    RightBar,
    CalendarBlock,
    OverlayWrapper,
  },
  data() {
    return {
      filtered_classes: [],
      welcomes: ["Welcome", "Hi", "Hello", "Hey", "Howdy"],
    };
  },
  computed: {
    close_path() {
      return this.$route?.query?.redirect || this.$route?.meta?.close_path;
    },
    store() {
      return useMainStore();
    },
    name() {
      let store = this.store;
      if (store.user && store.user.displayName) return store.user.displayName.split(" ")[0];
      return "User";
    },
    did_survey() {
      return this.store?.done_daily_survey;
    },
    random_welcome() {
      return this.welcomes[Math.floor(Math.random() * this.welcomes.length)];
    },
  },
  methods: {
    do_survey() {
      // change to survey page, with query redirect to current page
      this.$router.push({
        name: "daily",
        query: {
          redirect: this.$route.fullPath,
        },
      });
      new WarningToast("Please complete the daily survey to use MVTT today!", 3000);
    },
    close_left_bar() {
      this.$refs.LeftBar.close_sidebar();
    },
    close_right_bar() {
      this.$refs.RightBar.close_sidebar();
    },
    placeholderToast,
    show_task(task) {
      let taskJSON = JSON.stringify({
        name: task.name,
        group: task.class_name,
        date: task.date.toLocaleDateString("en-US").replace("/", "-"),
        description: task.description,
        links: task.links,
        type: task.type,
        class_id: task.class_id,
      });
      this.$router.push({
        name: "task",
        query: {
          task: taskJSON,
        },
      });
    },
    toggle_filtered_class(c) {
      // if c is in filtered_class, remove it
      if (this.filtered_classes.includes(c)) {
        this.filtered_classes = this.filtered_classes.filter((class_id) => class_id !== c);
      } else {
        // else add it
        this.filtered_classes.push(c);
      }
    },
    check_and_do_survey() {
      // check that done_daily_survey is true, if not open "/survey/daily"
      if (this?.store?.user && !this?.did_survey && this.$route?.meta?.noSurvey !== true) {
        this.do_survey();
      }
    },
    check_and_do_join() {
      // if logged in and not store.doc.join_form, redirect to join form
      if (this.store?.user && this.store?.doc && !this.store?.doc?.join_form) {
        this.$router.push({
          name: "join",
          query: {
            redirect: this.$route.fullPath,
          },
        });
        new WarningToast("Please fill out the join form to use MVTT!", 3000);
      }
    },
  },
  mounted() {
    this.check_and_do_join();
    this.check_and_do_survey();
  },
  watch: {
    did_survey() {
      this.check_and_do_survey();
    },
    // watch for route changes
    $route() {
      this.check_and_do_survey();
    },
    // deep listener for store
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
  flex-grow: 0;
  flex-shrink: 1;
  background-color: var(--color-bg);
  position: relative;
  box-sizing: border-box;
  padding: 0;
}

main.portal .portal_sidebar {
  max-height: 800px;
  margin: auto 0;
  height: 100%;
  transition: transform 0.3s ease-out;
  /* layout */
  display: flex;
  flex-flow: column nowrap;
}
@media (max-width: 1200px) {
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
  }
  main.portal .portal_sidebar:not(.active) {
    cursor: pointer;
  }

  main.portal .portal_sidebar.active,
  main.portal .portal_sidebar[active="true"] {
    transform: translate(0);
  }
}
/* top bar */
header.portal_info {
  max-width: 800px;
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
    position: absolute;
    top: 0;
  }
  .portal_sidebar.left-bar {
    left: 0;
  }
  .portal_sidebar.right-bar {
    right: 0;
  }
  .portal_content {
    --padding-portal: 20px 30px;
  }
}
@media (max-width: 340px) {
  main.portal .portal_sidebar {
    min-width: calc(100% - 40px);
  }
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
</style>
