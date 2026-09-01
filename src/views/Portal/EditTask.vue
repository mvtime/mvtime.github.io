<template>
  <div class="edit_task">
    <OverlayWrapper v-if="showArchiveConfirm" @close="showArchiveConfirm = false" v-slot="scope">
      <Modal
        class="confirm_modal router_center_view"
        :can_continue="true"
        title="Archive Tasks"
        :html="archiveConfirmHtml"
        :continue_action="() => confirmArchiveSeries()"
        :skippable="true"
        @skip="scope.close"
        skip_text="Cancel"
        submit_text="Archive"
      />
    </OverlayWrapper>
    <header class="modal_header" ref="title">
      <h2 class="header_style modal_header_title">Edit {{ task.type || "task" }} details</h2>
    </header>
    <div class="overlay_contents" ref="contents">
      <div v-if="ready">
        <div class="overlay_contents_text change_text">
          Change the details of your {{ task.type || "task" }}{{ original.name ? ` "${original.name}"` : "" }} in
          <a
            class="class_name button_pointer_text"
            :href="`/view/${task._class?.ref}`"
            @click="
              $event.preventDefault();
              $router.push({
                name: 'viewclass',
                params: { ref: task._class?.ref },
                query: $route.query,
              });
            "
            :style="{
              '--color-class': class_obj?.color,
              '--color-class-alt': class_obj?.color + '2d',
            }"
            >{{ $store.class_text(class_obj) }}</a
          >
        </div>
        <div class="inputs_row">
          <TaskFields
            v-model:name="task.name"
            v-model:date="task.date"
            v-model:description="task.description"
            :type-full="type_full"
            :is-note="is_note"
          />
          <div class="flex-break"></div>
          <LinkEditor
            ref="linkEditor"
            :links="task.links || []"
            :type-full="type_full"
            mode="edit"
            @update:links="task.links = $event"
          />
        </div>
      </div>
      <img alt="Loading Icon" class="loading_icon" v-else />
    </div>
    <div v-if="task.repetition_group_id" class="warning_text overlay_contents_text">Save changes to this {{ task.type || "task" }} series to</div>
    <div v-if="task.repetition_group_id" class="overlay_contents_text repetition_warning bottom_actions">
      <span class="flex_spacer" style="display: none"></span>
      <button class="scope_button secondary_styled" :class="{ selected: edit_scope == 'this' }" @click="edit_scope = 'this'">This Task</button>
      <button class="scope_button secondary_styled" :class="{ selected: edit_scope == 'future' }" @click="edit_scope = 'future'">This & Future</button>
      <button class="scope_button secondary_styled" :class="{ selected: edit_scope == 'all' }" @click="edit_scope = 'all'">All Tasks</button>
    </div>
    <div class="bottom_actions">
      <button class="close_action click_escape" @click="$emit('close')">Cancel</button>
      <div class="flex_spacer"></div>
      <button class="archive_action primary_styled" :class="{ loading_bg: loading }" @click="archive_task" :disabled="!ready || loading">Archive{{ scope_text }}</button>
      <button class="continue_action click_ctrlenter" :class="{ loading_bg: loading }" @click="try_submit" :disabled="not_submittable">
        Save{{ scope_text }} {{ task.type || "task" }}{{ scope_text ? "s" : "" }}
      </button>
    </div>
  </div>
</template>

<script>
/**
 * Edits an existing task for the teacher's class.
 *
 * @module EditTaskView
 * @description Modal that allows teachers to edit a task, including series scope for repeating tasks.
 * @requires module:store/MainStore
 * @emits {Function} close - An event emitted when the task is updated or the modal is closed.
 */

import { compatDateObj } from "@/common";
import { ErrorToast, WarningToast } from "@svonk/util";
import smoothReflow from "vue-smooth-reflow";
import OverlayWrapper from "@/components/Modal/OverlayWrapper.vue";
import Modal from "@/components/Modal/Modal.vue";
import TaskFields from "@/components/Portal/TaskFields.vue";
import LinkEditor from "@/components/Portal/LinkEditor.vue";

