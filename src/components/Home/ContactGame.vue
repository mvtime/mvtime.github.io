<template>
  <main class="contactgame">
    <div class="chose_char">
      <div class="char_option" v-for="team_member in team_members" :key="team_member.name">
        <div class="char_option__content">
          <div class="char_option__img">
            <img
              v-for="img in team_member.avatar.srcset"
              :key="img.src"
              :src="img.src"
              class="char_option__img_src"
            />
          </div>
          <div class="char_option_text">
            <div class="char_option_text__name">{{ team_member.name }}</div>
            <div class="char_option_text__nick">{{ team_member.nick }}</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
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
};
</script>

<style scoped>
.contactgame {
  --margin-char: 20px;
  --padding-char: 20px;
  --time-char-animation: 0.3s;
  --color-minigame-bg: #108910;
  --color-minigame-card: #ffffff;
  --color-char-text: #000000;
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
  /* sizing */
  flex-basis: 30%;
  flex-shrink: 1;
  flex-grow: 1;
  height: unset;
  /* for children */
  position: relative;
  /* style */
  background-color: var(--color-minigame-card);
}
.char_option::after {
  /* sizing */
  padding-top: 150%;
}
.char_option__content {
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
}
.char_option:nth-of-type(2) {
  margin: 0 var(--margin-char);
}
/* images */
.char_option__img {
  /* img interaction */
  user-select: none;
  pointer-events: none;
  /* sizing */
  display: block;
  width: 100%;
  /* for children */
  position: relative;
  /* add spacing w/ transparent border */
  border: solid #00000000 20px;
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
