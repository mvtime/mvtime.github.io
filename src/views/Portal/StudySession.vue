<template>
  <main class="session_wrapper">
    <main class="session">
      <header class="modal_header">
        <h2 class="header_style modal_header_title">
          {{ pages[page].title || "Study Session" }}
        </h2>
      </header>
      <div class="overlay_contents">
        <div class="overlay_contents_main" ref="contents">
          <div class="contents_page select_page" v-if="page == 'select'">
            <div class="overlay_contents_text">
              Select tasks for completion during this session by
              <span class="desktop_only_text">click</span>
              <span class="mobile_only_text">tapp</span>ing them where they're listed below
            </div>
            <nav class="filter_bar">
              <button
                class="filter_bar_option"
                v-for="filter in filters"
                :key="filter.name"
                :class="{ active: filter_days === filter.days }"
                @click="filter_days = filter.days"
              >
                {{ filter.name }}
              </button>
            </nav>
            <div class="tasks_list_wrapper unselected_tasks_wrapper">
              <transition-group
                class="tasks_list alt_bg"
                ref="unselected_list"
                tag="div"
                name="tasks-list"
                :class="{ selected: selected.length, loading_bg: loading }"
              >
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
                  <div class="tasks_list_task__title">
                    <span class="tasks_list_task__title_text"
                      >{{ $magic.prefix(task) }} {{ task.name }}</span
                    >
                  </div>
                  <div class="tasks_list_task__date">
                    {{
                      (task.date &&
                        task.date.toLocaleDateString(undefined, {
                          month: "numeric",
                          day: "numeric",
                        })) ||
                      "Invalid Date"
                    }}
                  </div>
                </div>
              </transition-group>
              <div class="tasks_list__cover"></div>
            </div>
            <div class="overlay_contents_text" v-if="upcoming_selected.length">
              Selected tasks for this session. <span class="desktop_only_text">Click</span>
              <span class="mobile_only_text">Tap</span> to remove or
              <span class="click-action button_pointer_text" @click="selected = []">reset</span>
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
                  <div class="tasks_list_task__title">
                    <span class="tasks_list_task__title_text"
                      >{{ $magic.prefix(task) }} {{ task.name }}</span
                    >
                  </div>
                  <div class="tasks_list_task__date">
                    {{
                      (task.date &&
                        task.date.toLocaleDateString(undefined, {
                          month: "numeric",
                          day: "numeric",
                        })) ||
                      "Invalid Date"
                    }}
                  </div>
                </div>
              </transition-group>
              <div class="tasks_list__cover"></div>
            </div>
            <div class="overlay_contents_text" v-if="!selected">
              If a task is not listed, it may be due to the task being completed or having already
              passed its due date.
            </div>
          </div>
          <div class="contents_page order_page" v-if="page == 'order'">
            <div class="overlay_contents_text">
              Order the tasks for completion during this session by dragging them into the desired
              order
            </div>
            <div class="tasks_list_wrapper order_wrapper selected_tasks_wrapper" ref="order_list">
              <draggable
                group="tasks"
                class="tasks_list order_list"
                :class="{ empty: !selected.length, drag }"
                tag="div"
                :list="selected"
                item-key="ref"
                ghost-class="ghost"
                handle=".tasks_list_task__drag"
                @start="drag = true"
                @end="drag = false"
                @remove="discard = []"
              >
                <template #item="{ element }">
                  <a
                    :href="`/view/${$store.path_to_ref(task_from(element).ref)}`"
                    @click="$event.preventDefault()"
                    v-if="element && task_from(element)"
                    class="tasks_list_task"
                    :style="{
                      '--color-class': classes[task_from(element).class_id].color,
                      '--color-class-alt': classes[task_from(element).class_id].color + '2d',
                    }"
                  >
                    <div class="tasks_list_task__drag"><div class="drag_icon"></div></div>
                    <div class="tasks_list_task__title">
                      <span class="tasks_list_task__title_text">
                        {{ $magic.prefix(task_from(element)) }} {{ task_from(element).name }}
                      </span>
                    </div>
                    <div class="tasks_list_task__date">
                      {{
                        (task_from(element).date &&
                          task_from(element).date.toLocaleDateString(undefined, {
                            month: "numeric",
                            day: "numeric",
                          })) ||
                        "Invalid Date"
                      }}
                    </div>
                  </a>
                </template>
              </draggable>
              <div class="tasks_list__cover"></div>
            </div>
            <draggable
              class="tasks_list drag_to_delete"
              v-if="drag"
              v-model="discard"
              group="tasks"
              item-key="ref"
              ghost-class="ghost"
            >
              <template #item="{ element }">
                <span>{{ element && null }}</span>
              </template>
            </draggable>
          </div>
          <div class="contents_page timer_page" v-if="page == 'timer'">
            <div class="overlay_contents_text">
              Set a timer for the session to keep track of time spent on tasks
            </div>
            <form
              class="timer_set_row inputs_row"
              style="margin: 20px 0; text-align: center"
              @submit="$event.preventDefault()"
            >
              <!-- time inputs -->
              <input
                ref="hours"
                class="time_input styled_input"
                type="number"
                min="0"
                max="5"
                step="1"
                :value="Math.floor(time.total / 60 / 60 / 1000)"
                @input="time.total = ($event.target.value * 60 + $refs.minutes.value) * 60 * 1000"
              />
              <span class="time_input">:</span>
              <input
                ref="minutes"
                class="time_input styled_input"
                type="number"
                :min="($refs && $refs.hours && $refs.hours.value > 0 ? -1 : 5) || 5"
                max="61"
                step="1"
                :value="
                  Math.floor((time.total / 60 / 1000) % 60) < 10
                    ? '0' + Math.floor((time.total / 60 / 1000) % 60)
                    : Math.floor((time.total / 60 / 1000) % 60)
                "
                @input="time.total = ($refs.hours.value * 60 + $event.target.value) * 60 * 1000"
              />
            </form>

            <div class="overlay_contents_text">
              Once you're ready to go, hit the <span class="button_pointer_text">Start</span> button
              to begin!
            </div>
          </div>
          <div class="contents_page time_page" v-if="page == 'time'">
            <div class="overlay_contents_text">
              You're currently in a session. Keep track of time spent on tasks and take breaks as
              needed!
            </div>
            <transition-group
              class="tasks_list tasks_list__session"
              tag="div"
              name="tasks-list"
              style="margin-bottom: 0"
            >
              <div
                class="tasks_list_task"
                v-for="task in upcoming_selected"
                :key="task.ref"
                @click="
                  $route.params && $route.params.ref == $store.path_to_ref(task.ref)
                    ? close_view()
                    : open_view(task)
                "
                :style="{
                  '--color-class': classes[task.class_id].color,
                  '--color-class-alt': classes[task.class_id].color + '2d',
                }"
              >
                <div class="tasks_list_task__title">
                  <span class="tasks_list_task__title_text"
                    >{{ $magic.prefix(task) }} {{ task.name }}</span
                  >
                </div>
                <div class="tasks_list_task__date">
                  {{
                    (task.date &&
                      task.date.toLocaleDateString(undefined, {
                        month: "numeric",
                        day: "numeric",
                      })) ||
                    "Invalid Date"
                  }}
                </div>
              </div>
            </transition-group>
          </div>
          <div class="contents_page review_page" v-if="page == 'review'">
            <div class="overlay_contents_text">
              Here's what you've accomplished during this session. You can review the tasks and time
              spent on them below.
            </div>
          </div>
          <div class="flex_spacer"></div>
        </div>
      </div>
      <div class="bottom_actions">
        <button
          v-if="pages[page].button.back"
          class="close_action click_escape"
          @click="
            if (page == 'select') {
              $emit('close');
            } else {
              page = pages[page].button.back;
            }
          "
        >
          {{ page == "select" ? (selected.length ? "Cancel" : "Close") : "Back" }}
        </button>
        <div class="timer_info first_styled" v-if="running">
          <span class="time_info_part time_info__elapsed">{{ msToTime(time.elapsed) }}</span
          >&ThinSpace;/&ThinSpace;<span class="time_info_part time_info__total">{{
            msToTime(time.total)
          }}</span>
        </div>
        <div class="flex_spacer"></div>
        <button
          class="continue_action magic_button primary_styled"
          title="Generate an order for the selected tasks"
          v-if="pages[page].magic"
          @click="generate_order"
          :disabled="true || !selected.length || loading"
        >
          {{ pages[page].magic }}
        </button>
        <button
          v-if="!done && running && paused && page == 'time'"
          class="leave_button"
          @click="review"
        >
          End
        </button>
        <button
          class="continue_action click_ctrlenter"
          @click="action"
          :disabled="!selected.length"
          :class="{
            click_escape: page == 'time' && !paused,
          }"
        >
          {{
            (running
              ? paused
                ? done
                  ? "Finish"
                  : pages[page].button.paused
                : pages[page].button.running
              : pages[page].button.stopped) || "Next"
          }}
        </button>
      </div>
    </main>
    <hr class="view_separator" />
    <main
      class="sessionview overlay_contents_inlaid noheader"
      v-if="$route.name != 'studysession' && show_view"
      style="max-width: 350px"
    >
      <router-view @close="close_view"></router-view>
    </main>
  </main>
