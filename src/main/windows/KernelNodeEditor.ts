import { BrowserWindow } from "electron";
import { EditorScreen } from "./EditorScreen";

export class KernelNodeEditor {
  window: BrowserWindow | null = null;
  private url = "";
  constructor(url: string) {
    this.url = url;
  }

  createScreen() {
    this.window = new BrowserWindow({
      width: 950,
      height: 700,
      minWidth: 600,
      minHeight: 400,
      modal: false,
      resizable: true,
      frame: false,
      show: false,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
      },
    });
    this.window.webContents.on("did-frame-finish-load", () => {
      this.window!.webContents.openDevTools({ mode: "detach" });
    });
    this.window.loadURL(this.url + "?kernelnodeeditor");

    this.window.once("ready-to-show", () => {
      this.window?.show();
    });
  }
}
