import { Node, Output } from "../../../../../packages/rete-1.4.4";
import { COLOR_SOCKET } from "../../../../ConnectionTypes";
import ShaderOutputNode from "../ShaderOutputNode";
import NameController from "../../../renderer/controls/NameController";
import ImageController from "../../../renderer/controls/ImageController";
import {
  NodeData,
  WorkerInputs,
  WorkerOutputs,
} from "../../../../../packages/rete-1.4.4/core/data";

export class KernelOutputColor extends ShaderOutputNode {
  async builder(node: Node) {
    (node as any).data = { ...this.data };
    super.builder(node);
    (node as any).meta = { ...this.meta };
    node.addOutput(new Output("out", "Tex", COLOR_SOCKET));

    node.addControl(
      new ImageController("Add", this.data.id, this.data.name, node)
    );
  }

  worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
    super.worker(node, inputs, outputs);
  }
}
