<template>
  <div class="progress_display" v-if="total > 1">
    <span
      class="progress_display__dot_container"
      v-for="i in total"
      :key="i"
      @click="$emit('open', i - 1)"
    >
      <span
        class="progress_display__dot"
        :class="{ dot_active: i == current, dot_finished: i < current }"
      ></span>
    </span>
  </div>
</template>

<script>
/**
 * Survey-style progress dots for Stats modals.
 * Markup/classes/tokens match Modal.vue (`progress_display` / `__dot` / `dot_*`).
 *
 * @module StatsProgressDots
 */
export default {
  name: "StatsProgressDots",
  props: {
    /** 1-based current page index (same as Modal progress.current) */
    current: {
      type: Number,
      required: true,
    },
    /** Total page count */
    total: {
      type: Number,
      required: true,
    },
  },
  emits: ["open"],
};
</script>

<style scoped>
.progress_display {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  margin-left: 0;
  user-select: none;
  height: var(--size-modal-progress, auto);
}
.progress_display span {
  display: block;
}
.progress_display__dot_container {
  padding: var(--margin-modal-progress-dot);
  cursor: pointer;
}
.progress_display__dot {
  width: var(--size-modal-progress-dot);
  height: var(--size-modal-progress-dot);
  border-radius: 50%;
  background-color: var(--color-modal-progress-dot);
}
.progress_display__dot.dot_active {
  background-color: var(--color-modal-progress-dot-active);
}
.progress_display__dot.dot_finished {
  transform: scale(0.75);
  opacity: 0.6;
}
</style>
