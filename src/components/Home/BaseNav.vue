<template>
  <header>
    <h1 class="hideoverflow">MV Test Tracker</h1>
    <span class="flex-spacer"></span>
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
      <nav class="base-pages-nav">
        <!-- show only if not on that page -->
        <router-link class="click-action-inline" to="/" @click="closeMenu">Home</router-link>
        <router-link class="click-action-inline" to="/about" @click="closeMenu">About</router-link>
        <router-link class="click-action-inline" to="/contact" @click="closeMenu"
          >Contact</router-link
        >
      </nav>
      <span class="flex-spacer"></span>
      <button id="nav-auth-btn" class="small-action-btn auth-action can-logout click-action">
        Log {{ logged_in ? "Out" : "In" }}
      </button>
    </div>
  </header>
</template>

<script>
import { useMainStore } from "../../store";
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
    store() {
      return useMainStore();
    },
    logged_in() {
      return !!this.store.user;
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
/* mobile */
@media (max-width: 800px) {
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
    box-shadow: var(--shadow-highlight);
    width: 200px;
    height: 300px;
  }
  header {
    flex-flow: row nowrap;
    position: relative;
  }
  header .flex-spacer {
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
}
/*! ugly but mobile-friendly 

@media (max-width: 500px) {
  header .nav-actions {
    position: fixed;
    top: 0;
    right: 0;
    border-radius: 0;
    right: 0;
    top: 0;
    width: 400px;
    max-width: 100%;
    height: 100%;
  }
  header .base-pages-nav {
    flex-grow: 1;
    max-height: 400px;
    justify-content: space-evenly;
    font-size: 2em;
  }
  header #nav-auth-btn {
    font-size: 2em;
  }
} */
</style>
