<template>
  <div class="left-bar portal_sidebar" :class="{ active: sidebar_open }" @click="show_if_inactive">
    <div class="sidebar_overflow">
      <div class="branding-title gohome">MV Test Tracker</div>
      <div class="flex-spacer"></div>
      <!-- Actions Panel -->
      <ActionsPanel v-if="store && store.is_teacher" />
      <!-- Class List -->
      <ClassList />
      <div class="flex-spacer"></div>
    </div>
    <!-- Settings Button -->
    <button class="settings_button click-action" title="Open Settings" @click="placeholderToast">
      <div class="settings_icon"></div>
      <div class="toggle_text">Settings</div>
    </button>
    <!-- Sidebar Toggle -->
    <SidebarToggle class="right" @click="close_sidebar" />
  </div>
</template>

<script>
import SidebarToggle from "@/components/Portal/SidebarToggle.vue";
import ClassList from "./Left/ClassList.vue";
import ActionsPanel from "./Left/ActionsPanel.vue";
import { useMainStore } from "@/store";
import { placeholderToast } from "@svonk/util";
export default {
  name: "LeftBar",
  components: {
    SidebarToggle,
    ClassList,
    ActionsPanel,
  },
  emits: ["close_right_bar"],
  data() {
    return {
      sidebar_open: false,
    };
  },
  computed: {
    store() {
      return useMainStore();
    },
  },
  mounted() {
    window.addEventListener("resize", this.close_sidebar);
  },
  unmounted() {
    window.removeEventListener("resize", this.close_sidebar);
  },
  methods: {
    placeholderToast,
    show_if_inactive() {
      if (!this.sidebar_open) this.sidebar_open = true;

      this.$emit("close_right_bar");
    },
    close_sidebar() {
      if (this.sidebar_open) setTimeout(() => (this.sidebar_open = false), 10);
    },
  },
};
</script>

<style scoped>
.left-bar {
  border-radius: 0 var(--radius-sidebar) var(--radius-sidebar) 0;
}

@media (max-width: 1200px) {
  main.portal .portal_sidebar {
    transform: translate(calc(-100% + 15px));
  }
  main.portal .portal_sidebar:hover {
    transform: translate(calc(-100% + 25px));
  }
}
.branding-title {
  font-weight: 700;
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  user-select: none;
}
/* settings icon */
.settings_button {
  position: absolute;
  display: block;
  bottom: calc(var(--padding-sidebar) / 1.5);
  left: calc(var(--padding-sidebar) / 1.5);
  height: var(--size-sidebar-button);
  width: var(--size-sidebar-button);
  cursor: pointer;
  z-index: 1;
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar) / 3);
  border: none;
  background-color: var(--color-on-bg);
  padding: 0;
  /* animation */
  transition: var(--transition-click-action), width 0.2s ease-in-out;
  transform-origin: calc(var(--size-sidebar-button) / 2);
  /* layout */
  overflow: hidden;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
}
.settings_button > * {
  flex-shrink: 0;
}

.toggle_text {
  color: #aaa;
  filter: var(--filter-icon);
  width: calc(var(--width-sidebar-button-showing) - var(--size-sidebar-button));
  text-align: right;
  font-weight: 500;
  font-size: 14px;
  font-family: "Roboto", "Lato", "Inter", sans-serif;
  padding-right: 10px;
}
.settings_button:hover,
.settings_button:active {
  width: calc(var(--width-sidebar-button-showing));
}
.settings_icon {
  height: 100%;
  width: var(--size-sidebar-button);
  filter: var(--filter-icon);
  background-image: url(@/assets/img/general/portal/settings.png);
  background-image: url(@/assets/img/general/portal/settings.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  user-select: none;
  pointer-events: none;
}
.sidebar_overflow::-webkit-scrollbar {
  display: none;
}
.sidebar_overflow {
  overflow-y: auto;
  /* layout */
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: var(--padding-sidebar);
  padding-bottom: calc(var(--padding-sidebar) + var(--height-sidebar-action));
}
</style>
