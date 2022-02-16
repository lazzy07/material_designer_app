import { ipcRenderer } from "electron";
import { Graphs, GRAPH_TYPES } from "../../interfaces/Graphs";
import { PackageElement } from "../../interfaces/PackageElement";
import { IpcMessages } from "../../IpcMessages";
import { Data, NodeData } from "../../packages/rete-1.4.4/core/data";
import { Action } from "../store";

export const CHANGE_GRAPHS = "change graphs";
export const EDIT_GRAPH_DATA = "edit graph data";
export const EDIT_GRAPH_NODE_DATA = "edit graph node data";
export const EDIT_KERNEL_DATA = "edit kernel data";

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

export const editGraphNodeData = (
  selectedType: GRAPH_TYPES,
  data: NodeData,
  nodeId: number
): Action => {
  const update = {
    type: EDIT_GRAPH_NODE_DATA,
    payload: {
      selectedType,
      data,
      selectedNode: nodeId,
    },
  };

  ipcRenderer.send(IpcMessages.UPDATE_GRAPH, {
    updateType: "update",
    update: JSON.stringify(update),
  });

  return update;
};

export const editKernelData = (type: string, update: string): Action => {
  const action = {
    type: EDIT_KERNEL_DATA,
    payload: {
      update,
      type,
    },
  };

  ipcRenderer.send(IpcMessages.UPDATE_GRAPH, {
    updateType: "update",
    update: JSON.stringify({ update, type }),
  });

  return action;
};
