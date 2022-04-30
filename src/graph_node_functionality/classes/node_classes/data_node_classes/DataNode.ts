import { v4 } from "uuid";
import { Graphs, GRAPH_TYPES } from "../../../../interfaces/Graphs";
import { Component, Node } from "../../../../packages/rete-1.4.4";
import { NodePropertyData } from "../../../interfaces/NodePropertyData";

export default abstract class DataNode<T> extends Component {
  data: Graphs;
  meta: { engineType: GRAPH_TYPES };

  constructor(data: Graphs, engineType: GRAPH_TYPES) {
    super(data.name);
    this.data = data;
    this.meta = { engineType };
  }

  async worker() {}
}
