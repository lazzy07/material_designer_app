import { PackageElement } from "../../interfaces/PackageElement";
import { Action } from "../store";

export const CHANGE_GRAPHS = "change graphs";

export const changeGraphData = (packages: PackageElement[]): Action => {
  return {
    type: CHANGE_GRAPHS,
    payload: [...packages],
  };
};
