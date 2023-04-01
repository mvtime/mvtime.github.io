<template>
  <main class="portal">
    <LeftBar ref="LeftBar" @close_right_bar="close_right_bar" />
    <div
      class="portal_content"
      @click="
        close_right_bar();
        close_left_bar();
      "
    >
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
      <CalendarBlock @testclick="show_task($event)" />
    </div>
    <RightBar ref="RightBar" @close_left_bar="close_left_bar" />
    <!-- show overlay only if router-view is active -->
    <div class="overlay_center_view" v-if="$route.name !== 'portal'">
      <div class="overlay_close" @click="$router.push('/portal')"></div>
      <router-view class="router_center_view" />
    </div>
  </main>
</template>

<script>
import LeftBar from "@/components/Portal/LeftBar.vue";
import RightBar from "@/components/Portal/RightBar.vue";
import CalendarBlock from "@/components/Portal/CalendarBlock.vue";
import { useMainStore } from "@/store";
import { placeholderToast } from "@svonk/util";
// import styles from "./portal-overlay.css";
import "./portal-overlay.css";
export default {
  name: "AppPortal",
  components: {
    LeftBar,
    RightBar,
    CalendarBlock,
  },
  computed: {
    store() {
      return useMainStore();
    },
    name() {
      let store = this.store;
      if (store.user && store.user.displayName) return store.user.displayName.split(" ")[0];
      return "User";
    },
  },
  methods: {
    close_left_bar() {
      this.$refs.LeftBar.close_sidebar();
    },
    close_right_bar() {
      this.$refs.RightBar.close_sidebar();
    },
    placeholderToast,
    show_task(test) {
      let testJSON = JSON.stringify({
        name: test.name,
        group: test.class_name,
        date: test.date.toLocaleDateString("en-US").replace("/", "-"),
        description: test.description,
        links: test.links,
      });
      this.$router.push({
        name: "task",
        query: {
          task: testJSON,
        },
      });
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
