import { BrowserWindow } from "electron";
import { EditorScreen } from "./EditorScreen";

export class NewProjectScreen {
  window: BrowserWindow | null = null;
  private url = "";
  constructor(url: string) {
    this.url = url;
  }

  createScreen(editorScreen: EditorScreen) {
    this.window = new BrowserWindow({
      parent: editorScreen.window!,
      width: 800,
      height: 500,
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
    this.window.loadURL(this.url + "?newproject");

    this.window.once("ready-to-show", () => {
      this.window?.show();
    });
  }
}
