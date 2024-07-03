const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const webpack = require("webpack");

const envPlugin = () => {
  return new webpack.DefinePlugin(
    Object.keys(process.env).reduce((acc, key) => {
      acc[`process.env.${key}`] = JSON.stringify(process.env[key]);
      return acc;
    }, {})
  );
};

module.exports = defineConfig({
  configureWebpack: {
    plugins: [envPlugin()],
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".vue", ".json"],
    },
    module: {
      rules: [
        // add typescript support
        {
          test: /\.ts$/,
          loader: "ts-loader",
          options: { appendTsSuffixTo: [/\.vue$/] },
        },
        // Handle .md files in assets
        {
          test: /\.md$/,
          include: [path.resolve(__dirname, "src/assets")],
          use: [
            {
              loader: "html-loader", // Add html-loader to handle the result of markdown-loader
            },
            {
              loader: "markdown-loader",
            },
          ],
        },
        // replace %VARIABLE% in the contents of .css files with the value of process.env.VARIABLE
        {
          // apply to css and json files
          test: /\.(css|json)$/,
          use: [
            {
              loader: "string-replace-loader",
              options: {
                search: /%(\w+)%/g,
                replace: (match, p1) => process.env[p1],
              },
            },
          ],
        },
      ],
    },
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: process.env.VUE_APP_BRAND_DOMAIN.split(".").reverse().join("."),
        productName: process.env.VUE_APP_BRAND_NAME_LONG,
        copyright: `© 2022-2023 ${process.env.VUE_APP_BRAND_NAME_LONG}`,
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
        artifactName: process.env.VUE_APP_BRAND_NAME_SHORT + "-setup.${ext}",
        protocols: [
          {
            name: `${process.env.VUE_APP_BRAND_NAME_SHORT} App`,
            role: "Viewer",
            schemes: ["app", process.env.VUE_APP_BRAND_NAME_SHORT.toLowerCase()],
          },
        ],
      },
    },
  },
  transpileDependencies: true,
  pwa: {
    workboxOptions: {
      skipWaiting: true,
    },
    themeColor: "",
    msTileColor: `#${process.env.VUE_APP_THEME_COLOR}`,
    author: "Sander Vonk",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black-translucent",
    display: "standalone",
    manifestOptions: {
      name: process.env.VUE_APP_BRAND_NAME_LONG,
      id: process.env.VUE_APP_BRAND_DOMAIN,
      short_name: process.env.VUE_APP_BRAND_NAME_SHORT,
      theme_color: `#${process.env.VUE_APP_THEME_COLOR}`,
      description: `${process.env.VUE_APP_BRAND_NAME_LONG} provides a more effective way to manage your upcoming tests and exams.`,
      screenshots: [
        // in ./img/ss/
        {
          src: "./img/ss/portal-narrow.png",
          sizes: "390x694",
          form_factor: "narrow",
          type: "image/png",
          label: "Portal (narrow)",
          discription: "The portal page on a narrow screen",
        },
        {
          src: "./img/ss/portal-wide.png",
          sizes: "1280x720",
          form_factor: "wide",
          type: "image/png",
          label: "Portal (wide)",
          discription: "The portal page on a wide screen",
        },
        {
          src: "./img/ss/portal-wide-light.png",
          sizes: "1280x720",
          form_factor: "wide",
          type: "image/png",
          label: "Portal (wide & light theme)",
          discription: "The portal page on a wide screen",
        },
        {
          src: "./img/ss/login-narrow.png",
          sizes: "390x694",
          form_factor: "narrow",
          type: "image/png",
          label: "Login (narrow)",
          discription: "The login page on a narrow screen",
        },
        {
          src: "./img/ss/login-wide.png",
          sizes: "1280x720",
          form_factor: "wide",
          type: "image/png",
          label: "Login (wide)",
          discription: "The login page on a wide screen",
        },
        // {
        //   src: "./img/ss/test-wide.png",
        //   sizes: "390x844",
        //   type: "image/png",
        //   label: "Test (narrow)",
        //   discription: "Viewing a test on a narrow screen",
        // },
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
