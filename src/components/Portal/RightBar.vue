<template>
  <div class="right-bar portal_sidebar" :class="{ active: sidebar_open }" @click="show_if_inactive">
    <div class="auth-action can-logout">Log Out</div>
    <!-- Upcoming exams 
        use exam card component
    -->
    <SidebarToggle @click="close_sidebar" />
  </div>
</template>

<script>
import SidebarToggle from "@/components/Portal/SidebarToggle.vue";
export default {
  name: "RightBar",
  components: {
    SidebarToggle,
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
</style>
