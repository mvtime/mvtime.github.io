<template>
  <main class="modal" ref="modal">
    <header class="modal_header" v-if="title">
      <h2 class="modal_header_title">{{ title }}</h2>
    </header>
    <div class="overlay_contents" v-if="content || html">
      <component :is="content" />
      <div class="overlay_contents__html" v-if="html" v-html="html"></div>
    </div>
    <div class="bottom_actions">
      <div class="progress_display" v-if="progress && progress.total > 1">
        <span
          class="progress_display__dot_container"
          v-for="i in progress.total"
          :key="i"
          @click="$emit('open', i - 1)"
        >
          <span
            class="progress_display__dot"
            :class="{ dot_active: i == progress.current, dot_finished: i < progress.current }"
          ></span>
        </span>
      </div>
      <div class="flex_spacer"></div>
      <button class="continue_action" @click="continue_action" :disabled="!can_continue">
        {{ button_text }}
      </button>
    </div>
  </main>
</template>

<script>
/**
 * @file Modal.vue
 * @displayName Modal
 * @description A modal view that displays title, content, progress and a continue action.
 * @property {String} title - The title of the modal.
 * @property {Object} content - A component to display in the modal.
 * @property {String} html - HTML to display in the modal, if content is not provided.
 * @property {Boolean} can_continue - Whether the continue action is enabled.
 * @property {Function} continue_action - The action to perform when the continue button is clicked.
 * @property {Object} progress - An object with current and total properties, to display progress.
 * @property {Boolean} is_notification - Whether the modal is a notification, and should not be closed.
 * @property {String} submit_text - The text to display on the continue button.
 *  */
import { _statuslog } from "../common";
import smoothHeight from "vue-smooth-height";
import router from "../router";
export default {
  name: "ModalVue",
  mixins: [smoothHeight],
  mounted() {
    this.$smoothElement({
      el: this.$refs.modal,
    });
  },
  emits: ["open"],
  props: {
    title: {
      type: String,
      default: "",
      required: false,
    },
    content: {
      type: Object,
      default: null,
      required: false,
    },
    html: {
      type: String,
      default: null,
      required: false,
    },
    can_continue: {
      type: Boolean,
      required: true,
    },
    continue_action: {
      type: Function,
      default: () => {
        _statuslog("ModalVue: continue_action not provided");
        // close this modal view
        window.onbeforeunload = null;
        router.push("/portal");
      },
      required: false,
    },
    progress: {
      type: Object,
      default: null,
      required: false,
    },
    is_notification: {
      type: Boolean,
      default: false,
      required: false,
    },
    submit_text: {
      type: String,
      required: false,
    },
  },
  computed: {
    button_text() {
      if (this.submit_text) {
        return this.submit_text;
      } else if (this.is_notification) {
        return "Ok";
      } else if (this.progress && this.progress.current == this.progress.total) {
        return "Finish";
      } else {
        return "Continue";
      }
    },
  },
};
</script>

<style scoped>
.modal:first-child.overlay_contents {
  border-top: none;
}
.progress_display {
  /* layout */
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  /* interaction */
  user-select: none;
  /* sizing */
  height: var(--size-modal-progress);
}
.progress_display span {
  display: block;
}
.progress_display__dot_container {
  padding: var(--margin-modal-progress-dot);
}
.progress_display__dot {
  /* sizing */
  width: var(--size-modal-progress-dot);
  height: var(--size-modal-progress-dot);
  border-radius: 50%;
  /* appearance */
  background-color: var(--color-modal-progress-dot);
}
.progress_display__dot.dot_active {
  background-color: var(--color-modal-progress-dot-active);
}
.progress_display__dot.dot_finished {
  transform: scale(0.75);
  opacity: 0.6;
}
</style>
