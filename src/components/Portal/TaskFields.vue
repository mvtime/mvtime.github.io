<template>
  <div class="task_fields_inputs">
    <input
      v-if="!isNote"
      :value="name"
      class="styled_input"
      type="text"
      :placeholder="typeFull + ' Name'"
      :disabled="isNote"
      enterkeyhint="next"
      @input="$emit('update:name', $event.target.value)"
      @keydown.enter="focusDate"
    />
    <input
      ref="date"
      type="date"
      class="styled_input input_task__date"
      :value="date"
      :style="{ maxWidth: isNote ? '100%' : null }"
      enterkeyhint="next"
      @input="$emit('update:date', $event.target.value)"
      @keydown.enter="focusDescription"
    />
    <div class="flex-break"></div>
    <textarea
      ref="description"
      :value="description"
      class="styled_input styled_textarea task_description"
      type="text"
      :placeholder="typeFull + (isNote ? ' Contents' : ' Description (Optional)')"
      @input="$emit('update:description', $event.target.value)"
    >
    </textarea>
  </div>
</template>

<script>
/**
 * Shared task name / date / description fields for CreateTask and EditTask.
 * Type select + repetition stay in Create; series scope stays in Edit.
 * Does NOT add type-on-edit.
 *
 * @module TaskFields
 */
export default {
  name: "TaskFields",
  props: {
    name: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    typeFull: {
      type: String,
      default: "Task",
    },
    isNote: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:name", "update:date", "update:description"],
  methods: {
    focusDate() {
      this.$refs.date?.focus();
    },
    focusDescription() {
      this.$refs.description?.focus();
    },
  },
};
</script>

<style scoped>
.task_fields_inputs {
  display: contents;
}
.styled_input.input_task__date {
  margin-right: 0;
  max-width: 150px;
}
</style>
