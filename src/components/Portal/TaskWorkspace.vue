<template>
  <div class="task_workspace styled_obj workspace_section">
    <span class="styled_line__label">{{ sectionLabel }}:</span>
    <span class="styled_line__separator"></span>
    <span class="styled_line__value workspace_panel">
      <div v-if="loading" class="workspace_loading overlay_contents_text">Loading workspace…</div>

      <template v-else-if="!workspace">
        <p class="workspace_hint overlay_contents_text">
          Attach a workspace to collect files for this {{ taskType }}.
          {{ isTeacherMode ? "Shared among class teachers." : "Only you can see your workspace." }}
        </p>
        <div class="workspace_actions">
          <button class="primary_styled workspace_action" :disabled="busy" @click="enableWorkspace">
            Enable workspace
          </button>
          <button class="secondary_styled workspace_action" :disabled="busy" @click="showLink = true">
            Link existing
          </button>
        </div>
        <div v-if="showLink" class="workspace_link_row inputs_row">
          <input
            v-model="linkId"
            class="styled_input"
            type="text"
            placeholder="Workspace ID (share across project steps)"
            @keydown.enter="linkWorkspace"
          />
          <button class="primary_styled workspace_action" :disabled="busy || !linkId.trim()" @click="linkWorkspace">
            Link
          </button>
          <button class="secondary_styled workspace_action" @click="showLink = false">Cancel</button>
        </div>
      </template>

      <template v-else>
        <div class="workspace_meta overlay_contents_text">
          <span>Workspace <code class="workspace_id">{{ workspace.id }}</code></span>
          <button
            v-if="!driveConnected"
            class="secondary_styled workspace_drive_btn"
            :disabled="busy"
            @click="connectDrive"
          >
            Connect Drive
          </button>
          <span v-else class="workspace_drive_connected">Drive connected</span>
        </div>

        <div
          class="workspace_dropzone"
          :class="{ 'workspace_dropzone--active': dragOver }"
          @dragenter.prevent="dragOver = true"
          @dragover.prevent="dragOver = true"
          @dragleave.prevent="onDragLeave"
          @drop.prevent="onDrop"
        >
          <span class="workspace_dropzone__text">Drop files here</span>
          <input ref="fileInput" class="workspace_file_input" type="file" multiple @change="onFilePick" />
          <button class="primary_styled workspace_add_file" :disabled="busy" @click="$refs.fileInput?.click()">
            Add file
          </button>
        </div>

        <ul v-if="workspace.files?.length" class="workspace_files">
          <li v-for="file in workspace.files" :key="file.id" class="workspace_file">
            <a v-if="file.url" class="workspace_file__name" :href="file.url" target="_blank" rel="noopener">
              {{ file.name }}
            </a>
            <span v-else class="workspace_file__name">{{ file.name }}</span>
            <button
              class="workspace_file__remove"
              title="Remove file"
              :disabled="busy"
              @click="removeFile(file.id)"
            >
              ×
            </button>
          </li>
        </ul>
        <p v-else class="workspace_empty overlay_contents_text">No files yet.</p>

        <div class="workspace_footer">
          <button class="secondary_styled workspace_action" :disabled="busy" @click="showLink = true">
            Link existing
          </button>
          <button class="workspace_destroy" :disabled="busy" @click="confirmDestroy = true">Destroy</button>
        </div>

        <div v-if="showLink" class="workspace_link_row inputs_row">
          <input
            v-model="linkId"
            class="styled_input"
            type="text"
            placeholder="Workspace ID to link"
            @keydown.enter="linkWorkspace"
          />
          <button class="primary_styled workspace_action" :disabled="busy || !linkId.trim()" @click="linkWorkspace">
            Link
          </button>
          <button class="secondary_styled workspace_action" @click="showLink = false">Cancel</button>
        </div>
      </template>

      <OverlayWrapper v-if="confirmDestroy" @close="confirmDestroy = false" v-slot="scope">
        <Modal
          class="confirm_modal router_center_view"
          :can_continue="true"
          title="Destroy workspace?"
          html="This removes the workspace link for this task. Files may remain in storage until the server purges them."
          :continue_action="() => destroyWorkspace()"
          :skippable="true"
          @skip="scope.close"
          skip_text="Cancel"
          submit_text="Destroy"
        />
      </OverlayWrapper>
    </span>
  </div>
