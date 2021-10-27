import { ImportTypes } from "../../renderer/services/ImportImageData";
import { ImportAssetFile } from "../../interfaces/ImportAssetFile";
import { Action } from "../store";
import {
  SET_IMPORT_FILES,
  SET_SELECTED,
  SET_SELECTED_GRAPH_DATA,
  SET_SELECTED_NODE,
} from "../actions/SystemActions";
import { Graphs, GRAPH_TYPES } from "../../interfaces/Graphs";

export interface SystemReducer {
  importingAssets: {
    type: ImportTypes;
    assets: ImportAssetFile[];
  };
  selectedItems: {
    graph: Graphs | null;
    graphType: GRAPH_TYPES | null;
    node: number;
    previewNode: number;
  };
}

const initialState: SystemReducer = {
  importingAssets: {
    type: "texture",
    assets: [],
  },
  selectedItems: {
    graph: null,
    graphType: null,
    node: -1,
    previewNode: -1,
  },
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
          graph: action.payload.graph,
          graphType: action.payload.graphType,
        },
      };

    case SET_SELECTED_NODE:
      return {
        ...state,
        selectedItems: {
          ...state.selectedItems,
          node: action.payload,
        },
      };

    case SET_SELECTED_GRAPH_DATA:
      return {
        ...state,
        selectedItems: {
          ...state.selectedItems,
          graph: {
            ...state.selectedItems.graph!,
            [state.selectedItems.graphType!]: {
              ...action.payload,
            },
          },
        },
      };
    default:
      return state;
  }
};
