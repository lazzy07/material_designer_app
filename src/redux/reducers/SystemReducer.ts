import { ImportTypes } from "../../renderer/services/ImportImageData";
import { ImportAssetFile } from "../../interfaces/ImportAssetFile";
import { Action } from "../store";
import { SET_IMPORT_FILES, SET_SELECTED } from "../actions/SystemActions";
import { OutlinerTypes } from "../../interfaces/OutlinerTypes";

export interface SystemReducer {
  importingAssets: {
    type: ImportTypes;
    assets: ImportAssetFile[];
  };
  selectedItems: {
    package: string;
    graph: string;
    graphType: OutlinerTypes;
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
    package: "",
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
      if (action.payload.type === "graph") {
        return {
          ...state,
          selectedItems: {
            package: state.selectedItems.package,
            graph: action.payload.id,
            graphType: action.payload.graphType,
            node: "",
            previewNode: "",
          },
        };
      } else {
        return {
          ...state,
          selectedItems: {
            ...state.selectedItems,
            package: action.payload.id,
            node: "",
            previewNode: "",
          },
        };
      }
    default:
      return state;
  }
};
