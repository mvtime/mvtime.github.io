<template>
  <div class="overlay_center_view overlay_slot__wrapper" :class="{ animate_out: animating_out }">
    <div class="overlay_close" @click="closable ? close() : null" :closable="closable"></div>

    <component v-if="component" class="overlay_slot" :is="component" @close="close" />
    <slot v-else class="overlay_slot" :close="close" />
  </div>
</template>

<script>
export default {
  name: "OverlayWrapper",
  emits: ["close"],
  props: {
    component: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      animating_out: false,
    };
  },
  computed: {
    closable() {
      return this.$route?.meta?.block_close !== true;
    },
  },
  methods: {
    close() {
      // animate out with scale for 0.25s, then emit close
      this.animating_out = true;
      setTimeout(() => {
        window.onbeforeunload = null;
        this.$emit("close");
      }, 250);
    },
  },
};
</script>

<style></style>
