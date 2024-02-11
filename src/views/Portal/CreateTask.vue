<template>
  <div class="create_task">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">
        <span>Add a{{ is_vowel(type_full[0]) ? "n" : "" }}&MediumSpace;</span>
        <div
          class="header_magic_wrapper magic_wrapper contents_inherit"
          :class="{ magic_ready: type_ready }"
        >
          <select
            title="Task type"
            v-model="task.type"
            class="type_dropdown styled_input styled_select"
            ref="type"
          >
            <option
              class="type_dropdown__option styled_select__option"
              v-for="entry in magic.types"
              :value="entry.key"
              :key="entry.key"
            >
              {{ entry.name }}
            </option>
          </select>
          <div
            class="magic magic_in styled_magic alt_bg click-action"
            :class="{ magic_out: !type_ready, loading_bg: loading_type }"
            :disabled="!type_ready || loading_type"
            @click="magic_type"
            title="Use magically inferred type"
          ></div>
        </div>
      </h2>
    </header>
    <div class="overlay_contents" ref="contents">
      <div class="overlay_contents_text">
        <span v-if="is_note">Add a new {{ task.type }} to</span>
        <span v-else>Schedule a new {{ task.type }} for</span>
        your class{{ classes && classes.length == 1 ? "" : "es" }}
      </div>
      <div class="inputs_row">
        <input
          v-if="!is_note"
          v-model="task.name"
          class="styled_input"
          type="text"
          :placeholder="type_full + ' Name'"
          :disabled="is_note"
        />
        <input
          type="date"
          ref="date"
          class="styled_input input_task__date"
          v-model="task.date"
          :style="{ maxWidth: is_note ? '100%' : null }"
        />
        <div class="flex-break"></div>
        <textarea
          v-model="task.description"
          class="styled_input styled_textarea task_description"
          type="text"
          :placeholder="type_full + (is_note ? ' Contents' : ' Description (Optional)')"
        >
        </textarea>
        <div class="flex-break"></div>
        <div class="styled_input styled_links_box">
          <div class="styled_links_display">
            <span v-if="!task.links || !task.links.length" class="placeholder"
              >{{ type_full }} Links (Optional)</span
            >
            <div v-else class="styled_line_links">
              <a
                class="styled_line_links__link styled_line_links__remove"
                target="_blank"
                v-for="link in task.links"
                :key="link.path"
                @click="remove_link(link)"
                >{{ link.text }}</a
              >
            </div>
          </div>
          <hr class="styled_links_separator" />
          <div class="styled_links_add">
            <input
              class="styled_links_add__path"
              type="url"
              v-model="newlink.path"
              @blur="fix_newlink_path"
              placeholder="Link URL (https://example.com)"
            />
            <div class="magic_wrapper styled_links_add__sized">
              <input
                class="styled_links_add__text"
                type="text"
                v-model="newlink.text"
                placeholder="Link Text (what students see)"
              />
              <div
                class="magic magic_in styled_magic alt_bg click-action"
                :class="{ magic_out: !path_ready, loading_bg: loading_text }"
                :disabled="!path_ready || loading_text"
                @click="magic_text"
                title="Auto-generate link text"
              ></div>
            </div>
            <button
              class="styled_links_add__action"
              @click="add_newlink"
              :disabled="newlink_not_ready"
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <div class="overlay_contents_text">
        Choose which classes this {{ task.type }} will be added to
      </div>
      <div class="classes_checkboxes checkboxes">
        <a
          class="checkbox"
          v-for="class_obj in classes"
          :key="class_obj.id"
          :href="'/view/' + store.path_to_ref(class_obj.ref)"
        >
          <input type="checkbox" :id="class_obj.id" :value="class_obj.id" v-model="task_classes" />
          <label
            class="button_pointer_text class_name"
            v-if="class_obj.period"
            :for="class_obj.id"
            :style="{
              '--color-class': class_obj.color,
              '--color-class-alt': class_obj.color + '2d',
            }"
          >
            P{{ class_obj.period }} - {{ class_obj.name }}
          </label>
          <label v-else :for="class_obj.id" @click="$event.stopPropagation">{{
            class_obj.name
          }}</label>
        </a>
      </div>
    </div>
    <div class="bottom_actions">
      <button class="close_action click_escape" @click="$emit('close')">Close</button>
      <div class="flex_spacer"></div>
      <button
        class="continue_action click_ctrlenter"
        :class="{ loading_bg: loading }"
        @click="try_submit"
        :disabled="!ready"
      >
        Add {{ task.type }}
      </button>
    </div>
  </div>
</template>

