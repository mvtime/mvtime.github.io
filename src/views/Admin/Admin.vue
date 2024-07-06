<template>
  <main class="admin">
    <div class="admin_menus">
      <div class="admin_sidebar">
        <span class="admin_sidebar__tophaze"></span>
        <div class="admin_sidebar_scrollable admin_section">
          <div class="admin_sidebar_header">
            <div class="branding-title gohome">
              {{ $env.VUE_APP_BRAND_NAME_SHORT }}
              <span
                class="branding-admin"
                @click="
                  $router.push({
                    name: 'portal',
                    query: {
                      ...$route.query,
                      search: undefined,
                      action: undefined,
                    },
                  });
                  $event.stopPropagation();
                "
                >Admin Panel</span
              >
            </div>
          </div>
          <div class="admin_sidebar_items">
            <a
              :style="{ animationDelay: `${(index + 1) * 0.05}s` }"
              class="admin_sidebar_item admin_in"
              :title="`View ${p.title} info and options`"
              @click="
                if (active === p.short) {
                  key++;
                }
                open_page(p.short);

                $event.preventDefault();
              "
              :class="{ active: active === p.short }"
              :href="`/portal/admin/${p.short}`"
              v-for="(p, index) in pages"
              :key="p.short"
              :disabled="p.disabled"
            >
              <div class="admin_sidebar_item__icon themed_icon" :style="{ backgroundImage: `url(${p.img.png})` }"></div>
              <span class="admin_sidebar_item__text">{{ p.name }}</span>
              <span class="flex_spacer"></span>
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
        <span class="admin_sidebar__bottomhaze"></span>

        <div class="sidebar_last_block auth-action can-logout doprompt">
          <div class="linked_acc_icon" v-if="$store && $store.personal_account">
            <img class="linked_acc_icon__img" width="24" height="24" src="@/assets/img/general/user-linked.png" alt="Linked Account" />
          </div>
          <div class="active_acc_icon" v-else-if="$store && $store.user && user_pfp" :title="`Logged in as ${$store.user.displayName} (${this.$store.user.email})`">
            <img class="active_acc_icon__img" width="26" height="26" :src="user_pfp" referrerpolicy="no-referrer" alt="Account Profile Image" />
          </div>
          <div class="auth_logout can_logout">Log Out</div>
        </div>
      </div>
      <div class="admin_info">
        <span class="admin_info__tophaze"></span>
        <div class="admin_info_scrollable admin_section">
          <span>
            The admin panel is still in beta, so some features may not be available yet. <br /><br />
            We're working hard to bring you the best experience possible, so please <router-link :to="{ name: 'contact' }">contact us</router-link> if you have any feedback or suggestions.
            <br /><br />
            You can see what we're working on by checking out the <router-link :to="{ name: 'roadmap' }">roadmap</router-link>!
          </span>
        </div>
        <span class="admin_info__bottomhaze"></span>
      </div>
    </div>
    <div class="admin_main_wrapper">
      <router-view class="admin_main" :key="key"></router-view>
    </div>
  </main>
</template>

