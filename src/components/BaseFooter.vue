<template>
  <footer>
    <p>
      &copy; 2022-2023 MVHS Test Tracker. Website by
      <a href="https://svonk.me/">Sander Vonk</a>
    </p>
  </footer>
</template>

<script>
export default {
  name: 'BaseFooter'
}
</script>
<style scoped>
footer {
  width: 100%;
  white-space: break-spaces;
  height: var(--footer-height);
}
footer p {
  margin: 0;
  padding: 0.5rem;
  text-align: center;
  background-color: var(--color-footer);
  color: var(--color-footer-text);
}
</style>
