import { Node, Output } from "../../../../../packages/rete-1.4.4";
import { GRAYSCALE_SOCKET } from "../../../../ConnectionTypes";
import ShaderInputNode from "../ShaderInputNode";
import ImageController from "../../../renderer/controls/ImageController";

export class InputGrayscale extends ShaderInputNode {
  async builder(node: Node) {
    (node as any).data = this.data;
    (node as any).meta = this.meta;
    node.addOutput(new Output("out", "Tex", GRAYSCALE_SOCKET));

    node.addControl(
      new ImageController("Add", this.data.id, this.data.name, node)
    );
  }
}
