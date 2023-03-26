<template>
  <div class="windows-titlebar">
    <div class="title">
      {{ title }}
    </div>
    <div class="buttons">
      <button class="minimize" @click="minimize">&#xE921;</button>
      <button class="maximize" @click="maximize">&#xE922;</button>
      <button class="close" @click="close">&times;</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WindowsTitleBar",
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