export default {
  name: "EditTaskView",
  emits: ["close"],
  mixins: [smoothReflow],
  components: {
    OverlayWrapper,
    Modal,
    TaskFields,
    LinkEditor,
  },
  data() {
    return {
      task: {},
      original: {},
      ready: false,
      loading: true,
      edit_scope: "this",
      showArchiveConfirm: false,
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
      return !this.changed || (!this.task.name && !this.is_note) || !this.task.date || (this.is_note && !this.task.description);
    },
    type_full() {
      return this.$magic?.type_full(this.task.type) || "Task";
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
    scope_text() {
      if (!this.task.repetition_group_id || this.edit_scope === "this") {
        return "";
      }
      return this.edit_scope === "future" ? " future" : " all";
    },
    archiveConfirmHtml() {
      const scopeText = this.edit_scope === "future" ? "this and all future tasks in the series" : "all tasks in this series";
      return `<div class="overlay_contents_text">Are you sure you want to archive ${scopeText}?<br><br>This action cannot be undone.</div>`;
    },
    class_obj_for_task() {
      if (this.task?._class) return this.task._class;
      const classId = this.original?.class_id || this.task?.class_id;
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
    task_updates() {
      const excluded = new Set(["ref", "id", "_class", "class_obj", "class_id", "color"]);
      const updates = {};
      for (const key of Object.keys(this.task)) {
        if (excluded.has(key)) continue;
        if (JSON.stringify(this.task[key]) !== JSON.stringify(this.original[key])) {
          updates[key] = this.task[key];
        }
      }
      return updates;
    },
    async update_task() {
      if (!this.$refs.linkEditor?.newlink_not_ready) {
        new WarningToast("Don't forget to to click the 'Add' button to add your link!", 2000);
        return;
      }
      this.loading = true;

      let action;
      if (this.edit_scope === "this") {
        action = this.$store.update_task(this.task.ref, this.task);
      } else {
        action = this.$store.update_repeating_task(this.task.repetition_group_id, this.task_updates(), this.edit_scope, this.task.ref, this.task.date);
      }

      action
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
      if (this.edit_scope !== "this" && this.task.repetition_group_id) {
        this.showArchiveConfirm = true;
        return;
      }
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
    confirmArchiveSeries() {
      this.showArchiveConfirm = false;
      this.loading = true;
      this.$store
        .delete_repeating_task(this.task.repetition_group_id, this.edit_scope, this.task.ref, this.task.date)
        .then(() => {
          this.$emit("close");
        })
        .catch((err) => {
          this.loading = false;
          new ErrorToast("Couldn't archive series", err, 2000);
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
            if (!this.$store.can_manage_class(task._class || this.class_obj_for_task)) {
              new WarningToast("You are not a teacher of this class", 2000);
              this.$emit("close");
              return;
            }
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
  },
};
</script>

<style scoped>
.checkboxes {
  display: flex;
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
.inputs_row {
  flex-flow: row wrap;
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
.repetition_warning.bottom_actions {
  display: flex;
  background: var(--color-overlay-input);
  border-radius: 8px;
  margin: 0 var(--padding-overlay);
  padding: var(--radius-overlay-input);
}
.warning_text.overlay_contents_text {
  text-align: center;
  padding-top: 1em;
  padding-bottom: 1em;
}
.scope_button {
  border-radius: 0;
  color: var(--color-on-overlay-action);
  background-color: var(--color-on-overlay-action-disabled);
  flex: 1 0 auto;
}
.scope_button:first-of-type {
  border-top-left-radius: var(--radius-overlay-input);
  border-bottom-left-radius: var(--radius-overlay-input);
  margin-left: 0;
}
.scope_button:last-of-type {
  border-top-right-radius: var(--radius-overlay-input);
  border-bottom-right-radius: var(--radius-overlay-input);
}
</style>
