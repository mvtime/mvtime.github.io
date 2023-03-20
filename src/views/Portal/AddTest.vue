<template>
  <main class="addtest">
    <header class="modal_header">
      <h2 class="modal_header_title">Add a Test</h2>
    </header>
    <div class="overlay_contents">
      <div class="overlay_contents_text">
        Schedule a new test for your class{{ classes && classes.length == 1 ? "" : "es" }}
      </div>
      <div class="inputs_row">
        <input v-model="test.name" class="styled_input" type="text" placeholder="Test Name" />
        <input type="date" class="styled_input input_test__date" v-model="test.date" />
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
      },
      test_classes: [],
    };
  },
  computed: {
    class_name() {
      if (!this.classes) return null;
      let class_obj = this.classes.find((class_obj) => class_obj.id === this.class_id);
      if (!class_obj) return null;
      return class_obj.name;
    },
    loading() {
      return this.store.loaded_email !== this.teacher_email;
    },
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
</style>
