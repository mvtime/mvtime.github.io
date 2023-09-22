<template>
  <div class="survey_upcoming survey_part">
    <div class="tasks_container__empty" v-if="!tasks || !tasks.length">
      <div class="tasks_container__empty__text overlay_contents_text">No Upcoming Tasks!</div>
    </div>
    <div class="tasks_container" v-else>
      <ExamCard class="tasks_container_task" v-for="task of tasks" :task="task" :key="task.name" />
    </div>
  </div>
</template>

<script>
import ExamCard from "@/components/Portal/ExamCard.vue";
import { useMainStore } from "@/store";

export default {
  name: "UpcomingTasks",
  emits: ["update"],
  components: {
    ExamCard,
  },
  computed: {
    store() {
      return useMainStore();
    },
    tasks() {
      if (!this.store.tasks) return [];
      let now = Date.now(); // new Date().setHours(0, 0, 0, 0);
      // 8 hours in ms (show today's tasks as upcoming until 8AM)
      let morning = 8 * 60 * 60 * 1000;
      return this.store.tasks
        .filter((task) => {
          return (
            task.type != "note" && (task?.date?.getTime ? task.date.getTime() : 0) >= now - morning
          );
        })
        .sort((a, b) => {
          if (a.date < b.date) return -1;
          if (a.date > b.date) return 1;
          return 0;
        })
        .slice(0, 4);
    },
    getData() {
      return {
        tasks: this.tasks,
        num: this.tasks?.length || 0,
      };
    },
  },
  watch: {
    getData() {
      this.$emit("update", this.getData);
    },
  },
};
</script>
<style scoped>
.tasks_container_task {
  user-select: none;
}
.tasks_container__empty {
  text-align: center;
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: center;
}
</style>
