<template>
  <div class="teacher_actions">
    <div
      v-for="test_type of test_types"
      :key="test_type[0]"
      class="teacher_action"
      @click="
        $router.push({
          name: 'newtask',
          params: { tasktype: test_type[0] },
        })
      "
    >
      <div class="teacher_action__icon icon__add"></div>
      <div class="teacher_action__text">Schedule a {{ test_type[1] }}</div>
    </div>

    <div class="teacher_action" @click="$router.push('/portal/create')">
      <div class="teacher_action__icon icon__create"></div>
      <div class="teacher_action__text">Create a Class</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test_types: [
        ["socratic", "Socratic Seminar"],
        ["test", "Test"],
        ["summative", "Summative Assignment"],
        ["midterm", "Midterm"],
        ["project", "Project"],
      ],
    };
  },
};
</script>

<style>
.teacher_actions {
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  justify-content: center;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: 100px;
  margin: 10px 0;
}
.teacher_actions .teacher_action {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 0;
  height: var(--height-sidebar-action);
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  background-color: var(--color-bg);
  border-radius: 10px;
  padding: 10px;
  padding-left: 0px;
}
.teacher_actions .teacher_action:hover {
  background-color: var(--color-on-bg);
}
.teacher_actions .teacher_action:not(:first-child) {
  margin-top: 15px;
}
.teacher_action__icon {
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 40px;
  height: 40px;
  width: 40px;
  background-size: 40px 40px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: var(--color-on-bg);
  border-radius: 10px;
  margin-right: 10px;
}
.teacher_action__icon > * {
  flex-shrink: 0;
  filter: var(--filter-icon);
}
.icon__add {
  background-image: url("@/assets/img/general/portal/actions/add.png");
  background-image: url("@/assets/img/general/portal/actions/add.svg");
}
.icon__create {
  background-image: url("@/assets/img/general/portal/actions/create.png");
  background-image: url("@/assets/img/general/portal/actions/create.svg");
}
</style>
