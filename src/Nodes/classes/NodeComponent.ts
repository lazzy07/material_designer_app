import { Component, Node, Input, Output } from "../../packages/rete-1.4.4";
import {
  NodeData,
  WorkerInputs,
  WorkerOutputs,
} from "../../packages/rete-1.4.4/core/data";
import NodeClass from "./NodeClass";
import ImageController from "./controls/ImageController";
import { COLOR_SOCKET, GRAYSCALE_SOCKET } from "../ConnectionTypes";

export default class NodeComponent extends Component {
  nodeClass: NodeClass;

  constructor(nodeClass: NodeClass) {
    super(nodeClass.name);
    this.nodeClass = nodeClass;
  }

  async builder(node: Node) {
    for (const i of this.nodeClass.inputs) {
      const input = new Input(
        i.type,
        i.title,
        i.type === "grayscale" ? GRAYSCALE_SOCKET : COLOR_SOCKET
      );

      node.meta.type = this.nodeClass.type;

      node.addInput(input);
    }

    for (const i of this.nodeClass.outputs) {
      const output = new Output(
        i.type,
        i.title,
        i.type === "grayscale" ? GRAYSCALE_SOCKET : COLOR_SOCKET
      );
      node.addOutput(output);
    }

    let controller = new ImageController(
      this.nodeClass.id,
      this.nodeClass.id,
      this.nodeClass.name
    );
    node.addControl(controller);
  }

  worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {}
}
