<template>
  <nav class="stats_view_controls_wrapper">
    <div class="stats_view_controls">
      <button
        @click="toggleFilter(tag.filter)"
        class="stats_view_control__option"
        v-for="tag in filters"
        :key="tag.filter"
        :class="{ active: active.includes(tag.filter) && isReady }"
      >
        {{ tag.name }}
      </button>
    </div>
    <span class="flex_spacer"></span>
    <button
      class="stats_view_control__toggle"
      @click="$emit('update:toolbar', !toolbar)"
      :class="{ disabled: !isReady }"
    >
      {{ toolbar ? "Less" : "More" }}
    </button>
  </nav>
</template>

<script>
/**
 * Shared Stats filter toolbar (Mood / Stress / Work / Notes) + More/Less chart toolbar toggle.
 * Styles moved 1:1 from StatsModal.vue so personal and teacher views share the same chrome.
 *
 * @module StatsFilterBar
 */
export default {
  name: "StatsFilterBar",
  props: {
    filters: {
      type: Array,
      default: () => [],
    },
    active: {
      type: Array,
      default: () => [],
    },
    isReady: {
      type: Boolean,
      default: false,
    },
    toolbar: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:active", "update:toolbar"],
  methods: {
    toggleFilter(filter) {
      const next = this.active.slice();
      const idx = next.indexOf(filter);
      if (idx !== -1 && next.length > 1) {
        next.splice(idx, 1);
      } else if (idx === -1) {
        next.push(filter);
      }
      this.$emit("update:active", next);
    },
  },
};
</script>

<style scoped>
/* controls */
.stats_view_controls_wrapper {
  margin-bottom: calc(var(--padding-overlay-input) / 2);
  display: flex;
  flex-flow: row wrap;
  /* justify-content: space-between; */
  justify-content: flex-start;
  gap: 5px;
}
.stats_view_controls {
  height: 30px;
  display: flex;
  flex-flow: row nowrap;
  gap: 2px;
  border-radius: var(--radius-overlay-input);
  overflow: hidden;
  width: fit-content;
}
.stats_view_controls > button,
.stats_view_control__refresh,
.stats_view_control__toggle {
  flex: 0 1 auto;
  height: 30px;
  background: var(--color-overlay-input-alt);
  color: var(--color-on-overlay-input-alt);
  border: none;
  padding: 0 var(--padding-overlay-input);
  font-size: 0.9em;
  font-weight: 600;
  user-select: none;
}
@media (max-width: 500px) {
  .stats_view_controls_wrapper,
  .stats_view_controls_wrapper > .stats_view_controls {
    display: flex;
    flex-flow: row wrap;
    justify-content: stretch;
    width: 100%;
  }
  .stats_view_controls > button {
    flex: 1 0 auto;
  }
  .stats_view_control__toggle,
  .stats_view_controls_wrapper > .flex_spacer {
    display: none;
  }
}
.stats_view_control__refresh,
.stats_view_control__toggle {
  border-radius: var(--radius-overlay-input);
}
.stats_view_control__refresh.disabled,
.stats_view_control__toggle.disabled {
  cursor: not-allowed;
}
.stats_view_controls > button.active,
.stats_view_control__refresh:not(.disabled),
.stats_view_control__toggle:not(.disabled) {
  background: var(--color-overlay-input-active);
  color: var(--color-on-overlay-input);
}
</style>
