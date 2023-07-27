<template>
  <main class="onboardng" ref="modal">
    <div class="overlay_contents_wrapper nopad">
      <img class="modal_art_part contrast_small_dark" v-lazy="source" />
      <div class="overlay_contents"></div>
    </div>
    <div class="bottom_actions">
      <button class="close_action" @click="$emit('close')">Close</button>
      <div class="flex_spacer"></div>
      <button class="continue_action" disabled="">Continue to Sign-Up</button>
    </div>
  </main>
</template>

<script>
import { useMainStore } from "@/store";
import "@/views/Portal/overlay.css";
export default {
  emits: ["close"],
  data() {
    return {};
  },
  computed: {
    store() {
      return useMainStore();
    },
    source() {
      try {
        return require(`@/assets/img/art/working/${this.combo}.png`);
      } catch (e) {
        return "err";
      }
    },
    combo() {
      let stored = localStorage.getItem("home_art");
      let stored_variant = stored ? stored.split("s")[1][0] : null;

      return "ls" + stored_variant;
    },
  },
};
</script>

<style>
.overlay_contents {
  border: none;
}
.bottom_actions {
  border-top: solid var(--thickness-overlay-border) var(--color-overlay-border);
}
.overlay_contents_wrapper {
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  max-height: 100%;
}
.modal_art_part {
  height: 400px;
  width: 270px;
  object-fit: scale-down;
  object-position: bottom left;
}
</style>
