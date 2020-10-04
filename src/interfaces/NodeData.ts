import Input from "../nodes/classes/Input";
import Output from "../nodes/classes/Output";
import { NODE_TYPES } from "../nodes/NodeTypes";
import { FunctionLibraryData } from "./FunctionLibraryData";

export interface NodeData {
  id: string;
  name: string;
  type: NODE_TYPES;
  library: FunctionLibraryData;
  function: string;
  inputs: Input[];
  outputs: Output[];
}
