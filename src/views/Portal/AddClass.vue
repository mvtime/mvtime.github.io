<template>
  <main class="addclass">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">Add a Class</h2>
    </header>
    <div class="overlay_contents">
      <div class="overlay_contents_text">Join a new class</div>
      <div class="inputs_row">
        <input
          v-model="teacher_email"
          ref="teacher_email"
          class="styled_input"
          type="text"
          placeholder="Teacher's Email"
        />
        <select
          v-model="class_id"
          class="styled_input"
          :disabled="!classes || !classes.length"
          :class="{ loading_bg: loading && teacher_email }"
        >
          <option
            v-for="class_obj in classes"
            :value="class_obj.id"
            :key="class_obj.id"
            :disabled="class_obj.is_joined"
          >
            {{ class_obj.name }}
          </option>
          <option v-if="teacher_email && !classes" value="" disabled hidden selected>
            {{ loading ? "Loading..." : "No classes found" }}
          </option>
          <option v-else value="" disabled hidden selected>
            {{ teacher_email && classes ? "Select a Class" : "" }}
          </option>
        </select>
      </div>
      <div class="overlay_contents_text">Enter your teacher's email above to see their classes</div>
    </div>
    <div class="bottom_actions">
      <button class="close_action" @click="$emit('close')">Close</button>
      <div class="flex_spacer"></div>
      <button
        class="continue_action"
        @click="add_class"
        :disabled="!teacher_email || !class_id"
        :class="{ loading_bg: adding }"
      >
        Add Class
      </button>
    </div>
  </main>
</template>

<script>
/**
 * Component for adding a class to the user's dashboard / ClassList.
 *
 * @module AddClassView
 * @description Modal that allows the user to add a class to their dashboard.
 * @requires module:store/MainStore
 * @emits {Function} close - An event emitted when the class is added or the modal is closed.
 */
import { useMainStore } from "@/store";
export default {
  name: "AddClassView",
  emits: ["close"],
  data() {
    return {
      teacher_email: "",
      class_id: "",
      adding: false,
    };
  },
  mounted() {
    this.$refs.teacher_email.focus();
  },
  computed: {
    class_obj() {
      if (!this.classes) return null;
      return this.classes.find((class_obj) => class_obj.id === this.class_id) || {};
    },
    loading() {
      return this.store.loaded_email !== this.teacher_email;
    },
    classes() {
      if (!this.teacher_email) {
        return null;
      } else if (this.teacher_email === this.store.loaded_email) {
        return this.store.loaded_classes;
      }
      // commit store fetch_classes_by_email with teacher_email
      this.store.fetch_classes_by_email(this.teacher_email);

      return null;
    },
    store() {
      return useMainStore();
    },
  },
  methods: {
    add_class() {
      this.adding = true;
      this.store
        .add_class(this.teacher_email, this.class_id, this.class_obj.name, this.class_obj.period)
        .then(() => {
          this.$emit("close");
        })
        .catch(() => {
          this.adding = false;
        });
    },
  },
};
</script>

<style></style>
