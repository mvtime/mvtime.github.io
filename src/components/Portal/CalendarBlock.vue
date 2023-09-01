<template>
  <main class="calendar">
    <!-- use LoadingCover component when is_ready -->
    <LoadingCover v-if="!is_ready" class="calendar_loading" covering="Calendar Tasks" />
    <!-- calendar content -->
    <div class="calendar_header">
      <div
        class="calendar_date"
        :title="
          'Currently viewing ' +
          loaded_month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
        "
      >
        {{ loaded_month.toLocaleDateString("en-US", { month: "long", year: "numeric" }) }}
      </div>
      <nav class="calendar_actions">
        <button class="calendar_action" @click="prev_month" title="Previous month">
          <div class="action_icon arrow-icon left"></div>
        </button>
        <button class="calendar_action" @click="this_month" title="Current month">
          <div class="action_icon cal-icon" :class="{ alt: tasks.length }"></div>
        </button>
        <button class="calendar_action" @click="next_month" title="Next month">
          <div class="action_icon arrow-icon right"></div>
        </button>
      </nav>
    </div>
    <div class="calendar_days_container">
      <div
        class="calendar_days"
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
            calendar_day__placeholder: day.is_placeholder,
            calendar_day__hastask: day.tasks ? day.tasks.length : false,
            calendar_day__today: day.is_today,
            calendar_day__past: day.is_past,
          }"
          v-for="day of days"
          :key="day.date"
        >
          <div class="calendar_day_date">
            <span class="calendar_day_date__short"> {{ new Date(day.date).getDate() }}</span>
            <span class="calendar_day_date__long" style="display: none">
              {{
                new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })
              }}
            </span>
          </div>
          <div class="calendar_day_tasks">
            <div
              class="calendar_day_task click-action"
              v-for="task of day.tasks"
              :is_note="task.type === 'note'"
              :key="task.name"
              :title="task.classes_class"
              :style="{ '--color-calendar-task': task.color }"
              @click="$emit('taskclick', task)"
            >
              <span v-if="task.type === 'note'">
                <span class="calendar_day_task__swatch"></span>
                <span class="calendar_day_task__note"> NOTE </span>
              </span>
              <span v-else>
                {{ task.name }}
              </span>
            </div>
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
import { useMainStore } from "@/store";
import LoadingCover from "@/components/LoadingCover.vue";
import { _statuslog } from "@/common";
export default {
  name: "CalendarBlock",
  components: {
    LoadingCover,
  },
  props: {
    filtered_classes: Array,
    default: () => [],
  },
  emits: ["taskclick", "mounted"],
  data() {
    return {
      loaded_month: new Date(new Date().setDate(1)),
      is_ready: false,
      tasks: [],
      is_changed: false,
    };
  },
  mounted() {
    _statuslog("📅 Calendar mounted");
    this.$emit("mounted");
    this.tasks = this.store.tasks;
  },
  methods: {
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
          const task_date = new Date(task.date);
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
  },
  computed: {
    tasks_loaded_month() {
      return this.tasks.some((task) => {
        const task_date = new Date(task.date);
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
      const today = new Date(new Date().toISOString().split("T")[0]);
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
    "store.classes": {
      handler(a, b) {
        if (a.length != b.length && this.is_ready) {
          _statuslog("📦 Classes array length changed, calendar updating tasks");
          this.store
            .fetch_classes()
            .then(() => {
              this.run_get_tasks();
            })
            .catch((err) => {
              _statuslog("🔥 Couldn't fetch classes", err);
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
main.calendar {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: var(--padding-calendar);
  padding-top: calc(var(--padding-calendar) * 1.5 + var(--size-calendar-header));
  position: relative;
  /* style */
  background-color: var(--color-calendar);
  border-radius: var(--radius-calendar);
  box-shadow: var(--shadow-highlight);
  /* overflow for loading */
  overflow: hidden;
}
@media (min-width: 1200px) and (max-height: 800px) {
  main.calendar {
    background-color: var(--color-calendar-alt);
  }
}

.calendar_header {
  position: absolute;
  top: calc(var(--padding-calendar) / 2);
  right: calc(var(--padding-calendar) / 2);
  height: var(--size-calendar-header);
  width: calc(100% - var(--padding-calendar));
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: stretch;
}
.calendar_date {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-on-calendar);
  background-color: var(--color-calendar-header);
  border-radius: calc(var(--radius-calendar) / 2);
  padding: 0 calc(var(--padding-calendar) / 2);
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  user-select: none;
}
.calendar_actions {
  display: flex;
  flex-flow: row nowrap;
  flex-grow: 0;
  flex-basis: calc(3 * var(--size-calendar-header));
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  border-radius: calc(var(--radius-calendar) / 2);
  overflow: hidden;
}

.calendar_actions > .calendar_action {
  height: var(--size-calendar-header);
  width: var(--size-calendar-header);
  background-color: var(--color-calendar-header);
  border: none;
  padding: 0;
}
.calendar_actions > .calendar_action:hover {
  background-color: var(--color-calendar-header-hover);
}
.calendar_actions > .calendar_action > div {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  filter: var(--filter-icon);
  /* img */
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.calendar_action .arrow-icon.left {
  background-image: url(@/assets/img/general/portal/arrow-left.png);
  background-image: url(@/assets/img/general/portal/arrow-left.svg);
}

.calendar_action .cal-icon {
  background-image: url(@/assets/img/general/portal/cal-icon.png);
  background-image: url(@/assets/img/general/portal/cal-icon.svg);
}
.calendar_action .cal-icon.alt {
  background-image: url(@/assets/img/general/portal/cal-icon-alt.png);
  background-image: url(@/assets/img/general/portal/cal-icon-alt.svg);
}
.calendar_actions .arrow-icon.right {
  background-image: url(@/assets/img/general/portal/arrow-right.png);
  background-image: url(@/assets/img/general/portal/arrow-right.svg);
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
  bottom: 0;
  left: 0;
  width: 100%;
  height: var(--spacing-calendar-day);
  user-select: none;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, var(--color-calendar-day) 100%);
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
/* hide paceholder tasks until hover */
.calendar_day.calendar_day__placeholder > * {
  opacity: 0.2;
  transition: opacity 0.2s ease-out;
}
.calendar_day.calendar_day__placeholder:hover > * {
  opacity: 1;
  transition-duration: 0.5s;
}
.calendar_day.calendar_day__placeholder:hover > .calendar_day_tasks {
  visibility: visible;
}
.calendar_day.calendar_day__placeholder {
  opacity: 0.5;
  scale: 0.9;
  transition: opacity 0.2s ease-out, scale 0.2s ease-out;
}
.calendar_day.calendar_day__placeholder:hover {
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
@media (max-width: 600px) {
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
  .calendar_date {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    text-align: center;
    line-height: var(--size-calendar-header);
    height: var(--size-calendar-header);
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
  /* header */
  main.calendar {
    padding: calc(var(--padding-calendar) - var(--spacing-calendar-day));
  }
  .calendar_header {
    position: unset;
    flex-flow: row wrap;
    justify-content: stretch;
    align-items: stretch;
    height: unset;
    margin: 0;
    width: 100%;
  }
  .calendar_header > * {
    flex-basis: 100px;
    flex-shrink: 1;
    flex-grow: 1;
    width: 100%;
    margin: var(--spacing-calendar-day);
  }
  .calendar_actions > .calendar_action {
    flex-grow: 1;
  }
}
</style>
