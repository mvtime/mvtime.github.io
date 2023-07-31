<template>
  <main class="apphome hidescroll scrolloverflow">
    <main class="base fullheightcontent">
      <BaseNav />
      <router-view class="inner-base" />
    </main>
    <BaseFooter />
  </main>
</template>

<script>
import BaseNav from "@/components/Home/BaseNav.vue";
import BaseFooter from "@/components/Home/BaseFooter.vue";
export default {
  name: "AppHome",
  components: {
    BaseNav,
    BaseFooter,
  },
};
</script>

<style>
.apphome {
  background-color: var(--color-home);
}
.base {
  padding: 70px 90px;
  padding-bottom: calc(70px - var(--footer-height));
  display: flex;
  flex-flow: column nowrap;
}
.inner-base {
  padding: 40px 0;
  flex-grow: 1;
}
@media (max-width: 1000px) {
  .base {
    padding: 50px 60px;
  }
}
@media (max-width: 500px) {
  .base {
    padding: 40px 40px;
  }
  .inner-base {
    padding: 20px 0;
  }
}
.inner-base {
  padding-bottom: 0;
}
</style>
