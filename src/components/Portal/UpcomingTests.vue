<template>
  <div class="upcoming_tasks">
    <div v-if="(tasks && tasks.length) || loading" class="upcoming_tasks__not_empty">
      <h5>
        <router-link :to="{ name: 'study' }" class="upcoming_tasks__title">Upcoming</router-link>
      </h5>
      <hr class="upcoming_tasks_hr" />
      <div class="tasks_container" v-if="tasks && tasks.length">
        <ExamCard
          class="tasks_container_task"
          v-for="task of tasks"
          :task="task"
          :key="task.name"
          :href="`/view/${store.path_to_ref(task.ref)}`"
          target="_blank"
          @click="
            $event.preventDefault();
            show_task(task);
          "
        />
      </div>
      <img v-else class="loading_tasks loading_icon" alt="Loading..." />
    </div>
    <div v-else class="upcoming_tasks__empty">
      <h5>No Upcoming Tasks!</h5>
    </div>
  </div>
</template>

<script>
import ExamCard from "@/components/Portal/ExamCard.vue";
import { useMainStore } from "@/store";

export default {
  name: "UpcomingTasks",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ExamCard,
  },
  computed: {
    store() {
      return useMainStore();
    },
    tasks() {
      return this.store.upcoming.slice(0, 6);
    },
  },
  methods: {
    /** Show a task in the ViewTask ModalVue */
    show_task(task) {
      this.$router.push({
        name: "viewtask",
        params: {
          // replace all slashes with ~ to avoid router issues
          ref: this.store.path_to_ref(task.ref),
        },
      });
    },
  },
};
</script>
<style scoped>
.tasks_container_task {
  cursor: pointer;
  user-select: none;
}
.upcoming_tasks {
  margin: auto 0;
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  justify-content: center;
  flex-basis: 200px;
  flex-shrink: 1;
}
.upcoming_tasks__not_empty {
  flex-shrink: 1;
  padding-bottom: 40px;
}
h5 {
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.015rem;
  line-height: 27px;
  text-align: center;
}
.upcoming_tasks__title {
  color: inherit;
}
.upcoming_tasks_hr {
  margin: 5px 0;
  border: none;
  border-top: 2px solid var(--color-task-separator);
}
.loading_tasks {
  min-width: 100%;
  max-height: 150px;
}
</style>
