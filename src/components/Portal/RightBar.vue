<template>
  <div class="right-bar portal_sidebar" :class="{ active: sidebar_open }" @click="show_if_inactive">
    <div class="auth-action can-logout doprompt">Log Out</div>
    <UpcomingTests />
    <div class="flex-spacer"></div>
    <button
      class="info_button click-action"
      title="About MV Test Tracker"
      @click="$router.push('/about')"
    >
      <div class="info_icon"></div>
    </button>
    <SidebarToggle @click="close_sidebar" />
  </div>
</template>

<script>
import SidebarToggle from "@/components/Portal/SidebarToggle.vue";
import UpcomingTests from "./Right/UpcomingTests.vue";
export default {
  name: "RightBar",
  components: {
    SidebarToggle,
    UpcomingTests,
  },
  emits: ["close_left_bar"],
  data() {
    return {
      sidebar_open: false,
    };
  },
  mounted() {
    window.addEventListener("resize", this.close_sidebar);
  },
  unmounted() {
    window.removeEventListener("resize", this.close_sidebar);
  },
  methods: {
    show_if_inactive() {
      if (!this.sidebar_open) this.sidebar_open = true;
      // emit event to close left bar
      this.$emit("close_left_bar");
    },
    close_sidebar() {
      if (this.sidebar_open) setTimeout(() => (this.sidebar_open = false), 10);
    },
  },
};
</script>

<style scoped>
.right-bar {
  border-radius: var(--radius-sidebar) 0 0 var(--radius-sidebar);
}
.can-logout {
  height: 30px;
  font-size: 18px;
  line-height: 30px;
  color: var(--color-text);
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
}
.can-logout::after {
  content: "";
  height: 30px;
  width: 30px;
  display: inline-block;
  filter: var(--filter-icon);
  background-image: url(@/assets/img/general/portal/logout.png);
  background-image: url(@/assets/img/general/portal/logout.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right center;
}

@media (max-width: 1200px) {
  main.portal .portal_sidebar {
    transform: translate(calc(100% - 10px));
  }
  main.portal .portal_sidebar:hover {
    transform: translate(calc(100% - 20px));
  }
}
/* info icon */
.info_button {
  position: absolute;
  display: block;
  bottom: calc(var(--padding-sidebar) / 1.5);
  right: calc(var(--padding-sidebar) / 1.5);
  height: var(--size-sidebar-button);
  width: var(--size-sidebar-button);
  cursor: pointer;
  z-index: 1;
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar) / 3);
  border: none;
  background-color: var(--color-on-bg);
  padding: 0;
}
.info_icon {
  height: 100%;
  width: 100%;
  filter: var(--filter-icon);
  background-image: url(@/assets/img/general/portal/info.png);
  background-image: url(@/assets/img/general/portal/info.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  user-select: none;
  pointer-events: none;
}
</style>
