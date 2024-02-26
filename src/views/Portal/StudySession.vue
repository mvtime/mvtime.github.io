<template>
  <main class="entercode">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">{{ pages[page].title || "Study Session" }}</h2>
    </header>
    <div class="overlay_contents" ref="contents">
      <div class="overlay_contents_text" v-if="upcoming_selected.length">
        Selected tasks for this session (click to remove)
      </div>
      <div class="tasks_list_wrapper selected_tasks_wrapper" v-if="upcoming_selected.length">
        <transition-group class="tasks_list tasks_list__selected" tag="div" name="tasks-list">
          <div
            class="tasks_list_task"
            v-for="task in upcoming_selected"
            :key="task.ref"
            @click="toggle_task(task.ref)"
            :style="{
              '--color-class': classes[task.class_id].color,
              '--color-class-alt': classes[task.class_id].color + '2d',
            }"
          >
            <div class="tasks_list_task__title">{{ $magic.prefix(task) }} {{ task.name }}</div>
            <div class="tasks_list_task__date">
              {{
                (task.date &&
                  task.date.toLocaleDateString(undefined, { month: "numeric", day: "numeric" })) ||
                "Invalid Date"
              }}
            </div>
          </div>
        </transition-group>
        <div class="tasks_list__cover"></div>
      </div>
      <div class="overlay_contents_text">
        Select tasks for completion during this session by clicking them where they're listed below
      </div>
      <div class="tasks_list_wrapper unselected_tasks_wrapper">
        <transition-group class="tasks_list" tag="div" name="tasks-list">
          <div
            class="tasks_list_task"
            v-for="task in upcoming_unselected"
            :key="task.ref"
            @click="toggle_task(task.ref)"
            :style="{
              '--color-class': classes[task.class_id].color,
              '--color-class-alt': classes[task.class_id].color + '2d',
            }"
          >
            <div class="tasks_list_task__title">{{ $magic.prefix(task) }} {{ task.name }}</div>
            <div class="tasks_list_task__date">
              {{
                (task.date &&
                  task.date.toLocaleDateString(undefined, { month: "numeric", day: "numeric" })) ||
                "Invalid Date"
              }}
            </div>
          </div>
        </transition-group>
        <div class="tasks_list__cover"></div>
      </div>
      <div class="overlay_contents_text">
        If a task is not listed, it may be due to the task being completed or having already passed
        its due date.
      </div>
    </div>
    <div class="bottom_actions">
      <button
        class="close_action click_escape"
        @click="
          $router.push({
            name: 'study',
            query: {
              calendar: $route.query.calendar,
            },
          })
        "
      >
        {{ running ? "Cancel" : "Close" }}
      </button>
      <div class="timer_info" v-if="running">
        <span class="time_info_part time_info__elapsed">{{ msToTime(time.elapsed) }}</span>
        &nbsp;/&nbsp;
        <span class="time_info_part time_info__total">{{ msToTime(time.total) }}</span>
      </div>
      <div class="flex_spacer"></div>
      <button
        class="continue_action click_ctrlenter"
        v-if="pages[page].magic"
        @click="generate_order"
        :disabled="!selected.length"
      >
        <span>{{ pages[page].magic }}</span>
      </button>
      <button
        class="continue_action click_ctrlenter"
        @click="running ? pause : begin"
        :disabled="!selected.length"
      >
        {{
          (running
            ? paused
              ? pages[page].button.paused
              : pages[page].button.running
            : pages[page].button.stopped) || "Next"
        }}
      </button>
    </div>
  </main>
</template>

<script>
import "@/assets/style/overlay.css";
import { msToTime } from "@/common";
import smoothReflow from "vue-smooth-reflow";

