<template>
  <div class="mac-titlebar">
    <div class="title">
      {{ title }}
    </div>
    <div class="buttons">
      <button class="minimize" @click="minimize">-</button>
      <button class="maximize" @click="maximize">&#8597;</button>
      <button class="close" @click="close">&times;</button>
    </div>
  </div>
</template>

<script>
import "./titlebar.css";
export default {
  name: "MacTitleBar",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  methods: {
    minimize() {
      window.api.send("minimize");
    },
    maximize() {
      window.api.send("maximize");
    },
    close() {
      window.api.send("close");
    },
  },
};
</script>
