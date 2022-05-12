import { Node } from "../../../../../packages/rete-1.4.4";
import ShaderOutputNode from "../ShaderOutputNode";

export class Viewer extends ShaderOutputNode {
  async builder(node: Node) {
    (node as any).data = { ...this.data };
    super.builder(node);
    (node as any).meta = { ...this.meta };
  }
}
