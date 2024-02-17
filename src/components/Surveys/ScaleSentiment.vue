<template>
  <div class="survey_outof5 survey_part">
    <div class="sentiments_container" ref="sentiments_container">
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
      sentiment: this.load?.sentiment ? this.load.sentiment * (5 / 100) : 0,
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
    shortcuts() {
      return this.sentiments.map((num) => ({
        key: String(num),
        description: `Set sentiment to ${num}`,
      }));
    },
  },
  mounted() {
    window.addEventListener("keydown", this.check_key);
    this.$shortcuts.register_all(this.shortcuts, "Survey Stress");
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.check_key);
    this.$shortcuts.remove_tag("Survey Stress");
  },
  methods: {
    check_key(e) {
      // if number within sentiments, set sentiment
      const num = Number(e.key);
      if (this.sentiments.includes(num)) {
        e.preventDefault();
        this.sentiment = num;
        this.$refs.sentiments_container.children[num - 1].focus();
        e.stopPropagation();
      }
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
