<template>
  <div class="logdebug">
    <OverlayWrapper v-if="showRebuildModal" @close="showRebuildModal = false" v-slot="scope">
      <Modal
        class="confirm_modal router_center_view"
        :can_continue="true"
        title="Rebuild Class Task Caches"
        :html="`<div class='overlay_contents_text'>Are you sure you want to rebuild all class task caches?<br><br>This action will regenerate cached task data for all classes and may take a while to complete.</div>`"
        :continue_action="() => confirmRebuildCaches()"
        :skippable="true"
        @skip="scope.close"
        skip_text="Cancel"
        submit_text="Rebuild Caches"
      />
    </OverlayWrapper>
    <div class="admin_actions admin_in">
      <h3>Admin Actions</h3>
      <div class="action_buttons">
        <button class="action_button" :class="{ loading_bg: rebuildingCache }" :disabled="rebuildingCache" @click="showRebuildModal = true">Rebuild Class Task Caches</button>
      </div>
    </div>
    <div class="docs_wrapper">
      <nav class="docs_nav admin_in" v-if="pages.length">
        <button class="docs_nav_button prev" @click="prev" :disabled="!(total.length || pages.length) || !page_index" title="Previous Page"></button>
        <input type="text" v-model="search" class="docs_nav_search" placeholder="Search Log Reference, User ID, or Email" enterkeyhint="search" @keydown.enter="submit" />
        <button v-if="manual && loaded && loaded == search" class="docs_nav_button clear" @click="clear" :title="`Clear query '${this.loaded}'`" :class="{ click_escape: active == null }"></button>
        <button
          v-else-if="search"
          class="docs_nav_button search"
          :disabled="(search.length < 10 && !search.includes('@')) || search.length > 100"
          @click="submit"
          title="Submit query (10+ characters or user email)"
          :class="{
            click_ctrlenter: active == null && !((search.length < 10 && !search.includes('@')) || search.length > 100),
          }"
        ></button>
        <div class="docs_nav__loaded">
          <span v-if="manual">{{ manual_page.length }} Result{{ manual_page.length == 1 ? "" : "s" }}</span>
          <span v-else>
            {{ total.length + (more && pages.length && pages[pages.length - 1].length && pages[pages.length - 1].length == page_size ? "+" : "") }}
            Result{{ total.length == 1 ? "" : "s" }}</span
          >
        </div>
        <button v-if="!(manual && search)" class="docs_nav_button next" @click="next" :disabled="!(total.length || pages.length) || !more" title="Next Page"></button>
      </nav>
      <div class="docs" v-if="pages.length && total.length">
        <div class="doc admin_in" v-for="(doc, index) in page" :key="doc.id" :class="{ active: active == doc.id }" :style="{ animationDelay: `${(index + 2) * 0.03}s` }">
          <button class="doc_details__toggle" :class="{ click_escape: active == doc.id }" @click="active = active == doc.id ? null : doc.id" title="Close details pane">
            <div class="doc_details__toggle__icon themed_icon" :title="`${active == doc.id ? 'Collapse' : 'Expand'} log ${doc.id}`"></div>
          </button>
          <div class="doc_title" v-if="active != doc.id">
            <a
              class="doc_title__email"
              :href="`./logs?search=${doc.data().email}`"
              @click="
                if (!search || loaded != search) {
                  search = doc.data().email;
                  submit();
                }
                $event.preventDefault();
              "
            >
              <span class="doc_title__email_user">{{ doc.data().email.split("@")[0] }}</span
              ><span class="doc_title__email_domain">@{{ doc.data().email.split("@")[1] }} </span>
            </a>
            <span class="doc_title__ref">{{ doc.id }}</span>
            <span class="doc_title__time">{{ doc.data().date.toDate().getTime() }}</span>
          </div>
          <div class="doc_details" v-else>
            <table class="doc_details_table">
              <tr>
                <th>Email:</th>
                <td>
                  <a
                    class="doc_title__email"
                    :href="`./logs?search=${doc.data().email}`"
                    @click="
                      if (!search || loaded != search) {
                        search = doc.data().email;
                        submit();
                      }
                      $event.preventDefault();
                    "
                  >
                    {{ doc.data().email }}
                  </a>
                </td>
              </tr>
              <tr>
                <th>User:</th>
                <td>{{ doc.data().user }}</td>
              </tr>
              <tr>
                <th>Date:</th>
                <td>{{ doc.data().date.toDate() }}</td>
              </tr>
              <tr>
                <th>Ref:</th>
                <td>{{ doc.id }}</td>
              </tr>
            </table>
            <button class="doc_save click_ctrlenter" @click="downloadLogData(doc.data().stream.json, doc.data().date.toDate(), `cloud-${doc.data().email}-${doc.data().user}`)">Download</button>
          </div>
        </div>
      </div>
      <div class="docs_placeholder docs_placeholder__empty" v-else-if="!total.length && pages.length">No logs to display</div>
      <div class="docs_placeholder docs_placeholder__loading" v-else>
        <i>Loading logs</i>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, query, orderBy, startAfter, limit, getDocs, getDoc, doc, where } from "firebase/firestore";
