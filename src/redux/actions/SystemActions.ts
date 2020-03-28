import { ImportTypes } from "../../renderer/services/ImportImageData";

export const SET_IMPORT_FILES = "set import files";
import { SystemReducer } from "./../reducers/SystemReducer";

export const setImportFiles = (type: ImportTypes, files: File[]) => {
  return {
    type: SET_IMPORT_FILES,
    payload: {
      type,
      assets: files.map(ele => ({
        filePath: ele.path,
        fileName: ele.name,
        selected: true,
        isWeb: false,
        isLocal: true
      }))
    }
  };
};
