import Input from "../nodes/classes/InputConnection";
import Output from "../nodes/classes/OutputConnection";
import { NODE_TYPES } from "../nodes/NodeTypes";
import { FunctionLibraryData } from "./FunctionLibraryData";

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
  type: NODE_TYPES;
  library: FunctionLibraryData;
  function: string;
  inputs: Input[];
  outputs: Output[];
  data: NodeParameters;
}
