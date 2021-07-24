import { IS_WEB } from "../services/Webguard";
import DeveloperSettings, { setDeveloperSettings } from "./DeveloperSettings";
import GraphSettings from "./GraphSettings";

export default class Settings {
  static initSettings = () => {
    Settings.initDeveloperSettings();
    Settings.initGraphSettings();
  };

  private static initDeveloperSettings = () => {
    if (IS_WEB) {
      //TODO:: Add web functionality
    } else {
      const developerSettings = localStorage.getItem("developerSettings");
      if (developerSettings) {
        const jsonDevSettings = JSON.parse(developerSettings);
        setDeveloperSettings(jsonDevSettings);
      }
    }
  };

  private static initGraphSettings = () => {
    if (IS_WEB) {
      //TODO:: Add web functionality
    } else {
      const graphSettings = localStorage.getItem("graphSettings");
      if (graphSettings) {
        const jsonDevSettings = JSON.parse(graphSettings);
        DeveloperSettings.developerMode = jsonDevSettings.developerMode;
      }
    }
  };

  static saveSettings = () => {
    const str = JSON.stringify(DeveloperSettings);
    localStorage.setItem("developerSettings", str);

    Settings.setTransformPos();
    const str2 = JSON.stringify(GraphSettings);
    localStorage.setItem("graphSettings", str2);
  };

  private static setTransformPos = () => {
    const data = {
      x: -GraphSettings.canvasSize.x / 4,
      y: -GraphSettings.canvasSize.y / 4,
      k: 0.5,
    };

    GraphSettings.startTransformPos = data;
  };
}
