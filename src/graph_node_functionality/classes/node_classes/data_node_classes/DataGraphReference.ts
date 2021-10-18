import { Graphs, GRAPH_TYPES } from "../../../../interfaces/Graphs";
import GraphReference from "../common/GraphReference";

export default class DataGraphReference extends GraphReference {
  constructor(graph: Graphs, engineType: GRAPH_TYPES) {
    super(graph, engineType);
  }

  async builder() {}

  async worker() {}
}
