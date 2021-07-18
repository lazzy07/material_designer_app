import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/index.scss";
import "./scss/app.scss";
import "animate.css/animate.min.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "../serviceWorker";
import { Provider } from "react-redux";
import { rendererStore } from "../redux/store";
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
import ThemeScreenHot from "./ThemeScreenHot";

let titlebar: Titleb;

console.log(
  '👋 This message is being logged by "renderer.tsx", included via webpack'
);
const lastPart = window.location.href.split("?")[1];
const windowType = lastPart.split("&")[0];
const id = lastPart.split("&")[1];
let element: any;

const em = new EditorMenu();
const menu = em.buildMenu();

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
    // console.log(id);
    // titlebar.setMenu(menu);
    remote.getCurrentWindow().on("close", () => {
      ElementsToLocalStorage.removeData(id);
      ipcRenderer.send(IpcMessages.UPDATE_TITLEBAR);
    });
    element = <App />;
    break;

  case "theme":
    titlebar = new Titleb({
      icon: getStaticPath("/dependencies/img/icon_32x32.png"),
      menu: null,
      closeable: false,
      maximizable: false,
      titleHorizontalAlignment: "center",
      minimizable: false,
    });
    titlebar.getTitlebar().updateTitle("Theme Manager");
    element = <ThemeScreenHot />;
    break;
}

const rStore = rendererStore();

const render = () =>
  ReactDOM.render(
    <AppContainer>
      <Provider store={rStore}>{<div>{element}</div>}</Provider>
    </AppContainer>,
    document.getElementById("root")
  );

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

export { titlebar, rStore };
