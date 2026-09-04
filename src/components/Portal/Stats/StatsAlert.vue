<template>
  <div class="stats_alert" :class="`stats_alert--${severity}`" role="status">
    <img class="stats_alert__icon" :src="iconSrc" alt="" width="20" height="20" />
    <div class="stats_alert__body">
      <slot>{{ text }}</slot>
    </div>
  </div>
</template>

<script>
/**
 * Light MUI-ish alert for Stats empty / unavailable / note states.
 * Tinted background + icon + short text; uses overlay / toast tokens.
 *
 * @module StatsAlert
 */
import infoIcon from "@/assets/img/general/portal/info.svg";
import warnIcon from "@/assets/img/general/toast/connection-warn.svg";
import errorIcon from "@/assets/img/general/toast/connection-error.svg";

const ICONS = {
  info: infoIcon,
  warning: warnIcon,
  error: errorIcon,
};

export default {
  name: "StatsAlert",
  props: {
    /** Visual tone: info | warning | error */
    severity: {
      type: String,
      default: "info",
      validator: (v) => ["info", "warning", "error"].includes(v),
    },
    /** Plain text when no slot content is provided */
    text: {
      type: String,
      default: "",
    },
  },
  computed: {
    iconSrc() {
      return ICONS[this.severity] || ICONS.info;
    },
  },
};
</script>

<style scoped>
.stats_alert {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  padding: calc(var(--padding-overlay-input) * 0.75) var(--padding-overlay-input);
  border-radius: var(--radius-overlay-input);
  font-size: 0.95em;
  line-height: 1.35;
  color: var(--color-on-overlay-input);
  background: var(--color-overlay-input);
}
.stats_alert__icon {
  flex: 0 0 auto;
  width: 20px;
  height: 20px;
  margin-top: 1px;
  object-fit: contain;
  filter: var(--filter-icon);
}
.stats_alert--warning .stats_alert__icon,
.stats_alert--error .stats_alert__icon {
  /* toast icons are already colored discs; don't invert them */
  filter: none;
}
.stats_alert__body {
  flex: 1 1 auto;
  min-width: 0;
}
.stats_alert--info {
  background: var(--color-overlay-link-hover);
  color: var(--color-text);
}
.stats_alert--warning {
  background: var(--toast-bg);
  color: var(--toast-text);
}
.stats_alert--error {
  background: var(--color-overlay-link-remove-hover);
  color: var(--color-on-overlay-link-remove-hover);
}
.stats_alert :deep(a) {
  color: inherit;
  text-decoration: underline;
}
</style>
