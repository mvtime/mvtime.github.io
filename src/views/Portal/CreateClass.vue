<template>
  <main class="createclass">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">Create a Class</h2>
    </header>
    <div class="overlay_contents">
      <div class="overlay_contents_text">Let's create a new class</div>
      <div class="inputs_row">
        <div class="class_period_container styled_obj">
          <input
            v-model="class_obj.period"
            class="styled_input class_period"
            type="number"
            min="1"
            max="8"
            step="1"
            placeholder="#"
          />
        </div>
        <input
          v-model="class_obj.name"
          class="styled_input class_name"
          type="text"
          placeholder="Name"
        />
        <div class="color_input_container styled_input" title="Class Theme Color">
          <input
            v-model="class_obj.color"
            class="color_input"
            type="color"
            placeholder="Class Color"
          />
        </div>
      </div>
    </div>
    <div class="bottom_actions">
      <button class="close_action click_escape" @click="$emit('close')">Close</button>
      <div class="flex_spacer"></div>
      <button class="continue_action" @click="create_class" :disabled="!class_obj.name">
        Create Class
      </button>
    </div>
  </main>
</template>

<script>
/**
 * Component for creating a class if the user is a teacher.
 *
 * @module CreateClassView
 * @description Modal that allows the user to create a class if they are a teacher.
 * @requires module:store/MainStore
 * @emits {Function} close - An event emitted when the class is created or the modal is closed.
 */

export default {
  name: "AddClassView",
  emits: ["close"],
  data() {
    return {
      class_obj: {
        name: "",
        period: null,
        description: "",
        color: "#f5c14b",
      },
    };
  },
  methods: {
    create_class() {
      this.$store.create_class(this.class_obj).then(() => {
        this.$emit("close");
      });
    },
  },
};
</script>

<style scoped>
.inputs_row {
  flex-flow: row wrap;
  margin-bottom: 0;
}

.inputs_row .color_input_container {
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
.inputs_row .color_input_container .color_input {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  border: none;
  border-radius: 0;
  transform: scale(2);
}
.inputs_row .class_description {
  margin-right: 0;
  margin-top: calc(var(--padding-overlay) / 2);
  padding-top: 10px;
  padding-bottom: 10px;
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
