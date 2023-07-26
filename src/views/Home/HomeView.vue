<template>
  <main class="home">
    <div id="home_main">
      <h2>Organize. Plan. Study.</h2>
      <h3 class="middle-text secondary_home_text">
        An effective way to manage test schedules, long-term assignments, and exam stress.
      </h3>
      <button class="action-btn auth-action can-login click-action" @click="tomain">
        {{ logged_in ? "Open App" : "Get Started" }}
      </button>
    </div>
    <div class="home_art">
      <img v-lazy="source" />
    </div>
  </main>
</template>

<script>
// import store
import { useMainStore } from "@/store";

export default {
  name: "HomeView",
  computed: {
    combo() {
      // return a random combo, with h0-h2 and s0-s6 (ex: h1s3)
      // try getting from local storage
      let stored = localStorage.getItem("home_art");
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
      localStorage.setItem("home_art", combo);
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
  },
  methods: {
    tomain() {
      if (this.store.user) {
        this.$router.push(this.$route.query.redirect || "/portal");
      }
    },
  },
};
</script>

<style>
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
.home_art {
  display: flex;
  flex-basis: 200px;
  flex-grow: 1;
  /* layout */
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
@media (max-width: 450px) and (max-height: 900px) {
  .home .action-btn {
    position: absolute;
    bottom: 40px;
    right: 40px;
    width: calc(100% - 80px);
  }
}
</style>
