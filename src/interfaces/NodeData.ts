import Input from "../nodes/classes/InputConnection";
import Output from "../nodes/classes/OutputConnection";
import { NODE_TYPES } from "../graph_node_functionality/NodeTypes";
import { FunctionLibraryData } from "./FunctionLibraryData";
import { GRAPH_TYPES } from "./Graphs";

export interface NodeDataParameters {
  type: string;
  values: number[];
}

export interface NodeParameters {
  parameters: NodeDataParameters[];
  data: any;
}

export interface NodeData {
  id: string;
  name: string;
  graphType: GRAPH_TYPES;
  type: NODE_TYPES;
  library: FunctionLibraryData;
  function: string;
  inputs: Input[];
  outputs: Output[];
  data: NodeParameters;
}
