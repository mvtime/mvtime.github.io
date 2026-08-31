<template>
  <div class="color_input_container styled_input" title="Class Theme Color">
    <input
      :value="modelValue"
      class="color_input"
      type="color"
      placeholder="Class Color"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
/**
 * Native color input used by CreateClass / EditClass, with shared scoped CSS.
 *
 * @module ClassColorPicker
 */
export default {
  name: "ClassColorPicker",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
};
</script>

<style scoped>
.color_input_container {
  margin-right: 0;
  padding: 0;
  width: var(--height-overlay-input);
  flex-basis: var(--height-overlay-input);
  height: var(--height-overlay-input);
  flex-grow: 0;
  flex-shrink: 0;
  overflow: hidden;
  filter: var(--filter-calendar-task);
}
.color_input_container .color_input {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  border: none;
  border-radius: 0;
  transform: scale(2);
}
</style>
