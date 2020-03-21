import { BrowserWindow } from "electron";
import * as Splashscreen from "@trodi/electron-splashscreen";
import { screens } from "../main";

export class EditorScreen {
  window: BrowserWindow | null = null;
  private url = "";

  private mainOptions: Electron.BrowserWindowConstructorOptions = {
    height: 600,
    width: 800,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true
    }
  };

  constructor(url: string) {
    this.url = url;
  }

  createScreen() {
    this.window = new BrowserWindow(this.mainOptions);
    this.window.maximize();
    this.window.loadURL(this.url + "?main");
    this.window.webContents.openDevTools({ mode: "detach" });
  }

  createScreenInitial = () => {
    const config: Splashscreen.Config = {
      windowOpts: this.mainOptions,
      templateUrl: `${__dirname}/loading/loading.html`,
      splashScreenOpts: {
        width: 500,
        height: 360,
        backgroundColor: "#20292b"
      }
    };
    this.window = Splashscreen.initSplashScreen(config);
    this.window.maximize();
    this.window.loadURL(this.url + "?main");

    this.window.webContents.on("did-frame-finish-load", () => {
      this.window!.webContents.openDevTools({ mode: "detach" });
    });

    this.window.on("ready-to-show", () => {
      screens.openProjectScreen.createScreen(this);
    });
  };
}
