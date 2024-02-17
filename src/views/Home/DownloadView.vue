<template>
  <main class="download center-1000">
    <div class="download_header">
      <h2 class="header_style">Downloads</h2>
      <br />
      <h3 class="secondary_home_text">
        Get the latest version of {{$env.VUE_APP_BRAND_LONG_NAME}} for your platform. (Coming Soon!)
      </h3>
    </div>
    <hr />
    <p class="download_body">
      {{$env.VUE_APP_BRAND_LONG_NAME}} is currently in development. We're working hard to get the first version out
      as soon as possible. In the meantime, you can check out our
      <router-link to="/about">about</router-link> page to learn more about our mission, and our
      <router-link to="/contact">contact</router-link>
      page to get in touch with us.
    </p>
    <br>
    <p class="download_body">
      <!-- information about how to use the chrome extension based on the notes below:
        Visit chrome://extensions (or edge://extensions on edge).
        Enable Developer mode by ticking the checkbox in the upper-right corner.
        Click on the "Load unpacked extension..." button.
        Select the directory containing your unpacked extension.
      -->

      Since the extension uses the v2 manifest, it cannot be installed through the Chrome Web Store. To install the extension, follow the steps below:

      <ol class="download_body">
        <li>Download the extension from the link below.</li>
        <li>Open the Extension Management page:
          <ol>
            <li>You can do this by navigating to <a class="linked">chrome://extensions</a> (or <a class="linked">edge://extensions</a> if you're using Microsoft Edge)</li>
            <li>or by opening the browser menu, hovering over <span class="button_pointer_text">More Tools</span> then selecting <span class="button_pointer_text">Extensions</span>.</li>
          </ol>
        </li>
        <li>Enable Developer Mode by clicking the toggle switch next to Developer mode.</li>
        <li>Click the <span class="button_pointer_text">Load Unpacked</span> button and select the extension directory.</li>
      </ol>
      
    </p>
    <br />
    <span>
      <a
        :href="$env.VUE_APP_SIDEBAR_DOWNLOAD_URL"
        :download="$env.VUE_APP_BRAND_SHORT_NAME + '-SIDEBAR--drop-me-on-the-developer-extensions-page.zip'"
      >
        <button class="download_button click-action action-btn">Chrome Extension</button>
      </a>
    </span>
  </main>
</template>

<script>
export default {};
</script>

<style scoped>
main.download {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
}
main.download .download_header {
  max-width: 600px;
}
main.download .button_pointer_text {
  line-height: 1;
}
main.download > hr {
  width: 100%;
  margin: 20px 0;
  border: 0;
  height: 3px;
  border-radius: 4px;
  opacity: 0.8;
  background-image: linear-gradient(to right, var(--color-theme) 50px, rgba(0, 0, 0, 0) 75%);
}
.download_body {
  opacity: 0.8;
  line-height: 1.7em;
  font-family: Lato, Inter, sans-serif;
  width: 100%;
  max-width: 1000px;
}
.action-btn {
  padding: 16px 40px;
}
</style>
