<template>
  <footer>
    <p>
      <span>&copy; 2022-2023 MVHS Test Tracker.&nbsp;</span>
      <span>Website by <a href="https://svonk.me/">Sander Vonk</a></span>
    </p>
  </footer>
</template>

<script>
export default {
  name: "BaseFooter",
};
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
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 100%;
}
p > span {
  flex-grow: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: fit-content;
}
p > span:first-child {
  text-align: right;
  flex-shrink: 1;
  flex-basis: 0;
}
p > span:last-child {
  text-align: left;
  flex-shrink: 0;
}
.clip-overflow {
  flex-basis: 0;
}
</style>