import { db, functions } from "@/firebase";
import { httpsCallable } from "firebase/functions";
import { downloadLogData } from "@/common";
import { WarningToast, SuccessToast, ErrorToast } from "@svonk/util";
import OverlayWrapper from "@/components/Modal/OverlayWrapper.vue";
import Modal from "@/components/Modal/Modal.vue";
export default {
  components: {
    OverlayWrapper,
    Modal,
  },
  data() {
    return {
      active: null,
      page_index: 0,
      page_size: 10,
      pages: [],
      search: "",
      loaded: "",
      manual_page: [],
      rebuildingCache: false,
      showRebuildModal: false,
    };
  },
  computed: {
    page() {
      return this.manual ? this.manual_page : this.pages[this.page_index];
    },
    total() {
      return this.pages.flat(1);
    },
    more() {
      return !this.page || (this.page.length === this.page_size && (this.page_index == this.pages.length - 1 || this.pages[this.page_index + 1]?.length));
    },
    shortcuts() {
      return [
        {
          key: "Enter",
          description: "Submit search",
        },
        {
          key: "Ctrl + Enter",
          description: "Download active log",
          top: true,
        },
        {
          key: "Escape",
          description: "Collapse active log, clear search",
          top: true,
        },
      ];
    },
    manual() {
      return this.loaded && this.manual_page.length;
    },
  },
  async mounted() {
    this.$shortcuts.register_all(this.shortcuts, "Admin - Logs & Debugging");
    if (this.$route.query.search) {
      this.search = this.$route.query.search;
      this.submit();
    }
    await this.init();
  },
  beforeUnmount() {
    this.$shortcuts.remove_tag("Admin - Logs & Debugging");
  },
  methods: {
    confirmRebuildCaches() {
      this.showRebuildModal = false;
      this.rebuildClassTaskCaches();
    },
    async rebuildClassTaskCaches() {
      if (this.rebuildingCache) return;

      this.rebuildingCache = true;
      try {
        const rebuildFn = httpsCallable(functions, "rebuildClassTaskCaches");
        const result = await rebuildFn({});
        const data = result.data;

        if (data.error) {
          throw new Error(data.error);
        }

        new SuccessToast(`Rebuilt ${data.classesUpdated} classes with ${data.tasksProcessed} tasks`, 5000);
        this.$status.log(`🔄 Cache rebuild complete: ${data.classesUpdated} classes, ${data.tasksProcessed} tasks`);
      } catch (err) {
        new ErrorToast("Failed to rebuild caches", err, 5000);
        this.$status.error("🔄 Cache rebuild failed:", err);
      } finally {
        this.rebuildingCache = false;
      }
    },
    async init() {
      const q = query(collection(db, "logs"), orderBy("date_inversed"), limit(this.page_size));
      const docs = await getDocs(q);
      this.pages = [[...docs.docs]];
      this.$status.log(`📜 Loaded first ${this.page_size} documents`);
    },
    downloadLogData,
    prev() {
      if (this.page_index > 0) {
        this.page_index--;
      }
    },
    async next() {
      if (this.page_index < this.pages.length - 1 && this.pages[this.page_index + 1].length) {
        this.page_index++;
        return;
      } else if (this.page.length && this.page.length === this.page_size) {
        const q = query(collection(db, "logs"), orderBy("date_inversed"), startAfter(this.page[this.page.length - 1]), limit(this.page_size));
        const docs = await getDocs(q);
        this.pages[this.page_index + 1] = [...docs.docs];
        this.$status.log(`📜 Loaded next ${docs.docs.length} of ${this.page_size} documents`);
        this.next();
      } else {
        this.$status.log(`📜 No more documents to load (${this.total.length} loaded)`);
      }
    },
    clear() {
      this.search = "";
      this.loaded = "";
      this.manual_page = [];
      // clear search from query
      this.$router.push({ query: { ...this.$route.query, search: undefined } });
    },
    async submit() {
      this.active = null;
      // EMAIL
      if (this.search.includes("@")) {
        // get logs where email == this.search
        const emailDocs = await getDocs(query(collection(db, "logs"), where("email", "==", this.search), orderBy("date_inversed")));
        if (emailDocs.docs.length) {
          this.manual_page = [...emailDocs.docs];
          new SuccessToast(`Found ${emailDocs.docs.length} log${emailDocs.docs.length == 1 ? "" : "s"} with email ${this.search}`, 3500);
        } else {
          this.$status.warn(`🔍 No logs found with email <${this.search}>`);
          new WarningToast(`No logs found with that email address`, 3500);
          this.clear();
        }
      }
      // REF / USER
      else if (this.search.length >= 10) {
        // REF
        const logDoc = await getDoc(doc(db, "logs", this.search));
        if (logDoc.exists()) {
          this.manual_page = [logDoc];
          new SuccessToast(`Found log with reference ${this.search}`, 3500);
        }
        // USER
        else {
          this.$status.warn(`🔍 No logs found with reference <${this.search}>, searching for matching user`);
          new WarningToast(`No logs found with that reference, checking for matching users`, 3500);
          const userDocs = await getDocs(query(collection(db, "logs"), where("user", "==", this.search), orderBy("date_inversed")));
          if (userDocs.docs.length) {
            this.manual_page = [...userDocs.docs];
            new SuccessToast(`Found ${userDocs.docs.length} log${userDocs.docs.length == 1 ? "" : "s"} with user ${this.search}`, 3500);
          } else {
            this.$status.warn(`🔍 No logs found with user <${this.search}>`);
            new WarningToast(`No logs found with that user id or reference`, 3500);
            this.clear();
          }
        }
      }
      // FAIL
      else {
        this.$status.warn("🔍 Invalid search query for logs");
        new WarningToast("Invalid search query for logs, must be 10+ characters or email", 3500);
      }
      this.loaded = this.search;
      this.$router.push({ query: { ...this.$route.query, search: this.search } });
    },
  },
};
</script>

