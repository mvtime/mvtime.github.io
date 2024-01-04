<template>
  <div class="teacher_actions">
    <div
      :disabled="!has_classes"
      :title="has_classes ? `${task_type[1]} (${task_type[2]})` : 'Please create a class first'"
      v-for="task_type of task_types"
      :key="task_type[0]"
      class="teacher_action"
      @click="
        if (has_classes) {
          $router.push({
            name: 'newtask',
            params: { tasktype: task_type[0] },
          });
        } else {
          warn_missing_class();
        }
      "
    >
      <div class="teacher_action__icon icon__add"></div>
      <div class="teacher_action__text">
        <!-- Schedule a  -->
        {{ task_type[1] }}
      </div>
    </div>

    <div class="teacher_action" @click="$router.push('/portal/create')">
      <div class="teacher_action__icon icon__create"></div>
      <div class="teacher_action__text">Create a Class</div>
    </div>
  </div>
</template>

<script>
import { useMainStore } from "@/store";
import { WarningToast } from "@svonk/util";
export default {
  data() {
    return {
      task_types: [
        ["note", "Add a Note", "n"],
        ["task", "Schedule a Task or Test", "t"],
      ],
    };
  },
  mounted() {
    window.addEventListener("keydown", this.keydown);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.keydown);
  },
  computed: {
    store() {
      return useMainStore();
    },
    has_classes() {
      return this.store?.active_doc?.classes?.length > 0;
    },
  },
  methods: {
    keydown(e) {
      if (this.task_types.map((t) => t[2]).includes(e.key) && this.has_classes) {
        const task_type = this.task_types.find((t) => t[2] == e.key);
        this.$router.push({
          name: "newtask",
          params: { tasktype: task_type[0] },
        });
        e.preventDefault();
        e.stopPropagation();
      }
    },
    warn_missing_class() {
      new WarningToast("Please create a class first", 2000);
    },
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
  user-select: none;
  justify-content: flex-start;
  flex-grow: 0;
  height: var(--height-sidebar-action);
  width: 100%;
  cursor: pointer;
  background-color: var(--color-bg);
  border-radius: 10px;
  padding: 10px;
  padding-left: 0px;
  /* transition: background-color 0.1s ease-out; */
}
.teacher_actions .teacher_action[disabled="true"] {
  cursor: not-allowed;
  opacity: 0.5;
}
.teacher_actions .teacher_action[disabled="true"] * {
  pointer-events: none;
}
.teacher_actions .teacher_action:not([disabled="true"]):hover {
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
  scale: 0.9;
  transition: scale 0.1s ease-out;
}
.teacher_actions .teacher_action:not([disabled="true"]):hover .teacher_action__icon {
  scale: 0.8;
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
