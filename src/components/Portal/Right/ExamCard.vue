<template>
  <div class="test_card" :style="{ '--color-calendar-test': test.color }">
    <div class="test_card_icon">
      <div class="test_card_icon_container">
        <div class="test_card_icon_container__img"></div>
      </div>
    </div>
    <div class="test_card_details">
      <div class="test_card_details__title">{{ test.name }}</div>
      <div class="test_card_details__date">
        {{
          test.date.toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })
        }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExamCard",
  props: {
    test: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.test_card {
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: stretch;
  height: var(--height-test-card);
  margin: 10px 0;
}
.test_card_icon {
  height: 100%;
  width: var(--height-test-card);
  border-radius: 30%;
  border: solid 2px var(--color-calendar-test);
  box-sizing: border-box;
  filter: var(--filter-calendar-test);
  overflow: hidden;
  flex-shrink: 0;
  /* box-shadow: 0px 4px 4px var(--color-calendar-test); */
  /* box-shadow: 0px 0px 4px var(--color-calendar-test); */
}
.test_card_icon_container {
  height: 100%;
  width: 100%;
  filter: var(--filter-test-card-icon);
  background-color: var(--color-test-card-icon);
}
.test_card_icon_container__img {
  background-image: url(@/assets/img/general/portal/exam/test-icon.png);
  background-image: url(@/assets/img/general/portal/exam/test-icon.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  padding: var(--padding-test-card-icon);
  filter: var(--filter-icon);
  height: 100%;
  width: 100%;
}
.test_card_details {
  padding-left: 20px;
  flex-grow: 1;
  /* layout */
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  justify-content: space-evenly;
}
/* details */
.test_card_details > * {
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
}
.test_card_details__title {
  font-size: 14px;
  font-weight: 500;
}
.test_card_details__date {
  opacity: 0.5;
  font-size: 12px;
}
</style>
