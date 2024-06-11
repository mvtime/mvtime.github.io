<template>
  <div class="edit_task">
    <header class="modal_header" ref="title">
      <h2 class="header_style modal_header_title">Edit {{ task.type || "task" }} details</h2>
    </header>
    <div class="overlay_contents" ref="contents">
      <div v-if="ready">
        <div class="overlay_contents_text change_text">
          Change the details of your {{ task.type || "task"
          }}{{ original.name ? ` "${original.name}"` : "" }} in
          <a
            class="class_name button_pointer_text"
            :href="`/view/${task._class.ref}`"
            @click="
              $event.preventDefault();
              $router.push({
                name: 'viewclass',
                params: { ref: task._class.ref },
                query: $route.query,
              });
            "
            :style="{
              '--color-class': class_obj.color,
              '--color-class-alt': class_obj.color + '2d',
            }"
            >{{ $store.class_text(class_obj) }}</a
          >
        </div>
        <div class="inputs_row">
          <input
            v-if="!is_note"
            v-model="task.name"
            class="styled_input"
            type="text"
            :placeholder="type_full + ' Name'"
            :disabled="is_note"
            enterkeyhint="next"
            @keydown.enter="$refs.date.focus()"
          />
          <input
            type="date"
            class="styled_input input_task__date"
            v-model="task.date"
            :style="{ maxWidth: is_note ? '100%' : null }"
            enterkeyhint="next"
            @keydown.enter="$refs.description.focus()"
          />
          <div class="flex-break"></div>
          <textarea
            ref="description"
            v-model="task.description"
            class="styled_input styled_textarea task_description"
            type="text"
            :placeholder="type_full + (is_note ? ' Contents' : ' Description (Optional)')"
          >
          </textarea>
          <div class="flex-break"></div>
          <div class="styled_input styled_links_box">
            <div class="styled_links_display">
              <span v-if="!task.links || !task.links.length" class="placeholder"
                >{{ type_full }} Links (Optional)</span
              >
              <div v-else class="styled_line_links">
                <a
                  class="styled_line_links__link styled_line_links__remove"
                  target="_blank"
                  v-for="link in task.links"
                  :key="link.path"
                  @click="remove_link(link)"
                  >{{ link.text }}</a
                >
              </div>
            </div>
            <hr class="styled_links_separator" />
            <div
              class="styled_links_add"
              @keydown.enter="
                $event.preventDefault();
                add_newlink();
              "
              enterkeyhint="done"
            >
              <input
                class="styled_links_add__path"
                type="url"
                v-model="newlink.path"
                @blur="fix_newlink_path"
                placeholder="Link URL (http://example.com)"
                enterkeyhint="done"
              />
              <div class="magic_wrapper styled_links_add__sized">
                <input
                  class="styled_links_add__text"
                  type="text"
                  v-model="newlink.text"
                  placeholder="Link Text (what students see)"
                  enterkeyhint="done"
                />
                <div
                  class="magic magic_in styled_magic alt_bg click-action"
                  :class="{ magic_out: !path_ready, loading_bg: loading_text }"
                  :disabled="!path_ready || loading_text"
                  @click="magic_text"
                  title="Auto-generate link text"
                ></div>
              </div>
              <button
                class="styled_links_add__action"
                @click="add_newlink"
                :disabled="newlink_not_ready"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <img alt="Loading Icon" class="loading_icon" v-else />
    </div>
    <div class="bottom_actions">
      <button class="close_action click_escape" @click="$emit('close')">Cancel</button>
      <div class="flex_spacer"></div>
      <button
        class="archive_action primary_styled"
        @click="archive_task"
        :disabled="!ready || loading"
      >
        Archive
      </button>
      <button
        class="continue_action click_ctrlenter"
        :class="{ loading_bg: loading }"
        @click="try_submit"
        :disabled="not_submittable"
      >
        Save {{ task.type || "task" }}
      </button>
    </div>
  </div>
</template>

<script>
/**
 * Creates a new task for the teacher's selected class(es).
 *
 * @module CreateTaskView
 * @description Modal that allows teacher's to create a new task for their classes.
 * @param {string} tasktype - The type of task to create (task, project, test, etc.) Provided by the router.
 * @requires module:store/MainStore
 * @emits {Function} close - An event emitted when the task is created or the modal is closed.
 */

import { compatDateObj } from "@/common";
import { ErrorToast, WarningToast, SuccessToast } from "@svonk/util";
import smoothReflow from "vue-smooth-reflow";

