import { combineReducers } from "redux";
import { userReducer, UserReducer } from "./UserReducer";
import { saveProjectReducer, SaveProject } from "./SaveProjectReducer";

export interface Store {
  user: UserReducer;
  saveProject: SaveProject;
}

export const rootReducer = combineReducers({
  user: userReducer,
  saveProject: saveProjectReducer
});
