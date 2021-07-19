import { ipcRenderer } from "electron";
import { IpcMessages } from "./../../../IpcMessages";
import { EditorElement } from "../../../EditorElements";

export const openProjectScreen = () => {
  ipcRenderer.send(IpcMessages.OPEN_PROJECT_PAGE);
};

export const newProjectScreen = () => {
  ipcRenderer.send(IpcMessages.NEW_PROJECT_PAGE);
};

export const openLoginScreen = () => {
  ipcRenderer.send(IpcMessages.LOAD_LOGIN_PAGE);
};

export const openPreferencesScreen = () => {
  ipcRenderer.send(IpcMessages.OPEN_PREFERENCES_SCREEN);
};

export const onClickWindow = (element: EditorElement, checked: boolean) => {
  if (!checked) {
    const event = new CustomEvent("addNewTab", { detail: { element } });
    window.dispatchEvent(event);
  }
};

export const onClickDefaultWindow = () => {
  const event = new CustomEvent("loadDefaultLayout");
  window.dispatchEvent(event);
};
