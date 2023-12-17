<template>
  <div class="survey_long survey_part">
    <textarea
      ref="textarea"
      @keydown="check_key"
      class="survey_long__textarea styled_input styled_textarea styled_obj"
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
  mounted() {
    this.$refs.textarea.focus();
  },
  methods: {
    check_key(e) {
      // add newline at cursor if enter pressed with shift instead of submitting
      if (e.key == "Enter" && e.shiftKey) {
        e.preventDefault();
        const start = this.$refs.textarea.selectionStart;
        const end = this.$refs.textarea.selectionEnd;
        this.response =
          this.response.substring(0, start) +
          "\n" +
          this.response.substring(end, this.response.length);
        e.stopPropagation();
      }
      // also exclude right and left arrow keys
      else if (e.key == "ArrowRight" || e.key == "ArrowLeft") {
        e.stopPropagation();
      }
    },
  },
  computed: {
    can_continue() {
      return true;
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

<style scoped>
.survey_long {
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
}
</style>
