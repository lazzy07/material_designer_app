import { Graphs, GRAPH_TYPES } from "../../interfaces/Graphs";
import { PackageElement } from "../../interfaces/PackageElement";
import { Action } from "../store";

export const CHANGE_GRAPHS = "change graphs";
export const EDIT_GRAPH_DATA = "edit graph data";

export const changeGraphData = (packages: PackageElement[]): Action => {
  return {
    type: CHANGE_GRAPHS,
    payload: [...packages],
  };
};

export const editGraphData = (
  packageId: string,
  selectedType: GRAPH_TYPES,
  packageData: Graphs
): Action => {
  return {
    type: EDIT_GRAPH_DATA,
    payload: {
      packageId,
      selectedType,
      packageData,
    },
  };
};
