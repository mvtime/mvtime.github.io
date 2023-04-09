<template>
  <main class="contactgame">
    <div class="chose_char" v-if="path == 'chosing'">
      <div
        class="char_option"
        v-for="team_member in team_members"
        :key="team_member.name"
        @click="do_path(team_member)"
      >
        <div class="char_option__content fancy_corners">
          <div class="char_option__img_container fancy_corners alt_corners">
            <div class="char_option__img">
              <img
                v-for="img in team_member.avatar.srcset"
                :key="img.src"
                :src="img.src"
                class="char_option__img_src"
              />
            </div>
          </div>
          <div class="char_option_text">
            <div class="char_option_text__name">{{ team_member.name }}</div>
            <div class="char_option_text__nick">{{ team_member.nick }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="char_path" v-if="path == 'character'">
      <div class="char_path_frame"></div>
      <div class="char_path_box_container" @click="next_line">
        <div class="char_path_box fancy_corners">
          <span class="char_path_box__speaker"
            >{{ current_path.name }} - {{ current_path.nick }}</span
          >
          <hr />
          <span class="char_path_box__line">{{ current_line }}</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      current_path: null,
      line_index: 0,
      path: "chosing",
      team_members: [
        {
          name: "Aarush",
          nick: "Dr. Hashmap",
          ability: "rain",
          avatar: {
            srcset: ["", "", "", ""],
          },
          lines: ["Line 1", "Line 2"],
        },
        {
          name: "Sander",
          nick: "Framework Boy",
          ability: "inception",
          avatar: {
            srcset: ["", "", "", ""],
          },
          lines: ["Line 1", "Line 2"],
        },
        {
          name: "Akshay",
          nick: "Border Radiiser",
          ability: "build",
          avatar: {
            srcset: ["", "", "", ""],
          },
          lines: ["Line 1", "Line 2"],
        },
      ],
    };
  },
  computed: {
    current_line() {
      return this.current_path.lines[this.line_index];
    },
  },
  methods: {
    do_path(path_data) {
      this.current_path = path_data;
      this.line_index = 0;
      this.path = "character";
    },
    next_line() {
      if (this.line_index && this.line_index <= this.current_path.lines.length - 1) {
        this.line_index++;
      } else {
        this.line_index = 0;
      }
    },
  },
};
</script>

