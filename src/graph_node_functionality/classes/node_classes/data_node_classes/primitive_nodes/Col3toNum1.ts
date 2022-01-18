import { COLORVEC3_SOCKET, NUMBER_SOCKET } from "../../../../ConnectionTypes";
import { Input, Node, Output } from "../../../../../packages/rete-1.4.4";
import NameController from "../../../renderer/controls/NameController";
import DataProcessNode from "../DataProcessNode";

export class Col3toNum1 extends DataProcessNode<number> {
  async builder(node: Node) {
    (node as any).data = this.data;
    (node as any).meta = this.meta;
    node.addInput(new Input("Col3", "Col3", COLORVEC3_SOCKET));
    node.addOutput(new Output("Num1", "Num1", NUMBER_SOCKET));

    node.addControl(
      new NameController("Col3-Num1", this.data.id, this.data.name, node)
    );
  }
}
