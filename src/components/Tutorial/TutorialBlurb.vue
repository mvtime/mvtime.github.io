<template>
  <div class="tutorialblurb_group" v-if="!trackel || track">
    <div
      class="tutorialblurb__overlay"
      :style="{
        top: track.top + 'px',
        left: track.left + 'px',
        height: track.height + 'px',
        width: track.width + 'px',
        borderRadius: (options && options.radius) || '5px',
      }"
    ></div>
    <div
      class="tutorialblurb_wrapper"
      ref="dialog"
      :style="{
        top: track.fake_y + 'px',
        left: track.fake_x + 'px',
      }"
    >
      <span
        v-if="track.exists"
        class="tutorialblurb__blurb nopad"
        :style="{ left: track.blurb_x + 'px' }"
      ></span>
      <div class="tutorialblurb modaltype" ref="blurb">
        <header class="modal_header" v-if="title" ref="title">
          <h2 class="header_style modal_header_title">{{ title }}</h2>
        </header>
        <div ref="contents" class="overlay_contents" v-if="content || html">
          <component :is="content" ref="container" @skip="$emit('skip')" />
          <div class="overlay_contents__html" v-if="html" v-html="html"></div>
        </div>
        <div class="bottom_actions">
          <button class="close_action" v-if="skippable" @click="$emit('skip')">
            {{ skip_text }}
          </button>
          <div class="flex_spacer"></div>
          <button class="continue_action" @click="$emit('next')">
            {{ button_text }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @file TutorialBlurb.vue
 * @displayName TutorialBlurb
 * @description A blurb that acts simiarly to a modal, but floats to display a pointer to the element it is describing.
 * @property {String} title - The title of the modal.
 * @property {Object} content - A component to display in the modal.
 * @property {String} html - HTML to display in the modal, if content is not provided.
 * @property {String} submit_text - The text to display on the continue button.
 * @property {String} skip_text - The text to display on the skip button.
 *  */
import smoothReflow from "vue-smooth-reflow";
import $ from "jquery";
export default {
  name: "TutorialBlurb",
  emits: ["next", "skip"],
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: Object,
    },
    html: {
      type: String,
    },
    button_text: {
      type: String,
      required: false,
      default: "Next",
    },
    // element to track position of (jquery string)
    trackel: {
      type: String,
      required: true,
    },
    skippable: {
      type: Boolean,
      required: false,
      default: true,
    },
    skip_text: {
      type: String,
      required: false,
      default: "Skip",
    },
    // more options
    options: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      track: null,
    };
  },
  mixins: [smoothReflow],
  mounted() {
    this.$smoothReflow({
      el: this.$refs.contents,
      hideOverflow: true,
      childTransitions: true,
    });
    this.$smoothReflow({
      el: this.$refs.title,
      hideOverflow: true,
      childTransitions: true,
    });
    window.addEventListener("keydown", this.next_key);
    window.addEventListener("resize", this.track_flush);
    window.addEventListener("scroll", this.track_flush);
    window.setInterval(this.track_flush, 100);
    this.track_flush();
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.next_key);
    // track
    window.removeEventListener("resize", this.track_flush);
    window.removeEventListener("scroll", this.track_flush);
    window.clearInterval(this.track_flush);
  },
  methods: {
    track_fn() {
      const padding = this.options?.padding === undefined ? 10 : this.options.padding;
      if (this.trackel) {
        const el = $(this.trackel);
        if (el.length) {
          // constants for placing on screen
          const screen = {
            w: window.innerWidth,
            h: window.innerHeight,
            pad: 10,
          };
          // get width from ref
          const dialog = {
            w: 350,
            h: (this.$refs?.dialog?.offsetHeight || 200) + 7,
            offset: 25,
            rail_pad: 20,
          };
          // get element data
          const offset = el.offset();
          const width = el.outerWidth();
          const height = el.outerHeight();
          let track = {
            top: offset.top - padding,
            left: offset.left - padding,
            width: width + padding * 2,
            height: height + padding * 2,
            x: offset.left + width / 2 - dialog.offset,
            y: offset.top + height + padding + 7,
            exists: true,
          };
          track.fake_x = Math.max(screen.pad, Math.min(screen.w - dialog.w - screen.pad, track.x));
          track.fake_y = Math.max(screen.pad, Math.min(screen.h - dialog.h - screen.pad, track.y));
          // offset position for the pointer on top of the dialogue from side to side
          track.blurb_x = track.x - track.fake_x + dialog.offset;
          // limit the blurb to the width of the dialogue
          track.blurb_x = Math.max(
            dialog.rail_pad,
            Math.min(dialog.w - dialog.rail_pad, track.blurb_x)
          );
          return track;
        }
      } else if (this.trackel == null) {
        return {
          exists: false,
          fake_y: window.innerHeight / 2 - (this.$refs?.dialog?.offsetHeight || 200) / 2,
          fake_x: window.innerWidth / 2 - 350 / 2,
          top: window.innerHeight / 2,
          left: window.innerWidth / 2,
          width: 0,
          height: 0,
        };
      }

      return this.track;
    },
    next_key(e) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
        this.$emit("next");
      } else if (e.key === "Escape" || e.key === "ArrowLeft") {
        this.$emit("skip");
      }
      // disable page interaction
      e.preventDefault();
      e.stopPropagation();
    },
    track_flush() {
      this.track = this.track_fn();
      if (this.options?.reclick) {
        $(this.options.reclick).click();
      }
    },
  },
  watch: {
    trackel() {
      this.track_flush();
    },
    $route() {
      this.track_flush();
    },
  },
};
</script>

<style>
.tutorialblurb_wrapper {
  position: absolute;
  z-index: 2048;
  transform-origin: -7px 20px;
  /* margin-left: -27px; */
  /* transition */
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  transition-property: left, top, height;
}
.tutorialblurb .overlay_contents,
.tutorialblurb .modal_header {
  transition: height 0.2s ease-out;
}

/* shade */
.tutorialblurb__overlay {
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  z-index: 2047;
  border-radius: 5px;
  box-shadow: 0 0 0 calc(100vw + 100vh) var(--color-overlay);
  /* defaults */
  top: 50%;
  left: 50%;
  height: 0;
  width: 0;
  /* transition */
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  transition-property: left, top, height, width, border-radius;
}
.tutorialblurb_group {
  z-index: 2048;
  position: fixed;
  pointer-events: all;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.tutorialblurb {
  min-height: 200px;
  width: 350px;
}
.tutorialblurb__blurb {
  position: absolute;
  top: -7px;
  left: 20px;
  width: 14px;
  height: 7px;
  margin-left: -8px;
  box-sizing: content-box;
  border: solid var(--thickness-overlay-border) var(--color-overlay-border);
  background-color: var(--color-bg);
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  transition: left 0.3s ease-in-out;
}
</style>
