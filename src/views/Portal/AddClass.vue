<template>
  <main class="addclass">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">{{ !is_join ? "Add a" : "Join" }} Class</h2>
    </header>
    <div class="overlay_contents" ref="contents">
      <div class="overlay_contents_text">
        <span v-if="is_join"
          >{{ store.loaded_email == teacher_email ? "Loaded" : "Loading" }} from your teacher's
          class {{ code ? "code" : "ref" }}</span
        >
        <span v-else
          >Join a class with your teacher's details or
          <span
            class="click-action button_pointer_text"
            @click="$router.push({ name: 'codeenterclass', query: $route.query })"
            >enter a class code</span
          >
        </span>
      </div>
      <div class="inputs_row" v-if="!is_join">
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
            :disabled="class_obj.is_joined && !adding"
          >
            <span v-if="class_obj.is_joined && !adding">[JOINED]</span>
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
      <div class="inputs_row" v-else>
        <div
          id="code_ref"
          class="styled_input"
          :class="{ code: code, ref: $route.params.ref }"
          type="text"
          placeholder="Join Code / Reference"
        >
          {{ code || $route.params.ref || "" }}
        </div>
      </div>
      <div class="overlay_contents_text" v-if="class_obj">
        {{
          class_obj && class_obj.is_joined && !adding
            ? "You've already joined"
            : "You'll be joining"
        }}
        <a
          class="class_name button_pointer_text"
          :href="`/view/${cleaned_ref}`"
          @click="
            $event.preventDefault();
            $router.push({ name: 'viewclass', params: { ref: cleaned_ref }, query: $route.query });
          "
          :style="{
            '--color-class': class_obj.color,
            '--color-class-alt': class_obj.color + '2d',
          }"
          >{{ `P${class_obj.period} - ${class_obj.name}` }}</a
        >
      </div>
      <div v-if="class_obj" class="overlay_contents_text">
        <br />
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
      <button class="close_action click_escape" @click="$emit('close')">Close</button>
      <div class="flex_spacer"></div>
      <button
        class="continue_action"
        @click="add_class"
        :disabled="!teacher_email || !class_id || (class_obj && class_obj.is_joined && !adding)"
        :class="{
          loading_bg: adding || (is_join && loading),
          alt_bg: !teacher_email || !class_id || (class_obj && class_obj.is_joined && !adding),
        }"
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
import { _status } from "@/common";
import { ErrorToast, WarningToast /*SuccessToast*/ } from "@svonk/util";
import smoothReflow from "vue-smooth-reflow";
export default {
  name: "AddClassView",
  emits: ["close"],
  mixins: [smoothReflow],
  data() {
    return {
      teacher_email: "",
      class_id: "",
      adding: false,
    };
  },
  mounted() {
    this.$smoothReflow({
      el: this.$refs.contents,
      childTransitions: true,
    });
    if (this.$refs.teacher_email) {
      this.$refs.teacher_email.focus();
    }
    // if ref is provided, set email and class_id
    this.use_ref();
    if (
      !this.is_join &&
      this.store.loaded_email &&
      this.store.get_loaded_classes.some((class_obj) => !class_obj.is_joined)
    ) {
      this.teacher_email = this.store.loaded_email;
    }
  },
  computed: {
    class_obj() {
      if (!this.classes) return false;
      return this.classes.find((class_obj) => class_obj.id === this.class_id) || false;
    },
    cleaned_ref() {
      return this.store.path_to_ref(this.teacher_email, this.class_id);
    },
    loading() {
      return this.store.loaded_email !== this.teacher_email;
    },
    classes() {
      if (!this.teacher_email) {
        return null;
      } else if (this.teacher_email === this.store.loaded_email) {
        return this.store.get_loaded_classes;
      }
      // commit store fetch_classes_by_email with teacher_email
      this.store.fetch_classes_by_email(this.teacher_email);

      return null;
    },
    store() {
      return useMainStore();
    },
    is_join() {
      return this.$route?.name == "refclass" || this.$route?.name == "codeclass";
    },
    code() {
      return this.$route?.params?.code && this.$route.params?.code.toLowerCase();
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
      if (!ref && this.code) {
        try {
          ref = await this.store.ref_from_code(this.code);
        } catch (err) {
          new ErrorToast("Invalid join code", err, 4000);
          _status.log("🔥 " + err);
          if (this.$route?.query?.manual) {
            this.$router.push({ name: "codeenterclass", query: this.$route.query });
          } else {
            this.to_normal_add();
          }
          return;
        }
      }

      if (ref && this.is_join) {
        _status.log("🔍 Attempting to use class join ref", ref);
        let [_email, _id] = ref.split("~");
        _email += this.store.ORG_DOMAIN;
        this.teacher_email = _email;
        this.store.fetch_classes_by_email(_email);
        while (this.store.loaded_email !== this.teacher_email) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        let found = this.store?.get_loaded_classes?.find((class_obj) => class_obj.id === _id);
        if (found) {
          this.class_id = _id;
          if (found.is_joined) {
            new WarningToast("You've already joined this class", 3000);
            _status.log("🔥 Already joined class", ref);
            //this.$emit("close");
          }
        } else {
          new WarningToast("Couldn't find that class", 3000);
          _status.log("🔥 Unfound class for join ref", ref);
          this.to_normal_add();
        }
      } else if (this.is_join) {
        new WarningToast("Please provide a join code", 3000);
        this.to_normal_add();
      }
    },
    to_normal_add() {
      this.$router.push({ name: "addclass", query: this.$route.query });
    },
  },
};
</script>

<style>
#code_ref {
  text-align: center;
  font-weight: 600;
  height: auto;
  padding: var(--padding-overlay-input);
}
#code_ref.code {
  font-size: 4em;
}
#code_ref.ref {
  font-size: 1.25em;
}
</style>
