<template>
  <div class="right-bar portal_sidebar" :class="{ active: sidebar_open }" @click="show_if_inactive">
    <div class="sidebar_overflow">
      <div class="sidebar_first_block auth-action can-logout doprompt">
        <div class="linked_acc_icon" v-if="$store && $store.personal_account">
          <img
            class="linked_acc_icon__img"
            width="24"
            height="24"
            src="@/assets/img/general/user-linked.png"
            alt="Linked Account"
          />
        </div>
        <div
          class="active_acc_icon"
          v-else-if="$store && $store.user && user_pfp"
          :title="`Logged in as ${$store.user.displayName} (${this.$store.user.email})`"
        >
          <img
            class="active_acc_icon__img"
            width="26"
            height="26"
            :src="user_pfp"
            referrerpolicy="no-referrer"
            alt="Account Profile Image"
          />
        </div>
        <div class="auth_logout can_logout">Log Out</div>
      </div>
      <div class="flex_spacer"></div>
      <UpcomingTasks :loading="loading" />
      <div class="flex_spacer"></div>
    </div>
    <button
      class="settings_button click-action"
      title="Settings"
      @click="$router.push({ name: 'settings', query: $route.query })"
    >
      <div class="settings_icon"></div>
    </button>
    <SidebarToggle @click="close_sidebar" />
  </div>
</template>

<script>
import SidebarToggle from "@/components/Portal/SidebarToggle.vue";
import UpcomingTasks from "@/components/Portal/UpcomingTasks.vue";
export default {
  name: "RightBar",
  components: {
    SidebarToggle,
    UpcomingTasks,
  },
  props: {
    paged: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close_left_bar", "mounted"],
  data() {
    return {
      sidebar_open: false,
      loading: true,
    };
  },
  computed: {
    user_pfp() {
      console.log(this.$store.user);
      return this.$store && this.$store.user && this.$store.user.photoURL
        ? this.$store.user.photoURL.replace("s96-c", "s26-c")
        : null;
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
    show_if_inactive() {
      if (!this.sidebar_open) this.sidebar_open = true;
      // emit event to close left bar
      this.$emit("close_left_bar");
    },
    close_sidebar() {
      if (this.sidebar_open) setTimeout(() => (this.sidebar_open = false), 10);
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
.sidebar_first_block {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: stretch;
  margin-bottom: var(--padding-sidebar);
  gap: 5px;
}
.sidebar_first_block {
  width: calc(100% + 20px);
  padding: 10px 8px 10px 10px;
  margin-top: -10px;
  margin-left: -10px;
  background: var(--color-on-bg);
  border-radius: calc(var(--radius-sidebar) - 10px);
}
.linked_acc_icon,
.active_acc_icon {
  flex: 0 0 30px;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.linked_acc_icon {
  filter: var(--filter-icon);
}
.active_acc_icon {
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar) / 2);
  overflow: hidden;
  margin-right: 5px;
  border: solid 2px var(--color-on-bg);
}
.auth_logout {
  flex: 1 1 auto;
}
.right-bar {
  border-radius: var(--radius-sidebar) 0 0 var(--radius-sidebar);
}
.auth-action {
  cursor: pointer;
}
.can_logout {
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
.can_logout::after {
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
@media (min-width: /* [desktop size] */ 1270px) and (max-height: 1200px) {
  main.portal .portal_sidebar {
    border-left: 3px solid var(--color-on-bg);
  }
}
@media (max-width: /* [desktop size] */ 1270px) {
  main.portal .portal_sidebar {
    transform: translate(calc(100% - 15px));
  }
  main.portal .portal_sidebar:hover {
    transform: translate(calc(100% - 25px));
  }
  /* prevent accidental clicks when hovering over collapsed sidebar */
  main.portal .portal_sidebar:not(.active):not(.paged) * {
    pointer-events: none !important;
    user-select: none !important;
  }
}

/* info icon */
.settings_button {
  position: absolute;
  display: block;
  bottom: calc(var(--padding-sidebar) / 1.5);
  right: calc(var(--padding-sidebar) / 1.5);
  z-index: 1;
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
