import { OpenProjectScreen } from "./OpenProjectScreen";
import { BrowserWindow } from "electron";

export class NewProjectScreen {
  private window: BrowserWindow | null = null;
  private url = "";
  constructor(url: string) {
    this.url = url;
  }

  createScreen(openProjectScreen: OpenProjectScreen) {
    this.window = new BrowserWindow({
      parent: openProjectScreen.window!,
      width: 800,
      height: 500,
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
