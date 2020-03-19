import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "../serviceWorker";
import { Titlebar, Color } from "custom-electron-titlebar";
import { colors } from "./constants/Colors";
import { Provider } from "react-redux";
import { rendererStore } from "../redux/store";
import LoginHot from "./LoginHot";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/index.scss";
import "./scss/app.scss";
import { Titleb } from "./titlebars/Titleb";
import { EditorMenu } from "./menus/EditorMenu";

let titlebar: Titleb;

console.log(
  '👋 This message is being logged by "renderer.tsx", included via webpack'
);

const windowType = window.location.href.split("?")[1];
let element: any;
switch (windowType) {
  case "main":
    titlebar = new Titleb({
      icon: "/main_window/dependencies/img/icon_32x32.png"
    });
    element = <App />;
    const em = new EditorMenu();
    const menu = em.buildMenu();
    titlebar.setMenu(menu);
    break;
  case "login":
    titlebar = new Titleb({
      icon: "/main_window/dependencies/img/icon_32x32.png",
      menu: null,
      maximizable: false,
      titleHorizontalAlignment: "center"
    });
    titlebar.getTitlebar().updateTitle("Login - Material Designer");

    element = <LoginHot />;
    break;
  case "openproject":
    titlebar = new Titleb({
      icon: "/main_window/dependencies/img/icon_32x32.png",
      menu: null,
      maximizable: false,
      titleHorizontalAlignment: "center"
    });
    titlebar.getTitlebar().updateTitle("Open Project");
}

ReactDOM.render(
  <Provider store={rendererStore()}>{element}</Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

export { titlebar };
