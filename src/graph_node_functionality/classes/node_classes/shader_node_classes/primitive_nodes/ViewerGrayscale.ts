import { Input, Node } from "../../../../../packages/rete-1.4.4";
import { GRAYSCALE_SOCKET } from "../../../../ConnectionTypes";
import ImageController from "../../../renderer/controls/ImageController";
import ShaderOutputNode from "../ShaderOutputNode";

export class ViewerGrayscale extends ShaderOutputNode {
  async builder(node: Node) {
    (node as any).data = { ...this.data };
    super.builder(node);
    (node as any).meta = { ...this.meta };

    node.addControl(
      new ImageController("Add", this.data.id, this.data.name, node)
    );

    node.addInput(new Input("1", "Tex", GRAYSCALE_SOCKET));
  }
}
