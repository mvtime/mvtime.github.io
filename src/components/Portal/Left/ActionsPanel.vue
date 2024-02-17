<template>
  <div class="teacher_actions">
    <div
      :disabled="!has_classes"
      :title="
        has_classes
          ? `${task_type.list_as} (${task_type.shortcuts.map((s) => '+ and ' + s).join(', ')})`
          : 'Please create a class first'
      "
      v-for="task_type of selected_types"
      :key="task_type.key"
      class="teacher_action"
      @click="
        if (has_classes) {
          $router.push({
            name: 'newtask',
            params: { tasktype: task_type.key },
            query: this.$route.query,
          });
        } else {
          warn_missing_class();
        }
      "
    >
      <div class="teacher_action__icon icon__add"></div>
      <div class="teacher_action__text">
        {{ task_type.list_as }}
      </div>
    </div>

    <div class="teacher_action" @click="$router.push({ name: 'createclass', query: $route.query })">
      <div class="teacher_action__icon icon__create"></div>
      <div class="teacher_action__text">Create a Class</div>
    </div>
  </div>
</template>

<script>
import { useMagic } from "@/store/magic";
import { WarningToast } from "@svonk/util";
import { useShortcuts } from "@/store/shortcuts";
export default {
  data() {
    return {
      plusDown: false,
      equalDown: false,
      toastTimeout: null,
    };
  },
  mounted() {
    window.addEventListener("keydown", this.keydown);
    window.addEventListener("keyup", this.keyup);
    this.short.register_all(this.shortcuts, "Teacher");
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.keydown);
    window.removeEventListener("keyup", this.keyup);
    this.short.remove_tag("Teacher");
  },
  computed: {
    selected_types() {
      // only the first 2 types of magic.types
      return this.magic.types.slice(0, 2);
    },
    task_types() {
      return this.magic.types.map((t) => [t.key, t.list_as, t.shortcuts]);
    },
    shortcuts() {
      return this.task_types.map((t) => ({
        key: t[2]
          .map((t) => {
            return "= + " + t;
          })
          .join(", "),
        description: t[1],
      }));
    },
    magic() {
      return useMagic();
    },
    short() {
      return useShortcuts();
    },
    has_classes() {
      return this.$store?.active_doc?.classes?.length > 0;
    },
  },
  methods: {
    keyup(e) {
      if (e.key === "+") {
        this.plusDown = false;
      } else if (e.key === "=") {
        this.equalDown = false;
      } else {
        return;
      }
      this.short.set_activity(this.plusDown || this.equalDown, "addTaskDown");
      if (!this.plusDown && !this.equalDown) {
        window.clearTimeout(this.toastTimeout);
        this.short.set_activity(true, "addTaskToast");
        this.toastTimeout = window.setTimeout(() => {
          this.short.set_activity(false, "addTaskToast");
        }, 500);
      }
    },
    keydown(e) {
      const key = e.key.toLowerCase();
      // handle plus/equal case
      if (key === "+" || key === "=") {
        if (key === "+") {
          this.plusDown = true;
        } else if (key === "=") {
          this.equalDown = true;
        }
        this.short.set_activity(this.plusDown || this.equalDown, "addTaskDown");
      }

      // change existing type while in creation window
      if (this.$route.name == "newtask" && (this.plusDown || this.equalDown)) {
        const task_type = this.task_types.find((t) => t[2].includes(key));
        if (task_type) {
          this.$router.push({
            name: "newtask",
            params: { tasktype: task_type[0] },
            query: this.$route.query,
          });
          e.preventDefault();
          e.stopPropagation();
        }
      }
      // create new
      else if (
        this.short.is_active("addTaskDown") &&
        this.has_classes &&
        this.task_types.some((t) => t[2].includes(key))
      ) {
        const task_type = this.task_types.find((t) => t[2].includes(key));
        this.$router.push({
          name: "newtask",
          params: { tasktype: task_type[0] },
          query: this.$route.query,
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
.action_add_shortcut_hint.out {
  animation: slideOut 0.5s forwards;
}
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