</template>

<script>
/**
 * Task workspace panel — enable/link/destroy workspace, drop zone, file list, Drive connect.
 * @module TaskWorkspace
 */

import { ErrorToast, SuccessToast, WarningToast } from "@svonk/util";
import OverlayWrapper from "@/components/Modal/OverlayWrapper.vue";
import Modal from "@/components/Modal/Modal.vue";
import {
  createTaskWorkspace,
  createTeacherWorkspace,
  deleteWorkspaceFile,
  destroyTaskWorkspace,
  destroyTeacherWorkspace,
  fetchTaskWorkspace,
  fetchTeacherWorkspace,
  fetchWorkspace,
  linkTaskWorkspace,
  linkTeacherWorkspace,
  startDriveOAuth,
  uploadWorkspaceFile,
} from "@/common/workspace";

export default {
  name: "TaskWorkspace",
  components: { OverlayWrapper, Modal },
  props: {
    taskPath: { type: String, required: true },
    classId: { type: String, required: true },
    taskType: { type: String, default: "task" },
    isTeacherMode: { type: Boolean, default: false },
    initialWorkspaceId: { type: String, default: null },
  },
  emits: ["workspace-changed"],
  data() {
    return {
      loading: true,
      busy: false,
      workspace: null,
      dragOver: false,
      showLink: false,
      linkId: "",
      confirmDestroy: false,
      driveConnected: false,
    };
  },
  computed: {
    sectionLabel() {
      return this.isTeacherMode ? "Teacher workspace" : "Workspace";
    },
  },
  mounted() {
    this.loadWorkspace();
  },
  methods: {
    async loadWorkspace() {
      this.loading = true;
      try {
        let ws = null;
        if (this.initialWorkspaceId) {
          ws = await fetchWorkspace(this.initialWorkspaceId);
        } else if (this.isTeacherMode) {
          ws = await fetchTeacherWorkspace(this.classId);
        } else {
          ws = await fetchTaskWorkspace(this.taskPath);
        }
        this.workspace = ws;
        this.driveConnected = ws?.drive_connected === true;
      } catch (err) {
        this.$status?.warn?.("Workspace load failed", err);
      } finally {
        this.loading = false;
      }
    },
    async enableWorkspace() {
      this.busy = true;
      try {
        this.workspace = this.isTeacherMode
          ? await createTeacherWorkspace(this.classId)
          : await createTaskWorkspace(this.taskPath);
        this.$emit("workspace-changed", this.workspace.id);
        new SuccessToast("Workspace enabled", 1500);
      } catch (err) {
        new ErrorToast("Couldn't enable workspace", err, 2000);
      } finally {
        this.busy = false;
      }
    },
    async linkWorkspace() {
      const id = this.linkId.trim();
      if (!id) return;
      this.busy = true;
      try {
        this.workspace = this.isTeacherMode
          ? await linkTeacherWorkspace(this.classId, id)
          : await linkTaskWorkspace(this.taskPath, id);
        this.showLink = false;
        this.linkId = "";
        this.$emit("workspace-changed", this.workspace.id);
        new SuccessToast("Workspace linked", 1500);
      } catch (err) {
        new ErrorToast("Couldn't link workspace", err, 2000);
      } finally {
        this.busy = false;
      }
    },
    async destroyWorkspace() {
      this.confirmDestroy = false;
      this.busy = true;
      try {
        if (this.isTeacherMode) {
          await destroyTeacherWorkspace(this.classId);
        } else {
          await destroyTaskWorkspace(this.taskPath);
        }
        this.workspace = null;
        this.$emit("workspace-changed", null);
        new SuccessToast("Workspace removed", 1500);
      } catch (err) {
        new ErrorToast("Couldn't destroy workspace", err, 2000);
      } finally {
        this.busy = false;
      }
    },
    async connectDrive() {
      try {
        const url = await startDriveOAuth();
        if (url && url !== "#drive-oauth-stub") {
          window.open(url, "_blank", "noopener");
        } else {
          new WarningToast("Drive connect will be available when the server route is live", 2500);
          this.driveConnected = true;
        }
      } catch (err) {
        new ErrorToast("Couldn't start Drive connect", err, 2000);
      }
    },
    onDragLeave(event) {
      if (!event.currentTarget?.contains(event.relatedTarget)) {
        this.dragOver = false;
      }
    },
    async onDrop(event) {
      this.dragOver = false;
      const files = [...(event.dataTransfer?.files || [])];
      if (!files.length || !this.workspace?.id) return;
      await this.uploadFiles(files);
    },
    async onFilePick(event) {
      const files = [...(event.target?.files || [])];
      event.target.value = "";
      if (!files.length || !this.workspace?.id) return;
      await this.uploadFiles(files);
    },
    async uploadFiles(files) {
      this.busy = true;
      try {
        for (const file of files) {
          const uploaded = await uploadWorkspaceFile(this.workspace.id, file);
          this.workspace = {
            ...this.workspace,
            files: [...(this.workspace.files || []), uploaded],
          };
        }
        new SuccessToast(files.length === 1 ? "File added" : `${files.length} files added`, 1500);
      } catch (err) {
        new ErrorToast("Upload failed", err, 2000);
      } finally {
        this.busy = false;
      }
    },
    async removeFile(fileId) {
      if (!this.workspace?.id) return;
      this.busy = true;
      try {
        await deleteWorkspaceFile(this.workspace.id, fileId);
        this.workspace = {
          ...this.workspace,
          files: (this.workspace.files || []).filter((f) => f.id !== fileId),
        };
      } catch (err) {
        new ErrorToast("Couldn't remove file", err, 2000);
      } finally {
        this.busy = false;
      }
    },
  },
};
</script>

