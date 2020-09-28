import { GraphPackage } from "../../interfaces/GraphPackage";
import { Action } from "../store";

export const CHANGE_GRAPHS = "change graphs";

export const changeGraphData = (packages: GraphPackage[]): Action => {
  return {
    type: CHANGE_GRAPHS,
    payload: packages,
  };
};
