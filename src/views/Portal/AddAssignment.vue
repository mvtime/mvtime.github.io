<template>
  <main class="addassignment">
    <header class="modal_header">
      <h2 class="modal_header_title">Add a Major Assignment</h2>
    </header>
    <div class="overlay_contents">
      <div class="overlay_contents_text">
        Schedule a new assignment for your class{{ classes && classes.length == 1 ? "" : "es" }}
      </div>
      <div class="inputs_row">
        <input v-model="test.name" class="styled_input" type="text" placeholder="Test Name" />
        <input type="date" class="styled_input input_test__date" v-model="test.date" />
        <div class="flex-break"></div>
        <textarea
          v-model="test.description"
          class="styled_input styled_textarea test_description"
          type="text"
          placeholder="Test Description (Optional)"
        >
        </textarea>
      </div>
      <div class="overlay_contents_text">Choose which classes this test will be added to</div>
      <!-- checkboxes for classes -->
      <div class="checkboxes">
        <div class="checkbox" v-for="class_obj in classes" :key="class_obj.id">
          <input type="checkbox" :id="class_obj.id" :value="class_obj.id" v-model="test_classes" />
          <label :for="class_obj.id">{{ class_obj.name.replace("[JOINED] ", "") }}</label>
        </div>
      </div>
    </div>
    <div class="bottom_actions">
      <button class="close_action" @click="$router.push('/portal')">Close</button>
      <div class="flex-spacer"></div>
      <button
        class="continue_action"
        @click="store.add_test(test, test_classes)"
        :disabled="!test.name || !test.date || !test_classes.length"
      >
        Add Test
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
      test: {
        name: "",
        date: "",
        description: "",
        is_assignment: true,
      },
      test_classes: [],
    };
  },
  computed: {
    classes() {
      if (!this?.store?.user?.email) {
        return null;
      } else if (this.store?.user?.email === this.store.loaded_email) {
        return this.store.loaded_classes;
      }
      // commit store get_classes_by_email with teacher_email
      this.store.get_classes_by_email(this.store?.user?.email);

      return null;
    },
    store() {
      return useMainStore();
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
.input_test__date {
  max-width: 150px;
}
.inputs_row {
  flex-flow: row wrap;
}
.input_test__date {
  margin-right: 0;
}
.test_description {
  margin-top: calc(var(--padding-overlay) / 2);
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
