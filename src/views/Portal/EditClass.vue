<template>
  <main class="createclass">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">Edit class details</h2>
    </header>
    <div class="overlay_contents" ref="contents">
      <div v-if="ready">
        <div class="overlay_contents_text">
          You're editing
          <a
            class="class_name button_pointer_text"
            :href="`/view/${share_ref}`"
            @click="
              $event.preventDefault();
              $router.push({
                name: 'viewclass',
                params: { ref: share_ref },
                query: $route.query,
              });
            "
            :style="{
              '--color-class': original.color,
              '--color-class-alt': original.color + '2d',
            }"
            >{{ $store.class_text(original) }}</a
          >
        </div>
        <ClassFields
          v-model:period="class_obj.period"
          v-model:name="class_obj.name"
          v-model:color="class_obj.color"
          @submit="update_class"
        />
        <div class="teachers_section">
          <div class="overlay_contents_text">Teachers</div>
          <div class="styled_input styled_links_box">
            <div class="styled_links_display">
              <div class="styled_line_links">
                <span
                  v-for="person in teachers_list"
                  :key="person.email"
                  class="styled_line_links__link"
                  :class="{
                    styled_line_links__remove: is_owner && person.role !== 'owner',
                  }"
                  @click="
                    is_owner &&
                      person.role !== 'owner' &&
                      !loading_teachers &&
                      remove_teacher(person.email)
                  "
                  >{{ person.email }}</span
                >
              </div>
            </div>
            <template v-if="is_owner">
              <hr class="styled_links_separator" />
              <div
                class="styled_links_add"
                @keydown.enter="
                  $event.preventDefault();
                  add_teacher();
                "
              >
                <input
                  class="styled_links_add__path"
                  type="email"
                  v-model="new_teacher_email"
                  :placeholder="'name@' + $env.VUE_APP_ORG_DOMAIN"
                  enterkeyhint="done"
                  :disabled="loading_teachers"
                />
                <button
                  type="button"
                  class="styled_links_add__action"
                  :disabled="loading_teachers || !new_teacher_email"
                  @click="add_teacher"
                >
                  Add
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>
      <img alt="Loading Icon" class="loading_icon" v-else />
    </div>
    <div class="bottom_actions">
      <button
        class="alt_action"
        @click="
          if (ready) {
            share_class();
          } else {
            $emit('close');
          }
        "
        :disabled="ready ? loading_share || !is_owner : false"
        :class="{ loading_bg: loading_share && ready, click_escape: !ready }"
      >
        {{ ready ? "Share" : "Close" }}
      </button>
      <div class="flex_spacer"></div>
      <button class="leave_action primary_styled" @click="leave_class" :disabled="!ready">
        Leave
      </button>
      <button
        class="archive_action primary_styled"
        @click="archive_class"
        :disabled="!ready || !can_save"
        :class="{ loading_bg: loading }"
      >
        Archive
      </button>
      <button
        class="continue_action click_ctrlenter"
        @click="update_class"
        :disabled="!ready || !changed || !class_obj.name || !can_save"
        :class="{ loading_bg: loading }"
      >
        Save
      </button>
    </div>
  </main>
</template>

<script>
/**
 * Component for editing a class if the user is a teacher.
 *
 * @module EditClassView
 * @description Modal that allows the user to edit a class if they are a teacher.
 * @requires module:store/MainStore
 * @emits {Function} close - An event emitted when the class is updated or the modal is closed.
 */

import smoothReflow from "vue-smooth-reflow";
import { WarningToast, ErrorToast } from "@svonk/util";
import ClassFields from "@/components/Portal/ClassFields.vue";
import { shareUrl } from "@/common/share";
import { isCanvasImportEmail, shortShareRef } from "@/common/paths";

/** Extract a human-readable message from a Firebase callable / HttpsError. */
function callableMessage(err) {
  if (!err) return "";
  if (typeof err === "string") return err;
  const details = err.details;
  if (typeof details === "string" && details.trim()) return details;
  if (details && typeof details.message === "string" && details.message.trim()) {
    return details.message;
  }
  return (
    err.message ||
    err.errorInfo?.message ||
    (typeof err.error === "string" ? err.error : "") ||
    ""
  );
}

