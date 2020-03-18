import { ipcMain } from "electron";
import { IpcMessages } from "src/IpcMessages";
import { LoginScreen } from "./windows/LoginScreen";
import { EditorScreen } from "./windows/EditorScreen";

export const listenToMessages = (url: string) => {
  ipcMain.on(IpcMessages.LOAD_LOGIN_PAGE, () => {
    const loginScreen = new LoginScreen(url);
    loginScreen.createScreen();
  });

  ipcMain.on(IpcMessages.LOAD_EDITOR_PAGE, () => {
    const editorScreen = new EditorScreen(url);
    editorScreen.createScreen();
  });
};
