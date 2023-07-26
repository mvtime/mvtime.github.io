<template>
  <main class="onboardng" ref="modal"></main>
</template>

<script>
import { useMainStore } from "@/store";
import "@/views/Portal/overlay.css";
export default {
  data() {
    return {};
  },
  computed: {
    store() {
      return useMainStore();
    },
  },
};
</script>

<style></style>
