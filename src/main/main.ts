import { Store } from "./../redux/reducers/index";
import { app, BrowserWindow, ipcMain, session } from "electron";
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;
import { mainStore } from "../redux/store";
import installExtension from "electron-devtools-installer";
import { listenToMessages } from "./IpcListeners";
import { EditorScreen } from "./windows/EditorScreen";
import { LoginScreen } from "./windows/LoginScreen";
import { OpenProjectScreen } from "./windows/OpenProjectScreen";
import { NewProjectScreen } from "./windows/NewProjectScreen";
import { SaveProjectScreen } from "./windows/SaveProjectScreen";
import fs from "fs";
import { SAVE_DEFAULT_PATH } from "../common_constants/path";
import { SubEditorScreen } from "./windows/SubEditorScreen";
import { ImportScreen } from "./windows/ImportScreen";
import Path from "path";
import { PreferencesScreen } from "./windows/PreferencesScreen";
import { ColorPickerScreen } from "./windows/ColorPicker";
import MatdV8 from "./workers/MatdV8";

let store: any;
app.allowRendererProcessReuse = false;
export interface Screens {
  editorScreen: EditorScreen;
  loginScreen: LoginScreen;
  openProjectScreen: OpenProjectScreen;
  newProjectScreen: NewProjectScreen;
  saveProjectScreen: SaveProjectScreen;
  subEditorScreens: SubEditorScreen[];
  importScreen: ImportScreen;
  preferencesScreen: PreferencesScreen;
  colorPickerScreen: ColorPickerScreen;
}

export const screens: Screens = {
  editorScreen: new EditorScreen(MAIN_WINDOW_WEBPACK_ENTRY),
  loginScreen: new LoginScreen(MAIN_WINDOW_WEBPACK_ENTRY),
  openProjectScreen: new OpenProjectScreen(MAIN_WINDOW_WEBPACK_ENTRY),
  newProjectScreen: new NewProjectScreen(MAIN_WINDOW_WEBPACK_ENTRY),
  saveProjectScreen: new SaveProjectScreen(MAIN_WINDOW_WEBPACK_ENTRY),
  subEditorScreens: [],
  importScreen: new ImportScreen(MAIN_WINDOW_WEBPACK_ENTRY),
  preferencesScreen: new PreferencesScreen(MAIN_WINDOW_WEBPACK_ENTRY),
  colorPickerScreen: new ColorPickerScreen(MAIN_WINDOW_WEBPACK_ENTRY),
};

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createStore = () => {
  store = mainStore();
};

const initializeApp = () => {
  console.log("Current environment: " + process.env.NODE_ENV);
  screens.editorScreen.createScreenInitial();

  try {
    MatdV8.init(
      "C:/personal/projects/material_designer/material_designer_library_alpha/bin/Windows/x64/Debug/matd_v8_bindings.node"
    );
    let state: Store = store.getState();
    MatdV8.openMaterialProject(JSON.stringify(state.project));
  } catch (err) {
    console.log(err);
  }
};

app.on("ready", async () => {
  // installExtension(REACT_DEVELOPER_TOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log("An error occurred: ", err));

  // installExtension(REDUX_DEVTOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log("An error occurred: ", err));

  const reduxDevToolsPath = "lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.2_0";

  try {
    //installExtension(reduxDevToolsPath);
  } catch (err) {
    console.log(err);
  }

  try {
    const path = SAVE_DEFAULT_PATH;
    const exists = fs.existsSync(path);

    if (!exists) {
      console.log("SAVE_DEFAULT_PATH created");
      fs.mkdirSync(path);
    }

    const libPath = Path.join(
      app.getPath("appData"),
      "material_designer",
      "library",
      "node"
    );

    const src = Path.join(__dirname, "node");
    const files = fs.readdirSync(src);
    const nodePathExists = fs.existsSync(libPath);

    if (!nodePathExists) fs.mkdirSync(libPath);
    for (const filePath of files) {
      fs.copyFile(
        Path.join(src, filePath),
        Path.join(libPath, filePath),
        (err) => {
          //TODO:: Handle error
          console.log(err);
        }
      );
    }
  } catch (err) {
    //TODO: Handle Error
    console.log(err);
  }

  createStore();
  initializeApp();
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
    initializeApp();
  }
});

listenToMessages(screens, MAIN_WINDOW_WEBPACK_ENTRY);

export { store };
