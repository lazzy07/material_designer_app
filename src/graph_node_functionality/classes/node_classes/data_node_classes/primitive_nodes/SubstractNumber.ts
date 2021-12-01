import { CONN_TYPES, NUMBER_SOCKET } from "../../../../ConnectionTypes";
import { Input, Node, Output } from "../../../../../packages/rete-1.4.4";
import NameController from "../../../renderer/controls/NameController";
import DataProcessNode from "../DataProcessNode";

export class SubstractNumber extends DataProcessNode<number> {
  async builder(node: Node) {
    (node as any).data = this.data;
    (node as any).meta = this.meta;
    node.addInput(new Input("Num 1", "Num1", NUMBER_SOCKET));
    node.addInput(new Input("Num 2", "Num2", NUMBER_SOCKET));
    node.addOutput(new Output("Num", "Num", NUMBER_SOCKET));

    node.addControl(
      new NameController("Sub", this.data.id, this.data.name, node)
    );
  }
}
