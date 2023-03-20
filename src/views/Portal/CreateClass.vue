<template>
  <main class="createclass">
    <header class="modal_header">
      <h2 class="modal_header_title">Create a Class</h2>
    </header>
    <div class="overlay_contents">
      <div class="overlay_contents_text">Let's create a new class</div>
      <div class="inputs_row">
        <input v-model="class_obj.name" class="styled_input" type="text" placeholder="Class Name" />
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
      <button class="close_action" @click="$router.push('/portal')">Close</button>
      <div class="flex-spacer"></div>
      <button
        class="continue_action"
        @click="store.create_class(class_obj)"
        :disabled="!class_obj.name"
      >
        Create Class
      </button>
    </div>
  </main>
</template>

<script>
import { useMainStore } from "@/store";
export default {
  name: "AddClassView",
  data() {
    return {
      class_obj: {
        name: "",
        description: "",
        color: "#f5c14b",
      },
    };
  },
  computed: {
    store() {
      return useMainStore();
    },
  },
};
</script>

<style scoped>
.inputs_row {
  flex-flow: row wrap;
  margin-bottom: 0;
}

.color_input_container {
  margin-right: 0;
  padding: 0;
  width: var(--height-overlay-input);
  height: var(--height-overlay-input);
  flex-grow: 0;
  flex-shrink: 0;
  overflow: hidden;
  filter: var(--filter-calendar-test);
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
.class_description {
  margin-right: 0;
  margin-top: calc(var(--padding-overlay) / 2);
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
