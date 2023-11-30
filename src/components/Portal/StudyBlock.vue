<template>
  <main class="study portal_main_block">
    <!-- use LoadingCover component when waiting for ready -->
    <LoadingCover v-if="!is_ready" class="study_loading" covering="Study Tasks" />
    <div class="study_header portal_main_block_header">
      <div class="study_name portal_main_block_title">
        Upcoming<span class="desktop_only_text">&nbsp;Assignments</span>
      </div>
      <div class="portal_main_block_actions_wrapper">
        <nav class="portal_main_block_actions portal_main_block_actions_freeform">
          <button
            class="portal_main_block_action portal_main_block_action_freeform portal_main_block_action__text"
            @click="days = length[0]"
            :title="length[2]"
            v-for="length in lengths"
            :key="length[0]"
            :class="{ active: days == length[0] }"
          >
            {{ length[1] }}
          </button>
        </nav>
        <button
          class="portal_main_block_action portal_main_block_action_alt"
          title="View Calendar"
          @click="swap_to_calendar"
        >
          <div
            class="action_icon cal-icon"
            :class="{ alt: store.upcoming && store.upcoming.length }"
          ></div>
        </button>
      </div>
    </div>
    <transition-group
      name="study-group"
      class="study_list_group"
      tag="div"
      :class="{ filtered: filtered_classes.length }"
    >
      <div
        class="study_list"
        v-for="list in arranged"
        :key="list[0].class_id"
        :style="{
          '--color-class': classes[list[0].class_id].color,
          '--color-class-alt': classes[list[0].class_id].color + '2d',
        }"
      >
        <a
          class="study_list__name"
          :href="'/view/' + store.path_to_ref(classes[list[0].class_id].ref)"
        >
          {{ list[0].class_name }}</a
        >
        <hr class="study_list__separator" />
        <transition-group class="study_list_tasks" name="study-list" tag="div">
          <div
            class="study_list_task"
            v-for="task in list"
            :key="task.ref"
            :finished="is_finished(task.ref)"
          >
            <label
              :for="task.ref"
              class="study_list_task_checkbox"
              :title="'Mark task as ' + (is_finished(task.ref) ? 'unfinished' : 'finished')"
              @click="toggle_finished(task.ref)"
            >
              <div class="study_list_task_checkbox__fixed">
                <span class="study_list_task_checkbox__dot"></span>
              </div>
            </label>
            <a
              class="study_list_task__name study_list_task__boxed"
              :for="task.ref"
              @click="
                $emit('taskclick', task);
                $event.preventDefault();
              "
              :href="'/view/' + store.path_to_ref(task.ref)"
            >
              <span class="study_list_task__name__text">{{ task.name }}</span>
            </a>
            <span class="study_list_task__date study_list_task__boxed">{{
              (task.date &&
                task.date.toLocaleDateString(undefined, { month: "numeric", day: "numeric" })) ||
              "Invalid Date"
            }}</span>
          </div>
        </transition-group>
      </div>
    </transition-group>
  </main>
</template>

