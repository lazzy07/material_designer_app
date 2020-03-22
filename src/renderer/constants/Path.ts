import { remote } from "electron";
import path from "path";

export const SAVE_DEFAULT_PATH = path.join(
  remote.app.getPath("documents"),
  "Matetrial Designer Projects"
);

export const LAST_SAVE_PATH = "lastSavePath";