<style scoped>
.workspace_section {
  align-items: flex-start;
}
.workspace_panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
.workspace_hint {
  margin: 0;
}
.workspace_actions,
.workspace_footer,
.workspace_link_row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
.workspace_link_row .styled_input {
  flex: 1;
  min-width: 160px;
}
.workspace_meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin: 0;
}
.workspace_id {
  font-family: var(--font-mono, monospace);
  font-size: 0.85em;
  background: var(--color-overlay-input);
  padding: 2px 6px;
  border-radius: var(--radius-overlay-input);
}
.workspace_dropzone {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: calc(var(--height-overlay-input) * 2.5);
  padding: var(--padding-overlay-input);
  border-radius: var(--radius-overlay-input);
  border: 2px dashed var(--color-overlay-border);
  background-color: var(--color-overlay-input);
  color: var(--color-on-overlay-input-alt);
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}
.workspace_dropzone--active {
  background-color: color-mix(in srgb, var(--color-action) 18%, var(--color-overlay-input));
  border-color: var(--color-theme-accent-border, var(--color-action));
  color: var(--color-action);
}
.workspace_dropzone__text {
  font-weight: 500;
  text-align: center;
  pointer-events: none;
}
.workspace_dropzone--active .workspace_dropzone__text {
  color: var(--color-action);
}
.workspace_file_input {
  display: none;
}
.workspace_files {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}
.workspace_file {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 10px;
  border-radius: var(--radius-overlay-input);
  background: var(--color-overlay-input);
  color: var(--color-on-overlay-input);
}
.workspace_file__name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-link);
  text-decoration: none;
}
.workspace_file__remove {
  border: none;
  background: transparent;
  color: var(--color-on-overlay-input-alt);
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
  padding: 0 4px;
}
.workspace_file__remove:hover {
  color: var(--color-on-overlay-link-remove-hover);
}
.workspace_destroy {
  margin-left: auto;
  border: none;
  background: transparent;
  color: var(--color-on-overlay-link-remove-hover);
  cursor: pointer;
  text-decoration: underline;
  font: inherit;
}
.workspace_drive_btn {
  font-size: 0.9em;
}
.workspace_drive_connected {
  color: var(--color-link);
  font-size: 0.9em;
}
.workspace_empty {
  margin: 0;
}
</style>
