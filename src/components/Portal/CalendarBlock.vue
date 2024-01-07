<template>
  <main
    class="calendar portal_main_block"
    @drag="check_leave"
    :class="{ calendar_fullpage: fullpage }"
  >
    <!-- use LoadingCover component when waiting for ready -->
    <LoadingCover v-if="!is_ready" class="calendar_loading" covering="Calendar Tasks" />
    <!-- calendar content -->
    <div class="calendar_header portal_main_block_header">
      <div class="portal_main_block_header__left">
        <button
          class="portal_main_block_action portal_main_block_action_alt fullpage_toggle_button"
          @click="toggle_fullscreen"
          title="Toggle fullscreen (f)"
        >
          <div class="action_icon expand-icon" :class="{ alt: fullpage }"></div>
        </button>
        <div
          class="calendar_date portal_main_block_title"
          :title="
            'Currently viewing ' +
            loaded_month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
          "
        >
          {{ loaded_month.toLocaleDateString("en-US", { month: "long", year: "numeric" }) }}
        </div>
      </div>
      <div class="portal_main_block_actions_wrapper">
        <nav class="portal_main_block_actions">
          <button
            class="portal_main_block_action"
            @click="prev_month"
            title="Previous month (Left)"
          >
            <div class="action_icon arrow-icon left"></div>
          </button>
          <button class="portal_main_block_action" @click="this_month" title="Current month (Home)">
            <div class="action_icon cal-icon" :class="{ alt: tasks && tasks.length }"></div>
          </button>
          <button class="portal_main_block_action" @click="next_month" title="Next month (Right)">
            <div class="action_icon arrow-icon right"></div>
          </button>
        </nav>
        <button
          class="portal_main_block_action portal_main_block_action_alt"
          v-if="!store.is_teacher || true"
          @click="swap_to_study"
          title="View study portal (s)"
        >
          <div
            class="action_icon todo-icon"
            :class="{ alt: store.upcoming_todo && store.upcoming_todo.length }"
          ></div>
        </button>
      </div>
    </div>
    <div
      class="calendar_days_container hidescroll"
      :style="{
        '--color-dragging': (drag.task && drag.task.color) || (drag.class && drag.class.color),
        '--color-dragging-alt':
          (drag.task && drag.task.color) || (drag.class && drag.class.color)
            ? ((drag.task && drag.task.color) || (drag.class && drag.class.color)) + '80'
            : null,
      }"
    >
      <div
        class="calendar_days"
        ref="calendar_days"
        :class="{
          calendar_days__current: day_matches(loaded_month, new Date(new Date().setDate(1))),
          calendar_days__changed: is_changed,
        }"
      >
        <!-- v-for tasks -->
        <div
          class="calendar_day calendar_day__weekday_label"
          v-for="day of [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ]"
          :key="day"
        >
          <span class="calendar_day__weekday_label__text">{{ day }}</span>
        </div>
        <div
          class="calendar_day"
          :_date="day.date.toISOString().split('T')[0]"
          :class="{
            calendar_day__placeholder: day.is_placeholder && !store.simplified,
            calendar_day__hastask: day.tasks ? day.tasks.length : false,
            calendar_day__today: day.is_today,
            calendar_day__past: day.is_past,
            calendar_day__drag_to: drag.to == day.date,
            calendar_day__drag_class_to: drag.to == day.date && drag.class,
            calendar_day__drag_from: drag.from == day.date,
          }"
          @dragover="drag_over(day.date)"
          v-for="day of days"
          :key="day.date"
        >
          <div
            class="calendar_day_date"
            :class="{ 'click-action': store.is_teacher }"
            @click="
              if (store.is_teacher) {
                $router.push({
                  name: 'newtask',
                  query: {
                    date: format_date(day.date),
                    ...this.$route.query,
                  },
                });
              }
            "
          >
            <span class="calendar_day_date__short"> {{ day.date.getDate() }}</span>
            <span class="calendar_day_date__long" style="display: none">
              {{
                day.date.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })
              }}
            </span>
          </div>
          <div class="calendar_day_tasks">
            <a
              class="calendar_day_task click-action"
              :class="{
                calendar_day_task__dragging: drag.task == task,
                calendar_day_task__loading: drag.task == task && drag.load,
              }"
              v-for="task of day.tasks"
              :is_note="task.type === 'note'"
              :key="task.name"
              :title="task.name"
              :draggable="
                task &&
                store.is_teacher &&
                store.user &&
                task.ref.split('/')[0] == store.active_doc.email &&
                $route.name != 'study'
              "
              @dragstart="
                drag = {
                  task: task,
                  from: day.date,
                }
              "
              @dragend="drag_drop"
              :style="{
                '--color-calendar-task': task.color,
                '--color-calendar-task-alt': task.color + '40',
              }"
              :href="'/view/' + get_link(task.ref)"
              @click="
                $event.preventDefault();
                $emit('taskclick', task);
              "
            >
              <div
                class="calendar_day_task_editable"
                v-if="
                  task &&
                  store.is_teacher &&
                  store.user &&
                  task.ref.split('/')[0] == store.active_doc.email
                "
              >
                <span class="task_icon task_edit__icon" :class="{ loading_bg: drag.load }"></span>
              </div>
              <span v-if="task.type === 'note'">
                <span class="calendar_day_task__swatch"></span>
                <span class="calendar_day_task__note"> NOTE </span>
              </span>
              <span v-else>
                {{ task.name }}
              </span>
            </a>
          </div>
        </div>
        <div v-if="!tasks_loaded_month" class="calendar__no_tasks" style="display: none">
          Relax! No Tasks.
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import "@/assets/style/portal_main.css";
import { useMainStore } from "@/store";
import LoadingCover from "@/components/LoadingCover.vue";
import { _status, compatDateObj } from "@/common";
import { ErrorToast, SuccessToast } from "@svonk/util";
import { useShortcuts } from "@/store/shortcuts";
export default {
  name: "CalendarBlock",
  components: {
    LoadingCover,
  },
  props: {
    filtered_classes: { Array, default: () => [] },
    dragging_class: { Object, default: () => null },
  },
  emits: ["taskclick", "mounted"],
  data() {
    return {
      loaded_month: new Date(new Date().setDate(1)),
      is_ready: false,
      tasks: [],
      is_changed: false,
      drag: {},
      shortcuts: [
        {
          key: "f",
          description: "Toggle fullscreen",
        },
        {
          key: "s",
          description: "Swap to study portal",
          top: true,
        },
        {
          key: "ArrowLeft",
          description: "Previous month",
        },
        {
          key: "ArrowRight",
          description: "Next month",
        },
        {
          key: "Home",
          description: "Current month",
        },
      ],
    };
  },
  mounted() {
    _status.log("📅 Calendar mounted");
    this.$emit("mounted");
    this.tasks = this.store.tasks;
    window.addEventListener("keydown", this.handle_key);
    useShortcuts().register_all(this.shortcuts, "Calendar");
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handle_key);
    useShortcuts().remove_tag("Calendar");
  },
  methods: {
    toggle_fullscreen() {
      console.log("toggle_fullscreen", this.fullpage);
      // toggle fullpage mode (route.query.calendar)
      const new_fullpage = !this.fullpage;
      let query = { ...this.$route.query };
      if (new_fullpage) query.calendar = true;
      else delete query.calendar;

      this.$router.push({
        ...this.$route,
        query: query,
      });
    },
    handle_key(event) {
      if (event.ctrlKey || this.$route.name != "portal") return;
      if (!event.shiftKey) {
        if (event.key == "s") this.swap_to_study();
        else if (event.key == "f") this.toggle_fullscreen();
      } else {
        // use arrow keys for month navigation and home to return to current month, shift as modifier moves in years
        const shift = event.shiftKey;
        let action = () => {};
        if (event.key == "ArrowLeft") {
          action = this.prev_month;
        } else if (event.key == "ArrowRight") {
          action = this.next_month;
        } else if (event.key == "Home") {
          this.this_month();
          return;
        }
        for (let i = 0; i < (shift ? 12 : 1); i++) {
          action();
        }
      }
    },
    swap_to_study() {
      this.$router.push({ name: "study", query: this.$route.query });
    },
    check_leave(e) {
      // check if the mouse has left the calendar using drag event
      try {
        const rect = this.$refs.calendar_days.getBoundingClientRect();
        if (
          this.drag.to &&
          (e.clientX || e.clientX) &&
          (e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom)
        ) {
          this.drag.to = null;
        }
      } catch (err) {
        _status.error("🔥 Couldn't check if mouse left calendar", err);
      }
    },
    // drag:
    drop_class() {
      if (this.drag?.class && this.drag?.to) {
        // open task add with class and date
        _status.log("📅 Dropped class on calendar day");
        this.$router.push({
          name: "newtask",
          query: {
            class: this.drag.class.id,
            date: new Date(this.drag.to.getTime() - this.drag.to.getTimezoneOffset() * 60 * 1000)
              .toISOString()
              .split("T")[0],
            ...this.$route.query,
          },
        });
      }
      this.drag = {};
    },
    drag_over(date) {
      if (this.drag.to != date) {
        if (this.drag.class) {
          this.drag.to = date;
        } else {
          this.drag.to = this.drag.to != this.drag.from ? date : null;
        }
      }
    },
    drag_drop() {
      if (this.drag.to && this.drag.from && this.drag.to != this.drag.from && this.drag.task) {
        // move task to new date
        let to = this.drag.to;

        this.drag.load = true;
        this.drag.to = null;
        this.store
          .update_task(this.drag.task.ref, {
            ...this.drag.task,
            date: new Date(to - to.getTimezoneOffset() * 60 * 1000).toISOString().split("T")[0],
          })
          .then(() => {
            new SuccessToast(
              `Moved ${this.drag.task.type} ${
                this.drag.task.name ? '"' + this.drag.task.name + '" ' : ""
              }to ${to.toLocaleDateString()}`,
              2000
            );
            _status.log("📅 Moved task date");
            this.drag = {};
          })
          .catch((err) => {
            new ErrorToast("Couldn't update task", err, 2000);
            _status.error("🔥 Couldn't update task", err);
            this.drag = {};
          });
        // } else if (this.drag.to && this.drag.class) {
        //   this.drop_class();
      } else {
        this.drag = {};
      }
    },

    // non-drag:
    format_date(date) {
      // format date in yyyy-MM-dd for date input
      return date.toISOString().split("T")[0] || "";
    },

    day_matches(day1, day2) {
      return (
        day1.getDate() === day2.getDate() &&
        day1.getMonth() === day2.getMonth() &&
        day1.getFullYear() === day2.getFullYear()
      );
    },
    get_day_tasks(day) {
      return this.tasks
        .filter((task) => {
          const task_date = compatDateObj(task.date);
          return (
            this.day_matches(task_date, day) &&
            (!this.filtered_classes.length || this.filtered_classes.includes(task.class_id))
          );
        })
        .sort((a, b) => {
          if (a.type == "note" && b.type != "note") return -1;
        });
    },
    next_month() {
      this.is_changed = true;
      this.loaded_month = new Date(this.loaded_month.setMonth(this.loaded_month.getMonth() + 1));
    },
    this_month() {
      let new_date = new Date(new Date().setDate(1));
      if (this.day_matches(this.loaded_month, new_date)) {
        this.is_changed = !this.is_changed;
      }
      this.loaded_month = new_date;
    },
    prev_month() {
      this.is_changed = true;
      this.loaded_month = new Date(this.loaded_month.setMonth(this.loaded_month.getMonth() - 1));
    },
    run_get_tasks() {
      this.tasks = this.store.tasks;
      this.is_ready = true;
    },
    get_link(ref) {
      // replace all slashes with ~, and remove the part after @ in the part before the first slash
      let [_email, _id, task_id] = ref.split("/");
      _email = _email.split("@")[0];
      return [_email, _id, task_id].join("~");
    },
  },
  computed: {
    fullpage() {
      return JSON.parse(this.$route.query.calendar || "false");
    },
    tasks_loaded_month() {
      return this.tasks.some((task) => {
        const task_date = compatDateObj(task.date);
        return (
          // get tasks from the current month and next month
          true || task_date
        );
      });
    },
    store() {
      return useMainStore();
    },
    days() {
      const days = [];
      const today = compatDateObj(new Date().toISOString().split("T")[0]);
      const this_date = this.loaded_month.getTime();
      function get_this_date() {
        return new Date(this_date);
      }
      const first_day = new Date(get_this_date().setDate(1));
      const last_day = new Date(get_this_date().setMonth(get_this_date().getMonth() + 1, 0));

      // add the placeholders for the first week
      for (let i = first_day.getDay(); i > 0; i--) {
        const preflow_day = new Date(get_this_date().setDate(-i));
        days.push({
          date: preflow_day,
          tasks: this.get_day_tasks(preflow_day),
          is_placeholder: true,
          is_past: preflow_day.getTime() < today.getTime(),
        });
      }
      // do normal days
      for (let i = 1; i <= last_day.getDate(); i++) {
        const month_day = new Date(get_this_date().setDate(i));
        days.push({
          date: month_day,
          tasks: this.get_day_tasks(month_day),
          is_today: this.day_matches(month_day, new Date()),
          is_past: month_day.getTime() < today.getTime(),
        });
      }

      // add however many placeholders we need to get to a full 6 * 7 grid
      for (let i = 1; days.length < 6 * 7; i++) {
        const overflow_day = new Date(get_this_date().setDate(last_day.getDate() + i));
        days.push({
          date: overflow_day,
          tasks: this.get_day_tasks(overflow_day),
          is_placeholder: true,
          is_past: overflow_day.getTime() < today.getTime(),
        });
      }
      return days;
    },
  },
  // watch for store.classes change
  watch: {
    dragging_class(a, b) {
      if (a?.ref != b?.ref) {
        this.drag = {};
      }
      this.drag.class = this.dragging_class;
    },
    "store.classes": {
      handler(a, b) {
        if (a.length != b.length && this.is_ready) {
          _status.log("📦 Classes array length changed, calendar updating tasks");
          this.store
            .fetch_classes()
            .then(() => {
              this.run_get_tasks();
            })
            .catch((err) => {
              _status.error("🔥 Couldn't fetch classes", err);
            });
        }
      },
      deep: true,
    },
    "store.tasks": {
      handler() {
        this.tasks = this.store.tasks;
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.fullpage_toggle_button {
  display: none;
  background: transparent;
  border: solid var(--color-calendar-header) 2px;
}
@media (min-width: 630px) {
  main.calendar.calendar_fullpage {
    border: none;
    box-shadow: none;
    border-radius: 0;
    top: 0;
    left: 0;
    position: fixed;
    max-width: unset;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow-y: hidden;
    z-index: 4;
  }
  .fullpage_toggle_button {
    display: flex;
  }

  main.calendar.calendar_fullpage .calendar_days_container {
    height: 100%;
    width: 100%;
    overflow-y: auto;
  }
  main.calendar.calendar_fullpage .calendar_days_container::before {
    display: none;
  }
  main.calendar.calendar_fullpage .calendar_days {
    position: relative;
    grid-template-rows: var(--height-calendar-weekday-label) repeat(6, minmax(100px, 1fr));
  }
}

/* days list */
.calendar_days_container {
  width: 100%;
  position: relative;
}
/* use a ::before or ::after to force it to a 3:2 ratio */
.calendar_days_container::before {
  content: "";
  display: block;
  padding-top: 80%;
}
.calendar_days {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* layout */
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: var(--height-calendar-weekday-label) repeat(6, 1fr);
  grid-gap: var(--gap-calendar-day);
  box-sizing: border-box;
  padding: 0;
}
.calendar_days:empty::after {
  content: "No tasks scheduled";
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-on-calendar);
  text-align: center;
  margin: 1.5rem 0;
}
/* days */
.calendar_day {
  /* width: 100%; */
  height: 100%;
  /* layout */
  display: flex;
  flex-flow: column nowrap;
  justify-content: stretch;
  align-items: stretch;
  /* style */
  background-color: var(--color-calendar-day);
  border-radius: var(--radius-calendar-day);
  /* cursor: pointer; */
  user-select: none;
  /* overflow */
  position: relative;
  overflow: hidden;
}
.calendar_day__today {
  --color-calendar-day: var(--color-calendar-day-today);
}
.calendar_day::after {
  content: "";
  display: block;
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: calc(var(--spacing-calendar-day) + 1px);
  user-select: none;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0px,
    var(--color-calendar-day) var(--spacing-calendar-day)
  );
  z-index: 5;
}

.calendar_day_date {
  /* layout */
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  /* style */
  backdrop-filter: blur(5px);
  background-color: var(--color-calendar-date);
  font-size: 11px;
  color: var(--color-on-calendar-date);
  margin: var(--spacing-calendar-day);
  height: var(--size-calendar-day-date);
  width: var(--size-calendar-day-date);
  border-radius: calc(var(--radius-calendar-day) / 1.5);
  user-select: none;
  z-index: 2;
}
/* day labels */
.calendar_day__weekday_label {
  padding: 5px;
  line-height: calc(var(--height-calendar-weekday-label) - 10px);
  color: var(--color-calendar-weekday-label);
  font-weight: 600;
  font-size: 0.8em;
}
.calendar_day__weekday_label span.calendar_day__weekday_label__text {
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.calendar_day::before {
  /* allow for fade transition */
  opacity: 0;
  transition: opacity 0.2s ease-out;
  content: "";
}
.calendar_day.calendar_day__drag_to:not(.calendar_day__drag_from)::before {
  /* center and overlay */
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background */
  content: "🠻";
  font-size: 30px;
  font-weight: 700;
  color: var(--color-dragging);

  /* styles */
  background-color: var(--color-dragging-alt);
  backdrop-filter: blur(3px);
  z-index: 6;
  opacity: 1;
}

.calendar_day.calendar_day__drag_class_to:not(.calendar_day__drag_from)::before {
  content: "+";
}

/* hide paceholder tasks until hover */
.calendar_day.calendar_day__placeholder > * {
  opacity: 0.2;
  transition: opacity 0.2s ease-out;
}
.calendar_day.calendar_day__placeholder:hover > *,
.calendar_day.calendar_day__placeholder.calendar_day__drag_to > * {
  opacity: 1;
  transition-duration: 0.5s;
}
.calendar_day.calendar_day__placeholder:hover > .calendar_day_tasks,
.calendar_day.calendar_day__placeholder.calendar_day__drag_to > .calendar_day_tasks {
  visibility: visible;
}
.calendar_day.calendar_day__placeholder {
  opacity: 0.5;
  scale: 0.9;
  transition: opacity 0.2s ease-out, scale 0.2s ease-out;
}
.calendar_day.calendar_day__placeholder:hover,
.calendar_day.calendar_day__placeholder.calendar_day__drag_to {
  opacity: 0.85;
  scale: 1;
}

/* tasks */
.calendar_day_tasks {
  height: 100%;
  width: 100%;
  position: absolute;
  padding: var(--spacing-calendar-day);
  padding-top: calc(var(--size-calendar-day-date) + 2 * var(--spacing-calendar-day));
  overflow-y: auto;
  z-index: 1;
  /* layout */
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
}

/* hide scrollbars on tasks list */
.calendar_day_tasks::-webkit-scrollbar {
  display: none;
}
.calendar_day_tasks {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
/* task styling */
.calendar_day_task {
  white-space: nowrap;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: clip;
  position: relative;
  padding: var(--padding-calendar-task);
  /* colors */
  color: var(--color-on-calendar-task);
  background-color: var(--color-calendar-task);
  /* styles */
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 5px;
  text-align: center;
  height: var(--height-calendar-task);
  filter: var(--filter-calendar-task);
  cursor: pointer;
  /* center contents */
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
}
.calendar_day_task:first-of-type {
  margin-top: auto;
}
.calendar_day_task:not(:last-of-type) {
  margin-bottom: var(--spacing-calendar-day);
}
.calendar_day_task > span {
  text-align: center;
  width: 100%;
  user-select: none;
  pointer-events: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* for note type */
.calendar_day_task[is_note="true"] {
  padding: 0;
}
/* contents wrapper */
.calendar_day_task[is_note="true"] > span {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  background-color: var(--color-calendar-note);
}
/* swatch of the note */
.calendar_day_task[is_note="true"] > span > .calendar_day_task__swatch {
  display: block;
  height: calc(var(--height-calendar-task) - 8px);
  flex: 0 0 calc(var(--height-calendar-task) - 8px);
  margin: 4px;
  border-radius: 3px;
  background-color: var(--color-calendar-task);
}
/* text contents of the note*/
.calendar_day_task[is_note="true"] > span > .calendar_day_task__note {
  display: block;
  flex: 1 1;
  color: var(--color-on-calendar-note);
  font-size: 0.9em;
  font-weight: 700;
  line-height: var(--height-calendar-task);
  padding: 0 var(--padding-calendar-task);
}
.calendar_day_task .calendar_day_task_editable {
  /* fill task */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /* overlay center */
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  /* background and transition */
  border-radius: 5px;
  background-color: var(--color-calendar-task);
  opacity: 0;
  z-index: 2;
  transition: opacity 0.2s ease-out;
}
.calendar_day_task:hover .calendar_day_task_editable,
.calendar_day_task:active .calendar_day_task_editable,
.calendar_day_task.calendar_day_task__dragging .calendar_day_task_editable {
  opacity: 1;
}
.calendar_day_task.calendar_day_task__dragging:not(.calendar_day_task__loading) {
  opacity: 0.001;
}
.task_icon {
  width: 100%;
  height: 100%;
  background-size: 20px;
}
.task_icon.loading_bg {
  background-size: 40px;
  filter: none;
}
.task_edit__icon {
  filter: var(--filter-swatch-icon);
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(@/assets/img/general/portal/edit.png);
  background-image: url(@/assets/img/general/portal/edit.svg);
}
.calendar_day_task[is_note="false"]:not(.calendar_day__weekday_label)::after {
  content: "";
  display: block;
  width: calc(var(--padding-calendar-task) + 2px);
  height: 100%;
  right: 0;
  top: 0;
  position: absolute;
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, var(--color-calendar-task) 100%);
  margin-top: 5px;
  z-index: 1;
}

/* on small devices, show as a list instead of a calendar */
@media (max-width: 630px) {
  .calendar_days_container::before {
    display: none;
  }
  .calendar_days_container {
    padding: var(--spacing-calendar-day);
  }
  .calendar_days {
    position: unset;
    top: unset;
    left: unset;
    height: unset;
    display: flex;
    flex-flow: column nowrap;
    justify-content: stretch;
    align-items: stretch;
  }
  .calendar_day.calendar_day__placeholder,
  .calendar_day:not(.calendar_day__hastask),
  .calendar_days.calendar_days__current:not(.calendar_days__changed) .calendar_day__past {
    display: none;
  }
  .calendar_day {
    flex-shrink: 0;
    margin-bottom: var(--spacing-calendar-day);
    height: unset;
    max-height: unset;
    align-items: flex-start;
  }
  .calendar_day_date {
    width: unset;
    padding: 0.25rem 0.5rem;
  }
  .calendar_day_date__short {
    display: none;
  }
  .calendar_day_date__long,
  .calendar__no_tasks {
    display: unset !important;
  }
  .calendar_day_date {
    height: unset;
  }
  .calendar__no_tasks {
    color: var(--color-text-on-calendar);
    font-weight: 500;
    text-align: center;
    margin: 10% 0;
  }
  .calendar_day_tasks {
    position: unset;
    padding: 0;
    padding-top: 10px;
    flex-flow: row wrap;
    flex-basis: calc(var(--height-calendar-task) + 2 * var(--spacing-calendar-day));
    box-sizing: content-box;
    overflow-y: unset;
  }
  .calendar_day_tasks::after,
  .calendar_day::after {
    display: none;
  }
  .calendar_day_task {
    margin: var(--spacing-calendar-day) !important;
    flex-grow: 1;
    white-space: normal;
    height: unset;
    min-height: var(--height-calendar-task);
    flex-basis: 70px;
  }
}
</style>
<style>
@media (min-width: 630px) {
  .portal:has(main.calendar.calendar_fullpage) .portal_sidebar {
    z-index: 0;
  }
}
</style>
