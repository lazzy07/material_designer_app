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

export default class NodeComponent<T> extends Component {
  nodeClass: NodeClass<T>;

  constructor(nodeClass: NodeClass<T>) {
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
  }

  worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {}
}
