<template>
  <div class="archive_task">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">Confirm {{ type }} unarchive</h2>
    </header>
    <div class="overlay_contents overlay_contents_text" ref="contents">
      Are you sure you want to restore the {{ type }}{{ title ? ` "${title}"` : "" }} to
      <a
        class="class_name button_pointer_text"
        :href="`/view/${class_obj.ref}`"
        @click="
          $event.preventDefault();
          $router.push({ name: 'viewclass', params: { ref: class_obj.ref }, query: $route.query });
        "
        :style="{
          '--color-class': class_obj.color,
          '--color-class-alt': class_obj.color + '2d',
        }"
        >{{ $store.class_text(class_obj) }}</a
      >?
      <br /><br />
      It will show up again on the calendar and class lists.
    </div>
    <div class="bottom_actions">
      <button v-if="ready" class="close_action click_escape" @click="view_task">View Task</button>
      <button v-else class="close_action click_escape" @click="$emit('close')">Close</button>
      <div class="flex_spacer"></div>
      <button
        class="continue_action"
        :class="{ loading_bg: loading }"
        @click="unarchive_task"
        :disabled="!ready"
      >
        Confirm
      </button>
    </div>
  </div>
</template>

<script>
/**
 * @file UnarchiveTask.vue
 * @description Unarchive task modal that restores a flattened archived task in-place
 * @module views/Portal/UnarchiveTask
 */
import smoothReflow from "vue-smooth-reflow";
import { ErrorToast, SuccessToast, WarningToast } from "@svonk/util";
export default {
  name: "UnarchiveTask",
  emits: ["close"],
  mixins: [smoothReflow],
  data() {
    return {
      ready: false,
      loading: true,
      ref: this.$route?.params?.ref,
      type: this.$route?.params?.type || "task",
      title: this.$route?.query?.title,
    };
  },
  computed: {
    class_obj() {
      if (!this.ref) return {};
      let classes = this.$store?.classes;
      if (!classes) return {};
      const parts = this.ref.split("/").filter(Boolean);
      const classId =
        parts.length === 3
          ? parts[1]
          : parts.length === 2
            ? parts[0]
            : null;
      if (!classId) return {};
      let class_obj =
        classes.find(
          (c) =>
            c.id === classId ||
            c._class_id === classId ||
            (typeof c.id === "string" && c.id.endsWith("/" + classId))
        ) || {};
      if (class_obj) {
        class_obj = { ...class_obj, ref: classId };
      }
      return class_obj;
    },
  },
  mounted() {
    this.$smoothReflow({
      el: this.$refs.contents,
      hideOverflow: true,
      childTransitions: true,
    });
    this.$router.replace({
      ...this.$route,
      query: { ...this.$route.query, title: undefined },
    });

    if (!this.ref || !this.type) {
      new WarningToast("There was no task provided", 2000);
      this.$emit("close");
    } else {
      this.ref = this.ref.split("~").join("/");
      const segs = this.ref.split("/").filter(Boolean);
      if (segs.length < 2 || segs.length > 3) {
        new WarningToast("Couldn't find that task", 2000);
        this.$emit("close");
      } else {
        this.ready = true;
        this.loading = false;
        if (!this.$store.can_manage_class(this.class_obj)) {
          new WarningToast("You are not a teacher of this class", 2000);
          this.$emit("close");
        }
      }
    }
  },
  methods: {
    unarchive_task() {
      this.loading = true;
      this.$store
        .unarchive_task(this.ref)
        .then(() => {
          new SuccessToast(`Restored ${this.type}`, 3000);
          this.$emit("close");
        })
        .catch((err) => {
          new ErrorToast(`Error restoring ${this.type}`, err, 3000);
          this.$status.error("⚠ Error restoring task", err);
          this.loading = false;
        });
    },
    view_task() {
      const shareRef = this.$route?.params?.ref;
      this.$router.push({
        name: "viewtask",
        params: { ref: shareRef },
        query: this.$route.query,
      });
    },
  },
};
</script>

<style scoped>
.loading_icon {
  max-height: 150px;
  min-width: 100%;
}
</style>
