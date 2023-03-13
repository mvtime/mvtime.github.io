<template>
  <div class="test_card">
    <div class="test_card_icon">
      <object :data="require()" type="img/svg+xml" alt="Test Icon">
        <img :src="require()" alt="Test Icon" />
      </object>
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
}
.test_vard_icon {
  height: 100%;
  width: var(--height-test-card);
}
</style>
