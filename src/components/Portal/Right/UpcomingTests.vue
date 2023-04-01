<template>
  <div class="upcoming_tests">
    <div v-if="tests && tests.length" class="upcoming_tests__not_empty">
      <h5>Upcoming Tests</h5>
      <hr class="upcoming_tests_hr" />
      <div class="tests_container">
        <ExamCard
          class="tests_container_test"
          v-for="test of tests"
          :test="test"
          :key="test.name"
          @click="show_task(test)"
        />
      </div>
    </div>
    <div v-else class="upcoming_tests__empty">
      <h5>No Upcoming Tests!</h5>
    </div>
    <br />
    <div v-if="assignments && assignments.length" class="upcoming_tests__not_empty">
      <h5>Upcoming Assignments</h5>
      <hr class="upcoming_tests_hr" />
      <div class="tests_container">
        <ExamCard
          class="tests_container_test"
          v-for="test of assignments"
          :test="test"
          :key="test.name"
          @click="show_task(test)"
        />
      </div>
    </div>
    <div v-else class="upcoming_tests__empty">
      <h5>No Upcoming Assignments!</h5>
    </div>
  </div>
</template>

<script>
import ExamCard from "./ExamCard.vue";
import { useMainStore } from "@/store";

export default {
  name: "UpcomingTests",
  components: {
    ExamCard,
  },
  computed: {
    store() {
      return useMainStore();
    },
    tests() {
      return this.store.get_tests
        .filter((test) => {
          return test.date?.getTime() - Date.now() > 24 * 60 * 60 * 1000 && !test.is_assignment;
        })
        .sort((a, b) => {
          if (a.date < b.date) return -1;
          if (a.date > b.date) return 1;
          return 0;
        })
        .slice(0, 4);
    },
    assignments() {
      return this.store.get_tests
        .filter((test) => {
          return test.date?.getTime() - Date.now() > 24 * 60 * 60 * 1000 && test.is_assignment;
        })
        .sort((a, b) => {
          if (a.date < b.date) return -1;
          if (a.date > b.date) return 1;
          return 0;
        })
        .slice(0, 4);
    },
  },
  methods: {
    show_task(test) {
      let testJSON = JSON.stringify({
        name: test.name,
        group: test.class_name,
        date: test.date.toLocaleDateString("en-US").replace("/", "-"),
        description: test.description,
        links: test.links,
      });
      this.$router.push({
        name: test.is_assignment ? "assignment" : "test",
        query: {
          task: testJSON,
        },
      });
    },
  },
};
</script>
<style scoped>
.tests_container_test {
  cursor: pointer;
  user-select: none;
}
.upcoming_tests {
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
.upcoming_tests__not_empty {
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
.upcoming_tests_hr {
  margin: 5px 0;
  border: none;
  border-top: 2px solid var(--color-test-separator);
}
</style>
