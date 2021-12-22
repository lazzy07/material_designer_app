import { ipcRenderer } from "electron";
import { Project } from "../../interfaces/Project";
import { IpcMessages } from "../../IpcMessages";
import { Action } from "../store";

export const OPEN_PROJECT = "open project";

export const openProject = (data: Project): Action => {
  const time = Date.now();
  const updatedData = {
    ...data,
    modifiedAt: time,
    savedAt: time,
  };

  ipcRenderer.emit(IpcMessages.OPEN_NEW_PROJECT, updatedData);

  return {
    type: OPEN_PROJECT,
    payload: updatedData,
  };
};
