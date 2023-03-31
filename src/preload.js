import { contextBridge, ipcRenderer } from "electron";
// Expose APIs to the renderer process
contextBridge.exposeInMainWorld("electron", {
  minimize: () => ipcRenderer.send("minimize-window"),
  maximize: () => ipcRenderer.send("maximize-window"),
  close: () => ipcRenderer.send("close-window"),
});
