<template>
  <div class="not-found">
    <h1 class="title_text err_text">404</h1>
    <h2 class="header_style err_text hideoverflow">Page Not Found</h2>
    <hr class="err-break" />
    <nav>
      <router-link class="router-link click-action-inline" to="/">Home</router-link>
      <span>&nbsp;|&nbsp;</span>

      <router-link v-if="logged_in" class="router-link click-action-inline" to="/portal"
        >Portal</router-link
      >
      <span class="nostyle" v-else>
        <router-link class="router-link click-action-inline" to="/about">About</router-link>
        <span>&nbsp;|&nbsp;</span>
        <router-link class="router-link click-action-inline" to="/contact"
          >Contact</router-link
        ></span
      >
    </nav>

    <div class="err-pad-bottom"></div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  computed: {
    logged_in() {
      return this.$store.user;
    },
  },
};
</script>

<style scoped>
h1.err_text {
  font-weight: 800;
  font-size: 120px;
}
h2.err_text {
  font-size: 40px;
  display: block;
  opacity: 0.7;
}
.not-found {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  height: 100%;
  width: 100%;
  text-align: left;
  max-width: 1000px;
  margin: 0 auto;
}
.err-pad-bottom {
  padding-bottom: 51px;
}
.err-break {
  margin: 20px 0;
  margin-bottom: 15px;
  border: 0;
  height: 3px;
  border-radius: 4px;
  opacity: 0.8;
  background-image: linear-gradient(to right, var(--color-theme) 50px, rgba(0, 0, 0, 0) 75%);
}
nav span:not(.router-link):not(.nostyle) {
  opacity: 0.7;
  color: #4c4c4c;
}
nav .router-link {
  opacity: 1;
  color: var(--color-theme);
}
</style>
