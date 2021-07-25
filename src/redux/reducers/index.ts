import { combineReducers } from "redux";
import { userReducer, UserReducer } from "./UserReducer";
import { saveProjectReducer, SaveProject } from "./SaveProjectReducer";
import { projectReducer, ProjectReducer } from "./ProjectReducer";
import { SystemReducer, systemReducer } from "./SystemReducer";
import { preferencesReducer, PreferencesReducer } from "./PreferencesReducer";

export interface Store {
  user: UserReducer;
  saveProject: SaveProject;
  project: ProjectReducer;
  system: SystemReducer;
  preferences: PreferencesReducer;
}

export const rootReducer = combineReducers({
  user: userReducer,
  saveProject: saveProjectReducer,
  project: projectReducer,
  system: systemReducer,
  preferences: preferencesReducer,
});
