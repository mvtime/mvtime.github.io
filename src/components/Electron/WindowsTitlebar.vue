<template>
  <div class="windows-titlebar">
    <div class="drag_region">
      <span class="title">
        {{ title }}
      </span>
    </div>
    <div class="buttons">
      <button id="minimize_button">-</button>
      <button id="maximize_button">+</button>
      <button id="close_button">&times;</button>
    </div>
  </div>
</template>

<script>
import "./titlebar.css";
export default {
  name: "WindowsTitleBar",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>
<style scoped>
.title {
  padding-left: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.drag_region {
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
.windows-titlebar {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding: 0;
  font-size: 12px;
  font-weight: 600;
  user-select: none;
}
.buttons {
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: stretch;
}
.buttons button {
  width: 46px;
  height: 32px;
  border: none;
  border-radius: 0;
  margin: 0;
  padding: 0;
  background-color: #00000000;
  color: var(--theme-text-color);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  pointer-events: all;
  flex: 0 0 auto;
  transition: background-color 0.2s ease;
}
.buttons button:hover {
  background-color: var(--theme-color-hover);
}
.buttons button#close_button:hover {
  /* use windows close button color */
  background-color: #e81123;
}
</style>
