<template>
  <div class="settings">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">Account Preferences</h2>
    </header>
    <div class="overlay_contents">
      <div v-if="!store.is_teacher">
        <div class="overlay_contents_text">
          You can link a personal (non-mvla.net) account to access MVTT when not signed into your
          school account below!
        </div>
        <div class="inputs_row">
          <div class="styled_input styled_links_box">
            <div class="styled_links_display">
              <span
                v-if="!store.linked_accounts || !store.linked_accounts.length"
                class="placeholder"
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
                    @click="uninvite_linked(email)"
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
                @click="invite_linked"
                :disabled="!ready_to_link"
              >
                {{ store.personal_account ? "UNAVALIABLE" : "Add" }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!store.personal_account" class="overlay_contents_text">
        Click
        <span
          class="button_pointer_text click-action"
          @click="
            store.toggle_teacher();
            changed = true;
          "
        >
          here </span
        >&MediumSpace; to {{ store.is_teacher ? "disable" : "enable" }} teacher mode&MediumSpace;
        <span v-if="store.is_teacher">to return to the student view.</span>
        <span v-else
          >to create, and manage your own classes and tasks. This may require setup by an admin if
          you do not have a teacher email.</span
        >
      </div>
      <div class="overlay_contents_text">
        To change your theme, use the
        <span
          id="theme_pointer_button"
          class="button_pointer_text button_pointer_icon click-action"
          @click="store.toggle_theme()"
        >
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
        :disabled="!store.personal_account && !changed && !store.is_teacher"
        @click="
          if (store.personal_account || store.is_teacher) {
            $emit('close');
          } else {
            save();
          }
        "
      >
        {{ store.personal_account ? "Close" : store.is_teacher ? "Done" : "Finish" }}
      </button>
    </div>
  </div>
</template>

<script>
/**
 * Settings modal for managing user preferences.
 *
 * @module SettingsModal
 * @description Modal that allows users to manage their settings, which is at this point just linked accounts.
 * @requires module:store/MainStore
 * @emits {Function} close - An event emitted when the modal is closed.
 */

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
    invite_linked() {
      if (!this.store.personal_account) {
        this.changed = true;
        this.loading = true;
        this.store
          .invite_linked(this.new_email)
          .then(() => {
            this.loading = false;
            this.new_email = "";
          })
          .catch(() => {
            this.loading = false;
            this.changed = false;
          });
      }
    },
    uninvite_linked(email) {
      this.changed = true;
      this.loading = true;
      this.store
        .uninvite_linked(email)
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
