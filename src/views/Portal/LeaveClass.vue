<template>
  <div class="leave_class">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">Confirm class leave</h2>
    </header>
    <div class="overlay_contents overlay_contents_text" ref="contents">
      Are you sure you want to leave
      <span
        class="class_name button_pointer_text"
        :style="{
          '--color-class': class_obj.color,
          '--color-class-alt': class_obj.color + '2d',
        }"
        >{{ `P${class_obj.period} - ${class_obj.name}` }}</span
      >? <br /><br />
      You'll need to use the
      <span class="button_pointer_text">Join Class</span> button in the left sidebar to join it
      again.
    </div>
    <div class="bottom_actions">
      <button class="close_action" @click="$emit('close')">
        {{ ready ? "Cancel" : "Close" }}
      </button>
      <div class="flex_spacer"></div>
      <button
        class="leave_class"
        :class="{ loading_bg: loading }"
        @click="leave_class"
        :disabled="!ready"
      >
        Leave
      </button>
    </div>
  </div>
</template>

<script>
/**
 * @file DeleteTask.vue
 * @description Delete task modal that appears when a user tries to delete a task
 * @module views/Portal/DeleteTask
 */
import smoothReflow from "vue-smooth-reflow";
import { useMainStore } from "@/store";
import { WarningToast } from "@svonk/util";
export default {
  name: "LeaveClass",
  emits: ["close", "clear_filters"],
  mixins: [smoothReflow],
  data() {
    return {
      ready: false,
      loading: false,
      ref: this.$route?.params?.ref,
    };
  },
  computed: {
    store() {
      return useMainStore();
    },
    class_obj() {
      if (!this.ref) return {};
      let classes = this.store?.classes;
      if (!classes || !this.ref) return {};
      return classes.find((class_obj) => class_obj.id === this.ref) || {};
    },
  },
  mounted() {
    this.$smoothReflow({
      el: this.$refs.contents,
      hideOverflow: true,
      childTransitions: true,
    });
    if (!this.ref) {
      new WarningToast("There was no class provided", 2000);
      this.$emit("close");
    } else {
      this.ref = this.ref.split("~").join("/");
      if (this.ref.split("/").length !== 2) {
        new WarningToast("Couldn't find that class", 2000);
        this.$emit("close");
      } else {
        this.ready = true;
      }
    }
  },
  methods: {
    leave_class() {
      this.loading = true;
      this.store
        .remove_class(this.class_obj.id)
        .then(() => {
          this.$emit("clear_filters");
          this.$emit("close");
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.spaced_contents {
  margin-top: 0;
}
.loading_icon {
  max-height: 150px;
  min-width: 100%;
}
.class_name {
  background-color: var(--color-class-alt);
  color: var(--color-class);
  font-weight: 600;
}
</style>