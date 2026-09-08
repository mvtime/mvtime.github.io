/**
 * Task workspace API — personal task workspaces, teacher shared workspaces, Drive OAuth.
 * Stubs locally when routes 404 mid-dev (mvtt-server sibling contract).
 *
 * @module common/workspace
 */

import { ApiFetchError, apiFetch } from "@/common/apiFetch";

export interface WorkspaceFile {
  id: string;
  name: string;
  mime_type?: string | null;
  size?: number | null;
  url?: string | null;
  created_at?: string | null;
  source?: "upload" | "drive" | string;
}

export interface Workspace {
  id: string;
  kind: "task" | "teacher" | string;
  files: WorkspaceFile[];
  drive_connected?: boolean;
  drive_folder_id?: string | null;
  drive_folder_url?: string | null;
  linked_task_refs?: string[];
}

/** Board task row suitable for workspace link picker (deduped by workspace_id). */
export interface LinkableWorkspace {
  workspace_id: string;
  task_name: string;
  class_name?: string;
  label: string;
}

/** Human-readable option label: task name primary, optional "class · task". */
export function linkableWorkspaceLabel(entry: {
  task_name: string;
  class_name?: string | null;
}): string {
  const taskName = entry.task_name?.trim() || "Task";
  const className = entry.class_name?.trim();
  return className ? `${className} · ${taskName}` : taskName;
}

/** Google Drive folder URL for a workspace chip link. */
export function workspaceDriveFolderUrl(workspace: Workspace | null | undefined): string | null {
  if (!workspace) return null;
  if (typeof workspace.drive_folder_url === "string" && workspace.drive_folder_url.trim()) {
    return workspace.drive_folder_url.trim();
  }
  if (typeof workspace.drive_folder_id === "string" && workspace.drive_folder_id.trim()) {
    return `https://drive.google.com/drive/folders/${encodeURIComponent(workspace.drive_folder_id.trim())}`;
  }
  return null;
}

const stubWorkspaces = new Map<string, Workspace>();
const stubTaskWorkspaceLinks = new Map<string, string>();

function encodeTaskPath(taskPath: string): string {
  return encodeURIComponent(taskPath.replace(/~/g, "/"));
}

function normalizeWorkspace(raw: unknown): Workspace | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  const id = typeof row.id === "string" ? row.id : typeof row.workspace_id === "string" ? row.workspace_id : "";
  if (!id) return null;
  const files = Array.isArray(row.files)
    ? row.files
        .map((f) => {
          if (!f || typeof f !== "object") return null;
          const file = f as Record<string, unknown>;
          const fileId = typeof file.id === "string" ? file.id : "";
          const name = typeof file.name === "string" ? file.name : "file";
          if (!fileId) return null;
          return {
            id: fileId,
            name,
            mime_type: typeof file.mime_type === "string" ? file.mime_type : null,
            size: typeof file.size === "number" ? file.size : null,
            url: typeof file.url === "string" ? file.url : null,
            created_at: typeof file.created_at === "string" ? file.created_at : null,
            source: typeof file.source === "string" ? file.source : undefined,
          } as WorkspaceFile;
        })
        .filter((f): f is WorkspaceFile => !!f)
    : [];
  return {
    id,
    kind: typeof row.kind === "string" ? row.kind : "task",
    files,
    drive_connected: row.drive_connected === true,
    drive_folder_id:
      typeof row.drive_folder_id === "string"
        ? row.drive_folder_id
        : row.drive_folder_id === null
          ? null
          : undefined,
    drive_folder_url:
      typeof row.drive_folder_url === "string"
        ? row.drive_folder_url
        : row.drive_folder_url === null
          ? null
          : undefined,
    linked_task_refs: Array.isArray(row.linked_task_refs)
      ? row.linked_task_refs.filter((r): r is string => typeof r === "string")
      : undefined,
  };
}

function stubWorkspaceId(taskPath: string, kind: "task" | "teacher"): string {
  const key = `${kind}:${taskPath.replace(/~/g, "/")}`;
  const existing = stubTaskWorkspaceLinks.get(key);
  if (existing) return existing;
  const id = `stub-ws-${kind}-${Math.random().toString(36).slice(2, 10)}`;
  stubTaskWorkspaceLinks.set(key, id);
  stubWorkspaces.set(id, { id, kind, files: [], drive_connected: false });
  return id;
}

function stubGetWorkspace(workspaceId: string): Workspace {
  const existing = stubWorkspaces.get(workspaceId);
  if (existing) return existing;
  const ws: Workspace = { id: workspaceId, kind: "task", files: [], drive_connected: false };
  stubWorkspaces.set(workspaceId, ws);
  return ws;
}