</template>

<script>
import "@/assets/style/overlay.css";
import { msToTime } from "@/common";
import smoothReflow from "vue-smooth-reflow";
import draggable from "vuedraggable";

export default {
  name: "StudySession",
  mixins: [smoothReflow],
  components: {
    draggable,
  },
  emits: ["close"],
  beforeUnmount() {
    this.$shortcuts.remove_tag("Session");
    window.removeEventListener("keydown", this.keydown);
  },
  mounted() {
    this.$shortcuts.register_all(this.shortcuts, "Session");
    window.addEventListener("keydown", this.keydown);

    this.$smoothReflow({
      el: this.$refs.contents,
      childTransitions: true,
      overflow: true,
    });

    if (this.$route?.query?.selected) {
      this.selected = this.$route.query.selected.split(",").map((path) => {
        return this.$store.ref_to_path(path);
      });
    }
    if (this.selected.length && this.$route?.query?.time && !isNaN(this.$route.query.time)) {
      this.time.total = this.$route.query.time * 60 * 1000;
      if (this.$route.query.passed) {
        this.time.acculmulated = this.$route.query.passed * 1000;
      }
    }
    if (this.selected.length && this.$route?.params?.page && this.pages[this.$route.params.page]) {
      this.page = this.$route.params.page;
    } else {
      this.page = "select";
    }
  },
  data() {
    return {
      loading: false,
      show_view: true,
      audio: {
        back: require("@/assets/audio/back.wav"),
        bubble: require("@/assets/audio/bubble.wav"),
        lock: require("@/assets/audio/lock.wav"),
        marimba: require("@/assets/audio/marimba.wav"),
        select: require("@/assets/audio/select.wav"),
        start: require("@/assets/audio/start.wav"),
      },
      filter_days: 7,
      filters: {
        day: {
          name: "Day",
          days: 1,
          key: "d",
          description: "tasks due today",
        },
        week: {
          name: "Week",
          days: 7,
          key: "w",
          description: "tasks due this week",
        },
        month: {
          name: "Month",
          days: 30,
          key: "m",
          description: "tasks due this month",
        },
        all: {
          name: "All",
          days: Infinity,
          key: "a",
          description: "all tasks",
        },
      },

      timer: null,
      discard: [],
      page: "select",
      pages: {
        loading: {
          title: "Create Session",
          button: {
            stopped: "Select",
            back: true,
          },
        },
        select: {
          title: "Select Session Tasks",
          button: {
            stopped: "Select",
            back: "select",
          },
        },
        order: {
          title: "Order Session Tasks",
          button: {
            stopped: "Confirm",
            back: "select",
          },
          magic: "Generate",
        },
        timer: {
          title: "Set Session Timer",
          button: {
            stopped: "Start",
            back: "order",
          },
        },
        time: {
          title: "Session in Progress",
          button: {
            paused: "Resume",
            running: "Pause",
          },
        },
        review: {
          title: "Review Session",
          button: {
            stopped: "Done",
            back: "time",
          },
        },
      },
      drag: false,
      running: false,
      paused: false,
      time: {
        total: 25 * 60 * 1000,
        elapsed: 0,
        repeat: 0,
        acculmulated: 0,
        last_started: 0,
      },
      selected: [],
      selected_map: {},
    };
  },
  methods: {
    keydown(event) {
      if (this.page != "select") return;
      // if one of the keys in filter is pressed, change filter to that
      for (let filter in this.filters) {
        if (event.key.toLowerCase() == this.filters[filter].key) {
          this.filter_days = this.filters[filter].days;
        }
      }
    },
    open_view(task) {
      this.$router.push({
        name: "sessionview",
        params: {
          ref: this.$store.path_to_ref(task.ref),
          page: this.page,
        },
        query: { ...this.$route.query },
      });
    },
    close_view() {
      this.$router.push({
        name: "studysession",
        params: { page: this.page },
        query: { ...this.$route.query },
      });
    },
    action() {
      if (!this.$notify.enabled) this.$notify.register(this.page == "timer");
      if (!this.selected.length) {
        this.page = "select";
      } else if (this.page == "select") {
        this.page = "order";
      } else if (this.page == "order") {
        this.page = "timer";
      } else if (this.page == "timer") {
        this.page = "time";
        this.$notify.play(this.audio.select);
        this.resume();
      } else if (this.page == "time") {
        if (this.time.elapsed >= this.time.total) {
          this.review();
        } else {
          this.page = "time";
          this.update_path();
          if (this.paused) {
            this.resume();
          } else if (!this.paused || this.done) {
            this.pause();
          }
        }
      } else if (this.page == "review") {
        this.$emit("close");
      }
    },
    review() {
      // this.$notify.play(this.audio.start);
      this.pause();
      this.page = "review";
    },
    pause() {
      // clear interval and save elapsed time
      this.clear_interval();
      this.time.acculmulated += Date.now() - this.time.last_started;
      this.paused = true;
    },
    resume() {
      this.time.last_started = Date.now();
      this.time.repeat = 0;
      this.interval();
      this.running = true;
      this.paused = false;
    },
    interval() {
      this.timer = setInterval(() => {
        this.time.elapsed = Date.now() - this.time.last_started + this.time.acculmulated;
        if (this.time.elapsed >= this.time.total) {
          this.time.elapsed = this.time.total;
          this.pause();
          this.$notify.play(this.audio.marimba);
          this.$notify.add(
            {
              title: "Session completed",
              body: `You've successfully completed your ${this.selected.length}-task ${
                this.msToTime(this.time.total) || "25:00"
              } study session! Head back to the portal to review your progress and save completion status!`,
              tag: "session",
              vibrate: [200, 100, 200],
            },
            this.review
          );
          this.clear_interval();
        }
        this.time.repeat += 1;
      }, 1000);
    },
    clear_interval() {
      clearInterval(this.timer);
    },
    msToTime,
    toggle_task(ref) {
      if (this.selected.includes(ref)) {
        this.selected = this.selected.filter((task) => task !== ref);
      } else {
        this.selected.push(ref);
      }
    },
    update_path() {
      this.$router.replace({
        name: this.$route.name,
        params: {
          page: this.page,
          ref: this.$route.name == "sessionview" ? this.$route.params.ref : undefined,
        },
        query: {
          ...this.$route.query,
          selected:
            this.selected.map((path) => this.$store.path_to_ref(path)).join(",") || undefined,
          time:
            this.time.total && this.time.total != 25 * 60 * 1000
              ? this.time.total / 60 / 1000
              : undefined,
          passed: this.time.elapsed ? Math.floor(this.time.elapsed / 1000) : undefined,
        },
      });
    },
    task_from(ref) {
      return this.selected_map[ref] || false;
    },
  },
  computed: {
    shortcuts() {
      return Object.values(this.filters).map((filter) => {
        return {
          key: filter.key,
          description: `Filter to ${filter.description}`,
        };
      });
    },
    done() {
      return this.time.elapsed >= this.time.total;
    },
    upcoming() {
      return this.$store.upcoming_todo.filter(
        (task) =>
          task.date && task.date.getTime() <= Date.now() + this.filter_days * 24 * 60 * 60 * 1000
      );
    },
    upcoming_selected() {
      return this.$store.upcoming_todo.filter((task) => this.selected.includes(task.ref));
    },
    upcoming_unselected() {
      return this.upcoming.filter((task) => !this.selected.includes(task.ref));
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
  watch: {
    selected: {
      handler(old_selected, new_selected) {
        this.selected_map = new_selected.reduce((map, ref) => {
          map[ref] = this.$store.upcoming_todo.find((task) => task.ref === ref);
          return map;
        }, {});
        this.update_path();
        if (!this.selected.length && this.page !== "select") {
          this.page = "select";
        }
      },
      deep: true,
    },
    $route: {
      handler(to, from) {
        // TODO: set as loading if opened directly from link instead of reload/link
        void to, from;
        // if (!from?.name) this.loading = true;
      },
      deep: true,
    },
    "$store.upcoming_todo"() {
      this.loading = true;
      this.selected = this.selected.filter((ref) => {
        return this.$store.upcoming_todo.some((task) => task.ref === ref);
      });
      this.loading = false;
    },
    page() {
      if (this.page == "time") {
        this.resume();
      } else if (this.page == "review") {
        this.pause();
        this.running = false;
      }
      this.update_path();
    },
    "time.total"() {
      this.time.total = Math.floor(
        Math.min(Math.max(5, this.time.total / 60 / 1000), 300) * 60 * 1000
      );
      this.update_path();
    },
    "time.elapsed"() {
      // if multiple of 10 seconds, update path
      if (this.time.repeat && this.time.repeat % 15 === 0) {
        this.update_path();
      }
    },
    "$route.params.ref"() {
      this.show_view = false;
      this.$nextTick(() => {
        this.show_view = true;
      });
    },
  },
};
</script>
<style>
.session_wrapper {
  align-items: stretch;
  justify-content: stretch;
}
.session_wrapper .overlay_contents,
.session_wrapper h2.header_style {
  padding: var(--padding-overlay);
}

.sessionview {
  display: flex;
  flex-flow: column nowrap;
}
.sessionview main {
  height: 100%;
  flex-grow: 1;
}
.session_wrapper main {
  width: 100%;
  height: 100%;
}
</style>
<style scoped>
.session_wrapper main {
  flex: 1 0 50%;
  width: auto;
  padding: 0 !important;
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
}

.session_wrapper main > .overlay_contents {
  flex-grow: 1;
}

.session_wrapper:has(.sessionview) {
  max-width: calc(450px + 350px - var(--thickness-overlay-border) * 3);
  flex-direction: row;
}
.session_wrapper:has(.sessionview) main {
  height: auto;
}

main.session_wrapper hr.view_separator {
  padding: 0;
  margin: 0;
  flex: 0 0 var(--thickness-overlay-border);
  width: var(--thickness-overlay-border);
  background-color: var(--color-overlay-border);
  border: none;
}
/* nav bar */
nav.filter_bar {
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 2px;
  gap: 2px;
  margin-top: var(--padding-overlay-input);
  /* edges */
  border-radius: var(--radius-overlay-input);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  overflow: hidden;
}
nav.filter_bar .filter_bar_option {
  height: 30px;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  overflow: hidden;
  width: fit-content;
  flex: 1 0 auto;
  background: var(--color-overlay-input-alt);
  color: var(--color-on-overlay-input-alt);
  border: none;
  padding: 0 var(--padding-overlay-input);
  font-size: 0.9em;
  font-weight: 600;
  user-select: none;
  align-items: center;
  justify-content: center;
}

nav.filter_bar .filter_bar_option.active {
  background: var(--color-overlay-input-active);
  color: var(--color-on-overlay-input);
}

nav.filter_bar + .tasks_list_wrapper,
nav.filter_bar + .tasks_list_wrapper > .tasks_list {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin-top: 0;
}
/* timer */
.timer_set_row span {
  padding-left: 0;
  padding-right: 0;
}
.time_input {
  text-align: center;
  font-weight: 600;
  height: auto;
  padding: var(--padding-overlay-input);
  font-size: 4em;
}
/* drag & other */
.ghost {
  opacity: 0.25;
}
.overlay_contents {
  display: flex;
  flex-flow: column;
}
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
  pointer-events: none;
}
.timer_info,
.timer_info .time_info_part {
  font-family: monospace;
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
  max-height: 300px;
  overflow-y: auto;
  position: relative;
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
  content: "No upcoming tasks found";
  color: var(--text-color);
  font-weight: 500;
  opacity: 0.5;
  text-align: center;
  width: 100%;
  height: var(--height-calendar-task);
  display: flex;
  align-items: center;
  justify-content: center;
}
.tasks_list.selected:empty::before {
  content: "No more upcoming tasks";
}
.tasks_list {
  --height-calendar-task: 30px;
}
.tasks_list.order_list,
.tasks_list.drag_to_delete {
  --height-calendar-task: 35px;
}
.tasks_list.order_list:empty::before {
  content: "No tasks selected";
}
.tasks_list.drag_to_delete {
  background: none;
  border: dashed 2px var(--color-overlay-input);
  height: calc(var(--height-calendar-task) + 2 * var(--padding-overlay-input));
  display: flex;
  justify-content: center;
}
.tasks_list.drag_to_delete:empty::before {
  content: "Drop here to remove";
}

.tasks_list {
  display: flex;
  flex-flow: column nowrap;
  gap: 7px;
  height: auto;
}

.tasks_list__session:not(:empty) {
  padding: 0;
  background: none;
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
main.parent.simplified .tasks_list_task {
  background: var(--color-class);
}
.tasks_list_task > div {
  filter: var(--filter-calendar-task);
  padding: var(--padding-calendar-task);
  color: var(--color-on-calendar-task);
  background-color: var(--color-class);
  border-radius: 5px;
  text-align: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}
div.tasks_list_task__drag {
  flex: 0 0 var(--height-calendar-task);
  height: var(--height-calendar-task);
  padding: 0;
  opacity: 0.6;
  margin-right: var(--gap-study-checkbox);
  cursor: grab;
}
.tasks_list_task__drag:active {
  cursor: grabbing;
}
.tasks_list_task__drag > .drag_icon {
  filter: var(--filter-icon);
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-image: url(@/assets/img/general/portal/drag-icon.png);
  background-image: url(@/assets/img/general/portal/drag-icon.svg);
}
.order_page .tasks_list_task {
  cursor: default;
}
.tasks_list_task__title {
  flex: 1 1 auto;
  overflow: hidden;
  padding-right: 5px;
  height: 100%;
}

.tasks_list_task__title_text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}
.tasks_list_task__date {
  margin-left: var(--gap-study-checkbox);
  flex-shrink: 0;
  flex-grow: 0;
  width: 4em;
  opacity: 0.6;
  height: 100%;
}

.magic_button {
  padding-left: calc(var(--padding-overlay-action) * 1.5) !important;
  background-position: calc(var(--padding-overlay-action) / 2.5);
  background-repeat: no-repeat;
  background-size: 24px;
  background-image: url(@/assets/img/general/portal/magic-lighter.png);
  background-image: url(@/assets/img/general/portal/magic-lighter.svg);
}
.magic_button[disabled] {
  background-image: url(@/assets/img/general/portal/magic.png);
  background-image: url(@/assets/img/general/portal/magic.svg);
}

.tasks_list.loading_bg {
  height: 130px;
}
</style>
<style>
.tasks_list.order_list:not(.empty, .drag):empty::before {
  background-image: url(@/assets/img/placeholder/load_dark.png) !important;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  color: #00000000 !important;
  height: 130px;
  display: block;
}
#themed_body[_theme="dark"] .tasks_list.order_list:not(.empty, .drag):empty::before {
  background-image: url(@/assets/img/placeholder/load_light.png) !important;
}
</style>
