import { Input, Node } from "../../../../../packages/rete-1.4.4";
import { GRAYSCALE_SOCKET } from "../../../../ConnectionTypes";
import ShaderInputNode from "../ShaderInputNode";
import NameController from "../../../renderer/controls/NameController";
import ImageController from "../../../renderer/controls/ImageController";

export class KernelInputGrayscale extends ShaderInputNode {
  async builder(node: Node) {
    (node as any).data = { ...this.data };
    super.builder(node);
    (node as any).meta = { ...this.meta };
    node.addInput(new Input("1", "Tex", GRAYSCALE_SOCKET));

    node.addControl(
      new ImageController("Add", this.data.id, this.data.name, node)
    );
  }
}
