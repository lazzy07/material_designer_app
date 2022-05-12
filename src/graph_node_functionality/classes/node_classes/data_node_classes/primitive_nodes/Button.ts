import { BOOLEAN_SOCKET } from "../../../../ConnectionTypes";
import { Node, Output } from "../../../../../packages/rete-1.4.4";
import NameController from "../../../renderer/controls/NameController";
import DataInputNode from "../DataInputNode";

export class Button extends DataInputNode<number> {
  async builder(node: Node) {
    (node as any).data = this.data;
    super.builder(node);
    (node as any).meta = this.meta;
    node.addOutput(new Output("out", "Bool", BOOLEAN_SOCKET));

    node.addControl(
      new NameController("Bool", this.data.id, this.data.name, node)
    );
  }
}
