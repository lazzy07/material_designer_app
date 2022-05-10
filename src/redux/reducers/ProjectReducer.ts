import { Project } from "src/interfaces/Project";
import { initialProjectData } from "./../../renderer/project_data/InitialProjectData";
import { Action } from "./../store";
import {
  CHANGE_PROJECT_SETTING,
  OPEN_PROJECT,
} from "../actions/ProjectActions";
import { CHANGE_GRAPHS } from "../actions/GraphActions";

export interface ProjectReducer extends Project {
  modifiedAt: number;
  savedAt: number;
}

const initState: ProjectReducer = {
  ...initialProjectData(),
  modifiedAt: Date.now(),
  savedAt: Date.now(),
};

export const projectReducer = (
  state = initState,
  action: Action
): ProjectReducer => {
  switch (action.type) {
    case OPEN_PROJECT:
      return { ...action.payload };

    case CHANGE_GRAPHS:
      return {
        ...state,
        packages: { ...action.payload.packages },
        tree: [...action.payload.tree],
      };

    case CHANGE_PROJECT_SETTING:
      const settings = [...state.settings];

      if (action.payload.isDropdown) {
        settings[action.payload.index].data.value = action.payload.value;
      } else {
        settings[action.payload.index].data = action.payload.value;
      }

      return {
        ...state,
        settings,
      };

    default:
      return state;
  }
};
