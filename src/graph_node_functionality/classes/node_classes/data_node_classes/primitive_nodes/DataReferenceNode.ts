import { Node } from "../../../../../packages/rete-1.4.4";
import NameController from "../../../renderer/controls/NameController";
import DataProcessNode from "../DataProcessNode";

export class DataReferenceNode extends DataProcessNode<any> {
  async builder(node: Node): Promise<void> {
    node.addControl(
      new NameController("Ref", this.data.id, this.data.name, node)
    );
  }
}
