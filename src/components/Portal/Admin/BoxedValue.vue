<template>
  <div class="boxed boxed__parts" v-if="is_parts">
    <div class="boxed__parts_part" v-for="[key, value] in parts" :key="key">
      <strong class="boxed__parts__key">{{ key }}</strong> -
      <span class="boxed__parts__value">{{ value }}</span>
    </div>
  </div>
  <div class="boxed boxed__list" v-else-if="is_list">
    <div class="boxed__list_item" v-for="item in list" :key="item">{{ item }}</div>
  </div>
  <div class="boxed boxed__value" v-else>{{ value }}</div>
</template>

<script>
export default {
  name: "BoxedValue",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  computed: {
    is_parts() {
      return this.parts !== null;
    },
    parts() {
      try {
        return JSON.parse(this.value);
      } catch (e) {
        return null;
      }
    },
    is_list() {
      return !this.is_parts && this.list.length > 1;
    },
    list() {
      return this.value.split(",");
    },
  },
};
</script>

<style scoped>
div.boxed {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.5em;
}

div.boxed__parts_part,
div.boxed__list_item {
  display: inline-block;
  gap: 0.5em;
  padding: 0.25em 0.5em;
  border-radius: 5px;
  background: var(--color-on-bg-alt);
}
</style>
