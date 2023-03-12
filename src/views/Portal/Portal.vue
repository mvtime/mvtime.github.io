<template>
  <main class="portal">
    <LeftBar />
    <div class="portal_content">
      <!-- top  -->
      <!-- calendar -->
    </div>
    <RightBar />
  </main>
</template>

<script>
import LeftBar from "@/components/Portal/LeftBar.vue";
import RightBar from "@/components/Portal/RightBar.vue";
export default {
  name: "AppPortal",
  components: {
    LeftBar,
    RightBar,
  },
};
</script>

<style scoped>
main.portal {
  background-color: var(--color-secondary);
  /* sizing */
  width: 100%;
  height: 100%;
  /* display */
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
main.portal .portal_sidebar {
  box-shadow: var(--shadow-highlight);
  flex-basis: 300px;
  flex-grow: 0;
  flex-shrink: 1;
  background-color: var(--color-bg);
  position: relative;
  box-sizing: border-box;
  padding: var(--padding-sidebar);
}
</style>
