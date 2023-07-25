<template>
  <main class="portal">
    <LeftBar ref="LeftBar" @set_class="set_class" @close_right_bar="close_right_bar" />
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
          <div class="portal_info_welcome">Welcome Back {{ name }}</div>
        </header>
        <!-- calendar -->
        <CalendarBlock :displayed_class="displayed_class" @taskclick="show_task($event)" />
      </div>
    </div>
    <RightBar ref="RightBar" @close_left_bar="close_left_bar" />
    <!-- show overlay only if router-view is active -->
    <div class="overlay_center_view" v-if="$route.name !== 'portal'">
      <!-- only allow close action if current page does not have block_close meta tag -->

      <div
        class="overlay_close"
        @click="can_close ? $router.push('/portal') : null"
        :closable="can_close"
      ></div>
      <router-view class="router_center_view" />
    </div>
  </main>
</template>

<script>
import LeftBar from "@/components/Portal/LeftBar.vue";
import RightBar from "@/components/Portal/RightBar.vue";
import CalendarBlock from "@/components/Portal/CalendarBlock.vue";
import { useMainStore } from "@/store";
import { placeholderToast, WarningToast } from "@svonk/util";
// import styles from "./portal-overlay.css";
import "./portal-overlay.css";
export default {
  name: "AppPortal",
  components: {
    LeftBar,
    RightBar,
    CalendarBlock,
  },
  data() {
    return {
      displayed_class: null,
    };
  },
  computed: {
    can_close() {
      return this.$route?.meta?.block_close !== true;
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
      return this.store.done_daily_survey;
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
    set_class(c) {
      this.displayed_class = c;
    },
  },
  mounted() {
    // check that done_daily_survey is true, if not open "/survey/daily"
    if (!this.did_survey) {
      this.do_survey();
    }
  },
  watch: {
    did_survey() {
      if (!this.did_survey) {
        this.do_survey();
      }
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
