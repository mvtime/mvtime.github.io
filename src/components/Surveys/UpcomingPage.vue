<template>
  <div class="survey_upcoming survey_part">
    <div class="tasks_container__empty" v-if="!tasks || !tasks.length">
      <div class="tasks_container__empty__text overlay_contents_text">No Upcoming Tasks!</div>
    </div>
    <div class="tasks_container" v-else>
      <ExamCard
        class="tasks_container_task"
        v-for="task of tasks"
        :task="task"
        :key="task.name"
        :href="`/view/${$store.path_to_ref(task.ref)}`"
        target="_blank"
        @click="$event.preventDefault()"
      />
    </div>
  </div>
</template>

<script>
import ExamCard from "@/components/Portal/ExamCard.vue";

export default {
  name: "UpcomingTasks",
  emits: ["update"],
  components: {
    ExamCard,
  },
  computed: {
    tasks() {
      return this.$store.upcoming_todo.slice(0, 4);
    },
    getData() {
      return {
        tasks: this.$store.upcoming_todo,
        num: this.$store.upcoming_todo?.length || 0,
      };
    },
  },
  mounted() {
    this.$emit("update", this.getData);
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
  cursor: unset;
}
.tasks_container__empty {
  text-align: center;
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: center;
}
</style>
