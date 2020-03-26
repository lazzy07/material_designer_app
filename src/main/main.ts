import { app, BrowserWindow, ipcMain } from "electron";
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;
import { mainStore } from "../redux/store";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} from "electron-devtools-installer";
import { listenToMessages } from "./IpcListners";
import { EditorScreen } from "./windows/EditorScreen";
import { LoginScreen } from "./windows/LoginScreen";
import { OpenProjectScreen } from "./windows/OpenProjectScreen";
import { NewProjectScreen } from "./windows/NewProjectScreen";
import { SaveProjectScreen } from "./windows/SaveProjectScreen";
import fs from "fs";
import { SAVE_DEFAULT_PATH } from "../common_constants/path";
import { SubEditorScreen } from "./windows/SubEditorScreen";

let store: any;

export interface Screens {
  editorScreen: EditorScreen;
  loginScreen: LoginScreen;
  openProjectScreen: OpenProjectScreen;
  newProjectScreen: NewProjectScreen;
  saveProjectScreen: SaveProjectScreen;
  subEditorScreens: SubEditorScreen[];
}

export const screens: Screens = {
  editorScreen: new EditorScreen(MAIN_WINDOW_WEBPACK_ENTRY),
  loginScreen: new LoginScreen(MAIN_WINDOW_WEBPACK_ENTRY),
  openProjectScreen: new OpenProjectScreen(MAIN_WINDOW_WEBPACK_ENTRY),
  newProjectScreen: new NewProjectScreen(MAIN_WINDOW_WEBPACK_ENTRY),
  saveProjectScreen: new SaveProjectScreen(MAIN_WINDOW_WEBPACK_ENTRY),
  subEditorScreens: []
};

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createStore = () => {
  store = mainStore();
};

const inititlaizeApp = () => {
  console.log("Current environment: " + process.env.NODE_ENV);
  screens.editorScreen.createScreenInitial();
};

app.on("ready", () => {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log("An error occurred: ", err));

  installExtension(REDUX_DEVTOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log("An error occurred: ", err));

  try {
    const path = SAVE_DEFAULT_PATH;
    const exists = fs.existsSync(path);

    if (!exists) {
      console.log("SAVE_DEFAULT_PATH created");
      fs.mkdirSync(path);
    }
  } catch (err) {
    console.log(err);
  }

  createStore();
  inititlaizeApp();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    inititlaizeApp();
  }
});

listenToMessages(screens, MAIN_WINDOW_WEBPACK_ENTRY);

export { store };
