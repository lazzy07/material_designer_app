import { Input, Node } from "../../../../../packages/rete-1.4.4";
import { COLOR_SOCKET } from "../../../../ConnectionTypes";
import ShaderOutputNode from "../ShaderOutputNode";
import NameController from "../../../renderer/controls/NameController";
import ImageController from "../../../renderer/controls/ImageController";

export class OutputColor extends ShaderOutputNode {
  async builder(node: Node) {
    (node as any).data = this.data;
    super.builder(node);
    (node as any).meta = this.meta;
    node.addInput(new Input("1", "Tex", COLOR_SOCKET));

    node.addControl(
      new ImageController("Add", this.data.id, this.data.name, node)
    );
  }
}
