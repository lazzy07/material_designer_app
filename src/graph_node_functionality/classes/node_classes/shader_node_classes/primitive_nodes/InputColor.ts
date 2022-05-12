import { Node, Output } from "../../../../../packages/rete-1.4.4";
import { COLOR_SOCKET } from "../../../../ConnectionTypes";
import ImageController from "../../../renderer/controls/ImageController";
import ShaderInputNode from "../ShaderInputNode";

export class InputColor extends ShaderInputNode {
  async builder(node: Node) {
    (node as any).data = this.data;
    super.builder(node);
    (node as any).meta = this.meta;
    node.addOutput(new Output("out", "Tex", COLOR_SOCKET));

    node.addControl(
      new ImageController("Add", this.data.id, this.data.name, node)
    );
  }
}
