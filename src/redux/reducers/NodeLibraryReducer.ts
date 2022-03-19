import DATA_NODES from "../../graph_node_functionality/node_data/data_graph";
import SHADER_NODES from "../../graph_node_functionality/node_data/shader_graph";
import { Graphs } from "../../interfaces/Graphs";
import { Action } from "../store";

export interface NodeLibraryReducer {
  dataGraphNodes: Graphs[];
  shaderGraphNodes: Graphs[];
}

const initState: NodeLibraryReducer = {
  dataGraphNodes: DATA_NODES,
  shaderGraphNodes: SHADER_NODES,
};

export const nodeLibraryReducer = (state = initState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};
