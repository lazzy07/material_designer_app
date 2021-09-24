import { Component, Node } from "../../../../packages/rete-1.4.4";
import {
  NodeData,
  WorkerInputs,
  WorkerOutputs,
} from "../../../../packages/rete-1.4.4/core/data";

export default abstract class ShaderNode extends Component {
  async builder(node: Node) {}

  worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {}
}
