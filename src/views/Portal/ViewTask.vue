<template>
  <main class="viewtask">
    <header class="modal_header">
      <h2 class="modal_header_title">View {{ task.type ? task.type : "task" }} details</h2>
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
      <div class="flex-spacer"></div>
      <button class="continue_action" @click="$router.push('/portal')">Close</button>
    </div>
  </main>
</template>
<script>
import { WarningToast, ErrorToast, SuccessToast } from "@svonk/util";

export default {
  data() {
    return {};
  },
  computed: {
    task() {
      let task = this.$route?.query?.task;
      task = task ? JSON.parse(task) : {};
      if (task?.links) {
        // filter any links without text or path
        task.links = task.links.filter((link) => link.text && link.path);
      } else {
        task.links = null;
      }
      return task;
    },
  },
  created() {
    // do route checking
    if (!this.task) {
      new WarningToast("No task specified", 1000);
      this.$router.push("/portal");
    }
  },
  methods: {
    share_task() {
      if (navigator.share) {
        navigator
          .share({
            title: this.task.name,
            text: this.task.description,
            url: window.location.href,
          })
          .then(() => new SuccessToast("Opened share dialog", 1000))
          .catch((error) => console.log("Error sharing", error));
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        new WarningToast("Sharing not supported, copied link to clipboard", 1000);
      } else {
        new ErrorToast("Sharing not supported", 1000);
      }
    },
  },
};
</script>
<style scoped>
.spaced_contents {
  margin-top: 0;
}
.links_obj {
  padding: calc(((var(--height-overlay-input) - 18px) / 2) - var(--margin-overlay-link));
  padding-left: var(--padding-overlay-input);
}
.styled_line_links {
  display: flex;
  flex-flow: row wrap;
  flex-grow: 1;
  overflow: hidden;
}
.styled_line_links__link {
  display: block;
  padding: 0 var(--padding-overlay-link);
  height: var(--height-overlay-link);
  line-height: var(--height-overlay-link);
  background-color: var(--color-overlay-link);
  margin: var(--margin-overlay-link);
  border-radius: var(--radius-overlay-link);
  /* overflow */
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  /* layout */
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
}
.styled_line_links__link:hover {
  background-color: var(--color-overlay-link-hover);
}
</style>