function isMissingEndpoint(err: unknown): boolean {
  return err instanceof ApiFetchError && (err.status === 404 || err.status === 405 || err.status === 501);
}

/** GET workspace linked to a task (student personal workspace). */
export async function fetchTaskWorkspace(taskPath: string): Promise<Workspace | null> {
  const normalized = taskPath.replace(/~/g, "/");
  const encoded = encodeTaskPath(normalized);
  try {
    const payload = await apiFetch<unknown>(`/api/v1/me/tasks/${encoded}/workspace`);
    return normalizeWorkspace(payload);
  } catch (err) {
    if (isMissingEndpoint(err)) {
      const id = stubTaskWorkspaceLinks.get(`task:${normalized}`);
      return id ? stubGetWorkspace(id) : null;
    }
    throw err;
  }
}

/** POST create a new task workspace. */
export async function createTaskWorkspace(taskPath: string): Promise<Workspace> {
  const normalized = taskPath.replace(/~/g, "/");
  const encoded = encodeTaskPath(normalized);
  try {
    const payload = await apiFetch<unknown>(`/api/v1/me/tasks/${encoded}/workspace`, {
      method: "POST",
      body: { kind: "task" },
    });
    const ws = normalizeWorkspace(payload);
    if (ws) return ws;
  } catch (err) {
    if (isMissingEndpoint(err)) {
      const id = stubWorkspaceId(normalized, "task");
      return stubGetWorkspace(id);
    }
    throw err;
  }
  const id = stubWorkspaceId(normalized, "task");
  return stubGetWorkspace(id);
}

/** POST link an existing workspace_id to this task (shareable across project steps). */
export async function linkTaskWorkspace(taskPath: string, workspaceId: string): Promise<Workspace> {
  const normalized = taskPath.replace(/~/g, "/");
  const encoded = encodeTaskPath(normalized);
  try {
    const payload = await apiFetch<unknown>(`/api/v1/me/tasks/${encoded}/workspace/link`, {
      method: "POST",
      body: { workspace_id: workspaceId },
    });
    const ws = normalizeWorkspace(payload);
    if (ws) return ws;
  } catch (err) {
    if (isMissingEndpoint(err)) {
      stubTaskWorkspaceLinks.set(`task:${normalized}`, workspaceId);
      return stubGetWorkspace(workspaceId);
    }
    throw err;
  }
  stubTaskWorkspaceLinks.set(`task:${normalized}`, workspaceId);
  return stubGetWorkspace(workspaceId);
}

/** DELETE unlink/destroy workspace for a task. */
export async function destroyTaskWorkspace(taskPath: string): Promise<void> {
  const normalized = taskPath.replace(/~/g, "/");
  const encoded = encodeTaskPath(normalized);
  try {
    await apiFetch(`/api/v1/me/tasks/${encoded}/workspace`, { method: "DELETE" });
    return;
  } catch (err) {
    if (isMissingEndpoint(err)) {
      stubTaskWorkspaceLinks.delete(`task:${normalized}`);
      return;
    }
    throw err;
  }
}

/** Teacher shared workspace for a class (class teachers only). */
export async function fetchTeacherWorkspace(classId: string): Promise<Workspace | null> {
  try {
    const payload = await apiFetch<unknown>(
      `/api/v1/me/classes/${encodeURIComponent(classId)}/teacher-workspace`
    );
    const ws = normalizeWorkspace(payload);
    if (ws) return { ...ws, kind: "teacher" };
    return null;
  } catch (err) {
    if (isMissingEndpoint(err)) {
      const id = stubTaskWorkspaceLinks.get(`teacher:${classId}`);
      return id ? { ...stubGetWorkspace(id), kind: "teacher" } : null;
    }
    throw err;
  }
}

export async function createTeacherWorkspace(classId: string): Promise<Workspace> {
  try {
    const payload = await apiFetch<unknown>(
      `/api/v1/me/classes/${encodeURIComponent(classId)}/teacher-workspace`,
      { method: "POST", body: { kind: "teacher" } }
    );
    const ws = normalizeWorkspace(payload);
    if (ws) return { ...ws, kind: "teacher" };
  } catch (err) {
    if (isMissingEndpoint(err)) {
      const id = stubWorkspaceId(classId, "teacher");
      return { ...stubGetWorkspace(id), kind: "teacher" };
    }
    throw err;
  }
  const id = stubWorkspaceId(classId, "teacher");
  return { ...stubGetWorkspace(id), kind: "teacher" };
}

