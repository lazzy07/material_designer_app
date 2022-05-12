import { CONN_TYPES, NUMBER_SOCKET } from "../../../../ConnectionTypes";
import { Input, Node, Output } from "../../../../../packages/rete-1.4.4";
import NameController from "../../../renderer/controls/NameController";
import DataProcessNode from "../DataProcessNode";

export class OutputNum1 extends DataProcessNode<number> {
  async builder(node: Node) {
    (node as any).data = this.data;
    super.builder(node);
    (node as any).meta = this.meta;
    node.addInput(new Input("1", "Num1", NUMBER_SOCKET));

    node.addControl(
      new NameController("Out", this.data.id, this.data.name, node)
    );
  }
}
