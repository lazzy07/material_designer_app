import { Input, Node } from "../../../../../packages/rete-1.4.4";
import { GRAYSCALE_SOCKET } from "../../../../ConnectionTypes";
import ShaderInputNode from "../ShaderInputNode";
import NameController from "../../../renderer/controls/NameController";

export class KernelInputGrayscale extends ShaderInputNode {
  async builder(node: Node) {
    (node as any).data = this.data;
    (node as any).meta = this.meta;
    node.addInput(new Input("1", "Tex", GRAYSCALE_SOCKET));

    node.addControl(
      new NameController("Add", this.data.id, this.data.name, node)
    );
  }
}
