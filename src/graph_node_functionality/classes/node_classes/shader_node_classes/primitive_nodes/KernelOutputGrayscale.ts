import { Input, Node, Output } from "../../../../../packages/rete-1.4.4";
import { GRAYSCALE_SOCKET } from "../../../../ConnectionTypes";
import ShaderOutputNode from "../ShaderOutputNode";
import ImageController from "../../../renderer/controls/ImageController";

export class KernelOutputGrayscale extends ShaderOutputNode {
  async builder(node: Node) {
    (node as any).data = this.data;
    super.builder(node);
    (node as any).meta = this.meta;
    node.addOutput(new Output("out", "Tex", GRAYSCALE_SOCKET));

    node.addControl(
      new ImageController("Add", this.data.id, this.data.name, node)
    );
  }
}