export async function linkTeacherWorkspace(classId: string, workspaceId: string): Promise<Workspace> {
  try {
    const payload = await apiFetch<unknown>(
      `/api/v1/me/classes/${encodeURIComponent(classId)}/teacher-workspace/link`,
      { method: "POST", body: { workspace_id: workspaceId } }
    );
    const ws = normalizeWorkspace(payload);
    if (ws) return { ...ws, kind: "teacher" };
  } catch (err) {
    if (isMissingEndpoint(err)) {
      stubTaskWorkspaceLinks.set(`teacher:${classId}`, workspaceId);
      return { ...stubGetWorkspace(workspaceId), kind: "teacher" };
    }
    throw err;
  }
  stubTaskWorkspaceLinks.set(`teacher:${classId}`, workspaceId);
  return { ...stubGetWorkspace(workspaceId), kind: "teacher" };
}

export async function destroyTeacherWorkspace(classId: string): Promise<void> {
  try {
    await apiFetch(`/api/v1/me/classes/${encodeURIComponent(classId)}/teacher-workspace`, {
      method: "DELETE",
    });
    return;
  } catch (err) {
    if (isMissingEndpoint(err)) {
      stubTaskWorkspaceLinks.delete(`teacher:${classId}`);
      return;
    }
    throw err;
  }
}

/** GET workspace by id (files list). */
export async function fetchWorkspace(workspaceId: string): Promise<Workspace> {
  try {
    const payload = await apiFetch<unknown>(`/api/v1/workspaces/${encodeURIComponent(workspaceId)}`);
    const ws = normalizeWorkspace(payload);
    if (ws) return ws;
  } catch (err) {
    if (isMissingEndpoint(err)) {
      return stubGetWorkspace(workspaceId);
    }
    throw err;
  }
  return stubGetWorkspace(workspaceId);
}

/** Upload a file to a workspace (multipart). */
export async function uploadWorkspaceFile(workspaceId: string, file: File): Promise<WorkspaceFile> {
  const user = (await import("@/firebase")).auth.currentUser;
  if (!user) throw new Error("Not signed in");
  const token = await user.getIdToken();
  const API_BASE = `https://${process.env.VUE_APP_BRAND_DOMAIN__API}`;
  const url = `${API_BASE}/api/v1/workspaces/${encodeURIComponent(workspaceId)}/files`;
  const form = new FormData();
  form.append("file", file, file.name);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });
    if (!response.ok) {
      throw new ApiFetchError(`Upload failed (${response.status})`, response.status);
    }
    const payload = (await response.json()) as Record<string, unknown>;
    const wsFile = normalizeWorkspace({ id: workspaceId, files: [payload] })?.files[0];
    if (wsFile) return wsFile;
    return {
      id: String(payload.id || `stub-file-${Date.now()}`),
      name: String(payload.name || file.name),
      mime_type: file.type || null,
      size: file.size,
      source: "upload",
    };
  } catch (err) {
    if (isMissingEndpoint(err)) {
      const ws = stubGetWorkspace(workspaceId);
      const stubFile: WorkspaceFile = {
        id: `stub-file-${Date.now()}`,
        name: file.name,
        mime_type: file.type || null,
        size: file.size,
        source: "upload",
        created_at: new Date().toISOString(),
      };
      ws.files = [...ws.files, stubFile];
      stubWorkspaces.set(workspaceId, ws);
      return stubFile;
    }
    throw err;
  }
}

export async function deleteWorkspaceFile(workspaceId: string, fileId: string): Promise<void> {
  try {
    await apiFetch(`/api/v1/workspaces/${encodeURIComponent(workspaceId)}/files/${encodeURIComponent(fileId)}`, {
      method: "DELETE",
    });
  } catch (err) {
    if (isMissingEndpoint(err)) {
      const ws = stubGetWorkspace(workspaceId);
      ws.files = ws.files.filter((f) => f.id !== fileId);
      stubWorkspaces.set(workspaceId, ws);
      return;
    }
    throw err;
  }
}

/** Start Google Drive OAuth — returns redirect URL. */
export async function startDriveOAuth(): Promise<string> {
  try {
    const payload = await apiFetch<{ url?: string }>("/api/v1/oauth/drive/start", { method: "POST" });
    if (payload?.url) return payload.url;
  } catch (err) {
    if (isMissingEndpoint(err)) {
      return "#drive-oauth-stub";
    }
    throw err;
  }
  return "#drive-oauth-stub";
}
