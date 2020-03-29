import { BrowserWindow } from "electron";

export class LoginScreen {
  private window: BrowserWindow | null = null;
  private url = "";
  constructor(url: string) {
    this.url = url;
  }

  createScreen() {
    this.window = new BrowserWindow({
      width: 800,
      height: 500,
      resizable: false,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false
      }
    });
    this.window.webContents.on("did-frame-finish-load", () => {
      this.window!.webContents.openDevTools({ mode: "detach" });
    });
    this.window.loadURL(this.url + "?login");
  }
}
