<template>
  <Modal
    ref="modal"
    :title="page.title"
    :content="page.content"
    :html="page.content ? null : page.html"
    :is_notification="page.is_notification"
    :submit_text="page.submit_text"
    :progress="{ current: page_index + 1, total: pages.length }"
    :show_progress="true"
    :can_continue="can_continue"
    :continue_action="next_page"
    :load="load_data"
    :skippable="skippable"
    @open="switch_to"
    @update="curr_data = $event"
    @status="curr_done = $event"
    @skip="$emit('skip')"
  ></Modal>
</template>

<script>
/**
 * @file ModalFromPages.vue
 * @displayName Modal from Pages
 * @description A modal view that displays a series of pages as a modal with progression.
 * @property {Array} pages - An array of page objects, each with a title (String) and content (Component) or html (String), and most importantly a @update and @status emit.
 * @emits {Array} finish - Emitted when the user has finished all pages, with an array of responses from each page.
 */
function confirm_unfinished() {
  // message irrelevant for most browsers, but nice to have
  return "You haven't finished the task yet, and might lose progress. Are you sure you want to close the tab?";
}
import ModalVue from "./Modal.vue";
export default {
  name: "ModalFromPages",
  emits: ["finish", "skip"],
  components: {
    Modal: ModalVue,
  },
  props: {
    pages: {
      type: Array,
      required: true,
    },
    skippable: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      page_index: 0,
      responses: [],
      curr_data: null,
      curr_done: false,
      page_start: Date.now(),
      shortcuts: [
        {
          key: "ArrowLeft",
          description: "Go to the previous modal page",
        },
        {
          key: "ArrowRight",
          description: "Go to the next modal page",
        },
      ],
    };
  },
  computed: {
    load_data() {
      // return saved data, or empty object
      this.set_done();
      return this.responses[this.page_index]?.data || {};
    },
    page() {
      if (this.pages.length == 0) {
        return {
          title: "No pages provided",
          content: null,
          html: null,
          is_notification: true,
          submit_text: "Oops!",
        };
      }
      return this.pages[this.page_index];
    },
    can_continue() {
      // either no content or has updated with @status of true
      return !this.page.content || this.page.is_notification || this.curr_done;
    },
  },
  mounted() {
    window.addEventListener("keydown", this.arrow);
    this.$shortcuts.register_all(this.shortcuts, "Modal");
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.arrow);
    this.$shortcuts.remove_tag("Modal");
  },
  methods: {
    set_done() {
      this.curr_done = this.responses[this.page_index]?.done || false;
    },
    arrow(event) {
      // catch arrow keys to switch pages
      if (event.key == "ArrowLeft") {
        this.switch_to(this.page_index - 1);
      } else if (event.key == "ArrowRight") {
        this.switch_to(this.page_index + 1);
      }
    },
    switch_to(page_index) {
      // switch to page at index, as long as it is before the current, or already completed
      if (
        page_index <= this.page_index ||
        Object.prototype.hasOwnProperty.call(this.responses, Math.max(page_index - 1, 0))
      ) {
        this.page_index = page_index;
      } else {
        this.$status.log(`⏵ ModalFromPages: page index ${page_index} invalid`);
      }
    },
    next_page() {
      // get responses from current component and add to responses array
      this.responses[this.page_index] = {
        data: this.curr_data,
        done: this.curr_done || !this.page.content || this.page.is_notification,
        time: {
          start: this.page_start,
          duration: Date.now() - this.page_start,
        },
      };
      if (this.can_continue && this.page_index < this.pages.length - 1) {
        // add unload listener to prevent accidental closing if previous page is 1st
        if (this.page_index == 0) {
          window.onbeforeunload = confirm_unfinished;
        }

        // switch to next page
        this.page_index++;
      } else if (this.can_continue) {
        // emit responses
        this.$emit("finish", this.responses);
        // leave the rest up to the parent component
      }
    },
  },
  watch: {
    page_index() {
      // reset page details when changing pages
      this.page_start = Date.now();
      this.curr_data = this.load_data;
      this.set_done();
    },
  },
};
</script>

<style scoped></style>
