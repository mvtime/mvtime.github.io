<template>
  <Modal
    class="logout_modal"
    :can_continue="true"
    :title="'Log Out'"
    :html="html"
    :continue_action="logout"
    :skippable="true"
    @skip="$emit('close')"
    :skip_text="'Cancel'"
    :submit_text="'Confirm'"
  />
</template>

<script>
import { useMainStore } from "@/store";
import Modal from "@/components/Modal/Modal.vue";
export default {
  name: "LogoutModal",
  emits: ["close"],
  components: {
    Modal,
  },
  data() {
    return {
      html: `<div class="overlay_contents_text">Are you sure you want to log out?<br><br>You may lose access to what you were working on, and unsaved changes may be discarded.</div>`,
    };
  },
  methods: {
    logout() {
      useMainStore().logout();
      this.$emit("close");
    },
  },
  mounted() {
    // set close timeout
    setTimeout(() => {
      this.$emit("close");
    }, 10000);
  },
};
</script>

<style></style>
