<template>
  <main class="onboardng" ref="modal" id="join_modal">
    <div class="overlay_contents_wrapper nopad">
      <img class="modal_art_part contrast_small_dark" v-lazy="source" />
      <div class="overlay_contents pad_overlay overlay_more_pad_horizontal">
        <h2 class="modal_header_title overlay_title">Join the MVTT Beta</h2>
        <div class="overlay_inputs inputs_column">
          <input
            class="styled_input styled_obj"
            type="name"
            v-model="form.name"
            placeholder="Your Name"
          />
          <input
            class="styled_input styled_obj"
            type="email"
            v-model="form.email"
            placeholder="Your @mvla.net Email"
          />
          <textarea
            v-model="form.usage"
            class="styled_input styled_textarea styled_obj"
            type="text"
            placeholder="How will you use MVTT (optional)"
          />
        </div>
      </div>
    </div>
    <div class="bottom_actions">
      <button class="close_action" @click="$emit('close')">Close</button>
      <div class="flex_spacer"></div>
      <button class="continue_action" :disabled="!contents_ready">Continue to Sign-Up</button>
    </div>
  </main>
</template>

<script>
import { useMainStore } from "@/store";
import "@/views/Portal/overlay.css";
export default {
  emits: ["close"],
  data() {
    return {
      form: {
        name: "",
        email: "",
        usage: "",
      },
    };
  },
  computed: {
    contents_ready() {
      // filled out name and email ending in @mvla.net
      return (
        this.form.name.length >= 2 &&
        this.form.email.length >= 10 &&
        this.form.email.endsWith("@mvla.net")
      );
    },
    store() {
      return useMainStore();
    },
    source() {
      try {
        return require(`@/assets/img/art/working/${this.combo}.png`);
      } catch (e) {
        return "err";
      }
    },
    combo() {
      let stored = localStorage.getItem("home_art");
      let stored_variant = stored ? stored.split("s")[1][0] : null;

      return "ls" + stored_variant;
    },
  },
};
</script>

<style scoped>
main#join_modal {
  max-width: 700px;
}
.overlay_contents {
  border: none;
  justify-content: center;
  align-items: stretch;
  display: flex;
  flex-flow: column;
}
.bottom_actions {
  border-top: solid var(--thickness-overlay-border) var(--color-overlay-border);
}
.overlay_contents_wrapper {
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  max-height: 100%;
}
h2.overlay_title {
  text-align: center;
  font-weight: 700;
  margin-bottom: 20px;
}
.modal_art_part {
  height: 400px;
  width: 270px;
  object-fit: scale-down;
  object-position: bottom left;
}
.inputs_column {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  margin: 0;
}
.inputs_column .styled_input {
  width: 100%;
  margin: 0;
  margin-bottom: calc(var(--padding-overlay) / 2);
}
</style>
