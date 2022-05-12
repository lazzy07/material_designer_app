import { Node } from "../../../../packages/rete-1.4.4";
import ShaderNode from "./ShaderNode";

export default abstract class ShaderOutputNode extends ShaderNode {
  async builder(node: Node) {
    super.builder(node);
  }
}
