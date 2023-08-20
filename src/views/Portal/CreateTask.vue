<template>
  <div class="create_task">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">
        <span>Add a{{ is_vowel(type_full[0]) ? "n" : "" }}&MediumSpace;</span>
        <select
          title="Task type"
          v-model="task.type"
          class="type_dropdown styled_input styled_select"
          ref="type"
        >
          <option
            class="type_dropdown__option styled_select__option"
            v-for="pair in Object.entries(types)"
            :value="pair[0]"
            :key="pair[0]"
          >
            {{ pair[1] }}
          </option>
        </select>
      </h2>
    </header>
    <div class="overlay_contents">
      <div class="overlay_contents_text">
        <span v-if="is_note">Add a new {{ task.type }} to</span>
        <span v-else>Schedule a new {{ task.type }} for</span>
        your class{{ classes && classes.length == 1 ? "" : "es" }}
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
                class="styled_line_links__link"
                target="_blank"
                v-for="link in task.links"
                :href="link.path"
                :key="link.path"
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
            <button class="styled_links_add__action" @click="add_newlink" :disabled="newlink_ready">
              Add
            </button>
          </div>
        </div>
      </div>
      <div class="overlay_contents_text">
        Choose which classes this {{ task.type }} will be added to
      </div>
      <!-- checkboxes for classes -->
      <div class="checkboxes">
        <div class="checkbox" v-for="class_obj in classes" :key="class_obj.id">
          <input type="checkbox" :id="class_obj.id" :value="class_obj.id" v-model="task_classes" />
          <label v-if="class_obj.period" :for="class_obj.id">
            P{{ class_obj.period }} - {{ class_obj.name }}
          </label>
          <label v-else :for="class_obj.id">{{ class_obj.name }}</label>
        </div>
      </div>
    </div>
    <div class="bottom_actions">
      <button class="close_action" @click="$emit('close')">Close</button>
      <div class="flex_spacer"></div>
      <button
        class="continue_action"
        :class="{ loading_bg: loading }"
        @click="create_task"
        :disabled="
          (!task.name && !is_note) ||
          !task.date ||
          !task_classes.length ||
          (is_note && !task.description)
        "
      >
        Add {{ task.type }}
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
import { ErrorToast } from "@svonk/util";

export default {
  name: "CreateTaskView",
  emits: ["close"],
  data() {
    return {
      task: {
        name: "",
        date: "",
        description: "",
        type: this.$route.params.tasktype ? this.$route.params.tasktype : "task",
      },
      task_classes: [],
      newlink: {
        text: "",
        path: "",
      },
      loading: false,
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
  computed: {
    type_full() {
      return this.get_type(this.task.type);
    },
    newlink_ready() {
      // check if path and text, and also that path is a valid url
      return !this.newlink.path || !this.newlink.text || !this.newlink.path.startsWith("http");
    },
    class_name() {
      if (!this.classes) return null;
      let class_obj = this.classes.find((class_obj) => class_obj.id === this.class_id);
      if (!class_obj) return null;
      return class_obj.name;
    },
    store() {
      return useMainStore();
    },
    classes() {
      return this.store.classes;
    },
    is_note() {
      return this.task.type === "note";
    },
  },
  methods: {
    get_type(type = this.task.type) {
      return this.types[type] || type;
    },
    is_vowel(char) {
      return ["a", "e", "i", "o", "u"].includes(char.toLowerCase());
    },
    add_newlink() {
      if (!this.task.links) this.task.links = [];
      this.task.links.push(this.newlink);
      this.newlink = {
        text: "",
        path: "",
      };
    },
    create_task() {
      this.loading = true;
      this.store
        .create_task(this.task, this.task_classes)
        .then(() => {
          this.$emit("close");
        })
        .catch((err) => {
          this.loading = false;
          _statuslog(`📃 Couldn't create ${this.task.type || "task"}:`, err);
          new ErrorToast("Couldn't create task", err, 2000);
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
</style>
