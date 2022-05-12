import { Node } from "../../../../packages/rete-1.4.4";
import DataNode from "./DataNode";

export default abstract class DataProcessNode<T> extends DataNode<T> {
  async builder(node: Node): Promise<void> {
    super.builder(node);
  }
}
