<template>
  <main class="home">
    <div id="home-main">
      <h2>Organize. Plan. Study.</h2>
      <h4 class="middle-text">Test tracker provides an effective way to manage upcoming exams.</h4>
      <button class="action-btn auth-action">Sign up</button>
    </div>
    <div id="home-art"></div>
  </main>
</template>

<script setup></script>

<style>
.home {
  display: flex;
  flex-flow: row wrap;
  justify-content: stretch;
  align-items: center;
  height: 100%;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}
#home-main > * {
  max-width: 600px;
}
.home .middle-text {
  margin: 25px 0;
}
</style>
