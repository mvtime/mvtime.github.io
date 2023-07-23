<template>
  <main class="contactgame">
    <div class="choose_char" v-if="path == 'chosing'">
      <div
        class="char_option"
        v-for="team_member in team_members"
        :key="team_member.name"
        @click="do_path(team_member)"
      >
        <div class="char_option__content fancy_corners">
          <div
            class="char_option__img_container fancy_corners alt_corners"
            :style="{ background: team_member.avatar.background }"
          >
            <div class="char_option__img">
              <img
                v-for="src in team_member.avatar.srcset"
                :key="src"
                :src="src"
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
    <div class="char_path" v-if="path == 'character'" @click="next_line">
      <div class="char_path_frame">
        <img class="char_path_frame__img" :src="current_path.avatar.still" />
      </div>
      <div class="char_path_box_container">
        <div class="char_path_box fancy_corners">
          <span class="char_path_box__speaker"
            >{{ current_path.name }} - {{ current_path.nick }}</span
          >
          <hr />
          <span v-html="current_line" class="char_path_box__line"></span>
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
          name: "Sander",
          nick: "Framework Boy",
          ability: "inception",
          avatar: {
            srcset: [
              require("@/assets/img/art/char/sander/1.png"),
              require("@/assets/img/art/char/sander/2.png"),
              require("@/assets/img/art/char/sander/3.png"),
              require("@/assets/img/art/char/sander/4.png"),
            ],
            still: require("@/assets/img/art/char/sander/still.png"),
            background: "#ffffff",
          },
          lines: [
            `Hi there! You can find me on <a href="https://linkedin.com/in/sandercvonk/">LinkedIn</a>, email me at <a href="mailto:sander@svonk.me">sander@svonk.me</a> or just <a href="https://svonk.me/ecard" download>add me to your contacts!<a>`,
            `Thanks for using MVTT! We really hope you find it useful, and if you have any feedback, please reach out!`,
          ],
        },
        {
          name: "Aarush",
          nick: "Dr. Hashmap",
          ability: "rain",
          avatar: {
            srcset: [
              require("@/assets/img/art/char/aarush/1.png"),
              require("@/assets/img/art/char/aarush/2.png"),
              require("@/assets/img/art/char/aarush/3.png"),
              require("@/assets/img/art/char/aarush/4.png"),
            ],
            still: require("@/assets/img/art/char/aarush/still.png"),
            background: "#0D0D0D",
          },
          lines: [
            `Hi I'm Aarush! Add me on <a href="https://www.linkedin.com/in/aarush-agarwal-2751a61b1/">LinkedIn</a>!`,
          ],
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
      if (
        (this.line_index || this.line_index == 0) &&
        this.line_index <= this.current_path.lines.length - 2
      ) {
        this.line_index++;
      } else {
        // exit back to previous screen
        this.path = "chosing";
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
  --margin-char: calc(5px + 2vw);
  --padding-char: 20px;
  --time-char-animation: 0.3s;
  /* --color-minigame-bg: #108910; */
  --color-minigame-bg: var(--color-home);
  --color-minigame-card: #ffffff;
  --color-char-text: #000000;
  --color-minigame-accent: #000000;
  /* sizing */
  width: 100%;
  height: 100%;
  /* styles */
  background-color: var(--color-minigame-bg);
  /* layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
/* character selection */
.choose_char {
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;
  /* sizing */
  width: 100%;
  height: 100%;
  /* position */
  align-items: center;
  margin: 0 auto;
  max-width: 800px;
}
.char_option {
  /* interaction */
  cursor: pointer;
  /* sizing */
  flex-basis: 200px;
  flex-shrink: 1;
  flex-grow: 1;
  min-width: 120px;
  /* for children */
  position: relative;
  /* style */
  background-color: var(--color-minigame-card);
  /* options for border style */
  --corner-color-bg: var(--color-minigame-bg);
  --corner-color-border: var(--color-minigame-accent);
  /* animation */
  transform: scale(1);
  transition: transform 1s ease-out;
}

.char_option:hover {
  transform: scale(1.05);
  transition-timing-function: ease-in-out;
  transition-duration: 0.25s;
}

.char_path_box_container {
  /* positioning */
  /* position: fixed; */
  bottom: 0;
  left: 0;
  width: 100%;
  /* padding: var(--padding-char); */
  box-sizing: border-box;
}
.char_path_frame {
  flex-grow: 1;
  flex-basis: 100%;
  /* sizing */
  max-width: 350px;
  min-width: 150px;
}
.char_path_frame .char_path_frame__img {
  object-position: center;
  object-fit: contain;
  image-rendering: pixelated;
  width: 100%;
  height: 100%;
  padding-bottom: var(--padding-char);
}
.char_path {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: stretch;
  height: 100%;
  width: 100%;
  flex-grow: 1;
  flex-basis: 100px;
  /* max-width: 500px; */
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
  min-height: 115px;
  /* sizing */
  max-width: 900px;
  margin-right: auto;
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
.char_option {
  margin: var(--margin-char);
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
  /* scaling */
  image-rendering: pixelated;
  /* animation */
  visibility: hidden;
  animation: blink_quarter calc(var(--time-char-animation) * 4) infinite;
}
.char_option__img_src:nth-of-type(1) {
  animation-delay: calc(var(--time-char-animation) * 0);
}
.char_option__img_src:nth-of-type(2) {
  animation-delay: calc(var(--time-char-animation) * 1);
}
.char_option__img_src:nth-of-type(3) {
  animation-delay: calc(var(--time-char-animation) * 2);
}
.char_option__img_src:nth-of-type(4) {
  animation-delay: calc(var(--time-char-animation) * 3);
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