export default {
  name: "StudySession",
  mixins: [smoothReflow],
  emits: ["close"],
  mounted() {
    this.$smoothReflow({
      el: this.$refs.contents,
      hideOverflow: true,
      childTransitions: true,
    });
  },
  data() {
    return {
      page: "select",
      pages: {
        select: {
          title: "Select Session Tasks",
          button: {
            stopped: "Select",
          },
        },
        order: {
          title: "Order Session Tasks",
          button: {
            stopped: "Confirm",
          },
          magic: "Generate",
        },
        timer: {
          title: "Session Timer",
          button: {
            paused: "Resume",
            running: "Pause",
          },
        },
        finish: {
          title: "Finish Session",
        },
        review: {
          title: "Review Session",
        },
      },
      running: false,
      paused: false,
      time: {
        elapsed: 0,
        total: 0,
      },
      selected: [],
    };
  },
  computed: {
    upcoming_selected() {
      return this.$store.upcoming.filter((task) => this.selected.includes(task.ref));
    },
    upcoming_unselected() {
      return this.$store.upcoming.filter((task) => !this.selected.includes(task.ref));
    },
    classes() {
      // turn classes array into an object with class_id as key
      let classes = {};
      for (let class_obj of this.$store.classes) {
        classes[class_obj.id] = class_obj;
      }
      return classes;
    },
  },
  methods: {
    msToTime,
    toggle_task(ref) {
      if (this.selected.includes(ref)) {
        this.selected = this.selected.filter((task) => task !== ref);
      } else {
        this.selected.push(ref);
      }
    },
  },
};
</script>

<style scoped>
.tasks-list-move {
  transition: transform 0.2s ease-out;
}
.tasks-list-enter-active {
  animation: scale-in 0.15s ease-out;
}
.tasks-list-exit-active {
  animation: scale-out 0.15s ease-out;
}
@keyframes scale-in {
  0% {
    scale: 0.9;
    opacity: 0;
  }
  100% {
    scale: 1;
    opacity: 1;
  }
}
@keyframes scale-out {
  0% {
    scale: 1;
    opacity: 1;
  }
  100% {
    scale: 0.8;
    opacity: 0;
  }
}
/* rest of styles */
.timer_info {
  line-height: var(--height-overlay-action);
  cursor: unset;
  user-select: none;
}
.tasks_list_wrapper {
  position: relative;
  border-radius: var(--radius-overlay-input);
}
.tasks_list {
  margin: var(--padding-overlay-input) 0;
  width: 100%;
  background-color: var(--color-overlay-input);
  color: var(--color-on-overlay-input);
  border: none;
  border-radius: var(--radius-overlay-input);
  padding: var(--padding-overlay-input);
  max-height: 200px;
  overflow-y: auto;
  position: relative;
}
.tasks_list__selected {
  max-height: 100px;
}
.tasks_list ~ .tasks_list__cover {
  pointer-events: none;
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 2;
  border-radius: var(--radius-overlay-input);
  overflow: hidden;
}
.tasks_list__cover::before,
.tasks_list__cover::after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  z-index: 1;
  left: 0;
  height: var(--padding-overlay-input);
}
.tasks_list__cover::before {
  top: 0;
  background: linear-gradient(
    to bottom,
    var(--color-overlay-input) 0%,
    #00000000 var(--padding-overlay-input)
  );
}
.tasks_list__cover::after {
  bottom: 0;
  background: linear-gradient(
    to top,
    var(--color-overlay-input) 0%,
    #00000000 var(--padding-overlay-input)
  );
}
.tasks_list::-webkit-scrollbar {
  background: var(--color-overlay-input);
  border-radius: var(--radius-overlay-input);
  width: 20px;
  /* TODO: */
  display: none;
}
.tasks_list::-webkit-scrollbar-thumb {
  background: var(--color-on-overlay-input-alt);
  border-radius: calc(var(--radius-overlay-input) + 6px);
  border: 6px solid var(--color-overlay-input);
}

.tasks_list:empty::before {
  content: "No more upcoming tasks found";
  color: var(--text-color);
  font-weight: 500;
  opacity: 0.5;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc (var(--padding-overlay-input) * 2) 0;
}

.tasks_list {
  display: flex;
  flex-flow: column nowrap;
  gap: 7px;
  height: auto;
}

/* tasks */
.tasks_list_task {
  cursor: pointer;
  user-select: none;
  /* from boxed */
  white-space: nowrap;
  flex: 0 0 auto;
  overflow: hidden;
  text-overflow: clip;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 5px;
  height: var(--height-calendar-task);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.tasks_list_task > div {
  filter: var(--filter-calendar-task);
  padding: var(--padding-calendar-task);
  color: var(--color-on-calendar-task);
  background-color: var(--color-class);
  border-radius: 5px;
  text-align: center;
}
.tasks_list_task__title {
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 5px;
  height: 100%;
}
.tasks_list_task__date {
  margin-left: var(--gap-study-checkbox);
  flex-shrink: 0;
  flex-grow: 0;
  width: 4em;
  opacity: 0.6;
  height: 100%;
}
.tasks_list:not(.tasks_list__selected) .tasks_list_task {
  font-style: italic;
}
</style>
