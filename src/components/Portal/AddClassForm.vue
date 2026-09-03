<template>
  <div class="add-class-form">
    <div class="overlay_contents" ref="contents">
      <div class="overlay_contents_text">
        <template v-if="variant === 'welcome'">
          {{ welcomeName }}Let's get you set up with your first class
        </template>
        <template v-else-if="is_join">
          <span
            >{{ $store.loaded_email == teacher_email ? "Loaded" : "Loading" }} from your teacher's
            class {{ code ? "code" : "ref" }}</span
          >
        </template>
        <template v-else>
          <span
            >Join a class with your teacher's details or
            <span
              class="click-action button_pointer_text"
              @click="$router.push({ name: 'codeenterclass', query: $route.query })"
              >enter a class code</span
            >
          </span>
        </template>
      </div>
      <div class="inputs_row" v-if="!is_join">
        <input
          v-model="teacher_email"
          ref="teacher_email"
          class="styled_input"
          type="text"
          placeholder="Teacher's Email"
          enterkeyhint="next"
          @keydown.enter="$refs.class_id.focus()"
        />
        <select
          ref="class_id"
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
            {{ $store.class_text(class_obj) }}
          </option>
          <option v-if="teacher_email && !classes" value="" disabled hidden selected>
            {{ loading ? "Loading..." : "No classes found" }}
          </option>
          <option v-else value="" disabled hidden selected>
            {{
              teacher_email &&
              classes &&
              classes.length &&
              teacher_email.endsWith($env.VUE_APP_ORG_DOMAIN)
                ? "Select a Class"
                : ""
            }}
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
          enterkeyhint="send"
          @keydown.enter="add_class"
        >
          {{ code || $route.params.ref || "" }}
        </div>
      </div>
      <div class="overlay_contents_text" v-if="class_obj && variant !== 'welcome'">
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
          >{{ $store.class_text(class_obj) }}</a
        >
      </div>
      <div v-if="class_obj && variant !== 'welcome'" class="overlay_contents_text">
        <br />
      </div>
      <div class="overlay_contents_text">
        <template v-if="variant === 'welcome'">
          You can add more classes later from the
          <span class="button_pointer_text">Join a Class</span> button on the left sidebar
        </template>
        <template v-else-if="is_join">
          <span
            >If you're having trouble, ask your teacher to share their class code again using the
            <span class="button_pointer_text">Share</span> button on the class edit page
          </span>
        </template>
        <template v-else>
          <span>Enter your teacher's email above to see their classes</span>
        </template>
      </div>
    </div>
    <div class="bottom_actions">
      <button
        :class="[dismissClass, 'click_escape']"
        @click="$emit('close')"
      >
        {{ dismissLabel }}
      </button>
      <div class="flex_spacer"></div>
      <button
        class="continue_action"
        :class="[
          variant === 'welcome' ? 'click_ctrlenter' : '',
          {
            loading_bg: adding || (is_join && loading),
            alt_bg: !canSubmit,
          },
        ]"
        @click="add_class"
        :disabled="!canSubmit"
      >
        Add Class
      </button>
    </div>
  </div>
</template>

<script>
/**
 * Shared Add Class / Onboarding enroll form (P4).
 *
 * Owns teacher email + class picker (or join-code display), loading / already-joined
 * state, and submit → store.add_class → enrollClass({ classId }). Flat enroll only —
 * no nested classes/{email}/classes writers.
 *
 * Shells (AddClass.vue, Onboarding.vue) supply modal chrome / welcome framing.
 *
 * @module AddClassForm
 * @see mvtt-server#32 flat planner writers
 */
import { ErrorToast, WarningToast } from "@svonk/util";
import smoothReflow from "vue-smooth-reflow";
import { parseJoinRef } from "@/common/paths";

