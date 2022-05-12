import { BOOLEAN_SOCKET, NUMBER_SOCKET } from "../../../../ConnectionTypes";
import { Input, Node, Output } from "../../../../../packages/rete-1.4.4";
import NameController from "../../../renderer/controls/NameController";
import DataProcessNode from "../DataProcessNode";

export class Num1toBool extends DataProcessNode<number> {
  async builder(node: Node) {
    (node as any).data = this.data;
    super.builder(node);
    (node as any).meta = this.meta;
    node.addInput(new Input("1", "Num1", NUMBER_SOCKET));
    node.addOutput(new Output("out", "Bool", BOOLEAN_SOCKET));

    node.addControl(
      new NameController("Num1-Bool", this.data.id, this.data.name, node)
    );
  }
}
