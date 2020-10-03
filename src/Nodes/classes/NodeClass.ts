import { NODE_TYPES } from "../NodeTypes";
import NodeLibrary from "../node_libraries/NodeLibrary";
import Input from "./Input";
import Output from "./Output";

export default class NodeClass {
  id: string;
  name: string;
  type: NODE_TYPES;
  library: NodeLibrary;
  inputs: Input[];
  outputs: Output[];

  constructor(
    id: string,
    name: string,
    type: NODE_TYPES,
    library: NodeLibrary,
    inputs: Input[],
    outputs: Output[]
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.library = library;
    this.inputs = inputs;
    this.outputs = outputs;
  }
}
