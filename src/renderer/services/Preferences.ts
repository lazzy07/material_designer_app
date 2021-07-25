import {
  setDeveloperSettings,
  setGraphSettings,
} from "../../redux/actions/PreferencesActions";
import { store } from "../../redux/store";
import { IS_WEB } from "./Webguard";

export class Preferences {
  static initPreferences = () => {
    Preferences.initDeveloperPreferences();
    Preferences.initGraphPreferences();
  };

  private static initGraphPreferences = () => {
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

  private static initDeveloperPreferences = () => {
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
}
