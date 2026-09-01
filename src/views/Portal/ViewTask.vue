<template>
  <main class="viewtask">
    <header class="modal_header" ref="title">
      <h2 class="header_style modal_header_title">
        View {{ task && task.type ? task.type : "task" }} details
      </h2>
    </header>
    <div ref="contents" class="overlay_contents">
      <div v-if="ready" ref="text_contents">
        <div class="spaced_contents">
          <div class="styled_obj">
            <span class="styled_line__label">Class:</span>
            <span class="styled_line__separator"></span>
            <span class="styled_line__value">
              <a
                class="class_name button_pointer_text"
                :href="`/view/${class_share_ref}`"
                @click="
                  $event.preventDefault();
                  $router.push({
                    name: 'viewclass',
                    params: { ref: class_share_ref },
                    query: $route.query,
                  });
                "
                :style="{
                  '--color-class': task._class.color,
                  '--color-class-alt': task._class.color + '2d',
                }"
                >{{ $store.class_text(task._class) }}</a
              >
            </span>
          </div>
          <div class="styled_obj" v-if="task.type != 'note'">
            <span class="styled_line__label">Name:</span>
            <span class="styled_line__separator"></span>
            <span class="styled_line__value">{{ task.name }}</span>
          </div>
          <div class="styled_obj">
            <span class="styled_line__label">Date:</span>
            <span class="styled_line__separator"></span>
            <span class="styled_line__value">{{ date }}</span>
          </div>
          <div class="styled_obj" v-if="task.description || task.type == 'note'">
            <span class="styled_line__label"
              >{{ task.type == "note" ? "Contents" : "Description" }}:</span
            >
            <span class="styled_line__separator"></span>
            <span
              class="styled_line__value md md_contents"
              v-html="task.description ? text : 'Not Provided'"
            ></span>
          </div>
          <div class="styled_obj links_obj" v-if="task.links && task.links.length">
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

          <div class="styled_obj" v-if="note && task.type != 'note'">
            <span class="styled_line__label">Your Notes:</span>
            <span class="styled_line__separator"></span>
            <span class="styled_line__value md md_contents" v-html="note || 'None Yet'"></span>
          </div>
        </div>
        <div class="overlay_contents_text" v-if="task.archived">
          This {{ task.type || "task" }} is archived and hidden from the calendar.
        </div>
        <div class="overlay_contents_text">
          Information is provided by teachers and volunteer students, and may not always be correct
        </div>
      </div>
      <img ref="loading_contents" alt="Loading Icon" class="loading_icon" v-else />
    </div>
    <div class="bottom_actions">
      <button class="close_action click_escape" @click="$emit('close')">Close</button>
      <div class="flex_spacer"></div>
      <button
        class="notes_action primary_styled"
        v-if="
          ($route.name != 'viewtask' || !$store.is_teacher) &&
          $store.user &&
          task &&
          task.type != 'note'
        "
        @click="notes_task"
      >
        Notes
      </button>
      <button
        class="edit_action primary_styled"
        v-if="
          ($route.name == 'viewtask' || $route.name == 'publicviewtask') &&
          can_manage_task &&
          task &&
          !task.archived
        "
        @click="edit_task"
      >
        Edit
      </button>
      <button
        class="edit_action primary_styled"
        v-if="
          ($route.name == 'viewtask' || $route.name == 'publicviewtask') &&
          can_manage_task &&
          task &&
          task.archived
        "
        @click="unarchive_task"
      >
        Unarchive
      </button>
      <button class="share_action" @click="share_task" :disabled="!ready">Share</button>
    </div>
  </main>
</template>
<script>
/**
 * Displays the details of a task and allows the teacher to edit it, or any user to share it (as JSON in the URI).
 *
 * @module ViewTaskView
 * @description Modal that displays the details of a task and allows the teacher to edit it.
 * @requires module:store/MainStore
 * @emits {Function} close - An event emitted when the modal is closed.
 */

