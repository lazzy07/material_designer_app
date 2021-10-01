import { Graphs } from "../../../../interfaces/Graphs";
import { Component } from "../../../../packages/rete-1.4.4";

export default abstract class GraphReference extends Component {
  data: Graphs;
  constructor(graph: Graphs) {
    super(graph.name);
    this.data = graph;
  }
}
