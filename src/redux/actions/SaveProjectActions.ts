import { Action } from "../store";

export const SAVE_NEW_PROJECT_DATA = "save project data";

export const saveNewProjectData = (data: any): Action => {
  return {
    type: SAVE_NEW_PROJECT_DATA,
    payload: data
  };
};
