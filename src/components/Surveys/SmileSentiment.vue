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
    <div class="overlay_contents_text sentiments_text">
      <!-- extended prompt for "How are you feeling", extension of the question -->
      <p v-if="sentiment == 'negative'">
        <strong>Sorry to hear that!</strong> We hope you feel better soon.
      </p>
      <p v-if="sentiment == 'neutral'"><strong>Okay!</strong> We hope you have a good day.</p>
      <p v-if="sentiment == 'positive'"><strong>Great!</strong> Keep up the energy!</p>
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
  width: var(--size-sentiment-option);
  height: var(--size-sentiment-option);
  border-radius: 50%;
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

.sentiment_option .sentiment_option__img {
  /* sizing */
  width: 100%;
  height: 100%;
  /* interaction */
  user-select: none;
  pointer-events: none;
}
</style>