const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  configureWebpack: {},
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "app.mvtt",
        productName: "MV-Test-Tracker",
        copyright: "MV Test Tracker",
        win: {
          icon: "public/img/icons/app.ico",
          target: "nsis",
        },
        mac: {
          icon: "public/img/icons/app.icns",
          target: "dmg",
        },
        linux: {
          icon: "public/img/icons/app.png",
          target: "AppImage",
        },
        artifactName: "${productName}.${ext}",
      },
    },
  },
  transpileDependencies: true,
  pwa: {
    themeColor: "",
    msTileColor: "#f5c14b",
    author: "Sander Vonk",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black-translucent",
    display: "standalone",
    manifestOptions: {
      name: "MV Test Tracker",
      short_name: "MVTT",
      theme_color: "#f5c14b",
      description:
        "MV Test tracker provides an effective way to manage your upcoming tests and exams.",
      screenshots: [
        // in ./img/ss/
        {
          src: "./img/ss/portal-wide.png",
          sizes: "1280x720",
          type: "image/png",
          label: "Portal (wide)",
          discription: "The portal page on a wide screen",
        },
        {
          src: "./img/ss/portal-narrow.png",
          sizes: "390x694",
          type: "image/png",
          label: "Portal (narrow)",
          discription: "The portal page on a narrow screen",
        },
        {
          src: "./img/ss/portal-wide-light.png",
          sizes: "1280x720",
          type: "image/png",
          label: "Portal (wide & light theme)",
          discription: "The portal page on a wide screen",
        },
        {
          src: "./img/ss/login-narrow.png",
          sizes: "390x694",
          type: "image/png",
          label: "Login (narrow)",
          discription: "The login page on a narrow screen",
        },
        {
          src: "./img/ss/login-wide.png",
          sizes: "390x844",
          type: "image/png",
          label: "Login (wide)",
          discription: "The login page on a wide screen",
        },
        {
          src: "./img/ss/test-wide.png",
          sizes: "390x844",
          type: "image/png",
          label: "Test (narrow)",
          discription: "Viewing a test on a narrow screen",
        },
        // {
        //   src: "./img/ss/test-wide.png",
        //   sizes: "1280x720",
        //   type: "image/png",
        //   label: "Test (wide)",
        //   discription: "Viewing a test on a wide screen",
        // },
        // {
        //   src: "./img/ss/test-wide-light.png",
        //   sizes: "1280x720",
        //   type: "image/png",
        //   label: "Test (wide & light theme)",
        //   discription: "Viewing a test on a wide screen",
        // },
      ],
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
      icons: [
        {
          src: "./img/icons/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "./img/icons/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "./img/icons/android-chrome-maskable-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "./img/icons/android-chrome-maskable-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "./img/icons/apple-touch-icon-60x60.png",
          sizes: "60x60",
          type: "image/png",
        },
        {
          src: "./img/icons/apple-touch-icon-76x76.png",
          sizes: "76x76",
          type: "image/png",
        },
        {
          src: "./img/icons/apple-touch-icon-120x120.png",
          sizes: "120x120",
          type: "image/png",
        },
        {
          src: "./img/icons/apple-touch-icon-152x152.png",
          sizes: "152x152",
          type: "image/png",
        },
        {
          src: "./img/icons/apple-touch-icon-180x180.png",
          sizes: "180x180",
          type: "image/png",
        },
        {
          src: "./img/icons/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
        {
          src: "./img/icons/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
        {
          src: "./img/icons/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          src: "./img/icons/msapplication-icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "./img/icons/mstile-150x150.png",
          sizes: "150x150",
          type: "image/png",
        },
      ],
    },
  },
});
