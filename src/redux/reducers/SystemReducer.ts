import { ImportTypes } from "../../renderer/services/ImportImageData";
import { ImportAssetFile } from "../../interfaces/ImportAssetFile";
import { Action } from "../store";
import { SET_IMPORT_FILES, SET_SELECTED } from "../actions/SystemActions";
import { OutlinerTypes } from "../../interfaces/OutlinerTypes";
import { GRAPH_TYPES } from "../../interfaces/Graphs";

export interface SystemReducer {
  importingAssets: {
    type: ImportTypes;
    assets: ImportAssetFile[];
  };
  selectedItems: {
    graph: string;
    graphType: GRAPH_TYPES;
    node: string;
    previewNode: string;
  };
}

const initialState: SystemReducer = {
  importingAssets: {
    type: "texture",
    assets: [],
  },
  selectedItems: {
    graph: "",
    graphType: "shadergraph",
    node: "",
    previewNode: "",
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
          graph: action.payload.id,
          graphType: action.payload.graphType,
          node: "",
          previewNode: "",
        },
      };
    default:
      return state;
  }
};
