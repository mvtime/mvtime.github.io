<template>
  <div class="upcoming_tasks">
    <div v-if="(tasks && tasks.length) || loading" class="upcoming_tasks__not_empty">
      <h5>
        <router-link :to="{ name: 'study' }" class="upcoming_tasks__title">Upcoming</router-link>
      </h5>
      <hr class="upcoming_tasks_hr" />
      <transition-group
        class="tasks_container"
        v-if="tasks && tasks.length"
        name="upcoming-group"
        tag="div"
      >
        <ExamCard
          class="tasks_container_task"
          v-for="task of tasks"
          :task="task"
          :key="task.ref"
          :href="`/view/${$store.path_to_ref(task.ref)}`"
          target="_blank"
          @click="
            $event.preventDefault();
            show_task(task);
          "
        />
      </transition-group>
      <img v-else class="loading_tasks loading_icon" alt="Loading..." />
    </div>
    <div v-else class="upcoming_tasks__empty">
      <h5>No Upcoming Tasks!</h5>
    </div>
  </div>
</template>

<script>
import ExamCard from "@/components/Portal/ExamCard.vue";

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
    tasks() {
      return this.$store.upcoming_todo.slice(0, 6);
    },
  },
  methods: {
    /** Show a task in the ViewTask ModalVue */
    show_task(task) {
      this.$router.push({
        name: "viewtask",
        params: {
          // replace all slashes with ~ to avoid router issues
          ref: this.$store.path_to_ref(task.ref),
        },
        query: this.$route.query,
      });
    },
  },
};
</script>
<style scoped>
/* list transitions */
.upcoming-group-move {
  transition: transform 0.2s ease-out;
}
.upcoming-group-enter-active {
  animation: slide-in 0.2s ease-out;
}
.upcoming-group-leave-active {
  animation: slide-out 0.2s ease-out;
}
/* enter and leave animations */
@keyframes slide-in {
  0% {
    scale: 0.8;
    opacity: 0;
    margin-bottom: -50px;
  }
  100% {
    scale: 1;
    opacity: 1;
    margin-bottom: 0;
  }
}
@keyframes slide-out {
  0% {
    scale: 1;
    opacity: 1;
    margin-bottom: 0;
  }
  100% {
    scale: 0.8;
    opacity: 0;
    margin-bottom: -50px;
  }
}

/* other styles */
.tasks_container_task {
  cursor: pointer;
  user-select: none;
  margin: 0;
  transform-origin: top center;
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
.tasks_container {
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
  margin-top: 10px;
  max-height: calc(40px * 6 + 10px * 5);
}
.tasks_container_task {
  flex: 0 0 40px;
  height: 40px;
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
