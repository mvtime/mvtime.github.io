<template>
  <div class="left-bar portal_sidebar" :class="{ active: sidebar_open }" @click="show_if_inactive">
    <div class="sidebar_overflow">
      <div class="branding-title gohome">MV Test Tracker</div>
      <div class="flex_spacer"></div>
      <!-- Actions Panel -->
      <ActionsPanel v-if="store && store.is_teacher" />
      <!-- Class List -->
      <ClassList v-bind="$attrs" @dragclass="$emit('dragclass', $event)" />
      <div class="flex_spacer"></div>
    </div>
    <!-- Theme Button -->
    <button
      :_theme="store.get_theme"
      class="theme_button click-action"
      title="Switch Theme"
      @click="store.toggle_theme"
    >
      <div class="theme_icon"></div>
      <div class="toggle_text">Switch Theme</div>
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
  props: {
    paged: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close_right_bar", "set_class", "mounted", "dragclass"],
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
    this.$emit("mounted");
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
    set_class(c) {
      this.$emit("set_class", c);
    },
    load() {
      this.loading = false;
    },
  },
  watch: {
    paged() {
      if (this.paged) this.sidebar_open = true;
    },
  },
};
</script>

<style scoped>
.left-bar {
  border-radius: 0 var(--radius-sidebar) var(--radius-sidebar) 0;
}
@media (min-width: /* [desktop size] */ 1270px) and (max-height: 1200px) {
  main.portal .portal_sidebar {
    border-right: 3px solid var(--color-on-bg);
  }
}
@media (max-width: /* [desktop size] */ 1270px) {
  main.portal .portal_sidebar {
    transform: translate(calc(-100% + 15px));
  }
  main.portal .portal_sidebar:hover {
    transform: translate(calc(-100% + 25px));
  }
  /* prevent accidental clicks when hovering over collapsed sidebar */
  main.portal .portal_sidebar:not(.active):not(.paged) * {
    pointer-events: none !important;
    user-select: none !important;
  }
}

.branding-title {
  font-weight: 700;
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  user-select: none;
}
/* theme icon */
.theme_button {
  /* sizebar specific styling */
  bottom: calc(var(--padding-sidebar) / 1.5);
  left: calc(var(--padding-sidebar) / 1.5);
  position: absolute;
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
