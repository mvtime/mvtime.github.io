<template>
  <div class="edit_task">
    <header class="modal_header" ref="title">
      <h2 class="header_style modal_header_title">
        {{ original_note ? "Update" : "Add" }} {{ task.type || "task" }} notes
      </h2>
    </header>
    <div class="overlay_contents" ref="contents">
      <div v-if="ready">
        <div class="overlay_contents_text change_text">
          Save your notes for "{{ task.name }}" in
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
              '--color-class': task._class.color,
              '--color-class-alt': task._class.color + '2d',
            }"
            >{{ `P${task._class.period} - ${task._class.name}` }}</a
          >
        </div>
        <div class="inputs_row">
          <textarea
            v-model="note"
            class="styled_input styled_textarea task_note"
            type="text"
            :placeholder="'Your ' + type_full + ' Notes (Optional)'"
          >
          </textarea>
        </div>
      </div>
      <img alt="Loading Icon" class="loading_icon" v-else />
    </div>
    <div class="bottom_actions">
      <button
        class="back_action click_escape"
        :class="{ loading_bg: loading }"
        v-if="ready"
        :disabled="loading"
        @click="back"
      >
        View
      </button>
      <button v-else class="close_action click_escape" @click="$emit('close')">Close</button>
      <div class="flex_spacer"></div>
      <button
        class="continue_action click_ctrlenter"
        :class="{ loading_bg: loading }"
        @click="try_submit"
        :disabled="not_submittable"
      >
        {{ original_note ? "Update" : "Add" }}
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
import { useMagic } from "@/store/magic";
import { _status } from "@/common";
import { ErrorToast, WarningToast, SuccessToast } from "@svonk/util";
import smoothReflow from "vue-smooth-reflow";

export default {
  name: "EditTaskView",
  emits: ["close"],
  mixins: [smoothReflow],
  data() {
    return {
      task: {},
      original_note: "",
      note: "",
      ready: false,
      loading: true,
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
      return !this.changed;
    },
    type_full() {
      return useMagic()?.types[this.task.type] || this.task.type || "Task";
    },
    store() {
      return useMainStore();
    },
    changed() {
      return this.original_note !== this.note;
    },
  },
  methods: {
    try_submit() {
      if (!this.not_submittable) {
        this.update_note();
      } else {
        new WarningToast("No changes to save", 1000);
      }
    },
    back() {
      this.$router.push({
        name: "viewtask",
        params: {
          ref: this.$route.params.ref,
        },
        query: this.$route.query,
      });
    },
    async update_note() {
      this.loading = true;
      this.store
        .set_note(this.note, this.$route.params.ref)
        .then(() => {
          new SuccessToast(
            `${this.original_note ? (this.note ? "Updated" : "Removed") : "Added"} ${
              this.task.type || "task"
            } notes for ${this.task.name}`,
            2000
          );
          this.back();
        })
        .catch((err) => {
          this.loading = false;
          _status.error(`📃 Couldn't edit ${this.task.type || "task"} notes:`, err);
          new ErrorToast(`Couldn't edit ${this.task.type || "task"} notes`, err, 2000);
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
            _status.warn("⚠ Couldn't find task");
            this.$emit("close");
          } else {
            this.task = task;
            this.original = { ...task };
            this.ready = true;
            this.loading = false;
          }
          // get note
          const note = this.store.note_for(this.$route.params.ref);
          if (note) {
            this.note = note;
            this.original_note = note;
          }
        })
        .catch((err) => {
          new ErrorToast("Error getting task", err, 1500);
          _status.error("⚠ Error getting task", err);
          this.$emit("close");
        });
    },
  },
};
</script>

<style scoped>
.inputs_row {
  margin-bottom: 0;
}
.styled_input.task_note {
  padding-top: 10px;
  padding-bottom: 10px;
}
.loading_icon {
  max-height: 150px;
  min-width: 100%;
}
</style>
