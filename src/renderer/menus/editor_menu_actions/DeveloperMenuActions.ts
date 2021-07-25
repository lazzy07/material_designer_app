import { ipcRenderer } from "electron";
import { IpcMessages } from "../../../IpcMessages";

export const openKernelNodeEditor = () => {
  ipcRenderer.send(IpcMessages.OPEN_KERNEL_NODE_EDITOR);
};