<script>
import "@/assets/style/portal_main.css";
import { useMainStore } from "@/store";
import LoadingCover from "@/components/LoadingCover.vue";
import { _status } from "@/common";
export default {
  name: "StudyBlock",
  components: {
    LoadingCover,
  },
  props: {
    filtered_classes: { Array, default: () => [] },
  },
  emits: ["taskclick", "mounted"],
  data() {
    return {
      tasks: [],
      is_ready: false,
      days: 7,
      lengths: [
        [1, "Day", "Tasks today"],
        [7, "Week", "Tasks in the next month"],
        [31, "Month", "Tasks in the next year"],
        [Number.MAX_SAFE_INTEGER, "All", "All upcoming tasks"],
      ],
    };
  },
  mounted() {
    _status.log("👓 Study page mounted");
    this.$emit("mounted");
    this.tasks = this.store.tasks;
  },
  computed: {
    store() {
      return useMainStore();
    },
    classes() {
      // turn classes array into an object with class_id as key
      let classes = {};
      for (let class_obj of this.store.classes) {
        classes[class_obj.id] = class_obj;
      }
      return classes;
    },
    filtered_tasks() {
      // select tasks that are in the filtered classes, and within the selected time period
      let filtered = this.tasks?.filter(
        (task) => !this.filtered_classes.length || this.filtered_classes.includes(task.class_id)
      );
      const now = Date.now(); // new Date().setHours(0, 0, 0, 0);
      // 16 hours in ms (show today's tasks as upcoming until 4PM)
      const morning = 16 * 60 * 60 * 1000;
      filtered = filtered
        .filter((task) => {
          const diff = task?.date?.getTime ? task.date.getTime() : 0;
          return (
            task.type != "note" &&
            diff >= now - morning &&
            diff <= now + this.days * 24 * 60 * 60 * 1000
          );
        })
        .sort((a, b) => {
          if (a.date < b.date) return -1;
          if (a.date > b.date) return 1;
          return 0;
        });

      // sort those with is_finished = false to the top
      filtered.sort((a, b) => {
        let a_finished = this.store.finished_tasks.includes(a.ref);
        let b_finished = this.store.finished_tasks.includes(b.ref);
        if (a_finished && !b_finished) return 1;
        if (!a_finished && b_finished) return -1;
        return 0;
      });
      return filtered;
    },
    arranged() {
      // sort tasks into an array of arrays, where each array is a class and its tasks are sorted by date
      let tasks = this.filtered_tasks;
      let arranged = {};
      for (let task of tasks) {
        if (!arranged[task.class_id]) arranged[task.class_id] = [];
        arranged[task.class_id].push(task);
      }
      // create an array of arrays, order by the period value of each class
      let arranged_array = [];
      for (let class_id in arranged) {
        arranged_array.push(arranged[class_id]);
      }
      arranged_array.sort((a, b) => {
        let a_class = this.classes[a[0].class_id];
        let b_class = this.classes[b[0].class_id];
        return a_class.period - b_class.period;
      });
      return arranged_array;
    },
  },
  methods: {
    swap_to_calendar() {
      this.$router.push({ name: "portal" });
    },
    run_get_tasks() {
      this.tasks = this.store.tasks;
      this.is_ready = true;
    },
    is_finished(ref) {
      return this.store.finished_tasks.includes(ref);
    },
    toggle_finished(ref) {
      this.store
        .set_finished(!this.is_finished(ref), ref)
        .then(() => {
          _status.log("📦 Task completion status set");
        })
        .catch((err) => {
          _status.error("🔥 Couldn't set task finished", err);
        });
    },
  },
  // watch for store.classes change
  watch: {
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
/* list animations */
.study-group-move,
.study_list:not(.study-group-move) .study-list-move {
  transition: transform 0.2s ease-out;
}
/* main */
.study_name {
  max-width: fit-content;
}
.study_list_group:empty::before {
  content: "No upcoming tasks found";
  color: var(--text-color);
  font-weight: 500;
  opacity: 0.5;
  text-align: center;
  width: 100%;
  height: 100%;
  padding-bottom: calc(var(--padding-calendar) * 0.5 + var(--size-calendar-header));
  display: flex;
  align-items: center;
  justify-content: center;
}
.study_list_group.filtered:empty::before {
  content: "No upcoming tasks found in selected classes";
}

.study_list_group:not(:empty) {
  display: flex;
  align-content: flex-start;
  justify-content: flex-start;
  flex-flow: column wrap;
  gap: 10px;
  max-height: 450px;
  height: 70vh;
  overflow-y: auto;
}
.study_list_group:not(:empty)::-webkit-scrollbar-corner {
  display: none;
}
.study_list_group:not(:empty)::-webkit-scrollbar {
  background: var(--color-calendar);
}

.study_list_group:not(:empty)::-webkit-scrollbar-thumb {
  width: 8px;
  height: 8px;
  background: var(--color-calendar-header);
  border-radius: 10px;
  border: 4px solid var(--color-calendar);
}

.study_list_group:empty {
  max-height: 70vh;
  height: 450px;
}

.study_list {
  color: var(--color-class);
  background-color: var(--color-class-alt);
  padding: var(--padding-study-class);
  border-radius: var(--radius-calendar-day);
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap-study-class);
  flex: 1 1 160px;
  width: 50%;
  max-width: 300px;
}
.study_list .study_list__name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-class);
}
.study_list hr.study_list__separator {
  border: 0;
  height: 2px;
  background-color: var(--color-class);
  opacity: 0.5;
  margin: 0;
}
.study_list_tasks {
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
}
.study_list_tasks .study_list_task {
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
}

