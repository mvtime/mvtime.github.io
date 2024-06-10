<template>
  <main class="admin">
    <div class="admin_sidebar">
      <div class="admin_sidebar_scrollable admin_section">
        <div class="admin_sidebar_header">
          <div class="branding-title gohome">
            {{ $env.VUE_APP_BRAND_SHORT_NAME }}
            <span
              class="branding-admin"
              @click="
                $router.push({ name: 'portal' });
                $event.stopPropagation();
              "
              >Admin Panel</span
            >
          </div>
        </div>
        <div class="admin_sidebar_items">
          <a
            class="admin_sidebar_item"
            :title="`View ${p.title} info and options`"
            @click="
              active = p.short;
              $event.preventDefault();
            "
            :class="{ active: active === p.short }"
            :href="`?page=${p.short}`"
            v-for="p in pages"
            :key="p.short"
          >
            <span class="admin_sidebar_item__text">{{ p.name }}</span>
            <button
              class="admin_sidebar_item__outlink click-action"
              :title="`Open ${p.title} in a new tab`"
              @click="
                open_outlink(p.short);
                $event.preventDefault();
                $event.stopPropagation();
              "
            >
              <span class="admin_sidebar_item__outlink__icon themed_icon"></span>
            </button>
          </a>
        </div>
      </div>

      <div class="sidebar_last_block auth-action can-logout doprompt">
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
    </div>
    <div class="admin_main_wrapper">
      <component class="admin_main" :is="page.src" />
    </div>
  </main>
</template>

<script>
import { shallowRef } from "vue";
// import pages
import UserTeacher from "./pages/UserTeacher.vue";
import LogDebug from "./pages/LogDebug.vue";
import DistrictEnv from "./pages/DistrictEnv.vue";
import MessagesAlerts from "./pages/MessagesAlerts.vue";
import UsageAnalytics from "./pages/UsageAnalytics.vue";

export default {
  name: "AdminPortal",
  components: {
    UserTeacher,
    LogDebug,
    DistrictEnv,
    MessagesAlerts,
    UsageAnalytics,
  },
  data() {
    return {
      active: "usrs",
      pages: [
        { name: "Users & Teachers", short: "usrs", title: "user", src: shallowRef(UserTeacher) },
        {
          name: "Logs & Debugging",
          short: "logs",
          title: "log and debug",
          src: shallowRef(LogDebug),
        },
        {
          name: "District & .env",
          short: "opts",
          title: "customization",
          src: shallowRef(DistrictEnv),
        },
        {
          name: "Messages & Alerts",
          short: "msgs",
          title: "alerts and messaging",
          src: shallowRef(MessagesAlerts),
        },
        {
          name: "Usage & Analytics",
          short: "usge",
          title: "usage and analytics",
          src: shallowRef(UsageAnalytics),
        },
      ],
    };
  },
  computed: {
    page() {
      return this.pages.find((p) => p.short === this.active);
    },
    user_pfp() {
      return this.$store && this.$store.user && this.$store.user.photoURL
        ? this.$store.user.photoURL.replace("s96-c", "s26-c")
        : null;
    },
  },
  methods: {
    keydown(e) {
      void e;
    },
    open_outlink(page) {
      window.open(`?page=${page}`, "_blank");
    },
  },
  watch: {
    page() {
      this.$router.push({ query: { page: this.active } });
    },
    "$route.query.page"(page) {
      if (this.pages.some((p) => p.short === page)) {
        this.active = page;
      }
    },
  },
  mounted() {
    if (this.$route.query.page && this.pages.some((p) => p.short === this.$route.query.page)) {
      this.active = this.$route.query.page;
    } else {
      this.$router.replace({ query: { page: this.active } });
    }
    window.addEventListener("keydown", this.keydown);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.keydown);
  },
};
</script>

<style scoped>
.branding-admin {
  color: var(--color-theme);
}

/* major section styles */
main.admin {
  background-color: var(--color-secondary);
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: stretch;
  padding: var(--padding-sidebar);
}

main.admin,
.admin_main {
  display: flex;
  gap: var(--padding-sidebar);
}

.parent.simplified .admin_section {
  box-shadow: none;
}

/* sidebar */
.admin_sidebar {
  display: flex;
  flex-flow: column nowrap;
  flex: 0 0 300px;
  width: 300px;
  position: relative;
  height: fit-content;
  max-height: 100%;
}
.admin_sidebar .admin_sidebar_scrollable {
  display: flex;
  flex-flow: column nowrap;
  gap: var(--padding-sidebar);
  overflow-y: auto;
  padding-bottom: calc(var(--padding-sidebar) + 20px + 50px);
  max-height: 100%;
}
.admin_sidebar_scrollable::-webkit-scrollbar {
  display: none;
}
.admin_sidebar_items {
  display: flex;
  flex-flow: column nowrap;
  gap: 15px;
}

.admin_sidebar_item {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px 10px 10px 15px;
  color: var(--color-text);
  font-weight: 400;
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar) / 2);
  background-color: var(--color-bg);
  font-size: 16px;
  cursor: pointer;
  border: solid 2px var(--color-on-bg);
}

.admin_sidebar_item.active {
  background-color: var(--color-on-bg);
  /* border-color: var(--color-primary); */
}
.admin_sidebar_item.active .admin_sidebar_item__outlink {
  visibility: hidden;
}
.admin_sidebar_item__outlink {
  display: block;
  border: none;
  padding: 0;
  height: 20px;
  width: 20px;
  flex: 0 0 20px;
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar) / 2 - 15px / 2);
  background: var(--color-on-bg);
}
.admin_sidebar_item__outlink__icon {
  display: block;
  height: 100%;
  width: 100%;
  background-image: url(@/assets/img/general/portal/admin/arrow-up-right.png);
  background-image: url(@/assets/img/general/portal/admin/arrow-up-right.svg);
}

/* sidebar auth */
.sidebar_last_block {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: stretch;
  gap: 5px;
  position: absolute;
  bottom: calc(var(--padding-sidebar) - 10px);
  left: 10px;

  width: calc(100% - 20px);
  padding: 10px 8px 10px 10px;
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
/* pages */
.admin_main_wrapper {
  position: relative;
  top: calc(0px - var(--padding-sidebar));
  height: calc(100% + var(--padding-sidebar) * 2);
  padding: var(--padding-sidebar) 0;
  overflow-y: auto;
}
.admin_main_wrapper::-webkit-scrollbar {
  display: none;
}

.admin_main,
.admin_main_wrapper {
  flex: 1 1 auto;
  display: flex;
  flex-flow: column nowrap;
}
</style>
<style>
main.admin .admin_section,
main.admin .admin_main > div {
  border-radius: var(--radius-sidebar);
  box-shadow: var(--shadow-highlight);
  padding: var(--padding-sidebar);
  background-color: var(--color-bg);
}
</style>
