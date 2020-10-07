import {
  Component,
  Node,
  Input,
  Output,
  Socket,
} from "../../packages/rete-1.4.4";
import {
  NodeData,
  WorkerInputs,
  WorkerOutputs,
} from "../../packages/rete-1.4.4/core/data";
import NodeClass from "./NodeClass";
import { v4 } from "uuid";
import ImageController from "./controls/ImageController";

export default class NodeComponent extends Component {
  nodeClass: NodeClass;

  constructor(nodeClass: NodeClass) {
    super(nodeClass.id);
    this.nodeClass = nodeClass;
  }

  async builder(node: Node) {
    for (const i of this.nodeClass.inputs) {
      const input = new Input(v4(), i.title, new Socket(i.title));
      node.addInput(input);
    }

    for (const i of this.nodeClass.outputs) {
      const output = new Output(v4(), i.title, new Socket(i.title));
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
