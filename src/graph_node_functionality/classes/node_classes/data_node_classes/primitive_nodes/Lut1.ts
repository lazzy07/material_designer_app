import { LUT_SOCKET } from "../../../../ConnectionTypes";
import { Node, Output } from "../../../../../packages/rete-1.4.4";
import NameController from "../../../renderer/controls/NameController";
import DataInputNode from "../DataInputNode";

export class Lut1 extends DataInputNode<number> {
  async builder(node: Node) {
    (node as any).data = this.data;
    (node as any).meta = this.meta;
    node.addOutput(new Output("lut", "Lut1", LUT_SOCKET));

    node.addControl(
      new NameController("Lut1", this.data.id, this.data.name, node)
    );
  }
}
