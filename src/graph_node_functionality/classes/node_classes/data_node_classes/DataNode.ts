import { Graphs, GRAPH_TYPES } from "../../../../interfaces/Graphs";
import { Component, Node } from "../../../../packages/rete-1.4.4";
import { NodePropertyData } from "../../../interfaces/NodePropertyData";

import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";

export default abstract class DataNode<T> extends Component {
  data: Graphs;
  meta: { engineType: GRAPH_TYPES };

  constructor(data: Graphs, engineType: GRAPH_TYPES) {
    super(data.name);
    this.data = data;
    this.meta = { engineType };
  }

  async builder(node: Node) {
    const varName = (node.data as any).dataGraph!.data["var_name"];
    if (varName) {
      varName.data = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        separator: "_",
        length: 2,
      });
    }
  }

  async worker() {}
}
