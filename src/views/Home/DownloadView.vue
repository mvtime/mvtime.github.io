<template>
  <main class="download center-1000">
    <div class="download_header">
      <h2>Downloads</h2>
      <br />
      <h3 class="secondary_home_text">
        Get the latest version of MV Test Tracker for your platform. (Coming Soon!)
      </h3>
    </div>
    <hr />
    <p class="download_body">
      MV Test Tracker is currently in development. We're working hard to get the first version out
      as soon as possible. In the meantime, you can check out our
      <router-link to="/about">About</router-link> page to learn more about our mission, and our
      <router-link to="/contact">Contact</router-link>
      page to get in touch with us.
    </p>
    <br />
    <!-- download for windows from /download/MV-Test-Tracker.exe -->
    <span>
      <a href="/download/MV-Test-Tracker.exe" download>
        <button class="download_button click-action action-btn">Windows</button>
      </a>
      <!-- &nbsp;
      <a href="/download/MV-Test-Tracker.exe" download>
        <button class="download_button click-action action-btn">Mac</button>
      </a> -->
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
