<template>
  <div class="create_task">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">
        <span>Add a{{ is_vowel(type_full[0]) ? "n" : "" }}&MediumSpace;</span>
        <div class="header_magic_wrapper magic_wrapper contents_inherit" :class="{ magic_ready: type_ready }">
          <select title="Task type" v-model="task.type" class="type_dropdown styled_input styled_select" ref="type">
            <option class="type_dropdown__option styled_select__option" v-for="entry in $magic.types" :value="entry.key" :key="entry.key">
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
        <input v-if="!is_note" v-model="task.name" class="styled_input" type="text" :placeholder="type_full + ' Name'" :disabled="is_note" enterkeyhint="next" @keydown.enter="$refs.date.focus()" />
        <input
          type="date"
          ref="date"
          class="styled_input input_task__date"
          v-model="task.date"
          :style="{ maxWidth: is_note ? '100%' : null }"
          enterkeyhint="next"
          @keydown.enter="$refs.description.focus()"
        />
        <div class="flex-break"></div>
        <textarea
          ref="description"
          v-model="task.description"
          class="styled_input styled_textarea task_description"
          type="text"
          :placeholder="type_full + (is_note ? ' Contents' : ' Description (Optional)')"
        >
        </textarea>
        <div class="flex-break"></div>
        <div class="styled_input styled_links_box">
          <div class="styled_links_display">
            <span v-if="!task.links || !task.links.length" class="placeholder">{{ type_full }} Links (Optional)</span>
            <div v-else class="styled_line_links">
              <a class="styled_line_links__link styled_line_links__remove" target="_blank" v-for="link in task.links" :key="link.path" @click="remove_link(link)">{{ link.text }}</a>
            </div>
          </div>
          <hr class="styled_links_separator" />
          <div
            class="styled_links_add"
            @keydown.enter="
              $event.preventDefault();
              add_newlink();
            "
            enterkeyhint="done"
          >
            <input class="styled_links_add__path" type="url" v-model="newlink.path" @blur="fix_newlink_path" placeholder="Link URL (https://example.com)" enterkeyhint="done" />
            <div class="magic_wrapper styled_links_add__sized">
              <input class="styled_links_add__text" type="text" v-model="newlink.text" placeholder="Link Text (what students see)" enterkeyhint="done" />
              <div
                class="magic magic_in styled_magic alt_bg click-action"
                :class="{ magic_out: !path_ready, loading_bg: loading_text }"
                :disabled="!path_ready || loading_text"
                @click="magic_text"
                title="Auto-generate link text"
              ></div>
            </div>
            <button class="styled_links_add__action" @click="add_newlink" :disabled="newlink_not_ready">Add</button>
          </div>
        </div>
        <div class="flex-break"></div>
        <div class="repetition_toggle">
          <ToggleBar :value="repetition.enabled" @update="repetition.enabled = !repetition.enabled" :loads="false" />
          &nbsp;
          <span class="overlay_contents_text"
            >Repetition is <b>{{ repetition.enabled ? "enabled" : "disabled" }}</b> for this {{ task.type }}</span
          >
        </div>
        <div class="flex-break"></div>
        <div class="repetition_box_wrapper" ref="repetition_box">
          <div class="repetition_box_inner" :style="{ height: repetition.enabled ? 'auto' : '0px' }">
            <div class="repetition_config">
              <div class="config_section">
                <div class="config_label">What days of the week should this {{ task.type }} repeat</div>
                <div class="days_selector">
                  <div
                    v-for="(day, index) in ['M', 'T', 'W', 'T', 'F', 'S', 'S']"
                    :key="index"
                    class="day_square"
                    :class="{ selected: repetition.days.includes((index + 1) % 7) }"
                    @click="toggle_day((index + 1) % 7)"
                  >
                    {{ day }}
                  </div>
                </div>
              </div>
              <div class="config_section">
                <div class="config_label">How long should this {{ task.type }} continue</div>
                <div class="duration_selector">
                  <div class="duration_option" :class="{ selected: repetition.end.type == 'weeks' }" @click="repetition.end.type = 'weeks'">
                    <span class="duration_text">For</span>
                    <input type="number" v-model="repetition.end.value" min="1" max="52" class="duration_input" @click.stop @focus="repetition.end.type = 'weeks'" placeholder="##" />
                    <span class="duration_text">weeks</span>
                  </div>
                  <div class="duration_option" :class="{ selected: repetition.end.type == 'date' }" @click="repetition.end.type = 'date'">
                    <span class="duration_text">Until</span>
                    <input type="date" v-model="repetition.end.date" class="duration_input date_input" @click.stop @focus="repetition.end.type = 'date'" />
                  </div>
                </div>
              </div>
              <div class="repetition_summary" v-if="repetition.days.length && task_classes.length">
                <span
                  >This action will create <b>{{ estimated_count }}</b> new {{ task.type }}s.</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="overlay_contents_text after_repetition_box" :class="{ after_repetition_box_hidden: !repetition.enabled }">Choose which classes this {{ task.type }} will be added to</div>
      <div class="classes_checkboxes checkboxes">
        <a class="checkbox" v-for="class_obj in classes" :key="class_obj.id" :href="'/view/' + $store.path_to_ref(class_obj.ref)">
          <input type="checkbox" :id="class_obj.id" :value="class_obj.id" v-model="task_classes" />
          <label
            class="button_pointer_text class_name"
            v-if="class_obj.id"
            :for="class_obj.id"
            :style="{
              '--color-class': class_obj.color,
              '--color-class-alt': class_obj.color + '2d',
            }"
          >
            {{ $store.class_text(class_obj) }}
          </label>
          <label v-else :for="class_obj.id" @click="$event.stopPropagation">{{ class_obj.name }}</label>
        </a>
      </div>
    </div>
    <div class="bottom_actions">
      <button class="close_action click_escape" @click="$emit('close')">Close</button>
      <div class="flex_spacer"></div>
      <button class="continue_action click_ctrlenter" :class="{ loading_bg: loading }" @click="try_submit" :disabled="!ready">Add {{ task.type }}</button>
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

