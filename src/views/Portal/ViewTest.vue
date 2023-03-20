<template>
  <main class="viewtest">
    <header class="modal_header">
      <h2 class="modal_header_title">View test details</h2>
    </header>
    <div class="overlay_contents">
      <div class="spaced_contents">
        <div class="styled_obj">
          <span class="styled_line__label">Class:</span>
          <span class="styled_line__separator"></span>
          <span class="styled_line__value">{{ test.group || test.class_name }}</span>
        </div>
        <div class="styled_obj">
          <span class="styled_line__label">Name:</span>
          <span class="styled_line__separator"></span>
          <span class="styled_line__value">{{ test.name }}</span>
        </div>
        <div class="styled_obj">
          <span class="styled_line__label">Description:</span>
          <span class="styled_line__separator"></span>
          <span class="styled_line__value">{{
            test.description ? test.description : "No Description Provided"
          }}</span>
        </div>
        <div class="styled_obj">
          <span class="styled_line__label">Date:</span>
          <span class="styled_line__separator"></span>
          <span class="styled_line__value">{{
            new Date(test.date).toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })
          }}</span>
        </div>
      </div>
      <div class="overlay_contents_text">
        Information is provided by teachers and volunteer students, and may not always be correct
      </div>
    </div>
    <div class="bottom_actions">
      <button class="share_action" @click="share_test">Share</button>
      <div class="flex-spacer"></div>
      <button class="continue_action" @click="$router.push('/portal')">Close</button>
    </div>
  </main>
</template>
<script>
import { WarningToast, ErrorToast, SuccessToast } from "@svonk/util";

export default {
  data() {
    return {};
  },
  computed: {
    test() {
      let test = this.$route?.query?.test;
      return test ? JSON.parse(test) : {};
    },
  },
  created() {
    // do route checking
    if (!this.test) {
      new WarningToast("No test specified", 1000);
      this.$router.push("/portal");
    }
  },
  methods: {
    share_test() {
      if (navigator.share) {
        navigator
          .share({
            title: this.test.name,
            text: this.test.description,
            url: window.location.href,
          })
          .then(() => new SuccessToast("Opened share dialog", 1000))
          .catch((error) => console.log("Error sharing", error));
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        new WarningToast("Sharing not supported, copied link to clipboard", 1000);
      } else {
        new ErrorToast("Sharing not supported", 1000);
      }
    },
  },
};
</script>
<style scoped>
.spaced_contents {
  margin-top: 0;
}
</style>
