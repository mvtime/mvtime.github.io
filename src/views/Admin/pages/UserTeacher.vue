<template>
  <div class="userteacher">
    <div class="placeholder">Users & Teachers</div>
    <div class="users" v-if="users.length">
      <table>
        <tr class="user" v-for="user in users" :key="user.id">
          <td>{{ user.displayName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.uid }}</td>
        </tr>
      </table>
    </div>
    <div class="users_empty" v-else-if="users_loaded">No Users Found</div>
    <div class="teachers" v-if="teachers.length">
      <table>
        <tr class="teacher" v-for="teacher in teachers" :key="teacher.id">
          <td>{{ teacher.name }}</td>
          <td>{{ teacher.email }}</td>
          <td>{{ teacher.id }}</td>
          <td class="teacher_classes">
            <table>
              <tr class="class" v-for="class_obj in teacher.classes" :key="class_obj.id">
                <td>{{ class_obj.color }}</td>
                <td>{{ class_obj.period }}</td>
                <td>{{ class_obj.name }}</td>
                <td>{{ class_obj.id }}</td>
              </tr>
            </table>
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
    this.getTeachers();
    this.getUsers();
  },
  methods: {
    async getTeachers() {
      const getTeachers = httpsCallable(functions, "getTeachers");
      const { data } = await getTeachers();
      this.teachers = data;
      this.teachers_loaded = true;
    },
    async getUsers() {
      const getUsers = httpsCallable(functions, "getUsers");
      const { data } = await getUsers();
      this.users = data;
      this.users_loaded = true;
    },
  },
};
</script>

<style scoped>
/* empty state */
.users_empty,
.teachers_empty {
  padding: 20px 40px;
  text-align: center;
  width: 100%;
}
</style>
