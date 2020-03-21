import { BrowserWindow } from "electron";
import { EditorScreen } from "./EditorScreen";

export class NewProjectScreen {
  private window: BrowserWindow | null = null;
  private url = "";
  constructor(url: string) {
    this.url = url;
  }

  createScreen(editorScreen: EditorScreen) {
    this.window = new BrowserWindow({
      parent: editorScreen.window!,
      width: 800,
      height: 550,
      modal: true,
      resizable: false,
      frame: false,
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    });
    this.window.webContents.openDevTools({ mode: "detach" });
    this.window.loadURL(this.url + "?newproject");

    this.window.once("ready-to-show", () => {
      this.window?.show();
    });
  }
}
