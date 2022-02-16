import { ImportTypes } from "../../renderer/services/ImportImageData";
import { ImportAssetFile } from "../../interfaces/ImportAssetFile";
import { Action } from "../store";
import {
  SET_IMPORT_FILES,
  SET_SELECTED,
  SET_SELECTED_NODE,
} from "../actions/SystemActions";
import { Graphs, GRAPH_TYPES } from "../../interfaces/Graphs";
import {
  EDIT_GRAPH_DATA,
  EDIT_GRAPH_NODE_DATA,
  EDIT_KERNEL_DATA,
} from "../actions/GraphActions";
import { Data } from "../../packages/rete-1.4.4/core/data";

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

    case EDIT_GRAPH_DATA:
      const toUpdate: Data = { ...action.payload.packageData };
      const newNodes = toUpdate.nodes;
      const prevData: Data = {
        ...state.selectedItems.graph![action.payload.selectedType!].data,
      };
      const prevNodes = prevData.nodes;

      for (const i of Object.keys(newNodes)) {
        if (!prevNodes[i]) {
          prevNodes[i] = { ...newNodes[i] };
        }
      }

      return {
        ...state,
        selectedItems: {
          ...state.selectedItems,
          graph: {
            ...state.selectedItems.graph!,
            [action.payload.selectedType!]: {
              ...state.selectedItems.graph![action.payload.selectedType!],
              data: prevData,
            },
          },
        },
      };

    case EDIT_GRAPH_NODE_DATA:
      return {
        ...state,
        selectedItems: {
          ...state.selectedItems,
          graph: {
            ...state.selectedItems.graph!,
            [action.payload.selectedType!]: {
              ...state.selectedItems.graph![action.payload.selectedType!],
              data: {
                ...state.selectedItems.graph![action.payload.selectedType!]
                  .data,
                nodes: {
                  ...state.selectedItems.graph![action.payload.selectedType!]
                    .data.nodes,
                  [action.payload.selectedNode]: action.payload.data,
                },
              },
            },
          },
        },
      };

    case EDIT_KERNEL_DATA:
      return {
        ...state,
        selectedItems: {
          ...state.selectedItems,
          graph: {
            ...state.selectedItems.graph!,
            kernelGraph: {
              ...state.selectedItems.graph!.kernelGraph!,
              data: {
                ...state.selectedItems.graph!.kernelGraph!.data,
                [action.payload.type]: action.payload.update,
              },
            },
          },
        },
      };

    default:
      return state;
  }
};
