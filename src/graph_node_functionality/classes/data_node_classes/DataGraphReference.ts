import { Graphs } from "../../../interfaces/Graphs";
import GraphReference from "../node_classes/common/GraphReference";

export default class DataGraphReference extends GraphReference {
  constructor(graph: Graphs) {
    super(graph);
  }

  async builder() {}

  async worker() {}
}
