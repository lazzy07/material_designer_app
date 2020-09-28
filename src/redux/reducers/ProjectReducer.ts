import { Project } from "src/interfaces/Project";
import { initialProjectData } from "./../../renderer/project_data/InitialProjectData";
import { Action } from "./../store";
import { OPEN_PROJECT } from "../actions/ProjectActions";
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
        packages: action.payload,
      };

    default:
      return state;
  }
};
