import { Graphs, GRAPH_TYPES } from "../../../../interfaces/Graphs";
import { MaterialGraph } from "../../../../interfaces/MaterialGraph";

export const fetchFromGraphData = (
  graphType: GRAPH_TYPES,
  graph: Graphs
): MaterialGraph => {
  switch (graphType) {
    case "shadergraph":
      return graph.shaderGraph!;
    case "datagraph":
      return graph.dataGraph!;

    default:
      return graph.kernelGraph!;
  }
};
