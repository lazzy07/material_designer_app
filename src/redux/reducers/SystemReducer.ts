import { SET_KERNEL_ERROR } from "./../actions/GraphActions";
import { ImportTypes } from "../../renderer/services/ImportImageData";
import { ImportAssetFile } from "../../interfaces/ImportAssetFile";
import { Action } from "../store";
import {
  SET_IMPORT_FILES,
  SET_SELECTED,
  SET_SELECTED_NODE,
} from "../actions/SystemActions";
import { GRAPH_TYPES } from "../../interfaces/Graphs";

export interface SystemReducer {
  importingAssets: {
    type: ImportTypes;
    assets: ImportAssetFile[];
  };
  selectedItems: {
    graphId: string;
    selectedNodesGraphType: GRAPH_TYPES;
    node: number;
    previewNode: number;
  };
  kernelCompilerError: string;
}

const initialState: SystemReducer = {
  importingAssets: {
    type: "texture",
    assets: [],
  },
  selectedItems: {
    graphId: "",
    selectedNodesGraphType: "dataGraph",
    node: -1,
    previewNode: -1,
  },
  kernelCompilerError: "",
};

export const systemReducer = (
  state = initialState,
  action: Action
): SystemReducer => {
  switch (action.type) {
    case SET_IMPORT_FILES:
      return {
        ...state,
        importingAssets: action.payload,
      };
    case SET_SELECTED:
      return {
        ...state,
        selectedItems: {
          ...state.selectedItems,
          graphId: action.payload.id,
        },
      };

    case SET_SELECTED_NODE:
      return {
        ...state,
        selectedItems: {
          ...state.selectedItems,
          node: action.payload.id,
          selectedNodesGraphType: action.payload.graphType,
        },
      };

    default:
      return state;

    case SET_KERNEL_ERROR:
      return {
        ...state,
        kernelCompilerError: action.payload,
      };
  }
};
