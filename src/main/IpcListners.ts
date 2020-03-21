import { ipcMain } from "electron";
import { IpcMessages } from "src/IpcMessages";
import { Screens } from "./main";

export const listenToMessages = (screens: Screens) => {
  ipcMain.on(IpcMessages.LOAD_LOGIN_PAGE, () => {
    screens.loginScreen.createScreen();
  });

  ipcMain.on(IpcMessages.LOAD_EDITOR_PAGE, () => {
    screens.editorScreen.createScreen();
  });

  ipcMain.on(IpcMessages.OPEN_PROJECT_PAGE, () => {
    screens.openProjectScreen.createScreen(screens.editorScreen);
  });

  ipcMain.on(IpcMessages.NEW_PROJECT_PAGE, () => {
    screens.newProjectScreen.createScreen(screens.editorScreen);
  });

  ipcMain.on(IpcMessages.SAVE_PROJECT_PAGE, () => {
    screens.saveProjectScreen.createScreen(screens.newProjectScreen);
  });
};
