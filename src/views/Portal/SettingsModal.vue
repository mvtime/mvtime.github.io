<template>
  <div class="settings">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">Account Preferences</h2>
    </header>
    <div class="overlay_contents">
      <div class="overlay_contents_text">
        To link a personal (non-mvla.net) account to access MVTT when not signed into your school
        account, click "Add" below!
      </div>
      <div class="inputs_row"></div>
      <div class="overlay_contents_text">
        To change your theme, use the
        <span class="button_pointer_text button_pointer_icon">
          <div class="theme_icon"></div>
          Switch Theme
        </span>
        button on the left sidebar
      </div>
    </div>
    <div class="bottom_actions">
      <button class="back_action" @click="$emit('close')">
        {{ changed ? "Cancel" : "Close" }}
      </button>
      <div class="flex_spacer"></div>
      <button class="continue_action" :disabled="!changed" @click="save">Save</button>
    </div>
  </div>
</template>

<script>
import { useMainStore } from "@/store";
export default {
  name: "SettingsModal",
  emits: ["close"],
  data() {
    return {
      changed: false,
    };
  },
  computed: {
    store() {
      return useMainStore();
    },
  },
  methods: {
    save() {
      // save contents
      this.$emit("close");
    },
  },
};
</script>

<style></style>
