<template>
  <main class="onboarding">
    <header class="modal_header">
      <h2 class="modal_header_title">Welcome to MVTime</h2>
    </header>
    <div class="overlay_contents">
      <div class="overlay_contents_text">{{ name }} let's get you set up with your first class</div>
      <div class="inputs_row">
        <input
          v-model="teacher_email"
          class="styled_input"
          type="text"
          placeholder="Teacher's Email"
        />
        <select v-model="class_id" class="styled_input">
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
      <div class="overlay_contents_text">
        Type your teacher's email above, and you'll see a list of their classes
      </div>
    </div>
    <div class="bottom_actions">
      <button class="back_action" @click="$router.push('/portal')">Skip</button>
      <div class="flex-spacer"></div>
      <button
        class="continue_action"
        @click="store.add_class(teacher_email, class_id, class_name)"
        :disabled="!teacher_email || !class_id"
      >
        Continue
      </button>
    </div>
  </main>
</template>

<script>
import { useMainStore } from "@/store";
export default {
  name: "OnboardingView",
  data() {
    return {
      teacher_email: "",
      class_id: "",
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
      if (!this.teacher_email) {
        return null;
      } else if (this.teacher_email === this.store.loaded_email) {
        return this.store.loaded_classes;
      }
      // commit store get_classes_by_email with teacher_email
      this.store.get_classes_by_email(this.teacher_email);

      return null;
    },
    store() {
      return useMainStore();
    },
    name() {
      let store = this.store;
      if (store.user && store.user.displayName)
        return "Hi " + store.user.displayName.split(" ")[0] + ", ";
      return "";
    },
  },
};
</script>

<style></style>
