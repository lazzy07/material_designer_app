import { Input, Node } from "../../../../../packages/rete-1.4.4";
import { COLOR_SOCKET } from "../../../../ConnectionTypes";
import ShaderOutputNode from "../ShaderOutputNode";
import NameController from "../../../renderer/controls/NameController";

export class OutputColor extends ShaderOutputNode {
  async builder(node: Node) {
    (node as any).data = this.data;
    (node as any).meta = this.meta;
    node.addInput(new Input("1", "Tex", COLOR_SOCKET));

    node.addControl(
      new NameController("Add", this.data.id, this.data.name, node)
    );
  }
}
