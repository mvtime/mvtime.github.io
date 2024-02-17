<template>
  <div class="onboarding">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">Welcome to MVTime</h2>
    </header>
    <div class="overlay_contents">
      <div class="overlay_contents_text">{{ name }} Let's get you set up with your first class</div>
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
            <span v-if="class_obj.is_joined">[JOINED]</span>
            {{ store.class_text(class_obj) }}
          </option>
          <option v-if="teacher_email && !classes" value="" disabled hidden selected>
            {{ loading ? "Loading..." : "No classes found" }}
          </option>
          <option v-else value="" disabled hidden selected>
            {{ teacher_email && classes ? "Select a Class" : "-----" }}
          </option>
        </select>
      </div>
      <div class="overlay_contents_text">
        You can add more classes later from the
        <span class="button_pointer_text">Join a Class</span> button on the left sidebar
      </div>
    </div>
    <div class="bottom_actions">
      <button class="back_action click_escape" @click="$emit('close')">Skip</button>
      <div class="flex_spacer"></div>
      <button
        class="continue_action click_ctrlenter"
        @click="add_class"
        :disabled="!teacher_email || !class_id"
      >
        Add Class
      </button>
    </div>
  </div>
</template>

<script>
/**
 * Version of the AddClassView that is shown to new users.
 *
 * @module OnboardingView
 * @description Modal that allows the user to add a class to their dashboard, with some extra intro text.
 * @requires module:store/MainStore
 * @emits {Function} close - An event emitted when the class is added or the modal is closed.
 */
import { useMainStore } from "@/store";
export default {
  name: "OnboardingView",
  emits: ["close"],
  data() {
    return {
      teacher_email: "",
      class_id: "",
      adding: false,
    };
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
    name() {
      let store = this.store;
      if (store.user && store.user.displayName)
        return "Hi " + store.user.displayName.split(" ")[0] + ", ";
      return "";
    },
  },
  mounted() {
    // focus
    this.$refs.teacher_email.focus();
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
