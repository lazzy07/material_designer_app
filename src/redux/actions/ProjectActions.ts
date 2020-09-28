import { Project } from "../../interfaces/Project";
import { Action } from "../store";

export const OPEN_PROJECT = "open project";

export const openProject = (data: Project): Action => {
  const time = Date.now();

  return {
    type: OPEN_PROJECT,
    payload: {
      ...data,
      modifiedAt: time,
      savedAt: time,
    },
  };
};
