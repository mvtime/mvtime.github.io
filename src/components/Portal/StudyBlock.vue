<template>
  <main class="study portal_main_block">
    <!-- use LoadingCover component when waiting for ready -->
    <LoadingCover v-if="!is_ready" class="study_loading" covering="Study Tasks" />
    <div class="study_header portal_main_block_header">
      <div class="study_name portal_main_block_title">
        Upcoming<span class="desktop_only_text">&nbsp;Assignments</span>
      </div>
      <div class="portal_main_block_actions_wrapper">
        <button
          class="portal_main_block_action portal_main_block_action_alt"
          title="View Calendar"
          @click="swap_to_calendar"
        >
          <div class="action_icon cal-icon"></div>
        </button>
      </div>
    </div>
    <div class="study_list_group">
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
          >{{ list[0].class_name }}</a
        >
        <hr class="study_list__separator" />
        <div class="study_list_tasks">
          <div
            class="study_list_task"
            v-for="task in list"
            :key="task.ref"
            :finished="is_finished(task.ref)"
          >
            <label for="task.ref" class="study_list_task_checkbox" title="Mark task as done/undone">
              <div class="study_list_task_checkbox__fixed">
                <span class="study_list_task_checkbox__dot"></span>
              </div>
            </label>
            <div class="study_list_task__boxed" :for="task.ref" @click="$emit('taskclick', task)">
              {{ task.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
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
    };
  },
  mounted() {
    _status.log("👓 Study page mounted");
    this.$emit("mounted");
    this.tasks = this.store.upcoming;
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
      // select tasks that are in the filtered classes, and within a week of the current date
      let filtered = this.tasks.filter(
        (task) => !this.filtered_classes.length || this.filtered_classes.includes(task.class_id)
      );
      // sort those with is_finished = false to the top
      filtered.sort((a, b) => {
        let a_finished = this.is_finished(a.ref);
        let b_finished = this.is_finished(b.ref);
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
      return arranged;
    },
  },
  methods: {
    swap_to_calendar() {
      this.$router.push({ name: "portal" });
    },
    run_get_tasks() {
      this.tasks = this.store.upcoming;
      this.is_ready = true;
    },
    is_finished(ref) {
      //   return this.store.tasks[ref].finished;
      void ref;
      return false;
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
        this.tasks = this.store.upcoming;
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
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
  height: 100px;
  padding-bottom: calc(var(--padding-calendar) * 0.5 + var(--size-calendar-header));
  display: flex;
  align-items: center;
  justify-content: center;
}

.study_list_group:not(:empty) {
  display: flex;
  flex-flow: column wrap;
  gap: 10px;
  max-height: 450px;
  height: 70vh;
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
  width: 0;
  border-radius: 5px;
  transition: width 0.15s ease-in-out;
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
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.study_list_task_checkbox__dot {
  border-radius: 5px;
  height: 80%;
  width: 80%;
  opacity: 0.75;
  background-color: var(--color-class);
  transition: width 0.15s ease-in-out, height 0.15s ease-in-out, opacity 0.15s ease-in-out;
}
/* active state */
.study_list_task[finished="true"] .study_list_task_checkbox__dot {
  border-radius: var(--height-calendar-task);
  height: 8px;
  width: 8px;
  opacity: 0.4;
}

.study_list_task_checkbox.checked .study_list_task_checkbox__fixed {
  opacity: 1;
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
  text-align: center;
  height: var(--height-calendar-task);
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition: margin-left 0.15s ease-in-out;
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
.study_list_task:hover .study_list_task_checkbox,
.study_list_task.active .study_list_task_checkbox {
  width: var(--height-calendar-task);
}

.study_list_tasks .study_list_task:hover .study_list_task__boxed,
.study_list_tasks .study_list_task.active .study_list_task__boxed {
  margin-left: var(--gap-study-checkbox);
}

@media (max-width: 630px) {
  .study_list_tasks .study_list_task .study_list_task_checkbox {
    width: var(--height-calendar-task);
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
  }
  .study_list_group {
    margin-top: var(--gap-study-class);
  }
}
</style>