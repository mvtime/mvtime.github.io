<template>
  <div class="inputs_row">
    <div class="class_period_container styled_obj">
      <input
        :value="period"
        class="styled_input class_period"
        type="number"
        min="1"
        max="8"
        step="1"
        placeholder="#"
        @input="$emit('update:period', $event.target.value)"
      />
    </div>
    <input
      :value="name"
      class="styled_input class_name"
      type="text"
      placeholder="Name"
      enterkeyhint="done"
      @input="$emit('update:name', $event.target.value)"
      @keydown.enter="$emit('submit')"
    />
    <ClassColorPicker :modelValue="color" @update:modelValue="$emit('update:color', $event)" />
  </div>
</template>

<script>
/**
 * Shared period + name + color fields for CreateClass / EditClass.
 * Does not include description or links UI.
 *
 * @module ClassFields
 */
import ClassColorPicker from "@/components/Portal/ClassColorPicker.vue";

export default {
  name: "ClassFields",
  components: { ClassColorPicker },
  props: {
    period: {
      type: [Number, String],
      default: null,
    },
    name: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
  },
  emits: ["update:period", "update:name", "update:color", "submit"],
};
</script>

<style scoped>
.inputs_row {
  flex-flow: row wrap;
  margin-bottom: 0;
}

.inputs_row .class_period_container {
  flex-grow: 0;
  flex-basis: calc(var(--height-overlay-input) * 1.5);
  background: var(--color-overlay-input);
  padding-right: 0;
}
.inputs_row .class_period_container .class_period {
  padding: 0;
  padding-right: calc(var(--padding-overlay-input) / 2);
}
.inputs_row .class_period_container::before {
  content: "P";
}

.inputs_row .class_name {
  flex-grow: 3;
}
</style>
