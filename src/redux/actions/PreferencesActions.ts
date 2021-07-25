import { DeveloperSettings } from "../../interfaces/DeveloperSettings";
import { GraphSettings } from "../../interfaces/GraphSettings";

export const SET_GRAPH_SETTINGS = "set graph settings";
export const SET_DEVELOPER_SETTINGS = "set developer settings";

export const setGraphSettings = (settings: GraphSettings) => {
  const edited = {
    ...settings,
  };

  const data = {
    x: -settings.canvasSize.x / 4,
    y: -settings.canvasSize.y / 4,
    k: 0.5,
  };

  edited.startTransformPos = data;

  return {
    type: SET_GRAPH_SETTINGS,
    payload: edited,
  };
};

export const setDeveloperSettings = (data: DeveloperSettings) => {
  return {
    action: SET_DEVELOPER_SETTINGS,
    payload: data,
  };
};