<script>
import { WarningToast } from "@svonk/util";
export default {
  name: "AdminPortal",
  data() {
    return {
      key: 0,
      pages: [
        {
          name: "Logs & Debugging",
          short: "logs",
          title: "log and debug",
          img: {
            png: require("@/assets/img/general/portal/admin/logs.png"),
            svg: require("@/assets/img/general/portal/admin/logs.svg"),
          },
        },
        {
          name: "District & .env",
          short: "opts",
          title: "customization",
          img: {
            png: require("@/assets/img/general/portal/admin/opts.png"),
            svg: require("@/assets/img/general/portal/admin/opts.svg"),
          },
        },
        {
          name: "Users & Teachers",
          short: "usrs",
          title: "user",
          img: {
            png: require("@/assets/img/general/portal/admin/usrs.png"),
            svg: require("@/assets/img/general/portal/admin/usrs.svg"),
          },
        },
        {
          name: "Messages & Alerts",
          short: "msgs",
          title: "alerts and messaging",
          img: {
            png: require("@/assets/img/general/portal/admin/msgs.png"),
            svg: require("@/assets/img/general/portal/admin/msgs.svg"),
          },
        },
        {
          name: "Usage & Analytics",
          short: "usge",
          title: "usage and analytics",
          img: {
            png: require("@/assets/img/general/portal/admin/usge.png"),
            svg: require("@/assets/img/general/portal/admin/usge.svg"),
          },
          disabled: true,
        },
      ],
    };
  },
  computed: {
    active() {
      return this.$route.name.replace("admin_", "") || "logs";
    },
    page() {
      return this.pages.find((p) => p.short === this.active);
    },
    user_pfp() {
      return this.$store && this.$store.user && this.$store.user.photoURL ? this.$store.user.photoURL.replace("s96-c", "s26-c") : null;
    },
    shortcuts() {
      return [];
    },
  },
  methods: {
    keydown(e) {
      void e;
    },
    open_outlink(page) {
      window.open(`/portal/admin/${page}`, "_blank");
    },
    open_page(page) {
      this.$router.push({
        name: "admin_" + page,
        query: { ...this.$route.query, search: undefined, action: undefined },
      });
    },
  },
  watch: {
    page(newpage) {
      if (newpage.disabled) {
        this.open_page("logs");
        new WarningToast("Sorry, that page is not available yet", 2500);
        return;
      }
      this.$router.push({
        name: "admin_" + this.active,
        query: { ...this.$route.query, search: undefined, action: undefined },
      });
    },
  },
  mounted() {
    window.addEventListener("keydown", this.keydown);
    this.$shortcuts.register_all(this.shortcuts, "Admin");
    if (this.page.disabled) {
      this.open_page("logs");
      new WarningToast("Sorry, that page is not available yet", 2500);
    }
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.keydown);
    this.$shortcuts.remove_tag("Admin");
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
  overflow-x: visible;
}

