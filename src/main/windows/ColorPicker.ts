import { BrowserWindow } from "electron";
import { EditorScreen } from "./EditorScreen";
import { PreferencesScreen } from "./PreferencesScreen";

export class ColorPickerScreen {
  window: BrowserWindow | null = null;
  private url = "";
  constructor(url: string) {
    this.url = url;
  }

  createScreen(screen: EditorScreen | PreferencesScreen) {
    this.window = new BrowserWindow({
      parent: screen.window!,
      width: 500,
      height: 350,
      modal: true,
      resizable: false,
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
    this.window.loadURL(this.url + "?colorpicker");

    this.window.once("ready-to-show", () => {
      this.window?.show();
    });
  }
}
