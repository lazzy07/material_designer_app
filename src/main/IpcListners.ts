import { ipcMain } from "electron";
import { IpcMessages } from "src/IpcMessages";
import { LoginScreen } from "./windows/LoginScreen";

export const listenToMessages = (url: string) => {
  ipcMain.on(IpcMessages.LOAD_LOGIN_PAGE, () => {
    new LoginScreen(url);
  });
};
