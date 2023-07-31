<template>
  <main class="todo center-1000">
    <div class="todo_header">
      <h2 class="header_style">Feature Roadmap</h2>
      <br />
      <h3 class="secondary_home_text">
        Here's a peek at our planned features. We're always open to suggestions, just
        <router-link class="click-action" to="/contact">shoot us a message</router-link>!
      </h3>
    </div>
    <hr />
    <div class="todo_body md">
      <div v-if="renderedTodo" v-html="renderedTodo"></div>
      <div v-else class="todo_placeholder">
        <img alt="Loading..." class="loading_icon" />
      </div>
    </div>
  </main>
</template>

<script>
import "@/assets/style/markdown.css";
export default {
  data() {
    return {
      renderedTodo: "",
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
main.todo {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
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
