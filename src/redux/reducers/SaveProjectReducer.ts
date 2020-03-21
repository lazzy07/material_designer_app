import { Action } from "../store";
import { SAVE_NEW_PROJECT_DATA } from "../actions/SaveProjectActions";

export interface SaveProject {
  localActive: boolean;
  cloudActive: boolean;
  filePath: string;
  fileName: string;
  description: string;
}

const initState: SaveProject = {
  localActive: false,
  cloudActive: false,
  fileName: "",
  filePath: "",
  description: ""
};

export const saveProjectReducer = (
  state = initState,
  action: Action
): SaveProject => {
  switch (action.type) {
    case SAVE_NEW_PROJECT_DATA:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};
