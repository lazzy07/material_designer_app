import { BrowserWindow } from "electron";
import * as Splashscreen from "@trodi/electron-splashscreen";

export class EditorScreen {
  private window: BrowserWindow | null = null;
  private url = "";
  constructor(url: string) {
    this.url = url;
  }

  createScreen() {
    this.window = new BrowserWindow({
      height: 600,
      width: 800,
      frame: false,
      transparent: true,
      webPreferences: {
        nodeIntegration: true
      }
    });

    this.window.loadURL(this.url + "?main");
    this.window.webContents.openDevTools({ mode: "detach" });
  }

  createScreenInitial = () => {
    const mainOptions: Electron.BrowserWindowConstructorOptions = {
      height: 600,
      width: 800,
      frame: false,
      transparent: true,
      webPreferences: {
        nodeIntegration: true
      }
    };
    const config: Splashscreen.Config = {
      windowOpts: mainOptions,
      templateUrl: `${__dirname}/loading/loading.html`,
      splashScreenOpts: {
        width: 600,
        height: 400
      }
    };

    this.window = Splashscreen.initSplashScreen(config);
    this.window.loadURL(this.url + "?main");
    this.window.webContents.openDevTools({ mode: "detach" });
  };
}