<style scoped>
.admin_actions {
  background: var(--color-on-bg);
  padding: 15px;
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar));
  margin-bottom: 15px;
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}
.admin_actions h3 {
  font-size: 16px;
  font-weight: 600;
  padding: 0 10px;
}
.action_buttons {
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
}
.action_button {
  padding: 10px 20px;
  background: var(--color-overlay-action);
  color: var(--color-on-overlay-action);
  border: none;
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar) - 5px);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}
.action_button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.action_description {
  margin: 0;
  font-size: 13px;
  opacity: 0.7;
  line-height: 1.4;
}
.docs_wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.docs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.docs_placeholder {
  padding: 20px 40px;
  text-align: center;
  width: 100%;
}
.docs .doc {
  background-color: var(--color-on-bg);
  padding: 7px 7px 7px 15px;
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar));
  position: relative;
}
.docs .doc.active {
  padding: 10px 15px 15px 15px;
}
.docs .doc .doc_title {
  display: flex;
  flex-flow: row;
  justify-content: stretch;
  gap: 20px;
  align-items: center;
}

.docs .doc .doc_title span {
  flex: 1 1 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.docs .doc .doc_title span.doc_title__email {
  font-weight: 500;
  cursor: pointer;
}
.docs .doc .doc_title .doc_title__time {
  font-family: "Source Code Pro", monospace;
  flex-grow: 10;
  text-align: right;
  margin-right: 35px;
  line-height: 25px;
  display: block;
}

.doc_title__toggle {
  visibility: hidden;
}
.doc_title__toggle,
.doc_details__toggle {
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar) - 7px);
  width: 25px;
  height: 25px;
  padding: 0;
  border: none;
  background: var(--color-bg);
}

