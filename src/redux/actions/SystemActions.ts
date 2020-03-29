import { ImportTypes } from "../../renderer/services/ImportImageData";

export const SET_IMPORT_FILES = "set import files";
import { SystemReducer } from "./../reducers/SystemReducer";
import { v4 } from "uuid";

export const setImportFiles = (type: ImportTypes, files: File[]) => {
  return {
    type: SET_IMPORT_FILES,
    payload: {
      type,
      assets: files.map(ele => ({
        id: v4(),
        filePath: ele.path,
        fileName: ele.name.split(".")[0],
        selected: true,
        isWeb: false,
        isLocal: true,
        activeType: "inactive"
      }))
    }
  };
};
