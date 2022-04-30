import { NodePropertyData } from "./../../../interfaces/NodePropertyData";
import { v4 } from "uuid";
import { Graphs, GRAPH_TYPES } from "../../../../interfaces/Graphs";
import { Component, Node } from "../../../../packages/rete-1.4.4";
import {
  NodeData,
  WorkerInputs,
  WorkerOutputs,
} from "../../../../packages/rete-1.4.4/core/data";

export default abstract class ShaderNode extends Component {
  data: Graphs;
  meta: { engineType: GRAPH_TYPES };

  constructor(data: Graphs, engineType: GRAPH_TYPES) {
    super(data.name);
    this.data = data;
    this.meta = { engineType };
  }

  worker() {}
}
