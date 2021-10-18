import { Graphs, GRAPH_TYPES } from "../../../../interfaces/Graphs";
import { Component } from "../../../../packages/rete-1.4.4";

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
