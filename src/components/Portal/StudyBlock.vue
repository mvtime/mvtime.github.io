<template>
  <main class="study portal_main_block" :class="{ study_fullpage: fullpage }">
    <!-- use LoadingCover component when waiting for ready -->
    <LoadingCover v-if="!is_ready" class="study_loading" covering="Study Tasks" />
    <div class="study_header portal_main_block_header">
      <div class="portal_main_block_header__left">
        <button
          class="portal_main_block_action portal_main_block_action_alt fullpage_toggle_button"
          @click="toggle_fullscreen"
          title="Toggle fullscreen (f)"
        >
          <div class="action_icon expand-icon" :class="{ alt: fullpage }"></div>
        </button>
        <div class="study_name portal_main_block_title">
          Upcoming<span class="desktop_only may_break_text">&nbsp;Assignments</span>
        </div>
      </div>
      <div class="portal_main_block_actions_wrapper">
        <nav class="portal_main_block_actions portal_main_block_actions_freeform">
          <button
            class="portal_main_block_action portal_main_block_action_freeform portal_main_block_action__text"
            @click="sort = group[0]"
            :title="`${group[2]} (${group[3]})`"
            v-for="group in sorts"
            :key="group[0]"
            :class="{ active: sort == group[0] }"
          >
            {{ group[1] }}
          </button>
        </nav>
        <nav class="portal_main_block_actions portal_main_block_actions_freeform">
          <button
            class="portal_main_block_action portal_main_block_action_freeform portal_main_block_action__text"
            @click="days = length[0]"
            :title="`${length[2]} (${length[3]})`"
            v-for="length in lengths"
            :key="length[0]"
            :class="{ active: days == length[0] }"
          >
            {{ length[1] }}
          </button>
        </nav>
        <button
          v-if="$route.name != 'studysession'"
          class="portal_main_block_action portal_main_block_action_alt"
          title="Create Study Session (s)"
          @click="start_session"
        >
          <div class="action_icon session-icon"></div>
        </button>
        <button
          class="portal_main_block_action portal_main_block_action_alt"
          title="View Calendar (c)"
          @click="swap_to_calendar"
        >
          <div
            class="action_icon cal-icon"
            :class="{ alt: $store.upcoming && $store.upcoming.length }"
          ></div>
        </button>
      </div>
    </div>
    <transition-group
      v-if="sort == 'classes'"
      class="study_list_group study_list_group__classes"
      name="study-group"
      tag="div"
      :class="{ filtered: filtered_classes.length }"
    >
      <div
        class="study_list"
        v-for="list in arranged_classes"
        :key="sort == 'classes' ? list[0].class_id : list[0].date.toISOString().split('T')[0]"
        :style="{
          '--color-class':
            sort == 'classes' ? classes[list[0].class_id].color : 'var(--color-on-calendar)',
          '--color-class-alt':
            sort == 'classes' ? classes[list[0].class_id].color + '2d' : 'var(--color-on-bg)',
        }"
      >
        <a
          class="study_list__name study_list__name__classes"
          v-if="sort == 'classes'"
          :href="`/view/${$store.path_to_ref(classes[list[0].class_id].ref)}`"
        >
          {{ list[0].class_name }}</a
        >
        <div class="study_list__name study_list__name__days" v-else>
          {{ list[0].date.toLocaleDateString(undefined, { month: "long", day: "numeric" }) }}
        </div>
        <hr class="study_list__separator" />
        <transition-group class="study_list_tasks" name="study-list" tag="div">
          <div
            class="study_list_task"
            v-for="task in list"
            :key="task.ref"
            :finished="is_finished(task.ref)"
            :style="{
              '--color-class': classes[task.class_id].color,
              '--color-class-alt': classes[task.class_id].color + '2d',
            }"
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
              :href="'/view/' + $store.path_to_ref(task.ref)"
            >
              <span class="study_list_task__name__text"
                >{{ $magic.prefix(task) }} {{ task.name }}</span
              >
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
    <transition-group
      v-else
      class="study_list_group study_list_group__dates"
      name="study-group"
      tag="div"
      :class="{ filtered: filtered_classes.length }"
    >
      <div
        class="study_list"
        v-for="list in arranged_dates"
        :key="list[0].date.toISOString().split('T')[0]"
        :style="{
          '--color-class': 'var(--color-on-calendar)',
          '--color-class-alt': 'var(--color-on-bg)',
        }"
      >
        <a
          class="study_list__name study_list__name__classes"
          v-if="sort == 'classes'"
          :href="`/view/${$store.path_to_ref(classes[list[0].class_id].ref)}`"
        >
          {{ list[0].class_name }}</a
        >
        <div class="study_list__name study_list__name__days" v-else>
          {{ list[0].date.toLocaleDateString(undefined, { month: "long", day: "numeric" }) }}
        </div>
        <hr class="study_list__separator" />
        <transition-group class="study_list_tasks" name="study-list" tag="div">
          <div
            class="study_list_task"
            v-for="task in list"
            :key="task.ref"
            :finished="is_finished(task.ref)"
            :style="{
              '--color-class': classes[task.class_id].color,
              '--color-class-alt': classes[task.class_id].color + '2d',
            }"
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
              :href="'/view/' + $store.path_to_ref(task.ref)"
            >
              <span class="study_list_task__name__text"
                >{{ $magic.prefix(task) }} {{ task.name }}</span
              >
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
import LoadingCover from "@/components/LoadingCover.vue";
export default {
  name: "StudyBlock",
  components: {
    LoadingCover,
  },
  props: {
    filtered_classes: { Array, default: () => [] },
    fullpage: { Boolean, default: false },
  },
  emits: ["taskclick", "mounted"],
  data() {
    return {
      sort: "classes",
      sorts: [
        ["classes", "Class", "Group tasks by course section", "g"],
        ["dates", "Date", "Group tasks by end date", "t"],
      ],
      tasks: [],
      is_ready: false,
      days: 7,
      lengths: [
        [1, "Day", "Tasks today", "d"],
        [7, "Week", "Tasks in the next week", "w"],
        [31, "Month", "Tasks in the next month", "m"],
        [Number.MAX_SAFE_INTEGER, "All", "All upcoming tasks", "a"],
      ],
    };
  },
  mounted() {
    this.$status.log("👓 Study page mounted");
    this.$emit("mounted");
    this.tasks = this.$store.tasks;
    window.addEventListener("keydown", this.handle_key);
    this.$shortcuts.register_all(this.shortcuts, "Study Portal");
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handle_key);
    this.$shortcuts.remove_tag("Study Portal");
  },
  computed: {
    shortcuts() {
      return [
        {
          key: "f",
          description: "Toggle fullscreen",
          top: true,
        },
        {
          key: "` or c",
          description: "Swap to calendar",
          top: true,
        },
        {
          key: "s",
          description: "Create study session",
          top: true,
        },
        ...this.lengths.map((item) => {
          return {
            key: item[3],
            description: `View ${item[1].toLowerCase()} tasks`,
          };
        }),
      ];
    },
    classes() {
      // turn classes array into an object with class_id as key
      let classes = {};
      for (let class_obj of this.$store.classes) {
        classes[class_obj.id] = class_obj;
      }
      return classes;
    },
    filtered_tasks() {
      // select tasks that are in the filtered classes, and within the selected time period
      let filtered = this.tasks?.filter(
        (task) => !this.filtered_classes.length || this.filtered_classes.includes(task.class_id)
      );
      const now = Date.now();
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
        let a_finished = this.$store.finished_tasks.includes(a.ref);
        let b_finished = this.$store.finished_tasks.includes(b.ref);
        if (a_finished && !b_finished) return 1;
        if (!a_finished && b_finished) return -1;
        return 0;
      });
      return filtered;
    },
    arranged_classes() {
      return this.arranged("classes");
    },
    arranged_dates() {
      return this.arranged("dates");
    },
  },
  methods: {
    arranged(sort) {
      // sort tasks into an array of arrays, where each array is a class and its tasks are sorted by date
      let tasks = this.filtered_tasks;
      let arranged = {};
      for (let task of tasks) {
        if (sort == "classes") {
          if (!arranged[task.class_id]) arranged[task.class_id] = [];
          arranged[task.class_id].push(task);
        } else {
          let date = task.date.toISOString().split("T")[0];
          if (!arranged[date]) arranged[date] = [];
          arranged[date].push(task);
        }
      }
      // create an array of arrays, order by the period value of each class
      let arranged_array = [];
      for (let sort in arranged) {
        arranged_array.push(arranged[sort]);
      }
      arranged_array.sort((a, b) => {
        if (sort == "classes") {
          let a_class = this.classes[a[0].class_id];
          let b_class = this.classes[b[0].class_id];
          return a_class.period - b_class.period;
        } else {
          if (a[0].date < b[0].date) return -1;
          if (a[0].date > b[0].date) return 1;
          return 0;
        }
      });
      return arranged_array;
    },
    toggle_fullscreen() {
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
      if (event.ctrlKey || event.metaKey || event.shiftKey || this.$route.name != "study") return;
      if (event.key == "f") {
        this.toggle_fullscreen();
      } else if (event.key == "c" || event.key == "`") {
        this.swap_to_calendar();
      } else if (event.key == "s") {
        this.start_session();
      } else {
        let length = this.lengths.find((item) => item[3] == event.key);
        if (length) {
          this.days = length[0];
        }
      }
    },
    swap_to_calendar() {
      this.$router.push({ name: "portal", query: this.$route.query });
    },
    start_session() {
      this.$router.push({ name: "studysession", query: this.$route.query });
    },
    run_get_tasks() {
      this.tasks = this.$store.tasks;
      this.is_ready = true;
    },
    is_finished(ref) {
      return this.$store.finished_tasks?.includes(ref);
    },
    toggle_finished(ref) {
      this.$store
        .set_finished(!this.is_finished(ref), ref)
        .then(() => {
          this.$status.log("📦 Task completion status set");
        })
        .catch((err) => {
          this.$status.error("🔥 Couldn't set task finished", err);
        });
    },
  },
  // watch for $store.classes change
  watch: {
    "$store.classes": {
      handler(a, b) {
        if (a.length != b.length && this.is_ready) {
          this.$status.log("📦 Classes array length changed, calendar updating tasks");
          this.$store
            .fetch_classes()
            .then(() => {
              this.run_get_tasks();
            })
            .catch((err) => {
              this.$status.error("🔥 Couldn't fetch classes", err);
            });
        }
      },
      deep: true,
    },
    "$store.tasks": {
      handler() {
        this.tasks = this.$store.tasks;
      },
      deep: true,
    },
    $route: {
      handler() {
        if (this.$route.name == "study" && this.$route.query.selected) {
          this.$router.replace({
            query: {
              ...this.$route.query,
              selected: undefined,
              time: undefined,
              passed: undefined,
            },
          });
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
/* NON-FULLPAGE */

/* list animations */
.study-group-move,
.study_list:not(.study-group-move) .study-list-move {
  transition: transform 0.2s ease-out;
}
.study-group-enter-active {
  animation: scale-in 0.15s ease-out;
}
.study-group-leave-active {
  animation: scale-out 0.15s ease-in;
  /* transform-origin: left center; */
}

.parent.simplified .study_list_group * {
  transition: none !important;
  animation: none !important;
}
/* enter and leave animations */
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
  height: 16px;
  width: 16px;
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
  transform-origin: center center;
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

.study_list_task_checkbox__fixed:hover:not(.study-list-move) .study_list_task_checkbox__dot {
  height: 12px;
  width: 12px;
  border-radius: 4px;
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
    flex-basis: auto;
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

/* fullpage */
.fullpage_toggle_button {
  display: none;
  background: transparent;
  border: solid var(--color-calendar-header) 2px;
}
@media (max-width: 1285px) and (min-width: /* [desktop size] */ 1270px),
  (min-width: 630px) and (max-width: 805px) {
  .may_break_text {
    display: none;
  }
}
@media (min-width: 695px) {
  main.study.study_fullpage {
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
  .portal_bottom_bar_container + main.study.study_fullpage {
    padding-bottom: calc(var(--height-bottom-bar) + var(--padding-calendar));
  }
  .fullpage_toggle_button {
    display: flex;
  }
  main.study.study_fullpage .study_list_group:not(:empty) {
    max-height: unset;
    height: 100%;
  }
}
@media (min-width: 800px) {
  main.study.study_fullpage .study_list_group:not(:empty) {
    max-height: 550px;
    align-content: center;
  }
}
@media (min-width: 800px) and (min-height: 720px) {
  main.study.study_fullpage .study_list_group:not(:empty) {
    margin-top: calc(
      (
          100vh - (var(--padding-calendar) * 1.5 + var(--size-calendar-header)) -
            var(--padding-calendar) - 550px
        ) / 2
    );
  }
  .portal_bottom_bar_container + main.study.study_fullpage .study_list_group:not(:empty) {
    margin-top: calc(
      (
          100vh - (var(--padding-calendar) * 1.5 + var(--size-calendar-header)) -
            var(--height-bottom-bar) - var(--padding-calendar) - 550px
        ) / 2
    );
  }
}
</style>
<style>
@media (min-width: 675px) {
  .portal:has(main.study.study_fullpage) .portal_sidebar {
    z-index: 0;
  }
}
</style>
