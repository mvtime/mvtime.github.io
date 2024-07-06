<template>
  <div class="userteacher">
    <div class="user_wrapper part_wrapper" v-if="users.length">
      <table class="users" v-if="users.length">
        <tr class="user admin_in" v-for="(user, index) in users" :key="user.id" :style="{ animationDelay: `${(index + 2) * 0.03}s` }">
          <td class="user_pfp">
            <img :src="user.pfp" :alt="`${user.displayName}'s Profile Picture`" :title="`${user.displayName}'s Profile Picture`" class="user_pfp__img" />
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
    <div class="users_empty part__empty" v-else-if="users_loaded">No Users Found</div>
    <div v-else class="users_loading part__loading">
      <div class="admin_in" v-for="(j, i) in user_placeholders" :key="j" :style="{ animationDelay: `${(i + 2) * 0.03}s` }">
        <div class="part__loading_placeholder user__loading_placeholder part_loading_animation" title="Loading Users">
          <div class="user__loading_placeholder_img part_loading_animation"></div>
        </div>
      </div>
    </div>
    <div class="teachers_wrapper part_wrapper" v-if="teachers_loaded" :class="{ teachers_empty: !teachers.length, part__empty: !teachers.length }">
      <div v-if="!teachers.length" class="teachers_empty part__empty" :style="{ animationDelay: `${2 * 0.15}s` }">No Teachers Found</div>
      <table v-else class="teachers">
        <tr class="teacher admin_in" v-for="(teacher, index) in teachers" :key="teacher.id" :style="{ animationDelay: `${(index + 2) * 0.15}s` }">
          <td>{{ teacher.name }}</td>
          <td>{{ teacher.email }}</td>
          <td>{{ teacher.id }}</td>
          <button class="unmake_teacher" @click="unmake_teacher(teacher.id)">
            <div class="themed_icon unmake_teacher__icon" />
          </button>
          <hr class="teacher_separator" />
          <td class="teacher_classes">
            <span
              class="class_name_wrapper admin_in"
              v-for="(class_obj, index2) in teacher.classes"
              :key="class_obj.id"
              :style="{
                '--color-class': class_obj.color,
                '--color-class-alt': class_obj.color + '80',
                animationDelay: `${(index + 2.5) * 0.15 + ((index2 + 1) / teacher.classes.length) * 0.1}s`,
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
            <span class="teacher_classes__empty class_name button_pointer_text" v-if="!teacher.classes || !teacher.classes.length">No Classes</span>
          </td>
        </tr>
      </table>
      <hr v-if="teachers.length" class="teacher_add__separator admin_in" :style="{ animationDelay: `${(teachers.length + 3) * 0.1}s` }" />
      <div class="teacher_add admin_in" :style="{ animationDelay: `${(teachers.length + 4) * 0.1}s` }">
        <textarea
          @keydown.enter="
            add_teachers();
            $event.preventDefault();
          "
          title="User emails to make teachers (comma or space separated)"
          class="teacher_add_list"
          :placeholder="`(Make teachers) user1@${$env.VUE_APP_ORG_DOMAIN}, user2`"
          v-model="teacher_add_list"
          enterkeyhint="send"
        ></textarea>
        <button @click="add_teachers" title="Make listed emails teachers" class="teacher_add_button" :disabled="!teacher_add_list.trim().length">
          <div class="themed_icon teacher_add_button__icon" />
        </button>
      </div>
    </div>
    <div v-else class="teachers_loading part__loading">
      <div class="admin_in" v-for="(j, i) in teacher_placeholders" :key="j" :style="{ animationDelay: `${(i + 2) * 0.15}s` }">
        <div class="part__loading_placeholder teacher__loading_placeholder part_loading_animation" title="Loading Teachers"></div>
      </div>
      <hr class="teacher_add__separator admin_in" :style="{ animationDelay: `${(teacher_placeholders.length + 3) * 0.1}s` }" />
      <div class="admin_in teacher_add__loading_placeholder_wrapper" :style="{ animationDelay: `${(teacher_placeholders.length + 4) * 0.1}s` }">
        <div class="part__loading_placeholder part_loading_animation teacher_add__loading_placeholder"></div>
        <div class="part__loading_placeholder part_loading_animation teacher_add__loading_placeholder"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { functions, httpsCallable } from "@/firebase";
