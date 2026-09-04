<template>
  <component
    :is="resolvedTag"
    class="button_pointer_text class_name"
    :class="extraClass"
    :style="chipStyle"
    :href="href || undefined"
    :to="to || undefined"
    v-bind="forwardAttrs"
  >
    <slot>{{ displayLabel }}</slot>
  </component>
</template>

<script>
/**
 * Overlay-style class name chip: mixes class color against page `--color-bg`
 * and picks a readable foreground via common/color helpers.
 *
 * Markup/CSS mirrors existing `.button_pointer_text.class_name` chips
 * (ViewTask / LeaveClass / CreateTask). Sets `--color-class` (fg) and
 * `--color-class-alt` (opaque mixed bg) for shared global styles.
 *
 * @module ClassNameChip
 */
import { classChipColors, PAGE_BG_LIGHT, parseHex, resolvePageBg } from "@/common/color";

function readPageBgHex() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return PAGE_BG_LIGHT;
  }
  const el =
    document.getElementById("themed_body") ||
    document.body ||
    document.documentElement;
  try {
    const raw = getComputedStyle(el).getPropertyValue("--color-bg").trim();
    if (raw && parseHex(raw)) return resolvePageBg(raw);
  } catch (_err) {
    /* SSR / test */
  }
  return PAGE_BG_LIGHT;
}

export default {
  name: "ClassNameChip",
  inheritAttrs: false,
  props: {
    /** Class accent hex (e.g. `#45818e`). Required unless `classObj.color` is set. */
    color: {
      type: String,
      default: "",
    },
    /** Explicit label; overrides `classObj` text when set. */
    label: {
      type: String,
      default: "",
    },
    /**
     * Optional class document. Uses `$store.class_text(classObj)` for label
     * and `classObj.color` when `color` prop is empty.
     */
    classObj: {
      type: Object,
      default: null,
    },
    /** Render as `span` (default), `a`, `router-link`, etc. */
    tag: {
      type: String,
      default: "span",
    },
    /** Optional anchor href (implies `tag="a"` when tag is still default). */
    href: {
      type: String,
      default: "",
    },
    /** Optional vue-router `to` (implies `router-link` when tag is default). */
    to: {
      type: [String, Object],
      default: null,
    },
    /**
     * Override page background hex or `"light"` / `"dark"`.
     * When empty, reads CSS `--color-bg` so theme toggle works.
     */
    pageBg: {
      type: String,
      default: "",
    },
    /** Extra class string on the root element. */
    extraClass: {
      type: [String, Object, Array],
      default: "",
    },
  },
  computed: {
    resolvedTag() {
      if (this.tag && this.tag !== "span") return this.tag;
      if (this.to) return "router-link";
      if (this.href) return "a";
      return this.tag || "span";
    },
    resolvedColor() {
      return this.color || this.classObj?.color || "";
    },
    displayLabel() {
      if (this.label) return this.label;
      if (this.classObj && this.$store?.class_text) {
        return this.$store.class_text(this.classObj);
      }
      return "";
    },
    /**
     * Depend on store theme so chip colors refresh when the user toggles dark/light.
     * Still prefer live `--color-bg` from getComputedStyle when available.
     */
    chipStyle() {
      // Reactive theme deps (do not call get_theme — it mutates prefs as a side effect)
      void this.$store?.theme;
      void this.$store?.account_doc?.prefs?.theme;
      const pageBg = this.pageBg ? resolvePageBg(this.pageBg) : readPageBgHex();
      const { background, foreground } = classChipColors(this.resolvedColor, pageBg);
      return {
        "--color-class": foreground,
        "--color-class-alt": background,
      };
    },
    forwardAttrs() {
      const attrs = { ...(this.$attrs || {}) };
      delete attrs.class;
      delete attrs.style;
      return attrs;
    },
  },
};
</script>

<style scoped>
/* Match ViewTask / LeaveClass overlay chip line-height; padding/radius come from
   global `.button_pointer_text` tokens (`--padding-button-display`, `--radius-button-display`). */
.class_name {
  line-height: 1em;
}
</style>
