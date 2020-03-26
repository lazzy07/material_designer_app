import { ipcMain } from "electron";
import { IpcMessages } from "../IpcMessages";
import { Screens } from "./main";
import { SubEditorScreen } from "./windows/SubEditorScreen";
import uuid from "uuid";
import { Config } from "golden-layout";

export const listenToMessages = (screens: Screens, url: string) => {
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

  ipcMain.on(IpcMessages.CLOSE_NEW_PROJECT_PAGE, () => {
    screens.newProjectScreen.window?.close();
  });

  ipcMain.on(IpcMessages.OPEN_SUB_EDITOR_PAGE, (event, arg) => {
    const id = uuid.v4();

    const layout: Config = {
      content: [
        {
          type: "row",
          content: []
        }
      ]
    };

    const newWindow = new SubEditorScreen(id, url, layout);
    screens.subEditorScreens.push(newWindow);
    newWindow.createScreen(screens.editorScreen);
  });
};