import { WarningToast, ErrorToast } from "@svonk/util";
import { compatDateObj } from "@/common";
import { shareUrl } from "@/common/share";
import smoothReflow from "vue-smooth-reflow";
import showdown from "showdown";
import "@/assets/style/markdown.css";
let converter = new showdown.Converter();
export default {
  name: "ViewTaskView",
  emits: ["close", "notes"],
  mixins: [smoothReflow],
  data() {
    return {
      task: null,
      ready: false,
    };
  },
  computed: {
    date() {
      let date = compatDateObj(this.task?.date);
      if (isNaN(date.getTime())) return;
      // read it as being in the current timezone
      date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

      return new Date(date).toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    },
    text() {
      return (
        (this.task.description && converter.makeHtml(this.task.description)) ||
        this.task.description
      );
    },
    note() {
      if (!this.$store.user) return;
      const ref = this.$route?.params?.ref;
      if (!this.task || !ref) return;
      const note = this.$store.note_for(ref);
      return note && converter.makeHtml(note);
    },
    share_ref() {
      return this.task?._share_ref || this.$route.params.ref;
    },
    class_share_ref() {
      return this.task?._class?._share_ref || this.task?._class?.ref || this.$route.params.ref;
    },
    task_class_obj() {
      if (this.task?._class) return this.task._class;
      const classId = this.task?.class_id;
      if (!classId || !this.$store.classes) return null;
      return (
        this.$store.classes.find(
          (c) =>
            c.id === classId ||
            c._class_id === classId ||
            (typeof c.id === "string" && c.id.endsWith("/" + classId))
        ) || null
      );
    },
    can_manage_task() {
      return !!(this.$store.user && this.$store.can_manage_class(this.task_class_obj));
    },
  },
  mounted() {
    if (this.$route.name == "viewtask" || this.$route.name == "publicviewtask") {
      this.$smoothReflow({
        el: this.$refs.contents,
        hideOverflow: true,
        childTransitions: true,
      });
      this.$smoothReflow({
        el: this.$refs.title,
        hideOverflow: true,
      });
    }
    this.get_task();
  },
  methods: {
    /** Shares the task link with the native share function, or to the clipboard if sharing is not supported */
    async share_task() {
      let url = new URL(
        `https://${this.$env.VUE_APP_BRAND_DOMAIN__VIEWTASK}/` + this.share_ref
      );
      return shareUrl({
        title: this.task.name,
        text: this.task.description,
        url: url.href,
        status: this.$status,
        shareErrorMessage: "Error sharing",
      });
    },
    edit_task() {
      this.$router.push({
        name: "edit",
        params: {
          ref: this.share_ref,
        },
        query: this.$route.query,
      });
    },
    unarchive_task() {
      this.$router.push({
        name: "unarchive",
        params: {
          type: this.task.type,
          ref: this.share_ref,
        },
        query: {
          title: this.task.type === "note" ? this.task.description : this.task.name,
          ...this.$route.query,
        },
      });
    },
    notes_task() {
      if (this.$route.name == "viewtask" || this.$route.name == "publicviewtask") {
        this.$router.push({
          name: "notes",
          params: {
            ref: this.share_ref,
          },
          query: this.$route.query,
        });
      } else {
        this.$emit("notes", this.task);
      }
    },
    async get_task() {
      // get task ref from route params
      if (!this.$route.params.ref) {
        new WarningToast("No task specified", 1500);
        this.$emit("close");
        return;
      }
      const ref = this.$route.params.ref;
      // get task from store (dual-read accepts classId~taskId and email-prefixed forms)
      this.$store
        .task_from_ref(ref)
        .then((task) => {
          if (!task) {
            new WarningToast("Couldn't find that task", 2000);
            this.$emit("close");
          } else {
            this.task = task;
            this.ready = true;
          }
        })
        .catch((err) => {
          new ErrorToast("Error getting task", err, 1500);
          this.$status.error("⚠ Error getting task", err);
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
.class_name {
  line-height: 1em;
}
</style>
