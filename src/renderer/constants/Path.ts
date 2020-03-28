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
