<template>
  <main class="home">
    <div id="home_main">
      <h2>Organize. Plan. Study.</h2>
      <h3 class="middle-text secondary_home_text">
        Test tracker provides an effective way to manage upcoming exams.
      </h3>
      <button class="action-btn auth-action can-login click-action" @click="tomain">
        {{ logged_in ? "Open App" : "Get Started" }}
      </button>
    </div>
    <div class="home_art">
      <img v-lazy="'@/assets/img/art/homepage_art.png'" />
    </div>
  </main>
</template>

<script>
// import store
import { useMainStore } from "@/store";

export default {
  name: "HomeView",
  computed: {
    store() {
      return useMainStore();
    },
    logged_in() {
      return this.store.user;
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
.home_art__placehold {
  background: url(@/assets/img/art/homepage_art_small.png) no-repeat cover;
}
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
