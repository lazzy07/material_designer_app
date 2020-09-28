import { ImportTypes } from "../../renderer/services/ImportImageData";
import { v4 } from "uuid";
import { Action } from "redux";
import { OutlinerTypes } from "../../interfaces/OutlinerTree";

export const SET_IMPORT_FILES = "set import files";
export const SET_SELECTED = "set selected";

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

export const setSelected = (
  type: "graph" | "package",
  graphType: OutlinerTypes,
  id: string
) => {
  return {
    type: SET_SELECTED,
    payload: {
      id,
      type,
      graphType,
    },
  };
};
