<template>
  <div class="create_task">
    <header class="modal_header" ref="title">
      <h2 class="header_style modal_header_title">Edit {{ task.type || "task" }} details</h2>
    </header>
    <div class="overlay_contents" ref="contents">
      <div v-if="ready">
        <div class="overlay_contents_text change_text">
          Change the details of your {{ task.type || "task"
          }}{{ original.name ? ` "${original.name}"` : "" }} in
          <span
            class="class_name button_pointer_text"
            :style="{
              '--color-class': class_obj.color,
              '--color-class-alt': class_obj.color + '2d',
            }"
            >{{ `P${class_obj.period} - ${class_obj.name}` }}</span
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
          />
          <input
            type="date"
            class="styled_input input_task__date"
            v-model="task.date"
            :style="{ maxWidth: is_note ? '100%' : null }"
          />
          <div class="flex-break"></div>
          <textarea
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
            <div class="styled_links_add">
              <input
                class="styled_links_add__path"
                type="url"
                v-model="newlink.path"
                placeholder="Link URL (http://example.com)"
              />
              <input
                class="styled_links_add__text"
                type="text"
                v-model="newlink.text"
                placeholder="Link Text (what students see)"
              />
              <button
                class="styled_links_add__action"
                @click="add_newlink"
                :disabled="newlink_ready"
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
      <button class="close_action" @click="$emit('close')">Cancel</button>
      <div class="flex_spacer"></div>
      <button
        class="delete_action primary_styled"
        @click="delete_task"
        :disabled="!ready || loading"
      >
        Delete
      </button>
      <button
        class="continue_action"
        :class="{ loading_bg: loading }"
        @click="update_task"
        :disabled="
          !changed || (!task.name && !is_note) || !task.date || (is_note && !task.description)
        "
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

import { useMainStore } from "@/store";
import { _statuslog } from "@/common";
import { ErrorToast, WarningToast } from "@svonk/util";
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
      types: {
        note: "Note",
        task: "Assignment",
        // socratic: "Socratic Seminar",
        test: "Test",
        // summative: "Summative Assignment",
        // midterm: "Midterm",
        project: "Project",
        quiz: "Quiz",
        exam: "Exam",
      },
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
    type_full() {
      return this.types[this.task.type] || this.task.type || "Task";
    },
    newlink_ready() {
      // check if path and text, and also that path is a valid url
      return !this.newlink.path || !this.newlink.text || !this.newlink.path.startsWith("http");
    },
    class_obj() {
      let classes = this.store?.classes;
      if (!classes) return null;
      return classes.find((class_obj) => class_obj.id === this.original.class_id) || {};
    },
    store() {
      return useMainStore();
    },
    is_note() {
      return this.task.type === "note";
    },
    changed() {
      return JSON.stringify(this.task) !== JSON.stringify(this.original);
    },
    date() {
      let date = new Date(this.task?.date);
      if (isNaN(date.getTime())) return;
      // read it as being in the current timezone
      date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

      return new Date(date).toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    },
  },
  methods: {
    add_newlink() {
      if (!this.task.links) this.task.links = [];
      // add protocol if missing
      this.newlink.path = this.newlink.path.startsWith("http")
        ? this.newlink.path
        : "https://" + this.newlink.path;
      this.task.links.push(this.newlink);
      this.newlink = {
        text: "",
        path: "",
      };
    },
    async update_task() {
      this.loading = true;
      this.store
        .update_task(this.task.ref, this.task)
        .then(() => {
          // this.$emit("close");
          // redirect to view
          this.$router.push({
            name: "viewtask",
            params: {
              type: this.task.type,
              ref: this.$route.params.ref,
            },
          });
        })
        .catch((err) => {
          this.loading = false;
          _statuslog(`📃 Couldn't create ${this.task.type || "task"}:`, err);
          new ErrorToast("Couldn't create task", err, 2000);
        });
    },
    delete_task() {
      this.$router.push({
        name: "delete",
        params: {
          type: this.task.type,
          ref: this.$route.params.ref,
        },
        query: {
          title: this.is_note ? this.task.description : this.task.name,
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
      this.store
        .task_from_ref(ref)
        .then((task) => {
          if (!task) {
            new WarningToast("Couldn't find that task", 2000);
            _statuslog("⚠ Couldn't find task");
            this.$emit("close");
          } else {
            this.task = task;
            this.original = { ...task };
            this.ready = true;
            this.loading = false;
          }
        })
        .catch((err) => {
          new ErrorToast("Error getting task", 1500);
          _statuslog("⚠ Error getting task", err);
          this.$emit("close");
        });
    },
    remove_link(link) {
      this.task.links = this.task.links.filter((l) => l.path !== link.path);
      this.newlink = link;
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
.styled_input.task_description {
  margin: calc(var(--padding-overlay) / 2) 0;
  padding-top: 10px;
  padding-bottom: 10px;
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
.spaced_contents {
  margin-top: 0;
}
.loading_icon {
  max-height: 150px;
  min-width: 100%;
}
</style>