<script>
/**
 * Creates a new task for the teacher's selected class(es).
 *
 * @module CreateTaskView
 * @description Modal that allows teacher's to create a new task for their classes.
 * @param {string} tasktype - The type of task to create (task, project, test, etc.) Provided by the router.
 * @requires module:store/MainStore
 * @emits {Function} close - An event emitted when the task is created or the modal is closed.
 */

import { useMainStore } from "@/store";
import { useMagic } from "@/store/magic";
import { _status } from "@/common";
import { ErrorToast, WarningToast, SuccessToast } from "@svonk/util";
import smoothReflow from "vue-smooth-reflow";

export default {
  name: "CreateTaskView",
  emits: ["close"],
  mixins: [smoothReflow],
  mounted() {
    this.$smoothReflow({
      el: this.$refs.contents,
    });
    if (!this.$route?.params?.tasktype) {
      this.$refs.type.focus();
    } else {
      this.$refs.date.focus();
    }

    // remove the class and date from the query
    this.$router.replace({
      ...this.$route,
      query: { ...this.$route.query, class: undefined, date: undefined },
    });
  },
  data() {
    return {
      task: {
        name: "",
        date: this.$route.query?.date ? this.$route.query.date : "",
        description: "",
        type: this.$route.params.tasktype ? this.$route.params.tasktype : "task",
      },
      task_classes: this.$route.query?.class ? [this.$route.query.class] : [],
      newlink: {
        text: "",
        path: "",
      },
      loading: false,
      loading_type: false,
      loading_text: false,
      loaded_type: false,
      loaded_text: false,
    };
  },
  computed: {
    ready() {
      return (
        (this.task.name || this.is_note) &&
        this.task.date &&
        this.task_classes.length &&
        (!this.is_note || this.task.description)
      );
    },
    type_full() {
      return this.magic.type_full(this.task.type);
    },
    newlink_not_ready() {
      // check if path and text, and also that path is a valid url
      if (!this.newlink.path || !this.newlink.text) {
        return true;
      }
      try {
        void new URL(this.newlink.path);
        return false;
      } catch (err) {
        return true;
      }
    },
    class_name() {
      if (!this.classes) return null;
      let class_obj = this.classes.find((class_obj) => class_obj.id === this.class_id);
      if (!class_obj) return null;
      return class_obj.name;
    },
    store() {
      return useMainStore();
    },
    magic() {
      return useMagic();
    },
    classes() {
      return this.store.classes;
    },
    is_note() {
      return this.task.type === "note";
    },
    type_ready() {
      return !this.loaded_type && this.task && (this.task.description || this.task.name).length > 5;
    },
    path_ready() {
      return (
        !this.loaded_text &&
        this.newlink.path &&
        this.newlink_not_ready &&
        this.newlink.path.startsWith("https://")
      );
    },
  },
  methods: {
    try_submit() {
      if (this.ready) {
        this.create_task();
      } else {
        new WarningToast("Please fill out all required fields", 1000);
      }
    },
    is_vowel(char) {
      return ["a", "e", "i", "o", "u"].includes(char.toLowerCase());
    },
    add_newlink() {
      if (!this.task.links) this.task.links = [];
      // add protocol if missing
      this.newlink.path = new URL(this.newlink.path).href;
      this.task.links.push(this.newlink);
      this.newlink = {
        text: "",
        path: "",
      };
    },
    create_task() {
      if (!this.newlink_not_ready) {
        new WarningToast("Don't forget to to click the 'Add' button to add your link!", 2000);
        return;
      }
      this.loading = true;
      this.store
        .create_task(this.task, this.task_classes)
        .then(() => {
          //! router to new task view?
          this.$emit("close");
        })
        .catch((err) => {
          this.loading = false;
          _status.error(`📃 Couldn't create ${this.task.type || "task"}:`, err);
          new ErrorToast("Couldn't create task", err, 2000);
        });
    },
    remove_link(link) {
      this.task.links = this.task.links.filter((l) => l.path !== link.path);
      this.newlink = link;
    },
    fix_newlink_path() {
      if (this.newlink.path && this.newlink.path.includes(".")) {
        try {
          this.newlink.path = new URL(this.newlink.path).href;
        } catch (err) {
          // add protocol if missing
          this.newlink.path = "https://" + this.newlink.path;
          this.fix_newlink_path();
        }
      }
    },
    async magic_type() {
      if (!this.type_ready) return;
      this.loading_type = true;
      // cleanup task
      const clean_task = {
        name: this.task.name,
        description: this.task.description,
        date: this.task.date,
        classes: this.task_classes.map(
          (class_id) => this.classes.find((c) => c.id == class_id)?.name
        ),
      };

      this.magic
        .type(JSON.stringify(clean_task))
        .then((type) => {
          if (type) {
            new SuccessToast(`Generated task type '${type}'`, 1500);
            _status.log("🔗 Generated task type:", type);
            this.task.type = type;
          } else {
            new WarningToast("Couldn't reasonably infer a task type", 2000);
            _status.warn("📃 Couldn't generate task type");
          }
          this.loaded_type = true;
          this.loading_type = false;
        })
        .catch((err) => {
          new ErrorToast("Something went wrong generating the task type", err, 3000);
          _status.error("⚠ Failed task type generation:", err);
          this.loaded_type = false;
          this.loading_type = false;
        });
    },
    async magic_text() {
      if (!this.path_ready || this.newlink.text) return;
      this.loading_text = true;
      this.magic
        .text(this.newlink.path)
        .then((text) => {
          if (text) {
            new SuccessToast(`Generated link text '${text}'`, 1500);
            _status.log("🔗 Generated link text:", text);
            this.newlink.text = text;
          } else {
            new WarningToast("Couldn't reasonably infer link text", 2000);
            _status.warn("📃 Couldn't generate link text");
          }
          this.loaded_text = true;
          this.loading_text = false;
        })
        .catch((err) => {
          new ErrorToast("Couldn't generate link text", err, 3000);
          _status.error("⚠ Failed link text generation:", err);
          this.loaded_text = false;
          this.loading_text = false;
        });
    },
  },
  watch: {
    "task.type"(new_type, old_type) {
      // update paramater in url
      this.$router.replace({
        ...this.$route,
        params: { ...this.$route.params, tasktype: new_type },
      });
      // if task -> note, clear name and move to description if empty {
      if (new_type == "note") {
        this.task.description = this.task.description || this.task.name;
        this.task.name = "";
      } else if (old_type == "note" && this.task.description?.length <= 35) {
        this.task.name = this.task.description;
        this.task.description = "";
      }
    },
    // if newlink.path changes, set loaded_text to false
    "newlink.path"(new_path, old_path) {
      if (new_path != old_path) {
        this.loaded_text = false;
      }
    },
    "newlink.text"(new_text, old_text) {
      if (new_text != old_text) {
        this.loaded_text = false;
      }
    },
    // if name, description, date, or classes change, set loaded_type to false
    // fix for references being the same
    "task.name"(new_name, old_name) {
      if (new_name !== old_name) {
        this.loaded_type = false;
      }
    },
    "task.description"(new_desc, old_desc) {
      if (new_desc !== old_desc) {
        this.loaded_type = false;
      }
    },
    "task.date"(new_date, old_date) {
      if (new_date !== old_date) {
        this.loaded_type = false;
      }
    },
    task_classes: {
      deep: true,
      handler(new_classes, old_classes) {
        if (new_classes != old_classes) {
          this.loaded_type = false;
        }
      },
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
}
.checkbox label {
  padding-left: 0.5rem;
  user-select: none;
  cursor: pointer;
}
.inputs_row {
  flex-flow: row wrap;
}
.styled_input.input_task__date {
  margin-right: 0;
  max-width: 150px;
}
select.type_dropdown {
  padding: 5px;
  background-color: var(--color-overlay-input);
  color: var(--color-on-overlay-input);
  border: none;
  border-radius: var(--radius-overlay-input);
  width: auto;
}
.type_dropdown__option {
  font-size: 14px;
}
.class_name {
  margin-left: 0.75em;
}
.checkboxes .checkbox input:checked + label.class_name {
  background-color: var(--color-class);
  color: var(--color-on-class);
}
/* new display method */
.checkboxes .checkbox input {
  display: none;
}
.checkboxes .checkbox label {
  margin-left: unset;
}
/* inline variation */
.checkboxes {
  gap: 0.5em;
  display: inline-flex;
  flex-flow: row wrap;
}
.checkboxes .checkbox {
  margin: 0;
  display: inline-flex;
  flex-grow: 1;
}
.checkboxes .checkbox label {
  width: 100%;
  text-align: center;
}
@media (max-width: 600px) {
  .checkboxes {
    gap: 0.5em;
  }
  .checkboxes .checkbox,
  .checkboxes .checkbox label {
    width: 100%;
    text-align: left;
    line-height: 2.5em;
  }
  .checkboxes .checkbox label {
    padding: 0 1em;
    height: 2.5em;
  }
}

.parent.simplified .checkboxes {
  gap: 0.5em;
}
.parent.simplified .checkboxes .checkbox,
.parent.simplified .checkboxes .checkbox label {
  width: 100%;
  text-align: left;
  line-height: 2.5em;
}
.parent.simplified .checkboxes .checkbox label {
  padding: 0 1em;
  height: 2.5em;
}
</style>
