import { Node, Output } from "../../../../../packages/rete-1.4.4";
import { COLOR_SOCKET } from "../../../../ConnectionTypes";
import NameController from "../../../renderer/controls/NameController";
import ShaderInputNode from "../ShaderInputNode";

export class InputColor extends ShaderInputNode {
  async builder(node: Node) {
    (node as any).data = this.data;
    (node as any).meta = this.meta;
    node.addOutput(new Output("out", "Tex", COLOR_SOCKET));

    node.addControl(
      new NameController("Add", this.data.id, this.data.name, node)
    );
  }
}
