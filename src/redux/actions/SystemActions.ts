import { ImportTypes } from "../../renderer/services/ImportImageData";
import { v4 } from "uuid";
import { Graphs, GRAPH_TYPES } from "../../interfaces/Graphs";

export const SET_IMPORT_FILES = "set import files";
export const SET_SELECTED = "set selected";
export const SET_SELECTED_NODE = "set selected node";
export const SET_PREVIEW_NODE = "set preview node";
export const SET_SELECTED_GRAPH_DATA = "set selected graph data";
export const SAVE_SELECTED_GRAPH_DATA = "save selected graph data";

export const setImportFiles = (type: ImportTypes, files: File[]) => {
  return {
    type: SET_IMPORT_FILES,
    payload: {
      type,
      assets: files.map((ele) => ({
        id: v4(),
        filePath: ele.path,
        fileName: ele.name.split(".")[0],
        selected: true,
        isWeb: false,
        isLocal: true,
        activeType: "inactive",
      })),
    },
  };
};

export const setSelected = (graphType: GRAPH_TYPES, graphId: string) => {
  return {
    type: SET_SELECTED,
    payload: {
      id: graphId,
      graphType,
    },
  };
};

export const setSelectedGraphData = (data: any) => {
  return {
    type: SET_SELECTED_GRAPH_DATA,
    payload: data,
  };
};

export const setSelectedNode = (
  nodeId: number,
  graphId: string,
  graphType: GRAPH_TYPES
) => {
  return {
    type: SET_SELECTED_NODE,
    payload: {
      nodeId,
      graphId,
      graphType,
    },
  };
};

export const setPreviewNode = (id: string) => {
  return {
    type: SET_PREVIEW_NODE,
    paload: id,
  };
};
