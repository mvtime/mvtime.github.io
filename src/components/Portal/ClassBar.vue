<template>
  <div class="class_bar" :class="{ filtering: !!filtered_classes.length }">
    <button v-if="!dragging" class="class_filter_clear class_bar_item class_bar_item__button" @click="$emit('clear_filters')" :disabled="!filtered_classes.length" title="Clear class section filters">
      <span> Clear</span>
    </button>
    <a
      class="class_bar_class class_bar_item"
      :title="$store.class_text(class_obj)"
      :ref="class_obj.ref"
      :href="'/view/' + clean_ref(class_obj.ref)"
      v-for="class_obj of classes"
      :draggable="$store.can_manage_class(class_obj) && $route.name != 'study'"
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
      <!-- text -->
      <div v-if="dragging && dragging.ref == class_obj.ref" class="class_name">
        {{ $store.class_text(class_obj) }}
      </div>
      <div v-else class="class_character">
        <span class="class_character__letter">{{ classSquareGlyph(class_obj) }}</span>
      </div>
      <!-- action icon -->
      <div
        class="class_swatch"
        :_email="class_obj.email"
        :title="$store.can_manage_class(class_obj) ? 'Edit Class' : 'Leave Class'"
        @click="
          if ($store.can_manage_class(class_obj)) {
            edit_class(class_obj);
          } else {
            leave_class(class_obj);
          }
          $event.preventDefault();
          $event.stopPropagation();
        "
      >
        <div v-if="!$store.can_manage_class(class_obj)" class="class_swatch__icon class_swatch_remove__icon"></div>
        <div v-else class="class_swatch__icon class_swatch_edit__icon"></div>
      </div>
    </a>
    <div class="class_container__empty" v-if="!classes | !classes.length" title="No classes yet"></div>
    <div class="classes_container_class classes_container_class__add_class class_bar_item class_bar_item__button" @click="$router.push({ name: 'addclass', query: $route.query })">
      <span> {{ $store.is_teacher ? "Join" : "Join a Class" }}</span>
    </div>

    <div
      v-if="$store.is_teacher"
      class="classes_container_class classes_container_class__create_class class_bar_item class_bar_item__button"
      @click="$router.push({ name: 'createclass', query: $route.query })"
    >
      <span> Create</span>
    </div>
  </div>
</template>

<script>
import { classSquareGlyph } from "@/common/grapheme";

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
    classSquareGlyph,
    clean_ref(ref) {
      if (!ref) return "";
      // Prefer short classId when known (email/classId or local~classId → classId)
      const parts = String(ref).split(/[~/]/).filter(Boolean);
      if (parts.length >= 2) {
        // last-but-one for tasks (email/classId/taskId), else classId
        if (parts.length >= 3) return parts[parts.length - 2];
        // email/classId or local~classId → classId; classId~taskId left to path_to_ref callers
        if (parts[0].includes("@") || parts.length === 2) {
          // If first looks like email/local and second is class → return classId
          // Ambiguous classId~taskId: ClassBar only passes class refs
          return parts[1];
        }
      }
      return parts[0] || ref;
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
.class_bar {
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  overflow-x: auto;
}
.class_bar::-webkit-scrollbar {
  display: none;
}
.class_bar_item {
  border-radius: calc(var(--radius-bottom-bar) - 10px);
  height: calc(var(--height-bottom-bar) - 2 * 3px - 2 * var(--padding-bottom-bar));
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
}
.class_bar_item__button {
  padding: 0 10px;
  background: var(--color-on-bg);
  font-size: 0.8em;
  color: var(--color-text);
  font-weight: 600;
  cursor: pointer;
  border: none;
  width: max-content;
}
.class_bar_item__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.class_bar_item__button span {
  opacity: 0.7;
}
.class_bar_class {
  font-size: 16px;
  width: calc(var(--height-bottom-bar) - 2 * 3px - 2 * var(--padding-bottom-bar));
  filter: var(--filter-calendar-task);
  color: var(--color-class);
  background: var(--color-class-alt);
  border: solid 2px var(--color-class);
}

.class_container__empty {
  opacity: 0.75;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background: var(--color-on-bg);
}

.class_container__empty .parent.simplified .class_bar_class {
  color: var(--color-on-calendar-task);
  background: var(--color-class);
  border: none;
}
.class_bar.filtering .class_bar_class.filter_active {
  background: var(--color-class);
  color: var(--color-on-calendar-task);
}
.class_bar.filtering .class_bar_class:not(.filter_active) {
  background: none;
}
.parent.simplified .class_bar.filtering .class_bar_class:not(.filter_active) {
  background: var(--color-class-alt);
}
.class_bar_class.classes_container_class__dragging {
  width: max-content;
  padding: 0 10px;
  font-size: 14px;
  /* fix for rounded corners on draggable (either this or 0.999 opacity) */
  transform: translate(0, 0);
}
</style>
