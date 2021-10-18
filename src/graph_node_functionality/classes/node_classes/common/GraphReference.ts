import { Graphs, GRAPH_TYPES } from "../../../../interfaces/Graphs";
import { Component } from "../../../../packages/rete-1.4.4";

export default abstract class GraphReference extends Component {
  data: Graphs;
  meta: { engineType: GRAPH_TYPES };
  constructor(graph: Graphs, engineType: GRAPH_TYPES) {
    super(graph.name);
    this.data = graph;
    this.meta = { engineType };
  }
}
