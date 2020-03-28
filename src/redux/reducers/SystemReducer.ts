import { ImportTypes } from "../../renderer/services/ImportImageData";
import { ImportAssetFile } from "../../interfaces/ImportAssetFile";
import { Action } from "../store";
import { SET_IMPORT_FILES } from "../actions/SystemActions";

export interface SystemReducer {
  importingAssets: {
    type: ImportTypes;
    assets: ImportAssetFile[];
  };
}

const initialState: SystemReducer = {
  importingAssets: {
    type: "texture",
    assets: []
  }
};

export const systemReducer = (
  state = initialState,
  action: Action
): SystemReducer => {
  switch (action.type) {
    case SET_IMPORT_FILES:
      return {
        ...state,
        importingAssets: action.payload
      };
    default:
      return state;
  }
};
