import { ipcRenderer } from "electron";
import { IpcMessages } from "./../../../IpcMessages";

export const openProjectScreen = () => {
  ipcRenderer.send(IpcMessages.OPEN_PROJECT_PAGE);
};
