<template>
  <main class="createclass">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">Create a Class</h2>
    </header>
    <div class="overlay_contents">
      <div class="overlay_contents_text">Let's create a new class</div>
      <ClassFields
        v-model:period="class_obj.period"
        v-model:name="class_obj.name"
        v-model:color="class_obj.color"
        @submit="create_class"
      />
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

import ClassFields from "@/components/Portal/ClassFields.vue";

export default {
  name: "CreateClassView",
  components: { ClassFields },
  emits: ["close"],
  data() {
    return {
      class_obj: {
        name: "",
        period: null,
        description: "",
        color: `#${process.env.VUE_APP_THEME_COLOR}`,
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
