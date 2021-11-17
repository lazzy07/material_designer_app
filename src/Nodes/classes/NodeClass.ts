import { NODE_TYPES } from "../../graph_node_functionality/NodeTypes";
import NodeLibrary from "./NodeLibrary";
import Input from "./InputConnection";
import Output from "./OutputConnection";
import { NodeData, NodeParameters } from "../../interfaces/NodeData";

export default class NodeClass {
  id: string;
  name: string;
  type: NODE_TYPES;
  library: NodeLibrary;
  inputs: Input[];
  outputs: Output[];
  data: NodeParameters;

  constructor(nodeData: NodeData) {
    this.id = nodeData.id;
    this.name = nodeData.name;
    this.type = nodeData.type;
    this.library = nodeData.library;
    this.inputs = nodeData.inputs;
    this.outputs = nodeData.outputs;
    this.data = nodeData.data;
  }
}