<style scoped>
/* fancy corners */
.fancy_corners {
  border: solid var(--thickness-fancy-border) var(--corner-color-border);
  position: relative;
}
.fancy_corners::before,
.fancy_corners::after {
  content: "";
  display: block;
  border: solid var(--thickness-fancy-border) var(--corner-color-border);
  position: absolute;
  z-index: 10;
}
.fancy_corners:not(.alt_corners)::before {
  border-left-color: var(--corner-color-bg);
  border-top-color: var(--corner-color-bg);
  top: calc(0px - var(--thickness-fancy-border));
  left: calc(0px - var(--thickness-fancy-border));
}
.fancy_corners:not(.alt_corners)::after {
  border-right-color: var(--corner-color-bg);
  border-bottom-color: var(--corner-color-bg);
  bottom: calc(0px - var(--thickness-fancy-border));
  right: calc(0px - var(--thickness-fancy-border));
}
.fancy_corners.alt_corners::before {
  border-right-color: var(--corner-color-bg);
  border-top-color: var(--corner-color-bg);
  top: calc(0px - var(--thickness-fancy-border));
  right: calc(0px - var(--thickness-fancy-border));
}
.fancy_corners.alt_corners::after {
  border-left-color: var(--corner-color-bg);
  border-bottom-color: var(--corner-color-bg);
  bottom: calc(0px - var(--thickness-fancy-border));
  left: calc(0px - var(--thickness-fancy-border));
}
/* contact game page */
.contactgame {
  --thickness-fancy-border: 4px;
  --margin-char: 20px;
  --padding-char: 20px;
  --time-char-animation: 0.3s;
  --color-minigame-bg: #108910;
  --color-minigame-card: #ffffff;
  --color-char-text: #000000;
  --color-minigame-accent: #000000;
  /* sizing */
  width: 100%;
  height: 100%;
  /* styles */
  background-color: var(--color-minigame-bg);
}
/* character selection */
.chose_char {
  display: flex;
  flex-flow: row nowrap;
  overflow: hidden;
  /* sizing */
  width: 100%;
  height: 100%;
  /* position */
  align-items: center;
  margin: 0 auto;
  max-width: 700px;
}
.char_option {
  /* interaction */
  cursor: pointer;
  /* sizing */
  flex-basis: 30%;
  flex-shrink: 1;
  flex-grow: 1;
  /* for children */
  position: relative;
  /* style */
  background-color: var(--color-minigame-card);
  /* options for border style */
  --corner-color-bg: var(--color-minigame-bg);
  --corner-color-border: var(--color-minigame-accent);
}
.char_path_box_container {
  /* positioning */
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: var(--padding-char);
  box-sizing: border-box;
}
.char_path_box {
  /* style */
  background-color: var(--color-minigame-card);
  color: var(--color-char-text);
  padding: var(--padding-char);
  font-family: monospace;
  /* options for border style */
  --corner-color-bg: var(--color-minigame-bg);
  --corner-color-border: var(--color-minigame-accent);
  /* sizing */
  width: 100%;
  min-height: 100px;
}
.char_path_box__speaker {
  font-weight: bold;
  font-size: 1.25em;
}
.char_option::after {
  content: "";
  display: block;
  /* sizing */
  padding-top: 150%;
}
.char_option__content {
  /* interaction */
  user-select: none;
  pointer-events: none;
  /* sizing */
  width: 100%;
  height: 100%;
  /* position */
  position: absolute;
  top: 0;
  left: 0;
  /* fitting */
  display: flex;
  flex-flow: column nowrap;
  padding: var(--padding-char);
  box-sizing: border-box;
  /* alignment */
  justify-content: stretch;
  align-items: stretch;
}
.char_option:nth-of-type(2) {
  margin: 0 var(--margin-char);
}
/* images */
.char_option__img_container {
  flex-grow: 1;
  display: flex;
  --corner-color-bg: var(--color-minigame-card);
  --corner-color-border: var(--color-minigame-accent);
}
.char_option__img {
  /* sizing */
  display: block;
  width: 100%;
  /* for children */
  position: relative;
  overflow: hidden;
}
.char_option__img::after {
  /* force to square aspect ratio */
  content: "";
  display: block;
  padding-top: 100%;
}
@keyframes blink_quarter {
  0% {
    visibility: visible;
  }
  25% {
    visibility: hidden;
  }
}
.char_option__img_src {
  /* image sizing */
  object-position: center center;
  object-fit: contain;
  /* fit box created by ::before */
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  /* animation */
  visibility: hidden;
  animation: blink_quarter calc(var(--time-char-animation) * 4) infinite;
}
.char_option__img_src:nth-of-type(1) {
  animation-delay: calc(var(--time-char-animation) * 0);
  background-color: #111;
}
.char_option__img_src:nth-of-type(2) {
  animation-delay: calc(var(--time-char-animation) * 1);
  background-color: #222;
}
.char_option__img_src:nth-of-type(3) {
  animation-delay: calc(var(--time-char-animation) * 2);
  background-color: #333;
}
.char_option__img_src:nth-of-type(4) {
  animation-delay: calc(var(--time-char-animation) * 3);
  background-color: #444;
}
/* text */
.char_option_text {
  margin-top: 0.5em;
  text-align: center;
  font-family: "Open Sans Mono", monospace;
  color: var(--color-char-text);
}
.char_option_text > * {
  font-family: inherit;
  color: inherit;
}
.char_option_text .char_option_text__name {
  font-size: 1.5em;
  margin-bottom: 0.25em;
}
.char_option_text .char_option_text__nick {
  font-size: 1em;
  opacity: 0.5;
}
</style>
