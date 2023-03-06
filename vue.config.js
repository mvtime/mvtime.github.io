const CopyWebpackPlugin = require("copy-webpack-plugin");

const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "public/index.html",
            to: "404.html",
          },
        ],
      }),
    ],
  },
  transpileDependencies: true,
});
