<template>
  <div class="styled_input styled_links_box">
    <div class="styled_links_display">
      <span v-if="!links || !links.length" class="placeholder">{{ typeFull }} Links (Optional)</span>
      <div v-else class="styled_line_links">
        <a
          class="styled_line_links__link styled_line_links__remove"
          target="_blank"
          v-for="link in links"
          :key="link.path"
          @click="remove_link(link)"
          >{{ link.text }}</a
        >
      </div>
    </div>
    <hr class="styled_links_separator" />
    <div
      class="styled_links_add"
      @keydown.enter="
        $event.preventDefault();
        add_newlink();
      "
      enterkeyhint="done"
    >
      <input
        class="styled_links_add__path"
        type="url"
        v-model="newlink.path"
        @blur="fix_newlink_path"
        :placeholder="pathPlaceholder"
        enterkeyhint="done"
      />
      <div class="magic_wrapper styled_links_add__sized">
        <input
          class="styled_links_add__text"
          type="text"
          v-model="newlink.text"
          placeholder="Link Text (what students see)"
          enterkeyhint="done"
        />
        <div
          class="magic magic_in styled_magic alt_bg click-action"
          :class="{ magic_out: !path_ready, loading_bg: loading_text }"
          :disabled="!path_ready || loading_text"
          @click="magic_text"
          title="Auto-generate link text"
        ></div>
      </div>
      <button class="styled_links_add__action" @click="add_newlink" :disabled="newlink_not_ready">Add</button>
    </div>
  </div>
</template>

<script>
/**
 * Shared [{text,path}] link editor with magic GET link-text.
 * Create vs Edit URL validation drift is preserved via the `mode` prop.
 *
 * @module LinkEditor
 * @param {Array} links - Current links array
 * @param {string} typeFull - Display name for placeholder (e.g. "Task")
 * @param {"create"|"edit"} mode - Validation mode: create uses new URL(); edit uses startsWith("http")
 */
import { ErrorToast, WarningToast, SuccessToast } from "@svonk/util";

export default {
  name: "LinkEditor",
  props: {
    links: {
      type: Array,
      default: () => [],
    },
    typeFull: {
      type: String,
      default: "Task",
    },
    /**
     * "create" — validate with new URL(), placeholder https://example.com
     * "edit" — validate with startsWith("http"), placeholder http://example.com
     */
    mode: {
      type: String,
      default: "create",
      validator: (v) => ["create", "edit"].includes(v),
    },
  },
  emits: ["update:links"],
  data() {
    return {
      newlink: {
        text: "",
        path: "",
      },
      loading_text: false,
      loaded_text: false,
    };
  },
  computed: {
    pathPlaceholder() {
      // Preserve Create vs Edit example.com https vs http drift intentionally
      return this.mode === "edit" ? "Link URL (http://example.com)" : "Link URL (https://example.com)";
    },
    newlink_not_ready() {
      if (!this.newlink.path || !this.newlink.text) {
        return true;
      }
      if (this.mode === "edit") {
        // Edit: startsWith("http") — intentionally looser than Create
        return !this.newlink.path.startsWith("http");
      }
      // Create: new URL() validation
      try {
        void new URL(this.newlink.path);
        return false;
      } catch (err) {
        return true;
      }
    },
    path_ready() {
      return !this.loaded_text && this.newlink.path && this.newlink_not_ready && this.newlink.path.startsWith("https://");
    },
  },
  watch: {
    "newlink.path"(new_path, old_path) {
      if (new_path != old_path) {
        this.loaded_text = false;
      }
    },
    "newlink.text"(new_text, old_text) {
      if (new_text != old_text) {
        this.loaded_text = false;
      }
    },
  },
  methods: {
    add_newlink() {
      let next = Array.isArray(this.links) ? [...this.links] : [];
      // add protocol if missing
      this.newlink.path = new URL(this.newlink.path).href;
      next.push(this.newlink);
      if (this.mode === "edit") {
        // Preserve Edit's Set-dedup behavior exactly
        next = [...new Set(next)];
      }
      this.$emit("update:links", next);
      this.newlink = {
        text: "",
        path: "",
      };
    },
    remove_link(link) {
      const next = (this.links || []).filter((l) => l.path !== link.path);
      this.$emit("update:links", next);
      this.newlink = link;
    },
    fix_newlink_path() {
      if (this.newlink.path && this.newlink.path.includes(".")) {
        try {
          this.newlink.path = new URL(this.newlink.path).href;
        } catch (err) {
          // add protocol if missing
          this.newlink.path = "https://" + this.newlink.path;
          this.fix_newlink_path();
        }
      }
    },
    async magic_text() {
      if (!this.path_ready || this.newlink.text) return;
      this.loading_text = true;
      this.$magic
        .text(this.newlink.path)
        .then((text) => {
          if (text) {
            new SuccessToast(`Generated link text '${text}'`, 1500);
            this.$status.log("🔗 Generated link text:", text);
            this.newlink.text = text;
          } else {
            new WarningToast("Couldn't reasonably infer link text", 2000);
            this.$status.warn("📃 Couldn't generate link text");
          }
          this.loaded_text = true;
          this.loading_text = false;
        })
        .catch((err) => {
          new ErrorToast("Couldn't generate link text", err, 3000);
          this.$status.error("⚠ Failed link text generation:", err);
          this.loaded_text = false;
          this.loading_text = false;
        });
    },
  },
};
</script>
