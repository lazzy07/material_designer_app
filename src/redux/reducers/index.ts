import { combineReducers } from "redux";
import { userReducer, UserReducer } from "./UserReducer";
import { saveProjectReducer, SaveProject } from "./SaveProjectReducer";
import { projectReducer, ProjectReducer } from "./ProjectReducer";

export interface Store {
  user: UserReducer;
  saveProject: SaveProject;
  project: ProjectReducer;
}

export const rootReducer = combineReducers({
  user: userReducer,
  saveProject: saveProjectReducer,
  project: projectReducer
});
