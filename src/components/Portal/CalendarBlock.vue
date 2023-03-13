<template>
  <main class="calendar"></main>
</template>

<script>
export default {
  name: "CalendarBlock",
  computed: {
    // get the tests from store
  },
};
</script>

<style scoped>
main.calendar {
}
/* use a ::before or ::after to force it to a 4:3 ratio */
main.calendar::before {
  content: "";
  display: block;
  padding-top: 75%;
  background-color: var(--color-calendar-bg);
  border-radius: var(--radius-calendar);
}
</style>
