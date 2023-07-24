<template>
  <div class="survey_outof5 survey_part">
    <div class="sentiments_container">
      <div
        class="sentiment_option"
        :class="{ active: sentiment == num }"
        v-for="num in sentiments"
        :key="num"
        @click="sentiment = num"
      >
        {{ num }}
      </div>
    </div>
    <div class="overlay_contents_text sentiments_text">Where 1 is the least and 5 is the most</div>
  </div>
</template>

<script>
export default {
  emits: ["update", "status"],
  props: {
    load: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      sentiment: this.load?.sentiment || 0,
      sentiments: [1, 2, 3, 4, 5],
    };
  },
  computed: {
    can_continue() {
      return this.sentiment != 0;
    },
    getData() {
      return {
        sentiment: (100 * this.sentiment) / 5,
      };
    },
  },
  watch: {
    getData() {
      this.$emit("update", this.getData);
    },
    can_continue() {
      this.$emit("status", this.can_continue);
    },
  },
};
</script>

<style scoped>
.sentiments_container {
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: var(--padding-overlay) 0;
  overflow: hidden;
}
.sentiment_option {
  /* interaction */
  cursor: pointer;
  user-select: none;
  /* sizing */
  flex-grow: 1;
  flex-shrink: 0;
  font-size: 1.2em;
  padding: var(--padding-sentiment-option);
  border-radius: var(--radius-sentiment-option);
  /* layout */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: var(--margin-sentiment-option);
  /* color */
  background-color: var(--color-overlay-input);
  color: var(--color-on-overlay-input);
  /* transition */
  transition: scale 0.4s ease-out, opacity 0.2s ease-out;
}
.sentiment_option:not(.active),
.sentiments_container:has(:hover:not(.active)) > .sentiment_option.active {
  scale: 0.8;
}
.sentiment_option:not(.active) {
  opacity: 0.6;
}
.sentiments_container:has(.active) > .sentiment_option:not(.active) {
  opacity: 0.4;
}
.sentiments_container > .sentiment_option:not(.active):hover {
  opacity: 1;
  scale: 0.95;
}
</style>
