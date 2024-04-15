<template>
  <header>
    <h1 class="gohome hideoverflow">{{ $env.VUE_APP_BRAND_LONG_NAME }}</h1>

    <!-- Theme Button -->
    <button
      :_theme="$store.get_theme"
      class="theme_button"
      title="Switch Theme"
      @click="$store.toggle_theme"
    >
      <div class="theme_icon"></div>
      <div class="toggle_text">Switch Theme</div>
    </button>
    <span class="flex_spacer"></span>
    <button
      class="nav-mobile-btn"
      v-if="mobile && !mobile_menu_open"
      @click="mobile_menu_open = !mobile_menu_open"
    ></button>
    <div class="nav-actions" v-if="!mobile || mobile_menu_open" :class="{ mobile: mobile }">
      <button
        class="nav-mobile-btn alt-btn"
        v-if="mobile"
        @click="mobile_menu_open = !mobile_menu_open"
      ></button>
      <hr />
      <nav class="base-pages-nav">
        <router-link class="click-action-inline" to="/" @click="closeMenu">Home</router-link>
        <router-link class="click-action-inline" to="/about" @click="closeMenu">About</router-link>
        <router-link class="click-action-inline" to="/contact" @click="closeMenu"
          >Contact</router-link
        >
        <a
          class="click-action-inline"
          v-for="pair in JSON.parse($env.VUE_APP_ORG_LINKS || '[]')"
          :href="pair[1]"
          :key="pair[1]"
          @click="closeMenu"
          >{{ pair[0] }}
        </a>
      </nav>
      <span class="flex_spacer"></span>
      <button
        id="nav-auth-btn"
        class="small-action-btn auth-action can-logout can-login click-action"
        :class="{ linked: $store.personal_account && $store.user, oauth: !logged_in }"
      >
        Log {{ logged_in ? "Out" : "In" }}
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: "BaseNav",
  data() {
    return {
      mobile_menu_open: false,
      mobile: window.innerWidth <= 800,
    };
  },
  methods: {
    resize() {
      this.mobile = window.innerWidth <= 800;
      if (!this.mobile) this.closeMenu();
    },
    closeMenu() {
      this.mobile_menu_open = false;
    },
  },
  mounted() {
    window.addEventListener("resize", this.resize);
  },
  unmounted() {
    window.removeEventListener("resize", this.resize);
  },
  computed: {
    logged_in() {
      return !!this.$store.user;
    },
  },
};
// using the mounted() hook to add an event listener
</script>

<style scoped>
header {
  width: 100%;
  white-space: break-spaces;
}
header * {
  white-space: inherit;
}
header,
header .nav-actions,
header .nav-actions nav {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}

header nav a {
  margin: 0 var(--nav-spacing);
  text-decoration: none;
  color: inherit;
}
#nav-auth-btn {
  margin-left: var(--nav-spacing);
}
.base-pages-nav > .router-link-exact-active {
  /* opacity: 0.75; */
  box-shadow: inset 0 -2px 0 var(--color-theme);
}
.nav-mobile-btn {
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(@/assets/img/general/menu/menu-icon.png);
  background-image: url(@/assets/img/general/menu/menu-icon.svg);
  filter: var(--filter-icon);
}
.nav-mobile-btn.alt-btn {
  background-image: url(@/assets/img/general/menu/menu-close-icon.png);
  background-image: url(@/assets/img/general/menu/menu-close-icon.svg);
  margin-left: auto;
}
hr {
  display: none;
}
/* mobile */
@media (max-width: 800px) {
  hr {
    /* display: unset; */
    margin: 0;
    margin-top: 5px;
    margin-bottom: 10px;
    height: 2px;
    background: var(--color-button-display);
  }
  header .nav-actions,
  header .nav-actions nav {
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    justify-content: space-between;
  }
  header .nav-actions {
    position: absolute;
    top: -10px;
    right: -10px;
    background: var(--color-secondary);
    border-radius: 10px;
    padding: 10px;
    z-index: 1;
    width: 200px;
    max-height: 300px;
    overflow-y: auto;
    border: solid 2px var(--color-button-display);
  }
  header .nav-actions::-webkit-scrollbar {
    width: 18px;
    border-radius: 10px;
    margin: 10px 0;
  }
  header .nav-actions::-webkit-scrollbar-thumb {
    background: var(--color-on-bg);
    border-radius: 18px;
    border: solid 6px var(--color-secondary);
  }
  header .nav-actions:hover::-webkit-scrollbar-thumb {
  }
  header {
    flex-flow: row nowrap;
    position: relative;
  }
  header .flex_spacer {
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: 0;
  }
  header .nav-mobile-btn {
    flex-shrink: 0;
    flex-basis: 40px;
    margin-left: var(--nav-spacing);
  }
  header .nav-actions #nav-auth-btn {
    margin-top: var(--nav-spacing);
    width: 100%;
    margin-left: 0;
  }
  header .nav-actions .base-pages-nav a {
    margin: var(--nav-spacing) auto;
    text-align: center;
    font-size: 1.3em;
  }
  header h1 {
    flex-basis: 20px;
    width: 20px;
    flex-grow: 1;
  }
  .theme_button:hover,
  .theme_button:active {
    width: var(--size-sidebar-button);
  }
}
.theme_button {
  margin: 0 calc(var(--nav-spacing) * 2);
}
</style>
