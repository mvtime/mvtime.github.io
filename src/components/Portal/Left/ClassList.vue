<template>
  <div class="class_list">
    <div v-if="classes" class="class_list__not_empty">
      <h5>Classes</h5>
      <hr class="class_list_hr" />
      <div class="classes_container">
        <div class="classes_container_class" v-for="class_obj of classes" :key="class_obj.name">
          <span class="class_swatch" :style="{ '--color-class': class_obj.color }"></span>
          <span class="class_name">{{ class_obj.name }}</span>
        </div>
        <div
          class="classes_container_class classes_container_class__add_class"
          @click="$router.push('/portal/classes')"
        >
          <div class="class_swatch">
            <div class="class_swatch__add_icon"></div>
          </div>
          <span class="class_name">Add a Class</span>
        </div>
      </div>
    </div>
    <div v-else class="class_list__empty">
      <h5>
        No Classes Yet.
        <router-link to="/portal/classes">Add Some!</router-link>
      </h5>
    </div>
  </div>
</template>

<script>
import { useMainStore } from "@/store";
export default {
  name: "ClassList",
  computed: {
    store() {
      return useMainStore();
    },
    classes() {
      return this.store.classes;
    },
  },
};
</script>

<style scoped>
.class_list {
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
.class_list__not_empty {
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
.class_list_hr {
  margin: 5px 0;
  border: none;
  border-top: 2px solid var(--color-test-separator);
}
/* class */
.classes_container_class {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: stretch;
  margin: var(--spacing-classes) 0;
  user-select: none;
  /* temp */
  padding: 0 var(--spacing-classes-alt);
}
.classes_container_class__add_class {
  background-color: var(--color-on-bg);
  padding: var(--spacing-classes-alt);
  border-radius: 10px;
  cursor: pointer;
}
.classes_container_class__add_class .class_name {
  font-size: 0.8em;
  opacity: 0.7;
  text-align: center;
  flex-grow: 1;
  padding-right: calc(15px + 20px);
}
.classes_container_class > * {
  pointer-events: none;
}
.class_swatch__add_icon {
  width: 100%;
  height: 100%;
  filter: var(--filter-icon);
  background-image: url(@/assets/img/general/portal/add.png);
  background-image: url(@/assets/img/general/portal/add.svg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.class_swatch {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 30%;
  margin-right: 15px;
  background-color: var(--color-class);
  filter: var(--filter-calendar-test);
}
.classes_container_class__add_class .class_swatch {
  background-color: var(--color-bg);
  filter: none;
}
.class_name {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.015rem;
  text-align: left;
}
</style>