import { ErrorToast, SuccessToast, WarningToast } from "@svonk/util";
export default {
  name: "UserTeacher",
  data() {
    return {
      teacher_add_list: "",
      teachers: [],
      teachers_loaded: false,
      users: [],
      users_loaded: false,
      user_placeholders: Array.from({ length: 3 }, (_, i) => i),
      teacher_placeholders: Array.from({ length: 1 }, (_, i) => i),
    };
  },
  async mounted() {
    this.getUsers();
    this.getTeachers();
  },
  methods: {
    async unmake_teacher(teacher_id) {
      const start = Date.now();
      const unmakeTeacher = httpsCallable(functions, "unmakeTeacher");
      try {
        this.teachers_loaded = false;

        this.teacher_placeholders = Array.from({ length: this.teachers.length - 1 }, (_, i) => i);
        const { data } = await unmakeTeacher({ uid: teacher_id });
        if (data.error || !data.success) throw data.error;
        this.$status.log(`👤 Removed teacher ${teacher_id} in ${Date.now() - start}ms`);
        new SuccessToast(`Removed teacher status from ${this.teachers.find((teacher) => teacher.id == teacher_id).name}`, 3500);
        this.teachers = this.teachers.filter((teacher) => teacher.id != teacher_id);
      } catch (e) {
        this.$status.error("👤 Error removing teacher", e?.errorInfo?.code || e?.errorInfo?.message || e?.message || e);
        new ErrorToast("Something went wrong removing that teacher", e?.errorInfo?.message || e?.message || e, 3500);
      }

      this.teachers_loaded = true;
    },
    async add_teachers() {
      const start = Date.now();
      const makeTeachers = httpsCallable(functions, "makeTeachers");
      try {
        // map to userids
        let emails = this.teacher_add_list.trim().split(/[\s,]+/);
        // check that all emails have no domain, or end with the org domain; if no domain, add it
        emails = emails.map((email) => (email.includes("@") ? email : email + "@" + this.$env.VUE_APP_ORG_DOMAIN));
        // fail out if non-org domain email is present
        if (emails.some((email) => !email.endsWith(this.$env.VUE_APP_ORG_DOMAIN))) {
          this.$status.error("👤 Error setting new teachers from emails/userids", "Non-org domain email found");
          new WarningToast(`Cannot make linked (non-@${this.$env.VUE_APP_ORG_DOMAIN}) users teachers`, 2500);
          return;
        } else if (!emails.length) {
          this.$status.error("👤 Error setting new teachers from emails/userids", "No emails found");
          new WarningToast("No emails found to make teachers", 2500);
          return;
        } else {
          // use loaded user objects to get userids
          const users = this.users.filter((user) => emails.includes(user.email));
          if (!users.length) {
            this.$status.error("👤 Error setting new teachers from emails/userids", "No users found");
            new WarningToast("No matching loaded users found", 2500);
            return;
          }
          this.$status.log(`👤 Setting ${users.length} found teacher${users.length != 1 ? "s" : ""}: ${users.map((user) => `${user.email}->${user.uid}`).join(", ")}`);

          let unchanged = users.filter((user) => this.teachers.some((teacher) => teacher.id == user.uid)).length;
          this.teacher_placeholders = Array.from({ length: this.teachers.length + (users.length - unchanged) }, (_, i) => i);
          this.teachers_loaded = false;
          const { data } = await makeTeachers({
            emails: users.map((user) => user.email),
          });

          if (data.error) throw data.error;

          this.$status.log(
            `👤 ${data?.users?.length} teacher${data?.users?.length != 1 ? "s" : ""} set in ${Date.now() - start}ms; ${unchanged} ${unchanged != 1 ? "were already teachers" : "was already a teacher"}`
          );
          new SuccessToast(
            `Added ${data?.users?.length - unchanged} teacher${data?.users?.length - unchanged != 1 ? "s" : ""}, ${unchanged} ${unchanged != 1 ? "were already teachers" : "was already a teacher"}`,
            3500
          );
          this.teacher_add_list = "";
        }
      } catch (e) {
        this.$status.error("👤 Error setting new teachers from emails/userids", e?.errorInfo?.message || e?.message || e);
        new ErrorToast("Something went wrong making those users teachers", e?.errorInfo?.message || e?.message || e, 3500);
        this.teachers_loaded = true;
        return;
      }
      this.getTeachers();
    },
    async getTeachers() {
      this.teachers_loaded = false;
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
.users,
.teachers {
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  justify-content: center;
  gap: 5px;
}
.part__loading .admin_in {
  animation: none !important;
  opacity: 1;
  scale: 1;
}

.users .user,
.teachers .teacher {
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: stretch;
  background-color: var(--color-on-bg);
  padding: 7px 7px 7px 15px;
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar));
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
.teacher button {
  margin-left: 5px;
}
.teacher .teacher_separator {
  width: calc(100% + 2 * 7px);
  flex: 0 0 calc(100% + 2 * 7px);
  position: relative;
  left: -7px;
  height: 0;
  border: none;
  border-top: 2px solid var(--color-bg);
  background: none;
  margin: 0;
}
/* empty and loading states */
.part__empty,
.part__loading {
  padding: 20px 40px;
  text-align: center;
  width: 100%;
}

.teachers_empty {
  margin-bottom: 7px;
}

.userteacher > .part__loading {
  gap: 7px;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  justify-content: flex-start;
}

.part__loading_placeholder {
  width: 100%;
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar));
  padding: 7px;
}

