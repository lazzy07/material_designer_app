import { NUMBER2_SOCKET, NUMBER_SOCKET } from "../../../../ConnectionTypes";
import { Input, Node, Output } from "../../../../../packages/rete-1.4.4";
import NameController from "../../../renderer/controls/NameController";
import DataProcessNode from "../DataProcessNode";

export class Num1toNum2 extends DataProcessNode<number> {
  async builder(node: Node) {
    (node as any).data = { ...this.data };
    super.builder(node);
    (node as any).meta = { ...this.meta };
    node.addInput(new Input("1", "Num1", NUMBER_SOCKET));
    node.addInput(new Input("2", "Num1", NUMBER_SOCKET));
    node.addOutput(new Output("out", "Num2", NUMBER2_SOCKET));

    node.addControl(
      new NameController("Num1-Num2", this.data.id, this.data.name, node)
    );
  }
}
