<template>
  <main class="createclass">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">Edit your Class</h2>
    </header>
    <div class="overlay_contents" ref="contents">
      <div v-if="ready">
        <div class="overlay_contents_text">
          You're editing
          <span
            class="class_name button_pointer_text"
            :style="{
              '--color-class': original.color,
              '--color-class-alt': original.color + '2d',
            }"
            >{{ `P${original.period} - ${original.name}` }}</span
          >
        </div>
        <div class="inputs_row">
          <div class="class_period_container styled_obj">
            <input
              v-model="class_obj.period"
              class="styled_input class_period"
              type="number"
              min="1"
              max="8"
              step="1"
              placeholder="#"
            />
          </div>
          <input
            v-model="class_obj.name"
            class="styled_input class_name"
            type="text"
            placeholder="Name"
          />
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
      <img alt="Loading Icon" class="loading_icon" v-else />
    </div>
    <div class="bottom_actions">
      <button
        class="alt_action"
        @click="
          if (ready) {
            share_class();
          } else {
            $emit('close');
          }
        "
      >
        {{ ready ? "Share" : "Close" }}
      </button>
      <div class="flex_spacer"></div>
      <button class="leave_action primary_styled" @click="leave_class" :disabled="!ready">
        Leave
      </button>
      <button
        class="continue_action"
        @click="update_class"
        :disabled="!ready || !changed || !class_obj.name || !class_obj.period"
        :class="{ loading_bg: loading }"
      >
        Save class
      </button>
    </div>
  </main>
</template>

<script>
/**
 * Component for creating a class if the user is a teacher.
 *
 * @module CreateClassView
 * @description Modal that allows the user to edit a class if they are a teacher.
 * @requires module:store/MainStore
 * @emits {Function} close - An event emitted when the class is created or the modal is closed.
 */
import { useMainStore } from "@/store";
import smoothReflow from "vue-smooth-reflow";
import { WarningToast, SuccessToast, ErrorToast } from "@svonk/util";
import { _statuslog } from "../../common";
export default {
  name: "EditClassView",
  emits: ["close"],
  mixins: [smoothReflow],
  data() {
    return {
      class_obj: {},
      original: {},
      loading: false,
      ready: false,
      ref: this.$route?.params?.ref,
    };
  },
  computed: {
    store() {
      return useMainStore();
    },
    changed() {
      return JSON.stringify(this.class_obj) != JSON.stringify(this.original);
    },
  },
  mounted() {
    this.$smoothReflow({
      el: this.$refs.contents,
      childTransitions: true,
    });
    if (this.ref && this.ref.split("~").length == 2) {
      this.ref = this.ref.split("~").join("/");
      this.get_class();
    } else {
      new WarningToast("Invalid class provided");
      this.$emit("close");
    }
  },
  methods: {
    update_class() {
      this.loading = true;
      this.store
        .update_class(this.ref, this.class_obj)
        .then(() => {
          this.$emit("close");
        })
        .catch((err) => {
          new WarningToast("Something went wrong updating the class", 2500);
          _statuslog("🔥Couldn't update class", this.ref, err);
          this.loading = false;
        });
    },
    get_class() {
      this.ready = false;
      this.store
        .class_from_ref(this.ref)
        .then((class_obj) => {
          this.class_obj = class_obj;
          this.original = { ...class_obj };
          this.ready = true;
        })
        .catch((err) => {
          new WarningToast("Couldn't find that class", 2000);
          _statuslog("🔥Couldn't find class for edit", this.ref, err);
          this.$emit("close");
        });
    },
    leave_class() {
      this.$router.push({ name: "leave", params: { ref: this.$route?.params?.ref } });
    },
    /** Shares the task link with the native share function, or to the clipboard if sharing is not supported */
    async share_class() {
      if (navigator.share) {
        let url = new URL("https://mvtt.app/portal/add/code/" + this.$route.params?.ref);

        navigator
          .share({
            title: `P${this.class_obj.period} - ${this.class_obj.name}`,
            text: "Join my class on MVTT!",
            url: url.href,
          })
          .then(() => new SuccessToast("Opened share dialog", 1000))
          .catch((err) => _statuslog("Error sharing", err));
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        new WarningToast("Sharing not supported, copied link to clipboard", 2000);
      } else {
        new ErrorToast("Sharing not supported", 2000);
      }
    },
  },
};
</script>

<style scoped>
.inputs_row {
  flex-flow: row wrap;
  margin-bottom: 0;
}

.inputs_row .color_input_container {
  margin-right: 0;
  padding: 0;
  width: var(--height-overlay-input);
  flex-basis: var(--height-overlay-input);
  height: var(--height-overlay-input);
  flex-grow: 0;
  flex-shrink: 0;
  overflow: hidden;
  filter: var(--filter-calendar-task);
}
.inputs_row .color_input_container .color_input {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  border: none;
  border-radius: 0;
  transform: scale(2);
}
.inputs_row .class_description {
  margin-right: 0;
  margin-top: calc(var(--padding-overlay) / 2);
  padding-top: 10px;
  padding-bottom: 10px;
}

.inputs_row .class_period_container {
  flex-grow: 0;
  flex-basis: calc(var(--height-overlay-input) * 1.5);
  background: var(--color-overlay-input);
  padding-right: 0;
}
.inputs_row .class_period_container .class_period {
  padding: 0;
  padding-right: calc(var(--padding-overlay-input) / 2);
}
.inputs_row .class_period_container::before {
  content: "P";
}
.inputs_row .class_name {
  flex-grow: 3;
}
.loading_icon {
  max-height: 120px;
  min-width: 100%;
}
.button_pointer_text.class_name {
  background-color: var(--color-class-alt);
  color: var(--color-class);
  font-weight: 600;
}
</style>
