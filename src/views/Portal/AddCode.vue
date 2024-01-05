<template>
  <main class="entercode">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">Enter class code</h2>
    </header>
    <div class="overlay_contents" ref="contents" @input="code = code.slice(-5)">
      <div class="overlay_contents_text">
        Enter the class code provided by your teacher below, then click
        <span class="button_pointer_text">Submit</span> to join the class.
      </div>
      <form
        class="inputs_row"
        @submit="
          $event.preventDefault();
          try_submit();
        "
      >
        <input
          class="styled_input code_input"
          v-model="code"
          placeholder="code"
          @blur="code = code.toLowerCase()"
        />
      </form>
      <div class="overlay_contents_text">
        Make sure you've entered it correctly, codes are case sensitive!
      </div>
    </div>
    <div class="bottom_actions">
      <button class="close_action click_escape" @click="$emit('close')">Cancel</button>
      <div class="flex_spacer"></div>
      <button class="continue_action" @click="try_submit" :disabled="!ready">Submit</button>
    </div>
  </main>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {
      code: "",
    };
  },
  computed: {
    ready() {
      return (
        this.code.length >= 4 &&
        this.code.length <= 5 &&
        // no non alphanumeric characters
        /^[a-zA-Z0-9]+$/.test(this.code)
      );
    },
  },
  methods: {
    try_submit() {
      if (this.ready) {
        this.$router.push({
          name: "codeclass",
          params: { code: this.code },
          query: { manual: true, ...this.$route.query },
        });
      }
    },
  },
};
</script>

<style scoped>
.code_input {
  text-align: center;
  font-weight: 600;
  height: auto;
  padding: var(--padding-overlay-input);
  font-size: 4em;
}
</style>
