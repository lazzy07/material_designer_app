import { remote } from "electron";
import path from "path";

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

export const LOCAL_TEXTURES_PATH = path.join(LOCAL_LIBRARY_PATH, "textures");

export const LOCAL_TEXTURE_DATA_FILE = path.join(
  LOCAL_LIBRARY_PATH,
  "texture.matdll"
);
