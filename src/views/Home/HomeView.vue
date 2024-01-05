<template>
  <main class="home">
    <div id="home_main">
      <h2 class="header_style">
        Organize.
        <router-link title="*our* plan" class="home_to_roadmap click-action" to="/roadmap"
          >Plan.</router-link
        >
        Study.
      </h2>
      <h3 class="middle-text secondary_home_text">
        A more effective way to manage test schedules, long-term assignments, and exam stress.
      </h3>
      <div class="homepage_actions">
        <button class="action-btn click-action" @click="tomain">
          {{ logged_in ? "Open App" : "Get Started" }}
        </button>
        <button v-if="!logged_in" class="secondary_action auth-action can-login">
          I already have an account
        </button>
      </div>
    </div>
    <div class="home_art">
      <img v-lazy="source" class="contrast_dark" />
    </div>
    <OverlayWrapper v-if="$route.name !== 'home'" @close="close" v-slot="scope">
      <router-view class="router_center_view scale_in_view" @close="scope.close" />
    </OverlayWrapper>
  </main>
</template>

<script>
// import store
import { useMainStore } from "@/store";
import OverlayWrapper from "@/components/Modal/OverlayWrapper.vue";

export default {
  name: "HomeView",
  components: {
    OverlayWrapper,
  },
  computed: {
    combo() {
      // return a random combo, with h0-h2 and s0-s6 (ex: h1s3)
      // try getting from local storage
      let stored = window.localStorage.getItem("home_art");
      let stored_first = stored ? stored.split("h")[1][0] : null,
        stored_second = stored ? stored.split("s")[1][0] : null;
      // convert to int
      stored_first = stored_first ? parseInt(stored_first) : null;
      stored_second = stored_second ? parseInt(stored_second) : null;
      // generate a new combo
      let combo, first, second;
      // if existing, don't reuse either of the two
      while (!combo || second == stored_second || first == stored_first) {
        first = Math.floor(Math.random() * 3);
        second = Math.floor(Math.random() * 7);
        combo = `h${first}s${second}`;
      }
      // save to local storage to prevent repeats
      window.localStorage.setItem("home_art", combo);
      return combo;
    },
    store() {
      return useMainStore();
    },
    logged_in() {
      return this.store.user;
    },
    source() {
      try {
        // Dynamically generate the image source based on the variable 'picture'
        return require(`@/assets/img/art/splash/${this.combo}.png`);
      } catch (error) {
        // If the image doesn't exist, return a fallback image source or an empty string
        // You can modify this to suit your specific use case
        return "err";
      }
    },
    close_path() {
      return this.$route?.meta?.close_path;
    },
  },
  methods: {
    close() {
      this.$router.replace(
        this.store.done_join_form && this.$route?.query?.redirect ? this.$route.query.redirect : "/"
      );
    },
    tomain() {
      if (this.logged_in) {
        this.$router.push("/portal");
      } else {
        this.$router.push({ name: "join", query: { redirect: this.$route?.query?.redirect } });
      }
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-flow: row wrap;
  justify-content: stretch;
  align-items: center;
  height: 100%;
  /* sizing */
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.home_to_roadmap {
  color: var(--color-theme);
}
.home_art {
  /* layout */
  display: flex;
  flex-basis: 200px;
  flex-grow: 1;
  /* interaction */
  user-select: none;
  pointer-events: none;
}
/* .home_art__placehold:not([lazy="error"]):not([lazy="loaded"]) {
  background: url(@/assets/img/art/homepage_art_small.png) no-repeat cover;
} */
/* hide on small screens */
@media (max-width: 1200px) {
  .home_art {
    display: none;
  }
}
.home_art * {
  width: 100%;
  height: 100%;
}
#home_main > * {
  max-width: 600px;
}
.home .middle-text {
  margin: 25px 0;
}
.secondary_action {
  margin: var(--margin-home-action);
  margin-right: 0;
  background: none;
  color: var(--color-text);
  border: none;
  padding: 5px 20px;
  font-size: 17px;
  font-weight: 500;
}
.secondary_action:hover {
  text-decoration: underline;
}
@media (max-width: 450px) and (max-height: 900px) {
  .home .action-btn {
    position: absolute;
    bottom: 40px;
    right: 40px;
    width: calc(100% - 80px);
  }
  .home .secondary_action {
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 100%;
    margin: 0;
    border-radius: 0;
    border-top: 1px solid var(--color-border);
    text-shadow: 0px 0px 3px var(--color-home);
  }
}
</style>