.parent.simplified .admin_section {
  box-shadow: none;
}
.admin_menus {
  display: flex;
  flex: 0 0 270px;
  width: 270px;
  align-items: stretch;
  justify-content: stretch;
  flex-flow: column nowrap;
  gap: var(--padding-sidebar);
  /* allow scroll without border padding */
  position: relative;
  top: calc(0px - var(--padding-sidebar));
  height: calc(100% + var(--padding-sidebar) * 2);
  padding: var(--padding-sidebar) 0;
  overflow-y: auto;
}
/* sidebar */
.admin_sidebar,
.admin_info {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  position: relative;
  height: auto;
  overflow-x: visible;
}
.admin_sidebar {
  flex: 0 1 auto;
  min-height: 235px;
}
.admin_info {
  flex: 0 6 auto;
  min-height: 100px;
}
.admin_sidebar .admin_sidebar_scrollable,
.admin_info .admin_info_scrollable {
  display: flex;
  flex-flow: column nowrap;
  flex-shrink: 1;
  gap: var(--padding-sidebar);
  overflow-y: auto;
  max-height: 100%;
}
.admin_sidebar .admin_sidebar_scrollable {
  padding-bottom: calc(var(--padding-sidebar) + 20px + 50px);
}
.admin_sidebar .admin_sidebar__tophaze,
.admin_sidebar .admin_sidebar__bottomhaze,
.admin_info .admin_info__tophaze,
.admin_info .admin_info__bottomhaze {
  position: absolute;
  width: 100%;
  left: 0;
  z-index: 1;
  pointer-events: none;
  height: var(--padding-sidebar);
}
.admin_sidebar .admin_sidebar__tophaze,
.admin_info .admin_info__tophaze {
  top: 0;
  background: linear-gradient(to bottom, var(--color-bg) 0%, #00000000 100%);
  border-radius: var(--radius-sidebar) var(--radius-sidebar) 0 0;
}
.admin_sidebar .admin_sidebar__tophaze {
  height: calc(var(--padding-sidebar) + 10px);
}
.admin_sidebar .admin_sidebar__bottomhaze,
.admin_info .admin_info__bottomhaze {
  bottom: 0;
  border-radius: 0 0 var(--radius-sidebar) var(--radius-sidebar);
  background: linear-gradient(to top, var(--color-bg) 0%, #00000000 100%);
}
.admin_sidebar .admin_sidebar__bottomhaze {
  height: calc(var(--padding-sidebar) + 70px);
  background: linear-gradient(to top, var(--color-bg) calc(var(--padding-sidebar) / 2 + 50px), #00000000 100%);
}

.admin_sidebar_scrollable::-webkit-scrollbar,
.admin_info_scrollable::-webkit-scrollbar {
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
  justify-content: flex-start;
  padding: 10px;
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

.admin_sidebar_item__icon {
  flex: 0 0 20px;
  width: 20px;
  min-height: 20px;
  height: 100%;
  margin-right: 15px;
}
.admin_sidebar_items .admin_sidebar_item .flex_spacer {
  flex: 1 0 10px;
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
  z-index: 2;

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
  overflow-x: visible;
}
.admin_main_wrapper::-webkit-scrollbar,
.admin_menus::-webkit-scrollbar {
  display: none;
}

.admin_main,
.admin_main_wrapper {
  flex: 1 1 auto;
  display: flex;
  flex-flow: column nowrap;
}

@media (max-width: 670px) {
  main.admin {
    display: flex;
    flex-flow: column nowrap;
    overflow-y: auto;
    gap: var(--padding-sidebar);
    flex: 0 0 auto;
  }

  .admin_menus,
  .admin_info_scrollable,
  .admin_sidebar_scrollable,
  .admin_main_wrapper {
    height: unset;
    max-height: unset;
    overflow-y: unset;
    width: 100%;
    flex: 0 0 auto;
  }

  .admin_menus {
    position: unset;
    padding: 0;
  }
  .admin_menus .admin_info {
    height: 120px;
    display: none;
  }

  .admin_sidebar {
    padding-bottom: 10px;
  }

  .admin_main_wrapper {
    padding: 0;
    position: unset;
  }
}
</style>
<style>
@keyframes adminin {
  from {
    opacity: 0;
    scale: 0.9;
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes adminindisabled {
  from {
    opacity: 0;
    scale: 0.9;
  }
  to {
    opacity: 0.5;
    transform: scale(1);
  }
}

/* LOADING */

@keyframes loading_swipe {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
@keyframes loading_throb {
  0% {
    background: var(--color-theme-alt);
  }
  50% {
    background: var(--color-theme);
  }
  100% {
    background: var(--color-theme-alt);
  }
}

/* background shimmer */
.part_loading_animation {
  outline: 1px solid var(--color-theme-alt);
  outline-offset: -1px;
  opacity: 0.75;
  background: linear-gradient(90deg, #00000000 0%, var(--color-theme-alt) 50%, #00000000 100%);
  background-size: 200% 100%;
  animation: loading_swipe 2.5s infinite;
}
.part_loading_animation .part_loading_animation {
  background: var(--color-theme);
  animation: loading_throb 2.5s infinite;
  opacity: 0.5;
}

main.admin .admin_main {
  --padding-sidebar: 10px;
}
main.admin .admin_section,
main.admin .admin_main > div/*:not(.plain)*/ {
  border-radius: var(--radius-sidebar);
  box-shadow: var(--shadow-highlight);
  padding: var(--padding-sidebar);
  background-color: var(--color-bg);
  flex-shrink: 0;
  transform-origin: center var(--padding-sidebar);
}
main.admin .admin_in,
main.admin .admin_main > div {
  opacity: 0;
  animation: adminin 0.3s cubic-bezier(0.49, -0.02, 0, 1.38) forwards;
}
main.admin .admin_in[disabled] {
  opacity: 0;
  animation: adminindisabled 0.3s cubic-bezier(0.49, -0.02, 0, 1.38) forwards;
  cursor: not-allowed;
}
/* TODO: Remove */
main.admin .admin_main .placeholder::before {
  content: "Coming soon: ";
  font-weight: 500;
}
</style>
