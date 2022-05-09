import { NodePropertyData } from "./../../../interfaces/NodePropertyData";
import { Graphs, GRAPH_TYPES } from "../../../../interfaces/Graphs";
import { Component } from "../../../../packages/rete-1.4.4";

import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";

export default abstract class ShaderNode extends Component {
  data: Graphs;
  meta: { engineType: GRAPH_TYPES };

  constructor(data: Graphs, engineType: GRAPH_TYPES) {
    super(data.name);
    this.data = data;
    this.meta = { engineType };

    for (let data of (this.data as any).dataGraph!
      .data as NodePropertyData<any>[]) {
      if (data.id === "var_name") {
        data.data = uniqueNamesGenerator({
          dictionaries: [adjectives, colors, animals],
          separator: "_",
          length: 3,
        });
      }
    }
  }

  worker() {}
}