.study_list_tasks .study_list_task .study_list_task_checkbox {
  height: var(--height-calendar-task);
  opacity: 0;
  width: 0;
  scale: 0;
  flex-shrink: 0;
  flex-grow: 0;
  border-radius: 5px;
  transition: width 0.15s ease-in-out, opacity 0.125s 0.025s ease-in-out, scale 0.15s ease-in-out;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;
}

.study_list_task_checkbox .study_list_task_checkbox__fixed {
  height: var(--height-calendar-task);
  min-width: var(--height-calendar-task);
  display: flex;
  /* flex-flow: row nowrap;
  justify-content: center;
  align-items: center; */
  position: relative;
}

.study_list_task_checkbox__dot {
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80%;
  width: 80%;
  opacity: 0.75;
  background-color: var(--color-class);
  transition: width 0.15s ease-in-out, height 0.15s ease-in-out, opacity 0.15s ease-in-out,
    border-radius 0.15s ease-in-out;
}
/* active state */
.study_list_task[finished="true"] .study_list_task_checkbox__dot {
  border-radius: var(--height-calendar-task);
  height: 8px;
  width: 8px;
  opacity: 0.4;
}

.study_list_task[finished="true"]
  .study_list_task_checkbox__fixed:hover:not(.study-list-move)
  .study_list_task_checkbox__dot {
  opacity: 0.6;
}

.study_list_tasks .study_list_task .study_list_task__boxed {
  white-space: nowrap;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: clip;
  position: relative;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 5px;
  height: var(--height-calendar-task);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition: margin-left 0.15s ease-in-out, padding 0.15s ease-in-out, width 0.15s ease-out,
    opacity 0.15s ease-out;
}

.study_list_tasks .study_list_task .study_list_task__date {
  margin-left: var(--gap-study-checkbox);
  flex-shrink: 0;
  flex-grow: 0;
  width: 4em;
  opacity: 0.6;
  user-select: none;
  cursor: default;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  text-overflow: clip;
}

.study_list_tasks .study_list_task[finished="true"] .study_list_task__boxed.study_list_task__date {
  opacity: 0;
  padding: var(--padding-calendar-task) 0;
  width: 0;
  margin-left: 0;
}

.study_list_tasks .study_list_task .study_list_task__name {
  cursor: pointer;
}

.study_list_tasks .study_list_task .study_list_task__name .study_list_task__name__text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  display: inline-block;
}
.study_list_tasks .study_list_task:not([finished="true"]) .study_list_task__boxed {
  filter: var(--filter-calendar-task);
  padding: var(--padding-calendar-task);
  color: var(--color-on-calendar-task);
  background-color: var(--color-class);
}
.study_list_tasks .study_list_task[finished="true"] .study_list_task__boxed {
  text-decoration: line-through;
  filter: var(--filter-calendar-task);
  padding: var(--padding-calendar-task);
  color: var(--color-class);
  opacity: 0.5;
}

/* hover and mobile */
.study_list_task:hover:not(.study-list-move) .study_list_task_checkbox {
  width: var(--height-calendar-task);
  opacity: 1;
  scale: 1;
}

.study_list_tasks .study_list_task:hover:not(.study-list-move) .study_list_task__boxed {
  margin-left: var(--gap-study-checkbox);
}

@media (max-width: 630px) {
  .study_list_group {
    padding: var(--spacing-calendar-day);
  }
  .study_list_tasks .study_list_task .study_list_task_checkbox {
    width: var(--height-calendar-task);
    opacity: 1;
    scale: 1;
  }

  .study_list_tasks .study_list_task .study_list_task__boxed {
    margin-left: var(--gap-study-checkbox);
  }
  .study_list_group:not(:empty) {
    display: flex;
    flex-flow: column nowrap;
    gap: 10px;
    max-height: unset;
    height: auto;
  }
  .study_list {
    flex: 1 1 auto;
    max-width: unset;
    width: 100%;
  }
  @media (max-width: 450px) {
    .portal_main_block_title.study_name {
      display: none;
    }
  }
}
@media (max-width: /* [desktop size] */ 1270px) and (min-width: 600px) {
  .study_list {
    max-width: 33.33%;
    min-height: 120px;
    flex-shrink: 0;
  }
}
@media (max-width: 800px) and (min-width: 600px) {
  .study_list_group:not(:empty) {
    flex-flow: row wrap;
  }
  .study_list {
    flex-basis: 33.33%;
    max-width: calc(50% - 5px);
  }
}
</style>
