import { COLOR_SOCKET } from "./../../../../ConnectionTypes";
import { Input, Output, Node } from "../../../../../packages/rete-1.4.4";
import { GRAYSCALE_SOCKET } from "../../../../ConnectionTypes";
import ShaderOutputNode from "../ShaderOutputNode";
import ImageController from "../../../renderer/controls/ImageController";
import { Graphs } from "../../../../../interfaces/Graphs";

export class OutputGrayscale extends ShaderOutputNode {
  async builder(node: Node) {
    (node as any).data = { ...this.data };
    super.builder(node);
    (node as any).meta = { ...this.meta };

    const shaderGraph = (node.data as unknown as Graphs).shaderGraph!;
    const nodes = (shaderGraph.data as any).nodes;

    for (const nodeData of nodes) {
      const initID = nodeData.data.id;
      if (initID == "1") {
        node.addInput(new Input(nodeData.id.toString(), "Tex", COLOR_SOCKET));
      } else if (initID == "7") {
        node.addOutput(new Output(nodeData.id.toString(), "Tex", COLOR_SOCKET));
      } else if (initID == "2") {
        node.addInput(
          new Input(nodeData.id.toString(), "Tex", GRAYSCALE_SOCKET)
        );
      } else if (initID == "8") {
        node.addOutput(
          new Output(nodeData.id.toString(), "Tex", GRAYSCALE_SOCKET)
        );
      }
    }

    node.addControl(
      new ImageController("Add", this.data.id, this.data.name, node)
    );
  }
}
