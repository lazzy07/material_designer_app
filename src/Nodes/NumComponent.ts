import Rete, { Input, Node, Output } from "../packages/rete-1.4.4";
import {
  NodeData,
  WorkerInputs,
  WorkerOutputs,
} from "../packages/rete-1.4.4/core/data";

export default class NumComponent extends Rete.Component {
  constructor() {
    super("Number");
  }

  async builder(node: Node) {
    const numSocket = new Rete.Socket("Number value");
    let out = new Rete.Output("num", "Number", numSocket);

    node.addOutput(out);
  }

  async worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    outputs["num"] = node.data.num;
  }
}