/** True when the callable rejected because the target is a student (not a teacher). */
function isStudentTargetError(message) {
  const msg = String(message || "").toLowerCase();
  return (
    msg.includes("student") ||
    msg.includes("not a teacher") ||
    msg.includes("not-teacher") ||
    msg.includes("only teachers")
  );
}

export default {
  name: "EditClassView",
  components: { ClassFields },
  emits: ["close"],
  mixins: [smoothReflow],
  data() {
    return {
      class_obj: {},
      original: {},
      loading: false,
      ready: false,
      ref: this.$route?.params?.ref,
      nested_ref: null,
      loading_share: false,
      loading_teachers: false,
      teachers_list: [],
      new_teacher_email: "",
    };
  },
  computed: {
    changed() {
      return JSON.stringify(this.class_obj) != JSON.stringify(this.original);
    },
    share_ref() {
      const id = this.class_obj?._class_id || this.original?._class_id;
      return id ? shortShareRef(id) : this.$route?.params?.ref;
    },
    user_email() {
      return this.$store.active_doc?.email || this.$store.user?.email || "";
    },
    owner_email() {
      const fromList = this.teachers_list.find((t) => t.role === "owner");
      return (
        fromList?.email ||
        this.class_obj?._teacher_email ||
        this.class_obj?.owner_email ||
        this.original?._teacher_email ||
        ""
      );
    },
    is_owner() {
      if (!this.user_email || !this.owner_email) return false;
      return this.user_email.toLowerCase() === this.owner_email.toLowerCase();
    },
    is_co_teacher() {
      if (!this.user_email) return false;
      return this.teachers_list.some(
        (t) => t.email && t.email.toLowerCase() === this.user_email.toLowerCase()
      );
    },
    can_open() {
      return this.$store.can_manage_class(this.class_obj);
    },
    can_save() {
      return this.$store.can_manage_class(this.class_obj);
    },
  },
  mounted() {
    this.$smoothReflow({
      el: this.$refs.contents,
      childTransitions: true,
    });
    if (!this.ref) {
      new WarningToast("Invalid class provided");
      this.$emit("close");
      return;
    }
    this.get_class();
  },
  methods: {
    update_class() {
      if (!this.can_save) {
        new WarningToast("Only the class owner can save changes", 2000);
        return;
      }
      this.loading = true;
      const write_ref = this.nested_ref || this.ref;
      this.$store
        .update_class(write_ref, this.class_obj)
        .then(() => {
          this.$emit("close");
        })
        .catch((err) => {
          new WarningToast("Something went wrong updating the class", 2500);
          this.$status.error("🔥Couldn't update class", this.ref, err);
          this.loading = false;
        });
    },
    archive_class() {
      if (!this.can_save) {
        new WarningToast("Only the class owner can archive", 2000);
        return;
      }
      this.class_obj.archived = true;
      this.update_class();
    },
    get_class() {
      this.ready = false;
      this.$store
        .class_from_ref(this.ref)
        .then((class_obj) => {
          this.class_obj = class_obj;
          this.original = { ...class_obj };
          this.nested_ref = class_obj.ref || this.ref;
          this.teachers_list = this.$store.teachers_for_class(
            class_obj,
            class_obj._teacher_email
          );
          this.ready = true;
          if (!this.can_open) {
            this.$emit("close");
            new WarningToast("You are not a teacher of this class", 2000);
          }
        })
        .catch((err) => {
          new WarningToast("Couldn't find that class", 2000);
          this.$status.error("🔥Couldn't find class for edit", this.ref, err);
          this.$emit("close");
        });
    },
    leave_class() {
      this.$router.push({
        name: "leave",
        params: { ref: this.share_ref || this.$route?.params?.ref },
        query: this.$route.query,
      });
    },
    /** Shares the class join code with the native share function, or to the clipboard if sharing is not supported */
    async share_class() {
      if (!this.is_owner) {
        new WarningToast("Only the class owner can share", 2000);
        return;
      }
      this.loading_share = true;
      const code_ref = this.nested_ref || this.ref;
      this.$store
        .code_from_ref(code_ref)
        .then((code) => {
          let url = new URL(`https://${this.$env.VUE_APP_BRAND_DOMAIN__ADDCLASS}/` + code);
          shareUrl({
            title: this.$store.class_text(this.class_obj),
            text: `Join my class on ${this.$env.VUE_APP_BRAND_NAME_SHORT}!`,
            url: url.href,
            status: this.$status,
          });
          this.loading_share = false;
        })
        .catch((err) => {
          new ErrorToast("Something went wrong getting the code", err?.message || err, 2000);
          this.$status.error("🔥 Couldn't get code", this.ref, err);
          this.loading_share = false;
        });
    },
    async add_teacher() {
      if (!this.is_owner) return;
      let email = (this.new_teacher_email || "").trim().toLowerCase();
      if (!email) return;
      if (!email.includes("@")) {
        email = email + this.$store.ORG_DOMAIN;
      }
      if (isCanvasImportEmail(email)) {
        new WarningToast("Canvas is a class field, not a teacher", 2000);
        return;
      }
      if (this.teachers_list.some((t) => t.email.toLowerCase() === email)) {
        new WarningToast("Already a teacher on this class", 1500);
        return;
      }
      const classId =
        this.class_obj?._class_id || this.original?._class_id || "";
      if (!classId) {
        new WarningToast("Couldn't update teachers", 2000);
        return;
      }

      this.loading_teachers = true;
      try {
        const teacher = await this.$store.add_class_teacher(classId, email);
        const added =
          teacher || { email, name: email.split("@")[0], role: "teacher" };
        if (!this.teachers_list.some((t) => t.email.toLowerCase() === added.email.toLowerCase())) {
          this.teachers_list = [...this.teachers_list, added];
        }
        this.class_obj.teachers = this.teachers_list;
        this.class_obj.teacher_emails = this.teachers_list.map((t) => t.email);
        this.new_teacher_email = "";
      } catch (err) {
        const message = callableMessage(err);
        if (isStudentTargetError(message)) {
          new WarningToast(
            "Only teachers can be added. An admin can grant teacher in the Admin panel.",
            4500
          );
        } else {
          new WarningToast(message || "Couldn't update teachers", 3500);
        }
        this.$status.error("🔥Couldn't add class teacher", err);
      } finally {
        this.loading_teachers = false;
      }
    },
    async remove_teacher(email) {
      if (!this.is_owner) return;
      const target = this.teachers_list.find(
        (t) => t.email.toLowerCase() === email.toLowerCase()
      );
      // Owner chips are not removable in the UI; keep a soft guard
      if (target?.role === "owner") {
        new WarningToast("Cannot remove the class owner", 2000);
        return;
      }
      const classId =
        this.class_obj?._class_id || this.original?._class_id || "";
      if (!classId) {
        new WarningToast("Couldn't update teachers", 2000);
        return;
      }

      this.loading_teachers = true;
      try {
        await this.$store.remove_class_teacher(classId, email);
        this.teachers_list = this.teachers_list.filter(
          (t) => t.email.toLowerCase() !== email.toLowerCase()
        );
        this.class_obj.teachers = this.teachers_list;
        this.class_obj.teacher_emails = this.teachers_list.map((t) => t.email);
      } catch (err) {
        // Surface callable guards (e.g. cannot remove last owner)
        const message = callableMessage(err);
        new WarningToast(message || "Couldn't update teachers", 3500);
        this.$status.error("🔥Couldn't remove class teacher", err);
      } finally {
        this.loading_teachers = false;
      }
    },
  },
};
</script>

<style scoped>
.loading_icon {
  max-height: 84.5px;
  min-width: 100%;
}
.teachers_section {
  margin-top: calc(var(--padding-overlay-input) * 1.25);
}
.teachers_section .overlay_contents_text {
  margin-bottom: calc(var(--padding-overlay-input) / 2);
}
/* plain .styled_input has no background outside .inputs_row */
.teachers_section .styled_links_box {
  background-color: var(--color-overlay-input);
  color: var(--color-on-overlay-input);
  border-radius: var(--radius-overlay-input);
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: unset;
  overflow: hidden;
}
.teachers_section .styled_links_separator {
  margin-left: calc(-1 * var(--padding-overlay-input));
  margin-right: calc(-1 * var(--padding-overlay-input));
}
.teachers_section .styled_line_links__link {
  cursor: default;
}
.teachers_section .styled_line_links__link.styled_line_links__remove {
  cursor: pointer;
}
</style>
