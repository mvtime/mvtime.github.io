const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  configureWebpack: {},
  transpileDependencies: true,
  pwa: {
    themeColor: "#f5c14b",
    msTileColor: "#f5c14b",
    appleMobileWebAppCapable: "yes",
    // theme top bar to match theme color
    appleMobileWebAppStatusBarStyle: "black-translucent",
    name: "MV Test Tracker",
    short_name: "MVTT",
    start_url: "/",
    display: "standalone",
    shortcuts: [
      {
        name: "Home",
        short_name: "Home",
        description: "Go to the home page",
        url: "/",
        icons: [
          {
            src: "/img/icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "Portal",
        short_name: "Portal",
        description: "Open the portal",
        url: "/portal",
        icons: [
          {
            src: "/img/icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    ],
  },
});
