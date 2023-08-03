<template>
  <div class="personal_prompt">
    <div class="overlay_contents_text">
      If you're signed into an mvla.net account, you should have been signed out automatically
    </div>
    <div class="inputs_row">
      <button class="primary_styled styled_input" @click="sign_into_personal" :disabled="ready">
        Login to Personal Account
      </button>
    </div>
    <div class="overlay_contents_text">Please sign into your personal account to continue</div>
  </div>
</template>

<script>
import { useMainStore } from "@/store";
export default {
  name: "SignIntoPersonalAccount",
  emits: ["update", "status"],
  data() {
    return {
      ready: false,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    logout_if_org() {
      // sign out
      if (this.store?.user?.email?.includes("mvla.net")) {
        this.store.logout();
      }
    },
    check_and_emit() {
      this.ready = this.store.user?.email && !this.store.user.email.includes("mvla.net");
      this.$emit("status", !!this.ready);
    },
    sign_into_personal() {
      this.store.personal_account = true;
      this.store
        .login_personal()
        .then(() => {
          this.logout_if_org();
          this.check_and_emit();
        })
        .catch(() => {
          this.check_and_emit();
        });
    },
  },
  computed: {
    store() {
      return useMainStore();
    },
  },
  mounted() {
    this.logout_if_org();
    this.check_and_emit();
  },
  watch: {
    store: {
      handler() {
        this.logout_if_org();
        this.check_and_emit();
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.login_button {
  text-align: center;
}
</style>
