<template>
  <Modal
    :can_continue="true"
    :title="'Leaving MVTT'"
    :html="contents"
    :continue_action="open"
    :skippable="true"
    :skip_text="'Cancel'"
    @skip="$emit('close')"
    :submit_text="'Continue'"
  />
</template>

<script>
/**
 * @file Redirect.vue
 * @displayName Redirect
 * @description A view that redirects to the path specified in the route "path" prop.
 */

import Modal from "@/components/Modal/Modal.vue";
import { WarningToast, SuccessToast } from "@svonk/util";
import { _statuslog } from "@/common";
export default {
  name: "RedirectView",
  components: {
    Modal,
  },
  emits: ["close"],
  data() {
    return { path: "" };
  },
  mounted() {
    this.path = this.$route?.params?.path;
    if (!this.path) {
      new WarningToast("Missing redirect path");
      this.$emit("close");
    } else {
      // fix path to add protocol if it's missing
      this.path = this.path.startsWith("http") ? this.path : `https://${this.path}`;
    }
    try {
      const url = new URL(this.path);
      if ("mvtt.app" == url.host) {
        new SuccessToast("Redirecting to MVTT");
        this.open();
      }
    } catch {
      _statuslog("Couldn not verify path domain is not MVTT");
    }
  },
  computed: {
    contents() {
      return this.path
        ? `You are being redirected to <a href="${this.path}">${new URL(this.path).host}</a>
            <br><br>
           Content outside of MVTT is not vetted by our team, and may be harmful.`
        : "Missing redirect path";
    },
  },
  methods: {
    open() {
      this.$emit("close");
      window.location.replace(this.path);
    },
  },
};
</script>

<style></style>