.user__loading_placeholder_img {
  width: 30px;
  height: 30px;
  border-radius: 3px;
}

.teacher__loading_placeholder {
  min-height: 81px;
}
.teacher_add__loading_placeholder_wrapper {
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: flex-start;
  gap: 7px;
}
.teacher_add__loading_placeholder:first-child,
.teacher_add textarea.teacher_add_list {
  min-height: 100px;
}
.teacher_add__loading_placeholder_wrapper .teacher_add__loading_placeholder:last-child {
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
}

/* new inline teacher classes style */
.teacher_add__separator {
  border: none;
  margin: 10px auto;
  width: 30%;
  max-width: 350px;
  min-width: 100px;
  height: 5px;
  border-radius: 5px;
  background: var(--color-on-bg);
}
.teachers_loading .teacher_add__separator {
  margin: 3px auto;
}

.teacher_add {
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: flex-start;
  gap: 5px;
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar));
}

.teacher_add textarea,
.teacher_add button {
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar));
  background: var(--color-on-bg);
  border: none;
}

.teacher_add textarea.teacher_add_list {
  padding: 7px;
  max-height: 350px;
  flex: 1 1 40px;
  padding: 7px;
  margin: 0;
  font-size: 1em;
}

.teacher_add button.teacher_add_button {
  cursor: pointer;
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  padding: 0;
}

.teacher_add button.teacher_add_button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.teacher_add button.teacher_add_button .teacher_add_button__icon {
  filter: var(--filter-icon);
  height: 100%;
  width: 100%;
  background-image: url(@/assets/img/general/portal/link.png);
  background-image: url(@/assets/img/general/portal/link.svg);
}
button.unmake_teacher {
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  padding: 0;
  border-radius: 3px;
  background: var(--color-bg);
  border: none;
}
button.unmake_teacher .unmake_teacher__icon {
  height: 100%;
  width: 100%;
  background-image: url(@/assets/img/general/portal/remove.png);
  background-image: url(@/assets/img/general/portal/remove.svg);
}

.teachers .teacher {
  flex-flow: wrap;
  padding: 7px;
  gap: 5px;
}
.teachers .teacher .teacher_classes {
  flex-flow: row wrap;
  flex-basis: 100%;
  justify-content: flex-start;
}
.teachers .teacher .teacher_classes__empty {
  font-style: italic;
}
.teachers .teacher .teacher_classes .class_name_wrapper,
.teachers .teacher .teacher_classes .class_name {
  flex: 0 1 auto;
}

@media (max-width: 750px) {
  .users .user {
    flex-flow: wrap;
  }
  .teachers .teacher {
    padding: 7px;
  }
  .teachers .teacher .teacher_classes .class_name_wrapper,
  .teachers .teacher .teacher_classes .class_name {
    flex: 1 1 auto;
    text-align: center;
  }
}
@media (min-width: 1700px) {
  .admin_main.userteacher {
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: stretch;
  }
  .userteacher > div {
    flex: 1 1 600px;
    width: 600px;
  }
}
</style>
