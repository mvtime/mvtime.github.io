<template>
  <div class="task_workspace styled_obj workspace_section">
    <span class="styled_line__label">Workspace:</span>
    <span class="styled_line__separator"></span>
    <span class="styled_line__value workspace_panel">
      <div v-if="loading" class="workspace_loading overlay_contents_text">Loading workspace…</div>

      <template v-else-if="!workspace">
        <p v-if="!showLink" class="workspace_hint overlay_contents_text">
          Attach a workspace to collect files for this {{ taskType }}.
          {{ isTeacherMode ? "Shared among class teachers." : "Only you can see your workspace." }}
        </p>

        <template v-if="!showLink">
          <div class="workspace_actions bottom_actions">
            <div class="flex_spacer"></div>
            <button class="primary_styled workspace_action" :disabled="busy" @click="enableWorkspace">
              Enable
            </button>
            <button class="secondary_styled workspace_action" :disabled="busy" @click="openLinkMode">
              Link
            </button>
          </div>
        </template>

        <template v-else>
          <div class="inputs_row workspace_link_select">
            <select
              v-model="linkId"
              class="styled_input"
              :disabled="busy || !linkOptions.length"
            >
              <option value="" disabled hidden selected>
                {{ linkOptions.length ? "Select a workspace" : "No workspaces to link" }}
              </option>
              <option
                v-for="option in linkOptions"
                :key="option.workspace_id"
                :value="option.workspace_id"
              >
                {{ option.label }}
              </option>
            </select>
          </div>
          <div class="workspace_actions bottom_actions">
            <button class="back_action click_escape" :disabled="busy" @click="cancelLink">Back</button>
            <div class="flex_spacer"></div>
            <button
              class="continue_action"
              :class="{ alt_bg: !linkId.trim() }"
              :disabled="busy || !linkId.trim()"
              @click="linkWorkspace"
            >
              Link
            </button>
          </div>
        </template>
      </template>

      <template v-else>
        <div class="workspace_header">
          <a
            v-if="workspaceDriveUrl"
            class="workspace_chip button_pointer_text"
            :href="workspaceDriveUrl"
            target="_blank"
            rel="noopener noreferrer"
            :title="workspaceDriveUrl"
          >
            {{ workspace.id }}
          </a>
          <span v-else class="workspace_chip button_pointer_text" :title="workspace.id">
            {{ workspace.id }}
          </span>
          <span
            v-if="!driveConnected"
            class="button_pointer_text workspace_drive_quiet"
            role="button"
            tabindex="0"
            @click="connectDrive"
            @keydown.enter.prevent="connectDrive"
          >
            Connect Drive
          </span>
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
          <button
            class="primary_styled workspace_add_file"
            type="button"
            :disabled="busy"
            @click="$refs.fileInput?.click()"
          >
            Add file
          </button>
        </div>

        <ul v-if="workspace.files?.length" class="workspace_files">
          <li v-for="file in workspace.files" :key="file.id" class="workspace_file">
            <span class="workspace_file__icon" :class="fileIconClass(file)" :title="fileIconTitle(file)">
              {{ fileIconLabel(file) }}
            </span>
            <div class="workspace_file__body">
              <a v-if="file.url" class="workspace_file__name" :href="file.url" target="_blank" rel="noopener">
                {{ file.name }}
              </a>
              <span v-else class="workspace_file__name">{{ file.name }}</span>
              <span v-if="fileMeta(file)" class="workspace_file__meta">{{ fileMeta(file) }}</span>
            </div>
            <button
              class="workspace_file__remove"
              type="button"
              title="Remove file"
              :disabled="busy"
              @click="removeFile(file.id)"
            >
              <img class="remove_icon" src="@/assets/img/general/portal/remove.svg" alt="" />
            </button>
          </li>
        </ul>
        <p v-else class="workspace_empty overlay_contents_text">No files yet.</p>

        <div class="workspace_footer bottom_actions">
          <div class="flex_spacer"></div>
          <button class="workspace_destroy" type="button" :disabled="busy" @click="confirmDestroy = true">
            Destroy
          </button>
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
  workspaceDriveFolderUrl,
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
    linkableWorkspaces: {
      type: Array,
      default: () => [],
    },
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
    linkOptions() {
      const seen = new Set();
      const options = [];
      for (const entry of this.linkableWorkspaces || []) {
        const workspaceId = entry?.workspace_id;
        if (!workspaceId || seen.has(workspaceId)) continue;
        seen.add(workspaceId);
        options.push(entry);
      }
      return options;
    },
    workspaceDriveUrl() {
      return workspaceDriveFolderUrl(this.workspace);
    },
  },
  mounted() {
    this.loadWorkspace();
  },
  methods: {
    openLinkMode() {
      this.showLink = true;
      this.linkId = "";
    },
    cancelLink() {
      this.showLink = false;
      this.linkId = "";
    },
    fileIconLabel(file) {
      const mime = (file?.mime_type || "").toLowerCase();
      const name = file?.name || "";
      const ext = name.includes(".") ? name.split(".").pop().toLowerCase() : "";
      if (mime.startsWith("image/")) return "IMG";
      if (mime.startsWith("video/")) return "VID";
      if (mime.startsWith("audio/")) return "AUD";
      if (mime.includes("pdf") || ext === "pdf") return "PDF";
      if (mime.includes("spreadsheet") || ["xls", "xlsx", "csv"].includes(ext)) return "XLS";
      if (mime.includes("presentation") || ["ppt", "pptx"].includes(ext)) return "PPT";
      if (mime.includes("word") || mime.includes("document") || ["doc", "docx", "txt", "md"].includes(ext)) {
        return "DOC";
      }
      if (mime.includes("zip") || ["zip", "rar", "7z", "tar", "gz"].includes(ext)) return "ZIP";
      if (file?.source === "drive") return "DRV";
      if (ext && ext.length <= 4) return ext.slice(0, 4).toUpperCase();
      return "FILE";
    },
    fileIconClass(file) {
      const label = this.fileIconLabel(file);
      if (label === "IMG") return "workspace_file__icon--image";
      if (label === "PDF") return "workspace_file__icon--pdf";
      if (label === "DOC") return "workspace_file__icon--doc";
      if (label === "DRV") return "workspace_file__icon--drive";
      return "workspace_file__icon--generic";
    },
    fileIconTitle(file) {
      return file?.mime_type || file?.name || "File";
    },
    fileMeta(file) {
      const parts = [];
      if (typeof file?.size === "number" && file.size >= 0) {
        parts.push(this.formatFileSize(file.size));
      }
      if (file?.source === "drive") {
        parts.push("Drive");
      }
      return parts.join(" · ");
    },
    formatFileSize(bytes) {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10 * 1024 ? 1 : 0)} KB`;
      if (bytes < 1024 * 1024 * 1024) {
        return `${(bytes / (1024 * 1024)).toFixed(bytes < 10 * 1024 * 1024 ? 1 : 0)} MB`;
      }
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    },
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
        this.cancelLink();
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
.workspace_section .styled_line__value {
  flex: 1;
  min-width: 0;
}
.workspace_panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  min-width: 0;
  font-weight: 400;
  white-space: normal;
}
.workspace_hint,
.workspace_empty,
.workspace_loading {
  margin: 0;
}
.workspace_actions.bottom_actions,
.workspace_footer.bottom_actions {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 0;
  gap: 0;
}
.workspace_actions.bottom_actions .workspace_action,
.workspace_footer.bottom_actions .workspace_destroy {
  flex: 0 1 auto;
  white-space: nowrap;
}
.workspace_link_select {
  margin: 0;
}
.workspace_link_select .styled_input {
  flex: 1 1 auto;
  min-width: 0;
  width: 100%;
  height: var(--height-overlay-input);
}
.workspace_header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.workspace_chip {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--font-mono, monospace);
  font-size: 0.78em;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
}
a.workspace_chip:hover {
  filter: brightness(1.05);
}
.workspace_drive_quiet {
  margin-left: auto;
  cursor: pointer;
}
.workspace_panel .workspace_add_file,
.workspace_panel .workspace_destroy {
  height: var(--height-overlay-secondary-input);
  min-height: var(--height-overlay-secondary-input);
  padding: 0 var(--padding-overlay-action);
  border-radius: 1000px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-family: inherit;
  flex-shrink: 0;
  line-height: 1;
}
.workspace_panel .workspace_add_file {
  background-color: var(--color-overlay-action);
  color: var(--color-on-overlay-action);
}
.workspace_panel .workspace_add_file:not([disabled]):hover {
  filter: brightness(1.05);
}
.workspace_panel .workspace_add_file[disabled] {
  cursor: not-allowed;
  background-color: var(--color-overlay-action-disabled);
  color: var(--color-on-overlay-action-disabled);
}
.workspace_dropzone {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-sizing: border-box;
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
  font-size: 14px;
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
  min-width: 0;
}
.workspace_file {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding: 6px 8px 6px 10px;
  border-radius: var(--radius-overlay-input);
  background: var(--color-overlay-input);
  color: var(--color-on-overlay-input);
}
.workspace_file__icon {
  flex: 0 0 22px;
  width: 22px;
  height: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: var(--color-overlay-secondary-input);
  color: var(--color-on-overlay-input-alt);
  font-size: 8px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;
  user-select: none;
}
.workspace_file__icon--image {
  color: var(--color-link);
}
.workspace_file__icon--pdf {
  color: var(--color-on-overlay-link-remove-hover);
}
.workspace_file__icon--doc {
  color: var(--color-on-overlay-input);
}
.workspace_file__icon--drive {
  color: var(--color-link);
}
.workspace_file__body {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
  overflow: hidden;
}
.workspace_file__name {
  display: block;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-link);
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.3;
}
span.workspace_file__name {
  color: var(--color-on-overlay-input);
}
.workspace_file__meta {
  font-size: 12px;
  line-height: 1.2;
  color: var(--color-on-overlay-input-alt);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.workspace_file__remove {
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 3px;
  background-color: var(--color-overlay-input);
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.workspace_file__remove .remove_icon {
  width: 100%;
  height: 100%;
  pointer-events: none;
  filter: var(--filter-icon);
}
.workspace_file__remove:not([disabled]):hover {
  background-color: var(--color-overlay-link-remove-hover);
  color: var(--color-on-overlay-link-remove-hover);
}
.workspace_file__remove[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
.workspace_footer {
  margin-top: 2px;
}
.workspace_footer.bottom_actions .workspace_destroy {
  background-color: var(--color-overlay-link-remove-hover);
  color: var(--color-on-overlay-link-remove-hover);
}
.workspace_destroy:not([disabled]):hover {
  filter: brightness(0.95);
}
.workspace_destroy[disabled] {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
