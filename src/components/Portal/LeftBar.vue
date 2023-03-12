<template>
  <div class="left-bar portal_sidebar" :class="{ active: sidebar_open }" @click="show_if_inactive">
    <div class="branding-title">MV Test Tracker</div>
    <!-- Actions Panel -->
    <!-- Class List -->
    <!-- Settings Button -->
    <SidebarToggle class="right" @click="close_sidebar" />
  </div>
</template>

<script>
import SidebarToggle from "@/components/Portal/SidebarToggle.vue";
export default {
  name: "LeftBar",
  components: {
    SidebarToggle,
  },
  emits: ["close_right_bar"],
  data() {
    return {
      sidebar_open: false,
    };
  },
  mounted() {
    window.addEventListener("resize", function () {
      this.sidebar_open = false;
    });
  },
  unmounted() {
    window.removeEventListener("resize", function () {
      this.sidebar_open = false;
    });
  },
  methods: {
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
    transform: translate(calc(-100% + 10px));
  }
  main.portal .portal_sidebar:hover {
    transform: translate(calc(-100% + 20px));
  }
}
.branding-title {
  font-weight: 700;
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  user-select: none;
}
</style>
