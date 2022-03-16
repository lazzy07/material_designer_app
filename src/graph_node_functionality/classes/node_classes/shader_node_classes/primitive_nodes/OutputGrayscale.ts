import Output from "../../../../../nodes/classes/OutputConnection";
import { Input, Node } from "../../../../../packages/rete-1.4.4";
import { GRAYSCALE_SOCKET } from "../../../../ConnectionTypes";
import ShaderOutputNode from "../ShaderOutputNode";

export class OutputGrayscale extends ShaderOutputNode {
  async builder(node: Node) {
    (node as any).data = this.data;
    (node as any).meta = this.meta;
    node.addInput(new Input("1", "Tex", GRAYSCALE_SOCKET));

    node.addControl(
      new NameController("Add", this.data.id, this.data.name, node)
    );
  }
}
