<template>
  <div class="survey_long survey_part">
    <textarea
      class="survey_long__textarea styled_input"
      placeholder="Type your response here..."
      v-model="response"
    ></textarea>
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
      response: this.load?.input || "",
    };
  },
  computed: {
    can_continue() {
      return this.sentiment != 0;
    },
    getData() {
      return {
        input: this.response,
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

<style scoped></style>
