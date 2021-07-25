import {
  setGraphSettings,
  setDeveloperSettings,
} from "../../redux/actions/PreferencesActions";
import { store } from "../../redux/store";
import { IS_WEB } from "../services/Webguard";

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
        store.dispatch(setDeveloperSettings(jsonDevSettings));
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
        store.dispatch(setGraphSettings(jsonDevSettings));
      }
    }
  };

  static saveSettings = () => {
    const str = JSON.stringify(store.getState().preferences.developerSettings);
    localStorage.setItem("developerSettings", str);

    const str2 = JSON.stringify(store.getState().preferences.graphSettings);
    localStorage.setItem("graphSettings", str2);
  };
}
