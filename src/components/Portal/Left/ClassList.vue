<template>
  <div class="class_list">
    <div class="class_list__not_empty" :class="{ filtering: !!filtered_classes.length }">
      <div class="class_list_header">
        <h5>Classes</h5>
        <button @click="$emit('clear_filters')" v-if="!!filtered_classes.length" title="Clear class section filters">Clear</button>
      </div>
      <hr class="class_list_hr" />
      <div class="classes_container" :class="{ filtering: !!filtered_classes.length }">
        <a
          class="classes_container_class"
          :ref="class_obj.ref"
          :href="'/view/' + clean_ref(class_obj.ref)"
          v-for="class_obj of classes"
          :draggable="$store.is_teacher && class_obj.email == $store.user.email && $route.name != 'study'"
          @dragstart="
            $emit('dragclass', class_obj);
            // $emit('clear_filters');
            $emit('set_filtered_classes', [class_obj.id]);
            dragging = class_obj;
            prev_dragging = filtered_classes;
          "
          @dragend="
            dragging = null;
            $emit('dragclass', { ...class_obj, _done: true });
            $emit('set_filtered_classes', prev_dragging);
          "
          :key="class_obj.name"
          @click="
            $emit('toggle_filtered_class', class_obj.id);
            $event.preventDefault();
          "
          :style="{ '--color-class': class_obj.color, '--color-class-alt': class_obj.color + '40' }"
          :class="{
            filter_active: filtered_classes.includes(class_obj.id),
            classes_container_class__dragging: dragging && dragging.ref == class_obj.ref,
          }"
        >
          <div
            class="class_swatch"
            :_email="class_obj.email"
            :title="$store.is_teacher && class_obj.email == $store.user.email ? 'Edit Class' : 'Leave Class'"
            @click="
              if ($store.is_teacher && class_obj.email == $store.user.email) {
                edit_class(class_obj);
              } else {
                leave_class(class_obj);
              }
              $event.preventDefault();
              $event.stopPropagation();
            "
          >
            <div v-if="!$store.is_teacher || class_obj.email != $store.user.email" class="class_swatch__icon class_swatch_remove__icon"></div>
            <div v-else class="class_swatch__icon class_swatch_edit__icon"></div>
          </div>
          <span class="class_name">{{ $store.class_text(class_obj) }}</span>
        </a>
        <div class="class_container__empty" v-if="!classes | !classes.length" title="No classes yet">No classes yet</div>
        <div v-if="!$store.is_teacher || true" class="classes_container_class classes_container_class__add_class" @click="$router.push({ name: 'addclass', query: $route.query })">
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
export default {
  props: {
    filtered_classes: {
      type: Array,
      default: () => [],
    },
  },
  name: "ClassList",
  data() {
    return {
      dragging: null,
      prev_dragging: [],
    };
  },
  computed: {
    classes() {
      return this.$store.classes.map((class_obj) => {
        return {
          ...class_obj,
          email: class_obj.id.split("/")[0],
        };
      });
    },
  },
  emits: ["toggle_filtered_class", "clear_filters", "dragclass", "set_filtered_classes"],
  methods: {
    clean_ref(ref) {
      let [_email, _id] = ref.split("/");
      _email = _email.split("@")[0];
      return [_email, _id].join("~");
    },
    leave_class(class_obj) {
      this.$router.push({
        name: "leave",
        params: {
          ref: this.clean_ref(class_obj.id),
        },
        query: this.$route.query,
      });
    },
    edit_class(class_obj) {
      this.$router.push({
        name: "editclass",
        params: {
          ref: this.clean_ref(class_obj.id),
        },
        query: this.$route.query,
      });
    },
  },
};
</script>

<style scoped>
/* header */
.class_list_header {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: stretch;
  margin: 0;
  height: 27px;
  width: 100%;
  user-select: none;
  gap: var(--spacing-classes);
}
.class_list_header h5 {
  flex-grow: 1;
}
.class_list_header button {
  background-color: var(--color-on-bg);
  padding: var(--spacing-classes-alt) calc(var(--spacing-classes-alt) * 2);
  border-radius: 5px;
  border: none;
  height: 100%;
}
/* list */
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
  /* link fix */
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
}
.classes_container_class:hover {
  background-color: var(--color-on-bg);
}
/* class filtering */
.filtering .classes_container_class:not(.classes_container_class__add_class) {
  opacity: 0.7;
}
.filtering .classes_container_class.filter_active,
.classes_container_class.classes_container_class__dragging {
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

.class_container__empty {
  /* opacity: 0.5;
  background: var(--color-on-bg); */

  font-size: 0.8em;
  padding: 15px 20px;
  border-radius: 10px;
  text-align: center;
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
  opacity: 0;
  width: 100%;
  height: 100%;
  filter: var(--filter-swatch-icon);
  background-size: 16px;
  background-repeat: no-repeat;
  background-position: center;
  transition: opacity 0.2s ease-in-out;
}
.class_swatch_remove__icon {
  background-image: url(@/assets/img/general/portal/remove.png);
  background-image: url(@/assets/img/general/portal/remove.svg);
}
.class_swatch_edit__icon {
  background-image: url(@/assets/img/general/portal/edit.png);
  background-image: url(@/assets/img/general/portal/edit.svg);
}
.class_swatch:hover .class_swatch__icon,
.class_swatch:active .class_swatch__icon {
  opacity: 1;
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
