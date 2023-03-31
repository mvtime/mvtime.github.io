<template>
  <main class="parent">
    <!-- <div class="titlebar" v-if="isElectron && false">
      <MacTitleBar v-if="platform === 'darwin'" :title="pageTitle"></MacTitleBar>
      <WindowsTitleBar v-if="platform === 'win32'" :title="pageTitle"></WindowsTitleBar>
      <span v-else>
        {{ pageTitle }}
      </span>
    </div> -->
    <router-view></router-view>
  </main>
</template>

<script>
// import MacTitleBar from "@/components/Electron/MacTitleBar.vue";
// import WindowsTitleBar from "@/components/Electron/WindowsTitleBar.vue";
export default {
  name: "App",
  components: {
    // MacTitleBar,
    // WindowsTitleBar,
  },
  data() {
    return {
      platform: "",
      isElectron: false,
    };
  },
  computed: {
    pageTitle() {
      return document.title;
    },
  },
  mounted() {
    this.isElectron = navigator.userAgent.toLowerCase().indexOf(" electron/") > -1;
    if (this.isElectron) {
      this.platform = this.$route.query.platform;
      if (!this.platform && window.location.search) {
        this.platform = window.location.search.split("=")[1];
      }
      console.log("Electron Platform: " + this.platform);
    }
  },
};
</script>

<style>
main.parent {
  width: 100%;
  height: 100%;
}
</style>
