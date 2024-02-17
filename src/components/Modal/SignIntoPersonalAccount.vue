<template>
  <div class="personal_prompt">
    <div class="overlay_contents_text">
      If you're signed into an {{ store.ORG_DOMAIN.substring(1) }} account, you should have been
      signed out automatically
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
import { WarningToast } from "@svonk/util";
export default {
  name: "SignIntoPersonalAccount",
  emits: ["skip", "update", "status"],
  data() {
    return {
      ready: false,
    };
  },
  methods: {
    logout_if_org() {
      // sign out
      if (this.store?.user?.email?.includes(this.store.ORG_DOMAIN)) {
        this.store.logout();
      }
    },
    check_and_emit() {
      // if already linked, exit
      if (
        this.store?.linked_account_doc?.linked_to &&
        this.$route?.params?.code &&
        this.store.linked_account_doc.linked_to == this.$route.params.code
      ) {
        new WarningToast("These two accounts are already linked!", 2000);
        this.$emit("skip");
      } else {
        // otherwise check status
        this.ready =
          this.store.user?.email && !this.store.user.email.includes(this.store.ORG_DOMAIN);
        this.$emit("status", !!this.ready);
      }
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
  computed: {},
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
