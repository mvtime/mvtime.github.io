<template>
  <div class="settings">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">Account Preferences</h2>
    </header>
    <div class="overlay_contents">
      <div v-if="!$store.is_teacher" class="overlay_contents_section">
        <div class="overlay_contents_text">
          You can link a personal (non-{{ $store.ORG_DOMAIN.substring(1) }}) account to access
          {{ $env.VUE_APP_BRAND_NAME_SHORT }} when not signed into your school account below!
        </div>
        <div class="overlay_contents_text" v-if="$store.personal_account">
          <br />
          You're currently signed in using a personal account. You can unlink it, or link more
          emails, through your main account.
        </div>
        <div class="inputs_row linked_accounts_row">
          <div class="styled_input styled_links_box">
            <div class="styled_links_display">
              <span
                v-if="!$store.linked_accounts || !$store.linked_accounts.length"
                class="placeholder"
                >No linked accounts, add one below</span
              >
              <div v-else class="styled_line_links">
                <div
                  class="styled_line_links__account"
                  v-for="email in $store.linked_accounts"
                  :class="{ active: $store.personal_account && $store.user.email == email }"
                  :key="email"
                >
                  <div
                    class="styled_line_links__remove"
                    @click="uninvite_linked(email)"
                    v-if="!$store.personal_account"
                    title="Remove Account"
                  >
                    <div class="remove_icon"></div>
                  </div>
                  <div class="styled_line_links__email">{{ email }}</div>
                </div>
              </div>
            </div>
            <hr class="styled_links_separator" />
            <div class="styled_links_add" :class="{ links_personal: $store.personal_account }">
              <input
                class="styled_links_add__text"
                type="email"
                @input="fix_email"
                @update="fix_email"
                v-model="new_email"
                placeholder="Personal Email"
                :disabled="$store.personal_account || loading"
              />
              <button
                class="styled_links_add__action"
                @click="invite_linked"
                :disabled="!ready_to_link"
              >
                {{ $store.personal_account ? "UNAVALIABLE" : "Add" }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!$store.personal_account" class="overlay_contents_text overlay_contents_section">
        Click
        <span
          class="button_pointer_text click-action"
          @click="
            $store.toggle_teacher();
            changed = true;
          "
        >
          here </span
        >&MediumSpace; to {{ $store.is_teacher ? "disable" : "enable" }} teacher mode
        <span v-if="$store.is_teacher">and return to the student view.</span>
        <span v-else
          >to create, and manage your own classes and tasks. This may require setup by an admin if
          you do not have a teacher email.</span
        >
      </div>
      <div class="overlay_contents_text overlay_contents_section">
        <div class="notes_priority_section">
          <ToggleBar
            class="click-action"
            :value="prioritize_notes"
            @update="
              update_account_pref('derank_notes', !$event, [
                'We\'ll show notes above other items on your claendar',
                'You won\'t see notes above other items anymore',
              ])
            "
            :loads="true"
          />
          &nbsp;
          <span
            >Notes priority set to <b>{{ prioritize_notes ? "high" : "low" }}</b></span
          >
        </div>
        <div class="show_finished_section">
          <ToggleBar
            class="click-action"
            :value="include_finished"
            @update="
              update_account_pref('hide_finished', !$event, [
                'You\'ll see finished tasks in your calendar',
                'You won\'t see finished tasks in your calendar anymore',
              ])
            "
            :loads="true"
          />
          &nbsp;
          <span
            >Finished tasks <b> {{ include_finished ? "shown" : "hidden" }}</b> in calendar</span
          >
        </div>
      </div>
      <div class="overlay_contents_text overlay_contents_section">
        <div class="pause_popup_section">
          <ToggleBar
            class="click-action"
            :value="show_timeout"
            @update="
              update_account_pref('hide_timeout', $event, [
                'We\'ll show the popup when your session times out',
                'You won\'t see the timeout popup anymore',
              ])
            "
            :loads="true"
          />
          &nbsp;
          <span
            >Session timeout popup <b>{{ show_timeout ? "enabled" : "disabled" }}</b></span
          >
        </div>
        <div class="pause_popup_section__details overlay_contents_section_details">
          The popup helps conserve local and network resources. To have
          {{ $env.VUE_APP_BRAND_NAME_SHORT }} open on the side without it getting in the way, you
          can toggle it above, though you may then have to reload to get the newest data
        </div>
      </div>
      <div class="overlay_contents_text overlay_contents_section">
        To change your theme, use the
        <span
          id="theme_pointer_button"
          class="button_pointer_text button_pointer_icon click-action"
          @click="$store.toggle_theme()"
        >
          <div class="theme_icon icon"></div>
          Switch Theme
        </span>
        button on the left sidebar or homepage
      </div>
      <div class="overlay_contents_text overlay_contents_section">
        To see how you've been feeling,
        <span
          id="stats_pointer_button"
          class="button_pointer_text button_pointer_icon click-action"
          @click="$router.push({ name: 'stats', query: $route.query })"
        >
          <div class="stats_icon themed_icon icon"></div>
          View your stats
        </span>
        and get an insight into your mental health and productivity
      </div>
      <div class="overlay_contents_text overlay_contents_section">
        <span class="tutorial_redo_section">
          Feeling lost? Try
          <span
            class="button_pointer_text click-action"
            @click="
              changed = true;
              $store.finish_tutorial(false).then(() => {
                $emit('close');
              });
            "
          >
            redoing the tutorial </span
          >. We'll keep this updated as we add new features!
        </span>
      </div>
      <div class="overlay_contents_text overlay_contents_section">
        <div class="simplified_view_section">
          <div class="inline_toggle">
            <ToggleBar
              class="click-action"
              :value="$store.simplified"
              @update="
                update_account_pref('simplified', $event, [
                  'You\'ll now see the classic view',
                  'You\'ll now see the simplified view',
                ]);
                changed = true;
              "
              :loads="true"
            />
            &nbsp;
            <span
              >The <b>{{ $store.simplified ? "simplified" : "classic" }}</b> view is active</span
            >
          </div>
          <div class="pause_popup_section__details overlay_contents_section_details">
            {{ $store.simplified ? "Leave" : "Enter" }} the simplified view to
            <span v-if="!$store.simplified"
              >make {{ $env.VUE_APP_BRAND_NAME_SHORT }} easier to use on slower devices</span
            >
            <span v-else>get back the classic interface</span>.
          </div>
        </div>
      </div>
      <div class="overlay_contents_text overlay_contents_section">
        <p class="email_text">
          You can find controls for your email preferences below. You're opted into all important
          emails by default.
        </p>
        <div class="email_sections">
          <div
            class="email_section"
            v-for="email_category in email_categories"
            :key="email_category.sort_as"
          >
            <ToggleBar
              class="click-action"
              :value="!unsubed_from[email_category.sort_as]"
              :disabled="email_category.locked"
              @update="update_email_pref(email_category.key, email_category.description)"
              :loads="true"
            />
            &nbsp;
            <span>{{ email_category.label }}</span>
          </div>
        </div>
        <div class="email_section__details overlay_contents_section_details">
          We'll try to send you as few emails as possible, but some notifications are essential to
          the operation of {{ $env.VUE_APP_BRAND_NAME_SHORT }}, such as those for account linkage
          and important account changes. Note that linked accounts may also inherit some of your
          email preferences from their student account.
        </div>
      </div>
    </div>
    <div class="bottom_actions">
      <button
        v-if="!$store.personal_account"
        class="back_action click_escape"
        @click="$emit('close')"
      >
        {{ changed || loading ? "Cancel" : "Close" }}
      </button>
      <div class="flex_spacer"></div>
      <button
        class="continue_action click_ctrlenter"
        :class="{ loading_bg: loading }"
        :disabled="!$store.personal_account && !changed && !$store.is_teacher"
        @click="
          if ($store.personal_account || $store.is_teacher) {
            $emit('close');
          } else {
            save();
          }
        "
      >
        {{
          changed
            ? "Finish"
            : $store.personal_account
            ? "Close"
            : $store.is_teacher
            ? "Done"
            : "Finish"
        }}
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

import ToggleBar from "@/components/ToggleBar.vue";
import "@/assets/style/overlay.css";
import { SuccessToast, ErrorToast } from "@svonk/util";
export default {
  name: "SettingsModal",
  emits: ["close"],
  components: {
    ToggleBar,
  },
  data() {
    return {
      changed: false,
      loading: false,
      new_email: "",
      email_categories: [
        {
          key: "task-created",
          label: "Task creation notifications",
          description: "emails about newly created tasks",
          sort_as: "task-created",
        },
        {
          key: "task-updated",
          label: "Task update notifications",
          description: "emails about changed tasks",
          sort_as: "task-updated",
        },
        {
          key: "task-moved",
          label: "Task date change notifications",
          description: "emails when tasks are moved",
          sort_as: "task-moved",
        },
        {
          key: "task-archived",
          label: "Task deletion notifications",
          description: "emails about removed tasks",
          sort_as: "task-archived",
        },
        {
          key: "scheduled-weekly",
          label: "Weekly summary emails",
          description: "weekly summary emails",
          sort_as: "scheduled-weekly",
        },
        {
          key: null,
          label: "Essential emails (required)",
          description: "essential emails about your account",
          locked: true,
          sort_as: "essential",
        },
      ],
    };
  },
  computed: {
    show_timeout() {
      return !this.$store?.account_doc?.prefs?.hide_timeout;
    },
    prioritize_notes() {
      return !this.$store?.account_doc?.prefs?.derank_notes;
    },
    include_finished() {
      return !this.$store?.account_doc?.prefs?.hide_finished;
    },
    ready_to_link() {
      return (
        !this.loading &&
        this.new_email &&
        this.new_email.includes("@") &&
        this.new_email.split("@")[1].includes(".")
      );
    },
    unsubed_from() {
      return this.email_categories.reduce((acc, cur) => {
        acc[cur.key] = this.$store.account_doc?.prefs?.unsub_from?.[cur.key] || false;
        return acc;
      }, {});
    },
  },
  methods: {
    update_account_pref(key, value, [on_true, on_false]) {
      if (this.$store.account_doc) {
        let before = this.$store.account_doc?.prefs?.[key];
        if (before != value) {
          // update the value
          this.$store
            .update_wrapper_with_merge({
              prefs: {
                ...this.$store.account_doc.prefs,
                [key]: value,
              },
            })
            .then(() => {
              this.changed = true;
              new SuccessToast(value ? on_false : on_true, 2000);
            })
            .catch((err) => {
              this.changed = false;
              new ErrorToast(`Couldn't update key ${key} of preferences`, err, 2000);
              this.$status.error('⚙️ Couldn\'t update preferences key "${key}" to "${value}"');
            });
        }
      }
    },
    update_email_pref(key, description) {
      if (this.$store.account_doc) {
        // update account_doc.prefs.unsub_from value to toggle the value of this key
        const before = this.$store.account_doc?.prefs?.unsub_from || {};
        const new_val = !before[key];
        const after = { ...before, [key]: !before[key] };
        this.$store
          .update_wrapper_with_merge({
            prefs: {
              ...this.$store.account_doc.prefs,
              unsub_from: after,
            },
          })
          .then(() => {
            this.changed = true;
            new SuccessToast(
              new_val ? `You'll no longer get ${description}` : `You'll now get ${description}`,
              2000
            );
          })
          .catch((err) => {
            this.changed = false;
            new ErrorToast(
              new_val
                ? `We couldn't unsubscribe you from ${description}`
                : `We couldn't subscribe you to ${description}`,
              err,
              2000
            );
          });
      }
    },
    save() {
      // close the modal if the save was successful
      if (!this.loading) {
        this.$emit("close");
      }
    },
    invite_linked() {
      if (!this.$store.personal_account) {
        this.changed = true;
        this.loading = true;
        this.$store
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
      this.$store
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
.pause_popup_section,
.notes_priority_section,
.show_finished_section,
.inline_toggle,
.email_section {
  line-height: 1.75;
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  /* margin-top: 0.75em; */
}
.email_sections {
  display: flex;
  flex-flow: column nowrap;
  gap: 0.5em;
}
.email_section {
  display: flex;
}
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
.linked_accounts_row {
  margin-bottom: 0;
}
/* make space for new button text */
.links_personal .styled_links_add__text {
  flex-basis: 0;
  width: 20px;
}
.overlay_contents_section_details {
  margin-top: 0.5em;
  opacity: 0.8;
  font-size: 0.9em;
  line-height: 1.5em;
}
.email_text {
  margin: 0;
  margin-bottom: 0.5em;
}
.stats_icon {
  background-image: url(@/assets/img/general/portal/stats.png);
  background-image: url(@/assets/img/general/portal/stats.svg);
}
</style>
