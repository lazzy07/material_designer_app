import { NUMBER_SOCKET } from "../../../../../nodes/ConnectionTypes";
import { Node, Output } from "../../../../../packages/rete-1.4.4";
import { Number1Properties } from "../../../../interfaces/Number1Properties";
import DataInputNode from "../DataInputNode";

export class Number1Input extends DataInputNode<Number1Properties> {
  async builder(node: Node) {
    (node as any).data = this.data;
    (node as any).meta = this.meta;
    node.addOutput(new Output("nmber1input", "Number", NUMBER_SOCKET));
  }
}
