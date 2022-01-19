import {
  CONN_TYPES,
  NUMBER2_SOCKET,
  NUMBER_SOCKET,
} from "../../../../ConnectionTypes";
import { Input, Node, Output } from "../../../../../packages/rete-1.4.4";
import NameController from "../../../renderer/controls/NameController";
import DataProcessNode from "../DataProcessNode";

export class OutputNum2 extends DataProcessNode<number> {
  async builder(node: Node) {
    (node as any).data = this.data;
    (node as any).meta = this.meta;
    node.addInput(new Input("2", "Num2", NUMBER2_SOCKET));

    node.addControl(
      new NameController("Out", this.data.id, this.data.name, node)
    );
  }
}
