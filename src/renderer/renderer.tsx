import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/index.scss";
import "./scss/app.scss";
import "animate.css/animate.min.css";
import "./scss/overridecolors.scss";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "../serviceWorker";
import { Provider } from "react-redux";
import { rendererStore, store } from "../redux/store";
import LoginHot from "./LoginHot";
import { Titleb } from "./titlebars/Titleb";
import { EditorMenu } from "./menus/EditorMenu";
import OpenProjectHot from "./OpenProjectHot";
import { getStaticPath } from "./services/StaticAssetResolver";
import { AppContainer } from "react-hot-loader";
import NewProjectHot from "./NewProjectHot";
import SaveProjectHot from "./SaveProjectHot";
import { remote, ipcRenderer } from "electron";
import { ElementsToLocalStorage } from "../EditorElements/ElementsToLocalStorage";
import { IpcMessages } from "../IpcMessages";
import ImportHot from "./ImportHot";
import PreferencesScreenHot from "./PreferencesScreenHot";
import ColorPickerHot from "./ColorPickerHot";
import { ThemeManager } from "./constants/Colors";
import Settings from "./settings/Settings";

let titlebar: Titleb;
const lastPart = window.location.href.split("?")[1];
const windowType = lastPart.split("&")[0];
const id = lastPart.split("&")[1];
let element: any;

const em = new EditorMenu();
const menu = em.buildMenu();
ThemeManager.initTheme();

switch (windowType) {
  case "main":
    titlebar = new Titleb({
      icon: getStaticPath("/dependencies/img/icon_32x32.png"),
      shadow: false,
    });
    element = (
      <div>
        <App />
      </div>
    );

    titlebar.setMenu(menu);
    titlebar.startListenUpdateMenu();
    break;
  case "login":
    titlebar = new Titleb({
      icon: getStaticPath("/dependencies/img/icon_32x32.png"),
      menu: null,
      maximizable: false,
      titleHorizontalAlignment: "center",
    });
    titlebar.getTitlebar().updateTitle("Login - Material Designer");

    element = <LoginHot />;
    break;
  case "openproject":
    titlebar = new Titleb({
      icon: getStaticPath("/dependencies/img/icon_32x32.png"),
      menu: null,
      maximizable: false,
      titleHorizontalAlignment: "center",
      minimizable: false,
    });
    titlebar.getTitlebar().updateTitle("Open Project");
    element = <OpenProjectHot />;
    break;

  case "newproject":
    titlebar = new Titleb({
      icon: getStaticPath("/dependencies/img/icon_32x32.png"),
      menu: null,
      maximizable: false,
      titleHorizontalAlignment: "center",
      minimizable: false,
    });
    titlebar.getTitlebar().updateTitle("New Project");
    element = <NewProjectHot />;
    break;

  case "import":
    titlebar = new Titleb({
      icon: getStaticPath("/dependencies/img/icon_32x32.png"),
      menu: null,
      maximizable: false,
      titleHorizontalAlignment: "center",
      minimizable: false,
    });
    titlebar.getTitlebar().updateTitle("Import Assets - Material designer");
    element = <ImportHot />;
    break;

  case "saveproject":
    titlebar = new Titleb({
      icon: getStaticPath("/dependencies/img/icon_32x32.png"),
      menu: null,
      closeable: false,
      maximizable: false,
      titleHorizontalAlignment: "center",
      minimizable: false,
    });
    titlebar.getTitlebar().updateTitle("Save Project");
    element = <SaveProjectHot />;
    break;
  case "subeditor":
    titlebar = new Titleb({
      icon: getStaticPath("/dependencies/img/icon_32x32.png"),
      menu: null,
      titleHorizontalAlignment: "center",
    });
    remote.getCurrentWindow().on("close", () => {
      ElementsToLocalStorage.removeData(id);
      ipcRenderer.send(IpcMessages.UPDATE_TITLEBAR);
    });
    element = <App />;
    break;

  case "preferences":
    titlebar = new Titleb({
      icon: getStaticPath("/dependencies/img/icon_32x32.png"),
      menu: null,
      closeable: true,
      maximizable: false,
      titleHorizontalAlignment: "center",
      minimizable: false,
    });
    titlebar.getTitlebar().updateTitle("Preferences Manager");
    element = <PreferencesScreenHot />;
    break;
  case "colorpicker":
    const color = window.location.href.split("?")[2];
    titlebar = new Titleb({
      icon: getStaticPath("/dependencies/img/icon_32x32.png"),
      menu: null,
      closeable: true,
      maximizable: false,
      titleHorizontalAlignment: "center",
      minimizable: false,
    });
    titlebar.getTitlebar().updateTitle("Color Picker");
    element = <ColorPickerHot color={color} />;
    break;
}

const rStore = rendererStore();
Settings.initSettings();
const render = () =>
  ReactDOM.render(
    <AppContainer>
      <Provider store={rStore}>{<div>{element}</div>}</Provider>
    </AppContainer>,
    document.getElementById("root")
  );

render();

serviceWorker.register();

export { titlebar, rStore };