export default {
  name: "AddClassForm",
  emits: ["close"],
  mixins: [smoothReflow],
  props: {
    /**
     * `add` — full Add Class / join-code modal body.
     * `welcome` — Onboarding framing (same enroll semantics; no join-route UI).
     */
    variant: {
      type: String,
      default: "add",
      validator: (v) => v === "add" || v === "welcome",
    },
    dismissLabel: {
      type: String,
      default: "Close",
    },
    dismissClass: {
      type: String,
      default: "close_action",
    },
  },
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
    // Join-code / ref routes only apply to the add variant
    if (this.variant === "add") {
      this.use_ref();
    }
    if (
      !this.is_join &&
      this.$store.loaded_email &&
      this.$store.get_loaded_classes.some((class_obj) => !class_obj.is_joined)
    ) {
      this.teacher_email = this.$store.loaded_email;
    }
  },
  computed: {
    class_obj() {
      if (!this.classes) return false;
      return this.classes.find((class_obj) => class_obj.id === this.class_id) || false;
    },
    cleaned_ref() {
      return this.$store.path_to_ref(this.teacher_email, this.class_id);
    },
    loading() {
      return this.$store.loaded_email !== this.teacher_email;
    },
    classes() {
      if (!this.teacher_email) {
        return null;
      } else if (this.teacher_email === this.$store.loaded_email) {
        return this.$store.get_loaded_classes;
      }
      this.$store.fetch_classes_by_email(this.teacher_email);
      return null;
    },
    is_join() {
      if (this.variant !== "add") return false;
      return this.$route?.name == "refclass" || this.$route?.name == "codeclass";
    },
    code() {
      return this.$route?.params?.code && this.$route.params?.code.toLowerCase();
    },
    welcomeName() {
      if (this.$store.user && this.$store.user.displayName)
        return "Hi " + this.$store.user.displayName.split(" ")[0] + ", ";
      return "";
    },
    canSubmit() {
      if (!this.teacher_email || !this.class_id) return false;
      if (this.class_obj && this.class_obj.is_joined && !this.adding) return false;
      return true;
    },
  },
  methods: {
    /**
     * Enroll via store.add_class → enrollClass({ classId }) (bare classId preferred).
     * P4: no nested classes/{email}/classes writes from this path.
     */
    async add_class() {
      if (!this.canSubmit && !this.adding) return;
      this.adding = true;
      this.$store
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
          ref = await this.$store.ref_from_code(this.code);
        } catch (err) {
          new ErrorToast("Invalid join code", err, 4000);
          this.$status.log("🔥 " + err);
          if (this.$route?.query?.manual) {
            this.$router.push({ name: "codeenterclass", query: this.$route.query });
          } else {
            this.to_normal_add();
          }
          return;
        }
      }

      if (ref && this.is_join) {
        this.$status.log("🔍 Attempting to use class join ref", ref);
        // P4: parseJoinRef → bare classId (+ teacher when prefixed); dual-read for short ids
        const parts = parseJoinRef(ref, this.$store.ORG_DOMAIN);
        if (!parts?.classId) {
          new WarningToast("Couldn't find that class", 3000);
          this.$status.log("🔥 Unparseable join ref", ref);
          this.to_normal_add();
          return;
        }

        let _email = parts.teacherEmail;
        const _id = parts.classId;

        if (parts.needsTeacherLookup) {
          try {
            const class_obj = await this.$store.class_from_ref(_id);
            _email = class_obj._teacher_email;
            if (!_email) throw "No teacher email on class";
          } catch (err) {
            new WarningToast("Couldn't find that class", 3000);
            this.$status.log("🔥 Unfound class for short join ref", ref, err);
            this.to_normal_add();
            return;
          }
        }

        this.teacher_email = _email;
        this.$store.fetch_classes_by_email(_email);
        while (this.$store.loaded_email !== this.teacher_email) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        let found = this.$store?.get_loaded_classes?.find((class_obj) => class_obj.id === _id);
        if (found) {
          this.class_id = _id;
          if (found.is_joined) {
            new WarningToast("You've already joined this class", 3000);
            this.$status.log("🔥 Already joined class", ref);
          }
        } else {
          new WarningToast("Couldn't find that class", 3000);
          this.$status.log("🔥 Unfound class for join ref", ref);
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
