<template>
  <main class="todo center-1000" :class="{ show_completed: showCompleted }">
    <div class="todo_header">
      <h2 class="header_style">Feature Roadmap</h2>
      <br />
      <h3 class="secondary_home_text">
        Here's a peek at our planned features. We're always open to suggestions, just
        <router-link class="click-action" to="/contact">shoot us a message</router-link>!
      </h3>
      <br />
      <div v-if="renderedTodo" class="toggle_line">
        <ToggleBar
          class="click-action"
          :value="showCompleted"
          @update="showCompleted = !showCompleted"
          :loads="false"
        />&nbsp;
        <span>Show completed items</span>
      </div>
    </div>
    <hr />
    <div class="todo_body md mono">
      <div v-if="renderedTodo" v-html="renderedTodo"></div>
      <div v-else class="todo_placeholder">
        <img alt="Loading..." class="loading_icon" />
      </div>
    </div>
  </main>
</template>

<script>
import "@/assets/style/markdown.css";
import ToggleBar from "@/components/ToggleBar.vue";
export default {
  name: "TodoView",
  components: {
    ToggleBar,
  },
  data() {
    return {
      renderedTodo: "",
      showCompleted: false,
    };
  },
  computed: {
    todoMarkdown() {
      try {
        return require("@/assets/todo.md");
      } catch (e) {
        return null;
      }
    },
  },
  mounted() {
    // The content is already converted to HTML by markdown-loader and html-loader
    this.renderedTodo = this.todoMarkdown?.default;
  },
};
</script>

<style scoped>
.toggle_line {
  /* font-size: 14px; */
  line-height: 1.75;
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
}
main.todo {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
}
main.todo strong,
main.todo b {
  background: var(--color-theme);
}
main.todo .todo_header {
  max-width: 600px;
}
main.todo > hr {
  width: 100%;
  margin: 20px 0;
  border: 0;
  height: 3px;
  border-radius: 4px;
  opacity: 0.8;
  background-image: linear-gradient(to right, var(--color-theme) 50px, rgba(0, 0, 0, 0) 75%);
}
.todo_body {
  opacity: 0.8;
  line-height: 1.7em;
  font-family: Lato, Inter, sans-serif;
  width: 100%;
  max-width: 1000px;
  cursor: default;
}

.todo_placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}
h3.secondary_home_text {
  font-size: 20px;
  line-height: 32px;
}
</style>
<style>
.todo_body ul ul > li:has(> del) {
  opacity: 0.5;
  scale: 0.95;
  transform-origin: -1em;
  line-height: 1.15em;
  transition: opacity 0.2s ease-in-out;
}
.todo:not(.show_completed) li:has(> del) {
  display: none !important;
}

.todo_body ul > li:hover {
  opacity: 1;
}
</style>
