<template>
  <main class="viewtask">
    <header class="modal_header" ref="title">
      <h2 class="header_style modal_header_title">
        View {{ task && task.type ? task.type : "task" }} details
      </h2>
    </header>
    <div ref="contents" class="overlay_contents">
      <div v-if="ready">
        <div class="spaced_contents">
          <div class="styled_obj">
            <span class="styled_line__label">Class:</span>
            <span class="styled_line__separator"></span>
            <span class="styled_line__value">{{ task.group || task.class_name }}</span>
          </div>
          <div class="styled_obj" v-if="task.type != 'note'">
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
            <span class="styled_line__label"
              >{{ task.type == "note" ? "Contents" : "Description" }}:</span
            >
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
                :href="`/to/${encodeURIComponent(task_link.path)}`"
                >{{ task_link.text }}</a
              >
            </span>
          </div>
        </div>
        <div class="overlay_contents_text">
          Information is provided by teachers and volunteer students, and may not always be correct
        </div>
      </div>
      <img alt="Loading Icon" class="loading_icon" v-else />
    </div>
    <div class="bottom_actions">
      <button class="share_action" @click="share_task">Share</button>
      <div class="flex_spacer"></div>
      <button
        class="delete_action primary_styled"
        v-if="
          store.is_teacher &&
          store.user &&
          task &&
          task.ref.split('/')[0] == store.user.email.replace('@mvla.net', '')
        "
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
import smoothReflow from "vue-smooth-reflow";
export default {
  name: "ViewTaskView",
  emits: ["close"],
  mixins: [smoothReflow],
  data() {
    return {
      task: null,
      ready: false,
    };
  },
  computed: {
    store() {
      return useMainStore();
    },
  },
  mounted() {
    this.$smoothReflow({
      el: this.$refs.contents,
      hideOverflow: true,
      childTransitions: true,
    });
    this.$smoothReflow({
      el: this.$refs.title,
      hideOverflow: true,
    });
    this.get_task();
  },
  methods: {
    /** Shares the task as JSON in the URI, or copies the URI to the clipboard if sharing is not supported */
    async share_task() {
      if (navigator.share) {
        let url = new URL(window.location.href);
        // fix url for prod
        url.host = "mvtt.app";
        url.port = "";
        url.protocol = "https";

        navigator
          .share({
            title: this.task.name,
            text: this.task.description,
            url: url.href,
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
      let name = this.task.name ? ` "${this.task.name}"` : "";
      this.store
        .delete_task(this.task.ref)
        .then(() => {
          new SuccessToast(`Removed ${this.task.type}${name}`, 3000);
          this.$emit("close");
        })
        .catch((err) => {
          new ErrorToast(`Error removing ${this.task.type}${name}`, 3000);
          _statuslog("⚠ Error removing task", err);
        });
    },
    async get_task() {
      // get task ref from route params
      const ref = this.$route.params.ref.split("~").join("/");
      if (!ref) {
        new WarningToast("No task specified", 1500);
        this.$emit("close");
      } else if (ref.split("/").length < 3) {
        new WarningToast("Invalid task specified", 1500);
        this.$emit("close");
      }
      // get task from store
      this.store
        .task_from_ref(ref)
        .then((task) => {
          if (!task) {
            new WarningToast("Couldn't find that task", 2000);
            this.$emit("close");
          } else {
            _statuslog("📃 Got task data from ref");
            this.task = task;
            this.ready = true;
          }
        })
        .catch((err) => {
          new ErrorToast("Error getting task", 1500);
          _statuslog("⚠ Error getting task", err);
          this.$emit("close");
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
</style>
