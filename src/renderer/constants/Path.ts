import { remote } from "electron";
import path from "path";
import { store } from "../../redux/store";

// TODO:: Add webguard

export const SAVE_DEFAULT_PATH = path.join(
  remote.app.getPath("documents"),
  "Matetrial Designer Projects"
);

export const LAST_SAVE_PATH = "lastSavePath";

export const APP_DATA_PATH = path.join(
  remote.app.getPath("appData"),
  "material_designer"
);

export const LOCAL_LIBRARY_PATH = path.join(APP_DATA_PATH, "library");

export const LOCAL_NODES_PATH = path.join(LOCAL_LIBRARY_PATH, "node");
export const LOCAL_TEXTURES_PATH = path.join(LOCAL_LIBRARY_PATH, "texture");
export const LOCAL_HDRIS_PATH = path.join(LOCAL_LIBRARY_PATH, "hdri");
export const LOCAL_UI_THEME_PATH = path.join(LOCAL_LIBRARY_PATH, "theme", "ui");
export const LOCAL_NODE_THEME_PATH = path.join(
  LOCAL_LIBRARY_PATH,
  "theme",
  "node"
);

export const PROJECT_LIBRARY_PATH = () =>
  store.getState().project.filePath
    ? path.join(store.getState().project.filePath, "library")
    : "";

export const PROJECT_TEXTURES_PATH = () =>
  store.getState().project.filePath
    ? path.join(store.getState().project.filePath, "library", "texture")
    : "";

export const PROJECT_HRIS_PATH = () =>
  store.getState().project.filePath
    ? path.join(store.getState().project.filePath, "library", "hdri")
    : "";

export const PROJECT_NODES_PATH = () =>
  store.getState().project.filePath
    ? path.join(store.getState().project.filePath, "library", "node")
    : "";
