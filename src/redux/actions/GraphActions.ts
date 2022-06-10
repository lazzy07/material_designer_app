import { Connection } from "./../../packages/rete-1.4.4/connection";
import { ipcRenderer } from "electron";
import { Graphs, GRAPH_TYPES } from "../../interfaces/Graphs";
import {
  PackageElement,
  PackageTreeElement,
} from "../../interfaces/PackageElement";
import { IpcMessages } from "../../IpcMessages";
import { Data, NodeData } from "../../packages/rete-1.4.4/core/data";
import { Action } from "../store";

export const CHANGE_GRAPHS = "change graphs";
export const EDIT_GRAPH_DATA = "edit graph data";
export const EDIT_GRAPH_NODE_DATA = "edit graph node data";
export const EDIT_KERNEL_DATA = "edit kernel data";
export const SET_KERNEL_ERROR = "set kernel error";

export const changeGraphData = (
  tree: PackageTreeElement[],
  packages: { [id: string]: PackageElement }
): Action => {
  return {
    type: CHANGE_GRAPHS,
    payload: {
      tree,
      packages,
    },
  };
};

export const editGraphData = (
  id: string,
  selectedType: GRAPH_TYPES,
  packageData: Data
): Action => {
  return {
    type: EDIT_GRAPH_DATA,
    payload: {
      id,
      selectedType,
      packageData,
    },
  };
};

export const editGraphNodeData = (
  id: string,
  selectedType: GRAPH_TYPES,
  data: NodeData,
  nodeId: number
): Action => {
  const update = {
    type: EDIT_GRAPH_NODE_DATA,
    payload: {
      id,
      selectedType,
      data,
      selectedNode: nodeId,
    },
  };

  ipcRenderer.send(IpcMessages.UPDATE_GRAPH, {
    updateType: "update",
    update: JSON.stringify(update),
    selectedGraphType: selectedType,
  });

  return update;
};

export const editKernelData = (
  id: string,
  type: string,
  update: string
): Action => {
  const action = {
    type: EDIT_KERNEL_DATA,
    payload: {
      id,
      update,
      type,
    },
  };

  ipcRenderer.send(IpcMessages.UPDATE_GRAPH, {
    updateType: "update",
    update: JSON.stringify({ update, type }),
    selectedGraphType: "kernelGraph",
  });

  return action;
};

export const setKernelError = (error: string): Action => {
  return {
    type: SET_KERNEL_ERROR,
    payload: error,
  };
};
