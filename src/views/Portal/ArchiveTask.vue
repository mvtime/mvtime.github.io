<template>
  <div class="archive_task">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">Confirm {{ type }} archive</h2>
    </header>
    <div class="overlay_contents overlay_contents_text" ref="contents">
      Are you sure you want to archive the {{ type }}{{ title ? ` "${title}"` : "" }} you were
      editing? <br /><br />
      This action is currently irreversible, and will permanently remove it from
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
        >{{ store.class_text(class_obj) }}</a
      >.
    </div>
    <div class="bottom_actions">
      <button v-if="ready" class="close_action click_escape" @click="edit_task">
        Continue Editing
      </button>
      <button v-else class="close_action click_escape" @click="$emit('close')">Close</button>
      <div class="flex_spacer"></div>
      <button
        class="continue_action"
        :class="{ loading_bg: loading }"
        @click="archive_task"
        :disabled="!ready"
      >
        Confirm
      </button>
    </div>
  </div>
</template>

<script>
/**
 * @file ArchiveTask.vue
 * @description Archive task modal that appears when a user tries to archive a task
 * @module views/Portal/ArchiveTask
 */
import smoothReflow from "vue-smooth-reflow";
import { useMainStore } from "@/store";
import { ErrorToast, SuccessToast, WarningToast } from "@svonk/util";
export default {
  name: "ArchiveTask",
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
      let classes = this.store?.classes,
        [_email, _id] = this.ref.split("/");
      let email = _email + this.store.ORG_DOMAIN,
        class_id = [email, _id].join("/");
      if (!classes || !email || !_id || !class_id) return {};
      let class_obj = classes.find((class_obj) => class_obj.id === class_id) || {};
      if (class_obj) {
        class_obj.ref = [_email, _id].join("~");
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
    // remove the title from the query
    this.$router.replace({
      ...this.$route,
      query: { ...this.$route.query, title: undefined },
    });

    if (!this.ref || !this.type) {
      new WarningToast("There was no task provided", 2000);
      this.$emit("close");
    } else {
      this.ref = this.ref.split("~").join("/");
      if (this.ref.split("/").length !== 3) {
        new WarningToast("Couldn't find that task", 2000);
        this.$emit("close");
      } else {
        this.ready = true;
        this.loading = false;
      }
    }
  },
  methods: {
    archive_task() {
      this.loading = true;
      this.store
        .archive_task(this.ref)
        .then(() => {
          new SuccessToast(`Archived ${this.type}`, 3000);
          this.$emit("close");
        })
        .catch((err) => {
          new ErrorToast(`Error removing ${this.type}`, err, 3000);
          this.$status.error("⚠ Error removing task", err);
          this.loading = false;
        });
    },
    edit_task() {
      this.$router.push({
        name: "edit",
        params: {
          ref: this.$route?.params?.ref,
        },
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
