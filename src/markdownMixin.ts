import marked from "marked";

export default {
  methods: {
    $markdownToHtml(markdown) {
      return marked(markdown);
    },
  },
};
