<template>
  <main class="viewclass">
    <header class="modal_header" ref="title">
      <h2 class="header_style modal_header_title">View class details</h2>
    </header>
    <div ref="contents" class="overlay_contents">
      <div v-if="ready" ref="text_contents">
        <div class="spaced_contents">
          <div class="styled_obj">
            <span class="styled_line__label">Class:</span>
            <span class="styled_line__separator"></span>
            <span class="styled_line__value">
              <a
                class="class_name button_pointer_text"
                :href="`/view/${this.$route.params.ref}`"
                @click="$event.preventDefault()"
                :style="{
                  '--color-class': class_obj.color,
                  '--color-class-alt': class_obj.color + '2d',
                }"
                >P{{ class_obj.period }} - {{ class_obj.name }}</a
              >
            </span>
          </div>
          <div class="styled_obj">
            <span class="styled_line__label">Period:</span>
            <span class="styled_line__separator"></span>
            <span class="styled_line__value"> {{ class_obj.period }}</span>
          </div>
          <div class="styled_obj">
            <span class="styled_line__label">Name:</span>
            <span class="styled_line__separator"></span>
            <span class="styled_line__value"> {{ class_obj.name }}</span>
          </div>
          <div class="styled_obj">
            <span class="styled_line__label">Description:</span>
            <span class="styled_line__separator"></span>
            <span class="styled_line__value" v-html="text || 'Not Provided'"> </span>
          </div>
          <div class="styled_obj upcoming_section" ref="upcoming">
            <span class="styled_line__label">Upcoming:</span>
            <span class="styled_line__separator"></span>
            <span
              @click="get_upcoming"
              class="styled_line__value alt_bg"
              :class="{
                loading_clickable: !upcoming && !loading_upcoming,
                'click-action': !upcoming && !loading_upcoming,
                loading_bg: loading_upcoming,
              }"
            >
              <span v-if="!upcoming && !loading_upcoming" class="load_text">Click to Load</span>
              <div v-else-if="!loading_upcoming" class="upcoming_tasks_container">
                <div v-if="loading_upcoming" class="upcoming_tasks_loading">
                  <img alt="Loading Icon" class="loading_icon" src="/assets/loading.svg" />
                </div>
                <div v-else-if="upcoming && upcoming.length" class="upcoming_tasks">
                  <ExamCard
                    class="upcoming_tasks__task"
                    v-for="task in upcoming"
                    :task="task"
                    :key="task.name"
                    @click="show_task(task.ref)"
                  ></ExamCard>
                </div>
                <span v-else>No Upcoming Tasks</span>
              </div>
            </span>
          </div>
        </div>
        <div class="overlay_contents_text">
          Information is provided by teachers and volunteer students, and may not always be correct
        </div>
      </div>
      <img ref="loading_contents" alt="Loading Icon" class="loading_icon" v-else />
    </div>
    <div class="bottom_actions">
      <button class="continue_action" @click="$emit('close')">Close</button>
      <div class="flex_spacer"></div>
      <button
        class="edit_action primary_styled"
        v-if="
          store.is_teacher &&
          store.user &&
          class_obj &&
          this.$route.params.ref &&
          this.$route.params.ref.split('~')[0] == store.active_doc.email.replace('@mvla.net', '')
        "
        :disabled="!ready"
        @click="edit_class"
      >
        Edit
      </button>
      <button class="share_action primary_styled" @click="share_class" :disabled="!ready">
        Share
      </button>
      <button
        class="join_action primary_styled"
        v-if="joinable"
        :disabled="!ready"
        @click="join_class"
      >
        Join
      </button>
      <button
        class="leave_action primary_styled"
        v-else-if="store.user && class_obj"
        :disabled="!ready"
        @click="leave_class"
      >
        Leave
      </button>
    </div>
  </main>
</template>
<script>
/**
 * Displays the details of a class and allows the teacher to edit it, or any user to share it
 *
 * @module ViewClassView
 * @description Modal that displays the details of a class and allows the teacher to edit it.
 * @requires module:store/MainStore
 * @emits {Function} close - An event emitted when the modal is closed.
 */

