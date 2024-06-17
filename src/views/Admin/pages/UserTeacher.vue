<template>
  <div class="userteacher">
    <div class="user_wrapper part_wrapper" v-if="users.length">
      <table class="users" v-if="users.length">
        <tr
          class="user admin_in"
          v-for="(user, index) in users"
          :key="user.id"
          :style="{ animationDelay: `${(index + 2) * 0.03}s` }"
        >
          <td class="user_pfp">
            <img
              :src="user.pfp"
              :alt="`${user.displayName}'s Profile Picture`"
              :title="`${user.displayName}'s Profile Picture`"
              class="user_pfp__img"
            />
          </td>
          <td>{{ user.displayName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.uid }}</td>
          <td class="logs">
            <a
              class="logs_link"
              :href="`../logs?search=${user.email}`"
              @click="
                $router.push({
                  name: 'admin_logs',
                  query: { ...this.$route.query, search: user.email },
                });
                $event.preventDefault();
              "
              >Logs</a
            >
          </td>
        </tr>
      </table>
    </div>
    <div class="users_empty" v-else-if="users_loaded">No Users Found</div>
    <div class="teachers_wrapper part_wrapper" v-if="teachers.length">
      <table class="teachers">
        <tr
          class="teacher admin_in"
          v-for="(teacher, index) in teachers"
          :key="teacher.id"
          :style="{ animationDelay: `${(index + 2) * 0.15}s` }"
        >
          <td>{{ teacher.name }}</td>
          <td>{{ teacher.email }}</td>
          <td>{{ teacher.id }}</td>
          <td class="teacher_classes">
            <span
              class="class_name_wrapper admin_in"
              v-for="(class_obj, index2) in teacher.classes"
              :key="class_obj.id"
              :style="{
                '--color-class': class_obj.color,
                '--color-class-alt': class_obj.color + '80',
                animationDelay: `${
                  (index + 2.5) * 0.15 + ((index2 + 1) / teacher.classes.length) * 0.1
                }s`,
              }"
            >
              <a
                :href="`/view/${$store.path_to_ref(teacher.email + '/' + class_obj.id)}`"
                :title="`View '${$store.class_text(class_obj)}'`"
                @click="
                  $event.preventDefault();
                  $router.push({
                    name: 'publicviewclass',
                    params: { ref: $store.path_to_ref(teacher.email + '/' + class_obj.id) },
                    query: $route.query,
                  });
                "
                class="class_name button_pointer_text"
                >{{ $store.class_text(class_obj) }}</a
              >
            </span>
            <span
              class="teacher_classes__empty class_name button_pointer_text"
              v-if="!teacher.classes || !teacher.classes.length"
              >No Classes</span
            >
          </td>
        </tr>
      </table>
    </div>
    <div class="teachers_empty" v-else-if="teachers_loaded">No Teachers Found</div>
  </div>
</template>

<script>
import { functions, httpsCallable } from "@/firebase";
export default {
  name: "UserTeacher",
  data() {
    return {
      teachers: [],
      teachers_loaded: false,
      users: [],
      users_loaded: false,
    };
  },
  async created() {
    this.getUsers();
    this.getTeachers();
  },
  methods: {
    async getTeachers() {
      const start = Date.now();
      const getTeachers = httpsCallable(functions, "getTeachers");
      const { data } = await getTeachers();
      this.teachers = data;
      this.teachers_loaded = true;
      this.$status.log(`👤 ${data?.length} teacher(s) loaded in ${Date.now() - start}ms`);
    },
    async getUsers() {
      const start = Date.now();
      const getUsers = httpsCallable(functions, "getUsers");
      const { data } = await getUsers();
      this.users = data;
      this.users_loaded = true;
      this.$status.log(`👤 ${data?.length} user(s) loaded in ${Date.now() - start}ms`);
    },
  },
};
</script>

<style scoped>
/* columns */
.userteacher .part_wrapper {
  padding: calc(var(--padding-sidebar) / 2);
}
.users,
.teachers {
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  justify-content: center;
  gap: 5px;
}

.users .user,
.teachers .teacher {
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: stretch;
  background-color: var(--color-on-bg);
  padding: 7px 7px 7px 15px;
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar) / 2);
  position: relative;
  gap: 10px;
}
.users .user {
  padding-left: 7px;
}
.user td,
.teacher td {
  flex: 5 3 200px;
  width: 200px;
  text-align: left;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  align-self: center;
}
.user td:nth-child(2),
.teacher td:nth-child(1) {
  flex: 1 1 150px;
  width: 150px;
  font-weight: 500;
}
.user td,
.user td > span,
.teachers td,
.teachers td > span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}

td.user_pfp {
  flex: 0 0 30px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 3px;
}
td.user_pfp img.user_pfp__img {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 3px;
}

.users .user td.logs {
  flex: 0 0 auto;
  width: auto;
  text-align: right;
  border-radius: 3px;
  background-color: var(--color-bg);

  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
}

.users .user td.logs a {
  padding: 5px 10px;
  font-size: 0.8em;
  color: var(--color-text);
  opacity: 0.75;
}

tr > td > span.class_name_wrapper {
  background-color: var(--color-bg);
  border-radius: var(--radius-button-display);
  overflow: hidden;
  max-width: 100%;
  height: auto;
  display: flex;
}
.class_name_wrapper .class_name {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.teacher td.teacher_classes {
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
  align-items: flex-end;
  justify-content: center;
}
/* empty state */
.users_empty,
.teachers_empty {
  padding: 20px 40px;
  text-align: center;
  width: 100%;
}

@media (max-width: 750px) {
  .users .user,
  .teachers .teacher {
    flex-flow: wrap;
  }
  .teachers .teacher {
    padding: 7px;
  }
  .teachers .teacher .teacher_classes {
    flex-flow: row wrap;
    flex-basis: 100%;
    justify-content: flex-start;
  }
  .teachers .teacher .teacher_classes .class_name_wrapper,
  .teachers .teacher .teacher_classes .class_name {
    flex: 1 1 auto;
    text-align: center;
  }
}
</style>
