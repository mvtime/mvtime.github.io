<template>
  <ModalFromPages :pages="pages" @finish="finish" ref="survey_modal"></ModalFromPages>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import { useMainStore } from "@/store";
import { shallowRef } from "vue";
import { WarningToast } from "@svonk/util";
import ModalFromPages from "@/components/Modal/ModalFromPages.vue";
import SignIntoPersonalAccount from "@/components/Modal/SignIntoPersonalAccount.vue";
import LinkAccount from "@/components/Modal/LinkAccount.vue";
import "@/assets/style/overlay.css";
export default {
  name: "LinkModal",
  emits: ["close"],
  components: {
    ModalFromPages,
    SignIntoPersonalAccount,
    LinkAccount,
  },
  data() {
    return {
      ready: false,
      pages: [
        {
          title: "Link Personal Account",
          html: `<div class='overlay_contents_text'>Thank you for taking the time to link your account. This will allow you to access your account from any device.<br/><br/> You'll need to be signed into your personal account in order to continue, we'll guide you through that on the next page.</div>`,
          submit_text: "Okay",
          is_notification: true,
        },
        {
          title: "Sign into Personal Account",
          content: shallowRef(SignIntoPersonalAccount),
          submit_text: "Continue",
        },
        {
          title: "Account Details",
          content: shallowRef(LinkAccount),
          submit_text: "Link",
        },
      ],
    };
  },
  props: {
    code: {
      type: String,
      default: "",
    },
  },
  computed: {
    store() {
      return useMainStore();
    },
  },
  mounted() {
    if (!this.code) {
      new WarningToast("No code provided!", "You must provide a code to link your account.");
      this.$emit("close");
    } else {
      this.ready = true;
    }
    this.store.personal_account = true;
  },
  methods: {
    finish() {
      this.store.link_account_code(this.code).then(() => {
        this.$emit("close");
      });
    },
  },
};
</script>

<style></style>