import { WarningToast, ErrorToast, SuccessToast } from "@svonk/util";
import { _statuslog } from "@/common";
import { useMainStore } from "@/store";
import smoothReflow from "vue-smooth-reflow";
import showdown from "showdown";
import "@/assets/style/markdown.css";
import ExamCard from "@/components/Portal/ExamCard.vue";
let converter = new showdown.Converter();
export default {
  name: "ViewClassView",
  emits: ["close"],
  mixins: [smoothReflow],
  components: { ExamCard },
  data() {
    return {
      class_obj: null,
      ready: false,
      loading_upcoming: false,
      upcoming: null,
    };
  },
  computed: {
    store() {
      return useMainStore();
    },
    text() {
      return this.class_obj?.description && converter.makeHtml(this.class_obj?.description);
    },
    class_ref() {
      if (!this.$route.params.ref) {
        return null;
      }
      let [_email, _id] = this.$route.params.ref.split("~");
      _email += "@mvla.net";
      return [_email, _id].join("/");
    },
    joinable() {
      return (
        this.store.user &&
        this.class_obj &&
        // and not already joined
        !this.store?.active_doc?.classes?.includes(this.class_ref)
      );
    },
  },
  mounted() {
    this.$smoothReflow({
      el: this.$refs.contents,
      hideOverflow: false,
      childTransitions: false,
    });
    this.$smoothReflow({
      el: this.$refs.title,
      hideOverflow: true,
    });
    this.get_class();
  },
  methods: {
    /** Shares the class link with the native share function, or to the clipboard if sharing is not supported */
    async share_class() {
      let url = new URL("https://view.mvtt.app/" + this.$route.params.ref);
      if (navigator.share) {
        navigator
          .share({
            title: this.class_obj.name,
            text: `Check out ${this.class_obj.name || "this class"} on MVTT!`,
            url: url.href,
          })
          .then(() => new SuccessToast("Opened share dialog", 1000))
          .catch((err) => _statuslog("Error sharing", err));
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url.href);
        new WarningToast("Sharing not supported, copied link to clipboard", 2000);
      } else {
        new WarningToast("Sharing and copying not supported, sorry", 2000);
      }
    },
    edit_class() {
      this.$router.push({
        name: "editclass",
        params: {
          ref: this.$route?.params?.ref,
        },
      });
    },
    join_class() {
      this.$router.push({
        name: "refclass",
        params: {
          ref: this.$route?.params?.ref,
        },
      });
    },
    leave_class() {
      this.$router.push({
        name: "leave",
        params: {
          ref: this.$route?.params?.ref,
        },
      });
    },
    async get_upcoming() {
      if (this.upcoming != null) {
        return;
      }
      this.loading_upcoming = true;
      this.store
        .upcoming_from_ref(this.$route.params.ref.split("~").join("/"), this.class_obj)
        .then((upcoming) => {
          this.upcoming = upcoming;
          this.loading_upcoming = false;
        })
        .catch((err) => {
          new WarningToast("Couldn't get upcoming tasks", 2000);
          _statuslog("⚠ Couldn't get upcoming tasks", err);
          this.loading_upcoming = false;
        });
    },
    async get_class() {
      // get class ref from route params
      if (!this.$route.params.ref) {
        new WarningToast("No class specified", 1500);
        this.$emit("close");
        return;
      }
      const ref = this.$route.params.ref.split("~").join("/");
      if (!ref) {
        new WarningToast("No class specified", 1500);
        this.$emit("close");
        return;
      } else if (ref.split("/").length != 2) {
        new WarningToast("Invalid class specified", 1500);
        this.$emit("close");
        return;
      }
      // get class from store
      this.store
        .class_from_ref(ref)
        .then((class_obj) => {
          if (!class_obj) {
            new WarningToast("Couldn't find that class", 2000);
            this.$emit("close");
          } else {
            this.class_obj = class_obj;
            this.ready = true;
          }
        })
        .catch((err) => {
          new ErrorToast("Error getting class", err, 1500);
          _statuslog("⚠ Error getting class", err);
          this.$emit("close");
        });
    },
    show_task(ref) {
      this.$router.push({
        name: "publicviewtask",
        params: {
          ref: ref,
        },
      });
    },
  },
};
</script>
<style scoped>
.spaced_contents {
  margin-top: 0;
}
.loading_icon {
  max-height: 150px;
  min-width: 100%;
}
.class_name {
  line-height: 1em;
  cursor: default;
}
.upcoming_tasks {
  display: flex;
  flex-direction: column;
  gap: calc(var(--padding-overlay-input) / 1.5);
}
.upcoming_tasks__task {
  cursor: pointer;
  user-select: none;
  margin: 0;
}
/* style upcoming */
.upcoming_section .loading_clickable {
  cursor: pointer;
  text-align: center;
  user-select: none;
}
.upcoming_section .loading_bg {
  height: calc(50px + 2 * var(--padding-overlay-input));
}
.upcoming_section {
  padding: 0;
}
.upcoming_section > .styled_line__label,
.upcoming_section > .styled_line__value {
  padding: calc((var(--height-overlay-input) - 18px) / 2) var(--padding-overlay-input);
  display: block;
  box-sizing: content-box;
}
.upcoming_section > .styled_line__label {
  padding-right: 0;
}
.upcoming_section > .styled_line__value {
  width: 0;
  flex-grow: 1;
  padding-left: 0;
}
.upcoming_section > .styled_line__separator {
  height: calc(100% - (var(--height-overlay-input) - 18px) + 5px);
}
</style>
