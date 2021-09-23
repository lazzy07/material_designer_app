import { NUMBER_SOCKET } from "./../../ConnectionTypes";
import { Component, Node, Input, Output } from "../../../packages/rete-1.4.4";
import {
  NodeData,
  WorkerInputs,
  WorkerOutputs,
} from "../../../packages/rete-1.4.4/core/data";

export default class ButtonBooleanInput extends Component {
  async builder(node: Node) {
    const output = new Output("number", "Button.Boolean", NUMBER_SOCKET);
    node.addOutput(output);
  }

  worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {}
}
