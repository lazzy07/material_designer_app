import { NODE_TYPES } from "../NodeTypes";
import NodeLibrary from "./NodeLibrary";
import Input from "./InputConnection";
import Output from "./OutputConnection";

export default class NodeClass<T> {
  id: string;
  name: string;
  type: NODE_TYPES;
  library: NodeLibrary;
  inputs: Input[];
  outputs: Output[];
  data: T;

  constructor(
    id: string,
    name: string,
    type: NODE_TYPES,
    library: NodeLibrary,
    inputs: Input[],
    outputs: Output[],
    data: T
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.library = library;
    this.inputs = inputs;
    this.outputs = outputs;
    this.data = data;
  }
}
