import { BrowserWindow } from "electron";
import { EditorScreen } from "./EditorScreen";

export class ImportScreen {
  window: BrowserWindow | null = null;
  private url = "";
  constructor(url: string) {
    this.url = url;
  }

  createScreen(editorScreen: EditorScreen) {
    this.window = new BrowserWindow({
      parent: editorScreen.window!,
      width: 700,
      height: 600,
      modal: true,
      resizable: false,
      frame: false,
      show: false,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false
      }
    });
    this.window.webContents.on("did-frame-finish-load", () => {
      this.window!.webContents.openDevTools({ mode: "detach" });
    });
    this.window.loadURL(this.url + "?import");

    this.window.once("ready-to-show", () => {
      this.window?.show();
    });
  }
}
