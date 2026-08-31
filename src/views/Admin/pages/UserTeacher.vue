<template>
  <div class="userteacher">
    <div class="users_toolbar part_wrapper" v-if="users_loaded || users.length">
      <input
        type="text"
        class="users_search"
        v-model="search"
        placeholder="Search name, email, or uid"
        enterkeyhint="search"
      />
      <span class="users_count" v-if="users_loaded"
        >{{ filtered_users.length }} of {{ users.length }} user{{ users.length != 1 ? "s" : "" }}</span
      >
    </div>
    <div class="user_wrapper part_wrapper" v-if="filtered_users.length">
      <table class="users">
        <tr
          class="user admin_in"
          v-for="(user, index) in filtered_users"
          :key="user.uid || user.id"
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
          <td>{{ user.uid || user.id }}</td>
          <td class="user_role">
            <select
              class="user_role_select"
              :value="normalized_role(user)"
              :disabled="!!role_pending[user.uid || user.id]"
              @change="set_role(user, $event.target.value)"
              :title="`Set role for ${user.email}`"
            >
              <option value="student">student</option>
              <option value="teacher">teacher</option>
              <option value="admin">admin</option>
            </select>
          </td>
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
    <div class="users_empty part__empty" v-else-if="users_loaded">
      {{ search.trim() ? "No Users Match Search" : "No Users Found" }}
    </div>
    <div v-else class="users_loading part__loading">
      <div
        class="admin_in"
        v-for="(j, i) in user_placeholders"
        :key="j"
        :style="{ animationDelay: `${(i + 2) * 0.03}s` }"
      >
        <div
          class="part__loading_placeholder user__loading_placeholder part_loading_animation"
          title="Loading Users"
        >
          <div class="user__loading_placeholder_img part_loading_animation"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { functions, httpsCallable } from "@/firebase";
import { ErrorToast, SuccessToast, WarningToast } from "@svonk/util";

const ROLE_OPTIONS = ["student", "teacher", "admin"];

export default {
  name: "UserTeacher",
  data() {
    return {
      search: "",
      users: [],
      users_loaded: false,
      user_placeholders: Array.from({ length: 3 }, (_, i) => i),
      role_pending: {},
    };
  },
  computed: {
    filtered_users() {
      const q = this.search.trim().toLowerCase();
      if (!q) return this.users;
      return this.users.filter((user) => {
        const hay = [user.displayName, user.email, user.uid, user.id, user.role]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      });
    },
  },
  async mounted() {
    if (this.$route.query.search) {
      this.search = String(this.$route.query.search);
    }
    this.getUsers();
  },
  methods: {
    normalized_role(user) {
      const role = user?.role;
      return ROLE_OPTIONS.includes(role) ? role : "student";
    },
    async set_role(user, role) {
      const uid = user.uid || user.id;
      const prev = this.normalized_role(user);
      if (!ROLE_OPTIONS.includes(role) || role === prev) return;

      this.role_pending = { ...this.role_pending, [uid]: true };
      const setUserRole = httpsCallable(functions, "setUserRole");
      try {
        const { data } = await setUserRole({ uid, role });
        if (data?.error || data?.success === false) {
          throw data?.error || data?.message || "setUserRole failed";
        }
        const idx = this.users.findIndex((u) => (u.uid || u.id) === uid);
        if (idx >= 0) {
          this.users.splice(idx, 1, { ...this.users[idx], role });
        }
        this.$status.log(`👤 Set role for ${user.email} (${uid}) to ${role}`);
        new SuccessToast(`Set ${user.displayName || user.email} to ${role}`, 3000);
      } catch (e) {
        const message =
          e?.details ||
          e?.message ||
          e?.errorInfo?.message ||
          (typeof e === "string" ? e : null) ||
          "Something went wrong updating that role";
        const detail = typeof message === "string" ? message : e?.message || String(message);
        this.$status.error("👤 Error setting user role", detail);
        // Surface callable guard (e.g. cannot demote last admin)
        new ErrorToast(detail, e, 4500);
        // Force select back to previous role via reactivity
        const idx = this.users.findIndex((u) => (u.uid || u.id) === uid);
        if (idx >= 0) {
          this.users.splice(idx, 1, { ...this.users[idx], role: prev });
        }
      } finally {
        const next = { ...this.role_pending };
        delete next[uid];
        this.role_pending = next;
      }
    },
    async getUsers() {
      const start = Date.now();
      this.users_loaded = false;
      try {
        const getUsers = httpsCallable(functions, "getUsers");
        const { data } = await getUsers();
        // Include all accounts (students included) so they can be promoted via role dropdown
        this.users = (data || []).map((user) => ({
          ...user,
          role: ROLE_OPTIONS.includes(user?.role) ? user.role : "student",
        }));
        this.users_loaded = true;
        this.$status.log(`👤 ${this.users.length} user(s) loaded in ${Date.now() - start}ms`);
      } catch (e) {
        this.users_loaded = true;
        this.$status.error("👤 Error loading users", e?.message || e);
        new WarningToast("Couldn't load users", 3500);
      }
    },
  },
};
</script>

<style scoped>
.users_toolbar {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.users_search {
  flex: 1 1 220px;
  min-width: 180px;
  padding: 8px 12px;
  border: none;
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar));
  background: var(--color-on-bg);
  color: var(--color-text);
  font-size: 1em;
}
.users_count {
  flex: 0 0 auto;
  opacity: 0.7;
  font-size: 0.9em;
}

.users {
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

.users .user {
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: stretch;
  background-color: var(--color-on-bg);
  padding: 7px;
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar));
  position: relative;
  gap: 10px;
}
.user td {
  flex: 5 3 200px;
  width: 200px;
  text-align: left;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  align-self: center;
}
.user td:nth-child(2) {
  flex: 1 1 150px;
  width: 150px;
  font-weight: 500;
}
.user td,
.user td > span {
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
  background-color: var(--color-bg);
}

td.user_role {
  flex: 0 0 110px;
  width: 110px;
  overflow: visible;
}
.user_role_select {
  width: 100%;
  padding: 5px 6px;
  border: none;
  border-radius: 3px;
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 0.9em;
  cursor: pointer;
}
.user_role_select:disabled {
  opacity: 0.6;
  cursor: wait;
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

.part__empty,
.part__loading {
  padding: 20px 40px;
  text-align: center;
  width: 100%;
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

@media (max-width: 750px) {
  .users .user {
    flex-flow: wrap;
  }
  td.user_role {
    flex: 1 1 110px;
  }
}
</style>
