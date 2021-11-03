import { Graphs, GRAPH_TYPES } from "../../interfaces/Graphs";
import { PackageElement } from "../../interfaces/PackageElement";
import { Data } from "../../packages/rete-1.4.4/core/data";
import { Action } from "../store";

export const CHANGE_GRAPHS = "change graphs";
export const EDIT_GRAPH_DATA = "edit graph data";
export const CHANGE_NODE_DATA = "change node data";

export const changeGraphData = (packages: PackageElement[]): Action => {
  return {
    type: CHANGE_GRAPHS,
    payload: [...packages],
  };
};

export const editGraphData = (
  selectedType: GRAPH_TYPES,
  packageData: Data
): Action => {
  return {
    type: EDIT_GRAPH_DATA,
    payload: {
      selectedType,
      packageData,
    },
  };
};

export const changeNodeData = (
  selectedNode: number,
  data: Graphs,
  graphType: GRAPH_TYPES = "dataGraph"
) => {
  return {
    type: CHANGE_NODE_DATA,
    payload: { selectedNode, data, graphType },
  };
};
