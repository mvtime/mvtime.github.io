<template>
  <main class="hidescroll scrolloverflow">
    <main class="base fullheightcontent">
      <BaseNav />
      <router-view class="inner-base" />
    </main>
    <BaseFooter />
  </main>
</template>

<script>
import BaseNav from '@/components/BaseNav.vue'
import BaseFooter from '@/components/BaseFooter.vue'
export default {
  name: 'App',
  components: {
    BaseNav,
    BaseFooter
  }
}
</script>

<style>
.base {
  padding: 70px 90px;
  padding-bottom: calc(70px - var(--footer-height));
  display: flex;
  flex-flow: column nowrap;
}
.inner-base {
  padding: 20px 0;
  flex-grow: 1;
}
</style>
