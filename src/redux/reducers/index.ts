import { combineReducers } from "redux";
import { userReducer } from "./UserReducer";

export const rootReducer = combineReducers({
  user: userReducer
});
