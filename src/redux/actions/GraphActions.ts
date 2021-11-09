import { Graphs, GRAPH_TYPES } from "../../interfaces/Graphs";
import { PackageElement } from "../../interfaces/PackageElement";
import { Data, NodeData } from "../../packages/rete-1.4.4/core/data";
import { Action } from "../store";

export const CHANGE_GRAPHS = "change graphs";
export const EDIT_GRAPH_DATA = "edit graph data";
export const EDIT_GRAPH_NODE_DATA = "edit graph node data";

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
  console.log(packageData);
  return {
    type: EDIT_GRAPH_DATA,
    payload: {
      selectedType,
      packageData,
    },
  };
};

export const editGraphNodeData = (
  selectedType: GRAPH_TYPES,
  data: NodeData,
  nodeId: number
): Action => {
  return {
    type: EDIT_GRAPH_NODE_DATA,
    payload: {
      selectedType,
      data,
      nodeId,
    },
  };
};
