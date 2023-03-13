<template>
  <div class="upcoming_tests">
    <h5>Upcoming Tests</h5>
    <div class="tests_container">
      <ExamCard class="tests_container_test" v-for="test of tests" :test="test" :key="test.id" />
    </div>
  </div>
</template>

<script>
import ExamCard from "./ExamCard.vue";

export default {
  name: "UpcomingTests",
  components: {
    ExamCard,
  },
};
</script>