import { ErrorToast, WarningToast, SuccessToast } from "@svonk/util";
import smoothReflow from "vue-smooth-reflow";
import ToggleBar from "@/components/ToggleBar.vue";

export default {
  name: "CreateTaskView",
  emits: ["close"],
  components: { ToggleBar },
  mixins: [smoothReflow],
  mounted() {
    this.$smoothReflow({
      el: this.$refs.contents,
      childTransitions: true,
    });
    this.$smoothReflow({
      el: this.$refs.repetition_box,
      hideOverflow: true,
      childTransitions: true,
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
      repetition: {
        enabled: false,
        days: [],
        end: {
          type: "weeks", // 'weeks' or 'date'
          value: 1,
        },
      },
      loading: false,
      loading_type: false,
      loading_text: false,
      loaded_type: false,
      loaded_text: false,
      auto_selected_day: null, // tracks the day auto-selected based on task.date
    };
  },
  computed: {
    repetition_valid() {
      if (!this.repetition.enabled) return true;
      // Must have at least one day selected
      if (!this.repetition.days.length) return false;
      // Validate based on end type
      if (this.repetition.end.type === "weeks") {
        return this.repetition.end.value && this.repetition.end.value > 0;
      } else if (this.repetition.end.type === "date") {
        if (!this.repetition.end.date) return false;
        const endDate = new Date(this.repetition.end.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return endDate > today;
      }
      return false;
    },
    repetition_error() {
      if (!this.repetition.enabled) return null;
      if (!this.repetition.days.length) {
        return "Please select at least one day for the repetition";
      }
      if (this.repetition.end.type === "weeks" && (!this.repetition.end.value || this.repetition.end.value <= 0)) {
        return "Please enter a valid number of weeks (greater than 0)";
      }
      if (this.repetition.end.type === "date") {
        if (!this.repetition.end.date) {
          return "Please select an end date for the repetition";
        }
        const endDate = new Date(this.repetition.end.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (endDate <= today) {
          return "End date must be in the future";
        }
      }
      return null;
    },
    ready() {
      const baseReady = (this.task.name || this.is_note) && this.task.date && this.task_classes.length && (!this.is_note || this.task.description);
      return baseReady && this.repetition_valid;
    },
    type_full() {
      return this.$magic.type_full(this.task.type);
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
    classes() {
      return this.$store.classes;
    },
    is_note() {
      return this.task.type === "note";
    },
    type_ready() {
      return !this.loaded_type && this.task && (this.task.description || this.task.name).length > 5;
    },
    path_ready() {
      return !this.loaded_text && this.newlink.path && this.newlink_not_ready && this.newlink.path.startsWith("https://");
    },
    estimated_count() {
      if (!this.repetition.enabled || !this.repetition.days.length) return 0;
      let count = 0;
      if (this.repetition.end.type == "weeks") {
        count = this.repetition.end.value * this.repetition.days.length;
      } else if (this.repetition.end.date && this.task.date) {
        const start = new Date(this.task.date);
        const end = new Date(this.repetition.end.date);
        if (end <= start) return 0;
        const diffTime = end - start;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const weeks = diffDays / 7;
        count = Math.ceil(weeks * this.repetition.days.length);
      }
      return Math.max(0, count * this.task_classes.length);
    },
  },
  methods: {
    try_submit() {
      if (this.ready) {
        this.create_task();
      } else if (this.repetition_error) {
        new WarningToast(this.repetition_error, 2000);
      } else {
        new WarningToast("Please fill out all required fields", 1000);
      }
    },
    is_vowel(char) {
      return ["a", "e", "i", "o", "u"].includes(char.toLowerCase());
    },
    toggle_day(index) {
      if (this.repetition.days.includes(index)) {
        this.repetition.days = this.repetition.days.filter((d) => d !== index);
      } else {
        this.repetition.days.push(index);
        this.repetition.days.sort();
      }
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

      const action =
        this.repetition.enabled && this.repetition.days.length
          ? this.$store.create_repeating_task(this.task, this.task_classes, this.repetition)
          : this.$store.create_task(this.task, this.task_classes);

      action
        .then(() => {
          //! router to new task view?
          this.$emit("close");
        })
        .catch((err) => {
          this.loading = false;
          this.$status.error(`📃 Couldn't create ${this.task.type || "task"}:`, err);
          new ErrorToast("Couldn't create task", err, 2000);
        });
    },
    remove_link(link) {
      this.task.links = this.task.links.filter((l) => l.path !== link.path);
      this.newlink = link;
    },
    update_auto_day(new_date) {
      // Remove the previously auto-selected day
      if (this.auto_selected_day !== null) {
        const idx = this.repetition.days.indexOf(this.auto_selected_day);
        if (idx !== -1) {
          this.repetition.days.splice(idx, 1);
        }
      }

      if (new_date) {
        // Parse date in local timezone to get correct day of week
        const [year, month, day] = new_date.split("-").map(Number);
        const date = new Date(year, month - 1, day);
        const newDay = date.getDay();

        // Add the new day if not already selected
        if (!this.repetition.days.includes(newDay)) {
          this.repetition.days.push(newDay);
          this.repetition.days.sort();
        }

        // Track this as the auto-selected day
        this.auto_selected_day = newDay;
      } else {
        this.auto_selected_day = null;
      }
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
        classes: this.task_classes.map((class_id) => this.classes.find((c) => c.id == class_id)?.name),
      };

      this.$magic
        .type(JSON.stringify(clean_task))
        .then((type) => {
          if (type) {
            new SuccessToast(`Generated task type '${type}'`, 1500);
            this.$status.log("🔗 Generated task type:", type);
            this.task.type = type;
          } else {
            new WarningToast("Couldn't reasonably infer a task type", 2000);
            this.$status.warn("📃 Couldn't generate task type");
          }
          this.loaded_type = true;
          this.loading_type = false;
        })
        .catch((err) => {
          new ErrorToast("Something went wrong generating the task type", err, 3000);
          this.$status.error("⚠ Failed task type generation:", err);
          this.loaded_type = false;
          this.loading_type = false;
        });
    },
    async magic_text() {
      if (!this.path_ready || this.newlink.text) return;
      this.loading_text = true;
      this.$magic
        .text(this.newlink.path)
        .then((text) => {
          if (text) {
            new SuccessToast(`Generated link text '${text}'`, 1500);
            this.$status.log("🔗 Generated link text:", text);
            this.newlink.text = text;
          } else {
            new WarningToast("Couldn't reasonably infer link text", 2000);
            this.$status.warn("📃 Couldn't generate link text");
          }
          this.loaded_text = true;
          this.loading_text = false;
        })
        .catch((err) => {
          new ErrorToast("Couldn't generate link text", err, 3000);
          this.$status.error("⚠ Failed link text generation:", err);
          this.loaded_text = false;
          this.loading_text = false;
        });
    },
  },
  watch: {
    "$route.params.tasktype"(new_type) {
      this.task.type = new_type;
    },
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
    "task.date": {
      handler(new_date, old_date) {
        if (new_date !== old_date) {
          this.loaded_type = false;
        }
        this.update_auto_day(new_date);
      },
      immediate: true,
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
/* Repetition Box - matches Figma design */
.repetition_toggle {
  line-height: 1.75;
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  width: 100%;
}
.repetition_box_wrapper {
  width: 100%;
  transition: height 0.3s ease-in-out;
  overflow: hidden;
  background-color: var(--color-overlay-input);
  border-radius: var(--radius-overlay-input);
}
.repetition_box_inner {
  display: flex;
  flex-direction: column;
  overflow: visible;
}
.repetition_config {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px 0;
}
.config_section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 var(--padding-overlay-input, 15px);
}
.config_label {
  font-size: 14px;
  color: var(--color-on-overlay-input);
}
/* Day selector - 7 squares that fill width */
.days_selector {
  display: flex;
  gap: 10px;
  width: 100%;
}
.day_square {
  flex: 1;
  aspect-ratio: 1;
  max-width: 50px;
  min-width: 36px;
  border-radius: 6px;
  background-color: var(--color-overlay-secondary-input);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  font-weight: normal;
  color: #989898;
  cursor: pointer;
}
.day_square.selected {
  background-color: #242325;
  color: white;
}
/* Duration selector - two segmented buttons */
.duration_selector {
  display: flex;
  gap: 10px;
  width: 100%;
}
.duration_option {
  flex: 1;
  height: 40px;
  border-radius: 6px;
  background-color: var(--color-overlay-secondary-input);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
  padding: 0 8px;
}
.duration_option .duration_text {
  font-size: 17px;
  color: #9a9a9a;
}
.duration_option.selected {
  background-color: #242325;
}
.duration_option.selected .duration_text {
  color: white;
}
.duration_input {
  background-color: white;
  border: none;
  border-radius: 2px;
  padding: 0 5px;
  height: 24px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
  width: 40px;
}
.duration_input.date_input {
  width: 90px;
}
.duration_option:not(.selected) .duration_input {
  background-color: #cccccc;
  color: rgba(121, 121, 121, 0.5);
}
/* Summary section */
.repetition_summary {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  font-size: 14px;
  color: var(--color-on-overlay-input);
  padding: 0 var(--padding-overlay-input, 15px);
}
.repetition_summary b {
  text-decoration: underline;
}
.after_repetition_box {
  transition: margin-top 0.3s ease-in-out;
  margin-top: 0;
}
.after_repetition_box_hidden {
  margin-top: calc(0px - var(--padding-overlay-input));
}
.summary_classes {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.summary_class_tag {
  background-color: var(--color-class-alt);
  color: var(--color-class);
  padding: 5px 7px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
