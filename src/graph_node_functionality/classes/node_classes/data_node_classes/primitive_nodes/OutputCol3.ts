import {
  COLORVEC3_SOCKET,
  CONN_TYPES,
  NUMBER_SOCKET,
} from "../../../../ConnectionTypes";
import { Input, Node, Output } from "../../../../../packages/rete-1.4.4";
import NameController from "../../../renderer/controls/NameController";
import DataProcessNode from "../DataProcessNode";

export class OutputCol3 extends DataProcessNode<number> {
  async builder(node: Node) {
    (node as any).data = this.data;
    (node as any).meta = this.meta;
    node.addInput(new Input("3", "Col3", COLORVEC3_SOCKET));

    node.addControl(
      new NameController("Out", this.data.id, this.data.name, node)
    );
  }
}
