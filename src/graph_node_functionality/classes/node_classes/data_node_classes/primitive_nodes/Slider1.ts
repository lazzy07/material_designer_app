import { NUMBER_SOCKET } from "../../../../../nodes/ConnectionTypes";
import { Node, Output } from "../../../../../packages/rete-1.4.4";
import NameController from "../../../renderer/controls/NameController";
import DataInputNode from "../DataInputNode";

export class Slider1 extends DataInputNode<number> {
  async builder(node: Node) {
    (node as any).data = this.data;
    (node as any).meta = this.meta;
    node.addOutput(new Output("number", "Number", NUMBER_SOCKET));

    node.addControl(
      new NameController("Num1", this.data.id, this.data.name, node)
    );
  }
}
