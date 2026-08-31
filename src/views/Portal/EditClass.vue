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
          <div class="overlay_contents_text teachers_heading">Teachers</div>
          <ul class="teachers_list">
            <li v-for="person in teachers_list" :key="person.email" class="teacher_row">
              <span class="teacher_email">{{ person.email }}</span>
              <span class="teacher_name" v-if="person.name">{{ person.name }}</span>
              <span class="teacher_role">{{ person.role || "teacher" }}</span>
              <button
                v-if="is_owner && person.role !== 'owner'"
                type="button"
                class="teacher_remove"
                :disabled="loading_teachers"
                @click="remove_teacher(person.email)"
              >
                Remove
              </button>
            </li>
          </ul>
          <div v-if="is_owner" class="teacher_add_row">
            <input
              class="styled_input teacher_add_input"
              type="email"
              v-model="new_teacher_email"
              placeholder="co-teacher@email"
              enterkeyhint="done"
              @keydown.enter.prevent="add_teacher"
            />
            <button
              type="button"
              class="teacher_add_btn"
              :disabled="loading_teachers || !new_teacher_email"
              @click="add_teacher"
            >
              Add
            </button>
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
        :disabled="!ready || !is_owner"
        :class="{ loading_bg: loading }"
      >
        Archive
      </button>
      <button
        class="continue_action click_ctrlenter"
        @click="update_class"
        :disabled="!ready || !changed || !class_obj.name || !is_owner"
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
      return this.is_owner || this.is_co_teacher;
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
      if (!this.is_owner) {
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
      if (!this.is_owner) {
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
    async persist_teachers(nextList) {
      this.loading_teachers = true;
      try {
        const write_ref = this.nested_ref || this.ref;
        await this.$store.update_class_teachers(write_ref, nextList);
        this.teachers_list = nextList;
        this.class_obj.teachers = nextList;
        this.class_obj.teacher_emails = nextList.map((t) => t.email);
      } catch (err) {
        new WarningToast("Couldn't update teachers", 2000);
        this.$status.error("🔥Couldn't update teachers", err);
      } finally {
        this.loading_teachers = false;
      }
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
      const next = [
        ...this.teachers_list,
        { email, name: email.split("@")[0], role: "teacher" },
      ];
      this.new_teacher_email = "";
      await this.persist_teachers(next);
    },
    async remove_teacher(email) {
      if (!this.is_owner) return;
      const next = this.teachers_list.filter(
        (t) => t.email.toLowerCase() !== email.toLowerCase() || t.role === "owner"
      );
      // Never remove the sole owner row
      if (!next.some((t) => t.role === "owner")) {
        new WarningToast("Cannot remove the class owner", 2000);
        return;
      }
      await this.persist_teachers(next);
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
.teachers_heading {
  margin-bottom: calc(var(--padding-overlay-input) / 2);
}
.teachers_list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: calc(var(--padding-overlay-input) / 2);
}
.teacher_row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5em;
  font-size: 0.95em;
}
.teacher_email {
  font-weight: 600;
}
.teacher_name {
  opacity: 0.8;
}
.teacher_role {
  opacity: 0.65;
  text-transform: capitalize;
}
.teacher_remove {
  margin-left: auto;
  background: transparent;
  border: none;
  color: inherit;
  opacity: 0.7;
  cursor: pointer;
  text-decoration: underline;
}
.teacher_add_row {
  display: flex;
  gap: 0.5em;
  margin-top: calc(var(--padding-overlay-input) / 2);
}
.teacher_add_input {
  flex: 1;
}
.teacher_add_btn {
  flex-shrink: 0;
}
</style>
