<template>
  <div class="task_card" :style="{ '--color-calendar-task': task.color }">
    <div class="task_card_icon" :title="task.class_name">
      <div class="task_card_icon_container">
        <div class="task_card_icon_container__img"></div>
      </div>
    </div>
    <div class="task_card_details">
      <div class="task_card_details__title">{{ task.name }}</div>
      <div class="task_card_details__extended">
        <span class="task_card_details__extended__date">{{
          task.date.toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })
        }}</span>
        &nbsp;|&nbsp;
        <span class="task_card_details__extended__type">{{ type_full }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExamCard",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  created() {
    console.log(this.task);
  },
  computed: {
    type_full() {
      return {
        note: "Note",
        task: "Assignment",
        // socratic: "Socratic Seminar",
        test: "Test",
        // summative: "Summative Assignment",
        // midterm: "Midterm",
        project: "Project",
        quiz: "Quiz",
        exam: "Exam",
      }[this.task.type];
    },
  },
};
</script>

<style>
.task_card {
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: stretch;
  height: var(--height-task-card);
  margin: 10px 0;
}
.task_card,
.task_card * {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.task_card_icon {
  height: 100%;
  width: var(--height-task-card);
  border-radius: 30%;
  border: solid 2px var(--color-calendar-task);
  box-sizing: border-box;
  filter: var(--filter-calendar-task);
  overflow: hidden;
  flex-shrink: 0;
  /* box-shadow: 0px 4px 4px var(--color-calendar-task); */
  /* box-shadow: 0px 0px 4px var(--color-calendar-task); */
}
.task_card_icon_container {
  height: 100%;
  width: 100%;
  filter: var(--filter-task-card-icon);
  background-color: var(--color-task-card-icon);
}
.task_card_icon_container__img {
  background-image: url(@/assets/img/general/portal/exam/test-icon.png);
  background-image: url(@/assets/img/general/portal/exam/test-icon.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  padding: var(--padding-task-card-icon);
  filter: var(--filter-icon);
  height: 100%;
  width: 100%;
}
.task_card_details {
  padding-left: 20px;
  flex-grow: 1;
  /* layout */
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  justify-content: space-evenly;
}
/* details */
.task_card_details > * {
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
}
.task_card_details__title {
  font-size: 14px;
  font-weight: 500;
}
.task_card_details__extended {
  opacity: 0.5;
  font-size: 12px;
  font-weight: 400;
  /* layout */
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
}
.task_card_details__extended__date {
  flex: auto 0 1;
}
.task_card_details__extended__type {
  flex: 0px 1 1;
}
</style>
