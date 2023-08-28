<template>
  <main class="addclass">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">Add a Class</h2>
    </header>
    <div class="overlay_contents">
      <div class="overlay_contents_text">
        <span v-if="is_join">Joining from your teacher's class code</span>
        <span v-else>Join a new class</span>
      </div>
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
            P{{ class_obj.period }} - {{ class_obj.name }}
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
        <span v-if="is_join"
          >If you're having trouble, ask your teacher to share their class code again using the
          <span class="button_pointer_text">Share</span> button on the class edit page
        </span>
        <span v-else>Enter your teacher's email above to see their classes</span>
      </div>
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
import { _statuslog } from "../../common";
import { ErrorToast, WarningToast, SuccessToast } from "@svonk/util";
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
    // if ref is provided, set email and class_id
    this.use_ref();
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
    is_join() {
      return this.$route?.name == "joinclass" || this.$route?.name == "codeclass";
    },
  },
  methods: {
    async add_class() {
      this.adding = true;
      this.store
        .add_class(this.teacher_email, this.class_id, this.class_obj.name, this.class_obj.period)
        .then(() => {
          this.$emit("close");
          return Promise.resolve();
        })
        .catch(() => {
          this.adding = false;
          return Promise.reject();
        });
    },
    async use_ref() {
      let ref = this.$route.params?.ref;
      if (!ref && this.$route.params?.code) {
        try {
          ref = await this.store.ref_from_code(this.$route.params?.code);
        } catch (err) {
          new ErrorToast("Invalid join code", err, 4000);
          _statuslog("🔥 " + err);
          this.to_normal_add();
        }
      }

      if (ref && this.is_join) {
        _statuslog("🔍 Attempting to use class join ref", ref);
        let [_email, _id] = ref.split("~");
        _email += "@mvla.net";
        this.teacher_email = _email;
        this.store.fetch_classes_by_email(_email);
        while (this.store.loaded_email !== _email) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        let found =
          this.store.loaded_classes &&
          this.store.loaded_classes.find((class_obj) => class_obj.id === _id);
        if (found) {
          if (found.is_joined) {
            new WarningToast("You've already joined that class", 3000);
            _statuslog("🔥 Already joined class", ref);
            this.$emit("close");
          } else {
            this.class_id = _id;
            this.add_class()
              .then(() => {
                new SuccessToast("Successfully joined class", 2000);
                _statuslog("🎉 Successfully joined class", ref);
              })
              .catch((err) => {
                new ErrorToast("Something went wrong joining that class", err, 3000);
                _statuslog("🔥 Couldn't join class from ref", ref);
                this.to_normal_add();
              });
          }
        } else {
          new WarningToast("Couldn't find that class", 3000);
          _statuslog("🔥 Unfound class for join ref", ref);
          this.to_normal_add();
        }
      } else {
        new WarningToast("Please provide a join code", 3000);
        this.to_normal_add();
      }
    },
    to_normal_add() {
      this.$router.push({ name: "addclass" });
    },
  },
};
</script>

<style></style>