.doc .doc_details__toggle {
  position: absolute;
  top: 7px;
  right: 7px;
}

.doc_details__toggle__icon {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/img/general/portal/admin/add.png");
  background-image: url("@/assets/img/general/portal/admin/add.svg");
  transition: rotate 0.2s cubic-bezier(0.49, -0.02, 0.16, 1.94);
}

.doc.active .doc_details__toggle__icon {
  rotate: 45deg;
}

.doc_details_table th {
  font-weight: 500;
  text-align: left;
  padding-right: 10px;
}

nav.docs_nav {
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  justify-content: stretch;
}
nav.docs_nav .docs_nav_search,
nav.docs_nav .docs_nav__loaded {
  background: var(--color-on-bg);
  color: var(--color-text);
  border: none;
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar));
  width: unset;
  flex: 1 1 auto;
  font-size: 14px;
  padding: 0 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
nav.docs_nav .docs_nav__loaded {
  width: max-content;
  flex: 0 0 auto;
  color: var(--color-text);
  user-select: none;
  padding: 0 10px;
  line-height: 35px;
}
nav.docs_nav .docs_nav__loaded span {
  opacity: 0.5;
  font-weight: 500;
}

nav.docs_nav .docs_nav_search[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
nav.docs_nav .docs_nav_button,
.doc_save {
  flex: 0 0 35px;
  height: 35px;
  width: 35px;
  background-size: contain;
  padding: 0;
  border: none;
  cursor: pointer;
  font-size: 14px;
  background-color: var(--color-overlay-action);
  color: var(--color-on-overlay-action);
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar));
}

.doc_save {
  padding: 10px 20px;
  height: auto;
  width: auto;
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar) - 5px);
  position: relative;
  bottom: -8px;
  right: -8px;
  float: right;
}

.docs_nav_button.prev {
  background-image: url("@/assets/img/general/portal/admin/prev.png");
  background-image: url("@/assets/img/general/portal/admin/prev.svg");
}
.docs_nav_button.next {
  background-image: url("@/assets/img/general/portal/admin/next.png");
  background-image: url("@/assets/img/general/portal/admin/next.svg");
}
.docs_nav_button.search {
  background-image: url("@/assets/img/general/portal/admin/search.png");
  background-image: url("@/assets/img/general/portal/admin/search.svg");
}
.docs_nav_button.clear {
  background-image: url("@/assets/img/general/portal/admin/clear.png");
  background-image: url("@/assets/img/general/portal/admin/clear.svg");
}
nav.docs_nav .docs_nav_button[disabled] {
  background-color: var(--color-on-bg);
  color: var(--color-bg);
  cursor: not-allowed;
  opacity: 0.5;
}
@media (max-width: 670px) {
  .docs .doc .doc_title .doc_title__ref,
  .docs .doc .doc_title .doc_title__email_domain,
  .docs_nav .docs_nav__loaded {
    display: none;
  }
}
</style>
