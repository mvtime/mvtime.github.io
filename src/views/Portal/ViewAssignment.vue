<template>
  <main class="viewassignment">
    <header class="modal_header">
      <h2 class="modal_header_title">View assignment details</h2>
    </header>
    <div class="overlay_contents">
      <div class="spaced_contents">
        <div class="styled_obj">
          <span class="styled_line__label">Class:</span>
          <span class="styled_line__separator"></span>
          <span class="styled_line__value">{{ assignment.group || assignment.class_name }}</span>
        </div>
        <div class="styled_obj">
          <span class="styled_line__label">Name:</span>
          <span class="styled_line__separator"></span>
          <span class="styled_line__value">{{ assignment.name }}</span>
        </div>
        <div class="styled_obj">
          <span class="styled_line__label">Date:</span>
          <span class="styled_line__separator"></span>
          <span class="styled_line__value">{{
            new Date(assignment.date).toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })
          }}</span>
        </div>
        <div class="styled_obj">
          <span class="styled_line__label">Description:</span>
          <span class="styled_line__separator"></span>
          <span
            class="styled_line__value"
            v-html="assignment.description ? assignment.description : 'Not Provided'"
          ></span>
        </div>
        <div class="styled_obj" v-if="assignment.links">
          <span class="styled_line__label">Links:</span>
          <span class="styled_line__separator"></span>
          <span class="styled_line__value">
            <a
              class="styled_line__value__link"
              v-for="assignment_link in assignment.links"
              :key="assignment_link.path"
              :href="assignment_link.path"
              >{{ assignment_link.text }}</a
            >
          </span>
        </div>
      </div>
      <div class="overlay_contents_text">
        Information is provided by teachers and volunteer students, and may not always be correct
      </div>
    </div>
    <div class="bottom_actions">
      <button class="share_action" @click="share_assignment">Share</button>
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
    assignment() {
      let assignment = this.$route?.query?.test;
      assignment = assignment ? JSON.parse(assignment) : {};
      if (assignment && assignment.length && assignment.links) {
        // filter any links without text or path
        assignment.links = assignment.links.filter((link) => link.text && link.path);
      } else {
        assignment.links = null;
      }
      return assignment;
    },
  },
  created() {
    // do route checking
    if (!this.assignment) {
      new WarningToast("No assignment specified", 1000);
      this.$router.push("/portal");
    }
  },
  methods: {
    share_assignment() {
      if (navigator.share) {
        navigator
          .share({
            title: this.assignment.name,
            text: this.assignment.description,
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
