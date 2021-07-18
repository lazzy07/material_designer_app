import { ipcMain } from "electron";
import { IpcMessages } from "../IpcMessages";
import { Screens } from "./main";
import { SubEditorScreen } from "./windows/SubEditorScreen";
import { DraggableItem } from "../interfaces/DraggableItem";
import NodeLibrary from "./workers/NodeLibrary";

let draggingData: DraggableItem<any> | null = null;

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

  ipcMain.on(IpcMessages.OPEN_SUB_EDITOR_PAGE, (_, arg) => {
    const newWindow = new SubEditorScreen(arg.id, url, arg.layout);
    screens.subEditorScreens.push(newWindow);
    newWindow.createScreen(screens.editorScreen);
  });

  ipcMain.on(IpcMessages.SUB_EDITOR_TO_MAIN, (_, arg) => {
    screens.editorScreen.window?.webContents.send(
      IpcMessages.SUB_DATA_TO_MAIN,
      arg
    );
  });

  ipcMain.on(IpcMessages.UPDATE_TITLEBAR, () => {
    screens.editorScreen.window?.webContents.send(IpcMessages.UPDATE_TITLEBAR);
  });

  ipcMain.on(IpcMessages.CLOSE_ALL_SUB_EDITORS, () => {
    for (let i of screens.subEditorScreens) {
      i.window?.close();
    }

    screens.subEditorScreens = [];
  });

  ipcMain.on(IpcMessages.OPEN_IMPORT_SCREEN, () => {
    screens.importScreen.createScreen(screens.editorScreen);
  });

  ipcMain.on(IpcMessages.OPEN_THEME_SCREEN, () => {
    screens.themeScreen.createScreen(screens.editorScreen);
  });

  ipcMain.on(IpcMessages.DRAG_START, (_, data: DraggableItem<any>) => {
    draggingData = data;
  });

  ipcMain.on(IpcMessages.GET_DRAG_DATA, (event, _) => {
    event.sender.send(IpcMessages.DRAG_DATA, draggingData);
  });

  ipcMain.on(IpcMessages.LOAD_LOCAL_LIBRARY_NODES, (_, data) => {
    const library = new NodeLibrary();
    library.loadLocalNodeLibrary(data);
  });

  ipcMain.on(IpcMessages.LOAD_LOCAL_PROJECT_NODES, (_, data) => {
    const library = new NodeLibrary();
    if (data) {
      library.loadProjectNodeLibrary(data);
    }
  });

  ipcMain.on(IpcMessages.GET_ALL_LOCAL_NODE_DATA, (event) => {
    const library = new NodeLibrary();
    event.sender.send(IpcMessages.RETURN_GET_ALL_LOCAL_NODE_DATA, {
      library: library.getLibraryNodes(),
      project: library.getProjectNodes(),
    });
  });
};
