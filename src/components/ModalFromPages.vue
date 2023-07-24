<template>
  <Modal
    @open="switch_to"
    :title="page.title"
    :content="page.content"
    :html="page.content ? null : page.html"
    :is_notification="page.is_notification"
    :submit_text="page.submit_text"
    :progress="{
      current: page_index + 1,
      total: pages.length,
    }"
    :can_continue="can_continue"
    :continue_action="next_page"
    :show_progress="true"
  ></Modal>
</template>

<script>
/**
 * @file ModalFromPages.vue
 * @displayName Modal from Pages
 * @description A modal view that displays a series of pages as a modal with progression.
 * @property {Array} pages - An array of page objects, each with a title (String) and content (Component) or html (String), and most importantly a getData() method.
 * @emits {Array} finish - Emitted when the user has finished all pages, with an array of responses from each page.
 */
window.onbeforeunload = confirm_unfinished;
function confirm_unfinished() {
  // message irrelevant for most browsers, but nice to have
  return "You haven't finished the task yet, and might lose progress. Are you sure you want to close the tab?";
}
import ModalVue from "@/components/Modal.vue";
import { _statuslog } from "@/common";
export default {
  name: "ModalFromPages",
  emits: ["finish"],
  components: {
    Modal: ModalVue,
  },
  props: {
    pages: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      page_index: 0,
      responses: [],
    };
  },
  computed: {
    page() {
      if (this.pages.length == 0) {
        return {
          title: "No pages provided",
          content: null,
          html: null,
          is_notification: true,
        };
      }
      return this.pages[this.page_index];
    },
    can_continue() {
      // check if content component has a can_continue method
      if (this.page.content && this.page.content.can_continue) {
        return this.page.content.can_continue();
      } else {
        return true;
      }
    },
  },
  methods: {
    switch_to(page_index) {
      _statuslog(`ModalFromPages: switching to page ${page_index}`);
      // switch to page at index, as long as it is before the current, or already completed
      if (page_index <= this.page_index) {
        this.page_index = page_index;
      } else if (
        // check that the previous response is not empty, can be null
        Object.prototype.hasOwnProperty.call(this.responses, Math.max(page_index - 1, 0))
      ) {
        this.page_index = page_index;
      } else {
        _statuslog(
          `ModalFromPages: page index ${page_index} invalid, must be before current page index ${this.page_index} or the first incomplete page`
        );
      }
    },
    next_page() {
      // get responses from current component and add to responses array
      if (this.can_continue && this.page) {
        if (this.page.content && this.page.content.getData) {
          this.responses[this.page_index] = this.page.content.getData();
        } else {
          this.responses[this.page_index] = null;
          _statuslog(
            `ModalFromPages: page "${this.page.title}" content does not have getData() method`
          );
        }
      }
      if (this.can_continue && this.page_index < this.pages.length - 1) {
        // switch to next page
        this.page_index++;
      } else if (this.can_continue) {
        // emit responses
        this.$emit("finish", this.responses);
        // leave the rest up to the parent component
      }
    },
  },
};
</script>

<style scoped></style>