export default {
  name: "EditTaskView",
  emits: ["close"],
  mixins: [smoothReflow],
  data() {
    return {
      task: {},
      original: {},
      newlink: {
        text: "",
        path: "",
      },
      ready: false,
      loading: true,
      loading_text: false,
      loaded_text: false,
    };
  },
  mounted() {
    this.$smoothReflow({
      el: this.$refs.contents,
      childTransitions: true,
    });
    this.$smoothReflow({
      el: this.$refs.title,
      hideOverflow: true,
    });
    this.get_task();
  },
  computed: {
    not_submittable() {
      return (
        !this.changed ||
        (!this.task.name && !this.is_note) ||
        !this.task.date ||
        (this.is_note && !this.task.description)
      );
    },
    type_full() {
      return this.$magic?.type_full(this.task.type) || "Task";
    },
    newlink_not_ready() {
      // check if path and text, and also that path is a valid url
      return !this.newlink.path || !this.newlink.text || !this.newlink.path.startsWith("http");
    },
    class_obj() {
      let classes = this.$store?.classes;
      if (!classes) return null;
      return classes.find((class_obj) => class_obj.id === this.original.class_id) || {};
    },
    is_note() {
      return this.task.type === "note";
    },
    changed() {
      return JSON.stringify(this.task) !== JSON.stringify(this.original);
    },
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
    path_ready() {
      return (
        !this.loaded_text &&
        this.newlink.path &&
        this.newlink_not_ready &&
        this.newlink.path.startsWith("https://")
      );
    },
  },
  watch: {
    "newlink.path"(new_path, old_path) {
      if (new_path != old_path) {
        this.loaded_text = false;
      }
    },
    "newlink.text"(new_text, old_text) {
      if (new_text != old_text) {
        this.loaded_text = false;
      }
    },
  },
  methods: {
    try_submit() {
      if (!this.not_submittable) {
        this.update_task();
      } else if (!this.changed) {
        new WarningToast("No changes to submit", 1000);
      } else {
        new WarningToast("Please fill out all required fields", 1000);
      }
    },
    add_newlink() {
      if (!this.task.links) this.task.links = [];
      // add protocol if missing
      this.newlink.path = new URL(this.newlink.path).href;
      this.task.links.push(this.newlink);
      this.task.links = [...new Set(this.task.links)];
      this.newlink = {
        text: "",
        path: "",
      };
    },
    async update_task() {
      if (!this.newlink_not_ready) {
        new WarningToast("Don't forget to to click the 'Add' button to add your link!", 2000);
        return;
      }
      this.loading = true;
      this.$store
        .update_task(this.task.ref, this.task)
        .then(() => {
          // this.$emit("close");
          // redirect to view
          this.$router.push({
            name: "viewtask",
            params: {
              ref: this.$route.params.ref,
            },
            query: this.$route.query,
          });
        })
        .catch((err) => {
          this.loading = false;
          this.$status.error(`📃 Couldn't save changes to ${this.task.type || "task"}:`, err);
          new ErrorToast(`Couldn't edit ${this.task.type || "task"}`, err, 2000);
        });
    },
    archive_task() {
      this.$router.push({
        name: "archive",
        params: {
          type: this.task.type,
          ref: this.$route.params.ref,
        },
        query: {
          title: this.is_note ? this.task.description : this.task.name,
          ...this.$route.query,
        },
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
      this.$store
        .task_from_ref(ref)
        .then((task) => {
          if (!task) {
            new WarningToast("Couldn't find that task", 2000);
            this.$status.warn("⚠ Couldn't find task");
            this.$emit("close");
          } else {
            this.task = task;
            // set original to be unconnected copy of task
            this.original = JSON.parse(JSON.stringify(task));
            this.ready = true;
            this.loading = false;
          }
        })
        .catch((err) => {
          new ErrorToast("Error getting task", err, 1500);
          this.$status.error("⚠ Error getting task", err);
          this.$emit("close");
        });
    },
    remove_link(link) {
      this.task.links = this.task.links.filter((l) => l.path !== link.path);
      this.newlink = link;
    },
    fix_newlink_path() {
      if (this.newlink.path && this.newlink.path.includes(".")) {
        try {
          this.newlink.path = new URL(this.newlink.path).href;
        } catch (err) {
          // add protocol if missing
          this.newlink.path = "https://" + this.newlink.path;
          this.fix_newlink_path();
        }
      }
    },
    async magic_text() {
      if (!this.path_ready || this.newlink.text) return;
      this.loading_text = true;
      this.$magic
        .text(this.newlink.path)
        .then((text) => {
          if (text) {
            new SuccessToast(`Generated link text '${text}'`, 1500);
            this.$status.log("🔗 Generated link text:", text);
            this.newlink.text = text;
          } else {
            new WarningToast("Couldn't reasonably infer link text", 2000);
            this.$status.warn("📃 Couldn't generate link text");
          }
          this.loaded_text = true;
          this.loading_text = false;
        })
        .catch((err) => {
          new ErrorToast("Couldn't generate link text", err, 3000);
          this.$status.error("⚠ Failed link text generation:", err);
          this.loaded_text = false;
          this.loading_text = false;
        });
    },
  },
};
</script>

<style scoped>
.checkboxes {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  margin-top: 0.5rem;
}
.checkbox {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-top: 0.5rem;
}
.checkbox label {
  padding-left: 0.5rem;
  user-select: none;
  cursor: pointer;
}
.input_task__date {
  max-width: 150px;
}
.inputs_row {
  flex-flow: row wrap;
}
.input_task__date {
  margin-right: 0;
}
.styled_input.input_task__date {
  margin-right: 0;
}
select.type_dropdown {
  padding: 5px;
  background-color: var(--color-overlay-input);
  color: var(--color-on-overlay-input);
  border: none;
  border-radius: var(--radius-overlay-input);
  width: auto;
}
.type_dropdown__option {
  font-size: 14px;
}
.loading_icon {
  max-height: 150px;
  min-width: 100%;
}
</style>
