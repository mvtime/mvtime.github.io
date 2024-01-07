<template>
  <div class="shortcuts_modal" ref="shortcuts_modal" :class="{ empty: !sections.length }">
    <div class="overlay_contents shortcuts_contents">
      <div v-if="!sections || !sections.length">No Registered Shortcuts</div>
      <div v-else class="shortcuts_sections">
        <div v-for="section in sections" class="shortcuts_section" :key="section.tag">
          <p class="shortcuts_section__title">{{ section.tag || "Other" }}</p>
          <table class="shortcuts_table">
            <tr
              class="shortcuts_table_shortcut"
              v-for="shortcut in section.list"
              :key="shortcut.name"
              tabindex="1"
            >
              <td class="shortcut__key">
                <span class="button_pointer_text" v-for="key in shortcut.keys" :key="key">{{
                  key
                }}</span>
              </td>
              <td class="shortcut__description">{{ shortcut.description }}</td>
            </tr>
          </table>
        </div>
        <div class="shortcuts_section__filler" v-if="sections.length && sections.length % 2"></div>
      </div>
    </div>
    <div class="click_escape nopad" @click="$emit('close')"></div>
  </div>
</template>

<script>
import { useShortcuts } from "@/store/shortcuts";
import "@/assets/style/overlay.css";
export default {
  name: "ShortcutsModal",
  computed: {
    sections() {
      return useShortcuts().sections;
    },
  },
  mounted() {
    this.$refs.shortcuts_modal.focus();
  },
};
</script>

<style scoped>
.shortcuts_sections {
  display: flex;
  flex-flow: row wrap;
  gap: 0.25em;
}
.shortcuts_section {
  padding: 10px;
  border-radius: var(--radius-overlay-input);
  user-select: none;
}
.shortcuts_section__filler,
.shortcuts_section {
  flex: 1 1 275px;
}

.shortcuts_section,
.shortcut__key span {
  transition: background-color 0.2s;
}
.shortcuts_section:not(:only-child):hover {
  background-color: var(--color-on-bg);
}
.shortcuts_section:not(:only-child):hover .shortcut__key span {
  background-color: var(--color-overlay-input);
}
p.shortcuts_section__title {
  font-weight: bold;
  margin-bottom: 0.5em;
  padding-bottom: 0.25em;
  border-bottom: solid 2px var(--color-overlay-border);
  width: 100%;
}
.shortcuts_modal {
  width: 100%;
  max-width: 600px;
}
@media (max-width: 680px) {
  .shortcuts_modal {
    width: fit-content;
  }
  .shortcuts_sections {
    flex-flow: column nowrap;
  }
  .shortcuts_section {
    flex-basis: auto;
  }
  .shortcuts_section__filler {
    display: none;
  }
}
.shortcuts_modal.empty {
  width: fit-content;
}
.overlay_contents.shortcuts_contents {
  border: none;
  padding: calc(var(--padding-overlay) - 10px);
}
.shortcuts_table {
  margin: -0.5em 0;
  padding: 0;
  /* add spacing between rows */
  border-spacing: 0 0.5em;
}
.shortcuts_table_shortcut {
  position: relative;
}
.shortcut__key {
  text-align: right;
  font-weight: bold;
  padding-right: 0.5em;
  white-space: nowrap;
  /* fix for inconsistent width */
  /* width: 75px; */
  display: block;
}
.shortcut__key {
  display: flex;
  flex-flow: row nowrap;
  gap: 0.25em;
}
.shortcut__description {
  padding-left: 0.5em;
  text-align: left;
  width: 100%;
  line-height: 1em;
  font-size: 0.95em;
}
</style>
