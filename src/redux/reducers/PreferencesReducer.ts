import { DeveloperSettings } from "../../interfaces/DeveloperSettings";
import { GraphSettings } from "../../interfaces/GraphSettings";
import {
  SET_DEVELOPER_SETTINGS,
  SET_GRAPH_SETTINGS,
} from "../actions/PreferencesActions";
import { Action } from "../store";

export interface PreferencesReducer {
  graphSettings: GraphSettings;
  developerSettings: DeveloperSettings;
}

const initPreferences: PreferencesReducer = {
  graphSettings: {
    graphConnectionCurvature: 0.4,
    graphConnectionStrokeWidth: 2,
    canvasSize: { x: 1000000, y: 1000000 },
    startTransformPos: {
      x: -1000000 / 4,
      y: -1000000 / 4,
      k: 0.5,
    },
    mouseControllerType: "mouse",
  },
  developerSettings: {
    developerMode: false,
  },
};

export const preferencesReducer = (
  state = initPreferences,
  action: Action
): PreferencesReducer => {
  switch (action.type) {
    case SET_GRAPH_SETTINGS:
      return {
        ...state,
        graphSettings: {
          ...action.payload,
        },
      };

    case SET_DEVELOPER_SETTINGS:
      return {
        ...state,
        developerSettings: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
