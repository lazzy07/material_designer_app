import { Graphs } from "../../interfaces/Graphs";
import { Action } from "../store";

export interface NodeLibraryReducer {
  dataGraphNodes: Graphs[];
  shaderGraphNodes: Graphs[];
}

const initState: NodeLibraryReducer = {
  dataGraphNodes: [],
  shaderGraphNodes: [],
};

export const nodeLibraryReducer = (state = initState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};
