import { BOOLEAN_SOCKET, NUMBER_SOCKET } from "../../../../ConnectionTypes";
import { Input, Node, Output } from "../../../../../packages/rete-1.4.4";
import NameController from "../../../renderer/controls/NameController";
import DataProcessNode from "../DataProcessNode";

export class BooltoNum1 extends DataProcessNode<number> {
  async builder(node: Node) {
    (node as any).data = { ...this.data };
    super.builder(node);
    (node as any).meta = { ...this.meta };
    node.addInput(new Input("1", "Bool", BOOLEAN_SOCKET));
    node.addOutput(new Output("out", "Num1", NUMBER_SOCKET));

    node.addControl(
      new NameController("Bool-Num1", this.data.id, this.data.name, node)
    );
  }
}
