import { BrowserWindow } from "electron";
import { NewProjectScreen } from "./NewProjectScreen";

export class SaveProjectScreen {
  private window: BrowserWindow | null = null;
  private url = "";
  constructor(url: string) {
    this.url = url;
  }

  createScreen(newProjectScreen: NewProjectScreen) {
    this.window = new BrowserWindow({
      parent: newProjectScreen.window!,
      width: 600,
      height: 200,
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
    this.window.loadURL(this.url + "?saveproject");

    this.window.once("ready-to-show", () => {
      this.window?.show();
    });
  }
}
