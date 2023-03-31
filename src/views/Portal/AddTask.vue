<template>
  <main class="addtask">
    <header class="modal_header">
      <h2 class="modal_header_title">Add a {{ type_full }}</h2>
    </header>
    <div class="overlay_contents">
      <div class="overlay_contents_text">
        Schedule a new {{ type_full }} for your class{{
          classes && classes.length == 1 ? "" : "es"
        }}
      </div>
      <div class="inputs_row">
        <input v-model="task.name" class="styled_input" type="text" placeholder="Task Name" />
        <input type="date" class="styled_input input_task__date" v-model="task.date" />
        <div class="flex-break"></div>
        <textarea
          v-model="task.description"
          class="styled_input styled_textarea task_description"
          type="text"
          placeholder="task Description (Optional)"
        >
        </textarea>
      </div>
      <div class="overlay_contents_text">
        Choose which classes this {{ task.type }} will be added to
      </div>
      <!-- checkboxes for classes -->
      <div class="checkboxes">
        <div class="checkbox" v-for="class_obj in classes" :key="class_obj.id">
          <input type="checkbox" :id="class_obj.id" :value="class_obj.id" v-model="task_classes" />
          <label :for="class_obj.id">{{ class_obj.name.replace("[JOINED] ", "") }}</label>
        </div>
      </div>
    </div>
    <div class="bottom_actions">
      <button class="close_action" @click="$router.push('/portal')">Close</button>
      <div class="flex-spacer"></div>
      <button
        class="continue_action"
        @click="store.add_task(task, task_classes)"
        :disabled="!task.name || !task.date || !task_classes.length"
      >
        Add task
      </button>
    </div>
  </main>
</template>

<script>
import { useMainStore } from "@/store";
export default {
  name: "AddTaskView",
  data() {
    return {
      task: {
        name: "",
        date: "",
        description: "",
        type: this.$route.params.tasktype ? this.$route.params.tasktype : "task",
      },
      task_classes: [],
    };
  },
  computed: {
    type_full() {
      return {
        socratic: "Socratic Seminar",
        test: "Test",
        summative: "Summative Assignment",
        midterm: "Midterm",
        project: "Project",
        task: "Task",
      }[this.task.type];
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
  margin-top: calc(var(--padding-overlay) / 2);
  padding-top: 10px;
  padding-bottom: 10px;
}
.styled_input.input_task__date {
  margin-right: 0;
}
</style>
