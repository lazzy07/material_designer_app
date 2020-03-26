import { BrowserWindow } from "electron";
import { EditorScreen } from "./EditorScreen";
import { Config } from "golden-layout";

export class SubEditorScreen {
  window: BrowserWindow | null = null;
  private url = "";
  id: string = "";
  config: Config;

  constructor(id: string, url: string, config: Config) {
    this.url = url;
    this.id = id;
    this.config = config;
  }

  createScreen(editorScreen: EditorScreen) {
    this.window = new BrowserWindow({
      width: 700,
      height: 500,
      frame: false,
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    });
    this.window.webContents.on("did-frame-finish-load", () => {
      this.window!.webContents.openDevTools({ mode: "detach" });
    });

    this.window.loadURL(this.url + "?subeditor&" + this.id);

    this.window.once("ready-to-show", () => {
      this.window?.show();
    });
  }
}
