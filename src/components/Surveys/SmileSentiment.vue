<template>
  <div class="survey_sentiment survey_part">
    <div class="sentiments_container">
      <!-- use assets/img/general/survey smile sentiment icons -->
      <div
        class="sentiment_option"
        :class="{ active: sentiment == type }"
        v-for="type in sentiments"
        :key="type"
        @click="sentiment = type"
      >
        <img
          class="sentiment_option__img"
          :src="require('@/assets/img/general/survey/sentiment-' + type + '.png')"
        />
      </div>
    </div>
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
      sentiment: this.load?.sentiment || "",
      sentiments: ["negative", "neutral", "positive"],
    };
  },
  computed: {
    can_continue() {
      return this.sentiment != "";
    },
    getData() {
      return {
        sentiment: this.sentiment,
      };
    },
  },

  watch: {
    sentiment() {
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
  justify-content: space-around;
  align-items: center;
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
  width: var(--sentiment-option-size);
  height: var(--sentiment-option-size);
  border-radius: 50%;
  /* transition */
  transition: scale 0.24s ease-out, opacity 0.2s ease-out;
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

.sentiment_option .sentiment_option__img {
  /* sizing */
  width: 100%;
  height: 100%;
  /* interaction */
  user-select: none;
  pointer-events: none;
}
</style>
