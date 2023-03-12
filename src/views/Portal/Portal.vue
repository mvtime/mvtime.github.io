<template>
  <main class="portal">
    <LeftBar />
    <div class="portal_content">
      <header class="portal_info">
        <div class="portal_info_title">
          <span class="portal_info_usertype"
            >{{ store.doc && store.doc.is_teacher ? "Teacher" : "Student" }} Dashboard</span
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
    </div>
    <RightBar />
  </main>
</template>

<script>
import LeftBar from "@/components/Portal/LeftBar.vue";
import RightBar from "@/components/Portal/RightBar.vue";
import { useMainStore } from "@/store";
export default {
  name: "AppPortal",
  components: {
    LeftBar,
    RightBar,
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
};
</script>

<style scoped>
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
  padding: var(--padding-sidebar);
}
main.portal .portal_sidebar {
  max-height: 800px;
  margin: auto 0;
  height: 100%;
  transition: transform 0.3s ease-out;
}
@media (max-width: 1200px) {
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
</style>
