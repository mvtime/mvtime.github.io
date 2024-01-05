<template>
  <div
    class="toggle_switch"
    :class="{ toggle_switch__on: is_on, transition: !loads }"
    :disabled="disabled"
    @click="toggle"
  >
    <div v-if="loads" class="toggle_switch__loading" :class="{ is_loading: loading }">
      <span class="loading_bg"></span>
    </div>
    <div class="toggle_switch_knob"></div>
  </div>
</template>

<script>
export default {
  name: "ToggleSwitch",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loads: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update"],
  data() {
    return {
      is_on: this.value,
      loading: false,
    };
  },
  watch: {
    value() {
      this.is_on = this.value;
      this.loading = false;
    },
  },
  methods: {
    toggle() {
      if (this.disabled) return;
      if (this.loads) {
        this.loading = true;
      } else {
        this.is_on = !this.is_on;
      }
      this.$emit("update", !this.is_on);
    },
  },
};
</script>

<style scoped>
.toggle_switch {
  display: inline-block;
  overflow: hidden;
  user-select: none;
  font-size: 1.4em;
  width: 2.2em;
  height: 1em;
  border-radius: var(--radius-button-display);
  background-color: var(--color-button-display);
  position: relative;
  cursor: pointer;
  opacity: 0.8;
}
.toggle_switch.transition {
  transition: background-color 0.2s ease-in-out;
}
.toggle_switch[disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}
.toggle_switch_knob {
  width: calc(1em - 6px);
  height: calc(1em - 6px);
  border-radius: calc(0.7 * var(--radius-button-display));
  background-color: var(--color-on-overlay-input);
  position: absolute;
  top: 3px;
  left: 3px;

  opacity: 0.3;
}
.toggle_switch .toggle_switch_knob {
  transition: left 0.1s ease-in-out, scale 0.1s ease-in-out;
}
.toggle_switch.transition .toggle_switch_knob {
  transition: left 0.2s ease-in-out, background-color 0.2s ease-in-out, opacity 0.2s ease-in-out,
    scale 0.1s ease-in-out;
}
main.parent:not(.simplified) .toggle_switch:not([disabled="true"]):hover .toggle_switch_knob {
  left: 6px;
  scale: 0.9;
}

main.parent:not(.simplified).toggle_switch:not([disabled="true"]).toggle_switch__on:hover
  .toggle_switch_knob {
  left: calc(100% - 1em);
}

.toggle_switch__on {
  background-color: var(--color-theme-alt);
}
.toggle_switch__on .toggle_switch_knob {
  left: calc(100% - 1em + 3px);
  background-color: var(--color-theme);
  opacity: 1;
}

.toggle_switch__loading {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: var(--color-button-display);
  opacity: 0;
  transition: opacity 0.05s ease-in-out;
  transition-delay: 0.1s;
}
.toggle_switch__loading.is_loading {
  opacity: 1;
}
.toggle_switch__loading > .loading_bg {
  display: block;
  width: 100%;
  height: 100%;
  background-size: 1.5em;
  filter: invert(0.8);
}
</style>
