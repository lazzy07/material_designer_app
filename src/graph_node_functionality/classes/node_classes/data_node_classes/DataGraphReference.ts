import { Graphs } from "../../../../interfaces/Graphs";
import GraphReference from "../common/GraphReference";

export default class DataGraphReference extends GraphReference {
  constructor(graph: Graphs) {
    super(graph);
  }

  async builder() {}

  async worker() {}
}
