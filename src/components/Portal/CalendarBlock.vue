<template>
  <main class="calendar">
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
          <div class="action_icon cal-icon" :class="{ alt: tests.length }"></div>
        </button>
        <button class="calendar_action" @click="next_month" title="Next month">
          <div class="action_icon arrow-icon right"></div>
        </button>
      </nav>
    </div>
    <div class="calendar_days_container">
      <div class="calendar_days">
        <!-- v-for tests -->
        <div
          class="calendar_day"
          :class="{
            calendar_day__placeholder: day.is_placeholder,
            calendar_day__hastest: day.tests ? day.tests.length : false,
            calendar_day__today: day.is_today,
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
          <div class="calendar_day_tests">
            <div
              class="calendar_day_test"
              v-for="test of day.tests"
              :key="test.name"
              :title="test.classes_class"
              :style="{ '--color-calendar-test': test.color }"
              @click="$emit('testclick', test)"
            >
              <span>{{ test.name }}</span>
            </div>
          </div>
        </div>
        <div v-if="!tests_loaded_month" class="calendar__no_tests" style="display: none">
          Relax! No Tests.
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useMainStore } from "@/store";

export default {
  name: "CalendarBlock",
  emits: ["testclick"],
  data() {
    return {
      loaded_month: new Date(new Date().setDate(1)),
    };
  },
  methods: {
    day_matches(day1, day2) {
      return (
        day1.getDate() === day2.getDate() &&
        day1.getMonth() === day2.getMonth() &&
        day1.getFullYear() === day2.getFullYear()
      );
    },
    get_day_tests(day) {
      return this.tests.filter((test) => {
        const test_date = new Date(test.date);
        return this.day_matches(test_date, day);
      });
    },
    next_month() {
      this.loaded_month = new Date(this.loaded_month.setMonth(this.loaded_month.getMonth() + 1));
    },
    this_month() {
      this.loaded_month = new Date(new Date().setDate(1));
    },
    prev_month() {
      this.loaded_month = new Date(this.loaded_month.setMonth(this.loaded_month.getMonth() - 1));
    },
  },
  computed: {
    tests_loaded_month() {
      return this.tests.some((test) => {
        const test_date = new Date(test.date);
        return (
          test_date.getMonth() === this.loaded_month.getMonth() &&
          test_date.getFullYear() === this.loaded_month.getFullYear()
        );
      });
    },
    tests() {
      const store = useMainStore();
      return store.get_tests;
    },
    days() {
      const days = [];
      const this_date = this.loaded_month.getTime();
      function get_this_date() {
        return new Date(this_date);
      }
      const first_day = new Date(get_this_date().setDate(1));
      const last_day = new Date(get_this_date().setMonth(get_this_date().getMonth() + 1, 0));

      // add the placeholders for the first week
      for (let i = first_day.getDay(); i > 0; i--) {
        days.push({
          date: new Date(get_this_date().setDate(-i)),
          is_placeholder: true,
        });
      }
      // do normal days
      for (let i = 1; i <= last_day.getDate(); i++) {
        const month_day = new Date(get_this_date().setDate(i));
        days.push({
          date: month_day,
          tests: this.get_day_tests(month_day),
          is_today: this.day_matches(month_day, new Date()),
        });
      }

      // add however many placeholders we need to get to a full 6 * 7 grid
      for (let i = 1; days.length < 6 * 7; i++) {
        days.push({
          date: get_this_date().setDate(last_day.getDate() + i),
          is_placeholder: true,
        });
      }
      return days;
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
  grid-template-rows: repeat(6, 1fr);
  grid-gap: var(--gap-calendar-day);
  box-sizing: border-box;
  padding: 0;
}
.calendar_days:empty::after {
  content: "No tests scheduled";
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

.calendar_day.calendar_day__placeholder {
  opacity: 0.5;
  /* pointer-events: none; */
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
.calendar_day.calendar_day__placeholder .calendar_day_date {
  display: none;
}
.calendar_day.calendar_day__placeholder:hover > .calendar_day_date {
  display: flex;
}
/* tests */
.calendar_day_tests {
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

/* hide scrollbars on tests list */
.calendar_day_tests::-webkit-scrollbar {
  display: none;
}
.calendar_day_tests {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
/* test styling */
.calendar_day_test {
  white-space: nowrap;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: clip;
  position: relative;
  padding: var(--padding-calendar-test);
  /* colors */
  color: var(--color-on-calendar-test);
  background-color: var(--color-calendar-test);
  /* styles */
  font-size: 0.8rem;
  border-radius: 5px;
  text-align: center;
  height: var(--height-calendar-test);
  filter: var(--filter-calendar-test);
  cursor: pointer;
  /* center contents */
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
}
.calendar_day_test:first-of-type {
  margin-top: auto;
}
.calendar_day_test:not(:last-of-type) {
  margin-bottom: var(--spacing-calendar-day);
}
.calendar_day_test > span {
  text-align: center;
  width: 100%;
  user-select: none;
  pointer-events: none;
}
.calendar_day_test::after {
  content: "";
  display: block;
  width: calc(var(--padding-calendar-test) + 2px);
  height: 100%;
  right: 0;
  top: 0;
  position: absolute;
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, var(--color-calendar-test) 100%);
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
  .calendar_day:not(.calendar_day__hastest) {
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
  .calendar__no_tests {
    display: unset !important;
  }
  .calendar_day_date {
    height: unset;
  }
  .calendar__no_tests {
    color: var(--color-text-on-calendar);
    font-weight: 500;
    text-align: center;
    margin: 10% 0;
  }
  .calendar_day_tests {
    position: unset;
    padding: 0;
    padding-top: 10px;
    flex-flow: row wrap;
    flex-basis: calc(var(--height-calendar-test) + 2 * var(--spacing-calendar-day));
    box-sizing: content-box;
    overflow-y: unset;
  }
  .calendar_day_tests::after,
  .calendar_day::after {
    display: none;
  }
  .calendar_day_test {
    margin: var(--spacing-calendar-day) !important;

    flex-grow: 1;
    white-space: normal;
    height: unset;
    min-height: var(--height-calendar-test);
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
