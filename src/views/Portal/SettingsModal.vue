<template>
  <div class="settings">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">Account Preferences</h2>
    </header>
    <div class="overlay_contents">
      <div class="overlay_contents_text">
        You can link a personal (non-mvla.net) account to access MVTT when not signed into your
        school account below!
      </div>

      <div class="inputs_row">
        <div class="styled_input styled_links_box">
          <div class="styled_links_display">
            <span v-if="!store.linked_accounts || !store.linked_accounts.length" class="placeholder"
              >No linked accounts, add one below</span
            >
            <div v-else class="styled_line_links">
              <div
                class="styled_line_links__account"
                v-for="email in store.linked_accounts"
                :class="{ active: store.personal_account && store.user.email == email }"
                :key="email"
              >
                <div
                  class="styled_line_links__remove"
                  @click="unlink_account(email)"
                  v-if="!store.personal_account"
                  title="Remove Account"
                >
                  <div class="remove_icon"></div>
                </div>
                <div class="styled_line_links__email">{{ email }}</div>
              </div>
            </div>
          </div>
          <hr class="styled_links_separator" />
          <div class="styled_links_add">
            <input
              class="styled_links_add__text"
              type="email"
              @input="fix_email"
              @update="fix_email"
              v-model="new_email"
              placeholder="Personal Email"
              :disabled="store.personal_account || loading"
            />
            <button
              class="styled_links_add__action"
              @click="store.personal_account ? null : link_account"
              :disabled="!ready_to_link"
            >
              {{ store.personal_account ? "UNAVALIABLE" : "Add" }}
            </button>
          </div>
        </div>
      </div>
      <div class="overlay_contents_text">
        To change your theme, use the
        <span class="button_pointer_text button_pointer_icon">
          <div class="theme_icon icon"></div>
          Switch Theme
        </span>
        button on the left sidebar
      </div>
    </div>
    <div class="bottom_actions">
      <button v-if="!store.personal_account" class="back_action" @click="$emit('close')">
        {{ changed || loading ? "Cancel" : "Close" }}
      </button>
      <div class="flex_spacer"></div>
      <button
        class="continue_action"
        :class="{ loading_bg: loading }"
        :disabled="!store.personal_account && !changed"
        @click="store.personal_account ? $emit('close') : save"
      >
        {{ store.personal_account ? "Close" : "Link" }}
      </button>
    </div>
  </div>
</template>

<script>
import { useMainStore } from "@/store";
import "@/assets/style/overlay.css";
export default {
  name: "SettingsModal",
  emits: ["close"],
  data() {
    return {
      changed: false,
      loading: false,
      new_email: "",
    };
  },
  computed: {
    store() {
      return useMainStore();
    },
    ready_to_link() {
      return (
        !this.loading &&
        this.new_email &&
        this.new_email.includes("@") &&
        this.new_email.split("@")[1].includes(".")
      );
    },
  },
  methods: {
    save() {
      // close the modal if the save was successful
      if (!this.loading) {
        this.$emit("close");
      }
    },
    link_account() {
      this.changed = true;
      this.loading = true;
      this.store
        .link_account(this.new_email)
        .then(() => {
          this.loading = false;
          this.new_email = "";
        })
        .catch(() => {
          this.loading = false;
          this.changed = false;
        });
    },
    unlink_account(email) {
      this.changed = true;
      this.loading = true;
      this.store
        .unlink_account(email)
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.changed = false;
        });
    },
    fix_email() {
      // fix emails so that they can be signed into with google even if they used the + notation
      if (this.new_email.includes("@")) {
        let [name, domain] = this.new_email.split("@");
        if (name.includes("+")) {
          name = name.split("+")[0];
          this.new_email = `${name}@${domain}`;
        }
      }
    },
  },
};
</script>

<style scoped>
.remove_icon {
  filter: var(--filter-icon);
  background-image: url(@/assets/img/general/portal/remove.png);
  background-image: url(@/assets/img/general/portal/remove.svg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.add_button {
  max-width: 100px;
}
.add_button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
.styled_line_links {
  gap: 10px;
}
</style>
