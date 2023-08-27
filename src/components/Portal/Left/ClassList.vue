<template>
  <div class="class_list">
    <div class="class_list__not_empty" :class="{ filtering: !!filtered_classes.length }">
      <h5
        @click="$emit('clear_filters')"
        :title="filtered_classes.length ? 'Click to clear filters' : ''"
      >
        Classes
      </h5>
      <hr class="class_list_hr" />
      <div class="classes_container" :class="{ filtering: !!filtered_classes.length }">
        <div
          class="classes_container_class"
          v-for="class_obj of classes"
          :key="class_obj.name"
          @click="$emit('toggle_filtered_class', class_obj.id)"
          :style="{ '--color-class': class_obj.color, '--color-class-alt': class_obj.color + '40' }"
          :class="{ filter_active: filtered_classes.includes(class_obj.id) }"
        >
          <div
            class="class_swatch"
            title="Remove Class"
            @click="
              leave_class(class_obj);
              $event.stopPropagation();
            "
          >
            <div class="class_swatch__icon"></div>
          </div>

          <span v-if="class_obj.period" class="class_name"
            >P{{ class_obj.period }} - {{ class_obj.name }}</span
          >
          <span v-else class="class_name">{{ class_obj.name }}</span>
        </div>
        <div
          v-if="!store.is_teacher || true"
          class="classes_container_class classes_container_class__add_class"
          @click="$router.push('/portal/add')"
        >
          <div class="class_swatch">
            <div class="class_swatch__add_icon"></div>
          </div>
          <span class="class_name">Join a Class</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMainStore } from "@/store";
export default {
  props: {
    filtered_classes: {
      type: Array,
      default: () => [],
    },
  },
  name: "ClassList",
  computed: {
    store() {
      return useMainStore();
    },
    classes() {
      return this.store.classes;
    },
  },
  emits: ["toggle_filtered_class", "clear_filters"],
  methods: {
    leave_class(class_obj) {
      this.$router.push({
        name: "leave",
        params: {
          ref: class_obj.id.split("/").join("~"),
        },
      });
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
  border-radius: 8px;
  user-select: none;
}
.filtering h5:hover {
  background-color: var(--color-on-bg);
}
.class_list_hr {
  margin: 5px 0;
  border: none;
  border-top: 2px solid var(--color-task-separator);
}
/* class */
.classes_container_class {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: stretch;
  margin: var(--spacing-classes) 0;
  user-select: none;
  border-radius: 5px;
  padding: var(--spacing-classes-alt);
}
.classes_container_class:hover {
  background-color: var(--color-on-bg);
}
/* class filtering */
.filtering .classes_container_class:not(.classes_container_class__add_class) {
  opacity: 0.7;
}
.filtering .classes_container_class.filter_active {
  background-color: var(--color-class-alt);
  opacity: 1;
}
.classes_container_class__add_class,
.classes_container_class__create_class {
  background-color: var(--color-on-bg);
  padding: var(--spacing-classes-alt);
  border-radius: 10px;
  cursor: pointer;
}
.classes_container_class__add_class .class_name,
.classes_container_class__create_class .class_name {
  font-size: 0.8em;
  opacity: 0.7;
  text-align: center;
  flex-grow: 1;
  padding-right: calc(15px + 20px);
}
.classes_container_class > * {
  user-select: none;
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
.class_swatch__icon {
  visibility: hidden;
  width: 100%;
  height: 100%;
  filter: var(--filter-icon) var(--filter-test-calendar-icon);
  background-image: url(@/assets/img/general/portal/remove.png);
  background-image: url(@/assets/img/general/portal/remove.svg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.class_swatch:hover .class_swatch__icon {
  visibility: visible;
}
.class_swatch {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 30%;
  margin-right: 15px;
  background-color: var(--color-class);
  filter: var(--filter-calendar-task);
  flex: 0 0 auto;
}
.classes_container_class__add_class .class_swatch,
.classes_container_class__create_class .class_swatch {
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
