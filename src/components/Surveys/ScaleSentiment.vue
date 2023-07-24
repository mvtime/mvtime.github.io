<template>
  <div class="survey_outof5 survey_part">
    <div class="sentiments_container">
      <div
        class="sentiment_option"
        :class="{ active: sentiment == type }"
        v-for="type in sentiments"
        :key="type"
        @click="sentiment = type"
      ></div>
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
      sentiments: [1, 2, 3, 4, 5],
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
  mounted() {
    // this.$emit("status", this.can_continue);
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

<style></style>
