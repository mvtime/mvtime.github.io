<template>
  <main class="calendar">
    <nav class="calendar_actions">
      <button class="calendar_action">
        <div class="action_icon arrow-icon left"></div>
      </button>
      <button class="calendar_action">
        <div class="action_icon cal-icon" :class="{ alt: !!tests.length }"></div>
      </button>
      <button class="calendar_action">
        <div class="action_icon arrow-icon right"></div>
      </button>
    </nav>
  </main>
</template>

<script>
export default {
  name: "CalendarBlock",
  props: {
    tests: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    // get the tests from store
  },
};
</script>

<style scoped>
main.calendar {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: var(--padding-calendar);
  padding-top: calc(var(--padding-calendar) * 1.5 + var(--size-calendar-button));
  position: relative;
  /* style */
  background-color: var(--color-calendar);
  border-radius: var(--radius-calendar);
  box-shadow: var(--shadow-highlight);
}
/* use a ::before or ::after to force it to a 3:2 ratio */
main.calendar::before {
  content: "";
  display: block;
  padding-top: 66.66%;
}
.calendar_actions {
  position: absolute;
  top: calc(var(--padding-calendar) / 2);
  right: calc(var(--padding-calendar) / 2);
  height: var(--size-calendar-button);
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-radius: calc(var(--radius-calendar) / 2);
  overflow: hidden;
}
.calendar_actions > .calendar_action {
  height: var(--size-calendar-button);
  width: var(--size-calendar-button);
  background-color: var(--color-calendar-button);
  border: none;
  padding: 0;
}
.calendar_actions > .calendar_action:hover {
  background-color: var(--color-calendar-button-hover);
}
.calendar_actions > .calendar_action > div {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  filter: var(--filter-icon);
  /* img */
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.calendar_action .arrow-icon.left {
  background-image: url(@/assets/img/general/portal/arrow-left.png);
  background-image: url(@/assets/img/general/portal/arrow-left.svg);
}

.calendar_action .cal-icon {
  background-image: url(@/assets/img/general/portal/cal-icon.png);
  background-image: url(@/assets/img/general/portal/cal-icon.svg);
}
.calendar_action .cal-icon.alt {
  background-image: url(@/assets/img/general/portal/cal-icon-alt.png);
  background-image: url(@/assets/img/general/portal/cal-icon-alt.svg);
}
.calendar_actions .arrow-icon.right {
  background-image: url(@/assets/img/general/portal/arrow-right.png);
  background-image: url(@/assets/img/general/portal/arrow-right.svg);
}
</style>
