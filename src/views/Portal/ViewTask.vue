<template>
  <main class="viewtask">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">
        View {{ task.type ? task.type : "task" }} details
      </h2>
    </header>
    <div class="overlay_contents">
      <div class="spaced_contents">
        <div class="styled_obj">
          <span class="styled_line__label">Class:</span>
          <span class="styled_line__separator"></span>
          <span class="styled_line__value">{{ task.group || task.class_name }}</span>
        </div>
        <div class="styled_obj">
          <span class="styled_line__label">Name:</span>
          <span class="styled_line__separator"></span>
          <span class="styled_line__value">{{ task.name }}</span>
        </div>
        <div class="styled_obj">
          <span class="styled_line__label">Date:</span>
          <span class="styled_line__separator"></span>
          <span class="styled_line__value">{{
            new Date(task.date).toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })
          }}</span>
        </div>
        <div class="styled_obj">
          <span class="styled_line__label">Description:</span>
          <span class="styled_line__separator"></span>
          <span
            class="styled_line__value"
            v-html="task.description ? task.description : 'Not Provided'"
          ></span>
        </div>
        <div class="styled_obj links_obj" v-if="task.links">
          <span class="styled_line__label">Links:</span>
          <span class="styled_line__separator"></span>
          <span class="styled_line__value styled_line_links">
            <a
              class="styled_line_links__link"
              v-for="task_link in task.links"
              target="_blank"
              :key="task_link.path"
              :href="task_link.path"
              >{{ task_link.text }}</a
            >
          </span>
        </div>
      </div>
      <div class="overlay_contents_text">
        Information is provided by teachers and volunteer students, and may not always be correct
      </div>
    </div>
    <div class="bottom_actions">
      <button class="share_action" @click="share_task">Share</button>
      <div class="flex_spacer"></div>
      <button
        class="delete_action primary_styled"
        v-if="store.is_teacher && store.user && task.ref.split('/')[0] == store.user.email"
        @click="delete_task"
      >
        Delete
      </button>
      <button class="continue_action" @click="$emit('close')">Close</button>
    </div>
  </main>
</template>
<script>
/**
 * Displays the details of a task and allows the teacher to delete it, or any user to share it (as JSON in the URI).
 *
 * @module ViewTaskView
 * @description Modal that displays the details of a task and allows the teacher to delete it.
 * @requires module:store/MainStore
 * @emits {Function} close - An event emitted when the modal is closed.
 */

import { WarningToast, ErrorToast, SuccessToast } from "@svonk/util";
import { _statuslog } from "@/common";
import { useMainStore } from "@/store";
export default {
  name: "ViewTaskView",
  emits: ["close"],
  computed: {
    /** The task to display */
    task() {
      let task = this.$route?.query?.task;
      task = task ? JSON.parse(task) : {};
      if (task?.links) {
        task.links = task.links.filter((link) => link.text && link.path);
      } else {
        task.links = null;
      }
      return task;
    },
    store() {
      return useMainStore();
    },
  },
  /** If no task is specified at creation, close the modal */
  created() {
    if (!this.task) {
      new WarningToast("No task specified", 1000);
      this.$emit("close");
    }
  },
  methods: {
    /** Shares the task as JSON in the URI, or copies the URI to the clipboard if sharing is not supported */
    async share_task() {
      if (navigator.share) {
        navigator
          .share({
            title: this.task.name,
            text: this.task.description,
            url: window.location.href,
          })
          .then(() => new SuccessToast("Opened share dialog", 1000))
          .catch((err) => _statuslog("Error sharing", err));
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        new WarningToast("Sharing not supported, copied link to clipboard", 2000);
      } else {
        new ErrorToast("Sharing not supported", 2000);
      }
    },
    async delete_task() {
      this.store
        .delete_task(this.task.ref)
        .then(() => {
          new SuccessToast(`Removed ${this.task.type} "${this.task.name}"`, 3000);
          this.$emit("close");
        })
        .catch((err) => {
          new ErrorToast(`Error removing ${this.task.type} "${this.task.name}"`, 3000);
          _statuslog("⚠ Error removing task", err);
        });
    },
  },
};
</script>
<style scoped>
.spaced_contents {
  margin-top: 0;
}
</style>
