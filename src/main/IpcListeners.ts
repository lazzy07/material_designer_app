import { ipcMain } from "electron";
import { IpcMessages } from "../IpcMessages";
import { Screens, store } from "./main";
import { SubEditorScreen } from "./windows/SubEditorScreen";
import { DraggableItem } from "../interfaces/DraggableItem";
import { Store } from "../redux/reducers";
import MatdV8 from "./workers/MatdV8";

let draggingData: DraggableItem<any> | null = null;
let colorRef: Electron.IpcMainEvent | null = null;
let colorId = "";

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

  ipcMain.on(IpcMessages.OPEN_PREFERENCES_SCREEN, () => {
    screens.preferencesScreen.createScreen(screens.editorScreen);
  });

  ipcMain.on(IpcMessages.OPEN_COLORPICKER, (emitter, data) => {
    let screen: any;
    colorRef = emitter;
    colorId = data.id;
    if (data.window === "editor") {
      screen = screens.editorScreen;
    } else if (data.window === "preferences") {
      screen = screens.preferencesScreen;
    }
    screens.colorPickerScreen.color = data.color;
    screens.colorPickerScreen.createScreen(screen);
  });

  ipcMain.on(IpcMessages.SET_COLORPICKER_DATA, (_, data) => {
    if (colorRef) {
      colorRef?.sender.send("color_picker" + colorId, data);
    }
  });

  ipcMain.on(IpcMessages.DRAG_START, (_, data: DraggableItem<any>) => {
    draggingData = data;
  });

  ipcMain.on(IpcMessages.GET_DRAG_DATA, (event, _) => {
    event.sender.send(IpcMessages.DRAG_DATA, draggingData);
  });

  ipcMain.on(IpcMessages.OPEN_NEW_PROJECT, (_, data) => {
    console.log(data);
    MatdV8.openMaterialProject(data);
  });

  ipcMain.on(IpcMessages.UPDATE_PROJECT, (_) => {
    const state: Store = store.getState();
    const project = JSON.stringify(state.project);
    console.log(project);

    MatdV8.updateMaterialProject(project);
  });

  ipcMain.on(IpcMessages.UPDATE_GRAPH, (_, data) => {
    console.log(data.updateType, data.update);
    MatdV8.updateMaterialGraph(data.updateType, data.update);
  });

  ipcMain.on(IpcMessages.SELECT_CURRENT_GRAPH, (_, data) => {
    console.log(data);
    MatdV8.selectCurrentMaterialGraph(JSON.stringify(data));
  });
};
