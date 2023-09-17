<template>
  <div class="delete_task">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">Confirm {{ type }} delete</h2>
    </header>
    <div class="overlay_contents overlay_contents_text" ref="contents">
      Are you sure you want to delete the {{ type }}{{ title ? ` "${title}"` : "" }} you were
      editing? <br /><br />
      This action is irreversible, and will permanently remove it from
      <a
        class="class_name button_pointer_text"
        :href="`/view/${class_obj.ref}`"
        @click="
          $event.preventDefault();
          $router.push($event.target.getAttribute('href'));
        "
        :style="{
          '--color-class': class_obj.color,
          '--color-class-alt': class_obj.color + '2d',
        }"
        >{{ `P${class_obj.period} - ${class_obj.name}` }}</a
      >.
    </div>
    <div class="bottom_actions">
      <button v-if="ready" class="close_action" @click="edit_task">Continue Editing</button>
      <button v-else class="close_action" @click="$emit('close')">Close</button>
      <div class="flex_spacer"></div>
      <button
        class="continue_action"
        :class="{ loading_bg: loading }"
        @click="delete_task"
        :disabled="!ready"
      >
        Confirm
      </button>
    </div>
  </div>
</template>

<script>
/**
 * @file DeleteTask.vue
 * @description Delete task modal that appears when a user tries to delete a task
 * @module views/Portal/DeleteTask
 */
import smoothReflow from "vue-smooth-reflow";
import { useMainStore } from "@/store";
import { _statuslog } from "@/common";
import { ErrorToast, SuccessToast, WarningToast } from "@svonk/util";
export default {
  name: "DeleteTask",
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
    store() {
      return useMainStore();
    },
    class_obj() {
      if (!this.ref) return {};
      let classes = this.store?.classes,
        [_email, _id] = this.ref.split("/");
      let email = _email + "@mvla.net",
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
    delete_task() {
      this.loading = true;
      this.store
        .delete_task(this.ref)
        .then(() => {
          new SuccessToast(`Removed ${this.type}`, 3000);
          this.$emit("close");
        })
        .catch((err) => {
          new ErrorToast(`Error removing ${this.type}`, err, 3000);
          _statuslog("⚠ Error removing task", err);
          this.loading = false;
        });
    },
    edit_task() {
      this.$router.push({
        name: "edit",
        params: {
          ref: this.$route?.params?.ref,
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
</style>
