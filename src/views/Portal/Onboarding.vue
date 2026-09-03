<template>
  <div class="onboarding">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">Welcome to MVTime</h2>
    </header>
    <!-- P4: same AddClassForm enroll path as Add Class (welcome framing only) -->
    <AddClassForm
      variant="welcome"
      dismiss-label="Skip"
      dismiss-class="back_action"
      @close="$emit('close')"
    />
  </div>
</template>

<script>
/**
 * Welcome / Onboarding shell — thin framing around shared AddClassForm.
 * Same create/enroll semantics as Add Class (store.add_class → enrollClass).
 *
 * @module OnboardingView
 * @emits {Function} close
 */
import AddClassForm from "@/components/Portal/AddClassForm.vue";

export default {
  name: "OnboardingView",
  components: { AddClassForm },
  emits: ["close"],
};
</script>

<style></style>
