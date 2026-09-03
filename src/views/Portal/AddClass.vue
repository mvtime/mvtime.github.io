<template>
  <main class="addclass">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">{{ !is_join ? "Add a" : "Join" }} Class</h2>
    </header>
    <!-- P4: shared enroll form → store.add_class / enrollClass({ classId }); flat only -->
    <AddClassForm variant="add" dismiss-label="Close" @close="$emit('close')" />
  </main>
</template>

<script>
/**
 * Thin shell for Add Class modal chrome.
 * Enroll UI/logic lives in AddClassForm (shared with Onboarding).
 *
 * @module AddClassView
 * @emits {Function} close
 */
import AddClassForm from "@/components/Portal/AddClassForm.vue";

export default {
  name: "AddClassView",
  components: { AddClassForm },
  emits: ["close"],
  computed: {
    is_join() {
      return this.$route?.name == "refclass" || this.$route?.name == "codeclass";
    },
  },
};
</script>

<style></style>
